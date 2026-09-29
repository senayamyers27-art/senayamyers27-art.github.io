/* Performance-based simulations for AWS Certified Security – Specialty (SCS-C03). */
CertHub.addPbqs("aws-security", [
  { id: "detection-sources-match", d: 1, type: "match", title: "Match detection questions to AWS log sources",
    prompt: "An investigator has six questions. Match each question to the AWS log source or service that answers it most directly.",
    pairs: [
      ["Which principal read objects from the payroll bucket yesterday?", "CloudTrail S3 data events"],
      ["Which domain names did an EC2 instance look up before it was compromised?", "Route 53 Resolver query logs"],
      ["Which source IPs were rejected when trying to reach port 22 in a subnet?", "VPC Flow Logs"],
      ["Is an instance talking to a known command-and-control server right now?", "Amazon GuardDuty"],
      ["Where can logs from AWS and third-party tools be kept in one OCSF data lake we own?", "Amazon Security Lake"],
      ["Who changed a security group rule last week?", "CloudTrail management events"]
    ],
    extra: ["AWS Artifact", "Amazon Macie"],
    explain: "S3 object reads are data events, which trails log only when you turn them on. Resolver query logs record DNS lookups from a VPC. Flow logs record accepted and rejected connections by IP and port. GuardDuty analyzes logs for known malicious activity. Security Lake normalizes AWS and third-party data to OCSF in S3 in your account. Security group changes are control-plane API calls, recorded as management events. Artifact provides AWS compliance reports and Macie finds sensitive data, so neither answers these questions." },

  { id: "cloudtrail-bucket-policy-fill", d: 1, type: "fill", title: "Complete a bucket policy for CloudTrail delivery",
    prompt: "The central log bucket must accept CloudTrail log files only from the organization trail. Fill in the three blanks in the bucket policy statement.",
    context: "{\n  \"Sid\": \"AWSCloudTrailWrite\",\n  \"Effect\": \"Allow\",\n  \"Principal\": { \"Service\": \"[1]\" },\n  \"Action\": \"[2]\",\n  \"Resource\": \"arn:aws:s3:::central-logs/AWSLogs/o-exampleorg/*\",\n  \"Condition\": {\n    \"StringEquals\": {\n      \"s3:x-amz-acl\": \"bucket-owner-full-control\",\n      \"[3]\": \"arn:aws:cloudtrail:us-east-1:111122223333:trail/org-trail\"\n    }\n  }\n}",
    fields: [
      { label: "[1] Service principal", answers: ["cloudtrail.amazonaws.com"] },
      { label: "[2] Action", answers: ["s3:PutObject"] },
      { label: "[3] Condition key that ties the grant to one trail", answers: ["aws:SourceArn"] }
    ],
    explain: "CloudTrail writes as the cloudtrail.amazonaws.com service principal and needs s3:PutObject on the log prefix (plus s3:GetBucketAcl in a separate statement). The aws:SourceArn condition limits the grant to the named trail, which prevents another account's trail from writing into the bucket through the same service principal, a confused deputy risk." },

  { id: "access-key-response-select", d: 2, type: "select", title: "Choose the right first actions for an exposed access key",
    prompt: "GuardDuty reports that the access key of IAM user build-bot is being used from an unfamiliar IP address to list and copy S3 objects. Select every action that belongs in the first phase of the response.",
    options: [
      "Deactivate the build-bot access key",
      "Delete the build-bot user and all of its history right away",
      "Search CloudTrail for every API call made with that access key ID",
      "Look for IAM users, roles, access keys or policies the attacker may have created",
      "Suspend GuardDuty so it stops raising duplicate findings during the response",
      "Rebuild every EC2 instance in every account before scoping the incident"
    ],
    answers: [0, 2, 3],
    explain: "Deactivating the key stops the attacker but keeps it for evidence. CloudTrail searches by access key ID show what was done, and attackers often create new users, keys or roles to keep access, so those must be found and removed. Deleting the user destroys context, suspending GuardDuty blinds the team during the incident, and rebuilding everything before scoping wastes time without knowing what was touched." },

  { id: "ec2-containment-order", d: 2, type: "order", title: "Contain a compromised EC2 instance in the right order",
    prompt: "An EC2 instance in an Auto Scaling group behind a load balancer is running cryptomining malware. Put the containment steps in the order that preserves the most evidence.",
    steps: [
      "Turn on termination protection and tag the instance with the incident ID",
      "Detach the instance from the Auto Scaling group and deregister it from the load balancer",
      "Move the instance to an isolation security group and block its traffic with a network ACL",
      "Capture a memory image from the running instance",
      "Take snapshots of all attached EBS volumes and tag them with the incident ID",
      "Share the snapshots with the forensics account for analysis"
    ],
    explain: "Termination protection and tags stop automation from destroying the evidence. Removing the instance from the Auto Scaling group and load balancer keeps it from being replaced or serving users. Isolation limits the attacker, with a network ACL cutting already tracked connections. Memory is volatile, so it is captured before anything that could reboot or stop the instance, then EBS snapshots preserve the disks, which are analyzed in an isolated forensics account." },

  { id: "edge-controls-match", d: 3, type: "match", title: "Match threats to AWS network and edge controls",
    prompt: "Match each threat or requirement to the AWS control that addresses it most directly.",
    pairs: [
      ["SQL injection attempts against an API behind API Gateway", "AWS WAF managed rule group"],
      ["A large layer 3 and 4 DDoS attack with a need for expert help and cost protection", "AWS Shield Advanced"],
      ["Instances resolving domains used for DNS tunneling", "Route 53 Resolver DNS Firewall"],
      ["Egress from many VPCs allowed only to approved domains, with IPS signatures", "AWS Network Firewall"],
      ["Blocking one attacking CIDR range for an entire subnet", "Network ACL deny rule"],
      ["Keeping an S3 origin reachable only through CloudFront", "Origin access control"]
    ],
    extra: ["Amazon Macie", "AWS Artifact"],
    explain: "AWS WAF inspects HTTP requests and its managed rule groups catch SQL injection. Shield Advanced adds the Shield Response Team and DDoS cost protection. DNS Firewall blocks lookups of listed domains at the Route 53 Resolver. Network Firewall provides stateful domain filtering and Suricata-compatible IPS rules. Network ACLs are the only VPC filter with explicit deny rules at the subnet level. Origin access control lets CloudFront sign requests to a private S3 bucket. Macie and Artifact are not network controls." },

  { id: "security-group-review-select", d: 3, type: "select", title: "Find the risky security group rules",
    prompt: "Company standard: administrative ports (22, 3389) may only be reached from the corporate range 203.0.113.0/24, and databases may only be reached from the app tier security group. Select every inbound rule that breaks the standard.",
    context: "Security group sg-0prod (attached to web, app and database instances for review)\n\nRule  Protocol  Port   Source              Description\n1     TCP       443    0.0.0.0/0           Public HTTPS\n2     TCP       22     0.0.0.0/0           Temporary SSH for vendor\n3     TCP       3389   203.0.113.0/24      RDP from corporate range\n4     TCP       3306   0.0.0.0/0           MySQL for reporting tool\n5     TCP       3306   sg-0app             MySQL from app tier\n6     All       All    ::/0                Test IPv6 access",
    options: [
      "Rule 1: HTTPS from 0.0.0.0/0",
      "Rule 2: SSH from 0.0.0.0/0",
      "Rule 3: RDP from 203.0.113.0/24",
      "Rule 4: MySQL from 0.0.0.0/0",
      "Rule 5: MySQL from sg-0app",
      "Rule 6: all traffic from ::/0"
    ],
    answers: [1, 3, 5],
    explain: "SSH open to every IPv4 address breaks the admin-port rule, however temporary. MySQL open to the internet breaks the database rule, and all IPv6 traffic from ::/0 opens every port to the IPv6 internet, which is easy to overlook. Public HTTPS is expected for a web tier, RDP from the corporate range follows the standard, and MySQL from the app tier security group is exactly the allowed pattern." },

  { id: "policy-evaluation-select", d: 4, type: "select", title: "Evaluate IAM policies, a boundary, an SCP and a bucket policy",
    prompt: "Read the policies below for account 111122223333. Select every request that is allowed.",
    context: "SCP on the account's OU: FullAWSAccess, plus\n  Deny  s3:DeleteBucket  on *\n\nRole AppRole - identity policy\n  Allow s3:GetObject, s3:PutObject  on arn:aws:s3:::app-data/*\n  Allow s3:DeleteBucket             on *\n  Allow dynamodb:GetItem            on table/orders\n\nRole AppRole - permissions boundary\n  Allow s3:*  on *\n\nBucket app-data - bucket policy\n  Deny  s3:PutObject for all principals when aws:SecureTransport is false\n  Allow s3:GetObject on app-data/* for principal arn:aws:iam::444455556666:root",
    options: [
      "AppRole reads an object from app-data over HTTPS",
      "AppRole writes an object to app-data over plain HTTP",
      "AppRole deletes an old, empty bucket in the same account",
      "AppRole reads an item from the orders DynamoDB table",
      "AppRole writes an object to app-data over HTTPS",
      "A role in account 444455556666 whose identity policy allows s3:GetObject on app-data/* reads an object",
      "A role in account 777788889999 whose identity policy allows s3:GetObject on app-data/* reads an object"
    ],
    answers: [0, 4, 5],
    explain: "Reads and HTTPS writes are allowed by the identity policy and inside the boundary. The plain HTTP write hits the bucket policy's explicit deny. DeleteBucket is explicitly denied by the SCP. The DynamoDB read is allowed by the identity policy but outside the permissions boundary, which only allows S3, so it is implicitly denied. Account 444455556666 is allowed on both sides for cross-account access, while 777788889999 has no allow in the bucket policy." },

  { id: "trust-policy-fill", d: 4, type: "fill", title: "Complete a trust policy for a third-party vendor",
    prompt: "A monitoring vendor in account 999988887777 must assume the VendorAudit role, and only when it presents the external ID agreed with your company. Fill in the blanks.",
    context: "{\n  \"Effect\": \"Allow\",\n  \"Principal\": { \"AWS\": \"arn:aws:iam::[1]:root\" },\n  \"Action\": \"[2]\",\n  \"Condition\": {\n    \"StringEquals\": { \"[3]\": \"c7f2-acme-5521\" }\n  }\n}",
    fields: [
      { label: "[1] Vendor account ID", answers: ["999988887777"] },
      { label: "[2] Action", answers: ["sts:AssumeRole"] },
      { label: "[3] Condition key", answers: ["sts:ExternalId"] }
    ],
    explain: "The trust policy names the vendor's account as the principal and allows sts:AssumeRole. The sts:ExternalId condition requires the unique value agreed with your company, so the vendor cannot be tricked into assuming your role on behalf of a different customer: the confused deputy problem. The role's permissions policy then limits what the vendor can do." },

  { id: "data-protection-match", d: 5, type: "match", title: "Match data protection requirements to S3 and KMS features",
    prompt: "Match each requirement to the feature that meets it.",
    pairs: [
      ["Encryption with no key management at all, applied by default", "SSE-S3"],
      ["Key usage logged in CloudTrail and controlled by a key policy you write", "SSE-KMS with a customer managed key"],
      ["Two independent layers of encryption for regulated data", "DSSE-KMS"],
      ["The client supplies the key on every request and AWS never stores it", "SSE-C"],
      ["Cut KMS request volume for a bucket with millions of uploads", "S3 Bucket Keys"],
      ["No one, including root, can delete records for seven years", "Object Lock compliance mode"]
    ],
    extra: ["Object Lock governance mode", "MFA Delete"],
    explain: "SSE-S3 is the default and needs no key management. SSE-KMS with a customer managed key adds your own key policy and CloudTrail logging of key use. DSSE-KMS applies two layers of encryption. SSE-C uses a key sent with each request that AWS does not keep. Bucket Keys reduce calls to KMS for SSE-KMS. Compliance mode cannot be bypassed by anyone, unlike governance mode, and MFA Delete only adds an MFA step." },

  { id: "ebs-encrypt-order", d: 5, type: "order", title: "Encrypt an existing unencrypted EBS volume",
    prompt: "A production instance has an unencrypted data volume. Put the steps to replace it with an encrypted volume in order.",
    steps: [
      "Create a snapshot of the unencrypted volume",
      "Copy the snapshot with encryption turned on, choosing the customer managed KMS key",
      "Create a new volume from the encrypted snapshot in the instance's Availability Zone",
      "Stop the application and detach the old volume from the instance",
      "Attach the new encrypted volume using the same device name and restart the application",
      "Delete the old unencrypted volume and snapshot after verifying the data"
    ],
    explain: "Existing EBS volumes cannot be encrypted in place. The supported path is to snapshot, copy the snapshot with encryption, create a volume from the encrypted copy in the same Availability Zone as the instance, and swap it in. Old unencrypted copies are removed only after the data is verified. Turning on encryption by default helps only for volumes created afterwards." },

  { id: "governance-policy-match", d: 6, type: "match", title: "Match governance needs to organization features",
    prompt: "Match each governance requirement to the AWS feature that enforces or delivers it.",
    pairs: [
      ["Stop anyone in member accounts from leaving the organization or turning off CloudTrail", "Service control policy"],
      ["Stop principals outside the organization from reaching S3 buckets, even if a bucket policy allows them", "Resource control policy"],
      ["Make IMDSv2 the enforced default and block public AMI sharing for all accounts", "Declarative policy"],
      ["Standardize the values used for the CostCenter tag key", "Tag policy"],
      ["Deploy a bundle of Config rules mapped to a framework to every account", "Conformance pack"],
      ["Download AWS's own SOC 2 report for an auditor", "AWS Artifact"]
    ],
    extra: ["Permissions boundary", "AWS Budgets"],
    explain: "SCPs set the maximum permissions for principals in member accounts. RCPs set the maximum permissions on resources, whoever the caller is. Declarative policies enforce service settings such as IMDS defaults and AMI sharing. Tag policies standardize tag keys and values. Conformance packs deploy grouped Config rules across accounts. Artifact provides AWS compliance reports. Permissions boundaries apply to single identities and Budgets tracks spending." }
]);
