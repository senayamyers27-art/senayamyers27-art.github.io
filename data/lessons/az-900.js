/* Lessons for Microsoft Certified: Azure Fundamentals (AZ-900): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-900", [
 {
  "t": "What cloud computing is, and the shared responsibility model across on-premises, IaaS, PaaS and SaaS",
  "body": [
   "Cloud computing is the delivery of computing services, such as servers, storage, databases, networking, analytics and software, over the internet from a provider's datacenters. Instead of buying and running your own hardware, you rent capacity from a provider like Microsoft Azure, create it in minutes, and pay only for what you use. The provider owns the buildings, power, cooling and physical machines; you get virtual resources on top of them. For the Microsoft Azure Fundamentals exam (AZ-900), this is the starting point for everything else: the benefits of the cloud, the service types and the pricing all follow from the idea that someone else runs the physical layer.",
   "Moving to the cloud does not mean handing over all responsibility. The shared responsibility model describes which tasks belong to the cloud provider and which stay with you, the customer. The split depends on the service type you choose. Picture a stack of layers from the bottom up: physical datacenter, physical network, physical hosts, operating system, network controls, applications, identity and directory infrastructure, accounts and identities, devices, and finally information and data. In an on-premises datacenter you own every layer, from the locks on the doors to the backups of your data.",
   "With infrastructure as a service (IaaS), such as Azure virtual machines, Microsoft takes over the physical layers: the datacenter, the physical network and the physical hosts, including the hypervisor that runs your virtual machines. You still manage the guest operating system and its patches, the applications, network controls such as the firewall and network security group rules you configure, identities and data. With platform as a service (PaaS), such as Azure App Service or Azure SQL Database, Microsoft also runs the operating system and runtime, so you focus on your application code, its configuration and your data. With software as a service (SaaS), such as Microsoft 365, Microsoft runs the whole application, and you mainly configure its settings and manage who uses it.",
   "Some responsibilities never move to the provider, whichever service type you pick. You always own your information and data, the devices (laptops and phones) that connect to the service, and the accounts and identities that sign in. If an employee's password is stolen, or someone shares sensitive files publicly, that is the customer's problem in every model. Likewise, some responsibilities always belong to the provider once you are in the cloud: the physical hosts, the physical network and the physical datacenter. The layers in between, such as the operating system, network controls, applications and identity infrastructure, shift from you toward Microsoft as you move from IaaS to PaaS to SaaS, and in PaaS several of them are shared, because Microsoft provides the controls and you configure them.",
   "A helpful way to remember the model is that the line between 'provider manages' and 'you manage' moves up the stack as you go from on-premises to IaaS to PaaS to SaaS. The more the provider manages, the less control you have and the less operational work you do. That is a trade-off rather than a ranking: a team that needs a custom kernel setting wants IaaS, while a team that just wants email wants SaaS.",
   "Consider a worked example. A retailer runs three workloads: a legacy inventory application on an Azure VM, a new ordering website on App Service, and staff email in Microsoft 365. A critical Windows security update is released. For the VM, the retailer's own administrators must apply it to the guest OS, for example with Azure Update Manager or inside the machine. For App Service, Microsoft patches the underlying OS and the retailer does nothing at that layer. For Microsoft 365, Microsoft patches everything. The next week, a sales manager falls for a phishing email and gives away a password. In all three workloads, protecting that account, for instance by requiring multifactor authentication, is the retailer's job.",
   "Common mistakes: believing that moving to the cloud makes the provider responsible for data breaches caused by weak passwords or oversharing; assuming Microsoft patches the operating system inside an IaaS virtual machine; and thinking SaaS means you have no responsibilities at all. Another trap is treating 'the cloud' as a single model, when the split is different for every service you use.",
   "Exam questions are usually worded as 'who is responsible for' a named task in a named service type. 'Physical security of the datacenter', 'physical hosts' or 'the hypervisor' is always Microsoft. 'Patching the operating system of a virtual machine' is the customer in IaaS. 'Information and data', 'devices', 'accounts and identities' is always the customer. If the scenario says the customer wants the least management effort, look for SaaS; if it says the most control, look for IaaS or on-premises."
  ],
  "terms": [
   [
    "Cloud computing",
    "Delivering computing services such as servers, storage, databases and software over the internet on demand."
   ],
   [
    "Shared responsibility model",
    "The division of security and management tasks between the cloud provider and the customer, which depends on the service type."
   ],
   [
    "Infrastructure as a service (IaaS)",
    "A service type where the provider runs the physical infrastructure and you manage the operating system and everything above it."
   ],
   [
    "Platform as a service (PaaS)",
    "A service type where the provider also manages the operating system and runtime, and you manage your application and data."
   ],
   [
    "Software as a service (SaaS)",
    "A complete application run by the provider that you configure and use, such as Microsoft 365."
   ],
   [
    "On-premises",
    "Infrastructure you own and run in your own datacenter, where you are responsible for every layer."
   ],
   [
    "Hypervisor",
    "The software on a physical host that runs virtual machines; in Azure it is always Microsoft's responsibility."
   ]
  ],
  "example": "A clinic moves its scheduling server to an Azure VM and assumes Microsoft now handles security. Months later an audit finds the guest OS unpatched and several staff accounts without multifactor authentication. The auditor explains the shared responsibility model: Microsoft secures the physical hosts and datacenter, but in IaaS the clinic still patches the operating system, and in every model it protects its own accounts and patient data.",
  "tip": "Physical hosts, physical network, the datacenter and the hypervisor are always Microsoft's. Data, devices, accounts and identities are always yours. The guest OS is yours in IaaS and Microsoft's in PaaS and SaaS.",
  "check": [
   [
    "In IaaS, who applies security patches to the virtual machine's operating system?",
    "The customer, because in IaaS Microsoft manages only the physical layers and the hypervisor, not the guest OS."
   ],
   [
    "Name the responsibilities that stay with the customer in every service type.",
    "Information and data, devices (endpoints), and accounts and identities, because only the customer controls what is stored and who signs in."
   ],
   [
    "Which service type gives the customer the least management responsibility?",
    "SaaS, because the provider runs the infrastructure, platform and application; the customer mainly configures it and manages users and data."
   ],
   [
    "Why does moving from IaaS to PaaS reduce patching work?",
    "In PaaS Microsoft manages the operating system and runtime, so the customer no longer patches them and focuses on the application and data."
   ]
  ]
 },
 {
  "t": "Cloud models: public, private and hybrid cloud, plus multicloud and where Azure Arc fits",
  "body": [
   "A cloud model, sometimes called a deployment model, describes where cloud resources run and who uses them. The Microsoft Azure Fundamentals exam (AZ-900) expects you to recognize three main models, public, private and hybrid, and the related term multicloud. You also need to know where Azure Arc fits, because it is Microsoft's answer to managing resources that live outside Azure. These models are about location and ownership; they are separate from the service types IaaS, PaaS and SaaS, and any model can host any service type.",
   "A public cloud is built, owned and run by a third-party provider such as Microsoft, and its services are offered to anyone over the internet. Many customers, called tenants, share the same physical infrastructure, although each tenant's resources are logically isolated. Public cloud has no upfront hardware cost, you can provision resources in minutes, you can scale quickly, and you pay for what you use. The trade-off is that you do not control the physical hardware or exactly where every component lives beyond choosing a region, and you work within the provider's security and compliance options.",
   "A private cloud is used by a single organization. It can run in the organization's own datacenter or be hosted by a third party, but the resources are dedicated to that one organization. Private cloud gives the most control over hardware, security and configuration, which can help with strict compliance or legacy needs. However, the organization must buy, maintain and eventually replace the hardware, so it keeps the capital expenditure (CapEx) and loses much of the cost and speed advantage of public cloud. What makes it a cloud rather than just a datacenter is self-service provisioning and automation for internal users.",
   "A hybrid cloud combines public and private clouds and lets data and applications work together between them. A common reason is regulation or latency: a hospital might keep patient records on hardware it owns while running its public website and analytics in Azure, connected by a secure link such as a site-to-site VPN or ExpressRoute. Hybrid also helps companies migrate gradually, or burst into the public cloud when on-premises capacity runs out. Hybrid gives the most flexibility, because the organization decides where each workload runs, but it also brings the most complexity to operate. Multicloud means using services from more than one public cloud provider, for example Azure together with another provider, perhaps because different teams chose different platforms, a company was acquired, or one provider offers a feature the others do not. Multicloud is about several providers; hybrid is about mixing private and public. An organization can be both at once, for example with its own datacenter, Azure and a second public cloud.",
   "Managing resources spread across on-premises and several clouds is hard, because each place has its own tools. Azure Arc addresses this. It projects servers, Kubernetes clusters, SQL Server instances and some data services that run outside Azure into Azure Resource Manager, so they appear in the Azure portal as resources and can be governed with the same tools you use for Azure: Azure Policy, role-based access control (RBAC), tags and monitoring. Arc does not move the workload; it stays where it is. For a server, you install the Connected Machine agent, and the machine then shows up in a resource group like any VM.",
   "Consider a worked example. A manufacturer keeps its factory control systems in its own datacenter because they need very low latency to the machines, runs its customer portal in Azure, and inherited a set of Linux servers in another public cloud after buying a smaller company. That is hybrid and multicloud at the same time. The security team wants every server, wherever it runs, to meet one baseline and report compliance in one place. They onboard the on-premises and other-cloud servers to Azure Arc and assign an Azure Policy initiative at the management group, so all servers are evaluated together.",
   "Common mistakes: calling any use of two clouds 'hybrid'; thinking a private cloud must be in your own building; and confusing Azure Arc with Azure Migrate. Migrate helps you move workloads into Azure; Arc manages them where they already are.",
   "Exam questions give clue words: 'shared by many customers' or 'no upfront cost' means public; 'single organization' or 'full control of hardware' means private; 'keep some data on-premises while using Azure' means hybrid; 'two or more cloud providers' means multicloud; 'manage non-Azure servers from the Azure portal without moving them' means Azure Arc."
  ],
  "terms": [
   [
    "Public cloud",
    "Cloud services owned and run by a provider and offered to many customers over the internet."
   ],
   [
    "Private cloud",
    "Cloud resources dedicated to a single organization, whether in its own datacenter or hosted by a third party."
   ],
   [
    "Hybrid cloud",
    "A combination of private and public cloud that lets data and applications work across both."
   ],
   [
    "Multicloud",
    "Using services from two or more public cloud providers."
   ],
   [
    "Azure Arc",
    "A service that projects servers, Kubernetes clusters and data services outside Azure into Azure Resource Manager so they can be managed and governed from Azure."
   ],
   [
    "Tenant",
    "A customer's isolated slice of a shared cloud, with its own resources and identities."
   ]
  ],
  "example": "A bank must keep certain transaction records on hardware it owns for regulatory reasons, but wants to use Azure for its mobile app back end and reporting. It connects its datacenter to Azure with a private link, which makes it a hybrid cloud. To apply one set of security policies to both its on-premises servers and its Azure VMs, it onboards the on-premises servers to Azure Arc and manages them in the Azure portal alongside everything else.",
  "tip": "Hybrid means private plus public; multicloud means more than one public provider. Managing non-Azure resources from Azure without moving them is Azure Arc, not Azure Migrate.",
  "check": [
   [
    "Which cloud model gives the most control over the physical hardware?",
    "Private cloud, because the resources are dedicated to one organization, which chooses and manages the hardware."
   ],
   [
    "A company uses Azure and a second public cloud provider but has no datacenter of its own. Which model is this?",
    "Multicloud, because it uses more than one public provider; there is no private cloud involved, so it is not hybrid."
   ],
   [
    "What does Azure Arc do with an on-premises server?",
    "It projects the server into Azure Resource Manager so it can be managed with Azure tools such as Policy, RBAC and tags; the server itself stays on-premises."
   ],
   [
    "Why might an organization choose hybrid cloud?",
    "To keep some workloads or data on-premises for regulation, latency or legacy reasons while using public cloud for others, or to migrate gradually."
   ]
  ]
 },
 {
  "t": "The consumption-based model and pay-as-you-go pricing compared with buying hardware",
  "body": [
   "When you run your own datacenter, you buy servers, storage and network equipment before you can use them. You have to guess how much capacity you will need for the next several years. If you guess too low, applications slow down and you wait weeks for new hardware. If you guess too high, you have paid for machines that sit idle. You also pay for power, cooling, floor space, maintenance contracts and staff whether the machines are busy or not. This is the cost model the cloud was designed to replace.",
   "The cloud uses a consumption-based model: you pay for the resources you actually use, and nothing up front. Azure meters usage, such as how many seconds or hours a virtual machine ran, how many gigabytes are stored, how much data left the region, or how many times a function executed, and bills you for it, typically monthly. When you delete a resource, its charges stop. This pricing approach is usually called pay-as-you-go, and it is how a new Azure subscription is billed by default.",
   "Here is how it works in practice. You create a resource, for example with `az vm create --resource-group rg-lab --name vm1 --image Ubuntu2204`. From that moment the meter runs for compute, the disk and the public IP address. If you run `az vm deallocate --resource-group rg-lab --name vm1`, compute billing stops but the disk is still stored and still billed. If you run `az group delete --name rg-lab`, every resource in the group is removed and all of its meters stop. Each resource type has its own meters, which is why the details of pricing differ from service to service even though the model is the same.",
   "Consumption-based pricing brings several benefits the exam lists. There are no upfront costs, so a small team can start a project without a hardware budget. You do not need to buy and manage costly infrastructure you might not use. You can add resources when you need them and remove them when you do not, so you stop paying for capacity during quiet periods. It becomes easy to experiment: you can try an idea for a day and delete it. And because the provider buys hardware at enormous scale, you benefit from economies of scale in the price.",
   "Pay-as-you-go is not the only purchase option. For steady, predictable workloads you can commit in advance, for example with Azure Reservations for a one-year or three-year term, in exchange for a lower price, and spare capacity can be bought at a deep discount as Azure Spot Virtual Machines, which Azure can evict when it needs the capacity back. You will meet these in the cost management lessons. The exam focus here is the basic idea: in the cloud, cost follows usage, while on-premises cost follows what you bought.",
   "Consider a worked example. An online ticket seller has quiet traffic most of the year and a huge spike for two days when a festival goes on sale. On-premises, it would have to buy enough servers for the spike and leave most of them idle for the other 363 days. In Azure it runs a small number of web instances normally, scales out for the two peak days, then scales back in. It pays for the extra instances only for the hours they ran, and the bill for the rest of the year reflects the small baseline.",
   "Common mistakes: assuming that a stopped VM costs nothing (a VM stopped from inside the guest OS is still allocated and still billed for compute; only deallocating stops compute charges, and disks are billed either way); assuming that consumption pricing is always cheaper (an always-on, steady workload may cost less with a reservation); and forgetting that easy creation means costs can grow quietly when test resources are left running. That is why Azure provides budgets and cost analysis, and why labs in this course remind you to delete resource groups when you finish.",
   "Exam questions about this topic tend to use clue words. 'No upfront cost', 'pay only for what you use', 'stop paying when you stop using a service' and 'pay for additional resources only when needed' all point to the consumption-based model. 'Buying servers in advance' and 'estimating capacity for years ahead' describe the traditional model the cloud replaces. If a question asks which benefit lets a startup begin without a hardware budget, the answer is the consumption-based model."
  ],
  "terms": [
   [
    "Consumption-based model",
    "A pricing approach where you pay for the resources you actually use rather than buying capacity in advance."
   ],
   [
    "Pay-as-you-go",
    "Azure's default billing option, where usage is metered and billed after the fact with no upfront commitment."
   ],
   [
    "Meter",
    "The measurement Azure uses to bill a resource, such as compute hours or gigabytes stored."
   ],
   [
    "Deallocate",
    "Stopping a VM so that its compute resources are released and compute billing stops, while its disks remain."
   ],
   [
    "Azure Reservations",
    "A one-year or three-year commitment to a resource type in exchange for a discounted price."
   ],
   [
    "Economies of scale",
    "Lower unit costs a provider achieves by operating at very large scale, which can be passed on to customers."
   ]
  ],
  "example": "A university research group needs 50 powerful VMs for a two-week simulation once a semester. Buying the servers would cost a large sum and leave them idle most of the year. Instead, the group creates the VMs in Azure for the two weeks, runs the job, deletes the resource group, and pays only for the hours used. The finance office sees a single spike on that month's bill and nothing in the months between.",
  "tip": "No upfront cost, pay for what you use and stop paying when you stop using: that is the consumption-based model. A VM stopped from inside the OS is still billed; deallocate it to stop compute charges.",
  "check": [
   [
    "What does the consumption-based model mean for upfront costs?",
    "There are none; you pay only for the resources you use, as you use them."
   ],
   [
    "A VM is shut down from inside Windows but still shows as Stopped, not Stopped (deallocated). Is compute still billed?",
    "Yes, because the VM is still allocated on a host; you must deallocate it to stop compute charges, and its disks are billed in either state."
   ],
   [
    "Why is the consumption-based model good for experiments?",
    "You can create resources for a short test and delete them afterward, paying only for the time they existed, with no hardware purchase."
   ],
   [
    "For a workload that runs at the same level 24 hours a day for years, what option might cost less than pay-as-you-go?",
    "A reservation, which commits you for one or three years in exchange for a lower price."
   ]
  ]
 },
 {
  "t": "Capital expenditure (CapEx) vs operational expenditure (OpEx) and how the cloud shifts spending",
  "body": [
   "Finance teams group spending into two kinds, and the Microsoft Azure Fundamentals exam (AZ-900) expects you to recognize both. Capital expenditure (CapEx) is money spent up front on physical assets that the organization owns and uses for years, such as servers, storage arrays, network equipment or a building. Because the asset lasts several years, its cost is usually spread over its useful life on the books through depreciation, which gradually reduces the recorded value of the asset.",
   "Operational expenditure (OpEx) is money spent on services or products as they are used, such as a monthly cloud bill, software subscriptions, leased equipment or electricity. OpEx is usually recorded in the same period it is spent, and there is no asset to depreciate. You can generally increase or decrease OpEx as your needs change, and you can stop it when you stop using the service. The cloud's consumption-based, pay-as-you-go model is the textbook example of OpEx.",
   "A traditional datacenter is mostly CapEx. To add capacity you go through a purchase cycle: estimate demand, get quotes, win budget approval, order hardware, wait for delivery, rack and cable it, and then use it for years whether you need all of it or not. Datacenter costs such as the building, power backup, cooling and network links are also typically bought up front. Staff salaries and electricity are ongoing, but the big decisions are large purchases made in advance, often on a refresh cycle every few years.",
   "Cloud computing is mostly OpEx. You rent compute, storage and services from the provider and pay each month for what you consumed, with no hardware purchase. This means you do not need to find a large sum at the start of a project, and your spending can follow your actual demand. If a project is cancelled, you delete the resources and stop paying, rather than owning equipment you no longer need. Microsoft carries the CapEx of building datacenters and recovers it through the prices of its services.",
   "It helps to line the two up side by side. CapEx: large upfront cost, you own the asset, value depreciates, capacity is fixed until the next purchase, and a wrong guess is expensive. OpEx: no upfront cost, you own nothing physical, the cost is recognized as it is incurred, capacity follows demand, and a wrong guess is corrected by scaling or deleting. Neither is automatically better. Some organizations prefer the predictability of owned assets; others value the flexibility of paying as they go. The exam simply wants you to classify each spend correctly and explain why the cloud shifts the balance toward OpEx.",
   "Consider a worked example. A design agency needs a file and render server. Option one: buy a server and storage for a large one-time sum, install it in a rented rack and plan to replace it in five years. That purchase is CapEx, and the accountant will depreciate it. Option two: run a VM and storage in Azure for a monthly amount that rises in busy months and falls in quiet ones. That monthly bill is OpEx. Six months in, the agency loses its biggest client and cuts its render work in half. With option two, it scales down and the bill drops the next month; with option one, it still owns the full server.",
   "Common mistakes: thinking OpEx means 'always cheaper' (it means pay as you use, and a steady workload may cost more over years than owned hardware unless you use reservations); classifying a cloud reservation as CapEx (it is a prepaid or committed purchase of a service, not ownership of a physical asset, so it is still generally treated as operational spending); and forgetting that on-premises environments also have OpEx such as power and staff. The shift to the cloud also changes governance: instead of approving one large purchase, organizations watch a bill that can rise quietly, which is why budgets and cost alerts matter.",
   "Exam questions use predictable wording. 'Buying servers', 'building a datacenter', 'upfront investment', 'depreciated over time' and 'owning physical infrastructure' all mean CapEx. 'Monthly bill', 'pay for what you use', 'subscription', 'no upfront cost' and 'deducted in the same year' mean OpEx. If a question asks which expenditure model the cloud uses, or which model lets you stop spending when you stop using a service, answer OpEx."
  ],
  "terms": [
   [
    "Capital expenditure (CapEx)",
    "Upfront spending on physical assets that the organization owns and uses over several years."
   ],
   [
    "Operational expenditure (OpEx)",
    "Ongoing spending on services or products as they are used, recorded in the period it is incurred."
   ],
   [
    "Depreciation",
    "Spreading the cost of an owned asset over its useful life as its value declines."
   ],
   [
    "Refresh cycle",
    "The regular replacement of owned hardware every few years as it ages."
   ],
   [
    "Consumption-based model",
    "Paying for cloud resources according to actual usage, which is an OpEx model."
   ],
   [
    "Budget",
    "A spending limit in Azure Cost Management that sends alerts as costs approach or exceed thresholds."
   ]
  ],
  "example": "A retailer's server room is due for a hardware refresh, which would require a large capital budget approved by the board. Instead, the IT manager proposes moving the workloads to Azure. The finance team notes that the spending would shift from CapEx, a one-time purchase depreciated over five years, to OpEx, a monthly bill that tracks usage. They set up a monthly budget with alerts so the variable cost stays visible.",
  "tip": "Anything bought, owned and depreciated over years is CapEx. A monthly bill for cloud services you consume is OpEx. The cloud's consumption-based model is an OpEx model.",
  "check": [
   [
    "Is buying a new storage array for your datacenter CapEx or OpEx?",
    "CapEx, because it is an upfront purchase of a physical asset the organization owns and depreciates over time."
   ],
   [
    "Which expenditure model does Azure pay-as-you-go pricing represent?",
    "OpEx, because you pay for services as you use them, with no upfront asset purchase."
   ],
   [
    "Give one business benefit of moving from CapEx to OpEx.",
    "No large upfront investment is needed, so projects can start quickly, and spending can follow actual demand instead of a multi-year guess."
   ],
   [
    "Why do budgets and cost alerts become more important after moving to OpEx?",
    "Because spending varies with usage, costs can grow without a purchase approval step, so alerts are needed to keep them visible and controlled."
   ]
  ]
 },
 {
  "t": "High availability, service-level agreements (SLAs) and composite availability",
  "body": [
   "Availability is the proportion of time a service is up and usable. High availability means designing a system so it stays available even when some part of it fails, usually by removing single points of failure: running more than one instance so that another can take over, storing more than one copy of data, and spreading those copies across separate hardware or locations. In Azure you build high availability from features such as multiple virtual machines behind a load balancer, availability zones and redundant storage. High availability is related to, but not the same as, disaster recovery: high availability keeps a service running through everyday failures, while disaster recovery restores it after a large event such as the loss of a region.",
   "Microsoft describes its commitment for each Azure service in a service-level agreement (SLA). An SLA is a formal agreement that states the uptime or connectivity Microsoft commits to for a service, usually as a percentage over a billing month, such as 99.9% or 99.99%. It also states what happens if Microsoft misses that target, typically a service credit, which is a percentage discount on that service's bill that you must claim. SLAs apply to paid, generally available services; free services and preview features usually have no financially backed SLA. An SLA is a promise about compensation, not a guarantee that outages cannot happen.",
   "Small differences in the percentage matter a lot. In a 30-day month there are 43,200 minutes. To find allowed downtime, multiply the minutes in the month by the unavailable fraction. 99% allows 432 minutes, about 7.2 hours. 99.9% allows 43.2 minutes. 99.95% allows 21.6 minutes. 99.99% allows about 4.3 minutes. 99.999% allows well under a minute. Each extra nine divides the allowed downtime by ten.",
   "The SLA a service gets can depend on how you deploy it. A single virtual machine has a lower SLA than two or more VMs in an availability set, which is lower again than VMs spread across availability zones, because each redundant design survives a larger failure: a single host, a rack, or a whole datacenter. Some services also offer higher SLAs on premium tiers. Check the current SLA document for the exact figures rather than memorizing them, because they change.",
   "An application usually depends on several services, such as a web app, a database and a storage account. If the application needs every one of them working, its overall availability, called the composite SLA, is found by multiplying the individual SLAs as decimals. Two services at 99.95% and 99.99% give 0.9995 x 0.9999 = 0.9994, about 99.94%, which is lower than either one alone. Adding dependencies in a chain always lowers availability. Adding redundancy raises it: if two independent copies each have 99.9%, the chance both are down at once is 0.001 x 0.001, so the pair gives about 99.9999%.",
   "Consider a worked example. A team runs a web front end on App Service with a 99.95% SLA, backed by a database with a 99.99% SLA. Their composite SLA is roughly 99.94%, which allows about 26 minutes of downtime in a 30-day month. The business asks for no more than about 5 minutes. The team cannot reach that by tuning one service, so they deploy the whole application into a second region with traffic routing that fails over automatically. Because either region can serve users, the combined availability rises well above the single-region figure.",
   "Common mistakes: adding SLAs instead of multiplying them; expecting the composite to be at least as good as the weakest link (it is always lower when all parts are required); thinking a higher percentage means more downtime; assuming preview features have the same SLA as released ones; and believing Microsoft automatically makes your application highly available. The platform provides the building blocks and publishes the SLA, but you choose whether to deploy one instance or several.",
   "Exam questions often ask you to compare numbers or pick a design. 'Which SLA allows the least downtime' is the one with the most nines. 'What do you receive if Microsoft fails to meet an SLA' is a service credit. 'Does a preview feature have an SLA' is generally no. 'How do you calculate the SLA of an app using two services' is multiplication, giving a lower value. 'How do you increase the SLA of a VM workload' is to add instances across an availability set or availability zones."
  ],
  "terms": [
   [
    "Availability",
    "The percentage of time a service is running and usable."
   ],
   [
    "High availability",
    "A design that keeps a service running when individual components fail, usually through redundancy."
   ],
   [
    "Service-level agreement (SLA)",
    "Microsoft's formal commitment to a service's uptime or connectivity, with credits if the target is missed."
   ],
   [
    "Service credit",
    "A discount on the affected service's bill that you can claim when an SLA is not met."
   ],
   [
    "Composite SLA",
    "The overall availability of an application that depends on several services, found by multiplying their SLAs."
   ],
   [
    "Single point of failure",
    "Any component whose failure stops the whole system because there is no redundant copy."
   ],
   [
    "Redundancy",
    "Running extra copies of a component so that one can take over if another fails."
   ]
  ],
  "example": "An insurance company's claims app uses App Service at 99.95% and a database at 99.99%, giving a composite of about 99.94%. After a regional incident causes a long outage, the architect deploys a second copy in another region with automatic failover. The CFO asks whether they can claim anything for the outage; the answer is that they can request a service credit if the SLA was missed, but the credit is small compared with the lost business, which is why they invested in redundancy.",
  "tip": "Composite SLAs are found by multiplying and are always lower than the lowest individual SLA in the chain. More nines means less allowed downtime. Missing an SLA earns a service credit, not a guarantee.",
  "check": [
   [
    "About how much downtime does a 99.9% SLA allow in a 30-day month?",
    "About 43 minutes, because 43,200 minutes x 0.001 = 43.2 minutes."
   ],
   [
    "An app needs a web app (99.95%) and a database (99.99%). Is the composite higher or lower than 99.95%?",
    "Lower, about 99.94%, because the SLAs are multiplied and both services must be up."
   ],
   [
    "What does Microsoft usually provide if it fails to meet an SLA?",
    "A service credit, a percentage discount on the bill for the affected service."
   ],
   [
    "How can you raise the SLA of a workload that runs on one VM?",
    "Run two or more VMs across an availability set or, better, across availability zones, so a single failure does not stop the service."
   ]
  ]
 },
 {
  "t": "Scalability and elasticity: scaling up vs scaling out, manual vs automatic",
  "body": [
   "Scalability is the ability to adjust resources to meet demand. If more people use your application, a scalable system can add capacity so it stays responsive; if fewer people use it, you can remove capacity so you stop paying for it. On-premises, scaling means buying and installing hardware, which takes weeks. In the cloud, scaling is a configuration change, a command or a rule, and it takes minutes. Scalability matters in both directions: adding capacity protects performance, and removing it protects your budget, because in a consumption-based model idle capacity is still billed. There are two directions of scaling. Vertical scaling, also called scaling up, gives an existing resource more power, such as moving a virtual machine to a size with more CPU cores or memory, or moving a database to a higher performance tier. Scaling down is the reverse. Vertical scaling is simple, because the application still runs on one machine and needs no redesign, but there is a ceiling on how large a single machine can be, and resizing a VM usually requires a restart, which means a short interruption.",
   "Horizontal scaling, also called scaling out, adds more instances of a resource, such as going from two web servers to six behind a load balancer. Scaling in removes instances. Horizontal scaling can grow much further than vertical scaling and improves availability, because the loss of one instance does not stop the service. The trade-off is that the application must be designed so several copies can share the work, typically by keeping session data outside the individual server so any instance can answer any request.",
   "Scaling can be manual or automatic. Manual scaling means an administrator decides when to change the size or number of instances, for example by running `az vm resize --resource-group rg-app --name vm1 --size Standard_D4s_v5` or by moving a slider in the portal. Automatic scaling, usually called autoscale, uses rules or schedules. A metric rule might add an instance when average CPU stays above 70% for ten minutes and remove one when it stays below 30%. A schedule rule might set five instances every weekday morning and two at night. You also set a minimum and maximum instance count, so autoscale cannot shrink to nothing or grow without limit. Virtual machine scale sets, App Service plans, Azure Functions and Azure Container Apps all support automatic scaling.",
   "```bash\naz monitor autoscale create --resource-group rg-app --resource web-vmss --resource-type Microsoft.Compute/virtualMachineScaleSets --name web-autoscale --min-count 2 --max-count 10 --count 2\naz monitor autoscale rule create --resource-group rg-app --autoscale-name web-autoscale --condition \"Percentage CPU > 70 avg 10m\" --scale out 2\n```",
   "Elasticity is the term for scaling automatically in both directions as demand changes. An elastic system grows when a surge arrives and shrinks when it passes, without anyone clicking a button, so you only pay for extra capacity while you need it. On the exam, scalability is the general ability to add or remove resources, manually or automatically; elasticity specifically implies that this happens automatically and dynamically in response to demand. Elasticity is one of the main reasons the cloud suits unpredictable workloads, such as a retail sale or a viral post.",
   "Consider a worked example. A news site normally needs three web servers. When a major story breaks, traffic jumps tenfold within minutes. With manual scaling, an on-call engineer might notice slow pages and add servers twenty minutes later, after readers have left. With a scale set and an autoscale rule on CPU, new instances start as soon as the threshold is crossed, and they are removed an hour after traffic settles. The site stays fast, and the extra cost covers only the busy hour. Scaling one server up to a giant size would have hit the size ceiling and needed a restart in the middle of the surge.",
   "Common mistakes: mixing up the directions (up and down change the size of one resource; out and in change the number of resources); assuming every application can scale out without changes; and treating scalability and elasticity as identical.",
   "Exam wording is the clue: 'add more memory to a VM' or 'move to a larger size' is scaling up; 'add more VMs' or 'more instances' is scaling out; 'automatically adjusts to changes in demand' or 'grows and shrinks on its own' is elasticity or autoscale; 'ability to handle increased load' in general is scalability."
  ],
  "terms": [
   [
    "Scalability",
    "The ability to add or remove resources to match demand."
   ],
   [
    "Vertical scaling (scale up/down)",
    "Changing the size or power of an existing resource, such as more CPU or memory."
   ],
   [
    "Horizontal scaling (scale out/in)",
    "Changing the number of instances of a resource, such as adding VMs."
   ],
   [
    "Autoscale",
    "Automatic scaling driven by metric rules or schedules within a minimum and maximum instance count."
   ],
   [
    "Elasticity",
    "The ability to scale automatically in both directions as demand rises and falls."
   ],
   [
    "Virtual machine scale set",
    "A group of identical, load-balanced VMs that can scale out and in automatically."
   ]
  ],
  "example": "A tax preparation website sees ten times its normal traffic in the weeks before the filing deadline. Its web tier runs in a VM scale set with an autoscale rule: add two instances when average CPU exceeds 70% for ten minutes, remove one when it stays under 30%, with a minimum of two and a maximum of twenty. In deadline week the set grows to eighteen instances on its own, then shrinks back to two in May.",
  "tip": "Up and down change the size of one resource; out and in change the number of resources. If the question says capacity changes automatically in response to demand, the answer is elasticity or autoscale.",
  "check": [
   [
    "Moving a VM from 4 to 16 GB of memory is which kind of scaling?",
    "Vertical scaling (scaling up), because it increases the size of one existing resource."
   ],
   [
    "Why does scaling out usually improve availability as well as capacity?",
    "Because there are several instances, so the loss of one does not stop the service."
   ],
   [
    "What distinguishes elasticity from scalability?",
    "Elasticity means resources are added and removed automatically in response to demand; scalability is the general ability to change capacity, including manually."
   ],
   [
    "Why does an autoscale setting have a maximum instance count?",
    "To cap how far it can grow, which limits cost and protects against runaway scaling from an unexpected spike or fault."
   ]
  ]
 },
 {
  "t": "Reliability and predictability of performance and cost in the cloud",
  "body": [
   "Reliability is the ability of a system to recover from failures and continue to function. In the cloud, reliability comes from two places: the provider's global scale and the way you design your solution. Azure runs datacenters in many regions around the world, and many regions contain several availability zones, each with independent power, cooling and networking. If you spread a workload across zones or regions, a failure in one place does not have to take your application down. The Microsoft Azure Fundamentals exam (AZ-900) lists reliability and predictability as core benefits of the cloud, alongside high availability and scalability.",
   "Reliability also covers recovery. Geo-redundant storage keeps copies of data in a second region; Azure Backup keeps restorable copies of VMs, files and databases; and Azure Site Recovery replicates machines so you can fail over to another region if the primary one is lost. The cloud makes these designs affordable because you do not have to build, staff and pay for a second datacenter yourself. Some reliability features are built in, such as the multiple copies Azure Storage always keeps within a datacenter; others, such as zone redundancy or cross-region replication, you must choose and configure.",
   "Predictability is about being able to plan with confidence. The exam splits it into two parts. Performance predictability means you can count on your application having the resources it needs to give users a consistent experience. Autoscaling adds capacity when demand grows, load balancing spreads requests so no single instance is overwhelmed, and high availability designs keep the service running through failures. Because you can scale quickly, you are less likely to be caught by a sudden rush of users.",
   "Cost predictability means you can forecast and control what you will spend. The Azure Pricing Calculator estimates the cost of resources before you deploy them. The Total Cost of Ownership (TCO) Calculator compares the cost of running workloads on-premises with running them in Azure. Microsoft Cost Management tracks actual spending, breaks it down by resource, tag or subscription, and forecasts where the month will end. Budgets send alerts when spending approaches or passes a threshold, and reservations fix the price of steady workloads for a term. Tags such as `costCenter=finance` let you see which team is spending what.",
   "The steps to make costs predictable follow a simple pattern: estimate before you build, tag as you build, watch while it runs, and alert before it surprises you. A command such as `az consumption budget list` shows the budgets on a subscription, and the Cost analysis blade in the portal shows spending grouped by service or tag. The Microsoft Azure Well-Architected Framework, a free body of guidance, includes reliability, performance efficiency and cost optimization among its pillars. You do not need to know the framework in depth for AZ-900, but it is a reminder that these benefits are not automatic: you get them by choosing the right redundancy, scaling rules and cost controls.",
   "Consider a worked example. An online learning company plans to move its course platform to Azure. Before migrating, it uses the TCO Calculator to compare three years of on-premises costs with Azure, and the Pricing Calculator to price the exact VM sizes, database tier and storage. After launch, it deploys the web tier across three availability zones with autoscale, replicates backups to a paired region, sets a monthly budget with alerts at 80% and 100%, and tags every resource with a cost center. When exam season doubles traffic, autoscale keeps pages fast, and the budget alert warns finance a week before the month's spending passes the plan.",
   "Common mistakes: assuming reliability is automatic simply because a workload is in the cloud (a single VM in a single zone is still a single point of failure); mixing up the two kinds of predictability; and confusing the calculators. The Pricing Calculator estimates the cost of Azure resources you plan to deploy; the TCO Calculator compares on-premises costs with Azure costs; Cost Management reports what you are actually spending. Another trap is thinking a budget stops resources when it is reached. Budgets alert; they do not shut anything down unless you add automation.",
   "Exam questions tend to name a tool and ask which benefit it supports, or describe a need and ask for the tool. 'Consistent user experience under changing load' points to performance predictability, via autoscaling and load balancing. 'Forecast or track cloud spending' points to cost predictability, via Cost Management. 'Estimate the cost of a planned deployment' is the Pricing Calculator. 'Compare our datacenter costs with Azure' is the TCO Calculator. 'Recover from the loss of a region' is reliability, via replication to another region and tools such as Azure Site Recovery."
  ],
  "terms": [
   [
    "Reliability",
    "The ability of a system to recover from failures and keep functioning."
   ],
   [
    "Performance predictability",
    "Confidence that an application will have the resources it needs for a consistent user experience."
   ],
   [
    "Cost predictability",
    "The ability to forecast and control cloud spending."
   ],
   [
    "Pricing Calculator",
    "A tool that estimates the cost of Azure resources before you deploy them."
   ],
   [
    "Total Cost of Ownership (TCO) Calculator",
    "A tool that compares the cost of running workloads on-premises with running them in Azure."
   ],
   [
    "Microsoft Cost Management",
    "The Azure service for analysing, forecasting and budgeting actual cloud spending."
   ],
   [
    "Azure Site Recovery",
    "A service that replicates workloads to another location so they can fail over during an outage."
   ]
  ],
  "example": "A charity runs its donation site in one Azure region. Before its annual appeal, it adds a second region with replicated data and automatic failover for reliability, enables autoscale so the site stays fast during the televised appeal, and creates a budget with alerts at 80% of the expected monthly cost. When a regional incident hits during the appeal, traffic fails over, and the finance team is warned when spending passes 80%, so it is never surprised by the bill.",
  "tip": "Performance predictability comes from autoscaling and load balancing. Cost predictability comes from the Pricing Calculator, TCO Calculator, Cost Management and budgets. Budgets alert; they do not stop resources.",
  "check": [
   [
    "Which tool would you use to estimate the monthly cost of a planned set of Azure resources?",
    "The Pricing Calculator, which prices resources before they are deployed."
   ],
   [
    "Which two features mainly support performance predictability?",
    "Autoscaling, which adds capacity as demand grows, and load balancing, which spreads requests across instances."
   ],
   [
    "Does reaching a budget in Cost Management automatically stop your resources?",
    "No, a budget sends alerts; stopping resources requires separate automation."
   ],
   [
    "How does the cloud make disaster recovery more affordable?",
    "You can replicate data and workloads to another region without building and running your own second datacenter."
   ]
  ]
 },
 {
  "t": "Security, governance and manageability benefits of the cloud (management of the cloud vs in the cloud)",
  "body": [
   "Moving to the cloud can strengthen security and governance, not only lower costs. Microsoft invests heavily in the physical security of its datacenters, in protecting its network against attacks such as large-scale distributed denial-of-service (DDoS) floods, and in keeping the underlying platform patched. Depending on the service type, you can also hand over operating system patching to Microsoft, which removes a common source of vulnerabilities. You still decide who has access and how your data is protected, as the shared responsibility model says. The Microsoft Azure Fundamentals exam (AZ-900) groups these benefits as security, governance and manageability. On the security side, the cloud gives you a choice of how much to manage. With IaaS you keep maximum control and can install any security software you like; with PaaS and SaaS, Microsoft handles more of the patching and maintenance for you. Azure also offers built-in services you would otherwise have to buy and operate, such as Azure DDoS Protection, Microsoft Defender for Cloud for security posture and threat protection, and Azure Key Vault for storing secrets and keys.",
   "Governance means setting rules and making sure resources follow them, for example allowing resources only in approved regions, requiring certain tags or limiting VM sizes. In Azure you can deploy templates that already meet corporate standards, audit and enforce rules with Azure Policy, prevent accidental deletion with resource locks, and view compliance reports across every subscription. Because these controls are applied centrally and inherited down the hierarchy, it is easier to keep hundreds of resources consistent than it would be with manual checks on physical servers. Microsoft also publishes audit reports and certifications for its services, through the Service Trust Portal, so you can see which standards the platform meets.",
   "Manageability is split into two ideas that the exam names directly. Management of the cloud means managing your cloud resources: automatically scaling them, deploying them from templates, monitoring their health and automatically replacing failing resources, and receiving alerts based on configured metrics so you know about problems in real time. It is about what the cloud lets you do to your resources. On-premises, adding a server to a web farm meant ordering hardware and configuring it by hand; in Azure, a scale set adds an identical instance from a template in minutes, and Azure Monitor can raise an alert or trigger an action when a metric such as CPU or response time crosses a threshold you set.",
   "Management in the cloud means the ways you interact with and manage your environment: through the web-based Azure portal, a command-line interface (CLI) such as Azure CLI or Azure PowerShell, application programming interfaces (APIs), and Azure Cloud Shell in the browser. It is about the tools and interfaces you use to reach your resources. For example, all three of these create the same resource group:",
   "```bash\n# Azure CLI\naz group create --name rg-demo --location westeurope\n# Azure PowerShell\nNew-AzResourceGroup -Name rg-demo -Location westeurope\n# Portal: Resource groups > Create > name and region > Review + create\n```",
   "Consider a worked example. A company's audit found servers in unapproved countries and dozens of untagged resources nobody could account for. After moving to Azure, it assigns a policy at the top of its hierarchy that allows only two European regions and requires a `costCenter` tag, and adds a delete lock to production databases. Administrators build environments from approved templates, and autoscale plus monitoring alerts keep the web tier healthy. Engineers use the portal for one-off checks and Azure CLI scripts for repeatable tasks. The next audit shows every resource compliant, with reports generated from Azure Policy rather than spreadsheets.",
   "Common mistakes: assuming Microsoft becomes responsible for your access control in the cloud; confusing governance (rules and compliance) with security tooling; and sorting examples into the wrong 'management' bucket. Another trap is thinking governance only restricts people; well-chosen policies also speed teams up, because approved templates remove guesswork.",
   "Exam questions often list examples and ask which category they belong to. Autoscale, templates, monitoring, alerts and self-healing are management of the cloud. The portal, Azure CLI, Azure PowerShell, Cloud Shell and APIs are management in the cloud. 'Ensure resources are only created in approved regions' is governance, usually through Azure Policy. 'Microsoft patches the OS for you' is a security benefit of PaaS and SaaS."
  ],
  "terms": [
   [
    "Governance",
    "Setting rules for how resources may be created and used, and checking that they comply."
   ],
   [
    "Azure Policy",
    "A service that evaluates resources against rules and can audit or block non-compliant ones."
   ],
   [
    "Resource lock",
    "A setting that prevents a resource from being deleted or modified by accident."
   ],
   [
    "Management of the cloud",
    "Managing cloud resources themselves, for example with autoscale, templates, monitoring and alerts."
   ],
   [
    "Management in the cloud",
    "The tools used to reach and manage the environment, such as the portal, CLI, PowerShell and APIs."
   ],
   [
    "Distributed denial-of-service (DDoS)",
    "An attack that floods a service with traffic from many sources to make it unavailable."
   ],
   [
    "Azure Cloud Shell",
    "A browser-based shell with Azure CLI and Azure PowerShell already installed and signed in."
   ]
  ],
  "example": "A hospital group adopting Azure worries about consistency across dozens of teams. It uses Azure Policy to require encryption settings and approved regions, locks its production databases against deletion, and builds new environments only from approved templates. Administrators manage resources through the portal and scripted Azure CLI, while autoscale and alerts watch the patient portal. Auditors review Microsoft's published compliance reports for the platform and the hospital's own policy compliance dashboard.",
  "tip": "A feature acting on resources (autoscale, templates, monitoring, alerts) is management of the cloud. A way to access Azure (portal, CLI, PowerShell, Cloud Shell, APIs) is management in the cloud.",
  "check": [
   [
    "Is using Azure CLI to deploy a VM an example of management of the cloud or management in the cloud?",
    "Management in the cloud, because the CLI is a tool for interacting with and managing the environment."
   ],
   [
    "Is configuring autoscale for a web app management of the cloud or in the cloud?",
    "Management of the cloud, because it is a capability acting on the resources themselves."
   ],
   [
    "Which Azure service enforces rules such as allowed regions or required tags?",
    "Azure Policy, which audits or denies resources that do not comply."
   ],
   [
    "Name one way the cloud can improve security compared with on-premises.",
    "Microsoft handles physical security, DDoS protection and, in PaaS and SaaS, operating system patching, removing work and common vulnerabilities."
   ]
  ]
 },
 {
  "t": "Infrastructure as a service (IaaS): what you manage and typical use cases such as lift-and-shift",
  "body": [
   "Infrastructure as a service (IaaS) is the cloud service type that gives you the most control. The provider supplies the physical building blocks, the datacenter, physical servers, storage hardware and physical network, and you rent virtual versions of them. The best-known IaaS service in Azure is virtual machines (VMs), together with virtual networks, managed disks and load balancers. IaaS is the closest thing in the cloud to running your own server room, without owning the room.",
   "Under the shared responsibility model, IaaS leaves you with the most work among cloud service types. Microsoft keeps the hardware running, secures the physical datacenter and manages the hypervisor. You choose and manage the operating system, apply its updates, install and configure middleware and runtimes, deploy applications, configure network controls such as network security group rules, set up backups and protect your data and identities. You can install almost any software you like, just as on your own server, and you can sign in with Remote Desktop Protocol (RDP) or Secure Shell (SSH) as an administrator. Creating an IaaS VM shows what you are responsible for: you pick the image, the size, the disks, the network and the credentials.",
   "```bash\naz group create --name rg-iaas --location eastus\naz vm create --resource-group rg-iaas --name app01 --image Win2022Datacenter --size Standard_D2s_v5 --admin-username azureuser\naz vm open-port --resource-group rg-iaas --name app01 --port 3389\n```",
   "Everything after that command, from Windows updates to antivirus to the application install, is up to you. Opening port 3389 to the internet, as in the last line, is exactly the kind of network control decision that stays with the customer, and a real deployment would restrict it to known addresses or use Azure Bastion, which gives browser-based RDP and SSH access without exposing the port at all. It helps to compare IaaS with the next service type up. In PaaS you could not choose the Windows Server image, sign in as administrator or install a custom driver, but you also would not patch anything below your application. IaaS trades convenience for control, and that is the distinction the exam cares about. IaaS is also billed on a consumption basis: you pay for the VM while it is allocated, for its disks while they exist, and for outbound data, so shutting down and deallocating unused VMs is part of running IaaS well.",
   "The most common IaaS scenario is lift-and-shift migration, also called rehosting. An organization takes existing servers from its datacenter and recreates them as Azure VMs with minimal changes. This is fast, because the application does not need to be redesigned, and it lets the company close a datacenter or avoid replacing ageing hardware. Later, it may modernize parts of the application to use PaaS services. Other typical IaaS uses include testing and development, where teams create and delete environments quickly; applications that need a specific operating system version, configuration or legacy software that no PaaS service supports; workloads that need administrator-level control; and high-performance computing where you want fine control over the virtual hardware.",
   "Consider a worked example. A logistics company runs a route-planning application on Windows Server with a third-party component that must be installed with administrator rights and a specific registry setting. Its datacenter lease ends in six months. Rewriting the application for PaaS would take a year, so the team uses Azure Migrate to assess the servers and rehost them as Azure VMs. The cutover takes a weekend. Afterward, the team schedules OS patches with Azure Update Manager, configures Azure Backup and tightens network security group rules, because those remain its responsibilities in IaaS.",
   "Common mistakes: assuming Microsoft patches the guest OS of an IaaS VM; choosing IaaS for a new web app that has no special OS needs, when PaaS would remove most of the operational work; and forgetting that a running VM is billed even when idle. Another is treating lift-and-shift as the end state; it is often the first step before modernizing.",
   "Exam wording gives the answer away: 'maximum control', 'full control of the operating system', 'install custom software', 'legacy application' or 'migrate servers with no code changes' points to IaaS, usually Azure Virtual Machines. 'Developers only want to deploy code' points away from IaaS, toward PaaS. A question that asks who is responsible for the physical server hosting a VM expects the answer Microsoft, while one that asks who installs security updates inside the VM expects the customer."
  ],
  "terms": [
   [
    "Infrastructure as a service (IaaS)",
    "A service type where you rent virtual compute, storage and networking and manage the OS and everything above it."
   ],
   [
    "Virtual machine (VM)",
    "A software-based computer running an operating system on shared physical hardware."
   ],
   [
    "Lift-and-shift (rehost)",
    "Moving existing servers to cloud VMs with little or no change to the application."
   ],
   [
    "Image",
    "A template containing an operating system, and sometimes software, used to create a VM."
   ],
   [
    "VM size",
    "The combination of virtual CPUs, memory and other capacity allocated to a VM."
   ],
   [
    "Azure Migrate",
    "A service that discovers and assesses on-premises servers and helps move them to Azure."
   ]
  ],
  "example": "An engineering firm has an old document management system that only runs on a specific Windows Server version with a custom driver. Its hardware is failing. The firm creates matching Azure VMs, copies the servers over with Azure Migrate, and switches users across in a weekend. The firm's administrators continue to patch Windows, run antivirus and manage backups on the VMs, because in IaaS those tasks remain theirs.",
  "tip": "If a scenario stresses maximum control, a custom or legacy OS configuration, or moving servers without changing them, the answer is IaaS. In IaaS, patching the guest OS is always the customer's job.",
  "check": [
   [
    "Who manages the operating system on an Azure VM?",
    "The customer, because IaaS leaves the OS and everything above it to the customer."
   ],
   [
    "What is lift-and-shift migration, and which service type does it use?",
    "Moving existing servers to the cloud with minimal changes, which uses IaaS virtual machines."
   ],
   [
    "Why might a team choose PaaS over IaaS for a new web application?",
    "PaaS removes OS patching and server management, so the team can focus on code and spend less on operations."
   ],
   [
    "Give two customer responsibilities that remain in IaaS.",
    "Any two of: patching the guest OS, installing and updating applications, configuring network security rules, backups, and protecting data and identities."
   ]
  ]
 },
 {
  "t": "Platform as a service (PaaS) and serverless: what the provider manages and typical use cases",
  "body": [
   "Platform as a service (PaaS) is a middle ground between infrastructure as a service (IaaS) and software as a service (SaaS). The provider manages the physical infrastructure and also the operating system, middleware, runtime and development tools. You bring your application code and data, and configure how the service runs. You do not sign in to servers or install updates on them. The point of PaaS is to let developers spend their time on the application rather than on the machines underneath it.",
   "Examples of PaaS in Azure include Azure App Service for hosting web apps and application programming interfaces (APIs), Azure SQL Database for managed relational databases, and Azure Cosmos DB for globally distributed NoSQL data. With Azure SQL Database, for example, Microsoft handles the database engine upgrades, operating system patches, high availability and automated backups; you design tables, write queries, choose a performance tier and control who can connect. Deploying a web app to App Service looks like this:",
   "```bash\naz appservice plan create --resource-group rg-web --name plan-web --sku S1 --is-linux\naz webapp create --resource-group rg-web --plan plan-web --name contoso-orders-web --runtime \"NODE:20-lts\"\naz webapp deploy --resource-group rg-web --name contoso-orders-web --src-path app.zip\n```",
   "Under the shared responsibility model, PaaS moves the line up the stack. Microsoft is responsible for the OS and runtime, which removes patching work and reduces the attack surface you have to maintain. Responsibility for applications, network controls and identity infrastructure is often shared, because Microsoft provides the controls and you configure them, for example firewall rules on a SQL server or access restrictions on a web app. As always, you remain responsible for your data, devices and accounts. Typical PaaS use cases are building and deploying applications quickly, especially when developers want to concentrate on code. PaaS services usually include built-in scaling, load balancing, high availability options and deployment directly from source control. The trade-off is less control: you cannot pick every OS setting or install arbitrary software on the underlying machines.",
   "Serverless computing is often grouped with PaaS. With serverless, you do not manage servers at all, the platform scales automatically, including down to zero when nothing is happening, and on consumption-style plans you pay only when your code runs. Azure Functions runs small pieces of code in response to events, such as an HTTP request, a message on a queue, a new file in storage or a timer. Azure Logic Apps builds workflows that connect services with little or no code, using a visual designer and ready-made connectors. Servers still exist, but the provider handles them completely, and the application is designed around events rather than always-running processes. The distinction the exam draws is that PaaS such as App Service runs your app continuously on capacity you have chosen, while serverless runs code only when triggered and bills per execution.",
   "Consider a worked example. A small team is building an online booking system. The customer-facing site runs all day and needs custom domains, deployment slots for testing and steady performance, so they host it on App Service. Bookings are stored in Azure SQL Database, which spares them from managing a database server. Each time a booking is saved, a message goes onto a queue, and an Azure Function picks it up and sends the confirmation email. The function runs only when a booking arrives, so at night it costs almost nothing. A Logic App posts a daily summary to the team's chat channel without any code.",
   "Common mistakes: believing PaaS means the customer has no security responsibilities (you still configure access, protect data and manage identities); thinking 'serverless' means there are literally no servers; choosing Functions for a long-running web application that needs to be always on; and forgetting that PaaS limits control, so an application needing a custom OS component may have to stay on IaaS. Another trap is treating Logic Apps and Functions as the same: Logic Apps is a designer-first workflow tool, and Functions is code-first.",
   "Exam questions use clear clue words. 'Developers want to focus on code', 'no need to manage the operating system', 'managed database' or 'host a web app without managing servers' points to PaaS, often App Service or Azure SQL Database. 'Run code in response to an event', 'pay only when the code executes' or 'scale automatically to zero' points to serverless, usually Azure Functions. 'Automate a workflow between services with little or no code' points to Logic Apps. If the scenario needs full OS control, it is not PaaS."
  ],
  "terms": [
   [
    "Platform as a service (PaaS)",
    "A service type where the provider manages the infrastructure, OS and runtime, and you manage your application and data."
   ],
   [
    "Azure App Service",
    "A PaaS service for hosting web apps, REST APIs and mobile back ends without managing servers."
   ],
   [
    "Azure SQL Database",
    "A fully managed relational database service where Microsoft handles patching, backups and high availability."
   ],
   [
    "Serverless computing",
    "A model where the provider fully manages servers, scales automatically and bills only for execution."
   ],
   [
    "Azure Functions",
    "Event-driven serverless compute that runs code in response to triggers such as HTTP requests, queue messages or timers."
   ],
   [
    "Azure Logic Apps",
    "A low-code service for building automated workflows that connect apps and services."
   ],
   [
    "Trigger",
    "The event that causes a serverless function or workflow to run."
   ]
  ],
  "example": "A news startup's developers want to release features daily without worrying about servers. They host the site on App Service with deployment from their source control, store articles in Azure Cosmos DB, and use an Azure Function triggered by new image uploads to create thumbnails. Microsoft patches the operating systems and runtimes underneath, while the team manages code, access settings and data.",
  "tip": "If developers want to focus on code and not manage the OS, choose PaaS. If code should run only when an event happens and be billed per execution, think serverless, usually Azure Functions; low-code workflows point to Logic Apps.",
  "check": [
   [
    "In PaaS, who patches the operating system that runs your web app?",
    "Microsoft, because in PaaS the provider manages the OS and runtime."
   ],
   [
    "Which Azure service runs small pieces of code in response to events and bills per execution?",
    "Azure Functions, a serverless compute service."
   ],
   [
    "Name one thing the customer is still responsible for in PaaS.",
    "Their application code, their data, and managing accounts and access; configuring network and identity controls is shared."
   ],
   [
    "Why might a team choose App Service instead of Azure Functions for a public website?",
    "The website runs continuously and needs web-hosting features such as custom domains and deployment slots, which suits App Service better than event-triggered functions."
   ]
  ]
 },
 {
  "t": "Software as a service (SaaS) and choosing between IaaS, PaaS and SaaS for a scenario",
  "body": [
   "Software as a service (SaaS) is a complete application that the provider runs and delivers over the internet, usually for a subscription fee per user. Familiar examples are Microsoft 365 for email and office apps, Microsoft Teams, Dynamics 365 for customer relationship management (CRM) and business processes, and many third-party products used through a browser. You use the software through a web browser or a client app; you do not deploy servers, write the application or manage its platform.",
   "SaaS is the service type with the least customer responsibility. The provider manages the infrastructure, operating system, runtime and the application itself, including updates and new features. You still manage what never leaves the customer: your data, the devices that connect, and user accounts and identities. That includes configuring settings such as who can share files outside the organization, how long data is retained and whether multifactor authentication is required. Many SaaS data losses come not from the provider but from customer settings, such as a document library shared with 'anyone with the link'.",
   "The benefit of SaaS is speed and simplicity: you can start using a mature application almost immediately, with predictable per-user pricing, automatic updates and no maintenance. The trade-off is the least control. You can configure the application within the options it offers, but you cannot change how it is built, choose its operating system, or decide exactly when updates arrive beyond what the provider allows.",
   "Choosing between the three types is a common exam scenario. Work through two questions: how much control does the scenario need, and who should do the operational work? If you need full control over the operating system, must install custom or legacy software, or must move existing servers as they are, choose infrastructure as a service (IaaS). If developers want to build and deploy their own application without managing servers or patching, choose platform as a service (PaaS). If the business simply needs a finished application such as email, a CRM or file sharing, and has no reason to build its own, choose SaaS.",
   "It helps to line the three up by responsibility. In IaaS you manage the OS, runtime, applications and data, and Microsoft manages the physical layers. In PaaS you manage applications and data, and Microsoft also runs the OS and runtime. In SaaS you manage your data, devices, accounts and settings, and Microsoft runs everything else. Moving from IaaS to SaaS, flexibility decreases, and so does the amount of work and the specialist skill you need in-house. None of them is best in general; each fits a different need.",
   "Consider a worked example. A company has three requests on the same day. First, the sales team wants a CRM system next month; building one would take a year, so the answer is a SaaS product such as Dynamics 365. Second, developers want to launch a new customer portal written in .NET and do not want to patch servers, so the answer is PaaS on App Service with Azure SQL Database. Third, the finance team runs a 15-year-old accounting package that needs a particular Windows Server version and a hardware dongle emulator installed as administrator, and the datacenter is closing; the answer is IaaS, rehosting it on Azure VMs. The same company now uses all three types, each with a different shared responsibility split.",
   "Common mistakes: thinking SaaS means the customer has no security duties; picking IaaS 'to be safe' when a PaaS or SaaS option meets the need with far less work; and assuming the choice is all or nothing. Organizations often use all three at once, and security teams need to know which type each workload uses, because the split of responsibility is different for each. A final trap is confusing the service type with the deployment model: SaaS, PaaS and IaaS describe what you rent, while public, private and hybrid describe where it runs and who shares it.",
   "Exam questions often describe a need and list services. 'Ready-to-use application', 'subscription per user', 'no development or infrastructure management' points to SaaS. 'Developers deploy their own code without managing servers' points to PaaS. 'Full control over the OS', 'custom software' or 'lift-and-shift' points to IaaS. A question asking which model requires the most customer management expects IaaS, and the least expects SaaS. Data and identities are the customer's in all three."
  ],
  "terms": [
   [
    "Software as a service (SaaS)",
    "A complete application run by the provider and used over the internet, usually by subscription."
   ],
   [
    "Microsoft 365",
    "Microsoft's SaaS suite of email, office apps, file storage and collaboration tools."
   ],
   [
    "Customer relationship management (CRM)",
    "Software for managing interactions with customers and sales prospects."
   ],
   [
    "Per-user licensing",
    "A pricing model where you pay a recurring fee for each person who uses the application."
   ],
   [
    "Service type",
    "The category of cloud service, IaaS, PaaS or SaaS, which determines how responsibility is shared."
   ],
   [
    "Configuration responsibility",
    "The customer's duty to set a SaaS application's options, such as sharing and sign-in rules, securely."
   ]
  ],
  "example": "A law firm needs email, calendars and document collaboration for 80 staff and has no IT developers. It subscribes to Microsoft 365, pays per user each month and is productive within days. Microsoft runs and updates the service. The firm's IT contractor still configures multifactor authentication, blocks external sharing of client folders and removes accounts when staff leave, because accounts, devices and data remain the firm's responsibility in SaaS.",
  "tip": "Match the scenario to the control needed: full OS control or lift-and-shift is IaaS, build-your-own-app without managing servers is PaaS, ready-to-use application is SaaS. Data, devices and identities are the customer's in all three.",
  "check": [
   [
    "A company wants email for its staff without deploying or maintaining anything. Which service type fits?",
    "SaaS, such as Microsoft 365, because the provider runs the whole application."
   ],
   [
    "Which service type requires the most management by the customer?",
    "IaaS, because the customer manages the OS, runtime, applications and data."
   ],
   [
    "In SaaS, who is responsible for deciding whether files can be shared outside the organization?",
    "The customer, because configuring the application and protecting its data and accounts stay with the customer."
   ],
   [
    "Developers want to deploy a custom web API without patching servers. Which service type fits?",
    "PaaS, for example Azure App Service, because it runs their code while Microsoft manages the OS and runtime."
   ]
  ]
 },
 {
  "t": "Azure regions, region pairs and sovereign regions (Azure Government, Azure operated by 21Vianet in China)",
  "body": [
   "An Azure region is a geographical area that contains at least one, and usually several, Azure datacenters connected by a low-latency network. When you create most resources, you choose a region, such as East US or West Europe. The region decides where your resource physically runs and where its data is stored, which affects latency for your users, which services and VM sizes are available, the price, and whether you meet data-residency requirements. In Azure CLI the region is the `--location` parameter, and `az account list-locations --output table` lists the regions available to your subscription.",
   "Not every service or feature is offered in every region, and prices can differ between regions. Some services are global and do not ask you to pick a region at all, such as Microsoft Entra ID, Azure Front Door and Azure DNS. Regions are grouped into geographies, which are markets such as the United States or Europe that share data-residency and compliance boundaries. Choosing a region inside the right geography is how many organizations keep customer data within a country or economic area.",
   "Many Azure regions are paired with another region in the same geography, typically hundreds of kilometres apart, so that a regional disaster such as a flood or major power failure is unlikely to affect both. Region pairs bring several benefits. If there is a broad outage affecting multiple regions, Microsoft prioritizes recovering one region of each pair. Planned platform updates are rolled out to one region of a pair at a time, reducing the chance that both are affected by a bad update. Data generally stays within the same geography as its pair, which helps with residency rules. And some services, such as geo-redundant storage (GRS), replicate data to the paired region automatically. Most pairs are two-way, but a few are one-way, and some newer regions have no pair and rely on availability zones and your own choice of a second region for resilience.",
   "Sovereign regions are instances of Azure that are physically and logically isolated from the main public Azure cloud for legal or compliance reasons. Azure Government serves US government agencies at federal, state and local level, and their partners, with datacenters operated by screened US personnel and additional compliance certifications. Azure in China is operated by 21Vianet, a separate Chinese company, rather than directly by Microsoft; Microsoft does not operate the datacenters there, which lets the service comply with Chinese regulations. Sovereign clouds have their own portals, endpoints and sign-in, and not every public Azure service is available in them. In Azure CLI you switch between them with commands such as `az cloud set --name AzureUSGovernment` or `az cloud set --name AzureChinaCloud`.",
   "When choosing a region, weigh four things: closeness to users for low latency, availability of the services and sizes you need, cost, and compliance or data-residency rules. For resilience, design across availability zones within one region to survive a datacenter failure, and across two regions, often a pair, to survive a regional disaster.",
   "Consider a worked example. A German online retailer must keep customer data in Germany, and most of its customers are in Germany. It deploys its production environment to Germany West Central, spreading VMs across availability zones there. For disaster recovery it replicates data to Germany North, the paired region in the same geography, using geo-redundant storage and Azure Site Recovery. When Microsoft rolls out a platform update, it reaches one region before the other, so the retailer's standby copy is not updated at the same moment as production.",
   "Common mistakes: thinking every region offers every service; confusing a region (a geographic area of datacenters) with an availability zone (a separate location inside a region); assuming Microsoft runs Azure in China; and assuming Azure Government is open to any company that wants extra security. A general commercial customer cannot simply sign up for Azure Government; it is for government bodies and eligible partners.",
   "Exam questions often give a requirement and ask for the feature. 'Keep a copy of data in another region for disaster recovery' or 'staggered updates' points to region pairs. 'US federal agency with compliance needs' points to Azure Government. 'Operated by 21Vianet' identifies Azure in China. 'Reduce latency for users in Asia' points to deploying in a region near them. 'Survive a datacenter failure within a region' is a zone question, not a region-pair question."
  ],
  "terms": [
   [
    "Region",
    "A geographical area containing one or more Azure datacenters connected by a low-latency network."
   ],
   [
    "Geography",
    "A market, such as Europe or the United States, containing regions that share data-residency and compliance boundaries."
   ],
   [
    "Region pair",
    "Two regions in the same geography linked for disaster recovery, prioritized recovery and staggered updates."
   ],
   [
    "Sovereign region",
    "An Azure instance isolated from public Azure for legal or compliance reasons."
   ],
   [
    "Azure Government",
    "A sovereign cloud for US government agencies and their partners, run by screened US personnel."
   ],
   [
    "Azure operated by 21Vianet",
    "Azure in China, operated by a separate local company rather than directly by Microsoft."
   ],
   [
    "Geo-redundant storage (GRS)",
    "A storage option that replicates data to the paired region for protection against regional outages."
   ]
  ],
  "example": "A European insurer chooses West Europe as its main region because its customers are there and data must stay in the EU. It uses geo-redundant storage so policy documents are copied to North Europe, the paired region. Later, when it opens a US subsidiary that works on government contracts, the subsidiary's regulated workloads go to Azure Government, which has its own portal and endpoints separate from the insurer's main Azure tenant.",
  "tip": "Region pairs help with disaster recovery, prioritized recovery and staggered updates; availability zones help within one region. Azure in China is operated by 21Vianet, not Microsoft, and Azure Government is for US government use.",
  "check": [
   [
    "Give two benefits of region pairs.",
    "Any two of: one region in each pair is prioritized for recovery in a broad outage, platform updates roll out to one region at a time, and services such as GRS replicate data to the pair within the same geography."
   ],
   [
    "Who operates Azure in China?",
    "21Vianet, a separate company, rather than Microsoft directly."
   ],
   [
    "Name three factors to consider when choosing a region.",
    "Any three of: latency to users, service and feature availability, price, and compliance or data-residency requirements."
   ],
   [
    "Why can a sovereign cloud not simply be used by any business?",
    "Sovereign clouds such as Azure Government are isolated for specific legal or compliance needs and are limited to eligible customers such as government agencies and their partners."
   ]
  ]
 },
 {
  "t": "Availability zones and datacenters: zonal vs zone-redundant services",
  "body": [
   "Azure's physical foundation is the datacenter: a building full of servers, storage and networking equipment with its own power, cooling and physical security. You never choose an individual datacenter when you deploy a resource. Instead, Azure groups datacenters into availability zones, and zones into regions. Understanding that hierarchy, datacenter inside zone inside region, is the key to answering resilience questions on the Microsoft Azure Fundamentals exam (AZ-900). An availability zone is a physically separate location within an Azure region, made up of one or more datacenters with independent power, cooling and networking. Zones are far enough apart that a local failure, such as a fire, flood or power failure in one building, should not affect the others, yet close enough to be connected by a high-speed, low-latency private network, so data can be replicated between them quickly. Regions that support availability zones have a minimum of three zones. Not every region supports zones, and not every service supports them, so check before you design around them.",
   "Availability zones are the main way to protect an application from a datacenter-level failure inside one region. If you run copies of your application in each of three zones behind a zone-redundant load balancer, the loss of one zone leaves the other two serving users. Using zones can increase cost, for example because you run more instances and may pay for data transferred between zones, but it improves resilience and usually earns a higher service-level agreement (SLA) than a single-zone design.",
   "Azure services that support availability zones fall into two categories. Zonal services are pinned to a specific zone that you choose, for example a virtual machine, a managed disk or a public IP address deployed to zone 1. The platform does not move them if that zone fails, so to make a zonal design resilient you deploy several resources in different zones yourself. Zone-redundant services are replicated or spread across zones automatically by the platform, such as zone-redundant storage (ZRS), a zone-redundant SQL database or a zone-redundant load balancer; if one zone fails, the service keeps running without you doing anything. Here is the difference in commands:",
   "```bash\n# Zonal: you pick the zone, one VM per command\naz vm create --resource-group rg-app --name web1 --image Ubuntu2204 --zone 1\naz vm create --resource-group rg-app --name web2 --image Ubuntu2204 --zone 2\n# Zone-redundant: the platform spreads the copies\naz storage account create --resource-group rg-app --name contosozrs01 --sku Standard_ZRS\n```",
   "There are also non-regional or always-available services, which are resilient to both zone and region outages because they run globally, such as Microsoft Entra ID, Azure DNS and Azure Front Door. On the exam, remember the layers of protection: availability sets protect against rack-level hardware failure inside a datacenter, availability zones protect against the loss of a datacenter within a region, and region pairs or multi-region designs protect against the loss of a whole region.",
   "Consider a worked example. A payment gateway runs in a zone-enabled region. The team deploys web VMs as a scale set spread across zones 1, 2 and 3, uses a zone-redundant load balancer, stores files in ZRS storage and uses a zone-redundant Azure SQL Database. During a cooling failure, zone 2 goes offline. The load balancer stops sending traffic to the zone 2 VMs, the storage and database keep serving from the remaining zones, and customers notice nothing. Because every layer was zone-aware, no single datacenter was a single point of failure.",
   "Common mistakes: thinking a single VM placed in zone 2 is protected against a zone failure (it is zonal, so it goes down with its zone); assuming every region has zones; believing zones protect against a whole-region disaster; and confusing locally redundant storage (LRS), which keeps copies in one datacenter, with ZRS, which spreads them across zones. It is also easy to forget that zone-redundancy has to exist at every layer: a zone-redundant web tier still fails if the single database behind it is zonal.",
   "Exam questions give clear clues, and it helps to read the verbs carefully: 'you choose the zone' or 'pinned to a zone' means zonal; 'replicated automatically across zones' means zone-redundant; 'protect against a datacenter failure' means availability zones; 'protect against a regional outage' means a second region. If a question lists storage options, LRS stays in one datacenter, ZRS spans zones, and GRS reaches the paired region."
  ],
  "terms": [
   [
    "Datacenter",
    "A physical facility of servers, storage and networking with its own power, cooling and security."
   ],
   [
    "Availability zone",
    "A physically separate location within a region, with independent power, cooling and networking."
   ],
   [
    "Zonal service",
    "A resource pinned to a single zone that you choose, such as a VM in zone 1."
   ],
   [
    "Zone-redundant service",
    "A service the platform replicates across zones automatically, such as ZRS storage."
   ],
   [
    "Zone-redundant storage (ZRS)",
    "A storage redundancy option that keeps copies of data in three zones in the region."
   ],
   [
    "Non-regional service",
    "A global service, such as Microsoft Entra ID, that is not tied to a single region."
   ]
  ],
  "example": "A ticketing company learns that its database VM in zone 1 went offline during a zone outage, taking the site down, even though its web servers in zones 1, 2 and 3 were fine. The review explains that the database VM was zonal and had no copy elsewhere. The team moves to a zone-redundant Azure SQL Database and ZRS storage so the platform keeps data available across all three zones.",
  "tip": "A VM placed in 'zone 2' is zonal; ZRS storage is zone-redundant. Zone-enabled regions have at least three zones. Zones protect against datacenter failures, not whole-region failures.",
  "check": [
   [
    "What is the minimum number of availability zones in a zone-enabled region?",
    "Three, so the loss of one zone still leaves at least two."
   ],
   [
    "Is a VM deployed to a specific zone zonal or zone-redundant?",
    "Zonal, because it is pinned to the zone you chose and will not move if that zone fails."
   ],
   [
    "What does an availability zone protect against that a single datacenter design does not?",
    "The failure of an entire datacenter, such as a power or cooling outage in one building."
   ],
   [
    "A company needs protection against a regional disaster. Are availability zones enough?",
    "No, zones are all inside one region; protecting against a regional disaster needs a second region, for example the paired region."
   ]
  ]
 },
 {
  "t": "Azure resources, resource groups, subscriptions and management groups: the hierarchy and what each is for",
  "body": [
   "Azure organizes everything you create into a four-level hierarchy: management groups, subscriptions, resource groups and resources. Knowing what each level is for, and how settings flow from top to bottom, is one of the most tested areas of the Microsoft Azure Fundamentals exam (AZ-900). At the bottom are resources: individual things you create and pay for, such as a virtual machine, a virtual network, a storage account or a database. Every resource is created and managed through Azure Resource Manager (ARM), the deployment and management layer behind the portal, the command line and templates. Every resource must belong to exactly one resource group. A resource group is a logical container for resources that share a lifecycle, such as all the parts of one application or one environment. Resource groups cannot be nested. Deleting a resource group deletes every resource inside it, which makes them handy for labs and temporary environments. You can apply role-based access control (RBAC) permissions, policies, locks and tags to a resource group, and resources inside inherit the permissions and policies. A resource group has a location that stores its metadata, but it can contain resources in other regions. Most resources can be moved between resource groups and subscriptions.",
   "Resource groups live inside a subscription. A subscription is a unit of management, billing and scale, and it trusts one Microsoft Entra tenant for identities. It is a billing boundary, because each subscription gets its own invoice and cost reports, and an access-control boundary, because permissions can be assigned per subscription. Organizations create several subscriptions to separate environments such as production and development, to separate departments or projects for billing, to isolate workloads with different compliance needs, or to work within per-subscription limits. One account can own or access several subscriptions.",
   "Management groups sit above subscriptions. They let you group subscriptions and apply governance, such as Azure Policy and RBAC assignments, to all of them at once. Management groups can be nested to reflect your organization, for example Corp, then Production and Non-production beneath it, and every directory has a single root management group at the top. A subscription can be in only one management group at a time, and a management group has only one parent.",
   "```bash\naz account management-group create --name corp-prod --parent corp\naz account management-group subscription add --name corp-prod --subscription \"Prod-Sales\"\naz group create --name rg-sales-web --location westeurope --subscription \"Prod-Sales\"\n```",
   "The key idea is inheritance. A policy or role assigned at a management group flows down to every subscription, resource group and resource beneath it. For example, a policy at the root that allows only European regions applies everywhere, and granting a team the Reader role at a subscription lets it read every resource group in that subscription. Place governance as high as it makes sense, and keep exceptions lower down. Tags are the exception to automatic inheritance: a tag on a resource group is not copied to its resources unless you use a policy to do so.",
   "Consider a worked example. A company has Finance and Sales departments, each with production and development work. It creates a root-level policy restricting regions, a Production management group with stricter policies such as required backups, and a Non-production group with looser ones. Each department gets a production and a development subscription placed under the right group, so bills are separated per department and environment. Inside Sales-Prod, the web app, its database and its storage sit in one resource group, `rg-sales-web`, because they are deployed and deleted together. When the web app is retired, deleting that group removes everything at once.",
   "Common mistakes: thinking resource groups can be nested; believing a resource can sit in two resource groups; assuming a resource group's region limits where its resources can be; and mixing up the billing boundary (subscription) with the grouping-for-governance level (management group). Another is expecting tags to flow down automatically, as policies and roles do.",
   "Exam questions test the order and the purpose of each level. 'Apply a policy to many subscriptions at once' is a management group. 'Separate billing for departments' is separate subscriptions. 'Delete all resources of an application together' is a resource group. 'Give a team access to everything in one environment' is often an RBAC assignment at the subscription or resource group level. 'Isolate a workload with different compliance rules' can mean a separate subscription. From top to bottom the order is management groups, subscriptions, resource groups, resources."
  ],
  "terms": [
   [
    "Resource",
    "A single manageable item in Azure, such as a VM, storage account or virtual network."
   ],
   [
    "Resource group",
    "A logical container for resources that share a lifecycle; it cannot be nested."
   ],
   [
    "Subscription",
    "A unit of billing, access control and scale that contains resource groups and trusts one Entra tenant."
   ],
   [
    "Management group",
    "A container above subscriptions used to apply policy and access to many subscriptions at once; it can be nested."
   ],
   [
    "Root management group",
    "The single top-level management group in a directory, above all other management groups and subscriptions."
   ],
   [
    "Inheritance",
    "The flow of policies and role assignments from a higher level of the hierarchy to everything below it."
   ],
   [
    "Azure Resource Manager (ARM)",
    "The deployment and management service through which all Azure resources are created and managed."
   ]
  ],
  "example": "A university IT team gives each faculty its own subscription so each faculty receives a separate bill. All faculty subscriptions sit under a Faculties management group with a policy that allows only approved VM sizes and regions. Within the Physics subscription, each research project gets its own resource group, and when a grant ends, the team deletes that project's resource group to remove all its resources and stop the charges.",
  "tip": "Order from top to bottom: management groups, subscriptions, resource groups, resources. Resource groups cannot be nested; management groups can. A resource belongs to exactly one resource group; policies and RBAC inherit downward.",
  "check": [
   [
    "What happens to resources when you delete their resource group?",
    "They are all deleted, because the resource group is their container and lifecycle boundary."
   ],
   [
    "Which level would you use to apply one policy to 20 subscriptions?",
    "A management group containing those subscriptions, because policies assigned there are inherited by all of them."
   ],
   [
    "Which level acts as the main billing boundary?",
    "The subscription, because each subscription is invoiced and reported separately."
   ],
   [
    "Can a resource group in West Europe contain a VM in East US?",
    "Yes, the resource group's location only stores its metadata; its resources can be in other regions."
   ]
  ]
 },
 {
  "t": "Compute: virtual machines, VM scale sets, availability sets and Azure Virtual Desktop",
  "body": [
   "Azure virtual machines (VMs) are the infrastructure as a service (IaaS) compute option. A VM is a virtualized computer that runs Windows or Linux on Microsoft's hardware. You pick an image (the operating system, sometimes with software preinstalled), a size (the number of virtual CPUs and amount of memory), disks and networking. You have full control of the OS, so VMs suit lift-and-shift migrations, custom software, and test and development. You also handle patching and configuration. A running VM is billed for compute even when idle; stopping and deallocating it releases the hardware and stops compute charges, though its disks are still billed. The Microsoft Azure Fundamentals exam (AZ-900) expects you to know VMs and three related services: scale sets, availability sets and Azure Virtual Desktop.",
   "Virtual machine scale sets let you create and manage a group of identical, load-balanced VMs. Instead of building each VM by hand, you define the configuration once, and the scale set creates the instances. Scale sets support autoscale, adding VMs when demand grows and removing them when it falls, and can spread instances across availability zones. Updates can be rolled out across the instances in batches. They are used for large, stateless workloads such as web front ends, batch processing and big compute jobs. Creating one is a single command:",
   "```bash\naz vmss create --resource-group rg-web --name web-vmss --image Ubuntu2204 --instance-count 3 --zones 1 2 3 --admin-username azureuser --generate-ssh-keys\n```",
   "Availability sets are an older way to keep a group of VMs available within a single datacenter. You place two or more VMs that do the same job in an availability set, and Azure spreads them across fault domains and update domains. A fault domain is a group of hardware that shares a power source and network switch, like a rack, so a hardware failure affects only the VMs in that fault domain. An update domain is a group of VMs that Azure may reboot at the same time during planned maintenance, so not all your VMs restart together. Availability sets cost nothing extra; you pay only for the VMs. They protect against rack and maintenance failures; availability zones protect against a larger failure, the loss of a whole datacenter, and for new designs zones are generally preferred where the region supports them.",
   "Azure Virtual Desktop is a desktop and application virtualization service. Users connect from almost any device, Windows, macOS, iOS, Android or a web browser, to a full Windows desktop or to individual apps that run in Azure. Because the desktop runs in the cloud, company data does not have to be stored on the user's device, and access can be protected with Microsoft Entra ID and multifactor authentication. Azure Virtual Desktop supports Windows multi-session editions, where several users share one VM, which lowers cost compared with one VM per person. It fits remote and hybrid workers, contractors, call centres and staff who need a secure desktop from personal devices.",
   "Consider a worked example. A retailer needs four things. Its point-of-sale reporting server runs custom Windows software, so it goes on a standard VM. Its online shop has sharp daily peaks, so the web tier runs in a scale set across three zones with autoscale. A pair of legacy application servers must stay in one datacenter for licensing reasons, so they share an availability set, ensuring a rack failure or maintenance reboot never takes both down. Finally, seasonal staff hired for the holidays use their own laptops, so the retailer gives them Azure Virtual Desktop, and when a contract ends, their access is removed without any company data left on the laptop.",
   "Common mistakes: thinking a scale set and an availability set are the same thing; assuming availability sets protect against a datacenter outage; believing that shutting down a VM from inside the OS stops compute billing (only deallocating does); and treating Azure Virtual Desktop as a way to host web servers rather than user desktops. Another trap is forgetting that scale sets need an application that can run as many identical copies.",
   "Exam wording points to the right answer. 'Group of identical VMs that scales automatically' is a VM scale set. 'Protect VMs from a rack or hardware failure and planned maintenance within a datacenter' is an availability set, using fault and update domains. 'Protect against a datacenter failure' is availability zones. 'Give users a secure Windows desktop from any device' or 'multi-session Windows' is Azure Virtual Desktop. 'Full control of the operating system' is a VM."
  ],
  "terms": [
   [
    "Virtual machine (VM)",
    "An IaaS compute resource that runs a full Windows or Linux operating system you manage."
   ],
   [
    "Virtual machine scale set",
    "A set of identical, load-balanced VMs that can scale automatically and span zones."
   ],
   [
    "Availability set",
    "A grouping of VMs spread across fault and update domains to survive hardware failures and maintenance in one datacenter."
   ],
   [
    "Fault domain",
    "A group of hardware sharing power and network, so a single hardware failure affects only that group."
   ],
   [
    "Update domain",
    "A group of VMs that may be rebooted together during planned maintenance."
   ],
   [
    "Azure Virtual Desktop",
    "A service that delivers Windows desktops and apps running in Azure to users on almost any device."
   ],
   [
    "Multi-session",
    "A Windows edition that lets several users share one VM in Azure Virtual Desktop."
   ]
  ],
  "example": "An accounting firm hires 40 temporary staff for tax season who work from their own laptops. Rather than buying and securing 40 company laptops, it deploys Azure Virtual Desktop with a Windows multi-session host pool. Staff sign in with multifactor authentication and get a full desktop with the firm's accounting software, while client files stay in Azure and never land on personal devices. After the season, the firm removes their access and scales the host pool down.",
  "tip": "Scale sets are about many identical VMs and autoscale; availability sets spread VMs across fault and update domains inside one datacenter; zones protect against a datacenter loss; Azure Virtual Desktop delivers desktops to users.",
  "check": [
   [
    "What is the difference between a fault domain and an update domain?",
    "A fault domain groups hardware that shares power and network, protecting against hardware failure; an update domain groups VMs rebooted together during planned maintenance."
   ],
   [
    "Which service would you use to run many identical web VMs that scale automatically?",
    "A virtual machine scale set, which creates identical load-balanced instances and supports autoscale."
   ],
   [
    "Does a stopped (not deallocated) VM still incur compute charges?",
    "Yes, compute billing stops only when the VM is deallocated; disks are billed in either case."
   ],
   [
    "Why is Azure Virtual Desktop a good fit for contractors using personal devices?",
    "The desktop and data stay in Azure, so nothing sensitive is stored on the device, and access can be removed centrally."
   ]
  ]
 },
 {
  "t": "Containers and serverless compute: Container Instances, Container Apps, AKS, Azure Functions and App Service",
  "body": [
   "A container packages an application together with everything it needs to run, such as libraries, runtime and settings, but shares the host's operating system kernel instead of including a whole operating system. Containers are therefore smaller and start faster than virtual machines (VMs), and the same container image runs the same way on a laptop and in Azure. Docker is the best-known container format and engine, and images are usually stored in a registry such as Azure Container Registry. Where a VM virtualizes the hardware, a container virtualizes the operating system. Azure offers several ways to run containers, from simplest to most controllable, plus serverless and web-hosting options, and the Microsoft Azure Fundamentals exam (AZ-900) asks you to pick the right one for a scenario.",
   "Azure Container Instances (ACI) is the fastest and simplest way to run a container in Azure. You give it an image and it runs it, with no VMs or orchestration to manage, and you are billed while the container runs. It suits simple applications, task automation, build jobs and short-lived batch work. It does not provide the rich scaling, service discovery and rolling upgrades of an orchestrator.",
   "```bash\naz container create --resource-group rg-demo --name hello --image mcr.microsoft.com/azuredocs/aci-helloworld --ports 80 --ip-address Public\n```",
   "Azure Container Apps is a serverless platform for running containerized applications and microservices. It builds on Kubernetes but hides it from you, adding features such as automatic scaling based on HTTP traffic or events (including scaling to zero), traffic splitting between revisions, and managed HTTPS ingress. It is a good middle ground when you want more than single containers but do not want to operate Kubernetes. Azure Kubernetes Service (AKS) is a managed Kubernetes service. Kubernetes is an open-source orchestrator that deploys, scales and heals large numbers of containers across a cluster of machines. In AKS, Azure manages the Kubernetes control plane, and you manage the worker nodes, their upgrades and your workloads. AKS gives the most control and suits complex microservice applications and teams that already know Kubernetes.",
   "Azure Functions is event-driven serverless compute. You write a small function, choose a trigger, such as an HTTP request, a message on a queue, a new blob in storage or a timer, and Azure runs it when the event happens. On consumption-based hosting it scales automatically and you pay only for executions and the resources they use; other plans keep instances warm for faster starts or run on dedicated capacity. Functions are usually stateless, but Durable Functions add state for longer workflows. Azure App Service is a platform as a service (PaaS) offering for hosting web apps, REST APIs and mobile back ends in many languages, on Windows or Linux, and it can also run containers. It includes built-in load balancing, autoscale, deployment slots for testing a release before swapping it into production, custom domains and integration with source control. Choose App Service for long-running web applications, and Functions for short pieces of code reacting to events.",
   "Consider a worked example. A media company has four needs. A nightly script that converts files, packaged as a container, runs for twenty minutes and stops: Azure Container Instances. Its public website, built in Node.js by a small team that wants no servers to manage: App Service. A new set of containerized microservices that must scale to zero overnight, but the team has no Kubernetes experts: Container Apps. A resize step that should run every time a photo is uploaded to storage and cost nothing when idle: Azure Functions with a blob trigger. A separate platform team with deep Kubernetes skills later moves a large, complex service mesh onto AKS because it needs control over node pools and networking.",
   "Common mistakes: thinking containers include a full operating system like VMs; choosing AKS for a single simple container, which adds needless complexity; assuming AKS means Microsoft manages everything (you still manage node pools and workloads); and choosing Functions for an always-on website. Another trap is forgetting that App Service can run containers too, so 'container' in a question does not automatically mean ACI or AKS.",
   "Exam questions use clue words. 'Run a single container quickly with no orchestration' is Azure Container Instances. 'Orchestrate many containers', 'Kubernetes' or 'full control over the cluster' is AKS. 'Serverless containers' or 'microservices without managing Kubernetes' is Azure Container Apps. 'Run code when an event occurs, billed per execution' is Azure Functions. 'Host a web app or API without managing servers', 'deployment slots' is App Service. 'Lightweight, fast to start, shares the host kernel' describes containers compared with VMs."
  ],
  "terms": [
   [
    "Container",
    "A lightweight package of an application and its dependencies that shares the host OS kernel."
   ],
   [
    "Azure Container Instances (ACI)",
    "The simplest way to run a single container in Azure, with no VMs or orchestrator to manage."
   ],
   [
    "Azure Container Apps",
    "A serverless platform for containerized apps and microservices that hides Kubernetes and can scale to zero."
   ],
   [
    "Azure Kubernetes Service (AKS)",
    "A managed Kubernetes service where Azure runs the control plane and you manage nodes and workloads."
   ],
   [
    "Orchestration",
    "Automated deployment, scaling, networking and healing of many containers across a cluster."
   ],
   [
    "Azure Functions",
    "Event-driven serverless compute that runs code on triggers and bills per execution on consumption plans."
   ],
   [
    "Deployment slot",
    "A separate staging instance of an App Service app that can be swapped into production."
   ]
  ],
  "example": "A logistics company packages its route optimizer as a container. The data team runs one-off experiments in Azure Container Instances; the production system, made of a dozen microservices managed by an experienced platform team, runs on AKS. The customer tracking website runs on App Service with a staging slot, and an Azure Function triggered by queue messages sends delivery notifications, costing almost nothing when no parcels move.",
  "tip": "Single container, simplest: ACI. Microservices without managing Kubernetes: Container Apps. Orchestrating many containers with full control: AKS. Code on events billed per execution: Functions. Web app hosting without managing servers: App Service.",
  "check": [
   [
    "Why do containers start faster than VMs?",
    "They share the host OS kernel instead of booting a full operating system, so they are smaller and lighter."
   ],
   [
    "Which service should you use to run a single container quickly without managing servers or an orchestrator?",
    "Azure Container Instances, the simplest container option in Azure."
   ],
   [
    "In AKS, what does Azure manage and what do you manage?",
    "Azure manages the Kubernetes control plane; you manage the worker nodes and your workloads."
   ],
   [
    "A function should run each time a file is uploaded to storage. Which service fits?",
    "Azure Functions with a blob trigger, which runs the code on each upload and bills per execution on a consumption plan."
   ]
  ]
 },
 {
  "t": "Virtual networks, subnets, peering, Azure DNS, and public vs private endpoints",
  "body": [
   "An Azure virtual network (VNet) is your own private network in Azure. It lets Azure resources such as VMs communicate with each other, with the internet, and with your on-premises networks. When you create a VNet you give it an address space in private IP ranges, such as 10.1.0.0/16, written in Classless Inter-Domain Routing (CIDR) notation, and it lives in one region and one subscription. VNets provide isolation: resources in one VNet cannot reach resources in another until you connect them. You divide a VNet into subnets, smaller address ranges such as 10.1.1.0/24, to organize and secure resources. For example, you might put web servers in one subnet and database servers in another. Resources in different subnets of the same VNet can talk to each other by default. You filter traffic with network security groups (NSGs), which contain prioritized allow and deny rules based on source, destination, port and protocol, and can be attached to a subnet or a network interface.",
   "```bash\naz network vnet create --resource-group rg-net --name vnet-hub --address-prefixes 10.1.0.0/16 --subnet-name web --subnet-prefixes 10.1.1.0/24\naz network vnet subnet create --resource-group rg-net --vnet-name vnet-hub --name db --address-prefixes 10.1.2.0/24\naz network vnet peering create --resource-group rg-net --name hub-to-spoke --vnet-name vnet-hub --remote-vnet vnet-spoke --allow-vnet-access\n```",
   "Virtual network peering links two VNets so resources in each can communicate using private IP addresses, as if on one network. Peering can connect VNets in the same region or in different regions (global peering), and traffic between peered VNets travels over Microsoft's backbone network, not the public internet. Address spaces of peered VNets must not overlap, and peering must be set up in both directions for traffic to flow both ways. Peering is not transitive by default: if A peers with B and B peers with C, A cannot reach C without its own link or a routing device.",
   "Azure DNS hosts Domain Name System (DNS) zones on Microsoft's global network. DNS translates names such as www.example.com into IP addresses. With Azure DNS you manage your records with the same credentials, RBAC permissions, tools and billing as your other Azure resources, for example with `az network dns record-set a add-record`. Azure DNS hosts your records, but you still buy the domain name itself from a registrar and point it at Azure's name servers. Private DNS zones provide name resolution inside your VNets, so VMs can find each other by name without exposing those names publicly.",
   "Resources can be reached through public or private endpoints. A public endpoint is an address reachable from the internet, such as a public IP address on a VM or the default public address of a storage account. A private endpoint is a network interface with a private IP address from your VNet that connects privately to an Azure PaaS service, such as a storage account or SQL database, using Azure Private Link. Traffic to a private endpoint stays on the Microsoft network, and you can then turn off public network access to the service entirely, reducing its exposure.",
   "Consider a worked example. A company runs a web tier and a database tier in one VNet, `10.1.0.0/16`, with separate subnets and an NSG that allows only the web subnet to reach port 1433 on the database subnet. A second team's VNet, `10.2.0.0/16`, hosts shared tools, so the two VNets are peered. The public website's name is hosted in Azure DNS. Its storage account holds customer documents, so the team creates a private endpoint in the database subnet and disables public access; the web servers reach the storage account by a private IP, and requests from the internet are refused.",
   "Common mistakes: peering VNets with overlapping address spaces; assuming peering is transitive; believing Azure DNS sells domain names; and thinking a private endpoint encrypts data, when its purpose is private network access. Another trap is leaving a service's public endpoint open after adding a private endpoint; the exposure is only removed when public network access is disabled.",
   "Exam questions use recognizable clues. 'Connect two VNets so they communicate privately' is peering, and 'in different regions' is global peering. 'Filter traffic by port and IP' is a network security group. 'Host DNS records with Azure credentials and billing' is Azure DNS. 'Access a PaaS service over a private IP from your VNet' or 'remove public internet exposure' is a private endpoint. 'Segment resources within a VNet' is subnets."
  ],
  "terms": [
   [
    "Virtual network (VNet)",
    "An isolated private network in Azure, in one region and subscription, with its own address space."
   ],
   [
    "Subnet",
    "A range of addresses within a VNet used to group and secure resources."
   ],
   [
    "Network security group (NSG)",
    "A set of allow and deny rules that filters traffic to subnets or network interfaces."
   ],
   [
    "VNet peering",
    "A private connection between two VNets over Microsoft's backbone; global peering links VNets in different regions."
   ],
   [
    "Azure DNS",
    "A service that hosts DNS zones and records on Azure infrastructure; it does not register domain names."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your VNet that connects privately to an Azure PaaS service."
   ],
   [
    "Public endpoint",
    "An address reachable from the internet, such as a public IP or a service's default public URL."
   ]
  ],
  "example": "A healthcare startup stores patient files in Azure Storage. An audit flags that the storage account is reachable from the internet. The team creates a private endpoint in its application VNet, updates private DNS so the storage name resolves to the private IP, and disables public network access. The application keeps working over the private address, while connection attempts from the internet now fail.",
  "tip": "Peering connects VNets and requires non-overlapping address spaces; it is not transitive. A private endpoint gives a PaaS service a private IP in your VNet. Azure DNS hosts records but does not sell domain names.",
  "check": [
   [
    "What requirement must two VNets meet before they can be peered?",
    "Their address spaces must not overlap."
   ],
   [
    "Does traffic between peered VNets cross the public internet?",
    "No, it travels privately over Microsoft's backbone network."
   ],
   [
    "Can you buy a domain name through Azure DNS?",
    "No, Azure DNS hosts the zone and records; the domain is bought from a registrar and delegated to Azure's name servers."
   ],
   [
    "What is the security benefit of a private endpoint for a storage account?",
    "The service is reached through a private IP in your VNet, so you can disable public access and remove internet exposure."
   ]
  ]
 },
 {
  "t": "Hybrid connectivity: VPN Gateway (site-to-site, point-to-site) vs ExpressRoute",
  "body": [
   "Many organizations need their on-premises networks and Azure virtual networks (VNets) to work as one, for example so office users can reach an application running on Azure VMs, or so Azure servers can query a database still in the datacenter. Azure offers two main hybrid connectivity options, VPN Gateway and ExpressRoute, and the Microsoft Azure Fundamentals exam (AZ-900) expects you to know when to choose each. A virtual private network (VPN) creates an encrypted tunnel between two networks over an untrusted network, usually the public internet. Azure VPN Gateway is a type of virtual network gateway deployed into a dedicated subnet of your VNet, which must be named `GatewaySubnet`. It uses Internet Protocol Security (IPsec) and Internet Key Exchange (IKE) to encrypt traffic between the VNet and other locations over the internet. Gateways can be policy-based, using static rules, or route-based, using routing tables; route-based is the more flexible and common choice.",
   "```bash\naz network vnet subnet create --resource-group rg-net --vnet-name vnet-hub --name GatewaySubnet --address-prefixes 10.1.255.0/27\naz network vnet-gateway create --resource-group rg-net --name vpngw --vnet vnet-hub --gateway-type Vpn --vpn-type RouteBased --sku VpnGw1 --public-ip-addresses vpngw-pip\n```",
   "VPN Gateway supports several connection types. Site-to-site (S2S) connects an entire on-premises network to Azure through a VPN device at the office, so every machine in the office can reach the VNet. Point-to-site (P2S) connects an individual computer, such as a remote worker's laptop, to the VNet using VPN client software, with no office VPN device needed. VNet-to-VNet connects two Azure VNets through gateways. For higher availability you can run gateways in active-standby mode, the default, where a standby instance takes over if the active one fails, or in active-active mode, where both instances carry tunnels. Some organizations also use ExpressRoute with a site-to-site VPN as a failover path.",
   "Azure ExpressRoute extends your on-premises network into the Microsoft cloud over a private connection provided by a connectivity partner. The traffic does not travel over the public internet. This gives more reliability, higher speeds, consistent latency and stronger isolation than internet-based connections, which suits large data transfers, critical workloads and organizations with strict compliance needs. Connections can be made at a co-location facility, through a point-to-point Ethernet link, through an any-to-any network from a provider, or with ExpressRoute Direct straight into Microsoft's network. ExpressRoute can reach Azure services and other Microsoft cloud services such as Microsoft 365, and ExpressRoute Global Reach can link on-premises sites to each other through Microsoft's backbone. Note that private does not automatically mean encrypted; organizations with encryption requirements can add encryption over ExpressRoute, for example with MACsec or an IPsec tunnel.",
   "The trade-off is cost and setup. VPN Gateway is quicker to set up and cheaper, but performance depends on the internet. ExpressRoute requires working with a provider and costs more, but offers predictable performance. For a single remote user, point-to-site is the right choice; for connecting a whole office cheaply, site-to-site; for a large, critical, high-bandwidth connection that must avoid the internet, ExpressRoute.",
   "Consider a worked example. A bank runs trading systems in its own datacenter and moves analytics to Azure. Nightly it copies several terabytes of market data to Azure, and regulators require that this traffic not traverse the public internet. It orders an ExpressRoute circuit through a connectivity partner and adds a site-to-site VPN as a backup path. Its fifty branch offices are small and connect to Azure with site-to-site VPNs, and its IT administrators who work from home use point-to-site VPN from their laptops.",
   "Common mistakes: thinking VPN traffic is unencrypted (it is encrypted, but it crosses the internet); thinking ExpressRoute traffic is encrypted by default (it is private, not automatically encrypted); and choosing site-to-site for one remote user. Other traps are forgetting that the gateway needs its own subnet named `GatewaySubnet`, and assuming ExpressRoute is only for Azure, when it can also reach other Microsoft cloud services. Remember too that a VPN gateway takes time to deploy and is billed while it exists, so in labs you should delete it when you finish.",
   "Exam questions use clear clue words. 'Must not traverse the public internet', 'dedicated private connection', 'predictable latency' or 'connectivity provider' is ExpressRoute. 'Encrypted tunnel over the internet' is VPN Gateway. 'One laptop' or 'individual remote worker' is point-to-site. 'Connect the whole office' or 'on-premises VPN device' is site-to-site. 'Connect two Azure VNets through gateways' is VNet-to-VNet, though peering is usually the simpler choice for that."
  ],
  "terms": [
   [
    "Virtual private network (VPN)",
    "An encrypted tunnel that connects networks or devices across an untrusted network such as the internet."
   ],
   [
    "Azure VPN Gateway",
    "A virtual network gateway that sends encrypted traffic between a VNet and other locations over the internet."
   ],
   [
    "Site-to-site (S2S) VPN",
    "A VPN connecting an entire on-premises network to Azure through a VPN device."
   ],
   [
    "Point-to-site (P2S) VPN",
    "A VPN connecting an individual computer to an Azure VNet using client software."
   ],
   [
    "Azure ExpressRoute",
    "A private connection from on-premises to Microsoft's cloud through a connectivity partner that does not use the public internet."
   ],
   [
    "GatewaySubnet",
    "The dedicated subnet, with that exact name, where a VNet's gateway is deployed."
   ],
   [
    "ExpressRoute Global Reach",
    "A feature that links on-premises sites to each other through their ExpressRoute circuits."
   ]
  ],
  "example": "A manufacturer with one head office and a handful of remote engineers needs access to an ERP system on Azure VMs. It creates a VPN gateway, connects the head office's firewall with a site-to-site VPN, and gives the engineers point-to-site VPN profiles on their laptops. Two years later, when it moves large design files to Azure every day and needs steady latency, it adds an ExpressRoute circuit and keeps the site-to-site VPN as a failover path.",
  "tip": "If traffic must not cross the public internet, the answer is ExpressRoute. VPN Gateway traffic is encrypted but travels over the internet. One laptop means point-to-site; a whole office means site-to-site.",
  "check": [
   [
    "A company requires that its hybrid traffic never cross the public internet. Which option fits?",
    "ExpressRoute, which uses a private connection through a connectivity partner."
   ],
   [
    "A single employee needs to reach an Azure VNet from home. Which VPN connection type fits?",
    "Point-to-site, which connects one computer using VPN client software."
   ],
   [
    "Is ExpressRoute traffic encrypted by default?",
    "No, it is private but not automatically encrypted; you can add encryption such as MACsec or IPsec if required."
   ],
   [
    "Give one advantage of VPN Gateway over ExpressRoute.",
    "It is quicker to set up and cheaper, because it uses the existing internet connection instead of a provider circuit."
   ]
  ]
 },
 {
  "t": "Azure Storage services (Blob, Files, Queue, Table, Disks), storage account types and access tiers (Hot, Cool, Cold, Archive)",
  "body": [
   "Azure Storage is Microsoft's cloud storage platform for almost every kind of data an application produces: documents, images, backups, messages, structured records and the virtual hard disks behind virtual machines (VMs). It is durable (several copies are always kept), highly available, secure by default (data is encrypted at rest automatically) and massively scalable, and you pay only for the capacity and operations you use. Most storage services live inside a storage account, which gives your data a unique namespace reachable over HTTP or HTTPS. Because the account name forms part of public endpoint addresses such as `mystorage.blob.core.windows.net`, it must be unique across all of Azure, between 3 and 24 characters long, and use only lowercase letters and numbers.",
   "Azure Storage offers several data services, and the exam expects you to match each one to a need. Blob storage holds unstructured data such as images, video, backups and log files, organized into containers; it is object storage optimized for very large amounts of data, and each blob has its own URL. Azure Files provides fully managed file shares that you mount using the Server Message Block (SMB) protocol, and on premium shares Network File System (NFS), just like a mapped network drive, which suits lift-and-shift of applications that already use file shares. Queue storage holds large numbers of small messages so that parts of an application can communicate asynchronously: a web front end drops an order message on a queue and a background worker processes it later. Table storage stores structured, non-relational (NoSQL) key-value data with a flexible schema. Azure Disks are block-level volumes attached to Azure VMs, offered as managed disks so Azure handles the underlying storage for you.",
   "The storage account type decides which services, performance levels and redundancy options you can use. Standard general-purpose v2 is the recommended type for most scenarios; it supports blobs (including Azure Data Lake Storage), files, queues and tables and runs on standard hard-disk-based hardware. Premium account types use solid-state drives (SSDs) for consistently low latency and are specialized: premium block blobs for high transaction rates or small objects, premium file shares for enterprise file workloads, and premium page blobs for page-blob scenarios. You can create an account in the portal under Storage accounts, then Create, or with a command such as `az storage account create --name stdemo01 --resource-group rg-demo --sku Standard_LRS --kind StorageV2`.",
   "Blob data can be stored in access tiers that trade storage cost against access cost. The Hot tier is for data accessed frequently; it has the highest storage cost and the lowest access cost. The Cool tier is for data accessed infrequently and kept for at least 30 days. The Cold tier is for data accessed rarely and kept for at least 90 days. The Archive tier is for data almost never accessed and kept for at least 180 days, with the lowest storage cost and the highest retrieval cost. Moving or deleting data from a cooler tier before its minimum period incurs an early-deletion charge, so tiers only save money if the data really stays put.",
   "Archive is different in one important way: it is offline. You cannot read an archived blob directly; first you must rehydrate it by changing its tier to an online tier (Hot, Cool or Cold) or copying it to one, and that can take hours. The storage account has a default access tier that new blobs inherit, while Archive can be set only on individual blobs. Lifecycle management rules can move blobs between tiers automatically as they age, for example moving log files to Cool after 30 days, to Archive after 180 days, and deleting them after several years.",
   "Consider a worked example. A clinic stores patient-uploaded photos that doctors view often in the first month, then rarely. Seven years of retention is required by regulation. You put the photos in Blob storage in a general-purpose v2 account with the Hot default tier and add a lifecycle rule: move blobs to Cool after 30 days without access and to Archive after a year. The scheduling app uses Queue storage to hand appointment reminders to a background process, and a legacy reporting tool that expects a mapped drive reads from an Azure Files share. Each need maps to a different service in the same account.",
   "Common mistakes: choosing Archive for data you might need in minutes (it needs rehydration first); thinking the account can default to Archive (it cannot); confusing Table storage with a relational database (Table storage has no joins or fixed schema); mixing up Azure Files, which is a share many machines can mount, with Azure Disks, which is a volume attached to a VM; and assuming Premium accounts support every service and redundancy option (they are specialized).",
   "Exam questions are usually scenario based. 'Unstructured data such as images or video' points to Blob storage. 'Replace an on-premises file server share' or 'mount via SMB' points to Azure Files. 'Decouple application components with messages' points to Queue storage. 'NoSQL key-value data' points to Table storage. 'Rarely accessed, can wait hours, cheapest storage' points to Archive, while 'accessed infrequently but must be available immediately' points to Cool or Cold. 'Recommended account type for most scenarios' is Standard general-purpose v2."
  ],
  "terms": [
   [
    "Storage account",
    "A container for Azure Storage data services that provides a globally unique namespace and endpoints."
   ],
   [
    "Blob storage",
    "Object storage for large amounts of unstructured data, organized into containers."
   ],
   [
    "Azure Files",
    "Fully managed cloud file shares that can be mounted over SMB or NFS."
   ],
   [
    "Queue storage",
    "A service for storing messages so application components can communicate asynchronously."
   ],
   [
    "Table storage",
    "A NoSQL store for structured, schema-less key-value data."
   ],
   [
    "Access tier",
    "A Hot, Cool, Cold or Archive setting on blob data that trades storage cost against access cost."
   ],
   [
    "Rehydration",
    "Changing an archived blob to an online tier so it can be read, which can take hours."
   ],
   [
    "Lifecycle management",
    "Rules that move blobs between tiers or delete them automatically based on age or access."
   ]
  ],
  "example": "A media company keeps finished video projects in Blob storage. Active projects stay in the Hot tier for fast editing. A lifecycle management rule moves projects untouched for 90 days to Cold, and after a year to Archive, cutting storage cost sharply. When a client asks for an old project, an engineer rehydrates it to Hot and plans for it to be available later that day rather than immediately.",
  "tip": "Archive is offline and needs rehydration that can take hours, and it can be set only per blob. Minimum retention periods are Cool 30 days, Cold 90 days and Archive 180 days. Queue is for messages, Table is NoSQL key-value data, Files is SMB/NFS shares.",
  "check": [
   [
    "An application needs to read a blob within seconds, but it is accessed only a few times a year. Is Archive suitable?",
    "No. Archive is offline and must be rehydrated, which can take hours; Cool or Cold keeps it online at lower cost than Hot."
   ],
   [
    "Which storage service lets many servers mount the same share using SMB?",
    "Azure Files, which provides fully managed file shares mountable like a network drive."
   ],
   [
    "Which storage account type does Microsoft recommend for most scenarios?",
    "Standard general-purpose v2, which supports blobs, files, queues and tables."
   ],
   [
    "What happens if you delete a blob from the Cool tier after ten days?",
    "You pay an early-deletion charge, because Cool has a 30-day minimum retention period."
   ]
  ]
 },
 {
  "t": "Storage redundancy: LRS, ZRS, GRS, GZRS and read-access secondary options",
  "body": [
   "Azure Storage always keeps multiple copies of your data so it survives hardware failures, and you decide how widely those copies are spread. Redundancy is a trade-off between cost and the size of failure your data can survive: a failed disk, a lost datacenter or zone, or an entire region going offline. You set the redundancy option on the storage account when you create it, as part of the SKU, for example `Standard_LRS` or `Standard_GZRS`, and it applies to all the data in that account.",
   "Redundancy in the primary region comes in two forms. Locally redundant storage (LRS) keeps three copies of your data within a single datacenter in the primary region. It is the lowest-cost option and protects against a failed disk, server or rack, but not against a fire, flood or outage affecting that whole datacenter. Zone-redundant storage (ZRS) writes three copies synchronously across three availability zones in the primary region. Each zone is one or more datacenters with independent power, cooling and networking, so data stays available for reads and writes even if one zone becomes unavailable. ZRS needs a region that supports availability zones.",
   "For protection against a whole-region outage, you add a secondary region, which is the primary region's pair, typically hundreds of kilometres away. Geo-redundant storage (GRS) stores data with LRS in the primary region, then replicates it asynchronously to the secondary region, where it is again stored with LRS: six copies in total. Geo-zone-redundant storage (GZRS) uses ZRS in the primary region and LRS in the secondary region, combining protection against a zone failure with protection against a regional disaster. GZRS is the most resilient option and also the most expensive.",
   "With GRS and GZRS, the copy in the secondary region is not readable during normal operation; it becomes available only after a failover to the secondary region. If you need to read the secondary copy at any time, for example so an application can keep serving reads while the primary region has problems, choose the read-access versions: read-access geo-redundant storage (RA-GRS) or read-access geo-zone-redundant storage (RA-GZRS). The secondary is reached through a separate endpoint, such as `mystorage-secondary.blob.core.windows.net`. Because replication is asynchronous, the secondary may lag slightly behind the primary, so the most recent writes might not be there yet; the time of the last replicated write is reported as the last sync time.",
   "A simple way to remember the names: L means local (one datacenter), Z means zones (several datacenters in one region), G means geo (a second region), and RA means you can read from that second region without a failover. Not every option is available for every account type or region; for example, Azure managed disks support LRS and ZRS but not geo-redundancy, and premium accounts are limited to the primary-region options. Changing redundancy later is possible for many combinations, sometimes through a conversion and sometimes through a migration.",
   "Consider a worked example. An online retailer stores product images in a storage account in a region with availability zones. The business says the site must survive a zone outage without any action from staff, and product images must still be viewable if the whole region fails, even if new uploads pause. LRS fails the first requirement. ZRS meets the zone requirement but not the region one. GZRS covers both zone and region failure, and because the website must read images from the secondary without waiting for a failover, the correct answer is RA-GZRS.",
   "Common mistakes: believing LRS survives a datacenter outage (all three copies are in one datacenter); thinking GRS lets you read the secondary copy at any time (only RA-GRS or RA-GZRS do that); assuming geo-replication is synchronous and therefore loses no data (it is asynchronous, so recent writes can be lost in a disaster); and confusing redundancy with backup. Redundancy copies every change, including accidental deletions, so you still need features such as soft delete, versioning or Azure Backup to recover from mistakes.",
   "Exam questions usually describe the failure to survive or the cost goal. 'Lowest cost' or 'single datacenter' points to LRS. 'Remain available if a datacenter or zone fails' points to ZRS. 'Protect against a regional outage' points to GRS or GZRS, and 'both zone and region protection' points to GZRS. 'Read data from the secondary region at any time' or 'without initiating a failover' points to the RA- versions. If the question counts copies, LRS and ZRS keep three, and the geo options keep six."
  ],
  "terms": [
   [
    "Locally redundant storage (LRS)",
    "Three copies of data within a single datacenter in the primary region; the lowest-cost option."
   ],
   [
    "Zone-redundant storage (ZRS)",
    "Three copies written synchronously across three availability zones in the primary region."
   ],
   [
    "Geo-redundant storage (GRS)",
    "LRS in the primary region plus asynchronous replication to LRS in the paired secondary region."
   ],
   [
    "Geo-zone-redundant storage (GZRS)",
    "ZRS in the primary region plus asynchronous replication to LRS in the secondary region."
   ],
   [
    "Read-access (RA-GRS, RA-GZRS)",
    "Variants of the geo options that let you read the secondary copy at any time through a secondary endpoint."
   ],
   [
    "Failover",
    "Switching a storage account so the secondary region becomes the primary after a regional outage."
   ],
   [
    "Last sync time",
    "The point up to which data is guaranteed to have been replicated to the secondary region."
   ]
  ],
  "example": "A government agency keeps scanned records in a storage account. An audit finds the account uses LRS, so a datacenter fire could destroy every copy. Because the records must remain readable during a regional outage while the agency decides whether to fail over, the team changes the account to RA-GZRS. They also enable soft delete, since redundancy alone would faithfully replicate an accidental deletion to every copy.",
  "tip": "Match the failure to the option: disk or rack failure, LRS; datacenter or zone failure, ZRS; region failure, GRS or GZRS. Need to read the secondary without a failover? Pick the RA- version. Redundancy is not backup.",
  "check": [
   [
    "How many copies of data does GRS keep, and where?",
    "Six: three with LRS in the primary region and three with LRS in the paired secondary region."
   ],
   [
    "An app must read from the secondary region during a primary outage without waiting for failover. Which options qualify?",
    "RA-GRS or RA-GZRS, because only read-access options expose a readable secondary endpoint."
   ],
   [
    "Why can a geo-failover lose a few recent writes?",
    "Replication to the secondary region is asynchronous, so writes made after the last sync time may not have reached it."
   ],
   [
    "Which option protects against a zone failure but not a regional outage?",
    "ZRS, which spreads copies across availability zones in only the primary region."
   ]
  ]
 },
 {
  "t": "Moving data and migrating: AzCopy, Storage Explorer, Azure File Sync, Azure Migrate and Azure Data Box",
  "body": [
   "Getting data and workloads into Azure is often the first real project an organization runs in the cloud. Azure offers different tools depending on how much data there is, how often it moves, whether you want a command line or a graphical tool, and whether you are moving files or whole servers. The exam gives you a short scenario and expects you to pick the tool that fits, so it helps to know the one clue that points to each. AzCopy is a command-line utility for copying blobs or files to or from a storage account, and between storage accounts. It runs on Windows, macOS and Linux, can be scripted for repeated jobs, and authenticates with Microsoft Entra ID or a shared access signature (SAS), a signed URL that grants limited access. `azcopy copy` performs copies, while `azcopy sync` synchronizes in one direction only, making the destination match the source. It does not keep two locations in continuous two-way sync. For example:",
   "```bash\nazcopy login\nazcopy copy \"./logs\" \"<container URL>/logs\" --recursive\nazcopy sync \"./reports\" \"<container URL>/reports\"\n```",
   "Azure Storage Explorer is a free desktop application for Windows, macOS and Linux with a graphical interface for managing storage accounts. You can browse containers and shares, upload and download files, manage access policies and change properties by clicking rather than typing commands. Behind the scenes it uses AzCopy for transfers, so you get the same speed with a friendlier interface. It suits administrators and developers who move data occasionally or want to inspect what is in an account.",
   "Azure File Sync centralizes an organization's file shares in Azure Files while keeping the flexibility and performance of an on-premises Windows file server. You install the File Sync agent on a Windows Server, register it with a Storage Sync Service in Azure, and link local folders to an Azure file share. Changes then synchronize continuously and in both directions, and several servers, such as branch offices, can sync with the same share. With cloud tiering, frequently used files stay cached on the local server while rarely used files live only in Azure and are fetched on demand. Azure Migrate is different again: it is a central hub for moving whole workloads. It helps you discover and assess on-premises servers, databases, web apps and virtual desktops, reports their readiness and estimated Azure cost, and then migrates them, with integrated Microsoft and partner tools such as the Azure Database Migration Service.",
   "Azure Data Box is a physical transfer service for large amounts of data when uploading over the network would take too long, cost too much or is not possible. You order a device in the portal, Microsoft ships you a rugged, encrypted storage appliance, you copy your data onto it locally and ship it back, and Microsoft uploads the data into your storage account. There are several Data Box products for different volumes, from disks to large appliances. Data Box can also export data out of Azure, for example for disaster recovery or to meet a regulation. After the upload the device's disks are securely erased in line with standards for media sanitization. It suits one-time bulk migrations and sites with limited or no connectivity.",
   "Consider a worked example. A law firm has five branch offices, each with its own Windows file server, plus a head-office archive of several hundred terabytes and twenty on-premises VMs. It wants one central copy of the branch shares while keeping fast local access, so it uses Azure File Sync with cloud tiering. The archive would take months to upload over the office internet link, so it orders Azure Data Box. For the VMs it runs Azure Migrate to assess readiness and cost and then migrate them. A developer who needs to upload build artifacts nightly writes an AzCopy script, and the office manager uses Storage Explorer to check what was uploaded.",
   "Common mistakes: choosing AzCopy when the scenario needs ongoing two-way sync with an on-premises server (that is File Sync); thinking Storage Explorer is a separate transfer engine (it uses AzCopy); picking Azure Migrate for a pure bulk data move with no servers involved; and forgetting Data Box exists when the network is the bottleneck.",
   "Exam wording gives the tool away: 'command line' or 'script' points to AzCopy; 'graphical interface' or 'desktop app' points to Storage Explorer; 'keep a local cache of files on a Windows file server' or 'cloud tiering' points to Azure File Sync; 'discover, assess and migrate servers' points to Azure Migrate; 'terabytes of data with limited bandwidth' or 'offline transfer' points to Azure Data Box."
  ],
  "terms": [
   [
    "AzCopy",
    "A command-line tool for copying data to, from and between Azure storage accounts, with one-way sync."
   ],
   [
    "Azure Storage Explorer",
    "A free graphical desktop app for managing storage accounts that uses AzCopy for transfers."
   ],
   [
    "Azure File Sync",
    "A service that synchronizes Windows file servers with Azure Files and can tier cold files to the cloud."
   ],
   [
    "Cloud tiering",
    "A File Sync feature that keeps frequently used files locally and stores rarely used files only in Azure."
   ],
   [
    "Azure Migrate",
    "A hub for discovering, assessing and migrating on-premises servers, databases and apps to Azure."
   ],
   [
    "Azure Data Box",
    "A physical device service for moving large volumes of data into or out of Azure offline."
   ],
   [
    "Shared access signature (SAS)",
    "A signed token appended to a storage URL that grants limited, time-bound access."
   ]
  ],
  "example": "A research lab has several hundred terabytes of genome sequencing data on local arrays and only a modest internet connection. Uploading would take months, so it orders Azure Data Box, copies the data locally, and ships the device back for upload into Blob storage. From then on, new daily results are small, so a scheduled AzCopy job uploads each night's output to the same container.",
  "tip": "Scriptable command line: AzCopy. Graphical tool: Storage Explorer. Keep on-premises Windows file servers synced with the cloud: Azure File Sync. Assess and migrate servers: Azure Migrate. Too much data for the network: Data Box.",
  "check": [
   [
    "An organization wants branch file servers to keep a local cache while the master copy lives in Azure. Which service fits?",
    "Azure File Sync, which syncs Windows file servers with Azure Files and supports cloud tiering."
   ],
   [
    "Which tool would you choose to assess on-premises VMs for Azure readiness and estimate their cost?",
    "Azure Migrate, the central hub for discovery, assessment and migration."
   ],
   [
    "Does azcopy sync keep two locations synchronized in both directions?",
    "No. It makes the destination match the source in one direction only."
   ],
   [
    "A company must move a very large dataset from a site with poor connectivity. Which service fits?",
    "Azure Data Box, which ships a physical device so data can be transferred offline."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID and Entra Domain Services; authentication methods: SSO, MFA and passwordless",
  "body": [
   "Microsoft Entra ID, formerly called Azure Active Directory (Azure AD), is Microsoft's cloud-based identity and access management (IAM) service. It stores users, groups and applications, and it handles sign-in to Azure, Microsoft 365 and thousands of other software-as-a-service (SaaS) applications. Each organization gets its own Entra tenant, a dedicated instance of the directory, and every Azure subscription trusts exactly one tenant for its identities. Entra ID provides authentication, single sign-on, application management, device registration and identity protection features such as detecting risky sign-ins. Because identity is the control plane for the cloud, it is often called the new security perimeter.",
   "Many organizations also run on-premises Active Directory Domain Services (AD DS). Microsoft Entra Connect (or the lighter Entra Cloud Sync) synchronizes users and groups from on-premises AD to Entra ID, so people use one identity for both. This is called hybrid identity. Entra ID is not simply AD DS in the cloud, though: it uses web-based protocols such as OAuth 2.0, OpenID Connect and Security Assertion Markup Language (SAML), and it does not offer Kerberos, NTLM, Lightweight Directory Access Protocol (LDAP), organizational units or Group Policy the way a domain controller does.",
   "Microsoft Entra Domain Services fills that gap. It provides a managed domain with domain join, Group Policy, LDAP and Kerberos or NTLM authentication, without you deploying, patching or monitoring domain controllers; Microsoft runs two domain controllers for you. It lets older applications that depend on those protocols move to Azure VMs unchanged. The managed domain synchronizes one way from Entra ID, so users sign in with the same credentials, but changes made in the managed domain do not flow back. You create it in the portal by searching for Microsoft Entra Domain Services and choosing a domain name and virtual network.",
   "Authentication is proving who you are; authorization, covered later with role-based access control, is deciding what you may do. Entra ID offers several ways to make authentication both stronger and simpler. Single sign-on (SSO) lets a user sign in once and then open many applications without signing in again. It means fewer passwords to remember, less password reuse, fewer help-desk resets, and one place to disable access when someone leaves the company.",
   "Multifactor authentication (MFA) requires two or more kinds of evidence: something you know (a password or PIN), something you have (a phone or hardware key) and something you are (a fingerprint or face). A stolen password alone is then not enough to sign in. Microsoft Entra multifactor authentication can use a push notification or code in the Microsoft Authenticator app, a hardware token, or a text message or voice call, though the phone-based options are weaker. Security defaults, available free in every tenant, turn on MFA registration and basic protections with one switch. Passwordless authentication goes further and removes the password entirely, combining something you have with something you are or know. Options include Windows Hello for Business (biometrics or a PIN tied to one device), passwordless sign-in with the Microsoft Authenticator app, and FIDO2 security keys or passkeys. Passwordless methods are more convenient and resist phishing far better, because there is no password to steal or type into a fake page.",
   "Consider a worked example. A manufacturer syncs its on-premises AD to Entra ID with Entra Connect so staff use one account for Microsoft 365 and on-premises apps. It enables SSO so employees reach the HR portal, the expense system and the Azure portal after one sign-in. It requires MFA through the Authenticator app, and gives engineers FIDO2 keys for passwordless sign-in. An old inventory application that needs LDAP and domain join is moved to an Azure VM joined to an Entra Domain Services managed domain, so nobody has to maintain domain controllers in Azure.",
   "Common mistakes: thinking Entra ID supports Kerberos and Group Policy directly (that is Entra Domain Services or AD DS); confusing Entra Connect, which synchronizes identities, with Entra Domain Services, which provides a managed domain; treating SSO as a security factor (it is about convenience and central control, not extra proof); and describing a password plus a security question as MFA (both are something you know, so it is still one factor).",
   "Exam wording is usually direct. 'Cloud-based identity and access management service' is Entra ID. 'Domain join, LDAP, Kerberos or Group Policy without managing domain controllers' is Entra Domain Services. 'Sign in once to access many applications' is SSO. 'Require a second form of verification' is MFA. 'Eliminate passwords' or 'phishing-resistant' points to passwordless methods such as Windows Hello for Business or FIDO2 keys. 'Synchronize on-premises users to the cloud' is Entra Connect."
  ],
  "terms": [
   [
    "Microsoft Entra ID",
    "Microsoft's cloud identity and access management service, formerly Azure Active Directory."
   ],
   [
    "Tenant",
    "A dedicated instance of Entra ID that represents one organization."
   ],
   [
    "Microsoft Entra Domain Services",
    "A managed domain providing domain join, Group Policy, LDAP and Kerberos without managing domain controllers."
   ],
   [
    "Microsoft Entra Connect",
    "A tool that synchronizes on-premises Active Directory identities to Entra ID for hybrid identity."
   ],
   [
    "Single sign-on (SSO)",
    "Signing in once to access many applications without re-entering credentials."
   ],
   [
    "Multifactor authentication (MFA)",
    "Requiring two or more different kinds of evidence (know, have, are) to sign in."
   ],
   [
    "Passwordless authentication",
    "Signing in without a password, using a device-bound credential plus biometrics or a PIN."
   ],
   [
    "FIDO2 security key",
    "A hardware key or passkey that uses public-key cryptography for phishing-resistant sign-in."
   ]
  ],
  "example": "A school district has thousands of students and staff who kept forgetting passwords across a dozen learning apps. It connects those apps to Entra ID for single sign-on, so one sign-in opens everything, and requires MFA with the Authenticator app for staff who can see student records. Help-desk password resets drop sharply, and when a teacher leaves, disabling one Entra account removes access to every connected app at once.",
  "tip": "Entra ID is the cloud identity service using modern protocols. Entra Domain Services is for legacy apps needing domain join, LDAP or Kerberos without managing domain controllers. MFA adds a factor; passwordless removes the password; SSO reduces the number of sign-ins.",
  "check": [
   [
    "A legacy app needs LDAP and Kerberos in Azure, and the team does not want to manage domain controllers. What should they use?",
    "Microsoft Entra Domain Services, which provides a managed domain with those protocols."
   ],
   [
    "A user signs in with a password and then approves a prompt in the Authenticator app. What is this?",
    "Multifactor authentication: something you know plus something you have."
   ],
   [
    "Why is passwordless authentication more resistant to phishing than a password?",
    "There is no password to steal or type into a fake site; sign-in relies on a device-bound credential plus biometrics or a PIN."
   ],
   [
    "Which tool synchronizes on-premises Active Directory users to Entra ID?",
    "Microsoft Entra Connect (or Entra Cloud Sync), which creates a hybrid identity."
   ]
  ]
 },
 {
  "t": "External identities (B2B and customer identity) and Conditional Access",
  "body": [
   "Organizations rarely work alone. Suppliers, contractors, auditors and partners need access to some of your apps and files, and many businesses also run apps used by the public. Creating and managing ordinary employee accounts for all of these people would be insecure and exhausting. Microsoft Entra External ID is the name for the set of capabilities that let people outside your organization use your apps with identities they already have. The two scenarios the exam cares about are collaborating with partners (business-to-business, B2B) and serving customers.",
   "Business-to-business (B2B) collaboration lets you invite external users, such as a supplier's staff, into your own workforce tenant as guest users. They sign in with credentials they already own, such as their work account in their own Entra organization, a Microsoft account, a social identity, or a one-time passcode sent by email, so you never create or store passwords for them. In the portal you go to Microsoft Entra ID, then Users, then Invite external user, or you let partners self-register. Once a guest accepts the invitation, you grant them access to specific apps, Teams, SharePoint sites or Azure resources like any other user, and you can use access reviews to remove access that is no longer needed. B2B direct connect is a related option that creates mutual trust between two Entra organizations, used for scenarios such as Teams shared channels, without adding guest objects to your directory.",
   "Customer identity is a different scenario. The users are members of the public who sign up for your app, such as shoppers on a retail site or patients using a booking app. There may be millions of them, they choose their own sign-in method, and they must be kept completely separate from employees. Microsoft's customer identity offerings are Azure Active Directory B2C, the older service, and Microsoft Entra External ID for customers, its successor, which uses a separate external tenant. They provide customizable, branded sign-up and sign-in pages, self-service password reset, support for social identity providers such as Google or Facebook, and a separate directory for customer accounts.",
   "Conditional Access is a Microsoft Entra ID feature, included with Microsoft Entra ID P1 licenses and above, that decides whether to allow a sign-in, block it or require extra steps, based on signals. Signals include the user and their group membership, the location or IP address, the device and whether it is marked compliant, the application being accessed, and the calculated sign-in or user risk (risk-based conditions need P2). Decisions include allowing access, requiring MFA, requiring a compliant or hybrid-joined device, requiring a password change, or blocking access entirely.",
   "Conditional Access policies follow an if-then pattern: if these conditions are true, then enforce these controls. For example: if a user in the Finance group signs in from outside the trusted office network to the payroll app, then require MFA; if anyone signs in from a country where the company does not operate, then block. You build these in the portal under Microsoft Entra ID, Protection, Conditional Access, and you can start a new policy in report-only mode to see its effect before enforcing it. This lets you apply strong controls only when the risk warrants them, keeping everyday sign-ins simple, and it is a core tool for Zero Trust because every access request is evaluated using all available signals.",
   "Consider a worked example. An engineering firm works with an outside design agency. It invites the agency's designers as B2B guests, who sign in with their own agency accounts and get access to one SharePoint site and one Azure storage account. The firm also launches a customer portal where the public can track orders; customers sign up with an email address or a social account through the customer identity service, kept in a separate external tenant. Finally, a Conditional Access policy requires MFA for all guest users and blocks sign-ins to the admin portal from unmanaged devices.",
   "Common mistakes: using B2B for public customers (B2B is for known partners you invite into your workforce tenant); thinking guests need new passwords created by you (they bring their own identity); treating Conditional Access as a replacement for MFA (it decides when to require MFA and other controls); and assuming Conditional Access is available on the free tier (it needs Entra ID P1 or higher; the free tier offers security defaults instead). Remember too that Conditional Access runs after the first factor of authentication; it is not a firewall in front of the sign-in page.",
   "Exam questions hint through the kind of user. 'Partner', 'vendor', 'supplier' or 'invite a guest' points to B2B collaboration. 'Customers sign up with social accounts', 'consumer-facing app' or 'branded sign-in pages for the public' points to customer identity (Azure AD B2C or External ID for customers). 'Require MFA only when signing in from outside the office', 'block access from certain countries' or 'allow only compliant devices' points to Conditional Access. 'Signals' and 'if-then policies' are also Conditional Access vocabulary."
  ],
  "terms": [
   [
    "Microsoft Entra External ID",
    "The set of capabilities that let external users, partners or customers, access your apps with their own identities."
   ],
   [
    "B2B collaboration",
    "Inviting external partners into your tenant as guest users who sign in with their own credentials."
   ],
   [
    "Guest user",
    "An external identity represented in your directory and granted access to specific resources."
   ],
   [
    "Customer identity (B2C)",
    "A service for consumer-facing apps providing branded sign-up and sign-in with local or social accounts."
   ],
   [
    "Conditional Access",
    "An Entra ID feature that uses signals in if-then policies to allow, block or require extra controls at sign-in."
   ],
   [
    "Signal",
    "Information such as user, location, device, app or risk that Conditional Access evaluates."
   ],
   [
    "Report-only mode",
    "A Conditional Access setting that logs what a policy would do without enforcing it."
   ]
  ],
  "example": "A hospital lets visiting consultants from partner clinics use its scheduling system. Rather than creating hospital accounts, it invites them as B2B guests who sign in with their clinic accounts. A Conditional Access policy requires MFA and a compliant device for any guest opening the scheduling app, and blocks guests entirely from the patient records system. When a consultant's contract ends, an access review flags the unused guest account for removal.",
  "tip": "Partners and suppliers who need access to your apps: B2B collaboration. Public customers signing up for your app: customer identity (Azure AD B2C or External ID for customers). 'Require MFA only when signing in from outside the office' is Conditional Access.",
  "check": [
   [
    "A retailer wants shoppers to create accounts with their Google or Facebook identities. Which capability fits?",
    "Customer identity (Azure AD B2C or Entra External ID for customers), designed for consumer-facing apps."
   ],
   [
    "A supplier's employees need access to one SharePoint site using their own work accounts. Which capability fits?",
    "B2B collaboration, which invites them as guest users with their existing identities."
   ],
   [
    "Name three signals Conditional Access can evaluate.",
    "Any three of: user or group, location or IP address, device state, application, and sign-in risk."
   ],
   [
    "Which license level is needed for Conditional Access?",
    "Microsoft Entra ID P1 or higher; the free tier offers security defaults instead."
   ]
  ]
 },
 {
  "t": "Azure role-based access control (RBAC), Zero Trust, defense in depth and Microsoft Defender for Cloud",
  "body": [
   "Authentication proves who someone is; authorization decides what they can do. Azure role-based access control (RBAC) is the authorization system for Azure resources. Instead of granting individual permissions to individual people, you create a role assignment made of three parts: a security principal (a user, group, service principal or managed identity), a role definition (a collection of allowed actions, such as reading or restarting VMs), and a scope (where the permissions apply). In the portal you open any resource, choose Access control (IAM), then Add role assignment; from the CLI you run `az role assignment create --assignee alice@contoso.com --role Reader --resource-group rg-sales`.",
   "Azure includes many built-in roles. Four fundamental ones are Owner (full access, including assigning roles to others), Contributor (can create and manage all resources but cannot grant access), Reader (can view resources but not change them) and User Access Administrator (can manage user access but not the resources themselves). There are also service-specific roles, such as Virtual Machine Contributor, and you can create custom roles. Scopes follow the resource hierarchy: management group, subscription, resource group or single resource. Assignments are inherited by child scopes, and permissions from multiple assignments add together. Follow the principle of least privilege: give only the access needed, at the narrowest scope, preferably to groups rather than individuals. Note that Azure RBAC roles govern Azure resources, while Microsoft Entra roles, such as Global Administrator, govern the directory itself.",
   "Zero Trust is a security model that assumes the network is not a safe place and that a breach may already have happened. Its three guiding principles are verify explicitly (always authenticate and authorize using all available data points, such as identity, location and device health), use least privilege access (just-in-time and just-enough access), and assume breach (segment access to limit how far an attacker can move, encrypt end to end, and use analytics to detect threats). It replaces the older idea that everything inside the corporate network can be trusted. MFA, Conditional Access and RBAC are the tools that put these principles into practice.",
   "Defense in depth protects information with several layers of security, so that if one layer is breached, the next can slow or stop the attack. Microsoft's model lists seven layers from the outside in: physical security (datacenter access), identity and access (MFA, SSO, RBAC), perimeter (distributed denial-of-service (DDoS) protection and perimeter firewalls), network (segmenting resources and limiting traffic, for example with network security groups), compute (securing and patching VMs), application (secure code, no secrets in code) and data (encryption and access controls on the data itself).",
   "Microsoft Defender for Cloud is a cloud-native application protection platform that combines cloud security posture management (CSPM) with cloud workload protection. It continuously assesses your resources against security best practices and a benchmark, shows a secure score, and gives prioritized recommendations such as enabling MFA, applying system updates or closing open management ports. Foundational posture features are available at no extra cost; paid Defender plans add threat protection and alerts for specific resource types, such as servers, storage, databases and containers. Defender for Cloud also covers workloads in other clouds, such as Amazon Web Services and Google Cloud, and on-premises machines connected through Azure Arc.",
   "Consider a worked example. A payments team has one subscription with separate resource groups for web, database and monitoring. You add the developers' group as Contributor on the web resource group only, the database administrators' group as Contributor on the database resource group, and the auditors' group as Reader on the subscription. Nobody except two platform engineers holds Owner. Defender for Cloud then shows a low secure score because a VM exposes port 3389 to the internet; you follow the recommendation to close it and use just-in-time VM access instead, applying least privilege at the network layer as well.",
   "Common mistakes: assigning Contributor when someone must also grant access to others (that needs Owner or User Access Administrator); assigning roles to individuals at subscription scope when a group at resource-group scope would do; confusing RBAC, which controls who can act, with Azure Policy, which controls what configurations are allowed; thinking Zero Trust means trusting everything inside the firewall (it means the opposite); and believing Defender for Cloud protects only Azure resources.",
   "Exam questions use role and scope clues. 'Manage resources but not assign permissions' is Contributor. 'View only' is Reader. 'Full control including granting access' is Owner. 'Permissions apply to all resources in the subscription' points to inheritance from a higher scope. 'Never trust, always verify' or 'assume breach' is Zero Trust. 'Multiple layers so a single failure does not expose data' is defense in depth. 'Secure score', 'security posture' or 'hardening recommendations' points to Microsoft Defender for Cloud."
  ],
  "terms": [
   [
    "Azure RBAC",
    "The authorization system that grants access to Azure resources through role assignments."
   ],
   [
    "Role assignment",
    "The combination of a security principal, a role definition and a scope."
   ],
   [
    "Scope",
    "The level where a role applies: management group, subscription, resource group or resource."
   ],
   [
    "Least privilege",
    "Granting only the minimum access needed, for the minimum scope and time."
   ],
   [
    "Zero Trust",
    "A security model built on verify explicitly, least privilege access and assume breach."
   ],
   [
    "Defense in depth",
    "Layering multiple security controls so that one failure does not expose the data."
   ],
   [
    "Microsoft Defender for Cloud",
    "A service for security posture management and threat protection across Azure, other clouds and on-premises."
   ],
   [
    "Secure score",
    "A Defender for Cloud measure of security posture that rises as you apply recommendations."
   ]
  ],
  "example": "An auditor needs to review a company's Azure configuration for two weeks. Instead of sharing an admin account, the team adds the auditor as a B2B guest, assigns the Reader role at the subscription scope, and sets the assignment to end after two weeks. The auditor can see every resource but cannot change anything, and a Conditional Access policy requires MFA for the sign-in, applying verify explicitly and least privilege together.",
  "tip": "Contributor can manage resources but cannot assign access; Owner can do both. RBAC controls who can do what; Azure Policy controls what configurations are allowed. The Zero Trust principles are verify explicitly, least privilege and assume breach.",
  "check": [
   [
    "What three parts make up an Azure role assignment?",
    "A security principal, a role definition and a scope."
   ],
   [
    "A user is given Reader on a subscription. Can they view a VM in a resource group in that subscription?",
    "Yes. Assignments are inherited by all child scopes, including resource groups and resources."
   ],
   [
    "Which defense-in-depth layer do network security groups belong to?",
    "The network layer, which limits communication between resources."
   ],
   [
    "Which service gives a secure score and hardening recommendations?",
    "Microsoft Defender for Cloud, through its cloud security posture management features."
   ]
  ]
 },
 {
  "t": "Factors that affect cost in Azure: resource type, consumption, region, bandwidth, reservations and Azure Hybrid Benefit",
  "body": [
   "Azure bills most services by consumption, so the bill is the sum of many small meters rather than one fixed fee. Understanding what drives those meters is what lets you estimate cost before you deploy and control it afterwards. The exam expects you to name the main cost factors and explain how each one raises or lowers what you pay, and to recognize the purchase options that reduce cost for steady workloads.",
   "Resource type is the first factor. Every service has its own pricing meters: a VM is billed by size and by the time it runs, plus its disks and any licensed software; a storage account is billed by the amount of data stored, its redundancy and access tier, and the number of read and write operations; a serverless function is billed by executions and resources used. Settings inside a resource matter too. A larger VM size, premium SSD disks or geo-redundant storage all cost more than their smaller or simpler alternatives, so right-sizing is one of the most effective savings.",
   "Consumption is the amount you actually use. Pay-as-you-go charges for what you use, with no commitment, which suits variable or short-lived workloads. For predictable workloads you can commit in advance. Azure Reservations commit you to a specific resource type, such as a VM size in a region, for a one-year or three-year term in return for a significant discount. Azure savings plans for compute commit you to a fixed hourly spend across eligible compute services, which gives more flexibility across sizes and regions. Spot virtual machines use Azure's spare capacity at a much lower price but can be evicted when Azure needs the capacity back, so they suit interruptible batch jobs, not production web servers. Deallocating a VM stops compute charges, though you still pay for its disks.",
   "Region matters because the same service can cost different amounts in different regions, due to local power, land, taxes and demand. Choosing a cheaper region can lower cost, provided latency, data-residency and compliance requirements are still met. Bandwidth, or network traffic, is often overlooked. Data coming into Azure (ingress) is generally free. Data leaving Azure (egress), such as users downloading files, is billed, and in many cases so is data moving between regions or between availability zones. Pricing depends on the amount transferred and on geographic billing zones.",
   "Azure Hybrid Benefit lets you use existing on-premises licenses that have active Software Assurance or qualifying subscriptions, for Windows Server and SQL Server, on Azure. You then pay a lower rate for the VM or database because the license portion of the price is removed. It also applies to some Linux subscriptions, such as Red Hat and SUSE. You turn it on when creating a VM by selecting the licensing option, or later under the VM's configuration. Other factors include products bought from Azure Marketplace, where third-party vendors add their own charges, and simple housekeeping: deleting forgotten disks, public IP addresses and test environments.",
   "Consider a worked example. A company runs a customer database on a VM around the clock, a nightly rendering job that can be restarted if interrupted, and a test environment used only during office hours. It already owns Windows Server licenses with Software Assurance. The database VM gets a three-year reservation and Azure Hybrid Benefit, cutting both compute and license cost. The rendering job moves to Spot VMs. The test environment is scheduled to shut down and deallocate each evening. The team also places the database in the same region as the web app to avoid cross-region transfer charges.",
   "Common mistakes: assuming a stopped VM costs nothing (you must deallocate it, and disks still bill); thinking all network traffic is charged (inbound is generally free); treating Reservations and Hybrid Benefit as the same thing (one is a time commitment, the other reuses licenses you already own, and they can be combined); running production on Spot VMs; and choosing a region purely on price while ignoring data-residency rules or latency for users.",
   "Exam questions use clear clue words. 'Commit for one or three years for a discount' points to Reservations. 'Reuse existing Windows Server or SQL Server licenses with Software Assurance' points to Azure Hybrid Benefit. 'Interruptible workload at the lowest price' points to Spot VMs. 'Data uploaded to Azure' is generally free, while 'data downloaded by users' incurs egress charges. 'Same service, different price' points to region. 'Larger size or premium tier' points to resource type."
  ],
  "terms": [
   [
    "Pay-as-you-go",
    "Paying only for the resources you consume, with no upfront commitment."
   ],
   [
    "Azure Reservations",
    "A one-year or three-year commitment to a specific resource in return for a discounted rate."
   ],
   [
    "Azure savings plan for compute",
    "A commitment to a fixed hourly spend across eligible compute services in exchange for lower prices."
   ],
   [
    "Spot virtual machine",
    "A VM using spare capacity at a low price that can be evicted when Azure needs the capacity."
   ],
   [
    "Ingress and egress",
    "Data entering Azure (generally free) and data leaving Azure (billed)."
   ],
   [
    "Azure Hybrid Benefit",
    "Using existing Windows Server, SQL Server or some Linux licenses on Azure to reduce cost."
   ],
   [
    "Deallocate",
    "Stopping a VM so its compute resources are released and compute billing stops."
   ]
  ],
  "example": "A video platform's Azure bill jumps unexpectedly. Investigation shows most of the increase is egress, because a popular video is being downloaded millions of times directly from Blob storage. Uploads cost nothing, but every download adds outbound bandwidth charges. The team serves the video through a content delivery network with caching and reviews its pricing, and it right-sizes several oversized VMs that were running at low CPU all month.",
  "tip": "Inbound data transfer is generally free; outbound is billed. Reservations reward a long-term commitment; Hybrid Benefit reuses licenses you already own. The same service can cost different amounts in different regions, and a stopped VM must be deallocated to stop compute charges.",
  "check": [
   [
    "A company has Windows Server licenses with Software Assurance. How can it lower VM costs in Azure?",
    "Apply Azure Hybrid Benefit so the license portion of the VM price is removed."
   ],
   [
    "Which purchase option suits a VM that must run continuously for the next three years?",
    "An Azure Reservation, which gives a discount for a one-year or three-year commitment."
   ],
   [
    "Is uploading data into Azure usually billed?",
    "No. Ingress is generally free; egress (data leaving Azure) is billed."
   ],
   [
    "Why are Spot VMs unsuitable for a production web server?",
    "They can be evicted at short notice when Azure needs the capacity back."
   ]
  ]
 },
 {
  "t": "The Pricing Calculator vs the Total Cost of Ownership (TCO) Calculator",
  "body": [
   "Before anyone approves a cloud project, someone asks what it will cost. Microsoft provides two free web-based calculators for answering that question, and the exam often describes a situation and asks which one fits. Neither calculator requires an Azure subscription, neither deploys anything, and both produce estimates rather than binding prices. The difference is the question each one answers, so learning that question is the whole trick.",
   "The Azure Pricing Calculator estimates the cost of Azure services you plan to deploy. You add products, such as a virtual machine, a storage account and an Azure SQL database, and configure each one: the region, size or tier, number of instances, hours of use per month, redundancy, support plan and purchase option, such as pay-as-you-go, a one-year or three-year reservation, or Azure Hybrid Benefit. The calculator then shows an estimated monthly cost and any upfront cost for each item and a total. You can save the estimate, share a link with colleagues, or export it to a spreadsheet.",
   "Because each setting changes the estimate immediately, the Pricing Calculator is also a good way to compare options. You can clone an estimate and change only the region, the VM size, or the redundancy from LRS to GRS, and see how much each choice adds. It is the tool to use when you are designing a new Azure solution, sizing a proof of concept, or deciding between pay-as-you-go and a reservation.",
   "The Total Cost of Ownership (TCO) Calculator compares the cost of running your current on-premises infrastructure with the cost of running the same workloads in Azure. Using it takes three steps. First, you define your workloads: the number of servers and their cores and memory, databases, storage capacity and type, and network bandwidth. Second, you adjust assumptions, such as the cost of electricity, IT labor hourly rates, datacenter space, hardware and software costs and whether you already own licenses. Third, you view the report, which shows the estimated costs and savings over a period of several years, including the on-premises costs you would avoid, such as power, cooling, hardware replacement and maintenance.",
   "The key difference is the question each tool answers. The Pricing Calculator answers 'How much will these Azure resources cost per month?' The TCO Calculator answers 'How much could I save by moving my existing datacenter workloads to Azure?' The TCO Calculator is therefore most useful when building a business case for migration and speaking to finance, while the Pricing Calculator is the day-to-day design tool. Neither tool shows your actual spending. For real costs of deployed resources you use Microsoft Cost Management, which reports what you have spent and forecasts future spending.",
   "Consider a worked example. A manufacturing company runs forty servers in a leased datacenter whose contract ends in eighteen months. The chief financial officer wants to know whether moving to Azure would save money over the next few years. The infrastructure team enters the servers, storage and bandwidth into the TCO Calculator, adjusts the electricity and labor assumptions to match their real bills, and presents the savings report. Once the migration is approved, the architects use the Pricing Calculator to price the exact VM sizes, storage accounts and backup they will deploy, and to compare reservations against pay-as-you-go. After go-live, the finance team tracks real spending in Cost Management.",
   "Common mistakes: using the TCO Calculator to price a brand-new cloud-only application (there is no on-premises environment to compare, so use the Pricing Calculator); thinking either calculator shows your actual bill (only Cost Management does); treating calculator output as a quote (it is an estimate, and real usage, taxes and agreements change the final figure); and forgetting that you do not need a subscription to use either calculator. Another trap is ignoring assumptions in the TCO report: if the default labor or power costs do not match your situation, the savings figure will be misleading.",
   "Exam questions are usually easy to decode once you look for the comparison. 'Compare on-premises costs with Azure', 'business case for migration' or 'estimate savings from moving the datacenter' points to the TCO Calculator. 'Estimate the monthly cost of a VM and storage account', 'price a new solution' or 'compare the cost of two regions' points to the Pricing Calculator. 'What did we actually spend last month' or 'forecast this month's bill' points to Cost Management."
  ],
  "terms": [
   [
    "Azure Pricing Calculator",
    "A free web tool that estimates the cost of specific Azure services you plan to deploy."
   ],
   [
    "Total Cost of Ownership (TCO) Calculator",
    "A free web tool that compares on-premises infrastructure costs with running the same workloads in Azure."
   ],
   [
    "Estimate",
    "A projected cost based on your inputs, not a binding price or actual bill."
   ],
   [
    "Assumptions",
    "TCO inputs such as electricity cost, labor rates and datacenter space that shape the savings report."
   ],
   [
    "Business case",
    "A justification for a project, often built with the TCO Calculator for migrations."
   ],
   [
    "Microsoft Cost Management",
    "The service that reports actual and forecast Azure spending, unlike the calculators."
   ]
  ],
  "example": "A startup is building a new cloud-only web app and has no servers of its own. The founder opens the Pricing Calculator, adds an App Service plan, an Azure SQL database and a storage account in the region nearest its customers, and compares pay-as-you-go against a one-year reservation for the database. She exports the estimate to share with an investor. The TCO Calculator would not help here, because there is no on-premises environment to compare against.",
  "tip": "Comparing on-premises with Azure, or building a migration business case: TCO Calculator. Estimating the cost of specific Azure resources: Pricing Calculator. Seeing what you actually spent: Cost Management. Neither calculator needs a subscription.",
  "check": [
   [
    "An IT director wants to show leadership how much the company could save by closing its datacenter and moving to Azure. Which tool fits?",
    "The TCO Calculator, which compares on-premises costs with Azure costs over several years."
   ],
   [
    "A developer wants to know the monthly cost of two VMs and a storage account in a particular region. Which tool fits?",
    "The Azure Pricing Calculator, which estimates the cost of specific Azure services."
   ],
   [
    "Do you need an Azure subscription to use the Pricing Calculator?",
    "No. Both calculators are free web tools that do not require a subscription."
   ],
   [
    "Which tool shows what your deployed resources actually cost last month?",
    "Microsoft Cost Management, because the calculators only produce estimates."
   ]
  ]
 },
 {
  "t": "Microsoft Cost Management: cost analysis, budgets and alerts, and using tags to track spending",
  "body": [
   "Microsoft Cost Management is the built-in service for monitoring, allocating and optimizing what you spend in Azure. It appears in the Azure portal as Cost Management + Billing, works for subscriptions, resource groups, management groups and billing accounts, and its core features come at no extra cost. Where the calculators estimate, Cost Management reports actual spending and forecasts future spending, which makes it the place you go after resources are deployed. Access follows RBAC: roles such as Cost Management Reader or Cost Management Contributor let finance staff see costs without being able to change resources.",
   "Cost analysis lets you explore your costs visually. You pick a scope, then view accumulated costs for a period, see a forecast for the rest of the month, and group or filter costs by service, resource group, resource, location or tag. Built-in views show daily costs, costs by service and costs by resource, and you can save your own views and pin them to dashboards. This quickly answers questions such as 'Which resource group cost the most last month?' or 'Why did our bill jump on Tuesday?'",
   "Budgets let you set a spending amount for a scope, such as a subscription or resource group, over a period such as a month, quarter or year. You then define alert conditions, for example at 50%, 80% and 100% of the budget, based on actual or forecast cost. When a threshold is reached, Cost Management sends email notifications and can trigger an Azure Monitor action group, which can run automation such as a runbook that shuts down development VMs. A budget on its own does not stop resources or cap spending; it warns you, and any stopping has to be automated deliberately. You can also create a budget from the command line, for example with `az consumption budget create`.",
   "Cost Management has other alert types too. Budget alerts fire when spending crosses a budget threshold. Credit alerts warn when prepaid Azure credit is being used up. Department spending quota alerts apply to some enterprise agreements. Anomaly alerts can flag unusual changes in daily spending. Cost Management also surfaces Azure Advisor cost recommendations, such as resizing underused VMs, and can export cost data on a schedule to a storage account for reporting in other tools.",
   "Tags help you track spending by business meaning rather than by technical structure. A tag is a name-value pair, such as `CostCenter: Marketing` or `Environment: Production`, applied to subscriptions, resource groups or resources. In cost analysis you then group by tag to see what each department, project or environment costs, even when a project's resources are spread across several resource groups. You can add a tag in the portal on the resource's Tags page or with `az tag create --resource-id <id> --tags CostCenter=Marketing`. Tags also help operations, such as marking which VMs can be shut down at night. Tags are not inherited automatically by resources from their resource group or subscription. If you want every resource to carry a tag, use Azure Policy to require a tag, add a default one, or inherit it from the resource group. Cost Management also offers a tag inheritance setting that applies resource-group and subscription tags to cost records for reporting purposes, without changing the resources themselves.",
   "Consider a worked example. A company's marketing and research teams share one subscription. Finance wants each team's cost and an early warning before spending runs away. You apply a `CostCenter` tag to every resource, enforced by an Azure Policy that denies resources without it. In cost analysis you group by the `CostCenter` tag to produce a monthly report per team. You then create a monthly budget on the subscription with alerts at 80% of forecast cost and 100% of actual cost, emailing the finance lead and triggering an action group that stops development VMs outside office hours.",
   "Common mistakes: expecting a budget to block spending automatically (it alerts; automation must be added); assuming tags flow down from resource groups (they do not by default); confusing Cost Management, which shows actual costs, with the Pricing Calculator, which estimates them; and relying on resource groups alone for chargeback when one project spans several groups.",
   "Exam wording: 'notify when spending reaches a threshold' points to budgets and alerts; 'see which service or resource group costs the most' points to cost analysis; 'track costs by department or project' points to tags; 'ensure every resource has a tag' points to Azure Policy; 'forecast spending' points to Cost Management."
  ],
  "terms": [
   [
    "Microsoft Cost Management",
    "The Azure service for analyzing, monitoring, allocating and optimizing actual cloud spending."
   ],
   [
    "Cost analysis",
    "The Cost Management view for exploring, grouping and filtering costs and forecasts."
   ],
   [
    "Budget",
    "A spending amount for a scope and period that triggers alerts at chosen thresholds."
   ],
   [
    "Budget alert",
    "A notification sent when actual or forecast cost crosses a budget threshold."
   ],
   [
    "Action group",
    "An Azure Monitor collection of notifications and automated actions triggered by alerts."
   ],
   [
    "Tag",
    "A name-value pair applied to resources, resource groups or subscriptions to organize and report on them."
   ],
   [
    "Chargeback",
    "Allocating cloud costs back to the departments or projects that incurred them."
   ]
  ],
  "example": "A university gives each research lab its own resource group and a monthly budget with alerts at 75% and 100%. One lab accidentally leaves a large GPU VM running over a holiday. On day eight the forecast alert fires and emails the lab manager, who deallocates the VM. Because the budget only alerts, the university later adds an action group that automatically stops VMs tagged `AutoShutdown: Yes` when the budget hits 100%.",
  "tip": "Budgets alert; they do not stop spending by themselves. Tags are not inherited by default; use Azure Policy to require or inherit them. Cost Management shows actual and forecast spending, unlike the calculators, which only estimate.",
  "check": [
   [
    "A manager wants an email when a subscription reaches 90% of its monthly spending target. What should you configure?",
    "A budget in Cost Management with an alert condition at 90%."
   ],
   [
    "Will a budget automatically stop resources when it is exceeded?",
    "No. Budgets send alerts; stopping resources requires automation such as an action group."
   ],
   [
    "How can you report costs per project when a project's resources are spread across several resource groups?",
    "Apply a project tag to the resources and group by that tag in cost analysis."
   ],
   [
    "A tag is applied to a resource group. Do the resources inside automatically receive it?",
    "No. Tags are not inherited by default; use Azure Policy to add or inherit them."
   ]
  ]
 },
 {
  "t": "Microsoft Purview for data governance, and the Service Trust Portal for compliance reports",
  "body": [
   "Governance and compliance are related but different needs. Data governance is knowing what data you have, where it lives, who uses it and how sensitive it is, and applying rules to it. Compliance is proving that you meet laws, regulations and industry standards, such as data protection laws or payment card rules. AZ-900 covers one Microsoft offering for each area: Microsoft Purview for governing and protecting your own data, and the Service Trust Portal for evidence about how Microsoft's cloud meets standards.",
   "Microsoft Purview is a family of data governance, risk and compliance solutions that gives you a single, unified view of your data. Purview connects to data sources across on-premises systems, multiple clouds and software-as-a-service (SaaS) applications, such as Azure SQL Database, Azure Data Lake Storage, on-premises SQL Server and Amazon S3. It automatically discovers and scans them, builds a map of your data estate, classifies sensitive data such as credit card or national identity numbers, and tracks data lineage, which shows where data came from and how it has moved and been transformed on its way to a report.",
   "Purview is often described in two broad areas. The risk and compliance side, closely tied to Microsoft 365, protects sensitive data across Teams, OneDrive, SharePoint, Exchange and devices. It includes sensitivity labels, data loss prevention (DLP) policies that stop sensitive data from leaving the organization, data lifecycle and retention management, insider risk management, eDiscovery and audit. The unified data governance side helps you manage data across on-premises, multicloud and SaaS sources, with a data catalog so analysts can search for trustworthy data by business term, and insights into where sensitive data is stored.",
   "The Service Trust Portal is a Microsoft site that provides information, tools and documents about how Microsoft cloud services handle security, privacy and compliance. Its most important use for AZ-900 is access to audit reports: independent third-party reports on Microsoft cloud services against standards such as ISO/IEC 27001 (information security management), System and Organization Controls (SOC) 1, 2 and 3, and the Payment Card Industry Data Security Standard (PCI DSS), plus whitepapers, penetration test summaries, data protection resources and regional compliance documents. Some content is public; to download many reports you sign in with your organization's work account and accept the terms.",
   "The two tools answer different questions, and they reflect the shared responsibility model. Microsoft's audits prove that Microsoft's part of the cloud, such as its datacenters, hardware and platform services, meets a standard. You still have to configure your own resources and handle your own data compliantly. Purview helps with your side of that line; the Service Trust Portal documents Microsoft's side. A related tool, Microsoft Purview Compliance Manager, helps you track your own compliance tasks against regulations with a compliance score, which is useful context but separate from the Service Trust Portal's downloadable reports.",
   "Consider a worked example. A healthcare company is preparing for an external audit. The auditor asks for proof that the cloud provider hosting its patient data is certified against ISO/IEC 27001 and has a current SOC 2 report. A compliance officer signs in to the Service Trust Portal, downloads both reports and hands them over. The auditor then asks where patient data lives across the company's systems. The data team uses Microsoft Purview to scan its Azure SQL databases, data lake and on-premises file shares, classify records containing health identifiers, and show lineage from the source systems to the analytics dashboards.",
   "Common mistakes: going to the Service Trust Portal to find your own sensitive data (it holds Microsoft's documents, not yours); expecting Purview to provide Microsoft's certification reports; assuming that Microsoft's compliance certificates make your workload automatically compliant (they cover Microsoft's responsibilities only); and confusing Purview with Azure Policy. Azure Policy governs resource configurations, such as allowed regions, while Purview governs the data itself.",
   "Exam questions are usually worded around who owns the evidence. 'Discover, classify and map data across on-premises, multicloud and SaaS', 'data lineage', 'data catalog' or 'sensitive data such as credit card numbers' points to Microsoft Purview. 'Download Microsoft's audit reports', 'ISO or SOC reports for Azure' or 'how Microsoft protects customer data' points to the Service Trust Portal. If the question is about restricting resource settings, the answer is Azure Policy instead."
  ],
  "terms": [
   [
    "Data governance",
    "Knowing what data you have, where it is and how it is used, and applying rules to it."
   ],
   [
    "Microsoft Purview",
    "A family of solutions for data governance, risk and compliance across on-premises, multicloud and SaaS data."
   ],
   [
    "Data lineage",
    "A record of where data originated and how it moved and changed across systems."
   ],
   [
    "Data classification",
    "Automatically identifying and labeling data by type or sensitivity, such as credit card numbers."
   ],
   [
    "Data loss prevention (DLP)",
    "Policies that detect and prevent sensitive data from leaving the organization."
   ],
   [
    "Service Trust Portal",
    "Microsoft's site for audit reports, compliance documents and information about how Microsoft cloud services protect data."
   ],
   [
    "Audit report",
    "An independent assessment showing that a service meets a standard such as ISO/IEC 27001 or SOC 2."
   ]
  ],
  "example": "A bank's risk team must show regulators where customer account numbers are stored and how they reach monthly reports. They register their data warehouse, data lake and on-premises databases in Microsoft Purview, which scans them, classifies columns containing account numbers and displays lineage from source to report. Separately, the regulator requests Microsoft's latest SOC reports for Azure, which the compliance team downloads from the Service Trust Portal.",
  "tip": "Finding, classifying and tracing lineage of your own data across locations: Microsoft Purview. Downloading Microsoft's compliance and audit reports such as ISO or SOC: Service Trust Portal. Microsoft's certifications cover only Microsoft's side of shared responsibility.",
  "check": [
   [
    "An auditor needs Microsoft's SOC 2 report for Azure. Where do you get it?",
    "The Service Trust Portal, which provides Microsoft's audit reports and compliance documents."
   ],
   [
    "Which service can scan data sources across Azure, on-premises and other clouds and show data lineage?",
    "Microsoft Purview."
   ],
   [
    "Does Azure's ISO/IEC 27001 certification make your application compliant automatically?",
    "No. It covers Microsoft's responsibilities; you must still configure and manage your own resources and data compliantly."
   ],
   [
    "How does Purview differ from Azure Policy?",
    "Purview governs data (discovery, classification, lineage, protection); Azure Policy governs resource configurations."
   ]
  ]
 },
 {
  "t": "Azure Policy: definitions, initiatives, assignments and compliance",
  "body": [
   "Azure Policy is a service that helps you enforce organizational standards and assess compliance at scale. Where role-based access control (RBAC) controls who can do something, Azure Policy controls what can be created and how resources must be configured, no matter who is doing it, even an Owner. For example, a policy can allow resources only in certain regions to meet data-residency rules, require a tag on every resource group, allow only specific VM sizes to control cost, or require that storage accounts accept only HTTPS traffic. It is one of the core governance tools on the exam, alongside management groups, locks and tags.",
   "A policy definition describes a rule: a condition to evaluate and an effect to apply when a resource matches. Definitions are written in JSON with an `if` block and a `then` block, and Azure provides hundreds of built-in definitions, such as 'Allowed locations' and 'Require a tag on resources'. Common effects include Deny, which blocks a create or update request that breaks the rule; Audit, which allows the request but marks the resource as non-compliant; Append and Modify, which add or change properties such as tags; AuditIfNotExists and DeployIfNotExists, which check for, or deploy, a related resource or setting that is missing; and Disabled, which turns the rule off. A simplified rule looks like this:",
   "```json\n\"if\": { \"not\": { \"field\": \"location\", \"in\": \"[parameters('allowedLocations')]\" } },\n\"then\": { \"effect\": \"deny\" }\n```",
   "An initiative, also called a policy set, groups several related policy definitions so you can manage and assign them as one unit toward a single goal. For example, an initiative for a security benchmark might contain dozens of definitions covering encryption, logging and network rules, and there are built-in initiatives for regulatory standards. Microsoft Defender for Cloud uses a built-in initiative, the Microsoft cloud security benchmark, to drive its recommendations. A definition or initiative does nothing until you create an assignment, which applies it to a scope: a management group, subscription or resource group. Assignments are inherited by all child scopes, so assigning a policy at a management group covers every subscription, resource group and resource beneath it. You can exclude specific child scopes, and you set parameter values, such as the list of allowed regions, at assignment time. In the portal you open Policy, choose Definitions, pick one and select Assign; from the CLI you can run `az policy assignment create`.",
   "Azure Policy evaluates resources when they are created or updated, when an assignment changes, and periodically for existing resources. The Compliance page shows the percentage of compliant resources and lists each non-compliant resource with the reason. For policies using Modify or DeployIfNotExists, you can create remediation tasks that fix existing non-compliant resources, for example adding a missing tag to hundreds of resources at once. Existing resources are not deleted or blocked when you assign a Deny policy; they are reported as non-compliant, and the Deny applies to future creates and updates.",
   "Consider a worked example. A European company must keep all data in two European regions and wants every resource tagged with a cost center. You create an initiative containing 'Allowed locations' with Deny, set to the two regions, and 'Require a tag on resources' with Deny for the `CostCenter` tag. You assign the initiative to the company's top management group. A developer then tries to create a VM in a US region and the request fails with a policy error. The compliance view shows a few older resources without the tag, so you add an inherit-tag policy with Modify and run a remediation task.",
   "Common mistakes: confusing Policy with RBAC (an Owner can still be blocked by a Deny policy); expecting a new Deny policy to delete existing non-compliant resources (it reports them); forgetting that a definition has no effect until it is assigned; and mixing up Policy with resource locks, which protect specific resources from deletion or change rather than enforcing configuration rules.",
   "Exam wording: 'ensure resources are created only in certain regions', 'enforce standards', 'only allow certain VM sizes' or 'report non-compliant resources' points to Azure Policy. 'Group several policies' points to an initiative. 'Apply a policy to a scope' points to an assignment. 'Block' is the Deny effect; 'allow but flag' is Audit."
  ],
  "terms": [
   [
    "Azure Policy",
    "A service that enforces rules on resource configurations and reports compliance across scopes."
   ],
   [
    "Policy definition",
    "A JSON rule describing a condition and the effect to apply when a resource matches."
   ],
   [
    "Effect",
    "The action a policy takes, such as Deny, Audit, Modify or DeployIfNotExists."
   ],
   [
    "Initiative (policy set)",
    "A group of related policy definitions managed and assigned as one unit."
   ],
   [
    "Assignment",
    "The application of a definition or initiative to a scope, with parameters and optional exclusions."
   ],
   [
    "Compliance state",
    "Whether a resource meets the assigned policies, shown on the Compliance page."
   ],
   [
    "Remediation task",
    "A job that brings existing non-compliant resources into compliance using Modify or DeployIfNotExists."
   ]
  ],
  "example": "A retail company discovered staff creating expensive GPU VMs for experiments. The cloud team assigns the built-in 'Allowed virtual machine size SKUs' policy with a list of approved sizes to the subscription. From then on, any attempt to deploy a GPU size is denied with a clear policy message, while existing VMs are shown as non-compliant so the team can review and resize them.",
  "tip": "Policy is about what is allowed (configuration); RBAC is about who can act. An initiative groups definitions; an assignment applies them to a scope. Deny blocks non-compliant changes; Audit only reports them. Policies apply even to Owners.",
  "check": [
   [
    "A company wants to prevent anyone from creating resources outside two approved regions. What should it use?",
    "Azure Policy with the Allowed locations definition and the Deny effect, assigned at a suitable scope."
   ],
   [
    "What is an initiative in Azure Policy?",
    "A group of related policy definitions managed and assigned together toward one goal."
   ],
   [
    "A Deny policy for a required tag is assigned. What happens to existing resources without the tag?",
    "They are reported as non-compliant but are not deleted; the Deny applies to new creates and updates."
   ],
   [
    "A user has the Owner role. Can Azure Policy still block their deployment?",
    "Yes. Policy evaluates the resource configuration regardless of the user's role."
   ]
  ]
 },
 {
  "t": "Resource locks: CanNotDelete vs ReadOnly and how they inherit",
  "body": [
   "Even with careful role-based access control (RBAC), a person with the right role can accidentally delete or change an important resource, for example by removing the wrong resource group while cleaning up test environments. Resource locks add a safety net: they prevent resources from being deleted or modified, regardless of the user's role, until the lock is removed. Locks are one of the governance features in Azure, alongside Azure Policy and tags, and they are especially valuable for production databases, networking resources and anything that would take a long time to rebuild.",
   "There are two lock levels. CanNotDelete, shown in the portal as Delete, means authorized users can still read and modify the resource, but they cannot delete it. ReadOnly, shown as Read-only, means authorized users can read the resource but cannot update or delete it; the effect is similar to limiting every user to the permissions of the Reader role for that resource. You add a lock in the portal on the resource's, resource group's or subscription's Locks page, or from the command line, for example `az lock create --name keep-db --lock-type CanNotDelete --resource-group rg-prod` or `New-AzResourceLock -LockName keep-db -LockLevel CanNotDelete -ResourceGroupName rg-prod` in Azure PowerShell.",
   "You can apply a lock at the subscription, resource group or resource level. Locks are inherited: a lock on a resource group applies to every resource in that group, including resources added later. When several locks apply, the most restrictive one wins, so a ReadOnly lock on a resource group overrides a CanNotDelete lock on a resource inside it. A lock on a resource group also stops the resource group itself from being deleted, which protects everything in it from a single careless delete.",
   "Locks apply to everyone, including Owners. To delete a locked resource you must first remove the lock, which requires permission to manage locks, specifically the `Microsoft.Authorization/locks/*` actions; among built-in roles, only Owner and User Access Administrator have them. This extra step is deliberate: it forces a conscious decision before destructive changes and prevents mistakes made in a hurry. It also means you can let a team manage resources as Contributors while ensuring they cannot remove the locks that protect production.",
   "Locks apply to management operations sent through Azure Resource Manager, known as the control plane, not to operations on the data inside a resource, known as the data plane. A ReadOnly lock on a storage account does not stop someone with data access from uploading or deleting blobs, but it does block changes to the account's settings. A ReadOnly lock on a SQL server blocks changing the server but still allows reading and writing database data. ReadOnly locks can also have surprising side effects, because some actions that look like reads are management operations that use POST requests; for example, listing a storage account's access keys is blocked, which can break tools that rely on those keys. Test ReadOnly locks before using them widely.",
   "Consider a worked example. A company's production resource group holds a virtual network, a SQL database and several VMs. The operations team wants to scale VMs and change settings freely but never delete anything by accident. You apply a CanNotDelete lock to the resource group. Months later, an engineer running a cleanup script tries to delete the whole group and the request fails with a lock error, so nothing is lost. For a network configuration that must not change at all during an audit period, you apply a ReadOnly lock to the virtual network for the duration of the audit.",
   "Common mistakes: thinking CanNotDelete blocks changes (it only blocks deletion); believing Owners can ignore locks (they must remove the lock first); expecting locks to protect the data inside a resource, such as blobs or table rows (they protect the resource's management operations); and confusing locks with Azure Policy. Policy controls which configurations are allowed across many resources; locks protect specific existing resources from deletion or change.",
   "Exam questions are usually short. 'Prevent accidental deletion but allow changes' points to CanNotDelete. 'Prevent any changes and deletion' points to ReadOnly. 'A resource group has a ReadOnly lock and a resource inside has CanNotDelete; what can you do?' points to inheritance and the most restrictive lock, so you can only read. 'An Owner cannot delete a resource' usually means there is a lock that must be removed first."
  ],
  "terms": [
   [
    "Resource lock",
    "A setting that prevents a resource from being deleted or modified regardless of the user's role."
   ],
   [
    "CanNotDelete",
    "A lock level that allows reading and modifying a resource but blocks deletion."
   ],
   [
    "ReadOnly",
    "A lock level that allows reading a resource but blocks updates and deletion."
   ],
   [
    "Lock inheritance",
    "A lock at a subscription or resource group applies to all resources within it, including new ones."
   ],
   [
    "Control plane",
    "Management operations on resources handled by Azure Resource Manager, which locks affect."
   ],
   [
    "Data plane",
    "Operations on the data inside a resource, such as reading or writing blobs, which locks do not block."
   ]
  ],
  "example": "A startup's lead engineer deletes what she thinks is a test resource group, but it holds the production database. After restoring from backup, the company applies CanNotDelete locks to all production resource groups and gives developers the Contributor role, which cannot remove locks. Now any deletion requires an Owner to remove the lock first, a step that makes people stop and check what they are deleting.",
  "tip": "CanNotDelete still allows changes; ReadOnly blocks changes and deletion. Locks apply even to Owners and are inherited by child resources, with the most restrictive lock winning. To delete a locked resource, remove the lock first.",
  "check": [
   [
    "Which lock allows an administrator to resize a VM but not delete it?",
    "CanNotDelete, which blocks deletion but allows modification."
   ],
   [
    "A resource group has a CanNotDelete lock. Is a VM added to the group next week protected?",
    "Yes. Locks are inherited by all resources in the scope, including ones added later."
   ],
   [
    "An Owner tries to delete a resource with a ReadOnly lock. What happens?",
    "The request fails; the Owner must remove the lock before deleting the resource."
   ],
   [
    "Does a ReadOnly lock on a storage account stop users from uploading blobs?",
    "No. Locks affect management (control plane) operations, not data plane operations such as writing blobs."
   ]
  ]
 },
 {
  "t": "Tools for interacting with Azure: the portal, Azure Cloud Shell, Azure CLI and Azure PowerShell",
  "body": [
   "You can manage Azure through several tools. They all send requests to the same place, Azure Resource Manager, so whatever you create with one tool can be viewed and managed with any other, and the same RBAC permissions, policies and locks apply. The choice depends on the task, on whether you need to repeat it, and on which language you are comfortable with. The exam expects you to know what each tool is and to recognize a command from each. The Azure portal is a web-based, unified console. You sign in from a browser and create, configure and monitor resources through menus, forms and blades; build and share custom dashboards; and view costs, alerts and health. It is ideal for learning, exploring, one-off tasks and seeing things visually, and it has good accessibility features. It is less suited to repeating a task many times, because clicking through forms by hand is slow and easy to get slightly wrong each time. Microsoft also offers the Azure mobile app for monitoring resources, checking alerts and running quick actions from a phone.",
   "Azure Cloud Shell is a browser-based shell that you open from the icon in the portal toolbar or directly in a browser. It gives you a choice of Bash or PowerShell, is already authenticated with your Azure account, and has the Azure CLI, Azure PowerShell, text editors, Git and other common tools preinstalled, so there is nothing to install or update on your own computer. Cloud Shell can mount an Azure Files share to keep your scripts and files between sessions, or run as an ephemeral session without storage. It suits administrators who work from different computers or from locked-down machines where they cannot install software.",
   "The Azure CLI is a cross-platform command-line tool that runs on Windows, macOS and Linux. Its commands start with `az`, followed by a group and an action, and it is popular with people who use Bash and for scripting. Azure PowerShell is a set of modules, known as the Az module, that adds cmdlets for managing Azure to PowerShell. Cmdlets follow a Verb-Noun pattern with `Az` in the noun, and it is popular with Windows administrators, although PowerShell also runs on macOS and Linux. The same tasks look like this in each tool:",
   "```bash\n# Azure CLI\naz login\naz group create --name rg-demo --location eastus\naz vm list --output table\n\n# Azure PowerShell\nConnect-AzAccount\nNew-AzResourceGroup -Name rg-demo -Location eastus\nGet-AzVM\n```",
   "Azure CLI and Azure PowerShell can do broadly the same things; the choice is mostly about the language and skills of your team. Both can be used interactively, typing one command at a time, or in scripts that automate a sequence of steps, and both are available inside Cloud Shell and can be installed locally. For repeatable deployments of whole environments you would go further to infrastructure as code with ARM templates or Bicep, covered in a later lesson. A useful rule of thumb: use the portal to learn and explore, then capture anything you will do more than once as a CLI or PowerShell script.",
   "Consider a worked example. A new administrator explores Azure by creating a storage account in the portal, which helps her see all the options. The next week she must create the same resource group, network and three VMs in each of five regions. Doing that by hand would take hours and invite typos, so she writes an Azure CLI script and runs it from Cloud Shell on a borrowed laptop where she cannot install anything. Her colleague, who has years of PowerShell experience, writes the equivalent with `New-AzVM` cmdlets. Both approaches produce the same resources because both go through Resource Manager.",
   "Common mistakes: thinking Cloud Shell is a separate language (it is a hosted environment where you run Bash with the Azure CLI or PowerShell with the Az module); believing the Azure CLI only runs on Linux or PowerShell only on Windows (both are cross-platform); and assuming the portal cannot automate anything (it can, but scripting is the better fit for repetition).",
   "Exam wording: a command starting with `az` is Azure CLI; a Verb-AzNoun cmdlet such as `Get-AzVM` is Azure PowerShell; 'graphical interface' or 'dashboards' points to the portal; 'no local installation' or 'browser-based command line' points to Cloud Shell; 'automate repetitive tasks' points to CLI or PowerShell scripts."
  ],
  "terms": [
   [
    "Azure portal",
    "A web-based graphical console for creating, managing and monitoring Azure resources."
   ],
   [
    "Azure Cloud Shell",
    "A browser-based, pre-authenticated shell offering Bash or PowerShell with Azure tools preinstalled."
   ],
   [
    "Azure CLI",
    "A cross-platform command-line tool for Azure whose commands begin with az."
   ],
   [
    "Azure PowerShell",
    "The Az PowerShell module providing Verb-AzNoun cmdlets for managing Azure."
   ],
   [
    "Cmdlet",
    "A PowerShell command following a Verb-Noun pattern, such as Get-AzVM."
   ],
   [
    "Azure mobile app",
    "A phone app for monitoring Azure resources and running quick actions."
   ],
   [
    "Azure Resource Manager",
    "The management layer that every Azure tool sends its requests through."
   ]
  ],
  "example": "A consultant visits a client whose laptops block software installation. She needs to list all VMs and restart two of them. From the client's browser she opens Azure Cloud Shell, which is already signed in, chooses Bash and runs `az vm list --output table` followed by `az vm restart`. Nothing was installed locally, and her scripts saved in the Cloud Shell file share will be there next time.",
  "tip": "Commands starting with az are Azure CLI; Verb-AzNoun cmdlets such as Get-AzVM are Azure PowerShell. Cloud Shell needs no local installation and supports both Bash and PowerShell. Every tool goes through Azure Resource Manager.",
  "check": [
   [
    "Which tool does the command New-AzResourceGroup belong to?",
    "Azure PowerShell, because it is a Verb-AzNoun cmdlet from the Az module."
   ],
   [
    "An administrator must manage Azure from a computer where she cannot install software. Which tool fits?",
    "Azure Cloud Shell, which runs in the browser with the CLI and PowerShell preinstalled."
   ],
   [
    "Can resources created in the portal be managed later with the Azure CLI?",
    "Yes. All tools go through Azure Resource Manager, so resources are the same regardless of the tool."
   ],
   [
    "Which shells can you choose in Azure Cloud Shell?",
    "Bash or PowerShell."
   ]
  ]
 },
 {
  "t": "Azure Arc for managing on-premises and multicloud resources",
  "body": [
   "Most organizations do not run everything in Azure. They have servers in their own datacenters, branch offices and edge locations such as factories or shops, and sometimes workloads in other public clouds. Managing each environment with separate tools makes it hard to apply consistent security, compliance and monitoring, and it leaves gaps nobody notices. Azure Arc extends Azure's management and governance to resources outside Azure, so you can use the same tools and rules everywhere.",
   "Azure Arc works by projecting non-Azure resources into Azure Resource Manager. For a server, you install the lightweight Azure Connected Machine agent, usually by generating an onboarding script in the portal under Azure Arc, then Machines, then Add; for a Kubernetes cluster, you connect it with a command such as `az connectedk8s connect --name my-cluster --resource-group rg-arc`. The resource then appears in the Azure portal as an Azure resource with its own resource ID, placed in a subscription and resource group like any other. The workload itself keeps running exactly where it is; Arc does not migrate it, copy it or change where its data lives.",
   "Once a resource is Arc-enabled, you can manage it with familiar Azure tools. You can organize it with resource groups and tags, control who can manage it with Azure role-based access control (RBAC), apply and audit Azure Policy (including guest configuration settings inside the operating system), monitor it with Azure Monitor, protect it with Microsoft Defender for Cloud, and keep it patched with Azure Update Manager. This gives you a single pane of glass across on-premises, edge and multicloud environments, with one inventory and one set of compliance reports.",
   "Azure Arc can manage several resource types. Arc-enabled servers covers physical and virtual Windows and Linux servers running outside Azure, whether in your datacenter or in another cloud. Arc-enabled Kubernetes covers Kubernetes clusters hosted anywhere, and lets you deploy configurations to them from Git repositories. Arc-enabled SQL Server extends Azure management to SQL Server instances outside Azure, and Arc-enabled data services let you run some Azure data services, such as Azure SQL Managed Instance, on your own infrastructure. Arc can also connect virtualization platforms such as VMware vSphere and System Center Virtual Machine Manager (SCVMM) so their VMs can be managed and even created from Azure.",
   "Arc fits naturally with the cloud models from earlier lessons: it is Microsoft's answer to managing hybrid and multicloud environments consistently. It is important to separate it from services that move workloads. Azure Migrate moves servers into Azure; Azure Arc leaves them where they are and manages them. Azure Arc also differs from Azure Stack products, which bring Azure infrastructure and services to run on hardware in your own location, whereas Arc brings Azure's management plane to infrastructure you already have.",
   "Consider a worked example. A retail chain has two hundred Linux servers in its stores, a set of Windows servers in its own datacenter and a Kubernetes cluster in another cloud provider. Auditors want proof that all servers have a specific security setting and current patches. The team onboards the servers with the Connected Machine agent and connects the cluster with Arc-enabled Kubernetes. It then assigns an Azure Policy initiative to the resource group holding the Arc resources, views compliance in one dashboard, enables Defender for Cloud across all of them, and schedules updates with Azure Update Manager. None of the workloads moved.",
   "Common mistakes: thinking Azure Arc migrates servers into Azure (that is Azure Migrate); believing Arc resources must run on Azure hardware (they run anywhere, including other clouds); assuming Arc works only for Windows (it supports Windows and Linux servers and Kubernetes); and confusing Arc with a VPN or network connection (Arc is about management and governance; the agent needs outbound connectivity to Azure, not a site-to-site network link).",
   "Exam questions usually include a location clue. 'Manage on-premises servers from the Azure portal', 'apply Azure Policy to servers in another cloud', 'single pane of glass for hybrid and multicloud' or 'govern Kubernetes clusters running anywhere' points to Azure Arc. If the scenario says 'move', 'migrate' or 'assess for migration', the answer is Azure Migrate instead. If it says 'run Azure services on hardware in our own datacenter', think of Azure Stack or Arc-enabled data services depending on the wording."
  ],
  "terms": [
   [
    "Azure Arc",
    "A service that extends Azure management and governance to resources running outside Azure."
   ],
   [
    "Arc-enabled servers",
    "Windows or Linux machines outside Azure that are projected into Azure Resource Manager for management."
   ],
   [
    "Connected Machine agent",
    "The lightweight agent installed on a server to connect it to Azure Arc."
   ],
   [
    "Arc-enabled Kubernetes",
    "Kubernetes clusters running anywhere that are connected to Azure for management and configuration."
   ],
   [
    "Hybrid cloud",
    "An environment that combines on-premises infrastructure with public cloud services."
   ],
   [
    "Multicloud",
    "Using services from more than one public cloud provider."
   ],
   [
    "Single pane of glass",
    "One console and toolset for managing resources across many environments."
   ]
  ],
  "example": "A bank must keep some servers on premises for regulatory reasons but wants the same security baseline as its Azure VMs. It onboards those servers to Azure Arc, assigns the same Azure Policy initiative used for Azure VMs, and enables Defender for Cloud. The security team now sees on-premises and Azure servers side by side in one compliance report, while the servers themselves never leave the bank's datacenter.",
  "tip": "Arc manages resources where they are; it does not move them. If the scenario says 'apply Azure Policy to on-premises or other-cloud servers' or 'manage hybrid and multicloud from one place', the answer is Azure Arc. Moving workloads into Azure is Azure Migrate.",
  "check": [
   [
    "A company wants to use Azure Policy on servers running in another public cloud. Which service enables this?",
    "Azure Arc, which projects those servers into Azure Resource Manager so Azure Policy can apply."
   ],
   [
    "Does onboarding a server to Azure Arc migrate it into Azure?",
    "No. The server keeps running where it is; Arc only adds Azure management and governance."
   ],
   [
    "What must be installed on an on-premises server to connect it to Azure Arc?",
    "The Azure Connected Machine agent."
   ],
   [
    "Name two Azure services you can use on an Arc-enabled server.",
    "Any two of Azure Policy, RBAC, tags, Azure Monitor, Microsoft Defender for Cloud and Azure Update Manager."
   ]
  ]
 },
 {
  "t": "Azure Resource Manager and infrastructure as code with ARM templates and Bicep",
  "body": [
   "Azure Resource Manager (ARM) is the deployment and management service for Azure. Every request to create, update or delete a resource, whether it comes from the portal, Azure CLI, Azure PowerShell, the REST APIs or a software development kit (SDK), goes through Resource Manager. It authenticates the caller with Microsoft Entra ID, checks authorization with role-based access control (RBAC), evaluates Azure Policy and locks, and then sends the request to the right Azure service, called a resource provider, such as `Microsoft.Compute` for VMs. Because all tools go through the same layer, you get consistent results and consistent features such as RBAC, tags, locks and policies no matter which tool you use.",
   "Resource Manager brings several benefits. You can manage your infrastructure through declarative templates rather than scripts. You can deploy, manage and monitor all the resources for a solution as a group, typically a resource group, rather than one by one. You can redeploy consistently throughout the development lifecycle, from development to test to production. Resource Manager handles dependencies, so resources are created in the right order, such as a virtual network before the VM that uses it, and it deploys independent resources in parallel. You can also apply tags and access control once to a whole group and see the combined cost. Infrastructure as code (IaC) means describing the infrastructure you need in code files, then using those files to create it. Instead of clicking through the portal, you keep definitions in source control such as Git, review changes like any other code, and deploy the same environment repeatedly with a pipeline. IaC reduces human error, documents exactly what exists, and prevents configuration drift, where environments that should be identical slowly become different.",
   "Azure Resource Manager templates (ARM templates) are JSON files that define the resources to deploy. They are declarative: you state what you want to exist, not the steps to create it, and Resource Manager works out how to get there. Deployments are idempotent, meaning you can deploy the same template many times and get the same result; resources that already match are left alone. Templates have sections for parameters (values supplied at deployment, such as the environment name), variables, resources and outputs, so one template can serve many environments, and larger solutions can be split into linked or nested templates. You deploy with a command such as `az deployment group create --resource-group rg-demo --template-file main.json`.",
   "Bicep is a domain-specific language from Microsoft for deploying Azure resources declaratively. It uses a simpler, more concise syntax than JSON, has better type checking and editor support, and supports modules for reuse. A Bicep file is transpiled into a standard ARM JSON template before deployment, so it can do everything ARM templates can, and new Azure resource types and API versions are available in Bicep straight away. You deploy it with the same command, pointing `--template-file` at `main.bicep`. For example, a storage account can be declared in a few lines:",
   "```bicep\nresource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: 'stdemo${uniqueString(resourceGroup().id)}'\n  location: resourceGroup().location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}\n```",
   "Consider a worked example. A software company needs identical development, test and production environments, each with a virtual network, an App Service web app, a SQL database and a storage account. Instead of building each one by hand, the team writes one Bicep file with a parameter for the environment name and SKU sizes, stores it in Git, and deploys it from a pipeline. When production needs an extra storage container, the change is reviewed in a pull request and redeployed; because deployments are idempotent, only the new container is created. A missing firewall rule in test is fixed by redeploying the file.",
   "Common mistakes: thinking the portal bypasses Resource Manager (it does not); confusing declarative templates with imperative scripts that list steps; believing Bicep deploys through a different engine (it compiles to ARM JSON); and assuming redeploying a template duplicates resources (idempotency prevents that).",
   "Exam questions use a few recurring phrases. 'Deployment and management service for Azure' or 'consistent management layer' points to Azure Resource Manager. 'Deploy the same environment repeatedly and consistently' or 'define infrastructure in code' points to infrastructure as code. 'JSON file that defines resources declaratively' points to an ARM template. 'Simpler syntax that compiles to ARM templates' points to Bicep. 'Describe the desired end state, not the steps' means declarative, and 'same result every time you deploy' means idempotent."
  ],
  "terms": [
   [
    "Azure Resource Manager (ARM)",
    "The deployment and management layer that processes every request to create, change or delete Azure resources."
   ],
   [
    "Resource provider",
    "An Azure service, such as Microsoft.Compute, that supplies a type of resource through Resource Manager."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining and deploying infrastructure from code files kept in source control."
   ],
   [
    "ARM template",
    "A JSON file that declaratively defines Azure resources to deploy."
   ],
   [
    "Bicep",
    "A concise Microsoft language for declarative Azure deployments that transpiles to ARM JSON."
   ],
   [
    "Declarative",
    "Describing the desired end state and letting the platform work out the steps."
   ],
   [
    "Idempotent",
    "Producing the same result no matter how many times a deployment is run."
   ],
   [
    "Configuration drift",
    "Environments that should match gradually becoming different through manual changes."
   ]
  ],
  "example": "After a disaster-recovery test, a company discovers its secondary region took two days to rebuild by hand, and several settings were missed. The team rewrites the environment as Bicep modules stored in Git. In the next test, a single pipeline run deploys the full environment to the secondary region in under an hour, identical to production, and the files double as accurate documentation of what exists.",
  "tip": "Every tool, including the portal, goes through Azure Resource Manager. ARM templates are JSON and declarative; Bicep is a simpler language that compiles to ARM JSON. Declarative means you describe the end state; idempotent means redeploying gives the same result.",
  "check": [
   [
    "Which service processes a VM creation request made in the Azure portal?",
    "Azure Resource Manager, which handles every create, update and delete request regardless of the tool."
   ],
   [
    "What does it mean that ARM template deployments are idempotent?",
    "Deploying the same template repeatedly produces the same result without duplicating resources."
   ],
   [
    "How does Bicep relate to ARM templates?",
    "Bicep is a simpler language that is transpiled into ARM JSON templates before deployment."
   ],
   [
    "What is the main benefit of infrastructure as code?",
    "Consistent, repeatable, reviewable deployments that reduce human error and configuration drift."
   ]
  ]
 },
 {
  "t": "Azure Advisor recommendations and Azure Service Health (Azure status, Service Health, Resource Health)",
  "body": [
   "Once your workloads are running in Azure, two questions come up again and again: 'How could we run this better?' and 'Is Azure itself causing our problem?' Azure provides separate tools for each. Azure Advisor answers the first with recommendations for improving your own resources. Azure Service Health answers the second by telling you about Azure platform issues, from worldwide outages down to the health of a single VM. The exam expects you to know which tool gives which kind of information.",
   "Azure Advisor evaluates your deployed resources and their usage and makes personalized recommendations based on Microsoft best practices. Recommendations are grouped into five categories, which line up with the pillars of the Azure Well-Architected Framework. Reliability recommendations help ensure business continuity, for example adding redundancy or enabling backup. Security recommendations, which come from Microsoft Defender for Cloud, help detect threats and vulnerabilities. Performance recommendations help improve speed and responsiveness. Operational excellence recommendations help with process efficiency, resource management and deployment best practices. Cost recommendations help reduce spending, for example by right-sizing or shutting down underused VMs, deleting idle resources, or buying reservations.",
   "You open Advisor in the portal by searching for Advisor, or from the command line with `az advisor recommendation list --category Cost --output table`. Each recommendation shows the affected resources, the expected impact and the action to take, often with a quick-fix button. Advisor also gives an overall Advisor score, a percentage showing how closely you follow its recommendations, and you can postpone or dismiss recommendations that do not apply, set up alerts for new recommendations, and download reports. Advisor itself is free.",
   "Azure Service Health keeps you informed about the health of Azure services and your resources, and it is made of three views that go from broad to specific. Azure status is a public web page that shows service outages across all Azure regions worldwide. Anyone can see it without signing in, and it is a global view, not personalized to you; it only lists widespread incidents. Service Health, the second view, lives in the portal and focuses on the Azure services and regions you actually use. It reports service issues (active problems), planned maintenance, health advisories (for example, a feature being retired or an action you must take) and security advisories. You can create Service Health alerts that use an action group to notify you by email, SMS, push notification or webhook, and it keeps a history of past incidents, including post-incident reviews with root cause.",
   "Resource Health, the third view, is the narrowest. It shows the current and past health of your individual resources, such as a specific VM, web app or database, with statuses such as Available, Unavailable, Degraded or Unknown. Crucially, it tells you whether a problem was caused by an Azure platform event or by something user-initiated, such as a VM you stopped yourself. That history helps when you contact support or need to show whether a service-level agreement (SLA) was missed.",
   "Consider a worked example. Users report that an order-processing app is slow in one region. The engineer first checks the public Azure status page and sees nothing, which only means there is no widespread outage. In the portal, Service Health shows an active service issue affecting storage in that region for a subset of customers, including theirs. Resource Health for the app's VM shows Degraded due to a platform event, confirming it is not their own change. After the incident, the engineer reviews Advisor, which recommends zone-redundant storage and a second VM in an availability zone to improve reliability, and suggests right-sizing two idle VMs to save cost.",
   "Common mistakes: expecting the Azure status page to show issues that affect only a few customers (use Service Health, which is personalized); confusing Advisor, which recommends improvements, with Service Health, which reports Azure incidents; thinking Resource Health covers all services in a region (it covers individual resources); and assuming Advisor changes resources automatically (you choose whether to act). Remember how these fit with Azure Monitor: Advisor tells you how to improve, Service Health tells you whether Azure is affecting you, and Monitor collects detailed metrics and logs from your own resources.",
   "Exam questions separate these tools with a few clue words. 'Recommendations', 'best practices', 'reduce cost', 'improve reliability' or 'five categories' points to Azure Advisor. 'Global view of all Azure regions' or 'public page' points to Azure status. 'Planned maintenance', 'outages affecting the services and regions you use' or 'set up alerts for Azure incidents' points to Service Health. 'Why is my specific VM unavailable' or 'was it a platform problem' points to Resource Health."
  ],
  "terms": [
   [
    "Azure Advisor",
    "A free service that gives personalized best-practice recommendations for your Azure resources."
   ],
   [
    "Advisor categories",
    "Reliability, security, performance, operational excellence and cost."
   ],
   [
    "Advisor score",
    "A percentage showing how well your resources follow Advisor's recommendations."
   ],
   [
    "Azure status",
    "A public page showing widespread Azure outages across all regions."
   ],
   [
    "Service Health",
    "A personalized portal view of issues, planned maintenance and advisories for the services and regions you use."
   ],
   [
    "Resource Health",
    "A view of the current and past health of an individual resource and whether a platform event caused a problem."
   ],
   [
    "Health advisory",
    "A Service Health notice about changes that may require action, such as a feature retirement."
   ]
  ],
  "example": "An operations team receives a Service Health alert that planned maintenance will reboot hosts in one region next week. They review which of their VMs are affected, schedule a maintenance window with the business, and confirm afterwards in Resource Health that each VM returned to Available. Separately, the monthly Advisor review finds three unattached disks and an oversized database, and acting on the cost recommendations trims their bill.",
  "tip": "Recommendations to improve your resources: Advisor. Global outage page for everyone: Azure status. Outages, maintenance and advisories affecting your services and regions: Service Health. Health of one specific resource: Resource Health.",
  "check": [
   [
    "Which tool gives recommendations in five categories, including cost and reliability?",
    "Azure Advisor."
   ],
   [
    "A company wants an email when Azure schedules maintenance in the regions it uses. Which tool should it configure?",
    "Service Health, with a Service Health alert and an action group."
   ],
   [
    "A single VM became unavailable. Which view shows whether a platform event caused it?",
    "Resource Health, which reports the health of individual resources and the cause of problems."
   ],
   [
    "Why might the Azure status page show nothing during an issue affecting your resources?",
    "It lists only widespread incidents and is not personalized; Service Health shows issues affecting your specific services and regions."
   ]
  ]
 },
 {
  "t": "Azure Monitor: metrics, Log Analytics, alerts and Application Insights",
  "body": [
   "Azure Monitor is the platform for collecting, analyzing and acting on monitoring data from your Azure resources, on-premises machines and other clouds. It gathers data from applications, operating systems, Azure resources, subscriptions and the tenant, so you can understand how your systems are performing, spot problems early and respond automatically. It is the tool you use to watch your own workloads, as opposed to Service Health, which reports problems with Azure itself. Azure Monitor works with two main kinds of data. Metrics are numeric values collected at regular intervals, such as CPU percentage, available memory or requests per second. They are lightweight, near real-time and ideal for charts and fast alerts; many Azure resources send platform metrics automatically with no configuration, and you view them in Metrics explorer. Logs are records of events and data with rich properties, such as application traces, performance counters, security events, or activity log entries showing who changed what in your subscription. Logs are stored in a Log Analytics workspace, and data from inside a VM's operating system is collected by installing the Azure Monitor Agent and defining data collection rules. Most resources can also send their detailed resource logs to a workspace by adding a diagnostic setting.",
   "Log Analytics is the tool in the Azure portal for writing and running log queries against that data using Kusto Query Language (KQL). A query starts with a table name and pipes the results through operators that filter, summarize and sort. For example, a query can count failed sign-ins per hour, find which VMs had the most errors, or show when each machine last reported in. Queries can be saved, pinned to dashboards, used in workbooks (interactive reports), or used as the basis for alerts. A simple query that shows when each connected computer last sent a heartbeat looks like this:",
   "```kusto\nHeartbeat\n| where TimeGenerated > ago(1h)\n| summarize LastSeen = max(TimeGenerated) by Computer\n```",
   "Azure Monitor alerts notify you proactively when something in your monitoring data needs attention. An alert rule defines the scope (which resources), the condition (a metric threshold such as CPU above 80% for ten minutes, a log query result, or an activity log event such as a resource being deleted) and the severity. When it fires, it runs an action group, which can send email, SMS or push notifications, call a webhook, open an IT service management ticket, or start automation such as an Azure Function, Logic App or runbook. Action groups are shared, so the same group is also used by Service Health and Cost Management alerts.",
   "Application Insights is a feature of Azure Monitor for application performance monitoring (APM). It monitors live web applications, whether they run in Azure, on-premises or in another cloud, once you add its SDK or enable auto-instrumentation. It tracks request rates, response times and failure rates, dependency calls to databases and APIs, exceptions with stack traces, page views and user sessions, and draws an application map of how components connect. It can also run availability tests that check your site at regular intervals from locations around the world. It helps developers find the cause of slow pages or errors in their code, which infrastructure metrics alone would not reveal.",
   "Consider a worked example. An online store's checkout page slows every evening. Metrics show the web server's CPU is fine, so the problem is not capacity. Application Insights reveals that the slow requests all call one payment API dependency that takes several seconds to respond. The team adds a metric alert on response time and a log alert using a KQL query on failed payments, both sending to an action group that pages the on-call engineer.",
   "Common mistakes: confusing metrics (numbers sampled over time) with logs (detailed records queried with KQL); thinking Azure Monitor watches only Azure resources (it can monitor on-premises and other-cloud machines too, for example through Azure Arc); using Service Health to troubleshoot your own application's errors (that is Azure Monitor and Application Insights); and forgetting that an alert rule needs an action group to notify anyone or run automation.",
   "Exam questions map clue words to features. 'Numeric values collected at regular intervals' or 'near real-time' points to metrics. 'Query logs', 'KQL' or 'workspace' points to Log Analytics. 'Notify when CPU exceeds a threshold' points to alerts, and 'send SMS, email or trigger automation' points to action groups. 'Monitor a web application's performance, exceptions or dependencies' or 'APM' points to Application Insights. 'Who deleted a resource' points to the activity log."
  ],
  "terms": [
   [
    "Azure Monitor",
    "The platform for collecting, analyzing and acting on telemetry from Azure, on-premises and other clouds."
   ],
   [
    "Metrics",
    "Numeric values sampled at regular intervals, ideal for charts and fast alerts."
   ],
   [
    "Logs",
    "Detailed event records with rich properties, stored in a Log Analytics workspace."
   ],
   [
    "Log Analytics",
    "The portal tool for querying log data with Kusto Query Language (KQL)."
   ],
   [
    "Alert rule",
    "A definition of the scope, condition and severity that triggers an alert."
   ],
   [
    "Action group",
    "A reusable set of notifications and automated actions run when an alert fires."
   ],
   [
    "Application Insights",
    "An Azure Monitor feature for application performance monitoring of live web apps."
   ],
   [
    "Activity log",
    "A subscription-level log of management operations, showing who did what and when."
   ]
  ],
  "example": "A logistics company's VMs occasionally run out of disk space overnight, crashing a nightly job. The team installs the Azure Monitor Agent, sends performance counters to a Log Analytics workspace, and creates a log alert with a KQL query that fires when free disk space drops below 10%. The alert's action group emails the operations team and starts a runbook that clears temporary files, so the job now finishes reliably.",
  "tip": "Metrics are numbers over time; logs are detailed records queried with KQL in Log Analytics. Application Insights monitors applications (requests, exceptions, dependencies), not just infrastructure. Alerts use action groups to notify or automate.",
  "check": [
   [
    "Which Azure Monitor data type suits a near real-time alert on CPU percentage?",
    "Metrics, which are lightweight numeric values collected at regular intervals."
   ],
   [
    "Which language do you use to query data in Log Analytics?",
    "Kusto Query Language (KQL)."
   ],
   [
    "A developer needs to see which dependency makes a web app's requests slow. Which feature helps?",
    "Application Insights, which tracks requests, dependencies and exceptions."
   ],
   [
    "What does an action group do?",
    "It defines who is notified and what automation runs, such as email, SMS, webhook or a Logic App, when an alert fires."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
