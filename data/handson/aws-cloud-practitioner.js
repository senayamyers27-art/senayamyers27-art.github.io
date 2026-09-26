/* Hands-on exercises for AWS Certified Cloud Practitioner (CLF-C02). Checked by tools/check-data.js. */
CertHub.addHandson("aws-cloud-practitioner", {
  items: [
    {
      id: "ccp-whoami", kind: "aws", d: 3,
      title: "Check who and where the CLI is working as",
      prompt: "Before you change anything in an AWS account, confirm which identity your commands run as and which Region they go to.\n\nRun `aws sts get-caller-identity` to see the account ID and the identity ARN, then run `aws configure list` to see the Region and where the credentials come from.",
      hint: "Both commands take no extra options. Look for the Account field in the first and the region row in the second.",
      explain: "The AWS CLI is one of the ways to use AWS alongside the Management Console, the SDKs and infrastructure as code. Every CLI call is signed with credentials and sent to one Region, so checking the caller identity and Region first prevents the classic mistake of changing the wrong account or creating resources in an unexpected Region, where they are easy to forget and still billed.",
      setup: {},
      checks: [
        { label: "You checked the caller identity", type: "ran", includes: "sts get-caller-identity" },
        { label: "You checked the CLI configuration", type: "ran", includes: "configure list" }
      ],
      solution: ["aws sts get-caller-identity", "aws configure list"]
    },
    {
      id: "ccp-first-bucket", kind: "aws", d: 3,
      title: "Create an S3 bucket and upload a file",
      prompt: "A small cafe wants to keep its menu page in Amazon S3.\n\nCreate a bucket named `cafe-menu-site-2026`, then upload the local file `index.html` into it. Run `ls` to see the local files and `aws s3 ls s3://cafe-menu-site-2026` to confirm the upload.",
      hint: "aws s3 mb makes a bucket from an s3:// address; aws s3 cp copies a local file to an s3:// destination.",
      explain: "Amazon S3 is object storage: you store objects (files plus metadata) in buckets. Bucket names are global across all AWS accounts, which is why short names like test are usually taken, but each bucket lives in one Region. S3 is designed for 99.999999999 percent durability by storing data across multiple Availability Zones, and you pay only for the storage and requests you use.",
      setup: {},
      checks: [
        { label: "The bucket cafe-menu-site-2026 exists", type: "bucket", name: "cafe-menu-site-2026" },
        { label: "index.html is stored in the bucket", type: "object", bucket: "cafe-menu-site-2026", key: "index.html" }
      ],
      solution: ["aws s3 mb s3://cafe-menu-site-2026", "aws s3 cp index.html s3://cafe-menu-site-2026/"]
    },
    {
      id: "ccp-launch-instance", kind: "aws", d: 1,
      title: "Launch a server in minutes, not weeks",
      prompt: "Marketing needs a web server for a two-week promotion. Instead of buying hardware, launch one on demand.\n\nLaunch one `t3.micro` instance from image `ami-0abcdef1234567890` with two tags: `Name=promo-web` and `Project=spring-promo`. Then confirm it is running with `aws ec2 describe-instances`.",
      hint: "Use aws ec2 run-instances with --image-id, --instance-type and --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=promo-web},{Key=Project,Value=spring-promo}]'.",
      explain: "This is the agility and elasticity benefit of the cloud: capacity arrives in minutes and you stop paying when you stop or terminate it, trading fixed expense for variable expense and no longer guessing capacity. Tags such as Project can be activated as cost allocation tags so the promotion's cost shows up separately in Cost Explorer.",
      setup: {},
      checks: [
        { label: "A t3.micro named promo-web is running", type: "instance", tagName: "promo-web", state: "running", instanceType: "t3.micro" },
        { label: "The instance carries the tag Project=spring-promo", type: "instance", tagName: "promo-web", tag: { Project: "spring-promo" } }
      ],
      solution: ["aws ec2 run-instances --image-id ami-0abcdef1234567890 --instance-type t3.micro --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=promo-web},{Key=Project,Value=spring-promo}]'", "aws ec2 describe-instances --filters Name=tag:Name,Values=promo-web --query 'Reservations[].Instances[].[InstanceId,State.Name]' --output text"]
    },
    {
      id: "ccp-stop-idle", kind: "aws", d: 4,
      title: "Stop an idle instance to cut the bill",
      prompt: "Cost Explorer shows a development server running all weekend with nobody using it.\n\nFind the instance tagged `Name=dev-sandbox` and stop it. The production instance `prod-web` must keep running.",
      hint: "Filter describe-instances with Name=tag:Name,Values=dev-sandbox to get its instance ID, then pass that ID to aws ec2 stop-instances --instance-ids.",
      explain: "With On-Demand pricing you pay for compute only while an instance runs, so stopping idle development servers is one of the simplest savings. A stopped instance still pays for its EBS storage but not for compute. For steady production load, Savings Plans or Reserved Instances lower the rate, and AWS Trusted Advisor and Compute Optimizer flag idle or oversized instances.",
      setup: { ec2: { instances: [{ id: "i-0a1b2c3d4e5f60011", name: "prod-web", type: "t3.small" }, { id: "i-0a1b2c3d4e5f60022", name: "dev-sandbox", type: "t3.large" }] } },
      checks: [
        { label: "dev-sandbox is stopped", type: "instance", tagName: "dev-sandbox", state: "stopped" },
        { label: "prod-web is still running", type: "instance", tagName: "prod-web", state: "running" }
      ],
      solution: ["aws ec2 describe-instances --filters Name=tag:Name,Values=dev-sandbox --query 'Reservations[].Instances[].InstanceId' --output text", "aws ec2 stop-instances --instance-ids i-0a1b2c3d4e5f60022"]
    },
    {
      id: "ccp-block-public", kind: "aws", d: 2,
      title: "Turn on S3 Block Public Access for an old bucket",
      prompt: "The bucket `team-shared-docs` was created years ago, before S3 blocked public access by default, and it has no Block Public Access settings.\n\nTurn on all four Block Public Access settings for the bucket, then read them back with `get-public-access-block` to confirm.",
      hint: "aws s3api put-public-access-block --bucket team-shared-docs --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true",
      explain: "Under the shared responsibility model AWS secures the S3 service itself, but configuring who can read your data is the customer's job. Block Public Access overrides any ACL or bucket policy that would make objects public, which is why AWS now turns it on for new buckets. Older buckets may still need it switched on, and Trusted Advisor and Security Hub flag public buckets.",
      setup: { s3: { buckets: { "team-shared-docs": { publicAccessBlock: false, objects: { "handbook.pdf": 48213 } } } } },
      checks: [
        { label: "All four Block Public Access settings are on", type: "bucket", name: "team-shared-docs", publicAccessBlocked: true },
        { label: "You read the settings back to confirm", type: "ran", includes: "get-public-access-block" }
      ],
      solution: ["aws s3api put-public-access-block --bucket team-shared-docs --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true", "aws s3api get-public-access-block --bucket team-shared-docs"]
    },
    {
      id: "ccp-iam-group", kind: "aws", d: 2,
      title: "Give an auditor least-privilege access through a group",
      prompt: "An external auditor, Maya, needs to review security settings but must not change anything.\n\nCreate an IAM group `auditors`, attach the AWS managed policy `SecurityAudit` to it, create the user `maya` and add her to the group. Do not attach policies to her user directly.",
      hint: "create-group, then attach-group-policy with --policy-arn arn:aws:iam::aws:policy/SecurityAudit, then create-user and add-user-to-group.",
      explain: "Least privilege means granting only the permissions a job needs. Attaching policies to groups rather than individual users keeps permissions consistent and easy to review: when someone changes roles you move them between groups. SecurityAudit is a read-only AWS managed policy for reviewing configuration. For workforce users at scale, IAM Identity Center with permission sets is the recommended approach.",
      setup: {},
      checks: [
        { label: "The auditors group has SecurityAudit attached", type: "group", name: "auditors", policy: "SecurityAudit" },
        { label: "maya exists and is in the auditors group", type: "user", name: "maya", inGroup: "auditors" }
      ],
      solution: ["aws iam create-group --group-name auditors", "aws iam attach-group-policy --group-name auditors --policy-arn arn:aws:iam::aws:policy/SecurityAudit", "aws iam create-user --user-name maya", "aws iam add-user-to-group --group-name auditors --user-name maya"]
    },
    {
      id: "ccp-cloudtrail", kind: "aws", d: 2,
      title: "Record account activity with CloudTrail",
      prompt: "Your company needs a record of who did what in the account, in every Region.\n\nCreate a multi-Region trail named `org-activity` that delivers to the existing bucket `audit-logs-111122223333`, then start logging and check the trail status.",
      hint: "aws cloudtrail create-trail --name org-activity --s3-bucket-name audit-logs-111122223333 --is-multi-region-trail, then aws cloudtrail start-logging --name org-activity.",
      explain: "AWS CloudTrail records API calls (who, what, when, from where) for auditing, security investigations and compliance. The Event history keeps 90 days of management events for free, but a trail is needed to keep logs longer in S3. A multi-Region trail also captures activity in Regions you do not normally use, which is often where misuse shows up. A new trail does not record until logging starts.",
      setup: { s3: { buckets: { "audit-logs-111122223333": {} } } },
      checks: [
        { label: "The trail org-activity covers all Regions", type: "trail", name: "org-activity", multiRegion: true },
        { label: "The trail is logging", type: "trail", name: "org-activity", logging: true }
      ],
      solution: ["aws cloudtrail create-trail --name org-activity --s3-bucket-name audit-logs-111122223333 --is-multi-region-trail", "aws cloudtrail start-logging --name org-activity", "aws cloudtrail get-trail-status --name org-activity"]
    },
    {
      id: "ccp-billing-alarm", kind: "aws", d: 4,
      title: "Get warned before the bill surprises you",
      prompt: "You are on the Free Tier and want a warning if estimated charges go over 50 US dollars. Billing alerts are already enabled for the account.\n\nCreate a CloudWatch alarm named `billing-over-50` on the metric `EstimatedCharges` in the `AWS/Billing` namespace, with the dimension `Currency=USD`, statistic `Maximum`, period `21600`, threshold `50`, comparison `GreaterThanThreshold` and `1` evaluation period.",
      hint: "aws cloudwatch put-metric-alarm needs --alarm-name, --metric-name, --namespace, --statistic, --period, --threshold, --comparison-operator, --evaluation-periods and --dimensions Name=Currency,Value=USD.",
      explain: "Billing metrics are published only in us-east-1, about every six hours, which is why the period is 21600 seconds. A billing alarm (usually wired to an SNS topic for email) is a simple guard against unexpected charges. AWS Budgets can do the same with forecasts and more options, and Cost Explorer helps you see which service caused a spike.",
      setup: {},
      checks: [
        { label: "The alarm billing-over-50 watches EstimatedCharges", type: "alarm", name: "billing-over-50", metric: "EstimatedCharges", namespace: "AWS/Billing" },
        { label: "The alarm threshold is 50", type: "alarm", name: "billing-over-50", threshold: 50, comparison: "GreaterThanThreshold" }
      ],
      solution: ["aws cloudwatch put-metric-alarm --alarm-name billing-over-50 --metric-name EstimatedCharges --namespace AWS/Billing --statistic Maximum --period 21600 --threshold 50 --comparison-operator GreaterThanThreshold --evaluation-periods 1 --dimensions Name=Currency,Value=USD"]
    }
  ]
});
