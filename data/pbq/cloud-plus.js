CertHub.addPbqs("cloud-plus", [
  { id: "dr-pattern-match", d: 1, type: "match", title: "Match disaster recovery architectures",
    prompt: "A company is comparing disaster recovery designs for its order system. Match each description to the DR architecture it describes.",
    pairs: [
      ["Only backups and snapshots are copied to the recovery region; the network and servers are rebuilt from templates after a disaster", "Backup and restore"],
      ["The database replicates continuously to the recovery region, but application servers exist only as images and are launched during failover", "Pilot light"],
      ["A smaller but fully working copy of the entire stack runs all the time in the recovery region and is scaled up during failover", "Warm standby"],
      ["Full production capacity serves live customer traffic from two regions at the same time", "Multisite active-active"]
    ],
    extra: ["Blue-green deployment", "Canary release"],
    explain: "The four patterns form a cost and speed spectrum. Backup and restore is cheapest but has the longest RTO because everything must be rebuilt. Pilot light keeps only the core data layer running. Warm standby runs the whole stack at reduced size, so it can take traffic in minutes. Active-active runs full capacity in every site for near-zero RTO and RPO at the highest cost. Blue-green and canary are release strategies, not DR architectures." },

  { id: "vpc-cidr-plan", d: 1, type: "fill", title: "Plan subnets in a new VPC",
    prompt: "You are dividing a new VPC into equal-sized subnets, one per tier per availability zone. Using the plan below, fill in the values.",
    context: "VPC CIDR:      10.20.0.0/16\nSubnet size:   /20\nSubnets are allocated in order starting at 10.20.0.0:\n  subnet-1  10.20.0.0/20   (public, AZ-a)\n  subnet-2  ?              (public, AZ-b)\n  subnet-3  ?              (private, AZ-a)\n  ...",
    fields: [
      { label: "How many /20 subnets fit in the /16", answers: ["16"] },
      { label: "Total IP addresses in each /20 (before provider reservations)", answers: ["4096", "4,096"] },
      { label: "Network address of subnet-3", answers: ["10.20.32.0", "10.20.32.0/20"] },
      { label: "Last address (broadcast) of subnet-1", answers: ["10.20.15.255"] }
    ],
    explain: "A /20 leaves 12 host bits, so each subnet has 2^12 = 4,096 addresses, and a /16 holds 2^(20-16) = 16 of them. Each /20 spans 16 values in the third octet: subnet-1 is 10.20.0.0 to 10.20.15.255, subnet-2 starts at 10.20.16.0 and subnet-3 at 10.20.32.0. Cloud providers reserve a few addresses in every subnet, so slightly fewer than 4,096 are usable." },

  { id: "migration-plan-order", d: 2, type: "order", title: "Order the migration plan",
    prompt: "A company is moving 80 on-premises applications to the cloud. Put these migration activities in the correct order.",
    steps: [
      "Run discovery to inventory servers, applications and their utilization",
      "Map dependencies between applications, databases and shared services",
      "Group dependent systems into move groups and schedule a low-risk pilot wave",
      "Perform the final data sync and cut over traffic during the approved window",
      "Validate with smoke tests, data checks and comparison to the performance baseline",
      "Decommission the old on-premises servers after a stabilization period"
    ],
    explain: "You cannot map dependencies until you know what exists, and you cannot group systems into waves until you know what depends on what; moving a chatty app without its database is a classic mistake. A pilot wave proves tools and runbooks before critical systems move. Cutover is followed by validation, and old servers are kept until the new environment has proven stable so rollback remains possible." },

  { id: "transfer-time-fill", d: 2, type: "fill", title: "Online or offline data transfer?",
    prompt: "A team must move an archive to cloud object storage within 5 days. Using the figures below, fill in the values.",
    context: "Data to move:          40 TB (decimal: 1 TB = 1,000,000 MB)\nInternet link:         500 Mbps\nUsable for migration:  80% of the link (the rest is production traffic)\nDeadline:              5 days",
    fields: [
      { label: "Effective transfer rate in Mbps", answers: ["400", "400 Mbps"] },
      { label: "Transfer time in seconds", answers: ["800000", "800,000", "800000 s", "800,000 s"] },
      { label: "Transfer time rounded to whole days", answers: ["9", "9 days"] },
      { label: "Does online transfer meet the deadline? (yes/no)", answers: ["no"] }
    ],
    explain: "40 TB is 40,000,000 MB, or 320,000,000 megabits. At 80% of 500 Mbps the effective rate is 400 Mbps, so the transfer takes 320,000,000 / 400 = 800,000 seconds, about 9.3 days. That misses the 5-day deadline even before protocol overhead, so an offline transfer appliance (loaded locally and shipped) is the better choice, followed by an online sync of any changes." },

  { id: "sla-math-fill", d: 3, type: "fill", title: "Calculate availability and downtime",
    prompt: "Use the architecture and SLA figures below to fill in the values. Give percentages to two decimal places.",
    context: "Month length for the SLA:  30 days (43,200 minutes)\nContracted SLA:            99.95% monthly\n\nRequest path (each component is required, in series):\n  web tier       99.90%\n  database       99.95%\n\nProposed change: run the batch worker as two independent instances,\neach 99.00% available; the job succeeds if either instance is up.",
    fields: [
      { label: "Allowed downtime per month at 99.95%, in minutes", answers: ["21.6", "21.60"] },
      { label: "Combined availability of web tier and database in series (%)", answers: ["99.85", "99.85%"] },
      { label: "Availability of the two parallel batch instances (%)", answers: ["99.99", "99.99%"] }
    ],
    explain: "Allowed downtime is 0.05% of 43,200 minutes = 21.6 minutes. Components in series multiply: 0.999 x 0.9995 = 0.9985, or 99.85%, which is lower than either part and below the 99.95% SLA. Redundant components in parallel fail only if both fail: 1 - (0.01 x 0.01) = 0.9999, or 99.99%. Redundancy raises availability; dependency chains lower it." },

  { id: "incremental-restore-order", d: 3, type: "order", title: "Restore from an incremental backup chain",
    prompt: "A file server is backed up with a full backup on Sunday night and incremental backups every other night. It fails on Thursday morning. Put the restore steps in the correct order.",
    context: "Backup job history\n  Sun 23:00  FULL         success\n  Mon 23:00  INCREMENTAL  success\n  Tue 23:00  INCREMENTAL  success\n  Wed 23:00  INCREMENTAL  success\n  Thu 06:10  server failure",
    steps: [
      "Restore Sunday's full backup to the replacement server",
      "Apply Monday's incremental backup",
      "Apply Tuesday's incremental backup",
      "Apply Wednesday's incremental backup",
      "Verify file counts and application access before returning the server to users"
    ],
    explain: "Each incremental contains only changes since the previous backup of any type, so a restore needs the last full backup plus every incremental after it, applied in order. Skipping or losing one incremental breaks the chain. With differential backups you would restore only the full backup and Wednesday's differential. Always verify the restored data before declaring recovery complete." },

  { id: "leaked-key-audit", d: 4, type: "select", title: "Spot misuse of a leaked access key",
    prompt: "The access key for the ci-deployer identity was found in a public code repository. The CI system always connects from 198.51.100.20. Select every audit log entry that indicates the key is being misused by someone else.",
    context: "time (UTC)            identity     source_ip       action              details                         result\n2026-09-20T02:14:05Z  ci-deployer  203.0.113.66    ListBuckets         -                               Success\n2026-09-20T02:14:40Z  ci-deployer  203.0.113.66    CreateUser          userName=support-backup         Success\n2026-09-20T02:15:02Z  ci-deployer  203.0.113.66    AttachUserPolicy    user=support-backup policy=Admin Success\n2026-09-20T02:15:30Z  ci-deployer  203.0.113.66    StopLogging         trail=org-audit                 Success\n2026-09-20T02:16:10Z  ci-deployer  203.0.113.66    RunInstances        type=gpu-large count=20         Success\n2026-09-20T07:55:00Z  alice        198.51.100.20   ConsoleLogin        mfa=true                        Success\n2026-09-20T08:02:11Z  ci-deployer  198.51.100.20   UpdateService       service=web-frontend            Success\n2026-09-20T09:10:44Z  ci-deployer  198.51.100.20   DescribeInstances   -                               Success",
    options: [
      "02:14:05 ci-deployer ListBuckets from 203.0.113.66",
      "02:14:40 ci-deployer CreateUser support-backup from 203.0.113.66",
      "02:15:02 ci-deployer AttachUserPolicy Admin from 203.0.113.66",
      "02:15:30 ci-deployer StopLogging org-audit from 203.0.113.66",
      "02:16:10 ci-deployer RunInstances 20 x gpu-large from 203.0.113.66",
      "07:55:00 alice ConsoleLogin with MFA from 198.51.100.20",
      "08:02:11 ci-deployer UpdateService from 198.51.100.20",
      "09:10:44 ci-deployer DescribeInstances from 198.51.100.20"
    ],
    answers: [0, 1, 2, 3, 4],
    explain: "Every call from 203.0.113.66 uses the CI identity from an address the CI system never uses, at 2 a.m. The sequence is typical of a stolen key: reconnaissance (ListBuckets), persistence (a new user with admin rights), defense evasion (stopping the audit trail) and abuse (launching GPU instances, often for cryptomining). The entries from 198.51.100.20 match normal CI and staff behavior. Response: disable the key, delete the new user, re-enable logging, terminate the instances and move CI to workload identity federation." },

  { id: "net-control-match", d: 4, type: "match", title: "Choose the right security control",
    prompt: "Match each security requirement to the control that best meets it.",
    pairs: [
      ["Block SQL injection and cross-site scripting in HTTPS requests to the web app", "Web application firewall"],
      ["Allow the database to accept port 5432 only from instances in the app tier, statefully", "Security group"],
      ["Quickly deny a hostile address range at the subnet boundary using ordered, stateless rules", "Network ACL"],
      ["Reach the managed storage service over a private IP so traffic never crosses the internet", "Private endpoint"],
      ["Control rotation of the encryption key and be able to revoke it for compliance", "Customer-managed key in KMS"],
      ["Detect files containing card numbers being copied to an unapproved share", "Data loss prevention"]
    ],
    extra: ["Internet gateway", "Tokenization"],
    explain: "A WAF inspects HTTP content at layer 7, which network firewalls cannot. Security groups are stateful, attach to instances and can reference other security groups. Network ACLs are stateless, ordered and subnet-wide, and can explicitly deny. Private endpoints give a managed service a private address in your network. Customer-managed keys give you control over rotation and revocation. DLP inspects content for sensitive patterns. Tokenization protects stored card numbers but does not detect them being copied." },

  { id: "pipeline-policy-select", d: 5, type: "select", title: "Review a pipeline against policy",
    prompt: "Company policy requires: no long-lived cloud keys stored in pipelines, immutable version tags for production images, and a manual approval before production deployment. Select every line that violates the policy.",
    context: "stages: [build, test, deploy-staging, deploy-prod]\n\nbuild:\n  script:\n    - docker build -t registry.example.com/orders:$CI_COMMIT_SHA .\n    - docker push registry.example.com/orders:$CI_COMMIT_SHA\n\ndeploy-staging:\n  environment: staging\n  auth: oidc-federation            # short-lived token exchanged per job\n  script:\n    - deploy --image registry.example.com/orders:$CI_COMMIT_SHA\n\ndeploy-prod:\n  environment: production\n  variables:\n    CLOUD_ACCESS_KEY_ID: EXAMPLEKEYID0000\n    CLOUD_SECRET_KEY: example-secret-value\n  when: on_success\n  script:\n    - deploy --image registry.example.com/orders:latest",
    options: [
      "docker build -t registry.example.com/orders:$CI_COMMIT_SHA .",
      "auth: oidc-federation (deploy-staging)",
      "CLOUD_ACCESS_KEY_ID / CLOUD_SECRET_KEY variables in deploy-prod",
      "when: on_success (deploy-prod)",
      "deploy --image registry.example.com/orders:latest (deploy-prod)",
      "deploy --image registry.example.com/orders:$CI_COMMIT_SHA (deploy-staging)"
    ],
    answers: [2, 3, 4],
    explain: "The production stage stores a long-lived access key in plain pipeline variables, where it can leak through logs or repository access; use workload identity federation as the staging job already does. when: on_success deploys automatically, which is continuous deployment, but the policy requires a manual approval gate (continuous delivery). Deploying :latest uses a mutable tag, so production may not run the image that was tested; it should deploy the same commit-SHA tag or digest that passed staging." },

  { id: "private-subnet-nat", d: 6, type: "select", title: "Private instances cannot download patches",
    prompt: "Instances in the private subnet cannot reach the internet to download patches. Instances in the public subnet work normally. Select every configuration problem that explains the failure.",
    context: "VPC 10.0.0.0/16\n\nSubnets\n  public-a   10.0.1.0/24   route table: rt-public\n  private-a  10.0.2.0/24   route table: rt-private\n\nNAT gateway nat-01   subnet: private-a   state: available\n\nrt-public\n  10.0.0.0/16   local\n  0.0.0.0/0     igw-01\n\nrt-private\n  10.0.0.0/16   local\n\nSecurity group app-sg (private instances)\n  outbound: all traffic to 0.0.0.0/0\n\nNetwork ACL on private-a\n  inbound 100  TCP 1024-65535 from 0.0.0.0/0  ALLOW\n  outbound 100 all traffic to 0.0.0.0/0       ALLOW",
    options: [
      "The NAT gateway is deployed in the private subnet instead of a public subnet",
      "rt-private has no 0.0.0.0/0 route pointing to a NAT gateway",
      "rt-public sends 0.0.0.0/0 to the internet gateway",
      "The security group allows all outbound traffic",
      "The network ACL allows inbound ephemeral ports 1024-65535",
      "The private instances have no public IP addresses"
    ],
    answers: [0, 1],
    explain: "A NAT gateway must sit in a public subnet whose route table sends 0.0.0.0/0 to the internet gateway, and the private subnet's route table must send 0.0.0.0/0 to the NAT gateway. Both are wrong here. The other items are correct: the public route to the IGW is expected, the security group and NACL permit outbound traffic and its return on ephemeral ports, and private instances are supposed to lack public IPs because they use NAT for outbound access." },

  { id: "deploy-error-match", d: 6, type: "match", title: "Diagnose deployment and API errors",
    prompt: "Match each error seen during a deployment to its most likely cause.",
    pairs: [
      ["LimitExceeded: requested vCPUs exceed the account limit for this region", "Service quota reached"],
      ["InsufficientCapacity: not enough capacity for the requested instance type in this zone", "Provider capacity shortage"],
      ["HTTP 429 Too Many Requests from the provider API during a bulk script", "API rate limiting"],
      ["AccessDenied: explicit deny in an organization policy for region eu-south", "Organization guardrail"],
      ["ExpiredToken: the security token included in the request is expired", "Expired credentials"],
      ["ImagePullBackOff: manifest for orders:2.7.1 not found", "Wrong or missing image tag"]
    ],
    extra: ["Security group blocks port 443", "Template syntax error"],
    explain: "Quota errors are account limits you can often raise by request, while capacity errors mean the provider has no spare hardware of that type in that zone, so try another zone or type. 429 means throttling: retry with exponential backoff. An explicit deny in an organization policy overrides any allow the user has. ExpiredToken points to session credentials that need refreshing. ImagePullBackOff with manifest not found means the tag does not exist in the registry." }
]);
