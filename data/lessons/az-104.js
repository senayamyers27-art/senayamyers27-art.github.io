/* Lessons for Microsoft Certified: Azure Administrator Associate (AZ-104): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-104", [
 {
  "t": "Microsoft Entra users and groups: create, bulk create, security vs Microsoft 365 groups, assigned vs dynamic membership",
  "body": [
   "Microsoft Entra ID (formerly Azure Active Directory, or Azure AD) is the cloud identity service behind every Azure subscription. Every person who signs in to the Azure portal, and every group you use to grant access, lives in an Entra tenant: a dedicated instance of the directory that belongs to your organization. As an Azure administrator you will spend a lot of time creating users and groups, because good group design is what keeps access manageable. You grant permissions to groups once, then add and remove people from those groups as their jobs change, instead of editing dozens of individual permissions every time someone joins or leaves.",
   "You can create a user in the portal (Microsoft Entra ID > Users > New user > Create new user), with the Azure CLI (`az ad user create --display-name \"Ana Silva\" --user-principal-name ana@contoso.com --password <initial-password>`), with Microsoft Graph PowerShell (`New-MgUser`), or by inviting an external user as a guest. A cloud user needs a display name, a user principal name (UPN) such as `ana@contoso.com` whose domain suffix is a verified domain in the tenant (or the default `onmicrosoft.com` domain), and an initial password that the user is usually forced to change at first sign-in. Users synchronized from on-premises Active Directory Domain Services (AD DS) with Microsoft Entra Connect or Cloud Sync are sourced on-premises, so you change most of their properties there, not in the portal.",
   "For many users at once, use Bulk operations > Bulk create on the Users page. You download a CSV (comma-separated values) template, fill in one row per user with the display name, UPN, initial password and any optional properties such as department or job title, upload the file, and the portal runs the job in the background. When it finishes you can open Bulk operation results and download a file showing which rows succeeded and which failed and why, typically a duplicate UPN or an unverified domain. The same menu offers bulk invite for guests and bulk delete, and groups have bulk import and bulk remove of members from a CSV file.",
   "Entra ID has two group types, and the exam expects you to choose between them. A security group is used to grant access to resources: Azure role-based access control (RBAC) role assignments, enterprise app assignments, licenses and Conditional Access policies. Its members can be users, devices, service principals and other groups (nesting). A Microsoft 365 group is a collaboration group: it comes with a shared mailbox, calendar, SharePoint site and can back a Microsoft Teams team. Its members can only be users, it cannot contain other groups, and it always has its own email address. If a question is about granting Azure permissions to a set of administrators or targeting devices, the answer is a security group; if it mentions shared email, calendars or Teams, it is a Microsoft 365 group.",
   "Each group also has a membership type. Assigned means an administrator or group owner adds and removes members by hand. Dynamic user means Entra ID evaluates a rule against user attributes and keeps membership current automatically, for example `(user.department -eq \"Sales\") -and (user.country -eq \"US\")`. Dynamic device does the same with device attributes such as `device.deviceOSType -eq \"Windows\"`, and it is only available for security groups. A single group cannot mix user and device rules. You cannot add or remove members of a dynamic group by hand; you change the rule or the user's attributes instead. Dynamic membership requires Microsoft Entra ID P1 licensing (or a product that includes it) for users who are members of dynamic groups. You can switch a group between assigned and dynamic, but switching to dynamic replaces the existing members with whoever the rule matches, and rule processing is not instant, so a new hire can take a while to appear.",
   "Consider a worked example. Contoso hires 40 seasonal support agents. You download the bulk create template, fill in 40 rows with each agent's name, UPN, temporary password and department set to `Support`, and upload it. The results file shows 39 successes and one failure caused by a typo in the domain suffix, which you fix and re-upload as a single row. A dynamic user security group called Support-Agents already exists with the rule `user.department -eq \"Support\"`, and that group holds the Reader role on the support resource group. Within a short time the 40 new accounts appear in the group and inherit access, with no individual role assignments. When the season ends and HR changes their department, they drop out of the group automatically.",
   "Common mistakes: trying to put devices or nested groups into a Microsoft 365 group; creating a dynamic device rule on a Microsoft 365 group; expecting to add a single person manually to a dynamic group; forgetting the P1 license requirement for dynamic membership; and editing a synchronized user's department in the portal, only to find the change is blocked or overwritten by the next sync.",
   "Exam questions usually hide the answer in a clue word. 'Automatically', 'based on department' or 'based on attribute' points to dynamic membership. 'Devices', 'nested group' or 'assign an Azure role' points to a security group. 'Shared mailbox', 'Teams' or 'collaboration' points to a Microsoft 365 group. 'Hundreds of users from a spreadsheet' points to bulk create with the CSV template. 'User is managed on-premises' means change the attribute in AD DS, not in Entra ID."
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
    "Assigned membership",
    "Group membership that an administrator or group owner maintains by adding and removing members by hand."
   ],
   [
    "Dynamic membership",
    "Group membership calculated automatically from a rule on user or device attributes; it requires Entra ID P1."
   ],
   [
    "Bulk create",
    "A portal operation that creates many users from an uploaded CSV template and reports per-row results."
   ],
   [
    "Microsoft Entra Connect",
    "The tool that synchronizes users and groups from on-premises AD DS into Entra ID, keeping on-premises as the source of authority."
   ]
  ],
  "example": "A company hires 40 seasonal support agents. The administrator fills in the bulk create CSV template to create the accounts in one upload, sets each user's department to Support, and relies on a dynamic user security group with the rule user.department -eq Support that already holds the Reader role on the support resource group. The new agents get access without any further steps, and they lose it automatically when HR changes their department at the end of the season.",
  "tip": "Watch for the member type. Devices can only go in security groups, dynamic device rules only work for security groups, Microsoft 365 groups cannot contain nested groups, and dynamic groups need Entra ID P1 licensing.",
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
    "Bulk create on the Users page: download the CSV template, fill in one row per user, upload it and review the results file for failed rows."
   ],
   [
    "A team needs a shared mailbox, a calendar and a Teams workspace. Which group type fits?",
    "A Microsoft 365 group, because it provisions collaboration resources; a security group is for granting access, not collaboration."
   ]
  ]
 },
 {
  "t": "User and group properties, licenses (including group-based licensing), external (B2B guest) users and self-service password reset",
  "body": [
   "A user object in Microsoft Entra ID carries far more than a name and password. Properties such as job title, department, manager, office location, employee ID and usage location are used by dynamic group rules, by the global address list and by licensing. You edit them on the user's Properties page in the portal, in bulk with Microsoft Graph PowerShell (`Update-MgUser -UserId ana@contoso.com -Department \"Finance\"`), or, for synchronized users, in on-premises Active Directory Domain Services (AD DS), because the on-premises directory is the source of authority. Groups have properties too: name, description, owners (who can manage membership without being administrators), membership type, and whether the group can be assigned Microsoft Entra roles, a setting you can only choose when you create the group.",
   "Licenses for products such as Microsoft 365 or Microsoft Entra ID P1 and P2 are assigned to users. Before a license can be assigned, the user must have a usage location set, a two-letter country property, because some services are not available in every country; assignment fails without it. You can assign a license directly on the user's Licenses page, but at scale direct assignment becomes hard to track and easy to forget when people leave.",
   "Group-based licensing solves that. You assign the license to a group, and every member receives it, with the option to turn off individual service plans inside the product, for example disabling one app for a department. When a user joins the group they get the license; when they leave, it is removed. Combine this with a dynamic group and licensing follows HR data automatically. Group-based licensing needs Entra ID P1 or a product that includes it. If assignment fails, for example because there are not enough licenses, a usage location is missing or two service plans conflict, the group's Licenses page shows those users in an error state so you can fix them and reprocess. A user can hold the same license both directly and through a group; removing the direct assignment then leaves the inherited one in place.",
   "External collaboration uses Microsoft Entra B2B (business-to-business). You invite a partner by email address (Users > New user > Invite external user, or `New-MgInvitation`), and a guest user object is created in your tenant with a user type of Guest. The partner signs in with their own identity from their home organization, a Microsoft account, or an email one-time passcode, so you never store or reset their password. After they redeem the invitation you can put guests in groups and give them RBAC roles like any other user. External collaboration settings control who can invite guests (for example only admins and users in the Guest Inviter role), how much of your directory guests can see, and which partner domains are allowed or blocked. Cross-tenant access settings add finer control over inbound and outbound collaboration with specific organizations.",
   "Self-service password reset (SSPR) lets users reset a forgotten password without calling the help desk. Under Microsoft Entra ID > Password reset you enable it for None, Selected (one group) or All users, choose which authentication methods are allowed (such as the Microsoft Authenticator app, mobile phone, email or security questions), and set how many methods are required to reset: one or two. Users must register methods before they can use SSPR, and you can require registration at sign-in with a periodic reconfirmation. For users synchronized from on-premises, password writeback through Microsoft Entra Connect or Cloud Sync is needed so the new password is written back to AD DS; without it, the reset either fails or leaves the on-premises password unchanged. Administrator accounts always use a stricter built-in policy that requires two methods and never allows security questions, regardless of your settings.",
   "Consider a worked example. An engineering firm creates a dynamic user group for `user.department -eq \"Engineering\"` and assigns the Microsoft 365 license to it, turning off one service plan the team does not use. A new engineer is created with department Engineering but no usage location, and the group shows her in an error state. You set usage location to Canada, reprocess the group, and the license arrives. A contractor from a partner firm is invited as a B2B guest, redeems the invitation with his own company account, and is added to a project security group that has Contributor on one resource group. SSPR is enabled for the Engineering group with two required methods, and password writeback is turned on because the engineers sync from on-premises.",
   "Common mistakes: assuming spare licenses guarantee assignment when the usage location is empty; thinking guests have passwords in your tenant; picking 'Selected' for SSPR and expecting to add several groups (it takes one group, so nest groups or use All); forgetting that writeback is needed for synchronized users; and believing the role-assignable group setting can be turned on later.",
   "Exam wording: 'license assignment fails but licenses are available' points to usage location. 'Assign licenses automatically when users join a department' points to group-based licensing with a dynamic group. 'External partner, their own credentials' points to B2B guest invitation. 'Users reset their own password, change must reach on-premises' points to SSPR plus password writeback. 'Minimize help desk calls' is almost always SSPR."
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
    "Service plan",
    "An individual component of a license product that can be turned off during assignment."
   ],
   [
    "B2B guest user",
    "An external identity invited into your tenant with user type Guest who signs in with credentials from their own organization or account."
   ],
   [
    "External collaboration settings",
    "Tenant settings that control who can invite guests, what guests can see and which domains are allowed."
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
  "example": "An engineering firm adds a dynamic group for all users in the Engineering department and assigns the Microsoft 365 license to it. A new engineer's license fails until the administrator sets her usage location to Canada and reprocesses the group. A contractor from a partner firm is invited as a B2B guest, added to a project group and signs in with his own company account, while engineers reset forgotten passwords through SSPR with writeback to on-premises AD DS.",
  "tip": "If a license assignment fails, check the usage location first. For SSPR, the scope options are None, Selected (a single group) and All, administrators always need two methods, and synchronized users need password writeback.",
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
   ],
   [
    "You want every user in the Sales department to receive a license automatically. What do you configure?",
    "Group-based licensing on a dynamic user group whose rule matches the Sales department, which requires Entra ID P1."
   ]
  ]
 },
 {
  "t": "Azure RBAC: built-in roles (Owner, Contributor, Reader, User Access Administrator), assigning roles at different scopes and interpreting access",
  "body": [
   "Azure role-based access control (RBAC) decides what a signed-in identity can do to Azure resources. Every grant is a role assignment made of three parts: a security principal (a user, group, service principal or managed identity), a role definition (a list of allowed operations) and a scope (where the grant applies). If you remember 'who, what, where', you can read any assignment and predict what it allows. RBAC is the answer whenever a question asks who may create, change, view or delete resources.",
   "The four fundamental built-in roles appear on nearly every exam. Owner has full access to manage resources and can also assign roles to others. Contributor can create, change and delete every kind of resource but cannot grant access to anyone. Reader can view resources but change nothing. User Access Administrator can manage role assignments (grant and remove access) but cannot manage the resources themselves. Beyond these there are many service-specific roles, such as Virtual Machine Contributor or Network Contributor, which follow the principle of least privilege by covering one resource type, and the Role Based Access Control Administrator role, which can manage assignments and can be limited with conditions to certain roles or principals.",
   "A role definition is a JSON document with `Actions` (allowed control-plane operations such as `Microsoft.Compute/virtualMachines/start/action`), `NotActions` (operations subtracted from Actions), `DataActions` and `NotDataActions` for the data plane, and `AssignableScopes`. Contributor, for instance, has `*` in Actions with `Microsoft.Authorization/*/Write` and `Microsoft.Authorization/*/Delete` in NotActions, which is exactly why it cannot assign roles. When no built-in role fits, you create a custom role from JSON (`az role definition create --role-definition @role.json`) or by cloning an existing role in the portal and trimming its permissions.",
   "Scopes form a hierarchy: management group, subscription, resource group, then individual resource. An assignment at a scope is inherited by everything below it, so Reader on a subscription means Reader on every resource group and resource in it. You cannot remove an inherited permission at a lower scope; you have to remove the assignment where it was made. To assign a role, open Access control (IAM) on the target scope, choose Add > Add role assignment, pick the role, then the members, or use `az role assignment create --assignee <group-object-id> --role Reader --scope /subscriptions/<id>/resourceGroups/rg-app`.",
   "RBAC is additive. A user's effective access is the union of every role assigned to them directly and through any group, at any scope above the resource. If Ana has Reader on the subscription and Contributor on one resource group, she can change resources in that resource group and only view everything else. NotActions is not a deny: if another role grants an operation, the user has it. The only thing that overrides an allow is a deny assignment, which you cannot create directly; Azure features such as deployment stacks and managed applications create them. To check access, open the resource's Access control (IAM) blade: Check access shows what a particular principal can do there, Role assignments lists every assignment at that scope including inherited ones, and Roles lets you inspect each role's permissions.",
   "Consider a worked example. A help desk team must restart virtual machines in the Production resource group but must not delete them or change networking. Contributor is far too broad, and Virtual Machine Contributor can still delete VMs. You clone Virtual Machine Contributor into a custom role, keep only `Microsoft.Compute/virtualMachines/read`, `start/action`, `restart/action` and `powerOff/action`, set the assignable scope to the subscription, and assign it to the HelpDesk security group at the Production resource group. A help desk member signs in, restarts a VM successfully, and gets an authorization error when trying to delete it.",
   "Common mistakes: thinking Contributor can grant access (it cannot); thinking User Access Administrator can create resources (it cannot); believing an assignment at a resource group can remove access inherited from the subscription; treating NotActions as a deny; and assigning roles to individual users instead of groups. Another trap is forgetting that effective access comes from group memberships too, so a user with no direct assignment may still have Owner through a nested group.",
   "Exam wording: 'grant access to others but not manage resources' points to User Access Administrator. 'Manage all resources but not grant access' points to Contributor. 'Least privilege' plus a narrow task points to a service-specific or custom role at the smallest scope. 'User has Reader here and Contributor there, what can they do' is an additive-permissions question: take the union at each scope. 'All resource groups, including future ones' points to assigning at the subscription or management group."
  ],
  "terms": [
   [
    "Role assignment",
    "The binding of a security principal to a role definition at a specific scope."
   ],
   [
    "Security principal",
    "The identity receiving access: a user, group, service principal or managed identity."
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
   ],
   [
    "Custom role",
    "A role definition you create with your own Actions, DataActions and assignable scopes when no built-in role fits."
   ],
   [
    "Deny assignment",
    "A block on specific actions that overrides role assignments; created by Azure features, not directly by administrators."
   ]
  ],
  "example": "A help desk team needs to restart virtual machines in the Production resource group but must not delete them or change networking. Rather than Contributor, or Virtual Machine Contributor (which can still delete VMs), the administrator creates a custom role with only the read, start, restart and power off actions and assigns it to the help desk security group at the Production resource group scope. A test sign-in confirms restarts work and deletes are refused.",
  "tip": "Contributor cannot assign roles, and User Access Administrator cannot create resources; only Owner can do both. Permissions add up across all assignments and groups, and NotActions is not a deny.",
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
   ],
   [
    "Can you block a user at one resource group from access they inherit through a subscription-level Owner assignment?",
    "Not with a role assignment; RBAC is additive. You must remove or narrow the subscription-level assignment, because you cannot create deny assignments yourself."
   ]
  ]
 },
 {
  "t": "Entra roles vs Azure RBAC roles, and data-plane roles such as Storage Blob Data Reader",
  "body": [
   "Azure has two separate role systems, and exam questions often test whether you know which one applies. Microsoft Entra roles control what someone can do in the directory itself: create users, reset passwords, manage groups, register applications and configure tenant settings. Examples are Global Administrator, User Administrator, Groups Administrator, Helpdesk Administrator, License Administrator and Application Administrator. Their scope is the whole tenant or an administrative unit (a container that limits a role to a subset of users or groups), and you assign them in Microsoft Entra ID > Roles and administrators. Azure role-based access control (RBAC) roles control what someone can do to Azure resources: virtual machines, storage accounts, networks. Their scopes are management groups, subscriptions, resource groups and resources, and you assign them on a resource's Access control (IAM) blade. The two systems are independent. A Global Administrator does not automatically have any access to subscriptions, and a subscription Owner cannot create users in Entra ID unless they also hold a suitable Entra role. When you read a question, first decide whether the task touches directory objects (users, groups, apps, licenses, passwords) or Azure resources; that decides which role system the answer comes from.",
   "There is one bridge. A Global Administrator can turn on 'Access management for Azure resources' in Microsoft Entra ID > Properties. That gives them the User Access Administrator role at root scope (`/`), above all management groups and subscriptions, so they can grant themselves or others access to any subscription. This is meant for recovery, such as when the only subscription Owner has left the company, and it should be switched off again afterwards, because the elevated assignment is powerful and is logged for auditing.",
   "Azure RBAC itself splits into two planes. The control plane (management plane) is the Azure Resource Manager (ARM) API at `management.azure.com`: creating a storage account, changing its firewall, reading its properties. The data plane is the data inside the resource: blobs, queue messages, table entities, Key Vault secrets, reached through the service's own endpoint such as `<account>.blob.core.windows.net`. Owner, Contributor and Reader are control-plane roles. Their definitions contain `Actions` but no `DataActions`, so by themselves they do not grant reading a blob through Microsoft Entra authorization.",
   "Data-plane roles fill that gap. Storage Blob Data Reader lets a principal read and list containers and blobs; Storage Blob Data Contributor adds write and delete; Storage Blob Data Owner also allows setting POSIX access control lists (ACLs) in Azure Data Lake Storage. There are matching roles for queues (Storage Queue Data Reader and Contributor), tables (Storage Table Data Reader and Contributor), Azure Files over REST, and Key Vault in its RBAC permission model (Key Vault Secrets User, Key Vault Administrator). Assign them at the storage account or, for least privilege, the container scope, for example `az role assignment create --role \"Storage Blob Data Reader\" --assignee <principal-id> --scope <storage-account-id>/blobServices/default/containers/reports`.",
   "A common surprise is that a Contributor can still read blobs in the portal. That is because Contributor has the control-plane action `Microsoft.Storage/storageAccounts/listKeys/action`, so the portal can fetch the storage account key and use Shared Key authorization. If you disable shared key access on the account, or switch the portal's authentication method to 'Microsoft Entra user account', only data-plane roles work. A Reader, who cannot list keys, sees the account but gets an authorization error when opening a container unless they also have a data role.",
   "Consider a worked example. An analytics app runs with a managed identity and needs to read files from the `reports` container only. Reader on the storage account would not work, because Reader has no data actions and cannot list the keys, and Contributor would let the app delete the account. You assign Storage Blob Data Reader on the `reports` container to the managed identity. Separately, a colleague who is Owner of the subscription asks why she cannot reset a user's password; you explain that Owner is an RBAC role and assign her Helpdesk Administrator in Entra ID, scoped to an administrative unit for her department.",
   "Common mistakes: expecting Global Administrator to manage VMs by default; expecting subscription Owner to manage users; picking Reader or Contributor when the question is about reading blob contents with Entra ID; and forgetting to turn off elevated access after a recovery.",
   "Exam wording helps: 'reset passwords', 'create users', 'register applications' point to Entra roles. 'Create VMs', 'manage networks' point to Azure RBAC. 'Read blob data using Microsoft Entra ID' or 'managed identity reads a container' points to a Storage Blob Data role. 'Only Owner left, regain access' points to elevating a Global Administrator to User Access Administrator at root scope."
  ],
  "terms": [
   [
    "Microsoft Entra role",
    "A directory role, such as User Administrator, that controls management of Entra objects and tenant settings."
   ],
   [
    "Administrative unit",
    "An Entra container that limits the scope of a directory role to a subset of users, groups or devices."
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
   ],
   [
    "Elevated access",
    "The Global Administrator option that grants User Access Administrator at root scope to recover access to all subscriptions."
   ]
  ],
  "example": "An analytics app runs with a managed identity and needs to read files from one container. The administrator assigns Storage Blob Data Reader on that container only. Giving it Reader on the storage account would not work, because Reader has no data actions and cannot list the keys, and Contributor would give it far more power than it needs, including the ability to delete the account.",
  "tip": "Directory tasks (users, groups, passwords, app registrations) point to Entra roles; resource tasks point to Azure RBAC. If the question is about reading blob contents with Entra ID, look for a Storage Blob Data role, not Reader or Contributor.",
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
   ],
   [
    "Why can a Contributor browse blobs in the portal even without a data role?",
    "Contributor can list the storage account keys, so the portal uses Shared Key authorization; disabling shared key access removes that path."
   ]
  ]
 },
 {
  "t": "Azure Policy: definitions, initiatives, assignments, scopes and exclusions, effects (Deny, Audit, Modify, DeployIfNotExists) and remediation tasks",
  "body": [
   "Azure Policy enforces rules about what resources may look like, while role-based access control (RBAC) controls who may act. RBAC answers 'can Ana create a VM?'; Policy answers 'is this VM, in this region, with these tags and this size, allowed to exist?'. Policy applies even to Owners, which is what makes it a governance tool rather than a permission system. Organizations use it to keep data in approved regions, require tags for cost reporting, restrict expensive VM sizes and make sure monitoring or security settings are always present.",
   "A policy definition is a JSON rule with an `if` condition and a `then` effect, for example 'if the resource location is not in the allowed list, then Deny'. Hundreds of built-in definitions exist, such as Allowed locations, Allowed virtual machine size SKUs and Require a tag on resources, and you can write custom ones. Definitions usually expose parameters, such as `listOfAllowedLocations`, so one definition can be reused with different values. An initiative (policy set definition) groups several definitions so you can assign them together and track them as one compliance goal; the Microsoft cloud security benchmark is a built-in initiative that Microsoft Defender for Cloud uses.",
   "Nothing happens until you create an assignment. You assign a definition or initiative to a scope (management group, subscription or resource group), fill in its parameters and optionally add exclusions, which are child scopes the assignment skips. Exemptions are a separate object that exempt a specific scope or resource for a documented reason, a Waiver or Mitigated category, often with an expiry date. Assignments are inherited by all child scopes, just like RBAC. From the command line you can run `az policy assignment create --name allowed-eu --policy <definition-id> --scope /subscriptions/<id> --params '{\"listOfAllowedLocations\":{\"value\":[\"westeurope\",\"northeurope\"]}}'`.",
   "The effect decides what happens when a resource matches. Deny blocks the create or update request, so the deployment fails with a `RequestDisallowedByPolicy` error. Audit allows the request but marks the resource non-compliant in the Compliance view. AuditIfNotExists and DeployIfNotExists check for a related resource after the main one is created, such as a diagnostic setting or an antimalware extension; AuditIfNotExists only reports, while DeployIfNotExists deploys the missing resource with an Azure Resource Manager (ARM) template. Modify adds, replaces or removes properties or tags on the request, for example adding a CostCenter tag. Append adds fields to the request, and Disabled turns the rule off, which is handy as a parameter value when testing.",
   "New and updated resources are evaluated at request time. Existing resources are evaluated after assignment and in periodic compliance scans, and Deny does not change them; they are simply reported as non-compliant. To fix existing resources for Modify and DeployIfNotExists policies, you create a remediation task from the assignment or from Policy > Remediation. Because these effects change resources, the assignment needs a managed identity holding the roles listed in the definition's `roleDefinitionIds`, which the portal creates when you assign the policy. A good rollout practice is to assign with Audit first, review the compliance results, then switch to Deny.",
   "Consider a worked example. A company must keep all data in two European regions. You assign the built-in Allowed locations definition to the root management group with `westeurope` and `northeurope` as parameters, and exclude the sandbox subscription used for experiments. A developer later tries to deploy a storage account to East US and receives a `RequestDisallowedByPolicy` error naming the assignment. Existing out-of-region resources keep running and appear in Policy > Compliance as non-compliant, so the team plans their migration. You also assign a DeployIfNotExists policy that sends VM diagnostics to a Log Analytics workspace, and run a remediation task to configure the 30 VMs that existed before the assignment.",
   "Common mistakes: expecting Deny or Audit to fix existing resources; forgetting that remediation needs the assignment's managed identity with the right roles; confusing an exclusion (set on the assignment, no reason recorded) with an exemption (a separate object with a category and optional expiry); expecting RBAC Owner to bypass a Deny policy; and assuming a definition does anything before it is assigned. Also remember that compliance results are not instant; a new assignment can take some time before its first evaluation shows up.",
   "Exam wording: 'prevent creation' or 'block' points to Deny. 'Report without blocking' points to Audit. 'Automatically add a tag' points to Modify. 'Automatically deploy an agent, extension or diagnostic setting if missing' points to DeployIfNotExists. 'Fix resources that already exist' points to a remediation task. 'Group several policies into one compliance goal' points to an initiative, and 'skip one resource group' points to an exclusion or exemption."
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
    "Assignment",
    "The application of a definition or initiative to a scope, with parameter values and optional exclusions."
   ],
   [
    "Exclusion",
    "A child scope listed on an assignment that the assignment does not evaluate."
   ],
   [
    "Exemption",
    "A separate object that excuses a scope or resource from an assignment for a Waiver or Mitigated reason, optionally with an expiry."
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
  "example": "A company must keep data in two European regions. The administrator assigns the built-in Allowed locations definition to the root management group with those two regions as parameters, and excludes the sandbox subscription. When a developer tries to deploy to East US, the deployment fails with a RequestDisallowedByPolicy error, and existing out-of-region resources appear as non-compliant so the team can plan their migration.",
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
   ],
   [
    "A DeployIfNotExists remediation task fails with an authorization error. What should you check?",
    "The assignment's managed identity and whether it holds the roles the definition requires at the right scope."
   ]
  ]
 },
 {
  "t": "Resource locks: CanNotDelete vs ReadOnly, inheritance and who can remove them",
  "body": [
   "Resource locks protect important resources from accidental changes, including by people who have full permissions. Role-based access control (RBAC) might let an Owner delete a production database, but a lock stops the delete until someone deliberately removes the lock first. Locks are a safety catch, not an access-control system: they do not decide who can act, they add a deliberate extra step before dangerous operations. That extra step is exactly what prevents a mistyped command or an over-eager cleanup script from destroying production. Locks also apply to automation, so pipelines and scripts running as service principals are stopped just like people.",
   "There are two lock levels. CanNotDelete (shown as Delete in the portal) lets authorized users read and modify a resource but not delete it. ReadOnly lets authorized users read a resource but not delete or update it, which behaves roughly like restricting everyone to the Reader role for that resource. You apply a lock to a subscription, a resource group or an individual resource from its Locks blade (Settings > Locks > Add), or from the command line:",
   "```bash\naz lock create --name keep-prod --lock-type CanNotDelete --resource-group rg-prod\naz lock list --resource-group rg-prod --output table\naz lock delete --name keep-prod --resource-group rg-prod\n```",
   "Locks are inherited. A lock on a resource group applies to every resource in it, including resources added later, and a lock on a subscription applies to everything in the subscription. If several locks apply, the most restrictive one wins. A CanNotDelete lock on a resource group also means the resource group itself cannot be deleted, although you can still add new resources to it. Locks act on the control plane, meaning operations sent to Azure Resource Manager at `management.azure.com`. They do not stop data-plane operations: a CanNotDelete lock on a storage account stops someone deleting the account but not deleting blobs inside it, and a ReadOnly lock on a SQL server does not stop rows being changed in its databases. For data, use soft delete, versioning, backups or immutability policies.",
   "ReadOnly locks have side effects that exam questions like to test, because some operations that look like reads are really POST requests. A ReadOnly lock on a storage account blocks the list keys operation, so users who rely on account keys cannot browse data in the portal. A ReadOnly lock on a resource group containing a VM blocks starting, stopping, resizing or adding a data disk. A ReadOnly lock on an App Service blocks viewing the log stream and scaling. Many teams therefore prefer CanNotDelete for production and reserve ReadOnly for resources that truly never change. To create or delete a lock you need `Microsoft.Authorization/locks/*` permissions; among built-in roles, only Owner and User Access Administrator have them. Contributor does not, so a Contributor cannot remove a lock and therefore cannot delete a locked resource.",
   "Consider a worked example. You put a CanNotDelete lock on the resource group holding a company's production virtual network and firewall. Months later a Contributor runs a cleanup script that deletes every resource with an old project tag. The network resources survive, the script logs `ScopeLocked` errors, and the team reviews the change calmly instead of rebuilding the network. Later an Owner legitimately needs to delete an obsolete subnet's network security group; she removes the lock, performs the delete, and adds the lock back, recording both steps in the change ticket.",
   "Common mistakes: expecting a lock to protect data inside a resource; choosing ReadOnly for a VM resource group and then being surprised that VMs cannot be started or scaled; thinking Contributor can remove locks; and forgetting that locks are inherited, so a subscription-level lock you forgot about blocks deletion of a test resource group. Also note that a CanNotDelete lock on a single resource blocks deletion of its whole resource group, because deleting the group would delete the locked resource.",
   "Exam wording: 'prevent accidental deletion but allow changes' points to CanNotDelete. 'Prevent any modification' points to ReadOnly. 'Users with Owner cannot delete the resource' means there is a lock, and the fix is to remove it first. 'Which role can remove the lock' is Owner or User Access Administrator. 'After applying a lock, users cannot view storage data or start VMs' is the ReadOnly side effect. 'Protect blobs from deletion' is not a lock question; look for soft delete or immutability."
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
   ],
   [
    "Microsoft.Authorization/locks/*",
    "The permission needed to create or delete locks, held by Owner and User Access Administrator among built-in roles."
   ],
   [
    "ScopeLocked",
    "The error Azure returns when an operation is blocked by a resource lock."
   ]
  ],
  "example": "An administrator puts a CanNotDelete lock on the resource group holding a company's production virtual network and firewall. Months later a Contributor runs a cleanup script that tries to delete everything with an old tag; the network resources survive, the script logs ScopeLocked errors, and the team can review the change calmly instead of rebuilding the network under pressure.",
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
   ],
   [
    "A subscription and a resource group inside it have different lock levels. Which applies?",
    "The most restrictive lock applies, because locks are inherited and combine; ReadOnly beats CanNotDelete."
   ]
  ]
 },
 {
  "t": "Tags: applying tags, why tags are not inherited, and enforcing or inheriting tags with policy",
  "body": [
   "Tags are name and value pairs, such as `CostCenter = 1234` or `Environment = Production`, that you attach to subscriptions, resource groups and resources. They do not change how a resource works. Instead they add business metadata you can filter, report and automate on: who owns the resource, which project pays for it, whether it may be shut down at night. Cost analysis in Microsoft Cost Management can group spending by tag, which is often the main reason organizations adopt a tagging standard in the first place. Automation can use them too, for example a runbook that stops every VM tagged `AutoShutdown = Yes` each evening. A tagging standard only works if it is enforced, which is where Azure Policy comes in later in this lesson.",
   "You apply tags on a resource's Tags blade, when creating it in the portal, in Azure Resource Manager (ARM) or Bicep templates with the `tags` property, or from the command line. Watch the operation: Merge adds or updates the tags you name, while Replace removes every existing tag and leaves only the new set, and Delete removes the named tags.",
   "```bash\naz tag update --resource-id <id> --operation Merge --tags CostCenter=1234 Owner=ana\naz tag update --resource-id <id> --operation Replace --tags Owner=ana\n# PowerShell equivalent\nUpdate-AzTag -ResourceId <id> -Tag @{CostCenter='1234'} -Operation Merge\n```",
   "Tag names are not case-sensitive for most operations, while values are. Each resource has a limit on how many tags it can carry, and not every resource type supports tags. To edit tags you need write access to the resource, which Contributor provides. The built-in Tag Contributor role lets someone manage tags on resources without giving them access to the resources themselves, which suits a finance or governance team. The key exam fact is that tags are not inherited. If you tag a resource group `CostCenter = 1234`, the VMs, disks and network interfaces inside it do not get that tag, and the same is true for subscriptions. Cost Management has its own tag inheritance setting that applies subscription and resource group tags to usage records for reporting, but it does not tag the resources themselves.",
   "Azure Policy closes the gap. Built-in definitions include 'Require a tag on resources' and 'Require a tag and its value on resource groups', which use the Deny effect so untagged deployments fail. 'Add or replace a tag on resources' and 'Inherit a tag from the resource group if missing' use the Modify effect, so Azure adds the tag automatically as resources are created or updated. For resources that already exist, run a remediation task on the Modify assignment, and it tags them in bulk using the assignment's managed identity. A good pattern combines both: require a CostCenter tag on resource groups with Deny, assign 'Inherit a tag from the resource group if missing' for the same tag at the subscription or management group, then remediate existing resources once.",
   "Consider a worked example. Finance reports that 70 percent of last month's spending is untagged, even though every resource group has a CostCenter tag. You explain that tags are not inherited, then assign 'Inherit a tag from the resource group if missing' for CostCenter at the subscription and create a remediation task that tags existing resources. You also assign 'Require a tag on resource groups' with Deny so new groups cannot be created without CostCenter. Next month's cost analysis grouped by CostCenter shows almost no untagged spend, and developers never had to change their templates.",
   "Common mistakes: assuming a resource group tag flows to its resources; using Replace when you meant Merge and wiping existing tags; picking Deny when the requirement is to add tags automatically; forgetting remediation for existing resources; and giving a finance team Contributor just so they can edit tags, when Tag Contributor is the least-privilege choice. Also remember that tags are plain text and visible to anyone with read access, so never store secrets in them.",
   "Exam wording: 'resources do not show the resource group's tags' points to lack of inheritance. 'Automatically apply the resource group's tag' points to the Modify policy 'Inherit a tag from the resource group if missing'. 'Prevent resources without a tag' points to Deny with 'Require a tag'. 'Apply to existing resources' points to a remediation task. 'Manage tags only' points to Tag Contributor. 'Report costs by department' points to tags plus cost analysis grouped by tag."
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
    "Require a tag on resources",
    "A built-in Deny policy that blocks creating or updating resources that lack a specified tag."
   ],
   [
    "Inherit a tag from the resource group",
    "A built-in Modify policy that copies a tag from the parent resource group onto resources that lack it."
   ],
   [
    "Cost Management tag inheritance",
    "A billing setting that applies parent tags to usage records for reporting without changing the resources."
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
   ],
   [
    "A finance analyst must edit tags on all resources but not change the resources. Which role do you assign?",
    "Tag Contributor, which grants tag management without access to the resources themselves."
   ]
  ]
 },
 {
  "t": "Resource groups: create, move resources between groups and subscriptions",
  "body": [
   "A resource group is a logical container for resources that share a lifecycle: you deploy them together, manage access to them together and usually delete them together. Every resource must belong to exactly one resource group, and resource groups cannot be nested. Group by lifecycle and ownership, for example one resource group per application environment such as `rg-shop-prod` and `rg-shop-test`, rather than by resource type such as 'all VMs'. Role-based access control (RBAC) assignments, Azure Policy assignments and locks applied to a resource group are inherited by the resources in it, which is why the grouping matters.",
   "You create a resource group with a name and a region, in the portal, with `az group create --name rg-app --location westeurope` or with `New-AzResourceGroup -Name rg-app -Location westeurope`. The region only says where the group's metadata (the list of resources and deployment history) is stored. Resources inside can be in any region. If the group's region has an outage you may not be able to update resources through it, which is why some organizations keep the metadata region close to the resources. Deleting a resource group (`az group delete --name rg-app`) deletes everything in it, which makes cleanup easy in a lab and dangerous in production; that is one reason to put CanNotDelete locks on important resource groups.",
   "You can move resources to another resource group in the same subscription, or to a resource group in another subscription, as long as both subscriptions trust the same Microsoft Entra tenant. In the portal select the resources and choose Move > Move to another resource group or Move to another subscription. From the command line use `az resource move --destination-group rg-new --ids <resource-id>` (add `--destination-subscription-id` for a different subscription) or `Move-AzResource`. The portal first validates the move. During the move both the source and the target resource group are locked against writes and deletes, but the resources keep running, so there is no downtime for most types.",
   "Several rules decide whether a move succeeds. Not every resource type supports moving, and some only support moving within a subscription; Microsoft publishes a support table per type. Dependent resources must move together: a VM with its disks and network interface, or an App Service app with its plan. The target subscription must have the needed resource providers registered (for example `az provider register --namespace Microsoft.Web`) and enough quota. You need write permission on the source group and on the target group. Moving to a different tenant requires transferring the whole subscription instead.",
   "Two distinctions show up again and again. First, the region does not change in a move: a VM in East US stays in East US even if its new resource group's metadata is in West Europe. To change regions you redeploy, or use Azure Resource Mover or Azure Site Recovery. Second, after a move the resource ID changes, because it includes the subscription ID and resource group name (`/subscriptions/<id>/resourceGroups/<rg>/providers/...`). Scripts, templates, alerts or pipelines that referenced the old ID must be updated. Role assignments made directly on the resource do not move with it; the resource now inherits assignments and policies from its new resource group and subscription, so check access after moving.",
   "Consider a worked example. A project finishes its pilot, and its web app, App Service plan and storage account must move from the Dev subscription to Production. You confirm both subscriptions are in the same tenant, register `Microsoft.Web` in the target, select all three resources together and run Move to another subscription. Validation passes, and the move completes while the site keeps serving traffic. Afterwards you update a deployment pipeline that referenced the old resource IDs and re-create a role assignment that had been set directly on the web app. The resources now also fall under the Production subscription's policies.",
   "Common mistakes: expecting a move to relocate a resource to another region; trying to move a VM without its disks and network interface; moving to a subscription in another tenant; forgetting to register providers in the target subscription; and assuming resource-level role assignments travel with the resource. Another is grouping by resource type, which makes lifecycle management and access control harder.",
   "Exam wording: 'can a resource group in region A contain resources in region B' is yes. 'Move to another region' is not a move operation; look for Resource Mover, Site Recovery or redeployment. 'Script fails after the move with resource not found' points to the changed resource ID. 'Move between subscriptions' requires the same Entra tenant and moving dependent resources together. 'Delete all lab resources at once' points to deleting the resource group."
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
   ],
   [
    "Resource provider registration",
    "Enabling a namespace such as Microsoft.Web in a subscription so its resource types can be created or moved there."
   ],
   [
    "Azure Resource Mover",
    "A service that helps relocate resources to another Azure region, which a resource group move cannot do."
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
   ],
   [
    "What must be true before you can move resources to a different subscription?",
    "Both subscriptions must be in the same Entra tenant, the resource types must support the move, dependent resources move together and the target has the providers registered."
   ]
  ]
 },
 {
  "t": "Subscriptions and management groups: hierarchy, inheritance of policy and RBAC",
  "body": [
   "Azure organizes resources in a four-level hierarchy: management groups contain subscriptions, subscriptions contain resource groups, and resource groups contain resources. Understanding the hierarchy is essential because role-based access control (RBAC) role assignments and Azure Policy assignments made at any level flow down to everything beneath it. If you know where an assignment was made, you can predict exactly which resources it affects, today and in the future.",
   "A subscription is a billing and management boundary. Each one has its own invoice line, its own quotas (such as how many virtual CPUs you can run per region), and trusts exactly one Microsoft Entra tenant for identities, although a tenant can have many subscriptions. Organizations often separate subscriptions by environment (production versus development), by business unit or by billing owner, so that limits and costs are isolated and access can be granted per subscription. You can view quotas under Subscription > Usage + quotas and request increases there when a deployment fails for lack of capacity.",
   "Management groups sit above subscriptions and let you manage many subscriptions as one. Every tenant has a single root management group, shown as the Tenant Root Group, and all other management groups and subscriptions sit under it. You can nest management groups several levels deep to mirror your organization, for example Root > Corp > Europe > Production. Each management group and each subscription has exactly one parent, though a parent can have many children. New subscriptions land in a default management group, which is the root unless you change the default in the hierarchy settings. You create and organize them in the portal under Management groups, or with commands such as:",
   "```bash\naz account management-group create --name Corp --display-name \"Corp\"\naz account management-group subscription add --name Corp --subscription <subscription-id>\n```",
   "Inheritance is the point. If you assign the Reader role to the Auditors group on the Corp management group, auditors can read every subscription and resource under Corp, including subscriptions added next year. If you assign an Allowed locations policy there, every child subscription is restricted too. A child scope cannot remove what it inherits: a subscription Owner cannot delete a policy assignment or role assignment made on a parent management group, although someone with rights at the assignment's scope can add exclusions or exemptions. Moving a subscription to a different management group changes what it inherits immediately: it loses the old parent's assignments and gains the new ones. To move a subscription you need rights on the subscription (such as Owner) and on the target parent management group (such as Management Group Contributor), plus write access on the current parent. Hierarchy settings can require a permission before users create new management groups.",
   "Consider a worked example. A retailer has 30 subscriptions and must keep all data in the European Union. Instead of assigning Allowed locations 30 times, you create a management group called Retail under the root, move the 30 subscriptions into it and assign the policy once at Retail. You also assign Reader to the Auditors group at Retail and Contributor to each application team on its own subscription. When a new subscription is created next quarter and moved into Retail, it is compliant and visible to auditors from day one, with no extra work. This is the landing zone pattern: company-wide guardrails high up, business-unit rules one level down, and teams given freedom within their own subscriptions.",
   "Common mistakes: expecting assignments to flow up or sideways (they only flow down); believing a subscription can have two parent management groups or trust two tenants; thinking a subscription Owner can remove a policy inherited from a management group; forgetting that moving a subscription instantly changes its inherited policies and access; and assigning the same policy to many subscriptions one by one instead of at a common parent. Another trap is confusing management groups with resource groups: management groups hold subscriptions, resource groups hold resources.",
   "Exam wording: 'apply to all current and future subscriptions with the least administrative effort' points to an assignment at a management group, often the root or a common parent. 'Separate billing' or 'separate quotas' points to separate subscriptions. 'Subscription moved and now fails a policy' points to inheritance from the new parent. 'How many parents can a subscription have' is one. 'Users in one subscription must not be affected' points to placing that subscription in a different branch of the hierarchy or using an exclusion."
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
   ],
   [
    "Default management group",
    "The management group where newly created subscriptions are placed, the root unless changed in hierarchy settings."
   ],
   [
    "Landing zone",
    "A design pattern that places shared guardrails high in the hierarchy and gives teams their own subscriptions beneath it."
   ]
  ],
  "example": "A retailer has 30 subscriptions and must keep all data in the EU. Instead of assigning Allowed locations 30 times, the administrator builds a management group called Retail, moves the subscriptions under it and assigns the policy once. When a new subscription is created and moved into Retail, it is compliant from day one, and auditors given Reader at Retail can see it immediately.",
  "tip": "Assignments flow down, never up or sideways. To apply a rule to many subscriptions with the least effort, assign it at their common management group. A subscription trusts one tenant, and each subscription has exactly one parent management group.",
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
   ],
   [
    "Can a subscription Owner delete a policy assignment made at the parent management group?",
    "No. Inherited assignments can only be changed at the scope where they were made, by someone with rights there."
   ]
  ]
 },
 {
  "t": "Cost management: cost analysis, budgets and budget alerts, Azure Advisor cost recommendations, reservations",
  "body": [
   "Azure is billed on consumption, so costs can grow quietly: a forgotten test VM, an unattached disk or a public IP address left behind after a lab all keep charging. Microsoft Cost Management, available in the portal at no extra charge for Azure resources, gives you the tools to see where money goes, warn you before overspending and find savings. An administrator is expected to set these up and act on them, not just read the invoice at the end of the month.",
   "Cost analysis is the reporting view (Cost Management > Cost analysis). You pick a scope (management group, subscription or resource group), a date range and a view such as accumulated costs, daily costs or cost by service. Then you group and filter by resource group, service name, location, meter or tag. Grouping by tag is how you do chargeback or showback to departments, which is why tagging matters. The accumulated view also shows forecasted cost for the rest of the period, and you can save views, pin them to dashboards, or schedule exports of cost data to a storage account for analysis in other tools. Cost data is refreshed several times a day, not in real time, so do not expect a resource created a minute ago to appear yet.",
   "A budget sets a spending threshold for a scope over a reset period (monthly, quarterly or annually). You attach alert conditions as percentages of the budget, based on actual cost or forecasted cost, for example 50 percent actual, 90 percent actual and 100 percent forecasted. When a condition is met, Azure emails the listed recipients and can trigger an action group, which can run an Azure Automation runbook, a Logic App or a function, for instance to shut down development VMs. Budgets never stop resources or spending by themselves; they only notify, and any stopping has to be done by the automation you attach. A forecasted alert is useful because it warns you before you overspend rather than after.",
   "Azure Advisor analyzes your configuration and usage and gives recommendations in five categories: Cost, Security, Reliability, Operational Excellence and Performance. Cost recommendations include shutting down or resizing underused virtual machines, deleting unattached managed disks and idle public IP addresses, and buying reservations or savings plans for steady workloads. Each recommendation shows its estimated savings; you can act on it, postpone it or dismiss it, and you can adjust the CPU threshold Advisor uses to judge a VM as underused.",
   "Azure Reservations give a discount in exchange for committing to a specific resource type, such as a VM size family in a region, for one or three years. The reservation is a billing discount applied automatically to matching running resources; it does not create, start or guarantee capacity for a VM. You scope a reservation to a single resource group, a single subscription, a management group or shared across the billing context so that any matching usage benefits. Azure savings plans for compute commit to an hourly spend across services and regions, trading some discount for more flexibility. Other levers are Azure Hybrid Benefit (using existing Windows Server or SQL Server licenses with Software Assurance), Spot VMs for interruptible work, auto-shutdown schedules on dev VMs, and right-sizing.",
   "Consider a worked example. A development team keeps running over its expected spend. You create a monthly budget on the team's resource group with email alerts at 80 percent actual and 100 percent forecasted, and link the forecasted alert to an action group that runs a runbook stopping VMs tagged `Environment = Dev`. In Advisor's Cost category you find three unattached disks and a VM averaging low CPU, so the team deletes the disks and resizes the VM. For the production database VMs, which run all the time on the same size, you buy a reservation scoped to the production subscription.",
   "Common mistakes: assuming a budget caps spending; expecting a reservation to deploy or hold a VM; buying a reservation for workloads that are resized or switched off often, where a savings plan or nothing at all fits better; forgetting that cost data lags; and relying on resource group tags that were never copied to resources, which leaves spending untagged in cost analysis.",
   "Exam wording: 'notify when spending reaches' points to a budget with alert conditions. 'Automatically stop resources when the budget is reached' points to a budget plus an action group running automation. 'Identify underused VMs' or 'recommendations to reduce cost' points to Azure Advisor. 'Steady workload running continuously for years' points to a reservation. 'Break down costs by department' points to tags and cost analysis grouped by tag. 'Reuse on-premises Windows licenses' points to Azure Hybrid Benefit."
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
    "Azure Advisor",
    "A service that analyzes your resources and gives Cost, Security, Reliability, Operational Excellence and Performance recommendations."
   ],
   [
    "Reservation",
    "A one- or three-year commitment to a resource type in exchange for a billing discount on matching usage."
   ],
   [
    "Savings plan for compute",
    "A commitment to an hourly compute spend that discounts usage across services and regions."
   ],
   [
    "Azure Hybrid Benefit",
    "A licensing benefit that lets you use existing Windows Server or SQL Server licenses with Software Assurance in Azure."
   ]
  ],
  "example": "A development team keeps running over its budget. The administrator creates a monthly budget on the team's resource group with email alerts at 80 percent actual and 100 percent forecasted, and links an action group to a runbook that stops tagged dev VMs. Advisor also flags three idle disks and a VM running at low CPU, which the team deletes and resizes, and the next month's cost analysis shows the savings.",
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
   ],
   [
    "Does buying a VM reservation create a virtual machine?",
    "No. A reservation is a billing discount applied automatically to matching running VMs; you still deploy the VMs yourself."
   ]
  ]
 },
 {
  "t": "Storage account types and redundancy: LRS, ZRS, GRS, RA-GRS, GZRS and RA-GZRS",
  "body": [
   "A storage account is the top-level container for Azure Storage services: blobs, files, queues and tables. When you create one you choose a globally unique name (3 to 24 lowercase letters and numbers, which becomes part of endpoints such as `name.blob.core.windows.net`), a region, a performance tier and a redundancy option. Performance and redundancy are the two decisions the exam tests most, because they determine latency, which features you get, how your data survives failures and what you pay.",
   "Standard general-purpose v2 is the recommended account type for most workloads: it supports all four services, the Hot, Cool, Cold and Archive access tiers and all redundancy options, and runs on hard-disk based storage. Premium accounts use solid-state storage for low, consistent latency and come in three kinds, each for one service: premium block blobs, premium file shares and premium page blobs. Premium accounts support only locally or zone-redundant options, never geo-redundancy, so if a question needs a copy in another region with built-in replication, it needs a standard account. You can create one with `az storage account create --name stcontoso01 --resource-group rg-data --location westeurope --sku Standard_RAGZRS --kind StorageV2`.",
   "Redundancy options keep multiple copies of your data. Locally redundant storage (LRS) keeps three synchronous copies within a single datacenter in the primary region. It is the cheapest and protects against disk and server failures, but not a datacenter-wide outage. Zone-redundant storage (ZRS) keeps three synchronous copies spread across three availability zones in the primary region, so data stays available for reads and writes if one zone fails. Use it for high availability within a region and for data that must stay in one region for compliance.",
   "Geo-redundant storage (GRS) keeps three copies with LRS in the primary region and replicates them asynchronously to the paired secondary region, where another three LRS copies are kept. Geo-zone-redundant storage (GZRS) uses ZRS in the primary and LRS in the secondary, combining zone and region protection. Because geo-replication is asynchronous, a region failover can lose the most recent writes; the Last Sync Time property tells you how current the secondary is. With plain GRS and GZRS the secondary copy cannot be read until a failover happens. Read-access versions, RA-GRS and RA-GZRS, let applications read from a secondary endpoint (the account name with `-secondary` appended, such as `name-secondary.blob.core.windows.net`) at any time. A customer can initiate failover from the account's redundancy settings; after an unplanned failover the account becomes locally redundant in the new primary until you reconfigure geo-redundancy.",
   "You can change redundancy after creation. Moving between LRS, GRS and RA-GRS is a simple setting change. Moving to or from zone redundancy, such as LRS to ZRS, requires a conversion that Azure performs in the background, or a manual data migration in some cases. Some features have restrictions, for example the Archive access tier is not supported on accounts using ZRS, GZRS or RA-GZRS. The rule for choosing: pick the cheapest option that meets the stated requirement. Disk or server failure only means LRS; zone failure means ZRS; regional failure means GRS or GZRS; zone plus regional failure means GZRS; reading during a regional outage without failover means an RA option.",
   "Consider a worked example. A news site stores images in a storage account. It must keep serving them if one availability zone fails, without any disruption, and it must keep serving them during a full regional outage without waiting for a failover. ZRS alone survives a zone failure but not a region failure. RA-GRS allows secondary reads but uses LRS in the primary, so a zone failure could interrupt the primary. RA-GZRS meets both: ZRS in the primary handles the zone, and the read-only secondary endpoint keeps images available if the region fails. The app is configured to fall back to the secondary endpoint on read errors.",
   "Common mistakes: choosing a premium account when geo-redundancy is required; confusing GRS (secondary not readable until failover) with RA-GRS; thinking geo-replication is synchronous and therefore lossless; assuming failover keeps geo-redundancy automatically; and choosing GZRS when only zone protection is required, which costs more than needed. Also remember that redundancy is about availability and durability, not backup: a deleted or overwritten blob is replicated too, so you still need soft delete or versioning.",
   "Exam wording: 'cheapest' plus 'datacenter failure' points to ZRS; 'cheapest' with no failure requirement points to LRS. 'Regional outage' points to GRS or GZRS. 'Read from the secondary region at any time' or 'without failover' points to RA-GRS or RA-GZRS. 'Both zone and region failure' points to GZRS or RA-GZRS. 'Premium' plus 'another region' is a trap, since premium accounts have no geo-redundant option."
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
   ],
   [
    "Standard general-purpose v2",
    "The recommended storage account kind that supports all services, access tiers and redundancy options."
   ],
   [
    "Customer-initiated failover",
    "An action that promotes the secondary region to primary when the primary region is unavailable."
   ]
  ],
  "example": "A news site stores images in a storage account and must keep serving them even if the entire primary region goes down, without waiting for a failover, and must survive a single zone failure without disruption. RA-GZRS meets both: ZRS protects against a zone failure in the primary, and read access to the secondary endpoint keeps images available during a regional outage while the team decides whether to fail over.",
  "tip": "Map requirements to options: zone or datacenter failure = ZRS minimum; region failure = GRS or GZRS; must read during a regional outage = RA-GRS or RA-GZRS. Premium accounts do not offer geo-redundancy.",
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
    "Not with built-in account redundancy; premium accounts support only local or zone redundancy. Use a standard account or replicate data yourself, for example with object replication."
   ],
   [
    "Why can data be lost when you fail over a GRS account?",
    "Geo-replication is asynchronous, so writes made after the Last Sync Time may not have reached the secondary."
   ]
  ]
 },
 {
  "t": "Storage firewalls and virtual network rules, trusted Microsoft services, private endpoints for storage",
  "body": [
   "By default a new storage account accepts connections from any network and relies on authorization (keys, shared access signatures or Microsoft Entra ID) to keep data safe. The storage firewall adds a network layer: even a request with a valid key is refused if it does not come from an allowed network. You configure it under the account's Networking blade, where public network access can be enabled from all networks, enabled from selected virtual networks and IP addresses, or disabled. Defense in depth means using both layers: strong authorization and restricted networks.",
   "When you choose selected networks, the account denies everything except what you list. IP network rules allow specific public IP addresses or ranges in Classless Inter-Domain Routing (CIDR) notation, such as your office's internet address `203.0.113.0/24`. They only work for public addresses; you cannot use them for private address ranges inside a virtual network. Virtual network rules allow specific subnets. For a subnet to be added, it must have a service endpoint for `Microsoft.Storage` enabled, which the portal can turn on for you, or you can run `az network vnet subnet update --vnet-name vnet-hub --name snet-app --resource-group rg-net --service-endpoints Microsoft.Storage` and then `az storage account network-rule add --account-name stfin --vnet-name vnet-hub --subnet snet-app`. With a service endpoint, traffic from the subnet travels to storage over the Azure backbone and carries the subnet's identity, so the firewall can recognize it, but the storage account keeps its public IP address and the client still connects to the public endpoint.",
   "Blocking public traffic can break Azure services that need to reach your account, such as Azure Backup, Azure Monitor diagnostic logs, Azure Event Grid or Azure Site Recovery. The exception 'Allow Azure services on the trusted services list to access this storage account' lets those specific first-party services through, using strong authentication. Resource instance rules go further and allow one particular resource, such as a specific Azure Synapse workspace, to reach the account through its managed identity, which is tighter than trusting a whole service.",
   "A private endpoint is the strongest option. It creates a network interface in one of your subnets with a private IP address from that subnet, connected by Azure Private Link to one sub-resource of the storage account: `blob`, `file`, `queue`, `table`, `web` or `dfs`. Clients in the virtual network, peered networks or on-premises networks connected by VPN (virtual private network) or ExpressRoute reach the account over that private IP. You can then set public network access to Disabled so the account has no internet exposure at all. You need one private endpoint per sub-resource you use, so an app that uses both blobs and files needs two.",
   "Private endpoints depend on DNS (Domain Name System). The account name must resolve to the private IP for clients that should use the endpoint. The portal offers to integrate with a private DNS zone such as `privatelink.blob.core.windows.net`, linked to your virtual network, so `name.blob.core.windows.net` resolves through a CNAME record to the private address. On-premises clients need DNS forwarding to Azure, for example through Azure DNS Private Resolver, to get the same answer; otherwise they resolve the public IP and are blocked. Running `nslookup name.blob.core.windows.net` from a client quickly shows which address it gets.",
   "Consider a worked example. A finance team's storage account must not be reachable from the internet, but VMs in the Hub virtual network and users in the on-premises office over VPN need to read blobs. You create a private endpoint for the `blob` sub-resource in a Hub subnet, integrate it with the `privatelink.blob.core.windows.net` private DNS zone, configure on-premises DNS forwarding, and set public network access to Disabled. You enable the trusted services exception so Azure Backup still works. An `nslookup` from the office now returns the private address, and a test from a home internet connection is refused.",
   "Common mistakes: trying to add a private IP range to the IP rules; adding a subnet rule without enabling the `Microsoft.Storage` service endpoint; expecting service endpoints to help on-premises clients; creating a private endpoint for `blob` and expecting file shares to work through it; forgetting DNS so clients still resolve the public address; and locking down the firewall without the trusted services exception, which silently breaks backup or logging.",
   "Exam wording: 'allow the office's public IP' points to an IP network rule. 'Allow a subnet' or 'traffic over the Azure backbone while keeping the public endpoint' points to a service endpoint and virtual network rule. 'Private IP address', 'no public access', 'on-premises over VPN or ExpressRoute' or 'peered network' points to a private endpoint. 'Azure Backup or diagnostic logs stopped working after restricting access' points to the trusted Microsoft services exception. 'Name still resolves to a public address' points to private DNS zone configuration."
  ],
  "terms": [
   [
    "Storage firewall",
    "Network rules on a storage account that allow only listed public IP ranges, subnets and exceptions to connect."
   ],
   [
    "IP network rule",
    "A firewall rule that allows a public IP address or CIDR range; private ranges are not allowed."
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
   ],
   [
    "Private DNS zone",
    "A DNS zone such as privatelink.blob.core.windows.net that resolves the account name to the private endpoint's IP inside linked networks."
   ]
  ],
  "example": "A finance team's storage account must not be reachable from the internet, but VMs in the Hub virtual network and the on-premises office over VPN need to read blobs. The administrator creates a private endpoint for the blob sub-resource in a Hub subnet, integrates it with the privatelink.blob.core.windows.net private DNS zone, configures on-premises DNS forwarding, and sets public network access to Disabled. The trusted services exception is enabled so Azure Backup still works.",
  "tip": "Service endpoints keep the public endpoint and only work from Azure subnets; private endpoints give a private IP usable from peered and on-premises networks. IP rules cannot contain private addresses, and private endpoints need correct DNS.",
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
   ],
   [
    "A private endpoint for blob exists, but a VM still connects to the public IP. What is the likely cause?",
    "DNS: the private DNS zone is missing or not linked to the VM's virtual network, so the name resolves to the public address."
   ]
  ]
 },
 {
  "t": "Shared access signatures: account, service and user delegation SAS; stored access policies; access keys and key rotation",
  "body": [
   "Every storage account has two access keys, key1 and key2. Either key gives full control of all data in the account, like a root password, which is why sharing keys with applications or partners is risky: you cannot limit what the holder does, which container they touch or how long they keep access. Shared access signatures (SAS) exist so you can hand out limited, time-bound access instead, and Microsoft Entra ID authorization with data-plane roles is better still wherever the client can use it. A SAS is a URI (uniform resource identifier) with a set of query parameters and a signature. The parameters describe what is allowed: which services and resource types, which permissions (read, write, delete, list, add, create), start and expiry times, optionally allowed IP addresses and whether only HTTPS is permitted. The signature proves the token was created by someone holding a secret. Anyone holding the URI can use it until it expires, so treat it like a password: use short expiry times, grant the fewest permissions, and require HTTPS. In the portal you create one under Security + networking > Shared access signature (account level) or from a container's Shared access tokens menu, and from the CLI with commands such as `az storage blob generate-sas`.",
   "There are three kinds of SAS. An account SAS is signed with an account key and can grant access to one or more services (blob, file, queue, table) and to service-level operations such as listing containers or setting service properties. A service SAS is also signed with an account key but covers resources in just one service, such as a single container or blob. A user delegation SAS is signed with a user delegation key that you request using Microsoft Entra credentials, and it works only for Blob Storage (including Data Lake Storage). Its effective permissions are limited to what the Entra identity that requested it can do. Microsoft recommends user delegation SAS where possible because no account key is involved and access can be traced to an identity:",
   "```bash\naz storage container generate-sas --account-name stcontoso01 --name uploads \\\n  --permissions rw --expiry 2030-01-31T00:00Z --auth-mode login --as-user --https-only\n```",
   "A stored access policy is defined on a container, file share, queue or table and holds the start time, expiry and permissions. A service SAS can reference the policy by name instead of carrying those values itself. The benefit is revocation: to cancel every SAS tied to the policy, you change its expiry or delete the policy, and other clients are unaffected. Only service SAS can use stored access policies; an account SAS cannot. Without a stored access policy, the only way to revoke a key-signed SAS before it expires is to regenerate the account key that signed it, which also breaks everything else using that key. A user delegation SAS is revoked by revoking the user delegation keys or removing the identity's role.",
   "Two keys exist so you can rotate without downtime. The usual sequence is: update applications to use key2, regenerate key1 (`az storage account keys renew --account-name stcontoso01 --key key1`), then later move applications back to key1 and regenerate key2. You can set a key expiration policy so Azure flags keys older than a chosen number of days, and store keys or connection strings in Azure Key Vault rather than in application settings. For the strongest posture, disable 'Allow storage account key access' so only Entra ID authorization works; that also disables account and service SAS, leaving only user delegation SAS.",
   "Consider a worked example. A partner needs to upload files to one container for the next week. You create a stored access policy named `partner-upload` on the container with write and list permissions and a seven-day expiry, and issue a service SAS that references it. When the partnership ends early, you delete the policy and the partner's SAS stops working immediately, while your own applications using the account keys are unaffected. Had you issued an account SAS instead, revoking it would have meant regenerating the key and updating every application that used it.",
   "Common mistakes: sharing account keys instead of a SAS; issuing long-lived SAS tokens with broad permissions; expecting an account SAS to use a stored access policy; thinking user delegation SAS works for Azure Files, queues or tables (it is Blob Storage only); and regenerating the key your applications are currently using, which causes an outage.",
   "Exam wording: 'revoke one partner's access without affecting others' points to a stored access policy. 'Avoid account keys' or 'use Entra credentials' points to user delegation SAS. 'Leaked account SAS' points to regenerating the signing key. 'Rotate keys without downtime' points to switching between key1 and key2. 'Access to several services in one token' points to an account SAS."
  ],
  "terms": [
   [
    "Account key",
    "One of two secrets that give full access to a storage account's data and are used to sign account and service SAS."
   ],
   [
    "Account SAS",
    "A SAS signed with an account key that can span several services and service-level operations."
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
   ],
   [
    "Key rotation",
    "Regenerating access keys on a schedule, using the second key to keep applications running during the change."
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
   ],
   [
    "You disable 'Allow storage account key access'. Which SAS types still work?",
    "Only user delegation SAS, because account and service SAS are signed with the account keys."
   ]
  ]
 },
 {
  "t": "Identity-based access for Azure Files (AD DS, Entra Domain Services, Entra Kerberos) with share-level RBAC and NTFS permissions",
  "body": [
   "Azure Files offers managed file shares over SMB (Server Message Block), the same protocol Windows file servers use. You can mount a share with the storage account key, but that gives everyone who knows the key full access, like being administrator on the file server, and it cannot tell users apart. For a real file-server replacement you want users to sign in with their own identities and receive only the access they should have. That is identity-based authentication, and it relies on Kerberos tickets just like an on-premises Windows file share.",
   "Azure Files supports three identity sources for SMB, and a storage account can use only one of them at a time. On-premises Active Directory Domain Services (AD DS): you join the storage account to your domain as a computer or service logon account, typically with the AzFilesHybrid PowerShell module (`Join-AzStorageAccount`), and users must be synchronized to Microsoft Entra ID with Entra Connect so share-level roles can be assigned to them. Clients need network line of sight to a domain controller. Microsoft Entra Domain Services: a managed domain in Azure; you enable it on the storage account, and clients joined to that managed domain use Kerberos against it. Microsoft Entra Kerberos: Entra ID itself issues Kerberos tickets, so clients that are Microsoft Entra joined or hybrid joined can reach shares without line of sight to a domain controller, which suits remote workers; it was designed around hybrid identities synchronized from AD DS.",
   "Access is then checked at two levels, and both must allow the action. Share-level permissions are Azure role-based access control (RBAC) roles assigned to Entra users or groups on the share or storage account. Storage File Data SMB Share Reader gives read access, Storage File Data SMB Share Contributor gives read, write and delete, and Storage File Data SMB Share Elevated Contributor additionally lets the user change NTFS permissions. You can also set a default share-level permission that applies to all authenticated identities, which saves assigning roles if you want NTFS (New Technology File System) permissions to do all the fine-grained work. Directory and file level permissions are ordinary Windows NTFS access control lists (ACLs). To set them, an administrator mounts the share, commonly with the storage account key for full control or as a user with Elevated Contributor, and uses File Explorer or `icacls`. For example:",
   "```powershell\nnet use Z: \\\\stcontoso01.file.core.windows.net\\finance /user:localhost\\stcontoso01 <storage-account-key>\nicacls Z:\\Payroll /grant \"CONTOSO\\Finance-Staff:(OI)(CI)M\"\n```",
   "The effective access is the more restrictive of the two layers. A user with Share Contributor but only Read on a folder's NTFS ACL can only read that folder. A user with Full Control in NTFS but no share-level role, and no default share permission, cannot open the share at all. Remember too that SMB uses TCP port 445. Identity configuration does not help if the client's network blocks outbound 445, which many internet service providers and some corporate firewalls do; in that case use a VPN, ExpressRoute or Azure File Sync to a local server.",
   "Consider a worked example. A company retires its on-premises file server and moves the data to an Azure file share. You join the storage account to the existing AD DS domain, confirm users sync to Entra ID, and set the default share-level permission to Storage File Data SMB Share Contributor. The NTFS ACLs copied from the old server with the data keep controlling who opens each department folder. Users map `Z:` with their normal domain credentials. A laptop user working from home cannot connect, and you trace it to port 445 being blocked by the home ISP, so she connects through the company VPN.",
   "Common mistakes: expecting two identity sources on one account; granting a share role and forgetting NTFS, or the reverse; giving Share Contributor to someone who must edit ACLs (they need Elevated Contributor); and mounting with the account key for everyday users, which bypasses identity entirely.",
   "Exam wording: 'Entra-joined devices, no line of sight to domain controllers' points to Microsoft Entra Kerberos. 'Existing on-premises domain, keep current NTFS permissions' points to AD DS authentication. 'Managed domain in Azure, no on-premises AD' points to Entra Domain Services. 'Can read but cannot write although NTFS allows it' points to the share-level role. 'Change NTFS permissions' points to Elevated Contributor. 'Cannot connect from home' often points to port 445."
  ],
  "terms": [
   [
    "AD DS authentication",
    "Azure Files authentication where the storage account is joined to on-premises Active Directory and users present AD Kerberos tickets."
   ],
   [
    "Microsoft Entra Domain Services",
    "A managed Azure domain that can authenticate SMB access to Azure Files for clients joined to it."
   ],
   [
    "Microsoft Entra Kerberos",
    "An Azure Files option where Entra ID issues Kerberos tickets, so clients need no domain controller line of sight."
   ],
   [
    "Share-level permission",
    "An Azure RBAC role, such as Storage File Data SMB Share Contributor, that controls access to a whole file share."
   ],
   [
    "Default share-level permission",
    "A setting that grants a chosen share role to all authenticated identities without per-user assignments."
   ],
   [
    "NTFS permissions",
    "Windows access control lists on directories and files in the share that provide fine-grained access."
   ],
   [
    "Storage File Data SMB Share Elevated Contributor",
    "The share-level role that adds the ability to change NTFS permissions on files and folders."
   ]
  ],
  "example": "A company retires its on-premises file server and moves data to an Azure file share. The storage account is joined to the existing AD DS domain, the default share-level permission is set to Storage File Data SMB Share Contributor, and the NTFS ACLs copied from the old server continue to control who can open each department folder. Users map the drive with their normal domain credentials, and remote users connect through the VPN because home networks block port 445.",
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
   ],
   [
    "Can one storage account use AD DS and Entra Domain Services authentication at the same time?",
    "No. A storage account supports only one identity source for SMB at a time."
   ]
  ]
 },
 {
  "t": "Encryption: Microsoft-managed vs customer-managed keys in Key Vault, infrastructure encryption, encryption scopes",
  "body": [
   "All data written to Azure Storage is encrypted at rest automatically with 256-bit AES (Advanced Encryption Standard) encryption, a feature called Azure Storage encryption or Storage Service Encryption (SSE). You cannot turn it off, and it costs nothing extra. Encryption and decryption are transparent: applications read and write data normally, with no code changes. What you choose is who manages the keys and whether to add extra layers. That distinction, rather than whether data is encrypted, is what exam questions test.",
   "By default, Microsoft-managed keys are used. Microsoft generates, stores and rotates the keys, and you have nothing to configure. This meets most requirements. Some organizations have compliance rules that demand control over the encryption key: the ability to rotate it on their own schedule, audit its use, or make data unreadable by revoking the key. For them there are customer-managed keys (CMK), configured under the storage account's Security + networking > Encryption blade.",
   "With customer-managed keys, you create an RSA key in Azure Key Vault or Azure Key Vault Managed HSM (hardware security module), and the storage account uses it to wrap (encrypt) the account's data encryption keys, a pattern called envelope encryption. The storage account needs a managed identity, system-assigned or user-assigned, with permission on the key, for example the Key Vault Crypto Service Encryption User role in the RBAC permission model, or get, wrap key and unwrap key permissions in an access policy. The key vault must have soft delete and purge protection enabled so the key cannot be permanently lost by accident. If you reference the key without a version, Azure Storage automatically picks up new key versions when you rotate it. If you disable or delete the key or remove the identity's access, the data becomes inaccessible until access is restored, which is both the point and the risk.",
   "```bash\naz storage account update --name stcontoso01 --resource-group rg-data \\\n  --encryption-key-source Microsoft.Keyvault \\\n  --encryption-key-vault <key-vault-uri> \\\n  --encryption-key-name storage-cmk\n```",
   "Infrastructure encryption adds a second layer of encryption at the infrastructure level, with a different algorithm mode and different, always Microsoft-managed keys, so data is encrypted twice. It exists for strict compliance scenarios that require double encryption. It must be enabled when you create the storage account and cannot be enabled or disabled afterwards. Encryption scopes let you use different keys within one account for Blob Storage. You create a scope on the account, backed by either a Microsoft-managed key or a customer-managed key, then set it as the default for a container or specify it when writing individual blobs. You can require that all blobs in a container use the container's default scope, which suits multi-tenant applications where each customer's data needs its own key in a shared account.",
   "Consider a worked example. A healthcare company must be able to cut off access to patient documents immediately if a contract ends, and its auditors require double encryption. Because infrastructure encryption can only be chosen at creation, you create a new storage account with it enabled and migrate the data. You create a key in a Key Vault with soft delete and purge protection, give the account's system-assigned managed identity the Key Vault Crypto Service Encryption User role and switch the account to customer-managed keys, referencing the key without a version. Rotation now only requires adding a new key version, and disabling the key would make the data unreadable.",
   "Common mistakes: believing encryption at rest is optional or must be enabled; expecting to add infrastructure encryption to an existing account; configuring CMK without a managed identity or without purge protection on the vault; deleting a key that still protects data; and confusing storage encryption with virtual machine disk features such as encryption at host or Azure Disk Encryption, which are covered with virtual machines. Encryption in transit is a separate setting too: 'Secure transfer required' and a minimum TLS (Transport Layer Security) version force clients to use HTTPS or encrypted SMB.",
   "Exam wording: 'control the key', 'rotate on our schedule' or 'revoke access to the data' points to customer-managed keys in Key Vault. 'Double encryption' points to infrastructure encryption, set at creation. 'Different keys for different customers in one account' points to encryption scopes. 'What does the storage account need to use CMK' points to a managed identity with key permissions and a vault with soft delete and purge protection. 'Disable encryption to improve performance' is not possible."
  ],
  "terms": [
   [
    "Azure Storage encryption",
    "Automatic, always-on AES-256 encryption of data at rest in Azure Storage."
   ],
   [
    "Microsoft-managed key",
    "The default option in which Microsoft creates, stores and rotates the storage encryption keys."
   ],
   [
    "Customer-managed key (CMK)",
    "A key you control in Key Vault or Managed HSM that protects a storage account's data encryption keys."
   ],
   [
    "Purge protection",
    "A Key Vault setting that prevents deleted keys from being permanently removed during the retention period; required for CMK."
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
    "No. It must be enabled when the account is created, so you would create a new account and move the data."
   ],
   [
    "What does the storage account need in order to use a customer-managed key in Key Vault?",
    "A managed identity with permission to get, wrap and unwrap the key, and a key vault with soft delete and purge protection enabled."
   ],
   [
    "Two customers' blobs share one storage account, and each must be encrypted with a different key. What feature helps?",
    "Encryption scopes, each backed by a different key and set as the default on each customer's container."
   ],
   [
    "What happens to data if the customer-managed key is disabled?",
    "The data becomes inaccessible until the key is re-enabled or access restored, because the account can no longer unwrap its data encryption keys."
   ]
  ]
 },
 {
  "t": "Object replication, and data movement with AzCopy and Azure Storage Explorer",
  "body": [
   "Moving data into, out of and between storage accounts is a routine administrator job: seeding a new account, keeping a copy near users in another region, or pushing nightly output from a server. Azure offers an automatic, policy-based option (object replication) and tools you run yourself: AzCopy on the command line and Azure Storage Explorer as a desktop application. Knowing which fits a scenario is what the exam tests.",
   "Object replication asynchronously copies block blobs from a container in a source storage account to a container in a destination account, which can be in another region or even another subscription. Typical uses are keeping a copy close to users in another region, feeding a separate analytics account, or reducing read latency. You configure a replication policy with one or more rules, each pairing a source container with a destination container, optionally filtered by blob name prefix and by creation time so that only new blobs, or everything, is copied. In the portal it lives under the storage account's Data management > Object replication blade. Object replication has prerequisites that are tested often: blob versioning must be enabled on both the source and destination accounts, and change feed must be enabled on the source account. It works with block blobs only, and the destination container becomes read-only for replicated data while the policy exists. It does not replace geo-redundancy. Object replication is per container, asynchronous and lets you choose the destination account and region and which blobs to copy. Geo-redundant storage (GRS) replicates the entire account to the fixed paired region, and you cannot choose the target or filter what is replicated.",
   "AzCopy is a free command-line tool for copying data to and from Blob Storage and Azure Files. You authenticate with `azcopy login` (Microsoft Entra ID, which needs a data-plane role such as Storage Blob Data Contributor) or by appending a shared access signature (SAS) token to the URL. Common commands:",
   "```bash\n# <container-url> = the container's full URL on the account's blob endpoint\nazcopy login\nazcopy copy \"C:\\data\\*\" \"<container-url>\" --recursive\nazcopy sync \"C:\\data\" \"<container-url>\" --recursive --delete-destination=true\nazcopy copy \"<source-container-url>?<SAS>\" \"<destination-container-url>?<SAS>\" --recursive\n```",
   "`azcopy copy` copies everything you point it at; `azcopy sync` compares source and destination by last-modified time and copies only new or changed files, optionally deleting extra files at the destination with `--delete-destination`. Account-to-account copies run server to server, so data does not pass through your machine. AzCopy is the tool of choice for scripted, large or repeatable transfers, and it writes a job log you can resume from with `azcopy jobs resume`. Azure Storage Explorer is a free graphical application for Windows, macOS and Linux. You connect with your Entra account, an account key, a connection string or a SAS URL, then browse containers, file shares, queues and tables, upload and download, change access tiers, create SAS tokens and set stored access policies. It uses AzCopy behind the scenes for transfers and suits one-off tasks and people who prefer a GUI (graphical user interface). For very large offline transfers over slow networks, Azure Data Box devices are the alternative.",
   "Consider a worked example. A media company produces videos in West Europe but many viewers are in East US. You enable versioning on both accounts and change feed on the source, then create an object replication policy from the source `published` container to a container in the East US account. New videos appear there shortly after upload without any scripts. An editor uses Storage Explorer to upload a few thumbnails by hand, and a nightly scheduled task on the render server runs `azcopy sync` to push only changed output files.",
   "Common mistakes: forgetting versioning on the destination or change feed on the source; expecting object replication to handle page or append blobs; using `azcopy copy` for nightly jobs and re-uploading everything; and running `azcopy login` as a Contributor who has no data-plane role, which fails with a permission error.",
   "Exam wording: 'automatically copy new blobs to another account or region' points to object replication. 'Prerequisites for object replication' points to versioning on both accounts and change feed on the source. 'Only copy new or changed files' points to `azcopy sync`. 'Script a large transfer' points to AzCopy. 'Graphical tool to browse and manage storage' points to Storage Explorer. 'Too much data for the network' points to Data Box."
  ],
  "terms": [
   [
    "Object replication",
    "Asynchronous, policy-based copying of block blobs from a source container to a destination container in another account."
   ],
   [
    "Blob versioning",
    "A feature that keeps previous versions of blobs automatically; required on both accounts for object replication."
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
    "azcopy sync",
    "An AzCopy command that copies only new or changed files and can optionally delete extra files at the destination."
   ],
   [
    "Azure Storage Explorer",
    "A free desktop GUI for browsing and managing storage accounts that uses AzCopy for transfers."
   ]
  ],
  "example": "A media company produces videos in West Europe but has many viewers in East US. The administrator enables versioning on two accounts and change feed on the source, then creates an object replication policy from the source published container to a container in East US. Separately, an editor uses Storage Explorer to upload a few files, while a nightly scheduled task runs azcopy sync to push the render server's changed output files.",
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
   ],
   [
    "How does object replication differ from GRS?",
    "Object replication copies chosen containers to an account and region you pick; GRS replicates the whole account to the fixed paired region."
   ]
  ]
 },
 {
  "t": "Blob containers and access tiers: Hot, Cool, Cold and Archive; rehydration from Archive",
  "body": [
   "Blob Storage stores unstructured data such as documents, images, backups and logs. Blobs live in containers, which are like top-level folders in a storage account, and a blob's full address is `<account>.blob.core.windows.net/<container>/<blob>` on the account's blob endpoint. There are three blob types: block blobs for most files, append blobs for data that is only ever added to, such as logs, and page blobs for random read and write access, used by virtual machine disks. Access tiers apply to block blobs, and choosing the right tier is one of the easiest ways an administrator can cut storage cost.",
   "Each container has an anonymous access level: Private (no anonymous access, the default), Blob (anonymous read of individual blobs if you know the URL) or Container (anonymous read and list of the whole container). Anonymous access only works if the storage account setting 'Allow blob anonymous access' is enabled; keep it disabled unless you are deliberately publishing public content, because a single misconfigured container can expose sensitive data to anyone on the internet. You create a container in the portal under Data storage > Containers, or with `az storage container create --account-name stcontoso01 --name reports --auth-mode login`.",
   "Access tiers trade storage cost against access cost. Hot is for frequently accessed data, with the highest storage price and lowest access price. Cool is for infrequently accessed data kept at least 30 days, such as short-term backups. Cold is for rarely accessed data kept at least 90 days that still needs to be read quickly. Archive is for data rarely if ever read and kept at least 180 days, such as compliance records, with the lowest storage price and the highest cost and delay to read. If you delete or move a blob out of Cool, Cold or Archive before its minimum period, an early deletion charge applies for the remaining days. Hot, Cool and Cold are online tiers: data can be read immediately. Archive is offline: you cannot read or modify the blob's content, only its metadata.",
   "The storage account has a default access tier (Hot or Cool, and Cold where supported) used for blobs without an explicit tier, while an individual blob can be set to any tier. Archive can only be set on individual blobs, not as the account default, and it is not supported on accounts using zone-redundant storage (ZRS), geo-zone-redundant storage (GZRS) or RA-GZRS. You change a blob's tier in the portal with Change tier, or with `az storage blob set-tier --account-name stcontoso01 --container-name reports --name 2019.pdf --tier Archive --auth-mode login`. At scale you would use lifecycle management rules rather than changing tiers by hand.",
   "To read an archived blob, you rehydrate it to an online tier. There are two ways. Change the blob's tier with Set Blob Tier, which changes the original blob in place. Or copy it to a new blob in an online tier with Copy Blob, which leaves the archived original in place, useful if you only need the data briefly. Each rehydration has a priority. Standard priority can take up to 15 hours. High priority is faster, often under an hour for smaller blobs, and costs more. While it runs the blob shows a rehydrate-pending status, and you can subscribe to an Azure Event Grid event that fires on completion instead of polling.",
   "Consider a worked example. A law firm must keep scanned case files for seven years but almost never opens them. After a case closes, the files are set to Archive, cutting their storage cost sharply. Two years later an old case is reopened and a lawyer needs three files the same afternoon. The clerk copies them to a new blob in the Hot tier with High priority, so they are readable within the hour, and the archived originals stay untouched for compliance. The following week, a request for an entire archived folder with no deadline is rehydrated with Standard priority overnight to save money.",
   "Common mistakes: expecting to download an archived blob directly; trying to set Archive as the account default; choosing Archive on a ZRS or GZRS account; forgetting early deletion charges when moving data out of Cool, Cold or Archive too soon; choosing Hot for data that is read once a year; and enabling anonymous access at the account level when a shared access signature would do. Also remember that tiers apply to block blobs, not page blobs used by VM disks.",
   "Exam wording: 'frequently accessed' points to Hot. 'Infrequently accessed, stored at least 30 days' points to Cool. 'Rarely accessed but must be available immediately' points to Cold. 'Rarely accessed, can tolerate hours of latency, lowest storage cost' points to Archive. 'Read an archived blob within an hour' points to High priority rehydration. 'Keep the archived copy while reading the data' points to Copy Blob rather than Set Blob Tier. 'Deleted after 10 days in Cool' points to an early deletion charge."
  ],
  "terms": [
   [
    "Container",
    "A grouping of blobs inside a storage account, with its own anonymous access level."
   ],
   [
    "Access tier",
    "The Hot, Cool, Cold or Archive setting of a block blob that determines storage and access costs."
   ],
   [
    "Online tier",
    "Hot, Cool or Cold, in which blob data can be read immediately."
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
  "example": "A law firm must keep scanned case files for seven years but almost never opens them. The files are set to Archive after the case closes. When an old case is reopened, a clerk copies the needed files to the Hot tier with High priority so they can be read the same day, leaving the archived originals untouched for compliance.",
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
   ],
   [
    "Data is read only a few times a year but must be available instantly when needed. Which tier fits best?",
    "Cold, an online tier for rarely accessed data that can still be read immediately; Archive would need hours of rehydration."
   ]
  ]
 },
 {
  "t": "Lifecycle management policies that tier or delete blobs by age",
  "body": [
   "Setting access tiers by hand does not scale when a storage account holds millions of blobs. Lifecycle management lets you define rules that Azure runs automatically, moving blobs to cooler tiers as they age and deleting them when they are no longer needed. It is the standard way to keep storage costs in line with how data is actually used: logs that are hot for a week, reports that are read for a month, backups kept for a year and then removed. One policy per account can hold many rules, so different containers or kinds of data can follow different schedules.",
   "A lifecycle management policy is a JSON document of rules, attached to a storage account (general-purpose v2, premium block blob or legacy Blob Storage accounts) under Data management > Lifecycle management. Each rule has filters that select blobs and actions that say what to do. Filters include `blobTypes` (such as `blockBlob` or `appendBlob`), `prefixMatch` (a container name followed by an optional path, such as `logs/app1`) and `blobIndexMatch` (blob index tags, key and value pairs you set on blobs). Actions apply to the current version of blobs (`baseBlob`), and separately to previous versions (`version`) and snapshots (`snapshot`).",
   "Actions include `tierToCool`, `tierToCold`, `tierToArchive` and `delete`, each with a condition. Conditions are based on age: days since the blob was last modified (`daysAfterModificationGreaterThan`), days since creation (`daysAfterCreationGreaterThan`), or days since last access (`daysAfterLastAccessTimeGreaterThan`), which requires last access time tracking to be enabled on the account. With last access time you can also use `enableAutoTierToHotFromCool` to move a blob back to Hot when it is read again. Here is a rule for a logs container:",
   "```json\n{\n  \"rules\": [{\n    \"name\": \"age-logs\",\n    \"enabled\": true,\n    \"type\": \"Lifecycle\",\n    \"definition\": {\n      \"filters\": { \"blobTypes\": [\"blockBlob\"], \"prefixMatch\": [\"logs/\"] },\n      \"actions\": { \"baseBlob\": {\n        \"tierToCool\":    { \"daysAfterModificationGreaterThan\": 30 },\n        \"tierToArchive\": { \"daysAfterModificationGreaterThan\": 90 },\n        \"delete\":        { \"daysAfterModificationGreaterThan\": 365 }\n      } }\n    }\n  }]\n}\n```",
   "The policy above moves blobs in the logs container to Cool after 30 days without modification, to Archive after 90 and deletes them after a year. The portal's list view builds the same JSON through a wizard, and the code view shows it; from the command line you apply a saved file with `az storage account management-policy create --account-name stcontoso01 --resource-group rg-data --policy @policy.json`. Azure runs the policy about once a day, and after you create or change a policy it can take up to 24 hours before actions start, so do not expect blobs to move immediately in a lab. Design points: order actions so tiers only get cooler over time, respect minimum retention periods (moving from Cool to Archive before 30 days incurs early deletion charges), and add `version` or `snapshot` actions to clean up old versions if versioning is on, otherwise old versions keep costing money.",
   "Consider a worked example. An Internet of Things (IoT) platform writes diagnostic files to a `telemetry` container. Engineers read them for a few weeks, auditors occasionally ask for older data, and nothing older than two years is needed. You create one rule with `prefixMatch` `telemetry/` that tiers blobs to Cool at 30 days, to Archive at 180 days and deletes them at 730 days. Because versioning is enabled for protection, you add a `version` action that deletes previous versions after 90 days. The next month's bill shows storage cost falling, and nobody had to write or schedule a script.",
   "Common mistakes: using a last-access condition without enabling access time tracking; expecting rules to act within minutes; filtering with a path that omits the container name; forgetting that previous versions and snapshots are not touched by `baseBlob` actions; and tiering to Archive on an account using ZRS or GZRS, where Archive is not supported. Another trap is deleting data with a lifecycle rule that a legal hold or retention requirement says must be kept; check requirements before adding `delete`.",
   "Exam wording: 'automatically move blobs to a cooler tier after N days' points to a lifecycle management rule. 'If nobody has read it for N days' points to `daysAfterLastAccessTimeGreaterThan` with last access time tracking enabled. 'Only in one container' or 'only in a folder' points to `prefixMatch`. 'Based on blob index tags' points to `blobIndexMatch`. 'Old versions keep growing costs' points to a `version` delete action. 'Rule created but nothing happened yet' points to the 24-hour delay."
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
    "blobIndexMatch",
    "A rule filter that selects blobs by their blob index tags."
   ],
   [
    "daysAfterModificationGreaterThan",
    "A condition that triggers an action when a blob has not been modified for more than the given number of days."
   ],
   [
    "Last access time tracking",
    "An account setting that records blob reads so rules can act on days since last access."
   ],
   [
    "baseBlob, version and snapshot actions",
    "Separate action sections for current blobs, previous versions and snapshots in a lifecycle rule."
   ]
  ],
  "example": "An IoT platform writes diagnostic files to a telemetry container. Engineers read them for a few weeks, auditors occasionally ask for older data, and nothing older than two years is needed. A lifecycle rule tiers telemetry blobs to Cool at 30 days, to Archive at 180 days and deletes them at 730 days, and a version action removes old versions after 90 days, cutting storage cost without any scripts.",
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
   ],
   [
    "Versioning is enabled and storage costs keep rising although a baseBlob delete rule exists. Why?",
    "The baseBlob action does not remove previous versions; add a version action that deletes old versions after a set age."
   ]
  ]
 },
 {
  "t": "Data protection: blob and container soft delete, versioning, snapshots, change feed",
  "body": [
   "Resource locks stop someone deleting a storage account, but they do nothing to protect the data inside it from an accidental delete, an overwrite by a buggy application, or ransomware encrypting files. Blob Storage has its own data protection features, found under the account's Data management > Data protection blade. You usually combine several of them, because each protects against a different kind of mistake, and the exam expects you to match the feature to the threat.",
   "Blob soft delete keeps deleted blobs, and blob snapshots, for a retention period you choose, between 1 and 365 days. During that time a deleted blob is hidden but can be restored with Undelete, in the portal by turning on Show deleted blobs, or through the API. After the period ends it is permanently removed. Container soft delete works the same way for whole containers: if someone deletes a container, you can restore it with all its blobs within the retention period. Neither protects against deleting the storage account itself; use a CanNotDelete lock for that. You can enable both from the CLI with `az storage account blob-service-properties update --account-name stcontoso01 --resource-group rg-data --enable-delete-retention true --delete-retention-days 14 --enable-container-delete-retention true --container-delete-retention-days 14`.",
   "Blob versioning automatically keeps the previous state of a blob every time it is overwritten or deleted. Each version has a version ID, the current version is the live blob, and you can promote any previous version back to current. Versioning is the strongest protection against accidental overwrites, and it is a prerequisite for object replication and point-in-time restore. Versions cost storage, so pair versioning with a lifecycle rule that deletes old versions after a while. A snapshot is a read-only copy of a blob at the moment you take it, created manually or by an application. Snapshots share unchanged data with the base blob, so you pay mainly for differences. The difference from versioning is control: snapshots only exist when someone creates them, whereas versioning captures every change automatically. Microsoft recommends versioning for new designs.",
   "The change feed is an ordered, durable log of every create, modify and delete event on blobs in the account, stored as blobs in a special container named `$blobchangefeed`. It is used for auditing, for rebuilding state in other systems, and as a prerequisite for object replication (on the source account) and point-in-time restore. Point-in-time restore uses versioning, change feed and soft delete together to roll block blobs in chosen containers back to their state at a past date and time, such as just before a ransomware attack. Its retention must be shorter than the soft delete retention.",
   "For data that must not be changed at all, immutable storage adds WORM (write once, read many) policies: time-based retention, which blocks changes and deletes until a period has passed, or legal holds, which block them until the hold is cleared. These can be set on containers or on individual versions, and a locked time-based policy cannot be shortened, which is what regulators often require. In a lab, enable blob soft delete and versioning, upload a file, overwrite it and then delete it, and practise restoring both the previous version and the deleted blob.",
   "Consider a worked example. A developer's script accidentally overwrites 5,000 product images with blank files and then deletes a container of old catalogs. Because versioning, blob soft delete and container soft delete were enabled with 14-day retention, you restore the deleted container first, then promote the previous version of each image. Point-in-time restore would also work here, rolling the images container back to the moment before the script ran in one operation. No backup restore is needed, and the shop is back to normal within the hour.",
   "Common mistakes: relying on a resource lock to protect blobs; expecting soft delete to recover overwritten content (that is versioning's job, although soft delete does keep snapshots of overwritten blobs); forgetting to enable change feed and versioning before trying point-in-time restore; leaving versioning on without a lifecycle rule and watching costs climb; and assuming any of these features protect against deleting the storage account itself.",
   "Exam wording: 'recover a deleted blob' points to blob soft delete. 'Recover a deleted container' points to container soft delete. 'Recover content after an overwrite without anyone taking a copy first' points to versioning. 'Manually capture a copy before a change' points to a snapshot. 'Audit log of blob changes' points to change feed. 'Roll a container back to a time before an incident' points to point-in-time restore. 'Data must not be modified or deleted for seven years' points to immutable storage."
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
   ],
   [
    "Point-in-time restore",
    "A feature that rolls block blobs in chosen containers back to a past time using versioning, change feed and soft delete."
   ],
   [
    "Immutable storage",
    "WORM policies, time-based retention or legal hold, that prevent blobs from being changed or deleted."
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
   ],
   [
    "Regulations require that financial records cannot be changed or deleted for a fixed period. Which feature applies?",
    "Immutable storage with a time-based retention policy, which enforces WORM behavior."
   ]
  ]
 },
 {
  "t": "Azure Files: create and configure file shares, snapshots, soft delete, and SMB port 445 considerations",
  "body": [
   "Azure Files provides fully managed file shares in the cloud that clients mount like a network drive, using SMB (Server Message Block) or, for premium shares, NFS (Network File System). Windows, Linux and macOS clients can all connect, and the shares can replace or extend on-premises file servers without you managing any server hardware or operating system. Azure File Sync can cache a share on local Windows Servers for fast access in branch offices, with the cloud share as the central copy.",
   "You create a file share inside a storage account. A standard general-purpose v2 account hosts standard shares on hard-disk storage, with tiers such as transaction optimized, hot and cool that trade storage cost against transaction cost. A premium FileStorage account hosts premium shares on solid-state storage for low latency and high IOPS (input/output operations per second), and it is the only option for NFS shares. Each share has a quota or provisioned size, which in premium shares also determines performance. In the portal go to the storage account > Data storage > File shares > + File share; with the CLI run `az storage share-rm create --resource-group rg-files --storage-account stfiles01 --name finance --quota 1024`.",
   "To mount a share on Windows, the portal's Connect button generates a script that essentially runs `net use Z: \\\\<account>.file.core.windows.net\\<share>` with credentials, either the storage account key or, better, identity-based authentication. On Linux you mount with the `cifs` file system type, for example `sudo mount -t cifs //<account>.file.core.windows.net/finance /mnt/finance -o vers=3.1.1,credentials=/etc/smbcredentials/<account>.cred,serverino`. The share's UNC (Universal Naming Convention) path always uses the account's file endpoint.",
   "SMB uses TCP port 445. Clients outside Azure connect across the internet, and many internet service providers and corporate networks block outbound port 445 because of old SMB worms. If a mount fails from an office, test with PowerShell: `Test-NetConnection -ComputerName <account>.file.core.windows.net -Port 445`. If `TcpTestSucceeded` is False, options are to open the port on the firewall, connect over a site-to-site VPN, point-to-site VPN or ExpressRoute (usually with a private endpoint), or use Azure File Sync so users talk to a local server over the office network. Connections from outside the Azure region require SMB 3.x with encryption, so old SMB 2.1 clients cannot connect across the internet.",
   "Share snapshots capture a read-only, point-in-time copy of an entire file share. They are incremental, so only changes since the previous snapshot use space. Users on Windows can open Previous Versions on a folder in the mounted share to restore files themselves, and administrators can browse snapshots in the portal. Azure Backup for Azure Files uses share snapshots under the hood and adds scheduling, retention and a restore interface. Soft delete for file shares keeps a deleted share, including its snapshots, for a retention period you set, so you can undelete it from the File shares list with Show deleted shares. It is enabled by default on new storage accounts. Soft delete works at the share level; to recover an individual file you use snapshots or backup.",
   "Consider a worked example. Staff in a branch office cannot map a new Azure file share, although it mounts fine from an Azure VM in the same region. You run `Test-NetConnection` to the share's endpoint on port 445 from the office and see it fail because the ISP blocks the port. Rather than asking the ISP, you create a private endpoint for the `file` sub-resource in the hub virtual network, configure DNS so the account name resolves to the private IP, and route access over the existing site-to-site VPN. The share mounts, and you configure Azure Backup to take daily snapshots so users can restore their own files from Previous Versions.",
   "Common mistakes: trying to create an NFS share in a standard account; blaming permissions when the real problem is a blocked port 445; expecting share soft delete to restore a single deleted file; assuming snapshots are full copies that double the cost; mounting with the storage account key for everyday users when identity-based access is available; and connecting from an old SMB client that does not support encryption.",
   "Exam wording: 'mounts from an Azure VM but not from on-premises' points to port 445 being blocked. 'Which command tests connectivity' points to `Test-NetConnection` on port 445. 'User restores a previous version of a file' points to share snapshots. 'Recover a deleted share' points to share soft delete. 'NFS' or 'low latency, high IOPS' points to a premium FileStorage account. 'Cache files locally in branch offices' points to Azure File Sync."
  ],
  "terms": [
   [
    "Azure file share",
    "A managed SMB or NFS share hosted in a storage account that clients mount like a network drive."
   ],
   [
    "FileStorage account",
    "The premium storage account kind for file shares on SSD, required for NFS shares."
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
   ],
   [
    "Azure File Sync",
    "A service that caches an Azure file share on local Windows Servers for fast access."
   ]
  ],
  "example": "Staff in a branch office cannot map a new Azure file share, although it works from an Azure VM. The administrator runs Test-NetConnection to the share's endpoint on port 445 from the office and sees it fail because the ISP blocks the port. The fix is to route access over the existing site-to-site VPN to a private endpoint for the storage account, with DNS resolving the account name to the private IP.",
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
   ],
   [
    "An administrator deletes an entire file share by mistake. How do you recover it?",
    "If share soft delete is enabled, show deleted shares in the File shares list and undelete it within the retention period."
   ]
  ]
 },
 {
  "t": "ARM templates and Bicep files: interpret and modify, deploy, export a deployment as a template, convert ARM JSON to Bicep",
  "body": [
   "Infrastructure as code (IaC) means describing Azure resources in files and letting Azure Resource Manager (ARM) create them, instead of clicking through the portal. The files are repeatable, reviewable and version-controlled, so the same environment can be built for development, test and production without drift. Azure's native formats are ARM templates, written in JSON (JavaScript Object Notation), and Bicep, a simpler language that compiles to ARM JSON. The exam expects you to read both, change a value and deploy.",
   "An ARM template has a fixed structure: `$schema` and `contentVersion`, then `parameters` (values supplied at deployment time, such as a VM name), `variables` (values computed inside the template), `resources` (what to deploy, each with a `type`, `apiVersion`, `name`, `location` and `properties`), and `outputs` (values returned after deployment). Expressions in square brackets call template functions, for example `[resourceGroup().location]`, `[parameters('storageName')]` or `[concat(variables('prefix'), 'web')]`. `dependsOn` states ordering between resources, such as deploying a virtual network before the network interface that uses it. Parameters can have `allowedValues`, a `defaultValue` and types such as `string`, `int` and `securestring` for passwords. Bicep expresses the same things with less syntax. Here is a storage account with a parameter and an output:",
   "```bicep\nparam storageName string\nparam location string = resourceGroup().location\n\nresource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: storageName\n  location: location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}\n\noutput blobEndpoint string = sa.properties.primaryEndpoints.blob\n```",
   "Read it top down: `param` declares inputs (with an optional default), `resource` declares a resource with a symbolic name (`sa`), a type and API version, and `output` returns a value. Bicep works out dependencies automatically when one resource references another's symbolic name, so you rarely write `dependsOn`. To change the redundancy you would edit `Standard_LRS` to `Standard_GRS`; to let the deployer choose, add `@allowed(['Standard_LRS','Standard_GRS']) param skuName string` and use `skuName` in the resource. Reusable pieces go in modules (`module net './network.bicep' = { ... }`). Parameter values can come from a parameters file (`.json` or `.bicepparam`) so one template deploys dev and production with different values. You can also get a template from existing resources: in the portal, a resource group or a resource has Export template under Automation, and a past deployment in the resource group's Deployments list shows its original template. Exported templates are a starting point; they often hard-code names and IDs, include read-only properties and may not cover every resource type, so parameterize and clean them before reuse.",
   "Converting between formats is done with the Bicep CLI, included with the Azure CLI. `az bicep decompile --file main.json` converts an ARM JSON template to a Bicep file as a best effort, which you then review, fixing any warnings. `az bicep build --file main.bicep` compiles Bicep to ARM JSON. You rarely need to build manually, because `az deployment group create --resource-group rg-app --template-file main.bicep` and `New-AzResourceGroupDeployment -ResourceGroupName rg-app -TemplateFile main.bicep` accept `.bicep` files directly. The portal's Deploy a custom template page accepts ARM JSON, offers quickstart templates, and lets you edit the template and fill in parameters before deploying.",
   "Consider a worked example. You built a working web app environment by hand in the portal and now need an identical copy for a test team. You open the resource group, choose Export template, download the JSON and run `az bicep decompile` on it. The Bicep file has the web app name and App Service plan SKU hard-coded, so you replace them with `param appName string` and `param planSku string = 'B1'`, delete read-only properties the decompiler flagged, and create a `test.bicepparam` file. You deploy to a new resource group, check the output URL, and commit the Bicep file to source control so future changes are reviewed.",
   "Common mistakes: confusing parameters (supplied at deploy time) with variables (computed inside the template); expecting an exported template to deploy cleanly without editing; running `decompile` when you meant `build`; forgetting to update `apiVersion` or the SKU name exactly as the resource provider expects; and hard-coding secrets instead of using `securestring` parameters or Key Vault references.",
   "Exam wording follows these distinctions: 'value chosen at deployment' points to a parameter; 'value returned after deployment' points to an output; 'reuse resources created manually' points to Export template; 'convert JSON to Bicep' points to `az bicep decompile`; and 'which line do you change to use geo-redundant storage' points to the `sku` name."
  ],
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Describing infrastructure in version-controlled files that a deployment engine turns into real resources."
   ],
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
    "Output",
    "A value a template returns after deployment, such as an endpoint URL."
   ],
   [
    "Export template",
    "A portal feature that generates a template from existing resources or shows a past deployment's template."
   ],
   [
    "Decompile",
    "Converting an ARM JSON template to Bicep with az bicep decompile."
   ]
  ],
  "example": "An administrator built a working web app environment by hand in the portal and wants to recreate it for a test team. They use Export template on the resource group, decompile the JSON to Bicep, replace hard-coded names with parameters, and deploy it to a new resource group with a test parameters file, then commit the Bicep file to source control.",
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
   ],
   [
    "Do you need to compile a Bicep file to JSON before deploying it with the Azure CLI?",
    "No. az deployment group create and New-AzResourceGroupDeployment accept .bicep files and compile them automatically."
   ]
  ]
 },
 {
  "t": "Deployment modes (incremental vs complete) and deploying with `az deployment group create` or `New-AzResourceGroupDeployment`",
  "body": [
   "When you deploy a template to a resource group, Azure Resource Manager (ARM) compares what the template declares with what already exists. The deployment mode decides what happens to resources that are in the resource group but not in the template. This single setting can decide whether a deployment is safe or destroys production, so the exam tests it, usually with a scenario listing which resources exist and which the template declares.",
   "Incremental mode is the default. Resources in the template are created if missing or updated to match the template if they exist. Resources that exist in the resource group but are not in the template are left alone. Note that for resources in the template, the properties you specify are applied as written, so a property you omit may be reset to its default rather than kept; incremental does not mean 'merge every property'. Because templates are idempotent, redeploying the same template brings resources back to the declared state without creating duplicates.",
   "Complete mode makes the resource group match the template exactly. Resources in the template are created or updated as in incremental mode, and any resource in the resource group that is not in the template is deleted. Complete mode only applies to resource group deployments. It is useful when a resource group is owned entirely by one template, but dangerous if other people also deploy resources there. A CanNotDelete lock on a resource prevents complete mode from deleting it, and the deployment reports an error for that resource. For new designs Microsoft recommends deployment stacks, which track the resources they manage, as a safer way to clean up removed resources. Before deploying, preview the changes with what-if. It lists resources that will be created, modified, deleted, left unchanged or ignored, without changing anything:",
   "```bash\n# Azure CLI: preview, then deploy in complete mode\naz deployment group what-if --resource-group rg-web --template-file main.bicep --parameters @prod.parameters.json --mode Complete\naz deployment group create  --resource-group rg-web --template-file main.bicep --parameters @prod.parameters.json --mode Complete\n\n# Azure PowerShell equivalent (incremental is the default if -Mode is omitted)\nNew-AzResourceGroupDeployment -ResourceGroupName rg-web -TemplateFile main.bicep -TemplateParameterFile prod.parameters.json -Mode Complete -WhatIf\nNew-AzResourceGroupDeployment -ResourceGroupName rg-web -TemplateFile main.bicep -TemplateParameterFile prod.parameters.json\n```",
   "Parameters can be passed inline (`--parameters storageName=stcontoso01` in the CLI, or as named arguments like `-storageName stcontoso01` in PowerShell) or from a parameters file; inline values override file values when both are given. The resource group must exist first (`az group create` or `New-AzResourceGroup`). Other scopes use different commands: `az deployment sub create` or `New-AzSubscriptionDeployment` deploy at subscription level (for example to create resource groups or assign policies), with management group and tenant variants too. Each deployment is recorded under the resource group's Deployments blade with its template, parameters, operations and any error. If a deployment fails, open that entry to see which resource failed and why, fix the template and redeploy; resources that succeeded stay in place.",
   "Consider a worked example. A resource group contains a VM, a storage account and a key vault that the security team created by hand. A developer's template declares only the VM and storage account, and the pipeline is set to complete mode. You run `az deployment group what-if --mode Complete` first, and the output lists the key vault with a Delete change type. You stop the pipeline, discuss it with the security team, and either add the key vault to the template or switch the pipeline to incremental mode. Only then do you run `az deployment group create`.",
   "Common mistakes: assuming incremental mode deletes resources removed from the template (it never does); running complete mode against a shared resource group; forgetting that complete mode applies only at resource group scope; assuming an omitted property keeps its current value; and deploying to a resource group that does not exist yet. Another is treating what-if as optional for complete mode; it is the cheapest insurance you have, and many teams make it a required pipeline step that a reviewer approves before the real deployment runs.",
   "Exam wording: 'remove resources not defined in the template' points to complete mode; 'default mode' or 'leave other resources untouched' points to incremental; 'preview changes' points to what-if; 'deploy to create resource groups' points to a subscription-scope deployment; and 'which PowerShell cmdlet deploys to a resource group' is `New-AzResourceGroupDeployment`."
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
   ],
   [
    "Deployment scope",
    "The level a deployment targets: resource group, subscription, management group or tenant, each with its own command."
   ],
   [
    "Deployment stack",
    "A resource that tracks the resources a deployment manages so they can be cleaned up or protected as a group."
   ]
  ],
  "example": "A resource group contains a VM, a storage account and a key vault. A template that declares only the VM and storage account is about to be deployed in complete mode. The what-if output lists the key vault as Delete, so the administrator stops, adds the key vault to the template, and only then runs az deployment group create.",
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
   ],
   [
    "A complete-mode deployment fails to delete one resource that is not in the template. What is a likely reason?",
    "The resource has a CanNotDelete (or ReadOnly) lock, which blocks the deletion."
   ]
  ]
 },
 {
  "t": "Create virtual machines: images, sizes, OS and data disks, disk types (Standard HDD to Ultra), encryption at host and Azure Disk Encryption",
  "body": [
   "Azure Virtual Machines give you full control of an operating system in the cloud, which also means you are responsible for patching, configuring and securing it. Creating one involves a set of choices on the Create a virtual machine page: subscription and resource group, name, region and availability options, security type (Standard or Trusted Launch), image, size, administrator account (password or SSH key), inbound ports, disks, networking and management settings. Each choice affects cost, performance or resilience, and several cannot be changed later without redeploying.",
   "The image is the template for the OS disk. Azure Marketplace images include Windows Server, Windows client for some uses, and Linux distributions such as Ubuntu, Red Hat Enterprise Linux and SUSE. You can also build your own generalized images and share them through an Azure Compute Gallery so teams deploy a standard, hardened build. The image also sets the VM generation (Gen 1 or Gen 2), and Gen 2 is needed for features such as Trusted Launch with Secure Boot and a virtual TPM (Trusted Platform Module). From the CLI: `az vm create --resource-group rg-app --name vm-web01 --image Ubuntu2204 --size Standard_D2s_v5 --admin-username azureuser --generate-ssh-keys`.",
   "The size sets the virtual CPUs (vCPUs), memory, temporary storage, maximum number of data disks and network bandwidth. Sizes are grouped by purpose: B-series burstable for light workloads, D-series general purpose, E-series memory optimized, F-series compute optimized, L-series storage optimized and N-series with GPUs (graphics processing units). An 's' in the size name means it supports Premium storage. Not every size is available in every region or zone, and your subscription has vCPU quotas per region and family, so a deployment can fail with a quota error until you request an increase.",
   "Every VM has an OS disk, and most sizes also include a temporary disk (drive D: on Windows, often `/dev/sdb` or `/mnt` on Linux) that lives on the host and is lost when the VM is deallocated, resized onto new hardware or moved, so use it only for scratch data such as page files. Persistent application data goes on data disks, which are managed disks you attach and then initialize inside the OS. Managed disk types, from cheapest to fastest: Standard HDD for backups and non-critical data; Standard SSD for web servers and light production; Premium SSD for production and performance-sensitive workloads; Premium SSD v2 and Ultra Disk, where you set capacity, IOPS (input/output operations per second) and throughput independently for the most demanding databases. Premium SSD v2 and Ultra Disk can only be data disks, not OS disks, and have regional and zone restrictions.",
   "Managed disks are always encrypted at rest by server-side encryption (SSE) with platform-managed keys, and you can switch to customer-managed keys through a disk encryption set linked to Azure Key Vault. Encryption at host goes further: data on the temporary disk and the OS and data disk caches is encrypted on the VM's host before it flows to storage, so the data is encrypted end to end. The `EncryptionAtHost` feature must be registered for the subscription (`az feature register --namespace Microsoft.Compute --name EncryptionAtHost`) and then enabled per VM. Azure Disk Encryption (ADE) encrypts inside the guest OS using BitLocker on Windows or DM-Crypt on Linux, with keys stored in a Key Vault that has been enabled for disk encryption. Microsoft has announced the retirement of ADE and recommends encryption at host for new deployments, and the two cannot be combined on one VM.",
   "Consider a worked example. A team deploys a SQL Server VM. They choose an E-series memory-optimized size with an 's' so Premium storage is supported, a Premium SSD OS disk, and Premium SSD v2 data disks for data and logs with IOPS and throughput set to match the workload. The tempdb database goes on the local temporary disk because it is rebuilt at every start. The security team requires that nothing, including caches and the temporary disk, is stored unencrypted, so the administrator registers the feature, enables encryption at host, and uses a disk encryption set with a customer-managed key.",
   "Common mistakes: choosing Ultra Disk or Premium SSD v2 for the OS disk; storing important files on the temporary disk; selecting a size without an 's' and then being unable to attach Premium disks; assuming server-side encryption covers the temporary disk and caches (that is encryption at host); trying to enable both ADE and encryption at host on one VM; and forgetting to check the regional vCPU quota before a large deployment.",
   "Exam wording: 'lowest cost, infrequent access, non-critical' points to Standard HDD. 'Production, consistent low latency' points to Premium SSD. 'Tune IOPS and throughput independently for a demanding database' points to Premium SSD v2 or Ultra Disk, as data disks only. 'Data lost after deallocation' points to the temporary disk. 'Encrypt temporary disk and caches without an agent in the guest' points to encryption at host. 'BitLocker or DM-Crypt with Key Vault' points to Azure Disk Encryption."
  ],
  "terms": [
   [
    "VM size",
    "The combination of vCPUs, memory, temporary storage and disk and network limits for a VM."
   ],
   [
    "Azure Compute Gallery",
    "A service for storing and sharing custom VM images across subscriptions and regions."
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
    "Disk encryption set",
    "A resource that links managed disks to a customer-managed key in Key Vault for server-side encryption."
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
   ],
   [
    "You cannot attach a Premium SSD data disk to a VM. What should you check first?",
    "Whether the VM size supports Premium storage, usually shown by an 's' in the size name."
   ]
  ]
 },
 {
  "t": "Resize VMs, move VMs between resource groups, subscriptions and regions, manage disks",
  "body": [
   "Workloads change after deployment, so administrators often resize virtual machines (VMs), relocate them and adjust their disks. Some of these operations happen while the VM runs, some need a restart, some need the VM deallocated, and each kind of move uses a different tool. Knowing which is which is what the exam tests, because choosing wrongly means unnecessary downtime or an operation that simply fails.",
   "To resize, open the VM's Size blade, or run `az vm resize --resource-group rg-app --name vm-report --size Standard_E8s_v5`, or in PowerShell change `$vm.HardwareProfile.VmSize` and run `Update-AzVM`. Resizing a running VM restarts it. The list of sizes shown depends on the hardware cluster currently hosting the VM. If the size you want is not listed, stop (deallocate) the VM first; then every size available in the region can be chosen, and Azure places the VM on suitable hardware when it starts. Resizing can change the number of data disks and network interfaces (NICs) the VM supports, so check those limits when moving to a smaller size, and remember that the temporary disk's contents are lost if the VM moves to new hardware.",
   "Moving a VM to another resource group or subscription uses the ordinary resource move operation (Move in the portal, or `az resource move`). Move the VM together with its dependent resources, such as its disks, network interfaces and public IP addresses. The VM does not change region, the move does not stop it, but its resource ID changes. Both subscriptions must be in the same Microsoft Entra tenant, the target must have the needed resource providers registered, and some configurations, such as VMs created from certain Marketplace plans, have extra restrictions.",
   "Moving a VM to a different region is not a move operation; it is a relocation that creates a copy in the target region. Azure Resource Mover orchestrates moving VMs and related resources such as virtual networks, network security groups (NSGs) and load balancers across regions: you add resources, it checks dependencies, and you prepare, initiate the move, then commit or discard. Azure Site Recovery can also replicate a VM to another region and fail it over permanently. Either way, expect new IP addresses and some downtime at cutover, and clean up the source resources afterwards.",
   "Managing disks: you can attach new or existing data disks on the VM's Disks blade while the VM runs (`az vm disk attach --vm-name vm-report --resource-group rg-app --name data02 --new --size-gb 256`), then initialize and format them in the OS (Disk Management on Windows, or partition, format and mount on Linux). You can increase a disk's size but never shrink it; depending on disk type and configuration an expansion may need the VM deallocated, and afterwards you extend the partition inside the OS. Changing a disk's type, such as Standard SSD to Premium SSD, is done with the VM deallocated or the disk detached, and Premium disks need a size that supports Premium storage. Disk snapshots capture a full or incremental copy of a managed disk, useful before risky changes or to create a new disk. Detaching a data disk keeps it as a separate resource, and deleting a VM does not necessarily delete its disks, so look for orphaned unattached disks, which still cost money.",
   "Consider a worked example. A reporting VM needs more memory for month-end jobs. The E-series size you want is not in the resize list, so during a maintenance window you deallocate the VM, select the new size and start it again. Before converting its data disk from Standard SSD to Premium SSD, you take an incremental snapshot, then change the disk type while the VM is still deallocated. Later the business moves its operations to another region, so you use Azure Resource Mover to relocate the VM together with its virtual network and NSG, commit the move, update DNS to the new IP address and delete the source resources.",
   "Common mistakes: expecting a resource group or subscription move to change a VM's region; moving a VM without its disks and NICs; trying to shrink a managed disk; forgetting to extend the partition in the OS after enlarging a disk; resizing a running VM during business hours without realizing it restarts; and leaving unattached disks behind after deleting VMs.",
   "Exam wording: 'desired size not in the list' points to deallocating the VM first. 'Move to another subscription' points to resource move with dependent resources, same tenant. 'Move to another region' points to Azure Resource Mover or Site Recovery. 'Reduce disk size' is not possible; copy data to a new, smaller disk. 'Change disk from Standard to Premium' points to deallocating and checking the size supports Premium storage. 'Unexpected storage costs after deleting VMs' points to orphaned disks."
  ],
  "terms": [
   [
    "Deallocate",
    "Stopping a VM so it releases its host hardware and stops compute billing, allowing it to be placed on different hardware."
   ],
   [
    "Resize",
    "Changing a VM's size, which restarts the VM and may require deallocation if the size is not available on the current cluster."
   ],
   [
    "Resource move",
    "Moving a VM and its dependent resources to another resource group or subscription without changing its region."
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
   ],
   [
    "You expand a data disk from 128 GiB to 256 GiB, but the OS still shows 128 GiB. What is missing?",
    "Extending the partition or file system inside the OS, which Azure does not do for you."
   ]
  ]
 },
 {
  "t": "Availability sets (fault and update domains) vs availability zones and their SLAs",
  "body": [
   "A single virtual machine (VM) will eventually be interrupted, by a hardware failure, a host update or a datacenter problem. Azure gives you two ways to spread several VMs so one event cannot take them all down: availability sets within a datacenter, and availability zones across datacenters in a region. Each comes with a different service level agreement (SLA), the uptime percentage Microsoft commits to for VM connectivity, and the exam expects you to match a requirement to the right option and SLA.",
   "An availability set is a logical grouping of VMs that Azure spreads across fault domains and update domains. A fault domain is a group of hardware that shares a power source and network switch, similar to a rack; if it fails, only the VMs in that fault domain go down. Regions support up to three fault domains for availability sets (two in some regions). An update domain is a group of hosts that Azure may reboot at the same time during planned platform maintenance; only one update domain is rebooted at a time, and you can configure up to 20, with 5 as the default. VMs in the set are assigned to domains round robin, so with two web servers they land in different fault and update domains. You create one with `az vm availability-set create --resource-group rg-web --name avset-web --platform-fault-domain-count 2 --platform-update-domain-count 5`, then reference it when creating each VM.",
   "An availability zone is a physically separate location within a region, with independent power, cooling and networking; regions that support zones have at least three. When you create a VM you can pin it to zone 1, 2 or 3 (a zonal deployment), for example with `az vm create ... --zone 1`. Placing VMs in two or more zones protects against the failure of a whole datacenter, which an availability set cannot. Some services, such as zone-redundant storage, Standard load balancers and Standard public IP addresses, can be zone-redundant, spanning all zones automatically, which pairs naturally with zonal VMs.",
   "The published VM SLAs map directly to these choices: 99.99 percent connectivity for two or more VMs deployed across two or more availability zones in the same region; 99.95 percent for two or more VMs in the same availability set; and 99.9 percent for a single VM when all its disks are Premium SSD, Premium SSD v2 or Ultra Disk, with lower commitments for single VMs on standard disks. The higher tiers require at least two instances, which is why you always pair them with a load balancer that sends traffic only to healthy VMs. The SLA covers the platform; your application still needs to handle an instance disappearing.",
   "Key rules for exam scenarios. A VM can be added to an availability set only when it is created; to move an existing VM into a set you must recreate it, typically keeping its OS and data disks. A VM cannot be in both an availability set and an availability zone. Availability sets are free; you pay only for the VMs. Zones are only available in some regions and for some sizes, so a requirement to survive a datacenter failure rules out regions without zones. For large, elastic groups, Virtual Machine Scale Sets in Flexible orchestration can spread instances across zones or fault domains for you and add autoscaling.",
   "Consider a worked example. An online shop runs two web VMs behind a load balancer in a single availability set. The business now asks for protection against a full datacenter outage in the region. An availability set only protects against rack failures and planned maintenance within one datacenter, so it cannot meet the requirement. You redeploy the VMs from their existing disks into zones 1 and 2, place them behind a zone-redundant Standard load balancer with a Standard public IP, and confirm health probes mark both healthy. The design now qualifies for the 99.99 percent SLA.",
   "Common mistakes: confusing fault domains (unplanned hardware failure) with update domains (planned maintenance); expecting an availability set to survive a datacenter outage; trying to add a running VM to an availability set; combining an availability set and a zone on one VM; deploying a single VM in a zone and expecting 99.99 percent; and forgetting the load balancer, without which the second VM does not help users.",
   "Exam wording: 'survive a datacenter failure' or 'highest SLA' points to availability zones and 99.99 percent. 'Protect against rack failure and planned maintenance' points to an availability set and 99.95 percent. 'Single VM, premium disks' points to 99.9 percent. 'Planned host reboot' points to update domains, 'power or switch failure' to fault domains. 'Add an existing VM to a set' means recreate it. 'Region without zones' means zones are not an option."
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
    "Zone-redundant",
    "A service configuration that spans all zones in a region automatically, such as a Standard load balancer frontend."
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
   ],
   [
    "Can one VM be in an availability set and an availability zone at the same time?",
    "No. You choose one or the other; for datacenter-level protection, use zones."
   ]
  ]
 },
 {
  "t": "Virtual Machine Scale Sets: orchestration modes, autoscale rules, scale-in",
  "body": [
   "A Virtual Machine Scale Set (VMSS) manages a group of load-balanced virtual machines (VMs) as one resource. Instead of creating each VM by hand, you describe the model once (image, size, network, extensions) and tell the scale set how many instances to run. It can add and remove instances automatically based on demand, spread them across availability zones and fault domains, and roll out updates. Scale sets are the standard answer for stateless tiers such as web front ends, API servers and batch workers, where any instance can handle any request and losing one does not lose data.",
   "Scale sets have two orchestration modes, chosen at creation and not changeable afterwards. Uniform orchestration uses identical instances created from one model; you manage them mainly through the scale set's own APIs, which suits large, homogeneous stateless workloads. Flexible orchestration, the default and recommended mode for new deployments, manages standard Azure VMs that you can also manage individually with normal VM commands such as `az vm restart`. It lets you mix VM sizes and Spot and regular capacity, spreads instances across fault domains and zones for high availability, and can take VMs you add manually. If a question requires mixing sizes or treating instances as ordinary VMs, the answer is Flexible.",
   "Autoscale is configured on the scale set's Scaling blade and uses the Azure Monitor autoscale engine. Step by step: switch from manual scale to custom autoscale; set a minimum, maximum and default instance count; add a scale-out rule, for example 'average Percentage CPU across instances greater than 70 over 10 minutes, increase count by 2'; add the mirror scale-in rule, 'average CPU below 30 over 10 minutes, decrease count by 1'. Each rule has a cool down period (five minutes is typical) during which no further scaling happens so the metric can settle. Schedule-based profiles change the limits at set times, such as a higher minimum during business hours, and predictive autoscale can scale ahead of recurring daily or weekly load patterns.",
   "```bash\naz monitor autoscale create --resource-group rg-web --resource vmss-web \\\n  --resource-type Microsoft.Compute/virtualMachineScaleSets \\\n  --name as-web --min-count 2 --max-count 10 --count 2\naz monitor autoscale rule create --resource-group rg-web --autoscale-name as-web \\\n  --condition \"Percentage CPU > 70 avg 10m\" --scale out 2\naz monitor autoscale rule create --resource-group rg-web --autoscale-name as-web \\\n  --condition \"Percentage CPU < 30 avg 10m\" --scale in 1\n```",
   "Autoscale never goes below the minimum or above the maximum, whatever the rules say, and it uses the default count when metrics are unavailable. Rules can use host metrics such as CPU, network and disk, guest OS metrics, Application Insights metrics or even queue length on a storage or Service Bus queue. When scaling in, the scale-in policy decides which instances are removed. The Default policy first balances instances across availability zones and fault domains, then deletes the instance with the highest instance ID. NewestVM removes the most recently created instances first, and OldestVM removes the oldest, both still balancing across zones. Instance protection marks a VM 'protect from scale-in' so autoscale never removes it, or 'protect from scale set actions' so it is also excluded from upgrades and other scale set operations. The upgrade policy controls how model changes reach existing instances: Manual, Automatic (all at once, possible downtime) or Rolling (batches with health checks between them).",
   "Consider a worked example. A retailer runs its storefront on a Flexible scale set of six VMs across three zones behind a Standard load balancer with an HTTP health probe on `/health`. Evenings are busy, so the team sets minimum 3, maximum 15, default 3, a scale-out rule at 70 percent CPU and a scale-in rule at 30 percent, plus a schedule profile raising the minimum to 6 from 17:00 to 22:00. One VM hosts a long-running reporting job, so they enable 'protect from scale-in' on it. They choose the NewestVM scale-in policy because new instances have the least warm cache. After a sale ends, the set shrinks back to three evenly spread instances and the reporting VM survives.",
   "Common mistakes: creating only a scale-out rule, so the set grows and never shrinks and the bill keeps rising; setting scale-out and scale-in thresholds too close together (for example 60 and 55 percent), which causes flapping as each action triggers the other; expecting autoscale to go below the minimum at night; forgetting a health probe or the Application Health extension, so traffic reaches instances that are still booting; and assuming you can switch from Uniform to Flexible later, which you cannot without redeploying.",
   "Exam questions usually hide the answer in a clue word. 'Mix VM sizes' or 'manage instances as individual VMs' points to Flexible orchestration. 'Costs keep rising after the peak' points to a missing scale-in rule. 'Which VM is removed first?' points to the scale-in policy, with Default meaning balance zones then highest instance ID. 'Ensure a specific VM is never removed' points to instance protection. 'Add capacity before the 9:00 rush every day' points to a schedule-based profile or predictive autoscale, not a metric rule."
  ],
  "terms": [
   [
    "Virtual Machine Scale Set (VMSS)",
    "An Azure resource that deploys and manages a group of identical or mixed VMs as one unit with built-in scaling."
   ],
   [
    "Flexible orchestration",
    "The recommended scale set mode that manages standard VMs, allows mixed sizes and lets you manage each VM individually."
   ],
   [
    "Uniform orchestration",
    "A scale set mode that creates identical instances from one model, managed through the scale set APIs."
   ],
   [
    "Autoscale rule",
    "A condition on a metric, such as average CPU over a time window, that adds or removes instances when met."
   ],
   [
    "Cool down",
    "The waiting period after a scale action during which autoscale takes no further action so metrics can settle."
   ],
   [
    "Scale-in policy",
    "The setting (Default, NewestVM or OldestVM) that decides which instances are deleted when the set shrinks."
   ],
   [
    "Instance protection",
    "A per-instance flag that prevents a VM from being removed by scale-in or affected by scale set actions."
   ]
  ],
  "example": "A media company processes uploaded videos with a pool of worker VMs. It uses a scale set with an autoscale rule on the length of its storage queue: when more than 500 messages wait, add 3 instances; when fewer than 50 wait, remove 1. Minimum is 1 and maximum is 20. Overnight the queue empties and the set shrinks to a single VM, while a morning upload surge brings it back up within minutes without anyone logging in.",
  "tip": "Always pair a scale-out rule with a scale-in rule. The Default scale-in policy balances across zones and fault domains, then removes the highest instance ID; use instance protection to keep a specific VM, and choose Flexible orchestration when sizes must be mixed.",
  "check": [
   [
    "A scale set grew during a traffic spike but never shrank afterwards. What is the most likely cause?",
    "There is no scale-in rule; autoscale only removes instances when a rule tells it to, so every scale-out rule needs a matching scale-in rule."
   ],
   [
    "Which orchestration mode lets you mix VM sizes and manage instances with ordinary VM commands?",
    "Flexible orchestration, which manages standard Azure VMs and is the recommended mode for new deployments."
   ],
   [
    "With the Default scale-in policy, which instance is removed?",
    "After balancing across availability zones and fault domains, the instance with the highest instance ID is removed."
   ],
   [
    "How do you stop autoscale from ever deleting one particular instance?",
    "Enable instance protection on it with 'protect from scale-in', or 'protect from scale set actions' to also exclude it from upgrades."
   ]
  ]
 },
 {
  "t": "Azure Container Registry tiers and image management",
  "body": [
   "A container image packages an application with everything it needs to run: code, runtime, libraries and settings. Azure Container Registry (ACR) is a managed, private registry for storing those images and related artifacts, such as Helm charts, close to where you run them: Azure Container Instances, Azure Container Apps, App Service or Azure Kubernetes Service (AKS). Think of it as a private Docker Hub inside your subscription, protected by Microsoft Entra ID and Azure role-based access control (RBAC), so only the people and services you choose can pull or push images. Each registry has a login server name such as `contosoacr.azurecr.io`, and images are referenced as `loginserver/repository:tag`. A repository groups versions of one image, and a tag labels a version. Behind each tag is a manifest identified by an immutable digest such as `sha256:...`. A typical manual workflow with the Docker command-line interface (CLI) looks like this:",
   "ACR comes in three service tiers that share the same core API. Basic is the entry point for development and learning, with the lowest included storage and throughput. Standard increases storage and throughput for most production workloads. Premium adds the enterprise features: geo-replication (one registry replicated to several regions so pulls are local and survive a regional outage), private endpoints through Azure Private Link and network firewall rules, availability zone redundancy, customer-managed keys for encryption, the highest throughput, connected registries and a retention policy for untagged manifests. You can move between tiers later without recreating the registry. Exact storage amounts differ per tier and change over time, so learn which features need Premium rather than memorizing numbers.",
   "```bash\naz acr create --resource-group rg-app --name contosoacr --sku Standard\naz acr login --name contosoacr\ndocker tag webapp:1.0 contosoacr.azurecr.io/shop/webapp:1.0\ndocker push contosoacr.azurecr.io/shop/webapp:1.0\naz acr repository list --name contosoacr --output table\naz acr repository show-tags --name contosoacr --repository shop/webapp\n```",
   "You do not even need Docker locally. ACR Tasks builds an image in Azure from a Dockerfile with `az acr build --registry contosoacr --image shop/webapp:1.1 .`, and tasks can rebuild automatically on source code commits or when a base image is updated, which keeps images patched. `az acr import` copies images from another registry, such as a public one, directly without pulling them to your machine. Authentication options: individual Entra sign-in with `az acr login`; service principals and managed identities with RBAC roles such as AcrPull (pull only) and AcrPush (pull and push); repository-scoped tokens for limited access; and the admin user, a single shared username and password that is disabled by default and should stay that way except for quick tests. For a service pulling images, give its managed identity AcrPull on the registry.",
   "Image management keeps the registry tidy, secure and cheap. Tags such as `latest` can be moved to a different image, so production deployments should use specific version tags or image digests. When you push a new image with an existing tag, the old manifest becomes untagged but still consumes storage. You can delete old images with `az acr repository delete`, schedule a cleanup with `az acr run` and the purge command (for example removing images older than 30 days), and on Premium enable a retention policy that deletes untagged manifests after a set number of days. You can also lock an image or tag with `az acr repository update --write-enabled false` so it cannot be overwritten or deleted.",
   "Consider a worked example. A company runs its API on Container Apps in West Europe and East US, and security requires that the registry is not reachable from the internet. That combination, two regions pulling locally plus private access, requires Premium. The team enables geo-replication to both regions, creates a private endpoint in each hub virtual network and disables public network access. The Container Apps use a user-assigned managed identity with AcrPull. A nightly `acr purge` task removes images older than 60 days except those tagged as releases.",
   "Common mistakes: enabling the admin user and pasting its password into pipelines instead of using a managed identity; giving an identity AcrPush or Contributor when it only needs to pull; deploying `latest` to production and losing track of which code is running; assuming Basic or Standard can use private endpoints or geo-replication; and forgetting that untagged manifests still cost storage.",
   "Exam wording follows clear patterns: 'replicate to multiple regions', 'private endpoint' or 'customer-managed key' means Premium; 'least privilege for a service that deploys containers' means AcrPull on a managed identity; 'build without Docker installed' means ACR Tasks with `az acr build`; 'copy from Docker Hub' means `az acr import`; 'prevent an image being overwritten' means locking it."
  ],
  "terms": [
   [
    "Azure Container Registry (ACR)",
    "A managed private registry for container images and related artifacts, secured with Entra ID and RBAC."
   ],
   [
    "Login server",
    "The registry's fully qualified name, such as contosoacr.azurecr.io, used as the prefix for image names."
   ],
   [
    "Geo-replication",
    "A Premium feature that replicates one registry to several regions for local pulls and regional resilience."
   ],
   [
    "AcrPull",
    "A built-in role that allows an identity to pull images from a registry but not push them."
   ],
   [
    "ACR Tasks",
    "A registry feature that builds, tests and patches images in Azure, triggered manually, by commits or by base image updates."
   ],
   [
    "Image digest",
    "An immutable content hash that identifies exactly one image manifest, unlike a tag which can move."
   ],
   [
    "Admin user",
    "A single shared username and password for a registry, disabled by default and not recommended for production."
   ]
  ],
  "example": "A development team pushes a new image every day with the tag latest, and the registry's storage bill slowly grows. An administrator finds hundreds of untagged manifests left behind by overwritten tags. They schedule an ACR task that runs the purge command weekly to delete untagged manifests and images older than 90 days, switch the release pipeline to version tags such as 2.4.1, and grant the pipeline's managed identity AcrPush while the production Container App gets only AcrPull.",
  "tip": "Geo-replication, private endpoints, zone redundancy and customer-managed keys all point to the Premium tier. A service that only pulls images needs AcrPull on its managed identity; keep the shared admin user disabled.",
  "check": [
   [
    "A registry must be reachable only through a private endpoint. Which tier is required?",
    "Premium, because private endpoints and network firewall rules for ACR are Premium features."
   ],
   [
    "What is the least-privilege way to let an App Service app pull images from ACR?",
    "Enable a managed identity on the app and assign it the AcrPull role on the registry."
   ],
   [
    "How can you build an image from a Dockerfile when Docker is not installed on your machine?",
    "Use ACR Tasks, for example az acr build, which builds the image in Azure and pushes it to the registry."
   ],
   [
    "Why should production deployments avoid the latest tag?",
    "Tags can be moved to different images, so latest may change unexpectedly; version tags or digests identify exactly which image runs."
   ]
  ]
 },
 {
  "t": "Azure Container Instances (container groups, restart policies) and Azure Container Apps (revisions, ingress, scale rules)",
  "body": [
   "Azure offers several ways to run containers without managing virtual machines. Two are in scope for this exam: Azure Container Instances (ACI), for running containers quickly and simply, and Azure Container Apps, for running microservices and web apps with automatic scaling, revisions and managed ingress. Neither requires you to operate a Kubernetes cluster yourself. The skill tested is picking the right service and configuring its key settings: container groups and restart policies for ACI, and revisions, ingress and scale rules for Container Apps. ACI starts a container in seconds and bills per second for the vCPU and memory it uses. The unit of deployment is a container group: one or more containers scheduled on the same host that share a lifecycle, a local network (they reach each other on `localhost`), an optional public IP address with a DNS name label, and mounted volumes such as an Azure file share. It is similar to a Kubernetes pod. Multi-container groups are supported for Linux containers and are usually deployed from a YAML file or an Azure Resource Manager (ARM) template, for example an app container plus a logging sidecar. A container group can also be deployed into a virtual network subnet for private access. A quick single container looks like this:",
   "```bash\naz container create --resource-group rg-jobs --name nightly-report \\\n  --image contosoacr.azurecr.io/tools/report:3.2 --cpu 1 --memory 2 \\\n  --restart-policy OnFailure --assign-identity\naz container logs --resource-group rg-jobs --name nightly-report\n```",
   "ACI restart policies control what happens when a container exits. Always (the default) restarts the containers whenever they stop, which suits long-running services. OnFailure restarts only if the process exits with a non-zero code, which suits jobs that should retry after an error. Never runs the containers once, which suits one-off tasks such as a build, a report or a data transformation. If you run a batch job with Always, it restarts endlessly after finishing and keeps billing. Because ACI has no built-in autoscale or traffic splitting, it is best for simple tasks, burst jobs and quick tests.",
   "Azure Container Apps is a serverless platform built on Kubernetes and open-source components such as KEDA (Kubernetes Event-driven Autoscaling), Dapr (Distributed Application Runtime) and Envoy, with the complexity hidden. Apps run in a Container Apps environment, a shared network and logging boundary for a set of apps. A revision is an immutable snapshot of an app version. Changing revision-scoped settings, such as the image, CPU, memory or scale rules, creates a new revision; changing application-scoped settings, such as secrets or ingress, does not. In single revision mode the new revision replaces the old one. In multiple revision mode several revisions run at once and you split traffic by percentage, for blue-green or canary releases, and roll back by moving traffic.",
   "Ingress controls how traffic reaches the app. It can be disabled (for background workers), internal (reachable only within the environment or its virtual network) or external (reachable from the internet), for HTTP or TCP, on a target port you specify. Scale rules set how many replicas run between a minimum and maximum: HTTP rules scale on concurrent requests, TCP rules on connections, and custom rules use KEDA scalers such as the length of an Azure Service Bus or Storage queue. With a minimum of zero replicas, an app scales to zero when idle and you pay nothing for compute until traffic arrives.",
   "Consider a worked example. A team has two needs. First, a nightly script converts CSV files and must retry if it crashes; they deploy it to ACI with restart policy OnFailure and mount an Azure file share. Second, a customer-facing API must scale with traffic and release safely. They put it in Container Apps with external ingress on port 8080, an HTTP scale rule of 50 concurrent requests per replica, minimum 1 and maximum 10, and multiple revision mode. Version 2 gets 10 percent of traffic; when errors stay low they move it to 100 percent.",
   "Common mistakes: leaving a batch job on the default Always policy; expecting ACI to autoscale or split traffic; trying to split traffic in single revision mode; expecting a secret change to create a new revision; and setting ingress to internal and then wondering why the internet cannot reach the app.",
   "Exam clue words: 'run once and stop' means Never; 'retry on error' means OnFailure; 'sidecar sharing localhost' means a container group; 'canary', 'blue-green' or 'split traffic' means multiple revision mode; 'scale based on queue messages' means a KEDA custom scale rule; and 'pay nothing when idle' means minimum replicas of zero."
  ],
  "terms": [
   [
    "Container group",
    "The ACI deployment unit: containers on one host sharing lifecycle, network, IP address and volumes."
   ],
   [
    "Restart policy",
    "The ACI setting (Always, OnFailure or Never) that decides whether containers restart when they exit."
   ],
   [
    "Container Apps environment",
    "A shared boundary that provides networking and logging for a set of container apps."
   ],
   [
    "Revision",
    "An immutable snapshot of a container app version, created when revision-scoped settings change."
   ],
   [
    "Multiple revision mode",
    "A Container Apps setting that runs several revisions at once so traffic can be split between them."
   ],
   [
    "Ingress",
    "The Container Apps setting that exposes an app internally or externally over HTTP or TCP on a target port."
   ],
   [
    "KEDA",
    "Kubernetes Event-driven Autoscaling, the component Container Apps uses for scale rules based on events such as queue length."
   ]
  ],
  "example": "An insurance company receives claim documents into a Service Bus queue. It runs the processing service in Azure Container Apps with ingress disabled, a KEDA scale rule of one replica per 20 queued messages, minimum 0 and maximum 30. At night the app scales to zero and costs nothing for compute. A separate one-off migration script runs in Azure Container Instances with restart policy Never, so it runs once, writes its log and stops billing.",
  "tip": "Batch jobs in ACI need Never or OnFailure, not the default Always. In Container Apps, traffic splitting requires multiple revision mode, and a minimum replica count of zero allows scale to zero; ACI has no autoscale.",
  "check": [
   [
    "A container in ACI runs a one-off data load but keeps running and billing after it finishes. What should you change?",
    "Set the restart policy to Never (or OnFailure if it should retry on errors), because the default Always restarts it after every exit."
   ],
   [
    "What do containers in the same ACI container group share?",
    "The host, lifecycle, local network (localhost), public IP address and DNS label, and mounted volumes."
   ],
   [
    "You want to send 20 percent of traffic to a new Container Apps version. What is required?",
    "Multiple revision mode, with traffic weights set to 80 percent on the old revision and 20 percent on the new one."
   ],
   [
    "Does updating a secret in a container app create a new revision?",
    "No. Secrets are application-scoped; only revision-scoped changes such as the image or scale rules create a new revision."
   ]
  ]
 },
 {
  "t": "App Service plans: tiers, scaling up vs scaling out, autoscale",
  "body": [
   "Azure App Service hosts web apps, REST APIs and mobile back ends without you managing servers, patching operating systems or configuring load balancers. Every app runs in an App Service plan, which defines the compute resources: region, operating system (Windows or Linux), pricing tier, instance size and number of instances. All apps in the same plan share those instances, so a busy app can slow its neighbours, and you pay for the plan whether one app or ten run on it. Understanding the plan is the key to cost, performance and feature questions.",
   "Pricing tiers fall into groups. Free and Shared run your app on infrastructure shared with other customers, with CPU quotas, no scale-out and limited features; they are for trying things out. Basic provides dedicated instances with manual scale-out, suitable for low-traffic apps and development, and includes custom domains and TLS bindings. Standard adds rule-based autoscale, deployment slots and custom backups, the usual starting point for production. Premium (current generations are Premium v3 and later) adds faster hardware, more instances and slots, and platform-managed automatic scaling. Isolated runs your apps in an App Service Environment (ASE), dedicated infrastructure inside your own virtual network for maximum isolation and scale. Instance limits and slot counts differ per tier and change over time, so learn the order of features rather than numbers.",
   "Scaling up (vertical scaling) means changing the plan to a higher tier or a larger instance size: more CPU, memory and disk per instance, plus the features of that tier. You do it on the plan's Scale up blade or with `az appservice plan update --name plan-web --resource-group rg-web --sku P1V3`. It takes effect quickly without redeploying the app. Scaling up is how you get access to a feature such as deployment slots or autoscale, and how you fix an app that runs out of memory on every instance.",
   "Scaling out (horizontal scaling) means increasing the number of instances running your apps, with the built-in load balancer spreading requests across them. On Basic you set the count manually, for example `az appservice plan update --name plan-web --resource-group rg-web --number-of-workers 3`. On Standard and above you can configure rule-based autoscale on the plan's Scale out blade, which uses the same Azure Monitor autoscale engine as scale sets: a default profile with minimum, maximum and default instance counts, metric rules such as 'CPU percentage above 70 over 10 minutes, increase by 1' with a matching scale-in rule, and schedule-based profiles. Premium plans also offer automatic scaling, where the platform adds instances based on HTTP traffic without rules and you set only a maximum burst.",
   "Because autoscale works on the plan, every app in the plan scales together. If one resource-hungry app drives scaling for all of them, move it to its own plan so it can scale independently. You can move an app to another plan in the same resource group and region (strictly, the same deployment unit, called a webspace); otherwise you clone or redeploy it. Remember too that a plan's region and operating system are fixed: Linux and Windows apps need separate plans.",
   "Consider a worked example. A charity hosts three sites on one Basic B1 plan. Before a fundraising campaign they need a staging slot for testing and automatic scaling for the donation page. Basic offers neither, so they scale up to Standard S1, create a staging slot, and on Scale out add a rule: CPU above 70 percent for 10 minutes adds one instance, CPU below 30 percent for 10 minutes removes one, minimum 2, maximum 6. During the campaign the plan runs four instances; afterwards it returns to two. They later move the busy donation app to its own plan so the other sites stop scaling with it.",
   "Common mistakes: scaling out when each instance is running out of memory (more instances of a too-small size may not help); scaling up to fix a load problem that simply needs more instances; expecting autoscale or deployment slots on Basic; forgetting that apps in one plan scale together and share cost; creating a scale-out rule without a scale-in rule; and assuming a Free plan app can use a custom domain.",
   "Exam wording maps cleanly to answers. 'More CPU or memory per instance', 'a feature not available in the current tier' or 'needs deployment slots' means scale up. 'Handle more concurrent users' or 'add instances' means scale out. 'Automatically add instances based on CPU' means rule-based autoscale on Standard or higher. 'Network isolation on dedicated infrastructure' means Isolated with an App Service Environment. 'Minimize cost for a dev site' means Free or Basic. 'One app should scale independently' means a separate plan."
  ],
  "terms": [
   [
    "App Service plan",
    "The set of compute resources (region, OS, tier, size and instance count) that one or more App Service apps run on."
   ],
   [
    "Scale up",
    "Moving to a larger instance size or higher tier to get more resources per instance or extra features."
   ],
   [
    "Scale out",
    "Increasing the number of instances that run the apps in a plan, with requests load balanced across them."
   ],
   [
    "Rule-based autoscale",
    "Azure Monitor autoscale rules on a plan (Standard and above) that add or remove instances based on metrics or schedules."
   ],
   [
    "Automatic scaling",
    "A Premium plan feature where the platform scales on HTTP traffic without you writing rules."
   ],
   [
    "App Service Environment (ASE)",
    "A single-tenant deployment of App Service inside your virtual network, used by the Isolated tier."
   ]
  ],
  "example": "A software company's reporting web app crashes with out-of-memory errors whenever users export large files, even though only a few users are online. Adding instances would not help because each export runs on one instance, so the administrator scales the plan up from a 3.5 GB instance size to a larger size in the same tier. The crashes stop, and the existing rule-based autoscale on CPU still handles busy periods by scaling out.",
  "tip": "Scale up for more power per instance or for a tier feature; scale out for more instances. Rule-based autoscale and deployment slots start at Standard, and all apps in one plan share its instances and scale together.",
  "check": [
   [
    "An app on a Basic plan needs deployment slots. What should you do?",
    "Scale up the plan to Standard or higher, because deployment slots are not available in Basic."
   ],
   [
    "What is the difference between scaling up and scaling out?",
    "Scaling up gives each instance more resources or a higher tier; scaling out adds more instances to share the load."
   ],
   [
    "Two apps share a plan, and one app's traffic keeps triggering autoscale for both. How do you fix this?",
    "Move the busy app to its own App Service plan so it scales and is billed independently."
   ],
   [
    "Which tier runs apps on dedicated infrastructure inside your own virtual network?",
    "The Isolated tier, which uses an App Service Environment."
   ]
  ]
 },
 {
  "t": "App Service: TLS certificates, custom DNS names, backups, networking (VNet integration, private endpoints) and deployment slots",
  "body": [
   "Every App Service app gets a default host name, `<app-name>.azurewebsites.net`, with HTTPS already working through a Microsoft certificate. Production apps usually need more: a custom domain, their own TLS (Transport Layer Security) certificate, backups, private networking and a safe way to release updates. These settings sit on the app's blades in the portal (Custom domains, Certificates, Backups, Networking and Deployment slots), and the exam expects you to know what each one does and which direction of traffic it affects.",
   "To add a custom domain, go to Custom domains > Add custom domain. App Service asks you to prove ownership with a TXT record named `asuid.<subdomain>` (or `asuid` for the root) containing the app's domain verification ID, and to map the name: a CNAME record pointing `www` to `<app-name>.azurewebsites.net`, or, for a root (apex) domain like `contoso.com`, an A record pointing to the app's inbound IP address, because a CNAME cannot sit at the apex. After validation the name is added to the app. Custom domains are not available on the Free tier. For HTTPS on the custom name, bind a certificate. Options include a free App Service managed certificate (automatically renewed, but not for wildcard names), an App Service certificate bought through Azure, a certificate imported from Azure Key Vault, or an uploaded private certificate file (`.pfx`). Bindings are usually SNI (Server Name Indication) SSL, which lets many certificates share one IP address; IP-based SSL gives a dedicated address. Turn on HTTPS Only so HTTP requests redirect to HTTPS, and set the minimum TLS version to reject outdated clients.",
   "Backups copy the app's content and configuration, and optionally a connected database. Automatic backups are taken by the platform in Basic and higher tiers; custom backups, starting at Standard, let you set your own schedule and retention and send them to a storage account you choose. You can restore to the same app, a different app or a deployment slot. Backups are not a replacement for source control, but they help recover from a bad change or accidental deletion of content.",
   "Networking has two directions, and the exam checks you do not mix them up. Inbound: a private endpoint gives the app a private IP address in your virtual network (VNet), so clients reach it privately, and you can then disable public network access; access restrictions provide IP- or service-endpoint-based allow and deny rules on the public endpoint. Outbound: VNet integration lets the app call resources inside a VNet, such as a database on a private IP, through a dedicated subnet delegated to `Microsoft.Web/serverFarms`. VNet integration does not make the app privately reachable, and a private endpoint does not let the app reach into the network. Many secure designs use both.",
   "Deployment slots (Standard and above) are live apps with their own host names, such as `<app-name>-staging.azurewebsites.net`. You deploy to staging, test and warm it up, then swap it with production with `az webapp deployment slot swap --slot staging --target-slot production`; routing switches without downtime, and swapping back is an instant rollback. App settings and connection strings move with the code during a swap unless marked as deployment slot settings (sticky), which keeps them with the slot. You can also route a percentage of production traffic to a slot and enable auto swap after deployment.",
   "Consider a worked example. A law firm moves its client portal to App Service Standard. It adds `portal.contoso.com` with a CNAME and an `asuid.portal` TXT record, binds a free managed certificate with SNI SSL and enables HTTPS Only with minimum TLS 1.2. The portal reads a SQL database that has only a private endpoint, so the team enables VNet integration into a delegated subnet. A staging slot holds a sticky connection string pointing at a test database. Each release goes to staging, is tested, then swapped; when one release fails, they swap back within a minute.",
   "Common mistakes: using a CNAME for the apex domain; forgetting the asuid TXT record; expecting VNet integration to hide the app from the internet; forgetting to mark a staging database connection string as a slot setting, so production points at test data after a swap; and expecting a managed certificate to cover a wildcard name.",
   "Exam clue words: 'app must reach a private database' means VNet integration; 'only reachable from the corporate network' means a private endpoint; 'zero-downtime release with instant rollback' means slots and swap; 'setting must stay with the slot' means deployment slot setting; 'root domain' means an A record."
  ],
  "terms": [
   [
    "Custom domain",
    "Your own DNS name mapped to an App Service app with a CNAME or A record plus an asuid TXT verification record."
   ],
   [
    "App Service managed certificate",
    "A free, automatically renewed TLS certificate for non-wildcard custom domains on an app."
   ],
   [
    "SNI SSL",
    "A TLS binding that uses Server Name Indication so many certificates can share one IP address."
   ],
   [
    "VNet integration",
    "An outbound feature that lets an app reach resources in a virtual network through a delegated subnet."
   ],
   [
    "Private endpoint",
    "An inbound feature that gives the app a private IP in a VNet so clients can reach it privately."
   ],
   [
    "Deployment slot",
    "A separate live instance of an app, such as staging, that can be swapped with production."
   ],
   [
    "Deployment slot setting",
    "An app setting or connection string marked sticky so it stays with its slot during a swap."
   ]
  ],
  "example": "An online shop deploys each release to a staging slot that uses a sticky connection string for a test payment gateway. After smoke tests pass, the team swaps staging into production; the code moves, but the production slot keeps its live payment gateway setting. When a bug appears an hour later, they swap again to restore the previous version instantly, then investigate the faulty build in the staging slot without affecting customers.",
  "tip": "VNet integration is outbound only; a private endpoint is inbound only. Slot swaps move settings unless they are marked as deployment slot settings. An apex domain uses an A record, a subdomain usually a CNAME, and both need an asuid TXT record.",
  "check": [
   [
    "An App Service app must connect to a SQL database that only has a private IP address. Which feature is needed?",
    "VNet integration, which gives the app outbound access into the virtual network through a delegated subnet."
   ],
   [
    "Which DNS records do you create to map contoso.com (the apex) to an App Service app?",
    "An A record pointing to the app's IP address and a TXT record named asuid containing the domain verification ID."
   ],
   [
    "After a swap, production is using the staging database. What was missed?",
    "The connection string was not marked as a deployment slot setting, so it moved with the code during the swap."
   ],
   [
    "What is the minimum tier for deployment slots?",
    "Standard; Free, Shared and Basic plans do not support deployment slots."
   ]
  ]
 },
 {
  "t": "Virtual networks and subnets: address space planning, the 5 reserved IPs per subnet",
  "body": [
   "An Azure virtual network (VNet) is your private network in the cloud. Resources such as virtual machines (VMs), private endpoints and internal load balancers get private IP addresses from it and can talk to each other, reach the internet outbound, and, through peering or a VPN (virtual private network), connect to other networks. A VNet belongs to one region and one subscription, and it automatically spans all availability zones in that region, so you do not create a separate network per zone. Good address planning at the start saves painful rebuilds later. When you create a VNet you give it one or more address spaces in CIDR (Classless Inter-Domain Routing) notation, normally from the private ranges defined in RFC 1918: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. The most important planning rule is to avoid overlap. Two VNets with overlapping address spaces cannot be peered, and a VNet that overlaps your on-premises network cannot be connected to it by VPN or ExpressRoute. Large organizations therefore keep an IP address management (IPAM) plan and give each VNet its own non-overlapping block, with room to grow. You can add further address spaces to an existing VNet later if you run out.",
   "You divide the address space into subnets, for example 10.1.0.0/24 for web servers and 10.1.1.0/24 for databases. Subnets are where you apply network security groups, route tables, service endpoints and delegations, so group resources by the security and routing they need rather than by team. Some services require a dedicated subnet with an exact name: `GatewaySubnet` for VPN and ExpressRoute gateways, `AzureBastionSubnet` for Azure Bastion and `AzureFirewallSubnet` for Azure Firewall. Others, such as App Service VNet integration, need a subnet delegated to them that nothing else can use.",
   "Azure reserves five IP addresses in every subnet, and exam questions often ask how many usable addresses a subnet has. In 10.1.0.0/24 the reserved addresses are: 10.1.0.0, the network address; 10.1.0.1, reserved for the default gateway; 10.1.0.2 and 10.1.0.3, reserved to map Azure DNS IP addresses into the VNet; and 10.1.0.255, the network broadcast address. So a /24 subnet has 256 minus 5, or 251, usable addresses, and the first address you can assign is x.x.x.4. The smallest supported IPv4 subnet is /29, which has 8 addresses minus 5 reserved, leaving 3 usable. A /28 leaves 11, a /27 leaves 27, a /26 leaves 59 and a /25 leaves 123.",
   "```bash\naz network vnet create --resource-group rg-net --name vnet-prod \\\n  --address-prefixes 10.1.0.0/16 --subnet-name web --subnet-prefixes 10.1.0.0/24\naz network vnet subnet create --resource-group rg-net --vnet-name vnet-prod \\\n  --name db --address-prefixes 10.1.1.0/24\n```",
   "You can create VNets in the portal, with the Azure command-line interface (CLI) as shown, in PowerShell or in Bicep templates. Changing a subnet's range later is only possible if no resources use addresses outside the new range, so plan generously and size subnets for scale: a scale set, AKS cluster or App Service integration may need many addresses. By default, VMs use Azure-provided DNS (Domain Name System), reached at the virtual IP 168.63.129.16, unless you set custom DNS servers on the VNet; changing DNS servers takes effect after VMs renew their settings or restart.",
   "Consider a worked example. A company plans three VNets: a hub in West Europe, a production spoke and a development spoke, plus an on-premises network using 10.0.0.0/16. They choose 10.10.0.0/16 for the hub, 10.20.0.0/16 for production and 10.30.0.0/16 for development, so nothing overlaps. In the hub they create `GatewaySubnet` as 10.10.0.0/27, `AzureBastionSubnet` as 10.10.1.0/26 and `AzureFirewallSubnet` as 10.10.2.0/26. The production web tier expects up to 200 VMs, so it gets a /24 with 251 usable addresses rather than a /25 with only 123.",
   "Common mistakes: forgetting the five reserved addresses and sizing a subnet too tightly; reusing 10.0.0.0/16 in every VNet because it is the portal default, which later blocks peering; misspelling a special subnet name; placing ordinary VMs in `GatewaySubnet`; assuming a VNet can span regions; and thinking the first usable address is .1 as it might be on a home router.",
   "Exam questions phrase this in predictable ways. 'How many IP addresses can be assigned in a /27 subnet?' means 32 minus 5, so 27. 'What is the first IP address assigned to a VM?' means .4. 'The VNets cannot be peered' or 'the VPN connection fails to create' usually points to overlapping address spaces. 'Which subnet name is required for Bastion, VPN gateway or Azure Firewall?' tests the exact names, and 'the smallest subnet' is /29."
  ],
  "terms": [
   [
    "Virtual network (VNet)",
    "A private, isolated network in one Azure region and subscription that spans the region's availability zones."
   ],
   [
    "Address space",
    "The CIDR block or blocks assigned to a VNet, from which all its subnets are carved."
   ],
   [
    "CIDR",
    "Classless Inter-Domain Routing notation, such as 10.1.0.0/24, where the suffix gives the number of network bits."
   ],
   [
    "Subnet",
    "A range inside a VNet's address space where NSGs, route tables, service endpoints and delegations are applied."
   ],
   [
    "Reserved addresses",
    "The five addresses Azure keeps in every subnet: network, default gateway, two for Azure DNS, and broadcast."
   ],
   [
    "Subnet delegation",
    "Dedicating a subnet to a specific Azure service, such as App Service VNet integration, so it can inject resources there."
   ],
   [
    "GatewaySubnet",
    "The exact subnet name required for VPN and ExpressRoute virtual network gateways."
   ]
  ],
  "example": "A startup created every VNet with the default 10.0.0.0/16. A year later it tries to peer the production and analytics VNets and connect both to the office network over VPN, and every attempt fails because the ranges overlap. The team rebuilds analytics as 10.40.0.0/16, documents an address plan in a shared spreadsheet, and from then on assigns each new VNet a unique /16 before anyone deploys into it.",
  "tip": "Usable addresses equal the subnet size minus 5, and the first usable address is .4. Overlapping address spaces block both peering and VPN connections, and special services need exactly named subnets such as GatewaySubnet and AzureBastionSubnet.",
  "check": [
   [
    "How many usable IP addresses does a /26 subnet have in Azure?",
    "59, because a /26 has 64 addresses and Azure reserves 5 in every subnet."
   ],
   [
    "Which addresses are reserved in 192.168.5.0/24?",
    "192.168.5.0 (network), .1 (default gateway), .2 and .3 (Azure DNS) and .255 (broadcast)."
   ],
   [
    "Two VNets cannot be peered even though you have the right permissions. What should you check first?",
    "Whether their address spaces overlap, because overlapping VNets cannot be peered."
   ],
   [
    "What is the smallest IPv4 subnet Azure supports, and how many usable addresses does it have?",
    "A /29, with 8 addresses minus 5 reserved, leaving 3 usable."
   ]
  ]
 },
 {
  "t": "Virtual network peering: non-transitive, gateway transit and use remote gateways, global peering",
  "body": [
   "Virtual network peering connects two virtual networks (VNets) so resources in them communicate using private IP addresses, as if they were one network. Traffic travels over the Microsoft backbone, never the public internet, with low latency and no gateway in the path. Peering VNets in the same region is regional peering; peering VNets in different regions is global peering, which works the same way. VNets can be in different subscriptions, and even in different Microsoft Entra tenants when the administrator has permissions on both sides. Peering is the building block of hub-and-spoke networks.",
   "A peering is really two links, one from each side. In the portal, creating a peering on one VNet can create both links at once. With the command-line interface (CLI) or PowerShell you create both yourself, for example `az network vnet peering create --name hub-to-spoke1 --resource-group rg-hub --vnet-name vnet-hub --remote-vnet <spoke1-id> --allow-vnet-access` and then the reverse link on the spoke. The peering status shows Initiated when only one side exists and Connected when both do. The VNets must not have overlapping address spaces. Peering traffic is charged per gigabyte in and out, with higher rates for global peering.",
   "Peering is non-transitive. If VNet A is peered with VNet B, and B is peered with C, A cannot reach C through B. This is the most tested fact about peering. In a hub-and-spoke design, where spokes peer only with a central hub, spokes cannot talk to each other by default. To allow spoke-to-spoke traffic you either peer the spokes directly, or route traffic through a network virtual appliance (NVA) or Azure Firewall in the hub using user-defined routes, with Allow forwarded traffic enabled on the peerings. Azure Virtual Network Manager and Azure Virtual WAN can also build connected topologies for you.",
   "Each peering link has settings. Allow access to the remote VNet (on by default) permits communication. Allow forwarded traffic accepts traffic that did not originate in the peer VNet, such as traffic routed through an appliance. Allow gateway transit, set on the hub side, lets peered VNets use the hub's VPN or ExpressRoute gateway. Use remote gateways, set on the spoke side, tells the spoke to use the peer's gateway instead of its own.",
   "Gateway transit is how a hub-and-spoke network shares one VPN gateway instead of paying for one per spoke. The hub has the gateway and enables Allow gateway transit; each spoke enables Use remote gateways. Spokes can then reach on-premises through the hub gateway, and on-premises learns routes to the spokes (over BGP, Border Gateway Protocol, or through local network gateway prefixes). A spoke that already has its own gateway cannot use remote gateways, and a VNet can use remote gateways from only one peering. Gateway transit works with global peering as well as regional peering.",
   "Consider a worked example. A company has a hub VNet in North Europe with a site-to-site VPN gateway to its head office, and two spokes, Finance and HR. Staff in the office must reach both spokes, and Finance must reach HR. The administrator peers each spoke with the hub, enabling Allow gateway transit on the hub-side links and Use remote gateways on the spoke-side links; the office can now reach both spokes. For Finance-to-HR traffic they deploy Azure Firewall in the hub, add a route table to each spoke subnet sending the other spoke's range to the firewall's private IP, and enable Allow forwarded traffic on the peerings. Checking effective routes on a Finance VM shows the peering route to the hub and the user-defined route to HR via the firewall.",
   "Common mistakes: expecting spoke-to-spoke connectivity through a hub without an appliance and routes; setting Use remote gateways on the hub instead of the spoke; creating only one side of the peering and leaving it in the Initiated state; trying to peer overlapping ranges; and trying to enable Use remote gateways on a spoke that has its own gateway. Troubleshooting usually comes down to three checks: are both links Connected, do the address spaces overlap, and do network security groups or route tables block the traffic? Network Watcher's effective routes on a VM's network interface show whether a 'VNet peering' route to the remote address space exists.",
   "Exam questions describe a topology and ask what is reachable. 'A is peered to B and B to C; can A reach C?' is always no without extra configuration. 'Spokes must use the hub's VPN gateway' means Allow gateway transit on the hub and Use remote gateways on each spoke. 'Connect VNets in different regions privately' means global peering. 'Peering status is Initiated' means the other side's link is missing. 'Minimum cost to let two spokes talk' usually means peering them directly."
  ],
  "terms": [
   [
    "Virtual network peering",
    "A private, low-latency connection between two VNets over the Microsoft backbone."
   ],
   [
    "Global peering",
    "Peering between VNets in different Azure regions."
   ],
   [
    "Non-transitive",
    "The property that peering does not pass through a third VNet: A-B and B-C does not give A-C."
   ],
   [
    "Allow gateway transit",
    "A peering setting on the VNet that owns a gateway, letting peers use that gateway."
   ],
   [
    "Use remote gateways",
    "A peering setting on the VNet without a gateway, telling it to use the peer's gateway."
   ],
   [
    "Allow forwarded traffic",
    "A peering setting that accepts traffic not originating in the peer VNet, such as traffic routed via an appliance."
   ],
   [
    "Hub-and-spoke",
    "A topology where spoke VNets peer with a central hub that holds shared services such as gateways and firewalls."
   ]
  ],
  "example": "A retailer's three regional spokes all need access to on-premises inventory servers. Rather than deploying three VPN gateways, the network team places one gateway in the hub, enables Allow gateway transit on each hub-to-spoke link and Use remote gateways on each spoke-to-hub link. On-premises routers now learn all spoke prefixes through the hub gateway, and the company pays for one gateway instead of three.",
  "tip": "Peering is non-transitive: A-B and B-C does not give A-C. Allow gateway transit goes on the VNet that has the gateway; Use remote gateways goes on the VNet that borrows it. Address spaces must not overlap and both links must show Connected.",
  "check": [
   [
    "VNet1 is peered with VNet2, and VNet2 with VNet3. Can VM1 in VNet1 reach VM3 in VNet3?",
    "No. Peering is non-transitive; you need a direct peering or routing through an appliance in VNet2."
   ],
   [
    "Where do you enable Allow gateway transit and Use remote gateways?",
    "Allow gateway transit on the hub VNet that has the gateway; Use remote gateways on each spoke VNet that shares it."
   ],
   [
    "A peering shows the status Initiated. What does that mean?",
    "Only one side of the peering has been created; the link from the other VNet is missing."
   ],
   [
    "Can VNets in different regions be peered, and what is it called?",
    "Yes. Peering across regions is called global peering and works like regional peering, including gateway transit."
   ]
  ]
 },
 {
  "t": "Public IP addresses: Standard SKU, static allocation, zones",
  "body": [
   "A public IP address is a separate Azure resource that you associate with something that must be reachable from, or appear from, the internet: a virtual machine's network interface, a public load balancer, a VPN gateway, Application Gateway, Azure Bastion, Azure Firewall or a NAT gateway. Because it is its own resource, you can keep the address when you delete or replace the resource it was attached to, which matters when partners, DNS records or firewall allow-lists depend on that exact address.",
   "Public IPs come in SKUs (stock-keeping units). Standard is the SKU to use: Microsoft has retired the older Basic SKU, so new designs, and exam answers, should assume Standard. Standard public IPs have three properties that matter. First, they always use static allocation: the address is assigned when you create the resource and does not change until you delete it. Second, they are secure by default: inbound traffic is blocked unless a network security group (NSG) explicitly allows it. Third, they support availability zones. A Standard public IP must be paired with a Standard SKU load balancer, because the SKUs of a load balancer and its public IP must match. Static versus dynamic allocation is a classic exam topic. With the old Basic SKU, a dynamic address was assigned when the resource started and could change when a VM was stopped and deallocated. A static address never changes, which is what you need for DNS A records, firewall allow-lists and some certificates. Standard addresses are always static, so if a question says an address keeps changing after deallocation, the fix is a static Standard public IP.",
   "Zone settings are chosen when you create the IP and cannot be changed later. A zone-redundant IP is served from all zones in the region and survives the failure of any single zone; this is the usual choice in regions with zones. A zonal IP is pinned to one zone (1, 2 or 3) and fails if that zone does, which suits a VM deliberately placed in that zone. No zone is the option for regions without availability zones. Match the IP to your design: a zone-redundant load balancer front end should use a zone-redundant public IP.",
   "```bash\naz network public-ip create --resource-group rg-web --name pip-lb-web \\\n  --sku Standard --allocation-method Static --zone 1 2 3 \\\n  --dns-name contoso-shop\n```",
   "Other properties you will see in the portal: IP version (IPv4 or IPv6), tier (Regional, or Global for a cross-region load balancer), an optional DNS name label that creates a name such as `contoso-shop.westeurope.cloudapp.azure.com`, routing preference (Microsoft network or internet) and idle timeout. A public IP prefix reserves a contiguous block of static public addresses, useful when partners must allow-list a predictable range. For outbound-only internet access from private VMs, a NAT gateway with a Standard public IP or prefix is the recommended approach, rather than giving each VM its own public IP. Fewer public IPs mean a smaller attack surface; administrators should reach VMs through Azure Bastion or VPN instead of public RDP or SSH.",
   "Consider a worked example. A payment provider must allow-list your outbound address, and your website needs a fixed address that survives a zone failure. For inbound, you create a zone-redundant Standard public IP for the load balancer front end and add an NSG rule allowing TCP 443 from the internet to the web subnet, since Standard IPs block inbound traffic by default. For outbound, you attach a NAT gateway with a public IP prefix to the application subnet and send the prefix to the payment provider. None of the VMs has its own public IP.",
   "Common mistakes: expecting a new Standard public IP to accept traffic without an NSG rule; trying to change a zonal IP to zone-redundant after creation; pairing a Standard IP with a Basic load balancer; giving every VM a public IP for outbound access; and deleting a VM together with its public IP when the address needed to be kept.",
   "Exam clue words: 'address must never change' means static Standard; 'survive a zone failure' means zone-redundant; 'no inbound traffic arrives on a new public IP' means add an NSG allow rule; 'predictable contiguous range' means a public IP prefix; 'outbound only, no inbound exposure' means a NAT gateway."
  ],
  "terms": [
   [
    "Public IP address",
    "A standalone Azure resource that gives an associated resource an internet-routable address."
   ],
   [
    "Standard SKU",
    "The current public IP SKU: always static, secure by default and zone aware."
   ],
   [
    "Static allocation",
    "An address assigned at creation that does not change until the public IP resource is deleted."
   ],
   [
    "Zone-redundant",
    "A public IP served from all availability zones in a region so it survives a single zone failure."
   ],
   [
    "Zonal",
    "A public IP pinned to one availability zone, which fails if that zone fails."
   ],
   [
    "Public IP prefix",
    "A reserved contiguous block of static public IP addresses."
   ],
   [
    "NAT gateway",
    "A managed service that provides outbound internet connectivity for a subnet through shared public IPs or prefixes."
   ]
  ],
  "example": "A company runs a VPN gateway and a web load balancer in a region with availability zones. During a design review, the architect checks that both use Standard, zone-redundant public IPs, so the loss of one datacenter zone does not change or remove the addresses that branch offices and customers rely on. She also confirms that the web subnet's NSG explicitly allows TCP 443, because Standard public IPs block inbound traffic until a rule permits it.",
  "tip": "Standard public IPs are always static, zone-aware and closed to inbound traffic until an NSG allows it. The zone choice is fixed at creation, and load balancer and public IP SKUs must match.",
  "check": [
   [
    "A new Standard public IP is attached to a VM, but nobody can reach the web server. What is the likely cause?",
    "Standard public IPs are secure by default, so an NSG rule must explicitly allow the inbound port, such as TCP 443."
   ],
   [
    "Can you change a zonal public IP to zone-redundant later?",
    "No. The zone setting is chosen at creation and cannot be changed; you must create a new public IP."
   ],
   [
    "What allocation method do Standard public IPs use?",
    "Static only; the address stays the same until the resource is deleted."
   ],
   [
    "Private VMs need outbound internet access through a small, fixed set of addresses. What is recommended?",
    "A NAT gateway on their subnet with a Standard public IP or public IP prefix."
   ]
  ]
 },
 {
  "t": "User-defined routes: route tables, next hop types (virtual appliance, virtual network gateway, internet, none) and forced tunneling",
  "body": [
   "Azure routes traffic automatically with system routes, which you cannot delete. Each subnet gets a route for the VNet's own address space (next hop Virtual network), a default route 0.0.0.0/0 to the Internet, routes for peered VNets and routes learned from gateways. Certain private and reserved ranges not used in the VNet get next hop None, so traffic to them is dropped. This works well until you want traffic to go somewhere else, most often through a firewall for inspection, or back to on-premises. User-defined routes (UDRs) let you override system routes. You create a route table resource, add routes to it, and associate the route table with one or more subnets. A route table affects traffic leaving resources in the subnets it is associated with; it is never associated with a network interface (NIC) or with a whole VNet, and each subnet can have at most one route table. The route table must be in the same region and subscription as the VNet. The steps look like this:",
   "```bash\naz network route-table create --resource-group rg-net --name rt-spoke\naz network route-table route create --resource-group rg-net --route-table-name rt-spoke \\\n  --name default-to-fw --address-prefix 0.0.0.0/0 \\\n  --next-hop-type VirtualAppliance --next-hop-ip-address 10.0.1.4\naz network vnet subnet update --resource-group rg-net --vnet-name vnet-spoke \\\n  --name app --route-table rt-spoke\n```",
   "Each route has an address prefix (destination) and a next hop type. Virtual appliance sends traffic to the private IP of a network virtual appliance (NVA), such as Azure Firewall or a third-party firewall VM; you must enter that next hop IP address. Virtual network gateway sends traffic to the VPN gateway, typically toward on-premises. Virtual network routes traffic within the VNet, useful to override a broader rule for a specific range. Internet sends traffic to the internet directly. None drops the traffic, a simple way to block a destination.",
   "When several routes match a destination, Azure picks the longest prefix match: a /24 route wins over a /16 route, which wins over 0.0.0.0/0. If routes with the same prefix come from different sources, a UDR wins over a BGP (Border Gateway Protocol) route learned from a gateway, which wins over a system route. The route table also has a Propagate gateway routes setting; turning it off stops routes learned by the VPN or ExpressRoute gateway from being added to the subnet, which is common on spokes that must send everything through a firewall. An NVA forwards traffic that is not addressed to itself, so on its network interface you must enable IP forwarding in Azure, and routing inside its operating system. Azure Firewall handles this for you.",
   "Forced tunneling means sending all internet-bound traffic back to on-premises for inspection instead of letting it leave Azure directly. With a VPN gateway, you create a UDR for 0.0.0.0/0 with next hop Virtual network gateway and configure a default site on the route-based gateway; with ExpressRoute, on-premises advertises a default route over BGP. Use Network Watcher's effective routes or next hop tool to confirm which route a VM's traffic actually takes.",
   "Consider a worked example. Security requires that all traffic from the App spoke, both to the internet and to the Data spoke, passes through Azure Firewall at 10.0.1.4 in the hub. You create route table rt-app with a route 0.0.0.0/0 to Virtual appliance 10.0.1.4 and associate it with the App subnet, then a similar table on the Data subnet so return traffic is symmetric. Because the hub VPN gateway would otherwise inject on-premises routes that bypass the firewall, you disable gateway route propagation on both tables. Next hop from an App VM to 8.8.8.8 now shows VirtualAppliance 10.0.1.4 and the route table's ID.",
   "Common mistakes: trying to associate a route table with a NIC; forgetting IP forwarding on a third-party NVA's network interface; routing only one direction through a firewall, creating asymmetric routing that breaks sessions; putting a 0.0.0.0/0 UDR on the `GatewaySubnet` or `AzureBastionSubnet`, which is unsupported and breaks those services; and forgetting that a more specific system or BGP route beats a broader UDR.",
   "Exam wording: 'send all traffic through the firewall' means 0.0.0.0/0 next hop Virtual appliance; 'inspect internet traffic on-premises' means forced tunneling; 'block traffic to a range' means next hop None; 'which route is used?' means longest prefix first, then UDR over BGP over system."
  ],
  "terms": [
   [
    "System route",
    "A default route Azure creates automatically for every subnet, such as the VNet range and 0.0.0.0/0 to the internet."
   ],
   [
    "User-defined route (UDR)",
    "A custom route in a route table that overrides system routes for associated subnets."
   ],
   [
    "Route table",
    "An Azure resource holding UDRs, associated with one or more subnets (at most one table per subnet)."
   ],
   [
    "Next hop type",
    "Where matching traffic is sent: Virtual appliance, Virtual network gateway, Virtual network, Internet or None."
   ],
   [
    "Longest prefix match",
    "The rule that the most specific matching route, such as a /24 over a /16, is chosen."
   ],
   [
    "IP forwarding",
    "A NIC setting that lets a VM receive and forward traffic not addressed to itself, required for NVAs."
   ],
   [
    "Forced tunneling",
    "Redirecting all internet-bound traffic from Azure to on-premises for inspection."
   ]
  ],
  "example": "After adding a route table that sends 0.0.0.0/0 to a third-party firewall VM, a team finds that their VMs can no longer reach anything outside the subnet. Next hop confirms traffic goes to the firewall's IP, but the firewall never forwards it. The network interface of the firewall VM has IP forwarding disabled. Enabling it on the NIC, and in the firewall's operating system, restores connectivity with inspection in place.",
  "tip": "Route tables are associated with subnets, not NICs. The longest prefix wins; on a tie, UDR beats BGP beats system routes. Virtual appliance needs a next hop IP address and IP forwarding on the NVA's NIC, and None drops traffic.",
  "check": [
   [
    "Which next hop type sends traffic to a firewall VM, and what extra value is required?",
    "Virtual appliance, with the firewall's private IP address as the next hop IP address."
   ],
   [
    "A subnet has a UDR for 10.0.0.0/8 and a system route for 10.1.0.0/16. Which applies to 10.1.2.3?",
    "The system route for 10.1.0.0/16, because the longest prefix match is chosen before route source is considered."
   ],
   [
    "How do you force all internet-bound traffic from Azure through on-premises security devices?",
    "Forced tunneling: a 0.0.0.0/0 route to the virtual network gateway with a default site, or a default route advertised over BGP for ExpressRoute."
   ],
   [
    "What does next hop type None do?",
    "It drops traffic to the matching destination prefix."
   ]
  ]
 },
 {
  "t": "Network security groups and application security groups: rule priority, default rules, subnet vs NIC association, effective security rules",
  "body": [
   "A network security group (NSG) filters traffic to and from Azure resources in a virtual network with a list of allow and deny rules. Each rule matches on source, source port, destination, destination port and protocol (TCP, UDP, ICMP or any) and has a direction (inbound or outbound), an action and a priority. NSGs are stateful: if an inbound connection is allowed, the return traffic is allowed automatically without an outbound rule. NSGs are the basic layer 3 and layer 4 firewall of every Azure network and appear in almost every networking question.",
   "Priority is a number from 100 to 4096. Rules are processed in order from the lowest number to the highest, and processing stops at the first rule that matches. So a Deny at priority 100 beats an Allow at 200 for the same traffic, and an Allow at 100 beats a Deny at 200. Leave gaps between priorities, such as 100, 200, 300, so you can insert rules later. A rule is created like this: `az network nsg rule create --resource-group rg-web --nsg-name nsg-web --name allow-https --priority 100 --direction Inbound --access Allow --protocol Tcp --source-address-prefixes Internet --destination-port-ranges 443`.",
   "Every NSG includes default rules with priorities 65000 and above, which you cannot delete but can override with lower-numbered rules. Inbound: AllowVnetInBound (65000) allows traffic from within the VNet and connected networks, AllowAzureLoadBalancerInBound (65001) allows Azure load balancer health probes, and DenyAllInBound (65500) blocks everything else, including the internet. Outbound: AllowVnetOutBound (65000), AllowInternetOutBound (65001) and DenyAllOutBound (65500). Source and destination can use service tags such as `VirtualNetwork`, `Internet`, `AzureLoadBalancer` or `Storage` instead of IP ranges, and Azure keeps their address lists up to date.",
   "You can associate an NSG with a subnet, with a network interface (NIC), or with both, and one NSG can be reused on many. When both exist, traffic must be allowed by both. For inbound traffic the subnet NSG is evaluated first, then the NIC NSG. For outbound traffic the NIC NSG is evaluated first, then the subnet NSG. If either denies, the traffic is dropped. Many teams apply NSGs to subnets only, for simplicity, and use NIC-level NSGs only for exceptions. When traffic is blocked unexpectedly, look at effective security rules: on the VM's NIC, open Effective security rules (or use Network Watcher) to see the combined rules from both the subnet and NIC NSGs, including default rules and expanded service tags. Network Watcher's IP flow verify tells you exactly which rule allows or denies a specific packet.",
   "Application security groups (ASGs) let you group NICs by role and use the group name in rules instead of IP addresses. You create ASGs such as `asg-web` and `asg-db`, assign each VM's NIC to the right ASG, then write a rule like 'allow TCP 1433 from asg-web to asg-db'. When you add a new web server, you only add its NIC to `asg-web`; no rule changes are needed. All NICs in an ASG must be in the same VNet, and a rule's source and destination ASGs must be in the same VNet too.",
   "Consider a worked example. A three-tier app has web, app and database subnets. The web subnet NSG has priority 100 allowing TCP 443 from `Internet`. The database subnet NSG has priority 100 allowing TCP 1433 from `asg-app` to `asg-db`, and priority 4000 denying all traffic from `VirtualNetwork`, overriding AllowVnetInBound so web servers cannot reach the database directly. A developer then adds a NIC-level NSG on one database VM with no rules. Connections from the app tier fail, because inbound traffic passes the subnet NSG but hits DenyAllInBound on the NIC NSG. Effective security rules shows both NSGs and reveals the problem.",
   "Common mistakes: assuming a higher priority number means more important; adding an Allow at 300 below a Deny at 200 and wondering why nothing changes; forgetting that the internet is blocked inbound by DenyAllInBound; blocking the `AzureLoadBalancer` tag so health probes fail; and forgetting that both subnet and NIC NSGs must allow traffic.",
   "Exam clue words: 'which rule applies?' means find the lowest matching priority number; 'inbound order' means subnet then NIC; 'group servers by role without IP addresses' means ASGs; 'see all rules applied to a VM' means effective security rules; 'which rule blocks this packet?' means IP flow verify."
  ],
  "terms": [
   [
    "Network security group (NSG)",
    "A stateful set of allow and deny rules that filters traffic for subnets and network interfaces."
   ],
   [
    "Priority",
    "A number from 100 to 4096; lower numbers are processed first and the first match wins."
   ],
   [
    "Default rules",
    "Built-in NSG rules at 65000 and above, such as AllowVnetInBound and DenyAllInBound, that cannot be deleted."
   ],
   [
    "Service tag",
    "A named group of IP prefixes for an Azure service or scope, such as Internet or AzureLoadBalancer, maintained by Microsoft."
   ],
   [
    "Application security group (ASG)",
    "A logical grouping of NICs by role that can be used as a source or destination in NSG rules."
   ],
   [
    "Effective security rules",
    "The combined view of all NSG rules from subnet and NIC that actually apply to a network interface."
   ],
   [
    "Stateful filtering",
    "Automatically allowing return traffic for a connection that a rule already allowed."
   ]
  ],
  "example": "A company adds new web servers every month and used to update NSG rules with each server's IP address. The administrator creates an application security group named asg-web, rewrites the database NSG rule to allow TCP 1433 from asg-web only, and adds every web server's NIC to the group during deployment. New servers get database access automatically, and removed servers lose it as soon as their NIC leaves the group.",
  "tip": "The lowest priority number wins and processing stops at the first match. Inbound traffic is checked by the subnet NSG then the NIC NSG; outbound by the NIC then the subnet; both must allow. The default DenyAllInBound blocks internet traffic unless you add an Allow.",
  "check": [
   [
    "An NSG has Deny TCP 3389 at priority 200 and Allow TCP 3389 at priority 300. Is RDP allowed?",
    "No. Rules are processed from the lowest number, so the Deny at 200 matches first and processing stops."
   ],
   [
    "A VM has NSGs on both its subnet and its NIC. What must be true for inbound traffic to reach it?",
    "Both NSGs must allow it; the subnet NSG is evaluated first, then the NIC NSG."
   ],
   [
    "Which default rule blocks inbound traffic from the internet?",
    "DenyAllInBound at priority 65500, which only AllowVnetInBound and AllowAzureLoadBalancerInBound precede."
   ],
   [
    "How can you allow SQL traffic from all web servers without listing their IP addresses?",
    "Put the web servers' NICs in an application security group and use that ASG as the rule's source."
   ]
  ]
 },
 {
  "t": "Azure Bastion: AzureBastionSubnet, SKUs, browser and native client access",
  "body": [
   "Opening RDP (Remote Desktop Protocol, port 3389) or SSH (Secure Shell, port 22) to the internet exposes virtual machines (VMs) to constant scanning and password-guessing attacks. Azure Bastion is a managed service that lets you connect to your VMs over RDP and SSH without giving them public IP addresses. You connect to Bastion over TLS (Transport Layer Security) on port 443, from the Azure portal or a native client, and Bastion opens the RDP or SSH session to the VM's private IP inside the virtual network (VNet). The VMs need no public IP and no agent, which shrinks the attack surface dramatically.",
   "A dedicated Bastion deployment lives in its own subnet, which must be named exactly `AzureBastionSubnet` and be at least a /26. The Bastion host gets a Standard public IP address. You deploy it in a VNet, often a hub, and from the Basic SKU upward it can reach VMs in that VNet and in peered VNets, so one Bastion can serve a whole hub-and-spoke network. Network security groups (NSGs) on the VMs' subnets must allow RDP or SSH from the Bastion subnet's address range, and if you place an NSG on AzureBastionSubnet itself it must allow the specific inbound and outbound traffic Bastion needs, such as HTTPS 443 inbound from the internet and the gateway manager service tag.",
   "Bastion comes in several SKUs, and features grow with each. Developer is a free, lightweight option for development and test that uses shared infrastructure, supports one connection at a time to VMs in the same VNet and does not need AzureBastionSubnet; it is available only in some regions. Basic is a dedicated deployment with portal-based RDP and SSH and a fixed capacity. Standard adds host scaling (you choose the number of instances for more concurrent sessions), native client support, IP-based connection (connect to a private IP, including on-premises machines reachable from the VNet), shareable links, custom ports and file transfer through the native client. Premium adds features such as session recording and private-only deployment without a public IP. You can upgrade a SKU, for example Basic to Standard, but not downgrade.",
   "Browser access is the simplest: open the VM in the portal, choose Connect > Bastion, enter credentials (a username and password, an SSH private key, or a key stored in Azure Key Vault), and the session opens in a browser tab. Copy and paste of text works through the Bastion clipboard. Native client access (Standard and Premium) lets you use your local Remote Desktop client or SSH client, which supports features like file transfer and multiple monitors. Native client support must be enabled in the Bastion configuration first; then you sign in with the Azure command-line interface (CLI):",
   "```bash\naz network bastion rdp --name bas-hub --resource-group rg-hub \\\n  --target-resource-id /subscriptions/<sub>/resourceGroups/rg-app/providers/Microsoft.Compute/virtualMachines/vm-app1\naz network bastion ssh --name bas-hub --resource-group rg-hub \\\n  --target-resource-id <vm-id> --auth-type AAD\n```",
   "Consider a worked example. A company has a hub VNet and three peered spokes containing about forty VMs, several of which currently have public IPs with RDP open to the internet. The administrator creates `AzureBastionSubnet` as 10.0.3.0/26 in the hub and deploys Bastion Standard with two instances. She enables native client support so engineers can copy files with their own RDP client, updates the spoke NSGs to allow TCP 3389 and 22 only from 10.0.3.0/26, and then removes every VM public IP. Engineers now connect through the portal or with `az network bastion rdp`, and security scans no longer show exposed management ports.",
   "Common mistakes: naming the subnet `BastionSubnet` or making it smaller than /26; assuming VMs still need a public IP; blocking RDP or SSH from the Bastion subnet range in the target NSG; expecting native client, file transfer or shareable links on the Basic SKU; choosing the Developer SKU for production or for peered VNets; and assuming Bastion is a jump-box VM you have to patch, when it is a fully managed platform service.",
   "Exam questions usually test names, sizes and SKU features. 'Connect to VMs without public IP addresses over the internet using only port 443' means Azure Bastion. 'Which subnet name and minimum size?' means `AzureBastionSubnet`, /26 or larger. 'Use the local RDP client', 'upload files', 'shareable link', 'more concurrent sessions' or 'connect by IP address to an on-premises server' all mean Standard or higher. 'Record sessions' means Premium. 'Cheapest option for a single dev VM' points to the Developer SKU."
  ],
  "terms": [
   [
    "Azure Bastion",
    "A managed PaaS service that provides RDP and SSH to VMs over TLS without exposing public IPs on the VMs."
   ],
   [
    "AzureBastionSubnet",
    "The exact subnet name, at least /26, required for a dedicated Bastion deployment."
   ],
   [
    "Native client support",
    "A Standard and Premium feature that lets you connect with your local RDP or SSH client via the Azure CLI."
   ],
   [
    "Host scaling",
    "Adding Bastion instances (Standard and above) to support more concurrent sessions."
   ],
   [
    "IP-based connection",
    "A Standard feature for connecting to a private IP address, including machines on-premises reachable from the VNet."
   ],
   [
    "Shareable link",
    "A Standard feature that lets a user connect to a specific VM through a URL without portal access."
   ],
   [
    "Developer SKU",
    "A free, shared-infrastructure Bastion option for dev and test with one connection at a time and no dedicated subnet."
   ]
  ],
  "example": "An auditor flags that twelve production VMs accept RDP from the internet. The operations team deploys Azure Bastion Standard in the hub VNet, confirms engineers can connect to every peered spoke through the portal, and then deletes the VMs' public IP addresses. Contractors who should not see the portal receive shareable links to the two VMs they maintain, and the NSGs now allow management ports only from the Bastion subnet.",
  "tip": "The subnet must be named AzureBastionSubnet and be /26 or larger. Native client, file transfer, host scaling, shareable links and IP-based connection need Standard or higher, and the target VMs need no public IP.",
  "check": [
   [
    "What are the name and minimum size of the subnet for a dedicated Bastion host?",
    "AzureBastionSubnet, with a prefix of /26 or larger."
   ],
   [
    "Engineers want to connect through Bastion with their own Remote Desktop client. Which SKU and setting are needed?",
    "Standard or Premium with native client support enabled, then connect using az network bastion rdp."
   ],
   [
    "Can one Bastion in a hub VNet reach VMs in peered spoke VNets?",
    "Yes, Basic and higher SKUs can reach VMs in peered VNets; the Developer SKU cannot."
   ],
   [
    "Which port do users need open outbound to use Bastion from a browser?",
    "TCP 443, because the session runs over TLS to the Bastion host rather than directly over 3389 or 22."
   ]
  ]
 },
 {
  "t": "Service endpoints vs private endpoints, and private DNS zones for private link",
  "body": [
   "Many Azure platform services, such as Azure Storage, Azure SQL Database and Azure Key Vault, are reached by default through public endpoints on the internet. Two features let resources in a virtual network (VNet) reach them more securely: service endpoints and private endpoints. They sound alike but work very differently, and choosing between them is a frequent exam scenario, usually decided by whether on-premises access, per-resource scope or fully disabled public access is required.",
   "A service endpoint is a setting on a subnet, such as `Microsoft.Storage` or `Microsoft.Sql`. Once enabled, traffic from that subnet to the service travels over the Azure backbone and carries the subnet's identity. The service's firewall can then allow that specific subnet (a virtual network rule) and deny everything else. The service still uses its public IP address, and the VM keeps connecting to the public name. Service endpoints are free, quick to set up, only work for traffic originating in Azure subnets (not from on-premises over VPN), and allow access to every instance of that service type, unless you add a service endpoint policy (available for Storage) that limits which accounts can be reached.",
   "A private endpoint is a network interface placed in your subnet with a private IP address, connected through Azure Private Link to one specific resource, such as the blob service of one storage account or one SQL server. Clients connect to that private IP. Because it is a real address in your VNet, it is reachable from peered VNets and from on-premises over VPN or ExpressRoute, and you can then disable public network access on the resource entirely. Because it maps to one resource instance, it also helps prevent data exfiltration to other accounts. Private endpoints are billed per hour and per gigabyte processed.",
   "Private endpoints only work if clients resolve the service's normal name to the private IP. When you create a private endpoint, the public DNS (Domain Name System) name, such as `contoso.blob.core.windows.net`, gets a CNAME to a `privatelink` name, such as `contoso.privatelink.blob.core.windows.net`. You create an Azure private DNS zone with that privatelink name, link it to your VNets, and add an A record for the private IP. The portal does this for you when you choose Integrate with private DNS zone, attaching a DNS zone group to the endpoint so records are maintained automatically. Examples: `privatelink.blob.core.windows.net` for blobs, `privatelink.file.core.windows.net` for files, `privatelink.database.windows.net` for Azure SQL and `privatelink.vaultcore.azure.net` for Key Vault.",
   "In a hub-and-spoke network, keep the privatelink zones in one place and link them to every VNet that needs resolution. On-premises DNS servers must forward queries for those zones into Azure, usually to an Azure DNS Private Resolver inbound endpoint, because on-premises machines cannot query Azure DNS at 168.63.129.16 directly. You can test resolution from a VM with `nslookup contoso.blob.core.windows.net`; the answer should be a private address such as 10.20.1.5 and the alias should include `privatelink`.",
   "Consider a worked example. A finance team stores statements in a storage account and must access it from Azure VMs and from the head office over a site-to-site VPN, with no public access at all. Service endpoints cannot help the office, so the administrator creates a private endpoint for the blob sub-resource in the hub VNet, integrates it with the `privatelink.blob.core.windows.net` zone linked to hub and spokes, configures the office DNS servers to conditionally forward `blob.core.windows.net` to the Private Resolver inbound endpoint, and sets public network access to Disabled. Both VMs and office PCs now resolve the account to 10.10.4.6.",
   "Common mistakes: assuming a service endpoint gives the service a private IP; expecting service endpoints to work from on-premises; creating a private endpoint without DNS integration, so `nslookup` still returns a public IP and the connection is refused once public access is disabled; creating a private zone but forgetting to link it to the client's VNet; and pointing on-premises servers at 168.63.129.16. When a private endpoint connection fails, check DNS first.",
   "Exam wording has clear clues. 'Free', 'simplest', 'restrict a storage account to a subnet' means a service endpoint with a virtual network rule. 'Private IP address', 'accessible from on-premises', 'disable public network access' or 'only this one storage account' means a private endpoint. 'Name resolves to a public IP' means a missing private DNS zone or VNet link. 'On-premises clients cannot resolve the private endpoint' means a DNS forwarder or Private Resolver."
  ],
  "terms": [
   [
    "Service endpoint",
    "A subnet setting that routes traffic to a PaaS service over the Azure backbone and identifies the subnet to the service's firewall."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your subnet that connects to one specific resource through Private Link."
   ],
   [
    "Azure Private Link",
    "The platform technology that exposes Azure services on private IP addresses inside your VNet."
   ],
   [
    "Private DNS zone",
    "An Azure DNS zone resolvable only from linked VNets, used for privatelink names."
   ],
   [
    "Virtual network link",
    "The association that lets a VNet resolve records in a private DNS zone."
   ],
   [
    "Service endpoint policy",
    "A policy that limits service endpoint traffic to specific Azure Storage accounts."
   ],
   [
    "Azure DNS Private Resolver",
    "A managed service with inbound and outbound endpoints that lets on-premises DNS resolve Azure private zones and vice versa."
   ]
  ],
  "example": "After a storage account's public access is disabled, an application VM starts failing with 403 errors. An engineer runs nslookup on the VM and sees the account resolving to a public address. The private endpoint exists, but its privatelink.blob.core.windows.net zone is linked only to the hub VNet, not the spoke where the VM lives. Adding a virtual network link from the zone to the spoke makes the name resolve to the private IP, and the application recovers.",
  "tip": "On-premises access, disabling public access or scoping to one resource instance means a private endpoint. If a private endpoint connection fails, check DNS first: the name must resolve to the private IP through a linked privatelink zone.",
  "check": [
   [
    "Which option lets on-premises clients reach an Azure SQL server over a VPN using a private IP address?",
    "A private endpoint, because service endpoints only work for traffic from Azure subnets and keep the public IP."
   ],
   [
    "After creating a private endpoint, nslookup on a VM returns a public IP. What is the likely cause?",
    "The privatelink private DNS zone is missing, lacks the A record, or is not linked to the VM's VNet."
   ],
   [
    "What does enabling Microsoft.Storage as a service endpoint on a subnet actually change?",
    "Traffic from the subnet reaches Storage over the Azure backbone with the subnet's identity, so the storage firewall can allow that subnet; the service keeps its public IP."
   ],
   [
    "Which private DNS zone name is used for a blob storage private endpoint?",
    "privatelink.blob.core.windows.net."
   ]
  ]
 },
 {
  "t": "Azure DNS: public zones, delegation, record sets, alias records; private DNS zones with auto-registration",
  "body": [
   "Azure DNS hosts DNS (Domain Name System) zones on Microsoft's global network of name servers, so you manage your records with the same tools, role-based access control (RBAC), locks and templates as the rest of Azure. It does not register domain names for you; you buy a domain from a registrar and then host its zone in Azure DNS. There are two kinds of zones: public zones answer queries from the internet, and private zones answer only for virtual networks (VNets) you link to them.",
   "Creating a public zone such as `contoso.com` gives it an SOA (start of authority) record and an NS (name server) record set listing four Azure name servers assigned to that zone, with names under `azure-dns.com`, `azure-dns.net`, `azure-dns.org` and `azure-dns.info`. The zone does nothing until you delegate the domain: at your registrar, replace the domain's name server entries with those four Azure name servers. After the change propagates, internet resolvers ask Azure DNS for your records. You can check with `nslookup -type=NS contoso.com`. Delegating a subdomain works the same way inside DNS: to host `dev.contoso.com` as its own zone, perhaps managed by another team, create the child zone, then in the parent `contoso.com` zone add an NS record set named `dev` containing the child zone's name servers.",
   "Records are organized in record sets: all records with the same name and type form one set, with a single TTL (time to live) that says how long resolvers may cache the answer. For example, the A record set `www` can contain several IP addresses. Supported types include A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT and CAA. A CNAME record set can contain only one record, and you cannot create a CNAME at the zone apex (`contoso.com` itself), which is a DNS standard rule. Alias records solve two problems. An alias record set of type A, AAAA or CNAME points to an Azure resource instead of a fixed value: a public IP address, a Traffic Manager profile, an Azure Front Door or CDN endpoint, or another record set in the same zone. When the resource's IP changes, the alias updates automatically, so you never have dangling records pointing to an old address. And because an A alias can sit at the apex, you can point `contoso.com` at a Traffic Manager profile or Front Door, which a CNAME cannot do.",
   "```bash\naz network dns zone create --resource-group rg-dns --name contoso.com\naz network dns record-set a add-record --resource-group rg-dns \\\n  --zone-name contoso.com --record-set-name www --ipv4-address 20.50.10.4\naz network dns zone show --resource-group rg-dns --name contoso.com --query nameServers\n```",
   "A private DNS zone, such as `corp.contoso.com`, works only inside Azure. You link it to VNets with virtual network links; VMs in linked VNets can resolve its records through Azure-provided DNS. When you create a link you can enable auto-registration, and Azure then automatically creates and removes A records for the VMs in that VNet as they are created, change IP or are deleted. A VNet can be linked to many private zones for resolution, but only one of them can have auto-registration enabled for that VNet. Private zones are also what makes private endpoints resolve to their private IPs.",
   "Consider a worked example. Contoso buys `contoso.com` from a registrar and wants Azure to host it. The administrator creates the public zone, reads the four assigned name servers, and updates the registrar. She adds an A alias record at the apex pointing to the web load balancer's public IP, so the record follows the IP automatically, and a CNAME `www` pointing to `contoso.com`. Internally, she creates the private zone `corp.contoso.com`, links the hub VNet with auto-registration enabled, and links the spokes for resolution only. New VMs in the hub appear as `vm-name.corp.contoso.com` without anyone editing records.",
   "Common mistakes: creating a zone but never updating the registrar, so nothing resolves; trying to add a CNAME at the apex; adding a second value to a CNAME set; setting a very long TTL just before a planned change, so old answers stay cached; expecting auto-registration on more than one private zone per VNet; and forgetting to link a private zone to the VNet that needs it.",
   "In exam questions, 'records do not resolve from the internet after creating the zone' means update the NS records at the registrar; 'point the root domain at Front Door or Traffic Manager' means an alias record; 'avoid dangling DNS when an IP changes' means alias; 'VMs automatically get DNS names' means a private zone with auto-registration; 'another team manages a subdomain' means child zone plus NS delegation."
  ],
  "terms": [
   [
    "DNS zone",
    "A container for the DNS records of one domain, hosted in Azure DNS as public or private."
   ],
   [
    "Delegation",
    "Pointing a domain or subdomain to specific name servers with NS records at the registrar or parent zone."
   ],
   [
    "Record set",
    "All DNS records with the same name and type in a zone, sharing one TTL."
   ],
   [
    "TTL",
    "Time to live, the number of seconds resolvers may cache a DNS answer."
   ],
   [
    "Alias record",
    "An A, AAAA or CNAME record set that references an Azure resource and updates automatically when its address changes."
   ],
   [
    "Private DNS zone",
    "A zone that resolves only for VNets linked to it through virtual network links."
   ],
   [
    "Auto-registration",
    "A virtual network link option that automatically maintains A records for VMs in that VNet; one zone per VNet."
   ]
  ],
  "example": "A company's marketing site moves behind Azure Front Door, and the team needs the bare domain fabrikam.com, not just www, to reach it. A CNAME cannot be placed at the zone apex, so the administrator creates an A alias record at the apex in the Azure DNS public zone that targets the Front Door endpoint. When Front Door's addresses change, the record follows automatically and there is no dangling entry to clean up.",
  "tip": "A zone does nothing until the registrar's NS records point to Azure's name servers. Use an alias record for the zone apex and to track Azure resources, and remember only one private zone per VNet can have auto-registration.",
  "check": [
   [
    "You created a public zone in Azure DNS but its records do not resolve on the internet. What is missing?",
    "Delegation: the registrar's name server records must be changed to the four Azure DNS name servers assigned to the zone."
   ],
   [
    "How can you point the zone apex contoso.com at a Traffic Manager profile?",
    "Create an alias A record at the apex that targets the Traffic Manager profile, because a CNAME is not allowed at the apex."
   ],
   [
    "A VNet is linked to three private DNS zones. How many can have auto-registration enabled for it?",
    "Only one."
   ],
   [
    "How do you delegate dev.contoso.com to a separate zone?",
    "Create the dev.contoso.com zone, then add an NS record set named dev in the contoso.com zone listing the child zone's name servers."
   ]
  ]
 },
 {
  "t": "Azure Load Balancer: public vs internal, Standard SKU, backend pools, health probes, load-balancing and inbound NAT rules",
  "body": [
   "Azure Load Balancer distributes incoming network traffic across a group of healthy virtual machines (VMs) or scale set instances. It works at layer 4 of the OSI (Open Systems Interconnection) model, the transport layer, so it balances TCP and UDP flows based on IP addresses and ports, without looking at HTTP content. For URL-based routing, TLS termination or a web application firewall you would use Application Gateway, a layer 7 service, instead. Load Balancer is fast, low latency and suited to any TCP or UDP protocol. A load balancer is public or internal according to its front-end IP configuration. A public load balancer has a public IP address as its front end and balances internet traffic to VMs, and it can also provide outbound internet connectivity for them. An internal load balancer has a private IP address from a subnet as its front end and balances traffic inside a virtual network (VNet) or from connected networks, for example between a web tier and an application tier.",
   "Use the Standard SKU. Microsoft has retired the Basic SKU, and Standard has the features the exam focuses on: it supports availability zones (zone-redundant or zonal front ends), has an SLA (service level agreement), supports larger backend pools, HTTPS health probes and HA ports, and is secure by default, meaning inbound traffic is blocked unless a network security group (NSG) on the backend VMs' subnets or NICs allows it. A Standard load balancer must use Standard public IPs, and its backend pool members must be in one VNet.",
   "The main building blocks are these. The backend pool is the set of VM network interfaces or IP addresses that receive traffic. A health probe checks each backend on a protocol and port (TCP, HTTP or HTTPS) at an interval; an instance that fails is taken out of rotation until it passes again. HTTP probes expect a 200 response from a path such as `/health`. Probes come from the Azure platform address 168.63.129.16, which the default NSG rule AllowAzureLoadBalancerInBound permits, so do not block it. A load-balancing rule ties everything together: front-end IP and port, backend pool and port, protocol, health probe and session persistence. By default the load balancer uses a five-tuple hash (source IP, source port, destination IP, destination port, protocol), so different connections from one client may land on different VMs. Session persistence set to Client IP, or Client IP and protocol, keeps a client on the same VM. On an internal Standard load balancer, an HA ports rule balances all ports and protocols at once, which is handy for network virtual appliances.",
   "```bash\naz network lb probe create --resource-group rg-web --lb-name lb-web \\\n  --name http-probe --protocol Http --port 80 --path /health\naz network lb rule create --resource-group rg-web --lb-name lb-web --name http \\\n  --protocol Tcp --frontend-port 80 --backend-port 80 \\\n  --frontend-ip-name fe-web --backend-pool-name bp-web --probe-name http-probe\n```",
   "An inbound NAT (network address translation) rule forwards traffic arriving at a specific front-end port to a specific VM and port, rather than balancing it. For example, front-end port 50001 to VM1 port 3389 and 50002 to VM2 port 3389 lets you reach each VM individually through the load balancer's single public IP. Outbound rules control how backend VMs share the front-end IPs for outbound internet access, although a NAT gateway is now the recommended way to provide outbound connectivity.",
   "Consider a worked example. A web tier of three VMs in zones 1, 2 and 3 sits behind a public Standard load balancer with a zone-redundant front-end IP, a health probe on HTTP `/health` and a load-balancing rule for TCP 443. An application tier sits behind an internal Standard load balancer at 10.1.2.10 on port 8080. After deployment, the website does not respond. The NSG on the web subnet has no rule allowing 443 from the internet, and Standard is closed by default. Adding the rule fixes it. Later, a VM whose web service crashes is removed from rotation automatically because its probe fails.",
   "Common mistakes: expecting a Standard load balancer to pass traffic without an NSG allow rule; blocking the `AzureLoadBalancer` service tag so every probe fails and the pool looks empty; probing a port or path the application does not serve; mixing SKUs of public IP and load balancer; choosing Load Balancer when the scenario needs URL path routing or a web application firewall; and using a load-balancing rule when you need to reach one specific VM.",
   "Exam wording is predictable. 'Distribute TCP or UDP traffic' means Azure Load Balancer. 'Private front end between tiers' means internal load balancer. 'Route by URL path' or 'WAF' means Application Gateway. 'Remove unhealthy VMs automatically' means a health probe. 'Users must stay on the same VM' means session persistence (Client IP). 'Connect to each VM on a different port through one public IP' means inbound NAT rules. 'All ports for an NVA' means HA ports on an internal Standard load balancer."
  ],
  "terms": [
   [
    "Azure Load Balancer",
    "A layer 4 service that distributes TCP and UDP flows across healthy backend instances."
   ],
   [
    "Internal load balancer",
    "A load balancer with a private front-end IP that balances traffic inside a VNet or connected networks."
   ],
   [
    "Backend pool",
    "The set of VM NICs or IP addresses that receive traffic from a load balancer."
   ],
   [
    "Health probe",
    "A periodic TCP, HTTP or HTTPS check that removes failing backend instances from rotation."
   ],
   [
    "Load-balancing rule",
    "A mapping from a front-end IP and port to a backend pool and port, using a health probe."
   ],
   [
    "Inbound NAT rule",
    "A rule that forwards one front-end port to a specific backend VM and port."
   ],
   [
    "Session persistence",
    "A setting that keeps a client's connections on the same backend instance, based on client IP."
   ]
  ],
  "example": "A game studio runs UDP game servers on six VMs. A public Standard load balancer with a zone-redundant front end distributes players across the servers, and a TCP health probe on the game port removes any server whose process hangs. For maintenance, the studio adds inbound NAT rules mapping ports 50001 to 50006 to SSH on each VM, reachable only from the office IP through an NSG rule, rather than giving each VM its own public IP.",
  "tip": "Standard load balancers block inbound traffic until an NSG allows it. Load-balancing rules spread traffic; inbound NAT rules map a port to one VM. Layer 7 needs such as URL paths or a WAF point to Application Gateway, not Load Balancer.",
  "check": [
   [
    "Web servers behind a new public Standard load balancer receive no traffic, but the health probes succeed. What should you check?",
    "The NSG on the backend subnet or NICs, because Standard is secure by default and needs an explicit rule allowing the inbound port."
   ],
   [
    "What is the difference between a load-balancing rule and an inbound NAT rule?",
    "A load-balancing rule spreads traffic across the backend pool; an inbound NAT rule forwards one front-end port to one specific VM."
   ],
   [
    "A shopping cart loses state because users hit different VMs. What load balancer setting helps?",
    "Session persistence set to Client IP (or Client IP and protocol) so a client stays on the same VM."
   ],
   [
    "Which service should you use if requests must be routed by URL path?",
    "Application Gateway, because Azure Load Balancer works at layer 4 and does not inspect HTTP paths."
   ]
  ]
 },
 {
  "t": "Troubleshooting connectivity with Network Watcher: IP flow verify, next hop, connection troubleshoot, effective routes",
  "body": [
   "When a virtual machine (VM) cannot reach something, the cause is usually one of three things: a network security group (NSG) rule blocks the traffic, a route sends it somewhere unexpected, or the destination itself is not listening or is unreachable. Azure Network Watcher provides tools that test each possibility from the Azure platform's point of view, without logging in to the VM. Network Watcher is enabled automatically per region when you create a virtual network, and its tools are in the portal under Network Watcher or on a VM's Help and Connection troubleshoot blades.",
   "IP flow verify checks whether a specific packet would be allowed or denied to or from a VM. You specify the VM and NIC, direction (inbound or outbound), protocol (TCP or UDP), local IP and port, and remote IP and port. The result is Access allowed or Access denied, plus the name of the NSG rule that made the decision, such as `DenyAllInBound` or a custom rule. This is the fastest way to prove or rule out an NSG problem. The CLI equivalent is `az network watcher test-ip-flow --vm vm-web --direction Inbound --protocol TCP --local 10.1.0.4:443 --remote 203.0.113.10:50000`.",
   "Next hop tells you where Azure would send a packet from a VM to a destination IP. It returns the next hop type, such as Internet, VirtualNetwork, VirtualAppliance, VirtualNetworkGateway or None, the next hop IP address if there is one, and the ID of the route table containing the matching user-defined route (UDR). If traffic to the internet unexpectedly goes to a firewall, or to None, next hop shows it immediately: `az network watcher show-next-hop --vm vm-web --source-ip 10.1.0.4 --dest-ip 10.20.0.5`.",
   "Effective routes, found on a VM's network interface under Help > Effective routes, list every route that applies to the NIC: system routes, routes from route tables, routes learned over BGP (Border Gateway Protocol) from gateways, and peering routes, with their source, state and next hop. Where next hop answers 'where does this one packet go?', effective routes shows the whole routing table so you can spot an overly broad UDR or a missing peering route. Effective security rules is the matching view for combined NSG rules from both subnet and NIC.",
   "Connection troubleshoot tests an actual connection from a source, such as a VM, a scale set instance or an Application Gateway, to a destination VM, FQDN (fully qualified domain name), URI or IP address on a port. It reports whether the connection succeeded, latency, the hops along the path, and problems it found, such as an NSG denying the traffic, a route to None, or the destination port not responding. For VMs it relies on the Network Watcher agent VM extension, which the portal can install for you. A practical order when a VM cannot connect: run connection troubleshoot for an overall verdict; if it points to a rule, use IP flow verify to name the NSG rule; if it points to routing, use next hop and effective routes. If Azure's view says traffic is allowed and routed correctly, look inside the VM (OS firewall, service not running) or at the destination. Packet capture and flow logs help for intermittent problems.",
   "Consider a worked example. After the network team adds a route table to the app subnet, `vm-app1` can no longer reach an API at 10.30.0.8 in a peered VNet. Connection troubleshoot reports the destination unreachable. IP flow verify outbound on TCP 443 says Access allowed by `AllowVnetOutBound`, so the NSG is not the problem. Next hop to 10.30.0.8 returns VirtualAppliance 10.0.1.4 and the new route table's ID. Effective routes shows a user-defined route for 10.30.0.0/16 with next hop VirtualAppliance; because it has the same prefix as the peering route, the UDR wins, and the firewall has no rule allowing this traffic. Adding a firewall rule restores connectivity, and connection troubleshoot now reports Reachable with latency.",
   "Common mistakes: using IP flow verify to diagnose a routing problem (it only evaluates NSG rules); expecting next hop to tell you about NSGs; forgetting that IP flow verify needs the VM running; testing inbound when the question is about outbound; skipping the Network Watcher agent extension for connection troubleshoot; and assuming that because Azure allows the traffic, the guest OS firewall does too.",
   "Exam questions map symptoms to tools. 'Determine which NSG rule blocks traffic' means IP flow verify. 'Determine where traffic is sent' or 'identify the route table that affects traffic' means next hop. 'View all routes applied to a NIC' means effective routes. 'Test connectivity end to end with latency and hops' means connection troubleshoot. 'Capture packets for analysis' means packet capture, and 'record all traffic flows' means flow logs."
  ],
  "terms": [
   [
    "Network Watcher",
    "A regional Azure service with diagnostic and monitoring tools for virtual network resources."
   ],
   [
    "IP flow verify",
    "A tool that tests whether a specific packet is allowed or denied to or from a VM and names the NSG rule responsible."
   ],
   [
    "Next hop",
    "A tool that shows where Azure will send a packet from a VM, including next hop type, IP and route table."
   ],
   [
    "Effective routes",
    "The full list of system, user-defined, BGP and peering routes applied to a network interface."
   ],
   [
    "Connection troubleshoot",
    "A tool that tests an actual connection from a source to a destination and reports reachability, latency, hops and issues."
   ],
   [
    "Network Watcher agent",
    "A VM extension required for connection troubleshoot, packet capture and Connection Monitor from Azure VMs."
   ]
  ],
  "example": "Users report that a web VM stopped answering on port 443 after a security change. IP flow verify, run inbound for TCP 443 from an internet address, returns Access denied by a custom rule named Deny-All-Web at priority 150, which a colleague added above the existing Allow rule at 200. Renumbering the Allow rule to 140 fixes the problem, and IP flow verify now reports Access allowed.",
  "tip": "Blocked by an NSG? IP flow verify names the rule. Wrong path? Next hop shows the next hop and route table, and effective routes shows the full table. End-to-end test with latency and hops? Connection troubleshoot.",
  "check": [
   [
    "Which tool tells you the exact NSG rule that denies a packet?",
    "IP flow verify, which returns Access allowed or denied and the name of the deciding rule."
   ],
   [
    "Internet traffic from a VM is going through a firewall unexpectedly. Which tool shows why?",
    "Next hop, which shows the next hop type (VirtualAppliance), its IP address and the route table containing the matching route."
   ],
   [
    "What is the difference between next hop and effective routes?",
    "Next hop evaluates one destination; effective routes lists every route applied to the NIC with source and state."
   ],
   [
    "What does connection troubleshoot require on an Azure VM source?",
    "The Network Watcher agent VM extension, which the portal can install automatically."
   ]
  ]
 },
 {
  "t": "Azure Monitor metrics vs logs, and diagnostic settings that send resource logs to a Log Analytics workspace",
  "body": [
   "Azure Monitor is the platform service that collects, stores and analyzes telemetry from Azure resources, operating systems and applications. Almost everything it does rests on two kinds of data: metrics and logs. Knowing which is which, what is collected automatically, and what you must switch on yourself answers a large share of monitoring questions on the exam and saves you from discovering, during an incident, that the data you need was never captured.",
   "Metrics are numeric values sampled at regular intervals and stored as a time series, such as Percentage CPU for a virtual machine (VM), Transactions for a storage account or Data Path Availability for a load balancer. Platform metrics are collected automatically for Azure resources with no setup, are lightweight and near real time, which makes them ideal for charts and fast alerts. You explore them in Metrics explorer, choosing a resource, a metric, an aggregation (average, minimum, maximum, sum or count) and optionally splitting by a dimension such as API name. Platform metrics are kept for 93 days; send them to a workspace if you need longer retention or want to query them alongside other data.",
   "Logs are records of events or observations with many properties, such as a sign-in, an HTTP request, a Windows event or a performance counter reading with its computer name. They are stored in a Log Analytics workspace, where you query them with KQL (Kusto Query Language), correlate data from many sources and keep it for a configurable retention period. Logs are richer and more flexible than metrics but take a little longer to arrive and cost money per gigabyte ingested and retained. Three log sources matter at the Azure level. The activity log records control-plane events for a subscription: who created, changed or deleted which resource and when, plus service health events. It is collected automatically and kept for 90 days. Resource logs record what happens inside a resource, such as Key Vault access requests, storage read and write operations or NSG (network security group) events. They are not collected at all until you create a diagnostic setting. Guest OS logs and performance counters from inside VMs need the Azure Monitor Agent, covered in a later lesson.",
   "A diagnostic setting is configured per resource under Monitoring > Diagnostic settings. You pick log categories or category groups (such as `allLogs` or `audit`) and optionally AllMetrics, then one or more destinations: a Log Analytics workspace for querying and alerting, a storage account for cheap long-term archival, an event hub for streaming to a third-party SIEM (security information and event management) system, or a partner solution. The activity log has its own diagnostic setting at the subscription level so it can be sent to a workspace for longer retention and cross-subscription queries. From the CLI it looks like this:",
   "```bash\naz monitor diagnostic-settings create --name kv-to-law \\\n  --resource /subscriptions/<sub>/resourceGroups/rg-sec/providers/Microsoft.KeyVault/vaults/kv-prod \\\n  --workspace /subscriptions/<sub>/resourceGroups/rg-mon/providers/Microsoft.OperationalInsights/workspaces/law-prod \\\n  --logs '[{\"categoryGroup\":\"audit\",\"enabled\":true}]' --metrics '[{\"category\":\"AllMetrics\",\"enabled\":true}]'\n```",
   "Consider a worked example. After a secret disappears from a production key vault, the security team wants to know who read or deleted secrets last month. The activity log shows management operations on the vault, but secret reads and deletes are data-plane operations recorded only in resource logs, and no diagnostic setting existed, so that history is gone. The administrator now creates diagnostic settings on every key vault sending the audit category group to the central workspace and also to a storage account for seven-year archival, and assigns an Azure Policy with the DeployIfNotExists effect so every new vault gets the same setting automatically. Next time, a KQL query answers the question in seconds.",
   "Common mistakes: assuming resource logs are collected by default; confusing the activity log (who changed the resource) with resource logs (what happened inside it); sending data to a storage account and then expecting to query or alert on it; forgetting that each resource needs its own diagnostic setting; and thinking metrics are kept forever.",
   "In exam questions, 'performance counter charted in near real time' or 'numeric value over time' means metrics; 'query and correlate' means logs in a Log Analytics workspace; 'who deleted the VM' means the activity log; 'capture storage read operations' means a diagnostic setting; 'retain for years cheaply' means a storage account; 'stream to a third-party SIEM' means an event hub; 'ensure every new resource sends logs' means Azure Policy with DeployIfNotExists."
  ],
  "terms": [
   [
    "Azure Monitor",
    "The Azure platform service that collects, stores, analyzes and alerts on metrics and logs."
   ],
   [
    "Platform metrics",
    "Numeric time-series data collected automatically for Azure resources and kept for 93 days."
   ],
   [
    "Log Analytics workspace",
    "The Azure Monitor store for log data, queried with KQL and used for log alerts and insights."
   ],
   [
    "Activity log",
    "A subscription-level record of control-plane operations and service health events, collected automatically."
   ],
   [
    "Resource logs",
    "Data-plane logs emitted by a resource, collected only when a diagnostic setting is configured."
   ],
   [
    "Diagnostic setting",
    "A per-resource configuration that sends selected logs and metrics to a workspace, storage account, event hub or partner."
   ],
   [
    "Event hub",
    "A streaming ingestion service used as a diagnostic destination to forward data to external tools such as a SIEM."
   ]
  ],
  "example": "A retailer wants to investigate slow storage requests and keep an audit trail for compliance. Metrics explorer already shows Success E2E Latency for the storage account because platform metrics are automatic. To see which operations were slow and who made them, the administrator adds a diagnostic setting sending blob read, write and delete logs to the operations Log Analytics workspace, and a second copy to an archive storage account with a long retention rule for auditors.",
  "tip": "Metrics and the activity log are collected automatically; resource logs require a diagnostic setting. Choose the destination by purpose: a workspace to query and alert, a storage account to archive cheaply, an event hub to stream to external tools.",
  "check": [
   [
    "You need to query who read secrets in a key vault. What must be configured?",
    "A diagnostic setting on the key vault that sends its audit resource logs to a Log Analytics workspace."
   ],
   [
    "Which destination should you use to forward Azure resource logs to a third-party SIEM in near real time?",
    "An event hub, which streams the data to external systems."
   ],
   [
    "What is the difference between the activity log and resource logs?",
    "The activity log records management operations on resources (who created or deleted what); resource logs record operations inside a resource and need a diagnostic setting."
   ],
   [
    "How can you make sure every new storage account automatically sends logs to a workspace?",
    "Assign an Azure Policy definition with the DeployIfNotExists effect that creates the diagnostic setting."
   ]
  ]
 },
 {
  "t": "Querying logs with basic KQL (where, summarize, project, render)",
  "body": [
   "Kusto Query Language (KQL) is the read-only query language used by Log Analytics, Azure Monitor log search alerts, Microsoft Sentinel and Azure Resource Graph. You open it in a workspace's Logs blade or a resource's Logs blade. A query starts with a table name and passes the data through a pipeline of operators separated by the pipe character `|`, each one transforming the result of the previous step. If you know a handful of operators, you can answer most exam questions and handle everyday troubleshooting without memorizing the whole language.",
   "`where` filters rows. `project` chooses and renames columns, and `project-away` drops them. `extend` adds calculated columns. `sort by` (or `order by`) orders results, and `take` or `limit` returns a sample of rows. `top 10 by` combines sorting and limiting. Time is always important: most tables have a `TimeGenerated` column, and `ago()` expresses relative time, so `where TimeGenerated > ago(1h)` keeps the last hour. Comparison operators include `==`, `!=`, `>`, `contains`, `has`, `startswith` and `in`. String comparisons with `==` are case sensitive; `=~` is case insensitive. `has` matches whole terms and is faster than `contains`, which matches any substring.",
   "`summarize` aggregates rows into groups, much like GROUP BY in SQL. Aggregation functions include `count()`, `avg()`, `max()`, `min()`, `sum()` and `dcount()` (distinct count), followed by `by` and the grouping columns. To build time series, group by `bin(TimeGenerated, 5m)`, which rounds timestamps into five-minute buckets. `render` turns the result into a chart, such as `timechart`, `barchart`, `piechart` or `columnchart`. Three typical queries show the pattern:",
   "```kusto\n// Computers that have not sent a heartbeat in 15 minutes\nHeartbeat\n| summarize LastSeen = max(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n\n// Average CPU per computer in 5-minute bins over the last day, as a chart\nPerf\n| where TimeGenerated > ago(1d)\n| where ObjectName == \"Processor\" and CounterName == \"% Processor Time\"\n| summarize AvgCPU = avg(CounterValue) by bin(TimeGenerated, 5m), Computer\n| render timechart\n\n// Who deleted resources in the last week\nAzureActivity\n| where TimeGenerated > ago(7d) and OperationNameValue endswith \"DELETE\"\n| project TimeGenerated, Caller, ResourceGroup, OperationNameValue\n| sort by TimeGenerated desc\n```",
   "Read each query from top to bottom. In the first, all heartbeat records are reduced to one row per computer with its latest time, then filtered to those older than 15 minutes: a classic 'which agents stopped reporting' query that can back a log search alert. The order of operators matters: filtering with `where` early makes queries faster and cheaper, and a `project` or `summarize` that removes a column prevents later operators from using it. Common tables you will meet: `Heartbeat` (agent check-ins), `Perf` (performance counters), `Event` (Windows event logs), `Syslog` (Linux), `AzureActivity` (activity log), `AzureDiagnostics` and resource-specific tables such as `StorageBlobLogs` (resource logs), and `InsightsMetrics` (VM insights).",
   "Consider a worked example. Your manager asks how many failed Windows sign-ins each server had in the last 24 hours, most first. Event ID 4625 is a failed logon in the Security log, collected into the `SecurityEvent` table. You write `SecurityEvent | where TimeGenerated > ago(24h) and EventID == 4625 | summarize Failures = count() by Computer | sort by Failures desc`. To show the trend, you change the last lines to `summarize Failures = count() by bin(TimeGenerated, 1h) | render timechart`. The spike at 03:00 leads you to a server with RDP exposed, which you move behind Bastion.",
   "Common mistakes: putting `where` after `summarize` and then filtering on a column that no longer exists; forgetting a time filter so the query scans far more data than needed; using `==` for a string whose case varies; expecting `project` to aggregate; confusing `count()` (rows) with `dcount()` (distinct values); and forgetting that `bin()` is needed to make a time series for `render timechart`. Also remember KQL is read-only: it cannot delete or change log data.",
   "In exam questions, look for which operator produces the requested shape. Filtering rows is `where`; counting or averaging per group is `summarize ... by`; choosing or renaming columns is `project`; adding a calculated column is `extend`; a chart is `render`; the most recent hour is `ago(1h)`; hourly buckets are `bin(TimeGenerated, 1h)`. If a question shows a query with a blank and asks which operator returns one row per computer, the answer is `summarize`."
  ],
  "terms": [
   [
    "KQL",
    "Kusto Query Language, the read-only pipeline query language used by Log Analytics and related services."
   ],
   [
    "where",
    "The KQL operator that filters rows by a condition."
   ],
   [
    "summarize",
    "The KQL operator that aggregates rows into groups with functions such as count() and avg()."
   ],
   [
    "project",
    "The KQL operator that selects, renames or orders output columns."
   ],
   [
    "render",
    "The KQL operator that displays results as a chart such as a timechart or barchart."
   ],
   [
    "bin()",
    "A KQL function that rounds values, typically timestamps, into fixed-size buckets for time series."
   ],
   [
    "ago()",
    "A KQL function that returns a time relative to now, such as ago(1d) for one day ago."
   ]
  ],
  "example": "An operations engineer needs a daily chart of storage errors. She queries StorageBlobLogs, filters with where StatusCode >= 400 and TimeGenerated > ago(7d), summarizes count() by bin(TimeGenerated, 1h) and StatusText, and ends with render timechart. The chart shows a burst of authorization failures after a key rotation, and she pins it to a shared dashboard so the team can watch it return to normal.",
  "tip": "Map the question to the operator: filter rows = where, aggregate per group = summarize ... by, pick columns = project, add a column = extend, chart = render. Time filters use ago(), and time series use bin().",
  "check": [
   [
    "Which operator returns one row per computer with the average CPU?",
    "summarize, for example summarize avg(CounterValue) by Computer."
   ],
   [
    "How do you limit a query to the last 30 minutes?",
    "Filter with where TimeGenerated > ago(30m)."
   ],
   [
    "What does bin(TimeGenerated, 5m) do?",
    "It rounds each timestamp down into five-minute buckets so results can be grouped into a time series."
   ],
   [
    "Which operator keeps only the TimeGenerated, Computer and EventID columns?",
    "project TimeGenerated, Computer, EventID."
   ]
  ]
 },
 {
  "t": "Alert rules (metric, log search, activity log), action groups and alert processing rules",
  "body": [
   "Alerts in Azure Monitor tell you when something needs attention and can start automatic responses. An alert rule has three parts: the scope (which resources it watches), the condition (what triggers it) and the actions (what happens when it fires, through action groups). Each rule also has a severity from 0 (critical) to 4 (verbose) and a name and description that appear in notifications. Choosing the right rule type for a scenario is one of the most tested monitoring skills.",
   "Metric alert rules evaluate a platform or custom metric at a regular frequency over a look-back window, for example 'average Percentage CPU greater than 85 over the last 5 minutes, checked every minute'. Thresholds can be static or dynamic, where machine learning learns the metric's normal pattern and alerts on deviations. One metric alert rule can monitor many resources of the same type in a region, such as all virtual machines (VMs) in a subscription. Metric alerts are stateful: they fire once, then resolve automatically when the condition clears. They are fast and cheap, so they are the first choice for performance thresholds.",
   "Log search alert rules run a KQL (Kusto Query Language) query against a Log Analytics workspace or Application Insights on a schedule, for example every 5 minutes over the last 15 minutes, and fire when the result meets a condition, such as the number of rows being greater than zero or an aggregated value crossing a threshold. They suit conditions only visible in logs: a particular Windows event, a missing heartbeat, or a pattern across several resources. They have more delay and cost more than metric alerts. Activity log alert rules fire on events in the subscription's activity log: administrative operations (for example, 'someone deleted a virtual network' or 'a role assignment was created'), service health events (Azure incidents and planned maintenance affecting your regions and services) and resource health events (a specific VM became unavailable). They are how you are told about changes and platform issues rather than performance.",
   "An action group is a reusable list of notifications and actions, shared by many alert rules. Notifications include email, SMS, Azure mobile app push, voice calls, and email to Azure Resource Manager roles such as Owner. Actions include Azure Automation runbooks, Azure Functions, Logic Apps, webhooks, event hubs and IT service management (ITSM) connectors. Create action groups per team or response, such as `ag-ops-oncall`, and attach them to rules: `az monitor action-group create --resource-group rg-mon --name ag-ops-oncall --short-name opsoncall --action email ops ops@contoso.com`.",
   "Alert processing rules modify fired alerts without editing the alert rules. You scope a processing rule to a subscription, resource group or resource with optional filters (severity, alert rule, monitor service) and choose either to suppress action groups, for example during a planned maintenance window on a schedule, or to add action groups to all matching alerts, for example sending every Sev0 alert in production to the on-call team. Suppression stops notifications, but the alerts still fire and are recorded, so you keep the history. In the portal, Monitor > Alerts shows fired alerts; you can change their user response to Acknowledged or Closed as you work on them.",
   "Consider a worked example. An operations team wants: a page when any production VM's CPU stays above 90 percent; an email when anyone deletes a resource in the production subscription; a ticket when the Security log shows more than 20 failed sign-ins in 10 minutes; and no notifications during Saturday night patching. They create one metric alert rule scoped to all VMs in the production resource group, an activity log alert on the Delete operation, and a log search alert on `SecurityEvent` counting Event ID 4625. All three use action group `ag-ops-oncall`. A scheduled alert processing rule suppresses action groups every Saturday from 22:00 to 02:00, so alerts are still recorded but nobody is woken.",
   "Common mistakes: using a log search alert for a simple CPU threshold that a metric alert handles faster; expecting a metric alert to catch 'someone deleted a VM'; disabling alert rules for maintenance and forgetting to re-enable them instead of using an alert processing rule; recreating the same email list in every rule instead of sharing an action group; and assuming suppressed alerts are not recorded.",
   "In exam questions, 'CPU above a threshold' means a metric alert; 'KQL', 'event ID' or 'custom query' means a log search alert; 'deleted', 'role assignment created', 'service health' or 'resource health' means an activity log alert; 'send SMS and run a runbook' means an action group; 'silence during maintenance' or 'route all Sev0 alerts' means an alert processing rule."
  ],
  "terms": [
   [
    "Alert rule",
    "A definition of scope, condition and actions that fires an alert when the condition is met."
   ],
   [
    "Metric alert",
    "An alert rule that evaluates a metric against a static or dynamic threshold at regular intervals."
   ],
   [
    "Log search alert",
    "An alert rule that runs a KQL query on a schedule and fires based on the results."
   ],
   [
    "Activity log alert",
    "An alert rule that fires on administrative, service health or resource health events in the activity log."
   ],
   [
    "Action group",
    "A reusable set of notifications and automated actions that alert rules call when they fire."
   ],
   [
    "Alert processing rule",
    "A rule that suppresses or adds action groups for fired alerts matching a scope and filters, optionally on a schedule."
   ],
   [
    "Dynamic threshold",
    "A metric alert option that uses machine learning to learn normal behaviour and alert on deviations."
   ]
  ],
  "example": "A company wants to know immediately if anyone deletes a resource lock or a virtual network in production. The administrator creates activity log alert rules for those Delete operations scoped to the production subscription, attaches an action group that emails the cloud team and posts to their chat channel through a webhook, and adds a second action that runs an Automation runbook to record the caller's details in the change management system.",
  "tip": "Performance thresholds mean a metric alert; a KQL condition means a log search alert; 'someone deleted', service health or resource health means an activity log alert. To silence notifications during maintenance without disabling rules, use an alert processing rule.",
  "check": [
   [
    "Which alert type should notify you when someone creates a role assignment?",
    "An activity log alert on the administrative operation for creating role assignments."
   ],
   [
    "How do you stop alert notifications during a weekly maintenance window without editing alert rules?",
    "Create a scheduled alert processing rule that suppresses action groups for the affected scope during the window."
   ],
   [
    "What is an action group used for?",
    "It holds reusable notifications (email, SMS, push, voice) and actions (runbooks, functions, Logic Apps, webhooks) that alert rules trigger."
   ],
   [
    "An alert must fire when a specific Windows event ID appears. Which rule type do you use?",
    "A log search alert that runs a KQL query against the Event or SecurityEvent table in a Log Analytics workspace."
   ]
  ]
 },
 {
  "t": "Azure Monitor insights: VM insights, storage and network insights, Azure Monitor Agent and data collection rules",
  "body": [
   "Insights are curated monitoring experiences in Azure Monitor for a particular kind of resource. They combine metrics, logs and workbooks into ready-made views, so you do not have to design charts and queries yourself. You find them under Monitor > Insights, and many also appear on the resource's own Insights blade. For the exam you need to know what VM insights, storage insights and network insights show, and how guest data reaches Azure Monitor through the Azure Monitor Agent and data collection rules.",
   "VM insights monitors the performance and health of virtual machines (VMs) and scale sets, both Azure VMs and servers connected through Azure Arc. The Performance view shows charts of CPU, memory, disk and network across all monitored machines, and helps find the busiest or most constrained ones. The Map view, which also needs the Dependency agent, shows processes on each VM and their network connections to other machines and services, useful for discovering dependencies before a migration. VM insights stores its data in a Log Analytics workspace, mostly in the `InsightsMetrics` table, and you enable it from the VM's Insights blade, which installs the agent and creates a data collection rule for you.",
   "Storage insights gives a unified view of capacity, transactions, availability and latency across your storage accounts, drawn from platform metrics, so it works without extra setup. It quickly spots an account with rising errors or unexpected growth. Network insights shows the health and metrics of network resources, such as load balancers, gateways and public IPs, with a topology view, and it links to Network Watcher tools such as Connection Monitor.",
   "Guest-level data from inside a VM, such as Windows event logs, Linux syslog and OS performance counters, is collected by the Azure Monitor Agent (AMA). AMA is installed as a VM extension (and on Arc-enabled servers), authenticates with a managed identity, and replaced the older Log Analytics agent, which has been retired. Unlike the old agent, AMA does not decide on its own what to collect or where to send it; that is defined in data collection rules.",
   "A data collection rule (DCR) is an Azure resource that describes what data to collect, how to transform it, and where to send it. For VMs, a DCR might collect the '% Processor Time' and 'Available MBytes' counters every 60 seconds plus Warning and Error events from the System and Application logs, and send them to a Log Analytics workspace (performance counters can also go to Azure Monitor Metrics). You associate the DCR with VMs through data collection rule associations. One VM can have several DCRs, and one DCR can apply to many VMs, so you might have a baseline DCR for all servers and an extra DCR for SQL servers. Transformations written in KQL (Kusto Query Language) can filter or modify data before it is stored, which reduces ingestion cost. To deploy at scale, use Azure Policy initiatives that install AMA and associate DCRs automatically on every new VM. If data is missing, check the three links in the chain: the agent extension is installed and healthy, the VM is associated with the DCR, and the DCR's destination workspace is correct. A quick KQL check is `Heartbeat | where Computer == \"vm-sql01\" | take 5`; heartbeats prove the agent is talking to the workspace.",
   "Consider a worked example. A team migrating twenty servers wants to know which ones talk to each other, plus Windows System errors from all of them. They enable VM insights with the Map option, which installs AMA and the Dependency agent and creates a DCR; the Map view reveals that an old reporting server still connects to the database, so it joins the migration wave. They then create a second DCR collecting Error events from the System log, associate it with all twenty servers through a policy assignment, and add a KQL transformation that drops a noisy informational event ID to keep costs down.",
   "Common mistakes: installing AMA and expecting data without associating a DCR; expecting the Map view without the Dependency agent; assuming storage insights needs an agent; confusing platform metrics (host-level, automatic) with guest counters such as memory usage (need AMA and a DCR); and still planning around the retired Log Analytics agent.",
   "In exam questions, 'collect Windows event logs or syslog from VMs' means AMA plus a DCR; 'see dependencies between servers' means VM insights Map with the Dependency agent; 'one view of all storage accounts' means storage insights; 'filter data before ingestion' means a DCR transformation; 'apply to all new VMs automatically' means Azure Policy."
  ],
  "terms": [
   [
    "Insights",
    "Curated Azure Monitor experiences that combine metrics, logs and workbooks for a resource type."
   ],
   [
    "VM insights",
    "An insight showing VM performance charts and, with the Dependency agent, a map of processes and connections."
   ],
   [
    "Azure Monitor Agent (AMA)",
    "The current agent that collects guest OS logs and performance data from VMs and Arc-enabled servers."
   ],
   [
    "Data collection rule (DCR)",
    "An Azure resource defining what data to collect, how to transform it and where to send it."
   ],
   [
    "Data collection rule association",
    "The link between a DCR and a VM or other resource that makes the agent apply that rule."
   ],
   [
    "Dependency agent",
    "An agent required for the VM insights Map view to discover processes and network connections."
   ],
   [
    "Transformation",
    "A KQL statement in a DCR that filters or modifies incoming data before it is stored."
   ]
  ],
  "example": "A hosting company notices memory pressure complaints but Metrics explorer shows no memory metric for its VMs, because memory usage is a guest OS counter. The administrator creates a data collection rule that gathers Available MBytes and % Committed Bytes In Use every minute, associates it with all web servers through an Azure Policy assignment, and uses VM insights Performance to find three servers constantly near their memory limit.",
  "tip": "The Azure Monitor Agent collects nothing until a data collection rule is associated with the machine. The VM insights Map view needs the Dependency agent, and storage insights uses platform metrics with no agent at all.",
  "check": [
   [
    "You installed the Azure Monitor Agent on a VM but no events arrive in the workspace. What is most likely missing?",
    "A data collection rule associated with the VM that defines the events and the destination workspace."
   ],
   [
    "Which extra component does the VM insights Map view require?",
    "The Dependency agent, in addition to the Azure Monitor Agent."
   ],
   [
    "Can one data collection rule apply to many VMs?",
    "Yes. A DCR can be associated with many machines, and one machine can have several DCRs."
   ],
   [
    "How can you reduce ingestion cost by dropping unneeded events before they are stored?",
    "Add a KQL transformation to the data collection rule that filters out those events."
   ]
  ]
 },
 {
  "t": "Network Watcher and Connection Monitor",
  "body": [
   "Azure Network Watcher is the regional service that provides monitoring, diagnostic and logging tools for resources in Azure virtual networks, such as virtual machines (VMs), VPN gateways and application gateways. It is enabled automatically in each region when you create or update a virtual network there, and appears in the portal as a resource called `NetworkWatcher_<region>` in a resource group named `NetworkWatcherRG`. It monitors the network path and configuration, not the application running on your VMs.",
   "Its tools fall into three groups. Monitoring: Topology, which draws the resources in a network and how they connect, and Connection Monitor, for continuous checks. Network diagnostic tools, used for one-off investigations: IP flow verify, NSG (network security group) diagnostics, next hop, effective security rules, connection troubleshoot, packet capture (captures traffic to and from a VM into a file for analysis) and VPN troubleshoot (diagnoses a VPN gateway or connection). Traffic: flow logs, which record the IP traffic flowing through NSGs or virtual networks, and traffic analytics, which processes flow logs in a Log Analytics workspace to show traffic patterns, top talkers and unusual flows. Virtual network flow logs are the successor to the older NSG flow logs, which are being retired.",
   "Connection Monitor provides continuous, end-to-end monitoring of connectivity between endpoints. Where connection troubleshoot answers 'can I connect right now?', Connection Monitor answers 'has this connection been healthy all week, and how fast was it?'. It is the tool for tracking latency and packet loss between an application's tiers, between Azure and on-premises, or from Azure to an external endpoint such as a partner API.",
   "You build a connection monitor from test groups. Each test group has sources, such as Azure VMs or scale sets with the Network Watcher agent extension, or on-premises and Arc-enabled machines with the Azure Monitor Agent; destinations, such as Azure VMs, IP addresses, URLs or fully qualified domain names (FQDNs); and test configurations. A test configuration sets the protocol (TCP, HTTP or ICMP), port, test frequency and success thresholds, for example 'checks failed below 5 percent and round-trip time below 100 milliseconds'. Connection Monitor runs the tests continuously and stores results in a Log Analytics workspace.",
   "Results appear in the Connection Monitor dashboard, with the state of each source and destination pair, charts of round-trip time and checks failed, and a hop-by-hop topology showing where along the path a problem occurs, such as a drop at a firewall or high latency at an internet provider hop. Connection Monitor emits metrics, so you can create metric alert rules on them, for example alerting when ChecksFailedPercent exceeds a threshold, and route the alerts through action groups.",
   "Consider a worked example. An online shop in Azure calls a partner's payment API and a database on-premises over a site-to-site VPN. Customers occasionally report slow checkouts in the evening. The network team creates a connection monitor with two test groups: the web VMs to the partner API URL on HTTPS 443, and the web VMs to the on-premises database IP on TCP 1433, each tested every 30 seconds with a threshold of 150 milliseconds round-trip time. They add a metric alert on checks failed. Two days later the dashboard shows latency to the database climbing every evening at a hop inside the VPN path; running VPN troubleshoot on the gateway reveals a tunnel renegotiating repeatedly, which the provider fixes.",
   "Common mistakes: using connection troubleshoot when the question asks for ongoing monitoring with history; forgetting the Network Watcher agent extension on Azure VM sources; expecting Connection Monitor to explain which NSG rule blocked traffic (that is IP flow verify); deleting the `NetworkWatcherRG` resource group and then wondering why tools stop working in a region; and expecting flow logs to show packet contents, when they record flow metadata such as addresses, ports and allow or deny decisions.",
   "Exam questions map needs to tools. One-time 'why can't this VM connect?' points to IP flow verify, next hop or connection troubleshoot. 'Continuously monitor latency and packet loss' or 'alert when connectivity to an endpoint degrades' points to Connection Monitor. 'Analyze who talked to whom' or 'identify top talkers' points to flow logs with traffic analytics. 'Site-to-site tunnel is down' points to VPN troubleshoot. 'Capture traffic for Wireshark analysis' points to packet capture, and 'visualize resources and connections' points to Topology."
  ],
  "terms": [
   [
    "Network Watcher",
    "A regional service offering monitoring, diagnostic and traffic logging tools for Azure networks."
   ],
   [
    "Connection Monitor",
    "A Network Watcher feature that continuously tests connectivity, latency and packet loss between endpoints."
   ],
   [
    "Test group",
    "A Connection Monitor unit combining sources, destinations and test configurations."
   ],
   [
    "Test configuration",
    "The protocol, port, frequency and success thresholds used for Connection Monitor checks."
   ],
   [
    "Flow logs",
    "Records of IP traffic flows through NSGs or virtual networks, stored in a storage account."
   ],
   [
    "Traffic analytics",
    "A feature that processes flow logs in Log Analytics to show traffic patterns and top talkers."
   ],
   [
    "VPN troubleshoot",
    "A diagnostic tool that checks the health of a VPN gateway or connection and reports issues."
   ]
  ],
  "example": "A bank must prove that its Azure web tier can reach an on-premises fraud-checking service within 50 milliseconds at all times. The network team sets up Connection Monitor with a test group from the web VMs to the service's IP on TCP 8443, a threshold of 50 milliseconds, and a metric alert that pages the network on-call engineer through an action group whenever the threshold is breached for five minutes.",
  "tip": "Connection Monitor is for continuous monitoring with history and alerts; connection troubleshoot is a one-off test. Azure VM sources need the Network Watcher agent extension, and results are stored in a Log Analytics workspace.",
  "check": [
   [
    "Which tool continuously measures latency and packet loss from Azure VMs to an on-premises server and keeps history?",
    "Connection Monitor in Network Watcher."
   ],
   [
    "What must be installed on an Azure VM used as a Connection Monitor source?",
    "The Network Watcher agent VM extension."
   ],
   [
    "Which Network Watcher feature helps identify the top talkers across a network over the past week?",
    "Flow logs analyzed with traffic analytics in a Log Analytics workspace."
   ],
   [
    "A site-to-site VPN connection keeps dropping. Which Network Watcher tool diagnoses it?",
    "VPN troubleshoot, which checks the gateway and connection health and returns detailed logs."
   ]
  ]
 },
 {
  "t": "Recovery Services vault vs Backup vault and what each protects",
  "body": [
   "Azure Backup protects data by taking backups on a schedule and storing them in a vault, a storage entity managed by Azure that holds recovery points and backup policies. You never manage the underlying storage accounts yourself. Azure has two kinds of vault, and each supports a different set of workloads. Picking the right vault for a data source is a classic exam question, because you cannot, for example, back up an Azure virtual machine (VM) into a Backup vault, or managed disks as standalone items into a Recovery Services vault.",
   "A Recovery Services vault is the original vault type. It protects: Azure VMs (Windows and Linux, the whole VM including all its disks); SQL Server and SAP HANA databases running inside Azure VMs; Azure Files shares; on-premises files, folders and system state through the MARS (Microsoft Azure Recovery Services) agent; and on-premises workloads through Microsoft Azure Backup Server (MABS) or System Center Data Protection Manager (DPM). A Recovery Services vault is also where Azure Site Recovery replication is configured, so the same vault type serves both backup and disaster recovery.",
   "A Backup vault is the newer vault type, used by newer data sources. It protects Azure managed disks (Azure Disk Backup, using incremental snapshots), Azure Blobs (operational and vaulted backup), Azure Database for PostgreSQL and Azure Kubernetes Service (AKS) clusters, among others. If a question asks where to back up individual managed disks on a frequent schedule, or blob data against accidental deletion, the answer is a Backup vault. Creating each type from the command line shows the difference in resource providers:",
   "```bash\naz backup vault create --resource-group rg-bcdr --name rsv-prod-weu --location westeurope\naz dataprotection backup-vault create --resource-group rg-bcdr --vault-name bv-prod-weu \\\n  --location westeurope --type SystemAssigned \\\n  --storage-settings \"[{type:'LocallyRedundant',datastore-type:'VaultStore'}]\"\n```",
   "Some rules apply to both. The vault should be in the same region as the resources it protects, and for Azure VM backup it must be. You choose the vault's backup storage redundancy (locally redundant, zone-redundant or geo-redundant) and should set it before protecting the first item, because it cannot be changed after items are protected. Geo-redundant storage is needed if you want cross-region restore. Both vault types support soft delete, immutability and role-based access control (RBAC) roles such as Backup Contributor, Backup Operator and Backup Reader. You manage everything from one place: the Business Continuity Center in the portal (the successor to Backup center) gives a single view of protected items, jobs, policies and vaults across both vault types, subscriptions and regions. You can also configure backup directly from a resource, for example on a VM's Backup blade, where you pick or create a vault and a policy.",
   "Consider a worked example. A company in West Europe needs to protect: twenty Azure VMs, a SQL Server database running on one of them, an Azure file share, a laptop fleet's Documents folders, a set of managed disks used by a scale set, and a storage account holding contracts. The administrator creates a Recovery Services vault in West Europe for the VMs, the SQL database (as a SQL in Azure VM workload), the file share and the MARS agent backups. She creates a Backup vault in West Europe for the managed disks and blob backup. Both vaults are set to geo-redundant storage before the first item is protected, because the auditors require cross-region restore.",
   "Common mistakes: choosing a Backup vault for Azure VMs; creating the vault in a different region from the VMs and then finding the VMs do not appear; trying to change storage redundancy after items are protected; confusing Azure Site Recovery (replication for disaster recovery) with Azure Backup (point-in-time copies), even though both use a Recovery Services vault; and assuming a new data source uses the older vault type without checking.",
   "Exam wording gives the answer away. 'Azure VM', 'SQL Server in an Azure VM', 'Azure Files', 'MARS agent', 'on-premises files and folders' or 'Site Recovery' means a Recovery Services vault. 'Managed disks', 'blobs', 'Azure Database for PostgreSQL' or 'AKS' means a Backup vault. 'Vault in another region cannot see the VM' means the vault must be in the VM's region. 'Must restore in the paired region' means geo-redundant storage set before protection. A simple memory aid: Recovery Services vault for servers and what runs in them; Backup vault for newer PaaS and storage data sources."
  ],
  "terms": [
   [
    "Azure Backup",
    "The Azure service that takes scheduled, policy-driven backups and stores recovery points in a vault."
   ],
   [
    "Recovery Services vault",
    "The vault type for Azure VMs, SQL and SAP HANA in VMs, Azure Files, MARS, MABS and Azure Site Recovery."
   ],
   [
    "Backup vault",
    "The newer vault type for data sources such as managed disks, blobs, Azure Database for PostgreSQL and AKS."
   ],
   [
    "MARS agent",
    "The Microsoft Azure Recovery Services agent that backs up files, folders and system state from Windows machines."
   ],
   [
    "Backup storage redundancy",
    "The vault's LRS, ZRS or GRS setting, which must be chosen before the first item is protected."
   ],
   [
    "Business Continuity Center",
    "The portal hub that manages backup and disaster recovery across vault types, subscriptions and regions."
   ]
  ],
  "example": "A hospital's cloud team is asked to protect a new AKS cluster and the managed disks of its imaging servers with frequent backups, alongside its existing VM backups. They discover the Recovery Services vault they already use cannot hold these data sources, so they create a Backup vault in the same region with the right storage redundancy, configure AKS backup and Azure Disk Backup there, and view both vaults together in the Business Continuity Center.",
  "tip": "Azure VMs, Azure Files, SQL in VMs, MARS and Site Recovery use a Recovery Services vault. Managed disks, blobs, PostgreSQL and AKS use a Backup vault. Set storage redundancy before the first item is protected.",
  "check": [
   [
    "Which vault type do you need to back up an Azure VM running SQL Server, including the database itself?",
    "A Recovery Services vault, which supports both Azure VM backup and SQL Server in Azure VM backup."
   ],
   [
    "Where do you configure Azure Disk Backup for individual managed disks?",
    "In a Backup vault."
   ],
   [
    "Why might a VM not appear when you try to add it to a Recovery Services vault?",
    "The vault is in a different region; for Azure VM backup, the vault must be in the same region as the VM."
   ],
   [
    "When should you set a vault's storage redundancy to geo-redundant?",
    "Before protecting any items, because it cannot be changed after items are protected, and it is required for cross-region restore."
   ]
  ]
 },
 {
  "t": "Backup policies (standard and enhanced), on-demand backup, soft delete and cross-region restore",
  "body": [
   "A backup policy defines when backups run and how long recovery points are kept. You attach one policy to many protected items, so changing the policy updates them all. The default policy for Azure virtual machines (VMs) takes one backup a day and keeps it for 30 days, but you will normally create your own to match business requirements such as a recovery point objective (RPO, the maximum acceptable data loss measured in time) and compliance retention periods.",
   "For Azure VMs there are two policy types. The standard policy allows one scheduled backup per day (or per week) at a set time, with retention rules for daily, weekly, monthly and yearly recovery points, for example keep dailies for 30 days, Sunday weeklies for 12 weeks and first-of-month monthlies for 12 months. The enhanced policy allows multiple backups per day, such as every 4 hours, for workloads needing a lower RPO, and Microsoft requires it for some newer VM configurations, such as Trusted Launch VMs and VMs with Premium SSD v2 or Ultra disks. Both policies keep recent recovery points as snapshots for a configurable period (instant restore), so restores from recent points are fast, while older points come from the vault.",
   "An on-demand backup (Backup now) takes an extra backup outside the schedule, for example before an operating system upgrade. You specify how long to keep it with a retain-until date, separately from the policy's retention rules. The first backup of a newly protected VM is often run on demand so you have protection straight away instead of waiting for the scheduled time:",
   "```bash\naz backup protection enable-for-vm --resource-group rg-bcdr --vault-name rsv-prod-weu \\\n  --vm vm-app1 --policy-name DailyPolicy-30d\naz backup protection backup-now --resource-group rg-bcdr --vault-name rsv-prod-weu \\\n  --container-name vm-app1 --item-name vm-app1 --backup-management-type AzureIaasVM \\\n  --retain-until 31-12-2026\n```",
   "Soft delete protects backups from accidental or malicious deletion. When backup data is deleted, for example by stopping protection and choosing to delete data, it is kept in a soft-deleted state for 14 days by default at no charge, and can be undeleted and protection resumed. Enhanced soft delete lets you choose a longer retention period and make soft delete always-on so it cannot be turned off, which defends against attackers who compromise an administrator account. Related protections include immutable vaults, which block operations that could lose recovery points, and multi-user authorization (MUA) with Resource Guard, which requires a second person's approval for critical operations such as disabling soft delete. Cross-region restore (CRR) lets you restore Azure VMs, and some other data sources, in the Azure paired secondary region using backup data replicated there. It needs a vault with geo-redundant storage (GRS) and the cross-region restore setting enabled. You can use it at any time, for a real regional outage or a drill, and the replicated recovery points lag slightly behind the primary.",
   "Consider a worked example. An accounting firm's billing VM needs backups every four hours during the working day, three months of daily points, and seven years of month-end points; ransomware is its top concern; and it must survive a regional outage. The administrator creates an enhanced policy with a 4-hour schedule, daily retention of 90 days and monthly retention of 84 months. The vault uses GRS with cross-region restore enabled, enhanced soft delete set to always-on, and Resource Guard so that a second person must approve any attempt to reduce protection. Before a major application update, she runs Backup now with a retain-until date two weeks away.",
   "Common mistakes: expecting a standard policy to run more than once a day; assuming an on-demand backup follows the policy's retention; forgetting that CRR requires GRS set before protection plus the CRR setting; believing deleted backups are gone immediately, when soft delete keeps them 14 days by default; and turning off soft delete to clean up a lab and forgetting to turn it back on.",
   "Exam wording is direct. 'Back up every four hours', 'Trusted Launch VM' or 'Ultra disks' means the enhanced policy. 'Extra backup before a change' means an on-demand backup with its own retention. 'Recover backups deleted by mistake' means soft delete, and 'prevent an attacker from disabling soft delete' means always-on enhanced soft delete, immutability or multi-user authorization. 'Restore in the secondary region without waiting for Microsoft' means cross-region restore on a GRS vault."
  ],
  "terms": [
   [
    "Backup policy",
    "A reusable schedule and retention definition applied to many protected items."
   ],
   [
    "Enhanced policy",
    "An Azure VM backup policy supporting multiple backups per day and required for some newer VM types."
   ],
   [
    "On-demand backup",
    "A manual backup taken outside the schedule with its own retain-until date."
   ],
   [
    "Instant restore",
    "Keeping recent recovery points as snapshots so they can be restored quickly."
   ],
   [
    "Soft delete",
    "Retaining deleted backup data for a period, 14 days by default, so it can be recovered."
   ],
   [
    "Cross-region restore (CRR)",
    "Restoring from backup data replicated to the paired region, requiring GRS and the CRR setting."
   ],
   [
    "Multi-user authorization (MUA)",
    "A protection using Resource Guard that requires a second authorized person for critical backup operations."
   ]
  ],
  "example": "An attacker who compromised an administrator account stops protection on several VMs and deletes their backup data. Because the vault had enhanced soft delete set to always-on with a 30-day retention, the recovery points are still present in a soft-deleted state. The security team undeletes them, resumes protection and restores the VMs to a point before the intrusion, then enables multi-user authorization so a single account can never do this again.",
  "tip": "More than one backup a day, Trusted Launch VMs or Premium SSD v2 and Ultra disks point to the enhanced policy. Cross-region restore requires GRS plus the CRR setting, and soft-deleted backups are kept for 14 days by default.",
  "check": [
   [
    "A VM needs a backup every 4 hours. Which policy type is required?",
    "The enhanced policy, because the standard policy allows only one scheduled backup per day."
   ],
   [
    "How long is soft-deleted backup data kept by default?",
    "14 days, during which it can be undeleted and protection resumed."
   ],
   [
    "What two things are needed to restore an Azure VM in the paired region?",
    "A vault with geo-redundant storage and the cross-region restore setting enabled."
   ],
   [
    "How is retention set for an on-demand backup?",
    "With a retain-until date chosen when you start the backup, separate from the policy's retention rules."
   ]
  ]
 },
 {
  "t": "Restoring VMs, disks and individual files",
  "body": [
   "A backup is only as good as your ability to restore it. Azure Backup offers several restore types for Azure virtual machines (VMs), and each fits a different situation. You start a restore from the vault's backup item or the VM's Backup blade, choose a recovery point (crash-consistent, file-system consistent or application-consistent, with the most recent ones often available as instant restore snapshots, which are fastest) and then choose a restore type. Knowing which restore type matches a scenario is exactly what the exam tests.",
   "Create new virtual machine builds a new VM from the recovery point in a virtual network and subnet you choose, with a new name. It is the quickest way to get a working machine back with basic settings, but it offers limited customization. Restore disks creates managed disks from the recovery point in a target resource group, using a staging storage account, and also produces a template you can customize to create the VM. Use it when you need settings the quick restore cannot handle, such as a specific size, availability set or extensions, or when you only want the disks, for example to attach one to another VM and copy data off it.",
   "Replace existing restores the disks over those of the existing VM, keeping the VM's configuration such as its name, network interface and IP settings. The VM must still exist, and Azure takes a snapshot of the current disks before replacing them so you can go back. This is the natural choice when a VM is intact but its data is corrupted, for example after a failed update. Cross-region restore performs the same operations in the paired secondary region, for vaults configured with geo-redundant storage and cross-region restore. Restoring a VM to a point in time before a ransomware infection is also why soft delete and immutability matter.",
   "Often you do not need the whole VM, just a few files. File Recovery lets you mount a recovery point as local drives: select File Recovery, pick the recovery point, and download a script (an executable for Windows, a Python script for Linux). Running it on a machine, the original VM or another one with a compatible operating system, connects the recovery point's disks as volumes over iSCSI (Internet Small Computer Systems Interface). You browse them, copy the files you need, then select Unmount disks in the portal. The connection is kept only for a limited time, and the script requires outbound access to Azure endpoints.",
   "Other data sources restore differently. Azure Disk Backup in a Backup vault restores a snapshot as a new managed disk, which you then attach to a VM; it never overwrites the original disk. Azure Files backups can restore the whole share or individual files and folders, to the original location (overwriting or skipping conflicts) or to an alternate share. SQL Server in a VM can be restored to a specific point in time using log backups, either overwriting the database or as a new database. From the command line, `az backup recoverypoint list` shows the available recovery points for an item, and `az backup job list --operation Restore` lets you follow a restore job to completion.",
   "Consider a worked example. Three different requests arrive on the same day. A user deleted a spreadsheet folder on the file server `vm-fs1` last Tuesday: you use File Recovery for Tuesday's recovery point, run the script on `vm-fs1`, copy the folder back and unmount. A patch corrupted the operating system on `vm-app2`, but its name, IP and firewall rules must stay the same: you use Replace existing with the recovery point before the patch. An auditor wants a copy of `vm-db3` as it was at month-end, in an isolated network with a larger size: you use Restore disks, then deploy the generated template with the size and network changed.",
   "Common mistakes: restoring a whole VM when only a few files are needed; choosing Create new when the VM's identity and IP must stay the same; expecting Replace existing to work after the VM was deleted; forgetting to unmount File Recovery disks; and expecting a disk restore from a Backup vault to overwrite the original disk.",
   "In exam questions, 'a few files' or 'a single folder' means File Recovery; 'VM still exists but data is bad, keep configuration' means Replace existing; 'custom settings' or 'only the disks' means Restore disks; 'fastest way to get a new working VM' means Create new; 'restore in the paired region' means cross-region restore."
  ],
  "terms": [
   [
    "Recovery point",
    "A point-in-time copy of protected data from which you can restore."
   ],
   [
    "Create new virtual machine",
    "A restore type that quickly builds a new VM from a recovery point with basic settings."
   ],
   [
    "Restore disks",
    "A restore type that creates managed disks and a customizable template instead of a finished VM."
   ],
   [
    "Replace existing",
    "A restore type that overwrites an existing VM's disks while keeping its configuration."
   ],
   [
    "File Recovery",
    "A feature that mounts a recovery point as drives through a downloaded script so individual files can be copied."
   ],
   [
    "iSCSI",
    "Internet Small Computer Systems Interface, the protocol File Recovery uses to attach recovery point disks as volumes."
   ]
  ],
  "example": "A legal assistant accidentally overwrites a contract template on a Windows file server VM. The administrator opens the VM's Backup blade, selects File Recovery, chooses the previous night's recovery point, downloads the executable script and runs it on the file server. A new drive letter appears with the old volume, she copies the template back to its folder, and then unmounts the disks from the portal. The whole task takes fifteen minutes and the VM never goes offline.",
  "tip": "A few files means the File Recovery script. VM exists but data is bad means Replace existing. Custom VM settings or only the disks means Restore disks. A quick new VM means Create new, and disk backups in a Backup vault restore as new disks.",
  "check": [
   [
    "A user needs three files from last week's backup of a VM. Which restore option should you use?",
    "File Recovery, which mounts the recovery point as drives through a script so you can copy just those files."
   ],
   [
    "A VM's data is corrupted but its name and network configuration must stay the same. Which restore type fits?",
    "Replace existing, which restores the disks over the existing VM and keeps its configuration."
   ],
   [
    "When would you choose Restore disks instead of Create new virtual machine?",
    "When you need custom settings such as a specific size or availability set, or only want the disks to attach elsewhere."
   ],
   [
    "How is a managed disk protected by Azure Disk Backup restored?",
    "As a new managed disk created from the snapshot, which you then attach to a VM; the original disk is not overwritten."
   ]
  ]
 },
 {
  "t": "Azure Site Recovery: replication to a secondary region, test failover, failover, commit and failback",
  "body": [
   "Backup protects data so you can restore it later; disaster recovery keeps whole workloads running when a region or site fails. Azure Site Recovery (ASR) continuously replicates virtual machines (VMs) to a secondary location so you can fail over to it with a recovery point objective (RPO, how much data you can lose) of minutes and a recovery time objective (RTO, how long recovery takes) that depends mostly on how fast VMs start. ASR supports Azure VMs replicating to another Azure region, and on-premises Hyper-V, VMware and physical servers replicating to Azure.",
   "To protect an Azure VM, open its Disaster recovery blade or a Recovery Services vault and enable replication. The vault must be in a different region from the source VMs, typically the target region. You choose the target region, resource group, virtual network, and the replication policy, which sets how long recovery points are retained and how often application-consistent snapshots are taken. Azure installs the Mobility service extension on the VM, uses a cache storage account in the source region to stage changes, and creates replica managed disks in the target region. Initial replication copies the full disks; after that only changes are sent. The VM shows as Protected when replication is healthy.",
   "A test failover is the safe way to prove it works. It creates VMs in the target region from a chosen recovery point, in a virtual network you choose, which should be isolated from production so the test copies do not conflict with running systems. Replication continues and production is unaffected. After checking the application, you run Cleanup test failover to delete the test VMs. Regular test failovers are how you prove your disaster recovery plan to auditors.",
   "A failover is the real thing. Planned failovers are for expected events and can avoid data loss by shutting down the source first; unplanned failovers are for outages. You choose a recovery point: Latest (lowest RPO, processes all pending data first, slower), Latest processed (fastest RTO), Latest app-consistent, or a custom point. ASR creates the VMs in the target region. Recovery plans let you fail over many VMs in order, such as databases first, then application servers, then web servers, with scripts or Azure Automation runbooks between groups.",
   "After failover, the VMs keep a list of recovery points for a while, so you can switch to a different point with Change recovery point. When you are satisfied, you Commit the failover, which finalizes it and removes the other recovery points. The VMs now run in the secondary region without protection. Re-protect reverses replication so the secondary VMs replicate back to the primary region. When the primary region is healthy, you fail over again from secondary to primary (failback), commit, and re-protect once more to restore the original direction. The cycle is: enable replication, test failover and cleanup, failover, commit, re-protect, failback, commit, re-protect.",
   "Consider a worked example. A logistics company runs a three-tier app in West Europe and must be able to run it in North Europe within an hour. The administrator creates a Recovery Services vault in North Europe, enables replication for the six VMs, and builds a recovery plan with three groups: SQL VMs, app VMs, then web VMs, plus a runbook that updates a DNS record. Each quarter she runs a test failover into an isolated virtual network, has the application team sign off, then runs Cleanup test failover. When a real regional incident occurs, she runs an unplanned failover of the recovery plan using Latest processed, confirms the app works, commits, and re-protects. Two days later she fails back during a maintenance window.",
   "Common mistakes: running a test failover into the production virtual network and causing IP or name conflicts; forgetting Cleanup test failover, so test VMs keep running and billing; failing to commit and then being surprised that recovery points are still listed; trying to fail back without re-protecting first; placing the vault in the same region as the source VMs; and treating ASR as a replacement for backup, when replicated corruption or deletion is copied to the target too.",
   "Exam questions test the order and purpose of each step. 'Validate DR without affecting production' means test failover to an isolated network. 'Finalize the failover' means Commit. 'Start replicating back to the original region' means Re-protect. 'Return to the primary region' means failback after re-protect. 'Fail over VMs in a specific order' means a recovery plan. 'Lowest data loss' means Latest, and 'fastest recovery' means Latest processed."
  ],
  "terms": [
   [
    "Azure Site Recovery (ASR)",
    "A service that continuously replicates workloads to a secondary location so they can fail over during an outage."
   ],
   [
    "RPO",
    "Recovery point objective, the maximum acceptable data loss measured in time."
   ],
   [
    "RTO",
    "Recovery time objective, the maximum acceptable time to restore service."
   ],
   [
    "Test failover",
    "A non-disruptive failover drill into an isolated network, removed afterwards with Cleanup test failover."
   ],
   [
    "Commit",
    "The step that finalizes a failover and discards the other recovery points."
   ],
   [
    "Re-protect",
    "Reversing replication after failover so the running VMs replicate back to the other region."
   ],
   [
    "Recovery plan",
    "An ordered group of VMs, with optional scripts and runbooks, that fail over together."
   ]
  ],
  "example": "A regulator requires an insurance company to demonstrate disaster recovery twice a year. The company replicates its claims system to a secondary region with Azure Site Recovery and runs a test failover of its recovery plan into an isolated virtual network. Testers confirm the application opens and data is current to within minutes, the results are documented for the regulator, and the team runs Cleanup test failover. Production and replication are never interrupted.",
  "tip": "A test failover uses an isolated network and does not affect replication; always clean it up. After a real failover you commit, then re-protect before failing back. The vault must be in a different region from the source VMs.",
  "check": [
   [
    "How can you validate disaster recovery for replicated VMs without affecting production?",
    "Run a test failover into an isolated virtual network, then run Cleanup test failover."
   ],
   [
    "What does Commit do after a failover?",
    "It finalizes the failover and removes the other available recovery points, so you can no longer change recovery point."
   ],
   [
    "What must you do after failing over to the secondary region before you can fail back?",
    "Re-protect the VMs so they replicate from the secondary region back to the primary region."
   ],
   [
    "In which region should the Recovery Services vault for Azure-to-Azure replication be created?",
    "In a region different from the source VMs, typically the target region."
   ]
  ]
 },
 {
  "t": "Backup reports and alerts",
  "body": [
   "Taking backups is not enough; you must know they are succeeding, how much they cost and when something goes wrong. Azure Backup provides reports for trends and governance and alerts for events that need action. Both are built on Azure Monitor and surfaced in the Business Continuity Center (formerly Backup center), so the skills from the monitoring lessons, diagnostic settings, Log Analytics, alert rules and action groups, apply directly here.",
   "Backup reports are built on Azure Monitor workbooks and read data from a Log Analytics workspace. To use them, you first configure diagnostic settings on each Recovery Services vault and Backup vault to send backup data to a workspace in resource-specific mode, which creates tables such as `CoreAzureBackup`, `AddonAzureBackupJobs`, `AddonAzureBackupPolicy` and `AddonAzureBackupStorage`. A built-in Azure Policy definition can configure these diagnostic settings for all vaults in a scope automatically. After data starts flowing, which can take several hours, open Backup reports and select the workspace or workspaces, even across subscriptions and tenants.",
   "The reports have tabs for different questions. Summary gives a high-level view of backup items, jobs and storage. Backup Items lists protected items and their storage consumption. Usage shows billed instances and storage trends, useful for chargeback. Jobs shows success and failure trends and failure reasons. Policies lists policies and the items using them. Optimize finds savings, such as inactive items still being billed, retention that seems too long, or databases that could use cheaper backup options. Policy adherence shows which items had a successful backup every day. You can filter by time range, subscription, vault and workload type, and export results. Reports answer governance questions such as \"did every critical VM have a successful backup every day this month?\" and \"which vault is growing fastest?\", which job lists alone cannot answer because they show one event at a time rather than trends.",
   "Backup alerts use Azure Monitor alerts. Built-in alerts are generated automatically for important scenarios, such as backup or restore job failures and security-relevant events like deleting backup data, disabling soft delete or stopping protection with data deletion. They appear in the Business Continuity Center and in Monitor > Alerts. By default these alerts are recorded but no one is notified; to get emails or trigger automation, create an alert processing rule that routes backup alerts to an action group. Each alert carries a severity, the affected backup item and a description of the problem, and you can acknowledge or close it as you work on it. The older classic backup alerts have been replaced by these Azure Monitor alerts. For custom conditions, use Azure Monitor capabilities directly: metric alerts on the backup health metrics exposed by vaults, or log search alerts that run KQL (Kusto Query Language) against the backup tables. For example, this query finds any failed backup job in the last day and could back a log search alert that runs every hour:",
   "```kusto\nAddonAzureBackupJobs\n| where TimeGenerated > ago(1d)\n| where JobOperation == \"Backup\" and JobStatus == \"Failed\"\n| project TimeGenerated, BackupItemUniqueId, JobFailureCode\n```",
   "Consider a worked example. A managed service provider looks after backups for several customers in separate subscriptions. It assigns the built-in policy that configures vault diagnostic settings to a central Log Analytics workspace in every subscription. The next week, Backup reports show that one customer's SQL backups fail every Sunday with the same failure code, and the Optimize tab lists forty inactive VM backup items still being billed. For day-to-day response, the provider creates an alert processing rule scoped to all subscriptions that sends every backup alert of severity Sev1 or higher to its on-call action group, which emails engineers and opens a ticket through a webhook. At the monthly review, the Policy adherence tab confirms which customers met their daily backup commitment, giving the provider evidence for its service reports.",
   "Common mistakes: expecting Backup reports to work without vault diagnostic settings sending data to a workspace; using AzureDiagnostics (legacy) mode instead of resource-specific tables; expecting built-in alerts to email someone without an action group; opening reports minutes after enabling diagnostics and assuming they are broken; and relying on job status alone without checking policy adherence.",
   "In exam questions, 'view backup trends across vaults and subscriptions' means Backup reports with a Log Analytics workspace; 'no data in Backup reports' means configure diagnostic settings; 'get emailed when a backup fails' means an alert processing rule with an action group; 'find items still billed but unused' means the Optimize tab; 'custom failure condition' means a log search alert on the backup tables."
  ],
  "terms": [
   [
    "Backup reports",
    "Azure Monitor workbooks that show backup items, jobs, usage, policies and optimization data from a Log Analytics workspace."
   ],
   [
    "Resource-specific tables",
    "Dedicated Log Analytics tables such as AddonAzureBackupJobs that vault diagnostic settings write to."
   ],
   [
    "Built-in backup alerts",
    "Azure Monitor alerts generated automatically for backup failures and security-relevant backup events."
   ],
   [
    "Alert processing rule",
    "A rule that routes matching fired alerts to action groups or suppresses them."
   ],
   [
    "Action group",
    "A reusable set of notifications and actions, such as email or webhooks, triggered by alerts."
   ],
   [
    "Policy adherence",
    "A report view showing whether each item had a successful backup in every period."
   ]
  ],
  "example": "An IT manager is asked why the backup bill grew 30 percent. She opens Backup reports, which already receive data because every vault's diagnostic settings send to the operations workspace. The Usage tab shows storage growth from a single file share with very long retention, and the Optimize tab lists twelve VMs deleted months ago whose backups are still retained. She shortens the file share's retention and stops protection on the orphaned items after confirming the data is no longer needed.",
  "tip": "Backup reports need vault diagnostic settings sending to a Log Analytics workspace; no workspace, no reports. Built-in backup alerts do not notify anyone until you connect an action group, usually through an alert processing rule.",
  "check": [
   [
    "Backup reports show no data for a new vault. What should you configure?",
    "A diagnostic setting on the vault that sends backup data to the Log Analytics workspace in resource-specific mode."
   ],
   [
    "Built-in backup alerts appear in the portal, but nobody is emailed. How do you fix this?",
    "Create an alert processing rule that routes backup alerts to an action group containing email notifications."
   ],
   [
    "Which Backup reports tab helps identify cost savings such as inactive items?",
    "The Optimize tab."
   ],
   [
    "How can you alert on a custom backup condition, such as any failed job for a critical VM?",
    "Create a log search alert rule with a KQL query against the backup tables, such as AddonAzureBackupJobs."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
