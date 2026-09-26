/* Hands-on exercises for AWS Certified Solutions Architect – Associate (SAA-C03). Checked by tools/check-data.js. */
CertHub.addHandson("aws-saa", {
  items: [
    {
      id: "saa-backup-bucket", kind: "aws", d: 2,
      title: "Protect a backup bucket from deletion and exposure",
      prompt: "Nightly database exports land in the bucket `orders-backup-111122223333`. Today an overwrite or delete would destroy the only copy, and the bucket has no Block Public Access settings.\n\nEnable versioning on the bucket and turn on all four Block Public Access settings.",
      hint: "put-bucket-versioning takes --versioning-configuration Status=Enabled; put-public-access-block takes BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true.",
      explain: "Versioning keeps every version of an object, so an overwrite or delete becomes recoverable: a delete only adds a delete marker. It is also a prerequisite for S3 replication (including Cross-Region Replication for disaster recovery) and Object Lock. Pair it with lifecycle rules to expire old versions so storage costs do not grow forever, and with Block Public Access so backups can never be exposed by a bad policy.",
      setup: { s3: { buckets: { "orders-backup-111122223333": { publicAccessBlock: false, objects: { "exports/2026-09-24.sql.gz": 7340032 } } } } },
      checks: [
        { label: "Versioning is enabled", type: "bucket", name: "orders-backup-111122223333", versioning: "Enabled" },
        { label: "All four Block Public Access settings are on", type: "bucket", name: "orders-backup-111122223333", publicAccessBlocked: true }
      ],
      solution: ["aws s3api put-bucket-versioning --bucket orders-backup-111122223333 --versioning-configuration Status=Enabled", "aws s3api put-public-access-block --bucket orders-backup-111122223333 --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"]
    },
    {
      id: "saa-ssh-restrict", kind: "aws", d: 1,
      title: "Close SSH to the internet on a security group",
      prompt: "The security group `bastion-sg` (sg-0b1c2d3e4f5a60001) allows SSH on port 22 from `0.0.0.0/0`. Only the office network `203.0.113.0/24` should reach it.\n\nRemove the open SSH rule and add one that allows TCP 22 from `203.0.113.0/24` only. Check the result with `describe-security-groups`.",
      hint: "revoke-security-group-ingress and authorize-security-group-ingress both take --group-id, --protocol tcp, --port 22 and --cidr.",
      explain: "Security groups are stateful allow-lists attached to network interfaces: return traffic is allowed automatically and there are no deny rules, so the only way to close access is to remove the allow rule. SSH open to 0.0.0.0/0 is one of the most common findings in Trusted Advisor and Security Hub. An even better design removes inbound SSH entirely and uses Systems Manager Session Manager.",
      setup: { ec2: { securityGroups: { "bastion-sg": { id: "sg-0b1c2d3e4f5a60001", description: "Bastion host access", ingress: [{ port: 22, cidr: "0.0.0.0/0" }] } } } },
      checks: [
        { label: "SSH from 0.0.0.0/0 is gone", type: "sgRule", group: "bastion-sg", port: 22, cidr: "0.0.0.0/0", present: false },
        { label: "SSH is allowed from 203.0.113.0/24", type: "sgRule", group: "bastion-sg", port: 22, cidr: "203.0.113.0/24" }
      ],
      solution: ["aws ec2 revoke-security-group-ingress --group-id sg-0b1c2d3e4f5a60001 --protocol tcp --port 22 --cidr 0.0.0.0/0", "aws ec2 authorize-security-group-ingress --group-id sg-0b1c2d3e4f5a60001 --protocol tcp --port 22 --cidr 203.0.113.0/24", "aws ec2 describe-security-groups --group-ids sg-0b1c2d3e4f5a60001"]
    },
    {
      id: "saa-compute-launch", kind: "aws", d: 3,
      title: "Launch a compute-optimized worker in a private subnet",
      prompt: "A CPU-heavy batch job needs its own worker. It must run in the private subnet `subnet-0aa11bb22cc33dd44` of the application VPC and use the security group `app-sg` (sg-0a1a2a3a4a5a6a7a8).\n\nLaunch one `c6i.large` instance from `ami-0abcdef1234567890` in that subnet with that security group, tagged `Name=batch-worker-1`. Use `describe-subnets` and `describe-security-groups` if you want to check the IDs first.",
      hint: "aws ec2 run-instances with --image-id, --instance-type c6i.large, --subnet-id, --security-group-ids and --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=batch-worker-1}]'.",
      explain: "Choosing the instance family is a performance decision: C instances are compute optimized, M general purpose, R memory optimized. Placing workers in a private subnet keeps them unreachable from the internet (they reach out through a NAT gateway or VPC endpoints). A security group must belong to the same VPC as the subnet, which is why the default group of another VPC would be rejected.",
      setup: { ec2: { vpcs: [{ id: "vpc-0f00dbeef00000001", cidr: "10.20.0.0/16", name: "app-vpc" }], subnets: [{ id: "subnet-0aa11bb22cc33dd44", vpc: "vpc-0f00dbeef00000001", cidr: "10.20.1.0/24", az: "us-east-1a", name: "app-private-a" }], securityGroups: { "app-sg": { id: "sg-0a1a2a3a4a5a6a7a8", vpc: "vpc-0f00dbeef00000001", description: "App tier", ingress: [{ port: 8080, cidr: "10.20.0.0/16" }] } } } },
      checks: [
        { label: "batch-worker-1 is a running c6i.large", type: "instance", tagName: "batch-worker-1", state: "running", instanceType: "c6i.large" },
        { label: "It runs in the private subnet", type: "instance", tagName: "batch-worker-1", subnet: "subnet-0aa11bb22cc33dd44" },
        { label: "It uses app-sg", type: "instance", tagName: "batch-worker-1", sg: "sg-0a1a2a3a4a5a6a7a8" }
      ],
      solution: ["aws ec2 run-instances --image-id ami-0abcdef1234567890 --instance-type c6i.large --subnet-id subnet-0aa11bb22cc33dd44 --security-group-ids sg-0a1a2a3a4a5a6a7a8 --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=batch-worker-1}]'"]
    },
    {
      id: "saa-cost-cleanup", kind: "aws", d: 4,
      title: "Clean up forgotten resources",
      prompt: "A cost review found two leftovers: an `m5.2xlarge` instance tagged `Name=old-load-test` still running a month after the test, and the log group `/app/debug` that keeps every log line forever.\n\nTerminate the load-test instance and set the log group to keep logs for 30 days. The instance `api-prod` must keep running.",
      hint: "Find the load-test instance ID with a tag filter, then aws ec2 terminate-instances. For logs, aws logs put-retention-policy --retention-in-days 30.",
      explain: "Idle compute and unlimited log retention are two of the most common sources of waste. Terminating an instance stops compute charges and deletes its root volume by default, so only do it when nothing on it is needed (snapshot first if unsure). CloudWatch Logs charges for stored data, and new log groups never expire unless you set a retention period.",
      setup: { ec2: { instances: [{ id: "i-0c0ffee0000000a01", name: "api-prod", type: "m5.large" }, { id: "i-0c0ffee0000000b02", name: "old-load-test", type: "m5.2xlarge" }] }, logs: { "/app/debug": { bytes: 96636764160 } } },
      checks: [
        { label: "old-load-test is terminated", type: "instance", tagName: "old-load-test", state: "terminated" },
        { label: "/app/debug keeps logs for 30 days", type: "logGroup", name: "/app/debug", retention: 30 },
        { label: "api-prod is still running", type: "instance", tagName: "api-prod", state: "running" }
      ],
      solution: ["aws ec2 describe-instances --filters Name=tag:Name,Values=old-load-test --query 'Reservations[].Instances[].InstanceId' --output text", "aws ec2 terminate-instances --instance-ids i-0c0ffee0000000b02", "aws logs put-retention-policy --log-group-name /app/debug --retention-in-days 30"]
    },
    {
      id: "saa-rds-multiaz", kind: "aws", d: 2,
      title: "Make a database survive an Availability Zone failure",
      prompt: "The production database `orders-db` runs in a single Availability Zone with only one day of automated backups.\n\nConvert it to Multi-AZ and raise the backup retention to 7 days, applying the change now rather than in the next maintenance window. Check the result with `describe-db-instances`.",
      hint: "aws rds modify-db-instance --db-instance-identifier orders-db --multi-az --backup-retention-period 7 --apply-immediately",
      explain: "RDS Multi-AZ keeps a synchronous standby in another Availability Zone and fails over automatically, typically in one to two minutes, which protects availability. It is not a read-scaling feature; read replicas are. Automated backups with a longer retention period protect against data loss through point-in-time restore. Without --apply-immediately, changes such as Multi-AZ wait for the next maintenance window.",
      setup: { rds: { "orders-db": { engine: "mysql", class: "db.m6g.large", multiAZ: false, backupRetention: 1, encrypted: true } } },
      checks: [
        { label: "orders-db is Multi-AZ", type: "rds", id: "orders-db", multiAZ: true },
        { label: "Backups are kept for at least 7 days", type: "rds", id: "orders-db", backupRetention: 7 }
      ],
      solution: ["aws rds modify-db-instance --db-instance-identifier orders-db --multi-az --backup-retention-period 7 --apply-immediately", "aws rds describe-db-instances --db-instance-identifier orders-db"]
    },
    {
      id: "saa-cpu-alarm", kind: "aws", d: 3,
      title: "Alarm on sustained high CPU",
      prompt: "The web server `i-0d15ea5e00000c001` slows down when CPU stays high. You want to know before users notice.\n\nCreate a CloudWatch alarm named `web-cpu-high` on `CPUUtilization` (namespace `AWS/EC2`) for that instance, using the `Average` statistic over `300`-second periods, alarming when it is `GreaterThanThreshold` `70` for `2` evaluation periods.",
      hint: "Pass --dimensions Name=InstanceId,Value=i-0d15ea5e00000c001 so the alarm watches this one instance.",
      explain: "Requiring two consecutive five-minute periods avoids alarms on short spikes. CloudWatch collects basic EC2 metrics every five minutes for free; detailed monitoring gives one-minute data. For a fleet, the better answer is usually an Auto Scaling group with a target tracking policy on average CPU, which creates and manages the alarms for you and adds capacity automatically.",
      setup: { ec2: { instances: [{ id: "i-0d15ea5e00000c001", name: "web-1", type: "t3.medium" }] } },
      checks: [
        { label: "web-cpu-high watches CPUUtilization for the web server", type: "alarm", name: "web-cpu-high", metric: "CPUUtilization", namespace: "AWS/EC2", dimension: "i-0d15ea5e00000c001" },
        { label: "It fires above 70 percent", type: "alarm", name: "web-cpu-high", threshold: 70, comparison: "GreaterThanThreshold" }
      ],
      solution: ["aws cloudwatch put-metric-alarm --alarm-name web-cpu-high --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 70 --comparison-operator GreaterThanThreshold --evaluation-periods 2 --dimensions Name=InstanceId,Value=i-0d15ea5e00000c001"]
    },
    {
      id: "saa-ec2-role", kind: "aws", d: 1,
      title: "Give EC2 read access to S3 with a role, not keys",
      prompt: "A reporting app on EC2 reads files from S3. A developer suggested pasting an access key into its config file. Use a role instead.\n\nCreate an IAM role named `report-reader-role` that EC2 can assume (trust principal `ec2.amazonaws.com`), then attach the AWS managed policy `AmazonS3ReadOnlyAccess`. The local file `ec2-trust.json` already holds a suitable trust policy (`cat ec2-trust.json`).",
      hint: "aws iam create-role --role-name report-reader-role --assume-role-policy-document file://ec2-trust.json, then aws iam attach-role-policy with --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess.",
      explain: "A role has a trust policy (who may assume it) and permission policies (what it may do). EC2 gets the role through an instance profile, and the SDK picks up short-lived credentials from the instance metadata service automatically, so there are no long-term keys to leak or rotate. For tighter least privilege, replace the managed policy with one limited to the specific bucket.",
      setup: { files: { "ec2-trust.json": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    { \"Effect\": \"Allow\", \"Principal\": { \"Service\": \"ec2.amazonaws.com\" }, \"Action\": \"sts:AssumeRole\" }\n  ]\n}\n" } },
      checks: [
        { label: "report-reader-role trusts the EC2 service", type: "role", name: "report-reader-role", trust: "ec2.amazonaws.com" },
        { label: "The role has AmazonS3ReadOnlyAccess", type: "role", name: "report-reader-role", policy: "AmazonS3ReadOnlyAccess" }
      ],
      solution: ["aws iam create-role --role-name report-reader-role --assume-role-policy-document file://ec2-trust.json", "aws iam attach-role-policy --role-name report-reader-role --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"]
    },
    {
      id: "saa-sse-kms", kind: "aws", d: 1,
      title: "Encrypt a bucket with a customer managed KMS key",
      prompt: "Compliance requires that finance data be encrypted with a key you control, with yearly rotation, and that you can audit every use of the key.\n\n1. Create a KMS key and give it the alias `alias/finance-data`.\n2. Enable automatic rotation on the key.\n3. Set default encryption on the bucket `finance-reports-111122223333` to SSE-KMS with that alias and S3 Bucket Keys enabled.",
      hint: "create-key prints the KeyId to use with create-alias --target-key-id and enable-key-rotation --key-id. For the bucket: --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"aws:kms\",\"KMSMasterKeyID\":\"alias/finance-data\"},\"BucketKeyEnabled\":true}]}'",
      explain: "S3 encrypts new objects with SSE-S3 by default, but SSE-KMS with a customer managed key lets you control the key policy, turn on rotation, disable the key and see every use in CloudTrail. S3 Bucket Keys cut the number of KMS requests, and so the KMS cost, by using a bucket-level data key. Aliases make keys easy to reference without copying key IDs around.",
      setup: { s3: { buckets: { "finance-reports-111122223333": { objects: { "2026/q2.xlsx": 183402 } } } } },
      checks: [
        { label: "alias/finance-data points to a key with rotation on", type: "keyAlias", alias: "alias/finance-data", rotation: true },
        { label: "The bucket uses SSE-KMS with that key", type: "bucket", name: "finance-reports-111122223333", sse: "aws:kms", kmsKey: "finance-data" }
      ],
      solution: ["aws kms create-key --description \"Finance data key\"", "aws kms create-alias --alias-name alias/finance-data --target-key-id 0f1e2d3c-4b5a-4c6d-8e7f-000000000001", "aws kms enable-key-rotation --key-id 0f1e2d3c-4b5a-4c6d-8e7f-000000000001", "aws s3api put-bucket-encryption --bucket finance-reports-111122223333 --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"aws:kms\",\"KMSMasterKeyID\":\"alias/finance-data\"},\"BucketKeyEnabled\":true}]}'"]
    }
  ]
});
