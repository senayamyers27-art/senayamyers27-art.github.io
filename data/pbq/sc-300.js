CertHub.addPbqs("sc-300", [
  { id: "role-least-privilege", d: 1, type: "match", title: "Match admin tasks to least-privileged Entra roles",
    prompt: "Contoso wants every admin to hold only the built-in Microsoft Entra role they need. Match each job duty to the least-privileged built-in role that covers it.",
    pairs: [
      ["Create and edit Conditional Access policies (nothing else)", "Conditional Access Administrator"],
      ["Create users, manage groups and reset passwords for non-admin users", "User Administrator"],
      ["Configure access reviews, access packages and lifecycle workflows", "Identity Governance Administrator"],
      ["Configure the tenant-wide authentication methods policy", "Authentication Policy Administrator"],
      ["Read sign-in and audit reports without changing anything", "Reports Reader"],
      ["Assign Microsoft Entra roles and manage PIM settings for them", "Privileged Role Administrator"]
    ],
    extra: ["Global Administrator", "Security Administrator"],
    explain: "Least privilege means picking the narrowest role that still covers the duty. Global Administrator and Security Administrator can do several of these tasks, but they grant far more than required. Privileged Role Administrator is the role that manages role assignments and PIM for Entra roles, while Identity Governance Administrator covers access reviews, entitlement management and lifecycle workflows. Reports Reader only reads usage, sign-in and audit reports." },

  { id: "dynamic-group-rule", d: 1, type: "select", title: "Evaluate a dynamic membership rule",
    prompt: "A dynamic security group uses the rule shown. Select every user who will become a member of the group.",
    context: "Rule: (user.department -eq \"Sales\") -and (user.usageLocation -eq \"US\") -and (user.accountEnabled -eq true)\n\nUPN                     department   usageLocation  accountEnabled  userType\nana@contoso.com         Sales        US             true            Member\nben@contoso.com         sales        US             true            Member\ncarla@contoso.com       Sales        CA             true            Member\ndev@contoso.com         Sales        US             false           Member\neli@contoso.com         Marketing    US             true            Member\nfatima@contoso.com      Sales        US             true            Guest",
    options: ["ana@contoso.com", "ben@contoso.com", "carla@contoso.com", "dev@contoso.com", "eli@contoso.com", "fatima@contoso.com"],
    answers: [0, 1, 5],
    explain: "All three conditions are joined with -and, so each must be true. The -eq operator in dynamic membership rules is not case-sensitive for string values, so ben's lowercase \"sales\" still matches. Carla fails on usageLocation, dev fails because the account is disabled and eli is in the wrong department. The rule never checks userType, so the guest fatima is added; add (user.userType -eq \"Member\") if guests must be excluded." },

  { id: "custom-domain-verify", d: 1, type: "order", title: "Add and verify a custom domain",
    prompt: "Contoso wants users to sign in as name@contoso.com instead of the onmicrosoft.com domain. Put the steps in the correct order.",
    steps: [
      "In the Microsoft Entra admin center, add contoso.com under Domain names",
      "Copy the MS=ms######## verification value that Entra shows for the domain",
      "Create a TXT record with that value at the public DNS host for contoso.com",
      "Wait for DNS propagation, then select Verify in the admin center",
      "Optionally make contoso.com the primary domain",
      "Update users' UPNs to the new @contoso.com suffix"
    ],
    explain: "You add the domain first because that's what generates the verification value. Publishing it as a TXT record (or MX record) at the DNS host proves you control the domain, and Verify only succeeds once the record resolves, so a failure right after creating it usually just means DNS hasn't propagated yet. Only a verified domain can be set as primary or used in UPNs. The onmicrosoft.com domain stays in place as a fallback." },

  { id: "spray-signin-logs", d: 2, type: "select", title: "Spot password spray in sign-in logs",
    prompt: "Review the exported Microsoft Entra sign-in log. Select every entry that is part of a password-spray attempt.",
    context: "Time (UTC)  User                 IP address      Result   Error code\n02:14:05    ana@contoso.com      203.0.113.45    Failure  50126\n02:14:09    ben@contoso.com      203.0.113.45    Failure  50126\n02:14:12    carla@contoso.com    203.0.113.45    Failure  50126\n08:31:40    dev@contoso.com      192.168.20.15   Failure  50126\n08:31:58    dev@contoso.com      192.168.20.15   Success  0\n02:14:16    eli@contoso.com      203.0.113.45    Failure  50053\n09:02:11    fatima@contoso.com   198.51.100.23   Interrupted 50074",
    options: ["02:14:05 ana 203.0.113.45 50126", "02:14:09 ben 203.0.113.45 50126", "02:14:12 carla 203.0.113.45 50126", "08:31:40 dev 192.168.20.15 50126", "08:31:58 dev 192.168.20.15 0", "02:14:16 eli 203.0.113.45 50053", "09:02:11 fatima 198.51.100.23 50074"],
    answers: [0, 1, 2, 5],
    explain: "Password spray tries one or two common passwords against many accounts from the same source, so the pattern is one external IP hitting different users seconds apart. Error 50126 means invalid username or password, and 50053 means the account was locked or the sign-in came from a known malicious IP (Smart Lockout); it's still part of the same burst from 203.0.113.45. Dev's single typo from an internal address followed by a success is normal behavior, and 50074 just means strong authentication (MFA) was required." },

  { id: "ca-controls-match", d: 2, type: "match", title: "Map requirements to Conditional Access settings",
    prompt: "Match each security requirement to the Conditional Access policy setting that implements it.",
    pairs: [
      ["Block Exchange ActiveSync and other legacy protocol clients", "Condition: Client apps"],
      ["Require FIDO2 or Windows Hello for Business for admins", "Grant: Require authentication strength"],
      ["Make users on unmanaged devices sign in again every 4 hours", "Session: Sign-in frequency"],
      ["Apply only when ID Protection rates the sign-in medium or high risk", "Condition: Sign-in risk"],
      ["Allow access only from Intune-managed devices that meet policy", "Grant: Require device to be marked as compliant"],
      ["Skip the policy for traffic from the HQ public IP range", "Condition: Locations"]
    ],
    extra: ["Grant: Require terms of use", "Session: Use app enforced restrictions"],
    explain: "Conditions decide when a policy applies (client apps, sign-in risk, locations), grant controls decide what the user must satisfy (authentication strength, a compliant device), and session controls shape the session afterwards (sign-in frequency). Authentication strength is how you require phishing-resistant methods rather than just any MFA. Locations use named locations, which you can include or exclude, such as a trusted HQ range." },

  { id: "ca-rollout-order", d: 2, type: "order", title: "Roll out a new Conditional Access policy safely",
    prompt: "You're deploying a policy that requires MFA for all users. Put the rollout steps in the safest correct order.",
    steps: [
      "Create two cloud-only emergency access (break-glass) accounts and confirm they can sign in",
      "Create the policy, assign it to a pilot group and exclude the emergency access accounts",
      "Set the policy state to Report-only and save it",
      "Review report-only results in the sign-in logs and the Conditional Access insights workbook",
      "Switch the policy to On for the pilot group",
      "Expand the assignment to all users"
    ],
    explain: "Emergency access accounts need to exist before you create the policy so you can exclude them and can't lock yourself out of the tenant. Report-only mode evaluates the policy and logs what it would have done without enforcing it, so you can check the impact in sign-in logs and the insights workbook first. After that you enforce it on a pilot group and only then widen it to everyone, which limits the blast radius of a mistake." },

  { id: "daemon-token-fill", d: 3, type: "fill", title: "Read an app-only access token",
    prompt: "A background service with no signed-in user calls Microsoft Graph. Its decoded access token is shown. Fill in each value.",
    context: "{\n  \"aud\": \"00000003-0000-0000-c000-000000000000\",\n  \"iss\": \"(tenant issuer)\",\n  \"appid\": \"11111111-2222-3333-4444-555555555555\",\n  \"app_displayname\": \"Contoso HR Sync\",\n  \"idtyp\": \"app\",\n  \"roles\": [ \"User.Read.All\", \"Group.Read.All\" ],\n  \"tid\": \"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee\"\n}",
    fields: [
      { label: "Token claim that lists the granted permissions", answers: ["roles"] },
      { label: "Permission type granted (delegated or application)", answers: ["application", "application permissions", "application permission", "app-only"] },
      { label: "OAuth 2.0 grant type the service used", answers: ["client credentials", "client credentials grant", "client credentials flow", "client_credentials"] }
    ],
    explain: "With no user involved, the service uses the client credentials grant and authenticates with its own certificate or secret. That flow can only use application permissions, which always need admin consent and show up in the roles claim. Delegated permissions would appear in the scp claim together with user claims. The idtyp value of app also confirms it's an app-only token." },

  { id: "workload-identity-match", d: 3, type: "match", title: "Choose the right workload identity",
    prompt: "Match each scenario to the most appropriate workload identity option.",
    pairs: [
      ["One Azure VM runs a script that reads Key Vault; the identity should be deleted with the VM", "System-assigned managed identity"],
      ["Twenty Azure Functions share one identity whose permissions are granted before they're deployed", "User-assigned managed identity"],
      ["A GitHub Actions workflow deploys to Azure without storing any secret", "Workload identity federation"],
      ["An on-premises server (not Azure Arc-enabled) calls Microsoft Graph", "App registration with a certificate credential"]
    ],
    extra: ["Guest user account", "Shared admin user account"],
    explain: "A system-assigned managed identity lives and dies with a single resource, and a user-assigned managed identity is a standalone resource that many resources can share and that you can pre-authorize. Workload identity federation lets an external identity provider's tokens (such as GitHub's OIDC token) be exchanged for Entra tokens, so no secret is stored. Managed identities are only available to Azure resources (and Arc-enabled servers), so a plain on-premises server uses an app registration, and a certificate is preferred over a client secret." },

  { id: "access-review-outcome", d: 4, type: "select", title: "Predict access review results",
    prompt: "A quarterly access review of guest members of the group Partners-Project has ended with the settings shown. Select every guest who loses group membership when results are applied.",
    context: "Settings:\n  Auto apply results to resource: Enabled\n  If reviewers don't respond: Remove access\n  Show recommendations: Enabled (inactivity 30 days)\n\nGuest                         Last sign-in   Recommendation  Reviewer decision\nkai@fabrikam.example.com      3 days ago     Approve         Approved\nlena@fabrikam.example.com     95 days ago    Deny            Approved\nmo@tailspin.example.com       12 days ago    Approve         Denied\nnina@tailspin.example.com     60 days ago    Deny            Not reviewed\nomar@northwind.example.com    1 day ago      Approve         Not reviewed",
    options: ["kai@fabrikam.example.com", "lena@fabrikam.example.com", "mo@tailspin.example.com", "nina@tailspin.example.com", "omar@northwind.example.com"],
    answers: [2, 3, 4],
    explain: "Recommendations only help reviewers; the reviewer's actual decision wins, so lena stays even though she's been inactive for 95 days. Mo was explicitly denied. Because the review is set to Remove access when reviewers don't respond, nina and omar are also removed even though omar is active, which is why that fallback needs care. With auto apply enabled, removals happen automatically when the review ends." },

  { id: "access-package-order", d: 4, type: "order", title: "Build an entitlement management access package",
    prompt: "Put the steps for giving project partners self-service access through entitlement management in the correct order.",
    steps: [
      "Create a catalog for the project and assign a catalog owner",
      "Add the group, SharePoint site and enterprise app to the catalog as resources",
      "Create an access package and choose the resource roles it grants",
      "Add a policy: which connected organizations can request, approvers and an expiration",
      "Share the access package's My Access portal link with partners",
      "Partners request the package and approvers review the requests"
    ],
    explain: "Catalogs are the container, so they come first, and resources must be added to a catalog before any access package in it can grant them. The access package bundles resource roles, and its policy defines who can request, who approves and when access expires. Only then do you share the My Access link, and requests flow through the approval you configured." }
]);
