/* Lessons for AWS Certified Solutions Architect - Associate (SAA-C03): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-saa", [
 {
  t: "IAM users, groups, roles and policies: least privilege, identity-based vs resource-based policies and policy evaluation logic",
  body: [
   "AWS Identity and Access Management (IAM) decides who can do what in an AWS account. An IAM user is a long-term identity for one person or application, with a password for the console and optional access keys for the API. An IAM group is a collection of users that share permissions; groups cannot sign in and cannot be nested. An IAM role is an identity with no long-term credentials: a trusted principal (a user, an AWS service such as EC2 or Lambda, another account, or a federated user) assumes it and receives temporary credentials. For workloads, roles are almost always the right answer, because there are no keys to leak or rotate.",
   "Permissions come from policies, which are JSON documents made of statements. Each statement has an `Effect` (Allow or Deny), `Action` (for example `s3:GetObject`), `Resource` (an ARN, the Amazon Resource Name) and optional `Condition` blocks such as `aws:SourceIp` or `aws:MultiFactorAuthPresent`. Least privilege means granting only the actions and resources a job needs, then widening only when there is a proven need. AWS managed policies are convenient starting points; customer managed policies let you tighten scope; inline policies are embedded in one identity and deleted with it.",
   "Identity-based policies attach to users, groups and roles and say what that identity can do. Resource-based policies attach to a resource, such as an S3 bucket policy, an SQS queue policy or a KMS key policy, and include a `Principal` element naming who may access it. Resource-based policies are how you grant access to another account without that account assuming a role. A role's trust policy is itself a resource-based policy that says who may assume the role.",
   "Policy evaluation follows a fixed logic. Every request starts as an implicit deny. AWS then collects every applicable policy: service control policies (SCPs) from AWS Organizations, resource-based policies, permissions boundaries, session policies and identity-based policies. If any of them contains an explicit Deny that matches, the request is denied, full stop. Otherwise the request needs an Allow, and every guardrail layer that applies (SCPs, a permissions boundary, a session policy) must also allow it. Within one account, an Allow in either the identity policy or the resource policy is enough; across accounts, both sides must allow.",
   "A permissions boundary is a managed policy set on a user or role that caps the maximum permissions its identity policies can grant. It grants nothing by itself. Boundaries are the usual answer when you want developers to create roles for their applications without being able to create a role more powerful than they are. In labs, the IAM policy simulator and IAM Access Analyzer help you test and refine policies without guesswork."
  ],
  terms: [
   ["IAM role", "An identity with permissions but no long-term credentials, assumed by a trusted principal to receive temporary credentials."],
   ["Resource-based policy", "A policy attached to a resource, such as an S3 bucket policy, that names the principals allowed to access it."],
   ["Explicit deny", "A Deny statement that matches a request; it overrides any Allow in any policy."],
   ["Permissions boundary", "A managed policy that sets the maximum permissions an IAM user or role can have, without granting any itself."]
  ],
  example: "An application on EC2 needs to read one S3 bucket. Instead of storing an access key on the server, the architect creates a role with a policy allowing `s3:GetObject` on only that bucket's ARN, attaches it through an instance profile, and the SDK picks up temporary credentials automatically.",
  tip: "When a question asks why access is denied despite an Allow, look for an explicit Deny, an SCP or a permissions boundary. When it asks how to give an EC2 instance or Lambda function access, the answer is a role, never access keys stored on the instance.",
  check: [
   ["A user's identity policy allows s3:DeleteObject, but the bucket policy explicitly denies it to that user. What happens?", "The request is denied. An explicit Deny in any applicable policy overrides every Allow."],
   ["What does a permissions boundary do on its own?", "Nothing is granted by it. It only limits the maximum permissions that the identity-based policies of that user or role can take effect."],
   ["How can an IAM group be used inside another group?", "It cannot. IAM groups cannot be nested and cannot be named as a principal in a policy."]
  ]
 },
 {
  t: "Multi-account security: AWS Organizations, service control policies, IAM Identity Center and cross-account roles",
  body: [
   "Large AWS customers rarely run everything in one account. Separate accounts give hard boundaries for security, billing and quotas: a mistake or breach in a development account cannot touch production. AWS Organizations is the service that groups accounts together. One management account creates or invites member accounts, arranges them into organizational units (OUs) such as Security, Production and Sandbox, and pays one consolidated bill.",
   "Service control policies (SCPs) are Organizations policies attached to the root, an OU or an account. They define the maximum permissions available to IAM users and roles in the affected member accounts, including the account's root user. SCPs never grant permissions; an identity still needs an IAM policy that allows the action. They are guardrails: for example, deny leaving the organization, deny disabling CloudTrail, or deny any action outside approved Regions using the `aws:RequestedRegion` condition. SCPs do not affect the management account, which is one reason AWS recommends running no workloads there. They also do not restrict service-linked roles.",
   "AWS IAM Identity Center (the successor to AWS Single Sign-On) is the recommended way for people to sign in across many accounts. You connect an identity source, such as the built-in directory, Active Directory or an external identity provider like Okta or Microsoft Entra ID, and define permission sets. A permission set is a template of policies; when you assign a user or group a permission set on an account, Identity Center creates a matching role in that account. Users sign in once to the access portal and pick the account and role, receiving temporary credentials.",
   "For workloads and automation, cross-account access uses IAM roles. In the target account you create a role whose trust policy names the source account or a specific role there as the principal. In the source account, an identity needs permission for `sts:AssumeRole` on that role's ARN. Both sides must agree. When a third party such as a monitoring vendor assumes a role in your account, you add an external ID condition to the trust policy to prevent the confused deputy problem, where the vendor is tricked into using its access on behalf of someone else.",
   "Other multi-account tools you may see: AWS Control Tower sets up a landing zone with recommended OUs, logging and guardrails; AWS Resource Access Manager (RAM) shares resources such as subnets or Transit Gateways across accounts; and delegated administrator lets a member account run a service such as GuardDuty or Security Hub for the whole organization."
  ],
  terms: [
   ["Organizational unit (OU)", "A container of accounts inside AWS Organizations to which policies such as SCPs can be attached."],
   ["Service control policy (SCP)", "An Organizations policy that sets the maximum permissions for identities in member accounts; it never grants access."],
   ["Permission set", "An IAM Identity Center template of policies that becomes a role in each account it is assigned to."],
   ["External ID", "A secret value required in a cross-account role's trust policy to protect against the confused deputy problem."]
  ],
  example: "A company wants to guarantee that no one in its workload accounts can create resources outside two approved Regions. It attaches an SCP to the Workloads OU that denies all actions when `aws:RequestedRegion` is not one of the two, with exceptions for global services. Even an administrator in a member account cannot bypass it.",
  tip: "SCPs filter, they do not grant, and they do not apply to the management account. If the question wants centralized sign-in for people across many accounts, choose IAM Identity Center; if it wants an application in account A to act in account B, choose a cross-account role.",
  check: [
   ["An SCP allows only EC2 and S3 actions. A user in a member account has AdministratorAccess. Can the user create a DynamoDB table?", "No. The SCP sets the maximum available permissions, so actions outside EC2 and S3 are blocked regardless of the IAM policy."],
   ["What two things are required for a role in account A to assume a role in account B?", "The role in account B must trust account A (or that role) in its trust policy, and the identity in account A must be allowed sts:AssumeRole on the role's ARN."]
  ]
 },
 {
  t: "Federation and temporary credentials: STS AssumeRole, SAML and OIDC federation, Cognito user pools vs identity pools",
  body: [
   "Federation lets people and applications use an identity they already have, instead of an IAM user, to get AWS access. The engine underneath is AWS Security Token Service (STS), which issues temporary credentials: an access key ID, a secret access key and a session token, valid for a limited time. Because they expire on their own, temporary credentials are far safer than long-term access keys.",
   "The core STS calls are worth knowing by name. `AssumeRole` is used by an IAM identity or AWS service to take on a role, including across accounts. `AssumeRoleWithSAML` exchanges a SAML 2.0 assertion from a corporate identity provider, such as Active Directory Federation Services, for role credentials. `AssumeRoleWithWebIdentity` exchanges a token from an OpenID Connect (OIDC) provider; it is also what lets Kubernetes pods on Amazon EKS and CI/CD systems such as GitHub Actions get AWS roles without stored keys. `GetSessionToken` is used to get temporary credentials for an IAM user, often after an MFA check.",
   "SAML federation is the traditional workforce pattern: employees sign in to the company identity provider, which posts a signed assertion listing the roles they may use, and the user lands in the AWS console with a role's permissions. Today IAM Identity Center wraps this for multi-account setups. OIDC federation is the modern pattern for web identities and workloads: you register the provider in IAM, and the role's trust policy restricts which audiences and subjects in the token may assume it.",
   "Amazon Cognito serves customer-facing web and mobile apps and has two parts that the exam loves to contrast. A Cognito user pool is a user directory and sign-in service: sign-up, sign-in, MFA, password reset and social or SAML sign-in, returning JSON Web Tokens (JWTs). Those tokens can authorize calls to API Gateway or an Application Load Balancer. A Cognito identity pool (federated identities) exchanges a token, from a user pool or from a provider like Google, for temporary AWS credentials tied to an IAM role, so the app can call AWS services such as S3 or DynamoDB directly. Identity pools can also give limited guest access to unauthenticated users.",
   "In short: user pools answer who is this user, and identity pools answer what AWS credentials this user gets. Many apps use both together. Fine-grained access, such as letting each user read only their own folder in S3, is done with policy variables like the Cognito identity ID in the identity pool role's policy."
  ],
  terms: [
   ["AWS STS", "The Security Token Service, which issues temporary, expiring credentials for roles and federated users."],
   ["SAML 2.0", "An XML-based standard for exchanging authentication assertions, commonly used for workforce federation."],
   ["Cognito user pool", "A managed user directory that handles sign-up and sign-in and returns JWTs."],
   ["Cognito identity pool", "A service that exchanges identity tokens for temporary AWS credentials mapped to IAM roles."]
  ],
  example: "A mobile photo app lets customers sign in with email or Google through a Cognito user pool. The app then trades the user pool token at an identity pool for temporary credentials whose role only allows uploads to `photos/${cognito-identity.amazonaws.com:sub}/` in S3, so each user can write only to their own prefix.",
  tip: "If a mobile or web app needs its users to call AWS services directly, the answer involves a Cognito identity pool. If the question is only about sign-up and sign-in for app users, it is a user pool. Corporate users and SAML point to IAM Identity Center or AssumeRoleWithSAML.",
  check: [
   ["Which STS operation does a CI/CD pipeline using an OIDC token call to get AWS credentials?", "AssumeRoleWithWebIdentity, which exchanges the OIDC token for a role's temporary credentials."],
   ["An API Gateway API must accept only signed-in app users. Which Cognito component provides the authorizer?", "A Cognito user pool, whose JWTs API Gateway can validate with a Cognito user pool authorizer."]
  ]
 },
 {
  t: "VPC security layers: security groups vs network ACLs, public and private subnets, NAT gateways, bastion hosts vs Session Manager",
  body: [
   "A virtual private cloud (VPC) is your private network in an AWS Region, defined by an IPv4 CIDR block such as `10.0.0.0/16`. You divide it into subnets, each in one Availability Zone (AZ). What makes a subnet public is its route table: a public subnet has a route `0.0.0.0/0` pointing to an internet gateway, and instances there need a public or Elastic IP address to be reachable. A private subnet has no route to the internet gateway, so nothing on the internet can start a connection to it.",
   "Instances in private subnets often still need outbound internet access for patches. A NAT gateway provides that: you place it in a public subnet with an Elastic IP, and the private subnet's route table sends `0.0.0.0/0` to it. It allows outbound connections and their replies but blocks inbound connections from the internet. A NAT gateway lives in one AZ, so for high availability you deploy one per AZ and route each private subnet to the gateway in its own AZ. NAT instances are the older self-managed alternative.",
   "Two firewall layers protect resources. Security groups attach to elastic network interfaces (and so to instances, load balancers and RDS databases). They are stateful, meaning return traffic is automatically allowed, they support only allow rules, and all rules are evaluated together. A rule's source can be another security group, which is the clean way to say only the web tier may reach the database tier. Network ACLs (NACLs) attach to subnets, are stateless, so you must allow return traffic on ephemeral ports explicitly, support both allow and deny rules, and are evaluated in rule-number order with the first match winning. Use a NACL deny when you need to block a specific IP range, because security groups cannot deny.",
   "Administrators need a way to reach private instances. The classic answer is a bastion host: a hardened instance in a public subnet that allows SSH from known IP ranges, from which you hop to private instances. It works but needs patching, key management and an open inbound port. AWS Systems Manager Session Manager is the modern answer: the SSM Agent on the instance makes an outbound connection to Systems Manager, and you open a shell from the console or CLI with IAM controlling who may connect. No inbound ports, no SSH keys, and sessions can be logged to CloudWatch Logs or S3. The instance needs an instance profile with the Systems Manager core permissions and a path to the Systems Manager endpoints, through NAT or interface endpoints."
  ],
  terms: [
   ["Security group", "A stateful, allow-only virtual firewall attached to network interfaces."],
   ["Network ACL", "A stateless subnet-level firewall with numbered allow and deny rules evaluated in order."],
   ["NAT gateway", "A managed service in a public subnet that lets private instances start outbound internet connections."],
   ["Session Manager", "A Systems Manager feature that gives shell access to instances over an outbound agent connection, controlled by IAM."]
  ],
  example: "A three-tier app puts its ALB in public subnets, its EC2 web servers and RDS database in private subnets, and a NAT gateway in each AZ. The database security group allows port 3306 only from the web tier's security group, and operators use Session Manager instead of a bastion host, so no instance has port 22 open.",
  tip: "Stateful and allow-only means security group; stateless with deny rules and ordering means network ACL. When a question asks for shell access with no open inbound ports and no key management, choose Session Manager over a bastion host.",
  check: [
   ["Outbound HTTPS from a private instance works through a NAT gateway, but replies are dropped. The security group is fine. What should you check?", "The subnet's network ACL. NACLs are stateless, so they need an inbound rule allowing return traffic on ephemeral ports (1024-65535)."],
   ["How do you make a NAT design survive the loss of one Availability Zone?", "Deploy a NAT gateway in each AZ and route each private subnet to the NAT gateway in its own AZ."]
  ]
 },
 {
  t: "Private access to AWS services: gateway endpoints, interface endpoints (PrivateLink) and endpoint policies",
  body: [
   "Most AWS services, such as S3, DynamoDB, SQS and Secrets Manager, are reached through public service endpoints. A private instance can reach them through a NAT gateway, but then the traffic leaves your VPC's private address space and you pay NAT data processing charges. VPC endpoints let resources in your VPC reach AWS services privately, without an internet gateway, NAT device or public IP addresses.",
   "Gateway endpoints exist for exactly two services: Amazon S3 and Amazon DynamoDB. You create the endpoint and select route tables; AWS adds a route whose destination is the service's prefix list (a managed list of the service's IP ranges) and whose target is the endpoint. Gateway endpoints have no hourly or data charge. They only work for traffic from inside the VPC; they cannot be reached from on-premises over VPN or Direct Connect, or from a peered VPC.",
   "Interface endpoints are powered by AWS PrivateLink. Each one places an elastic network interface with a private IP address in the subnets you choose, one per AZ for resilience, protected by a security group. With private DNS enabled, the service's normal hostname resolves to those private IPs, so applications need no code changes. Interface endpoints exist for most AWS services, including S3, and also for your own or partner services published as endpoint services behind a Network Load Balancer. They are billed per hour per AZ plus per GB processed. Because they are real IP addresses, they can be reached from on-premises networks over VPN or Direct Connect.",
   "Endpoint policies are resource-based policies on the endpoint itself that limit what can be done through it. For example, an S3 gateway endpoint policy can allow access only to the company's own buckets, which helps stop data being copied to a personal bucket. The other side of the control is on the resource: a bucket policy can use the `aws:SourceVpce` condition to deny any request that did not come through a specific endpoint, or `aws:SourceVpc` for a specific VPC. Together they form a data perimeter.",
   "PrivateLink also solves a networking problem: exposing one service to many consumer VPCs, even in other accounts, without peering whole networks and without worrying about overlapping CIDR ranges, because consumers only see an interface endpoint in their own VPC."
  ],
  terms: [
   ["Gateway endpoint", "A route-table target that gives private, free access to S3 or DynamoDB from within a VPC."],
   ["Interface endpoint", "A PrivateLink network interface with private IPs in your subnets that fronts an AWS or partner service."],
   ["Endpoint policy", "A resource policy on a VPC endpoint that restricts which actions and resources can be reached through it."],
   ["aws:SourceVpce", "A condition key that matches the ID of the VPC endpoint a request came through."]
  ],
  example: "An analytics fleet in private subnets reads terabytes a day from S3 through a NAT gateway, and the NAT processing charges are high. The architect adds an S3 gateway endpoint to the private route tables. Traffic now stays on the AWS network, the NAT charges for that traffic disappear, and a bucket policy denies requests not coming through the endpoint.",
  tip: "S3 or DynamoDB, from inside the VPC, lowest cost: gateway endpoint. Any other service, or access from on-premises, or sharing a service with other VPCs: interface endpoint (PrivateLink).",
  check: [
   ["On-premises servers connected by Direct Connect need private access to S3. Can they use a gateway endpoint?", "No. Gateway endpoints only serve traffic originating in the VPC. Use an S3 interface endpoint, which has private IPs reachable over Direct Connect."],
   ["How do you ensure a bucket is reachable only through a specific VPC endpoint?", "Add a bucket policy that denies requests when aws:SourceVpce does not equal that endpoint's ID."]
  ]
 },
 {
  t: "Protecting the edge: AWS WAF, Shield Standard vs Shield Advanced, and CloudFront with origin access control",
  body: [
   "The edge is where your application meets the internet, and it is the best place to stop bad traffic before it reaches your servers. AWS offers three services that work together there: AWS WAF for application-layer filtering, AWS Shield for distributed denial of service (DDoS) protection, and Amazon CloudFront as the content delivery network that absorbs and filters traffic at hundreds of edge locations.",
   "AWS WAF is a web application firewall. You create a web access control list (web ACL) and attach it to a CloudFront distribution, an Application Load Balancer, an API Gateway REST API, an AppSync GraphQL API or a Cognito user pool. It inspects HTTP(S) requests at layer 7 and applies rules: managed rule groups for common threats such as SQL injection and cross-site scripting, IP set rules to block or allow address ranges, geographic match rules, and rate-based rules that block an IP address sending too many requests in a time window. WAF cannot be attached to a Network Load Balancer or directly to an EC2 instance.",
   "AWS Shield Standard is automatic and free for every AWS customer. It protects against common network and transport layer (layer 3 and 4) attacks such as SYN floods and UDP reflection. Shield Advanced is a paid subscription for higher protection on specific resources: CloudFront, Route 53 hosted zones, Global Accelerator, Elastic Load Balancers and Elastic IP addresses. It adds detection and mitigation tuned to your traffic, near real-time attack visibility, access to the AWS Shield Response Team (SRT) during attacks, AWS WAF at no extra cost for protected resources, and cost protection that credits scaling charges caused by a DDoS attack.",
   "CloudFront itself is a strong defense because attacks are spread across the global edge network. To make sure users cannot skip CloudFront and hit an S3 origin directly, use origin access control (OAC). You enable OAC on the distribution, keep the bucket private with Block Public Access on, and add a bucket policy that allows `s3:GetObject` only when the principal is the CloudFront service and `aws:SourceArn` is your distribution. OAC replaces the older origin access identity (OAI) and supports SSE-KMS encrypted objects. For custom origins such as an ALB, a common pattern is having CloudFront add a secret custom header and having the ALB reject requests without it, or allowing only the CloudFront managed prefix list in the ALB security group."
  ],
  terms: [
   ["Web ACL", "The AWS WAF resource that holds rules and is associated with CloudFront, ALB, API Gateway and other supported resources."],
   ["Rate-based rule", "A WAF rule that blocks source IPs exceeding a request count within a time window."],
   ["Shield Advanced", "A paid DDoS protection tier with SRT support, advanced detection and DDoS cost protection."],
   ["Origin access control (OAC)", "A CloudFront feature that signs requests to an S3 origin so the bucket can stay private and accept only that distribution."]
  ],
  example: "A retail site sees bots hammering its login page. The team attaches a WAF web ACL to its CloudFront distribution with the AWS managed common rule set and a rate-based rule on the `/login` path. Because a major sale is coming, they also subscribe to Shield Advanced so the Shield Response Team can help during an attack and scaling costs from one are credited.",
  tip: "SQL injection, cross-site scripting, rate limiting or geo blocking points to AWS WAF. Large DDoS with expert support and cost protection points to Shield Advanced. Keeping an S3 origin private behind CloudFront points to origin access control.",
  check: [
   ["Can you attach AWS WAF to a Network Load Balancer?", "No. WAF works at layer 7 and attaches to CloudFront, ALB, API Gateway REST APIs, AppSync and Cognito user pools, not NLBs."],
   ["Which Shield tier is enabled by default at no cost?", "Shield Standard, which protects all customers against common layer 3 and 4 DDoS attacks."]
  ]
 },
 {
  t: "Encryption at rest with AWS KMS: AWS managed vs customer managed keys, key policies, envelope encryption and S3 SSE-S3, SSE-KMS and SSE-C",
  body: [
   "AWS Key Management Service (KMS) creates and controls the keys used to encrypt data at rest across AWS services. KMS keys never leave the service unencrypted; KMS performs cryptographic operations inside hardware security modules, and every use of a key is recorded in CloudTrail. The exam expects you to know which kind of key to choose and how access to keys is controlled.",
   "There are three ownership models. AWS owned keys are used internally by services and you never see them. AWS managed keys, with aliases like `aws/s3` or `aws/ebs`, are created in your account by a service the first time you use it; you can view them and audit their use, but you cannot change their key policy, and AWS rotates them automatically. Customer managed keys are created by you: you control the key policy, grants, automatic rotation, and you can disable or schedule deletion of the key. Choose customer managed keys when you need your own access control, cross-account use or the ability to cut off access by disabling the key.",
   "Every KMS key has a key policy, a resource-based policy, and it is the primary access control. Unlike most resources, IAM policies alone cannot grant access to a KMS key unless the key policy allows it; the default key policy does this by giving the account root principal access, which delegates to IAM. For cross-account use, the key policy must allow the other account, and that account's IAM policy must also allow the use. Grants provide temporary, programmatic permissions, often used by services such as EBS.",
   "KMS can encrypt only small payloads directly (up to 4 KB), so services use envelope encryption. The service calls `GenerateDataKey`, receiving a plaintext data key and the same key encrypted under the KMS key. It encrypts the data locally with the plaintext data key, discards that key from memory, and stores the encrypted data key alongside the data. To decrypt, it sends the encrypted data key to KMS, gets the plaintext back and decrypts locally. This keeps bulk data off the network to KMS and makes it fast.",
   "Amazon S3 offers three server-side encryption choices. SSE-S3 uses keys managed entirely by S3 and is the default for new objects. SSE-KMS uses a KMS key, adding key policy control, CloudTrail records of key use, and the ability to disable the key; at high request rates, S3 Bucket Keys reduce the number of KMS calls and their cost. SSE-C uses a key the customer supplies with every request over HTTPS; S3 uses it and discards it, so you must manage and never lose it. Client-side encryption, where data is encrypted before upload, is the fourth option when AWS must never see plaintext."
  ],
  terms: [
   ["Customer managed key", "A KMS key you create and control, including its key policy, rotation, disabling and deletion."],
   ["Key policy", "The resource-based policy on a KMS key that is the primary control over who can use and manage it."],
   ["Envelope encryption", "Encrypting data with a data key, then encrypting that data key with a KMS key."],
   ["SSE-KMS", "S3 server-side encryption using a KMS key, with auditable key use and key-policy control."]
  ],
  example: "A healthcare company must prove who used the keys protecting patient files and must be able to revoke access instantly. It creates a customer managed KMS key, grants use only to the application role in the key policy, sets the bucket's default encryption to SSE-KMS with an S3 Bucket Key, and reviews KMS events in CloudTrail.",
  tip: "Audit of key usage, control of the key policy or the ability to disable the key: SSE-KMS with a customer managed key. The customer must supply and hold the key themselves: SSE-C. Simplest with no key management: SSE-S3.",
  check: [
   ["Why can't you share an EBS snapshot encrypted with the aws/ebs AWS managed key with another account?", "Because you cannot edit an AWS managed key's policy to grant another account access. Re-encrypt with a customer managed key and share that key."],
   ["What does GenerateDataKey return?", "A plaintext data key for local encryption and a copy of that data key encrypted under the KMS key, to be stored with the data."]
  ]
 },
 {
  t: "Encryption in transit: ACM certificates, TLS on ALB and CloudFront, and enforcing HTTPS with aws:SecureTransport",
  body: [
   "Encryption in transit protects data as it moves between clients and services, and between services themselves. On AWS that almost always means Transport Layer Security (TLS), the protocol behind HTTPS. To offer TLS you need an X.509 certificate for your domain, and AWS Certificate Manager (ACM) is the service that provides and manages them.",
   "ACM issues public certificates at no extra charge for use with integrated services, validates domain ownership by DNS or email, and renews them automatically when DNS validation stays in place. ACM certificates can be deployed to Elastic Load Balancing, Amazon CloudFront, API Gateway and some other integrated services, but a standard public ACM certificate cannot be exported, so you cannot install it on your own web server running on EC2. You can also import third-party certificates into ACM, but ACM does not renew imported ones. ACM certificates are regional resources, with one important exception: a certificate used by CloudFront must be requested or imported in the US East (N. Virginia) Region, `us-east-1`.",
   "The common pattern is TLS termination at the load balancer. An Application Load Balancer HTTPS listener uses an ACM certificate, decrypts traffic, applies routing rules and forwards to targets over HTTP or, when end-to-end encryption is required, re-encrypts over HTTPS to the targets. A security policy on the listener sets the allowed TLS versions and ciphers. Server Name Indication (SNI) lets one listener hold several certificates for different domains. An HTTP listener on port 80 can have a redirect action to HTTPS on 443. A Network Load Balancer can terminate TLS with a TLS listener, or pass TCP traffic through so the targets terminate it.",
   "CloudFront has two TLS legs. The viewer protocol policy controls the connection from users: allow all, redirect HTTP to HTTPS, or HTTPS only. The origin protocol policy controls CloudFront's connection to the origin. For full end-to-end encryption you require HTTPS on both.",
   "To enforce encryption on S3 and other services with resource policies, use the `aws:SecureTransport` condition key, which is true when a request arrived over TLS. A bucket policy statement with `Effect: Deny`, `Principal: *`, `Action: s3:*` and `Condition: {\"Bool\": {\"aws:SecureTransport\": \"false\"}}` rejects any plain HTTP request. The same idea works in SQS and SNS policies. For databases, RDS supports TLS connections and a parameter can require them, such as `rds.force_ssl` for PostgreSQL."
  ],
  terms: [
   ["AWS Certificate Manager (ACM)", "A service that issues, stores and automatically renews TLS certificates for integrated AWS services."],
   ["TLS termination", "Decrypting TLS at a front-end component such as a load balancer before passing the request on."],
   ["Viewer protocol policy", "The CloudFront setting that controls whether viewers may use HTTP, are redirected to HTTPS or must use HTTPS."],
   ["aws:SecureTransport", "A condition key that is true when the request was sent over TLS."]
  ],
  example: "A company serves its site through CloudFront with an ALB origin. It requests an ACM certificate for `www.example.com` in us-east-1 for CloudFront and another in the ALB's Region, sets the viewer protocol policy to redirect HTTP to HTTPS, and sets the origin protocol policy to HTTPS only, so traffic is encrypted all the way to the load balancer.",
  tip: "A CloudFront certificate must be in us-east-1. Enforcing HTTPS on an S3 bucket is a bucket policy that denies requests where aws:SecureTransport is false, not a setting on the bucket.",
  check: [
   ["You created an ACM certificate in eu-west-1 but cannot select it in CloudFront. Why?", "CloudFront only uses ACM certificates from us-east-1. Request or import the certificate there."],
   ["How do you make an S3 bucket reject HTTP requests?", "Add a bucket policy that denies all S3 actions when aws:SecureTransport is false."]
  ]
 },
 {
  t: "Secrets management: Secrets Manager rotation vs Systems Manager Parameter Store SecureString",
  body: [
   "Applications need database passwords, API keys and tokens. Hard-coding them in source code, AMIs or environment files is a classic security failure: secrets end up in version control, logs and backups, and changing them means redeploying. AWS gives you two managed places to store them, and the exam asks you to pick between them.",
   "AWS Secrets Manager is built for secrets. It encrypts each secret with a KMS key, controls access with IAM and resource policies, logs access in CloudTrail and, most importantly, rotates secrets automatically on a schedule. For Amazon RDS, Aurora, Redshift and DocumentDB it offers managed rotation: it changes the password in the database and in the secret together, so applications that fetch the secret at runtime keep working. For other secret types, rotation runs a Lambda function you provide or adapt from AWS templates. Secrets Manager can also replicate secrets to other Regions for disaster recovery, and RDS can manage the master user password in Secrets Manager for you. It charges per secret per month and per API call.",
   "AWS Systems Manager Parameter Store is a hierarchical store for configuration data, such as `/prod/app/db-host`. Parameters come in three types: String, StringList and SecureString. A SecureString is encrypted with a KMS key, either the AWS managed `aws/ssm` key or a customer managed key. Standard parameters have no additional storage charge, which makes Parameter Store attractive for configuration and simple secrets. However, Parameter Store has no built-in rotation; you would have to build it yourself with EventBridge and Lambda.",
   "How do you choose? If the requirement mentions automatic rotation, especially of database credentials, choose Secrets Manager. If it is general configuration, feature flags or secrets that rarely change, and cost matters, Parameter Store SecureString is fine. Both integrate with CloudFormation dynamic references, ECS task definitions and Lambda, so applications can load values at start-up. Parameter Store can even reference Secrets Manager secrets through a special parameter path, so one API can read both.",
   "Whichever you choose, the application's role needs permission to read the secret and to use the KMS key that encrypts it. Retrieve secrets at runtime and cache them briefly rather than baking them into images."
  ],
  terms: [
   ["Secrets Manager", "A managed service that stores, encrypts, audits and automatically rotates secrets."],
   ["Parameter Store", "A Systems Manager feature for hierarchical configuration data and secrets, without built-in rotation."],
   ["SecureString", "A Parameter Store parameter type whose value is encrypted with a KMS key."],
   ["Rotation", "Periodically replacing a secret with a new value and updating every place that uses it."]
  ],
  example: "A security audit requires that the production database password change every 30 days with no downtime. The team moves the credentials from an environment file into Secrets Manager, enables managed rotation for the RDS database, and changes the application to fetch the secret at start-up and refresh it when a login fails.",
  tip: "The keyword is rotation. Automatic rotation of database credentials points to Secrets Manager; low-cost storage of configuration and static secrets points to Parameter Store SecureString.",
  check: [
   ["Which service rotates RDS credentials automatically without custom code?", "AWS Secrets Manager, using managed rotation for RDS."],
   ["What encrypts a SecureString parameter?", "An AWS KMS key, either the AWS managed aws/ssm key or a customer managed key."]
  ]
 },
 {
  t: "S3 data protection: Block Public Access, bucket policies, presigned URLs, versioning, MFA Delete and Object Lock modes",
  body: [
   "Amazon S3 holds a large share of the world's cloud data, and misconfigured buckets are a famous cause of breaches. S3 gives you layers of protection against two different threats: exposure (the wrong people reading data) and loss (data being deleted or overwritten, by mistake or by ransomware).",
   "For exposure, start with S3 Block Public Access. Its four settings block new public ACLs, ignore existing public ACLs, block new public bucket policies and restrict access to buckets with public policies. It can be set at the account level and per bucket, and it overrides any policy or ACL that would make data public. New buckets have it on by default, and ACLs are disabled by default through the Object Ownership setting 'bucket owner enforced', so access is governed by policies alone.",
   "Bucket policies are resource-based JSON policies that grant or deny access to principals, including other accounts, with conditions such as `aws:SourceIp`, `aws:SourceVpce`, `aws:PrincipalOrgID` or `aws:SecureTransport`. When a user outside your account needs temporary access to one object, use a presigned URL: a URL signed with the credentials of an identity that has access, valid until its expiry time. Anyone holding the URL can perform that one operation, such as GET to download or PUT to upload, without AWS credentials of their own. The URL cannot grant more than the signer's own permissions.",
   "For loss, turn on versioning. With versioning, an overwrite creates a new version and a delete adds a delete marker, so earlier versions can be restored. Once enabled, versioning can be suspended but not turned off. MFA Delete adds a requirement for multi-factor authentication to permanently delete a version or to change the versioning state; only the root user can enable it, using the CLI or API.",
   "S3 Object Lock provides write-once-read-many (WORM) protection on versioned buckets. Governance mode protects versions from deletion during the retention period, but users with the `s3:BypassGovernanceRetention` permission can override it. Compliance mode cannot be shortened or removed by anyone, including the root user, until the retention period ends. A legal hold protects a version indefinitely, independent of retention, until someone with permission removes it. Compliance mode is the answer for regulations that require immutable records; governance mode is for protection with an escape hatch for administrators."
  ],
  terms: [
   ["Block Public Access", "Account and bucket settings that override any ACL or policy that would make S3 data public."],
   ["Presigned URL", "A time-limited URL signed with an authorized identity's credentials that grants one S3 operation on one object."],
   ["Object Lock compliance mode", "A WORM retention mode that nobody, including root, can shorten or remove before it expires."],
   ["Legal hold", "An Object Lock flag that prevents a version from being deleted until the hold is removed, with no expiry date."]
  ],
  example: "A law firm must keep signed contracts unchanged for seven years to meet a regulation. It creates a bucket with versioning and Object Lock, sets a default retention of seven years in compliance mode, and gives clients presigned URLs that expire after 15 minutes to download their own documents.",
  tip: "Governance mode can be bypassed by users with special permission; compliance mode cannot be bypassed by anyone. To give temporary access to one object without creating IAM users, choose a presigned URL.",
  check: [
   ["A user deleted an object in a versioned bucket. How do you recover it?", "Delete the delete marker (or copy the previous version back). Versioning kept the earlier version; the delete only added a marker."],
   ["Which Object Lock mode lets a privileged administrator remove retention early?", "Governance mode, for users with the s3:BypassGovernanceRetention permission. Compliance mode allows no one to do so."]
  ]
 },
 {
  t: "Detection and compliance services: CloudTrail, AWS Config rules, GuardDuty, Inspector, Macie and Security Hub",
  body: [
   "AWS has several detective services with similar-sounding names, and exam questions often describe a need and ask which service meets it. The trick is to remember the one question each service answers.",
   "AWS CloudTrail answers who did what, when and from where. It records API calls made in your account, whether from the console, CLI, SDKs or AWS services. Event history keeps 90 days of management events for free; a trail delivers events to an S3 bucket for long-term retention and can send them to CloudWatch Logs for alarms. An organization trail covers every account in AWS Organizations. Data events, such as S3 object reads or Lambda invocations, are not logged by default and must be enabled. Log file validation lets you prove the files were not altered.",
   "AWS Config answers what did this resource look like, and does it follow our rules. It records configuration changes to resources over time, so you can see the history of a security group, for example. Config rules evaluate resources against desired settings, such as S3 buckets must block public access or EBS volumes must be encrypted, using AWS managed rules or custom Lambda rules. Non-compliant resources can be fixed automatically with remediation actions based on Systems Manager Automation documents. Conformance packs bundle rules for frameworks.",
   "Amazon GuardDuty answers is something malicious happening. It is a managed threat detection service that analyzes CloudTrail events, VPC Flow Logs and DNS logs, plus optional sources such as S3 data events, EKS audit logs and runtime monitoring, using threat intelligence and machine learning. You enable it with a click; no agents or log configuration are required for the foundational sources. Findings include cryptocurrency mining, communication with known malicious IPs and unusual API calls. Amazon Inspector answers which of my workloads have software vulnerabilities or unintended network exposure, scanning EC2 instances, container images in Amazon ECR and Lambda functions continuously for known vulnerabilities (CVEs). Amazon Macie answers where is sensitive data in S3, using machine learning and pattern matching to discover personally identifiable information and other sensitive data, and flags buckets that are public or unencrypted.",
   "AWS Security Hub ties it together. It aggregates findings from GuardDuty, Inspector, Macie, Config, IAM Access Analyzer and partner tools into one view in a standard format, and runs security standards checks such as the AWS Foundational Security Best Practices. Findings flow to Amazon EventBridge, where rules can trigger notifications or automated responses. Amazon Detective, a related service, helps investigate the root cause of findings."
  ],
  terms: [
   ["CloudTrail", "The service that records API activity in AWS accounts for auditing and investigation."],
   ["AWS Config", "The service that records resource configuration history and evaluates compliance with rules."],
   ["GuardDuty", "A managed threat detection service that analyzes logs to find malicious or unauthorized activity."],
   ["Macie", "A service that discovers and classifies sensitive data such as PII in Amazon S3."]
  ],
  example: "After an incident, a security team uses CloudTrail to find which role deleted a security group rule, uses AWS Config to see the rule set before and after the change, and enables a Config rule with automatic remediation so that any security group opening SSH to 0.0.0.0/0 is corrected. GuardDuty and Macie findings are aggregated in Security Hub for daily review.",
  tip: "API history: CloudTrail. Configuration history and compliance: Config. Threats: GuardDuty. Vulnerabilities: Inspector. Sensitive data in S3: Macie. Single pane of findings: Security Hub.",
  check: [
   ["Which service would detect an EC2 instance communicating with a known command-and-control server?", "Amazon GuardDuty, which analyzes VPC Flow Logs and DNS logs against threat intelligence."],
   ["You need to know every change made to a security group's rules over the last month and whether it meets policy. Which service?", "AWS Config, which records configuration history and evaluates compliance rules."]
  ]
 },
 {
  t: "Multi-AZ web tiers: Elastic Load Balancing (ALB vs NLB), Auto Scaling groups and ELB health checks",
  body: [
   "Each AWS Region contains several Availability Zones (AZs): groups of data centers with independent power, cooling and networking, connected by low-latency links. A resilient web tier runs in at least two AZs, so the loss of one data center, or one AZ, does not take the application down. Three services make that practical: Elastic Load Balancing spreads traffic, Amazon EC2 Auto Scaling keeps the right number of healthy instances, and health checks tie them together.",
   "An Application Load Balancer (ALB) works at layer 7, the HTTP and HTTPS level. It can route by host name, path, HTTP headers, query strings and source IP, so one ALB can send `/api/*` to one target group and `/images/*` to another. Targets can be EC2 instances, IP addresses, Lambda functions or containers. It terminates TLS, supports WebSockets and HTTP/2, can authenticate users through Cognito or an OIDC provider, and integrates with AWS WAF. A Network Load Balancer (NLB) works at layer 4 with TCP, UDP and TLS. It handles very high throughput with low latency, preserves the client source IP, and provides one static IP address per AZ, to which you can attach Elastic IPs. Choose the NLB for non-HTTP protocols, static IPs or extreme performance, and for exposing a service through PrivateLink. A Gateway Load Balancer is a third type used to insert third-party virtual appliances such as firewalls.",
   "An Auto Scaling group (ASG) launches instances from a launch template across the subnets you choose, keeping the count between a minimum and maximum around a desired capacity. It balances instances across AZs and, if an AZ fails, launches replacements in the remaining ones. Attaching the ASG to a load balancer target group registers new instances automatically.",
   "Health checks decide what happens to a bad instance. The load balancer runs its own health check, for example an HTTP GET on `/health` expecting a 200 response, and stops sending traffic to targets that fail. The ASG, by default, uses only EC2 status checks, which catch hardware and OS failures but not a crashed web server. Enabling the ELB health check type on the ASG makes it replace instances that the load balancer marks unhealthy. That setting is a frequent exam answer.",
   "Finally, keep the web tier stateless. Store session data in ElastiCache or DynamoDB instead of on the instance, and store uploaded files in S3 or EFS. Sticky sessions exist on the ALB, but they make scaling and failover less even, so they are a workaround rather than a design goal."
  ],
  terms: [
   ["Availability Zone", "One or more isolated data centers in a Region with independent power and networking."],
   ["Application Load Balancer", "A layer 7 load balancer that routes HTTP and HTTPS requests by content such as path and host."],
   ["Network Load Balancer", "A layer 4 load balancer for TCP, UDP and TLS with static IPs per AZ and very high performance."],
   ["ELB health check type", "An Auto Scaling group setting that replaces instances the load balancer reports as unhealthy."]
  ],
  example: "An online store runs an ALB in front of an Auto Scaling group spanning three AZs with a minimum of three instances. When a bad deployment makes the web server on one instance return errors, the ALB health check fails, the ASG (using ELB health checks) terminates it and launches a fresh instance, and customers never notice.",
  tip: "Path-based or host-based routing means ALB. Static IP, UDP or millions of requests per second with ultra-low latency means NLB. If an ASG is not replacing instances that the load balancer says are unhealthy, switch the ASG to the ELB health check type.",
  check: [
   ["A game server uses UDP and clients must allowlist fixed IP addresses. Which load balancer fits?", "A Network Load Balancer, which supports UDP and gives a static IP address per AZ (optionally Elastic IPs)."],
   ["Why should web servers behind an ASG not keep user sessions in local memory?", "Instances can be terminated or added at any time; keeping sessions in ElastiCache or DynamoDB lets any instance serve any user."]
  ]
 },
 {
  t: "Decoupling with Amazon SQS (standard vs FIFO, visibility timeout, dead-letter queues) and SNS fan-out",
  body: [
   "Tightly coupled systems fail together: if a web tier calls an order processor directly and the processor slows down, the web tier backs up too. Decoupling puts a buffer between components so each can scale and fail independently. Amazon Simple Queue Service (SQS) and Amazon Simple Notification Service (SNS) are the two classic building blocks.",
   "SQS is a fully managed message queue. Producers send messages; consumers poll for them, process them and delete them. Messages are stored redundantly and kept for a configurable retention period (up to 14 days). A standard queue offers nearly unlimited throughput with at-least-once delivery and best-effort ordering, so consumers must tolerate duplicates and out-of-order messages, which means designing idempotent processing. A FIFO queue, whose name must end in `.fifo`, guarantees first-in-first-out order within a message group and exactly-once processing within a deduplication interval, at lower throughput than standard queues.",
   "When a consumer receives a message, SQS hides it from other consumers for the visibility timeout. If the consumer deletes the message in time, it is gone. If the consumer crashes or takes too long, the message becomes visible again and another consumer retries it. Set the visibility timeout longer than your normal processing time; if processing sometimes runs long, the consumer can extend it with `ChangeMessageVisibility`. Long polling, with a receive wait time up to 20 seconds, reduces empty responses and cost. A delay queue postpones delivery of new messages.",
   "Some messages will never succeed, perhaps because they are malformed. A dead-letter queue (DLQ) catches them: a redrive policy on the source queue says after a message has been received a certain number of times (the maxReceiveCount), move it to the DLQ. That keeps poison messages from blocking work and lets you inspect them and redrive them later. A FIFO queue's DLQ must also be FIFO.",
   "SNS is a publish-subscribe service. Publishers send a message to a topic, and SNS pushes a copy to every subscriber: SQS queues, Lambda functions, HTTP endpoints, email or SMS. The fan-out pattern combines them: publish once to an SNS topic with several SQS queues subscribed, and each downstream system gets its own durable copy to process at its own pace. Subscription filter policies let each subscriber receive only the messages it cares about. The queue's access policy must allow the topic to send to it."
  ],
  terms: [
   ["Visibility timeout", "The period during which a received SQS message is hidden from other consumers while it is processed."],
   ["Dead-letter queue", "A queue that receives messages that failed processing more times than the maxReceiveCount."],
   ["FIFO queue", "An SQS queue type that preserves order within a message group and prevents duplicates."],
   ["Fan-out", "Publishing a message once to an SNS topic so that many subscribers, often SQS queues, each receive a copy."]
  ],
  example: "When an order is placed, the web tier publishes one message to an SNS topic. Three SQS queues subscribe: one for payment, one for shipping and one for analytics. During a flash sale the shipping service falls behind, but its messages wait safely in its queue while payment and analytics keep up, and its Auto Scaling group scales on queue depth.",
  tip: "Messages processed twice usually means the visibility timeout is shorter than processing time. Strict order and no duplicates means FIFO. One event delivered to several independent consumers means SNS fan-out to SQS.",
  check: [
   ["A consumer takes 90 seconds per message but the visibility timeout is 30 seconds. What happens?", "The message becomes visible again before it is deleted, so another consumer processes it too, producing duplicates. Raise the visibility timeout above the processing time."],
   ["How do you stop one malformed message from being retried forever?", "Configure a dead-letter queue with a redrive policy and a maxReceiveCount."]
  ]
 },
 {
  t: "Event-driven and serverless patterns: EventBridge, Lambda, Step Functions and API Gateway",
  body: [
   "Serverless services run your code and route your events without you managing servers, and they scale automatically, including to zero. You pay for use rather than idle capacity. On the exam, serverless is often the answer when a question stresses the least operational overhead or unpredictable, spiky traffic.",
   "AWS Lambda runs functions in response to events: an API request, a new object in S3, a message in SQS, a record in a DynamoDB stream or a schedule. You choose the memory size, which also sets the CPU share, and a timeout of up to 15 minutes. Each function has an execution role that grants its AWS permissions. Lambda scales by running more concurrent copies; reserved concurrency guarantees and caps capacity for one function, and provisioned concurrency keeps instances initialized to avoid cold-start latency. Anything that runs longer than 15 minutes, or needs a persistent process, belongs on containers or EC2 instead. Lambda can run in a VPC to reach private resources such as RDS.",
   "Amazon API Gateway puts an HTTPS front door on your back ends, most often Lambda. REST APIs offer the richest features, such as API keys and usage plans, request validation, caching and WAF integration. HTTP APIs are simpler and lower cost. WebSocket APIs support two-way connections. API Gateway handles authorization with IAM, Cognito user pools or Lambda authorizers, and throttling protects your back end from bursts.",
   "Amazon EventBridge is a serverless event bus. AWS services, your applications and SaaS partners send events to a bus; rules match events by pattern, such as an EC2 instance state change to stopped, and route them to targets like Lambda, SQS, SNS, Step Functions or another account's bus. EventBridge Scheduler and scheduled rules replace cron servers. Compared with SNS, EventBridge offers content-based filtering on any event field, many more target types and third-party event sources; SNS offers higher fan-out throughput and delivery to email, SMS and HTTP endpoints.",
   "AWS Step Functions coordinates multi-step workflows as state machines defined in Amazon States Language. Each state can invoke Lambda or call AWS services directly, with built-in retries, error catching, parallel branches, choices and waits. Standard workflows can run for up to a year and suit long-running business processes, including waiting for human approval; Express workflows suit high-volume, short event processing. Step Functions is the answer when a question describes orchestrating several Lambda functions with error handling, instead of chaining functions that call each other."
  ],
  terms: [
   ["AWS Lambda", "A serverless compute service that runs functions in response to events, for up to 15 minutes per invocation."],
   ["Amazon API Gateway", "A managed service for creating, securing and throttling REST, HTTP and WebSocket APIs."],
   ["Amazon EventBridge", "A serverless event bus that routes events to targets based on pattern-matching rules."],
   ["AWS Step Functions", "A service that orchestrates workflows as state machines with retries, branches and error handling."]
  ],
  example: "An insurance claim app accepts uploads through API Gateway and Lambda. A Step Functions workflow then extracts data, checks for fraud, waits for an adjuster's approval, and pays out, retrying failed steps automatically. An EventBridge rule notifies the audit team whenever a claim over a threshold is approved.",
  tip: "Watch for time limits: a job longer than 15 minutes rules out Lambda. Orchestrating multiple steps with retries points to Step Functions; routing events from AWS services or SaaS apps by content points to EventBridge.",
  check: [
   ["A nightly batch job runs for two hours. Is Lambda a good fit?", "No. Lambda invocations are limited to 15 minutes. Use AWS Batch, ECS on Fargate or EC2."],
   ["Which service would run a Lambda function whenever any EC2 instance in the account stops?", "Amazon EventBridge, with a rule matching EC2 instance state-change events for the stopped state."]
  ]
 },
 {
  t: "Containers on AWS: ECS vs EKS, and the Fargate vs EC2 launch types",
  body: [
   "Containers package an application with its dependencies so it runs the same way everywhere. On AWS you choose an orchestrator, which schedules and manages containers, and a capacity model, which decides where they run. Container images are usually stored in Amazon Elastic Container Registry (ECR), a private registry that can scan images for vulnerabilities.",
   "Amazon Elastic Container Service (ECS) is AWS's own orchestrator. You describe containers in a task definition (image, CPU, memory, ports, environment, IAM task role), and an ECS service keeps a desired number of tasks running, replaces failed ones and registers them with a load balancer. ECS is simpler to learn and deeply integrated with AWS, which makes it a good answer when a question stresses minimal operational overhead and no special Kubernetes requirement.",
   "Amazon Elastic Kubernetes Service (EKS) runs the Kubernetes control plane for you across multiple AZs. You use standard Kubernetes tools such as `kubectl`, Helm charts and manifests. Choose EKS when an organization already uses Kubernetes, wants portability across clouds or on-premises, or depends on the Kubernetes ecosystem. Pods get AWS permissions through IAM roles for service accounts or EKS Pod Identity, rather than node-wide permissions.",
   "Both orchestrators support two capacity models. With the EC2 launch type (in EKS, managed node groups or self-managed nodes), containers run on EC2 instances in your account. You choose instance types, patch the hosts and manage cluster capacity, which gives you control over GPUs, specialized instances, Reserved Instance or Spot pricing and daemon-style agents. With AWS Fargate, there are no instances to manage: you specify CPU and memory per task or pod, and AWS runs it on isolated capacity, billing for the resources requested while it runs. Fargate is the answer for the least operational overhead; EC2 is the answer when you need control over the host or the lowest cost for steady, dense workloads. Fargate Spot and Spot instances offer discounted interruptible capacity for fault-tolerant tasks.",
   "Two details show up often. In ECS, the task execution role lets the ECS agent pull images and write logs, while the task role gives the application code its AWS permissions. And ECS services can scale tasks with Service Auto Scaling on metrics such as CPU or ALB request count."
  ],
  terms: [
   ["Task definition", "The ECS blueprint describing a task's containers, resources, networking and IAM roles."],
   ["Amazon EKS", "A managed Kubernetes service that runs the control plane for you."],
   ["AWS Fargate", "A serverless compute engine for containers that removes the need to manage EC2 hosts."],
   ["ECS task role", "The IAM role whose permissions the application inside an ECS task uses."]
  ],
  example: "A startup wants to run a containerized API without managing servers or learning Kubernetes. It pushes images to ECR, defines an ECS service on Fargate behind an ALB, and sets Service Auto Scaling on CPU. A different team that already runs Kubernetes on-premises moves its workloads to EKS to keep the same manifests and tools.",
  tip: "Existing Kubernetes skills or portability: EKS. Simplest AWS-native orchestration: ECS. No servers to manage: Fargate. Need GPUs, host-level control or Reserved pricing on hosts: EC2 launch type.",
  check: [
   ["Which ECS role does application code use to read from DynamoDB?", "The task role. The task execution role is for the ECS agent to pull images and send logs."],
   ["What is the main operational difference between Fargate and the EC2 launch type?", "With Fargate AWS manages the underlying hosts; with EC2 you provision, patch and scale the container instances yourself."]
  ]
 },
 {
  t: "Relational database resilience: RDS Multi-AZ, read replicas, Aurora replicas and Aurora Global Database",
  body: [
   "Amazon RDS runs managed relational databases: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server and Db2, plus Amazon Aurora. AWS handles provisioning, patching, automated backups and failover. The exam tests which feature solves availability, which solves read scaling, and which solves Regional disaster recovery, because they are easy to mix up.",
   "RDS Multi-AZ is for high availability. In the classic Multi-AZ instance deployment, RDS keeps a standby in another AZ with synchronous replication. The standby does not serve reads. If the primary fails, or during some maintenance, RDS fails over automatically by pointing the database endpoint's DNS name at the standby, usually within a minute or two, so applications reconnect to the same endpoint. The newer Multi-AZ DB cluster deployment has two readable standbys and faster failover, for MySQL and PostgreSQL.",
   "Read replicas are for read scaling. RDS copies changes asynchronously to one or more replicas, each with its own endpoint, so you direct reporting and read-heavy queries there. Because replication is asynchronous, replicas can lag slightly. Replicas can be in the same AZ, another AZ or another Region; a cross-Region replica also serves as a disaster recovery copy that you can manually promote to a standalone database. Promotion is not automatic, and it breaks replication.",
   "Amazon Aurora, compatible with MySQL and PostgreSQL, has a different architecture. The cluster volume stores six copies of your data across three AZs, and up to 15 Aurora Replicas share that storage, so replica lag is typically very low. Replicas serve reads through the reader endpoint, which load-balances across them, and they are also failover targets: if the writer fails, Aurora promotes a replica automatically, based on the priority tiers you set. So in Aurora, replicas give both read scaling and high availability.",
   "Aurora Global Database extends a cluster across Regions: one primary Region handles writes, and up to several secondary Regions receive storage-level replication with typical lag under a second. Secondary clusters serve low-latency local reads and can be promoted during a Regional outage, giving a recovery point objective of seconds and a recovery time objective of around a minute. That makes it the go-to answer for a relational database that must survive a Regional failure with minimal data loss."
  ],
  terms: [
   ["Multi-AZ deployment", "An RDS configuration with a synchronously replicated standby in another AZ and automatic failover."],
   ["Read replica", "An asynchronously replicated copy of a database used to offload reads; can be promoted manually."],
   ["Aurora Replica", "A reader instance sharing the Aurora cluster volume that serves reads and is an automatic failover target."],
   ["Aurora Global Database", "An Aurora configuration that replicates a cluster to secondary Regions with typically sub-second lag."]
  ],
  example: "A reporting dashboard slows down the order database at month end. The team adds two read replicas and points the reporting tool at them, which fixes performance. Separately, it enables Multi-AZ on the primary so that a hardware failure causes an automatic failover instead of an outage. Later, when a new rule requires recovery from a Region failure within minutes, it migrates to Aurora Global Database.",
  tip: "Multi-AZ equals availability, not performance; the classic standby cannot serve reads. Read replicas equal read performance, with asynchronous replication. Cross-Region relational DR with RPO of seconds equals Aurora Global Database.",
  check: [
   ["Can you send read queries to the standby in a classic RDS Multi-AZ instance deployment?", "No. The standby exists only for failover. Use read replicas (or a Multi-AZ DB cluster with readable standbys) for reads."],
   ["What happens to an Aurora cluster when its writer instance fails?", "Aurora automatically promotes an Aurora Replica to be the new writer, and the cluster endpoint points to it."]
  ]
 },
 {
  t: "DynamoDB resilience: global tables, point-in-time recovery and on-demand backups",
  body: [
   "Amazon DynamoDB is a fully managed, serverless key-value and document database. Resilience is built in: every table's data is automatically replicated across multiple Availability Zones in its Region, so you do not configure Multi-AZ as you do with RDS. What you do choose is how to handle two other risks: a whole-Region problem, and data being corrupted or deleted by people or bugs.",
   "Global tables handle Regional resilience and global latency. You add replica Regions to a table, and DynamoDB replicates changes among them, usually within a second or two. Every replica accepts reads and writes (active-active), so users in each Region get local latency and an application can keep running in another Region if one becomes unavailable. When the same item is written in two Regions at almost the same time, conflicts are resolved by last writer wins. Global tables require DynamoDB Streams, which DynamoDB enables for you.",
   "Replication does not protect you from bad writes, because a mistaken delete replicates everywhere just as quickly. For that you need backups. Point-in-time recovery (PITR), once enabled, keeps continuous backups and lets you restore the table to any second within a recovery window of up to 35 days. On-demand backups are full backups you take manually or on a schedule and keep until you delete them, useful for long-term retention and compliance. Neither kind of backup affects table performance.",
   "Restores always create a new table; they never overwrite the existing one. After a restore, you must reconfigure some settings on the new table, such as auto scaling policies, IAM policies, CloudWatch alarms and tags, and point your application at it. AWS Backup can also manage DynamoDB backups centrally, adding cross-Region and cross-account copies, lifecycle to cold storage and backup vault locks.",
   "Two related features help with recovery and auditing. DynamoDB Streams captures item-level changes for 24 hours, which Lambda can process for audit trails or replication to other systems. Time to Live (TTL) deletes expired items automatically, which reduces storage but also means TTL deletions are expected, not an incident. For the exam, remember: global tables for multi-Region availability and low latency, PITR for restoring from accidental writes or deletes to a precise moment, and on-demand backups or AWS Backup for long-term retention."
  ],
  terms: [
   ["Global table", "A DynamoDB table replicated across multiple Regions, with every replica accepting reads and writes."],
   ["Point-in-time recovery (PITR)", "Continuous DynamoDB backups allowing restore to any second in the recovery window of up to 35 days."],
   ["On-demand backup", "A full, manually created DynamoDB backup retained until you delete it."],
   ["Last writer wins", "The conflict resolution rule in global tables where the most recent write to an item prevails."]
  ],
  example: "A bug in a release overwrote thousands of customer profiles at 14:05. Because PITR was enabled, the team restored the table to a new table as of 14:04, compared the two, and copied the correct items back. The same table is a global table in two Regions so that the customer app stays available even if one Region has an outage.",
  tip: "Replication is not backup: global tables copy mistakes too. For recovering from accidental deletion or corruption to an exact moment, choose point-in-time recovery; restores always go to a new table.",
  check: [
   ["An engineer accidentally deleted items 10 minutes ago. The table is a global table in three Regions. Can another Region's replica help?", "No. The deletes replicated to every Region. Restore with point-in-time recovery or a backup instead."],
   ["Does a DynamoDB restore overwrite the source table?", "No. Restores always create a new table, which you then configure and point the application at."]
  ]
 },
 {
  t: "Route 53 routing policies and health checks: failover, weighted, latency, geolocation and multivalue",
  body: [
   "Amazon Route 53 is AWS's DNS service. It registers domains, hosts public and private hosted zones, and answers DNS queries with a 100 percent availability service level agreement. What makes it an architecture tool is its routing policies, which decide which answer a resolver gets, and its health checks, which remove unhealthy endpoints from those answers.",
   "Records come in the usual DNS types, such as A, AAAA, CNAME and MX, plus alias records, a Route 53 extension. An alias record points a name at an AWS resource, such as an ALB, CloudFront distribution, API Gateway or S3 website endpoint, and works at the zone apex (for example `example.com` itself), which a CNAME cannot. Queries to alias records pointing at AWS resources are not charged.",
   "Simple routing returns one record set, with no health checks. Failover routing sets up active-passive: the primary record is returned while its health check passes; if it fails, Route 53 returns the secondary, which is often a static S3 website or a standby Region. Weighted routing splits traffic by weight, such as 90 and 10, useful for canary releases and gradual migrations. Latency-based routing returns the endpoint in the AWS Region with the lowest measured latency from the user's network. Geolocation routing answers based on the user's continent, country or US state, useful for localization, content rights and legal restrictions; you should add a default record for locations you do not match. Geoproximity routing, used with traffic flow, routes by distance and lets you shift traffic with a bias. IP-based routing chooses by the client's source network CIDR. Multivalue answer routing returns up to eight healthy records at random, a simple form of client-side load balancing that is not a replacement for a load balancer.",
   "Health checks can monitor an endpoint by IP or domain name over HTTP, HTTPS or TCP from locations around the world, optionally looking for a string in the response. Calculated health checks combine others with AND and OR logic, and health checks can also follow a CloudWatch alarm, which is how you monitor resources in private subnets that the internet-based checkers cannot reach. For alias records pointing at AWS resources, you can instead set Evaluate target health.",
   "Remember that DNS answers are cached by resolvers for the record's TTL, so failover is not instant; lower TTLs speed changes at the cost of more queries."
  ],
  terms: [
   ["Alias record", "A Route 53 record that points to an AWS resource, works at the zone apex and has no query charge for AWS targets."],
   ["Failover routing", "An active-passive policy returning the secondary record only when the primary's health check fails."],
   ["Latency-based routing", "A policy that returns the endpoint in the Region with the lowest latency for the user."],
   ["Geolocation routing", "A policy that returns answers based on the user's geographic location."]
  ],
  example: "A company runs its app in two Regions. It uses latency-based routing so European users reach the Frankfurt deployment and US users reach Virginia, with health checks on each ALB. When the Virginia deployment fails its health check, Route 53 stops returning it and all users are sent to Frankfurt until it recovers.",
  tip: "Content must be restricted or localized by country: geolocation, not latency. Best performance for users: latency. Canary or percentage split: weighted. Active-passive DR: failover. The zone apex pointing at an ALB: an alias record.",
  check: [
   ["Why can't you use a CNAME for example.com pointing to an ALB?", "DNS does not allow a CNAME at the zone apex. Use a Route 53 alias record instead."],
   ["How can Route 53 health-check a resource that has only a private IP?", "Create a CloudWatch alarm on a metric for the resource and base the Route 53 health check on that alarm."]
  ]
 },
 {
  t: "Disaster recovery strategies: backup and restore, pilot light, warm standby and multi-site active-active, matched to RPO and RTO",
  body: [
   "Disaster recovery (DR) is the plan for getting a workload running again after a major event, such as a Region-wide outage, data corruption or a ransomware attack. Two numbers drive every DR decision. The recovery point objective (RPO) is how much data, measured in time, the business can afford to lose: an RPO of one hour means you can lose at most the last hour of changes. The recovery time objective (RTO) is how long the workload can be down. Lower RPO and RTO cost more, so you match the strategy to the business need rather than always choosing the most resilient.",
   "AWS describes four strategies, from cheapest and slowest to most expensive and fastest. Backup and restore keeps backups, such as EBS snapshots, RDS snapshots, DynamoDB backups and S3 copies, in the recovery Region. In a disaster you redeploy infrastructure, ideally with infrastructure as code, and restore data. RPO is the time since the last backup and RTO is hours; cost is lowest because nothing runs in the recovery Region.",
   "Pilot light keeps the core data live in the recovery Region, for example a cross-Region database replica and replicated S3 buckets, while application servers are off or not yet created. In a disaster you start or deploy the application tier, scale it up and switch DNS. RPO is minutes or seconds because data is replicating; RTO is tens of minutes.",
   "Warm standby runs a complete but scaled-down copy of the whole workload in the recovery Region, able to handle some traffic immediately. In a disaster you scale it to full size and shift traffic. RTO is minutes. Because the stack is already running, you can test it continuously, which makes this more reliable than pilot light.",
   "Multi-site active-active runs full production in two or more Regions at the same time, with Route 53 or Global Accelerator sending users to each and data replicated with services such as Aurora Global Database or DynamoDB global tables. Losing a Region means the others take its traffic; RPO and RTO approach zero, and cost is highest. A variant called hot standby runs full capacity in the second Region but serves traffic only from the primary.",
   "Whatever you choose, test failover regularly, automate the runbook, and remember that replication alone does not protect against corruption; you still need point-in-time backups."
  ],
  terms: [
   ["RPO", "Recovery point objective: the maximum acceptable data loss, measured as time before the disaster."],
   ["RTO", "Recovery time objective: the maximum acceptable time to restore service after a disaster."],
   ["Pilot light", "A DR strategy that keeps data replicated in the recovery Region with the application tier off until needed."],
   ["Warm standby", "A DR strategy that runs a scaled-down but fully functional copy of the workload in the recovery Region."]
  ],
  example: "An internal HR system can be down for a day and lose a few hours of data, so it uses backup and restore with copies of snapshots in a second Region. The customer checkout system must be back in under 10 minutes with almost no data loss, so it runs a warm standby with an Aurora Global Database secondary that can be promoted and an Auto Scaling group ready to scale up.",
  tip: "Match wording to strategy: lowest cost and hours of RTO is backup and restore; core database running but servers off is pilot light; scaled-down but fully working copy is warm standby; near-zero RTO and RPO is multi-site active-active.",
  check: [
   ["A workload needs RTO under 15 minutes at moderate cost, with the whole stack able to take some traffic immediately. Which strategy?", "Warm standby: a scaled-down, fully running copy that you scale up during a disaster."],
   ["What is the difference between RPO and RTO?", "RPO is how much data (in time) you can lose; RTO is how long the service can be down."]
  ]
 },
 {
  t: "Backup and replication: AWS Backup plans, S3 Cross-Region Replication, EBS snapshot and AMI copies, AWS Elastic Disaster Recovery",
  body: [
   "Every DR strategy depends on copies of data and machine images being in the right place. AWS gives you service-specific features and a central service to manage them, and the exam asks you to pick the one that meets a requirement with the least effort.",
   "AWS Backup centralizes backups across many services, including EBS, EC2, RDS, Aurora, DynamoDB, EFS, FSx, S3 and Storage Gateway. A backup plan defines rules: how often to back up, the backup window, how long to keep recovery points, when to move them to cold storage and whether to copy them to another Region or account. Resources are assigned to a plan by tags or resource IDs, so tagging a new database `backup=daily` is enough to protect it. Recovery points are stored in backup vaults. AWS Backup Vault Lock can make a vault's retention immutable, protecting backups from deletion even by administrators, which matters for ransomware defense. With AWS Organizations, backup policies can be applied across accounts.",
   "Amazon S3 Replication copies objects asynchronously to another bucket. Cross-Region Replication (CRR) sends them to a bucket in a different Region, for disaster recovery, compliance or lower latency; Same-Region Replication (SRR) is used for log aggregation or copies between accounts. Both require versioning on the source and destination buckets and an IAM role that S3 uses to replicate. Replication applies to new objects written after the rule is created; existing objects need S3 Batch Replication. Delete markers are not replicated unless you enable it, and permanent deletions of versions are never replicated, which protects against malicious deletes. S3 Replication Time Control adds a predictable replication time backed by a service level agreement.",
   "EBS snapshots are incremental, point-in-time backups of volumes stored in S3 by AWS. You can copy a snapshot to another Region or share it with another account, and encrypt or re-encrypt it during the copy. An Amazon Machine Image (AMI) captures an instance's root and data volumes plus launch settings; AMIs are Regional, so to launch the same server in a recovery Region you copy the AMI there. Amazon Data Lifecycle Manager can automate snapshot and AMI creation, retention and cross-Region copies.",
   "AWS Elastic Disaster Recovery (AWS DRS) continuously replicates servers, physical, virtual or cloud, at the block level into a low-cost staging area in an AWS Region. During a disaster or drill it launches recovery instances within minutes, giving an RPO of seconds and an RTO of minutes for many workloads, without running full-size servers all the time. It is the answer for lifting whole servers, including on-premises ones, into AWS for DR."
  ],
  terms: [
   ["Backup plan", "An AWS Backup policy defining backup frequency, retention, lifecycle and copy rules for assigned resources."],
   ["Vault Lock", "An AWS Backup feature that makes a backup vault's retention settings immutable."],
   ["Cross-Region Replication", "Asynchronous copying of S3 objects to a bucket in another Region; requires versioning on both buckets."],
   ["AWS Elastic Disaster Recovery", "A service that continuously replicates servers to AWS and launches recovery instances on demand."]
  ],
  example: "A company must keep daily backups of all production EBS volumes, RDS databases and EFS file systems for 35 days, with copies in a second Region that nobody can delete. It creates one AWS Backup plan with a copy rule to the other Region, assigns resources by the tag `env=prod`, and enables Vault Lock on the destination vault.",
  tip: "Centralized, tag-based backup across services with cross-Region and cross-account copies: AWS Backup. Automatically copy new S3 objects to another Region: CRR (versioning required). Continuous block-level replication of whole servers for DR: Elastic Disaster Recovery.",
  check: [
   ["You created a CRR rule, but objects uploaded last year are not in the destination bucket. Why?", "Replication rules apply to new objects. Use S3 Batch Replication to copy existing objects."],
   ["How do you launch the same EC2 image in another Region?", "Copy the AMI to that Region, since AMIs are Regional resources, then launch from the copy."]
  ]
 },
 {
  t: "Resilient hybrid networking: Site-to-Site VPN, Direct Connect with VPN backup, and Transit Gateway",
  body: [
   "Many companies keep data centers while moving workloads to AWS, so the network link between them becomes critical. There are two main connection types, and a hub service that ties many networks together.",
   "AWS Site-to-Site VPN creates encrypted IPsec tunnels over the internet between your on-premises customer gateway device and AWS, ending at a virtual private gateway on a VPC or at a Transit Gateway. Each VPN connection includes two tunnels, terminating in different AZs, so one tunnel can fail without losing connectivity; you should configure your device to use both. VPN is quick to set up and inexpensive, but its throughput per tunnel is limited and its performance varies with the internet. Dynamic routing with the Border Gateway Protocol (BGP) enables automatic failover between tunnels.",
   "AWS Direct Connect is a dedicated private network connection from your premises, or a colocation facility, to an AWS Direct Connect location. It offers consistent latency and high bandwidth, with dedicated connections at speeds such as 1, 10 and 100 Gbps and hosted connections from partners at lower speeds. Setting up a new dedicated connection can take weeks. Traffic is carried on virtual interfaces: a private VIF reaches VPCs, a public VIF reaches AWS public services, and a transit VIF reaches Transit Gateways through a Direct Connect gateway. Direct Connect is not encrypted by default; for encryption you can run an IPsec VPN over it or use MACsec on supported dedicated connections.",
   "One Direct Connect connection is a single point of failure. For resilience, AWS recommends connections at more than one Direct Connect location for critical workloads. A cost-effective pattern is Direct Connect as primary with Site-to-Site VPN as backup: BGP prefers the Direct Connect path and fails over to the VPN if it goes down, accepting lower bandwidth during the outage.",
   "As VPC counts grow, meshes of VPC peering connections become unmanageable, because peering is not transitive. AWS Transit Gateway is a regional hub that connects VPCs, VPN connections and Direct Connect gateways in a hub-and-spoke model, with route tables to control which attachments can talk to each other. Transit Gateways in different Regions can be peered, and they can be shared across accounts with Resource Access Manager. Transit Gateway also supports equal-cost multipath (ECMP) across multiple VPN tunnels to increase VPN bandwidth."
  ],
  terms: [
   ["Customer gateway", "The on-premises VPN device, or its AWS representation, at your end of a Site-to-Site VPN."],
   ["AWS Direct Connect", "A dedicated private network connection between on-premises networks and AWS."],
   ["Virtual interface (VIF)", "A logical connection on Direct Connect: private, public or transit."],
   ["Transit Gateway", "A regional network hub that connects VPCs and on-premises networks with centralized routing."]
  ],
  example: "A bank connects its data center to 40 VPCs. It attaches all VPCs to a Transit Gateway, connects the data center through two Direct Connect connections at different locations for consistent performance, and keeps a Site-to-Site VPN to the Transit Gateway as a last-resort backup, with BGP handling failover automatically.",
  tip: "Need connectivity this week or at low cost: Site-to-Site VPN. Consistent, high-bandwidth private link: Direct Connect, which takes longer to provision. Cheapest resilient option for Direct Connect: add a VPN backup. Many VPCs plus on-premises: Transit Gateway.",
  check: [
   ["VPC A peers with B, and B peers with C. Can A reach C through B?", "No. VPC peering is not transitive. Peer A and C directly or use a Transit Gateway."],
   ["Is traffic over Direct Connect encrypted by default?", "No. Add an IPsec VPN over Direct Connect or use MACsec where supported if encryption is required."]
  ]
 },
 {
  t: "Infrastructure as code and service quotas: CloudFormation, StackSets and planning for limits and throttling",
  body: [
   "Resilience is not only about redundant hardware. If a Region fails and your recovery environment has to be built by hand from memory, recovery will be slow and error-prone. Infrastructure as code (IaC) describes your environment in text files that can be versioned, reviewed and deployed repeatedly, which makes rebuilds fast and consistent.",
   "AWS CloudFormation is AWS's native IaC service. A template, written in JSON or YAML, declares resources such as VPCs, instances and databases, with parameters for inputs, mappings for lookups, conditions and outputs. CloudFormation creates them as a stack, in dependency order, and if creation fails it rolls back by default. To update a stack, you submit a changed template; a change set previews what will be added, modified or replaced before you run it. Drift detection shows resources that were changed outside CloudFormation. A DeletionPolicy of Retain or Snapshot protects data such as databases when a stack is deleted. The AWS Cloud Development Kit (CDK) and AWS SAM let you write in programming languages or a serverless shorthand that produce CloudFormation templates.",
   "CloudFormation StackSets deploy one template to many accounts and Regions in a single operation. With service-managed permissions in AWS Organizations, StackSets can deploy automatically to every account in an OU, including accounts added later. This is the standard way to roll out baselines such as IAM roles, Config rules or logging to every account, or to prepare identical infrastructure in a DR Region.",
   "Every AWS service has service quotas, formerly called limits, such as the number of VPCs per Region, running On-Demand vCPUs per Region, or requests per second to an API. Some are adjustable through the Service Quotas console, and some are fixed. For resilience, the key idea is planning: if you fail over to another Region, that Region's quotas must be high enough for your full production load, so request increases in advance. CloudWatch alarms on quota usage and Trusted Advisor service limit checks help you spot approaching limits.",
   "APIs also throttle: when you exceed a request rate, the service returns a throttling error, such as HTTP 429 or a `ThrottlingException`. Well-built clients retry with exponential backoff and jitter, which the AWS SDKs do automatically. Designs that fan out many calls should use queues to smooth bursts, caching to reduce repeated calls, and batching APIs where they exist."
  ],
  terms: [
   ["CloudFormation stack", "A set of AWS resources created and managed together from one template."],
   ["Change set", "A preview of the changes CloudFormation will make when updating a stack."],
   ["StackSets", "A CloudFormation feature that deploys a template across multiple accounts and Regions."],
   ["Exponential backoff", "A retry strategy that waits progressively longer between attempts, usually with random jitter."]
  ],
  example: "Before a DR test, an architect discovers that the recovery Region's vCPU quota for On-Demand instances is far below what production uses. She requests an increase through Service Quotas, and uses a StackSet to deploy the networking and IAM baseline to the recovery Region in every workload account, so failover only requires deploying the application stacks.",
  tip: "Deploy the same resources to many accounts or Regions: StackSets. Preview changes before updating: change set. DR plans must include quota increases in the recovery Region. Throttling errors are handled with retries using exponential backoff.",
  check: [
   ["What does CloudFormation do by default if a resource fails during stack creation?", "It rolls back, deleting the resources it created for that stack."],
   ["An application receives ThrottlingException errors during bursts. What are two good fixes?", "Retry with exponential backoff and jitter, and smooth or reduce the calls with a queue, caching or batching (or request a quota increase if adjustable)."]
  ]
 },
 {
  t: "EC2 instance families and placement groups (cluster, spread, partition), and enhanced networking with ENA and EFA",
  body: [
   "Amazon EC2 offers hundreds of instance types, but they fall into a few families, and the exam expects you to match a workload to a family. The name encodes it: in `m7g.large`, `m` is the family, `7` the generation, `g` an attribute (here AWS Graviton, an Arm-based processor) and `large` the size. General purpose (M, and T for burstable) balances CPU, memory and networking. Compute optimized (C) suits batch processing, web servers and scientific modeling. Memory optimized (R, X and others) suits in-memory databases and caches. Storage optimized (I, D and others) has fast local instance storage for high random I/O or dense sequential workloads. Accelerated computing (P, G, Inf, Trn and others) adds GPUs or AWS machine learning chips. T instances earn CPU credits while idle and spend them in bursts; in unlimited mode they can burst beyond credits for an extra charge.",
   "Placement groups influence where instances are placed in the physical infrastructure. A cluster placement group packs instances close together in one AZ for the lowest latency and highest throughput between them, which suits tightly coupled high performance computing (HPC). The trade-off is that a single rack or AZ issue affects many instances. A spread placement group puts each instance on distinct hardware, with a limit of seven running instances per AZ per group, to minimize correlated failures for a small number of critical instances. A partition placement group divides instances into partitions, each on its own set of racks, so large distributed systems such as Hadoop, Cassandra and Kafka can place replicas in different failure domains; instances can learn their partition through metadata.",
   "Networking performance depends on the instance type and on enhanced networking, which uses single root I/O virtualization (SR-IOV) for higher bandwidth, higher packet rates and lower latency. The Elastic Network Adapter (ENA) provides enhanced networking on current instance types, and it is enabled on current AWS-provided AMIs. The Elastic Fabric Adapter (EFA) is a network device for HPC and machine learning that adds OS-bypass capabilities, letting applications using the Message Passing Interface (MPI) or NVIDIA Collective Communications Library (NCCL) communicate directly with the network hardware for very low latency. EFA is available on selected instance types and is usually combined with a cluster placement group.",
   "When a question describes tightly coupled HPC nodes needing the lowest latency between them, the answer combines a compute-optimized or HPC instance type, a cluster placement group and EFA. When it describes a handful of critical instances that must not share hardware, it is a spread placement group."
  ],
  terms: [
   ["Cluster placement group", "Instances packed closely in one AZ for low-latency, high-throughput networking."],
   ["Spread placement group", "Each instance on distinct hardware, limited to seven running instances per AZ per group."],
   ["Partition placement group", "Instances divided into partitions on separate racks, for large distributed and replicated systems."],
   ["Elastic Fabric Adapter (EFA)", "A network interface with OS-bypass for tightly coupled HPC and ML workloads."]
  ],
  example: "A research team runs a weather simulation across 64 instances that exchange data constantly using MPI. The architect chooses an HPC-oriented instance type with EFA, launches all nodes in a cluster placement group in one AZ, and checkpoints results to Amazon FSx for Lustre so a failure does not lose the whole run.",
  tip: "Lowest latency between nodes: cluster. Maximum isolation for a few instances: spread. Big replicated clusters like Kafka or HDFS: partition. MPI or OS-bypass: EFA, not just ENA.",
  check: [
   ["Which placement group is best for a Cassandra cluster of 30 nodes that must keep replicas on separate racks?", "A partition placement group, which puts each partition on its own racks and exposes partition information to the application."],
   ["What does the 'g' in m7g indicate?", "The instance uses an AWS Graviton (Arm-based) processor."]
  ]
 },
 {
  t: "EBS volume types and instance store: gp3 vs io2 Block Express vs st1 and sc1",
  body: [
   "Amazon Elastic Block Store (EBS) provides network-attached block storage volumes for EC2, like virtual hard disks. A volume lives in one Availability Zone, is replicated within that AZ, persists independently of the instance and can be backed up with snapshots. Normally a volume attaches to one instance at a time; io1 and io2 volumes support Multi-Attach to several Nitro instances in the same AZ for clustered applications that manage concurrent writes.",
   "EBS volume types split into SSD-backed and HDD-backed. The general purpose SSD gp3 is the default choice for boot volumes and most workloads. Its key feature is that performance is independent of size: every gp3 volume gets a baseline of 3,000 IOPS and 125 MB/s, and you can provision more IOPS and throughput separately without buying more storage. The older gp2 ties IOPS to volume size and uses burst credits for small volumes, which is why migrating gp2 to gp3 usually cuts cost or improves performance.",
   "Provisioned IOPS SSDs, io1 and io2, are for I/O-intensive databases that need sustained, consistent IOPS and low latency. io2 Block Express offers the highest performance EBS tier, with sub-millisecond latency, much higher IOPS and throughput per volume than gp3, and higher durability than other volume types. Choose it for large, mission-critical databases such as SAP HANA, Oracle or SQL Server when gp3's maximums are not enough.",
   "HDD volumes are optimized for throughput, measured in MB/s, on large sequential reads and writes, and cannot be boot volumes. Throughput optimized HDD (st1) suits big data, data warehouses, log processing and streaming workloads that read large files in sequence. Cold HDD (sc1) is the lowest cost EBS option for infrequently accessed, throughput-oriented data. Random small I/O on HDD volumes performs poorly, so never pick them for transactional databases.",
   "Instance store is different: it is temporary block storage on disks physically attached to the host. It gives very high I/O performance and costs nothing extra, but data is lost when the instance stops, hibernates or terminates, or if the underlying drive fails. Data survives only a reboot. Use it for caches, buffers, scratch data, or replicated data where the application keeps copies on other nodes. Only certain instance types include it, and you cannot detach it and attach it elsewhere."
  ],
  terms: [
   ["gp3", "General purpose SSD with baseline 3,000 IOPS and 125 MB/s, with IOPS and throughput provisioned independently of size."],
   ["io2 Block Express", "The highest-performance EBS SSD for demanding databases, with sub-millisecond latency and high durability."],
   ["st1", "Throughput optimized HDD for large sequential workloads such as big data and logs; not bootable."],
   ["Instance store", "Temporary block storage physically attached to the host; data is lost on stop or termination."]
  ],
  example: "A company runs a large Oracle database needing very high sustained IOPS and chooses io2 Block Express. Its web servers use gp3 boot volumes. A log analytics cluster reading terabytes sequentially uses st1, and archived monthly reports that are rarely scanned sit on sc1. A caching layer uses the instance store on storage optimized instances because the cache can be rebuilt.",
  tip: "Default or boot volume: gp3. Highest sustained IOPS for critical databases: io2 Block Express. Big sequential throughput at low cost: st1; coldest and cheapest: sc1. Fastest temporary scratch space that may be lost: instance store.",
  check: [
   ["You stop and start an instance. What happens to data on its instance store volume?", "It is lost. Instance store data only survives reboots, not stops, hibernation or termination."],
   ["Why is gp3 often cheaper than gp2 for the same performance?", "gp3 lets you provision IOPS and throughput independently of size, so you no longer need to over-provision storage to get IOPS."]
  ]
 },
 {
  t: "Shared file systems: Amazon EFS vs FSx for Windows File Server, FSx for Lustre and FSx for NetApp ONTAP",
  body: [
   "EBS volumes generally attach to one instance, and S3 is object storage accessed over HTTP. When many servers need to read and write the same files through a normal file system interface, you need a shared file system. AWS offers Amazon EFS and the Amazon FSx family, and the exam decides between them by protocol, operating system and performance profile.",
   "Amazon Elastic File System (EFS) is a fully managed Network File System (NFS) for Linux workloads. Thousands of EC2 instances, containers and Lambda functions can mount it at once, across AZs through mount targets in each AZ. It grows and shrinks automatically with no capacity to provision, and you pay for storage used. Regional file systems store data redundantly across multiple AZs; One Zone file systems cost less for data that does not need that. Storage classes and lifecycle management move rarely used files to Infrequent Access and Archive classes. Throughput modes include elastic, which scales automatically with demand. EFS does not support Windows.",
   "Amazon FSx for Windows File Server provides fully managed Windows file shares using the Server Message Block (SMB) protocol, integrated with Microsoft Active Directory for permissions using NTFS access control lists. It supports Windows features such as DFS namespaces, shadow copies and data deduplication, and Multi-AZ deployments for high availability. Choose it for Windows applications, home directories and SharePoint or SQL Server workloads that expect SMB.",
   "Amazon FSx for Lustre is a high performance parallel file system for HPC, machine learning training, media rendering and financial modeling, with throughput of hundreds of gigabytes per second and sub-millisecond latencies. It can link to an S3 bucket, presenting objects as files and writing results back. Scratch file systems are for temporary, short-term processing with no data replication; persistent file systems replicate within an AZ for longer-running work.",
   "Amazon FSx for NetApp ONTAP runs NetApp's ONTAP file system as a managed service. It supports NFS, SMB and iSCSI at the same time, so Linux, Windows and macOS clients can share data, and it offers ONTAP features like snapshots, SnapMirror replication, cloning, compression and deduplication. It is the natural answer when a company already uses NetApp on-premises or needs multi-protocol access. A fourth option, FSx for OpenZFS, suits workloads moving from ZFS or other Linux file servers."
  ],
  terms: [
   ["Amazon EFS", "A managed, elastic NFS file system for Linux that many instances across AZs can mount simultaneously."],
   ["FSx for Windows File Server", "A managed Windows file server using SMB with Active Directory integration."],
   ["FSx for Lustre", "A managed high-performance parallel file system for HPC and ML, with optional S3 integration."],
   ["FSx for NetApp ONTAP", "A managed NetApp ONTAP file system supporting NFS, SMB and iSCSI with ONTAP data features."]
  ],
  example: "A media company renders video frames on 500 Linux instances. Source assets live in S3; an FSx for Lustre file system linked to the bucket gives render nodes fast file access and writes finished frames back to S3. Its editors on Windows workstations use FSx for Windows File Server shares joined to the corporate Active Directory, and its web servers share uploaded images on EFS.",
  tip: "Linux shared files: EFS. Windows or SMB with Active Directory: FSx for Windows File Server. HPC or ML throughput, especially with S3 data: FSx for Lustre. NetApp features or NFS plus SMB plus iSCSI together: FSx for NetApp ONTAP.",
  check: [
   ["A Windows .NET application needs a shared drive with NTFS permissions from Active Directory. Which service?", "Amazon FSx for Windows File Server, which uses SMB and integrates with Active Directory."],
   ["Which file system can present an S3 bucket's objects as files for a machine learning training job?", "Amazon FSx for Lustre, linked to the S3 bucket as a data repository."]
  ]
 },
 {
  t: "S3 performance: prefixes, multipart upload, byte-range fetches and S3 Transfer Acceleration",
  body: [
   "Amazon S3 scales to huge request rates automatically, but it helps to know how. S3 supports at least 3,500 PUT, COPY, POST or DELETE requests and 5,500 GET or HEAD requests per second per prefix in a bucket. A prefix is the part of the object key before the object name, like `logs/2026/09/` in `logs/2026/09/app.log`. There is no limit on the number of prefixes, so spreading requests across many prefixes multiplies the achievable rate. S3 scales partitions gradually as load increases, so a sudden huge burst may briefly see 503 Slow Down errors, which clients should retry with backoff.",
   "Large objects need a different approach. A single PUT can upload an object up to 5 GB, but multipart upload splits an object into parts that upload independently and in parallel, then combines them. AWS recommends multipart upload for objects over about 100 MB, and it is required above 5 GB; objects can be up to 5 TB. If a part fails, only that part is retried. The AWS CLI's high-level `aws s3 cp` command uses multipart upload automatically for large files. Incomplete multipart uploads keep their parts and are billed until completed or aborted, so a lifecycle rule to abort incomplete uploads after some days is good practice.",
   "Downloads have a mirror feature: byte-range fetches. Using the HTTP `Range` header, a client requests a specific part of an object, and several ranges can download in parallel for higher throughput. It also lets an application read just the header of a large file, and a failed range can be retried alone.",
   "Distance also matters. S3 Transfer Acceleration speeds up long-distance uploads and downloads by routing them through the nearest CloudFront edge location and then across the AWS backbone network to the bucket. You enable it on the bucket and use the distinct accelerate endpoint, `bucketname.s3-accelerate.amazonaws.com`. You pay an extra per-GB fee, charged only when acceleration actually helps. It suits users around the world uploading to a centralized bucket.",
   "For reads of popular content by many users, CloudFront caching is usually a better answer than tuning S3 itself. For queries that need only part of the data inside objects, services like Athena or S3 Select avoid downloading whole files. And for very large numbers of small files, consider batching them into bigger objects, since per-request overhead dominates small transfers."
  ],
  terms: [
   ["Prefix", "The leading part of an S3 object key; request rate limits apply per prefix."],
   ["Multipart upload", "Uploading an object in independently transferred parts that S3 then assembles; required above 5 GB."],
   ["Byte-range fetch", "Downloading a specific range of bytes of an object with the HTTP Range header, often in parallel."],
   ["S3 Transfer Acceleration", "A bucket feature that routes transfers through CloudFront edge locations over the AWS backbone."]
  ],
  example: "Film studios on three continents upload multi-gigabyte raw footage to a bucket in one Region, and uploads are slow and often fail. The architect enables S3 Transfer Acceleration, and the upload tool switches to multipart upload with parallel parts, so each failure only retries one part and the long-distance hops use the AWS backbone.",
  tip: "Global users uploading to one bucket over long distances: Transfer Acceleration. Large files and unreliable networks: multipart upload. Faster parallel downloads or reading part of a file: byte-range fetches. Higher request rates: more prefixes.",
  check: [
   ["An application writes 12,000 objects per second under one prefix and gets 503 errors. What design change helps?", "Spread the keys across multiple prefixes so the request rate per prefix stays within S3's per-prefix rates, and retry with backoff."],
   ["What is the largest object you can upload in a single PUT?", "5 GB. Larger objects, up to 5 TB, require multipart upload."]
  ]
 },
 {
  t: "Caching: ElastiCache for Redis vs Memcached, DynamoDB Accelerator (DAX), lazy loading vs write-through",
  body: [
   "A cache keeps frequently read data in fast memory so that repeated requests do not hit a slower database. That lowers latency, often from milliseconds to microseconds, and reduces load and cost on the database. The exam asks which cache fits and which caching strategy fits.",
   "Amazon ElastiCache is a managed in-memory cache. ElastiCache for Redis, and its open source successor engine Valkey which ElastiCache also supports, is feature-rich: advanced data structures such as sorted sets (great for leaderboards), hashes and lists; replication with automatic failover in Multi-AZ configurations; persistence with backups and restores; publish-subscribe messaging; and cluster mode to shard data across nodes. Use it for session stores, leaderboards, rate limiting and any cache that must survive a node failure. ElastiCache for Memcached is simpler: a multi-threaded, pure key-value cache that scales out by adding nodes, with no replication, no persistence and no backups. Use it when you need a simple, horizontally scaled cache and losing data on node failure is acceptable.",
   "DynamoDB Accelerator (DAX) is an in-memory cache designed only for DynamoDB. It is API-compatible, so an application switches from the DynamoDB client to the DAX client with minimal code changes, and read latency drops from milliseconds to microseconds for eventually consistent reads. DAX is the answer when a question asks for microsecond reads on DynamoDB with little code change. It does not help write-heavy workloads or strongly consistent reads, which pass through to DynamoDB.",
   "Two caching strategies appear often. Lazy loading, also called cache-aside, means the application checks the cache first; on a miss it reads from the database and writes the result to the cache. Only requested data is cached, and a failed cache node is not fatal, but a miss costs three trips and data can become stale. Write-through means the application writes to the cache every time it writes to the database, so cached data is always current, but every write pays extra latency and the cache fills with data that may never be read. Many designs combine both, and add a time to live (TTL) on keys so stale data expires.",
   "Caching also appears elsewhere: API Gateway can cache responses, CloudFront caches content at the edge, and RDS read replicas can offload reads when a cache is not appropriate, for example when every query is different."
  ],
  terms: [
   ["ElastiCache for Redis", "A managed in-memory data store with rich data types, replication, persistence and Multi-AZ failover."],
   ["ElastiCache for Memcached", "A managed, multi-threaded key-value cache without replication or persistence."],
   ["DAX", "DynamoDB Accelerator, an API-compatible in-memory cache for DynamoDB with microsecond read latency."],
   ["Lazy loading", "A caching strategy that loads data into the cache only after a cache miss."]
  ],
  example: "A gaming company stores player profiles in DynamoDB and its global leaderboard in ElastiCache for Redis using a sorted set, with Multi-AZ replicas so the leaderboard survives a node failure. When profile reads spike during tournaments, it adds DAX in front of the table, changing only the client library.",
  tip: "Leaderboards, pub/sub, persistence or high availability: Redis. Simplest multi-threaded key-value cache: Memcached. Microsecond reads for DynamoDB with minimal code change: DAX. Always-fresh cache at the cost of write latency: write-through.",
  check: [
   ["Which caching strategy can serve stale data, and how do you limit it?", "Lazy loading, because the cache is only refreshed on a miss. Set a TTL on cached items so they expire and are reloaded."],
   ["Would DAX help an application that mostly does strongly consistent reads?", "No. DAX passes strongly consistent reads through to DynamoDB; it accelerates eventually consistent reads."]
  ]
 },
 {
  t: "Content delivery and global networking: CloudFront caching and TTLs vs AWS Global Accelerator",
  body: [
   "Users far from your AWS Region experience latency simply because of distance and the many internet hops in between. AWS has two services that bring users onto the AWS global network close to where they are: Amazon CloudFront and AWS Global Accelerator. They sound similar, and telling them apart is a classic exam item.",
   "CloudFront is a content delivery network (CDN). It caches content at edge locations worldwide, so repeat requests are answered near the user without going back to the origin. Origins can be S3 buckets, ALBs, EC2 instances, API Gateway or any HTTP server. Behaviors map URL path patterns, such as `/images/*`, to origins and cache settings. A cache policy controls the cache key, meaning which headers, cookies and query strings make a response unique, and the TTLs: minimum, default and maximum times an object stays cached. The origin can influence TTL with `Cache-Control` or `Expires` headers within those limits. Including too many values in the cache key lowers the cache hit ratio. To remove content before it expires, you can create an invalidation, or better, use versioned file names such as `app.v2.js`. CloudFront also accelerates dynamic content, supports signed URLs and signed cookies for private content, and runs code at the edge with CloudFront Functions and Lambda@Edge.",
   "AWS Global Accelerator does not cache. It gives you two static anycast IP addresses announced from AWS edge locations. Users connect to the nearest edge, and traffic then travels over the AWS backbone to your endpoints, which can be ALBs, NLBs, EC2 instances or Elastic IPs in one or more Regions. It works for any TCP or UDP traffic, not just HTTP. Health checks and traffic dials route users to healthy endpoints, failing over between Regions in seconds without DNS caching delays, because the IP addresses never change.",
   "So how do you choose? For cacheable HTTP content, such as images, video, static websites and API responses, choose CloudFront. For non-HTTP protocols such as gaming over UDP, IoT over MQTT or VoIP, for clients that need fixed IP addresses to allowlist, or for fast multi-Region failover without depending on DNS TTLs, choose Global Accelerator. Both integrate with AWS Shield for DDoS protection."
  ],
  terms: [
   ["Edge location", "An AWS site close to users where CloudFront caches content and Global Accelerator accepts traffic."],
   ["TTL", "Time to live: how long CloudFront keeps an object in cache before checking the origin again."],
   ["Invalidation", "A CloudFront request to remove objects from edge caches before their TTL expires."],
   ["AWS Global Accelerator", "A service providing static anycast IPs that route TCP and UDP traffic over the AWS backbone to healthy endpoints."]
  ],
  example: "A news site's images and articles are cached by CloudFront with a one-day TTL for images and a short TTL for the homepage, which cuts origin load dramatically. Its sister company runs a multiplayer game over UDP in three Regions and uses Global Accelerator so players connect to two fixed IPs and are routed to the nearest healthy Region.",
  tip: "Caching and HTTP content means CloudFront. Static IP addresses, UDP or TCP non-HTTP traffic, or instant regional failover without DNS means Global Accelerator.",
  check: [
   ["Customers must allowlist exactly two IP addresses for an API served from two Regions. Which service?", "AWS Global Accelerator, which provides two static anycast IP addresses for endpoints in multiple Regions."],
   ["You deployed a new CSS file with the same name, but users still get the old one. What are two fixes?", "Create a CloudFront invalidation for the path, or use versioned file names so the new file has a new cache key."]
  ]
 },
 {
  t: "Choosing a database: RDS, Aurora, DynamoDB, Redshift, DocumentDB, Neptune, and RDS Proxy for connection pooling",
  body: [
   "AWS takes a purpose-built approach to databases: rather than one database for everything, you pick the engine that fits the data model and access pattern. Exam questions usually give you clues, such as joins and transactions, key-value lookups at massive scale, analytics over years of data, or relationships between entities, and expect you to map them to a service.",
   "Amazon RDS runs familiar relational engines (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server and Db2) as managed services. Choose it for structured data with SQL, joins and ACID transactions, especially when an application already expects a specific engine or needs a commercial one. Amazon Aurora is AWS's cloud-native relational engine compatible with MySQL and PostgreSQL, with a distributed storage layer across three AZs, up to 15 low-lag replicas, fast failover, and options like Aurora Serverless v2 and Global Database. Choose Aurora when you want higher performance and availability than standard RDS with MySQL or PostgreSQL compatibility.",
   "Amazon DynamoDB is a serverless key-value and document NoSQL database with single-digit millisecond performance at any scale, no servers to manage and features such as global tables, streams and TTL. Choose it for high-scale web, mobile, gaming and IoT workloads with known access patterns, and when a schema-flexible, serverless database is wanted. Amazon Redshift is a columnar data warehouse for online analytical processing (OLAP): complex SQL queries and aggregations over large historical datasets, for business intelligence. It is not meant for high-volume transactional updates.",
   "Amazon DocumentDB (with MongoDB compatibility) stores JSON documents and supports MongoDB APIs and drivers, so it is the answer for migrating MongoDB workloads to a managed service. Amazon Neptune is a graph database for highly connected data such as social networks, recommendation engines, fraud rings and knowledge graphs, queried with Gremlin, openCypher or SPARQL. Others you may see: Amazon Keyspaces for Apache Cassandra, Amazon Timestream for time series and Amazon MemoryDB as a durable Redis-compatible database.",
   "RDS Proxy sits between applications and RDS or Aurora and pools and shares database connections. It matters most for serverless: thousands of concurrent Lambda functions can each open a connection and exhaust the database's connection limit. The proxy multiplexes them onto fewer connections, reduces failover time by keeping client connections open while the database fails over, and can enforce IAM authentication with credentials stored in Secrets Manager. RDS Proxy is not a cache and does not speed up individual queries."
  ],
  terms: [
   ["OLTP vs OLAP", "Online transaction processing handles many small reads and writes; online analytical processing runs large aggregate queries."],
   ["Amazon Redshift", "A managed columnar data warehouse for analytics over large datasets."],
   ["Amazon Neptune", "A managed graph database for data defined by relationships between entities."],
   ["RDS Proxy", "A managed database proxy that pools connections to RDS and Aurora and speeds failover."]
  ],
  example: "A startup's serverless API uses Lambda with Aurora PostgreSQL, and during traffic spikes the database runs out of connections. Adding RDS Proxy lets thousands of function instances share a small pool of connections. For its friend-recommendation feature, the team adds Neptune, and for nightly sales reporting it loads data into Redshift.",
  tip: "Match clues to engines: relationships and graph traversal is Neptune; MongoDB compatibility is DocumentDB; analytics or data warehouse is Redshift; key-value at any scale with serverless operation is DynamoDB; too many connections from Lambda is RDS Proxy.",
  check: [
   ["A company wants to move a self-managed MongoDB database to a managed AWS service with minimal code changes. Which service?", "Amazon DocumentDB (with MongoDB compatibility)."],
   ["Lambda functions exhaust an RDS database's connections during bursts. What should you add?", "RDS Proxy, which pools and shares database connections."]
  ]
 },
 {
  t: "DynamoDB performance: partition key design, provisioned vs on-demand capacity, auto scaling and secondary indexes",
  body: [
   "DynamoDB delivers consistent performance at any scale, but only if the table is designed for how it will be accessed. Unlike relational databases, you design DynamoDB tables around queries, not around normalized entities.",
   "Every item has a primary key. A simple primary key is just a partition key; a composite primary key adds a sort key. DynamoDB hashes the partition key to decide which physical partition stores the item, and each partition has a limit on throughput. If many requests go to the same partition key value, a hot partition forms, and requests are throttled even though the table as a whole has spare capacity. Good partition keys have high cardinality and spread requests evenly, such as a user ID or order ID. Poor ones have few values or concentrate traffic, such as a status field or today's date. When one value is unavoidably hot, write sharding adds a random or calculated suffix to spread it. Adaptive capacity helps absorb some imbalance but does not fix a bad design.",
   "Capacity comes in two modes. Provisioned capacity sets read capacity units (RCUs) and write capacity units (WCUs). One RCU is one strongly consistent read per second, or two eventually consistent reads, of an item up to 4 KB; one WCU is one write per second of an item up to 1 KB. Transactional operations use twice the units. Provisioned mode suits predictable traffic, can use auto scaling, which adjusts capacity between a minimum and maximum to track a target utilization, and can use reserved capacity for further savings. On-demand mode charges per request with no capacity planning and instantly accommodates traffic that ramps quickly, which suits new, unpredictable or spiky workloads. You can switch modes, with some limits on how often.",
   "Secondary indexes enable queries on attributes other than the primary key. A global secondary index (GSI) has its own partition key and optional sort key, can be created or deleted at any time, has its own capacity, and supports only eventually consistent reads. A local secondary index (LSI) shares the table's partition key but uses a different sort key, must be created with the table, and supports strongly consistent reads. Indexes project attributes from the table; projecting fewer attributes saves storage and write capacity.",
   "Finally, prefer `Query`, which reads items with one partition key value, over `Scan`, which reads the whole table and consumes capacity for every item it examines. If a workload needs many scans, it probably needs a new index or a different data store."
  ],
  terms: [
   ["Partition key", "The key attribute DynamoDB hashes to distribute items across partitions."],
   ["Hot partition", "A partition receiving a disproportionate share of traffic, causing throttling."],
   ["Global secondary index", "An index with a different partition key that can be added anytime and supports eventually consistent reads."],
   ["On-demand capacity", "A DynamoDB billing mode charging per request with no capacity planning."]
  ],
  example: "A voting app uses the candidate name as the partition key, and on election night the top two candidates' partitions are throttled. The team changes writes to use keys like `candidateA#7`, with a random suffix from 1 to 10, then sums the shards when reading. It also switches the table to on-demand mode because traffic is unpredictable.",
  tip: "Throttling while total capacity is unused points to a hot partition and poor key design. Unknown or spiky traffic points to on-demand; steady, predictable traffic points to provisioned with auto scaling. Need a new query pattern after launch: add a GSI, because LSIs must be created with the table.",
  check: [
   ["How many RCUs are needed for 10 strongly consistent reads per second of 6 KB items?", "20. Each 6 KB read rounds up to 8 KB, which is two 4 KB units, so 10 x 2 = 20 RCUs."],
   ["You need to query an existing table by email address, which is not part of the key. What do you add?", "A global secondary index with email as its partition key, since LSIs can only be created with the table."]
  ]
 },
 {
  t: "Streaming ingestion: Kinesis Data Streams vs Amazon Data Firehose vs Amazon MSK",
  body: [
   "Streaming data arrives continuously, such as clickstreams, application logs, IoT sensor readings or financial transactions, and often needs to be processed within seconds. AWS offers three main ingestion services, and the exam distinguishes them by how much control you need and where the data is going.",
   "Amazon Kinesis Data Streams is a real-time data stream that you read with your own consumers. Producers put records with a partition key; records with the same key go to the same shard, preserving order within the key. In provisioned mode, each shard supports a fixed ingest rate (1 MB/s or 1,000 records per second) and read rate, and you add shards to scale; in on-demand mode Kinesis manages capacity for you. Records are retained for 24 hours by default, extendable up to 365 days, so multiple consumers can read the same data independently and replay it. Consumers include Lambda, applications using the Kinesis Client Library, and Amazon Managed Service for Apache Flink for real-time analytics. Enhanced fan-out gives each consumer dedicated read throughput. Choose Data Streams for real-time, custom processing, multiple consumers and replay.",
   "Amazon Data Firehose, formerly Kinesis Data Firehose, is the simplest way to load streaming data into destinations. It is fully managed and scales automatically with no shards. It buffers incoming data by size or time and delivers it to Amazon S3, Redshift, OpenSearch Service, Splunk, HTTP endpoints and several partner services. It can transform records with Lambda, convert JSON to Parquet or ORC, and compress data. Because of buffering, delivery is near real time (seconds to minutes) rather than immediate, and Firehose does not store data for replay. Choose it when the requirement is load streaming data into S3 or Redshift with the least operational overhead.",
   "Amazon Managed Streaming for Apache Kafka (MSK) runs Apache Kafka clusters for you, and MSK Serverless removes capacity management. Choose it when a company already uses Kafka, wants to keep Kafka APIs, tools and connectors, or needs Kafka-specific features. It offers more configuration control than Kinesis at the cost of more Kafka knowledge.",
   "The services also combine: a common pattern sends events into Kinesis Data Streams for real-time consumers and attaches Firehose as one consumer to archive everything to S3 for later analysis with Athena."
  ],
  terms: [
   ["Shard", "The unit of capacity in a provisioned Kinesis data stream, with fixed read and write throughput."],
   ["Partition key (Kinesis)", "The value that determines which shard receives a record, preserving order per key."],
   ["Amazon Data Firehose", "A fully managed service that buffers streaming data and delivers it to destinations like S3 and Redshift."],
   ["Amazon MSK", "Amazon Managed Streaming for Apache Kafka, a managed Kafka service."]
  ],
  example: "A ride-sharing company streams driver locations into Kinesis Data Streams. A Lambda consumer updates a live map within a second, a Flink application detects surge areas, and Firehose, reading the same stream, writes compressed Parquet files to S3 every few minutes for data scientists to query with Athena.",
  tip: "Deliver to S3, Redshift or OpenSearch with no code and no capacity management: Firehose. Real-time custom consumers, ordering per key or replay: Kinesis Data Streams. Existing Kafka workloads or Kafka APIs: MSK.",
  check: [
   ["Can Amazon Data Firehose replay data from yesterday to a new consumer?", "No. Firehose delivers and does not retain data for replay. Kinesis Data Streams retains records so consumers can re-read them."],
   ["A Kinesis producer gets throughput exceeded errors on a provisioned stream. What are two fixes?", "Add shards (or switch to on-demand mode) and use a well-distributed partition key so records spread across shards."]
  ]
 },
 {
  t: "Analytics services: Athena, AWS Glue, Lake Formation, EMR, Redshift Spectrum and QuickSight",
  body: [
   "A data lake stores raw and processed data of every shape, usually in Amazon S3, and lets many tools analyze it without copying it into a separate system first. AWS has a set of services that catalog, secure, process, query and visualize that data. The exam expects you to know the job of each.",
   "AWS Glue is a serverless data integration service. Glue crawlers scan data in S3 and other sources, infer schemas and create tables in the AWS Glue Data Catalog, a central metadata repository that Athena, Redshift Spectrum and EMR all use. Glue jobs run extract, transform and load (ETL) code on serverless Apache Spark, for example converting CSV to Parquet and partitioning it by date. Glue also offers visual job authoring and data quality rules.",
   "Amazon Athena is a serverless interactive query service: you write standard SQL against data in S3, using tables defined in the Data Catalog, and pay per amount of data scanned. There are no clusters. Because pricing is per scan, storing data in compressed, columnar formats such as Parquet or ORC and partitioning it, for example by year, month and day, reduces cost and speeds queries. Athena is the answer for ad hoc queries on S3 data, such as analyzing CloudTrail, VPC Flow Logs or ALB logs, with no infrastructure.",
   "AWS Lake Formation builds on the Glue Data Catalog to set up and secure data lakes. Its key feature is centralized, fine-grained access control: grant a team access to specific databases, tables, columns or rows, and have those permissions enforced across Athena, Redshift Spectrum, EMR and Glue. It is the answer when a question asks for column-level or row-level permissions on a data lake managed in one place.",
   "Amazon EMR runs big data frameworks such as Apache Spark, Hive, Presto, HBase and Flink on clusters of EC2 instances, on EKS, or serverless. It suits large-scale processing, machine learning preparation and workloads that need framework-level control; clusters can use Spot Instances for task nodes to cut cost. Amazon Redshift Spectrum lets a Redshift cluster query data directly in S3 and join it with tables loaded in Redshift, so you keep hot data in the warehouse and cold history in the lake. Amazon QuickSight is the serverless business intelligence service for dashboards and visualizations, connecting to Athena, Redshift, RDS, S3 and others, with per-user pricing."
  ],
  terms: [
   ["AWS Glue Data Catalog", "A central metadata store of table definitions shared by Athena, EMR, Redshift Spectrum and Glue."],
   ["Amazon Athena", "A serverless SQL query service for data in S3, priced per data scanned."],
   ["AWS Lake Formation", "A service to build data lakes and manage fine-grained access to them centrally."],
   ["Redshift Spectrum", "A Redshift feature that queries data in S3 directly and joins it with warehouse tables."]
  ],
  example: "A retailer lands raw sales CSV files in S3. A Glue crawler catalogs them and a Glue job converts them to partitioned Parquet. Analysts run ad hoc SQL with Athena, finance sees only non-PII columns through Lake Formation permissions, and executives view QuickSight dashboards built on the same data.",
  tip: "Ad hoc SQL on S3 with no servers: Athena. Discover schemas and ETL: Glue. Column or row-level permissions across analytics tools: Lake Formation. Hadoop or Spark clusters with control: EMR. Join Redshift tables with S3 data: Redshift Spectrum. Dashboards: QuickSight.",
  check: [
   ["How can you reduce Athena query costs on a large log dataset?", "Convert the data to a compressed columnar format such as Parquet and partition it so queries scan less data."],
   ["Which service creates tables in the Data Catalog by scanning data in S3?", "An AWS Glue crawler."]
  ]
 },
 {
  t: "EC2 Auto Scaling policies: target tracking, step, simple, scheduled and predictive scaling",
  body: [
   "An Auto Scaling group keeps a fleet between its minimum and maximum size, and scaling policies decide when to change the desired capacity. Choosing the right policy lets you meet performance goals without paying for idle instances. The exam describes a traffic pattern and asks which policy fits.",
   "Target tracking scaling is the simplest and usually recommended choice. You choose a metric and a target value, such as average CPU utilization at 50 percent or ALB request count per target at 1,000, and Auto Scaling creates and manages the CloudWatch alarms, adding or removing capacity to keep the metric near the target, much like a thermostat. It scales out quickly and scales in more gradually to avoid flapping.",
   "Step scaling uses CloudWatch alarms you create and defines adjustments that vary with the size of the alarm breach: for example, add one instance when CPU is between 60 and 70 percent, and add three when it is above 85 percent. It responds proportionally and keeps responding to alarms while earlier scaling activities are in progress, using an instance warmup setting. Simple scaling makes one adjustment per alarm and then waits for a cooldown period before responding again, so it reacts slowly to rapid changes; it is mostly legacy, and step or target tracking is preferred.",
   "Scheduled scaling changes minimum, maximum or desired capacity at specific times, once or on a recurring cron schedule. It suits known patterns, such as scaling up at 08:00 on weekdays before staff arrive or before a planned marketing event. Predictive scaling uses machine learning on at least a day of historical load, and more for better forecasts, to forecast daily and weekly patterns and launch capacity ahead of expected demand. It helps applications with regular cycles and long instance initialization times, and it is usually combined with target tracking to handle unexpected changes.",
   "Several supporting settings matter. A launch template defines the instance configuration. Warm pools keep pre-initialized instances stopped or running, ready to join quickly. Lifecycle hooks pause instances during launch or termination so you can run scripts, such as draining work or copying logs. Termination policies decide which instance goes first when scaling in, and instance scale-in protection can exempt specific instances. For queue-based workers, scale on a custom metric of backlog per instance, the queue length divided by running instances, rather than on CPU."
  ],
  terms: [
   ["Target tracking scaling", "A policy that adjusts capacity to keep a chosen metric near a target value."],
   ["Step scaling", "A policy that makes larger adjustments for larger CloudWatch alarm breaches."],
   ["Scheduled scaling", "Changing Auto Scaling group capacity at set times for known load patterns."],
   ["Predictive scaling", "Forecasting load from history with machine learning to add capacity before it is needed."]
  ],
  example: "An internal payroll app is busy every weekday from 08:00 to 18:00 and idle at night. The team uses scheduled scaling to raise the minimum at 07:45 and lower it at 18:30, plus target tracking on CPU at 50 percent to handle unusual spikes such as end-of-month processing.",
  tip: "Keep a metric at a value: target tracking. Known times: scheduled. Recurring daily or weekly patterns with slow-starting instances: predictive. Different responses for different breach sizes: step. SQS worker fleets: scale on backlog per instance.",
  check: [
   ["An application takes 10 minutes to boot and has a consistent daily traffic peak at 09:00. Which policy helps most?", "Predictive scaling (or scheduled scaling), so capacity launches before the peak rather than reacting after it starts."],
   ["Why is simple scaling usually avoided today?", "It waits for a cooldown after each adjustment, so it reacts slowly; step or target tracking policies respond better."]
  ]
 },
 {
  t: "Data migration and hybrid storage: DataSync, Snow Family, Storage Gateway, Transfer Family, DMS and SCT",
  body: [
   "Moving data into AWS, or keeping on-premises systems connected to AWS storage, is a large part of many architectures. The right tool depends on how much data there is, how fast the network is, whether the transfer is one-time or ongoing, and whether the data is files, blocks or databases.",
   "AWS DataSync moves files online between on-premises storage (NFS, SMB, HDFS or object storage), other clouds and AWS storage services such as S3, EFS and the FSx file systems. You deploy a DataSync agent near the source, and the service handles parallel transfer, encryption, integrity checks, scheduling and incremental copies. It is the answer for one-time or recurring file migrations over the network, including over Direct Connect.",
   "When the network is too slow, ship the data. The AWS Snow Family provides rugged devices that AWS mails to you: you load data locally and ship the device back, and AWS imports it into S3. Snowball Edge devices offer tens of terabytes each plus local compute for edge processing. A rough rule: if moving the data over your available bandwidth would take more than about a week, consider Snow. AWS has changed the Snow device lineup over time, so for new projects check which devices are currently offered; the concept of offline, physical transfer is what the exam tests.",
   "AWS Storage Gateway connects on-premises applications to AWS storage for ongoing hybrid use, with a local cache for low latency. S3 File Gateway presents NFS or SMB shares whose files are stored as objects in S3. FSx File Gateway gives on-premises Windows users low-latency cached access to FSx for Windows File Server shares. Volume Gateway presents iSCSI block volumes backed by S3 with EBS snapshots, in cached mode (primary data in AWS) or stored mode (primary data local, backed up to AWS). Tape Gateway presents a virtual tape library so existing backup software can write to S3 and Glacier instead of physical tapes.",
   "AWS Transfer Family provides managed SFTP, FTPS, FTP and AS2 endpoints that store files in S3 or EFS, so partners can keep using their existing file transfer tools. AWS Database Migration Service (DMS) migrates databases to AWS with minimal downtime, doing a full load and then change data capture (CDC) to keep the target in sync until cutover. Homogeneous migrations, such as Oracle to Oracle, need only DMS. Heterogeneous migrations, such as Oracle to Aurora PostgreSQL, first need schema conversion: the AWS Schema Conversion Tool (SCT), or the newer DMS Schema Conversion, converts the schema and code objects, then DMS moves the data."
  ],
  terms: [
   ["AWS DataSync", "An online data transfer service for moving files between on-premises storage, other clouds and AWS storage."],
   ["Storage Gateway", "A hybrid service giving on-premises applications file, volume or tape interfaces backed by AWS storage."],
   ["Change data capture (CDC)", "Continuously replicating ongoing database changes from source to target after the initial load."],
   ["AWS SCT", "The Schema Conversion Tool, which converts database schemas and code between different engines."]
  ],
  example: "A hospital moves a 600 TB image archive with only a 200 Mbps internet link, so it orders Snowball Edge devices for the bulk copy, then uses DataSync for the changes made since. Its Oracle database moves to Aurora PostgreSQL using SCT for the schema and DMS with CDC for the data, and a partner that sends files by SFTP connects to Transfer Family instead of an old FTP server.",
  tip: "Online file migration: DataSync. Huge data and limited bandwidth: Snow Family. Ongoing on-premises access to cloud storage: Storage Gateway (file, volume or tape). SFTP for partners: Transfer Family. Database move with minimal downtime: DMS, plus SCT when engines differ.",
  check: [
   ["Which Storage Gateway type lets an existing backup application write to virtual tapes stored in AWS?", "Tape Gateway, which presents a virtual tape library backed by S3 and Glacier storage classes."],
   ["Migrating SQL Server to Aurora MySQL: which tools are needed?", "A schema conversion tool (AWS SCT or DMS Schema Conversion) for the schema and code, then AWS DMS for the data, optionally with CDC."]
  ]
 },
 {
  t: "EC2 purchase options: On-Demand, Reserved Instances, Compute vs EC2 Instance Savings Plans, Spot, Dedicated Instances and Dedicated Hosts",
  body: [
   "The same EC2 instance can cost very different amounts depending on how you buy it. Cost-optimized architectures match each workload to the right purchase option, and the exam gives you a workload description and asks for the cheapest option that still meets the requirements.",
   "On-Demand Instances are billed per second (for Linux, with a one-minute minimum) or per hour with no commitment. They are the most flexible and most expensive per hour, and suit short-term, spiky or unpredictable workloads, development and testing, and anything you cannot interrupt but cannot yet forecast. On-Demand Capacity Reservations let you reserve capacity in a specific AZ without a term commitment, and you pay for them whether or not you use them.",
   "For steady workloads, commit in exchange for discounts. Reserved Instances (RIs) are a one- or three-year commitment to a specific instance family, Region and tenancy, with all upfront, partial upfront or no upfront payment; the more you pay upfront and the longer the term, the bigger the discount. Standard RIs give the largest discount; Convertible RIs can be exchanged for different instance families at a smaller discount. Savings Plans are the newer, more flexible model: you commit to a consistent amount of compute spend in dollars per hour for one or three years. A Compute Savings Plan applies automatically across instance families, sizes, Regions, operating systems and tenancy, and also to Fargate and Lambda usage. An EC2 Instance Savings Plan gives a deeper discount but is tied to one instance family in one Region, while still flexible on size, OS and AZ. Choose Compute Savings Plans when you expect to change families, Regions or move to containers and serverless; choose EC2 Instance Savings Plans for a stable family in one Region.",
   "Spot Instances use spare EC2 capacity at steep discounts, often up to 90 percent off On-Demand, but AWS can reclaim them with a two-minute warning. They suit fault-tolerant, flexible work: batch jobs, big data, CI builds, rendering, stateless web tiers with other capacity underneath. Never put a single critical database on Spot.",
   "Two options address isolation and licensing. Dedicated Instances run on hardware dedicated to your account, but you have no visibility or control over the physical server. Dedicated Hosts give you an entire physical server with visibility into sockets and cores, and let you control instance placement on it. That is what bring-your-own-license (BYOL) software licensed per socket or per core, such as some Windows Server, SQL Server or Oracle licenses, typically requires, and it helps with some compliance requirements. Dedicated Hosts can be bought On-Demand or with reservations and Savings Plans."
  ],
  terms: [
   ["Reserved Instance", "A one- or three-year commitment to an instance configuration in exchange for a lower rate."],
   ["Compute Savings Plan", "A dollars-per-hour commitment that discounts EC2 across families and Regions, plus Fargate and Lambda."],
   ["Spot Instance", "Spare EC2 capacity at a large discount that AWS can reclaim with a two-minute notice."],
   ["Dedicated Host", "A physical server dedicated to you, with socket and core visibility for per-core or per-socket licensing."]
  ],
  example: "A company runs a steady baseline of web servers all year, nightly analytics jobs that can restart, and a legacy app licensed per physical core. It covers the web baseline with a Compute Savings Plan because it plans to move to Fargate next year, runs analytics on Spot Instances, and places the licensed app on a Dedicated Host.",
  tip: "Steady and long-term: Savings Plans or RIs. Interruptible and flexible: Spot. Short, unpredictable and uninterruptible: On-Demand. Per-socket or per-core BYOL licensing: Dedicated Hosts, not Dedicated Instances. Flexibility across families, Regions or Fargate and Lambda: Compute Savings Plan.",
  check: [
   ["Which commitment covers Lambda and Fargate usage as well as EC2?", "A Compute Savings Plan."],
   ["A vendor license is priced per physical CPU socket. Which EC2 option lets you comply?", "Dedicated Hosts, which expose the physical server's sockets and cores."]
  ]
 },
 {
  t: "Spot Instances in practice: interruption notices, mixed-instances Auto Scaling groups and allocation strategies",
  body: [
   "Spot Instances can cut compute costs dramatically, but only architectures that tolerate interruption benefit. This lesson covers how interruption works and how to design fleets that ride through it.",
   "When EC2 needs Spot capacity back, it sends a Spot Instance interruption notice two minutes before stopping, hibernating or terminating the instance (termination is the default behavior). The notice is available in the instance metadata service and as an Amazon EventBridge event, so a script or Lambda function can react: drain connections from the load balancer, checkpoint work to S3, or finish the current job and stop pulling new ones from a queue. EC2 may also send an earlier EC2 instance rebalance recommendation signal when an instance is at elevated risk, and Auto Scaling's Capacity Rebalancing feature can use it to launch a replacement before the interruption arrives. You pay the current Spot price, which changes gradually with long-term supply and demand; you do not need to bid, and you can optionally set a maximum price.",
   "The key design principle is diversification. Spot capacity is managed in pools: each combination of instance type and Availability Zone is a separate pool. If you ask for only one type in one AZ, a capacity squeeze in that pool interrupts everything. An Auto Scaling group with a mixed instances policy can combine On-Demand and Spot capacity and use many instance types across several AZs. You set an On-Demand base capacity, for example two instances that always run On-Demand, and an On-Demand percentage above base, with the rest on Spot. Attribute-based instance type selection lets you specify vCPU and memory requirements instead of listing types, so new types are picked up automatically.",
   "Allocation strategies decide which pools Spot capacity comes from. Price-capacity-optimized, the strategy AWS recommends for most workloads, chooses pools with the most available capacity and then the lowest price among them, lowering interruption rates. Capacity-optimized chooses pools with the most available capacity, which suits workloads where interruptions are expensive. Lowest-price chooses the cheapest pools and can bring higher interruption rates. For On-Demand capacity in a mixed group, you choose lowest-price or prioritized ordering.",
   "Good Spot workloads are stateless, checkpointed or queue-driven: containers on ECS or EKS with Spot capacity providers or node groups, EMR task nodes, CI runners, and SQS workers where an interrupted message simply becomes visible again for another worker."
  ],
  terms: [
   ["Spot interruption notice", "A two-minute warning, via instance metadata and EventBridge, that EC2 will reclaim a Spot Instance."],
   ["Rebalance recommendation", "An early signal that a Spot Instance is at elevated risk of interruption."],
   ["Mixed instances policy", "An Auto Scaling group setting combining multiple instance types and On-Demand and Spot purchase options."],
   ["Price-capacity-optimized", "A Spot allocation strategy that favors pools with high available capacity and then low price."]
  ],
  example: "A video transcoding service reads jobs from SQS and runs on an Auto Scaling group with two On-Demand instances as a base and the rest on Spot across 10 instance types in three AZs, using price-capacity-optimized allocation. When an interruption notice arrives, a small agent stops taking new jobs and uploads partial output; unfinished messages reappear in the queue for other workers.",
  tip: "Reduce Spot interruptions by diversifying instance types and AZs and using price-capacity-optimized or capacity-optimized allocation. The warning is two minutes. Keep a small On-Demand base for capacity that must always exist.",
  check: [
   ["How much warning does EC2 give before reclaiming a Spot Instance, and where does it appear?", "Two minutes, through the instance metadata service and an EventBridge event."],
   ["Why does limiting a Spot fleet to one instance type in one AZ increase risk?", "All instances then share one Spot capacity pool, so a single capacity shortage can interrupt them all."]
  ]
 },
 {
  t: "Right-sizing compute: AWS Compute Optimizer, Graviton instances, and serverless vs always-on cost models",
  body: [
   "Right-sizing means matching resources to what a workload actually uses. Many instances are launched larger than needed and never revisited, so right-sizing is often the fastest way to save money, and it should come before buying commitments, so you do not lock in discounts on waste.",
   "AWS Compute Optimizer analyzes CloudWatch utilization metrics, such as CPU, network and, when the CloudWatch agent publishes it, memory, for EC2 instances, Auto Scaling groups, EBS volumes, Lambda functions, ECS services on Fargate and some RDS databases. It classifies resources as over-provisioned, under-provisioned or optimized, and recommends specific instance types, volume configurations or Lambda memory sizes, with the projected performance risk and savings. Memory metrics are not collected by default on EC2, so installing the CloudWatch agent makes memory-aware recommendations possible. Cost Explorer also offers rightsizing recommendations, and Trusted Advisor flags low-utilization instances.",
   "AWS Graviton processors are Arm-based chips designed by AWS. Graviton instance types, marked with a `g` in the name like `m7g` or `c7g`, typically offer better price performance than comparable x86 instances for many workloads, along with lower energy use. The catch is compatibility: software must run on the Arm64 architecture. Interpreted and JIT-compiled languages such as Python, Node.js, Java and .NET usually move easily, and many container images are multi-architecture; native binaries must be recompiled. Graviton is also available for Lambda, Fargate, RDS, Aurora and ElastiCache, which can be quick wins.",
   "The deeper choice is the cost model. An always-on EC2 instance or container costs the same whether it serves one request or a million, so it is efficient for steady, high utilization, especially with Savings Plans. Serverless services like Lambda, Fargate for short tasks, DynamoDB on-demand and Aurora Serverless v2 charge for actual usage, so they are efficient for idle, spiky or unpredictable workloads, and they remove operational work. At very high, constant volumes, a well-utilized fleet of instances can become cheaper than per-request pricing, so the right answer depends on the traffic pattern.",
   "Also switch off what you do not need: schedule development environments to stop outside working hours with Instance Scheduler or EventBridge rules, delete unused Elastic IPs and load balancers, and tag resources so owners can be found."
  ],
  terms: [
   ["Right-sizing", "Adjusting resource types and sizes to match actual utilization and performance needs."],
   ["AWS Compute Optimizer", "A service that uses utilization metrics to recommend optimal EC2, EBS, Lambda, ECS and other configurations."],
   ["AWS Graviton", "AWS-designed Arm-based processors offering strong price performance for compatible workloads."],
   ["CloudWatch agent", "Software that publishes additional metrics such as memory utilization from instances to CloudWatch."]
  ],
  example: "A company's fleet of 40 m5.2xlarge instances averages 12 percent CPU. Compute Optimizer, with memory data from the CloudWatch agent, recommends m7g.large. The Java application runs unchanged on Arm after a container rebuild, and the team then covers the smaller fleet with a Savings Plan. An internal tool used a few times a day moves from an always-on instance to Lambda.",
  tip: "Get recommendations from utilization data: Compute Optimizer. Better price performance with recompile-free languages: Graviton. Idle or spiky workloads favor serverless; steady high utilization favors provisioned capacity with commitments. Right-size before committing.",
  check: [
   ["Why might Compute Optimizer give less accurate EC2 recommendations by default?", "EC2 does not report memory utilization without the CloudWatch agent, so memory-bound workloads can be misjudged."],
   ["What must you check before moving an application to Graviton?", "That its code and dependencies support Arm64; native binaries and some libraries may need recompiling or replacing."]
  ]
 },
 {
  t: "S3 storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA and the three Glacier classes",
  body: [
   "All S3 storage classes offer the same very high durability for objects (designed for eleven nines, 99.999999999 percent), except that One Zone classes keep data in a single AZ and so can lose data if that AZ is destroyed. What differs is availability, retrieval speed, minimum storage duration, retrieval fees and price. Picking the class that fits the access pattern is one of the most common cost questions.",
   "S3 Standard is for frequently accessed data: low latency, high throughput, no retrieval fee and no minimum duration. S3 Standard-Infrequent Access (Standard-IA) is cheaper to store but charges a per-GB retrieval fee, has a 30-day minimum storage charge and a 128 KB minimum billable object size. It suits backups and older data that must still be available in milliseconds when requested. S3 One Zone-IA costs less than Standard-IA because it stores data in one AZ only; use it for data you can recreate, such as secondary backup copies or thumbnails.",
   "S3 Intelligent-Tiering automatically moves each object between access tiers based on its own access pattern: objects not accessed for 30 days move to an infrequent tier, and after 90 days to an archive instant access tier, with optional opt-in archive tiers for even colder data. There are no retrieval fees, only a small monthly monitoring charge per object, and objects smaller than 128 KB are not monitored and stay in the frequent tier. It is the answer when access patterns are unknown or changing.",
   "The three Glacier classes are for archives. S3 Glacier Instant Retrieval offers millisecond access for data accessed about once a quarter, with a 90-day minimum. S3 Glacier Flexible Retrieval, formerly S3 Glacier, is cheaper, with retrievals that take minutes (expedited) to hours (standard or bulk, where bulk is free), and a 90-day minimum; objects must be restored before use. S3 Glacier Deep Archive is the lowest-cost storage in AWS, for data kept for years for compliance, with standard retrieval within 12 hours and a 180-day minimum.",
   "When comparing, weigh storage cost against retrieval and request costs. Moving millions of tiny objects to IA or Glacier classes can increase costs because of per-object charges and minimums. And an object deleted or transitioned before its class's minimum duration is still billed for the rest of it."
  ],
  terms: [
   ["Standard-IA", "An S3 class for infrequently accessed data with millisecond access, retrieval fees and a 30-day minimum."],
   ["One Zone-IA", "A lower-cost infrequent-access class that stores data in a single Availability Zone."],
   ["Intelligent-Tiering", "An S3 class that automatically moves objects between access tiers based on their usage, with no retrieval fees."],
   ["Glacier Deep Archive", "The lowest-cost S3 class, for long-term archives retrieved within hours, with a 180-day minimum."]
  ],
  example: "A hospital keeps imaging files that are read often for a month, occasionally for a year, and must be kept for ten years. New images go to S3 Standard, move to Standard-IA after 30 days, to Glacier Instant Retrieval after a year because doctors may still need them quickly, and to Glacier Deep Archive after three years for compliance-only retention.",
  tip: "Unknown or changing access: Intelligent-Tiering. Rarely read but must be instant: Standard-IA or Glacier Instant Retrieval. Recreatable data: One Zone-IA. Archive with hours of retrieval acceptable at the lowest price: Deep Archive.",
  check: [
   ["Which S3 classes could lose data if one Availability Zone is destroyed?", "The One Zone classes, such as S3 One Zone-IA, because they store data in only one AZ."],
   ["Data must be kept seven years and is almost never read; retrieval within 48 hours is acceptable. Which class is cheapest?", "S3 Glacier Deep Archive."]
  ]
 },
 {
  t: "S3 Lifecycle rules, S3 Storage Lens and Requester Pays",
  body: [
   "Choosing a storage class once is not enough, because data cools over time. S3 gives you automation to move and delete data as it ages, analytics to find where money is going, and a billing option for sharing large datasets.",
   "S3 Lifecycle rules are configured on a bucket and apply to all objects, or to a subset filtered by prefix, object tags or object size. A rule has two kinds of actions. Transition actions move objects to a cheaper class after a number of days since creation, for example to Standard-IA after 30 days and Glacier Flexible Retrieval after 90. Expiration actions delete objects after a period. On versioned buckets, separate noncurrent version actions transition or expire older versions, for example keep noncurrent versions for 30 days and then delete them, which stops old versions quietly growing the bill. Lifecycle rules can also remove expired delete markers and abort incomplete multipart uploads after a set number of days.",
   "Transitions follow a one-way waterfall, from warmer to colder classes; for example, you can transition from Standard-IA to Glacier, but a lifecycle rule cannot move objects back to Standard. Some transitions have minimums: objects must be stored at least 30 days in Standard before a lifecycle transition to Standard-IA or One Zone-IA. Remember minimum storage durations and per-object transition charges, so transitioning millions of tiny objects may cost more than it saves. When you cannot predict access patterns, Intelligent-Tiering is often simpler than hand-tuned lifecycle rules.",
   "S3 Storage Lens gives organization-wide visibility into storage usage and activity across accounts, Regions, buckets and prefixes, in a dashboard with dozens of metrics. It highlights cost-efficiency opportunities, such as buckets without lifecycle rules, large amounts of noncurrent versions or incomplete multipart uploads, and data protection gaps, such as buckets without versioning or replication. Free metrics are included; advanced metrics and recommendations are a paid upgrade. S3 Storage Class Analysis is a related per-bucket feature that observes access patterns to suggest when to transition data to Standard-IA.",
   "Normally the bucket owner pays for storage and for data transfer out of the bucket. With Requester Pays enabled, the requester pays the request and data transfer costs, while the owner still pays for storage. Requesters must be authenticated AWS identities and include the request payer header, such as `--request-payer requester` in the CLI, so anonymous access is not possible. It suits sharing large datasets, such as research or genomic data, with other organizations."
  ],
  terms: [
   ["Lifecycle rule", "A bucket configuration that transitions or expires objects automatically based on age and filters."],
   ["Noncurrent version", "An older version of an object in a versioned bucket, which lifecycle rules can transition or expire separately."],
   ["S3 Storage Lens", "An analytics dashboard providing organization-wide storage usage, activity and recommendations."],
   ["Requester Pays", "A bucket setting that makes authenticated requesters pay for requests and data transfer."]
  ],
  example: "A company finds with Storage Lens that one logging bucket holds hundreds of terabytes of noncurrent versions and abandoned multipart uploads. It adds a lifecycle rule that moves current logs to Standard-IA after 30 days and Glacier Flexible Retrieval after 90, expires noncurrent versions after 30 days and aborts incomplete multipart uploads after seven days.",
  tip: "Old versions filling a versioned bucket: add a noncurrent version expiration rule. Organization-wide storage visibility: Storage Lens. Others downloading your large public dataset should pay transfer costs: Requester Pays, which requires authenticated requesters.",
  check: [
   ["Can a lifecycle rule move objects from Glacier Flexible Retrieval back to S3 Standard?", "No. Lifecycle transitions only move data to colder classes. Restoring or copying objects is a separate operation."],
   ["Under Requester Pays, who pays for storing the data?", "The bucket owner still pays for storage; requesters pay for requests and data transfer."]
  ]
 },
 {
  t: "Cutting EBS and backup costs: gp2 to gp3, Data Lifecycle Manager, snapshot archive and unattached volumes",
  body: [
   "Block storage and its backups are easy to forget, and they keep costing money every month. A handful of habits typically removes a large share of EBS waste without affecting performance.",
   "Start with volume types. Many older environments still use gp2 volumes, where IOPS scale with volume size, so teams often over-provisioned storage just to get performance. gp3 provides a baseline of 3,000 IOPS and 125 MB/s regardless of size, lets you buy more IOPS and throughput separately, and is priced lower per GB than gp2. You can change a volume from gp2 to gp3 with Elastic Volumes while it stays attached and in use, with no downtime. The same feature lets you grow volumes or change types later, but volumes cannot be shrunk in place.",
   "Next, snapshots. EBS snapshots are incremental: after the first full copy, each snapshot stores only blocks changed since the last one, and deleting an old snapshot keeps any blocks later snapshots still need. Costs grow when snapshots are never cleaned up. Amazon Data Lifecycle Manager (DLM) automates the creation, retention and deletion of EBS snapshots and EBS-backed AMIs using policies that target volumes or instances by tag, for example snapshot every 12 hours, keep 14 copies, and copy weekly snapshots to another Region. AWS Backup can do this too, across many services at once.",
   "For snapshots you must keep for a long time but rarely restore, such as month-end or compliance snapshots, EBS Snapshots Archive moves a snapshot to a much lower-cost archive tier. Archived snapshots are full snapshots rather than incremental, have a minimum archive period of 90 days, and must be restored to the standard tier before use, which can take up to 72 hours. So archive snapshots you keep for 90 days or longer and rarely need; keep recent operational snapshots in the standard tier. The Recycle Bin can protect deleted snapshots and AMIs for a retention period, guarding against accidental deletion.",
   "Finally, find orphans. Unattached EBS volumes, in the available state, are still billed, which often happens when instances are terminated with volumes that were not set to delete on termination. Cost Explorer, Trusted Advisor's underutilized and idle volume checks and Compute Optimizer help find them, and AWS Config rules can flag them. Snapshot a volume if in doubt, then delete it. Also look for old AMIs whose snapshots are still stored, and for over-provisioned io1 or io2 IOPS that could move to gp3."
  ],
  terms: [
   ["Elastic Volumes", "An EBS feature to change volume type, size, IOPS or throughput while the volume is in use."],
   ["Data Lifecycle Manager", "A service that automates EBS snapshot and AMI creation, retention and cross-Region copies by tag-based policy."],
   ["EBS Snapshots Archive", "A low-cost tier for rarely accessed snapshots with a 90-day minimum and restores taking up to 72 hours."],
   ["Unattached volume", "An EBS volume in the available state, not attached to any instance but still billed."]
  ],
  example: "A cost review finds 300 gp2 volumes, 80 unattached volumes and five years of daily snapshots. The team converts gp2 to gp3 in place with Elastic Volumes, snapshots and deletes the unattached volumes, creates a DLM policy that keeps 14 daily snapshots, and moves required year-end snapshots to the archive tier.",
  tip: "gp2 to gp3 is a no-downtime change that usually saves money. Automating snapshot retention by tag: Data Lifecycle Manager. Long-term, rarely restored snapshots: Snapshots Archive. Unattached volumes still cost money.",
  check: [
   ["Do you need to stop the instance to change a volume from gp2 to gp3?", "No. Elastic Volumes changes the type while the volume stays attached and in use."],
   ["When is EBS Snapshots Archive a poor choice?", "For snapshots you may need to restore quickly or keep for less than 90 days, since restores take up to 72 hours and there is a 90-day minimum."]
  ]
 },
 {
  t: "Database cost choices: DynamoDB on-demand vs provisioned, Aurora Serverless v2, reserved DB instances and stopping idle databases",
  body: [
   "Databases are often among the largest line items on an AWS bill because they run all the time. Cost optimization here means matching the capacity model to the traffic pattern, committing where usage is steady, and not paying for databases nobody is using.",
   "For DynamoDB, the choice is between capacity modes. On-demand mode charges per read and write request, needs no planning and handles sudden spikes, which makes it cost-effective for new applications, unpredictable traffic and tables that are idle much of the time. Provisioned mode charges per hour for the read and write capacity units you set, whether you use them or not; with auto scaling tracking a target utilization, it is usually cheaper for steady, predictable traffic, and reserved capacity reduces the price further for long-term commitments. A common path is to start on-demand, learn the pattern, and move stable tables to provisioned. Other DynamoDB savings include the Standard-Infrequent Access table class for tables whose storage cost dominates their throughput cost, and TTL to delete expired items for free.",
   "Aurora Serverless v2 scales database capacity automatically in fine-grained increments measured in Aurora capacity units (ACUs), between a minimum and maximum you set, within seconds. You pay for the capacity used each second. It suits variable, spiky or unpredictable workloads, development and test databases, and multi-tenant applications. For consistently busy databases, provisioned Aurora instances with reserved pricing are usually cheaper. You can mix provisioned and Serverless v2 instances in one cluster, for example a provisioned writer and serverless readers.",
   "For steady RDS and Aurora usage, Reserved DB Instances give a significant discount for a one- or three-year term, just like EC2 RIs. Size-flexible reservations apply across sizes within an instance family for many engines. Right-size first, and consider Graviton-based DB instance classes for better price performance.",
   "Finally, idle databases. You can stop an RDS instance or an Aurora cluster for up to seven days at a time; while stopped, you pay for storage and backups but not instance hours. After seven days AWS automatically starts it again, so for longer idle periods you either automate stopping it again or take a snapshot and delete the database, restoring when needed. For dev and test environments, scheduling stops outside working hours with EventBridge and Lambda, or using Aurora Serverless v2 with a low minimum, avoids paying for nights and weekends."
  ],
  terms: [
   ["Aurora capacity unit (ACU)", "The unit of Aurora Serverless v2 capacity, combining memory with corresponding CPU and networking."],
   ["Reserved DB Instance", "A one- or three-year RDS or Aurora commitment that lowers the hourly instance price."],
   ["DynamoDB reserved capacity", "A commitment to provisioned DynamoDB capacity for a discounted rate."],
   ["Stopped DB instance", "An RDS instance not billed for instance hours, which restarts automatically after seven days."]
  ],
  example: "A SaaS company's production Aurora writer is busy around the clock, so it buys reserved DB instances for it. Its reporting replica only works hard at month end, so it becomes an Aurora Serverless v2 reader. Twenty test databases are stopped every evening and weekend by a scheduled Lambda function, and a new feature's DynamoDB table starts in on-demand mode.",
  tip: "Unpredictable or spiky: DynamoDB on-demand or Aurora Serverless v2. Steady and predictable: provisioned capacity with reservations. A stopped RDS database restarts after seven days, so for long idle periods snapshot and delete it.",
  check: [
   ["A test database is needed only one week per quarter. What is the cheapest approach?", "Snapshot it and delete the instance, then restore from the snapshot when needed; a stopped instance would restart after seven days."],
   ["When is DynamoDB provisioned capacity cheaper than on-demand?", "When traffic is steady and predictable, so provisioned capacity with auto scaling stays well utilized."]
  ]
 },
 {
  t: "Data transfer costs: inter-AZ, inter-Region and internet egress, NAT gateway charges vs gateway endpoints, and CloudFront",
  body: [
   "Data transfer charges are the hidden cost in many AWS architectures. Prices vary by Region and change over time, so the exam focuses on the pattern: which flows are free, which cost a little and which cost the most, and how to redesign traffic paths to pay less.",
   "Data coming into AWS from the internet is generally free. Data going out to the internet, called egress, is charged per GB, and it is often the largest transfer cost for public-facing applications. Traffic within the same Availability Zone between resources using private IP addresses is generally free. Traffic between Availability Zones in the same Region is charged per GB in each direction, so chatty designs that constantly cross AZs, such as an application tier in one AZ talking to a cache in another, add up. Traffic between Regions is charged at a higher rate, for example for cross-Region replication. These charges are a reason to keep chatty components in the same AZ where availability allows, while still spreading independent copies across AZs for resilience.",
   "NAT gateways charge per hour and per GB processed, on top of any transfer charges. When private instances download large volumes from S3 or DynamoDB through a NAT gateway, that processing charge can be substantial. A gateway VPC endpoint for S3 or DynamoDB has no charge and keeps that traffic off the NAT gateway, which is one of the most common cost fixes in exam scenarios. Interface endpoints for other services cost per hour and per GB, but typically less per GB than NAT processing, and they also improve security. Another NAT saving is to avoid cross-AZ NAT traffic by giving each AZ its own NAT gateway.",
   "Amazon CloudFront reduces egress costs as well as latency. Data transfer from AWS origins such as S3 or an ALB to CloudFront edge locations is not charged, and CloudFront's own rates for delivering to users are generally lower than direct internet egress from the origin, with savings bundles and price classes available. Caching also means the origin handles fewer requests, so you may need fewer instances. Serving a popular download or a global website directly from S3 or EC2 is usually more expensive than serving it through CloudFront.",
   "Other tactics: compress data before sending, keep data processing in the same Region as the data, use Direct Connect for large steady on-premises transfers where its data transfer rates are lower than internet egress, and use S3 Requester Pays when others download your datasets."
  ],
  terms: [
   ["Egress", "Data leaving AWS to the internet, charged per GB."],
   ["Inter-AZ transfer", "Traffic between Availability Zones in one Region, charged per GB in each direction."],
   ["NAT gateway data processing", "A per-GB charge on all traffic passing through a NAT gateway, in addition to its hourly charge."],
   ["Price class", "A CloudFront setting that limits which edge locations serve content, trading reach for cost."]
  ],
  example: "A company's bill shows high NAT gateway charges. Flow logs reveal that batch jobs in private subnets pull terabytes from S3 each night through the NAT gateway. Adding an S3 gateway endpoint removes those charges. The same review moves product images from direct S3 downloads to CloudFront, lowering egress costs and speeding up the site.",
  tip: "High NAT gateway cost with S3 or DynamoDB traffic: add a gateway endpoint. High internet egress for static or cacheable content: put it behind CloudFront. Inbound data is free; cross-AZ and cross-Region traffic is not.",
  check: [
   ["Is data transfer from S3 to CloudFront charged?", "No. Transfer from AWS origins to CloudFront edge locations is free; you pay CloudFront's delivery rates to viewers."],
   ["Two EC2 instances in different AZs of the same Region exchange 10 TB per month. Is that free?", "No. Inter-AZ traffic is charged per GB in each direction."]
  ]
 },
 {
  t: "Cost visibility tools: Cost Explorer, AWS Budgets, Cost and Usage Reports, cost allocation tags and Trusted Advisor",
  body: [
   "You cannot optimize what you cannot see. AWS provides a set of tools to see where money goes, attribute it to teams, alert before overspending and find savings. Exam questions typically describe a need, such as alert, analyze, report in detail or recommend, and ask which tool fits.",
   "AWS Cost Explorer is the interactive tool for visualizing and analyzing costs and usage. You can view the last 13 months by default (with optional longer history), group and filter by service, account, Region, usage type or tag, and see forecasts of future spend. It also contains recommendations for Reserved Instance and Savings Plans purchases based on your usage, reports on their utilization and coverage, and rightsizing recommendations. Use it to answer questions like which service grew most last month.",
   "AWS Budgets lets you set custom budgets for cost, usage, reservation utilization or coverage, and Savings Plans, and sends alerts by email or SNS when actual or forecasted amounts cross thresholds. Budget actions can go further, for example applying an IAM policy or SCP that prevents launching new resources, or stopping specific EC2 or RDS instances, when a budget is exceeded. Budgets is the answer for proactive alerting; Cost Explorer is for analysis after the fact. AWS Cost Anomaly Detection uses machine learning to spot unusual spending and alert you.",
   "The AWS Cost and Usage Report (CUR), now delivered through AWS Data Exports, is the most detailed billing data available: line items for each resource by hour or day, with pricing, reservations and tags, delivered to an S3 bucket. It is designed to be queried with Athena, loaded into Redshift or visualized in QuickSight, and it is the answer when finance needs the most granular data for custom chargeback reports.",
   "Cost allocation tags connect costs to owners. You tag resources with keys such as `CostCenter` or `Project`, then activate those tags as cost allocation tags in the Billing console; only after activation do they appear in Cost Explorer and the CUR, and only for costs from then on. AWS-generated tags such as `aws:createdBy` can also be activated. Tag policies in Organizations help enforce consistent tagging.",
   "AWS Trusted Advisor inspects your account and recommends improvements across cost optimization, performance, security, fault tolerance, service limits and operational excellence, such as idle load balancers, underutilized instances, unassociated Elastic IPs and open security groups. All customers get a core set of checks; the full set of checks requires a Business Support plan or higher."
  ],
  terms: [
   ["Cost Explorer", "An interactive tool to analyze, visualize and forecast AWS costs and usage."],
   ["AWS Budgets", "A service that alerts, and can take actions, when costs or usage exceed or are forecast to exceed thresholds."],
   ["Cost and Usage Report", "The most detailed AWS billing dataset, delivered to S3 for analysis with tools like Athena."],
   ["Cost allocation tag", "A resource tag activated in billing so costs can be grouped and filtered by it."]
  ],
  example: "A company wants each product team to see its own monthly spend and be warned early. It tags every resource with `Team`, activates the tag as a cost allocation tag, creates a budget per team filtered by the tag with alerts at 80 percent of forecast, and gives finance the Cost and Usage Report in S3 queried through Athena for chargeback.",
  tip: "Alert before overspending: Budgets. Analyze trends and get Savings Plans recommendations: Cost Explorer. Most granular data for custom reports: Cost and Usage Report. Costs per team or project: activate cost allocation tags. Best-practice checks: Trusted Advisor.",
  check: [
   ["You tagged resources with Project six months ago, but the tag does not appear in Cost Explorer. Why?", "The tag has not been activated as a cost allocation tag in the Billing console; tags only show in cost tools after activation, and only going forward."],
   ["Which tool can automatically stop instances when spending exceeds a threshold?", "AWS Budgets, using budget actions."]
  ]
 },
 {
  t: "Consolidated billing in AWS Organizations: volume discounts and sharing Reserved Instance and Savings Plans benefits",
  body: [
   "Consolidated billing is a built-in feature of AWS Organizations. The management account, historically called the payer account, receives one bill for all member accounts and pays it, while each account's charges remain visible separately. It has no extra charge, and it brings both administrative and financial benefits.",
   "The first financial benefit is volume pricing. Some services charge less per unit as usage grows, such as Amazon S3 storage tiers and data transfer. With consolidated billing, AWS treats all accounts in the organization as one customer for these tiers, so combined usage reaches cheaper tiers sooner than any single account would on its own.",
   "The second benefit is sharing commitment discounts. Reserved Instances and Savings Plans purchased in one account can apply to matching usage in any other account in the organization. For example, if the production account bought RIs for more m6i instances than it is currently running, the unused RI hours can discount matching m6i usage in a development account. Savings Plans apply first to the purchasing account's usage and then to other accounts. This sharing means a central team can buy commitments for the whole organization and maximize utilization.",
   "Sharing is on by default, but it can be turned off for specific accounts from the management account's billing preferences. When sharing is turned off for an account, that account's own purchases apply only to itself, and it does not receive discounts from purchases made in other accounts. Companies sometimes do this when business units must be billed separately, for example after an acquisition or for regulatory reasons.",
   "Consolidated billing combines with the cost tools covered earlier. Cost Explorer and the Cost and Usage Report in the management account show all member accounts, and you can filter by linked account. AWS Budgets can track per-account budgets. Cost allocation tags are activated in the management account. Member accounts can be given access to their own cost data. Keep in mind that the management account is fully responsible for paying all member account charges, which is another reason to protect it carefully and run no workloads in it."
  ],
  terms: [
   ["Consolidated billing", "An AWS Organizations feature that combines all member accounts' charges into one bill paid by the management account."],
   ["Management account", "The account that creates the organization and pays for all member accounts; also called the payer account."],
   ["Volume pricing tier", "A lower per-unit price that applies once combined usage passes a threshold."],
   ["Discount sharing", "Applying Reserved Instance and Savings Plans benefits across accounts in an organization."]
  ],
  example: "A company with 12 accounts buys a Compute Savings Plan centrally in its management account. On weekdays it is used mostly by production workloads; on weekends, when production is quieter, the same commitment automatically discounts batch jobs in the analytics account. Combined S3 storage across accounts also lands in lower pricing tiers.",
  tip: "Reserved Instance and Savings Plans discounts are shared across accounts in an organization by default. If one account must not share or receive them, turn off sharing for that account in the management account's billing preferences.",
  check: [
   ["An RI was bought in account A but account A no longer uses that instance type. Account B does. Does the RI still help?", "Yes, with consolidated billing and sharing enabled, the unused RI benefit applies to matching usage in account B."],
   ["How does consolidated billing lower S3 storage prices?", "Usage across all accounts is combined for volume pricing tiers, so the organization reaches lower per-GB tiers sooner."]
  ]
 }
], { reviewed: "2026-09-25" });
