/* Security administration hands-on labs: Microsoft Entra ID, Sentinel, Defender, Azure baseline, NGFW policy and IPsec VPN. Schema: see LABS_FORMAT.md. */
CertHub.registerLabs([
  {
    "id": "lab-entra-conditional-access",
    "title": "Administer Microsoft Entra ID: users, groups, MFA and Conditional Access",
    "track": "GRC & architecture",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free to low cost: a dedicated Entra ID tenant (created with an Azure free account) plus a 30-day Microsoft Entra ID P2 trial, which Conditional Access and sign-in log export need. The trial can ask for a payment method and can convert to paid, so turn off recurring billing on the day you start it.",
    "summary": "In a lab tenant you own, create users and a dynamic group with Microsoft Graph PowerShell, add an excluded break-glass account, register MFA, then build Conditional Access policies in report-only mode, read their impact in the sign-in logs and the What If tool, and switch them on for a pilot group.",
    "realWorld": "Entra ID (formerly Azure AD) is the identity provider for most Microsoft 365 and Azure shops, and identity administrators spend much of their week on exactly this: onboarding users, keeping groups tidy, rolling out MFA and changing Conditional Access without locking anyone out. The report-only-then-pilot-then-enforce pattern is how real rollouts are done, and it is heavily tested on SC-300 and SC-500.",
    "youWillNeed": [
      "A new Microsoft Entra tenant used only for labs (sign up for an Azure free account with a new Microsoft account, or create a tenant from Entra admin center > Manage tenants); never use your employer's tenant",
      "A Microsoft Entra ID P2 (or Microsoft Entra Suite) free trial activated in that tenant",
      "Windows, macOS or Linux with PowerShell 7 and the Microsoft Graph PowerShell SDK",
      "A phone with Microsoft Authenticator, and a private/InPrivate browser window for signing in as test users"
    ],
    "requires": [
      "lab-iam-sso"
    ],
    "safety": "Work only in a tenant you created for labs. Create and exclude an emergency access (break-glass) account before any Conditional Access policy exists, keep its long random password offline, and always start policies in report-only mode so a mistake cannot lock you out.",
    "steps": [
      {
        "title": "Start the P2 trial and set cost guard-rails",
        "body": "Sign in to https://entra.microsoft.com as the tenant's first Global Administrator. Open Billing > Licenses > All products > Try / Buy and activate the Microsoft Entra ID P2 trial (the Microsoft 365 admin center under Billing > Purchase services offers the same trials). Then in the Microsoft 365 admin center, open Billing > Your products and turn off recurring billing for the trial so it cannot convert to paid.",
        "check": "Licenses > All products lists Microsoft Entra ID P2 with trial licenses available, and recurring billing shows Off."
      },
      {
        "title": "Install Microsoft Graph PowerShell and connect",
        "body": "Graph PowerShell is the supported way to script Entra ID (the old AzureAD and MSOnline modules are retired). Connect with only the scopes this lab needs; you will be asked to consent once as an administrator.",
        "cmd": "Install-Module Microsoft.Graph -Scope CurrentUser -Repository PSGallery -Force\nConnect-MgGraph -Scopes \"User.ReadWrite.All\",\"Group.ReadWrite.All\",\"Directory.ReadWrite.All\",\"Policy.Read.All\",\"Policy.ReadWrite.ConditionalAccess\",\"AuditLog.Read.All\"\nGet-MgContext | Select-Object Account, TenantId, Scopes\n$domain = (Get-MgDomain | Where-Object IsDefault).Id; $domain",
        "check": "Get-MgContext shows your admin account and tenant ID, and $domain prints your yourtenant.onmicrosoft.com domain."
      },
      {
        "title": "Create a break-glass account first",
        "body": "Emergency access accounts are cloud-only Global Administrators that every Conditional Access policy excludes, so you can recover if a policy goes wrong. Create one with a long random password, then assign Global Administrator in the portal (Roles & admins > Global Administrator > Add assignments). Record the password offline.",
        "cmd": "$bgPass = -join ((48..57)+(65..90)+(97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})\n$bg = New-MgUser -DisplayName \"BreakGlass 01\" -UserPrincipalName \"bg01@$domain\" -MailNickname \"bg01\" -AccountEnabled -PasswordProfile @{ Password = $bgPass; ForceChangePasswordNextSignIn = $false }\n$bgPass   # write this down offline, then clear the screen\n$bg.Id",
        "check": "bg01 exists and, after the portal step, appears under Global Administrator assignments."
      },
      {
        "title": "Create test users with attributes",
        "body": "Create three lab users with a department attribute. Attributes drive dynamic groups, which is how real tenants automate joiner-mover-leaver group membership.",
        "cmd": "$users = @(@{n=\"Ana Finance\";u=\"ana\";d=\"Finance\"}, @{n=\"Ben Finance\";u=\"ben\";d=\"Finance\"}, @{n=\"Cara Sales\";u=\"cara\";d=\"Sales\"})\nforeach ($x in $users) {\n  New-MgUser -DisplayName $x.n -UserPrincipalName \"$($x.u)@$domain\" -MailNickname $x.u -Department $x.d -UsageLocation \"US\" -AccountEnabled -PasswordProfile @{ Password = \"Lab-Only-$(Get-Random -Maximum 99999)!Aa\"; ForceChangePasswordNextSignIn = $true } | Select-Object DisplayName, UserPrincipalName, Id\n}",
        "check": "Three users print with their IDs; note each temporary password (or reset it in the portal before first sign-in)."
      },
      {
        "title": "Create a pilot security group and a dynamic group",
        "body": "CA-Pilot is an assigned group you control by hand; Dyn-Finance fills itself from the department attribute (dynamic membership needs P1 or P2). Processing can take a few minutes.",
        "cmd": "$pilot = New-MgGroup -DisplayName \"CA-Pilot\" -MailEnabled:$false -MailNickname \"capilot\" -SecurityEnabled\nNew-MgGroupMember -GroupId $pilot.Id -DirectoryObjectId (Get-MgUser -UserId \"ana@$domain\").Id\nNew-MgGroupMember -GroupId $pilot.Id -DirectoryObjectId (Get-MgUser -UserId \"cara@$domain\").Id\n$fin = New-MgGroup -DisplayName \"Dyn-Finance\" -MailEnabled:$false -MailNickname \"dynfinance\" -SecurityEnabled -GroupTypes \"DynamicMembership\" -MembershipRule '(user.department -eq \"Finance\")' -MembershipRuleProcessingState \"On\"\nStart-Sleep 120; Get-MgGroupMember -GroupId $fin.Id | ForEach-Object { (Get-MgUser -UserId $_.Id).UserPrincipalName }",
        "check": "CA-Pilot contains ana and cara; Dyn-Finance lists ana and ben (re-run the last line if it is still empty)."
      },
      {
        "title": "Turn off security defaults and set authentication methods",
        "body": "Security defaults and Conditional Access cannot run together. In Entra admin center open Overview > Properties > Manage security defaults and set them to Disabled (choose 'My organization is planning to use Conditional Access'). Then open Protection > Authentication methods > Policies and make sure Microsoft Authenticator and Passkey (FIDO2) are enabled for All users, and that SMS and voice are off; phishing-resistant methods are the goal.",
        "cmd": "Get-MgPolicyIdentitySecurityDefaultEnforcementPolicy | Select-Object IsEnabled",
        "check": "IsEnabled is False, and the Authentication methods list shows Microsoft Authenticator Enabled."
      },
      {
        "title": "Register MFA as a test user",
        "body": "In an InPrivate window sign in to https://aka.ms/mysecurityinfo as ana, change the temporary password and add Microsoft Authenticator. Repeat for cara. This mirrors what your help desk walks new starters through.",
        "check": "In the portal, Users > ana > Authentication methods lists Microsoft Authenticator."
      },
      {
        "title": "Create Conditional Access policies in report-only mode",
        "body": "CA01 requires MFA for the pilot group on all apps; CA02 blocks legacy authentication (clients that cannot do MFA) for everyone. Both exclude the break-glass account and start as enabledForReportingButNotEnforced, which logs what would have happened without affecting anyone.",
        "cmd": "$ca01 = New-MgIdentityConditionalAccessPolicy -BodyParameter @{\n  displayName = \"CA01 - Require MFA - CA-Pilot\"; state = \"enabledForReportingButNotEnforced\"\n  conditions = @{ users = @{ includeGroups = @($pilot.Id); excludeUsers = @($bg.Id) }; applications = @{ includeApplications = @(\"All\") }; clientAppTypes = @(\"all\") }\n  grantControls = @{ operator = \"OR\"; builtInControls = @(\"mfa\") } }\n$ca02 = New-MgIdentityConditionalAccessPolicy -BodyParameter @{\n  displayName = \"CA02 - Block legacy authentication\"; state = \"enabledForReportingButNotEnforced\"\n  conditions = @{ users = @{ includeUsers = @(\"All\"); excludeUsers = @($bg.Id) }; applications = @{ includeApplications = @(\"All\") }; clientAppTypes = @(\"exchangeActiveSync\",\"other\") }\n  grantControls = @{ operator = \"OR\"; builtInControls = @(\"block\") } }\nGet-MgIdentityConditionalAccessPolicy | Select-Object DisplayName, State",
        "check": "Both policies list with State enabledForReportingButNotEnforced, and the portal shows them as Report-only."
      },
      {
        "title": "Read report-only results in the sign-in logs",
        "body": "Sign in to https://myapps.microsoft.com as ana and as ben (ben is not in the pilot). Sign-in logs can take 5 to 15 minutes to appear. Each sign-in records every policy's result, so you can see who a policy would have hit before you enforce it.",
        "cmd": "Get-MgAuditLogSignIn -Filter \"userPrincipalName eq 'ana@$domain'\" -Top 5 | ForEach-Object { $_.AppliedConditionalAccessPolicies | Select-Object DisplayName, Result }\nGet-MgAuditLogSignIn -Filter \"userPrincipalName eq 'ben@$domain'\" -Top 5 | ForEach-Object { $_.AppliedConditionalAccessPolicies | Select-Object DisplayName, Result }",
        "check": "ana's sign-ins show CA01 as reportOnlySuccess or reportOnlyInterrupted; ben's show CA01 as notApplied."
      },
      {
        "title": "Check the design with the What If tool",
        "body": "In Protection > Conditional Access > Policies, choose What If. Test ana, cara, ben and bg01 against Office 365 or All cloud apps. Also open the Conditional Access Insights and reporting workbook if it is available. Write down the expected result for each user before you enforce anything.",
        "check": "What If shows CA01 applies to ana and cara, not to ben, and no policy applies to bg01."
      },
      {
        "title": "Enforce for the pilot and test",
        "body": "Switch both policies on. In a new InPrivate window sign in as cara: you should now be prompted for Authenticator. Then confirm the change itself was audited, because every Conditional Access change should be traceable to an administrator.",
        "cmd": "Update-MgIdentityConditionalAccessPolicy -ConditionalAccessPolicyId $ca01.Id -State \"enabled\"\nUpdate-MgIdentityConditionalAccessPolicy -ConditionalAccessPolicyId $ca02.Id -State \"enabled\"\nGet-MgAuditLogDirectoryAudit -Filter \"loggedByService eq 'Conditional Access'\" -Top 10 | Select-Object ActivityDateTime, ActivityDisplayName, @{n='By';e={$_.InitiatedBy.User.UserPrincipalName}}",
        "check": "cara gets an MFA prompt, the sign-in log shows CA01 result 'success', and the audit log shows 'Update conditional access policy' by your admin account."
      },
      {
        "title": "Test the break-glass account and document it",
        "body": "Sign in once as bg01 to prove it works and is not subject to CA, then sign out. Real organizations alert on every break-glass sign-in; you will build that alert in lab-sentinel-kql. Write a one-page design note: policy names, targets, exclusions, grant controls and the rollback plan.",
        "cmd": "Get-MgAuditLogSignIn -Filter \"userPrincipalName eq 'bg01@$domain'\" -Top 3 | Select-Object CreatedDateTime, Status, ConditionalAccessStatus",
        "check": "bg01's sign-in shows ConditionalAccessStatus notApplied."
      }
    ],
    "verify": [
      "Dyn-Finance membership was populated automatically from the department attribute.",
      "Sign-in logs show report-only results for CA01 before it was enforced.",
      "After enforcement a pilot user was prompted for MFA while bg01 was excluded.",
      "The directory audit log records who changed each Conditional Access policy."
    ],
    "deliverable": "A Conditional Access rollout write-up: tenant design (users, groups, break-glass), the authentication methods decision, each policy's JSON (Get-MgIdentityConditionalAccessPolicy | ConvertTo-Json -Depth 10), report-only evidence from the sign-in logs, What If screenshots, and the enforcement change record with rollback steps. Redact the tenant ID.",
    "resume": "Administered a Microsoft Entra ID tenant with Graph PowerShell, automated group membership with dynamic rules, and rolled out MFA and legacy-auth blocking through Conditional Access using report-only analysis, a pilot group and excluded break-glass accounts.",
    "interview": [
      "Why run a Conditional Access policy in report-only mode first? — It logs what the policy would have done on real sign-ins, so you can find users, apps and devices that would break before anyone is blocked.",
      "What is a break-glass account? — A cloud-only emergency Global Administrator excluded from Conditional Access, with a strong offline credential and alerting on use, so you can recover from a lockout or IdP failure.",
      "Why block legacy authentication? — Protocols such as IMAP, POP and older Exchange ActiveSync clients cannot do MFA, so attackers use them for password spraying that bypasses MFA."
    ],
    "cleanup": [
      "If you continue to lab-entra-pim-reviews, keep the tenant, users and trial; otherwise continue below.",
      "Remove the policies: Get-MgIdentityConditionalAccessPolicy | ForEach-Object { Remove-MgIdentityConditionalAccessPolicy -ConditionalAccessPolicyId $_.Id }",
      "Remove the test users and groups: Remove-MgUser for ana, ben and cara; Remove-MgGroup for CA-Pilot and Dyn-Finance. Re-enable security defaults if the tenant stays.",
      "Confirm the P2 trial has recurring billing off, then Disconnect-MgGraph."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Conditional Access overview",
        "url": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
      },
      {
        "label": "Microsoft Learn: Conditional Access report-only mode",
        "url": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only"
      },
      {
        "label": "Microsoft Learn: Manage emergency access accounts",
        "url": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access"
      },
      {
        "label": "Microsoft Graph PowerShell SDK documentation",
        "url": "https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview"
      }
    ]
  },
  {
    "id": "lab-entra-pim-reviews",
    "title": "Just-in-time admin with Entra PIM and access reviews",
    "track": "GRC & architecture",
    "level": "Advanced",
    "minutes": 180,
    "cost": "Free within the 30-day Microsoft Entra ID P2 trial from lab-entra-conditional-access (PIM and access reviews need P2 or Microsoft Entra ID Governance). Keep recurring billing off.",
    "summary": "Find standing privileged role holders, convert an administrator to an eligible Privileged Identity Management (PIM) assignment with MFA, justification, approval and a time limit, activate the role just in time, read the PIM audit trail, then run an access review of a group and a privileged role and apply the results.",
    "realWorld": "Standing admin rights are one of the most common audit findings and a favorite target for attackers. Identity governance teams use PIM so admins hold rights only when they need them, and run quarterly access reviews so managers or owners re-certify who still needs access. Auditors ask for exactly the evidence this lab produces, and SC-300 devotes a whole domain to it.",
    "youWillNeed": [
      "The lab tenant, users (ana, ben, cara), groups and P2 trial from lab-entra-conditional-access",
      "PowerShell 7 with the Microsoft Graph PowerShell SDK",
      "Two browser profiles or InPrivate windows to act as the admin and as the requesting user"
    ],
    "requires": [
      "lab-entra-conditional-access"
    ],
    "safety": "Work only in your lab tenant and keep your break-glass account as a permanent (active) Global Administrator so you cannot lose admin access while experimenting with PIM.",
    "steps": [
      {
        "title": "Connect with governance scopes",
        "body": "PIM for Entra roles and access reviews use their own Graph permissions. Connect as your Global Administrator with these scopes.",
        "cmd": "Connect-MgGraph -Scopes \"RoleManagement.ReadWrite.Directory\",\"AccessReview.ReadWrite.All\",\"User.Read.All\",\"Group.Read.All\",\"AuditLog.Read.All\"\n$domain = (Get-MgDomain | Where-Object IsDefault).Id",
        "check": "Get-MgContext lists the new scopes."
      },
      {
        "title": "Inventory standing privileged access",
        "body": "Before changing anything, record who holds privileged roles permanently. Global Administrator's role template ID is the same in every tenant. This list is your 'before' evidence.",
        "cmd": "$ga = \"62e90394-69f5-4237-9190-012177145e10\"\nGet-MgRoleManagementDirectoryRoleAssignment -Filter \"roleDefinitionId eq '$ga'\" -ExpandProperty Principal | ForEach-Object { $_.Principal.AdditionalProperties.userPrincipalName }\nGet-MgRoleManagementDirectoryRoleAssignment -All -ExpandProperty RoleDefinition | Group-Object { $_.RoleDefinition.DisplayName } | Select-Object Name, Count",
        "check": "You see your admin account and bg01 as Global Administrators and a count per role."
      },
      {
        "title": "Harden the role settings in PIM",
        "body": "In Entra admin center open Identity governance > Privileged Identity Management > Microsoft Entra roles > Settings and edit User Administrator. Set activation maximum duration to 2 hours, require Azure MFA (or a Conditional Access authentication context) on activation, require justification, require approval with your admin account as approver, and under Assignment make eligible assignments expire after 30 days. Turn on the notification emails.",
        "check": "The User Administrator settings page shows 'Require approval to activate: Yes' and 'Activation maximum duration: 2 hour(s)'."
      },
      {
        "title": "Make ana eligible for User Administrator",
        "body": "An eligible assignment means ana can request the role but does not have it. Create it with Graph so the change is scripted and repeatable.",
        "cmd": "$role = Get-MgRoleManagementDirectoryRoleDefinition -Filter \"displayName eq 'User Administrator'\"\n$ana = Get-MgUser -UserId \"ana@$domain\"\nNew-MgRoleManagementDirectoryRoleEligibilityScheduleRequest -BodyParameter @{\n  action = \"adminAssign\"; justification = \"Lab: help desk lead, JIT only\"\n  roleDefinitionId = $role.Id; directoryScopeId = \"/\"; principalId = $ana.Id\n  scheduleInfo = @{ startDateTime = (Get-Date).ToUniversalTime().ToString(\"o\"); expiration = @{ type = \"afterDuration\"; duration = \"P30D\" } } }\nGet-MgRoleManagementDirectoryRoleEligibilitySchedule -Filter \"principalId eq '$($ana.Id)'\" | Select-Object RoleDefinitionId, Status, ScheduleInfo",
        "check": "The eligibility schedule shows Status Provisioned, and PIM > Microsoft Entra roles > Assignments > Eligible lists ana."
      },
      {
        "title": "Prove ana has no standing rights",
        "body": "Sign in to https://entra.microsoft.com as ana in an InPrivate window and try to create a user. The action should be denied because the role is only eligible.",
        "check": "The New user button is unavailable or creation fails with an insufficient privileges error."
      },
      {
        "title": "Request just-in-time activation",
        "body": "As ana, open Identity governance > Privileged Identity Management > My roles, choose Activate on User Administrator, complete MFA, request 1 hour and enter a justification that references a ticket number (for example CHG-1042). Real approvers reject requests without a ticket.",
        "check": "The request shows 'Pending approval'."
      },
      {
        "title": "Approve and use the role",
        "body": "As your admin, open PIM > Approve requests, read the justification and approve. Back as ana, sign out and in again (tokens carry roles), then create a test user named dan. Afterwards list the active assignment from Graph to see its end time.",
        "cmd": "Get-MgRoleManagementDirectoryRoleAssignmentScheduleInstance -Filter \"principalId eq '$($ana.Id)'\" | Select-Object RoleDefinitionId, AssignmentType, StartDateTime, EndDateTime",
        "check": "ana can now create a user, and the schedule instance shows AssignmentType Activated with an end time 1 hour after start."
      },
      {
        "title": "Read the PIM audit trail",
        "body": "Auditors want request, approval, activation and use tied together. Open PIM > Microsoft Entra roles > Resource audit and My audit, and query the directory audit log for PIM events.",
        "cmd": "Get-MgAuditLogDirectoryAudit -Filter \"loggedByService eq 'PIM'\" -Top 20 | Select-Object ActivityDateTime, ActivityDisplayName, @{n='By';e={$_.InitiatedBy.User.UserPrincipalName}}, Result",
        "check": "You see events such as 'Add member to role requested (PIM activation)', 'Add member to role request approved (PIM activation)' and 'Add member to role completed (PIM activation)'."
      },
      {
        "title": "Create an access review for a group",
        "body": "In Identity governance > Access reviews > New access review, review Teams + Groups > CA-Pilot. Reviewers: selected users (your admin), duration 3 days, recurrence quarterly. Under Upon completion settings turn on 'Auto apply results to resource' and set 'If reviewers don't respond' to Remove access. Enable 'Justification required' and decision helpers (no sign-in within 30 days).",
        "cmd": "Get-MgIdentityGovernanceAccessReviewDefinition | Select-Object DisplayName, Status, @{n='Recurrence';e={$_.Settings.Recurrence.Pattern.Type}}",
        "check": "The review definition lists with Status InProgress (or NotStarted for a minute)."
      },
      {
        "title": "Complete the review and apply results",
        "body": "As the reviewer, open https://myaccess.microsoft.com > Access reviews. Approve ana with a justification and deny cara ('moved to Sales, no longer in pilot'). Then in the portal choose Stop and Apply on the review instance, because auto-apply otherwise waits for the end date.",
        "cmd": "Get-MgGroupMember -GroupId (Get-MgGroup -Filter \"displayName eq 'CA-Pilot'\").Id | ForEach-Object { (Get-MgUser -UserId $_.Id).UserPrincipalName }",
        "check": "After applying, CA-Pilot contains ana only, and the review history shows each decision with the reviewer and justification."
      },
      {
        "title": "Review a privileged role and write the governance standard",
        "body": "In PIM > Microsoft Entra roles > Access reviews, create a one-off review of Global Administrator and User Administrator assignments and complete it. Then write a one-page privileged access standard: which roles are eligible-only, maximum activation time, approval rules, review cadence and who reviews, and how break-glass is handled.",
        "check": "The role review shows your decisions and the standard names an owner and review date."
      }
    ],
    "verify": [
      "ana was eligible but could not act until activation was approved, and the activation expired after the set duration.",
      "The PIM audit log ties together request, approval and activation for ana.",
      "The group access review removed a denied member automatically after results were applied.",
      "Your before/after inventory shows fewer standing privileged assignments."
    ],
    "deliverable": "A privileged access governance pack: before/after role inventory, PIM role settings screenshots, the activation evidence chain from the audit log, both access review reports (export them from the review's results page), and the one-page privileged access standard.",
    "resume": "Implemented just-in-time privileged access with Microsoft Entra PIM (MFA, approval, justification and time-bound activation), ran group and privileged-role access reviews with auto-applied removals, and produced audit evidence and a privileged access standard.",
    "interview": [
      "What is the difference between eligible and active in PIM? — Eligible users can request the role when needed; active users hold it now. Eligible plus time-limited activation removes standing privilege.",
      "Why do access reviews matter? — Access accumulates as people change jobs; periodic owner or manager re-certification removes what is no longer needed and gives auditors evidence of least privilege.",
      "What should happen if reviewers don't respond? — For sensitive access, remove it (fail closed) and notify; for low-risk access some organizations take recommendations, but the choice should be written policy."
    ],
    "cleanup": [
      "Remove ana's eligibility: PIM > Assignments > Eligible > Remove (or New-MgRoleManagementDirectoryRoleEligibilityScheduleRequest with action 'adminRemove').",
      "Delete the access reviews under Identity governance > Access reviews, and delete the test user dan.",
      "When you finish with the tenant, remove lab users and groups, confirm the P2 trial will not renew, and optionally delete the tenant (Entra admin center > Manage tenants)."
    ],
    "links": [
      {
        "label": "Microsoft Learn: What is Privileged Identity Management?",
        "url": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "label": "Microsoft Learn: Configure Microsoft Entra role settings in PIM",
        "url": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "label": "Microsoft Learn: What are access reviews?",
        "url": "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"
      },
      {
        "label": "Microsoft Learn: Microsoft Entra built-in roles",
        "url": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      }
    ]
  },
  {
    "id": "lab-sentinel-kql",
    "title": "Hunt with KQL and handle an incident in Microsoft Sentinel",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free for about a month if you stay small: new Sentinel workspaces get a 31-day free trial (up to 10 GB/day), Azure Activity data is free to ingest, and you set a 0.5 GB daily cap. After the trial, ingestion and retention are billed, so delete the workspace at the end and set an Azure budget alert first.",
    "summary": "Create a Log Analytics workspace with a daily cap, enable Microsoft Sentinel, connect Azure Activity and Entra ID logs, write KQL hunting queries, build a scheduled analytics rule with entity mapping, trigger it with a harmless test change, investigate and close the incident, then delete everything.",
    "realWorld": "Sentinel is Microsoft's cloud SIEM and SOAR, and KQL is the query language behind Sentinel, Defender XDR advanced hunting and Azure Monitor. SOC analysts triage Sentinel incidents daily, and detection engineers write the analytics rules that raise them. It is the core of the SC-200 exam.",
    "youWillNeed": [
      "An Azure subscription you own (Azure free account or pay-as-you-go) with Owner rights",
      "Azure CLI 2.60+ (az version) on your machine or Azure Cloud Shell",
      "Optional but recommended: the Entra tenant and P2 trial from lab-entra-conditional-access, for sign-in and audit logs"
    ],
    "requires": [
      "lab-splunk-siem"
    ],
    "safety": "Use only your own subscription and tenant. The test change is a network security group that is attached to nothing, so nothing is exposed. Delete the resource group and workspace at the end.",
    "steps": [
      {
        "title": "Set a budget and create the workspace",
        "body": "In the Azure portal open Cost Management > Budgets and create a monthly budget of 5 USD with an email alert at 50%. Then create a resource group and a Log Analytics workspace with a 0.5 GB daily ingestion cap so a noisy source cannot run up a bill.",
        "cmd": "az login\naz group create -n rg-sentinel-lab -l eastus\naz monitor log-analytics workspace create -g rg-sentinel-lab -n law-sentinel-lab -l eastus --retention-time 30\naz monitor log-analytics workspace update -g rg-sentinel-lab -n law-sentinel-lab --quota 0.5\naz monitor log-analytics workspace show -g rg-sentinel-lab -n law-sentinel-lab --query \"{id:id, cap:workspaceCapping.dailyQuotaGb}\"",
        "check": "The workspace shows dailyQuotaGb 0.5, and your budget appears in Cost Management."
      },
      {
        "title": "Enable Microsoft Sentinel",
        "body": "Search for Microsoft Sentinel, choose Create and add it to law-sentinel-lab; the portal shows that the free trial is active. Microsoft is moving Sentinel into the unified Microsoft Defender portal (https://security.microsoft.com); if your tenant opens it there, the same features sit under Microsoft Sentinel and Investigation & response > Hunting.",
        "check": "The Sentinel overview opens for law-sentinel-lab and mentions the free trial."
      },
      {
        "title": "Connect Azure Activity logs",
        "body": "Install the Azure Activity solution from Content hub, then send your subscription's activity log to the workspace with a diagnostic setting. Azure Activity ingestion into Sentinel is free.",
        "cmd": "WS_ID=$(az monitor log-analytics workspace show -g rg-sentinel-lab -n law-sentinel-lab --query id -o tsv)\naz monitor diagnostic-settings subscription create --name sentinel-activity --location eastus --workspace \"$WS_ID\" --logs '[{\"category\":\"Administrative\",\"enabled\":true},{\"category\":\"Security\",\"enabled\":true},{\"category\":\"Policy\",\"enabled\":true}]'\naz monitor diagnostic-settings subscription list --query \"value[].name\"",
        "check": "sentinel-activity is listed, and the Azure Activity connector page turns Connected within about 20 minutes."
      },
      {
        "title": "Connect Entra ID logs (optional, needs P1/P2)",
        "body": "Install the Microsoft Entra ID solution from Content hub, open its connector and tick Sign-In Logs and Audit Logs. Sign in once or twice with your lab users so there is data. Skip this step if you have no Entra P1/P2 trial; the rest of the lab works with Azure Activity alone.",
        "check": "The connector shows Connected and the SigninLogs and AuditLogs tables appear under Logs after 15 to 30 minutes."
      },
      {
        "title": "Learn the KQL pipeline",
        "body": "Open Logs and run these one at a time. KQL reads top to bottom: a table, then filters with where, then shaping with project, summarize and sort. Usage shows which tables cost you data (Quantity is MB).",
        "cmd": "AzureActivity\n| where TimeGenerated > ago(24h)\n| summarize Operations = count() by OperationNameValue, Caller\n| sort by Operations desc\n\nUsage\n| where TimeGenerated > ago(1d)\n| summarize MB = sum(Quantity) by DataType\n| sort by MB desc",
        "check": "The first query lists operations such as MICROSOFT.OPERATIONALINSIGHTS/WORKSPACES/WRITE by your account; Usage shows only a few MB."
      },
      {
        "title": "Write hunting queries",
        "body": "Hunting is proactive: you ask a question of the data instead of waiting for an alert. Save each query under Hunting > Queries > New query with a description and a MITRE ATT&CK tactic. The sign-in queries need step 4.",
        "cmd": "// Failed sign-ins per user and IP (Credential Access, T1110)\nSigninLogs\n| where TimeGenerated > ago(7d) and ResultType != \"0\"\n| summarize Failures = count(), Reasons = make_set(ResultDescription, 5) by UserPrincipalName, IPAddress\n| where Failures >= 3\n| sort by Failures desc\n\n// Break-glass account used (should almost never happen)\nSigninLogs\n| where UserPrincipalName startswith \"bg01@\"\n| project TimeGenerated, IPAddress, AppDisplayName, ResultType\n\n// Who changed network security rules\nAzureActivity\n| where OperationNameValue has \"NETWORKSECURITYGROUPS/SECURITYRULES/WRITE\" and ActivityStatusValue == \"Success\"\n| project TimeGenerated, Caller, CallerIpAddress, ResourceGroup, _ResourceId",
        "check": "Three saved queries appear on the Hunting page with tactics assigned."
      },
      {
        "title": "Build a scheduled analytics rule",
        "body": "Analytics > Create > Scheduled query rule. Name 'Lab - NSG rule created or changed', tactic Defense Evasion, severity Medium. Use the NSG query above, run every 5 minutes with a 1-hour lookback, alert threshold greater than 0. Map entities: Account = Caller, IP = CallerIpAddress, Azure resource = _ResourceId. Keep 'Create incidents' on and group alerts by entity for 5 hours.",
        "check": "The rule is listed under Active rules with status Enabled."
      },
      {
        "title": "Add an automation rule",
        "body": "Automation > Create > Automation rule: when an incident is created by 'Lab - NSG rule created or changed', assign it to yourself, add the tag lab-nsg and set status Active. Automation rules are how SOCs route and enrich incidents without writing playbooks.",
        "check": "The automation rule is listed with order 1 and your analytics rule as its condition."
      },
      {
        "title": "Trigger a benign test incident",
        "body": "Create an NSG that is attached to nothing and add an 'allow RDP from anywhere' rule to it. Activity logs reach the workspace in roughly 5 to 20 minutes, then the rule fires on its next run.",
        "cmd": "az network nsg create -g rg-sentinel-lab -n nsg-detection-test -l eastus\naz network nsg rule create -g rg-sentinel-lab --nsg-name nsg-detection-test -n allow-rdp-any --priority 100 --direction Inbound --access Allow --protocol Tcp --source-address-prefixes '*' --destination-port-ranges 3389\naz network nsg show -g rg-sentinel-lab -n nsg-detection-test --query \"{subnets:subnets, nics:networkInterfaces}\"",
        "check": "The NSG shows no subnets or NICs; within about 30 minutes Incidents shows 'Lab - NSG rule created or changed', assigned to you and tagged lab-nsg."
      },
      {
        "title": "Investigate the incident",
        "body": "Open the incident. Review the entities (your account, your IP, the NSG), open the investigation graph, and run 'Investigate' on the account to see its other activity. Answer: who made the change, from where, is the resource exposed, and was it expected? Add those answers as incident comments with timestamps.",
        "cmd": "AzureActivity\n| where Caller == \"<your UPN from the incident>\" and TimeGenerated > ago(2h)\n| project TimeGenerated, OperationNameValue, ActivityStatusValue, ResourceGroup, CallerIpAddress\n| sort by TimeGenerated asc",
        "check": "Your comments explain the timeline and state that the NSG is attached to nothing."
      },
      {
        "title": "Close with the right classification and tune",
        "body": "Close the incident as 'Benign Positive - suspicious but expected' with a comment. Then tune the rule: change the query to alert only on rules whose source is any/Internet by joining on the NSG's current rules, or add a watchlist of approved change-makers. Record what you changed and why; tuning notes are part of detection engineering.",
        "check": "The incident shows Closed with the classification and your comment, and the rule has a new version note."
      }
    ],
    "verify": [
      "Sentinel is enabled on a workspace with a 0.5 GB daily cap and your budget alert exists.",
      "Azure Activity data (and Entra data if connected) is queryable with KQL.",
      "Your scheduled rule raised an incident with mapped entities and the automation rule assigned and tagged it.",
      "The incident was investigated, commented and closed as Benign Positive."
    ],
    "deliverable": "A SOC detection write-up: architecture (sources, workspace, cap), the saved hunting queries with ATT&CK tactics, the analytics rule logic and entity mapping, screenshots of the incident timeline and investigation graph, your triage comments, the closing classification and the tuning note. Redact subscription and tenant IDs.",
    "resume": "Deployed Microsoft Sentinel with cost controls, connected Azure Activity and Entra ID logs, wrote KQL hunting queries mapped to MITRE ATT&CK, built a scheduled analytics rule with entity mapping and automation, and investigated and classified the resulting incident.",
    "interview": [
      "What is the difference between a hunting query and an analytics rule? — Hunting is analyst-driven and run on demand to test a hypothesis; an analytics rule runs on a schedule and raises alerts and incidents automatically.",
      "Why map entities in an analytics rule? — Entities (account, IP, host, resource) let Sentinel correlate alerts into incidents, power the investigation graph and let automation act on the right object.",
      "How do you control SIEM cost? — Collect only needed sources and tables, use free sources where possible, set daily caps and budgets, choose the right table plan and retention, and monitor the Usage table."
    ],
    "cleanup": [
      "Delete the subscription diagnostic setting: az monitor diagnostic-settings subscription delete --name sentinel-activity",
      "Disconnect the Entra ID connector (it creates a diagnostic setting in Entra ID > Monitoring > Diagnostic settings; delete it there).",
      "Delete everything else: az monitor log-analytics workspace delete -g rg-sentinel-lab -n law-sentinel-lab --force true --yes, then az group delete -n rg-sentinel-lab --yes",
      "Check Cost Management over the next few days to confirm no new charges."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Microsoft Sentinel documentation",
        "url": "https://learn.microsoft.com/en-us/azure/sentinel/"
      },
      {
        "label": "Microsoft Learn: Create scheduled analytics rules",
        "url": "https://learn.microsoft.com/en-us/azure/sentinel/create-analytics-rules"
      },
      {
        "label": "Microsoft Learn: Kusto Query Language overview",
        "url": "https://learn.microsoft.com/en-us/kusto/query/"
      },
      {
        "label": "Microsoft Learn: Microsoft Sentinel pricing and free trial",
        "url": "https://learn.microsoft.com/en-us/azure/sentinel/billing"
      }
    ]
  },
  {
    "id": "lab-defender-asr",
    "title": "Harden Microsoft Defender Antivirus and test attack surface reduction rules",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free (Microsoft Defender Antivirus is built into Windows 11 and Windows Server). The optional Defender for Endpoint portal step needs a trial license.",
    "summary": "On your own Windows VM, check Defender's health, raise cloud protection and PUA blocking, turn on attack surface reduction (ASR) rules, network protection and controlled folder access in audit mode, trigger an ASR audit event with a harmless WMI command and a detection with the EICAR test file, read the event log, then enforce one rule and prove it blocks.",
    "realWorld": "Endpoint administrators roll out Defender settings through Intune or Group Policy, and the safe way to deploy ASR rules is audit first, review the events for business impact, then block. Analysts read the same event IDs and Defender for Endpoint tables during investigations. This workflow maps directly to SC-200 and SC-500 endpoint questions.",
    "youWillNeed": [
      "Your Windows 11 or Windows Server evaluation VM from lab-home-lab, with a clean snapshot",
      "An administrator PowerShell session on that VM",
      "Internet access for signature updates and the EICAR download"
    ],
    "requires": [
      "lab-windows-hardening"
    ],
    "safety": "Work on your own lab VM and take a snapshot first. EICAR is an industry-standard test file, not malware; download it only from eicar.org. Do not add exclusions or disable protection on any real machine.",
    "steps": [
      {
        "title": "Snapshot and check Defender's health",
        "body": "Take a VM snapshot named pre-defender. Then confirm Defender is the active antivirus with real-time protection and tamper protection on, and update signatures.",
        "cmd": "Get-MpComputerStatus | Select-Object AMRunningMode, AntivirusEnabled, RealTimeProtectionEnabled, IsTamperProtected, AMProductVersion, AntivirusSignatureLastUpdated\nUpdate-MpSignature\nGet-MpComputerStatus | Select-Object AntivirusSignatureVersion, AntivirusSignatureLastUpdated",
        "check": "AMRunningMode is Normal, RealTimeProtectionEnabled and IsTamperProtected are True, and the signature date is today."
      },
      {
        "title": "Record the current configuration",
        "body": "Save the baseline so you can show before and after. Pay attention to exclusions: attackers and careless admins both love broad exclusions.",
        "cmd": "New-Item -ItemType Directory C:\\Lab -Force | Out-Null\nGet-MpPreference | Select-Object PUAProtection, MAPSReporting, SubmitSamplesConsent, CloudBlockLevel, CloudExtendedTimeout, EnableNetworkProtection, EnableControlledFolderAccess, ExclusionPath, ExclusionProcess, AttackSurfaceReductionRules_Ids, AttackSurfaceReductionRules_Actions | Format-List | Out-File C:\\Lab\\defender-before.txt\nGet-Content C:\\Lab\\defender-before.txt",
        "check": "defender-before.txt exists; note any exclusions and which ASR rules (if any) are set."
      },
      {
        "title": "Raise cloud protection and block PUAs",
        "body": "Cloud-delivered protection lets Defender ask Microsoft's cloud about new files; a higher block level and a longer check timeout catch more. Potentially unwanted applications (adware, bundlers) are blocked with PUAProtection. These map to the same settings in Intune's Antivirus policy and Group Policy.",
        "cmd": "Set-MpPreference -MAPSReporting Advanced -SubmitSamplesConsent SendSafeSamples -CloudBlockLevel High -CloudExtendedTimeout 50 -PUAProtection Enabled\nGet-MpPreference | Select-Object MAPSReporting, SubmitSamplesConsent, CloudBlockLevel, CloudExtendedTimeout, PUAProtection",
        "check": "MAPSReporting 2, SubmitSamplesConsent 1, CloudBlockLevel 2, CloudExtendedTimeout 50, PUAProtection 1."
      },
      {
        "title": "Enable ASR rules in audit mode",
        "body": "Each ASR rule has a GUID. Audit mode logs what would have been blocked without breaking anything. These five are common first-wave rules: Office child processes, LSASS credential stealing, obfuscated scripts, process creation from PSExec and WMI, and WMI event subscription persistence.",
        "cmd": "$rules = @(\"d4f940ab-401b-4efc-aadc-ad5f3c50688a\",\"9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2\",\"5beb7efe-fd9a-4556-801d-275e5ffc04cc\",\"d1e49aac-8f56-4280-b9ba-993a6d77406c\",\"e6db77e5-3df2-4cf1-b95a-636979351e5b\")\nforeach ($r in $rules) { Add-MpPreference -AttackSurfaceReductionRules_Ids $r -AttackSurfaceReductionRules_Actions AuditMode }\n$p = Get-MpPreference; for ($i=0; $i -lt $p.AttackSurfaceReductionRules_Ids.Count; $i++) { \"{0}  {1}\" -f $p.AttackSurfaceReductionRules_Ids[$i], $p.AttackSurfaceReductionRules_Actions[$i] }",
        "check": "All five GUIDs list with action 2 (audit)."
      },
      {
        "title": "Network protection and controlled folder access in audit",
        "body": "Network protection blocks connections to known-bad domains for every process, not just the browser; controlled folder access stops untrusted apps writing to Documents and other protected folders, a ransomware control. Audit both first.",
        "cmd": "Set-MpPreference -EnableNetworkProtection AuditMode\nSet-MpPreference -EnableControlledFolderAccess AuditMode\nGet-MpPreference | Select-Object EnableNetworkProtection, EnableControlledFolderAccess",
        "check": "Both values are 2 (audit mode)."
      },
      {
        "title": "Trigger an ASR audit event safely",
        "body": "Starting a process through WMI is a common lateral-movement technique and exactly what rule d1e49aac watches. Launching Notepad this way is harmless.",
        "cmd": "Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = \"notepad.exe\" }\nStart-Sleep 5\nGet-WinEvent -LogName \"Microsoft-Windows-Windows Defender/Operational\" -FilterXPath \"*[System[(EventID=1121 or EventID=1122)]]\" -MaxEvents 5 | Format-List TimeCreated, Id, Message",
        "check": "Notepad opens and an event 1122 (audited) names rule d1e49aac-8f56-4280-b9ba-993a6d77406c. Close Notepad."
      },
      {
        "title": "Test detection with the EICAR file",
        "body": "Open https://www.eicar.org, go to the anti-malware test file download page and download eicar.com.txt in Edge. Defender should block and quarantine it. EICAR is a harmless string every antivirus agrees to detect so admins can test the pipeline.",
        "cmd": "Get-MpThreatDetection | Sort-Object InitialDetectionTime -Descending | Select-Object -First 3 ThreatID, ActionSuccess, InitialDetectionTime, Resources\nGet-MpThreat | Select-Object ThreatName, SeverityID, IsActive\nGet-WinEvent -LogName \"Microsoft-Windows-Windows Defender/Operational\" -FilterXPath \"*[System[(EventID=1116 or EventID=1117)]]\" -MaxEvents 4 | Format-List TimeCreated, Id, Message",
        "check": "A detection named like Virus:DOS/EICAR_Test_File shows with ActionSuccess True, with events 1116 (detected) and 1117 (action taken)."
      },
      {
        "title": "Review audit data like a rollout owner",
        "body": "In a real rollout you would collect audit events from all devices for two to four weeks and look for business apps that would break. Summarize what you have so far, and check event 5007, which records every Defender configuration change (useful for spotting tampering).",
        "cmd": "Get-WinEvent -LogName \"Microsoft-Windows-Windows Defender/Operational\" | Where-Object { $_.Id -in 1122,1124,1126 } | Group-Object Id | Select-Object Name, Count\nGet-WinEvent -LogName \"Microsoft-Windows-Windows Defender/Operational\" -FilterXPath \"*[System[(EventID=5007)]]\" -MaxEvents 5 | Format-List TimeCreated, Message",
        "check": "You see counts for audit events and 5007 entries for the settings you changed."
      },
      {
        "title": "Enforce one rule and prove it blocks",
        "body": "Move the WMI/PSExec rule to block mode and repeat the test. A blocked ASR action logs event 1121 and shows a Windows Security notification.",
        "cmd": "Add-MpPreference -AttackSurfaceReductionRules_Ids d1e49aac-8f56-4280-b9ba-993a6d77406c -AttackSurfaceReductionRules_Actions Enabled\nInvoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = \"notepad.exe\" }\nStart-Sleep 5\nGet-WinEvent -LogName \"Microsoft-Windows-Windows Defender/Operational\" -FilterXPath \"*[System[(EventID=1121)]]\" -MaxEvents 2 | Format-List TimeCreated, Message",
        "check": "Notepad does not start (the call returns a non-zero ReturnValue or no process appears) and event 1121 records the block."
      },
      {
        "title": "Run scans and save the after state",
        "body": "Run a quick scan, check the protection history in Windows Security, and save the new configuration for your report.",
        "cmd": "Start-MpScan -ScanType QuickScan\nGet-MpComputerStatus | Select-Object QuickScanEndTime, QuickScanAge\nGet-MpPreference | Select-Object PUAProtection, MAPSReporting, CloudBlockLevel, EnableNetworkProtection, EnableControlledFolderAccess, AttackSurfaceReductionRules_Ids, AttackSurfaceReductionRules_Actions | Format-List | Out-File C:\\Lab\\defender-after.txt\nCompare-Object (Get-Content C:\\Lab\\defender-before.txt) (Get-Content C:\\Lab\\defender-after.txt)",
        "check": "QuickScanAge is 0 and the comparison shows your changes."
      },
      {
        "title": "Optional: see it in Defender for Endpoint",
        "body": "If you have a Defender for Endpoint or Defender for Business trial, onboard the VM with the local script from Settings > Endpoints > Onboarding, repeat steps 6 and 7, and run this in Advanced hunting at https://security.microsoft.com. The same query structure works in Sentinel when Defender XDR data is connected.",
        "cmd": "DeviceEvents\n| where Timestamp > ago(1d)\n| where ActionType startswith \"Asr\" or ActionType == \"AntivirusDetection\"\n| project Timestamp, DeviceName, ActionType, FileName, InitiatingProcessFileName, AdditionalFields",
        "check": "AsrPsexecWmiChildProcessAudited, AsrPsexecWmiChildProcessBlocked and AntivirusDetection rows appear for your VM."
      }
    ],
    "verify": [
      "Cloud protection, PUA blocking and five ASR rules are configured, with before/after files to prove it.",
      "The WMI test produced event 1122 in audit mode and event 1121 once the rule was enforced.",
      "EICAR was detected and quarantined, with events 1116 and 1117.",
      "You can name the event ID for detection, action, ASR block, ASR audit and configuration change."
    ],
    "deliverable": "An endpoint hardening change record: baseline and after configuration, the list of ASR rules with GUIDs and chosen mode, the audit-to-block rollout plan (pilot group, audit period, exception process), screenshots of events 1122, 1121, 1116/1117 and the Windows Security notification, and how each setting maps to an Intune Endpoint security policy.",
    "resume": "Hardened Microsoft Defender Antivirus on Windows with high cloud protection, PUA blocking and attack surface reduction rules, validated them with audit-mode events, EICAR and a controlled WMI test, and documented an audit-first rollout plan.",
    "interview": [
      "Why deploy ASR rules in audit mode first? — Some rules block legitimate business apps or scripts; audit shows the impact so you can add targeted exclusions before blocking.",
      "What is EICAR used for? — It is a harmless standard test string that antivirus products detect, so you can test detection, alerting and quarantine without real malware.",
      "What does Defender event 5007 tell you? — A Defender configuration change; unexpected 5007 events can indicate tampering such as someone adding exclusions or turning protections off."
    ],
    "cleanup": [
      "Revert the VM to the pre-defender snapshot, or keep the hardened settings if this is a lab VM you reuse.",
      "If you onboarded to Defender for Endpoint, run the offboarding script from the portal and let the trial lapse.",
      "Delete C:\\Lab\\ files you no longer need after saving evidence."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Attack surface reduction rules reference",
        "url": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      },
      {
        "label": "Microsoft Learn: Set-MpPreference",
        "url": "https://learn.microsoft.com/en-us/powershell/module/defender/set-mppreference"
      },
      {
        "label": "Microsoft Learn: Review event logs and error codes for Microsoft Defender Antivirus",
        "url": "https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-microsoft-defender-antivirus"
      },
      {
        "label": "EICAR anti-malware test file",
        "url": "https://www.eicar.org/download-anti-malware-testfile/"
      }
    ]
  },
  {
    "id": "lab-azure-security-baseline",
    "title": "Build an Azure security baseline: Key Vault, managed identity, NSGs, Defender for Cloud and Policy",
    "track": "GRC & architecture",
    "level": "Intermediate",
    "minutes": 210,
    "cost": "Low cost: an Azure free account covers a Standard_B1s VM (free-tier hours for eligible accounts) and Key Vault operations cost fractions of a cent. Use only the free Foundational CSPM tier of Defender for Cloud; do not enable paid Defender plans. Set a budget alert first and delete the resource group the same day.",
    "summary": "Create a Key Vault with RBAC and a network firewall, give a VM with no public IP a managed identity that reads a secret without any stored credentials, lock the network down with an NSG and a service endpoint, review Defender for Cloud's free recommendations and secure score, enforce an Azure Policy, add a resource lock, then clean up.",
    "realWorld": "Cloud security engineers spend their days on this baseline: no secrets in code, workloads authenticating with managed identities, network access restricted by default, posture measured by Defender for Cloud, and guard-rails enforced by Azure Policy. It is the practical core of SC-500 (formerly AZ-500) and a common take-home task in cloud security interviews.",
    "youWillNeed": [
      "An Azure subscription you own (Azure free account recommended) with Owner rights",
      "Azure CLI 2.60+ locally or in Azure Cloud Shell (Bash)",
      "Your public IP address (curl -s https://api.ipify.org)"
    ],
    "requires": [
      "lab-cloud-iam"
    ],
    "safety": "Use only your own subscription. The VM gets no public IP and no inbound rules, and the Key Vault is locked to your IP and the VM's subnet. Delete everything at the end; Key Vaults stay soft-deleted until purged.",
    "steps": [
      {
        "title": "Set a budget and variables",
        "body": "In the portal create a Cost Management budget of 5 USD with an email alert at 50%. Then set shell variables; the Key Vault name must be globally unique.",
        "cmd": "az login\naz account show --query \"{sub:name, id:id, user:user.name}\"\nRG=rg-secbase; LOC=eastus; KV=kv-secbase-$RANDOM; MYIP=$(curl -s https://api.ipify.org)\necho $KV $MYIP\naz group create -n $RG -l $LOC",
        "check": "The resource group is created and $KV and $MYIP print."
      },
      {
        "title": "Create a Key Vault with RBAC and a firewall",
        "body": "Azure RBAC authorization (instead of legacy access policies) keeps vault permissions in the same model as everything else. Default-deny networking with your IP allowed means only you and approved networks can reach the vault. Short soft-delete retention and no purge protection keep the lab easy to clean up; in production you would turn purge protection on.",
        "cmd": "az keyvault create -n $KV -g $RG -l $LOC --enable-rbac-authorization true --retention-days 7 --default-action Deny --bypass AzureServices\naz keyvault network-rule add -n $KV -g $RG --ip-address $MYIP/32\nME=$(az ad signed-in-user show --query id -o tsv); KV_ID=$(az keyvault show -n $KV --query id -o tsv)\naz role assignment create --role \"Key Vault Secrets Officer\" --assignee-object-id $ME --assignee-principal-type User --scope $KV_ID\nsleep 60; az keyvault secret set --vault-name $KV -n db-password --value \"Lab-$(openssl rand -hex 12)\" --query id",
        "check": "The secret ID prints. (If you get Forbidden, wait a minute for the role assignment to propagate and retry.)"
      },
      {
        "title": "Build a private network and a locked-down NSG",
        "body": "Create a VNet and subnet with an NSG that has no inbound allow rules, and enable the Microsoft.KeyVault service endpoint so the subnet can reach the vault over the Azure backbone.",
        "cmd": "az network nsg create -g $RG -n nsg-app\naz network vnet create -g $RG -n vnet-app --address-prefix 10.50.0.0/16 --subnet-name snet-app --subnet-prefixes 10.50.1.0/24\naz network vnet subnet update -g $RG --vnet-name vnet-app -n snet-app --network-security-group nsg-app --service-endpoints Microsoft.KeyVault\naz network nsg rule list -g $RG --nsg-name nsg-app --include-default -o table",
        "check": "Only the default rules exist; DenyAllInBound (65500) is the effective inbound policy apart from VNet and load balancer traffic."
      },
      {
        "title": "Create a VM with a managed identity and no public IP",
        "body": "A system-assigned managed identity gives the VM an Entra ID identity whose credentials Azure rotates for you, so no secret is stored on the machine. No public IP means it cannot be reached from the internet at all.",
        "cmd": "az vm create -g $RG -n vm-app --image Ubuntu2404 --size Standard_B1s --vnet-name vnet-app --subnet snet-app --public-ip-address \"\" --nsg \"\" --assign-identity --admin-username azureuser --generate-ssh-keys\nVM_MI=$(az vm show -g $RG -n vm-app --query identity.principalId -o tsv); echo $VM_MI",
        "check": "The VM is created without a publicIpAddress and a principal ID prints."
      },
      {
        "title": "Grant least privilege to the identity",
        "body": "Let the VM read secrets from this vault only, and let the vault accept traffic from the VM's subnet.",
        "cmd": "az role assignment create --role \"Key Vault Secrets User\" --assignee-object-id $VM_MI --assignee-principal-type ServicePrincipal --scope $KV_ID\nSUBNET_ID=$(az network vnet subnet show -g $RG --vnet-name vnet-app -n snet-app --query id -o tsv)\naz keyvault network-rule add -n $KV -g $RG --subnet $SUBNET_ID\naz keyvault network-rule list -n $KV -g $RG",
        "check": "The role assignment is created at the vault scope and the network rules list your IP and the subnet."
      },
      {
        "title": "Read the secret from the VM with no stored credentials",
        "body": "Run a script through the VM agent (no SSH needed). It asks the instance metadata service for a token for Key Vault, then reads the secret with it. This is exactly how apps should get secrets.",
        "cmd": "az vm run-command invoke -g $RG -n vm-app --command-id RunShellScript --scripts \"TOKEN=\\$(curl -s -H Metadata:true 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://vault.azure.net' | python3 -c 'import sys,json;print(json.load(sys.stdin)[\\\"access_token\\\"])'); curl -s -H \\\"Authorization: Bearer \\$TOKEN\\\" 'https://$KV.vault.azure.net/secrets/db-password?api-version=7.4' | python3 -c 'import sys,json;print(\\\"secret length:\\\", len(json.load(sys.stdin)[\\\"value\\\"]))'\" --query \"value[0].message\" -o tsv",
        "check": "The output shows 'secret length: 29' (or similar) and no error. Printing only the length keeps the secret out of logs."
      },
      {
        "title": "Prove the controls work",
        "body": "Remove your IP from the vault firewall and try to read the secret from your machine; then put it back. A control you have not seen fail is a control you have not tested.",
        "cmd": "az keyvault network-rule remove -n $KV -g $RG --ip-address $MYIP/32\nsleep 30; az keyvault secret show --vault-name $KV -n db-password --query id\naz keyvault network-rule add -n $KV -g $RG --ip-address $MYIP/32",
        "check": "The read fails with a Forbidden error mentioning the client address is not authorized, and works again after re-adding the rule."
      },
      {
        "title": "Review Defender for Cloud recommendations and secure score",
        "body": "Foundational CSPM is free and on by default. Confirm you are not paying for Defender plans, then read the recommendations; new resources can take several hours to be assessed, so come back later if the list is short.",
        "cmd": "az security pricing list --query \"value[].{plan:name, tier:pricingTier}\" -o table\naz security secure-scores list --query \"[].{name:displayName, current:score.current, max:score.max}\" -o table\naz security assessment list --query \"[?status.code=='Unhealthy'].{rec:displayName, resource:resourceDetails.Id}\" -o table",
        "check": "Every plan shows Free, a secure score prints, and you can list unhealthy recommendations (for example about VM disk encryption or Key Vault private link)."
      },
      {
        "title": "Enforce guard-rails with Azure Policy",
        "body": "Assign the built-in 'Allowed locations' policy to the resource group so resources can only be created in your chosen region, then prove it denies a resource elsewhere. Policy is preventive; Defender for Cloud is detective.",
        "cmd": "RG_ID=$(az group show -n $RG --query id -o tsv)\nDEF=$(az policy definition list --query \"[?displayName=='Allowed locations'].name\" -o tsv)\naz policy assignment create --name allowed-locations --scope $RG_ID --policy $DEF --params \"{\\\"listOfAllowedLocations\\\":{\\\"value\\\":[\\\"$LOC\\\"]}}\"\nsleep 120; az network nsg create -g $RG -n nsg-wrong-region -l westeurope",
        "check": "The last command fails with RequestDisallowedByPolicy naming allowed-locations."
      },
      {
        "title": "Check compliance and add a resource lock",
        "body": "Trigger a compliance scan and read the summary, then add a CanNotDelete lock so the baseline cannot be deleted by accident. Try to delete the NSG to see the lock work.",
        "cmd": "az policy state trigger-scan --resource-group $RG\naz policy state summarize --resource-group $RG --query \"results.{nonCompliantResources:nonCompliantResources, nonCompliantPolicies:nonCompliantPolicies}\"\naz lock create --name baseline-nodelete --lock-type CanNotDelete -g $RG\naz network nsg delete -g $RG -n nsg-app",
        "check": "The summary returns numbers, and the NSG delete fails with ScopeLocked."
      },
      {
        "title": "Review the activity log and write the baseline",
        "body": "Every control change you made is in the activity log. Then write a one-page Azure security baseline: identity (RBAC, managed identity), secrets (Key Vault settings), network (no public IPs, NSG, service endpoints), posture (Defender for Cloud), and guard-rails (Policy, locks).",
        "cmd": "az monitor activity-log list -g $RG --offset 4h --query \"[].{time:eventTimestamp, op:operationName.localizedValue, by:caller, status:status.value}\" -o table",
        "check": "You see role assignments, policy assignment, lock creation and the denied operations."
      }
    ],
    "verify": [
      "The VM read a Key Vault secret using only its managed identity, with no credentials stored on it.",
      "The vault refused access when your IP was removed from its firewall.",
      "Azure Policy denied a resource in a disallowed region and the lock blocked a delete.",
      "Defender for Cloud showed a secure score and recommendations with all plans on Free."
    ],
    "deliverable": "An Azure security baseline document with an architecture diagram (VNet, subnet, NSG, VM with managed identity, Key Vault with firewall), the commands used, evidence screenshots for each control (success and denial), the Defender for Cloud recommendation list with your remediation priorities, and the one-page baseline standard. Redact subscription IDs.",
    "resume": "Built an Azure security baseline with RBAC-authorized Key Vault behind a network firewall, credential-free secret access via managed identity, default-deny NSGs, Defender for Cloud posture review and Azure Policy guard-rails, and verified each control by testing its denial path.",
    "interview": [
      "Why use a managed identity instead of a service principal secret? — Azure issues and rotates the credential automatically and it never appears in code or config, removing a whole class of secret-leak incidents.",
      "What is the difference between Azure Policy and Azure RBAC? — RBAC controls who can do what; Policy controls what resources and settings are allowed regardless of who does it.",
      "What does Key Vault soft delete and purge protection do? — Soft delete keeps deleted vaults and secrets recoverable for a retention period; purge protection stops anyone from permanently purging them before that period ends, protecting against malicious deletion."
    ],
    "cleanup": [
      "Remove the lock: az lock delete --name baseline-nodelete -g rg-secbase",
      "Remove the policy assignment: az policy assignment delete --name allowed-locations --scope $(az group show -n rg-secbase --query id -o tsv)",
      "Delete the group: az group delete -n rg-secbase --yes, then purge the vault: az keyvault purge -n <your vault name>",
      "Check Cost Management the next day and confirm no Defender plan was switched to Standard."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Azure Key Vault security features",
        "url": "https://learn.microsoft.com/en-us/azure/key-vault/general/security-features"
      },
      {
        "label": "Microsoft Learn: What are managed identities for Azure resources?",
        "url": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "label": "Microsoft Learn: Microsoft Defender for Cloud documentation",
        "url": "https://learn.microsoft.com/en-us/azure/defender-for-cloud/"
      },
      {
        "label": "Microsoft Learn: What is Azure Policy?",
        "url": "https://learn.microsoft.com/en-us/azure/governance/policy/overview"
      }
    ]
  },
  {
    "id": "lab-ngfw-policy",
    "title": "Design next-generation firewall policy with OPNsense and map it to PAN-OS and FortiOS",
    "track": "Blue team",
    "level": "Advanced",
    "minutes": 270,
    "cost": "Free (OPNsense Community Edition, the Zenarmor Free edition plugin and Suricata with the free ET Open rules)",
    "summary": "Build a three-zone OPNsense firewall (WAN, LAN, DMZ), write zone-based rules with aliases, add application and web-category control with Zenarmor, run Suricata as an inline IPS with a benign test signature, study how TLS inspection works, and translate every object you built into Palo Alto PAN-OS and Fortinet FortiOS terms.",
    "realWorld": "Firewall engineers at most companies run Palo Alto or Fortinet next-generation firewalls, where policy is written by zone, application and URL category with security profiles attached, not just by port. OPNsense lets you practise the same ideas for free, and being able to translate between vendors is a skill employers value when they migrate or run mixed estates.",
    "youWillNeed": [
      "OPNsense Community Edition DVD/ISO image from opnsense.org (take the current release from the download page)",
      "VirtualBox with an OPNsense VM: 2 vCPU, 4 GB RAM (Zenarmor needs it), 20 GB disk, three adapters: NAT (WAN), internal network 'lan', internal network 'dmz'",
      "Your Ubuntu desktop VM from lab-home-lab on the 'lan' network and a second Ubuntu VM on the 'dmz' network"
    ],
    "requires": [
      "lab-firewall-pfsense"
    ],
    "safety": "Keep the firewall and all clients inside your own lab networks. The IPS test uses a harmless test page designed to trigger a signature; do not test security profiles against sites or systems you do not own.",
    "steps": [
      {
        "title": "Install OPNsense and assign three interfaces",
        "body": "Boot the ISO, log in as installer (password opnsense) and install to disk. After reboot, use console option 1 to assign em0 = WAN, em1 = LAN, em2 = OPT1; then option 2 to set LAN 10.10.10.1/24 with DHCP 10.10.10.100-199 and OPT1 10.10.20.1/24 with DHCP 10.10.20.100-199. Log in to https://10.10.10.1 from the LAN client (user root) and finish the wizard; rename OPT1 to DMZ under Interfaces > [OPT1] and tick Enable.",
        "check": "The dashboard shows WAN with a 10.0.2.x address and LAN and DMZ up; both Ubuntu VMs get DHCP addresses in their subnets."
      },
      {
        "title": "Plan zones and policy on paper first",
        "body": "Write a policy matrix before clicking. Zones: untrust (WAN), trust (LAN), dmz. Intended flows: trust to untrust for web and DNS via the firewall; trust to dmz for SSH and HTTP to one server; dmz to trust nothing; dmz to untrust only updates; everything else denied and logged. In PAN-OS these are security zones and a rulebase ending in a deny; in FortiOS they are interfaces or zones used as srcintf/dstintf in firewall policies with an implicit deny.",
        "check": "You have a table of source zone, destination zone, application/service, action and log for every flow."
      },
      {
        "title": "Create aliases (address and service objects)",
        "body": "Firewall > Aliases. Create: dmz_web (Host, the DMZ server's IP), rfc1918 (Network: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), web_ports (Port: 80, 443), and admin_ports (Port: 22). PAN-OS calls these address objects and service objects; FortiOS calls them firewall addresses and custom services.",
        "check": "All four aliases list under Firewall > Aliases and resolve (the magnifier icon shows their contents)."
      },
      {
        "title": "Write the zone-based rules",
        "body": "OPNsense rules are applied on the interface where traffic enters. On LAN: allow LAN net to This Firewall port 53 (DNS); allow LAN net to dmz_web on web_ports and admin_ports; allow LAN net to !rfc1918 on web_ports (internet web only); then delete or disable the default 'allow LAN to any' rules. On DMZ: allow DMZ net to This Firewall port 53; allow DMZ net to !rfc1918 on web_ports; block DMZ net to any with logging on. Tick Log on every rule and add a description.",
        "check": "Firewall > Rules > LAN and > DMZ show your rules in the planned order, with no any-any allow left."
      },
      {
        "title": "Test the policy from both zones",
        "body": "Run these from the LAN client, replacing 10.10.20.100 with the DMZ server's address (start a web server there with: sudo apt install -y nginx). Then from the DMZ server try to reach the LAN client.",
        "cmd": "# On the LAN client\ncurl -sI http://10.10.20.100 | head -1\nnc -zv -w 3 10.10.20.100 22\nnc -zv -w 3 10.10.20.100 3306\ncurl -sI https://www.debian.org | head -1\n# On the DMZ server\nping -c 2 -W 2 10.10.10.100",
        "check": "HTTP, SSH and internet HTTPS succeed; port 3306 and the DMZ-to-LAN ping time out."
      },
      {
        "title": "Read logs and hit counts",
        "body": "Firewall > Log Files > Live View shows each allow and block with the rule description. From the console (option 8 for a shell) list the loaded rules with their evaluation counters; unused rules and shadowed rules are what firewall reviews look for. PAN-OS shows this as rule hit count in the Policy Optimizer; FortiOS shows hit count and last used per policy.",
        "cmd": "pfctl -vvsr | head -60\npfctl -ss | head -20",
        "check": "Live View shows your blocked 3306 attempt with the LAN rule set, and pfctl shows non-zero Evaluations for rules you tested."
      },
      {
        "title": "Install Zenarmor for application and web control",
        "body": "System > Firmware > Plugins, install os-sensei (Zenarmor), then run its setup wizard from the new Zenarmor menu: choose the built-in local database, protect the LAN interface in routed mode, and register the Free edition. Free covers basic application and web-category control; if a feature shows a paid lock, note it and move on.",
        "check": "Zenarmor > Dashboard shows live sessions from the LAN client with application names such as HTTPS or DNS."
      },
      {
        "title": "Add an application rule and a web-category rule",
        "body": "In Zenarmor > Policies > Default, under App Controls block one application category (for example Games or Peer to Peer), and under Web Controls block a category such as Gambling. Browse from the LAN client to a site in each category, then check Zenarmor's Live Sessions and Reports for the blocks. This is the equivalent of a PAN-OS security rule that uses App-ID in the Application column with a URL Filtering profile, or a FortiOS policy with Application Control and Web Filter profiles.",
        "check": "The blocked site does not load and Zenarmor reports show the block with the category name."
      },
      {
        "title": "Turn on Suricata IPS and test with a benign signature",
        "body": "Services > Intrusion Detection > Administration: enable, IPS mode, Pattern matcher Hyperscan (or Aho-Corasick), interface WAN; under Download enable ET open/emerging-attack_response and download. Set that ruleset's action to Drop (Policies tab or rule adjustments). Then request the harmless testmynids.org page, which returns the text 'uid=0(root)', from the LAN client. On some virtual NICs IPS mode needs hardware offloading turned off in Interfaces > Settings.",
        "cmd": "curl -s http://testmynids.org/uid/index.html",
        "check": "Services > Intrusion Detection > Alerts shows 'GPL ATTACK_RESPONSE id check returned root' with action drop, and the curl returns nothing or times out."
      },
      {
        "title": "Understand TLS inspection without breaking anything",
        "body": "Zenarmor and Suricata only see TLS metadata (SNI, certificates, JA3/JA4 fingerprints), not content. Full inspection needs a forward proxy that re-signs certificates with a CA the clients trust. Check what your client sees today, then read PAN-OS 'SSL Forward Proxy' decryption policies (Forward Trust certificate, no-decrypt rules for banking and health) and FortiOS SSL/SSH inspection profiles ('certificate-inspection' vs 'deep-inspection'). Write down the privacy, legal and certificate-pinning issues you would raise before enabling it.",
        "cmd": "openssl s_client -connect www.debian.org:443 -servername www.debian.org </dev/null 2>/dev/null | openssl x509 -noout -issuer -subject",
        "check": "The issuer is a public CA; you can explain that with deep inspection it would be your firewall's CA instead."
      },
      {
        "title": "Translate your policy into PAN-OS and FortiOS",
        "body": "For each OPNsense rule, write the equivalent in both vendors. Example PAN-OS: rule trust-to-dmz-web, from zone trust, to zone dmz, destination dmz_web, application web-browsing and ssl and ssh, service application-default, action allow, profile group with antivirus, anti-spyware, vulnerability protection, URL filtering and file blocking, log at session end. Example FortiOS: config firewall policy, set srcintf lan, set dstintf dmz, set srcaddr lan-net, set dstaddr dmz_web, set service HTTP HTTPS SSH, set action accept, set utm-status enable, set av-profile, webfilter-profile, application-list and ips-sensor, set ssl-ssh-profile certificate-inspection, set logtraffic all.",
        "check": "Your translation table covers every rule, NAT, alias, Zenarmor policy and the Suricata policy, with the matching PAN-OS and FortiOS object names."
      },
      {
        "title": "Back up and review the configuration",
        "body": "System > Configuration > Backups > Download configuration (encrypt it with a password). Review it like an auditor: no any-any rules, every rule logged and described, admin GUI only reachable from LAN, default passwords changed. Note two improvements you would make.",
        "check": "You have an encrypted config.xml backup and a short review list."
      }
    ],
    "verify": [
      "Allowed and denied flows between trust, dmz and untrust match your policy matrix, with log entries for each.",
      "Zenarmor blocked an application category and a web category from the LAN client.",
      "Suricata in IPS mode dropped the testmynids.org response and logged the alert.",
      "Your translation table maps every rule and profile to PAN-OS and FortiOS terms."
    ],
    "deliverable": "An NGFW policy design pack: network diagram with zones, the policy matrix, rule screenshots, test results (allowed and blocked), Zenarmor and Suricata evidence, the TLS inspection decision note, and the OPNsense-to-PAN-OS-to-FortiOS translation table.",
    "resume": "Designed and tested a zone-based next-generation firewall policy on OPNsense with application and web-category control (Zenarmor) and inline IPS (Suricata), and translated the rulebase and security profiles into Palo Alto PAN-OS and Fortinet FortiOS equivalents.",
    "interview": [
      "What makes a firewall 'next-generation'? — It identifies applications and users regardless of port, applies content inspection (IPS, antivirus, URL filtering) to allowed traffic and can decrypt TLS, rather than only matching IPs and ports.",
      "Why use 'application-default' as the service in PAN-OS? — It allows an application only on its standard ports, so an app cannot be tunnelled over an unusual port to slip past the rule.",
      "What are the risks of TLS decryption? — Privacy and legal issues, broken certificate-pinned apps, CA key protection and performance cost; you exclude sensitive categories and document the policy."
    ],
    "cleanup": [
      "Keep the OPNsense VM for lab-ipsec-site-to-site, or power it off and delete it.",
      "Disable IPS mode if you leave the VM running on a low-memory host.",
      "Store the encrypted config backup with your portfolio notes, not in a public repository."
    ],
    "links": [
      {
        "label": "OPNsense documentation: Rules",
        "url": "https://docs.opnsense.org/manual/firewall.html"
      },
      {
        "label": "OPNsense documentation: Intrusion Prevention System",
        "url": "https://docs.opnsense.org/manual/ips.html"
      },
      {
        "label": "Palo Alto Networks: Security policy (PAN-OS Administrator's Guide)",
        "url": "https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-policy"
      },
      {
        "label": "Fortinet Document Library: FortiGate / FortiOS",
        "url": "https://docs.fortinet.com/product/fortigate/"
      }
    ]
  },
  {
    "id": "lab-ipsec-site-to-site",
    "title": "Build a site-to-site IPsec VPN with security profiles on OPNsense",
    "track": "Blue team",
    "level": "Advanced",
    "minutes": 240,
    "cost": "Free (two OPNsense Community Edition VMs). Optional: a FortiGate-VM permanent trial from a free Fortinet account, which has tight limits on interfaces, policies and routes.",
    "summary": "Connect two lab sites with a policy-based IKEv2 IPsec tunnel between two OPNsense firewalls, choose strong proposals, restrict what may cross the tunnel with firewall rules, inspect tunnel traffic with Suricata, break and fix the tunnel from the logs, and map the whole build to FortiOS phase1/phase2 and PAN-OS IKE gateway terms.",
    "realWorld": "Branch offices, data centres and cloud VPCs are still joined with IPsec every day, and firewall engineers are the ones who negotiate proposals with partners, troubleshoot tunnels that will not come up and make sure the tunnel is not an open door. Fortinet NSE 4 has a full VPN domain and PAN-OS engineers configure IKE gateways and tunnel interfaces constantly.",
    "youWillNeed": [
      "Two OPNsense VMs (clone the one from lab-ngfw-policy, or install fresh): 1 vCPU, 2 GB RAM each",
      "VirtualBox internal networks 'transit' (the fake internet between sites), 'site-a' and 'site-b'",
      "Two small Ubuntu VMs, one in each site LAN (linked clones of your base Ubuntu VM)"
    ],
    "requires": [
      "lab-ngfw-policy",
      "lab-wireguard-vpn"
    ],
    "safety": "Everything stays on internal VirtualBox networks. Generate a new random pre-shared key for the lab, use it nowhere else, and never paste real partner VPN keys into notes or screenshots.",
    "steps": [
      {
        "title": "Build the two-site topology",
        "body": "Site A firewall: WAN on 'transit' 172.31.0.1/24, LAN on 'site-a' 192.168.10.1/24. Site B firewall: WAN on 'transit' 172.31.0.2/24, LAN on 'site-b' 192.168.20.1/24. Set addresses at the console (option 2), with DHCP on each LAN. Because transit uses a private range, untick 'Block private networks' on each WAN (Interfaces > [WAN]).",
        "check": "From Site A's console shell (option 8), ping -c 2 172.31.0.2 succeeds, and each Ubuntu VM has an address in its site LAN."
      },
      {
        "title": "Allow IKE and ESP on the WAN",
        "body": "OPNsense normally adds automatic rules for IPsec, but write explicit ones so you can see them: on each WAN allow UDP 500 (IKE), UDP 4500 (NAT-T) and protocol ESP from the peer's address only. Restricting to the peer is the same practice as a FortiOS local-in policy or a PAN-OS rule allowing the 'ike' and 'ipsec-esp' applications from a known gateway.",
        "check": "Firewall > Rules > WAN on each side shows the three rules with source set to the peer's WAN IP."
      },
      {
        "title": "Generate a pre-shared key and choose proposals",
        "body": "Generate a long random key on any Linux machine. Choose IKEv2, AES-256-GCM with SHA-256 PRF and DH group 19 (ECP-256) for IKE, and AES-256-GCM with PFS group 19 for ESP. Avoid DES, 3DES, MD5, SHA-1 and DH groups 1, 2 and 5; they appear on real audits of partner tunnels.",
        "cmd": "openssl rand -base64 32",
        "check": "You have a 44-character key and a written proposal list for both sides."
      },
      {
        "title": "Create the connection on Site A",
        "body": "VPN > IPsec > Connections, add: version IKEv2, local address 172.31.0.1, remote address 172.31.0.2, proposals aes256gcm16-sha256-ecp256. Add a Local Authentication (pre-shared key, id 172.31.0.1) and Remote Authentication (pre-shared key, id 172.31.0.2). Under VPN > IPsec > Pre-Shared Keys add local 172.31.0.1, remote 172.31.0.2 and your key. Save the connection, then add a Child: mode tunnel, local 192.168.10.0/24, remote 192.168.20.0/24, ESP proposals aes256gcm16-ecp256, start action 'Start' (trap/start), DPD enabled. Enable IPsec and Apply.",
        "check": "The connection and its child appear in the list and the IPsec service is running."
      },
      {
        "title": "Mirror the configuration on Site B",
        "body": "Repeat on Site B with local and remote swapped: local 172.31.0.2, remote 172.31.0.1, child local 192.168.20.0/24 and remote 192.168.10.0/24, identical proposals and the same key. Mismatched subnets or proposals are the most common reason real tunnels fail.",
        "check": "Both sides show the same proposals and mirrored traffic selectors."
      },
      {
        "title": "Bring the tunnel up and check the SAs",
        "body": "Open VPN > IPsec > Status Overview, or use the console shell. strongSwan's swanctl shows the IKE SA (phase 1) and CHILD SA (phase 2) with the negotiated algorithms.",
        "cmd": "swanctl --list-conns\nswanctl --list-sas\n# If the child is not up yet, start it (the child name is shown by --list-conns):\nswanctl --initiate --child <child name>",
        "check": "--list-sas shows ESTABLISHED IKEv2 with AES_GCM_16-256/PRF_HMAC_SHA2_256/ECP_256 and an INSTALLED child with 192.168.10.0/24 === 192.168.20.0/24."
      },
      {
        "title": "Restrict what crosses the tunnel",
        "body": "By default OPNsense may allow all traffic on the IPsec interface. Replace that with least privilege: on Site B, Firewall > Rules > IPsec, allow 192.168.10.0/24 to the Site B Ubuntu host on ICMP, TCP 22 and TCP 80 only, then a logged block for everything else. On the Site B Ubuntu VM run a web server and test from Site A.",
        "cmd": "# Site B Ubuntu (replace 192.168.20.100 below with its DHCP address)\nsudo apt install -y nginx\n# Site A Ubuntu\nping -c 3 192.168.20.100\ncurl -sI http://192.168.20.100 | head -1\nnc -zv -w 3 192.168.20.100 22\nnc -zv -w 3 192.168.20.100 3306",
        "check": "Ping, HTTP and SSH work across the tunnel; 3306 is blocked and appears in Site B's firewall log on the IPsec interface."
      },
      {
        "title": "Prove the transit traffic is encrypted",
        "body": "Capture on Site A's WAN while you curl across the tunnel. You should see only IKE and ESP, never the HTTP inside.",
        "cmd": "# On Site A console shell (em0 = WAN; check with ifconfig)\ntcpdump -ni em0 -c 20 'esp or udp port 500 or udp port 4500'\n# Compare: this should capture nothing while you curl across the tunnel\ntcpdump -ni em0 -c 5 'tcp port 80'",
        "check": "The first capture shows ESP packets between 172.31.0.1 and 172.31.0.2; the second captures no HTTP."
      },
      {
        "title": "Inspect tunnel traffic with a security profile",
        "body": "Traffic is decrypted when it leaves the tunnel, so inspect it on Site B's LAN. Enable Suricata (Services > Intrusion Detection) on Site B's LAN interface in IPS mode with ET open/emerging-attack_response set to drop. On the Site B server, publish a harmless page whose text triggers the 'id check returned root' signature, then fetch it from Site A. This is how FortiOS applies an IPS sensor to a VPN policy and PAN-OS applies a vulnerability protection profile to a rule from the vpn zone.",
        "cmd": "# Site B Ubuntu\necho 'uid=0(root) gid=0(root) groups=0(root)' | sudo tee /var/www/html/idtest.html\n# Site A Ubuntu\ncurl -s --max-time 5 http://192.168.20.100/idtest.html",
        "check": "Site B's Intrusion Detection > Alerts shows the GPL ATTACK_RESPONSE alert with action drop, and the curl returns nothing."
      },
      {
        "title": "Break it and troubleshoot from the logs",
        "body": "On Site B change the IKE proposal to aes128-sha256-modp2048 and apply. Restart the connection and read the IPsec log (VPN > IPsec > Log File). Then fix it. Next, change Site B's pre-shared key by one character to see an authentication failure, and fix that too. Note the exact log text for each failure; these are the messages you will search for on the job.",
        "cmd": "swanctl --terminate --ike <connection name>\nswanctl --initiate --child <child name>\nswanctl --list-sas",
        "check": "The log shows NO_PROPOSAL_CHOSEN for the proposal mismatch and an AUTHENTICATION_FAILED message for the bad key, and the tunnel comes back after each fix."
      },
      {
        "title": "Map the build to FortiOS and PAN-OS",
        "body": "Write the equivalent configuration. FortiOS: config vpn ipsec phase1-interface (interface, ike-version 2, peertype any, proposal aes256gcm-prfsha256, dhgrp 19, remote-gw, psksecret), config vpn ipsec phase2-interface (phase1name, proposal aes256gcm, dhgrp 19, src-subnet, dst-subnet), a static route to the remote subnet via the tunnel interface, and firewall policies in both directions with an IPS sensor. PAN-OS: IKE Crypto and IPsec Crypto profiles, an IKE Gateway (IKEv2 only mode, pre-shared key, peer address), a tunnel interface in a 'vpn' zone, an IPsec Tunnel with proxy IDs, a static route in the virtual router, and security rules between trust and vpn with a profile group. Optionally build the FortiOS side on a FortiGate-VM permanent trial and bring the tunnel up against Site A.",
        "check": "Your mapping table has one row per OPNsense setting with its FortiOS and PAN-OS equivalent."
      }
    ],
    "verify": [
      "swanctl shows an established IKEv2 SA and an installed child SA with AES-256-GCM and ECP-256.",
      "The WAN capture shows only IKE and ESP while HTTP crosses the tunnel.",
      "Tunnel rules allow only ICMP, SSH and HTTP, and Suricata dropped the test signature on traffic from the other site.",
      "You reproduced and fixed a proposal mismatch and a PSK mismatch, with the log lines recorded."
    ],
    "deliverable": "A site-to-site VPN runbook: topology diagram, the proposal and key-management standard, both firewalls' IPsec and tunnel-rule screenshots, the swanctl output, the packet capture evidence, the Suricata alert, a troubleshooting table (symptom, log message, cause, fix) and the OPNsense/FortiOS/PAN-OS mapping.",
    "resume": "Built and hardened an IKEv2 site-to-site IPsec VPN between two OPNsense firewalls with AES-256-GCM and ECP-256, restricted tunnel traffic to least privilege, applied IPS inspection to tunnel traffic, and documented troubleshooting and FortiOS/PAN-OS equivalents.",
    "interview": [
      "What happens in IKE phase 1 and phase 2? — Phase 1 (the IKE SA) authenticates the peers and builds a secure channel; phase 2 (the child or IPsec SA) negotiates the ESP keys and traffic selectors for the data.",
      "A tunnel is up but traffic does not pass. What do you check? — Traffic selectors or proxy IDs on both sides, routes to the remote subnet, firewall policy on the tunnel interface, NAT exemptions and whether the child SA's counters increase.",
      "Why use PFS? — Perfect forward secrecy runs a fresh Diffie-Hellman exchange for each child SA, so compromising one key does not expose past or future traffic."
    ],
    "cleanup": [
      "Power off and delete the two OPNsense VMs and the site Ubuntu clones, or snapshot them for revision.",
      "Discard the lab pre-shared key; it should not be reused anywhere.",
      "If you used a FortiGate-VM trial, delete the VM; the trial license needs no cancellation."
    ],
    "links": [
      {
        "label": "OPNsense documentation: IPsec",
        "url": "https://docs.opnsense.org/manual/vpnet.html"
      },
      {
        "label": "strongSwan documentation: swanctl",
        "url": "https://docs.strongswan.org/docs/latest/swanctl/swanctl.html"
      },
      {
        "label": "Fortinet Document Library: FortiGate / FortiOS",
        "url": "https://docs.fortinet.com/product/fortigate/"
      },
      {
        "label": "NIST SP 800-77 Rev. 1: Guide to IPsec VPNs",
        "url": "https://csrc.nist.gov/pubs/sp/800/77/r1/final"
      }
    ]
  }
]);
