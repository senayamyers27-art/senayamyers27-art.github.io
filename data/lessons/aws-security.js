/* Lessons for AWS Certified Security – Specialty (SCS-C03): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-security", [
 {
  t: "Security monitoring strategy: deciding what to monitor per workload, CloudWatch metrics and alarms, and Route 53 health checks",
  body: [
   "Detection starts with a plan, not a tool. For each workload you ask: what could go wrong, what would it look like in logs or metrics, and who needs to know? A public web application cares about spikes in 4xx and 5xx errors, failed logins and unusual traffic sources. A data platform cares about who reads which buckets and whether encryption settings change. Writing these answers down turns into a monitoring requirement list: which log sources to turn on, which metrics to watch and which alerts to send where.",
   "Amazon CloudWatch is the core metrics and alarm service. AWS services publish metrics automatically, such as `CPUUtilization` for EC2 or `HTTPCode_ELB_5XX_Count` for a load balancer, and you can publish custom metrics from applications. A CloudWatch alarm watches one metric (or a math expression over several) against a threshold for a number of periods and changes state to ALARM, which can notify an Amazon SNS topic, trigger Auto Scaling or run an EC2 action. Composite alarms combine several alarms to cut noise, so an on-call engineer is paged only when, for example, errors and latency are both high.",
   "Health checks tell you whether something is reachable and working from the outside. Route 53 health checks probe an endpoint over HTTP, HTTPS or TCP from locations around the world and can also watch a CloudWatch alarm. They drive DNS failover, and Shield Advanced can use them for health-based DDoS detection, which makes attack detection faster and more accurate. Load balancer health checks do a similar job inside a Region, taking unhealthy targets out of service.",
   "For the exam, match the requirement to the right layer. Resource health and performance: CloudWatch metrics and alarms. Reachability from the internet: Route 53 health checks. API activity: CloudTrail. Threats: GuardDuty. Aggregated findings: Security Hub. A good monitoring strategy uses several of these together and routes each signal to someone who can act on it, instead of collecting data nobody reads."
  ],
  terms: [
   ["CloudWatch alarm", "A rule that watches a metric against a threshold over time and changes state to ALARM, which can trigger notifications or actions."],
   ["Composite alarm", "An alarm whose state depends on a logical combination of other alarms, used to reduce noisy alerts."],
   ["Route 53 health check", "A probe from AWS locations that tests whether an endpoint responds, or follows a CloudWatch alarm, and can drive DNS failover."],
   ["Monitoring requirement", "A written statement of what must be observed for a workload, where the data comes from and who is alerted."]
  ],
  example: "A payments API team lists its risks: credential stuffing, a failing database and accidental policy changes. They add a CloudWatch alarm on the WAF blocked-request metric, a Route 53 health check on the public endpoint that Shield Advanced also uses, and an EventBridge rule for IAM policy changes, each sending to the team's SNS topic.",
  tip: "When a question asks how to detect that an application is down or slow, think CloudWatch alarms and health checks; when it asks who did something, think CloudTrail. Do not pick a threat detection service for a pure availability problem.",
  check: [
   ["What does a Route 53 health check add that a CloudWatch CPU alarm does not?", "It tests whether the endpoint actually answers from outside, so it catches failures such as a broken listener or network path even when CPU looks normal."],
   ["Why use a composite alarm?", "To alert only when several conditions are true together, which reduces false alarms and alert fatigue."]
  ]
 },
 {
  t: "AWS CloudTrail: management vs data events, organization trails, CloudTrail Lake and log file integrity validation",
  body: [
   "AWS CloudTrail records API activity in your account: who made a call, from which IP address, with which credentials, when, and whether it succeeded. Almost every console click, CLI command and SDK call becomes a CloudTrail event. That makes CloudTrail the first place you look in an investigation and the backbone of most audit requirements.",
   "Events come in types. Management events are control-plane operations, such as `CreateUser`, `PutBucketPolicy` or `RunInstances`. Data events are high-volume, resource-level operations, such as S3 `GetObject` and `DeleteObject`, Lambda `Invoke` or DynamoDB item actions; they are off by default and cost extra, so you enable them selectively with advanced event selectors. Insights events flag unusual rates of API calls or errors compared with a baseline. Event history in the console shows 90 days of management events per Region at no cost, but for anything longer you need a trail or CloudTrail Lake.",
   "A trail delivers log files to an S3 bucket, optionally to CloudWatch Logs, and can encrypt them with SSE-KMS. An organization trail is created in the management account or a delegated administrator account and logs every member account, including new ones; member accounts can see it but cannot change or delete it. Turning on log file integrity validation makes CloudTrail deliver a digest file each hour containing hashes of the log files, signed by CloudTrail, and `aws cloudtrail validate-logs` proves whether any file was modified, deleted or forged.",
   "CloudTrail Lake is a managed data lake for events. You create an event data store, choose which events it keeps and for how long, and query it with SQL, across accounts and Regions of an organization. It suits investigations and audits where you want to query months of activity without building an Athena pipeline yourself. For the exam, remember: object-level S3 activity needs data events; tamper evidence needs integrity validation; one trail nobody in member accounts can disable is an organization trail."
  ],
  terms: [
   ["Management event", "A control-plane API call, such as creating a user or changing a bucket policy, logged by trails by default."],
   ["Data event", "A high-volume resource operation, such as reading an S3 object or invoking a Lambda function, logged only when enabled."],
   ["Organization trail", "A trail created from the management or delegated administrator account that logs all member accounts and cannot be changed by them."],
   ["Digest file", "An hourly signed file with hashes of delivered log files, used to validate log integrity."]
  ],
  example: "After a bucket of customer exports is emptied, the team finds nothing in Event history because object deletions are data events. They turn on S3 data events for sensitive buckets in the organization trail, and next time a CloudTrail Lake query shows the exact role, IP and time of each DeleteObject call.",
  tip: "Watch for the word 'object' in a question: reads, writes and deletes of S3 objects are data events. Also remember that encryption of log files protects confidentiality, while integrity validation proves they were not changed.",
  check: [
   ["How long does Event history keep events, and which types?", "90 days of management events per Region, for free."],
   ["Can a member account administrator delete an organization trail?", "No. Member accounts can view it, but only the management or delegated administrator account can change or delete it."]
  ]
 },
 {
  t: "Amazon GuardDuty: foundational data sources, protection plans, finding types and a delegated administrator for the organization",
  body: [
   "Amazon GuardDuty is a managed threat detection service. It continuously analyzes activity in your accounts with threat intelligence, anomaly detection and machine learning, and produces findings when something looks malicious, such as an instance talking to a known command-and-control server, credentials used from an unusual location, or cryptocurrency mining.",
   "GuardDuty's foundational data sources are CloudTrail management events, VPC Flow Logs and Route 53 Resolver DNS query logs. It reads them from its own independent streams, so you do not need to turn those logs on or store them for GuardDuty to work, and doing so does not change its findings. Optional protection plans extend coverage: S3 Protection (CloudTrail data events for S3), EKS Protection (Kubernetes audit logs), Runtime Monitoring (an agent that sees processes and file activity on EC2, EKS and ECS), Malware Protection for EC2 volumes and for new S3 objects, RDS Protection (login activity) and Lambda Protection (network activity from functions). GuardDuty can also correlate several signals into attack sequence findings that describe a multi-stage attack.",
   "Finding types follow a pattern: `ThreatPurpose:ResourceType/ThreatFamily.Mechanism!Artifact`, for example `UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration.OutsideAWS` or `CryptoCurrency:EC2/BitcoinTool.B!DNS`. Each finding has a severity (low, medium, high or critical), the affected resource and details such as the remote IP. Findings go to the console, to EventBridge for automation and to Security Hub. You can add trusted IP lists and threat lists, and create suppression rules for known benign findings.",
   "In an organization, the management account designates a delegated administrator, usually a security tooling account. That account can enable GuardDuty and chosen protection plans for all existing members and auto-enable it for new accounts, and it sees every member's findings. GuardDuty is Regional, so you enable it in every Region you use, including ones you do not expect to use, because attackers like quiet Regions."
  ],
  terms: [
   ["Foundational data sources", "CloudTrail management events, VPC Flow Logs and DNS logs that GuardDuty analyzes from its own streams."],
   ["Protection plan", "An optional GuardDuty feature that adds a data source or scanning capability, such as S3 Protection or Runtime Monitoring."],
   ["Suppression rule", "A filter that automatically archives findings matching criteria, used for known benign activity."],
   ["Delegated administrator", "A member account given permission by the management account to manage a service for the whole organization."]
  ],
  example: "A security team designates its tooling account as GuardDuty delegated administrator and turns on auto-enable with S3 Protection and Runtime Monitoring. Two weeks later a finding shows a developer's test instance querying a mining pool domain; an EventBridge rule opens a ticket automatically.",
  tip: "If an answer says you must enable VPC Flow Logs or DNS logging before GuardDuty can use them, it is wrong. Also remember that GuardDuty detects and reports; it does not block traffic by itself.",
  check: [
   ["Which GuardDuty feature would detect suspicious reads of S3 objects?", "S3 Protection, which analyzes CloudTrail data events for S3."],
   ["How do you make sure accounts created next month have GuardDuty?", "Use a delegated administrator with auto-enable for new organization members, in every Region."]
  ]
 },
 {
  t: "AWS Security Hub: aggregating findings, security standards checks and cross-Region aggregation",
  body: [
   "AWS Security Hub gives you one place to see and manage security findings. It collects findings from AWS services such as GuardDuty, Inspector, Macie, IAM Access Analyzer, Firewall Manager and Config, and from partner products, and stores them in a common format, the AWS Security Finding Format (ASFF). AWS has also been expanding Security Hub to correlate signals and present them in the Open Cybersecurity Schema Framework (OCSF), with the configuration-checking part now called Security Hub CSPM (cloud security posture management). The skills below apply either way.",
   "Security Hub also runs its own checks. When you enable a security standard, such as AWS Foundational Security Best Practices, the CIS AWS Foundations Benchmark, PCI DSS or NIST SP 800-53, it evaluates your resources with controls built on AWS Config rules and produces a finding for each failed check, plus a security score. That means Config recording must be on for the resource types the controls check.",
   "At scale, you run Security Hub from a delegated administrator account with central configuration, so standards and controls are set once for the organization. Cross-Region aggregation links Regions to one home Region, so findings and updates from every linked Region appear, and can be managed, in that one place. Insights are saved groupings, such as 'resources with the most critical findings'. Custom actions send selected findings to EventBridge for a response you build, and automation rules update fields such as severity or workflow status, or suppress findings, as soon as they arrive.",
   "Know what Security Hub is not. It is not a detection engine for threats in logs (that is GuardDuty), and it does not store raw logs (that is CloudTrail, CloudWatch Logs or Security Lake). It is the aggregator, the posture checker and the workflow hub. Questions that ask for 'one view of findings across accounts and Regions' or 'score accounts against best practices' point here."
  ],
  terms: [
   ["ASFF", "AWS Security Finding Format, the JSON format Security Hub uses for findings from all sources."],
   ["Security standard", "A set of controls, such as CIS or AWS Foundational Security Best Practices, that Security Hub checks against your resources."],
   ["Cross-Region aggregation", "A setting that brings findings from linked Regions into one aggregation Region."],
   ["Automation rule", "A rule that automatically updates or suppresses findings that match criteria when Security Hub receives them."]
  ],
  example: "A company with accounts in four Regions sets eu-west-1 as its aggregation Region and enables AWS Foundational Security Best Practices through central configuration. An automation rule lowers the severity of a known exception in sandbox accounts, and a custom action sends selected findings to a ticketing workflow through EventBridge.",
  tip: "If a question says Security Hub controls show no data, check whether AWS Config is recording the relevant resource types. Many control checks depend on Config.",
  check: [
   ["What service must be on for most Security Hub standards checks to work?", "AWS Config, recording the resource types that the controls evaluate."],
   ["What is the difference between a custom action and an automation rule?", "A custom action sends chosen findings to EventBridge when an analyst selects them; an automation rule changes or suppresses matching findings automatically on arrival."]
  ]
 },
 {
  t: "Log sources for detection: VPC Flow Logs, Route 53 Resolver query logs, S3 server access logs, and ELB and CloudFront access logs",
  body: [
   "CloudTrail tells you about API calls, but many attacks show up first in network, DNS or request logs. Knowing which log answers which question is a core exam skill, because answers often differ only in the log source they name.",
   "VPC Flow Logs capture metadata about IP traffic on network interfaces, subnets or whole VPCs: source and destination addresses and ports, protocol, bytes, packets and whether the traffic was ACCEPTed or REJECTed. They go to CloudWatch Logs, S3 or Amazon Data Firehose, and you can add custom fields such as TCP flags or the VPC and subnet IDs. They never contain packet payloads; for full packets you use VPC Traffic Mirroring. Route 53 Resolver query logs record the DNS queries that resources in a VPC make through the Resolver, including the name looked up and the answer, which is how you spot lookups of malicious or tunneling domains.",
   "S3 server access logs record requests made to a bucket, delivered on a best-effort basis to another bucket. CloudTrail data events for S3 are usually better for security, because they are delivered reliably and include full identity details, but access logs can add fields such as request timing and are free apart from storage. Elastic Load Balancing access logs record each request to an Application or Network Load Balancer, including client IP, path, status code and TLS details, delivered to S3. CloudFront standard logs and real-time logs show requests at the edge. AWS WAF logs record each inspected request and which rule matched.",
   "Other sources include CloudWatch Logs from the CloudWatch agent on instances, EKS control plane audit logs, RDS database logs and Lambda function logs. The pattern for questions: network connections and blocked traffic, flow logs; names looked up, Resolver query logs; HTTP requests at the load balancer, ELB access logs; which rule blocked a web request, WAF logs; packet contents, Traffic Mirroring."
  ],
  terms: [
   ["VPC Flow Logs", "Records of IP traffic metadata on network interfaces, subnets or VPCs, including ACCEPT or REJECT, without payloads."],
   ["Resolver query logging", "A feature that logs DNS queries made by resources in a VPC to the Route 53 Resolver."],
   ["S3 server access logs", "Best-effort logs of requests made to an S3 bucket, delivered to another bucket."],
   ["Traffic Mirroring", "A VPC feature that copies actual network packets from an interface to a monitoring target."]
  ],
  example: "GuardDuty flags an instance for DNS exfiltration. The analyst checks Resolver query logs and sees thousands of long, random subdomains of one domain, then uses flow logs to find the instance also opened connections to an unusual IP. Traffic Mirroring to a sensor captures the payload for deeper analysis.",
  tip: "Flow logs show REJECT for traffic blocked by a security group or network ACL, but not which one blocked it, and they never show DNS names or payloads. Choose the log that actually contains the data the question asks about.",
  check: [
   ["Which log would show that an instance looked up a known malware domain?", "Route 53 Resolver query logs."],
   ["Why are CloudTrail S3 data events often preferred to S3 server access logs for security?", "They are delivered reliably with full IAM identity details, while access logs are best effort."]
  ]
 },
 {
  t: "Centralizing and analyzing logs: CloudWatch Logs Insights, Athena on S3, Amazon Security Lake and OpenSearch",
  body: [
   "Logs are only useful if you can keep them safe and search them quickly. Most organizations send logs from every account to a central log archive account, where the bucket has strict policies, versioning and sometimes Object Lock, and only a few security roles can read it. From there, several tools help you search.",
   "CloudWatch Logs Insights is an interactive query language for data already in CloudWatch Logs. A query such as `fields @timestamp, srcAddr | filter action = \"REJECT\" | stats count() by srcAddr | sort count() desc` lists the noisiest blocked sources in seconds. It is ideal for recent, operational data. For cross-account visibility, CloudWatch cross-account observability or subscription filters can stream log events to a central account, to Lambda, or through Amazon Data Firehose to S3 or OpenSearch.",
   "Amazon Athena queries data in place in S3 with standard SQL and bills per data scanned. It is the classic way to query long-term CloudTrail, flow log, ALB or WAF logs. Partitioning by date and account, and using columnar formats such as Parquet, keeps queries fast and cheap. Amazon OpenSearch Service indexes logs for full-text search and dashboards, which suits a security operations center that wants near real-time search and visualizations.",
   "Amazon Security Lake builds a security data lake for you. It collects logs from AWS sources such as CloudTrail, VPC Flow Logs, Route 53 Resolver logs, Security Hub findings, EKS audit logs and WAF logs, and from third-party sources, normalizes them to the Open Cybersecurity Schema Framework (OCSF) in Apache Parquet, and stores them in S3 buckets in your own account with lifecycle rules. Subscribers, such as Athena, OpenSearch or a partner SIEM, get query or data access. On the exam, 'normalize to OCSF' and 'data lake we own across accounts and third-party tools' mean Security Lake."
  ],
  terms: [
   ["CloudWatch Logs Insights", "A query language and console for searching and aggregating data in CloudWatch Logs."],
   ["Amazon Athena", "A serverless SQL engine that queries data where it sits in S3, billed by data scanned."],
   ["OCSF", "Open Cybersecurity Schema Framework, an open, vendor-neutral schema for security events."],
   ["Amazon Security Lake", "A service that collects and normalizes security data to OCSF in an S3 data lake owned by the customer."]
  ],
  example: "A company keeps two years of CloudTrail logs in a central bucket. For last night's alert, analysts use Logs Insights on the CloudWatch copy; for an auditor's question about a year-old change, they run an Athena query over date partitions. A new SIEM subscribes to Security Lake to read normalized data from every account.",
  tip: "Match the time frame and format to the tool: recent operational logs in CloudWatch, Logs Insights; long-term files in S3, Athena; normalized cross-source data lake, Security Lake; full-text search dashboards, OpenSearch.",
  check: [
   ["How do you make Athena queries over years of CloudTrail logs cheaper?", "Partition the table by date and account and use a columnar format so each query scans less data."],
   ["Where does Security Lake store its data?", "In S3 buckets in your own account, in OCSF format as Apache Parquet."]
  ]
 },
 {
  t: "Alerting with Amazon EventBridge rules, SNS notifications and CloudWatch Logs metric filters",
  body: [
   "Detection is wasted if nobody hears about it. AWS offers two main paths from an event to a person or an automated response: EventBridge rules that react to individual events, and CloudWatch metric filters with alarms that react to patterns and counts.",
   "Amazon EventBridge receives events from AWS services on the default event bus, including GuardDuty findings, Security Hub findings, Config compliance changes, Inspector findings and, through CloudTrail, most API calls. A rule has an event pattern, a JSON document that matches fields such as `source`, `detail-type` and values inside `detail`, for example GuardDuty findings with severity of at least 7. Targets include SNS topics, Lambda functions, Step Functions state machines, SQS queues, Systems Manager Automation and event buses in other accounts, which is how many companies route findings from every account to a central security account.",
   "Amazon SNS delivers notifications to email, SMS, HTTPS endpoints, Lambda or SQS, and to chat tools through Amazon Q Developer in chat applications (formerly AWS Chatbot). Protect topics with a topic policy and encryption, and remember that email subscriptions must be confirmed.",
   "CloudWatch Logs metric filters turn log data into numbers. If CloudTrail is delivered to a CloudWatch Logs log group, a filter can count events such as `{ ($.errorCode = \"AccessDenied\") || ($.errorCode = \"*UnauthorizedOperation\") }`, root account usage, console sign-ins without MFA, or changes to security groups and network ACLs. A CloudWatch alarm on that metric then notifies SNS when a threshold is crossed. These are the classic CIS benchmark alarms. Choose EventBridge when each single event matters immediately, and a metric filter with an alarm when you care about counts over time."
  ],
  terms: [
   ["Event pattern", "A JSON filter in an EventBridge rule that selects which events trigger its targets."],
   ["Metric filter", "A CloudWatch Logs pattern that turns matching log events into a CloudWatch metric."],
   ["SNS topic", "A publish and subscribe channel that fans out notifications to subscribers such as email or Lambda."],
   ["Cross-account event bus", "An EventBridge bus in another account that receives events, used to centralize security events."]
  ],
  example: "Every member account has an EventBridge rule that forwards GuardDuty and Security Hub findings to a central bus in the security account. There, one rule sends critical findings to an SNS topic for paging, and a CloudWatch metric filter on the organization trail raises an alarm when more than 20 AccessDenied errors appear in five minutes.",
  tip: "For 'alert when X happens once, in near real time', choose an EventBridge rule; for 'alert when X happens more than N times', choose a metric filter and alarm. A scheduled query is almost never the fastest answer.",
  check: [
   ["What must be in place before you can use a metric filter on CloudTrail events?", "The trail must deliver events to a CloudWatch Logs log group."],
   ["How can findings from 50 accounts reach one security account's automation?", "EventBridge rules in each account send events to a central event bus in the security account, or you use the service's delegated administrator view."]
  ]
 },
 {
  t: "Troubleshooting monitoring and logging: missing log delivery, bucket policies for log delivery and KMS key policies for encrypted logs",
  body: [
   "Security logging fails quietly. A trail that stops delivering, a flow log with no data or an alarm that never fires can go unnoticed for weeks, so the exam includes troubleshooting questions. The good news is that most failures come from a handful of causes.",
   "Start with permissions for the delivering service. CloudTrail, VPC Flow Logs, Config, ELB and others write to S3 as a service principal (for example `cloudtrail.amazonaws.com` or `delivery.logs.amazonaws.com`) or through an IAM role you provide. The destination bucket policy must allow that principal to write (`s3:PutObject`), and often to read the bucket ACL, ideally with `aws:SourceArn` and `aws:SourceAccount` conditions. When someone tightens a central bucket policy, or an RCP or SCP adds a deny, delivery can break. Flow logs to CloudWatch Logs need an IAM role that the service can assume with permission to create log streams and put events.",
   "Next, check encryption. If log files are encrypted with a customer managed KMS key, the key policy must let the service use it, for CloudTrail `kms:GenerateDataKey*` with an encryption context for the trail, and readers need `kms:Decrypt`. A disabled key or one pending deletion stops delivery too. CloudWatch Logs log groups encrypted with KMS need the key policy to allow the logs service principal for that Region.",
   "Then check the obvious: is the trail still logging (`aws cloudtrail get-trail-status` shows `IsLogging` and the latest delivery error), does the bucket still exist, is the resource in the Region you are looking at, are data events actually selected, and did an event pattern or metric filter use a slightly wrong field name? Services also report errors: CloudTrail shows `LatestDeliveryError`, and flow logs show a delivery status. Work through destination, permissions, encryption, configuration, in that order."
  ],
  terms: [
   ["Service principal", "An identifier such as cloudtrail.amazonaws.com that represents an AWS service in policies."],
   ["get-trail-status", "A CloudTrail API call that shows whether a trail is logging and any recent delivery errors."],
   ["aws:SourceArn", "A condition key that ties a service principal's permission to one specific resource, such as a trail."],
   ["Encryption context", "Extra key-value data bound to a KMS operation, used in policies and logged in CloudTrail."]
  ],
  example: "After a new KMS key is set on the organization trail, `get-trail-status` shows `LatestDeliveryError: InsufficientEncryptionPolicyException`. The engineer adds a key policy statement allowing `cloudtrail.amazonaws.com` to call `kms:GenerateDataKey*` with the trail's ARN in the encryption context condition, and delivery resumes.",
  tip: "When logs stop right after a change, the change is almost always the cause: a bucket policy edit, a new KMS key, or a new SCP or RCP. Look for the answer that restores the service principal's access in the narrowest way.",
  check: [
   ["A flow log to CloudWatch Logs shows no data. What IAM item should you check?", "The IAM role given to the flow log: its trust policy must allow the flow logs service and its permissions must allow creating log streams and putting log events."],
   ["Which CloudTrail command reveals the latest delivery error?", "aws cloudtrail get-trail-status."]
  ]
 },
 {
  t: "Incident response plans and runbooks on AWS: response phases, Systems Manager Automation runbooks and OpsCenter",
  body: [
   "An incident response plan says who does what when something goes wrong. Most frameworks, including NIST SP 800-61 and the AWS Security Incident Response Guide, use similar phases: prepare; detect and analyze; contain, eradicate and recover; and learn from the incident. The plan names roles such as incident commander and communications lead, sets severity levels, and lists contacts, including AWS Support and, if you use it, the AWS Security Incident Response service, which can triage findings and connect you with AWS responders.",
   "A playbook covers one type of incident, such as exposed IAM keys, a compromised EC2 instance, a public S3 bucket or ransomware on data. A runbook is the step-by-step procedure within it. In the cloud, runbooks should be as automated as possible, because API-driven actions are fast, consistent and logged.",
   "AWS Systems Manager Automation runs runbooks written as documents. AWS provides many ready-made ones, such as `AWS-DisableS3BucketPublicReadWrite` or runbooks to isolate an instance, and you can write your own in YAML with steps that call AWS APIs, run scripts, wait for approval or branch on results. Automation runbooks can be triggered by EventBridge rules, by AWS Config remediation or by a person, and they can run across accounts and Regions. Systems Manager OpsCenter collects operational issues as OpsItems, links them to related resources and runbooks, and gives responders one place to track and fix an issue.",
   "Plans must also cover people and forensics work. Some teams use Jupyter notebooks, for example in Amazon SageMaker AI, to hold repeatable investigation queries. Whatever tools you choose, the exam values plans that are written down, automated where possible, practiced, and updated after every incident."
  ],
  terms: [
   ["Playbook", "A plan for handling one type of incident, including its detection, decision points and runbooks."],
   ["Runbook", "A step-by-step procedure, ideally automated, for carrying out a response task."],
   ["Systems Manager Automation", "A service that runs runbook documents with steps that call AWS APIs and scripts, triggered manually or by events."],
   ["OpsCenter", "A Systems Manager capability that tracks operational issues as OpsItems with related resources and runbooks."]
  ],
  example: "A company writes a playbook for public S3 buckets. An AWS Config rule detects the problem, automatic remediation runs `AWS-DisableS3BucketPublicReadWrite`, an OpsItem is created with the bucket details, and the on-call engineer reviews CloudTrail to see who made the change.",
  tip: "When a question asks how to make a response consistent and repeatable, prefer an automated runbook (Systems Manager Automation, Step Functions or Lambda) triggered by an event over a manual checklist.",
  check: [
   ["What is the difference between a playbook and a runbook?", "A playbook covers how to handle a type of incident; a runbook is a specific step-by-step procedure used within it."],
   ["Name two ways to start a Systems Manager Automation runbook automatically.", "From an EventBridge rule target or from AWS Config automatic remediation."]
  ]
 },
 {
  t: "Preparing for incidents: break-glass access, a dedicated forensics account, and game days to test the plan",
  body: [
   "Most of incident response happens before the incident. If responders cannot sign in, lack permissions, or have nowhere safe to analyze evidence, every minute during the event is spent fixing access instead of the problem.",
   "Pre-provision access. Create incident response roles in every account, deployed with StackSets or Control Tower, that responders can assume only when needed, with permissions to read logs, snapshot volumes, change security groups and revoke sessions. Keep a break-glass path for when normal sign-in fails, for example if the identity provider is down: a small number of IAM users or root credentials with hardware MFA, credentials stored in a sealed and audited location, and alarms on every use so any sign-in is investigated.",
   "Set up a forensics account in its own OU with strict SCPs. Evidence such as EBS snapshots, memory images and log exports is copied there, into S3 buckets with versioning and Object Lock, so it cannot be changed. Forensic workstations or analysis instances run there, isolated from production networks, often from a prepared AMI with analysis tools. Make sure KMS key policies let the forensics account use the keys that protect snapshots, or you will be unable to copy encrypted evidence when it matters.",
   "Finally, test. Tabletop exercises walk through a scenario in discussion. Game days run a realistic simulation in a non-production environment: generate GuardDuty sample findings, plant a canary access key, or make a test bucket public, and watch whether detection fires, automation runs, people are paged and runbooks work. Record timings, fix gaps and update the plan. The exam favors answers that prepare access, isolation and evidence storage in advance and that test the plan regularly."
  ],
  terms: [
   ["Break-glass access", "Emergency credentials, tightly protected and monitored, used only when normal access paths fail."],
   ["Forensics account", "An isolated AWS account used to store evidence and run analysis away from production."],
   ["Game day", "A practice event that simulates an incident to test people, processes and tools."],
   ["Tabletop exercise", "A discussion-based walkthrough of an incident scenario to test roles and decisions."]
  ],
  example: "In a game day, the team generates a GuardDuty sample finding for credential exfiltration. The EventBridge rule fires, but the response Lambda fails because the IR role is missing in a new account. They fix the StackSet so every new account gets the role, and repeat the test successfully.",
  tip: "Look for 'before an incident' clues: the right answers pre-create roles, keys, accounts and runbooks. An answer that grants broad access only after the incident starts, or shares credentials informally, is a trap.",
  check: [
   ["Why must KMS key policies be considered when preparing a forensics account?", "Encrypted snapshots can only be copied and used there if the key policy lets the forensics account use the key."],
   ["What should happen whenever break-glass credentials are used?", "An alarm fires so the use is reviewed, and the credentials are rotated and resealed afterwards."]
  ]
 },
 {
  t: "Responding to compromised IAM credentials: deactivating access keys, revoking role sessions and reviewing CloudTrail activity",
  body: [
   "Leaked credentials are among the most common AWS incidents: keys pushed to a public repository, stored in a script, or stolen from an instance through the metadata service. GuardDuty findings such as `UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration` or AWS Health notices about exposed keys often start the response.",
   "For an IAM user's long-term access key, first deactivate the key (set it to Inactive) rather than deleting it. That stops the attacker at once while keeping the key ID, which you need for searching logs and which you can reactivate if the finding was wrong. If the password may also be compromised, reset it and review MFA devices. You can attach an explicit deny policy to the user as an extra safeguard.",
   "Role credentials are temporary, so there is no key to deactivate. For a role, use Revoke active sessions in the IAM console. It adds an inline policy that denies all actions when `aws:TokenIssueTime` is earlier than the moment you revoked, so every stolen token stops working, while legitimate callers such as EC2 instances simply fetch new credentials. For an instance whose role credentials were exfiltrated, also fix the cause, such as requiring IMDSv2.",
   "Then scope the damage with CloudTrail. Search by the access key ID or role session name for every call made since the leak, and look for persistence: new IAM users, access keys, roles, trust policy changes, Lambda functions, EC2 instances in unusual Regions, or changes to logging. Remove what the attacker created, rotate any secrets they could read, and check billing for crypto-mining. Finally, delete the old key and fix the root cause, for example moving the workload to a role and adding secret scanning to the repository."
  ],
  terms: [
   ["Deactivate access key", "Setting an IAM access key to Inactive so it stops working but still exists for investigation."],
   ["Revoke active sessions", "An IAM role action that denies all requests from sessions issued before a chosen time."],
   ["aws:TokenIssueTime", "A condition key holding the time temporary credentials were issued."],
   ["Persistence", "Changes an attacker makes to keep access, such as creating new users, keys or roles."]
  ],
  example: "A developer's access key appears in a public repository. The responder deactivates it, finds in CloudTrail that the attacker created a new IAM user and launched GPU instances in three Regions, removes the user and instances, deletes the key after the review, and moves the developer to IAM Identity Center with short-term credentials.",
  tip: "Deactivate first, delete later. For roles, the answer is revoke sessions, not deleting the role, which would break healthy workloads.",
  check: [
   ["Why deactivate rather than delete a leaked access key first?", "Deactivating stops its use immediately but keeps the key ID for CloudTrail searches and allows reactivation if the alert was false."],
   ["After revoking a role's sessions, what happens to an EC2 instance that uses the role?", "It keeps working, because it fetches new credentials issued after the revocation time."]
  ]
 },
 {
  t: "Containing a compromised EC2 instance: isolation, EBS snapshots, memory capture and preserving evidence",
  body: [
   "When an EC2 instance is compromised, you have two goals that pull in different directions: stop the harm quickly and keep the evidence. A good runbook does both in the right order.",
   "Protect the instance from automation first. Turn on termination protection, tag it with an incident ID, and remove it from its Auto Scaling group (or set it to standby) and from load balancer target groups, so it is neither replaced and deleted nor serving users. Record the instance metadata, such as its ID, IP addresses, security groups, IAM role and AMI.",
   "Next, isolate it. Replace its security groups with an isolation group that has no inbound rules and no outbound rules, or only a rule allowing your forensic tools. Know the catch: security groups are stateful, and connections already being tracked are not cut when rules are removed. AWS guidance is to first apply a group that allows all traffic from 0.0.0.0/0, which makes flows untracked, and then switch to the isolation group, or to add network ACL deny rules for the subnet, which are stateless and cut traffic immediately. Also consider detaching or restricting the instance's IAM role and revoking its sessions.",
   "Then collect evidence. Memory is volatile, so capture it first from the running instance with a memory acquisition tool, often run through Systems Manager so you do not need SSH. Then snapshot every attached EBS volume and tag the snapshots. Do not stop, reboot or terminate before memory is captured. Copy evidence to the forensics account, record hashes and a chain-of-custody log, and analyze snapshots by creating volumes attached to a forensic instance there. Only after investigation do you terminate the instance and redeploy a clean one from a known-good image."
  ],
  terms: [
   ["Isolation security group", "A security group with no or minimal rules used to cut a compromised instance off from the network."],
   ["Tracked connection", "A flow a stateful security group remembers, which stays open even after the rules that allowed it are removed."],
   ["Memory capture", "Acquiring a copy of a running system's RAM to preserve volatile evidence."],
   ["Termination protection", "An EC2 setting that prevents an instance from being terminated through the API or console until turned off."]
  ],
  example: "Inspector and GuardDuty both flag a web server. The runbook in Step Functions enables termination protection, detaches it from the Auto Scaling group, applies an isolation group and a network ACL deny, runs a memory capture through Systems Manager, snapshots the volumes and shares them with the forensics account.",
  tip: "Any answer that stops or terminates the instance before capturing memory loses evidence. And if an attacker's session survives a security group change, the explanation is connection tracking; a network ACL fixes it.",
  check: [
   ["Why remove a compromised instance from its Auto Scaling group?", "So the group does not terminate and replace it, destroying evidence, and so it stops taking traffic."],
   ["What is the correct order: snapshot EBS or capture memory?", "Capture memory first, because it is lost on stop or reboot; then snapshot the volumes."]
  ]
 },
 {
  t: "Investigating and scoping with Amazon Detective and CloudTrail Lake queries",
  body: [
   "Once an alert is confirmed, the next questions are: how did it start, what else did the attacker touch, and when did it begin? This scoping decides how big the response has to be.",
   "Amazon Detective helps answer those questions visually. It automatically builds a behavior graph from CloudTrail management events, VPC Flow Logs, GuardDuty findings and, optionally, EKS audit logs and other sources, keeping up to a year of history. For any entity, such as an IAM role, user, EC2 instance, IP address or S3 bucket, it shows activity over time, new behavior compared with a baseline, related findings and the other entities it interacted with. From a GuardDuty or Security Hub finding you can pivot straight into Detective. Detective groups related findings into finding groups, which helps you see one attack as a whole rather than many alerts. It works best across an organization through a delegated administrator.",
   "CloudTrail Lake answers precise questions with SQL. For example, list every API call by a given access key ID in the last six months across all accounts, every `CreateAccessKey` or `AttachRolePolicy` call by a suspicious principal, or all calls from an IP address. Because the event data store is immutable and can span an organization, it also serves as an evidence source. Athena over CloudTrail files in S3 can do similar work where Lake is not set up.",
   "Good scoping also checks what the principal could do, not only what it did, by reviewing its policies and IAM Access Analyzer findings, and uses flow logs to find lateral movement between instances. Validate each finding before acting: GuardDuty findings are signals, and Detective or log queries confirm whether the activity was truly malicious."
  ],
  terms: [
   ["Behavior graph", "Detective's linked model of entities and their activity built from logs and findings."],
   ["Finding group", "A Detective grouping of related findings and entities that likely belong to one security event."],
   ["Event data store", "A CloudTrail Lake store of events that can be queried with SQL."],
   ["Scoping", "Determining the extent of an incident: affected accounts, resources, data and time frame."]
  ],
  example: "From a GuardDuty finding about unusual API calls, the analyst opens Detective and sees the role was assumed from a new IP two days earlier and used to list buckets in three accounts. A CloudTrail Lake query then lists every object-level call from that IP, which tells the team exactly which data may have been read.",
  tip: "Detective is for visual investigation and relationships over time; CloudTrail Lake and Athena are for exact queries; GuardDuty raises the alert. Match the verb in the question: investigate and visualize, query, or detect.",
  check: [
   ["Which service would you use to see all entities a suspicious IP interacted with over two weeks?", "Amazon Detective."],
   ["Why can CloudTrail Lake search across many accounts at once?", "An organization event data store collects events from all member accounts into one queryable store."]
  ]
 },
 {
  t: "Automated response: EventBridge with Lambda or Step Functions, Security Hub automation rules and AWS Config remediation",
  body: [
   "Humans are slow at night and on weekends; APIs are not. Automated response reduces the time between detection and containment, and makes every response consistent and logged. The exam expects you to pick the right automation building block.",
   "EventBridge is the trigger. Findings from GuardDuty, Security Hub, Inspector, Macie and Access Analyzer, Config compliance changes and CloudTrail API calls all arrive as events. A rule matching a specific finding type or severity can call Lambda for a short action, such as deactivating an access key, or start a Step Functions state machine for a multi-step workflow with retries, waits, parallel branches and human approval steps, such as isolate, snapshot, notify and open a ticket. It can also start a Systems Manager Automation runbook directly.",
   "Security Hub automation rules handle findings themselves without code: when a finding matching criteria arrives, the rule can change its severity, set its workflow status to SUPPRESSED or NOTIFIED, add notes or update fields. Custom actions let analysts send selected findings to EventBridge on demand, which suits cases where a person should decide before a response runs.",
   "AWS Config remediation fixes configuration drift. You attach a remediation action, a Systems Manager Automation document, to a Config rule, either manual or automatic with retry settings. For example, when `s3-bucket-public-read-prohibited` finds a violation, remediation blocks public access, or when `restricted-ssh` fails, it removes the open rule. Design automation carefully: give each function or runbook a least-privilege role, test in non-production, log every action, and avoid loops where remediation triggers the same rule again. Some actions, such as terminating production instances, are better with a human approval step."
  ],
  terms: [
   ["Step Functions", "A workflow service that coordinates multiple steps with retries, branching and waits, useful for multi-step response."],
   ["Automatic remediation", "An AWS Config feature that runs a Systems Manager Automation document when a rule finds a noncompliant resource."],
   ["Custom action", "A Security Hub feature that sends chosen findings to EventBridge when an analyst selects them."],
   ["Human approval step", "A pause in an automated workflow that waits for a person to confirm a risky action."]
  ],
  example: "When GuardDuty reports a high-severity EC2 finding, EventBridge starts a Step Functions workflow that tags and isolates the instance, snapshots its volumes, posts to the security channel and waits for an analyst to approve termination. Meanwhile, Config remediation closes any security group rule that opens SSH to the internet.",
  tip: "Single quick action: Lambda. Multi-step with retries or approvals: Step Functions. Fix a noncompliant configuration: Config remediation with an Automation document. Change or suppress findings: Security Hub automation rules.",
  check: [
   ["What does a Config remediation action run?", "A Systems Manager Automation document, manually or automatically."],
   ["When would you add a human approval step to automated response?", "For actions with high business impact, such as terminating production resources, where a false positive would be costly."]
  ]
 },
 {
  t: "Forensic evidence handling: S3 Object Lock, chain of custody and tagging evidence",
  body: [
   "Evidence may end up in a legal case, an insurance claim or a regulator's review. It is only useful if you can show it was collected properly and not changed afterwards. That is what forensic handling is about.",
   "Store evidence in a dedicated forensics account, in an S3 bucket with versioning and S3 Object Lock. Compliance mode makes each object version write-once-read-many for the retention period, and nobody, including the root user, can delete it or shorten the period. Legal holds can keep specific objects locked with no end date until they are removed. Encrypt with a KMS key whose policy lets only the forensics roles decrypt, turn on CloudTrail data events for the bucket so every access is recorded, and block public access.",
   "Keep a chain of custody: who collected each item, when, from which resource, how it was transferred and who has accessed it since. Compute hashes, such as SHA-256, when you collect memory images, log exports or disk images, and record them, so you can later prove the file is unchanged. Tag snapshots, volumes and instances with the incident ID, the collector and the time, so evidence is easy to find and not deleted by cleanup automation. Keep copies of the relevant CloudTrail, flow log and application log data for the incident period, since normal lifecycle rules might remove it.",
   "Work on copies, not originals. Create volumes from snapshots in the forensics account and attach them read-only to an isolated analysis instance. Share encrypted snapshots using a customer managed key that the forensics account is allowed to use, because snapshots encrypted with an AWS managed key cannot be shared across accounts."
  ],
  terms: [
   ["Chain of custody", "A record of who collected, transferred, stored and accessed each piece of evidence, and when."],
   ["Legal hold", "An S3 Object Lock setting that prevents deletion of an object version until the hold is removed, with no fixed end date."],
   ["Hash", "A fixed-length fingerprint of a file, such as SHA-256, used to prove it has not changed."],
   ["WORM", "Write once, read many: storage that cannot be modified or deleted after writing."]
  ],
  example: "After a breach, the team copies memory images and EBS snapshots to the forensics account. Each file's SHA-256 hash goes into the case log, the objects are stored under Object Lock compliance mode for seven years, and access requires a forensics role whose use is logged by CloudTrail data events.",
  tip: "Snapshots encrypted with the default AWS managed EBS key cannot be shared with another account. For evidence sharing, the answer involves a customer managed key the forensics account can use, or re-encrypting the copy.",
  check: [
   ["Why record a hash when collecting evidence?", "It lets you prove later that the evidence has not changed since collection."],
   ["What is the difference between an Object Lock retention period and a legal hold?", "A retention period has an end date; a legal hold has none and stays until explicitly removed."]
  ]
 },
 {
  t: "Recovering after an incident: restoring from AWS Backup, rotating secrets and applying lessons learned",
  body: [
   "Containment stops the damage; recovery returns the business to normal without letting the attacker back in. The key rule is to rebuild from known-good sources rather than trusting anything the attacker touched.",
   "Rebuild compute from trusted, patched images through infrastructure as code, rather than cleaning a compromised instance. Restore data from backups taken before the compromise. AWS Backup centralizes backup plans across services and accounts, and cross-account and cross-Region copies protect against an attacker deleting backups in the source account. AWS Backup Vault Lock, especially in compliance mode, prevents anyone from deleting recovery points or shortening retention, which is vital against ransomware. Logically air-gapped vaults add another layer by keeping backups in an isolated vault that can be shared for recovery. Test restores regularly, because an untested backup is only a hope.",
   "Rotate everything the attacker could have seen: database passwords and API keys in Secrets Manager, IAM access keys, TLS private keys and any tokens stored on compromised hosts. If a KMS key may have been misused, review its key policy and grants and consider re-encrypting data under a new key. Remove all persistence found during scoping, including users, roles, trust policies, Lambda functions and scheduled rules the attacker created.",
   "Finally, hold a blameless post-incident review. Build a timeline, identify the root cause, and ask what would have detected or prevented it earlier. Turn the answers into concrete actions: new Config rules or SCPs, GuardDuty protection plans, better alerts, updated runbooks and training. Measure time to detect, contain and recover so the next response is faster."
  ],
  terms: [
   ["AWS Backup", "A service that centrally manages backup plans and recovery points across AWS services and accounts."],
   ["Backup Vault Lock", "A setting that enforces write-once retention on a backup vault, preventing deletion of recovery points."],
   ["Root cause", "The underlying weakness that allowed an incident, as opposed to its symptoms."],
   ["Post-incident review", "A blameless meeting after an incident to document the timeline, causes and improvements."]
  ],
  example: "Ransomware encrypts files on an EC2-based file server. The team rebuilds the server from a golden AMI, restores data from an AWS Backup recovery point held in a locked vault in a separate account, rotates the service account passwords in Secrets Manager, and adds a GuardDuty Malware Protection plan as a lesson learned.",
  tip: "Recovery answers restore from clean backups and rebuild from trusted images; answers that clean and reuse the compromised system are traps. For backups that even administrators cannot delete, look for Vault Lock in compliance mode.",
  check: [
   ["Why copy backups to another account?", "So an attacker who controls the source account cannot delete the backups."],
   ["After containing an instance whose role could read a database secret, what must you rotate?", "The database secret, because the attacker could have read it."]
  ]
 },
 {
  t: "Edge protection with AWS WAF: web ACLs, managed rule groups, rate-based rules and OWASP Top 10 threats",
  body: [
   "AWS WAF is a web application firewall. It inspects HTTP and HTTPS requests before they reach your application and allows, blocks, counts or challenges them. You attach a web ACL (web access control list) to a protected resource: a CloudFront distribution, an Application Load Balancer, an API Gateway REST API, an AppSync GraphQL API, a Cognito user pool, an App Runner service or a Verified Access instance.",
   "A web ACL holds rules evaluated in priority order, plus a default action for requests no rule matches. Rules can match IP sets, countries, headers, query strings, bodies, URI paths, label values set by earlier rules, and patterns for SQL injection and cross-site scripting. Each web ACL has a capacity limit measured in web ACL capacity units (WCUs), since complex rules cost more. AWS managed rule groups give you maintained protections without writing rules: the core rule set for common OWASP Top 10 attacks, known bad inputs, SQL database and operating-system specific rules, the Amazon IP reputation list, anonymous IP lists, and paid groups such as Bot Control, account takeover prevention and account creation fraud prevention. Marketplace sellers also offer rule groups.",
   "Rate-based rules count requests from each source over a time window and block or challenge sources that exceed a limit. They can also aggregate by other keys, such as a header, cookie or query argument, which helps against credential stuffing and scraping. CAPTCHA and challenge actions check that a client is a real browser.",
   "Start new rules in Count mode, watch the logs and metrics, then switch to Block, to avoid blocking real customers. Send WAF logs to CloudWatch Logs, S3 or Firehose (the destination name must start with `aws-waf-logs-`) to see which rule matched each request. Firewall Manager can apply WAF policies across all accounts in an organization. Remember that WAF protects layer 7 web traffic only; it does not filter SSH or database ports."
  ],
  terms: [
   ["Web ACL", "A set of AWS WAF rules and a default action attached to a protected web resource."],
   ["Managed rule group", "A maintained set of WAF rules from AWS or a Marketplace seller, such as the core rule set."],
   ["Rate-based rule", "A WAF rule that blocks or challenges sources whose request count exceeds a limit in a time window."],
   ["Count action", "A WAF action that records matches without blocking, used to test rules safely."]
  ],
  example: "An online store sees login floods. The team adds a rate-based rule scoped to the `/login` path, the AWS managed core rule set and known bad inputs rule group in Count mode, reviews WAF logs for a week, and switches them to Block. A Firewall Manager policy then applies the same web ACL to every ALB in the organization.",
  tip: "SQL injection, XSS, bad bots and HTTP floods point to AWS WAF; large network-layer DDoS points to Shield; non-HTTP traffic points to security groups, network ACLs or Network Firewall.",
  check: [
   ["Which resources can have an AWS WAF web ACL attached?", "CloudFront, ALB, API Gateway REST APIs, AppSync, Cognito user pools, App Runner and Verified Access."],
   ["Why deploy new WAF rules in Count mode first?", "To see what they would block in real traffic and avoid blocking legitimate users before switching to Block."]
  ]
 },
 {
  t: "DDoS resilience: AWS Shield Standard vs Shield Advanced, CloudFront, Route 53 and AWS Firewall Manager",
  body: [
   "A distributed denial of service (DDoS) attack tries to exhaust bandwidth, connections or application capacity with traffic from many sources. AWS's approach is layered: absorb and filter attacks at the huge edge network, scale the application, and filter bad requests at layer 7.",
   "AWS Shield Standard is automatic and free for every customer. It protects against the most common network and transport layer attacks, such as SYN floods and UDP reflection, especially for traffic entering through CloudFront, Route 53 and Global Accelerator. AWS Shield Advanced is a paid subscription for an organization that adds enhanced detection for protected resources (CloudFront, Route 53 hosted zones, Global Accelerator, ELB and Elastic IPs), health-based detection using Route 53 health checks, automatic application layer DDoS mitigation that creates WAF rules for you, 24/7 access to the Shield Response Team (SRT), DDoS cost protection that credits scaling charges caused by an attack, detailed attack reports and AWS WAF and Firewall Manager at no extra charge for protected resources. You can also grant the SRT access to your account so they can help write WAF rules during an attack.",
   "Architecture matters as much as Shield. Put CloudFront in front of applications, even dynamic ones, so attacks hit the edge first. Use Route 53, which is built to withstand DNS floods. Keep origins private, reachable only from CloudFront (for example, origin access control for S3, or a custom header plus the CloudFront managed prefix list for an ALB). Use Auto Scaling and load balancers to absorb spikes, and WAF rate-based rules for HTTP floods.",
   "AWS Firewall Manager centrally manages protections across an organization: WAF web ACLs, Shield Advanced protections, security group policies, Network Firewall and DNS Firewall policies. It needs AWS Organizations, a Firewall Manager administrator account and AWS Config enabled, and it automatically applies policies to new accounts and resources that match."
  ],
  terms: [
   ["Shield Standard", "Free, automatic protection against common network and transport layer DDoS attacks."],
   ["Shield Advanced", "A paid service adding enhanced detection, the Shield Response Team, cost protection and automatic layer 7 mitigation."],
   ["Shield Response Team", "AWS DDoS experts available 24/7 to Shield Advanced customers during attacks."],
   ["Firewall Manager", "A service that applies WAF, Shield Advanced, security group and firewall policies across an organization."]
  ],
  example: "A betting site expects attacks during major events. It subscribes to Shield Advanced, protects its CloudFront distribution and Route 53 zone with health-based detection, enables automatic application layer mitigation, and uses Firewall Manager so new accounts get the same WAF rules. During an attack, the SRT helps tune rules and cost protection covers the scaling bill.",
  tip: "Cost protection, the response team and advanced reporting only come with Shield Advanced. If a question says 'at no additional cost' for basic DDoS protection, the answer is Shield Standard.",
  check: [
   ["Which prerequisites does Firewall Manager need?", "AWS Organizations, a designated Firewall Manager administrator account, and AWS Config enabled in the accounts."],
   ["How do Route 53 health checks help Shield Advanced?", "They let Shield Advanced use application health in detection, making it faster and more accurate at spotting real attacks."]
  ]
 },
 {
  t: "CloudFront security: origin access control, signed URLs and signed cookies, security headers and field-level encryption",
  body: [
   "Amazon CloudFront is a content delivery network, but it is also a security layer: it terminates TLS at the edge, absorbs DDoS traffic, runs WAF, and controls who can reach your content and origins.",
   "Keep origins private. For an S3 origin, use origin access control (OAC): CloudFront signs its requests to S3 with SigV4, and the bucket policy allows only the `cloudfront.amazonaws.com` service principal with a condition on the distribution's ARN in `aws:SourceArn`. OAC supports buckets encrypted with SSE-KMS (the key policy must also allow CloudFront) and replaces the older origin access identity (OAI). For custom origins such as an ALB, restrict the security group to the CloudFront managed prefix list and add a secret custom header that the ALB checks, or use CloudFront VPC origins to keep the ALB in private subnets.",
   "Control who can view content. Signed URLs grant access to one file, and are good for individual downloads or for clients that do not support cookies. Signed cookies grant access to many files, such as all videos under a path, without changing URLs. Both use a key group of public keys you upload, with the private key held by your application, and both can set expiry times and IP address ranges. Geo restriction allows or blocks whole countries.",
   "Protect data in transit and in the browser. Set the viewer protocol policy to redirect HTTP to HTTPS or HTTPS only, choose a security policy that sets the minimum TLS version, and use an ACM certificate in us-east-1 for custom domains. Response headers policies add security headers such as `Strict-Transport-Security`, `Content-Security-Policy` and `X-Content-Type-Options`. Field-level encryption encrypts specific form fields, such as card numbers, at the edge with a public key, so only a back-end service with the private key can read them, even if other layers log the request."
  ],
  terms: [
   ["Origin access control", "A CloudFront feature that signs requests to an S3 origin so the bucket can allow only that distribution."],
   ["Signed URL", "A URL with an expiry and signature that grants access to one CloudFront object."],
   ["Signed cookie", "A set of cookies that grants access to multiple CloudFront objects without changing their URLs."],
   ["Field-level encryption", "CloudFront encryption of chosen request fields at the edge with a public key."]
  ],
  example: "A training company serves course videos from S3 through CloudFront with OAC, so the bucket is never public. After purchase, its site sets signed cookies valid for 24 hours for the `/courses/123/*` path, and a response headers policy adds HSTS and a content security policy.",
  tip: "One file, or clients without cookie support: signed URLs. Many files: signed cookies. New designs use OAC rather than OAI, especially with SSE-KMS.",
  check: [
   ["Why does OAC need a KMS key policy change for SSE-KMS buckets?", "CloudFront must be allowed to use the key to decrypt objects, so the key policy has to permit the CloudFront service principal for that distribution."],
   ["How do you stop users bypassing CloudFront to hit an ALB origin directly?", "Allow only the CloudFront managed prefix list in the ALB security group and require a secret custom header, or use VPC origins."]
  ]
 },
 {
  t: "VPC traffic controls: security groups vs network ACLs, AWS Network Firewall and Route 53 Resolver DNS Firewall",
  body: [
   "Inside a VPC you have several layers of traffic control, each with a different job. Picking the right one is a frequent exam task.",
   "Security groups attach to elastic network interfaces, such as those of EC2 instances, RDS databases and Lambda functions in a VPC. They are stateful, so return traffic is allowed automatically, and they only contain allow rules; all rules are evaluated together. A rule can reference another security group as its source, which is the cleanest way to say 'the database accepts 3306 only from the app tier'. Network ACLs attach to subnets, are stateless, so you must allow return traffic on ephemeral ports, and contain numbered allow and deny rules evaluated in order, with the first match winning. Use network ACLs for broad subnet-level blocks, such as denying a hostile CIDR range, and security groups for precise, per-workload rules.",
   "AWS Network Firewall is a managed, stateful firewall you deploy in dedicated firewall subnets, routing traffic through its endpoints with route tables. It supports stateless rules, stateful rules with Suricata-compatible intrusion prevention signatures, domain allow and deny lists for HTTP and TLS (using the SNI), and TLS inspection. It is typically deployed in a central inspection VPC connected through Transit Gateway, so all egress and east-west traffic is inspected in one place. Firewall Manager can deploy it across accounts.",
   "Route 53 Resolver DNS Firewall filters DNS queries that resources in a VPC send to the Route 53 Resolver. Rule groups match domain lists, including AWS managed lists of malware, botnet and threat domains, and can block (with an NXDOMAIN or custom response), alert or allow. It is the right tool to stop DNS-based exfiltration and lookups of malicious domains, whatever IP addresses those domains use. Remember the layers: DNS Firewall for names, Network Firewall for deep inspection and domain filtering of traffic, network ACLs for subnet IP blocks, security groups for workload rules."
  ],
  terms: [
   ["Security group", "A stateful, allow-only firewall attached to network interfaces."],
   ["Network ACL", "A stateless subnet firewall with numbered allow and deny rules evaluated in order."],
   ["AWS Network Firewall", "A managed stateful firewall and intrusion prevention service deployed in VPC subnets."],
   ["DNS Firewall", "A Route 53 Resolver feature that blocks or alerts on DNS queries for listed domains."]
  ],
  example: "A company routes egress from 30 VPCs through a central inspection VPC with Network Firewall, allowing only approved software update domains and running IPS rules. DNS Firewall blocks known malicious domains, and app instances accept database traffic only from the app tier's security group.",
  tip: "Need to deny a specific IP: network ACL. Need to reference another tier: security group. Need domain filtering or IPS on traffic: Network Firewall. Need to block DNS lookups: DNS Firewall.",
  check: [
   ["Why must network ACLs allow ephemeral ports?", "They are stateless, so return traffic to the client's ephemeral port needs its own allow rule."],
   ["How does Network Firewall filter HTTPS traffic by domain without decrypting it?", "It reads the Server Name Indication (SNI) in the TLS handshake."]
  ]
 },
 {
  t: "Private connectivity: gateway and interface VPC endpoints, endpoint policies, PrivateLink and Transit Gateway segmentation",
  body: [
   "Many workloads only need to talk to AWS services and to each other, not to the internet. Private connectivity keeps that traffic on the AWS network, removes the need for NAT and internet gateways, and adds places to enforce policy.",
   "Gateway endpoints exist for Amazon S3 and DynamoDB. They are added as routes in route tables, cost nothing and keep traffic private. Interface endpoints, powered by AWS PrivateLink, place elastic network interfaces with private IP addresses in your subnets for most other AWS services, such as KMS, Secrets Manager, STS and Systems Manager, and for services offered by other accounts or partners. They have security groups and, with private DNS, the normal service hostname resolves to the private addresses. They bill per hour and per GB.",
   "Endpoint policies are resource-style policies on the endpoint that limit what can be done through it, for example allowing only access to the company's own S3 buckets, which helps prevent data being copied to an attacker's bucket. On the other side, resource policies can require that requests come through a given endpoint or network: `aws:SourceVpce` for a specific endpoint, `aws:SourceVpc` for a VPC, and `aws:VpcSourceIp` for a private address. A common data perimeter combines endpoint policies (trusted resources), resource policies (trusted networks and identities, with `aws:PrincipalOrgID`) and SCPs or RCPs.",
   "PrivateLink also lets you publish your own service behind a Network Load Balancer to consumers in other VPCs or accounts, without peering or overlapping CIDR problems, and consumers can only reach that one service. Transit Gateway connects many VPCs and on-premises networks through a hub. Its route tables let you segment traffic, for example keeping production and development VPCs apart while both reach a shared services VPC and a central inspection VPC."
  ],
  terms: [
   ["Gateway endpoint", "A free route-table-based endpoint for private access to S3 or DynamoDB."],
   ["Interface endpoint", "An elastic network interface with a private IP that provides PrivateLink access to a service."],
   ["Endpoint policy", "A policy on a VPC endpoint that limits which actions and resources can be reached through it."],
   ["aws:SourceVpce", "A condition key holding the ID of the VPC endpoint a request came through."]
  ],
  example: "A bank's analytics VPC has no internet gateway. It reaches S3 through a gateway endpoint whose policy allows only buckets owned by the bank's organization, and reaches KMS and STS through interface endpoints. The data bucket policy denies any request not arriving through the analytics VPC endpoint.",
  tip: "S3 or DynamoDB with no hourly cost: gateway endpoint. Other services: interface endpoint. Restricting which buckets can be reached from the VPC: endpoint policy. Restricting which network can reach a bucket: bucket policy with aws:SourceVpce.",
  check: [
   ["Which two services support gateway endpoints?", "Amazon S3 and Amazon DynamoDB."],
   ["How does PrivateLink avoid problems with overlapping CIDR ranges?", "Consumers reach the service through an endpoint in their own VPC, so no routing between the VPCs is needed."]
  ]
 },
 {
  t: "Hybrid and remote access: Site-to-Site VPN, Direct Connect with MACsec, Client VPN and Verified Access",
  body: [
   "Workloads rarely live only in AWS. Offices, data centers and remote staff all need access, and each path must be encrypted and controlled.",
   "AWS Site-to-Site VPN creates IPsec tunnels over the internet between your customer gateway device and a virtual private gateway or Transit Gateway. Each connection has two tunnels for redundancy, and traffic is encrypted. AWS Direct Connect provides a private, dedicated network link from your premises to AWS, with consistent performance, but it is not encrypted by default. To encrypt it you can run a Site-to-Site VPN over a Direct Connect public or transit virtual interface, which gives IPsec at layer 3, or use MACsec, which encrypts at layer 2 between your router and the AWS Direct Connect device on supported dedicated connections at higher speeds. Many designs keep a VPN as a backup path for Direct Connect.",
   "AWS Client VPN is a managed OpenVPN-based service for individual users. It authenticates with Active Directory, SAML federation or mutual certificate authentication, and authorization rules and security groups limit which networks each group can reach. Connection logs go to CloudWatch Logs.",
   "AWS Verified Access follows a zero trust model: instead of putting users on a network, it checks every request to an application against policies that use the user's identity (from IAM Identity Center or another OIDC provider) and device posture (from device management partners). Users reach internal web and, increasingly, non-HTTP applications without a VPN, and every request is logged. On the exam, 'without a VPN' plus 'identity and device posture' means Verified Access, while 'connect two networks' means Site-to-Site VPN or Direct Connect."
  ],
  terms: [
   ["Site-to-Site VPN", "An IPsec VPN with two tunnels between an on-premises gateway and AWS."],
   ["Direct Connect", "A private, dedicated network connection to AWS that is not encrypted by default."],
   ["MACsec", "IEEE 802.1AE layer-2 encryption available on supported Direct Connect dedicated connections."],
   ["Verified Access", "A zero trust service that grants access to applications per request based on identity and device posture."]
  ],
  example: "A retailer links its data center with a 10 Gbps Direct Connect using MACsec, keeps a Site-to-Site VPN as backup, gives administrators Client VPN with SAML sign-in, and lets store staff reach an internal inventory web app through Verified Access with device posture checks.",
  tip: "Direct Connect is private but not encrypted. Encryption over it means MACsec (layer 2) or VPN over Direct Connect (IPsec, layer 3).",
  check: [
   ["How many tunnels does each Site-to-Site VPN connection have?", "Two, for redundancy."],
   ["What two signals can Verified Access policies use?", "User identity and device security posture."]
  ]
 },
 {
  t: "Securing compute: Session Manager instead of SSH, IMDSv2, patching with Patch Manager and hardened images",
  body: [
   "Compute security on AWS means reducing how people and attackers reach instances, protecting credentials on them, and keeping software current. Systems Manager provides most of the tools.",
   "Session Manager gives interactive shell or PowerShell access through the SSM Agent, which makes outbound HTTPS connections to Systems Manager. No inbound ports, bastion hosts or SSH keys are needed. Access is controlled by IAM policies, sessions can be logged to S3 and CloudWatch Logs and encrypted with KMS, and port forwarding is available. Instances need the agent, an instance profile with the `AmazonSSMManagedInstanceCore` policy, and a network path to Systems Manager, through the internet or interface endpoints. EC2 Instance Connect Endpoint is another option for SSH to private instances without public IPs.",
   "The instance metadata service (IMDS) at 169.254.169.254 hands out the instance role's temporary credentials. IMDSv1 answers simple GET requests, which server-side request forgery (SSRF) flaws can abuse. IMDSv2 requires a session token obtained with a PUT request and passed in a header, which blocks most SSRF and open-proxy attacks, and a hop limit of 1 keeps containers from reaching it. Require IMDSv2 on launch templates and existing instances, enforce it with the `ec2:MetadataHttpTokens` condition in SCPs, or set it as an account or organization default with declarative policies.",
   "Patch Manager scans and installs patches on a schedule using patch baselines and maintenance windows, and reports compliance. Build hardened images with EC2 Image Builder pipelines that apply CIS-style settings, install agents and run tests, so every instance starts from a known-good state. Treat instances as replaceable: redeploy from a new image rather than changing servers by hand. For containers and Lambda, use minimal base images, scan them, and give each task or function its own least-privilege role."
  ],
  terms: [
   ["Session Manager", "A Systems Manager capability that provides audited shell access without open inbound ports or SSH keys."],
   ["IMDSv2", "The token-based version of the instance metadata service that protects instance credentials from SSRF."],
   ["Patch baseline", "A Patch Manager rule set defining which patches are approved for installation."],
   ["EC2 Image Builder", "A service that automates building, hardening and testing machine images."]
  ],
  example: "After a penetration test finds an SSRF flaw, a company requires IMDSv2 on all instances with a declarative policy, removes SSH from every security group, and moves administrators to Session Manager with sessions logged to an encrypted S3 bucket. New AMIs come from an Image Builder pipeline patched weekly.",
  tip: "No open ports, no keys, audited sessions: Session Manager. Protect instance role credentials from SSRF: require IMDSv2.",
  check: [
   ["What does a Session Manager managed instance need?", "The SSM Agent, an instance profile with the needed Systems Manager permissions, and network access to Systems Manager endpoints."],
   ["Why does IMDSv2 stop most SSRF attacks?", "The attacker's forged request cannot perform the PUT with the special header needed to get a session token."]
  ]
 },
 {
  t: "Vulnerability management with Amazon Inspector for EC2 instances, ECR container images and Lambda functions",
  body: [
   "Vulnerability management means continuously finding known weaknesses in software and exposure, ranking them, and fixing the most important first. Amazon Inspector automates the finding part for EC2, container images and Lambda.",
   "Inspector scans EC2 instances for operating system and application package vulnerabilities (CVEs) using the Systems Manager agent, or agentless scanning of EBS snapshots for instances without the agent. It also produces network reachability findings, which show ports reachable from the internet or other networks through security groups, network ACLs and gateways. It scans container images in Amazon ECR when they are pushed and continuously afterwards, as new CVEs are published. For Lambda, standard scanning checks package dependencies, and code scanning looks for issues such as injection flaws and hard-coded secrets in function code. Inspector can also check instances against CIS benchmarks and produce a software bill of materials (SBOM) export.",
   "Each finding has an Inspector score, which adjusts the base CVSS score using your environment, for example lowering it if the vulnerable port is not reachable, plus details on exploit availability and a fix version. Findings go to the Inspector console, Security Hub and EventBridge, so you can open tickets or trigger patching with Systems Manager. Suppression rules hide accepted risks. Across an organization, a delegated administrator enables Inspector for all accounts and new ones automatically.",
   "Inspector does not scan your application's live web interface for issues like XSS in running pages, and it does not find sensitive data; that is Macie. In the exam, 'CVEs in EC2, ECR images or Lambda' means Inspector, and 'automatically patch' means Systems Manager Patch Manager acting on those findings."
  ],
  terms: [
   ["CVE", "Common Vulnerabilities and Exposures, a public identifier for a known software vulnerability."],
   ["Network reachability finding", "An Inspector finding showing that a port on an instance can be reached from outside."],
   ["Inspector score", "A risk score based on CVSS and adjusted using details of your environment."],
   ["SBOM", "Software bill of materials, a list of the packages and versions in a workload."]
  ],
  example: "A team turns on Inspector through its delegated administrator. When a critical CVE is announced in a logging library, Inspector flags 40 ECR images and 12 Lambda functions within hours, and EventBridge opens tickets for owners. Patch Manager updates the affected EC2 instances in the next maintenance window.",
  tip: "Inspector finds vulnerabilities; it does not fix them. Pair it with Patch Manager, image rebuilds or code changes. Do not confuse it with GuardDuty (threats) or Macie (sensitive data).",
  check: [
   ["How can Inspector scan an EC2 instance without the SSM Agent?", "With agentless scanning, which analyzes snapshots of the instance's EBS volumes."],
   ["When does Inspector rescan an ECR image?", "When it is pushed and continuously afterwards as new vulnerabilities are published."]
  ]
 },
 {
  t: "Network troubleshooting and analysis: VPC Reachability Analyzer, Network Access Analyzer and Traffic Mirroring",
  body: [
   "Network security problems come in two kinds: something that should connect does not, and something that should not connect can. AWS has analysis tools for both, and the exam expects you to know which is which.",
   "VPC Reachability Analyzer answers 'can A reach B, and if not, why?'. You choose a source and destination, such as an instance, network interface, internet gateway, Transit Gateway attachment or VPC endpoint, plus protocol and port. It builds a model of your configuration, route tables, security groups, network ACLs, gateways, peering and load balancers, and reports whether a path exists. If not, it names the blocking component, such as a missing route or a network ACL rule. It does not send any packets, so it is safe to run on production. Each analysis has a small charge.",
   "Network Access Analyzer answers 'what can reach what, that should not?'. You define a Network Access Scope, such as 'no path from the internet to the database subnets' or 'all traffic from production to the internet must pass the firewall', and it finds every path that breaks it. It is suited to checking segmentation and compliance across whole VPCs rather than one connection.",
   "VPC Traffic Mirroring copies real packets from an elastic network interface to a target, such as a Network Load Balancer or an instance running intrusion detection or packet capture software. Filters limit which traffic is copied. Use it for deep inspection and forensics, when flow logs' metadata is not enough. Together with flow logs, which show accepted and rejected flows, these tools let you move from 'something is wrong' to the exact rule or route responsible."
  ],
  terms: [
   ["Reachability Analyzer", "A tool that analyzes configuration to show whether a network path exists between two resources and what blocks it."],
   ["Network Access Analyzer", "A tool that finds network paths that violate a defined Network Access Scope."],
   ["Network Access Scope", "A definition of which network access is or is not allowed, used by Network Access Analyzer."],
   ["Mirror filter", "Rules that choose which traffic Traffic Mirroring copies."]
  ],
  example: "An application cannot reach its database after a change. Reachability Analyzer shows the path is blocked by a network ACL outbound rule missing ephemeral ports. Later, the security team runs Network Access Analyzer to confirm that no database subnet is reachable from any internet gateway.",
  tip: "One path, why is it blocked: Reachability Analyzer. All unintended paths across the network: Network Access Analyzer. Actual packet contents: Traffic Mirroring.",
  check: [
   ["Does Reachability Analyzer send test traffic?", "No. It analyzes configuration only, so it does not affect production traffic."],
   ["Which tool would you use to prove that no path exists from the internet to a database subnet?", "Network Access Analyzer with a scope describing that forbidden access."]
  ]
 },
 {
  t: "IAM policy types and evaluation logic: identity-based, resource-based, permissions boundaries, session policies and explicit deny",
  body: [
   "AWS Identity and Access Management (IAM) decides every request with the same logic, and the exam tests it in many disguises. Learn the policy types and the order of reasoning, and most access questions become straightforward.",
   "Identity-based policies attach to users, groups and roles and say what that identity can do. Resource-based policies attach to resources, such as S3 bucket policies, KMS key policies, SQS queue policies, Secrets Manager secret policies and role trust policies, and name the principals allowed. Guardrails limit maximum permissions without granting any: service control policies (SCPs) limit principals in member accounts, resource control policies (RCPs) limit access to resources in member accounts, permissions boundaries limit a single user or role, and session policies, passed when assuming a role or federating, limit that one session.",
   "Evaluation works like this. Every request starts as an implicit deny. AWS gathers all applicable policies. If any has an explicit Deny that matches, the request is denied, full stop. Otherwise, each guardrail that applies (SCP, RCP, boundary, session policy) must allow the action, and there must be an Allow from an identity-based or resource-based policy. Within the same account, an allow in either the identity policy or the resource policy is enough; one exception is that KMS key policies and role trust policies must themselves allow access. Across accounts, both the caller's identity policy and the resource's policy must allow it.",
   "Some details matter. SCPs and RCPs do not apply to the management account, and SCPs do not restrict service-linked roles. An explicit deny anywhere always wins, whichever policy type it sits in. When you read an access denied question, look first for explicit denies, then for missing guardrail allows, then for a missing allow on the right side of a cross-account request."
  ],
  terms: [
   ["Implicit deny", "The default result for any request that no policy allows."],
   ["Explicit deny", "A Deny statement that matches a request and overrides every Allow."],
   ["Permissions boundary", "A managed policy that sets the maximum permissions for one IAM user or role."],
   ["Session policy", "A policy passed when creating a temporary session that further limits that session's permissions."]
  ],
  example: "A role has an identity policy allowing `s3:*`, but a request to delete a bucket fails. The error message names a service control policy, and the SCP on the OU denies `s3:DeleteBucket` for all but a platform role. No identity policy change can override it.",
  tip: "Guardrails (SCPs, RCPs, boundaries, session policies) never grant anything; they only cap. If every answer choice adds a guardrail allow but no identity or resource allow, none of them will make the request succeed.",
  check: [
   ["In one account, a bucket policy allows a role to read objects but the role's identity policy says nothing. Is the read allowed?", "Yes, assuming no deny or guardrail blocks it, because an allow in either policy is enough in the same account."],
   ["Do SCPs restrict the management account?", "No. SCPs never apply to users or roles in the management account."]
  ]
 },
 {
  t: "Writing least-privilege policies: condition keys, attribute-based access control with tags, and policy variables",
  body: [
   "Least privilege means each identity has only the permissions it needs, for only the resources it needs, under only the conditions it needs. IAM gives you three levers: specific actions, specific resource ARNs, and conditions.",
   "Condition keys narrow when a statement applies. Global keys include `aws:SourceIp`, `aws:SourceVpc` and `aws:SourceVpce` for network origin, `aws:SecureTransport` for TLS, `aws:MultiFactorAuthPresent` and `aws:MultiFactorAuthAge` for MFA, `aws:PrincipalOrgID` and `aws:ResourceOrgID` for organization membership, `aws:RequestedRegion` for Regions and `aws:CalledVia` for requests made by services on your behalf. Service keys add detail, such as `s3:prefix`, `kms:ViaService` or `ec2:InstanceType`. Condition operators such as `StringEquals`, `StringLike`, `ArnLike`, `IpAddress`, `Bool` and `Null`, and the `ForAllValues` and `ForAnyValue` set operators, control the comparison.",
   "Attribute-based access control (ABAC) uses tags instead of listing resources. A policy can allow actions when `aws:ResourceTag/project` equals `${aws:PrincipalTag/project}`, so an engineer tagged project=blue can manage only blue resources. Use `aws:RequestTag` and `aws:TagKeys` to control which tags can be set at creation, and deny changes to tags that grant access, or users can re-tag themselves into other projects. Principal tags can come from IAM, or as session tags from your identity provider through federation, which makes ABAC scale with your directory.",
   "Policy variables insert request values into policies. `arn:aws:s3:::home-bucket/${aws:username}/*` gives each IAM user their own prefix, and `${cognito-identity.amazonaws.com:sub}` does the same for Cognito identities. Validate policies with IAM Access Analyzer policy validation, which flags errors and overly broad grants, and test them with the policy simulator before deployment."
  ],
  terms: [
   ["Condition key", "A named value in the request context, such as aws:SourceIp, that a policy condition can test."],
   ["ABAC", "Attribute-based access control: granting access by comparing tags on principals and resources."],
   ["Policy variable", "A placeholder such as ${aws:username} that IAM replaces with a value from the request."],
   ["Session tags", "Tags passed when assuming a role or federating, used as principal tags for that session."]
  ],
  example: "A company with 300 project teams writes one ABAC policy: engineers can start, stop and reboot EC2 instances only where the project tag matches their own, can create instances only with their project tag, and cannot change project tags. New teams need no new policies, only tags from the identity provider.",
  tip: "ABAC questions often include a trap where users could change their own tags or a resource's tags. The complete answer also restricts tagging actions.",
  check: [
   ["Which condition key limits a policy to requests from your own AWS organization?", "aws:PrincipalOrgID."],
   ["How does a policy variable help give each user a private S3 folder?", "The resource ARN includes ${aws:username}, so each user's allow applies only to the prefix matching their name."]
  ]
 },
 {
  t: "Temporary credentials: IAM roles, STS AssumeRole, trust policies, external IDs and the confused deputy problem",
  body: [
   "IAM roles are the preferred way to grant access on AWS because they use temporary credentials that expire automatically. The AWS Security Token Service (STS) issues these credentials when a trusted principal assumes the role.",
   "A role has two policies. The trust policy is a resource-based policy that says who can assume the role, with a Principal such as an AWS account, a specific role, a service like `ec2.amazonaws.com` or `lambda.amazonaws.com`, or a federated identity provider. The permissions policies say what the role can do once assumed. `sts:AssumeRole` returns an access key ID, secret access key and session token, valid for a set duration up to the role's maximum session duration. Variants include `AssumeRoleWithSAML` and `AssumeRoleWithWebIdentity` for federation. Services such as EC2 (through instance profiles), Lambda and ECS assume roles for you and rotate the credentials automatically.",
   "For cross-account access, the role in account B trusts account A or a specific principal in it, and account A's identity policy must allow `sts:AssumeRole` on that role's ARN. CloudTrail in both accounts records the AssumeRole call, and the session name helps trace who used it. Role chaining, assuming a second role from a role session, limits the session to one hour.",
   "The confused deputy problem happens when a trusted party with access to many customers is tricked into using that access for the wrong one. For third parties, require a unique `sts:ExternalId` condition in the trust policy, agreed with the vendor per customer. For AWS services acting on your behalf, for example SNS receiving events from S3 or a service writing logs to your bucket, add `aws:SourceArn` and `aws:SourceAccount` conditions in resource policies so only your resources can trigger the service's access."
  ],
  terms: [
   ["Trust policy", "The resource-based policy on a role that specifies who can assume it."],
   ["AWS STS", "The Security Token Service, which issues temporary credentials for roles and federated users."],
   ["External ID", "A unique value required in a role's trust policy to prevent confused deputy attacks by third parties."],
   ["Confused deputy", "A situation where a trusted entity is tricked into using its permissions on behalf of an unauthorized party."]
  ],
  example: "A cost analytics vendor needs read access to a customer's billing data. The customer creates a role that trusts the vendor's AWS account with the condition `sts:ExternalId` set to a value the vendor generated for this customer. Another vendor customer who learns the role ARN cannot make the vendor assume it, because they do not have the right external ID.",
  tip: "Third-party vendor assuming a role: external ID. AWS service principal writing to or publishing into your resource: aws:SourceArn and aws:SourceAccount. Both prevent confused deputy problems.",
  check: [
   ["What two things are needed for a principal in account A to assume a role in account B?", "The role's trust policy in B must allow the principal or account A, and an identity policy in A must allow sts:AssumeRole on the role."],
   ["What is the maximum session duration for role chaining?", "One hour."]
  ]
 },
 {
  t: "Workforce identity: IAM Identity Center, permission sets, SAML 2.0 federation, SCIM provisioning and MFA",
  body: [
   "Workforce identity is how employees and contractors sign in to AWS. The recommended approach is one central place for identities, short-term credentials and no IAM users for people.",
   "AWS IAM Identity Center (the successor to AWS Single Sign-On) is enabled in the management account, usually with a delegated administrator. Its identity source can be the built-in Identity Center directory, Active Directory (AWS Managed Microsoft AD or self-managed AD through AD Connector), or an external identity provider such as Microsoft Entra ID, Okta or Google Workspace over SAML 2.0. With an external IdP, SCIM (System for Cross-domain Identity Management) provisioning keeps users and groups in sync automatically, so when HR disables someone in the IdP, they lose access to AWS.",
   "Access is defined with permission sets: collections of AWS managed, customer managed and inline policies, an optional permissions boundary and a session duration. When you assign a group and a permission set to an account, Identity Center creates a matching IAM role (named with an AWSReservedSSO prefix) in that account. Users sign in to the AWS access portal, choose an account and role, and get temporary credentials for the console or CLI (`aws configure sso`). Attributes from the IdP can be passed as session tags for ABAC.",
   "Require MFA in Identity Center or at the IdP, and prefer phishing-resistant methods such as FIDO2 security keys and passkeys. Identity Center can also provide single sign-on to SAML applications and to AWS managed applications. Direct IAM SAML federation per account still works, but it does not scale to many accounts and needs separate identity providers and roles in each one."
  ],
  terms: [
   ["IAM Identity Center", "The AWS service for central workforce sign-in and access to multiple accounts and applications."],
   ["Permission set", "A template of policies that Identity Center turns into roles in assigned accounts."],
   ["SCIM", "A standard for automatically provisioning and deprovisioning users and groups between systems."],
   ["SAML 2.0", "An XML-based standard for exchanging authentication assertions between an identity provider and a service."]
  ],
  example: "A company connects Identity Center to its Okta tenant with SAML and SCIM. The Developers group gets a PowerUser permission set in development accounts and ReadOnly in production. When an engineer leaves, disabling them in Okta removes their access to all 40 AWS accounts within minutes.",
  tip: "Many accounts plus an existing corporate IdP: IAM Identity Center with SAML and SCIM. IAM users for people, or per-account SAML setups, are usually the wrong answer at scale.",
  check: [
   ["What does Identity Center create in an account when you assign a permission set?", "An IAM role with the permission set's policies, which users assume through the access portal."],
   ["What does SCIM add to SAML federation?", "Automatic creation, update and removal of users and groups, so changes in the IdP flow to AWS."]
  ]
 },
 {
  t: "Application and customer identity: Amazon Cognito user pools vs identity pools, and Amazon Verified Permissions",
  body: [
   "Applications have their own users: customers of a shopping site, users of a mobile app, partners of a portal. These identities should not be IAM users. Amazon Cognito and Amazon Verified Permissions handle authentication and authorization for them.",
   "A Cognito user pool is a user directory and sign-in service. It handles sign-up, sign-in, password policies, email and phone verification, MFA, account recovery and federation with social providers (such as Google or Apple) and enterprise SAML or OIDC providers. After sign-in it issues JSON Web Tokens: an ID token about the user, an access token for your APIs and a refresh token. API Gateway and Application Load Balancers can validate these tokens directly. Threat protection features can detect compromised credentials and adapt authentication based on risk.",
   "A Cognito identity pool (federated identities) exchanges a token, from a user pool, a social provider, SAML or OIDC, for temporary AWS credentials by assuming an IAM role. You can map authenticated and unauthenticated (guest) users to different roles, choose roles by rules or token claims, and use principal tags for fine-grained access. Policy variables such as `${cognito-identity.amazonaws.com:sub}` can limit each user to their own S3 prefix or DynamoDB items. Remember: user pool equals who the user is; identity pool equals AWS credentials.",
   "Amazon Verified Permissions handles fine-grained authorization inside your application. You write policies in Cedar, an open policy language, for example permit editors to update documents in folders they own, store them in a policy store, and call the service with a principal, action, resource and context to get allow or deny. It integrates with Cognito user pools as an identity source and can be used as an API Gateway authorizer. Keeping rules outside the code makes them easier to audit and change."
  ],
  terms: [
   ["User pool", "A Cognito user directory that authenticates users and issues JWT tokens."],
   ["Identity pool", "A Cognito feature that exchanges identity tokens for temporary AWS credentials through IAM roles."],
   ["JWT", "JSON Web Token, a signed token that carries claims about a user."],
   ["Cedar", "The open policy language used by Amazon Verified Permissions for application authorization."]
  ],
  example: "A photo app uses a Cognito user pool for sign-in with Apple and Google. Its identity pool gives each signed-in user temporary credentials that allow uploads only to `photos/${cognito-identity.amazonaws.com:sub}/`. Sharing rules, such as who can view an album, are Cedar policies evaluated by Verified Permissions.",
  tip: "Sign-in and tokens: user pool. AWS credentials for app users: identity pool. Business rules for who can do what inside the app: Verified Permissions.",
  check: [
   ["Can a user pool alone let a mobile app upload directly to S3?", "No. It issues JWTs; an identity pool is needed to exchange them for AWS credentials."],
   ["What language does Verified Permissions use?", "Cedar."]
  ]
 },
 {
  t: "Workload identity outside AWS: IAM Roles Anywhere, OIDC federation for CI/CD pipelines, and EKS Pod Identity",
  body: [
   "Long-term access keys on servers and in pipelines are among the most common causes of breaches. AWS offers ways for workloads outside AWS, and workloads in Kubernetes, to get short-term credentials instead.",
   "IAM Roles Anywhere is for servers, containers and applications running outside AWS, such as in a data center, that can hold an X.509 certificate. You create a trust anchor pointing to your certificate authority, either AWS Private CA or your own CA's certificate, and a profile that lists which roles can be used and any session policies. The role's trust policy allows `rolesanywhere.amazonaws.com` and can check certificate attributes, such as the subject common name. On the server, the credential helper signs a request with the certificate's private key and receives temporary credentials. Revoke access by revoking certificates (with an imported CRL) or disabling the trust anchor.",
   "CI/CD systems such as GitHub Actions, GitLab and others issue OIDC tokens for each job. You register the provider as an IAM OIDC identity provider and create a role whose trust policy allows `sts:AssumeRoleWithWebIdentity` from that provider, with conditions on the token's audience (`aud`) and subject (`sub`) claims, for example only the main branch of one repository. The pipeline assumes the role per run and never stores keys. Missing or wildcard `sub` conditions are a serious mistake, because any repository on that platform could then assume your role.",
   "Inside Amazon EKS, pods should not use the node's instance role. EKS Pod Identity associates an IAM role with a Kubernetes service account through the EKS API, and the Pod Identity Agent delivers credentials to the pods. The older IAM Roles for Service Accounts (IRSA) uses the cluster's OIDC provider and `AssumeRoleWithWebIdentity`. Both give each workload its own least-privilege role."
  ],
  terms: [
   ["IAM Roles Anywhere", "A service that lets workloads outside AWS exchange X.509 certificates for temporary role credentials."],
   ["Trust anchor", "The CA certificate that Roles Anywhere uses to verify workload certificates."],
   ["OIDC federation", "Trusting tokens from an OpenID Connect provider to assume an IAM role with AssumeRoleWithWebIdentity."],
   ["EKS Pod Identity", "An EKS feature that maps an IAM role to a Kubernetes service account for pod credentials."]
  ],
  example: "A company removes all access keys from its build system. GitHub Actions workflows assume a deploy role only when the token's sub is `repo:acme/web:ref:refs/heads/main`, and on-premises batch servers use Roles Anywhere with certificates from AWS Private CA.",
  tip: "Outside AWS with certificates: Roles Anywhere. Pipelines with OIDC tokens: OIDC identity provider plus a role with strict sub conditions. Pods in EKS: Pod Identity or IRSA, never the node role.",
  check: [
   ["What does the sub condition in a GitHub OIDC trust policy protect against?", "Other repositories or branches on the same platform assuming your role."],
   ["How do you revoke a Roles Anywhere server's access?", "Revoke its certificate through an imported CRL or disable the trust anchor or profile."]
  ]
 },
 {
  t: "Root user and credential hygiene: protecting the root user, centralized root access, removing long-term keys and credential reports",
  body: [
   "Every AWS account has a root user with complete control, including tasks no IAM policy can grant, such as changing account settings, closing the account or restoring a locked S3 bucket policy. Protecting it, and cleaning up long-term credentials in general, is basic hygiene the exam expects.",
   "For a standalone account: use a strong unique password, turn on MFA (ideally a hardware key or passkey, and you can register several devices), never create root access keys and delete any that exist, keep the root email address on a monitored distribution list, and alert on root sign-ins with an EventBridge rule or CloudWatch alarm. Use root only for the few tasks that need it.",
   "In AWS Organizations, centralized root access management goes further. From the management account or a delegated administrator, you can remove root credentials (password, access keys, MFA devices and signing certificates) from member accounts, and new accounts can be created without them. When a privileged root task is needed, such as unlocking an S3 bucket policy that denies everyone or deleting a misconfigured SQS policy, the central account uses `sts:AssumeRoot` to get a short-term root session scoped to that task. SCPs can also deny actions by the root user in member accounts.",
   "For IAM users, the credential report is a CSV listing every user with password and access key status, age and last use, and MFA status. Use it to find keys older than your rotation policy, unused keys and users without MFA. IAM last-accessed data shows which services a user or role actually uses. The best fix is to replace IAM users with Identity Center for people and roles for workloads, then delete the remaining access keys. Where keys must stay, rotate them by creating a second key, updating the application, then deactivating and deleting the old one."
  ],
  terms: [
   ["Root user", "The identity created with an AWS account, with complete access that IAM policies cannot limit in a standalone account."],
   ["Centralized root access", "An Organizations feature to remove member account root credentials and perform root tasks through short-term sessions."],
   ["sts:AssumeRoot", "The STS action used to get a task-scoped root session for a member account."],
   ["Credential report", "An IAM CSV report of all users' passwords, access keys, their ages and MFA status."]
  ],
  example: "A company with 150 accounts enables centralized root access and removes root passwords from all member accounts. Months later, an engineer locks everyone out of a bucket with a bad policy; the security team uses a root session from the delegated administrator account to delete the bucket policy, and CloudTrail records the action.",
  tip: "Root access keys should never exist. For many member accounts, the modern answer is centralized root access management, not a drawer full of MFA devices.",
  check: [
   ["What IAM report lists access key ages and MFA status for all users?", "The credential report."],
   ["Name a task that needs root even with IAM admin permissions.", "Unlocking an S3 bucket whose policy denies all principals, or closing the account."]
  ]
 },
 {
  t: "Finding and removing excess access: IAM Access Analyzer external and unused access findings, policy generation and last-accessed data",
  body: [
   "Permissions tend to grow. Roles are created with broad access to get a project working, resources are shared with partners and never unshared, and old users keep their keys. IAM Access Analyzer and last-accessed data help you find and remove this excess.",
   "An external access analyzer uses automated reasoning to read resource-based policies and reports resources that grant access to principals outside your zone of trust, which is either your account or your whole organization. It covers S3 buckets, IAM role trust policies, KMS keys, Lambda functions and layers, SQS queues, Secrets Manager secrets, SNS topics, EBS and RDS snapshots, ECR repositories, EFS file systems, DynamoDB tables and streams, and more. You review each finding and either archive it as intended, with archive rules for repeated patterns, or remove the access. Findings update as policies change.",
   "An unused access analyzer, a paid feature, reports unused roles, unused IAM user passwords and access keys, and unused service and action permissions, based on a tracking period you choose. It turns 'least privilege' from a goal into a to-do list, and it can suggest policy changes to remove unused permissions.",
   "Policy generation builds a starting policy for a role or user from its CloudTrail activity over a chosen period, listing the services and actions it actually used, which you then refine with resources and conditions. Policy validation checks policies for errors, security warnings and overly permissive statements, and custom policy checks can fail a pipeline when a policy grants new access or specific sensitive actions. Last-accessed information in the IAM console and APIs shows when each service, and for some services each action, was last used, which helps you trim policies and SCPs safely."
  ],
  terms: [
   ["Zone of trust", "The account or organization that Access Analyzer treats as trusted when reporting external access."],
   ["External access finding", "A report that a resource policy allows access from outside the zone of trust."],
   ["Unused access finding", "A report of unused roles, credentials or permissions over a tracking period."],
   ["Archive rule", "A rule that automatically archives Access Analyzer findings that match expected patterns."]
  ],
  example: "A company creates an organization-wide external access analyzer and finds 14 S3 buckets and two KMS keys shared with a former vendor's account. It removes the grants, archives findings for an approved auditor account with a rule, and turns on unused access analysis, which shows 60 roles unused for 90 days that are then deleted.",
  tip: "Shared outside the account or organization: external access analyzer. Never used: unused access analyzer. Build a policy from what a role actually did: policy generation.",
  check: [
   ["What decides whether Access Analyzer treats a principal as external?", "The zone of trust you choose: the account or the organization."],
   ["What source does policy generation use?", "The principal's CloudTrail activity over a chosen period."]
  ]
 },
 {
  t: "Troubleshooting access denied errors: reading the error message, CloudTrail, the IAM policy simulator and cross-account checks",
  body: [
   "Access denied errors are the most common IAM problem, and the exam gives you error messages, policies and scenarios to diagnose. A calm, step-by-step approach finds the cause quickly.",
   "Start with the error message. Many AWS services now say which policy type caused the denial and whether it was implicit or explicit: for example 'with an explicit deny in a service control policy', 'because no identity-based policy allows the action', or 'with an explicit deny in a resource-based policy'. That points you straight to the SCP, the identity policy or the resource policy. Encoded authorization messages from EC2 can be decoded with `aws sts decode-authorization-message`.",
   "Then check CloudTrail. The event for the failed call shows the exact principal (user, role and session name), the action, the resource, the source IP and the error code, `AccessDenied` or `UnauthorizedOperation`. Often the surprise is that the call was made by a different role than you expected, for a different resource, or in a different Region. Confirm who you are with `aws sts get-caller-identity`.",
   "Then test. The IAM policy simulator evaluates identity policies, boundaries, SCPs and optionally resource policies for a principal, action and resource, and shows which statement allowed or denied it. Remember the usual suspects: an explicit deny in an SCP, RCP, boundary, session policy, bucket or key policy; a guardrail with no allow for the action; a condition that does not match, such as missing MFA, wrong source VPC or wrong tag; a KMS key policy that does not allow the principal when the data is encrypted; and, for cross-account calls, a missing allow on one side. S3 ACLs and Object Ownership settings and VPC endpoint policies are also frequent hidden causes."
  ],
  terms: [
   ["AccessDenied", "The error code returned when an authorization check fails for a request."],
   ["Policy simulator", "An IAM tool that evaluates policies for a principal, action and resource and explains the result."],
   ["decode-authorization-message", "An STS command that decodes the detailed reason in some encoded access denied errors."],
   ["get-caller-identity", "An STS call that returns the account, ARN and user ID of the credentials in use."]
  ],
  example: "A Lambda function gets AccessDenied reading an S3 object even though its role allows `s3:GetObject`. CloudTrail shows the request came through a VPC endpoint whose policy allows only specific buckets, and the object is encrypted with a KMS key whose policy does not include the role. Fixing both resolves the error.",
  tip: "For encrypted data, access needs permission on both the data (S3, EBS, RDS) and the KMS key. Many 'I have s3:GetObject but still get AccessDenied' questions are really KMS or endpoint policy questions.",
  check: [
   ["An error says 'no identity-based policy allows the action'. Where do you fix it?", "Add an allow to the principal's identity-based policy (or add an appropriate resource-based policy allow)."],
   ["Which command confirms which role your CLI is actually using?", "aws sts get-caller-identity."]
  ]
 },
 {
  t: "Encryption in transit: TLS certificates from ACM, ELB security policies, enforcing aws:SecureTransport and inter-node encryption",
  body: [
   "Encryption in transit protects data as it moves between users, services and nodes, so it cannot be read or changed on the network. On AWS that mostly means Transport Layer Security (TLS), plus encryption features built into specific services.",
   "AWS Certificate Manager (ACM) provides TLS certificates for integrated services such as Elastic Load Balancing, CloudFront and API Gateway. Public certificates are validated by DNS or email; DNS-validated ones renew automatically as long as the validation record stays in place. Certificates for CloudFront must be in us-east-1. ACM imports third-party certificates too, but those do not renew automatically, so monitor their expiry with the days-to-expiry metric or AWS Config rules. For internal services, AWS Private CA issues private certificates.",
   "Load balancers terminate or pass through TLS. On an Application Load Balancer or Network Load Balancer TLS listener, the security policy decides which TLS versions and ciphers are allowed; choose a policy that allows only TLS 1.2 and 1.3, or a FIPS or post-quantum policy where required. Redirect HTTP to HTTPS on the ALB listener. For end-to-end encryption, re-encrypt to targets over HTTPS, or use a TCP listener on an NLB to pass TLS through untouched when the target must see the original connection or perform mutual TLS. ALBs also support mutual TLS (mTLS) with a trust store.",
   "Enforce TLS with policies. A bucket, queue or topic policy can deny any request where `aws:SecureTransport` is `false`. RDS and Aurora can require TLS through parameters such as `rds.force_ssl`. Inside clusters, turn on service-specific encryption between nodes: for example EMR security configurations with in-transit encryption, ElastiCache and OpenSearch node-to-node encryption, and inter-container encryption for SageMaker AI training. Traffic between instances on many modern Nitro instance types is also encrypted automatically at the hardware level within a Region."
  ],
  terms: [
   ["ACM", "AWS Certificate Manager, which provisions, deploys and renews TLS certificates for AWS services."],
   ["ELB security policy", "A predefined set of TLS protocol versions and ciphers a load balancer listener accepts."],
   ["aws:SecureTransport", "A condition key that is true when a request arrives over TLS."],
   ["Mutual TLS", "TLS in which both the client and server present certificates to authenticate each other."]
  ],
  example: "A healthcare API must use only TLS 1.2 or later. The team chooses a TLS 1.2+ security policy on the ALB, redirects port 80 to 443, re-encrypts to targets over HTTPS, adds a deny on `aws:SecureTransport` false to the S3 buckets and turns on node-to-node encryption for its OpenSearch domain.",
  tip: "To require TLS for S3, use an explicit Deny when aws:SecureTransport is false; an Allow with true is not enough because other statements could still allow HTTP.",
  check: [
   ["Which ACM certificates renew automatically?", "ACM-issued certificates that are DNS validated (with the record still present) and in use; imported certificates do not."],
   ["Why use an NLB TCP listener instead of a TLS listener?", "To pass encrypted traffic through to targets unchanged, for example when targets must terminate TLS themselves."]
  ]
 },
 {
  t: "AWS KMS fundamentals: key types, key policies, grants, envelope encryption, encryption context and key rotation",
  body: [
   "AWS Key Management Service (KMS) creates and controls cryptographic keys that never leave its hardware security modules unencrypted. Most AWS services use KMS for encryption at rest, so KMS appears throughout the exam.",
   "Keys come in types. Customer managed keys are created and controlled by you: you write the key policy, enable or disable them, set rotation and schedule deletion (with a waiting period of 7 to 30 days). AWS managed keys (aliases such as `aws/s3` or `aws/ebs`) are created by services in your account; you can see and audit them, but not change their policies. AWS owned keys are used by services across many accounts and are invisible to you. By algorithm, keys are symmetric (AES-256, the default and the only type most services use), asymmetric (RSA or elliptic curve, for encryption or signing outside AWS) or HMAC keys.",
   "The key policy is the primary access control. Every key has one, and IAM policies only work for a key if its key policy allows the account, usually with the default statement giving the account root principal `kms:*`. Separate key administrators from key users. Grants delegate specific operations to a principal programmatically and can be retired, which is how services such as EBS use your key on your behalf. The `kms:ViaService` condition limits use to requests through a given service, such as S3 in one Region.",
   "KMS encrypts at most 4 KB directly, so larger data uses envelope encryption: `GenerateDataKey` returns a plaintext data key and the same key encrypted under the KMS key; you encrypt data locally, discard the plaintext key and store the encrypted data key with the data. Encryption context is a set of non-secret key-value pairs bound to the ciphertext; the same context must be supplied to decrypt, it appears in CloudTrail, and policies can require it. Automatic rotation for customer managed symmetric keys creates new key material on a schedule you choose, yearly by default, and on-demand rotation is also possible; old material is kept so existing ciphertext still decrypts, and the key ID stays the same."
  ],
  terms: [
   ["Customer managed key", "A KMS key you create and fully control, including its policy, rotation and deletion."],
   ["Key policy", "The resource-based policy on a KMS key; it must allow access before IAM policies can grant it."],
   ["Grant", "A KMS mechanism that delegates specific key operations to a principal and can be retired or revoked."],
   ["Encryption context", "Non-secret key-value data bound to ciphertext that must match on decrypt and is logged in CloudTrail."]
  ],
  example: "A team creates a customer managed key with a policy that lets a security role administer it and only the application's role use it, with a condition that the encryption context includes `tenant` equal to the caller's tenant tag. Rotation is set to yearly, and CloudTrail shows every Decrypt call with its context.",
  tip: "If a principal has kms:Decrypt in IAM but is still denied, check whether the key policy allows the account or the principal. Key policy first, IAM second.",
  check: [
   ["What is the minimum waiting period before a KMS key is deleted?", "Seven days (the range is 7 to 30 days)."],
   ["Does rotating a KMS key require re-encrypting existing data?", "No. KMS keeps the older key material, so existing ciphertext still decrypts under the same key ID."]
  ]
 },
 {
  t: "Advanced KMS: cross-account key use, multi-Region keys, imported key material and CloudHSM key stores",
  body: [
   "Beyond the basics, the exam tests how KMS works across accounts and Regions and where your key material lives when regulations are strict.",
   "Cross-account use needs two permissions. The key policy in the owning account must allow the other account, or specific principals in it, to use the key, and an IAM policy in the other account must allow its principal to use the key's ARN. Aliases cannot be used across accounts; use the key ARN. Remember that AWS managed keys cannot be shared across accounts because you cannot edit their policies, which is why sharing encrypted EBS snapshots or AMIs needs a customer managed key.",
   "Multi-Region keys are a set of related keys in different Regions with the same key ID and the same key material. Ciphertext produced by one can be decrypted by a replica in another Region without calling across Regions, which suits disaster recovery, global DynamoDB tables and client-side encryption of data that moves between Regions. Each replica has its own key policy, grants and aliases. Single-Region keys cannot be converted into multi-Region keys.",
   "Imported key material (bring your own key) lets you generate key material in your own system and import it into a KMS key with no key material. You are responsible for keeping a copy; you can set an expiry, and you can delete the material immediately to make the key unusable at once, which some organizations want as an emergency control. Such keys do not support automatic rotation in the usual way, so plan manual rotation. Custom key stores go further: a CloudHSM key store keeps key material in a single-tenant AWS CloudHSM cluster you control, while services still use the normal KMS APIs. An external key store keeps keys in an HSM outside AWS, at the cost of availability and latency. Choose these only when a regulation requires single-tenant or external control, because standard KMS is simpler and highly available."
  ],
  terms: [
   ["Multi-Region key", "One of a set of KMS keys in different Regions sharing the same key ID and key material."],
   ["Imported key material", "Key material you generate outside AWS and import into a KMS key."],
   ["CloudHSM key store", "A KMS custom key store backed by a single-tenant CloudHSM cluster you control."],
   ["External key store", "A KMS custom key store that uses keys held in an HSM outside AWS."]
  ],
  example: "A payments company encrypts card tokens in us-east-1 with a multi-Region key and replicates the DynamoDB global table to eu-west-1, where the replica key decrypts locally during a failover. A regulator later requires keys in single-tenant HSMs, so new keys are created in a CloudHSM key store.",
  tip: "Decrypt in another Region without re-encrypting: multi-Region key. Single-tenant HSM under your control but still used through KMS: CloudHSM key store. Keys never inside AWS: external key store.",
  check: [
   ["Can you share an EBS snapshot encrypted with the aws/ebs key with another account?", "No. You must re-encrypt it with a customer managed key whose policy allows the other account."],
   ["What two policies allow cross-account KMS use?", "The key policy in the owning account and an IAM policy in the calling account."]
  ]
 },
 {
  t: "S3 encryption and access: SSE-S3, SSE-KMS, DSSE-KMS and SSE-C, S3 Bucket Keys, Block Public Access and Object Ownership",
  body: [
   "Amazon S3 holds more sensitive data than any other AWS service in most companies, so its encryption and access controls come up constantly.",
   "All new objects are encrypted at rest by default. SSE-S3 uses keys managed entirely by S3 and is the default. SSE-KMS uses a KMS key, AWS managed or customer managed; with a customer managed key you control the key policy, can disable the key, and see every use in CloudTrail. DSSE-KMS applies two independent layers of encryption for workloads whose rules require dual-layer protection. SSE-C uses a key the client sends with every request over HTTPS; S3 uses it and then forgets it, so the client must manage keys and cannot lose them. Client-side encryption, where you encrypt before upload, is another option. A bucket's default encryption setting applies to new objects that do not specify one, and bucket policies can require a specific type with the `s3:x-amz-server-side-encryption` condition.",
   "SSE-KMS with high request rates can hit KMS request quotas and costs. S3 Bucket Keys fix this: S3 gets a short-lived bucket-level key from KMS and uses it to create data keys for many objects, reducing KMS calls greatly. The encryption context then uses the bucket ARN instead of the object ARN, which matters for key policy conditions and CloudTrail searches.",
   "Access controls work together. S3 Block Public Access has four settings (block and ignore public ACLs, block and restrict public bucket policies) at account and bucket level, and it is on by default for new buckets. Object Ownership set to bucket owner enforced disables ACLs, so only policies control access and the bucket owner owns every object; it is the default for new buckets. Access points give separate policies and network controls per application, and presigned URLs grant temporary access to one object with the signer's permissions. Keep bucket policies least-privilege and review them with IAM Access Analyzer."
  ],
  terms: [
   ["SSE-KMS", "S3 server-side encryption using an AWS KMS key, with key policy control and CloudTrail logging."],
   ["DSSE-KMS", "Dual-layer server-side encryption with KMS keys, applying two layers of encryption to objects."],
   ["S3 Bucket Key", "A bucket-level key that reduces KMS requests and costs for SSE-KMS."],
   ["Bucket owner enforced", "An Object Ownership setting that disables ACLs so the bucket owner owns all objects."]
  ],
  example: "A data platform stores logs in a bucket with SSE-KMS using a customer managed key and Bucket Keys enabled, which cuts KMS costs by over 90 percent. Block Public Access is on at the account level, ACLs are disabled, and a bucket policy denies uploads that do not use SSE-KMS with that key.",
  tip: "Need key control and audit: SSE-KMS with a customer managed key. Need lower KMS cost at scale: Bucket Keys. Client must hold the key and AWS must not store it: SSE-C.",
  check: [
   ["Which S3 encryption type is applied by default to new objects?", "SSE-S3."],
   ["What changes in the KMS encryption context when Bucket Keys are enabled?", "It uses the bucket ARN rather than each object's ARN."]
  ]
 },
 {
  t: "Data integrity and retention: S3 Object Lock governance vs compliance mode, versioning, MFA Delete and AWS Backup Vault Lock",
  body: [
   "Some data must not be changed or deleted: financial records, audit logs, evidence and backups. Ransomware and malicious insiders target exactly these, so AWS offers write-once-read-many (WORM) controls.",
   "S3 Versioning keeps every version of an object, so overwrites and deletes can be undone; a delete just adds a delete marker. But a privileged user can still delete versions. MFA Delete requires the root user's MFA code to permanently delete versions or change versioning state, and can only be enabled by root through the API or CLI, which limits its practicality.",
   "S3 Object Lock adds real WORM protection on versioned buckets. Each object version can have a retention period in one of two modes. In governance mode, users with the `s3:BypassGovernanceRetention` permission who send the bypass header can delete the version or shorten retention, so it protects against most users and mistakes while allowing an escape hatch. In compliance mode, nobody, including the root user, can delete the locked version or shorten its retention until it expires; you can only extend it. A legal hold is an independent on-off lock with no end date. Default retention can be set on the bucket, and Object Lock can be enabled on existing buckets. Object Lock has been assessed for regulations such as SEC 17a-4.",
   "AWS Backup Vault Lock applies the same idea to backups. In governance mode, suitably permissioned users can remove the lock. In compliance mode, after a grace period (cooling-off time) of at least three days, the lock becomes immutable: no one can delete recovery points before their retention ends or change the lock. Combine Vault Lock with cross-account backup copies and, where suitable, logically air-gapped vaults, so an attacker who takes over the production account cannot destroy the backups."
  ],
  terms: [
   ["Object Lock governance mode", "Retention that most users cannot override, but that principals with a bypass permission can."],
   ["Object Lock compliance mode", "Retention that no one, including root, can shorten or remove until it expires."],
   ["Legal hold", "An Object Lock flag that prevents deletion until it is removed, with no expiry date."],
   ["Backup Vault Lock", "An AWS Backup feature that enforces WORM retention on recovery points in a vault."]
  ],
  example: "A broker keeps trade records in an S3 bucket with Object Lock compliance mode and a default seven-year retention. Its AWS Backup vault for databases uses Vault Lock in compliance mode, with copies in a separate backup account, so even a stolen administrator credential cannot erase history.",
  tip: "The key difference: governance can be bypassed with a permission; compliance cannot be bypassed by anyone, not even root. If the question says 'including the root user', choose compliance mode.",
  check: [
   ["Which permission lets a user delete an object locked in governance mode?", "s3:BypassGovernanceRetention, used with the bypass governance header."],
   ["What must be enabled on a bucket before Object Lock can be used?", "Versioning."]
  ]
 },
 {
  t: "Secrets and certificates: Secrets Manager rotation, Parameter Store SecureString and AWS Private CA",
  body: [
   "Applications need database passwords, API keys and certificates. Hard-coding them in code, AMIs or environment variables leads to leaks. AWS provides managed stores that encrypt secrets with KMS, control access with IAM and log every read in CloudTrail.",
   "AWS Secrets Manager stores secrets and rotates them. Managed rotation handles supported services such as Amazon RDS and Aurora without your own code, and Lambda-based rotation covers anything else, following create, set, test and finish steps so applications never see a half-rotated secret. For RDS and Aurora you can also let RDS manage the master user password in Secrets Manager. Secrets can have resource policies for cross-account access, can be replicated to other Regions for disaster recovery, and are encrypted with a KMS key you choose; for cross-account access use a customer managed key. Applications call `GetSecretValue` at run time, often with client-side caching.",
   "Systems Manager Parameter Store holds configuration and secrets as parameters. SecureString parameters are encrypted with KMS. Standard parameters are free; advanced parameters add larger sizes and parameter policies such as expiration notifications. Parameter Store has no built-in rotation, so it suits configuration values and secrets that change rarely or that you rotate with your own process. Parameter Store can also reference Secrets Manager secrets.",
   "AWS Private CA runs a managed private certificate authority for internal TLS, mutual TLS, device identities and IAM Roles Anywhere. You can build a hierarchy with a root CA and subordinate CAs, issue certificates through ACM (where private certificates can be renewed automatically) or directly, and publish revocation through CRLs or OCSP. Protect the CA with tight IAM policies, because anyone who can issue certificates can impersonate services. Short-lived certificate mode reduces cost and the need for revocation for certificates that last only days."
  ],
  terms: [
   ["Secrets Manager rotation", "Automatic replacement of a secret's value on a schedule using managed or Lambda-based rotation."],
   ["SecureString", "A Parameter Store parameter type encrypted with a KMS key."],
   ["AWS Private CA", "A managed private certificate authority service for issuing internal certificates."],
   ["Certificate revocation list", "A signed list of certificates a CA has revoked before their expiry."]
  ],
  example: "An application's RDS password lives in Secrets Manager with 30-day managed rotation. The app reads it through the caching client, so rotation needs no redeploy. Internal microservices use mutual TLS with certificates from AWS Private CA, and feature flags sit in Parameter Store as standard parameters.",
  tip: "Automatic rotation of database credentials: Secrets Manager. Cheap encrypted configuration without rotation: Parameter Store SecureString. Internal certificates: AWS Private CA.",
  check: [
   ["What do you need to share a Secrets Manager secret with another account?", "A resource policy on the secret allowing that account and a customer managed KMS key whose policy also allows it."],
   ["Does Parameter Store rotate SecureString values automatically?", "No. It has no built-in rotation; you would need your own process or Secrets Manager."]
  ]
 },
 {
  t: "Sensitive data discovery and masking: Amazon Macie and CloudWatch Logs data protection policies",
  body: [
   "You cannot protect sensitive data you do not know about. Personal data, card numbers and credentials often end up in unexpected buckets and logs. Amazon Macie finds such data in S3, and CloudWatch Logs data protection masks it in logs.",
   "Amazon Macie continuously evaluates your S3 buckets for security posture: which are public, shared with other accounts, unencrypted or replicated, producing policy findings. For content, it uses managed data identifiers, which detect many types of data such as names, addresses, passport numbers, bank account details, credit card numbers and credentials in many countries, plus custom data identifiers you define with regular expressions and keywords, and allow lists to ignore known test values. Automated sensitive data discovery samples objects across your estate each day and builds a sensitivity score for each bucket, at a manageable cost. Sensitive data discovery jobs scan chosen buckets fully, once or on a schedule, and produce sensitive data findings with locations of the matches. Findings go to EventBridge and Security Hub. With Organizations, a delegated administrator runs Macie for all accounts.",
   "CloudWatch Logs data protection policies audit and mask sensitive data in log events as they are ingested. You choose managed data identifiers such as email addresses, IP addresses, credit card numbers or AWS secret keys, and matching values are masked in the console and query results. Principals with the `logs:Unmask` permission can view the original values. Findings about detected data can be sent to another log group, S3 or Firehose. This reduces the risk of support engineers or log tools seeing secrets that an application logged by mistake.",
   "Discovery is a starting point. Once Macie shows where sensitive data lives, apply controls: encryption with a customer managed key, tight bucket policies, Block Public Access, lifecycle deletion when data is no longer needed, and data loss prevention alerts."
  ],
  terms: [
   ["Managed data identifier", "A built-in Macie detection pattern for a type of sensitive data."],
   ["Custom data identifier", "A user-defined pattern, such as a regular expression with keywords, for Macie to detect."],
   ["Automated sensitive data discovery", "Macie sampling of objects across buckets to estimate where sensitive data lives."],
   ["logs:Unmask", "The permission that lets a principal see values masked by a CloudWatch Logs data protection policy."]
  ],
  example: "After a merger, a company turns on Macie through its delegated administrator. Automated discovery flags a forgotten bucket full of scanned passports; a targeted job confirms it. The team encrypts and restricts the bucket, and a CloudWatch Logs data protection policy now masks card numbers that one service was logging.",
  tip: "Finding sensitive data in S3: Macie. Finding threats: GuardDuty. Finding vulnerabilities: Inspector. The exam often lists all three as options.",
  check: [
   ["How do you teach Macie a company-specific employee ID format?", "Create a custom data identifier with a regular expression and keywords."],
   ["Who can see the original value of a masked log field?", "Principals granted the logs:Unmask permission."]
  ]
 },
 {
  t: "Encrypting data stores: EBS encryption by default, RDS, Aurora and DynamoDB encryption, and encrypting existing unencrypted resources",
  body: [
   "Most AWS data stores encrypt at rest with KMS, but the details of when and how you can turn encryption on differ, and those details are what exam questions test.",
   "Amazon EBS volumes, snapshots and the data moving between the instance and the volume are encrypted when you choose a KMS key. EBS encryption by default is a per-Region account setting that encrypts every new volume and snapshot copy with the default or a chosen key; it does not change existing volumes. To encrypt an existing volume, snapshot it, copy the snapshot with encryption enabled, create a volume from the copy and swap it in. Snapshots of encrypted volumes are encrypted, and volumes created from them are encrypted too.",
   "Amazon RDS and Aurora encryption is chosen at creation and covers storage, automated backups, snapshots and read replicas. You cannot turn it on for an existing unencrypted instance in place. The usual path is to take a snapshot, copy it with encryption, and restore a new encrypted instance, or to migrate with AWS DMS for minimal downtime. Cross-Region read replicas of encrypted databases use a key in the destination Region. Transparent Data Encryption (TDE) is available for Oracle and SQL Server where required.",
   "Amazon DynamoDB always encrypts tables at rest; you only choose between an AWS owned key (default), an AWS managed key or a customer managed key, and you can switch between them. Amazon EFS encryption at rest is chosen when the file system is created, and encryption in transit is set with the mount helper's TLS option. S3 encrypts all new objects by default, and existing unencrypted objects can be re-encrypted with S3 Batch Operations copying objects in place. Use AWS Config rules such as `encrypted-volumes` and `rds-storage-encrypted`, SCP conditions and Security Hub controls to detect and prevent unencrypted resources."
  ],
  terms: [
   ["EBS encryption by default", "An account and Region setting that encrypts all new EBS volumes and snapshot copies."],
   ["Snapshot copy with encryption", "The method for creating an encrypted copy of unencrypted EBS or RDS data."],
   ["Transparent Data Encryption", "Database-engine encryption for Oracle and SQL Server that encrypts data files."],
   ["S3 Batch Operations", "A feature that runs an action, such as copy with new encryption, across many S3 objects."]
  ],
  example: "An audit finds three unencrypted RDS instances and 50 unencrypted EBS volumes. The team turns on EBS encryption by default in every Region, replaces the volumes through encrypted snapshot copies, and migrates each database by restoring an encrypted snapshot copy during a maintenance window. A Config rule now flags any new unencrypted resource.",
  tip: "No AWS data store lets you flip an existing unencrypted EBS volume or RDS instance to encrypted in place. The answer is almost always snapshot, encrypted copy, restore or new volume.",
  check: [
   ["Does turning on EBS encryption by default encrypt existing volumes?", "No. It only affects volumes and snapshot copies created afterwards."],
   ["Can DynamoDB tables be unencrypted?", "No. DynamoDB always encrypts at rest; you only choose which key type is used."]
  ]
 },
 {
  t: "Securing generative AI data: Amazon Bedrock guardrails, private model access with VPC endpoints and invocation logging",
  body: [
   "SCS-C03 adds security for generative AI and machine learning workloads. The principles are the same as for any workload, least privilege, private networking, encryption and logging, plus new controls for what goes into and comes out of a model.",
   "Amazon Bedrock gives access to foundation models through an API. By design, your prompts and outputs are not used to train the base models or shared with model providers, and data is encrypted in transit and at rest; you can use customer managed KMS keys for resources such as custom models, knowledge bases and agents. Control who can call which models with IAM, using actions such as `bedrock:InvokeModel` and resource ARNs for specific models, and use SCPs to block unapproved models or Regions across the organization.",
   "Keep traffic private with interface VPC endpoints (PrivateLink) for Bedrock, and endpoint policies that limit which models or actions can be used through them. Turn on model invocation logging to send prompts, responses and metadata to CloudWatch Logs or S3 for audit and abuse detection, and protect those logs as sensitive data, since they may contain personal information. CloudTrail records Bedrock API calls.",
   "Amazon Bedrock Guardrails filter inputs and outputs. Content filters block harmful categories and detect prompt attacks such as jailbreaks and prompt injection. Denied topics stop conversations on subjects you choose. Word filters block specific terms. Sensitive information filters detect personally identifiable information and custom regex patterns and can block or mask them in prompts and responses. Contextual grounding checks flag answers not supported by the source data, and automated reasoning checks can validate responses against rules. For retrieval-augmented generation, secure the knowledge base's data sources (for example S3 with least-privilege roles) because the model can reveal anything it can retrieve. Similar thinking applies to SageMaker AI: network isolation, VPC-only notebooks, encrypted volumes and inter-container encryption for training."
  ],
  terms: [
   ["Bedrock Guardrails", "Configurable filters for prompts and responses, including content, topic, word and sensitive information filters."],
   ["Model invocation logging", "A Bedrock setting that records prompts, responses and metadata to CloudWatch Logs or S3."],
   ["Prompt injection", "An attack that hides instructions in input to make a model ignore its intended rules."],
   ["Retrieval-augmented generation", "A pattern where a model answers using documents retrieved from a knowledge base."]
  ],
  example: "A bank's support chatbot on Bedrock runs from private subnets through an interface endpoint whose policy allows only one approved model. A guardrail masks account numbers and blocks investment advice as a denied topic, and invocation logs go to an encrypted S3 bucket reviewed by the security team.",
  tip: "Stop the model revealing PII: Guardrails with sensitive information filters. Keep traffic off the internet: interface VPC endpoint. Record what was asked and answered: invocation logging. Limit which models are used: IAM and SCPs.",
  check: [
   ["Are Bedrock prompts used to train the underlying foundation models?", "No. Bedrock does not use customer prompts and outputs to train the base models or share them with model providers."],
   ["Which Guardrails feature helps against jailbreak attempts?", "Content filters with prompt attack detection."]
  ]
 },
 {
  t: "Multi-account strategy: AWS Organizations, organizational units, AWS Control Tower landing zones and dedicated security accounts",
  body: [
   "An AWS account is the strongest isolation boundary AWS offers: resources, IAM and quotas are separate by default. Mature organizations therefore use many accounts, grouped and governed centrally, instead of one account with many workloads.",
   "AWS Organizations groups accounts under a management account. Accounts sit in organizational units (OUs), such as Security, Infrastructure, Workloads (with Prod and Non-prod children), Sandbox, Suspended and Forensics, and policies attached to an OU apply to every account inside it. The management account pays the bills, creates accounts and manages policies; because SCPs do not restrict it, it should run no workloads and very few people should use it. Enable trusted access for services and register delegated administrators so most work happens elsewhere.",
   "Dedicated security accounts are standard. A log archive account receives CloudTrail, Config and other logs from all accounts into buckets few can modify. A security tooling (audit) account is the delegated administrator for GuardDuty, Security Hub, Inspector, Macie, Detective, Config aggregation and IAM Access Analyzer, and holds read and response roles into other accounts. Some organizations add a forensics account and a network account for shared connectivity and inspection.",
   "AWS Control Tower automates this. It sets up a landing zone with the Security OU, a log archive account and an audit account, an organization CloudTrail trail and Config, IAM Identity Center, and Account Factory to create new accounts with a standard baseline. It manages controls (guardrails) of three kinds: preventive controls implemented with SCPs and RCPs, detective controls implemented with Config rules, and proactive controls that check resources before deployment with CloudFormation hooks. Control Tower shows drift when someone changes the setup outside it. Account Factory for Terraform (AFT) and Customizations for Control Tower add your own baselines."
  ],
  terms: [
   ["Organizational unit", "A group of accounts in AWS Organizations to which policies can be attached."],
   ["Landing zone", "A well-architected multi-account baseline with shared accounts, logging, identity and guardrails."],
   ["Log archive account", "A dedicated account that stores logs from all accounts with strict protections."],
   ["Control Tower control", "A preventive, detective or proactive guardrail managed by Control Tower."]
  ],
  example: "A startup growing from three to 60 accounts sets up Control Tower. New teams request accounts through Account Factory, which places them in the Workloads OU with CloudTrail, Config, Identity Center access and preventive controls already in place, while the security team works only from the audit account.",
  tip: "The management account should be nearly empty and rarely used. Answers that run security tooling or workloads in the management account are usually wrong when a delegated administrator option exists.",
  check: [
   ["Which two shared accounts does a Control Tower landing zone create?", "A log archive account and an audit (security tooling) account."],
   ["What are the three types of Control Tower controls?", "Preventive, detective and proactive."]
  ]
 },
 {
  t: "Organization guardrails: service control policies, resource control policies and declarative policies",
  body: [
   "Organization policies let a central team set limits that no one in a member account can escape, however much IAM permission they have. SCS-C03 expects you to know three kinds and when to use each.",
   "Service control policies (SCPs) set the maximum permissions for IAM users and roles in member accounts, including the account's root user. They never grant anything: a principal still needs IAM permissions, and both must allow an action. Organizations starts with the FullAWSAccess SCP; you then add deny statements (a deny-list strategy) or replace it with specific allows (an allow-list strategy). Typical SCPs deny leaving the organization, turning off CloudTrail, GuardDuty or Config, using unapproved Regions (with exceptions for global services), creating IAM users or access keys, and launching instances without IMDSv2. SCPs do not apply to the management account or to service-linked roles, and conditions such as `aws:PrincipalArn` let you exempt a break-glass or platform role.",
   "Resource control policies (RCPs) set the maximum permissions on resources in member accounts, whoever makes the request, including principals from outside your organization. They support services such as S3, STS, KMS, SQS and Secrets Manager, among others. The classic use is a data perimeter: deny access to your S3 buckets, KMS keys and secrets unless `aws:PrincipalOrgID` matches your organization (with exceptions for AWS service principals), and require TLS everywhere. Where SCPs control what your identities can do, RCPs control what can be done to your resources.",
   "Declarative policies set and enforce a service's configuration across accounts, rather than blocking API calls. For EC2 they can enforce IMDSv2 as the default, block public sharing of AMIs and EBS snapshots, control serial console access and turn on VPC Block Public Access. They apply even to new features and to API calls that do not mention the setting, and they can show a custom message when something is blocked. Management policies such as tag policies and backup policies round out the toolbox."
  ],
  terms: [
   ["Service control policy", "An Organizations policy that limits the maximum permissions of principals in member accounts."],
   ["Resource control policy", "An Organizations policy that limits the maximum permissions on resources in member accounts."],
   ["Declarative policy", "An Organizations policy that enforces a baseline configuration of a service, such as EC2 settings."],
   ["Data perimeter", "A set of guardrails ensuring only trusted identities access trusted resources from expected networks."]
  ],
  example: "A company attaches an SCP denying `organizations:LeaveOrganization` and CloudTrail changes, an RCP that denies S3 and KMS access to principals outside its organization, and a declarative policy that blocks public AMI and snapshot sharing and makes IMDSv2 the default for all accounts in the Workloads OU.",
  tip: "Limit what our people can do: SCP. Limit who can touch our resources, including outsiders: RCP. Enforce a service setting such as IMDSv2 or public sharing blocks: declarative policy.",
  check: [
   ["Can an SCP stop an external account from reading your S3 bucket if the bucket policy allows it?", "No. SCPs only apply to principals in your organization; an RCP is needed."],
   ["Do SCPs grant permissions?", "No. They only set the maximum; an IAM policy must still allow the action."]
  ]
 },
 {
  t: "Delegated administration for GuardDuty, Security Hub, Config and other security services",
  body: [
   "Most AWS security services are Regional and per account. Enabling and managing them one account at a time would be slow and error-prone, and running them from the management account would concentrate too much power there. Delegated administration solves both problems.",
   "From the management account you enable trusted access for a service and register a member account, usually the security tooling account, as that service's delegated administrator. That account can then enable the service across the organization, set auto-enable for new accounts, configure settings centrally and view findings from every member. Services that support this include GuardDuty, Security Hub, Inspector, Macie, Detective, IAM Access Analyzer, AWS Config (for aggregators and organization rules and conformance packs), Firewall Manager (administrator account), CloudTrail (organization trails), IAM Identity Center, AWS Backup, Security Lake, Audit Manager and others.",
   "Some details to remember. Most of these services are Regional, so the delegated administrator must configure them in each Region you use; Security Hub central configuration and GuardDuty organization settings help apply the same policy everywhere. Member accounts cannot disable or leave the service when it is managed this way, and an SCP can further deny disable actions. Findings from members appear in the administrator account, and cross-Region aggregation in Security Hub brings them into one Region.",
   "Delegated administration also improves separation of duties: the security team manages security services in the tooling account without needing access to the management account, which holds billing and organization-wide powers. Combine it with a minimal set of roles into member accounts for response work, deployed consistently with StackSets."
  ],
  terms: [
   ["Trusted access", "An Organizations setting that allows an AWS service to work across the organization's accounts."],
   ["Delegated administrator", "A member account registered to manage a specific service for the whole organization."],
   ["Auto-enable", "A setting that turns on a security service automatically for new organization member accounts."],
   ["Central configuration", "A Security Hub feature to set standards and controls for many accounts and Regions from one place."]
  ],
  example: "The security tooling account is delegated administrator for GuardDuty, Security Hub, Inspector, Macie and Detective. When a new account joins the Workloads OU, all five services turn on automatically in every enabled Region, and the account's findings appear in the tooling account within minutes.",
  tip: "When the question asks how to manage a security service for all accounts including future ones, the answer is a delegated administrator with auto-enable, not scripts or invitations.",
  check: [
   ["Why not run GuardDuty administration from the management account?", "The management account is highly privileged and not limited by SCPs, so its use should be minimized; a delegated administrator separates duties."],
   ["Is delegated administration for GuardDuty global or per Region?", "GuardDuty is Regional, so it must be configured in each Region."]
  ]
 },
 {
  t: "Secure and consistent deployment: CloudFormation StackSets, Service Catalog and scanning infrastructure as code",
  body: [
   "Security settings applied by hand drift and get forgotten. Infrastructure as code (IaC) makes secure configurations repeatable, reviewable and testable, and the exam expects you to know the AWS tools for deploying it safely at scale.",
   "AWS CloudFormation deploys templates as stacks. StackSets deploy the same template to many accounts and Regions. With service-managed permissions, StackSets use Organizations and can deploy automatically to every account that joins a target OU, which is how baselines such as incident response roles, Config rules or logging settings reach new accounts. Stack policies protect critical resources from updates, termination protection prevents accidental deletion, and drift detection shows resources changed outside CloudFormation. Deploy with a CloudFormation service role so that users do not need broad permissions themselves.",
   "AWS Service Catalog lets a central team publish approved products, such as an encrypted database or a hardened web stack, in portfolios shared with accounts or users. A launch constraint names an IAM role Service Catalog uses to create the resources, so end users can launch a product without holding the underlying permissions. Template constraints limit parameter choices, such as allowed instance types.",
   "Scan templates before they deploy. `cfn-lint` checks syntax and best practices. AWS CloudFormation Guard (`cfn-guard`) evaluates templates against policy-as-code rules, for example that every S3 bucket blocks public access and every volume is encrypted, and can fail a CI/CD pipeline. CloudFormation Hooks run checks during deployment and can block noncompliant resources; Control Tower proactive controls use them. Open source scanners cover Terraform and CDK too. Also scan for secrets in code and review changes through pull requests, so security review is part of every deployment rather than an afterthought."
  ],
  terms: [
   ["StackSet", "A CloudFormation feature that deploys one template to multiple accounts and Regions."],
   ["Service-managed permissions", "A StackSets mode using Organizations that can auto-deploy to new accounts in target OUs."],
   ["Launch constraint", "A Service Catalog setting that assigns the IAM role used to launch a product."],
   ["CloudFormation Guard", "A policy-as-code tool that validates templates against rules."]
  ],
  example: "A platform team stores all templates in Git. Pull requests run cfn-lint and cfn-guard rules; merges deploy through a pipeline role. A service-managed StackSet adds the security baseline to each new account, and developers launch approved RDS databases from Service Catalog without having rds:CreateDBInstance themselves.",
  tip: "Every account including future ones: StackSets with service-managed permissions and automatic deployment. Let users deploy without broad permissions: Service Catalog launch constraints. Catch problems before deployment: Guard or Hooks.",
  check: [
   ["What does drift detection report?", "Resources whose actual configuration differs from what the CloudFormation stack defines."],
   ["How can a Service Catalog user launch a product that creates IAM roles without iam:CreateRole?", "The product's launch constraint role has that permission and Service Catalog uses it to create the resources."]
  ]
 },
 {
  t: "Evaluating compliance: AWS Config rules, conformance packs and aggregators",
  body: [
   "Compliance means proving that resources are configured the way your policies say, not once but continuously. AWS Config is the core service for this.",
   "The Config recorder captures configuration items for supported resource types whenever they change, building a history of each resource and its relationships. You choose which types to record, which affects cost, and a delivery channel sends snapshots and history to S3 and notifications to SNS. With this history you can answer 'what did this security group look like last Tuesday, and who changed it?', linking to CloudTrail events.",
   "Config rules evaluate resources against desired settings. AWS managed rules cover common checks, such as `s3-bucket-public-read-prohibited`, `restricted-ssh`, `encrypted-volumes`, `iam-root-access-key-check`, `cloudtrail-enabled` and `rds-storage-encrypted`. Custom rules use Lambda functions or Guard policy syntax. Rules run on configuration change, periodically, or both, and can evaluate resources proactively before creation. Each resource is marked COMPLIANT or NON_COMPLIANT, and remediation actions using Systems Manager Automation can fix issues manually or automatically.",
   "Conformance packs bundle rules and remediation actions into one package, often from AWS sample templates mapped to frameworks such as CIS, NIST, PCI DSS or HIPAA operational best practices, and can be deployed across an organization from the management or delegated administrator account. An aggregator collects configuration and compliance data from many accounts and Regions into one account, for a single dashboard and advanced queries using SQL-like syntax. Security Hub builds on Config for its standards checks, and Audit Manager can use Config evaluations as evidence. Remember that Config reports and remediates configuration; it does not prevent API calls, which is the job of SCPs, RCPs, declarative policies and IAM."
  ],
  terms: [
   ["Configuration item", "A point-in-time record of a resource's configuration captured by AWS Config."],
   ["Config rule", "A check that evaluates whether resources meet a desired configuration."],
   ["Conformance pack", "A collection of Config rules and remediation actions deployed and reported as one unit."],
   ["Aggregator", "A Config resource that gathers configuration and compliance data from multiple accounts and Regions."]
  ],
  example: "A payments company deploys a PCI DSS operational best practices conformance pack to all accounts in its cardholder OU. An aggregator in the security account shows 97 percent compliance, and automatic remediation closes any security group that opens SSH to the internet within minutes.",
  tip: "Detective controls that report configuration: Config rules. A packaged set of them across the organization: conformance packs. One view of all accounts: aggregator. Blocking the action in the first place is not Config's job.",
  check: [
   ["What decides the cost of AWS Config recording?", "Mainly the number of configuration items recorded and rule evaluations, which depends on the resource types and how often they change."],
   ["How do you view Config compliance for 50 accounts in one place?", "Create an aggregator in a central account covering the organization."]
  ]
 },
 {
  t: "Audit evidence and reports: AWS Audit Manager and AWS Artifact",
  body: [
   "Audits need evidence from two sides: proof that AWS runs its part of the infrastructure securely, and proof that you run your part securely. AWS offers a service for each.",
   "AWS Artifact is a self-service portal for AWS's own compliance documents. Artifact Reports give on-demand access to third-party audit reports and certifications for AWS, such as SOC 1, SOC 2 and SOC 3 reports, PCI DSS attestation of compliance, ISO certifications and others. Some are available only after accepting terms, and many are confidential, so you share them with your auditors under those terms. Artifact Agreements let you review and accept agreements with AWS, such as the Business Associate Addendum (BAA) needed for HIPAA workloads, for one account or the whole organization. You can also get notifications when new reports are published. Artifact covers the 'security of the cloud' half of shared responsibility.",
   "AWS Audit Manager helps with the 'security in the cloud' half. You create an assessment from a framework, such as prebuilt frameworks for CIS, PCI DSS, HIPAA, SOC 2, GDPR, NIST or generative AI best practices, or a custom framework. Audit Manager then continuously and automatically collects evidence from your accounts: AWS Config rule evaluations, Security Hub control checks, CloudTrail user activity and API configuration snapshots, mapping each piece to controls. You can add manual evidence, such as policy documents, delegate control review to owners, and generate an assessment report with the evidence for auditors. It does not decide whether you are compliant; auditors do that with its evidence.",
   "Remember the pairing: AWS's certifications and agreements come from Artifact; evidence about your own environment comes from Audit Manager, fed by Config, Security Hub and CloudTrail."
  ],
  terms: [
   ["AWS Artifact", "A portal for downloading AWS compliance reports and accepting agreements such as the BAA."],
   ["AWS Audit Manager", "A service that continuously collects evidence from your AWS usage and maps it to audit frameworks."],
   ["Assessment report", "An Audit Manager output bundling selected evidence for auditors."],
   ["Business Associate Addendum", "An agreement with AWS required before storing protected health information under HIPAA."]
  ],
  example: "Before a SOC 2 audit, a SaaS company downloads AWS's SOC 2 report from Artifact to show the infrastructure controls AWS operates. It also runs an Audit Manager SOC 2 assessment across its production accounts for three months, then hands the auditor an assessment report with Config and CloudTrail evidence for its own controls.",
  tip: "The word 'AWS's report' or 'agreement with AWS' means Artifact. 'Collect evidence about our resources for an audit' means Audit Manager.",
  check: [
   ["Where do you accept the HIPAA Business Associate Addendum?", "In AWS Artifact Agreements."],
   ["Name two sources Audit Manager uses for automated evidence.", "AWS Config rule evaluations and CloudTrail activity (also Security Hub checks and API configuration snapshots)."]
  ]
 },
 {
  t: "Tagging for security and governance: tag policies, requiring tags with conditions, and backup policies",
  body: [
   "Tags are key-value labels on resources. For security they do much more than cost reporting: they drive ABAC permissions, backup selection, incident scoping and data classification. That makes consistent, trustworthy tags a governance goal.",
   "Tag policies in AWS Organizations standardize tags: they define allowed tag keys with the exact capitalization, allowed values, and which resource types must follow them. You can see compliance reports, and for some resource types you can enforce the policy so that creating or updating a tag with a noncompliant value fails. But a tag policy does not by itself require that a tag be present; resources can still be created with no tag at all.",
   "To require a tag at creation, use IAM or SCP conditions. A deny statement for `ec2:RunInstances` with the condition `\"Null\": {\"aws:RequestTag/DataClassification\": \"true\"}` blocks launches without that tag, and `aws:TagKeys` with `ForAllValues` limits which tag keys can be set. Protect tags that grant access: deny `ec2:CreateTags` and `ec2:DeleteTags` on the project or classification keys except for a platform role, or users could re-tag resources to gain access. Proactive Control Tower controls and CloudFormation Guard rules can also check tags before deployment, and the Config rule `required-tags` reports resources that lack them.",
   "Backup policies, another Organizations management policy type, define AWS Backup plans centrally: schedules, retention, copy actions to other accounts or Regions, and which resources are included, usually selected by tag, such as `backup=daily`. They are applied to accounts automatically, so every tagged database gets backed up without per-account setup. Together, tag policies, tag-requiring conditions and backup policies make tags reliable enough to base security decisions on."
  ],
  terms: [
   ["Tag policy", "An Organizations policy that standardizes tag keys and allowed values across accounts."],
   ["aws:RequestTag", "A condition key for tags included in a create or tag request."],
   ["aws:TagKeys", "A condition key listing the tag keys in a request, used to limit which keys can be set."],
   ["Backup policy", "An Organizations policy that deploys AWS Backup plans across accounts, often selecting resources by tag."]
  ],
  example: "A company applies a tag policy defining DataClassification with values public, internal and confidential, an SCP that denies creating EC2 instances and RDS databases without that tag, and a backup policy that backs up every resource tagged confidential daily with copies to a vault in the backup account.",
  tip: "Tag policies standardize, they do not require. When a question says 'prevent creation without a tag', the answer is an SCP or IAM policy with an aws:RequestTag condition.",
  check: [
   ["Why deny tagging actions on access-control tags?", "Otherwise users could change tags to grant themselves access through ABAC policies."],
   ["How does a backup policy usually choose resources?", "By tags, such as backup=daily, defined in the policy's resource selection."]
  ]
 },
 {
  t: "Shared responsibility and security reviews: the Well-Architected security pillar, Trusted Advisor and threat modeling",
  body: [
   "Security on AWS is shared. AWS is responsible for security of the cloud: the facilities, hardware, network, and the virtualization layer, and for managed services also the operating systems and platform software it runs. You are responsible for security in the cloud: your data, identities and access, network configuration, encryption choices, and anything you install. The split moves with the service. On EC2 you patch the guest operating system; on RDS AWS patches the host and the database software, you choose when engine upgrades are applied, and you still control network access, users and encryption; on Lambda or S3 you mostly configure access and data protection.",
   "The AWS Well-Architected Framework's security pillar gives design principles: implement a strong identity foundation, maintain traceability, apply security at all layers, automate security best practices, protect data in transit and at rest, keep people away from data, and prepare for security events. Its best practice areas, security foundations, identity and access management, detection, infrastructure protection, data protection, incident response and application security, map closely to the exam domains. The Well-Architected Tool runs a structured review of a workload and records risks and improvement plans.",
   "AWS Trusted Advisor inspects your accounts and recommends improvements in cost, performance, reliability, service limits, operational excellence and security. Security checks include open security group ports, root MFA, exposed access keys, S3 bucket permissions and IAM use; the full set of checks requires Business, Enterprise On-Ramp or Enterprise Support. Trusted Advisor can be viewed across an organization and integrates with Security Hub.",
   "Threat modeling looks for design weaknesses before they are built. Draw the data flows and trust boundaries of a workload, then ask what can go wrong, often using STRIDE (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege), what you will do about it, and whether you did a good job. The outputs become requirements: controls, logs and tests. Reviews should be repeated when the architecture changes."
  ],
  terms: [
   ["Shared responsibility model", "The division of security duties between AWS (of the cloud) and the customer (in the cloud)."],
   ["Security pillar", "The Well-Architected Framework section with principles and best practices for security."],
   ["Trusted Advisor", "An AWS service that checks accounts and recommends improvements, including security checks."],
   ["STRIDE", "A threat modeling mnemonic: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."]
  ],
  example: "Before launching a new claims portal, the team runs a threat modeling session and finds that uploaded documents could be read by any support user. They add ABAC on S3, Macie scanning and CloudTrail data events, then complete a Well-Architected review and fix two high-risk items flagged by Trusted Advisor.",
  tip: "For shared responsibility questions, ask whether the customer can even reach the component. If you cannot log in to it, such as the RDS host OS or the hypervisor, it is AWS's job.",
  check: [
   ["On Amazon EC2, who patches the guest operating system?", "The customer."],
   ["What does the 'R' in STRIDE stand for, and which AWS feature helps address it?", "Repudiation; logging such as CloudTrail with integrity validation helps prove who did what."]
  ]
 }
], { reviewed: "2026-09-29" });
