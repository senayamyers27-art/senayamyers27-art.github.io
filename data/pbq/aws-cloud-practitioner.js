/* Performance-based simulations for AWS Certified Cloud Practitioner (CLF-C02). */
CertHub.addPbqs("aws-cloud-practitioner", [
  { id: "wa-pillars-match", d: 1, type: "match", title: "Match practices to Well-Architected pillars",
    prompt: "During a design review, the team lists six practices. Match each practice to the AWS Well-Architected Framework pillar it belongs to.",
    pairs: [
      ["Perform operations as code and make frequent, small, reversible changes", "Operational excellence"],
      ["Grant least privilege and enable traceability with logging", "Security"],
      ["Automatically recover from failure and regularly test recovery procedures", "Reliability"],
      ["Use serverless architectures and experiment to find the best-performing resource types", "Performance efficiency"],
      ["Adopt a consumption model and attribute spending to teams with tags", "Cost optimization"],
      ["Maximize utilization so fewer resources consume energy", "Sustainability"]
    ],
    extra: ["Scalability", "Agility"],
    explain: "The framework has exactly six pillars. Operations as code belongs to operational excellence, least privilege and traceability to security, and automatic recovery with tested procedures to reliability. Choosing and experimenting with resource types for speed is performance efficiency, while paying only for what you use and attributing costs is cost optimization. Maximizing utilization to reduce environmental impact is the sustainability pillar. Scalability and agility are cloud benefits, not pillars." },

  { id: "seven-rs-match", d: 1, type: "match", title: "Assign migration strategies to applications",
    prompt: "A retailer is planning its migration portfolio. Match each application decision to the migration strategy (one of the 7 Rs) it represents.",
    pairs: [
      ["Move 300 virtual machines to Amazon EC2 unchanged before the data center lease ends", "Rehost"],
      ["Move a self-managed MySQL server to Amazon RDS without changing application code", "Replatform"],
      ["Rewrite the monolithic order system as AWS Lambda functions backed by Amazon DynamoDB", "Refactor"],
      ["Replace the in-house CRM with a SaaS CRM product", "Repurchase"],
      ["Decommission a reporting tool nobody has used in over a year", "Retire"],
      ["Keep a mainframe application on premises for now and revisit next year", "Retain"]
    ],
    extra: ["Relocate", "Replicate"],
    explain: "Rehost (lift and shift) moves servers as they are. Replatform makes a small optimization, such as moving to a managed database, without redesign, while refactor re-architects the application with cloud-native services. Repurchase swaps to a different product, usually SaaS; retire turns off what is no longer needed; retain keeps it where it is for now. Relocate refers to moving infrastructure, such as a VMware environment, to the cloud without buying new hardware or changing operations, and 'Replicate' is not one of the 7 Rs." },

  { id: "rds-shared-resp", d: 2, type: "select", title: "Customer responsibilities for Amazon RDS",
    prompt: "A company moves its database to Amazon RDS for PostgreSQL. Select every task that remains the CUSTOMER'S responsibility under the shared responsibility model.",
    options: [
      "Applying patches to the PostgreSQL database engine",
      "Creating database users and managing their privileges",
      "Configuring the security group rules that control who can connect",
      "Replacing failed physical storage hardware",
      "Deciding whether to enable encryption at rest for the DB instance",
      "Patching the operating system of the database host",
      "Choosing the backup retention period and maintenance window"
    ],
    answers: [1, 2, 4, 6],
    explain: "RDS is a managed service, so AWS patches the database engine and the host operating system (during a maintenance window you choose) and handles physical hardware. The customer still controls access and data: database users and privileges, security group rules, the decision to encrypt, and settings such as backup retention and the maintenance window. Data and access management always stay with the customer." },

  { id: "sg-least-privilege", d: 2, type: "select", title: "Review a web server security group",
    prompt: "A Linux web server must accept HTTP and HTTPS from anyone, and SSH only from the admin network 198.51.100.0/24. Its database runs on Amazon RDS in another security group. Select every inbound rule that should be REMOVED to follow least privilege.",
    context: "Security group sg-web (inbound rules)\nRule  Protocol  Port  Source\n1     TCP       443   0.0.0.0/0\n2     TCP       22    0.0.0.0/0\n3     TCP       22    198.51.100.0/24\n4     TCP       3389  0.0.0.0/0\n5     TCP       3306  0.0.0.0/0\n6     TCP       80    0.0.0.0/0",
    options: ["Rule 1 (443 from 0.0.0.0/0)", "Rule 2 (22 from 0.0.0.0/0)", "Rule 3 (22 from 198.51.100.0/24)", "Rule 4 (3389 from 0.0.0.0/0)", "Rule 5 (3306 from 0.0.0.0/0)", "Rule 6 (80 from 0.0.0.0/0)"],
    answers: [1, 3, 4],
    explain: "Rules 1 and 6 are required because the site must serve HTTPS and HTTP to everyone, and rule 3 allows SSH only from the admin network as specified. Rule 2 exposes SSH to the whole internet, rule 4 opens RDP, which a Linux web server does not need, and rule 5 opens the MySQL port to the world even though the database is not on this server. Security groups are allow-only, so removing unnecessary allow rules is how you tighten them." },

  { id: "security-services-match", d: 2, type: "match", title: "Pick the security service for each finding",
    prompt: "A security analyst needs the right AWS service for each situation. Match each situation to the service that addresses it.",
    pairs: [
      ["An EC2 instance is communicating with an IP address associated with cryptocurrency mining", "Amazon GuardDuty"],
      ["A container image in Amazon ECR includes a package with a critical CVE", "Amazon Inspector"],
      ["CSV files in an S3 bucket contain credit card numbers", "Amazon Macie"],
      ["Investigate which role and IP addresses were involved in a finding over the past week", "Amazon Detective"],
      ["View findings from several services and best-practice checks in one place", "AWS Security Hub"],
      ["Find out which IAM user deleted a security group yesterday", "AWS CloudTrail"]
    ],
    extra: ["AWS Shield", "Amazon Cognito"],
    explain: "GuardDuty detects active threats by analyzing CloudTrail, VPC Flow Logs and DNS logs. Inspector scans EC2, container images and Lambda for software vulnerabilities, and Macie discovers sensitive data such as card numbers in S3. Detective helps investigate the root cause behind findings, Security Hub aggregates findings and runs posture checks, and CloudTrail records API calls so you can see who did what. Shield handles DDoS protection and Cognito handles application sign-in, so neither fits these situations." },

  { id: "vpc-routes-fill", d: 3, type: "fill", title: "Complete a VPC design",
    prompt: "Web servers run in public subnets and application servers in private subnets. Application servers must download updates from the internet but must not accept connections from it. Fill in the missing values.",
    context: "VPC 10.0.0.0/16\n\nRoute table: public-rt (public subnets)\nDestination    Target\n10.0.0.0/16    local\n0.0.0.0/0      [ A ]\n\nRoute table: private-rt (private subnets)\nDestination    Target\n10.0.0.0/16    local\n0.0.0.0/0      [ B ]\n\nDNS: shop.example.com -> load balancer   (service [ D ])",
    fields: [
      { label: "A: target for 0.0.0.0/0 in the public route table", answers: ["internet gateway", "an internet gateway", "igw"] },
      { label: "B: target for 0.0.0.0/0 in the private route table", answers: ["nat gateway", "a nat gateway", "nat", "nat gw"] },
      { label: "C: type of subnet the NAT gateway itself is placed in (public or private)", answers: ["public", "public subnet", "a public subnet"] },
      { label: "D: AWS DNS service that resolves shop.example.com", answers: ["route 53", "amazon route 53", "route53"] }
    ],
    explain: "A subnet is public because its route table sends internet traffic to an internet gateway. Private subnets send outbound internet traffic to a NAT gateway, which allows connections started from inside while blocking connections started from the internet. The NAT gateway must sit in a public subnet so it can reach the internet gateway itself. Amazon Route 53 is AWS's DNS service that maps the domain name to the load balancer." },

  { id: "storage-match", d: 3, type: "match", title: "Choose storage for each requirement",
    prompt: "Match each storage requirement to the AWS storage service or class that fits it best.",
    pairs: [
      ["Boot volume for a single EC2 instance that must persist after the instance stops", "Amazon EBS"],
      ["Shared NFS file system mounted by 20 Linux instances across three AZs", "Amazon EFS"],
      ["Compliance archive kept for 10 years at the lowest cost; retrieval within 48 hours is acceptable", "S3 Glacier Deep Archive"],
      ["SMB file shares integrated with Active Directory for Windows users", "Amazon FSx for Windows File Server"],
      ["Temporary scratch space for cache data that can be lost at any time", "Instance store"],
      ["On-premises backup software writing to virtual tapes stored in AWS", "AWS Storage Gateway (Tape Gateway)"]
    ],
    extra: ["S3 One Zone-IA", "Amazon ElastiCache"],
    explain: "EBS provides persistent block volumes for one instance in one AZ, while instance store is fast but temporary and loses data when the instance stops. EFS is a managed NFS file system many Linux clients can share across AZs; FSx for Windows File Server provides SMB shares with Active Directory integration. Glacier Deep Archive is the lowest-cost S3 class for long-term archives with retrieval in hours, and Tape Gateway lets existing backup software use virtual tapes backed by AWS. One Zone-IA is for infrequently accessed, re-creatable data, not long-term archives." },

  { id: "request-path-order", d: 3, type: "order", title: "Trace a request through a web architecture",
    prompt: "A customer opens shop.example.com in a browser and views a product page that is not in the cache. Put the steps in the order the request travels.",
    steps: [
      "Amazon Route 53 resolves shop.example.com to the CloudFront distribution",
      "The browser connects to a nearby Amazon CloudFront edge location",
      "CloudFront has a cache miss and forwards the request to the Application Load Balancer origin",
      "The Application Load Balancer sends the request to a healthy EC2 instance in a private subnet",
      "The EC2 instance queries the Amazon RDS database for product details"
    ],
    explain: "DNS resolution always comes first, so Route 53 answers with the CloudFront distribution's address. The browser then connects to an edge location; on a cache miss CloudFront fetches from its origin, here the load balancer. The load balancer routes only to healthy targets, and the application server finally reads data from the database before the response flows back along the same path." },

  { id: "purchase-options-match", d: 4, type: "match", title: "Choose EC2 purchase options",
    prompt: "Match each workload to the most cost-effective EC2 purchase option that meets its requirements.",
    pairs: [
      ["Steady compute across EC2, AWS Fargate and AWS Lambda for 3 years, with freedom to change instance families and Regions", "Compute Savings Plans"],
      ["Nightly video rendering jobs that can be interrupted and restarted", "Spot Instances"],
      ["A two-week load test with unpredictable usage that must not be interrupted", "On-Demand Instances"],
      ["Existing software licensed per physical core that requires visibility into sockets and cores", "Dedicated Hosts"],
      ["Compliance requires hardware not shared with other AWS accounts, with no need for host-level visibility", "Dedicated Instances"]
    ],
    extra: ["Capacity Reservations without commitment"],
    explain: "Compute Savings Plans trade a 1- or 3-year spend commitment for discounts that apply across EC2 families, Regions, Fargate and Lambda. Spot Instances are the cheapest but can be interrupted with a two-minute warning, so they suit restartable work. Short, unpredictable work that cannot be interrupted belongs on On-Demand. Dedicated Hosts give socket and core visibility for bring-your-own-license software, while Dedicated Instances give single-account hardware without that visibility." },

  { id: "consolidated-billing-fill", d: 4, type: "fill", title: "Calculate consolidated billing savings",
    prompt: "Two accounts join the same AWS Organization with consolidated billing. Using the illustrative tiered storage rates below (not real AWS prices), fill in the monthly storage costs in whole dollars.",
    context: "Illustrative tiered rates (per TB-month):\n  First 50 TB:   $20\n  Above 50 TB:   $15\n\nMonthly storage:\n  Account A: 30 TB\n  Account B: 40 TB",
    fields: [
      { label: "Combined cost if each account is billed separately ($)", answers: ["1400", "$1400", "1,400", "$1,400"] },
      { label: "Cost with consolidated billing ($)", answers: ["1300", "$1300", "1,300", "$1,300"] },
      { label: "Monthly savings ($)", answers: ["100", "$100"] }
    ],
    explain: "Billed separately, neither account passes 50 TB, so A pays 30 x $20 = $600 and B pays 40 x $20 = $800, a total of $1,400. With consolidated billing the organization is treated as one customer for volume tiers: the first 50 TB cost $1,000 and the remaining 20 TB fall into the cheaper tier at $300, for $1,300. The $100 difference is why AWS Organizations can lower costs even before Reserved Instance or Savings Plans sharing." }
]);
