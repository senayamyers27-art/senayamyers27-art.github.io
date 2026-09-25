/* Lessons for Microsoft Certified: Cloud and AI Security Engineer Associate (replaces Azure Security Engineer Associate / AZ-500) (SC-500): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("sc-500", [
 {
  "t": "Microsoft Entra built-in roles vs Azure RBAC roles, scopes (management group, subscription, resource group, resource) and least privilege",
  "body": [
   "Azure has two separate permission systems, and the exam expects you to know which one answers a given question. Microsoft Entra roles (formerly Azure AD roles) control the directory itself: users, groups, app registrations, licenses, Conditional Access and tenant settings. Azure role-based access control (Azure RBAC) controls Azure resources: subscriptions, virtual machines, storage accounts, key vaults and everything else managed through Azure Resource Manager (ARM). A Global Administrator can reset passwords for everyone but, by default, cannot delete a single VM. An Owner of a subscription can delete every VM in it but cannot create a user.",
   "Common Entra built-in roles include Global Administrator, Privileged Role Administrator, User Administrator, Security Administrator, Security Reader, Application Administrator and Conditional Access Administrator. Common Azure RBAC built-in roles include Owner (full control plus the right to assign roles), Contributor (full control but no role assignment), Reader (view only) and User Access Administrator (manage role assignments only). There are also many service-specific roles such as Virtual Machine Contributor, Key Vault Secrets User and Storage Blob Data Reader. One bridge exists: a Global Administrator can turn on 'Access management for Azure resources', which grants them User Access Administrator at the root scope. It is meant for emergencies and should be switched off again.",
   "An Azure RBAC role assignment has three parts: a security principal (user, group, service principal or managed identity), a role definition (the list of allowed operations) and a scope. Scopes form a hierarchy: management group, then subscription, then resource group, then individual resource. Permissions are inherited downward, so Reader on a management group gives read access to every subscription, resource group and resource beneath it. Effective permissions are the union of all assignments that apply, and Azure RBAC is additive: granting Reader does not take away Contributor granted elsewhere. Deny assignments exist but are created by Azure itself (for example by deployment stacks or managed applications), not directly by you.",
   "Least privilege means giving each identity only the permissions it needs, at the narrowest scope, for only as long as needed. In practice: assign roles to groups rather than individuals, prefer a specific role (Virtual Machine Contributor) over a broad one (Contributor), assign at the resource group rather than the subscription when the work is limited to one application, and use Privileged Identity Management so that powerful roles are eligible rather than permanent. Limit the number of subscription Owners and Global Administrators, and keep a couple of break-glass accounts excluded from risky policies.",
   "In the portal you manage Azure RBAC on the Access control (IAM) blade of any scope. The Check access tab shows what a principal can do there, and Role assignments shows who has what, including inherited assignments. Entra roles are managed under Microsoft Entra ID > Roles and administrators, and some can be scoped to an administrative unit so a helpdesk admin only manages users in one region."
  ],
  "terms": [
   [
    "Microsoft Entra role",
    "A directory role that grants permissions over identity objects and tenant settings, such as User Administrator or Security Administrator."
   ],
   [
    "Azure RBAC role",
    "A role definition that grants permissions over Azure resources through Azure Resource Manager, such as Owner, Contributor or Reader."
   ],
   [
    "Scope",
    "The level at which a role assignment applies: management group, subscription, resource group or resource; lower levels inherit it."
   ],
   [
    "User Access Administrator",
    "An Azure RBAC role that can manage role assignments but not the resources themselves."
   ],
   [
    "Least privilege",
    "Granting only the permissions needed, at the narrowest scope and for the shortest time."
   ]
  ],
  "example": "A developer needs to restart VMs in the app-prod resource group. Instead of making them subscription Contributor, you add them to a group that holds Virtual Machine Contributor on that resource group only. They can manage those VMs but cannot touch networking in other resource groups or grant access to anyone else.",
  "tip": "If the question is about users, groups, apps or tenant settings, the answer is an Entra role; if it is about subscriptions or resources, it is an Azure RBAC role. Only Owner and User Access Administrator (among the common built-ins) can assign Azure roles; Contributor cannot.",
  "check": [
   [
    "A Global Administrator cannot see any subscriptions. What is the supported way for them to gain access in an emergency?",
    "Enable 'Access management for Azure resources' in the Entra ID properties, which grants User Access Administrator at the root scope; they can then assign themselves a role and should turn the setting off afterward."
   ],
   [
    "A user has Reader at the subscription and Contributor on one resource group. What can they do in that resource group?",
    "Contributor actions, because Azure RBAC is additive and effective permissions are the union of all applicable assignments."
   ],
   [
    "Why assign roles to groups rather than individual users?",
    "Group assignments are easier to review and change, reduce assignment sprawl and make joiner-mover-leaver changes a matter of group membership."
   ]
  ]
 },
 {
  "t": "Custom Azure RBAC roles: actions, notActions, dataActions and assignable scopes",
  "body": [
   "When no built-in role fits, you can create a custom Azure RBAC role. A custom role is a JSON role definition that lists exactly which operations are allowed. You create it in the portal (clone an existing role and edit it), with Azure PowerShell (`New-AzRoleDefinition`) or with the Azure CLI (`az role definition create --role-definition role.json`). Custom roles are stored in the Microsoft Entra tenant and can be shared across the subscriptions listed in their assignable scopes.",
   "Operations are written as resource provider strings, for example `Microsoft.Compute/virtualMachines/start/action` or `Microsoft.Storage/storageAccounts/read`. Wildcards are allowed: `Microsoft.Compute/virtualMachines/*` means every operation on VMs. The `Actions` property lists control-plane (management) operations that go through Azure Resource Manager: create, read, update, delete and special actions such as restart. The `NotActions` property subtracts operations from a wildcard in `Actions`. For instance, `Actions: [\"*\"]` with `NotActions: [\"Microsoft.Authorization/*/Delete\", \"Microsoft.Authorization/*/Write\"]` is essentially how Contributor is defined.",
   "Important: `NotActions` is not a deny. It only removes operations from this role's grant. If the same user also has another role that allows the excluded operation, they can still perform it. To actually block something you rely on the absence of permissions, Azure Policy, resource locks or system-created deny assignments.",
   "Data-plane operations act on the data inside a resource, such as reading a blob or a queue message, and are listed in `DataActions` and `NotDataActions`. For example, `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read` is a data action. This split is why Contributor on a storage account can manage the account but cannot read blobs through Entra ID authorization; that needs a data role such as Storage Blob Data Reader. Only services that support Entra data-plane authorization (Storage, Key Vault with RBAC, Service Bus, Event Hubs and others) have data actions.",
   "`AssignableScopes` lists where the custom role can be assigned: one or more management groups, subscriptions or resource groups. A role scoped to a subscription can be assigned at that subscription or anything below it. Custom roles that include `DataActions` cannot list a management group in their assignable scopes, and there are tenant-wide limits on how many custom roles you can create, so keep them few and reusable. Creating or updating a custom role requires `Microsoft.Authorization/roleDefinitions/write`, which Owner and User Access Administrator have.",
   "A good workflow is: find the closest built-in role, export it with `az role definition list --name \"Virtual Machine Contributor\"`, edit the JSON, give it a clear name and description, set assignable scopes as narrow as possible, and test it with a test user and Check access before rolling it out."
  ],
  "terms": [
   [
    "Actions",
    "Control-plane operations the role allows, such as creating or restarting a VM."
   ],
   [
    "NotActions",
    "Operations removed from the Actions wildcard for this role only; not a deny if another role grants them."
   ],
   [
    "DataActions",
    "Data-plane operations the role allows, such as reading blobs or Key Vault secrets."
   ],
   [
    "AssignableScopes",
    "The management groups, subscriptions or resource groups where a custom role may be assigned."
   ]
  ],
  "example": "Operators must start, stop and restart VMs but never create or delete them. You create 'VM Operator' with Actions for `virtualMachines/read`, `start/action`, `powerOff/action`, `restart/action` and `deallocate/action`, set AssignableScopes to the production subscription and assign it to the operations group at that scope.",
  "tip": "Questions often test that NotActions is not a deny and that reading data in a storage account needs a DataActions role, not Contributor. Also watch for a role that cannot be assigned because the target scope is outside its AssignableScopes.",
  "check": [
   [
    "A user has a custom role with NotActions for VM delete and also has Contributor on the same resource group. Can they delete a VM?",
    "Yes. NotActions only trims that role's own grant; Contributor still allows the delete."
   ],
   [
    "Which property would hold `Microsoft.KeyVault/vaults/secrets/getSecret/action`?",
    "DataActions, because reading a secret value is a data-plane operation."
   ],
   [
    "What limits where a custom role can be assigned?",
    "Its AssignableScopes list; it can be assigned only at those scopes or below them."
   ]
  ]
 },
 {
  "t": "Privileged Identity Management: eligible vs active assignments, activation with MFA, approval and justification, access reviews",
  "body": [
   "Microsoft Entra Privileged Identity Management (PIM) provides just-in-time privileged access. Instead of someone holding Global Administrator or subscription Owner around the clock, they hold it only when they need it, for a limited time, with an audit trail. PIM needs Microsoft Entra ID P2 or Entra ID Governance licensing for the users who benefit from it. It covers three kinds of roles: Microsoft Entra roles, Azure resource roles (Azure RBAC at management group, subscription, resource group or resource scope) and group membership or ownership through PIM for Groups.",
   "An eligible assignment means the user may activate the role but has no permissions until they do. An active assignment means the permissions are in effect now. Both can be permanent or time-bound (with a start and end date). The recommended pattern is eligible, time-bound assignments for administrators, with only break-glass accounts holding permanent active Global Administrator.",
   "When an eligible user activates a role (in the portal under My roles, or through the API), PIM applies the role settings you configured. Common settings are: maximum activation duration (for example a few hours), require Azure multifactor authentication on activation, or require a Conditional Access authentication context; require justification text; require a ticket number; and require approval. If approval is required, the designated approvers get a notification and must approve before the role becomes active. The activation ends automatically when the duration expires, and users can deactivate early.",
   "PIM also sends notifications (for example when a role is activated or assigned), keeps an audit history of assignments and activations, and raises alerts for risky configurations such as too many Global Administrators, roles assigned outside PIM or roles that are never activated. These alerts are a quick way to find standing privilege.",
   "Access reviews are part of Entra ID Governance and integrate with PIM. You can schedule a recurring review of who holds a privileged role, asking the users themselves, their managers or specific reviewers to confirm the access is still needed. Settings include duration, recurrence, what happens if reviewers do not respond (keep, remove or take recommendations) and whether to apply results automatically. Removing unneeded eligible and active assignments this way keeps the privileged population small over time.",
   "In a lab you will open Microsoft Entra ID > Identity Governance > Privileged Identity Management, choose Microsoft Entra roles, open a role such as Security Reader, edit its settings to require MFA and justification, add an eligible assignment for a test user, then sign in as that user and activate it."
  ],
  "terms": [
   [
    "Eligible assignment",
    "A PIM assignment that lets a user activate a role when needed; it grants no permissions until activated."
   ],
   [
    "Active assignment",
    "A role assignment whose permissions are currently in effect, either permanently or for a set time."
   ],
   [
    "Activation",
    "The just-in-time step where an eligible user turns on a role, subject to MFA, justification, ticket or approval settings."
   ],
   [
    "Access review",
    "A scheduled check in which reviewers confirm or remove users' continued access to a role, group or app."
   ]
  ],
  "example": "A cloud engineer is eligible for Owner on the production subscription. During an outage they activate it for two hours, complete MFA, type a justification referencing the incident ticket and wait for the on-call manager's approval. The role expires on its own, and the audit log records who approved it and why.",
  "tip": "Eligible is 'can activate', active is 'has it now'. If a question asks how to remove standing admin access while keeping the ability to perform admin work, the answer is converting permanent active assignments to eligible ones in PIM.",
  "check": [
   [
    "What license does PIM require?",
    "Microsoft Entra ID P2 (or Entra ID Governance) for the users who use or benefit from PIM."
   ],
   [
    "Which PIM role settings help ensure that a real, authorized person activates Owner?",
    "Requiring MFA (or an authentication context) on activation, requiring justification and ticket information, and requiring approval from designated approvers."
   ],
   [
    "How do you regularly confirm that eligible Global Administrators still need the role?",
    "Create a recurring access review for that role in PIM or Identity Governance and configure it to remove access for denied or unreviewed users."
   ]
  ]
 },
 {
  "t": "Conditional Access: users and workload identities, cloud apps, conditions (sign-in risk, locations, device platform), grant and session controls, report-only mode",
  "body": [
   "Conditional Access is the policy engine of Microsoft Entra ID. After the first factor of authentication, it evaluates signals about the sign-in and decides whether to allow it, require more, or block it. Think of each policy as an if-then statement: if these assignments and conditions match, then apply these access controls. It requires Microsoft Entra ID P1; risk-based conditions need P2.",
   "Assignments define who and what the policy targets. Users can be included or excluded by user, group, directory role or guest type. Workload identities (service principals for single-tenant apps) can also be targeted, for example to block a service principal from signing in outside known IP ranges; that needs Workload Identities Premium licensing. Target resources (formerly cloud apps) can be all resources, specific apps such as Office 365 or the Windows Azure Service Management API, user actions such as registering security info, or authentication contexts. Always exclude at least one break-glass account from blocking policies.",
   "Conditions narrow when a policy applies. Sign-in risk and user risk come from Entra ID Protection. Locations are named locations defined by IP ranges or countries, and can be marked trusted. Device platforms include Android, iOS, Windows and macOS. Other conditions include client apps (browser, mobile apps and desktop clients, or legacy authentication clients), filter for devices and insider risk. Multiple conditions must all match.",
   "Grant controls decide access. You can block access, or grant access while requiring one or all of: multifactor authentication, an authentication strength, a device marked compliant in Intune, a Microsoft Entra hybrid joined device, an approved client app, an app protection policy, password change or terms of use. Session controls shape what happens after access is granted: sign-in frequency, persistent browser session, app enforced restrictions, Conditional Access App Control through Microsoft Defender for Cloud Apps, and continuous access evaluation settings.",
   "When several policies apply, all of them are enforced. Block wins over everything, and every grant requirement from every matching policy must be satisfied. That is why an overly broad block policy can lock out administrators.",
   "Report-only mode lets you turn a policy on in an evaluate-but-don't-enforce state. Sign-in logs show what the policy would have done (success, failure or user action required) and the Conditional Access insights and reporting workbook summarizes impact. The What If tool in the portal simulates a sign-in so you can see which policies would apply. The safe rollout pattern is: create in report-only, review logs, pilot on a group, then switch to On.",
   "Classic baseline policies you should recognize: require MFA for all administrators, require MFA for Azure management, block legacy authentication, require MFA for risky sign-ins, require password change for high user risk, and require compliant devices for sensitive apps."
  ],
  "terms": [
   [
    "Conditional Access policy",
    "An if-then rule in Entra ID that evaluates sign-in signals and enforces grant or session controls."
   ],
   [
    "Grant control",
    "The part of a policy that blocks access or grants it only if requirements such as MFA or a compliant device are met."
   ],
   [
    "Session control",
    "A control that limits the session after access is granted, such as sign-in frequency or app-enforced restrictions."
   ],
   [
    "Named location",
    "A set of IP ranges or countries used as a condition; it can be marked as trusted."
   ],
   [
    "Report-only mode",
    "A policy state that logs what would happen without enforcing the policy."
   ]
  ],
  "example": "You want MFA for anyone managing Azure resources from outside the office. The policy targets all users except break-glass accounts, targets the Windows Azure Service Management API, sets locations to any location excluding the trusted office named location, and grants access requiring MFA. You run it in report-only for a week, check the sign-in logs, then turn it on.",
  "tip": "Remember evaluation logic: all matching policies apply, block always wins, and exclusions beat inclusions. If a scenario warns about locking everyone out, the answer usually involves report-only mode, What If and break-glass exclusions.",
  "check": [
   [
    "What licensing is needed to use sign-in risk as a Conditional Access condition?",
    "Microsoft Entra ID P2, because sign-in risk comes from Entra ID Protection."
   ],
   [
    "Two policies apply to a sign-in: one requires MFA and the other requires a compliant device. What must the user satisfy?",
    "Both requirements, because every matching policy's grant controls are enforced."
   ],
   [
    "How can you measure the impact of a new policy before enforcing it?",
    "Enable it in report-only mode and review sign-in logs and the insights workbook, or simulate specific sign-ins with the What If tool."
   ]
  ]
 },
 {
  "t": "MFA and authentication methods policy, phishing-resistant methods (FIDO2, passkeys, Windows Hello), authentication strengths",
  "body": [
   "Multifactor authentication (MFA) requires two or more of: something you know (password or PIN), something you have (phone, security key) and something you are (fingerprint, face). A stolen password alone is then not enough. In Microsoft Entra ID you can require MFA through security defaults (a free, all-or-nothing baseline) or, for finer control, through Conditional Access policies. The old per-user MFA setting is legacy and should be avoided in favor of Conditional Access.",
   "The authentication methods policy, under Entra ID > Protection > Authentication methods, is where you decide which methods are allowed and for whom. Methods include Microsoft Authenticator (push notifications with number matching, and passwordless phone sign-in), passkeys (FIDO2), Windows Hello for Business, certificate-based authentication, Temporary Access Pass, software and hardware OATH tokens, SMS and voice call, and email one-time passcodes for guests. Each method can be enabled for all users or specific groups, with method-specific settings. Microsoft has been moving tenants from the older legacy MFA and self-service password reset method settings into this single converged policy.",
   "Not all MFA is equal. SMS codes, voice calls and simple push approvals can be intercepted, SIM-swapped or approved by a tired user during an MFA fatigue attack. Adversary-in-the-middle phishing kits can also relay one-time codes in real time. Phishing-resistant methods defeat this by using public-key cryptography bound to the real site's origin, so a look-alike domain cannot obtain a usable credential. The phishing-resistant methods in Entra are FIDO2 security keys and passkeys (including passkeys in Microsoft Authenticator), Windows Hello for Business and certificate-based authentication (smart cards). Temporary Access Pass is a time-limited code used to onboard or recover these methods without a password.",
   "Authentication strengths let Conditional Access require a specific set of methods instead of just 'MFA'. There are three built-in strengths: Multifactor authentication strength (any MFA combination), Passwordless MFA strength (passwordless methods such as Authenticator phone sign-in, Windows Hello and FIDO2) and Phishing-resistant MFA strength (FIDO2/passkeys, Windows Hello for Business and certificate-based MFA). You can also create custom strengths, for example allowing only FIDO2 keys with specific AAGUIDs (authenticator model identifiers). In a Conditional Access policy you choose Grant > Require authentication strength instead of Require multifactor authentication.",
   "A sensible design is: require phishing-resistant strength for administrators and for access to the Azure portal and management APIs, require at least MFA for everyone, disable SMS and voice where possible, turn on number matching and additional context for Authenticator, and use a Temporary Access Pass to bootstrap new users onto passkeys."
  ],
  "terms": [
   [
    "Authentication methods policy",
    "The Entra ID policy that enables or disables each sign-in method for all users or selected groups."
   ],
   [
    "Phishing-resistant MFA",
    "Methods bound cryptographically to the legitimate site, such as FIDO2 keys, passkeys, Windows Hello for Business and certificate-based authentication."
   ],
   [
    "Passkey",
    "A FIDO2 credential stored on a security key or device that signs in with a private key unlocked by PIN or biometrics."
   ],
   [
    "Authentication strength",
    "A Conditional Access grant control that requires specific combinations of methods, such as the built-in phishing-resistant MFA strength."
   ],
   [
    "Temporary Access Pass",
    "A time-limited passcode used to register or recover strong methods without a password."
   ]
  ],
  "example": "After an attacker used an adversary-in-the-middle page to steal session tokens from an admin who approved an Authenticator push, the security team creates a Conditional Access policy for all admin roles requiring the Phishing-resistant MFA authentication strength, and issues FIDO2 keys registered through a Temporary Access Pass.",
  "tip": "If the question asks for protection against phishing or MFA fatigue, 'require MFA' is not enough; choose the phishing-resistant authentication strength with FIDO2/passkeys, Windows Hello for Business or certificate-based authentication. SMS and voice are never phishing-resistant.",
  "check": [
   [
    "Which Conditional Access grant control lets you require FIDO2 keys specifically?",
    "Require authentication strength, using the built-in Phishing-resistant MFA strength or a custom strength limited to FIDO2."
   ],
   [
    "Why is a push notification without number matching vulnerable?",
    "Users can approve prompts they did not start, as in MFA fatigue attacks, and codes or approvals can be relayed through phishing proxies."
   ],
   [
    "How does a new user register a passkey when they have no password?",
    "An admin issues a Temporary Access Pass, which the user uses to sign in once and register the passkey."
   ]
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned, and replacing stored secrets with token-based access",
  "body": [
   "Applications often need to call other services: an App Service reading from Key Vault, a VM writing to Storage, a Function querying Azure SQL. The old way was to store a connection string, key or client secret in configuration, which can leak, expire or be forgotten in a code repository. A managed identity solves this by giving the Azure resource its own identity in Microsoft Entra ID, whose credentials Azure creates, stores and rotates for you. Your code never sees a secret.",
   "A system-assigned managed identity is enabled on one resource (for example, the Identity blade of a VM or web app) and is tied to that resource's life cycle. It is created with the resource, can only be used by that resource, and is deleted when the resource is deleted. A user-assigned managed identity is a standalone Azure resource (`Microsoft.ManagedIdentity/userAssignedIdentities`) that you create first and then attach to one or many resources. It survives when those resources are deleted.",
   "Choose system-assigned when a single resource needs its own identity and you want clean-up to be automatic. Choose user-assigned when several resources need the same permissions (for example, a pool of VMs in a scale set or many function apps), when you want to pre-create identities and grant access before resources are deployed, or when resources are frequently recreated and you don't want to redo role assignments each time. A resource can have one system-assigned identity and several user-assigned identities at the same time.",
   "Under the hood, a managed identity is a special service principal. Code running on the resource requests an access token from a local endpoint: the Azure Instance Metadata Service (IMDS) at the link-local address `169.254.169.254` on VMs, or an identity endpoint provided through environment variables on App Service and Functions. The token is then presented to the target service, which must accept Entra authentication. In code, the Azure Identity library's `DefaultAzureCredential` or `ManagedIdentityCredential` handles all of this.",
   "Getting a token is only half the job; the identity also needs permission. You grant it an Azure RBAC role on the target, such as Key Vault Secrets User on a vault, Storage Blob Data Contributor on a container, or you create a contained database user for it in Azure SQL. Apply least privilege and the narrowest scope.",
   "Replacing secrets typically goes: enable the identity, grant it the right data-plane role, change the app to use token-based credentials, remove the stored key or connection string, and finally rotate or disable the old key (for example by disabling Shared Key access on the storage account) so the leaked-secret risk is truly gone."
  ],
  "terms": [
   [
    "Managed identity",
    "An Entra identity for an Azure resource whose credentials Azure manages and rotates automatically."
   ],
   [
    "System-assigned identity",
    "A managed identity created on and tied to one resource's life cycle."
   ],
   [
    "User-assigned identity",
    "A standalone managed identity resource that can be attached to many resources and persists independently."
   ],
   [
    "IMDS",
    "The Azure Instance Metadata Service at 169.254.169.254 that VMs use to request managed identity tokens."
   ]
  ],
  "example": "A web app stored a storage account key in its app settings. You enable the web app's system-assigned identity, give it Storage Blob Data Reader on the container, update the code to use DefaultAzureCredential, delete the app setting and then rotate both storage keys so the old one stops working.",
  "tip": "If several resources must share one identity, or the identity must survive resource deletion, pick user-assigned. If the scenario says 'no credentials stored in code or configuration', the answer is a managed identity plus an RBAC role on the target.",
  "check": [
   [
    "What happens to a system-assigned identity when its VM is deleted?",
    "It is deleted with the VM, along with its role assignments' ability to be used."
   ],
   [
    "A VM has a managed identity but gets 403 errors reading Key Vault secrets. What is missing?",
    "Authorization on the vault, such as the Key Vault Secrets User role (RBAC model) or an access policy granting Get on secrets."
   ],
   [
    "Why might you pre-create a user-assigned identity?",
    "So you can grant it roles before the resources exist and reuse it across many resources or redeployments."
   ]
  ]
 },
 {
  "t": "App registrations vs enterprise applications (service principals), API permissions, admin consent and user consent settings",
  "body": [
   "When you register an application with Microsoft Entra ID, two objects are involved. The application object, seen under App registrations, is the global definition of the app: its name, application (client) ID, redirect URIs, credentials (client secrets or certificates), the permissions it asks for and any app roles or scopes it exposes. It lives in the app's home tenant. The service principal, seen under Enterprise applications, is the local instance of that app in a specific tenant. It is what actually gets signed in, assigned users, granted consent and targeted by Conditional Access. One application object can have service principals in many tenants (a multitenant app), each with its own consent and assignments.",
   "A handy rule: App registrations is where developers define how the app works; Enterprise applications is where administrators control who can use it and what it has been allowed to do in their tenant. Managed identities also appear as service principals in Enterprise applications, but they have no app registration you manage.",
   "API permissions come in two types. Delegated permissions let the app act on behalf of a signed-in user; the effective access is the intersection of what the app was granted and what the user can do. Application permissions (app-only) let the app act as itself with no user, for background services, and apply across the whole tenant, for example `Mail.Read` as an application permission reads every mailbox. Application permissions always require admin consent.",
   "Consent is the act of granting those permissions. User consent means an individual user agrees to let an app access their own data with low-risk delegated permissions. Admin consent is granted by an administrator (such as a Global Administrator, Privileged Role Administrator, Cloud Application Administrator or Application Administrator, depending on the permission) on behalf of the whole organization, and is required for application permissions and high-privilege delegated permissions.",
   "Illicit consent grant attacks trick users into consenting to a malicious multitenant app that then reads their mail or files without needing their password. Defenses live under Enterprise applications > Consent and permissions: restrict user consent to apps from verified publishers for selected low-impact permissions, or disable user consent entirely, and enable the admin consent workflow so users can request approval from designated reviewers instead of being blocked. Periodically review enterprise apps and their granted permissions, and remove unused or over-permissioned ones.",
   "For credentials, prefer certificates or federated identity credentials (workload identity federation, for example from GitHub Actions) over client secrets, and prefer managed identities when the code runs in Azure."
  ],
  "terms": [
   [
    "Application object",
    "The global app definition in its home tenant, managed under App registrations."
   ],
   [
    "Service principal",
    "The tenant-local instance of an application, managed under Enterprise applications, that receives consent and assignments."
   ],
   [
    "Delegated permission",
    "A permission used by an app on behalf of a signed-in user, limited by that user's own access."
   ],
   [
    "Application permission",
    "An app-only permission used with no signed-in user; it always needs admin consent."
   ],
   [
    "Admin consent workflow",
    "A process that lets users request admin approval for apps they are not allowed to consent to."
   ]
  ],
  "example": "Users keep consenting to third-party calendar tools that request `Mail.ReadWrite`. You set user consent to 'Allow user consent for apps from verified publishers, for selected permissions', classify only low-risk permissions such as `User.Read` as allowed, and turn on the admin consent workflow with the security team as reviewers.",
  "tip": "Application permissions need admin consent, full stop. When the question is 'where do I restrict who can sign in to this app or assign it to users', the answer is Enterprise applications (the service principal), not App registrations.",
  "check": [
   [
    "A background service with no user must read all users' profiles. Which permission type and consent does it need?",
    "An application permission such as User.Read.All, with admin consent."
   ],
   [
    "A multitenant app is registered in tenant A and used in tenant B. Where is the application object and where is the service principal?",
    "The application object is in tenant A; tenant B has its own service principal (and tenant A usually has one too)."
   ],
   [
    "How do you stop users from consenting to risky apps without blocking legitimate requests?",
    "Restrict or disable user consent and enable the admin consent workflow so requests go to reviewers."
   ]
  ]
 },
 {
  "t": "Azure Key Vault: RBAC vs access policies, soft delete and purge protection, key rotation, network restrictions, Defender for Key Vault",
  "body": [
   "Azure Key Vault is a managed service for storing secrets (passwords, connection strings), cryptographic keys (RSA and EC keys used for encryption and signing) and certificates. Applications fetch what they need at runtime using their Entra identity, so secrets stay out of code. The Premium tier adds keys protected by hardware security modules (HSMs); Azure Key Vault Managed HSM is a separate single-tenant offering for stricter requirements.",
   "Key Vault has two planes. The management plane (creating the vault, changing its network settings) is always controlled by Azure RBAC, through roles such as Key Vault Contributor. The data plane (reading a secret, using a key) can be authorized in one of two ways, chosen per vault. The legacy vault access policy model grants a principal sets of permissions (Get, List, Set, Delete and so on) for keys, secrets and certificates across the whole vault. The Azure RBAC model uses data roles such as Key Vault Administrator, Key Vault Secrets User, Key Vault Secrets Officer, Key Vault Crypto User and Key Vault Certificates Officer, and can be scoped down to an individual secret. Microsoft recommends the RBAC model: it is consistent with the rest of Azure, works with PIM, and fixes a known weakness of access policies where anyone with Contributor on the vault could grant themselves data access by editing the policy.",
   "Soft delete keeps deleted vaults and vault objects in a recoverable state for a retention period (7 to 90 days, 90 by default) and is now always on for new vaults. During that time you can recover them or purge them. Purge protection, which you enable separately and cannot turn off once enabled, blocks purging until the retention period ends, even for administrators. This defends against a malicious insider or ransomware actor who deletes and purges keys to make encrypted data unrecoverable. Services that use customer-managed keys, such as Storage or Azure SQL TDE, require both soft delete and purge protection on the vault.",
   "Keys should be rotated regularly. Key Vault supports a key rotation policy that automatically creates a new key version on a schedule (for example, every year) and can send a near-expiry event through Event Grid. Services configured to use the latest key version pick up the new one automatically. Secrets can have expiration dates, and Event Grid events for 'near expiry' can trigger a Function or Logic App to rotate them. Certificates can auto-renew through integrated certificate authorities.",
   "Network restrictions reduce exposure. Under Networking you can disable public access completely and use a private endpoint, or allow selected virtual networks (through service endpoints) and IP ranges. The 'Allow trusted Microsoft services to bypass this firewall' option lets services such as Azure Backup or Storage (for CMK) reach the vault. Firewall rules apply to the data plane.",
   "Microsoft Defender for Key Vault, a Defender for Cloud plan, analyzes access to the vault and raises alerts for unusual behavior, such as access from a suspicious IP address or Tor exit node, an unusual application or user accessing many secrets, or abnormal volumes of operations. Combine it with diagnostic settings that send AuditEvent logs to a Log Analytics workspace for investigation."
  ],
  "terms": [
   [
    "Access policy model",
    "The legacy Key Vault data-plane authorization that grants vault-wide permission sets per principal."
   ],
   [
    "Key Vault RBAC",
    "Data-plane authorization using Azure roles like Key Vault Secrets User, scopable to a single secret."
   ],
   [
    "Soft delete",
    "Keeps deleted vaults and objects recoverable for a 7 to 90 day retention period."
   ],
   [
    "Purge protection",
    "Prevents permanent deletion until the retention period passes; cannot be disabled once enabled."
   ],
   [
    "Key rotation policy",
    "A schedule that automatically creates new key versions and can notify before expiry."
   ]
  ],
  "example": "Before enabling customer-managed keys for a storage account, you enable purge protection on the vault, switch the vault to the Azure RBAC permission model, grant the storage account's managed identity Key Vault Crypto Service Encryption User on the key, set a yearly rotation policy and restrict network access to a private endpoint with trusted services allowed.",
  "tip": "Contributor on a vault does not grant secret access in the RBAC model, but in the access-policy model a Contributor can add themselves a policy. If data must be unrecoverable-proof against deletion, the answer is purge protection, not just soft delete.",
  "check": [
   [
    "Why does Microsoft recommend the RBAC permission model over access policies?",
    "It is consistent with Azure RBAC, supports per-object scope and PIM, and prevents Contributors from granting themselves data access through policy edits."
   ],
   [
    "What does purge protection add beyond soft delete?",
    "It blocks anyone from permanently purging deleted items until the retention period ends, and it cannot be turned off."
   ],
   [
    "Which Key Vault setting lets Azure Backup reach a vault that denies public access?",
    "The firewall exception allowing trusted Microsoft services to bypass the firewall."
   ]
  ]
 },
 {
  "t": "Azure Policy: built-in vs custom definitions, initiatives, effects (Deny, Audit, Modify, DeployIfNotExists), remediation tasks, exemptions",
  "body": [
   "Azure RBAC controls who can act; Azure Policy controls what resources may look like. A policy definition is a rule written in JSON with an `if` condition (for example, a storage account where `supportsHttpsTrafficOnly` is false) and a `then` effect. You assign the definition to a scope (management group, subscription or resource group), optionally excluding child scopes, and Azure evaluates matching resources on create and update and periodically for compliance.",
   "Built-in definitions are written and maintained by Microsoft and cover hundreds of common requirements, such as allowed locations, required tags, 'Storage accounts should restrict network access' or 'Key vaults should have purge protection enabled'. Custom definitions are ones you write when no built-in fits, using aliases (property paths like `Microsoft.Storage/storageAccounts/minimumTlsVersion`). Definitions can have parameters, so one definition can be reused with different allowed values.",
   "An initiative (policy set definition) groups many definitions so they are assigned and tracked together. The Microsoft cloud security benchmark in Defender for Cloud is itself a large initiative. Assigning an initiative gives you one compliance percentage and one place to manage parameters.",
   "The effects you must know: Deny blocks a create or update request that violates the rule. Audit allows the request but marks the resource non-compliant and logs a warning. AuditIfNotExists flags resources when a related resource (such as a diagnostic setting or an extension) is missing. Modify adds, changes or removes properties or tags on the resource during create or update. DeployIfNotExists (DINE) deploys a related resource through an ARM template when it is missing, such as enabling diagnostic settings or installing an agent. Append adds fields, and Disabled turns the rule off. Deny prevents; Audit reports; Modify and DeployIfNotExists fix.",
   "Modify and DeployIfNotExists act automatically only on new or updated resources. Existing non-compliant resources need a remediation task, which you create from the assignment's compliance page. Because these effects change resources, the assignment needs a managed identity (system-assigned or user-assigned) with the roles listed in the definition, such as Contributor or Monitoring Contributor, at the assignment scope. Forgetting that identity is a classic failure.",
   "Exemptions exclude a specific resource or scope from an assignment without editing the assignment. Each exemption has a category, Waiver (accepted risk) or Mitigated (the intent is met another way), an optional expiration date and a description, which gives auditors a record. Exclusions (notScopes) on the assignment are a blunter tool with no category or expiry.",
   "In a lab, assign the built-in 'Allowed locations' with Deny at a resource group, try to create a resource in another region and read the RequestDisallowedByPolicy error, then assign a DeployIfNotExists definition and run a remediation task."
  ],
  "terms": [
   [
    "Policy definition",
    "A JSON rule with a condition and an effect that describes allowed resource configurations."
   ],
   [
    "Initiative",
    "A group of policy definitions assigned and reported on together, also called a policy set."
   ],
   [
    "DeployIfNotExists",
    "An effect that deploys a missing related resource or configuration using a template."
   ],
   [
    "Remediation task",
    "A job that applies Modify or DeployIfNotExists to resources that already existed before assignment."
   ],
   [
    "Exemption",
    "A record excluding a resource or scope from an assignment, categorized as Waiver or Mitigated, optionally time-limited."
   ]
  ],
  "example": "You assign a DeployIfNotExists policy that configures diagnostic settings on all key vaults to send logs to a central workspace. New vaults get the setting automatically, but thirty existing vaults show non-compliant, so you create a remediation task that uses the assignment's managed identity to fix them.",
  "tip": "Deny stops it, Audit reports it, Modify and DeployIfNotExists fix it, and existing resources need a remediation task plus a managed identity. For a temporary, documented exception, choose an exemption with an expiration date.",
  "check": [
   [
    "Which effect would add a missing CostCenter tag to resources as they are created?",
    "Modify (Append can also add fields, but Modify is the recommended effect for tags)."
   ],
   [
    "You assign a DeployIfNotExists policy but existing resources remain non-compliant. What do you do?",
    "Create a remediation task, making sure the assignment's managed identity has the required roles."
   ],
   [
    "What is the difference between an initiative and a single definition?",
    "An initiative bundles many definitions into one assignment and compliance view with shared parameters."
   ]
  ]
 },
 {
  "t": "Resource locks (CanNotDelete, ReadOnly), management group hierarchy and governance at scale",
  "body": [
   "Mistakes happen: someone deletes the wrong resource group, or a script removes a production database. Resource locks protect against accidental changes regardless of the user's Azure RBAC permissions. They can be applied at the subscription, resource group or resource level and are inherited by child resources.",
   "There are two lock types. CanNotDelete (shown as Delete in the portal) lets authorized users read and modify a resource but not delete it. ReadOnly lets users read but not delete or update the resource; it behaves like restricting everyone to the Reader role. Even an Owner is blocked by a lock until the lock is removed, and removing a lock requires `Microsoft.Authorization/locks/*` permission, which Owner and User Access Administrator have. Locks are a speed bump against mistakes, not a security boundary against a determined administrator.",
   "Locks apply to control-plane operations only. A CanNotDelete lock on a storage account does not stop someone deleting blobs inside it, and a ReadOnly lock on a SQL server does not stop data changes. ReadOnly locks can also have surprising side effects because some read-like actions are actually POST operations: a ReadOnly lock on a storage account prevents listing account keys, and on a resource group can stop VMs from being started or scaled. Use ReadOnly sparingly.",
   "Management groups organize subscriptions into a hierarchy above the subscription level. Every tenant has a single root management group, and you can nest management groups up to six levels deep (not counting the root and subscription levels). Each subscription belongs to exactly one management group. Azure RBAC assignments and Azure Policy assignments made at a management group are inherited by every subscription beneath it, which is how you govern hundreds of subscriptions consistently.",
   "A common design, reflected in the Azure landing zone guidance, has top-level groups such as Platform (identity, management, connectivity subscriptions), Landing Zones (split into Corp and Online application subscriptions), Sandbox and Decommissioned. You then assign broad guardrails high up (allowed regions, Defender for Cloud plans, diagnostic settings) and more specific ones lower down (deny public IPs in Corp).",
   "Other governance tools you should recognize: tags for cost and ownership metadata (enforced with policy), Microsoft Cost Management budgets, deployment stacks with deny settings that block changes to managed resources, and infrastructure as code so that environments are reproducible and reviewed before deployment."
  ],
  "terms": [
   [
    "CanNotDelete lock",
    "A lock that allows reads and updates but blocks deletion of the resource and its children."
   ],
   [
    "ReadOnly lock",
    "A lock that blocks both updates and deletion, allowing only read operations."
   ],
   [
    "Management group",
    "A container above subscriptions whose RBAC and policy assignments are inherited by all subscriptions beneath it."
   ],
   [
    "Root management group",
    "The single top-level management group in every tenant that contains all others."
   ]
  ],
  "example": "A production resource group holds the company's core network. You add a CanNotDelete lock at the resource group so engineers can still change NSG rules but nobody can delete the virtual network or the group by accident. When the network must be retired, an Owner removes the lock first as a deliberate step.",
  "tip": "Locks override RBAC for everyone, including Owners, but only for management operations, not data. If a question says users can still delete blobs despite a lock, that is expected behavior.",
  "check": [
   [
    "Which lock type still allows an administrator to resize a VM?",
    "CanNotDelete; ReadOnly would block the update."
   ],
   [
    "You need the same Azure Policy on 40 subscriptions. What is the most efficient scope?",
    "Assign it at a management group containing those subscriptions so it is inherited."
   ],
   [
    "Why might a ReadOnly lock on a storage account break an application?",
    "Listing the account keys is a POST operation that the lock blocks, so apps relying on keys retrieved at runtime fail."
   ]
  ]
 },
 {
  "t": "Finding and fixing over-privileged access with access reviews and Entra ID Protection risk policies",
  "body": [
   "Permissions accumulate. People change teams and keep old groups, contractors stay in guest lists after projects end, and emergency Owner assignments are never removed. Over-privileged accounts are dangerous because attackers who compromise them inherit everything they can reach. This topic combines two Entra features: access reviews, which remove access that is no longer needed, and Entra ID Protection, which reacts when an account shows signs of compromise.",
   "Access reviews (Identity Governance, needs Entra ID P2 or ID Governance licensing) can target group memberships, application assignments, Entra roles and Azure resource roles through PIM, and access packages. You choose reviewers: the users themselves (self-review), group owners, managers or named people. You set recurrence (weekly to annually), duration and what happens at the end: auto-apply results to remove denied users, and a default for non-responses (no change, remove access, approve access or take recommendations). Recommendations are based on sign-in activity, so users who have not signed in for a long time are flagged. Reviews of guest users in Teams and groups are a common use.",
   "To find over-privilege in the first place, look at PIM alerts (too many Global Administrators, roles assigned outside PIM, stale eligible assignments), the Role assignments tab under Access control (IAM) at high scopes, Defender for Cloud recommendations such as limiting subscription owners and removing external accounts with owner permissions, and Microsoft Entra Permissions Management style analysis of granted versus used permissions where available.",
   "Microsoft Entra ID Protection calculates two kinds of risk. Sign-in risk is the probability that a particular sign-in was not performed by the account owner, based on detections such as anonymous IP address, atypical travel, unfamiliar sign-in properties, malicious IP address and password spray. User risk is the probability that the account itself is compromised, based on detections such as leaked credentials found in breach dumps or Microsoft threat intelligence. Each is rated low, medium or high.",
   "Risk-based policies turn those scores into action. Microsoft now recommends configuring them as Conditional Access policies: a sign-in risk policy that requires MFA when sign-in risk is medium or high, and a user risk policy that requires a secure password change (after MFA) when user risk is high. Successful self-remediation clears the risk. Administrators can also review the Risky users, Risky sign-ins and Risk detections reports, confirm a user compromised or dismiss risk, and export risk data to Microsoft Sentinel. Users must be registered for MFA beforehand, which is why an MFA registration policy or campaign accompanies these policies.",
   "Together, these form a loop: reviews shrink what an attacker could gain, and risk policies make it harder to use a stolen credential at all."
  ],
  "terms": [
   [
    "Access review",
    "A recurring Identity Governance campaign in which reviewers approve or deny continued access."
   ],
   [
    "Sign-in risk",
    "The likelihood that a specific authentication request was not made by the legitimate user."
   ],
   [
    "User risk",
    "The likelihood that an identity is compromised, for example because its credentials leaked."
   ],
   [
    "Risk-based Conditional Access",
    "Policies that require MFA or a secure password change based on sign-in or user risk level."
   ]
  ],
  "example": "A quarterly access review of the Azure subscription Owner role asks each owner's manager to confirm the need. Six stale owners are removed automatically. Separately, a user risk policy forces a password change for an engineer whose credentials appeared in a public leak, clearing the risk after they complete MFA and reset.",
  "tip": "Sign-in risk maps to 'require MFA'; user risk maps to 'require password change'. Leaked credentials is a user-risk detection, while anonymous IP and atypical travel are sign-in risk detections.",
  "check": [
   [
    "Which remediation clears a high user risk caused by leaked credentials?",
    "A secure password change after MFA, enforced by a user-risk Conditional Access policy (or an admin reset or confirming safe after investigation)."
   ],
   [
    "What review setting removes access automatically from people who were not reviewed?",
    "Set 'If reviewers don't respond' to Remove access and enable auto-apply results."
   ],
   [
    "Why must users be registered for MFA before enabling a sign-in risk policy?",
    "Otherwise they cannot satisfy the MFA challenge and will be blocked when their sign-in is flagged risky."
   ]
  ]
 },
 {
  "t": "Storage authorization: Entra ID with data-plane RBAC, account keys, disabling Shared Key, key rotation",
  "body": [
   "Every request to read or write data in Azure Storage (blobs, files, queues, tables) must be authorized. There are several ways, and the exam wants you to rank them. The strongest is Microsoft Entra ID authorization: the caller presents an OAuth 2.0 token for a user, group, service principal or managed identity, and Azure checks their data-plane RBAC roles. No shared secret exists to leak, access is tied to identity and can be revoked, and every request is attributable in logs.",
   "Data-plane roles are separate from management roles. Owner or Contributor on a storage account lets you manage it, but does not by itself grant Entra-based data access. For blobs you use Storage Blob Data Reader, Storage Blob Data Contributor or Storage Blob Data Owner (which can also set POSIX ACLs on Data Lake Storage Gen2); for queues, Storage Queue Data Reader and Contributor; for tables, Storage Table Data Reader and Contributor; and for Azure Files over REST or SMB with identity-based authentication, the Storage File Data roles. Assign them at the narrowest scope that works, down to an individual container.",
   "Shared Key authorization uses one of the two 512-bit account access keys. A key grants full access to all data in the account, never expires on its own and is not tied to any identity, so logs cannot tell you who used it. Holding the role that includes `listKeys` (such as Contributor or Storage Account Key Operator Service Role) effectively means full data access, which is why Contributor is more powerful than it first seems. Shared access signatures (covered next) are also derived from keys, except user delegation SAS.",
   "You can set Allow storage account key access to Disabled on the account (the `allowSharedKeyAccess` property). After that, requests signed with account keys, and service or account SAS tokens signed with them, are rejected; only Entra ID and user delegation SAS work. Before disabling, check the storage metrics or logs for requests using Shared Key so you don't break legacy apps, and use Azure Policy to audit or deny accounts where it is still enabled. Also set the default to Entra authorization in the portal so users browse data with their identity.",
   "If keys must remain, rotate them. There are two keys so you can rotate without downtime: move applications to key2, regenerate key1, move them back or leave them, then regenerate key2 later. Storing the keys in Key Vault and setting a key expiration policy on the account, which reminds and flags keys older than the set interval, helps keep rotation on schedule. Regenerating a key immediately invalidates every SAS that was signed with it.",
   "Anonymous (public) read access to containers is a separate setting, Allow Blob anonymous access, that should be disabled unless you truly host public content."
  ],
  "terms": [
   [
    "Data-plane RBAC",
    "Azure roles such as Storage Blob Data Reader that authorize access to data inside a storage account."
   ],
   [
    "Account access key",
    "One of two keys granting full access to all data in a storage account via Shared Key authorization."
   ],
   [
    "allowSharedKeyAccess",
    "The storage account property that, when false, rejects requests authorized with account keys or key-signed SAS."
   ],
   [
    "Key expiration policy",
    "A storage account setting that flags account keys that have not been rotated within a set number of days."
   ]
  ],
  "example": "An audit shows developers use the storage account key embedded in a script. You grant the developers' group Storage Blob Data Contributor on their container, change the script to use `az storage blob upload --auth-mode login`, confirm from metrics that Shared Key requests stop, then disable storage account key access and regenerate both keys.",
  "tip": "Owner or Contributor alone does not give Entra data access, but it does allow listing keys, which gives full data access. The most secure answer for storage is almost always Entra ID with a data role and Shared Key disabled.",
  "check": [
   [
    "A user with Reader on a storage account cannot read blobs with Entra auth. Which role fixes this with least privilege?",
    "Storage Blob Data Reader at the container or account scope."
   ],
   [
    "What happens to a service SAS after Shared Key access is disabled?",
    "It stops working, because service and account SAS are signed with account keys; only user delegation SAS remains valid."
   ],
   [
    "Why are there two account keys?",
    "So you can switch clients to one key while regenerating the other, rotating without downtime."
   ]
  ]
 },
 {
  "t": "Shared access signatures: user delegation vs service vs account SAS, stored access policies and revocation",
  "body": [
   "A shared access signature (SAS) is a signed URL query string that grants limited, time-bound access to storage resources without sharing an account key or requiring the client to have an Entra identity. It is typical for letting a browser upload a file directly, or giving a partner temporary read access to one container. The token encodes permissions (read, write, list, delete and so on), a start and expiry time, the resource, and optionally allowed IP addresses and protocol (HTTPS only), then a signature proves it was issued by someone with the right to do so.",
   "There are three types. A user delegation SAS is signed with a user delegation key obtained using Microsoft Entra credentials. It works for Blob storage (including Data Lake Storage Gen2), and the permissions it grants are limited by the RBAC permissions of the identity that created it. Because it is backed by Entra ID, it keeps working when Shared Key is disabled and its creation is attributable. Microsoft recommends it as the most secure SAS. A service SAS is signed with an account key and grants access to resources in one service (blob, queue, table or file). An account SAS is also signed with an account key but can grant access across multiple services and to service-level operations, so it is the broadest type.",
   "Revocation is the weak point. A SAS is just a string, and anyone holding it can use it until it expires. For key-signed SAS your options are limited: regenerate the signing account key (which breaks every SAS signed with it and every app using that key) or wait for expiry. For a user delegation SAS, you can revoke all user delegation keys for the account, or the SAS stops working if the creator loses the needed RBAC permissions.",
   "A stored access policy, defined on a container, queue, table or file share, gives you finer control over service SAS. The SAS references the policy by name instead of embedding its own start, expiry and permissions. Changing the policy's expiry to the past, or deleting the policy, immediately invalidates every SAS linked to it without touching account keys. Each container supports up to five stored access policies. Stored access policies are not supported for user delegation SAS or account SAS.",
   "Best practices: prefer user delegation SAS, use HTTPS only, keep expiry short, grant minimum permissions to the narrowest resource, restrict IP ranges where possible, use stored access policies when you must use service SAS, configure a SAS expiration policy on the account so long-lived tokens are flagged, and monitor storage logs for unexpected SAS use. Never paste a SAS token into tickets, code repositories or chat."
  ],
  "terms": [
   [
    "User delegation SAS",
    "A Blob SAS signed with a key obtained through Entra ID credentials, bounded by the creator's RBAC permissions."
   ],
   [
    "Service SAS",
    "A SAS signed with an account key granting access to resources in a single storage service."
   ],
   [
    "Account SAS",
    "A key-signed SAS that can span multiple services and service-level operations."
   ],
   [
    "Stored access policy",
    "A named policy on a container, queue, table or share that service SAS tokens can reference, allowing central change or revocation."
   ]
  ],
  "example": "A partner needs to upload files to one container for a month. You create a stored access policy named partner-upload with write and create permissions, then generate a service SAS that references it. When the partnership ends early, you delete the policy and the partner's SAS stops working instantly, without regenerating account keys.",
  "tip": "Most secure SAS: user delegation. Revoke a service SAS without rotating keys: stored access policy. Revoke an ad hoc key-signed SAS: regenerate the key that signed it. Account SAS cannot use stored access policies.",
  "check": [
   [
    "Which SAS type still works when Shared Key authorization is disabled?",
    "A user delegation SAS, because it is signed with an Entra-derived user delegation key."
   ],
   [
    "How do you revoke a single service SAS that was issued without a stored access policy?",
    "You cannot revoke just that token; you must regenerate the account key that signed it or wait for it to expire."
   ],
   [
    "What is the benefit of a stored access policy?",
    "It lets you change or revoke all SAS tokens linked to it centrally by editing or deleting the policy."
   ]
  ]
 },
 {
  "t": "Storage encryption: Microsoft-managed vs customer-managed keys, infrastructure encryption, immutable blob storage",
  "body": [
   "All data written to Azure Storage is encrypted at rest automatically with 256-bit AES using Azure Storage encryption (also called storage service encryption). You cannot turn it off, and it is transparent to applications. The question is who controls the keys.",
   "With Microsoft-managed keys, the default, Microsoft generates, stores and rotates the keys. No setup is required. With customer-managed keys (CMK), you supply a key encryption key held in Azure Key Vault or Key Vault Managed HSM. Azure Storage uses envelope encryption: the data is encrypted with a data encryption key, and that data key is wrapped (encrypted) by your key. You control the key's life cycle: you can rotate it, audit its use and, critically, revoke access to it, which makes the data unreadable. Organizations choose CMK for regulatory requirements or the ability to cryptographically cut off access.",
   "Setting up CMK requires: a key vault with soft delete and purge protection enabled; an RSA or RSA-HSM key; a managed identity for the storage account (system-assigned, or user-assigned which is required when configuring CMK at account creation); and permission for that identity to wrap and unwrap with the key, for example the Key Vault Crypto Service Encryption User role. You can point to a specific key version or leave the version out so Storage automatically uses the latest version after you rotate. Customer-provided keys are a different feature, where the client supplies a key with each Blob request; and encryption scopes let you use different keys for different containers or blobs within one account.",
   "Infrastructure encryption adds a second layer of encryption at the infrastructure level, using a different encryption algorithm and a different key, so data is encrypted twice. It must be enabled when the storage account is created and cannot be added later. It is for customers whose compliance rules demand double encryption.",
   "Immutable blob storage stores data in a WORM (write once, read many) state so it cannot be modified or deleted for a period, even by account administrators. There are two policy types. Time-based retention policies keep blobs immutable for a set interval; while unlocked they can be changed, but once locked the interval can only be extended, not shortened or deleted, which satisfies regulations such as SEC 17a-4(f). Legal holds keep data immutable until the hold (identified by a tag) is cleared, with no fixed duration, for litigation or investigations. Policies can be applied at container scope or, with version-level immutability, on individual blob versions. Immutability is also a strong defense against ransomware that tries to encrypt or delete backups.",
   "Don't confuse encryption with immutability: CMK protects confidentiality and gives you key control; immutable storage protects integrity and availability against deletion or tampering."
  ],
  "terms": [
   [
    "Customer-managed key",
    "A key in Key Vault or Managed HSM that wraps the storage account's data encryption keys under your control."
   ],
   [
    "Infrastructure encryption",
    "A second, independent layer of encryption enabled only at storage account creation."
   ],
   [
    "Time-based retention policy",
    "An immutability policy keeping blobs undeletable and unmodifiable for a set interval; once locked, it can only be extended."
   ],
   [
    "Legal hold",
    "An immutability setting that preserves data indefinitely until the hold tag is removed."
   ]
  ],
  "example": "A financial firm must keep trade records unaltered for seven years and control its own keys. It creates a storage account with infrastructure encryption, configures CMK from a purge-protected vault using a user-assigned identity, and applies a locked time-based retention policy of seven years on the records container.",
  "tip": "Infrastructure encryption can only be enabled at creation. A locked time-based retention policy cannot be shortened or removed, only extended. CMK needs soft delete plus purge protection on the vault and a managed identity with wrap/unwrap rights.",
  "check": [
   [
    "What happens to data in a CMK-encrypted storage account if the key is disabled?",
    "The data becomes inaccessible because Storage can no longer unwrap the data encryption keys."
   ],
   [
    "Which immutability option fits evidence preserved for an open-ended lawsuit?",
    "A legal hold, since it has no fixed end and lasts until cleared."
   ],
   [
    "Can you enable infrastructure encryption on an existing account?",
    "No, it must be chosen when the account is created."
   ]
  ]
 },
 {
  "t": "Storage firewall, trusted services exceptions, and Defender for Storage (activity monitoring, malware scanning, sensitive data threat detection)",
  "body": [
   "By default a storage account's endpoints accept connections from any network, relying only on authorization to keep data safe. The storage firewall (the Networking blade) adds a network layer. Public network access can be Enabled from all networks, Enabled from selected virtual networks and IP addresses, or Disabled. With selected networks, you add virtual network subnets (which need the `Microsoft.Storage` service endpoint) and public IP ranges in CIDR form; private IP ranges cannot be used in IP rules. With Disabled, only private endpoints can reach the account. Network rules are enforced on all protocols, including REST and SMB, and a request must pass both the firewall and authorization.",
   "Some Azure services cannot be placed in your virtual network but still need to reach the account, for example Azure Backup, Azure Monitor diagnostic logs, Event Grid or Azure Site Recovery. The exception 'Allow Azure services on the trusted services list to access this storage account' lets them through, typically when they authenticate with a managed identity. Resource instance rules are a more precise option: they allow a specific resource instance, such as one particular Synapse workspace or Data Factory, based on its managed identity. Other exceptions let logging and metrics be read from any network.",
   "Microsoft Defender for Storage is the Defender for Cloud plan for storage accounts. It is agentless and does not affect performance. Activity monitoring analyzes the data-plane and control-plane telemetry to raise alerts for suspicious behavior: access from a Tor exit node or known malicious IP, unusual anonymous access, unusual volumes of data extraction or deletion, access from an unusual location, suspicious SAS usage and changes that open a container to public access.",
   "Malware scanning inspects blobs for malicious content. On-upload scanning checks blobs as they are written, using Microsoft Defender Antivirus engines running in the Microsoft environment, so the file never needs to be downloaded to a VM. Results are written as blob index tags and can be sent to Event Grid, a Log Analytics workspace and Defender for Cloud alerts. You can then automate a response, such as moving or deleting infected files, with a Function or Logic App, or use the built-in soft delete of malicious blobs option. There is also on-demand scanning. Malware scanning is billed per gigabyte scanned and you can set a monthly cap per account.",
   "Sensitive data threat detection uses the sensitive information types from Microsoft Purview to discover which accounts contain data such as credit card numbers or personal data, and raises alert severity and prioritization when suspicious activity involves those accounts. This helps a SOC focus on the incidents that matter most.",
   "Enable the plan at the subscription level so new accounts are covered automatically, and override per account only when needed. Alerts appear in Defender for Cloud, can be streamed to Microsoft Sentinel and flow into the Defender XDR portal as incidents."
  ],
  "terms": [
   [
    "Storage firewall",
    "Network rules that restrict which subnets, public IP ranges or private endpoints can reach a storage account."
   ],
   [
    "Trusted services exception",
    "A firewall setting that allows listed Azure services, such as Azure Backup, to bypass network rules."
   ],
   [
    "Resource instance rule",
    "A firewall rule that allows a specific Azure resource instance, identified by its managed identity, to access the account."
   ],
   [
    "Malware scanning",
    "A Defender for Storage feature that scans uploaded blobs for malware and tags or alerts on results."
   ],
   [
    "Sensitive data threat detection",
    "Defender for Storage prioritization that uses Purview sensitive information types to flag threats to accounts holding sensitive data."
   ]
  ],
  "example": "A web portal lets customers upload documents to a storage account. You set public access to selected networks, allowing only the app's subnet, enable Defender for Storage with on-upload malware scanning, and use an Event Grid subscription to trigger a Function that moves any blob tagged as malicious into a quarantine container.",
  "tip": "Private IP ranges cannot be added to the storage IP firewall; use VNet rules or private endpoints. If a Microsoft service like Azure Backup fails after locking the firewall, the fix is the trusted services exception or a resource instance rule.",
  "check": [
   [
    "What must a subnet have before you can add it as a storage virtual network rule?",
    "The Microsoft.Storage service endpoint enabled on that subnet."
   ],
   [
    "Where are Defender for Storage malware scan results stored on the blob?",
    "As blob index tags, and they can also be sent to Event Grid, Log Analytics and Defender for Cloud alerts."
   ],
   [
    "How do you allow one specific Data Factory, but not all trusted services, through the firewall?",
    "Add a resource instance rule for that Data Factory resource."
   ]
  ]
 },
 {
  "t": "Azure SQL security: Entra-only authentication, server and database firewall rules, TDE with CMK, Always Encrypted, dynamic data masking, auditing, Defender for SQL",
  "body": [
   "Azure SQL Database and Azure SQL Managed Instance offer layered protection: who can reach the server, who can authenticate, what they can see, and how activity is watched. Knowing which feature addresses which threat is the core of this topic.",
   "For authentication, you can use SQL authentication (username and password stored in the database), Microsoft Entra authentication, or both. Setting a Microsoft Entra admin for the server and then enabling Microsoft Entra-only authentication disables SQL logins entirely, including the server admin login, so all access uses Entra identities with MFA, Conditional Access and managed identities. Database users for Entra principals are created with `CREATE USER [name] FROM EXTERNAL PROVIDER`. Azure Policy can audit or enforce Entra-only authentication.",
   "Network access is controlled by firewall rules. Server-level IP firewall rules apply to all databases on the logical server and are managed in the portal or with `sp_set_firewall_rule` in master. Database-level IP firewall rules, set with `sp_set_database_firewall_rule`, apply only to one database and travel with it, which is useful for geo-replication. The 'Allow Azure services and resources to access this server' setting permits any Azure-hosted IP, including other customers', so disable it where possible. Better options are virtual network rules through service endpoints, private endpoints with public network access denied, and a minimum TLS version.",
   "Transparent data encryption (TDE) encrypts database files, backups and logs at rest and is on by default with a service-managed key. With TDE customer-managed keys (bring your own key), the TDE protector is an asymmetric key in Key Vault or Managed HSM, accessed by the server's managed identity; revoking it makes the databases inaccessible. TDE protects the storage media, not data from a user who can query the database.",
   "Always Encrypted protects sensitive columns, such as national ID numbers, from everyone who lacks the column master key, including database administrators and cloud operators. Encryption and decryption happen in the client driver; the database engine only sees ciphertext. A column encryption key encrypts the data and is itself protected by a column master key stored outside the database, often in Key Vault. Deterministic encryption allows equality lookups; randomized encryption is stronger but not searchable. Always Encrypted with secure enclaves adds richer queries.",
   "Dynamic data masking hides parts of values in query results for non-privileged users, for example showing `XXXX-XXXX-XXXX-1234` for a card number, using masking functions such as default, email, random and partial. It is a convenience to limit exposure, not encryption; the data is unchanged, and users with the UNMASK permission see it clearly.",
   "Auditing writes database events to a storage account, a Log Analytics workspace or Event Hubs, at server or database level. Microsoft Defender for SQL adds vulnerability assessment (scans for misconfigurations with a baseline) and Advanced Threat Protection, which alerts on SQL injection, suspicious logins, brute force attempts and anomalous data export."
  ],
  "terms": [
   [
    "Microsoft Entra-only authentication",
    "A server setting that disables SQL authentication so only Entra identities can sign in."
   ],
   [
    "TDE",
    "Transparent data encryption that encrypts database files, logs and backups at rest."
   ],
   [
    "Always Encrypted",
    "Client-side column encryption that keeps plaintext hidden from the database engine and its administrators."
   ],
   [
    "Dynamic data masking",
    "A policy that obfuscates column values in query results for users without UNMASK permission."
   ],
   [
    "Database-level firewall rule",
    "An IP rule stored in one database that applies only to that database."
   ]
  ],
  "example": "A healthcare app must keep patient IDs unreadable to DBAs, prevent password-based logins and alert on injection attempts. You enable Entra-only authentication, encrypt the PatientID column with Always Encrypted using a column master key in Key Vault, mask phone numbers for support staff with dynamic data masking and enable Defender for SQL.",
  "tip": "Hide data from DBAs: Always Encrypted. Hide data in results for low-privileged users: dynamic data masking. Protect disks and backups: TDE. Control the key yourself: TDE with CMK. Stop password logins: Entra-only authentication.",
  "check": [
   [
    "Which feature prevents a database administrator from viewing plaintext credit card numbers?",
    "Always Encrypted, because only clients with the column master key can decrypt."
   ],
   [
    "What is the scope difference between server-level and database-level firewall rules?",
    "Server-level rules apply to every database on the logical server; database-level rules apply to one database and move with it."
   ],
   [
    "Does dynamic data masking protect against a user with direct access to the data files?",
    "No, it only masks query results; the stored data is unchanged and unencrypted by it."
   ]
  ]
 },
 {
  "t": "Network security groups and application security groups, service tags, rule priority and default rules",
  "body": [
   "A network security group (NSG) is a stateful packet filter for Azure virtual networks. It holds inbound and outbound security rules and can be associated with a subnet, a network interface (NIC) or both. Stateful means return traffic for an allowed connection is automatically permitted, so you only write a rule for the direction the connection starts in.",
   "Each rule has a priority (a number from 100 to 4096), a name, source and destination (IP addresses, CIDR ranges, service tags or application security groups), ports, protocol (TCP, UDP, ICMP or Any) and an action of Allow or Deny. Rules are processed in priority order, lowest number first, and processing stops at the first match. So a Deny at 200 beats an Allow at 300 for the same traffic.",
   "Every NSG has default rules at priorities 65000 to 65500 that you cannot delete, only override with lower-numbered rules. Inbound: AllowVNetInBound (traffic from the VirtualNetwork tag), AllowAzureLoadBalancerInBound and DenyAllInBound. Outbound: AllowVnetOutBound, AllowInternetOutBound and DenyAllOutBound. The practical effect is that traffic inside the virtual network (and peered or VPN-connected networks) is allowed, inbound from the internet is denied, and outbound to the internet is allowed until you restrict it.",
   "When NSGs are on both the subnet and the NIC, inbound traffic is evaluated by the subnet NSG first and then the NIC NSG; outbound goes NIC first, then subnet. Traffic must be allowed by both. A common mistake is opening a port on the NIC NSG and forgetting the subnet NSG.",
   "Service tags are Microsoft-managed names for groups of IP prefixes, such as `Internet`, `VirtualNetwork`, `AzureLoadBalancer`, `Storage`, `Sql`, `AzureMonitor` or regional versions like `Storage.WestEurope`. Microsoft updates the prefixes automatically, so you avoid maintaining long IP lists. For example, an outbound rule allowing `Storage` on 443 and a lower-priority rule denying `Internet` lets VMs reach Azure Storage but nothing else on the internet.",
   "Application security groups (ASGs) let you group NICs by workload role, such as asg-web and asg-db, and use those names as sources and destinations in NSG rules. Instead of rules with IP addresses that change as VMs scale, you write 'allow asg-web to asg-db on 1433'. A NIC can belong to several ASGs, but all NICs in an ASG must be in the same virtual network.",
   "Use Network Watcher's effective security rules and IP flow verify to see which rule is actually affecting a VM."
  ],
  "terms": [
   [
    "Network security group",
    "A stateful set of allow and deny rules applied to subnets or NICs."
   ],
   [
    "Rule priority",
    "A number from 100 to 4096; lower numbers are processed first and the first match wins."
   ],
   [
    "Service tag",
    "A Microsoft-maintained label representing the IP prefixes of an Azure service or category, such as Storage or Internet."
   ],
   [
    "Application security group",
    "A logical grouping of NICs used as a source or destination in NSG rules instead of IP addresses."
   ]
  ],
  "example": "A three-tier app has web, app and database VMs in one subnet. You create ASGs for each tier and an NSG with rules: allow Internet to asg-web on 443 (priority 100), allow asg-web to asg-app on 8080 (110), allow asg-app to asg-db on 1433 (120), and deny VirtualNetwork to asg-db on any port (200) so web servers cannot reach the database directly.",
  "tip": "Lowest priority number wins and evaluation stops at the first match. Default rules allow all VNet-to-VNet traffic, so micro-segmentation inside a VNet needs explicit deny rules above 65000. Inbound: subnet then NIC; outbound: NIC then subnet.",
  "check": [
   [
    "An NSG has Allow TCP 3389 at priority 300 and Deny any at priority 200 for the same source. Is RDP allowed?",
    "No, the Deny at 200 is evaluated first and matches."
   ],
   [
    "Which default rule allows traffic between VMs in peered virtual networks?",
    "AllowVNetInBound, because the VirtualNetwork service tag includes peered and connected address spaces."
   ],
   [
    "Why use ASGs rather than IP addresses in rules?",
    "Rules follow workload roles, so scaling or re-IPing VMs does not require rule changes."
   ]
  ]
 },
 {
  "t": "Azure Virtual Network Manager security admin rules vs NSGs",
  "body": [
   "In a large organization, individual application teams usually manage the NSGs on their own subnets. That is flexible, but it makes it hard for a central security team to guarantee that certain traffic, such as inbound RDP and SSH from the internet, is blocked everywhere. Azure Virtual Network Manager (AVNM) addresses this by letting a central team define connectivity and security configurations once and deploy them across many virtual networks, subscriptions and regions.",
   "AVNM works with network groups, which are sets of virtual networks gathered statically (you pick them) or dynamically (through Azure Policy conditions, such as all VNets with the tag env=prod). The manager's scope, one or more management groups or subscriptions, determines which VNets it can govern. You then create configurations and deploy them to chosen regions; nothing changes until a deployment is committed.",
   "A security admin configuration contains rule collections of security admin rules. These look like NSG rules (priority, direction, protocol, ports, source and destination) but have a different place in evaluation and three possible actions. Allow permits the traffic, and then NSGs are still evaluated and may deny it. Deny blocks the traffic and NSGs cannot override it. Always Allow permits the traffic and skips NSG evaluation, so NSGs cannot block it; that is useful for guaranteeing that monitoring or management traffic always gets through.",
   "The key idea is order of evaluation: security admin rules are evaluated before NSG rules. That means a central Deny for internet-sourced traffic to port 3389 wins no matter what any application team puts in their NSG. NSGs remain important for the fine-grained, application-specific rules that teams maintain themselves. Think of security admin rules as organization-wide guardrails and NSGs as local controls.",
   "Other differences: NSGs are attached to subnets or NICs one by one, while security admin rules apply to all VNets in a network group, including new VNets that join a dynamic group. NSGs are managed by resource owners with network permissions; security admin rules are managed by whoever has rights on the Network Manager. Security admin rules apply even to subnets that have no NSG at all.",
   "AVNM also provides connectivity configurations (hub-and-spoke or mesh topologies with automatic peering) and routing configurations, but for this exam the security admin rule behavior is the main point."
  ],
  "terms": [
   [
    "Azure Virtual Network Manager",
    "A central service that groups virtual networks and deploys connectivity and security configurations to them at scale."
   ],
   [
    "Network group",
    "A static or policy-driven dynamic set of virtual networks targeted by AVNM configurations."
   ],
   [
    "Security admin rule",
    "A centrally managed rule evaluated before NSGs, with Allow, Deny or Always Allow actions."
   ],
   [
    "Always Allow",
    "A security admin action that permits traffic and bypasses NSG evaluation for it."
   ]
  ],
  "example": "The security team creates a dynamic network group of all VNets tagged env=prod across 30 subscriptions and deploys a security admin rule that denies inbound traffic from the Internet service tag on ports 22 and 3389. A developer who later adds an NSG rule allowing RDP from anywhere finds that connections still fail, because the admin rule is evaluated first.",
  "tip": "Order is security admin rules, then NSGs. Deny at the admin layer cannot be overridden; Allow still lets NSGs deny; Always Allow skips NSGs entirely. Choose AVNM when a question asks to enforce rules centrally that local teams cannot bypass.",
  "check": [
   [
    "A security admin rule allows TCP 443 and an NSG denies it. What happens?",
    "The traffic is denied, because Allow at the admin layer still passes traffic to NSG evaluation."
   ],
   [
    "Which action guarantees monitoring traffic reaches VMs even if an NSG blocks it?",
    "Always Allow."
   ],
   [
    "How can new production VNets automatically receive security admin rules?",
    "Use a dynamic network group whose Azure Policy condition matches them, such as a tag."
   ]
  ]
 },
 {
  "t": "Private endpoints and Private Link vs service endpoints, private DNS zones",
  "body": [
   "Platform services such as Storage, SQL Database and Key Vault have public endpoints by default. Two features let you reach them from a virtual network without traversing the public internet, and the exam frequently asks you to choose between them.",
   "A virtual network service endpoint is enabled on a subnet for a service (for example `Microsoft.Storage`). Traffic from that subnet to the service then travels over the Azure backbone with the subnet's identity attached, and the service's firewall can allow that subnet by name. The service still uses its public IP address; your VMs just reach it via an optimized route. Service endpoints are free and simple, but they only work from within Azure VNets (not from on-premises over VPN or ExpressRoute in general), they apply to the whole service in a region unless you add service endpoint policies (supported for Storage) to restrict which accounts can be reached, and they do not stop data exfiltration to another customer's account of the same service on their own.",
   "A private endpoint is a network interface in your subnet with a private IP address from your address space, mapped to one specific resource (a particular storage account's blob sub-resource, one SQL server, one vault) through Azure Private Link. Clients connect to that private IP. Because it is a normal IP in your network, it is reachable from peered VNets and from on-premises over VPN or ExpressRoute. Because it maps to one resource, it inherently prevents reaching other customers' resources through it. You can then set the resource's public network access to Disabled. Private endpoints have an hourly and data processing cost.",
   "Azure Private Link is the underlying technology. Besides Microsoft services, you can expose your own service behind a Standard Load Balancer as a Private Link service so customers or other teams consume it through private endpoints in their networks.",
   "DNS is the part that trips people up. Clients still use the public name, such as `mystorage.blob.core.windows.net`. When a private endpoint is created, the public DNS record is changed to a CNAME pointing to `mystorage.privatelink.blob.core.windows.net`. You create an Azure private DNS zone named `privatelink.blob.core.windows.net`, link it to your VNets, and hold an A record for mystorage pointing to the private IP. The portal can do this automatically. Inside linked VNets the name resolves to the private IP; outside, it resolves to the public IP (which is now blocked). For on-premises clients, forward queries for the service's zone to Azure DNS through Azure DNS Private Resolver or a DNS forwarder VM in Azure.",
   "Test with `nslookup mystorage.blob.core.windows.net` from a VM: a 10.x or other private address means it worked; a public address means DNS is not set up."
  ],
  "terms": [
   [
    "Service endpoint",
    "A subnet setting that routes traffic to an Azure service over the backbone and lets the service firewall allow that subnet; the service keeps its public IP."
   ],
   [
    "Private endpoint",
    "A NIC with a private IP in your subnet mapped to one specific resource through Private Link."
   ],
   [
    "Private Link service",
    "Your own service behind a Standard Load Balancer, exposed to consumers through private endpoints."
   ],
   [
    "Private DNS zone",
    "An Azure DNS zone, such as privatelink.blob.core.windows.net, that resolves service names to private endpoint IPs for linked VNets."
   ]
  ],
  "example": "On-premises analysts must query an Azure SQL database over ExpressRoute with no public exposure. You create a private endpoint for the SQL server in a hub subnet, link the privatelink.database.windows.net private DNS zone to the hub VNet, configure DNS Private Resolver with a conditional forwarder from on-premises DNS, and set public network access to Disabled.",
  "tip": "On-premises access, a private IP, per-resource scope and exfiltration protection point to private endpoints. Free, simple, subnet-level access with the public IP retained points to service endpoints. If a private endpoint 'doesn't work', suspect DNS first.",
  "check": [
   [
    "Which option allows on-premises clients to reach a storage account over VPN using a private IP?",
    "A private endpoint, with DNS resolving the name to its private IP."
   ],
   [
    "After creating a private endpoint, a VM still resolves the storage account to a public IP. What is missing?",
    "The privatelink private DNS zone with an A record, linked to the VM's VNet (or equivalent custom DNS)."
   ],
   [
    "Does a service endpoint change the destination IP address of the service?",
    "No, the service is still reached at its public IP; only the route and source identity change."
   ]
  ]
 },
 {
  "t": "Azure Firewall (Standard vs Premium: TLS inspection, IDPS, URL filtering), Firewall Manager and firewall policy, forced tunneling with user-defined routes",
  "body": [
   "Azure Firewall is a managed, stateful, highly available network firewall you deploy into a dedicated subnet named `AzureFirewallSubnet`, usually in a hub virtual network. Spoke networks send their traffic through it so you can centrally allow, deny and log east-west and north-south flows. It comes in Basic, Standard and Premium SKUs; this exam focuses on Standard versus Premium.",
   "Azure Firewall processes rules in collections of three kinds. DNAT rules translate inbound traffic arriving at the firewall's public IP to a private address, for example publishing a server. Network rules filter by source, destination IP, port and protocol (layer 3 and 4), and can use service tags and IP groups. Application rules filter outbound HTTP, HTTPS and SQL traffic by fully qualified domain name (FQDN) and FQDN tags such as WindowsUpdate. Rule processing goes DNAT, then network, then application rules, and within a type by collection priority. Standard also includes threat intelligence-based filtering, which alerts on or denies traffic to and from known malicious IP addresses and domains, and can act as a DNS proxy so FQDN filtering in network rules works reliably.",
   "Premium adds features for highly sensitive environments. TLS inspection decrypts outbound and east-west HTTPS traffic using an intermediate CA certificate you store in Key Vault, inspects it and re-encrypts it; clients must trust that CA. IDPS (intrusion detection and prevention system) uses signatures to detect and optionally block exploit attempts, malware communication and other attacks, in Alert or Alert and deny mode; it inspects encrypted traffic only when TLS inspection is on. URL filtering extends FQDN filtering to the full URL path, such as allowing `www.contoso.com/docs` but not other paths, which requires TLS inspection for HTTPS. Web categories let you allow or deny classes of sites (gambling, social media); Standard can use categories based on FQDN, while Premium can match on full URLs.",
   "Rules are best stored in a firewall policy, a standalone Azure resource that can be associated with one or more firewalls. Policies support inheritance: a parent (base) policy managed by central security can hold organization-wide rules, and child policies for each region or team inherit them and add their own. Premium features require a Premium policy. Azure Firewall Manager is the central management tool that lets you apply policies to many firewalls across hub VNets and Virtual WAN secured hubs, and integrate third-party security-as-a-service providers.",
   "To make traffic actually pass through the firewall you use user-defined routes (UDRs) in route tables associated with spoke subnets: a route for `0.0.0.0/0` with next hop type Virtual appliance and the firewall's private IP. Forced tunneling is a related but distinct idea: sending the firewall's own internet-bound traffic to an on-premises device or another appliance instead of directly out. It requires a separate `AzureFirewallManagementSubnet` so that the firewall's management traffic still reaches Azure, and is best configured at deployment time."
  ],
  "terms": [
   [
    "Application rule",
    "An Azure Firewall rule that allows or denies outbound traffic by FQDN or FQDN tag."
   ],
   [
    "TLS inspection",
    "A Premium feature that decrypts and re-encrypts HTTPS traffic using an intermediate CA certificate from Key Vault."
   ],
   [
    "IDPS",
    "Signature-based intrusion detection and prevention in Azure Firewall Premium."
   ],
   [
    "Firewall policy",
    "A resource holding firewall rules and settings, reusable across firewalls and supporting parent-child inheritance."
   ],
   [
    "User-defined route",
    "A custom route, such as 0.0.0.0/0 to the firewall's private IP, that overrides Azure's system routes."
   ]
  ],
  "example": "A bank requires that outbound HTTPS from workloads be inspected for malware and restricted to specific URL paths. You deploy Azure Firewall Premium in the hub, create a Premium firewall policy with TLS inspection using a CA certificate in Key Vault, enable IDPS in Alert and deny mode, add URL-based application rules, and associate a route table with spoke subnets sending 0.0.0.0/0 to the firewall.",
  "tip": "TLS inspection, IDPS and full URL filtering mean Premium. A firewall without a 0.0.0.0/0 UDR on spoke subnets inspects nothing. Forced tunneling requires the AzureFirewallManagementSubnet.",
  "check": [
   [
    "Which SKU is needed to block requests to a specific URL path on an HTTPS site?",
    "Premium, because URL filtering on HTTPS requires TLS inspection."
   ],
   [
    "How do you ensure VMs in a spoke send internet traffic through the hub firewall?",
    "Associate a route table with the spoke subnets containing a 0.0.0.0/0 route with next hop Virtual appliance at the firewall's private IP."
   ],
   [
    "How can a central team enforce baseline rules while regional teams add their own?",
    "Use a parent firewall policy with the baseline rules and child policies that inherit it, managed through Firewall Manager."
   ]
  ]
 },
 {
  "t": "Web Application Firewall on Application Gateway and Front Door, DDoS Protection",
  "body": [
   "A web application firewall (WAF) inspects HTTP and HTTPS requests at layer 7 and blocks common web attacks such as SQL injection, cross-site scripting, remote file inclusion and protocol violations. It complements, not replaces, secure coding. Azure Web Application Firewall can run in two places. On Azure Application Gateway, a regional layer 7 load balancer, it protects applications in one region, typically inside or in front of a virtual network. On Azure Front Door, a global edge service with anycast entry points, it filters traffic at Microsoft's edge before it reaches your origins, which suits global apps and stops bad traffic close to its source.",
   "Both use a WAF policy. Managed rule sets are maintained by Microsoft: the OWASP Core Rule Set (CRS) or the Microsoft Default Rule Set (DRS), plus the Bot Manager rule set for known good and bad bots. You can disable or change the action of individual rules and add exclusions for request fields that trigger false positives. Custom rules are evaluated before managed rules and let you match on IP address, geography, request headers, query strings or methods, with rate limiting to throttle clients that exceed a threshold.",
   "A WAF policy runs in Detection mode, which logs matches without blocking, or Prevention mode, which blocks. Start in Detection, review the logs (the Application Gateway firewall log or Front Door WAF log in Log Analytics), tune exclusions, then switch to Prevention. Newer rule sets use anomaly scoring: each matching rule adds to a score and the request is blocked when the score crosses a threshold, which reduces false positives.",
   "Azure DDoS protection defends against distributed denial of service attacks. Every Azure public IP gets basic infrastructure-level protection at no charge. Azure DDoS Protection (the Network Protection tier, enabled through a DDoS protection plan associated with virtual networks) adds adaptive tuning based on your traffic profile, attack telemetry and metrics, alerts, attack mitigation reports and flow logs, access to the DDoS Rapid Response team, and cost protection credits for scale-out during a documented attack. DDoS IP Protection is a per-public-IP option with the core mitigation features but fewer extras. DDoS Protection covers volumetric and protocol attacks at layers 3 and 4.",
   "The two services work together: DDoS Protection absorbs floods at the network layer, while the WAF handles application-layer attacks, including layer 7 floods through rate-limiting custom rules. Front Door's global edge also naturally absorbs large volumes.",
   "In the lab you will likely deploy an Application Gateway WAF_v2 with a WAF policy in Detection mode, send a request containing a harmless test string that resembles an injection pattern, and read the match in the firewall logs."
  ],
  "terms": [
   [
    "Web application firewall",
    "A layer 7 filter that inspects HTTP requests for attacks such as SQL injection and cross-site scripting."
   ],
   [
    "Managed rule set",
    "Microsoft-maintained WAF rules based on the OWASP Core Rule Set or Microsoft Default Rule Set."
   ],
   [
    "Custom rule",
    "A user-defined WAF rule, evaluated before managed rules, matching conditions such as IP, geography or rate."
   ],
   [
    "Detection mode",
    "A WAF mode that logs rule matches without blocking requests."
   ],
   [
    "DDoS Network Protection",
    "The paid Azure DDoS tier that adds adaptive tuning, telemetry, rapid response and cost protection for VNet resources."
   ]
  ],
  "example": "A global retail site suffers credential-stuffing bursts and occasional injection probes. You place it behind Azure Front Door with a WAF policy using the Microsoft Default Rule Set and Bot Manager rules, add a rate-limit custom rule on the login path, run in Detection for a week to tune exclusions, then switch to Prevention.",
  "tip": "Global, edge, multi-region: WAF on Front Door. Regional, in a VNet: WAF on Application Gateway. Layer 3/4 floods: DDoS Protection. Custom rules are processed before managed rules, and Detection mode never blocks.",
  "check": [
   [
    "A new WAF policy is causing false positives on a form field. What should you do?",
    "Add an exclusion for that request field (or tune the specific rule), ideally while running in Detection mode first."
   ],
   [
    "What does DDoS Network Protection add over the free basic protection?",
    "Adaptive tuning, attack telemetry and alerts, mitigation reports, rapid response support and cost protection."
   ],
   [
    "Which WAF placement blocks attacks closest to the attacker for a multi-region app?",
    "Azure Front Door, because it filters at Microsoft's global edge."
   ]
  ]
 },
 {
  "t": "Site-to-site and point-to-site VPN, Virtual WAN secured hubs, Microsoft Entra Private Access (ZTNA)",
  "body": [
   "Hybrid networks need secure ways to connect on-premises sites and remote users to Azure. Azure VPN Gateway provides encrypted tunnels over the internet using IPsec and IKE. It is deployed into a subnet that must be named `GatewaySubnet`.",
   "A site-to-site (S2S) VPN connects an entire on-premises network to an Azure virtual network through an IPsec/IKE tunnel between the Azure VPN gateway and an on-premises VPN device with a public IP address. You define a local network gateway (the on-premises device's IP and address prefixes) and a connection with a pre-shared key or, where supported, certificate authentication. Route-based gateways support BGP and multiple tunnels; active-active gateways improve availability. You can apply custom IPsec/IKE policies to require stronger algorithms. ExpressRoute is the private, non-internet alternative, and you can add IPsec over ExpressRoute when encryption is required on that path.",
   "A point-to-site (P2S) VPN connects individual client devices, such as a laptop at home, to the virtual network. Protocols include OpenVPN, IKEv2 and SSTP. Authentication can use certificates, RADIUS (which can integrate with existing directories and MFA) or Microsoft Entra ID with the Azure VPN Client, which is OpenVPN-only and lets Conditional Access and MFA protect the VPN sign-in. Entra authentication is the modern, identity-centric choice.",
   "Azure Virtual WAN is a Microsoft-managed networking service that combines branch (S2S), user (P2S), ExpressRoute and VNet-to-VNet connectivity through regional hubs with automatic transit routing. When you deploy Azure Firewall into a Virtual WAN hub and manage it with Firewall Manager, it becomes a secured virtual hub. Routing intent and routing policies then let you send internet traffic, private traffic (between VNets and branches) or both through the hub firewall, without maintaining UDRs in every spoke. Third-party security partners can also be integrated for internet traffic.",
   "Traditional VPNs give a connected user broad network access, which lets an attacker who compromises one laptop move laterally. Zero Trust network access (ZTNA) instead grants access per application after verifying identity and device, and never places the user 'on the network'. Microsoft Entra Private Access, part of Microsoft's Global Secure Access (Security Service Edge) offering, provides ZTNA to private applications on-premises or in any cloud. A Global Secure Access client on the device sends traffic for defined private app segments (by FQDN or IP and port) to Microsoft's edge, which forwards it through lightweight connectors installed near the apps. Because each app is an enterprise application in Entra, you can apply Conditional Access policies, including MFA and compliant device requirements, per app, and use Quick Access to replace a legacy VPN broadly before segmenting further.",
   "The sibling service, Microsoft Entra Internet Access, is a secure web gateway for internet and Microsoft 365 traffic; together they form Microsoft's SSE solution."
  ],
  "terms": [
   [
    "Site-to-site VPN",
    "An IPsec/IKE tunnel connecting an on-premises network's VPN device to an Azure VPN gateway."
   ],
   [
    "Point-to-site VPN",
    "A VPN from individual client devices to an Azure virtual network using OpenVPN, IKEv2 or SSTP."
   ],
   [
    "Secured virtual hub",
    "A Virtual WAN hub with Azure Firewall managed by Firewall Manager, with routing intent to inspect traffic."
   ],
   [
    "ZTNA",
    "Zero Trust network access, granting per-application access after identity and device checks instead of network-wide access."
   ],
   [
    "Microsoft Entra Private Access",
    "Microsoft's ZTNA service that publishes private apps through Global Secure Access with Conditional Access per app."
   ]
  ],
  "example": "A company's remote workers use a legacy VPN that gives full network access. It deploys Microsoft Entra Private Access connectors in the data center, defines the finance app's FQDN and port as a private app, and creates a Conditional Access policy requiring phishing-resistant MFA and a compliant device for that app. Users reach only the finance app, not the whole network.",
  "tip": "Whole site to Azure: site-to-site. Individual laptops: point-to-site (with Entra auth for MFA and Conditional Access). Central inspection of Virtual WAN traffic: secured hub with routing intent. Per-app access without network-level VPN: Entra Private Access.",
  "check": [
   [
    "Which P2S authentication method lets you enforce Conditional Access on VPN sign-in?",
    "Microsoft Entra ID authentication with the Azure VPN Client over OpenVPN."
   ],
   [
    "What turns a Virtual WAN hub into a secured hub?",
    "Deploying Azure Firewall (or a supported security provider) into it and managing it with Firewall Manager."
   ],
   [
    "How does ZTNA reduce lateral movement compared to a traditional VPN?",
    "Users get access only to specific applications after verification, not a route to the entire network."
   ]
  ]
 },
 {
  "t": "Network Watcher: IP flow verify, effective security rules, VNet flow logs and traffic analytics",
  "body": [
   "Azure Network Watcher is a regional set of tools for monitoring and diagnosing IaaS networking. It is enabled automatically per region when you create a virtual network. For security engineers, it answers two kinds of question: why is this traffic being allowed or blocked, and what traffic is actually flowing?",
   "IP flow verify tests whether a packet with a given source, destination, port and protocol would be allowed to or from a specific VM NIC. It evaluates the effective NSG rules (and security admin rules) and returns Allow or Deny plus the name of the rule that made the decision. Use it when someone says 'I can't connect on port 443' to find out in seconds whether an NSG is the cause.",
   "Effective security rules shows the combined set of rules applied to a NIC, merging the subnet NSG, the NIC NSG and default rules, including the expansion of service tags and ASGs into prefixes. It is how you see the real policy when several layers overlap. For routing problems there is the related Next hop tool and the NIC's effective routes view, which reveal whether a UDR is sending traffic to a firewall or a blackhole.",
   "Other diagnostics include Connection troubleshoot (tests a connection end to end and reports where it fails), Connection monitor (continuous reachability and latency tests), packet capture (records traffic on a VM through the Network Watcher extension) and VPN troubleshoot for gateway issues.",
   "Flow logs record IP traffic metadata: source and destination IP, ports, protocol, whether the flow was allowed or denied, and byte and packet counts. NSG flow logs were the original version, recorded per NSG. VNet flow logs are the newer approach and are recommended: they are enabled at the virtual network, subnet or NIC level, capture traffic regardless of whether an NSG exists, and also record decisions by security admin rules and encryption status for virtual network encryption. Microsoft has announced the retirement of NSG flow logs in favor of VNet flow logs. Flow logs are written as JSON to a storage account, with a retention setting.",
   "Traffic analytics processes flow logs and sends aggregated, enriched results to a Log Analytics workspace, at a processing interval such as every 10 minutes or every hour. Its dashboards and the underlying tables show top talkers, traffic to and from the internet, flows from known malicious IPs, open ports, blocked traffic trends and traffic by region and application. You can query the data with KQL and feed it to Microsoft Sentinel.",
   "Typical workflow: enable VNet flow logs to a storage account with traffic analytics on, then use IP flow verify and effective security rules when a specific connection problem comes up."
  ],
  "terms": [
   [
    "IP flow verify",
    "A Network Watcher tool that tests whether a specific packet is allowed or denied to or from a VM and names the deciding rule."
   ],
   [
    "Effective security rules",
    "The merged view of all NSG and default rules that actually apply to a NIC."
   ],
   [
    "VNet flow logs",
    "Flow records captured at the virtual network, subnet or NIC level, independent of NSGs, stored in a storage account."
   ],
   [
    "Traffic analytics",
    "A feature that aggregates flow logs into Log Analytics for dashboards, queries and threat insights."
   ]
  ],
  "example": "After a change, an app server can no longer reach its database on 1433. IP flow verify reports Deny by the rule DenyAppOut in the NIC's NSG. Effective security rules confirms it has a lower priority number than the intended allow rule. You fix the priority, and traffic analytics later shows the database flows returning.",
  "tip": "Is a specific packet allowed and which rule decided? IP flow verify. What rules are in force on a NIC? Effective security rules. Where is traffic going? Next hop. What traffic flowed historically? Flow logs with traffic analytics.",
  "check": [
   [
    "Which tool names the exact NSG rule that blocks a connection to a VM?",
    "IP flow verify."
   ],
   [
    "What is an advantage of VNet flow logs over NSG flow logs?",
    "They are enabled at the VNet, subnet or NIC and capture traffic even without an NSG, including security admin rule decisions."
   ],
   [
    "Where does traffic analytics store its processed results?",
    "In a Log Analytics workspace, where they can be queried with KQL."
   ]
  ]
 },
 {
  "t": "Security for AI: Defender for AI services threat protection, prompt injection and jailbreak alerts, Azure AI Content Safety Prompt Shields",
  "body": [
   "Generative AI applications bring new attack surfaces. A large language model (LLM) follows instructions written in natural language, so an attacker can try to change its behavior with words instead of code. Two terms matter most. A direct prompt injection, often called a jailbreak, is a user prompt crafted to make the model ignore its system instructions or safety rules, for example asking it to role-play a character with no restrictions. An indirect prompt injection hides instructions inside content the model processes, such as a web page, email or document retrieved for grounding, so that the model follows the attacker's hidden text when summarizing it. Other risks include sensitive data leakage, wallet abuse (running up token costs) and misuse of connected tools.",
   "Azure AI Content Safety is a service that screens text and images. Its harm categories filter hate, sexual, violence and self-harm content at configurable severity levels. Prompt Shields is the Content Safety feature aimed at injection: it analyzes user prompts for jailbreak attempts and analyzes documents or other grounding content for indirect attacks, returning whether an attack was detected so the application can block or handle it. In Azure OpenAI and Microsoft Foundry deployments, Prompt Shields and the harm filters are configured as part of content filters (guardrails) attached to a model deployment, and they can also be called directly by an application. Other related features include groundedness detection and protected material detection.",
   "Microsoft Defender for AI services is the Defender for Cloud workload protection plan for AI. When enabled on a subscription, it provides threat protection for Azure OpenAI and Foundry model deployments, using signals such as Prompt Shields results and Microsoft threat intelligence. It raises security alerts for jailbreak attempts, suspected credential or sensitive data exposure in model responses, access from suspicious IP addresses, anomalous use patterns suggesting wallet abuse, and similar AI-specific threats. Alerts appear in Defender for Cloud and Defender XDR with the details a SOC needs, and you can optionally enable a setting to include suspicious prompt evidence in alerts, which should be governed because prompts may contain personal data.",
   "Defender for Cloud's AI security posture management, part of Defender CSPM, complements runtime alerts by discovering AI workloads and models (an AI bill of materials), flagging misconfigurations and showing attack paths to AI resources.",
   "Defense in depth for AI apps combines: content filters with Prompt Shields on every deployment; system prompts that clearly separate instructions from data; least-privilege managed identities for any tools the model can call; network isolation with private endpoints; key-less (Entra) authentication; logging of prompts and responses where policy allows; and Defender for AI services for detection. No single control stops every injection, which is why layering and monitoring matter."
  ],
  "terms": [
   [
    "Jailbreak",
    "A direct prompt injection in which a user tries to make a model ignore its instructions or safety rules."
   ],
   [
    "Indirect prompt injection",
    "Malicious instructions hidden in documents or data that a model processes, rather than typed by the user."
   ],
   [
    "Prompt Shields",
    "An Azure AI Content Safety feature that detects jailbreak attempts in prompts and indirect attacks in documents."
   ],
   [
    "Defender for AI services",
    "A Defender for Cloud plan that raises threat alerts for Azure OpenAI and Foundry model deployments."
   ]
  ],
  "example": "A customer-service chatbot built on a Foundry model summarizes support emails. An attacker sends an email containing hidden text telling the bot to reveal internal policies. Prompt Shields flags an indirect attack in the document, the app drops that content, and Defender for AI services raises an alert that the SOC investigates in Defender XDR.",
  "tip": "Know the pairing: Prompt Shields is the prevention layer inside the request path (content filtering); Defender for AI services is the detection layer producing security alerts. User prompts carry jailbreaks; documents carry indirect injections.",
  "check": [
   [
    "What is the difference between a jailbreak and an indirect prompt injection?",
    "A jailbreak is typed by the user directly; an indirect injection is hidden in external content such as a document the model processes."
   ],
   [
    "Which Azure feature can block a jailbreak attempt before it reaches the model?",
    "Prompt Shields in Azure AI Content Safety, configured through the deployment's content filter or called by the app."
   ],
   [
    "Where do Defender for AI services alerts appear?",
    "In Microsoft Defender for Cloud and the Defender XDR portal, and can be streamed to Sentinel."
   ]
  ]
 },
 {
  "t": "Microsoft Purview DSPM for AI to find data overexposure to Microsoft 365 Copilot and AI apps",
  "body": [
   "Microsoft 365 Copilot answers questions using the data the signed-in user can already access in Microsoft 365: SharePoint sites, OneDrive files, Teams messages and email. It does not bypass permissions, but it makes existing permissions far more visible. If a salary spreadsheet sits in a site shared with 'Everyone except external users', anyone could always find it; now anyone can ask Copilot to summarize it. This oversharing problem, plus employees pasting sensitive data into third-party AI sites, is what Data Security Posture Management for AI (DSPM for AI) in Microsoft Purview addresses. Microsoft has been bringing DSPM for AI together with a broader Purview Data Security Posture Management experience, so the portal naming may vary.",
   "DSPM for AI is found in the Microsoft Purview portal. It gives a central view of AI activity: which AI apps are used (Microsoft 365 Copilot, Copilot agents, Microsoft Foundry and other enterprise AI apps, and consumer generative AI sites visited through browsers), how many prompts and responses contain sensitive information types, and which users are behaving riskily. It relies on other Purview components: the unified audit log for AI interaction events, sensitivity labels and sensitive information types for classification, the Microsoft Purview browser extension or Edge integration and endpoint onboarding for third-party AI site visibility, and Insider Risk Management for risky AI usage indicators.",
   "Data risk assessments are the oversharing tool. A default assessment runs for the most active SharePoint sites, and you can create custom ones for chosen sites. They report sites with broad sharing links, sites whose files are accessed by many users, unlabeled sensitive files, and similar exposure indicators. From the results you can take remediation actions: restrict access through SharePoint Advanced Management features such as restricted content discovery or site access restriction, remove 'anyone' and organization-wide links, apply sensitivity labels, or start a site access review by owners.",
   "DSPM for AI also offers one-click policies, sometimes called recommendations, that create pre-configured policies across Purview solutions. Examples include a data loss prevention (DLP) policy to block or warn when users paste sensitive information into generative AI sites, a DLP policy for Microsoft 365 Copilot that prevents it from processing files or emails with certain sensitivity labels, Insider Risk policies for risky AI usage, and collection policies that capture prompts and responses for investigation, eDiscovery and communication compliance.",
   "Sensitivity labels matter to Copilot directly: when a label applies encryption without the EXTRACT usage right for a user, Copilot cannot use that content for them, and Copilot responses inherit the most restrictive label of the sources used. So good labeling reduces AI data exposure.",
   "A practical rollout is: turn on auditing, run the oversharing assessment before broad Copilot licensing, fix the worst sites, deploy the recommended DLP and label policies, then monitor DSPM for AI reports continuously."
  ],
  "terms": [
   [
    "DSPM for AI",
    "A Microsoft Purview solution that discovers AI usage, sensitive data in prompts and responses, and oversharing risks."
   ],
   [
    "Oversharing",
    "Content accessible to far more people than need it, which Copilot can surface to any of them."
   ],
   [
    "Data risk assessment",
    "A DSPM for AI report that finds overshared SharePoint sites and files and suggests remediation."
   ],
   [
    "Sensitivity label",
    "A Purview classification that can encrypt and mark content and that Copilot honors when accessing or generating data."
   ]
  ],
  "example": "Before rolling out Microsoft 365 Copilot to 5,000 users, the security team runs a DSPM for AI data risk assessment. It finds an HR site with an organization-wide link containing unlabeled payroll files. They remove the link, apply a Highly Confidential label, and enable the recommended DLP policy that blocks pasting sensitive data into third-party AI sites.",
  "tip": "Copilot never grants new access; it exposes existing overpermissions. When a question asks how to find overshared content before a Copilot rollout, choose DSPM for AI data risk assessments. When it asks how to stop sensitive data being pasted into consumer AI sites, choose the DLP policy offered through DSPM for AI.",
  "check": [
   [
    "Does Microsoft 365 Copilot let users read files they have no permission to open?",
    "No, it respects existing permissions; the risk is that overly broad permissions become easy to exploit."
   ],
   [
    "Which Purview capability supplies the AI interaction events that DSPM for AI reports on?",
    "Microsoft Purview Audit (the unified audit log)."
   ],
   [
    "What action reduces Copilot exposure for a site found to be overshared?",
    "Remove broad sharing links or restrict site access, apply sensitivity labels and have owners review access."
   ]
  ]
 },
 {
  "t": "AI Gateway in Azure API Management in front of Microsoft Foundry models: managed identity authentication, token limits, logging",
  "body": [
   "When many applications call AI models directly, each needs model keys, each can consume unlimited tokens, and nobody has a central record of usage. Azure API Management (APIM) can act as an AI gateway in front of Microsoft Foundry and Azure OpenAI model endpoints to fix that. Clients call the APIM endpoint; APIM applies policies and forwards requests to the model backend. Microsoft uses the term 'AI gateway' for this set of generative AI capabilities in APIM.",
   "APIM policies are XML statements in the inbound, backend, outbound and on-error sections of an API. For AI scenarios, the most important are the authentication, token limit, token metric, load balancing and caching policies.",
   "Authentication is split into two hops. From APIM to the model, use APIM's managed identity instead of an API key: enable a system-assigned or user-assigned identity on the APIM instance, grant it a role such as Cognitive Services OpenAI User (or the equivalent Foundry user role) on the model resource, and add the `authentication-managed-identity` policy with the Cognitive Services resource as the audience. You can then disable key-based (local) authentication on the model resource altogether. From clients to APIM, require APIM subscription keys at minimum, and preferably validate Entra tokens with the `validate-jwt` or `validate-azure-ad-token` policy so each caller has an identity. This means no application ever holds a model key.",
   "Token limits protect budgets and capacity. The `llm-token-limit` policy (and the older `azure-openai-token-limit`) enforces a tokens-per-minute rate and optionally a token quota over a longer period, per counter key such as the subscription ID or client IP. Requests over the limit receive a 429 Too Many Requests response. It can estimate prompt tokens before sending the request, blocking oversized prompts early. This defends against wallet abuse and a single noisy app starving others.",
   "Logging and metrics give visibility. The `llm-emit-token-metric` policy sends prompt, completion and total token counts to Application Insights with custom dimensions such as client, API or user, so you can charge back and spot anomalies. APIM diagnostic settings can send gateway logs, including LLM request and response logging where enabled, to a Log Analytics workspace. Be careful: logging full prompts may capture personal data, so apply retention and access controls.",
   "Other gateway features include backend pools with load balancing and circuit breakers across multiple model deployments or regions, semantic caching to reuse answers to similar prompts, and content safety policies that call Azure AI Content Safety before forwarding requests. Placing APIM in a virtual network with private endpoints to the models keeps traffic private."
  ],
  "terms": [
   [
    "AI gateway",
    "The set of Azure API Management capabilities for governing and securing access to AI model endpoints."
   ],
   [
    "authentication-managed-identity",
    "An APIM policy that obtains an Entra token using APIM's managed identity to call a backend."
   ],
   [
    "llm-token-limit",
    "An APIM policy that enforces tokens-per-minute rates and token quotas per key, returning 429 when exceeded."
   ],
   [
    "Token metrics",
    "Prompt, completion and total token counts emitted by APIM to Application Insights for monitoring and chargeback."
   ]
  ],
  "example": "Five internal apps share an Azure OpenAI deployment, and one runaway script consumed the month's budget. You front the model with APIM, grant APIM's managed identity the OpenAI user role, disable local keys on the model, apply llm-token-limit per subscription, and emit token metrics to Application Insights so each team's usage is visible.",
  "tip": "APIM-to-model auth uses APIM's managed identity plus an RBAC role, which lets you disable model API keys. Overuse protection is the token limit policy (429 on excess); usage visibility is the token metric policy plus Application Insights and Log Analytics.",
  "check": [
   [
    "How can APIM call a Foundry model without storing an API key?",
    "Enable APIM's managed identity, grant it the model user role, and use the authentication-managed-identity policy."
   ],
   [
    "What response does a client receive when it exceeds the configured token limit?",
    "HTTP 429 Too Many Requests."
   ],
   [
    "Why be careful when logging full prompts and completions?",
    "They can contain personal or sensitive data, so logging needs access controls and retention limits."
   ]
  ]
 },
 {
  "t": "Microsoft Entra Agent ID: agent identities, Conditional Access and access management for AI agents",
  "body": [
   "AI agents are software that can plan and take actions, such as reading tickets, calling APIs or sending messages, often without a human in the loop for each step. Treating them as ordinary apps with shared secrets, or letting them run with a human's full permissions, makes it hard to know what an agent can do and to stop it when it misbehaves. Microsoft Entra Agent ID is Microsoft's approach to giving agents first-class identities in Microsoft Entra, so they can be inventoried, governed and protected like users and workloads. It is a newer capability, so expect its portal screens and names to evolve; focus on the concepts.",
   "An agent identity is an identity in the directory that represents a specific AI agent. Agents built with Microsoft platforms such as Copilot Studio and Microsoft Foundry can be given agent identities automatically. They are created from an agent identity blueprint, a template that defines the kind of agent and the permissions and credentials its instances share, so many instances can be managed consistently. Each agent has a sponsor or owner, a human accountable for its life cycle. In the Entra admin center, an agent registry or inventory lets administrators see all agents, who owns them and what they have access to.",
   "Agents can act in two ways. They can act on their own behalf with app-only permissions, like a daemon service, or on behalf of a user with delegated permissions, in which case the agent can do no more than that user. Least privilege applies strongly: grant only the specific API permissions and resource roles each agent needs, prefer delegated access where a human is involved, and avoid broad application permissions.",
   "Conditional Access can target agent identities, much like it targets workload identities. You can create policies that block agents based on risk or restrict which resources they can access, and Entra ID Protection extends risk detection to agents, flagging anomalous behavior such as unusual resource access so a risk-based policy can block the agent. Access management features from Entra ID Governance, such as access packages, access reviews and life cycle workflows, can be applied so that agents' permissions are time-bound, reviewed and removed when the sponsor leaves or the agent is retired.",
   "Sign-in and audit logs record agent activity, distinguishing agents from users and ordinary service principals, which supports investigations in Microsoft Sentinel or Defender XDR. Combined with Purview for data protection and Defender for threat detection, this gives a governance loop for agents: know them, limit them, watch them and shut them down if needed.",
   "For the exam, remember the core pattern: every agent has its own identity with an accountable human, least-privilege permissions, Conditional Access and risk protection, and periodic review."
  ],
  "terms": [
   [
    "Microsoft Entra Agent ID",
    "Entra capabilities that give AI agents their own directory identities for inventory, access control and protection."
   ],
   [
    "Agent identity",
    "A directory identity representing a specific AI agent, distinct from users and ordinary app service principals."
   ],
   [
    "Agent identity blueprint",
    "A template from which agent identities are created, defining shared configuration and permissions."
   ],
   [
    "Sponsor",
    "The human accountable for an agent's purpose, access and life cycle."
   ]
  ],
  "example": "A team builds a Copilot Studio agent that files IT tickets. It receives its own agent identity with a named sponsor, is granted only permission to create tickets in the service desk API, and is covered by a Conditional Access policy that blocks it when ID Protection flags high agent risk. A quarterly access review asks the sponsor to confirm it is still needed.",
  "tip": "The answer to 'how do we govern AI agents' mirrors workload identity governance: a unique identity per agent, an accountable owner, least-privilege permissions, Conditional Access and risk policies, and access reviews. Avoid answers that share a human's credentials with an agent.",
  "check": [
   [
    "Why give each AI agent its own identity rather than letting it use a developer's account?",
    "So its permissions can be limited, its actions audited separately, and it can be blocked or retired without affecting the human."
   ],
   [
    "When an agent acts on behalf of a user, what limits its access?",
    "The delegated permissions granted to the agent and the signed-in user's own permissions."
   ],
   [
    "Which Entra feature can block an agent flagged as risky?",
    "A risk-based Conditional Access policy targeting agent identities, fed by Entra ID Protection."
   ]
  ]
 },
 {
  "t": "VM disk protection: encryption at host, Azure Disk Encryption, server-side encryption with customer-managed keys",
  "body": [
   "Azure virtual machine disks are managed disks stored in Azure Storage. Several encryption options exist, and they differ in where encryption happens, who controls keys and what is covered.",
   "Server-side encryption (SSE) of managed disks is always on. Data is encrypted at rest in the storage layer with AES-256 using platform-managed keys by default. With customer-managed keys, you create a disk encryption set, a resource that points to a key in Key Vault or Managed HSM and has a managed identity with rights to wrap and unwrap that key; then you associate disks with the disk encryption set. You can enable automatic key rotation so disks follow new key versions. SSE is transparent to the OS and works with all OS types, but it protects data only once it lands in storage; temporary disks and caches on the host are not covered by SSE alone.",
   "Encryption at host closes that gap. When enabled on a VM (after the feature is registered on the subscription), data is encrypted on the physical host server where the VM runs, including the temporary disk and the OS and data disk caches, and flows encrypted to the storage service. It uses the same platform-managed or customer-managed keys as the disk's SSE configuration. It does not use the VM's CPU and requires no agent inside the guest. Microsoft now recommends encryption at host, together with SSE and CMK as needed, as the preferred approach for end-to-end disk encryption.",
   "Azure Disk Encryption (ADE) is the older, guest-based option. It uses BitLocker on Windows and DM-Crypt on Linux inside the VM, installed through a VM extension, with keys (and optionally a key encryption key) stored in Key Vault, which must have the enabled-for-disk-encryption access setting. Because encryption runs in the guest, it consumes VM CPU, does not support every OS image or VM size, and has limitations with some features. Microsoft has announced the retirement of ADE, so new designs should use encryption at host instead; however, you may still see ADE in exam questions and existing environments.",
   "Confidential disk encryption, for confidential VMs, binds disk encryption keys to the VM's vTPM, protecting against even host-level access; it is a specialized option.",
   "Decision summary: choose SSE with CMK when you need to control and revoke the keys; add encryption at host to cover temp disks and caches end to end; recognize ADE as the legacy guest OS approach that shows the volume as encrypted inside the VM. You can also use Azure Policy to require encryption at host or disk encryption sets on all VMs, and Defender for Cloud recommends enabling encryption at host."
  ],
  "terms": [
   [
    "Server-side encryption",
    "Always-on AES-256 encryption of managed disks at rest in Azure Storage, with platform or customer-managed keys."
   ],
   [
    "Disk encryption set",
    "A resource linking managed disks to a customer-managed key in Key Vault or Managed HSM through a managed identity."
   ],
   [
    "Encryption at host",
    "Encryption performed on the VM's physical host so temp disks and caches are encrypted before reaching storage."
   ],
   [
    "Azure Disk Encryption",
    "Legacy guest-based encryption using BitLocker or DM-Crypt with keys in Key Vault, scheduled for retirement."
   ]
  ],
  "example": "A regulated workload must control its own keys and ensure no unencrypted data lands on temporary disks. You create a disk encryption set pointing to an RSA key in a purge-protected vault, attach the VM's disks to it, register and enable encryption at host on the VM, and assign an Azure Policy that audits VMs lacking encryption at host.",
  "tip": "Temp disk and cache coverage without an in-guest agent means encryption at host. Customer control of keys for managed disks means a disk encryption set. BitLocker or DM-Crypt inside the guest means Azure Disk Encryption, which is the legacy option.",
  "check": [
   [
    "Which option encrypts a VM's temporary disk without running code in the guest OS?",
    "Encryption at host."
   ],
   [
    "What resource is required to use customer-managed keys for managed disk SSE?",
    "A disk encryption set with a managed identity that can use the key in Key Vault or Managed HSM."
   ],
   [
    "Why is Azure Disk Encryption less preferred for new deployments?",
    "It runs in the guest using VM CPU, has OS and feature limitations, and Microsoft has announced its retirement in favor of encryption at host."
   ]
  ]
 },
 {
  "t": "Trusted launch: secure boot, vTPM and boot integrity monitoring",
  "body": [
   "Some of the most dangerous malware runs before the operating system even starts. Bootkits and rootkits tamper with the boot loader or kernel so they load first, hide from antivirus and survive reinstalls of applications. Trusted launch is an Azure security type for Generation 2 virtual machines that defends against these attacks with three features working together. It is the default security type for new Gen2 VMs in most scenarios, and it has no extra cost.",
   "Secure Boot is a UEFI firmware feature. At startup, the firmware checks that each boot component (the boot loader, the kernel and kernel drivers) is signed by a trusted publisher. If a component has been tampered with or is unsigned, it will not load. This blocks many bootkits and rootkits outright. Some Linux distributions or custom kernels need signed components to boot with Secure Boot enabled, which is the main compatibility consideration.",
   "The virtual Trusted Platform Module (vTPM) is a virtualized version of a hardware TPM 2.0, dedicated to the VM. It provides a secure place for keys and certificates and records measurements of the boot chain in its platform configuration registers (PCRs). Measured boot means each stage hashes the next one and stores the result in the vTPM, creating a log of exactly what ran during startup. The vTPM also enables guest features like BitLocker with TPM protection, Windows Credential Guard and virtualization-based security (VBS), and satisfies requirements such as Windows 11's TPM prerequisite.",
   "Boot integrity monitoring uses remote attestation. The Guest Attestation extension on the VM sends the vTPM's measured boot evidence to Microsoft Azure Attestation, which checks it against a known-good baseline. Microsoft Defender for Cloud then reports the VM's boot health: if attestation fails, for example because a boot component changed unexpectedly, Defender for Cloud raises a recommendation or alert so you can investigate. Installing the extension (Defender for Cloud can do this for you) and having a system-assigned managed identity are prerequisites for monitoring.",
   "Trusted launch requires Generation 2 VM images and supported VM sizes. You can enable it when creating a VM (Security type: Trusted launch virtual machines, with Secure Boot and vTPM check boxes), and existing Gen1 VMs can be upgraded to Gen2 with trusted launch in supported cases. Azure Policy and Defender for Cloud recommendations can audit that VMs use trusted launch, Secure Boot and vTPM.",
   "Don't confuse trusted launch with confidential VMs. Confidential VMs go further by using hardware-based trusted execution environments (such as AMD SEV-SNP or Intel TDX) to encrypt VM memory and isolate the VM from the host and hypervisor. Trusted launch protects boot integrity; confidential computing protects data in use."
  ],
  "terms": [
   [
    "Trusted launch",
    "An Azure security type for Gen2 VMs combining Secure Boot, vTPM and boot integrity monitoring."
   ],
   [
    "Secure Boot",
    "A UEFI feature that loads only boot components signed by trusted publishers."
   ],
   [
    "vTPM",
    "A virtual TPM 2.0 that stores keys and records measured boot values for the VM."
   ],
   [
    "Boot integrity monitoring",
    "Remote attestation of a VM's boot measurements, reported as health status in Defender for Cloud."
   ],
   [
    "Measured boot",
    "Recording hashes of each boot stage into the TPM so the startup chain can be verified later."
   ]
  ],
  "example": "A security baseline requires that all new Windows servers resist bootkits and support BitLocker with TPM. You deploy them as Gen2 VMs with trusted launch, enable Secure Boot and vTPM, let Defender for Cloud install the Guest Attestation extension, and assign a policy that audits VMs not using trusted launch.",
  "tip": "Signed boot components: Secure Boot. Keys and measurements: vTPM. Detecting a tampered boot chain: boot integrity monitoring through Guest Attestation and Defender for Cloud. Trusted launch requires Gen2 VMs; encrypting memory in use is confidential VMs, not trusted launch.",
  "check": [
   [
    "Which trusted launch component prevents an unsigned boot loader from running?",
    "Secure Boot."
   ],
   [
    "What must be installed for Defender for Cloud to report boot integrity?",
    "The Guest Attestation extension (with a managed identity on the VM)."
   ],
   [
    "What VM generation does trusted launch require?",
    "Generation 2."
   ]
  ]
 },
 {
  "t": "Azure Bastion and just-in-time VM access instead of public RDP/SSH",
  "body": [
   "Exposing RDP (TCP 3389) or SSH (TCP 22) to the internet is one of the most common causes of VM compromise. Automated scanners find open management ports within minutes and start brute-force and password-spray attempts, and vulnerabilities in remote access services are regularly exploited. Two Azure features remove the need for public management ports: Azure Bastion and just-in-time (JIT) VM access.",
   "Azure Bastion is a fully managed PaaS service that you deploy into a virtual network, in a dedicated subnet named `AzureBastionSubnet`. Administrators connect to the Azure portal over HTTPS (TCP 443), select a VM and open an RDP or SSH session in the browser; Bastion then connects to the VM's private IP address. The VMs need no public IP address and no agent. Bastion is hardened and patched by Microsoft. SKUs differ in features: Developer (free, limited, shared infrastructure), Basic, Standard (adds native client support through the Azure CLI, IP-based connection, shareable links, file transfer and host scaling) and Premium (adds session recording and private-only deployment). Bastion can reach VMs in peered virtual networks. Access requires Reader roles on the VM, its NIC and the Bastion resource, so Azure RBAC controls who can use it, and Conditional Access protects the portal sign-in.",
   "Just-in-time VM access is a feature of Microsoft Defender for Servers Plan 2 in Defender for Cloud. It locks down management ports by adding NSG deny rules (and Azure Firewall rules where applicable) for the chosen ports. When an admin needs access, they request it in the portal, through PowerShell or the API, specifying the port, source IP and duration within a configured maximum. If the requester has the right RBAC permissions (such as `Microsoft.Security/locations/jitNetworkAccessPolicies/initiate/action`), Defender for Cloud temporarily adds an allow rule for their source IP with higher priority, then removes it when the time expires. Every request is logged in the Azure activity log.",
   "The two features solve slightly different problems and can be combined. Bastion eliminates public IPs and internet exposure entirely; access happens through the portal or native client over TLS. JIT keeps ports closed by default and opens them only briefly for a specific source, which is useful when a VM must keep a public IP or when admins use other paths such as VPN. JIT can also be applied to the Bastion path in hardened designs.",
   "Other hardening steps: require Entra ID login for VMs (the AADLoginForWindows or AADSSHLoginForLinux extensions with the Virtual Machine Administrator Login or User Login roles) so RDP and SSH use Entra credentials and Conditional Access, disable password authentication for Linux SSH, and use Defender for Cloud's recommendation 'Management ports should be closed on your virtual machines' to find exposed VMs."
  ],
  "terms": [
   [
    "Azure Bastion",
    "A managed service providing browser or native-client RDP and SSH to VMs over TLS without public IPs on the VMs."
   ],
   [
    "AzureBastionSubnet",
    "The dedicated subnet name required for deploying Azure Bastion."
   ],
   [
    "Just-in-time VM access",
    "A Defender for Servers Plan 2 feature that keeps management ports closed and opens them temporarily for approved requests."
   ],
   [
    "Management port",
    "A port for remote administration such as 3389 (RDP) or 22 (SSH)."
   ]
  ],
  "example": "Defender for Cloud reports that 40 VMs have RDP open to the internet. You deploy Azure Bastion Standard in the hub VNet, remove the VMs' public IPs, delete the NSG rules allowing 3389 from Any, and give administrators Reader on the VMs and Bastion. For three appliances that must keep public IPs, you enable JIT with a three-hour maximum.",
  "tip": "No public IPs on VMs and RDP/SSH through the browser over 443: Azure Bastion in AzureBastionSubnet. Ports closed until an approved, time-limited request: JIT, which needs Defender for Servers Plan 2.",
  "check": [
   [
    "Which port must clients reach for Azure Bastion connections through the portal?",
    "TCP 443 (HTTPS) to Bastion; the VMs' RDP and SSH ports are reached privately from Bastion."
   ],
   [
    "Which Defender plan includes just-in-time VM access?",
    "Defender for Servers Plan 2."
   ],
   [
    "What does JIT change when a request is approved?",
    "It adds a temporary higher-priority allow rule for the requested port and source IP to the NSG (or firewall), removing it after the duration."
   ]
  ]
 },
 {
  "t": "Defender for Servers (Plan 1 vs Plan 2), vulnerability assessment, Azure Arc for hybrid and multicloud servers, Azure Update Manager",
  "body": [
   "Microsoft Defender for Servers is the Defender for Cloud plan that protects Windows and Linux machines in Azure, on-premises and in other clouds. It is enabled per subscription (or per resource in some cases) and comes in two plans.",
   "Plan 1 focuses on endpoint protection. It includes integration with Microsoft Defender for Endpoint (MDE), which provides endpoint detection and response (EDR), next-generation antivirus, attack surface reduction and alerts in the Defender XDR portal, with automatic onboarding of the MDE sensor. It also includes Microsoft Defender Vulnerability Management core capabilities for software inventory and vulnerability findings.",
   "Plan 2 includes everything in Plan 1 plus: agentless scanning of VM disks for vulnerabilities, secrets and malware; the premium Defender Vulnerability Management add-on features; just-in-time VM access; file integrity monitoring (FIM), which tracks changes to critical files and registry keys; network map and adaptive network hardening style recommendations where available; OS configuration assessment against security baselines; a daily data ingestion benefit for certain security data types in Log Analytics; and Defender for Cloud's threat detection for Azure-specific activity. Choose Plan 2 when you need JIT, FIM or agentless scanning.",
   "Vulnerability assessment in Defender for Cloud is provided by Microsoft Defender Vulnerability Management. It works through the MDE sensor and, with agentless scanning, by taking snapshots of disks and analyzing them without installing anything. Findings appear under the recommendation 'Machines should have vulnerability findings resolved', with CVE details, severity and remediation guidance. The older integrated Qualys scanner has been retired in favor of this approach.",
   "Azure Arc extends Azure management to machines outside Azure. You install the Azure Connected Machine agent on an on-premises or other-cloud server, and it appears as an Azure resource (`Microsoft.HybridCompute/machines`) with its own managed identity. You can then apply Azure Policy, RBAC, tags, VM extensions, Defender for Servers and Azure Monitor to it just like an Azure VM. For AWS and GCP, Defender for Cloud's multicloud connectors can auto-provision Arc onto EC2 instances and Compute Engine VMs so Defender for Servers covers them. Arc-enabled servers are how the exam expects you to bring hybrid machines into Defender for Cloud.",
   "Azure Update Manager is the unified service for assessing and installing OS updates on Azure VMs and Arc-enabled servers, Windows and Linux, without needing a Log Analytics workspace or agent (it uses VM extensions). You can run periodic assessments, which feed Defender for Cloud's 'system updates should be installed' recommendation, install updates on demand, and schedule maintenance configurations with patch classifications and reboot settings. Azure Policy can enable periodic assessment and assign schedules at scale. It replaces the older Automation Update Management solution."
  ],
  "terms": [
   [
    "Defender for Servers Plan 1",
    "Server protection centered on Microsoft Defender for Endpoint integration and core vulnerability management."
   ],
   [
    "Defender for Servers Plan 2",
    "Adds agentless scanning, JIT access, file integrity monitoring, premium vulnerability management and more."
   ],
   [
    "Azure Arc-enabled server",
    "A non-Azure machine running the Connected Machine agent so it can be managed as an Azure resource."
   ],
   [
    "Azure Update Manager",
    "A service that assesses and schedules OS patching for Azure VMs and Arc-enabled servers."
   ],
   [
    "Agentless scanning",
    "Analysis of VM disk snapshots for vulnerabilities, secrets and malware without an installed agent."
   ]
  ],
  "example": "A company runs 200 Azure VMs and 80 on-premises servers. It enables Defender for Servers Plan 2, onboards the on-premises servers with Azure Arc, uses Microsoft Defender Vulnerability Management findings to prioritize patching, schedules monthly maintenance with Azure Update Manager, and turns on file integrity monitoring for its payment servers.",
  "tip": "JIT, file integrity monitoring and agentless scanning are Plan 2 features. Non-Azure servers need Azure Arc before Defender for Servers, Policy or Update Manager can manage them. The built-in vulnerability scanner is Microsoft Defender Vulnerability Management.",
  "check": [
   [
    "You need file integrity monitoring on Linux servers. Which plan is required?",
    "Defender for Servers Plan 2."
   ],
   [
    "How do you bring an on-premises server under Azure Policy and Defender for Servers?",
    "Install the Azure Connected Machine agent to make it an Azure Arc-enabled server, then apply the plan and policies."
   ],
   [
    "Which service schedules OS patches for both Azure VMs and Arc servers?",
    "Azure Update Manager, using maintenance configurations."
   ]
  ]
 },
 {
  "t": "AKS security: Entra ID integration, Azure RBAC for Kubernetes, private clusters, network policies, Defender for Containers, Azure Policy for AKS",
  "body": [
   "Azure Kubernetes Service (AKS) runs a managed Kubernetes control plane while you manage node pools and workloads. Security spans who can use the Kubernetes API, how the API is exposed, how pods talk to each other, and how you detect threats and enforce standards.",
   "By default Kubernetes has its own local accounts and certificates, which are hard to audit and revoke. AKS-managed Microsoft Entra integration lets users authenticate to the cluster with their Entra identities: `az aks get-credentials` produces a kubeconfig that triggers an Entra sign-in through kubelogin, so MFA and Conditional Access apply. You should also disable local accounts (`--disable-local-accounts`) so the static admin credential cannot be used as a back door.",
   "Authorization then has two options. With Kubernetes RBAC, you create Roles and ClusterRoles inside the cluster and bind them to Entra users or groups with RoleBindings. With Azure RBAC for Kubernetes authorization, you assign Azure roles such as Azure Kubernetes Service RBAC Reader, Writer, Admin and Cluster Admin at the cluster or namespace scope, managed in the portal like any other Azure role. Separately, Azure roles like Azure Kubernetes Service Cluster User Role control who can download the kubeconfig in the first place. Workloads should use Microsoft Entra Workload ID (federating a Kubernetes service account with a managed identity) to reach Azure services without secrets.",
   "A private cluster gives the API server a private endpoint in your virtual network, so the Kubernetes API is not reachable from the internet; you administer it from inside the network, over VPN or ExpressRoute, or through features like `az aks command invoke`. If a public API server is required, restrict it with authorized IP ranges. Also control node egress, for example routing through Azure Firewall with the required AKS FQDN rules.",
   "By default all pods in a cluster can talk to each other. Network policies are Kubernetes resources that restrict pod-to-pod traffic by labels, namespaces and ports, implementing micro-segmentation. They require a network policy engine chosen when the cluster is created: Azure Network Policy Manager, Calico or Cilium (Azure CNI powered by Cilium).",
   "Microsoft Defender for Containers protects clusters in AKS and, with connectors or Arc, EKS, GKE and other Kubernetes. It provides runtime threat detection via the Defender sensor on nodes and control-plane audit log analysis (alerts for things like privileged container creation, exposed dashboards or crypto-mining), vulnerability assessment of images in registries and running containers using Microsoft Defender Vulnerability Management, agentless discovery and posture findings, and Kubernetes security posture recommendations.",
   "Azure Policy for AKS uses the Azure Policy add-on, which runs OPA Gatekeeper in the cluster to audit or deny Kubernetes resources that violate policies. Built-in initiatives include the pod security baseline and restricted standards, blocking privileged containers, requiring images from allowed registries and enforcing resource limits."
  ],
  "terms": [
   [
    "AKS-managed Entra integration",
    "Configuration where users sign in to the Kubernetes API with Entra identities instead of local certificates."
   ],
   [
    "Azure RBAC for Kubernetes",
    "Using Azure role assignments, at cluster or namespace scope, to authorize Kubernetes API actions."
   ],
   [
    "Private cluster",
    "An AKS cluster whose API server is reachable only through a private IP in the virtual network."
   ],
   [
    "Network policy",
    "A Kubernetes resource that restricts traffic between pods based on labels, namespaces and ports."
   ],
   [
    "Azure Policy add-on",
    "An AKS add-on using OPA Gatekeeper to audit or deny non-compliant Kubernetes resources."
   ]
  ],
  "example": "A payments team hardens its AKS cluster: it enables Entra integration with Azure RBAC and disables local accounts, rebuilds it as a private cluster with Azure CNI and Calico, adds network policies so only the api namespace can reach the db namespace, enables Defender for Containers and assigns the pod security restricted initiative with the Azure Policy add-on.",
  "tip": "Network policies need a policy engine chosen at cluster creation. Disabling local accounts is what forces all access through Entra. Gatekeeper enforcement in the cluster is Azure Policy for AKS; threat detection and image scanning is Defender for Containers.",
  "check": [
   [
    "How do you prevent the cluster admin certificate from bypassing Entra authentication?",
    "Disable local accounts on the AKS cluster."
   ],
   [
    "Which feature stops privileged pods from being created?",
    "Azure Policy for AKS (the Gatekeeper-based add-on) with the pod security baseline or restricted initiative in Deny mode."
   ],
   [
    "What makes the Kubernetes API server unreachable from the internet?",
    "Deploying AKS as a private cluster."
   ]
  ]
 },
 {
  "t": "Container registry security: disable the admin user, RBAC pull/push roles, private endpoints, image vulnerability scanning",
  "body": [
   "Azure Container Registry (ACR) stores the container images that AKS, App Service, Container Apps and other services run. If an attacker can push to your registry, they can plant a malicious image that your clusters will happily deploy; if they can pull, they may find secrets or proprietary code inside images. So registry security is part of the software supply chain.",
   "Every registry has an optional admin user: a single username (the registry name) with two passwords that grant full push and pull rights. It is shared, not tied to any person and cannot be scoped, so logs cannot show who acted. It is disabled by default and should stay disabled; Azure Policy can audit or deny registries with it enabled. Use Entra identities instead: individuals sign in with `az acr login`, and services use managed identities or service principals.",
   "Authorization uses Azure RBAC. The key built-in roles are AcrPull (pull images), AcrPush (pull and push), and AcrDelete (delete images), plus AcrImageSigner in older content trust setups. Registries can use the newer ABAC-enabled permissions mode, in which roles such as Container Registry Repository Reader, Writer and Contributor can be scoped to specific repositories with conditions; either way the principle is the same. For example, grant the AKS kubelet managed identity AcrPull only (`az aks update --attach-acr` does this), and give the CI/CD pipeline's identity AcrPush. Repository-scoped tokens with scope maps exist for fine-grained, non-Entra access to specific repositories, such as for IoT devices.",
   "Network restrictions come in the Premium SKU. You can create private endpoints so the registry is reached through private IPs in your virtual networks, with a private DNS zone `privatelink.azurecr.io`, and then disable public network access. Premium also supports IP firewall rules and, where needed, the trusted services exception for services such as Microsoft Defender for Cloud and ACR Tasks. Note that registries have both a login endpoint and data endpoints, and the private endpoint covers both.",
   "Image vulnerability scanning is provided by Microsoft Defender for Containers (and by the Defender CSPM plan for agentless container posture). Images are scanned when pushed, when recently pulled and on a schedule, using Microsoft Defender Vulnerability Management. Findings appear as recommendations, such as 'Azure registry container images should have vulnerabilities resolved', with CVEs and fix versions, and can be correlated with running containers so you prioritize images that are actually deployed.",
   "Additional supply-chain measures: sign images (for example with Notation and keys in Key Vault) and verify signatures at deployment, restrict AKS to pull only from approved registries with Azure Policy, use ACR Tasks to rebuild images when base images are patched, and enable soft delete or retention policies to manage untagged manifests."
  ],
  "terms": [
   [
    "Admin user",
    "A shared registry credential with full push and pull rights that should remain disabled."
   ],
   [
    "AcrPull",
    "An Azure role that allows pulling images from a registry."
   ],
   [
    "AcrPush",
    "An Azure role that allows pushing and pulling images."
   ],
   [
    "Scope map and token",
    "Registry features granting repository-specific permissions to non-Entra clients."
   ]
  ],
  "example": "An audit finds the AKS cluster pulls images using the registry admin password stored in a Kubernetes secret. You attach the registry to the cluster so the kubelet identity gets AcrPull, give the pipeline's service principal AcrPush, disable the admin user, add a private endpoint with public access disabled on the Premium registry, and enable Defender for Containers scanning.",
  "tip": "Least-privilege runtime access is AcrPull; pipelines need AcrPush. Private endpoints and firewall rules require the Premium SKU. Image CVE scanning comes from Defender for Containers, not from ACR by itself.",
  "check": [
   [
    "Why disable the ACR admin user?",
    "It is a shared credential with full rights that cannot be scoped or attributed to an individual."
   ],
   [
    "Which role should an AKS cluster's kubelet identity have on the registry?",
    "AcrPull."
   ],
   [
    "Which ACR SKU supports private endpoints?",
    "Premium."
   ]
  ]
 },
 {
  "t": "App Service, Functions and Logic Apps: managed identities, Key Vault references, access restrictions, HTTPS only and minimum TLS, authentication (Easy Auth)",
  "body": [
   "Azure App Service (web apps and APIs), Azure Functions and Logic Apps Standard are platform services that share much of the same hosting platform and security settings. The exam expects you to harden them in five areas.",
   "Managed identities give the app an Entra identity to call Key Vault, Storage, SQL, Service Bus and other services without stored credentials. Enable system-assigned or user-assigned identity on the Identity blade, then grant it data-plane roles on the targets. Logic Apps connectors can also authenticate with the logic app's managed identity where the connector supports it.",
   "Key Vault references let app settings pull secrets from Key Vault without code changes. Instead of a secret value, the app setting contains a reference such as `@Microsoft.KeyVault(VaultName=myvault;SecretName=DbPassword)`, or an equivalent form using the SecretUri of the secret. The platform uses the app's managed identity to fetch the value, so the identity needs Key Vault Secrets User (RBAC) or a Get secret access policy. If the reference omits a version, the app picks up new versions within about a day, or on restart. If the vault has network restrictions, the app needs VNet integration and routing through the virtual network. This is the standard answer for 'keep the connection string out of configuration'.",
   "Access restrictions filter inbound traffic to the app by priority-ordered allow and deny rules on IP ranges, service tags (for example allowing only `AzureFrontDoor.Backend` plus a header check of the Front Door ID) or virtual network subnets through service endpoints. The advanced tools site (SCM or Kudu, used for deployment) has its own rule set, which can inherit the main site's rules. For fully private apps, use a private endpoint for inbound traffic and set public network access to disabled; use VNet integration for outbound traffic to private resources.",
   "Transport security settings include HTTPS Only, which redirects all HTTP requests to HTTPS; the minimum inbound TLS version, which should be 1.2 or higher; and FTPS settings, where the best choice is to disable FTP and FTPS entirely, along with basic authentication for publishing, and deploy through Entra-authenticated pipelines. You can bind custom domains with managed or Key Vault certificates.",
   "Built-in authentication and authorization, known as Easy Auth, lets the platform handle sign-in before requests reach your code. You add an identity provider, typically Microsoft Entra ID (others include Microsoft accounts, Google, Facebook, X, Apple and any OpenID Connect provider), and choose what happens to unauthenticated requests: redirect to sign-in, or return 401 or 403 for APIs. The platform validates tokens, manages sessions and passes the user's claims to the app in headers. It is ideal when you need to protect an app quickly without writing authentication code, and it can be combined with Conditional Access through Entra.",
   "Defender for App Service, enabled in Defender for Cloud, adds threat detection for these apps, such as dangling DNS detection and alerts on suspicious requests and web shells."
  ],
  "terms": [
   [
    "Key Vault reference",
    "An app setting value of the form @Microsoft.KeyVault(...) that the platform resolves using the app's managed identity."
   ],
   [
    "Access restrictions",
    "Priority-ordered allow and deny rules that filter inbound traffic to an App Service or Function app."
   ],
   [
    "HTTPS Only",
    "A setting that redirects all HTTP requests to HTTPS."
   ],
   [
    "Easy Auth",
    "App Service built-in authentication that signs users in through identity providers before requests reach the code."
   ],
   [
    "VNet integration",
    "A feature that lets an app make outbound calls into a virtual network to reach private resources."
   ]
  ],
  "example": "A web app stores its SQL connection string in plain app settings, allows TLS 1.0 and is open to the internet. You enable its system-assigned identity, move the secret into Key Vault and replace the setting with a Key Vault reference, set HTTPS Only and minimum TLS 1.2, disable FTP and basic publishing credentials, add access restrictions allowing only the Front Door service tag, and turn on Entra ID authentication with Easy Auth.",
  "tip": "Key Vault references need a managed identity with secret read access, and network-restricted vaults need VNet integration. Inbound filtering is access restrictions or private endpoints; outbound reach into a VNet is VNet integration. Protecting an app without code changes points to Easy Auth.",
  "check": [
   [
    "A Key Vault reference shows an error status. What two things should you check first?",
    "That the app's managed identity has permission to read the secret, and that the app can reach the vault if the vault's network is restricted."
   ],
   [
    "How do you ensure only traffic from your Azure Front Door reaches a web app?",
    "Add an access restriction allowing the AzureFrontDoor.Backend service tag with an X-Azure-FDID header check for your Front Door ID, or use a private endpoint with Front Door Premium."
   ],
   [
    "Which setting forces browsers using HTTP onto HTTPS?",
    "HTTPS Only."
   ]
  ]
 },
 {
  "t": "Defender for Cloud: foundational CSPM vs Defender CSPM, secure score and recommendations",
  "body": [
   "Microsoft Defender for Cloud is a cloud-native application protection platform (CNAPP). It combines cloud security posture management (CSPM), which finds weaknesses in configuration, with cloud workload protection (CWP) plans, which detect threats against running workloads. It covers Azure, AWS, GCP and on-premises machines through Azure Arc.",
   "Foundational CSPM is free and turned on automatically for every Azure subscription that opens Defender for Cloud. It continuously assesses resources against the Microsoft cloud security benchmark (MCSB), produces security recommendations, calculates secure score, provides an asset inventory, shows basic multicloud posture through connectors and includes the regulatory compliance dashboard for the MCSB. Defender CSPM is the paid plan that adds advanced capabilities: attack path analysis, the cloud security explorer, agentless scanning for machines and containers, the security graph and risk prioritization, governance rules, data-aware posture (sensitive data discovery), AI security posture, code-to-cloud (DevOps) contextual insights, and additional regulatory standards.",
   "A recommendation describes a problem and how to fix it, for example 'Storage accounts should restrict network access using virtual network rules' or 'MFA should be enabled on accounts with owner permissions on your subscription'. Each shows affected resources, severity, remediation steps, sometimes a Fix button that remediates automatically, and a Deny or Enforce option that creates an Azure Policy to prevent recurrence. Recommendations are backed by Azure Policy definitions in the MCSB initiative assigned to each subscription. You can exempt a resource from a recommendation (waiver or mitigated), which also removes it from secure score calculations. With Defender CSPM, recommendations get a risk level that considers exploitability, internet exposure and sensitive data, helping you fix the riskiest first.",
   "Secure score is a percentage summarizing your posture. Recommendations are grouped into security controls (such as 'Enable MFA' or 'Secure management ports'), each worth a number of points. You earn a control's points only when all its resources are healthy; partial fixes earn partial credit proportionally. The score is shown per subscription, per management group and overall. Improving secure score is a good proxy for reducing risk, but it is not a compliance certificate.",
   "Useful operations: filter recommendations by severity or resource type, assign owners and due dates (governance, in Defender CSPM), export recommendations and secure score continuously to Log Analytics or Event Hubs with continuous export, and use Azure Resource Graph queries to report across subscriptions. Management group scope lets you see posture across the whole organization."
  ],
  "terms": [
   [
    "CSPM",
    "Cloud security posture management: continuous assessment of configuration against best practices."
   ],
   [
    "Foundational CSPM",
    "The free Defender for Cloud tier providing recommendations, secure score, inventory and MCSB compliance."
   ],
   [
    "Defender CSPM",
    "The paid posture plan adding attack paths, cloud security explorer, agentless scanning, governance and data-aware posture."
   ],
   [
    "Secure score",
    "A percentage based on security controls, earned when all resources in a control are healthy."
   ],
   [
    "Security control",
    "A group of related recommendations whose points count toward secure score."
   ]
  ],
  "example": "A new CISO wants a single posture metric across 60 subscriptions. You open Defender for Cloud at the tenant root management group, review secure score, sort security controls by potential score increase, fix 'Enable MFA' first, and set up continuous export of recommendations to a Log Analytics workspace for trending dashboards.",
  "tip": "Free tier gives recommendations, secure score and MCSB compliance; attack path analysis, cloud security explorer, governance rules and agentless scanning require Defender CSPM. A control's full points only come when every affected resource is healthy.",
  "check": [
   [
    "Which Defender for Cloud tier is enabled at no cost by default?",
    "Foundational CSPM."
   ],
   [
    "Why might fixing 9 of 10 resources in a control not give its full points?",
    "Full points require all resources in the control to be healthy; partial remediation earns only proportional credit."
   ],
   [
    "What happens to secure score when you exempt a resource from a recommendation?",
    "The exempted resource is no longer counted, so it does not lower the score."
   ]
  ]
 },
 {
  "t": "Defender CSPM features: attack path analysis, cloud security explorer, agentless scanning, governance rules",
  "body": [
   "A large environment can produce thousands of recommendations. Treating them all as equally urgent is impossible, so Defender CSPM adds context: which weaknesses actually connect into a path an attacker could use, and which resources matter most. All of this is built on the cloud security graph, a database of your resources, identities, network exposure, vulnerabilities, secrets and data sensitivity, plus the relationships among them.",
   "Attack path analysis uses the graph to find chains of exploitable conditions from an entry point to a critical target. A typical path reads like: an internet-exposed VM with a high-severity vulnerability has a managed identity with permissions to a storage account containing sensitive data. Each path shows the entry point, the steps, the target, the risk level and the specific recommendations that would break the chain. Fixing one link, such as removing the public IP or reducing the identity's permissions, can eliminate the whole path. Paths are recalculated periodically, and you can view them under Attack path analysis in the portal. Choke points, where many paths pass through one resource, are especially valuable to fix.",
   "Cloud security explorer lets you query the graph yourself using a visual query builder, without writing code. You pick a resource type and add conditions and relationships, for example 'virtual machines that are exposed to the internet and have high-severity vulnerabilities and have permissions to key vaults', or 'container images with critical CVEs that are running in Kubernetes'. There are built-in query templates for common risk questions. It is for proactive hunting of risky combinations that no single recommendation expresses.",
   "Agentless scanning inspects workloads without installing anything. For VMs, Defender for Cloud takes a snapshot of the disks, analyzes it out of band in a Microsoft-controlled environment and then deletes it; it finds installed software, vulnerabilities, secrets (such as SSH keys or cloud credentials left on disk) and, with Defender for Servers Plan 2, malware. For containers, agentless discovery maps Kubernetes clusters and images. Because there is no agent, coverage is fast and has no performance impact on the workload. It works on Azure, AWS and GCP. You configure it in the plan settings, and you can exclude machines by tag.",
   "Governance rules turn findings into accountable work. A rule automatically assigns an owner (for example the resource's Owner tag value) and a remediation timeframe to recommendations that match conditions such as severity or resource scope, optionally with a grace period that keeps the secure score unaffected until the due date. Owners get weekly email notifications of open and overdue tasks, and the governance report shows progress by owner and scope. This is how a central security team drives remediation across many application teams.",
   "Other Defender CSPM features you may meet: data-aware security posture (sensitive data discovery in storage and databases, used to raise risk on paths to sensitive data), AI security posture, DevOps security insights linking code repositories to cloud resources, and permissions management insights."
  ],
  "terms": [
   [
    "Cloud security graph",
    "The Defender CSPM database of resources, exposures, identities and relationships used for context-aware analysis."
   ],
   [
    "Attack path analysis",
    "Automatic discovery of exploitable chains from an entry point to a critical asset, with remediations to break them."
   ],
   [
    "Cloud security explorer",
    "A query builder for searching the security graph for risky combinations of conditions."
   ],
   [
    "Governance rule",
    "A rule that assigns owners and due dates to matching recommendations and tracks remediation."
   ],
   [
    "Choke point",
    "A resource through which many attack paths pass, making it a high-value fix."
   ]
  ],
  "example": "Attack path analysis shows an internet-exposed VM running a vulnerable web server whose managed identity has Storage Blob Data Reader on a storage account where sensitive data discovery found customer records. You remove the identity's role assignment, which breaks the path, then create a governance rule assigning all high-severity VM recommendations to the owner tag with a 14-day due date.",
  "tip": "Automatic, prioritized end-to-end chains: attack path analysis. Your own ad hoc question across the graph: cloud security explorer. Snapshot-based scanning without agents: agentless scanning. Owners and due dates: governance rules. All require Defender CSPM, not foundational CSPM.",
  "check": [
   [
    "Which Defender CSPM feature would you use to list all internet-exposed VMs with critical CVEs and access to key vaults?",
    "Cloud security explorer."
   ],
   [
    "How does agentless scanning inspect a VM without an agent?",
    "It snapshots the VM's disks and analyzes the snapshot out of band, then deletes it."
   ],
   [
    "What does a governance rule add to a recommendation?",
    "An assigned owner and remediation due date, with notifications and progress tracking."
   ]
  ]
 },
 {
  "t": "Regulatory compliance dashboard: Microsoft cloud security benchmark and adding standards",
  "body": [
   "Auditors and regulators ask whether your environment meets specific frameworks: PCI DSS for card data, ISO 27001, NIST SP 800-53, SOC 2, CIS benchmarks and many others. Defender for Cloud's regulatory compliance dashboard maps the technical assessments it already performs to the controls of those frameworks, so you can see which controls pass, which fail and which resources are to blame.",
   "The foundation is the Microsoft cloud security benchmark (MCSB). It is Microsoft's own set of security best practices for Azure and multicloud, organized into control domains such as network security, identity management, privileged access, data protection, asset management, logging and threat detection, incident response, posture and vulnerability management, endpoint security, backup and recovery, DevOps security and governance. MCSB is assigned by default to every subscription and connector, and it is what generates the default recommendations and secure score. It maps to other frameworks such as CIS and NIST, so improving against MCSB also moves you toward those.",
   "Each standard in the dashboard is shown as a list of controls. Each control is linked to one or more automated assessments (the same recommendations you see elsewhere). A control is shown as passing when all its assessments are healthy, failing when any fail, and grayed or manual when there are no automated assessments, because many controls, such as having a security awareness program, require human evidence. You can attest to manual controls, download compliance reports and PDF summaries, and open Microsoft's own audit reports through the portal's audit reports link.",
   "To add standards, open Environment settings, select the subscription, management group or connector, and choose Security policies (the exact portal wording varies over time). With Defender CSPM enabled, you can add industry and regulatory standards from a large catalog for Azure, AWS and GCP. On Azure the standard is assigned as an Azure Policy initiative behind the scenes, so it appears in Azure Policy compliance as well. You can also create custom standards made of your own selection of recommendations or custom recommendations. Foundational CSPM limits you mainly to MCSB.",
   "Important caveat: a fully green dashboard does not mean you are certified. It reflects automated technical checks only. Compliance also depends on processes, documentation and auditors' judgment, and coverage depends on which Defender plans and resources are included.",
   "For reporting at scale, continuous export can stream regulatory compliance state to Log Analytics, and workbooks in Defender for Cloud show compliance over time."
  ],
  "terms": [
   [
    "Microsoft cloud security benchmark",
    "Microsoft's default security standard in Defender for Cloud, covering Azure and multicloud best practices."
   ],
   [
    "Regulatory compliance dashboard",
    "The Defender for Cloud view that maps assessments to the controls of selected standards."
   ],
   [
    "Standard",
    "A set of compliance controls, such as PCI DSS or ISO 27001, assigned to a scope in Defender for Cloud."
   ],
   [
    "Custom standard",
    "A user-defined set of recommendations grouped as a standard for tracking."
   ]
  ],
  "example": "Your company processes card payments in two subscriptions. With Defender CSPM enabled, you add PCI DSS as a standard to those subscriptions in Environment settings. The dashboard shows a failing control for encrypting transmission, linked to web apps allowing TLS 1.0; you fix them, attach evidence for manual controls and download the report for the auditor.",
  "tip": "MCSB is the default standard and drives secure score. Adding other regulatory standards is done in Environment settings and generally requires Defender CSPM. On Azure, standards are implemented as Azure Policy initiatives. A green dashboard is not a certification.",
  "check": [
   [
    "Which standard is assigned by default to all subscriptions in Defender for Cloud?",
    "The Microsoft cloud security benchmark."
   ],
   [
    "Why do some controls show no automated assessments?",
    "They cover processes or procedures that cannot be checked technically and require manual attestation."
   ],
   [
    "How is an added regulatory standard implemented on Azure subscriptions?",
    "As an Azure Policy initiative assigned to the scope."
   ]
  ]
 },
 {
  "t": "Workload protection plans (Servers, Storage, SQL, Containers, Key Vault, App Service, AI) and alert handling",
  "body": [
   "Posture management finds weaknesses before an attack; workload protection detects attacks as they happen. In Defender for Cloud, cloud workload protection comes as separate paid plans that you enable per subscription on the Environment settings > Defender plans page. Enabling at the subscription level covers existing and future resources of that type. Each plan uses signals suited to its workload.",
   "Defender for Servers protects VMs and Arc-enabled machines through Microsoft Defender for Endpoint, vulnerability management and, in Plan 2, JIT, FIM and agentless malware scanning. Defender for Storage detects suspicious access and data exfiltration and offers malware scanning of uploads. Defender for Databases covers Azure SQL, SQL on machines, open-source relational databases and Cosmos DB, with alerts such as SQL injection and brute force plus vulnerability assessment. Defender for Containers covers Kubernetes runtime threats and image vulnerabilities. Defender for Key Vault flags unusual secret access. Defender for App Service detects attacks against web apps, such as web shell activity and dangling DNS. Defender for Resource Manager watches management operations for suspicious activity, and Defender for APIs protects APIs published in API Management. Defender for AI services detects jailbreaks and other threats to AI model deployments.",
   "When a plan detects something, it creates a security alert. Each alert has a severity (High, Medium, Low or Informational), a description, affected resources, MITRE ATT&CK tactics, evidence such as IP addresses or process command lines, and recommended response steps. Related alerts are correlated into incidents. Alerts appear in Defender for Cloud's Security alerts page and in the Microsoft Defender XDR portal, where Defender for Cloud alerts are integrated with endpoint, identity and email signals into unified incidents.",
   "A sound alert-handling routine: triage by severity and affected asset importance; open the alert to read the evidence and the 'take action' tab, which lists mitigation steps, related recommendations that would have prevented it, and options to trigger automation; investigate with logs in Log Analytics or Sentinel; contain (for example isolate a machine through Defender for Endpoint, rotate a key, block an IP); then change the alert status to Active, In progress or Resolved (or Dismissed for false positives).",
   "Tuning reduces noise. Alert suppression rules automatically dismiss alerts matching conditions such as alert type, resource or IP, for known benign activity like a penetration test. Suppression should be narrow and time-limited. Workflow automation can run a Logic App when an alert fires, and email notifications (under Environment settings) send high-severity alerts to named people and subscription owners. Continuous export streams alerts to Log Analytics or Event Hubs, and the Defender for Cloud data connector brings them into Microsoft Sentinel.",
   "You can also generate sample alerts from the Security alerts page to test your notification and automation pipeline without an actual attack."
  ],
  "terms": [
   [
    "Cloud workload protection",
    "Runtime threat detection for specific resource types delivered through Defender for Cloud plans."
   ],
   [
    "Security alert",
    "A detection of suspicious activity with severity, evidence, MITRE tactics and response guidance."
   ],
   [
    "Suppression rule",
    "A rule that automatically dismisses alerts matching defined conditions, used for known benign activity."
   ],
   [
    "Sample alerts",
    "Test alerts generated on demand to validate notifications and automation."
   ]
  ],
  "example": "A High severity alert reports 'Access from a Tor exit node to a Key Vault'. The analyst checks the evidence, sees a managed identity's token used from an unexpected IP, rotates the secrets it could reach, restricts the vault to a private endpoint, and marks the alert Resolved. A separate suppression rule is added, with an expiry date, for a scheduled penetration test from a known IP range.",
  "tip": "Plans are enabled per subscription on Defender plans; enable at subscription level to cover future resources. Use suppression rules for known benign alerts, workflow automation to respond, and sample alerts to test. Alerts also surface as incidents in Defender XDR.",
  "check": [
   [
    "Which plan would detect suspicious access to secrets from an unusual IP address?",
    "Defender for Key Vault."
   ],
   [
    "How do you stop a known, benign activity from generating alerts every day?",
    "Create a narrowly scoped alert suppression rule, ideally with an expiration date."
   ],
   [
    "How can you test that high-severity alerts trigger your Logic App without a real attack?",
    "Generate sample alerts from the Security alerts page."
   ]
  ]
 },
 {
  "t": "Multicloud connectors for AWS and GCP, and workflow automation with Logic Apps",
  "body": [
   "Many organizations run workloads in Amazon Web Services (AWS) and Google Cloud Platform (GCP) as well as Azure. Defender for Cloud can protect all three from one place using native connectors, without requiring you to install anything in the other cloud beyond what the connector deploys.",
   "To connect AWS, you go to Environment settings > Add environment > Amazon Web Services and provide the account ID (or the management account for an AWS organization, which can onboard member accounts automatically). You select the Defender plans to use (Defender CSPM, Servers, Containers, Databases), then Defender for Cloud generates an AWS CloudFormation template. Running that template in AWS creates the IAM roles and OpenID Connect trust that let Defender for Cloud read configuration and data, following least privilege, without long-term access keys. The connector itself is an Azure resource in the subscription and resource group you choose, and findings for AWS resources appear alongside Azure ones, assessed against the Microsoft cloud security benchmark and optionally AWS standards like AWS Foundational Security Best Practices or CIS.",
   "GCP is similar. You connect a single project or an organization, choose plans, and Defender for Cloud provides a script (run in Google Cloud Shell or deployed with Terraform) that creates the required service accounts and workload identity federation configuration. After onboarding, GCP resources receive recommendations, and paid plans extend protection to Compute Engine VMs and GKE clusters.",
   "For servers in AWS and GCP, Defender for Servers uses Azure Arc for full coverage: the connector can auto-provision the Arc agent onto EC2 and Compute Engine instances (which requires the instances to reach Azure endpoints and, in AWS, uses Systems Manager), after which Defender for Endpoint and vulnerability management work as they do in Azure. Agentless scanning also covers these machines. Defender for Containers can protect EKS and GKE clusters through connector-provisioned components.",
   "Workflow automation connects Defender for Cloud to Azure Logic Apps so that security events trigger actions automatically. You create an automation under Environment settings > Workflow automation, choose a trigger type (security alerts, recommendations or regulatory compliance changes), filter conditions such as alert severity or specific recommendation names, and choose a Logic App that uses the Microsoft Defender for Cloud trigger. The Logic App can then post to Teams, open a ticket in ServiceNow or Jira, email the resource owner, disable a compromised user or apply a fix. The Logic App needs appropriate permissions, often through its managed identity, and the user configuring the automation needs Logic App Contributor or similar rights to trigger it. Azure Policy can deploy workflow automation at scale across subscriptions.",
   "For response at SOC scale, the equivalent in Sentinel is playbooks, which are also Logic Apps; Defender for Cloud workflow automation suits posture and alert automation at the Defender for Cloud level."
  ],
  "terms": [
   [
    "Multicloud connector",
    "A Defender for Cloud resource that onboards an AWS account or GCP project for posture assessment and protection."
   ],
   [
    "CloudFormation template",
    "The AWS deployment template generated by Defender for Cloud to create the IAM roles the connector needs."
   ],
   [
    "Workflow automation",
    "A Defender for Cloud feature that triggers Logic Apps from alerts, recommendations or compliance changes."
   ],
   [
    "Auto-provisioning of Arc",
    "Connector-driven installation of the Azure Arc agent on AWS or GCP VMs for Defender for Servers."
   ]
  ],
  "example": "A company connects its AWS organization's management account to Defender for Cloud, deploys the generated CloudFormation stack, and enables Defender CSPM and Defender for Servers. It then creates a workflow automation that runs a Logic App posting every High severity alert, from Azure or AWS, to the security team's Teams channel and opening a ticket.",
  "tip": "AWS onboarding uses a CloudFormation template; GCP uses a Cloud Shell script or Terraform; both avoid long-lived keys through federation. Full server protection in other clouds relies on Azure Arc. Automatic reactions to Defender for Cloud alerts or recommendations are workflow automation with Logic Apps.",
  "check": [
   [
    "What does Defender for Cloud generate to grant it access to an AWS account?",
    "A CloudFormation template that creates IAM roles with an OIDC trust for the connector."
   ],
   [
    "Which three trigger types can workflow automation use?",
    "Security alerts, recommendations and regulatory compliance assessments."
   ],
   [
    "What must be installed on EC2 instances for full Defender for Servers coverage?",
    "The Azure Arc agent (auto-provisioned by the connector), plus Defender for Endpoint through the plan."
   ]
  ]
 },
 {
  "t": "Microsoft Sentinel workspace design, data connectors, Azure Monitor Agent with data collection rules, Syslog and CEF, Windows security events",
  "body": [
   "Microsoft Sentinel is Microsoft's cloud-native security information and event management (SIEM) and security orchestration, automation and response (SOAR) solution. It is enabled on top of a Log Analytics workspace, where all collected data is stored and queried with KQL. Sentinel is increasingly managed from the Microsoft Defender portal alongside Defender XDR, though the concepts are the same as in the Azure portal.",
   "Workspace design is the first decision. Microsoft recommends as few workspaces as possible, ideally one per tenant, because correlation and hunting are easiest when data is together. Reasons to add workspaces include data residency or sovereignty requirements (data must stay in a region), separate tenants (managed service providers use Azure Lighthouse across customer workspaces), and billing separation. Access within a single workspace can be limited with resource-context RBAC or table-level RBAC rather than splitting it. Sentinel roles include Microsoft Sentinel Reader, Responder, Contributor and Automation Contributor, plus Log Analytics roles for the workspace.",
   "Data connectors bring data in. They are distributed through the Content hub as solutions that package connectors, analytics rules, workbooks and playbooks. Service-to-service connectors ingest Microsoft sources easily: Microsoft Entra ID sign-in and audit logs, Azure Activity, Microsoft Defender XDR (incidents and raw events), Defender for Cloud alerts, Microsoft 365 and Office activity. Third-party sources use agent-based collection, API-based codeless connectors, or Azure Functions.",
   "The Azure Monitor Agent (AMA) is the current agent for collecting logs from Windows and Linux machines in Azure and, with Azure Arc, elsewhere; it replaces the legacy Log Analytics agent (MMA/OMS), which is retired. AMA is configured by data collection rules (DCRs), which define what to collect (event IDs, Syslog facilities and levels, performance counters), optional transformations written in KQL that filter or modify data before ingestion, and the destination workspace and table. One DCR can be associated with many machines, and a machine can have several DCRs, so you can manage collection centrally and cheaply.",
   "Windows security events are collected with the Windows Security Events via AMA connector, choosing a set: All events, Common (a recommended audit set), Minimal, or Custom with XPath queries for specific event IDs such as 4624 (successful logon) or 4625 (failed logon). They land in the SecurityEvent table. Windows Forwarded Events via AMA supports Windows Event Forwarding collectors.",
   "Linux and network devices send Syslog. With AMA, the Syslog via AMA connector collects facilities and severities into the Syslog table. Many firewalls and appliances send Common Event Format (CEF), a standardized Syslog message format, which the Common Event Format via AMA connector parses into the CommonSecurityLog table. Because appliances cannot run an agent, you deploy a Linux log forwarder VM with rsyslog or syslog-ng and AMA, point devices at it on UDP or TCP 514, and associate DCRs with the forwarder. Be careful not to collect the same messages into both the Syslog and CommonSecurityLog tables, which duplicates cost.",
   "Plan costs early: ingestion volume drives price, and DCR transformations are the main tool for dropping noise before it is billed."
  ],
  "terms": [
   [
    "Log Analytics workspace",
    "The data store underlying Microsoft Sentinel, queried with KQL."
   ],
   [
    "Azure Monitor Agent",
    "The current agent for collecting logs from Windows and Linux machines, configured by data collection rules."
   ],
   [
    "Data collection rule",
    "A configuration defining what data AMA collects, optional KQL transformations and the destination."
   ],
   [
    "CEF",
    "Common Event Format, a standardized Syslog message format used by many security appliances, stored in CommonSecurityLog."
   ],
   [
    "Log forwarder",
    "A Linux VM with AMA that receives Syslog or CEF from devices and sends it to the workspace."
   ]
  ],
  "example": "A company deploys Sentinel on a single workspace in its home region. It installs the Microsoft Entra ID, Defender XDR and Azure Activity solutions, uses Windows Security Events via AMA with the Common set on domain controllers, and builds a Linux forwarder with AMA to receive CEF from its firewalls, with a DCR transformation that drops noisy allow logs from a test network.",
  "tip": "Default to one workspace unless residency, tenant boundaries or billing force more. AMA plus DCRs is the collection method; the legacy agent is retired. CEF goes to CommonSecurityLog via a Linux forwarder; Windows events go to SecurityEvent; DCR transformations filter data before ingestion.",
  "check": [
   [
    "Which table stores parsed CEF messages?",
    "CommonSecurityLog."
   ],
   [
    "How do you collect logs from a firewall appliance that cannot run an agent?",
    "Send its Syslog/CEF to a Linux log forwarder running AMA, with the CEF via AMA connector and a DCR."
   ],
   [
    "What is a valid reason to create a second Sentinel workspace?",
    "A data residency requirement that forces some data to stay in a different region (or a separate tenant or billing boundary)."
   ]
  ]
 },
 {
  "t": "Sentinel analytics rules: scheduled, near-real-time, Microsoft security (incident creation) and anomaly rules; entity mapping",
  "body": [
   "Analytics rules are how Microsoft Sentinel detects threats. Each rule examines data in the workspace and, when its logic matches, creates alerts, which are grouped into incidents that analysts investigate. Rules can be created from templates in the Content hub solutions or written from scratch.",
   "Scheduled query rules are the most common and flexible type. You write a KQL query, a schedule (how often it runs, for example every 5 minutes to every 14 days) and a lookback period (how far back each run looks, for example the last hour), plus an alert threshold such as 'number of results greater than 0'. Event grouping decides whether all results produce one alert or each row produces its own alert. You set severity, MITRE ATT&CK tactics and techniques, and alert enhancement settings. Scheduled rules suit most detections, including correlations across tables and threshold-based logic such as '10 failed sign-ins followed by a success'. Be aware of ingestion delay: data can arrive minutes late, so lookback should overlap the schedule slightly.",
   "Near-real-time (NRT) rules run every minute, querying data ingested in the last minute, to give the fastest detection for high-priority, simple conditions such as a break-glass account signing in. They have limitations compared with scheduled rules, such as restrictions on query complexity and a limit on how many a workspace can have, so use them selectively.",
   "Microsoft security rules (incident creation rules) create Sentinel incidents from alerts produced by other Microsoft security products, such as Defender for Cloud, Defender for Endpoint or Entra ID Protection, with filters on severity or alert name. However, if you use the Microsoft Defender XDR connector with incident synchronization, or manage Sentinel in the Defender portal, incidents are created by Defender XDR correlation instead, and these rules should be disabled to avoid duplicate incidents.",
   "Anomaly rules use built-in machine learning templates to detect deviations from learned baselines, such as unusual volumes of data downloads or anomalous sign-in patterns. You can adjust their parameters and run them in flighting mode alongside the production version to compare. Anomalies are written to the Anomalies table rather than directly creating incidents, and are used to enrich investigations and hunting. The Fusion engine, which correlated low-fidelity signals into multistage attack incidents, is being superseded by Defender XDR correlation when Sentinel is connected to the Defender portal.",
   "Entity mapping tells Sentinel which query columns represent entities such as Account, Host, IP, URL, File, Process, Azure resource or Mailbox. Each entity type has identifiers (for example an Account can be identified by UPN, or name plus domain). Mapped entities appear in incidents, drive the investigation graph and entity pages, let automation rules and playbooks act on them (for example block the IP), and allow Sentinel to group related alerts into one incident. Custom details can surface other fields, and alert details can override the alert name or severity dynamically from query results.",
   "Incident settings on a rule control whether alerts create incidents and how alerts are grouped into existing incidents, for example grouping all alerts with the same account within 5 hours."
  ],
  "terms": [
   [
    "Scheduled query rule",
    "An analytics rule that runs KQL on a schedule over a lookback window and raises alerts when a threshold is met."
   ],
   [
    "NRT rule",
    "A near-real-time analytics rule that runs every minute for fast detection of simple conditions."
   ],
   [
    "Microsoft security rule",
    "A rule that creates Sentinel incidents from alerts produced by other Microsoft security products."
   ],
   [
    "Anomaly rule",
    "A built-in machine learning rule that records deviations from baselines in the Anomalies table."
   ],
   [
    "Entity mapping",
    "Linking query columns to entity types like Account, Host and IP so incidents can be investigated and automated."
   ]
  ],
  "example": "You create a scheduled rule that runs every 10 minutes with a 15-minute lookback, joining SigninLogs failures and successes to detect password spray followed by a successful sign-in. You map UserPrincipalName to the Account entity and IPAddress to the IP entity, set severity High and group alerts for the same account into a single incident over 5 hours.",
  "tip": "Fastest detection for a simple condition: NRT. Complex correlation or thresholds: scheduled. Turning other Microsoft products' alerts into incidents: Microsoft security rules, but disable them when Defender XDR incident integration is on to avoid duplicates. Without entity mapping, automation and investigation graphs have nothing to act on.",
  "check": [
   [
    "Why should a scheduled rule's lookback slightly exceed its run frequency?",
    "To catch events that arrived late due to ingestion delay, avoiding gaps between runs."
   ],
   [
    "You connected Defender XDR with incident sync and now see duplicate incidents. What should you do?",
    "Disable the Microsoft security incident creation rules for those products."
   ],
   [
    "What does entity mapping enable?",
    "Entities appear in incidents and investigation graphs, alerts can be grouped by entity, and automation can act on entities like IPs or accounts."
   ]
  ]
 },
 {
  "t": "Automation rules vs playbooks, incident management, workbooks, hunting queries, watchlists and threat intelligence",
  "body": [
   "Once Sentinel creates incidents, analysts need to manage them efficiently. Several features support that work, and the exam likes to test which one fits a scenario.",
   "Automation rules are lightweight, centrally managed rules that run when an incident is created or updated, or when an alert is created. Their conditions can check the analytics rule name, severity, entities, tags and other properties, and their actions can assign an owner, change status or severity, add tags, add a task list for analysts, run a playbook, or close the incident (for example auto-closing known false positives). They run in order of priority, and can have an expiration date, which is useful for temporary suppression during planned tests. No code is needed.",
   "Playbooks are Azure Logic Apps workflows triggered from Sentinel through the incident, alert or entity trigger. They handle more complex, multistep response involving other systems: enrich an IP with threat intelligence, post an adaptive card to Teams asking an analyst to approve, disable a user in Entra ID, isolate a device through Defender for Endpoint, or open a ticket in ServiceNow. Playbooks run under their own identity (preferably a managed identity) with permissions on target systems, and Sentinel needs permission (the Microsoft Sentinel Automation Contributor role on the playbook's resource group) to run them. The typical pattern is an automation rule that calls a playbook, combining central conditions with rich actions.",
   "Incident management happens on the Incidents page: each incident has a severity, status (New, Active, Closed), owner, classification when closed (true positive, benign positive, false positive, undetermined), comments, tasks, the alerts and entities involved, a timeline and an investigation graph. Entity pages show everything known about a user or host.",
   "Workbooks are interactive dashboards built on Azure Monitor Workbooks, with KQL-driven charts, grids and parameters. Content hub solutions include many templates, such as sign-in analysis or firewall overviews, which you save and customize. Use them for visualization and reporting, not detection.",
   "Hunting is proactive searching for threats that rules missed. Hunting queries are KQL queries, many built in and mapped to MITRE ATT&CK, that you run on demand. Interesting results can be bookmarked (preserving the rows and mapped entities), bookmarks can be promoted to incidents, and the Hunts feature organizes hypothesis-driven campaigns. Livestream runs a query continuously for live monitoring, and notebooks support advanced analysis.",
   "Watchlists are CSV-based lookup tables you upload to Sentinel, such as VIP users, approved admin IPs, terminated employees or critical assets. Queries reference them with `_GetWatchlist('VIPUsers')` to enrich or filter detections. Threat intelligence brings indicators of compromise (IP addresses, domains, URLs, file hashes) in through connectors such as Microsoft Defender Threat Intelligence, TAXII servers or the upload API, stored in threat intelligence tables, where built-in rules match them against your logs."
  ],
  "terms": [
   [
    "Automation rule",
    "A no-code Sentinel rule that runs on incident or alert events to assign, tag, change status, add tasks or run playbooks."
   ],
   [
    "Playbook",
    "A Logic Apps workflow triggered by Sentinel to perform multistep response and enrichment actions."
   ],
   [
    "Workbook",
    "An interactive KQL-driven dashboard for visualizing Sentinel data."
   ],
   [
    "Hunting query",
    "A KQL query run proactively to search for threats not caught by analytics rules."
   ],
   [
    "Watchlist",
    "A CSV-based lookup table in Sentinel referenced in queries with _GetWatchlist."
   ]
  ],
  "example": "Alerts about the finance VIPs should be handled first. You upload a VIPUsers watchlist, update the relevant analytics rules to join it and raise severity, and create an automation rule that assigns incidents tagged VIP to the senior analyst and runs a playbook that posts to Teams and resets the user's sessions after an analyst approves.",
  "tip": "Simple triage actions (assign, tag, close, set severity) with no code: automation rules. Actions involving external systems or approvals: playbooks, usually launched by an automation rule. Dashboards: workbooks. Proactive searches: hunting. Lookup lists: watchlists. IoCs: threat intelligence.",
  "check": [
   [
    "You want every incident from a specific rule automatically assigned to an analyst. What do you use?",
    "An automation rule with a condition on the analytics rule name and an assign-owner action."
   ],
   [
    "What permission lets Sentinel run a playbook?",
    "Microsoft Sentinel Automation Contributor granted to Sentinel on the playbook's resource group."
   ],
   [
    "How do you reference a watchlist in KQL?",
    "With the _GetWatchlist('alias') function."
   ]
  ]
 },
 {
  "t": "Log tiers and retention (Analytics vs data lake/auxiliary), custom tables, KQL basics",
  "body": [
   "Security logs are valuable but expensive when ingested at full price. High-volume sources such as firewall flows, proxy logs or DNS queries may be needed for investigations and compliance, yet rarely used for real-time detection. Sentinel and Log Analytics therefore offer tiers, called table plans, that trade features for cost. Microsoft has been evolving these options, so focus on the concepts and check current names in the portal.",
   "The Analytics tier (Analytics logs plan) is the full-featured tier: data supports any KQL query, analytics rules, workbooks, hunting and fast interactive performance. It has the highest ingestion cost. Interactive retention is included for a period, and you can extend retention per table. Use it for high-value, detection-relevant data: identity sign-ins, EDR events, security alerts, Windows security events from critical servers.",
   "Lower-cost tiers are designed for high-volume, lower-value data. The Basic and Auxiliary logs plans in Log Analytics allow much cheaper ingestion with limited query capabilities, per-query charges and reduced support for alert rules. The Microsoft Sentinel data lake, a newer capability, provides a lake tier for long-term, low-cost storage of security data in open formats, which you can query with KQL (typically asynchronously with KQL jobs or through notebooks) and from which you can promote summarized results back into the Analytics tier for detection. Mirroring Analytics tables into the lake also lets you keep them for years at low cost. The general design is: detection-grade data in Analytics, bulk data in the lake or auxiliary tier, and summary rules or KQL jobs to move distilled insights into Analytics.",
   "Retention has two parts. Interactive (analytics) retention is how long data stays queryable at full performance. Long-term retention (formerly archive) keeps data at low cost for up to 12 years; to query it you run a search job or restore. Set retention per table to meet compliance while controlling cost.",
   "Custom tables hold data that no built-in table covers. Their names end in `_CL`. You create them through the Logs Ingestion API with a data collection endpoint and a DCR that defines the schema and transformation, or through AMA collection of custom text or JSON logs. DCR-based custom tables can use any table plan.",
   "KQL (Kusto Query Language) is a read-only, pipe-based language: you start with a table and pass rows through operators separated by `|`. Key operators are `where` (filter), `project` (choose columns), `extend` (add computed columns), `summarize` (aggregate with count, dcount, sum, by columns), `sort by`, `top`, `join`, `union`, `parse` and `render` (charts). Time filters use `ago()`, such as `ago(1h)`.",
   "```kql\nSigninLogs\n| where TimeGenerated > ago(1d)\n| where ResultType != \"0\"\n| summarize Failures = count() by UserPrincipalName, IPAddress\n| where Failures > 20\n| sort by Failures desc\n```"
  ],
  "terms": [
   [
    "Analytics tier",
    "The full-featured log tier supporting all KQL, analytics rules and fast queries, at the highest ingestion cost."
   ],
   [
    "Sentinel data lake",
    "A low-cost lake tier for long-term security data, queried asynchronously and used to feed summarized results to Analytics."
   ],
   [
    "Long-term retention",
    "Low-cost retention up to 12 years, accessed through search jobs or restore."
   ],
   [
    "Custom table",
    "A table for non-standard data, named with the _CL suffix, created via the Logs Ingestion API or AMA custom logs."
   ],
   [
    "summarize",
    "A KQL operator that aggregates rows, such as counting events by user."
   ]
  ],
  "example": "Firewall flow logs cost more than all other data combined. You keep firewall threat and deny events in the Analytics tier for detection, send the full flow logs to the data lake tier for investigations, run a daily KQL job summarizing connections to rare destinations into an Analytics table, and set long-term retention of two years for compliance.",
  "tip": "Detection and real-time rules need Analytics-tier data. High-volume, rarely queried data belongs in a lower-cost tier such as the data lake or auxiliary/basic logs. Archived data needs a search job or restore. Custom tables end in _CL.",
  "check": [
   [
    "Why not put all firewall flow logs in the Analytics tier?",
    "The volume makes ingestion costly, and most of the data is not needed for real-time detection; a lower-cost tier suits it."
   ],
   [
    "Which KQL operator counts events per user?",
    "summarize, for example summarize count() by UserPrincipalName."
   ],
   [
    "How do you query data held in long-term retention?",
    "Run a search job or restore the data to make it queryable."
   ]
  ]
 },
 {
  "t": "Microsoft Security Copilot: capacity in SCUs, roles, plugins, promptbooks, standalone vs embedded experiences and agents",
  "body": [
   "Microsoft Security Copilot is a generative AI assistant for security and IT teams. It lets analysts ask questions in natural language, such as 'summarize this incident', 'explain what this PowerShell script does' or 'write a KQL query for sign-ins from new countries', and answers using a large language model grounded in data from Microsoft security products and other connected sources. It respects the user's own access: it can only retrieve data the user is permitted to see in the underlying products.",
   "Capacity is measured in Security Compute Units (SCUs). An organization provisions SCUs, which determine how much processing Security Copilot can perform. Provisioned capacity is purchased as a set number of SCUs per hour, and overage units can be allowed to handle bursts; some Microsoft 365 E5 customers receive an included allocation. Usage monitoring in the portal shows consumption by user, plugin and experience, which helps size capacity. Because pricing and inclusion terms change, check current details rather than memorizing numbers.",
   "Access is controlled by Security Copilot roles. Copilot owners manage settings, capacity, plugins and data sharing. Copilot contributors can create sessions and use the features. Microsoft Entra roles such as Global Administrator and Security Administrator map to owner access by default, and you can assign the contributor role to groups, or to everyone. In addition, each underlying product's permissions still apply, so a contributor without access to Defender XDR incidents cannot retrieve them.",
   "Plugins connect Security Copilot to data sources and skills. Microsoft plugins include Microsoft Defender XDR, Microsoft Sentinel, Microsoft Entra, Microsoft Intune, Microsoft Purview, Defender for Cloud and Defender Threat Intelligence. Non-Microsoft plugins connect to third-party security tools, and custom plugins can be built using KQL, API or GPT-style definitions. Owners decide which plugins are available and whether users can add their own.",
   "Promptbooks are saved sequences of prompts that run together to complete a common task, such as an incident investigation, a threat actor profile or a vulnerability impact assessment. They can take inputs (for example an incident number), are shareable across the organization, and give consistent results. You can build your own from a session.",
   "There are two ways to use it. The standalone experience is the Security Copilot portal, where users start sessions, pin results to a pinboard, run promptbooks and combine data across plugins. Embedded experiences appear inside other products: in the Defender portal as incident summaries, guided responses and script analysis; in Entra for sign-in and risky user explanations; in Intune, Purview and Defender for Cloud. Both draw from the same SCU capacity.",
   "Security Copilot agents extend this with autonomous or semi-autonomous task handling, such as triaging phishing reports submitted by users, prioritizing alerts or suggesting Conditional Access policy improvements. Agents run with their own identity and permissions, operate within guardrails set by admins, can learn from analyst feedback, and should be governed like any other privileged automation."
  ],
  "terms": [
   [
    "Security Compute Unit",
    "The unit of provisioned capacity that determines how much processing Security Copilot can perform."
   ],
   [
    "Copilot owner",
    "The Security Copilot role that manages settings, plugins and capacity."
   ],
   [
    "Plugin",
    "A connector that gives Security Copilot data and skills from a Microsoft or third-party product."
   ],
   [
    "Promptbook",
    "A saved, reusable sequence of prompts for a common security task."
   ],
   [
    "Embedded experience",
    "Security Copilot features surfaced inside products like Defender XDR, Entra or Intune."
   ]
  ],
  "example": "A small SOC provisions a few SCUs, gives the analysts group the Copilot contributor role, enables the Defender XDR, Sentinel and Entra plugins, and creates a promptbook that takes an incident ID, summarizes it, lists impacted users and devices, and drafts a report for management. Analysts also use the embedded incident summary directly in the Defender portal.",
  "tip": "Copilot does not bypass permissions: a user sees only data they already have access to. Capacity is SCUs, shared by standalone and embedded use. Owners manage plugins and settings; contributors use it. Reusable multi-step prompts are promptbooks.",
  "check": [
   [
    "What happens when an analyst asks Security Copilot about incidents they cannot access in Defender XDR?",
    "Copilot cannot retrieve them, because it uses the user's own permissions in the underlying products."
   ],
   [
    "What is the difference between standalone and embedded experiences?",
    "Standalone is the dedicated Security Copilot portal with sessions and promptbooks; embedded surfaces Copilot inside products like Defender, Entra and Intune."
   ],
   [
    "Which Security Copilot role can turn plugins on or off for the organization?",
    "The Copilot owner role."
   ]
  ]
 },
 {
  "t": "Microsoft Purview Audit for investigations",
  "body": [
   "When a security incident involves Microsoft 365, you need to know what an account actually did: which files it downloaded, which mailbox rules it created, whether it shared content externally or accessed a Teams chat. Microsoft Purview Audit provides that record through the unified audit log, which captures user and administrator activities across Exchange Online, SharePoint Online, OneDrive, Microsoft Teams, Microsoft Entra ID, Power BI, Microsoft 365 Copilot interactions and many other services.",
   "Audit is available in two tiers. Audit (Standard) is on by default for most organizations and provides searchable audit records for a default retention period (180 days for most record types at the time of writing), a search tool in the Microsoft Purview portal and the `Search-UnifiedAuditLog` cmdlet in Exchange Online PowerShell. Audit (Premium), included with E5-level licensing or add-ons, adds longer retention (one year by default for eligible users, with up to ten years through an add-on), custom audit log retention policies per service or activity, higher bandwidth for API access, and intelligent insight events that are crucial for investigations.",
   "The most important Premium events include MailItemsAccessed, which records when mail data is accessed through mail protocols and clients, helping determine exactly which messages a compromised account or malicious app read; Send, which records messages sent; SearchQueryInitiatedExchange and SearchQueryInitiatedSharePoint, which record what an attacker searched for in mailboxes or SharePoint (a useful signal of intent); and other events that help scope a breach. Without these, you may have to assume all mailbox content was exposed.",
   "To investigate, you open Audit in the Purview portal and create a search with a date range, activities (such as FileDownloaded or New-InboxRule), users, and file, folder or site filters. Searches run asynchronously and results can be exported to CSV for analysis; each record's AuditData column holds JSON details such as client IP, user agent and object ID. Users need the Audit Logs or View-Only Audit Logs role (in Purview or Exchange role groups) to search. For large or recurring analysis, the Office 365 Management Activity API or the Microsoft 365 connector in Sentinel (the OfficeActivity table) brings audit data into your SIEM so you can correlate it with sign-ins and endpoint events using KQL.",
   "Typical investigation questions answered with Audit: When did the attacker first sign in and from which IP? Did they create forwarding or deletion inbox rules (New-InboxRule, Set-Mailbox with forwarding)? Did they consent to an OAuth app? Which files did they download or share with anonymous links? Which mail items did they access? Answering these defines the scope of notification and remediation.",
   "Good preparation matters: confirm auditing is on, license key users (executives, admins) for Audit (Premium), create retention policies that meet legal requirements, and ensure mailbox auditing defaults have not been disabled."
  ],
  "terms": [
   [
    "Unified audit log",
    "The central Microsoft 365 record of user and admin activities across services, searched through Purview Audit."
   ],
   [
    "Audit (Premium)",
    "The advanced tier adding longer retention, custom retention policies, higher API bandwidth and intelligent events like MailItemsAccessed."
   ],
   [
    "MailItemsAccessed",
    "A Premium audit event recording access to mailbox items, used to scope email compromise."
   ],
   [
    "Audit log retention policy",
    "A Premium policy that sets how long specific audit records are kept."
   ]
  ],
  "example": "After a phishing compromise of a finance manager, investigators search Purview Audit for the account over the past 30 days. They find a New-InboxRule forwarding invoices externally, MailItemsAccessed events for 300 messages from an unfamiliar IP, and SearchQueryInitiatedExchange events for 'wire transfer'. The findings define which partners must be notified.",
  "tip": "Scoping which emails an attacker read requires MailItemsAccessed, an Audit (Premium) event. Longer retention and custom retention policies are Premium features. Searching requires an Audit Logs role; bringing audit data into Sentinel uses the Microsoft 365 connector (OfficeActivity table).",
  "check": [
   [
    "Which audit event helps prove exactly which messages a compromised account accessed?",
    "MailItemsAccessed, available with Audit (Premium)."
   ],
   [
    "Which PowerShell cmdlet searches the unified audit log?",
    "Search-UnifiedAuditLog in Exchange Online PowerShell."
   ],
   [
    "How can you correlate Microsoft 365 audit events with sign-in logs?",
    "Ingest them into Microsoft Sentinel with the Microsoft 365 connector (OfficeActivity) and query both with KQL."
   ]
  ]
 }
]);
