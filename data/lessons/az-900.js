/* Lessons for Microsoft Certified: Azure Fundamentals (AZ-900): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-900", [
 {
  t: "What cloud computing is, and the shared responsibility model across on-premises, IaaS, PaaS and SaaS",
  body: [
   "Cloud computing is the delivery of computing services, such as servers, storage, databases, networking and software, over the internet from a provider's datacenters. Instead of buying and running your own hardware, you rent capacity from a provider like Microsoft Azure, create it in minutes, and pay only for what you use. The provider owns the buildings, power, cooling and physical machines; you get the virtual resources on top.",
   "Moving to the cloud does not mean handing over all responsibility. The shared responsibility model describes which tasks belong to the cloud provider and which stay with you, the customer. The split depends on the service type you choose. In an on-premises datacenter you are responsible for everything: the building, physical servers, network, operating systems, applications, identities and data.",
   "With infrastructure as a service (IaaS), such as Azure virtual machines, Microsoft takes over the physical layer: the datacenter, physical network and physical hosts, including the hypervisor. You still manage the guest operating system, its patches, the applications, network controls such as firewall rules you configure, identities and data. With platform as a service (PaaS), such as Azure App Service or Azure SQL Database, Microsoft also runs the operating system and runtime, so you focus on your application code, its configuration and your data. With software as a service (SaaS), such as Microsoft 365, Microsoft runs the whole application, and you mainly configure it and manage who uses it.",
   "Some responsibilities never move to the provider, no matter which service type you pick. You always own your information and data, the devices (laptops and phones) that connect to the service, and the accounts and identities that sign in. If an employee's password is stolen, or someone shares sensitive files publicly, that is the customer's problem in every model. Likewise, some responsibilities always belong to the provider in the cloud: physical hosts, the physical network and the physical datacenter.",
   "A helpful way to remember the model is a stack of layers from the building up to the data. Going from on-premises to IaaS to PaaS to SaaS, the line between 'provider manages' and 'you manage' moves higher up the stack. The more the provider manages, the less control you have and the less operational work you do."
  ],
  terms: [
   ["Cloud computing", "Delivery of computing services such as servers, storage and software over the internet, billed by use instead of bought as hardware."],
   ["Shared responsibility model", "The division of security and management tasks between the cloud provider and the customer, which changes with the service type."],
   ["Guest operating system", "The OS running inside a virtual machine; in IaaS the customer installs, configures and patches it."],
   ["Hypervisor", "The software on a physical host that runs virtual machines; in the cloud the provider manages it."]
  ],
  example: "A retailer moves its inventory app from its own server room to Azure VMs. Microsoft now replaces failed disks and secures the datacenter, but the retailer's IT team still installs monthly Windows updates on the VMs, controls who can sign in, and backs up the inventory data.",
  tip: "Exam questions often ask who patches something. Physical hosts and the hypervisor are always Microsoft's; the guest OS in IaaS is yours; data, devices, accounts and identities are always yours.",
  check: [
   ["In IaaS, who applies security updates to the Windows Server OS inside a VM?", "The customer. In IaaS Microsoft manages the physical hosts and hypervisor, but the guest operating system is the customer's responsibility."],
   ["Name the responsibilities that stay with the customer in every service type.", "Information and data, devices (endpoints), and accounts and identities."]
  ]
 },
 {
  t: "Cloud models: public, private and hybrid cloud, plus multicloud and where Azure Arc fits",
  body: [
   "A cloud model, sometimes called a deployment model, describes where cloud resources run and who uses them. The AZ-900 exam expects you to recognize three main models, public, private and hybrid, and to know the related term multicloud.",
   "A public cloud is built, owned and run by a third-party provider such as Microsoft, and its services are offered to anyone over the internet. Many customers (tenants) share the same physical infrastructure, although each tenant's resources are isolated. Public cloud has no upfront hardware cost, you can provision resources in minutes, and you pay for what you use. The trade-off is that you do not control the physical hardware or exactly where every component lives beyond choosing a region.",
   "A private cloud is used by a single organization. It can run in the organization's own datacenter or be hosted by a third party, but the resources are dedicated to that one organization. Private cloud gives the most control over hardware, security and configuration, which can help with strict compliance needs, but the organization must buy, maintain and eventually replace the hardware, so it loses much of the cost and speed advantage of public cloud.",
   "A hybrid cloud combines public and private clouds and lets data and applications move or work together between them. A common reason is regulation or latency: a hospital might keep its patient records on hardware it owns while running its public website and analytics in Azure, connected by a secure link. Hybrid also helps companies migrate gradually, or burst into the public cloud when on-premises capacity runs out.",
   "Multicloud means using services from more than one public cloud provider, for example Azure and another provider, perhaps because different teams chose different platforms or to use a feature one provider offers. Multicloud is about several providers; hybrid is about mixing private and public. An organization can be both at once.",
   "Managing resources spread across on-premises and several clouds is hard, because each place has its own tools. Azure Arc addresses this. It projects servers, Kubernetes clusters and some data services that run outside Azure into Azure Resource Manager, so they appear in the Azure portal and can be governed with the same tools you use for Azure resources, such as Azure Policy, role-based access control, tags and monitoring. Arc does not move the workload; it stays where it is."
  ],
  terms: [
   ["Public cloud", "Cloud services owned and run by a provider and offered to many customers over the internet."],
   ["Private cloud", "Cloud resources dedicated to one organization, either on-premises or hosted by a third party."],
   ["Hybrid cloud", "A combination of private and public cloud resources that work together."],
   ["Multicloud", "Using services from two or more public cloud providers."],
   ["Azure Arc", "A service that lets you manage servers, Kubernetes clusters and data services outside Azure through Azure Resource Manager."]
  ],
  example: "A manufacturer runs factory control servers on-premises, its web shop in Azure, and a data warehouse in another public cloud. It connects the servers and the other cloud's Kubernetes cluster to Azure Arc so its security team can apply the same Azure Policy rules and tags to everything from one portal.",
  tip: "Hybrid means private plus public; multicloud means more than one public provider. If the question is about managing non-Azure resources from Azure without moving them, the answer is Azure Arc, not Azure Migrate.",
  check: [
   ["A company uses Azure and another public cloud but has no on-premises servers. Which term fits best?", "Multicloud, because it uses more than one public cloud provider. Hybrid would require a private or on-premises component."],
   ["Which cloud model gives an organization the most control over its hardware?", "Private cloud, because the resources are dedicated to that one organization, which also means it pays for and maintains them."]
  ]
 },
 {
  t: "The consumption-based model and pay-as-you-go pricing compared with buying hardware",
  body: [
   "When you run your own datacenter, you buy servers, storage and network equipment before you can use them. You have to guess how much capacity you will need for the next several years. If you guess too low, applications slow down and you wait weeks for new hardware. If you guess too high, you have paid for machines that sit idle. You also pay for power, cooling, space and staff whether the machines are busy or not.",
   "The cloud uses a consumption-based model: you pay for the resources you actually use, and nothing up front. Azure measures usage, such as how many hours a virtual machine ran, how many gigabytes are stored, or how many times a function executed, and bills you for it, typically monthly. When you delete a resource, its charges stop. This pricing approach is usually called pay-as-you-go.",
   "Consumption-based pricing brings several benefits. There are no upfront costs, so a small team can start a project without a hardware budget. You do not need to buy and manage costly infrastructure you might not use. You can add resources when you need them and remove them when you do not, so you stop paying for capacity during quiet periods. And it becomes easy to experiment: you can try an idea for a day and delete it.",
   "Pay-as-you-go is not the only purchase option. For steady workloads you can commit in advance, for example with Azure Reservations for one or three years, in exchange for a lower price, and you will meet these in the cost management lessons. The exam focus here is the basic idea: in the cloud, cost follows usage, while on-premises cost follows what you bought.",
   "Consumption pricing also changes what you have to watch. Because resources are easy to create, costs can grow quietly if people forget to delete test machines. That is why Azure provides cost tools such as budgets and cost analysis, and why labs in this course remind you to delete resource groups when you finish."
  ],
  terms: [
   ["Consumption-based model", "A pricing approach where you pay only for the cloud resources you use, with no upfront cost."],
   ["Pay-as-you-go", "Being billed, usually monthly, for the actual usage of services, with charges stopping when resources are removed."],
   ["Overprovisioning", "Buying more capacity than you need, which wastes money on idle hardware."]
  ],
  example: "A school needs extra web servers only during the two weeks when exam results are published. On-premises it would have to buy servers that sit idle the rest of the year. In Azure it runs extra instances for those two weeks, pays for them only during that time, and removes them afterward.",
  tip: "If a question mentions no upfront cost, paying only for what you use, or being able to stop paying when you stop using a service, the concept is the consumption-based model.",
  check: [
   ["What happens to the cost of an Azure resource under pay-as-you-go when you delete it?", "Its charges stop, because you are billed only for what you consume."],
   ["Give two problems of buying hardware that the consumption-based model avoids.", "Paying up front for capacity you must guess in advance, and paying for idle hardware when demand is lower than planned."]
  ]
 },
 {
  t: "Capital expenditure (CapEx) vs operational expenditure (OpEx) and how the cloud shifts spending",
  body: [
   "Finance teams group spending into two kinds, and the AZ-900 exam expects you to recognize both. Capital expenditure (CapEx) is money spent up front on physical assets that the organization owns and uses for years, such as servers, storage arrays, network equipment or a building. Because the asset lasts several years, its cost is usually spread out over time on the books through depreciation.",
   "Operational expenditure (OpEx) is money spent on services or products as they are used, such as a monthly cloud bill, software subscriptions or electricity. OpEx is usually recorded in the same period it is spent, and there is no asset to depreciate. You can generally increase or decrease OpEx as your needs change.",
   "A traditional datacenter is mostly CapEx. To add capacity you buy hardware, wait for it to arrive, install it and then use it for years whether you need all of it or not. Other datacenter costs, such as staff and power, are ongoing, but the big decisions are large purchases made in advance.",
   "Cloud computing is mostly OpEx. You rent compute, storage and services from the provider and pay each month for what you consumed, with no hardware purchase. This means you do not need to find a large sum at the start of a project, and your spending can follow your actual demand. If a project is cancelled, you delete the resources and stop paying, rather than owning equipment you no longer need.",
   "The shift from CapEx to OpEx is a business benefit, not only a technical one. It lowers the barrier to starting new projects and reduces the risk of guessing wrong about future capacity. It also changes who watches the money: instead of approving a single large purchase, organizations track a monthly bill that can rise or fall, which is why budgets and cost alerts matter in the cloud."
  ],
  terms: [
   ["Capital expenditure (CapEx)", "Up-front spending on physical assets that are owned and depreciated over their useful life."],
   ["Operational expenditure (OpEx)", "Ongoing spending on services or products as they are consumed, recorded in the period it occurs."],
   ["Depreciation", "Spreading the cost of an owned asset over the years it is used."]
  ],
  example: "An IT manager can either buy a storage array now and depreciate it over five years (CapEx), or store the same data in Azure Storage and pay a monthly bill that grows or shrinks with the amount stored (OpEx). Choosing Azure means no large purchase approval is needed.",
  tip: "Buying hardware, building a datacenter or anything depreciated over years is CapEx. A monthly bill for cloud services you use is OpEx. The cloud's consumption-based model is an OpEx model.",
  check: [
   ["A startup pays Azure each month for the VMs it ran. Is this CapEx or OpEx?", "OpEx, because it is ongoing spending on a service as it is consumed, with no asset purchased."],
   ["Why is replacing servers every few years considered CapEx?", "Because the organization pays up front for physical assets it owns and depreciates them over their useful life."]
  ]
 },
 {
  t: "High availability, service-level agreements (SLAs) and composite availability",
  body: [
   "Availability is the proportion of time a service is up and usable. High availability means designing a system so it stays available even when some part of it fails, for example by running more than one instance so that another can take over. In the cloud, you get high availability by combining Azure features such as multiple virtual machines, availability zones and redundant storage.",
   "Microsoft describes its commitment for each Azure service in a service-level agreement (SLA). An SLA is a formal document that states the uptime and connectivity Microsoft commits to for a service, usually as a percentage over a month, such as 99.9% or 99.99%. It also states what happens if Microsoft misses that target, typically a service credit, which is a discount on your bill. SLAs apply to paid services; free services and preview features generally do not have a financially backed SLA.",
   "Small differences in the percentage matter a lot. In a 30-day month there are about 43,200 minutes. An SLA of 99.9% allows about 43 minutes of downtime in that month; 99.95% allows about 22 minutes; 99.99% allows about 4 minutes. Each extra nine divides the allowed downtime by roughly ten. You can calculate this yourself: multiply the minutes in the month by the unavailable fraction, for example 43,200 x 0.001 = 43.2 minutes.",
   "The SLA a service gets can depend on how you deploy it. For example, a single virtual machine has a lower SLA than two or more VMs spread across availability zones, because the redundant design can survive the loss of one machine or one datacenter. Check the current SLA document for the exact figures rather than memorizing them, because they can change.",
   "An application usually depends on several services, such as a web app and a database. If the application needs every one of them working, its overall availability, called the composite SLA, is found by multiplying the individual SLAs. For instance, two services each at 99.9% give 0.999 x 0.999, about 99.8%, which is lower than either one alone. Adding dependencies lowers availability; adding redundant copies of a component raises it."
  ],
  terms: [
   ["High availability", "Designing a system to keep running with minimal downtime even when individual components fail."],
   ["Service-level agreement (SLA)", "Microsoft's formal commitment to a service's uptime and connectivity, with service credits if it is not met."],
   ["Composite SLA", "The combined availability of an application that depends on several services, calculated by multiplying their SLAs."],
   ["Service credit", "A percentage of the monthly fee refunded when Microsoft does not meet an SLA."]
  ],
  example: "An online booking site runs on an App Service web app and an Azure SQL database, and both must work for bookings to succeed. Even if each has a high SLA, the site's composite availability is the product of the two, so the architect adds redundancy to the most critical components rather than assuming the site inherits the best SLA.",
  tip: "Composite SLAs are always lower than the lowest individual SLA in the chain. More nines means less allowed downtime, not more.",
  check: [
   ["About how much downtime per 30-day month does a 99.9% SLA allow?", "About 43 minutes, because 0.1% of 43,200 minutes is 43.2 minutes."],
   ["An app needs a web tier at 99.95% and a database at 99.99%. Is its composite SLA higher or lower than 99.95%?", "Lower. Multiplying 0.9995 by 0.9999 gives about 99.94%, below either service on its own."]
  ]
 },
 {
  t: "Scalability and elasticity: scaling up vs scaling out, manual vs automatic",
  body: [
   "Scalability is the ability to adjust resources to meet demand. If more people use your application, a scalable system can add capacity so it stays fast; if fewer people use it, you can remove capacity so you stop paying for it. In the cloud, scaling is a configuration change or a few clicks rather than a hardware purchase.",
   "There are two directions of scaling. Vertical scaling, also called scaling up, gives an existing resource more power, such as moving a virtual machine to a size with more CPU cores or memory. Scaling down is the reverse. Vertical scaling is simple, because the application still runs on one machine, but there is a limit to how large a single machine can be, and resizing a VM usually requires a restart.",
   "Horizontal scaling, also called scaling out, adds more instances of a resource, such as going from two web servers to six behind a load balancer. Scaling in removes instances. Horizontal scaling can grow much further than vertical scaling and improves availability, because the loss of one instance does not stop the service, but the application must be designed so several copies can share the work.",
   "Scaling can be manual or automatic. Manual scaling means an administrator decides when to change the size or number of instances. Automatic scaling, often called autoscale, uses rules or schedules: for example, add an instance when average CPU stays above a threshold for several minutes, and remove one when it stays low. Services such as virtual machine scale sets and App Service support autoscale.",
   "Elasticity is the term for scaling automatically in both directions as demand changes. An elastic system grows when a surge arrives and shrinks when it passes, without anyone clicking a button, so you only pay for extra capacity while you need it. On the exam, scalability is the general ability to add or remove resources; elasticity specifically implies that this happens automatically and dynamically."
  ],
  terms: [
   ["Scaling up (vertical)", "Increasing the capacity of a single resource, for example giving a VM more CPU or memory."],
   ["Scaling out (horizontal)", "Adding more instances of a resource so the work is shared among them."],
   ["Elasticity", "Automatically adding and removing resources as demand rises and falls."],
   ["Autoscale", "A feature that changes the number of instances based on metrics or a schedule."]
  ],
  example: "A ticket-sales site runs on a virtual machine scale set with an autoscale rule. When a popular concert goes on sale, CPU climbs and the scale set adds instances; an hour later, when traffic drops, it removes them again. The company pays for the extra instances only for that hour.",
  tip: "Up and down change the size of one resource; out and in change the number of resources. If the question says 'automatically' in response to demand, think elasticity or autoscale.",
  check: [
   ["You move a VM from 2 vCPUs to 8 vCPUs. Which kind of scaling is this?", "Vertical scaling, or scaling up, because one resource got more capacity."],
   ["What makes a system elastic rather than simply scalable?", "It adds and removes resources automatically as demand changes, instead of needing someone to change capacity by hand."]
  ]
 },
 {
  t: "Reliability and predictability of performance and cost in the cloud",
  body: [
   "Reliability is the ability of a system to recover from failures and continue to function. In the cloud, reliability comes from the provider's global scale and from how you design your solution. Azure runs datacenters in many regions around the world, and many regions contain several availability zones. If you spread a workload across zones or regions, a failure in one place does not have to take your application down.",
   "Reliability also covers recovery. Services such as geo-redundant storage keep copies of data in another region, and backup and disaster recovery services let you restore data or fail over to another region. The cloud makes these designs affordable because you do not have to build and pay for a second datacenter yourself. Some reliability features are built in; others you must choose and configure.",
   "Predictability is about being able to plan with confidence. The exam splits it into two parts. Performance predictability means you can count on your application having the resources it needs. Autoscaling adds capacity when demand grows, and load balancing spreads requests so no single instance is overwhelmed. Because you can scale quickly, you are less likely to be caught by a sudden rush of users.",
   "Cost predictability means you can forecast and control what you will spend. The cloud provides tools for this: the Pricing Calculator estimates costs before you deploy, Microsoft Cost Management tracks actual spending and forecasts it, and budgets send alerts when spending approaches a limit. Reservations for steady workloads also make costs more predictable by fixing the price for a term.",
   "The Microsoft Azure Well-Architected Framework, a free set of guidance, includes reliability, performance efficiency and cost optimization among its pillars. You do not need to know the framework in depth for AZ-900, but it is a reminder that these benefits are not automatic: you get them by choosing the right redundancy options, scaling rules and cost controls."
  ],
  terms: [
   ["Reliability", "The ability of a system to recover from failures and keep working."],
   ["Performance predictability", "Confidence that an application will have the resources it needs, helped by autoscaling and load balancing."],
   ["Cost predictability", "The ability to forecast and control cloud spending with tools such as calculators, budgets and cost analysis."]
  ],
  example: "A payroll company deploys its app across availability zones so a datacenter outage does not stop salary runs (reliability), adds autoscale for month-end peaks (performance predictability), and sets a monthly budget with alerts in Cost Management so finance can forecast the bill (cost predictability).",
  tip: "Know which tool supports which kind of predictability: autoscaling and load balancing for performance; the Pricing Calculator, TCO Calculator and Cost Management for cost.",
  check: [
   ["Which two techniques help keep performance predictable when demand changes?", "Autoscaling, which adds or removes resources, and load balancing, which spreads traffic across instances."],
   ["How does the cloud make it easier to build a reliable, geographically distributed solution?", "The provider already runs datacenters and availability zones in many regions, so you can deploy to several of them without building your own sites."]
  ]
 },
 {
  t: "Security, governance and manageability benefits of the cloud (management of the cloud vs in the cloud)",
  body: [
   "Moving to the cloud can strengthen security and governance, not only lower costs. Microsoft invests heavily in the physical security of its datacenters, in protecting its network against attacks such as large-scale distributed denial-of-service (DDoS) floods, and in keeping the underlying platform patched. Depending on the service type, you can also hand over operating system patching to Microsoft, which removes a common source of vulnerabilities. You still decide who has access and how your data is protected.",
   "Governance means setting rules and making sure resources follow them, for example allowing resources only in approved regions or requiring certain tags. In Azure you can deploy templates that already meet corporate standards, audit resources against policies with Azure Policy, and see compliance reports. Because these controls are applied centrally, it is easier to keep hundreds of resources consistent than it would be with manual checks on physical servers. Microsoft also publishes compliance reports for its services, so you can see which standards the platform meets.",
   "Manageability is split into two ideas that the exam names directly. Management of the cloud means managing your cloud resources: automatically scaling them, deploying them from templates, monitoring their health, and receiving alerts when something goes wrong. It is about the resources themselves.",
   "Management in the cloud means the ways you interact with and manage your environment: through the web-based Azure portal, a command-line interface such as Azure CLI or Azure PowerShell, application programming interfaces (APIs), or automation. It is about the tools and interfaces you use.",
   "Put simply, 'of' is about what the cloud lets you do to your resources, such as autoscale, templates and monitoring, while 'in' is about how you reach in to manage them, such as the portal, CLI and APIs. Both mean less manual effort than running your own hardware, but the exam may ask you to sort examples into one category or the other."
  ],
  terms: [
   ["Governance", "Setting and enforcing rules and standards for how cloud resources are created and used."],
   ["Management of the cloud", "Managing the cloud resources themselves: scaling, deploying from templates, monitoring and alerting."],
   ["Management in the cloud", "The interfaces used to manage resources: the portal, command-line tools, APIs and automation."],
   ["DDoS protection", "Defenses that absorb or filter floods of traffic intended to make a service unavailable."]
  ],
  example: "An IT team sets autoscale on its web tier and receives alerts when errors spike, which is management of the cloud. Its administrators make those changes from the Azure portal and scripts in Azure CLI, which is management in the cloud. Azure Policy blocks anyone from creating resources outside two approved regions, which is governance.",
  tip: "If the example is a feature acting on resources (autoscale, templates, monitoring, alerts), it is management of the cloud. If it is a way to access Azure (portal, CLI, PowerShell, APIs), it is management in the cloud.",
  check: [
   ["Is using Azure PowerShell to create a storage account an example of management of the cloud or in the cloud?", "Management in the cloud, because it is an interface for managing the environment."],
   ["Give one governance benefit of the cloud.", "You can enforce standards centrally, for example with Azure Policy restricting allowed regions, and audit resources for compliance."]
  ]
 },
 {
  t: "Infrastructure as a service (IaaS): what you manage and typical use cases such as lift-and-shift",
  body: [
   "Infrastructure as a service (IaaS) is the cloud service type that gives you the most control. The provider supplies the physical building blocks, datacenter, physical servers, storage hardware and physical network, and you rent virtual versions of them. The best-known IaaS service in Azure is virtual machines, together with virtual networks and managed disks.",
   "Under the shared responsibility model, IaaS leaves you with the most work among cloud service types. Microsoft keeps the hardware running, secures the physical datacenter and manages the hypervisor. You choose and manage the operating system, apply its updates, install and configure middleware and runtimes, deploy applications, configure network controls such as firewall rules, and protect your data and identities. You can install almost any software you like, just as on your own server.",
   "The most common IaaS scenario is lift-and-shift migration. An organization takes existing servers from its datacenter and recreates them as Azure VMs with minimal changes. This is fast, because the application does not need to be redesigned, and it lets the company close a datacenter or avoid replacing ageing hardware. Later, it may modernize parts of the application to use PaaS services.",
   "Other typical IaaS uses include testing and development, where teams create and delete environments quickly; applications that need a specific operating system, configuration or legacy software that a PaaS service does not support; and workloads that need administrator-level control over the machine. IaaS is also useful for storage, backup and high-performance computing where you want fine control over the virtual hardware.",
   "The trade-off is effort. Because you own the OS, you are responsible for patching, antivirus, backup configuration and hardening. If you do not need that level of control, PaaS usually costs less to operate because Microsoft does more of the work."
  ],
  terms: [
   ["Infrastructure as a service (IaaS)", "A cloud service type where the provider supplies virtual compute, storage and networking and the customer manages the OS and everything above it."],
   ["Lift-and-shift", "Moving existing servers to the cloud as virtual machines with little or no change to the application."],
   ["Virtual machine (VM)", "A software emulation of a physical computer, with its own OS, running on a provider's host."]
  ],
  example: "A law firm's document system runs on an old Windows Server with custom software that the vendor no longer updates. The firm moves it to an Azure VM with the same OS and configuration so it can retire the ageing server, accepting that its IT team still patches and backs up the VM.",
  tip: "If a scenario stresses maximum control, a custom or legacy OS configuration, or moving servers without changing them, the answer is IaaS.",
  check: [
   ["Which service type best fits migrating on-premises servers to Azure without redesigning the applications?", "IaaS, because Azure VMs let you recreate the servers as they are (lift-and-shift)."],
   ["In IaaS, name two tasks that remain the customer's responsibility.", "Any two of: managing and patching the guest OS, installing applications, configuring network controls, protecting data, and managing identities."]
  ]
 },
 {
  t: "Platform as a service (PaaS) and serverless: what the provider manages and typical use cases",
  body: [
   "Platform as a service (PaaS) is a middle ground between IaaS and SaaS. The provider manages the physical infrastructure and also the operating system, middleware, runtime and development tools. You bring your application code and data, and configure how the service runs. You do not sign in to servers or install updates on them.",
   "Examples of PaaS in Azure include Azure App Service for hosting web apps and APIs, Azure SQL Database for managed relational databases, and Azure Cosmos DB for globally distributed NoSQL data. With Azure SQL Database, for example, Microsoft handles the database engine upgrades, patches and backups; you design tables, write queries and control who can connect.",
   "Under the shared responsibility model, PaaS moves the line up the stack. Microsoft is responsible for the OS and runtime, which removes patching work and reduces the attack surface you have to maintain. Responsibility for applications, network controls and identity is often shared, because you configure them using settings the platform provides. As always, you remain responsible for your data, devices and accounts.",
   "Typical PaaS use cases are building and deploying applications quickly, especially when developers want to concentrate on code rather than infrastructure. PaaS services usually include built-in scaling, load balancing and high availability options, and many support deployment directly from source control. The trade-off is less control: you cannot pick every OS setting or install arbitrary software on the underlying machines.",
   "Serverless computing is often grouped with PaaS. With serverless, you do not manage servers at all, and in its consumption-style plans you pay only when your code runs. Azure Functions runs small pieces of code in response to events, such as an HTTP request, a new file in storage or a timer, and scales automatically. Azure Logic Apps builds workflows that connect services with little or no code. Servers still exist, but the provider handles them completely, and the application is designed around events."
  ],
  terms: [
   ["Platform as a service (PaaS)", "A cloud service type where the provider manages the infrastructure, OS and runtime, and the customer manages applications and data."],
   ["Serverless", "A model where the provider fully manages the servers, scales automatically and can bill per execution."],
   ["Azure Functions", "An event-driven serverless compute service that runs code in response to triggers such as HTTP requests or timers."],
   ["Azure App Service", "A PaaS service for hosting web applications, REST APIs and mobile back ends."]
  ],
  example: "A small development team builds a customer portal on Azure App Service with an Azure SQL database. They deploy new code from their repository several times a week and never patch an operating system. A function in Azure Functions resizes each photo customers upload, running only when a new file arrives.",
  tip: "If developers want to focus on code and not manage the OS, choose PaaS. If code should run only when an event happens and be billed per execution, think serverless, usually Azure Functions.",
  check: [
   ["Who patches the database engine for Azure SQL Database?", "Microsoft, because Azure SQL Database is a PaaS service and the provider manages the platform."],
   ["What makes Azure Functions 'serverless'?", "You write only the code and its triggers; the provider fully manages and scales the servers, and in the consumption plan you pay only when the function runs."]
  ]
 },
 {
  t: "Software as a service (SaaS) and choosing between IaaS, PaaS and SaaS for a scenario",
  body: [
   "Software as a service (SaaS) is a complete application that the provider runs and delivers over the internet, usually for a subscription fee per user. Familiar examples are Microsoft 365 for email and office apps, Microsoft Teams, and Dynamics 365 for business processes. You use the software through a web browser or a client app; you do not deploy servers, write the application or manage its platform.",
   "SaaS is the service type with the least customer responsibility. The provider manages the infrastructure, operating system, runtime and the application itself, including updates and new features. You still manage what never leaves the customer: your data, the devices that connect, and user accounts and identities, including configuring settings such as who can share files outside the organization.",
   "The benefit of SaaS is speed and simplicity: you can start using a mature application almost immediately, with predictable per-user pricing and no maintenance. The trade-off is the least control. You can configure the application within the options it offers, but you cannot change how it is built or where its servers run beyond what the provider allows.",
   "Choosing between the three types is a common exam scenario. Ask how much control the scenario needs and who should do the work. If you need full control over the OS or must move existing servers as they are, choose IaaS. If developers want to build and deploy their own application without managing servers, choose PaaS. If the business simply needs a finished application such as email, a CRM or file sharing, choose SaaS.",
   "Organizations often use all three at once. A company might run a legacy system on Azure VMs (IaaS), host a new customer website on App Service (PaaS) and use Microsoft 365 for staff email (SaaS). The shared responsibility is different for each, so security teams need to know which type each workload uses."
  ],
  terms: [
   ["Software as a service (SaaS)", "A complete application run and maintained by the provider and used by customers over the internet, usually by subscription."],
   ["Subscription licensing", "Paying a recurring fee, often per user, to use software rather than buying it outright."],
   ["Tenant configuration", "The settings a customer controls in a SaaS product, such as sharing policies and user access."]
  ],
  example: "A charity needs email, calendars and document sharing for 30 volunteers, has no IT staff and no developers. Microsoft 365, a SaaS product, fits: the volunteers sign in and use it, and the charity only manages accounts and sharing settings.",
  tip: "Match the scenario to control needed: full OS control or lift-and-shift is IaaS, build-your-own-app without servers is PaaS, ready-to-use application is SaaS. Data and identities are the customer's in all three.",
  check: [
   ["A company wants a ready-made CRM system without deploying or maintaining any software. Which service type fits?", "SaaS, because the provider delivers and maintains the complete application."],
   ["Which service type leaves the customer with the fewest management responsibilities?", "SaaS. The provider runs everything up to and including the application; the customer keeps data, devices and identities."]
  ]
 },
 {
  t: "Azure regions, region pairs and sovereign regions (Azure Government, Azure operated by 21Vianet in China)",
  body: [
   "An Azure region is a geographical area on the planet that contains at least one, and usually several, Azure datacenters connected by a low-latency network. When you create most resources, you choose a region, such as East US or West Europe. The region decides where your resource physically runs and where its data is stored, which affects latency for your users, which services and VM sizes are available, the price, and whether you meet data-residency requirements.",
   "Not every service or feature is offered in every region, and prices can differ between regions. Some services are global and do not ask you to pick a region at all, such as Microsoft Entra ID, Azure Front Door and Azure DNS. Regions are grouped into geographies, which are markets such as the United States or Europe that share data-residency and compliance boundaries.",
   "Many Azure regions are paired with another region in the same geography, typically far enough apart that a regional disaster such as a flood or major power failure is unlikely to affect both. Region pairs bring several benefits. If there is a broad outage, Microsoft prioritizes recovering one region of each pair. Planned platform updates are rolled out to one region of a pair at a time, reducing the chance that both are affected by a bad update. Some services, such as geo-redundant storage, replicate data to the paired region. Most pairs are two-way, but a few are one-way, and some newer regions have no pair and rely on availability zones for resilience.",
   "Sovereign regions are instances of Azure that are physically and logically isolated from the main public Azure cloud for legal or compliance reasons. Azure Government serves US government agencies and their partners, with datacenters operated by screened US personnel and additional compliance certifications. Azure in China is operated by 21Vianet, a separate company, rather than directly by Microsoft; Microsoft does not operate the datacenters there. Sovereign clouds have their own portals and endpoints, and not every public Azure service is available in them.",
   "When choosing a region, weigh closeness to users, service availability, cost and compliance. For resilience, design across availability zones in one region, and across a pair of regions for disaster recovery."
  ],
  terms: [
   ["Region", "A geographic area containing one or more Azure datacenters connected by a low-latency network."],
   ["Region pair", "Two regions in the same geography linked for disaster recovery, staggered updates and prioritized recovery."],
   ["Sovereign region", "An isolated instance of Azure for specific legal or compliance needs, such as Azure Government or Azure in China."],
   ["Geography", "A market containing one or more regions that shares data-residency and compliance boundaries."]
  ],
  example: "A European retailer deploys its web app in a region in Western Europe to keep customer data inside the EU and to give its customers low latency. It configures geo-redundant storage so its product images are also copied to the paired region, in case the whole primary region has a major outage.",
  tip: "Region pairs help with disaster recovery and staggered updates; availability zones help within one region. Azure in China is operated by 21Vianet, not Microsoft, and Azure Government is for US government use.",
  check: [
   ["Give two benefits of Azure region pairs.", "Any two of: prioritized recovery of one region in a pair during a broad outage, planned updates rolled out to one region at a time, and replication (such as geo-redundant storage) to the paired region."],
   ["Who operates Azure's datacenters in China?", "21Vianet, a separate company; the China cloud is a sovereign region isolated from global Azure."]
  ]
 },
 {
  t: "Availability zones and datacenters: zonal vs zone-redundant services",
  body: [
   "Azure's physical foundation is the datacenter: a building full of servers, storage and networking gear with its own power, cooling and security. You never choose an individual datacenter. Instead, Azure groups datacenters into availability zones and regions.",
   "An availability zone is a physically separate location within an Azure region, made up of one or more datacenters with independent power, cooling and networking. Zones are far enough apart that a local failure, such as a fire or power failure in one building, should not affect the others, yet close enough to be connected by a high-speed, low-latency private network. Regions that support availability zones have at least three zones. Not every region supports zones, so check before you design around them.",
   "Availability zones are the main way to protect an application from a datacenter-level failure inside one region. If you run copies of your application in each of three zones, the loss of one zone leaves the other two serving users. Using zones can increase cost slightly, for example because of data transfer between zones and running more instances, but it improves resilience.",
   "Azure services that support availability zones fall into two categories. Zonal services are pinned to a specific zone that you choose, for example a virtual machine, a managed disk or a public IP address deployed to zone 1. To make a zonal design resilient, you deploy several resources in different zones yourself. Zone-redundant services are replicated or spread across zones automatically by the platform, such as zone-redundant storage (ZRS) or a zone-redundant SQL database; if one zone fails, the service keeps running without you doing anything.",
   "There are also non-regional or always-available services, which are resilient to both zone and region outages because they are global, such as Microsoft Entra ID and Azure DNS. On the exam, remember that zones protect within a region and region pairs protect across regions."
  ],
  terms: [
   ["Datacenter", "A building containing servers, storage and networking equipment, with its own power and cooling."],
   ["Availability zone", "A physically separate group of datacenters in a region, with independent power, cooling and networking."],
   ["Zonal service", "A resource pinned to a single availability zone that you choose."],
   ["Zone-redundant service", "A service that the platform automatically replicates across availability zones."]
  ],
  example: "An insurer deploys three web server VMs, one in each availability zone of its region, behind a zone-redundant load balancer, and stores documents in ZRS storage. When one zone loses power, the other two VMs keep serving customers and the documents stay readable.",
  tip: "A VM placed in 'zone 2' is zonal; ZRS storage is zone-redundant. Zone-enabled regions have at least three zones. Zones protect against datacenter failures, not whole-region failures.",
  check: [
   ["What is the difference between a zonal and a zone-redundant service?", "A zonal service runs in one zone you pick; a zone-redundant service is automatically replicated across zones by Azure."],
   ["What does an availability zone protect against that a single datacenter deployment does not?", "The failure of a whole datacenter or zone, such as a power or cooling outage, because other zones in the region keep running."]
  ]
 },
 {
  t: "Azure resources, resource groups, subscriptions and management groups: the hierarchy and what each is for",
  body: [
   "Azure organizes everything you create into a four-level hierarchy. At the bottom are resources: individual things you create and pay for, such as a virtual machine, a virtual network, a storage account or a database.",
   "Every resource must belong to exactly one resource group. A resource group is a logical container for resources that share a lifecycle, such as all the parts of one application or one environment. Resource groups cannot be nested. Deleting a resource group deletes every resource inside it, which makes them handy for labs and temporary environments. You can apply role-based access control (RBAC) permissions, policies, locks and tags to a resource group, and resources inside inherit the permissions and policies. A resource group has a location that stores its metadata, but it can contain resources in other regions. Most resources can be moved between resource groups.",
   "Resource groups live inside a subscription. A subscription is a unit of management, billing and scale tied to a Microsoft Entra tenant. It acts as a billing boundary, because each subscription gets its own invoice and cost reports, and as an access-control boundary. Organizations create several subscriptions to separate environments such as production and development, to separate departments or projects for billing, or to work within subscription limits. An Azure account can have several subscriptions.",
   "Management groups sit above subscriptions. They let you group subscriptions and apply governance, such as Azure Policy and RBAC assignments, to all of them at once. Management groups can be nested to reflect your organization, and every directory has a single root management group at the top. A subscription can be in only one management group at a time.",
   "The key idea is inheritance. A policy or role assigned at a management group flows down to every subscription, resource group and resource beneath it. For example, a policy at the root that allows only European regions applies everywhere. Place governance as high as it makes sense, and keep exceptions lower down."
  ],
  terms: [
   ["Resource", "An individual manageable item in Azure, such as a VM, storage account or virtual network."],
   ["Resource group", "A logical container for resources that share a lifecycle; every resource belongs to exactly one."],
   ["Subscription", "A unit of billing, management and access control that contains resource groups."],
   ["Management group", "A container above subscriptions used to apply policies and access control to many subscriptions at once."]
  ],
  example: "A company creates management groups for Production and Development, each containing several subscriptions, one per department. It assigns a policy restricting regions at the Production management group, and every resource group and resource in those subscriptions inherits it automatically.",
  tip: "Order from top to bottom: management groups, subscriptions, resource groups, resources. Resource groups cannot be nested; management groups can. A resource belongs to only one resource group.",
  check: [
   ["You want to apply one Azure Policy to 15 subscriptions at once. What do you use?", "A management group containing those subscriptions, then assign the policy at that management group."],
   ["What happens to resources when you delete their resource group?", "They are all deleted, because a resource group's lifecycle includes the resources in it."]
  ]
 },
 {
  t: "Compute: virtual machines, VM scale sets, availability sets and Azure Virtual Desktop",
  body: [
   "Azure virtual machines (VMs) are the IaaS compute option. A VM is a virtualized computer that runs Windows or Linux on Microsoft's hardware. You pick an image (the OS, sometimes with software preinstalled), a size (the number of virtual CPUs and amount of memory), disks and networking. You have full control of the OS, so VMs suit lift-and-shift migrations, custom software, and test and development. You also handle patching and configuration, and a VM that is running is billed for compute even when idle; stopping and deallocating it stops compute charges, though disk storage is still billed.",
   "Virtual machine scale sets let you create and manage a group of identical, load-balanced VMs. Instead of building each VM by hand, you define the configuration once, and the scale set creates the instances. Scale sets support autoscale, adding VMs when demand grows and removing them when it falls, and can spread instances across availability zones. They are used for large, stateless workloads such as web front ends or batch processing.",
   "Availability sets are an older way to keep VMs available within a single datacenter. You place two or more VMs that do the same job in an availability set, and Azure spreads them across fault domains and update domains. A fault domain is a group of hardware that shares a power source and network switch, so a hardware failure affects only the VMs in that fault domain. An update domain is a group of VMs that Azure may reboot at the same time during planned maintenance, so not all your VMs restart together. Availability sets cost nothing extra; you pay only for the VMs. Availability zones protect against a larger failure, a whole datacenter.",
   "Azure Virtual Desktop is a desktop and application virtualization service. Users connect from almost any device to a full Windows desktop or to individual apps that run in Azure. Because the desktop runs in the cloud, company data does not have to be stored on the user's device. Azure Virtual Desktop supports multi-session Windows, where several users share one VM, which can lower cost. It is a good fit for remote workers, contractors, and staff who need a secure desktop from personal devices."
  ],
  terms: [
   ["Virtual machine scale set", "A group of identical, load-balanced VMs that can scale automatically."],
   ["Availability set", "A grouping that spreads VMs across fault domains and update domains to reduce downtime."],
   ["Fault domain", "A group of hardware sharing a power source and network switch."],
   ["Update domain", "A group of VMs that may be rebooted together during planned maintenance."],
   ["Azure Virtual Desktop", "A service that delivers Windows desktops and apps from Azure to users on almost any device."]
  ],
  example: "A design agency hires freelancers who work on their own laptops. Rather than send company laptops, it gives them Azure Virtual Desktop sessions, so project files stay in Azure. Its public website runs on a VM scale set that adds instances when a campaign launches.",
  tip: "Scale sets are about many identical VMs and autoscale; availability sets are about spreading VMs across fault and update domains; Azure Virtual Desktop is about delivering desktops to users.",
  check: [
   ["What is the difference between a fault domain and an update domain?", "A fault domain shares power and networking hardware, protecting against hardware failure; an update domain groups VMs that may be rebooted together during planned maintenance."],
   ["Which service would you choose to run dozens of identical web servers that grow and shrink with demand?", "A virtual machine scale set with autoscale."]
  ]
 },
 {
  t: "Containers and serverless compute: Container Instances, Container Apps, AKS, Azure Functions and App Service",
  body: [
   "A container packages an application together with everything it needs to run, such as libraries and settings, but shares the host's operating system kernel instead of including a whole OS. Containers are therefore smaller and start faster than virtual machines, and the same container image runs the same way on a laptop and in Azure. A popular container format and engine is Docker. Azure offers several ways to run containers, from simplest to most controllable.",
   "Azure Container Instances (ACI) is the fastest and simplest way to run a container in Azure. You give it an image and it runs it, with no VMs or orchestration to manage, billed while the container runs. It suits simple applications, task automation and build jobs.",
   "Azure Container Apps is a serverless platform for running containerized applications and microservices. It builds on Kubernetes but hides it from you, adding features such as automatic scaling (including scaling to zero), traffic splitting between versions, and HTTPS ingress. It is a good middle ground when you want more than single containers but do not want to manage Kubernetes.",
   "Azure Kubernetes Service (AKS) is a managed Kubernetes service. Kubernetes is an open-source orchestrator that deploys, scales and heals large numbers of containers across a cluster of machines. In AKS, Azure manages the Kubernetes control plane, and you manage the worker nodes and your workloads. AKS gives the most control and suits complex microservice applications and teams that already know Kubernetes.",
   "Azure Functions is event-driven serverless compute. You write a small function, choose a trigger, such as an HTTP request, a message on a queue, a new blob or a timer, and Azure runs it when the event happens. On consumption-based hosting it scales automatically and you pay only for executions. Functions can be stateless, or stateful using Durable Functions.",
   "Azure App Service is a PaaS offering for hosting web apps, REST APIs and mobile back ends in many languages, on Windows or Linux, and it can also run containers. It includes built-in load balancing, autoscale, deployment slots and integration with source control. Choose App Service for long-running web applications, and Functions for short pieces of code reacting to events."
  ],
  terms: [
   ["Container", "A lightweight package of an application and its dependencies that shares the host OS kernel."],
   ["Azure Container Instances (ACI)", "A service that runs individual containers without managing VMs or orchestration."],
   ["Azure Kubernetes Service (AKS)", "A managed Kubernetes service for orchestrating many containers across a cluster."],
   ["Azure Container Apps", "A serverless container platform for microservices with autoscaling and ingress, without managing Kubernetes."],
   ["Azure App Service", "A PaaS service for hosting web apps, APIs and mobile back ends."]
  ],
  example: "An online shop hosts its storefront in App Service, runs a nightly report job as a container in Container Instances, and uses an Azure Function triggered whenever an order message lands on a queue to send the confirmation email.",
  tip: "Single container, simplest: ACI. Orchestrating many containers with full control: AKS. Code run on events and billed per execution: Functions. Web app hosting without managing servers: App Service.",
  check: [
   ["Which service runs a single container quickly without managing servers or orchestration?", "Azure Container Instances."],
   ["Why are containers generally lighter than virtual machines?", "They share the host operating system kernel instead of each including a full operating system."]
  ]
 },
 {
  t: "Virtual networks, subnets, peering, Azure DNS, and public vs private endpoints",
  body: [
   "An Azure virtual network (VNet) is your own private network in Azure. It lets Azure resources such as VMs communicate with each other, with the internet, and with your on-premises networks. When you create a VNet you give it an address space in private IP ranges, such as 10.1.0.0/16, and it lives in one region and one subscription.",
   "You divide a VNet into subnets, smaller address ranges such as 10.1.1.0/24, to organize and secure resources. For example, you might put web servers in one subnet and database servers in another. Resources in different subnets of the same VNet can talk to each other by default. You can filter traffic between subnets and to the internet with network security groups (NSGs), which contain allow and deny rules based on IP address, port and protocol.",
   "Separate VNets are isolated from each other until you connect them. Virtual network peering links two VNets so resources in each can communicate using private IP addresses, as if on one network. Peering can connect VNets in the same region or in different regions (global peering), and traffic between peered VNets travels over Microsoft's backbone network, not the public internet. Address spaces of peered VNets must not overlap.",
   "Azure DNS hosts Domain Name System (DNS) zones on Microsoft's global network. DNS translates names such as www.example.com into IP addresses. With Azure DNS you manage your records with the same credentials, tools and billing as your other Azure resources. Azure DNS hosts your records, but you still buy the domain name itself from a registrar. Private DNS zones provide name resolution inside your VNets.",
   "Resources can be reached through public or private endpoints. A public endpoint is an address reachable from the internet, such as a public IP address on a VM or the default public address of a storage account. A private endpoint is a network interface with a private IP address from your VNet that connects privately to an Azure PaaS service, such as a storage account or SQL database. Traffic to a private endpoint stays on the Microsoft network, and you can then turn off public access to the service entirely, reducing exposure."
  ],
  terms: [
   ["Virtual network (VNet)", "An isolated private network in Azure with its own address space."],
   ["Subnet", "A range of addresses within a VNet used to group and secure resources."],
   ["VNet peering", "A connection that lets two VNets communicate privately over Microsoft's backbone."],
   ["Private endpoint", "A private IP address in your VNet that connects to an Azure service without using the public internet."],
   ["Azure DNS", "A service that hosts DNS domains and records on Azure infrastructure."]
  ],
  example: "A company places its web servers in a web subnet and its database in a data subnet of the same VNet, peers that VNet with a shared-services VNet in another region, and connects to its storage account through a private endpoint so the storage account can have public network access disabled.",
  tip: "Peering connects VNets; it requires non-overlapping address spaces. A private endpoint gives a PaaS service a private IP in your VNet. Azure DNS hosts records but does not sell domain names.",
  check: [
   ["Two VNets use 10.1.0.0/16 and 10.1.0.0/16. Can you peer them?", "No. Peered VNets must have non-overlapping address spaces."],
   ["How can a VM reach an Azure SQL database without the traffic using a public endpoint?", "Create a private endpoint for the database in the VM's VNet (or a peered one), which gives the database a private IP address."]
  ]
 },
 {
  t: "Hybrid connectivity: VPN Gateway (site-to-site, point-to-site) vs ExpressRoute",
  body: [
   "Many organizations need their on-premises networks and Azure virtual networks to work as one, for example so office users can reach an application running on Azure VMs. Azure offers two main hybrid connectivity options: VPN Gateway and ExpressRoute.",
   "A virtual private network (VPN) creates an encrypted tunnel between two networks over an untrusted network, usually the public internet. Azure VPN Gateway is a type of virtual network gateway deployed into a dedicated subnet of your VNet. It sends encrypted traffic between the VNet and other locations over the public internet.",
   "VPN Gateway supports several connection types. Site-to-site (S2S) connects an entire on-premises network to Azure through a VPN device at the office, so every machine in the office can reach the VNet. Point-to-site (P2S) connects an individual computer, such as a remote worker's laptop, to the VNet using VPN client software, with no office VPN device needed. VNet-to-VNet connects two Azure VNets through gateways. You can configure gateways in active-standby or active-active mode for higher availability.",
   "Azure ExpressRoute extends your on-premises network into the Microsoft cloud over a private connection provided by a connectivity partner. The traffic does not travel over the public internet. This gives more reliability, higher speeds, consistent latency and higher security than internet-based connections, which makes it suited to large data transfers, critical workloads and organizations with strict compliance needs. ExpressRoute can connect to Azure services and to other Microsoft cloud services. Note that private does not automatically mean encrypted; organizations with encryption requirements can add encryption over ExpressRoute.",
   "The trade-off is cost and setup. VPN Gateway is quicker to set up and cheaper, but performance depends on the internet. ExpressRoute requires working with a provider and costs more, but offers predictable performance. Some organizations use both, with a site-to-site VPN as a backup path for ExpressRoute. For a single remote user, point-to-site is the right choice; for connecting a whole office cheaply, site-to-site."
  ],
  terms: [
   ["VPN Gateway", "An Azure virtual network gateway that sends encrypted traffic to other networks over the public internet."],
   ["Site-to-site VPN", "A VPN connecting an entire on-premises network to an Azure VNet through a VPN device."],
   ["Point-to-site VPN", "A VPN connecting an individual device to an Azure VNet using client software."],
   ["ExpressRoute", "A private connection from on-premises to Microsoft cloud services through a connectivity provider, not over the public internet."]
  ],
  example: "A bank moves terabytes of trading data to Azure each day and needs consistent latency, so it orders an ExpressRoute circuit through a provider. It also configures a site-to-site VPN as a backup, and its IT staff use point-to-site VPN to reach Azure when working from home.",
  tip: "If the question says the traffic must not cross the public internet, the answer is ExpressRoute. VPN Gateway traffic is encrypted but travels over the internet. One laptop means point-to-site; a whole office means site-to-site.",
  check: [
   ["A remote employee needs to connect her laptop to an Azure VNet without an office VPN device. Which option fits?", "A point-to-site VPN through Azure VPN Gateway."],
   ["What is the main difference between ExpressRoute and a site-to-site VPN?", "ExpressRoute uses a private connection through a provider that does not go over the public internet; a site-to-site VPN uses an encrypted tunnel across the internet."]
  ]
 },
 {
  t: "Azure Storage services (Blob, Files, Queue, Table, Disks), storage account types and access tiers (Hot, Cool, Cold, Archive)",
  body: [
   "Azure Storage is Microsoft's cloud storage for many kinds of data. Most storage services live inside a storage account, which gives your data a unique namespace reachable over HTTP or HTTPS. Because the account name forms part of public endpoint addresses such as `mystorage.blob.core.windows.net`, it must be unique across all of Azure and use only lowercase letters and numbers.",
   "Azure Storage offers several data services. Blob storage holds unstructured data such as images, video, backups and log files, organized into containers; it is object storage optimized for large amounts of data. Azure Files provides fully managed file shares that you can mount using the Server Message Block (SMB) protocol, and on some tiers Network File System (NFS), just like a network drive, which suits lift-and-shift of apps that use file shares. Queue storage stores large numbers of messages so that parts of an application can communicate asynchronously. Table storage stores structured, non-relational (NoSQL) key-value data. Azure Disks are block-level volumes attached to Azure VMs, managed by Azure as managed disks.",
   "There are several storage account types. Standard general-purpose v2 is the recommended type for most scenarios and supports blobs, files, queues and tables. Premium account types use solid-state drives for low latency and are specialized: premium block blobs, premium file shares and premium page blobs. The account type decides which services and redundancy options are available.",
   "Blob data can be stored in access tiers that trade storage cost against access cost. The Hot tier is for data accessed frequently; it has the highest storage cost and lowest access cost. The Cool tier is for data accessed infrequently and kept for at least 30 days. The Cold tier is for data accessed rarely and kept for at least 90 days. The Archive tier is for data rarely accessed and kept for at least 180 days, with the lowest storage cost and the highest retrieval cost. Deleting or moving data out of a cooler tier before its minimum period incurs an early-deletion charge.",
   "Archive is special: it is offline. Before you can read an archived blob you must rehydrate it by changing its tier to an online tier (Hot, Cool or Cold), which can take hours. Hot, Cool and Cold can be set as the default for the account, while Archive can be set only on individual blobs. Lifecycle management rules can move blobs between tiers automatically as they age."
  ],
  terms: [
   ["Storage account", "A container for Azure Storage data services that provides a unique namespace."],
   ["Blob storage", "Object storage for large amounts of unstructured data, organized into containers."],
   ["Azure Files", "Managed file shares accessible over SMB or NFS."],
   ["Access tier", "A setting (Hot, Cool, Cold or Archive) that balances storage cost against access cost for blob data."],
   ["Rehydration", "Moving a blob from the offline Archive tier to an online tier so it can be read."]
  ],
  example: "A TV company keeps new episodes in Hot blob storage for streaming, moves last season's episodes to Cool, sends raw footage older than a year to Archive for legal retention, and uses an Azure Files share mounted by its editing workstations.",
  tip: "Archive is offline and needs rehydration that can take hours; it can be set only per blob. Minimum retention periods: Cool 30 days, Cold 90 days, Archive 180 days. Queue is for messages, Table for NoSQL key-value data.",
  check: [
   ["Which storage service would you use to replace an on-premises file server share that users map as a drive?", "Azure Files, which provides managed SMB file shares."],
   ["A compliance archive is read almost never and must be kept for seven years at the lowest storage cost. Which tier fits?", "The Archive tier, accepting that reading data requires rehydration that can take hours."]
  ]
 },
 {
  t: "Storage redundancy: LRS, ZRS, GRS, GZRS and read-access secondary options",
  body: [
   "Azure Storage always keeps multiple copies of your data so that it survives hardware failures, and you choose how widely those copies are spread. The choice is a trade-off between cost and how large a failure the data can survive. You set the redundancy option on the storage account.",
   "Redundancy in the primary region comes in two forms. Locally redundant storage (LRS) keeps three copies of your data within a single datacenter in the primary region. It is the lowest-cost option and protects against a failed disk or server, but not against a disaster affecting that whole datacenter. Zone-redundant storage (ZRS) keeps three copies spread across three availability zones in the primary region, so the data stays available even if one zone becomes unavailable.",
   "For protection against a whole-region outage, you add a secondary region, which is the region's pair. Geo-redundant storage (GRS) copies data with LRS in the primary region, then replicates it asynchronously to the secondary region, where it is again stored with LRS. That is six copies in total. Geo-zone-redundant storage (GZRS) uses ZRS in the primary region and LRS in the secondary region, combining protection against a zone failure with protection against a regional disaster.",
   "With GRS and GZRS, the data in the secondary region is not readable unless a failover occurs. If you need to read the secondary copy at any time, for example to serve reads if the primary region has problems, choose the read-access versions: RA-GRS or RA-GZRS. Because replication to the secondary region is asynchronous, the secondary may lag slightly behind the primary, so the most recent writes might not yet be there.",
   "A simple way to remember the options: L means local (one datacenter), Z means zones (several datacenters in one region), G means geo (a second region), and RA means you can read from that second region. Not every option is available for every account type or region. Changing redundancy later is possible for many combinations, but it can involve a migration."
  ],
  terms: [
   ["LRS", "Locally redundant storage: three copies in one datacenter in the primary region."],
   ["ZRS", "Zone-redundant storage: three copies across availability zones in the primary region."],
   ["GRS", "Geo-redundant storage: LRS in the primary region plus asynchronous replication to LRS in a secondary region."],
   ["GZRS", "Geo-zone-redundant storage: ZRS in the primary region plus asynchronous replication to LRS in a secondary region."],
   ["RA-GRS / RA-GZRS", "The geo-redundant options with read access to the secondary region at all times."]
  ],
  example: "A startup keeps its dev test data in LRS because it can be recreated. Its production customer files use GZRS so they survive a zone outage and a regional disaster. Its reporting app uses RA-GZRS so it can keep reading data from the secondary region if the primary becomes unavailable.",
  tip: "Match the failure to the option: disk or rack failure, LRS; datacenter or zone failure, ZRS; region failure, GRS or GZRS. Need to read the secondary without a failover? Pick the RA- version.",
  check: [
   ["Which redundancy option keeps data available if one availability zone fails, without paying for a second region?", "ZRS, which stores three copies across availability zones in the primary region."],
   ["What is the difference between GRS and RA-GRS?", "Both replicate to a secondary region, but only RA-GRS lets you read from the secondary region at any time without a failover."]
  ]
 },
 {
  t: "Moving data and migrating: AzCopy, Storage Explorer, Azure File Sync, Azure Migrate and Azure Data Box",
  body: [
   "Getting data and workloads into Azure is a common first step, and Azure offers different tools depending on the amount of data, how often it moves, and whether you are moving files or whole servers.",
   "AzCopy is a command-line utility for copying blobs or files to or from a storage account, and between storage accounts. You can script it for repeated jobs, and it supports synchronizing a local folder with a container in one direction. For example, `azcopy copy ./logs \"<container URL with SAS>\" --recursive` uploads a folder. It is a good choice when you are comfortable with the command line and want automation.",
   "Azure Storage Explorer is a free desktop application for Windows, macOS and Linux with a graphical interface for managing storage accounts. You can browse containers, upload and download files, and change properties by clicking rather than typing commands. Behind the scenes it uses AzCopy for transfers.",
   "Azure File Sync centralizes an organization's file shares in Azure Files while keeping the flexibility and performance of an on-premises Windows file server. You install an agent on a Windows Server, and it keeps local folders synchronized with an Azure file share. With cloud tiering, frequently used files stay on the local server while rarely used ones are kept only in Azure and fetched on demand. It is a continuous synchronization service, not a one-time copy.",
   "Azure Migrate is a hub for migrating to Azure. It provides a single place to discover and assess on-premises servers, databases, web apps and virtual desktops, estimate their Azure cost and readiness, and then migrate them, using integrated Microsoft and partner tools such as the Database Migration Service.",
   "Azure Data Box is a physical migration service for large amounts of data when uploading over the network would take too long or cost too much. Microsoft ships you a secure, rugged storage device; you copy your data onto it and ship it back, and Microsoft uploads the data into your storage account. Data Box can also export data from Azure. After the upload, the device's disks are securely erased. It suits one-time migrations of very large datasets and locations with limited or no connectivity."
  ],
  terms: [
   ["AzCopy", "A command-line tool for copying data to, from and between Azure storage accounts."],
   ["Azure Storage Explorer", "A free desktop app with a graphical interface for managing Azure Storage data."],
   ["Azure File Sync", "A service that synchronizes Windows file servers with Azure Files, with optional cloud tiering."],
   ["Azure Migrate", "A hub for discovering, assessing and migrating on-premises workloads to Azure."],
   ["Azure Data Box", "A physical device shipped to you for moving large amounts of data into or out of Azure offline."]
  ],
  example: "A film archive has hundreds of terabytes on-premises and a slow internet link, so it orders Azure Data Box to ship the data to Azure. Its branch offices keep using local Windows file servers that Azure File Sync keeps synchronized with Azure Files, and an administrator uses AzCopy in a nightly script for new footage.",
  tip: "Scriptable command line: AzCopy. Graphical tool: Storage Explorer. Keep on-premises file servers synced with the cloud: Azure File Sync. Assess and migrate servers: Azure Migrate. Too much data for the network: Data Box.",
  check: [
   ["Which service should you use to assess on-premises VMs for Azure readiness and cost before migrating them?", "Azure Migrate, which discovers, assesses and migrates workloads."],
   ["Why would you choose Azure Data Box instead of AzCopy?", "When the amount of data is so large or the network so limited that uploading would take too long or cost too much, so the data is shipped on a physical device."]
  ]
 },
 {
  t: "Microsoft Entra ID and Entra Domain Services; authentication methods: SSO, MFA and passwordless",
  body: [
   "Microsoft Entra ID, formerly called Azure Active Directory, is Microsoft's cloud-based identity and access management service. It stores users, groups and applications, and it handles sign-in to Azure, Microsoft 365 and thousands of other software-as-a-service applications. Each organization gets its own Entra tenant, a dedicated instance of the directory. Entra ID provides authentication, single sign-on, application management, device management and identity protection features such as detecting risky sign-ins.",
   "Many organizations also have on-premises Active Directory Domain Services (AD DS). Microsoft Entra Connect synchronizes users and groups from on-premises AD to Entra ID, so people use one identity for both. Entra ID is not a cloud copy of AD DS, though: it uses web-based protocols such as OAuth 2.0, OpenID Connect and SAML, not Kerberos or LDAP.",
   "That is where Microsoft Entra Domain Services comes in. It provides managed domain services such as domain join, group policy, Lightweight Directory Access Protocol (LDAP) and Kerberos or NTLM authentication, without you deploying, patching or managing domain controllers. It lets you run older applications that need those protocols in Azure. The managed domain is synchronized one way from Entra ID; changes made in the managed domain do not flow back.",
   "Authentication is the process of proving who you are. Entra ID supports several ways to make it stronger and simpler. Single sign-on (SSO) lets a user sign in once and then access many applications without signing in again, which means fewer passwords to remember and a single place to disable access when someone leaves.",
   "Multifactor authentication (MFA) requires two or more kinds of evidence: something you know (a password or PIN), something you have (a phone or hardware key) and something you are (a fingerprint or face). A stolen password alone is then not enough to sign in. Microsoft Entra multifactor authentication can use the Microsoft Authenticator app, a text message or voice call, or a hardware token.",
   "Passwordless authentication removes the password entirely, replacing it with something you have plus something you are or know. Options include Windows Hello for Business (biometrics or a PIN tied to a specific device), the Microsoft Authenticator app, and FIDO2 security keys or passkeys. Passwordless methods are more convenient and resist phishing better than passwords."
  ],
  terms: [
   ["Microsoft Entra ID", "Microsoft's cloud identity and access management service, formerly Azure Active Directory."],
   ["Microsoft Entra Domain Services", "A managed service providing domain join, LDAP, Kerberos/NTLM and group policy without running domain controllers."],
   ["Single sign-on (SSO)", "Signing in once to access many applications."],
   ["Multifactor authentication (MFA)", "Requiring two or more kinds of evidence, such as a password plus a phone approval, to sign in."],
   ["Passwordless", "Authentication that replaces the password with methods such as Windows Hello, Authenticator or FIDO2 keys."]
  ],
  example: "A company moves a legacy app that requires Kerberos and domain-joined servers to Azure. Instead of building domain controller VMs, it enables Entra Domain Services. Staff sign in with Windows Hello for Business on their laptops and get single sign-on to Microsoft 365 and the company's SaaS apps.",
  tip: "Entra ID is the cloud identity service (modern protocols). Entra Domain Services is for legacy apps needing domain join, LDAP or Kerberos without managing DCs. MFA adds a factor; passwordless removes the password.",
  check: [
   ["Which service lets you domain-join Azure VMs and use LDAP without deploying domain controllers?", "Microsoft Entra Domain Services."],
   ["Which categories of evidence can MFA combine?", "Something you know (such as a password), something you have (such as a phone or key) and something you are (such as a fingerprint)."]
  ]
 },
 {
  t: "External identities (B2B and customer identity) and Conditional Access",
  body: [
   "Organizations often need to give people outside the company access to their applications. Microsoft Entra External ID is the name for the set of capabilities that do this. The two main scenarios on the exam are collaborating with partners and serving customers.",
   "Business-to-business (B2B) collaboration lets you invite external users, such as a supplier's staff, into your own tenant as guest users. They sign in with their own credentials, such as their work account in their own organization, a Microsoft account, or a social or one-time passcode identity, so you do not have to create and manage passwords for them. You then grant them access to specific apps, SharePoint sites or Azure resources like any other user, and you can review and remove that access over time. B2B direct connect is a related option that creates mutual trust between two Entra organizations for scenarios such as Teams shared channels.",
   "Customer identity scenarios are different: the users are members of the public who sign up for your app, such as shoppers on a website. Microsoft's customer identity offerings, Azure Active Directory B2C and the newer Microsoft Entra External ID for customers, provide customizable sign-up and sign-in pages, support for social identity providers, and a separate directory for customer accounts so they are kept apart from employees.",
   "Conditional Access is a Microsoft Entra ID feature, included in the Entra ID P1 license and above, that decides whether to allow a sign-in, block it or require extra steps, based on signals. Signals can include who the user is and which groups they belong to, their location or IP address, the device and whether it is compliant, the application being accessed, and the calculated sign-in risk. The decision can be to allow access, require MFA, require a compliant device, or block access.",
   "Conditional Access policies follow an if-then pattern: if a user in a certain group signs in from outside the trusted network to a sensitive app, then require MFA. This lets you apply strong controls only when the risk warrants it, keeping everyday sign-ins simple. It is a key part of a Zero Trust approach, because it verifies every access request using all available signals."
  ],
  terms: [
   ["B2B collaboration", "Inviting external users into your tenant as guests who sign in with their own identities."],
   ["Guest user", "An external user account in your directory that represents someone from outside the organization."],
   ["Customer identity (B2C)", "An identity service for consumer-facing apps, with self-service sign-up and social sign-in."],
   ["Conditional Access", "An Entra ID feature that allows, blocks or adds requirements to sign-ins based on signals such as user, location, device and risk."]
  ],
  example: "An engineering firm invites a partner's designers as B2B guests so they can open a shared project site with their own work accounts. A Conditional Access policy requires MFA for all guest sign-ins and blocks sign-ins to the finance app from outside the firm's countries of operation.",
  tip: "Partners and suppliers who need access to your apps: B2B collaboration. Public customers signing up for your app: customer identity (B2C or External ID for customers). 'Require MFA only when signing in from outside the office' is Conditional Access.",
  check: [
   ["A supplier's staff need access to one of your SharePoint sites using their own company accounts. What do you use?", "Microsoft Entra B2B collaboration, inviting them as guest users."],
   ["Name three signals Conditional Access can evaluate.", "Any three of: user or group membership, location or IP address, device state or compliance, the application, and sign-in risk."]
  ]
 },
 {
  t: "Azure role-based access control (RBAC), Zero Trust, defense in depth and Microsoft Defender for Cloud",
  body: [
   "Authentication proves who someone is; authorization decides what they can do. Azure role-based access control (RBAC) is the authorization system for Azure resources. You create a role assignment made of three parts: a security principal (a user, group, service principal or managed identity), a role definition (a collection of allowed actions), and a scope (where the permissions apply).",
   "Azure includes many built-in roles. Four fundamental ones are Owner (full access, including the ability to assign roles to others), Contributor (can create and manage all resources but cannot grant access), Reader (can view resources but not change them) and User Access Administrator (can manage user access). There are also service-specific roles, such as Virtual Machine Contributor, and you can create custom roles. Scopes follow the resource hierarchy: management group, subscription, resource group or single resource. Assignments are inherited by child scopes, and permissions from multiple assignments add together. Follow the principle of least privilege: give only the access needed, at the narrowest scope, preferably to groups rather than individuals.",
   "Zero Trust is a security model that assumes the network is not a safe place and that a breach may already have happened. Its guiding principles are to verify explicitly (always authenticate and authorize using all available data points), use least privilege access (just-in-time and just-enough access), and assume breach (limit how far an attacker can move, and use analytics to detect threats). Tools such as MFA, Conditional Access and RBAC put these principles into practice.",
   "Defense in depth protects information by using several layers of security, so that if one layer is breached, the next can stop the attack. A common model lists seven layers from the outside in: physical security, identity and access, perimeter (such as DDoS protection and firewalls), network (such as limiting communication between resources), compute (such as securing VMs and patching), application (secure code) and data. Each layer has its own controls.",
   "Microsoft Defender for Cloud is a cloud security posture management (CSPM) and cloud workload protection service. It continuously assesses your resources against security best practices, shows a secure score, and gives recommendations such as enabling MFA or closing open management ports. Foundational posture features are available at no extra cost; paid Defender plans add threat protection for specific resource types, such as servers, storage and databases. Defender for Cloud can also protect workloads in other clouds and on-premises machines, including those connected through Azure Arc."
  ],
  terms: [
   ["Azure RBAC", "The authorization system that grants roles to security principals at a scope."],
   ["Role assignment", "The combination of a security principal, a role definition and a scope."],
   ["Zero Trust", "A security model based on verify explicitly, least privilege access and assume breach."],
   ["Defense in depth", "Layered security in which each layer protects against an attack that gets through the previous one."],
   ["Microsoft Defender for Cloud", "A service that assesses security posture, gives recommendations and a secure score, and protects cloud workloads."]
  ],
  example: "A support team needs to see the resources in the Production resource group but not change them, so the admin assigns the built-in Reader role to the team's group at that resource group scope. Defender for Cloud then flags that a VM has its remote desktop port open to the internet and recommends restricting it.",
  tip: "Contributor can manage resources but cannot assign access; Owner can do both. RBAC controls who can do what; Azure Policy controls what configurations are allowed. The Zero Trust principles are verify explicitly, least privilege and assume breach.",
  check: [
   ["A developer must create and manage VMs in a resource group but must not grant access to anyone else. Which built-in role fits?", "Contributor at the resource group scope (or a more specific role such as Virtual Machine Contributor)."],
   ["What are the three principles of Zero Trust?", "Verify explicitly, use least privilege access, and assume breach."]
  ]
 },
 {
  t: "Factors that affect cost in Azure: resource type, consumption, region, bandwidth, reservations and Azure Hybrid Benefit",
  body: [
   "Azure bills most services by consumption, so understanding what drives the bill helps you estimate and control it. The exam expects you to name the main cost factors and explain how each one changes what you pay.",
   "Resource type is the first factor. Every service has its own pricing meters: a VM is billed by the size and the time it runs, a storage account by the amount of data stored, its redundancy and access tier, and the number of read and write operations. Settings within a resource matter too, such as choosing a larger VM size, premium disks or geo-redundant storage, all of which cost more.",
   "Consumption is the amount you actually use. Pay-as-you-go charges for what you use, but for predictable workloads you can commit in advance to reduce the price. Azure Reservations let you commit to a specific resource, such as a VM size in a region, for one or three years in return for a significant discount. Azure savings plans for compute commit you to a fixed hourly spend across compute services instead. Spot virtual machines use spare capacity at a lower price but can be evicted when Azure needs the capacity back, so they suit interruptible jobs.",
   "Region matters because costs for the same service can differ between regions, due to local power, land, taxes and demand. Choosing a different region can lower cost, as long as latency and data-residency needs are still met.",
   "Bandwidth, or network traffic, is often overlooked. Data coming into Azure (ingress) is generally free. Data leaving Azure (egress), such as users downloading files, and in many cases data moving between regions or availability zones, is billed. Pricing is based on zones of the world, and the amount you transfer.",
   "Azure Hybrid Benefit lets you use existing on-premises licenses that have active Software Assurance or qualifying subscriptions, for Windows Server and SQL Server, on Azure. You then pay a lower rate for the VM because the license part of the price is removed. It also applies to some Linux subscriptions. Other factors include purchases from Azure Marketplace, where third-party products may add their own charges, and simply how well you tidy up: deallocating unused VMs and deleting forgotten resources."
  ],
  terms: [
   ["Azure Reservations", "A one- or three-year commitment to specific resources in exchange for a discount compared with pay-as-you-go."],
   ["Egress", "Outbound data transfer from Azure, which is generally billed; inbound data (ingress) is generally free."],
   ["Azure Hybrid Benefit", "Using existing Windows Server or SQL Server licenses with Software Assurance to lower the cost of Azure resources."],
   ["Spot VM", "A VM that uses spare capacity at a discount but can be evicted when Azure needs the capacity."]
  ],
  example: "A company runs a database VM 24 hours a day for years, so it buys a three-year reservation and applies Azure Hybrid Benefit with its existing SQL Server licenses. It runs nightly rendering jobs on Spot VMs, and it notices a large bill line for egress because customers download videos directly from storage.",
  tip: "Inbound data transfer is generally free; outbound is billed. Reservations reward a long-term commitment; Hybrid Benefit reuses licenses you already own. The same service can cost different amounts in different regions.",
  check: [
   ["Which cost factor does Azure Hybrid Benefit address?", "Software licensing: it lets you reuse eligible Windows Server and SQL Server licenses so you do not pay for the license again in Azure."],
   ["A workload runs constantly for the next three years. How can you reduce its compute cost?", "Buy an Azure Reservation (or a savings plan) for a one- or three-year term instead of paying pay-as-you-go rates."]
  ]
 },
 {
  t: "The Pricing Calculator vs the Total Cost of Ownership (TCO) Calculator",
  body: [
   "Microsoft provides two free web-based calculators for estimating costs, and the exam often asks which one fits a scenario. Neither calculator requires an Azure subscription, and both produce estimates rather than binding prices.",
   "The Azure Pricing Calculator estimates the cost of Azure services you plan to deploy. You add products, such as a virtual machine, a storage account and a database, and configure each one: the region, size or tier, number of instances, hours of use, redundancy and purchase option, such as pay-as-you-go or a reservation. The calculator then shows an estimated monthly and upfront cost. You can save and share the estimate or export it. It is the tool to use when you are designing a new Azure solution and want to know what it will cost, or to compare options such as a different region or VM size.",
   "The Total Cost of Ownership (TCO) Calculator compares the cost of running your current on-premises infrastructure with the cost of running the same workloads in Azure. You describe your on-premises environment: servers, databases, storage and networking. You then adjust assumptions, such as the cost of electricity, IT labor hourly rates, datacenter space, and hardware and software costs. The calculator produces a report showing the estimated savings over a period of several years, with the breakdown of on-premises costs you would avoid, such as power, cooling and maintenance.",
   "The key difference is the question each tool answers. The Pricing Calculator answers 'How much will these Azure resources cost?' The TCO Calculator answers 'How much could I save by moving my existing datacenter workloads to Azure?' The TCO Calculator is therefore most useful when building a business case for migration.",
   "Neither tool shows your actual spending. For that you use Microsoft Cost Management, which reports what your deployed resources have actually cost and forecasts future spending."
  ],
  terms: [
   ["Pricing Calculator", "A free tool that estimates the cost of Azure services you plan to deploy."],
   ["Total Cost of Ownership (TCO) Calculator", "A free tool that compares the cost of running on-premises workloads with running them in Azure over several years."],
   ["Estimate", "A projected cost based on your chosen configuration, not a binding price or actual bill."]
  ],
  example: "A finance director asks whether closing the company's server room would save money. The IT manager uses the TCO Calculator to compare five years of hardware, power and labor costs with Azure. Once approved, the architect uses the Pricing Calculator to price the specific VMs and storage accounts the project will deploy.",
  tip: "Comparing on-premises with Azure, or building a migration business case: TCO Calculator. Estimating the cost of specific Azure resources: Pricing Calculator. Seeing what you actually spent: Cost Management.",
  check: [
   ["Which tool estimates the monthly cost of two VMs and a SQL database you plan to create in Azure?", "The Azure Pricing Calculator."],
   ["Which tool helps show management the potential savings of migrating an on-premises datacenter to Azure?", "The TCO Calculator, which compares on-premises costs with Azure costs over several years."]
  ]
 },
 {
  t: "Microsoft Cost Management: cost analysis, budgets and alerts, and using tags to track spending",
  body: [
   "Microsoft Cost Management is the built-in service for monitoring, allocating and optimizing what you spend in Azure. It is available in the Azure portal for your subscriptions and billing accounts, and the core features come at no extra cost. Where the calculators estimate, Cost Management reports actual and forecast spending.",
   "Cost analysis lets you explore your costs visually. You can view accumulated costs for a period, see a forecast for the rest of the month, and group or filter costs by service, resource group, resource, location or tag. This quickly answers questions such as 'Which resource group cost the most last month?' or 'Why did our bill jump on Tuesday?'",
   "Budgets let you set a spending limit for a scope, such as a subscription or a resource group, for a period like a month. You then define alert conditions, for example at 50%, 80% and 100% of the budget, based on actual or forecast cost. When a threshold is reached, Cost Management sends email notifications and can trigger an action group, which can run automation such as shutting down VMs. A budget on its own does not stop resources or cap spending; it warns you. Cost Management also has other alert types, such as credit alerts for when prepaid credit is being used up, and department spending quota alerts for some agreement types.",
   "Tags help you track spending by business meaning rather than by technical structure. A tag is a name-value pair, such as `CostCenter = Marketing` or `Environment = Production`, that you apply to resources, resource groups or subscriptions. Tags let you group costs in cost analysis by department, project or environment, even when resources for one project are spread across several resource groups. They are also used for automation and operations, such as identifying which VMs to shut down at night.",
   "Tags are not inherited automatically by resources from their resource group or subscription. If you want every resource to carry a tag, you can use Azure Policy to require tags or to add or inherit them automatically. Cost Management can also be configured to apply tag inheritance in cost reports."
  ],
  terms: [
   ["Cost analysis", "A Cost Management view for exploring actual and forecast costs grouped by service, resource, location or tag."],
   ["Budget", "A spending threshold for a scope and period that triggers alerts when reached."],
   ["Tag", "A name-value pair applied to Azure resources to organize them, for example by cost center or environment."],
   ["Action group", "A collection of notification and automation actions triggered by an alert."]
  ],
  example: "A university tags each research group's resources with `Project = <name>`. The finance office uses cost analysis grouped by the Project tag to recharge each group monthly, and every group has a budget with an email alert at 80% so no one is surprised by a large bill.",
  tip: "Budgets alert; they do not stop spending by themselves. Tags are not inherited by default; use Azure Policy to require or inherit them. Cost Management shows actual spending, unlike the calculators.",
  check: [
   ["Does reaching 100% of a Cost Management budget automatically stop your resources?", "No. A budget sends alerts; to act automatically, you connect the alert to an action group that runs automation."],
   ["How can you report costs for one project whose resources are spread across three resource groups?", "Apply the same tag, such as Project = X, to those resources and group or filter cost analysis by that tag."]
  ]
 },
 {
  t: "Microsoft Purview for data governance, and the Service Trust Portal for compliance reports",
  body: [
   "Governance and compliance are two related needs. Governance is knowing what data you have, where it lives and how it is used, and applying rules to it. Compliance is proving that you meet laws, regulations and industry standards. The AZ-900 exam covers one Microsoft service for each area.",
   "Microsoft Purview is a family of data governance, risk and compliance solutions that helps you get a single, unified view of your data. Purview can connect to data sources across on-premises systems, multiple clouds and SaaS applications, and automatically discover and scan them. It builds a map of your data estate, classifies sensitive data such as credit card numbers or national ID numbers, and tracks data lineage, which shows where data came from and how it has moved and changed.",
   "Purview is often described in two broad areas. The risk and compliance side, closely tied to Microsoft 365, helps protect sensitive data across Teams, OneDrive, Exchange and other services, manage data lifecycle and retention, and detect risks such as data leaking out of the organization. The unified data governance side helps you manage data across on-premises, multicloud and SaaS sources, with a data catalog so people can find trustworthy data, and insights into where sensitive data is stored.",
   "The Service Trust Portal is a Microsoft website that provides information, tools and documents about how Microsoft cloud services handle security, privacy and compliance. Its most important use for AZ-900 is access to audit reports, such as independent third-party reports on Microsoft cloud services against standards like ISO/IEC 27001 and SOC (System and Organization Controls), along with whitepapers and other compliance documents. You sign in with a Microsoft account or work account to download many of them.",
   "The two tools answer different questions. If you need to discover and classify your own organization's data or track its lineage, use Microsoft Purview. If an auditor asks for evidence that Microsoft's cloud meets a standard, download the report from the Service Trust Portal. Remember that under shared responsibility, Microsoft's compliance covers its part; you still need to configure your own resources compliantly."
  ],
  terms: [
   ["Microsoft Purview", "A family of data governance, risk and compliance solutions that discovers, classifies and maps an organization's data."],
   ["Data lineage", "A record of where data came from and how it moved and changed between systems."],
   ["Service Trust Portal", "A Microsoft site providing audit reports and documents about the security, privacy and compliance of Microsoft cloud services."],
   ["Audit report", "An independent assessment, such as a SOC or ISO report, confirming a service meets a standard."]
  ],
  example: "A healthcare company's auditor asks for proof that Azure meets ISO/IEC 27001, so the compliance officer downloads the audit report from the Service Trust Portal. Meanwhile, the data team uses Microsoft Purview to scan its on-premises SQL servers and Azure storage and find every table containing patient identifiers.",
  tip: "Finding and classifying your own data across locations: Microsoft Purview. Downloading Microsoft's compliance and audit reports: Service Trust Portal.",
  check: [
   ["Where would you download an independent audit report about Azure's compliance with a standard?", "The Service Trust Portal."],
   ["Which service can discover and classify sensitive data across on-premises, multicloud and SaaS sources?", "Microsoft Purview."]
  ]
 },
 {
  t: "Azure Policy: definitions, initiatives, assignments and compliance",
  body: [
   "Azure Policy is a service that helps you enforce organizational standards and assess compliance at scale. Where RBAC controls who can do something, Azure Policy controls what can be created and how resources must be configured, no matter who is doing it. For example, a policy can allow resources only in certain regions, require a tag on every resource group, or allow only specific VM sizes.",
   "A policy definition describes a rule: the condition to evaluate and the effect to apply when a resource matches. Common effects include Deny, which blocks a create or update request that breaks the rule; Audit, which allows the request but marks the resource as non-compliant; Append and Modify, which add or change properties such as tags; and DeployIfNotExists, which deploys a related resource or setting if it is missing. Azure provides many built-in definitions, such as 'Allowed locations', and you can write custom ones in JSON.",
   "An initiative, also called a policy set, groups several related policy definitions so you can manage them as one unit toward a single goal. For example, an initiative for a security benchmark might contain dozens of definitions covering encryption, logging and network rules. Microsoft Defender for Cloud uses a built-in initiative to drive its recommendations.",
   "A definition or initiative does nothing until you create an assignment, which applies it to a scope: a management group, subscription or resource group. Assignments are inherited by all child scopes, so assigning a policy at a management group covers all its subscriptions. You can exclude specific child scopes, and you can set parameters, such as the list of allowed regions.",
   "Azure Policy evaluates resources when they are created or changed, and periodically for existing resources. The compliance view shows which resources are compliant or non-compliant and why. For many policies, you can create remediation tasks that fix existing non-compliant resources, for example by adding a missing tag. Policy also integrates with Azure DevOps and deployment pipelines, so problems can be caught before deployment."
  ],
  terms: [
   ["Policy definition", "A rule that describes a condition and the effect, such as Deny or Audit, when a resource matches."],
   ["Initiative", "A group of policy definitions managed together toward one goal."],
   ["Assignment", "Applying a policy definition or initiative to a scope, from which it is inherited by child scopes."],
   ["Remediation", "Bringing existing non-compliant resources into compliance, for example by adding a missing setting."]
  ],
  example: "A company assigns the built-in 'Allowed locations' policy at its root management group, with only two European regions allowed. When a developer tries to create a storage account in another region, the deployment fails with a policy Deny message, and the compliance dashboard shows any older resources that were outside those regions.",
  tip: "Policy is about what is allowed (configuration); RBAC is about who can act. An initiative groups definitions; an assignment applies them to a scope. Deny blocks non-compliant changes; Audit only reports them.",
  check: [
   ["What is the difference between a policy definition and a policy assignment?", "The definition describes the rule and its effect; the assignment applies it to a specific scope so it takes effect."],
   ["You need to prevent anyone, including Owners, from creating VMs of sizes not on an approved list. Which service do you use?", "Azure Policy, with a definition such as 'Allowed virtual machine size SKUs' using the Deny effect."]
  ]
 },
 {
  t: "Resource locks: CanNotDelete vs ReadOnly and how they inherit",
  body: [
   "Even with careful RBAC, a person with the right role can accidentally delete or change an important resource. Resource locks add a safety net: they prevent resources from being deleted or modified, regardless of the user's role, until the lock is removed.",
   "There are two lock levels. CanNotDelete (shown in the portal as Delete) means authorized users can still read and modify the resource, but they cannot delete it. ReadOnly (shown as Read-only) means authorized users can read the resource but cannot delete or update it; it acts like limiting every user to the permissions of the Reader role for that resource.",
   "You can apply a lock at the subscription, resource group or resource level. Locks are inherited: a lock on a resource group applies to every resource in that group, including resources added later. The most restrictive lock in the inheritance wins, so a ReadOnly lock on a resource group overrides a CanNotDelete lock on a resource inside it.",
   "Locks apply to everyone, including Owners. To delete a locked resource you must first remove the lock, which requires permission to manage locks, such as the Owner or User Access Administrator role. This extra step is the point: it forces a deliberate decision before destructive changes, which prevents mistakes made in a hurry.",
   "Locks apply to management operations sent through Azure Resource Manager, not to operations on the data inside a resource. For example, a ReadOnly lock on a storage account does not stop someone who has access to the data from uploading blobs, but it does block changes to the account's settings. ReadOnly locks can also have surprising side effects, because some actions that look like reads are actually management operations; for example, listing a storage account's access keys is blocked. Test ReadOnly locks before using them widely.",
   "Locks are different from Azure Policy. Policy controls which configurations are allowed; locks protect specific existing resources from deletion or change."
  ],
  terms: [
   ["Resource lock", "A setting that prevents a resource from being deleted or modified, even by users with permission, until removed."],
   ["CanNotDelete", "A lock level that allows reading and modifying a resource but blocks deleting it."],
   ["ReadOnly", "A lock level that allows reading a resource but blocks modifying or deleting it."]
  ],
  example: "An administrator puts a CanNotDelete lock on the resource group that holds the company's production database and virtual network. Months later, a colleague running a cleanup script tries to delete that group by mistake, and Azure refuses because of the lock.",
  tip: "CanNotDelete still allows changes; ReadOnly blocks changes and deletion. Locks apply even to Owners and are inherited by child resources. To delete a locked resource, remove the lock first.",
  check: [
   ["A resource group has a CanNotDelete lock. Can a Contributor resize a VM inside it?", "Yes. CanNotDelete blocks deletion only; modifications such as resizing are still allowed."],
   ["Can a subscription Owner delete a resource protected by a lock without changing the lock?", "No. Locks apply to all users, including Owners; the lock must be removed first."]
  ]
 },
 {
  t: "Tools for interacting with Azure: the portal, Azure Cloud Shell, Azure CLI and Azure PowerShell",
  body: [
   "You can manage Azure through several tools. They all send requests to the same place, Azure Resource Manager, so whatever you create with one tool can be managed with any other. The choice depends on the task and your preference.",
   "The Azure portal is a web-based, graphical console. You sign in from a browser, then create, configure and monitor resources through menus and forms, build custom dashboards, and view costs and alerts. The portal is ideal for learning, for one-off tasks and for seeing things visually. It is less suited to repeating the same task many times, because clicking through forms by hand is slow and error-prone. Microsoft also offers an Azure mobile app for monitoring and quick actions on the go.",
   "Azure Cloud Shell is a browser-based shell that you open from the portal toolbar or directly in a browser. It gives you a choice of Bash or PowerShell, is already authenticated with your Azure account, and has the Azure CLI, Azure PowerShell and common tools preinstalled, so there is nothing to install on your computer. Cloud Shell can use a small storage file share to keep your files between sessions, or run without one in an ephemeral session.",
   "The Azure CLI is a cross-platform command-line tool that runs on Windows, macOS and Linux. Its commands start with `az`, for example `az group create --name rg-demo --location eastus` or `az vm list -o table`. It is popular with people who use Bash and is easy to use in scripts.",
   "Azure PowerShell is a set of modules, known as the Az module, that adds cmdlets for managing Azure to PowerShell. Cmdlets follow a verb-noun pattern, such as `New-AzResourceGroup -Name rg-demo -Location eastus` or `Get-AzVM`. It is popular with Windows administrators who already use PowerShell, and PowerShell also runs on macOS and Linux.",
   "Azure CLI and Azure PowerShell can do broadly the same things; the exam may ask you to recognize which tool a command belongs to. Both can be used interactively or in scripts, and both are available inside Cloud Shell. For repeatable deployments of whole environments, you would move on to infrastructure as code, covered in a later lesson."
  ],
  terms: [
   ["Azure portal", "A web-based graphical console for managing Azure resources."],
   ["Azure Cloud Shell", "A browser-based, pre-authenticated Bash or PowerShell shell with Azure tools preinstalled."],
   ["Azure CLI", "A cross-platform command-line tool whose commands begin with az."],
   ["Azure PowerShell", "The Az PowerShell module, with verb-noun cmdlets such as New-AzVM."]
  ],
  example: "An administrator on a borrowed laptop needs to list all resource groups quickly. She opens Cloud Shell from the portal, chooses Bash, and runs `az group list -o table` without installing anything. Later she switches the shell to PowerShell and runs `Get-AzResourceGroup` to see the same information.",
  tip: "Commands starting with az are Azure CLI; Verb-Az noun cmdlets such as Get-AzVM are Azure PowerShell. Cloud Shell needs no local installation and supports both Bash and PowerShell.",
  check: [
   ["Which tool lets you run Azure CLI commands from a browser without installing anything locally?", "Azure Cloud Shell."],
   ["Is `New-AzResourceGroup` an Azure CLI or Azure PowerShell command?", "Azure PowerShell; it is a verb-noun cmdlet from the Az module. The CLI equivalent would be `az group create`."]
  ]
 },
 {
  t: "Azure Arc for managing on-premises and multicloud resources",
  body: [
   "Most organizations do not run everything in Azure. They have servers in their own datacenters, branch offices and edge locations, and sometimes workloads in other public clouds. Managing each environment with separate tools makes it hard to apply consistent security, compliance and monitoring. Azure Arc extends Azure's management and governance to resources outside Azure.",
   "Azure Arc works by projecting non-Azure resources into Azure Resource Manager. You install a lightweight agent on a server, or connect a Kubernetes cluster, and the resource appears in the Azure portal as an Azure resource with its own resource ID, placed in a subscription and resource group like any other. The workload itself keeps running where it is; Arc does not migrate it.",
   "Once a resource is Arc-enabled, you can manage it with familiar Azure tools. You can organize it with resource groups and tags, control who can manage it with Azure RBAC, apply and audit Azure Policy, monitor it with Azure Monitor, protect it with Microsoft Defender for Cloud, and keep it updated with Azure's update management. This gives you a single pane of glass across on-premises, edge and multicloud environments.",
   "Azure Arc can manage several resource types. Arc-enabled servers covers physical and virtual Windows and Linux servers running outside Azure. Arc-enabled Kubernetes covers Kubernetes clusters hosted anywhere. Arc can also manage SQL Server instances outside Azure and run some Azure data services on your own infrastructure. It can also connect virtualization platforms such as VMware vSphere and System Center Virtual Machine Manager environments so their VMs can be managed from Azure.",
   "Arc fits naturally with the cloud models from earlier lessons: it is Microsoft's answer to managing hybrid and multicloud environments consistently. On the exam, pick Azure Arc when the scenario is about managing or governing resources that stay outside Azure. Pick Azure Migrate when the goal is to move them into Azure."
  ],
  terms: [
   ["Azure Arc", "A service that extends Azure management and governance to servers, Kubernetes clusters and data services outside Azure."],
   ["Arc-enabled server", "A physical or virtual server outside Azure that has the Arc agent installed and appears as an Azure resource."],
   ["Single pane of glass", "One management view covering resources across many environments."]
  ],
  example: "A retailer has Linux servers in its stores, Windows servers in its own datacenter and a Kubernetes cluster in another cloud. After connecting all of them to Azure Arc, its security team assigns one Azure Policy initiative and turns on Defender for Cloud across every environment from the Azure portal.",
  tip: "Arc manages resources where they are; it does not move them. If the scenario says 'apply Azure Policy to on-premises or other-cloud servers', the answer is Azure Arc.",
  check: [
   ["Does connecting a server to Azure Arc move its workload into Azure?", "No. The server keeps running where it is; Arc only projects it into Azure Resource Manager for management."],
   ["Name three Azure management capabilities you can use on an Arc-enabled server.", "Any three of: resource groups and tags, Azure RBAC, Azure Policy, Azure Monitor, Microsoft Defender for Cloud and update management."]
  ]
 },
 {
  t: "Azure Resource Manager and infrastructure as code with ARM templates and Bicep",
  body: [
   "Azure Resource Manager (ARM) is the deployment and management service for Azure. Every request to create, update or delete a resource, whether it comes from the portal, Azure CLI, Azure PowerShell, the REST APIs or an SDK, goes through Resource Manager. It authenticates and authorizes the request, then sends it to the right Azure service. Because all tools go through the same layer, you get consistent results and consistent features such as RBAC, tags, locks and policies no matter which tool you use.",
   "Resource Manager brings several benefits. You can manage your infrastructure through declarative templates rather than scripts. You can deploy, manage and monitor all the resources for a solution as a group rather than one by one. You can redeploy consistently throughout the development lifecycle. It handles dependencies, so resources are created in the right order, and it can deploy independent resources in parallel.",
   "Infrastructure as code (IaC) means describing the infrastructure you need in code files, then using those files to create it. Instead of clicking through the portal, you keep definitions in source control, review changes like code, and deploy the same environment repeatedly. IaC reduces human error and configuration drift between development, test and production.",
   "Azure Resource Manager templates (ARM templates) are JSON files that define the resources to deploy. They are declarative: you state what you want, not the steps to create it, and Resource Manager works out how to get there. Deployments are idempotent, meaning you can deploy the same template many times and get the same result. Templates can use parameters, such as the environment name, so one template serves many environments, and they can be broken into linked templates.",
   "Bicep is a domain-specific language from Microsoft for deploying Azure resources declaratively. It uses a simpler, more concise syntax than JSON and supports modules for reuse. A Bicep file is compiled (transpiled) into a standard ARM JSON template, so it can do everything ARM templates can, and new Azure resource types are available in Bicep straight away. For example, a storage account can be declared in a few lines:",
   "```bicep\nresource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: 'stdemo${uniqueString(resourceGroup().id)}'\n  location: resourceGroup().location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}\n```"
  ],
  terms: [
   ["Azure Resource Manager (ARM)", "The deployment and management layer through which all Azure management requests pass."],
   ["Infrastructure as code (IaC)", "Defining and deploying infrastructure from code files instead of manual steps."],
   ["ARM template", "A declarative JSON file that defines Azure resources for Resource Manager to deploy."],
   ["Bicep", "A concise declarative language that compiles into ARM templates."],
   ["Idempotent", "Producing the same result when run many times with the same input."]
  ],
  example: "A software company needs identical development, test and production environments. It writes one Bicep file describing the VNet, App Service and database, stores it in its code repository, and deploys it three times with different parameter values, so all three environments match exactly.",
  tip: "Every tool, including the portal, goes through Azure Resource Manager. ARM templates are JSON and declarative; Bicep is a simpler language that compiles to ARM JSON. Declarative means you describe the end state.",
  check: [
   ["What does it mean that ARM templates are declarative?", "You describe the resources and settings you want, and Resource Manager works out how to create them and in what order."],
   ["How does Bicep relate to ARM templates?", "Bicep files are compiled into ARM JSON templates, so Bicep is a simpler way to write the same deployments."]
  ]
 },
 {
  t: "Azure Advisor recommendations and Azure Service Health (Azure status, Service Health, Resource Health)",
  body: [
   "Azure provides tools that tell you how to improve your resources and whether Azure itself is having problems. The exam expects you to know which tool gives which kind of information.",
   "Azure Advisor evaluates your deployed Azure resources and makes personalized recommendations based on best practices. Recommendations are grouped into five categories. Reliability recommendations help ensure business continuity, for example adding redundancy. Security recommendations, which come from Microsoft Defender for Cloud, help detect threats and vulnerabilities. Performance recommendations help improve application speed. Operational excellence recommendations help with process and workflow efficiency and deployment best practices. Cost recommendations help reduce spending, for example by resizing or shutting down underused VMs or buying reservations. Each recommendation includes the proposed action, and Advisor also gives an overall Advisor score. It is free and available in the portal and through APIs.",
   "Azure Service Health helps you keep track of the health of Azure services and your resources, and it is made of three views that go from broad to specific. Azure status is a public page that shows service outages across all Azure regions worldwide. It is a global view, not personalized to you.",
   "Service Health, the second view, focuses on the Azure services and regions you actually use. It reports service issues (active problems), planned maintenance, health advisories (for example, a feature being retired) and security advisories. You can set up Service Health alerts to be notified by email, SMS or other actions when something affects your services, and it keeps a history of past incidents so you can review them, including root cause analyses.",
   "Resource Health, the third view, is the narrowest. It shows the health of your individual resources, such as a specific VM, and whether a problem is caused by an Azure platform event or by something else. It also keeps a history of that resource's availability, which helps when you need to show whether an SLA was missed.",
   "Together, these tools complement Azure Monitor. Advisor tells you how to improve, Service Health tells you whether Azure is affecting you, and Monitor collects the detailed metrics and logs from your own resources."
  ],
  terms: [
   ["Azure Advisor", "A free service that gives personalized recommendations for reliability, security, performance, operational excellence and cost."],
   ["Azure status", "A public, global view of the health of all Azure services in all regions."],
   ["Service Health", "A personalized view of service issues, planned maintenance and advisories affecting the services and regions you use."],
   ["Resource Health", "The health of an individual resource, including whether a platform event is affecting it."]
  ],
  example: "A web shop is slow one morning. The operator checks Service Health and sees an active service issue affecting storage in her region, with an alert already emailed to her team. Resource Health for the shop's VM shows it is available. Later, Advisor recommends resizing two underused VMs to save cost.",
  tip: "Recommendations to improve your resources: Advisor. Global outage page for everyone: Azure status. Outages and maintenance affecting your services: Service Health. Health of one specific resource: Resource Health.",
  check: [
   ["Which tool would suggest shutting down an underused VM to save money?", "Azure Advisor, in its cost category."],
   ["You want an email when planned maintenance will affect the Azure services you use. Which tool do you configure?", "Service Health, with a Service Health alert."]
  ]
 },
 {
  t: "Azure Monitor: metrics, Log Analytics, alerts and Application Insights",
  body: [
   "Azure Monitor is the platform for collecting, analyzing and acting on monitoring data from your Azure resources, on-premises machines and other clouds. It gathers data from applications, operating systems, Azure resources, subscriptions and the tenant, so you can understand how your systems are performing and respond to problems.",
   "Azure Monitor works with two main kinds of data. Metrics are numeric values collected at regular intervals, such as CPU percentage, available memory or requests per second. They are lightweight, near real-time and ideal for charts and fast alerts. Many Azure resources send platform metrics automatically without any configuration. Logs are records of events and data with rich properties, such as application traces, activity log entries of who changed what, or security events. Logs are stored in a Log Analytics workspace.",
   "Log Analytics is the tool in the Azure portal for writing and running log queries against that data using Kusto Query Language (KQL). For example, a query can count failed sign-ins per hour or find which VMs had the most errors. Queries can be pinned to dashboards, used in workbooks, or used as the basis for alerts. A simple query looks like this:",
   "```kusto\nHeartbeat\n| where TimeGenerated > ago(1h)\n| summarize LastSeen = max(TimeGenerated) by Computer\n```",
   "Azure Monitor alerts notify you proactively when something in your monitoring data needs attention. An alert rule defines what to watch (a metric threshold, a log query result or an activity log event) and the condition. When it fires, it runs an action group, which can send email, SMS or push notifications, call a webhook, or start automation such as an Azure Function or Logic App.",
   "Application Insights is a feature of Azure Monitor for application performance monitoring (APM). It monitors live web applications, whether they run in Azure, on-premises or in another cloud. It tracks request rates, response times and failure rates, dependency calls to databases and APIs, exceptions, page views and user sessions. It can also run availability tests that check your site at regular intervals from locations around the world. It helps developers find the cause of slow pages or errors in their code, which infrastructure metrics alone would not reveal."
  ],
  terms: [
   ["Azure Monitor", "The Azure platform for collecting, analyzing and acting on metrics and logs."],
   ["Metrics", "Numeric values collected at regular intervals, suited to charts and near real-time alerts."],
   ["Log Analytics", "The tool for querying log data in a Log Analytics workspace using Kusto Query Language (KQL)."],
   ["Application Insights", "An Azure Monitor feature for application performance monitoring of live web apps."],
   ["Action group", "The set of notifications and actions an alert triggers."]
  ],
  example: "A travel site sets a metric alert that emails the on-call engineer when average CPU on its web tier stays above 85% for ten minutes. When customers complain about slow checkouts, Application Insights shows that a call to the payment API takes several seconds, and a Log Analytics query finds matching errors in the logs.",
  tip: "Metrics are numbers over time; logs are detailed records queried with KQL in Log Analytics. Application Insights monitors applications (requests, exceptions, dependencies), not just infrastructure. Alerts use action groups to notify or automate.",
  check: [
   ["Which Azure Monitor feature would help a developer find why a web app's pages load slowly?", "Application Insights, which tracks request times, dependencies and exceptions."],
   ["Where do you write KQL queries against collected log data?", "In Log Analytics, against a Log Analytics workspace."]
  ]
 }
], { reviewed: "2026-09-25" });
