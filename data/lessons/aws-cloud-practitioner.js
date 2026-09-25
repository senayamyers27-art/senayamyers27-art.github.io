/* Lessons for AWS Certified Cloud Practitioner (CLF-C02): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-cloud-practitioner", [
 {
  t: "Benefits of the AWS Cloud: pay-as-you-go pricing, economies of scale, agility, elasticity and global reach",
  body: [
   "Cloud computing is the on-demand delivery of IT resources, such as servers, storage, databases and software, over the internet with pay-as-you-go pricing. Instead of buying and running your own data center, you rent exactly the capacity you need from a provider like Amazon Web Services (AWS) and stop paying when you no longer need it. The Cloud Practitioner exam expects you to explain why a business would want that, in business terms as much as technical ones.",
   "Pay-as-you-go pricing means you pay for what you actually consume, usually measured per second, per hour, per request or per gigabyte, with no large up-front purchase. A project that fails costs you only what it used while it ran. Economies of scale describe why prices can be low: AWS buys hardware, power and network capacity for hundreds of thousands of customers, and that aggregated usage lowers its cost per unit. AWS has passed many of those savings on as price reductions over the years.",
   "Agility is about speed. In a traditional data center, getting a new server might take weeks of purchasing, shipping and racking. In AWS you can launch one in minutes from the console or with a single command. Because experiments are cheap and fast, teams can try ideas, measure them and throw away the ones that do not work. That lowers the cost of innovation, which is how AWS usually frames agility.",
   "Elasticity is the ability to add resources when demand rises and remove them when it falls, ideally automatically. A retailer can run ten web servers on an ordinary day and sixty during a holiday sale, then shrink back. You do not pay for idle capacity sitting around for the peak. Global reach means you can deploy to AWS Regions around the world in minutes, putting your application close to your users for lower latency and meeting local data residency rules without building a data center in each country.",
   "On the exam, match each benefit to its clue words. 'Pay only for what you use' is pay-as-you-go. 'Lower prices because of aggregated usage' is economies of scale. 'Launch resources in minutes' or 'experiment quickly' is agility. 'Scale in and out with demand' is elasticity. 'Deploy worldwide in minutes' is global reach."
  ],
  terms: [
   ["Pay-as-you-go", "A pricing approach where you pay only for the resources you consume, with no long-term commitment required."],
   ["Economies of scale", "Lower cost per unit that AWS achieves by aggregating the usage of a very large number of customers."],
   ["Agility", "The ability to provision resources and try new ideas quickly, lowering the cost and time of experimentation."],
   ["Elasticity", "Automatically acquiring resources when demand increases and releasing them when demand decreases."],
   ["Global reach", "Deploying applications in multiple geographic Regions quickly to serve users around the world with low latency."]
  ],
  example: "A small online ticketing company expects huge traffic for one concert on-sale day each month. Instead of buying servers sized for that one day, it runs a small fleet most of the month and lets it grow automatically during on-sale events, paying for the extra servers only for the hours they run.",
  tip: "Agility is about speed of provisioning and experimentation, while elasticity is about matching capacity to changing demand. Questions often put both in the options, so look for whether the scenario is about time-to-launch or about fluctuating load.",
  check: [
   ["A startup wants to test a new feature for a week and delete everything afterward without a purchase order. Which cloud benefit does this show most directly?", "Agility, combined with pay-as-you-go pricing: resources can be launched in minutes and paid for only while they run."],
   ["Why can AWS offer lower prices than a single company running its own data center?", "Economies of scale: AWS aggregates the usage of many customers, which lowers its per-unit costs."]
  ]
 },
 {
  t: "The six advantages of cloud computing, including trading fixed expense for variable expense and no longer guessing capacity",
  body: [
   "AWS summarizes the business case for the cloud as six advantages. They appear in AWS whitepapers and training, and the exam often quotes them almost word for word, so it pays to know the exact phrases and what each one means.",
   "First, trade fixed expense for variable expense. Instead of investing heavily in data centers and servers before you know how you will use them (capital expense, or CapEx), you pay only when you consume computing resources (operational expense, or OpEx). Second, benefit from massive economies of scale: because usage from many customers is aggregated, AWS can achieve lower variable costs than you could on your own. Third, stop guessing capacity. On premises you must predict demand months ahead, and you either overbuy and waste money or underbuy and suffer outages. In the cloud you can scale up and down within minutes as demand actually arrives.",
   "Fourth, increase speed and agility: new resources are a click or an API call away, so the time to make them available to developers drops from weeks to minutes. Fifth, stop spending money running and maintaining data centers. Racking, stacking, powering and cooling servers is undifferentiated heavy lifting, work that every company must do but that does not make its product better. Moving it to AWS lets you focus on your customers. Sixth, go global in minutes: you can deploy to multiple Regions around the world with a few clicks.",
   "The exam usually describes a situation and asks which advantage it illustrates. A company tired of buying servers for a peak that never comes is about to 'stop guessing capacity'. A finance team that wants to avoid large up-front hardware purchases is looking at 'trade fixed expense for variable expense'. A team that wants engineers working on features rather than replacing failed disks is after 'stop spending money running and maintaining data centers'.",
   "Keep in mind that the cloud does not make every cost variable. Commitments such as Reserved Instances and Savings Plans trade some flexibility for a discount, which you will study in the billing domain. But the default model is variable, usage-based spending."
  ],
  terms: [
   ["Capital expense (CapEx)", "Money spent up front on physical assets such as servers and buildings, usually depreciated over years."],
   ["Operational expense (OpEx)", "Ongoing spending on services consumed, such as a monthly cloud bill that varies with usage."],
   ["Undifferentiated heavy lifting", "IT work every company must do, like maintaining hardware, that does not set the business apart from competitors."],
   ["Capacity planning", "Forecasting how much infrastructure you will need; the cloud reduces the penalty for getting the forecast wrong."]
  ],
  example: "A regional bank used to buy storage arrays every three years sized for predicted growth, and half the capacity sat unused for the first two years. After moving its archives to Amazon S3, it pays each month only for the data it actually stores, turning a large fixed purchase into a variable expense and removing the need to guess capacity.",
  tip: "Memorize the six phrases exactly. Distractors often sound plausible but are not on the list, such as 'eliminate all security responsibility' or 'guarantee zero downtime'. The cloud reduces infrastructure work, but it never removes the customer's security responsibilities.",
  check: [
   ["Which advantage of cloud computing describes replacing large up-front hardware purchases with paying for resources as they are consumed?", "Trade fixed expense for variable expense (CapEx for OpEx)."],
   ["A company keeps buying too many servers because it cannot predict demand. Which advantage addresses this?", "Stop guessing capacity: in the cloud you scale to actual demand instead of forecasting months ahead."]
  ]
 },
 {
  t: "High availability, fault tolerance, scalability and elasticity: what each term means and how AWS delivers it",
  body: [
   "These four terms sound similar, and the exam deliberately uses them as distractors for each other. Learning precise definitions and the AWS feature behind each one will earn you easy points.",
   "High availability means a system stays up and usable most of the time, with minimal downtime, even when individual components fail. It usually tolerates a short interruption while traffic moves to healthy resources. In AWS you achieve it by running resources in more than one Availability Zone (AZ), which are separate data center groups within a Region, and by putting an Elastic Load Balancer in front of them so traffic only goes to healthy targets. A database such as Amazon RDS with Multi-AZ deployment keeps a standby in another AZ and fails over to it automatically.",
   "Fault tolerance is a stricter idea: the system keeps operating with no interruption and no loss of data when a component fails, because redundant components are already doing the work. Think of an aircraft with multiple engines. Fault tolerance usually costs more because you pay for fully redundant capacity all the time. Many AWS managed services are built this way internally; for example, Amazon S3 stores objects redundantly across multiple AZs in a Region.",
   "Scalability is the ability of a system to handle more load by adding resources. You can scale vertically (scale up) by moving to a bigger instance with more CPU and memory, or horizontally (scale out) by adding more instances. Horizontal scaling is generally preferred in the cloud because there is no ceiling of a single machine and it also improves availability. Elasticity is scalability that happens automatically in both directions, growing and shrinking with demand, so you pay only for what the current load needs. Amazon EC2 Auto Scaling, AWS Lambda and Amazon DynamoDB on-demand capacity are all examples of elastic services.",
   "A useful summary: high availability is about minimizing downtime, fault tolerance is about zero interruption, scalability is about the ability to grow, and elasticity is about growing and shrinking automatically to match demand."
  ],
  terms: [
   ["High availability", "Designing a system so it remains accessible with minimal downtime, typically by running across multiple Availability Zones."],
   ["Fault tolerance", "The ability of a system to continue operating without interruption when one or more components fail."],
   ["Vertical scaling", "Increasing the size of a single resource, such as moving to an instance type with more CPU or memory."],
   ["Horizontal scaling", "Adding or removing resources of the same kind, such as more EC2 instances behind a load balancer."],
   ["Elasticity", "Automatic scaling out and in so that capacity closely follows demand."]
  ],
  example: "An online store runs its web tier on EC2 instances in two Availability Zones behind an Application Load Balancer, with an Auto Scaling group that adds instances when CPU is high and removes them overnight. If one AZ has a problem, the load balancer sends traffic to the other AZ (high availability), and the fleet size follows demand (elasticity).",
  tip: "If a question stresses 'no downtime at all' or 'continues to operate without interruption', the answer is fault tolerance. If it stresses 'automatically adds and removes capacity based on demand', the answer is elasticity, not just scalability.",
  check: [
   ["What is the simplest AWS design change to make a single-instance web application highly available?", "Run instances in at least two Availability Zones behind an Elastic Load Balancer, ideally managed by an Auto Scaling group."],
   ["What is the difference between scaling up and scaling out?", "Scaling up (vertical) makes one resource bigger; scaling out (horizontal) adds more resources. Scaling out avoids the limit of a single machine and improves availability."]
  ]
 },
 {
  t: "AWS Well-Architected Framework: the six pillars and what each one is responsible for",
  body: [
   "The AWS Well-Architected Framework is a set of best practices and questions that help you design and review workloads in the cloud. It is organized into six pillars. On the exam you will be given a goal or a practice and asked which pillar it belongs to, so learn each pillar's focus and a few typical practices.",
   "Operational excellence is about running and monitoring systems to deliver business value and continually improving processes. Practices include performing operations as code, making frequent, small, reversible changes, refining procedures often and learning from operational events and failures. Security is about protecting data, systems and assets: implementing a strong identity foundation with least privilege, enabling traceability through logging, applying security at all layers, automating security best practices and protecting data in transit and at rest.",
   "Reliability is about a workload performing its intended function correctly and consistently, including recovering from failures. Practices include automatically recovering from failure, testing recovery procedures, scaling horizontally, stopping guessing capacity and managing change through automation. Performance efficiency is about using computing resources efficiently as demand changes and technology evolves: democratizing advanced technologies by using managed services, going global in minutes, using serverless architectures, experimenting more often and choosing the right resource type for the job.",
   "Cost optimization is about delivering business value at the lowest price point: adopting a consumption model, measuring overall efficiency, stopping spending on undifferentiated heavy lifting, analyzing and attributing expenditure (for example with cost allocation tags) and rightsizing. Sustainability, the newest pillar, is about minimizing the environmental impact of running cloud workloads: understanding your impact, maximizing utilization, adopting more efficient hardware and managed services, and reducing the downstream impact of your workloads.",
   "Some practices touch more than one pillar, so read the question's emphasis. 'Recover automatically from an AZ failure' is reliability. 'Choose the right instance type to meet performance needs' is performance efficiency, while 'choose the right instance size to stop paying for unused capacity' is cost optimization. 'Reduce idle resources to lower energy use' points to sustainability."
  ],
  terms: [
   ["Operational excellence", "The pillar focused on running workloads effectively, gaining insight into operations and continually improving processes."],
   ["Reliability", "The pillar focused on a workload performing correctly and consistently and recovering quickly from failures."],
   ["Performance efficiency", "The pillar focused on using computing resources efficiently to meet requirements as demand and technology change."],
   ["Cost optimization", "The pillar focused on running systems to deliver business value at the lowest price point."],
   ["Sustainability", "The pillar focused on reducing the environmental impact of cloud workloads, for example by maximizing utilization."]
  ],
  example: "During a design review, an architect notes that a company's database runs in one Availability Zone with no tested backup restore (a reliability issue), that engineers log in to servers to patch them by hand (an operational excellence issue), and that development servers run all weekend with nobody using them (a cost optimization and sustainability issue).",
  tip: "Watch for the pairs that get confused: reliability vs performance efficiency (recovering from failure vs using the right resources for speed), and cost optimization vs sustainability (money vs environmental impact). There are six pillars; sustainability is the one people forget.",
  check: [
   ["Which Well-Architected pillar includes the design principle 'perform operations as code'?", "Operational excellence."],
   ["A team wants to make sure its application automatically recovers when an instance fails and regularly tests its recovery procedures. Which pillar is this?", "Reliability."],
   ["Which pillar focuses on maximizing utilization to reduce energy consumption?", "Sustainability."]
  ]
 },
 {
  t: "Cloud design principles: loose coupling, designing for failure, automation and operations as code",
  body: [
   "Beyond the six pillars, AWS teaches a handful of general design principles for cloud architectures. The Cloud Practitioner exam checks that you recognize them and can pick the architecture that follows them.",
   "Loose coupling means components interact through well-defined interfaces and do not depend directly on each other's availability or timing. If a web tier calls an order-processing tier directly and the processing tier slows down, the web tier fails too; that is tight coupling. If instead the web tier puts orders on an Amazon Simple Queue Service (SQS) queue and the processing tier reads from it, either side can scale, fail or be replaced without breaking the other. Load balancers, queues, notifications through Amazon SNS and events through Amazon EventBridge are the typical tools for decoupling.",
   "Designing for failure starts from the assumption that everything fails eventually: disks, instances, even whole data centers. Rather than hoping nothing breaks, you build in redundancy and automatic recovery. Run across multiple Availability Zones, avoid single points of failure, keep backups and test that you can restore them, and use health checks so failed resources are replaced automatically. A related idea is to treat servers as disposable resources: if an instance misbehaves, terminate it and let automation launch a fresh one instead of repairing it by hand.",
   "Automation removes slow, error-prone manual steps. Auto Scaling adds and removes capacity, health checks replace failed instances, and alarms trigger actions. Operations as code, sometimes called infrastructure as code (IaC), means defining your infrastructure and operational procedures in files that can be version-controlled, reviewed and run repeatedly. AWS CloudFormation templates are the main AWS example; you describe the resources you want and CloudFormation creates them the same way every time.",
   "Other principles you may see include using managed services instead of running your own software on servers, thinking parallel (spreading work over many small resources), and making frequent, small, reversible changes. When the exam asks which architecture is most resilient or easiest to scale, the answer is usually the one that is decoupled, spread across AZs and automated."
  ],
  terms: [
   ["Loose coupling", "Designing components so they interact through interfaces like queues or load balancers and a failure in one does not cascade to others."],
   ["Single point of failure", "A component whose failure brings down the whole system because nothing else can take over its work."],
   ["Infrastructure as code (IaC)", "Defining infrastructure in machine-readable template files so it can be versioned, reviewed and deployed repeatably."],
   ["Disposable resources", "Treating servers as replaceable units that are terminated and recreated automatically rather than repaired by hand."]
  ],
  example: "A photo-sharing site used to resize images inside the upload request, and uploads failed whenever resizing was slow. The team changed the design so the web tier stores the upload in S3 and sends a message to an SQS queue, and a separate worker fleet resizes images from the queue. Uploads now succeed even when the workers are busy or being replaced.",
  tip: "When a question asks how to decouple components or absorb spikes between tiers, think Amazon SQS. When it asks how to provision identical environments repeatedly, think AWS CloudFormation (operations as code).",
  check: [
   ["Which AWS service is most commonly used to decouple a producer tier from a consumer tier so they can scale independently?", "Amazon SQS, a managed message queue: the producer writes messages and the consumer processes them at its own pace."],
   ["What does 'design for failure' look like in practice?", "Assume components will fail and build redundancy and automatic recovery, for example running across multiple AZs with health checks and tested backups."]
  ]
 },
 {
  t: "The AWS Well-Architected Tool and running a Well-Architected review",
  body: [
   "The AWS Well-Architected Tool is a service in the AWS Management Console that helps you review a workload against the Well-Architected Framework. It turns the framework's best practices into a structured questionnaire and records your answers so you can track improvement over time. The tool is available in the console at no additional charge, which makes it a good first hands-on exercise.",
   "A review starts by defining a workload: a set of components that together deliver business value, such as an e-commerce application with its web servers, database and storage. You give it a name, the environment (production or pre-production), the Regions it uses and optionally the review owner. Then you answer questions pillar by pillar, for example how you manage identities, how you back up data, or how you monitor workload resources. For each question you tick the best practices you already follow.",
   "Based on your answers, the tool identifies high-risk issues (HRIs) and medium-risk issues and links each one to improvement guidance. The result is an improvement plan: a prioritized list of changes that would bring the workload closer to best practice. You can save a milestone, a snapshot of the review at a point in time, and later compare new answers against it to show progress. Reports can be generated as PDFs to share with stakeholders.",
   "The framework also offers lenses, which add questions for a particular technology or industry, such as a Serverless Lens or a SaaS Lens. Organizations can write custom lenses for their own standards. You can share a workload with other AWS accounts or users so several teams can work on the same review.",
   "A Well-Architected review is not an audit and does not change any resources. It is a conversation, often run by the team that owns the workload, sometimes with help from an AWS Solutions Architect or an AWS Partner. The goal is to find risks early and prioritize fixes, not to assign blame. On the exam, if a company wants to 'review its architecture against AWS best practices' or 'identify high-risk issues in a workload', the answer is the AWS Well-Architected Tool."
  ],
  terms: [
   ["Workload", "A collection of resources and code that together deliver business value, the unit you review in the Well-Architected Tool."],
   ["High-risk issue (HRI)", "An architectural choice identified during a review that could have a significant negative impact on the business."],
   ["Milestone", "A saved snapshot of a workload review that lets you track improvements over time."],
   ["Lens", "An extension of the framework with extra questions for a specific technology or industry domain."]
  ],
  example: "Before a major product launch, a team opens the Well-Architected Tool, defines its checkout service as a workload and answers the questions for all six pillars. The tool flags two high-risk issues: no tested database restore and no alarms on error rates. The team fixes both, saves a milestone and shows management the improvement.",
  tip: "Don't confuse the Well-Architected Tool (reviews a workload's design against best practices) with AWS Trusted Advisor (automatically inspects your actual account resources and gives recommendations) or AWS Config (tracks resource configurations and compliance with rules).",
  check: [
   ["What does the AWS Well-Architected Tool produce after you answer the review questions?", "A list of high- and medium-risk issues with an improvement plan, which you can save as milestones and export as reports."],
   ["Does a Well-Architected review change your AWS resources?", "No. It is a questionnaire-based review of design practices; any changes are made separately by the team."]
  ]
 },
 {
  t: "AWS Cloud Adoption Framework (AWS CAF): the six perspectives and the business benefits of adoption",
  body: [
   "Moving to the cloud is as much an organizational change as a technical one. The AWS Cloud Adoption Framework (AWS CAF) collects AWS's guidance for planning and carrying out that change. It groups the capabilities an organization needs into six perspectives, each associated with the stakeholders who own them.",
   "Three perspectives are business-focused. The Business perspective makes sure cloud investments accelerate business outcomes and support the digital strategy; stakeholders include the CEO, CFO and chief strategy officer. The People perspective bridges technology and business, covering culture, organizational structure, leadership, training and workforce transformation; its stakeholders include HR and people leaders. The Governance perspective helps orchestrate cloud initiatives while maximizing benefits and minimizing risk, covering program and portfolio management, risk management, cloud financial management and data governance; stakeholders include the CIO, program managers and enterprise architects.",
   "Three perspectives are technical. The Platform perspective helps build an enterprise-grade, scalable hybrid cloud platform, modernize workloads and implement cloud-native solutions; stakeholders include the CTO, architects and engineers. The Security perspective covers the confidentiality, integrity and availability of data and workloads, including identity and access management, threat detection, infrastructure protection and incident response; stakeholders include the CISO and security engineers. The Operations perspective makes sure cloud services are delivered at a level that meets business needs, covering observability, event and incident management, change management and patching; stakeholders include IT operations and site reliability teams.",
   "The CAF describes the business outcomes of cloud transformation as reduced business risk, improved environmental, social and governance (ESG) performance, increased revenue and increased operational efficiency. It also describes an iterative transformation journey in four phases: envision (identify opportunities), align (find capability gaps and dependencies), launch (deliver pilot projects) and scale (expand pilots to production).",
   "For the exam, match the concern to a perspective. Staff training and skills are People. Budgets, risk and portfolio management are Governance. Designing the cloud landscape and architectures is Platform. Monitoring and incident management are Operations."
  ],
  terms: [
   ["AWS CAF", "AWS guidance that organizes the capabilities needed for successful cloud adoption into six perspectives."],
   ["Business perspective", "The CAF perspective that ties cloud investments to business outcomes and strategy."],
   ["People perspective", "The CAF perspective covering culture, organizational change, leadership and skills."],
   ["Governance perspective", "The CAF perspective covering program management, risk, cloud financial management and data governance."],
   ["Transformation phases", "Envision, align, launch and scale: the iterative steps the CAF recommends for cloud transformation."]
  ],
  example: "A hospital group plans its move to AWS. The HR team builds a cloud training program for administrators (People), finance sets up cost tracking and budget ownership (Governance), and the security office designs identity and logging standards (Security), all following the CAF's guidance.",
  tip: "Governance and Operations are easy to mix up. Governance is about managing the program, risk and money; Operations is about keeping services running day to day, such as monitoring, incidents and patching.",
  check: [
   ["Which AWS CAF perspective addresses training employees in cloud skills and managing organizational change?", "The People perspective."],
   ["Name the four business outcomes the AWS CAF lists for cloud transformation.", "Reduced business risk, improved ESG performance, increased revenue and increased operational efficiency."]
  ]
 },
 {
  t: "Migration strategies (the 7 Rs): rehost, replatform, refactor, repurchase, retire, retain and relocate",
  body: [
   "When an organization moves its applications to AWS, it rarely treats them all the same way. AWS describes seven common migration strategies, known as the 7 Rs. During migration planning, each application in the portfolio is assigned one of them based on its business value, complexity and the time available.",
   "Rehost, often called lift and shift, moves an application to AWS without changing it, for example copying a server as-is onto Amazon EC2. It is fast and lets you migrate large numbers of servers quickly, and you can optimize later once they are running in the cloud. Replatform, sometimes called lift, tinker and shift, makes a few cloud optimizations without changing the core architecture; moving a self-managed database to Amazon RDS so AWS handles patching and backups is the classic example.",
   "Refactor, also called re-architect, reimagines how the application is built, typically using cloud-native features such as serverless functions, containers or managed databases. It takes the most effort but can bring the most benefit in scalability, agility and cost. Repurchase means moving to a different product, usually replacing a self-hosted application with a software as a service (SaaS) offering, such as dropping an on-premises customer relationship management system for a SaaS one.",
   "Retire means decommissioning applications that are no longer needed; portfolio reviews often find a surprising number of them. Retain, or revisit, means keeping an application where it is for now, perhaps because it was recently upgraded, depends on hardware that cannot move, or is not worth migrating yet. Relocate means moving infrastructure to the cloud without buying new hardware, rewriting applications or changing operations, for example moving VMware-based workloads to a VMware environment running on AWS.",
   "On the exam, spot the key phrases: 'no code changes, as quickly as possible' is rehost; 'minor optimizations such as a managed database' is replatform; 'rebuild using cloud-native services' is refactor; 'switch to a SaaS product' is repurchase; 'turn it off' is retire; 'keep on premises for now' is retain."
  ],
  terms: [
   ["Rehost", "Lift and shift: moving an application to the cloud without modifying it."],
   ["Replatform", "Making a few cloud optimizations, such as a managed database, without changing the application's core architecture."],
   ["Refactor", "Re-architecting an application to use cloud-native features, the most effort and often the most benefit."],
   ["Repurchase", "Replacing an application with a different product, usually a SaaS offering."],
   ["Retain", "Keeping an application in its current environment for now and revisiting the decision later."]
  ],
  example: "A retailer reviews 200 applications. It rehosts 120 standard web servers to EC2 to meet a data center lease deadline, replatforms its product database to Amazon RDS, repurchases its in-house email system as a SaaS product, retires 25 unused reporting tools and retains a mainframe that it will revisit next year.",
  tip: "Replatform vs refactor is the classic trap. Moving a database onto RDS without redesigning the application is replatform; rewriting a monolith into microservices or serverless functions is refactor.",
  check: [
   ["A company must leave its data center in three months and wants to move hundreds of servers without changing them. Which strategy fits best?", "Rehost (lift and shift), because it is the fastest and requires no application changes."],
   ["Replacing an on-premises HR application with a SaaS product is which migration strategy?", "Repurchase."]
  ]
 },
 {
  t: "Migration tools: AWS Application Migration Service, AWS DMS with the Schema Conversion Tool, and AWS DataSync",
  body: [
   "AWS offers dedicated services to carry out migrations. The exam expects you to pick the right one for what is being moved: whole servers, databases or files.",
   "AWS Application Migration Service (often shortened to AWS MGN) is the primary AWS service for rehosting (lift and shift). You install a replication agent on your source servers, which can be physical, virtual or in another cloud. The service continuously replicates the servers' disks to a staging area in your AWS account, so you can launch test instances at any time without disrupting the source. When you are ready, you perform a cutover and the servers are launched as Amazon EC2 instances. Continuous replication keeps the cutover window short.",
   "AWS Database Migration Service (AWS DMS) migrates databases to AWS. The source database remains fully operational during the migration, which minimizes downtime, and DMS can keep replicating ongoing changes until you switch over. DMS supports homogeneous migrations, where source and target use the same engine (for example Oracle to Oracle), and heterogeneous migrations, where they differ (for example Oracle to Amazon Aurora PostgreSQL). For heterogeneous migrations, the schema, meaning tables, views, stored procedures and other code objects, must first be converted to the target engine's dialect. That is the job of the AWS Schema Conversion Tool (AWS SCT); DMS also offers built-in schema conversion in the console. DMS then moves the data.",
   "AWS DataSync is an online data transfer service for files and objects. It moves data between on-premises storage systems (such as NFS or SMB file shares) and AWS storage services such as Amazon S3, Amazon EFS and Amazon FSx, and also between AWS storage services. It handles scheduling, encryption in transit, data integrity checks and incremental transfers, so it is well suited to one-time migrations and recurring syncs of large file sets over the network.",
   "For very large datasets where network transfer would be too slow, AWS also offers offline transfer devices in the AWS Snow Family, but the key mapping for this topic is: servers go with Application Migration Service, databases with DMS (plus SCT when engines differ), and file shares with DataSync."
  ],
  terms: [
   ["AWS Application Migration Service", "A service that replicates source servers continuously to AWS and launches them as EC2 instances for lift-and-shift migration."],
   ["AWS DMS", "AWS Database Migration Service, which migrates databases to AWS while the source stays operational, including ongoing change replication."],
   ["Heterogeneous migration", "A database migration where the source and target engines differ, requiring schema conversion."],
   ["AWS Schema Conversion Tool (SCT)", "A tool that converts database schemas and code objects from one engine's format to another's."],
   ["AWS DataSync", "An online service that transfers files and objects between on-premises storage and AWS storage services."]
  ],
  example: "A manufacturer moves 40 Windows and Linux application servers to EC2 with Application Migration Service, converts its Oracle schema to Aurora PostgreSQL with SCT and moves the data with DMS while production keeps running, and copies 30 TB of engineering drawings from a NAS file share to Amazon EFS using DataSync.",
  tip: "If the source and target database engines are different, look for DMS together with the Schema Conversion Tool. DMS alone moves data; SCT converts the schema. DataSync moves files, not databases.",
  check: [
   ["Which service converts an Oracle schema so it can run on Amazon Aurora PostgreSQL?", "The AWS Schema Conversion Tool (or DMS schema conversion); AWS DMS then migrates the data."],
   ["Which service would you use to lift and shift a fleet of on-premises servers to EC2 with minimal downtime?", "AWS Application Migration Service, which continuously replicates the servers and launches them on EC2 at cutover."]
  ]
 },
 {
  t: "Cloud economics: fixed vs variable costs, total cost of ownership and the costs that move to AWS",
  body: [
   "Cloud economics is about understanding what running IT really costs and how that changes when you move to AWS. The exam focuses on a few ideas: the shift from fixed to variable costs, total cost of ownership, and which costs you stop paying and which you still carry.",
   "On premises, most IT costs are fixed. You buy servers, storage, network gear and data center space up front or on long contracts, and you pay for them whether they are busy or idle. In AWS, most costs are variable: they rise and fall with usage. That improves cash flow and removes the penalty for over-provisioning, although it also means an unmonitored account can grow expensive, which is why cost tools and budgets matter.",
   "Total cost of ownership (TCO) is the full cost of owning and running a system over its life, not just the purchase price. For an on-premises server that includes the hardware, software licenses, data center space, power and cooling, network connectivity, physical security, hardware maintenance contracts, and the staff time to rack, patch and replace equipment. A fair comparison with AWS weighs all of these against the AWS bill plus whatever work remains on your side. Many costs are hidden on premises, like the power bill paid by facilities, so TCO analyses often surprise people.",
   "When you move to AWS, several cost categories largely move to AWS: buying and refreshing physical hardware, data center real estate, power and cooling, physical security and hardware maintenance. You still pay for the services you use, and you still carry the cost of staff who design, secure, operate and optimize your workloads, application licenses you bring, and data transfer. Managed services shift even more work to AWS: with Amazon RDS, AWS handles database patching and backups, which lowers your operational labor.",
   "The exam also expects you to know the difference between direct costs (the clear price of a server or service) and indirect costs (people's time, downtime, opportunity cost). Much of the cloud's financial value comes from reduced indirect costs, such as faster delivery of new features."
  ],
  terms: [
   ["Fixed cost", "A cost that stays the same regardless of usage, such as a purchased server or a data center lease."],
   ["Variable cost", "A cost that changes with consumption, such as paying per hour for an EC2 instance."],
   ["Total cost of ownership (TCO)", "The complete cost of acquiring, operating and maintaining a system over its lifetime, including indirect costs."],
   ["Indirect cost", "A cost not tied to a single line item, such as staff time spent on maintenance or lost revenue during outages."]
  ],
  example: "A media company compares keeping its render farm on premises with running it on AWS. The on-premises TCO includes servers, a power upgrade, cooling, two technicians' time and a five-year refresh cycle. On AWS the farm runs only while projects are active, so the comparison favors AWS even though the per-hour price of a cloud instance looks higher than the hourly cost of an owned server.",
  tip: "Questions about 'costs that are eliminated or reduced when moving to AWS' want physical items: hardware purchases, data center space, power, cooling and physical security. Application development, security configuration and staff who manage your workloads do not disappear.",
  check: [
   ["Name three on-premises costs that a TCO analysis should include beyond the server purchase price.", "Any three of: data center space, power and cooling, networking, physical security, maintenance contracts, software licenses and staff time."],
   ["Why can a cloud bill grow unexpectedly even though there is no up-front cost?", "Because costs are variable: resources left running or overused keep generating charges, so monitoring and budgets are needed."]
  ]
 },
 {
  t: "Licensing strategies (bring your own license vs license included) and rightsizing to cut waste",
  body: [
   "Software licenses can be a big part of a cloud bill, especially for commercial operating systems and databases. AWS offers two broad licensing models, and the exam expects you to know when each makes sense.",
   "With license included, the software license cost is built into the hourly price of the AWS resource. For example, you can launch an Amazon EC2 instance running Windows Server, or an Amazon RDS for SQL Server database, and the license is part of what you pay AWS. You do not have to buy, track or true-up licenses yourself, and you can stop paying as soon as you stop the resource. This model is simple and fits variable or short-lived workloads.",
   "With bring your own license (BYOL), you use licenses you already own and pay AWS only for the infrastructure. This can save money if your organization has already invested in licenses, for example through an enterprise agreement. However, some licenses are tied to physical hardware, counted per socket or per core, which is why AWS offers Amazon EC2 Dedicated Hosts: physical servers dedicated to you, with visibility into sockets and cores so you can meet those license terms. Always check the software vendor's license terms before bringing a license to the cloud. AWS License Manager helps track license usage and enforce limits across accounts.",
   "Rightsizing is the process of matching instance types and sizes to the actual workload so you are not paying for capacity you do not use. Teams moving from on premises often choose instance sizes that mirror old hardware, which was usually oversized for peak demand. By looking at real utilization data, such as CPU, memory and network use in Amazon CloudWatch, you can move to a smaller size or a different instance family. AWS Compute Optimizer and Cost Explorer's rightsizing recommendations analyze usage and suggest changes.",
   "Rightsizing is continuous, not a one-time task. Workloads change, and AWS releases new instance generations that often give better price-performance. Other ways to cut waste include turning off non-production resources outside working hours and deleting unattached storage volumes and old snapshots."
  ],
  terms: [
   ["License included", "A model where the software license cost is part of the AWS resource's price."],
   ["Bring your own license (BYOL)", "Using software licenses you already own on AWS infrastructure, paying AWS only for the resources."],
   ["Dedicated Host", "A physical EC2 server dedicated to your use, with socket and core visibility to support hardware-bound licenses."],
   ["Rightsizing", "Matching resource types and sizes to actual workload requirements to eliminate unused capacity and cost."]
  ],
  example: "A company migrating SQL Server finds it already owns core-based licenses under an enterprise agreement that permits use on dedicated hardware. It runs those databases on EC2 Dedicated Hosts with BYOL. After a month it reviews CloudWatch metrics and Compute Optimizer recommendations and moves several app servers that never exceed 10 percent CPU to smaller instance sizes.",
  tip: "If a question mentions existing licenses tied to sockets or physical cores, the answer is Dedicated Hosts with BYOL. If it asks how to avoid managing licenses at all, choose license-included instances.",
  check: [
   ["Which EC2 option gives the visibility into physical sockets and cores needed for some BYOL licenses?", "Amazon EC2 Dedicated Hosts."],
   ["What data should you look at before rightsizing an instance?", "Actual utilization over time, such as CPU, memory and network metrics from CloudWatch, often summarized by AWS Compute Optimizer."]
  ]
 },
 {
  t: "The AWS shared responsibility model: security of the cloud vs security in the cloud",
  body: [
   "Security in AWS is a shared job. The shared responsibility model spells out which parts AWS takes care of and which parts remain yours. It is one of the most tested ideas on the Cloud Practitioner exam, and almost every security question is easier once you have it straight.",
   "AWS is responsible for security of the cloud. That means protecting the infrastructure that runs all AWS services: the physical data centers and their guards, the hardware, the global network, and the virtualization layer (the hypervisor) that separates customers' instances. AWS also operates and patches the software of its managed services. You cannot visit an AWS data center, and you do not need to worry about someone stealing a disk from a rack; that is AWS's job.",
   "You, the customer, are responsible for security in the cloud. That covers what you put in AWS and how you configure it: your data and whether it is encrypted, identity and access management (who can do what), the operating systems and applications on your EC2 instances including patches, network settings such as security groups and network ACLs, and client-side and server-side encryption choices. If you leave an Amazon S3 bucket open to the public, that is a customer configuration problem, not an AWS failure.",
   "Some controls are shared. Patch management is shared: AWS patches the infrastructure and managed services, and you patch your guest operating systems and applications. Configuration management is shared: AWS configures its infrastructure, and you configure your databases, operating systems and applications. Awareness and training is shared too: AWS trains its employees, and you train yours.",
   "A simple way to remember it: if you can touch it in the console or API and choose its settings, you are probably responsible for it. If it is physical or below the hypervisor, it belongs to AWS. The split moves depending on the service type, which the next lesson covers, but customer data and access management are always the customer's responsibility."
  ],
  terms: [
   ["Security of the cloud", "AWS's responsibility for the physical facilities, hardware, network and virtualization layer that run its services."],
   ["Security in the cloud", "The customer's responsibility for data, identities, configurations, operating systems and applications they run on AWS."],
   ["Shared control", "A control where AWS and the customer each handle a layer, such as patching, configuration management and training."],
   ["Hypervisor", "The virtualization software that runs virtual machines on physical hosts and isolates customers; AWS secures it."]
  ],
  example: "A company's data leaks because an S3 bucket was configured to allow public reads. In the post-incident review, the team confirms that AWS's infrastructure worked as designed; the bucket policy was a customer setting, so fixing it and preventing a repeat with S3 Block Public Access is the customer's responsibility.",
  tip: "Customer data, IAM users and permissions, and security group rules are always the customer's job, whatever the service. Physical security, hardware disposal and the hypervisor are always AWS's job.",
  check: [
   ["Who is responsible for patching the guest operating system on an Amazon EC2 instance?", "The customer. AWS patches the underlying host and hypervisor; the customer patches the OS and applications inside the instance."],
   ["Name two controls that are shared between AWS and the customer.", "Patch management, configuration management, and awareness and training are the standard examples."]
  ]
 },
 {
  t: "How responsibilities shift across Amazon EC2, Amazon RDS, AWS Lambda and Amazon S3",
  body: [
   "The shared responsibility model is not one fixed line. The more AWS manages for you, the more responsibility moves to AWS. Comparing four common services makes the shift clear, and the exam loves asking 'who does what' for exactly these.",
   "Amazon EC2 is infrastructure as a service (IaaS). AWS secures the physical host, the network and the hypervisor. You are responsible for almost everything above that: choosing and patching the guest operating system, installing and updating applications, configuring the host-based firewall and security groups, managing IAM permissions and keys, and protecting and backing up your data. EC2 gives you the most control and therefore the most responsibility.",
   "Amazon RDS is a managed database service. AWS takes on the database host's operating system, installing the database engine, patching it (during a maintenance window you choose), running automated backups and handling Multi-AZ failover when you enable it. You still manage who can connect (security groups, database users and IAM), whether storage is encrypted, which parameter settings and backup retention you choose, and the data and queries themselves. You cannot log in to the operating system of a standard RDS instance, which is a clue that the OS is AWS's job.",
   "AWS Lambda is serverless compute. You upload your function code and AWS runs it, so AWS handles the servers, operating system, runtime patching (for managed runtimes), scaling and availability. Your responsibility shrinks to your function code and its dependencies, the IAM execution role and its permissions, the configuration you set and the data your code handles.",
   "Amazon S3 is an abstracted storage service. AWS manages the storage infrastructure, durability and availability. You are responsible for your objects, bucket policies and access control, S3 Block Public Access settings, encryption choices, versioning and lifecycle settings. The pattern across all four: AWS owns more as you move from EC2 to RDS to Lambda and S3, but data, identities and access settings always stay with you."
  ],
  terms: [
   ["Infrastructure as a service (IaaS)", "A model like EC2 where AWS provides virtual infrastructure and the customer manages the OS and everything above it."],
   ["Managed service", "A service like RDS where AWS operates the underlying software, patching and backups on the customer's behalf."],
   ["Serverless", "A model like Lambda where the customer supplies code and AWS runs, scales and patches the underlying compute."],
   ["Execution role", "The IAM role a Lambda function assumes to access other AWS services; its permissions are the customer's responsibility."]
  ],
  example: "A team moves its self-managed MySQL server on EC2 to Amazon RDS for MySQL. They no longer patch the operating system or the database engine and no longer write backup scripts, because RDS does that. They still decide who can reach the database through security groups, turn on storage encryption and manage database user accounts.",
  tip: "The operating system is the key signal. On EC2 you patch it; on RDS and Lambda AWS patches it. But in every service you configure access and protect your data.",
  check: [
   ["For Amazon RDS, who applies database engine patches?", "AWS applies them, during the maintenance window the customer chooses."],
   ["For an AWS Lambda function, what are the customer's main security responsibilities?", "The function code and dependencies, the IAM execution role and permissions, configuration such as environment variables, and the data it processes."]
  ]
 },
 {
  t: "Compliance and governance: AWS Artifact, AWS Audit Manager, AWS Config and where to find compliance information",
  body: [
   "Regulated organizations must prove that their systems meet standards such as PCI DSS for card payments, HIPAA for US health data, or ISO 27001. In the cloud, compliance is shared: AWS proves its infrastructure meets these standards, and you prove your own workloads do. Several AWS services help with each side.",
   "AWS Artifact is the self-service portal, in the AWS Management Console, for AWS's own compliance documents. It has two parts. Artifact Reports gives you on-demand access to AWS security and compliance reports produced by third-party auditors, such as SOC reports, PCI DSS attestations and ISO certifications, which you can hand to your own auditors as evidence that AWS's side is covered. Artifact Agreements lets you review and accept agreements with AWS, such as the Business Associate Addendum (BAA) required when handling protected health information under HIPAA.",
   "AWS Audit Manager helps you audit your own AWS usage. You choose a framework, for example a prebuilt one for a standard or a custom one, and Audit Manager continuously collects evidence from your accounts, such as configuration snapshots, CloudTrail activity and AWS Config results, and organizes it into assessment reports mapped to the framework's controls. That saves weeks of screenshots and spreadsheets before an audit.",
   "AWS Config records the configuration of your AWS resources and how it changes over time. You can see what a security group looked like last Tuesday and who changed it (combined with CloudTrail). Config rules evaluate resources against desired settings, for example 'S3 buckets must block public access' or 'EBS volumes must be encrypted', and flag noncompliant resources; conformance packs bundle many rules. Config can also trigger automatic remediation.",
   "For general information, the AWS Compliance Programs pages and the Services in Scope pages list which services are covered by which programs, and the AWS Customer Compliance Center and whitepapers explain how to meet requirements. On the exam: AWS's own audit reports mean Artifact; collecting evidence for your audit means Audit Manager; tracking resource configuration and compliance with rules means Config."
  ],
  terms: [
   ["AWS Artifact", "A console portal that provides on-demand access to AWS compliance reports and lets you accept agreements such as the BAA."],
   ["AWS Audit Manager", "A service that continuously collects evidence from your AWS usage and maps it to audit framework controls."],
   ["AWS Config", "A service that records resource configurations over time and evaluates them against rules for compliance."],
   ["Conformance pack", "A collection of AWS Config rules and remediation actions deployed together as a single unit."]
  ],
  example: "A payment company's auditor asks for proof that the underlying cloud infrastructure is PCI DSS compliant. The compliance officer downloads AWS's PCI DSS attestation from AWS Artifact. For the company's own environment, the team uses Audit Manager to gather evidence and AWS Config rules to show every storage volume is encrypted.",
  tip: "Artifact holds AWS's compliance reports; it does not assess your resources. If the question asks how to check whether your own resources meet a configuration standard, the answer is AWS Config.",
  check: [
   ["Where would you download AWS's SOC 2 report to give to an auditor?", "AWS Artifact (Artifact Reports)."],
   ["Which service would alert you when an EBS volume is created without encryption?", "AWS Config, using a Config rule that checks for encrypted volumes."]
  ]
 },
 {
  t: "Encryption at rest and in transit: AWS KMS, AWS CloudHSM and AWS Certificate Manager",
  body: [
   "Encryption protects data so that only people with the right key can read it. You need it in two places. Encryption at rest protects stored data, such as files in Amazon S3, disks in Amazon EBS or rows in a database. Encryption in transit protects data moving across a network, usually with Transport Layer Security (TLS), which is what HTTPS uses.",
   "AWS Key Management Service (AWS KMS) is the managed service for creating and controlling encryption keys. Most AWS services that store data integrate with KMS, so encrypting an EBS volume or an S3 bucket is often a single setting. KMS keys never leave the service unencrypted; they are protected by hardware security modules that AWS manages. You control who can use each key through key policies and IAM, and every use of a key is logged in AWS CloudTrail. There are AWS managed keys, which a service creates for you, and customer managed keys, which you create and control, including rotation and deletion.",
   "AWS CloudHSM provides dedicated hardware security modules (HSMs) in the AWS Cloud. An HSM is a tamper-resistant device that stores keys and performs cryptographic operations. With CloudHSM, the HSMs are single-tenant and you manage the keys and users yourself; AWS cannot access your keys. Organizations choose CloudHSM when a regulation or contract requires dedicated hardware under their exclusive control, or when an application needs standard interfaces such as PKCS#11. KMS is simpler and more integrated; CloudHSM gives more control but more work.",
   "AWS Certificate Manager (ACM) provisions, manages and deploys TLS certificates for encryption in transit. You request a public certificate for a domain, prove you control the domain, and attach the certificate to integrated services such as Elastic Load Balancing, Amazon CloudFront or Amazon API Gateway. ACM renews its certificates automatically, removing the classic outage caused by a forgotten expiry date.",
   "Many AWS services also encrypt by default now; for example, new objects in Amazon S3 are encrypted at rest automatically. Deciding what else to encrypt, and managing access to the keys, remains a customer responsibility."
  ],
  terms: [
   ["Encryption at rest", "Encrypting stored data, such as on disks, in databases or in object storage."],
   ["Encryption in transit", "Encrypting data while it moves across a network, typically with TLS."],
   ["AWS KMS", "AWS Key Management Service, a managed service for creating and controlling encryption keys, integrated with most AWS services."],
   ["AWS CloudHSM", "A service providing dedicated, single-tenant hardware security modules whose keys the customer controls exclusively."],
   ["AWS Certificate Manager (ACM)", "A service that provisions, deploys and automatically renews TLS certificates for AWS services."]
  ],
  example: "An online clinic enables encryption on its EBS volumes and RDS database using a customer managed KMS key, restricts use of that key to the application's IAM role, and attaches an ACM certificate to its Application Load Balancer so patients connect over HTTPS. ACM renews the certificate before it expires.",
  tip: "Keywords decide it: 'managed keys integrated with AWS services' is KMS; 'dedicated, single-tenant HSM' or 'customer has exclusive control of the hardware' is CloudHSM; 'SSL/TLS certificates' is ACM.",
  check: [
   ["A regulation requires keys to be stored in single-tenant hardware that only the customer controls. Which service fits?", "AWS CloudHSM."],
   ["Which service would you use to get and automatically renew an HTTPS certificate for a load balancer?", "AWS Certificate Manager (ACM)."]
  ]
 },
 {
  t: "Protecting the root user: MFA, no access keys, and the tasks that require root credentials",
  body: [
   "When you create an AWS account, you sign in with the email address and password you used to sign up. That identity is the root user, and it has complete, unrestricted access to every resource and setting in the account, including billing and the ability to close the account. Because it is so powerful, protecting it is one of the first things AWS asks you to do.",
   "Enable multi-factor authentication (MFA) on the root user straight away. MFA requires a second factor, such as an authenticator app, a hardware security key or a passkey, in addition to the password, so a stolen password alone is not enough. Use a strong, unique password and keep the root email account itself secure, since password resets go there.",
   "Do not create access keys for the root user. Access keys are long-term credentials for programmatic access through the CLI or SDKs; root access keys would give a script or anyone who found them full control of the account. If root access keys exist, delete them. For everyday work, including administrative work, use IAM Identity Center users or IAM roles with only the permissions needed, and lock the root credentials away.",
   "A small set of tasks can only be performed by the root user. Examples include changing account settings such as the account name, root email address and root password; closing the AWS account; restoring permissions when the only IAM administrator has accidentally been locked out; viewing certain tax invoices; registering as a seller in the Reserved Instance Marketplace; enabling MFA delete on an S3 bucket; and editing or deleting an S3 bucket policy that denies all principals. AWS publishes the full list, and it has changed over time, so learn the pattern: account-level ownership and recovery actions need root.",
   "In AWS Organizations, administrators can also centrally manage root access for member accounts, reducing how many root credentials exist at all. Whatever the setup, the principle is the same: the root user is for rare account-level tasks, not daily use."
  ],
  terms: [
   ["Root user", "The identity created with an AWS account, which has complete access to all resources and settings."],
   ["Multi-factor authentication (MFA)", "Requiring a second factor, such as an authenticator code or security key, in addition to a password."],
   ["Access keys", "Long-term credentials (access key ID and secret access key) used for programmatic access to AWS."],
   ["Least privilege", "Granting only the permissions needed to perform a task, which is why daily work should not use the root user."]
  ],
  example: "A new startup's founder signs up for AWS, immediately enables MFA on the root user with a hardware security key, deletes nothing because no root access keys were ever created, then sets up IAM Identity Center with an administrator permission set for daily work. The root credentials are used again only when the company needs to change the account's contact email.",
  tip: "Expect questions asking which task requires the root user. Changing the account's root email or name, closing the account and restoring locked-out IAM permissions are classic answers; launching instances, creating IAM users or viewing Cost Explorer do not need root.",
  check: [
   ["What are the two most important steps to secure the root user?", "Enable MFA and do not create (or delete any existing) root access keys, then use other identities for daily work."],
   ["Name one task that only the root user can perform.", "For example, closing the AWS account or changing the account's root email address or name."]
  ]
 },
 {
  t: "IAM users, groups, roles and policies, and the principle of least privilege",
  body: [
   "AWS Identity and Access Management (IAM) controls who can sign in to your AWS account (authentication) and what they can do (authorization). IAM is a global service, available at no additional charge, and it is the heart of the customer's security responsibility.",
   "An IAM user is an identity for one person or application, with long-term credentials: a password for the console and optionally access keys for the CLI and SDKs. An IAM group is a collection of users; you attach permissions to the group, and every member inherits them. Groups cannot contain other groups, and a group is not an identity that can sign in. An IAM role is an identity with permissions but no long-term credentials. Instead, a trusted entity assumes the role and receives temporary credentials. Roles are used by AWS services (for example an EC2 instance that needs to read from S3), by users from another account, and by people signing in through a central identity provider. AWS now recommends roles and temporary credentials over IAM users wherever possible.",
   "Permissions are defined in policies, which are JSON documents. Each statement has an Effect (Allow or Deny), one or more Actions (such as `s3:GetObject`), and Resources (identified by Amazon Resource Names, or ARNs). By default everything is denied; an explicit Allow grants access, and an explicit Deny always overrides any Allow. Identity-based policies attach to users, groups and roles; resource-based policies, such as S3 bucket policies, attach to resources. AWS managed policies are prebuilt; customer managed policies are ones you write.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": \"s3:GetObject\",\n    \"Resource\": \"arn:aws:s3:::example-reports/*\"\n  }]\n}\n```",
   "The principle of least privilege means granting only the permissions required to perform a task and nothing more. Start with minimal permissions and add as needed, prefer groups and roles over permissions attached to individual users, and review access regularly. IAM Access Analyzer can help find resources shared outside your account and generate policies based on actual activity. Using MFA for human users and rotating or avoiding long-term keys round out IAM best practice."
  ],
  terms: [
   ["IAM user", "An identity with long-term credentials representing one person or application in an AWS account."],
   ["IAM group", "A collection of IAM users that share the permissions attached to the group."],
   ["IAM role", "An identity with permissions that is assumed by trusted entities and provides temporary credentials."],
   ["IAM policy", "A JSON document that allows or denies actions on resources; an explicit deny always wins."],
   ["Principle of least privilege", "Granting only the minimum permissions needed to perform a task."]
  ],
  example: "An application running on an EC2 instance needs to upload files to one S3 bucket. Instead of storing an IAM user's access keys on the server, the team creates an IAM role with a policy allowing `s3:PutObject` on that bucket only and attaches the role to the instance. The application gets temporary credentials automatically, and there are no keys to leak.",
  tip: "When an AWS service (such as EC2 or Lambda) needs to access another AWS service, the answer is an IAM role, not access keys stored on the server. When several people need the same permissions, the answer is an IAM group.",
  check: [
   ["If one policy allows s3:DeleteObject and another attached policy explicitly denies it, what happens?", "The action is denied. An explicit Deny always overrides an Allow."],
   ["What is the main difference between an IAM user and an IAM role?", "A user has long-term credentials tied to one identity; a role has no long-term credentials and is assumed to obtain temporary credentials."]
  ]
 },
 {
  t: "Workforce single sign-on with AWS IAM Identity Center and customer sign-in with Amazon Cognito",
  body: [
   "There are two very different groups of people who need to sign in to things you build on AWS. Your workforce, meaning employees and contractors, needs to access AWS accounts and business applications. Your customers, the end users of your web and mobile apps, need to sign up and sign in to those apps. AWS has a separate service for each.",
   "AWS IAM Identity Center (the successor to AWS Single Sign-On) is the recommended way to give your workforce access to AWS. It connects to an identity source: its own built-in directory, Microsoft Active Directory, or an external identity provider such as Microsoft Entra ID or Okta. Users sign in once to an AWS access portal and see every AWS account and role they are allowed to use, plus integrated business applications. Access is defined with permission sets, which are collections of policies that Identity Center turns into IAM roles in each assigned account. Users get temporary credentials, so there are no long-lived IAM user passwords or keys to manage. It works especially well with AWS Organizations, where you assign access across many accounts from one place.",
   "Amazon Cognito provides sign-up, sign-in and access control for your own web and mobile applications, and it scales to very large numbers of users. A Cognito user pool is a user directory: it handles registration, sign-in, password reset, MFA and social or enterprise sign-in (for example through Google, Apple, Facebook or a SAML identity provider), and returns tokens your application trusts. A Cognito identity pool exchanges those tokens for temporary AWS credentials, so a mobile app can, for example, upload a photo directly to S3 with limited permissions.",
   "The key distinction on the exam is who is signing in. 'Employees need single sign-on to multiple AWS accounts' is IAM Identity Center. 'Customers of our mobile app need to create accounts and sign in with their social media identity' is Amazon Cognito. Neither replaces IAM itself; both ultimately rely on IAM roles and policies to grant AWS permissions.",
   "You may also see federation, which means trusting identities managed by an external identity provider rather than creating separate AWS users. Both services support federation, for different audiences."
  ],
  terms: [
   ["AWS IAM Identity Center", "The service for workforce single sign-on to multiple AWS accounts and business applications."],
   ["Permission set", "A template of policies in IAM Identity Center that defines what a user can do in an assigned AWS account."],
   ["Amazon Cognito", "A service that adds user sign-up, sign-in and access control to web and mobile applications."],
   ["User pool", "A Cognito user directory that handles registration, sign-in and tokens for an application's users."],
   ["Federation", "Trusting identities from an external identity provider instead of creating separate users in AWS."]
  ],
  example: "A company with 30 AWS accounts connects IAM Identity Center to its corporate directory, so engineers sign in once and pick the account and permission set they need. Separately, its customer loyalty app uses a Cognito user pool so shoppers can register with an email address or sign in with their Apple or Google account.",
  tip: "Workforce to AWS accounts equals IAM Identity Center; app end users equals Cognito. If the question mentions 'millions of users of a mobile app' or 'social identity providers', choose Cognito.",
  check: [
   ["Employees need one sign-in to access several AWS accounts in an organization. Which service should you use?", "AWS IAM Identity Center."],
   ["A mobile game needs players to sign up and sign in with their Google accounts. Which service fits?", "Amazon Cognito (a user pool with a social identity provider)."]
  ]
 },
 {
  t: "Storing credentials safely: AWS Secrets Manager and AWS Systems Manager Parameter Store",
  body: [
   "Applications need secrets: database passwords, API keys for third-party services, tokens. The worst place to keep them is in source code or in plain text configuration files on a server, where they get copied into repositories, backups and logs. AWS offers two services for storing such values centrally and retrieving them at runtime with IAM-controlled access.",
   "AWS Secrets Manager is purpose-built for secrets. You store a secret, such as a database username and password, and your application retrieves it with an API call when it needs it. Access is controlled with IAM and resource policies, secrets are encrypted with AWS KMS, and every retrieval is logged in CloudTrail. Its standout feature is automatic rotation: Secrets Manager can change a password on a schedule and update the database at the same time, with built-in support for Amazon RDS, Amazon Aurora, Amazon Redshift and Amazon DocumentDB, and Lambda functions for other secret types. Secrets can also be replicated to other Regions. Secrets Manager is charged per secret per month and per API call.",
   "AWS Systems Manager Parameter Store is a capability of AWS Systems Manager that stores configuration data and secrets as parameters in a hierarchy, such as `/prod/app/db-host`. Parameters can be plain String, StringList or SecureString; SecureString values are encrypted with KMS. Standard parameters have no additional charge, which makes Parameter Store attractive for configuration values and simple secrets. It does not provide built-in automatic rotation the way Secrets Manager does.",
   "Choosing between them is a frequent exam question. If the requirement is automatic rotation of database credentials, pick Secrets Manager. If the requirement is storing configuration values or simple secrets centrally at low or no cost, Parameter Store is a good fit. Both remove secrets from code, both use KMS encryption, and both rely on IAM to control who can read each value.",
   "Whichever you use, grant the application's IAM role permission to read only the specific secrets or parameters it needs, which is least privilege applied to secrets."
  ],
  terms: [
   ["AWS Secrets Manager", "A service for storing, retrieving and automatically rotating secrets such as database credentials and API keys."],
   ["Parameter Store", "A capability of AWS Systems Manager for storing configuration data and secrets as hierarchical parameters."],
   ["SecureString", "A Parameter Store parameter type whose value is encrypted with AWS KMS."],
   ["Secret rotation", "Regularly changing a credential and updating everything that uses it, which Secrets Manager can automate."]
  ],
  example: "A development team finds a production database password committed to its Git repository. It changes the password, stores it in Secrets Manager with 30-day automatic rotation, and updates the application to fetch the credential at startup using its IAM role. Non-secret settings such as feature flags go into Parameter Store as plain String parameters.",
  tip: "The word 'rotate' or 'rotation' in a question is a strong signal for AWS Secrets Manager. 'Store configuration data at no additional cost' points to Parameter Store.",
  check: [
   ["Which service can automatically rotate Amazon RDS database credentials?", "AWS Secrets Manager."],
   ["How are SecureString parameters in Parameter Store protected?", "They are encrypted with AWS KMS, and access is controlled through IAM."]
  ]
 },
 {
  t: "Network protection: security groups vs network ACLs, AWS WAF, AWS Shield Standard and Advanced, AWS Firewall Manager",
  body: [
   "AWS gives you several layers of network protection, each working at a different level. The exam tests both the differences between them and which one to use for a given threat.",
   "Security groups are virtual firewalls for resources such as EC2 instances (more precisely, their network interfaces). They support allow rules only; anything not allowed is denied. They are stateful: if an inbound request is allowed, the response is automatically allowed back out, and vice versa. Network access control lists (network ACLs) protect whole subnets in an Amazon VPC. They support both allow and deny rules, are evaluated in number order with the first match winning, and are stateless: return traffic must be explicitly allowed by a separate rule. A typical design uses security groups for most control and network ACLs as a coarse subnet-level backstop, for example to block a specific address range.",
   "AWS WAF is a web application firewall. It inspects HTTP and HTTPS requests at layer 7 for resources such as Amazon CloudFront, Application Load Balancers and Amazon API Gateway. You write rules (or use managed rule groups) to block common attacks like SQL injection and cross-site scripting, filter by IP address or country, and rate-limit clients that send too many requests.",
   "AWS Shield protects against distributed denial of service (DDoS) attacks. Shield Standard is automatically enabled for all AWS customers at no additional cost and defends against the most common network and transport layer attacks. Shield Advanced is a paid subscription that adds enhanced detection and mitigation for resources such as EC2, Elastic Load Balancing, CloudFront, Route 53 and Global Accelerator, access to the AWS Shield Response Team during attacks, detailed attack reporting and cost protection against scaling charges caused by a DDoS attack.",
   "AWS Firewall Manager centrally configures and manages firewall rules across all accounts in AWS Organizations. You define policies once, such as a WAF rule set, Shield Advanced protection or required security groups, and Firewall Manager applies them to existing and new accounts and resources automatically."
  ],
  terms: [
   ["Security group", "A stateful, allow-only virtual firewall applied to instances and other resources' network interfaces."],
   ["Network ACL", "A stateless subnet-level firewall with numbered allow and deny rules evaluated in order."],
   ["AWS WAF", "A web application firewall that filters HTTP/HTTPS requests to protect against attacks like SQL injection."],
   ["AWS Shield", "DDoS protection: Standard is free and automatic; Advanced is paid and adds response team access and cost protection."],
   ["AWS Firewall Manager", "A service to centrally manage WAF, Shield Advanced and security group policies across an organization."]
  ],
  example: "An online retailer allows only HTTPS from its load balancer to its web instances using security groups, adds a network ACL rule denying a range of addresses seen scraping its site, attaches AWS WAF with a SQL injection rule set to its Application Load Balancer, and subscribes to Shield Advanced before its busiest shopping season.",
  tip: "Stateful and allow-only means security group; stateless with allow and deny means network ACL. If you need to explicitly block one IP address at the network level, a security group cannot do it because it has no deny rules.",
  check: [
   ["You need to block a single malicious IP address from reaching every instance in a subnet. Which control can do it?", "A network ACL, because it supports deny rules; security groups only allow."],
   ["Which DDoS protection is included automatically at no extra cost?", "AWS Shield Standard."]
  ]
 },
 {
  t: "Threat detection and posture: Amazon GuardDuty, Amazon Inspector, Amazon Macie, Amazon Detective and AWS Security Hub",
  body: [
   "AWS has a family of security services whose names are easy to mix up. Each has a distinct job, and exam questions usually describe the job and ask for the name. Learn each by the question it answers.",
   "Amazon GuardDuty answers 'is something malicious happening in my account right now?' It is a threat detection service that continuously analyzes data sources such as AWS CloudTrail events, VPC Flow Logs and DNS logs using threat intelligence and machine learning. It raises findings for things like an EC2 instance communicating with a known malicious address, unusual API calls from an unfamiliar location or signs of cryptocurrency mining. You enable it with a click; there are no agents to install for its core sources.",
   "Amazon Inspector answers 'what vulnerabilities do my workloads have?' It automatically scans EC2 instances, container images in Amazon ECR and Lambda functions for known software vulnerabilities (CVEs) and unintended network exposure, and prioritizes findings with a risk score. Amazon Macie answers 'where is my sensitive data?' It uses machine learning and pattern matching to discover sensitive data such as personally identifiable information (PII) and financial data in Amazon S3, and also reports on bucket security such as public access or missing encryption.",
   "Amazon Detective answers 'what happened and why?' When you have a finding, for example from GuardDuty, Detective automatically collects log data and builds visualizations of the resources, users and IP addresses involved over time, helping you investigate root cause. AWS Security Hub answers 'what is my overall security posture?' It aggregates findings from GuardDuty, Inspector, Macie and other AWS and partner tools into one place, and runs automated checks against security standards and best practices (cloud security posture management), giving you a consolidated view across accounts.",
   "A handy memory aid: GuardDuty guards (active threats), Inspector inspects (vulnerabilities), Macie finds sensitive data in S3, Detective investigates, and Security Hub is the hub that brings it all together."
  ],
  terms: [
   ["Amazon GuardDuty", "A threat detection service that analyzes CloudTrail, VPC Flow Logs and DNS logs for malicious or unauthorized activity."],
   ["Amazon Inspector", "An automated vulnerability management service for EC2, container images and Lambda functions."],
   ["Amazon Macie", "A service that discovers and protects sensitive data, such as PII, stored in Amazon S3."],
   ["Amazon Detective", "A service that analyzes and visualizes security data to help investigate the root cause of findings."],
   ["AWS Security Hub", "A service that aggregates security findings and checks accounts against security best-practice standards."]
  ],
  example: "Security Hub shows a high-severity GuardDuty finding: an EC2 instance is contacting an address associated with cryptocurrency mining. The analyst opens Amazon Detective to see which role launched the instance and from where, checks Amazon Inspector for a vulnerable package on the instance, and then isolates and replaces it.",
  tip: "Vulnerabilities and CVEs mean Inspector; sensitive data or PII in S3 means Macie; malicious activity from logs means GuardDuty; investigating root cause means Detective; a single dashboard of findings and compliance checks means Security Hub.",
  check: [
   ["Which service would identify credit card numbers stored in S3 buckets?", "Amazon Macie."],
   ["Which service scans EC2 instances and container images for software vulnerabilities?", "Amazon Inspector."]
  ]
 },
 {
  t: "Logging and monitoring for security: AWS CloudTrail, Amazon CloudWatch and AWS Trusted Advisor security checks",
  body: [
   "You cannot secure what you cannot see. Three services give you visibility into what is happening in your AWS account, and the exam expects you to know which one records what.",
   "AWS CloudTrail records API activity in your account: who did what, when, from where and to which resource. Every action in AWS, whether through the console, CLI, SDK or another service, is an API call, so CloudTrail answers questions like 'who deleted this S3 bucket?' or 'who changed this security group?'. CloudTrail Event history shows the last 90 days of management events in a Region at no charge. For longer retention, analysis and data events (such as individual S3 object reads), you create a trail that delivers logs to an S3 bucket, optionally with log file integrity validation so you can prove logs were not altered. An organization trail can log every account in AWS Organizations.",
   "Amazon CloudWatch monitors the performance and health of your resources and applications. It collects metrics (such as EC2 CPU utilization), stores and searches logs in CloudWatch Logs, and lets you set alarms that notify you through Amazon SNS or take automatic action when a metric crosses a threshold. For security, you can send CloudTrail logs to CloudWatch Logs and create metric filters and alarms for events such as root user sign-ins or repeated failed console logins. In short: CloudTrail tells you who did something; CloudWatch tells you how things are performing and alerts you.",
   "AWS Trusted Advisor inspects your account and gives recommendations across categories including security, cost optimization, performance, fault tolerance, service limits (quotas) and operational excellence. Security checks include S3 buckets with open access permissions, security groups allowing unrestricted access to specific ports, whether MFA is enabled on the root user and exposed access keys. A core set of checks is available to all customers, while the full set requires a Business or higher Support plan.",
   "A mature setup combines them: CloudTrail for audit, CloudWatch for alerting, Trusted Advisor for best-practice checks, and GuardDuty to analyze CloudTrail and network logs for threats."
  ],
  terms: [
   ["AWS CloudTrail", "A service that records API calls and account activity for auditing, governance and investigation."],
   ["Trail", "A CloudTrail configuration that delivers event logs to an S3 bucket for long-term retention."],
   ["Amazon CloudWatch", "A monitoring service for metrics, logs and alarms on AWS resources and applications."],
   ["CloudWatch alarm", "A rule that watches a metric and triggers notifications or actions when a threshold is crossed."],
   ["AWS Trusted Advisor", "A service that checks an account against best practices for security, cost, performance, resilience and quotas."]
  ],
  example: "A production security group suddenly allows SSH from anywhere. A Trusted Advisor check flags unrestricted access, CloudTrail shows which IAM role made the change and from which IP address, and the team adds a CloudWatch alarm on a metric filter so it is alerted the next time a security group is modified.",
  tip: "'Who made this change?' or 'audit API calls' is CloudTrail. 'CPU utilization', 'set an alarm' or 'collect application logs' is CloudWatch. Mixing them up is one of the most common Cloud Practitioner mistakes.",
  check: [
   ["Which service would show which user terminated an EC2 instance yesterday?", "AWS CloudTrail."],
   ["How would you be notified when an instance's CPU stays above 80 percent?", "Create an Amazon CloudWatch alarm on the CPUUtilization metric that notifies an SNS topic."]
  ]
 },
 {
  t: "Where to get security help: AWS security documentation, AWS Knowledge Center, AWS Marketplace security products and AWS Partners",
  body: [
   "No one secures a cloud environment alone. The exam expects you to know where to turn for security information, tools and expertise, and which resource suits which need.",
   "AWS security documentation is the starting point. Every AWS service's documentation includes a Security chapter explaining how the shared responsibility model applies to it, which encryption and access controls it offers and how to log its activity. The AWS Security Center and AWS Security Blog publish guidance, and AWS Security Bulletins announce security issues affecting AWS services along with any customer action needed. Whitepapers and the Security Pillar of the Well-Architected Framework give deeper best practices.",
   "The AWS Knowledge Center is a collection of articles and videos answering the most frequent questions AWS Support receives, such as how to troubleshoot access denied errors or how to secure a bucket. AWS re:Post is AWS's community question-and-answer site where you can ask questions and get answers from the community and AWS experts; Knowledge Center articles are also published there.",
   "AWS Marketplace is a curated digital catalog of third-party software, data and services that run on AWS. For security you can find firewalls, endpoint protection, vulnerability scanners, security information and event management (SIEM) tools and more, often with pay-as-you-go pricing billed through your AWS account. This is where you go when an organization wants to keep using a familiar security vendor's product in the cloud.",
   "The AWS Partner Network (APN) includes consulting and technology partners. Partners with security specializations can design, implement and manage security controls, perform assessments or run managed detection and response. AWS Professional Services can also help with large engagements. When you suspect an AWS resource is being used for abuse, such as sending spam or attacking others, the AWS Trust & Safety team is the contact.",
   "On the exam: official guidance means documentation; answers to common problems means Knowledge Center or re:Post; buying third-party security software means Marketplace; hiring experts means AWS Partners or Professional Services."
  ],
  terms: [
   ["AWS Knowledge Center", "A collection of articles and videos answering common questions and issues raised with AWS Support."],
   ["AWS re:Post", "A community question-and-answer service for AWS topics, with answers from the community and AWS experts."],
   ["AWS Marketplace", "A curated catalog of third-party software, data and services that can be bought and deployed on AWS."],
   ["AWS Partner Network (APN)", "AWS's global community of consulting and technology partners that help customers build on AWS."],
   ["AWS Security Bulletins", "Notices from AWS about security issues affecting its services and any recommended customer action."]
  ],
  example: "A company's security team wants to keep the next-generation firewall brand it uses on premises. It subscribes to that vendor's virtual appliance through AWS Marketplace, billed on its AWS invoice, and engages an AWS Partner with a security specialization to design the deployment. Engineers use Knowledge Center articles to troubleshoot routing issues.",
  tip: "AWS Marketplace sells third-party products; it is not where AWS's own compliance reports live (that is AWS Artifact) or where you report abuse (that is the AWS Trust & Safety team).",
  check: [
   ["Where would you buy a third-party intrusion detection product that runs on AWS and is billed through your AWS account?", "AWS Marketplace."],
   ["Where can you find articles answering the most common questions AWS Support receives?", "The AWS Knowledge Center (also available on AWS re:Post)."]
  ]
 },
 {
  t: "Ways to use AWS: AWS Management Console, AWS CLI, SDKs, APIs and infrastructure as code with AWS CloudFormation",
  body: [
   "Everything you do in AWS, whether creating a bucket or launching a server, is ultimately an API call to an AWS service. The different ways of using AWS are just different front ends for those APIs, and each suits a different kind of work.",
   "The AWS Management Console is the web-based interface. You sign in through a browser and click through wizards and dashboards. It is ideal for learning, exploring services, one-off tasks and visual monitoring. There is also the AWS Console Mobile Application for checking resources and alarms on the go. The console is easy but not repeatable: if you need to build the same environment ten times, clicking through it ten times is slow and error-prone.",
   "The AWS Command Line Interface (AWS CLI) lets you control services by typing commands in a terminal, which makes tasks scriptable and repeatable. For example, `aws s3 ls` lists your buckets and `aws ec2 describe-instances` lists your instances. AWS CloudShell gives you a browser-based shell, already authenticated and with the CLI installed, directly from the console. Software development kits (SDKs) let application code call AWS services in languages such as Python (Boto3), JavaScript, Java, Go and .NET, handling signing and retries for you. You can also call the service APIs directly over HTTPS, but SDKs and the CLI are far more convenient.",
   "```bash\naws s3 mb s3://example-lesson-bucket-12345\naws s3 cp report.csv s3://example-lesson-bucket-12345/\naws s3 ls s3://example-lesson-bucket-12345/\n```",
   "Infrastructure as code (IaC) with AWS CloudFormation takes repeatability further. You describe the resources you want, such as a VPC, subnets, instances and a database, in a JSON or YAML template. CloudFormation creates them as a single unit called a stack, in the right order, and can update or delete the whole stack consistently. Templates can be version-controlled and reviewed like application code, and the same template can create identical development, test and production environments or deploy to multiple Regions. The AWS Cloud Development Kit (CDK) lets you define the same infrastructure in a programming language and generates CloudFormation for you.",
   "For the exam: exploring and one-off tasks suggest the console; scripting suggests the CLI; application code calling AWS suggests SDKs; repeatable, consistent environments suggest CloudFormation."
  ],
  terms: [
   ["AWS Management Console", "The browser-based graphical interface for managing AWS services."],
   ["AWS CLI", "A command line tool for managing AWS services from a terminal and automating tasks with scripts."],
   ["SDK", "A software development kit that lets application code call AWS services in a specific programming language."],
   ["AWS CloudFormation", "An infrastructure as code service that provisions AWS resources from JSON or YAML templates as stacks."],
   ["Stack", "A collection of AWS resources created, updated and deleted together from one CloudFormation template."]
  ],
  example: "A training company needs identical lab environments for 20 classes a year. Instead of building each by hand in the console, it writes one CloudFormation template defining a VPC, a web server and a database. Each class gets a stack created from the template in minutes, and the stack is deleted afterwards, removing every resource so nothing keeps generating charges.",
  tip: "If a question mentions deploying the same infrastructure repeatedly and consistently, across accounts or Regions, or treating infrastructure as code, the answer is AWS CloudFormation, not the console or CLI.",
  check: [
   ["Which tool lets a Python application upload files to Amazon S3?", "The AWS SDK for Python (Boto3)."],
   ["What does CloudFormation call the group of resources it creates from a template?", "A stack."]
  ]
 },
 {
  t: "Deployment models (cloud, hybrid and on-premises) and one-time vs repeatable provisioning",
  body: [
   "A deployment model describes where your applications run. AWS usually talks about three, and the exam asks you to identify which one a scenario describes and why an organization might choose it.",
   "In a cloud deployment, sometimes called cloud-native or all-in, every part of the application runs in the cloud. This can be an application built in the cloud from the start, or one that was fully migrated. It can use low-level infrastructure such as EC2 instances or higher-level managed and serverless services such as Lambda and DynamoDB. A company with no data center of its own that runs everything on AWS is using the cloud model.",
   "A hybrid deployment connects cloud-based resources to infrastructure that stays on premises. Organizations choose hybrid when some systems cannot move yet, because of regulations, latency needs, dependence on local hardware or a gradual migration plan, but they still want cloud benefits for other workloads. For example, a company might keep its legacy ERP system in its own data center while running new customer-facing web applications on AWS, connected by AWS Site-to-Site VPN or AWS Direct Connect. Services like AWS Outposts and AWS Storage Gateway are designed for hybrid setups.",
   "An on-premises deployment, sometimes called a private cloud, runs resources in the organization's own data center, using virtualization and resource management tools to get some cloud-like agility. It does not provide the scale and pay-as-you-go economics of the public cloud, but some organizations use it for strict control requirements.",
   "Provisioning is how you create resources, and it can be one-time or repeatable. One-time provisioning, such as clicking through the console to launch a test instance, is fine for experiments and learning. Repeatable provisioning uses code or templates, such as CloudFormation or the CLI in scripts, so the same configuration can be created again consistently in another environment, account or Region. Production environments should be provisioned repeatably, because manual steps are easy to forget, hard to audit and nearly impossible to reproduce exactly after a disaster."
  ],
  terms: [
   ["Cloud deployment", "A model in which all parts of an application run in the cloud."],
   ["Hybrid deployment", "A model that connects cloud resources with infrastructure that remains on premises."],
   ["On-premises deployment", "A model where resources run in the organization's own data center, sometimes called a private cloud."],
   ["Repeatable provisioning", "Creating resources from templates or scripts so the same configuration can be reproduced consistently."]
  ],
  example: "A hospital keeps its imaging archive on premises because the scanners and local regulations require it, but runs its patient appointment website on AWS and connects the two over a Site-to-Site VPN. That is a hybrid deployment. The website's infrastructure is defined in a CloudFormation template so it can be rebuilt in another Region if needed.",
  tip: "Any scenario where some resources stay in the company's data center and others run on AWS, connected together, is hybrid. Don't be misled by options like 'multi-Region'; that is still an all-cloud deployment.",
  check: [
   ["A company runs new applications on AWS but keeps its mainframe on premises, with the two connected. Which deployment model is this?", "Hybrid."],
   ["Why is repeatable provisioning preferred for production?", "It creates consistent, auditable environments that can be reproduced exactly, avoiding manual mistakes and speeding recovery."]
  ]
 },
 {
  t: "AWS global infrastructure: Regions, Availability Zones, edge locations, Local Zones, Wavelength Zones and AWS Outposts",
  body: [
   "AWS runs its services on a worldwide network of facilities. Knowing the building blocks, and what each is for, helps you design for availability, low latency and compliance.",
   "A Region is a separate geographic area, such as a metropolitan area in a particular country, that contains multiple, isolated Availability Zones. Regions are independent of each other, and your data does not leave a Region unless you move or replicate it. Most services are Regional: you choose the Region when you create a resource. A few, such as IAM, are global.",
   "An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking and connectivity within a Region. AZs in a Region are physically separated by a meaningful distance, so a flood or power failure is unlikely to affect more than one, but they are connected by high-bandwidth, low-latency links. Deploying across multiple AZs is the standard way to achieve high availability. AWS builds most Regions with three or more AZs.",
   "Edge locations are sites in many more cities than there are Regions. They are used by Amazon CloudFront to cache content close to viewers, and by Amazon Route 53 and other edge services, to reduce latency for end users. You do not launch EC2 instances in edge locations.",
   "Some workloads need even lower latency than a Region can offer. AWS Local Zones place compute, storage and database services closer to large population and industry centers, as an extension of a parent Region, for applications like real-time gaming, media production or live video. AWS Wavelength Zones embed AWS compute and storage inside telecommunications providers' 5G networks, so mobile devices can reach applications with very low latency without traffic leaving the carrier network. AWS Outposts brings AWS-designed hardware into your own data center, running AWS services on premises and managed with the same APIs and console, for workloads that need local data processing or very low latency to on-premises systems.",
   "Remember the progression: Region for geography and compliance, AZs for high availability, edge locations for content delivery, Local Zones for single-digit-millisecond latency to a city, Wavelength for 5G mobile, and Outposts for AWS in your own building."
  ],
  terms: [
   ["Region", "A geographic area containing multiple isolated Availability Zones, independent of other Regions."],
   ["Availability Zone", "One or more discrete data centers with redundant power and networking inside a Region."],
   ["Edge location", "A site used by CloudFront and other edge services to cache content and serve users with low latency."],
   ["AWS Local Zones", "Extensions of a Region that place select AWS services close to large population and industry centers."],
   ["AWS Wavelength", "AWS infrastructure embedded in telecom 5G networks for ultra-low latency mobile applications."],
   ["AWS Outposts", "AWS-managed racks or servers installed on premises to run AWS services locally."]
  ],
  example: "A game studio hosts its main backend in a Region across three AZs for availability, serves game downloads through CloudFront edge locations, runs latency-sensitive match servers in a Local Zone near a large city, and pilots a mobile augmented reality feature in a Wavelength Zone with a 5G carrier.",
  tip: "High availability questions want multiple Availability Zones; disaster recovery against a whole-Region event wants multiple Regions. 'AWS services running in the customer's own data center' is always Outposts.",
  check: [
   ["What is the relationship between Regions and Availability Zones?", "Each Region contains multiple, isolated Availability Zones connected by low-latency links."],
   ["A company must run AWS services on premises to process data locally. Which offering fits?", "AWS Outposts."]
  ]
 },
 {
  t: "Choosing a Region: compliance and data residency, latency to users, service availability and price",
  body: [
   "Every time you create most AWS resources, you choose a Region. AWS teaches four factors to weigh, and the exam often presents a scenario and asks which factor should drive the decision.",
   "Compliance and data residency usually come first. Laws, regulations or contracts may require that certain data stays within a specific country or jurisdiction. Because data you store in a Region stays there unless you explicitly move or replicate it, choosing a Region inside the required country satisfies many residency requirements. If a regulation says customer records must remain in a particular country, only Regions in that country are candidates, whatever the price or latency elsewhere.",
   "Proximity to your users, meaning latency, is next. Data takes time to travel, so running an application in a Region close to its customers makes it feel faster. A company whose customers are mostly in one continent should normally choose a Region on that continent. For global audiences, you might use several Regions, or a single Region combined with CloudFront edge locations to cache content near users.",
   "Service availability matters because not every AWS service or feature is available in every Region. New services often launch in a few Regions first and expand later. If your design depends on a specific service, instance type or feature, confirm it is available in the Region you plan to use; the AWS Regional Services list shows this.",
   "Pricing varies by Region. The same instance type or storage can cost different amounts in different Regions, because of local costs such as power, real estate and taxes. When compliance and latency allow a choice among several Regions, price can be the tie-breaker, and the AWS Pricing Calculator lets you compare.",
   "A good order of thinking is: first rule out Regions that fail compliance, then consider latency to users, confirm the services you need are there, and finally compare prices among the remaining candidates."
  ],
  terms: [
   ["Data residency", "A requirement that data be stored and processed within a particular country or jurisdiction."],
   ["Latency", "The delay for data to travel between users and an application, which grows with distance."],
   ["Regional service availability", "Whether a given AWS service or feature is offered in a particular Region."],
   ["Regional pricing", "The fact that AWS prices for the same resource can differ from one Region to another."]
  ],
  example: "A European insurer must keep policyholder data inside the EU. It shortlists only EU Regions, picks the one closest to most of its customers, checks that the managed database engine and instance family it needs are available there, and confirms with the Pricing Calculator that costs fit its budget.",
  tip: "If a scenario mentions a legal or regulatory requirement about where data lives, that factor wins over price and latency. Choose the Region that satisfies the law first.",
  check: [
   ["What are the four main factors when choosing an AWS Region?", "Compliance and data residency, proximity to users (latency), service and feature availability, and pricing."],
   ["A service you need is missing from your preferred Region. What should you do?", "Choose a Region where the service is available (if compliance allows) or redesign around services available in your preferred Region."]
  ]
 },
 {
  t: "Amazon EC2 instance families, AMIs, Elastic Load Balancing and Amazon EC2 Auto Scaling",
  body: [
   "Amazon Elastic Compute Cloud (Amazon EC2) provides resizable virtual servers, called instances. You choose the operating system, size and configuration, and you have full control, including administrator or root access, which also means you are responsible for patching and securing the guest OS.",
   "Instance types are grouped into families optimized for different workloads. General purpose instances balance compute, memory and networking, suiting web servers and code repositories. Compute optimized instances have high-performance processors for compute-bound work such as batch processing, gaming servers and scientific modeling. Memory optimized instances are for workloads that process large datasets in memory, such as in-memory databases and real-time big data analytics. Accelerated computing instances use hardware accelerators like GPUs for machine learning, graphics and other parallel workloads. Storage optimized instances offer high, low-latency local storage throughput for workloads such as data warehousing and large transactional databases. The letter at the start of the type name, and a size such as `large` or `xlarge`, tell you the family and size.",
   "An Amazon Machine Image (AMI) is a template for launching instances. It includes the operating system and any preinstalled software and configuration. You can use AMIs provided by AWS, buy them in AWS Marketplace, or create your own from a configured instance so every new server starts identical, a useful building block for automation.",
   "Elastic Load Balancing (ELB) automatically distributes incoming traffic across multiple targets, such as EC2 instances in multiple Availability Zones, and routes only to healthy targets using health checks. The Application Load Balancer works at layer 7 (HTTP and HTTPS) and can route based on the URL path or host name. The Network Load Balancer works at layer 4 (TCP and UDP) for extreme performance and static IP addresses. The Gateway Load Balancer is used to deploy third-party virtual appliances such as firewalls.",
   "Amazon EC2 Auto Scaling automatically adds or removes instances in an Auto Scaling group to match demand. You set a minimum, maximum and desired capacity, and scaling policies such as 'keep average CPU at 50 percent'. It also replaces unhealthy instances. Together, ELB and Auto Scaling give you a highly available, elastic web tier."
  ],
  terms: [
   ["Amazon EC2", "A service providing resizable virtual servers (instances) in the cloud."],
   ["Instance family", "A group of EC2 instance types optimized for a workload profile, such as compute or memory optimized."],
   ["Amazon Machine Image (AMI)", "A template containing the OS and software used to launch EC2 instances."],
   ["Elastic Load Balancing", "A service that distributes incoming traffic across healthy targets in multiple AZs."],
   ["Auto Scaling group", "A collection of EC2 instances that Auto Scaling grows, shrinks and heals according to policies."]
  ],
  example: "A news site builds a custom AMI containing its web application, launches instances from it in an Auto Scaling group spread across three AZs with a minimum of two instances, and puts an Application Load Balancer in front. When a big story breaks, Auto Scaling adds instances; when a server fails a health check, it is replaced automatically.",
  tip: "Match the workload to the family: in-memory databases point to memory optimized, batch or high-performance computing to compute optimized, machine learning training or graphics to accelerated computing. For HTTP path-based routing choose an Application Load Balancer.",
  check: [
   ["Which EC2 instance family is best for a large in-memory cache?", "Memory optimized."],
   ["What two services together make a web tier both highly available and elastic?", "Elastic Load Balancing to spread traffic across AZs and EC2 Auto Scaling to add, remove and replace instances."]
  ]
 },
 {
  t: "Containers and serverless compute: Amazon ECS, Amazon EKS, AWS Fargate, AWS Lambda and AWS Elastic Beanstalk",
  body: [
   "EC2 is not the only way to run code on AWS. Containers and serverless services remove more of the server management, and the exam checks that you can choose among them.",
   "A container packages an application with its dependencies so it runs the same way everywhere. To run many containers you need an orchestrator. Amazon Elastic Container Service (Amazon ECS) is AWS's own fully managed container orchestration service, simple to use and deeply integrated with AWS. Amazon Elastic Kubernetes Service (Amazon EKS) runs Kubernetes, the popular open-source orchestrator, with AWS managing the Kubernetes control plane; choose it when you already use Kubernetes or want portability across environments. Container images are commonly stored in Amazon Elastic Container Registry (Amazon ECR).",
   "Both ECS and EKS need compute capacity to run containers. You can supply EC2 instances that you manage, or use AWS Fargate, a serverless compute engine for containers. With Fargate you do not provision or patch servers; you define the CPU and memory each task or pod needs and pay for those resources while it runs. The distinction: ECS and EKS are orchestrators; Fargate is a place for their containers to run without managing servers.",
   "AWS Lambda runs code without provisioning servers at all, in response to events such as an object uploaded to S3, a message in an SQS queue, an HTTP request through Amazon API Gateway or a schedule. Lambda scales automatically with the number of events, and you pay per request and for the compute time your code uses, with nothing charged when it is idle. It is ideal for short, event-driven tasks; a single invocation can run for at most 15 minutes, so long-running processes belong elsewhere.",
   "AWS Elastic Beanstalk is a platform as a service (PaaS) for web applications. You upload your code, for example a Java, .NET, Python, Node.js or Docker application, and Beanstalk automatically handles capacity provisioning, load balancing, Auto Scaling and health monitoring, using EC2 and other services underneath. You keep full access to those resources but do not need to assemble them yourself. It suits developers who want to deploy quickly without learning every infrastructure service."
  ],
  terms: [
   ["Amazon ECS", "AWS's fully managed container orchestration service."],
   ["Amazon EKS", "A managed service for running Kubernetes on AWS."],
   ["AWS Fargate", "A serverless compute engine that runs containers for ECS and EKS without managing servers."],
   ["AWS Lambda", "An event-driven serverless compute service that runs code and bills per request and compute time."],
   ["AWS Elastic Beanstalk", "A PaaS that deploys and manages web applications, handling provisioning, load balancing and scaling."]
  ],
  example: "A company has three workloads. Its microservices already run on Kubernetes, so it moves them to Amazon EKS with Fargate to avoid managing nodes. Image thumbnails are generated by a Lambda function each time a file lands in S3. A small internal web app written in Python is deployed with Elastic Beanstalk so the developer does not have to set up load balancers and scaling by hand.",
  tip: "'Kubernetes' in the question means EKS. 'Run containers without managing servers' means Fargate. 'Run code in response to events, no servers, pay only when it runs' means Lambda. 'Upload code and AWS handles deployment, scaling and load balancing' means Elastic Beanstalk.",
  check: [
   ["What is the difference between Amazon ECS and AWS Fargate?", "ECS orchestrates containers; Fargate is a serverless compute option that runs those containers without you managing EC2 instances."],
   ["Why is Lambda not a good fit for a job that runs continuously for two hours?", "A single Lambda invocation has a maximum duration of 15 minutes; long-running work belongs on EC2, containers or a batch service."]
  ]
 },
 {
  t: "Databases: Amazon RDS and Aurora, Amazon DynamoDB, Amazon ElastiCache, Amazon Redshift and other purpose-built databases",
  body: [
   "AWS encourages you to choose a purpose-built database for each job rather than forcing everything into one engine. You can also run any database yourself on EC2, but then you manage installation, patching, backups and replication; managed database services take on that work.",
   "Amazon Relational Database Service (Amazon RDS) runs relational databases, which store data in tables with SQL and support complex queries and transactions. RDS supports engines such as MySQL, PostgreSQL, MariaDB, Oracle and Microsoft SQL Server, and handles provisioning, patching, automated backups and, with Multi-AZ deployments, automatic failover to a standby in another AZ. Read replicas can offload read traffic. Amazon Aurora is AWS's own relational engine, compatible with MySQL and PostgreSQL, designed for higher performance and availability, with storage automatically replicated across multiple AZs.",
   "Amazon DynamoDB is a fully managed, serverless NoSQL key-value and document database. It delivers consistent single-digit-millisecond performance at virtually any scale, with no servers to manage, and suits applications with simple, high-volume access patterns, such as shopping carts, gaming leaderboards and session data. You choose on-demand or provisioned capacity.",
   "Amazon ElastiCache provides managed in-memory caches compatible with Redis OSS, Valkey and Memcached. Putting a cache in front of a database stores frequently read data in memory, cutting response times to microseconds and reducing load on the database. Amazon Redshift is a data warehouse for analytics: it runs complex SQL queries over very large amounts of structured data for reporting and business intelligence, using columnar storage. It is for analysis (OLAP), not for an application's day-to-day transactions (OLTP).",
   "Other purpose-built databases include Amazon Neptune (graph database for highly connected data such as social networks and fraud detection), Amazon DocumentDB (document database with MongoDB compatibility), Amazon Keyspaces (Apache Cassandra-compatible), Amazon Timestream (time series data such as IoT sensor readings) and Amazon MemoryDB (a durable in-memory database). To move existing databases into these services, recall AWS DMS from the migration lesson."
  ],
  terms: [
   ["Amazon RDS", "A managed relational database service supporting engines such as MySQL, PostgreSQL, Oracle and SQL Server."],
   ["Amazon Aurora", "An AWS-built, MySQL- and PostgreSQL-compatible relational database with storage replicated across AZs."],
   ["Amazon DynamoDB", "A serverless NoSQL key-value and document database with consistent low latency at any scale."],
   ["Amazon ElastiCache", "A managed in-memory caching service that reduces database load and response times."],
   ["Amazon Redshift", "A managed data warehouse for large-scale SQL analytics."]
  ],
  example: "An online marketplace stores orders in Aurora PostgreSQL for transactional integrity, keeps user sessions and carts in DynamoDB, caches popular product pages in ElastiCache, loads nightly sales data into Redshift for executive dashboards and uses Neptune to detect rings of related fraudulent accounts.",
  tip: "Map keywords to services: 'relational' or 'SQL' with transactions means RDS or Aurora; 'NoSQL', 'key-value' or 'serverless database' means DynamoDB; 'caching' or 'in-memory' means ElastiCache; 'data warehouse' or 'analytics over petabytes' means Redshift; 'graph' or 'relationships' means Neptune.",
  check: [
   ["Which database service would you choose for a serverless key-value store with millisecond latency at massive scale?", "Amazon DynamoDB."],
   ["A team wants to reduce read load on its RDS database for frequently accessed data. Which service helps?", "Amazon ElastiCache as an in-memory cache (RDS read replicas are another option for read scaling)."]
  ]
 },
 {
  t: "Networking: Amazon VPC, subnets, internet and NAT gateways, Route 53, CloudFront, Site-to-Site VPN and Direct Connect",
  body: [
   "Amazon Virtual Private Cloud (Amazon VPC) lets you launch AWS resources into a logically isolated virtual network that you define. You choose its IP address range, create subnets, configure route tables and control traffic with security groups and network ACLs. Each Region gives you a default VPC to start with, but production designs usually use custom VPCs.",
   "A subnet is a range of IP addresses within a VPC, and each subnet lives in one Availability Zone. A public subnet has a route to an internet gateway, so resources in it with public IP addresses can be reached from, and reach, the internet; load balancers and bastion hosts often live here. A private subnet has no direct route to the internet; databases and application servers usually live here. An internet gateway is the VPC component that allows communication between the VPC and the internet. A NAT gateway, placed in a public subnet, lets instances in private subnets start outbound connections to the internet, for example to download software updates, while preventing the internet from starting connections to them.",
   "Amazon Route 53 is AWS's highly available Domain Name System (DNS) service. It translates names like `www.example.com` into IP addresses, lets you register domain names, performs health checks, and offers routing policies such as simple, weighted, latency-based, failover and geolocation routing. Amazon CloudFront is a content delivery network (CDN) that caches static and dynamic content at edge locations worldwide, reducing latency for viewers and load on your origin, and integrating with AWS WAF and Shield for protection.",
   "Two services connect on-premises networks to AWS. AWS Site-to-Site VPN creates encrypted IPsec tunnels between your on-premises network and your VPC over the public internet. It is quick to set up and relatively inexpensive, but performance depends on internet conditions. AWS Direct Connect provides a dedicated private network connection from your premises or a colocation facility to AWS that does not traverse the public internet, offering more consistent performance and potentially lower data transfer costs for large volumes, but it takes longer to provision. Some organizations use a VPN as a backup for Direct Connect.",
   "Exam shortcuts: 'isolated network' is VPC; 'private instances need outbound internet' is NAT gateway; 'DNS' or 'domain registration' is Route 53; 'cache content globally' is CloudFront; 'encrypted over the internet, quick setup' is VPN; 'dedicated private connection, consistent performance' is Direct Connect."
  ],
  terms: [
   ["Amazon VPC", "A logically isolated virtual network in AWS where you define IP ranges, subnets and routing."],
   ["Internet gateway", "A VPC component that enables communication between resources in public subnets and the internet."],
   ["NAT gateway", "A managed service that lets instances in private subnets make outbound internet connections without accepting inbound ones."],
   ["Amazon Route 53", "A scalable DNS and domain registration service with health checks and routing policies."],
   ["AWS Direct Connect", "A dedicated private network connection between on-premises infrastructure and AWS."]
  ],
  example: "A company's VPC has public subnets in two AZs for an Application Load Balancer and NAT gateways, and private subnets for its application servers and RDS database. Route 53 points `shop.example.com` at a CloudFront distribution in front of the load balancer. The head office connects to the VPC over Direct Connect, with a Site-to-Site VPN as backup.",
  tip: "An internet gateway allows two-way internet access for public subnets; a NAT gateway allows outbound-only access for private subnets. VPN goes over the internet encrypted; Direct Connect is a private dedicated line.",
  check: [
   ["Instances in a private subnet need to download patches from the internet but must not be reachable from it. What do you add?", "A NAT gateway in a public subnet, with a route from the private subnet to it."],
   ["Which connection option does not traverse the public internet?", "AWS Direct Connect."]
  ]
 },
 {
  t: "Storage: Amazon S3 and its storage classes, Amazon EBS, instance store, Amazon EFS, Amazon FSx, AWS Storage Gateway and AWS Backup",
  body: [
   "AWS offers three kinds of storage: object, block and file. Choosing correctly depends on how the data is accessed.",
   "Amazon Simple Storage Service (Amazon S3) is object storage. You store objects (files plus metadata) in buckets and access them over HTTPS by key. It scales virtually without limit, is designed for 99.999999999 percent (eleven nines) durability by storing data redundantly across multiple AZs, and suits backups, data lakes, static website content and media. Storage classes trade price against access patterns: S3 Standard for frequently accessed data; S3 Intelligent-Tiering, which moves objects between tiers automatically when access patterns are unknown; S3 Standard-Infrequent Access (Standard-IA) for data read rarely but needed quickly; S3 One Zone-IA, which is cheaper but stores data in a single AZ; and the archive classes S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval and S3 Glacier Deep Archive, the lowest-cost class with retrieval taking hours. Lifecycle rules can move objects between classes automatically as they age.",
   "Amazon Elastic Block Store (Amazon EBS) provides block storage volumes that attach to EC2 instances, like virtual hard drives. A volume lives in one AZ and persists independently of the instance, so data survives a stop or termination if the volume is kept. You can take snapshots, which are stored in S3 and can be copied across Regions. Instance store is temporary block storage physically attached to the host; it is very fast, but its data is lost when the instance stops, hibernates or terminates, so use it only for caches, buffers and scratch data.",
   "Amazon Elastic File System (Amazon EFS) is a managed, elastic file system using the NFS protocol that many Linux instances, containers and Lambda functions can mount at once, across multiple AZs. Amazon FSx provides fully managed third-party file systems: FSx for Windows File Server (SMB, Active Directory integration), FSx for Lustre (high-performance computing), FSx for NetApp ONTAP and FSx for OpenZFS.",
   "AWS Storage Gateway is a hybrid storage service that gives on-premises applications access to cloud storage, using types such as S3 File Gateway, Volume Gateway and Tape Gateway (which replaces physical backup tapes with virtual ones stored in AWS). AWS Backup centrally manages and automates backups across services such as EBS, RDS, DynamoDB, EFS and S3 with backup plans and retention policies."
  ],
  terms: [
   ["Amazon S3", "Object storage with virtually unlimited scale and very high durability, organized into buckets."],
   ["S3 Glacier Deep Archive", "The lowest-cost S3 storage class, for long-term archives where retrieval can take hours."],
   ["Amazon EBS", "Persistent block storage volumes for EC2 instances, scoped to a single Availability Zone."],
   ["Instance store", "Temporary block storage on the physical host whose data is lost when the instance stops or terminates."],
   ["Amazon EFS", "A managed NFS file system that many Linux clients can mount concurrently across AZs."],
   ["AWS Storage Gateway", "A hybrid service connecting on-premises applications to AWS cloud storage."]
  ],
  example: "A law firm stores case documents in S3 Standard, with a lifecycle rule moving files to S3 Glacier Deep Archive after two years. Its document-management servers use EBS volumes, Windows users share files on FSx for Windows File Server, the old tape library is replaced by Tape Gateway, and AWS Backup enforces a daily backup plan for all of it.",
  tip: "Shared file storage for many Linux instances is EFS; for Windows it is FSx for Windows File Server. A single instance's boot or database disk is EBS. Data that must survive instance stops should never rely on instance store.",
  check: [
   ["Which S3 storage class is the cheapest option for data kept for years and rarely, if ever, retrieved?", "S3 Glacier Deep Archive."],
   ["What happens to data on an instance store volume when the EC2 instance is stopped?", "It is lost; instance store is temporary. Use EBS for data that must persist."]
  ]
 },
 {
  t: "AI and machine learning services: Amazon SageMaker AI, Amazon Bedrock, Amazon Q, and task-specific AI services such as Rekognition, Textract, Comprehend, Transcribe, Polly and Lex",
  body: [
   "AWS offers artificial intelligence (AI) and machine learning (ML) at three levels: platforms for building your own models, services that give you access to generative AI foundation models, and ready-made services that solve one task through a simple API. The Cloud Practitioner exam checks that you can match a use case to the right service.",
   "Amazon SageMaker AI (formerly Amazon SageMaker) is the platform for data scientists and ML engineers to build, train and deploy their own machine learning models. It provides managed notebooks, training jobs on managed infrastructure, model tuning, deployment to endpoints and monitoring. Choose it when you need a custom model trained on your own data.",
   "Amazon Bedrock is a fully managed service that gives you access to foundation models from Amazon and leading AI companies through a single API, so you can build generative AI applications such as chat assistants, summarization and content generation without managing infrastructure. You can customize models with your own data and ground answers in your documents. Amazon Q is a generative AI-powered assistant: Amazon Q Business answers questions and completes tasks using a company's own data and systems, and Amazon Q Developer helps developers write, explain and transform code and work with AWS resources.",
   "Task-specific AI services need no ML expertise. Amazon Rekognition analyzes images and video to detect objects, scenes, text and faces. Amazon Textract extracts printed and handwritten text, forms and tables from scanned documents. Amazon Comprehend uses natural language processing to find sentiment, key phrases, entities and language in text. Amazon Transcribe converts speech to text. Amazon Polly converts text to lifelike speech. Amazon Lex builds conversational interfaces (chatbots) using voice and text, the same technology behind many contact center bots. Amazon Translate provides language translation.",
   "Watch the direction of Transcribe and Polly: Transcribe goes speech to text, Polly goes text to speech. Textract reads documents; Comprehend understands the meaning of text. When a scenario involves building a custom model, think SageMaker AI; generative AI with foundation models, think Bedrock; an assistant for employees or developers, think Amazon Q."
  ],
  terms: [
   ["Amazon SageMaker AI", "A platform to build, train and deploy custom machine learning models."],
   ["Amazon Bedrock", "A managed service providing API access to foundation models for building generative AI applications."],
   ["Amazon Q", "A generative AI assistant for businesses (Q Business) and developers (Q Developer)."],
   ["Amazon Rekognition", "A service that analyzes images and video to detect objects, text, scenes and faces."],
   ["Amazon Comprehend", "A natural language processing service that extracts sentiment, entities and key phrases from text."],
   ["Amazon Transcribe", "A service that converts speech to text; Amazon Polly does the reverse."]
  ],
  example: "An insurance company uses Textract to pull data from scanned claim forms, Comprehend to detect negative sentiment in customer emails, Transcribe to turn call recordings into text, Lex to run a claims-status chatbot, and Bedrock to draft claim summaries for adjusters. Its data science team uses SageMaker AI to train a custom fraud model.",
  tip: "The exam loves the speech pair: Transcribe is speech to text; Polly is text to speech. Also separate Textract (extract text from documents) from Comprehend (understand text that you already have).",
  check: [
   ["Which service would you use to convert a written news article into audio?", "Amazon Polly (text to speech)."],
   ["A company wants to build a generative AI chat application using foundation models without managing infrastructure. Which service fits?", "Amazon Bedrock."]
  ]
 },
 {
  t: "Analytics services: Amazon Athena, AWS Glue, Amazon Kinesis, Amazon EMR and Amazon OpenSearch Service",
  body: [
   "Companies collect huge volumes of data and want to turn it into insight. AWS analytics services cover querying data where it sits, preparing it, processing it in real time or in big batches, and searching it. Each has a clear niche.",
   "Amazon Athena is a serverless, interactive query service that lets you analyze data directly in Amazon S3 using standard SQL. There are no servers or clusters to manage and no data to load; you define a table over files such as CSV, JSON or Parquet and run queries, paying based on the data scanned. It is ideal for ad hoc analysis of logs or data lakes. Storing data in compressed, columnar formats reduces the data scanned and therefore cost.",
   "AWS Glue is a serverless data integration service for extract, transform and load (ETL). Glue crawlers scan data sources and record their schemas in the AWS Glue Data Catalog, a central metadata repository that Athena, Amazon EMR and Redshift can use. Glue jobs then clean, transform and move data between stores, for example converting raw CSV files into Parquet for efficient querying.",
   "Amazon Kinesis handles streaming data in real time. Amazon Kinesis Data Streams captures and stores streams of data, such as clickstreams, application logs or IoT telemetry, so multiple applications can process them within seconds. Amazon Data Firehose (formerly Kinesis Data Firehose) is the simpler option to load streaming data into destinations such as S3, Redshift or OpenSearch Service with no code. Kinesis Video Streams handles video.",
   "Amazon EMR is a managed big data platform for running open-source frameworks such as Apache Spark, Apache Hadoop, Hive and Presto on scalable clusters, for large-scale processing like log analysis, ML data preparation and financial simulations. Amazon OpenSearch Service is a managed service for OpenSearch (and legacy Elasticsearch), used for full-text search, log analytics and operational dashboards. Amazon QuickSight, often seen alongside these, provides business intelligence dashboards.",
   "Exam keywords: 'SQL queries on data in S3 without servers' means Athena; 'ETL' or 'data catalog' means Glue; 'real-time streaming' means Kinesis; 'Hadoop' or 'Spark' means EMR; 'search' or 'log analytics dashboards' means OpenSearch Service."
  ],
  terms: [
   ["Amazon Athena", "A serverless service to query data in S3 with standard SQL, billed by data scanned."],
   ["AWS Glue", "A serverless data integration (ETL) service with a Data Catalog of table metadata."],
   ["Amazon Kinesis", "A family of services for collecting and processing streaming data in real time."],
   ["Amazon EMR", "A managed platform for big data frameworks such as Apache Spark and Hadoop."],
   ["Amazon OpenSearch Service", "A managed service for search, log analytics and visualization with OpenSearch."]
  ],
  example: "A streaming music company sends play events through Kinesis Data Streams for a real-time 'trending now' list and uses Data Firehose to land them in S3. Nightly Glue jobs convert them to Parquet and update the Data Catalog, analysts explore them with Athena, and the data science team runs large Spark jobs on EMR to build recommendation features.",
  tip: "Athena and Redshift both run SQL. Athena queries files in S3 on demand without loading them; Redshift is a data warehouse you load data into for heavy, repeated analytics.",
  check: [
   ["Which service lets you run SQL queries against log files in S3 without setting up any servers?", "Amazon Athena."],
   ["Which service would you use to ingest clickstream data and process it within seconds?", "Amazon Kinesis Data Streams."]
  ]
 },
 {
  t: "Application integration, monitoring and other services: Amazon SQS, Amazon SNS, Amazon EventBridge, Amazon CloudWatch, AWS Systems Manager and AWS IoT Core",
  body: [
   "Modern applications are built from many components that must communicate reliably and be monitored and managed at scale. These services glue the pieces together and keep them running.",
   "Amazon Simple Queue Service (Amazon SQS) is a fully managed message queue. A producer sends messages to a queue, and consumers poll the queue and process messages at their own pace, deleting each once handled. The queue buffers bursts of work and decouples components so a slow or failed consumer does not break the producer. Standard queues offer very high throughput; FIFO queues preserve order and process each message exactly once.",
   "Amazon Simple Notification Service (Amazon SNS) is a publish/subscribe (pub/sub) messaging service. A publisher sends a message to a topic, and SNS pushes it immediately to every subscriber: SQS queues, Lambda functions, HTTPS endpoints, email addresses or mobile push and SMS. The key difference: SQS is a queue that consumers pull from, one consumer processing each message; SNS pushes each message to many subscribers at once. Combining them (SNS fan-out to several SQS queues) is a common pattern.",
   "Amazon EventBridge is a serverless event bus. It receives events from AWS services, your own applications and SaaS partners, and routes them to targets based on rules that match event content, for example 'when an EC2 instance changes to stopped, invoke this Lambda function'. EventBridge Scheduler runs tasks on a schedule.",
   "Amazon CloudWatch, covered in the security domain, is also the core operational monitoring service: metrics, logs, dashboards and alarms. AWS Systems Manager is a collection of capabilities for managing EC2 instances and on-premises servers at scale: Session Manager for secure shell access without opening inbound ports or managing SSH keys, Patch Manager to automate OS patching, Run Command to run scripts across fleets, Inventory, and Parameter Store for configuration. AWS IoT Core connects billions of Internet of Things (IoT) devices to the cloud securely, receiving their messages (often over the MQTT protocol) and routing them to other AWS services.",
   "Exam cues: 'decouple' or 'buffer' means SQS; 'notify multiple subscribers' or 'fan-out' means SNS; 'react to events with rules' means EventBridge; 'patch a fleet' or 'connect to instances without SSH keys' means Systems Manager; 'connect sensors and devices' means IoT Core."
  ],
  terms: [
   ["Amazon SQS", "A managed message queue that decouples producers and consumers, which poll for messages."],
   ["Amazon SNS", "A managed pub/sub service that pushes messages from topics to many subscribers."],
   ["Amazon EventBridge", "A serverless event bus that routes events to targets based on matching rules."],
   ["AWS Systems Manager", "A set of tools to view, patch, configure and access EC2 and on-premises servers at scale."],
   ["AWS IoT Core", "A managed service that securely connects IoT devices to AWS and routes their messages."]
  ],
  example: "When a customer places an order, the web app publishes to an SNS topic. The topic fans out to an SQS queue for the billing service and another for the shipping service, each processing at its own pace. EventBridge triggers a Lambda function whenever an instance stops unexpectedly, and Systems Manager Patch Manager patches all order servers every Sunday.",
  tip: "SQS is pull-based and each message is processed by one consumer; SNS is push-based and delivers every message to all subscribers. If a scenario needs one event to reach several systems at once, pick SNS (often with SQS queues behind it).",
  check: [
   ["Which service lets administrators open a shell on EC2 instances without opening port 22 or managing SSH keys?", "AWS Systems Manager Session Manager."],
   ["A single order event must be delivered to three different services at the same time. Which service is the natural fit?", "Amazon SNS, publishing to a topic that those services (or their SQS queues) subscribe to."]
  ]
 },
 {
  t: "EC2 purchase options: On-Demand, Reserved Instances, Savings Plans, Spot Instances, Dedicated Hosts and Dedicated Instances",
  body: [
   "The same EC2 instance can cost very different amounts depending on how you buy it. Picking the right purchase option for each workload is one of the biggest cost levers in AWS, and a guaranteed exam topic.",
   "On-Demand Instances are the default: you pay for compute by the second or hour with no commitment and no up-front payment. They are ideal for short-term, spiky or unpredictable workloads, for development and testing, and for applications you are running for the first time and cannot yet forecast. They are also the most expensive option per hour.",
   "Reserved Instances (RIs) give a significant discount compared with On-Demand in exchange for a one-year or three-year commitment to a specific instance configuration, and can also reserve capacity in a specific Availability Zone. You can pay all up front, partially up front or nothing up front; paying more up front and committing longer gives bigger discounts. Standard RIs offer the largest discount; Convertible RIs let you change instance attributes such as family during the term, with a smaller discount. Savings Plans are a more flexible commitment model: you commit to a consistent amount of compute usage, measured in dollars per hour, for one or three years. Compute Savings Plans apply across EC2 regardless of family, size, Region or operating system, and also to AWS Fargate and AWS Lambda; EC2 Instance Savings Plans give a larger discount but are tied to an instance family in a Region. For steady, predictable workloads, RIs and Savings Plans are the answer.",
   "Spot Instances use spare EC2 capacity at steep discounts, but AWS can reclaim them with a two-minute warning when it needs the capacity back. They suit fault-tolerant, flexible and stateless work such as batch processing, big data, CI/CD builds, rendering and containerized workloads that can be interrupted and resumed. Never run a workload on Spot that cannot tolerate interruption.",
   "Dedicated Hosts are physical servers fully dedicated to you, with visibility into sockets and cores; they help with server-bound software licenses (BYOL) and some compliance requirements, and they are the most expensive option. Dedicated Instances run on hardware dedicated to your account but without that host-level visibility or control. Capacity Reservations, a related option, reserve capacity in an AZ without a term commitment."
  ],
  terms: [
   ["On-Demand Instance", "An EC2 instance paid by the second or hour with no commitment, best for short-term or unpredictable workloads."],
   ["Reserved Instance", "A one- or three-year commitment to an instance configuration in exchange for a discount."],
   ["Savings Plan", "A one- or three-year commitment to a dollar-per-hour amount of compute usage in exchange for discounted rates."],
   ["Spot Instance", "Spare EC2 capacity at a steep discount that AWS can interrupt with a two-minute warning."],
   ["Dedicated Host", "A physical server dedicated to one customer, with socket and core visibility for licensing."]
  ],
  example: "A company runs its production database servers 24/7 all year, so it buys a three-year Compute Savings Plan to cover them. Its nightly video-transcoding jobs, which can restart if interrupted, run on Spot Instances. A new analytics prototype with unknown usage runs On-Demand until its pattern is clear.",
  tip: "Match the workload clue to the option: 'steady state for 1-3 years' means Reserved Instances or Savings Plans; 'can be interrupted' means Spot; 'short-term, unpredictable, cannot be interrupted' means On-Demand; 'existing per-socket or per-core licenses' means Dedicated Hosts.",
  check: [
   ["Which purchase option is best for a batch job that can stop and resume at any time and must be as cheap as possible?", "Spot Instances."],
   ["Which commitment-based option can apply discounts to EC2, AWS Fargate and AWS Lambda usage?", "Compute Savings Plans."]
  ]
 },
 {
  t: "Data transfer and storage pricing: inbound vs outbound traffic, cross-Region traffic and S3 storage class costs",
  body: [
   "Compute is only part of an AWS bill. Data transfer and storage charges can be significant and are often the source of surprise costs, so the exam expects you to understand the basic pricing patterns, even though you do not need to memorize prices.",
   "The most important rule concerns direction. Data transfer into AWS from the internet (inbound) is generally free. Data transfer out of AWS to the internet (outbound) is charged per gigabyte, with tiered rates. That is why serving a lot of content directly from EC2 or S3 to users can become expensive, and why caching it with Amazon CloudFront, whose own pricing for delivery to viewers is often lower, is a common optimization.",
   "Traffic between AWS locations also matters. Data transferred between AWS Regions is charged, so cross-Region replication and multi-Region architectures have a transfer cost as well as extra storage. Within a Region, traffic between Availability Zones is generally charged, while traffic between resources in the same AZ over private IP addresses is generally free. When designing, keep chatty components close together where availability requirements allow, and use VPC endpoints to reach services such as S3 privately without paying for NAT gateway data processing.",
   "Storage pricing depends on the service and the class. For Amazon S3 you pay for the amount of data stored per month, for requests (such as PUT and GET), for data transfer out, and, in some classes, for data retrieval. The cheaper the storage class per gigabyte, the more you tend to pay to access data: Standard-IA and One Zone-IA add per-gigabyte retrieval fees and minimum storage durations, and the Glacier classes have lower storage costs but higher retrieval costs and longer retrieval times. Choose Standard for frequently accessed data, the IA classes for infrequent access, Glacier classes for archives, and Intelligent-Tiering when you cannot predict access.",
   "For Amazon EBS you pay for the provisioned size of each volume whether or not it is full, plus snapshot storage. Deleting unattached volumes and old snapshots is a quick cost win."
  ],
  terms: [
   ["Inbound data transfer", "Data moving into AWS from the internet, which is generally not charged."],
   ["Outbound data transfer", "Data moving out of AWS to the internet, charged per gigabyte."],
   ["Cross-Region transfer", "Data moved between AWS Regions, which incurs data transfer charges."],
   ["Retrieval fee", "A per-gigabyte charge for reading data from infrequent-access and archive S3 storage classes."]
  ],
  example: "A video platform notices its bill rising because users download large files straight from S3. By placing CloudFront in front of the bucket, popular videos are cached at edge locations and served more cheaply. Old raw footage is moved to S3 Glacier Deep Archive by a lifecycle rule, lowering storage cost for data that is almost never read.",
  tip: "Remember 'in is free, out costs money'. Also remember that cheaper S3 storage classes are not always cheaper overall: frequent reads from IA or Glacier classes can cost more in retrieval fees than keeping data in Standard.",
  check: [
   ["Is uploading data into Amazon S3 from the internet generally charged for data transfer?", "No, inbound data transfer from the internet is generally free; you pay for storage and requests."],
   ["Name three things that make up an S3 bill.", "Storage per GB-month, requests, and data transfer out (plus retrieval fees for some classes)."]
  ]
 },
 {
  t: "AWS Free Tier offers and how to avoid unexpected charges",
  body: [
   "The AWS Free Tier lets you explore and learn many AWS services without paying, within set limits. It is how most people do their first labs, and understanding its rules is the best way to avoid a surprise bill.",
   "Free Tier offers have come in a few forms. Always Free offers do not expire and are available to all customers within monthly limits; for example, AWS Lambda includes a monthly allowance of free requests and compute time, and Amazon DynamoDB includes a free amount of storage and capacity. Short-term free trials start when you first use a particular service and last for a limited period. Historically, new accounts also received twelve months of free usage for services such as EC2, S3 and RDS within limits. AWS changed its Free Tier for new accounts in 2025, introducing a credit-based free plan, so always check the current AWS Free Tier page to see what applies to your account rather than relying on older guides.",
   "Free Tier limits are specific: a particular instance size, a number of hours per month, a number of gigabytes or requests. Anything above the limit, or any service or size not covered, is billed at normal rates. Common surprises include launching a larger instance than the free one, leaving resources running after a lab, forgetting a NAT gateway or an Elastic IP address that is not covered, unattached EBS volumes and snapshots, and data transfer out.",
   "Protect yourself with a few habits. Create a budget in AWS Budgets with an alert as soon as you open the account, so you receive an email if costs or forecasted costs cross a threshold, even a very small one. Turn on Free Tier usage alerts in the Billing and Cost Management preferences, and check the Free Tier page in the billing console, which shows your usage against each limit. Delete resources when you finish a lab, ideally by deleting the CloudFormation stack that created them. Use the AWS Pricing Calculator before trying something new.",
   "Finally, secure the account itself: enable MFA on the root user and never publish access keys. Stolen credentials used to launch many resources are one of the most expensive surprises possible."
  ],
  terms: [
   ["AWS Free Tier", "A set of AWS offers that let customers use certain services at no charge within defined limits."],
   ["Always Free", "Free Tier offers that do not expire, such as a monthly Lambda request allowance."],
   ["Free trial", "A short-term Free Tier offer that begins when you first use a specific service."],
   ["Free Tier usage alert", "A billing preference that emails you when usage approaches or exceeds Free Tier limits."]
  ],
  example: "A student finishing a lab on EC2 deletes the instance but forgets the NAT gateway she created. Two days later, the AWS Budgets alert she set at a small monthly amount emails her that forecasted spend has crossed the threshold. She finds the NAT gateway in the billing console, deletes it and loses only a small amount.",
  tip: "The Free Tier does not cap your spending automatically. Usage beyond the limits is billed at normal rates, so budgets and alerts are how you get warned.",
  check: [
   ["Does the AWS Free Tier stop resources when you exceed its limits?", "No. Usage beyond the limits is billed normally; you need budgets and alerts to be warned."],
   ["Name two habits that prevent unexpected charges while learning.", "Set up an AWS Budgets alert and Free Tier usage alerts, and delete all resources after each lab."]
  ]
 },
 {
  t: "Estimating and tracking cost: AWS Pricing Calculator, AWS Cost Explorer and AWS Budgets",
  body: [
   "Three tools cover the life cycle of AWS costs: estimating before you build, analyzing what you have spent, and alerting when spending goes off course. The exam often asks which one fits a situation.",
   "The AWS Pricing Calculator is a free web-based tool for estimating the cost of an architecture before you deploy it. You add services, choose Regions and configurations, such as instance types, storage amounts and data transfer, and it produces a monthly and annual estimate that you can group, export and share by link. It does not need an AWS account and does not look at your actual usage. Use it for planning, budgeting a new project, comparing Regions or purchase options, and building a business case for migration.",
   "AWS Cost Explorer analyzes the costs and usage you have already incurred. It shows interactive graphs of your spending by service, account, Region, tag, usage type and more, over daily or monthly periods, with historical data and a forecast of future spend. You use it to answer questions like 'which service caused last month's increase?' or 'how much does the marketing team's workload cost?'. It also provides reports on Reserved Instance and Savings Plans utilization and coverage, along with purchase and rightsizing recommendations.",
   "AWS Budgets lets you set custom budgets and get alerted when actual or forecasted costs or usage exceed them. You can create cost budgets, usage budgets, and Reserved Instance or Savings Plans utilization and coverage budgets, and alerts can go by email or to Amazon SNS topics. Budget actions can even apply an IAM policy or stop specific instances automatically when a threshold is crossed.",
   "A useful way to remember them: the Pricing Calculator looks forward before anything exists, Cost Explorer looks backward (and a little forward with forecasts) at what you have spent, and Budgets watches spending and warns you. Cost Anomaly Detection, found alongside these tools in the billing console, uses machine learning to spot unusual spending patterns and alert you."
  ],
  terms: [
   ["AWS Pricing Calculator", "A free web tool for estimating the cost of AWS services before you deploy them."],
   ["AWS Cost Explorer", "A tool for visualizing, analyzing and forecasting your actual AWS costs and usage."],
   ["AWS Budgets", "A service that tracks costs or usage against thresholds and sends alerts or triggers actions."],
   ["Cost Anomaly Detection", "A billing feature that uses machine learning to find and alert on unusual spending."]
  ],
  example: "Before migrating, a finance manager uses the Pricing Calculator to estimate the monthly cost of the planned architecture. Three months after go-live, she uses Cost Explorer to see that data transfer is higher than expected. She creates a monthly budget in AWS Budgets with alerts at 80 and 100 percent of the planned spend, sent to the engineering team's email list.",
  tip: "'Estimate cost of a planned workload' is Pricing Calculator. 'Visualize and analyze past spending' is Cost Explorer. 'Alert me when costs exceed a threshold' is AWS Budgets. Cost Explorer does not send threshold alerts; Budgets does.",
  check: [
   ["Which tool would you use to be emailed when monthly spending is forecast to exceed a set amount?", "AWS Budgets."],
   ["Which tool estimates the cost of an architecture before you have an AWS account?", "The AWS Pricing Calculator."]
  ]
 },
 {
  t: "Detailed billing data: the Billing and Cost Management console, Cost and Usage Reports and data exports, and cost allocation tags",
  body: [
   "Summary charts are enough for many questions, but large organizations need detailed, line-by-line billing data to allocate costs to teams, feed their own reporting tools and reconcile invoices. The exam covers where that data lives and how tags make it meaningful.",
   "The AWS Billing and Cost Management console is the central place for all billing tasks. There you view your current and past bills and invoices, see month-to-date charges by service, manage payment methods and tax settings, open Cost Explorer and Budgets, see Free Tier usage and configure billing preferences such as alerts. In AWS Organizations, the management account sees the consolidated bill for all member accounts.",
   "For the most detailed data, AWS Cost and Usage Reports (CUR) deliver comprehensive billing data, down to individual resources, hourly or daily usage, pricing and discounts, as files to an Amazon S3 bucket you choose. AWS has evolved this into Data Exports, which lets you create exports of cost and usage data, including the newer CUR 2.0 format, to S3. From there you can query the data with Amazon Athena, load it into Amazon Redshift, or visualize it with Amazon QuickSight or third-party tools. If a question asks for the most granular billing data for custom analysis, the answer is the Cost and Usage Report or data exports.",
   "Cost allocation tags make that data meaningful. A tag is a key-value label, such as `Project=Checkout` or `CostCenter=1234`, that you attach to resources. There are user-defined tags you create and AWS-generated tags such as `aws:createdBy`. A tag becomes a cost allocation tag only after you activate it in the Billing and Cost Management console; after activation, it appears as a column in cost reports and as a filter and grouping dimension in Cost Explorer and Budgets. Tags are not applied retroactively to past data.",
   "A consistent tagging strategy, ideally enforced with tag policies in AWS Organizations, lets finance see exactly what each team, project or environment costs. That practice, often called showback or chargeback, supports the cost optimization pillar's 'analyze and attribute expenditure' principle."
  ],
  terms: [
   ["Billing and Cost Management console", "The console area for bills, invoices, payments, cost tools and billing preferences."],
   ["Cost and Usage Report (CUR)", "The most detailed AWS billing dataset, delivered as files to an S3 bucket."],
   ["Data Exports", "A billing feature that creates exports of cost and usage data, including CUR 2.0, to Amazon S3."],
   ["Cost allocation tag", "A resource tag activated in billing so costs can be grouped and filtered by it in reports."]
  ],
  example: "A software company tags every resource with `Team` and `Environment`, activates both as cost allocation tags, and sets up a data export to S3. Each month an Athena query over the export produces a cost per team per environment, which finance uses to charge each product group for its cloud use.",
  tip: "Tags don't show up in billing reports until they are activated as cost allocation tags in the billing console. If a question asks why tagged costs are missing from Cost Explorer, activation is the likely answer.",
  check: [
   ["Which billing data source provides the most detailed, line-item cost and usage information?", "The AWS Cost and Usage Report (now available through Data Exports), delivered to an S3 bucket."],
   ["What must you do before a user-defined tag can be used to group costs in Cost Explorer?", "Activate it as a cost allocation tag in the Billing and Cost Management console."]
  ]
 },
 {
  t: "AWS Organizations: consolidated billing, combined volume discounts and shared Reserved Instance and Savings Plans discounts",
  body: [
   "Most organizations end up with many AWS accounts: separate accounts for production and development, for different teams or for different business units. Multiple accounts give strong isolation of security and billing, but they need central management. AWS Organizations provides it at no additional charge.",
   "An organization has one management account (formerly called the master account) that creates the organization, invites or creates member accounts and pays the bill. Accounts can be grouped into organizational units (OUs), such as Production, Development or Security, forming a hierarchy. Service control policies (SCPs) attached to the organization root, an OU or an account set the maximum permissions available in those accounts. For example, an SCP can prevent anyone in development accounts from using Regions outside an approved list, even administrators. SCPs do not grant permissions; they limit them.",
   "Consolidated billing is a feature of Organizations. All member accounts' charges roll up to the management account, so you receive one bill and make one payment, while still seeing a breakdown per account. There is no extra charge for consolidated billing.",
   "Consolidated billing also saves money. Some AWS prices are tiered, getting cheaper per unit as usage grows, such as S3 storage and data transfer. The organization is treated as one customer for these volume pricing tiers, so the combined usage of all accounts reaches lower price tiers sooner than each account would alone. In addition, Reserved Instance and Savings Plans discounts can be shared across accounts: if one account buys a Savings Plan but does not use all of it, the unused benefit can apply to eligible usage in other accounts in the organization. The management account can turn off this sharing for specific accounts if needed.",
   "On the exam, 'one bill for multiple accounts' and 'combine usage for volume discounts' point to consolidated billing in AWS Organizations. 'Restrict which services or Regions member accounts can use' points to SCPs. AWS Control Tower builds on Organizations to set up a governed multi-account environment, called a landing zone, automatically."
  ],
  terms: [
   ["AWS Organizations", "A service for centrally managing multiple AWS accounts, billing and policies."],
   ["Management account", "The account that creates the organization and pays for all member accounts."],
   ["Organizational unit (OU)", "A group of accounts within an organization used to apply policies together."],
   ["Service control policy (SCP)", "A policy that sets the maximum permissions available to accounts in an organization or OU."],
   ["Consolidated billing", "A feature that combines all member accounts' charges into one bill and aggregates usage for volume pricing."]
  ],
  example: "A company has eight AWS accounts. By joining them into one organization, it receives a single bill; its combined S3 storage reaches a lower price tier; and a Compute Savings Plan purchased in the production account also covers idle hours of benefit in the test accounts. An SCP on the Development OU blocks the use of unapproved Regions.",
  tip: "SCPs never grant permissions; they only set guardrails. A user needs both an IAM policy allowing the action and no SCP blocking it.",
  check: [
   ["How does consolidated billing lower costs for a company with many accounts?", "Usage is aggregated for volume pricing tiers, and Reserved Instance and Savings Plans discounts can be shared across accounts."],
   ["Which feature of AWS Organizations can prevent member accounts from using certain services?", "Service control policies (SCPs)."]
  ]
 },
 {
  t: "Cost optimization tools: AWS Trusted Advisor, AWS Compute Optimizer and rightsizing recommendations",
  body: [
   "Knowing what you spend is only the start; the next step is spending less without hurting performance. AWS provides tools that analyze your account and suggest specific savings.",
   "AWS Trusted Advisor inspects your AWS environment and makes recommendations in several categories: cost optimization, performance, security, fault tolerance, service limits (quotas) and operational excellence. Cost optimization checks look for things such as low-utilization EC2 instances, idle load balancers, underutilized EBS volumes, unassociated Elastic IP addresses, idle RDS instances, and opportunities to buy Reserved Instances or Savings Plans. Each check is shown as green (no problem), yellow (investigation recommended) or red (action recommended). All customers get a core set of checks, mainly security and service quotas; the full set of checks, including cost optimization, requires a Business Support plan or higher.",
   "AWS Compute Optimizer uses machine learning to analyze the historical utilization metrics of your resources and recommend optimal configurations. It covers EC2 instances, EC2 Auto Scaling groups, EBS volumes, Lambda functions, Amazon ECS services on Fargate and some commercial software licenses. For each resource it reports whether it is over-provisioned, under-provisioned or optimized, and suggests better instance types or sizes along with estimated savings and performance risk. It must be opted in to, and it needs some history of metrics to make recommendations.",
   "Rightsizing recommendations are also available in AWS Cost Explorer, which identifies idle and underused EC2 instances and suggests downsizing or terminating them, showing estimated monthly savings. The AWS Cost Optimization Hub brings recommendations from several of these sources together in one place.",
   "Tools only suggest; people act. A good routine is to review recommendations monthly, rightsize first (so you do not commit to capacity you do not need), then cover the remaining steady usage with Savings Plans or Reserved Instances, and schedule non-production resources to stop outside working hours."
  ],
  terms: [
   ["AWS Trusted Advisor", "A service that checks an account against best practices, including cost optimization, and recommends actions."],
   ["AWS Compute Optimizer", "A service that uses machine learning on utilization history to recommend optimal resource configurations."],
   ["Over-provisioned", "A resource larger than its workload needs, which wastes money."],
   ["Rightsizing recommendation", "A suggestion to downsize, change or terminate a resource based on its actual utilization."]
  ],
  example: "Trusted Advisor flags ten EC2 instances with low utilization and three unattached Elastic IP addresses. Compute Optimizer confirms seven of the instances are over-provisioned and recommends smaller sizes. The team rightsizes them, releases the addresses and then buys a Savings Plan sized to the new, smaller steady-state usage.",
  tip: "Trusted Advisor covers many categories across the account; Compute Optimizer focuses specifically on right-sizing compute and related resources using ML. Remember that the full set of Trusted Advisor checks needs Business Support or higher.",
  check: [
   ["Which service uses machine learning on historical metrics to recommend better EC2 instance types?", "AWS Compute Optimizer."],
   ["Name three categories of AWS Trusted Advisor checks.", "Any three of cost optimization, performance, security, fault tolerance, service limits and operational excellence."]
  ]
 },
 {
  t: "AWS Support plans and what each includes, including Technical Account Managers and AWS Health",
  body: [
   "AWS offers tiered Support plans, from free to enterprise-grade. The plan lineup has been evolving, so confirm current names and features on the AWS Support plans page before the exam, but the concepts below are what the exam guide tests: who you can contact, how fast, and what extra guidance you get.",
   "Basic Support is included free for all accounts. It provides customer service for account and billing questions, access to documentation, whitepapers, AWS re:Post and the Knowledge Center, the core AWS Trusted Advisor checks and the AWS Health Dashboard. It does not include technical support cases. Developer Support adds business-hours email access to technical support for one primary contact, with general guidance and response times suited to testing and development. Business Support adds 24/7 phone, email and chat access to technical support for multiple contacts, faster response times for production issues, the full set of Trusted Advisor checks and help with third-party software on AWS.",
   "The enterprise tiers add proactive guidance. Enterprise On-Ramp is for customers starting their business-critical journey: it adds access to a pool of Technical Account Managers (TAMs), faster response for business-critical issues and some proactive reviews. Enterprise Support provides a designated TAM, a named technical point of contact who knows your environment, provides proactive architecture and operational guidance and coordinates access to AWS experts. It also includes the fastest response-time targets for business-critical outages, concierge support for billing and account questions, and programs such as Infrastructure Event Management for planned launches.",
   "AWS Health provides information about events that can affect your AWS resources. The AWS Health Dashboard shows both general service health for all customers and your account-specific view: scheduled maintenance, service issues affecting your resources and account notifications, with guidance for remediation. It is available to all customers, and you can route its events through Amazon EventBridge to automate responses. This differs from a public status page because it is personalized to the resources you actually use.",
   "For the exam: a designated TAM means Enterprise; full Trusted Advisor checks and 24/7 technical support start at Business; free support with no technical cases is Basic."
  ],
  terms: [
   ["Basic Support", "The free tier of support: customer service, documentation, re:Post, core Trusted Advisor checks and AWS Health."],
   ["Business Support", "A plan adding 24/7 technical support by phone, email and chat and the full set of Trusted Advisor checks."],
   ["Technical Account Manager (TAM)", "An AWS technical point of contact who provides proactive guidance; designated in Enterprise Support."],
   ["AWS Health Dashboard", "A dashboard showing AWS service events and account-specific events that may affect your resources."]
  ],
  example: "A bank running critical payment systems on AWS subscribes to Enterprise Support to get a designated TAM, who reviews its architecture before a major product launch and coordinates AWS experts during the event. Its operations team subscribes to AWS Health events through EventBridge so scheduled maintenance on its instances creates tickets automatically.",
  tip: "The 'designated Technical Account Manager' clue means Enterprise Support; 'pool of TAMs' means Enterprise On-Ramp. For 'the minimum plan with 24/7 phone support and all Trusted Advisor checks', the answer is Business.",
  check: [
   ["What is the least expensive Support plan that includes the full set of Trusted Advisor checks?", "Business Support."],
   ["Where can you see scheduled maintenance events that will affect your own EC2 instances?", "The AWS Health Dashboard (your account-specific view of AWS Health)."]
  ]
 },
 {
  t: "Help and partner resources: AWS re:Post, Knowledge Center, AWS Marketplace, AWS Partner Network, AWS Professional Services and the AWS Trust & Safety team",
  body: [
   "Beyond Support plans, AWS has a set of resources for learning, buying, getting expert help and reporting problems. The exam checks that you know which one fits each need.",
   "AWS re:Post is a community-driven question-and-answer service. You can ask technical questions, browse answers from the community and AWS experts, and find curated articles. It is available to everyone with no Support plan required. The AWS Knowledge Center, now hosted on re:Post, contains articles and videos answering the questions AWS Support receives most often. Documentation, whitepapers, AWS Prescriptive Guidance and training through AWS Skill Builder round out the self-service resources.",
   "AWS Marketplace is a curated digital catalog where you can find, buy, deploy and manage third-party software, data and services that run on AWS: for example security tools, databases, business applications and machine learning models. Many listings offer free trials and pay-as-you-go pricing, and charges appear on your AWS bill, which simplifies procurement.",
   "The AWS Partner Network (APN) is a global community of companies that build solutions and services on AWS. Consulting partners (also described as services partners) help customers design, migrate, build and manage workloads; technology partners (software partners) offer products that integrate with AWS. Partners can earn AWS competencies and specializations to show validated expertise in areas such as migration or security. AWS Professional Services is AWS's own global team of experts who work with customers, often alongside partners, on large projects to achieve specific business outcomes. Solutions Architects at AWS also provide guidance to customers.",
   "The AWS Trust & Safety team handles reports of abuse involving AWS resources, such as spam, port scanning, denial of service attacks, intrusion attempts, hosting of malicious or objectionable content and phishing websites. If you believe an AWS resource is being used for abuse, you report it to AWS Trust & Safety through the abuse reporting form. It is not a support channel for problems with your own account; those go to AWS Support.",
   "Summary: community answers means re:Post; common problems means Knowledge Center; third-party software means Marketplace; outside experts means APN partners; AWS's own consultants means Professional Services; abuse means Trust & Safety."
  ],
  terms: [
   ["AWS re:Post", "A community question-and-answer service for AWS, available to all customers."],
   ["AWS Marketplace", "A digital catalog of third-party software and services that run on AWS, billed through AWS."],
   ["AWS Partner Network (APN)", "AWS's program of consulting and technology partners who help customers build and run on AWS."],
   ["AWS Professional Services", "AWS's own team of experts who help customers deliver large cloud projects and outcomes."],
   ["AWS Trust & Safety team", "The AWS team that investigates reports of abuse involving AWS resources."]
  ],
  example: "A company notices repeated login attempts against its servers coming from an IP address that belongs to AWS. It reports the activity to the AWS Trust & Safety team. Meanwhile, it hires an AWS Partner with a migration competency to move its remaining data center workloads and buys a backup product through AWS Marketplace.",
  tip: "Reporting abuse coming from AWS resources, such as spam or attacks, always goes to the AWS Trust & Safety team, not to AWS Support, AWS Shield or GuardDuty.",
  check: [
   ["Where should you report that an AWS-hosted website is being used for phishing?", "The AWS Trust & Safety team, using the abuse reporting process."],
   ["A company wants to hire an outside firm with validated AWS migration expertise. Where should it look?", "The AWS Partner Network, for consulting partners with the relevant AWS competency."]
  ]
 }
], { reviewed: "2026-09-25" });
