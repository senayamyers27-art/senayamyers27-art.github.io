/* Lessons for AWS Certified Cloud Practitioner (CLF-C02): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-cloud-practitioner", [
 {
  "t": "Benefits of the AWS Cloud: pay-as-you-go pricing, economies of scale, agility, elasticity and global reach",
  "body": [
   "Cloud computing is the on-demand delivery of IT resources, such as servers, storage, databases, networking and software, over the internet with pay-as-you-go pricing. Instead of buying and running your own data center, you rent exactly the capacity you need from a provider like Amazon Web Services (AWS) and stop paying when you no longer need it. The AWS Certified Cloud Practitioner exam (CLF-C02) expects you to explain why a business would want that, in business terms as much as technical ones, so this lesson focuses on five benefits: pay-as-you-go pricing, economies of scale, agility, elasticity and global reach.",
   "Pay-as-you-go pricing means you pay for what you actually consume, usually measured per second, per hour, per request or per gigabyte, with no large up-front purchase and no long-term contract required. A project that fails costs you only what it used while it ran. Economies of scale describe why unit prices can be low: AWS buys hardware, power and network capacity for a very large number of customers, and that aggregated usage lowers its cost per unit. AWS has passed many of those savings on as price reductions over the years, which is why the exam links economies of scale to lower variable costs for you.",
   "Agility is about speed. In a traditional data center, getting a new server might take weeks of purchasing, shipping, racking and cabling. In AWS you can launch one in minutes from the AWS Management Console (EC2 > Instances > Launch instances) or with a single command such as `aws ec2 run-instances --image-id <ami-id> --instance-type t3.micro`. Because experiments are cheap and fast, teams can try ideas, measure them and throw away the ones that do not work. That lowers the cost and risk of innovation, which is how AWS usually frames agility.",
   "Elasticity is the ability to add resources when demand rises and remove them when it falls, ideally automatically. A retailer can run ten web servers on an ordinary day and sixty during a holiday sale, then shrink back, using Amazon EC2 Auto Scaling or serverless services that scale on their own. You do not pay for idle capacity sitting around waiting for the peak. Global reach means you can deploy to AWS Regions around the world in minutes, putting your application close to your users for lower latency and meeting local data residency rules without building a data center in each country. Services such as Amazon CloudFront extend that reach further by caching content at edge locations near users.",
   "The exam tests the distinctions between these benefits, because the options are usually all real benefits and only one fits the scenario. Agility is about how quickly you can get resources and try things; elasticity is about capacity following demand up and down. Pay-as-you-go describes the billing model; economies of scale explain why the price per unit is low. Global reach is about geography and latency, not about scaling within one Region. Keep asking what the scenario is really complaining about: slow provisioning, wasted idle capacity, high unit cost or distant users.",
   "Consider a worked example. A start-up launches a photo-sharing app. It has no money for servers, so it uses pay-as-you-go services and pays only for the handful of instances and storage it uses in month one. When a celebrity shares the app, traffic jumps twentyfold for a weekend; Auto Scaling adds instances and removes them on Monday, so the bill rises only for those two days (elasticity). The team tests a new filter feature by launching a copy of the stack in minutes and deleting it after a day (agility). A year later it opens to users in Asia by deploying to a Region there (global reach).",
   "Common mistakes: treating agility and elasticity as the same thing; assuming the cloud is always cheaper no matter how it is used (idle, oversized resources still cost money); thinking pay-as-you-go means there are no discounts for commitment, when savings plans and reserved capacity exist for steady workloads; and believing global reach means data automatically moves between Regions. In fact your data stays in the Region you choose unless you copy or replicate it, which is exactly what makes data residency possible.",
   "Exam questions are usually short scenarios with clue words. 'Pay only for what you use' or 'no up-front investment' points to pay-as-you-go. 'Lower prices because of aggregated usage across many customers' is economies of scale. 'Launch resources in minutes' or 'experiment quickly at low cost' is agility. 'Scale in and out automatically with demand' is elasticity. 'Deploy to users worldwide in minutes' or 'reduce latency for international customers' is global reach. If two options both seem right, pick the one that matches the specific problem described."
  ],
  "terms": [
   [
    "Cloud computing",
    "On-demand delivery of IT resources over the internet with pay-as-you-go pricing."
   ],
   [
    "Pay-as-you-go pricing",
    "A billing model where you pay only for the resources you consume, with no large up-front purchase."
   ],
   [
    "Economies of scale",
    "Lower cost per unit that AWS achieves by aggregating the usage of many customers, passed on as lower prices."
   ],
   [
    "Agility",
    "The ability to provision resources and experiment quickly, cutting the time from idea to working system."
   ],
   [
    "Elasticity",
    "Automatically adding and removing capacity so resources match current demand."
   ],
   [
    "Global reach",
    "The ability to deploy workloads in AWS Regions around the world in minutes to serve users with low latency."
   ],
   [
    "AWS Region",
    "A separate geographic area containing multiple isolated Availability Zones where you choose to run resources."
   ]
  ],
  "example": "An online ticket seller used to buy servers sized for the one day a year a major concert goes on sale, leaving them almost idle the rest of the year. After moving to AWS it runs a small fleet most days and lets Auto Scaling add capacity when a big sale opens, paying only for those extra hours. It also deployed a copy of the site in a European Region so fans there get faster page loads and their data stays in Europe.",
  "tip": "Agility is about how fast you can provision and experiment; elasticity is about capacity automatically following demand. Look at whether the scenario complains about slow setup or about fluctuating load before choosing.",
  "check": [
   [
    "A company wants to avoid a large up-front hardware purchase and pay only for what it uses. Which benefit is this?",
    "Pay-as-you-go pricing, because costs follow actual consumption with no up-front investment."
   ],
   [
    "Why can AWS offer lower unit prices than most companies could achieve on their own?",
    "Economies of scale: aggregating usage from many customers lowers AWS's cost per unit, and it passes savings on as lower prices."
   ],
   [
    "A developer can launch a test environment in minutes and delete it the same day. Which benefit does this show?",
    "Agility, the ability to provision and experiment quickly and cheaply."
   ],
   [
    "An application needs to serve users in several continents with low latency. Which benefit applies?",
    "Global reach, because you can deploy to Regions close to those users in minutes."
   ]
  ]
 },
 {
  "t": "The six advantages of cloud computing, including trading fixed expense for variable expense and no longer guessing capacity",
  "body": [
   "AWS summarizes the business case for the cloud as six advantages of cloud computing. They appear in AWS whitepapers and training material, and the exam often quotes them almost word for word, so it pays to know the exact phrases and what each one means in practice. Think of them as the answer to a manager who asks, 'Why should we stop running our own data center?'",
   "First, trade fixed expense for variable expense. Instead of investing heavily in data centers and servers before you know how you will use them, a capital expense (CapEx), you pay only when you consume computing resources, an operational expense (OpEx). Second, benefit from massive economies of scale: because usage from many customers is aggregated, AWS can achieve lower variable costs than you could on your own. Third, stop guessing capacity. On premises you must predict demand months ahead, and you either overbuy and waste money or underbuy and suffer slowdowns and outages. In the cloud you can scale up and down within minutes as demand actually arrives.",
   "Fourth, increase speed and agility: new resources are a click or an application programming interface (API) call away, so the time to make them available to developers drops from weeks to minutes. Fifth, stop spending money running and maintaining data centers. Racking, stacking, powering and cooling servers is undifferentiated heavy lifting, work every company must do but that does not make its product better. Moving it to AWS lets you focus on your customers. Sixth, go global in minutes: you can deploy to multiple Regions around the world with a few clicks and give users lower latency at minimal cost.",
   "It helps to see how these connect to real tools. Stopping capacity guessing is delivered by Auto Scaling groups, which keep a desired number of instances and adjust it based on a metric such as average CPU. Variable expense shows up in the Billing and Cost Management console, where charges appear per service and per hour of use rather than as a single purchase order. Going global is simply choosing another Region in the console's Region selector or passing `--region eu-west-1` to an AWS Command Line Interface (CLI) command. None of these steps involve signing a purchase order or waiting for a delivery, which is the practical difference you will feel in labs.",
   "The distinctions the exam tests are subtle because several advantages overlap. 'Trade fixed expense for variable expense' is about the accounting model: CapEx becomes OpEx. 'Economies of scale' is about why the price per unit is low. 'Stop guessing capacity' is about forecasting and wasted or insufficient capacity. 'Increase speed and agility' is about time to provision. 'Stop spending money running data centers' is about the physical work you no longer do. 'Go global in minutes' is about geography.",
   "Consider a worked example. A regional bank plans a new mobile banking service. On premises it would need to buy servers for the projected peak three years out, sign a data center lease and hire staff for hardware maintenance. On AWS it starts small and pays monthly (fixed to variable expense), lets Auto Scaling handle payday peaks (stop guessing capacity), has developers launch test environments the same afternoon (speed and agility), leaves hardware refresh to AWS (stop running data centers) and later adds a Region for customers abroad (go global).",
   "Common mistakes: inventing advantages that are not on the list, such as 'eliminate all security responsibility' or 'guarantee zero downtime'; confusing 'stop guessing capacity' with 'economies of scale' because both mention cost; and assuming the cloud makes every cost variable. Commitments such as Reserved Instances and Savings Plans trade some flexibility for a discount, which you will study in the billing domain, but the default model is variable, usage-based spending. The cloud reduces infrastructure work, but it never removes the customer's security responsibilities.",
   "Exam questions usually describe a situation and ask which advantage it illustrates. 'Tired of buying servers for a peak that never comes' or 'over-provisioned hardware sits idle' means stop guessing capacity. 'Avoid large up-front hardware purchases' or 'convert capital expense to operating expense' means trade fixed expense for variable expense. 'Engineers should work on features rather than replacing failed disks' means stop spending money running and maintaining data centers. 'Lower pay-as-you-go prices due to aggregated usage' is economies of scale."
  ],
  "terms": [
   [
    "Capital expense (CapEx)",
    "Money spent up front on long-lived physical assets such as servers and data centers."
   ],
   [
    "Operational expense (OpEx)",
    "Ongoing spending on services as they are consumed, such as a monthly cloud bill."
   ],
   [
    "Variable expense",
    "A cost that rises and falls with actual usage instead of being fixed in advance."
   ],
   [
    "Undifferentiated heavy lifting",
    "Necessary infrastructure work, such as racking and powering servers, that does not set a business apart from competitors."
   ],
   [
    "Capacity planning",
    "Forecasting how much computing capacity will be needed; in the cloud, scaling on demand replaces much of the guesswork."
   ],
   [
    "Auto Scaling group",
    "A set of EC2 instances that AWS grows or shrinks automatically to match a target such as average CPU utilization."
   ]
  ],
  "example": "A university runs course registration twice a year, when load is fifty times normal. It used to keep enough servers for that peak all year, most of them idle. On AWS it runs a small baseline and lets Auto Scaling add instances during registration week, turning a large hardware purchase every few years into a modest monthly bill that rises only when students are actually registering.",
  "tip": "Memorize the six phrases exactly. Distractors that sound plausible, such as 'eliminate security responsibilities' or 'guarantee 100 percent uptime', are not advantages of cloud computing.",
  "check": [
   [
    "A company over-provisioned servers for a traffic peak that never arrived. Which advantage addresses this?",
    "Stop guessing capacity, because you can scale up and down as real demand arrives."
   ],
   [
    "What does 'trade fixed expense for variable expense' mean in accounting terms?",
    "Moving from up-front capital expense on hardware to operational expense paid as resources are consumed."
   ],
   [
    "Which advantage explains why AWS can charge lower variable costs than a company achieves on its own?",
    "Benefit from massive economies of scale, because AWS aggregates usage from many customers."
   ],
   [
    "A team wants engineers to stop replacing failed disks and focus on product features. Which advantage is this?",
    "Stop spending money running and maintaining data centers, removing undifferentiated heavy lifting."
   ]
  ]
 },
 {
  "t": "High availability, fault tolerance, scalability and elasticity: what each term means and how AWS delivers it",
  "body": [
   "High availability, fault tolerance, scalability and elasticity sound similar, and the exam deliberately uses them as distractors for each other. Learning a precise definition and the AWS feature behind each one earns easy points. Before starting, recall the building blocks: an AWS Region is a geographic area, and each Region contains multiple Availability Zones (AZs), which are one or more discrete data centers with independent power, cooling and networking, connected to each other with low-latency links.",
   "High availability means a system stays up and usable most of the time, with minimal downtime, even when individual components fail. It usually tolerates a brief interruption while traffic moves to healthy resources. In AWS you achieve it by running resources in more than one AZ and placing an Elastic Load Balancing (ELB) load balancer in front of them, so health checks send traffic only to healthy targets. Amazon Relational Database Service (Amazon RDS) with a Multi-AZ deployment keeps a standby in another AZ and fails over to it automatically, typically within a minute or two.",
   "Fault tolerance is a stricter idea: the system keeps operating with no interruption and no loss of data when a component fails, because redundant components are already doing the work. Think of an aircraft with multiple engines. Fault tolerance usually costs more because you pay for fully redundant capacity all the time. Many AWS managed services are built this way internally; for example, Amazon Simple Storage Service (Amazon S3) stores objects redundantly across multiple AZs in a Region, so the loss of a device or even a facility does not lose your data.",
   "Scalability is the ability of a system to handle more load by adding resources. You can scale vertically (scale up) by moving to a bigger instance with more CPU and memory, or horizontally (scale out) by adding more instances. Horizontal scaling is generally preferred in the cloud because there is no ceiling of a single machine and it also improves availability. Elasticity is scalability that happens automatically in both directions, growing and shrinking with demand, so you pay only for what the current load needs. Amazon EC2 Auto Scaling, AWS Lambda and Amazon DynamoDB on-demand capacity are all elastic.",
   "Here is how the pieces fit in a typical web tier. An Auto Scaling group spans two or three AZs with a minimum, desired and maximum instance count, and a target tracking policy keeps average CPU near a value you choose. The load balancer registers new instances as they launch and stops sending traffic to any that fail health checks, and the group replaces failed instances automatically. That one design delivers high availability (multiple AZs), elasticity (automatic scale out and in) and a measure of self-healing. You can watch it happen in the console under EC2 > Auto Scaling groups > Activity, where each launch and termination is listed with its reason.",
   "Consider a worked example. A news site runs four instances in one AZ. When that AZ has a power problem, the site goes down, so it is neither highly available nor fault tolerant. The team moves to an Auto Scaling group across three AZs behind an Application Load Balancer and switches the database to RDS Multi-AZ. Now an AZ failure causes at most a short blip while the database fails over (high availability), and breaking news traffic triggers extra instances that are removed at night (elasticity).",
   "Common mistakes: calling Multi-AZ RDS fault tolerant when it involves a short failover (it is usually described as high availability); assuming vertical scaling is elastic (resizing an instance generally requires a stop and start, and it is not automatic); treating scalability and elasticity as identical, when elasticity adds the automatic, two-way part; and thinking a single large instance is highly available because it is powerful. One instance in one AZ is a single point of failure however big it is.",
   "Exam wording gives the answer away. 'No downtime at all' or 'continues operating without interruption when a component fails' points to fault tolerance. 'Minimal downtime' or 'remains accessible if an AZ fails' points to high availability, usually multiple AZs plus a load balancer. 'Can handle growth by adding resources' is scalability. 'Automatically adds and removes capacity based on demand' is elasticity. 'Upgrade to a larger instance' is vertical scaling, and 'add more instances' is horizontal scaling."
  ],
  "terms": [
   [
    "Availability Zone (AZ)",
    "One or more discrete data centers in a Region with independent power, cooling and networking."
   ],
   [
    "High availability",
    "Design that keeps a system accessible with minimal downtime when components fail, often with a brief failover."
   ],
   [
    "Fault tolerance",
    "Design that keeps a system running with no interruption or data loss when a component fails, using fully redundant components."
   ],
   [
    "Scalability",
    "The ability to handle more load by adding resources, vertically (bigger) or horizontally (more)."
   ],
   [
    "Elasticity",
    "Scaling that happens automatically in both directions so capacity matches demand."
   ],
   [
    "Elastic Load Balancing (ELB)",
    "A service that spreads incoming traffic across healthy targets in multiple AZs."
   ],
   [
    "Multi-AZ deployment",
    "An Amazon RDS option that keeps a synchronous standby in another AZ and fails over automatically."
   ]
  ],
  "example": "An online learning platform ran its application and database on one EC2 instance. After an outage during exam week, it moved the web tier into an Auto Scaling group across three AZs behind a load balancer and migrated the database to Amazon RDS with Multi-AZ. The next AZ disruption caused a short database failover that most students never noticed, and the fleet now grows during exam weeks and shrinks during holidays.",
  "tip": "'No interruption at all' means fault tolerance; 'minimal downtime' or 'survives an AZ failure' means high availability. 'Automatically adds and removes capacity' is elasticity, which is more specific than scalability.",
  "check": [
   [
    "What is the difference between high availability and fault tolerance?",
    "High availability minimizes downtime and may allow a short failover; fault tolerance keeps operating with no interruption because redundant components are already running."
   ],
   [
    "Is moving to a larger EC2 instance type horizontal or vertical scaling?",
    "Vertical scaling (scaling up), because you give one instance more CPU and memory rather than adding instances."
   ],
   [
    "Which AWS design makes a web tier highly available?",
    "Running instances in multiple Availability Zones behind an Elastic Load Balancing load balancer with health checks."
   ],
   [
    "What makes elasticity different from plain scalability?",
    "Elasticity adjusts capacity automatically in both directions, adding and removing resources as demand changes."
   ]
  ]
 },
 {
  "t": "AWS Well-Architected Framework: the six pillars and what each one is responsible for",
  "body": [
   "The AWS Well-Architected Framework is a set of design principles, best practices and review questions that help you build and evaluate workloads in the cloud. A workload is a collection of resources and code that delivers business value, such as a customer-facing website or a data pipeline. The framework is organized into six pillars. On the exam you will be given a goal or practice and asked which pillar it belongs to, so learn each pillar's focus and a few typical practices.",
   "Operational excellence is about running and monitoring systems to deliver business value and continually improving processes. Its practices include performing operations as code, making frequent, small, reversible changes, refining operations procedures often, anticipating failure and learning from operational events. Security is about protecting data, systems and assets. Its practices include implementing a strong identity foundation with least privilege, enabling traceability through logging and monitoring, applying security at all layers, automating security best practices, protecting data in transit and at rest, keeping people away from data and preparing for security events.",
   "Reliability is about a workload performing its intended function correctly and consistently, including recovering from failures. Practices include automatically recovering from failure, testing recovery procedures, scaling horizontally to increase aggregate availability, stopping guessing capacity and managing change through automation. Performance efficiency is about using computing resources efficiently as demand changes and technology evolves: democratizing advanced technologies through managed services, going global in minutes, using serverless architectures, experimenting more often and choosing the right resource type for the job.",
   "Cost optimization is about delivering business value at the lowest price point. Its practices include implementing cloud financial management, adopting a consumption model, measuring overall efficiency, stopping spending on undifferentiated heavy lifting, and analyzing and attributing expenditure, for example with cost allocation tags. Sustainability, the most recently added pillar, is about minimizing the environmental impact of running cloud workloads: understanding your impact, setting sustainability goals, maximizing utilization, anticipating and adopting new, more efficient hardware and software, using managed services and reducing the downstream impact of your workloads.",
   "The distinctions the exam cares about come from pillars that overlap. Reliability is about recovering from failure and meeting demand; performance efficiency is about picking the right resources so the workload is fast and efficient. Cost optimization is about money; sustainability is about energy and resource use, even though the actions (removing idle resources, rightsizing) often help both. Operational excellence is about how you run and improve the workload, such as runbooks, deployments and learning from incidents, while security covers identity, detection, data protection and incident response.",
   "Consider a worked example. An online store asks you to classify five improvements. Enabling AWS CloudTrail in every account and alerting on root sign-ins is security (traceability). Adding a second AZ and testing database failover is reliability. Moving image resizing to AWS Lambda so it scales with uploads and switching to a newer instance family is performance efficiency. Tagging resources by team and reviewing a monthly cost report is cost optimization. Deploying through a pipeline with small changes that can be rolled back is operational excellence, and scheduling development instances to stop overnight to cut energy use is sustainability.",
   "Common mistakes: listing only five pillars and forgetting sustainability; placing 'test recovery procedures' under operational excellence rather than reliability; putting 'use serverless and managed services to get better performance' under cost optimization when the emphasis is speed and efficiency; and thinking the framework is a certification or a compliance standard. It is guidance. AWS also publishes lenses that extend it for specific technologies or industries, and you review workloads against it with the AWS Well-Architected Tool. Finally, remember that the pillars involve trade-offs: adding a third AZ improves reliability but raises cost, and the framework asks you to make those trade-offs deliberately rather than by accident.",
   "Exam questions name a practice and ask for the pillar. 'Recover automatically from an AZ failure' is reliability. 'Choose the right instance type to meet performance needs' is performance efficiency, while 'choose the right instance size to stop paying for unused capacity' is cost optimization. 'Reduce idle resources to lower energy use' or 'minimize environmental impact' points to sustainability. 'Least privilege' and 'traceability' mean security. 'Operations as code' and 'learn from operational failures' mean operational excellence."
  ],
  "terms": [
   [
    "AWS Well-Architected Framework",
    "AWS guidance of design principles, best practices and questions for building and reviewing cloud workloads."
   ],
   [
    "Workload",
    "A set of components that together deliver business value, such as an application and its data stores."
   ],
   [
    "Operational excellence pillar",
    "Running and monitoring systems and continually improving processes and procedures."
   ],
   [
    "Reliability pillar",
    "Ensuring a workload performs correctly and consistently and recovers from failures."
   ],
   [
    "Performance efficiency pillar",
    "Using the right resources efficiently as demand changes and technology evolves."
   ],
   [
    "Cost optimization pillar",
    "Delivering business value at the lowest price point."
   ],
   [
    "Sustainability pillar",
    "Minimizing the environmental impact of running cloud workloads."
   ]
  ],
  "example": "A media company reviewing its video platform finds it runs in one AZ, has no tested backups and uses instance types chosen five years ago. It adds a second AZ and practices restores (reliability), moves transcoding to a managed service sized per job (performance efficiency), and tags every resource by product so finance can see who spends what (cost optimization). Turning off idle test clusters at night reduces both the bill and energy use (cost optimization and sustainability).",
  "tip": "There are six pillars; sustainability is the one people forget. Separate reliability (recover and meet demand) from performance efficiency (right resources for speed), and cost optimization (money) from sustainability (environmental impact).",
  "check": [
   [
    "Which pillar includes the practice 'test recovery procedures'?",
    "Reliability, because it is about recovering from failures and performing consistently."
   ],
   [
    "Which pillar focuses on least privilege and traceability?",
    "Security, which covers identity, logging and monitoring, and data protection."
   ],
   [
    "A company wants to minimize the energy its workloads consume. Which pillar is this?",
    "Sustainability, which targets the environmental impact of cloud workloads."
   ],
   [
    "Selecting a newer instance family to run a compute-heavy job faster fits which pillar?",
    "Performance efficiency, which is about choosing the right resources for the job as technology evolves."
   ]
  ]
 },
 {
  "t": "Cloud design principles: loose coupling, designing for failure, automation and operations as code",
  "body": [
   "Beyond the six Well-Architected pillars, AWS teaches a handful of general design principles for cloud architectures. They explain why cloud designs look different from traditional data center designs: in the cloud, resources are cheap to create and destroy, failures are expected, and almost everything can be controlled through an API. The Cloud Practitioner exam checks that you recognize these principles and can pick the architecture that follows them.",
   "Loose coupling means components interact through well-defined interfaces and do not depend directly on each other's availability or timing. If a web tier calls an order-processing tier directly and the processing tier slows down, the web tier slows down or fails too; that is tight coupling. If instead the web tier puts orders on an Amazon Simple Queue Service (Amazon SQS) queue and the processing tier reads from it, either side can scale, fail or be replaced without breaking the other, and the queue absorbs sudden spikes. Load balancers, queues, notifications through Amazon Simple Notification Service (Amazon SNS) and events through Amazon EventBridge are the typical tools for decoupling.",
   "```\n# Producer (web tier) drops an order on the queue and returns immediately\naws sqs send-message --queue-url <queue-url> --message-body '{\"orderId\": 1042}'\n\n# Consumer (worker tier) pulls work when it is ready\naws sqs receive-message --queue-url <queue-url>\n```",
   "Designing for failure starts from the assumption that everything fails eventually: disks, instances, network links, even whole data centers. Rather than hoping nothing breaks, you build in redundancy and automatic recovery. Run across multiple Availability Zones (AZs), avoid single points of failure, keep backups and test that you can restore them, and use health checks so failed resources are replaced automatically. A related idea is to treat servers as disposable resources rather than fixed ones: if an instance misbehaves, terminate it and let automation launch a fresh, identical one instead of repairing it by hand.",
   "Automation removes slow, error-prone manual steps. EC2 Auto Scaling adds and removes capacity, health checks replace failed instances, and Amazon CloudWatch alarms trigger actions. Operations as code, closely related to infrastructure as code (IaC), means defining your infrastructure and operational procedures in files that can be version-controlled, reviewed and run repeatedly. AWS CloudFormation is the main AWS example: you describe the resources you want in a template written in JSON or YAML, then run something like `aws cloudformation deploy --template-file network.yaml --stack-name prod-network`, and CloudFormation creates the same resources the same way every time. The AWS Cloud Development Kit (AWS CDK) lets you define the same thing in a programming language.",
   "Consider a worked example. A photo site processes uploads on the same servers that serve web pages, so a burst of uploads makes the site slow for everyone. The redesign stores uploads in Amazon S3, sends a message to an SQS queue for each one, and runs a separate Auto Scaling group of workers that scales on the queue's length. The web tier stays fast because it only enqueues work (loose coupling), the worker fleet can lose an instance without losing messages (design for failure), and the whole stack is defined in a CloudFormation template so a test copy can be created in minutes (operations as code).",
   "Common mistakes: thinking loose coupling means components cannot talk to each other (they still communicate, just through a buffer or interface); confusing SQS, a queue that consumers poll, with SNS, which pushes a message to many subscribers at once; believing that designing for failure means buying more reliable hardware, when it means expecting failure and recovering automatically; and treating a manually built environment as repeatable because 'we wrote down the steps'. Other principles you may see include using managed services instead of running software yourself, thinking in parallel, and making frequent, small, reversible changes.",
   "Exam questions usually ask which architecture is most resilient or easiest to scale, and the right answer is typically the one that is decoupled, spread across AZs and automated. 'Decouple components' or 'buffer requests between tiers' points to Amazon SQS. 'Fan out a message to multiple subscribers' points to Amazon SNS. 'Provision identical environments repeatedly' or 'infrastructure as code' points to AWS CloudFormation. 'Replace unhealthy instances automatically' points to Auto Scaling with health checks. 'Single point of failure' in the question means the current design violates designing for failure."
  ],
  "terms": [
   [
    "Loose coupling",
    "Designing components to interact through interfaces or buffers so a failure or slowdown in one does not break the others."
   ],
   [
    "Amazon SQS",
    "A managed message queue that stores messages until a consumer retrieves and processes them."
   ],
   [
    "Amazon SNS",
    "A managed publish and subscribe service that pushes messages to many subscribers at once."
   ],
   [
    "Design for failure",
    "Assuming components will fail and building in redundancy and automatic recovery."
   ],
   [
    "Disposable resources",
    "Treating servers as replaceable units that are terminated and relaunched instead of repaired by hand."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining infrastructure in version-controlled template or code files that can be deployed repeatedly."
   ],
   [
    "AWS CloudFormation",
    "An AWS service that creates and manages resources from JSON or YAML templates as stacks."
   ]
  ],
  "example": "A payments start-up built its staging environment by hand, and it never quite matched production, so bugs slipped through. It rewrote both environments as CloudFormation templates stored in Git. Now every change is reviewed as a code change, staging and production are created from the same template, and a broken environment can be deleted and recreated in minutes instead of being patched by hand.",
  "tip": "Decouple tiers or absorb spikes between them with Amazon SQS; provision identical environments repeatedly with AWS CloudFormation. Do not confuse SQS (queue, consumers pull) with SNS (push to many subscribers).",
  "check": [
   [
    "A web tier fails whenever the processing tier slows down. Which principle is missing, and what service helps?",
    "Loose coupling; placing an Amazon SQS queue between the tiers lets each side work and scale independently."
   ],
   [
    "What does treating servers as disposable resources mean?",
    "Replacing a misbehaving server with a fresh one launched by automation instead of repairing it by hand."
   ],
   [
    "Which service lets you define infrastructure in templates and deploy it repeatedly?",
    "AWS CloudFormation, the main AWS infrastructure as code service."
   ],
   [
    "Name two design choices that follow 'design for failure'.",
    "Running across multiple Availability Zones and using health checks with Auto Scaling to replace failed instances automatically (also backups that are tested)."
   ]
  ]
 },
 {
  "t": "The AWS Well-Architected Tool and running a Well-Architected review",
  "body": [
   "The AWS Well-Architected Tool is a service in the AWS Management Console that helps you review a workload against the AWS Well-Architected Framework. It turns the framework's best practices into a structured questionnaire, records your answers and shows the risks that remain, so you can track improvement over time. The tool is available in the console at no additional charge, which makes it a good first hands-on exercise. You find it by searching for 'Well-Architected Tool' in the console.",
   "A review starts by defining a workload: a set of components that together deliver business value, such as an e-commerce application with its web servers, database and storage. In the console you choose Workloads > Define workload, then give it a name, a description, the environment (production or pre-production), the Regions or accounts it uses and optionally a review owner. You then choose the lenses to apply; the AWS Well-Architected Framework lens is applied by default.",
   "Next you answer questions pillar by pillar, for example 'How do you manage identities for people and machines?', 'How do you back up data?' or 'How do you monitor workload resources?'. For each question you tick the best practices you already follow, mark a question as not applicable if it truly is, and add notes. The tool is honest only if your answers are, so reviews work best when the people who build and run the workload answer together. A full review of all six pillars can take several hours, so many teams split it across sessions, starting with the pillars they consider riskiest, and record who answered each section so follow-up questions go to the right person.",
   "Based on your answers, the tool identifies high-risk issues (HRIs) and medium-risk issues (MRIs) and links each one to improvement guidance. The result is an improvement plan: a prioritized list of changes that would bring the workload closer to best practice. You can save a milestone, a snapshot of the review at a point in time, and later compare new answers against it to show progress. Reports can be generated as PDF files to share with stakeholders, and the same data is available through the API, for example with `aws wellarchitected list-workloads`.",
   "The framework also offers lenses, which add questions for a particular technology or industry, such as the Serverless Lens or the SaaS Lens, and organizations can write custom lenses for their own internal standards. You can share a workload or a custom lens with other AWS accounts or users so several teams can work on the same review. A Well-Architected review is not an audit and does not change any resources. It is a structured conversation, often run by the workload team, sometimes with help from an AWS Solutions Architect or an AWS Partner, aimed at finding risks early rather than assigning blame.",
   "Consider a worked example. A retail team defines its checkout service as a workload and answers the questions. The tool flags an HRI under reliability because backups have never been restored as a test, and another under security because developers share one administrator login. The team saves a milestone, fixes both issues over two sprints by scheduling restore tests and moving people to individual single sign-on access, then answers the questions again. Comparing with the milestone shows the HRIs resolved, and the PDF report goes to the engineering director.",
   "Common mistakes: expecting the Well-Architected Tool to scan your account automatically (it records answers people give; it does not inspect resources); confusing it with AWS Trusted Advisor, which automatically checks your actual resources for cost, security, performance, fault tolerance and service quota issues; confusing it with AWS Config, which records resource configurations and evaluates them against rules; and believing a review is a one-time event. Workloads change, so teams repeat reviews regularly and after major changes.",
   "Exam questions tend to say 'review its architecture against AWS best practices', 'identify high-risk issues in a workload' or 'measure architecture improvements over time'; all three point to the AWS Well-Architected Tool. 'Automated recommendations about idle resources or open security groups in the account' is Trusted Advisor. 'Track configuration changes and compliance with rules' is AWS Config. 'Additional questions for serverless applications' means a lens, and 'a saved snapshot of a review' is a milestone."
  ],
  "terms": [
   [
    "AWS Well-Architected Tool",
    "A console service that reviews a workload against the Well-Architected Framework through a questionnaire."
   ],
   [
    "High-risk issue (HRI)",
    "A finding in a review where missing best practices could significantly harm the workload."
   ],
   [
    "Improvement plan",
    "A prioritized list of recommended changes produced from a Well-Architected review."
   ],
   [
    "Milestone",
    "A saved snapshot of a workload review used to compare progress over time."
   ],
   [
    "Lens",
    "An extension that adds best practices and questions for a specific technology, industry or internal standard."
   ],
   [
    "AWS Trusted Advisor",
    "A service that automatically inspects account resources and recommends improvements."
   ]
  ],
  "example": "Before a major product launch, an insurance company's platform team runs a Well-Architected review of its quoting service with an AWS Partner. The tool reports seven high-risk issues, mostly around untested recovery and broad permissions. The team saves a milestone, works through the improvement plan over a quarter, and shows leadership a second report with the high-risk count reduced to one, which they accept with a documented reason.",
  "tip": "The Well-Architected Tool reviews a workload's design from your answers; Trusted Advisor inspects your real account resources automatically; AWS Config tracks resource configurations against rules.",
  "check": [
   [
    "What does the AWS Well-Architected Tool produce after you answer its questions?",
    "A list of high-risk and medium-risk issues with an improvement plan linked to guidance."
   ],
   [
    "What is a milestone in the Well-Architected Tool?",
    "A saved snapshot of a review that you can compare later answers against to show progress."
   ],
   [
    "Does the Well-Architected Tool change or scan your resources?",
    "No. It records answers from the team; it does not inspect or modify resources."
   ],
   [
    "A company wants additional review questions specific to serverless applications. What should it use?",
    "A lens, such as the Serverless Lens, applied to the workload in the Well-Architected Tool."
   ]
  ]
 },
 {
  "t": "AWS Cloud Adoption Framework (AWS CAF): the six perspectives and the business benefits of adoption",
  "body": [
   "Moving to the cloud is as much an organizational change as a technical one. People need new skills, finance needs new ways to budget, and security teams need new controls. The AWS Cloud Adoption Framework (AWS CAF) collects AWS's guidance for planning and carrying out that change. It groups the capabilities an organization needs into six perspectives, each associated with the stakeholders who usually own them. The exam asks you to match a concern or a stakeholder to the right perspective and to recognize the business benefits of adoption.",
   "Three perspectives are business-focused. The Business perspective makes sure cloud investments accelerate business outcomes and support the digital strategy; stakeholders include the chief executive officer (CEO), chief financial officer (CFO) and chief strategy officer. The People perspective bridges technology and business, covering culture, organizational structure, leadership, training and workforce transformation; its stakeholders include human resources (HR) and people leaders. The Governance perspective helps orchestrate cloud initiatives while maximizing benefits and minimizing risk, covering program and portfolio management, benefits management, risk management, cloud financial management and data governance; stakeholders include the chief information officer (CIO), program managers and enterprise architects.",
   "Three perspectives are technical. The Platform perspective helps build an enterprise-grade, scalable hybrid cloud platform, modernize existing workloads and implement new cloud-native solutions; stakeholders include the chief technology officer (CTO), architects and engineers. The Security perspective covers the confidentiality, integrity and availability of data and workloads, including identity and access management, threat detection, infrastructure protection, data protection and incident response; stakeholders include the chief information security officer (CISO) and security engineers. The Operations perspective makes sure cloud services are delivered at a level that meets business needs, covering observability, event and incident management, change and release management, and patch management; stakeholders include IT operations and site reliability teams.",
   "The CAF links these capabilities to four transformation domains (technology, process, organization and product) and to business outcomes. The outcomes it describes are reduced business risk, improved environmental, social and governance (ESG) performance, increased revenue and increased operational efficiency. It also describes an iterative cloud transformation journey in four phases: envision (identify and prioritize transformation opportunities), align (identify capability gaps and cross-organizational dependencies), launch (deliver pilot initiatives in production that show value) and scale (expand successful pilots to the desired scale and keep realizing benefits).",
   "The distinctions that trip people up are Governance versus Operations and Platform versus Operations. Governance manages the program: which projects run, what they cost, what risks are accepted and who owns the data. Operations keeps running services healthy day to day: monitoring, alerting, incidents, changes and patches. Platform designs and builds the cloud environment and architectures; Operations runs them once they exist. Security is its own perspective, even though security work touches all the others. A practical way to decide is to ask who would own the task in your company: if it is a finance or program office, think Governance; if it is the on-call team, think Operations; if it is the architecture group, think Platform.",
   "Consider a worked example. A manufacturer plans its move to AWS. The CFO wants a clear business case and wants cloud spending tied to outcomes (Business). HR plans training because most engineers have only on-premises experience (People). The CIO sets up a cloud program office to prioritize projects and track spending against budget (Governance). Architects design a multi-account landing zone (Platform). The CISO defines identity federation and logging standards (Security). The operations team builds dashboards and an incident runbook for the new environment (Operations).",
   "Common mistakes: confusing the CAF with the Well-Architected Framework (the CAF is about organizational adoption; Well-Architected is about workload design); listing 'Architecture' or 'Finance' as perspectives when the actual names are Business, People, Governance, Platform, Security and Operations; putting training under Business rather than People; and putting cloud financial management under Business when the CAF places it in Governance. Also remember that the journey phases are envision, align, launch and scale, not plan, build, run.",
   "Exam wording follows the stakeholders and capabilities. 'Staff skills, training, culture or organizational change' is People. 'Budget, cost management, risk or portfolio of projects' is Governance. 'Business strategy, business case or aligning investments with outcomes' is Business. 'Designing the cloud environment or modernizing workloads' is Platform. 'Identity, threat detection or data protection' is Security. 'Monitoring, incident management or patching' is Operations. 'Deliver pilot projects' is the launch phase, and 'expand pilots to production' is scale."
  ],
  "terms": [
   [
    "AWS Cloud Adoption Framework (AWS CAF)",
    "AWS guidance that organizes the capabilities needed for cloud adoption into six perspectives."
   ],
   [
    "Business perspective",
    "Ensures cloud investments accelerate business outcomes and digital strategy."
   ],
   [
    "People perspective",
    "Covers culture, organizational structure, leadership and workforce skills for the cloud."
   ],
   [
    "Governance perspective",
    "Orchestrates cloud initiatives and manages benefits, risk, portfolio and cloud financial management."
   ],
   [
    "Platform perspective",
    "Builds a scalable hybrid cloud platform and modernizes or builds cloud-native workloads."
   ],
   [
    "Operations perspective",
    "Delivers cloud services at agreed levels through observability, incident, change and patch management."
   ],
   [
    "Envision, align, launch, scale",
    "The four phases of the iterative cloud transformation journey described by the AWS CAF."
   ]
  ],
  "example": "A hospital group stalled halfway through its cloud move because clinicians' IT staff had never worked with AWS and there was no owner for cloud spending. Using the CAF, it set up a training program and new team structures (People), created a cloud program office that approves projects and reviews monthly costs (Governance), and ran a pilot moving its appointment system first (launch) before scaling to other systems.",
  "tip": "Governance manages the program, risk and money; Operations runs services day to day (monitoring, incidents, patching). Training and culture belong to People.",
  "check": [
   [
    "Which CAF perspective covers staff training and organizational culture?",
    "The People perspective."
   ],
   [
    "A CFO wants cloud spending tracked and risk managed across a portfolio of projects. Which perspective?",
    "Governance, which includes program and portfolio management, risk management and cloud financial management."
   ],
   [
    "What are the four phases of the CAF cloud transformation journey?",
    "Envision, align, launch and scale."
   ],
   [
    "Which perspective includes incident management and patching?",
    "Operations, which keeps cloud services running at the level the business needs."
   ]
  ]
 },
 {
  "t": "Migration strategies (the 7 Rs): rehost, replatform, refactor, repurchase, retire, retain and relocate",
  "body": [
   "When an organization moves its applications to AWS, it rarely treats them all the same way. Some are moved as they are, some are improved on the way, and some are switched off. AWS describes seven common migration strategies, known as the 7 Rs. During migration planning, each application in the portfolio is assigned one of them based on its business value, technical complexity, licensing and the time available. The exam gives you a scenario and asks which strategy it describes.",
   "Rehost, often called lift and shift, moves an application to AWS without changing it, for example copying a server as-is onto Amazon Elastic Compute Cloud (Amazon EC2). It is fast, lets you migrate large numbers of servers quickly and can often be automated with AWS Application Migration Service. You can optimize later once the servers are running in the cloud. Replatform, sometimes called lift, tinker and shift, makes a few cloud optimizations without changing the core architecture. Moving a self-managed database to Amazon Relational Database Service (Amazon RDS) so AWS handles patching and backups is the classic example.",
   "Refactor, also called re-architect, reimagines how the application is built, typically using cloud-native features such as serverless functions, containers, managed queues or purpose-built databases. It takes the most time and effort but can bring the most benefit in scalability, agility and cost, and it is usually driven by a strong business need the current architecture cannot meet. Repurchase, sometimes called drop and shop, means moving to a different product, usually replacing a self-hosted application with a software as a service (SaaS) offering, such as dropping an on-premises customer relationship management (CRM) system for a SaaS one.",
   "Retire means decommissioning applications that are no longer useful; portfolio discovery often finds a surprising number of servers nobody uses, and turning them off saves money immediately. Retain, sometimes called revisit, means keeping an application where it is for now, perhaps because it was recently upgraded, depends on hardware or licenses that cannot move, has compliance constraints, or simply is not worth migrating yet. Relocate means moving infrastructure to the cloud without buying new hardware, rewriting applications or changing operations, for example moving VMware vSphere-based workloads to VMware Cloud on AWS.",
   "The key distinctions are about how much the application changes. Rehost changes nothing about the application. Relocate moves an entire virtualization platform with it, again without changing the applications. Replatform changes a component or two, such as the database hosting or the operating system, while the architecture stays the same. Refactor changes the architecture itself. Repurchase replaces the application with a different product. Retire and retain do not migrate the application at all. Effort and potential benefit generally rise from rehost toward refactor. That is why many organizations rehost first to meet a deadline, then replatform or refactor the most valuable applications once they are running in AWS, an approach sometimes described as migrate first, then modernize.",
   "Consider a worked example. A company assesses 300 servers. Forty turn out to be unused and are switched off (retire). Its email and HR systems are replaced with SaaS products (repurchase). A mainframe billing system stays in the data center until a separate project replaces it (retain). Two hundred application servers are copied to EC2 with Application Migration Service to meet a data center exit deadline (rehost). The main customer database moves to Amazon RDS (replatform). The order system, which struggles at peak, is rebuilt with containers, AWS Lambda and Amazon DynamoDB (refactor).",
   "Common mistakes: calling a move to RDS a refactor when the application itself is unchanged (it is replatform); calling a SaaS switch a rehost; confusing retain (keep it for now) with retire (turn it off); and confusing relocate with rehost. Relocate moves at the hypervisor level, keeping the same virtualization platform and operations, while rehost moves individual servers onto EC2. Also note that older AWS material described six Rs; relocate is the seventh and is on the current exam.",
   "Exam questions hinge on key phrases. 'No code changes, as quickly as possible' or 'lift and shift' is rehost. 'Minor optimizations such as moving to a managed database' is replatform. 'Rebuild using cloud-native services' or 'break a monolith into microservices' is refactor. 'Switch to a SaaS product' is repurchase. 'Decommission' or 'turn it off' is retire. 'Keep on premises for now' is retain. 'Move VMware workloads without changing operations' is relocate."
  ],
  "terms": [
   [
    "Rehost (lift and shift)",
    "Moving an application to AWS without changes, typically onto Amazon EC2."
   ],
   [
    "Replatform (lift, tinker and shift)",
    "Moving with a few cloud optimizations, such as a managed database, while keeping the core architecture."
   ],
   [
    "Refactor (re-architect)",
    "Redesigning an application to use cloud-native features such as serverless or containers."
   ],
   [
    "Repurchase (drop and shop)",
    "Replacing an application with a different product, usually a SaaS offering."
   ],
   [
    "Retire",
    "Decommissioning an application that is no longer needed."
   ],
   [
    "Retain (revisit)",
    "Keeping an application in its current environment for now."
   ],
   [
    "Relocate",
    "Moving infrastructure, such as VMware-based workloads, to the cloud without changing applications or operations."
   ]
  ],
  "example": "A logistics firm must leave its leased data center within nine months. It rehosts most application servers to EC2 to meet the deadline, replatforms its PostgreSQL databases onto Amazon RDS, retires a dozen unused reporting servers, and keeps a warehouse control system that depends on local hardware on premises (retain). A year later, with the deadline behind it, it refactors its tracking service into serverless functions to handle holiday peaks.",
  "tip": "Moving a database onto Amazon RDS without redesigning the application is replatform; rewriting a monolith into microservices or serverless functions is refactor. Retain keeps an application; retire removes it.",
  "check": [
   [
    "An application is moved to EC2 with no code changes to meet a deadline. Which strategy?",
    "Rehost, also called lift and shift."
   ],
   [
    "A company replaces its on-premises CRM with a SaaS product. Which strategy?",
    "Repurchase, moving to a different product."
   ],
   [
    "What distinguishes replatform from refactor?",
    "Replatform makes a few optimizations such as a managed database without changing the architecture; refactor redesigns the application using cloud-native features."
   ],
   [
    "Which strategy moves VMware-based workloads to AWS without changing applications or operations?",
    "Relocate, for example to VMware Cloud on AWS."
   ]
  ]
 },
 {
  "t": "Migration tools: AWS Application Migration Service, AWS DMS with the Schema Conversion Tool, and AWS DataSync",
  "body": [
   "Once you have decided how each application will move (the 7 Rs), you need tools to actually move it. AWS offers dedicated services for the three things most migrations carry: whole servers, databases and files. The exam expects you to pick the right one from a short description of what is being moved, so the most important skill here is matching the payload to the service.",
   "AWS Application Migration Service (often shortened to AWS MGN) is the primary AWS service for rehosting (lift and shift). You install a replication agent on each source server, which can be physical, virtual or running in another cloud. The service continuously replicates the servers' disks at the block level to a low-cost staging area in your AWS account, so the source keeps running normally. At any time you can launch test instances from the replicated data without disrupting the source. When testing passes, you perform a cutover: replication catches up, you stop the application on the source, and the servers are launched as Amazon Elastic Compute Cloud (Amazon EC2) instances. Continuous replication keeps that cutover window short, often minutes.",
   "AWS Database Migration Service (AWS DMS) migrates databases to AWS. You create a replication instance, define source and target endpoints, and run a migration task that performs a full load and can then keep applying ongoing changes, known as change data capture (CDC), until you switch applications to the target. The source database remains fully operational during the migration, which minimizes downtime. DMS supports homogeneous migrations, where source and target use the same engine (for example Oracle to Oracle on Amazon RDS), and heterogeneous migrations, where they differ (for example Oracle to Amazon Aurora PostgreSQL).",
   "For heterogeneous migrations, the schema, meaning tables, views, stored procedures, functions and other code objects, must first be converted to the target engine's dialect. That is the job of the AWS Schema Conversion Tool (AWS SCT), a downloadable application that also produces an assessment report of what converts automatically and what needs manual work. DMS now also offers built-in schema conversion in the console. The division of labor is simple: SCT (or DMS Schema Conversion) converts the structure, and DMS moves the data.",
   "AWS DataSync is an online data transfer service for files and objects. You deploy a DataSync agent near your on-premises storage, create locations for the source (such as a Network File System (NFS) or Server Message Block (SMB) share) and the destination (such as Amazon S3, Amazon Elastic File System (Amazon EFS) or Amazon FSx), then create and run a task. DataSync handles scheduling, encryption in transit, data integrity verification and incremental transfers, so it suits both one-time migrations and recurring synchronization of large file sets. It can also copy between AWS storage services. For datasets too large to send over the network in time, AWS offers offline transfer devices in the AWS Snow Family, such as AWS Snowball Edge, which you load locally and ship back to AWS.",
   "Consider a worked example. A company is leaving its data center. Its 120 Windows and Linux application servers are replicated with Application Migration Service and cut over in waves over several weekends. Its on-premises Microsoft SQL Server database moves to Amazon RDS for SQL Server with DMS, a homogeneous migration that needs no schema conversion. A separate Oracle reporting database is being moved to Aurora PostgreSQL, so the team first runs SCT to convert the schema and review the assessment report, then uses DMS with ongoing replication. Finally, 40 terabytes of scanned documents on an SMB file share are copied to Amazon S3 with DataSync, running nightly until the final cutover.",
   "Common mistakes: choosing DMS to move files or DataSync to move a live database; forgetting SCT when the engines differ; thinking DMS requires the source database to be taken offline for the whole migration (it stays online, and CDC keeps the target in sync); and picking AWS Server Migration Service or other older names, when AWS now points customers to Application Migration Service for rehosting. Also remember that AWS Migration Hub provides a single place to track the progress of migrations across these tools, and AWS Application Discovery Service collects data about on-premises servers to help plan them.",
   "Exam questions usually name the payload and a constraint. 'Lift and shift servers with minimal downtime' or 'replicate physical or virtual servers to EC2' is AWS Application Migration Service. 'Migrate a database while it stays operational' is AWS DMS. 'Source and target database engines differ' or 'convert stored procedures' adds the AWS Schema Conversion Tool. 'Move or synchronize file shares to Amazon S3, EFS or FSx over the network' is AWS DataSync. 'Petabytes with limited bandwidth' points to an offline Snow Family device."
  ],
  "terms": [
   [
    "AWS Application Migration Service (AWS MGN)",
    "The primary AWS rehosting service that continuously replicates source servers and launches them as EC2 instances at cutover."
   ],
   [
    "Cutover",
    "The final switch from the source system to the migrated system in AWS."
   ],
   [
    "AWS Database Migration Service (AWS DMS)",
    "A service that migrates data between databases while the source stays operational."
   ],
   [
    "Change data capture (CDC)",
    "Continuously replicating ongoing changes from the source database to the target after the initial load."
   ],
   [
    "AWS Schema Conversion Tool (AWS SCT)",
    "A tool that converts database schema and code objects from one engine to another for heterogeneous migrations."
   ],
   [
    "Heterogeneous migration",
    "A database migration between different engines, such as Oracle to Aurora PostgreSQL."
   ],
   [
    "AWS DataSync",
    "An online service that moves and synchronizes files and objects between on-premises storage and AWS storage services."
   ]
  ],
  "example": "A research lab moves its analysis servers to EC2 with Application Migration Service, launching test copies weeks before cutover to check that software licenses and network paths work. Its MySQL database moves to Amazon Aurora MySQL with DMS using ongoing replication, so the cutover takes only a few minutes of downtime. Years of instrument data on an NFS share are copied to Amazon S3 with a nightly DataSync task until the lab switches over.",
  "tip": "Servers go with Application Migration Service, databases with DMS (plus SCT when engines differ), and file shares with DataSync. DMS moves data; SCT converts the schema.",
  "check": [
   [
    "Which service is the primary AWS tool for lift-and-shift migration of servers?",
    "AWS Application Migration Service, which replicates servers continuously and launches them as EC2 instances at cutover."
   ],
   [
    "A company migrates from Oracle to Aurora PostgreSQL. Which two tools does it need?",
    "The AWS Schema Conversion Tool (or DMS Schema Conversion) to convert the schema, and AWS DMS to move the data."
   ],
   [
    "Does the source database have to be offline during a DMS migration?",
    "No. It remains operational, and change data capture keeps the target in sync until cutover."
   ],
   [
    "Which service should copy an on-premises SMB file share to Amazon S3 on a schedule?",
    "AWS DataSync, which transfers and synchronizes files over the network."
   ]
  ]
 },
 {
  "t": "Cloud economics: fixed vs variable costs, total cost of ownership and the costs that move to AWS",
  "body": [
   "Cloud economics is about understanding what running IT really costs and how that changes when you move to AWS. The exam focuses on a few ideas: the shift from fixed to variable costs, total cost of ownership, the difference between direct and indirect costs, and which costs you stop paying and which you still carry. These are the arguments a business case for migration is built on.",
   "On premises, most IT costs are fixed. You buy servers, storage, network gear and data center space up front or on long contracts, and you pay for them whether they are busy or idle. Capacity is usually sized for the peak plus a safety margin, so much of it sits unused most of the time. In AWS, most costs are variable: they rise and fall with usage. That improves cash flow and removes the penalty for over-provisioning, although it also means an unmonitored account can grow expensive, which is why cost tools such as AWS Budgets and AWS Cost Explorer matter from day one.",
   "Total cost of ownership (TCO) is the full cost of owning and running a system over its life, not just the purchase price. For an on-premises server that includes the hardware, software licenses, data center space, power and cooling, network connectivity, physical security, hardware maintenance contracts, and the staff time to rack, patch and replace equipment. A fair comparison with AWS weighs all of these against the AWS bill plus whatever work remains on your side. Many on-premises costs are hidden in other budgets, like the power bill paid by facilities, so TCO analyses often surprise people.",
   "When you move to AWS, several cost categories largely move to AWS: buying and refreshing physical hardware, data center real estate, power and cooling, physical security and hardware maintenance. You still pay for the services you use, and you still carry the cost of staff who design, secure, operate and optimize your workloads, application licenses you bring, and data transfer out of AWS. Managed services shift even more work to AWS: with Amazon Relational Database Service (Amazon RDS), AWS handles database patching and backups, which lowers your operational labor. AWS Migration Evaluator can build a data-driven business case from your actual on-premises utilization, and the AWS Pricing Calculator estimates the cost of a planned architecture.",
   "The exam also expects you to know the difference between direct costs and indirect costs. Direct costs are clearly attributable to a system: the price of a server, a license or an AWS service line on the bill. Indirect costs are real but harder to see: people's time, downtime, delays in delivering features and the opportunity cost of engineers doing maintenance instead of product work. Much of the cloud's financial value comes from reducing indirect costs, for example faster delivery of new features and fewer hardware-related outages.",
   "Consider a worked example. A company compares keeping 50 servers on premises for five years against running the same workloads in AWS. The on-premises side includes a hardware refresh, a colocation contract, power, a maintenance contract and a share of two administrators' time. The AWS side includes compute, storage, data transfer, a support plan and the same administrators, now spending time on automation instead of hardware. The TCO comparison favors AWS mainly because of rightsized instances, no hardware refresh and no colocation, while the administrators' salaries appear on both sides.",
   "Common mistakes: comparing only server purchase prices against the monthly AWS bill and ignoring power, space and staff; assuming all staff costs disappear in the cloud; forgetting data transfer and support charges when estimating AWS costs; and assuming 'variable' means 'always lower'. Idle or oversized resources in AWS still cost money every hour, so the savings depend on rightsizing, turning things off and using commitment discounts for steady workloads.",
   "Exam questions about 'costs that are eliminated or reduced when moving to AWS' want physical items: hardware purchases and refresh, data center space, power, cooling and physical security. 'Costs the customer still pays' include application development, staff who manage workloads, security configuration and software licenses they bring. 'Full lifetime cost including hidden costs' means total cost of ownership. 'Estimate the cost of a planned AWS architecture' points to the AWS Pricing Calculator, and 'build a business case from on-premises utilization' points to Migration Evaluator."
  ],
  "terms": [
   [
    "Fixed cost",
    "A cost paid regardless of usage, such as purchased servers or a data center lease."
   ],
   [
    "Variable cost",
    "A cost that changes with usage, such as hourly compute charges."
   ],
   [
    "Total cost of ownership (TCO)",
    "The full lifetime cost of owning and operating a system, including hidden costs such as power and staff time."
   ],
   [
    "Direct cost",
    "A cost clearly attributable to a system, such as a server purchase or a service charge."
   ],
   [
    "Indirect cost",
    "A real but less visible cost such as staff time, downtime or delayed delivery."
   ],
   [
    "AWS Pricing Calculator",
    "A tool for estimating the cost of a planned set of AWS services."
   ],
   [
    "AWS Migration Evaluator",
    "A service that analyzes on-premises utilization to build a data-driven business case for migrating to AWS."
   ]
  ],
  "example": "A retailer's IT director claims the cloud is more expensive because an EC2 instance costs more per year than a server's purchase price divided by five. A TCO analysis adds the colocation fee, power and cooling, hardware maintenance, the storage array refresh and the hours staff spend replacing parts. With those included and instances rightsized from real utilization data, the AWS option comes out lower, and the director's team can spend its time on the e-commerce platform instead of hardware.",
  "tip": "Costs that move to AWS are physical: hardware, data center space, power, cooling and physical security. Staff who build and run your workloads, application licenses and data transfer stay with you.",
  "check": [
   [
    "Name three costs that are largely eliminated when a workload moves from on premises to AWS.",
    "Hardware purchase and refresh, data center space, and power and cooling (also physical security and hardware maintenance)."
   ],
   [
    "What does total cost of ownership include beyond the purchase price?",
    "All lifetime costs, such as power, cooling, space, maintenance contracts, licenses and staff time."
   ],
   [
    "Is staff time spent managing applications a direct or indirect cost, and does it disappear in AWS?",
    "It is generally an indirect cost, and it does not disappear; the customer still operates and secures its workloads."
   ],
   [
    "Which tool estimates the monthly cost of a planned AWS architecture?",
    "The AWS Pricing Calculator."
   ]
  ]
 },
 {
  "t": "Licensing strategies (bring your own license vs license included) and rightsizing to cut waste",
  "body": [
   "Software licenses can be a big part of a cloud bill, especially for commercial operating systems and databases, and waste from oversized resources can be even bigger. This lesson covers the two broad licensing models AWS offers, the special case of licenses tied to physical hardware, and rightsizing, the continuous process of matching resources to what a workload actually needs. The exam expects you to know when each licensing model makes sense and which tools recommend rightsizing changes.",
   "With license included, the software license cost is built into the hourly price of the AWS resource. For example, you can launch an Amazon Elastic Compute Cloud (Amazon EC2) instance from a Windows Server Amazon Machine Image (AMI), or create an Amazon RDS for SQL Server database, and the license is part of what you pay AWS. You do not have to buy, track or true-up licenses yourself, and you stop paying for the license as soon as you stop using the resource. This model is simple and fits variable, short-lived or new workloads where you have no existing licenses.",
   "With bring your own license (BYOL), you use licenses you already own and pay AWS only for the infrastructure. This can save money if your organization has already invested in licenses, for example through an enterprise agreement with the software vendor. However, some licenses are counted per physical socket or per physical core, or require that software runs on hardware dedicated to you. That is why AWS offers Amazon EC2 Dedicated Hosts: physical servers fully dedicated to your use, with visibility into sockets and cores so you can meet those license terms. Always check the vendor's license terms before bringing a license to the cloud. AWS License Manager helps track license usage and enforce limits across accounts so you do not accidentally exceed what you own. Some license-included options also exist for software you might otherwise bring, so compare both prices over the expected life of the workload before deciding.",
   "Rightsizing is the process of matching instance types and sizes to the actual workload so you are not paying for capacity you do not use. Teams moving from on premises often choose instance sizes that mirror old hardware, which was usually oversized for peak demand. By looking at real utilization data, such as CPU, memory and network use collected by Amazon CloudWatch, you can move to a smaller size or a different instance family. AWS Compute Optimizer analyzes usage and recommends better instance types, Auto Scaling group settings, Amazon EBS volumes and Lambda memory sizes, and Cost Explorer offers rightsizing recommendations for EC2.",
   "```\n# Ask Compute Optimizer for EC2 recommendations\naws compute-optimizer get-ec2-instance-recommendations\n\n# Ask Cost Explorer for rightsizing recommendations\naws ce get-rightsizing-recommendation --service AmazonEC2\n```",
   "Consider a worked example. A company migrates twenty SQL Server databases. It already owns SQL Server licenses covered by an agreement that allows use on dedicated hardware, so for its large, steady production databases it uses BYOL on Dedicated Hosts and tracks usage in License Manager. For a handful of small, short-lived project databases it uses license-included Amazon RDS so it can create and delete them freely. After three months, Compute Optimizer shows most application servers averaging under 15 percent CPU, so the team moves them to smaller sizes and a newer instance generation.",
   "Common mistakes: assuming every license can be brought to the cloud (the vendor's terms decide, not AWS); confusing Dedicated Hosts, which give you a whole physical server with socket and core visibility, with Dedicated Instances, which run on single-tenant hardware but without that visibility or control over placement; treating rightsizing as a one-time task during migration when workloads and instance generations keep changing; and rightsizing on CPU alone when memory is the real constraint. Other ways to cut waste include stopping non-production resources outside working hours and deleting unattached EBS volumes and old snapshots.",
   "Exam wording is usually direct. 'Existing licenses tied to sockets or physical cores' or 'software that must run on dedicated physical servers' points to Dedicated Hosts with BYOL. 'Avoid managing licenses' or 'pay for the license by the hour' points to license-included instances. 'Track license usage and enforce limits' is AWS License Manager. 'Instances are consistently underutilized' or 'recommend optimal instance types based on usage' is rightsizing with AWS Compute Optimizer or Cost Explorer."
  ],
  "terms": [
   [
    "License included",
    "A model where the software license cost is built into the price of the AWS resource."
   ],
   [
    "Bring your own license (BYOL)",
    "Using licenses you already own on AWS and paying AWS only for infrastructure."
   ],
   [
    "Amazon EC2 Dedicated Host",
    "A physical server dedicated to one customer, with socket and core visibility for license compliance."
   ],
   [
    "AWS License Manager",
    "A service that tracks software license usage and enforces licensing rules across accounts."
   ],
   [
    "Rightsizing",
    "Matching instance types and sizes to actual workload needs to eliminate paid but unused capacity."
   ],
   [
    "AWS Compute Optimizer",
    "A service that analyzes utilization and recommends better-sized compute resources."
   ]
  ],
  "example": "An engineering firm moved its CAD license servers to AWS and assumed it could reuse its perpetual licenses anywhere. The vendor's terms required dedicated physical hardware counted by cores, so the firm placed those servers on an EC2 Dedicated Host and recorded the rules in License Manager. For its general Windows file servers it chose license-included instances, then used Compute Optimizer data to shrink them by two sizes after a month of monitoring.",
  "tip": "Licenses bound to sockets or physical cores point to Dedicated Hosts with BYOL; avoiding license management points to license included. Rightsizing recommendations come from Compute Optimizer and Cost Explorer.",
  "check": [
   [
    "When is license included usually the better choice?",
    "When you have no existing licenses or the workload is short-lived or variable, because you pay only while the resource runs and have nothing to track."
   ],
   [
    "Why might a company need an EC2 Dedicated Host for BYOL?",
    "Because some licenses are counted per physical socket or core or require dedicated hardware, and Dedicated Hosts provide that visibility and control."
   ],
   [
    "Which service recommends smaller or different instance types based on actual utilization?",
    "AWS Compute Optimizer (Cost Explorer also provides EC2 rightsizing recommendations)."
   ],
   [
    "Why is rightsizing a continuous process?",
    "Workloads change and new instance generations appear, so the best size and type change over time."
   ]
  ]
 },
 {
  "t": "The AWS shared responsibility model: security of the cloud vs security in the cloud",
  "body": [
   "Security in AWS is a shared job. The AWS shared responsibility model spells out which parts AWS takes care of and which parts remain yours. It is one of the most tested ideas on the Cloud Practitioner exam, and almost every security question becomes easier once you have it straight. The short version AWS uses is that AWS is responsible for security of the cloud, and the customer is responsible for security in the cloud.",
   "AWS is responsible for security of the cloud. That means protecting the infrastructure that runs all AWS services: the physical data centers with their guards, access controls and environmental protections; the hardware, including secure disposal of failed storage devices; the global network; and the virtualization layer (the hypervisor) that separates customers' instances from each other. AWS also operates and patches the software of its managed services. You cannot visit an AWS data center, and you do not need to worry about someone stealing a disk from a rack; that is AWS's job.",
   "You, the customer, are responsible for security in the cloud. That covers what you put in AWS and how you configure it: your data and whether it is encrypted, AWS Identity and Access Management (IAM), meaning who can do what, the guest operating systems and applications on your Amazon EC2 instances including their patches, network settings such as security groups and network access control lists (network ACLs), and client-side and server-side encryption choices. If you leave an Amazon S3 bucket open to the public or grant an IAM user administrator access it does not need, that is a customer configuration problem, not an AWS failure.",
   "Some controls are shared, with each party handling its own layer. Patch management is shared: AWS patches the infrastructure and managed services, and you patch your guest operating systems and applications. Configuration management is shared: AWS configures its infrastructure devices, and you configure your guest operating systems, databases and applications. Awareness and training is shared: AWS trains its employees, and you train yours. Controls that are fully AWS's are called inherited controls, because you inherit them from AWS, for example the physical and environmental controls you can point auditors to in AWS's compliance reports.",
   "A simple way to place any item: if you can see it in the console or API and choose its settings, you are probably responsible for it. If it is physical, or below the hypervisor, it belongs to AWS. The line moves with the type of service, which the next lesson covers in detail. With infrastructure services such as EC2 you manage more; with managed and serverless services AWS manages more. But customer data, identities and access permissions are always the customer's responsibility, whatever the service.",
   "Consider a worked example. A company's customer records leak from an S3 bucket. The investigation finds that a developer attached a bucket policy allowing public read access for a quick test and never removed it. Although the data was stored on AWS infrastructure, AWS was not at fault: the storage, hardware and network worked as designed, and the bucket was configured to be public by the customer. The fix is on the customer side: turn on S3 Block Public Access at the account level, review policies with IAM Access Analyzer and alert on policy changes.",
   "Common mistakes: believing that because a service is managed, the customer has no security duties; assuming AWS patches the operating system on your EC2 instances; assuming AWS is responsible for encrypting your data by default in every case (many services now encrypt by default, but choosing, configuring and controlling access to encryption remains your responsibility); and thinking AWS will fix an insecure configuration on your behalf. AWS offers tools that warn you, such as AWS Trusted Advisor and AWS Security Hub, but acting on them is your job.",
   "Exam questions typically list a task and ask who owns it. 'Physical security of data centers', 'hardware disposal', 'the hypervisor' or 'the global network infrastructure' is AWS. 'Patching the guest operating system on EC2', 'configuring security groups', 'managing IAM users and permissions', 'encrypting customer data' or 'classifying data' is the customer. 'Patch management' or 'configuration management' in general is shared. 'Security of the cloud' means AWS; 'security in the cloud' means the customer."
  ],
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between AWS (security of the cloud) and the customer (security in the cloud)."
   ],
   [
    "Security of the cloud",
    "AWS's responsibility for the physical facilities, hardware, network and virtualization layer that run AWS services."
   ],
   [
    "Security in the cloud",
    "The customer's responsibility for data, identities, configurations, guest operating systems and applications."
   ],
   [
    "Hypervisor",
    "The virtualization layer that isolates instances on shared hardware; AWS secures it."
   ],
   [
    "Shared control",
    "A control where AWS and the customer each handle their own layer, such as patch or configuration management."
   ],
   [
    "Inherited control",
    "A control fully provided by AWS that the customer inherits, such as physical and environmental security."
   ]
  ],
  "example": "An auditor asks a fintech company how it protects its servers against physical theft. The company downloads AWS's third-party audit reports to show that data center physical security is AWS's responsibility and is independently audited. For the controls in its own scope, it shows its IAM policies, encryption settings, patching records for its EC2 operating systems and security group rules, because those are security in the cloud.",
  "tip": "Customer data, IAM permissions, security group rules and guest operating system patching are always the customer's job. Physical security, hardware disposal, the global network and the hypervisor are always AWS's.",
  "check": [
   [
    "Who is responsible for patching the guest operating system on an EC2 instance?",
    "The customer, because the guest OS is part of security in the cloud."
   ],
   [
    "Who is responsible for the physical security of AWS data centers?",
    "AWS, as part of security of the cloud."
   ],
   [
    "Give an example of a shared control.",
    "Patch management: AWS patches its infrastructure and managed services, while the customer patches its guest operating systems and applications (configuration management and training are also shared)."
   ],
   [
    "A customer's S3 bucket is accidentally made public. Whose responsibility was the misconfiguration?",
    "The customer's, because configuring access to its own data is security in the cloud."
   ]
  ]
 },
 {
  "t": "How responsibilities shift across Amazon EC2, Amazon RDS, AWS Lambda and Amazon S3",
  "body": [
   "The shared responsibility model is not one fixed line. The more AWS manages for you, the more responsibility moves to AWS and the less remains with you. Comparing four common services makes the shift clear, and the exam often asks 'who does what' for exactly these: Amazon Elastic Compute Cloud (Amazon EC2), Amazon Relational Database Service (Amazon RDS), AWS Lambda and Amazon Simple Storage Service (Amazon S3).",
   "Amazon EC2 is infrastructure as a service (IaaS). AWS secures the physical host, the network and the hypervisor. You are responsible for almost everything above that: choosing and patching the guest operating system, installing and updating applications, configuring any host-based firewall and your security groups, managing AWS Identity and Access Management (IAM) permissions and key pairs, and protecting, encrypting and backing up your data. EC2 gives you the most control and therefore the most responsibility. AWS Systems Manager Patch Manager can automate operating system patching, but deciding to use it and configuring it is still your job.",
   "Amazon RDS is a managed database service. AWS takes on the database host's operating system, installing the database engine, applying engine and OS patches during a maintenance window you choose, running automated backups and handling Multi-AZ failover when you enable it. You still manage who can connect (security groups, database users and IAM database authentication where supported), whether storage is encrypted, which parameter settings and backup retention period you choose, whether the instance is publicly accessible, and the data and queries themselves. You cannot log in to the operating system of a standard RDS instance, which is a clue that the OS is AWS's job.",
   "AWS Lambda is serverless compute. You upload your function code and AWS runs it when an event arrives, so AWS handles the servers, operating system, runtime patching for managed runtimes, scaling and availability across Availability Zones. Your responsibility shrinks to your function code and its third-party dependencies, the IAM execution role and its permissions, configuration such as environment variables and network access, secrets handling, and the data your code processes. If your code includes a vulnerable library, patching that library is your responsibility, not AWS's.",
   "Amazon S3 is an abstracted storage service. AWS manages the storage infrastructure, durability and availability. You are responsible for your objects and their classification, bucket policies and access control, S3 Block Public Access settings, encryption choices beyond the default, versioning, Object Lock and lifecycle rules, and logging of access. A quick way to check one of your settings from the command line is `aws s3api get-public-access-block --bucket my-bucket`, which shows whether public access is blocked for that bucket. The pattern across all four is a sliding line. From EC2 to RDS to Lambda and S3, AWS owns more layers: first the hardware, then the operating system and database engine, then the runtime and scaling. What never moves is at the top of the stack: your data, your identities and permissions, and your configuration choices. A useful habit is to draw the stack for any service, from facilities at the bottom to data at the top, and mark where AWS stops.",
   "Consider a worked example. A team runs its website on EC2 with a MySQL database on the same instance. A security review finds the OS unpatched for months and backups untested. The team moves the database to RDS so AWS patches the engine and runs automated backups, and moves image processing to Lambda so there is no server to patch. Their remaining duties are IAM roles, security group rules, encryption settings, their code and their data.",
   "Common mistakes: assuming AWS patches the guest OS on EC2 because AWS 'owns the server'; assuming RDS means you no longer control network access or encryption; assuming Lambda removes all security work, when function code, dependencies and the execution role are still yours; and assuming S3 buckets are secured by AWS automatically. S3 blocks public access by default for new buckets and encrypts new objects by default, but anyone with permission can change those settings, and managing them is your responsibility.",
   "Exam questions usually name a service and a task. 'Who patches the operating system of an EC2 instance?' is the customer. 'Who patches the database engine on RDS?' is AWS, within the maintenance window you set. 'Who manages the underlying servers for Lambda?' is AWS. 'Who configures S3 bucket policies or encryption?' is the customer. When the options include a data or access task for any service, the answer is the customer; when they include hardware, facilities or the hypervisor, the answer is AWS."
  ],
  "terms": [
   [
    "Infrastructure as a service (IaaS)",
    "A model where the provider supplies virtual compute, storage and networking and the customer manages the operating system and above."
   ],
   [
    "Managed service",
    "A service where AWS operates the underlying infrastructure and software, such as the OS and database engine for Amazon RDS."
   ],
   [
    "Serverless",
    "A model such as AWS Lambda where AWS manages servers, runtime and scaling and you provide code and configuration."
   ],
   [
    "Maintenance window",
    "A weekly time period you choose during which AWS applies patches to managed resources such as RDS instances."
   ],
   [
    "Execution role",
    "The IAM role a Lambda function assumes to get permissions to other AWS services."
   ],
   [
    "S3 Block Public Access",
    "Account- and bucket-level settings that prevent S3 data from being made public, which the customer controls."
   ]
  ],
  "example": "A startup is asked by an investor who is responsible for patching. For its EC2 application servers, the startup patches the OS with Systems Manager Patch Manager every week. For its Amazon RDS for PostgreSQL database, AWS patches the engine during a Sunday maintenance window the startup chose. For its Lambda functions, AWS handles the runtime while the startup scans and updates its code dependencies. For S3, the startup owns bucket policies and Block Public Access settings.",
  "tip": "The operating system is the key signal: on EC2 you patch it; on RDS and Lambda AWS does. In every service, you configure access and protect your data.",
  "check": [
   [
    "On Amazon RDS, who patches the database engine?",
    "AWS, during the maintenance window the customer selects."
   ],
   [
    "On AWS Lambda, what security responsibilities remain with the customer?",
    "The function code and its dependencies, the IAM execution role and its permissions, configuration, and the data the function processes."
   ],
   [
    "Which of EC2, RDS, Lambda and S3 leaves the customer the most responsibility, and why?",
    "EC2, because it is infrastructure as a service and the customer manages the guest OS, applications and network configuration."
   ],
   [
    "Who is responsible for the S3 bucket policy on a bucket holding customer data?",
    "The customer, because access configuration and data protection are always customer responsibilities."
   ]
  ]
 },
 {
  "t": "Compliance and governance: AWS Artifact, AWS Audit Manager, AWS Config and where to find compliance information",
  "body": [
   "Regulated organizations must prove that their systems meet standards such as the Payment Card Industry Data Security Standard (PCI DSS) for card payments, the Health Insurance Portability and Accountability Act (HIPAA) for United States health data, or ISO/IEC 27001 for information security management. In the cloud, compliance is shared just like security: AWS proves its infrastructure meets these standards, and you prove your own workloads do. Several AWS services help with each side, and the exam tests which one fits which need.",
   "AWS Artifact is the self-service portal in the AWS Management Console for AWS's own compliance documents, available at no cost. It has two parts. Artifact Reports gives you on-demand access to AWS security and compliance reports produced by third-party auditors, such as System and Organization Controls (SOC) reports, PCI DSS attestations and ISO certifications, which you can hand to your own auditors as evidence that AWS's side is covered. Artifact Agreements lets you review, accept and manage agreements with AWS, such as the Business Associate Addendum (BAA) needed when you handle protected health information under HIPAA, for one account or for all accounts in an organization.",
   "AWS Audit Manager helps you audit your own AWS usage. You choose a framework, either a prebuilt one mapped to a standard or regulation, or a custom one, and create an assessment. Audit Manager then continuously collects evidence from your accounts, such as configuration snapshots, AWS CloudTrail activity, AWS Config rule results and AWS Security Hub checks, and organizes it by control. When the audit arrives, you generate an assessment report instead of spending weeks gathering screenshots and spreadsheets. Some controls, such as a documented training policy, cannot be collected automatically, so you can upload manual evidence alongside the automated items and delegate review of individual controls to their owners. Audit Manager helps you prepare; it does not certify you as compliant.",
   "AWS Config records the configuration of your AWS resources and how it changes over time. You can see what a security group looked like last Tuesday and, combined with CloudTrail, who changed it. Config rules evaluate resources against desired settings, for example 's3-bucket-public-read-prohibited' or 'encrypted-volumes', and flag noncompliant resources; conformance packs bundle many rules into one deployable set. Config can also trigger automatic remediation through Systems Manager Automation. From the CLI, `aws configservice describe-compliance-by-config-rule` shows which rules are passing and failing.",
   "For general information, the AWS Compliance Programs pages list the standards AWS participates in, and the Services in Scope pages show which AWS services are covered by which program, which matters because not every service is in scope for every standard. The AWS Customer Compliance Center, whitepapers and quick start guides explain how to meet requirements. For governance at scale, AWS Organizations with service control policies (SCPs) and AWS Control Tower with its preventive and detective controls help keep many accounts inside the rules.",
   "Consider a worked example. A clinic group is moving a patient portal to AWS. Its compliance officer accepts the BAA in AWS Artifact Agreements and downloads the latest SOC 2 report from Artifact Reports for the auditors. Engineers check the Services in Scope page to confirm each service they plan to use is HIPAA eligible. They deploy an AWS Config conformance pack that flags unencrypted volumes and public buckets, and set up an Audit Manager assessment so evidence is collected continuously for the annual audit.",
   "Common mistakes: thinking AWS Artifact checks your own resources (it only holds AWS's documents and agreements); thinking AWS Config is a threat detection service (it evaluates configurations, while Amazon GuardDuty detects threats); assuming that because AWS is certified for a standard, your workload is automatically compliant (you must still configure your part correctly); and confusing Config, which records and evaluates resource settings, with CloudTrail, which records API calls. Config tells you what the resource looks like; CloudTrail tells you who called which API.",
   "Exam wording is usually a clear hint. 'Download AWS's SOC or PCI reports' or 'accept a BAA' is AWS Artifact. 'Continuously collect evidence for an audit' or 'map AWS usage to a compliance framework' is AWS Audit Manager. 'Track configuration changes over time', 'evaluate resources against rules' or 'is this resource compliant with our policy?' is AWS Config. 'Which services are covered by a compliance program?' is the AWS Services in Scope information."
  ],
  "terms": [
   [
    "AWS Artifact",
    "A self-service portal for AWS's third-party audit reports and agreements such as the BAA."
   ],
   [
    "Business Associate Addendum (BAA)",
    "An agreement required under HIPAA before handling protected health information on AWS, accepted through Artifact Agreements."
   ],
   [
    "AWS Audit Manager",
    "A service that continuously collects evidence from your AWS usage and maps it to compliance frameworks."
   ],
   [
    "AWS Config",
    "A service that records resource configurations over time and evaluates them against rules."
   ],
   [
    "Config rule",
    "A check that marks resources compliant or noncompliant with a desired configuration."
   ],
   [
    "Conformance pack",
    "A deployable collection of AWS Config rules and remediation actions."
   ],
   [
    "Services in Scope",
    "AWS information listing which services are covered by each compliance program."
   ]
  ],
  "example": "An online payment processor preparing for its PCI DSS assessment downloads AWS's PCI attestation from Artifact to cover the infrastructure layer. It runs an Audit Manager assessment against a PCI framework that has been gathering evidence all year, and its AWS Config rules show two security groups that allowed unrestricted inbound access. Config's history shows when they changed, CloudTrail shows who changed them, and the team fixes them before the assessor arrives.",
  "tip": "Artifact holds AWS's compliance reports and agreements; it does not assess your resources. To check whether your own resources meet a configuration standard, use AWS Config; to gather audit evidence, use Audit Manager.",
  "check": [
   [
    "Where do you download AWS's SOC reports to give to your auditors?",
    "AWS Artifact, in Artifact Reports."
   ],
   [
    "A company must flag any EBS volume that is not encrypted. Which service?",
    "AWS Config, using a rule that evaluates volumes for encryption."
   ],
   [
    "What does AWS Audit Manager do?",
    "It continuously collects evidence from your AWS accounts and organizes it against a compliance framework to prepare for audits."
   ],
   [
    "Does AWS holding a PCI DSS attestation make your application PCI compliant?",
    "No. It covers AWS's infrastructure; you must still configure and operate your own workload to meet the standard."
   ]
  ]
 },
 {
  "t": "Encryption at rest and in transit: AWS KMS, AWS CloudHSM and AWS Certificate Manager",
  "body": [
   "Encryption protects data so that only someone with the right key can read it. You need it in two places. Encryption at rest protects stored data, such as objects in Amazon Simple Storage Service (Amazon S3), volumes in Amazon Elastic Block Store (Amazon EBS) or rows in a database. Encryption in transit protects data moving across a network, usually with Transport Layer Security (TLS), which is what HTTPS uses. The Cloud Practitioner exam asks you to choose among three services that support these: AWS Key Management Service, AWS CloudHSM and AWS Certificate Manager.",
   "AWS Key Management Service (AWS KMS) is the managed service for creating and controlling encryption keys. Most AWS services that store data integrate with KMS, so encrypting an EBS volume or an S3 bucket is often a single setting. KMS keys never leave the service unencrypted; they are protected by hardware security modules that AWS operates and that are validated under the FIPS 140 standard. You control who can use each key through key policies and IAM policies, and every use of a key is logged in AWS CloudTrail, which gives you an audit trail of who decrypted what.",
   "KMS has three kinds of keys worth knowing. AWS owned keys are used by AWS services internally and are invisible to you. AWS managed keys are created in your account by a service, with aliases such as `aws/s3` or `aws/ebs`, and AWS manages their rotation. Customer managed keys are keys you create and control, including their key policy, automatic rotation and scheduled deletion; for example `aws kms create-key --description \"payroll data\"`. Choose customer managed keys when you need to control access to the key itself, separate duties or audit use in detail.",
   "AWS CloudHSM provides dedicated hardware security modules (HSMs) in the AWS Cloud. An HSM is a tamper-resistant device that stores keys and performs cryptographic operations. With CloudHSM, the HSMs in your cluster are single-tenant and you manage the keys and HSM users yourself; AWS manages the hardware but cannot access your keys. Organizations choose CloudHSM when a regulation or contract requires dedicated hardware under their exclusive control, or when an application needs standard interfaces such as PKCS#11, Java Cryptography Extension (JCE) or Microsoft CryptoAPI. KMS is simpler and integrated with more services; CloudHSM gives more control but more operational work.",
   "AWS Certificate Manager (ACM) provisions, manages and deploys TLS certificates for encryption in transit. You request a public certificate for a domain, for example with `aws acm request-certificate --domain-name www.example.com --validation-method DNS`, prove you control the domain through DNS or email validation, and attach the certificate to integrated services such as Elastic Load Balancing, Amazon CloudFront or Amazon API Gateway. Public certificates from ACM for these integrated services are provided at no additional charge, and ACM renews them automatically, removing the classic outage caused by a forgotten expiry date.",
   "Consider a worked example. A health startup must encrypt patient records at rest and in transit and show auditors who accessed the keys. It creates a customer managed KMS key with a key policy that lets only the application role use it, enables automatic rotation, and sets its S3 bucket and RDS database to use that key. CloudTrail logs every decrypt call. It requests an ACM certificate for its domain and attaches it to its Application Load Balancer, so browsers connect over HTTPS. A partner bank with a contractual requirement for dedicated HSMs uses CloudHSM instead.",
   "Common mistakes: thinking ACM encrypts data at rest (it provides certificates for data in transit); thinking KMS keys can be exported in plaintext (they cannot); choosing CloudHSM when the question only asks for easy, integrated encryption (KMS is the answer); and assuming default encryption removes all your duties. Many services now encrypt by default, for example new objects in S3 are encrypted automatically, but deciding what else to encrypt, which keys to use and who can use them remains a customer responsibility under the shared responsibility model.",
   "Exam questions hinge on keywords. 'Create and manage encryption keys integrated with AWS services' or 'audit key usage with CloudTrail' is KMS. 'Dedicated, single-tenant HSM', 'FIPS-validated hardware under the customer's exclusive control' or 'AWS must not have access to the keys' is CloudHSM. 'SSL/TLS certificates', 'HTTPS for a load balancer' or 'automatic certificate renewal' is ACM. 'Protect data stored on disk' means at rest; 'protect data moving between client and server' means in transit."
  ],
  "terms": [
   [
    "Encryption at rest",
    "Encrypting stored data such as S3 objects, EBS volumes and database storage."
   ],
   [
    "Encryption in transit",
    "Encrypting data as it moves across a network, usually with TLS."
   ],
   [
    "AWS Key Management Service (AWS KMS)",
    "A managed service for creating and controlling encryption keys, integrated with most AWS services."
   ],
   [
    "Customer managed key",
    "A KMS key you create and control, including its key policy, rotation and deletion."
   ],
   [
    "Hardware security module (HSM)",
    "A tamper-resistant device that stores keys and performs cryptographic operations."
   ],
   [
    "AWS CloudHSM",
    "A service providing dedicated, single-tenant HSMs whose keys the customer exclusively manages."
   ],
   [
    "AWS Certificate Manager (ACM)",
    "A service that provisions, deploys and automatically renews TLS certificates for AWS services."
   ]
  ],
  "example": "An online retailer's certificate expired on a holiday weekend, taking the site offline for hours. After moving to AWS, it issues its certificates through ACM and attaches them to its load balancer and CloudFront distribution, and ACM renews them automatically. Order data in S3 and Amazon RDS is encrypted with a customer managed KMS key, and the security team reviews CloudTrail logs of key usage every month.",
  "tip": "'Managed keys integrated with AWS services' is KMS; 'dedicated, single-tenant HSM' or 'exclusive control of the hardware' is CloudHSM; 'SSL/TLS certificates' is ACM. ACM is for data in transit, not at rest.",
  "check": [
   [
    "What is the difference between encryption at rest and in transit?",
    "At rest protects stored data such as disks and objects; in transit protects data moving over a network, usually with TLS."
   ],
   [
    "A regulation requires single-tenant HSMs under the company's exclusive control. Which service?",
    "AWS CloudHSM."
   ],
   [
    "Which service issues and automatically renews TLS certificates for a load balancer?",
    "AWS Certificate Manager (ACM)."
   ],
   [
    "How can you see who used a KMS key to decrypt data?",
    "Every KMS key use is logged in AWS CloudTrail, so you review the CloudTrail events for that key."
   ]
  ]
 },
 {
  "t": "Protecting the root user: MFA, no access keys, and the tasks that require root credentials",
  "body": [
   "When you create an AWS account, you sign in with the email address and password you used to sign up. That identity is the root user, and it has complete, unrestricted access to every resource and setting in the account, including billing and the ability to close the account. Permissions policies cannot limit the root user of a standalone account. Because it is so powerful, protecting it is one of the first things AWS asks you to do, and questions about it appear regularly on the Cloud Practitioner exam.",
   "Enable multi-factor authentication (MFA) on the root user straight away. MFA requires a second factor in addition to the password, such as a passkey or FIDO security key, a virtual authenticator app that generates time-based codes, or a hardware token, so a stolen password alone is not enough. In the console you do this from the account menu under Security credentials > Multi-factor authentication (MFA) > Assign MFA device. Use a strong, unique password and keep the root email mailbox itself secure, since password resets go there. Registering more than one MFA device gives you a backup if one is lost.",
   "Do not create access keys for the root user. Access keys are long-term credentials, an access key ID and a secret access key, used for programmatic access through the AWS Command Line Interface (CLI) or software development kits (SDKs). Root access keys would give a script, or anyone who found them in a code repository, full control of the account. If root access keys exist, delete them. You can check quickly with `aws iam get-account-summary`, which reports `AccountMFAEnabled` and `AccountAccessKeysPresent` for the root user; you want 1 and 0 respectively.",
   "For everyday work, including administrative work, do not use the root user at all. Create administrative access through AWS IAM Identity Center or IAM roles with only the permissions needed, and sign in with those. Lock the root credentials away and monitor their use: an Amazon CloudWatch alarm or Amazon EventBridge rule on root sign-in events recorded by AWS CloudTrail tells you immediately if someone uses them. In AWS Organizations, administrators can also centrally manage root access for member accounts, removing root credentials from member accounts and performing the few privileged root tasks centrally when needed.",
   "A small set of tasks can only be performed by the root user. Examples include changing account settings such as the account name, root email address and root password; closing the AWS account; restoring IAM permissions when the only IAM administrator has accidentally been locked out; viewing certain tax invoices; registering as a seller in the Reserved Instance Marketplace; enabling MFA delete on an S3 bucket; and editing or deleting an S3 bucket policy that denies all principals, including the account's administrators. AWS publishes the full list, and it has changed over time, so learn the pattern: account-level ownership and recovery actions need root.",
   "Consider a worked example. A small company's founder created the AWS account years ago and still signs in as root every day, and a root access key is stored in a deployment script. A security review flags both. The founder enables MFA with two security keys, deletes the root access key and replaces the script's credentials with an IAM role, creates an administrator permission set in IAM Identity Center for daily work, and sets an alarm on root sign-ins. The root password and MFA keys go into a safe, used only when a root-only task comes up.",
   "Common mistakes: believing the root user can be restricted by IAM policies in a standalone account (it cannot, though service control policies in AWS Organizations can restrict member accounts); thinking you need root to create IAM users, launch instances or view billing (IAM users and roles with the right permissions can do these); sharing root credentials among a team; and keeping root access keys 'for emergencies'. An emergency that truly needs root is handled by signing in to the console with the password and MFA, not with keys.",
   "Exam questions usually ask either how to protect the root user or which task requires it. 'Best practice for the root user' is enable MFA, do not create access keys, and use it only for tasks that require it. 'Which task requires root user credentials?' has answers like changing the root email or account name, closing the account, or restoring locked-out IAM permissions. Distractors such as 'create an IAM user', 'launch an EC2 instance' or 'view Cost Explorer' do not require root."
  ],
  "terms": [
   [
    "Root user",
    "The identity created with a new AWS account that has unrestricted access to every resource and setting."
   ],
   [
    "Multi-factor authentication (MFA)",
    "Requiring a second factor, such as a security key or authenticator code, in addition to a password."
   ],
   [
    "Access keys",
    "Long-term credentials made of an access key ID and secret access key for programmatic access."
   ],
   [
    "Root-only task",
    "An account-level action, such as closing the account or changing the root email, that only the root user can perform."
   ],
   [
    "Centralized root access",
    "An AWS Organizations capability that lets administrators remove and manage root credentials for member accounts centrally."
   ],
   [
    "AWS CloudTrail",
    "The service that records API activity, including root user sign-ins, in an account."
   ]
  ],
  "example": "A nonprofit discovers that its AWS bill tripled overnight because an old root access key was committed to a public code repository and used to launch instances. After containing the incident with AWS Support, it deletes all root access keys, enables MFA on the root user, moves staff to IAM Identity Center with least-privilege permission sets and adds an alert on any root sign-in. The root credentials are now used only for rare account-level tasks.",
  "tip": "Protect root with MFA, delete any root access keys and use it only for root-only tasks. Changing the root email or account name, closing the account and restoring locked-out IAM permissions need root; creating IAM users or launching instances do not.",
  "check": [
   [
    "What two actions does AWS recommend first to protect the root user?",
    "Enable MFA on the root user and make sure it has no access keys (delete any that exist)."
   ],
   [
    "Which of these requires the root user: closing the account, creating an IAM user, or viewing Cost Explorer?",
    "Closing the account; the other two can be done by IAM identities with the right permissions."
   ],
   [
    "Why should the root user never have access keys?",
    "They are long-term credentials with unrestricted access, so if leaked they give an attacker full control of the account."
   ],
   [
    "What should administrators use for daily administrative work instead of root?",
    "Administrative access through IAM Identity Center or IAM roles with only the permissions they need."
   ]
  ]
 },
 {
  "t": "IAM users, groups, roles and policies, and the principle of least privilege",
  "body": [
   "AWS Identity and Access Management (IAM) controls who can sign in to your AWS account (authentication) and what they are allowed to do (authorization). IAM is a global service, not tied to a Region, and it is available at no additional charge. It is the heart of the customer's security responsibility, because nearly every security failure in AWS comes down to someone having access they should not have. IAM has four building blocks. An IAM user is an identity for one person or application, with long-term credentials: a password for the console and optionally access keys for the command line interface (CLI) and software development kits (SDKs). An IAM group is a collection of users; you attach permissions to the group, and every member inherits them. Groups cannot contain other groups, and a group is not an identity that can sign in. An IAM role is an identity with permissions but no long-term credentials. Instead, a trusted entity assumes the role and receives temporary credentials from AWS Security Token Service (AWS STS). Policies define the permissions themselves.",
   "Roles are used by AWS services (for example an EC2 instance that needs to read from S3 uses an instance profile with a role), by users from another AWS account, and by people signing in through a central identity provider such as IAM Identity Center. AWS now recommends roles and temporary credentials over IAM users wherever possible, because temporary credentials expire on their own and there are no long-term keys to leak. Running `aws sts get-caller-identity` shows which user or role your current credentials belong to, which is handy when permissions behave unexpectedly.",
   "Permissions are defined in policies, which are JavaScript Object Notation (JSON) documents. Each statement has an Effect (Allow or Deny), one or more Actions (such as `s3:GetObject`), Resources identified by Amazon Resource Names (ARNs), and optional Conditions. By default everything is denied; an explicit Allow grants access, and an explicit Deny always overrides any Allow. Identity-based policies attach to users, groups and roles; resource-based policies, such as S3 bucket policies, attach to resources. AWS managed policies are prebuilt by AWS, and customer managed policies are ones you write and maintain.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": \"s3:GetObject\",\n    \"Resource\": \"arn:aws:s3:::example-reports/*\"\n  }]\n}\n```",
   "The principle of least privilege means granting only the permissions required to perform a task and nothing more. In practice: start with minimal permissions and add as needed, attach permissions to groups and roles rather than individual users, use conditions to narrow access (for example to a specific IP range or requiring MFA), and review access regularly. IAM Access Analyzer helps by finding resources shared outside your account, flagging unused access and generating policies based on actual CloudTrail activity. Requiring MFA for human users and avoiding or rotating long-term access keys round out IAM best practice.",
   "Consider a worked example. Five analysts need read access to one reporting bucket. Instead of attaching the policy above to five users, you create an `Analysts` group, attach the policy to it and add the users, so a new analyst gets access by joining the group. A nightly job on an EC2 instance also needs to read the bucket; rather than storing access keys on the server, you attach a role to the instance, and the SDK picks up temporary credentials automatically.",
   "Common mistakes: storing access keys on EC2 instances or in code instead of using roles; attaching `AdministratorAccess` because it is quicker; thinking groups can be nested or can sign in; and forgetting that an explicit Deny anywhere wins over any Allow. People also confuse authentication (proving who you are, with a password, MFA or a role) with authorization (what a policy lets you do once you are known), and assume a new IAM user can do something simply because it can sign in. A new user with no policies can sign in to the console but cannot act on any resource.",
   "Exam questions usually test which building block fits. 'An AWS service such as EC2 or Lambda needs to access another AWS service' is an IAM role. 'Several people need the same permissions' is an IAM group. 'Define what actions are allowed on which resources' is a policy. 'Temporary credentials' or 'cross-account access' points to roles. 'Grant only the permissions needed' is least privilege, and 'find resources shared with external accounts' is IAM Access Analyzer."
  ],
  "terms": [
   [
    "IAM user",
    "An identity with long-term credentials representing one person or application."
   ],
   [
    "IAM group",
    "A collection of IAM users that share the permissions attached to the group."
   ],
   [
    "IAM role",
    "An identity with permissions that trusted entities assume to receive temporary credentials."
   ],
   [
    "IAM policy",
    "A JSON document that allows or denies actions on resources, optionally under conditions."
   ],
   [
    "Amazon Resource Name (ARN)",
    "A unique identifier for an AWS resource used in policies."
   ],
   [
    "Least privilege",
    "Granting only the minimum permissions required to perform a task."
   ],
   [
    "IAM Access Analyzer",
    "A tool that identifies external or unused access and helps generate least-privilege policies."
   ]
  ],
  "example": "A development team gave every developer AdministratorAccess to move fast. After one developer accidentally deleted a production database, the company created groups for developers and operators with scoped policies, moved production changes behind a role that requires MFA to assume, and used IAM Access Analyzer's policy generation to build a least-privilege policy from what each team actually used over 90 days.",
  "tip": "An AWS service that needs to call another AWS service should use an IAM role, never stored access keys. Several people needing the same permissions means an IAM group. An explicit Deny always overrides an Allow.",
  "check": [
   [
    "An application on EC2 needs to read from S3. What is the recommended way to give it permissions?",
    "Attach an IAM role to the instance so it receives temporary credentials; do not store access keys on the server."
   ],
   [
    "Can an IAM group sign in or contain other groups?",
    "No. A group is only a way to attach permissions to many users; it cannot sign in and cannot be nested."
   ],
   [
    "If one policy allows s3:DeleteObject and another explicitly denies it, what happens?",
    "The action is denied, because an explicit Deny always overrides an Allow."
   ],
   [
    "What is the principle of least privilege?",
    "Granting only the permissions needed to perform a task and nothing more."
   ]
  ]
 },
 {
  "t": "Workforce single sign-on with AWS IAM Identity Center and customer sign-in with Amazon Cognito",
  "body": [
   "Two very different groups of people need to sign in to things you build on AWS. Your workforce, meaning employees and contractors, needs to access AWS accounts and business applications. Your customers, the end users of your web and mobile apps, need to sign up and sign in to those apps. AWS has a separate service for each audience, and the exam tests whether you can tell which is which.",
   "AWS IAM Identity Center (the successor to AWS Single Sign-On) is the recommended way to give your workforce access to AWS. Single sign-on (SSO) means people sign in once and reach many accounts and applications without separate passwords. Identity Center connects to one identity source: its own built-in directory, Microsoft Active Directory, or an external identity provider (IdP) such as Microsoft Entra ID or Okta, typically using Security Assertion Markup Language (SAML) 2.0 and automatic user provisioning. Users sign in to an AWS access portal and see every AWS account and role they are allowed to use, plus integrated business applications.",
   "Access in Identity Center is defined with permission sets, which are collections of IAM policies, for example 'ReadOnly' or 'DatabaseAdmin'. You assign a user or group a permission set in one or more accounts, and Identity Center creates the matching IAM role in each account. Users get temporary credentials, so there are no long-lived IAM user passwords or access keys to manage, and removing someone from the corporate directory removes their AWS access. It works especially well with AWS Organizations, where you assign access across many accounts from one place. Developers can use the same sign-in on the command line with `aws configure sso` followed by `aws sso login`.",
   "Amazon Cognito provides sign-up, sign-in and access control for your own web and mobile applications, and it scales to very large numbers of users. A Cognito user pool is a user directory for your app: it handles registration, sign-in, email or phone verification, password reset, MFA and federated sign-in through social providers (such as Google, Apple, Facebook or Amazon) or enterprise SAML and OpenID Connect (OIDC) providers. After sign-in it returns JSON Web Tokens (JWTs) your application and APIs can trust. A Cognito identity pool exchanges those tokens, or even guest access, for temporary AWS credentials, so a mobile app can, for example, upload a photo directly to S3 with tightly limited permissions.",
   "The key distinction is who is signing in and to what. Employees signing in to the AWS console, CLI or many AWS accounts use IAM Identity Center. End users signing in to your product use Cognito. Neither replaces IAM itself; both ultimately rely on IAM roles and policies to grant AWS permissions. Both also support federation, which means trusting identities managed by an external identity provider rather than creating separate accounts, but for different audiences: corporate directories for Identity Center, social and customer identity providers for Cognito.",
   "Consider a worked example. A game studio has 200 staff and 30 AWS accounts. It connects IAM Identity Center to its existing Okta directory and creates permission sets for developers, testers and finance, so staff sign in once with their corporate credentials and pick the account they need. Its new mobile game needs player accounts with 'Sign in with Apple' and Google options; the studio uses a Cognito user pool for player sign-in and an identity pool so the game can save screenshots to a player-specific folder in S3.",
   "Common mistakes: using Cognito for employee access to the AWS console; creating IAM users for millions of app customers (IAM is for managing access to AWS, not app users); thinking permission sets are a separate permission system rather than a way to create IAM roles; and confusing a user pool (who you are, sign-in and tokens) with an identity pool (temporary AWS credentials). Another trap is assuming Identity Center requires Active Directory; it can use its own directory or any supported external IdP.",
   "Exam wording makes the choice clear. 'Employees need single sign-on to multiple AWS accounts' or 'use existing corporate credentials to access AWS' is IAM Identity Center. 'Customers of our mobile app need to create accounts and sign in with their social media identity' or 'add sign-up and sign-in to a web app' is Amazon Cognito. 'Millions of users' or 'social identity providers' strongly suggests Cognito. 'Central access management across AWS Organizations accounts' suggests Identity Center."
  ],
  "terms": [
   [
    "AWS IAM Identity Center",
    "The recommended AWS service for workforce single sign-on to multiple AWS accounts and business applications."
   ],
   [
    "Single sign-on (SSO)",
    "Signing in once to access many accounts or applications without separate credentials."
   ],
   [
    "Permission set",
    "A collection of policies in IAM Identity Center that becomes an IAM role in each assigned account."
   ],
   [
    "Identity provider (IdP)",
    "A system that authenticates users and vouches for them to other services, such as Okta or Microsoft Entra ID."
   ],
   [
    "Amazon Cognito",
    "A service that adds sign-up, sign-in and access control to web and mobile applications."
   ],
   [
    "Cognito user pool",
    "A user directory for an application that handles sign-up, sign-in and token issuance."
   ],
   [
    "Cognito identity pool",
    "A Cognito feature that exchanges tokens for temporary AWS credentials."
   ]
  ],
  "example": "A retail bank gives its engineers access to 60 AWS accounts through IAM Identity Center connected to Microsoft Entra ID, so when someone leaves the bank and their directory account is disabled, their AWS access ends immediately. Its customer-facing budgeting app uses an Amazon Cognito user pool with MFA for millions of customers, completely separate from the employee directory.",
  "tip": "Workforce access to AWS accounts means IAM Identity Center; end users of your app mean Amazon Cognito. 'Millions of app users' or 'social identity providers' points to Cognito.",
  "check": [
   [
    "Employees need single sign-on to many AWS accounts using their corporate directory credentials. Which service?",
    "AWS IAM Identity Center."
   ],
   [
    "A mobile app needs customer sign-up and sign-in with Google and Apple accounts. Which service?",
    "Amazon Cognito, using a user pool with social identity providers."
   ],
   [
    "What is a permission set in IAM Identity Center?",
    "A collection of policies that Identity Center provisions as an IAM role in each account where it is assigned."
   ],
   [
    "What is the difference between a Cognito user pool and an identity pool?",
    "A user pool is a directory that signs users in and issues tokens; an identity pool exchanges identities for temporary AWS credentials."
   ]
  ]
 },
 {
  "t": "Storing credentials safely: AWS Secrets Manager and AWS Systems Manager Parameter Store",
  "body": [
   "Applications need secrets: database passwords, API keys for third-party services, tokens and certificates. The worst place to keep them is in source code or in plain text configuration files on a server, where they get copied into code repositories, backups, container images and logs, and are hard to change once leaked. AWS offers two services for storing such values centrally and retrieving them at runtime with access controlled by AWS Identity and Access Management (IAM): AWS Secrets Manager and AWS Systems Manager Parameter Store.",
   "AWS Secrets Manager is purpose-built for secrets. You store a secret, such as a database username and password in JSON form, and your application retrieves it with an API call when it needs it, for example `aws secretsmanager get-secret-value --secret-id prod/orders/db`. Access is controlled with IAM policies and resource policies on the secret, secrets are encrypted with AWS Key Management Service (AWS KMS), and every retrieval is logged in AWS CloudTrail. Secrets can be replicated to other Regions for multi-Region applications. Secrets Manager is charged per secret per month and per API call.",
   "Its standout feature is automatic rotation. Secrets Manager can change a password on a schedule you set and update the database at the same time, so the old password stops working and applications fetch the new one on their next call. It has built-in rotation support for Amazon RDS, Amazon Aurora, Amazon Redshift and Amazon DocumentDB, and uses AWS Lambda rotation functions for other secret types such as third-party API keys. Some AWS services, including Amazon RDS, can also create and manage the master user password in Secrets Manager for you.",
   "AWS Systems Manager Parameter Store is a capability of AWS Systems Manager that stores configuration data and secrets as parameters in a hierarchy, such as `/prod/app/db-host`. Parameters can be String, StringList or SecureString; SecureString values are encrypted with KMS. You retrieve them with a call such as `aws ssm get-parameter --name /prod/app/db-password --with-decryption`, or fetch a whole branch of the hierarchy at once. Standard parameters have no additional charge, while advanced parameters, which allow larger values and parameter policies, are charged. Parameter Store does not provide built-in automatic rotation the way Secrets Manager does.",
   "Choosing between them is a frequent exam question. If the requirement is automatic rotation of database credentials, pick Secrets Manager. If the requirement is storing configuration values such as feature flags, endpoints or simple secrets centrally at low or no cost, Parameter Store is a good fit. Both remove secrets from code, both can use KMS encryption, both log access through CloudTrail and both rely on IAM to control who can read each value. Whichever you use, grant the application's IAM role permission to read only the specific secrets or parameters it needs, which is least privilege applied to secrets.",
   "Consider a worked example. An order service has its database password in a configuration file checked into Git. After the repository is accidentally made public, the team rotates the password, stores it in Secrets Manager with automatic rotation every 30 days, and changes the application to call `GetSecretValue` at startup with a short cache. The database hostname, timeout settings and feature flags go into Parameter Store under `/prod/orders/`. The service's IAM role is allowed to read only that one secret and that parameter path.",
   "Common mistakes: storing secrets as plain environment variables or in code 'just for now'; choosing Parameter Store when the question explicitly requires automatic rotation; thinking Secrets Manager is free (it is charged per secret and per API call); thinking the services replace IAM (they depend on it); and granting an application `secretsmanager:GetSecretValue` on all secrets instead of the one it needs. Another trap is confusing these services with AWS KMS: KMS manages encryption keys, while Secrets Manager and Parameter Store store the secret values those keys protect. Finally, remember that rotation only helps if applications fetch the current value rather than caching it forever.",
   "Exam wording is usually decisive. 'Rotate' or 'rotation' of database credentials is a strong signal for AWS Secrets Manager. 'Store configuration data and secrets at no additional cost' or 'hierarchical parameters' points to Parameter Store. 'Remove hard-coded credentials from application code' can be either, so look for the rotation or cost clue. 'Manage encryption keys' is KMS, not a secrets store."
  ],
  "terms": [
   [
    "Secret",
    "A sensitive value such as a password, API key or token that must be protected from disclosure."
   ],
   [
    "AWS Secrets Manager",
    "A service that stores, retrieves and automatically rotates secrets such as database credentials."
   ],
   [
    "Secret rotation",
    "Changing a credential on a schedule and updating both the store and the target system."
   ],
   [
    "AWS Systems Manager Parameter Store",
    "A capability of Systems Manager that stores configuration data and secrets as hierarchical parameters."
   ],
   [
    "SecureString",
    "A Parameter Store parameter type whose value is encrypted with AWS KMS."
   ],
   [
    "Hard-coded credentials",
    "Secrets written directly into source code or configuration files, a practice to avoid."
   ]
  ],
  "example": "A media company's security audit finds database passwords in plain text in dozens of container images. The company moves every database credential into Secrets Manager with 30-day automatic rotation, stores non-sensitive configuration such as API endpoints in Parameter Store, and gives each service's IAM role access only to its own secret. Rebuilding an image no longer copies a password, and a leaked old password stops working within a month at most.",
  "tip": "'Rotate' or 'rotation' points to AWS Secrets Manager. 'Store configuration data or simple secrets at no additional cost' points to Parameter Store. KMS manages keys, not secret values.",
  "check": [
   [
    "A company needs database passwords rotated automatically every 30 days. Which service?",
    "AWS Secrets Manager, which has built-in rotation for databases such as Amazon RDS."
   ],
   [
    "Which service can store configuration values in a hierarchy with standard parameters at no additional charge?",
    "AWS Systems Manager Parameter Store."
   ],
   [
    "How is a SecureString parameter protected?",
    "Its value is encrypted with an AWS KMS key, and access is controlled with IAM."
   ],
   [
    "Why should secrets not be hard-coded in application source code?",
    "They get copied into repositories, images and backups where they can leak, and they are hard to rotate once exposed."
   ]
  ]
 },
 {
  "t": "Network protection: security groups vs network ACLs, AWS WAF, AWS Shield Standard and Advanced, AWS Firewall Manager",
  "body": [
   "AWS gives you several layers of network protection, each working at a different level: the network interface, the subnet, the web request and the whole organization. Using them together is called defense in depth. The exam tests both the differences between them and which one to use for a given threat, so learn each by where it sits and what it can and cannot do.",
   "Security groups are virtual firewalls for resources such as Amazon EC2 instances, more precisely for their elastic network interfaces. They support allow rules only; anything not allowed is denied. They are stateful: if an inbound request is allowed, the response is automatically allowed back out, and vice versa. All rules are evaluated together, and a rule can reference another security group, for example allowing the database group to accept traffic only from the web server group. A typical command is `aws ec2 authorize-security-group-ingress --group-id <sg-id> --protocol tcp --port 443 --cidr 0.0.0.0/0` to allow HTTPS from anywhere.",
   "Network access control lists (network ACLs) protect whole subnets in an Amazon Virtual Private Cloud (Amazon VPC). They support both allow and deny rules, are evaluated in rule-number order with the first match winning, and are stateless: return traffic must be explicitly allowed by a separate rule, which usually means allowing the ephemeral port range for responses. The default network ACL allows all traffic in and out. A typical design uses security groups for most control and network ACLs as a coarse subnet-level backstop, for example to block a specific address range that is attacking you.",
   "AWS WAF is a web application firewall. It inspects HTTP and HTTPS requests at layer 7 for resources such as Amazon CloudFront distributions, Application Load Balancers and Amazon API Gateway APIs. You create a web access control list (web ACL) with rules, or use managed rule groups from AWS and AWS Marketplace sellers, to block common attacks like SQL injection and cross-site scripting, filter by IP address or country, and rate-limit clients that send too many requests. Security groups and network ACLs cannot see inside HTTP requests; WAF can.",
   "AWS Shield protects against distributed denial of service (DDoS) attacks. Shield Standard is automatically enabled for all AWS customers at no additional cost and defends against the most common network and transport layer attacks. Shield Advanced is a paid subscription that adds enhanced detection and mitigation for resources such as EC2, Elastic Load Balancing, CloudFront, Amazon Route 53 and AWS Global Accelerator, access to the AWS Shield Response Team (SRT) during attacks, detailed attack reporting, AWS WAF included for protected resources, and cost protection against scaling charges caused by a DDoS attack. AWS Firewall Manager centrally configures and manages firewall rules across all accounts in AWS Organizations: you define policies once, such as a WAF rule set, Shield Advanced protection or required security groups, and Firewall Manager applies them to existing and new accounts and resources automatically.",
   "Consider a worked example. An online store sees three problems: a single IP range probing every server, bots attempting SQL injection through the search box, and a large traffic flood before a sale. The team adds a deny rule for the probing range in the network ACL of the public subnets (security groups cannot deny), attaches an AWS WAF web ACL with a SQL injection managed rule group and a rate-based rule to its Application Load Balancer, and subscribes to Shield Advanced for the load balancer and CloudFront distribution to get SRT help and cost protection. Firewall Manager then pushes the same WAF policy to the company's other 15 accounts.",
   "Common mistakes: trying to block a specific IP address with a security group (it has no deny rules); forgetting that network ACLs are stateless, so allowing inbound port 443 without allowing outbound return traffic breaks connections; expecting WAF to stop network-layer floods (that is Shield); thinking Shield Standard must be purchased or enabled (it is automatic and free); and confusing Firewall Manager, which manages rules across accounts, with a firewall that inspects traffic itself. AWS Network Firewall, a separate managed firewall for VPC traffic, may also appear as a distractor.",
   "Exam wording maps cleanly. 'Stateful', 'allow rules only' or 'instance level' means security group. 'Stateless', 'allow and deny rules', 'subnet level' or 'block an IP range' means network ACL. 'SQL injection', 'cross-site scripting', 'HTTP headers' or 'rate limiting web requests' means AWS WAF. 'DDoS protection at no additional cost' is Shield Standard; '24/7 DDoS response team' or 'cost protection' is Shield Advanced. 'Centrally manage firewall rules across accounts in AWS Organizations' is AWS Firewall Manager."
  ],
  "terms": [
   [
    "Security group",
    "A stateful, allow-only virtual firewall attached to network interfaces of resources such as EC2 instances."
   ],
   [
    "Network ACL",
    "A stateless subnet-level firewall with numbered allow and deny rules evaluated in order."
   ],
   [
    "Stateful",
    "Automatically allowing return traffic for a permitted connection."
   ],
   [
    "AWS WAF",
    "A web application firewall that filters HTTP and HTTPS requests to CloudFront, load balancers and APIs."
   ],
   [
    "Distributed denial of service (DDoS)",
    "An attack that floods a target with traffic from many sources to make it unavailable."
   ],
   [
    "AWS Shield",
    "DDoS protection, with Standard included for all customers and Advanced as a paid tier with response team access."
   ],
   [
    "AWS Firewall Manager",
    "A service that centrally applies WAF, Shield Advanced and security group policies across AWS Organizations accounts."
   ]
  ],
  "example": "A ticketing company's site slows down every time a popular event goes on sale because bots hammer the checkout page. It attaches an AWS WAF web ACL with a rate-based rule and bot control rules to its CloudFront distribution, keeps security groups on its instances allowing only traffic from the load balancer, and subscribes to Shield Advanced so the Shield Response Team can help during large attacks and unexpected scaling costs are covered.",
  "tip": "Stateful and allow-only means security group; stateless with allow and deny means network ACL. To block one IP address at the network level you need a network ACL (or WAF for web requests), because security groups cannot deny.",
  "check": [
   [
    "Which is stateful: a security group or a network ACL?",
    "A security group; return traffic is automatically allowed. Network ACLs are stateless."
   ],
   [
    "How would you block a specific malicious IP range from reaching a subnet?",
    "Add a deny rule for that range in the subnet's network ACL, because security groups have no deny rules."
   ],
   [
    "Which service protects a web application from SQL injection and cross-site scripting?",
    "AWS WAF, attached to CloudFront, an Application Load Balancer or API Gateway."
   ],
   [
    "What does Shield Advanced add over Shield Standard?",
    "Enhanced detection and mitigation, access to the Shield Response Team, detailed attack reporting and cost protection for DDoS-related scaling."
   ]
  ]
 },
 {
  "t": "Threat detection and posture: Amazon GuardDuty, Amazon Inspector, Amazon Macie, Amazon Detective and AWS Security Hub",
  "body": [
   "AWS has a family of security services whose names are easy to mix up. Each has a distinct job, and exam questions usually describe the job and ask for the name. The easiest way to learn them is by the question each one answers: is something bad happening, what is vulnerable, where is my sensitive data, what exactly happened, and what is my overall security posture.",
   "Amazon GuardDuty answers 'is something malicious happening in my account right now?' It is a threat detection service that continuously analyzes foundational data sources, AWS CloudTrail management events, Amazon VPC Flow Logs and DNS query logs, using threat intelligence, anomaly detection and machine learning. Optional protection plans extend it to S3 data events, Amazon EKS, runtime monitoring, malware scanning and database sign-in activity. It raises findings for things like an EC2 instance communicating with a known malicious address, API calls from an unusual location, credentials used from outside AWS or signs of cryptocurrency mining. You enable it with a click or `aws guardduty create-detector --enable`, and there is nothing to install for its foundational sources.",
   "Amazon Inspector answers 'what vulnerabilities do my workloads have?' It automatically and continuously scans EC2 instances, container images in Amazon Elastic Container Registry (Amazon ECR) and Lambda functions for known software vulnerabilities, listed as Common Vulnerabilities and Exposures (CVEs), and for unintended network exposure, then prioritizes findings with a risk score that considers your environment. Amazon Macie answers 'where is my sensitive data?' It uses machine learning and pattern matching to discover sensitive data such as personally identifiable information (PII), financial data and credentials in Amazon S3, and also reports on bucket security such as public access or missing encryption.",
   "Amazon Detective answers 'what happened and why?' When you have a finding, for example from GuardDuty, Detective automatically collects and links log data and builds visualizations of the resources, users and IP addresses involved over time, helping you investigate scope and root cause without writing queries. AWS Security Hub answers 'what is my overall security posture?' It aggregates findings from GuardDuty, Inspector, Macie, Firewall Manager, IAM Access Analyzer and partner tools into one place in a standard format, and runs automated checks against security standards such as the AWS Foundational Security Best Practices and the Center for Internet Security (CIS) AWS Foundations Benchmark. This is often called cloud security posture management (CSPM), and it can span all accounts in an organization.",
   "The distinctions are about detection versus assessment versus investigation. GuardDuty detects active threats from logs; it does not scan software for vulnerabilities. Inspector assesses software vulnerabilities and exposure; it does not watch for attackers. Macie is only about sensitive data, mainly in S3. Detective does not generate primary threat findings; it helps you investigate them. Security Hub collects, normalizes and scores; it relies on the other services for much of its detail.",
   "Consider a worked example. GuardDuty raises a finding that an EC2 instance is making DNS requests to a domain linked to cryptocurrency mining. The security engineer opens the finding in Detective and sees that the instance began the traffic an hour after a new container was deployed, and that the same IAM role was used from an unfamiliar IP address. Inspector shows the container image contains a web framework with a critical CVE, the likely entry point. Macie confirms the S3 bucket the role could read contains customer PII. Security Hub shows all these findings together, and the team isolates the instance and patches the image.",
   "Common mistakes: choosing GuardDuty for vulnerability scanning (that is Inspector); choosing Inspector for detecting compromised credentials (that is GuardDuty); using Macie for data in databases or on EC2 disks, when it focuses on S3; expecting Detective to prevent attacks; and thinking Security Hub replaces the individual services. Also remember none of these are firewalls; they detect, assess and report, and blocking is done with tools such as security groups, network ACLs and AWS WAF.",
   "Exam wording maps to one service each. 'Vulnerabilities', 'CVEs', 'software packages' or 'network reachability of EC2' means Inspector. 'Sensitive data', 'PII' or 'discover credit card numbers in S3' means Macie. 'Malicious activity', 'unusual API calls', 'compromised instance' or 'analyze VPC Flow Logs and CloudTrail for threats' means GuardDuty. 'Investigate root cause' or 'visualize relationships in a security finding' means Detective. 'Single dashboard of findings', 'aggregate security alerts' or 'check against security best practice standards' means Security Hub. A memory aid: GuardDuty guards, Inspector inspects, Macie finds data, Detective investigates, Security Hub is the hub."
  ],
  "terms": [
   [
    "Amazon GuardDuty",
    "A threat detection service that analyzes CloudTrail, VPC Flow Logs, DNS logs and more for malicious activity."
   ],
   [
    "Amazon Inspector",
    "An automated vulnerability management service that scans EC2, ECR images and Lambda functions for CVEs and exposure."
   ],
   [
    "Common Vulnerabilities and Exposures (CVE)",
    "A public catalog of identifiers for known software vulnerabilities."
   ],
   [
    "Amazon Macie",
    "A service that discovers sensitive data such as PII in Amazon S3 and reports bucket security issues."
   ],
   [
    "Amazon Detective",
    "A service that links and visualizes log data to investigate the root cause of security findings."
   ],
   [
    "AWS Security Hub",
    "A service that aggregates security findings and checks accounts against security standards."
   ],
   [
    "Finding",
    "A record produced by a security service describing a detected threat, vulnerability or misconfiguration."
   ]
  ],
  "example": "A healthcare startup enables GuardDuty, Inspector, Macie and Security Hub across its AWS Organizations accounts in one afternoon. Within a week Macie flags an S3 bucket holding exported patient records that nobody knew about, Inspector reports a critical CVE in an old container image, and GuardDuty alerts on API calls from an access key used in another country. Security Hub ranks all three so the team fixes the leaked key first.",
  "tip": "Vulnerabilities and CVEs mean Inspector; sensitive data or PII in S3 means Macie; malicious activity from logs means GuardDuty; investigating root cause means Detective; a single view of findings and compliance checks means Security Hub.",
  "check": [
   [
    "Which service scans EC2 instances and container images for known software vulnerabilities?",
    "Amazon Inspector."
   ],
   [
    "Which service detects an EC2 instance communicating with a known malicious IP address?",
    "Amazon GuardDuty, which analyzes VPC Flow Logs, DNS logs and CloudTrail events for threats."
   ],
   [
    "A company needs to find S3 objects containing credit card numbers. Which service?",
    "Amazon Macie."
   ],
   [
    "What does AWS Security Hub add on top of GuardDuty, Inspector and Macie?",
    "A single place that aggregates their findings across accounts and runs automated checks against security standards."
   ]
  ]
 },
 {
  "t": "Logging and monitoring for security: AWS CloudTrail, Amazon CloudWatch and AWS Trusted Advisor security checks",
  "body": [
   "You cannot secure what you cannot see. Three services give you visibility into what is happening in your AWS account, each from a different angle: AWS CloudTrail records who did what, Amazon CloudWatch measures how things are performing and raises alarms, and AWS Trusted Advisor checks your account against best practices. The exam expects you to know which one records what, and it frequently puts them side by side as options.",
   "AWS CloudTrail records API activity in your account: who did what, when, from which IP address and to which resource. Every action in AWS, whether through the console, the command line interface (CLI), a software development kit (SDK) or another AWS service, is an API call, so CloudTrail answers questions like 'who deleted this S3 bucket?' or 'who changed this security group?'. CloudTrail Event history shows the last 90 days of management events in a Region at no charge; you can search it in the console under CloudTrail > Event history or with `aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteBucket`.",
   "For longer retention and more detail, you create a trail that delivers log files to an S3 bucket you choose. Trails can include data events, such as individual S3 object reads or Lambda invocations, which are not recorded by default because of their volume. Enable log file integrity validation so you can prove logs were not altered, and restrict access to the log bucket. An organization trail logs every account in AWS Organizations to one place, and CloudTrail Lake lets you store and query events with SQL.",
   "Amazon CloudWatch monitors the performance and health of your resources and applications. It collects metrics, such as EC2 CPU utilization or load balancer request counts, stores and searches logs in CloudWatch Logs, and lets you build dashboards and set alarms that notify you through Amazon Simple Notification Service (Amazon SNS) or take automatic action, such as scaling or recovering an instance, when a metric crosses a threshold. For security, you can send CloudTrail logs to CloudWatch Logs and create metric filters and alarms for events such as root user sign-ins, IAM policy changes or repeated failed console logins. In short: CloudTrail tells you who did something; CloudWatch tells you how things are performing and alerts you.",
   "AWS Trusted Advisor inspects your account and gives recommendations across categories including cost optimization, performance, security, fault tolerance, service limits (service quotas) and operational excellence. Security checks include S3 buckets with open access permissions, security groups allowing unrestricted access to specific ports, whether MFA is enabled on the root user, IAM use and exposed access keys. All customers get a core set of security checks and the service quota checks, while the full set of checks, plus programmatic access through the AWS Support API, requires a Business, Enterprise On-Ramp or Enterprise support plan.",
   "Consider a worked example. On Monday morning a production security group allows SSH from the whole internet. Trusted Advisor's weekly check had already flagged it as unrestricted access. The team searches CloudTrail Event history for `AuthorizeSecurityGroupIngress` and finds that a contractor's role added the rule on Friday night from an unfamiliar IP address. They remove the rule, then create a CloudWatch metric filter on the CloudTrail log group for security group changes, with an alarm that emails the security team through SNS. GuardDuty, which analyzes the same CloudTrail and network logs for threats, confirms no further suspicious activity.",
   "Common mistakes: choosing CloudWatch to find who made a change (that is CloudTrail); choosing CloudTrail to monitor CPU utilization or set a threshold alarm (that is CloudWatch); assuming CloudTrail keeps events forever without a trail (Event history covers 90 days of management events); assuming data events such as S3 object reads are logged by default; and thinking Trusted Advisor fixes problems for you. It recommends; you act. Also avoid confusing Trusted Advisor with AWS Config, which records configuration history and evaluates your own rules.",
   "Exam wording usually gives it away. 'Who made this change?', 'audit API calls' or 'track user activity' is CloudTrail. 'CPU utilization', 'set an alarm', 'collect application logs' or 'dashboard of metrics' is CloudWatch. 'Recommendations to reduce cost, improve security and check service limits' or 'identify security groups with unrestricted access' is Trusted Advisor. 'Full set of Trusted Advisor checks' implies Business support or higher. Mixing up CloudTrail and CloudWatch is one of the most common Cloud Practitioner mistakes, so slow down on those questions."
  ],
  "terms": [
   [
    "AWS CloudTrail",
    "A service that records API calls and account activity, showing who did what, when and from where."
   ],
   [
    "Event history",
    "The CloudTrail console view of the last 90 days of management events in a Region, available at no charge."
   ],
   [
    "Trail",
    "A CloudTrail configuration that delivers log files to an S3 bucket for long-term retention and analysis."
   ],
   [
    "Amazon CloudWatch",
    "A monitoring service for metrics, logs, dashboards and alarms."
   ],
   [
    "CloudWatch alarm",
    "A watch on a metric that notifies or takes action when a threshold is crossed."
   ],
   [
    "Metric filter",
    "A CloudWatch Logs pattern that turns matching log events into a metric you can alarm on."
   ],
   [
    "AWS Trusted Advisor",
    "A service that checks your account against best practices for cost, performance, security, fault tolerance, service limits and operational excellence."
   ]
  ],
  "example": "An e-commerce company's database was deleted over a weekend, and nobody knew how. Its organization trail showed the DeleteDBInstance call came from a developer's role during an automation test gone wrong. The company then added deletion protection, created a CloudWatch alarm on CloudTrail events for database deletions, and reviewed Trusted Advisor's security checks, which also revealed two security groups open to the internet.",
  "tip": "'Who made this change?' or 'audit API calls' is CloudTrail. 'CPU utilization', 'set an alarm' or 'collect application logs' is CloudWatch. 'Best practice recommendations including open security groups and root MFA' is Trusted Advisor.",
  "check": [
   [
    "Which service tells you which IAM identity deleted an S3 bucket?",
    "AWS CloudTrail, which records API calls with the caller identity, time and source IP."
   ],
   [
    "How can you be alerted when the root user signs in?",
    "Send CloudTrail logs to CloudWatch Logs, create a metric filter for root sign-in events and set a CloudWatch alarm that notifies through SNS (an EventBridge rule also works)."
   ],
   [
    "How far back does CloudTrail Event history go without creating a trail?",
    "90 days of management events in the Region."
   ],
   [
    "What is needed to get the full set of Trusted Advisor checks?",
    "A Business, Enterprise On-Ramp or Enterprise support plan; other customers get the core security and service quota checks."
   ]
  ]
 },
 {
  "t": "Where to get security help: AWS security documentation, AWS Knowledge Center, AWS Marketplace security products and AWS Partners",
  "body": [
   "No one secures a cloud environment alone. Even a skilled team needs official guidance on how each service works, quick answers to common problems, security products it does not want to build itself and, sometimes, outside experts. The Cloud Practitioner exam expects you to know where to turn for each of these needs and to tell the resources apart, because several of them sound similar. Think of them as four shelves: official documentation, self-service answers, products to buy, and people to hire.",
   "AWS security documentation is the starting point. Every service's documentation has a Security chapter that explains how the shared responsibility model applies to that service, which encryption and access controls it offers, how to log its activity and which compliance programs cover it. The AWS Security Blog publishes practical guidance and new feature walk-throughs, and AWS Security Bulletins announce security issues that affect AWS services, together with any action customers need to take. For deeper best practice, read the Security Pillar of the AWS Well-Architected Framework and the security whitepapers, which explain principles such as least privilege, traceability and protecting data in transit and at rest. The AWS Prescriptive Guidance library adds step-by-step patterns.",
   "The AWS Knowledge Center is a collection of articles and videos that answer the questions AWS Support receives most often, such as how to troubleshoot an Access Denied error on an Amazon Simple Storage Service (Amazon S3) bucket or how to rotate access keys. It is now hosted on AWS re:Post, AWS's community question-and-answer site, where anyone can ask a question and get answers from other customers and AWS experts. Neither requires a paid Support plan. When your question is common and practical, these are faster than opening a support case; when it concerns your specific account and an urgent problem, a support case is the right path.",
   "AWS Marketplace is a curated digital catalog of third-party software, data and services that run on AWS. For security you can find next-generation firewalls, endpoint protection, vulnerability scanners, identity tools and security information and event management (SIEM) products. Many listings offer free trials and pay-as-you-go pricing, and charges appear on your AWS bill, which simplifies procurement. Marketplace is the answer when an organization wants to keep using a security vendor it already knows, or wants a ready product rather than building a control from AWS services such as AWS WAF (web application firewall) or Amazon GuardDuty.",
   "When you need people rather than products, look to the AWS Partner Network (APN). Consulting (services) partners can design and implement security controls, run assessments, or provide managed detection and response, and partners with an AWS Security Competency have had their expertise validated by AWS. AWS Professional Services, AWS's own consulting team, works on large engagements, often alongside partners. Two more contacts matter: AWS Artifact is where you download AWS's compliance reports and agreements, and the AWS Trust & Safety team is where you report AWS resources being used for abuse, such as spam, port scanning or phishing sites.",
   "Consider a worked example. A small retailer moving to AWS wants three things: to understand how encryption works in Amazon Relational Database Service (Amazon RDS), a familiar firewall product it already licenses on premises, and help designing a secure multi-account setup. The security team reads the Security chapter of the RDS documentation for encryption options. It subscribes to the vendor's firewall appliance through AWS Marketplace, with charges added to its AWS bill. It hires an APN consulting partner with a security specialization to design the account structure. When an engineer hits an Access Denied error, a Knowledge Center article on re:Post solves it in minutes.",
   "Common mistakes: thinking AWS Marketplace sells only AWS products (it is mostly third-party); looking for compliance reports in Marketplace or the Knowledge Center instead of AWS Artifact; sending abuse reports to AWS Support or expecting GuardDuty to handle them, when the Trust & Safety team is the contact; and assuming re:Post or the Knowledge Center need a paid Support plan. Another trap is confusing APN partners (outside companies) with AWS Professional Services (AWS employees). Both provide expertise, but the question wording usually tells you which one is meant.",
   "Exam questions are usually short scenarios with a clue word. 'Official guidance on how a service handles security' points to AWS documentation or the Security Pillar. 'Answers to frequently asked technical questions' points to the Knowledge Center, and 'community forum' or 'ask the community' points to re:Post. 'Purchase a third-party security tool billed through AWS' points to AWS Marketplace. 'Hire experts to help design or run security' points to AWS Partners or AWS Professional Services. 'Report spam or an attack coming from an AWS IP address' points to AWS Trust & Safety."
  ],
  "terms": [
   [
    "AWS Knowledge Center",
    "A collection of articles and videos, hosted on re:Post, answering the questions AWS Support receives most often."
   ],
   [
    "AWS re:Post",
    "AWS's community question-and-answer site where customers and AWS experts answer technical questions."
   ],
   [
    "AWS Marketplace",
    "A curated catalog of third-party software, data and services that run on AWS and can be billed through your AWS account."
   ],
   [
    "AWS Partner Network (APN)",
    "The global community of consulting and technology companies that build services and solutions on AWS."
   ],
   [
    "AWS Security Bulletins",
    "Official notices of security issues affecting AWS services and any action customers need to take."
   ],
   [
    "AWS Trust & Safety team",
    "The AWS team that receives reports of AWS resources being used for abuse such as spam or attacks."
   ],
   [
    "Security Competency",
    "An AWS validation showing a partner has proven expertise and customer success in security."
   ]
  ],
  "example": "A healthcare startup needs an intrusion detection product it already trusts, but its on-premises license does not transfer. The team finds the vendor's listing in AWS Marketplace, subscribes with hourly pricing that appears on the AWS bill, and deploys it in a day. To review the overall design before going live, it engages an APN consulting partner with a security specialization, and it uses AWS Artifact to download the reports its auditors request.",
  "tip": "Marketplace sells mostly third-party products. Compliance reports come from AWS Artifact, common answers from the Knowledge Center or re:Post, hired experts from APN partners or Professional Services, and abuse reports go to Trust & Safety.",
  "check": [
   [
    "A company wants to buy a familiar vendor's firewall and pay for it through its AWS bill. Where should it look?",
    "AWS Marketplace, the curated catalog of third-party software that can be billed through the AWS account."
   ],
   [
    "Where do you find step-by-step answers to common problems such as troubleshooting Access Denied errors?",
    "The AWS Knowledge Center (hosted on re:Post), which collects answers to the questions AWS Support gets most often."
   ],
   [
    "An organization wants outside experts with validated security expertise to design its controls. What should it use?",
    "An AWS Partner Network consulting partner, ideally one with an AWS Security Competency or specialization."
   ],
   [
    "Is AWS Marketplace the place to download AWS's SOC reports?",
    "No. AWS's own compliance reports and agreements are downloaded from AWS Artifact."
   ]
  ]
 },
 {
  "t": "Ways to use AWS: AWS Management Console, AWS CLI, SDKs, APIs and infrastructure as code with AWS CloudFormation",
  "body": [
   "Everything you do in AWS, whether creating a bucket, launching a server or reading a bill, is ultimately an application programming interface (API) call to an AWS service. Each request is authenticated with your credentials, checked against your permissions and usually recorded by AWS CloudTrail. The different ways of using AWS are simply different front ends for those same APIs. The exam asks you to match each front end to the kind of work it suits: exploring, scripting, writing applications or building repeatable infrastructure.",
   "The AWS Management Console is the web-based interface. You sign in through a browser, pick a Region from the menu at the top, and use wizards and dashboards. It is ideal for learning, exploring a new service, one-off tasks and visual monitoring, and the AWS Console Mobile Application lets you check resources and alarms on the go. The console is easy but not repeatable: if you must build the same environment ten times, clicking through it ten times is slow, error-prone and hard to audit. Console sign-in should use an IAM Identity Center user or an IAM user with multi-factor authentication (MFA), never the root user for daily work, and every click still becomes an API call recorded in CloudTrail.",
   "The AWS Command Line Interface (AWS CLI) lets you control services by typing commands in a terminal, which makes tasks scriptable. You set it up with `aws configure` (or, better, single sign-on with `aws configure sso`) and then run commands such as `aws s3 ls` or `aws ec2 describe-instances --region eu-west-1`. AWS CloudShell is a browser-based shell launched from the console that is already authenticated as your console identity and has the CLI installed, so you need no local setup or stored keys. The CLI prints results as JSON, text or tables, and the `--query` option filters output, which makes it easy to feed results into other scripts. The example below creates a bucket, uploads a file and lists the contents.",
   "```bash\naws s3 mb s3://example-lesson-bucket-12345\naws s3 cp report.csv s3://example-lesson-bucket-12345/\naws s3 ls s3://example-lesson-bucket-12345/\n```",
   "Software development kits (SDKs) let application code call AWS services in languages such as Python (Boto3), JavaScript, Java, Go and .NET. The SDK signs each request, handles retries and turns responses into native objects, so a photo-sharing app can upload to S3 with one function call. You could call the HTTPS APIs directly, but the SDKs and CLI are far more convenient. Infrastructure as code (IaC) goes further: with AWS CloudFormation you describe resources such as a virtual private cloud (VPC), subnets, instances and a database in a JSON or YAML template, and CloudFormation creates them together as a stack, in the right order, and can update or delete the whole stack consistently. Templates can be version-controlled and reviewed like code. The AWS Cloud Development Kit (CDK) lets you write the same infrastructure in a programming language and generates CloudFormation for you.",
   "Consider a worked example. A team builds its first test environment by clicking through the console, which is fine for learning. When it needs identical development, test and production environments in two Regions, it writes a CloudFormation template and deploys it with `aws cloudformation deploy --template-file app.yaml --stack-name shop-dev`. An operations engineer uses the CLI in a nightly script to copy logs to S3, and the web application itself uses the Python SDK to store customer uploads. Each tool is used where it fits best.",
   "Common mistakes: believing the console and CLI reach different features (they call the same APIs, though a brand-new feature may appear in one first); thinking CloudFormation is only for large companies; forgetting that deleting a stack deletes the resources it created; storing long-term access keys on laptops when CloudShell or temporary credentials would do; and confusing CloudFormation, which provisions infrastructure, with AWS Elastic Beanstalk, which deploys an application onto infrastructure it manages for you. Another trap is assuming the CLI makes things repeatable on its own; only scripts or templates kept in version control do.",
   "On the exam, 'explore a service' or 'one-time task through a graphical interface' points to the Management Console. 'Automate tasks with scripts' or 'terminal' points to the AWS CLI, and 'without installing anything on the laptop' suggests CloudShell. 'Call AWS from application code' points to an SDK. 'Deploy the same infrastructure repeatedly and consistently', 'across accounts or Regions', 'templates' or 'infrastructure as code' point to AWS CloudFormation, with the CDK as the answer when developers want a familiar programming language."
  ],
  "terms": [
   [
    "AWS Management Console",
    "The browser-based graphical interface for managing AWS services."
   ],
   [
    "AWS CLI",
    "The command line tool for calling AWS service APIs from a terminal or script."
   ],
   [
    "AWS CloudShell",
    "A browser-based, pre-authenticated shell with the AWS CLI installed, launched from the console."
   ],
   [
    "SDK",
    "A software development kit: language-specific libraries that let application code call AWS APIs."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining and provisioning infrastructure through machine-readable templates or code rather than manual steps."
   ],
   [
    "AWS CloudFormation",
    "The AWS service that creates, updates and deletes resources as a stack from a JSON or YAML template."
   ],
   [
    "AWS CDK",
    "The Cloud Development Kit, which defines infrastructure in a programming language and synthesizes CloudFormation templates."
   ]
  ],
  "example": "A software company onboards a new customer every week, and each customer gets an isolated environment with a VPC, load balancer, database and monitoring. Building each by hand in the console took a day and produced small differences that caused outages. The team captured the design in a CloudFormation template stored in Git, and now a pipeline creates each environment as a stack in under an hour, identical every time, and removes it cleanly when a customer leaves.",
  "tip": "Repeatable, consistent deployment across accounts or Regions, or 'infrastructure as code', means CloudFormation. The CLI scripts tasks and SDKs are for application code; neither is the IaC answer.",
  "check": [
   [
    "A developer's application must upload files to S3 from Python code. Which access method fits?",
    "An AWS SDK (Boto3 for Python), which lets application code call AWS APIs with signing and retries handled."
   ],
   [
    "Which service lets you define a VPC, instances and database in a YAML file and create them together?",
    "AWS CloudFormation, which provisions the resources as a stack from the template."
   ],
   [
    "How can an administrator run CLI commands without installing or configuring anything locally?",
    "Use AWS CloudShell, a pre-authenticated browser shell with the CLI installed."
   ],
   [
    "Why is the console a poor choice for building identical production environments in three Regions?",
    "Manual clicks are not repeatable or auditable, so environments drift; a template-based approach like CloudFormation is consistent."
   ]
  ]
 },
 {
  "t": "Deployment models (cloud, hybrid and on-premises) and one-time vs repeatable provisioning",
  "body": [
   "A deployment model describes where your applications and their infrastructure run. AWS describes three: cloud, hybrid and on-premises. The exam gives you a scenario and asks which model it is, or why an organization might choose it, so focus on the clues. This topic also covers how you create resources, either once by hand or repeatably through code, because the choice affects reliability, security and your ability to recover.",
   "In a cloud deployment, sometimes called cloud-native or all-in, every part of the application runs in the cloud. It may have been built there from the start or fully migrated. It can use low-level infrastructure such as Amazon Elastic Compute Cloud (Amazon EC2) instances, or higher-level managed and serverless services such as AWS Lambda and Amazon DynamoDB. A company with no data center of its own that runs everything on AWS uses the cloud model, even if it spreads workloads across several Regions or accounts.",
   "A hybrid deployment connects cloud resources to infrastructure that stays on premises. Organizations choose hybrid when some systems cannot move yet because of regulations, very low latency needs, dependence on local hardware such as factory equipment, or a gradual migration plan, while still wanting cloud benefits elsewhere. A company might keep its legacy enterprise resource planning (ERP) system in its own data center and run new customer-facing web apps on AWS, linked by AWS Site-to-Site VPN or AWS Direct Connect. Services such as AWS Outposts, AWS Storage Gateway and AWS Systems Manager, which can manage on-premises servers, support hybrid setups. The key idea is that the two environments work together as one system: users, data and management tools span both, rather than simply existing side by side.",
   "An on-premises deployment, sometimes called a private cloud, runs resources in the organization's own data center using virtualization and resource management tools to get some cloud-like agility. It gives maximum physical control but not the scale, global reach or pay-as-you-go economics of the public cloud. The organization buys the hardware up front, a capital expense (CapEx), and must plan capacity in advance, whereas the cloud turns this into a variable operating expense (OpEx).",
   "Provisioning is how you create resources, and it can be one-time or repeatable. One-time provisioning, such as launching a test instance in the console, is fine for experiments and learning. Repeatable provisioning uses code or templates, such as AWS CloudFormation, the AWS Cloud Development Kit or CLI scripts in version control, so the same configuration can be recreated in another environment, account or Region. Production should be provisioned repeatably because manual steps are easy to forget, hard to audit and nearly impossible to reproduce exactly after a disaster. Templates also make reviews possible: a colleague can check a security group rule in a pull request before it reaches production.",
   "Consider a worked example. A manufacturer runs machine-control software that must respond within milliseconds on the factory floor, while its online store and analytics can run anywhere. It keeps the control systems in the plant, deploys the store on AWS, and connects the two with Direct Connect, a hybrid model. The store's environment is defined in a CloudFormation template, so the team can stand up a staging copy for testing and rebuild production in another Region during a disaster recovery drill. The first prototype, built by hand in the console, was one-time provisioning and was deleted afterward.",
   "Common mistakes: calling a multi-Region or multi-account AWS design 'hybrid' (it is still cloud, because nothing runs on premises); assuming hybrid is always a temporary state (for some regulated or latency-sensitive workloads it is a long-term choice); thinking private cloud means a dedicated AWS account; and treating repeatable provisioning as optional for production. Another trap is assuming Outposts makes a workload 'cloud only'; Outposts hardware sits in your facility, so it supports hybrid designs.",
   "On the exam, look for location clues. 'Everything runs on AWS' or 'no data center' means cloud. 'Keeps some systems in its own data center and connects them to AWS' means hybrid. 'Virtualization in the company's own data center' means on-premises or private cloud. For provisioning, 'consistent', 'repeatable', 'multiple environments' or 'recover quickly by recreating infrastructure' point to repeatable provisioning with infrastructure as code, while 'quick experiment' or 'one-off test' is where one-time console provisioning is acceptable."
  ],
  "terms": [
   [
    "Cloud deployment",
    "A model where all parts of an application run in the cloud."
   ],
   [
    "Hybrid deployment",
    "A model that connects cloud resources with infrastructure that remains on premises."
   ],
   [
    "On-premises (private cloud)",
    "A model where resources run in the organization's own data center using virtualization and management tools."
   ],
   [
    "One-time provisioning",
    "Creating resources manually for a single use, typically through the console."
   ],
   [
    "Repeatable provisioning",
    "Creating resources from code or templates so the same configuration can be recreated consistently."
   ],
   [
    "AWS Outposts",
    "AWS-managed hardware installed in a customer's facility to run AWS services on premises."
   ]
  ],
  "example": "A bank must keep its core ledger on hardware in its own data centers for regulatory reasons, but wants to use AWS for a new mobile banking front end and fraud analytics. It links the data center to a VPC with AWS Direct Connect and a backup Site-to-Site VPN, creating a hybrid deployment. All the AWS pieces are defined in CloudFormation so auditors can review changes and the bank can rebuild them in a second Region.",
  "tip": "Hybrid needs both on-premises infrastructure and cloud resources connected together. Multi-Region or multi-account designs that run entirely on AWS are still the cloud model.",
  "check": [
   [
    "A startup with no servers of its own runs all workloads on AWS in two Regions. Which deployment model is this?",
    "Cloud (all-in), because nothing runs on premises; multiple Regions does not make it hybrid."
   ],
   [
    "Name two reasons an organization might choose a hybrid model.",
    "Regulations or data that must stay on premises, very low latency to local equipment, or a gradual migration of legacy systems."
   ],
   [
    "Why should production infrastructure be provisioned repeatably?",
    "Templates or code recreate the same configuration consistently, can be reviewed and audited, and allow fast rebuilding after a disaster."
   ],
   [
    "Which AWS offering places AWS hardware and services inside a customer's own data center?",
    "AWS Outposts."
   ]
  ]
 },
 {
  "t": "AWS global infrastructure: Regions, Availability Zones, edge locations, Local Zones, Wavelength Zones and AWS Outposts",
  "body": [
   "AWS runs its services on a worldwide network of facilities, and the building blocks each serve a different purpose. Understanding them lets you design for high availability, low latency and compliance, and the exam frequently asks which building block solves a given problem. Work from the largest unit to the most specialized: Regions, Availability Zones, edge locations, then Local Zones, Wavelength Zones and Outposts.",
   "A Region is a separate geographic area, such as a metropolitan area in a particular country, that contains multiple isolated Availability Zones. Regions are independent of each other, and your data does not leave a Region unless you move or replicate it, which is why Regions matter for data residency. Most services are Regional, so you choose the Region when you create a resource, and resources in one Region are not visible in another. A few services, such as AWS Identity and Access Management (IAM), Amazon Route 53 and Amazon CloudFront, are global. Region codes look like `us-east-1` or `eu-central-1`.",
   "An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking and connectivity within a Region. AZs are physically separated by a meaningful distance, so a flood, fire or power failure is unlikely to affect more than one, but they are linked by high-bandwidth, low-latency networking so you can replicate synchronously between them. Deploying across multiple AZs, for example EC2 instances in two AZs behind a load balancer and an Amazon RDS Multi-AZ database, is the standard way to achieve high availability. AWS builds Regions with multiple AZs, typically three or more.",
   "Edge locations are sites in many more cities than there are Regions. Amazon CloudFront, the content delivery network, caches content at them close to viewers, and Route 53, AWS Global Accelerator and AWS WAF also operate there to cut latency and absorb attacks near the source. You do not launch EC2 instances in edge locations; they serve and protect content rather than host your servers. Because a cached copy is served from a nearby edge location, the origin in the Region receives fewer requests, which improves both speed for viewers and resilience for your application. AWS Shield Standard protection is also applied at the edge.",
   "Some workloads need lower latency than a Region provides. AWS Local Zones extend a parent Region by placing compute, storage and database services close to large population and industry centers, giving single-digit-millisecond latency for work such as real-time gaming, media production or live video. AWS Wavelength Zones embed compute and storage inside telecommunications providers' 5G networks, so mobile devices reach applications without traffic leaving the carrier network. AWS Outposts brings AWS-designed racks or servers into your own data center, running AWS services on premises with the same APIs, console and tools, for workloads that need local data processing, data residency or very low latency to on-premises systems.",
   "Consider a worked example. A streaming company serves viewers worldwide from `eu-west-1`. It runs its web tier on instances in three AZs behind a load balancer, so the loss of one data center does not interrupt service. CloudFront caches video segments at edge locations near viewers. Its live-production studio in a large city uses a Local Zone for editing workstations, a mobile game feature uses Wavelength for 5G users, and a partner broadcaster that must keep raw footage on site runs an Outposts rack. For disaster recovery, backups are copied to a second Region.",
   "Common mistakes: thinking an AZ is a single building (it can be several data centers); using multiple AZs when the requirement is surviving the loss of an entire Region (that needs multiple Regions); expecting to run EC2 instances at edge locations; confusing Local Zones (near a city) with Wavelength (inside a 5G network); and assuming Outposts is a Region you pick from a list. Another trap is believing data automatically replicates between Regions; it does not unless you configure replication.",
   "On the exam, 'high availability' or 'survive a data center failure' points to multiple AZs. 'Disaster recovery from a Region-wide event' or 'data must stay in a country' points to Regions. 'Cache content close to global users' points to edge locations with CloudFront. 'Single-digit millisecond latency for users in a specific metropolitan area' points to Local Zones, '5G mobile devices' points to Wavelength, and 'AWS services running in the customer's own data center' is always Outposts."
  ],
  "terms": [
   [
    "Region",
    "A separate geographic area containing multiple isolated Availability Zones."
   ],
   [
    "Availability Zone (AZ)",
    "One or more discrete data centers with redundant power and networking, isolated from others in the same Region."
   ],
   [
    "Edge location",
    "A site used by CloudFront and other edge services to cache content and serve users with low latency."
   ],
   [
    "AWS Local Zone",
    "An extension of a Region that places AWS services close to a large city for single-digit-millisecond latency."
   ],
   [
    "AWS Wavelength Zone",
    "AWS compute and storage embedded in a telecom provider's 5G network for ultra-low-latency mobile applications."
   ],
   [
    "AWS Outposts",
    "AWS-designed hardware installed on premises that runs AWS services with the same APIs and tools."
   ],
   [
    "High availability",
    "Designing a system to keep running when a component or location fails, typically by using multiple AZs."
   ]
  ],
  "example": "An online retailer deployed its application in a single AZ to save effort. When that data center lost power, the site went offline for hours. The team redesigned: instances in three AZs behind an Application Load Balancer, an RDS Multi-AZ database, and CloudFront at edge locations for product images. A later AZ outage caused no visible downtime, and nightly backups copied to another Region protect against a Region-wide disaster.",
  "tip": "High availability questions want multiple Availability Zones; surviving a whole-Region event wants multiple Regions. 'AWS services in the customer's own data center' is Outposts, and '5G' is Wavelength.",
  "check": [
   [
    "What is the standard way to make an application highly available within a Region?",
    "Deploy it across multiple Availability Zones, for example behind a load balancer with a Multi-AZ database."
   ],
   [
    "Can you launch EC2 instances in an edge location?",
    "No. Edge locations serve CloudFront and other edge services; instances run in Regions, Local Zones, Wavelength Zones or Outposts."
   ],
   [
    "A game studio needs single-digit-millisecond latency for players in one large city. Which option fits?",
    "An AWS Local Zone in or near that city, extending the parent Region."
   ],
   [
    "Does data stored in one Region automatically copy to another?",
    "No. Data stays in its Region unless you explicitly move or replicate it."
   ]
  ]
 },
 {
  "t": "Choosing a Region: compliance and data residency, latency to users, service availability and price",
  "body": [
   "Every time you create most AWS resources, you choose a Region, and that decision is hard to reverse once data and users depend on it. AWS teaches four factors to weigh: compliance and data residency, proximity to users (latency), service availability, and price. The exam often describes a situation and asks which factor should drive the decision, so you need to know each one and the order in which they usually apply.",
   "Compliance and data residency usually come first. Laws, regulations or contracts may require that certain data stays in a specific country or jurisdiction, for example personal data under a national privacy law or government records. Because data you store in a Region stays there unless you explicitly move or replicate it, choosing a Region in the required country satisfies many residency requirements. If a regulation says customer records must remain in a particular country, only Regions in that country are candidates, whatever the price or latency elsewhere. You can reinforce the choice with a service control policy (SCP) in AWS Organizations that denies actions in unapproved Regions.",
   "Proximity to your users is next. Data takes time to travel, so running an application in a Region close to its customers makes it feel faster. A company whose customers are mostly on one continent should normally choose a Region there. For global audiences you can run in several Regions, or use one Region plus Amazon CloudFront edge locations to cache content near users, and Amazon Route 53 latency-based routing to send each user to the closest Region.",
   "Service availability matters because not every AWS service, feature or instance type is offered in every Region. New services often launch in a few Regions first and expand later. If your design depends on a specific service, such as a particular machine learning service or a newer instance family, confirm it is available in the Region you plan to use; the AWS Regional Services list shows this. Newer Regions may also have fewer Availability Zones. Checking early avoids a painful redesign later, because moving an application and its data to another Region after launch means migrating data, updating DNS and retesting everything.",
   "Pricing varies by Region. The same instance type or gigabyte of storage can cost different amounts in different Regions because of local costs such as power, land and taxes. When compliance and latency allow several choices, price can be the tie-breaker, and the AWS Pricing Calculator lets you compare Regions side by side, using your own expected usage rather than list prices alone. Remember data transfer too: moving data between Regions is charged, so splitting a chatty application across Regions to save on compute can cost more overall.",
   "Consider a worked example. A healthcare company in Germany must keep patient data in Germany, most of its users are in Central Europe, and it plans to use a managed database service and a specific analytics service. Compliance rules out every Region outside Germany, leaving the Frankfurt Region (`eu-central-1`). The team confirms both services are available there, checks that latency to its users is good, and prices the design in the Pricing Calculator. Price never became the deciding factor because compliance had already narrowed the options to one. An SCP now blocks resource creation in other Regions.",
   "Common mistakes: choosing the cheapest Region first and discovering later that it breaks a residency law; assuming every service exists in every Region; believing that choosing a Region automatically backs up data elsewhere; and forgetting that some services are global, so Region choice does not affect them. Another trap is treating latency as irrelevant for internal tools; a Region far from staff can make daily work sluggish. Finally, a lower hourly price can be outweighed by cross-Region data transfer if components talk constantly.",
   "Exam questions tend to include one strong clue. 'Laws require data to stay in the country' or 'data sovereignty' means compliance decides, overriding price and latency. 'Users complain the application is slow from their location' points to proximity. 'The service is not offered in the chosen Region' points to service availability. 'Lowest cost among Regions that meet the requirements' points to pricing as the final filter. A good order of thinking is compliance, then latency, then service availability, then price."
  ],
  "terms": [
   [
    "Data residency",
    "A requirement that data be stored in a specific geographic location or jurisdiction."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country in which it is stored."
   ],
   [
    "Latency",
    "The delay between a request and its response, which grows with distance to the Region."
   ],
   [
    "Service availability",
    "Whether a given AWS service, feature or instance type is offered in a particular Region."
   ],
   [
    "AWS Pricing Calculator",
    "A free tool for estimating and comparing the cost of an architecture, including across Regions."
   ],
   [
    "Service control policy (SCP)",
    "An AWS Organizations policy that sets the maximum permissions in accounts, for example blocking unapproved Regions."
   ]
  ],
  "example": "An Australian online bank must keep customer financial data in Australia under its regulator's guidance. It selects the Sydney Region, which also gives low latency to its customers, confirms the managed database and fraud-detection services it needs are available there, and uses the Pricing Calculator to size the budget. An SCP denies any resource creation in other Regions so a developer cannot accidentally store data overseas.",
  "tip": "If a scenario mentions a legal or regulatory requirement about where data lives, that factor wins over price and latency. Rule out non-compliant Regions first, then weigh latency, services and price.",
  "check": [
   [
    "A law requires customer data to stay in Canada, but a US Region is cheaper. Which should you choose?",
    "A Region in Canada, because compliance and data residency override price."
   ],
   [
    "Users in Asia report slow response from an application hosted in Europe. Which Region factor is involved?",
    "Proximity to users (latency); a closer Region or CloudFront caching would help."
   ],
   [
    "A team's design depends on a service that launched recently. What should it check before choosing a Region?",
    "That the service and needed features are available in that Region, using the AWS Regional Services list."
   ],
   [
    "When is price the right deciding factor for Region selection?",
    "When several Regions already meet compliance, latency and service availability needs; then price can break the tie."
   ]
  ]
 },
 {
  "t": "Amazon EC2 instance families, AMIs, Elastic Load Balancing and Amazon EC2 Auto Scaling",
  "body": [
   "Amazon Elastic Compute Cloud (Amazon EC2) provides resizable virtual servers called instances. You choose the operating system, size and configuration, and you get full control, including administrator or root access. Under the shared responsibility model that control means you are responsible for patching and securing the guest operating system, configuring security groups and managing the software you install. EC2 is infrastructure as a service (IaaS): AWS runs the hardware and virtualization, and you run everything above it.",
   "Instance types are grouped into families optimized for different workloads. General purpose instances balance compute, memory and networking and suit web servers and code repositories. Compute optimized instances have high-performance processors for batch processing, game servers, media transcoding and scientific modeling. Memory optimized instances suit in-memory databases and real-time big data analytics. Accelerated computing instances use hardware accelerators such as graphics processing units (GPUs) for machine learning, graphics and other parallel work. Storage optimized instances provide high, low-latency local storage throughput for data warehousing and large transactional databases. A type name such as `m7g.large` encodes the family letter, generation, optional attributes and size.",
   "An Amazon Machine Image (AMI) is the template used to launch an instance. It contains the operating system, preinstalled software and configuration. You can use AMIs provided by AWS, subscribe to AMIs in AWS Marketplace, or create your own from a configured instance so every new server starts identical, a building block for automation and Auto Scaling. AMIs are Regional, but you can copy them to other Regions.",
   "Elastic Load Balancing (ELB) automatically distributes incoming traffic across targets such as EC2 instances in multiple Availability Zones and sends traffic only to targets that pass health checks. The Application Load Balancer (ALB) works at layer 7 for HTTP and HTTPS and can route by URL path or host name, for example sending `/api/*` to one group and `/images/*` to another. The Network Load Balancer (NLB) works at layer 4 for TCP and UDP, handling very high throughput with low latency and supporting static IP addresses. The Gateway Load Balancer (GWLB) deploys and scales third-party virtual appliances such as firewalls.",
   "Amazon EC2 Auto Scaling automatically adds or removes instances in an Auto Scaling group to match demand. You set a minimum, maximum and desired capacity, point it at a launch template that names the AMI and instance type, and add scaling policies such as target tracking to keep average CPU near 50 percent, or scheduled scaling for known busy periods. Auto Scaling also replaces instances that fail health checks. Together, ELB and Auto Scaling give you an elastic, highly available web tier: capacity grows during peaks, shrinks when idle so you stop paying for it, and heals itself.",
   "Consider a worked example. An online ticket seller has quiet weeks and sudden spikes when concerts go on sale. It builds a golden AMI with its application, creates a launch template using general purpose instances, and defines an Auto Scaling group across three AZs with a minimum of two instances and a maximum of twenty. An ALB routes `/checkout` and `/search` to separate target groups. When sales open, CPU rises, target tracking adds instances, and the ALB spreads traffic across them. Overnight the group shrinks back to two, and an instance that crashes is replaced automatically.",
   "Common mistakes: forgetting that the customer patches the guest OS on EC2; picking a family by name rather than workload (in-memory databases need memory optimized, not compute optimized); assuming a load balancer alone adds capacity (Auto Scaling adds instances; ELB spreads traffic); choosing the NLB when path-based HTTP routing is needed; and running everything in one AZ, which defeats the purpose of load balancing. Another trap is thinking Auto Scaling only scales out; it also scales in to save money.",
   "On the exam, match clue words. 'In-memory database' or 'large datasets in memory' means memory optimized. 'Batch processing', 'high-performance computing' or 'gaming servers' means compute optimized. 'Machine learning training' or 'graphics' means accelerated computing. 'High sequential read and write to local storage' means storage optimized. 'Template to launch identical instances' is an AMI. 'Distribute traffic across healthy instances' is ELB, with ALB for 'HTTP path or host routing' and NLB for 'extreme performance' or 'static IP'. 'Automatically add or remove instances with demand' is EC2 Auto Scaling."
  ],
  "terms": [
   [
    "Amazon EC2",
    "The AWS service that provides resizable virtual servers called instances."
   ],
   [
    "Instance family",
    "A group of instance types optimized for a workload type, such as compute, memory or storage."
   ],
   [
    "AMI",
    "An Amazon Machine Image: the template of OS, software and configuration used to launch an instance."
   ],
   [
    "Elastic Load Balancing (ELB)",
    "A service that distributes traffic across healthy targets in multiple Availability Zones."
   ],
   [
    "Application Load Balancer (ALB)",
    "A layer 7 load balancer for HTTP and HTTPS that can route by path or host name."
   ],
   [
    "Network Load Balancer (NLB)",
    "A layer 4 load balancer for TCP and UDP with very high performance and static IP support."
   ],
   [
    "EC2 Auto Scaling",
    "A service that adds or removes EC2 instances automatically to match demand and replaces unhealthy ones."
   ],
   [
    "Launch template",
    "A saved configuration naming the AMI, instance type and settings that Auto Scaling uses to launch instances."
   ]
  ],
  "example": "A university's enrollment site runs on two instances most of the year but collapses on the first day of registration. The IT team creates an AMI of the configured server, an Auto Scaling group across two AZs with scheduled scaling to twelve instances on registration morning plus target tracking on CPU, and an Application Load Balancer in front. Registration day now runs smoothly and the group shrinks automatically afterward.",
  "tip": "Match the workload to the family: in-memory databases are memory optimized, batch or HPC is compute optimized, ML training or graphics is accelerated computing. HTTP path-based routing means an Application Load Balancer.",
  "check": [
   [
    "Which EC2 instance family suits a large in-memory database?",
    "Memory optimized, because it provides a high ratio of memory to compute."
   ],
   [
    "What is the difference between Elastic Load Balancing and EC2 Auto Scaling?",
    "ELB distributes traffic across healthy targets; Auto Scaling changes the number of instances to match demand."
   ],
   [
    "Which load balancer can send requests for /api to one set of servers and /images to another?",
    "The Application Load Balancer, which routes at layer 7 by path or host."
   ],
   [
    "What does an AMI provide?",
    "A template with the OS, software and configuration used to launch identical instances."
   ]
  ]
 },
 {
  "t": "Containers and serverless compute: Amazon ECS, Amazon EKS, AWS Fargate, AWS Lambda and AWS Elastic Beanstalk",
  "body": [
   "Amazon EC2 is not the only way to run code on AWS. Containers and serverless services remove progressively more server management from your plate, which shifts more of the shared responsibility model to AWS. The exam checks that you can choose among Amazon Elastic Container Service (Amazon ECS), Amazon Elastic Kubernetes Service (Amazon EKS), AWS Fargate, AWS Lambda and AWS Elastic Beanstalk from a short description of what a team wants.",
   "A container packages an application with its libraries and dependencies so it runs the same way on a laptop, a test server or production. Containers start in seconds and share the host's operating system kernel, so they are lighter than virtual machines. Running many containers across many hosts needs an orchestrator that places containers, restarts failed ones, scales them and connects them to load balancers. Container images are usually stored in Amazon Elastic Container Registry (Amazon ECR), a managed image registry.",
   "Amazon ECS is AWS's own fully managed container orchestration service. It is simple to adopt and deeply integrated with AWS features such as IAM roles, load balancers and Amazon CloudWatch; you describe containers in a task definition and run them as tasks or long-running services. Amazon EKS runs Kubernetes, the popular open-source orchestrator, with AWS managing the Kubernetes control plane. Choose EKS when a team already uses Kubernetes, wants its tooling, or needs portability to other environments; choose ECS when you want the simplest AWS-native option.",
   "Both ECS and EKS need compute capacity to run containers. You can supply EC2 instances that you manage and patch, or use AWS Fargate, a serverless compute engine for containers. With Fargate you do not provision, scale or patch servers; you declare the CPU and memory each task or pod needs and pay for those resources while it runs. The key distinction: ECS and EKS are orchestrators that decide what runs where, while Fargate is a place for their containers to run without managing servers.",
   "AWS Lambda runs code without provisioning servers at all, in response to events such as an object uploaded to Amazon S3, a message arriving in an Amazon SQS queue, an HTTP request through Amazon API Gateway, or a schedule from Amazon EventBridge. You upload a function, choose the memory size, and Lambda runs as many copies as events require. You pay per request and for compute time measured in small increments, with nothing charged when the function is idle. Lambda suits short, event-driven tasks; a single invocation can run for at most 15 minutes, so long-running processes belong on containers or EC2. AWS Elastic Beanstalk is a platform as a service (PaaS) for web applications: you upload code such as a Java, .NET, Python, Node.js or Docker application, and Beanstalk provisions and manages EC2 instances, a load balancer, Auto Scaling and health monitoring for you, while leaving those resources visible and adjustable.",
   "Consider a worked example. A media company has four needs. Its platform team already runs Kubernetes on premises and wants the same tools in AWS, so it uses EKS. A new microservice team wants containers without patching servers, so it runs ECS services on Fargate. When a user uploads a photo to S3, a Lambda function creates thumbnails in a second or two. A small marketing team with a Node.js web app and no infrastructure expertise deploys it with Elastic Beanstalk, which builds the load balancer and scaling for them.",
   "Common mistakes: thinking Fargate is an alternative to ECS or EKS (it is a launch type or compute option they use); choosing Lambda for a job that runs for hours; assuming serverless means there are no servers (AWS manages them for you); confusing Elastic Beanstalk with AWS CloudFormation (Beanstalk deploys an application onto an environment it builds; CloudFormation provisions whatever resources your template defines); and assuming ECR runs containers when it only stores images. Also remember that with Lambda and Fargate you still own your code, its permissions and its data.",
   "On the exam, follow the clue words. 'Kubernetes' means EKS. 'Run Docker containers with a simple AWS-native orchestrator' means ECS. 'Run containers without managing servers or clusters of instances' means Fargate. 'Run code in response to events, no servers, pay only when it runs' means Lambda. 'Upload code and AWS handles capacity, load balancing, scaling and monitoring' means Elastic Beanstalk. 'Store container images' means ECR. If an option describes a long-running process of several hours, eliminate Lambda."
  ],
  "terms": [
   [
    "Container",
    "A package of an application and its dependencies that runs consistently across environments and shares the host OS kernel."
   ],
   [
    "Amazon ECS",
    "AWS's fully managed container orchestration service."
   ],
   [
    "Amazon EKS",
    "A managed service for running Kubernetes on AWS, with AWS operating the control plane."
   ],
   [
    "AWS Fargate",
    "A serverless compute engine that runs ECS or EKS containers without you managing servers."
   ],
   [
    "AWS Lambda",
    "A serverless service that runs code in response to events and bills per request and compute time."
   ],
   [
    "AWS Elastic Beanstalk",
    "A platform as a service that deploys and manages web applications, handling capacity, load balancing and scaling."
   ],
   [
    "Amazon ECR",
    "A managed registry for storing and sharing container images."
   ]
  ],
  "example": "An insurance company receives scanned claim forms throughout the day. Each upload to an S3 bucket triggers a Lambda function that validates the file and places a message in a queue. A claims-processing service, packaged as containers and run by ECS on Fargate, reads the queue and processes each claim. No one on the team patches servers, the Lambda function costs nothing overnight when no claims arrive, and Fargate tasks scale with the queue length.",
  "tip": "'Kubernetes' means EKS; 'containers without managing servers' means Fargate; 'event-driven code, pay only when it runs' means Lambda; 'upload code and AWS handles the rest' means Elastic Beanstalk.",
  "check": [
   [
    "A team uses Kubernetes on premises and wants a managed equivalent on AWS. Which service fits?",
    "Amazon EKS, which runs Kubernetes with an AWS-managed control plane."
   ],
   [
    "What is the relationship between ECS and Fargate?",
    "ECS orchestrates containers; Fargate is a serverless compute option where those containers run without you managing EC2 instances."
   ],
   [
    "Why is Lambda a poor fit for a video-encoding job that runs for three hours?",
    "A Lambda invocation can run for at most 15 minutes, so long jobs belong on containers or EC2."
   ],
   [
    "A developer wants to deploy a Python web app without configuring load balancers or scaling. Which service?",
    "AWS Elastic Beanstalk, which provisions and manages that infrastructure automatically."
   ]
  ]
 },
 {
  "t": "Databases: Amazon RDS and Aurora, Amazon DynamoDB, Amazon ElastiCache, Amazon Redshift and other purpose-built databases",
  "body": [
   "AWS encourages you to choose a purpose-built database for each job rather than forcing every kind of data into one engine. You can run any database yourself on Amazon EC2, but then you install, patch, back up and replicate it. Managed database services take on that undifferentiated heavy lifting, so under the shared responsibility model AWS handles the database software and infrastructure, while you remain responsible for your data, schema design, access control and settings such as encryption.",
   "Amazon Relational Database Service (Amazon RDS) runs relational databases, which store data in tables with defined schemas, use Structured Query Language (SQL) and support joins and transactions. RDS supports engines such as MySQL, PostgreSQL, MariaDB, Oracle and Microsoft SQL Server, and handles provisioning, patching and automated backups with point-in-time restore. A Multi-AZ deployment keeps a standby in another Availability Zone and fails over automatically, which is for availability. Read replicas copy data asynchronously so they can serve read traffic, which is for performance. Amazon Aurora is AWS's own relational engine, compatible with MySQL and PostgreSQL, designed for higher performance and availability, with storage automatically replicated across multiple AZs; Aurora Serverless adjusts capacity automatically.",
   "Amazon DynamoDB is a fully managed, serverless NoSQL key-value and document database. It delivers consistent single-digit-millisecond performance at virtually any scale with no servers to manage, and suits applications with simple, high-volume access patterns such as shopping carts, gaming leaderboards, user profiles and session data. You choose on-demand capacity, which scales automatically and bills per request, or provisioned capacity with optional auto scaling. DynamoDB Accelerator (DAX) adds an in-memory cache, and global tables replicate data across Regions.",
   "Amazon ElastiCache provides managed in-memory caches compatible with Valkey, Redis OSS and Memcached. Putting a cache in front of a database keeps frequently read data in memory, cutting response times to sub-millisecond and reducing load on the database. Amazon Redshift is a data warehouse for analytics: it runs complex SQL queries over very large amounts of structured data for reporting and business intelligence, using columnar storage and parallel processing. It serves online analytical processing (OLAP), not an application's day-to-day online transaction processing (OLTP).",
   "Other purpose-built databases fill specific niches. Amazon Neptune is a graph database for highly connected data such as social networks, recommendation engines and fraud detection. Amazon DocumentDB (with MongoDB compatibility) stores JSON-like documents. Amazon Keyspaces is compatible with Apache Cassandra. Amazon Timestream handles time series data such as Internet of Things (IoT) sensor readings. Amazon MemoryDB is a durable in-memory database for when you need in-memory speed as the primary store. To move existing databases into these services, AWS Database Migration Service (AWS DMS) migrates data with minimal downtime, and the AWS Schema Conversion Tool helps when changing engines.",
   "Consider a worked example. An online store keeps orders, payments and inventory in Aurora PostgreSQL because it needs transactions across related tables, and runs it across multiple AZs. Its shopping carts and session data go into DynamoDB, which scales effortlessly during sales. Product pages are cached in ElastiCache so the database is not hit for every view. Nightly, order data is loaded into Redshift, where analysts run large reports without slowing the live store, and a Neptune graph powers 'customers who bought this also bought' recommendations.",
   "Common mistakes: confusing Multi-AZ (a standby for failover) with read replicas (extra copies for read scaling); picking Redshift for an application's transactions or RDS for petabyte-scale analytics; describing DynamoDB as relational; thinking ElastiCache is a primary database that keeps data durably (it is a cache); and forgetting that on RDS you cannot log in to the underlying operating system, whereas running a database on EC2 gives full control but full responsibility. Another trap is assuming managed means AWS configures your user permissions and encryption choices; those remain yours.",
   "On the exam, map keywords to services. 'Relational', 'SQL', 'joins' or 'transactions' means RDS or Aurora, with Aurora favored for 'MySQL or PostgreSQL compatible with higher performance'. 'NoSQL', 'key-value', 'serverless database' or 'millisecond latency at any scale' means DynamoDB. 'Caching' or 'in-memory to reduce database load' means ElastiCache. 'Data warehouse', 'business intelligence' or 'analytics over petabytes' means Redshift. 'Graph' or 'relationships between entities' means Neptune, 'MongoDB' means DocumentDB, and 'time series' means Timestream. 'High availability for RDS' means Multi-AZ."
  ],
  "terms": [
   [
    "Amazon RDS",
    "A managed service for relational database engines such as MySQL, PostgreSQL, MariaDB, Oracle and SQL Server."
   ],
   [
    "Amazon Aurora",
    "AWS's MySQL- and PostgreSQL-compatible relational engine with storage replicated across multiple AZs."
   ],
   [
    "Multi-AZ deployment",
    "An RDS configuration with a synchronous standby in another AZ for automatic failover."
   ],
   [
    "Read replica",
    "An asynchronously updated copy of a database used to offload read traffic."
   ],
   [
    "Amazon DynamoDB",
    "A serverless NoSQL key-value and document database with consistent single-digit-millisecond performance."
   ],
   [
    "Amazon ElastiCache",
    "A managed in-memory cache compatible with Valkey, Redis OSS and Memcached."
   ],
   [
    "Amazon Redshift",
    "A managed data warehouse for SQL analytics over large volumes of structured data."
   ],
   [
    "Amazon Neptune",
    "A managed graph database for highly connected data."
   ]
  ],
  "example": "A mobile game stores player profiles and leaderboards in DynamoDB, which handles millions of reads per minute at launch without capacity planning. Billing and purchase history live in RDS for MySQL with Multi-AZ, because they need transactions and must survive an AZ failure. The studio's analysts load gameplay events into Redshift weekly to study which levels players abandon, and ElastiCache holds the daily top-100 list so it loads instantly.",
  "tip": "Multi-AZ is for availability (automatic failover); read replicas are for read performance. Redshift is analytics (OLAP), not transactions; DynamoDB is NoSQL, not relational.",
  "check": [
   [
    "A company needs a relational database but does not want to patch or back it up manually. Which service?",
    "Amazon RDS (or Aurora), which manages patching, backups and failover."
   ],
   [
    "Which service fits a serverless key-value store with single-digit-millisecond performance at any scale?",
    "Amazon DynamoDB."
   ],
   [
    "What does an RDS Multi-AZ deployment provide?",
    "A standby in another Availability Zone with automatic failover, improving availability rather than read performance."
   ],
   [
    "Analysts need to run complex SQL reports over years of sales data. Which service fits best?",
    "Amazon Redshift, the data warehouse built for large-scale analytics."
   ]
  ]
 },
 {
  "t": "Networking: Amazon VPC, subnets, internet and NAT gateways, Route 53, CloudFront, Site-to-Site VPN and Direct Connect",
  "body": [
   "Networking in AWS starts with Amazon Virtual Private Cloud (Amazon VPC), which lets you launch resources into a logically isolated virtual network that you define. You choose its IP address range in Classless Inter-Domain Routing (CIDR) notation, such as `10.0.0.0/16`, create subnets, configure route tables, and control traffic with security groups (stateful, at the instance level) and network access control lists (network ACLs, stateless, at the subnet level). Each Region gives you a default VPC to start with, but production designs usually use custom VPCs.",
   "A subnet is a range of IP addresses within a VPC, and each subnet lives in exactly one Availability Zone. What makes a subnet public or private is its route table. A public subnet has a route such as `0.0.0.0/0 -> igw-...` to an internet gateway, so resources in it with public IP addresses can reach and be reached from the internet; load balancers often live here. A private subnet has no such route; application servers and databases usually live here. An internet gateway is the horizontally scaled VPC component that allows two-way communication with the internet. A NAT (network address translation) gateway, placed in a public subnet, lets instances in private subnets start outbound connections, for example to download patches, while preventing the internet from starting connections to them.",
   "Amazon Route 53 is AWS's highly available Domain Name System (DNS) service. It translates names such as `www.example.com` into IP addresses, lets you register domain names, performs health checks, and offers routing policies including simple, weighted (split traffic by percentage), latency-based (send users to the fastest Region), failover (switch to a standby when health checks fail) and geolocation (route by the user's location). Amazon CloudFront is a content delivery network (CDN) that caches static and dynamic content at edge locations worldwide, reducing latency for viewers and load on your origin, and integrating with AWS WAF and AWS Shield for protection.",
   "Two services connect on-premises networks to AWS. AWS Site-to-Site VPN (virtual private network) creates encrypted Internet Protocol Security (IPsec) tunnels between your on-premises network and your VPC over the public internet. It is quick to set up and relatively inexpensive, but performance varies with internet conditions. AWS Direct Connect provides a dedicated private connection from your premises or a colocation facility to AWS that does not traverse the public internet, giving more consistent bandwidth and latency and potentially lower data transfer costs for large volumes, but it takes longer to provision. Many organizations use a VPN as a backup for Direct Connect. For individual remote users, AWS Client VPN provides VPN access from laptops.",
   "Consider a worked example. A company builds a VPC with public and private subnets in two AZs. An Application Load Balancer sits in the public subnets, web servers and an RDS database in the private subnets. The web servers download updates through a NAT gateway but cannot be reached directly from the internet. Route 53 hosts the company domain with a failover record pointing to a backup site, and CloudFront caches images near customers. The head office connects over Direct Connect for payroll data transfers, with a Site-to-Site VPN as backup.",
   "Common mistakes: putting a NAT gateway in a private subnet (it belongs in a public subnet); thinking a NAT gateway allows inbound connections from the internet; assuming a subnet can span AZs; believing Direct Connect is encrypted by default just because it is private (you can add encryption, for example a VPN over it or MACsec where supported); and confusing Route 53, which answers DNS queries and routes users, with CloudFront, which caches and serves content. Another trap is treating security groups and network ACLs as the same thing: security groups are stateful and support only allow rules, while network ACLs are stateless and support allow and deny.",
   "Exam shortcuts: 'logically isolated network' is VPC. 'Private instances need outbound internet access only' is a NAT gateway, and 'allow internet traffic to a public subnet' is an internet gateway. 'DNS', 'domain registration' or 'route users to the healthiest or closest endpoint' is Route 53. 'Cache content globally' or 'reduce latency for static content' is CloudFront. 'Encrypted connection over the internet, quick to set up' is Site-to-Site VPN. 'Dedicated private connection with consistent performance' is Direct Connect. 'Subnet-level stateless firewall' is a network ACL, and 'instance-level stateful firewall' is a security group."
  ],
  "terms": [
   [
    "Amazon VPC",
    "A logically isolated virtual network in AWS whose IP ranges, subnets and routing you control."
   ],
   [
    "Subnet",
    "A range of IP addresses within a VPC, located in a single Availability Zone."
   ],
   [
    "Internet gateway",
    "The VPC component that allows two-way communication between resources in public subnets and the internet."
   ],
   [
    "NAT gateway",
    "A managed service in a public subnet that lets private-subnet instances make outbound-only internet connections."
   ],
   [
    "Amazon Route 53",
    "AWS's DNS service, providing domain registration, health checks and routing policies."
   ],
   [
    "Amazon CloudFront",
    "AWS's content delivery network that caches content at edge locations close to viewers."
   ],
   [
    "AWS Site-to-Site VPN",
    "Encrypted IPsec tunnels between an on-premises network and a VPC over the internet."
   ],
   [
    "AWS Direct Connect",
    "A dedicated private network connection between on premises and AWS that bypasses the public internet."
   ]
  ],
  "example": "A retailer's database servers in a private subnet need monthly security patches from the internet but must never accept inbound connections. The network team adds a NAT gateway in a public subnet and a route `0.0.0.0/0` from the private route table to it. Patches download successfully, and a port scan from outside finds nothing reachable. Customers reach the store through Route 53 and CloudFront, and the warehouse connects over a Site-to-Site VPN.",
  "tip": "An internet gateway allows two-way internet access for public subnets; a NAT gateway allows outbound-only access for private subnets. VPN runs encrypted over the internet; Direct Connect is a dedicated private line.",
  "check": [
   [
    "What makes a subnet public?",
    "Its route table has a route to an internet gateway."
   ],
   [
    "Instances in a private subnet must download updates but not accept inbound connections from the internet. What do you add?",
    "A NAT gateway in a public subnet with a route to it from the private subnet's route table."
   ],
   [
    "A company needs consistent, high-bandwidth connectivity to AWS that does not traverse the internet. Which service?",
    "AWS Direct Connect."
   ],
   [
    "Which service routes users to the Region with the lowest latency using DNS?",
    "Amazon Route 53 with a latency-based routing policy."
   ]
  ]
 },
 {
  "t": "Storage: Amazon S3 and its storage classes, Amazon EBS, instance store, Amazon EFS, Amazon FSx, AWS Storage Gateway and AWS Backup",
  "body": [
   "AWS offers three kinds of storage: object, block and file. Object storage keeps whole files with metadata and is reached over HTTPS by a key; block storage presents raw volumes that an operating system formats, like a hard drive; file storage presents a shared file system that many machines mount over a network protocol. Choosing correctly depends on how the data is accessed, how many machines need it and how long it must last, and the exam frequently asks you to make that match.",
   "Amazon Simple Storage Service (Amazon S3) is object storage. You store objects in buckets and access them by key, for example with `aws s3 cp backup.zip s3://my-bucket/2025/`. It scales virtually without limit and is designed for 99.999999999 percent (eleven nines) durability by storing data redundantly across multiple AZs. It suits backups, data lakes, static website content and media. Storage classes trade price against access patterns: S3 Standard for frequently accessed data; S3 Intelligent-Tiering, which moves objects between access tiers automatically when patterns are unknown; S3 Standard-Infrequent Access (Standard-IA) for data read rarely but needed quickly; S3 One Zone-IA, cheaper but stored in a single AZ; and the archive classes S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval (minutes to hours) and S3 Glacier Deep Archive, the lowest-cost class, with retrieval in hours. Lifecycle rules move or expire objects automatically as they age, and versioning protects against accidental overwrites.",
   "Amazon Elastic Block Store (Amazon EBS) provides block storage volumes that attach to EC2 instances like virtual hard drives, used for boot volumes and databases. A volume lives in one AZ and persists independently of the instance, so data survives a stop, and survives termination if the volume is set not to delete. You can take point-in-time snapshots, which are stored durably by AWS and can be copied across Regions. Instance store is temporary block storage physically attached to the host. It is very fast, but its data is lost when the instance stops, hibernates or terminates, so use it only for caches, buffers and scratch data.",
   "Amazon Elastic File System (Amazon EFS) is a managed, elastic file system using the Network File System (NFS) protocol that many Linux instances, containers and Lambda functions can mount at once, across multiple AZs, growing and shrinking automatically. Amazon FSx provides fully managed third-party file systems: FSx for Windows File Server (Server Message Block, or SMB, protocol with Active Directory integration), FSx for Lustre (high-performance computing), FSx for NetApp ONTAP and FSx for OpenZFS.",
   "AWS Storage Gateway is a hybrid storage service that gives on-premises applications access to cloud storage: S3 File Gateway presents S3 as a file share, Volume Gateway presents block volumes backed up to AWS, and Tape Gateway replaces physical backup tapes with virtual tapes stored in AWS. AWS Backup centrally manages and automates backups across services such as EBS, RDS, DynamoDB, EFS, FSx and S3, using backup plans that define schedules, retention and copies to other Regions or accounts. It helps prove to auditors that backups follow policy.",
   "Consider a worked example. A design agency runs Linux render servers that all need the same project files, so it mounts EFS on every server. Each server's boot volume is EBS, and the render scratch space uses fast instance store because it can be recreated. Finished videos go to S3 Standard, and a lifecycle rule moves them to Glacier Flexible Retrieval after 90 days and to Glacier Deep Archive after a year. The office's old tape library is replaced by Tape Gateway, and AWS Backup takes daily EBS and EFS backups with a 35-day retention.",
   "Common mistakes: storing important data on instance store; expecting an EBS volume to attach to an instance in another AZ (restore a snapshot there instead); choosing EFS for Windows file shares (use FSx for Windows File Server); assuming One Zone-IA survives the loss of an AZ; and picking Glacier Deep Archive for data needed within minutes. Another trap is thinking S3 is a file system you mount like EFS; it is object storage reached through an API, even though tools can make it look like a folder.",
   "On the exam, match access patterns. 'Shared file storage for many Linux instances' is EFS; 'Windows file shares' or 'SMB with Active Directory' is FSx for Windows File Server; 'high-performance computing file system' is FSx for Lustre. 'Boot or database disk for one instance' is EBS. 'Temporary, fastest local storage' is instance store. 'Unlimited object storage', 'static website' or 'data lake' is S3. 'Lowest-cost long-term archive, retrieval in hours' is Glacier Deep Archive; 'unknown access patterns' is Intelligent-Tiering. 'On-premises access to cloud storage' or 'virtual tapes' is Storage Gateway, and 'centrally manage backups across services' is AWS Backup."
  ],
  "terms": [
   [
    "Amazon S3",
    "Object storage that keeps data as objects in buckets, designed for eleven nines of durability."
   ],
   [
    "S3 storage classes",
    "Price tiers for S3 objects based on access frequency and retrieval needs, from Standard to Glacier Deep Archive."
   ],
   [
    "Lifecycle rule",
    "An S3 policy that transitions objects to cheaper classes or deletes them as they age."
   ],
   [
    "Amazon EBS",
    "Persistent block storage volumes that attach to EC2 instances within one Availability Zone."
   ],
   [
    "Instance store",
    "Temporary block storage on the host whose data is lost when the instance stops or terminates."
   ],
   [
    "Amazon EFS",
    "A managed, elastic NFS file system that many Linux clients can mount at once across AZs."
   ],
   [
    "Amazon FSx",
    "Fully managed third-party file systems such as Windows File Server and Lustre."
   ],
   [
    "AWS Storage Gateway",
    "A hybrid service giving on-premises applications access to AWS storage as files, volumes or virtual tapes."
   ]
  ],
  "example": "A hospital must keep medical images for many years but rarely reopens them after the first month. It stores new images in S3 Standard, and a lifecycle rule moves them to S3 Glacier Instant Retrieval after 30 days, because a doctor occasionally needs an old scan within milliseconds. Records older than the legal minimum for active use move to Glacier Deep Archive, and AWS Backup protects the EBS volumes of the imaging servers.",
  "tip": "Shared Linux file storage is EFS; Windows file shares are FSx for Windows File Server; a single instance's disk is EBS. Never keep data that must survive a stop on instance store.",
  "check": [
   [
    "Several Linux EC2 instances in different AZs need to read and write the same files. Which service fits?",
    "Amazon EFS, a shared NFS file system mountable across AZs."
   ],
   [
    "What happens to instance store data when the instance is stopped?",
    "It is lost, because instance store is temporary storage tied to the physical host."
   ],
   [
    "Which S3 storage class suits data with unpredictable access patterns?",
    "S3 Intelligent-Tiering, which moves objects between tiers automatically."
   ],
   [
    "A company wants to replace physical backup tapes with cloud storage while keeping its backup software. What should it use?",
    "AWS Storage Gateway in Tape Gateway mode, which presents virtual tapes stored in AWS."
   ]
  ]
 },
 {
  "t": "AI and machine learning services: Amazon SageMaker AI, Amazon Bedrock, Amazon Q, and task-specific AI services such as Rekognition, Textract, Comprehend, Transcribe, Polly and Lex",
  "body": [
   "AWS offers artificial intelligence (AI) and machine learning (ML) at three levels. At the bottom is a platform for building, training and deploying your own models. In the middle are services that give you access to generative AI foundation models, which are large models pretrained on vast data that can write, summarize, answer questions and more. At the top are ready-made services that solve one task through a simple API with no ML expertise. The Cloud Practitioner exam checks that you can match a use case to the right level and the right service.",
   "Amazon SageMaker AI (formerly Amazon SageMaker) is the platform for data scientists and ML engineers to build, train and deploy their own models. It provides managed notebooks, data labeling, training jobs on managed infrastructure, automatic model tuning, deployment to endpoints and monitoring for model drift. Choose it when you need a custom model trained on your own data, such as predicting equipment failures from sensor history or scoring loan applications with your own features. SageMaker AI removes infrastructure work, but you still own the data, the model design and its evaluation.",
   "Amazon Bedrock is a fully managed service that gives you access to foundation models from Amazon and leading AI companies through a single API, so you can build generative AI applications such as chat assistants, summarization and content generation without managing infrastructure. You can customize models with your own data, use knowledge bases for retrieval augmented generation (RAG), which grounds answers in your documents, and apply guardrails to filter harmful content. Your prompts and data are not used to train the underlying public models. Amazon Q is a generative AI-powered assistant: Amazon Q Business answers questions and completes tasks using a company's own data and systems with its existing permissions, and Amazon Q Developer helps developers write, explain, test and transform code and work with AWS resources.",
   "Task-specific AI services need no ML expertise. Amazon Rekognition analyzes images and video to detect objects, scenes, text, unsafe content and faces. Amazon Textract extracts printed and handwritten text, forms and tables from scanned documents. Amazon Comprehend uses natural language processing (NLP) to find sentiment, key phrases, entities and language in text. Amazon Transcribe converts speech to text. Amazon Polly converts text to lifelike speech. Amazon Lex builds conversational interfaces (chatbots) using voice and text, the same technology behind many contact center bots. Amazon Translate translates between languages, Amazon Kendra provides intelligent enterprise search, and Amazon Personalize builds recommendations.",
   "Consider a worked example. An insurance company wants to automate claims. Customers phone in, and an Amazon Lex bot collects the policy number. Call recordings go through Transcribe to become text, and Comprehend flags angry or urgent calls by sentiment. Uploaded claim forms go through Textract to pull out fields, and photos of vehicle damage go through Rekognition. A Bedrock-based assistant drafts a summary letter for the adjuster, grounded in the company's policy documents. Finally, data scientists use SageMaker AI to train a custom fraud-scoring model on years of historical claims.",
   "Common mistakes: reversing Transcribe and Polly; using Comprehend to read text from an image (Textract or Rekognition extracts it; Comprehend analyzes text you already have); choosing SageMaker AI when a pretrained API already solves the task; assuming Bedrock is for training models from scratch (it provides and customizes existing foundation models); and confusing Lex, which builds the conversation, with Polly, which only speaks. Remember too that responsibility for how AI output is used, including checking it for accuracy and bias, stays with you.",
   "A simple decision path helps. Is there a ready-made service for the exact task, such as reading forms, detecting objects or converting speech? Use the task-specific service. Do you want to generate text, summarize or build a chat assistant with foundation models? Use Bedrock, or Amazon Q if you want a ready assistant for employees or developers. Do you need a model trained on your own unique data for a prediction nobody sells? Use SageMaker AI.",
   "On the exam, 'speech to text' or 'transcripts of calls' is Transcribe, and 'text to speech' or 'lifelike voice' is Polly. 'Extract text and tables from scanned documents' is Textract, and 'sentiment' or 'key phrases' is Comprehend. 'Detect objects or faces in images' is Rekognition. 'Chatbot' is Lex. 'Build, train and deploy custom ML models' is SageMaker AI. 'Foundation models through an API' or 'generative AI application' is Bedrock. 'AI assistant for employees using company data' is Amazon Q Business, and 'coding assistant' is Amazon Q Developer."
  ],
  "terms": [
   [
    "Amazon SageMaker AI",
    "A platform for building, training and deploying custom machine learning models."
   ],
   [
    "Amazon Bedrock",
    "A managed service providing API access to foundation models for building generative AI applications."
   ],
   [
    "Foundation model",
    "A large model pretrained on broad data that can be adapted to many tasks such as writing and summarizing."
   ],
   [
    "Amazon Q",
    "A generative AI assistant for businesses (Q Business) and developers (Q Developer)."
   ],
   [
    "Amazon Rekognition",
    "A service that analyzes images and video to detect objects, text, scenes and faces."
   ],
   [
    "Amazon Textract",
    "A service that extracts printed and handwritten text, forms and tables from documents."
   ],
   [
    "Amazon Comprehend",
    "An NLP service that finds sentiment, entities, key phrases and language in text."
   ],
   [
    "Amazon Transcribe and Amazon Polly",
    "Transcribe converts speech to text; Polly converts text to lifelike speech."
   ]
  ],
  "example": "A city council wants its website accessible to visually impaired residents and its phone line to handle simple requests. It uses Amazon Polly to read news articles aloud, an Amazon Lex bot on the phone line to book bulk rubbish collections, Amazon Transcribe to create searchable transcripts of council meetings, and Amazon Translate to publish notices in several languages. No one on the team needed to train a machine learning model.",
  "tip": "Transcribe is speech to text; Polly is text to speech. Textract extracts text from documents; Comprehend understands text you already have. Custom models mean SageMaker AI; foundation models mean Bedrock.",
  "check": [
   [
    "A company wants to convert recorded customer calls into text. Which service?",
    "Amazon Transcribe, which converts speech to text."
   ],
   [
    "Which service extracts fields and tables from scanned invoices?",
    "Amazon Textract."
   ],
   [
    "A startup wants to build a generative AI writing assistant using existing foundation models without managing infrastructure. Which service?",
    "Amazon Bedrock."
   ],
   [
    "When is SageMaker AI a better fit than a task-specific AI service?",
    "When you need a custom model trained on your own data for a problem no pretrained service solves."
   ]
  ]
 },
 {
  "t": "Analytics services: Amazon Athena, AWS Glue, Amazon Kinesis, Amazon EMR and Amazon OpenSearch Service",
  "body": [
   "Companies collect huge volumes of data, from website clicks to sensor readings to application logs, and want to turn it into insight. AWS analytics services cover four jobs: querying data where it already sits, preparing and cataloging it, processing it in real time or in big batches, and searching and visualizing it. Each service has a clear niche, and the exam tests whether you can pick the right one from a description of the job.",
   "Amazon Athena is a serverless, interactive query service that analyzes data directly in Amazon S3 using standard Structured Query Language (SQL). There are no servers or clusters to manage and no data to load: you define a table over files such as CSV, JSON or Parquet and run a query such as `SELECT status, COUNT(*) FROM weblogs GROUP BY status;`. You pay based on the amount of data each query scans, so storing data in compressed, columnar formats such as Parquet and partitioning it by date reduces both cost and time. Athena is ideal for ad hoc analysis of logs and data lakes.",
   "AWS Glue is a serverless data integration service for extract, transform and load (ETL). Glue crawlers scan data sources, infer their structure, and record the schemas as tables in the AWS Glue Data Catalog, a central metadata repository that Athena, Amazon EMR and Amazon Redshift can all use. Glue jobs then clean, transform and move data between stores, for example converting raw CSV files into partitioned Parquet for efficient querying. AWS Glue DataBrew offers visual data preparation without code.",
   "Amazon Kinesis handles streaming data in real time. Amazon Kinesis Data Streams captures and stores streams of records, such as clickstreams, application logs or Internet of Things (IoT) telemetry, so multiple consumer applications can process them within seconds. Amazon Data Firehose (formerly Kinesis Data Firehose) is the simpler option: it loads streaming data into destinations such as S3, Redshift or Amazon OpenSearch Service with no code, optionally batching and compressing it. Kinesis Video Streams ingests video from connected cameras.",
   "Amazon EMR is a managed big data platform for running open-source frameworks such as Apache Spark, Apache Hadoop, Hive and Presto on scalable clusters, or in a serverless mode, for large-scale processing like log analysis, ML data preparation and financial simulations. Choose it when a team already uses these frameworks or needs fine control over big data processing. Amazon OpenSearch Service is a managed service for OpenSearch (and legacy Elasticsearch), used for full-text search, log analytics and operational dashboards. Amazon QuickSight provides business intelligence (BI) dashboards and visualizations, and Amazon Managed Streaming for Apache Kafka (Amazon MSK) runs Kafka for teams that prefer it to Kinesis.",
   "Consider a worked example. A news website wants to understand reader behavior. Page-view events stream into Kinesis Data Streams, and a consumer updates a 'trending now' list within seconds. Data Firehose also delivers the same events to S3 every few minutes. A Glue crawler catalogs the files and a nightly Glue job converts them to Parquet. Analysts run ad hoc Athena queries such as 'which articles did mobile readers finish?', while a data engineering team uses EMR with Spark to build reader-interest models. Editors watch QuickSight dashboards, and the site's search box is powered by OpenSearch Service.",
   "Common mistakes: confusing Athena and Redshift (both run SQL, but Athena queries files in S3 on demand, while Redshift is a warehouse you load data into for heavy, repeated analytics); thinking Glue queries data (it catalogs and transforms; Athena queries); choosing EMR when a no-code Firehose delivery or a simple Athena query would do; and treating Kinesis as batch processing when its purpose is real time. Another trap is using OpenSearch Service as a data warehouse; it excels at search and log analytics rather than complex relational reporting.",
   "Exam keywords map neatly. 'SQL queries on data in S3 without servers' or 'pay per query' means Athena. 'ETL', 'data catalog', 'crawler' or 'discover schema' means Glue. 'Real-time streaming', 'clickstream' or 'ingest data within seconds' means Kinesis, with Data Firehose for 'load streaming data into S3 or Redshift with no code'. 'Hadoop', 'Spark' or 'big data clusters' means EMR. 'Full-text search' or 'log analytics dashboards' means OpenSearch Service. 'Business intelligence dashboards' means QuickSight. 'Data warehouse' means Redshift."
  ],
  "terms": [
   [
    "Amazon Athena",
    "A serverless service for querying data in S3 with standard SQL, billed by data scanned."
   ],
   [
    "AWS Glue",
    "A serverless data integration service for ETL, with crawlers and a central Data Catalog."
   ],
   [
    "ETL",
    "Extract, transform and load: moving data from sources, reshaping it and loading it into a target store."
   ],
   [
    "AWS Glue Data Catalog",
    "A central metadata repository of table definitions used by Athena, EMR and Redshift."
   ],
   [
    "Amazon Kinesis Data Streams",
    "A service for capturing and processing streaming data records in real time."
   ],
   [
    "Amazon Data Firehose",
    "A service that loads streaming data into destinations like S3 and Redshift without custom code."
   ],
   [
    "Amazon EMR",
    "A managed platform for big data frameworks such as Apache Spark and Hadoop."
   ],
   [
    "Amazon OpenSearch Service",
    "A managed service for search, log analytics and operational dashboards."
   ]
  ],
  "example": "A security team keeps months of VPC Flow Logs and CloudTrail logs in S3. Instead of building a database, it runs a Glue crawler to create tables and uses Athena to answer questions like 'which IP addresses were rejected most often last week?', paying only for the data each query scans. After converting the logs to Parquet with a Glue job, the same queries scan far less data and cost much less.",
  "tip": "Athena and Redshift both run SQL. Athena queries files in S3 on demand with nothing to load; Redshift is a data warehouse you load data into for heavy, repeated analytics.",
  "check": [
   [
    "A team wants to run occasional SQL queries on log files in S3 without managing any servers. Which service?",
    "Amazon Athena."
   ],
   [
    "Which service discovers the schema of data in S3 and stores it in a central catalog?",
    "AWS Glue, using crawlers and the Glue Data Catalog."
   ],
   [
    "A website must process clickstream events within seconds. Which service family fits?",
    "Amazon Kinesis (Kinesis Data Streams for real-time processing)."
   ],
   [
    "A data team already uses Apache Spark and Hadoop. Which managed service lets them run these on AWS?",
    "Amazon EMR."
   ]
  ]
 },
 {
  "t": "Application integration, monitoring and other services: Amazon SQS, Amazon SNS, Amazon EventBridge, Amazon CloudWatch, AWS Systems Manager and AWS IoT Core",
  "body": [
   "Modern applications are built from many components that must communicate reliably and be monitored and managed at scale. If every component calls the next one directly, a slow or failed piece drags down everything upstream; this is called tight coupling. Application integration services loosen that coupling, and management services let a small team watch and operate large fleets. The exam tests whether you can pick the right service for decoupling, notifications, event routing, monitoring, fleet management and device connectivity.",
   "Amazon Simple Queue Service (Amazon SQS) is a fully managed message queue. A producer sends messages to a queue, and consumers poll the queue, process messages at their own pace and delete each one once handled. While a consumer works on a message it is hidden from others for a visibility timeout, and messages that repeatedly fail can move to a dead-letter queue for investigation. The queue buffers bursts of work and decouples components, so a slow or failed consumer does not break the producer. Standard queues offer very high throughput with at-least-once delivery; first-in, first-out (FIFO) queues preserve order and process each message exactly once.",
   "Amazon Simple Notification Service (Amazon SNS) is a publish/subscribe (pub/sub) service. A publisher sends a message to a topic, and SNS pushes it immediately to every subscriber: SQS queues, AWS Lambda functions, HTTPS endpoints, email addresses, or mobile push and SMS text messages. The key difference is direction and audience: SQS is a queue that consumers pull from, with one consumer processing each message; SNS pushes each message to many subscribers at once. Combining them, SNS fan-out to several SQS queues, lets each downstream system process the same event independently.",
   "Amazon EventBridge is a serverless event bus. It receives events from AWS services, your own applications and software as a service (SaaS) partners, and routes them to targets based on rules that match event content, for example 'when an EC2 instance changes to stopped, invoke this Lambda function' or 'when a GuardDuty finding has high severity, notify the security team'. EventBridge Scheduler runs tasks on a schedule. Amazon CloudWatch is the core operational monitoring service: it collects metrics such as CPU utilization, stores and searches logs in CloudWatch Logs, displays dashboards, and raises alarms that can notify an SNS topic or trigger Auto Scaling.",
   "AWS Systems Manager is a collection of capabilities for managing EC2 instances and on-premises servers at scale. Session Manager gives secure shell access through the console or CLI without opening inbound ports or managing SSH keys, and logs sessions for auditing. Patch Manager automates operating system patching on a schedule. Run Command executes scripts across fleets, Inventory records installed software, and Parameter Store holds configuration values and secrets. AWS IoT Core securely connects Internet of Things (IoT) devices to the cloud, receiving their messages, often over the lightweight MQTT protocol, and routing them with rules to services such as Lambda, Amazon DynamoDB or Kinesis.",
   "Consider a worked example. An online shop publishes an 'order placed' message to an SNS topic. Three SQS queues subscribe: one for payment, one for the warehouse and one for email receipts, so each team's service processes orders at its own speed, and a warehouse outage simply lets its queue grow until it recovers. EventBridge watches for EC2 state changes and notifies operations. CloudWatch alarms on error rates page the on-call engineer, Systems Manager Patch Manager patches the fleet every Sunday, and engineers use Session Manager instead of opening port 22. Smart shelf sensors in the warehouse report stock levels through IoT Core.",
   "Common mistakes: choosing SQS when one message must reach several systems at once (that is SNS, often with queues behind it); choosing SNS when work must be buffered and processed reliably by a worker (that is SQS); confusing CloudWatch, which monitors performance and operations, with AWS CloudTrail, which records API activity for auditing; opening SSH to the internet when Session Manager would avoid it; and thinking EventBridge is only a scheduler rather than a rule-based event router.",
   "On the exam, cue words decide. 'Decouple', 'buffer' or 'queue' means SQS, and 'process in order, exactly once' means an SQS FIFO queue. 'Notify multiple subscribers', 'pub/sub', 'fan-out' or 'send an SMS or email alert' means SNS. 'React to events with rules' or 'route events from SaaS applications' means EventBridge. 'Metrics, logs, alarms, dashboards' means CloudWatch. 'Patch a fleet', 'run commands on many instances' or 'connect to instances without SSH keys or open ports' means Systems Manager. 'Connect sensors and devices' means IoT Core."
  ],
  "terms": [
   [
    "Amazon SQS",
    "A fully managed message queue that decouples producers and consumers, with consumers pulling messages."
   ],
   [
    "Amazon SNS",
    "A pub/sub service that pushes each message published to a topic to all its subscribers."
   ],
   [
    "Fan-out",
    "A pattern where one SNS message is delivered to several SQS queues or other subscribers for parallel processing."
   ],
   [
    "Amazon EventBridge",
    "A serverless event bus that routes events to targets based on matching rules."
   ],
   [
    "Amazon CloudWatch",
    "The AWS service for metrics, logs, dashboards and alarms."
   ],
   [
    "AWS Systems Manager",
    "A set of tools for managing, patching and accessing EC2 and on-premises servers at scale."
   ],
   [
    "Session Manager",
    "A Systems Manager capability that provides audited shell access without inbound ports or SSH keys."
   ],
   [
    "AWS IoT Core",
    "A managed service that securely connects IoT devices and routes their messages to AWS services."
   ]
  ],
  "example": "A photo-printing service used to call its printing system directly from the web tier, so when printers were slow, customers saw checkout errors. The team placed an SQS queue between them: the website now drops a message in the queue and responds instantly, and print workers take jobs as fast as they can. During the holiday rush the queue grows for a few hours, but no orders are lost and customers never notice.",
  "tip": "SQS is pull-based and each message is processed by one consumer; SNS is push-based and delivers every message to all subscribers. One event that must reach several systems means SNS, often with SQS queues behind it.",
  "check": [
   [
    "A web tier must hand work to a slower back-end without losing requests during spikes. Which service?",
    "Amazon SQS, which buffers messages so the back-end can process them at its own pace."
   ],
   [
    "One order event must reach the billing, shipping and email systems simultaneously. Which pattern?",
    "SNS fan-out: publish to an SNS topic with each system subscribed, often through its own SQS queue."
   ],
   [
    "How can administrators reach EC2 instances without opening SSH ports or managing keys?",
    "AWS Systems Manager Session Manager."
   ],
   [
    "Which service would trigger a Lambda function whenever an EC2 instance stops?",
    "Amazon EventBridge, using a rule that matches the instance state-change event."
   ]
  ]
 },
 {
  "t": "EC2 purchase options: On-Demand, Reserved Instances, Savings Plans, Spot Instances, Dedicated Hosts and Dedicated Instances",
  "body": [
   "The same EC2 instance can cost very different amounts depending on how you buy it. Picking the right purchase option for each workload is one of the biggest cost levers in AWS, and a guaranteed exam topic. The skill being tested is matching: read what the workload needs (how long it runs, whether it can be interrupted, whether it has licensing or isolation requirements) and pick the option that is cheapest without breaking those needs.",
   "On-Demand Instances are the default. You pay for compute by the second or hour with no commitment and no up-front payment, and you can stop at any time. They suit short-term, spiky or unpredictable workloads, development and testing, and applications you are running for the first time and cannot yet forecast. They are the most flexible option and the most expensive per hour of the standard choices.",
   "Reserved Instances (RIs) give a significant discount compared with On-Demand in exchange for a one-year or three-year commitment to a specific instance configuration, such as instance type, Region and operating system. You can pay all up front, partially up front or nothing up front; paying more up front and committing longer gives bigger discounts. Standard RIs offer the largest discount, and unneeded ones can be sold in the Reserved Instance Marketplace. Convertible RIs let you exchange for different instance attributes during the term, with a smaller discount. A zonal RI also reserves capacity in a specific Availability Zone.",
   "Savings Plans are a more flexible commitment model. You commit to a consistent amount of compute usage, measured in dollars per hour, for one or three years, and any matching usage up to that amount gets the discounted rate. Compute Savings Plans apply to EC2 regardless of family, size, Region or operating system, and also to AWS Fargate and AWS Lambda. EC2 Instance Savings Plans give a larger discount but are tied to an instance family in a chosen Region. For steady, predictable workloads, RIs and Savings Plans are the answer, and AWS now generally recommends Savings Plans for their flexibility.",
   "Spot Instances use spare EC2 capacity at steep discounts, but AWS can reclaim them with a two-minute warning when it needs the capacity back. They suit fault-tolerant, flexible and stateless work such as batch processing, big data, continuous integration and delivery (CI/CD) builds, image rendering and containerized workers that can be interrupted and resumed. Dedicated Hosts are physical servers fully dedicated to you, with visibility into sockets and cores, which helps with bring-your-own-license (BYOL) software licensed per socket or core and some compliance requirements; they are the most expensive option. Dedicated Instances run on hardware dedicated to your account but without host-level visibility or placement control. On-Demand Capacity Reservations reserve capacity in an AZ without a term commitment.",
   "Consider a worked example. A company runs a web application whose baseline of ten instances runs all year, with spikes to thirty during promotions. It covers the baseline with a three-year Compute Savings Plan, handles spikes with On-Demand instances through Auto Scaling, and runs its nightly analytics on Spot Instances with checkpointing so an interruption only delays the job. A legacy database licensed per physical core runs on a Dedicated Host so the company can use its existing licenses. The development team uses On-Demand and stops instances at night.",
   "Common mistakes: running a workload that cannot tolerate interruption on Spot; buying three-year RIs for a project with an uncertain future; confusing Dedicated Hosts (you see and control the physical server, for licensing) with Dedicated Instances (isolation only); thinking a Savings Plan is a specific instance you launch (it is a billing discount applied automatically to matching usage); and assuming RIs are always the cheapest overall even when the workload stops after three months. Rightsize first, then commit, or you lock in a discount on capacity you do not need.",
   "On the exam, match the clue to the option. 'Steady state', 'predictable usage for one to three years' means Reserved Instances or Savings Plans, and 'flexible across instance families, Regions, Fargate and Lambda' means Compute Savings Plans. 'Can be interrupted', 'fault tolerant', 'lowest cost for flexible batch jobs' means Spot. 'Short-term, unpredictable and cannot be interrupted' means On-Demand. 'Existing per-socket or per-core licenses' or 'visibility into physical cores' means Dedicated Hosts. 'Reserve capacity in an AZ without a long-term commitment' means On-Demand Capacity Reservations."
  ],
  "terms": [
   [
    "On-Demand Instances",
    "EC2 capacity billed per second or hour with no commitment."
   ],
   [
    "Reserved Instances (RIs)",
    "A one- or three-year commitment to an instance configuration in exchange for a significant discount."
   ],
   [
    "Savings Plans",
    "A commitment to a dollar-per-hour amount of compute usage for one or three years in exchange for discounted rates."
   ],
   [
    "Compute Savings Plans",
    "The most flexible Savings Plan, applying across EC2 families, sizes and Regions plus Fargate and Lambda."
   ],
   [
    "Spot Instances",
    "Spare EC2 capacity at a steep discount that AWS can reclaim with a two-minute warning."
   ],
   [
    "Dedicated Hosts",
    "Physical servers dedicated to one customer with visibility into sockets and cores, useful for BYOL licensing."
   ],
   [
    "Dedicated Instances",
    "Instances running on hardware dedicated to one account, without host-level control."
   ]
  ],
  "example": "A visual effects studio renders thousands of film frames each week. Each frame is independent, so if an instance disappears the frame is simply re-queued. The studio moves rendering from On-Demand to Spot Instances across several instance types, cutting the rendering bill dramatically, while its always-on asset database stays on instances covered by a Savings Plan because it must never be interrupted.",
  "tip": "'Steady for one to three years' means RIs or Savings Plans; 'can be interrupted' means Spot; 'short-term and cannot be interrupted' means On-Demand; 'existing per-core licenses' means Dedicated Hosts.",
  "check": [
   [
    "Which option is cheapest for a batch job that can restart if interrupted?",
    "Spot Instances, which use spare capacity at a steep discount but can be reclaimed with two minutes' notice."
   ],
   [
    "A company wants a commitment discount that also applies to Lambda and Fargate. What should it buy?",
    "A Compute Savings Plan."
   ],
   [
    "Why would a company choose Dedicated Hosts?",
    "To use existing server-bound licenses (per socket or per core) or meet compliance needs that require a dedicated physical server with visibility into it."
   ],
   [
    "Which option fits a new application whose usage cannot yet be predicted and must not be interrupted?",
    "On-Demand Instances, which require no commitment."
   ]
  ]
 },
 {
  "t": "Data transfer and storage pricing: inbound vs outbound traffic, cross-Region traffic and S3 storage class costs",
  "body": [
   "Compute is only part of an AWS bill. Data transfer and storage charges can be significant and are a common source of surprise costs, so the exam expects you to understand the basic pricing patterns. You do not need to memorize prices, which change and vary by Region, but you do need to know which movements of data cost money, which are usually free, and how storage classes trade storage price against access price.",
   "The most important rule concerns direction. Data transfer into AWS from the internet (inbound, or ingress) is generally free. Data transfer out of AWS to the internet (outbound, or egress) is charged per gigabyte with tiered rates that fall as volume grows. That is why serving a lot of content directly from EC2 or Amazon S3 to users can become expensive, and why putting Amazon CloudFront in front is a common optimization: transfer from AWS origins to CloudFront is not charged, CloudFront's delivery rates are often lower, and cached content reduces load on the origin.",
   "Traffic between AWS locations also matters. Data transferred between AWS Regions is charged, so cross-Region replication and multi-Region architectures carry a transfer cost as well as duplicate storage. Within a Region, traffic between Availability Zones is generally charged in each direction, while traffic between resources in the same AZ using private IP addresses is generally free. A NAT gateway charges for each gigabyte it processes, so private instances pulling large amounts of data from S3 through it pay extra; a VPC gateway endpoint for S3 lets them reach S3 privately without that processing charge. AWS Direct Connect can lower outbound transfer rates for large, steady volumes.",
   "Storage pricing depends on the service and the class. For Amazon S3 you pay for the amount of data stored per month, for requests such as PUT and GET, for data transfer out, and in some classes for data retrieval. The cheaper the storage class per gigabyte, the more you tend to pay to access data. Standard-Infrequent Access (Standard-IA) and One Zone-IA add per-gigabyte retrieval fees and minimum storage durations, and the Glacier classes have the lowest storage prices but higher retrieval costs, longer retrieval times for Flexible Retrieval and Deep Archive, and longer minimum durations. S3 Intelligent-Tiering charges a small monitoring fee per object but no retrieval fees, moving objects between tiers automatically.",
   "Block storage is billed differently. For Amazon Elastic Block Store (Amazon EBS) you pay for the provisioned size of each volume whether or not it is full, plus any provisioned performance, plus snapshot storage. An unattached volume still costs money every month. Amazon EFS, by contrast, bills for the storage you actually use, and offers an infrequent access class for colder files. Deleting unattached EBS volumes and old snapshots, and releasing unused Elastic IP addresses, are quick cost wins.",
   "Consider a worked example. A video site stores files in S3 Standard in one Region and serves them directly to viewers worldwide, and its bill is dominated by data transfer out. The team puts CloudFront in front, so popular videos are served from edge caches and the origin transfer to CloudFront is not charged. It adds a lifecycle rule moving videos older than six months to Standard-IA, since they are rarely watched, and it replaces a NAT gateway path to S3 with a gateway endpoint for its transcoding servers. It also finds and deletes forty unattached EBS volumes from old experiments.",
   "Common mistakes: assuming all data transfer is free inside AWS (cross-AZ and cross-Region traffic is charged); moving frequently read data to IA or Glacier classes to save money and then paying more in retrieval fees; forgetting minimum storage duration charges when deleting objects early from IA or Glacier classes; paying for large EBS volumes that are mostly empty; and overlooking NAT gateway data processing charges. Another trap is thinking uploading data to S3 is expensive; inbound transfer is free, although request charges still apply.",
   "On the exam, remember 'in is free, out costs money'. 'Reduce data transfer costs for global content delivery' points to CloudFront. 'Unexpected charges for traffic between AZs or Regions' points to data transfer pricing. 'Data rarely accessed but needed quickly' points to Standard-IA, 'long-term archive at the lowest cost' to Glacier Deep Archive, and 'unknown access patterns' to Intelligent-Tiering. 'Charged for storage even when unused' points to provisioned EBS volumes."
  ],
  "terms": [
   [
    "Inbound data transfer (ingress)",
    "Data moving into AWS from the internet, generally not charged."
   ],
   [
    "Outbound data transfer (egress)",
    "Data moving from AWS to the internet, charged per gigabyte with tiered rates."
   ],
   [
    "Cross-Region data transfer",
    "Data moved between AWS Regions, which is charged."
   ],
   [
    "Retrieval fee",
    "A per-gigabyte charge for reading data from infrequent access or archive S3 storage classes."
   ],
   [
    "Minimum storage duration",
    "A minimum period an object is billed for in certain S3 classes, even if deleted sooner."
   ],
   [
    "VPC gateway endpoint",
    "A private route from a VPC to S3 or DynamoDB that avoids the internet and NAT gateway charges."
   ]
  ],
  "example": "A research lab replicated every dataset to a second Region for safety and was surprised by a large transfer line on its bill. After reviewing, it kept cross-Region replication only for irreplaceable raw data, moved processed results older than 90 days to S3 Glacier Flexible Retrieval, and co-located its compute cluster in the same AZ as its scratch storage, cutting transfer and storage costs while keeping the protection it needed.",
  "tip": "Remember 'in is free, out costs money', and cross-AZ and cross-Region traffic is charged. Cheaper S3 classes are not always cheaper overall: frequent reads from IA or Glacier classes can cost more in retrieval fees than Standard.",
  "check": [
   [
    "Is uploading data from the internet into S3 charged for data transfer?",
    "No, inbound data transfer is generally free, although S3 request charges still apply."
   ],
   [
    "How can a company reduce the cost of serving large files from S3 to users worldwide?",
    "Use Amazon CloudFront to cache content at edge locations; transfer from AWS origins to CloudFront is not charged and delivery rates are often lower."
   ],
   [
    "Why might moving frequently accessed data to S3 Standard-IA increase costs?",
    "Standard-IA charges per-gigabyte retrieval fees, so frequent reads can outweigh the lower storage price."
   ],
   [
    "You pay for a 500 GB EBS volume that holds 20 GB of data. Why?",
    "EBS bills for the provisioned size of the volume, not the data actually stored."
   ]
  ]
 },
 {
  "t": "AWS Free Tier offers and how to avoid unexpected charges",
  "body": [
   "The AWS Free Tier lets you explore and learn many AWS services without paying, within set limits. It is how most people do their first labs, and understanding its rules is the best protection against a surprise bill. The single most important idea for the exam is that the Free Tier is an allowance, not a spending cap: usage outside it is billed at normal rates unless you have specifically chosen an account plan that stops at the free limit.",
   "Free Tier offers have come in a few forms. Always Free offers do not expire and are available to all customers within monthly limits; for example, AWS Lambda includes a monthly allowance of requests and compute time, and Amazon DynamoDB includes an amount of storage and capacity. Short-term free trials start when you first use a particular service and last for a limited period. Historically, new accounts also received twelve months of free usage for services such as Amazon EC2, Amazon S3 and Amazon RDS within limits. In 2025 AWS changed the offer for new accounts to a credit-based model with a time-limited free plan and a paid plan, so always check the current Free Tier page for what applies to your account rather than relying on older guides.",
   "Free Tier limits are specific: a particular instance size, a number of hours per month, a number of gigabytes or requests. Anything above the limit, or any service, size or feature not covered, is billed at normal rates. Common surprises include launching a larger instance than the eligible one, leaving resources running after a lab, a NAT gateway (which bills hourly and per gigabyte processed), public IPv4 addresses and Elastic IP addresses, unattached EBS volumes and snapshots, load balancers left behind, and data transfer out.",
   "Protect yourself with a few habits. As soon as you open an account, create a budget in AWS Budgets, for example a monthly cost budget of a few dollars with an email alert at 80 percent of actual and 100 percent of forecasted spend; AWS offers a zero-spend budget template for exactly this. Turn on Free Tier usage alerts in the Billing and Cost Management preferences, and check the Free Tier page in the billing console, which shows your usage against each limit. Use the AWS Pricing Calculator before trying something new. Where possible, turn on Cost Anomaly Detection so unusual spikes are flagged.",
   "Clean-up is the other half of the habit. Tag lab resources, for example `Project=lab`, so you can find them later, and delete them as soon as you finish, ideally by deleting the AWS CloudFormation stack that created them so nothing is forgotten. Check every Region you used, because resources in another Region do not appear on the dashboard of the one you are viewing; Tag Editor and the Billing console's charges by Region help here.",
   "Consider a worked example. A student follows a tutorial that creates a VPC with a NAT gateway, an EC2 instance and an RDS database, then closes the browser. The EC2 instance was within the free allowance, but the NAT gateway and a larger database size were not, and a few weeks later a bill arrives. Because the student had set a small budget with an email alert, the alert arrived after three days instead. The student deleted the CloudFormation stack, confirmed the charges stopped in Cost Explorer, and now sets alerts and tags before every lab.",
   "Common mistakes: believing AWS stops your resources when the free allowance runs out; assuming every instance size or every service is included; forgetting that stopped EC2 instances still incur EBS storage charges; deleting an instance but leaving its volumes, snapshots or Elastic IP; and ignoring account security. Enable multi-factor authentication (MFA) on the root user and never publish access keys, because stolen credentials used to launch many resources are one of the most expensive surprises possible, and AWS may not forgive the charges.",
   "On the exam, 'notify me before my costs exceed a small amount' points to AWS Budgets with alerts. 'Free offers that never expire' points to Always Free. 'Track usage against Free Tier limits' points to Free Tier usage alerts and the Free Tier page in the Billing and Cost Management console. If an option claims the Free Tier automatically prevents all charges, treat it as wrong unless the question clearly describes a plan that does so."
  ],
  "terms": [
   [
    "AWS Free Tier",
    "AWS's program of free usage allowances, trials and credits for exploring services within set limits."
   ],
   [
    "Always Free",
    "Free Tier offers that do not expire and apply to all customers within monthly limits."
   ],
   [
    "Free trial",
    "A short-term free offer that starts when you first use a particular service."
   ],
   [
    "Free Tier usage alert",
    "A billing preference that emails you when usage approaches or exceeds Free Tier limits."
   ],
   [
    "AWS Budgets",
    "A service that alerts you when actual or forecasted cost or usage crosses thresholds you set."
   ],
   [
    "Zero-spend budget",
    "A Budgets template that alerts you as soon as any spending occurs."
   ]
  ],
  "example": "A study group creates a shared sandbox account for exam labs. On day one they enable MFA on the root user, create a zero-spend budget and a small monthly cost budget with alerts to everyone's email, and agree that every lab is deployed with CloudFormation and tagged with the student's name. At the end of each session they delete their stacks. Months later their total spend is a few cents, and the one forgotten load balancer was caught by an alert within a day.",
  "tip": "The Free Tier does not cap spending automatically on a standard paid account. Usage beyond the limits is billed at normal rates, so budgets, Free Tier alerts and clean-up are how you stay safe.",
  "check": [
   [
    "What happens when you exceed a Free Tier limit on a standard account?",
    "The extra usage is billed at normal on-demand rates; AWS does not stop your resources."
   ],
   [
    "Which service would email you as soon as spending in a new account goes above zero?",
    "AWS Budgets, using a zero-spend budget or a low cost budget with alerts."
   ],
   [
    "Name two resources that commonly cause charges after a lab even when the instance is deleted.",
    "Examples include NAT gateways, unattached EBS volumes or snapshots, Elastic IP or public IPv4 addresses, and load balancers."
   ],
   [
    "Why is enabling MFA on the root user part of avoiding unexpected charges?",
    "Stolen credentials can be used to launch expensive resources, so strong account security prevents costly abuse."
   ]
  ]
 },
 {
  "t": "Estimating and tracking cost: AWS Pricing Calculator, AWS Cost Explorer and AWS Budgets",
  "body": [
   "Three tools cover the life cycle of AWS costs: estimating before you build, analyzing what you have spent, and alerting when spending goes off course. The AWS Pricing Calculator, AWS Cost Explorer and AWS Budgets can sound interchangeable, and the exam deliberately offers them as distractors for each other. The way to keep them apart is to ask when the question is set in time: before deployment, after spending, or continuously watching for a threshold.",
   "The AWS Pricing Calculator is a free web-based tool for estimating the cost of an architecture before you deploy it. You add services, choose Regions and configurations such as instance types, purchase options, storage amounts and expected data transfer, and it produces monthly and annual estimates that you can group, export and share by link. The public calculator does not need an AWS account and does not look at your actual usage. Use it for planning, budgeting a new project, comparing Regions or purchase options, and building a business case for migration.",
   "AWS Cost Explorer analyzes the costs and usage you have already incurred. It shows interactive graphs of spending by service, linked account, Region, cost allocation tag, usage type and more, over daily or monthly periods, with historical data and a forecast of future spend. You use it to answer questions like 'which service caused last month's increase?' or 'what does the marketing team's workload cost?'. It also reports Reserved Instance and Savings Plans utilization and coverage, and offers purchase and rightsizing recommendations.",
   "AWS Budgets lets you set custom budgets and alerts you when actual or forecasted costs or usage exceed them. You can create cost budgets, usage budgets, and Reserved Instance or Savings Plans utilization and coverage budgets, with alerts by email or to an Amazon Simple Notification Service (Amazon SNS) topic that can feed chat tools. Budget actions can go further and respond automatically when a threshold is crossed, for example by applying an IAM policy or a service control policy that blocks new resources, or stopping specific EC2 or RDS instances.",
   "A related tool, AWS Cost Anomaly Detection, found alongside these in the Billing and Cost Management console, uses machine learning to learn your normal spending pattern and alert you to unusual spikes, even ones that stay under a budget. A simple memory aid: the Pricing Calculator looks forward before anything exists, Cost Explorer looks backward (and a little forward with forecasts) at what you have spent, Budgets watches spending against a line you draw, and Anomaly Detection watches for anything out of character. All of them live in the Billing and Cost Management console, and access to them is controlled with IAM permissions, so you can give finance staff cost visibility without infrastructure rights.",
   "Consider a worked example. A company plans a new analytics platform, and each tool plays its part in turn. The architect models it in the Pricing Calculator, comparing On-Demand with Savings Plans, and presents the estimate to finance. After launch, a monthly budget with alerts at 80 and 100 percent is created for the project, with an SNS notification to the team channel. In the second month an alert fires on forecasted spend; the team opens Cost Explorer, filters by the project's tag and groups by usage type, and finds that data transfer between Availability Zones is far higher than estimated. It moves the chatty components into one AZ and the forecast returns to normal.",
   "Common mistakes: expecting Cost Explorer to send threshold alerts (Budgets does that); using the Pricing Calculator to understand last month's bill (it only estimates hypothetical configurations); thinking Budgets stops spending automatically by default (alerts are the default; actions must be configured); and forgetting to activate cost allocation tags, without which filtering by team or project in Cost Explorer and Budgets does not work. Another trap is assuming the Pricing Calculator estimate is a guaranteed price; real bills depend on actual usage.",
   "Exam questions usually signal the timeline. 'Estimate the cost of a planned workload', 'before migrating' or 'compare the cost of architectures' is the Pricing Calculator. 'Visualize and analyze past spending', 'identify which service drove costs up' or 'forecast spend based on history' is Cost Explorer. 'Alert me when costs exceed a threshold' or 'notify when forecasted spend will pass a limit' is AWS Budgets. 'Detect unusual spending automatically using machine learning' is Cost Anomaly Detection."
  ],
  "terms": [
   [
    "AWS Pricing Calculator",
    "A free tool for estimating the cost of a planned architecture before deployment."
   ],
   [
    "AWS Cost Explorer",
    "A tool for visualizing and analyzing historical cost and usage, with forecasts and recommendations."
   ],
   [
    "AWS Budgets",
    "A service that tracks cost or usage against thresholds and sends alerts or runs actions."
   ],
   [
    "Budget action",
    "An automatic response, such as applying a restrictive policy or stopping instances, when a budget threshold is crossed."
   ],
   [
    "Forecasted spend",
    "A projection of future costs based on historical usage patterns."
   ],
   [
    "AWS Cost Anomaly Detection",
    "A service that uses machine learning to find unusual spending and alert you."
   ]
  ],
  "example": "A nonprofit has a fixed yearly cloud grant. Before migrating, it estimates its website and donor database in the Pricing Calculator. After moving, it sets a monthly AWS Budget matching the grant with alerts at 50, 80 and 100 percent, and reviews Cost Explorer each month grouped by service. When an alert shows forecasted spend rising, Cost Explorer reveals a forgotten test database, which the team deletes the same day.",
  "tip": "'Estimate cost of a planned workload' is the Pricing Calculator. 'Analyze past spending' is Cost Explorer. 'Alert when costs exceed a threshold' is AWS Budgets. Cost Explorer does not send threshold alerts; Budgets does.",
  "check": [
   [
    "A company wants to estimate monthly costs for an architecture it has not built yet. Which tool?",
    "The AWS Pricing Calculator."
   ],
   [
    "Which tool shows which service caused last month's cost increase?",
    "AWS Cost Explorer, which analyzes historical cost and usage by service and other dimensions."
   ],
   [
    "A manager wants an email when forecasted monthly spend will exceed a set amount. Which service?",
    "AWS Budgets, with an alert on forecasted cost."
   ],
   [
    "Can AWS Budgets do more than send notifications?",
    "Yes. Budget actions can apply IAM or service control policies or stop specific EC2 and RDS instances when a threshold is crossed."
   ]
  ]
 },
 {
  "t": "Detailed billing data: the Billing and Cost Management console, Cost and Usage Reports and data exports, and cost allocation tags",
  "body": [
   "Summary charts answer many questions, but large organizations need detailed, line-by-line billing data to allocate costs to teams, feed their own reporting tools and reconcile invoices. This topic covers where billing information lives, how to get the most granular data, and how tags turn a long list of charges into something a finance team can understand. The exam focuses on picking the right source of billing data and on the activation step for cost allocation tags.",
   "The AWS Billing and Cost Management console is the central place for billing tasks. There you view current and past bills and invoices, see month-to-date charges by service and Region, manage payment methods, tax settings and billing contacts, open Cost Explorer and Budgets, see Free Tier usage, and set billing preferences such as alerts. Access is controlled with IAM, so you can let a finance user see bills without granting access to infrastructure. In AWS Organizations, the management account sees the consolidated bill for all member accounts. The AWS Billing Conductor service can produce customized billing views, for example for resellers.",
   "For the most detailed data, AWS Cost and Usage Reports (CUR) deliver comprehensive billing data, down to individual resource IDs, hourly or daily usage, pricing and discounts, as files in an Amazon S3 bucket you choose. AWS has evolved this into Data Exports, which lets you create exports of cost and usage data, including the CUR 2.0 format, to S3. From there you can query the data with Amazon Athena, load it into Amazon Redshift, or visualize it with Amazon QuickSight or third-party tools. If a question asks for the most granular billing data for custom analysis, the answer is the Cost and Usage Report or data exports, not Cost Explorer.",
   "Cost allocation tags make that data meaningful. A tag is a key-value label, such as `Project=Checkout` or `CostCenter=1234`, attached to resources. There are user-defined tags that you create and AWS-generated tags such as `aws:createdBy`. A tag becomes a cost allocation tag only after you activate it in the Billing and Cost Management console, and after activation it appears as a column in cost reports and as a filter and grouping dimension in Cost Explorer and Budgets. By default tags apply to cost data from activation onward; AWS allows a backfill request for a limited period of earlier months, but you should not rely on tags appearing retroactively.",
   "A consistent tagging strategy is what makes this work. A typical scheme tags every resource with `CostCenter`, `Environment` (for example `production` or `dev`) and `Owner`. Decide a small set of required keys, their exact spelling and allowed values, enforce them with tag policies in AWS Organizations, and use AWS Config rules or infrastructure as code to catch untagged resources. Then finance can see exactly what each team, project or environment costs, a practice called showback (reporting costs to teams) or chargeback (actually billing teams). AWS Cost Categories can group costs into business-friendly buckets using tags and accounts.",
   "Consider a worked example. A company asks why its billing reports show no costs for the tag `Project`, even though engineers tag everything. The billing administrator finds the tag was never activated as a cost allocation tag, activates it, and the next reports include it. Finance wants resource-level detail for a quarterly review, so the administrator creates a data export in CUR 2.0 format to S3 and gives analysts Athena access to query it. Meanwhile inconsistent spellings such as `project` and `Project` are fixed with a tag policy.",
   "Common mistakes: expecting tags to appear in billing reports without activation; confusing Cost Explorer (summaries and graphs) with CUR or data exports (the most detailed line items); inconsistent tag keys that split costs across several spellings; and assuming member accounts in an organization pay separately. Another trap is tagging only some resources: untagged items such as shared NAT gateways or data transfer end up in an unallocated bucket, so decide how shared costs will be split.",
   "On the exam, 'most detailed billing data' or 'line items for custom analysis' means Cost and Usage Reports or data exports; 'view invoices or update the payment method' means the Billing and Cost Management console; 'track costs by department or project' means cost allocation tags; and 'tagged costs missing from reports' means the tags were not activated."
  ],
  "terms": [
   [
    "Billing and Cost Management console",
    "The central console for bills, invoices, payments, billing preferences and cost tools."
   ],
   [
    "Cost and Usage Report (CUR)",
    "The most detailed AWS billing data, delivered as files to S3, down to individual resources."
   ],
   [
    "Data Exports",
    "The AWS feature for exporting cost and usage data, including CUR 2.0, to Amazon S3."
   ],
   [
    "Tag",
    "A key-value label attached to an AWS resource for organization, automation or cost tracking."
   ],
   [
    "Cost allocation tag",
    "A tag activated in the billing console so it appears in cost reports and can filter and group costs."
   ],
   [
    "Showback and chargeback",
    "Reporting cloud costs to the teams that caused them (showback) or billing those teams internally (chargeback)."
   ],
   [
    "Tag policy",
    "An AWS Organizations policy that standardizes tag keys and values across accounts."
   ]
  ],
  "example": "A university's central IT pays one AWS bill for dozens of research groups. It requires every resource to carry `Grant` and `PI` tags, activates both as cost allocation tags, and enforces spelling with a tag policy. Each month an Athena query over the Cost and Usage Report data export produces a cost statement per grant, which the finance office uses to charge each research grant for exactly what it used.",
  "tip": "Tags don't appear in billing reports until they are activated as cost allocation tags in the billing console. For the most granular billing data, choose Cost and Usage Reports or data exports, not Cost Explorer.",
  "check": [
   [
    "Engineers tag resources with Department, but the tag is missing from Cost Explorer. Why?",
    "The tag has not been activated as a cost allocation tag in the Billing and Cost Management console."
   ],
   [
    "Which billing data source provides resource-level line items for custom analysis?",
    "AWS Cost and Usage Reports, now delivered through Data Exports to Amazon S3."
   ],
   [
    "Where would a finance user download an invoice or update the payment method?",
    "In the AWS Billing and Cost Management console."
   ],
   [
    "How can an organization make sure teams use the same tag keys and values?",
    "Use tag policies in AWS Organizations, backed by checks such as AWS Config rules or infrastructure as code."
   ]
  ]
 },
 {
  "t": "AWS Organizations: consolidated billing, combined volume discounts and shared Reserved Instance and Savings Plans discounts",
  "body": [
   "Most organizations end up with many AWS accounts: separate accounts for production and development, for different teams, or for different business units. An account is a strong boundary for security, quotas and billing, so a mistake or breach in one does not automatically spread to others. But dozens of accounts need central management, or each one becomes its own island with its own bill. AWS Organizations provides that central management at no additional charge, and consolidated billing is one of its headline features.",
   "An organization has one management account (formerly called the master account) that creates the organization, invites existing accounts or creates new member accounts, and pays the bill. Accounts can be grouped into organizational units (OUs), such as Production, Development or Security, forming a hierarchy under the organization root. Service control policies (SCPs) attached to the root, an OU or an account set the maximum permissions available in those accounts. For example, an SCP can stop anyone in development accounts, even administrators, from using Regions outside an approved list or from turning off AWS CloudTrail. SCPs do not grant permissions; they only limit them, and they do not restrict the management account itself.",
   "Consolidated billing brings all member accounts' charges into the management account, so the organization receives one bill and makes one payment, while still seeing a breakdown per account in the Billing and Cost Management console, Cost Explorer and the Cost and Usage Report. There is no extra charge for it. Each member account keeps its own resources and permissions; only billing is combined.",
   "Consolidated billing also saves money in two ways. First, some AWS prices are tiered, getting cheaper per unit as usage grows, for example Amazon S3 storage and data transfer out. The organization is treated as one customer for these volume pricing tiers, so the combined usage of all accounts reaches lower price tiers sooner than each account would alone. Second, Reserved Instance and Savings Plans discounts can be shared: if one account buys a Savings Plan but does not use all of it in an hour, the unused benefit applies to eligible usage in other accounts. The discount applies first to the account that bought it, and the management account can turn off sharing for specific accounts if, for example, a business unit must keep its own discounts.",
   "Organizations works with other services to govern many accounts at once. Tag policies standardize tags, backup policies apply AWS Backup plans, and services such as AWS CloudTrail, AWS Config, Amazon GuardDuty and AWS Security Hub can be enabled organization-wide with a delegated administrator account. AWS Control Tower builds on Organizations to set up a governed multi-account environment, called a landing zone, automatically, with preconfigured guardrails (controls), centralized logging and an account factory for creating new accounts consistently. AWS IAM Identity Center gives people single sign-on access to the accounts they need.",
   "Consider a worked example. A company has twelve AWS accounts, each paying its own bill with its own credit card. Finance struggles to reconcile them, and several accounts pay higher per-gigabyte S3 rates because none alone reaches the lower tiers. The company creates an organization, invites the twelve accounts, and groups them into Production, Development and Sandbox OUs. Consolidated billing produces one invoice, combined S3 usage moves into cheaper tiers, and a Savings Plan bought by the platform account also covers idle hours in other accounts. An SCP on the Sandbox OU denies use of expensive instance families and all Regions except one.",
   "Common mistakes: believing SCPs grant permissions (a user needs both an IAM policy that allows an action and no SCP that denies it); thinking consolidated billing costs extra; assuming it merges resources or gives the management account access to members' data (it combines billing, not resources); forgetting that RI and Savings Plans sharing is on by default and can be turned off; and running workloads in the management account, which best practice keeps for billing and governance only because SCPs cannot restrict it.",
   "On the exam, 'one bill for multiple accounts' and 'combine usage for volume pricing discounts' point to consolidated billing in AWS Organizations. 'Share Reserved Instance or Savings Plans discounts across accounts' also points to Organizations. 'Restrict which services or Regions member accounts can use, even for administrators' points to SCPs. 'Group accounts by function' points to organizational units. 'Automatically set up a secure multi-account environment with guardrails' points to AWS Control Tower."
  ],
  "terms": [
   [
    "AWS Organizations",
    "A free service for centrally managing and governing multiple AWS accounts."
   ],
   [
    "Management account",
    "The account that creates the organization, manages member accounts and pays the consolidated bill."
   ],
   [
    "Organizational unit (OU)",
    "A group of accounts within an organization, used to apply policies together."
   ],
   [
    "Service control policy (SCP)",
    "A policy that sets the maximum permissions for accounts in an organization; it never grants permissions."
   ],
   [
    "Consolidated billing",
    "An Organizations feature that combines all member accounts' charges into one bill paid by the management account."
   ],
   [
    "Volume pricing tiers",
    "Price levels that drop per unit as usage grows, reached sooner when an organization's usage is combined."
   ],
   [
    "AWS Control Tower",
    "A service that sets up and governs a multi-account landing zone with guardrails on top of Organizations."
   ]
  ],
  "example": "A retail group owns three brands, each with its own AWS accounts. After joining them into one organization, the group receives a single monthly bill, its combined data transfer reaches cheaper pricing tiers, and a Compute Savings Plan bought centrally is applied wherever instances run. An SCP on every brand's OU prevents anyone from disabling CloudTrail, so the security team keeps a complete audit trail across all accounts.",
  "tip": "SCPs never grant permissions; they only set guardrails. A user needs both an IAM policy allowing the action and no SCP blocking it. 'One bill' and 'shared volume discounts' mean consolidated billing.",
  "check": [
   [
    "How does consolidated billing lower costs beyond simplifying payment?",
    "Usage across accounts is combined for volume pricing tiers, and RI and Savings Plans discounts can be shared across accounts."
   ],
   [
    "An administrator in a member account has full IAM permissions but cannot launch resources in a certain Region. What is the likely cause?",
    "A service control policy denies that Region; SCPs limit permissions even for administrators."
   ],
   [
    "Does consolidated billing cost extra?",
    "No. Consolidated billing is included with AWS Organizations at no additional charge."
   ],
   [
    "Which service automatically sets up a governed multi-account landing zone?",
    "AWS Control Tower, which builds on AWS Organizations."
   ]
  ]
 },
 {
  "t": "Cost optimization tools: AWS Trusted Advisor, AWS Compute Optimizer and rightsizing recommendations",
  "body": [
   "Knowing what you spend is only the start; the next step is spending less without hurting performance. Most waste in AWS comes from resources that are bigger than they need to be, resources nobody uses any more, and steady workloads still paying On-Demand rates. AWS provides tools that analyze your account and point to specific savings. The exam tests which tool gives which kind of advice, and the idea of rightsizing: matching resource types and sizes to actual workload needs.",
   "AWS Trusted Advisor inspects your AWS environment and makes recommendations in several categories: cost optimization, performance, security, fault tolerance, service limits (quotas) and operational excellence. Cost optimization checks look for low-utilization EC2 instances, idle load balancers, underutilized EBS volumes, unassociated Elastic IP addresses, idle RDS instances, and opportunities to buy Reserved Instances or Savings Plans. Each check is shown as green (no problem detected), yellow (investigation recommended) or red (action recommended). All customers get a core set of checks, mainly security checks such as S3 bucket permissions and MFA on the root account, plus service quotas; the full set, including cost optimization, requires a Business Support plan or higher.",
   "AWS Compute Optimizer uses machine learning (ML) to analyze the historical utilization metrics of your resources and recommend optimal configurations. It covers EC2 instances, EC2 Auto Scaling groups, EBS volumes, AWS Lambda functions, Amazon ECS services on AWS Fargate, and some Amazon RDS databases and commercial software licenses. For each resource it reports whether it is over-provisioned, under-provisioned or optimized, and suggests better instance types or sizes with estimated savings and a performance risk rating. You opt in first, and it needs some history of metrics before it can recommend changes.",
   "Rightsizing recommendations are also available in AWS Cost Explorer, which identifies idle and underused EC2 instances and suggests downsizing or terminating them, showing estimated monthly savings. Cost Explorer also recommends Savings Plans and Reserved Instance purchases based on your usage history. AWS Cost Optimization Hub brings recommendations from several of these sources together in one place, deduplicates them and ranks them by estimated savings, which helps a team decide where to start. None of these tools changes your resources on its own; they report findings, and you decide which to apply after checking the application's real requirements, such as peak season load or memory needs that metrics may not fully capture.",
   "Tools only suggest; people act. A good routine is to review recommendations monthly, stop or delete idle resources, rightsize next so you do not commit to capacity you do not need, then cover the remaining steady usage with Savings Plans or Reserved Instances, and finally schedule non-production resources to stop outside working hours, for example with AWS Systems Manager or the Instance Scheduler solution. Changing an instance type usually needs a brief stop and start, so rightsizing is scheduled like any other change. Measure again afterward: if performance suffers, move one size up, which is easy in the cloud because you are never locked into hardware you bought.",
   "Consider a worked example. A company's monthly EC2 bill keeps rising. Trusted Advisor, available because the company has Business Support, flags twenty low-utilization instances and fifteen unassociated Elastic IP addresses. Compute Optimizer shows that the main application servers average under ten percent CPU and memory and recommends a smaller size in a newer generation with low performance risk. The team releases the Elastic IPs, deletes idle test servers, rightsizes the application tier in the next maintenance window, and then buys a Savings Plan sized to the new, smaller baseline instead of the old oversized one.",
   "Common mistakes: buying Savings Plans or RIs before rightsizing, locking in a discount on waste; expecting Compute Optimizer to cover every service or to change resources automatically; assuming Basic Support customers see all Trusted Advisor cost checks; and confusing Trusted Advisor, which checks many categories across the account, with AWS Config, which records configuration changes and evaluates compliance rules. Another trap is thinking a yellow check is an error; it means investigation is recommended.",
   "On the exam, 'best practice checks across cost, security, performance, fault tolerance and service quotas' points to Trusted Advisor. 'Machine learning recommendations for the optimal EC2 instance type or size based on utilization' points to Compute Optimizer. 'Identify idle or underused instances in the billing tools' points to Cost Explorer rightsizing recommendations. 'Single place to view and prioritize cost-saving recommendations' points to Cost Optimization Hub. 'Full Trusted Advisor checks' requires at least Business Support."
  ],
  "terms": [
   [
    "AWS Trusted Advisor",
    "A service that checks your account against best practices in cost, performance, security, fault tolerance, quotas and operational excellence."
   ],
   [
    "AWS Compute Optimizer",
    "A service that uses ML on utilization history to recommend optimal sizes for EC2, EBS, Lambda and other resources."
   ],
   [
    "Rightsizing",
    "Matching resource types and sizes to actual workload requirements at the lowest cost."
   ],
   [
    "Over-provisioned",
    "A resource larger than its workload needs, wasting money."
   ],
   [
    "Under-provisioned",
    "A resource too small for its workload, risking poor performance."
   ],
   [
    "AWS Cost Optimization Hub",
    "A console feature that consolidates and ranks cost-saving recommendations from several AWS tools."
   ]
  ],
  "example": "A software company's staging environment runs 24 hours a day on large instances copied from production. Compute Optimizer shows the staging servers are heavily over-provisioned, and Trusted Advisor lists several idle load balancers from finished projects. The team deletes the idle load balancers, moves staging to smaller instances, and uses a scheduler to stop staging at night and on weekends, cutting its staging cost by more than half without affecting developers.",
  "tip": "Trusted Advisor covers many categories across the account; Compute Optimizer focuses on rightsizing compute and related resources using ML. The full set of Trusted Advisor checks needs Business Support or higher.",
  "check": [
   [
    "Which service uses machine learning to recommend a better EC2 instance size based on past utilization?",
    "AWS Compute Optimizer."
   ],
   [
    "What five or six categories does Trusted Advisor check?",
    "Cost optimization, performance, security, fault tolerance, service limits (quotas) and operational excellence."
   ],
   [
    "Why should you rightsize before buying Savings Plans?",
    "So the commitment matches the capacity you actually need rather than locking in a discount on oversized resources."
   ],
   [
    "A Basic Support customer cannot see Trusted Advisor's cost optimization checks. Why?",
    "The full set of checks requires a Business Support plan or higher; Basic gets only core checks."
   ]
  ]
 },
 {
  "t": "AWS Support plans and what each includes, including Technical Account Managers and AWS Health",
  "body": [
   "AWS offers tiered Support plans, from free to enterprise-grade. What changes as you move up is who you can contact, how fast they respond, and how much proactive guidance you get. The plan lineup has been evolving, so confirm current names, features and prices on the AWS Support plans page before the exam (paid plans are generally priced as a percentage of monthly AWS spend with a minimum), but the concepts below reflect the plans the exam guide was written against: Basic, Developer, Business, Enterprise On-Ramp and Enterprise.",
   "Basic Support is included free for all accounts. It provides customer service for account and billing questions, access to documentation, whitepapers, AWS re:Post and the Knowledge Center, the core AWS Trusted Advisor checks and the AWS Health Dashboard. It does not include technical support cases. Developer Support adds business-hours email access to technical support engineers, typically for one primary contact, with general guidance response times measured in business hours, suited to experimenting and testing rather than production. Developer Support also gives architectural guidance on best practices, but not a person who knows your environment or phone access at weekends.",
   "Business Support is the first plan aimed at production workloads. It adds 24/7 phone, email and chat access to technical support for multiple contacts, response within an hour for a production system that is down, the full set of Trusted Advisor checks, programmatic access to AWS Health and Support through APIs, and help with common third-party software running on AWS. For many exam questions, Business is 'the minimum plan' that provides round-the-clock technical support and full Trusted Advisor.",
   "The enterprise tiers add proactive guidance. Enterprise On-Ramp is for customers starting their business-critical journey: it adds access to a pool of Technical Account Managers (TAMs), faster response for business-critical outages (within 30 minutes) and some proactive reviews. Enterprise Support provides a designated TAM, a named technical point of contact who knows your environment, gives proactive architecture and operational guidance, and coordinates access to AWS experts. It has the fastest response target for business-critical outages (within 15 minutes), a Concierge Support team for billing and account questions, and programs such as Infrastructure Event Management for planned launches and migrations.",
   "AWS Health provides information about events that can affect your AWS resources. The AWS Health Dashboard shows general service health for everyone and a personalized account view: scheduled maintenance, service issues affecting your resources, and account notifications such as expiring certificates, with guidance for remediation. It is available to all customers, and you can send its events to Amazon EventBridge to automate responses, for example notifying a team channel or starting a runbook. Because it is personalized to the resources you actually use, it is more useful than a generic public status page. Organizations can also see a combined view of Health events across all member accounts.",
   "Consider a worked example. A startup on Developer Support launches its product and soon has paying customers. One Saturday its production database misbehaves, but Developer only offers business-hours email support. After this, it upgrades to Business Support for 24/7 phone and chat and fast production-down response, and starts acting on the full Trusted Advisor checks. Two years later, as a major bank's supplier, it moves to Enterprise Support for a designated TAM who reviews its architecture before each big launch. Throughout, the team routes AWS Health events to EventBridge so it hears about scheduled maintenance early.",
   "Common mistakes: thinking Basic Support includes technical cases; assuming Developer Support offers 24/7 phone support; mixing up 'pool of TAMs' (Enterprise On-Ramp) with 'designated TAM' (Enterprise); thinking AWS Health is a paid feature; and confusing Trusted Advisor, which checks your configuration against best practices, with AWS Health, which reports AWS events that affect you. Another trap is choosing Enterprise when the question asks for the lowest-cost plan meeting a simpler need such as 24/7 technical support.",
   "On the exam, 'designated Technical Account Manager' means Enterprise Support, and 'pool of TAMs' means Enterprise On-Ramp. 'Fastest response for business-critical systems' or 'concierge billing support' points to Enterprise. 'Minimum plan with 24/7 phone support and all Trusted Advisor checks' is Business. 'Business-hours email technical support for testing' is Developer. 'Free, no technical support cases' is Basic. 'Personalized view of AWS events affecting my resources' is the AWS Health Dashboard."
  ],
  "terms": [
   [
    "Basic Support",
    "The free plan with billing and account support, documentation, core Trusted Advisor checks and AWS Health, but no technical cases."
   ],
   [
    "Developer Support",
    "A plan with business-hours email access to technical support for testing and early development."
   ],
   [
    "Business Support",
    "A plan with 24/7 technical support by phone, email and chat, fast production response and full Trusted Advisor checks."
   ],
   [
    "Enterprise On-Ramp",
    "A plan with a pool of Technical Account Managers and faster response for business-critical workloads."
   ],
   [
    "Enterprise Support",
    "The top plan with a designated TAM, the fastest critical response, concierge support and proactive programs."
   ],
   [
    "Technical Account Manager (TAM)",
    "An AWS technical contact who provides proactive guidance and advocacy for a customer."
   ],
   [
    "AWS Health Dashboard",
    "A personalized view of AWS events, maintenance and issues affecting your resources, free for all customers."
   ]
  ],
  "example": "An online retailer plans a major sales event and worries about capacity. Because it has Enterprise Support, its designated TAM arranges Infrastructure Event Management: AWS engineers review the architecture, confirm service quotas are raised in advance, and stand by during the event. When a brief issue affects one AZ during the sale, the AWS Health Dashboard shows exactly which resources are affected, and an EventBridge rule alerts the operations channel immediately.",
  "tip": "'Designated Technical Account Manager' means Enterprise Support; 'pool of TAMs' means Enterprise On-Ramp. The minimum plan with 24/7 phone support and all Trusted Advisor checks is Business.",
  "check": [
   [
    "Which is the least expensive Support plan offering 24/7 phone access to technical support?",
    "Business Support."
   ],
   [
    "A company wants a named AWS technical contact who proactively reviews its architecture. Which plan?",
    "Enterprise Support, which includes a designated Technical Account Manager."
   ],
   [
    "Does Basic Support include opening technical support cases?",
    "No. Basic covers account and billing support, documentation, core Trusted Advisor checks and AWS Health only."
   ],
   [
    "What does the AWS Health Dashboard show that a public status page does not?",
    "A personalized view of events, maintenance and issues affecting your own AWS resources, with remediation guidance."
   ]
  ]
 },
 {
  "t": "Help and partner resources: AWS re:Post, Knowledge Center, AWS Marketplace, AWS Partner Network, AWS Professional Services and the AWS Trust & Safety team",
  "body": [
   "Beyond Support plans, AWS has a set of resources for learning, buying software, getting expert help and reporting problems. They are easy to confuse because several involve 'help', but each fits a different need: community answers, curated troubleshooting articles, third-party products, outside consultants, AWS's own consultants, and a team that handles abuse. The exam checks that you can pick the right one from a short scenario.",
   "AWS re:Post is a community-driven question-and-answer service. You can ask technical questions, browse answers from the community and AWS experts, and read curated articles; accepted answers from AWS-verified experts are marked. It is available to everyone with no Support plan required. The AWS Knowledge Center, now hosted on re:Post, contains articles and videos answering the questions AWS Support receives most often, such as how to recover access to an instance or why a bucket policy denies access. Documentation, whitepapers, AWS Prescriptive Guidance and training through AWS Skill Builder round out the self-service resources.",
   "AWS Marketplace is a curated digital catalog where you find, buy, deploy and manage third-party software, data and services that run on AWS: security tools, databases, business applications, machine learning models and more. Listings may be Amazon Machine Images (AMIs), containers, software as a service (SaaS) subscriptions or professional services. Many offer free trials, hourly or annual pricing and bring-your-own-license options, and charges appear on your AWS bill, which simplifies procurement because the organization does not need a new vendor contract for each tool. Private offers let a buyer negotiate custom terms with a seller.",
   "The AWS Partner Network (APN) is a global community of companies that build solutions and services on AWS. Consulting partners (services partners) help customers design, migrate, build and manage workloads; technology partners (software partners) offer products that integrate with AWS, often sold through Marketplace. Partners earn AWS competencies and specializations to show validated expertise in areas such as migration, security or data analytics. AWS Professional Services is AWS's own global team of experts who work with customers, often alongside partners, on large projects to achieve specific business outcomes. AWS Solutions Architects also give customers architectural guidance, and AWS Training and Certification helps teams build their own skills.",
   "The AWS Trust & Safety team handles reports of abuse involving AWS resources, such as spam, port scanning, denial of service (DoS) attacks, intrusion attempts, malware distribution, phishing websites and hosting objectionable content. If you believe an AWS resource is being used for abuse, you report it to Trust & Safety through the abuse reporting form, including evidence such as logs with timestamps and IP addresses. AWS may also contact you through Trust & Safety if your own resources appear to be involved, for example an instance compromised and sending spam. It is not a support channel for problems with your own account; those go to AWS Support.",
   "Consider a worked example. A mid-sized company's migration team starts by reading AWS Prescriptive Guidance and asking a question on re:Post about a database migration error, which a Knowledge Center article resolves. It buys a backup product through AWS Marketplace so the cost lands on the AWS bill. Because it lacks in-house experience, it hires an APN consulting partner with the migration competency, and AWS Professional Services joins for the largest application. Months later, its web server logs show repeated attacks from an EC2 IP address, so the security team reports it to AWS Trust & Safety with the relevant log excerpts.",
   "Common mistakes: sending abuse reports to AWS Support, AWS Shield or Amazon GuardDuty instead of Trust & Safety; assuming re:Post requires a paid plan; thinking Marketplace sells only AWS services; confusing APN partners, which are independent companies, with AWS Professional Services, which is part of AWS; and treating the Knowledge Center as a place to open cases. Another trap is looking for AWS compliance reports in Marketplace; those come from AWS Artifact.",
   "On the exam, clue words map directly. 'Community answers' or 'ask a question publicly' means re:Post. 'Articles on the most common support questions' means the Knowledge Center. 'Buy third-party software billed through AWS' means Marketplace. 'Outside experts' or 'certified consulting firm' means APN partners. 'AWS's own consultants for a large engagement' means AWS Professional Services. 'Report spam, phishing or attacks coming from AWS resources' means the AWS Trust & Safety team."
  ],
  "terms": [
   [
    "AWS re:Post",
    "AWS's free community question-and-answer site with answers from customers and AWS experts."
   ],
   [
    "AWS Knowledge Center",
    "Articles and videos, hosted on re:Post, answering the most common AWS Support questions."
   ],
   [
    "AWS Marketplace",
    "A curated catalog of third-party software, data and services that can be purchased and billed through AWS."
   ],
   [
    "AWS Partner Network (APN)",
    "The global program of consulting and technology partners that build on AWS."
   ],
   [
    "AWS Professional Services",
    "AWS's own team of consultants that helps customers with large projects and business outcomes."
   ],
   [
    "AWS Trust & Safety team",
    "The AWS team that investigates reports of abuse involving AWS resources."
   ],
   [
    "AWS Prescriptive Guidance",
    "AWS-published strategies, guides and patterns for migrating and running workloads."
   ]
  ],
  "example": "A small online shop notices thousands of phishing emails linking to a fake login page, and the page's IP address belongs to AWS. Rather than opening a support case about its own account, the shop reports the page to the AWS Trust & Safety team through the abuse form with copies of the emails and timestamps. Trust & Safety investigates and works with the resource owner to have the page removed.",
  "tip": "Reporting abuse coming from AWS resources, such as spam, phishing or attacks, always goes to the AWS Trust & Safety team, not to AWS Support, AWS Shield or GuardDuty.",
  "check": [
   [
    "Where can anyone ask a technical AWS question and get answers from the community without a Support plan?",
    "AWS re:Post."
   ],
   [
    "A company wants to hire an outside firm with validated AWS migration expertise. What should it look for?",
    "An AWS Partner Network consulting partner with the relevant competency, such as migration."
   ],
   [
    "You receive attack traffic from an IP address owned by AWS. Whom do you contact?",
    "The AWS Trust & Safety team, through the abuse reporting form."
   ],
   [
    "What is the difference between APN partners and AWS Professional Services?",
    "APN partners are independent companies; AWS Professional Services is AWS's own team of consultants."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
