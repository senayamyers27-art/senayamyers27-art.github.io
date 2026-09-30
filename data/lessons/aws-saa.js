/* Lessons for AWS Certified Solutions Architect - Associate (SAA-C03): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-saa", [
 {
  "t": "IAM users, groups, roles and policies: least privilege, identity-based vs resource-based policies and policy evaluation logic",
  "body": [
   "AWS Identity and Access Management (IAM) decides who can do what in an AWS account. Every API call, whether it comes from the console, the command line interface (CLI), a software development kit (SDK) or another AWS service, is checked by IAM before anything happens. Getting IAM right is the foundation of every secure architecture on the Solutions Architect Associate (SAA-C03) exam, and many questions that look like they are about S3, EC2 or Lambda are really asking whether you understand identities and policies. There are three kinds of identity to know. An IAM user is a long-term identity for one person or application, with an optional console password and optional access keys for the API. An IAM group is a collection of users that share permissions; groups cannot sign in, cannot be nested inside other groups and cannot be named as a principal in a policy. An IAM role is an identity with no long-term credentials: a trusted principal (a user, an AWS service such as EC2 or Lambda, another account, or a federated user) assumes it and receives temporary credentials from AWS Security Token Service (STS). For workloads, roles are almost always the right answer, because there are no keys to leak or rotate. An EC2 instance gets a role through an instance profile, and a Lambda function gets one as its execution role. The account root user, created with the account, can do almost everything and should be locked away with multi-factor authentication (MFA) and used only for the few tasks that require it.",
   "Permissions come from policies, which are JSON documents made of statements. Each statement has an `Effect` (Allow or Deny), an `Action` (for example `s3:GetObject`), a `Resource` (an ARN, the Amazon Resource Name) and optional `Condition` blocks using keys such as `aws:SourceIp` or `aws:MultiFactorAuthPresent`. Least privilege means granting only the actions and resources a job needs, then widening only when there is a proven need. AWS managed policies are convenient starting points but are often broad; customer managed policies let you tighten scope and reuse the result; inline policies are embedded in one identity and deleted with it.",
   "```\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"s3:GetObject\"],\n    \"Resource\": \"arn:aws:s3:::reports-bucket/*\"\n  }]\n}\n```",
   "Identity-based policies attach to users, groups and roles and say what that identity can do. Resource-based policies attach to a resource, such as an S3 bucket policy, an SQS queue policy or a KMS key policy, and include a `Principal` element naming who may access it. Resource-based policies are how you grant another account access without that account assuming a role. A role's trust policy is itself a resource-based policy: it says who may assume the role, while the role's permissions policies say what the role can do once assumed.",
   "Policy evaluation follows a fixed logic. Every request starts as an implicit deny. AWS collects every applicable policy: service control policies (SCPs) from AWS Organizations, resource-based policies, permissions boundaries, session policies and identity-based policies. If any of them contains an explicit Deny that matches, the request is denied, full stop. Otherwise the request needs an Allow, and every guardrail layer that applies (SCPs, a permissions boundary, a session policy) must also allow it. Within one account, an Allow in either the identity policy or the resource policy is usually enough; across accounts, both the caller's identity policy and the resource policy must allow. A permissions boundary is a managed policy set on a user or role that caps the maximum permissions its identity policies can grant; it grants nothing by itself. Boundaries let developers create roles for their applications without being able to create a role more powerful than they are. The IAM policy simulator and IAM Access Analyzer help you test policies and find unintended external access.",
   "Consider a worked example. An application on EC2 needs to read one S3 bucket, and a developer suggests pasting an access key into a configuration file. Instead, the architect creates a role whose trust policy allows `ec2.amazonaws.com`, attaches a customer managed policy allowing only `s3:GetObject` on that bucket's objects, and attaches the role to the instance through an instance profile. The SDK on the instance finds temporary credentials automatically through the instance metadata service and refreshes them before they expire. Later, security adds a bucket policy that explicitly denies all access unless the request uses TLS; the application still works because its requests are encrypted, and any plain HTTP request is refused regardless of the role's Allow.",
   "Common mistakes: storing access keys on instances or in code instead of using roles; thinking a permissions boundary or SCP grants access (they only limit it); forgetting that an explicit Deny beats any Allow; trying to put a group in a policy's `Principal` element; and using the root user for daily work. Another trap is assuming an AWS managed policy is least privilege; it is a starting point you should narrow once you know what the workload actually calls.",
   "Exam questions usually describe a symptom or a goal. 'Access denied despite an Allow' points to an explicit Deny, an SCP or a permissions boundary. 'Give an EC2 instance or Lambda function access to a service' points to an IAM role, never stored keys. 'Let developers create roles but cap what those roles can do' points to a permissions boundary, and 'grant another account access to a bucket without a role' points to a resource-based bucket policy."
  ],
  "terms": [
   [
    "IAM role",
    "An identity with permissions but no long-term credentials, assumed by a trusted principal to receive temporary credentials."
   ],
   [
    "IAM group",
    "A collection of IAM users that share attached policies; it cannot sign in, be nested or be a policy principal."
   ],
   [
    "Identity-based policy",
    "A policy attached to a user, group or role that states what that identity may do."
   ],
   [
    "Resource-based policy",
    "A policy attached to a resource, such as an S3 bucket policy, that names the principals allowed to access it."
   ],
   [
    "Explicit deny",
    "A Deny statement that matches a request; it overrides any Allow in any policy."
   ],
   [
    "Permissions boundary",
    "A managed policy that sets the maximum permissions an IAM user or role can have, without granting any itself."
   ],
   [
    "Instance profile",
    "The container that passes an IAM role to an EC2 instance so software on it receives temporary credentials."
   ]
  ],
  "example": "A development team keeps asking the cloud team to create IAM roles for their Lambda functions. The cloud team lets them create roles themselves, but only if each new role has a permissions boundary attached that allows DynamoDB, S3 and CloudWatch Logs actions in the development account. A developer then creates a role with AdministratorAccess by mistake; because of the boundary, the function can still only use those three services, and an attempt to call IAM is denied.",
  "tip": "When a question asks why access is denied despite an Allow, look for an explicit Deny, an SCP or a permissions boundary. When it asks how to give an EC2 instance or Lambda function access, the answer is a role, never access keys stored on the instance.",
  "check": [
   [
    "A user's identity policy allows s3:DeleteObject, but the bucket policy explicitly denies it to that user. What happens?",
    "The request is denied. An explicit Deny in any applicable policy overrides every Allow."
   ],
   [
    "What does a permissions boundary do on its own?",
    "It grants nothing. It only limits the maximum permissions that the identity-based policies of that user or role can make effective."
   ],
   [
    "Can you nest an IAM group inside another group or name it as a principal?",
    "No. IAM groups cannot be nested and cannot be a principal in a policy; attach policies to the group or use roles instead."
   ],
   [
    "An account B user needs to read a bucket in account A without assuming a role. What must be true?",
    "Account A's bucket policy must allow the account B principal, and the user's identity policy in account B must also allow the S3 action, because cross-account access needs both sides."
   ]
  ]
 },
 {
  "t": "Multi-account security: AWS Organizations, service control policies, IAM Identity Center and cross-account roles",
  "body": [
   "Large AWS customers rarely run everything in one account. Separate accounts give hard boundaries for security, billing and service quotas: a mistake or breach in a development account cannot touch production, and each team's spending is easy to see. AWS Organizations is the service that groups accounts together. One management account creates or invites member accounts, arranges them into organizational units (OUs) such as Security, Infrastructure, Production and Sandbox, and pays one consolidated bill, which also pools usage for volume discounts. Service control policies (SCPs) are Organizations policies attached to the root, an OU or an account. They define the maximum permissions available to IAM users and roles in the affected member accounts, including each account's root user. SCPs never grant permissions; an identity still needs an IAM policy that allows the action. They are guardrails: deny leaving the organization, deny disabling CloudTrail or GuardDuty, or deny any action outside approved Regions using the `aws:RequestedRegion` condition. SCPs attached higher in the tree are inherited, so an action must be allowed at every level from the root down to the account. SCPs do not affect the management account, which is one reason AWS recommends running no workloads there, and they do not restrict service-linked roles. A newer, related policy type, resource control policies (RCPs), sets maximum permissions on resources such as S3 buckets and KMS keys, which helps build a data perimeter that also applies to principals outside your organization.",
   "AWS IAM Identity Center (the successor to AWS Single Sign-On) is the recommended way for people to sign in across many accounts. You connect an identity source, such as the built-in Identity Center directory, Active Directory, or an external identity provider (IdP) like Okta or Microsoft Entra ID, often with automatic user provisioning through the System for Cross-domain Identity Management (SCIM) standard. You then define permission sets. A permission set is a template of policies; when you assign a user or group a permission set on an account, Identity Center creates a matching role in that account. Users sign in once to the access portal, pick an account and role, and receive temporary credentials. There are no IAM users to create in each account.",
   "For workloads and automation, cross-account access uses IAM roles. In the target account you create a role whose trust policy names the source account, or a specific role there, as the principal. In the source account, the calling identity needs permission for `sts:AssumeRole` on that role's ARN. Both sides must agree. When a third party such as a monitoring vendor assumes a role in your account, you add an external ID condition to the trust policy to prevent the confused deputy problem, where the vendor is tricked into using its access to your account on behalf of another customer.",
   "```\naws sts assume-role \\\n  --role-arn arn:aws:iam::222233334444:role/AuditReadOnly \\\n  --role-session-name audit-run\n```",
   "Other multi-account tools appear in questions. AWS Control Tower sets up and governs a landing zone: a recommended OU structure, a log archive account, an audit account, centralized CloudTrail and preventive and detective controls built from SCPs and AWS Config rules. Account Factory in Control Tower creates new accounts that already meet the baseline. AWS Resource Access Manager (RAM) shares resources such as VPC subnets, Transit Gateways or Route 53 Resolver rules across accounts. Delegated administrator lets a member account, typically a security tooling account, run a service such as GuardDuty, Security Hub or AWS Config aggregation for the whole organization instead of the management account.",
   "Consider a worked example. A company must guarantee that no one in its workload accounts can create resources outside two approved Regions, and its auditors must read CloudTrail logs in every account. It uses Control Tower to create the landing zone, attaches an SCP to the Workloads OU that denies all actions when `aws:RequestedRegion` is not one of the two approved Regions, with exceptions for global services such as IAM, and assigns the auditors a read-only permission set through IAM Identity Center. Even an administrator in a member account cannot create an instance in a third Region, and the auditors never need separate IAM users.",
   "Common mistakes: expecting an SCP to grant access; forgetting that SCPs do not apply to the management account; creating IAM users in every account for people instead of using Identity Center; and omitting the external ID for third-party roles. Another is running workloads in the management account, where SCP guardrails cannot reach them.",
   "Exam questions often describe a governance goal. 'Central guardrail across all accounts' or 'prevent even administrators from' points to an SCP. 'Single sign-on for employees across many accounts' points to IAM Identity Center. 'Application in account A must act in account B' points to a cross-account role with a trust policy, and 'third-party vendor access' adds an external ID. 'Quickly set up a governed multi-account environment' points to Control Tower."
  ],
  "terms": [
   [
    "AWS Organizations",
    "The service that groups AWS accounts for central management, policies and consolidated billing."
   ],
   [
    "Organizational unit (OU)",
    "A container of accounts inside AWS Organizations to which policies such as SCPs can be attached."
   ],
   [
    "Service control policy (SCP)",
    "An Organizations policy that sets the maximum permissions for identities in member accounts; it never grants access."
   ],
   [
    "Permission set",
    "An IAM Identity Center template of policies that becomes a role in each account it is assigned to."
   ],
   [
    "External ID",
    "A secret value required in a cross-account role's trust policy to protect against the confused deputy problem."
   ],
   [
    "AWS Control Tower",
    "A service that sets up and governs a multi-account landing zone with baseline accounts and controls."
   ]
  ],
  "example": "A payments company acquires a startup with 12 AWS accounts. It invites them into its organization, places them in a Workloads OU that inherits SCPs denying CloudTrail changes and unapproved Regions, connects IAM Identity Center to its corporate IdP so engineers sign in with their existing accounts, and makes the security account the delegated administrator for GuardDuty so findings from all 12 accounts arrive in one place.",
  "tip": "SCPs filter, they do not grant, and they do not apply to the management account. If the question wants centralized sign-in for people across many accounts, choose IAM Identity Center; if it wants an application in account A to act in account B, choose a cross-account role.",
  "check": [
   [
    "An SCP allows only EC2 and S3 actions. A user in a member account has AdministratorAccess. Can the user create a DynamoDB table?",
    "No. The SCP sets the maximum available permissions, so actions outside EC2 and S3 are blocked regardless of the IAM policy."
   ],
   [
    "What two things are required for an identity in account A to assume a role in account B?",
    "The role in account B must trust account A (or that identity) in its trust policy, and the identity in account A must be allowed sts:AssumeRole on the role's ARN."
   ],
   [
    "Why should a vendor's cross-account role include an external ID condition?",
    "It prevents the confused deputy problem, where another customer of the vendor could trick the vendor into using its access to your account."
   ],
   [
    "Does an SCP restrict actions performed in the management account?",
    "No. SCPs do not affect the management account, which is why workloads should run in member accounts."
   ]
  ]
 },
 {
  "t": "Federation and temporary credentials: STS AssumeRole, SAML and OIDC federation, Cognito user pools vs identity pools",
  "body": [
   "Federation lets people and applications use an identity they already have, such as a corporate login, a Google account or a token from a build system, to get AWS access instead of an IAM user. The engine underneath is AWS Security Token Service (STS), which issues temporary credentials: an access key ID, a secret access key and a session token, valid for a limited time that you configure on the role within allowed bounds. Because they expire on their own, temporary credentials are far safer than long-term access keys: a leaked set stops working shortly, and there is nothing to rotate.",
   "The core STS calls are worth knowing by name. `AssumeRole` is used by an IAM identity or AWS service to take on a role, including across accounts. `AssumeRoleWithSAML` exchanges a SAML 2.0 (Security Assertion Markup Language) assertion from a corporate identity provider, such as Active Directory Federation Services, for role credentials. `AssumeRoleWithWebIdentity` exchanges a token from an OpenID Connect (OIDC) provider; it is how continuous integration and delivery (CI/CD) systems such as GitHub Actions get AWS roles without stored keys, and how Kubernetes pods on Amazon EKS use IAM roles for service accounts. `GetSessionToken` returns temporary credentials for an IAM user, often after an MFA check. `GetFederationToken` is an older option for brokered federation.",
   "SAML federation is the traditional workforce pattern. An employee signs in to the company IdP, which posts a signed assertion listing the roles the user may use to the AWS sign-in endpoint; AWS validates the signature against the IdP metadata you registered in IAM and the user lands in the console with that role's permissions. Today IAM Identity Center wraps this pattern for multi-account organizations, and it is the preferred exam answer for workforce access. OIDC federation is the modern pattern for web identities and workloads: you register the provider in IAM, and the role's trust policy restricts which audience (`aud`) and subject (`sub`) values in the token may assume it, for example only one repository and branch.",
   "Amazon Cognito serves customer-facing web and mobile apps and has two parts that the exam loves to contrast. A Cognito user pool is a user directory and sign-in service: sign-up, sign-in, MFA, password reset, account recovery and sign-in through social providers or SAML, returning JSON Web Tokens (JWTs). Those tokens can authorize calls to API Gateway through a Cognito authorizer, or an Application Load Balancer can authenticate users against the user pool. A Cognito identity pool (federated identities) exchanges a token, from a user pool or from a provider like Google or Apple, for temporary AWS credentials tied to an IAM role, so the app can call AWS services such as S3 or DynamoDB directly. Identity pools can also give limited guest access to unauthenticated users through a separate role.",
   "In short: user pools answer who is this user, and identity pools answer what AWS credentials this user gets. Many apps use both. Fine-grained access, such as letting each user read only their own folder in S3 or their own items in DynamoDB, uses policy variables like `${cognito-identity.amazonaws.com:sub}` in the identity pool role's policy, or the `dynamodb:LeadingKeys` condition.",
   "Consider a worked example. A mobile photo app lets customers sign in with email or Google through a Cognito user pool. The app trades the user pool's ID token at an identity pool for temporary credentials. The authenticated role allows `s3:PutObject` only on `photos/${cognito-identity.amazonaws.com:sub}/*`, so each user can write only to their own prefix. Separately, the company's build pipeline deploys the app's back end by calling `AssumeRoleWithWebIdentity` with its OIDC token; the deploy role's trust policy accepts only tokens whose subject names the main branch of one repository, so no long-term key sits in the pipeline settings.",
   "Common mistakes: choosing a user pool when the app must call AWS services directly (that needs an identity pool); creating IAM users for millions of app customers; storing access keys in a mobile app or CI system when federation is available; and trusting an OIDC provider without restricting the audience and subject, which could let any token from that provider assume the role. Also remember that temporary credentials cannot be revoked one by one, but you can deny sessions issued before a time by adding a policy with the `aws:TokenIssueTime` condition, which the console's revoke sessions button does for you.",
   "Exam wording is usually clear once you know the map. 'Corporate directory', 'Active Directory' or 'SAML' for employees points to IAM Identity Center or `AssumeRoleWithSAML`. 'Mobile app users need to upload directly to S3' points to a Cognito identity pool. 'Sign-up and sign-in for app users', 'social login' or 'JWT to authorize API Gateway' points to a Cognito user pool. 'CI/CD without long-lived keys' points to OIDC and `AssumeRoleWithWebIdentity`, and 'temporary credentials' anywhere points to STS."
  ],
  "terms": [
   [
    "AWS STS",
    "The Security Token Service, which issues temporary, expiring credentials for roles and federated users."
   ],
   [
    "Federation",
    "Granting AWS access to identities managed outside IAM, such as a corporate IdP or web identity provider."
   ],
   [
    "SAML 2.0",
    "An XML-based standard for exchanging signed authentication assertions, commonly used for workforce federation."
   ],
   [
    "OpenID Connect (OIDC)",
    "An identity layer on OAuth 2.0 whose signed tokens can be exchanged for AWS role credentials."
   ],
   [
    "Cognito user pool",
    "A managed user directory that handles sign-up and sign-in and returns JWTs."
   ],
   [
    "Cognito identity pool",
    "A service that exchanges identity tokens for temporary AWS credentials mapped to IAM roles."
   ]
  ],
  "example": "A fitness app has two million users. The team creates a Cognito user pool for sign-up with email and Apple sign-in, and protects its API Gateway endpoints with a Cognito user pool authorizer. For workout video uploads the app uses an identity pool, whose role allows writes only to each user's own S3 prefix, so large uploads go straight to S3 without passing through the API or needing any IAM users.",
  "tip": "If a mobile or web app needs its users to call AWS services directly, the answer involves a Cognito identity pool. If the question is only about sign-up and sign-in for app users, it is a user pool. Corporate users and SAML point to IAM Identity Center or AssumeRoleWithSAML.",
  "check": [
   [
    "Which STS operation does a CI/CD pipeline using an OIDC token call to get AWS credentials?",
    "AssumeRoleWithWebIdentity, which exchanges the OIDC token for a role's temporary credentials."
   ],
   [
    "An API Gateway API must accept only signed-in app users. Which Cognito component provides the authorizer?",
    "A Cognito user pool, whose JWTs API Gateway can validate with a Cognito user pool authorizer."
   ],
   [
    "Why are temporary credentials safer than IAM user access keys?",
    "They expire automatically after a limited time, so a leaked set has a short useful life and there is nothing long-lived to rotate."
   ],
   [
    "How do you restrict an OIDC federated role so only one repository's main branch can assume it?",
    "Add conditions in the role's trust policy on the token's audience and subject claims that match that repository and branch."
   ]
  ]
 },
 {
  "t": "VPC security layers: security groups vs network ACLs, public and private subnets, NAT gateways, bastion hosts vs Session Manager",
  "body": [
   "A virtual private cloud (VPC) is your own isolated network in an AWS Region, defined by an IPv4 CIDR (Classless Inter-Domain Routing) block such as `10.0.0.0/16`. You divide it into subnets, and each subnet lives in exactly one Availability Zone (AZ). Security in a VPC comes in layers: where a subnet can route, which firewalls sit in front of each resource, and how administrators reach machines. The exam expects you to design all three so that only the load balancer faces the internet and everything else stays private.",
   "What makes a subnet public is its route table, not its name. A public subnet has a route `0.0.0.0/0` pointing to an internet gateway, and instances there need a public or Elastic IP address to be reachable. A private subnet has no route to the internet gateway, so nothing on the internet can start a connection to it. Instances in private subnets often still need outbound internet access for patches and external APIs. A NAT (network address translation) gateway provides that: you place it in a public subnet with an Elastic IP, and the private subnet's route table sends `0.0.0.0/0` to it. It allows outbound connections and their replies but blocks inbound connections from the internet. A NAT gateway lives in one AZ, so for high availability you deploy one per AZ and route each private subnet to the gateway in its own AZ. NAT instances are the older self-managed alternative, and for IPv6 an egress-only internet gateway plays the same outbound-only role.",
   "Two firewall layers protect resources. Security groups attach to elastic network interfaces, and so to instances, load balancers, RDS databases and Lambda functions in a VPC. They are stateful, meaning return traffic is automatically allowed; they support only allow rules; and all rules are evaluated together. A rule's source can be another security group, which is the clean way to say only the web tier may reach the database tier, even as instances come and go. Network ACLs (NACLs) attach to subnets and are stateless, so you must explicitly allow return traffic on ephemeral ports (typically 1024-65535). They support both allow and deny rules and are evaluated in rule-number order, with the first match winning. Use a NACL deny when you need to block a specific IP range, because security groups cannot deny.",
   "```\nPrivate subnet route table\nDestination     Target\n10.0.0.0/16     local\n0.0.0.0/0       nat-0abc (NAT gateway in the same AZ)\n```",
   "Administrators need a way to reach private instances. The classic answer is a bastion host: a hardened instance in a public subnet that allows SSH (Secure Shell) from known IP ranges, from which you hop to private instances. It works, but it needs patching, SSH key management and an open inbound port. AWS Systems Manager Session Manager is the modern answer: the SSM Agent on the instance makes an outbound connection to Systems Manager, and you open a shell from the console or with `aws ssm start-session --target i-0123abcd`, with IAM controlling who may connect. There are no inbound ports and no SSH keys, and sessions can be logged to CloudWatch Logs or S3. The instance needs an instance profile with the `AmazonSSMManagedInstanceCore` permissions and a path to the Systems Manager endpoints, through a NAT gateway or interface endpoints. EC2 Instance Connect Endpoint is another keyless option for SSH into private instances.",
   "Consider a worked example. A three-tier app puts its Application Load Balancer (ALB) in public subnets in two AZs, its EC2 web servers and RDS database in private subnets, and a NAT gateway in each AZ. The ALB security group allows 443 from anywhere; the web security group allows 443 only from the ALB security group; the database security group allows 3306 only from the web security group. Operators use Session Manager, so no instance has port 22 open. When a scanner from one IP range floods the site, the team adds a NACL deny rule for that range on the public subnets, numbered lower than the allow rules so it is evaluated first.",
   "Common mistakes: calling a subnet public just because instances have public IPs (the route to an internet gateway is what matters); forgetting that NACLs are stateless, which causes replies to be dropped; trying to write a deny rule in a security group; placing a single NAT gateway for all AZs, which becomes a single point of failure and adds cross-AZ data charges; and putting the NAT gateway in a private subnet, where it has no route out. Opening SSH to `0.0.0.0/0` on a bastion is also a classic finding.",
   "Exam questions use consistent clue words. 'Stateful', 'allow only' or 'reference another tier' points to a security group. 'Stateless', 'deny a specific IP address' or 'rule order' points to a network ACL. 'Private instances need to download patches but must not be reachable from the internet' points to a NAT gateway, one per AZ for resilience. 'Shell access with no open inbound ports and no key management' points to Session Manager rather than a bastion host."
  ],
  "terms": [
   [
    "Security group",
    "A stateful, allow-only virtual firewall attached to network interfaces."
   ],
   [
    "Network ACL",
    "A stateless subnet-level firewall with numbered allow and deny rules evaluated in order."
   ],
   [
    "Public subnet",
    "A subnet whose route table sends internet-bound traffic to an internet gateway."
   ],
   [
    "NAT gateway",
    "A managed service in a public subnet that lets private instances start outbound internet connections."
   ],
   [
    "Bastion host",
    "A hardened instance in a public subnet used as a jump point for SSH into private instances."
   ],
   [
    "Session Manager",
    "A Systems Manager feature that gives shell access to instances over an outbound agent connection, controlled by IAM."
   ]
  ],
  "example": "A company's audit finds port 22 open to the internet on a bastion host with shared SSH keys. The team installs the SSM Agent on all instances, attaches an instance profile with Systems Manager core permissions, adds interface endpoints for Systems Manager in the private subnets, logs every session to S3 and deletes the bastion. Engineers now connect with IAM-controlled sessions, and no security group anywhere allows inbound SSH.",
  "tip": "Stateful and allow-only means security group; stateless with deny rules and ordering means network ACL. When a question asks for shell access with no open inbound ports and no key management, choose Session Manager over a bastion host.",
  "check": [
   [
    "Outbound HTTPS from a private instance works through a NAT gateway, but replies are dropped. The security group is fine. What should you check?",
    "The subnet's network ACL. NACLs are stateless, so they need an inbound rule allowing return traffic on ephemeral ports."
   ],
   [
    "How do you make a NAT design survive the loss of one Availability Zone?",
    "Deploy a NAT gateway in each AZ and route each private subnet to the NAT gateway in its own AZ."
   ],
   [
    "You must block one abusive IP range from reaching a subnet. Security group or NACL?",
    "A network ACL deny rule, because security groups support only allow rules."
   ],
   [
    "What must an instance have to be managed with Session Manager?",
    "The SSM Agent, an instance profile with Systems Manager core permissions, and network access to the Systems Manager endpoints through NAT or interface endpoints."
   ]
  ]
 },
 {
  "t": "Private access to AWS services: gateway endpoints, interface endpoints (PrivateLink) and endpoint policies",
  "body": [
   "Most AWS services, such as S3, DynamoDB, SQS and Secrets Manager, are reached through public service endpoints. A private instance can reach them through a NAT gateway, but then the traffic leaves your VPC's private address space, needs an internet path, and you pay NAT data processing charges. VPC endpoints let resources in your VPC reach AWS services privately, without an internet gateway, NAT device or public IP addresses, and the traffic stays on the AWS network. Many security and cost questions on the exam turn on choosing the right kind of endpoint. Gateway endpoints exist for exactly two services: Amazon S3 and Amazon DynamoDB. You create the endpoint and select route tables; AWS adds a route whose destination is the service's prefix list (a managed list of the service's IP ranges, shown as `pl-xxxxxxxx`) and whose target is the endpoint. Applications keep using the normal service hostname, and the route table does the rest. Gateway endpoints have no hourly or data charge. They only work for traffic that originates inside the VPC; they cannot be used from on-premises over VPN or Direct Connect, or from a peered VPC.",
   "Interface endpoints are powered by AWS PrivateLink. Each one places an elastic network interface with a private IP address in the subnets you choose, one per AZ for resilience, and a security group controls who can reach it. With private DNS enabled, the service's normal hostname, such as `secretsmanager.eu-west-1.amazonaws.com`, resolves to those private IPs inside the VPC, so applications need no code changes. Interface endpoints exist for most AWS services, including S3, and for your own or partner services published as endpoint services behind a Network Load Balancer. They are billed per hour per AZ plus per gigabyte processed. Because they are real IP addresses, they can be reached from on-premises networks over VPN or Direct Connect and from peered or Transit Gateway-connected VPCs.",
   "Endpoint policies are resource-based policies on the endpoint itself that limit what can be done through it. For example, an S3 gateway endpoint policy can allow access only to the company's own buckets, which helps stop data being copied to a personal bucket. The other side of the control is on the resource: a bucket policy can use the `aws:SourceVpce` condition to deny any request that did not come through a specific endpoint, or `aws:SourceVpc` for a specific VPC. Together, endpoint policies and resource policies form a data perimeter: trusted identities, accessing trusted resources, from expected networks.",
   "```\n\"Condition\": {\n  \"StringNotEquals\": { \"aws:SourceVpce\": \"vpce-0a1b2c3d\" }\n}\n```",
   "PrivateLink also solves a networking problem: exposing one service to many consumer VPCs, even in other accounts, without peering whole networks and without worrying about overlapping CIDR ranges. The provider puts the service behind a Network Load Balancer and creates an endpoint service; each consumer creates an interface endpoint in its own VPC and sees only that endpoint, not the provider's network. Traffic flows one way, consumer to provider, which keeps the exposure small.",
   "Consider a worked example. An analytics fleet in private subnets reads terabytes a day from S3 through a NAT gateway, and the NAT processing charges are high. The architect adds an S3 gateway endpoint to the private route tables, with an endpoint policy allowing only the company's data buckets. Traffic now stays on the AWS network, NAT charges for that traffic disappear, and a bucket policy denies requests not coming through the endpoint. The same fleet also calls Secrets Manager and SQS, so the architect adds interface endpoints for those two services in each AZ with private DNS enabled, and removes the NAT gateway once nothing else needs the internet.",
   "Common mistakes: expecting a gateway endpoint to work from on-premises or a peered VPC; forgetting to associate the gateway endpoint with every private route table; creating an interface endpoint in only one AZ; leaving the endpoint's security group closed to the application on port 443; and assuming an endpoint policy grants access by itself, when IAM and resource policies must still allow the call.",
   "Exam questions usually hinge on where the traffic comes from and which service it targets. 'S3 or DynamoDB from inside the VPC at the lowest cost' points to a gateway endpoint. 'Any other service privately', 'access from on-premises' or 'share a service with many VPCs or accounts with overlapping CIDRs' points to an interface endpoint and PrivateLink. 'Ensure the bucket can only be reached from our VPC' points to a bucket policy with `aws:SourceVpce` or `aws:SourceVpc`."
  ],
  "terms": [
   [
    "VPC endpoint",
    "A private connection from a VPC to a supported AWS or partner service without using the internet."
   ],
   [
    "Gateway endpoint",
    "A route-table target that gives private, free access to S3 or DynamoDB from within a VPC."
   ],
   [
    "Interface endpoint",
    "A PrivateLink network interface with private IPs in your subnets that fronts an AWS or partner service."
   ],
   [
    "AWS PrivateLink",
    "The technology that exposes a service through interface endpoints in consumer VPCs without peering."
   ],
   [
    "Endpoint policy",
    "A resource policy on a VPC endpoint that restricts which actions and resources can be reached through it."
   ],
   [
    "aws:SourceVpce",
    "A condition key that matches the ID of the VPC endpoint a request came through."
   ]
  ],
  "example": "A software company sells a monitoring service to 300 customers, many of whom use the same 10.0.0.0/16 range. Instead of VPC peering, which fails with overlapping CIDRs, it places the service behind a Network Load Balancer and publishes it as a PrivateLink endpoint service. Each customer creates an interface endpoint in its own VPC after the company accepts the connection request, and traffic reaches the service privately without either side exposing its network.",
  "tip": "S3 or DynamoDB, from inside the VPC, lowest cost: gateway endpoint. Any other service, or access from on-premises, or sharing a service with other VPCs: interface endpoint (PrivateLink).",
  "check": [
   [
    "On-premises servers connected by Direct Connect need private access to S3. Can they use a gateway endpoint?",
    "No. Gateway endpoints only serve traffic originating in the VPC. Use an S3 interface endpoint, which has private IPs reachable over Direct Connect."
   ],
   [
    "How do you ensure a bucket is reachable only through a specific VPC endpoint?",
    "Add a bucket policy that denies requests when aws:SourceVpce does not equal that endpoint's ID."
   ],
   [
    "Which two services support gateway endpoints?",
    "Amazon S3 and Amazon DynamoDB; every other service uses interface endpoints."
   ],
   [
    "An app in a private subnet calls Secrets Manager and fails after the NAT gateway is removed. What fixes it without internet access?",
    "Create a Secrets Manager interface endpoint in the app's subnets with private DNS enabled and a security group allowing HTTPS from the app."
   ]
  ]
 },
 {
  "t": "Protecting the edge: AWS WAF, Shield Standard vs Shield Advanced, and CloudFront with origin access control",
  "body": [
   "The edge is where your application meets the internet, and it is the best place to stop bad traffic before it reaches your servers. AWS offers three services that work together there: AWS WAF for application-layer filtering, AWS Shield for distributed denial of service (DDoS) protection, and Amazon CloudFront, the content delivery network (CDN) that serves and filters traffic at a global network of edge locations. Understanding which layer each one covers lets you answer most edge-security questions quickly.",
   "AWS WAF is a web application firewall. You create a web access control list (web ACL) and associate it with a CloudFront distribution, an Application Load Balancer, an API Gateway REST API, an AppSync GraphQL API, a Cognito user pool or certain other supported services. It inspects HTTP(S) requests at layer 7 and applies rules in priority order: AWS managed rule groups for common threats such as SQL injection and cross-site scripting (XSS) and known bad inputs, IP set rules to block or allow address ranges, geographic match rules, regular expression and header matches, and rate-based rules that block a source sending too many requests in a time window. Rules can block, allow, count (to test safely) or present a CAPTCHA or challenge. WAF cannot be attached to a Network Load Balancer or directly to an EC2 instance.",
   "AWS Shield Standard is automatic and included for every AWS customer at no extra charge. It protects against the most common network and transport layer (layer 3 and 4) attacks, such as SYN floods and UDP reflection. Shield Advanced is a paid subscription for higher protection on specific resources: CloudFront distributions, Route 53 hosted zones, Global Accelerator accelerators, Elastic Load Balancers and Elastic IP addresses. It adds detection and mitigation tuned to your traffic, application-layer DDoS mitigation using WAF, near real-time attack visibility, access to the AWS Shield Response Team (SRT) during attacks, AWS WAF at no extra cost for protected resources, and cost protection that credits scaling charges caused by a DDoS attack.",
   "CloudFront itself is a strong defense because attack traffic is spread across many edge locations, and only cache misses reach your origin. To make sure users cannot skip CloudFront and hit an S3 origin directly, use origin access control (OAC). You enable OAC on the distribution, keep the bucket private with Block Public Access on, and add a bucket policy that allows `s3:GetObject` only when the principal is `cloudfront.amazonaws.com` and `aws:SourceArn` equals your distribution's ARN. OAC replaces the older origin access identity (OAI) and supports objects encrypted with SSE-KMS. For custom origins such as an ALB, common patterns are to have CloudFront add a secret custom header that the ALB requires, and to allow only the CloudFront managed prefix list in the ALB's security group.",
   "Consider a worked example. A retail site sees bots hammering its login page and a scraper copying product pages. The team attaches a WAF web ACL to its CloudFront distribution with the AWS managed core rule set, a rate-based rule scoped to the `/login` path, and a geographic rule blocking countries where the company does not trade. It first runs the new rules in count mode for a day to check for false positives, then switches them to block. Because a major sale is coming, the company also subscribes to Shield Advanced, so the Shield Response Team can help during an attack and any scaling costs caused by one are credited. Product images live in a private S3 bucket that only the distribution can read through OAC.",
   "Common mistakes: expecting WAF to stop a volumetric layer 3 flood (that is Shield's job) or Shield to stop SQL injection (that is WAF's job); trying to put WAF on a Network Load Balancer; leaving an S3 origin public so users can bypass CloudFront and its WAF rules; and using the legacy OAI when a question stresses SSE-KMS support. Another trap is thinking Shield Standard must be enabled; it is always on.",
   "Exam questions use clear signals. 'SQL injection', 'cross-site scripting', 'block requests from certain countries' or 'limit requests per IP' points to AWS WAF. 'Large DDoS attack', 'expert support during an attack' or 'protect against unexpected scaling costs from an attack' points to Shield Advanced. 'Protection against common DDoS at no extra cost' is Shield Standard. 'Users must not access S3 content directly, only through CloudFront' points to origin access control with a private bucket."
  ],
  "terms": [
   [
    "AWS WAF",
    "A layer 7 web application firewall that filters HTTP(S) requests using rules in a web ACL."
   ],
   [
    "Web ACL",
    "The AWS WAF resource that holds rules and is associated with CloudFront, ALB, API Gateway and other supported resources."
   ],
   [
    "Rate-based rule",
    "A WAF rule that blocks source IPs exceeding a request count within a time window."
   ],
   [
    "Shield Standard",
    "Automatic, no-extra-cost protection for all AWS customers against common layer 3 and 4 DDoS attacks."
   ],
   [
    "Shield Advanced",
    "A paid DDoS protection tier with SRT support, advanced detection and DDoS cost protection."
   ],
   [
    "Origin access control (OAC)",
    "A CloudFront feature that signs requests to an S3 origin so the bucket can stay private and accept only that distribution."
   ]
  ],
  "example": "A news site's S3 bucket was public so CloudFront could read it, and researchers noticed they could download unpublished images straight from the bucket URL. The team enables origin access control on the distribution, turns on Block Public Access, and replaces the bucket policy with one that allows reads only from the CloudFront service principal for that distribution's ARN. Direct bucket requests now return access denied while the site keeps working.",
  "tip": "SQL injection, cross-site scripting, rate limiting or geo blocking points to AWS WAF. Large DDoS with expert support and cost protection points to Shield Advanced. Keeping an S3 origin private behind CloudFront points to origin access control.",
  "check": [
   [
    "Can you attach AWS WAF to a Network Load Balancer?",
    "No. WAF works at layer 7 and attaches to CloudFront, ALB, API Gateway REST APIs, AppSync, Cognito user pools and similar services, not NLBs."
   ],
   [
    "Which Shield tier is enabled by default at no extra cost?",
    "Shield Standard, which protects all customers against common layer 3 and 4 DDoS attacks."
   ],
   [
    "What does a bucket policy for OAC check to allow CloudFront reads?",
    "That the principal is the CloudFront service and that aws:SourceArn matches the specific distribution's ARN."
   ],
   [
    "How can you test new WAF rules without blocking real users?",
    "Set the rules to count mode, review the matched requests in logs or metrics, then switch them to block."
   ]
  ]
 },
 {
  "t": "Encryption at rest with AWS KMS: AWS managed vs customer managed keys, key policies, envelope encryption and S3 SSE-S3, SSE-KMS and SSE-C",
  "body": [
   "AWS Key Management Service (KMS) creates and controls the keys used to encrypt data at rest across AWS services such as S3, EBS, RDS, DynamoDB and Secrets Manager. KMS key material never leaves the service unencrypted; KMS performs cryptographic operations inside validated hardware security modules (HSMs), and every use of a key is recorded in AWS CloudTrail. The exam expects you to know which kind of key to choose, how access to keys is controlled, and which S3 encryption option fits a requirement.",
   "There are three ownership models. AWS owned keys are used internally by services across many accounts, and you never see or manage them. AWS managed keys, with aliases like `aws/s3` or `aws/ebs`, are created in your account by a service the first time you use it; you can view them and audit their use in CloudTrail, but you cannot change their key policy, and AWS rotates them automatically. Customer managed keys are created by you: you control the key policy, grants and aliases, can enable automatic rotation, and can disable a key or schedule its deletion after a waiting period. Choose customer managed keys when you need your own access control, cross-account use, or the ability to cut off access instantly by disabling the key. If you need single-tenant HSMs under your exclusive control, AWS CloudHSM is the alternative.",
   "Every KMS key has a key policy, a resource-based policy, and it is the primary access control. Unlike most resources, IAM policies alone cannot grant access to a KMS key unless the key policy allows it; the default key policy does this by giving the account principal access, which delegates to IAM. For cross-account use, the key policy must allow the other account, and that account's IAM policy must also allow the use. Grants provide temporary, programmatic permissions, often created by services such as EBS on your behalf. Separating key administrators (who manage the key) from key users (who encrypt and decrypt) is a common least-privilege pattern.",
   "KMS can encrypt only small payloads directly (up to 4 KB), so services use envelope encryption. The service calls `GenerateDataKey` and receives a plaintext data key plus the same key encrypted under the KMS key. It encrypts the data locally with the plaintext data key, discards that key from memory, and stores the encrypted data key alongside the data. To decrypt, it sends the encrypted data key to KMS, gets the plaintext data key back and decrypts locally. Bulk data never travels to KMS, which keeps it fast, and control still rests with whoever may call `Decrypt` on the KMS key.",
   "Amazon S3 offers several server-side encryption choices. SSE-S3 uses keys managed entirely by S3 and is applied by default to new objects. SSE-KMS uses a KMS key, adding key policy control, CloudTrail records of key use, and the ability to disable the key; at high request rates, S3 Bucket Keys reduce the number of KMS calls and their cost. DSSE-KMS applies two layers of KMS-based encryption for workloads that require dual-layer encryption. SSE-C uses a key the customer supplies with every request over HTTPS; S3 uses it and discards it, so you must manage it and never lose it. Client-side encryption, where data is encrypted before upload, is the choice when AWS must never see plaintext.",
   "Consider a worked example. A healthcare company must prove who used the keys protecting patient files and must be able to revoke access instantly. It creates a customer managed KMS key, names only the application role as a key user in the key policy, sets the bucket's default encryption to SSE-KMS with an S3 Bucket Key, and adds a bucket policy that denies uploads not using that key. During an incident, the security team disables the key; every read of those objects fails immediately, even for administrators with full S3 permissions, until the key is re-enabled.",
   "Common mistakes: trying to share an encrypted snapshot or bucket across accounts with an AWS managed key, whose policy you cannot edit; assuming an IAM Allow is enough when the key policy does not permit it; scheduling a key for deletion without realizing data encrypted under it becomes unrecoverable; choosing SSE-C when the requirement is audit of key use; and forgetting that SSE-KMS adds KMS request costs and throttling risk that Bucket Keys reduce.",
   "Exam questions map cleanly to choices. 'Audit who used the key', 'control the key policy', 'disable the key' or 'cross-account encrypted sharing' points to a customer managed key and SSE-KMS. 'Customer must supply and hold the key' points to SSE-C. 'Simplest, no key management' points to SSE-S3. 'Encrypt large data with KMS' points to envelope encryption with `GenerateDataKey`, and 'dedicated, single-tenant HSM' points to CloudHSM."
  ],
  "terms": [
   [
    "AWS KMS",
    "The managed service that creates, stores and controls encryption keys and logs their use in CloudTrail."
   ],
   [
    "AWS managed key",
    "A KMS key created in your account by an AWS service, auditable but with a key policy you cannot change."
   ],
   [
    "Customer managed key",
    "A KMS key you create and control, including its key policy, rotation, disabling and deletion."
   ],
   [
    "Key policy",
    "The resource-based policy on a KMS key that is the primary control over who can use and manage it."
   ],
   [
    "Envelope encryption",
    "Encrypting data with a data key, then encrypting that data key with a KMS key."
   ],
   [
    "SSE-KMS",
    "S3 server-side encryption using a KMS key, with auditable key use and key-policy control."
   ],
   [
    "S3 Bucket Key",
    "A bucket-level data key that reduces the number of KMS calls, and cost, for SSE-KMS."
   ]
  ],
  "example": "A company must copy encrypted RDS snapshots to a separate backup account. The snapshots were encrypted with the aws/rds AWS managed key, so sharing fails. The team creates a customer managed key whose key policy allows the backup account to use it, copies each snapshot while re-encrypting it with that key, and then shares the copies. In the backup account, an IAM policy lets the restore role use the shared key.",
  "tip": "Audit of key usage, control of the key policy or the ability to disable the key: SSE-KMS with a customer managed key. The customer must supply and hold the key themselves: SSE-C. Simplest with no key management: SSE-S3.",
  "check": [
   [
    "Why can't you share an EBS snapshot encrypted with the aws/ebs AWS managed key with another account?",
    "Because you cannot edit an AWS managed key's policy to grant another account access. Re-encrypt with a customer managed key and share that key."
   ],
   [
    "What does GenerateDataKey return?",
    "A plaintext data key for local encryption and a copy of that data key encrypted under the KMS key, to be stored with the data."
   ],
   [
    "An IAM policy allows kms:Decrypt on a key, but calls are denied. What is the likely cause?",
    "The key policy does not allow the account principal or that role, and IAM cannot grant KMS access unless the key policy permits it."
   ],
   [
    "A workload using SSE-KMS makes many S3 requests and sees high KMS costs. What helps?",
    "Enable S3 Bucket Keys, which reduce the number of requests from S3 to KMS."
   ]
  ]
 },
 {
  "t": "Encryption in transit: ACM certificates, TLS on ALB and CloudFront, and enforcing HTTPS with aws:SecureTransport",
  "body": [
   "Encryption in transit protects data as it moves between clients and services, and between services themselves, so that anyone who can observe the network cannot read or alter it. On AWS that almost always means Transport Layer Security (TLS), the protocol behind HTTPS. To offer TLS you need an X.509 certificate for your domain, and AWS Certificate Manager (ACM) is the service that provides and manages them. The exam tests where certificates can live, where TLS is terminated, and how to force clients to use it.",
   "ACM issues public certificates for use with integrated services at no extra charge, validates domain ownership by DNS (a CNAME record, which Route 53 can create for you) or by email, and renews them automatically as long as the DNS validation record stays in place. ACM certificates can be deployed to Elastic Load Balancing, Amazon CloudFront, API Gateway and other integrated services, and AWS manages the private key for you. The classic design, and the usual exam answer, is to terminate TLS on one of those integrated services rather than installing certificates on your own EC2 web servers. You can also import third-party certificates into ACM, but ACM does not renew imported ones, so you must track their expiry. ACM certificates are regional resources, with one important exception: a certificate used by CloudFront must be requested or imported in the US East (N. Virginia) Region, `us-east-1`. For internal names, AWS Private Certificate Authority issues private certificates.",
   "The common pattern is TLS termination at the load balancer. An Application Load Balancer (ALB) HTTPS listener uses an ACM certificate, decrypts traffic, applies routing rules and forwards to targets over HTTP or, when end-to-end encryption is required, re-encrypts over HTTPS to the targets. A security policy on the listener sets the allowed TLS versions and cipher suites, so you can require modern versions. Server Name Indication (SNI) lets one listener hold several certificates for different domains. An HTTP listener on port 80 can use a redirect action to send users to HTTPS on 443. A Network Load Balancer (NLB) can terminate TLS with a TLS listener, or pass TCP traffic through so the targets terminate it themselves when they must hold the certificate. CloudFront has two TLS legs. The viewer protocol policy controls the connection from users: allow all, redirect HTTP to HTTPS, or HTTPS only. The origin protocol policy controls CloudFront's connection to the origin: HTTP only, HTTPS only, or match viewer. For full end-to-end encryption you require HTTPS on both legs, and the origin's certificate must be valid for the origin's domain name.",
   "To enforce encryption on S3 and other services with resource policies, use the `aws:SecureTransport` condition key, which is true when a request arrived over TLS. The same idea works in SQS and SNS policies. For databases, RDS supports TLS connections and a parameter can require them, such as `rds.force_ssl` for PostgreSQL or `require_secure_transport` for MySQL.",
   "```\n{\n  \"Effect\": \"Deny\",\n  \"Principal\": \"*\",\n  \"Action\": \"s3:*\",\n  \"Resource\": [\"arn:aws:s3:::example-bucket\", \"arn:aws:s3:::example-bucket/*\"],\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n}\n```",
   "Consider a worked example. A company serves its site through CloudFront with an ALB origin in eu-west-1. It requests an ACM certificate for `www.example.com` in us-east-1 for CloudFront and a second certificate in eu-west-1 for the ALB, validating both with DNS records in Route 53. It sets the viewer protocol policy to redirect HTTP to HTTPS and the origin protocol policy to HTTPS only, attaches a modern TLS security policy to the ALB listener, and adds a bucket policy with the deny statement above to its assets bucket. Traffic is now encrypted from the browser all the way to the load balancer, and nobody can read the bucket over plain HTTP.",
   "Common mistakes: requesting the CloudFront certificate in the wrong Region; expecting ACM to renew an imported certificate; assuming TLS to the ALB means traffic to the targets is encrypted too; and looking for an 'enforce HTTPS' checkbox on S3 instead of writing a bucket policy.",
   "Exam questions give clear signals. 'Certificate cannot be selected in CloudFront' points to us-east-1. 'Automatic renewal with minimal management' points to an ACM certificate on an integrated service. 'Reject unencrypted requests to a bucket, queue or topic' points to a Deny with `aws:SecureTransport` set to false. 'Multiple domains on one load balancer' points to SNI, and 'end-to-end encryption' means HTTPS from the load balancer or CloudFront to the targets as well."
  ],
  "terms": [
   [
    "TLS",
    "Transport Layer Security, the protocol that encrypts and authenticates network connections such as HTTPS."
   ],
   [
    "AWS Certificate Manager (ACM)",
    "A service that issues, stores and automatically renews TLS certificates for integrated AWS services."
   ],
   [
    "TLS termination",
    "Decrypting TLS at a front-end component such as a load balancer before passing the request on."
   ],
   [
    "Server Name Indication (SNI)",
    "A TLS extension that lets one listener serve different certificates for different host names."
   ],
   [
    "Viewer protocol policy",
    "The CloudFront setting that controls whether viewers may use HTTP, are redirected to HTTPS or must use HTTPS."
   ],
   [
    "aws:SecureTransport",
    "A condition key that is true when the request was sent over TLS."
   ]
  ],
  "example": "A payments team must show auditors that card data is encrypted everywhere in transit. It fronts the API with an ALB using an ACM certificate and a security policy allowing only modern TLS versions, re-encrypts traffic to the targets over HTTPS, sets `rds.force_ssl` on its PostgreSQL database, and adds aws:SecureTransport deny statements to its S3 bucket and SQS queue policies so any unencrypted request is refused and appears in CloudTrail.",
  "tip": "A CloudFront certificate must be in us-east-1. Enforcing HTTPS on an S3 bucket is a bucket policy that denies requests where aws:SecureTransport is false, not a setting on the bucket.",
  "check": [
   [
    "You created an ACM certificate in eu-west-1 but cannot select it in CloudFront. Why?",
    "CloudFront only uses ACM certificates from us-east-1. Request or import the certificate there."
   ],
   [
    "How do you make an S3 bucket reject HTTP requests?",
    "Add a bucket policy that denies all S3 actions when aws:SecureTransport is false."
   ],
   [
    "An imported certificate in ACM expired and the site broke. Why did ACM not renew it?",
    "ACM only renews certificates it issued; imported certificates must be renewed and re-imported by you."
   ],
   [
    "How does one ALB listener serve certificates for three different domains?",
    "It holds multiple certificates and uses Server Name Indication to present the right one for each requested host name."
   ]
  ]
 },
 {
  "t": "Secrets management: Secrets Manager rotation vs Systems Manager Parameter Store SecureString",
  "body": [
   "Applications need database passwords, API keys and tokens. Hard-coding them in source code, Amazon Machine Images (AMIs), container images or environment files is a classic security failure: secrets end up in version control, logs and backups, anyone who can read the artifact can read the secret, and changing a secret means redeploying. The fix is to store secrets in a managed service, give each application's IAM role permission to read only its own secrets, and fetch them at runtime. AWS gives you two managed places to do this, and the exam asks you to pick between them.",
   "AWS Secrets Manager is built for secrets. It encrypts each secret with a KMS key, controls access with IAM and resource policies, logs access in CloudTrail and, most importantly, rotates secrets automatically on a schedule. For Amazon RDS, Aurora, Redshift and DocumentDB it offers managed rotation: it changes the password in the database and in the secret together, so applications that fetch the secret at runtime keep working. For other secret types, rotation runs a Lambda function you provide or adapt from AWS templates. The rotation process uses staging labels such as `AWSCURRENT` and `AWSPENDING` so the new value is tested before it becomes current. Secrets Manager can also replicate secrets to other Regions for disaster recovery, and RDS can manage the master user password in Secrets Manager for you. It charges per secret per month and per API call.",
   "AWS Systems Manager Parameter Store is a hierarchical store for configuration data, with names such as `/prod/app/db-host`. Parameters come in three types: String, StringList and SecureString. A SecureString is encrypted with a KMS key, either the AWS managed `aws/ssm` key or a customer managed key. Standard parameters have no additional storage charge, and an advanced tier adds larger values and parameter policies such as expiration notifications. That makes Parameter Store attractive for configuration and simple secrets. However, Parameter Store has no built-in rotation; you would have to build it yourself with EventBridge and Lambda.",
   "```\naws ssm get-parameter --name /prod/app/api-key --with-decryption\naws secretsmanager get-secret-value --secret-id prod/app/db\n```",
   "How do you choose? If the requirement mentions automatic rotation, especially of database credentials, or cross-Region replication of secrets, choose Secrets Manager. If it is general configuration, feature flags or secrets that rarely change, and cost matters, Parameter Store SecureString is fine. Both integrate with CloudFormation dynamic references, ECS task definitions, EKS and Lambda, so applications can load values at start-up without code that handles plaintext files. Parameter Store can even reference Secrets Manager secrets through the special `/aws/reference/secretsmanager/` path, so one API can read both. Whichever you choose, the application's role needs permission to read the secret and to use the KMS key that encrypts it. Retrieve secrets at runtime and cache them briefly, for example with the AWS Parameters and Secrets Lambda Extension or a client-side caching library, rather than calling the API on every request, which adds latency, cost and throttling risk.",
   "Consider a worked example. A security audit requires that the production database password change every 30 days with no downtime, and it found the password in a `.env` file inside the container image. The team moves the credentials into Secrets Manager, enables managed rotation for the RDS database, and grants the ECS task role `secretsmanager:GetSecretValue` on that one secret. The task definition injects the secret as an environment variable at start-up, and the application reconnects with a fresh value when a login fails. Non-sensitive settings such as the database host name and feature flags go into Parameter Store as plain String parameters under `/prod/app/`.",
   "Common mistakes: storing secrets in plain String parameters instead of SecureString; forgetting the KMS permission, so the role can read the parameter but not decrypt it; caching a secret forever so the application breaks after rotation; baking secrets into AMIs or images; and choosing Parameter Store when the question explicitly requires automatic rotation. Another trap is assuming environment variables alone are secure storage; they are only a delivery mechanism.",
   "The exam's keyword is rotation. 'Automatically rotate database credentials', 'rotate without application changes' or 'replicate secrets to another Region' points to Secrets Manager. 'Store configuration values hierarchically', 'lowest cost' or 'secrets that do not need rotation' points to Parameter Store with SecureString. 'Remove hard-coded credentials from code' points to either service plus an IAM role that reads the value at runtime."
  ],
  "terms": [
   [
    "Secrets Manager",
    "A managed service that stores, encrypts, audits and automatically rotates secrets."
   ],
   [
    "Parameter Store",
    "A Systems Manager feature for hierarchical configuration data and secrets, without built-in rotation."
   ],
   [
    "SecureString",
    "A Parameter Store parameter type whose value is encrypted with a KMS key."
   ],
   [
    "Rotation",
    "Periodically replacing a secret with a new value and updating every place that uses it."
   ],
   [
    "Managed rotation",
    "Secrets Manager rotation for supported databases that needs no custom Lambda code."
   ],
   [
    "Dynamic reference",
    "A CloudFormation template reference that resolves a parameter or secret value at deploy time."
   ]
  ],
  "example": "A company's Lambda functions each held a third-party API key in plain environment variables, visible to anyone with read access to the function configuration. The team stores the key as a Secrets Manager secret with a rotation Lambda that requests a new key from the vendor every quarter, grants each function's execution role read access to that secret only, and has the functions fetch and cache the value for a few minutes, so a rotation takes effect without redeployment.",
  "tip": "The keyword is rotation. Automatic rotation of database credentials points to Secrets Manager; low-cost storage of configuration and static secrets points to Parameter Store SecureString.",
  "check": [
   [
    "Which service rotates RDS credentials automatically without custom code?",
    "AWS Secrets Manager, using managed rotation for RDS."
   ],
   [
    "What encrypts a SecureString parameter?",
    "An AWS KMS key, either the AWS managed aws/ssm key or a customer managed key."
   ],
   [
    "An application can call ssm:GetParameter but receives an error when decrypting a SecureString. What is missing?",
    "Permission to use the KMS key (kms:Decrypt) that encrypts the parameter."
   ],
   [
    "Why should applications not cache a rotated secret indefinitely?",
    "After rotation the old value stops working, so the application must refresh the secret periodically or on authentication failure."
   ]
  ]
 },
 {
  "t": "S3 data protection: Block Public Access, bucket policies, presigned URLs, versioning, MFA Delete and Object Lock modes",
  "body": [
   "Amazon S3 holds a large share of the world's cloud data, and misconfigured buckets are a well-known cause of breaches. S3 gives you layers of protection against two different threats: exposure, meaning the wrong people reading data, and loss, meaning data being deleted or overwritten by mistake, by a bug or by ransomware. The exam asks you to pick the right control for each threat, so it helps to sort every feature into one of those two groups.",
   "For exposure, start with S3 Block Public Access. Its four settings block new public access control lists (ACLs), ignore existing public ACLs, block new public bucket policies and restrict access to buckets with public policies. It can be set at the account level and per bucket, and it overrides any policy or ACL that would make data public. New buckets have it on by default, and ACLs are disabled by default through the Object Ownership setting 'bucket owner enforced', so access is governed by policies alone. Keeping it on at the account level is the simplest way to prevent accidental public buckets.",
   "Bucket policies are resource-based JSON policies that grant or deny access to principals, including other accounts, with conditions such as `aws:SourceIp`, `aws:SourceVpce`, `aws:PrincipalOrgID` (only principals in your organization) or `aws:SecureTransport`. When someone outside your account needs temporary access to one object, use a presigned URL: a URL signed with the credentials of an identity that has access, valid until its expiry time. Anyone holding the URL can perform that one operation, such as GET to download or PUT to upload, without AWS credentials of their own. The URL cannot grant more than the signer's own permissions, and if it was signed with temporary credentials it stops working when they expire.",
   "```\naws s3 presign s3://contracts-bucket/client-42/contract.pdf --expires-in 900\n```",
   "For loss, turn on versioning. With versioning, an overwrite creates a new version and a delete adds a delete marker, so earlier versions can be restored. Once enabled, versioning can be suspended but not turned off. Lifecycle rules can expire old noncurrent versions to control cost. MFA Delete adds a requirement for multi-factor authentication to permanently delete a version or to change the versioning state; only the root user can enable it, using the CLI or API. S3 Object Lock provides write-once-read-many (WORM) protection on versioned buckets. Governance mode protects versions from deletion or overwrite during the retention period, but users with the `s3:BypassGovernanceRetention` permission can override it. Compliance mode cannot be shortened or removed by anyone, including the root user, until the retention period ends. A legal hold protects a version indefinitely, independent of any retention period, until someone with permission removes it.",
   "Consider a worked example. A law firm must keep signed contracts unchanged for seven years to meet a regulation, and clients must be able to download their own documents without AWS accounts. It creates a bucket with Block Public Access on, versioning and Object Lock, and sets a default retention of seven years in compliance mode. The client portal generates presigned URLs that expire after 15 minutes for each download. When litigation starts on one matter, the firm places a legal hold on those contract versions so they stay protected even after the seven years pass, until the hold is removed.",
   "Common mistakes: turning off Block Public Access to share a file with one person, when a presigned URL would do; believing a delete in a versioned bucket destroys data (it only adds a marker); choosing governance mode for a regulation that requires that no one can delete records; expecting to enable MFA Delete from the console or as an IAM administrator; and forgetting that Object Lock requires versioning. Also, replication or versioning alone is not immutability; only Object Lock in compliance mode prevents even privileged users from deleting.",
   "Exam questions use signal words. 'Prevent any bucket in the account from ever becoming public' points to account-level Block Public Access. 'Temporary access to one object for a user without AWS credentials' points to a presigned URL. 'Recover from accidental overwrite or delete' points to versioning. 'WORM', 'regulatory retention' or 'nobody, including root, can delete' points to Object Lock compliance mode; 'administrators can override if needed' points to governance mode. 'Require MFA to permanently delete versions' points to MFA Delete."
  ],
  "terms": [
   [
    "Block Public Access",
    "Account and bucket settings that override any ACL or policy that would make S3 data public."
   ],
   [
    "Presigned URL",
    "A time-limited URL signed with an authorized identity's credentials that grants one S3 operation on one object."
   ],
   [
    "Versioning",
    "An S3 bucket setting that keeps every version of an object so overwrites and deletes can be undone."
   ],
   [
    "MFA Delete",
    "A versioning option, enabled only by the root user, that requires MFA to permanently delete versions or change versioning."
   ],
   [
    "Object Lock compliance mode",
    "A WORM retention mode that nobody, including root, can shorten or remove before it expires."
   ],
   [
    "Object Lock governance mode",
    "A WORM retention mode that users with special bypass permission can override."
   ],
   [
    "Legal hold",
    "An Object Lock flag that prevents a version from being deleted until the hold is removed, with no expiry date."
   ]
  ],
  "example": "A ransomware actor steals an administrator's access keys and tries to delete and overwrite a company's backup files in S3. Because the backup bucket has versioning and Object Lock in compliance mode with a 30-day retention, the deletes only add markers and the overwrites create new versions, while the protected versions cannot be removed. The company rotates the keys and restores the previous versions within hours.",
  "tip": "Governance mode can be bypassed by users with special permission; compliance mode cannot be bypassed by anyone. To give temporary access to one object without creating IAM users, choose a presigned URL.",
  "check": [
   [
    "A user deleted an object in a versioned bucket. How do you recover it?",
    "Delete the delete marker (or copy the previous version back). Versioning kept the earlier version; the delete only added a marker."
   ],
   [
    "Which Object Lock mode lets a privileged administrator remove retention early?",
    "Governance mode, for users with the s3:BypassGovernanceRetention permission. Compliance mode allows no one to do so."
   ],
   [
    "A presigned URL was generated with a user's credentials, but the user lacks s3:GetObject on that object. Will the URL work?",
    "No. A presigned URL can only grant what the signing identity is allowed to do."
   ],
   [
    "Who can enable MFA Delete on a bucket, and how?",
    "Only the bucket owner's root user, using the CLI or API with an MFA device."
   ]
  ]
 },
 {
  "t": "Detection and compliance services: CloudTrail, AWS Config rules, GuardDuty, Inspector, Macie and Security Hub",
  "body": [
   "AWS has several detective services with similar-sounding names, and exam questions often describe a need and ask which service meets it. The trick is to remember the one question each service answers. Together they cover auditing who did what, tracking how resources are configured, spotting threats, finding vulnerabilities, discovering sensitive data, and collecting all of those findings in one place so someone acts on them.",
   "AWS CloudTrail answers who did what, when and from where. It records API calls made in your account, whether from the console, CLI, SDKs or AWS services, including the identity, source IP address, time and parameters. Event history keeps 90 days of management events at no extra charge; a trail delivers events to an S3 bucket for long-term retention and can send them to CloudWatch Logs for metric filters and alarms. An organization trail covers every account in AWS Organizations. Data events, such as S3 object reads or Lambda invocations, are not logged by default and must be enabled, usually selectively because of volume. Log file integrity validation lets you prove the files were not altered, and CloudTrail Lake lets you query events with SQL.",
   "AWS Config answers what did this resource look like, and does it follow our rules. It records configuration changes to supported resources over time, so you can see the full history of a security group, for example, and the relationships between resources. Config rules evaluate resources against desired settings, such as S3 buckets must block public access or EBS volumes must be encrypted, using AWS managed rules or custom rules backed by Lambda or Guard policies. Non-compliant resources can be fixed automatically with remediation actions based on Systems Manager Automation documents. Conformance packs bundle rules for frameworks, and an aggregator shows compliance across accounts and Regions.",
   "Amazon GuardDuty answers is something malicious happening. It is a managed threat detection service that analyzes CloudTrail management events, VPC Flow Logs and DNS query logs, plus optional protection plans for S3 data events, EKS audit logs, runtime monitoring, RDS login activity and malware scanning, using threat intelligence and machine learning. You enable it with a click; no agents or log configuration are required for the foundational sources. Findings include cryptocurrency mining, communication with known malicious IPs and unusual API calls from unexpected locations. Amazon Inspector answers which of my workloads have software vulnerabilities or unintended network exposure, continuously scanning EC2 instances, container images in Amazon Elastic Container Registry (ECR) and Lambda functions for known Common Vulnerabilities and Exposures (CVEs). Amazon Macie answers where is sensitive data in S3, using machine learning and pattern matching to discover personally identifiable information (PII) and other sensitive data, and flags buckets that are public or unencrypted.",
   "AWS Security Hub ties it together. It aggregates findings from GuardDuty, Inspector, Macie, Config, IAM Access Analyzer and partner tools into one view in a standard format, and runs security standards checks such as the AWS Foundational Security Best Practices. Findings flow to Amazon EventBridge, where rules can trigger notifications or automated responses such as a Lambda function that isolates an instance. Amazon Detective, a related service, builds graphs from logs to help investigate the root cause of a finding.",
   "Consider a worked example. After an incident, a security team uses CloudTrail to find which role deleted a security group rule and from which IP address, then uses AWS Config to see the rule set before and after the change. It enables a Config rule with automatic remediation so any security group opening SSH to `0.0.0.0/0` is corrected within minutes. GuardDuty, Inspector and Macie are enabled organization-wide with a security account as delegated administrator, and Security Hub aggregates their findings; an EventBridge rule sends high-severity findings to the on-call channel through SNS.",
   "Common mistakes: expecting CloudTrail to show configuration history (that is Config) or Config to show who made the call (that is CloudTrail); expecting GuardDuty to scan for software vulnerabilities (that is Inspector); expecting Macie to scan databases or EBS volumes rather than S3; and assuming S3 object-level reads appear in CloudTrail without enabling data events. Another trap is thinking Security Hub detects threats itself; it mainly aggregates and checks posture.",
   "Match the clue to the service. 'Who deleted', 'API history' or 'audit trail' points to CloudTrail. 'Configuration history', 'compliance with rules' or 'auto-remediate misconfiguration' points to Config. 'Malicious activity', 'compromised instance' or 'crypto mining' points to GuardDuty. 'Vulnerabilities', 'CVE' or 'patch status of container images' points to Inspector. 'PII in S3' points to Macie. 'Single dashboard of findings across accounts' points to Security Hub, and 'investigate root cause' points to Detective."
  ],
  "terms": [
   [
    "CloudTrail",
    "The service that records API activity in AWS accounts for auditing and investigation."
   ],
   [
    "Data events",
    "High-volume CloudTrail events, such as S3 object reads and writes, that must be enabled explicitly."
   ],
   [
    "AWS Config",
    "The service that records resource configuration history and evaluates compliance with rules."
   ],
   [
    "GuardDuty",
    "A managed threat detection service that analyzes logs to find malicious or unauthorized activity."
   ],
   [
    "Inspector",
    "A service that continuously scans EC2, container images and Lambda functions for known vulnerabilities."
   ],
   [
    "Macie",
    "A service that discovers and classifies sensitive data such as PII in Amazon S3."
   ],
   [
    "Security Hub",
    "A service that aggregates security findings and runs best-practice checks across accounts."
   ]
  ],
  "example": "GuardDuty raises a finding that an EC2 instance is querying a domain associated with cryptocurrency mining. An EventBridge rule matching that finding type triggers a Lambda function that swaps the instance's security group for an isolation group and snapshots its volumes. Investigators then use Detective and CloudTrail to learn that an exposed access key launched the instance, and Inspector shows the image used had an unpatched vulnerability.",
  "tip": "API history: CloudTrail. Configuration history and compliance: Config. Threats: GuardDuty. Vulnerabilities: Inspector. Sensitive data in S3: Macie. Single pane of findings: Security Hub.",
  "check": [
   [
    "Which service would detect an EC2 instance communicating with a known command-and-control server?",
    "Amazon GuardDuty, which analyzes VPC Flow Logs and DNS logs against threat intelligence."
   ],
   [
    "You need to know every change made to a security group's rules over the last month and whether it meets policy. Which service?",
    "AWS Config, which records configuration history and evaluates compliance rules."
   ],
   [
    "Auditors ask who downloaded a specific S3 object last week, but CloudTrail shows nothing. Why?",
    "S3 object-level access is a data event, which CloudTrail does not log unless data events were enabled for that bucket."
   ],
   [
    "Which service scans container images in ECR for known CVEs?",
    "Amazon Inspector."
   ]
  ]
 },
 {
  "t": "Multi-AZ web tiers: Elastic Load Balancing (ALB vs NLB), Auto Scaling groups and ELB health checks",
  "body": [
   "Each AWS Region contains several Availability Zones (AZs): one or more data centers with independent power, cooling and networking, connected to each other by low-latency links. A resilient web tier runs in at least two AZs, so the loss of one data center, or a whole AZ, does not take the application down. Three services make that practical: Elastic Load Balancing (ELB) spreads traffic across healthy targets, Amazon EC2 Auto Scaling keeps the right number of healthy instances running, and health checks tie the two together. This combination appears in a large share of SAA-C03 resilience questions.",
   "An Application Load Balancer (ALB) works at layer 7, the HTTP and HTTPS level. It can route by host name, path, HTTP headers, query strings and source IP, so one ALB can send `/api/*` to one target group and `/images/*` to another. Targets can be EC2 instances, IP addresses (including containers) or Lambda functions. It terminates TLS, supports WebSockets and HTTP/2, can authenticate users through Cognito or an OpenID Connect provider, and integrates with AWS WAF. A Network Load Balancer (NLB) works at layer 4 with TCP, UDP and TLS. It handles very high throughput with very low latency, can preserve the client source IP, and provides one static IP address per AZ, to which you can attach Elastic IPs. Choose the NLB for non-HTTP protocols, static IPs for firewall allowlists, extreme performance, or to expose a service through PrivateLink. A Gateway Load Balancer is a third type, used to insert third-party virtual appliances such as firewalls into the traffic path.",
   "An Auto Scaling group (ASG) launches instances from a launch template across the subnets you choose, keeping the count between a minimum and a maximum around a desired capacity. It balances instances across AZs and, if an AZ fails, launches replacements in the remaining ones. Scaling policies change the desired capacity: target tracking keeps a metric near a value (for example average CPU at 50 percent or request count per target), step scaling reacts to alarm thresholds, scheduled scaling handles known peaks, and predictive scaling forecasts daily patterns. Attaching the ASG to a load balancer target group registers new instances automatically and deregisters terminated ones.",
   "Health checks decide what happens to a bad instance. The load balancer runs its own health check, for example an HTTP GET on `/health` expecting a 200 response, and stops sending traffic to targets that fail. The ASG, by default, uses only EC2 status checks, which catch hardware and operating system failures but not a crashed web server process. Enabling the ELB health check type on the ASG makes it also replace instances that the load balancer marks unhealthy. That setting is a frequent exam answer. A health check grace period gives new instances time to boot before checks count, and connection draining (deregistration delay) lets in-flight requests finish before an instance is removed.",
   "```\naws autoscaling update-auto-scaling-group \\\n  --auto-scaling-group-name web-asg \\\n  --health-check-type ELB --health-check-grace-period 300\n```",
   "Consider a worked example. An online store runs an ALB in front of an ASG spanning three AZs, with a minimum of three instances and a target tracking policy on request count per target. A bad deployment makes the web server on one instance return errors while the operating system stays healthy. The ALB health check fails and traffic moves to the other two instances; because the ASG uses the ELB health check type, it terminates the broken instance and launches a fresh one from the launch template. Session data lives in Amazon ElastiCache, so customers on the failed instance stay logged in, and uploaded images are stored in S3 rather than on local disks.",
   "Common mistakes: running all instances in one AZ; leaving the ASG on EC2 health checks so broken applications keep running; choosing an ALB when clients need fixed IP addresses or UDP; choosing an NLB when the requirement is path-based routing; setting the minimum capacity so low that one AZ failure leaves too few instances for the load; and storing sessions or files on instances, which breaks when the ASG scales in. Sticky sessions exist on the ALB, but they make scaling and failover less even, so they are a workaround rather than a design goal.",
   "Exam wording is predictable. 'Path-based', 'host-based' or 'route to microservices by URL' points to ALB. 'Static IP', 'UDP', 'TCP', 'millions of requests per second' or 'ultra-low latency' points to NLB. 'Third-party firewall appliances' points to Gateway Load Balancer. 'ASG is not replacing instances that the load balancer reports as unhealthy' points to the ELB health check type, and 'survive the loss of an AZ' points to instances spread across multiple AZs with enough minimum capacity."
  ],
  "terms": [
   [
    "Availability Zone",
    "One or more isolated data centers in a Region with independent power and networking."
   ],
   [
    "Application Load Balancer",
    "A layer 7 load balancer that routes HTTP and HTTPS requests by content such as path and host."
   ],
   [
    "Network Load Balancer",
    "A layer 4 load balancer for TCP, UDP and TLS with static IPs per AZ and very high performance."
   ],
   [
    "Auto Scaling group",
    "A set of EC2 instances launched from a template that EC2 Auto Scaling keeps at a desired, healthy count."
   ],
   [
    "Target tracking policy",
    "A scaling policy that adjusts capacity to keep a chosen metric near a target value."
   ],
   [
    "ELB health check type",
    "An Auto Scaling group setting that replaces instances the load balancer reports as unhealthy."
   ]
  ],
  "example": "A gaming company needs a lobby service that speaks a custom UDP protocol, and partner networks must allowlist its addresses. It deploys a Network Load Balancer with an Elastic IP in each of two AZs in front of an Auto Scaling group, and a separate Application Load Balancer for its HTTPS web store that routes `/store/*` and `/account/*` to different target groups. Each ASG uses target tracking and ELB health checks.",
  "tip": "Path-based or host-based routing means ALB. Static IP, UDP or millions of requests per second with ultra-low latency means NLB. If an ASG is not replacing instances that the load balancer says are unhealthy, switch the ASG to the ELB health check type.",
  "check": [
   [
    "A game server uses UDP and clients must allowlist fixed IP addresses. Which load balancer fits?",
    "A Network Load Balancer, which supports UDP and gives a static IP address per AZ (optionally Elastic IPs)."
   ],
   [
    "Why should web servers behind an ASG not keep user sessions in local memory?",
    "Instances can be terminated or added at any time; keeping sessions in ElastiCache or DynamoDB lets any instance serve any user."
   ],
   [
    "By default, what health checks does an Auto Scaling group use?",
    "EC2 status checks only, which miss application failures unless the ELB health check type is enabled."
   ],
   [
    "Which scaling policy keeps average CPU near 50 percent with the least configuration?",
    "A target tracking scaling policy with a CPU utilization target of 50 percent."
   ]
  ]
 },
 {
  "t": "Decoupling with Amazon SQS (standard vs FIFO, visibility timeout, dead-letter queues) and SNS fan-out",
  "body": [
   "Tightly coupled systems fail together: if a web tier calls an order processor directly and the processor slows down or crashes, the web tier backs up and users see errors too. Decoupling puts a durable buffer between components so each can scale, deploy and fail independently. Amazon Simple Queue Service (SQS) and Amazon Simple Notification Service (SNS) are the two classic building blocks, and the exam expects you to know how each behaves under failure.",
   "SQS is a fully managed message queue. Producers send messages; consumers poll for them, process them and delete them. Messages are stored redundantly across multiple AZs and kept for a configurable retention period, up to 14 days. A standard queue offers nearly unlimited throughput with at-least-once delivery and best-effort ordering, so consumers must tolerate duplicates and out-of-order messages, which means designing idempotent processing, for example by recording processed order IDs. A FIFO (first in, first out) queue, whose name must end in `.fifo`, guarantees order within a message group and exactly-once processing within a deduplication interval, at lower throughput than standard queues. Message group IDs let different customers' messages be processed in parallel while each customer's messages stay in order.",
   "When a consumer receives a message, SQS hides it from other consumers for the visibility timeout. If the consumer deletes the message in time, it is gone. If the consumer crashes or takes too long, the message becomes visible again and another consumer retries it. Set the visibility timeout longer than your normal processing time; if processing sometimes runs long, the consumer can extend it with `ChangeMessageVisibility`. Long polling, with a receive wait time of up to 20 seconds, reduces empty responses and cost compared with short polling. A delay queue postpones delivery of new messages, and very large payloads are usually stored in S3 with a pointer in the message.",
   "Some messages will never succeed, perhaps because they are malformed. A dead-letter queue (DLQ) catches them: a redrive policy on the source queue says that after a message has been received a certain number of times (the `maxReceiveCount`), SQS moves it to the DLQ. That keeps poison messages from blocking work and wasting compute, and lets you inspect them, fix the bug, and redrive them back to the source queue later. A FIFO queue's DLQ must also be FIFO. Set a CloudWatch alarm on the DLQ's message count so someone notices.",
   "SNS is a publish-subscribe service. Publishers send a message to a topic, and SNS pushes a copy to every subscriber: SQS queues, Lambda functions, HTTP(S) endpoints, email, SMS or mobile push. SNS itself does not store messages for later polling, so a subscriber that is down can miss a push unless retries and a DLQ are configured. The fan-out pattern combines the two services: publish once to an SNS topic with several SQS queues subscribed, and each downstream system gets its own durable copy to process at its own pace. Subscription filter policies let each subscriber receive only the messages it cares about. The queue's access policy must allow the topic to send to it, and SNS FIFO topics can fan out to SQS FIFO queues when order matters.",
   "Consider a worked example. When an order is placed, the web tier publishes one message to an SNS topic. Three SQS queues subscribe: payment, shipping and analytics, and the analytics subscription uses a filter policy to receive only orders above a certain value. During a flash sale the shipping service falls behind, but its messages wait safely in its queue while payment and analytics keep up. The shipping Auto Scaling group scales on the queue's `ApproximateNumberOfMessagesVisible` metric, and one malformed order that fails five times moves to the shipping DLQ for investigation instead of blocking the queue.",
   "Common mistakes: setting the visibility timeout shorter than processing time, which causes duplicate processing; expecting a standard queue to preserve order; choosing FIFO when the requirement is maximum throughput and order does not matter; subscribing consumers directly to SNS when they need to buffer work during outages; forgetting the queue access policy for the SNS topic; and having no DLQ, so a poison message is retried until retention expires.",
   "Exam questions give strong clues. 'Messages processed more than once' points to the visibility timeout or idempotency. 'Strict order' or 'no duplicates' points to FIFO. 'One event to several independent consumers' points to SNS fan-out to SQS. 'Failed messages must be isolated for later analysis' points to a dead-letter queue. 'Reduce empty receives and cost' points to long polling, and 'scale workers on backlog' points to Auto Scaling on queue depth."
  ],
  "terms": [
   [
    "Standard queue",
    "An SQS queue type with very high throughput, at-least-once delivery and best-effort ordering."
   ],
   [
    "FIFO queue",
    "An SQS queue type that preserves order within a message group and prevents duplicates."
   ],
   [
    "Visibility timeout",
    "The period during which a received SQS message is hidden from other consumers while it is processed."
   ],
   [
    "Dead-letter queue",
    "A queue that receives messages that failed processing more times than the maxReceiveCount."
   ],
   [
    "Long polling",
    "An SQS receive mode that waits up to 20 seconds for messages, reducing empty responses."
   ],
   [
    "Fan-out",
    "Publishing a message once to an SNS topic so that many subscribers, often SQS queues, each receive a copy."
   ],
   [
    "Idempotent processing",
    "Handling a message so that processing it twice has the same effect as processing it once."
   ]
  ],
  "example": "A video platform's upload service used to call the transcoder directly, and uploads failed whenever transcoding was slow. The team puts an SQS standard queue between them, sets the visibility timeout above the longest normal transcode time, adds a dead-letter queue with a maxReceiveCount of three, and scales transcoding instances on queue depth. Uploads now always succeed immediately, and the transcoders catch up after peaks.",
  "tip": "Messages processed twice usually means the visibility timeout is shorter than processing time. Strict order and no duplicates means FIFO. One event delivered to several independent consumers means SNS fan-out to SQS.",
  "check": [
   [
    "A consumer takes 90 seconds per message but the visibility timeout is 30 seconds. What happens?",
    "The message becomes visible again before it is deleted, so another consumer processes it too, producing duplicates. Raise the visibility timeout above the processing time."
   ],
   [
    "How do you stop one malformed message from being retried forever?",
    "Configure a dead-letter queue with a redrive policy and a maxReceiveCount."
   ],
   [
    "What must the name of a FIFO queue end with?",
    "The suffix .fifo."
   ],
   [
    "Why subscribe SQS queues to an SNS topic instead of subscribing the services directly?",
    "Each queue stores its own durable copy, so a slow or unavailable consumer can catch up later without losing messages."
   ]
  ]
 },
 {
  "t": "Event-driven and serverless patterns: EventBridge, Lambda, Step Functions and API Gateway",
  "body": [
   "Serverless services run your code and route your events without you managing servers. They scale automatically, including down to zero, and you pay for use rather than for idle capacity. Event-driven design means components react to events, such as an object uploaded or an order placed, instead of calling each other directly, which keeps them loosely coupled. On the exam, serverless is often the answer when a question stresses the least operational overhead, unpredictable or spiky traffic, or paying nothing when idle. AWS Lambda runs functions in response to events: an API request, a new object in S3, a message in SQS, a record in a DynamoDB stream or Kinesis stream, or a schedule. You choose the memory size, which also sets the CPU share, and a timeout of up to 15 minutes. Each function has an execution role that grants its AWS permissions. Lambda scales by running more concurrent copies; reserved concurrency guarantees and caps capacity for one function, which also protects a downstream database from being overwhelmed, and provisioned concurrency keeps instances initialized to avoid cold-start latency. Asynchronous invocations can send failures to a destination or DLQ. Lambda can run in a VPC to reach private resources such as RDS, often through RDS Proxy to pool connections. Anything that runs longer than 15 minutes or needs a persistent process belongs on containers, AWS Batch or EC2 instead.",
   "Amazon API Gateway puts an HTTPS front door on your back ends, most often Lambda. REST APIs offer the richest features, such as API keys and usage plans, request validation, response caching and AWS WAF integration. HTTP APIs are simpler and lower cost, with JWT authorizers built in. WebSocket APIs support two-way, long-lived connections such as chat. API Gateway handles authorization with IAM, Cognito user pools or Lambda authorizers, and throttling limits protect your back end from bursts. Edge-optimized endpoints use CloudFront; regional and private endpoints are also available.",
   "Amazon EventBridge is a serverless event bus. AWS services, your applications and software as a service (SaaS) partners send events to a bus; rules match events by pattern and route them to targets like Lambda, SQS, SNS, Step Functions, API destinations or another account's bus. EventBridge Scheduler and scheduled rules replace cron servers, and archive and replay help recover from bugs. Compared with SNS, EventBridge offers content-based filtering on any event field, many more target types and third-party event sources; SNS offers higher fan-out throughput and delivery to email, SMS and mobile push.",
   "```\n{\n  \"source\": [\"aws.ec2\"],\n  \"detail-type\": [\"EC2 Instance State-change Notification\"],\n  \"detail\": { \"state\": [\"stopped\"] }\n}\n```",
   "AWS Step Functions coordinates multi-step workflows as state machines defined in Amazon States Language. Each state can invoke Lambda or call many AWS services directly, with built-in retries, error catching, parallel branches, choices, maps over lists and waits. Standard workflows can run for up to a year, record full history and suit long-running business processes, including waiting for human approval with a task token; Express workflows suit high-volume, short event processing.",
   "Consider a worked example. An insurance claim app accepts uploads through API Gateway and Lambda. A Step Functions Standard workflow then extracts data, checks for fraud in parallel with a policy lookup, waits for an adjuster's approval, and pays out, retrying failed steps with backoff. An EventBridge rule notifies the audit team whenever a claim over a threshold is approved, without the payment code knowing the audit team exists.",
   "Common mistakes: choosing Lambda for jobs longer than 15 minutes; chaining Lambda functions that call each other synchronously, which multiplies cost and makes errors hard to handle, instead of using Step Functions; running a cron EC2 instance just to trigger scheduled tasks; letting a Lambda function scale without limit against a small database; and forgetting that API Gateway has its own integration timeout, so slow work should be handed off asynchronously to a queue or workflow.",
   "Exam clues map neatly. 'Least operational overhead', 'scale to zero' or 'spiky traffic' points to Lambda and other serverless services. 'Orchestrate multiple steps with retries', 'human approval' or 'long-running workflow' points to Step Functions. 'React to events from AWS services or SaaS applications', 'filter on event content' or 'replace a cron server' points to EventBridge. 'Expose a REST endpoint with throttling, API keys or caching' points to API Gateway, and 'longer than 15 minutes' rules out Lambda."
  ],
  "terms": [
   [
    "AWS Lambda",
    "A serverless compute service that runs functions in response to events, for up to 15 minutes per invocation."
   ],
   [
    "Reserved concurrency",
    "A Lambda setting that guarantees and caps the number of concurrent executions for one function."
   ],
   [
    "Provisioned concurrency",
    "Pre-initialized Lambda execution environments that remove cold-start latency."
   ],
   [
    "Amazon API Gateway",
    "A managed service for creating, securing and throttling REST, HTTP and WebSocket APIs."
   ],
   [
    "Amazon EventBridge",
    "A serverless event bus that routes events to targets based on pattern-matching rules."
   ],
   [
    "AWS Step Functions",
    "A service that orchestrates workflows as state machines with retries, branches and error handling."
   ]
  ],
  "example": "A startup ran a small EC2 instance whose only job was cron: every night it resized uploaded images and emailed a report. The team replaces it with an S3 event notification that triggers a Lambda function on each upload, and an EventBridge Scheduler schedule that starts a Step Functions workflow each night to build and email the report. The instance is deleted, costs drop to near zero on quiet days, and failed steps retry automatically.",
  "tip": "Watch for time limits: a job longer than 15 minutes rules out Lambda. Orchestrating multiple steps with retries points to Step Functions; routing events from AWS services or SaaS apps by content points to EventBridge.",
  "check": [
   [
    "A nightly batch job runs for two hours. Is Lambda a good fit?",
    "No. Lambda invocations are limited to 15 minutes. Use AWS Batch, ECS on Fargate or EC2."
   ],
   [
    "Which service would run a Lambda function whenever any EC2 instance in the account stops?",
    "Amazon EventBridge, with a rule matching EC2 instance state-change events for the stopped state."
   ],
   [
    "A Lambda function overwhelms an RDS database during bursts. Name two fixes.",
    "Set reserved concurrency to cap parallel executions, and use RDS Proxy to pool connections (or buffer work through SQS)."
   ],
   [
    "Which API Gateway type supports two-way persistent connections for a chat app?",
    "A WebSocket API."
   ]
  ]
 },
 {
  "t": "Containers on AWS: ECS vs EKS, and the Fargate vs EC2 launch types",
  "body": [
   "Containers package an application with its dependencies so it runs the same way on a laptop, in testing and in production. They start in seconds and pack densely onto hosts, which makes them a natural fit for microservices. On AWS you make two separate choices: an orchestrator, which schedules, restarts and connects containers, and a capacity model, which decides where they actually run. Container images are usually stored in Amazon Elastic Container Registry (ECR), a private registry integrated with IAM that can scan images for vulnerabilities and replicate them across Regions and accounts.",
   "Amazon Elastic Container Service (ECS) is AWS's own orchestrator. You describe containers in a task definition: the image, CPU and memory, ports, environment variables, secrets from Secrets Manager or Parameter Store, logging configuration and IAM roles. A task is a running instance of that definition. An ECS service keeps a desired number of tasks running, replaces failed ones, spreads them across AZs, performs rolling deployments and registers tasks with a load balancer target group. ECS is simpler to learn and deeply integrated with AWS, which makes it a good answer when a question stresses minimal operational overhead and has no Kubernetes requirement.",
   "Amazon Elastic Kubernetes Service (EKS) runs the Kubernetes control plane for you across multiple AZs, patched and scaled by AWS. You use standard Kubernetes tools such as `kubectl`, Helm charts and YAML manifests, and the same workloads can run on other Kubernetes clusters. Choose EKS when an organization already uses Kubernetes, wants portability across clouds or on-premises (EKS Anywhere extends it to your own hardware), or depends on the Kubernetes ecosystem of operators and add-ons. Pods get AWS permissions through IAM roles for service accounts (IRSA) or EKS Pod Identity, rather than sharing the node's permissions.",
   "Both orchestrators support two capacity models. With the EC2 launch type (in EKS, managed node groups or self-managed nodes), containers run on EC2 instances in your account. You choose instance types, patch or replace the hosts, and manage cluster capacity, often with capacity providers or Karpenter to scale nodes. That gives you control over GPUs, specialized instance types, Reserved Instance, Savings Plans or Spot pricing, and host-level agents. With AWS Fargate there are no instances to manage: you specify CPU and memory per task or pod, AWS runs it on isolated capacity, and you pay for the resources requested while it runs. Fargate Spot and EC2 Spot Instances offer discounted, interruptible capacity for fault-tolerant tasks.",
   "Two ECS details show up often. The task execution role lets the ECS agent pull images from ECR, fetch secrets for injection and write logs to CloudWatch, while the task role gives the application code inside the container its AWS permissions. And ECS services scale their task count with Service Auto Scaling on metrics such as CPU, memory or ALB request count per target, while the EC2 capacity underneath (if any) scales separately through a capacity provider.",
   "Consider a worked example. A startup wants to run a containerized API without managing servers or learning Kubernetes. It pushes images to ECR with scan on push enabled, defines an ECS service on Fargate across three AZs behind an ALB, gives the task role read access to one DynamoDB table, and sets Service Auto Scaling to target 60 percent CPU. A different team at the same company already runs a large Kubernetes platform on-premises with custom operators; it moves to EKS with managed node groups on GPU instances for its machine learning inference pods, keeping its manifests and Helm charts unchanged.",
   "Common mistakes: choosing EKS when the question has no Kubernetes requirement and stresses simplicity; choosing Fargate when the workload needs GPUs or specific host access that Fargate does not offer; mixing up the task role and task execution role; granting permissions to every pod through the node's instance role instead of IRSA or Pod Identity; and forgetting that with the EC2 launch type you still patch and scale the hosts.",
   "Exam clues are consistent. 'Already uses Kubernetes', 'open source tooling' or 'portability across environments' points to EKS. 'Simplest AWS-native container orchestration' points to ECS. 'No servers to manage', 'least operational overhead' or 'pay only for task resources' points to Fargate. 'GPUs', 'control over the host', 'daemon agents on every node' or 'lowest cost for steady, dense workloads with Reserved pricing' points to the EC2 launch type. 'Application inside the container needs S3 access' points to the ECS task role."
  ],
  "terms": [
   [
    "Amazon ECR",
    "A private container image registry integrated with IAM that can scan images for vulnerabilities."
   ],
   [
    "Task definition",
    "The ECS blueprint describing a task's containers, resources, networking and IAM roles."
   ],
   [
    "ECS service",
    "An ECS construct that keeps a desired number of tasks running and integrates with load balancers."
   ],
   [
    "Amazon EKS",
    "A managed Kubernetes service that runs the control plane for you."
   ],
   [
    "AWS Fargate",
    "A serverless compute engine for containers that removes the need to manage EC2 hosts."
   ],
   [
    "ECS task role",
    "The IAM role whose permissions the application inside an ECS task uses."
   ],
   [
    "Task execution role",
    "The IAM role the ECS agent uses to pull images, fetch injected secrets and send logs."
   ]
  ],
  "example": "A retailer runs a nightly inventory reconciliation job in a container that takes about 40 minutes, too long for Lambda. It schedules the job with EventBridge Scheduler to run an ECS task on Fargate Spot, because the job can simply restart if interrupted. The task role allows reading from S3 and writing to DynamoDB, and the execution role pulls the image from ECR and ships logs to CloudWatch. There are no servers to patch and the job costs only the minutes it runs.",
  "tip": "Existing Kubernetes skills or portability: EKS. Simplest AWS-native orchestration: ECS. No servers to manage: Fargate. Need GPUs, host-level control or Reserved pricing on hosts: EC2 launch type.",
  "check": [
   [
    "Which ECS role does application code use to read from DynamoDB?",
    "The task role. The task execution role is for the ECS agent to pull images, fetch secrets and send logs."
   ],
   [
    "What is the main operational difference between Fargate and the EC2 launch type?",
    "With Fargate AWS manages the underlying hosts; with EC2 you provision, patch and scale the container instances yourself."
   ],
   [
    "How should an EKS pod get permission to call S3 without sharing the node's role?",
    "Use IAM roles for service accounts or EKS Pod Identity to map a dedicated IAM role to the pod's service account."
   ],
   [
    "A fault-tolerant batch container should run as cheaply as possible without managing hosts. What fits?",
    "ECS tasks on Fargate Spot, which is discounted, interruptible Fargate capacity."
   ]
  ]
 },
 {
  "t": "Relational database resilience: RDS Multi-AZ, read replicas, Aurora replicas and Aurora Global Database",
  "body": [
   "Amazon Relational Database Service (RDS) runs managed relational databases: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server and Db2, plus Amazon Aurora. AWS handles provisioning, patching, automated backups with point-in-time restore, and failover. The exam tests which feature solves availability, which solves read scaling, and which solves Regional disaster recovery, because they are easy to mix up. Keep three questions in mind: what happens when the primary fails, where read traffic goes, and what happens when a whole Region fails.",
   "RDS Multi-AZ is for high availability. In the classic Multi-AZ DB instance deployment, RDS keeps a standby in another AZ with synchronous replication, so every committed write is on both. The standby does not serve reads. If the primary fails, its AZ has an outage, or during some maintenance, RDS fails over automatically by pointing the database endpoint's DNS name at the standby, usually within a minute or two, so applications reconnect to the same endpoint with no configuration change. The newer Multi-AZ DB cluster deployment, for MySQL and PostgreSQL, has two readable standbys in different AZs and typically faster failover.",
   "Read replicas are for read scaling. RDS copies changes asynchronously to one or more replicas, each with its own endpoint, so you direct reporting and read-heavy queries there and your application must know which endpoint to use. Because replication is asynchronous, replicas can lag slightly, so read-after-write queries should go to the primary. Replicas can be in the same AZ, another AZ or another Region; a cross-Region replica also serves as a disaster recovery copy that you can manually promote to a standalone database. Promotion is not automatic, and it breaks replication. A replica can itself be Multi-AZ.",
   "Amazon Aurora, compatible with MySQL and PostgreSQL, has a different architecture. The cluster volume stores six copies of your data across three AZs and heals itself, and up to 15 Aurora Replicas share that storage, so replica lag is typically very low. The cluster endpoint always points to the writer; the reader endpoint load-balances connections across replicas. Replicas are also failover targets: if the writer fails, Aurora promotes a replica automatically, based on the priority tiers you set. So in Aurora, replicas give both read scaling and high availability. Aurora Serverless adds automatic capacity scaling for variable workloads, and Aurora Auto Scaling can add or remove replicas based on load.",
   "Aurora Global Database extends a cluster across Regions: one primary Region handles writes, and secondary Regions receive storage-level replication with typical lag under a second. Secondary clusters serve low-latency local reads and can be promoted during a Regional outage, giving a recovery point objective (RPO) of seconds and a recovery time objective (RTO) of around a minute. A managed switchover moves the primary Region with no data loss for planned events. That makes it the usual answer for a relational database that must survive a Regional failure with minimal data loss.",
   "Consider a worked example. A reporting dashboard slows down the order database at month end. The team adds two read replicas and points the reporting tool at their endpoints, which fixes performance without touching the primary. Separately, it enables Multi-AZ on the primary so that a hardware failure causes an automatic failover instead of an outage. Later, a new business rule requires recovery from a Region failure within minutes with almost no data loss, and the team migrates to Aurora with a Global Database secondary in another Region, using the reader endpoint for reports.",
   "Common mistakes: sending reads to the classic Multi-AZ standby, which is impossible; choosing Multi-AZ to fix read performance; expecting read replicas to fail over automatically in RDS (promotion is manual); forgetting replica lag when an application must read its own writes; and choosing cross-Region read replicas when the requirement is an RPO of seconds and an RTO of about a minute, which Aurora Global Database meets more directly.",
   "The exam's clue words are dependable. 'High availability', 'automatic failover' or 'survive an AZ failure' points to Multi-AZ. 'Read-heavy', 'reporting queries slow the database' or 'offload reads' points to read replicas. 'Both read scaling and fast automatic failover with up to 15 replicas' points to Aurora Replicas. 'Cross-Region disaster recovery with RPO of seconds' or 'low-latency global reads for a relational database' points to Aurora Global Database."
  ],
  "terms": [
   [
    "Multi-AZ deployment",
    "An RDS configuration with a synchronously replicated standby in another AZ and automatic failover."
   ],
   [
    "Read replica",
    "An asynchronously replicated copy of a database used to offload reads; can be promoted manually."
   ],
   [
    "Replica lag",
    "The delay between a write on the primary and its appearance on an asynchronous replica."
   ],
   [
    "Aurora Replica",
    "A reader instance sharing the Aurora cluster volume that serves reads and is an automatic failover target."
   ],
   [
    "Reader endpoint",
    "An Aurora endpoint that load-balances read connections across the cluster's replicas."
   ],
   [
    "Aurora Global Database",
    "An Aurora configuration that replicates a cluster to secondary Regions with typically sub-second lag."
   ]
  ],
  "example": "An online learning company runs PostgreSQL on a single RDS instance. An AZ outage takes the site down for hours, and exam-week traffic makes queries slow. The team enables Multi-AZ for automatic failover, adds read replicas for the course catalog's read-heavy queries, and routes those queries through a separate reader connection string in the application. The next AZ disruption causes a failover of about a minute instead of an outage.",
  "tip": "Multi-AZ equals availability, not performance; the classic standby cannot serve reads. Read replicas equal read performance, with asynchronous replication. Cross-Region relational DR with RPO of seconds equals Aurora Global Database.",
  "check": [
   [
    "Can you send read queries to the standby in a classic RDS Multi-AZ instance deployment?",
    "No. The standby exists only for failover. Use read replicas (or a Multi-AZ DB cluster with readable standbys) for reads."
   ],
   [
    "What happens to an Aurora cluster when its writer instance fails?",
    "Aurora automatically promotes an Aurora Replica to be the new writer, and the cluster endpoint points to it."
   ],
   [
    "Is an RDS read replica promoted automatically when the primary fails?",
    "No. Promotion is a manual action that makes the replica a standalone database and ends replication."
   ],
   [
    "Why might a user not see an update right after saving it when reads go to a replica?",
    "Replication to read replicas is asynchronous, so a short lag can exist; read-after-write queries should go to the primary."
   ]
  ]
 },
 {
  "t": "DynamoDB resilience: global tables, point-in-time recovery and on-demand backups",
  "body": [
   "Amazon DynamoDB is a fully managed, serverless key-value and document database that delivers consistent single-digit millisecond performance at almost any scale. Resilience is built in: every table's data is automatically replicated across multiple Availability Zones in its Region, so you do not configure Multi-AZ as you do with RDS. What you do choose is how to handle two other risks: a whole-Region problem, and data being corrupted or deleted by people or bugs. Those two risks need different tools, and confusing them is the most common exam trap.",
   "Global tables handle Regional resilience and global latency. You add replica Regions to a table, and DynamoDB replicates changes among them, typically within a second or so. Every replica accepts reads and writes (active-active), so users in each Region get local latency and an application can keep running in another Region if one becomes unavailable. By default replication is asynchronous, and when the same item is written in two Regions at almost the same time, conflicts are resolved by last writer wins; a newer multi-Region strong consistency option exists for workloads that cannot accept that. Global tables use DynamoDB Streams to replicate changes. Because each Region holds a full writable copy, pair global tables with Route 53 latency or failover routing so users reach the nearest healthy Region, and design the application so a user's writes normally go to one Region, which keeps conflicts rare.",
   "Replication does not protect you from bad writes, because a mistaken delete or corrupt update replicates everywhere just as quickly. For that you need backups. Point-in-time recovery (PITR), once enabled, keeps continuous backups and lets you restore the table to any second within its recovery window, which can be up to 35 days. On-demand backups are full backups you take manually or on a schedule and keep until you delete them, useful for long-term retention and compliance. Neither kind of backup consumes table capacity or affects performance, and both are taken without any downtime, so there is little reason not to enable PITR on every production table.",
   "```\naws dynamodb update-continuous-backups --table-name Orders \\\n  --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true\n```",
   "Restores always create a new table; they never overwrite the existing one. After a restore, you must reconfigure some settings on the new table, such as auto scaling policies, IAM policies, CloudWatch alarms, tags, Streams and TTL settings, and point your application at it or copy the correct items back. AWS Backup can also manage DynamoDB backups centrally, adding cross-Region and cross-account copies, lifecycle to cold storage and Vault Lock for immutability. You can also export a table to S3 from PITR data for analytics without affecting the table. Two related features matter for recovery and auditing: DynamoDB Streams captures item-level changes for 24 hours, which Lambda can process for audit trails, and Time to Live (TTL) deletes expired items automatically, so TTL deletions are expected rather than an incident.",
   "Consider a worked example. A bug in a release overwrote thousands of customer profiles at 14:05. Because PITR was enabled, the team restored the table as of 14:04 to a new table, compared the two, and wrote a short script that copied the correct items back into the live table, so the application never changed its table name. The same table is a global table in two Regions so the customer app stays available if one Region has an outage, and a weekly on-demand backup is copied to a separate account by AWS Backup for long-term retention.",
   "Common mistakes: believing global tables protect against accidental deletion; expecting a restore to overwrite the source table; forgetting to enable PITR before an incident (it cannot recover changes from before it was turned on); assuming PITR keeps data forever rather than for its recovery window; and adding Multi-AZ configuration to DynamoDB, which is unnecessary because it is built in.",
   "Exam wording separates the tools clearly. 'Multi-Region', 'active-active', 'low-latency reads and writes for global users' or 'survive a Regional outage' points to global tables. 'Restore to a specific second', 'accidental delete or corruption in the last days' points to point-in-time recovery. 'Keep backups for years', 'compliance archive' or 'cross-account backup copies' points to on-demand backups or AWS Backup. 'Process every item change' points to DynamoDB Streams."
  ],
  "terms": [
   [
    "Global table",
    "A DynamoDB table replicated across multiple Regions, with every replica accepting reads and writes."
   ],
   [
    "Last writer wins",
    "The default conflict resolution rule in global tables where the most recent write to an item prevails."
   ],
   [
    "Point-in-time recovery (PITR)",
    "Continuous DynamoDB backups allowing restore to any second in the recovery window of up to 35 days."
   ],
   [
    "On-demand backup",
    "A full, manually created DynamoDB backup retained until you delete it."
   ],
   [
    "DynamoDB Streams",
    "A time-ordered log of item-level changes kept for 24 hours for processing by consumers such as Lambda."
   ],
   [
    "Time to Live (TTL)",
    "A DynamoDB feature that automatically deletes items after a timestamp attribute expires."
   ]
  ],
  "example": "A mobile game stores player inventories in DynamoDB. Players in Europe and North America complained about latency, and an outage in one Region once stopped all play. The team converts the table into a global table with replicas in two Regions and routes players to the nearest Region with Route 53 latency routing. It also enables PITR, because a cheat exploit once corrupted items and replication spread the damage to every Region within seconds.",
  "tip": "Replication is not backup: global tables copy mistakes too. For recovering from accidental deletion or corruption to an exact moment, choose point-in-time recovery; restores always go to a new table.",
  "check": [
   [
    "An engineer accidentally deleted items 10 minutes ago. The table is a global table in three Regions. Can another Region's replica help?",
    "No. The deletes replicated to every Region. Restore with point-in-time recovery or a backup instead."
   ],
   [
    "Does a DynamoDB restore overwrite the source table?",
    "No. Restores always create a new table, which you then configure and point the application at or copy items from."
   ],
   [
    "Do you need to configure Multi-AZ for a DynamoDB table?",
    "No. DynamoDB automatically replicates data across multiple AZs in its Region."
   ],
   [
    "Which option keeps DynamoDB backups for several years for compliance?",
    "On-demand backups, optionally managed and copied by AWS Backup, which are retained until deleted."
   ]
  ]
 },
 {
  "t": "Route 53 routing policies and health checks: failover, weighted, latency, geolocation and multivalue",
  "body": [
   "Amazon Route 53 is AWS's Domain Name System (DNS) service. It registers domains, hosts public and private hosted zones, and answers DNS queries from a global network, backed by a 100 percent availability service level agreement. What makes it an architecture tool rather than just a phone book is its routing policies, which decide which answer a resolver gets, and its health checks, which remove unhealthy endpoints from those answers. Together they let you steer users between AZs, Regions and even clouds.",
   "Records come in the usual DNS types, such as A, AAAA, CNAME and MX, plus alias records, a Route 53 extension. An alias record points a name at an AWS resource, such as an ALB, CloudFront distribution, API Gateway API, S3 website endpoint or another record in the same zone, and works at the zone apex (for example `example.com` itself), which a CNAME cannot. Alias targets update automatically when the resource's IP addresses change, and queries to alias records pointing at AWS resources are not charged.",
   "Simple routing returns one record set, with no health checks. Failover routing sets up active-passive: the primary record is returned while its health check passes; if it fails, Route 53 returns the secondary, which is often a static S3 website or a standby Region. Weighted routing splits traffic by relative weight, such as 90 and 10, useful for canary releases, blue/green deployments and gradual migrations. Latency-based routing returns the endpoint in the AWS Region with the lowest measured latency from the user's network. Geolocation routing answers based on the user's continent, country or US state, useful for localization, content rights and legal restrictions; add a default record for locations you do not match, or some users get no answer. Geoproximity routing, set up with traffic flow, routes by distance and lets you shift traffic with a bias. IP-based routing chooses by the client's source network CIDR. Multivalue answer routing returns up to eight healthy records at random, a simple form of client-side load balancing that is not a replacement for a load balancer.",
   "Health checks can monitor an endpoint by IP address or domain name over HTTP, HTTPS or TCP from checkers in several locations, optionally looking for a string in the response body. Calculated health checks combine other checks with AND and OR logic, and health checks can also follow a CloudWatch alarm, which is how you monitor resources in private subnets that the internet-based checkers cannot reach. For alias records pointing at AWS resources such as an ALB, you can instead set Evaluate target health, so Route 53 uses the resource's own health. Remember that DNS answers are cached by resolvers for the record's time to live (TTL), so failover is not instant; lower TTLs speed changes at the cost of more queries.",
   "```\nwww.example.com  A  ALIAS  alb-use1...  Latency: us-east-1   Health check: hc-use1\nwww.example.com  A  ALIAS  alb-euc1...  Latency: eu-central-1 Health check: hc-euc1\n```",
   "Consider a worked example. A company runs its app in two Regions. It uses latency-based alias records so European users reach the Frankfurt deployment and US users reach Virginia, with Evaluate target health on each ALB. When the Virginia deployment fails, Route 53 stops returning it and all users are sent to Frankfurt until it recovers. For a separate video service with licensing limits, it uses geolocation routing so viewers in licensed countries reach the service and a default record returns a page explaining that the content is unavailable elsewhere.",
   "Common mistakes: using latency routing when the requirement is legal or content restriction by country; forgetting a default geolocation record; creating a CNAME at the zone apex; expecting multivalue answers to replace a load balancer; configuring failover without health checks, so failover never triggers; and expecting instant failover while the TTL is long.",
   "Exam clues map directly to policies. 'Restrict or localize content by country' points to geolocation. 'Best performance for users in many Regions' points to latency. 'Send 10 percent of traffic to the new version' points to weighted. 'Active-passive disaster recovery' or 'maintenance page when the site is down' points to failover. 'Return several healthy IPs' points to multivalue. 'Point the zone apex at an ALB or CloudFront' points to an alias record, and 'health check a private resource' points to a CloudWatch alarm-based health check."
  ],
  "terms": [
   [
    "Hosted zone",
    "A Route 53 container for the DNS records of a domain, either public or private to VPCs."
   ],
   [
    "Alias record",
    "A Route 53 record that points to an AWS resource, works at the zone apex and has no query charge for AWS targets."
   ],
   [
    "Failover routing",
    "An active-passive policy returning the secondary record only when the primary's health check fails."
   ],
   [
    "Weighted routing",
    "A policy that splits DNS answers among records in proportion to assigned weights."
   ],
   [
    "Latency-based routing",
    "A policy that returns the endpoint in the Region with the lowest latency for the user."
   ],
   [
    "Geolocation routing",
    "A policy that returns answers based on the user's geographic location."
   ],
   [
    "Multivalue answer routing",
    "A policy that returns up to eight healthy records chosen at random."
   ]
  ],
  "example": "An online retailer is migrating from an on-premises data center to AWS. It creates weighted records for `shop.example.com`: weight 95 to the data center's IP and 5 to the new ALB, each with a health check. Over two weeks it shifts the weights to 50/50 and then 0/100 while watching error rates, and it keeps a low TTL during the migration so each change takes effect quickly.",
  "tip": "Content must be restricted or localized by country: geolocation, not latency. Best performance for users: latency. Canary or percentage split: weighted. Active-passive DR: failover. The zone apex pointing at an ALB: an alias record.",
  "check": [
   [
    "Why can't you use a CNAME for example.com pointing to an ALB?",
    "DNS does not allow a CNAME at the zone apex. Use a Route 53 alias record instead."
   ],
   [
    "How can Route 53 health-check a resource that has only a private IP?",
    "Create a CloudWatch alarm on a metric for the resource and base the Route 53 health check on that alarm."
   ],
   [
    "Users in an unlisted country get no DNS answer under geolocation routing. What is missing?",
    "A default geolocation record that answers for locations not matched by any other record."
   ],
   [
    "Failover routing is configured, but users keep reaching the failed primary for several minutes. Why?",
    "Resolvers cache the old answer for the record's TTL; a lower TTL shortens how long the stale answer is used."
   ]
  ]
 },
 {
  "t": "Disaster recovery strategies: backup and restore, pilot light, warm standby and multi-site active-active, matched to RPO and RTO",
  "body": [
   "Disaster recovery (DR) is the plan for getting a workload running again after a major event, such as a Region-wide outage, widespread data corruption or a ransomware attack. It differs from high availability, which handles smaller failures like a lost instance or AZ within a Region. Two numbers drive every DR decision. The recovery point objective (RPO) is how much data, measured in time, the business can afford to lose: an RPO of one hour means you can lose at most the last hour of changes. The recovery time objective (RTO) is how long the workload can be down before service is restored. Lower RPO and RTO cost more, so you match the strategy to the business need rather than always choosing the most resilient option.",
   "AWS describes four strategies, from cheapest and slowest to most expensive and fastest. Backup and restore keeps backups, such as EBS snapshots, RDS snapshots, DynamoDB backups and S3 copies, in the recovery Region. In a disaster you redeploy infrastructure, ideally from infrastructure as code such as CloudFormation, restore the data, and switch DNS. RPO is the time since the last backup and RTO is typically hours; cost is lowest because almost nothing runs in the recovery Region.",
   "Pilot light keeps the core data live in the recovery Region, for example a cross-Region database replica and S3 buckets with Cross-Region Replication, while application servers are switched off or not yet created. AMIs and templates are ready. In a disaster you promote the database, start or deploy the application tier, scale it up and switch DNS. RPO is minutes or seconds because data is replicating continuously; RTO is tens of minutes because servers still have to start.",
   "Warm standby runs a complete but scaled-down copy of the whole workload in the recovery Region, able to handle some traffic immediately. In a disaster you scale it to full size, promote the database if needed and shift traffic. RTO is minutes. Because the stack is already running, you can test it continuously with a small share of real traffic, which makes it more dependable than pilot light. Multi-site active-active runs full production in two or more Regions at the same time, with Route 53 or AWS Global Accelerator sending users to each and data replicated with services such as Aurora Global Database or DynamoDB global tables. Losing a Region means the others absorb its traffic; RPO and RTO approach zero, and cost and complexity are highest. A variant called hot standby runs full capacity in the second Region but serves traffic only from the primary.",
   "The key distinction between pilot light and warm standby is whether the application tier is running. In pilot light only data services are live; in warm standby everything is live, just smaller. Between warm standby and active-active, the distinction is whether the second site serves production traffic at full scale all the time. Whatever you choose, test failover regularly with game days, automate the runbook, and remember that replication alone does not protect against corruption or ransomware, because bad writes replicate too; you still need point-in-time backups, ideally immutable ones.",
   "Consider a worked example. An internal HR system can be down for a day and lose a few hours of data, so it uses backup and restore, with AWS Backup copying snapshots to a second Region every four hours and a CloudFormation template ready to rebuild the stack. The customer checkout system must be back in under 10 minutes with almost no data loss, so it runs a warm standby: an Aurora Global Database secondary that can be promoted, a small Auto Scaling group already serving a few percent of traffic through weighted Route 53 records, and a runbook that raises the group's capacity and shifts the weights. Each system's cost matches its business value.",
   "Common mistakes: choosing active-active for every workload regardless of cost; confusing RPO (data loss) with RTO (downtime); calling a setup pilot light when the application servers are already running at reduced size (that is warm standby); forgetting service quotas and AMIs in the recovery Region; and never testing, so the first real failover reveals missing permissions or stale templates.",
   "Exam questions translate numbers and adjectives into strategies. 'Lowest cost' with 'RTO of hours' or 'a day' points to backup and restore. 'Core database replicated, servers off' or 'RTO of tens of minutes at low cost' points to pilot light. 'Scaled-down but fully functional copy' or 'RTO of minutes' points to warm standby. 'Near-zero RTO and RPO' or 'users served from multiple Regions at all times' points to multi-site active-active."
  ],
  "terms": [
   [
    "Disaster recovery",
    "The strategy and processes for restoring a workload after a major event such as a Regional outage."
   ],
   [
    "RPO",
    "Recovery point objective: the maximum acceptable data loss, measured as time before the disaster."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum acceptable time to restore service after a disaster."
   ],
   [
    "Backup and restore",
    "The lowest-cost DR strategy, which restores data and rebuilds infrastructure only after a disaster."
   ],
   [
    "Pilot light",
    "A DR strategy that keeps data replicated in the recovery Region with the application tier off until needed."
   ],
   [
    "Warm standby",
    "A DR strategy that runs a scaled-down but fully functional copy of the workload in the recovery Region."
   ],
   [
    "Multi-site active-active",
    "A DR strategy that serves production traffic from multiple Regions at full scale simultaneously."
   ]
  ],
  "example": "A regional bank's online banking must recover from a Region failure within 30 minutes with no more than a few seconds of data loss, but the budget rules out running two full stacks. The architect chooses pilot light: an Aurora Global Database secondary and replicated S3 buckets run in the second Region, while the application tier exists only as launch templates and CloudFormation stacks with an Auto Scaling group set to zero. A quarterly drill promotes the database, scales the group and switches Route 53 in about 20 minutes.",
  "tip": "Match wording to strategy: lowest cost and hours of RTO is backup and restore; core database running but servers off is pilot light; scaled-down but fully working copy is warm standby; near-zero RTO and RPO is multi-site active-active.",
  "check": [
   [
    "A workload needs RTO under 15 minutes at moderate cost, with the whole stack able to take some traffic immediately. Which strategy?",
    "Warm standby: a scaled-down, fully running copy that you scale up during a disaster."
   ],
   [
    "What is the difference between RPO and RTO?",
    "RPO is how much data (in time) you can lose; RTO is how long the service can be down."
   ],
   [
    "What distinguishes pilot light from warm standby?",
    "In pilot light only the data tier runs in the recovery Region; in warm standby the whole stack runs at reduced capacity."
   ],
   [
    "Why is cross-Region replication alone not a complete DR plan against ransomware?",
    "Corrupted or encrypted data replicates too, so you also need point-in-time, preferably immutable, backups."
   ]
  ]
 },
 {
  "t": "Backup and replication: AWS Backup plans, S3 Cross-Region Replication, EBS snapshot and AMI copies, AWS Elastic Disaster Recovery",
  "body": [
   "Every DR strategy depends on copies of data and machine images being in the right place at the right time. AWS gives you service-specific features, such as snapshots and replication, and a central service to manage backups across many services. The exam usually asks you to pick the option that meets a requirement with the least operational effort, so knowing what each tool covers, and what it does not, is the key skill here. AWS Backup centralizes backups across many services, including EBS, EC2, RDS, Aurora, DynamoDB, EFS, FSx, S3 and Storage Gateway. A backup plan defines rules: how often to back up, the backup window, how long to keep recovery points, when to move them to cold storage, and whether to copy them to another Region or account. Resources are assigned to a plan by tags or resource IDs, so tagging a new database `backup=daily` is enough to protect it. Recovery points are stored in backup vaults, each encrypted with a KMS key and protected by an access policy. AWS Backup Vault Lock can make a vault's retention immutable, protecting backups from deletion even by administrators, which matters for ransomware defense. With AWS Organizations, backup policies apply plans across accounts, and Backup Audit Manager reports on compliance.",
   "Amazon S3 Replication copies objects asynchronously to another bucket. Cross-Region Replication (CRR) sends them to a bucket in a different Region, for disaster recovery, compliance or lower latency; Same-Region Replication (SRR) is used for log aggregation or copies between accounts in the same Region. Both require versioning on the source and destination buckets and an IAM role that S3 uses to replicate, and the destination can use a different storage class or owner. Replication applies to new objects written after the rule is created; existing objects need S3 Batch Replication. Delete markers are not replicated unless you enable it, and permanent deletions of specific versions are never replicated, which protects against malicious deletes. S3 Replication Time Control adds a predictable replication time backed by a service level agreement.",
   "Amazon Elastic Block Store (EBS) snapshots are incremental, point-in-time backups of volumes, stored durably by AWS. You can copy a snapshot to another Region or share it with another account, and encrypt or re-encrypt it during the copy. An Amazon Machine Image (AMI) captures an instance's root and data volume snapshots plus launch settings; AMIs are Regional, so to launch the same server in a recovery Region you copy the AMI there. Amazon Data Lifecycle Manager can automate snapshot and AMI creation, retention and cross-Region copies, and the Recycle Bin can recover snapshots or AMIs deleted by mistake within a retention period you set.",
   "```\naws ec2 copy-image --source-region us-east-1 --source-image-id ami-0abc1234 \\\n  --region us-west-2 --name web-server-dr --encrypted\n```",
   "AWS Elastic Disaster Recovery (AWS DRS) continuously replicates servers, whether physical, virtual or already in the cloud, at the block level into a low-cost staging area in an AWS Region. During a disaster or a non-disruptive drill it launches full recovery instances within minutes, giving an RPO of seconds and an RTO of minutes for many workloads, without running full-size servers all the time. After the event it supports failing back to the original site.",
   "Consider a worked example. A company must keep daily backups of all production EBS volumes, RDS databases and EFS file systems for 35 days, with copies in a second Region that nobody can delete, and it must recover 20 on-premises application servers into AWS within an hour. It creates one AWS Backup plan with a copy rule to the other Region, assigns resources by the tag `env=prod`, and enables Vault Lock on the destination vault. It installs the DRS replication agent on the on-premises servers and runs a quarterly drill that launches recovery instances in an isolated VPC.",
   "Common mistakes: forgetting versioning when setting up CRR; expecting existing objects to replicate automatically; assuming replication protects against deletion of versions or corruption (use versioning, Object Lock or backups); trying to launch an AMI in a Region it was never copied to; sharing a snapshot encrypted with an AWS managed key; and building custom scripts when AWS Backup already covers the services involved.",
   "Exam clues point clearly. 'Centralized', 'tag-based', 'across many services', 'cross-account backup copies' or 'immutable backups' points to AWS Backup and Vault Lock. 'Automatically copy new S3 objects to another Region' points to CRR, with versioning required. 'Replicate existing objects' points to Batch Replication. 'Same server in another Region' points to AMI copy, and 'continuous block-level replication of on-premises servers with RTO in minutes' points to Elastic Disaster Recovery."
  ],
  "terms": [
   [
    "AWS Backup",
    "A central service that schedules, retains and copies backups across many AWS services."
   ],
   [
    "Backup plan",
    "An AWS Backup policy defining backup frequency, retention, lifecycle and copy rules for assigned resources."
   ],
   [
    "Vault Lock",
    "An AWS Backup feature that makes a backup vault's retention settings immutable."
   ],
   [
    "Cross-Region Replication",
    "Asynchronous copying of S3 objects to a bucket in another Region; requires versioning on both buckets."
   ],
   [
    "EBS snapshot",
    "An incremental, point-in-time backup of an EBS volume that can be copied across Regions and accounts."
   ],
   [
    "AMI",
    "An Amazon Machine Image: a Regional template of snapshots and launch settings used to launch instances."
   ],
   [
    "AWS Elastic Disaster Recovery",
    "A service that continuously replicates servers to AWS and launches recovery instances on demand."
   ]
  ],
  "example": "A media company keeps finished videos in an S3 bucket in one Region and must have a copy in another Region within minutes of upload for a compliance audit. It enables versioning on both buckets, creates a CRR rule with Replication Time Control and an IAM role for S3, and runs a one-time S3 Batch Replication job for the videos uploaded before the rule existed. Replication metrics in CloudWatch alert the team if objects fall behind.",
  "tip": "Centralized, tag-based backup across services with cross-Region and cross-account copies: AWS Backup. Automatically copy new S3 objects to another Region: CRR (versioning required). Continuous block-level replication of whole servers for DR: Elastic Disaster Recovery.",
  "check": [
   [
    "You created a CRR rule, but objects uploaded last year are not in the destination bucket. Why?",
    "Replication rules apply to new objects. Use S3 Batch Replication to copy existing objects."
   ],
   [
    "How do you launch the same EC2 image in another Region?",
    "Copy the AMI to that Region, since AMIs are Regional resources, then launch from the copy."
   ],
   [
    "Which feature prevents even administrators from deleting recovery points before their retention ends?",
    "AWS Backup Vault Lock on the backup vault."
   ],
   [
    "What must be enabled on both buckets before configuring S3 Cross-Region Replication?",
    "Versioning, on both the source and destination buckets."
   ]
  ]
 },
 {
  "t": "Resilient hybrid networking: Site-to-Site VPN, Direct Connect with VPN backup, and Transit Gateway",
  "body": [
   "Many companies keep data centers while moving workloads to AWS, so the network link between them becomes critical: if it fails, applications split across both sides stop working. There are two main connection types, an encrypted tunnel over the internet and a dedicated private circuit, and a hub service that ties many networks together. The exam asks you to balance speed of setup, cost, bandwidth, consistency and resilience.",
   "AWS Site-to-Site VPN creates encrypted IPsec (Internet Protocol Security) tunnels over the internet between your on-premises customer gateway device and AWS, ending at a virtual private gateway attached to one VPC or at a Transit Gateway. Each VPN connection includes two tunnels terminating on different AWS endpoints in different AZs, so one tunnel can fail, or be taken down for maintenance, without losing connectivity; you should configure your device to use both. VPN is quick to set up and inexpensive, but throughput per tunnel is limited and latency varies with the internet path. Dynamic routing with the Border Gateway Protocol (BGP) enables automatic failover between tunnels, and accelerated VPN can use the AWS global network through Global Accelerator for a more stable path.",
   "AWS Direct Connect is a dedicated private network connection from your premises, or a colocation facility, to an AWS Direct Connect location. It offers consistent latency and high bandwidth, with dedicated connections at speeds such as 1, 10 and 100 Gbps and hosted connections from partners at lower speeds. Setting up a new connection can take weeks because physical cross-connects are involved. Traffic is carried on virtual interfaces (VIFs): a private VIF reaches VPCs, a public VIF reaches AWS public services such as S3 over the Direct Connect link, and a transit VIF reaches Transit Gateways through a Direct Connect gateway. Direct Connect is not encrypted by default; for encryption you can run an IPsec VPN over it or use MACsec on supported dedicated connections.",
   "One Direct Connect connection is a single point of failure. For critical workloads, AWS recommends connections at more than one Direct Connect location, each terminating on separate devices, for maximum resilience. A cost-effective pattern is Direct Connect as primary with Site-to-Site VPN as backup: BGP prefers the Direct Connect path and fails over to the VPN if it goes down, accepting lower bandwidth and variable latency during the outage. Link aggregation groups (LAGs) bundle several connections at one location for more bandwidth, but they do not protect against the loss of that location.",
   "As VPC counts grow, meshes of VPC peering connections become unmanageable, because peering is not transitive and every pair needs its own connection. AWS Transit Gateway is a regional hub that connects VPCs, VPN connections and Direct Connect gateways in a hub-and-spoke model, with its own route tables to control which attachments can talk to each other, for example keeping development VPCs away from production. Transit Gateways in different Regions can be peered, and they can be shared across accounts with Resource Access Manager. Transit Gateway also supports equal-cost multipath (ECMP) routing across multiple VPN tunnels to increase total VPN bandwidth.",
   "Consider a worked example. A bank connects its data center to 40 VPCs in several accounts. It attaches all VPCs to a shared Transit Gateway, with separate route tables for production and non-production. It connects the data center through two Direct Connect connections at two different Direct Connect locations, using a transit VIF and a Direct Connect gateway, and keeps a Site-to-Site VPN to the Transit Gateway as a last-resort backup. BGP handles failover automatically, and MACsec encrypts the dedicated links to satisfy its regulator.",
   "Common mistakes: expecting Direct Connect to be available in days; assuming Direct Connect traffic is encrypted; treating two connections at the same location as fully resilient; relying on VPC peering for transitive routing through a middle VPC; using only one VPN tunnel; and forgetting that a virtual private gateway serves a single VPC, whereas Transit Gateway serves many.",
   "Exam clues are consistent. 'Connectivity needed this week', 'lowest cost' or 'encrypted over the internet' points to Site-to-Site VPN. 'Consistent latency', 'high bandwidth' or 'large data transfers daily' points to Direct Connect. 'Most cost-effective resilience for Direct Connect' points to a VPN backup; 'maximum resilience' points to multiple connections at multiple locations. 'Many VPCs and on-premises networks with centralized routing' points to Transit Gateway."
  ],
  "terms": [
   [
    "Site-to-Site VPN",
    "An AWS service providing two encrypted IPsec tunnels over the internet between on-premises and AWS."
   ],
   [
    "Customer gateway",
    "The on-premises VPN device, or its AWS representation, at your end of a Site-to-Site VPN."
   ],
   [
    "AWS Direct Connect",
    "A dedicated private network connection between on-premises networks and AWS."
   ],
   [
    "Virtual interface (VIF)",
    "A logical connection on Direct Connect: private, public or transit."
   ],
   [
    "BGP",
    "Border Gateway Protocol, the dynamic routing protocol that advertises routes and enables automatic failover between paths."
   ],
   [
    "Transit Gateway",
    "A regional network hub that connects VPCs and on-premises networks with centralized routing."
   ]
  ],
  "example": "A manufacturer needs AWS connectivity for a new analytics project starting next week, but also wants a stable, high-bandwidth link for nightly transfers of several terabytes. It sets up a Site-to-Site VPN immediately to start the project, orders a Direct Connect connection, and when the circuit is live a few weeks later makes it the primary path with BGP, keeping the VPN as the automatic backup.",
  "tip": "Need connectivity this week or at low cost: Site-to-Site VPN. Consistent, high-bandwidth private link: Direct Connect, which takes longer to provision. Cheapest resilient option for Direct Connect: add a VPN backup. Many VPCs plus on-premises: Transit Gateway.",
  "check": [
   [
    "VPC A peers with B, and B peers with C. Can A reach C through B?",
    "No. VPC peering is not transitive. Peer A and C directly or use a Transit Gateway."
   ],
   [
    "Is traffic over Direct Connect encrypted by default?",
    "No. Add an IPsec VPN over Direct Connect or use MACsec where supported if encryption is required."
   ],
   [
    "Why does each Site-to-Site VPN connection include two tunnels?",
    "They terminate on different AWS endpoints in different AZs, so connectivity survives the loss or maintenance of one tunnel."
   ],
   [
    "What gives maximum resilience for Direct Connect?",
    "Multiple connections at more than one Direct Connect location, terminating on separate devices."
   ]
  ]
 },
 {
  "t": "Infrastructure as code and service quotas: CloudFormation, StackSets and planning for limits and throttling",
  "body": [
   "Resilience is not only about redundant hardware. If a Region fails and your recovery environment has to be built by hand from memory, recovery will be slow and error-prone, and the rebuilt environment will not quite match production. Infrastructure as code (IaC) describes your environment in text files that can be versioned, reviewed and deployed repeatedly, which makes rebuilds fast and consistent and makes drift from the approved design visible. The same idea applies to capacity: a design that works in testing can still fail in production if it hits a service quota or API rate limit.",
   "AWS CloudFormation is AWS's native IaC service. A template, written in JSON or YAML, declares resources such as VPCs, instances and databases, with parameters for inputs, mappings for lookups, conditions for optional resources and outputs to share values. CloudFormation creates them as a stack, working out dependency order, and if creation fails it rolls back by default. To update a stack, you submit a changed template; a change set previews what will be added, modified or replaced before you run it, which matters because some property changes replace a resource, such as a database. Drift detection shows resources that were changed outside CloudFormation. A `DeletionPolicy` of `Retain` or `Snapshot` protects data such as databases when a stack is deleted, and stack termination protection prevents accidental deletion. The AWS Cloud Development Kit (CDK) and AWS Serverless Application Model (SAM) let you write in programming languages or a serverless shorthand that produce CloudFormation templates.",
   "```\nResources:\n  OrdersDb:\n    Type: AWS::RDS::DBInstance\n    DeletionPolicy: Snapshot\n    Properties:\n      Engine: postgres\n      MultiAZ: true\n```",
   "CloudFormation StackSets deploy one template to many accounts and Regions in a single operation. With service-managed permissions in AWS Organizations, StackSets can deploy automatically to every account in an OU, including accounts added later. This is the standard way to roll out baselines such as IAM roles, Config rules or logging to every account, or to prepare identical infrastructure in a DR Region. Deployment options control how many accounts are updated at once and how many failures are tolerated before the operation stops.",
   "Every AWS service has service quotas, formerly called limits, such as the number of VPCs per Region, running On-Demand instance vCPUs per Region, or requests per second to an API. Some are adjustable through the Service Quotas console or API, and some are fixed. Quotas are usually per account and per Region, so for resilience the key idea is planning: if you fail over to another Region, that Region's quotas must be high enough for your full production load, so request increases in advance, because approvals can take time. CloudWatch alarms on quota usage and AWS Trusted Advisor service limit checks help you spot approaching limits. APIs also throttle: when you exceed a request rate, the service returns a throttling error, such as HTTP 429 or a `ThrottlingException`. Well-built clients retry with exponential backoff and jitter, which the AWS SDKs do automatically. Designs that fan out many calls should use queues to smooth bursts, caching to avoid repeated calls, and batch APIs where they exist.",
   "Consider a worked example. Before a DR test, an architect discovers that the recovery Region's quota for On-Demand instance vCPUs is far below what production uses, and that the Elastic IP quota is also too low. She requests increases through Service Quotas and adds CloudWatch alarms at 80 percent of each quota. She then uses a StackSet to deploy the networking and IAM baseline to the recovery Region in every workload account, so failover only requires deploying the application stacks from the same templates used in production.",
   "Common mistakes: making manual console changes to stack-managed resources, which causes drift and failed updates; updating a stack without reviewing a change set and unintentionally replacing a database; forgetting `DeletionPolicy` on data stores; assuming quotas in the DR Region match the primary; retrying throttled calls immediately in a tight loop, which makes throttling worse; and deploying templates one account at a time when StackSets would do it centrally.",
   "Exam clues are direct. 'Deploy the same resources to many accounts or Regions' points to StackSets. 'Preview changes before updating' points to a change set. 'Resources changed outside the template' points to drift detection. 'Keep the database when the stack is deleted' points to `DeletionPolicy`. 'Failover Region cannot launch enough instances' points to requesting quota increases ahead of time, and 'ThrottlingException during bursts' points to exponential backoff with jitter, queues or caching."
  ],
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Defining infrastructure in versioned text files that tools deploy repeatably."
   ],
   [
    "CloudFormation stack",
    "A set of AWS resources created and managed together from one template."
   ],
   [
    "Change set",
    "A preview of the changes CloudFormation will make when updating a stack."
   ],
   [
    "StackSets",
    "A CloudFormation feature that deploys a template across multiple accounts and Regions."
   ],
   [
    "Service quota",
    "A per-account, per-Region limit on resources or request rates, some of which can be increased."
   ],
   [
    "Exponential backoff",
    "A retry strategy that waits progressively longer between attempts, usually with random jitter."
   ]
  ],
  "example": "A company's nightly job starts thousands of parallel Lambda functions that each call a DynamoDB API and a third-party service, and it fails with throttling errors. The team puts the work items on an SQS queue, sets reserved concurrency on the consumer function, uses batch write APIs, and relies on the SDK's exponential backoff with jitter. The job now finishes reliably, and a CloudWatch alarm warns if the account approaches its Lambda concurrency quota.",
  "tip": "Deploy the same resources to many accounts or Regions: StackSets. Preview changes before updating: change set. DR plans must include quota increases in the recovery Region. Throttling errors are handled with retries using exponential backoff.",
  "check": [
   [
    "What does CloudFormation do by default if a resource fails during stack creation?",
    "It rolls back, deleting the resources it created for that stack."
   ],
   [
    "An application receives ThrottlingException errors during bursts. What are two good fixes?",
    "Retry with exponential backoff and jitter, and smooth or reduce the calls with a queue, caching or batching (or request a quota increase if adjustable)."
   ],
   [
    "How do you protect an RDS database from being deleted when its CloudFormation stack is deleted?",
    "Set a DeletionPolicy of Retain or Snapshot on the database resource."
   ],
   [
    "Why should DR planning include service quotas in the recovery Region?",
    "Quotas are per Region, so the recovery Region may not allow enough resources for full production load unless increases are requested in advance."
   ]
  ]
 },
 {
  "t": "EC2 instance families and placement groups (cluster, spread, partition), and enhanced networking with ENA and EFA",
  "body": [
   "Amazon Elastic Compute Cloud (EC2) offers hundreds of instance types, but they fall into a handful of families, and the SAA-C03 exam expects you to match a workload to the right one. Choosing well matters twice: an instance that is too small hurts performance, and one that is the wrong shape wastes money, because you pay for CPU, memory or storage your application never uses. Alongside the instance type, two further choices shape performance for tightly connected fleets: where instances are physically placed, and how they are networked.",
   "The instance name encodes what you are getting. In `m7g.large`, `m` is the family, `7` the generation, `g` an attribute (here AWS Graviton, an Arm-based processor designed by AWS) and `large` the size. Other attribute letters you will see include `i` for Intel, `a` for AMD, `d` for local NVMe instance storage and `n` for extra network bandwidth. General purpose instances (M, and T for burstable) balance CPU, memory and networking and suit web servers and small databases. T instances earn CPU credits while idle and spend them in bursts; in unlimited mode they can burst beyond their credits for an extra charge. Compute optimized (C) suits batch processing, media encoding, gaming servers and scientific modeling. Memory optimized (R, X and others) suits in-memory databases, caches and real-time analytics. Storage optimized (I, D and others) has fast local instance storage for high random I/O or dense sequential workloads. Accelerated computing (P, G, Inf, Trn and others) adds graphics processing units (GPUs) or AWS machine learning chips.",
   "Placement groups influence where instances land in the physical infrastructure, and there are three strategies. A cluster placement group packs instances close together inside one Availability Zone (AZ) for the lowest latency and highest throughput between them, which suits tightly coupled high performance computing (HPC). The trade-off is correlated failure: a rack or AZ problem can hit many instances at once. A spread placement group puts each instance on distinct underlying hardware, with a limit of seven running instances per AZ per group, to minimize correlated failures for a small number of critical instances. A partition placement group divides instances into logical partitions, each on its own set of racks with separate network and power, so large distributed systems such as Hadoop, Cassandra and Kafka can place replicas in different failure domains. Instances can read their partition number from instance metadata so the application can make replica-aware decisions.",
   "Networking performance depends on the instance type and on enhanced networking, which uses single root I/O virtualization (SR-IOV) to give higher bandwidth, higher packet rates and lower, more consistent latency than traditional virtualized networking. The Elastic Network Adapter (ENA) provides enhanced networking on current-generation instance types and is enabled in current AWS-provided Amazon Machine Images (AMIs). You can confirm it with `aws ec2 describe-instances --instance-ids i-0abc --query 'Reservations[].Instances[].EnaSupport'`. The Elastic Fabric Adapter (EFA) is a network device for HPC and machine learning that adds operating system bypass: applications using the Message Passing Interface (MPI) or the NVIDIA Collective Communications Library (NCCL) talk to the network hardware directly, skipping the kernel, for very low and predictable latency. EFA is available only on selected instance types, you attach it as the network interface type when launching, and it is usually combined with a cluster placement group.",
   "Consider a worked example. A research team runs a weather simulation across 64 instances that exchange data constantly using MPI. The architect chooses an HPC-oriented, compute-optimized instance type that supports EFA, creates a cluster placement group with `aws ec2 create-placement-group --group-name wx-sim --strategy cluster`, and launches all nodes into it in one AZ with an EFA interface. Because a cluster group concentrates risk, the job checkpoints its state regularly to Amazon FSx for Lustre, so a single hardware failure costs minutes of work instead of the whole run. Separately, the team's three license servers each run in a spread placement group so no two share hardware.",
   "Common mistakes: choosing a spread placement group for a large fleet (it is capped at seven running instances per AZ per group, so large replicated clusters belong in a partition group); assuming a cluster placement group spans AZs (it does not, so it offers no AZ-level resilience); treating ENA and EFA as the same thing (ENA is general enhanced networking; EFA adds OS bypass for MPI and NCCL); and picking a burstable T instance for a workload with constant high CPU, which exhausts credits and either throttles or incurs unlimited-mode charges. Another trap is launching mixed instance types into a cluster group; it is best to launch the whole group at once with the same type to reduce capacity errors.",
   "Exam questions usually describe the workload and ask for the placement or networking choice. 'Tightly coupled', 'lowest latency between nodes', 'HPC' or 'MPI' points to a cluster placement group plus EFA. 'A small number of critical instances that must not share hardware' points to a spread placement group. 'Hundreds of nodes for HDFS, Cassandra or Kafka, replicas on separate racks' points to a partition placement group. 'In-memory database' points to a memory optimized family, 'high random I/O on local disk' to storage optimized, and 'GPU training or inference' to accelerated computing. When a question mentions better price performance and Arm compatibility, think Graviton."
  ],
  "terms": [
   [
    "Instance family",
    "A group of EC2 instance types optimized for a resource profile, such as general purpose, compute, memory, storage or accelerated computing."
   ],
   [
    "Cluster placement group",
    "Instances packed closely in one Availability Zone for low-latency, high-throughput networking between them."
   ],
   [
    "Spread placement group",
    "Each instance on distinct hardware, limited to seven running instances per AZ per group, to reduce correlated failures."
   ],
   [
    "Partition placement group",
    "Instances divided into partitions on separate racks, for large distributed and replicated systems."
   ],
   [
    "Elastic Network Adapter (ENA)",
    "The network interface that provides enhanced networking with high bandwidth and packet rates on current instance types."
   ],
   [
    "Elastic Fabric Adapter (EFA)",
    "A network interface with operating system bypass for tightly coupled HPC and machine learning workloads using MPI or NCCL."
   ],
   [
    "Burstable instance",
    "A T-family instance that accrues CPU credits when idle and spends them to burst above a baseline."
   ]
  ],
  "example": "A research team runs a weather simulation across 64 instances that exchange data constantly using MPI. The architect chooses an HPC-oriented instance type with EFA, launches all nodes in a cluster placement group in one AZ, and checkpoints results to Amazon FSx for Lustre so a hardware failure does not lose the whole run. The team's Kafka cluster, by contrast, runs in a partition placement group so each broker's replicas sit on different racks.",
  "tip": "Lowest latency between nodes: cluster. Maximum isolation for a few critical instances: spread (seven per AZ). Big replicated clusters like Kafka, Cassandra or HDFS: partition. MPI or OS bypass: EFA, not just ENA.",
  "check": [
   [
    "Which placement group is best for a Cassandra cluster of 30 nodes that must keep replicas on separate racks?",
    "A partition placement group, which puts each partition on its own racks and exposes the partition number to the application through metadata."
   ],
   [
    "What does the 'g' in m7g indicate?",
    "The instance uses an AWS Graviton (Arm-based) processor, so software must support the Arm64 architecture."
   ],
   [
    "Why is a spread placement group a poor fit for a 50-instance web fleet in two AZs?",
    "Spread groups allow only seven running instances per AZ per group, so they are meant for a few critical instances, not large fleets."
   ],
   [
    "An MPI application needs the lowest possible inter-node latency. Which two features should you combine?",
    "A cluster placement group in one AZ and the Elastic Fabric Adapter, whose OS bypass lets MPI reach the network hardware directly."
   ]
  ]
 },
 {
  "t": "EBS volume types and instance store: gp3 vs io2 Block Express vs st1 and sc1",
  "body": [
   "Amazon Elastic Block Store (EBS) provides network-attached block storage volumes for EC2, behaving like virtual hard disks. A volume lives in one Availability Zone (AZ), is replicated within that AZ to protect against a single hardware failure, persists independently of the instance and can be backed up with point-in-time snapshots stored in Amazon S3. Normally a volume attaches to one instance at a time; io1 and io2 volumes support Multi-Attach to several Nitro-based instances in the same AZ, for clustered applications that coordinate concurrent writes themselves. Because a volume is tied to one AZ, moving data to another AZ means creating a snapshot and restoring it there.",
   "EBS volume types split into solid state drive (SSD) volumes, measured mainly in input/output operations per second (IOPS), and hard disk drive (HDD) volumes, measured in throughput (MB/s). The general purpose SSD gp3 is the default choice for boot volumes and most workloads. Its key feature is that performance is independent of size: every gp3 volume gets a baseline of 3,000 IOPS and 125 MB/s, and you can provision more IOPS and throughput separately without buying more storage. The older gp2 ties IOPS to volume size (three IOPS per GiB) and uses burst credits for small volumes, which is why teams often over-provisioned gp2 capacity just to get performance, and why migrating gp2 to gp3 usually cuts cost or improves performance.",
   "Provisioned IOPS SSDs, io1 and io2, are for I/O-intensive databases that need sustained, consistent IOPS and low latency. io2 Block Express is the highest-performance EBS tier: sub-millisecond latency, much higher maximum IOPS and throughput per volume than gp3, and higher durability than the other volume types. New io2 volumes are created on Block Express. Choose it for large, mission-critical databases such as SAP HANA, Oracle or SQL Server when gp3's maximums or consistency are not enough. You set IOPS explicitly when you create the volume, for example `aws ec2 create-volume --volume-type io2 --size 500 --iops 20000 --availability-zone us-east-1a`.",
   "HDD volumes are optimized for large sequential reads and writes and cannot be boot volumes. Throughput optimized HDD (st1) suits big data, data warehouses, log processing and streaming workloads that read large files in order. Cold HDD (sc1) is the lowest-cost EBS option, for infrequently accessed, throughput-oriented data. Small random I/O on HDD volumes performs poorly, so never pick them for transactional databases. Instance store is different again: temporary block storage on disks physically attached to the host. It gives very high I/O performance and has no separate charge, but data is lost when the instance stops, hibernates or terminates, or if the underlying disk fails; it survives only a reboot. Use it for caches, buffers, scratch data, or data the application replicates across nodes. Only certain instance types include it, and you cannot detach it and attach it elsewhere.",
   "Consider a worked example. A company runs a large Oracle database that needs very high, sustained IOPS with consistent sub-millisecond latency, so it uses io2 Block Express data volumes. Its web servers boot from gp3 volumes with the default 3,000 IOPS. A log analytics cluster that scans terabytes sequentially every night uses st1, and a set of rarely read historical extracts sits on sc1. A caching tier runs on storage optimized instances with NVMe instance store, because the cache can be rebuilt from the database if an instance is stopped. When the database team later needs more IOPS, they change the volume's provisioned IOPS in place with Elastic Volumes instead of migrating.",
   "Common mistakes: choosing st1 or sc1 for a boot volume or an online transaction processing (OLTP) database; assuming gp3 performance grows with size as gp2 did; thinking instance store data survives a stop and start (only a reboot); expecting an EBS volume to attach to an instance in another AZ; and paying for io2 when gp3 with extra provisioned IOPS would meet the requirement at lower cost. Another trap is forgetting that EBS encryption is set per volume, with snapshots of encrypted volumes also encrypted.",
   "Exam questions are usually worded around the access pattern and the budget. 'Boot volume', 'general purpose' or 'most cost-effective SSD' points to gp3. 'Highest IOPS', 'mission-critical database', 'sub-millisecond latency' or 'highest durability' points to io2 Block Express. 'Large sequential', 'big data', 'log processing' and 'throughput' point to st1; 'infrequently accessed' plus 'lowest cost' block storage points to sc1. 'Temporary', 'scratch', 'buffer', 'highest I/O' and 'data can be lost' point to instance store. 'Shared block volume for a clustered application in one AZ' points to io1 or io2 Multi-Attach."
  ],
  "terms": [
   [
    "gp3",
    "General purpose SSD with a baseline of 3,000 IOPS and 125 MB/s, where IOPS and throughput are provisioned independently of size."
   ],
   [
    "gp2",
    "The older general purpose SSD whose IOPS scale with volume size and use burst credits on small volumes."
   ],
   [
    "io2 Block Express",
    "The highest-performance EBS SSD for demanding databases, with sub-millisecond latency and higher durability."
   ],
   [
    "st1",
    "Throughput optimized HDD for large sequential workloads such as big data and logs; not bootable."
   ],
   [
    "sc1",
    "Cold HDD, the lowest-cost EBS volume, for infrequently accessed sequential data; not bootable."
   ],
   [
    "Instance store",
    "Temporary block storage physically attached to the host; data is lost on stop, hibernation, termination or disk failure."
   ],
   [
    "Multi-Attach",
    "An io1 and io2 feature that attaches one volume to several Nitro instances in the same AZ."
   ]
  ],
  "example": "A company runs a large Oracle database needing very high sustained IOPS and chooses io2 Block Express. Its web servers use gp3 boot volumes. A log analytics cluster reading terabytes sequentially uses st1, and archived monthly extracts that are rarely scanned sit on sc1. A caching layer uses NVMe instance store on storage optimized instances because the cache can be rebuilt if data is lost.",
  "tip": "Default or boot volume: gp3. Highest sustained IOPS for critical databases: io2 Block Express. Big sequential throughput at low cost: st1; coldest and cheapest: sc1. Fastest temporary scratch space that may be lost: instance store.",
  "check": [
   [
    "You stop and start an instance. What happens to data on its instance store volume?",
    "It is lost. Instance store data survives only reboots, not stops, hibernation or termination."
   ],
   [
    "Why is gp3 often cheaper than gp2 for the same performance?",
    "gp3 lets you provision IOPS and throughput independently of size, so you no longer need to over-provision storage to get IOPS."
   ],
   [
    "Can an st1 volume be used as a boot volume for a Linux instance?",
    "No. HDD-backed st1 and sc1 volumes cannot be boot volumes; use an SSD type such as gp3."
   ],
   [
    "A clustered application in one AZ needs several instances to share one block volume. Which EBS option fits?",
    "An io1 or io2 volume with Multi-Attach enabled, attached to Nitro instances in the same AZ, with the application managing concurrent writes."
   ]
  ]
 },
 {
  "t": "Shared file systems: Amazon EFS vs FSx for Windows File Server, FSx for Lustre and FSx for NetApp ONTAP",
  "body": [
   "Amazon Elastic Block Store (EBS) volumes generally attach to one instance, and Amazon S3 is object storage accessed over HTTP APIs rather than as a mounted drive. When many servers need to read and write the same files through a normal file system interface, with directories, file locking and permissions, you need a shared file system. AWS offers Amazon Elastic File System (EFS) and the Amazon FSx family, and the exam decides between them by protocol, operating system and performance profile. Getting this right early saves painful migrations later, because applications are written to expect a particular protocol.",
   "Amazon EFS is a fully managed Network File System (NFS) for Linux workloads. Thousands of EC2 instances, containers and Lambda functions can mount it at the same time, across Availability Zones (AZs), through a mount target in each AZ. It grows and shrinks automatically with no capacity to provision, and you pay for the storage you use. Regional file systems store data redundantly across multiple AZs; One Zone file systems cost less for data that does not need that resilience. Lifecycle management moves rarely used files to the Infrequent Access and Archive storage classes. Throughput modes include elastic, which scales automatically with demand and is the usual default, and provisioned, for a fixed throughput level. On an instance you mount it with the EFS mount helper, for example `sudo mount -t efs -o tls fs-0123abcd:/ /mnt/shared`. EFS does not support Windows clients.",
   "Amazon FSx for Windows File Server provides fully managed Windows file shares using the Server Message Block (SMB) protocol, integrated with Microsoft Active Directory so permissions use NTFS access control lists (ACLs). It supports Windows features such as Distributed File System (DFS) namespaces, shadow copies that let users restore previous versions, and data deduplication, and it offers Multi-AZ deployments for high availability. Choose it for Windows applications, user home directories, and SharePoint or SQL Server workloads that expect SMB shares.",
   "Amazon FSx for Lustre is a high-performance parallel file system for HPC, machine learning training, media rendering and financial modeling, delivering very high aggregate throughput with sub-millisecond latencies. It can link to an S3 bucket as a data repository, presenting objects as files, loading them lazily on first access and exporting results back to S3. Scratch deployments are for temporary, short-term processing with no data replication, so a failed server loses its data; persistent deployments replicate within an AZ for longer-running work. Amazon FSx for NetApp ONTAP runs NetApp's ONTAP file system as a managed service. It serves NFS, SMB and iSCSI (block storage over IP) at the same time, so Linux, Windows and macOS clients can share data, and it offers ONTAP features such as snapshots, SnapMirror replication, cloning, compression and deduplication. A fourth option, FSx for OpenZFS, suits workloads moving from ZFS or other Linux NFS file servers that need very low latency.",
   "Consider a worked example. A media company renders video frames on 500 Linux instances. Source assets live in S3, so the team creates an FSx for Lustre file system linked to the bucket; render nodes read assets as ordinary files at high throughput, and finished frames are exported back to S3 for long-term storage. Editors on Windows workstations use FSx for Windows File Server shares joined to the corporate Active Directory, so their existing group permissions keep working. The company's content management web servers, which run Linux across three AZs, share uploaded images on a Regional EFS file system. A subsidiary that already runs NetApp arrays on premises replicates to FSx for NetApp ONTAP with SnapMirror for disaster recovery.",
   "Common mistakes: choosing EFS for Windows servers (it is NFS for Linux); choosing FSx for Windows File Server for Linux HPC (it is SMB and not built for parallel throughput); using an FSx for Lustre scratch file system for data that must survive a failure; and forgetting that EFS needs a mount target in each AZ where clients run, with security groups that allow NFS traffic on port 2049. Another trap is picking S3 when the application needs POSIX file semantics such as file locking or in-place edits; S3 is objects, not a file system.",
   "Exam questions usually hand you the clue in the protocol or the operating system. 'Linux', 'NFS', 'POSIX', 'shared across AZs' or 'elastic, pay for what you use' points to EFS. 'Windows', 'SMB', 'Active Directory', 'NTFS permissions' or 'DFS' points to FSx for Windows File Server. 'HPC', 'machine learning training', 'parallel', 'hundreds of GB/s' or 'process data in S3 as files' points to FSx for Lustre. 'NetApp', 'multi-protocol', 'NFS and SMB and iSCSI together' or 'SnapMirror' points to FSx for NetApp ONTAP. 'Migrating ZFS' points to FSx for OpenZFS."
  ],
  "terms": [
   [
    "Amazon EFS",
    "A managed, elastic NFS file system for Linux that many instances across AZs can mount simultaneously."
   ],
   [
    "Mount target",
    "An EFS network endpoint in a subnet of each AZ through which clients mount the file system."
   ],
   [
    "FSx for Windows File Server",
    "A managed Windows file server using SMB with Active Directory integration and NTFS permissions."
   ],
   [
    "FSx for Lustre",
    "A managed high-performance parallel file system for HPC and ML, with optional S3 data repository integration."
   ],
   [
    "FSx for NetApp ONTAP",
    "A managed NetApp ONTAP file system supporting NFS, SMB and iSCSI with ONTAP data management features."
   ],
   [
    "Server Message Block (SMB)",
    "The file sharing protocol used by Windows clients and servers."
   ],
   [
    "Scratch vs persistent (Lustre)",
    "Scratch file systems do not replicate data and suit temporary jobs; persistent file systems replicate within an AZ."
   ]
  ],
  "example": "A media company renders video frames on 500 Linux instances. Source assets live in S3; an FSx for Lustre file system linked to the bucket gives render nodes fast file access and writes finished frames back to S3. Its editors on Windows workstations use FSx for Windows File Server shares joined to the corporate Active Directory, and its web servers in three AZs share uploaded images on EFS.",
  "tip": "Linux shared files: EFS. Windows or SMB with Active Directory: FSx for Windows File Server. HPC or ML throughput, especially with S3 data: FSx for Lustre. NetApp features or NFS plus SMB plus iSCSI together: FSx for NetApp ONTAP.",
  "check": [
   [
    "A Windows .NET application needs a shared drive with NTFS permissions from Active Directory. Which service?",
    "Amazon FSx for Windows File Server, which uses SMB and integrates with Active Directory."
   ],
   [
    "Which file system can present an S3 bucket's objects as files for a machine learning training job?",
    "Amazon FSx for Lustre, linked to the S3 bucket as a data repository."
   ],
   [
    "A company needs Linux and Windows clients to access the same data over NFS and SMB, and wants SnapMirror replication. Which service?",
    "Amazon FSx for NetApp ONTAP, which serves multiple protocols and supports ONTAP features such as SnapMirror."
   ],
   [
    "EC2 instances in a new AZ cannot mount an existing EFS file system. What is a likely cause?",
    "There is no mount target in that AZ, or its security group does not allow NFS traffic on port 2049."
   ]
  ]
 },
 {
  "t": "S3 performance: prefixes, multipart upload, byte-range fetches and S3 Transfer Acceleration",
  "body": [
   "Amazon Simple Storage Service (S3) scales to huge request rates automatically, but knowing how it scales lets you design around the limits instead of discovering them in production. S3 supports at least 3,500 PUT, COPY, POST or DELETE requests and 5,500 GET or HEAD requests per second per prefix in a bucket. A prefix is the part of the object key before the object name, such as `logs/2026/09/` in `logs/2026/09/app.log`. There is no limit on the number of prefixes, so spreading requests across many prefixes multiplies the achievable rate: ten prefixes can support roughly ten times the requests of one.",
   "S3 scales its internal partitions gradually as load grows. A sudden, very large burst against one prefix may briefly receive HTTP 503 Slow Down responses while S3 adapts. Clients should retry with exponential backoff, which the AWS SDKs do by default. Design matters too: key names that put a date first under one fixed prefix concentrate all of today's writes in one place, while including a meaningful high-cardinality component, such as a customer or device ID, in the prefix spreads them out.",
   "Large objects need a different approach. A single PUT can upload an object up to 5 GB, but multipart upload splits an object into parts that upload independently and in parallel, and S3 assembles them when you complete the upload. AWS recommends multipart upload for objects over about 100 MB, and it is required above 5 GB; exam questions have long quoted 5 TB as the maximum object size. If a part fails, only that part is retried, which matters on unreliable links. The AWS Command Line Interface (CLI) high-level command `aws s3 cp bigfile.mov s3://media-bucket/raw/` uses multipart upload automatically for large files. Incomplete multipart uploads keep their parts and are billed until completed or aborted, so a lifecycle rule to abort incomplete uploads after a few days is good practice.",
   "Downloads have a mirror feature: byte-range fetches. Using the HTTP `Range` header, a client requests a specific range of bytes, and several ranges can download in parallel for higher aggregate throughput. It also lets an application read only the part of a large file it needs, such as a file header or index, and a failed range can be retried alone. Distance matters as well. S3 Transfer Acceleration speeds up long-distance uploads and downloads by routing them through the nearest Amazon CloudFront edge location and then across the AWS backbone network to the bucket. You enable it on the bucket and use the distinct accelerate endpoint, `bucketname.s3-accelerate.amazonaws.com`, or `--endpoint-url` with the CLI. There is an additional per-GB charge, applied only when acceleration actually improves the transfer.",
   "Consider a worked example. Film studios on three continents upload multi-gigabyte raw footage to a bucket in one Region, and uploads are slow and often fail near the end. The architect enables Transfer Acceleration on the bucket so long-distance hops ride the AWS backbone, and switches the upload tool to multipart upload with parallel parts, so each network failure retries one part instead of the entire file. A lifecycle rule aborts incomplete uploads after seven days. On the processing side, a transcoding service reads each file with parallel byte-range GET requests to saturate its network link, and output keys are spread across prefixes by studio and project.",
   "Common mistakes: believing S3 needs randomized key names (that was old advice; today you simply use more prefixes); uploading multi-gigabyte files with a single PUT and restarting the whole file on failure; forgetting that incomplete multipart uploads are billed; and choosing Transfer Acceleration for users who are already close to the bucket's Region, where it adds little. Another trap is tuning S3 when the real need is to serve popular content to many readers, where CloudFront caching is the better answer, or to query part of the data inside objects, where Amazon Athena avoids downloading whole files. For huge numbers of tiny files, batching them into larger objects reduces per-request overhead.",
   "Exam wording usually points straight at the feature. 'Global users uploading to a single bucket', 'long distances' or 'use the AWS backbone' points to S3 Transfer Acceleration. 'Large files', 'unreliable network', 'resume failed uploads' or 'objects larger than 5 GB' points to multipart upload. 'Download part of an object' or 'parallel downloads' points to byte-range fetches. '503 Slow Down' or 'higher request rate' points to spreading keys across more prefixes and retrying with backoff. 'Many users repeatedly reading the same objects' points to CloudFront."
  ],
  "terms": [
   [
    "Prefix",
    "The leading part of an S3 object key; request rate guidance applies per prefix."
   ],
   [
    "Multipart upload",
    "Uploading an object in independently transferred parts that S3 then assembles; required above 5 GB."
   ],
   [
    "Byte-range fetch",
    "Downloading a specific range of bytes of an object with the HTTP Range header, often in parallel."
   ],
   [
    "S3 Transfer Acceleration",
    "A bucket feature that routes transfers through CloudFront edge locations over the AWS backbone."
   ],
   [
    "503 Slow Down",
    "An S3 response indicating the request rate temporarily exceeds what the prefix can handle; clients should retry with backoff."
   ],
   [
    "Exponential backoff",
    "A retry strategy that waits progressively longer between attempts to let a service recover."
   ]
  ],
  "example": "Film studios on three continents upload multi-gigabyte raw footage to a bucket in one Region, and uploads are slow and often fail. The architect enables S3 Transfer Acceleration, and the upload tool switches to multipart upload with parallel parts, so each failure only retries one part and the long-distance hops use the AWS backbone. A lifecycle rule aborts incomplete uploads after seven days so abandoned parts do not accumulate charges.",
  "tip": "Global users uploading to one bucket over long distances: Transfer Acceleration. Large files and unreliable networks: multipart upload. Faster parallel downloads or reading part of a file: byte-range fetches. Higher request rates: more prefixes.",
  "check": [
   [
    "An application writes 12,000 objects per second under one prefix and gets 503 errors. What design change helps?",
    "Spread the keys across multiple prefixes so the request rate per prefix stays within S3's per-prefix rates, and retry with exponential backoff."
   ],
   [
    "What is the largest object you can upload in a single PUT?",
    "5 GB. Larger objects require multipart upload, which AWS recommends from about 100 MB."
   ],
   [
    "Why add a lifecycle rule to abort incomplete multipart uploads?",
    "Parts of uploads that were never completed or aborted remain stored and billed, invisible in normal object listings."
   ],
   [
    "Users in the same Region as the bucket ask for Transfer Acceleration. Is it likely to help?",
    "Probably not much; it helps long-distance transfers by using nearby edge locations and the AWS backbone, and you pay extra only when it improves speed."
   ]
  ]
 },
 {
  "t": "Caching: ElastiCache for Redis vs Memcached, DynamoDB Accelerator (DAX), lazy loading vs write-through",
  "body": [
   "A cache keeps frequently read data in fast memory so that repeated requests do not hit a slower database. That lowers latency, often from milliseconds to microseconds, and reduces load and cost on the database, because fewer reads reach it and it can often be a smaller size. Caching works best for data that is read far more often than it changes, such as product catalogs, user profiles and session data. The exam asks two kinds of question: which cache service fits, and which caching strategy fits.",
   "Amazon ElastiCache is a managed in-memory cache. ElastiCache for Redis OSS, and Valkey, the open source engine derived from Redis that ElastiCache also supports, is feature-rich: advanced data structures such as sorted sets (ideal for leaderboards), hashes and lists; replication with automatic failover in Multi-AZ configurations; persistence with backups and restores; publish-subscribe (pub/sub) messaging; and cluster mode to shard data across nodes. Use it for session stores, leaderboards, rate limiting and any cache that must survive a node failure. ElastiCache for Memcached is simpler: a multi-threaded, pure key-value cache that scales out by adding nodes, with no replication, no persistence and no backups. Use it when you need a simple, horizontally scaled cache and losing cached data on node failure is acceptable. ElastiCache also offers a serverless option that scales capacity automatically.",
   "DynamoDB Accelerator (DAX) is an in-memory cache designed only for Amazon DynamoDB. It is API-compatible with DynamoDB, so an application switches from the DynamoDB client to the DAX client with minimal code changes, and read latency drops from single-digit milliseconds to microseconds for eventually consistent reads. DAX runs as a cluster inside your virtual private cloud (VPC). It is the answer when a question asks for microsecond reads on DynamoDB with little code change. It does not help write-heavy workloads, and strongly consistent reads pass straight through to DynamoDB.",
   "Two caching strategies appear often. Lazy loading, also called cache-aside, means the application checks the cache first; on a hit it returns the value, and on a miss it reads from the database and writes the result to the cache. Only requested data is cached and a failed cache node is not fatal, but a miss costs three trips and data can become stale. Write-through means the application writes to the cache every time it writes to the database, so cached data is always current, but every write pays extra latency and the cache fills with data that may never be read. Many designs combine both and add a time to live (TTL) on keys so stale data expires. The lazy loading pattern with a TTL looks like this in Python.",
   "```python\nv = cache.get(key)\nif v is None:\n    v = db.query(key)\n    cache.set(key, v, ex=300)  # 5-minute TTL\nreturn v\n```",
   "Consider a worked example. A gaming company stores player profiles in DynamoDB and keeps its global leaderboard in ElastiCache for Redis OSS using a sorted set, where adding a score and reading the top 100 players are single fast commands. It enables Multi-AZ with a replica so the leaderboard survives a node failure. When profile reads spike during tournaments, it adds DAX in front of the profile table, changing only the client library. For its web session data it uses the same Redis cluster, so a user's session is not lost if one web server is replaced. Product descriptions are loaded lazily with a one-hour TTL, while player balances, which must always be current, are written through.",
   "Common mistakes: choosing Memcached when the question needs high availability, backups or sorted sets; expecting DAX to speed up writes or strongly consistent reads; adding a cache for data where every query is unique, which gives a poor hit ratio (a read replica may suit better); and forgetting TTLs, so lazy-loaded data stays stale indefinitely. Another trap is assuming a cache is a durable database; unless persistence and replication are configured, cached data can disappear. Caching also exists elsewhere: Amazon API Gateway can cache responses, and CloudFront caches content at the edge.",
   "Exam questions tend to follow recognizable clues. 'Leaderboard', 'sorted sets', 'pub/sub', 'persistence', 'Multi-AZ failover' or 'session store that must survive failure' points to ElastiCache for Redis OSS or Valkey. 'Simple', 'multi-threaded', 'key-value only' and 'data loss acceptable' points to Memcached. 'DynamoDB', 'microseconds' and 'minimal code changes' points to DAX. 'Cache must never be stale' points to write-through; 'only cache what is requested' or 'tolerates cache failure' points to lazy loading, with a TTL to limit staleness."
  ],
  "terms": [
   [
    "ElastiCache for Redis OSS",
    "A managed in-memory data store with rich data types, replication, persistence and Multi-AZ failover; Valkey is a compatible engine option."
   ],
   [
    "ElastiCache for Memcached",
    "A managed, multi-threaded key-value cache without replication or persistence."
   ],
   [
    "DAX",
    "DynamoDB Accelerator, an API-compatible in-memory cache for DynamoDB with microsecond read latency."
   ],
   [
    "Lazy loading",
    "A caching strategy that loads data into the cache only after a cache miss; also called cache-aside."
   ],
   [
    "Write-through",
    "A caching strategy that updates the cache whenever the database is written, keeping cached data current."
   ],
   [
    "Time to live (TTL)",
    "An expiry time on a cached item after which it is removed and reloaded on the next request."
   ],
   [
    "Cache hit ratio",
    "The share of requests served from the cache rather than the backing database."
   ]
  ],
  "example": "A gaming company stores player profiles in DynamoDB and its global leaderboard in ElastiCache for Redis OSS using a sorted set, with a Multi-AZ replica so the leaderboard survives a node failure. When profile reads spike during tournaments, it adds DAX in front of the table, changing only the client library, and read latency drops to microseconds without touching the table's capacity settings.",
  "tip": "Leaderboards, pub/sub, persistence or high availability: Redis OSS or Valkey. Simplest multi-threaded key-value cache: Memcached. Microsecond reads for DynamoDB with minimal code change: DAX. Always-fresh cache at the cost of write latency: write-through.",
  "check": [
   [
    "Which caching strategy can serve stale data, and how do you limit it?",
    "Lazy loading, because the cache is only refreshed on a miss. Set a TTL on cached items so they expire and are reloaded."
   ],
   [
    "Would DAX help an application that mostly does strongly consistent reads?",
    "No. DAX passes strongly consistent reads through to DynamoDB; it accelerates eventually consistent reads."
   ],
   [
    "A session store must survive the loss of a cache node. Redis OSS or Memcached?",
    "ElastiCache for Redis OSS (or Valkey) with replication and Multi-AZ automatic failover; Memcached has no replication."
   ],
   [
    "What is the main drawback of write-through caching?",
    "Every write pays extra latency to update the cache, and the cache fills with data that may never be read."
   ]
  ]
 },
 {
  "t": "Content delivery and global networking: CloudFront caching and TTLs vs AWS Global Accelerator",
  "body": [
   "Users far from your AWS Region experience latency simply because of distance and the many internet hops in between, and the public internet adds unpredictable congestion. AWS has two services that bring users onto the AWS global network close to where they are: Amazon CloudFront and AWS Global Accelerator. Both use AWS edge locations, both improve performance for distant users, and both integrate with AWS Shield for distributed denial of service (DDoS) protection, which is why telling them apart is a classic exam item.",
   "CloudFront is a content delivery network (CDN). It caches content at edge locations worldwide, so repeat requests are answered near the user without going back to the origin. Origins can be S3 buckets, Application Load Balancers (ALBs), EC2 instances, API Gateway or any HTTP server. Cache behaviors map URL path patterns, such as `/images/*` or `/api/*`, to origins and settings. For an S3 origin, origin access control (OAC) lets CloudFront read a private bucket so users cannot bypass the distribution. CloudFront also accelerates dynamic content over persistent connections, supports signed URLs and signed cookies for private content, and runs code at the edge with CloudFront Functions and Lambda@Edge.",
   "Caching is controlled by a cache policy. The policy defines the cache key, meaning which headers, cookies and query strings make a response unique, and the time to live (TTL) settings: minimum, default and maximum times an object stays cached. The origin can influence TTL with `Cache-Control` or `Expires` headers within those limits; for example `Cache-Control: max-age=86400` asks for one day. Including too many values in the cache key lowers the cache hit ratio, because otherwise identical responses are stored separately, so forward only what the origin really needs (an origin request policy can send extra values to the origin without adding them to the key). To remove content before it expires you can create an invalidation, such as `aws cloudfront create-invalidation --distribution-id E123 --paths '/css/*'`, but versioned file names such as `app.v2.js` are better, because a new name is a new cache key and old versions stay consistent.",
   "AWS Global Accelerator does not cache anything. It gives you two static anycast IP addresses announced from AWS edge locations. Users connect to the nearest edge, and traffic then travels over the AWS backbone to your endpoints, which can be Network Load Balancers (NLBs), ALBs, EC2 instances or Elastic IP addresses in one or more Regions. It works for any TCP or UDP traffic, not just HTTP. Health checks and traffic dials route users to healthy endpoints, failing over between Regions in seconds without waiting for DNS caches to expire, because the IP addresses clients use never change. Endpoint weights let you shift traffic gradually, which helps blue/green deployments.",
   "Consider a worked example. A news site puts CloudFront in front of an S3 bucket for images and an ALB for articles. Images get a one-day TTL, the homepage a 60-second TTL, and the cache key for articles includes only the `lang` query string, which raises the hit ratio sharply and cuts origin load. Its sister company runs a multiplayer game over UDP in three Regions. It uses Global Accelerator so players connect to two fixed IP addresses and are routed to the nearest healthy Region; when one Region has an outage, traffic moves to the next within seconds, and corporate customers who allowlist the two IP addresses need no firewall changes.",
   "Common mistakes: choosing CloudFront for UDP game traffic or for a requirement of fixed IP addresses (CloudFront uses changing edge IPs behind DNS names); choosing Global Accelerator for cacheable static files (it has no cache); relying on invalidations for every deployment instead of versioned file names; and forwarding all headers and cookies to the origin, which destroys the cache hit ratio. Another trap is confusing Global Accelerator with Route 53 latency routing: Route 53 answers DNS queries and depends on clients respecting TTLs, while Global Accelerator keeps the same IPs and moves traffic behind them.",
   "Exam wording is usually decisive. 'Cache', 'static content', 'images and video', 'reduce load on the origin' or 'TTL' points to CloudFront. 'Static IP addresses', 'allowlist', 'UDP', 'non-HTTP protocols such as MQTT or VoIP', 'deterministic, fast multi-Region failover' or 'no DNS caching delays' points to Global Accelerator. 'Users receive old content after a deployment' points to an invalidation or, better, versioned object names. 'Private S3 content only through the CDN' points to CloudFront with origin access control, plus signed URLs or cookies when access is per user."
  ],
  "terms": [
   [
    "Edge location",
    "An AWS site close to users where CloudFront caches content and Global Accelerator accepts traffic."
   ],
   [
    "Cache key",
    "The combination of URL and selected headers, cookies and query strings that identifies a unique cached object."
   ],
   [
    "TTL",
    "Time to live: how long CloudFront keeps an object in cache before checking the origin again."
   ],
   [
    "Invalidation",
    "A CloudFront request to remove objects from edge caches before their TTL expires."
   ],
   [
    "Origin access control (OAC)",
    "A CloudFront feature that lets a distribution read a private S3 bucket so users cannot access the bucket directly."
   ],
   [
    "AWS Global Accelerator",
    "A service providing two static anycast IP addresses that route TCP and UDP traffic over the AWS backbone to healthy endpoints."
   ],
   [
    "Anycast IP",
    "An IP address announced from many locations at once, so each client reaches the nearest one."
   ]
  ],
  "example": "A news site's images and articles are cached by CloudFront with a one-day TTL for images and a short TTL for the homepage, which cuts origin load dramatically. Its sister company runs a multiplayer game over UDP in three Regions and uses Global Accelerator, so players connect to two fixed IP addresses and are routed to the nearest healthy Region, failing over in seconds without DNS changes.",
  "tip": "Caching and HTTP content means CloudFront. Static IP addresses, UDP or other non-HTTP traffic, or instant regional failover without relying on DNS means Global Accelerator.",
  "check": [
   [
    "Customers must allowlist exactly two IP addresses for an API served from two Regions. Which service?",
    "AWS Global Accelerator, which provides two static anycast IP addresses for endpoints in multiple Regions."
   ],
   [
    "You deployed a new CSS file with the same name, but users still get the old one. What are two fixes?",
    "Create a CloudFront invalidation for the path, or use versioned file names so the new file has a new cache key."
   ],
   [
    "Why can adding every cookie to the cache key hurt performance?",
    "Each unique cookie combination creates a separate cached copy, lowering the cache hit ratio and sending more requests to the origin."
   ],
   [
    "Does Global Accelerator cache content at the edge?",
    "No. It routes TCP and UDP traffic over the AWS backbone to healthy endpoints; caching is CloudFront's job."
   ]
  ]
 },
 {
  "t": "Choosing a database: RDS, Aurora, DynamoDB, Redshift, DocumentDB, Neptune, and RDS Proxy for connection pooling",
  "body": [
   "AWS takes a purpose-built approach to databases: rather than forcing one database to do everything, you pick the engine that fits the data model and access pattern. A relational database is excellent at joins and transactions but awkward at massive key-value scale; a key-value store is the reverse. Exam questions usually give you clues, such as joins and transactions, key-value lookups at huge scale, analytics over years of data, JSON documents or relationships between entities, and expect you to map them to a service. Learning those clues is most of the work.",
   "Amazon Relational Database Service (RDS) runs familiar relational engines (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server and Db2) as managed services, handling patching, backups, Multi-AZ failover and read replicas. Choose it for structured data with SQL, joins and ACID (atomicity, consistency, isolation, durability) transactions, especially when an application already expects a specific engine or needs a commercial one such as Oracle or SQL Server. Amazon Aurora is AWS's cloud-native relational engine compatible with MySQL and PostgreSQL. Its distributed storage layer keeps six copies of data across three Availability Zones (AZs), it supports up to 15 low-lag read replicas with fast failover, and it offers options such as Aurora Serverless v2 and Aurora Global Database for cross-Region reads and disaster recovery. Choose Aurora when you want higher performance and availability than standard RDS with MySQL or PostgreSQL compatibility.",
   "Amazon DynamoDB is a serverless key-value and document NoSQL database with single-digit millisecond performance at any scale, no servers to manage, and features such as global tables for multi-Region active-active replication, DynamoDB Streams for change events and TTL for automatic expiry. Choose it for high-scale web, mobile, gaming and Internet of Things (IoT) workloads with known access patterns, and when a schema-flexible, serverless database is wanted. Amazon Redshift is a columnar data warehouse for online analytical processing (OLAP): complex SQL queries and aggregations over large historical datasets for business intelligence. It is not designed for high-volume, row-by-row online transaction processing (OLTP) updates.",
   "Amazon DocumentDB (with MongoDB compatibility) stores JSON documents and supports MongoDB APIs and drivers, so it is the answer for moving MongoDB workloads to a managed service with minimal code change. Amazon Neptune is a graph database for highly connected data such as social networks, recommendation engines, fraud rings and knowledge graphs, queried with Gremlin, openCypher or SPARQL. Other purpose-built engines you may see include Amazon Keyspaces (for Apache Cassandra), Amazon Timestream for time series data, Amazon MemoryDB as a durable Redis-compatible in-memory database, and Amazon OpenSearch Service for full-text search and log analytics.",
   "RDS Proxy sits between applications and RDS or Aurora and pools and shares database connections. It matters most for serverless designs: thousands of concurrent AWS Lambda functions can each open a connection and exhaust the database's connection limit, and opening connections is itself expensive. The proxy multiplexes many client connections onto fewer database connections, reduces failover time by keeping client connections open while the database fails over, and can enforce AWS Identity and Access Management (IAM) authentication with database credentials stored in AWS Secrets Manager. Applications simply change their connection endpoint to the proxy endpoint. RDS Proxy is not a cache and does not speed up individual queries.",
   "Consider a worked example. A startup's serverless API uses Lambda with Aurora PostgreSQL, and during traffic spikes the database runs out of connections and returns errors. Adding RDS Proxy lets thousands of function instances share a small pool of connections, and failovers become faster for the application. For its friend-recommendation feature, the team adds Neptune, because queries such as 'friends of friends who liked this item' are graph traversals that would need many expensive joins in SQL. Nightly sales reporting moves to Redshift so heavy aggregate queries no longer slow the transactional database, and the shopping cart, which needs simple key lookups at huge scale, moves to DynamoDB.",
   "Common mistakes: choosing Redshift for an OLTP application; choosing DynamoDB when the requirement stresses complex joins and ad hoc relational queries; choosing RDS read replicas to fix a connection-exhaustion problem (that is RDS Proxy's job); and choosing ElastiCache when durable storage of record is required. Another trap is picking RDS for Oracle when the question says the company wants to avoid commercial licensing; migrating to Aurora PostgreSQL may be the intended answer.",
   "Exam wording maps cleanly to engines. 'relationships', 'graph' or 'social network' is Neptune; 'MongoDB compatibility' is DocumentDB; 'data warehouse', 'OLAP' or 'petabyte analytics' is Redshift; 'key-value', 'any scale', 'serverless' or 'single-digit millisecond' is DynamoDB; 'MySQL or PostgreSQL compatible with higher performance and availability' is Aurora; 'too many connections from Lambda' is RDS Proxy."
  ],
  "terms": [
   [
    "OLTP vs OLAP",
    "Online transaction processing handles many small reads and writes; online analytical processing runs large aggregate queries over historical data."
   ],
   [
    "Amazon Aurora",
    "A MySQL- and PostgreSQL-compatible relational engine with distributed storage across three AZs and up to 15 read replicas."
   ],
   [
    "Amazon DynamoDB",
    "A serverless key-value and document NoSQL database with consistent single-digit millisecond performance at any scale."
   ],
   [
    "Amazon Redshift",
    "A managed columnar data warehouse for analytics over large datasets."
   ],
   [
    "Amazon DocumentDB",
    "A managed JSON document database compatible with MongoDB APIs and drivers."
   ],
   [
    "Amazon Neptune",
    "A managed graph database for data defined by relationships between entities."
   ],
   [
    "RDS Proxy",
    "A managed database proxy that pools connections to RDS and Aurora and speeds failover."
   ]
  ],
  "example": "A startup's serverless API uses Lambda with Aurora PostgreSQL, and during traffic spikes the database runs out of connections. Adding RDS Proxy lets thousands of function instances share a small pool of connections. For its friend-recommendation feature, the team adds Neptune, and for nightly sales reporting it loads data into Redshift so analytical queries no longer compete with customer transactions.",
  "tip": "Match clues to engines: relationships and graph traversal is Neptune; MongoDB compatibility is DocumentDB; analytics or data warehouse is Redshift; key-value at any scale with serverless operation is DynamoDB; too many connections from Lambda is RDS Proxy.",
  "check": [
   [
    "A company wants to move a self-managed MongoDB database to a managed AWS service with minimal code changes. Which service?",
    "Amazon DocumentDB (with MongoDB compatibility)."
   ],
   [
    "Lambda functions exhaust an RDS database's connections during bursts. What should you add?",
    "RDS Proxy, which pools and shares database connections among many clients."
   ],
   [
    "A fraud team needs to find rings of accounts linked through shared devices and addresses. Which database fits?",
    "Amazon Neptune, a graph database built for traversing relationships between entities."
   ],
   [
    "Why is Redshift a poor fit for an order-entry application?",
    "Redshift is a columnar OLAP warehouse optimized for large analytical queries, not many small transactional inserts and updates."
   ]
  ]
 },
 {
  "t": "DynamoDB performance: partition key design, provisioned vs on-demand capacity, auto scaling and secondary indexes",
  "body": [
   "Amazon DynamoDB delivers consistent performance at any scale, but only if the table is designed for how it will be accessed. Unlike relational databases, where you normalize entities and write whatever queries you need later, in DynamoDB you design tables around your queries. The exam tests the pieces that make or break that design: the partition key, the capacity mode, auto scaling and secondary indexes.",
   "Every item has a primary key. A simple primary key is just a partition key; a composite primary key adds a sort key, so many items can share a partition key and be ordered by the sort key, such as orders for one customer sorted by date. DynamoDB hashes the partition key to decide which physical partition stores the item, and each partition has a throughput limit. If many requests go to the same partition key value, a hot partition forms and requests are throttled even though the table as a whole has spare capacity. Good partition keys have high cardinality and spread requests evenly, such as a user ID or order ID. Poor ones have few values or concentrate traffic, such as a status field or today's date. When one value is unavoidably hot, write sharding adds a random or calculated suffix to spread it. Adaptive capacity helps absorb some imbalance but does not fix a bad design.",
   "Capacity comes in two modes. Provisioned capacity sets read capacity units (RCUs) and write capacity units (WCUs). One RCU is one strongly consistent read per second, or two eventually consistent reads, of an item up to 4 KB; one WCU is one write per second of an item up to 1 KB. Item sizes round up, and transactional operations use twice the units. Provisioned mode suits predictable traffic and can use auto scaling, which adjusts capacity between a minimum and maximum to track a target utilization, and reserved capacity for further savings. On-demand mode charges per request with no capacity planning and accommodates traffic that ramps quickly, which suits new, unpredictable or spiky workloads. You can switch modes, with limits on how often.",
   "Secondary indexes enable queries on attributes other than the primary key. A global secondary index (GSI) has its own partition key and optional sort key, can be created or deleted at any time, has its own capacity settings, and supports only eventually consistent reads. A local secondary index (LSI) shares the table's partition key but uses a different sort key, must be created with the table, and supports strongly consistent reads. Indexes project attributes from the table; projecting fewer attributes saves storage and write capacity. An under-provisioned GSI can throttle writes to the base table, so give GSIs enough write capacity. Finally, prefer `Query`, which reads items with one partition key value, over `Scan`, which reads the whole table and consumes capacity for every item it examines. For example: `aws dynamodb query --table-name Orders --key-condition-expression 'CustomerId = :c' --expression-attribute-values '{\":c\":{\"S\":\"C42\"}}'`.",
   "Consider a worked example. A voting app uses the candidate name as the partition key, and on election night the top two candidates' partitions are throttled while the rest of the table sits idle. The team changes writes to use keys like `candidateA#7`, with a random suffix from 1 to 10, and sums the ten shards when reading totals. Because election-night traffic is unpredictable and short-lived, it switches the table to on-demand mode. Later, the product team wants to look up votes by polling station, which is not part of the key, so the team adds a GSI with `StationId` as its partition key, projecting only the attributes the report needs.",
   "Common mistakes: choosing a low-cardinality partition key such as `status` or `country`; assuming more total capacity fixes a hot partition; forgetting that an LSI cannot be added after table creation; expecting strongly consistent reads from a GSI; using `Scan` in a request path where a `Query` or index would do; and miscounting capacity units by not rounding item sizes up. Another trap is forgetting that eventually consistent reads cost half as much, which can halve the RCUs a read-heavy workload needs.",
   "Exam questions are usually worded around symptoms. 'Throttling while overall capacity is unused' points to a hot partition and poor key design, fixed with a better key or write sharding. 'Unknown', 'unpredictable' or 'spiky' traffic points to on-demand; 'steady and predictable' points to provisioned with auto scaling. 'Need to query by a new attribute on an existing table' points to a GSI, because LSIs must be created with the table. 'Same partition key, different sort order, strongly consistent' points to an LSI. Capacity arithmetic questions expect you to round item size up to 4 KB for reads and 1 KB for writes."
  ],
  "terms": [
   [
    "Partition key",
    "The key attribute DynamoDB hashes to distribute items across physical partitions."
   ],
   [
    "Sort key",
    "The second part of a composite primary key that orders items sharing a partition key."
   ],
   [
    "Hot partition",
    "A partition receiving a disproportionate share of traffic, causing throttling."
   ],
   [
    "Read capacity unit (RCU)",
    "One strongly consistent or two eventually consistent reads per second of an item up to 4 KB."
   ],
   [
    "Write capacity unit (WCU)",
    "One write per second of an item up to 1 KB."
   ],
   [
    "Global secondary index",
    "An index with a different partition key that can be added anytime and supports eventually consistent reads."
   ],
   [
    "On-demand capacity",
    "A DynamoDB billing mode charging per request with no capacity planning."
   ]
  ],
  "example": "A voting app uses the candidate name as the partition key, and on election night the top two candidates' partitions are throttled. The team changes writes to use keys like candidateA#7, with a random suffix from 1 to 10, then sums the shards when reading. It also switches the table to on-demand mode because traffic is unpredictable, and adds a GSI keyed on polling station for a new report.",
  "tip": "Throttling while total capacity is unused points to a hot partition and poor key design. Unknown or spiky traffic points to on-demand; steady, predictable traffic points to provisioned with auto scaling. Need a new query pattern after launch: add a GSI, because LSIs must be created with the table.",
  "check": [
   [
    "How many RCUs are needed for 10 strongly consistent reads per second of 6 KB items?",
    "20. Each 6 KB read rounds up to 8 KB, which is two 4 KB units, so 10 x 2 = 20 RCUs."
   ],
   [
    "You need to query an existing table by email address, which is not part of the key. What do you add?",
    "A global secondary index with email as its partition key, since LSIs can only be created with the table."
   ],
   [
    "How many WCUs are needed to write 5 items per second of 2.5 KB each?",
    "15. Each 2.5 KB write rounds up to 3 KB, which is three 1 KB units, so 5 x 3 = 15 WCUs."
   ],
   [
    "Why is `Scan` usually avoided in a high-traffic request path?",
    "It reads every item in the table and consumes capacity for all of them, while `Query` reads only items with one partition key value."
   ]
  ]
 },
 {
  "t": "Streaming ingestion: Kinesis Data Streams vs Amazon Data Firehose vs Amazon MSK",
  "body": [
   "Streaming data arrives continuously, such as clickstreams, application logs, Internet of Things (IoT) sensor readings or financial transactions, and often needs to be processed within seconds rather than in a nightly batch. AWS offers three main ingestion services. The exam distinguishes them by how much control you need, whether data must be replayed, whether you already use Apache Kafka, and where the data is going.",
   "Amazon Kinesis Data Streams is a real-time data stream that you read with your own consumers. Producers put records with a partition key, for example `aws kinesis put-record --stream-name rides --partition-key driver-812 --data <base64>`. Records with the same partition key go to the same shard, which preserves ordering within that key. In provisioned mode, each shard supports a fixed write rate (1 MB/s or 1,000 records per second) and read rate (2 MB/s shared by consumers), and you add shards to scale; in on-demand mode Kinesis manages capacity for you. Records are retained for 24 hours by default, extendable up to 365 days, so several consumers can read the same data independently and replay it after a bug fix.",
   "Consumers of Data Streams include AWS Lambda, applications built with the Kinesis Client Library (KCL), and Amazon Managed Service for Apache Flink for real-time analytics such as windowed aggregations and anomaly detection. Enhanced fan-out gives each registered consumer its own dedicated read throughput per shard, so adding consumers does not slow the others. Choose Data Streams for real-time custom processing, multiple independent consumers, per-key ordering and replay.",
   "Amazon Data Firehose, formerly Kinesis Data Firehose, is the simplest way to load streaming data into storage and analytics destinations. It is fully managed and scales automatically with no shards to plan. It buffers incoming data by size or time and delivers it to Amazon S3, Amazon Redshift (by staging in S3 and issuing a `COPY`), Amazon OpenSearch Service, Splunk, HTTP endpoints and several partner services. It can transform records with a Lambda function, convert JSON to columnar Apache Parquet or ORC formats, partition data dynamically by a field and compress it. Because of buffering, delivery is near real time, typically seconds to minutes, and Firehose does not keep data for replay. Choose it when the requirement is load streaming data into S3, Redshift or OpenSearch with the least operational overhead.",
   "Amazon Managed Streaming for Apache Kafka (MSK) runs Apache Kafka clusters for you, handling broker provisioning, patching and replacement, and MSK Serverless removes capacity management altogether. Choose it when a company already uses Kafka, wants to keep Kafka APIs, client libraries, tools and Kafka Connect connectors, or needs Kafka-specific features such as long retention on topics or particular configuration. It offers more control than Kinesis, at the cost of needing Kafka knowledge.",
   "Consider a worked example. A ride-sharing company streams driver locations into Kinesis Data Streams, using the driver ID as the partition key so each driver's updates stay in order. A Lambda consumer updates the live map within a second, a Flink application detects areas where demand exceeds supply, and a Firehose delivery stream, reading from the same data stream as another consumer, writes compressed, date-partitioned Parquet files to S3 every few minutes for data scientists to query with Athena. The company's payments team, which already runs Kafka on premises with dozens of connectors, moves to MSK instead of rewriting its producers.",
   "Common mistakes: choosing Firehose when the question needs sub-second processing, custom consumers or replay; choosing Data Streams when the only need is to land data in S3 with no code; using a low-cardinality partition key so one shard becomes hot and throws `ProvisionedThroughputExceededException`; and choosing MSK for a new, simple workload with no Kafka requirement, which adds operational knowledge the team may not have. Another trap is thinking Firehose stores data; it only buffers briefly before delivery.",
   "Exam wording usually gives it away. 'Load into S3, Redshift, OpenSearch or Splunk', 'near real time', 'no administration', 'convert to Parquet' points to Amazon Data Firehose. 'Real time', 'custom processing', 'multiple consumers', 'ordering per key' or 'replay' points to Kinesis Data Streams. 'Existing Kafka', 'open source Kafka APIs' or 'Kafka Connect' points to Amazon MSK. 'Real-time analytics with SQL or Java on a stream' points to Managed Service for Apache Flink reading from Data Streams or MSK."
  ],
  "terms": [
   [
    "Shard",
    "The unit of capacity in a provisioned Kinesis data stream, with fixed read and write throughput."
   ],
   [
    "Partition key (Kinesis)",
    "The value that determines which shard receives a record, preserving order per key."
   ],
   [
    "Retention period",
    "How long Kinesis Data Streams keeps records for reading and replay, 24 hours by default and extendable."
   ],
   [
    "Enhanced fan-out",
    "A Kinesis feature giving each registered consumer dedicated read throughput per shard."
   ],
   [
    "Amazon Data Firehose",
    "A fully managed service that buffers streaming data and delivers it to destinations like S3, Redshift and OpenSearch."
   ],
   [
    "Amazon MSK",
    "Amazon Managed Streaming for Apache Kafka, a managed Kafka service with a serverless option."
   ]
  ],
  "example": "A ride-sharing company streams driver locations into Kinesis Data Streams. A Lambda consumer updates a live map within a second, a Flink application detects surge areas, and Firehose, reading the same stream, writes compressed Parquet files to S3 every few minutes for data scientists to query with Athena. The payments team, which already uses Kafka, moves its existing producers and connectors to Amazon MSK.",
  "tip": "Deliver to S3, Redshift or OpenSearch with no code and no capacity management: Firehose. Real-time custom consumers, ordering per key or replay: Kinesis Data Streams. Existing Kafka workloads or Kafka APIs: MSK.",
  "check": [
   [
    "Can Amazon Data Firehose replay data from yesterday to a new consumer?",
    "No. Firehose delivers and does not retain data for replay. Kinesis Data Streams retains records so consumers can re-read them."
   ],
   [
    "A Kinesis producer gets throughput exceeded errors on a provisioned stream. What are two fixes?",
    "Add shards (or switch to on-demand mode) and use a well-distributed partition key so records spread across shards."
   ],
   [
    "Five separate applications read the same stream and slow each other down. Which feature helps?",
    "Enhanced fan-out, which gives each registered consumer its own dedicated read throughput."
   ],
   [
    "A company runs Kafka on premises with many Kafka Connect connectors and wants a managed service. Which one?",
    "Amazon MSK, which keeps Kafka APIs, clients and connectors compatible."
   ]
  ]
 },
 {
  "t": "Analytics services: Athena, AWS Glue, Lake Formation, EMR, Redshift Spectrum and QuickSight",
  "body": [
   "A data lake stores raw and processed data of every shape, usually in Amazon S3, and lets many tools analyze it without first copying it into a separate system. Because S3 is cheap, durable and effectively unlimited, you can keep years of history and decide later how to use it. AWS has a set of services that catalog, secure, process, query and visualize that data, and the exam expects you to know the job of each and which one answers a given requirement.",
   "AWS Glue is a serverless data integration service. Glue crawlers scan data in S3 and other sources, infer schemas and create or update tables in the AWS Glue Data Catalog, a central metadata repository that Athena, Redshift Spectrum and EMR all use. Glue jobs run extract, transform and load (ETL) code on serverless Apache Spark, for example converting CSV to Parquet and partitioning it by date, with job bookmarks so each run processes only new data. Glue also offers visual job authoring in Glue Studio and data quality rules that check data as it moves.",
   "Amazon Athena is a serverless interactive query service: you write standard SQL against data in S3, using tables defined in the Data Catalog, and pay for the amount of data each query scans. There are no clusters to manage. Because pricing is per scan, storing data in compressed, columnar formats such as Apache Parquet or ORC and partitioning it, for example by year, month and day, cuts both cost and query time. A query that filters on partition columns reads only matching folders:\n\n```sql\nSELECT srcaddr, SUM(bytes) FROM vpc_flow_logs\nWHERE year='2026' AND month='09'\nGROUP BY srcaddr ORDER BY 2 DESC LIMIT 10;\n```",
   "AWS Lake Formation builds on the Glue Data Catalog to set up and secure data lakes. Its key feature is centralized, fine-grained access control: grant a team access to specific databases, tables, columns or rows, and have those permissions enforced consistently across Athena, Redshift Spectrum, EMR and Glue, instead of managing complex S3 bucket policies. It is the answer when a question asks for column-level or row-level permissions on a data lake managed in one place, or for sharing data lake tables across accounts with governance.",
   "Amazon EMR runs big data frameworks such as Apache Spark, Hive, Presto, HBase and Flink on clusters of EC2 instances, on Amazon EKS, or with EMR Serverless. It suits large-scale processing, machine learning data preparation and workloads that need framework-level control or specific versions; clusters can use Spot Instances for task nodes to cut cost. Amazon Redshift Spectrum lets a Redshift cluster query data directly in S3 through external tables and join it with tables loaded in Redshift, so you keep hot data in the warehouse and cold history in the lake. Amazon QuickSight is the serverless business intelligence (BI) service for interactive dashboards and visualizations, connecting to Athena, Redshift, RDS, S3 and other sources, with per-user pricing and an in-memory engine called SPICE for fast dashboards.",
   "Consider a worked example. A retailer lands raw sales CSV files in S3 every hour. A Glue crawler catalogs them, and a scheduled Glue job converts them to partitioned Parquet in a curated prefix. Analysts run ad hoc SQL with Athena, and query costs drop sharply because each query now scans a fraction of the data. Finance analysts see only non-PII (personally identifiable information) columns through Lake Formation column permissions, while the fraud team sees everything. The data warehouse keeps the last year in Redshift and queries older years through Spectrum, and executives view QuickSight dashboards built on the same data.",
   "Common mistakes: choosing EMR for simple ad hoc SQL on S3 (Athena needs no cluster); choosing Athena for a heavy, constant BI workload better served by a warehouse; forgetting that Athena cost scales with data scanned, so raw uncompressed JSON is expensive; and using S3 bucket policies to try to achieve column-level security, which Lake Formation provides. Another trap is thinking a crawler transforms data; crawlers only discover schemas, while Glue jobs transform.",
   "Exam wording maps cleanly. 'Ad hoc SQL on S3', 'serverless', 'no infrastructure' or 'query CloudTrail or ALB logs' points to Athena. 'Discover schema', 'crawler', 'Data Catalog' or 'serverless ETL' points to Glue. 'Column-level or row-level permissions', 'centralized data lake governance' points to Lake Formation. 'Hadoop', 'Spark cluster', 'HBase' or 'control over the framework' points to EMR. 'Join warehouse tables with data in S3 without loading it' points to Redshift Spectrum. 'Dashboards' and 'BI visualizations' point to QuickSight."
  ],
  "terms": [
   [
    "Data lake",
    "A central repository, usually on S3, that stores raw and processed data of any format for many analytics tools."
   ],
   [
    "AWS Glue Data Catalog",
    "A central metadata store of table definitions shared by Athena, EMR, Redshift Spectrum and Glue."
   ],
   [
    "Glue crawler",
    "A Glue component that scans data sources, infers schemas and creates or updates Data Catalog tables."
   ],
   [
    "Amazon Athena",
    "A serverless SQL query service for data in S3, priced per data scanned."
   ],
   [
    "AWS Lake Formation",
    "A service to build data lakes and manage fine-grained table, column and row access to them centrally."
   ],
   [
    "Redshift Spectrum",
    "A Redshift feature that queries data in S3 directly and joins it with warehouse tables."
   ],
   [
    "Amazon QuickSight",
    "A serverless business intelligence service for dashboards and visualizations."
   ]
  ],
  "example": "A retailer lands raw sales CSV files in S3. A Glue crawler catalogs them and a Glue job converts them to partitioned Parquet. Analysts run ad hoc SQL with Athena, finance sees only non-PII columns through Lake Formation permissions, older years are queried from Redshift through Spectrum, and executives view QuickSight dashboards built on the same data.",
  "tip": "Ad hoc SQL on S3 with no servers: Athena. Discover schemas and ETL: Glue. Column or row-level permissions across analytics tools: Lake Formation. Hadoop or Spark clusters with control: EMR. Join Redshift tables with S3 data: Redshift Spectrum. Dashboards: QuickSight.",
  "check": [
   [
    "How can you reduce Athena query costs on a large log dataset?",
    "Convert the data to a compressed columnar format such as Parquet and partition it so queries scan less data."
   ],
   [
    "Which service creates tables in the Data Catalog by scanning data in S3?",
    "An AWS Glue crawler."
   ],
   [
    "Analysts must see all columns of a table except salary, enforced in both Athena and EMR. Which service?",
    "AWS Lake Formation, which grants column-level permissions enforced across integrated analytics services."
   ],
   [
    "A Redshift team wants to query five years of archived data in S3 without loading it. What do they use?",
    "Redshift Spectrum with external tables defined over the S3 data."
   ]
  ]
 },
 {
  "t": "EC2 Auto Scaling policies: target tracking, step, simple, scheduled and predictive scaling",
  "body": [
   "An Auto Scaling group keeps a fleet of EC2 instances between a minimum and maximum size, replaces unhealthy instances, and uses scaling policies to decide when to change the desired capacity. Choosing the right policy lets you meet performance goals without paying for idle instances overnight or scrambling during a spike. The exam describes a traffic pattern, such as steady growth, sudden bursts, a known daily peak or a queue backlog, and asks which policy or combination fits.",
   "Target tracking scaling is the simplest and usually recommended choice. You choose a metric and a target value, such as average CPU utilization at 50 percent or Application Load Balancer (ALB) request count per target at 1,000, and Auto Scaling creates and manages the Amazon CloudWatch alarms for you, adding or removing capacity to keep the metric near the target, much like a thermostat. It scales out quickly and scales in more gradually to avoid flapping. From the command line it looks like this: `aws autoscaling put-scaling-policy --auto-scaling-group-name web-asg --policy-name cpu50 --policy-type TargetTrackingScaling --target-tracking-configuration file://cpu50.json`, where the JSON names `ASGAverageCPUUtilization` and a `TargetValue` of 50.",
   "Step scaling uses CloudWatch alarms you create and defines adjustments that vary with the size of the alarm breach: for example, add one instance when CPU is between 60 and 70 percent, and add three when it is above 85 percent. It responds proportionally and keeps responding to alarms while earlier scaling activities are in progress, relying on an instance warmup setting so new instances are not counted before they are ready. Simple scaling makes one adjustment per alarm and then waits for a cooldown period before responding again, so it reacts slowly to rapid changes; it is mostly legacy, and step or target tracking is preferred.",
   "Scheduled scaling changes minimum, maximum or desired capacity at specific times, once or on a recurring cron schedule. It suits known patterns, such as scaling up at 08:00 on weekdays before staff arrive, or before a planned marketing event. Predictive scaling uses machine learning on historical load, needing at least a day of data and working better with more, to forecast daily and weekly patterns and launch capacity ahead of expected demand. It helps applications with regular cycles and long instance initialization times, can run in forecast-only mode so you can evaluate it first, and is usually combined with target tracking to handle unexpected changes.",
   "Several supporting settings matter. A launch template defines the instance configuration: AMI, instance type, security groups and user data. Health checks can use EC2 status checks or, better for web tiers, the load balancer's health checks, so an instance that is running but failing requests is replaced. Warm pools keep pre-initialized instances stopped or running, ready to join quickly. Lifecycle hooks pause instances during launch or termination so you can run scripts, such as draining work or copying logs. Termination policies decide which instance goes first when scaling in, and instance scale-in protection can exempt specific instances. For queue-based workers, scale on a custom metric of backlog per instance, the queue length divided by the number of running instances, rather than on CPU.",
   "Consider a worked example. An internal payroll app is busy every weekday from 08:00 to 18:00 and idle at night. Instances take eight minutes to boot and load caches. The team uses scheduled scaling to raise the minimum at 07:45 and lower it at 18:30, adds target tracking on CPU at 50 percent to handle unusual spikes such as end-of-month processing, and configures a warm pool so extra instances join in seconds rather than minutes. A separate report generator reads jobs from an Amazon Simple Queue Service (SQS) queue; it scales on backlog per instance with a target of ten messages per instance, so the fleet grows when the queue grows even if CPU looks low.",
   "Common mistakes: choosing simple scaling when a question emphasizes fast, proportional response; scaling a queue worker fleet on CPU, which may never rise even as the backlog grows; expecting target tracking to launch capacity before a known peak (it reacts, it does not predict); relying on EC2 status checks alone so instances with broken applications stay in service; and setting a maximum size too low, so policies cannot add capacity when needed. Another trap is forgetting that the minimum capacity is what you always pay for, so a high minimum defeats cost savings.",
   "Exam wording usually points to one policy. 'Keep average CPU at 50 percent' or 'maintain a metric at a value' points to target tracking. 'Every Monday at 9', 'before a known event' or 'at a specific time' points to scheduled scaling. 'Recurring daily or weekly pattern' plus 'instances take a long time to start' points to predictive scaling. 'Different responses for different breach sizes' points to step scaling. 'SQS queue backlog' points to a custom backlog-per-instance metric with target tracking. 'Instances take too long to become ready' points to warm pools, and 'run a script before termination' points to lifecycle hooks."
  ],
  "terms": [
   [
    "Target tracking scaling",
    "A policy that adjusts capacity to keep a chosen metric near a target value."
   ],
   [
    "Step scaling",
    "A policy that makes larger adjustments for larger CloudWatch alarm breaches."
   ],
   [
    "Simple scaling",
    "A legacy policy making one adjustment per alarm, then waiting for a cooldown period."
   ],
   [
    "Scheduled scaling",
    "Changing Auto Scaling group capacity at set times for known load patterns."
   ],
   [
    "Predictive scaling",
    "Forecasting load from history with machine learning to add capacity before it is needed."
   ],
   [
    "Warm pool",
    "A set of pre-initialized instances kept ready to join an Auto Scaling group quickly."
   ],
   [
    "Lifecycle hook",
    "A pause during instance launch or termination that lets you run custom actions."
   ]
  ],
  "example": "An internal payroll app is busy every weekday from 08:00 to 18:00 and idle at night. The team uses scheduled scaling to raise the minimum at 07:45 and lower it at 18:30, plus target tracking on CPU at 50 percent to handle unusual spikes such as end-of-month processing. A report worker fleet reading from SQS scales on backlog per instance, so it grows with the queue rather than with CPU.",
  "tip": "Keep a metric at a value: target tracking. Known times: scheduled. Recurring daily or weekly patterns with slow-starting instances: predictive. Different responses for different breach sizes: step. SQS worker fleets: scale on backlog per instance.",
  "check": [
   [
    "An application takes 10 minutes to boot and has a consistent daily traffic peak at 09:00. Which policy helps most?",
    "Predictive scaling (or scheduled scaling), so capacity launches before the peak rather than reacting after it starts."
   ],
   [
    "Why is simple scaling usually avoided today?",
    "It waits for a cooldown after each adjustment, so it reacts slowly; step or target tracking policies respond better."
   ],
   [
    "Worker instances process SQS messages, but CPU stays low while the queue grows. What metric should scaling use?",
    "Backlog per instance: the number of visible messages divided by running instances, tracked against a target."
   ],
   [
    "Instances are running but returning errors, and Auto Scaling does not replace them. What should you change?",
    "Use the load balancer's health checks for the Auto Scaling group so instances failing application checks are replaced."
   ]
  ]
 },
 {
  "t": "Data migration and hybrid storage: DataSync, Snow Family, Storage Gateway, Transfer Family, DMS and SCT",
  "body": [
   "Moving data into AWS, or keeping on-premises systems connected to AWS storage, is part of many architectures. The right tool depends on four questions: how much data there is, how fast and reliable the network is, whether the transfer is one-time or ongoing, and whether the data is files, block volumes, tapes or databases. The exam gives you these facts in the scenario and expects you to pick the matching service.",
   "AWS DataSync moves files online between on-premises storage (Network File System (NFS), Server Message Block (SMB), Hadoop Distributed File System (HDFS) or self-managed object storage), other clouds and AWS storage services such as Amazon S3, Amazon EFS and the FSx file systems. You deploy a DataSync agent near the source, create source and destination locations, and define a task. The service handles parallel transfer, encryption in transit, integrity verification, scheduling, bandwidth limits and incremental copies of only changed files. It is the answer for one-time or recurring file migrations over the network, including over AWS Direct Connect.",
   "When the network is too slow, ship the data. The AWS Snow Family provides rugged devices that AWS sends to you: you copy data locally, ship the device back, and AWS imports it into S3. Snowball Edge devices hold tens of terabytes each and add local compute for edge processing in disconnected locations. A rough rule: if moving the data over your available bandwidth would take more than about a week, consider Snow. For example, 100 TB over a fully used 100 Mbps link takes roughly three months. AWS has changed the Snow device lineup over time, so for new projects check which devices are currently offered; the concept of offline, physical transfer is what the exam tests.",
   "AWS Storage Gateway connects on-premises applications to AWS storage for ongoing hybrid use, running as a virtual machine or hardware appliance with a local cache for low latency. S3 File Gateway presents NFS or SMB shares whose files are stored as objects in S3. FSx File Gateway, which appears in exam material though AWS has closed it to new customers, gives on-premises Windows users cached access to FSx for Windows File Server shares. Volume Gateway presents iSCSI block volumes backed by S3 with EBS snapshots, in cached mode (primary data in AWS, frequently used data cached locally) or stored mode (primary data local, backed up asynchronously to AWS). Tape Gateway presents a virtual tape library so existing backup software can write to S3 and S3 Glacier storage classes instead of physical tapes.",
   "AWS Transfer Family provides managed SFTP, FTPS, FTP and AS2 endpoints that store files in S3 or EFS, so partners keep using their existing file transfer tools and scripts. AWS Database Migration Service (DMS) migrates databases to AWS with minimal downtime: a replication instance performs a full load and then change data capture (CDC) to keep the target in sync until you cut over. Homogeneous migrations, such as Oracle to Oracle, need only DMS or native tools. Heterogeneous migrations, such as Oracle to Aurora PostgreSQL, first need schema conversion: the AWS Schema Conversion Tool (SCT), or the newer DMS Schema Conversion, converts the schema, stored procedures and other code objects, then DMS moves the data.",
   "Consider a worked example. A hospital must move a 600 TB image archive but has only a 200 Mbps internet link, so it orders Snowball Edge devices for the bulk copy, then uses DataSync over the network to copy files changed since the devices were loaded. Its Oracle database moves to Aurora PostgreSQL using SCT for the schema and DMS with CDC for the data, so the application is down only for the final cutover. A laboratory partner that sends results by SFTP connects to a Transfer Family endpoint instead of an aging FTP server, and the backup team points its existing backup software at a Tape Gateway to retire its tape library.",
   "Common mistakes: choosing Snow for a modest amount of data on a fast network (DataSync is simpler); choosing DataSync for ongoing low-latency local access (that is Storage Gateway); using DMS alone for a heterogeneous migration without converting the schema; confusing Volume Gateway cached mode (primary data in AWS) with stored mode (primary data on premises); and building a custom SFTP server on EC2 when Transfer Family is managed. Another trap is forgetting that DMS keeps the source online during migration, which is why it is the minimal-downtime answer.",
   "Exam wording tends to follow a pattern. 'Migrate or sync files online', 'schedule', 'NFS or SMB to S3 or EFS' points to DataSync. 'Petabytes', 'limited bandwidth', 'weeks to transfer' or 'no connectivity' points to the Snow Family. 'On-premises applications need ongoing access to cloud storage with local caching' points to Storage Gateway, with file, volume or tape chosen by interface. 'Partners use SFTP' points to Transfer Family. 'Migrate a database with minimal downtime' points to DMS, plus SCT or DMS Schema Conversion when engines differ."
  ],
  "terms": [
   [
    "AWS DataSync",
    "An online data transfer service for moving files between on-premises storage, other clouds and AWS storage."
   ],
   [
    "Snow Family",
    "Physical AWS devices used to move large amounts of data offline and to run compute at the edge."
   ],
   [
    "Storage Gateway",
    "A hybrid service giving on-premises applications file, volume or tape interfaces backed by AWS storage with local caching."
   ],
   [
    "Tape Gateway",
    "A Storage Gateway type that presents a virtual tape library to existing backup software, storing tapes in S3 and Glacier classes."
   ],
   [
    "AWS Transfer Family",
    "Managed SFTP, FTPS, FTP and AS2 endpoints that store files in S3 or EFS."
   ],
   [
    "Change data capture (CDC)",
    "Continuously replicating ongoing database changes from source to target after the initial load."
   ],
   [
    "AWS SCT",
    "The Schema Conversion Tool, which converts database schemas and code between different engines."
   ]
  ],
  "example": "A hospital moves a 600 TB image archive with only a 200 Mbps internet link, so it orders Snowball Edge devices for the bulk copy, then uses DataSync for the changes made since. Its Oracle database moves to Aurora PostgreSQL using SCT for the schema and DMS with CDC for the data, and a partner that sends files by SFTP connects to Transfer Family instead of an old FTP server.",
  "tip": "Online file migration: DataSync. Huge data and limited bandwidth: Snow Family. Ongoing on-premises access to cloud storage: Storage Gateway (file, volume or tape). SFTP for partners: Transfer Family. Database move with minimal downtime: DMS, plus SCT when engines differ.",
  "check": [
   [
    "Which Storage Gateway type lets an existing backup application write to virtual tapes stored in AWS?",
    "Tape Gateway, which presents a virtual tape library backed by S3 and Glacier storage classes."
   ],
   [
    "Migrating SQL Server to Aurora MySQL: which tools are needed?",
    "A schema conversion tool (AWS SCT or DMS Schema Conversion) for the schema and code, then AWS DMS for the data, optionally with CDC."
   ],
   [
    "A company has 2 PB to move and a 100 Mbps link that is already busy. What should it use?",
    "The Snow Family, because transferring 2 PB over that link would take far too long; ship the data on devices instead."
   ],
   [
    "On-premises servers must keep using NFS shares, but files should be stored as objects in S3. Which service?",
    "Storage Gateway's S3 File Gateway, which presents NFS or SMB shares backed by S3 with a local cache."
   ]
  ]
 },
 {
  "t": "EC2 purchase options: On-Demand, Reserved Instances, Compute vs EC2 Instance Savings Plans, Spot, Dedicated Instances and Dedicated Hosts",
  "body": [
   "The same EC2 instance can cost very different amounts depending on how you buy it. Cost-optimized architectures match each workload to the right purchase option: flexibility where the future is uncertain, commitment where usage is steady, spare capacity where work can be interrupted, and dedicated hardware only where licensing or compliance requires it. The exam gives you a workload description and asks for the cheapest option that still meets the requirements, so read carefully for words like 'steady', 'interruptible', 'short-term' and 'licensed per core'.",
   "On-Demand Instances are billed per second (for Linux and many other operating systems, with a one-minute minimum) or per hour, with no commitment. They are the most flexible and the most expensive per hour, and suit short-term, spiky or unpredictable workloads, development and testing, and anything you cannot interrupt but cannot yet forecast. On-Demand Capacity Reservations let you reserve capacity in a specific Availability Zone (AZ) without a term commitment; you pay for them whether or not you use them, and they can be combined with Savings Plans or Regional Reserved Instances for a discount.",
   "For steady workloads, commit in exchange for discounts. Reserved Instances (RIs) are a one- or three-year commitment to a specific instance family, Region, operating system and tenancy, paid all upfront, partial upfront or no upfront; the more you pay upfront and the longer the term, the bigger the discount. Standard RIs give the largest discount; Convertible RIs can be exchanged for different instance families at a smaller discount. A zonal RI also reserves capacity in one AZ; a Regional RI does not but applies across AZs and sizes in the family.",
   "Savings Plans are the newer, more flexible commitment model: you commit to a consistent amount of compute spend, in dollars per hour, for one or three years. A Compute Savings Plan applies automatically across instance families, sizes, Regions, operating systems and tenancy, and also to AWS Fargate and AWS Lambda usage. An EC2 Instance Savings Plan gives a deeper discount but is tied to one instance family in one Region, while staying flexible on size, operating system and AZ. Choose Compute Savings Plans when you expect to change families or Regions or move to containers and serverless; choose EC2 Instance Savings Plans for a stable family in one Region. Cost Explorer recommends a commitment amount from your past usage.",
   "Spot Instances use spare EC2 capacity at steep discounts, often up to 90 percent off On-Demand, but AWS can reclaim them with a two-minute warning. They suit fault-tolerant, flexible work: batch jobs, big data, continuous integration builds, rendering, and stateless web tiers with other capacity underneath. Never put a single critical database on Spot. Two options address isolation and licensing. Dedicated Instances run on hardware dedicated to your account, but you have no visibility or control over the physical server. Dedicated Hosts give you an entire physical server with visibility into sockets and cores and control over instance placement on it, which is what bring-your-own-license (BYOL) software licensed per socket or per core, such as some Windows Server, SQL Server or Oracle licenses, typically requires. Dedicated Hosts can be bought On-Demand or with reservations and Savings Plans.",
   "Consider a worked example. A company runs a steady baseline of 20 web servers all year, nightly analytics jobs that can restart from checkpoints, a two-week load test next month, and a legacy app licensed per physical core. It covers the web baseline with a Compute Savings Plan because it plans to move some services to Fargate next year, runs analytics on Spot Instances, runs the load test On-Demand because it is short and cannot be interrupted, and places the licensed app on a Dedicated Host so it can count cores for the license audit.",
   "Common mistakes: choosing Dedicated Instances for per-core licensing (you need Dedicated Hosts for socket and core visibility); buying Reserved Instances or Savings Plans before right-sizing, which locks in waste; choosing Spot for work that cannot tolerate interruption; choosing an EC2 Instance Savings Plan when the scenario mentions moving to Lambda or Fargate; and assuming a Regional RI guarantees capacity (only zonal RIs and Capacity Reservations do). Another trap is thinking Savings Plans are per instance; they are a dollar-per-hour spend commitment.",
   "Exam wording is usually decisive. 'Steady state', 'one or three years', 'predictable' points to Savings Plans or RIs. 'Flexible across instance families, Regions, Fargate and Lambda' points to a Compute Savings Plan. 'Stateless', 'fault-tolerant', 'can be interrupted', 'lowest cost' points to Spot. 'Short-term', 'unpredictable', 'cannot be interrupted' points to On-Demand. 'Licensed per socket or per core', 'BYOL', 'visibility into physical cores' points to Dedicated Hosts. 'Guarantee capacity in an AZ for an event without a long commitment' points to an On-Demand Capacity Reservation."
  ],
  "terms": [
   [
    "On-Demand Instance",
    "An instance billed per second or hour with no commitment."
   ],
   [
    "Reserved Instance",
    "A one- or three-year commitment to an instance configuration in exchange for a lower rate."
   ],
   [
    "Compute Savings Plan",
    "A dollars-per-hour commitment that discounts EC2 across families and Regions, plus Fargate and Lambda."
   ],
   [
    "EC2 Instance Savings Plan",
    "A deeper-discount commitment tied to one instance family in one Region, flexible on size, OS and AZ."
   ],
   [
    "Spot Instance",
    "Spare EC2 capacity at a large discount that AWS can reclaim with a two-minute notice."
   ],
   [
    "Dedicated Host",
    "A physical server dedicated to you, with socket and core visibility for per-core or per-socket licensing."
   ],
   [
    "On-Demand Capacity Reservation",
    "Reserved EC2 capacity in a specific AZ without a term commitment, billed whether used or not."
   ]
  ],
  "example": "A company runs a steady baseline of web servers all year, nightly analytics jobs that can restart, and a legacy app licensed per physical core. It covers the web baseline with a Compute Savings Plan because it plans to move to Fargate next year, runs analytics on Spot Instances, and places the licensed app on a Dedicated Host so it can report socket and core counts to its software vendor.",
  "tip": "Steady and long-term: Savings Plans or RIs. Interruptible and flexible: Spot. Short, unpredictable and uninterruptible: On-Demand. Per-socket or per-core BYOL licensing: Dedicated Hosts, not Dedicated Instances. Flexibility across families, Regions or Fargate and Lambda: Compute Savings Plan.",
  "check": [
   [
    "Which commitment covers Lambda and Fargate usage as well as EC2?",
    "A Compute Savings Plan."
   ],
   [
    "A vendor license is priced per physical CPU socket. Which EC2 option lets you comply?",
    "Dedicated Hosts, which expose the physical server's sockets and cores."
   ],
   [
    "A company needs guaranteed capacity in one AZ for a three-day event and wants no long-term commitment. What should it use?",
    "An On-Demand Capacity Reservation in that AZ, cancelled after the event."
   ],
   [
    "Why might an EC2 Instance Savings Plan be the wrong choice for a team migrating to containers on Fargate?",
    "It applies only to EC2 usage in one instance family and Region; a Compute Savings Plan would also cover Fargate."
   ]
  ]
 },
 {
  "t": "Spot Instances in practice: interruption notices, mixed-instances Auto Scaling groups and allocation strategies",
  "body": [
   "Spot Instances can cut compute costs dramatically, but only architectures that tolerate interruption benefit. A Spot Instance is ordinary EC2 capacity that AWS is not currently selling at On-Demand prices; when that capacity is needed back, your instance is interrupted. This lesson covers how interruption works, how to be told about it, and how to design fleets that ride through it without users noticing.",
   "When EC2 needs Spot capacity back, it sends a Spot Instance interruption notice two minutes before stopping, hibernating or terminating the instance; termination is the default behavior. The notice appears in the instance metadata service (IMDS) and as an Amazon EventBridge event, so a script on the instance or a Lambda function can react: deregister from the load balancer, checkpoint work to S3, or finish the current job and stop pulling new ones. On the instance, a small agent can poll the metadata path `latest/meta-data/spot/instance-action` every few seconds, first requesting an IMDSv2 session token; the path returns 404 until a notice exists, then returns the action (stop, hibernate or terminate) and its time.",
   "EC2 may also send an earlier EC2 instance rebalance recommendation signal when an instance is at elevated risk of interruption. The Auto Scaling Capacity Rebalancing feature can use it to launch a replacement before the interruption arrives, giving the old instance time to drain. You pay the current Spot price, which changes gradually with long-term supply and demand; you do not bid, and you can optionally set a maximum price, though leaving it at the default On-Demand price avoids extra interruptions caused by a low cap.",
   "The key design principle is diversification. Spot capacity is managed in pools: each combination of instance type and Availability Zone (AZ) is a separate pool. If you ask for only one type in one AZ, a capacity squeeze in that pool interrupts everything at once. An Auto Scaling group with a mixed instances policy can combine On-Demand and Spot capacity and use many instance types across several AZs. You set an On-Demand base capacity, for example two instances that always run On-Demand, and an On-Demand percentage above base, with the rest on Spot. Attribute-based instance type selection lets you specify vCPU and memory requirements instead of listing types, so suitable new types are picked up automatically.",
   "Allocation strategies decide which pools Spot capacity comes from. Price-capacity-optimized, the strategy AWS recommends for most workloads, chooses pools with the most available capacity and then the lowest price among them, lowering interruption rates while keeping cost low. Capacity-optimized chooses pools with the most available capacity, which suits workloads where interruptions are expensive. Lowest-price chooses the cheapest pools and can bring higher interruption rates. For the On-Demand part of a mixed group, you choose lowest-price or prioritized ordering. Good Spot workloads are stateless, checkpointed or queue-driven: containers on Amazon ECS or EKS with Spot capacity providers or node groups, EMR task nodes, CI runners, and Amazon SQS workers where an interrupted message simply becomes visible again for another worker.",
   "Consider a worked example. A video transcoding service reads jobs from SQS and runs on an Auto Scaling group with two On-Demand instances as a base and the rest on Spot, across ten instance types in three AZs, using price-capacity-optimized allocation and Capacity Rebalancing. When an interruption notice arrives, an agent on the instance stops taking new jobs and uploads partial output to S3. Unfinished messages reappear in the queue after their visibility timeout and another worker picks them up, so no job is lost and the monthly compute bill drops by well over half.",
   "Common mistakes: restricting a Spot fleet to one instance type or one AZ; choosing lowest-price allocation for a workload that hates interruptions; running a stateful single database or a long job without checkpoints on Spot; ignoring the two-minute notice so in-flight work is lost; and setting a low maximum price, which causes interruptions when the Spot price rises past it. Another trap is thinking you must bid; Spot pricing no longer works as an auction.",
   "Exam wording often signals the fix. 'Reduce Spot interruptions' points to diversifying instance types and AZs and using price-capacity-optimized or capacity-optimized allocation. 'Always keep some capacity' points to an On-Demand base in a mixed instances policy. 'React before the instance is reclaimed' points to the two-minute notice via metadata or EventBridge, or rebalance recommendations with Capacity Rebalancing. 'Lowest cost for fault-tolerant, queue-based batch work' points to Spot workers reading from SQS."
  ],
  "terms": [
   [
    "Spot interruption notice",
    "A two-minute warning, via instance metadata and EventBridge, that EC2 will reclaim a Spot Instance."
   ],
   [
    "Rebalance recommendation",
    "An early signal that a Spot Instance is at elevated risk of interruption."
   ],
   [
    "Capacity Rebalancing",
    "An Auto Scaling feature that launches replacement Spot capacity when a rebalance recommendation arrives."
   ],
   [
    "Spot capacity pool",
    "The spare capacity for one instance type in one Availability Zone."
   ],
   [
    "Mixed instances policy",
    "An Auto Scaling group setting combining multiple instance types and On-Demand and Spot purchase options."
   ],
   [
    "Price-capacity-optimized",
    "A Spot allocation strategy that favors pools with high available capacity and then low price."
   ],
   [
    "On-Demand base capacity",
    "The number of instances in a mixed group that always run as On-Demand before Spot is used."
   ]
  ],
  "example": "A video transcoding service reads jobs from SQS and runs on an Auto Scaling group with two On-Demand instances as a base and the rest on Spot across 10 instance types in three AZs, using price-capacity-optimized allocation. When an interruption notice arrives, a small agent stops taking new jobs and uploads partial output; unfinished messages reappear in the queue for other workers.",
  "tip": "Reduce Spot interruptions by diversifying instance types and AZs and using price-capacity-optimized or capacity-optimized allocation. The warning is two minutes. Keep a small On-Demand base for capacity that must always exist.",
  "check": [
   [
    "How much warning does EC2 give before reclaiming a Spot Instance, and where does it appear?",
    "Two minutes, through the instance metadata service and an EventBridge event."
   ],
   [
    "Why does limiting a Spot fleet to one instance type in one AZ increase risk?",
    "All instances then share one Spot capacity pool, so a single capacity shortage can interrupt them all."
   ],
   [
    "Which allocation strategy does AWS recommend for most Spot workloads?",
    "Price-capacity-optimized, which picks pools with the most available capacity and then the lowest price."
   ],
   [
    "An Auto Scaling group must always keep at least three instances regardless of Spot availability. How do you configure it?",
    "Use a mixed instances policy with an On-Demand base capacity of three, and Spot for capacity above that."
   ]
  ]
 },
 {
  "t": "Right-sizing compute: AWS Compute Optimizer, Graviton instances, and serverless vs always-on cost models",
  "body": [
   "Right-sizing means matching resources to what a workload actually uses. Many instances are launched larger than needed, often copied from an on-premises server specification or chosen in a hurry, and never revisited. Because you pay for provisioned capacity whether or not it is used, right-sizing is often the fastest way to save money. It should come before buying Savings Plans or Reserved Instances, so you do not lock in discounts on waste for one or three years.",
   "AWS Compute Optimizer analyzes Amazon CloudWatch utilization metrics, such as CPU, network, disk and, when the CloudWatch agent publishes it, memory, for EC2 instances, Auto Scaling groups, EBS volumes, Lambda functions, ECS services on Fargate and supported RDS databases. It classifies resources as over-provisioned, under-provisioned or optimized, and recommends specific instance types, volume configurations or Lambda memory sizes, with the projected performance risk and savings for each option. You opt in once, then view results in the console or with `aws compute-optimizer get-ec2-instance-recommendations`. Memory metrics are not collected by default on EC2, because the hypervisor cannot see inside the guest operating system, so installing the CloudWatch agent makes memory-aware recommendations possible. Cost Explorer also offers rightsizing recommendations, and AWS Trusted Advisor flags low-utilization instances.",
   "AWS Graviton processors are Arm-based chips designed by AWS. Graviton instance types, marked with a `g` in the name such as `m7g` or `c7g`, typically offer better price performance than comparable x86 instances for many workloads, along with lower energy use. The catch is compatibility: software must run on the Arm64 architecture. Interpreted and just-in-time (JIT) compiled languages such as Python, Node.js, Java and .NET usually move easily, and many container images are published for multiple architectures; native binaries must be recompiled, and some commercial software may not yet support Arm. Graviton is also available for Lambda, Fargate, RDS, Aurora and ElastiCache, where switching is often a configuration change and can be a quick win.",
   "The deeper choice is the cost model. An always-on EC2 instance or container costs the same whether it serves one request or a million, so it is efficient for steady, high utilization, especially when covered by Savings Plans. Serverless services such as Lambda, Fargate for short-lived tasks, DynamoDB on-demand and Aurora Serverless v2 charge for actual usage, so they are efficient for idle, spiky or unpredictable workloads, and they remove patching and capacity work. At very high, constant volumes a well-utilized fleet can become cheaper than per-request pricing, so the right answer depends on the traffic pattern. For Lambda, memory size also sets CPU, so right-sizing memory, which Compute Optimizer and the open source Lambda Power Tuning tool help with, can reduce both duration and cost.",
   "Also switch off what you do not need. Schedule development and test environments to stop outside working hours with the Instance Scheduler on AWS solution or Amazon EventBridge Scheduler rules; an environment used 50 hours a week is idle for most of the week's 168 hours. Delete unused Elastic IP addresses and idle load balancers, and tag resources with an owner so orphans can be traced and removed.",
   "Consider a worked example. A company's fleet of 40 `m5.2xlarge` instances averages 12 percent CPU. Before acting, the team installs the CloudWatch agent so memory is visible, and after two weeks Compute Optimizer recommends `m7g.large` with low performance risk. The Java application runs unchanged on Arm after a multi-architecture container rebuild, and load tests confirm latency. Only then does the team cover the smaller fleet with a Savings Plan sized from Cost Explorer's recommendation. An internal reporting tool used a few times a day moves from an always-on instance to Lambda, and the dev environment now stops every evening and weekend.",
   "Common mistakes: buying commitments before right-sizing; trusting CPU-only data for memory-bound workloads, which can lead to a recommendation that runs out of memory; assuming every application runs on Graviton without testing native dependencies; moving a steady, high-volume service to per-request pricing and paying more; and right-sizing once and never again, even though usage changes. Another trap is shrinking below what peak demand needs; use Auto Scaling to handle peaks rather than sizing every instance for them.",
   "Exam questions are usually worded around cost and evidence. 'Recommend instance types based on utilization' or 'identify over-provisioned resources' points to Compute Optimizer. 'Memory utilization not visible' points to installing the CloudWatch agent. 'Better price performance' with 'minimal code changes' for Java, Python or Node.js points to Graviton. 'Runs a few times a day' or 'idle most of the time' points to serverless; 'steady high utilization' points to right-sized instances with commitments. 'Development environments run all night' points to scheduled stop and start."
  ],
  "terms": [
   [
    "Right-sizing",
    "Adjusting resource types and sizes to match actual utilization and performance needs."
   ],
   [
    "AWS Compute Optimizer",
    "A service that uses utilization metrics to recommend optimal EC2, EBS, Lambda, ECS and other configurations."
   ],
   [
    "AWS Graviton",
    "AWS-designed Arm-based processors offering strong price performance for compatible workloads."
   ],
   [
    "CloudWatch agent",
    "Software that publishes additional metrics such as memory utilization from instances to CloudWatch."
   ],
   [
    "Over-provisioned",
    "A resource whose capacity is well above what the workload uses, so it can be downsized."
   ],
   [
    "Instance Scheduler on AWS",
    "An AWS solution that starts and stops EC2 and RDS instances on defined schedules."
   ]
  ],
  "example": "A company's fleet of 40 m5.2xlarge instances averages 12 percent CPU. Compute Optimizer, with memory data from the CloudWatch agent, recommends m7g.large. The Java application runs unchanged on Arm after a container rebuild, and the team then covers the smaller fleet with a Savings Plan. An internal tool used a few times a day moves from an always-on instance to Lambda.",
  "tip": "Get recommendations from utilization data: Compute Optimizer. Better price performance with recompile-free languages: Graviton. Idle or spiky workloads favor serverless; steady high utilization favors provisioned capacity with commitments. Right-size before committing.",
  "check": [
   [
    "Why might Compute Optimizer give less accurate EC2 recommendations by default?",
    "EC2 does not report memory utilization without the CloudWatch agent, so memory-bound workloads can be misjudged."
   ],
   [
    "What must you check before moving an application to Graviton?",
    "That its code and dependencies support Arm64; native binaries and some libraries may need recompiling or replacing."
   ],
   [
    "Why should you right-size before buying a Savings Plan?",
    "A commitment sized to oversized instances locks in paying for waste for one or three years."
   ],
   [
    "A reporting job runs for two minutes four times a day on a dedicated instance. What cost model fits better?",
    "A serverless option such as Lambda, which charges only while the job runs instead of for idle hours."
   ]
  ]
 },
 {
  "t": "S3 storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA and the three Glacier classes",
  "body": [
   "All Amazon S3 storage classes are designed for the same very high durability, eleven nines (99.999999999 percent), but the One Zone classes keep data in a single Availability Zone (AZ) and so can lose data if that AZ is destroyed. What differs between classes is availability, retrieval speed, minimum storage duration, minimum billable object size, retrieval fees and storage price. Picking the class that fits the access pattern is one of the most common cost questions on the exam, and the answer always comes from how often and how fast the data must be read.",
   "S3 Standard is for frequently accessed data: low latency, high throughput, no retrieval fee and no minimum duration. S3 Standard-Infrequent Access (Standard-IA) is cheaper to store but charges a per-GB retrieval fee, has a 30-day minimum storage charge and a 128 KB minimum billable object size. It suits backups and older data that must still be available in milliseconds when requested. S3 One Zone-IA costs less than Standard-IA because it stores data in one AZ only; use it for data you can recreate, such as secondary backup copies or generated thumbnails. You set the class at upload, for example `aws s3 cp report.pdf s3://docs-bucket/ --storage-class STANDARD_IA`, or move objects later with lifecycle rules.",
   "S3 Intelligent-Tiering automatically moves each object between access tiers based on its own access pattern. Objects not accessed for 30 days move to an Infrequent Access tier, and after 90 days to an Archive Instant Access tier, all with millisecond access. Optional Archive Access and Deep Archive Access tiers, which you opt into, hold even colder data with asynchronous retrieval. There are no retrieval fees, only a small monthly monitoring and automation charge per object; objects smaller than 128 KB are not monitored and are always charged at the frequent access rate. It is the answer when access patterns are unknown, changing or different for each object.",
   "The three Glacier classes are for archives. S3 Glacier Instant Retrieval offers millisecond access for data accessed about once a quarter, with a 90-day minimum and higher retrieval fees than Standard-IA. S3 Glacier Flexible Retrieval, formerly just S3 Glacier, is cheaper to store, but objects must be restored before use, with retrievals taking minutes (expedited) to hours (standard or bulk, where bulk retrievals are free), and a 90-day minimum. S3 Glacier Deep Archive is the lowest-cost storage in AWS, for data kept for years for compliance, with standard retrieval within 12 hours, bulk within 48 hours, and a 180-day minimum. When comparing classes, weigh storage cost against retrieval and request costs, and remember that an object deleted or transitioned before its class's minimum duration is still billed for the remaining days.",
   "Consider a worked example. A hospital keeps imaging files that are read often for a month, occasionally for a year, and must be kept for ten years. New images go to S3 Standard. After 30 days a lifecycle rule moves them to Standard-IA, because doctors still open some of them and need them immediately. After a year they move to Glacier Instant Retrieval, since the rare lookup must still be instant, and after three years to Glacier Deep Archive for compliance-only retention, where a 12-hour wait is acceptable. A separate bucket of patient-portal thumbnails, which can be regenerated from the originals, uses One Zone-IA.",
   "Common mistakes: choosing One Zone-IA for the only copy of important data; choosing Glacier Flexible Retrieval or Deep Archive when the question says the data must be available immediately; moving millions of tiny objects to IA or Glacier classes, where per-object charges and minimum sizes can raise costs; and forgetting minimum storage durations, so short-lived data placed in IA costs more than it would in Standard. Another trap is assuming Intelligent-Tiering has retrieval fees; it has none, only the per-object monitoring charge.",
   "Exam questions usually encode the access pattern in a phrase. 'Unknown', 'unpredictable' or 'changing access patterns' points to Intelligent-Tiering. 'Infrequently accessed but must be available immediately' points to Standard-IA, or Glacier Instant Retrieval if access is about quarterly and cost matters most. 'Can be recreated' or 'secondary copy' plus lowest cost with millisecond access points to One Zone-IA. 'Archive, retrieval within minutes to hours' points to Glacier Flexible Retrieval. 'Retain for years for compliance, rarely or never read, retrieval within 12 or 48 hours acceptable, lowest cost' points to Glacier Deep Archive."
  ],
  "terms": [
   [
    "S3 Standard",
    "The default class for frequently accessed data, with no retrieval fees or minimum duration."
   ],
   [
    "Standard-IA",
    "An S3 class for infrequently accessed data with millisecond access, retrieval fees and a 30-day minimum."
   ],
   [
    "One Zone-IA",
    "A lower-cost infrequent-access class that stores data in a single Availability Zone."
   ],
   [
    "Intelligent-Tiering",
    "An S3 class that automatically moves objects between access tiers based on their usage, with no retrieval fees."
   ],
   [
    "Glacier Instant Retrieval",
    "An archive class with millisecond access for data read about once a quarter, with a 90-day minimum."
   ],
   [
    "Glacier Flexible Retrieval",
    "An archive class whose objects must be restored first, taking minutes to hours, with a 90-day minimum."
   ],
   [
    "Glacier Deep Archive",
    "The lowest-cost S3 class, for long-term archives retrieved within hours, with a 180-day minimum."
   ]
  ],
  "example": "A hospital keeps imaging files that are read often for a month, occasionally for a year, and must be kept for ten years. New images go to S3 Standard, move to Standard-IA after 30 days, to Glacier Instant Retrieval after a year because doctors may still need them quickly, and to Glacier Deep Archive after three years for compliance-only retention.",
  "tip": "Unknown or changing access: Intelligent-Tiering. Rarely read but must be instant: Standard-IA or Glacier Instant Retrieval. Recreatable data: One Zone-IA. Archive with hours of retrieval acceptable at the lowest price: Deep Archive.",
  "check": [
   [
    "Which S3 classes could lose data if one Availability Zone is destroyed?",
    "The One Zone classes, such as S3 One Zone-IA, because they store data in only one AZ."
   ],
   [
    "Data must be kept seven years and is almost never read; retrieval within 48 hours is acceptable. Which class is cheapest?",
    "S3 Glacier Deep Archive."
   ],
   [
    "Objects are read unpredictably, some daily and some never. Which class avoids guessing?",
    "S3 Intelligent-Tiering, which moves each object between tiers based on its own access, with no retrieval fees."
   ],
   [
    "You store files in Standard-IA and delete them after 10 days. How are you billed?",
    "For the 30-day minimum storage duration, so short-lived data is usually cheaper in S3 Standard."
   ]
  ]
 },
 {
  "t": "S3 Lifecycle rules, S3 Storage Lens and Requester Pays",
  "body": [
   "Choosing a storage class once is not enough, because data cools over time: this week's logs are read constantly, last year's almost never. Amazon S3 gives you automation to move and delete data as it ages (Lifecycle rules), analytics to find where storage money is going across the organization (S3 Storage Lens), and a billing option for sharing large datasets without paying for everyone else's downloads (Requester Pays). S3 Lifecycle rules are configured on a bucket and apply to all objects, or to a subset filtered by prefix, object tags or object size. A rule has two kinds of actions. Transition actions move objects to a cheaper class a number of days after creation, for example to Standard-IA after 30 days and Glacier Flexible Retrieval after 90. Expiration actions delete objects after a period. On versioned buckets, separate noncurrent version actions transition or expire older versions, for example keep noncurrent versions for 30 days and then delete them, which stops old versions quietly growing the bill. Rules can also remove expired delete markers and abort incomplete multipart uploads after a set number of days.",
   "A lifecycle configuration is a small JSON document you apply with `aws s3api put-bucket-lifecycle-configuration --bucket app-logs --lifecycle-configuration file://rules.json`. A typical rule for logs looks like this.",
   "```json\n{\"Rules\": [{\"ID\": \"logs\", \"Status\": \"Enabled\",\n  \"Filter\": {\"Prefix\": \"logs/\"},\n  \"Transitions\": [{\"Days\": 30, \"StorageClass\": \"STANDARD_IA\"},\n                  {\"Days\": 90, \"StorageClass\": \"GLACIER\"}],\n  \"NoncurrentVersionExpiration\": {\"NoncurrentDays\": 30},\n  \"AbortIncompleteMultipartUpload\": {\"DaysAfterInitiation\": 7}}]}\n```",
   "Transitions follow a one-way waterfall from warmer to colder classes; a lifecycle rule cannot move objects back to Standard, which requires restoring or copying them. Some transitions have minimums: objects must be stored at least 30 days before a lifecycle transition to Standard-IA or One Zone-IA. Remember minimum storage durations and per-object transition charges, so transitioning millions of tiny objects may cost more than it saves; by default, lifecycle rules do not transition objects smaller than 128 KB. When you cannot predict access patterns, Intelligent-Tiering is often simpler than hand-tuned rules. You can check what a bucket currently has with `aws s3api get-bucket-lifecycle-configuration --bucket app-logs`.",
   "S3 Storage Lens gives organization-wide visibility into storage usage and activity across accounts, Regions, buckets and prefixes. It highlights cost-efficiency opportunities, such as buckets without lifecycle rules, large amounts of noncurrent versions or incomplete multipart uploads, and data protection gaps, such as buckets without versioning or replication. Free metrics are included; advanced metrics and recommendations are a paid upgrade. S3 Storage Class Analysis is a related per-bucket feature that observes access patterns to suggest when to transition data to Standard-IA. Storage Lens is configured once, typically from the management account or a delegated administrator, and its dashboard is the fastest way to spot which buckets deserve a lifecycle rule. Normally the bucket owner pays for storage and for data transferred out of the bucket. With Requester Pays enabled, the requester pays the request and data transfer costs, while the owner still pays for storage. Requesters must be authenticated AWS identities and must acknowledge the charge, for example with `--request-payer requester` in the CLI, so anonymous access is not possible. It suits sharing large datasets, such as research or genomic data, with other organizations.",
   "Consider a worked example. A company finds with Storage Lens that one logging bucket holds hundreds of terabytes of noncurrent versions and abandoned multipart uploads. It adds a lifecycle rule that moves current logs to Standard-IA after 30 days and Glacier Flexible Retrieval after 90, expires noncurrent versions after 30 days and aborts incomplete uploads after seven days, and the bucket's monthly cost falls steeply. Storage Lens is then used each month to confirm the savings and find the next bucket to tidy.",
   "Common mistakes: forgetting noncurrent version rules on versioned buckets, so deleted or overwritten objects keep costing money; expecting a lifecycle rule to move data back to a warmer class; transitioning short-lived or tiny objects into IA or Glacier classes where minimums outweigh savings; and enabling Requester Pays on a bucket meant for anonymous public access, which then fails. Another trap is confusing Storage Lens (organization-wide analytics dashboard) with Storage Class Analysis (per-bucket access analysis for IA transitions).",
   "Exam wording is usually direct. 'Automatically move objects to cheaper storage as they age' or 'delete logs after a year' points to lifecycle rules. 'Old versions filling a versioned bucket' points to a noncurrent version expiration action. 'Organization-wide visibility of storage usage and cost-saving opportunities across accounts' points to S3 Storage Lens. 'Others downloading our large dataset should pay the transfer costs' points to Requester Pays, which requires authenticated requesters."
  ],
  "terms": [
   [
    "Lifecycle rule",
    "A bucket configuration that transitions or expires objects automatically based on age and filters."
   ],
   [
    "Transition action",
    "A lifecycle action that moves objects to a colder storage class after a set number of days."
   ],
   [
    "Expiration action",
    "A lifecycle action that deletes objects, or noncurrent versions, after a set period."
   ],
   [
    "Noncurrent version",
    "An older version of an object in a versioned bucket, which lifecycle rules can transition or expire separately."
   ],
   [
    "S3 Storage Lens",
    "An analytics dashboard providing organization-wide storage usage, activity and recommendations."
   ],
   [
    "Requester Pays",
    "A bucket setting that makes authenticated requesters pay for requests and data transfer."
   ]
  ],
  "example": "A company finds with Storage Lens that one logging bucket holds hundreds of terabytes of noncurrent versions and abandoned multipart uploads. It adds a lifecycle rule that moves current logs to Standard-IA after 30 days and Glacier Flexible Retrieval after 90, expires noncurrent versions after 30 days and aborts incomplete multipart uploads after seven days.",
  "tip": "Old versions filling a versioned bucket: add a noncurrent version expiration rule. Organization-wide storage visibility: Storage Lens. Others downloading your large dataset should pay transfer costs: Requester Pays, which requires authenticated requesters.",
  "check": [
   [
    "Can a lifecycle rule move objects from Glacier Flexible Retrieval back to S3 Standard?",
    "No. Lifecycle transitions only move data to colder classes. Restoring or copying objects is a separate operation."
   ],
   [
    "Under Requester Pays, who pays for storing the data?",
    "The bucket owner still pays for storage; requesters pay for requests and data transfer."
   ],
   [
    "A versioned bucket's size keeps growing even though users delete files. What should you add?",
    "A lifecycle rule with a noncurrent version expiration action, plus removal of expired delete markers."
   ],
   [
    "Which tool shows storage usage and cost-efficiency recommendations across all accounts in an organization?",
    "S3 Storage Lens."
   ]
  ]
 },
 {
  "t": "Cutting EBS and backup costs: gp2 to gp3, Data Lifecycle Manager, snapshot archive and unattached volumes",
  "body": [
   "Block storage and its backups are easy to forget, and they keep costing money every month whether anyone uses them or not. Amazon Elastic Block Store (EBS) volumes are billed for provisioned size (and, for some types, provisioned performance), not for what is actually used, and snapshots are billed for the data they store. A handful of habits typically removes a large share of EBS waste without affecting performance, and the exam tests each of them.",
   "Start with volume types. Many older environments still use gp2 volumes, where IOPS (input/output operations per second) scale with volume size, so teams often over-provisioned storage just to get performance. gp3 provides a baseline of 3,000 IOPS and 125 MB/s regardless of size, lets you buy more IOPS and throughput separately, and is priced lower per GB than gp2. You can change a volume from gp2 to gp3 with Elastic Volumes while it stays attached and in use, with no downtime: `aws ec2 modify-volume --volume-id vol-0abc123 --volume-type gp3`. The same feature lets you grow volumes, change IOPS or change types later, but volumes cannot be shrunk in place; shrinking means creating a smaller volume and copying the data.",
   "Next, snapshots. EBS snapshots are incremental: after the first full copy, each snapshot stores only blocks changed since the previous one, and deleting an old snapshot keeps any blocks later snapshots still need, so you can safely delete old ones. Costs grow when snapshots are never cleaned up. Amazon Data Lifecycle Manager (DLM) automates the creation, retention and deletion of EBS snapshots and EBS-backed Amazon Machine Images (AMIs) using policies that target volumes or instances by tag: for example, snapshot every 12 hours, keep 14 copies, and copy weekly snapshots to another Region for disaster recovery. AWS Backup can do this too, across many services at once, with central backup plans and vaults.",
   "For snapshots you must keep for a long time but rarely restore, such as month-end or compliance snapshots, EBS Snapshots Archive moves a snapshot to a much lower-cost archive tier. Archived snapshots are stored as full snapshots rather than incremental, have a minimum archive period of 90 days, and must be restored to the standard tier before use, which can take up to 72 hours. So archive snapshots you keep for 90 days or longer and rarely need; keep recent operational snapshots in the standard tier. The Recycle Bin can retain deleted snapshots and AMIs for a period you choose, guarding against accidental deletion.",
   "Finally, find orphans. Unattached EBS volumes, shown in the `available` state, are still billed. They often appear when instances are terminated with data volumes that were not set to delete on termination. You can list them with `aws ec2 describe-volumes --filters Name=status,Values=available`. Cost Explorer, Trusted Advisor's underutilized and idle volume checks, Compute Optimizer and AWS Config rules help find them. Snapshot a volume if in doubt, then delete it. Also look for old AMIs whose snapshots are still stored, and for over-provisioned io1 or io2 IOPS that could move to gp3.",
   "Consider a worked example. A cost review finds 300 gp2 volumes, 80 unattached volumes and five years of daily snapshots that nobody has pruned. The team converts the gp2 volumes to gp3 in place with Elastic Volumes during business hours with no outage, snapshots and deletes the unattached volumes after checking tags for owners, creates a DLM policy that keeps 14 daily snapshots for every volume tagged `Backup=daily`, deletes the old daily snapshots, and moves the required year-end snapshots to the archive tier. The monthly EBS bill drops substantially, and restores are now predictable.",
   "Common mistakes: believing a gp2 to gp3 change requires downtime or a new volume; archiving snapshots that are needed for quick restores or kept for less than 90 days; thinking deleting an older incremental snapshot breaks newer ones; forgetting that detached volumes and AMI-backing snapshots keep costing money; and expecting Elastic Volumes to shrink a volume. Another trap is leaving `DeleteOnTermination` off for data volumes on disposable instances, which is how orphans accumulate.",
   "Exam questions are usually worded around waste. 'Reduce EBS cost without downtime' or 'gp2 volumes' points to migrating to gp3 with Elastic Volumes. 'Automate snapshot creation and retention by tag' points to Data Lifecycle Manager, or AWS Backup when several services are involved. 'Long-term, rarely accessed snapshots at lowest cost' points to EBS Snapshots Archive. 'Volumes in the available state' or 'left over after instances were terminated' points to finding and deleting unattached volumes. 'Protect against accidental snapshot deletion' points to Recycle Bin."
  ],
  "terms": [
   [
    "Elastic Volumes",
    "An EBS feature to change volume type, size, IOPS or throughput while the volume is in use."
   ],
   [
    "Incremental snapshot",
    "An EBS snapshot that stores only blocks changed since the previous snapshot."
   ],
   [
    "Data Lifecycle Manager",
    "A service that automates EBS snapshot and AMI creation, retention and cross-Region copies by tag-based policy."
   ],
   [
    "EBS Snapshots Archive",
    "A low-cost tier for rarely accessed snapshots with a 90-day minimum and restores taking up to 72 hours."
   ],
   [
    "Recycle Bin",
    "A feature that retains deleted snapshots and AMIs for a set period so they can be recovered."
   ],
   [
    "Unattached volume",
    "An EBS volume in the available state, not attached to any instance but still billed."
   ]
  ],
  "example": "A cost review finds 300 gp2 volumes, 80 unattached volumes and five years of daily snapshots. The team converts gp2 to gp3 in place with Elastic Volumes, snapshots and deletes the unattached volumes, creates a DLM policy that keeps 14 daily snapshots, and moves required year-end snapshots to the archive tier.",
  "tip": "gp2 to gp3 is a no-downtime change that usually saves money. Automating snapshot retention by tag: Data Lifecycle Manager. Long-term, rarely restored snapshots: Snapshots Archive. Unattached volumes still cost money.",
  "check": [
   [
    "Do you need to stop the instance to change a volume from gp2 to gp3?",
    "No. Elastic Volumes changes the type while the volume stays attached and in use."
   ],
   [
    "When is EBS Snapshots Archive a poor choice?",
    "For snapshots you may need to restore quickly or keep for less than 90 days, since restores take up to 72 hours and there is a 90-day minimum."
   ],
   [
    "If you delete the oldest of five incremental snapshots, can you still restore from the newest?",
    "Yes. EBS keeps any blocks that later snapshots still reference, so each remaining snapshot stays fully restorable."
   ],
   [
    "Why do unattached EBS volumes often appear after instances are terminated?",
    "Data volumes without delete-on-termination enabled stay behind in the available state and continue to be billed."
   ]
  ]
 },
 {
  "t": "Database cost choices: DynamoDB on-demand vs provisioned, Aurora Serverless v2, reserved DB instances and stopping idle databases",
  "body": [
   "Databases are often among the largest line items on an AWS bill because they run all the time, and because teams size them for peak load and then leave them. Cost optimization here comes down to three habits: match the capacity model to the traffic pattern, commit where usage is steady, and stop paying for databases nobody is using. The exam presents a traffic description or an idle environment and asks for the most cost-effective option that still meets the requirement.",
   "For Amazon DynamoDB, the choice is between capacity modes. On-demand mode charges per read and write request, needs no capacity planning and absorbs sudden spikes, which makes it cost-effective for new applications, unpredictable traffic and tables that are idle much of the time. Provisioned mode charges per hour for the read capacity units (RCUs) and write capacity units (WCUs) you set, whether you use them or not; with auto scaling tracking a target utilization, it is usually cheaper for steady, predictable traffic, and reserved capacity reduces the price further for long-term commitments. A common path is to start on-demand, learn the pattern from CloudWatch metrics, and move stable tables to provisioned. Other DynamoDB savings include the Standard-Infrequent Access (Standard-IA) table class for tables whose storage cost dominates their throughput cost, and time to live (TTL) to delete expired items without consuming write capacity.",
   "Aurora Serverless v2 scales database capacity automatically in fine-grained increments measured in Aurora capacity units (ACUs), between a minimum and maximum you set, within seconds and without dropping connections. You pay for the capacity used each second. It suits variable, spiky or unpredictable workloads, development and test databases, and multi-tenant applications. A low minimum keeps idle cost small, and recent versions can pause automatically when idle if you set the minimum to zero, at the cost of a short resume delay. For consistently busy databases, provisioned Aurora instances with reserved pricing are usually cheaper. You can mix provisioned and Serverless v2 instances in one cluster, for example a provisioned writer with serverless readers that scale for reporting peaks.",
   "For steady Amazon Relational Database Service (RDS) and Aurora usage, Reserved DB Instances give a significant discount for a one- or three-year term, just like EC2 Reserved Instances. Size-flexible reservations apply across sizes within an instance family for many engines, so a reservation still helps after you resize within the family. Right-size first using CloudWatch metrics and Compute Optimizer, and consider Graviton-based DB instance classes for better price performance, which for many engines is a simple instance class change during a maintenance window.",
   "Finally, idle databases. You can stop an RDS instance or an Aurora cluster for up to seven days at a time, with `aws rds stop-db-instance --db-instance-identifier test-db`; while stopped, you pay for storage and backups but not instance hours. After seven days AWS automatically starts it again so it does not miss maintenance, so for longer idle periods you either automate stopping it again or take a final snapshot and delete the database, restoring from the snapshot when needed. For dev and test environments, scheduling stops outside working hours with Amazon EventBridge Scheduler and AWS Lambda, or using Aurora Serverless v2 with a low minimum, avoids paying for nights and weekends.",
   "Consider a worked example. A software as a service (SaaS) company's production Aurora writer is busy around the clock at a steady level, so it buys reserved DB instances for it after confirming the size with a month of metrics. Its reporting reader only works hard at month end, so it becomes an Aurora Serverless v2 reader that scales up for a few days and sits near its minimum otherwise. Twenty test databases are stopped every evening and weekend by a scheduled Lambda function, and one used only for an annual audit is snapshotted and deleted. A new feature's DynamoDB table starts in on-demand mode and will be reviewed after three months of traffic data.",
   "Common mistakes: choosing provisioned DynamoDB capacity for brand-new or highly spiky traffic, which either throttles or wastes capacity; buying reserved DB instances before right-sizing; assuming a stopped RDS instance stays stopped indefinitely; choosing Aurora Serverless v2 for a database that is busy at a constant level all day, where provisioned plus reservations is cheaper; and forgetting that storage and backups are still billed while an instance is stopped. Another trap is thinking read replicas reduce cost; they add instances and cost, and are for performance and availability.",
   "Exam questions are usually worded around the traffic pattern. 'Unpredictable', 'spiky', 'new application' or 'idle most of the time' points to DynamoDB on-demand or Aurora Serverless v2. 'Steady', 'predictable' or 'runs 24/7 for years' points to provisioned capacity with reservations, or reserved DB instances. 'Only needed during business hours' points to scheduled stop and start. 'Needed one week per quarter' or 'idle for months' points to snapshot and delete, because a stopped database restarts after seven days."
  ],
  "terms": [
   [
    "On-demand mode (DynamoDB)",
    "A capacity mode that bills per read and write request with no capacity planning."
   ],
   [
    "Provisioned mode (DynamoDB)",
    "A capacity mode that bills hourly for configured RCUs and WCUs, optionally with auto scaling."
   ],
   [
    "Aurora capacity unit (ACU)",
    "The unit of Aurora Serverless v2 capacity, combining memory with corresponding CPU and networking."
   ],
   [
    "Aurora Serverless v2",
    "An Aurora configuration that scales capacity automatically in fine-grained ACU increments between set limits."
   ],
   [
    "Reserved DB Instance",
    "A one- or three-year RDS or Aurora commitment that lowers the hourly instance price."
   ],
   [
    "DynamoDB reserved capacity",
    "A commitment to provisioned DynamoDB capacity for a discounted rate."
   ],
   [
    "Stopped DB instance",
    "An RDS instance not billed for instance hours, which restarts automatically after seven days."
   ]
  ],
  "example": "A SaaS company's production Aurora writer is busy around the clock, so it buys reserved DB instances for it. Its reporting replica only works hard at month end, so it becomes an Aurora Serverless v2 reader. Twenty test databases are stopped every evening and weekend by a scheduled Lambda function, and a new feature's DynamoDB table starts in on-demand mode until its traffic pattern is known.",
  "tip": "Unpredictable or spiky: DynamoDB on-demand or Aurora Serverless v2. Steady and predictable: provisioned capacity with reservations. A stopped RDS database restarts after seven days, so for long idle periods snapshot and delete it.",
  "check": [
   [
    "A test database is needed only one week per quarter. What is the cheapest approach?",
    "Snapshot it and delete the instance, then restore from the snapshot when needed; a stopped instance would restart after seven days."
   ],
   [
    "When is DynamoDB provisioned capacity cheaper than on-demand?",
    "When traffic is steady and predictable, so provisioned capacity with auto scaling stays well utilized."
   ],
   [
    "What do you still pay for while an RDS instance is stopped?",
    "Storage and backups; instance hours are not billed while it is stopped."
   ],
   [
    "An Aurora cluster has a steady writer but a reader that is busy only at month end. What configuration saves money?",
    "Keep a provisioned, reserved writer and make the reader an Aurora Serverless v2 instance that scales with demand."
   ]
  ]
 },
 {
  "t": "Data transfer costs: inter-AZ, inter-Region and internet egress, NAT gateway charges vs gateway endpoints, and CloudFront",
  "body": [
   "Data transfer charges are the hidden cost in many AWS architectures, because they depend on the path traffic takes rather than on any single resource you can point to. Prices vary by Region and change over time, so the exam focuses on the pattern: which flows are free, which cost a little and which cost the most, and how to redesign traffic paths to pay less without giving up resilience.",
   "Data coming into AWS from the internet (ingress) is generally free. Data going out to the internet, called egress, is charged per GB, and it is often the largest transfer cost for public-facing applications. Traffic within the same Availability Zone (AZ) between resources using private IP addresses is generally free. Traffic between AZs in the same Region is charged per GB in each direction, so chatty designs that constantly cross AZs, such as an application tier in one AZ talking to a cache in another, add up. Traffic between Regions is charged at a higher rate, for example for cross-Region replication or a service calling an API in another Region. Using public or Elastic IP addresses between instances can also incur charges that private addressing avoids.",
   "These charges are a reason to keep chatty components in the same AZ where availability allows, while still spreading independent copies across AZs for resilience. For example, an Auto Scaling group spread over three AZs with a load balancer that keeps requests in-zone, and read replicas in each AZ, keeps most traffic local while surviving an AZ failure. Do not sacrifice Multi-AZ resilience just to save transfer costs; the exam expects you to balance both.",
   "NAT gateways charge per hour and per GB processed, on top of any transfer charges. When private instances download large volumes from Amazon S3 or DynamoDB through a NAT gateway, that processing charge can be substantial. A gateway VPC endpoint for S3 or DynamoDB has no charge and keeps that traffic off the NAT gateway, which is one of the most common cost fixes in exam scenarios. You add it to route tables, for example `aws ec2 create-vpc-endpoint --vpc-id vpc-0abc --service-name com.amazonaws.us-east-1.s3 --route-table-ids rtb-0def`. Interface endpoints (AWS PrivateLink) for other services cost per hour and per GB, but typically less per GB than NAT processing, and they also improve security by keeping traffic private. Another NAT saving is to avoid cross-AZ NAT traffic by giving each AZ its own NAT gateway, which also removes a single point of failure.",
   "Amazon CloudFront reduces egress costs as well as latency. Data transfer from AWS origins such as S3 or an Application Load Balancer to CloudFront edge locations is not charged, and CloudFront's rates for delivering to users are generally lower than direct internet egress from the origin, with price classes and savings bundles available. Caching also means the origin handles fewer requests, so you may need fewer instances. Serving a popular download or a global website directly from S3 or EC2 is usually more expensive than serving it through CloudFront. Other tactics: compress data before sending, keep processing in the same Region as the data, use AWS Direct Connect for large steady on-premises transfers, where its data transfer out rates are lower than internet egress, and use S3 Requester Pays when others download your datasets.",
   "Consider a worked example. A company's bill shows high NAT gateway charges. VPC Flow Logs and Cost Explorer grouped by usage type reveal that batch jobs in private subnets pull terabytes from S3 each night through a single NAT gateway in one AZ, so traffic from the other AZs also pays inter-AZ charges. Adding an S3 gateway endpoint to the private route tables removes both the NAT processing and the cross-AZ charges for that traffic. The same review moves product images from direct S3 downloads to CloudFront, lowering egress costs and speeding up the site, and adds a NAT gateway per AZ for the remaining internet-bound traffic.",
   "Common mistakes: assuming all traffic inside a Region is free (inter-AZ is not); assuming a gateway endpoint exists for every service (only S3 and DynamoDB have gateway endpoints; others use interface endpoints); thinking CloudFront adds cost on top of S3 egress, when origin-to-edge transfer is free; routing S3 traffic from private subnets through NAT by default; and collapsing everything into one AZ to save transfer costs, which trades resilience for pennies. Another trap is forgetting that inbound data is generally free, so the question's cost problem is usually outbound or cross-AZ traffic.",
   "Exam questions are usually worded around a surprising bill. 'High NAT gateway data processing charges' with S3 or DynamoDB traffic points to a gateway VPC endpoint. 'High internet egress for static or cacheable content' points to CloudFront. 'Charges between instances in the same Region' points to inter-AZ transfer and co-locating chatty tiers. 'Private access to other AWS services without NAT' points to interface endpoints. 'Large, steady transfers from on premises' points to Direct Connect."
  ],
  "terms": [
   [
    "Egress",
    "Data leaving AWS to the internet, charged per GB."
   ],
   [
    "Ingress",
    "Data entering AWS from the internet, generally free."
   ],
   [
    "Inter-AZ transfer",
    "Traffic between Availability Zones in one Region, charged per GB in each direction."
   ],
   [
    "NAT gateway data processing",
    "A per-GB charge on all traffic passing through a NAT gateway, in addition to its hourly charge."
   ],
   [
    "Gateway VPC endpoint",
    "A free route-table target that gives private subnets access to S3 or DynamoDB without a NAT gateway."
   ],
   [
    "Interface endpoint",
    "A PrivateLink network interface in your subnets for private access to AWS services, billed hourly and per GB."
   ],
   [
    "Price class",
    "A CloudFront setting that limits which edge locations serve content, trading reach for cost."
   ]
  ],
  "example": "A company's bill shows high NAT gateway charges. Flow logs reveal that batch jobs in private subnets pull terabytes from S3 each night through the NAT gateway. Adding an S3 gateway endpoint removes those charges. The same review moves product images from direct S3 downloads to CloudFront, lowering egress costs and speeding up the site.",
  "tip": "High NAT gateway cost with S3 or DynamoDB traffic: add a gateway endpoint. High internet egress for static or cacheable content: put it behind CloudFront. Inbound data is free; cross-AZ and cross-Region traffic is not.",
  "check": [
   [
    "Is data transfer from S3 to CloudFront charged?",
    "No. Transfer from AWS origins to CloudFront edge locations is free; you pay CloudFront's delivery rates to viewers."
   ],
   [
    "Two EC2 instances in different AZs of the same Region exchange 10 TB per month. Is that free?",
    "No. Inter-AZ traffic is charged per GB in each direction."
   ],
   [
    "Which AWS services support gateway VPC endpoints?",
    "Only Amazon S3 and Amazon DynamoDB; other services use interface endpoints."
   ],
   [
    "Private instances in three AZs share one NAT gateway. What two costs does that create beyond the NAT hourly charge?",
    "NAT per-GB processing on all traffic, plus inter-AZ transfer for instances in the other two AZs; a NAT gateway per AZ avoids the latter."
   ]
  ]
 },
 {
  "t": "Cost visibility tools: Cost Explorer, AWS Budgets, Cost and Usage Reports, cost allocation tags and Trusted Advisor",
  "body": [
   "You cannot optimize what you cannot see. AWS provides a set of tools to see where money goes, attribute it to teams, alert before overspending and find savings. They overlap a little, which is exactly why the exam likes them: a question typically describes a need, such as alert, analyze, report in detail, attribute or recommend, and asks which tool fits. Learning the one verb each tool owns is the most reliable way to answer.",
   "AWS Cost Explorer is the interactive tool for visualizing and analyzing costs and usage. You can view the last 13 months by default, with optional longer history, group and filter by service, linked account, Region, usage type or tag, and see forecasts of future spend. It also contains recommendations for Reserved Instance and Savings Plans purchases based on your usage, reports on their utilization and coverage, and rightsizing recommendations. Use it to answer questions like which service grew most last month. The same data is available programmatically, for example `aws ce get-cost-and-usage --time-period Start=2026-08-01,End=2026-09-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE`.",
   "AWS Budgets lets you set custom budgets for cost, usage, reservation utilization or coverage, and Savings Plans, and sends alerts by email or Amazon Simple Notification Service (SNS) when actual or forecasted amounts cross thresholds. Budget actions go further, for example applying an IAM policy or a service control policy (SCP) that prevents launching new resources, or stopping specific EC2 or RDS instances, when a budget is exceeded, either automatically or after approval. Budgets is the answer for proactive alerting; Cost Explorer is for analysis. AWS Cost Anomaly Detection uses machine learning to spot unusual spending, such as a sudden jump in one service, and alert you without fixed thresholds.",
   "The AWS Cost and Usage Report (CUR), now delivered through AWS Data Exports, is the most detailed billing data available: line items for each resource by hour or day, with pricing, reservation and Savings Plans details and tags, delivered to an S3 bucket. It is designed to be queried with Amazon Athena, loaded into Amazon Redshift or visualized in Amazon QuickSight, and it is the answer when finance needs the most granular data for custom chargeback or showback reports.",
   "Cost allocation tags connect costs to owners. You tag resources with keys such as `CostCenter` or `Project`, then activate those tags as cost allocation tags in the Billing and Cost Management console; only after activation do they appear in Cost Explorer and the CUR, and only for costs from then on. AWS-generated tags such as `aws:createdBy` can also be activated. Tag policies in AWS Organizations help enforce consistent tag keys and values, and AWS Cost Categories group costs by rules, such as mapping accounts and tags to business units. AWS Trusted Advisor inspects your account and recommends improvements across cost optimization, performance, security, fault tolerance, service limits and operational excellence, such as idle load balancers, underutilized instances, unassociated Elastic IP addresses and overly open security groups. All customers get a core set of checks; the full set requires a Business Support plan or higher.",
   "Consider a worked example. A company wants each product team to see its own monthly spend and be warned early. It tags every resource with `Team`, enforces the key with a tag policy, and activates it as a cost allocation tag. It creates a budget per team filtered by the tag, with alerts to each team's SNS topic at 80 percent of forecast and a budget action that applies a deny policy for new instance launches in the sandbox account at 100 percent. Finance receives the Cost and Usage Report in S3 and queries it through Athena for monthly chargeback, while the platform team reviews Trusted Advisor and Cost Explorer's Savings Plans recommendations each quarter.",
   "Common mistakes: expecting tags to appear in billing tools without activating them; expecting historical costs to be retagged after activation; choosing Cost Explorer when the requirement is an alert or an automatic action (that is Budgets); choosing Cost Explorer when finance needs hourly, line-item data (that is the CUR); and assuming every Trusted Advisor check is available on the Basic Support plan. Another trap is confusing Budgets with Cost Anomaly Detection: budgets use thresholds you set, while anomaly detection learns normal patterns.",
   "Exam wording maps to one tool each. 'Alert when spending is forecast to exceed' or 'stop resources when over budget' points to AWS Budgets. 'Analyze trends', 'forecast', 'which service increased' or 'Savings Plans recommendations' points to Cost Explorer. 'Most granular', 'hourly line items', 'custom reports with Athena' points to the Cost and Usage Report. 'Costs per team or project' points to activated cost allocation tags. 'Unexpected spike without setting thresholds' points to Cost Anomaly Detection. 'Best-practice checks, idle resources, open security groups' points to Trusted Advisor."
  ],
  "terms": [
   [
    "Cost Explorer",
    "An interactive tool to analyze, visualize and forecast AWS costs and usage, with commitment recommendations."
   ],
   [
    "AWS Budgets",
    "A service that alerts, and can take actions, when costs or usage exceed or are forecast to exceed thresholds."
   ],
   [
    "Budget action",
    "An automatic or approved response to a budget threshold, such as applying a restrictive policy or stopping instances."
   ],
   [
    "Cost and Usage Report",
    "The most detailed AWS billing dataset, delivered to S3 for analysis with tools like Athena."
   ],
   [
    "Cost allocation tag",
    "A resource tag activated in billing so costs can be grouped and filtered by it."
   ],
   [
    "Cost Anomaly Detection",
    "A service that uses machine learning to detect and alert on unusual spending patterns."
   ],
   [
    "AWS Trusted Advisor",
    "A service that checks accounts against best practices for cost, performance, security, fault tolerance and limits."
   ]
  ],
  "example": "A company wants each product team to see its own monthly spend and be warned early. It tags every resource with Team, activates the tag as a cost allocation tag, creates a budget per team filtered by the tag with alerts at 80 percent of forecast, and gives finance the Cost and Usage Report in S3 queried through Athena for chargeback.",
  "tip": "Alert before overspending: Budgets. Analyze trends and get Savings Plans recommendations: Cost Explorer. Most granular data for custom reports: Cost and Usage Report. Costs per team or project: activate cost allocation tags. Best-practice checks: Trusted Advisor.",
  "check": [
   [
    "You tagged resources with Project six months ago, but the tag does not appear in Cost Explorer. Why?",
    "The tag has not been activated as a cost allocation tag in the Billing console; tags only show in cost tools after activation, and only going forward."
   ],
   [
    "Which tool can automatically stop instances when spending exceeds a threshold?",
    "AWS Budgets, using budget actions."
   ],
   [
    "Finance needs hourly, per-resource billing line items to build custom chargeback reports. Which tool?",
    "The AWS Cost and Usage Report, delivered to S3 through Data Exports and queried with Athena or similar tools."
   ],
   [
    "A developer wants to be alerted to unusual spending spikes without choosing fixed thresholds. Which service?",
    "AWS Cost Anomaly Detection, which learns normal spending patterns with machine learning."
   ]
  ]
 },
 {
  "t": "Consolidated billing in AWS Organizations: volume discounts and sharing Reserved Instance and Savings Plans benefits",
  "body": [
   "Consolidated billing is a built-in feature of AWS Organizations. The management account, historically called the payer account, receives one bill for all member accounts and pays it, while each account's charges remain visible separately. There is no extra charge for it, and it brings both administrative benefits, such as one payment method and one invoice, and financial benefits, which are what the exam focuses on. Every organization has consolidated billing, whether it uses only billing features or all features, such as service control policies (SCPs).",
   "The first financial benefit is volume pricing. Some services charge less per unit as usage grows, such as Amazon S3 storage tiers and data transfer out. With consolidated billing, AWS treats all accounts in the organization as one customer for these tiers, so combined usage reaches cheaper tiers sooner than any single account would on its own. For example, if each of five accounts stores a modest amount in S3, their combined total may cross into a lower per-GB tier that none would reach alone.",
   "The second benefit is sharing commitment discounts. Reserved Instances (RIs) and Savings Plans purchased in one account can apply to matching usage in any other account in the organization. For example, if the production account bought RIs for more `m6i` instances than it is currently running, the unused RI hours can discount matching `m6i` usage in a development account. Commitments apply first to usage in the account that bought them, and any remaining benefit then flows to other accounts. This sharing means a central team can buy commitments for the whole organization and maximize their utilization, since one account's quiet period can be filled by another's demand.",
   "Sharing is on by default, but it can be turned off for specific accounts from the management account's billing preferences, under RI and Savings Plans discount sharing. When sharing is turned off for an account, that account's own purchases apply only to itself, and it does not receive discounts from purchases made in other accounts. Companies sometimes do this when business units must be billed strictly separately, for example after an acquisition, for a subsidiary with its own budget, or for regulatory reasons. Credits can be shared or restricted in a similar way.",
   "Consolidated billing combines with the cost tools covered earlier. Cost Explorer and the Cost and Usage Report in the management account show all member accounts, and you can filter or group by linked account, for example `aws ce get-cost-and-usage ... --group-by Type=DIMENSION,Key=LINKED_ACCOUNT`. AWS Budgets can track per-account budgets, and cost allocation tags are activated in the management account for the whole organization. Member accounts can be allowed to see their own cost data. Keep in mind that the management account is responsible for paying all member account charges, which is another reason to protect it carefully, restrict who can sign in to it, and run no workloads in it.",
   "Consider a worked example. A company with 12 accounts buys a Compute Savings Plan centrally in its management account, sized from Cost Explorer's organization-wide recommendation. On weekdays the commitment is consumed mostly by production workloads; on weekends, when production is quieter, the same commitment automatically discounts batch jobs in the analytics account, so utilization stays near 100 percent. Combined S3 storage across all accounts also lands in lower pricing tiers. A recently acquired subsidiary, which must be charged back exactly, has discount sharing turned off so it neither contributes to nor benefits from the shared commitments.",
   "Common mistakes: thinking each account must buy its own RIs to benefit (sharing is automatic by default); thinking consolidated billing costs extra; assuming discount sharing can be disabled from a member account (it is controlled in the management account's billing preferences); running production workloads in the management account; and forgetting that turning off sharing blocks both directions, so the account neither gives nor receives. Another trap is confusing consolidated billing with SCPs; billing combines charges, while SCPs restrict permissions.",
   "Exam wording tends to be recognizable. 'Single bill for multiple accounts' or 'one payment method' points to consolidated billing. 'Combine usage to reach volume discounts' points to consolidated billing's aggregated tiers. 'Unused Reserved Instances in one account, matching usage in another' points to RI and Savings Plans discount sharing. 'One business unit must not share discounts' points to turning off sharing for that account in the management account's billing preferences."
  ],
  "terms": [
   [
    "Consolidated billing",
    "An AWS Organizations feature that combines all member accounts' charges into one bill paid by the management account."
   ],
   [
    "Management account",
    "The account that creates the organization and pays for all member accounts; also called the payer account."
   ],
   [
    "Member account",
    "An AWS account in an organization whose charges roll up to the management account's bill."
   ],
   [
    "Volume pricing tier",
    "A lower per-unit price that applies once combined usage passes a threshold."
   ],
   [
    "Discount sharing",
    "Applying Reserved Instance and Savings Plans benefits across accounts in an organization."
   ],
   [
    "Linked account",
    "The billing term for a member account, used to filter and group costs in Cost Explorer and the CUR."
   ]
  ],
  "example": "A company with 12 accounts buys a Compute Savings Plan centrally in its management account. On weekdays it is used mostly by production workloads; on weekends, when production is quieter, the same commitment automatically discounts batch jobs in the analytics account. Combined S3 storage across accounts also lands in lower pricing tiers, and a subsidiary that must be billed separately has sharing turned off.",
  "tip": "Reserved Instance and Savings Plans discounts are shared across accounts in an organization by default. If one account must not share or receive them, turn off sharing for that account in the management account's billing preferences.",
  "check": [
   [
    "An RI was bought in account A but account A no longer uses that instance type. Account B does. Does the RI still help?",
    "Yes, with consolidated billing and sharing enabled, the unused RI benefit applies to matching usage in account B."
   ],
   [
    "How does consolidated billing lower S3 storage prices?",
    "Usage across all accounts is combined for volume pricing tiers, so the organization reaches lower per-GB tiers sooner."
   ],
   [
    "Where do you turn off RI and Savings Plans discount sharing for one account?",
    "In the billing preferences of the management account, which controls sharing for member accounts."
   ],
   [
    "Why should the management account run no workloads?",
    "It pays for every member account and controls organization-wide settings, so it should be tightly protected and used only for administration."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
