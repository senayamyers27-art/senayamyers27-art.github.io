/* Lessons for CompTIA Cloud+ (CV0-004): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cloud-plus", [
 {
  t: "Cloud service models (IaaS, PaaS, SaaS, FaaS) and the shared responsibility model",
  body: [
   "A cloud service model describes how much of the technology stack the provider runs for you and how much you still run yourself. Cloud+ expects you to place any service on that spectrum quickly, because the model decides who patches what, who secures what and who gets paged when something breaks.",
   "Infrastructure as a service (IaaS) gives you virtual machines, virtual networks and block storage. The provider runs the data center, the physical hosts and the hypervisor; you install and patch the operating system, the runtime, your applications and your data. Platform as a service (PaaS) moves the operating system and runtime to the provider: you deploy code or a container to a managed application platform or use a managed database, and you manage only the application, its configuration and its data. Software as a service (SaaS) is a finished application such as web email or a CRM system; you manage users, settings and the data you put in it. Function as a service (FaaS), often called serverless compute, runs short pieces of code in response to events. You supply the function code and its configuration, such as memory and timeout, and the provider handles servers, scaling and patching, charging per invocation and execution time.",
   "The shared responsibility model is the agreement that follows from those choices. The provider is always responsible for security of the cloud: physical buildings, hardware, the global network and the virtualization layer. The customer is always responsible for security in the cloud: their data, who has access to it (identity and access management) and how services are configured. The layers in between shift with the model. In IaaS you patch the guest operating system; in PaaS the provider does; in SaaS you still decide who can sign in and what data is shared.",
   "Two points trip people up. First, responsibility for data and identities never moves to the provider, even in SaaS. A publicly readable storage bucket or a user without MFA is a customer failure. Second, managed does not mean unconfigured: a managed database still needs you to choose network exposure, encryption keys, backups and user accounts."
  ],
  terms: [
   ["IaaS", "Infrastructure as a service: the provider supplies virtual compute, storage and networking, and the customer manages the operating system and everything above it."],
   ["PaaS", "Platform as a service: the provider also runs the operating system and runtime, so the customer deploys and manages only application code and data."],
   ["SaaS", "Software as a service: a complete application delivered over the internet; the customer manages users, settings and data."],
   ["FaaS", "Function as a service: event-driven code that runs on demand without servers for the customer to manage, billed per execution."],
   ["Shared responsibility model", "The division of security and operational duties between provider and customer, which shifts with the service model."]
  ],
  example: "A company moves its intranet from a self-managed VM to a PaaS web app service. The operations team no longer patches the Windows guest or the web server runtime, but they still configure TLS certificates, restrict who can deploy, store connection strings securely and back up the application's database.",
  tip: "When a question asks who is responsible for something, first identify the service model. Data, identities, access policies and configuration always stay with the customer; physical security and the hypervisor always stay with the provider.",
  check: [
   ["In an IaaS deployment, who applies security patches to the guest operating system?", "The customer. In IaaS the provider stops at the hypervisor and physical hosts; the guest OS and everything above it is the customer's job."],
   ["A SaaS file-sharing tenant leaks data because a folder was shared publicly. Whose responsibility was that?", "The customer's. Data and access configuration remain customer responsibilities in every service model, including SaaS."],
   ["Which model charges per invocation and runs code only when an event occurs?", "FaaS (serverless functions)."]
  ]
 },
 {
  t: "Deployment models: public, private, hybrid, community and multicloud",
  body: [
   "A deployment model describes who owns and uses the cloud infrastructure, as opposed to the service model, which describes which layers you manage. The same IaaS service could be delivered from a public cloud or from a private cloud in your own data center.",
   "A public cloud is run by a provider and shared by many unrelated customers (tenants) over the internet. You get fast self-service provisioning, huge scale and pay-as-you-go billing, with no hardware to buy. A private cloud serves a single organization. It can sit on premises or be hosted by a third party, but it still offers cloud characteristics: self-service, pooled resources, elasticity and metered use. Simply owning virtualized servers is not a private cloud unless users can provision resources on demand. Private clouds suit strict control, special hardware or data that policy says must stay in a particular facility, at the cost of capital expense and limited scale.",
   "A hybrid cloud connects a private cloud or on-premises environment with a public cloud so workloads and data can move or work together, usually over a VPN or dedicated link with shared identity. Common reasons are keeping a sensitive database on premises while web tiers run in the public cloud, or cloud bursting, where extra demand overflows to the public cloud during peaks. A community cloud is shared by several organizations with common requirements, such as government agencies or research institutions that must meet the same compliance rules, and the cost is split among them.",
   "Multicloud means using services from two or more public cloud providers. It is different from hybrid: hybrid is about mixing private and public, multicloud is about mixing providers. Organizations choose multicloud to avoid vendor lock-in, to use a best-of-breed service from each provider, or to meet resilience or regulatory needs. The costs are more skills to maintain, different identity and networking models, harder cost reporting and data egress charges when data moves between providers."
  ],
  terms: [
   ["Public cloud", "Cloud infrastructure owned by a provider and shared by many tenants, consumed on demand over the internet."],
   ["Private cloud", "Cloud infrastructure dedicated to one organization, on premises or hosted, that still offers self-service and elasticity."],
   ["Hybrid cloud", "A combination of private or on-premises infrastructure and public cloud, connected so workloads can interoperate."],
   ["Community cloud", "Cloud infrastructure shared by several organizations with common mission, security or compliance needs."],
   ["Multicloud", "Using services from more than one public cloud provider."],
   ["Cloud bursting", "Sending overflow demand from a private environment to a public cloud when local capacity runs out."]
  ],
  example: "A hospital keeps its patient records system in an on-premises private cloud for regulatory reasons, runs its public appointment website in a public cloud, and links the two with a site-to-site VPN. That is a hybrid cloud. When it later adds a second provider's analytics service, it also becomes multicloud.",
  tip: "Do not confuse hybrid with multicloud. Hybrid means private plus public; multicloud means two or more public providers. A design can be both at the same time.",
  check: [
   ["Several state agencies share infrastructure built to meet the same compliance rules. Which deployment model is this?", "A community cloud, because it is shared by organizations with common requirements."],
   ["What is the main reason organizations give for adopting multicloud?", "Avoiding vendor lock-in, along with using the best service from each provider and adding resilience against one provider's outage."]
  ]
 },
 {
  t: "Regions, availability zones, edge locations and designing for high availability",
  body: [
   "Public cloud providers organize their infrastructure in a hierarchy, and designing for availability starts with knowing that hierarchy. A region is a geographic area, such as a part of a country, that contains several isolated data center groups. You choose a region for each resource based on latency to users, data residency laws, service availability and price, which can differ between regions.",
   "Inside most regions are availability zones (AZs). Each zone is one or more data centers with its own power, cooling and networking, physically separated from the other zones but connected to them by low-latency links. A fire or power failure in one zone should not take down another. Edge locations, also called points of presence, are smaller sites in many more cities. They host content delivery network caches, DNS servers and sometimes edge compute, bringing content closer to users. You do not run normal VMs in an edge location.",
   "High availability (HA) means a system keeps working when a component fails. The basic cloud pattern is to eliminate single points of failure: run at least two instances in different availability zones behind a load balancer, use a managed database with a synchronous standby in another zone, and store data in services that replicate across zones. Health checks let the load balancer stop sending traffic to a failed instance, and autoscaling replaces it. For protection against losing an entire region, you replicate data to a second region and plan a failover, which is part of disaster recovery.",
   "Remember the trade-offs. Multi-AZ adds cost, and traffic between zones may be charged. Multi-region adds much more cost and complexity, especially for keeping data consistent. Pick the level that matches the service's availability target: a batch job may be fine in one zone, while a customer checkout service needs multiple zones and possibly multiple regions."
  ],
  terms: [
   ["Region", "A geographic area containing multiple isolated data center groups where a provider offers its services."],
   ["Availability zone", "An isolated location within a region with independent power, cooling and networking, used to survive data center failures."],
   ["Edge location", "A provider point of presence close to users, used for CDN caching, DNS and edge services rather than general compute."],
   ["Single point of failure", "Any component whose failure stops the whole system."],
   ["High availability", "A design that keeps a service running through component failures, usually through redundancy and automatic failover."]
  ],
  example: "An online store runs its web servers in two availability zones behind a load balancer and its database as a managed multi-AZ deployment. When one zone loses power, the load balancer's health checks remove the failed instances, the database fails over to the standby in the other zone, and customers see only a brief slowdown.",
  tip: "Multi-AZ protects against a data center failure within a region; multi-region protects against a regional outage or disaster. If a question mentions a whole region being unavailable, multi-AZ alone is not the answer.",
  check: [
   ["Why deploy instances across two availability zones rather than two instances in one zone?", "Zones have independent power, cooling and networking, so a failure that takes out one data center does not take out both instances."],
   ["What runs in an edge location?", "CDN caches, DNS and some edge services that bring content closer to users; not ordinary virtual machines."]
  ]
 },
 {
  t: "Virtualization and compute: hypervisors, instance families, dedicated hosts and multitenancy",
  body: [
   "Cloud compute is built on virtualization: software that lets one physical server run many isolated virtual machines. The hypervisor is the layer that divides the host's CPU, memory, storage and network among guests and keeps them apart.",
   "There are two hypervisor types. A type 1, or bare-metal, hypervisor runs directly on the hardware with no general-purpose operating system underneath. Examples are VMware ESXi, Microsoft Hyper-V, Xen and KVM, and cloud providers use type 1 hypervisors because they are efficient and have a small attack surface. A type 2, or hosted, hypervisor runs as an application on top of a normal operating system, such as VirtualBox or VMware Workstation on a laptop. Type 2 is convenient for testing but adds overhead.",
   "Providers group their VM sizes into instance families, sometimes called machine series or VM sizes. General-purpose families balance CPU and memory. Compute-optimized families give more CPU per gigabyte of memory, for batch processing or web servers under heavy load. Memory-optimized families suit in-memory databases and caches. Storage-optimized families offer fast local disks for high IOPS workloads, and accelerated families add GPUs for machine learning or graphics. Within a family you pick a size, and some families use burstable CPU credits: fine for spiky, light workloads but poor for sustained load.",
   "By default, cloud VMs run on shared hardware alongside other customers' VMs, which is multitenancy. The hypervisor isolates tenants, but some customers need more. A dedicated instance runs on hardware used only by one customer, while a dedicated host gives you a whole physical server that you can see and place VMs on. Dedicated hosts help with software licenses that are counted per physical socket or core, and with compliance rules that require physical isolation. They cost more and you take on capacity planning for that host.",
   "One more concept is oversubscription: assigning more virtual CPUs or memory to guests than the host physically has, on the assumption that not all guests peak together. It raises density but can cause contention, which you may see in the cloud as a noisy neighbor slowing your VM."
  ],
  terms: [
   ["Type 1 hypervisor", "A bare-metal hypervisor that runs directly on hardware; used by cloud providers."],
   ["Type 2 hypervisor", "A hosted hypervisor that runs as an application on a general-purpose operating system."],
   ["Instance family", "A group of VM sizes tuned for a workload profile, such as general purpose, compute-, memory- or storage-optimized, or GPU."],
   ["Dedicated host", "A physical server reserved for one customer, giving visibility of sockets and cores for licensing and isolation."],
   ["Multitenancy", "Many customers sharing the same physical infrastructure while being logically isolated from one another."]
  ],
  example: "A company moving a database whose license is counted per physical core chooses a dedicated host so it can prove how many cores the software runs on, while its stateless web tier stays on normal shared, general-purpose instances.",
  tip: "Licensing tied to physical sockets or cores, or a requirement for physical isolation, points to dedicated hosts. A memory-hungry cache points to a memory-optimized family, not simply a bigger general-purpose VM.",
  check: [
   ["Which hypervisor type do public clouds use, and why?", "Type 1 (bare metal), because it runs directly on hardware with less overhead and a smaller attack surface."],
   ["An in-memory analytics workload keeps running out of RAM while the CPU is mostly idle. What should you change?", "Move it to a memory-optimized instance family, which gives more memory per vCPU."]
  ]
 },
 {
  t: "Containers, orchestration and serverless compared with virtual machines",
  body: [
   "Virtual machines, containers and serverless functions are three ways to run code, and each moves more of the stack to someone else. Knowing when to choose each is a common Cloud+ scenario.",
   "A virtual machine includes a full guest operating system on top of a hypervisor. It gives strong isolation and complete control, and it can run almost anything, but it takes minutes to boot, uses gigabytes of disk and needs OS patching. A container packages an application with its libraries and runtime, but shares the host's operating system kernel. Containers start in seconds, are small, and run the same way on a laptop, a test server and production, which removes many environment differences. The trade-off is weaker isolation than a VM, because all containers on a host share one kernel, and containers are meant to be disposable, so persistent data belongs in volumes or external services.",
   "Running a few containers by hand is easy; running hundreds across many hosts is not. A container orchestrator such as Kubernetes schedules containers onto nodes, restarts failed ones, scales replicas up and down, performs rolling updates and gives services stable network names. In Kubernetes the smallest unit is a pod (one or more containers that share networking), a deployment keeps a desired number of pod replicas running, and a service gives them a stable address. Managed Kubernetes offerings run the control plane for you.",
   "Serverless computing goes further: you write a function and the platform runs it when an event arrives, such as an HTTP request, a file upload or a queue message. There are no servers to manage, it scales to zero when idle and you pay per execution. Limits include a maximum execution time, cold starts (extra latency when a new instance must be initialized) and less control over the environment. Serverless is ideal for bursty, event-driven tasks and glue code; long-running or steady high-load workloads are often cheaper on containers or VMs.",
   "A rough rule: choose VMs for legacy apps or full OS control, containers for portable microservices, and serverless for short event-driven tasks."
  ],
  terms: [
   ["Container", "A lightweight package of an application and its dependencies that shares the host operating system kernel."],
   ["Orchestration", "Automated scheduling, scaling, healing and updating of containers across a cluster of hosts, for example with Kubernetes."],
   ["Pod", "The smallest deployable unit in Kubernetes: one or more containers sharing network and storage."],
   ["Cold start", "Extra latency when a serverless platform must create a new execution environment before running a function."],
   ["Serverless", "A model where the provider runs code on demand in response to events, scaling automatically and billing per use."]
  ],
  example: "A team has an image-resizing job that runs only when users upload photos, a handful of times per hour. Moving it from an always-on VM to a serverless function triggered by the storage upload event removes idle cost and patching work, while the main web API stays in containers on a managed Kubernetes cluster.",
  tip: "Containers share the host kernel; VMs each have their own OS. If a question stresses fast startup, portability and density, think containers; if it stresses event-driven, pay-per-use and no server management, think serverless.",
  check: [
   ["Why do containers start faster than virtual machines?", "They share the host's kernel, so there is no guest operating system to boot; only the application process starts."],
   ["A function must run for several hours without stopping. Is serverless a good fit?", "Usually not. Serverless functions have maximum execution times; a container or VM is a better fit for long-running work."]
  ]
 },
 {
  t: "Microservices, event-driven architecture, message queues and API gateways",
  body: [
   "A monolithic application is built and deployed as one unit: a change to any feature means rebuilding and redeploying the whole thing, and one busy feature forces you to scale everything. A microservices architecture splits the application into small, independent services, each owning one business capability and its own data, communicating over the network through APIs. Teams can deploy, scale and choose technology for each service separately, and a failure in one service need not take down the others.",
   "Microservices bring their own problems: many network calls, harder troubleshooting across services, and the need for good monitoring and tracing. They are usually run in containers and deployed through automated pipelines, because doing it by hand does not scale.",
   "Event-driven architecture reduces tight coupling between services. Instead of service A calling service B directly and waiting, A publishes an event such as OrderPlaced, and any interested service reacts to it. Two building blocks support this. A message queue holds messages until a consumer processes them; each message is normally handled by one consumer, and the queue absorbs spikes so a slow back end is not overwhelmed. If processing fails repeatedly, a dead-letter queue keeps the bad message for investigation. A publish/subscribe (pub/sub) topic delivers a copy of each message to every subscriber, so one event can trigger email, billing and analytics at once. The result is loose coupling and asynchronous processing: the sender does not need the receiver to be online at that moment.",
   "An API gateway is the single front door for client requests to your services. It routes each request to the right back-end service and centralizes cross-cutting jobs: authentication and authorization, TLS termination, rate limiting and throttling, request validation, caching and usage metrics. Clients get one stable endpoint even when the services behind it change."
  ],
  terms: [
   ["Microservice", "A small, independently deployable service that owns one business capability and communicates through APIs."],
   ["Message queue", "A buffer that stores messages until a consumer processes them, decoupling senders from receivers."],
   ["Pub/sub", "A messaging pattern where a published message is delivered to every subscriber of a topic."],
   ["Dead-letter queue", "A queue that holds messages that could not be processed after a set number of attempts."],
   ["API gateway", "A managed entry point that routes API requests to back-end services and handles authentication, throttling and monitoring."]
  ],
  example: "During a holiday sale, an online shop's order service writes each order to a message queue instead of calling the slow warehouse system directly. Orders are accepted instantly, the queue grows during the spike, and warehouse workers drain it at their own pace without losing any orders.",
  tip: "Queue means one consumer per message and buffering; pub/sub means fan-out to many subscribers. An API gateway is the answer when a question mentions a single entry point, rate limiting or authentication in front of many APIs.",
  check: [
   ["How does a message queue help when a back-end service is slower than the front end?", "It buffers messages, so the front end can keep accepting work while the back end processes it at its own pace, decoupling the two."],
   ["Name three functions an API gateway commonly provides.", "Request routing, authentication or authorization, and rate limiting (also TLS termination, caching and metrics)."]
  ]
 },
 {
  t: "Cloud storage types: block, file and object; storage tiers and performance (IOPS, throughput)",
  body: [
   "Cloud providers offer three main kinds of storage, and choosing the wrong one is a classic exam trap. Block storage presents a raw volume, like a virtual hard disk, that you attach to one VM (some services allow multi-attach in special cases). The operating system formats it with a file system. It gives low latency and is used for boot disks and databases. File storage provides a shared file system over a network protocol such as NFS or SMB, so many servers can mount the same directory tree at once. It suits shared content, home directories and lift-and-shift apps that expect a network share.",
   "Object storage keeps data as objects in buckets or containers. Each object has a key (its name), the data and metadata, and it is reached over HTTP(S) APIs rather than mounted as a disk. Object storage scales almost without limit and is highly durable, which makes it the usual choice for backups, logs, media, static website content and data lakes. You cannot edit part of an object in place; you replace the whole object.",
   "Within a storage service you choose tiers. Hot or standard tiers cost more to store but little to read, for frequently used data. Cool or infrequent-access tiers are cheaper to store but charge more per retrieval and may have a minimum storage duration. Archive tiers are cheapest to store but can take minutes to hours to retrieve. Lifecycle policies move objects between tiers automatically by age. For block storage, tiers are about media: SSD-backed volumes for random I/O and HDD-backed volumes for large sequential reads, with some volume types letting you provision performance separately.",
   "Two performance measures matter. IOPS (input/output operations per second) counts how many reads and writes a volume can perform; it matters for databases and other small, random operations. Throughput is how much data moves per second, usually in MB/s; it matters for large sequential work such as log processing, backups and video. Latency is the time each operation takes. A volume can have high throughput but low IOPS, or the reverse, so match the metric to the workload."
  ],
  terms: [
   ["Block storage", "Raw volumes attached to an instance and formatted with a file system; low latency, used for boot disks and databases."],
   ["File storage", "A shared, network-mounted file system (NFS or SMB) that many clients can use at once."],
   ["Object storage", "Storage of objects with keys and metadata in buckets, accessed through HTTP APIs; highly durable and scalable."],
   ["IOPS", "Input/output operations per second: the rate of individual read and write operations a storage device can handle."],
   ["Throughput", "The amount of data transferred per second, typically measured in MB/s."]
  ],
  example: "A team runs a transactional database on an SSD block volume sized for its IOPS needs, stores uploaded images in object storage with a lifecycle rule that moves them to a cool tier after 90 days, and gives its web servers a shared file system for a legacy content folder they all read.",
  tip: "Databases and boot disks point to block storage; a share mounted by many servers points to file storage; backups, logs and static content at scale point to object storage. Many small random operations mean IOPS; large sequential transfers mean throughput.",
  check: [
   ["Several Linux web servers must read and write the same directory. Which storage type fits?", "File storage, such as an NFS share, because it can be mounted by many servers at once."],
   ["A backup job moves large files sequentially and is slow. Which metric should you look at first?", "Throughput, because large sequential transfers are limited by MB/s rather than operations per second."]
  ]
 },
 {
  t: "Virtual networks: VPC/VNet design, CIDR planning, subnets, route tables, NAT and internet gateways",
  body: [
   "A virtual network, called a VPC (virtual private cloud) in AWS and Google Cloud and a VNet in Azure, is your private, isolated network inside the provider's cloud. You give it an IP address range in CIDR notation and divide it into subnets. Good design here prevents painful rework later.",
   "CIDR (Classless Inter-Domain Routing) notation writes a range as an address plus a prefix length, such as `10.0.0.0/16`. The prefix is the number of network bits; the rest are host bits. A /16 contains 65,536 addresses, a /24 contains 256. Use private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), and plan ranges so they do not overlap with on-premises networks or other virtual networks you may later connect with VPN or peering, because overlapping ranges cannot be routed between. Leave room to grow, and remember that providers reserve a few addresses in every subnet, so a /24 subnet gives slightly fewer than 256 usable addresses.",
   "Subnets split the range, usually by tier and availability zone: for example public subnets for load balancers and private subnets for application servers and databases in each zone. A subnet is public or private because of its routes, not its name. Each subnet is associated with a route table, a list of destinations and next hops. Every route table has a local route for the network's own range. A public subnet's route table sends `0.0.0.0/0` (all other traffic) to an internet gateway, which lets resources with public IP addresses reach the internet and be reached from it.",
   "Private subnets often still need outbound internet access for updates. A NAT gateway, placed in a public subnet, translates private addresses to its own public address for outbound connections and does not accept new inbound connections from the internet. The private subnet's route table sends `0.0.0.0/0` to the NAT gateway. For resilience, use one NAT gateway per availability zone. Remember that NAT gateways usually carry hourly and per-gigabyte charges."
  ],
  terms: [
   ["VPC / VNet", "A logically isolated private network in a public cloud, defined by one or more CIDR ranges."],
   ["CIDR", "Notation that writes an IP range as address/prefix length, such as 10.0.1.0/24."],
   ["Route table", "A set of rules that tells traffic from a subnet which next hop to use for each destination range."],
   ["Internet gateway", "A component that gives a virtual network two-way internet connectivity for resources with public IP addresses."],
   ["NAT gateway", "A managed service that lets instances in private subnets start outbound internet connections while blocking unsolicited inbound ones."]
  ],
  example: "An administrator creates a 10.20.0.0/16 VPC with public subnets 10.20.1.0/24 and 10.20.2.0/24 and private subnets 10.20.11.0/24 and 10.20.12.0/24, one of each per availability zone. The public route table points 0.0.0.0/0 to the internet gateway; each private route table points 0.0.0.0/0 to the NAT gateway in its own zone.",
  tip: "What makes a subnet public is a route to an internet gateway. If private instances cannot download patches, check for a NAT gateway and a 0.0.0.0/0 route to it. Overlapping CIDR ranges block peering and VPN routing.",
  check: [
   ["How many addresses does a /24 contain, and why are fewer usable in a cloud subnet?", "256; the provider reserves a few addresses in each subnet for the network, router, DNS and broadcast or future use."],
   ["An instance in a private subnet needs to download updates but must not accept inbound connections from the internet. What do you add?", "A NAT gateway in a public subnet and a 0.0.0.0/0 route to it in the private subnet's route table."]
  ]
 },
 {
  t: "Hybrid connectivity: site-to-site VPN, dedicated interconnects, peering and transit hubs",
  body: [
   "Once you have networks in the cloud, you need to connect them to your offices and data centers and to each other. Cloud+ tests which connection method fits a given need for bandwidth, latency, cost and setup time.",
   "A site-to-site VPN builds an encrypted IPsec tunnel over the public internet between your on-premises VPN device and a cloud VPN gateway. It is quick to set up and cheap, and it encrypts traffic, but performance depends on the internet: bandwidth is limited and latency varies. Most providers let you create two tunnels for redundancy and use BGP (Border Gateway Protocol) to exchange routes dynamically. A client or point-to-site VPN, by contrast, connects individual users rather than whole networks.",
   "A dedicated interconnect is a private physical connection between your network and the provider, made at a colocation facility or through a partner (AWS Direct Connect, Azure ExpressRoute and Google Cloud Interconnect are examples). Traffic does not cross the public internet, so you get consistent latency, higher bandwidth and often lower data transfer charges. It takes weeks to order and costs more. Such links are not necessarily encrypted by default, so some organizations run a VPN over the interconnect or use link-layer encryption where offered. A common design is a dedicated interconnect as primary with a site-to-site VPN as backup.",
   "Inside the cloud, VPC or VNet peering connects two virtual networks privately so resources can talk using private IP addresses. Peering requires non-overlapping CIDR ranges and is usually not transitive: if A peers with B and B peers with C, A cannot reach C through B. With many networks, a full mesh of peerings becomes unmanageable. A transit hub (such as a transit gateway, a hub virtual network or a virtual WAN) solves this with a hub-and-spoke design: every VPC and on-premises connection attaches to the hub, which routes between them according to its route tables."
  ],
  terms: [
   ["Site-to-site VPN", "An encrypted IPsec tunnel over the internet that connects an entire on-premises network to a cloud network."],
   ["Dedicated interconnect", "A private physical link between a customer network and a cloud provider that bypasses the public internet."],
   ["VPC peering", "A private connection between two virtual networks that lets them communicate with private IP addresses; typically not transitive."],
   ["Transit hub", "A central router service that connects many virtual networks and on-premises links in a hub-and-spoke topology."],
   ["BGP", "Border Gateway Protocol, used to exchange routes dynamically over VPN and interconnect links."]
  ],
  example: "A retailer needs its cloud analytics platform to pull large nightly data sets from its data center with predictable performance. It orders a dedicated interconnect for primary connectivity, keeps a site-to-site VPN as a failover path, and attaches both plus its twelve VPCs to a transit hub instead of maintaining dozens of peerings.",
  tip: "Need it today and cheaply: site-to-site VPN. Need consistent latency and high bandwidth that avoids the internet: dedicated interconnect. Many VPCs needing to talk to each other: a transit hub, because peering is not transitive.",
  check: [
   ["VPC A is peered with VPC B, and B is peered with C. Can A reach C through B?", "No. Peering is not transitive; you need a direct A-C peering or a transit hub."],
   ["Why might a company still run a VPN when it has a dedicated interconnect?", "As a backup path if the interconnect fails, or to encrypt traffic that the private link does not encrypt by default."]
  ]
 },
 {
  t: "Load balancing, DNS routing and content delivery networks",
  body: [
   "Three services spread traffic and bring it closer to users: load balancers, DNS routing policies and content delivery networks (CDNs). Each works at a different layer and scope.",
   "A load balancer distributes incoming requests across a pool of healthy targets. A layer 4 (network) load balancer works with TCP and UDP connections: it forwards traffic based on IP address and port, is very fast and can handle non-HTTP protocols. A layer 7 (application) load balancer understands HTTP and HTTPS, so it can route by host name or URL path (for example `/api` to one pool and `/images` to another), terminate TLS, insert headers and use cookies for session persistence, also called sticky sessions. Both use health checks: the balancer probes each target and stops sending traffic to any that fail. Algorithms include round robin, least connections and hashing on the source address.",
   "DNS routing works at a global level, before a connection is made. A managed DNS service can answer the same name with different IP addresses depending on a routing policy: weighted (send a percentage of users to each endpoint, useful for gradual migrations), latency-based (send users to the region with the lowest latency), geolocation (answer based on the user's location, for legal or language reasons) and failover (answer with a secondary endpoint when health checks show the primary is down). DNS answers are cached for the record's TTL (time to live), so a failover is not instant; lower TTLs react faster but increase query volume.",
   "A content delivery network caches content at edge locations close to users. The first user in an area fetches an object from the origin (for example object storage or a web server); later users get the cached copy, which reduces latency and origin load. Cache behavior is controlled by headers and TTLs, and you can invalidate cached objects after an update. CDNs also absorb traffic spikes and help defend against DDoS attacks, and many terminate TLS at the edge."
  ],
  terms: [
   ["Layer 4 load balancer", "A load balancer that forwards TCP or UDP connections based on addresses and ports without inspecting application data."],
   ["Layer 7 load balancer", "An HTTP(S)-aware load balancer that can route by host or path, terminate TLS and use cookies."],
   ["Health check", "A periodic probe used to decide whether a target should receive traffic."],
   ["TTL", "Time to live: how long a DNS answer or cached object may be reused before it must be refreshed."],
   ["CDN", "Content delivery network: a distributed cache at edge locations that serves content from close to the user."]
  ],
  example: "A news site serves users worldwide from two regions. Latency-based DNS sends each reader to the closer region, an application load balancer in each region routes /video paths to a separate pool, and a CDN caches images and scripts at the edge so a breaking story does not overload the origin.",
  tip: "Routing by URL path or host header needs a layer 7 load balancer. Sending users to the nearest region is a DNS latency policy or a global load balancer. A failover that seems slow is often DNS caching because of a long TTL.",
  check: [
   ["You must send /api requests to one server pool and /shop requests to another. Which load balancer type do you need?", "A layer 7 (application) load balancer, because it can inspect the URL path."],
   ["After a DNS failover, some users still reach the failed site for several minutes. Why?", "Resolvers and clients cached the old answer for the record's TTL; they switch only when the cached entry expires."]
  ]
 },
 {
  t: "Disaster recovery architectures: backup and restore, pilot light, warm standby, multisite active-active; RPO and RTO",
  body: [
   "Disaster recovery (DR) is how you restore a service after a major event such as a regional outage, data corruption or ransomware. Two targets drive every DR decision. The recovery point objective (RPO) is the maximum amount of data loss, measured in time, that the business will accept: an RPO of 15 minutes means you must be able to recover data as it was no more than 15 minutes before the disaster. The recovery time objective (RTO) is the maximum acceptable time to get the service running again. Lower RPO and RTO cost more.",
   "Cloud DR architectures form a spectrum. Backup and restore is the cheapest: you copy backups and snapshots to another region and, after a disaster, rebuild the infrastructure (ideally with infrastructure as code) and restore the data. RPO equals the time since the last backup, and RTO is hours or more. Pilot light keeps the core pieces running in the recovery region, usually a replicated database, while application servers exist only as images or templates. In a disaster you start and scale those servers, giving an RTO of tens of minutes to hours and a small RPO.",
   "Warm standby runs a complete but scaled-down copy of the production environment in the recovery region, with data continuously replicated. It can take some traffic immediately and is scaled up during failover, so RTO is minutes. Multisite active-active runs full production in two or more regions at the same time, with traffic split between them by DNS or a global load balancer. If a region fails, the others keep serving, giving near-zero RTO and, with synchronous or near-synchronous replication, near-zero RPO. It is the most expensive and the hardest to build, because data must stay consistent across sites.",
   "Pick the cheapest pattern that meets the business's RPO and RTO, and test it. A DR plan that has never been exercised with a real failover is a guess. Document the failover and failback steps, who declares a disaster, and how DNS or routing is switched."
  ],
  terms: [
   ["RPO", "Recovery point objective: the maximum acceptable data loss, expressed as time before the incident."],
   ["RTO", "Recovery time objective: the maximum acceptable time to restore service after an incident."],
   ["Pilot light", "A DR pattern that keeps only core components such as the database running in the recovery site, ready to be scaled up."],
   ["Warm standby", "A DR pattern with a smaller, always-running copy of the full environment that is scaled up during failover."],
   ["Active-active", "A multisite design in which all sites serve production traffic at the same time."]
  ],
  example: "An insurer's claims system has an RTO of 30 minutes and an RPO of 5 minutes. Nightly backup and restore would lose up to a day of data, so the team chooses warm standby: a replicated database and a two-instance application tier in a second region that scales out when DNS failover is triggered.",
  tip: "RPO is about data (how far back), RTO is about time (how long down). Order the patterns by cost and speed: backup and restore, pilot light, warm standby, active-active. Choose the cheapest one that still meets both targets.",
  check: [
   ["Backups run every 4 hours. What is the worst-case RPO?", "About 4 hours, because a disaster just before the next backup loses everything since the previous one."],
   ["What distinguishes pilot light from warm standby?", "Pilot light runs only core data components in the recovery site; warm standby runs a complete, smaller-scale copy of the whole environment."]
  ]
 },
 {
  t: "Cloud cost models: on-demand, reserved and committed use, spot, tagging for showback and chargeback",
  body: [
   "Cloud bills can grow quickly, so Cloud+ expects you to match each workload to a pricing model and to attribute costs to the teams that create them.",
   "On-demand pricing charges for compute by the second or hour with no commitment. It is the most flexible and the most expensive per hour, ideal for new, short-lived or unpredictable workloads. Reserved instances and committed use discounts (the names vary by provider, and savings plans are a similar idea) give a significant discount in exchange for committing to a certain amount of usage for a term, typically one or three years. They suit steady, always-on workloads such as production databases. The risk is paying for capacity you stop using, so commit only to your baseline.",
   "Spot capacity (called spot VMs or preemptible VMs by some providers) sells the provider's unused capacity at a deep discount, but the provider can reclaim it with little warning when it needs the capacity back. Spot is excellent for fault-tolerant, interruptible work: batch processing, rendering, CI build agents, or extra stateless nodes in a scaling group. It is a poor choice for a single database server. A mature environment mixes all three: reserved or committed for the baseline, on-demand for normal variation and spot for flexible bursts.",
   "To manage cost you must know who is spending what. Tags (called labels in some clouds) are key-value pairs such as `CostCenter=Finance`, `Environment=Prod` or `Owner=team-web` attached to resources. Billing tools can group costs by tag once the tags are enabled for cost reporting. Enforce tagging with policies so untagged resources are flagged or blocked. With good tags you can run showback, which reports each team's costs to raise awareness without billing them, or chargeback, which actually bills those costs to each department's budget. Budgets and alerts then warn when spending crosses a threshold."
  ],
  terms: [
   ["On-demand", "Pay-as-you-go pricing with no commitment, charged per second or hour of use."],
   ["Reserved or committed use", "A discount in exchange for committing to a level of usage for a one- or three-year term."],
   ["Spot instance", "Discounted spare capacity that the provider can reclaim at short notice."],
   ["Showback", "Reporting cloud costs to the teams that caused them without actually billing them."],
   ["Chargeback", "Billing cloud costs back to the department or cost center that incurred them."]
  ],
  example: "A media company runs its production database on a three-year commitment, its web tier on a mix of committed and on-demand instances, and its nightly video transcoding on spot instances that retry any job interrupted by a reclaim. Every resource carries a CostCenter tag, and finance charges each business unit monthly.",
  tip: "Steady, predictable, long-running: reserved or committed. Interruptible and fault-tolerant: spot. Short-term or unpredictable: on-demand. Showback only reports costs; chargeback actually bills them.",
  check: [
   ["A nightly batch job can restart if interrupted and must be as cheap as possible. Which pricing model fits?", "Spot (or preemptible) instances, since the job tolerates interruption and spot is the cheapest option."],
   ["What must be in place before you can do chargeback by department?", "Consistent cost-allocation tags (or separate accounts or projects) on resources, enabled in the billing reports, so costs can be attributed."]
  ]
 },
 {
  t: "Deployment strategies: blue-green, canary, rolling, in-place and A/B releases, with rollback plans",
  body: [
   "A deployment strategy decides how a new version replaces the old one in production. The goals are to avoid downtime, to limit how many users a bad release can hurt and to make rollback fast. Cloud+ scenarios usually describe a constraint, such as no spare capacity or zero downtime, and ask which strategy fits.",
   "An in-place deployment updates the existing servers directly: stop the application, install the new version, start it again. It needs no extra infrastructure but usually causes downtime, and rolling back means reinstalling the old version on the same servers. A rolling deployment updates servers in batches, for example 25 percent at a time, taking each batch out of the load balancer, updating it and returning it once health checks pass. It avoids full downtime and needs little extra capacity, but for a while both versions serve traffic, and rollback means rolling back each batch.",
   "Blue-green deployment runs two identical environments. Blue is live; you deploy the new version to green, test it, and then switch all traffic to green by changing the load balancer target or DNS record. Rollback is simply switching back to blue, which is why blue-green is the answer when fast rollback matters most. The cost is running two full environments during the switch, and database schema changes must work for both versions.",
   "A canary release sends a small share of real traffic, such as 5 percent, to the new version while you watch error rates and latency. If the metrics stay healthy you increase the share step by step; if not, you route everything back to the old version. Canary limits the blast radius of a bad release. A/B testing looks similar but has a different purpose: it sends different user groups to different versions to compare business results, such as which checkout page converts better, rather than to reduce deployment risk.",
   "Whatever the strategy, write the rollback plan before you deploy: the trigger conditions (for example error rate above a threshold), the exact steps, who approves, and how data changes are reversed. Keep the previous version's artifact available so rollback does not require a rebuild."
  ],
  terms: [
   ["Blue-green deployment", "Running two identical environments and switching traffic from the old (blue) to the new (green) all at once, with instant switch-back for rollback."],
   ["Canary release", "Sending a small percentage of traffic to a new version and increasing it gradually while monitoring health."],
   ["Rolling deployment", "Updating servers in batches so the service stays available throughout the release."],
   ["A/B testing", "Routing user groups to different versions to compare user behavior or business metrics."],
   ["Rollback plan", "Predefined triggers and steps for returning to the previous version if a release fails."]
  ],
  example: "An online bank deploys a new login service to a green environment, runs smoke tests against it, and flips the load balancer to green at 2 a.m. When error rates rise ten minutes later, the engineer flips traffic back to blue in seconds, and the team investigates without customer impact.",
  tip: "Fastest rollback: blue-green. Test with a small share of real users first: canary. Limited spare capacity with no full outage: rolling. Comparing features or business outcomes, not reducing risk: A/B testing.",
  check: [
   ["Which strategy needs roughly double capacity during the release but gives the quickest rollback?", "Blue-green, because the old environment stays intact and traffic can be switched straight back."],
   ["How is a canary release different from A/B testing?", "A canary limits risk by exposing a new version to a small, growing slice of traffic; A/B testing compares versions for user or business outcomes."]
  ]
 },
 {
  t: "Migration strategies: rehost, replatform, refactor, repurchase, retire and retain",
  body: [
   "When an organization moves applications to the cloud, each application gets a migration strategy. The common list, often called the 6 Rs, is part of the Cloud+ vocabulary. Some frameworks add a seventh, relocate, for moving whole virtualized environments to a cloud-hosted version of the same hypervisor platform.",
   "Rehost, or lift and shift, moves an application as it is, typically by copying VMs to cloud instances with a migration tool. It is the fastest and least risky way to leave a data center, but it does not take advantage of cloud features, so savings are limited until the app is optimized later. Replatform, sometimes called lift, tinker and shift, makes a few targeted changes to gain cloud benefits without changing the core architecture: for example moving a self-managed database to a managed database service, or running the app on a managed platform instead of a VM.",
   "Refactor, or re-architect, redesigns the application to be cloud native, perhaps splitting a monolith into microservices, using serverless functions or managed queues. It delivers the most scalability and agility but takes the most time, money and skill, so it is reserved for applications where the business value justifies it. Repurchase, or drop and shop, replaces the application with a different product, usually SaaS: moving from a self-hosted email server or CRM to a SaaS offering.",
   "Retire means turning the application off because nobody needs it; discovery often finds a surprising number of unused systems. Retain, or revisit, means leaving the application where it is for now, perhaps because it was recently upgraded, depends on hardware that cannot move, faces compliance constraints or simply is not worth moving yet.",
   "In practice a portfolio mixes strategies. A common pattern is to rehost many systems quickly to meet a data center exit deadline, then replatform or refactor the most important ones once they are running in the cloud."
  ],
  terms: [
   ["Rehost", "Lift and shift: moving an application to the cloud without changing it."],
   ["Replatform", "Moving with small optimizations, such as switching to a managed database, without changing the core architecture."],
   ["Refactor", "Re-architecting an application to use cloud-native services and patterns."],
   ["Repurchase", "Replacing an application with a different product, often SaaS."],
   ["Retire / retain", "Decommissioning an application that is no longer needed, or deliberately leaving it where it is for now."]
  ],
  example: "Facing a data center lease that ends in six months, a company rehosts 120 VMs, replatforms its order database to a managed database service, repurchases its ticketing system as SaaS, retires 15 servers nobody uses and retains a mainframe application that it will revisit next year.",
  tip: "Look for the clue words: no code changes and fastest means rehost; a managed service with minimal changes means replatform; rewrite for cloud-native or microservices means refactor; switch to SaaS means repurchase.",
  check: [
   ["A team moves its self-managed MySQL server to a managed database service but leaves the application code unchanged. Which strategy is that?", "Replatform: a targeted optimization without re-architecting the application."],
   ["Which strategy gives the most cloud-native benefit but costs the most effort?", "Refactor (re-architect)."]
  ]
 },
 {
  t: "Migration planning: discovery, dependency mapping, pilot waves, cutover and validation",
  body: [
   "A successful migration is mostly planning. The work follows a predictable sequence, and exam questions often ask what should happen first or next.",
   "Discovery comes first. You build an inventory of servers, applications, databases, storage and network flows, together with their utilization, operating systems, licensing and owners. Automated discovery tools or agents collect CPU, memory, disk and network data over a period of weeks so you can right-size cloud resources instead of copying oversized on-premises specifications. Discovery also records business information: how critical each application is, its RPO and RTO, maintenance windows and compliance requirements.",
   "Dependency mapping shows which systems talk to each other: which app servers call which database, which jobs read which file share, which services depend on on-premises Active Directory or DNS. This matters because systems that depend heavily on each other should move together. If you move a chatty application server but leave its database on premises, every query crosses the WAN and performance collapses. Network flow data, application documentation and interviews with owners all feed the map.",
   "Grouping dependent systems gives you move groups, which are scheduled into waves. The first wave is a pilot: a small number of low-risk applications used to prove the tooling, network connectivity, security controls and runbooks. Lessons from the pilot improve later waves, which can then grow in size and criticality. Each wave has a cutover plan: the final data sync, a freeze on changes, switching DNS or connection strings to the new environment, and a go or no-go decision point with a rollback path if validation fails.",
   "Validation confirms the migrated system works: smoke tests of key functions, comparison of data counts or checksums, performance against the pre-migration baseline, monitoring and backups in place, and sign-off by the application owner. Only after a stabilization period do you decommission the old servers."
  ],
  terms: [
   ["Discovery", "Collecting an inventory and utilization data for the systems that may be migrated."],
   ["Dependency mapping", "Identifying which systems communicate with or rely on each other so they can be migrated together."],
   ["Migration wave", "A scheduled group of applications migrated together."],
   ["Pilot wave", "An initial small, low-risk wave used to prove the process and tools."],
   ["Cutover", "The point at which production traffic and data switch from the old environment to the new one."]
  ],
  example: "During discovery a team finds that a reporting server runs queries against the ERP database every few seconds. The dependency map places both in the same move group. The pilot wave migrates two internal wikis first, which reveals a firewall rule missing for the cloud subnet, fixed before the ERP wave.",
  tip: "The order is discovery, dependency mapping, wave planning with a pilot, cutover, then validation. If a migrated app is suddenly slow and its database stayed on premises, the missing step was dependency mapping.",
  check: [
   ["Why run a pilot wave before migrating critical systems?", "To prove tools, connectivity, security and runbooks on low-risk applications and fix problems before they can affect critical systems."],
   ["What should be collected during discovery to right-size cloud instances?", "Actual utilization data over time: CPU, memory, disk I/O and network, rather than just the configured specifications."]
  ]
 },
 {
  t: "Online vs offline data transfer, transfer appliances and database migration with minimal downtime",
  body: [
   "Moving data to the cloud is often the slowest part of a migration. You choose between sending it over the network (online) and shipping it on physical devices (offline), and databases need special handling to avoid long outages.",
   "Online transfer uses your internet connection, a VPN or a dedicated interconnect, with tools such as command-line copy utilities, sync tools or the provider's managed transfer services, which handle retries, scheduling and integrity checks. It is simple and supports continuous or incremental sync. The question is time. Do the arithmetic: 100 TB is 800,000,000 megabits; over a 1 Gbps link running perfectly that is 800,000 seconds, a little over 9 days, and real-world throughput is usually lower and shared with production traffic.",
   "Offline transfer uses a transfer appliance: a rugged, encrypted storage device the provider ships to you. You copy data to it locally at LAN speed, ship it back, and the provider loads it into your storage. Examples include AWS Snowball, Azure Data Box and Google Transfer Appliance. Offline transfer makes sense when the data set is large, bandwidth is limited or expensive, or a site has poor connectivity. Data is encrypted on the device, and you still need a plan to sync changes made after the copy.",
   "Databases cannot simply be copied while in use, because data keeps changing. The low-downtime approach is to take a full initial load, then keep the target in sync with ongoing changes using replication or change data capture (CDC), which reads the source's transaction log and applies each change to the target. When the target has caught up, you schedule a short cutover: stop writes to the source, let the last changes replicate, point applications to the new database and restart them. Downtime shrinks to minutes. A homogeneous migration keeps the same engine, while a heterogeneous one changes engines, for example from a commercial database to an open-source one, and also needs schema and code conversion.",
   "Always validate after transfer with checksums, row counts and application tests."
  ],
  terms: [
   ["Online transfer", "Moving data to the cloud over a network connection such as the internet, VPN or interconnect."],
   ["Transfer appliance", "A secure physical storage device shipped by the provider for bulk offline data transfer."],
   ["Change data capture", "Capturing ongoing changes from a database's transaction log and replicating them to a target."],
   ["Homogeneous migration", "A database migration between the same engine type."],
   ["Heterogeneous migration", "A database migration between different engines, requiring schema and code conversion."]
  ],
  example: "A research lab must move 400 TB of instrument data over a 200 Mbps connection. The transfer would take many months online, so it orders transfer appliances, loads them in a week, and uses online sync afterward for new files. Its customer database moves with an initial load plus CDC and a 10-minute cutover.",
  tip: "Calculate transfer time (data in bits divided by usable bandwidth). When it runs to weeks or months, the answer is an offline appliance. For databases with minimal downtime, the answer is initial load plus continuous replication or CDC, then a short cutover.",
  check: [
   ["Roughly how long does 10 TB take over a fully used 100 Mbps link?", "10 TB is 80,000,000 megabits; divided by 100 Mbps is 800,000 seconds, about 9 days, before overhead."],
   ["How does change data capture reduce downtime in a database migration?", "It keeps the target continuously updated with changes from the source's log, so only a brief final sync and switch are needed at cutover."]
  ]
 },
 {
  t: "Provisioning compute: choosing instance size and type, images and templates, golden images",
  body: [
   "Provisioning compute means creating the virtual machines a workload runs on, with the right size, the right software and a repeatable process.",
   "Start with the workload's needs, measured rather than guessed: CPU, memory, storage performance, network bandwidth and any special hardware such as GPUs. Choose an instance family that matches the profile (general purpose, compute-optimized, memory-optimized, storage-optimized or accelerated) and then a size within it. Check the operating system and processor architecture, since some families use ARM-based processors and your software must support them. Consider burstable instances for light, spiky loads, and pick storage and network options, such as enhanced networking, that the family supports. After launch, monitor utilization and right-size.",
   "Every VM starts from an image: a template containing the operating system and, optionally, installed software and settings. Providers publish base images for common operating systems, and marketplaces offer vendor images, sometimes with license fees included. Launch templates or instance templates go further: they store the image plus instance type, network, security groups, storage, identity role and startup script, so autoscaling groups and administrators launch identical instances every time.",
   "A golden image is your organization's approved, hardened image. You take a base image, apply patches, security hardening such as CIS benchmark settings, monitoring and security agents and standard configuration, then capture it as a new image. Instances launched from it are consistent and secure from the first boot, and they start faster than instances that install everything at boot. Golden images must be versioned and rebuilt regularly, usually by an automated image pipeline, because an old image quickly becomes an unpatched image.",
   "There is a balance between baking and bootstrapping. Baking puts as much as possible into the image, for fast, consistent launches. Bootstrapping keeps the image small and uses startup scripts (for example cloud-init user data) or configuration management to install and configure at launch, which is more flexible but slower and can fail at boot. Many teams bake the OS and agents and bootstrap the application settings."
  ],
  terms: [
   ["Image", "A template containing an operating system and optional software, used to launch virtual machines."],
   ["Golden image", "An organization-approved, patched and hardened image used as the standard starting point for new instances."],
   ["Launch template", "A saved set of instance settings, including image, size, network and startup script, used for consistent launches."],
   ["User data / cloud-init", "A startup script or configuration passed to an instance and run at first boot."],
   ["Burstable instance", "An instance type that accrues CPU credits during idle periods and spends them to burst above its baseline."]
  ],
  example: "A security team maintains a monthly golden Linux image built by a pipeline that applies patches, CIS hardening and the monitoring agent. Autoscaling groups reference a launch template that points to the latest approved image version, so every new web server is patched and compliant the moment it starts.",
  tip: "If new instances drift in configuration or launch unpatched, the fix is a golden image kept current by an automated build, used through launch templates. Remember that golden images age: they must be rebuilt, not just created once.",
  check: [
   ["What is the advantage of baking software into an image rather than installing it at boot?", "Instances launch faster and more consistently, with fewer chances of a boot-time install failing."],
   ["What does a launch template store beyond the image?", "Instance type, network and subnet settings, security groups, storage, identity role and startup scripts."]
  ]
 },
 {
  t: "Provisioning storage: volume types, thin vs thick provisioning, replication and encryption settings",
  body: [
   "When you provision storage you decide what kind of volume to use, how its capacity is allocated, where copies are kept and how it is encrypted. Each choice affects cost, performance and risk.",
   "Block volume types generally divide into SSD-backed and HDD-backed options. General-purpose SSD volumes suit most boot disks and moderate databases. Provisioned-performance SSD volumes let you specify IOPS or throughput for demanding databases with consistent latency needs. Throughput-optimized and cold HDD volumes are cheaper per gigabyte and good for large sequential workloads such as log processing or infrequently accessed data, but poor for random I/O. On some volume types performance scales with size, so a bigger volume can be faster. Also note the difference between persistent volumes, which survive instance stop and termination if configured, and local instance or ephemeral storage, which is very fast but lost when the instance stops or moves.",
   "Thick provisioning allocates the full capacity of a volume up front. A 500 GB thick disk consumes 500 GB of backing storage immediately, giving predictable performance and no risk of running out of space later. Thin provisioning allocates space only as data is written, so a 500 GB thin disk holding 80 GB of data uses about 80 GB. Thin provisioning improves utilization and lets administrators overcommit capacity, but if many thin disks grow at once, the underlying pool can run out of space, causing write failures. Monitor pool usage and set alerts when you use thin provisioning, especially in private clouds and hypervisors.",
   "Replication keeps copies of data in more than one place. Within an availability zone, providers replicate volumes to protect against hardware failure. Zone-redundant and geo-redundant options for object and file storage copy data across zones or regions. Synchronous replication writes to both copies before confirming, giving zero data loss but adding latency, so it is used over short distances. Asynchronous replication confirms first and copies later, allowing long distances but a small RPO.",
   "Enable encryption at rest by default. You can use provider-managed keys, which need no work, or customer-managed keys in a key management service, which give you control over rotation, access and revocation. Encrypted volumes produce encrypted snapshots, and account-level default encryption settings help avoid mistakes."
  ],
  terms: [
   ["Thick provisioning", "Allocating a volume's full capacity on the underlying storage when it is created."],
   ["Thin provisioning", "Allocating storage only as data is written, allowing overcommitment of capacity."],
   ["Provisioned IOPS", "A volume option where you specify the performance level the volume must deliver."],
   ["Synchronous replication", "Writing data to both copies before acknowledging, for zero data loss at the cost of latency."],
   ["Ephemeral storage", "Temporary local storage attached to an instance that is lost when the instance stops or is terminated."]
  ],
  example: "In a private cloud, an administrator thin provisions 40 VMs with 200 GB disks each on a 4 TB pool. The pool alert fires at 80 percent when a logging application fills several disks, so the team expands the pool before VMs start failing writes.",
  tip: "Thin provisioning saves space but risks the pool running out; thick gives predictable capacity. Synchronous replication means zero data loss over short distances; asynchronous allows long distances with some data loss.",
  check: [
   ["What is the main risk of thin provisioning?", "Overcommitment: if the provisioned disks grow together, the underlying storage pool can run out of space and writes fail."],
   ["Why would you choose customer-managed keys over provider-managed keys?", "To control key rotation, access policies and the ability to disable or revoke the key, often for compliance."]
  ]
 },
 {
  t: "Deploying managed services: managed databases, read replicas, caches and managed Kubernetes",
  body: [
   "Managed services let the provider run the undifferentiated work, such as installing software, patching, backups and failover, so your team can focus on the application. Cloud+ expects you to know what each common managed service offers and what you still configure.",
   "A managed relational database service runs engines such as MySQL, PostgreSQL or SQL Server for you. You choose the engine version, instance size, storage, network placement (normally private subnets), backup retention and maintenance window. The provider handles patching during that window, automated backups with point-in-time restore, and high availability through a multi-AZ option that keeps a synchronous standby in another zone and fails over automatically. You still manage database users, schema, query performance and who can reach the endpoint.",
   "Read replicas are copies of the database that receive changes asynchronously and serve read-only queries. They scale read-heavy workloads, such as reporting or product catalog lookups, and can be placed in another region to serve distant users or for DR. Because replication is asynchronous, replicas can lag slightly behind, so writes and reads that must be current go to the primary. Do not confuse the two roles: a multi-AZ standby exists for availability, while a read replica exists for read scaling, though some replicas can be promoted during a disaster.",
   "A managed cache, typically running Redis or Memcached, keeps frequently read data in memory for microsecond to millisecond responses. The application checks the cache first and queries the database only on a miss, a pattern called cache-aside. Caches reduce database load and latency, and also store session data. Set sensible expiry times so cached data does not go stale.",
   "Managed Kubernetes runs the Kubernetes control plane for you: the API server, scheduler and cluster state store are patched, scaled and made highly available by the provider. You manage the worker nodes or node pools (unless you choose a serverless node option), the workloads you deploy, networking and access control, and cluster version upgrades that you trigger within the provider's support window."
  ],
  terms: [
   ["Managed database", "A database service where the provider handles installation, patching, backups and failover."],
   ["Read replica", "An asynchronously updated, read-only copy of a database used to scale reads."],
   ["Multi-AZ standby", "A synchronously replicated database copy in another zone used for automatic failover, not for reads."],
   ["Cache-aside", "A pattern where the application reads from the cache first and loads from the database on a miss."],
   ["Managed Kubernetes", "A service where the provider operates the Kubernetes control plane while you manage workloads and usually the worker nodes."]
  ],
  example: "A retailer's product pages overload its database during promotions. The team adds two read replicas for catalog queries and a managed Redis cache for the most viewed products, leaving the primary free for orders. Database CPU drops sharply and page times fall.",
  tip: "Read scaling points to read replicas or a cache; automatic failover within a region points to a multi-AZ deployment. With managed services the provider patches the engine, but you still own users, data, network access and backups settings.",
  check: [
   ["Why might a user see slightly outdated data when reading from a read replica?", "Replication to read replicas is asynchronous, so there can be replication lag behind the primary."],
   ["In managed Kubernetes, what does the provider operate?", "The control plane (API server, scheduler, cluster data store); the customer manages workloads and typically the worker nodes."]
  ]
 },
 {
  t: "Infrastructure as code for deployment: templates, parameters, state and repeatable environments",
  body: [
   "Infrastructure as code (IaC) means describing your cloud resources in files that a tool reads to create and update them, instead of clicking in a console. Those files live in source control, get reviewed like application code and can be run again and again to produce the same result.",
   "A template is the file that describes the resources: networks, subnets, VMs, databases, security rules and how they relate. Most deployment tools are declarative: you state the desired end result, and the tool works out which API calls to make. Templates are written in formats such as JSON, YAML or a tool-specific language. Instead of hard-coding values, templates use parameters (also called variables or inputs) such as environment name, instance size or CIDR range. The same template then deploys development, test and production by passing different parameter values, which keeps environments consistent while allowing sensible differences, such as smaller instances in development. Outputs expose values such as a load balancer address for other templates or pipelines to use.",
   "State is how the tool remembers what it has created. Provider-native tools track deployments as stacks or deployments inside the cloud. Tools such as Terraform keep a state file that maps resources in your code to real resource IDs. When you run a plan, the tool compares desired configuration with state and reality, and shows what it will create, change or destroy before you apply. Store shared state remotely with locking, so two people cannot apply at once, and protect it, because it can contain sensitive values.",
   "Drift happens when someone changes a resource by hand so it no longer matches the code. Drift detection finds it; the fix is to update the code or reapply it, not to keep making console changes. The benefits of IaC are repeatability, speed, peer review, an audit trail through version history and easy recreation of an environment for disaster recovery."
  ],
  terms: [
   ["Infrastructure as code", "Defining and managing infrastructure through machine-readable files under version control."],
   ["Template", "A file describing the resources to deploy and their configuration."],
   ["Parameter", "An input value that lets one template deploy different environments or sizes."],
   ["State", "The record an IaC tool keeps of the resources it manages and their real identifiers."],
   ["Drift", "Differences between deployed resources and the configuration defined in code, usually from manual changes."]
  ],
  example: "A team uses one template with an environment parameter to build identical dev, test and prod networks. After a late-night manual security group change in prod, the weekly drift check flags it; the engineer adds the rule to the template, gets it reviewed and reapplies, so the change is documented and repeatable.",
  tip: "If environments differ unexpectedly or a manual change keeps disappearing, think drift and IaC. Parameters make one template reusable; state lets the tool know what already exists. Never hard-code secrets in templates.",
  check: [
   ["How can one template create both a small test environment and a large production environment?", "By using parameters for values such as instance size, counts and names, passing different values for each environment."],
   ["What problem does state locking solve?", "It prevents two people or pipelines from applying changes to the same state at the same time and corrupting it."]
  ]
 },
 {
  t: "Immutable infrastructure and environment separation: development, test, staging and production",
  body: [
   "Traditional servers are mutable: you log in, patch them, change settings and deploy new code onto the same machine over years. Over time each server becomes slightly different from the others, a problem called configuration drift, and the undocumented special case that nobody dares rebuild is sometimes called a snowflake server.",
   "Immutable infrastructure takes the opposite approach. Once a server or container is deployed, you never modify it. To patch or release, you build a new image with the change, deploy new instances from it and destroy the old ones. Every instance of a version is identical, the image that was tested is exactly what runs in production, and rollback means redeploying the previous image. Immutable infrastructure fits naturally with golden images, containers, autoscaling groups and infrastructure as code. It requires that state such as databases, uploads and logs lives outside the instances, on managed services, volumes or object storage. Administrators should not need to log in to production servers at all, which also improves security.",
   "Environment separation keeps changes moving safely toward users. Development is where engineers build and experiment; it changes constantly. Test (or QA) is where automated and manual tests run against integrated builds. Staging, sometimes called pre-production, mirrors production as closely as possible in configuration, size and data shape, so final validation, performance tests and release rehearsals find problems before customers do. Production serves real users and has the strictest change control and monitoring.",
   "Separate environments properly: use different accounts, subscriptions or projects, or at least separate networks, so a mistake in development cannot touch production. Give developers broad access in development but limited, audited access to production. Never copy real customer data into lower environments without masking or anonymizing it. Promote the same build artifact through each environment rather than rebuilding it, so what you tested is what you release."
  ],
  terms: [
   ["Immutable infrastructure", "Infrastructure that is never changed after deployment; updates are made by replacing it with new instances."],
   ["Configuration drift", "Gradual, undocumented differences between servers that should be identical."],
   ["Staging", "A production-like environment used for final validation before release."],
   ["Environment promotion", "Moving the same tested artifact from one environment to the next."],
   ["Data masking", "Replacing sensitive values with realistic but fake data for use in non-production environments."]
  ],
  example: "Instead of patching 30 web servers in place, a team builds a new image with the latest patches, tests it in staging, then updates the autoscaling group's launch template. New instances replace old ones gradually, and if something breaks they point the template back at the previous image.",
  tip: "If a question describes servers that differ because of manual changes, the cure is immutable infrastructure built from images and IaC. Staging should mirror production; development and test can be smaller. Keep production in its own account or subscription.",
  check: [
   ["How do you patch an immutable server?", "You do not patch it in place. You build a new image with the patch, deploy new instances and terminate the old ones."],
   ["Why should staging closely resemble production?", "So tests there reveal configuration, scale and integration problems that would otherwise appear only in production."]
  ]
 },
 {
  t: "Post-deployment validation: smoke tests, health checks, performance baselines and documentation",
  body: [
   "A deployment is not finished when the pipeline turns green. Post-deployment validation confirms that the new version works for users and that you have the information to support it.",
   "Smoke tests are quick, shallow checks that the most important functions work right after deployment: the home page loads, a user can sign in, a search returns results, an order can be placed with a test account. The name comes from hardware testing: power it on and see if it smokes. They are not a full regression suite; they run in minutes and answer whether it is safe to send users to the release. Automate them in the pipeline so a failure can trigger an automatic rollback.",
   "Health checks run continuously. Load balancers and orchestrators probe an endpoint such as `/health` and remove or restart instances that fail. Shallow health checks only confirm that the process answers; deep health checks also test dependencies such as the database. Deep checks catch more problems but can cause every instance to be marked unhealthy at once when a shared dependency blips, so choose carefully. In Kubernetes, readiness probes decide whether a pod gets traffic and liveness probes decide whether it should be restarted.",
   "A performance baseline is a record of normal behavior: response times, error rates, CPU and memory use, throughput and database load under typical traffic. After a release, compare the new metrics with the baseline. A version that works but is 40 percent slower, or that uses twice the memory, is a problem you want to find now rather than during the next peak. Record a new baseline after significant changes so future comparisons stay meaningful.",
   "Finally, update documentation: the architecture diagram, configuration and version inventory, runbooks for common incidents, the change record with what was deployed and when, and any new monitoring or alerting. Good documentation turns the next incident from an investigation into a lookup."
  ],
  terms: [
   ["Smoke test", "A quick check of critical functions right after deployment to confirm the system basically works."],
   ["Health check", "A recurring probe used by load balancers or orchestrators to decide whether an instance is healthy."],
   ["Performance baseline", "A recorded measure of normal performance used to detect regressions."],
   ["Readiness probe", "A Kubernetes check that decides whether a pod should receive traffic."],
   ["Runbook", "Documented step-by-step procedures for operating or troubleshooting a system."]
  ],
  example: "After a release, the pipeline runs smoke tests that sign in with a test account and place a test order. They pass, but the dashboard shows the checkout page's 95th percentile response time is double the baseline. The team rolls back, finds a missing database index and redeploys the next day.",
  tip: "Smoke tests are fast checks of critical paths right after deployment; baselines tell you whether performance changed. You cannot say something is slower without a baseline to compare against.",
  check: [
   ["What is the difference between a smoke test and a full regression test?", "A smoke test quickly checks a few critical functions after deployment; regression testing thoroughly checks that existing features still work and takes much longer."],
   ["Why should you record a performance baseline before and after changes?", "To detect regressions by comparing new metrics to known normal behavior, and to set meaningful alert thresholds."]
  ]
 },
 {
  t: "Observability: metrics, logs and traces; dashboards, baselines and alert thresholds",
  body: [
   "Observability is your ability to understand what a system is doing, and why, from the data it produces. Monitoring tells you that something is wrong; good observability helps you find out what. It rests on three kinds of telemetry, often called the three pillars.",
   "Metrics are numeric measurements over time: CPU utilization, memory use, request count, error rate, latency, queue depth. They are cheap to store, easy to graph and ideal for alerting and spotting trends. Cloud providers collect many infrastructure metrics automatically; others, such as memory or disk use inside a VM, often need an agent, and business metrics such as orders per minute need custom metrics from your code. Logs are timestamped records of discrete events: an application error with a stack trace, a login, an API call, a firewall decision. They carry detail that metrics lack. Structured logs in JSON are far easier to search than free text. Traces follow a single request as it passes through many services, recording each step, called a span, and its duration. In microservices, distributed tracing shows which service in a chain made a request slow.",
   "Dashboards collect the most important metrics on one screen for a service or team. A useful approach is to show the four golden signals: latency, traffic, errors and saturation. Put user-facing signals first and resource details below.",
   "Alerts turn data into action. A static threshold alert fires when a metric crosses a fixed value for a set period, such as CPU above 85 percent for 10 minutes; the duration avoids alerting on brief spikes. A baseline, built from normal behavior over days or weeks, lets you choose sensible thresholds, and some tools offer anomaly detection that alerts when a metric departs from its learned pattern. Alert on symptoms users feel, like error rate and latency, rather than on every cause. Too many noisy alerts cause alert fatigue, where people start ignoring pages. Every alert should be actionable and link to a runbook."
  ],
  terms: [
   ["Metric", "A numeric measurement recorded over time, such as CPU utilization or request latency."],
   ["Log", "A timestamped record of a discrete event, often with detailed context."],
   ["Trace", "A record of one request's path through multiple services, made up of timed spans."],
   ["Alert threshold", "The value and duration at which a metric triggers a notification."],
   ["Alert fatigue", "Desensitization caused by too many non-actionable alerts, leading to real ones being missed."]
  ],
  example: "Users report a slow checkout. The dashboard shows latency rising while CPU is normal. A distributed trace of a slow request shows 2.8 seconds spent in calls to the payment service, and that service's logs show repeated connection timeouts to a third-party API, pointing the team straight to the cause.",
  tip: "Metrics tell you something changed, logs tell you what happened, traces tell you where in a multi-service request the time went. Alert on sustained conditions and user-facing symptoms to avoid alert fatigue.",
  check: [
   ["Which telemetry type best shows which microservice made a request slow?", "Distributed traces, because they record the time each service spent handling the request."],
   ["Why add a duration, such as 10 minutes, to a CPU alert threshold?", "So brief, harmless spikes do not page anyone; only sustained high utilization triggers the alert."]
  ]
 },
 {
  t: "Log aggregation, retention and synthetic monitoring for user-facing services",
  body: [
   "In the cloud, servers and containers come and go. When an autoscaling group terminates an instance, any logs stored only on its disk disappear with it. Log aggregation solves this by shipping logs from every source to one central place as they are written.",
   "Agents or sidecars on each host or container forward application and system logs; cloud services send their own logs, such as API audit logs, load balancer access logs and network flow logs, directly to the provider's logging service. A central platform, whether the provider's log service or a SIEM (security information and event management system), indexes everything, so you can search across all servers at once, correlate events from different components by time or request ID, build dashboards and create alerts on log patterns. Consistent timestamps (use UTC and synchronized clocks), structured formats and a correlation ID passed between services make aggregated logs far more useful.",
   "Retention decides how long logs are kept. Keep recent logs in fast, searchable storage for troubleshooting, typically days to weeks, then move older logs to cheaper object or archive storage. Regulations and internal policies may require keeping audit and security logs for a year or longer, while debug logs may only be worth a few days. Protect retained logs from tampering with restricted access, separate storage accounts and immutability or write-once settings where available. Watch cost, too: log ingestion and storage are billed, and verbose debug logging left on in production can be expensive.",
   "Synthetic monitoring tests a service from the outside the way a user would, on a schedule, whether or not real users are active. A simple check requests a URL and verifies the status code and response time; a scripted synthetic transaction, sometimes called a canary script, signs in, searches and adds an item to a cart. Running checks from several regions shows whether a problem is global or local. Synthetic monitoring finds outages at 3 a.m. before customers do and measures availability against SLOs. It complements real user monitoring (RUM), which measures what actual visitors experience in their browsers."
  ],
  terms: [
   ["Log aggregation", "Collecting logs from many sources into one central, searchable system."],
   ["Retention policy", "Rules for how long each type of log or data is kept and where."],
   ["Correlation ID", "A unique identifier passed along with a request so its log entries can be linked across services."],
   ["Synthetic monitoring", "Scripted, scheduled tests that simulate user actions to check availability and performance."],
   ["Real user monitoring", "Measuring performance and errors experienced by actual users of an application."]
  ],
  example: "An e-commerce team runs a synthetic script every five minutes from three regions that loads the home page, searches for a product and adds it to the cart. At 4 a.m. the script fails only from one region, and aggregated load balancer logs show errors from a single zone's instances, which are replaced before morning traffic arrives.",
  tip: "Logs on ephemeral instances vanish when those instances are terminated, so centralize them. Synthetic monitoring finds problems even with no real traffic; RUM shows what real users experience. Retention requirements for audit logs usually come from compliance, not convenience.",
  check: [
   ["Why is local logging a problem for autoscaled instances?", "Instances can be terminated at any time, and logs stored only on their disks are lost with them."],
   ["What can synthetic monitoring detect that real user monitoring cannot?", "Outages or slowdowns during periods with no real users, such as overnight, because it generates its own test traffic."]
  ]
 },
 {
  t: "Scaling: horizontal vs vertical, autoscaling policies (target tracking, scheduled, step) and cooldowns",
  body: [
   "Scaling changes the capacity of a system to match demand. Elasticity, adding and removing capacity automatically, is one of the defining benefits of cloud computing.",
   "Vertical scaling, or scaling up, gives an existing server more resources: a larger instance size with more CPU and memory. It is simple and works for applications that cannot run on more than one server, such as some databases, but it has a ceiling (the largest size available), usually requires a restart and leaves a single point of failure. Horizontal scaling, or scaling out, adds more servers behind a load balancer. It has almost no ceiling, improves availability and can be automated, but the application must be designed for it: instances should be stateless, keeping session data in a shared cache or database rather than on one server.",
   "Autoscaling groups (also called scale sets or managed instance groups) add and remove instances between a minimum, a maximum and a desired count according to policies. A target tracking policy keeps a metric near a target value, for example average CPU at 60 percent or a set number of requests per instance; the service calculates how many instances to add or remove, much like a thermostat. A step scaling policy uses alarm thresholds with defined adjustments: add 2 instances when CPU exceeds 70 percent, add 4 when it exceeds 90 percent. A scheduled policy changes capacity at known times, such as scaling out every weekday at 8 a.m. before staff log on and back in at 7 p.m. Scheduled and dynamic policies are often combined; some providers also offer predictive scaling from historical patterns.",
   "A cooldown (or warm-up) period is time after a scaling action during which further actions are paused or new instances' metrics are not yet counted. New instances need time to boot and warm up; without a cooldown the group might keep adding instances because the metric has not dropped yet, then remove them, a pattern called flapping or thrashing. Set cooldowns close to the time an instance takes to become useful, and set sensible minimum and maximum limits to control both availability and cost."
  ],
  terms: [
   ["Vertical scaling", "Increasing the resources of a single server, such as moving to a larger instance size."],
   ["Horizontal scaling", "Adding or removing instances to share the workload."],
   ["Target tracking", "An autoscaling policy that adjusts capacity to keep a metric near a target value."],
   ["Step scaling", "An autoscaling policy that adds or removes set amounts of capacity depending on how far a metric passes a threshold."],
   ["Cooldown", "A waiting period after a scaling action that prevents further actions until new capacity has taken effect."]
  ],
  example: "A payroll application is busy every weekday from 8 a.m. to 6 p.m. and spikes at month end. The team uses a scheduled policy to raise the minimum to six instances at 7:45 a.m., a target tracking policy at 55 percent CPU to handle month-end peaks, and a five-minute cooldown so new instances can warm up before the group decides again.",
  tip: "Predictable load changes at known times mean scheduled scaling; keeping a metric at a value means target tracking; different adjustments for different breach sizes means step scaling. If a group keeps adding and removing instances rapidly, check the cooldown.",
  check: [
   ["Why must an application be stateless to scale horizontally well?", "Any instance may receive any request and instances can be removed at any time, so session data must live in a shared store rather than on one server."],
   ["An autoscaling group launches several extra instances during a brief spike, then terminates them minutes later, over and over. What setting should you check?", "The cooldown or warm-up period (and the alarm duration), which should give new instances time to take effect before the next scaling decision."]
  ]
 },
 {
  t: "Backup types (full, incremental, differential, snapshots), retention and the 3-2-1 rule",
  body: [
   "Backups are copies of data you can restore after deletion, corruption, failure or attack. Replication is not a backup: if data is deleted or encrypted by ransomware, replication copies the damage to the other side. A backup is a separate, point-in-time copy.",
   "A full backup copies all selected data every time. It is the simplest to restore, because one backup set holds everything, but it takes the most time and storage. An incremental backup copies only data that changed since the last backup of any type. Incrementals are fast and small, but a restore needs the last full backup plus every incremental since, in order, so the restore is slower and a single missing incremental breaks the chain. A differential backup copies everything that changed since the last full backup. Each differential grows larger through the week, but a restore needs only the last full backup and the latest differential.",
   "A snapshot captures the state of a volume, VM or database at a moment in time. Cloud block storage snapshots are usually incremental at the block level: the first copies all used blocks, later ones only changed blocks, yet each snapshot can be restored on its own. Snapshots are fast and convenient, but by default they are crash-consistent, like pulling the power plug. For databases, use application-consistent snapshots, which briefly quiesce or flush the application first, or use the database's own backup features. Also remember that snapshots kept in the same account and region as the original share its risks.",
   "Retention defines how long each backup is kept, for example daily backups for 30 days, weekly for 12 weeks and monthly for a year. Retention is driven by business needs, legal requirements and cost. Automate it with backup policies so old backups expire and required ones never get deleted early.",
   "The 3-2-1 rule is a classic guideline: keep at least three copies of your data, on two different types of media or storage, with one copy offsite. In cloud terms that often means production data, a backup in the same region and a copy in another region or account. Many organizations extend it to 3-2-1-1-0: one copy immutable or offline, and zero errors on restore tests."
  ],
  terms: [
   ["Full backup", "A complete copy of all selected data."],
   ["Incremental backup", "A backup of data changed since the last backup of any type."],
   ["Differential backup", "A backup of all data changed since the last full backup."],
   ["Snapshot", "A point-in-time copy of a volume, VM or database, often stored incrementally at the block level."],
   ["3-2-1 rule", "Keep three copies of data on two different media, with one copy offsite."]
  ],
  example: "A file server takes a full backup on Sunday and differentials on weekdays. When it fails on Thursday, the administrator restores Sunday's full backup and Wednesday night's differential, only two sets. With incrementals, the restore would need Sunday's full plus Monday, Tuesday and Wednesday's incrementals.",
  tip: "Incremental: fastest backup, slowest restore (full plus every incremental). Differential: slower backups as the week goes on, faster restore (full plus last differential). Replication and snapshots in the same account are not a complete backup strategy.",
  check: [
   ["A full backup runs Sunday and incrementals run Monday to Friday. The system fails Friday afternoon. What do you restore?", "Sunday's full backup, then every incremental from Monday through the latest successful one, in order."],
   ["Why is database replication not a substitute for backups?", "Replication copies deletions and corruption to the replica immediately; a backup preserves an earlier point in time you can return to."]
  ]
 },
 {
  t: "Restore testing, immutable and cross-account backups, and protecting backups from ransomware",
  body: [
   "A backup you have never restored is only a hope. Backups fail silently: jobs skip locked files, encryption keys get deleted, a retention setting is wrong, or the restore takes three times longer than the RTO allows. Restore testing is how you find out before a real emergency.",
   "Test restores on a schedule, and test different kinds: a single file, a full VM or volume, and a database restored to a specific point in time. Restore into an isolated environment so production is not affected, then validate that the data is complete and the application starts and works. Record how long each restore took and compare it with the RTO. Automating restore tests, for example a weekly job that restores last night's database backup and runs integrity checks, turns this into routine evidence for auditors as well.",
   "Modern ransomware operators know that backups are the victim's way out, so they look for backups and delete or encrypt them before encrypting production, often using stolen administrator credentials. Defenses must assume an attacker could gain admin rights in your main account. Immutable backups use write once, read many (WORM) settings, such as object lock or backup vault lock features, so backups cannot be changed or deleted until their retention period ends, even by an administrator. In the strictest compliance modes, not even the account owner can shorten the retention.",
   "Cross-account (or cross-subscription, cross-project) backups copy backups to a separate account with different administrators and credentials. Compromising the production account then does not give access to the backup account. Combine this with cross-region copies for regional disasters. Other protections include multi-factor authentication for backup administration and for delete operations, separating backup roles from production roles, encrypting backups with keys whose deletion is tightly controlled, alerting on unusual backup deletions or retention changes, and keeping an offline or air-gapped copy of the most critical data.",
   "After an attack, restore to a point before the compromise and scan restored systems, because malware may have been present in backups for some time before it activated."
  ],
  terms: [
   ["Restore test", "A planned recovery from backup to confirm that data is complete and recovery meets the RTO."],
   ["Immutable backup", "A backup that cannot be modified or deleted until its retention period expires."],
   ["WORM", "Write once, read many: storage that allows data to be written once and prevents later changes."],
   ["Cross-account backup", "A backup copy stored in a separate account with separate credentials and administrators."],
   ["Air gap", "Isolation of a backup copy from networks and normal credentials so an attacker cannot reach it."]
  ],
  example: "Attackers steal a cloud admin's credentials and delete every snapshot in the production account before encrypting file servers. The company recovers because its backup policy also copies nightly backups to a locked vault in a separate backup account in another region, where retention cannot be shortened, and its monthly restore tests had shown the recovery takes four hours.",
  tip: "Ransomware scenarios point to immutable (WORM or locked) backups, stored in a separate account with separate credentials, plus MFA on deletion. If a question asks how to prove backups work, the answer is regular restore testing, not checking job success messages.",
  check: [
   ["Why store backups in a separate account?", "So an attacker who compromises production credentials cannot delete or encrypt the backups as well."],
   ["What does a restore test prove that a successful backup job does not?", "That data is complete and usable and that recovery can be done within the RTO."]
  ]
 },
 {
  t: "Patch and update management for VMs, images, containers and managed services",
  body: [
   "Unpatched software is one of the most common ways attackers get in, so patch management is a core operations duty. In the cloud, what you patch and how depends on the service model and on whether your infrastructure is mutable or immutable.",
   "For VMs you manage (IaaS), you are responsible for the operating system and installed software. A patch process has clear stages: inventory what is running, get patch information from vendors and vulnerability scans, prioritize by severity and exposure, test in a non-production environment, deploy in a maintenance window, verify success and report compliance. Cloud patch management services and configuration management tools can scan instances against a patch baseline, group them into patch groups and install updates on a schedule. Patch in waves, keeping part of each tier running so the service stays available, and have a rollback plan such as a snapshot taken before patching.",
   "With immutable infrastructure you patch images instead of servers. An image pipeline builds a new golden image with the latest updates, tests it and publishes a new version; autoscaling groups then replace old instances with new ones. This avoids drift and gives clean rollback. Containers work the same way: you do not patch inside a running container. Rebuild the image from an updated base image, rescan it, push it to the registry with a new tag and redeploy. Scanning images in the registry reveals which running workloads use a base image with a newly announced vulnerability.",
   "For managed services, the provider patches the underlying platform, but you still have choices. Managed databases and Kubernetes clusters apply minor patches in a maintenance window you define, and major version upgrades are usually triggered by you and need testing because they can change behavior. Read provider notifications, choose windows at low-traffic times and keep engines within supported versions.",
   "Emergency patches for actively exploited vulnerabilities may skip parts of the normal process under an expedited change procedure, but should still be tested quickly, documented and reviewed afterward."
  ],
  terms: [
   ["Patch baseline", "The defined set of patches, by classification and severity, that instances must have installed to be compliant."],
   ["Maintenance window", "A scheduled period when updates and changes may be applied with minimal impact."],
   ["Image pipeline", "An automated process that builds, tests and publishes updated machine or container images."],
   ["Base image", "The starting image, such as an OS or language runtime image, on which application images are built."],
   ["Emergency change", "An expedited change process for urgent fixes, reviewed after implementation."]
  ],
  example: "A critical vulnerability is announced in a common library. The container registry's scanner flags 14 images built on the affected base image. The team updates the base image tag in their Dockerfiles, rebuilds through CI, redeploys with a rolling update and confirms the scanner no longer reports the finding.",
  tip: "Containers and immutable instances are patched by rebuilding and redeploying, never by patching in place. For managed services, the provider patches the platform, but you pick the maintenance window and plan major version upgrades.",
  check: [
   ["How do you patch a vulnerable library inside a running container?", "You rebuild the container image with the fixed version or updated base image, then redeploy containers from the new image."],
   ["Why take a snapshot before patching a VM?", "To have a quick rollback point if the patch breaks the system."]
  ]
 },
 {
  t: "Resource lifecycle: provider deprecations, version upgrades, end of support and decommissioning",
  body: [
   "Every cloud resource has a lifecycle: it is planned, deployed, operated, upgraded and eventually retired. Cloud providers move fast, so part of operations is keeping up with their changes rather than being surprised by them.",
   "Providers regularly deprecate things: older instance types, API versions, SDK versions, operating system images, database engine versions, Kubernetes versions and function runtimes. A deprecation notice announces that a feature or version will stop being supported or available after a date. Before that date you may be unable to create new resources on it; after end of support there are no more security patches, and some providers automatically upgrade or stop the resource. Subscribe to provider notifications and health dashboards, keep an inventory of versions in use, and track deprecation dates in your backlog like any other work.",
   "Version upgrades need planning. Minor versions usually contain fixes and are low risk. Major versions may change behavior, remove features or require application changes, so read the release notes, test in a lower environment, back up first, and schedule during a maintenance window with a rollback plan. Some upgrades cannot be reversed in place, such as a major database engine upgrade, so the rollback plan may mean restoring from backup or keeping the old instance until the new one is proven. Managed Kubernetes typically lets you upgrade the control plane and node pools separately, one minor version at a time.",
   "End of support (or end of life) applies to your own software too: an operating system version on your VMs or a language runtime in your containers. Running unsupported software is a security and compliance risk, and auditors will flag it.",
   "Decommissioning is the final stage, and it is often done badly. A clean decommission confirms the resource is truly unused (check metrics and dependencies), notifies owners, takes a final backup if data must be retained, deletes the resource and everything attached to it, such as volumes, snapshots, public IPs, DNS records, load balancers and firewall rules, removes credentials and monitoring, and updates documentation and the CMDB (configuration management database). Leftovers cost money and create security gaps, such as a DNS record pointing to a released address."
  ],
  terms: [
   ["Deprecation", "A provider's announcement that a feature, version or resource type will no longer be supported after a certain date."],
   ["End of support", "The date after which a product no longer receives updates or security fixes."],
   ["Major version upgrade", "An upgrade that can change behavior or compatibility and requires testing and planning."],
   ["Decommissioning", "Retiring a resource safely, including removing its dependent resources, access and records."],
   ["CMDB", "Configuration management database: an inventory of IT assets and their relationships."]
  ],
  example: "A provider announces that a function runtime version will reach end of support in six months. The team's inventory shows 23 functions on it. They create tickets, upgrade and test each function in staging, and finish two months early, avoiding a scramble when the platform stops accepting updates to functions on the old runtime.",
  tip: "Watch provider notifications and keep an inventory so deprecations never surprise you. When decommissioning, remember the attached resources: volumes, snapshots, IP addresses, DNS records and credentials.",
  check: [
   ["What is the risk of continuing to run a database engine version past its end of support?", "It receives no security patches, creating vulnerability and compliance risk, and the provider may force an upgrade."],
   ["Name three things to remove when decommissioning a VM besides the VM itself.", "Its attached volumes and snapshots, public IP address, DNS records, load balancer targets, firewall rules, credentials and monitoring entries (any three)."]
  ]
 },
 {
  t: "Right-sizing, capacity planning and storage lifecycle policies to control cost",
  body: [
   "In the cloud you pay for what you provision, not for what you use. An instance running at 5 percent CPU costs the same as one at 80 percent. Right-sizing and good capacity planning close that gap.",
   "Right-sizing means matching resources to actual demand. Collect utilization over a representative period, at least a couple of weeks and ideally including peaks such as month end: CPU, memory, disk I/O and network. Memory often needs an agent to measure inside the VM. If an instance's peak CPU and memory stay low, move it to a smaller size or a different family; if memory is high but CPU low, a memory-optimized family may be both cheaper and faster. Providers offer right-sizing recommendations based on this data, but check them against known seasonal peaks before acting. Right-sizing also applies to databases, containers (resource requests and limits in Kubernetes) and provisioned storage performance, and it pairs with scheduling non-production resources to shut down outside working hours.",
   "Capacity planning looks forward. It combines current usage trends with business plans, such as a product launch, a new customer or seasonal sales, to predict future needs. In the cloud you do not buy hardware months ahead, but capacity planning still matters: it tells you how many reserved or committed resources to buy, whether service quotas need to be raised before a launch, whether a region has enough capacity for a special instance type, and what the budget should be. Revisit the plan regularly.",
   "Storage lifecycle policies manage data automatically as it ages. For object storage, a rule might move objects to an infrequent-access tier after 30 days, to archive after 90 days and delete them after seven years. Other rules delete old object versions, clean up incomplete multipart uploads and expire temporary files. For snapshots and backups, lifecycle policies create them on schedule and delete them after the retention period. Watch the details: cooler tiers charge for retrieval and often have minimum storage durations, so moving data that is still read often can raise costs rather than lower them."
  ],
  terms: [
   ["Right-sizing", "Adjusting resource size and type to match actual measured demand."],
   ["Capacity planning", "Forecasting future resource needs from trends and business plans."],
   ["Lifecycle policy", "Rules that automatically move data between storage tiers or delete it as it ages."],
   ["Minimum storage duration", "A billing rule in cooler tiers that charges for a minimum period even if data is deleted sooner."],
   ["Retrieval fee", "A charge for reading data from infrequent-access or archive storage tiers."]
  ],
  example: "A cost review finds 40 application servers averaging 8 percent CPU and 30 percent memory. After checking month-end peaks, the team moves them to smaller sizes, saving a large share of their compute cost. A lifecycle rule also moves year-old logs to archive and deletes them after the seven-year retention period.",
  tip: "Right-sizing uses measured utilization over time, including peaks. Lifecycle policies save money only if data is rarely read after the transition; frequent reads from a cold tier cost more because of retrieval fees.",
  check: [
   ["Why measure utilization over several weeks before right-sizing?", "To capture peaks and cycles, such as month-end processing, so you do not shrink an instance below what it needs at busy times."],
   ["When can moving data to an archive tier increase costs?", "When the data is still read often or deleted soon, because archive tiers charge retrieval fees and may bill a minimum storage duration."]
  ]
 },
 {
  t: "Service level agreements, SLOs and availability math (99.9% vs 99.99%)",
  body: [
   "Three related terms describe reliability. A service level indicator (SLI) is a measurement, such as the percentage of requests that succeed or the percentage served in under 300 ms. A service level objective (SLO) is the internal target for that indicator, such as 99.9 percent of requests succeeding over 30 days. A service level agreement (SLA) is a contract with customers that states a level of service and what happens if it is missed, usually service credits (a partial refund), not compensation for your business losses.",
   "SLAs are commitments, not guarantees of uptime. A provider SLA for a single VM is typically lower than for VMs spread across availability zones, and many SLAs apply only when you follow the recommended architecture. Read the definitions: what counts as downtime, how it is measured and how to claim credits. Set your own SLOs a little stricter than any SLA you offer so you have warning before you breach it.",
   "Availability math turns percentages into time. There are about 8,760 hours in a year, and an average month has about 730 hours, or roughly 43,800 minutes. At 99.9 percent (three nines) allowed downtime is 0.1 percent: about 8.76 hours per year or roughly 43 minutes per month. At 99.99 percent (four nines) it is about 52.6 minutes per year or roughly 4.3 minutes per month. At 99.999 percent it is about 5.3 minutes per year. Each extra nine cuts allowed downtime by a factor of ten and costs considerably more to achieve.",
   "When components depend on each other in series, multiply their availabilities: a web tier at 99.9 percent depending on a database at 99.9 percent gives 0.999 × 0.999 ≈ 99.8 percent, lower than either. When components are redundant in parallel, the system fails only if all fail: two independent instances each at 99 percent give 1 − (0.01 × 0.01) = 99.99 percent. This is why redundancy raises availability and long dependency chains lower it.",
   "The error budget is 100 percent minus the SLO. With a 99.9 percent SLO you may spend 0.1 percent on failures; if the budget is used up, teams slow releases and focus on reliability."
  ],
  terms: [
   ["SLI", "Service level indicator: a measured value of service behavior, such as success rate or latency."],
   ["SLO", "Service level objective: the internal target value for an SLI over a period."],
   ["SLA", "Service level agreement: a contractual commitment to a service level, usually with service credits if missed."],
   ["Error budget", "The amount of unreliability an SLO allows, equal to 100 percent minus the SLO."],
   ["Service credit", "A partial refund or billing credit given when a provider misses its SLA."]
  ],
  example: "A team promises customers 99.9 percent monthly availability. Their app depends on a load balancer, an app tier and a database, each around 99.95 percent. Multiplied in series, that is roughly 99.85 percent, below the promise, so they add a multi-AZ database and more redundant app instances to raise the weak links.",
  tip: "Memorize the approximate numbers: 99.9 percent is about 8.76 hours per year (about 43 minutes per month); 99.99 percent is about 52.6 minutes per year (about 4.3 minutes per month). Serial dependencies multiply and lower availability; redundancy raises it.",
  check: [
   ["Two services in series each have 99.9 percent availability. What is the combined availability?", "About 99.8 percent (0.999 × 0.999 = 0.998)."],
   ["What is the difference between an SLO and an SLA?", "An SLO is an internal reliability target; an SLA is a contractual commitment to customers with consequences, such as service credits, if missed."]
  ]
 },
 {
  t: "Operational automation: scheduled start and stop, runbooks and self-healing",
  body: [
   "Operations teams automate repetitive work because people are slow, expensive and inconsistent at it, and because automation runs at 3 a.m. without complaining. Cloud platforms make this easy with APIs, schedulers, event rules and serverless functions.",
   "Scheduled start and stop is the simplest and often most profitable automation. Development and test environments are typically used only during working hours, roughly a third of the hours in a week. A scheduler, whether a provider's instance scheduler, an automation service or a small function triggered on a timer, stops tagged instances in the evening and starts them in the morning, cutting their compute charges for the hours they are off. Tags such as `Schedule=office-hours` select which resources are affected. Remember that stopped instances still incur charges for attached storage and reserved IP addresses, and that some services cannot be stopped, only scaled down.",
   "A runbook is a documented procedure for a routine task or known problem: restart a stuck service, rotate a certificate, clear a full disk, fail over a database. Written runbooks help people respond consistently. Automated runbooks, run by automation services, configuration management tools or scripts, turn the same steps into code that can be triggered by a person with one click, by a schedule or by an alert. Good runbook automation includes checks before and after, logging of every action, safe limits and a clear path to escalate to a human when the automated steps do not fix the problem.",
   "Self-healing goes one step further: the system detects and repairs problems without human action. Autoscaling groups replace instances that fail health checks, orchestrators restart crashed containers and reschedule pods from failed nodes, managed databases fail over to a standby, and event-driven rules can react to an alarm, for example by running a runbook that restarts a service or extends a disk. Self-healing handles known, repeatable failures; it should still notify people and log what it did, so recurring problems are investigated and their root cause fixed rather than silently repaired every night."
  ],
  terms: [
   ["Scheduled start/stop", "Automatically stopping resources outside working hours and starting them when needed to save cost."],
   ["Runbook", "A documented procedure for a routine operation or known issue."],
   ["Runbook automation", "Executing runbook steps as code, triggered manually, on a schedule or by events."],
   ["Self-healing", "Automatic detection and repair of failures, such as replacing unhealthy instances."],
   ["Event-driven automation", "Automation triggered by an event or alarm rather than by a schedule or a person."]
  ],
  example: "An alarm fires whenever a web server's disk passes 90 percent. An event rule runs an automated runbook that compresses old logs, verifies free space is back above 30 percent, and posts a note in the team channel. After it runs three times in one week, an engineer finds the log rotation misconfiguration behind it and fixes the cause.",
  tip: "Idle non-production environments outside business hours point to scheduled stop and start, selected by tags. Self-healing should notify and log, not hide problems; recurring automated fixes signal a root cause to address.",
  check: [
   ["A stopped VM still appears on the bill. What is likely still being charged?", "Its attached block storage volumes (and any reserved public IP addresses), which are billed whether or not the instance runs."],
   ["Give two examples of self-healing in the cloud.", "An autoscaling group replacing an instance that fails health checks, and Kubernetes restarting a crashed container (also a managed database failing over to its standby)."]
  ]
 },
 {
  t: "Identity and access management: users, groups, roles, policies and least privilege",
  body: [
   "Identity and access management (IAM) decides who can do what to which resources in your cloud. Because everything in the cloud is controlled through APIs, IAM is the most important security control you have; a single overly broad permission can expose an entire environment.",
   "IAM starts with identities. Users represent people, each with their own credentials, never shared accounts. Groups collect users with the same job so you grant permissions once to the group rather than to each person; when someone changes jobs you move them between groups. Roles are sets of permissions that can be assumed temporarily by a user, a service or an application, receiving short-lived credentials instead of long-term keys. Service identities, covered in a later lesson, let workloads use roles without stored secrets.",
   "Policies are the documents that grant or deny permissions. A typical policy statement names an effect (allow or deny), actions (such as `storage:GetObject` or `compute:StartInstance`, the exact names differ by provider), resources the actions apply to and optional conditions, such as requiring MFA or a source IP range. Policies can be attached to identities (identity-based) or to resources such as a bucket (resource-based). Azure uses role-based access control (RBAC) with role definitions assigned at a scope, such as a subscription or resource group; Google Cloud binds roles to members on resources. The ideas are the same everywhere.",
   "The principle of least privilege means giving each identity only the permissions it needs to do its job, and no more, for only as long as it needs them. In practice: start with no access, grant specific actions on specific resources, prefer predefined narrow roles over administrator roles, avoid wildcards like `*` on actions and resources, use temporary elevation (just-in-time access) for rare administrative tasks, and review access regularly to remove unused permissions. Access reviews and tools that report permissions granted but never used help keep privilege from creeping upward over time.",
   "Related principles include separation of duties, so no single person can both make and approve a sensitive change, and default deny: anything not explicitly allowed is denied."
  ],
  terms: [
   ["IAM", "Identity and access management: the service and practices that control authentication and authorization to cloud resources."],
   ["Role", "A set of permissions that a user, service or application can assume, receiving temporary credentials."],
   ["Policy", "A document that allows or denies specific actions on specific resources, optionally under conditions."],
   ["Least privilege", "Granting only the minimum permissions required, for the minimum time."],
   ["Separation of duties", "Splitting sensitive tasks among different people so no one can misuse them alone."]
  ],
  example: "A new analyst needs to read reports in one storage bucket. Instead of attaching a broad storage administrator policy to her user, the administrator adds her to the Analysts group, whose policy allows only read and list actions on that bucket. When she moves to another team, removing her from the group removes the access.",
  tip: "Assign permissions to groups or roles, not directly to individual users. Least privilege means specific actions on specific resources; any answer that grants full administrator access or wildcards to solve a narrow need is usually wrong.",
  check: [
   ["Why grant permissions to groups instead of individual users?", "It is easier to manage and audit: people are added to or removed from groups as their jobs change, and permissions stay consistent."],
   ["What four parts does a typical policy statement contain?", "An effect (allow or deny), actions, resources and optional conditions."]
  ]
 },
 {
  t: "Federation and single sign-on (SAML, OpenID Connect), MFA and protecting the root or global admin account",
  body: [
   "Managing separate user accounts in every cloud and SaaS application does not scale and is insecure: people reuse passwords, and leavers keep access you forgot to remove. Federation fixes this by letting one trusted identity provider (IdP) authenticate users for many service providers (SPs), which trust the IdP's statement about who the user is.",
   "Single sign-on (SSO) is the user experience that results: sign in once to the corporate IdP and access many applications without signing in again. When an employee leaves, disabling one account in the IdP removes access everywhere. Federation also lets you map IdP groups to cloud roles, so group membership in the corporate directory controls cloud permissions.",
   "Two standards dominate. SAML 2.0 (Security Assertion Markup Language) uses XML assertions, signed by the IdP, that are passed through the user's browser to the service provider. It is widely used for enterprise web SSO into cloud consoles and SaaS apps. OpenID Connect (OIDC) is an identity layer built on OAuth 2.0 that uses JSON Web Tokens (JWTs), called ID tokens. It suits modern web and mobile applications and APIs, and it is also used for workload federation, for example letting a CI pipeline obtain temporary cloud credentials without stored keys. Remember that OAuth 2.0 on its own is about authorization, delegated access to resources, while OIDC adds authentication.",
   "Multi-factor authentication (MFA) requires two or more different factor types: something you know (password), something you have (authenticator app, hardware security key) and something you are (biometrics). Two passwords are not MFA. Phishing-resistant methods such as FIDO2 security keys are strongest; SMS codes are weakest because of SIM-swap and interception attacks, but still better than a password alone.",
   "The root account (AWS) or equivalent top-level administrator, such as a Global Administrator in Microsoft Entra ID, can do almost anything, including closing the account. Protect it: enable strong MFA, do not create access keys for it, do not use it for daily work, keep its credentials in a secure place, limit the number of global admins, set up break-glass emergency accounts with monitoring, and alert on every sign-in."
  ],
  terms: [
   ["Identity provider (IdP)", "The system that authenticates users and issues assertions or tokens that other services trust."],
   ["Federation", "A trust relationship that lets users authenticated by one identity provider access other services."],
   ["SAML 2.0", "An XML-based standard for exchanging signed authentication assertions, common in enterprise web SSO."],
   ["OpenID Connect", "An authentication layer on OAuth 2.0 that uses JSON Web Tokens as ID tokens."],
   ["Break-glass account", "A tightly controlled emergency administrator account used only when normal access fails."]
  ],
  example: "A company federates its cloud accounts with its corporate IdP using SAML. Engineers sign in with their normal credentials and a security key and land in roles mapped from their directory groups. The root account has a hardware MFA key locked in a safe, no access keys, and an alert that notifies the security team whenever it is used.",
  tip: "SAML means XML assertions and enterprise web SSO; OIDC means JSON tokens, modern apps and APIs; OAuth alone is authorization, not authentication. Root or global admin protection always includes MFA, no routine use and no access keys.",
  check: [
   ["An employee leaves. How does federation make removing their cloud access simpler?", "Disabling their account in the identity provider stops them signing in to every federated application and cloud account at once."],
   ["Is a password plus a security question MFA?", "No. Both are something you know; MFA needs factors from at least two different categories."]
  ]
 },
 {
  t: "Workload identities: instance roles, managed identities and service accounts instead of stored keys",
  body: [
   "Applications need to call cloud APIs too: a web server reads from object storage, a function writes to a queue, a pipeline deploys infrastructure. The old way was to create a user, generate a long-lived access key and put it in a configuration file or environment variable. Those keys leak constantly, through code committed to public repositories, container images, logs and backups, and they often stay valid for years.",
   "Workload identities remove stored secrets. Instead of a key, the workload itself gets an identity, and the platform provides it with short-lived credentials that rotate automatically. In AWS you attach an IAM role to an EC2 instance through an instance profile, or to a function or container task; code using the SDK finds temporary credentials from the instance metadata service without any configuration. In Azure, a managed identity (system-assigned, tied to one resource's lifecycle, or user-assigned, a standalone identity that can be shared) lets a VM, app service or function get tokens from Microsoft Entra ID. In Google Cloud, a service account attached to a VM or service plays the same part.",
   "You then grant that identity least-privilege permissions, exactly as you would for a person: this function may write to this queue only. Because credentials are temporary and fetched from the platform, there is nothing to rotate by hand and nothing useful to steal from a code repository.",
   "Two further points matter. First, the metadata endpoint that hands out credentials must be protected. Server-side request forgery (SSRF) attacks try to trick an application into requesting the metadata service and returning credentials; newer, session-oriented metadata versions, such as AWS IMDSv2, require a token and block that simple attack, so enforce them. Second, for workloads outside the cloud, such as a CI system or another cloud, use workload identity federation with OIDC: the external system presents a signed token and exchanges it for temporary cloud credentials. Service account keys should be a last resort, tightly restricted and rotated."
  ],
  terms: [
   ["Workload identity", "An identity assigned to an application or resource rather than a person, used to access other services."],
   ["Instance profile / instance role", "A way of attaching an IAM role to a VM so software on it receives temporary credentials."],
   ["Managed identity", "An Azure identity for a resource, managed by the platform, that obtains tokens without stored secrets."],
   ["Service account", "A non-human account used by applications and services, notably in Google Cloud and Kubernetes."],
   ["Instance metadata service", "A local endpoint on a VM that provides configuration and temporary credentials to software running on it."]
  ],
  example: "A security scan finds an access key in a configuration file on a web server image. The team deletes the key, attaches a role that allows reading only the application's bucket to the instance, and removes the configuration line. The SDK automatically uses the role's temporary credentials, and future images contain no secrets at all.",
  tip: "Whenever a question describes access keys stored in code, config files or environment variables for an app running in the cloud, the answer is an instance role, managed identity or service account with least privilege.",
  check: [
   ["Why are instance roles more secure than access keys in a configuration file?", "They provide short-lived credentials that rotate automatically and are never stored in files or code where they can leak."],
   ["What is the difference between a system-assigned and a user-assigned managed identity?", "A system-assigned identity is tied to one resource and deleted with it; a user-assigned identity is a separate resource that can be attached to several resources."]
  ]
 },
 {
  t: "Secrets and key management: KMS, HSMs, customer-managed keys, rotation and secrets managers",
  body: [
   "Encryption is only as strong as the protection of its keys, and applications still need some secrets, such as database passwords and third-party API tokens. Cloud platforms provide dedicated services for both.",
   "A key management service (KMS) creates, stores and controls cryptographic keys, and performs encryption operations with them so the key material never leaves the service. Most cloud encryption uses envelope encryption: data is encrypted with a data key, and the data key is encrypted with a key-encryption key held in KMS. Services store the encrypted data key alongside the data and ask KMS to decrypt it when needed. KMS keys have policies controlling who can use and administer them, and every use is logged, which gives you an audit trail of data access.",
   "Keys come in levels of control. Provider-managed keys are created and rotated by the provider for a service, with no work for you. Customer-managed keys (CMKs) are created in your KMS: you set the key policy, enable rotation, can disable or schedule deletion, and see usage logs. Some services also support bring your own key (BYOK), importing key material you generated, or keeping keys in an external key store you control. A hardware security module (HSM) is tamper-resistant hardware that generates and stores keys; KMS services use HSMs internally, and dedicated cloud HSM services give single-tenant HSMs when regulations require exclusive control, validated to standards such as FIPS 140-2 or 140-3.",
   "Key rotation replaces key material periodically. With automatic rotation in KMS, new data is encrypted with the new version while older versions are kept to decrypt existing data. Be careful with deletion: deleting a key makes all data encrypted with it unrecoverable, which is why services impose a waiting period before deletion.",
   "A secrets manager stores secrets such as passwords, connection strings and tokens encrypted, controls access with IAM, logs retrieval, and can rotate some secrets automatically, for example updating a database password and the stored value together. Applications fetch secrets at runtime using their workload identity instead of reading them from code, images or environment files."
  ],
  terms: [
   ["KMS", "Key management service: a managed service that creates, stores and uses encryption keys under access policies."],
   ["HSM", "Hardware security module: tamper-resistant hardware for generating, storing and using cryptographic keys."],
   ["Customer-managed key", "A key the customer controls in KMS, including its policy, rotation and deletion."],
   ["Envelope encryption", "Encrypting data with a data key and encrypting that data key with a master key."],
   ["Secrets manager", "A service that stores, controls access to and rotates application secrets."]
  ],
  example: "A payments company must show auditors that it can revoke access to stored cardholder data at any time. It encrypts the database and backups with a customer-managed key, enables annual automatic rotation, stores the database password in a secrets manager with 30-day rotation, and gives only the application's managed identity permission to read it.",
  tip: "Control over rotation, key policy and revocation means customer-managed keys; a single-tenant, compliance-driven requirement for dedicated hardware means a cloud HSM. Passwords and tokens belong in a secrets manager, not in code or environment files.",
  check: [
   ["What happens to data encrypted with a KMS key if that key is deleted?", "It can no longer be decrypted, so the data is effectively lost; that is why deletion has a waiting period."],
   ["How does automatic key rotation affect existing encrypted data?", "Old key versions are kept to decrypt existing data, while new encryption uses the new key version; data does not become unreadable."]
  ]
 },
 {
  t: "Data protection: encryption at rest and in transit, tokenization, data classification and DLP",
  body: [
   "Data protection starts with knowing what data you have and how sensitive it is, then applying controls that match. Cloud+ covers the main technical controls and when each applies.",
   "Data classification labels data by sensitivity, for example public, internal, confidential and restricted, or by regulated type, such as personal data, health data or payment card data. Classification drives everything else: which encryption, which regions, who may access it, how long to keep it and how to dispose of it. Tag or label cloud resources with their classification so policies and monitoring can act on it, and use discovery tools that scan storage for sensitive data to find what has been stored where nobody expected.",
   "Encryption at rest protects stored data on disks, object storage, databases, snapshots and backups. In the cloud it is usually a setting: enable default encryption and pick provider-managed or customer-managed keys. It protects against lost media and some storage-level access, but it does not stop an authorized user or a compromised application that reads data through the normal service. Encryption in transit protects data moving over networks, typically with TLS (Transport Layer Security) for web and API traffic, SSH for administration and IPsec for VPNs. Enforce TLS on load balancers and storage endpoints, disable outdated protocol versions and manage certificates so they do not expire. Some workloads also use encryption in use, such as confidential computing, which protects data while it is processed.",
   "Tokenization replaces a sensitive value, such as a card number, with a random token that has no mathematical relationship to it; the real value is kept in a secured token vault. Systems that store only tokens fall outside much of the compliance scope. Encryption, by contrast, can be reversed by anyone with the key. Masking hides part of a value (showing only the last four digits), and hashing produces a one-way fingerprint.",
   "Data loss prevention (DLP) tools inspect data in storage, email and network traffic for patterns such as card numbers or national ID numbers, and can alert, block, quarantine or redact. DLP catches accidental and malicious exfiltration that access controls alone miss."
  ],
  terms: [
   ["Data classification", "Labeling data by sensitivity or regulatory type to decide how it must be protected."],
   ["Encryption at rest", "Encrypting stored data on disks, databases, object storage and backups."],
   ["Encryption in transit", "Encrypting data as it moves across networks, usually with TLS, SSH or IPsec."],
   ["Tokenization", "Replacing sensitive data with a non-sensitive token, keeping the original in a secure vault."],
   ["DLP", "Data loss prevention: tools that detect and stop sensitive data leaving approved locations."]
  ],
  example: "An online retailer tokenizes card numbers at checkout so its order database stores only tokens, encrypts all storage at rest with customer-managed keys, forces TLS on its load balancer and APIs, and runs a DLP scan of its storage buckets that alerts when a file containing card number patterns appears in an unapproved location.",
  tip: "Tokenization is not encryption: a token cannot be mathematically reversed, and it reduces compliance scope. Encryption at rest does not protect against someone with valid access reading data through the application; that needs access control and monitoring.",
  check: [
   ["Why does tokenization reduce the scope of a payment card compliance audit?", "Systems storing only tokens do not hold real card numbers, so they are not handling cardholder data; only the token vault must be tightly controlled."],
   ["Which control would detect an employee uploading a file full of customer ID numbers to a public share?", "Data loss prevention (DLP), which inspects content for sensitive patterns."]
  ]
 },
 {
  t: "Network security controls: security groups vs network ACLs, WAF, DDoS protection and private endpoints",
  body: [
   "Cloud networks offer several layers of filtering, and exam questions often turn on the differences between them.",
   "A security group is a virtual firewall attached to an instance or network interface. It is stateful: if an inbound connection is allowed, the return traffic is allowed automatically, and vice versa. In AWS, security groups support only allow rules; anything not allowed is denied. They can reference other security groups as sources, for example allowing the database group to accept port 5432 only from the app server group, which keeps working as instances come and go. Azure network security groups (NSGs) are also stateful but support both allow and deny rules with priorities, and can be applied to subnets or interfaces.",
   "A network ACL (NACL), in AWS terms, applies to a whole subnet. It is stateless: return traffic must be explicitly allowed, which usually means allowing ephemeral ports (1024-65535) for responses. It supports both allow and deny rules and processes them in number order, stopping at the first match. NACLs are useful as a coarse subnet boundary, for example to block a known malicious address range quickly, while security groups provide fine-grained instance control. A forgotten return-traffic rule in a NACL is a classic troubleshooting scenario.",
   "A web application firewall (WAF) inspects HTTP and HTTPS requests at layer 7, in front of a load balancer, API gateway or CDN. It blocks common web attacks such as SQL injection and cross-site scripting using managed rule sets, and can apply rate limiting and geographic or IP rules. Network firewalls cannot see these attacks because they look only at addresses and ports. DDoS protection absorbs and filters floods of traffic intended to overwhelm a service. Basic protection against network-layer floods is included by major providers; advanced tiers add application-layer protection, monitoring and response support. CDNs and autoscaling also help absorb load.",
   "Private endpoints (or private links) give a managed service, such as object storage or a database, a private IP address inside your virtual network, so traffic never crosses the public internet, and you can then disable the service's public endpoint. Gateway or service endpoints are a related option that keeps traffic on the provider's network."
  ],
  terms: [
   ["Security group", "A stateful virtual firewall applied to instances or interfaces."],
   ["Network ACL", "A stateless, ordered allow and deny rule list applied at the subnet boundary."],
   ["Stateful filtering", "Tracking connections so return traffic for an allowed connection is automatically permitted."],
   ["WAF", "Web application firewall: a layer 7 filter that blocks attacks such as SQL injection and cross-site scripting."],
   ["Private endpoint", "A private IP address in your virtual network that connects to a managed service without using the public internet."]
  ],
  example: "An app's database accepts connections only from the app tier's security group on port 5432. A WAF in front of the load balancer blocks SQL injection attempts, the storage account holding customer files is reached through a private endpoint with public access disabled, and a subnet NACL blocks an address range seen in an attack.",
  tip: "Stateful and per-instance: security group. Stateless, ordered, per-subnet and able to deny: NACL. SQL injection or cross-site scripting: WAF, not a network firewall. Keep traffic to a managed service off the internet: private endpoint.",
  check: [
   ["A NACL allows inbound port 443, but clients time out. Security groups are correct. What is likely missing?", "An outbound NACL rule allowing return traffic to the clients' ephemeral ports, because NACLs are stateless."],
   ["Which control would block a SQL injection attempt in an HTTP request?", "A web application firewall (WAF)."]
  ]
 },
 {
  t: "Zero trust and segmentation for cloud workloads",
  body: [
   "Traditional network security assumed that everything inside the corporate perimeter could be trusted. Once an attacker got inside, often through one phished laptop, they could move freely. In the cloud the perimeter barely exists: users work from anywhere, services call each other across accounts and providers, and SaaS applications live outside your network entirely.",
   "Zero trust replaces location-based trust with a simple rule: never trust, always verify. Every request is authenticated and authorized explicitly, using as many signals as possible: the user's identity and MFA status, the device's health and management status, location, time and the sensitivity of the resource. Access is least privilege and often just in time. And the design assumes breach: segment everything so a compromise stays small, encrypt all traffic, including internal traffic, and log and monitor continuously. Identity becomes the new perimeter.",
   "Segmentation divides the environment so that a compromise in one part cannot easily spread. At a large scale, use separate accounts, subscriptions or projects for production, development, security tooling and different business units, with centrally enforced policies. Within a virtual network, use separate subnets for each tier with security rules that allow only the flows the application needs: the load balancer to the web tier on 443, the web tier to the app tier on its port, the app tier to the database on its port, and nothing else.",
   "Microsegmentation goes down to individual workloads. Security groups that reference other groups, Kubernetes network policies that control which pods may talk to which, and service meshes that enforce mutual TLS (mTLS) between services all apply fine-grained, identity-based rules instead of broad subnet rules. East-west traffic, traffic between workloads inside the environment, is filtered as carefully as north-south traffic entering from outside.",
   "For user access, zero trust network access (ZTNA) or identity-aware proxies grant access to specific applications after checking identity and device, instead of a VPN that puts the user onto the whole network."
  ],
  terms: [
   ["Zero trust", "A security model that trusts no user, device or network by default and verifies every request explicitly."],
   ["Microsegmentation", "Fine-grained segmentation that controls traffic between individual workloads."],
   ["East-west traffic", "Traffic between systems inside the same environment, as opposed to north-south traffic entering or leaving it."],
   ["Mutual TLS", "TLS in which both client and server present certificates to authenticate each other."],
   ["ZTNA", "Zero trust network access: giving users access to specific applications after identity and device checks, rather than whole-network VPN access."]
  ],
  example: "After an incident in which a compromised web server was used to reach a file server in the same flat subnet, a company moves each tier into its own subnet, uses security group references so only the app tier can reach the database, adds Kubernetes network policies that deny pod-to-pod traffic by default, and replaces its VPN with an identity-aware proxy for admin tools.",
  tip: "Zero trust keywords are never trust, always verify; verify explicitly; least privilege; assume breach. If a question describes lateral movement in a flat network, the answer involves segmentation or microsegmentation.",
  check: [
   ["What does assume breach mean in zero trust design?", "Design as if an attacker is already inside: segment, encrypt internal traffic, limit privileges and monitor so any compromise stays contained and is detected."],
   ["Name two cloud tools for microsegmentation.", "Security groups that reference other security groups, Kubernetes network policies and service mesh mTLS policies (any two)."]
  ]
 },
 {
  t: "Vulnerability management: scanning hosts, container images and IaC; CSPM for misconfigurations",
  body: [
   "Vulnerability management is the continuous cycle of finding, prioritizing, fixing and verifying weaknesses. In the cloud the weaknesses are not only unpatched software but also insecure configurations, which cause a large share of cloud breaches.",
   "Host scanning checks VMs for missing patches, vulnerable packages and insecure settings. Agent-based scanners run on each instance and report continuously; agentless scanners use the cloud API or snapshots to inspect disks without installing software. Findings are usually scored with CVSS (Common Vulnerability Scoring System) and identified by CVE numbers (Common Vulnerabilities and Exposures). Prioritize using more than the score: is the system internet-facing, is the vulnerability being actively exploited, and what data does the system hold? Authenticated (credentialed) scans see much more than unauthenticated ones.",
   "Container image scanning inspects the packages in each image layer. Scan in the CI pipeline before pushing, scan in the registry on push, and rescan stored images regularly, because new CVEs are published for packages that were clean yesterday. Use minimal base images to reduce what can be vulnerable, and fail the build on critical findings that have fixes available.",
   "Infrastructure as code scanning, a form of shift-left security, analyzes templates before deployment for problems like storage buckets without encryption, security groups open to `0.0.0.0/0` on SSH or databases with public access. Catching these in a pull request is far cheaper than finding them in production. Static analysis and dependency scanning do the same for application code and libraries.",
   "Cloud security posture management (CSPM) continuously checks your live cloud accounts against security best practices and compliance frameworks, finding misconfigurations such as public buckets, unencrypted volumes, root accounts without MFA, overly permissive IAM policies and disabled logging. CSPM tools score posture, map findings to frameworks and can sometimes remediate automatically. Broader platforms, often called CNAPP (cloud-native application protection platforms), combine CSPM with workload and identity protection.",
   "Close the loop: assign findings to owners, track them to remediation within set timeframes, verify with a rescan and document accepted risks with an expiry date."
  ],
  terms: [
   ["CVE", "Common Vulnerabilities and Exposures: a public identifier for a specific known vulnerability."],
   ["CVSS", "Common Vulnerability Scoring System: a 0-10 score describing a vulnerability's severity."],
   ["Credentialed scan", "A vulnerability scan that logs in to the target for a more complete view of installed software and settings."],
   ["IaC scanning", "Analyzing infrastructure-as-code templates for insecure configurations before deployment."],
   ["CSPM", "Cloud security posture management: continuous detection of misconfigurations and compliance gaps in cloud accounts."]
  ],
  example: "A pull request adds a template that opens SSH to 0.0.0.0/0. The pipeline's IaC scanner fails the check and the engineer changes the rule to a bastion's security group. That night, the CSPM tool also flags an older, manually created bucket that allows public reads, and the owner is assigned a ticket to fix it.",
  tip: "Misconfigurations in live cloud accounts, such as public buckets or disabled logging, point to CSPM. Catching insecure templates before deployment points to IaC scanning. Vulnerable packages in images point to registry or pipeline image scanning.",
  check: [
   ["Why rescan container images that already passed a scan?", "New CVEs are published continually, so packages that were clean when the image was built may now be known to be vulnerable."],
   ["Which tool continuously detects a storage bucket that someone made public in the console?", "Cloud security posture management (CSPM)."]
  ]
 },
 {
  t: "Compliance and governance: data sovereignty, regulatory frameworks, policy enforcement and audit logs",
  body: [
   "Governance is the set of rules and processes that keep cloud use aligned with the organization's obligations and risk appetite; compliance is proving you meet external requirements. In the cloud, governance is increasingly enforced by code rather than by memos.",
   "Data sovereignty means data is subject to the laws of the country where it is stored or processed. Data residency is the requirement or choice to keep data in a particular location. Regulations and contracts may require that certain data stays in a country or region, so you choose regions carefully, restrict which regions resources can be created in, and watch for services that replicate or process data elsewhere, such as global services, support access and backups copied to another region.",
   "You should recognize common frameworks and what they cover. GDPR (General Data Protection Regulation) governs personal data of people in the EU. HIPAA (Health Insurance Portability and Accountability Act) governs protected health information in the United States. PCI DSS (Payment Card Industry Data Security Standard) applies to organizations handling payment card data. SOC 2 reports describe a service organization's controls, and ISO/IEC 27001 is an international standard for information security management systems. FedRAMP covers cloud services used by US federal agencies. Providers publish compliance reports and certifications for their infrastructure, but under shared responsibility your configuration and data handling must also comply; using a compliant provider does not make you compliant.",
   "Policy enforcement turns rules into guardrails. Organization-level policies, such as service control policies, Azure Policy or organization policy constraints, can deny actions outright (no resources outside approved regions, no public IP addresses on databases, required encryption), require tags or audit and auto-remediate non-compliant resources. Preventive controls stop bad changes; detective controls find them afterward. A landing zone sets these up from the start for every new account.",
   "Audit logs record who did what, when and from where. Enable API activity logging (for example control plane audit logs) in every account and region, send logs to a central, separate security account, protect them from alteration with restricted access and immutability, and keep them as long as your regulations require. Audit logs are the evidence auditors ask for and the first thing investigators need."
  ],
  terms: [
   ["Data sovereignty", "The principle that data is subject to the laws of the country where it is located."],
   ["Data residency", "The requirement or choice to store data in a specific geographic location."],
   ["Policy as code", "Defining governance rules as machine-enforced policies that allow, deny or audit resource configurations."],
   ["Guardrail", "A preventive or detective control that keeps accounts within approved configurations."],
   ["Audit log", "A tamper-resistant record of actions performed in an environment, including who, what, when and where."]
  ],
  example: "A European insurer must keep customer data in the EU. Its organization policy denies resource creation outside two EU regions, another policy requires encryption and a DataClass tag on all storage, and API audit logs from every account flow to a locked logging account where retention matches its regulatory requirement.",
  tip: "Keeping data in a country is data residency or sovereignty; enforce it with region restriction policies. Using a certified provider does not make your workload compliant, because of shared responsibility. Audit logs belong in a separate, protected account.",
  check: [
   ["Which framework applies to a company that stores customer credit card numbers?", "PCI DSS (Payment Card Industry Data Security Standard)."],
   ["What is the difference between a preventive and a detective governance control?", "A preventive control blocks a non-compliant action before it happens; a detective control identifies non-compliance after the fact so it can be fixed."]
  ]
 },
 {
  t: "Hardening: CIS benchmarks, secure baselines, disabling unused services and endpoint protection",
  body: [
   "Hardening reduces a system's attack surface: fewer running services, fewer open ports, fewer accounts and safer defaults mean fewer ways in. Out of the box, operating systems and applications are configured for easy setup, not for security.",
   "The CIS Benchmarks, published by the Center for Internet Security, are consensus-based configuration guides for operating systems, databases, containers, Kubernetes and the major cloud platforms themselves. They list specific settings, such as password policy, audit logging, SSH configuration and file permissions, with the reasoning behind each. Level 1 profiles are practical settings with little impact on function; Level 2 profiles are stricter for high-security environments and may affect usability. Some providers and marketplaces offer pre-hardened CIS images, and scanning tools can check systems against the benchmarks.",
   "A secure baseline is your organization's approved standard configuration for a system type, usually derived from a benchmark and adjusted for your needs. Build the baseline into golden images and infrastructure as code so every instance starts compliant, and use configuration management or compliance scans to detect drift from it. Document any exceptions with the reason and an owner.",
   "Typical hardening steps on a cloud VM include: disable or remove services and packages that are not needed; close unused ports in both the host firewall and security groups; disable password authentication for SSH and use keys or, better, a session manager that needs no open inbound port; remove or disable default accounts and change default credentials; restrict administrative access; enable logging and time synchronization; apply patches; and restrict access to the instance metadata service.",
   "Endpoint protection adds detection and response on the host itself. Traditional antivirus matches known malware; endpoint detection and response (EDR) records process, file and network activity, detects suspicious behavior and lets responders isolate a host remotely. Host-based intrusion detection and file integrity monitoring alert on unexpected changes to system files. For containers, runtime security tools watch for unexpected processes or network connections in running workloads. Deploy these agents through the golden image so no instance runs unprotected."
  ],
  terms: [
   ["Hardening", "Reducing attack surface by removing unnecessary components and applying secure settings."],
   ["CIS Benchmarks", "Consensus-based secure configuration guides from the Center for Internet Security."],
   ["Secure baseline", "An organization's approved, documented secure configuration for a type of system."],
   ["EDR", "Endpoint detection and response: host agents that record activity, detect threats and support response actions."],
   ["File integrity monitoring", "Detecting unauthorized changes to important system and application files."]
  ],
  example: "A team builds its Linux golden image from a CIS Level 1 profile: it removes unused packages, disables root SSH login and password authentication, enables audit logging, installs the EDR agent and enforces the newer metadata service version. A weekly compliance scan flags two instances that drifted after manual changes, and they are replaced.",
  tip: "Hardening questions usually want the option that removes or disables something unnecessary, or applies a recognized benchmark. Build baselines into images and IaC, then scan for drift.",
  check: [
   ["What is the difference between CIS Level 1 and Level 2 profiles?", "Level 1 applies practical security settings with minimal impact on function; Level 2 is stricter for high-security environments and may reduce usability."],
   ["Why is disabling unused services a hardening step?", "Each running service is potential attack surface; if it is not needed, removing it eliminates its vulnerabilities and open ports."]
  ]
 },
 {
  t: "Cloud incident response: containment, evidence preservation with snapshots and logs, and recovery",
  body: [
   "Incident response (IR) follows the same phases in the cloud as on premises, commonly described as preparation; detection and analysis; containment, eradication and recovery; and post-incident activity (lessons learned). What changes in the cloud are the tools and speed: you can isolate a server, snapshot its disk or revoke its credentials with one API call.",
   "Preparation makes everything else possible. Enable and centralize audit logs, flow logs and service logs before an incident; you cannot collect logs retroactively. Create a separate forensics account, pre-approved IR roles with break-glass access, runbooks for common scenarios such as leaked access keys or a compromised instance, and understand what your provider will and will not do under shared responsibility.",
   "Containment limits the damage. For a compromised VM, a common approach is to replace its security groups with an isolation group that allows no traffic, or only traffic from a forensics workstation, remove it from the load balancer and autoscaling group so it is not terminated automatically, and tag it as under investigation. Do not simply terminate it: that destroys memory and possibly disk evidence. For compromised credentials, disable or revoke the keys, revoke active sessions and review what they were used for. Consider whether attackers created persistence, such as new users, roles, keys or scheduled functions.",
   "Evidence preservation keeps what you need to understand and prove what happened. Take snapshots of the instance's volumes and copy them to the forensics account; capture memory if your tools allow it, before shutdown; export the relevant audit logs, flow logs and application logs, and protect them from modification. Record hashes and a chain of custody: who collected what, when and how, and who has handled it since. Analyze copies, never the originals.",
   "Eradication removes the cause: patch the vulnerability, remove malicious resources, rotate secrets. Recovery restores service from known-good sources, for example redeploying from a clean golden image and IaC and restoring data from backups taken before the compromise, then monitoring closely for recurrence. The lessons-learned review documents the root cause and turns it into improvements."
  ],
  terms: [
   ["Containment", "Actions that stop an incident from spreading or causing more damage."],
   ["Isolation security group", "A restrictive security group applied to a compromised instance to cut off its network access."],
   ["Chain of custody", "Documentation of who collected, handled and stored evidence, and when, to preserve its integrity."],
   ["Forensic snapshot", "A point-in-time copy of a compromised volume taken to preserve evidence for analysis."],
   ["Eradication", "Removing the cause of an incident, such as malware, backdoors or the exploited vulnerability."]
  ],
  example: "An alert shows an instance calling a known malicious address. The responder applies an isolation security group, detaches the instance from its autoscaling group, snapshots its volumes into a forensics account, exports the flow logs and audit logs, and records hashes. The service is recovered by launching fresh instances from the current golden image while analysts examine the snapshots.",
  tip: "Isolate, don't terminate: terminating a compromised instance destroys evidence. Preserve with snapshots and logs copied to a separate account and document chain of custody. Recover from known-good images and backups, not by cleaning the compromised host.",
  check: [
   ["Why remove a compromised instance from its autoscaling group before investigating?", "So the group does not terminate it as unhealthy or during scale-in, which would destroy evidence."],
   ["What is the first thing to do when an access key is found in a public code repository?", "Disable or revoke the key immediately (containment), then review audit logs for its use and check for persistence the attacker may have created."]
  ]
 },
 {
  t: "Source control with Git: branches, pull requests, merges and tagging releases",
  body: [
   "Source control records every change to code and configuration: who changed what, when and why, with the ability to go back. Git is the standard tool, and in cloud operations it holds not only application code but also infrastructure as code, pipeline definitions, scripts and policies.",
   "A Git repository contains the full history as a series of commits. Each commit is a snapshot with an author, a message and a unique hash. The basic cycle is to edit files, stage them with `git add`, record them with `git commit -m \"message\"`, and share them with `git push` to a remote repository hosted on a platform such as GitHub, GitLab, Bitbucket or a cloud provider's repository service. `git pull` fetches and merges others' changes, and `git clone` copies a repository to your machine.",
   "Branches let you work on a change without affecting the main line of code. You create a feature branch (`git switch -c feature/add-cache`), commit to it, and when it is ready, merge it back into the main branch. Common strategies include trunk-based development, with short-lived branches merged to main frequently, and models with long-lived develop and release branches. Short-lived branches cause fewer painful conflicts.",
   "A pull request (called a merge request on some platforms) asks to merge a branch into another. It shows the diff, runs automated checks from the CI pipeline and lets teammates review and comment. Branch protection rules on main can require approvals, passing checks and no direct pushes, which gives you peer review and separation of duties for infrastructure changes as well as code. When merged, Git either creates a merge commit joining the histories or, with rebase or squash merging, places the changes on top as a cleaner linear history. A merge conflict happens when both branches changed the same lines; a person must decide the correct result.",
   "Tags mark specific commits, usually releases, with names like `v2.3.0` following semantic versioning (major.minor.patch). Annotated tags (`git tag -a v2.3.0 -m \"Release 2.3.0\"`) record who tagged and when. Pipelines often build and deploy from tags, so you always know exactly which code is running. Never commit secrets: once pushed, they stay in history, and they must be rotated even after removal."
  ],
  terms: [
   ["Commit", "A recorded snapshot of changes in Git, with an author, message and unique hash."],
   ["Branch", "An independent line of development within a repository."],
   ["Pull request", "A request to merge one branch into another, used for review and automated checks."],
   ["Merge conflict", "A situation where two branches change the same lines and Git cannot combine them automatically."],
   ["Tag", "A named pointer to a specific commit, typically used to mark a release version."]
  ],
  example: "An engineer changes a Terraform module on a branch, opens a pull request, and the pipeline runs formatting checks, a security scan and a plan. A teammate reviews the plan output and approves. After merging, the release manager tags the commit v1.8.0 and the pipeline deploys exactly that tagged version.",
  tip: "Pull requests with branch protection provide review, automated checks and an audit trail. Tags identify releases. If a secret is committed, removing it in a new commit is not enough; rotate the secret, because it remains in history.",
  check: [
   ["What is the purpose of branch protection on the main branch?", "To stop direct pushes and require pull requests with approvals and passing checks before changes are merged."],
   ["Why tag releases?", "Tags mark the exact commit that was released, so you can rebuild, deploy or roll back to a known version."]
  ]
 },
 {
  t: "Continuous integration: automated builds, unit tests and artifact creation",
  body: [
   "Continuous integration (CI) is the practice of merging developers' changes into a shared branch frequently, often several times a day, and automatically building and testing every change. The goal is to find integration problems within minutes, while the change is small and fresh in the developer's mind, instead of weeks later during a painful integration phase.",
   "A CI server or service watches the repository. When code is pushed or a pull request is opened, a webhook triggers a pipeline defined in a file stored with the code, commonly YAML. The pipeline runs on build agents or runners, which may be hosted by the service or self-hosted. Typical steps are: check out the code, install dependencies, compile or package, run linters and static analysis, run unit tests, run security scans on code and dependencies, and produce a build artifact. If any step fails, the pipeline stops and reports the failure on the pull request, and the team treats a broken build as the top priority.",
   "Unit tests check small pieces of code, such as a single function, in isolation, using fake or mocked dependencies. They run in seconds and give precise feedback. Integration tests check that components work together, such as the application with a real database, and take longer, so they may run later in the pipeline. Code coverage reports show how much code the tests exercise, although high coverage does not guarantee good tests.",
   "The output of a successful build is an artifact: a deployable package such as a container image, a zip file for a function, a compiled binary or a library package. Store artifacts in an artifact repository or container registry with a unique version, for example the build number or the Git commit hash, so every artifact can be traced back to the exact source that produced it. Build once, deploy many: the same artifact moves through test, staging and production, rather than being rebuilt in each environment, which could introduce differences.",
   "Keep builds fast and reproducible: pin dependency versions, cache dependencies and run tests in parallel."
  ],
  terms: [
   ["Continuous integration", "Frequently merging code changes into a shared branch with automatic building and testing of each change."],
   ["Build agent / runner", "The machine or container that executes pipeline jobs."],
   ["Unit test", "An automated test that checks a small unit of code in isolation."],
   ["Build artifact", "The versioned, deployable output of a build, such as a container image or package."],
   ["Artifact repository", "A storage service for versioned build outputs, such as a package repository or container registry."]
  ],
  example: "A developer opens a pull request that changes the pricing function. Within four minutes the CI pipeline compiles the code, runs 600 unit tests, and fails because a test for discount rounding breaks. The developer fixes it before review, and the merged build produces a container image tagged with the commit hash in the registry.",
  tip: "CI is about building and testing every change automatically and producing a versioned artifact. Build once and promote the same artifact; do not rebuild for each environment.",
  check: [
   ["Why tag build artifacts with the commit hash or build number?", "So each artifact is uniquely identifiable and traceable to the exact source code that produced it."],
   ["How do unit tests differ from integration tests?", "Unit tests check small pieces of code in isolation and run quickly; integration tests check that components work together with real dependencies and take longer."]
  ]
 },
 {
  t: "Continuous delivery vs continuous deployment, approval gates and pipeline stages",
  body: [
   "Continuous integration produces a tested artifact. What happens next is continuous delivery or continuous deployment. Both share the abbreviation CD, which is why exams like to test the difference.",
   "With continuous delivery, every change that passes the pipeline is automatically deployed to test and staging environments and is always in a releasable state, but the final release to production requires a manual approval, often a person clicking approve after reviewing test results or confirming the change window. With continuous deployment, there is no manual step: every change that passes all automated tests and checks goes straight to production. Continuous deployment needs excellent automated testing, monitoring and fast rollback, usually with canary or blue-green releases, and many organizations use feature flags to deploy code while keeping new features switched off until they are ready.",
   "A pipeline is organized in stages, each with jobs, and a change must pass one stage to move to the next. A typical sequence is: source (triggered by a commit or merge), build, unit test and scan, deploy to a test environment, integration and acceptance tests, deploy to staging, performance or security tests, an approval gate, deploy to production, and post-deployment smoke tests. Stages can run jobs in parallel to save time.",
   "Gates control promotion between stages. A manual approval gate waits for a named person or group, which supports separation of duties and change management. Automated gates check conditions: all tests passed, no critical vulnerabilities found, code coverage above a threshold, a change ticket approved, or monitoring showing no active alerts in the target environment. Deployment windows can block releases at risky times.",
   "Pipelines themselves need security: store credentials in the pipeline's secrets store or use workload identity federation, give each stage only the permissions it needs, require reviews for changes to pipeline definitions and keep logs of who approved each release."
  ],
  terms: [
   ["Continuous delivery", "Every passing change is automatically prepared and deployed to pre-production; production release needs manual approval."],
   ["Continuous deployment", "Every passing change is released to production automatically with no manual step."],
   ["Pipeline stage", "A phase of a pipeline, such as build, test or deploy, that must succeed before the next begins."],
   ["Approval gate", "A checkpoint that requires manual approval or automated conditions before promotion."],
   ["Feature flag", "A setting that turns a feature on or off at runtime without redeploying code."]
  ],
  example: "A bank uses continuous delivery: each merge deploys automatically to test and staging, but a change manager approves the production stage after reviewing test results. A startup's marketing site uses continuous deployment: every merge that passes tests goes live within fifteen minutes, with a canary step and automatic rollback on errors.",
  tip: "The only difference between continuous delivery and continuous deployment is the manual approval before production. If a human approves production releases, it is continuous delivery.",
  check: [
   ["A pipeline deploys automatically to staging, then waits for a manager to approve production. Which practice is this?", "Continuous delivery."],
   ["Name two automated gate conditions a pipeline might check before promotion.", "All tests passing, no critical vulnerabilities, coverage thresholds met, change ticket approved, or no active alerts in the target environment (any two)."]
  ]
 },
 {
  t: "Infrastructure as code tools: declarative vs imperative, Terraform, CloudFormation, ARM/Bicep",
  body: [
   "Infrastructure as code tools differ mainly in two ways: whether they are declarative or imperative, and whether they are tied to one provider.",
   "A declarative approach describes the desired end state: there should be a virtual network with these two subnets and a VM of this size. The tool compares that desired state with what exists and makes whatever changes are needed, creating, updating or deleting resources. Running it again with no changes does nothing. An imperative approach lists the steps to perform: create the network, then create the subnet, then launch the VM. Scripts using CLI commands or SDKs are imperative; they are flexible but you must handle the case where resources already exist, and running a script twice may create duplicates. Most IaC tools are declarative, although they are often driven by imperative scripts in a pipeline.",
   "Terraform, from HashiCorp, is a widely used declarative tool that works with many providers (AWS, Azure, Google Cloud, Kubernetes, DNS services and many more) through plug-ins called providers. You write configuration in HCL (HashiCorp Configuration Language), run `terraform init` to download providers, `terraform plan` to preview changes and `terraform apply` to make them. Terraform keeps a state file mapping configuration to real resources, usually stored remotely with locking. Reusable modules package common patterns. OpenTofu is an open-source fork with the same workflow.",
   "AWS CloudFormation is AWS's native declarative service. Templates in JSON or YAML define resources, and CloudFormation deploys them as a stack, tracking state itself. Change sets preview changes, failed updates roll back automatically, and drift detection reports manual changes. Azure Resource Manager (ARM) templates are Azure's native JSON format; Bicep is a more readable language that compiles to ARM templates, and deployments are managed by Azure itself, so there is no separate state file to look after. Google Cloud has its own native options and also commonly uses Terraform.",
   "Choose provider-native tools for deep integration and no state file to manage; choose a multi-provider tool such as Terraform for multicloud and for managing other services, such as DNS or monitoring, in the same workflow."
  ],
  terms: [
   ["Declarative", "Describing the desired end state and letting the tool determine how to reach it."],
   ["Imperative", "Specifying the exact sequence of commands to execute."],
   ["Terraform", "A multi-provider declarative IaC tool using HCL, providers, modules and a state file."],
   ["CloudFormation", "AWS's native IaC service that deploys JSON or YAML templates as stacks."],
   ["Bicep", "A domain-specific language for Azure deployments that compiles to ARM templates."]
  ],
  example: "A company running workloads in AWS and Azure standardizes on Terraform so one team, one language and one pipeline can manage networks in both clouds plus its external DNS provider. Its Azure-only subsidiary keeps using Bicep because it needs no state file and integrates directly with Azure deployments.",
  tip: "Terraform is multi-provider and uses a state file; CloudFormation is AWS-only; ARM and Bicep are Azure-only. Declarative describes what; imperative describes how. Multicloud IaC in one tool points to Terraform.",
  check: [
   ["What does terraform plan do?", "It compares the configuration with the state and real infrastructure and shows the changes that apply would make, without making them."],
   ["Why is a declarative template safe to run twice?", "It describes the end state, so if resources already match, the tool makes no changes instead of creating duplicates."]
  ]
 },
 {
  t: "Configuration management: Ansible, Puppet and Chef; agent vs agentless; idempotency",
  body: [
   "Infrastructure as code tools create resources such as networks and VMs. Configuration management tools configure what runs inside servers: installed packages, files, users, services and settings. The two overlap, but the division is useful: provision with IaC, configure with configuration management, or bake the configuration into images.",
   "Ansible, maintained by Red Hat, is agentless. A control node connects to managed hosts over SSH (or WinRM for Windows) and runs tasks described in YAML files called playbooks. Tasks call modules, such as `ansible.builtin.package` or `ansible.builtin.service`, and roles package reusable collections of tasks. Hosts are listed in an inventory, which can be generated dynamically from the cloud provider's API. Because nothing needs to be installed on the targets, Ansible is quick to adopt, and it works in push mode: you run it when you want changes applied.",
   "Puppet and Chef are traditionally agent-based. An agent installed on each server periodically pulls its desired configuration from a central server and applies it, so drift is corrected automatically on every run, typically every 30 minutes by default in Puppet. Puppet uses its own declarative language in manifests and modules; Chef uses Ruby-based recipes grouped into cookbooks. The agent model scales well and enforces configuration continuously, at the cost of installing and maintaining agents and certificates. Agentless tools need network access and credentials to reach every host, while agent-based tools need the central server reachable from every agent.",
   "Idempotency is the key property of good configuration management: applying the same configuration many times gives the same result as applying it once. A task that says the nginx package must be installed does nothing if it is already there; a task that says a line must exist in a file will not add it twice. Idempotency makes it safe to rerun configurations to fix drift, and it is why you should use proper modules rather than raw shell commands, which may not be idempotent.",
   "Configuration management is also used to enforce security baselines and to collect facts about servers for inventory and compliance."
  ],
  terms: [
   ["Configuration management", "Automating and enforcing the software and settings inside servers."],
   ["Agentless", "Managing hosts over existing protocols such as SSH or WinRM without installing software on them."],
   ["Agent-based", "Managing hosts through a locally installed agent that pulls and applies configuration."],
   ["Idempotency", "The property that applying an operation repeatedly gives the same result as applying it once."],
   ["Playbook", "An Ansible YAML file that defines tasks to run against a group of hosts."]
  ],
  example: "An operations team uses an Ansible playbook with a dynamic cloud inventory to ensure every web server has the approved nginx version, TLS settings and log shipping agent. Running the playbook nightly reports zero changes on compliant servers and corrects the one where someone edited the config by hand.",
  tip: "Ansible: agentless, push, YAML playbooks over SSH. Puppet and Chef: agent-based, pull from a central server. Idempotent means safe to run repeatedly with the same result.",
  check: [
   ["Which of Ansible, Puppet and Chef is agentless?", "Ansible, which connects over SSH or WinRM."],
   ["Why is idempotency important in configuration management?", "Configurations can be reapplied repeatedly, for example to correct drift, without causing duplicate changes or errors."]
  ]
 },
 {
  t: "APIs, webhooks and data formats (JSON, YAML) for cloud automation",
  body: [
   "Everything in the cloud is ultimately an API call. The console, the CLI, SDKs and IaC tools are all clients of the same provider APIs, so understanding APIs helps you automate and troubleshoot.",
   "Most cloud APIs are REST-style APIs over HTTPS. A client sends a request with a method, a URL (endpoint) identifying the resource, headers and often a body. The methods map to actions: GET reads, POST creates or triggers an action, PUT replaces, PATCH updates part of a resource and DELETE removes. Requests must be authenticated, typically with a signed request using temporary credentials or an OAuth 2.0 bearer token in the Authorization header. Responses carry status codes: 200 OK and 201 Created for success; 400 Bad Request for invalid input; 401 Unauthorized when authentication is missing or invalid; 403 Forbidden when you are authenticated but not permitted; 404 Not Found; 429 Too Many Requests when you are rate limited; and 5xx codes for server-side errors, which are usually worth retrying with exponential backoff.",
   "A webhook reverses the direction. Instead of your script repeatedly asking a service whether something happened (polling), the service sends an HTTP POST to a URL you registered when an event occurs: a commit is pushed, a build finishes, an alert fires. Webhooks trigger pipelines, chat notifications and automation functions. Protect webhook receivers by verifying a shared-secret signature on each request and using HTTPS.",
   "JSON (JavaScript Object Notation) is the usual format for API bodies: objects in braces with quoted keys, arrays in square brackets, strings in double quotes, plus numbers, true, false and null. It does not allow comments or trailing commas. YAML is a superset of JSON designed for people to write, used for Kubernetes manifests, CI pipelines, Ansible playbooks and CloudFormation templates. It uses indentation with spaces (never tabs) for structure, dashes for list items and `key: value` pairs, and supports comments with `#`.",
   "```yaml\nservice:\n  name: web\n  ports:\n    - 80\n    - 443\n  public: true\n```\n\nThe same data in JSON is `{\"service\": {\"name\": \"web\", \"ports\": [80, 443], \"public\": true}}`. A wrong indentation in YAML changes the structure, which is a common cause of failed deployments."
  ],
  terms: [
   ["REST API", "An HTTP-based interface where resources are addressed by URLs and manipulated with methods such as GET, POST, PUT and DELETE."],
   ["Webhook", "An HTTP callback that a service sends to a registered URL when an event occurs."],
   ["JSON", "A lightweight text data format of objects, arrays, strings, numbers, booleans and null."],
   ["YAML", "A human-friendly data format using indentation for structure, common in configuration files."],
   ["Exponential backoff", "Retrying a failed request after progressively longer waits to avoid overloading a service."]
  ],
  example: "A team registers a webhook in its Git hosting service that posts to the CI system whenever main changes. The pipeline then calls the cloud API to deploy. When the deployment script starts receiving 429 responses during a large rollout, the engineer adds exponential backoff and the errors stop.",
  tip: "401 means authentication failed (who are you?); 403 means authenticated but not allowed; 429 means rate limited, so back off and retry. Webhooks push events to you; polling asks repeatedly. YAML uses spaces for indentation, never tabs.",
  check: [
   ["A script's API call returns 403. Is the problem the credentials or the permissions?", "Permissions: the caller was authenticated but is not authorized for that action or resource."],
   ["What is the advantage of a webhook over polling?", "The service notifies you immediately when an event happens, instead of your code repeatedly asking and wasting requests."]
  ]
 },
 {
  t: "Container images, registries, tagging and promoting one build through environments",
  body: [
   "A container image is a read-only package containing an application, its runtime, libraries and configuration defaults, built in layers from a Dockerfile or similar build file. Each instruction, such as copying files or installing packages, creates a layer; layers are cached and shared between images, which speeds builds and saves storage.",
   "```dockerfile\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nUSER 1000\nCMD [\"python\", \"app.py\"]\n```",
   "Good images start from a small, trusted base image, install only what is needed, run as a non-root user and contain no secrets. Multi-stage builds compile code in one stage and copy only the result into a minimal final image. Smaller images pull faster and have fewer vulnerabilities.",
   "Images are stored in a registry: a public registry such as Docker Hub, or a private registry such as the container registries offered by each cloud provider. Within a registry, a repository holds the versions of one image. Private registries integrate with IAM, so nodes and pipelines authenticate with workload identities, and many scan images on push. Place registries close to the clusters that pull from them, and use replication for multi-region deployments.",
   "Each image version is referenced by a tag, such as `web:1.4.2`, or by a digest, a SHA-256 hash of its content (`web@sha256:...`). Tags are mutable pointers unless the registry enforces immutability, so `latest` or even `1.4.2` can be moved to a different image. That makes deployments unpredictable, which is why production should use specific version tags with tag immutability enabled, or digests. A common convention is to tag with both the semantic version and the Git commit hash.",
   "Promotion means moving the same image through environments. CI builds the image once, tags it and pushes it. The test environment deploys that exact image; when it passes, the pipeline promotes it to staging and then production, perhaps by adding an environment tag or copying it to a production registry, but never by rebuilding. Rebuilding could pull a newer base image or dependency and produce something that was never tested. Image signing and admission policies can ensure clusters run only images that were built by your pipeline and passed its scans."
  ],
  terms: [
   ["Container image", "A layered, read-only package of an application and its dependencies used to run containers."],
   ["Registry", "A service that stores and distributes container images."],
   ["Image tag", "A human-readable label, such as a version, that points to a specific image."],
   ["Image digest", "A content hash that uniquely and immutably identifies an image."],
   ["Image promotion", "Deploying the same built image through successive environments without rebuilding it."]
  ],
  example: "A pipeline builds `orders:2.7.0` once, scans it and pushes it to the registry with tag immutability enabled. Test and staging deploy that tag, and after approval production deploys the same digest. When a bug appears, rolling back means redeploying `orders:2.6.3`, which is still in the registry.",
  tip: "Avoid latest in production; use immutable version tags or digests. Build once and promote the same image; rebuilding per environment breaks the guarantee that what you tested is what you run.",
  check: [
   ["Why is deploying the latest tag risky in production?", "It is a moving pointer, so different nodes or deployments may pull different images, and you cannot be sure which version is running or roll back reliably."],
   ["What uniquely and unchangeably identifies an image?", "Its digest, a SHA-256 hash of the image content."]
  ]
 },
 {
  t: "Scripting for cloud administration: CLI tools, Bash, PowerShell and Python",
  body: [
   "Scripts fill the gaps between consoles and full infrastructure as code: bulk changes, reports, scheduled clean-up jobs, glue between systems and quick investigations. Cloud+ expects you to read simple scripts and recognize the right tool for a task, not to be a software developer.",
   "Each provider offers a command-line interface: the AWS CLI (`aws`), the Azure CLI (`az`) and the Google Cloud CLI (`gcloud`), plus Azure PowerShell modules. CLIs authenticate with a configured profile, a single sign-on session or the workload identity of the machine they run on, and they can output JSON for further processing. Most support query or filter options to return only the fields you need, which is handy in scripts. For example, `aws ec2 describe-instances --filters Name=instance-state-name,Values=stopped` lists stopped instances. Cloud shells in the browser give you an authenticated CLI with no local installation.",
   "Bash is the default shell on most Linux systems. It is ideal for chaining commands with pipes, loops over lists of resources, and quick automation on Linux servers and in CI jobs. Tools such as `jq` parse JSON output, `grep` filters lines and `curl` calls APIs. Start scripts with `set -euo pipefail` so they stop on errors instead of continuing blindly.",
   "PowerShell is object-oriented: commands called cmdlets, named in Verb-Noun form such as `Get-AzVM`, pass structured objects rather than text through the pipeline, so you can filter and select properties without parsing strings. It is native to Windows administration and also runs on Linux and macOS, making it common for Azure and Microsoft 365 automation.",
   "Python is a general-purpose language with official cloud SDKs, such as boto3 for AWS and the Azure and Google Cloud client libraries. It is the best choice when logic gets complex: error handling, retries, data processing, calling several APIs, or writing serverless functions.",
   "Whatever the language, write scripts safely: never hard-code credentials, use workload identities or profiles, add a dry-run option before destructive actions, log what the script did, handle pagination and rate limits, store scripts in Git and test them in non-production first."
  ],
  terms: [
   ["CLI", "Command-line interface, such as aws, az or gcloud, for managing cloud resources from a terminal or script."],
   ["Bash", "A Unix shell and scripting language used on Linux for command automation."],
   ["PowerShell", "An object-based shell and scripting language whose cmdlets use Verb-Noun names."],
   ["SDK", "Software development kit: a library for calling cloud APIs from a programming language such as Python."],
   ["Dry run", "Running a script or command in a mode that shows what it would do without making changes."]
  ],
  example: "An administrator writes a Python script using the provider SDK that finds unattached volumes older than 30 days in every region, writes a report, and deletes them only when run with a --confirm flag. It runs weekly as a scheduled serverless function using a role that can list and delete volumes and nothing else.",
  tip: "Bash passes text; PowerShell passes objects; Python suits complex logic and SDK work. Any script answer that hard-codes access keys is wrong; use profiles, SSO or workload identities.",
  check: [
   ["What does set -euo pipefail do at the top of a Bash script?", "It makes the script exit on errors, on use of undefined variables and when any command in a pipeline fails, instead of continuing silently."],
   ["Why is PowerShell called object-oriented?", "Cmdlets pass structured objects with properties through the pipeline, rather than plain text that must be parsed."]
  ]
 },
 {
  t: "The troubleshooting methodology applied to cloud incidents",
  body: [
   "CompTIA exams use a consistent troubleshooting methodology, and Cloud+ applies it to cloud problems. Knowing the order of the steps answers many questions directly.",
   "The steps are: identify the problem; establish a theory of probable cause; test the theory to determine the cause; establish a plan of action to resolve the problem and identify its effects; implement the solution or escalate as necessary; verify full system functionality and implement preventive measures if applicable; and document findings, actions and outcomes throughout.",
   "Identify the problem by gathering information: what exactly is failing, for whom, since when, and what changed? In the cloud, check recent deployments, IaC changes, configuration changes in the audit log, certificate expiry dates and the provider's health dashboard. Question users, reproduce the problem if you can and determine the scope: one instance, one availability zone, one region or everyone. Remember to consider multiple problems and approach each separately.",
   "Establish a theory, questioning the obvious. Work methodically, for example top down or bottom up through the OSI layers, or by following the path of a request from DNS to load balancer to instance to database. Then test the theory: look at metrics and logs, check a security group, run a test query. If the theory is confirmed, determine the next steps; if not, form a new theory or escalate to another team or the provider.",
   "Plan the fix and consider its effects before acting. In production that usually means following change management, choosing a time that minimizes impact and having a rollback plan. Implement the fix, or escalate if it is outside your authority or skills. Then verify full functionality, not just that the error disappeared: check that users can complete their tasks and monitoring is normal, and add preventive measures, such as an alert or an automated test, so it does not recur.",
   "Finally, document the symptoms, cause, fix and lessons learned in the ticket, knowledge base or post-incident review. Documentation is what makes the next incident faster."
  ],
  terms: [
   ["Scope", "How widely a problem is felt: one resource, a zone, a region or all users."],
   ["Theory of probable cause", "A hypothesis about what is causing the problem, to be tested."],
   ["Escalation", "Passing a problem to a person or team with more authority, access or expertise, including the provider."],
   ["Change management", "The process of reviewing, approving and scheduling changes to reduce risk."],
   ["Post-incident review", "A blameless analysis after an incident that records the cause and improvements."]
  ],
  example: "Users in one office cannot reach an internal web app. The engineer identifies that the problem began after a network change, theorizes that a security group rule was removed, confirms it in the audit log, plans to restore the rule through the IaC pipeline, applies it, verifies users can sign in and adds a test that checks the rule, then documents it all in the ticket.",
  tip: "Know the order: identify, theory, test, plan, implement or escalate, verify and prevent, document. Questioning users and asking what changed belong to identifying the problem, which comes before forming a theory.",
  check: [
   ["What step comes right after confirming a theory of probable cause?", "Establish a plan of action to resolve the problem and identify its potential effects."],
   ["After implementing a fix, what must you do before documenting?", "Verify full system functionality and, if applicable, implement preventive measures."]
  ]
 },
 {
  t: "Network troubleshooting: routes, security groups, NACLs, DNS, NAT and peering problems",
  body: [
   "Most cloud connectivity problems come from a short list of causes. Troubleshoot by following the packet's path and checking each control in turn.",
   "Routes come first. Every subnet uses a route table. If an instance in a supposedly public subnet cannot be reached from the internet, check for a `0.0.0.0/0` route to an internet gateway and confirm the instance has a public IP address. If private instances cannot reach the internet, check the route to the NAT gateway, that the NAT gateway sits in a public subnet with its own internet route, and that it is in a working state. For hybrid traffic, check that routes to on-premises ranges point to the VPN or interconnect gateway and that BGP is advertising the expected prefixes.",
   "Next, the filters. Security groups are stateful, so check that the inbound rule allows the right port from the right source; a rule allowing the wrong port, or a source that is the wrong CIDR or security group, is common. Network ACLs are stateless, so check both directions, including outbound rules for return traffic on ephemeral ports, and remember that a lower-numbered deny rule wins over a later allow. Host firewalls inside the VM, such as iptables or Windows Defender Firewall, can block traffic even when cloud rules are correct. Flow logs show whether traffic was accepted or rejected and are the fastest way to find which layer is dropping it.",
   "DNS problems look like connectivity problems. Check that the name resolves (`nslookup` or `dig`), to the expected address, from the client's location. Private DNS zones must be associated with the virtual network; hybrid setups need resolver forwarding rules so on-premises clients can resolve cloud private names and vice versa. Stale cached records after a change point to TTL.",
   "Peering and transit issues have their own checklist: the peering connection must be accepted and active; both sides need routes pointing to the peering; CIDR ranges must not overlap; security groups must allow the other network's range; and remember that peering is not transitive, so traffic cannot hop through a middle network without a transit hub.",
   "Tools include `ping` (note ICMP is often blocked), `traceroute` or `tracert`, `curl -v`, `nc -zv host port` to test a TCP port, the provider's reachability analyzers, and flow logs."
  ],
  terms: [
   ["Flow logs", "Records of network traffic metadata, including whether each flow was accepted or rejected."],
   ["Ephemeral ports", "Temporary high-numbered ports used by clients for the return side of connections."],
   ["Resolver forwarding rule", "A DNS rule that sends queries for certain domains to a specific DNS server, used in hybrid setups."],
   ["Reachability analyzer", "A provider tool that analyzes configured routes and rules to explain whether a path is reachable."],
   ["Overlapping CIDR", "Two networks using the same or intersecting address ranges, which prevents routing between them."]
  ],
  example: "An app server in VPC A cannot reach a database in peered VPC B. The peering is active and the database's security group allows the app's CIDR. Flow logs show no traffic arriving in B, and VPC A's route table has no route for B's range via the peering connection. Adding the route fixes it.",
  tip: "Work the path in order: DNS, routes, NACLs, security groups, host firewall, application. Flow logs with REJECT entries point to a security group or NACL; no traffic at all usually points to routing or DNS.",
  check: [
   ["Private instances cannot download updates, but everything else works. Name two things to check.", "The private route table's 0.0.0.0/0 route to a NAT gateway, and that the NAT gateway is in a public subnet with a route to an internet gateway (also its status)."],
   ["Why must you check outbound rules on a NACL for an inbound web service?", "NACLs are stateless, so response traffic to clients' ephemeral ports must be explicitly allowed outbound."]
  ]
 },
 {
  t: "Access and permission failures: policy evaluation, explicit deny, expired credentials and certificates",
  body: [
   "An access denied error is one of the most common cloud support tickets. Solving it quickly depends on knowing how the platform evaluates permissions.",
   "Most cloud IAM systems follow the same basic logic. By default, every request is implicitly denied. An allow in an applicable policy grants access. An explicit deny in any applicable policy overrides every allow. So the order to think in is: is there an explicit deny anywhere? If not, is there an allow? If not, the implicit deny applies. Explicit denies can come from many places: identity policies, resource policies such as a bucket policy or key policy, permission boundaries, session policies and organization-level guardrails such as service control policies. An organization policy that denies an action in all regions except two will block even a full administrator in a third region.",
   "Look at the details. Is the policy attached to the identity actually being used? Scripts and applications often run under a different role or profile than you expect, so check the caller identity (for example `aws sts get-caller-identity` or `az account show`). Does the resource ARN or scope in the policy match exactly, including the difference between a bucket and the objects inside it? Do conditions apply, such as requiring MFA, a source IP address, a VPC endpoint or particular tags? For encrypted resources, the caller also needs permission to use the KMS key. In Azure, RBAC role assignments can take several minutes to propagate, and the assignment's scope matters. Audit logs record the denied call and often the reason, and policy simulators or access analyzers can test a request.",
   "Expired credentials cause errors that look similar. Temporary session tokens expire after their configured duration; SSO sessions must be renewed; passwords and access keys may be rotated by policy; client secrets for app registrations have expiry dates; and OIDC tokens are short-lived. Error messages such as token expired or invalid signature point here rather than to permissions. Clock skew on a server can also cause signature failures.",
   "Certificates expire too. An expired TLS certificate on a load balancer or API endpoint breaks every client, and an expired certificate in a trust chain or federation setup (such as a SAML signing certificate) breaks sign-in. Use managed certificates with automatic renewal where possible, and monitor expiry dates."
  ],
  terms: [
   ["Implicit deny", "The default result when no policy explicitly allows a request."],
   ["Explicit deny", "A deny statement in any applicable policy, which overrides all allows."],
   ["Permission boundary", "A policy that sets the maximum permissions an identity can have, regardless of what other policies allow."],
   ["Service control policy", "An organization-level guardrail that limits what accounts in the organization can do."],
   ["Clock skew", "A difference between a system's clock and real time that can make signed requests or tokens appear invalid."]
  ],
  example: "A developer with an administrator policy gets access denied creating a VM in a new region. The audit log shows the call was denied by an organization policy that allows only two approved regions. No change to his own permissions could fix it; the platform team must approve and update the guardrail.",
  tip: "Explicit deny always wins, and it can come from an organization policy, a resource policy or a boundary, not just the user's own policy. Token expired or signature errors point to credentials, certificates or clock skew, not to missing permissions.",
  check: [
   ["A user has an allow for s3:GetObject in her identity policy, but the bucket policy explicitly denies her. What is the result?", "Denied, because an explicit deny in any applicable policy overrides an allow."],
   ["Every client suddenly gets TLS errors connecting to an API that was working yesterday. What should you check first?", "Whether the TLS certificate on the endpoint or load balancer has expired (or its chain changed)."]
  ]
 },
 {
  t: "Deployment failures: quotas and service limits, template errors, capacity and image problems",
  body: [
   "When a deployment fails, the error message usually names the category. Learn to recognize the common ones.",
   "Quotas and service limits cap how many resources an account, subscription or project can use: vCPUs per region or per instance family, number of VPCs, public IP addresses, load balancers, API requests and so on. They exist to protect both you and the provider from runaway usage. A deployment that works in one region or account but fails in another with an error such as limit exceeded or quota exceeded has hit one. The fix is to request a quota increase through the provider's quota or support console, clean up unused resources, or deploy elsewhere. Check quotas during capacity planning, before launches and before DR tests, since a DR region often has lower default quotas than your main region. Some limits are hard and cannot be raised.",
   "Template errors come from infrastructure as code. Syntax errors, such as invalid JSON, wrong YAML indentation or HCL typos, fail during validation, so run the tool's validate and lint commands in CI. Other errors appear only at deployment: a referenced resource or parameter does not exist, a value is invalid for the region, two resources depend on each other in a circle, a name that must be globally unique is taken, or the deploying identity lacks a permission. Native tools often roll back the whole deployment on failure, so read the first failure event, not the rollback messages that follow it.",
   "Capacity problems are different from quotas. Your quota may allow 64 more vCPUs, but the provider may temporarily have no capacity for a particular instance type in a specific availability zone, especially for GPUs or large sizes. Errors such as insufficient capacity are solved by trying another zone, another instance type in the same family, or reserving capacity ahead of time for critical launches. Spot requests fail or are interrupted for the same reason.",
   "Image problems include an image ID that does not exist in the target region (image IDs are often region-specific, so images must be copied), an image that was deprecated or deleted, an image not shared with the target account, an architecture mismatch between the image and the instance type, a marketplace image whose terms were not accepted, or an encrypted image whose key the account cannot use. For containers, look for image pull errors: a wrong tag, a missing registry credential or no network path to the registry."
  ],
  terms: [
   ["Service quota", "A limit on the number or rate of resources an account can use, often adjustable on request."],
   ["Hard limit", "A service limit that cannot be increased."],
   ["Insufficient capacity", "A provider-side shortage of a resource type in a location, unrelated to your quota."],
   ["Template validation", "Checking IaC syntax and structure before deployment."],
   ["Image pull error", "A failure to download a container image, often due to a wrong tag, missing credentials or network issues."]
  ],
  example: "A DR test fails when the recovery template tries to launch 40 instances in the secondary region. The error says the vCPU limit is exceeded, because that region still has default quotas. The team requests an increase, copies its golden image to the region, since the image ID was also region-specific, and adds a quarterly quota check to the DR runbook.",
  tip: "Limit or quota exceeded: request an increase or clean up. Insufficient capacity: change zone or instance type. Image not found in a new region: copy the image, because image IDs are usually regional.",
  check: [
   ["What is the difference between hitting a quota and an insufficient capacity error?", "A quota is an account limit you can often raise; insufficient capacity means the provider has no available resources of that type in that location right now."],
   ["A template that works in region A fails in region B with an image not found error. Why?", "Image IDs are usually region-specific; the image must be copied to region B and the template must use the new ID."]
  ]
 },
 {
  t: "Performance problems: resource contention, throttling and API rate limits, latency and bottlenecks",
  body: [
   "Performance troubleshooting is about finding the bottleneck: the one resource that limits the whole system. Adding capacity anywhere else will not help.",
   "Start with the four basic resources on each tier. CPU: sustained high utilization, or high CPU steal time on a VM, which shows the hypervisor giving CPU time to other guests. On burstable instances, check whether CPU credits have run out, which drops performance to the baseline. Memory: high usage, swapping to disk or out-of-memory kills of processes and containers. Storage: IOPS or throughput at the volume's provisioned limit, rising queue length and latency. Network: bandwidth at the instance type's limit, packet loss or connection limits. Contention for any of these, including a noisy neighbor on shared hardware, shows up as rising latency.",
   "Throttling means a service deliberately limits you. Cloud APIs enforce rate limits per account or per operation and respond with HTTP 429 or a throttling error when you exceed them; scripts and applications should retry with exponential backoff and jitter, reduce request volume with caching and batching, or request higher limits. Storage volumes throttle at their provisioned IOPS; managed databases throttle connections or throughput at their size; serverless functions have concurrency limits, beyond which invocations are throttled; and API gateways throttle clients according to usage plans. Throttling metrics are published for most services, so look for them before assuming the service is slow.",
   "Latency is time. Measure it end to end and then per hop to see where it is added: DNS lookup, TLS handshake, network distance between regions, load balancer, application processing and database queries. Distributed tracing breaks a request into spans for exactly this purpose. Common causes include cross-region or cross-zone calls that could be local, missing database indexes, lock contention, chatty applications that make many small calls, cold starts and exhausted connection pools. Use percentiles, such as p95 and p99, rather than averages, because averages hide the slow requests users notice.",
   "Fix the bottleneck with the right tool: scale out or up, change instance or volume type, add a cache or read replica, optimize queries, move components closer together or request limit increases. Then compare with the baseline to confirm."
  ],
  terms: [
   ["Bottleneck", "The single component whose capacity limits the performance of the whole system."],
   ["CPU steal time", "Time a virtual CPU waits because the hypervisor is serving other guests."],
   ["Throttling", "Deliberate limiting of requests or throughput by a service when limits are exceeded."],
   ["Rate limit", "The maximum number of API requests allowed in a period."],
   ["p95 / p99 latency", "The latency below which 95 or 99 percent of requests complete, showing the experience of slower requests."]
  ],
  example: "A reporting job slows every afternoon. The VM's CPU is at 30 percent, but the database volume shows IOPS flat at its provisioned limit with a long queue. Moving the volume to a type with higher provisioned IOPS, and adding an index to the heaviest query, cuts the job time in half.",
  tip: "A metric flat-lining at an exact value, such as IOPS at the provisioned number, is a sign of throttling at a limit. HTTP 429 means rate limited: back off and retry. Burstable instances that slow down after a busy period have likely exhausted CPU credits.",
  check: [
   ["A burstable VM performs well in the morning but slows to a crawl every afternoon under steady load. What is the likely cause?", "It has used up its CPU credits and is being held to its baseline performance; use a non-burstable instance or enable unlimited or extra credits if offered."],
   ["Why use p99 latency instead of average latency?", "Averages hide slow outliers; p99 shows the experience of the slowest one percent of requests, which users do notice."]
  ]
 },
 {
  t: "Cost and billing anomalies: orphaned resources, data egress charges and runaway autoscaling",
  body: [
   "Cloud cost problems usually build quietly and then appear as a surprise on the bill. Knowing the usual suspects makes them fast to find.",
   "Detect early. Set budgets with alerts at thresholds such as 50, 80 and 100 percent of the expected monthly spend, enable the provider's cost anomaly detection, which learns normal patterns and alerts on unusual spikes, and review cost reports grouped by service, account, region and tag. Consistent tagging tells you who owns a cost; untagged spend is a finding in itself.",
   "Orphaned resources are left behind when their parent is deleted or a project ends: unattached block volumes after VMs are terminated, old snapshots and backups beyond retention, unused elastic or static public IP addresses, idle load balancers with no targets, NAT gateways in abandoned networks, forgotten test databases and stopped instances whose disks are still billed. Each may be small, but hundreds add up. Find them with cost reports, provider advisor or recommendation tools and simple scripts, then clean up with lifecycle policies and tagging rules that require an owner and expiry date on temporary resources.",
   "Data egress charges are fees for data leaving the provider's network to the internet, and often for data moving between regions and sometimes between availability zones. Data coming in is generally free. Surprises come from serving large downloads directly from storage instead of through a CDN, replicating data across regions, chatty services placed in different zones or regions, large log or backup exports, and traffic from private subnets to cloud services through a NAT gateway, which adds processing charges when a private endpoint would avoid them.",
   "Runaway autoscaling happens when a scaling group or serverless platform keeps adding capacity: a bad deployment makes instances fail health checks and get replaced in a loop, a scaling metric is misconfigured, a bug causes a function to trigger itself recursively, or a traffic spike or attack drives scale-out. Protect against it with sensible maximum instance counts and concurrency limits, alarms on instance counts and invocation rates, and budget alerts. When investigating a spike, compare the timing with deployments and configuration changes in the audit log."
  ],
  terms: [
   ["Orphaned resource", "A resource left running or stored after the thing that used it is gone, still generating charges."],
   ["Data egress", "Data transferred out of a provider's network or between regions, which is usually billed."],
   ["Cost anomaly detection", "A service that learns normal spending patterns and alerts on unusual changes."],
   ["Budget alert", "A notification when actual or forecast spend crosses a set threshold."],
   ["Runaway scaling", "Uncontrolled growth in instances or invocations caused by misconfiguration, bugs or attacks."]
  ],
  example: "A cost anomaly alert shows data transfer charges tripling. Cost reports grouped by service and resource point to one storage bucket serving large video files directly to the internet after a marketing campaign. The team puts a CDN in front of the bucket, which cuts origin egress and speeds up delivery.",
  tip: "Cost questions usually point to one of three causes: orphaned resources (unattached volumes, idle IPs, old snapshots), egress (data leaving the cloud or crossing regions) or runaway scaling (no sensible maximum). Budgets and anomaly detection catch them early.",
  check: [
   ["After a project ends, its VMs are terminated, but storage charges remain. What is the likely cause?", "Orphaned resources such as unattached volumes and snapshots that were not deleted with the VMs."],
   ["Which autoscaling setting limits the cost impact of a bug that causes endless scale-out?", "The maximum capacity (maximum instance count or concurrency limit), backed by alarms and budget alerts."]
  ]
 },
 {
  t: "Using logs, metrics, traces and provider health dashboards to find root cause",
  body: [
   "Finding the root cause means finding why something happened, not just what broke. Restarting a crashed service fixes the symptom; discovering that a memory leak in last week's release fills memory in six hours fixes the cause. Cloud+ expects you to know which data source answers which question.",
   "Metrics are the place to start because they show when and where. Look at dashboards for the affected service and pinpoint when the behavior changed: error rate, latency, traffic, saturation. Then narrow scope by splitting metrics by availability zone, instance, version or endpoint. A problem limited to one zone suggests infrastructure; one version suggests a deployment; one endpoint suggests code or a dependency.",
   "Logs explain what happened at that time. Filter aggregated logs to the time window and component, looking for errors, stack traces, timeouts and warnings, and use correlation IDs to follow one failing request across services. Audit logs of control plane activity answer the question of what changed: who modified a security group, deployed a template, rotated a key or changed a scaling policy just before the problem began. Recent changes are the most common cause of incidents, so always check them.",
   "Traces show where time went or where a request failed in a chain of microservices, pointing directly at the slow or failing dependency, whether an internal service, a database call or a third-party API.",
   "Provider health dashboards tell you whether the problem is yours. Every major provider publishes a public status page for broad service issues and a personalized health view (for example a service health or personal health dashboard in the console) showing events that affect your specific resources, such as a degraded host scheduled for retirement or a regional service disruption. Check them early: if the provider has a known incident in your region, you can stop hunting in your own configuration and move to workarounds, such as failing over to another zone or region.",
   "Combine the sources into a timeline, test the theory, fix the cause and record it in a post-incident review with a 5 whys or similar analysis, so contributing factors such as missing alerts or weak tests also get fixed."
  ],
  terms: [
   ["Root cause", "The underlying reason a problem occurred, which, if fixed, prevents it from recurring."],
   ["Control plane audit log", "A log of management API actions, recording who changed what and when."],
   ["Provider health dashboard", "A provider's view of service incidents and events affecting your resources."],
   ["Timeline", "An ordered record of events and changes used to connect causes to effects during analysis."],
   ["5 whys", "A root cause technique of repeatedly asking why until the underlying cause is reached."]
  ],
  example: "Errors spike at 14:05 in one availability zone only. The provider's personal health dashboard shows no events. Metrics split by instance reveal that only instances launched after 13:50 fail, and the audit log shows a launch template update at 13:48 that changed the image. Rolling back the template fixes it; the cause was an image missing an application dependency.",
  tip: "Metrics show when and where, logs show what, traces show where in the request chain, audit logs show what changed, and health dashboards show whether it is the provider. Always ask what changed just before the problem began.",
  check: [
   ["Which log type would show that someone modified a security group minutes before an outage?", "The control plane audit log (API activity log)."],
   ["Why check the provider's health dashboard early in an investigation?", "If the provider has a known incident affecting your region or resources, you can move to workarounds instead of searching your own configuration for a cause that is not there."]
  ]
 },
 {
  t: "Automation and integration failures: broken pipelines, expired tokens, version and dependency mismatches",
  body: [
   "Automation saves time until it breaks, and when it breaks, deployments stop. Pipelines, scripts and integrations fail in a few recurring ways.",
   "Broken pipelines have many causes. Read the failing step's log from the first error, not the last line. Common causes include a failing test or scan that is doing its job; a build agent that ran out of disk space or lacks a tool; a change to the pipeline YAML with a syntax or indentation error; a missing variable or secret in a new environment; network rules blocking the agent from reaching a registry or package mirror; or a flaky test that fails intermittently, which should be fixed, not repeatedly retried. If a pipeline that worked yesterday fails today with no code change, suspect something external: credentials, a dependency, the agent image or the cloud platform.",
   "Expired or revoked tokens are a classic cause. Pipelines and integrations use personal access tokens, service principal client secrets, API keys, OAuth refresh tokens or certificates, and all of these can expire or be rotated. Errors such as 401 Unauthorized, invalid client secret or token expired point here. The long-term fix is to remove long-lived secrets: use workload identity federation, where the pipeline exchanges its own short-lived OIDC token for temporary cloud credentials, or store secrets in a secrets manager with rotation and expiry alerts. Tokens tied to a person's account break when that person leaves, so use service identities instead.",
   "Version and dependency mismatches appear when something changes underneath you. A build pulls the newest version of a library that has a breaking change; a Terraform provider or CLI upgrade changes behavior; a container base image tag moves; an API version your script uses is deprecated; or the pipeline's hosted agent image is updated with a new runtime. The script works on the engineer's laptop, with older versions, but fails in the pipeline. Prevent this by pinning versions: lock files for packages, explicit provider version constraints, specific image tags or digests, fixed tool versions in the pipeline, and a controlled process to update them.",
   "Integration failures between systems, such as a webhook that stops arriving, often come from a changed URL, a failed signature check after a secret rotation, a firewall change or a rate limit. Check delivery logs on the sending side and request logs on the receiving side."
  ],
  terms: [
   ["Pipeline", "An automated sequence of build, test and deployment stages."],
   ["Personal access token", "A long-lived token tied to a user, often used by scripts, which can expire or leave with the user."],
   ["Workload identity federation", "Exchanging an external workload's token for short-lived cloud credentials without stored secrets."],
   ["Version pinning", "Specifying exact versions of dependencies and tools so builds are reproducible."],
   ["Lock file", "A file recording the exact dependency versions used, so every build installs the same ones."]
  ],
  example: "Every deployment fails one Monday with an authentication error, though no code changed. The pipeline used a service principal secret created a year earlier with a one-year expiry. The team issues a new secret to restore deployments, then replaces it with workload identity federation so the pipeline no longer depends on a stored secret.",
  tip: "Worked yesterday, fails today with no code change: think expired token or certificate, or an unpinned dependency or tool that updated. 401 errors point to credentials; unexpected behavior after an update points to version mismatch.",
  check: [
   ["A pipeline fails with 401 errors after running fine for months. What is the likely cause?", "An expired or rotated credential, such as a client secret, access token or certificate, used by the pipeline."],
   ["How do you prevent a build from breaking when a library releases a new major version?", "Pin dependency versions with a lock file or explicit constraints, and update them deliberately through a tested change."]
  ]
 }
], { reviewed: "2026-09-25" });
