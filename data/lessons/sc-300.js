/* Lessons for Microsoft Certified: Identity and Access Administrator Associate (SC-300 (skills outline of April 27, 2026)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("sc-300", [
 {
  "t": "Tenant setup: custom domain names and DNS verification, company branding, tenant properties and user settings",
  "body": [
   "A Microsoft Entra tenant is the dedicated instance of Microsoft Entra ID (the cloud identity service formerly called Azure Active Directory) that holds your organization's users, groups, devices and applications. Every tenant starts with an initial domain ending in onmicrosoft.com. That domain is permanent: you can't delete it, and it stays useful as a fallback sign-in name for emergency accounts. Most organizations then add a custom domain such as contoso.com so people sign in with a familiar user principal name (UPN) like ana@contoso.com.",
   "Adding a custom domain is a two-step process. First you add the name in the Microsoft Entra admin center under Domain names. Entra then gives you a verification value (it looks like MS=ms12345678) that you publish as a TXT record, or alternatively an MX record, at your public DNS host. When you select Verify, Entra looks up the record; only someone who controls the domain's DNS could have created it, so this proves ownership. DNS changes can take time to propagate, so a failed first attempt usually just means waiting. A domain can be verified in only one tenant at a time, and you can later make a verified domain the primary domain, which becomes the default suffix for new users. To remove a custom domain you must first move or delete every user, group and app that still uses it.",
   "Company branding customizes the sign-in experience: background image, banner logo, square logo, background color, sign-in page text, and links for self-service password reset or a privacy statement. You configure a default sign-in experience and can add language-specific versions for users whose browser requests another language. Branding appears after the user types a username in your domain, which is also a quiet anti-phishing signal: users learn what the real page looks like. Branding requires a paid license tier, not the free edition.",
   "Tenant properties hold organization-level details: the tenant name, the tenant ID (a GUID that apps and scripts use to identify the directory), the country or region chosen at creation (which cannot be changed later and determines data location), the technical contact, and the global privacy contact and privacy statement URL that guest users see.",
   "User settings are tenant-wide switches that shape what ordinary members may do. Examples include whether users can register applications, whether non-administrators are restricted from browsing the Microsoft Entra admin center, whether users can create security groups or Microsoft 365 groups, whether users may connect LinkedIn accounts, and whether they can read other users' profiles. Tightening these defaults is a quick least-privilege win in a new tenant, because the out-of-the-box settings favor collaboration over control."
  ],
  "terms": [
   [
    "Initial domain",
    "The permanent tenantname.onmicrosoft.com domain created with every tenant; it cannot be removed."
   ],
   [
    "Domain verification",
    "Proving you own a custom domain by publishing a TXT or MX record with an Entra-supplied value in public DNS."
   ],
   [
    "Primary domain",
    "The verified domain used as the default UPN suffix when you create new users."
   ],
   [
    "Tenant ID",
    "The GUID that uniquely identifies a Microsoft Entra tenant, used by apps, scripts and federation settings."
   ],
   [
    "Company branding",
    "Customization of the sign-in page with your logos, background, colors and text, with optional per-language versions."
   ]
  ],
  "example": "Fabrikam buys fabrikam.com and wants staff to sign in as name@fabrikam.com. The admin adds the domain in Entra, copies the MS=ms value into a TXT record at the registrar, waits for DNS to update, selects Verify and sets it as primary. She then uploads the corporate logo and background as company branding and turns off the user setting that lets members register applications.",
  "tip": "Remember that verification uses a TXT (or MX) record, not a CNAME, and that the onmicrosoft.com domain can never be deleted. If a question asks why a domain can't be removed, look for users, groups or apps still using it.",
  "check": [
   [
    "What DNS record types can you use to verify a custom domain in Microsoft Entra ID?",
    "A TXT record (most common) or an MX record containing the MS=ms verification value that Entra gives you."
   ],
   [
    "Why might an administrator be unable to delete a custom domain from the tenant?",
    "Objects such as users, groups or applications still reference the domain in their names or URIs; they must be renamed or removed first."
   ],
   [
    "Which tenant property is fixed at creation and cannot be changed?",
    "The country or region, which also determines where the tenant's data is located."
   ]
  ]
 },
 {
  "t": "Microsoft Entra built-in roles, custom roles and least-privilege role assignment",
  "body": [
   "Microsoft Entra roles control who can manage the directory itself: users, groups, applications, authentication settings and so on. They are separate from Azure role-based access control (RBAC) roles such as Owner or Contributor, which control Azure resources like virtual machines and storage accounts. Mixing up the two systems is a classic exam trap, so keep the question in mind: is the admin managing identity objects, or Azure resources?",
   "Microsoft provides many built-in Entra roles, each a fixed set of permissions. Global Administrator can do almost everything and should be rare; Microsoft recommends fewer than five. Privileged Role Administrator manages role assignments and Privileged Identity Management. User Administrator creates and manages users and groups and can reset passwords for many (but not all) users. Helpdesk Administrator resets passwords for non-administrators and a few limited roles. Authentication Administrator manages users' authentication methods for non-admins, while Privileged Authentication Administrator can do the same for any user, including Global Administrators. Other common roles include Security Administrator, Conditional Access Administrator, Groups Administrator, License Administrator, Application Administrator, Cloud Application Administrator (like Application Administrator but without application proxy rights) and Global Reader, a read-only view of almost everything.",
   "Custom roles let you build a role from individual permissions when no built-in role fits. The set of permissions available for custom roles is narrower than the built-in catalog and is focused largely on application registrations and enterprise applications, with more areas added over time. Custom roles require a Microsoft Entra ID P1 license. You define the role once and then assign it at a scope.",
   "A role assignment has three parts: the principal (a user, a service principal or a role-assignable group), the role definition, and the scope. The scope can be the whole tenant, an administrative unit, or a single resource such as one app registration. Assigning the Application Administrator role for just one app is far safer than assigning it tenant-wide.",
   "Least privilege means giving each person the smallest role, at the narrowest scope, for the shortest time that lets them do the job. In practice: pick the most specific built-in role rather than defaulting to Global Administrator; scope roles to administrative units or single resources when possible; use Privileged Identity Management so assignments are eligible rather than permanently active; and review assignments regularly. You can assign roles to groups only if the group was created as role-assignable (the isAssignableToRole property), which must be set when the group is created and cannot be changed later. Only Global and Privileged Role Administrators can manage membership of such groups, which prevents lower-level admins from escalating privilege."
  ],
  "terms": [
   [
    "Role definition",
    "A collection of permissions, either built-in or custom, that can be assigned to a principal."
   ],
   [
    "Role scope",
    "The boundary where a role applies: the tenant, an administrative unit, or a single resource."
   ],
   [
    "Role-assignable group",
    "A group created with isAssignableToRole set to true so it can receive Entra role assignments; the setting is fixed at creation."
   ],
   [
    "Global Reader",
    "A built-in read-only role that can view most settings and data without making changes."
   ],
   [
    "Least privilege",
    "Granting only the permissions, scope and duration a person needs to perform a task."
   ]
  ],
  "example": "A service desk team needs to reset forgotten passwords for regular staff. Instead of making them User Administrators, the identity admin assigns them the Helpdesk Administrator role through an eligible PIM assignment, so they can reset non-admin passwords after activating the role but cannot create users or reset a Global Administrator's password.",
  "tip": "When a question asks for the least-privileged role, eliminate Global Administrator first, then choose the most narrowly focused role that still covers the task. Watch the difference between Authentication Administrator and Privileged Authentication Administrator: only the privileged one can manage methods for administrators.",
  "check": [
   [
    "What is the difference between Microsoft Entra roles and Azure RBAC roles?",
    "Entra roles manage directory objects such as users, groups and apps; Azure RBAC roles manage Azure resources such as subscriptions, resource groups and VMs."
   ],
   [
    "Can you convert an existing security group into a role-assignable group?",
    "No. The isAssignableToRole property must be set when the group is created and cannot be changed afterward."
   ],
   [
    "Which role should you assign to someone who only needs to reset passwords for non-administrative users?",
    "Helpdesk Administrator (Password Administrator is an even narrower option), not User Administrator or Global Administrator."
   ]
  ]
 },
 {
  "t": "Administrative units, including restricted management administrative units, to scope admin roles",
  "body": [
   "An administrative unit (AU) is a container in Microsoft Entra ID that holds users, groups or devices so you can delegate administration of just those objects. Think of a university: each faculty has its own IT staff who should reset passwords for their own students but not for the rest of the campus. Put the faculty's users in an AU, then assign the IT staff a role scoped to that AU.",
   "Administrative units are flat; they are not a hierarchy like on-premises organizational units, and an object can belong to more than one AU. Membership can be assigned manually or, for users or devices, set by a dynamic membership rule such as all users whose department is Engineering. A single AU's dynamic rule targets either users or devices, not both. Adding a group to an AU lets the scoped admin manage the group object itself, such as its name and membership, but does not make the group's members part of the AU. If you want the admin to reset those users' passwords, the users must be added too.",
   "Only some roles make sense at AU scope, including User Administrator, Helpdesk Administrator, Password Administrator, Authentication Administrator, Groups Administrator, License Administrator and a few others. Roles that manage tenant-wide settings cannot be scoped to an AU. The administrators who receive AU-scoped roles need Microsoft Entra ID P1 licenses; the members of the AU need only the free tier.",
   "Restricted management administrative units add protection for sensitive objects. In a normal AU, tenant-level admins can still manage everything inside it. In a restricted management AU, objects can be modified only by administrators whose role is assigned at the scope of that specific AU. Even a tenant-wide User Administrator or Global Administrator cannot change a protected user's properties, reset their password or change a protected group's membership through that tenant-scoped role. A Global Administrator can still assign themselves an AU-scoped role, so this is a guard against accidents and routine admin reach, not an absolute wall. The restricted setting is chosen when the AU is created.",
   "Typical uses for restricted management AUs include protecting executives' accounts, security groups that gate access to sensitive resources, and privileged service accounts. In the admin center you'll see a Restricted management administrative unit toggle on creation, and in the object's overview a note that it is protected. Sign-in, audit and role assignment activity still appears in the normal logs, so auditing is unaffected."
  ],
  "terms": [
   [
    "Administrative unit",
    "A container of users, groups or devices used to scope Entra role assignments to a subset of the directory."
   ],
   [
    "Restricted management AU",
    "An administrative unit whose objects can be changed only by admins with roles scoped to that AU, not by tenant-scoped admins."
   ],
   [
    "AU-scoped role assignment",
    "A role assignment whose scope is an administrative unit, limiting the admin's power to objects in that AU."
   ],
   [
    "Dynamic AU membership",
    "An administrative unit whose user or device members are added and removed automatically by an attribute-based rule."
   ]
  ],
  "example": "A multinational wants the Paris help desk to reset passwords only for French staff. The admin creates an administrative unit with a dynamic rule on country equals France and assigns the Paris team Helpdesk Administrator scoped to it. Separately, the CEO and CFO are placed in a restricted management AU managed by two senior identity admins, so the general help desk can never change them.",
  "tip": "If a scenario says even Global Administrators should not be able to modify certain users by default, the answer is a restricted management administrative unit. If it only says to limit what a regional team can manage, a normal AU with a scoped role is enough.",
  "check": [
   [
    "If you add a group to an administrative unit, can the AU-scoped Helpdesk Administrator reset passwords for the group's members?",
    "No. Adding a group brings only the group object into scope; the users must be added to the AU themselves."
   ],
   [
    "What does a restricted management administrative unit change compared with a normal AU?",
    "Tenant-scoped administrators can no longer modify its objects; only admins with roles scoped to that AU can."
   ],
   [
    "Who needs a Microsoft Entra ID P1 license when using administrative units?",
    "The administrators who are assigned roles scoped to the AU; members of the AU do not."
   ]
  ]
 },
 {
  "t": "Users and groups: security vs Microsoft 365 groups, assigned vs dynamic membership rules, bulk operations",
  "body": [
   "Users in Microsoft Entra ID come in two main kinds: cloud-only users created directly in Entra, and synchronized users whose source of authority is on-premises Active Directory. You can edit cloud-only users in the portal, but most attributes of synced users must be changed on-premises. Each user also has a userType of Member or Guest. Deleted users go to a soft-deleted state for 30 days, during which you can restore them with their group memberships and licenses.",
   "Groups simplify access: assign permissions, licenses or apps once to a group instead of to hundreds of people. There are two group types. Security groups control access to resources and can contain users, devices, service principals and other groups. Microsoft 365 groups are collaboration groups: each comes with a shared mailbox, calendar, SharePoint site and optionally a Team, and they contain only users (members and guests), not devices or nested groups. Deleted Microsoft 365 groups can be restored for 30 days; deleted security groups cannot. The group expiration policy applies to Microsoft 365 groups.",
   "Membership can be assigned, where owners or admins add members manually, or dynamic, where a rule adds and removes members automatically based on attributes. Dynamic user groups use rules on user attributes; dynamic device groups use device attributes. A single rule cannot mix user and device properties. Microsoft 365 groups can be dynamic only for users. Dynamic membership requires a Microsoft Entra ID P1 license, and changes are processed in the background, so they are not instant. A rule looks like this:",
   "```\n(user.department -eq \"Sales\") -and (user.country -eq \"Canada\")\n```",
   "Common operators include -eq, -ne, -startsWith, -contains, -match and -in, joined with -and, -or and -not. The rule builder in the portal covers simple cases and the text box accepts advanced rules. Use Validate Rules to test a rule against specific users before saving. You cannot manually add members to a dynamic group; to fix a missing member, fix the source attribute. A special rule syntax can also build a group from the direct reports of a manager.",
   "Bulk operations handle many objects at once from the portal. You download a CSV template, fill it in and upload it to bulk create users, bulk invite guests, bulk delete users, bulk restore, bulk add or remove group members, or download a list of users or groups. Results appear under Bulk operation results, with a per-row status so you can fix and resubmit failures. For larger or repeatable jobs, Microsoft Graph PowerShell cmdlets such as New-MgUser and New-MgGroupMember are the usual alternative."
  ],
  "terms": [
   [
    "Security group",
    "A group used to grant access to resources; can contain users, devices, service principals and nested groups."
   ],
   [
    "Microsoft 365 group",
    "A collaboration group that provisions a shared mailbox, calendar, SharePoint site and optional Team; contains users only."
   ],
   [
    "Dynamic membership rule",
    "An attribute-based expression that automatically adds and removes group members; requires Entra ID P1."
   ],
   [
    "Assigned membership",
    "Group membership managed manually by owners or administrators."
   ],
   [
    "Soft delete",
    "The 30-day window during which deleted users and Microsoft 365 groups can be restored."
   ]
  ],
  "example": "HR sets the department attribute for every employee. The identity team creates a dynamic security group with the rule user.department -eq \"Finance\" and assigns the finance app and a license to it. When a new analyst's department is set to Finance, they gain access automatically, and when they move to Marketing, access is removed without a ticket.",
  "tip": "Exam questions love the limits: Microsoft 365 groups can't contain devices or nested groups, dynamic groups can't take manual members, one rule can't mix user and device attributes, and only Microsoft 365 groups (not security groups) can be restored after deletion.",
  "check": [
   [
    "You need a group that automatically contains all Windows devices. Which group type and membership type do you choose?",
    "A security group with dynamic device membership; Microsoft 365 groups cannot contain devices."
   ],
   [
    "A user is missing from a dynamic group. Can you add them manually?",
    "No. You must correct the attribute the rule evaluates, or change the rule."
   ],
   [
    "Which license is needed for dynamic group membership?",
    "Microsoft Entra ID P1 (or a plan that includes it) for the users covered by dynamic groups."
   ]
  ]
 },
 {
  "t": "Licenses: direct vs group-based licensing and resolving license assignment errors",
  "body": [
   "Many Microsoft cloud services, such as Microsoft 365, Exchange Online and Microsoft Entra ID P1 or P2, require each user to have a license. A license (called a product or SKU) contains several service plans, and you can turn individual service plans on or off when you assign it. Before any license can be assigned, the user must have a usage location set, because some services are not available in every country.",
   "Direct licensing means assigning a license to an individual user in the admin center or with PowerShell. It works, but it does not scale and it drifts: people change jobs, and nobody remembers to remove what they no longer need.",
   "Group-based licensing assigns licenses to a group. Every member inherits the license, and members who leave the group lose it. Combined with dynamic groups, licensing becomes automatic: a rule like department equals Sales assigns the sales license set as soon as HR updates the attribute. Group-based licensing requires Microsoft Entra ID P1 or a plan that includes it. A user can have the same product both directly and through a group; the user profile shows whether each assignment is direct or inherited, and removing one path does not remove the other. That is often how you migrate: add the group assignment, confirm it works, then remove the direct assignment.",
   "License assignment errors are where exam questions focus. The group's Licenses page shows users in an error state, and the user's Licenses page shows the reason. Common errors include: not enough licenses, when the tenant has run out of purchased seats; conflicting service plans, when the user already has another license with a service plan that can't coexist, for example two different editions of the same service; other products depend on this license, when you try to remove a service plan that another assigned plan requires; usage location isn't allowed, when a service isn't offered in the user's country or no usage location is set; and duplicate proxy addresses, when an email address conflicts with another object in Exchange Online.",
   "To fix an error, address the cause, for example buy more seats, remove a conflicting direct license, disable one of the conflicting service plans in the group assignment, or set the usage location. Then select Reprocess on the group or user so Entra tries again. Group-based licensing processes changes in the background, so allow some time before assuming a fix failed. The audit log records license changes, which helps when you need to show who assigned or removed a license."
  ],
  "terms": [
   [
    "Service plan",
    "An individual service inside a license product that can be enabled or disabled per assignment."
   ],
   [
    "Usage location",
    "The user's country or region; required before a license can be assigned."
   ],
   [
    "Group-based licensing",
    "Assigning licenses to a group so members inherit them automatically; requires Entra ID P1."
   ],
   [
    "Inherited license",
    "A license a user holds because of group membership rather than direct assignment."
   ],
   [
    "Reprocess",
    "An action that retries license assignment for a group or user after you fix the cause of an error."
   ]
  ],
  "example": "After a merger, 40 new sales staff join a dynamic Sales group but show a license error. The admin finds the reason is not enough licenses, buys 40 more seats and selects Reprocess on the group. Two users still fail with conflicting service plans because they have an older direct license, so the admin removes the direct assignments and reprocesses again.",
  "tip": "If a question says licenses won't assign to a brand-new user, check usage location first. If it says a user kept a license after leaving a group, look for a direct assignment that still exists alongside the inherited one.",
  "check": [
   [
    "What must be set on a user before any license can be assigned?",
    "The usage location (country or region)."
   ],
   [
    "A user was removed from a licensing group but still has the license. What is the most likely reason?",
    "The same license is also assigned directly to the user, and removing the group path does not remove the direct one."
   ],
   [
    "After buying more seats to fix a not enough licenses error, what do you do so the group assignment succeeds?",
    "Select Reprocess on the group (or user) so Entra retries the assignment."
   ]
  ]
 },
 {
  "t": "Devices: Microsoft Entra registered, Microsoft Entra joined and Microsoft Entra hybrid joined; device settings",
  "body": [
   "Microsoft Entra ID keeps a device identity for computers and phones so that policies such as Conditional Access can check the device, not just the user. There are three ways a device can relate to Entra, and the exam expects you to pick the right one for a scenario.",
   "Microsoft Entra registered devices are typically personal devices, the bring-your-own-device (BYOD) case. The user signs in to the device with a personal or local account and adds a work account, for example by signing in to the Company Portal or an Office app. Windows, macOS, iOS and Android can be registered. The organization gets a device object it can use for Conditional Access and, if enrolled, Intune management, but the user still owns the device.",
   "Microsoft Entra joined devices are organization-owned Windows devices that are joined directly to Entra ID with no on-premises Active Directory. Users sign in to Windows with their Entra work account, get single sign-on to cloud apps through a primary refresh token, and can still reach on-premises resources if line of sight to a domain controller exists. This is the target state for cloud-first organizations and is commonly deployed with Windows Autopilot.",
   "Microsoft Entra hybrid joined devices are joined to on-premises Active Directory and also registered in Entra ID. This suits organizations that still rely on Group Policy or on-premises imaging. Setup is done in Microsoft Entra Connect, which configures a service connection point (SCP) so domain-joined computers know which tenant to register with; the computer objects must be in the sync scope. Windows then registers automatically when a user signs in.",
   "Device settings live under Devices, Device settings. Key options include: Users may join devices to Microsoft Entra (all, selected or none); Users may register their devices; Require multifactor authentication to register or join devices (Microsoft recommends leaving this off and instead using a Conditional Access policy on the Register or join devices user action); Maximum number of devices per user; Additional local administrators on Entra joined devices, and whether the user who joins becomes a local administrator; Enable Microsoft Entra Local Administrator Password Solution (LAPS), which stores a rotating local admin password; and whether users can recover the BitLocker keys for their own devices.",
   "Conditional Access can then require a device to be marked compliant by Intune or to be hybrid joined. Compliant means the device meets management rules such as encryption and minimum OS version; hybrid joined only proves the device is part of your domain."
  ],
  "terms": [
   [
    "Microsoft Entra registered",
    "A personal device with a work account added; used for BYOD scenarios on Windows, macOS, iOS and Android."
   ],
   [
    "Microsoft Entra joined",
    "An organization-owned Windows device joined directly to Entra ID, where users sign in with work accounts."
   ],
   [
    "Microsoft Entra hybrid joined",
    "A device joined to on-premises AD and also registered in Entra ID, configured through Entra Connect."
   ],
   [
    "Service connection point (SCP)",
    "An AD object that tells domain-joined computers which Entra tenant to register with for hybrid join."
   ],
   [
    "Windows LAPS with Entra",
    "A feature that rotates each device's local administrator password and backs it up to Entra ID."
   ]
  ],
  "example": "A company with a large on-premises AD and heavy Group Policy use wants Conditional Access to require corporate devices. The admin enables hybrid join in Microsoft Entra Connect and then creates a policy requiring a hybrid joined or compliant device. Contractors using personal laptops register them instead and are allowed only browser access.",
  "tip": "Personal device equals registered; company device with cloud only equals joined; company device still in on-premises AD equals hybrid joined. For requiring MFA when joining devices, the recommended answer is a Conditional Access policy on the Register or join devices user action.",
  "check": [
   [
    "Which device identity type fits employee-owned phones that access corporate email?",
    "Microsoft Entra registered."
   ],
   [
    "Where do you configure Microsoft Entra hybrid join for domain-joined computers?",
    "In Microsoft Entra Connect, which configures the service connection point; the computers must be in sync scope."
   ],
   [
    "Why is Require multifactor authentication to register or join devices usually left off?",
    "Microsoft recommends using a Conditional Access policy targeting the Register or join devices user action instead, which is more flexible."
   ]
  ]
 },
 {
  "t": "External identities: B2B collaboration, guest invitations and redemption, external collaboration settings",
  "body": [
   "Microsoft Entra External ID for business-to-business (B2B) collaboration lets people from partner organizations use your apps and data with their own credentials. Instead of creating and managing a password for a contractor, you invite them; they authenticate with their home identity, and your tenant gets a user object that represents them. By default this object has userType Guest, which gives it more limited directory permissions than a member.",
   "An invitation can come from the admin center (New user, Invite external user), from bulk invite with a CSV file, from Microsoft Graph or PowerShell, or indirectly when someone shares a Team, file or site. The invited user gets an email with a redemption link, or you can send them a direct link to an app or to your tenant's My Apps portal. Redemption is the moment the guest accepts: they sign in, consent to your privacy terms, and the guest object is linked to their identity. Until then the guest shows an acceptance status of Pending.",
   "How the guest authenticates depends on who they are. If they have a Microsoft Entra account, they use it. Otherwise they can use a Microsoft account, a configured Google or Facebook federation, a SAML or WS-Federation identity provider you set up for their domain, or email one-time passcode (OTP), where a code is sent to their email address each time. Your tenant can still apply its own Conditional Access to guests, such as requiring MFA; cross-tenant access settings decide whether you trust MFA done in their home tenant.",
   "External collaboration settings (under External Identities) control the rules of engagement. Guest user access restrictions set how much of the directory guests can see: the same access as members, limited access to properties and memberships of directory objects (the default), or the most restrictive setting where they see only their own profile. Guest invite settings decide who can invite: anyone in the organization including guests, member users and users in specific admin roles, only users in admin roles including the Guest Inviter role, or no one. You can also enable guest self-service sign-up through user flows, allow external users to leave the organization on their own, and set collaboration restrictions with an allow list or a deny list of domains.",
   "Guest accounts should be governed like any other access. Use access reviews to confirm guests still need access, entitlement management to give time-limited access packages, and the sign-in logs to spot inactive guests. You can also convert an external user's userType to Member when a partner works as part of your team, or reset redemption status if their email or home identity changes, which keeps their object ID and group memberships."
  ],
  "terms": [
   [
    "B2B collaboration",
    "Inviting external users to use your resources with their own identities, represented as user objects in your tenant."
   ],
   [
    "Redemption",
    "The step where an invited external user accepts the invitation and links their home identity to the guest object."
   ],
   [
    "Email one-time passcode",
    "A sign-in method for guests without a supported identity provider, where a code is emailed at each sign-in."
   ],
   [
    "Guest Inviter",
    "A built-in role allowing a user to invite external users when invitations are restricted to admins."
   ],
   [
    "Collaboration restrictions",
    "An allow list or deny list of domains that controls where invitations can be sent."
   ]
  ],
  "example": "A design agency needs access to a Contoso SharePoint site for a three-month project. Contoso's admin invites the agency's staff by bulk CSV; they redeem with their own Entra accounts, and a Conditional Access policy requires MFA for guests. Contoso adds the agency's domain to the allow list so staff cannot invite people from other companies.",
  "tip": "Know the four guest invite settings and the three guest access restriction levels. If a scenario wants guests to see only their own profile, pick the most restrictive guest access setting; if it wants only certain domains invited, use collaboration restrictions.",
  "check": [
   [
    "What sign-in option does a guest use when their domain has no Entra tenant or other configured identity provider?",
    "Email one-time passcode, or a personal Microsoft account if they have one."
   ],
   [
    "How can you stop users from inviting guests from a competitor's domain?",
    "Add the competitor's domain to the deny list in the collaboration restrictions of the external collaboration settings (or use an allow list of approved domains)."
   ],
   [
    "What does the acceptance status Pending on a guest account mean?",
    "The invitation has been sent but the user has not yet redeemed it."
   ]
  ]
 },
 {
  "t": "Cross-tenant access settings (inbound/outbound, trust settings), B2B direct connect and cross-tenant synchronization",
  "body": [
   "External collaboration settings decide who can invite whom. Cross-tenant access settings go deeper for collaboration with other Microsoft Entra tenants: they control which users and apps can cross the boundary, in which direction, and whether you trust security claims from the other tenant. You manage them under External Identities, Cross-tenant access settings, with default settings that apply to every external Entra tenant and organizational settings that override the defaults for specific tenants you add by domain or tenant ID.",
   "Settings have two directions. Inbound access controls external users coming into your tenant to use your resources. Outbound access controls your users going out to access other organizations' resources. For each direction and for each of B2B collaboration and B2B direct connect you can allow or block all users, or specific users and groups, and all applications or specific ones. Both sides must allow a connection for it to work: your outbound and their inbound.",
   "Inbound trust settings decide whether your Conditional Access accepts claims from the guest's home tenant. You can trust multifactor authentication performed there, trust devices marked compliant there, and trust Microsoft Entra hybrid joined devices there. Without trust, a guest with a compliance requirement would have no way to satisfy it, because your Intune doesn't manage their laptop, and an MFA requirement would force them to register MFA again in your tenant. Trust settings also include automatic redemption, which suppresses the consent prompt for users from that tenant, and must be enabled on both sides.",
   "B2B direct connect is a different model: no guest object is created in your tenant. The external user stays entirely in their home tenant and gets access to specific shared resources, today mainly Microsoft Teams shared channels. Because there is no object for you to govern, B2B direct connect is off by default and requires mutual configuration: both organizations must enable it inbound and outbound for each other. Reports and audit logs in both tenants show the activity.",
   "Cross-tenant synchronization automates B2B collaboration between tenants you control, such as subsidiaries of one company. It is configured in the source tenant as a provisioning job that creates, updates and deletes B2B user objects in the target tenant, by default with userType Member so they appear as colleagues. The target tenant must allow users sync into this tenant in its inbound settings for the source tenant, and usually enables automatic redemption so users never see a consent prompt. Scoping uses users and groups assigned to the configuration plus attribute filters, just like app provisioning, and provisioning logs show each change. It is one-way; use a second configuration in the other direction if you need both."
  ],
  "terms": [
   [
    "Inbound access",
    "Cross-tenant settings controlling which external users and apps can reach your tenant's resources."
   ],
   [
    "Outbound access",
    "Cross-tenant settings controlling which of your users can access other tenants' resources."
   ],
   [
    "Inbound trust settings",
    "Options to accept MFA, compliant device and hybrid joined device claims from a partner's home tenant."
   ],
   [
    "B2B direct connect",
    "Mutual trust that lets external users access resources such as Teams shared channels without a guest object in your tenant."
   ],
   [
    "Cross-tenant synchronization",
    "A provisioning job from a source tenant that creates and maintains B2B users in a target tenant."
   ]
  ],
  "example": "Contoso requires MFA and a compliant device for all users, including guests. A partner, Fabrikam, already enforces both. Contoso adds Fabrikam as an organizational setting, trusts Fabrikam's MFA and compliant devices, and enables B2B direct connect so both companies can share Teams channels. Fabrikam configures the matching outbound and inbound settings on its side.",
  "tip": "If guests are being prompted to register MFA in your tenant even though they already did MFA at home, the fix is inbound trust settings. If the scenario mentions Teams shared channels without guest accounts, the answer is B2B direct connect, which both tenants must enable.",
  "check": [
   [
    "Where is cross-tenant synchronization configured, and what must the other tenant allow?",
    "It is configured in the source tenant; the target tenant must allow users sync into this tenant in its inbound cross-tenant access settings for the source."
   ],
   [
    "Which setting stops guests from a trusted partner from being blocked by your policy requiring compliant devices?",
    "Inbound trust settings for that organization, trusting compliant devices from the partner's tenant."
   ],
   [
    "Does B2B direct connect create a guest user object in the resource tenant?",
    "No. Users remain in their home tenant, which is why both organizations must explicitly enable it."
   ]
  ]
 },
 {
  "t": "Hybrid identity: Microsoft Entra Connect Sync vs Microsoft Entra Cloud Sync, filtering and sync scheduling",
  "body": [
   "Most organizations still have on-premises Active Directory Domain Services (AD DS). Hybrid identity means the same people exist in both places with one set of credentials, and synchronization copies users, groups and optionally devices from AD to Microsoft Entra ID. Microsoft offers two tools for this, and the exam asks which to choose.",
   "Microsoft Entra Connect Sync is the traditional sync engine. You install it on a domain-joined Windows Server, where it runs a full synchronization engine with a SQL database (SQL Server Express by default). Only one server actively exports to a tenant; a second server can run in staging mode, importing and synchronizing but not exporting, ready for failover or for testing configuration changes. Connect Sync supports the widest set of features: device sync for hybrid join, group writeback, device writeback, Exchange hybrid writeback, pass-through authentication and federation setup, and highly customizable synchronization rules with the Synchronization Rules Editor.",
   "Microsoft Entra Cloud Sync moves the engine into the cloud. You install only a lightweight provisioning agent on one or more servers, and configuration lives in the Entra admin center. Multiple agents give high availability without staging servers, and Cloud Sync handles multiple disconnected forests well, which helps after mergers. It does not cover every Connect Sync feature, for example it doesn't synchronize device objects for hybrid join and doesn't support pass-through authentication, so check requirements. Microsoft positions Cloud Sync as the future direction, and both tools can run in the same tenant for different sets of objects, such as Connect Sync for the main forest and Cloud Sync for an acquired forest.",
   "Filtering decides which objects synchronize. With Connect Sync you can filter by domain, by organizational unit (OU), by attribute through custom sync rules, and by group membership, though group-based filtering is intended for pilots only. Cloud Sync scopes by OU or by security group. Filtering carefully keeps service accounts, test users and stale objects out of the cloud. Removing objects from scope deletes them in Entra, so Connect Sync has an accidental deletes threshold (500 objects by default) that stops an export which would delete too many at once.",
   "Connect Sync runs a delta sync cycle every 30 minutes by default. You can check the scheduler and force a run in PowerShell on the server:",
   "```powershell\nGet-ADSyncScheduler\nStart-ADSyncSyncCycle -PolicyType Delta\nStart-ADSyncSyncCycle -PolicyType Initial   # full sync after rule or filter changes\n```",
   "Use a delta cycle to push a recent change, and an initial (full) cycle after changing filtering or sync rules. Cloud Sync runs on its own frequent schedule and offers provision on demand to test a single user. Password hash synchronization runs on its own shorter cycle, separate from object sync."
  ],
  "terms": [
   [
    "Microsoft Entra Connect Sync",
    "An on-premises sync engine on Windows Server with a SQL database, supporting the broadest hybrid feature set."
   ],
   [
    "Microsoft Entra Cloud Sync",
    "A cloud-managed sync service that uses lightweight provisioning agents; configured in the Entra admin center."
   ],
   [
    "Staging mode",
    "A Connect Sync server that imports and syncs but does not export, used for failover and testing."
   ],
   [
    "Delta sync",
    "A sync cycle that processes only changes since the last run."
   ],
   [
    "Accidental deletes threshold",
    "A Connect Sync safeguard that blocks exports deleting more than a set number of objects."
   ]
  ],
  "example": "Contoso acquires Litware, whose AD forest has no network connectivity to Contoso's. Contoso keeps Connect Sync for its own forest, which uses hybrid join and group writeback, and installs two Cloud Sync provisioning agents in Litware's forest. Litware users appear in the same tenant within minutes, with no VPN between the forests.",
  "tip": "Disconnected forests or a need for a lightweight, highly available agent point to Cloud Sync. Device sync for hybrid join, pass-through authentication, or complex custom sync rules point to Connect Sync. Remember Start-ADSyncSyncCycle -PolicyType Delta to force a sync.",
  "check": [
   [
    "What is the default Microsoft Entra Connect Sync scheduler interval?",
    "30 minutes for a delta synchronization cycle."
   ],
   [
    "How do you provide failover for Connect Sync, and how does Cloud Sync differ?",
    "Connect Sync uses a second server in staging mode that you switch to active; Cloud Sync simply installs multiple provisioning agents for high availability."
   ],
   [
    "Which sync cycle should you run after changing OU filtering?",
    "An initial (full) cycle, Start-ADSyncSyncCycle -PolicyType Initial."
   ]
  ]
 },
 {
  "t": "Sign-in methods for hybrid users: password hash sync, pass-through authentication, federation, Seamless SSO, staged rollout",
  "body": [
   "Once users are synchronized, you must decide where their passwords are checked when they sign in to cloud services. There are three authentication methods, and choosing between them is a favorite exam topic.",
   "Password hash synchronization (PHS) copies a hash of the on-premises password hash to Microsoft Entra ID, never the password itself. The on-premises hash is re-hashed with a salt and many iterations before it leaves the network. Microsoft Entra ID then authenticates users directly in the cloud. PHS is the simplest option, has no on-premises dependency at sign-in time, and enables leaked credential detection in Microsoft Entra ID Protection because Microsoft can compare hashes against known breach data. Password changes sync within minutes. Many organizations enable PHS even when using another method, as a backup.",
   "Pass-through authentication (PTA) validates passwords against on-premises AD in real time. Lightweight agents installed on-premises make outbound connections to Entra; when a user signs in, the encrypted password is placed on a queue, an agent picks it up and checks it against a domain controller. No password hash is stored in the cloud, and on-premises account policies such as logon hours and disabled or locked accounts apply immediately. Install at least three agents for resilience, because if no agent is reachable, users can't sign in.",
   "Federation hands authentication to a separate identity provider, typically Active Directory Federation Services (AD FS). Users are redirected to the federation server, which issues a token Entra trusts. Federation supports requirements that the cloud methods can't, such as some on-premises smart card or third-party MFA scenarios, but it brings the most infrastructure: federation servers, proxies, certificates and load balancers. Microsoft recommends moving from federation to cloud authentication when possible.",
   "Seamless single sign-on (Seamless SSO) works with PHS or PTA, not federation. When a user on a domain-joined device on the corporate network opens a cloud app, the browser obtains a Kerberos ticket for a computer account named AZUREADSSOACC that Entra Connect creates in AD, and Entra signs the user in without a password prompt. The Kerberos decryption key for this account should be rolled over periodically. Entra joined and hybrid joined Windows devices use their primary refresh token for SSO, so Seamless SSO mainly helps older or domain-only devices.",
   "Staged rollout lets you move from federation to cloud authentication gradually. You turn on PHS or PTA for selected security groups, and only those users authenticate in the cloud while the domain stays federated for everyone else. Nested and dynamic groups aren't supported for staged rollout, so use directly assigned groups. When the pilot succeeds, you convert the domain from federated to managed."
  ],
  "terms": [
   [
    "Password hash synchronization",
    "Syncing a salted, re-hashed version of the on-premises password hash so Entra ID can authenticate users in the cloud."
   ],
   [
    "Pass-through authentication",
    "Cloud sign-in where on-premises agents validate passwords against AD DS in real time."
   ],
   [
    "Federation",
    "Delegating authentication to a separate identity provider such as AD FS that issues tokens Entra trusts."
   ],
   [
    "Seamless SSO",
    "Kerberos-based silent sign-in for domain-joined devices on the corporate network, used with PHS or PTA."
   ],
   [
    "Staged rollout",
    "Moving selected groups from federated to cloud authentication before converting the whole domain."
   ]
  ],
  "example": "A bank runs AD FS but its federation servers are costly to maintain. The team enables password hash sync for everyone as a backup, uses staged rollout to move a pilot group of 200 users to PHS with Seamless SSO, watches the sign-in logs for a month, and then converts the domain to managed and retires AD FS.",
  "tip": "If the scenario needs on-premises policies like logon hours enforced at sign-in without storing hashes in the cloud, choose PTA. If it wants the least infrastructure or leaked credential detection, choose PHS. Seamless SSO never pairs with federation.",
  "check": [
   [
    "Which hybrid sign-in method enables leaked credential detection in ID Protection?",
    "Password hash synchronization, because Entra ID has the hashes to compare against leaked credentials."
   ],
   [
    "What happens to pass-through authentication sign-ins if all on-premises agents are offline?",
    "Users can't sign in with PTA, which is why you install multiple agents (and may enable PHS as a backup)."
   ],
   [
    "What is the purpose of staged rollout?",
    "To test cloud authentication (PHS or PTA) with selected groups while the domain remains federated, before converting fully."
   ]
  ]
 },
 {
  "t": "Monitoring sync health with Microsoft Entra Connect Health and troubleshooting sync errors",
  "body": [
   "Synchronization runs quietly in the background, so you need monitoring to know when it breaks. Microsoft Entra Connect Health provides that monitoring for hybrid identity infrastructure. It uses agents on your on-premises servers: the sync agent is installed with Microsoft Entra Connect Sync, and separate agents can monitor AD FS servers and AD DS domain controllers. Connect Health requires Microsoft Entra ID P1 licensing.",
   "In the Connect Health blade you see the health of each monitored server, active alerts (for example, the sync service is not running, an export to Entra ID failed, or password hash sync has stopped), the time of the last successful sync, and performance data. You can configure email notifications so the right admins learn about alerts even when they aren't looking at the portal. For AD FS, Connect Health also reports failed sign-ins and risky IP addresses; for AD DS, it reports replication and domain controller health.",
   "The Synchronization errors report lists objects that failed to export and why. Common categories are: duplicate attribute, when two objects have the same UserPrincipalName or proxyAddresses value, which Entra blocks because these must be unique; data mismatch, when a soft match finds an object that can't be matched; data validation failure, for example invalid characters in a UPN; large attribute, when a value such as userCertificate exceeds allowed size; and federated domain change, when a UPN suffix change moves a user between federated domains. Each entry shows the conflicting objects so you can fix the source data.",
   "Many sync errors come from matching. When a synced object first reaches Entra, it tries to match an existing cloud object. A hard match uses the sourceAnchor, stored as immutableId in Entra and based on ms-DS-ConsistencyGuid by default in modern deployments. A soft match falls back to the primary SMTP address or UPN. Soft matching is how you attach an on-premises account to a cloud-only user created earlier; for security, soft matching to cloud accounts that hold admin roles is blocked, and Microsoft recommends also blocking hard-match takeover of cloud objects.",
   "On the Connect Sync server itself, the Synchronization Service Manager shows each run profile, its status and any object-level errors on the connectors, and the Microsoft Entra Connect wizard offers a troubleshooting task that checks object sync and password hash sync for a specific user. Useful commands include Get-ADSyncScheduler to confirm the scheduler is enabled and not in maintenance, and Start-ADSyncSyncCycle to rerun sync after a fix. Before a first sync, the IdFix tool helps find and fix duplicates and invalid characters in AD.",
   "Troubleshooting follows a pattern: read the error, identify the conflicting objects, fix the data in the source of authority (usually on-premises AD), and run a delta sync. Avoid editing synced attributes in the cloud, because the next sync will overwrite them or fail."
  ],
  "terms": [
   [
    "Microsoft Entra Connect Health",
    "A monitoring service with on-premises agents that reports health, alerts and sync errors for Connect Sync, AD FS and AD DS."
   ],
   [
    "Duplicate attribute error",
    "A sync error when two objects share a value such as UPN or proxyAddresses that must be unique."
   ],
   [
    "Hard match",
    "Matching an on-premises object to a cloud object by sourceAnchor (immutableId)."
   ],
   [
    "Soft match",
    "Matching an on-premises object to an existing cloud object by primary SMTP address or UPN."
   ],
   [
    "IdFix",
    "A tool that scans on-premises AD for data problems such as duplicates and invalid characters before synchronization."
   ]
  ],
  "example": "Connect Health emails an alert that two objects failed to export. The report shows a duplicate proxyAddresses value: a departed employee's disabled account still holds the same email alias as a new hire. The admin removes the alias from the old account in AD, runs Start-ADSyncSyncCycle -PolicyType Delta, and the error clears on the next export.",
  "tip": "Fix sync errors at the source of authority, not in the cloud. For a duplicate attribute error, find the other object holding the value; for a stopped sync with no errors, check whether the scheduler is disabled or the server is in staging mode.",
  "check": [
   [
    "Which license does Microsoft Entra Connect Health require?",
    "Microsoft Entra ID P1 (or a plan that includes it)."
   ],
   [
    "A new synced user fails with a duplicate attribute error on UserPrincipalName. What do you do?",
    "Find the other object already using that UPN, change or remove the value in the source (usually on-premises AD), then run a delta sync."
   ],
   [
    "What is the difference between a hard match and a soft match?",
    "A hard match uses the sourceAnchor/immutableId; a soft match uses the primary SMTP address or UPN to link to an existing cloud object."
   ]
  ]
 },
 {
  "t": "Authentication methods policy: Microsoft Authenticator, passkeys (FIDO2), Windows Hello for Business, certificate-based authentication, Temporary Access Pass, SMS/voice",
  "body": [
   "The Authentication methods policy is the central place in Microsoft Entra ID to decide which methods users may register and use for sign-in, MFA and self-service password reset. Older tenants had separate legacy MFA and SSPR policies; Microsoft has been migrating everyone to the unified policy, and new configuration belongs there. For each method you enable or disable it, target it to all users or selected groups, exclude groups, and set method-specific options.",
   "Microsoft Authenticator supports push notifications with number matching, where the user types the number shown on the sign-in screen into the app, which defeats MFA fatigue attacks that rely on a user approving a random prompt. Additional context can show the app name and location. Authenticator also supports passwordless phone sign-in and can hold device-bound passkeys.",
   "Passkeys (FIDO2) use public-key cryptography: a private key stays on a security key, phone or computer and never leaves it, and it only answers challenges from the genuine sign-in domain. This makes them phishing-resistant. In the passkey settings you can enforce attestation and restrict allowed models by their Authenticator Attestation GUID (AAGUID). Windows Hello for Business is a phishing-resistant method built into Windows that binds a key to the device's TPM and unlocks it with a PIN or biometric.",
   "Certificate-based authentication (CBA) lets users sign in with an X.509 certificate, such as a smart card, validated against certificate authorities you upload to Entra. You configure username binding (which certificate field maps to which user attribute) and authentication binding rules that decide whether a certificate counts as single-factor or multifactor. CBA removes the need for federation servers just to support smart cards.",
   "Temporary Access Pass (TAP) is a time-limited passcode an admin issues, either one-time use or multi-use within its lifetime. It's used to onboard a new user who has no methods yet, or to recover a user who lost their device, so they can register a passkey or Authenticator without ever knowing a password. TAP counts as strong authentication, so treat issuing one as a sensitive action.",
   "SMS and voice calls are still available but are the weakest methods, vulnerable to SIM swapping and interception. Keep them only as fallbacks, and plan to move users to stronger methods. Other methods include software and hardware OATH tokens, and email OTP, which is used for SSPR by members and sign-in by guests rather than as an MFA method.",
   "Across all of this, the principle is a ladder: phishing-resistant methods (passkeys, Windows Hello for Business, CBA) are strongest, then Authenticator push or codes, then SMS and voice. Conditional Access authentication strengths let you require a rung of that ladder for specific apps."
  ],
  "terms": [
   [
    "Authentication methods policy",
    "The unified Entra policy that enables and targets methods for sign-in, MFA and SSPR."
   ],
   [
    "Number matching",
    "An Authenticator push feature requiring the user to enter a number shown on the sign-in screen, blocking MFA fatigue approvals."
   ],
   [
    "Passkey (FIDO2)",
    "A phishing-resistant credential using a device-held private key bound to the sign-in domain."
   ],
   [
    "Temporary Access Pass",
    "A time-limited passcode issued by an admin for onboarding or recovery, used to register stronger methods."
   ],
   [
    "Certificate-based authentication",
    "Signing in to Entra ID with an X.509 certificate validated against uploaded certificate authorities."
   ]
  ],
  "example": "A new nurse starts on Monday with no phone registered. The help desk issues a one-time Temporary Access Pass valid for a few hours. She signs in with it, registers a FIDO2 security key and Microsoft Authenticator, and from then on signs in passwordlessly. SMS is enabled only for a small group with no smartphones.",
  "tip": "Phishing-resistant means passkeys/FIDO2, Windows Hello for Business and certificate-based authentication, not Authenticator push or SMS. When a user has no methods and must set up passwordless sign-in, the answer is Temporary Access Pass.",
  "check": [
   [
    "Which Authenticator feature defends against MFA fatigue (prompt bombing)?",
    "Number matching, which requires the user to type the number displayed on the sign-in screen."
   ],
   [
    "How can you allow only specific FIDO2 security key models?",
    "Enforce attestation and restrict keys by AAGUID in the passkey (FIDO2) settings of the Authentication methods policy."
   ],
   [
    "What is Temporary Access Pass designed for?",
    "Letting a user without registered methods (new or recovering) sign in for a limited time to register strong or passwordless methods."
   ]
  ]
 },
 {
  "t": "Registration campaigns, combined security info registration and system-preferred MFA",
  "body": [
   "Strong authentication only helps if users actually register strong methods. Microsoft Entra ID has three features that work together to get users onto better methods and keep them there: combined security info registration, registration campaigns and system-preferred MFA.",
   "Combined security info registration gives users a single experience to register methods for both multifactor authentication and self-service password reset, instead of registering twice in two different places. Users reach it from the My Security Info page in their account portal, or they are interrupted during sign-in when a policy requires registration. Combined registration is now the standard experience in all tenants. Admins can protect the registration process itself with a Conditional Access policy targeting the user action Register security information, for example allowing registration only from a trusted location or a compliant device, or requiring a Temporary Access Pass for new users. This matters because an attacker who steals a password could otherwise register their own MFA method first.",
   "A registration campaign, also called the nudge, prompts users who are already doing MFA with a weaker method, such as SMS or voice, to set up Microsoft Authenticator (or another targeted method) during sign-in. You configure it in the Authentication methods policy under Registration campaign: turn it on, choose which users or groups are included or excluded, and set how many days users may snooze the prompt. Users can skip it a limited number of times before the snooze choice goes away. The campaign only targets users who are enabled for the target method in the Authentication methods policy and who haven't registered it yet, and it doesn't nag users who have already moved.",
   "System-preferred MFA changes which method Entra asks for. Previously, a user's default method, which they chose themselves and was often SMS, was used first even if they had registered something stronger. With system-preferred MFA, Entra prompts for the most secure method the user has registered and that policy allows, and the user can still pick another method from the list if needed. The ranking puts methods such as passkeys, certificate-based authentication and Authenticator notifications ahead of OATH codes, and SMS and voice last. System-preferred MFA is managed by Microsoft and enabled by default, though admins can exclude groups while they troubleshoot.",
   "Together these features form a lifecycle: users register in one place, get nudged toward a stronger method, and are then prompted with that strongest method automatically. To measure progress, open the Authentication methods activity and User registration details reports, which show who has registered which methods and who is MFA capable, passwordless capable or SSPR registered. Pair this with Conditional Access authentication strengths once most users have registered, so strong methods become required, not just preferred."
  ],
  "terms": [
   [
    "Combined security info registration",
    "One registration experience for MFA and SSPR methods, reached from the My Security Info page."
   ],
   [
    "Registration campaign",
    "A sign-in prompt (nudge) that asks users on weaker methods to register Microsoft Authenticator or another targeted method."
   ],
   [
    "System-preferred MFA",
    "Entra behavior that prompts for the strongest registered method rather than the user's chosen default."
   ],
   [
    "Register security information user action",
    "A Conditional Access target used to control when and where users can register authentication methods."
   ]
  ],
  "example": "Reports show 60 percent of staff still use SMS for MFA. The admin starts a registration campaign for all users, allowing a few days of snooze, and adds a Conditional Access policy that permits security info registration only from the office network or with a Temporary Access Pass. Three months later most users have Authenticator, and system-preferred MFA prompts them with it automatically.",
  "tip": "The nudge moves users to Authenticator; system-preferred MFA makes Entra ask for the strongest method already registered. To stop attackers registering methods with a stolen password, use a Conditional Access policy on the Register security information user action.",
  "check": [
   [
    "Which feature prompts users who use SMS to set up Microsoft Authenticator at sign-in?",
    "A registration campaign (nudge) configured in the Authentication methods policy."
   ],
   [
    "A user has registered both SMS and a passkey, and SMS is their default. What does system-preferred MFA ask for?",
    "The passkey, because it is the most secure registered method the policy allows."
   ],
   [
    "How can you restrict where users are allowed to register MFA methods?",
    "Create a Conditional Access policy targeting the Register security information user action, for example requiring a trusted location or compliant device."
   ]
  ]
 },
 {
  "t": "Self-service password reset (SSPR): methods, registration, and password writeback for hybrid users",
  "body": [
   "Self-service password reset (SSPR) lets users reset a forgotten password or unlock their account without calling the help desk. It cuts support costs and gets users back to work faster, but it is also an attack path, so its settings matter.",
   "You enable SSPR under Password reset with one of three scopes: None, Selected (one group) or All. Then choose how many methods are required to reset, one or two, and which methods are allowed: mobile app notification, mobile app code, email, mobile phone (SMS or call), office phone and security questions. Security questions are the weakest option and can't be used by administrators. Modern tenants also manage available methods through the Authentication methods policy, which is where Microsoft is consolidating method settings.",
   "Administrators follow a separate, stricter policy that you can't weaken: Microsoft always applies a two-method policy to admin roles, and admins can't use security questions. So even if SSPR is set to None for users, admins can still reset their own passwords with strong methods.",
   "Registration settings decide whether users are required to register when they sign in and how often (in days) they are asked to reconfirm their information. With combined registration, users register SSPR and MFA methods in one place. Notifications can alert users when their password is reset and alert all admins when another admin resets their password, which helps spot abuse. You can also customize the help desk link shown on the reset page.",
   "Password writeback is the key hybrid setting. For synchronized users, the password's source of authority is on-premises Active Directory, so a password reset in the cloud must be written back to AD. Writeback is supported by Microsoft Entra Connect Sync and by Cloud Sync, and it requires Microsoft Entra ID P1 or higher. The sync account in AD needs permissions to reset and change passwords and to write the lockoutTime and pwdLastSet attributes on user objects in scope. Once enabled in the sync tool, you turn on writeback in the Entra admin center under Password reset, On-premises integration, and you can also allow users to unlock accounts without resetting their password.",
   "Writeback works over the outbound connection the sync tool already uses, so no inbound firewall ports are needed. It honors on-premises password policy: if the new password fails AD's complexity or history rules, the user gets an immediate error. If users report that cloud resets aren't working on their PCs, check that writeback is enabled on both sides, the permissions are correct, and the user is in sync scope."
  ],
  "terms": [
   [
    "SSPR",
    "Self-service password reset, letting users reset passwords or unlock accounts using registered methods."
   ],
   [
    "Password writeback",
    "Writing passwords changed or reset in Entra ID back to on-premises AD for synchronized users."
   ],
   [
    "Number of methods required",
    "The SSPR setting (one or two) that controls how many verification methods a user must pass to reset."
   ],
   [
    "Admin SSPR policy",
    "The fixed, stronger policy for administrator roles that requires two methods and disallows security questions."
   ]
  ],
  "example": "A synced user forgets her password while travelling. She uses SSPR, passes an Authenticator notification and a phone code, and sets a new password. Because writeback is enabled in Entra Connect and in the Password reset settings, the new password is written to AD immediately, so she can unlock her domain-joined laptop over VPN with it.",
  "tip": "If synced users can reset in the cloud but their on-premises password doesn't change, the answer is password writeback (P1, enabled in the sync tool and in the portal). Remember admins always get the two-method policy and can't use security questions.",
  "check": [
   [
    "What are the three SSPR enablement scopes?",
    "None, Selected (a single group) and All."
   ],
   [
    "Which license is required for SSPR with on-premises password writeback?",
    "Microsoft Entra ID P1 or higher."
   ],
   [
    "Can administrators use security questions for SSPR?",
    "No. Admin roles always use a stronger two-method policy that excludes security questions."
   ]
  ]
 },
 {
  "t": "Microsoft Entra Password Protection: global and custom banned password lists, smart lockout, on-premises DC agent and proxy",
  "body": [
   "Many breaches start with password spraying: an attacker tries a few common passwords, such as a season plus a year, against many accounts. Microsoft Entra Password Protection makes those guessable passwords impossible to set, and smart lockout slows down guessing without locking out real users.",
   "The global banned password list is maintained by Microsoft from telemetry on real attacks. It is applied automatically to all cloud users, you can't see or edit it, and it updates without admin action. The custom banned password list is yours: you add terms specific to your organization, such as your company name, product names, local sports teams or city, and Entra blocks passwords built on them. The custom list holds up to 1,000 base terms and requires Microsoft Entra ID P1.",
   "Evaluation is smarter than a simple lookup. The password is normalized (lowercased, with common character substitutions such as 0 for o and $ for s reversed), then checked for banned terms, including fuzzy matches within one edit. A scoring rule then decides: each banned term found counts as one point and each remaining character counts as one point, and the password must score at least five points. So Contoso2024! is rejected, while a long passphrase that happens to contain one banned word can still pass.",
   "Smart lockout protects against guessing at sign-in time. After a number of failed attempts (the lockout threshold) the account is locked for a lockout duration, and the duration increases with repeated lockouts. Smart lockout distinguishes familiar locations from unfamiliar ones, so an attacker in another country is locked out while the real user can still sign in, and it tracks the last few bad password hashes so the same wrong password entered repeatedly doesn't count repeatedly. Customizing the threshold and duration requires P1. In hybrid environments, set the Entra lockout threshold lower than the on-premises AD threshold and the Entra duration longer than AD's, so attacks are stopped in the cloud before they lock accounts on-premises.",
   "To extend the same banned list to on-premises Active Directory, deploy two components. The Password Protection DC agent is installed on every domain controller; a password filter DLL checks each password change or reset against the policy. The Password Protection proxy service runs on one or more member servers with internet access and forwards policy downloads from Entra; the DC agents never need internet access themselves. The policy is cached in SYSVOL and replicates to all DCs. Start in Audit mode, which logs what would have been blocked in the DC agent event log, and switch to Enforced when you're confident. The on-premises feature requires P1 for users whose passwords are checked.",
   "Password protection only acts when a password is set or changed, so existing weak passwords remain until the next change."
  ],
  "terms": [
   [
    "Global banned password list",
    "A Microsoft-maintained, non-editable list of weak passwords applied to all Entra users."
   ],
   [
    "Custom banned password list",
    "An admin-defined list of organization-specific terms that Entra blocks in passwords; requires P1."
   ],
   [
    "Smart lockout",
    "Entra sign-in protection that locks out attackers after failed attempts while distinguishing familiar and unfamiliar locations."
   ],
   [
    "DC agent",
    "The Password Protection component installed on every domain controller to enforce the banned list on-premises."
   ],
   [
    "Proxy service",
    "The Password Protection component on a member server that relays policy between Entra ID and the DC agents."
   ]
  ],
  "example": "Northwind's red team finds many staff using Northwind plus the year. The admin adds Northwind, product names and the city to the custom banned list, installs the proxy on two member servers and DC agents on all domain controllers in Audit mode, reviews a week of event logs, and then switches to Enforced so AD rejects those passwords too.",
  "tip": "DC agents go on every domain controller and need no internet; the proxy goes on member servers with outbound internet access. For hybrid lockout, keep Entra's threshold below AD's and its duration above AD's.",
  "check": [
   [
    "Can you add terms to the global banned password list?",
    "No. The global list is managed by Microsoft; you add your own terms to the custom banned password list."
   ],
   [
    "Which component of on-premises Password Protection must be installed on every domain controller?",
    "The Password Protection DC agent; the proxy service goes on member servers."
   ],
   [
    "Why should the on-premises AD lockout threshold be higher than the Entra smart lockout threshold?",
    "So cloud smart lockout stops password guessing before attackers can lock accounts in on-premises AD."
   ]
  ]
 },
 {
  "t": "Security defaults vs Conditional Access, and emergency access (break-glass) accounts",
  "body": [
   "Security defaults are a free, one-switch set of identity protections that Microsoft enables for new tenants. They require all users to register for multifactor authentication (with a grace period after which registration is enforced), require administrators to perform MFA every time they sign in, prompt users for MFA when Microsoft judges it necessary, block legacy authentication protocols that can't do MFA, and protect privileged activities such as access to the Azure portal. Security defaults steer users to register Microsoft Authenticator as their MFA method. There is nothing to tune: no exclusions, no locations, no per-app rules.",
   "Conditional Access (CA) is the configurable alternative. It requires Microsoft Entra ID P1 and lets you build if-then policies: if this user signs in to this app from this kind of device or location with this level of risk, then require MFA, a compliant device, or block. CA can exclude emergency accounts, apply different rules to different apps, and use signals like device compliance and risk that security defaults can't.",
   "You can't use both at the same time. To create Conditional Access policies you must first turn security defaults off, and when you do, you must immediately replace their protections, typically with policies that require MFA for admins, require MFA for all users, block legacy authentication and protect Azure management. Microsoft also provides policy templates for these. The rule of thumb: small organizations without P1 use security defaults; organizations with P1 use Conditional Access.",
   "Emergency access accounts, often called break-glass accounts, prevent you from locking yourself out of the tenant. Lockouts happen when a Conditional Access policy is misconfigured, a federation service fails, or an MFA service has an outage. Microsoft recommends at least two such accounts with these properties: cloud-only accounts that use the onmicrosoft.com domain, so they don't depend on on-premises AD or federation; permanently assigned the Global Administrator role; not tied to an individual person; and protected with strong, phishing-resistant authentication such as a FIDO2 passkey, stored securely. Because Azure and admin portals now require MFA, a password-only break-glass account is no longer adequate.",
   "Exclude at least one emergency account from Conditional Access policies that could block access, or design policies so the account can still satisfy them with its dedicated method. Monitor every sign-in of these accounts: send sign-in logs to Log Analytics and create an alert that fires whenever a break-glass account signs in. Test the accounts on a schedule, such as every few months, and after changes to your policies, so you know they work before you need them."
  ],
  "terms": [
   [
    "Security defaults",
    "Free, preconfigured identity protections that enforce MFA registration, admin MFA and legacy auth blocking with no customization."
   ],
   [
    "Conditional Access",
    "A P1 policy engine that grants or blocks access based on signals such as user, app, device, location and risk."
   ],
   [
    "Emergency access account",
    "A cloud-only, highly privileged break-glass account used only when normal admin access is lost."
   ],
   [
    "Legacy authentication",
    "Older protocols such as basic authentication for POP, IMAP and SMTP that can't perform MFA."
   ]
  ],
  "example": "A school district buys P1 and wants to exempt a kiosk app from MFA. The admin creates two break-glass accounts with FIDO2 keys kept in separate safes, excludes them from all CA policies, deploys CA policies for MFA and legacy auth blocking in report-only mode, disables security defaults, and turns the CA policies on. An alert rule emails the security team whenever either break-glass account signs in.",
  "tip": "Security defaults and Conditional Access are mutually exclusive; if a question needs exclusions, locations or per-app rules, the answer is Conditional Access with P1. Break-glass accounts are cloud-only, onmicrosoft.com, Global Administrator, excluded from lockout-risk policies and monitored with alerts.",
  "check": [
   [
    "What must you do before creating Conditional Access policies in a tenant using security defaults?",
    "Disable security defaults, then replace their protections with equivalent CA policies."
   ],
   [
    "Why should emergency access accounts use the onmicrosoft.com domain?",
    "So they are cloud-only and don't depend on on-premises AD, synchronization or a federation service that might be unavailable."
   ],
   [
    "How should you know when an emergency access account is used?",
    "Send sign-in logs to Log Analytics (or another monitoring tool) and alert on any sign-in by those accounts."
   ]
  ]
 },
 {
  "t": "Conditional Access: assignments, conditions (locations, device platforms, client apps, filters for devices, risk), grant and session controls",
  "body": [
   "A Conditional Access policy is an if-then statement evaluated at sign-in, after the first authentication factor. The if part contains assignments and conditions; the then part contains access controls. Every policy that applies to a sign-in is enforced, and if any applicable policy blocks, access is blocked. There is no priority order; controls from all matching policies are combined.",
   "Assignments define who and what. Users can be all users, selected users and groups, directory roles, guest or external user types, or workload identities (service principals, which require a separate license). Always exclude your emergency access accounts. Target resources can be cloud apps (all apps, selected apps such as Office 365 or the Windows Azure Service Management API), user actions (Register security information, Register or join devices), or an authentication context, a tag that apps can request for sensitive operations.",
   "Conditions narrow when a policy applies. User risk and sign-in risk use Microsoft Entra ID Protection levels (P2). Device platforms include Android, iOS, Windows, macOS and Linux, detected from the client and therefore not a strong security boundary. Locations, now labelled network, use named locations such as trusted IP ranges or countries. Client apps separate browser, mobile apps and desktop clients, Exchange ActiveSync and other clients, which lets you block legacy authentication. Filter for devices uses rules on device attributes, such as device.trustType or extensionAttribute values, to include or exclude specific devices like privileged access workstations. Authentication flows can target device code flow and authentication transfer.",
   "Grant controls decide the outcome. Block access stops the sign-in. Grant access can require one or more of: multifactor authentication, an authentication strength, a device marked as compliant, a Microsoft Entra hybrid joined device, an app protection policy, a password change (used with user risk), and terms of use. When several are selected you choose Require all the selected controls or Require one of the selected controls.",
   "Session controls shape what happens after access is granted. Use app enforced restrictions passes device state to SharePoint and Exchange so they can offer limited, browser-only access from unmanaged devices. Use Conditional Access App Control routes the session through Microsoft Defender for Cloud Apps for real-time monitoring and controls such as blocking downloads. Sign-in frequency and persistent browser session control how often users reauthenticate, and further options customize continuous access evaluation, disable resilience defaults and require token protection.",
   "Each policy has a state of On, Off or Report-only. Build and test in report-only, check the results, and then turn it on."
  ],
  "terms": [
   [
    "Assignments",
    "The users, workload identities and target resources that a Conditional Access policy applies to."
   ],
   [
    "Conditions",
    "Additional signals such as risk, device platform, network location, client app and device filters that narrow a policy."
   ],
   [
    "Grant controls",
    "The access decision: block, or grant while requiring MFA, compliant device, authentication strength and similar."
   ],
   [
    "Session controls",
    "Controls applied after access is granted, such as sign-in frequency, app enforced restrictions and App Control."
   ],
   [
    "Filter for devices",
    "A rule on device attributes that includes or excludes specific devices from a policy."
   ]
  ],
  "example": "Contoso wants to block legacy authentication, require MFA for all users off the corporate network, and allow only browser access to SharePoint from unmanaged devices. It creates three policies: block for other clients and Exchange ActiveSync, require MFA excluding the trusted named location, and app enforced restrictions for SharePoint. All exclude the break-glass accounts.",
  "tip": "All applicable policies are combined, and block always wins. Device platform is a convenience condition, not a security boundary; use compliant device or filters for devices for real device control. Require one versus require all changes the meaning of multiple grant controls.",
  "check": [
   [
    "Two policies apply to a sign-in: one requires MFA, the other blocks access. What happens?",
    "Access is blocked, because all applicable policies are enforced and a block overrides grants."
   ],
   [
    "Which condition would you use to block legacy authentication protocols?",
    "Client apps, selecting Exchange ActiveSync clients and other clients, with a block grant control."
   ],
   [
    "How can you apply a policy only to privileged access workstations?",
    "Use a filter for devices condition on a device attribute that identifies those workstations."
   ]
  ]
 },
 {
  "t": "Named locations, authentication strengths, sign-in frequency, persistent browser session and token protection",
  "body": [
   "These are the building blocks that make Conditional Access policies precise. Each one answers a specific question: where is the user, how strongly did they prove who they are, how often must they prove it again, and can a stolen session be replayed elsewhere?",
   "Named locations define networks. An IP ranges location lists public IPv4 or IPv6 ranges in CIDR notation, such as your office egress addresses, and can be marked as a trusted location, which lowers sign-in risk calculations and can be excluded from MFA policies. A countries or regions location groups countries; Entra determines the country from the IP address, or optionally from GPS coordinates reported by Microsoft Authenticator. You can include unknown countries or regions for addresses that can't be mapped. In a policy, locations appear under the Network condition, where you can include or exclude any location, all trusted locations or specific named locations. Blocking sign-ins from countries where you don't operate is a common use.",
   "Authentication strengths replace the simple require MFA control with a list of allowed method combinations. Three are built in: Multifactor authentication strength, Passwordless MFA strength and Phishing-resistant MFA strength, which allows only passkeys (FIDO2), Windows Hello for Business and certificate-based multifactor authentication. You can create custom strengths, for example allowing only certain FIDO2 key models by AAGUID. Use the Require authentication strength grant control, for example phishing-resistant MFA for admin roles. Strengths can also apply to external users, subject to your cross-tenant trust settings.",
   "Sign-in frequency sets how long before a user must reauthenticate, in hours or days, or Every time, which is used for sensitive actions such as risky sign-in remediation or PIM activation. By default Entra uses a long rolling window and reissues tokens silently while the session stays healthy, so this control is used to tighten that behavior. Persistent browser session controls whether the browser keeps users signed in after they close it: Always persistent or Never persistent. It requires targeting all cloud apps, and Never persistent is a good fit for unmanaged or shared devices.",
   "Token protection, a session control, binds sign-in session tokens to the device they were issued to, using the device's primary refresh token, so a token stolen from one device can't be replayed from another. It targets token theft attacks such as adversary-in-the-middle phishing and malware that steals browser cookies. Support is limited to specific platforms and client applications, currently mainly desktop apps on Windows for services such as Exchange Online and SharePoint Online, so test it in report-only mode first and scope it to supported apps and devices."
  ],
  "terms": [
   [
    "Named location",
    "An administrator-defined IP range or set of countries used in Conditional Access network conditions."
   ],
   [
    "Trusted location",
    "A named IP location marked as trusted, which can be excluded from policies and lowers risk evaluation."
   ],
   [
    "Authentication strength",
    "A Conditional Access control that specifies which authentication method combinations satisfy a policy."
   ],
   [
    "Sign-in frequency",
    "A session control setting how long before users must reauthenticate, or requiring it every time."
   ],
   [
    "Token protection",
    "A session control that binds tokens to the issuing device to prevent replay of stolen tokens."
   ]
  ],
  "example": "A finance firm requires phishing-resistant MFA strength for all admin roles, sets sign-in frequency to four hours and never persistent browser sessions for users on unmanaged devices, blocks sign-ins from a countries location containing places it doesn't operate, and pilots token protection for Exchange Online on Windows devices in report-only mode.",
  "tip": "Phishing-resistant strength means passkeys, Windows Hello for Business and CBA; Authenticator push does not qualify. Persistent browser session only works when the policy targets all cloud apps.",
  "check": [
   [
    "Which built-in authentication strength would you require for administrators to resist phishing?",
    "Phishing-resistant MFA strength."
   ],
   [
    "How does Entra determine a user's country for a countries or regions named location?",
    "From the IP address, or optionally from GPS coordinates reported by the Microsoft Authenticator app."
   ],
   [
    "What attack does token protection defend against?",
    "Token theft and replay, where a session token stolen from one device is used from another device."
   ]
  ]
 },
 {
  "t": "Testing policies with report-only mode and the What If tool; troubleshooting with sign-in logs",
  "body": [
   "A badly scoped Conditional Access policy can lock out an entire organization, including its administrators. Microsoft gives you three tools to avoid that and to diagnose problems afterward: report-only mode, the What If tool and the sign-in logs.",
   "Report-only mode is a policy state alongside On and Off. A report-only policy is evaluated at every real sign-in and the result is logged, but nothing is enforced. In each sign-in log entry, the Report-only tab shows results such as Report-only: Success (the user would have satisfied the controls), Report-only: Failure (the user would have been blocked or could not satisfy a control), Report-only: User action required (the user would have been prompted, for example for MFA) and Report-only: Not applied (conditions didn't match). The Conditional Access insights and reporting workbook summarizes these across users and apps when sign-in logs are sent to Log Analytics. Let a new policy run in report-only for long enough to cover normal work patterns, then switch it on.",
   "The What If tool answers a hypothetical question: if this user signed in to this app under these conditions, which policies would apply? You supply a user or workload identity, a cloud app or user action, and optional conditions such as IP address, country, device platform, client app, device state and sign-in or user risk level. The result lists policies that would apply, with their grant and session controls, and policies that would not apply, with the reason, for example user excluded or location condition not matched. What If is ideal for checking exclusions, such as confirming a break-glass account is excluded from every blocking policy, and for answering a help desk question before a user tries again.",
   "Sign-in logs record what actually happened. Each entry shows the user, application, time, IP address, location, client app, device details, authentication details (which methods were used and whether MFA was satisfied by claim in the token) and the Conditional Access result: Success, Failure or Not applied, with a Conditional Access tab listing every policy and its result. Error codes identify the reason; for example 53003 indicates access was blocked by Conditional Access, and 50126 indicates an invalid username or password. The Troubleshooting and support section and the correlation ID are what Microsoft support asks for.",
   "A practical troubleshooting sequence: find the failed sign-in by user and time, read the status and error code, open the Conditional Access tab to see which policy failed and which control was not satisfied, compare device details with what the policy expects (for example, compliant device false), and then use What If to confirm the fix before the user retries. Remember that interactive and non-interactive sign-ins appear on separate tabs, and that service principal and managed identity sign-ins have their own logs too."
  ],
  "terms": [
   [
    "Report-only mode",
    "A Conditional Access policy state that evaluates and logs results without enforcing them."
   ],
   [
    "What If tool",
    "A Conditional Access tool that simulates a sign-in to show which policies would apply and why."
   ],
   [
    "Sign-in log",
    "A record of each authentication with user, app, device, location, methods and Conditional Access results."
   ],
   [
    "Correlation ID",
    "An identifier linking the events of one sign-in request, used for troubleshooting and support cases."
   ]
  ],
  "example": "A salesperson in Brazil can't open the CRM. The admin filters sign-in logs by the user, sees error 53003, and the Conditional Access tab shows the policy blocking unapproved countries failed. What If with the user's IP confirms it. Because the trip is approved, the admin adds the user to a temporary exclusion group and What If now shows the policy as not applied.",
  "tip": "Report-only shows what real sign-ins would have done; What If simulates a sign-in that hasn't happened yet. Report-only policies that require a compliant device can still cause a device check prompt on some platforms, so read the documentation notes before relying on them for all users.",
  "check": [
   [
    "What is the difference between report-only mode and the What If tool?",
    "Report-only evaluates real sign-ins over time without enforcing; What If simulates a single hypothetical sign-in on demand."
   ],
   [
    "Where in a sign-in log entry do you see which Conditional Access policy blocked the user?",
    "In the Conditional Access tab of the sign-in details, which lists each policy and whether it succeeded, failed or wasn't applied."
   ],
   [
    "How can you verify that emergency access accounts are excluded from all policies?",
    "Run the What If tool for each emergency account against all cloud apps and confirm no blocking policy applies."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: user risk vs sign-in risk, risk detections, remediation and risk-based Conditional Access",
  "body": [
   "Microsoft Entra ID Protection uses Microsoft's threat intelligence and machine learning to detect identity-based attacks, calculate risk and trigger automatic responses. Full functionality, including risk-based Conditional Access and the detailed reports, requires Microsoft Entra ID P2.",
   "There are two kinds of risk, and telling them apart is essential. Sign-in risk is the probability that a particular authentication request wasn't made by the account owner. User risk is the probability that the identity itself is compromised, accumulated from risk detections over time. A single sign-in from an anonymous IP address raises sign-in risk; leaked credentials found on the dark web raise user risk. Both are rated low, medium or high.",
   "Risk detections feed these scores. Sign-in risk detections include anonymous IP address (for example, Tor), atypical travel, unfamiliar sign-in properties, malicious IP address, password spray, suspicious browser, anomalous token and token issuer anomaly. User risk detections include leaked credentials (which depends on password hash synchronization for hybrid users), Microsoft Entra threat intelligence and anomalous user activity. Some detections are real time, calculated during the sign-in; others are offline, calculated afterward. The Risky users, Risky sign-ins and Risk detections reports show them, and Risky workload identities covers service principals separately.",
   "Remediation clears risk. Users can self-remediate: sign-in risk is remediated by successfully completing MFA, and user risk is remediated by a secure password change, which requires MFA first. For users without a password (passwordless), Microsoft's newer require risk remediation control handles the right action. Admins can remediate manually: reset the password, confirm user compromised (which sets user risk to high and feeds the model), confirm sign-in safe, dismiss user risk, or block the user. Users must be registered for MFA beforehand to self-remediate, which is why ID Protection includes an MFA registration policy.",
   "Microsoft recommends configuring risk responses as Conditional Access policies rather than the older standalone ID Protection risk policies, which are being retired. A typical pair is: for all users with user risk high, grant access with require password change and sign-in frequency every time; for all users with sign-in risk medium and high, require MFA and sign-in frequency every time. Exclude break-glass accounts, and use report-only first. Blocking at high risk is stricter but creates help desk work; allowing self-remediation lets users fix the problem themselves.",
   "Trusted named locations reduce false positives, and admin feedback such as confirm safe or confirm compromised improves the detections over time. Risk data can also be exported with diagnostic settings for investigation in Log Analytics or a SIEM such as Microsoft Sentinel."
  ],
  "terms": [
   [
    "Sign-in risk",
    "The probability that a specific authentication request was not performed by the legitimate user."
   ],
   [
    "User risk",
    "The probability that an identity is compromised, based on accumulated detections such as leaked credentials."
   ],
   [
    "Risk detection",
    "A signal of suspicious activity, such as atypical travel or leaked credentials, that contributes to risk levels."
   ],
   [
    "Self-remediation",
    "Users clearing their own risk by completing MFA (sign-in risk) or a secure password change (user risk)."
   ],
   [
    "Confirm user compromised",
    "An admin action that sets user risk to high and trains the detection model."
   ]
  ],
  "example": "Leaked credentials for a marketing user appear in a breach dump, and ID Protection raises her user risk to high. At her next sign-in the Conditional Access user risk policy requires MFA and a secure password change. She completes both, her risk is remediated automatically, and the security team reviews the Risky users report without opening a ticket.",
  "tip": "Sign-in risk pairs with require MFA; user risk pairs with require password change. Leaked credential detection for synced users needs password hash sync. ID Protection risk-based policies need P2.",
  "check": [
   [
    "Which risk type does leaked credentials affect, and how does a user remediate it?",
    "User risk; the user remediates it with a secure password change after MFA."
   ],
   [
    "What control should a sign-in risk policy require so users can self-remediate?",
    "Multifactor authentication (typically with sign-in frequency set to every time)."
   ],
   [
    "Why must users be registered for MFA before risk policies are enabled?",
    "Self-remediation requires MFA; unregistered users can't complete it and would be blocked."
   ]
  ]
 },
 {
  "t": "Continuous access evaluation (CAE) and session revocation",
  "body": [
   "Traditionally, OAuth access tokens are valid until they expire, often about an hour. If you disable a user or they change location, an app that already has a token keeps accepting it until expiry. That gap is exactly where an attacker with a stolen token operates. Continuous access evaluation (CAE) closes it by letting resource providers, such as Exchange Online, SharePoint Online, Teams and Microsoft Graph, react to important events in near real time.",
   "CAE works as a conversation between Microsoft Entra ID and CAE-capable services. Entra tells the service when a critical event happens, and the service checks certain policies itself. Critical events include: the user account is deleted or disabled, the password is changed or reset, multifactor authentication is enabled for the user, an administrator explicitly revokes all refresh tokens for the user, and Microsoft Entra ID Protection detects high user risk. When the service receives the event, it rejects the current token and sends the client a claims challenge, which makes the client return to Entra for a fresh token, and at that point current policy applies.",
   "CAE also enforces Conditional Access network location policy. If a session's IP address changes to one that your location-based policy doesn't allow, a CAE-capable service can reject the token immediately. Strict location enforcement, a CAE customization, makes the service check that the IP address it sees matches an allowed location, which is useful but can break sign-ins behind proxies or split-tunnel VPNs where Entra and the resource see different addresses.",
   "Because services can now revoke access on demand, CAE-aware clients receive long-lived access tokens, up to 28 hours, instead of short-lived ones. That improves resilience during outages while security actually improves, since revocation is event-driven rather than time-driven. CAE is on by default for supported apps; in a Conditional Access session control you can customize it, for example disable it for troubleshooting or turn on strict enforcement.",
   "Session revocation is the admin action that triggers the critical event. In the admin center, open the user and select Revoke sessions, or run the Microsoft Graph PowerShell command:",
   "```powershell\nRevoke-MgUserSignInSession -UserId ana@contoso.com\n```",
   "This invalidates the user's refresh tokens and session cookies. CAE-capable apps react within minutes; apps that don't support CAE keep their existing access token until it expires, then fail to renew. In an incident, combine steps: disable the account, reset the password, revoke sessions, review registered authentication methods and devices, and check the sign-in logs for activity after revocation."
  ],
  "terms": [
   [
    "Continuous access evaluation",
    "A mechanism letting services revoke access in near real time when critical events or policy changes occur."
   ],
   [
    "Critical event",
    "A change such as account disablement, password reset or token revocation that CAE-capable services act on."
   ],
   [
    "Claims challenge",
    "A response telling the client its token is no longer accepted and it must reauthenticate to Entra ID."
   ],
   [
    "Strict location enforcement",
    "A CAE setting that makes resources enforce location policy against the IP address they observe."
   ],
   [
    "Revoke sessions",
    "An admin action that invalidates a user's refresh tokens and session cookies."
   ]
  ],
  "example": "An employee is terminated at 3 p.m. HR disables the account and the admin selects Revoke sessions. His laptop's Outlook, which held a valid access token, receives a claims challenge from Exchange Online within minutes and can't get a new token, so mail stops syncing well before the old token would have expired.",
  "tip": "Know the list of critical events and that CAE-capable clients get tokens lasting up to 28 hours. Apps that don't support CAE still honor revocation only when their current access token expires.",
  "check": [
   [
    "Name three critical events that CAE services react to.",
    "Any three of: user deleted or disabled, password changed or reset, MFA enabled for the user, admin revoked refresh tokens, high user risk detected."
   ],
   [
    "Why do CAE-capable clients receive longer-lived access tokens?",
    "Because the resource can revoke them immediately on critical events, long lifetimes improve resilience without weakening security."
   ],
   [
    "What does Revoke-MgUserSignInSession do?",
    "It invalidates the user's refresh tokens and session cookies, forcing reauthentication."
   ]
  ]
 },
 {
  "t": "Global Secure Access: Microsoft Entra Internet Access and Private Access, traffic forwarding profiles",
  "body": [
   "Global Secure Access is Microsoft's security service edge (SSE) solution, part of the Microsoft Entra family. Instead of backhauling traffic through a corporate VPN and on-premises firewalls, user traffic is sent to Microsoft's globally distributed network, where identity-aware policies are applied. It brings the Zero Trust idea of verifying every request to network access, using the same identities and Conditional Access you already manage.",
   "Microsoft Entra Internet Access secures access to the internet, software as a service (SaaS) apps and Microsoft 365. It includes a secure web gateway with web content filtering by category or fully qualified domain name, universal tenant restrictions that stop users from signing in to other organizations' tenants with corporate devices (a data exfiltration guard), and compliant network checks that Conditional Access can use. Source IP restoration passes the user's original public IP address to Entra ID so that named locations and risk detection keep working even though traffic comes through Microsoft's edge.",
   "Microsoft Entra Private Access replaces traditional VPN access to private applications, on-premises or in other clouds. It uses private network connectors, the same lightweight outbound-only connectors used by Microsoft Entra application proxy, installed near the apps. Quick Access provides broad access to defined IP ranges or FQDNs, which is a fast way to replace a VPN. Per-app access defines individual enterprise applications for specific destinations and ports, so each can have its own user assignment and Conditional Access policy, for example requiring MFA for an SSH jump host but not for the intranet. Private Access works with TCP and UDP traffic, not just web apps.",
   "Traffic forwarding profiles decide which traffic the service captures. There are three: the Microsoft traffic profile (Microsoft 365 services such as Exchange Online and SharePoint Online), the Private Access profile (your private apps) and the Internet Access profile (general internet traffic). Each is enabled separately, and you assign users and groups to them. Traffic is acquired either by the Global Secure Access client, installed on Windows, macOS, iOS and Android devices, or by remote networks, where branch offices connect their customer premises equipment to Microsoft's edge over IPsec tunnels.",
   "Global Secure Access is licensed separately, as Microsoft Entra Internet Access and Microsoft Entra Private Access (or together in the Microsoft Entra Suite), on top of a Microsoft Entra ID P1 base. In the admin center you'll find it in its own section with Connect, Applications, Secure and Monitor pages; traffic logs and the dashboard show which traffic flowed and which policies acted on it."
  ],
  "terms": [
   [
    "Security service edge (SSE)",
    "Cloud-delivered network security that applies identity-aware policy to user traffic."
   ],
   [
    "Microsoft Entra Internet Access",
    "The Global Secure Access service securing internet, SaaS and Microsoft 365 traffic with filtering and tenant restrictions."
   ],
   [
    "Microsoft Entra Private Access",
    "The Global Secure Access service providing Zero Trust access to private apps without a traditional VPN."
   ],
   [
    "Traffic forwarding profile",
    "A setting (Microsoft, Private Access or Internet Access) that determines which traffic is acquired and tunneled."
   ],
   [
    "Universal tenant restrictions",
    "A control that prevents users from accessing unapproved external tenants using corporate devices."
   ]
  ],
  "example": "A manufacturer wants to retire its VPN. It installs private network connectors in the data center, publishes the ERP system and an SSH server as per-app Private Access apps with their own Conditional Access rules, deploys the Global Secure Access client to laptops, and enables the Microsoft traffic profile with universal tenant restrictions so staff can't upload data to personal tenants.",
  "tip": "Private Access equals VPN replacement for private apps using connectors; Internet Access equals web filtering and tenant restrictions for internet and Microsoft 365. Quick Access is broad; per-app access is granular and supports app-specific Conditional Access.",
  "check": [
   [
    "Which Global Secure Access component would replace a VPN for on-premises file servers?",
    "Microsoft Entra Private Access, using private network connectors."
   ],
   [
    "What are the three traffic forwarding profiles?",
    "Microsoft traffic, Private Access and Internet Access."
   ],
   [
    "Why is source IP restoration useful?",
    "It passes the user's original public IP to Entra so Conditional Access named locations and risk detections still work."
   ]
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned, and assigning them Azure RBAC roles",
  "body": [
   "Applications running in Azure often need to call other services, such as reading secrets from Azure Key Vault or files from a storage account. Storing a password or key in code or configuration is risky: it can leak and must be rotated. Managed identities solve this by giving an Azure resource an identity in Microsoft Entra ID whose credentials Azure creates, stores and rotates automatically. Your code never sees a secret.",
   "A system-assigned managed identity is enabled directly on one resource, such as a virtual machine, App Service app or Azure Function. It shares that resource's lifecycle: when the resource is deleted, the identity is deleted too. Each system-assigned identity belongs to exactly one resource, which makes it simple and tidy when one resource needs its own access.",
   "A user-assigned managed identity is a standalone Azure resource that you create first and then attach to one or more resources. Its lifecycle is independent, so deleting a VM does not delete the identity. Use it when several resources need the same permissions, such as a fleet of VMs in a scale set, or when you want to pre-create and authorize the identity before the compute resource exists. A resource can have one system-assigned identity and several user-assigned identities at the same time.",
   "Behind the scenes, a managed identity is a special kind of service principal in Entra ID. You can find it under Enterprise applications by filtering the application type to managed identities. Managed identities can't be used from outside Azure-hosted workloads, and you don't manage their credentials at all.",
   "A managed identity has no permissions until you grant them. For Azure resources you use Azure RBAC: assign a role such as Storage Blob Data Reader or Key Vault Secrets User to the identity at the narrowest suitable scope (a single resource, resource group or subscription). In the portal, open the target resource, select Access control (IAM), Add role assignment, choose the role, and select Managed identity as the member type. With the Azure CLI it looks like this:",
   "```bash\naz role assignment create \\\n  --assignee <principal-id-of-identity> \\\n  --role \"Storage Blob Data Reader\" \\\n  --scope /subscriptions/<sub-id>/resourceGroups/rg-app/providers/Microsoft.Storage/storageAccounts/stapp01\n```",
   "Inside the resource, code requests a token from the local identity endpoint, usually through an SDK class such as DefaultAzureCredential, and presents it to the target service. To attach user-assigned identities to resources, an admin needs the Managed Identity Operator role; to create and manage them, Managed Identity Contributor. Managed identities can also be granted Microsoft Graph application permissions, but that is done through PowerShell or Graph rather than the portal's API permissions page."
  ],
  "terms": [
   [
    "Managed identity",
    "An automatically managed Entra identity for an Azure resource, with no credentials for you to store or rotate."
   ],
   [
    "System-assigned managed identity",
    "An identity enabled on one resource and deleted with it."
   ],
   [
    "User-assigned managed identity",
    "A standalone identity resource that can be attached to multiple Azure resources and has its own lifecycle."
   ],
   [
    "Azure RBAC role assignment",
    "Granting a role to a principal at a scope such as a resource, resource group or subscription."
   ],
   [
    "DefaultAzureCredential",
    "An Azure SDK credential class that automatically uses a managed identity when running in Azure."
   ]
  ],
  "example": "Twenty VMs in a scale set process files from one storage account. Instead of enabling twenty system-assigned identities and twenty role assignments, the admin creates one user-assigned managed identity, grants it Storage Blob Data Reader on that storage account only, and attaches it to the scale set. New instances inherit access automatically.",
  "tip": "Shared identity across many resources or a lifecycle independent of the resource means user-assigned; a single resource whose identity should disappear with it means system-assigned. Permissions come from Azure RBAC at the smallest scope.",
  "check": [
   [
    "What happens to a system-assigned managed identity when its VM is deleted?",
    "It is deleted automatically along with the VM."
   ],
   [
    "Which managed identity type should you use for many VMs that need identical access?",
    "A user-assigned managed identity attached to all of them."
   ],
   [
    "How do you let a managed identity read blobs in one storage account?",
    "Assign it an Azure RBAC role such as Storage Blob Data Reader scoped to that storage account."
   ]
  ]
 },
 {
  "t": "Service principals and app registrations: application objects, client secrets vs certificates vs federated credentials",
  "body": [
   "When a developer registers an app in Microsoft Entra ID, two related objects appear, and the exam expects you to know the difference. The application object is the global definition of the app. It lives only in the app's home tenant, the tenant where it was registered, and describes the app: its name, application (client) ID, redirect URIs, the permissions it requests, app roles it exposes and its credentials. You manage it under App registrations.",
   "A service principal is the local representation of the app in a specific tenant. It is what actually gets permissions, role assignments, user assignments and Conditional Access. You manage it under Enterprise applications. A single-tenant app has one service principal in its home tenant. A multitenant app has one application object in its home tenant and a service principal in every tenant that has consented to it. A useful analogy: the application object is a class, and each service principal is an instance of it. There are also service principals of type managed identity and legacy, but the app-registration pair is the one tested most.",
   "To authenticate as itself, for example in a daemon or background service using the client credentials flow, an app needs a credential. There are three kinds. A client secret is a generated string, like a password. It's easy to use but easy to leak in source code or logs, and it expires, with the portal offering durations up to about two years. A certificate credential uses a public key uploaded to the app registration while the private key stays with the app, ideally in a store such as Azure Key Vault. The app proves possession by signing an assertion, so nothing reusable crosses the wire, which is why Microsoft recommends certificates over secrets.",
   "Federated identity credentials, part of workload identity federation, remove stored credentials entirely. You configure the app registration (or a user-assigned managed identity) to trust tokens issued by an external identity provider, identified by issuer, subject and audience. For example, a GitHub Actions workflow in a specific repository and branch, a Kubernetes service account, or another cloud's workload identity. The external workload presents its own token and exchanges it for an Entra access token. There is no secret to rotate or steal.",
   "Good hygiene follows from this. Prefer managed identities for workloads running in Azure, federated credentials for workloads outside Azure that support them, certificates next, and client secrets only when nothing else works, with short lifetimes. Assign app owners so someone is responsible for renewals, and monitor expiring credentials. Settings like app instance property lock help prevent attackers from adding new credentials to the service principal of a multitenant app in other tenants."
  ],
  "terms": [
   [
    "Application object",
    "The global definition of an app in its home tenant, managed under App registrations."
   ],
   [
    "Service principal",
    "The local instance of an app in a tenant, which receives permissions and assignments; managed under Enterprise applications."
   ],
   [
    "Client secret",
    "A password-like string used by an app to authenticate; simple but prone to leaks and expiry."
   ],
   [
    "Certificate credential",
    "A public key registered on the app whose private key signs authentication assertions; preferred over secrets."
   ],
   [
    "Federated identity credential",
    "A trust with an external identity provider that lets a workload exchange its token for an Entra token without secrets."
   ]
  ],
  "example": "A team deploys to Azure from GitHub Actions using a client secret stored in repository settings. After a secret leaks in a build log, the admin replaces it with a federated identity credential that trusts GitHub's issuer for the main branch of that repository only, deletes the secret, and the pipeline keeps working with no stored credential.",
  "tip": "App registrations show application objects; Enterprise applications show service principals. For pipelines in GitHub or Kubernetes with no secrets allowed, choose federated credentials. Between secrets and certificates, certificates are the more secure choice.",
  "check": [
   [
    "A multitenant app is used by five customer tenants. How many application objects and service principals exist?",
    "One application object in the home tenant and a service principal in each tenant where it is used (six if the home tenant also has one)."
   ],
   [
    "Which credential type needs no stored secret for a GitHub Actions workflow?",
    "A federated identity credential (workload identity federation)."
   ],
   [
    "Why are certificates preferred over client secrets?",
    "The private key never leaves the app and isn't transmitted; the app signs an assertion, so there is no reusable shared secret to leak."
   ]
  ]
 },
 {
  "t": "API permissions: delegated vs application permissions, user consent settings, admin consent and the admin consent workflow",
  "body": [
   "Apps that call APIs such as Microsoft Graph need permissions, and Microsoft Entra ID uses consent to grant them. Understanding the two permission types and who can consent to them is one of the most tested parts of SC-300, and it's also a real security issue: attackers trick users into consenting to malicious apps, an attack called illicit consent grant.",
   "Delegated permissions are used when an app acts on behalf of a signed-in user. The app can do only what both the permission allows and the user is allowed to do. If an app has the delegated Files.Read.All permission and Ana signs in, it can read only files Ana herself can read. Application permissions, sometimes called app roles or app-only permissions, are used when an app runs without a signed-in user, such as a background service. The app acts as itself with the full scope of the permission across the tenant, so User.Read.All as an application permission means reading every user. Application permissions always require admin consent.",
   "Some delegated permissions are low impact, like User.Read (sign in and read your own profile), and users may be able to consent to them for themselves. Others are marked as requiring admin consent because of their reach, such as reading all users' full profiles. An admin with the right role, such as Cloud Application Administrator, Application Administrator or Privileged Role Administrator (for application permissions to Microsoft Graph), can grant tenant-wide admin consent from the API permissions page with Grant admin consent for the tenant, or from the enterprise application's Permissions page. Tenant-wide consent means users won't be prompted individually.",
   "User consent settings, under Enterprise applications, Consent and permissions, decide what users can approve on their own. Options include: Do not allow user consent, where every app needs an admin; Allow user consent for apps from verified publishers, for selected permissions, the Microsoft-recommended balance, where users can consent only to permissions you classify as low impact from publishers verified with Microsoft; and allowing users to consent to all apps for any permission not requiring admin consent, which is the riskiest. Group owner consent settings separately control whether group owners can consent to apps accessing their group's data.",
   "If users can't consent, they get stuck. The admin consent workflow gives them a way forward. When enabled, a user who hits an app that needs admin approval can submit a request with a justification. Designated reviewers (users, groups or roles) receive an email and review requests in the Admin consent requests page, where they approve, deny or block the app. Requests expire after a configurable number of days, and reviewers still need an appropriate admin role to actually grant consent.",
   "To investigate or clean up consent, review each enterprise application's Permissions page, which shows admin-granted and user-granted permissions, and check the audit log for Consent to application events. Removing a suspicious app's service principal or revoking its permissions stops further access."
  ],
  "terms": [
   [
    "Delegated permission",
    "A permission used by an app acting on behalf of a signed-in user, limited by that user's own access."
   ],
   [
    "Application permission",
    "An app-only permission used without a signed-in user; always requires admin consent."
   ],
   [
    "Admin consent",
    "Tenant-wide approval by an authorized admin that grants an app its requested permissions for all users."
   ],
   [
    "Admin consent workflow",
    "A process letting users request admin approval for apps they can't consent to, reviewed by designated reviewers."
   ],
   [
    "Illicit consent grant",
    "An attack that tricks users into granting permissions to a malicious app, giving it access to their data."
   ]
  ],
  "example": "Contoso sets user consent to allow only verified publishers and low-impact permissions, and enables the admin consent workflow with the security team as reviewers. When a user tries a new scheduling app that wants to read all calendars, she submits a request; the reviewer checks the publisher and permissions, then grants admin consent for the tenant.",
  "tip": "No signed-in user means application permissions and admin consent. If users are blocked from consenting and need a way to ask, the answer is the admin consent workflow, not changing user consent to allow all apps.",
  "check": [
   [
    "An app with the delegated Mail.Read permission is used by Ben. Whose mail can it read?",
    "Only Ben's mail (and any mailbox Ben himself has access to), because delegated access is limited by the signed-in user's permissions."
   ],
   [
    "Which consent is required for application permissions?",
    "Admin consent; users can never consent to application permissions."
   ],
   [
    "Which user consent setting does Microsoft recommend?",
    "Allow user consent for apps from verified publishers, for selected (low-impact) permissions."
   ]
  ]
 },
 {
  "t": "App roles, the roles claim, and 'Assignment required' on enterprise applications",
  "body": [
   "Many applications need their own authorization, such as distinguishing readers from approvers in an expense app. Rather than building a separate user database, developers can define app roles in Microsoft Entra ID and let administrators assign users to them. The app then reads the user's roles from the token and makes decisions.",
   "App roles are defined on the app registration, under App roles or in the manifest's appRoles collection. Each role has a display name, a value (the string that appears in tokens, such as Expense.Approver), a description and allowed member types: Users/Groups, Applications, or both. Roles with allowed member type Applications become application permissions that other apps can request and that require admin consent, which is how APIs expose app-only permissions.",
   "Assignments happen on the enterprise application (the service principal) under Users and groups. You pick a user or group and a role. When the user signs in, Entra adds a roles claim to the ID token or access token containing the values of the roles they're assigned, directly or through a group. The app checks this claim, for example allowing the approve action only when the roles claim contains Expense.Approver. Assigning groups to app roles requires Microsoft Entra ID P1, and nested group membership isn't honored for app role assignment; only direct members of the assigned group get the role.",
   "The roles claim differs from the groups claim. The groups claim lists group object IDs (and can be large, with an overage limit that forces the app to query Graph), while app roles are app-specific names that are meaningful to the developer and portable across tenants. Microsoft generally recommends app roles for application authorization.",
   "Assignment required is a property on the enterprise application's Properties page (appRoleAssignmentRequired). When set to No, the default for many apps, any user in the tenant can sign in to the app and get a token, although they won't have any app roles. When set to Yes, only users and groups assigned to the app, and apps granted its roles, can get a token; everyone else is blocked at sign-in with an error saying they aren't assigned. Turning it on is a simple and powerful way to restrict who can use an app. A related setting, Visible to users, controls whether the app tile appears in My Apps; it does not grant or block access.",
   "For exam scenarios, think in layers: Assignment required controls who can sign in at all, app roles control what they can do inside the app, and Conditional Access controls how they must sign in."
  ],
  "terms": [
   [
    "App role",
    "A named role defined on an app registration that can be assigned to users, groups or applications."
   ],
   [
    "Roles claim",
    "A token claim listing the app role values assigned to the signed-in user or calling app."
   ],
   [
    "Assignment required",
    "An enterprise app property that, when Yes, allows only assigned users, groups and apps to get tokens."
   ],
   [
    "Allowed member types",
    "The app role setting deciding whether a role can be assigned to users and groups, applications, or both."
   ],
   [
    "Visible to users",
    "An enterprise app property controlling whether the app appears in My Apps, without affecting access."
   ]
  ],
  "example": "An internal expense app defines two app roles, Expense.Submitter and Expense.Approver. The admin sets Assignment required to Yes, assigns the All Employees group to Submitter and the Finance Managers group to Approver. A contractor not in either group gets an error at sign-in, and a manager's token carries both role values.",
  "tip": "If a question says any user can sign in to an app but only certain users should, the answer is Assignment required set to Yes plus user or group assignments. Remember nested groups don't receive app role assignments.",
  "check": [
   [
    "What happens when Assignment required is No and an unassigned user signs in?",
    "The user can sign in and receives a token, just without any app roles."
   ],
   [
    "Where are app roles defined, and where are users assigned to them?",
    "Defined on the app registration (application object); assigned on the enterprise application (service principal) under Users and groups."
   ],
   [
    "A user is in a group that is nested inside a group assigned to an app role. Does the user get the role?",
    "No. App role assignment through groups applies only to direct members of the assigned group."
   ]
  ]
 },
 {
  "t": "Enterprise application single sign-on: SAML (Identifier, Reply URL, signing certificate) and OpenID Connect",
  "body": [
   "Single sign-on (SSO) lets users sign in once with their Microsoft Entra account and reach many apps without separate passwords. For software as a service (SaaS) apps, you typically add the app from the Microsoft Entra application gallery, which creates an enterprise application, and then configure SSO. The two main federated protocols are SAML 2.0 and OpenID Connect (OIDC); other options include password-based SSO, where Entra securely stores and replays credentials, and linked SSO, which just adds a tile pointing to another identity provider.",
   "In SAML, Entra ID is the identity provider (IdP) and the app is the service provider (SP). The SAML-based Sign-on page has sections you'll use in labs. Basic SAML Configuration holds the Identifier (Entity ID), a unique name for the SP that must match what the app expects, and the Reply URL, also called the Assertion Consumer Service (ACS) URL, where Entra posts the SAML response. Optional fields include the Sign on URL, used for SP-initiated sign-in, the Relay State and the Logout URL. Attributes and Claims defines what goes into the assertion; the NameID (unique user identifier) defaults to user.userprincipalname, and you can add claims such as email or department, or transform values.",
   "The SAML Signing Certificate section holds the certificate Entra uses to sign assertions so the app can verify they're genuine. You download it (Base64 or raw) or the Federation Metadata XML and upload it to the app, along with the Login URL and Microsoft Entra Identifier from the setup section. Certificates expire, so set notification email addresses, and when renewing, create the new certificate, give it to the app, then make it active, so the rollover doesn't break sign-in. Most sign-in errors after setup come from mismatched Identifier or Reply URL values, a wrong NameID format, or an expired or mismatched certificate; the Test single sign-on button and the My Apps Secure Sign-in Extension help decode the error.",
   "OpenID Connect is built on OAuth 2.0 and uses JSON Web Tokens. The app requests an ID token from Entra, which tells it who the user is, and often an access token to call APIs. Configuration lives mostly in the app registration: redirect URIs, the client ID, credentials if the app is confidential, and token configuration for optional claims. Gallery OIDC apps are usually added by signing in and consenting, not by filling in SAML fields. OIDC is the modern default for new apps, especially mobile and single-page apps; SAML is common for existing enterprise SaaS.",
   "Whichever protocol you use, the enterprise application also controls who can use the app (Assignment required and user or group assignment), whether it appears in My Apps, provisioning, and which Conditional Access policies apply. Sign-in logs show SSO attempts with the app name, so you can troubleshoot per app."
  ],
  "terms": [
   [
    "Identifier (Entity ID)",
    "The unique name of a SAML service provider that must match between Entra and the app."
   ],
   [
    "Reply URL (ACS URL)",
    "The app endpoint where Entra ID posts the SAML response after sign-in."
   ],
   [
    "SAML signing certificate",
    "The certificate Entra uses to sign SAML assertions, which the app uses to verify them."
   ],
   [
    "NameID",
    "The SAML claim that uniquely identifies the user to the app, by default the user principal name."
   ],
   [
    "OpenID Connect",
    "An identity protocol on top of OAuth 2.0 that issues ID tokens in JWT format to identify users."
   ]
  ],
  "example": "Contoso adds a gallery HR app with SAML. The admin enters the vendor's Entity ID and Reply URL, keeps UPN as the NameID, downloads the Base64 certificate and gives it with the Login URL to the vendor's settings page. Three years later an expiry notification arrives; she creates a new certificate, uploads it to the vendor, activates it, and nobody notices the change.",
  "tip": "A SAML error saying the reply address doesn't match points to the Reply URL; an app not recognizing the issuer or audience points to the Identifier. Rotate signing certificates by adding the new one to the app before making it active in Entra.",
  "check": [
   [
    "What is the Reply URL in SAML configuration?",
    "The Assertion Consumer Service URL at the app where Entra ID sends the signed SAML response."
   ],
   [
    "Which SAML field must be unique and identify the application to Entra?",
    "The Identifier (Entity ID)."
   ],
   [
    "Which token tells an OIDC app who the user is?",
    "The ID token, a JSON Web Token issued by Entra ID."
   ]
  ]
 },
 {
  "t": "Automatic user provisioning to SaaS apps with SCIM, scoping filters and provisioning logs",
  "body": [
   "Single sign-on lets users sign in, but many SaaS apps also need an account to exist in the app first. Creating and deleting those accounts by hand is slow and leaves orphaned accounts when people leave. Automatic user provisioning in Microsoft Entra ID creates, updates and disables accounts in the app based on who is assigned to it, and it's a key part of identity lifecycle management.",
   "Most apps use SCIM, the System for Cross-domain Identity Management, an open standard with REST endpoints for users and groups. In the enterprise application's Provisioning page, you set Provisioning Mode to Automatic and enter Admin Credentials, usually a Tenant URL (the app's SCIM endpoint) and a Secret Token or OAuth connection supplied by the app vendor. Test Connection confirms Entra can reach the endpoint. Gallery apps come with preconfigured connectors; custom apps can use a generic SCIM connector if the app implements the standard.",
   "Mappings define which Entra attributes go to which app attributes, for example userPrincipalName to userName and a Switch expression that maps department codes to app values. A matching attribute decides how Entra finds an existing account in the app, preventing duplicates. Scope controls who is provisioned. The Settings option Sync only assigned users and groups (the recommended default) provisions users assigned to the enterprise app directly or through groups; Sync all users and groups provisions everyone. Scoping filters narrow further with attribute rules, such as department EQUALS Sales. Within one scoping filter group all clauses must be true (AND); multiple scoping filter groups are combined with OR.",
   "When you start provisioning, Entra runs an initial cycle that evaluates everyone in scope, then incremental cycles that process only changes, roughly every 40 minutes. When a user is unassigned, falls out of a scoping filter, or is disabled or deleted in Entra, the provisioning service disables or deletes the account in the app, according to the app's supported operations. Provision on demand lets you push a single user immediately to test mappings and see each step's result.",
   "Provisioning logs record every action: created, updated, disabled, skipped, with status success, failure or skipped and a reason, such as a missing required attribute or a duplicate in the app. If failures pile up, the job can enter quarantine, running less often until the issue is fixed; the Provisioning page shows the quarantine state and you can restart the job after correcting credentials or data. Set a notification email for failures. Audit logs record configuration changes to the job."
  ],
  "terms": [
   [
    "SCIM",
    "System for Cross-domain Identity Management, a standard REST protocol for provisioning users and groups."
   ],
   [
    "Attribute mapping",
    "The rule that maps an Entra attribute or expression to a target app attribute."
   ],
   [
    "Scoping filter",
    "Attribute-based clauses that limit which assigned users or groups are provisioned."
   ],
   [
    "Provision on demand",
    "Provisioning a single user immediately to test and troubleshoot configuration."
   ],
   [
    "Quarantine",
    "A provisioning job state entered after repeated failures, where it runs less often until fixed."
   ]
  ],
  "example": "A company assigns its Sales group to a CRM enterprise app and turns on SCIM provisioning with a scoping filter for employeeType EQUALS Employee, so contractors in Sales aren't provisioned. When a salesperson leaves and is disabled in Entra, the next incremental cycle disables her CRM account, and the provisioning log shows the update succeeded.",
  "tip": "Assignment and scope decide who is provisioned; scoping filter clauses in one group are ANDed and groups are ORed. If a single user isn't appearing in the app, use provision on demand and then read the provisioning log entry for the reason.",
  "check": [
   [
    "What two values do you normally enter as Admin Credentials for a SCIM app?",
    "The app's Tenant URL (SCIM endpoint) and a Secret Token (or an OAuth connection)."
   ],
   [
    "How are clauses within a single scoping filter group evaluated?",
    "With AND: all clauses must be true for the user to be in scope."
   ],
   [
    "What happens in the app when a provisioned user is unassigned from the enterprise application?",
    "The provisioning service disables (or deletes, depending on the app) the user's account in the app."
   ]
  ]
 },
 {
  "t": "Microsoft Entra application proxy and private network connectors for on-premises web apps",
  "body": [
   "Many organizations still run web apps on-premises, such as an intranet, an expense system or a SharePoint Server farm. Microsoft Entra application proxy publishes these apps to remote users securely, without a VPN and without opening inbound firewall ports. Users sign in with Microsoft Entra ID, so Conditional Access, MFA and sign-in logs apply to legacy apps just as they do to cloud apps.",
   "Application proxy has two parts: a cloud service in Entra ID and private network connectors installed on Windows servers inside your network. Connectors make only outbound HTTPS connections to the cloud service and keep them open, so no inbound ports or DMZ are needed. When a user browses to the app's external URL, the cloud service authenticates the user, then passes the request down the existing outbound connection to a connector, which forwards it to the internal URL and returns the response. Private network connectors are shared with Microsoft Entra Private Access, so the same connector infrastructure supports both.",
   "Install at least two connectors for each connector group for high availability, placed close to the apps they serve. Connector groups let you assign specific apps to specific connectors, for example a group in each data center or one for an isolated network segment. Connectors update automatically, and their status appears in the admin center.",
   "To publish an app, create an on-premises application in Enterprise applications. Key settings are: Internal URL, the address the connector uses; External URL, either an msappproxy.net address or your own custom domain with an uploaded certificate; Pre-authentication, where Microsoft Entra ID (the recommended choice) authenticates users before any traffic reaches your network, while Passthrough sends unauthenticated traffic to the app; and the connector group. URL translation options rewrite links in headers or the app body if internal and external URLs differ.",
   "Single sign-on to the back-end app can use several methods. Integrated Windows Authentication uses Kerberos constrained delegation (KCD): the connector's computer account is allowed to delegate to the app's service principal name, so it obtains a Kerberos ticket on the user's behalf. Header-based SSO passes identity in HTTP headers for apps that expect them, SAML SSO works for on-premises SAML apps, and password-based SSO is also available. Users reach published apps through My Apps or the external URL.",
   "Application proxy requires Microsoft Entra ID P1 or P2. Typical troubleshooting points include connectors unable to reach the service because of an outbound proxy or firewall, a missing or wrong internal URL, and KCD misconfiguration such as a missing SPN or delegation setting."
  ],
  "terms": [
   [
    "Application proxy",
    "An Entra service that publishes on-premises web apps to remote users with Entra authentication and no inbound ports."
   ],
   [
    "Private network connector",
    "A lightweight Windows service with outbound-only connections that relays traffic for application proxy and Private Access."
   ],
   [
    "Connector group",
    "A set of connectors assigned to specific published apps, used for location and availability."
   ],
   [
    "Pre-authentication",
    "Requiring Microsoft Entra ID sign-in before traffic reaches the internal app; the alternative is Passthrough."
   ],
   [
    "Kerberos constrained delegation",
    "Allowing the connector to request Kerberos tickets on behalf of users for Integrated Windows Authentication SSO."
   ]
  ],
  "example": "A hospital's on-premises scheduling site uses Windows authentication. The admin installs two private network connectors, publishes the site with Microsoft Entra ID pre-authentication and a custom external URL, configures KCD for the site's SPN, and applies a Conditional Access policy requiring MFA. Nurses at home open it from My Apps with no VPN and no password prompt from the app.",
  "tip": "Connectors need only outbound 443, never inbound ports. For Integrated Windows Authentication SSO the answer is Kerberos constrained delegation. Choose Microsoft Entra ID pre-authentication whenever Conditional Access or MFA must protect the app.",
  "check": [
   [
    "Which firewall change is needed to publish an app with application proxy?",
    "None inbound; connectors only need outbound HTTPS access to the Microsoft cloud service."
   ],
   [
    "How does application proxy provide SSO to an app that uses Integrated Windows Authentication?",
    "Through Kerberos constrained delegation from the connector's computer account to the app's SPN."
   ],
   [
    "Why deploy at least two connectors in a connector group?",
    "For high availability and load balancing; if one connector fails, the other continues serving the apps."
   ]
  ]
 },
 {
  "t": "Microsoft Defender for Cloud Apps: cloud discovery, app governance and Conditional Access app control session policies",
  "body": [
   "Microsoft Defender for Cloud Apps is Microsoft's cloud access security broker (CASB). It sits between users and cloud services to give visibility and control: which apps people use, what data they move, and what OAuth apps can do. For SC-300 you need three capabilities: cloud discovery, app governance and Conditional Access app control.",
   "Cloud discovery finds shadow IT, the cloud apps people use without IT approval. It analyzes traffic logs: you can upload firewall or proxy logs manually for a snapshot report, run a log collector for continuous reports, or integrate with Microsoft Defender for Endpoint so managed devices report cloud usage directly. The cloud discovery dashboard shows apps, users, IP addresses and data volumes. Each app is matched to the cloud app catalog, which gives it a risk score based on dozens of factors such as security certifications, data handling and legal compliance. You then tag apps as sanctioned or unsanctioned; with Defender for Endpoint integration, unsanctioned apps can be blocked on devices.",
   "App governance focuses on OAuth apps that are integrated with Microsoft 365 through Entra ID consent. It inventories these apps, shows their permissions, publisher, data access and usage, and flags apps that are overprivileged, unused, from unverified publishers or behaving anomalously, such as an app suddenly downloading large volumes of mail. Policies can alert on or disable apps that match risky conditions. This complements Entra's consent settings: Entra decides whether consent can be given, app governance watches what consented apps actually do.",
   "Conditional Access app control extends Entra Conditional Access into the session. In a Conditional Access policy, the session control Use Conditional Access App Control routes the user's browser session through Defender for Cloud Apps as a reverse proxy. You then build policies in Defender for Cloud Apps. Access policies decide whether to allow or block access to the app in real time, for example blocking native desktop clients. Session policies control activity during the session: monitor all activities, block downloads, protect downloads by applying a sensitivity label or encryption, block uploads of malware or sensitive files, or block specific activities like copy and paste or printing.",
   "A common design is: users on managed, compliant devices get full access, while users on unmanaged devices are routed to app control, where they can view documents in the browser but can't download them. Session control works for apps using SAML or OIDC with Entra ID, including many gallery apps, and requires browser-based access, since native apps can't be proxied. Activities appear in the Defender for Cloud Apps activity log for investigation."
  ],
  "terms": [
   [
    "CASB",
    "Cloud access security broker, a service providing visibility and control over cloud app use."
   ],
   [
    "Cloud discovery",
    "Analysis of traffic logs or endpoint signals to identify cloud apps in use and their risk."
   ],
   [
    "Sanctioned app",
    "A cloud app approved for use; unsanctioned apps can be flagged or blocked."
   ],
   [
    "App governance",
    "Defender for Cloud Apps capability that monitors and controls OAuth apps' permissions and behavior."
   ],
   [
    "Session policy",
    "A Conditional Access app control policy that monitors or restricts actions such as downloads during a session."
   ]
  ],
  "example": "Contoso uploads firewall logs and discovers 300 cloud storage apps in use. It sanctions two, marks the rest unsanctioned so Defender for Endpoint blocks them, and creates a Conditional Access policy that routes sessions from unmanaged devices to app control, where a session policy blocks downloads of files labelled Confidential from SharePoint.",
  "tip": "Blocking downloads from unmanaged devices in real time is a session policy in Conditional Access app control, enabled by the Use Conditional Access App Control session control. Finding unapproved apps is cloud discovery; policing risky OAuth apps is app governance.",
  "check": [
   [
    "Which Conditional Access session control sends a session through Defender for Cloud Apps?",
    "Use Conditional Access App Control."
   ],
   [
    "What are three ways to feed cloud discovery?",
    "Manual log upload (snapshot reports), an automatic log collector, and Microsoft Defender for Endpoint integration."
   ],
   [
    "Which Defender for Cloud Apps capability flags an overprivileged OAuth app that suddenly reads large volumes of mail?",
    "App governance."
   ]
  ]
 },
 {
  "t": "Monitoring and securing workload identities: Workload ID Premium, risky workload identities, Conditional Access for workload identities",
  "body": [
   "Workload identities are the identities software uses: service principals for applications and managed identities for Azure resources. They often have powerful permissions, they don't do MFA, and nobody notices when they misbehave, which makes them attractive targets. Attackers who steal a client secret from a code repository can sign in as the app and use its permissions quietly.",
   "Microsoft Entra Workload ID Premium is a separate license that adds security features for workload identities. It includes Conditional Access for workload identities, ID Protection for workload identities (risky workload identities), access reviews for service principals assigned to privileged roles, and app health recommendations. Basic capabilities such as creating service principals, managed identities and workload identity federation don't need it.",
   "Conditional Access for workload identities lets you target service principals in a policy's assignments instead of users. It applies to single-tenant service principals registered in your tenant; it does not apply to managed identities or to third-party multitenant apps. Because workloads can't do MFA, the supported controls are limited to blocking: you can block access when a sign-in comes from outside a named location, such as your known build agents' IP ranges, or when the service principal risk is medium or high. A policy like block this service principal unless it signs in from our pipeline IP ranges makes a stolen secret far less useful.",
   "Risky workload identities, in ID Protection, detects compromise of service principals. Detections include leaked credentials (secrets found in public code repositories), suspicious sign-ins with unusual properties, admin confirmed service principal compromised, malicious application, suspicious application, and anomalous service principal activity, such as unusual changes to credentials or directory settings. The report shows each identity's risk level and detections. Admins can confirm compromise, dismiss risk or investigate in the sign-in and audit logs, and remediation usually means removing and rotating credentials, disabling the service principal, and reviewing what it accessed.",
   "Monitoring without premium features still matters. Service principal sign-ins and managed identity sign-ins have their own tabs in the sign-in logs, showing which app signed in, from which IP address, using which credential. Audit logs show added credentials, new owners and permission grants, which are classic persistence techniques. Send these logs to Log Analytics and alert on events such as credentials added to a highly privileged app. Combine this with good hygiene: prefer managed identities and federated credentials over secrets, give workloads least-privileged permissions, and assign owners for every app."
  ],
  "terms": [
   [
    "Workload identity",
    "An identity used by software, such as a service principal or managed identity."
   ],
   [
    "Workload ID Premium",
    "A license adding Conditional Access, risk detection, access reviews and recommendations for workload identities."
   ],
   [
    "Conditional Access for workload identities",
    "Policies targeting single-tenant service principals that block access by location or service principal risk."
   ],
   [
    "Risky workload identity",
    "A service principal flagged by ID Protection with detections such as leaked credentials or anomalous activity."
   ],
   [
    "Service principal sign-in log",
    "The sign-in log tab that records authentication by apps using their own credentials."
   ]
  ],
  "example": "A deployment app authenticates with a certificate from build agents in two known IP ranges. With Workload ID Premium, the admin creates a named location for those ranges and a Conditional Access policy that blocks the service principal from any other location. When a secret for another app shows up in a public repository, ID Protection flags it as a leaked credential and the team rotates it the same day.",
  "tip": "Conditional Access for workload identities supports only single-tenant service principals, not managed identities, and its grant control is block (by location or risk). Anything beyond basic workload identity features points to the Workload ID Premium license.",
  "check": [
   [
    "Can you apply Conditional Access policies to managed identities?",
    "No. Conditional Access for workload identities applies to single-tenant service principals, not managed identities."
   ],
   [
    "What controls can a Conditional Access policy for workload identities apply?",
    "Block access, based on conditions such as location or service principal risk; workloads can't satisfy MFA."
   ],
   [
    "Which license is needed for risky workload identity detections and Conditional Access for workload identities?",
    "Microsoft Entra Workload ID Premium."
   ]
  ]
 },
 {
  "t": "Reviewing and removing unused or over-permissioned applications and expiring credentials",
  "body": [
   "Over time a tenant collects applications: pilot projects that ended, apps whose owners left, integrations granted broad permissions years ago. Each one is a potential door. An unused app with a valid secret and Mail.ReadWrite application permission is exactly what an attacker hopes to find. Regular application hygiene is therefore part of the identity administrator's job.",
   "Start by finding what isn't used. The sign-in logs show service principal and user sign-ins per app, and the Usage and insights reports summarize activity. Microsoft Entra recommendations include items such as removing unused applications, removing unused credentials from applications, and renewing expiring service principal credentials; each recommendation lists the impacted resources and the steps to fix them. Microsoft Defender for Cloud Apps app governance adds a view of OAuth apps' actual data access and flags unused or overprivileged apps.",
   "Next, find what has too much access. Open each enterprise application's Permissions page to see admin-consented and user-consented permissions. Look for application permissions with tenant-wide reach, such as Directory.ReadWrite.All or Mail.ReadWrite, and compare them with what the app really needs. Also check which apps hold Microsoft Entra roles or Azure RBAC roles at broad scopes. Where the app supports it, replace broad permissions with narrower ones, for example Sites.Selected for SharePoint so an app can reach only specified sites.",
   "Credentials need their own attention. Client secrets and certificates expire; when they do, integrations fail, and admins under pressure may create long-lived secrets as a quick fix. Track expiry by reviewing Certificates & secrets on app registrations, using the expiring credentials recommendation, or querying Microsoft Graph for passwordCredentials and keyCredentials with endDateTime values in the near future. Assign owners to every app so someone receives notifications and handles renewal, and use application management policies where available to restrict secret lifetimes or block new secrets.",
   "Removing apps safely is a sequence. First disable sign-in for the enterprise application (set Enabled for users to sign-in to No), which stops new tokens while preserving configuration. Watch for complaints and errors for an agreed period. Then remove permissions or delete the service principal. Deleted app registrations remain restorable for 30 days, which provides a safety net. For third-party multitenant apps, deleting the service principal removes it from your tenant only, and users could consent again unless consent settings prevent it.",
   "Governance features help keep this from recurring: access reviews can include service principals assigned to privileged roles, and consent settings plus the admin consent workflow stop new overprivileged apps from arriving unnoticed."
  ],
  "terms": [
   [
    "Unused application",
    "An app registration or enterprise app with no recent sign-ins, a candidate for disabling and removal."
   ],
   [
    "Overprivileged application",
    "An app granted permissions broader than it needs, such as tenant-wide read/write access."
   ],
   [
    "Credential expiry",
    "The end date of a client secret or certificate after which the app can no longer authenticate with it."
   ],
   [
    "Enabled for users to sign-in",
    "An enterprise app property that, when set to No, blocks all sign-ins to that app."
   ],
   [
    "Microsoft Entra recommendations",
    "Tenant-specific guidance listing actions such as removing unused apps or renewing expiring credentials."
   ]
  ],
  "example": "A quarterly review finds an HR integration last used 14 months ago that still holds User.ReadWrite.All and a secret expiring next year. The admin confirms with HR that the vendor was replaced, sets Enabled for users to sign-in to No, waits two weeks without complaints, removes the secret, and deletes the app registration, knowing it can be restored for 30 days.",
  "tip": "Disable before delete: set Enabled for users to sign-in to No to test the impact safely. For credential expiry questions, think owners, notifications, the expiring credentials recommendation and preferring certificates or federated credentials.",
  "check": [
   [
    "What is the safest first step before deleting an application you believe is unused?",
    "Disable it by setting Enabled for users to sign-in to No and monitor for impact."
   ],
   [
    "Where can you see which permissions an enterprise application has been granted?",
    "On the enterprise application's Permissions page, which lists admin and user consent grants."
   ],
   [
    "How long can a deleted app registration be restored?",
    "For 30 days after deletion."
   ]
  ]
 },
 {
  "t": "Entitlement management: catalogs, access packages, assignment policies, approvals, expiration and separation of duties",
  "body": [
   "Entitlement management, part of Microsoft Entra ID Governance, turns access requests into a self-service, auditable process. Instead of filing tickets for each group, Team, app and SharePoint site a project needs, a user requests one access package containing all of them, someone approves, and access is granted and later removed automatically.",
   "A catalog is a container of resources and access packages. Resources can be groups and Teams, enterprise applications (with their app roles), SharePoint Online sites (with their site roles), and other supported resource types. Catalogs let you delegate: catalog owners manage the catalog's resources and packages, access package managers manage packages within it, and catalog creators can create new catalogs. The General catalog exists by default. A resource must be added to a catalog before it can be used in an access package, and adding it requires ownership of the resource or an appropriate admin role.",
   "An access package bundles resource roles, such as membership of a group, the User role in an app and Member on a site, with one or more policies. Each assignment policy defines who can request (specific users and groups in your directory, all members, all users including guests, specific connected organizations, or none, meaning only admins assign directly), what happens on request, and for how long. Automatic assignment policies can add users who match an attribute rule, such as everyone in the Sales department, without a request.",
   "Approval settings in a policy include whether approval is required, who approves (specific approvers, the requestor's manager, sponsors, or internal sponsors), single-stage or multi-stage approval, backup approvers, escalation, and a timeout after which unapproved requests are denied. Requestors can be asked for a justification and custom questions. Lifecycle settings define expiration: on a specific date, after a number of days or hours, or never. Users can be allowed to request an extension before access ends, and recurring access reviews can be built into the policy so continued access is confirmed.",
   "Separation of duties prevents toxic combinations. In an access package's settings you list incompatible access packages or incompatible groups. A user who already has one of them can't request this package, for example a user with the Accounts Payable package can't request Payment Approver. Admins who assign directly can still override, and the checks are recorded.",
   "Everything is audited: requests, approvals, assignments and removals appear in the access package's requests and assignments pages and in the audit log. Custom extensions can call Azure Logic Apps at points in the lifecycle, for example to create an account in a non-Entra system when an assignment is granted. Entitlement management requires Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing, with some advanced features requiring ID Governance specifically."
  ],
  "terms": [
   [
    "Catalog",
    "A container of resources and access packages with its own delegated owners."
   ],
   [
    "Access package",
    "A bundle of resource roles (groups, apps, sites) with policies governing who can get them and for how long."
   ],
   [
    "Assignment policy",
    "Rules in an access package defining who can request, approval steps, expiration and reviews."
   ],
   [
    "Separation of duties",
    "Access package settings listing incompatible packages or groups to prevent conflicting access."
   ],
   [
    "Automatic assignment policy",
    "A policy that assigns an access package to users matching an attribute rule without a request."
   ]
  ],
  "example": "A new marketing campaign needs a Team, a SharePoint site and a design app. The marketing lead, a catalog owner, builds a Campaign access package with a policy letting Marketing department members request it, manager approval, and 90-day expiry with extension allowed. The package is marked incompatible with the Finance Approver package to enforce separation of duties.",
  "tip": "Resources go into catalogs, catalogs hold access packages, and policies decide who, approval and duration. When a question describes time-limited, approved, bundled access, the answer is an access package; for preventing conflicting access, it's incompatible packages or groups.",
  "check": [
   [
    "What must happen before a SharePoint site can be included in an access package?",
    "The site must be added as a resource to the access package's catalog."
   ],
   [
    "Which access package setting stops a user who has package A from requesting package B?",
    "Separation of duties: list package A as an incompatible access package in package B's settings."
   ],
   [
    "Name two options for when an access package assignment expires.",
    "Any two of: on a specific date, after a number of days, after a number of hours, or never."
   ]
  ]
 },
 {
  "t": "Connected organizations and access packages for external users",
  "body": [
   "Inviting guests one at a time works for a few partners, but it doesn't scale and it tends to leave stale guest accounts behind. Entitlement management offers a governed alternative: external users request an access package themselves, approvers decide, and their guest accounts are created on approval and cleaned up when access ends.",
   "A connected organization represents another organization you collaborate with. It can be identified by a Microsoft Entra tenant, which covers all of that tenant's domains, or by a domain name, for users authenticating another way such as email one-time passcode or a SAML/WS-Fed identity provider. Each connected organization can have internal and external sponsors, people who act as contacts and can be used as approvers. You create them under Identity Governance, Entitlement management, Connected organizations.",
   "Connected organizations have a state. Configured means an admin created it deliberately, and users from it can request packages whose policies include all configured connected organizations. Proposed means it was created automatically when a user from a new organization requested and was approved for a package whose policy allows all users, including organizations not yet connected; proposed organizations are not included in the all configured connected organizations scope until an admin changes their state to Configured. This distinction lets you open a package to anyone while still curating the list of trusted partners.",
   "In an access package policy for external users, you choose For users not in your directory, then one of: specific connected organizations, all configured connected organizations, or all users (all connected organizations plus any new external users). Approval is usually required for external requests, often by the internal sponsor. External users request access through the access package's My Access portal link, which you share with them; they sign in with their own identity, and on approval Entra creates a B2B guest account and adds it to the package's resources. External collaboration and cross-tenant access settings must still allow these users, or the request will fail.",
   "Lifecycle settings for external users are configured in entitlement management's Settings page. When an external user's last access package assignment expires or is removed, you can block them from signing in to your directory and then remove their guest account after a set number of days. This applies only to guests created or managed through entitlement management. Combined with expiring assignments and access reviews in the policy, this keeps guest access tied to a current business need.",
   "Remember the licensing and scope: guests are billed through Microsoft Entra External ID's monthly active user model, and the governance features used by the inviting tenant require the appropriate Microsoft Entra ID P2 or ID Governance licensing."
  ],
  "terms": [
   [
    "Connected organization",
    "An external organization, identified by Entra tenant or domain, that can request access packages."
   ],
   [
    "Configured state",
    "A connected organization an admin created or approved, included in the all configured connected organizations scope."
   ],
   [
    "Proposed state",
    "A connected organization created automatically after an approved request from a new organization."
   ],
   [
    "Sponsor",
    "An internal or external contact for a connected organization who can act as an approver."
   ],
   [
    "External user lifecycle",
    "Entitlement management settings to block and later remove guests whose last assignment ends."
   ]
  ],
  "example": "Contoso creates Fabrikam as a connected organization using Fabrikam's tenant, with an internal sponsor as approver. Fabrikam staff use the My Access link for the Joint Project access package; once approved, guest accounts are created automatically. When the 60-day assignments expire, the guests are blocked from signing in and removed after the configured number of days.",
  "tip": "Proposed connected organizations are not included when a policy targets all configured connected organizations. To have Entra clean up guests automatically, configure the external user lifecycle settings in entitlement management, which only affect guests brought in through it.",
  "check": [
   [
    "What causes a connected organization to be created in the Proposed state?",
    "A user from an organization not yet connected requests and is approved for a package whose policy allows all users, including new external organizations."
   ],
   [
    "How do external users request an access package?",
    "Through the My Access portal link for the package, which you share with them; they sign in with their own identity."
   ],
   [
    "What can entitlement management do when an external user's last assignment ends?",
    "Block the user from signing in and remove the guest account after a configured number of days."
   ]
  ]
 },
 {
  "t": "Access reviews: groups, apps, access packages and Entra roles; reviewers, recurrence, auto-apply and inactive-user recommendations",
  "body": [
   "Access tends to accumulate. People change roles and keep old group memberships; guests finish projects and never leave. Access reviews let the right people periodically confirm whether each user still needs access, and remove it if not. They are part of Microsoft Entra ID Governance and require Microsoft Entra ID P2 or ID Governance licensing for the users covered.",
   "You can review several kinds of access. Group membership covers security groups and Microsoft 365 groups, including Teams, either a specific group or all Microsoft 365 groups with guest users. Application access covers users assigned to an enterprise application. Access package assignments can be reviewed from the access package's policy. Privileged roles, both Microsoft Entra roles and Azure resource roles, are reviewed through Privileged Identity Management. You can limit a review to guest users only, which is a common way to clean up external access.",
   "Reviewers can be group owners, selected users or groups, managers of the users (with a fallback reviewer when a user has no manager), or the users themselves in a self-review, where each person attests to their own need. Multi-stage reviews chain stages, such as managers first and then the resource owner, and later stages can see earlier decisions.",
   "Settings include duration (how many days reviewers have), recurrence (one time, weekly, monthly, quarterly, semi-annually or annually) and an end date for the series. Upon completion settings decide what happens next: Auto apply results to resource removes denied users automatically; otherwise an admin applies them manually. If reviewers don't respond, the outcome can be no change, remove access, approve access or take recommendations. Other options include justification required, email notifications and reminders.",
   "Decision helpers make reviews easier. Recommendations suggest approve or deny based on signals such as whether the user has signed in recently, and user-to-group affiliation, which flags users whose place in the organization differs from other members. You can also scope a review to inactive users only, including only users who haven't signed in for a set number of days, so reviewers focus on likely stale access. Reviewers see these recommendations next to each user in the My Access portal or the review email.",
   "Results and history are kept for auditing. You can download review history reports for compliance evidence, and each decision is logged with the reviewer and justification. A typical design is a quarterly review of all Microsoft 365 groups with guests, reviewed by group owners, with auto-apply on and remove access if reviewers don't respond."
  ],
  "terms": [
   [
    "Access review",
    "A scheduled or one-time campaign in which reviewers approve or deny continued access."
   ],
   [
    "Self-review",
    "An access review where users attest to whether they still need their own access."
   ],
   [
    "Auto apply results",
    "A completion setting that automatically removes access that reviewers denied."
   ],
   [
    "If reviewers don't respond",
    "The setting deciding the outcome for unreviewed users: no change, remove, approve or take recommendations."
   ],
   [
    "Inactive-user recommendation",
    "A decision helper suggesting denial for users who have not signed in within a defined period."
   ]
  ],
  "example": "Contoso finds 800 guests in Teams from long-finished projects. It creates a quarterly access review of all Microsoft 365 groups with guest users, reviewed by group owners, with recommendations enabled, auto apply results on, and remove access if reviewers don't respond. After the first cycle, over half of the guests are removed automatically.",
  "tip": "Auto apply only acts on decisions; the If reviewers don't respond setting decides what happens to users nobody reviewed. Role reviews for Entra roles and Azure resource roles are created through PIM.",
  "check": [
   [
    "Where do you create access reviews for Microsoft Entra roles?",
    "In Privileged Identity Management, which handles reviews of Entra roles and Azure resource roles."
   ],
   [
    "Which setting removes denied users without an admin taking action?",
    "Auto apply results to resource."
   ],
   [
    "What decision helper suggests denying access to someone who hasn't signed in recently?",
    "The inactive user (no sign-in within a set number of days) recommendation."
   ]
  ]
 },
 {
  "t": "Lifecycle workflows for joiner, mover and leaver tasks (employeeHireDate, employeeLeaveDateTime)",
  "body": [
   "Joiner, mover and leaver (JML) processes are the moments when identity lifecycle mistakes happen: new hires without access on their first day, movers who keep old access, leavers whose accounts stay active. Lifecycle workflows, a Microsoft Entra ID Governance feature, automate the tasks around these moments inside Entra ID.",
   "A workflow has three parts. The trigger decides when it runs: most commonly a time-based attribute trigger that uses a date attribute plus an offset in days, such as seven days before employeeHireDate or on employeeLeaveDateTime; other triggers include attribute changes (for movers) and group membership changes. The execution conditions, or scope, decide who: a rule such as department equals Sales, or all users. The tasks decide what: an ordered list of built-in actions.",
   "Microsoft provides templates for common scenarios: onboard pre-hire employee, onboard new hire employee, post-onboarding, real-time employee termination, pre-offboarding, offboard an employee on their last day, and post-offboarding. Built-in tasks include generating a Temporary Access Pass and sending it to the user's manager, sending a welcome email, adding the user to groups or Teams, enabling or disabling the account, removing the user from all groups or Teams, removing all licenses, running a custom task extension, and deleting the user. Custom task extensions call Azure Logic Apps, which lets a workflow reach systems outside Entra, such as creating a ticket or notifying HR.",
   "The attributes matter. employeeHireDate is the user's start date, and employeeLeaveDateTime is the date and time the user leaves. They can be set by HR-driven inbound provisioning (for example from Workday or SuccessFactors), by synchronization from on-premises AD using a mapped attribute, or through Microsoft Graph. employeeLeaveDateTime is sensitive, because changing it can trigger an offboarding workflow; setting it through Graph requires a specific lifecycle permission in addition to normal user write permissions. Dates are stored in UTC, so time zones should be considered when choosing offsets.",
   "Workflows run on a schedule, every few hours by default and adjustable in lifecycle workflow settings, and can also be run on demand for selected users to test. Each run records results per user and per task, which you view in the workflow's history. A new workflow can be created with its schedule turned off so you can test on demand before enabling it.",
   "Lifecycle workflows handle tasks inside Entra; they complement, not replace, HR-driven provisioning, which creates and updates accounts, and entitlement management, which grants access packages. Together they give a hire-to-retire process with minimal manual effort."
  ],
  "terms": [
   [
    "Lifecycle workflow",
    "An automated set of tasks in Entra ID triggered by joiner, mover or leaver events."
   ],
   [
    "employeeHireDate",
    "The user attribute holding the start date, used to trigger onboarding workflows."
   ],
   [
    "employeeLeaveDateTime",
    "The user attribute holding the departure date and time, used to trigger offboarding workflows."
   ],
   [
    "Execution conditions",
    "The scope rule that determines which users a lifecycle workflow applies to."
   ],
   [
    "Custom task extension",
    "A workflow task that calls an Azure Logic App to perform actions outside the built-in tasks."
   ]
  ],
  "example": "HR provisioning sets a new engineer's employeeHireDate to the 1st of next month. A pre-hire workflow runs seven days before and generates a Temporary Access Pass emailed to her manager; on her start date, an onboarding workflow enables the account, sends a welcome email and adds her to the Engineering groups. When employeeLeaveDateTime arrives two years later, an offboarding workflow disables her, removes groups and licenses, and deletes the account 30 days after.",
  "tip": "Time-based triggers use a date attribute plus an offset. Onboarding pairs with employeeHireDate, offboarding with employeeLeaveDateTime, and setting employeeLeaveDateTime needs special permission. Lifecycle workflows need Microsoft Entra ID Governance licensing.",
  "check": [
   [
    "Which attribute would trigger a workflow that runs on an employee's last day?",
    "employeeLeaveDateTime, with an offset of zero days."
   ],
   [
    "How can a lifecycle workflow perform an action in a system outside Entra ID?",
    "By using a custom task extension that calls an Azure Logic App."
   ],
   [
    "Which task would give a new hire a way to set up passwordless sign-in on day one?",
    "Generate a Temporary Access Pass and send it to the user's manager."
   ]
  ]
 },
 {
  "t": "Terms of use and Conditional Access",
  "body": [
   "Organizations often need users to accept legal terms before accessing resources: an acceptable use policy for employees, a non-disclosure agreement for guests, or a regulatory notice. Microsoft Entra terms of use presents those documents at sign-in, records who accepted which version and when, and enforces acceptance through Conditional Access. It requires Microsoft Entra ID P1.",
   "You create terms of use under Conditional Access, Terms of use. Each terms of use object holds one or more PDF documents, with a default language and optional additional languages; users see the version matching their browser language. Settings include: Require users to expand the terms of use, which forces them to open the document before accepting; Require users to consent on every device, which records acceptance per device (this requires the device to be registered, and some platforms have limitations); Expire consents, which makes everyone reaccept on a schedule starting from a chosen date, such as annually; and Duration before re-acceptance required, which counts days from each user's own acceptance.",
   "Terms of use don't do anything on their own. You enforce them by creating a Conditional Access policy whose grant control includes the terms of use you created. The policy's assignments decide who must accept and for which apps, for example all guest users accessing all cloud apps, or all employees accessing the HR app. When the policy applies, users see the document after signing in and must accept to continue; declining blocks access. You can create the policy directly from the terms of use page or add the terms as a grant control in any Conditional Access policy, combined with other controls such as MFA.",
   "Reporting and auditing are built in. Each terms of use object shows counts of accepted and declined users, and you can view details for each user including the version and time of acceptance. Acceptance and declines are recorded in the audit log, which is useful when legal teams need proof. Users can review the terms they've accepted from their account portal.",
   "Updating the terms is handled with versions. When you upload a new version of the PDF, you can choose whether to require reacceptance; if you do, everyone must accept the new version at next sign-in. Deleting a terms of use object that is still referenced by a Conditional Access policy isn't allowed until the policy no longer uses it.",
   "A common design is a guest NDA: a terms of use object with the NDA PDF, expanded view required, and a Conditional Access policy targeting guest and external users for all cloud apps, so no partner can access anything without accepting."
  ],
  "terms": [
   [
    "Terms of use",
    "An Entra feature that presents PDF documents users must accept, enforced through Conditional Access."
   ],
   [
    "Require users to expand",
    "A terms of use setting forcing users to open the document before they can accept it."
   ],
   [
    "Expire consents",
    "A setting that requires all users to reaccept on a recurring schedule from a start date."
   ],
   [
    "Duration before re-acceptance",
    "A setting that requires each user to reaccept a set number of days after their own acceptance."
   ],
   [
    "Terms of use grant control",
    "The Conditional Access grant option requiring acceptance of a specific terms of use."
   ]
  ],
  "example": "A pharmaceutical company requires all guests to accept a confidentiality agreement. The admin uploads the agreement PDF in English and German, requires users to expand it and sets consents to expire yearly. A Conditional Access policy targeting guest and external users for all cloud apps grants access only with the terms accepted, and the legal team exports the acceptance report every quarter.",
  "tip": "Terms of use are enforced only through a Conditional Access grant control, so if acceptance isn't being prompted, check the policy's assignments. Expire consents resets everyone on a schedule; duration before re-acceptance is per user from their own acceptance date.",
  "check": [
   [
    "How do you force users to accept terms of use before accessing an app?",
    "Create a Conditional Access policy for those users and the app whose grant control requires the terms of use."
   ],
   [
    "Which setting ensures users actually open the document before accepting?",
    "Require users to expand the terms of use."
   ],
   [
    "Where can you prove when a specific user accepted the terms?",
    "In the terms of use acceptance details and in the audit log."
   ]
  ]
 },
 {
  "t": "Privileged Identity Management (PIM): eligible vs active assignments, activation settings, approval, alerts",
  "body": [
   "Standing privilege, where admins hold powerful roles all the time, means that any compromise of an admin account immediately gives an attacker those powers. Microsoft Entra Privileged Identity Management (PIM) reduces that risk with just-in-time access: admins hold roles only when they need them, for a limited time, with checks along the way. PIM requires Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing for the users who benefit from it.",
   "The central distinction is between eligible and active assignments. An eligible assignment means the user can activate the role when needed but doesn't have its permissions until they do. An active assignment means the user has the role's permissions now, with no activation. Both kinds can be permanent or time-bound, with a start and end date. The recommended pattern is eligible, time-bound assignments for most admins, with active permanent assignments reserved for emergency access accounts.",
   "Activation is the just-in-time step. The user opens PIM, selects My roles, chooses the eligible role and activates it, providing whatever the role's settings demand. Role settings, configured per role, include: activation maximum duration (between 1 and 24 hours); require multifactor authentication or a Conditional Access authentication context on activation, which lets you demand phishing-resistant MFA for sensitive roles; require justification; require ticket information, such as a change request number; and require approval to activate, with selected approvers. Settings also control assignment rules, such as whether permanent eligible or active assignments are allowed and the maximum assignment duration, and notifications sent to admins, assignees and approvers when roles are assigned or activated.",
   "Approval adds a second person. When a role requires approval, the activation request goes to the configured approvers, who approve or deny it with a justification in PIM's Approve requests page. Approvers don't need to hold the role themselves. Until someone approves, the user doesn't have the role, so plan for approver availability. Users can also request to extend an assignment that's about to expire, or renew an expired one, which an admin must approve.",
   "PIM alerts highlight risky configurations: too many Global Administrators, roles being assigned outside of PIM, roles that don't require MFA for activation, administrators who aren't using their privileged roles, and potential stale accounts in privileged roles. Each alert explains the risk and the fix. PIM also keeps an audit history of assignments and activations, and you can run access reviews of role assignments from PIM.",
   "Managing PIM itself requires the Privileged Role Administrator or Global Administrator role. In a mature tenant, most admin work happens through short activations logged in PIM, and the number of people with active privileged roles at any moment is close to zero."
  ],
  "terms": [
   [
    "Privileged Identity Management",
    "An Entra service providing just-in-time, time-bound and approval-based privileged role access."
   ],
   [
    "Eligible assignment",
    "A role assignment the user must activate before gaining the role's permissions."
   ],
   [
    "Active assignment",
    "A role assignment that grants permissions immediately without activation."
   ],
   [
    "Activation",
    "The just-in-time step where an eligible user turns on a role for a limited duration, meeting any required checks."
   ],
   [
    "PIM alert",
    "A warning about risky privileged access configuration, such as too many Global Administrators."
   ]
  ],
  "example": "Contoso makes all Exchange Administrators eligible rather than active. Activation lasts up to four hours, requires MFA, justification and a ticket number. For Global Administrator, activation also requires approval from the security lead. When an admin activates the Exchange role to fix a mailbox issue, the security team receives a notification, and the role expires automatically at the end of the window.",
  "tip": "Eligible means must activate; active means has it now. Settings like MFA, justification, ticket and approval apply at activation and are configured per role. Maximum activation duration is 1 to 24 hours.",
  "check": [
   [
    "What is the difference between an eligible and an active role assignment in PIM?",
    "Eligible requires the user to activate the role before using it; active grants the permissions immediately."
   ],
   [
    "Where do you configure that the Security Administrator role requires approval to activate?",
    "In PIM, in the role settings for Security Administrator, by enabling Require approval to activate and choosing approvers."
   ],
   [
    "Name two PIM alerts.",
    "Any two of: too many Global Administrators, roles assigned outside of PIM, roles don't require MFA for activation, administrators aren't using their privileged roles, potential stale accounts in privileged roles."
   ]
  ]
 },
 {
  "t": "PIM for Groups and PIM for Azure resource roles",
  "body": [
   "Privileged Identity Management isn't limited to Microsoft Entra roles. Two more scopes use the same eligible and active model: PIM for Groups, which makes group membership or ownership just-in-time, and PIM for Azure resources, which does the same for Azure RBAC roles on subscriptions and resources.",
   "PIM for Groups lets you make a user an eligible member or eligible owner of a group, so they join the group only when they activate. Because groups can carry many things, such as a Microsoft Entra role assignment (for role-assignable groups), Azure RBAC roles, app assignments or access to data, just-in-time membership becomes just-in-time access to all of them at once. Supported groups are security groups and Microsoft 365 groups; dynamic groups and groups synchronized from on-premises Active Directory are not supported, because their membership is controlled by rules or by the source directory. Role-assignable groups are the common case for bundling several Entra roles: create one role-assignable group holding, for example, Exchange Administrator and Teams Administrator, then make administrators eligible members of it.",
   "You enable a group for PIM from the group's Privileged Identity Management page or from PIM, Groups. Member and owner have separate role settings, so you can require approval for membership but not for ownership. Activation settings mirror PIM for roles: maximum duration, MFA or authentication context, justification, ticket information, approval and notifications. Users activate from My roles, Groups. When a PIM-managed group is used for Entra roles, protect it: only Privileged Role Administrators and Global Administrators can manage role-assignable group membership, which prevents easy privilege escalation.",
   "PIM for Azure resources covers Azure RBAC roles such as Owner, Contributor, User Access Administrator and any custom role, at management group, subscription, resource group or resource scope. Before you can manage a resource in PIM it must be discovered and onboarded, which is done from PIM, Azure resources, by someone with permission to manage role assignments on it. Once onboarded, you convert standing assignments to eligible ones, configure role settings per role at that scope and use the same activation, approval and alerts. Assignments inherit down the Azure hierarchy, so an eligible Owner on a subscription can manage every resource group in it after activation.",
   "Access reviews can target PIM-managed groups and Azure resource roles as well, and the PIM audit history records every assignment and activation. Choose the right scope in scenario questions: Entra role for directory administration, PIM for Groups when access flows from membership, and PIM for Azure resources for subscription and resource management."
  ],
  "terms": [
   [
    "PIM for Groups",
    "Just-in-time eligible membership or ownership of security or Microsoft 365 groups."
   ],
   [
    "PIM for Azure resources",
    "Just-in-time eligible assignment of Azure RBAC roles at management group, subscription, resource group or resource scope."
   ],
   [
    "Discovery and onboarding",
    "The step that brings Azure subscriptions or resources under PIM management."
   ],
   [
    "Eligible member",
    "A user who can activate group membership for a limited time through PIM."
   ],
   [
    "Role inheritance",
    "Azure RBAC behavior where a role assigned at a higher scope applies to all child scopes."
   ]
  ],
  "example": "Contoso's cloud team needs Owner on the production subscription only during changes. The admin onboards the subscription into PIM and makes the team eligible Owners requiring approval and a ticket number. Separately, a role-assignable group holding Exchange Administrator and Teams Administrator is enabled for PIM, and messaging admins become eligible members, activating both roles with one request.",
  "tip": "PIM for Groups doesn't support dynamic or on-premises synced groups. Azure resources must be discovered before they can be managed in PIM. Owner and User Access Administrator are the Azure roles most worth making eligible.",
  "check": [
   [
    "Can you enable PIM for a dynamic membership group?",
    "No. PIM for Groups doesn't support dynamic groups or groups synchronized from on-premises AD."
   ],
   [
    "What must you do before creating eligible assignments for a subscription in PIM?",
    "Discover and onboard the subscription (or resource) in PIM for Azure resources."
   ],
   [
    "How can one activation grant several Entra roles at once?",
    "Assign the roles to a role-assignable group and make the user an eligible member of that group with PIM for Groups."
   ]
  ]
 },
 {
  "t": "Sign-in, audit and provisioning logs; default retention and diagnostic settings to Log Analytics, storage or Event Hubs",
  "body": [
   "Microsoft Entra ID records three main kinds of activity logs, and knowing which log answers which question saves time in the exam and in real incidents. Sign-in logs answer who signed in, to what, from where, how and with what result. Audit logs answer who changed what in the directory. Provisioning logs answer what the provisioning service created, updated or deleted in target systems.",
   "Sign-in logs are divided into interactive user sign-ins, where the user provided a factor such as a password or MFA; non-interactive user sign-ins, performed by clients on the user's behalf using refresh tokens; service principal sign-ins, where apps authenticate with their own credentials; and managed identity sign-ins. Each entry includes user, app, IP address, location, device, authentication details, Conditional Access results and error codes.",
   "Audit logs record changes by service and category: user and group management, role assignments, application changes, policy updates, password resets and more. Each entry shows the activity, the initiator (user or app), the target and the modified properties with old and new values. Provisioning logs record actions from automatic app provisioning, HR inbound provisioning and cross-tenant synchronization, with step-by-step details of matching, action and result.",
   "Retention in the admin center is limited. With the free edition, activity reports are kept for 7 days. With Microsoft Entra ID P1 or P2, sign-in and audit logs are kept for 30 days. If you need longer history, correlation with other data, or alerting, you must export the logs yourself, and exporting sign-in logs requires a P1 or P2 license.",
   "Export is configured under Monitoring, Diagnostic settings. A diagnostic setting selects log categories, such as AuditLogs, SignInLogs, NonInteractiveUserSignInLogs, ServicePrincipalSignInLogs, ManagedIdentitySignInLogs, ProvisioningLogs, RiskyUsers and UserRiskEvents, and one or more destinations. A Log Analytics workspace is used for KQL queries, workbooks and alert rules, and is the basis for Microsoft Sentinel. An Azure storage account provides low-cost long-term archiving, useful for compliance retention. An Event Hub streams logs in near real time to a third-party SIEM or other consumer. A partner solution destination is also available. You can create several diagnostic settings to send different categories to different places, for example everything to storage for a year and sign-ins to Log Analytics for analysis.",
   "Configuring diagnostic settings requires the Security Administrator or Global Administrator role in Entra, plus permissions on the destination Azure resource. Retention in the destination is controlled there, for example by the Log Analytics workspace's retention setting. Microsoft Graph APIs also expose these logs, which is useful for scripted reporting."
  ],
  "terms": [
   [
    "Sign-in logs",
    "Records of authentication events, split into interactive, non-interactive, service principal and managed identity sign-ins."
   ],
   [
    "Audit logs",
    "Records of directory changes showing the activity, initiator, target and modified properties."
   ],
   [
    "Provisioning logs",
    "Records of actions taken by provisioning services in target systems."
   ],
   [
    "Diagnostic setting",
    "A configuration that exports selected Entra log categories to Log Analytics, storage, Event Hubs or a partner."
   ],
   [
    "Event Hub",
    "An Azure streaming service used to forward logs in near real time to external SIEM tools."
   ]
  ],
  "example": "Auditors ask Contoso to keep identity logs for two years, and the security team uses a third-party SIEM. The admin creates one diagnostic setting sending audit and all sign-in categories to a storage account with a lifecycle policy for two years, and a second setting streaming sign-in and risk logs to an Event Hub consumed by the SIEM. A Log Analytics workspace receives sign-ins for workbooks.",
  "tip": "Default retention: 7 days free, 30 days P1/P2. Long-term archive means storage account; SIEM streaming means Event Hub; KQL, workbooks and alerts mean Log Analytics. Non-interactive sign-ins are a separate category you must select explicitly.",
  "check": [
   [
    "How long are sign-in and audit logs retained in the portal for a tenant with Entra ID P1?",
    "30 days (7 days for free tenants)."
   ],
   [
    "Which diagnostic setting destination should you choose to stream logs to a third-party SIEM?",
    "An Azure Event Hub (or a supported partner solution)."
   ],
   [
    "Which log would show who removed a user from a group?",
    "The audit log, which records directory changes with the initiator and target."
   ]
  ]
 },
 {
  "t": "Workbooks, KQL queries in Log Analytics, Identity Secure Score and Microsoft Entra recommendations",
  "body": [
   "Once identity logs flow to a Log Analytics workspace, you can analyze them with workbooks and Kusto Query Language (KQL), and alongside that, Microsoft provides two built-in guidance tools, Identity Secure Score and Microsoft Entra recommendations, that tell you what to improve.",
   "Workbooks are interactive reports built on Log Analytics data, available under Monitoring, Workbooks in the Entra admin center. Microsoft supplies templates, such as Conditional Access insights and reporting (the impact of policies, including report-only ones), Sign-ins using legacy authentication (who still uses protocols you plan to block), Authentication prompts analysis, Sensitive operations report, and app sign-in health. You can filter by time, user and app, and customize or save copies. Workbooks require that the relevant logs be sent to a workspace through diagnostic settings.",
   "KQL queries go further. Tables include SigninLogs, AADNonInteractiveUserSignInLogs, AADServicePrincipalSignInLogs, AuditLogs and others. A query starts with a table and pipes it through operators such as where, summarize, project and order by. This example counts failed sign-ins per user over the last day:",
   "```kusto\nSigninLogs\n| where TimeGenerated > ago(1d)\n| where ResultType != \"0\"\n| summarize Failures = count() by UserPrincipalName, ResultType\n| order by Failures desc\n```",
   "In SigninLogs, ResultType 0 means success; other values are error codes. From a saved query you can create an Azure Monitor alert rule, for example alerting when a break-glass account appears in SigninLogs, or when an audit event shows credentials added to an application.",
   "Identity Secure Score is a percentage that measures how closely your tenant follows Microsoft's identity security recommendations. It lists improvement actions, such as requiring MFA for administrative roles, blocking legacy authentication, enabling user risk policies or using fewer than five Global Administrators, each with a maximum score impact, current progress and implementation guidance. You can compare against similar organizations and track history. Some actions can be marked as resolved through a third party or accepted as a risk, which changes how they count.",
   "Microsoft Entra recommendations is a related feed of specific, tenant-aware actions with a priority, status (Active, Completed, Dismissed or Postponed), impacted resources and remediation steps. Examples include removing unused applications, renewing expiring credentials, migrating applications off legacy authentication libraries and converting per-user MFA to Conditional Access. Recommendations are updated as your tenant changes, and those related to secure score feed into it. Use both as a prioritized to-do list rather than a one-time checklist."
  ],
  "terms": [
   [
    "Workbook",
    "An interactive, customizable report built on Log Analytics data, with Entra templates for common scenarios."
   ],
   [
    "KQL",
    "Kusto Query Language, used to query Log Analytics tables such as SigninLogs and AuditLogs."
   ],
   [
    "SigninLogs",
    "The Log Analytics table containing interactive user sign-in events exported from Entra ID."
   ],
   [
    "Identity Secure Score",
    "A percentage measuring alignment with Microsoft identity security best practices, with improvement actions."
   ],
   [
    "Microsoft Entra recommendations",
    "Tenant-specific, prioritized actions with status tracking and impacted resources."
   ]
  ],
  "example": "Before blocking legacy authentication, the admin opens the Sign-ins using legacy authentication workbook and finds two printers and a line-of-business app still using SMTP basic authentication. After fixing them and enabling the block policy, Identity Secure Score rises and the related improvement action shows as completed. A KQL alert watches SigninLogs for any break-glass sign-in.",
  "tip": "Workbooks and KQL need logs in a Log Analytics workspace via diagnostic settings. In SigninLogs, ResultType 0 means success. Identity Secure Score measures posture as a percentage; recommendations list concrete fixes with statuses you can postpone or dismiss.",
  "check": [
   [
    "What must be configured before Entra workbooks can show sign-in data?",
    "A diagnostic setting sending sign-in logs to a Log Analytics workspace."
   ],
   [
    "In a KQL query on SigninLogs, how do you filter to failed sign-ins?",
    "Use where ResultType != \"0\", because 0 indicates success."
   ],
   [
    "Name two Identity Secure Score improvement actions.",
    "For example: require MFA for administrative roles, block legacy authentication, enable user or sign-in risk policies, or designate fewer than five Global Administrators."
   ]
  ]
 },
 {
  "t": "Licensing: Microsoft Entra ID P1, P2 and Microsoft Entra ID Governance features",
  "body": [
   "Many SC-300 questions hinge on licensing: a feature fits the scenario, but only if the tenant has the right plan. Microsoft Entra ID comes in a Free edition and the paid P1 and P2 editions, with Microsoft Entra ID Governance as an add-on and other products such as Workload ID Premium and Global Secure Access licensed separately. Prices and bundles change, so focus on which features belong to which tier.",
   "Microsoft Entra ID Free is included with Microsoft cloud subscriptions such as Microsoft 365 and Azure. It provides user and group management, directory synchronization with Entra Connect or Cloud Sync, single sign-on to SaaS apps, basic security reports, security defaults, self-service password change for cloud users, and B2B collaboration. It does not include Conditional Access.",
   "Microsoft Entra ID P1 adds the core enterprise features: Conditional Access (including terms of use and named locations), dynamic groups, group-based licensing, self-service password reset with on-premises writeback, application proxy, Microsoft Entra Connect Health, custom administrator roles, administrative units, custom banned password lists and on-premises password protection, company branding, and export of sign-in logs to diagnostic destinations with 30-day portal retention. P1 is included in Microsoft 365 E3 and Business Premium.",
   "Microsoft Entra ID P2 includes everything in P1 and adds Microsoft Entra ID Protection (risk-based Conditional Access and risky user and sign-in reports), Privileged Identity Management, access reviews and entitlement management, which together form the identity governance basics. P2 is included in Microsoft 365 E5.",
   "Microsoft Entra ID Governance is an add-on for P1 or P2 customers, and part of the Microsoft Entra Suite, that provides the complete governance feature set. On top of what P2 offers, it adds lifecycle workflows for joiner, mover and leaver automation, advanced entitlement management capabilities such as custom extensions with Logic Apps and automatic assignment policies, machine-learning-assisted access review features, and other advanced governance capabilities. When a scenario mentions lifecycle workflows or other advanced governance automation, think ID Governance.",
   "Other licenses round out the picture. Microsoft Entra Workload ID Premium covers Conditional Access and ID Protection for workload identities. Microsoft Entra Internet Access and Private Access license Global Secure Access. Microsoft Entra External ID bills external users by monthly active users. Licensing is generally per user who benefits from a feature, not per administrator, so, for example, every user protected by Conditional Access needs P1.",
   "A reliable exam method: identify the feature, then map it. Conditional Access, dynamic groups, group licensing, app proxy, writeback: P1. Anything risk-based, PIM, access reviews, entitlement management: P2. Lifecycle workflows and advanced governance: ID Governance. Service principal risk and CA: Workload ID Premium."
  ],
  "terms": [
   [
    "Microsoft Entra ID Free",
    "The included edition with directory, sync, SSO, B2B and security defaults, but no Conditional Access."
   ],
   [
    "Microsoft Entra ID P1",
    "The paid edition adding Conditional Access, dynamic groups, group licensing, SSPR writeback, app proxy and more."
   ],
   [
    "Microsoft Entra ID P2",
    "P1 plus ID Protection, Privileged Identity Management, access reviews and entitlement management."
   ],
   [
    "Microsoft Entra ID Governance",
    "An add-on for P1 or P2 that adds lifecycle workflows and advanced governance features."
   ],
   [
    "Workload ID Premium",
    "A license adding Conditional Access and risk detection for workload identities."
   ]
  ],
  "example": "A company on Microsoft 365 E3 (which includes P1) wants risk-based Conditional Access, just-in-time admin roles and automated offboarding. The identity architect notes that risk-based policies and PIM require P2, and automated offboarding with lifecycle workflows requires Microsoft Entra ID Governance, so the proposal adds the Governance add-on for the relevant users.",
  "tip": "Memorize the split: P1 is Conditional Access and hybrid conveniences; P2 is risk and privileged access plus basic governance; ID Governance is lifecycle workflows and advanced governance. When a question asks for the minimum license, choose the lowest tier that contains every feature mentioned.",
  "check": [
   [
    "Which is the minimum license for Privileged Identity Management?",
    "Microsoft Entra ID P2 (or Microsoft Entra ID Governance)."
   ],
   [
    "Which license tier is needed for dynamic groups and group-based licensing?",
    "Microsoft Entra ID P1."
   ],
   [
    "A scenario requires lifecycle workflows. Which license does it need?",
    "Microsoft Entra ID Governance."
   ]
  ]
 }
]);
