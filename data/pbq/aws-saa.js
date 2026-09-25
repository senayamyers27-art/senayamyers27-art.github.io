/* Performance-based simulations for AWS Certified Solutions Architect - Associate (SAA-C03). */
CertHub.addPbqs("aws-saa", [
  { id: "detective-services-match", d: 1, type: "match", title: "Match security needs to AWS detection services",
    prompt: "A security team lists six requirements. Match each requirement to the AWS service that meets it most directly.",
    pairs: [
      ["Find out which IAM principal deleted a VPC flow log yesterday", "AWS CloudTrail"],
      ["Keep configuration history of security groups and flag any that allow 0.0.0.0/0 on port 22", "AWS Config"],
      ["Alert when an EC2 instance starts querying domains linked to cryptocurrency mining", "Amazon GuardDuty"],
      ["List EC2 instances and ECR container images that have known CVEs", "Amazon Inspector"],
      ["Discover S3 objects that contain credit card numbers", "Amazon Macie"],
      ["Aggregate findings from all of the above and score accounts against a best-practices standard", "AWS Security Hub"]
    ],
    extra: ["AWS Shield Advanced", "Amazon Cognito"],
    explain: "CloudTrail records API calls, so it answers who did what. Config records resource configuration over time and evaluates rules. GuardDuty analyzes CloudTrail, VPC Flow Logs and DNS logs for threats such as crypto-mining. Inspector scans workloads for software vulnerabilities, Macie finds sensitive data in S3, and Security Hub aggregates findings and runs standards checks. Shield is DDoS protection and Cognito is app user identity, so neither detects these issues." },

  { id: "nacl-rule-evaluation", d: 1, type: "select", title: "Evaluate a network ACL",
    prompt: "The network ACL below is associated with a public web subnet. Assume the instance's security group allows the traffic. Select every flow that the network ACL allows in both directions.",
    context: "Web subnet 10.0.1.0/24 - network ACL acl-0web\n\nINBOUND\nRule  Type   Protocol  Port range   Source            Action\n100   HTTPS  TCP       443          0.0.0.0/0         ALLOW\n110   SSH    TCP       22           203.0.113.0/24    ALLOW\n120   SSH    TCP       22           203.0.113.50/32   DENY\n130   Custom TCP       1024-65535   0.0.0.0/0         ALLOW\n*     All    All       All          0.0.0.0/0         DENY\n\nOUTBOUND\nRule  Type   Protocol  Port range   Destination       Action\n100   Custom TCP       1024-65535   0.0.0.0/0         ALLOW\n110   HTTPS  TCP       443          0.0.0.0/0         ALLOW\n*     All    All       All          0.0.0.0/0         DENY",
    options: [
      "A client at 198.51.100.20 opens HTTPS (TCP 443) to the web server",
      "An administrator at 203.0.113.50 opens SSH (TCP 22) to the web server",
      "An administrator at 192.0.2.10 opens SSH (TCP 22) to the web server",
      "The web server downloads updates over HTTPS from 192.0.2.80",
      "A client at 198.51.100.20 opens HTTP (TCP 80) to the web server",
      "The web server sends mail over SMTP (TCP 25) to 192.0.2.25"
    ],
    answers: [0, 1, 3],
    explain: "Network ACLs are stateless and evaluated in rule-number order, first match wins. HTTPS in matches inbound 100 and the reply to the client's ephemeral port matches outbound 100. SSH from 203.0.113.50 matches rule 110 before the DENY in rule 120 is ever reached, so the deny has no effect; it would need a lower number. Outbound HTTPS matches outbound 110 and its reply returns to an ephemeral port allowed by inbound 130. SSH from 192.0.2.10, HTTP on 80 and SMTP to port 25 match no allow rule and fall to the default deny." },

  { id: "s3-https-policy-fill", d: 1, type: "fill", title: "Complete a bucket policy that enforces HTTPS",
    prompt: "An auditor requires that bucket example-reports reject every request not sent over TLS. Fill in the three blanks in the bucket policy statement.",
    context: "{\n  \"Sid\": \"EnforceTLS\",\n  \"Effect\": \"[1]\",\n  \"Principal\": \"*\",\n  \"Action\": \"s3:*\",\n  \"Resource\": [\n    \"arn:aws:s3:::example-reports\",\n    \"arn:aws:s3:::example-reports/*\"\n  ],\n  \"Condition\": {\n    \"Bool\": { \"[2]\": \"[3]\" }\n  }\n}",
    fields: [
      { label: "[1] Effect", answers: ["Deny"] },
      { label: "[2] Condition key", answers: ["aws:SecureTransport"] },
      { label: "[3] Condition value", answers: ["false", "\"false\""] }
    ],
    explain: "The statement must be a Deny so that it overrides any Allow elsewhere, applied to everyone with Principal \"*\". The global condition key aws:SecureTransport is true when a request arrives over TLS, so matching it with the value false catches plain HTTP requests. Including both the bucket ARN and the /* object ARN covers bucket-level and object-level actions." },

  { id: "kms-envelope-order", d: 1, type: "order", title: "Order the steps of envelope encryption with KMS",
    prompt: "An application encrypts a 2 GB file with AWS KMS using envelope encryption, then later reads it back. Put the steps in the correct order.",
    steps: [
      "The application calls GenerateDataKey, naming the customer managed KMS key",
      "KMS returns a plaintext data key and a copy of the data key encrypted under the KMS key",
      "The application encrypts the file locally with the plaintext data key",
      "The application erases the plaintext data key from memory and stores the encrypted data key with the file",
      "To read the file, the application sends the encrypted data key to the KMS Decrypt API",
      "The application decrypts the file locally with the plaintext data key KMS returned"
    ],
    explain: "KMS encrypts at most 4 KB directly, so large data uses envelope encryption. GenerateDataKey returns both a plaintext and an encrypted copy of a data key; the bulk encryption happens locally, and only the encrypted data key is kept. To decrypt, the application asks KMS to decrypt the small data key, which is subject to the key policy and logged in CloudTrail, then decrypts the file locally." },

  { id: "sqs-dlq-lifecycle-order", d: 2, type: "order", title: "Trace a poison message to the dead-letter queue",
    prompt: "An SQS queue has a redrive policy with maxReceiveCount of 3. A consumer crashes on one malformed order message. Put the events in the order they happen.",
    steps: [
      "The producer calls SendMessage and the order message is stored in the source queue",
      "A consumer receives the message and its visibility timeout starts",
      "The consumer crashes before calling DeleteMessage",
      "The visibility timeout expires and the message becomes visible again",
      "The message is received and fails two more times, reaching the maxReceiveCount of 3",
      "SQS moves the message to the dead-letter queue",
      "After fixing the bug, an engineer starts a DLQ redrive to send the message back to the source queue"
    ],
    explain: "A received message is hidden for the visibility timeout; if it is not deleted in time it reappears and its receive count rises. Once the receive count exceeds the maxReceiveCount in the redrive policy, SQS moves the message to the dead-letter queue instead of delivering it again, so it stops blocking other work. After the root cause is fixed, DLQ redrive returns the messages to the source queue for processing." },

  { id: "route53-policy-match", d: 2, type: "match", title: "Match requirements to Route 53 routing policies",
    prompt: "Match each DNS requirement to the Route 53 routing policy that meets it.",
    pairs: [
      ["Send 10 percent of users to a new version of the site for a canary release", "Weighted"],
      ["Send each user to the Region that gives them the lowest network latency", "Latency"],
      ["Show users in Germany a site with country-specific legal terms", "Geolocation"],
      ["Return a static S3 maintenance page only when the primary ALB fails its health check", "Failover"],
      ["Return up to eight healthy web server IP addresses and let clients pick one", "Multivalue answer"]
    ],
    extra: ["Simple", "IP-based"],
    explain: "Weighted routing splits traffic by relative weights, ideal for canaries. Latency routing picks the Region with the best measured latency, which is not the same as the nearest country. Geolocation answers by the user's continent, country or state, so it suits legal and localized content. Failover returns the secondary record only when the primary's health check fails. Multivalue answer returns up to eight healthy records at random. Simple routing has no health checks, and IP-based routing chooses by the client's source CIDR, not country." },

  { id: "dr-rpo-rto-fill", d: 2, type: "fill", title: "Calculate achieved RPO and RTO",
    prompt: "Read the incident timeline for a backup-and-restore workload and fill in the values.",
    context: "Workload: internal ordering app (backup and restore strategy)\nTargets: RPO 4 hours, RTO 2 hours\nRDS automated snapshots copied to the DR Region at 00:00, 04:00, 08:00, 12:00, 16:00, 20:00\n\n10:30  Primary Region outage begins; last snapshot copied to DR Region was taken at 08:00\n10:45  DR declared; CloudFormation stacks deployed in DR Region\n11:40  Database restored from the 08:00 snapshot\n13:15  Application verified and DNS switched; service restored",
    fields: [
      { label: "Data lost, in minutes of transactions", answers: ["150"] },
      { label: "Downtime, in minutes, from outage start to service restored", answers: ["165"] },
      { label: "Was the RPO target met? (yes/no)", answers: ["yes", "y"] },
      { label: "Was the RTO target met? (yes/no)", answers: ["no", "n"] }
    ],
    explain: "The restore used the 08:00 snapshot, so everything written between 08:00 and the 10:30 outage, 150 minutes, was lost; that is within the 4-hour RPO. Downtime runs from 10:30 to 13:15, 165 minutes, which exceeds the 2-hour RTO. To meet the RTO the team would need a faster strategy such as pilot light or warm standby, with data already replicating and infrastructure ready." },

  { id: "ebs-volume-match", d: 3, type: "match", title: "Match workloads to EBS and instance storage",
    prompt: "Match each workload to the most suitable block storage option.",
    pairs: [
      ["Boot volumes and general application servers needing a 3,000 IOPS baseline at low cost", "gp3"],
      ["Mission-critical SAP HANA database needing the highest sustained IOPS and sub-millisecond latency", "io2 Block Express"],
      ["Big data cluster scanning large log files sequentially", "st1"],
      ["Rarely accessed, throughput-oriented data at the lowest EBS price", "sc1"],
      ["Rebuildable scratch cache needing the fastest local I/O where losing data on stop is acceptable", "Instance store"]
    ],
    extra: ["Amazon EFS", "gp2"],
    explain: "gp3 gives 3,000 IOPS and 125 MB/s baseline regardless of size and is the default choice. io2 Block Express is the highest-performance EBS tier for critical databases. st1 is throughput-optimized HDD for large sequential reads, while sc1 is the cheapest cold HDD; neither can be a boot volume. Instance store is physically attached and very fast but loses data on stop or termination. gp2 ties IOPS to size and costs more than gp3, and EFS is a shared file system, not block storage." },

  { id: "dynamodb-capacity-fill", d: 3, type: "fill", title: "Calculate DynamoDB provisioned capacity",
    prompt: "A table in provisioned capacity mode must support the traffic below. Calculate the capacity units required for each workload.",
    context: "Workload A: 50 strongly consistent reads per second, items of 10 KB\nWorkload B: 100 eventually consistent reads per second, items of 3 KB\nWorkload C: 20 standard writes per second, items of 2.5 KB\nWorkload D: 20 transactional writes per second, items of 2.5 KB\n\n1 RCU = one strongly consistent read/s (or two eventually consistent reads/s) of up to 4 KB\n1 WCU = one write/s of up to 1 KB; transactional requests use twice the units",
    fields: [
      { label: "Workload A read capacity units", answers: ["150"] },
      { label: "Workload B read capacity units", answers: ["50"] },
      { label: "Workload C write capacity units", answers: ["60"] },
      { label: "Workload D write capacity units", answers: ["120"] }
    ],
    explain: "Item sizes round up to the next unit. A 10 KB item needs 3 read units of 4 KB, so 50 strong reads need 150 RCUs. A 3 KB item needs 1 unit, and eventually consistent reads cost half, so 100 reads need 50 RCUs. A 2.5 KB write rounds up to 3 KB, so 20 writes need 60 WCUs, and transactional writes double that to 120." },

  { id: "ec2-purchase-match", d: 4, type: "match", title: "Match workloads to EC2 purchase options",
    prompt: "Match each workload to the most cost-effective purchase option that still meets its requirements.",
    pairs: [
      ["Steady 24/7 fleet that will move from EC2 to Fargate and Lambda next year", "Compute Savings Plan"],
      ["Nightly render jobs that checkpoint to S3 and can restart at any time", "Spot Instances"],
      ["A two-week load test that must not be interrupted, on instance types not yet chosen", "On-Demand Instances"],
      ["Software licensed per physical CPU core that requires socket and core visibility", "Dedicated Hosts"],
      ["A stable m6i fleet in one Region for three years, seeking the deepest Savings Plan discount", "EC2 Instance Savings Plan"]
    ],
    extra: ["Dedicated Instances", "Convertible Reserved Instances"],
    explain: "A Compute Savings Plan is the commitment that also covers Fargate and Lambda, so it survives the move. Interruptible, checkpointed work belongs on Spot. A short, uninterruptible, unplanned test fits On-Demand because a one-year commitment would waste money. Per-core or per-socket licensing needs Dedicated Hosts, since Dedicated Instances do not expose the physical server. An EC2 Instance Savings Plan gives a deeper discount than a Compute Savings Plan when the family and Region are fixed. Convertible RIs discount less and do not cover Fargate or Lambda." },

  { id: "cost-findings-select", d: 4, type: "select", title: "Pick the real savings from a cost review",
    prompt: "A cost review of one account produced the findings below. Select every finding that represents a clear cost-saving action.",
    context: "Resource                      Service      Finding\n1  vol-0a1 (gp2, 500 GiB)      EBS          State: available (unattached) for 94 days\n2  eipalloc-07c                EC2          Elastic IP not associated with any running instance\n3  nat-0b2 (us-east-1a)        VPC          12 TB/month processed; 95% of bytes go to the S3 prefix list\n4  i-0c3 (m5.4xlarge)          EC2          Prod web: avg CPU 4%, max 9%, memory max 11% over 14 days\n5  i-0d4 (c7g.xlarge) x6       EC2          ASG with target tracking at 60% CPU; avg CPU 58%\n6  db-orders (Aurora)          RDS          Busy 24/7; 100% covered by reserved DB instances\n7  example-logs bucket         S3           Lifecycle: Standard-IA at 30 days, Glacier Flexible Retrieval at 90 days",
    options: [
      "1: Unattached gp2 volume",
      "2: Unassociated Elastic IP address",
      "3: NAT gateway carrying mostly S3 traffic",
      "4: m5.4xlarge web server with very low utilization",
      "5: c7g Auto Scaling group near its scaling target",
      "6: Aurora cluster fully covered by reservations",
      "7: Log bucket with lifecycle transitions"
    ],
    answers: [0, 1, 2, 3],
    explain: "An unattached volume is billed while doing nothing; snapshot it if needed and delete it. Public IPv4 addresses, including unassociated Elastic IPs, incur charges, so release unused ones. NAT gateways charge per GB processed, and an S3 gateway endpoint carries that traffic free. The m5.4xlarge is heavily over-provisioned and should be right-sized. The Auto Scaling group is already tracking its target, the busy Aurora cluster is fully reserved, and the bucket already has lifecycle rules, so none of those is waste." }
]);
