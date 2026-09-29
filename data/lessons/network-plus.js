/* Lessons for CompTIA Network+ (N10-009): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("network-plus", [
 {
  "t": "OSI model layers and the data unit at each layer",
  "body": [
   "The Open Systems Interconnection (OSI) model is a seven-layer reference model that splits the job of moving data between two computers into separate responsibilities. Nobody implements the OSI model exactly as written (the internet actually runs on the simpler TCP/IP model), but every network professional uses OSI as a shared vocabulary. When a colleague says 'it is a Layer 2 problem' they mean the fault is in switching, MAC addresses or VLANs, not in routing or the application. Network+ uses the model constantly, both directly (which layer does X work at?) and indirectly, because troubleshooting questions expect you to reason layer by layer.",
   "From the bottom up the layers are: 1 Physical, 2 Data Link, 3 Network, 4 Transport, 5 Session, 6 Presentation and 7 Application. A common memory aid bottom-up is 'Please Do Not Throw Sausage Pizza Away'; top-down, 'All People Seem To Need Data Processing'. Layer 1 moves raw bits as electrical, light or radio signals over cables, connectors and airwaves. Layer 2 frames those bits for delivery on the local segment using MAC (Media Access Control) addresses, and it detects corruption with a frame check sequence (FCS). Layer 3 gives logical, routable addresses (IPv4 and IPv6) and chooses paths between networks. Layer 4 provides end-to-end delivery between applications using port numbers, with TCP (Transmission Control Protocol) for reliable, ordered delivery or UDP (User Datagram Protocol) for lightweight, connectionless delivery.",
   "The upper layers are often blurred together in practice, and the TCP/IP model merges them into a single Application layer. Layer 5, Session, sets up, maintains and tears down conversations between applications, such as keeping track of which request belongs to which dialogue. Layer 6, Presentation, handles data formatting, character encoding, compression and encryption, which is why TLS is sometimes placed here. Layer 7, Application, is the network-facing interface that programs use: HTTP, DNS, SMTP, SSH and similar protocols. Layer 7 does not mean the application itself, such as the web browser; it means the protocol the browser speaks.",
   "As data travels down the stack on the sender, each layer adds its own header (and Layer 2 also adds a trailer, the FCS). This is encapsulation; the receiver strips headers in reverse order, which is de-encapsulation. The name for the chunk of data at each layer is its protocol data unit (PDU). Layers 5 to 7 simply call it data. Layer 4 produces a segment for TCP (a UDP unit is usually called a datagram). Layer 3 produces a packet. Layer 2 produces a frame. Layer 1 transmits bits. A useful detail: as a packet crosses routers, the Layer 2 frame is rebuilt on every hop with new source and destination MAC addresses, while the Layer 3 source and destination IP addresses stay the same end to end (unless NAT changes them).",
   "Walk through a real request to see it. You type a web address and press Enter. The browser builds an HTTP request (Layer 7 data), TLS encrypts it (Layer 6), and TCP wraps it in a segment with source port 51544 and destination port 443 (Layer 4). IP adds a packet header with your address and the server's address (Layer 3). Ethernet adds a frame header with your MAC and your default gateway's MAC, plus the FCS trailer (Layer 2). The network card turns the frame into electrical signals on the cable (Layer 1). The switch reads only the frame header; the router reads the packet header, picks the next hop and builds a new frame; the server unwraps everything in reverse. In Wireshark each captured packet shows exactly these sections stacked: Ethernet II, Internet Protocol, Transmission Control Protocol and then the application protocol.",
   "Devices map to layers, and the exam likes these pairings. Hubs, repeaters, cables, patch panels and media converters are Layer 1: they just pass signals. Switches and bridges forward frames by MAC address at Layer 2; wireless access points also operate largely at Layer 2, bridging wireless frames onto the wired LAN. Routers forward packets by IP address at Layer 3, and a multilayer (Layer 3) switch can do both switching and routing. Load balancers, proxies and next-generation firewalls can inspect all the way up to Layer 7. A basic stateless packet filter works at Layers 3 and 4 because it reads addresses and ports.",
   "Common mistakes: learners mix up segment and packet (segment is Layer 4, packet is Layer 3), assume a switch uses IP addresses (a plain switch does not), or think Layer 7 means the browser program. Another trap is putting ARP neatly in one layer; it resolves Layer 3 addresses to Layer 2 addresses, so it is usually described as working between Layers 2 and 3. The model is also your troubleshooting map. A bottom-up approach starts with link lights and cables, then MAC and VLAN, then IP addressing and routing, then ports and services. A top-down approach starts at the application.",
   "Exam questions frame this topic in a few predictable ways. They name a device or protocol and ask its layer, name a PDU and ask the layer, or describe a symptom and ask which layer to investigate. Clue words help: 'bits', 'signal', 'cable', 'attenuation' point to Layer 1; 'MAC', 'frame', 'VLAN', 'switch' to Layer 2; 'IP', 'packet', 'route', 'subnet' to Layer 3; 'port', 'segment', 'reliable', 'connectionless' to Layer 4; 'encryption', 'encoding', 'compression' to Layer 6; and named application protocols such as HTTP or DNS to Layer 7."
  ],
  "terms": [
   [
    "PDU",
    "Protocol data unit: the name for the chunk of data at a given layer (bits, frame, packet, segment or datagram, data)."
   ],
   [
    "Encapsulation",
    "The process of each layer adding its header (and at Layer 2, a trailer) to the data it receives from the layer above."
   ],
   [
    "De-encapsulation",
    "The receiver removing each layer's header in reverse order to recover the original data."
   ],
   [
    "MAC address",
    "A 48-bit hardware address used at Layer 2 to deliver frames on the local network segment."
   ],
   [
    "Frame check sequence",
    "The Layer 2 trailer field containing a CRC value that the receiver uses to detect corrupted frames."
   ],
   [
    "TCP/IP model",
    "The four-layer model the internet actually uses (Link, Internet, Transport, Application), which merges OSI Layers 5 to 7 into one."
   ]
  ],
  "example": "A user cannot reach an internal web site. You check the switch port and see the link light on and no interface errors, so Layer 1 looks fine. You confirm the PC is in the correct VLAN and its MAC address appears on the right port (Layer 2), then ping the server's IP successfully (Layer 3). Finally you run a port test and find nothing is listening on TCP 443, so the fault is the web service itself at Layers 4 to 7. Working methodically through the layers took you straight to the server team instead of wasting time on cables.",
  "tip": "Memorize the PDU names in order: bits (1), frames (2), packets (3), segments or datagrams (4), data (5 to 7). Also remember that switches are Layer 2 and routers Layer 3 unless the question says multilayer switch.",
  "check": [
   [
    "As a packet crosses three routers to reach a server, which addresses change at each hop and which stay the same?",
    "The Layer 2 source and destination MAC addresses change on every hop because each router builds a new frame; the Layer 3 source and destination IP addresses stay the same (unless NAT is involved)."
   ],
   [
    "A technician finds that CRC errors are climbing on a switch port. Which OSI layer is most likely at fault and why?",
    "Layers 1 and 2. The CRC is checked against the Layer 2 frame check sequence, and failures usually come from physical problems such as a damaged cable, interference or a duplex mismatch."
   ],
   [
    "A firewall blocks traffic based only on source IP and destination port. Up to which OSI layer is it inspecting?",
    "Layer 4. IP addresses are Layer 3 and port numbers are Layer 4; it is not reading application content at Layer 7."
   ],
   [
    "Why is TLS sometimes described as a Layer 6 function even though it runs over TCP?",
    "Because it encrypts and formats data for the application, which is the Presentation layer's job in the OSI model; the model is a reference, so real protocols do not always fit one layer."
   ]
  ]
 },
 {
  "t": "Network appliances: routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS/SAN, wireless controllers",
  "body": [
   "Network appliances are the building blocks you connect to make a network work. They can be dedicated physical boxes, virtual appliances running on a hypervisor, or cloud services that do the same job. The exam expects you to know what each one does, which OSI layer it mainly operates at, where it sits in the network and when to choose one over another. Most questions describe a need, such as 'block attacks automatically' or 'spread load across servers', and ask which appliance meets it.",
   "A router connects different IP networks and forwards packets between them using a routing table (Layer 3). Every subnet needs a router interface as its default gateway to reach other networks, and routers also separate broadcast domains: a broadcast on one side is not forwarded to the other. A switch connects devices within the same network and forwards frames by learning which MAC address lives on which port (Layer 2). It builds this MAC address table by reading the source address of every incoming frame. Unlike an old hub, which repeated every bit out every port, a switch sends unicast frames only to the correct port, and each switch port is its own collision domain. A Layer 3 or multilayer switch can also route between VLANs at wire speed, which is why it is common in the core of campus networks.",
   "A firewall enforces a security policy by allowing or blocking traffic. A basic stateless packet filter checks addresses and ports in each packet in isolation. A stateful firewall tracks connections in a state table, so return traffic for a session a user started is allowed automatically while unsolicited inbound traffic is dropped. A next-generation firewall (NGFW) adds application awareness (it can tell a video stream from a file upload even on port 443), user identity, TLS inspection and often built-in intrusion prevention. An intrusion detection system (IDS) watches a copy of traffic, for example from a switch port mirror (SPAN) or a network tap, and alerts on suspicious patterns; it does not block. An intrusion prevention system (IPS) sits inline and can drop malicious traffic as it happens. Both use signature detection (known patterns) and anomaly or behaviour detection (deviations from a learned baseline). A host-based version (HIDS or HIPS) runs on an individual computer instead of the network.",
   "A load balancer spreads client requests across a pool of servers to improve performance and availability. Clients connect to one virtual IP address, and the balancer decides which real server gets each request using methods such as round robin, weighted round robin or least connections. It performs health checks so it stops sending traffic to a failed server, and it can terminate TLS so servers do not have to, and keep a user on the same server (session persistence or 'sticky sessions'). A proxy server makes requests on behalf of clients. A forward proxy sits in front of users and can cache content, log activity and filter web access; a reverse proxy sits in front of servers, receives requests from the internet and hides the servers' real addresses. Many load balancers are, in effect, reverse proxies with extra features.",
   "Storage appliances come in two flavours. Network-attached storage (NAS) is a file server: clients access shared folders over the normal network using file protocols such as SMB (Windows) or NFS (Unix and Linux). A storage area network (SAN) provides block-level storage that servers see as local disks; the server formats the volume itself. A SAN usually runs on a dedicated high-speed network using Fibre Channel, or over Ethernet with iSCSI (SCSI commands carried in IP) or Fibre Channel over Ethernet (FCoE). The short version: NAS shares files, SAN shares blocks. Databases and virtual machine storage usually prefer SAN; shared department folders suit NAS.",
   "A wireless LAN controller (WLC) centrally manages many lightweight access points: it pushes configuration, coordinates channels and transmit power, enforces security policy and handles seamless roaming and authentication. Without a controller, each autonomous access point must be configured one by one, which is fine for a small office and painful for a campus. Access points themselves bridge wireless clients onto the wired network. Controllers can be physical boxes, virtual machines or cloud-hosted services.",
   "Common mistakes include thinking an IDS can stop an attack (it only reports), assuming a switch separates broadcast domains (only VLANs or routers do), and confusing forward with reverse proxies. Remember direction: a forward proxy protects and controls clients going out; a reverse proxy protects servers receiving traffic coming in. Also note placement: an IPS or firewall must be inline to block, which means if it fails it can take the link down, so many are deployed with fail-open or high-availability pairs.",
   "On the exam, look for clue words. 'Alert', 'passive', 'monitor', 'span port' point to IDS; 'inline', 'block', 'drop' to IPS. 'Distribute', 'health check', 'virtual IP', 'server pool' mean load balancer. 'Cache web content', 'filter user browsing' mean forward proxy; 'hide internal servers' means reverse proxy. 'Block-level', 'appears as a local disk', 'Fibre Channel', 'iSCSI' mean SAN; 'file share', 'SMB', 'NFS' mean NAS. 'Centrally manage hundreds of APs' means wireless LAN controller."
  ],
  "terms": [
   [
    "Stateful firewall",
    "A firewall that tracks the state of connections and automatically allows return traffic that belongs to an established session."
   ],
   [
    "NGFW",
    "Next-generation firewall: a firewall that adds application awareness, user identity, TLS inspection and intrusion prevention to stateful filtering."
   ],
   [
    "IDS",
    "Intrusion detection system: a passive device that monitors a copy of traffic and alerts on suspicious activity without blocking it."
   ],
   [
    "IPS",
    "Intrusion prevention system: an inline device that detects and blocks malicious traffic in real time."
   ],
   [
    "Reverse proxy",
    "A proxy that sits in front of servers, receiving client requests on their behalf and hiding the servers' details."
   ],
   [
    "SAN",
    "Storage area network: a dedicated network that gives servers block-level access to shared storage, typically via Fibre Channel or iSCSI."
   ],
   [
    "Wireless LAN controller",
    "A device or service that centrally configures and manages lightweight access points, including channels, power, security and roaming."
   ]
  ],
  "example": "An online store runs three web servers behind a load balancer that presents a single virtual IP to customers. When one server crashes during a sale, the balancer's health check fails and it quietly sends all customers to the other two, so nobody notices the outage. An NGFW in front of the balancer blocks traffic that does not match policy, and an IDS fed by a SPAN port alerts the security team when someone starts scanning the servers. Product images and order data live on a SAN, which the database servers mount as local disks.",
  "tip": "IDS is passive and only alerts; IPS is inline and can block. NAS is file-level access over the LAN; SAN is block-level access, usually over a dedicated network.",
  "check": [
   [
    "A company wants a device that drops attack traffic automatically but worries about it becoming a single point of failure. What should it deploy and what design concern applies?",
    "An IPS, because it sits inline and can block. Because it is inline, a failure can cut the link, so it should be deployed in a high-availability pair or with a fail-open setting."
   ],
   [
    "A switch has 24 ports and no VLANs. How many collision domains and broadcast domains does it create?",
    "24 collision domains (one per port) and one broadcast domain, because switches do not stop broadcasts unless VLANs are configured."
   ],
   [
    "Staff should be blocked from gambling sites and frequently used pages should load faster. Which appliance fits, and is it a forward or reverse proxy?",
    "A forward proxy, because it sits in front of users, caches content and filters outbound web requests."
   ],
   [
    "A hypervisor cluster needs shared storage it can format with its own file system. NAS or SAN, and why?",
    "SAN, because it presents raw block storage that the host sees as a local disk; NAS only shares files through SMB or NFS."
   ]
  ]
 },
 {
  "t": "Network functions: CDN, VPN, QoS, TTL",
  "body": [
   "Beyond individual boxes, the Network+ objectives name several functions that networks provide. Four of them show up often: content delivery networks (CDNs), virtual private networks (VPNs), quality of service (QoS) and time to live (TTL). Each solves a different problem, so learn them by the problem they fix: CDN fixes distance and load, VPN fixes privacy over untrusted networks, QoS fixes contention when links are busy, and TTL stops packets from living forever.",
   "A content delivery network is a geographically distributed set of servers that cache copies of content close to users. When someone in another country loads your site, DNS or anycast routing directs their request to a nearby edge server (a point of presence) instead of your origin server. If the edge has a fresh copy, it answers immediately; if not, it fetches the content from the origin once and caches it for the next visitor. The result is lower latency, less load and bandwidth on the origin and better resilience against traffic spikes and some denial-of-service attacks. CDNs are ideal for static content like images, video, scripts and software downloads, and many also terminate TLS and filter malicious requests.",
   "A virtual private network creates an encrypted tunnel across an untrusted network such as the internet, so traffic between two points is private and protected from tampering. A site-to-site VPN links whole networks, such as a branch office to headquarters, and is usually built between two firewalls or routers with IPsec; users do not run any software. A client-to-site (remote access) VPN lets an individual device join the corporate network using an IPsec or SSL/TLS VPN client, and a clientless VPN gives browser-based access to specific web applications. With a full tunnel, all of the client's traffic goes through the VPN; with a split tunnel, only traffic for corporate networks goes through it and internet traffic goes out directly. Full tunnel gives more control and inspection; split tunnel saves bandwidth on the corporate link.",
   "Quality of service is the set of techniques that give some traffic priority over other traffic when links are congested. Voice and video are sensitive to latency (delay), jitter (variation in delay) and packet loss, while a file download simply finishes a little later. QoS works in steps: classify traffic (by port, application or address), mark it, then queue and schedule it at each congested interface. At Layer 3, the Differentiated Services Code Point (DSCP) field in the IP header carries the marking; voice is commonly marked EF (Expedited Forwarding, DSCP 46). At Layer 2, 802.1Q frames carry a 3-bit Class of Service (CoS) priority value. Traffic shaping buffers excess traffic to smooth it to a set rate, while policing drops or re-marks traffic that exceeds a rate. QoS cannot create bandwidth; it only decides who waits when there is not enough.",
   "Time to live is a counter that stops data from living forever. In IPv4, the TTL field in the IP header is set by the sender (commonly 64 or 128) and decremented by one at every router. When it reaches zero, the router discards the packet and usually sends an ICMP Time Exceeded message back to the source. That prevents packets from circling endlessly in a routing loop, and it is exactly how traceroute maps a path: it sends probes with TTL 1, 2, 3 and so on and records which router replies each time. IPv6 has the same idea under the name hop limit. DNS also uses the term TTL for how long a resolver may cache a record, a different meaning you should recognise from context.",
   "```\nC:\\> tracert 8.8.8.8\n  1    <1 ms    <1 ms    <1 ms  192.168.1.1\n  2     9 ms     8 ms     9 ms  100.64.0.1\n  3    12 ms    11 ms    12 ms  203.0.113.9\n  4    14 ms    13 ms    14 ms  8.8.8.8\nTrace complete.\n```",
   "In the output above, hop 1 is the home router that answered when the first probe's TTL hit zero, hop 2 is the provider's router, and so on. If a line shows asterisks, that router did not send a Time Exceeded reply, often because a firewall blocks ICMP, which does not necessarily mean traffic is failing there. Common mistakes: believing QoS makes a link faster, assuming a VPN makes a user anonymous or secure from malware on their own device, treating a CDN as a backup system rather than a cache, and confusing IP TTL (hop count) with DNS TTL (cache time in seconds).",
   "Exam questions usually describe the symptom or goal. 'Choppy voice', 'jitter', 'prioritize video' point to QoS. 'Global users', 'reduce latency for static content', 'edge servers' point to CDN. 'Remote staff', 'encrypted tunnel', 'connect branch offices' point to VPN, with 'only corporate traffic through the tunnel' meaning split tunnel. 'Routing loop', 'how traceroute works', 'ICMP Time Exceeded' or 'hop limit' point to TTL."
  ],
  "terms": [
   [
    "CDN",
    "Content delivery network: distributed edge servers that cache content close to users to reduce latency and origin load."
   ],
   [
    "Site-to-site VPN",
    "A VPN between two network devices that joins entire networks, such as a branch and headquarters, without client software."
   ],
   [
    "Split tunnel",
    "A VPN mode where only traffic for corporate networks uses the tunnel and other traffic goes directly to the internet."
   ],
   [
    "Jitter",
    "Variation in the delay of packets arriving, which makes voice and video sound or look choppy."
   ],
   [
    "DSCP",
    "Differentiated Services Code Point: a field in the IP header used to mark packets for QoS treatment."
   ],
   [
    "TTL",
    "Time to live: an IP header counter decremented at each router hop; the packet is discarded at zero to prevent loops."
   ],
   [
    "Hop limit",
    "The IPv6 name for the TTL field, with the same decrement-and-discard behaviour."
   ]
  ],
  "example": "A company's VoIP calls sound choppy every afternoon when staff back up files to the cloud over the same 100 Mbps internet link. The network team classifies voice traffic, marks it with DSCP EF on the access switches and configures the WAN router to place EF traffic in a priority queue. Calls become clear, and the backups simply take slightly longer. Later, remote staff complain that their video meetings are slow over the VPN, so the team switches them to split tunnel so meeting traffic goes straight to the internet instead of hairpinning through headquarters.",
  "tip": "If a question mentions choppy voice or video during busy periods, think QoS. If it mentions reaching global users faster, think CDN. If it mentions routing loops or how traceroute works, think TTL.",
  "check": [
   [
    "A traceroute shows the same two router addresses repeating until the trace hits 30 hops. What is happening and what stops those packets from looping forever?",
    "A routing loop between those two routers; each router decrements the TTL, and when it reaches zero the packet is discarded and an ICMP Time Exceeded message is sent."
   ],
   [
    "A 50 Mbps WAN link is saturated. Management asks for QoS so that 'everything goes faster'. What will QoS actually achieve?",
    "It will not add capacity; it will prioritize delay-sensitive traffic like voice so it is served first, while lower-priority traffic waits or is dropped."
   ],
   [
    "Remote users' web browsing is overloading the headquarters internet link because all traffic goes through the VPN. What change helps, and what is the security trade-off?",
    "Switch to split tunnel so only corporate traffic uses the VPN; the trade-off is that internet traffic is no longer inspected by corporate security controls."
   ],
   [
    "A video site is slow for users in Asia but fast in Europe where its servers are. Would adding a VPN, QoS or a CDN help most?",
    "A CDN, because it caches the content on edge servers near Asian users, reducing distance and latency."
   ]
  ]
 },
 {
  "t": "Cloud concepts: NFV, VPC, security groups, cloud gateways, deployment and service models (IaaS, PaaS, SaaS)",
  "body": [
   "Cloud computing means using computing resources, such as servers, storage and networking, that a provider runs and that you consume on demand over a network. The provider pools resources for many customers, lets you scale up and down quickly and usually charges by use. Network+ focuses on how networking works in that world: how virtual networks are built, how traffic gets in and out, how it is filtered, and the vocabulary of service and deployment models. These ideas matter because most organizations now run a mix of on-premises and cloud systems, and the network engineer has to connect them safely.",
   "Network functions virtualization (NFV) replaces dedicated hardware appliances, such as routers, firewalls and load balancers, with software versions running on standard servers or in the cloud. Instead of shipping a firewall box to a site and waiting for it to be racked, you spin up a virtual firewall in minutes. NFV is what makes cloud networking possible, because a provider cannot rack a physical firewall for every customer. Do not confuse it with software-defined networking (SDN): NFV virtualizes the appliances themselves, while SDN separates the control plane from the data plane so the network can be managed centrally. They are often used together.",
   "A virtual private cloud (VPC) is your own logically isolated network inside a public cloud. You choose its private IP address range (for example 10.20.0.0/16) and divide it into subnets, typically public subnets for internet-facing resources and private subnets for databases and internal servers. What makes a subnet 'public' is simply its route table: it has a route to an internet gateway. You control all routing with route tables, just as you would on a physical router.",
   "Cloud gateways connect the VPC to the outside world. An internet gateway allows traffic in and out for resources that have public addresses. A NAT gateway lets resources in private subnets start outbound connections, such as downloading patches, while blocking unsolicited inbound ones. Connecting a VPC back to your data centre uses a VPN gateway (an IPsec site-to-site tunnel over the internet) or a dedicated private circuit offered by the provider, which gives more consistent performance. In a typical layout, the public subnet 10.20.1.0/24 has a default route (0.0.0.0/0) to the internet gateway, the private subnet 10.20.2.0/24 has its default route pointing to the NAT gateway, and both have a route for the head office range 192.168.0.0/16 pointing to the VPN gateway.",
   "Security in a VPC is layered. A security group is a stateful virtual firewall attached to an individual instance or network interface: you list what is allowed in and out, and return traffic is automatically permitted. Security groups normally have allow rules only, with everything else implicitly denied. A network access control list (NACL), in providers that offer one, applies to a whole subnet and is usually stateless, so you must allow both directions explicitly, including the ephemeral return ports; NACLs can have both allow and deny rules, processed in order. Remember: security group means instance-level and stateful; NACL means subnet-level and stateless.",
   "Service models describe how much the provider manages for you. In Infrastructure as a Service (IaaS) you rent virtual machines, storage and networks; you manage the operating system, patches, applications and data. In Platform as a Service (PaaS) the provider also runs the OS and runtime, and you deploy your code or database schema. In Software as a Service (SaaS) you simply use a finished application, such as web email or a customer relationship management system. This is the shared responsibility model: the further you go from IaaS to SaaS, the more the provider is responsible for, though you always remain responsible for your data, your user accounts and how you configure access.",
   "Deployment models describe who the cloud is for. A public cloud is shared infrastructure offered to anyone. A private cloud is dedicated to one organization, on premises or hosted. A hybrid cloud combines public and private and moves workloads between them, for example bursting to the public cloud at peak times. A community cloud is shared by organizations with common needs, such as government agencies or hospitals under the same regulations. Cloud networking also brings terms like elasticity (automatically adding or removing resources as demand changes), scalability (the ability to grow) and multitenancy (many customers sharing the same physical hardware, isolated logically). A common mistake is assuming the provider secures everything in the cloud; misconfigured security groups and storage are among the most frequent causes of cloud breaches.",
   "Exam questions usually describe a need and ask for the model or component. 'Does not want to manage servers or the OS' means PaaS or SaaS; 'full control of the OS' means IaaS; 'just use the application' means SaaS. 'Private subnet needs updates but must not be reachable' means NAT gateway. 'Instance-level stateful rules' means security group. 'Replace hardware appliances with software' means NFV. 'Shared by several organizations with common compliance needs' means community cloud."
  ],
  "terms": [
   [
    "NFV",
    "Network functions virtualization: running network functions like routing and firewalling as software instead of dedicated hardware."
   ],
   [
    "VPC",
    "Virtual private cloud: a logically isolated, customer-defined network inside a public cloud provider."
   ],
   [
    "Security group",
    "A stateful virtual firewall applied to cloud instances or interfaces that allows specified inbound and outbound traffic."
   ],
   [
    "Internet gateway",
    "A VPC component that allows resources with public addresses to send and receive internet traffic."
   ],
   [
    "NAT gateway",
    "A cloud gateway that lets resources in private subnets make outbound internet connections without accepting unsolicited inbound traffic."
   ],
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider and customer, which shifts toward the provider from IaaS to PaaS to SaaS."
   ],
   [
    "Hybrid cloud",
    "A deployment that combines public and private cloud resources and moves or connects workloads between them."
   ]
  ],
  "example": "A startup builds a VPC with a public subnet for its web servers and a private subnet for its database. The web servers' security group allows HTTPS from anywhere, while the database security group allows only the database port, and only from the web servers' security group. The database installs patches through a NAT gateway but cannot be reached from the internet. When the company later needs its office accounting system to read sales data, it adds a site-to-site VPN gateway so the office network and the VPC can talk privately.",
  "tip": "Map the models by who manages the OS: IaaS you do, PaaS and SaaS the provider does. SaaS is a finished application. Internet gateway allows inbound and outbound; NAT gateway allows outbound only.",
  "check": [
   [
    "A developer wants to deploy code without patching servers but still write and control the application. Which service model fits, and why not SaaS?",
    "PaaS, because the provider manages the infrastructure, OS and runtime while the developer supplies the code; SaaS would be a finished application the developer cannot change."
   ],
   [
    "A security group allows inbound TCP 443. Does it also need an outbound rule for responses to reach clients? Would a NACL?",
    "The security group does not, because it is stateful and allows return traffic automatically; a stateless NACL would need an outbound rule allowing the ephemeral ports."
   ],
   [
    "A server in a subnet with a route to a NAT gateway cannot be reached from the internet even with a public IP rule added. Why?",
    "Because the subnet routes through a NAT gateway, which only permits outbound-initiated connections; public inbound access needs a route to an internet gateway."
   ],
   [
    "How is NFV different from SDN?",
    "NFV turns network appliances into software instances; SDN separates the control plane from the data plane so a central controller programs the network. They solve different problems and are often combined."
   ]
  ]
 },
 {
  "t": "Common ports and protocols: FTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP/S, NTP, SNMP, LDAP/S, SMB, Syslog, SQL, RDP, SIP",
  "body": [
   "Applications find each other on a host using port numbers, 16-bit values (0 to 65535) carried in the TCP or UDP header. Well-known ports (0 to 1023) are assigned to common services, registered ports (1024 to 49151) to other applications, and dynamic or ephemeral ports (49152 to 65535) are borrowed by clients. A server listens on a known port and a client connects to it from a random high-numbered source port. The exam expects you to recognise the port and transport of each common protocol and whether it is secure. Firewall rules, packet captures, scan results and troubleshooting all depend on this knowledge, so it is worth memorising properly.",
   "File transfer and remote access: FTP (File Transfer Protocol) uses TCP 21 for control and TCP 20 for data in active mode; it sends credentials in clear text. SFTP (SSH File Transfer Protocol) runs inside SSH on TCP 22, and FTPS is FTP secured with TLS (often TCP 990 for implicit mode). SSH (Secure Shell) on TCP 22 gives encrypted command-line access and replaces Telnet on TCP 23, which is unencrypted. TFTP (Trivial FTP) uses UDP 69, has no authentication and is used for device firmware, configuration backups and network booting. RDP (Remote Desktop Protocol) uses TCP 3389 (and UDP 3389 for performance) for graphical remote access to Windows.",
   "Email and web: SMTP (Simple Mail Transfer Protocol) sends mail between servers on TCP 25. The N10-009 objectives list secure SMTP (SMTPS) on TCP 587, the submission port clients use with STARTTLS; you will also see 465 used for SMTP over implicit TLS in the real world. HTTP uses TCP 80 and HTTPS, which is HTTP over TLS, uses TCP 443. Mail retrieval protocols are useful context: POP3 is 110 (995 secure) and IMAP is 143 (993 secure).",
   "Infrastructure services: DNS (Domain Name System) uses port 53, UDP for most queries and TCP for zone transfers and large responses. DHCP (Dynamic Host Configuration Protocol) uses UDP 67 on the server and UDP 68 on the client. NTP (Network Time Protocol) uses UDP 123. SNMP (Simple Network Management Protocol) uses UDP 161 when a manager polls a device and UDP 162 for traps a device sends to the manager. Syslog sends log messages to a collector on UDP 514 (TCP and TLS variants also exist). LDAP (Lightweight Directory Access Protocol) queries directories such as Active Directory on port 389, and LDAPS (LDAP over TLS) uses TCP 636.",
   "File sharing, databases and voice: SMB (Server Message Block), used for Windows file and printer sharing, runs directly over TCP 445. Microsoft SQL Server listens on TCP 1433 by default; other databases use their own ports, such as 3306 for MySQL, 5432 for PostgreSQL and 1521 for Oracle. SIP (Session Initiation Protocol) sets up, modifies and tears down voice and video calls on port 5060 (UDP or TCP), and 5061 when secured with TLS. The actual audio travels separately, usually as RTP (Real-time Transport Protocol) on a range of high UDP ports, which is why a call can ring but have no audio if only SIP is allowed through a firewall.",
   "A practical way to study is to look at a real machine. Run `netstat -an` on Windows or `ss -tuln` on Linux and match each listening port to a service. In the output below, the host is running SSH, a web server, SMB and SQL Server, and has an established HTTPS session to a remote site from an ephemeral port.",
   "```\nC:\\> netstat -an | findstr \"LISTENING ESTABLISHED\"\n  TCP  0.0.0.0:22          0.0.0.0:0          LISTENING\n  TCP  0.0.0.0:443         0.0.0.0:0          LISTENING\n  TCP  0.0.0.0:445         0.0.0.0:0          LISTENING\n  TCP  0.0.0.0:1433        0.0.0.0:0          LISTENING\n  TCP  10.0.0.15:51544     203.0.113.10:443   ESTABLISHED\n```",
   "Group insecure protocols with their secure replacements, because security questions often ask which one to use: Telnet to SSH, HTTP to HTTPS, FTP to SFTP or FTPS, LDAP to LDAPS, SNMPv1/v2c to SNMPv3, SIP to SIP over TLS (5061). Common mistakes include thinking SFTP uses port 21 or 990 (it uses 22, because it is part of SSH), mixing up TFTP (UDP 69) with FTP (TCP 20/21), assuming DNS is UDP only, and forgetting that SNMP traps go to the manager on 162 while polling goes to the device on 161. On the exam, ports appear in firewall-rule questions ('which port must be opened for...'), in scan or netstat output ('which service is running?') and in security questions ('which protocol should replace...'). Clue words such as 'clear text', 'unencrypted' or 'legacy' usually point at Telnet, FTP, HTTP or SNMPv1. Read carefully whether the question asks for the server port or the client port, and whether it says TCP or UDP."
  ],
  "terms": [
   [
    "Well-known ports",
    "Port numbers 0 to 1023, assigned to common services such as HTTP (80) and SSH (22)."
   ],
   [
    "Ephemeral port",
    "A temporary high-numbered source port chosen by a client for an outgoing connection."
   ],
   [
    "SFTP",
    "SSH File Transfer Protocol: encrypted file transfer that runs inside an SSH session on TCP 22."
   ],
   [
    "SNMP trap",
    "An unsolicited alert sent by a managed device to the SNMP manager on UDP 162."
   ],
   [
    "LDAPS",
    "LDAP secured with TLS, on TCP 636."
   ],
   [
    "SMB",
    "Server Message Block: the Windows file and printer sharing protocol, running over TCP 445."
   ],
   [
    "SIP",
    "Session Initiation Protocol: sets up and tears down VoIP and video calls on 5060, or 5061 with TLS."
   ]
  ],
  "example": "A firewall administrator is asked to let the help desk manage switches securely and to collect their logs. She allows TCP 22 (SSH) from the help desk subnet to the switch management VLAN and blocks TCP 23 (Telnet) entirely. She then allows UDP 514 from the switches to the syslog server and UDP 162 from the switches to the monitoring server for SNMP traps, plus UDP 161 from the monitoring server to the switches for polling. A week later, a scan shows TCP 21 open on a file server, so she replaces the FTP service with SFTP on TCP 22.",
  "tip": "Watch for pairs that are easy to swap: SNMP 161 (polling) vs 162 (traps), DHCP 67 (server) vs 68 (client), LDAP 389 vs LDAPS 636, SSH 22 vs Telnet 23, FTP 20/21 vs TFTP UDP 69.",
  "check": [
   [
    "A new VoIP system can place calls, and phones ring, but neither side hears audio. SIP on 5060 is allowed through the firewall. What is likely missing?",
    "The RTP media ports; SIP only handles call signalling, while the audio travels separately as RTP on a range of UDP ports that the firewall must also allow."
   ],
   [
    "A scan shows TCP 22, 445 and 3389 open on a server. Which services are these, and which one gives graphical remote access?",
    "SSH (22), SMB file sharing (445) and RDP (3389); RDP provides the graphical remote desktop."
   ],
   [
    "DNS queries work but a secondary DNS server cannot copy the zone from the primary. The firewall allows only UDP 53. Why does this fail?",
    "Zone transfers use TCP 53, so the firewall must also allow TCP 53 between the servers."
   ],
   [
    "An auditor flags that directory lookups send credentials in clear text on port 389. What should replace it and on which port?",
    "LDAPS on TCP 636, which wraps LDAP in TLS encryption."
   ]
  ]
 },
 {
  "t": "Protocol types (TCP, UDP, ICMP, GRE, IPsec) and traffic types (unicast, multicast, anycast, broadcast)",
  "body": [
   "Above IP, different protocols carry data in different ways, and choosing or permitting the right one is a daily networking task. The IP header has a protocol field that tells the receiver what comes next: 6 for TCP, 17 for UDP, 1 for ICMP, 47 for GRE, 50 for ESP and 51 for AH. You rarely need these numbers on the exam, but knowing that ICMP, GRE and IPsec's ESP and AH sit directly on IP, with no port numbers, explains why firewalls and NAT devices must treat them differently from ordinary TCP and UDP traffic.",
   "TCP (Transmission Control Protocol) is connection-oriented and reliable. Before sending data it performs the three-way handshake: the client sends SYN, the server replies SYN-ACK and the client sends ACK. TCP numbers every byte with sequence numbers, the receiver acknowledges what arrives, and lost segments are retransmitted. A sliding window provides flow control so a fast sender does not overwhelm a slow receiver, and congestion control slows the sender when the network drops packets. Connections close gracefully with FIN messages, or abruptly with RST (reset). HTTP/S, SSH, SMTP, RDP and SMB use TCP.",
   "UDP (User Datagram Protocol) is connectionless and best-effort. There is no handshake, acknowledgement or retransmission, so the header is only 8 bytes and delivery is fast. Applications that prefer timeliness to perfection use it: live voice and video (a late voice packet is useless, so resending it makes no sense), DNS queries, DHCP, NTP, SNMP, syslog and TFTP. If reliability matters, the application itself must handle it. A simple way to remember: TCP is a phone call where both sides confirm they heard; UDP is a postcard.",
   "ICMP (Internet Control Message Protocol) carries error and diagnostic messages for IP. `ping` sends Echo Request and receives Echo Reply; routers send Destination Unreachable when they cannot deliver, Time Exceeded when TTL expires, and 'fragmentation needed' messages that make path MTU discovery work. Blocking all ICMP therefore breaks useful functions, so firewalls usually allow selected types. GRE (Generic Routing Encapsulation) is a tunnelling protocol that wraps one packet inside another, letting you carry multicast and routing protocol traffic across a network that would not otherwise pass it. GRE provides no encryption on its own.",
   "IPsec (Internet Protocol Security) protects IP traffic. AH (Authentication Header) provides integrity and authentication but no encryption, and it breaks through NAT because it protects the outer addresses. ESP (Encapsulating Security Payload) provides encryption plus integrity and is what almost all VPNs use. IKE (Internet Key Exchange, UDP 500, and UDP 4500 with NAT traversal) negotiates the keys and security associations. Transport mode protects only the payload between two hosts and keeps the original IP header; tunnel mode encrypts the entire original packet and adds a new outer header, which is what site-to-site VPNs use. GRE over IPsec combines GRE's ability to carry multicast and routing protocols with IPsec's encryption.",
   "Traffic types describe how many receivers a packet is meant for. Unicast is one-to-one: a single source to a single destination, which is most traffic. Broadcast is one-to-all on the local network, such as ARP requests and DHCP Discover messages sent to 255.255.255.255 or to the subnet's directed broadcast address; routers do not forward broadcasts, so a router interface bounds a broadcast domain. Multicast is one-to-many for hosts that have joined a group, using 224.0.0.0/4 in IPv4; switches use IGMP snooping to send it only to interested ports, and it suits streaming video and routing protocols such as OSPF (224.0.0.5). Anycast is one-to-nearest: the same address is advertised from several locations and routing delivers each packet to the closest one. Public DNS resolvers and CDNs rely on anycast. IPv6 has no broadcast at all and uses multicast instead.",
   "Walk through a web page load to see several of these together. The PC broadcasts an ARP request to find its gateway's MAC address, sends a unicast DNS query over UDP 53 (possibly to an anycast resolver), then opens a TCP connection to port 443 with SYN, SYN-ACK, ACK. If the path has a smaller MTU, a router returns an ICMP message asking for smaller packets. Common mistakes: assuming UDP is 'unreliable' in the sense of broken (it simply leaves reliability to the application), thinking GRE encrypts, thinking AH encrypts, and forgetting that multicast is not the same as broadcast because only subscribed hosts receive it.",
   "Exam questions typically describe a need or a capture. 'Guaranteed delivery', 'ordered', 'acknowledgement', 'handshake' mean TCP; 'low overhead', 'real-time', 'connectionless' mean UDP. 'Tunnel multicast or routing protocols' means GRE; 'encrypt the tunnel' means IPsec ESP; 'integrity only' means AH. 'Nearest server', 'same IP in many locations' means anycast; 'subscribers to a stream' means multicast; 'every host on the segment' means broadcast."
  ],
  "terms": [
   [
    "Three-way handshake",
    "The TCP connection setup exchange of SYN, SYN-ACK and ACK."
   ],
   [
    "UDP",
    "User Datagram Protocol: a connectionless, best-effort transport with no handshake, acknowledgements or retransmission."
   ],
   [
    "ICMP",
    "Internet Control Message Protocol: carries IP error and diagnostic messages such as Echo, Destination Unreachable and Time Exceeded."
   ],
   [
    "GRE",
    "Generic Routing Encapsulation: an unencrypted tunnelling protocol that encapsulates packets, including multicast, inside IP."
   ],
   [
    "ESP",
    "Encapsulating Security Payload: the IPsec protocol that provides encryption, integrity and authentication."
   ],
   [
    "Tunnel mode",
    "IPsec mode that encrypts the whole original packet and adds a new outer IP header, used for site-to-site VPNs."
   ],
   [
    "Anycast",
    "Addressing where one address is shared by several nodes and traffic is routed to the nearest one."
   ]
  ],
  "example": "A company links two sites with GRE tunnels so that OSPF, which uses multicast, can exchange routes between them. Because GRE is unencrypted, the security team requires the tunnels to be protected with IPsec ESP, negotiated by IKE on UDP 500 and 4500 because one site is behind NAT. Meanwhile, users' DNS queries to a public resolver automatically reach whichever anycast node is closest to each office. Security cameras at both sites stream to the recording server using multicast, and IGMP snooping keeps that traffic off switch ports that have not joined the group.",
  "tip": "AH authenticates but does not encrypt; ESP encrypts. GRE tunnels but does not encrypt. IPv6 has no broadcast. TCP is reliable and connection-oriented; UDP is fast and connectionless.",
  "check": [
   [
    "A site-to-site VPN must carry OSPF routing updates between two sites and keep them confidential. Why is GRE over IPsec used rather than either alone?",
    "GRE can carry the multicast OSPF traffic but does not encrypt; IPsec encrypts but plain IPsec tunnels do not carry multicast, so combining them provides both."
   ],
   [
    "A packet capture shows SYN, SYN-ACK, RST. What does this tell you about the connection?",
    "The server answered the connection attempt but the client (or something in the path) reset it instead of completing the handshake with ACK, so no session was established."
   ],
   [
    "Why does a VPN using AH fail when one peer sits behind a NAT router, while ESP with NAT traversal works?",
    "AH's integrity check covers the IP header addresses, which NAT changes, so the check fails; ESP does not protect the outer header and NAT-T wraps it in UDP 4500 so it passes through NAT."
   ],
   [
    "A company wants users worldwide to reach the nearest copy of its DNS service using one IP address. Which traffic type does this describe?",
    "Anycast, where the same address is advertised from several locations and routing delivers each query to the closest one."
   ]
  ]
 },
 {
  "t": "Transmission media and transceivers: copper categories, single-mode vs multimode fiber, coax, SFP/QSFP, connectors",
  "body": [
   "Transmission media are the physical paths that carry signals: copper cables carrying electrical signals, fibre carrying light, and the air carrying radio. Choosing the right medium depends on distance, speed, cost, interference and the building environment. Many real-world problems, and many exam questions, come down to the wrong cable, the wrong connector or a mismatched transceiver, so it pays to know the options and their limits.",
   "Twisted-pair copper is the most common LAN cable. Pairs of wires are twisted to cancel electromagnetic interference (EMI) and crosstalk between pairs. Unshielded twisted pair (UTP) is typical in offices; shielded twisted pair (STP) adds foil or braid for noisy environments such as factory floors, and must be grounded to be effective. Categories rate what the cable supports. Cat 5e supports 1 Gbps; Cat 6 supports 1 Gbps at 100 m and 10 Gbps over shorter runs (about 55 m); Cat 6a supports 10 Gbps at the full 100 m; Cat 8 supports 25 or 40 Gbps over short runs of about 30 m, mainly between data centre racks. The standard maximum length for an Ethernet copper channel is 100 metres, including patch cords.",
   "Copper Ethernet uses RJ45 (8P8C) connectors, wired to the T568A or T568B standard; telephone lines use the smaller RJ11. Using the same standard at both ends gives a straight-through cable, for a PC to a switch. Using A at one end and B at the other gives a crossover, historically needed between like devices such as switch to switch, though most modern ports detect and fix this automatically with Auto-MDIX. A rollover (console) cable is different again: it connects a laptop to a device's console port for out-of-band setup. For cable run through air-handling spaces above ceilings or below raised floors, fire codes require plenum-rated cable, which produces less toxic smoke than ordinary PVC; riser-rated cable is for vertical runs between floors.",
   "Coaxial cable has a central conductor surrounded by insulation, a shield and a jacket. You meet it in cable internet and TV, where RG-6 is the common type, using F-type screw connectors; older RG-59 is thinner and suited to short runs. Twinaxial (twinax) cable, with two inner conductors, is used for short, cheap high-speed links in data centres as direct attach copper (DAC) cables, which come with transceivers permanently fitted at each end.",
   "Fibre-optic cable carries light, so it is immune to EMI, is hard to tap and reaches far greater distances than copper. Single-mode fibre (SMF) has a very thin core (about 9 micrometres) that carries a single path of laser light and can span many kilometres; it is used for long campus, metro and carrier links. Multimode fibre (MMF) has a wider core (50 or 62.5 micrometres), allows many light paths (modes) that spread out over distance, usually uses cheaper light sources and is limited to shorter distances, typically within a building or data centre. Jacket colours often help: yellow is usually single-mode, orange or aqua multimode. Common fibre connectors are LC (small, push-latch, very common on transceivers), SC (square, push-pull), ST (round, bayonet twist) and MPO (multi-fibre, for high-density 40 and 100 Gbps links). Fibre ends also have polish types: UPC is flat and usually blue, APC is angled and usually green, and the two must not be mated.",
   "Switches and routers often have empty slots that accept hot-swappable transceivers, which convert electrical signals to the right medium and wavelength. SFP (small form-factor pluggable) supports around 1 Gbps; SFP+ supports 10 Gbps; QSFP (quad SFP) modules bundle four lanes, so QSFP+ (4 x 10 Gbps) provides 40 Gbps and QSFP28 (4 x 25 Gbps) provides 100 Gbps. Transceivers must match on both ends: same speed, same standard and wavelength, and the correct fibre type. A single-mode optic on multimode fibre, or mismatched wavelengths, will not form a reliable link. Bidirectional (BiDi) transceivers send and receive on one strand using two different wavelengths, so the two ends must be complementary pairs. Media converters join copper and fibre segments when a device has no fibre port.",
   "Common mistakes include assuming Cat 6 always means 10 Gbps at 100 m (that is Cat 6a), using ordinary PVC cable in a plenum space, mixing SMF and MMF patch cords, plugging an APC connector into a UPC port, and forgetting that a 100 m copper limit includes the patch cables at both ends. When a link will not come up after installing optics, check in this order: both ends seated and the same type, transmit and receive strands not swapped, clean connectors, and correct fibre type. A dirty fibre end face is one of the most common causes of high loss.",
   "Exam questions usually give a distance, speed and environment and ask for the medium. 'Several kilometres' means single-mode; 'within the data centre, cost-sensitive' suggests multimode or DAC; 'heavy machinery', 'EMI', 'lightning between buildings' suggest fibre; 'above the ceiling air return' means plenum. Connector descriptions such as 'square push-pull', 'bayonet' or 'small latch' map to SC, ST and LC."
  ],
  "terms": [
   [
    "Plenum cable",
    "Cable with a fire-resistant, low-smoke jacket required for runs through air-handling spaces."
   ],
   [
    "Single-mode fibre",
    "Fibre with a narrow core that carries a single light path via laser, supporting long distances."
   ],
   [
    "Multimode fibre",
    "Fibre with a wider core that carries multiple light paths, cheaper but limited to shorter distances."
   ],
   [
    "SFP+",
    "A hot-swappable small form-factor pluggable transceiver supporting 10 Gbps links."
   ],
   [
    "QSFP28",
    "A quad small form-factor pluggable transceiver using four 25 Gbps lanes for 100 Gbps."
   ],
   [
    "LC connector",
    "A small form-factor fibre connector with a push-latch, common on SFP transceivers."
   ],
   [
    "Auto-MDIX",
    "A port feature that detects the cable wiring and automatically swaps transmit and receive pairs."
   ]
  ],
  "example": "A company needs to link two buildings 3 km apart at 10 Gbps. Copper cannot go beyond 100 m and multimode fibre is too short at that distance, so they choose single-mode fibre with matching 10 Gbps single-mode SFP+ optics and LC connectors on each switch. When the link will not come up, the technician finds a multimode orange patch cord used at one end, replaces it with a yellow single-mode cord, and cleans the connectors. Inside each building, Cat 6a plenum cable runs above the ceilings to the desks.",
  "tip": "Long distance equals single-mode; short, cheaper runs equal multimode. Copper Ethernet tops out at 100 m. Cat 6a is the first category rated for 10 Gbps at the full 100 m.",
  "check": [
   [
    "A new 10 Gbps copper run to a switch in the next room is 85 m long. Is Cat 6 acceptable, and if not what should be used?",
    "No. Cat 6 only supports 10 Gbps to about 55 m; Cat 6a supports 10 Gbps to the full 100 m."
   ],
   [
    "A fibre link between two switches shows light at one end but will not come up; both use 10GBASE-LR single-mode optics. What are the first physical things to check?",
    "That the transmit and receive strands are not swapped, that the patch cords are single-mode rather than multimode, and that the connectors are clean and fully seated."
   ],
   [
    "Why would you choose fibre over copper to connect two buildings, even if they are only 80 m apart?",
    "Fibre carries light, so it is immune to EMI and does not create electrical ground loops or carry lightning surges between buildings."
   ],
   [
    "A data centre needs cheap 10 Gbps links between servers and a top-of-rack switch 3 m away. What is a common choice?",
    "Direct attach copper (twinax DAC) cables, which include SFP+ ends and cost less than optical transceivers for very short runs."
   ]
  ]
 },
 {
  "t": "Topologies and architectures: mesh, star, hub and spoke, spine and leaf, three-tier, collapsed core, north-south vs east-west",
  "body": [
   "A topology is the shape of a network: how devices are connected physically and how traffic logically flows between them. An architecture is a proven design built from those shapes, such as the three-tier campus or the spine and leaf data centre. Network+ asks you to recognise each one, know its strengths and weaknesses, and pick the right one for a scenario. The trade-offs you weigh are almost always the same: cost, redundancy, scalability, latency and how easy the design is to manage.",
   "In a star topology, every device connects to a central device, today almost always a switch. It is easy to add devices and to troubleshoot, and one failed cable affects only one host, but the central switch is a single point of failure. A mesh topology connects nodes to many other nodes. A full mesh links every node to every other node, giving maximum redundancy but requiring n(n-1)/2 links, which quickly becomes expensive: 5 nodes need 10 links, but 20 nodes need 190. A partial mesh links only the important nodes redundantly, which is how most WAN cores and the internet itself are built. Older topologies such as bus and ring are mostly historical but may appear as distractors. A hybrid topology mixes several of these, and most real networks are hybrids.",
   "Hub and spoke is a star at WAN scale: branch sites (spokes) connect to a central site (hub), often over VPN tunnels. It is simple, cheap and easy to secure centrally, but branch-to-branch traffic must pass through the hub, adding delay and hub bandwidth, and the hub is a single point of failure unless it is duplicated. Point-to-point links connect exactly two sites. Designs such as dynamic multipoint VPNs and SD-WAN build spoke-to-spoke tunnels on demand to avoid the hub detour.",
   "Enterprise campus networks traditionally use a three-tier hierarchy. The access layer connects end devices and provides port security, PoE and VLAN assignment. The distribution layer aggregates access switches, routes between VLANs, applies policy such as ACLs and QoS, and provides redundant uplinks. The core layer is a fast, highly redundant backbone that simply moves traffic quickly between distribution blocks and to the data centre and internet edge; it should avoid slow, complex policy. In smaller sites the core and distribution layers are merged into one pair of switches, a collapsed core (two-tier) design, which saves cost and equipment while keeping redundancy. A useful rule: if a building only has one distribution block, a separate core adds cost without benefit.",
   "Data centres increasingly use spine and leaf. Every leaf switch (where servers, storage and firewalls connect, often top-of-rack) links to every spine switch; leaves never connect to each other, and spines never connect to each other. Any server is therefore always the same number of hops, leaf to spine to leaf, from any other, giving predictable low latency. To add bandwidth you add spines; to add ports you add leaves. All uplinks are active at the same time using equal-cost multipath (ECMP) routing, instead of half of them being blocked by Spanning Tree Protocol as in a traditional Layer 2 design.",
   "Traffic direction matters for design and security. North-south traffic flows in and out of the data centre, between clients or the internet and servers, and has traditionally crossed the perimeter firewall. East-west traffic flows sideways between servers inside the data centre, such as a web server talking to a database, application tiers calling each other, or virtual machines replicating storage. Modern applications generate far more east-west traffic than north-south, which is one reason spine and leaf replaced three-tier designs in data centres. It is also why security now inspects internal traffic too, using microsegmentation, rather than trusting everything inside the perimeter; an attacker who compromises one server moves laterally east-west.",
   "Common mistakes include calling any design with a central device a mesh, forgetting that hub and spoke forces spoke-to-spoke traffic through the hub, and thinking spine and leaf is a campus design (it is a data centre design). Another trap is the difference between physical and logical topology: an office may be physically wired as a star while traffic logically follows a different path, and Wi-Fi clients form a logical star around the access point. Know the full mesh formula well enough to use it quickly.",
   "Exam scenarios give you clue words. 'Every node connected to every other', 'maximum redundancy' means full mesh. 'Branches connect to headquarters', 'lowest cost WAN' means hub and spoke. 'Small campus', 'combine core and distribution' means collapsed core. 'Data centre', 'predictable latency', 'server-to-server traffic', 'every leaf to every spine' means spine and leaf. 'Client to data centre' is north-south; 'server to server' is east-west."
  ],
  "terms": [
   [
    "Star topology",
    "A layout where every device connects to one central device, usually a switch, which becomes a single point of failure."
   ],
   [
    "Full mesh",
    "A topology where every node connects directly to every other node, maximizing redundancy; it needs n(n-1)/2 links."
   ],
   [
    "Hub and spoke",
    "A WAN design where branch sites connect to a central site, and branch-to-branch traffic passes through the hub."
   ],
   [
    "Three-tier architecture",
    "A campus design with access, distribution and core layers, each with a distinct role."
   ],
   [
    "Collapsed core",
    "A two-tier design where the core and distribution layers are combined in the same devices."
   ],
   [
    "Spine and leaf",
    "A data centre design where every leaf switch connects to every spine switch, giving consistent hop counts."
   ],
   [
    "East-west traffic",
    "Traffic moving laterally between systems inside a data centre."
   ]
  ],
  "example": "A retailer connects 200 stores to headquarters with a hub-and-spoke VPN design because it is cheap and simple, and it duplicates the hub routers so one failure does not cut off every store. Its headquarters campus has only one building, so it uses a collapsed core with two switches acting as both core and distribution. Its data centre, where application servers constantly exchange data, uses spine and leaf so any server can reach any other in exactly two switch hops. The security team adds microsegmentation because most data centre traffic is east-west and never crosses the perimeter firewall.",
  "tip": "Hub and spoke: cheap but the hub is a single point of failure and spoke-to-spoke traffic transits the hub. Spine and leaf: data centre, east-west heavy. Collapsed core: small or medium campus combining core and distribution.",
  "check": [
   [
    "How many links does a full mesh of 6 sites need, and why do most WANs use partial mesh instead?",
    "15, using n(n-1)/2 = 6 x 5 / 2. Full mesh cost grows quickly with each site, so partial mesh adds redundancy only where it is needed."
   ],
   [
    "Two branch offices in a hub-and-spoke design complain that video calls between them lag. What is the design reason?",
    "Their traffic must travel to the hub and back instead of directly between branches, adding latency and consuming hub bandwidth."
   ],
   [
    "A data centre adds more servers and runs out of ports, but the uplink bandwidth is fine. In spine and leaf, what do you add?",
    "More leaf switches, each connected to every spine; spines are added when more bandwidth between leaves is needed."
   ],
   [
    "Why does spine and leaf not rely on Spanning Tree to block redundant uplinks?",
    "It uses routed links with equal-cost multipath, so all uplinks forward traffic at the same time without loops."
   ]
  ]
 },
 {
  "t": "IPv4 addressing: public vs private (RFC 1918), APIPA, loopback, classes, subnetting and VLSM, CIDR",
  "body": [
   "An IPv4 address is 32 bits written as four decimal octets, such as 192.168.10.25. A subnet mask, such as 255.255.255.0 or /24 in CIDR notation, marks which bits are the network portion and which identify the host. Hosts with the same network portion are on the same subnet and talk directly using ARP and switching; anything else goes to the default gateway. Almost every troubleshooting question eventually depends on reading an address and mask correctly, so this is one of the most important skills for the exam.",
   "Public addresses are globally unique and routable on the internet. Private addresses, defined in RFC 1918, are free to reuse inside any organization and are not routed on the internet: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. Private hosts reach the internet through NAT. Other special ranges: 127.0.0.0/8 is loopback (127.0.0.1 tests your own TCP/IP stack without touching the network), and 169.254.0.0/16 is APIPA (Automatic Private IP Addressing), which a host assigns itself when it cannot reach a DHCP server. Seeing a 169.254.x.x address is a strong clue that DHCP failed. 100.64.0.0/10 is reserved for carrier-grade NAT inside provider networks.",
   "Classful addressing is historical but still tested. Class A is 1 to 126 in the first octet with a default /8 mask; Class B is 128 to 191 with /16; Class C is 192 to 223 with /24; Class D, 224 to 239, is multicast; Class E, 240 to 255, is experimental (127 is reserved for loopback). Classes wasted huge numbers of addresses, so they were replaced by CIDR (Classless Inter-Domain Routing), which allows any prefix length and lets routers summarize many networks into one route, for example advertising 10.1.0.0/16 instead of 256 separate /24s.",
   "Subnetting borrows host bits to create smaller networks. The key formulas: number of subnets = 2 to the power of borrowed bits; usable hosts per subnet = 2 to the power of host bits, minus 2 (one for the network address, one for the broadcast address). The block size, 256 minus the mask value in the 'interesting' octet, tells you where subnets start. Here is the method worked through for 192.168.1.100/26.",
   "```\n/26 = 255.255.255.192  -> host bits = 32 - 26 = 6\nAddresses per subnet  = 2^6 = 64, usable = 62\nBlock size            = 256 - 192 = 64 -> subnets at .0 .64 .128 .192\n.100 falls in the .64 block\nNetwork   192.168.1.64\nFirst     192.168.1.65\nLast      192.168.1.126\nBroadcast 192.168.1.127\n```",
   "The same method works in any octet. For 172.16.37.10/20 the interesting octet is the third (mask 255.255.240.0), the block size is 256 - 240 = 16, so subnets start at .0, .16, .32, .48; 37 falls in the .32 block, giving network 172.16.32.0 and broadcast 172.16.47.255, with 4,094 usable hosts. A /30 gives 2 usable hosts, handy for point-to-point router links, and a /31 is also permitted for them because no broadcast is needed on a two-device link. Memorise a small table: /24 = 254 hosts, /25 = 126, /26 = 62, /27 = 30, /28 = 14, /29 = 6, /30 = 2.",
   "VLSM (variable-length subnet masking) means using different mask lengths within one address block so each subnet fits its need without waste. Always allocate the largest subnets first so the blocks line up on their boundaries. To carve 10.10.0.0/16 for 500, 200, 60 and 2 hosts: 500 hosts need 9 host bits, so 10.10.0.0/23 (510 usable, ending at 10.10.1.255); 200 hosts need 8 host bits, so 10.10.2.0/24; 60 hosts need 6 host bits, so 10.10.3.0/26; and the 2-host link gets 10.10.3.64/30. Practise until you can do this on paper quickly, then check your answers with `ipcalc` or a calculator.",
   "Common mistakes: treating 172.32.x.x as private (the private block stops at 172.31.255.255), forgetting to subtract 2 for usable hosts, choosing a subnet one size too small (60 hosts fits a /26, but 63 hosts does not), and assigning a host the network or broadcast address. Another classic fault is a wrong mask on one PC: a host set to /16 on a /24 network believes distant addresses are local and ARPs for them instead of using the gateway. Use `ipconfig` on Windows or `ip addr` on Linux to see the address, mask and gateway actually in use. Exam questions come in a few forms: calculate the network, broadcast or usable range; pick the smallest mask that fits a host count; identify whether an address is private, public, APIPA or loopback; or spot the misconfigured host in a table. Clue words include 'self-assigned', 'cannot reach DHCP' (APIPA), 'test the local stack' (loopback), 'minimize wasted addresses' (VLSM), and 'summarize routes' (CIDR)."
  ],
  "terms": [
   [
    "Subnet mask",
    "A 32-bit value (or /prefix) that marks which part of an IPv4 address is the network and which part is the host."
   ],
   [
    "RFC 1918",
    "The standard defining private IPv4 ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing: self-assigned 169.254.0.0/16 addresses used when DHCP is unavailable."
   ],
   [
    "Loopback",
    "The 127.0.0.0/8 range, with 127.0.0.1 used to test the local TCP/IP stack."
   ],
   [
    "CIDR",
    "Classless Inter-Domain Routing: notation and routing that use any prefix length instead of fixed classes."
   ],
   [
    "VLSM",
    "Variable-length subnet masking: using different subnet mask lengths within one address space to fit each subnet's size."
   ],
   [
    "Broadcast address",
    "The last address in a subnet, used to reach every host on it and never assigned to a host."
   ]
  ],
  "example": "A user reports no network access. Running `ipconfig` shows 169.254.33.7 with mask 255.255.0.0 and no default gateway. That APIPA address tells you the PC never got a DHCP lease, so you check the DHCP server, the DHCP relay on the router and the switch port's VLAN instead of wasting time on DNS or the browser. You find the port was moved to a VLAN that has no DHCP relay configured, fix it, run `ipconfig /renew`, and the PC receives 10.20.5.40/24 with its gateway.",
  "tip": "Usable hosts = 2^h - 2. Watch for 172.32.x.x: it is public, because the private block stops at 172.31.255.255. A 169.254 address means DHCP failure.",
  "check": [
   [
    "A department needs 60 hosts today and expects 10 more next year. Which is the smallest prefix that fits, and why not /26?",
    "A /25 (126 usable). A /26 gives only 62 usable hosts, which would run out when the department grows to 70."
   ],
   [
    "What are the network and broadcast addresses for 172.16.5.77/28?",
    "The block size is 16, so the network is 172.16.5.64 and the broadcast is 172.16.5.79, with usable hosts .65 to .78."
   ],
   [
    "Host A is 192.168.1.10/24 and host B is 192.168.1.200/25. Can they communicate directly, and why?",
    "Not reliably. A treats B as local, but B's /25 covers only .128 to .255, so B sends replies for .10 to its gateway; the mismatched masks cause asymmetric or failed communication."
   ],
   [
    "Why must VLSM allocations start with the largest subnet?",
    "Larger blocks must start on their own block-size boundaries; allocating big blocks first keeps them aligned and leaves the remaining space in usable smaller pieces."
   ]
  ]
 },
 {
  "t": "Evolving use cases: SDN and SD-WAN, VxLAN, zero trust, SASE/SSE, infrastructure as code",
  "body": [
   "Networks are moving from box-by-box manual configuration toward centrally defined, software-driven and identity-aware designs. The Network+ objectives group several of these ideas together because they solve related problems: networks are too big to configure by hand, users and applications are no longer inside one building, and the old idea of a trusted internal network no longer holds. You do not need vendor detail, but you must understand what each concept does, what problem it solves and how to tell them apart.",
   "Software-defined networking (SDN) separates the control plane, which decides where traffic should go, from the data plane, which actually forwards it. A central controller holds the network-wide view and programs the forwarding devices. SDN is usually described in layers: the application layer (business applications that express intent), the control layer (the controller) and the infrastructure or data layer (switches and routers). Applications talk to the controller through northbound APIs, and the controller talks to devices through southbound APIs. A management plane handles monitoring and configuring the devices themselves. The benefit is consistency and automation: one policy change is pushed everywhere, instead of logging into hundreds of switches.",
   "SD-WAN (software-defined wide area network) applies the same idea to branch connectivity. Instead of relying on one expensive private circuit, a branch can use several transports at once, such as broadband internet, LTE/5G and MPLS, and the SD-WAN controller steers each application over the best path based on measured latency, loss and jitter. It is application aware, supports zero-touch provisioning (a new branch box downloads its configuration when plugged in), uses central policy management, and often sends cloud traffic straight to the internet instead of backhauling it through headquarters. It is transport agnostic: it does not care what kind of link it runs over.",
   "VXLAN (Virtual Extensible LAN) solves data centre scale problems. Traditional VLAN IDs are 12 bits, allowing about 4,094 usable VLANs, which is not enough for large multi-tenant clouds. VXLAN uses a 24-bit VXLAN network identifier (VNI), allowing around 16 million segments. It encapsulates Layer 2 Ethernet frames inside UDP packets (port 4789) so they can cross a routed Layer 3 network, letting a virtual machine keep its Layer 2 segment and IP address even when it moves to another rack or site. This is called a Layer 2 overlay on a Layer 3 underlay; the devices that encapsulate and decapsulate are VTEPs (VXLAN tunnel endpoints). Data Center Interconnect (DCI) uses such overlays between sites. Because of the extra headers, VXLAN networks need a larger MTU on the underlay.",
   "Zero trust drops the idea that anything inside the network perimeter is trusted. Every request is authenticated, authorized and continuously evaluated using identity, device health and context such as location and time, with least privilege access. It relies on policy-based authentication and authorization and on microsegmentation, which puts tight controls around small groups of systems. SASE (secure access service edge) combines SD-WAN networking with cloud-delivered security. SSE (security service edge) is the security part alone: secure web gateway, cloud access security broker (CASB), zero trust network access (ZTNA) and firewall as a service, delivered from cloud points of presence close to users wherever they work.",
   "Infrastructure as code (IaC) means defining network and cloud infrastructure in text files, such as templates or playbooks, that tools apply automatically. Because the files live in version control (source control), changes are reviewed, repeatable, tested on branches and easy to roll back. IaC fights configuration drift, where devices slowly diverge from their intended settings through manual changes. A tiny example of the idea, written as a declarative template, is shown below.",
   "```\nvlans:\n  - id: 20\n    name: VOICE\n  - id: 30\n    name: CAMERAS\ninterfaces:\n  Gi1/0/5: { mode: access, vlan: 30 }\n```",
   "Common mistakes include confusing SDN with SD-WAN (SDN is the general architecture; SD-WAN applies it to WAN links), confusing SASE with SSE (SSE lacks the SD-WAN part), assuming zero trust is a product you buy rather than a strategy, and thinking VXLAN is just 'bigger VLANs' when its key feature is carrying Layer 2 across Layer 3. Also remember that IaC does not remove the need for change management; it makes changes easier to review and audit. Exam questions usually describe a goal. 'Central controller', 'separate control and data plane', 'northbound API' means SDN. 'Multiple branch links', 'application-aware path selection', 'zero-touch provisioning' means SD-WAN. 'Over 4,094 segments', 'Layer 2 over Layer 3', 'VNI' means VXLAN. 'Never trust, always verify' means zero trust. 'Cloud-delivered security plus networking' means SASE; 'security only' means SSE. 'Version control', 'templates', 'drift' mean infrastructure as code."
  ],
  "terms": [
   [
    "Control plane",
    "The part of a network device or system that decides how traffic should be forwarded, such as routing protocols."
   ],
   [
    "Data plane",
    "The part that actually forwards packets and frames according to the control plane's decisions."
   ],
   [
    "SD-WAN",
    "Software-defined WAN: centrally managed branch networking that steers applications across multiple transports by measured path quality."
   ],
   [
    "VXLAN",
    "An overlay protocol that encapsulates Layer 2 frames in UDP over a Layer 3 network, using a 24-bit segment ID."
   ],
   [
    "Zero trust",
    "A security model that grants no implicit trust based on network location and verifies every request by identity and context."
   ],
   [
    "SASE",
    "Secure access service edge: a cloud-delivered combination of SD-WAN networking and security services."
   ],
   [
    "Configuration drift",
    "The gradual divergence of devices from their intended, documented configuration."
   ]
  ],
  "example": "A company with 40 branches replaces MPLS-only links with SD-WAN over broadband and LTE. Video calls automatically use the path with the lowest jitter, and when a broadband link degrades, traffic shifts to LTE without anyone noticing. New branches come online by plugging in a device that downloads its configuration from the controller, and all branch configurations are stored as templates in version control. Remote staff reach internal applications through a cloud SSE service that checks their identity and device health before every session instead of trusting a VPN connection.",
  "tip": "SDN separates control plane from data plane. VXLAN = Layer 2 over Layer 3 with a 24-bit ID for millions of segments. SSE is the security portion of SASE, without the SD-WAN networking.",
  "check": [
   [
    "A cloud provider needs to give 50,000 tenants isolated Layer 2 segments across a routed data centre. Why are VLANs not enough and what fits?",
    "VLANs are limited to about 4,094 IDs and do not cross Layer 3 boundaries; VXLAN's 24-bit VNI supports about 16 million segments over a routed underlay."
   ],
   [
    "An organization buys cloud-delivered secure web gateway, CASB and ZTNA but keeps its existing WAN. Is that SASE or SSE?",
    "SSE, because it is the security services without the SD-WAN networking component that SASE adds."
   ],
   [
    "An engineer notices switches configured by hand over the years no longer match the documented standard. What problem is this, and how does IaC help?",
    "Configuration drift; IaC keeps the intended configuration in version-controlled files and reapplies it consistently, so differences are detected and corrected."
   ],
   [
    "A user on the office LAN is still asked to re-authenticate and pass a device health check before reaching a finance app. Which principle is at work?",
    "Zero trust: being on the internal network grants no implicit trust, so every access request is verified."
   ]
  ]
 },
 {
  "t": "IPv6: address types, dual stack, tunneling, NAT64",
  "body": [
   "IPv6 was created mainly because IPv4's roughly 4.3 billion addresses ran out. An IPv6 address is 128 bits, written as eight groups (hextets) of four hexadecimal digits separated by colons, such as 2001:0db8:0000:0000:0000:ff00:0042:8329. That space is so large that NAT is no longer needed to conserve addresses, and every device can have a globally unique address. IPv6 also simplifies the header, removes broadcast and builds in autoconfiguration. Network+ expects you to read and shorten addresses, recognise address types by their prefix, and know how IPv6 coexists with IPv4.",
   "Two rules shorten an address. First, drop leading zeros in each group (0db8 becomes db8, 0042 becomes 42). Second, replace one run of consecutive all-zero groups with a double colon (::), which may be used only once, because otherwise nobody could tell how many zeros each :: stood for. Applying both rules, 2001:0db8:0000:0000:0000:ff00:0042:8329 becomes 2001:db8::ff00:42:8329. To expand, work backwards: count the groups you can see and let :: fill the rest up to eight. Subnets are almost always /64, with the first 64 bits for the network prefix (an organization typically receives a /48 and carves it into /64s) and the last 64 bits for the interface ID.",
   "Address types matter on the exam. Global unicast addresses (GUA) are public and routable, currently allocated from 2000::/3, so they start with 2 or 3. Unique local addresses (ULA), fc00::/7 (in practice fd00::/8), are like RFC 1918 private space. Link-local addresses, fe80::/10, are automatically configured on every IPv6 interface and are valid only on the local link; routers use them as next hops and neighbours use them to talk before other addresses exist. The loopback is ::1, and :: on its own means unspecified. Multicast addresses start with ff; ff02::1 reaches all nodes on the link and ff02::2 all routers. Anycast addresses look like unicast but are assigned to several devices. There is no broadcast in IPv6; multicast does that job.",
   "IPv6 hosts can configure themselves. Neighbor Discovery Protocol (NDP), carried in ICMPv6, replaces ARP: hosts send neighbor solicitations to learn a neighbour's MAC address and router solicitations to find routers, and routers reply with router advertisements (RAs) that carry the network prefix and default gateway. With SLAAC (stateless address autoconfiguration), the host combines the advertised /64 prefix with an interface ID it generates, either from its MAC address using EUI-64 (split the MAC, insert fffe in the middle and flip the seventh bit) or, more commonly now, randomly for privacy. DHCPv6 can also be used, statefully to assign addresses or statelessly to hand out options such as DNS servers. Duplicate address detection checks that no one else is using the address first. Because ICMPv6 is essential to all of this, it must not be blocked wholesale.",
   "Because the internet will run both versions for a long time, you need transition methods. Dual stack means a device runs IPv4 and IPv6 at the same time with addresses of both types; it is the preferred approach and simply uses whichever protocol the destination supports, usually trying IPv6 first. Tunneling carries IPv6 packets inside IPv4 across networks that do not yet support IPv6. Examples include manually configured 6in4 tunnels, the automatic 6to4 method, ISATAP inside enterprises, and Teredo, which tunnels through NAT using UDP. The automatic methods are largely deprecated today but may still appear on the exam. Tunnels add overhead and can hide traffic from security tools, so unexpected tunnels are a security concern.",
   "NAT64 lets IPv6-only clients reach IPv4-only servers. A NAT64 gateway translates between the two protocols, and DNS64 helps by synthesising AAAA (IPv6) records for names that only have A (IPv4) records. The synthesized address sits inside a special prefix (commonly 64:ff9b::/96) that routes to the gateway, which strips the prefix to recover the IPv4 address and translates the packet. This is common on IPv6-only mobile networks. Note the difference from tunneling: tunneling carries IPv6 unchanged inside IPv4, while NAT64 actually translates one protocol into the other.",
   "In the lab, run `ipconfig` on Windows or `ip -6 addr` on Linux and you will see at least an fe80:: link-local address on each interface, even if nobody configured IPv6. Test IPv6 reachability with `ping -6` (or `ping6`) and paths with `tracert -6`. Common mistakes: using :: twice in one address, dropping trailing zeros instead of leading zeros (db80 cannot become db8), assuming fe80 addresses are routable, thinking IPv6 uses broadcast, and assuming ULA and link-local are the same thing (ULA is routable inside your organization; link-local never leaves the link).",
   "Exam questions typically ask you to compress or expand an address, identify an address type from its first hextet, or choose a transition method. Clue words: 'both protocols on the same device' means dual stack; 'IPv6 across an IPv4-only network' means tunneling; 'IPv6-only clients reaching IPv4 servers' means NAT64 with DNS64; 'replaces ARP' means NDP; 'host builds its own address from the router's prefix' means SLAAC."
  ],
  "terms": [
   [
    "Global unicast address",
    "A public, routable IPv6 address, currently from 2000::/3."
   ],
   [
    "Unique local address",
    "An IPv6 address in fc00::/7 (fd00::/8 in practice) used privately inside an organization, like RFC 1918 space."
   ],
   [
    "Link-local address",
    "An automatically configured fe80::/10 IPv6 address valid only on the local network segment."
   ],
   [
    "SLAAC",
    "Stateless address autoconfiguration: hosts build their own IPv6 address from a router-advertised prefix."
   ],
   [
    "NDP",
    "Neighbor Discovery Protocol: ICMPv6-based protocol that replaces ARP and provides router discovery in IPv6."
   ],
   [
    "Dual stack",
    "Running IPv4 and IPv6 simultaneously on the same devices and network."
   ],
   [
    "NAT64",
    "A translation mechanism that lets IPv6-only hosts communicate with IPv4-only hosts, usually paired with DNS64."
   ]
  ],
  "example": "A mobile carrier runs an IPv6-only network to save IPv4 addresses. When a phone looks up a news site that only has an IPv4 A record, the carrier's DNS64 server returns a synthesized AAAA record inside 64:ff9b::/96. The phone sends IPv6 packets to that address, and the NAT64 gateway translates them to IPv4 and back, so the user never notices. Meanwhile, the carrier's corporate office runs dual stack, so staff laptops reach IPv6 sites natively and older IPv4-only systems without any translation.",
  "tip": "fe80 = link-local, fc00/fd00 = unique local (private), 2000::/3 = global unicast, ff = multicast, ::1 = loopback. The double colon can appear only once in an address. IPv6 has no broadcast.",
  "check": [
   [
    "Shorten 2001:0db8:0000:0000:0001:0000:0000:0001 correctly, and explain why you cannot use :: twice.",
    "2001:db8::1:0:0:1 (or 2001:db8:0:0:1::1). Using :: twice would be ambiguous, because a reader could not tell how many zero groups each one represents."
   ],
   [
    "A host has only an fe80:: address and cannot reach anything beyond its own switch. What is the most likely cause?",
    "It has not received a router advertisement (or DHCPv6), so it has no global or unique local address and no default gateway; link-local addresses never leave the link."
   ],
   [
    "An engineer blocks all ICMPv6 at a firewall for security. Why does IPv6 then break on that segment?",
    "IPv6 relies on ICMPv6 for Neighbor Discovery, router advertisements and path MTU discovery; blocking it prevents address resolution and gateway discovery."
   ],
   [
    "What is the key difference between a 6in4 tunnel and NAT64?",
    "A tunnel carries IPv6 packets unchanged inside IPv4 between two IPv6 islands; NAT64 translates IPv6 packets into IPv4 so IPv6-only clients can talk to IPv4-only servers."
   ]
  ]
 },
 {
  "t": "Static vs dynamic routing; OSPF, EIGRP and BGP; route selection (longest prefix, administrative distance, metrics)",
  "body": [
   "A router forwards each packet by looking up the destination address in its routing table. Routes get into the table in three ways: directly connected networks (from the router's own configured and active interfaces), static routes an administrator types in, and dynamic routes learned from routing protocols. A default route, 0.0.0.0/0 in IPv4 or ::/0 in IPv6, matches anything not otherwise known and is often called the gateway of last resort. If no route matches and there is no default, the router drops the packet and sends back an ICMP Destination Unreachable message.",
   "Static routing is simple, predictable and uses no bandwidth or CPU for protocol traffic, which makes it ideal for small networks, stub sites with one exit and default routes to an ISP. Its weakness is that it does not adapt: if a link fails, the static route stays until someone changes it, and in large networks maintaining hundreds of static routes is error-prone. A floating static route is a backup static route given a worse (higher) administrative distance so it is used only when the primary route disappears. Dynamic routing protocols exchange routes automatically and reconverge after failures, at the cost of some complexity, memory and overhead. Convergence is the time it takes all routers to agree on the new topology after a change.",
   "Interior gateway protocols (IGPs) route inside one organization's network, an autonomous system. OSPF (Open Shortest Path First) is an open-standard link-state protocol: every router floods link-state advertisements, builds the same full map of the topology, runs Dijkstra's shortest path first algorithm and chooses paths by cost, which is derived from interface bandwidth (faster links have lower cost). It organizes networks into areas, with area 0 as the backbone that all other areas connect to, and converges quickly. EIGRP (Enhanced Interior Gateway Routing Protocol) is a Cisco-developed advanced distance-vector (sometimes called hybrid) protocol that uses a composite metric, by default based on bandwidth and delay, and converges quickly thanks to precomputed backup routes called feasible successors. Older RIP is a simple distance-vector protocol that uses hop count, with a maximum of 15 hops.",
   "BGP (Border Gateway Protocol) is the exterior gateway protocol that routes between autonomous systems and holds the internet together. Each organization or ISP has an autonomous system number (ASN). BGP is a path-vector protocol: it selects routes using attributes such as the AS path length and administrator policy, not raw link speed, and it runs over TCP port 179. External BGP (eBGP) runs between different ASes; internal BGP (iBGP) runs within one. Organizations use BGP when they connect to more than one ISP (multihoming) and want to control which link carries which traffic.",
   "When a router has several routes to a destination, it chooses in a fixed order. First, longest prefix match: the most specific route wins. A packet to 10.1.1.5 matches 10.0.0.0/8, 10.1.0.0/16 and 10.1.1.0/24, and the /24 is used. Second, if identical prefixes come from different sources, the lowest administrative distance (AD), a trustworthiness rating, wins. Typical Cisco defaults are connected 0, static 1, eBGP 20, internal EIGRP 90, OSPF 110, RIP 120 and iBGP 200. Third, within one protocol, the lowest metric wins, such as OSPF cost or RIP hop count. If metrics tie, many routers load-balance across the equal-cost paths.",
   "```\nR1# show ip route\nGateway of last resort is 203.0.113.1 to network 0.0.0.0\nS*    0.0.0.0/0 [1/0] via 203.0.113.1\nC     10.1.1.0/24 is directly connected, GigabitEthernet0/1\nO     10.2.0.0/16 [110/20] via 10.1.1.2, GigabitEthernet0/1\nD     10.3.0.0/16 [90/30720] via 10.1.1.3, GigabitEthernet0/1\nS     10.2.5.0/24 [1/0] via 10.1.1.9\n```",
   "Reading that output: codes show the source (S static, C connected, O OSPF, D EIGRP, and S* the default), and the brackets show [AD/metric]. A packet to 10.2.5.20 uses the static /24 because it is more specific than the OSPF /16, even though they come from different protocols; a packet to 10.2.8.1 uses the OSPF route; a packet to 8.8.8.8 matches only the default route. Common mistakes: comparing metrics across different protocols (an OSPF cost of 20 and an EIGRP metric of 30720 cannot be compared, AD decides), applying AD before longest prefix, and assuming a lower AD route to a broader network beats a more specific one.",
   "Exam questions usually give you a routing table or scenario and ask which route is used, or describe a network and ask which protocol fits. Clue words: 'open standard, link-state, areas' means OSPF; 'Cisco, composite metric, bandwidth and delay' means EIGRP; 'between autonomous systems', 'multiple ISPs', 'internet routing' means BGP; 'single exit', 'small branch' means static or default route; 'backup route used only if the primary fails' means floating static."
  ],
  "terms": [
   [
    "Default route",
    "A route to 0.0.0.0/0 (or ::/0) used when no more specific route matches; the gateway of last resort."
   ],
   [
    "Floating static route",
    "A static route with a higher administrative distance that acts as a backup when the primary route is lost."
   ],
   [
    "Administrative distance",
    "A value rating the trustworthiness of a route source; the lower value is preferred when prefixes are equal."
   ],
   [
    "Longest prefix match",
    "The rule that a router uses the most specific matching route (longest subnet mask) for a destination."
   ],
   [
    "Link-state protocol",
    "A routing protocol, like OSPF, in which each router builds a full map of the topology and computes best paths."
   ],
   [
    "Autonomous system",
    "A network or group of networks under one administrative control, identified in BGP by an ASN."
   ],
   [
    "Convergence",
    "The process and time for all routers to agree on routes after a topology change."
   ]
  ],
  "example": "A router has an OSPF route to 172.16.0.0/16 and a static route to 172.16.8.0/24. A packet to 172.16.8.9 follows the static /24 because of longest prefix match, while a packet to 172.16.9.9 follows the OSPF /16. If the router also learned 172.16.0.0/16 from EIGRP, it would install the EIGRP route (AD 90) instead of OSPF (AD 110). For internet access it has a default static route to its primary ISP and a floating static default with AD 250 to a backup ISP, which only appears in the table if the primary link goes down.",
  "tip": "Order of selection: longest prefix first, then administrative distance, then metric. Do not compare metrics across different protocols. BGP is the only exterior gateway protocol you need to know.",
  "check": [
   [
    "For a packet to 10.5.1.1, which wins: a static route (AD 1) to 10.0.0.0/8 or an OSPF route (AD 110) to 10.5.0.0/16?",
    "The OSPF /16, because longest prefix match is evaluated before administrative distance."
   ],
   [
    "An engineer adds a backup static default route but it immediately replaces the OSPF-learned default. What should they change?",
    "Give the static route a higher administrative distance than OSPF's 110 (for example 250) so it becomes a floating static route used only when the OSPF route disappears."
   ],
   [
    "A small branch has one WAN link to headquarters and no other exits. Is a dynamic routing protocol worth running there, and why?",
    "Usually not; a static default route toward headquarters is simpler, uses no protocol overhead, and there is no alternative path for a protocol to fail over to."
   ],
   [
    "A company connects to two ISPs and wants control over which link inbound and outbound internet traffic uses. Which protocol does it need?",
    "BGP, because it exchanges routes between autonomous systems and lets the company apply path policies across multiple providers."
   ]
  ]
 },
 {
  "t": "NAT and PAT, first hop redundancy (FHRP/VRRP/HSRP), subinterfaces",
  "body": [
   "Network address translation (NAT) rewrites IP addresses as packets pass through a router or firewall. Its main job is letting hosts with private RFC 1918 addresses reach the internet using public addresses, which conserves scarce IPv4 space and hides internal addressing. The router keeps a translation table so return traffic is mapped back to the right inside host. NAT is configured on the device at the boundary between the inside (private) and outside (public) networks, usually the edge router or firewall.",
   "There are several forms. Static NAT maps one private address to one public address permanently, which is used when an internal server must be reachable from outside. Dynamic NAT maps private addresses to public addresses taken from a pool on a first-come basis; when the pool is empty, new hosts cannot connect. Port address translation (PAT), also called NAT overload, maps many private addresses to a single public address by also translating the source port, so each inside connection gets a unique public address and port pair. PAT is what every home router and most corporate edges do. Port forwarding is a static rule that sends inbound traffic for a particular public port to an inside host, for example public TCP 443 to an internal web server.",
   "Here is PAT step by step. PC A (10.0.0.5) opens a connection from source port 51000 to a web server. The router rewrites the source to its public address 203.0.113.10 and, if needed, a new port such as 40001, and records the mapping. PC B (10.0.0.6) also uses source port 51000; the router gives it 203.0.113.10:40002. When replies arrive for port 40001 the router looks up the table and sends them to 10.0.0.5:51000. Router terms you may see: inside local is the private address of the inside host, inside global is the public address it is translated to, and outside global is the real address of the internet host.",
   "```\nR1# show ip nat translations\nPro  Inside global        Inside local      Outside global\ntcp  203.0.113.10:40001   10.0.0.5:51000    198.51.100.7:443\ntcp  203.0.113.10:40002   10.0.0.6:51000    198.51.100.7:443\ntcp  203.0.113.20:443     10.0.0.50:443     ---\n```",
   "The last line above is a static mapping for an internal web server. NAT breaks true end-to-end addressing, which complicates some protocols such as IPsec (hence NAT traversal on UDP 4500) and SIP, and it is not a security control by itself, although it does block unsolicited inbound connections as a side effect. Now consider the default gateway. Every host has one default gateway configured, and if that router fails, hosts lose access beyond their subnet even when a second router exists. A first hop redundancy protocol (FHRP) solves this by letting two or more routers share a virtual IP address and virtual MAC address. Hosts use the virtual IP as their gateway; one router is active and answers ARP for it, and if it fails, a standby router takes over the virtual address within seconds, without any host reconfiguration.",
   "HSRP (Hot Standby Router Protocol) is Cisco proprietary, with active and standby roles. VRRP (Virtual Router Redundancy Protocol) is the open standard, with master and backup roles, and can even use a real router interface address as the virtual IP. Both elect the active router by a configurable priority (highest wins), exchange hello messages to detect failure, and support preemption, which lets a higher-priority router take the role back when it recovers. Without preemption, the backup keeps the role even after the original returns. GLBP is another Cisco option that also load-balances across routers. Interface tracking can lower a router's priority if its uplink fails, so a router with a dead WAN link hands the gateway role to its peer.",
   "A subinterface is a logical interface created on one physical interface, such as GigabitEthernet0/0.10. The classic use is router on a stick: a single router port connects to a switch trunk, and each subinterface is tagged with a VLAN ID using 802.1Q encapsulation and given an IP address to act as that VLAN's gateway. The router then routes between VLANs over one cable, for example `interface g0/0.10`, `encapsulation dot1Q 10`, `ip address 192.168.10.1 255.255.255.0`. It is cheap and simple, though the single link can become a bottleneck, which is why larger networks use Layer 3 switches with SVIs instead. Common mistakes: forgetting the switch side must be a trunk, mismatching the VLAN number in the encapsulation, and giving hosts a physical router address instead of the FHRP virtual IP as their gateway.",
   "Exam clue words: 'many users, one public IP' means PAT; 'server must be reachable from the internet on a fixed address' means static NAT or port forwarding; 'pool exhausted' means dynamic NAT. 'Gateway redundancy', 'virtual IP', 'hosts do not change settings' mean FHRP, with 'open standard' pointing to VRRP and 'Cisco proprietary' to HSRP. 'Inter-VLAN routing with one router interface' means router on a stick with subinterfaces."
  ],
  "terms": [
   [
    "PAT",
    "Port address translation: maps many private addresses to one public address by using unique source ports."
   ],
   [
    "Static NAT",
    "A fixed one-to-one mapping between a private and a public IP address."
   ],
   [
    "Port forwarding",
    "A static rule that sends inbound traffic for a specific public port to a chosen inside host and port."
   ],
   [
    "Inside global",
    "The public address that represents an inside host after translation."
   ],
   [
    "FHRP",
    "First hop redundancy protocol: lets multiple routers share a virtual gateway IP so hosts keep connectivity if one fails."
   ],
   [
    "VRRP",
    "Virtual Router Redundancy Protocol: the open-standard FHRP with master and backup routers."
   ],
   [
    "Subinterface",
    "A logical interface on a physical port, commonly tagged with a VLAN for router-on-a-stick routing."
   ]
  ],
  "example": "An office has two routers configured with VRRP sharing virtual gateway 192.168.1.1, and every PC uses that address as its default gateway. The primary has priority 120 and preemption enabled; the secondary has priority 100. When the primary loses power, the secondary takes over the virtual IP within seconds and users keep browsing, while PAT on both routers translates everyone's traffic to the office's public address. When the primary returns, preemption lets it reclaim the master role automatically.",
  "tip": "PAT = many-to-one using ports. Static NAT = one-to-one, used for servers reachable from outside. HSRP is Cisco-only; VRRP is the open standard. Router on a stick uses subinterfaces with 802.1Q tags.",
  "check": [
   [
    "A company has 300 staff but only 5 public IPs configured as a dynamic NAT pool, and users randomly cannot reach the internet at busy times. Why, and what fixes it?",
    "Dynamic NAT gives each active host a whole public address, so the pool of 5 runs out; configuring PAT (overload) lets all hosts share addresses by using unique ports."
   ],
   [
    "Two routers run HSRP, but after the failed active router comes back the standby keeps forwarding traffic. Why?",
    "Preemption is not enabled, so the recovered router with the higher priority does not reclaim the active role."
   ],
   [
    "Users in VLAN 20 cannot reach other VLANs through a router-on-a-stick design, but VLAN 10 works. Name two likely causes.",
    "The router subinterface for VLAN 20 has the wrong dot1Q VLAN number or IP, or VLAN 20 is not allowed on the switch trunk to the router."
   ],
   [
    "Why do hosts use the virtual IP rather than either router's own address when an FHRP is configured?",
    "The virtual IP moves to whichever router is active, so hosts keep the same gateway during a failover; a physical address would disappear with its router."
   ]
  ]
 },
 {
  "t": "VLANs, VLAN database, SVIs, 802.1Q trunking, native and voice VLANs",
  "body": [
   "A virtual LAN (VLAN) divides one physical switch, or a group of switches, into separate logical Layer 2 networks. Each VLAN is its own broadcast domain and normally its own IP subnet. VLANs let you group users by function rather than location, contain broadcast traffic, and separate traffic for security, for example keeping guest, staff, voice, camera and management traffic apart. Devices in different VLANs cannot talk to each other without a router or Layer 3 switch, which gives you a natural point to apply access control lists between them.",
   "Each VLAN has a numeric ID. VLAN 1 is the default VLAN on most switches; all ports start there, which is why hardening guides recommend moving user ports and management off VLAN 1. On Cisco-style switches, VLANs are stored in the VLAN database (a file called vlan.dat in flash on many models), separate from the running configuration, so erasing the startup configuration does not remove them. Normal-range VLAN IDs are 1 to 1005, and extended-range IDs go up to 4094; IDs 0 and 4095 are reserved. You create and assign VLANs like this:",
   "```\nSW1(config)# vlan 20\nSW1(config-vlan)# name SALES\nSW1(config)# interface g1/0/5\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 20\nSW1(config-if)# switchport voice vlan 30\nSW1(config)# interface g1/0/48\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk native vlan 999\nSW1(config-if)# switchport trunk allowed vlan 20,30,99\n```",
   "A switch port is usually either an access port or a trunk port. An access port belongs to one VLAN and carries untagged frames; end devices such as PCs and printers connect to access ports and never see VLAN tags. A trunk port carries traffic for many VLANs between switches, or between a switch and a router, hypervisor or access point. To keep traffic separate on a trunk, each frame is tagged using IEEE 802.1Q, which inserts a 4-byte tag into the Ethernet header containing the 12-bit VLAN ID and a 3-bit priority value used for QoS. The receiving switch reads the tag, removes it and delivers the frame into the right VLAN. The allowed VLAN list restricts which VLANs a trunk carries, which reduces unnecessary broadcast traffic and limits exposure. Use `show vlan brief` to see VLANs and their access ports, and `show interfaces trunk` to see trunk ports, their native VLAN and allowed VLANs.",
   "The native VLAN is the one VLAN whose frames cross an 802.1Q trunk untagged. By default it is VLAN 1. Both ends of a trunk must agree on the native VLAN; a mismatch causes traffic to leak between the two VLANs and generates warnings in the logs. Because untagged traffic can be abused in double-tagging VLAN hopping attacks, best practice is to set the native VLAN to an unused VLAN that carries no users, and even to tag it. Also disable automatic trunk negotiation on user ports so a device cannot negotiate itself a trunk.",
   "A voice VLAN lets one access port carry two kinds of traffic: an IP phone's tagged voice traffic in the voice VLAN and the untagged data from a PC plugged into the phone's built-in switch port, which lands in the access (data) VLAN. The switch tells the phone which VLAN to use, often via CDP or LLDP-MED. Separating voice this way makes QoS easier, keeps phone addressing separate, and protects call quality. It means one cable to each desk serves both the phone and the computer.",
   "To route between VLANs, a multilayer switch uses a switched virtual interface (SVI): a virtual Layer 3 interface for a VLAN, such as `interface vlan 20` with `ip address 10.0.20.1 255.255.255.0`, which becomes the default gateway for hosts in VLAN 20. SVIs route at hardware speed inside the switch and are the modern alternative to router on a stick. An SVI only comes up if the VLAN exists and at least one port in that VLAN is up. An SVI is also often used simply to give a Layer 2 switch a management IP address. Common mistakes: forgetting to create the VLAN before assigning ports (some switches create it, others leave the port inactive), omitting a VLAN from the trunk's allowed list, native VLAN mismatches, and assuming VLANs alone provide security without ACLs between them.",
   "Exam questions often describe a symptom: users in one VLAN on a second switch cannot reach their colleagues, which points to the trunk allowed list or a missing VLAN; a phone works but the PC behind it does not, which points to the data or voice VLAN setting; a log warns of a native VLAN mismatch. Clue words: 'untagged on the trunk' means native VLAN; 'multiple VLANs on one link' means trunk and 802.1Q; 'gateway for a VLAN on a Layer 3 switch' means SVI; 'phone and PC on one port' means voice VLAN."
  ],
  "terms": [
   [
    "VLAN",
    "A logical Layer 2 network and broadcast domain created on switches, independent of physical location."
   ],
   [
    "Access port",
    "A switch port assigned to a single VLAN that sends and receives untagged frames."
   ],
   [
    "Trunk port",
    "A switch port that carries traffic for multiple VLANs using 802.1Q tags."
   ],
   [
    "802.1Q",
    "The IEEE standard for VLAN tagging that inserts a 4-byte tag with a 12-bit VLAN ID into Ethernet frames on trunks."
   ],
   [
    "Native VLAN",
    "The VLAN whose frames are sent untagged across an 802.1Q trunk."
   ],
   [
    "Voice VLAN",
    "A separate VLAN for IP phone traffic on an access port that also carries a PC's data VLAN."
   ],
   [
    "SVI",
    "Switched virtual interface: a virtual Layer 3 interface for a VLAN on a switch, used for inter-VLAN routing or management."
   ]
  ],
  "example": "An office uses VLAN 10 for staff, VLAN 20 for voice and VLAN 99 for guests, with unused VLAN 999 as the native VLAN. Desk ports are access ports in VLAN 10 with voice VLAN 20 for the phones. After a new floor switch is added, guests on that floor get no addresses; `show interfaces trunk` reveals VLAN 99 is missing from the uplink's allowed list. Once it is added, guests reach the core switch, whose SVIs for VLANs 10, 20 and 99 act as gateways and apply ACLs so guests cannot reach staff systems.",
  "tip": "Access port = one untagged VLAN; trunk = many VLANs with 802.1Q tags. The native VLAN is the untagged one on a trunk and must match on both ends. Hosts in different VLANs need a Layer 3 device to talk.",
  "check": [
   [
    "Users in VLAN 30 can reach each other on switch A but not colleagues in VLAN 30 on switch B. Other VLANs work across the link. What should you check first?",
    "The trunk between the switches: VLAN 30 is probably not in the allowed VLAN list, or VLAN 30 does not exist in switch B's VLAN database."
   ],
   [
    "Why is it best practice to change the native VLAN from VLAN 1 to an unused VLAN?",
    "Untagged native VLAN traffic can be abused in double-tagging VLAN hopping attacks, and VLAN 1 often carries user and control traffic; an unused native VLAN limits the exposure."
   ],
   [
    "An SVI for VLAN 40 is configured with an IP address but shows as down. What is a common reason?",
    "VLAN 40 does not exist on the switch, or no port in VLAN 40 is up; an SVI needs an active VLAN with at least one active port."
   ],
   [
    "A PC plugged into an IP phone gets no network access, but the phone works. Which port setting is likely wrong?",
    "The access (data) VLAN on the switch port; the phone uses the tagged voice VLAN, while the PC's untagged traffic depends on the access VLAN."
   ]
  ]
 },
 {
  "t": "Interface settings: speed, duplex, MTU and jumbo frames, link aggregation",
  "body": [
   "Every switch, router and host network interface has settings that must agree with the device at the other end of the cable. When they do not, the link may come up and appear fine but perform badly, which makes these problems hard to spot and a favourite exam topic. Network+ tests the main settings: speed, duplex, MTU (including jumbo frames) and link aggregation. For each, know what it controls, what a mismatch looks like in interface counters and how to fix it.",
   "Speed is the data rate, such as 100 Mbps, 1 Gbps or 10 Gbps. Duplex describes direction. Half duplex means a device can send or receive but not both at once, as on old hubs, which is why collisions and CSMA/CD (carrier sense multiple access with collision detection) existed. Full duplex means sending and receiving simultaneously, which every modern switch port supports, and collisions cannot happen. By default, ports autonegotiate both values with their neighbour. A speed mismatch usually stops the link coming up at all. A duplex mismatch is sneakier: if one side is hard-coded, for example to 100 Mbps full duplex, and the other is left on auto, the auto side can detect the speed from the signal but receives no negotiation for duplex, so it falls back to half duplex.",
   "The result is a link that works but is slow and gets slower under load. The half-duplex side sees the other end transmitting while it sends, so it logs collisions, especially late collisions; the full-duplex side logs CRC errors and runts because the half-duplex side keeps stopping mid-frame. Best practice is to leave both sides on auto or hard-code both identically. On a switch, `show interfaces` reveals the problem:",
   "```\nSW1# show interfaces g1/0/12\nGigabitEthernet1/0/12 is up, line protocol is up\n  Half-duplex, 100Mb/s, media type is 10/100/1000BaseTX\n  MTU 1500 bytes, BW 100000 Kbit/sec\n     0 input errors, 0 CRC, 0 runts, 0 giants\n     4817 collisions, 912 late collision\n```",
   "The maximum transmission unit (MTU) is the largest payload a frame can carry. Standard Ethernet MTU is 1500 bytes. Jumbo frames raise it, commonly to about 9000 bytes, so large transfers need fewer frames, fewer headers and less CPU; they are typical on storage networks such as iSCSI, on vMotion and backup networks, and in data centres. Every device along the path, including switches, must support the larger MTU, or oversized frames are dropped (often counted as giants) or packets are fragmented. MTU problems also appear with tunnels: VPN, GRE and VXLAN headers add overhead, so a full 1500-byte packet may not fit, causing symptoms such as web pages that partially load or file transfers that stall while small pings succeed. Path MTU discovery uses ICMP messages to find the smallest MTU on a path, which is one reason not to block all ICMP. You can test on Windows with `ping -f -l 1472 10.0.0.1` (1472 bytes of data plus 28 bytes of headers equals 1500) and reduce the size until it succeeds.",
   "Link aggregation bundles several physical links into one logical link for more bandwidth and redundancy. The IEEE standard is 802.3ad (now maintained as 802.1AX), and its negotiation protocol is LACP (Link Aggregation Control Protocol), in which each side is set to active or passive and at least one must be active. Cisco calls the bundle an EtherChannel and also has an older proprietary protocol, PAgP; a static 'on' mode forms a bundle without negotiation, which is riskier because misconfigurations are not detected. Four 1 Gbps links aggregated give up to 4 Gbps of total capacity, and if one link fails the others carry on. A single flow is usually hashed onto one member link, so one file transfer typically will not exceed one link's speed. Member ports must match in speed, duplex, VLAN and trunk settings. Spanning Tree treats the bundle as one link, so none of the members are blocked.",
   "Common mistakes include hard-coding one side only, enabling jumbo frames on servers but not on the switches between them, expecting one flow to use all bundled links, and mixing port settings inside a bundle so members are suspended. On Linux, `ethtool eth0` shows speed, duplex and autonegotiation, and `ip link` shows the MTU; on Windows, adapter properties and `netsh interface ipv4 show subinterfaces` show the MTU.",
   "Exam questions usually give counters or symptoms. 'Late collisions', 'CRC errors on the other side', 'slow but up' mean duplex mismatch. 'Giants', 'storage network', 'large frames dropped' mean MTU or jumbo frame mismatch. 'Increase bandwidth between switches and add redundancy without Spanning Tree blocking' means link aggregation with LACP. 'Small pings work, large transfers fail over a VPN' means MTU."
  ],
  "terms": [
   [
    "Full duplex",
    "A mode in which a link can transmit and receive at the same time without collisions."
   ],
   [
    "Autonegotiation",
    "The process by which two connected ports agree on speed and duplex automatically."
   ],
   [
    "Duplex mismatch",
    "A misconfiguration where one side of a link runs full duplex and the other half duplex, causing errors and poor performance."
   ],
   [
    "MTU",
    "Maximum transmission unit: the largest payload a frame can carry, 1500 bytes on standard Ethernet."
   ],
   [
    "Jumbo frame",
    "An Ethernet frame with an MTU larger than 1500 bytes, commonly around 9000 bytes."
   ],
   [
    "LACP",
    "Link Aggregation Control Protocol: the IEEE protocol that negotiates bundling multiple links into one logical link."
   ],
   [
    "Late collision",
    "A collision detected after the first 64 bytes of a frame, a classic sign of a duplex mismatch."
   ]
  ],
  "example": "A server's file copies crawl even though the link shows as up. The switch port counters show hundreds of late collisions and the port reports half duplex, while the server NIC was hard-coded to 1 Gbps full duplex during a build. Setting both sides back to autonegotiation fixes it immediately. The same team later enables 9000-byte jumbo frames on its iSCSI servers and storage array but forgets the switch in between, so large writes fail with giant counters rising until the switch ports are set to the same MTU.",
  "tip": "Late collisions on one side plus CRC errors on the other point to a duplex mismatch. Jumbo frames must be supported end to end. LACP is the open standard for link aggregation.",
  "check": [
   [
    "Pings with default size succeed over a new site-to-site VPN, but file shares and some web pages hang. What is the likely cause and how can you confirm it?",
    "An MTU problem caused by tunnel overhead; confirm with ping using the don't fragment flag and decreasing sizes to find the largest packet that passes, then lower the MTU or MSS."
   ],
   [
    "Four 1 Gbps links are bundled with LACP between two switches, yet one large backup job never exceeds 1 Gbps. Is the bundle broken?",
    "No. Link aggregation hashes each flow onto one member link, so a single flow is limited to one link's speed; the total bundle capacity is shared across many flows."
   ],
   [
    "The switch side of a link shows late collisions while the server side shows CRC errors. What is the mismatch and which side is half duplex?",
    "A duplex mismatch; the switch side is running half duplex because it sees collisions, and the full-duplex server sees corrupted frames."
   ],
   [
    "Why is LACP preferred over forcing a bundle on with a static mode?",
    "LACP negotiates and checks that both ends agree, so miscabled or misconfigured members are not added; static mode can create loops or black holes when settings do not match."
   ]
  ]
 },
 {
  "t": "Spanning Tree Protocol and loop prevention",
  "body": [
   "Redundant links between switches are good for availability but dangerous at Layer 2. Ethernet frames have no TTL, so a broadcast sent around a loop of switches circulates forever, and because switches flood broadcasts out every port, it multiplies at every switch. Within seconds a broadcast storm consumes all bandwidth and CPU, MAC address tables flap as the same source address appears on different ports, and the network grinds to a halt. Spanning Tree Protocol (STP), originally IEEE 802.1D, prevents this by logically blocking redundant paths while keeping them available as backups that come into use if an active link fails.",
   "STP builds a loop-free tree in three steps. Switches exchange bridge protocol data units (BPDUs) and first elect a root bridge: the switch with the lowest bridge ID wins. The bridge ID is a priority value (default 32768, adjustable in steps of 4096) plus the switch's MAC address, so if priorities are equal the lowest MAC wins, which is often the oldest, slowest switch in the building. That is why you should set the priority on your chosen core switch deliberately rather than let chance decide. Next, every non-root switch picks one root port: its port with the lowest total path cost to the root, where faster links have lower cost (for example 4 for 1 Gbps and 19 for 100 Mbps in the classic cost table). Then each network segment picks one designated port, the port that forwards onto that segment with the best path to the root; every port on the root bridge is designated. All remaining ports go into the blocking state.",
   "Walk through a triangle of three switches: A (priority 4096), B and C (both default). A becomes root because of its lower priority. B and C each choose their direct link to A as their root port. On the B-C link, one side must be designated and the other blocked; the switch with the lower bridge ID (say B, with the lower MAC) gets the designated port, and C's port on that link blocks. Traffic from C to B now travels via A. If the A-C link fails, C stops receiving BPDUs on its root port, unblocks its B-facing port and uses it as the new root port.",
   "In classic STP, ports move through states: blocking (receiving BPDUs only), listening, learning (building the MAC table without forwarding) and forwarding, plus disabled for shut-down ports. Moving from blocking to forwarding takes roughly 30 to 50 seconds with default timers, which was painfully slow. Rapid Spanning Tree Protocol (RSTP, 802.1w) cuts convergence to a second or two; it simplifies states to discarding, learning and forwarding, and adds port roles alternate (a ready backup path to the root) and backup alongside root and designated. Per-VLAN variants run a separate tree per VLAN so different VLANs can use different links, and MSTP (802.1s) maps groups of VLANs to a smaller number of instances.",
   "Several features protect the tree. PortFast (an edge port) lets ports connected to end devices go straight to forwarding, so PCs do not wait and time out on DHCP; it must never be used on ports to other switches. BPDU guard shuts down (err-disables) a PortFast port if a BPDU arrives, stopping someone from plugging in an unauthorized switch or looping a cable. Root guard prevents a port from accepting a superior BPDU that would make a downstream switch the root. Loop guard stops a port from wrongly moving to forwarding if BPDUs stop arriving because of a one-way link fault. Link aggregation helps too, because STP sees an EtherChannel as one link and leaves all its members forwarding.",
   "```\nSW1# show spanning-tree vlan 10\n  Root ID    Priority    4106\n             Address     0011.2233.4455\n             This bridge is the root\nInterface    Role Sts Cost   Type\nGi1/0/1      Desg FWD 4      P2p\nGi1/0/2      Desg FWD 4      P2p\nGi1/0/10     Desg FWD 19     P2p Edge\n```",
   "The output above shows SW1 is root for VLAN 10 (priority 4096 plus VLAN ID 10 gives 4106), all its ports are designated and forwarding, and Gi1/0/10 is an edge (PortFast) port. Signs of a switching loop include a sudden network-wide slowdown, switch CPUs at maximum, link lights blinking furiously on many ports and log messages about MAC addresses flapping between ports. The fix is to break the loop, often by unplugging the offending cable, then find why STP failed: STP disabled, PortFast on an inter-switch link, or a small unmanaged switch that dropped BPDUs. Common mistakes: thinking the root bridge is chosen by the highest priority (lowest wins), thinking blocked ports are disabled (they still listen to BPDUs), and forgetting that an unplanned root in a closet makes traffic take strange paths.",
   "Exam questions typically ask how the root is elected, which port on a diagram will block, what a symptom means, or which feature prevents a problem. Clue words: 'broadcast storm', 'MAC flapping', 'network slowed after a cable was added' mean a loop; 'user plugged in a switch' or 'err-disabled after connecting a device' mean BPDU guard; 'PCs wait 30 seconds for network' means PortFast is missing; 'faster convergence' means RSTP."
  ],
  "terms": [
   [
    "Root bridge",
    "The switch with the lowest bridge ID, which serves as the reference point for the spanning tree."
   ],
   [
    "Bridge ID",
    "A switch's STP identifier: priority value plus MAC address; the lowest wins the root election."
   ],
   [
    "BPDU",
    "Bridge protocol data unit: the frames switches exchange to run STP."
   ],
   [
    "Root port",
    "The single port on each non-root switch with the lowest path cost to the root bridge."
   ],
   [
    "Broadcast storm",
    "Uncontrolled circulation and multiplication of broadcast frames caused by a Layer 2 loop."
   ],
   [
    "BPDU guard",
    "A feature that disables a port if it receives a BPDU, protecting edge ports from rogue switches."
   ],
   [
    "RSTP",
    "Rapid Spanning Tree Protocol (802.1w), which converges much faster than original STP."
   ]
  ],
  "example": "A user plugs both ends of a spare patch cable into two wall jacks in a meeting room to 'tidy up', connecting two switch ports together. Without protection, a broadcast storm would take down the floor within seconds. Because the access ports use PortFast with BPDU guard, the switch sees a BPDU arrive on an edge port and err-disables it, containing the problem to one port. The help desk sees the err-disabled log message, removes the cable and re-enables the port with a shutdown and no shutdown.",
  "tip": "Lowest bridge ID (priority, then MAC) becomes root. Loops cause broadcast storms and MAC flapping. PortFast is for end-device ports only, paired with BPDU guard.",
  "check": [
   [
    "Three switches have the default priority. Why might an old access switch in a closet become the root bridge, and how do you prevent it?",
    "With equal priorities the lowest MAC address wins, and older switches often have lower MACs; set a lower priority (such as 4096) on the intended core switch."
   ],
   [
    "After someone enables PortFast on an uplink between two switches, the network intermittently melts down. Why?",
    "PortFast makes the port forward immediately without STP's loop checks, so a redundant path can forward before STP blocks it, creating a temporary loop."
   ],
   [
    "In a loop-free STP topology, a port is in the blocking state. Is it doing anything at all?",
    "Yes. It still receives BPDUs so it can detect topology changes and move to forwarding if the active path fails; it just does not forward user frames."
   ],
   [
    "A switch reports the same MAC address flapping between two uplink ports and CPU is at 100%. What is happening?",
    "A Layer 2 loop is causing frames to arrive from both directions, which is a broadcast storm; STP has failed or been bypassed somewhere."
   ]
  ]
 },
 {
  "t": "Wireless channels and bands: 2.4, 5 and 6 GHz, channel width, non-overlapping channels, regulatory impacts",
  "body": [
   "Wi-Fi uses unlicensed radio spectrum in three main bands: 2.4 GHz, 5 GHz and, with Wi-Fi 6E and Wi-Fi 7, 6 GHz. Each band is divided into channels, and choosing bands, channels and channel widths well is the biggest single factor in wireless performance. Because Wi-Fi is a shared medium, only one device can transmit on a channel at a time in a given area; every access point and client within hearing range on the same channel has to take turns. Good channel planning is about giving each access point its own clean slice of spectrum.",
   "The 2.4 GHz band has the longest range and best penetration through walls, but it is narrow and crowded. It is shared with Bluetooth, microwave ovens, cordless devices, baby monitors and neighbours' networks. Channels are spaced 5 MHz apart but each is about 20 to 22 MHz wide, so adjacent channels overlap and interfere with each other. In North America channels 1 to 11 are available, and the only three non-overlapping 20 MHz channels are 1, 6 and 11. Access points near each other should use different channels from that set, laid out like a honeycomb so no neighbour shares a channel. Using 40 MHz channels in 2.4 GHz is generally a bad idea because there is room for only one non-overlapping 40 MHz channel.",
   "The 5 GHz band offers many more non-overlapping 20 MHz channels (around two dozen, depending on country), higher throughput and less interference, at the cost of shorter range and weaker wall penetration. Some 5 GHz channels are DFS (dynamic frequency selection) channels, shared with radar systems such as weather and airport radar. An access point using a DFS channel must listen for radar before using it and move off the channel if it detects radar, which can cause brief disconnections. Transmit power control (TPC) is another regulatory feature that limits power. The 6 GHz band adds a large block of clean spectrum with many wide channels and no legacy devices, but has the shortest range of the three and requires newer Wi-Fi 6E or Wi-Fi 7 clients. WPA3 is mandatory on 6 GHz.",
   "Channel width is how much spectrum one channel uses: 20, 40, 80 or 160 MHz (and 320 MHz in Wi-Fi 7 on 6 GHz). Channel bonding combines adjacent channels into a wider one, roughly doubling throughput each time, but it also halves the number of separate channels available for neighbouring access points. Do the arithmetic for 5 GHz: with about 24 channels at 20 MHz you have 24 choices, at 40 MHz about 12, at 80 MHz about 6 and at 160 MHz only 2 or 3. In dense deployments such as offices, stadiums, lecture halls or schools, narrower channels (20 or 40 MHz) usually give better overall performance because they reduce co-channel interference. In a home or a lightly used area, wider channels can make sense.",
   "Two kinds of interference matter. Co-channel interference happens when nearby access points use the same channel; they are not jamming each other, but they must share airtime, so capacity drops. Adjacent-channel interference happens when overlapping channels (such as 1 and 3 in 2.4 GHz) corrupt each other's signals, which is worse because it causes errors and retransmissions. This is why '1, 6, 11' matters: using 3 and 9 creates adjacent-channel interference with everything. Non-Wi-Fi interference, such as a microwave oven, appears on a spectrum analyzer but not on a simple Wi-Fi scanner.",
   "Regulatory impacts are the rules set by each country's regulator, such as the FCC in the United States, that define which channels you may use, at what maximum transmit power and with which features such as DFS. For example, channels 12 and 13 in 2.4 GHz are allowed in many countries but not in North America, and channel 14 is effectively limited to Japan. Access points are configured with a country code so they follow local rules; setting the wrong one can break the law and confuse clients, which may not see channels their own region does not allow. Rules for 6 GHz in particular vary by country and by indoor or outdoor use.",
   "In practice, run a Wi-Fi analyzer, look at which channels nearby networks use and how strong they are, then pick the clearest channels and suitable widths, or let a wireless controller's radio resource management do this automatically. Common mistakes: using channels other than 1, 6 and 11 in 2.4 GHz, setting every radio to maximum power (which increases co-channel interference and creates coverage cells that clients cling to), using 80 or 160 MHz everywhere in a dense office, and assuming 5 or 6 GHz will cover the same area as 2.4 GHz.",
   "Exam questions usually describe a symptom and a configuration. 'Slow in a dense area with wide channels' means reduce channel width. 'Access points on channels 1, 4 and 8' means overlap; change to 1, 6 and 11. 'Clients briefly disconnect near an airport' means DFS. 'Best range and wall penetration' means 2.4 GHz; 'most capacity, newest clients' means 6 GHz. 'Channels allowed in one country but not another' means regulatory impacts and country codes."
  ],
  "terms": [
   [
    "Non-overlapping channels",
    "Channels whose frequencies do not overlap; in 2.4 GHz North America these are 1, 6 and 11."
   ],
   [
    "DFS",
    "Dynamic frequency selection: a requirement on certain 5 GHz channels for access points to detect radar and vacate the channel."
   ],
   [
    "Transmit power control",
    "A regulatory mechanism that limits or adjusts an access point's transmit power on certain channels."
   ],
   [
    "Channel bonding",
    "Combining adjacent channels into a wider channel to increase throughput."
   ],
   [
    "Co-channel interference",
    "Performance loss when nearby access points share the same channel and must take turns transmitting."
   ],
   [
    "Adjacent-channel interference",
    "Signal corruption caused by access points on overlapping, but not identical, channels."
   ],
   [
    "Country code",
    "An access point setting that applies the local regulator's rules for channels and power."
   ]
  ],
  "example": "A clinic's Wi-Fi is slow and drops calls on tablets. A Wi-Fi analyzer shows three access points on 2.4 GHz channels 3, 6 and 9, all overlapping, and 5 GHz radios set to 80 MHz, so neighbouring access points share the same wide channel. The technician moves 2.4 GHz to channels 1, 6 and 11, narrows 5 GHz to 40 MHz so each access point gets its own channel, and lowers transmit power slightly so cells do not overlap too much. Throughput improves and the tablets roam cleanly.",
  "tip": "Remember 1, 6 and 11 for 2.4 GHz. 2.4 GHz = range and penetration; 5 and 6 GHz = speed and capacity with shorter range. Wider channels mean more speed per AP but fewer channels to reuse.",
  "check": [
   [
    "Three neighbouring access points use 2.4 GHz channels 1, 4 and 8. Why is this worse than putting all three on channel 1?",
    "Channels 1, 4 and 8 overlap, causing adjacent-channel interference that corrupts frames; sharing one channel only causes co-channel contention, where devices take turns. The best fix is 1, 6 and 11."
   ],
   [
    "An office with 30 access points set every 5 GHz radio to 160 MHz and performance is poor. What change helps and why?",
    "Reduce channel width to 20 or 40 MHz so there are enough separate channels for neighbouring access points, reducing co-channel interference."
   ],
   [
    "Clients on a 5 GHz access point near an airport lose connection for a few seconds several times a day. What is the likely cause?",
    "The access point is on a DFS channel and detects radar, so regulations force it to move to another channel."
   ],
   [
    "A warehouse needs coverage through thick walls and shelving with few, older scanners. Which band suits it best?",
    "2.4 GHz, because it has the longest range and best penetration, and older devices support it."
   ]
  ]
 },
 {
  "t": "802.11 standards, SSID/BSSID/ESSID, autonomous vs controller-based APs, mesh networks",
  "body": [
   "IEEE 802.11 is the family of wireless LAN standards, marketed by the Wi-Fi Alliance under generation names such as Wi-Fi 5 and Wi-Fi 6. Knowing the band and approximate theoretical maximum speed of each helps you pick equipment, understand compatibility and read exam scenarios. Real-world throughput is always well below these theoretical figures, typically half or less, because Wi-Fi is shared, half-duplex on each channel and full of management overhead.",
   "The main standards: 802.11a uses 5 GHz at up to 54 Mbps. 802.11b uses 2.4 GHz at up to 11 Mbps. 802.11g uses 2.4 GHz at up to 54 Mbps and is backward compatible with b. 802.11n (Wi-Fi 4) uses 2.4 and 5 GHz, introduced MIMO (multiple-input multiple-output, using several antennas and spatial streams) and 40 MHz channels, and reaches up to 600 Mbps. 802.11ac (Wi-Fi 5) uses 5 GHz only, adds 80 and 160 MHz channels and downlink MU-MIMO (multi-user MIMO), and reaches several gigabits per second in theory. 802.11ax (Wi-Fi 6) uses 2.4 and 5 GHz and adds OFDMA, which splits a channel into smaller resource units so many clients can be served at once, plus uplink MU-MIMO and target wake time for battery savings; it is designed for efficiency in crowded spaces. Wi-Fi 6E is 802.11ax extended into 6 GHz. 802.11be (Wi-Fi 7) builds on this with wider channels and multi-link operation.",
   "Compatibility matters. Newer access points generally support older clients in the same band, but mixed networks slow down when old clients are present, because slow devices use more airtime to send the same data. Many organizations disable the oldest data rates (for example 802.11b rates) to keep cells efficient. A client can only use the features both it and the access point support, so an 802.11n laptop on a Wi-Fi 6 access point still behaves like 802.11n.",
   "Names matter too. The SSID (service set identifier) is the human-readable network name, such as 'CorpWiFi', up to 32 characters. A BSS (basic service set) is one access point radio and its clients, and the BSSID is the unique identifier of that radio, normally derived from its MAC address. An ESS (extended service set) is several access points advertising the same SSID on the same network so clients can roam between them; that shared network name is sometimes called the ESSID. One access point can broadcast several SSIDs, each with its own BSSID, commonly mapped to different VLANs such as staff, guest and IoT. Hiding the SSID (disabling it in beacons) is not real security, because the name still appears in probe and association frames. An ad hoc or IBSS (independent BSS) network connects clients directly without an access point.",
   "Roaming works like this: a client hears beacons from several BSSIDs of the same ESS, notices the signal from its current access point weakening, and reassociates to a stronger one. The client decides when to roam, not the access point, which is why 'sticky clients' cling to a distant access point. Enterprise networks speed roaming with standards such as 802.11r (fast transition), 802.11k (neighbour reports) and 802.11v (network-assisted roaming).",
   "Access points can be deployed in two ways. Autonomous (fat or standalone) access points are configured and managed individually, each holding its full configuration; this works for a few access points but does not scale. Lightweight (thin) access points are controlled by a wireless LAN controller, on premises or in the cloud, which pushes configuration, manages channel and power planning automatically, handles authentication and coordinates fast roaming. Lightweight access points exchange control messages with the controller, and sometimes tunnel client traffic to it, using a protocol such as CAPWAP. Controller-based and cloud-managed designs are the norm in enterprises.",
   "A wireless mesh network links access points to each other wirelessly, so only some need a wired connection (root or gateway nodes) while others (mesh points) relay traffic over the air. Mesh is useful where running cable is impractical, such as warehouses, outdoor areas, historic buildings and homes. Each wireless hop uses airtime, so throughput drops and latency rises with every extra hop, and placement and backhaul planning are important; tri-band mesh systems dedicate one radio to backhaul. Common mistakes: saying 802.11ac supports 2.4 GHz (it does not), treating the SSID and BSSID as the same thing, believing a hidden SSID is secure, and expecting a five-hop mesh to perform like wired access points.",
   "Exam clue words: 'network name' means SSID; 'MAC address of the AP radio' means BSSID; 'several access points with one name for roaming' means ESS. 'Configure each AP individually' means autonomous; 'central management of hundreds of APs' means controller-based. 'No cable to some access points' means mesh. 'OFDMA', 'dense environments' mean 802.11ax; '5 GHz only' means 802.11a or 802.11ac."
  ],
  "terms": [
   [
    "SSID",
    "Service set identifier: the name of a wireless network."
   ],
   [
    "BSSID",
    "The unique identifier, usually the MAC address, of a specific access point radio in a basic service set."
   ],
   [
    "ESS",
    "Extended service set: multiple access points sharing one SSID to provide a larger network with roaming."
   ],
   [
    "MIMO",
    "Multiple-input multiple-output: using several antennas and spatial streams to increase throughput, introduced in 802.11n."
   ],
   [
    "OFDMA",
    "Orthogonal frequency-division multiple access: an 802.11ax feature that lets an AP serve multiple clients simultaneously within one channel."
   ],
   [
    "Wireless LAN controller",
    "A device or cloud service that centrally configures and manages lightweight access points."
   ],
   [
    "Mesh network",
    "A wireless design where access points relay traffic to each other over the air, so only some need a wired uplink."
   ]
  ],
  "example": "A university has 400 lightweight access points broadcasting the same SSID, forming one ESS managed by a controller that sets channels and power automatically. When a student walks between buildings, the laptop roams from one BSSID to another without re-entering credentials. Each access point also broadcasts a guest SSID mapped to an internet-only VLAN. Outdoor quad areas, where trenching cable would be expensive, are covered by mesh access points that relay traffic wirelessly to a wired root node on the library roof.",
  "tip": "802.11ac is 5 GHz only; 802.11n and 802.11ax work in both 2.4 and 5 GHz; 6E adds 6 GHz. SSID = name, BSSID = one radio's MAC, ESS = many APs with one SSID.",
  "check": [
   [
    "A laptop supports only 802.11ac and cannot see a network that exists only on 2.4 GHz. Why?",
    "802.11ac is a 5 GHz-only standard; the laptop's 2.4 GHz support would come from older standards such as 802.11n, which it may lack or which may be disabled."
   ],
   [
    "A wireless scan shows the same SSID with 12 different BSSIDs. What does this tell you?",
    "It is an extended service set: several access point radios (each with its own BSSID) advertise one network name so clients can roam."
   ],
   [
    "A small shop with two access points asks whether it needs a wireless controller. What would you advise and why?",
    "Autonomous or cloud-managed access points are usually enough for two devices; a controller's central management pays off at larger scale."
   ],
   [
    "Users at the far end of a four-hop mesh report slow speeds, while users near the root node are fine. Why?",
    "Each wireless mesh hop consumes airtime and adds latency, so throughput drops with every hop; adding a wired uplink closer to those users helps."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2/WPA3 Personal and Enterprise, PSK vs 802.1X, captive portals; antenna types",
  "body": [
   "Radio signals do not stop at the walls, so anyone nearby can capture Wi-Fi traffic with a laptop and free software. Wireless security therefore rests on two things: authenticating who can join and encrypting what they send. Older WEP and original WPA (with TKIP) are broken and must not be used; if a device only supports them, it should be replaced or isolated. Network+ expects you to choose between WPA2 and WPA3, between Personal and Enterprise modes, and to know where captive portals and antennas fit.",
   "WPA2 (Wi-Fi Protected Access 2) uses AES encryption with CCMP and has been the baseline for many years. WPA3 is the current standard. In Personal mode it replaces WPA2's pre-shared key four-way handshake with SAE (Simultaneous Authentication of Equals), which resists offline password-guessing attacks and provides forward secrecy, so capturing traffic today and learning the password later does not let an attacker decrypt it. WPA3 also requires Protected Management Frames (PMF), which defends against forged deauthentication frames. WPA3-Enterprise offers an optional 192-bit security mode for high-security environments. Many networks run a WPA2/WPA3 transition mode so older clients can still connect, at the cost of some of WPA3's protection.",
   "Each version has two modes. Personal mode uses a pre-shared key (PSK): everyone knows the same passphrase. It is simple and right for homes and small offices, but you cannot tell users apart in logs, and when someone leaves you must change the key on every device. The strength of WPA2-Personal depends heavily on passphrase length and randomness, because an attacker who captures a handshake can guess passwords offline at high speed. Enterprise mode uses 802.1X with a RADIUS server: each user or device authenticates with its own credentials or certificate through an EAP (Extensible Authentication Protocol) method, such as PEAP (username and password inside a TLS tunnel) or EAP-TLS (certificates on both client and server, the strongest option). Enterprise mode gives individual accountability, per-user revocation and unique per-session keys, and the RADIUS server can assign a VLAN dynamically based on who logged in.",
   "Here is an 802.1X login step by step. The client (the supplicant) associates with the access point (the authenticator), which allows only EAP traffic at first. The access point relays EAP messages to the RADIUS server (the authentication server), usually on UDP 1812. The server proves its identity with a certificate, the client proves its identity with a password or certificate, and if both succeed the server sends Access-Accept, optionally with a VLAN assignment. The client and access point then derive encryption keys and normal traffic flows. A common misconfiguration is clients not validating the server certificate, which lets an evil twin access point harvest credentials.",
   "A captive portal is a web page that intercepts new users on an open or guest network and requires them to accept terms, log in, enter a voucher code or pay before the firewall grants access. It is common in hotels, airports and cafes. A captive portal alone does not encrypt the wireless traffic, so guest networks should also isolate clients from each other and from internal networks, and OWE (Opportunistic Wireless Encryption, marketed as Wi-Fi Enhanced Open) can encrypt open networks without a password. Do not confuse a portal login with WPA security: they solve different problems.",
   "Antennas shape where signal goes, which affects both coverage and security. Omnidirectional antennas radiate in all horizontal directions, like a doughnut, and are the default for ceiling-mounted access points covering a room. Directional antennas focus energy one way for longer range: a Yagi antenna gives a focused beam for point-to-point links between buildings, a patch or panel antenna covers a sector such as a long hallway or one side of a building, and a parabolic dish gives very long, narrow links. Higher gain, measured in dBi, means a more focused pattern, not more total power. Placing and aiming antennas to cover the inside of a building, rather than the car park, reduces signal leakage, and lower transmit power can help too.",
   "Common mistakes: choosing Personal mode when a scenario says users must be individually tracked or revoked; thinking MAC filtering or a hidden SSID is strong security (MAC addresses can be spoofed and hidden names are still visible); forgetting that transition mode weakens WPA3; and assuming a captive portal encrypts traffic. Another is picking an omnidirectional antenna for a building-to-building link, which wastes signal in every direction.",
   "Exam questions use clear clue words. 'Individual credentials', 'RADIUS', 'revoke one user', 'certificates' mean Enterprise mode with 802.1X; 'one shared password', 'small office' mean Personal (PSK). 'Resists offline dictionary attacks' or 'forward secrecy' means WPA3 SAE. 'Accept terms before browsing' means captive portal. 'Point-to-point between buildings' means a directional antenna such as Yagi or parabolic; 'cover a whole room from the ceiling' means omnidirectional."
  ],
  "terms": [
   [
    "SAE",
    "Simultaneous Authentication of Equals: the WPA3-Personal handshake that resists offline dictionary attacks."
   ],
   [
    "PSK",
    "Pre-shared key: a single passphrase shared by all users of a WPA2/WPA3 Personal network."
   ],
   [
    "802.1X",
    "Port-based network access control that authenticates each user or device through EAP and a RADIUS server before granting access."
   ],
   [
    "Supplicant",
    "The client device or software requesting access in 802.1X authentication."
   ],
   [
    "EAP-TLS",
    "An 802.1X authentication method using certificates on both client and server; considered the strongest EAP method."
   ],
   [
    "Captive portal",
    "A web page that must be completed before a user on a network is granted wider access."
   ],
   [
    "Yagi antenna",
    "A directional antenna producing a focused beam, often used for point-to-point links."
   ]
  ],
  "example": "A company uses WPA3-Enterprise with EAP-TLS for staff laptops, so each device authenticates with its own certificate, the RADIUS server places engineers and finance staff in different VLANs, and a lost laptop is revoked individually without touching anyone else. Visitors join a separate guest SSID with a captive portal where they accept terms, and they are placed on an internet-only VLAN with client isolation. A pair of Yagi antennas links the warehouse across the car park, aimed at each other so little signal spills into the street.",
  "tip": "Personal = PSK, Enterprise = 802.1X with RADIUS. WPA3-Personal uses SAE. If a scenario says users must authenticate individually or be revoked individually, choose Enterprise mode.",
  "check": [
   [
    "A staff member who knew the office Wi-Fi password leaves on bad terms. Under WPA2-Personal, what must happen, and what design avoids this problem?",
    "The passphrase must be changed on the access points and every device; WPA2/WPA3-Enterprise with 802.1X avoids this by giving each user their own credentials that can be revoked individually."
   ],
   [
    "Why is an attacker who captures a WPA2-Personal handshake a threat, and how does WPA3-Personal change that?",
    "The attacker can guess passphrases offline against the captured handshake; WPA3's SAE handshake prevents offline guessing and adds forward secrecy."
   ],
   [
    "A hotel guest network uses a captive portal with no WPA encryption. Is guest traffic protected from eavesdropping?",
    "No. The portal only controls access; without WPA or OWE encryption, the wireless traffic itself is unencrypted."
   ],
   [
    "Staff complain that Wi-Fi from the office can be picked up across the street. Which antenna change could help?",
    "Replace or re-aim antennas with directional or lower-gain patterns that focus coverage inside the building, and reduce transmit power."
   ]
  ]
 },
 {
  "t": "Physical installation: IDF/MDF, rack sizes, port-side exhaust/intake, cable management, patch panels",
  "body": [
   "A network is only as reliable as its physical installation. Good planning of equipment rooms, racks, airflow and cabling makes a network easier to troubleshoot, expand and keep cool, while poor installation causes overheating, intermittent faults and hours wasted tracing unlabelled cables. Network+ expects you to know the vocabulary of structured cabling, rack sizing and airflow, and to recognise good and bad practices from a description or a photo-style scenario.",
   "Buildings typically have a hierarchy of equipment rooms. The main distribution frame (MDF) is the central point, often near where carrier circuits enter the building at the demarcation point (demarc), where the provider's responsibility ends and yours begins. The MDF usually holds core switches, routers, firewalls, carrier equipment and sometimes servers. Intermediate distribution frames (IDFs) are smaller wiring closets on each floor or in each wing; they hold access switches and connect back to the MDF over backbone (vertical) cabling, usually fibre because of distance and electrical isolation. Horizontal cabling runs from the IDF to wall jacks in work areas and is normally copper limited to 90 metres of permanent cable, leaving 10 metres for patch cords to stay within the 100-metre channel limit. That distance is why large floors need more than one IDF.",
   "Equipment mounts in standard 19-inch-wide racks. Height is measured in rack units (U), where 1U is 1.75 inches (44.45 mm); a full-height rack is commonly 42U (about 73.5 inches of mounting space), and a typical switch is 1U or 2U. Two-post racks are open frames suited to lightweight network gear such as switches and patch panels; four-post racks and enclosed cabinets support deep, heavy servers and can be locked for security. Wall-mounted racks serve small closets. When planning, allow space for growth, cable managers, patch panels and power distribution units, and put heavy items such as UPS units and large servers at the bottom for stability. Mount equipment with the correct rails, not by balancing it on other devices.",
   "Airflow is a common exam topic. Data centres arrange racks in hot aisle/cold aisle layouts: equipment fronts face each other across a cold aisle where chilled air is supplied, and backs face each other across a hot aisle where exhaust is collected and returned to the cooling units. Every device in a rack must breathe the same way. Switches often come with a choice of fans: port-side intake (air enters at the port side) or port-side exhaust (air leaves at the port side). Top-of-rack switches are frequently mounted with their ports facing the rear, where the server network cards are, so you must choose the fan direction that still pulls from the cold aisle and exhausts into the hot aisle. Mixing directions recirculates hot air and causes overheating. Blanking panels in empty rack spaces stop hot exhaust from looping back to the front.",
   "Work through the decision: first ask which aisle the ports face. If the ports face the hot aisle (rear of the rack), the switch must exhaust out of its port side, so order port-side exhaust. If the ports face the cold aisle (front of the rack), the switch must draw in at its port side, so order port-side intake. Many switches let you swap fan and power supply modules, often colour-coded by airflow direction, and all modules in one chassis must match.",
   "Structured cabling keeps things organized. Horizontal cables terminate on a patch panel in the IDF, punched down on the back (typically with a 110 punch-down tool) and presented as numbered RJ45 ports on the front. Short patch cables then connect patch panel ports to switch ports. The permanent cabling is never touched; moves, adds and changes are done by moving a patch cord. Fibre uses fibre distribution panels in the same way. Good cable management uses horizontal and vertical managers, correct-length patch cords, hook-and-loop straps instead of tight zip ties (which can crush cable and damage performance), respect for minimum bend radius (especially for fibre), colour coding by function and clear labelling at both ends of every cable, matched to documentation. Keep data cables away from power cables, motors and fluorescent lighting to limit interference.",
   "Common mistakes include mixing airflow directions in one rack, leaving rack gaps without blanking panels, overloading the top of a rack, running horizontal cable beyond 90 m, pulling zip ties tight, and patching directly from wall cables into switches without a patch panel. Another is ignoring the demarc: problems on the provider's side of it are the provider's to fix, so knowing where it is saves time during outages. Good physical work pays back during troubleshooting, because a labelled patch panel plus an up-to-date cable map turns 'which port is this?' into a quick look-up.",
   "Exam questions typically ask you to calculate rack space, choose fan direction, identify MDF versus IDF, or pick the best practice. Clue words: 'central room where the carrier enters' means MDF; 'wiring closet on each floor' means IDF; 'where the provider's responsibility ends' means demarc; 'ports face the hot aisle' means port-side exhaust; 'terminate permanent runs' means patch panel; '1.75 inches' means 1U."
  ],
  "terms": [
   [
    "MDF",
    "Main distribution frame: the central wiring and equipment room connecting to carriers and to each IDF."
   ],
   [
    "IDF",
    "Intermediate distribution frame: a secondary wiring closet serving a floor or area, linked to the MDF by backbone cabling."
   ],
   [
    "Demarc",
    "The demarcation point where the service provider's network ends and the customer's begins."
   ],
   [
    "Rack unit (U)",
    "The standard unit of vertical rack space, 1.75 inches (44.45 mm)."
   ],
   [
    "Hot aisle/cold aisle",
    "A data centre layout where rack fronts face a cooled aisle and rack backs face an exhaust aisle."
   ],
   [
    "Port-side exhaust",
    "A switch airflow option where air enters opposite the ports and leaves through the port side."
   ],
   [
    "Patch panel",
    "A panel where permanent cable runs terminate, providing ports that are connected to equipment with patch cords."
   ]
  ],
  "example": "In a new data centre row, a technician mounts top-of-rack switches with their ports facing the rear to match the server network cards. Because the rear of each rack faces the hot aisle, she orders the switches with port-side exhaust fans, so they draw cold air from the front and blow hot air out of the port side into the hot aisle along with the servers. She fills the empty rack spaces with blanking panels, runs patch cords through vertical managers with hook-and-loop straps, and labels both ends of every cable to match the port map in the documentation system.",
  "tip": "Fan direction must match the rack's airflow: if the ports face the hot aisle, choose port-side exhaust; if the ports face the cold aisle, choose port-side intake. 1U = 1.75 inches. MDF is central, IDFs are per floor.",
  "check": [
   [
    "A switch is mounted with its ports facing the cold aisle, but it was ordered with port-side exhaust fans. What happens and what should be done?",
    "It blows hot air into the cold aisle and draws in hot air from the hot aisle, raising temperatures for everything nearby; replace the fans with port-side intake modules or remount the switch."
   ],
   [
    "A new office floor has desks 120 m of cable path from the only wiring closet. What is the problem and a typical fix?",
    "The run exceeds the 90 m horizontal and 100 m channel limit for copper; add an IDF closer to the desks connected to the MDF by fibre."
   ],
   [
    "You need to mount a 2U firewall, two 1U switches, a 1U patch panel and a 3U UPS, leaving 50% spare space. How many U should the rack provide at minimum?",
    "The equipment uses 8U, so with 50% spare you need at least 12U, with the UPS mounted at the bottom."
   ],
   [
    "Why are hook-and-loop straps preferred over tightly pulled zip ties for patch cable bundles?",
    "Tight zip ties can crush and deform twisted pairs or exceed fibre bend limits, causing errors; hook-and-loop straps hold cables without damage and are easy to reopen."
   ]
  ]
 },
 {
  "t": "Power and environment: UPS, PDU, PoE/PoE+ budgets, temperature, humidity, fire suppression",
  "body": [
   "Network equipment needs clean, continuous power and a controlled environment. Power problems and heat are among the most common causes of outages and shortened equipment life, and they often cause confusing intermittent faults rather than clean failures. Network+ expects you to plan for both: choose the right power protection, calculate Power over Ethernet budgets, and know the environmental limits and fire suppression options for equipment rooms.",
   "An uninterruptible power supply (UPS) provides battery power when mains power fails, long enough to ride through short outages, shut systems down gracefully, or bridge the gap until a generator starts. UPS units also condition power, protecting against sags (brownouts), surges, spikes and electrical noise. There are three designs. A standby (offline) UPS switches to battery when power fails, with a brief transfer time. A line-interactive UPS also regulates voltage continuously, correcting sags without using the battery. An online (double-conversion) UPS always runs equipment from its inverter, giving the cleanest power with no transfer time, which is why data centres use it. UPS capacity is rated in volt-amperes (VA) and watts, and runtime shrinks as the load grows, so size a UPS for the actual load plus growth, and test the batteries regularly because they wear out.",
   "Generators cover long outages but take seconds to minutes to start and stabilize, which the UPS bridges. Dual power supplies in devices, each fed from a separate circuit and ideally a separate UPS, remove another single point of failure. A power distribution unit (PDU) is essentially an industrial power strip for racks. Basic PDUs simply distribute power; metered PDUs display current draw so you do not overload a circuit; switched or managed PDUs let you monitor and power-cycle individual outlets remotely, which is handy for rebooting a hung device at a remote site without sending someone. Give each device's two power supplies separate PDUs on separate circuits, labelled A and B.",
   "Power over Ethernet (PoE) delivers DC power over the same twisted-pair cable as data, so IP phones, access points and cameras need no local power outlet, and they can be protected centrally by the switch's UPS. The switch is the power sourcing equipment (PSE) and the device is the powered device (PD). Standards: IEEE 802.3af (PoE) supplies up to 15.4 W per port at the switch; 802.3at (PoE+) up to 30 W; 802.3bt (sometimes called PoE++) Type 3 up to 60 W and Type 4 up to 90 W. Some power is lost in the cable, so the device receives slightly less (about 12.95 W for 802.3af and 25.5 W for PoE+). A device that needs PoE+ connected to an 802.3af-only port may not start or may run with reduced features, such as an access point disabling a radio.",
   "Every PoE switch also has a total power budget, and this is where exam questions focus. Work through an example: a 24-port PoE+ switch has a 370 W budget. Each port can supply up to 30 W, but 24 x 30 W is 720 W, far above the budget. If you connect access points that each draw 25 W, the budget covers 370 / 25 = 14.8, so only 14 access points can be powered; the rest stay dark, or low-priority ports lose power. Plan the budget, use per-port priority for critical devices, and check usage with `show power inline`, which lists the available, used and remaining watts and each port's draw.",
   "Environmental monitoring keeps equipment healthy. Temperature should be kept within the equipment's recommended range for inlet air, commonly around the low to mid 20s Celsius; heat shortens equipment life, causes throttling and triggers thermal shutdowns. Humidity matters in both directions: too high causes condensation and corrosion, too low increases electrostatic discharge (ESD) risk. Sensors for temperature, humidity, water leaks and even door openings should send alerts via SNMP or the building management system, so you hear about a failed air conditioner before the switches shut down.",
   "Fire suppression in equipment rooms must put out fires without destroying electronics or endangering people. Water sprinklers are common and often required by code; a wet pipe system keeps water in the pipes at all times, while a pre-action (dry pipe) system keeps pipes empty until a detector trips, reducing accidental water damage from a knocked sprinkler head. Clean-agent gaseous systems extinguish fire without water or residue and are preferred for data centres, but they require alarms and procedures so people can evacuate safely before discharge. Portable extinguishers for electrical fires should be rated for that use. Common mistakes: sizing a UPS for the rated maximum of every device rather than real draw (or the reverse, forgetting growth), assuming every PoE+ port can deliver 30 W at once, and treating low humidity as harmless.",
   "Exam clue words: 'ride through outage', 'graceful shutdown', 'condition power' mean UPS; 'no transfer time', 'cleanest power' mean online double-conversion; 'remotely power-cycle an outlet' means managed PDU; 'some access points will not power on' or 'devices reboot when more are added' mean PoE budget exceeded; '30 W' means PoE+ (802.3at); 'static discharge' means humidity too low; 'protect electronics from water' means clean agent or pre-action."
  ],
  "terms": [
   [
    "UPS",
    "Uninterruptible power supply: a battery-backed device that keeps equipment running during power loss and conditions power."
   ],
   [
    "Online UPS",
    "A double-conversion UPS that always powers equipment from its inverter, giving clean power and no transfer time."
   ],
   [
    "PDU",
    "Power distribution unit: a rack-mounted device that distributes, and may meter or switch, power to equipment."
   ],
   [
    "PoE+",
    "IEEE 802.3at, providing up to 30 W per port from the switch."
   ],
   [
    "PoE budget",
    "The total wattage a PoE switch can supply across all its ports."
   ],
   [
    "Electrostatic discharge",
    "A sudden flow of static electricity that can damage components, made more likely by low humidity."
   ],
   [
    "Clean agent",
    "A gaseous fire suppressant that leaves no residue and is safe for electronic equipment."
   ]
  ],
  "example": "A school adds 20 new Wi-Fi 6 access points that each draw about 25 W to a 24-port PoE+ switch with a 370 W budget. The first 14 power up and the rest stay dark, even though every port supports PoE+. `show power inline` shows only a few watts remaining, so the team moves half the access points to a second PoE switch, sets the first ports as high priority for the phones in the office, and confirms both switches are now within budget. They also connect both switches' dual power supplies to separate A and B PDUs fed by the building UPS.",
  "tip": "802.3af = 15.4 W, 802.3at (PoE+) = 30 W, 802.3bt = 60 W (Type 3) or 90 W (Type 4). Every port supporting PoE+ does not mean the switch can power them all at full wattage; check the total budget.",
  "check": [
   [
    "A PoE switch has a 740 W budget and 48 ports. Cameras draw 12 W each and access points 28 W each. Can it power 30 cameras and 12 access points?",
    "Yes, but only just: 30 x 12 = 360 W plus 12 x 28 = 336 W totals 696 W, which is under 740 W, leaving only 44 W of headroom."
   ],
   [
    "An access point that needs PoE+ is connected to an 802.3af switch port. What is likely to happen?",
    "It may not power on, or it may start in a reduced-power mode that disables features such as a radio, because 802.3af supplies only 15.4 W."
   ],
   [
    "Why would a data centre choose an online double-conversion UPS instead of a standby UPS?",
    "It continuously powers equipment from the inverter, providing the cleanest power with no transfer time when mains fails."
   ],
   [
    "A server room's humidity sensor reads 15% relative humidity. Is this a problem even if the temperature is fine?",
    "Yes. Very low humidity increases electrostatic discharge, which can damage components during handling or operation."
   ]
  ]
 },
 {
  "t": "Documentation: physical vs logical diagrams, rack diagrams, cable maps, IPAM, asset inventory, SLAs, wireless surveys",
  "body": [
   "Documentation turns a network from something only one person understands into something a team can operate. Good documentation speeds troubleshooting, supports audits, change planning and security, and makes onboarding easier. It only helps if it is accurate, so updating documentation should be a required step in every change, not an afterthought. Network+ expects you to know which document answers which question, because many scenario questions ask 'which document should the technician consult?'.",
   "Network diagrams come in two main forms. A physical diagram shows real devices and how they are cabled: which switch port connects to which router, the cable and media types, the rooms, floors and racks. It answers 'where is it and how is it plugged in?'. A logical diagram shows how traffic flows: subnets, VLANs, IP addressing, routing domains, VPN tunnels, firewalls and security zones, regardless of physical placement. It answers 'how does data move and what can talk to what?'. You usually need both. Diagrams are often organized by OSI layer: a Layer 1 diagram shows cabling and media, a Layer 2 diagram shows switches, VLANs, trunks and Spanning Tree roles, and a Layer 3 diagram shows subnets, routers and routing protocols.",
   "A rack diagram (rack elevation) shows the front and often rear of each rack, with every device drawn at its rack-unit position, plus patch panels, cable managers and PDUs. It helps technicians find equipment, plan space, power and airflow, and send remote hands to the right device. A cable map or cable schedule records each cable run: its label, both endpoints (for example patch panel 3A port 14 to wall jack 3-114), type, length and test results. Combined with labels on both ends of every cable, it saves hours of tracing with a toner.",
   "IP address management (IPAM) is the practice and tooling for tracking IP address space: which subnets exist, which addresses are assigned, reserved or free, and which DHCP scopes and DNS records go with them. Modern IPAM tools integrate with DHCP and DNS servers so records stay in sync, prevent duplicate addresses and help plan new subnets; they are far better than a forgotten spreadsheet. An asset inventory lists hardware and software: make, model, serial number, location, owner, purchase date, warranty and support dates, firmware version and licence details. It supports life-cycle planning, budgeting, security (you cannot protect what you do not know you have) and audits.",
   "Agreements are documentation too. A service-level agreement (SLA) is a contract with a provider, or between IT and the business, that defines measurable service levels such as uptime percentage, response and resolution times, and penalties or credits when targets are missed. Work out what uptime numbers mean: a year has about 8,760 hours, so 99.9 percent uptime allows about 8.8 hours of downtime per year, 99.99 percent about 53 minutes, and 99.999 percent ('five nines') about 5 minutes. Related documents include memoranda of understanding (MOU), which are less formal statements of intent, non-disclosure agreements (NDA), and standard operating procedures (SOPs) that tell staff how to perform routine tasks consistently.",
   "A wireless survey (site survey) measures radio coverage and interference. A predictive survey uses floor plans, wall materials and software to model coverage before installation. An on-site survey walks the space with an analyzer to measure signal strength, noise, signal-to-noise ratio and channel use. A passive survey listens to what is already there; an active survey connects and measures throughput and roaming. The result is usually shown as a heat map over the floor plan. Surveys are done before deployment to place access points and after changes, renovations or complaints to validate coverage.",
   "Common mistakes include confusing physical and logical diagrams (a diagram with VLAN IDs and subnets is logical, even if it shows switches), letting documentation go stale after changes, keeping it only on a system that will be unavailable during an outage, and treating an SLA percentage as vague rather than a specific downtime allowance. Documentation also needs access control, because diagrams, IP plans and configurations are valuable to attackers.",
   "Exam clue words: 'which port is this wall jack patched to' means cable map; 'where in the rack' means rack diagram; 'subnets and VLANs' means logical diagram; 'cable runs and devices in rooms' means physical diagram; 'duplicate IPs across many subnets' means IPAM; 'serial numbers, warranty dates' means asset inventory; 'uptime commitment', 'response time' means SLA; 'heat map', 'dead zones', 'before installing access points' means wireless survey."
  ],
  "terms": [
   [
    "Physical diagram",
    "A diagram showing actual devices, their locations and how they are cabled together."
   ],
   [
    "Logical diagram",
    "A diagram showing how data flows: subnets, VLANs, addressing and routing, independent of physical layout."
   ],
   [
    "Rack diagram",
    "An elevation drawing showing each device's position in a rack by rack unit."
   ],
   [
    "Cable map",
    "A record of each cable run with its label, endpoints, type and length."
   ],
   [
    "IPAM",
    "IP address management: tools and processes for planning, tracking and managing IP address space, DHCP and DNS."
   ],
   [
    "SLA",
    "Service-level agreement: a documented commitment to measurable service levels such as uptime and response time."
   ],
   [
    "Heat map",
    "A colour-coded wireless survey output showing signal strength across a floor plan."
   ]
  ],
  "example": "A help desk ticket says room 3-114 has no network. The technician checks the cable map, finds the wall jack is patch panel 3A port 14, looks at the rack diagram to find panel 3A in IDF-3 at rack unit 38, and sees in IPAM that the room belongs to VLAN 30 on subnet 10.3.30.0/24. At the rack she finds the patch cord was moved during an earlier change that was never documented, fixes it in minutes, and updates the cable map. Her ticket notes also suggest adding 'update documentation' to the change checklist.",
  "tip": "Physical diagram = cables, ports and locations; logical diagram = subnets, VLANs and traffic flow. If a question asks which document shows device positions in a rack, it is a rack diagram. SLAs define measurable uptime and response commitments.",
  "check": [
   [
    "A provider's SLA promises 99.9% monthly uptime, and the service was down for 2 hours in a 30-day month. Was the SLA met?",
    "No. 30 days is 720 hours, and 99.9% allows only about 0.72 hours (43 minutes) of downtime, so 2 hours breaches it."
   ],
   [
    "A new engineer needs to understand which VLANs can reach the finance servers through the firewall. Which document helps most?",
    "A logical diagram showing VLANs, subnets, routing and security zones."
   ],
   [
    "Two hosts in different buildings keep getting the same static IP by mistake. Which tool and practice prevent this?",
    "IPAM, which tracks assigned, reserved and free addresses across subnets and integrates with DHCP and DNS."
   ],
   [
    "Before installing access points in a new building, what kind of survey can you do, and what should follow after installation?",
    "A predictive survey using floor plans and software; after installation, an on-site survey to validate real coverage and interference."
   ]
  ]
 },
 {
  "t": "Life-cycle management: end of life/support, software and firmware management, decommissioning",
  "body": [
   "Every network device has a life cycle: planning and procurement, deployment, operation and maintenance, and finally retirement. Managing it deliberately keeps the network secure and supported, spreads costs predictably across budgets, and avoids nasty surprises when an old device fails and no replacement, patch or support is available. Life-cycle management connects closely to the asset inventory, change management and security, and Network+ tests it mainly through scenarios about unsupported devices, upgrades and disposal.",
   "Vendors publish milestones for their products. End of sale is when the product can no longer be bought. End of life (EOL) usually marks the start of the phase-out, and end of support (sometimes end of service life) is when the vendor stops providing bug fixes, security patches, technical support and often replacement parts. The exact terms and timelines vary by vendor, so read each announcement carefully. Running equipment past end of support is a real risk: newly discovered vulnerabilities will never be patched, failed parts may be hard to find, and it is a common audit finding that can break compliance requirements. Track these dates in the asset inventory and budget for replacements well before they arrive. A common approach is to plan hardware refresh cycles, for example reviewing every device three to five years after purchase, and to replace equipment in planned projects rather than one failure at a time. If a device must stay in service past end of support, document it as a risk exception with compensating controls, such as isolating it and restricting management access, and a firm retirement date.",
   "Software and firmware management keeps devices current. Network operating systems and firmware receive updates that fix bugs, patch security vulnerabilities and add features. A sound upgrade process works like this. Track vendor security advisories. Read the release notes to understand fixes, known issues and upgrade paths (some versions must be installed in steps). Choose a stable recommended release rather than simply the newest. Download from the vendor and verify the image's integrity with its published hash. Test in a lab or on a small pilot group. Raise a change request and schedule the upgrade in a maintenance window. Back up the configuration first, confirm there is enough flash space, keep the previous image for rollback, and verify the device afterward.",
   "```\nSW1# copy running-config tftp://10.0.0.5/sw1-before-upgrade.cfg\nSW1# verify /sha512 flash:new-image.bin\n...Computed hash matches published value\nSW1# show version | include Version\n```",
   "Consistency matters as well. Keeping devices of the same model on the same version makes troubleshooting and security reporting simpler, while a patchwork of versions hides vulnerable devices. Vulnerability scans and compliance reports help find devices that were missed. Licensing is part of life-cycle management too: many devices need feature licences or subscriptions for support, security signatures or advanced functions, and letting them lapse can silently disable protection such as IPS signature updates or cloud management.",
   "Decommissioning retires a device safely. Steps include: confirm through documentation and traffic monitoring that nothing still depends on it; migrate services and update routing, DNS, DHCP, firewall rules and monitoring; remove it from management systems and the asset inventory; and revoke its certificates, accounts and licences. Crucially, sanitize the device, because configuration files can contain password hashes, SNMP community strings, VPN pre-shared keys, certificates and a map of your network. Wipe configurations and storage according to policy (erase and reset to factory defaults, cryptographically erase, or physically destroy drives), and keep a record, often a certificate of destruction from a disposal vendor. Finally, dispose of or recycle hardware responsibly in line with environmental rules.",
   "Common mistakes include upgrading without reading release notes or backing up, skipping hash verification (which could let a tampered image in), assuming end of sale means the device is immediately unsupported, and disposing of a router that still holds a VPN key used elsewhere. Another is decommissioning a device without removing it from monitoring, leading to false alarms, or removing it from DNS while an old application still points at its address.",
   "Exam questions usually give a scenario. 'No longer receives security patches' means end of support, and the answer is to replace or isolate it. 'Before applying firmware' points to reading release notes, backing up, verifying the hash, testing and scheduling with a rollback plan. 'Selling or recycling old equipment' points to sanitization and certificates of destruction. Clue words: 'EOL', 'EOS', 'vendor advisory', 'hash', 'rollback', 'wipe', 'dispose'. When two answers both sound reasonable, prefer the one that follows a controlled process (plan, test, back up, change window, verify, document) over one that acts immediately."
  ],
  "terms": [
   [
    "End of life (EOL)",
    "The vendor's announcement that a product is being retired from sale and, eventually, from support."
   ],
   [
    "End of support",
    "The date after which the vendor no longer provides patches, updates or technical support for a product."
   ],
   [
    "Firmware",
    "Low-level software embedded in hardware that controls the device's functions and can be updated."
   ],
   [
    "Release notes",
    "Vendor documentation describing the fixes, new features, known issues and upgrade requirements of a software version."
   ],
   [
    "Hash verification",
    "Comparing a downloaded file's cryptographic hash with the vendor's published value to confirm it is intact and untampered."
   ],
   [
    "Sanitization",
    "Securely removing data from a device, by wiping or destruction, so it cannot be recovered."
   ],
   [
    "Certificate of destruction",
    "A record from a disposal vendor confirming that equipment or media was securely destroyed."
   ]
  ],
  "example": "An audit flags a pair of firewalls that reached end of support last year and no longer receive security fixes or IPS signature updates. The team budgets for replacements, builds the new pair in a lab from the current rule set, and migrates during an approved maintenance window with the old pair kept ready for rollback. After a week of stable operation, they factory-reset and securely wipe the old units, revoke their VPN certificates, remove them from monitoring and the asset inventory, and file the disposal vendor's certificate of destruction.",
  "tip": "Past end of support means no more security patches, which is the key risk the exam wants you to identify. Before upgrading firmware, back up the config and have a rollback plan; before disposal, sanitize.",
  "check": [
   [
    "A critical switch reaches end of support but cannot be replaced for six months. What risk remains, and how can it be reduced meanwhile?",
    "New vulnerabilities will not be patched; reduce risk by isolating its management access, disabling unused services, monitoring it closely and documenting the exception with a replacement date."
   ],
   [
    "Why verify a firmware image's hash before installing it?",
    "To confirm the file was not corrupted in transfer or tampered with; installing a modified image could compromise the device."
   ],
   [
    "An upgrade succeeds, but after reboot the device loads an old configuration. Which step was probably missed?",
    "The configuration changes were not saved to the startup configuration before rebooting (or the backup was not restored); saving and backing up first prevents this."
   ],
   [
    "A company plans to sell old routers online. Why is a factory reset alone sometimes not enough, and what should it get as proof?",
    "Some devices retain data in storage that a simple reset does not securely erase, so policy may require secure wipe or destruction; a certificate of destruction or sanitization record provides proof."
   ]
  ]
 },
 {
  "t": "Change management and configuration management: baselines, golden configs, backups",
  "body": [
   "Many outages are caused not by hardware failure but by changes: a mistyped command, an untested upgrade, a firewall rule added in a hurry. Change management and configuration management are the processes that keep changes controlled and configurations known and recoverable. They are sometimes seen as paperwork, but their real purpose is fewer surprises, faster recovery, and a clear record of what changed when something breaks. Network+ tests the steps of the change process and the vocabulary of baselines, golden configurations and backups.",
   "Change management is the formal process for proposing, approving, implementing and reviewing changes. A typical flow runs like this. Someone submits a change request describing what will change and why, the risk and impact (which users and services are affected), the implementation steps, a test plan and a rollback (backout) plan. A change advisory board (CAB) or designated approver reviews it and may ask questions or reject it. Approved changes are scheduled in a maintenance window, usually at low-usage times, and affected users are notified. After implementation, the change is tested and verified, documentation is updated and the change is closed, with a review if anything went wrong.",
   "Changes come in types. Standard changes are low-risk, repeatable tasks that are pre-approved, such as adding a user port to an existing VLAN. Normal changes go through full review. Emergency changes, for example blocking an actively exploited service, still need approval and documentation, just faster and often after the fact. Whatever the type, the rollback plan matters most: if you cannot describe how to undo a change, you are not ready to make it. A good rollback plan names a trigger (for example 'if users on VLAN 30 cannot reach the file servers within 15 minutes'), the exact commands or backup file to restore, and who decides to roll back. Tie every change to a ticket number so that later, when monitoring shows a problem, you can match it to what changed and when.",
   "Configuration management is about knowing and controlling the configuration of every device. A baseline is a documented, approved reference state. A configuration baseline records how a device should be set up; a performance baseline records normal behaviour, such as typical bandwidth, CPU use and latency, so you can recognise when something is abnormal. A golden configuration (golden config) is a standard, approved template for a device type or role, such as every access switch, including security hardening, logging, NTP, SNMP, banners and AAA settings. New devices are built from it and existing devices are regularly compared against it.",
   "Configuration drift happens when devices gradually diverge from the baseline through one-off fixes and undocumented changes. Configuration monitoring tools regularly pull device configurations, compare them with the golden config or the previous version and alert on differences, so unauthorized or accidental changes are caught. Infrastructure as code and automation reduce drift by applying the same template everywhere. A diff makes the change obvious:",
   "```\n--- sw-access-12 (golden)\n+++ sw-access-12 (running)\n line vty 0 4\n- transport input ssh\n+ transport input ssh telnet\n```",
   "Backups make recovery possible. Back up device configurations automatically, regularly and after every change; store them off the device, ideally in version control so you can see exactly what changed, who changed it and when, and roll back. On many network devices the running configuration (in RAM) is lost on reboot unless it is saved to the startup configuration (in NVRAM or flash), for example with `copy running-config startup-config`. Forgetting this is a classic mistake that turns a successful change into an outage after the next power cycle; the opposite mistake, saving an experimental change that should have been discarded, is just as bad. Also back up firmware images, licences and certificates, and test restores periodically, because an untested backup is only a hope. Together, these practices let you answer three questions quickly: what changed, what should it look like, and how do I get back to a known good state.",
   "Exam questions usually test the order and purpose of steps. Clue words: 'documented steps to undo' means rollback or backout plan; 'group that approves changes' means CAB; 'scheduled low-usage period' means maintenance window; 'approved template for all switches' means golden config; 'normal traffic levels for comparison' means performance baseline; 'devices slowly differ from the standard' means configuration drift; 'change lost after reboot' means the running config was not saved. If a question asks what to do before making a change, the answer is usually to get approval and back up the current configuration; if it asks what to do after, verify and update documentation."
  ],
  "terms": [
   [
    "Change request",
    "A formal proposal describing a change, its reason, risk, implementation steps, test plan and rollback plan."
   ],
   [
    "Change advisory board",
    "A group that reviews, assesses and approves proposed changes."
   ],
   [
    "Maintenance window",
    "A pre-agreed, low-impact time period in which approved changes are carried out."
   ],
   [
    "Rollback plan",
    "The documented steps to return a system to its previous state if a change fails."
   ],
   [
    "Golden configuration",
    "An approved standard configuration template used to build and audit devices of a given role."
   ],
   [
    "Baseline",
    "A documented reference of normal configuration or performance used for comparison."
   ],
   [
    "Running configuration",
    "The active configuration in a device's memory, which must be saved to persist across reboots."
   ]
  ],
  "example": "An engineer adds a new VLAN to a core switch during an approved maintenance window, following the steps in the change request, verifies connectivity from test hosts and saves the running config to startup. The nightly configuration backup captures the change in version control with the change ticket number in the commit message. A week later, the configuration monitoring tool flags that one access switch no longer matches the golden config: someone enabled Telnet on the management lines. The team reverts it from the golden template, confirms SSH-only access, and opens an incident to find out who made the unauthorized change.",
  "tip": "Every change needs an approved request, a maintenance window and a rollback plan. Configuration baseline = how it should be configured; performance baseline = how it normally behaves. Save the running config or lose changes on reboot.",
  "check": [
   [
    "An approved change to a firewall causes an outage, and the engineer cannot remember the previous rule order. Which parts of change and configuration management would have prevented a long outage?",
    "A documented rollback plan and a configuration backup taken before the change, ideally in version control, so the previous state could be restored quickly."
   ],
   [
    "What is the difference between a configuration baseline and a performance baseline, and when would you use each?",
    "A configuration baseline defines how a device should be set up, used to detect drift; a performance baseline records normal behaviour such as utilisation, used to spot abnormal performance."
   ],
   [
    "A switch lost a VLAN change after a power outage, but the change was verified as working. What was missed?",
    "Saving the running configuration to the startup configuration, so the change existed only in RAM."
   ],
   [
    "A critical vulnerability is being exploited and a service must be blocked immediately. Does change management still apply?",
    "Yes, as an emergency change: it is approved quickly (sometimes retroactively) and still documented and reviewed afterwards."
   ]
  ]
 },
 {
  "t": "Monitoring: SNMP versions, traps, MIBs, flow data, packet capture, baselines, log aggregation and syslog, API integration",
  "body": [
   "Monitoring tells you how the network is behaving before users call. It combines several data sources, each with a different level of detail and cost: device statistics via SNMP, conversation summaries via flow data, full packets via capture, and events via logs. Knowing which source answers which question is a core Network+ skill. A useful mental model is increasing depth: SNMP tells you a link is busy, flow data tells you who is making it busy, and a packet capture tells you exactly what they are sending.",
   "SNMP (Simple Network Management Protocol) lets a network management station (NMS, the manager) read statistics from agents running on devices. The manager polls agents on UDP 161 with get and get-bulk requests, and can change settings with set requests; agents send unsolicited traps (or acknowledged informs) to the manager on UDP 162 when events happen, such as an interface going down or a power supply failing. The data an agent exposes is described in a MIB (Management Information Base), a hierarchical database of variables, each identified by an OID (object identifier) such as the counter of octets received on an interface. The manager calculates utilisation by polling a counter twice and dividing the difference by the interval.",
   "Versions matter for security. SNMPv1 and v2c authenticate with a community string sent in clear text; the defaults 'public' (read) and 'private' (read-write) must be changed or disabled. v2c added get-bulk retrieval and 64-bit counters, which matter on fast links where 32-bit counters wrap quickly. SNMPv3 adds real user-based authentication, integrity and encryption, with security levels noAuthNoPriv, authNoPriv and authPriv. Use SNMPv3 with authPriv whenever possible, restrict which hosts may query devices with an ACL, and prefer read-only access.",
   "Flow data summarizes conversations rather than their contents. NetFlow, IPFIX and sFlow export records containing source and destination addresses and ports, protocol, byte and packet counts and timestamps to a collector. Flow data answers 'who is talking to whom, over what, and how much?', making it ideal for finding top talkers, capacity planning and spotting unusual traffic such as data exfiltration or scanning, with far less storage than full captures. sFlow samples packets rather than tracking every flow. Packet capture records complete packets, including payloads, using tools such as Wireshark or tcpdump. It gives the deepest detail for troubleshooting protocol problems but produces huge volumes of data and may capture sensitive information. To capture traffic not addressed to your machine on a switched network, use port mirroring (a SPAN port) or a network tap. A baseline records normal behaviour, such as typical utilisation, error rates, CPU and latency at different times of day, so alerts trigger on meaningful deviations and anomalies stand out.",
   "Logs record events. Syslog is the standard way network devices send log messages to a central collector, on UDP 514 by default (TCP and TLS options exist for reliability and confidentiality). Each message has a facility (the source type) and a severity level from 0 to 7: 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug; lower numbers are more severe. Configuring a device to log at level 4 sends levels 0 to 4. A memory aid is 'Every Awesome Cisco Engineer Will Need Ice cream Daily'. Log aggregation gathers logs from many sources into one place, normalizes them and keeps them for searching and retention requirements. A SIEM (security information and event management) system goes further, correlating events across sources and alerting on security incidents. Accurate time from NTP on every device is essential for correlating logs.",
   "```\nSW1(config)# logging host 10.0.0.20\nSW1(config)# logging trap warnings\nSW1(config)# snmp-server group NETOPS v3 priv\nSW1(config)# snmp-server host 10.0.0.21 version 3 priv monitor\n%LINK-3-UPDOWN: Interface Gi1/0/7, changed state to down\n```",
   "The last line above shows a real syslog message format: the facility (LINK), severity 3 (Error), a mnemonic and the text. Modern monitoring increasingly uses APIs. Devices and controllers expose REST APIs, and streaming telemetry pushes data continuously rather than waiting to be polled. API integration lets monitoring platforms, ticketing systems and automation tools share data, for example automatically opening a ticket and attaching interface statistics when an alert fires. Common mistakes: leaving SNMP communities at 'public', confusing ports 161 and 162, thinking higher syslog numbers are more severe, and reaching for a packet capture when flow data would answer the question faster.",
   "Exam clue words: 'secure SNMP', 'encryption', 'user-based' mean SNMPv3; 'device sends alert when interface fails' means trap on UDP 162; 'OID', 'variables' mean MIB; 'top talkers', 'who used bandwidth' mean NetFlow or IPFIX; 'examine payload', 'protocol handshake details' mean packet capture; 'normal behaviour for comparison' means baseline; 'central collection of device logs' means syslog and log aggregation; 'correlate events and alert on threats' means SIEM."
  ],
  "terms": [
   [
    "MIB",
    "Management Information Base: the structured set of variables an SNMP agent exposes, each identified by an OID."
   ],
   [
    "OID",
    "Object identifier: the unique numeric address of a single variable in a MIB."
   ],
   [
    "SNMP trap",
    "An unsolicited message from an SNMP agent to the manager, sent on UDP 162, reporting an event."
   ],
   [
    "SNMPv3",
    "The SNMP version that adds user-based authentication and encryption."
   ],
   [
    "NetFlow",
    "A flow-export technology that summarizes traffic conversations for analysis without capturing payloads."
   ],
   [
    "Syslog severity",
    "A level from 0 (Emergency) to 7 (Debug) indicating how serious a log message is."
   ],
   [
    "SIEM",
    "Security information and event management: a system that aggregates and correlates logs to detect security events."
   ]
  ],
  "example": "Users say the WAN is slow every afternoon. SNMP graphs show the link at 95 percent utilisation from 2 pm, well above the baseline of 40 percent. NetFlow data shows one host sending large volumes to a cloud storage provider, which turns out to be a backup job someone rescheduled to run during business hours. The team moves the job back to the night, and no packet capture was needed. They also add an alert so the monitoring system raises a ticket through its API if utilisation exceeds 80 percent for 15 minutes.",
  "tip": "SNMPv3 is the only version with encryption and user authentication. Polls use UDP 161, traps UDP 162. Flow data answers who talked to whom and how much; packet capture shows the full contents. Syslog severity 0 is the most severe.",
  "check": [
   [
    "A security audit finds SNMP community strings visible in a packet capture. What should be changed?",
    "Move to SNMPv3 with authentication and encryption (authPriv), because v1 and v2c send community strings in clear text; also restrict SNMP access with ACLs."
   ],
   [
    "An SNMP graph shows a link is saturated. Which data source would you use next to find out which hosts are responsible, and why not a packet capture first?",
    "Flow data such as NetFlow or IPFIX, which summarizes who is talking to whom and how much; a packet capture is far larger and slower to analyze for that question."
   ],
   [
    "A switch is configured to send syslog at severity 4 (warnings). Will a severity 6 message about a user logging in reach the server?",
    "No. Setting level 4 sends severities 0 to 4 only; 6 (Informational) is less severe and is filtered out."
   ],
   [
    "Logs from a firewall and a server about the same incident appear 7 minutes apart in the SIEM. What is the likely cause?",
    "The devices' clocks are not synchronized; configure NTP on all devices so timestamps can be correlated."
   ]
  ]
 },
 {
  "t": "Monitoring solutions: network discovery, traffic analysis, performance and availability monitoring, configuration monitoring",
  "body": [
   "The previous lesson covered monitoring data sources such as SNMP, flow data, packet capture and syslog. This one covers what monitoring solutions do with that data. Network+ lists several capabilities you should be able to match to a scenario: network discovery, traffic analysis, performance monitoring, availability monitoring and configuration monitoring. Many commercial and open-source platforms combine all of them in one network monitoring system with dashboards, alerts and reports, but each capability answers a different question, and exam questions are written around those questions.",
   "Network discovery finds what is on the network. Tools sweep address ranges with ping and port probes, query devices with SNMP, and read neighbour information from LLDP (Link Layer Discovery Protocol) or Cisco's CDP to build an inventory and often an automatic topology map showing which device connects to which port. Discovery can be ad hoc, when you run a scan to answer a question, or scheduled, so new or unknown devices are detected over time and compared with the asset inventory. It exposes rogue devices, such as an unauthorized access point or a forgotten server, and keeps documentation honest. A classic command-line example is a ping sweep with nmap, run only on networks you are authorized to scan:",
   "```\n$ nmap -sn 10.20.30.0/24\nNmap scan report for 10.20.30.1   Host is up (0.0010s latency).\nNmap scan report for 10.20.30.15  Host is up (0.0021s latency).\nNmap scan report for 10.20.30.77  Host is up (0.0034s latency).\nNmap done: 256 IP addresses (3 hosts up) scanned in 2.41 seconds\n```",
   "Traffic analysis examines what is flowing across the network. Using flow data (NetFlow, IPFIX, sFlow) and, when needed, packet captures, it shows top talkers, top applications, protocols in use and traffic patterns over time. Operations teams use it for capacity planning and to find what is eating bandwidth; security teams use it to spot anomalies, such as a workstation suddenly sending gigabytes to an unknown external address at 3 am, or one host connecting to hundreds of internal addresses in a minute, which suggests scanning or a worm.",
   "Performance monitoring tracks how well the network works. Typical metrics are bandwidth utilisation, throughput, latency, jitter, packet loss, interface errors and discards, and device CPU, memory and temperature. Values are compared with baselines and thresholds, and graphs show trends that support capacity planning, such as a WAN link growing toward saturation over six months. Synthetic monitoring actively generates test traffic, for example measuring round-trip time, jitter and loss between sites every minute, or logging in to an application, so you detect degradation even when real users are quiet and before they complain.",
   "Availability monitoring answers the simplest question: is it up? The system regularly checks devices and services using ping, SNMP polls, TCP port checks or application-level checks such as loading a web page and looking for expected text, and raises an alert when something stops responding. Note that ping succeeding does not prove a service works; a web server can answer ping while its web service is down, which is why application-level checks matter. Availability is often reported as a percentage for SLA reporting. Alerts should be tuned to avoid alert fatigue, for instance by requiring several failed checks before paging someone, by using dependencies so that devices behind a failed upstream router are marked unreachable rather than generating hundreds of separate alerts, and by routing alerts to the right team.",
   "Configuration monitoring watches device configurations. It regularly collects configs, stores versions, compares them with the golden configuration or baseline and alerts on unexpected changes, which catches both mistakes and unauthorized modifications. It also supports compliance reporting, for instance proving that every switch has Telnet disabled and logging enabled. Combined with change management, it tells you exactly what changed, when and often by whom. Common mistakes across all of these: monitoring only availability and missing slow degradation, alerting on everything until staff ignore alerts, not updating monitoring when devices are added or retired, and running discovery scans without authorization.",
   "Exam questions map a need to a capability. 'What is on my network', 'rogue device', 'topology map' mean discovery. 'What is using my bandwidth', 'top talkers', 'unusual destinations' mean traffic analysis. 'Is it slow', 'latency and jitter trends', 'capacity planning' mean performance monitoring. 'Is it up', 'uptime percentage', 'alert when unreachable' mean availability monitoring. 'Did someone change it', 'compare to the golden config', 'compliance' mean configuration monitoring."
  ],
  "terms": [
   [
    "Network discovery",
    "Automatically finding and cataloguing devices on a network, often producing a topology map."
   ],
   [
    "LLDP",
    "Link Layer Discovery Protocol: a vendor-neutral protocol devices use to advertise their identity and capabilities to directly connected neighbours."
   ],
   [
    "Top talkers",
    "The hosts or applications generating the most traffic, typically identified through flow analysis."
   ],
   [
    "Performance monitoring",
    "Tracking metrics such as utilisation, latency, jitter, loss and errors against baselines and thresholds."
   ],
   [
    "Availability monitoring",
    "Regularly checking whether devices and services respond, and alerting when they do not."
   ],
   [
    "Synthetic monitoring",
    "Generating test traffic or transactions to measure performance and availability proactively."
   ],
   [
    "Alert fatigue",
    "Desensitization caused by too many or low-value alerts, leading staff to miss important ones."
   ]
  ],
  "example": "A monitoring platform runs nightly discovery and finds a new device in a conference room whose MAC address belongs to a consumer router vendor. Traffic analysis shows it is handing out addresses and bridging visitors onto the staff VLAN. At the same time, configuration monitoring alerts that the access switch serving that room had port security disabled outside any approved change. The team removes the rogue router, restores the switch from its golden config and adds the port-security setting to the weekly compliance report.",
  "tip": "Match the need to the solution: 'what is on my network' is discovery; 'what is using my bandwidth' is traffic analysis; 'is it slow' is performance monitoring; 'is it up' is availability monitoring; 'did someone change it' is configuration monitoring.",
  "check": [
   [
    "A web server answers ping, so availability monitoring shows it green, yet users cannot load the site. What monitoring change would catch this?",
    "Add an application-level check, such as requesting the web page and checking for expected content, because ping only proves the host responds, not that the service works."
   ],
   [
    "When a core router fails, the monitoring system sends 300 alerts for every device behind it. What feature reduces this, and why does it matter?",
    "Dependencies (parent-child relationships) so devices behind the failed router are suppressed or marked unreachable; this avoids alert fatigue and points staff at the real cause."
   ],
   [
    "Management asks whether the WAN link will need upgrading next year. Which monitoring capability answers this?",
    "Performance monitoring, using utilisation trends against the baseline for capacity planning, supported by traffic analysis to see which applications are growing."
   ],
   [
    "How can discovery help find a rogue access point?",
    "Scheduled discovery compares newly found devices, MAC addresses and neighbour information with the asset inventory and flags anything unknown."
   ]
  ]
 },
 {
  "t": "Disaster recovery metrics: RPO, RTO, MTTR, MTBF; hot, warm and cold sites; active-active vs active-passive; DR testing",
  "body": [
   "Disaster recovery (DR) is how an organization restores IT services after a major disruption such as a fire, flood, ransomware attack, power failure or regional cloud outage. It is part of the wider business continuity plan, which keeps the business itself running, and it builds on high availability, which tries to prevent outages in the first place. Network+ tests the metrics that set recovery targets, the types of recovery site, the redundancy models and how DR plans are tested. The main idea is that recovery choices are business decisions: faster recovery and less data loss cost more.",
   "Two metrics define targets, and they are usually set per service after a business impact analysis. The recovery point objective (RPO) is the maximum acceptable amount of data loss, measured in time. An RPO of four hours means you must be able to restore data from no more than four hours before the disaster, so backups or replication must run at least that often. The recovery time objective (RTO) is the maximum acceptable time to restore the service after a disruption. An RTO of two hours means the service must be running again within two hours. A simple memory aid: RPO looks backward at data, RTO looks forward at downtime. They are independent: a service can have a tight RPO (no data loss allowed) but a relaxed RTO, or the reverse.",
   "Two metrics describe reliability. Mean time between failures (MTBF) is the average operating time between failures of a repairable component; higher is better. Mean time to repair (or recover) (MTTR) is the average time it takes to fix a failure and restore service; lower is better. Work an example: a switch runs 2,000 hours, fails, runs 3,000 hours, fails, and runs 4,000 hours, fails. MTBF is (2,000 + 3,000 + 4,000) / 3 = 3,000 hours. If the three repairs took 2, 4 and 6 hours, MTTR is 4 hours. Reliable components (high MTBF) and fast repairs (low MTTR), aided by spares on site, good documentation, monitoring and support contracts, mean more uptime. A related term, mean time to failure (MTTF), applies to items that are replaced rather than repaired.",
   "Recovery sites trade cost against speed. A hot site is a fully equipped duplicate with current data and running systems, so failover can happen in minutes to hours; it is the most expensive because you pay for a second environment all the time. A warm site has hardware and connectivity in place but needs current data restored and systems configured, taking hours to days. A cold site is just space with power, cooling and perhaps network connections; equipment must be brought in, installed and restored, taking days or weeks, but it is the cheapest. Cloud-based recovery is increasingly common, because resources can be defined in advance and started only when needed, giving warm or hot recovery at lower standing cost. Match the site to the RTO: an RTO of one hour rules out warm and cold sites.",
   "Redundancy models describe how multiple sites or devices share work. In active-active, all sites or devices handle live traffic at the same time, often behind a load balancer or with global DNS load balancing. Failure of one reduces capacity, but service continues immediately, and you get full use of your investment; each side must be sized to carry the whole load if the other fails, or performance will suffer during an outage. In active-passive, one side handles all traffic while the other waits on standby, taking over only when the active one fails. It is simpler and avoids data consistency problems, but the standby sits idle and failover may take some time. FHRPs and most firewall pairs commonly run active-passive.",
   "A plan that has never been tested probably will not work. DR testing ranges from low effort to high. A tabletop exercise walks key staff through a scenario in discussion, checking roles, contacts and decisions. A walkthrough reviews each step of the plan. A simulation tests parts of the plan against a scenario without affecting production. A parallel test brings recovery systems up alongside production and checks they work. A full failover (cutover) test actually switches production to the recovery site, which is the most realistic and the most disruptive. After each test, hold a review and update the plan with lessons learned, including contact lists and documentation that turned out to be wrong.",
   "Common mistakes include swapping RPO and RTO, assuming backups alone meet any RPO (nightly backups cannot meet a 15-minute RPO), thinking higher MTTR is good, choosing a cold site for a service with a short RTO, and sizing an active-active pair so each side runs at 80 percent, which means neither can carry the full load alone. Another is keeping the DR plan only on systems that will be unavailable in the disaster.",
   "Exam clue words: 'how much data can we lose' means RPO; 'how long can we be down' means RTO; 'average time between failures' means MTBF; 'average time to fix' means MTTR. 'Immediately', 'fully equipped', 'real-time data' mean hot site; 'hardware but no current data' means warm; 'empty space with power' means cold. 'Both sites serve users' means active-active; 'standby takes over' means active-passive. 'Discussion-based' means tabletop exercise."
  ],
  "terms": [
   [
    "RPO",
    "Recovery point objective: the maximum tolerable data loss, measured as time before the incident."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum tolerable time to restore a service after an incident."
   ],
   [
    "MTBF",
    "Mean time between failures: the average operating time between failures of a repairable system."
   ],
   [
    "MTTR",
    "Mean time to repair: the average time needed to repair a failure and restore service."
   ],
   [
    "Hot site",
    "A fully equipped, up-to-date recovery site that can take over operations almost immediately."
   ],
   [
    "Cold site",
    "A recovery location with space, power and cooling but no ready equipment or data."
   ],
   [
    "Tabletop exercise",
    "A discussion-based DR test in which staff talk through their response to a scenario."
   ]
  ],
  "example": "An online retailer decides it can lose at most 15 minutes of orders (RPO 15 minutes) and be down no longer than one hour (RTO 1 hour). Nightly backups cannot meet the RPO, so it replicates the database continuously to a hot site in another region and runs the web tier active-active across both, with each site sized to handle full traffic. Its internal HR system, with an RTO of three days, is recovered from backups to a cloud environment started only when needed. A twice-yearly failover test confirms the targets, and a tabletop exercise each quarter checks that staff know their roles.",
  "tip": "RPO = data loss tolerance (how often to back up); RTO = downtime tolerance (how fast to recover). Hot = fastest and costliest, cold = slowest and cheapest. High MTBF and low MTTR are good.",
  "check": [
   [
    "A database is backed up every 6 hours and its restore takes 3 hours. Can it meet an RPO of 4 hours and an RTO of 4 hours?",
    "It meets the RTO (3 hours is within 4) but not the RPO, because up to 6 hours of data could be lost; backups or replication must run at least every 4 hours."
   ],
   [
    "A company's two data centres run active-active, each at 70% of its capacity. What happens if one fails?",
    "The survivor must carry 140% of its capacity, so service will be degraded or fail; active-active sites must be sized so either can handle the full load."
   ],
   [
    "A service has an RTO of 30 minutes. Which recovery site types are realistic, and why?",
    "Only a hot site (or equivalent always-ready cloud environment), because warm sites need hours to restore data and cold sites need days to install equipment."
   ],
   [
    "Three routers failed after 1,000, 1,500 and 2,000 operating hours. What is the MTBF?",
    "1,500 hours: (1,000 + 1,500 + 2,000) / 3."
   ]
  ]
 },
 {
  "t": "DHCP: scopes, exclusions, reservations, lease time, options, relay/IP helper; SLAAC for IPv6",
  "body": [
   "Dynamic Host Configuration Protocol (DHCP) automatically gives hosts their IP configuration: an address, subnet mask, default gateway, DNS servers and more. Without it, every device would need manual configuration, which is slow, error-prone and invites duplicate addresses. DHCP servers listen on UDP 67 and clients use UDP 68. DHCP problems are among the most common network faults, and the symptom is distinctive: a host that cannot get a lease falls back to an APIPA 169.254.x.x address and cannot reach anything beyond its own segment.",
   "A client gets an address through the DORA exchange. Discover: the client, which has no address yet, broadcasts from 0.0.0.0 to 255.255.255.255 looking for a server. Offer: a server replies offering an address and settings. Request: the client broadcasts that it accepts that offer, which also tells any other servers that their offers were declined. Acknowledge: the server confirms, and the lease begins. Before using the address, many clients check it is not already in use. You can watch this happen on Windows by releasing and renewing:",
   "```\nC:\\> ipconfig /release\nC:\\> ipconfig /renew\nC:\\> ipconfig /all\n   IPv4 Address. . . . . . . . . . . : 10.20.30.115(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Lease Obtained. . . . . . . . . . : Monday 09:02:11\n   Lease Expires . . . . . . . . . . : Tuesday 09:02:11\n   Default Gateway . . . . . . . . . : 10.20.30.1\n   DHCP Server . . . . . . . . . . . : 10.0.0.10\n   DNS Servers . . . . . . . . . . . : 10.0.0.53\n```",
   "A scope is the range of addresses a server can hand out for one subnet, such as 10.20.30.100 to 10.20.30.200, together with its settings. Exclusions are addresses inside the scope range that the server must never hand out, typically because they are statically assigned to printers, servers or the gateway. Reservations tie a specific address to a specific client, identified by its MAC address (or client ID), so that device always gets the same IP while still being managed centrally; this suits printers, access points and cameras. A server can host many scopes, one per subnet or VLAN. When every address in a scope is leased, the scope is exhausted and new clients fail to get addresses, a common problem on busy guest networks.",
   "Addresses are leased, not given permanently. The lease time sets how long the client may use the address. At 50 percent of the lease (the T1 timer) the client tries to renew directly with its server by unicast; at 87.5 percent (T2) it broadcasts to any server; if the lease expires, it must stop using the address. Short leases, such as one to four hours, suit busy guest networks with many transient devices so addresses are recycled quickly; long leases, such as eight days, suit stable wired offices and reduce DHCP traffic. DHCP options carry extra configuration: option 3 (router, the default gateway), option 6 (DNS servers), option 15 (domain name), option 42 (NTP servers) and option 66 (TFTP server name, used by IP phones to fetch their configuration). Options can be set per scope or server-wide.",
   "Because Discover messages are broadcasts, they do not cross routers. With one central DHCP server serving many VLANs, you configure a DHCP relay agent on each VLAN's router interface or SVI; on Cisco devices this is the `ip helper-address 10.0.0.10` command. The relay receives the broadcast, forwards it as unicast to the DHCP server and inserts the interface's own address (the gateway address field), which tells the server which scope to use. A missing or wrong helper address is a classic reason one VLAN gets APIPA addresses while others work. Security matters too: a rogue DHCP server, such as a home router plugged in by a user, can hand out wrong gateways; DHCP snooping on switches blocks server replies from untrusted ports.",
   "IPv6 can use DHCPv6, but it also offers SLAAC (stateless address autoconfiguration). Routers send router advertisements with the network prefix; hosts build their own addresses from that /64 prefix and an interface ID. Flags in the router advertisement tell hosts what to do: the M (managed) flag means use stateful DHCPv6 for addresses, and the O (other) flag means use stateless DHCPv6 just for extra options such as DNS servers. DNS servers can also be delivered in the router advertisement itself (RDNSS). Note that DHCPv6 does not provide the default gateway; that always comes from router advertisements. Common mistakes: confusing exclusions with reservations, forgetting the relay on a new VLAN, creating overlapping scopes on two servers, and setting very long leases on a guest network.",
   "Exam clue words: '169.254 address', 'cannot get an address' mean DHCP failure, with 'only one VLAN affected' pointing to the relay and 'new users fail but existing users are fine' pointing to scope exhaustion. 'Always the same address for this printer' means reservation; 'never hand out this address' means exclusion; 'forward DHCP across a router' means relay or IP helper; 'IPv6 host configures itself from the router's prefix' means SLAAC."
  ],
  "terms": [
   [
    "DORA",
    "Discover, Offer, Request, Acknowledge: the four-message DHCP lease process."
   ],
   [
    "Scope",
    "The pool of addresses and settings a DHCP server hands out for one subnet."
   ],
   [
    "Exclusion",
    "An address or range within a scope that the DHCP server will not assign."
   ],
   [
    "Reservation",
    "A DHCP entry that always assigns a specific IP address to a specific MAC address."
   ],
   [
    "Lease time",
    "How long a client may use an assigned address before it must renew it."
   ],
   [
    "DHCP relay",
    "A router or switch function (IP helper) that forwards DHCP broadcasts to a server on another subnet."
   ],
   [
    "SLAAC",
    "Stateless address autoconfiguration: IPv6 hosts build their own addresses from a router-advertised prefix."
   ]
  ],
  "example": "After a new VLAN 40 is created for a lab, every PC in it gets a 169.254 address, while other VLANs work normally. The DHCP server already has a scope for 10.40.0.0/24, so the technician checks the VLAN 40 SVI on the core switch and finds no `ip helper-address`. Adding the helper pointing to the DHCP server fixes it immediately after the PCs renew. She also adds an exclusion for 10.40.0.1 to 10.40.0.20 for the lab's static equipment and a reservation for the lab printer's MAC address.",
  "tip": "Exclusion = never hand out this address; reservation = always give this address to this MAC. If clients on only one remote subnet get APIPA addresses, suspect the relay (IP helper).",
  "check": [
   [
    "On a conference guest network, users who arrived early are fine but new arrivals get 169.254 addresses. The scope is /24 with 8-day leases. What is happening and what are two fixes?",
    "The scope is exhausted because leases from earlier visitors have not expired; shorten the lease time and/or enlarge the scope (for example to a /23)."
   ],
   [
    "Why does a DHCP relay add its own interface address when forwarding a request?",
    "So the server knows which subnet the client is on and can choose the matching scope, and so it knows where to send the reply."
   ],
   [
    "A user plugs in a home router and several colleagues suddenly get addresses from 192.168.0.x. What is this and which switch feature prevents it?",
    "A rogue DHCP server; DHCP snooping blocks DHCP server messages on untrusted access ports."
   ],
   [
    "An IPv6 router advertisement has the O flag set but not the M flag. How do hosts get their addresses and DNS servers?",
    "They build addresses with SLAAC and use stateless DHCPv6 only for other options such as DNS servers."
   ]
  ]
 },
 {
  "t": "DNS: record types (A, AAAA, CNAME, MX, TXT, NS, PTR, SOA), zones, recursive vs authoritative, DNSSEC, DoH/DoT, hosts file",
  "body": [
   "The Domain Name System (DNS) translates names people remember, like www.example.com, into IP addresses computers use. Almost every connection starts with a DNS lookup, so when DNS fails, users say 'the internet is down' even though the network is fine; a quick test is whether you can reach a site by IP address but not by name. DNS uses port 53, UDP for most queries and TCP for zone transfers and large responses. Network+ tests record types, how resolution works, zone concepts and DNS security.",
   "DNS data lives in resource records. An A record maps a name to an IPv4 address; an AAAA record maps a name to an IPv6 address. A CNAME (canonical name) record is an alias that points one name to another name, such as www pointing to a load balancer's name; a CNAME cannot sit at the zone apex alongside other records. An MX (mail exchanger) record lists the mail servers for a domain, with preference values where lower numbers are tried first. A TXT record holds arbitrary text, widely used for email security (SPF, DKIM and DMARC policies) and for proving domain ownership to cloud services. An NS (name server) record names the authoritative servers for a zone. A PTR (pointer) record does the reverse lookup, mapping an IP address back to a name, stored in special zones such as in-addr.arpa for IPv4 and ip6.arpa for IPv6. The SOA (start of authority) record sits at the top of every zone and contains the primary server, the administrator contact, a serial number and timers that control how secondary servers refresh. Every record also carries a TTL that tells resolvers how long to cache it.",
   "A zone is the portion of the DNS namespace that a particular server is responsible for. A forward lookup zone resolves names to addresses; a reverse lookup zone resolves addresses to names. A primary server holds the editable copy of the zone; secondary servers hold read-only copies obtained through zone transfers (AXFR for a full transfer, IXFR for incremental), triggered when the SOA serial number increases. Zone transfers should be restricted to authorized secondary servers because they reveal every name in the zone. Organizations often run split-horizon DNS, giving internal users different answers (private addresses) from external users.",
   "Two kinds of server play different roles. An authoritative server holds the actual records for a zone and gives definitive answers about it. A recursive resolver, such as your ISP's or company's DNS server, does the legwork for clients. Walk through a lookup for www.example.com with an empty cache: the PC checks its local cache and hosts file, then sends a recursive query to its resolver. The resolver asks a root server, which refers it to the .com top-level domain servers; a .com server refers it to example.com's authoritative servers; the authoritative server returns the A record. The resolver caches the answer for its TTL and returns it to the PC. Your PC makes a recursive query; the resolver makes iterative queries. Test it yourself:",
   "```\n$ dig www.example.com A +short\n203.0.113.80\n$ dig example.com MX +short\n10 mail1.example.com.\n20 mail2.example.com.\n$ nslookup 203.0.113.80\nName:    www.example.com\n```",
   "Classic DNS is unauthenticated and unencrypted, which allows cache poisoning (forged answers inserted into a resolver's cache) and eavesdropping on which sites users visit. DNSSEC (DNS Security Extensions) adds digital signatures to records, with a chain of trust from the root, so resolvers can verify that answers are authentic and unaltered; it provides integrity and authenticity but not confidentiality. For privacy, DNS over TLS (DoT) encrypts DNS on TCP 853, and DNS over HTTPS (DoH) sends DNS inside HTTPS on TCP 443, making it blend with web traffic. Organizations sometimes block or control DoH so browsers do not bypass their own DNS filtering and logging.",
   "Finally, the local hosts file (/etc/hosts on Linux and macOS, C:\\Windows\\System32\\drivers\\etc\\hosts on Windows) maps names to addresses statically and is checked before DNS by default. It is handy for testing but can be abused by malware to redirect sites, so an unexpected entry there is a red flag. Common mistakes: confusing PTR (reverse) with A records, thinking DNSSEC encrypts, forgetting that DNS uses TCP for zone transfers, forgetting to raise the SOA serial so secondaries never update, and not realizing that a long TTL means old answers persist after you change a record, so lower the TTL before a planned migration.",
   "Exam clue words: 'IPv4 address for a name' means A; 'IPv6' means AAAA; 'alias' means CNAME; 'mail server for the domain' means MX; 'SPF', 'domain verification' mean TXT; 'reverse lookup' means PTR; 'serial number', 'zone refresh timers' mean SOA. 'Holds the official records' means authoritative; 'looks up on behalf of clients and caches' means recursive. 'Signed records', 'prevent spoofed answers' mean DNSSEC; 'encrypt DNS queries' means DoH or DoT; 'name resolves differently on one PC only' suggests the hosts file or local cache."
  ],
  "terms": [
   [
    "A and AAAA records",
    "DNS records mapping a name to an IPv4 (A) or IPv6 (AAAA) address."
   ],
   [
    "CNAME",
    "A DNS record that makes one name an alias for another name."
   ],
   [
    "MX record",
    "A DNS record listing a domain's mail servers with preference values, lowest tried first."
   ],
   [
    "PTR record",
    "A DNS record used for reverse lookups, mapping an IP address to a hostname."
   ],
   [
    "SOA record",
    "Start of authority: the record at the top of a zone holding the primary server, contact, serial number and refresh timers."
   ],
   [
    "Recursive resolver",
    "A DNS server that performs the full lookup on a client's behalf and caches the results."
   ],
   [
    "DNSSEC",
    "Extensions that digitally sign DNS records so resolvers can verify their authenticity and integrity."
   ]
  ],
  "example": "Email from a company is being marked as spam at some recipients. Running `dig example.com TXT` shows there is no SPF record, and `dig example.com MX` confirms which servers handle mail. The admin adds a TXT record with an SPF policy listing the legitimate mail servers, increments the SOA serial so the secondary servers pick up the change, and deliverability improves within a day. A week later, before moving the web server to a new host, she lowers the TTL on the www record so the change will take effect quickly.",
  "tip": "A = IPv4, AAAA = IPv6, PTR = reverse, MX = mail, NS = name servers, SOA = zone authority and serial, TXT = SPF/DKIM/verification, CNAME = alias. DNSSEC gives integrity, not encryption; DoH and DoT give encryption.",
  "check": [
   [
    "An admin changes the A record for a website, but some users still reach the old server for hours. Why, and how could this have been avoided?",
    "Resolvers cached the old record for its TTL; lowering the TTL well before the change would have made the new address take effect quickly."
   ],
   [
    "A secondary DNS server keeps serving old records although the primary was updated. What SOA-related mistake is likely?",
    "The SOA serial number was not increased, so the secondary did not see a newer version and did not request a zone transfer (or TCP 53 transfers are blocked)."
   ],
   [
    "A company wants to stop attackers from inserting forged answers into its resolvers' caches. Does DoH solve this, or DNSSEC?",
    "DNSSEC, because it lets resolvers verify signed records; DoH only encrypts the query path between client and resolver."
   ],
   [
    "One PC resolves intranet.example.com to a strange external address while every other PC resolves it correctly. What should you check first?",
    "The PC's hosts file and DNS cache (for example with `ipconfig /displaydns`), since a malicious or stale local entry overrides DNS."
   ]
  ]
 },
 {
  "t": "Time protocols: NTP, PTP and NTS",
  "body": [
   "Accurate, consistent time across all devices matters far more than it first seems. Log correlation during troubleshooting and incident response depends on matching timestamps from firewalls, switches and servers. Kerberos authentication, used by Active Directory, fails if clocks differ by more than a few minutes (five by default). Certificates have validity dates, so a device with a badly wrong clock may reject valid certificates or accept expired ones. Scheduled jobs, backups, one-time password tokens and financial transactions all depend on time. Network+ covers three technologies: NTP for everyday synchronization, PTP for very high precision, and NTS for securing NTP.",
   "Network Time Protocol (NTP) is the standard way to synchronize clocks over a network, using UDP 123. NTP is hierarchical, organized in strata. Stratum 0 devices are reference clocks, such as GPS receivers or atomic clocks; they are not on the network directly. Stratum 1 servers are directly attached to a stratum 0 source. Stratum 2 servers synchronize from stratum 1, and so on down to stratum 15; stratum 16 means unsynchronized. A lower stratum number means fewer steps from the reference, not a guarantee of better accuracy. NTP exchanges timestamped packets, calculates the round-trip delay and the clock offset, and then gradually adjusts (slews) the local clock rather than jumping it, typically achieving accuracy within milliseconds over a LAN and tens of milliseconds over the internet.",
   "Good practice is to have two or more internal NTP servers (ideally three or more, so a single bad source can be outvoted) that sync from reliable upstream sources, then point all network devices, servers and clients at them. On network devices you configure a command like `ntp server 10.0.0.5` and verify it; on Linux you might check with `timedatectl` or `chronyc sources`. Log in UTC or a consistent time zone across devices, and use NTP authentication so devices cannot be fed false time. On Windows domains, clients take time from domain controllers, which should take time from a reliable NTP source.",
   "```\nR1# show ntp status\nClock is synchronized, stratum 3, reference is 10.0.0.5\nR1# show ntp associations\n  address       ref clock      st  when  poll  reach  delay  offset\n*~10.0.0.5      192.0.2.10      2    33    64    377    1.2    0.35\n```",
   "In that output, the router is at stratum 3 because its server, 10.0.0.5, is stratum 2; the asterisk marks the selected peer, reach 377 means the last eight polls succeeded, and the offset is a fraction of a millisecond. Precision Time Protocol (PTP), defined in IEEE 1588, provides much higher accuracy than NTP, down to microseconds or better, by using hardware timestamping in network interfaces and switches instead of software timestamps. A grandmaster clock provides the reference, and PTP-aware switches acting as boundary clocks or transparent clocks correct for the delay they add. PTP is used where precise timing is critical: financial trading (regulations require precise trade timestamps), telecommunications such as mobile networks, industrial automation, power grids and broadcast media. It requires supporting hardware along the path, so it is chosen only when NTP's accuracy is not enough.",
   "Network Time Security (NTS) adds security to NTP. Traditional NTP is unauthenticated unless you configure symmetric keys, which must be shared manually with every client and do not scale to public servers. An attacker who can feed false time could make certificates appear expired, break Kerberos logins, disrupt time-based access rules or muddle log evidence. NTS uses a TLS-based key establishment step (NTS-KE, over TCP) followed by authenticated NTP packets on UDP 123, so clients can cryptographically verify that time comes from the genuine server and has not been altered. It provides authentication and integrity for time data, not secrecy, and it scales to large numbers of clients.",
   "Common mistakes include believing stratum 1 is always the right source for every device (it is usually better to use internal servers), thinking NTP encrypts time data, assuming PTP runs on any network without hardware support, letting one device drift because NTP was blocked by a firewall rule on UDP 123, and forgetting to set time zones consistently so logs appear hours apart even when clocks are correct.",
   "Exam clue words: 'synchronize clocks', 'UDP 123', 'stratum' mean NTP; 'microsecond' or 'nanosecond accuracy', 'hardware timestamping', 'trading or telecom' mean PTP; 'authenticated time', 'prevent spoofed time', 'TLS key exchange for time' mean NTS. 'Logs cannot be correlated' or 'Kerberos authentication failing on one machine' point to clock skew and NTP problems."
  ],
  "terms": [
   [
    "NTP",
    "Network Time Protocol: synchronizes clocks across a network using UDP 123 and a stratum hierarchy."
   ],
   [
    "Stratum",
    "The level of an NTP server in the hierarchy; stratum 1 is directly connected to a reference clock."
   ],
   [
    "Reference clock",
    "A stratum 0 time source such as a GPS receiver or atomic clock."
   ],
   [
    "Clock skew",
    "The difference between the clocks of two systems, which can break authentication and log correlation."
   ],
   [
    "PTP",
    "Precision Time Protocol (IEEE 1588): hardware-assisted time synchronization with sub-microsecond accuracy."
   ],
   [
    "Grandmaster clock",
    "The authoritative time source in a PTP network that other clocks follow."
   ],
   [
    "NTS",
    "Network Time Security: a mechanism that authenticates NTP time using TLS-established keys."
   ]
  ],
  "example": "During an incident, analysts try to trace an intruder across firewall, switch and server logs, but the timestamps disagree by up to 12 minutes, making the sequence of events impossible to reconstruct. Afterwards, the team deploys three internal NTP servers synchronized to reliable upstream sources, points every device at them, sets all logs to UTC and enables NTS where supported. A month later, a user's laptop fails Kerberos logins; the help desk finds it drifted eight minutes because a home firewall blocked UDP 123, and resynchronizing fixes it immediately.",
  "tip": "NTP = UDP 123, millisecond-level accuracy, stratum hierarchy. PTP = microsecond or better, needs hardware support. NTS = secure (authenticated) NTP. Clock skew breaks Kerberos and log correlation.",
  "check": [
   [
    "A router synchronizes from a server that reports stratum 2. What stratum will the router report, and what does that tell you?",
    "Stratum 3, meaning it is three steps from a reference clock; it does not by itself say how accurate the time is."
   ],
   [
    "A stock exchange needs trade timestamps accurate to under a microsecond. Why is NTP unsuitable, and what does PTP need?",
    "NTP typically achieves millisecond accuracy using software timestamps; PTP achieves sub-microsecond accuracy but needs hardware timestamping on interfaces and PTP-aware switches."
   ],
   [
    "Why is an attacker who can spoof NTP responses a security risk, and what mitigates it?",
    "False time can make certificates appear invalid, break Kerberos authentication and corrupt log timelines; NTS (or NTP authentication) lets clients verify time comes from the genuine server."
   ],
   [
    "All devices use NTP and clocks agree, yet the firewall's logs appear five hours behind the server's. What is the likely cause?",
    "Inconsistent time zone settings in the logs; standardizing on UTC fixes the display."
   ]
  ]
 },
 {
  "t": "Access and management methods: site-to-site and client VPNs, SSH, GUI, API, console, jump box, in-band vs out-of-band",
  "body": [
   "Administrators need secure ways to reach networks and manage devices, and they need a way in even when the network itself is broken. Every management method is also a potential attack path, because whoever controls the management interface controls the device. Network+ expects you to know the options, when to use each, and the security trade-offs: which methods encrypt, which scale, and which still work during an outage.",
   "Virtual private networks provide secure access across untrusted networks. A site-to-site VPN connects entire networks, such as a branch to headquarters or an office to a cloud VPC, through a persistent tunnel between two gateways, usually firewalls or routers using IPsec; users do not install anything and are often unaware it exists. A client-to-site (remote access) VPN connects an individual device to the corporate network. It may use a full client with IPsec or TLS, or a clientless VPN through a web browser portal that exposes specific applications over HTTPS. Remote access VPNs may be full tunnel (all traffic through the VPN) or split tunnel (only corporate traffic), trading inspection against bandwidth. Remote access should require MFA.",
   "For device management, SSH (Secure Shell, TCP 22) is the standard for command-line access: it encrypts the whole session and supports key-based authentication, which is stronger than passwords. Telnet (TCP 23) must be disabled because it sends everything, including passwords, in clear text. Many devices also offer a graphical user interface (GUI) through a web browser; it should be accessed over HTTPS only, never HTTP, and ideally with a CA-issued certificate. A typical hardening of management lines looks like this:",
   "```\nR1(config)# ip domain-name corp.example\nR1(config)# crypto key generate rsa modulus 2048\nR1(config)# ip ssh version 2\nR1(config)# line vty 0 4\nR1(config-line)# transport input ssh\nR1(config-line)# access-class MGMT-ONLY in\nR1(config-line)# login local\n```",
   "APIs, usually REST APIs exchanging JSON over HTTPS, let automation tools and scripts configure and query devices programmatically, which scales far better than manual CLI work across hundreds of devices and underpins infrastructure as code. API access should use tokens or keys with least privilege, stored securely rather than in scripts. The console port provides direct, local access to a device's CLI through a serial connection, using a rollover (console) cable or a USB console cable and a terminal program. It works even when the device has no IP configuration, which is why it is used for initial setup, password recovery and disaster recovery. Protect console access physically, with passwords and with idle timeouts.",
   "A jump box (jump server or bastion host) is a hardened system that administrators must connect to first before reaching management interfaces. Instead of allowing SSH to every device from every laptop, you allow it only from the jump box's address (the ACL in the example above does exactly that). The jump box is tightly controlled, patched, requires MFA and logs or records sessions. This shrinks the attack surface to one well-protected host and creates an audit trail of who did what. In cloud environments the same idea appears as a bastion host in a public subnet giving access to private-subnet servers.",
   "In-band management uses the same network that carries user traffic, for example SSH to a switch's IP address, ideally on a dedicated management VLAN. It is convenient and cheap, but if the network fails, or a change cuts off your own access, you lose management exactly when you need it most. Out-of-band (OOB) management uses a separate path that does not depend on the production network, such as a dedicated management network, a console server (terminal server) connected to many devices' console ports, or a cellular modem at a remote site. OOB lets you fix a router whose misconfiguration cut off its own in-band access. Critical sites commonly have both. Common mistakes: leaving Telnet or HTTP enabled alongside SSH and HTTPS, allowing management from any address, treating a management VLAN as out-of-band (it still rides the production switches), and forgetting that console ports need physical protection.",
   "Exam clue words: 'network is down but you must reach the device' or 'locked yourself out with an ACL' means out-of-band management; 'first-time setup of a new switch with no IP' means console; 'automate configuration of many devices' means API; 'single controlled entry point for admins' means jump box; 'connect branch networks permanently' means site-to-site VPN; 'access web apps from a browser without a client' means clientless VPN; 'encrypted CLI' means SSH."
  ],
  "terms": [
   [
    "Site-to-site VPN",
    "A VPN that persistently connects two networks through their gateways."
   ],
   [
    "Clientless VPN",
    "Remote access through a web browser over TLS without a dedicated VPN client."
   ],
   [
    "SSH",
    "Secure Shell: encrypted remote command-line access on TCP 22, replacing Telnet."
   ],
   [
    "API",
    "Application programming interface: a programmatic way, often REST over HTTPS, for tools to configure and query devices."
   ],
   [
    "Console port",
    "A local serial management port that provides CLI access without needing network connectivity."
   ],
   [
    "Jump box",
    "A hardened intermediary host that administrators must use to access management interfaces of other systems."
   ],
   [
    "Out-of-band management",
    "Managing devices through a separate path independent of the production network, such as a console server."
   ]
  ],
  "example": "An engineer pushes an ACL that accidentally blocks SSH to a remote branch router, locking herself out of in-band management. Because the branch has a console server reachable over an LTE modem, she connects out-of-band, logs in through the router's console port and fixes the ACL, and the branch is back online within minutes. The post-change review adds a step requiring a scheduled automatic rollback when changing management ACLs remotely. It also confirms that routine management must go through the jump box, which records every session.",
  "tip": "If the question says the network is down but you still need to manage the device, the answer is out-of-band management (console server, separate network, cellular). Replace Telnet with SSH and HTTP with HTTPS. A jump box centralizes and audits admin access.",
  "check": [
   [
    "Management traffic uses a dedicated management VLAN on the production switches. Is that out-of-band management? Why or why not?",
    "No. It is still in-band, because it depends on the same switches and links as production; if they fail, management access fails too."
   ],
   [
    "A new switch arrives with a blank configuration. Which access method must you use first, and why?",
    "The console port, because the switch has no IP address or credentials configured yet for SSH, GUI or API access."
   ],
   [
    "Security wants to reduce the number of hosts that can SSH to network devices and keep a record of admin sessions. What design meets both goals?",
    "A jump box: restrict device management ACLs to its address, require MFA on it and log or record the sessions it handles."
   ],
   [
    "A team must change NTP settings on 400 switches consistently. Which management method fits best?",
    "An API or automation tool using the devices' APIs, which applies the change programmatically and consistently rather than logging in to each switch."
   ]
  ]
 },
 {
  "t": "Logical security: encryption in transit and at rest, PKI and certificates, IAM, AAA, MFA, SSO, RADIUS, TACACS+, LDAP, SAML",
  "body": [
   "Logical security uses technology, rather than locks and guards, to protect data and control who can do what. Two pillars run through this lesson: encrypting data so it stays confidential and intact, and managing identities so only the right people and devices get access, with a record of what they did. Network+ tests the vocabulary, the purpose of each protocol and, above all, which one to choose for a given scenario.",
   "Data needs protection in two states. Data in transit is moving across a network; protect it with protocols such as TLS (HTTPS, LDAPS, SMTP with STARTTLS), SSH, IPsec VPNs and WPA3 on wireless. Data at rest is stored on disks, databases, backups, network device flash or removable media; protect it with full-disk encryption, database or file encryption and encrypted backups, so a stolen laptop or drive reveals nothing without the key. Many regulations and standards require both. Key management is the hard part: encrypted data is only as safe as the keys, so keys must be stored securely, rotated and backed up.",
   "Public key infrastructure (PKI) makes encryption and identity work at scale. Asymmetric cryptography gives each entity a key pair: a public key shared freely and a private key kept secret. Data encrypted with one key can only be decrypted with the other, and a signature made with the private key can be verified with the public key. A digital certificate binds a public key to an identity, such as a web server's name, and is signed by a certificate authority (CA) that clients trust. When your browser connects to a site, it checks that the certificate chains up to a trusted root CA, is within its validity dates, matches the site name and has not been revoked (via a certificate revocation list or OCSP). Self-signed certificates are not trusted by default and are common on new devices' management pages, which is why you should replace them with certificates from your own or a public CA. TLS then uses the certificate to agree on fast symmetric session keys.",
   "Identity and access management (IAM) covers creating, managing and removing user and device identities and their permissions throughout their life cycle. AAA is the classic framework: authentication proves who you are, authorization decides what you are allowed to do, and accounting records what you did. Multifactor authentication (MFA) requires factors from different categories: something you know (password, PIN), something you have (phone app, hardware token, smart card) and something you are (fingerprint, face); some definitions add somewhere you are (location). Two passwords, or a password plus a security question, are still one factor. Single sign-on (SSO) lets a user authenticate once and access many applications, improving usability and centralizing control and deprovisioning, though the SSO account becomes very valuable and should be protected with MFA.",
   "Several protocols implement these ideas. RADIUS (Remote Authentication Dial-In User Service) is an open standard used for network access, such as 802.1X Wi-Fi, wired NAC and VPN logins; it uses UDP (1812 for authentication, 1813 for accounting), combines authentication and authorization, and encrypts only the password in its messages. TACACS+ (Terminal Access Controller Access-Control System Plus), originally from Cisco, is favoured for device administration: it uses TCP 49, encrypts the entire payload and separates authentication, authorization and accounting, allowing per-command authorization and command logging for network engineers. LDAP (Lightweight Directory Access Protocol) queries and updates directory services, such as Active Directory, on TCP 389, or LDAPS on TCP 636; RADIUS and TACACS+ servers often check credentials against an LDAP directory behind the scenes.",
   "SAML (Security Assertion Markup Language) is an XML-based standard for web SSO and federation. Here is the flow step by step: a user opens a SaaS application (the service provider); the application redirects the browser to the organization's identity provider; the user signs in there, with MFA; the identity provider returns a digitally signed assertion stating who the user is and perhaps their groups; the browser passes it to the service provider, which verifies the signature and logs the user in. The service provider never sees the password. Newer web and mobile applications often use OAuth and OpenID Connect for similar purposes.",
   "Common mistakes: thinking RADIUS encrypts the whole session (only the password), choosing RADIUS for per-command device authorization (TACACS+ fits better), counting two things you know as MFA, assuming a certificate is valid just because the connection is encrypted (a self-signed or expired certificate still encrypts, but proves nothing about identity), and confusing authentication with authorization. A handy summary: RADIUS for network access, TACACS+ for device administration, LDAP for directory look-ups, SAML for browser-based SSO to cloud applications.",
   "Exam clue words: 'stolen laptop', 'backup tapes' mean data at rest; 'eavesdropping on the wire' means data in transit. 'Trusted third party signs certificates' means CA; 'revoked certificate' means CRL or OCSP. 'Log every command an engineer types', 'TCP 49', 'encrypts entire payload' mean TACACS+; '802.1X', 'Wi-Fi authentication', 'UDP 1812' mean RADIUS; 'directory query', 'port 389' mean LDAP; 'identity provider', 'assertion', 'SSO to SaaS' mean SAML."
  ],
  "terms": [
   [
    "Data at rest",
    "Data stored on disks, databases, backups or media, protected by encryption such as full-disk encryption."
   ],
   [
    "Certificate authority",
    "A trusted entity that issues and signs digital certificates binding public keys to identities."
   ],
   [
    "AAA",
    "Authentication, authorization and accounting: verifying identity, granting permissions and logging activity."
   ],
   [
    "MFA",
    "Multifactor authentication: requiring two or more different types of factor, such as a password and a phone app."
   ],
   [
    "RADIUS",
    "An open AAA protocol for network access using UDP 1812 and 1813 that encrypts only the password."
   ],
   [
    "TACACS+",
    "A AAA protocol on TCP 49 that encrypts the full payload and separates authentication, authorization and accounting."
   ],
   [
    "SAML",
    "An XML-based standard that lets an identity provider send authentication assertions to service providers for SSO."
   ]
  ],
  "example": "Network engineers log in to switches with their own accounts via TACACS+, which authorizes only show commands for junior staff and logs every command anyone types. Employees join Wi-Fi via 802.1X, with the RADIUS server checking their credentials against Active Directory over LDAPS. Staff reach cloud applications through SAML-based SSO with MFA, so disabling one directory account removes access everywhere at once. Laptops use full-disk encryption for data at rest, and the switch management pages use certificates issued by the company's internal CA instead of self-signed ones.",
  "tip": "RADIUS: UDP, network access, encrypts only the password. TACACS+: TCP 49, device administration, encrypts everything, separates the three As. A password plus a security question is not MFA; both are something you know.",
  "check": [
   [
    "Auditors want a record of every configuration command each network engineer runs, with some engineers limited to read-only commands. Which protocol fits and why?",
    "TACACS+, because it separates authorization and accounting, supporting per-command authorization and command logging, and it encrypts the whole payload."
   ],
   [
    "A login requires a password and a code from a hardware token. Is it MFA? What about a password and a PIN?",
    "The password plus token is MFA (something you know plus something you have); a password and a PIN are both something you know, so single-factor."
   ],
   [
    "A browser shows a warning on a switch's HTTPS management page, although the page loads encrypted. What is the likely cause and the proper fix?",
    "The switch uses a self-signed certificate that does not chain to a trusted CA; replace it with a certificate issued by a trusted (internal or public) CA."
   ],
   [
    "When an employee leaves, how does SAML-based SSO make access removal faster and safer?",
    "Disabling the one account at the identity provider stops it from issuing assertions, so access to every federated application ends at once."
   ]
  ]
 },
 {
  "t": "Security principles: least privilege, role-based access, CIA triad, defense in depth, zero trust, segmentation",
  "body": [
   "Security principles are the ideas behind every specific control. Firewalls, VLANs, MFA and encryption are tools; principles tell you why and where to use them. When an exam question describes a situation and asks which principle applies, or which design is best, these concepts are what it is testing. They also help in real work, because when you face an unfamiliar product or situation, you can still reason about it from the principles.",
   "The CIA triad defines what security protects. Confidentiality means only authorized people can read data; controls include encryption, access control and data classification. Integrity means data is accurate and unaltered, whether by attackers or accidents; controls include hashing, digital signatures, checksums and change control. Availability means systems and data are accessible when needed; controls include redundancy, backups, UPS power, patching and DDoS protection. Every attack and control can be mapped to one or more of these. Eavesdropping on a Telnet session hits confidentiality; a tampered configuration or forged DNS answer hits integrity; a DoS attack or a failed power supply hits availability; ransomware hits availability and often confidentiality, if data is stolen first.",
   "The principle of least privilege says every user, service and device should have only the minimum access needed to do its job, and only for as long as needed. It limits the damage from mistakes, compromised accounts and insider threats. Examples: a help desk technician can reset passwords but not change firewall rules; a monitoring server has read-only SNMP access; a service account can read one database, not all of them; an IoT camera can reach only its recorder. Related ideas include separation of duties, so no one person can complete a sensitive task alone (one engineer writes a firewall change, another approves it), just-in-time access for administrator rights, and regular access reviews to remove permissions people no longer need.",
   "Role-based access control (RBAC) makes least privilege manageable by assigning permissions to roles, such as 'network operator' or 'network administrator', and then placing users in roles. When someone changes jobs, you change their role instead of editing dozens of individual permissions, and access stays consistent across people doing the same job. Work through an example: a network team defines three roles. Monitor can run show commands only; Operator can also shut and enable ports and change access VLANs; Administrator can change routing and security configuration. A new junior engineer is placed in Operator; when promoted, she moves to Administrator, and the old permissions disappear automatically. On network devices, RBAC is often enforced through TACACS+ command authorization.",
   "Defense in depth means layering multiple independent controls so that if one fails, others still protect you. A layered network might combine a perimeter firewall, an IPS, network segmentation, NAC on switch ports, host firewalls and endpoint detection, encryption, MFA, logging and monitoring, physical security and user training. Layers should be of different types (physical, technical and administrative) and should not share a single point of failure: two firewalls from the same policy with the same mistake are not really two layers. No single control is perfect; layers buy time and increase the chance of detection.",
   "Zero trust removes implicit trust based on network location. The traditional castle-and-moat model trusted anything inside the perimeter, so an attacker who got in, perhaps through one phishing email, could move freely. Zero trust says 'never trust, always verify': every access request is authenticated and authorized based on identity, device posture and context, with least privilege, and trust is continuously re-evaluated during the session. It assumes a breach may already have happened. Segmentation divides a network into smaller zones with controlled communication between them, using VLANs, subnets, firewalls and ACLs, or in data centres and clouds, microsegmentation down to individual workloads. It limits lateral movement by attackers, contains malware outbreaks, reduces broadcast traffic and helps compliance by isolating sensitive systems; keeping card payment systems in their own zone reduces the scope of a PCI DSS audit. Segmentation is a practical building block of both defense in depth and zero trust.",
   "Common mistakes include confusing least privilege with RBAC (least privilege is the goal; RBAC is a method of achieving it), thinking zero trust means trusting nobody so nothing works (it means verifying explicitly, then granting minimal access), treating a flat network with one strong firewall as defense in depth, and mapping attacks to the wrong CIA element, for example calling a DoS attack a confidentiality problem.",
   "Exam clue words: 'only what is needed for the job' means least privilege; 'permissions by job function' means RBAC; 'no single person can' means separation of duties; 'multiple layers' means defense in depth; 'never trust, always verify', 'regardless of location' mean zero trust; 'limit lateral movement', 'isolate zones' mean segmentation. Match attacks to the triad: disclosure is confidentiality, alteration is integrity, disruption is availability."
  ],
  "terms": [
   [
    "CIA triad",
    "Confidentiality, integrity and availability: the three core goals of information security."
   ],
   [
    "Least privilege",
    "Granting only the minimum access rights needed to perform a task, for only as long as needed."
   ],
   [
    "Separation of duties",
    "Dividing sensitive tasks so no single person can complete them alone."
   ],
   [
    "RBAC",
    "Role-based access control: assigning permissions to roles and users to roles."
   ],
   [
    "Defense in depth",
    "Layering multiple independent security controls so one failure does not expose the system."
   ],
   [
    "Zero trust",
    "A model that grants no implicit trust based on network location and verifies every request by identity and context."
   ],
   [
    "Lateral movement",
    "An attacker moving from one compromised system to others inside a network."
   ]
  ],
  "example": "Ransomware infects a receptionist's PC through a malicious attachment. Because the network is segmented, the reception VLAN cannot reach the finance servers, and because the receptionist's account follows least privilege, it cannot map the file shares used by engineering. The endpoint detection agent isolates the host within minutes, the SIEM alerts the security team, and last night's backups restore the PC. No single control stopped everything, but several layers each limited the damage, which is defense in depth working as intended.",
  "tip": "Map attacks to the triad: DoS hits availability, eavesdropping hits confidentiality, tampering hits integrity. 'Grant only what is needed' is least privilege; 'manage by job function' is RBAC; 'multiple layers' is defense in depth; 'never trust, always verify' is zero trust.",
  "check": [
   [
    "An attacker alters routing updates so traffic is sent to the wrong place, but reads nothing. Which part of the CIA triad is primarily affected?",
    "Integrity, because data (routing information) was altered; availability may also suffer as traffic is misdirected."
   ],
   [
    "A company has one very strong perimeter firewall and a flat internal network. Why does this fall short of defense in depth and zero trust?",
    "It relies on a single layer; once an attacker is inside, nothing limits lateral movement or re-verifies access, which segmentation and zero trust would provide."
   ],
   [
    "How do least privilege and RBAC relate?",
    "Least privilege is the principle of minimal access; RBAC is a practical way to achieve it by defining roles with minimal permissions and assigning users to them."
   ],
   [
    "Why does segmenting payment systems into their own zone help with PCI DSS compliance?",
    "It reduces the scope of the audit to the segmented cardholder data environment instead of the entire network, and limits exposure of card data."
   ]
  ]
 },
 {
  "t": "Physical security, deception technologies (honeypots, honeynets), risk terms, audits and compliance (PCI DSS, GDPR)",
  "body": [
   "If an attacker can touch your equipment, many logical controls can be bypassed: they can plug a device into a switch, reset a router to factory defaults through its console, install a hardware keylogger, or simply steal a server or backup drive. Physical security is therefore the foundation layer of defense in depth. Network+ pairs it with deception technologies that detect intruders, the vocabulary of risk, and the audits and compliance frameworks that require all of these controls.",
   "Physical security controls fall into prevention and detection. Prevention includes locked server rooms and racks, badge readers, keypads, biometric scanners, fences, bollards, lighting and security guards, and access control vestibules (formerly called mantraps): small rooms with two doors where only one can open at a time, which stops tailgating (an unauthorized person following an authorized one through a door). Detection includes cameras (CCTV), motion sensors, door alarms and tamper-evident seals or asset tags that show if equipment has been opened. Logs from badge systems show who entered and when, which supports investigations. Locking equipment cabinets, disabling unused wall jacks and switch ports, and escorting visitors are simple but effective. Staff training matters too, because a polite employee holding a door open defeats an expensive lock.",
   "Deception technologies lure attackers into revealing themselves. A honeypot is a decoy system that looks valuable, such as a fake file server or database, but has no legitimate users, so any interaction with it is suspicious and triggers an alert. That gives defenders a very high-quality signal with few false positives. A honeynet is a network of honeypots that simulates a realistic environment, letting defenders observe attacker tools and techniques in more depth. Related ideas include honeyfiles (decoy documents) and honeytokens (fake credentials or records that alert when used). Deception must be isolated and monitored carefully so it cannot become a launch point into the real network.",
   "Risk management uses precise terms, and exam questions often turn on them. A vulnerability is a weakness, such as unpatched firmware, a default password or an unlocked server room. A threat is anything that could exploit a weakness, such as an attacker, malware, a careless insider or a flood; a threat actor is the person or group behind it. An exploit is the actual technique or code that takes advantage of a vulnerability. Risk combines the likelihood that a threat exploits a vulnerability with the impact if it does. Work through an example: an internet-facing VPN appliance has a known flaw (vulnerability); criminal groups actively scan for it (threat, high likelihood); a breach would expose the whole network (high impact); so the risk is high and patching is urgent. The same flaw on an isolated lab device is a much lower risk.",
   "Organizations respond to risk in four ways: mitigate it (add controls, such as patching or segmentation), transfer it (shift the financial impact, for example by buying cyber insurance or outsourcing), avoid it (stop the risky activity entirely, such as retiring the service) or accept it (formally acknowledge a risk that is too costly to address, with management sign-off). A risk assessment identifies and prioritizes risks. A vulnerability assessment scans for weaknesses without exploiting them. A penetration test, done only with written authorization and agreed scope, tries to exploit weaknesses in a controlled way to show real impact. A posture assessment evaluates the overall security state against a standard or baseline.",
   "Audits check that controls exist and work, and compliance means following laws, regulations and industry standards. PCI DSS (Payment Card Industry Data Security Standard) is an industry standard, not a law, that applies to any organization that stores, processes or transmits payment card data; it requires controls such as firewalls and segmentation of the cardholder data environment, encryption of card data, strong access control, logging, vulnerability management and regular testing. GDPR (General Data Protection Regulation) is a European Union law protecting the personal data of people in the EU, wherever the processing organization is based; it requires lawful processing, data minimization, appropriate security, prompt breach notification to authorities (within 72 hours where feasible) and respect for individuals' rights such as access and erasure. Data locality (data sovereignty) rules restrict where data may be stored physically, which affects cloud region choices. Regular internal and external audits demonstrate compliance.",
   "Common mistakes include swapping threat and vulnerability, calling insurance risk avoidance (it is transference), thinking PCI DSS applies only to banks (it applies to anyone handling card data, including shops and hotels), thinking GDPR applies only to EU companies, and assuming a honeypot is a security control that blocks attacks (it detects and studies them).",
   "Exam clue words: 'tailgating', 'piggybacking' point to access control vestibules, guards and training; 'decoy', 'no legitimate users' mean honeypot; 'network of decoys' means honeynet. 'Weakness' means vulnerability; 'potential danger' means threat; 'code or method used' means exploit; 'likelihood and impact' mean risk. 'Buy insurance' means transfer; 'stop the activity' means avoid. 'Credit card data' means PCI DSS; 'personal data of EU residents' means GDPR; 'where data is stored geographically' means data locality."
  ],
  "terms": [
   [
    "Access control vestibule",
    "A two-door entry space where only one door opens at a time, preventing tailgating."
   ],
   [
    "Honeypot",
    "A decoy system with no legitimate use, designed to attract and detect attackers."
   ],
   [
    "Honeynet",
    "A network of honeypots that simulates a realistic environment to observe attackers."
   ],
   [
    "Vulnerability",
    "A weakness in a system that could be exploited by a threat."
   ],
   [
    "Risk",
    "The combination of the likelihood that a threat exploits a vulnerability and the impact if it does."
   ],
   [
    "PCI DSS",
    "Payment Card Industry Data Security Standard: security requirements for organizations handling payment card data."
   ],
   [
    "GDPR",
    "The EU regulation governing the protection and processing of personal data of people in the EU."
   ]
  ],
  "example": "A hotel chain that processes card payments must meet PCI DSS, so it segments its payment terminals into an isolated network, encrypts card data, restricts access and keeps logs for its annual audit. It also places a honeypot that mimics a reservation database on the corporate network; nobody legitimate ever touches it. One night the honeypot alerts on a login attempt from a staff laptop, revealing malware scanning the network. Because the payment network is segmented, the infection never reaches cardholder data, and the incident report notes which controls worked.",
  "tip": "Vulnerability = weakness, threat = potential danger, exploit = the method used, risk = likelihood times impact. PCI DSS is about card data; GDPR is about personal data of people in the EU. Any traffic to a honeypot is suspicious by definition.",
  "check": [
   [
    "Why does any connection to a honeypot deserve investigation, and why does this make honeypots useful alert sources?",
    "It has no legitimate users or services, so any interaction is likely malicious or a misconfiguration; that means very few false positives."
   ],
   [
    "A company decides a legacy file-transfer service is too risky and shuts it down instead of securing it. Which risk response is this, and how does it differ from buying insurance?",
    "Risk avoidance, because the risky activity is stopped; buying insurance is risk transference, which shifts the financial impact but leaves the risk in place."
   ],
   [
    "A US-based online shop sells to customers in Germany and takes card payments. Which of PCI DSS and GDPR apply?",
    "Both: PCI DSS because it handles card data, and GDPR because it processes personal data of people in the EU."
   ],
   [
    "Two unpatched servers have the same vulnerability, one internet-facing and one on an isolated lab network. Why is the risk different?",
    "Risk depends on likelihood and impact; the internet-facing server is far more likely to be attacked and likely holds more important data, so its risk is higher."
   ]
  ]
 },
 {
  "t": "Network segmentation enforcement for IoT, IIoT, SCADA/ICS/OT, guest and BYOD",
  "body": [
   "Some devices and users should never share a flat network with your critical systems. Internet of Things gadgets, industrial controllers, guests and personal devices each bring different risks, and segmentation lets you connect them while containing those risks. Network+ asks you to recognise these groups, understand why each is risky, and choose the controls that separate them. The underlying idea is least privilege at the network level: every group gets exactly the connectivity it needs and nothing more.",
   "IoT (Internet of Things) devices include smart TVs, IP cameras, thermostats, badge readers, printers, conference room systems and building sensors. They often have weak or hard-coded default passwords, infrequent or no firmware updates, limited processing power for security software and chatty connections to vendor clouds. IIoT (Industrial IoT) applies the same ideas to industrial settings: sensors on factory machines, smart meters, connected medical and logistics equipment. Because these devices are hard to secure individually, the network must protect them from attack and protect everything else from them if they are compromised, for example by a botnet that recruits cameras.",
   "Operational technology (OT) is hardware and software that monitors and controls physical processes. ICS (industrial control systems) is the umbrella term, including PLCs (programmable logic controllers) that directly run machinery. SCADA (supervisory control and data acquisition) systems monitor and control geographically spread processes such as power grids, pipelines and water treatment. OT priorities differ from IT: availability and safety come first, systems may run for decades on old operating systems, and patching or even aggressive scanning can disrupt operations. A compromise can cause physical harm, not just data loss. OT networks should therefore be strongly isolated from the corporate IT network, with traffic passing only through firewalls and tightly controlled points such as a DMZ between IT and OT, jump hosts for remote vendor support and one-way data flows where possible. Some very sensitive systems are air-gapped, with no network connection to other systems at all, though air gaps can be bridged by USB drives and must be protected procedurally.",
   "Guest networks give visitors internet access without access to internal resources. Put guests on their own SSID and VLAN, route them straight to the internet, block access to internal subnets with ACLs or firewall rules, enable client isolation so guests cannot reach each other's devices, rate-limit bandwidth and use a captive portal for terms acceptance. BYOD (bring your own device) covers employees' personal phones and laptops. They are not managed by IT, so they may be unpatched, jailbroken or infected. Common approaches are a separate BYOD VLAN with limited access, NAC posture checks before granting access, and mobile device management (MDM) to enforce policies such as screen locks and encryption, sometimes with containerization separating work data from personal data so the company can wipe only its own data.",
   "The enforcement tools are the same across all these groups: VLANs and separate subnets to divide traffic, ACLs and firewalls between segments with default-deny rules, NAC (including 802.1X, or MAC authentication bypass for devices that cannot do 802.1X) with dynamic VLAN assignment to put each device in the right segment automatically, separate SSIDs for wireless, and monitoring of traffic crossing segment boundaries. Here is an example of an ACL that lets an IoT camera VLAN reach only its video recorder and DNS:",
   "```\nip access-list extended CAMERAS-IN\n permit udp 10.50.0.0 0.0.0.255 host 10.0.0.53 eq 53\n permit tcp 10.50.0.0 0.0.0.255 host 10.0.20.10 eq 554\n deny   ip 10.50.0.0 0.0.0.255 any log\n!\ninterface vlan 50\n ip access-group CAMERAS-IN in\n```",
   "The final deny line with logging makes any attempt by a camera to reach something else visible in the logs, which is an early warning of compromise. Common mistakes include putting IoT devices on the staff VLAN 'temporarily', allowing guest VLANs to reach internal DNS or printers, connecting OT networks directly to IT for convenient remote access, relying on MAC filtering alone (MAC addresses are easily spoofed), and forgetting outbound rules, so a compromised device can still call out to an attacker's server.",
   "Exam clue words: 'cameras, thermostats, smart TVs' mean IoT; 'factory sensors' means IIoT; 'power grid', 'water treatment', 'PLC', 'safety' mean SCADA/ICS/OT, where the answer usually involves strong isolation or an air gap; 'visitors need internet only' means a guest VLAN with ACLs, client isolation and captive portal; 'employees' personal phones' means BYOD with NAC and MDM. When the question asks what enforces segmentation, look for VLANs, ACLs, firewalls and NAC."
  ],
  "terms": [
   [
    "IoT",
    "Internet of Things: everyday devices, such as cameras and sensors, connected to networks."
   ],
   [
    "OT",
    "Operational technology: systems that control physical processes, prioritizing safety and availability."
   ],
   [
    "SCADA",
    "Supervisory control and data acquisition: systems that monitor and control distributed industrial processes."
   ],
   [
    "PLC",
    "Programmable logic controller: an industrial computer that directly controls machinery in an ICS."
   ],
   [
    "Air gap",
    "Complete physical isolation of a system or network from other networks."
   ],
   [
    "Client isolation",
    "A wireless setting that stops devices on the same SSID from communicating directly with each other."
   ],
   [
    "BYOD",
    "Bring your own device: a policy allowing personal devices to access organizational resources."
   ]
  ],
  "example": "A hospital places its infusion pumps and building sensors on IoT VLANs that can reach only their management servers, puts visitors on an internet-only guest VLAN behind a captive portal with client isolation, and uses NAC so staff personal phones land on a BYOD VLAN with access only to email and the intranet. Its heating and power systems sit on a separate OT network reachable only through a firewall and a monitored jump host. When a smart TV in a waiting room is compromised, its attempts to reach the patient records system are blocked and logged by the IoT VLAN's ACL, and the security team replaces it.",
  "tip": "OT and ICS prioritize availability and safety; they need the strongest isolation, even air gaps. Guest and BYOD traffic should go to separate VLANs with internet-only or limited access enforced by ACLs and NAC.",
  "check": [
   [
    "A vendor asks for direct remote access from the internet to a water plant's SCADA controllers for support. What safer design should you propose?",
    "Keep OT isolated and route vendor access through a VPN to a monitored jump host in an IT/OT DMZ, with MFA, time-limited accounts and firewall rules allowing only the needed connections."
   ],
   [
    "Guests on the guest VLAN can reach the internet but can also see a staff printer. Which controls were missed?",
    "ACLs or firewall rules blocking guest access to internal subnets (default deny), and possibly client isolation; guests should reach only the internet."
   ],
   [
    "Why is patching an ICS controller not as simple as patching an office PC?",
    "OT prioritizes availability and safety; patches may need vendor certification and downtime that stops physical processes, so changes are planned carefully and isolation compensates meanwhile."
   ],
   [
    "An IP camera cannot perform 802.1X. How can NAC still place it in the correct VLAN, and what is the weakness?",
    "Using MAC authentication bypass to identify it by MAC address and assign the camera VLAN; the weakness is that MAC addresses can be spoofed, so the VLAN must also be tightly restricted by ACLs."
   ]
  ]
 },
 {
  "t": "Attacks: DoS/DDoS, VLAN hopping, MAC flooding, ARP and DNS poisoning/spoofing, rogue DHCP and APs, evil twin, on-path",
  "body": [
   "To defend a network you must recognise how it is attacked. This lesson explains the network attacks named in the objectives at the level needed to spot, detect and prevent them, not to carry them out. Each one targets a specific weakness, usually a protocol that trusts whatever it hears, and each pairs naturally with a defence covered in the switch security, NAC and hardening lessons. Exam questions typically describe symptoms and ask you to name the attack, or name an attack and ask for the best mitigation.",
   "A denial-of-service (DoS) attack tries to make a service unavailable by exhausting bandwidth, connection tables, CPU or application resources; it attacks availability. A distributed DoS (DDoS) uses many sources at once, usually a botnet of compromised computers and IoT devices, which makes simple source blocking useless. Types include volumetric floods that fill the link, protocol attacks such as SYN floods that exhaust connection state, and application-layer attacks that send expensive requests. Reflection and amplification attacks spoof the victim's address in small requests to open services, such as misconfigured DNS or NTP servers, which then send much larger responses to the victim. Defences include upstream DDoS scrubbing services and CDNs, rate limiting, firewalls with SYN flood protection, not running open resolvers yourself, and a response plan agreed with your ISP, because you cannot filter a flood that has already filled your own link.",
   "VLAN hopping lets traffic escape its VLAN. In switch spoofing, an attacker's device pretends to be a switch and negotiates a trunk with a port left in dynamic trunking mode, gaining access to every VLAN on the trunk. In double tagging, the attacker, sitting in the native VLAN, sends a frame with two 802.1Q tags; the first switch strips the outer tag because it matches the native VLAN, and the next switch reads the inner tag and forwards the frame into the target VLAN. Double tagging is one-way, but that is enough to deliver malicious traffic. Defences: set user ports to access mode, disable trunk negotiation, set the native VLAN to an unused VLAN and tag it, and prune unneeded VLANs from trunks.",
   "MAC flooding sends huge numbers of frames with fake source MAC addresses to fill the switch's MAC address table. When the table is full, the switch cannot learn legitimate addresses and floods unknown unicast frames out of all ports in the VLAN, like a hub, letting the attacker capture traffic. Port security, which limits the number of MAC addresses per port, prevents it. ARP poisoning (ARP spoofing) sends forged ARP replies so that victims associate the attacker's MAC address with the default gateway's IP address, redirecting their traffic through the attacker. Signs include duplicate IP warnings and the gateway's MAC suddenly changing in `arp -a` output. Dynamic ARP inspection blocks it. DNS poisoning or spoofing feeds false DNS answers, either into a resolver's cache or directly to clients, or through a modified hosts file, redirecting users to malicious look-alike sites. DNSSEC, patched and properly configured resolvers and encrypted DNS reduce the risk.",
   "A rogue DHCP server, whether a misconfigured home router or a malicious device, hands out wrong settings, such as an attacker-controlled gateway or DNS server, or causes outages with invalid addresses. DHCP snooping on switches blocks DHCP server messages on untrusted ports. A related attack, DHCP starvation, requests every address in a scope with fake MACs so legitimate clients get none; port security and snooping rate limits help. A rogue access point is an unauthorized access point connected to the wired network, perhaps installed by an employee for convenience, that bypasses wireless security and opens a back door. An evil twin is an attacker's access point that imitates a legitimate SSID so users connect to it, often combined with forged deauthentication frames to push users off the real network. Wireless intrusion prevention systems (WIPS), regular wireless scans, 802.1X with server certificate validation, and WPA3's protected management frames all help.",
   "An on-path attack (formerly called man-in-the-middle) places the attacker between two parties so they can intercept, read or alter traffic. ARP poisoning, rogue DHCP, evil twins and DNS spoofing are all ways to get on-path. Strong encryption with proper certificate validation (TLS, SSH, IPsec VPNs) is the core defence, because even an on-path attacker cannot read or silently modify properly encrypted traffic; the danger comes when users click through certificate warnings. For example, an evil twin in a coffee shop can hand out its own DNS server, send a user's banking request to a fake site and capture credentials, but only if the user clicks through the certificate warning; certificate validation and user training break the chain.",
   "Common mistakes include confusing an evil twin with a rogue access point (the twin impersonates; a rogue is simply unauthorized), assuming DDoS can be fixed at your own firewall alone, thinking VLANs prevent all cross-VLAN attacks without trunk hardening, and naming the wrong defence, such as using DHCP snooping for MAC flooding. Remember that several defences depend on each other: dynamic ARP inspection relies on the DHCP snooping binding table.",
   "Exam clue words: 'service unavailable from many sources' means DDoS; 'small queries, huge responses' means amplification; 'access to other VLANs', 'two tags', 'trunk negotiation' mean VLAN hopping; 'switch acts like a hub', 'CAM table full' mean MAC flooding; 'gateway MAC changed', 'duplicate IP' mean ARP poisoning; 'users sent to fake site despite correct URL' means DNS poisoning; 'wrong IP range from DHCP' means rogue DHCP; 'same SSID, different BSSID' means evil twin; 'intercepts traffic between two parties' means on-path."
  ],
  "terms": [
   [
    "DDoS",
    "Distributed denial of service: an attack from many sources that overwhelms a target's resources."
   ],
   [
    "Amplification attack",
    "A reflection attack in which small spoofed requests make third-party servers send much larger responses to the victim."
   ],
   [
    "Double tagging",
    "A VLAN hopping technique using two 802.1Q tags to reach a VLAN through the native VLAN."
   ],
   [
    "MAC flooding",
    "Filling a switch's MAC address table with fake entries so it floods traffic out all ports."
   ],
   [
    "ARP poisoning",
    "Sending forged ARP messages to link an attacker's MAC with another host's IP, redirecting traffic."
   ],
   [
    "Evil twin",
    "A malicious access point that impersonates a legitimate wireless network."
   ],
   [
    "On-path attack",
    "An attack where the adversary intercepts, and possibly alters, communication between two parties."
   ]
  ],
  "example": "Users on one floor suddenly get addresses in 192.168.0.x instead of 10.20.x.x and cannot reach internal servers. The network team traces the offers to a port where an employee plugged in a home router with its DHCP server enabled. They remove it and enable DHCP snooping on the floor's switches, trusting only the uplink ports, so any future rogue DHCP offers are dropped. With the snooping binding table in place, they also enable dynamic ARP inspection, closing off ARP poisoning on the same VLANs.",
  "tip": "Pair each attack with its defence: MAC flooding with port security; ARP poisoning with dynamic ARP inspection; rogue DHCP with DHCP snooping; VLAN hopping with disabling trunk negotiation and changing the native VLAN; evil twin with 802.1X and WIPS.",
  "check": [
   [
    "A packet capture on an ordinary access port suddenly shows other users' unicast traffic, and the switch's MAC table is full of random addresses. What attack is this and what stops it?",
    "MAC flooding; the full table makes the switch flood frames like a hub. Port security limiting MAC addresses per port prevents it."
   ],
   [
    "Several users' `arp -a` output shows the default gateway's IP mapped to the MAC address of a workstation. What is happening and which feature blocks it?",
    "ARP poisoning, putting the workstation on-path; dynamic ARP inspection, using the DHCP snooping binding table, drops the forged ARP replies."
   ],
   [
    "A wireless scan shows the corporate SSID advertised by an unknown BSSID with a strong signal in the car park. Is this a rogue AP or an evil twin, and what protects users?",
    "An evil twin, because it impersonates the legitimate SSID; 802.1X with server certificate validation, WPA3 protected management frames and WIPS detection protect users."
   ],
   [
    "Why can't an organization defeat a large volumetric DDoS attack using only its own edge firewall?",
    "The flood saturates the internet link before traffic reaches the firewall; mitigation must happen upstream, with the ISP or a DDoS scrubbing service or CDN."
   ]
  ]
 },
 {
  "t": "Social engineering: phishing, dumpster diving, shoulder surfing, tailgating; malware",
  "body": [
   "Social engineering attacks people rather than technology. It is often easier to trick someone into giving up a password, approving a payment or opening a door than to break encryption, so attackers exploit trust, helpfulness, fear, curiosity, authority and urgency. Many serious breaches begin with a single convincing email. Technical controls help, but awareness training, clear procedures and a culture where people feel safe reporting mistakes are the main defence. Network+ expects you to identify each technique from a description and pick sensible countermeasures, and to recognise the main types of malware that social engineering delivers.",
   "Phishing uses fraudulent messages, usually email, that impersonate a trusted party to make the victim click a malicious link, open an infected attachment or enter credentials on a fake login page. Warning signs include urgent or threatening language, unexpected attachments, mismatched or look-alike sender domains, requests to bypass normal procedures and links whose real destination differs from the displayed text. Variants are named by channel or target: spear phishing targets specific individuals with personalized details gathered from social media or company websites; whaling targets executives; business email compromise impersonates executives or suppliers to redirect payments; vishing uses voice calls, for example a fake help desk asking for a password; smishing uses SMS text messages. Defences include email filtering, SPF, DKIM and DMARC to detect spoofed senders, marking external emails, MFA so stolen passwords are less useful, an easy 'report phishing' button and regular simulated phishing exercises.",
   "Several techniques need no technology at all. Dumpster diving means searching rubbish for useful information: printed network diagrams, password notes, invoices, organization charts or discarded drives. Defences are cross-cut shredding, locked secure-disposal bins and proper media sanitization. Shoulder surfing is watching someone enter a password or view sensitive data, in person or through a camera; privacy screens, careful positioning of monitors and PIN pads, and awareness reduce it. Tailgating is following an authorized person through a secure door without badging in; piggybacking is similar but with the person's consent, for example someone holding the door out of politeness. Access control vestibules, guards, turnstiles and a culture where challenging unbadged people is normal all help. Impersonation, such as posing as a delivery driver or IT contractor, often supports these attacks.",
   "Malware is malicious software, and social engineering is one of the main ways it gets in. Know the types by behaviour. A virus attaches to files or programs and spreads when they are run or shared, so it needs user action. A worm spreads by itself across the network by exploiting vulnerabilities, which is why segmentation and patching matter so much. A Trojan horse pretends to be legitimate software while hiding a malicious function; a remote access Trojan (RAT) gives an attacker ongoing control. Ransomware encrypts data and demands payment for the key, and modern groups often steal data first to threaten publication (double extortion). Spyware secretly monitors activity; a keylogger records keystrokes to capture passwords. A rootkit hides deep in the operating system or firmware to conceal itself and other malware. Adware shows unwanted advertising. A logic bomb triggers when a condition is met, such as a date or an employee's account being disabled. A botnet is a network of infected machines controlled by an attacker through command-and-control (C2) servers, often used for DDoS, spam or credential stuffing.",
   "Walk through a typical attack chain to see how these connect. An attacker researches a finance clerk on a professional networking site, sends a spear-phishing email that appears to come from a known supplier, and attaches an 'invoice' that is really a Trojan. When opened, it installs a RAT that calls out to a C2 server, a keylogger captures the clerk's password, and the attacker later deploys ransomware across reachable file shares. Every step offers a chance to stop it: training to spot the email, filtering to block the attachment, endpoint protection to catch the Trojan, egress monitoring to spot C2 traffic, MFA to make the captured password useless, segmentation and least privilege to limit what ransomware can reach, and backups to recover.",
   "Defences against malware therefore form layers: endpoint protection or EDR (endpoint detection and response) on hosts, email and web filtering, prompt patching of operating systems, applications and firmware, least privilege so users cannot install software freely, application allow-listing, segmentation to slow worms, DNS filtering and network monitoring for C2 traffic, and tested offline or immutable backups so ransomware does not force you to pay. Train users to report, not hide, suspicious events; fast reporting shortens incidents dramatically.",
   "Common mistakes include confusing tailgating (no consent) with piggybacking (consent), calling any malware a virus, thinking a worm needs someone to open a file, and assuming technical controls alone stop social engineering. Another trap is the channel: a phone call is vishing, not phishing, and a text message is smishing. For malware questions, focus on the behaviour described rather than the name the attacker used.",
   "Exam clue words: 'email with urgent link' means phishing; 'targeted using personal details' means spear phishing; 'CEO targeted' means whaling; 'phone call' means vishing; 'text message' means smishing; 'going through the trash' means dumpster diving; 'watching someone type' means shoulder surfing; 'following through a door' means tailgating. 'Spreads without user action' means worm; 'disguised as useful software' means Trojan; 'encrypts files and demands payment' means ransomware; 'hides its presence' means rootkit; 'records keystrokes' means keylogger; 'many infected machines controlled centrally' means botnet."
  ],
  "terms": [
   [
    "Phishing",
    "Fraudulent messages impersonating a trusted party to steal credentials or deliver malware."
   ],
   [
    "Spear phishing",
    "A targeted phishing attack tailored to a specific person or group."
   ],
   [
    "Tailgating",
    "Following an authorized person into a secure area without their knowledge or without badging in."
   ],
   [
    "Worm",
    "Self-replicating malware that spreads across networks without user action."
   ],
   [
    "Trojan horse",
    "Malware disguised as legitimate software that hides a malicious function."
   ],
   [
    "Ransomware",
    "Malware that encrypts or steals data and demands payment for its release."
   ],
   [
    "Rootkit",
    "Malware that hides itself deep in the operating system to maintain concealed access."
   ]
  ],
  "example": "An accounts clerk receives an urgent email that appears to come from the CEO asking for an immediate payment to a new supplier before the end of the day. The display name is right, but the sender's domain is misspelled by one letter and the request bypasses the usual approval process. Having completed phishing training, she calls the CEO on the number in the company directory, confirms the email is fake and reports it with the phishing button. The security team blocks the look-alike domain, finds the same email sent to three colleagues and removes it from their inboxes before anyone acts on it.",
  "tip": "Distinguish by delivery: phishing = email, vishing = voice, smishing = SMS, whaling = executives. Distinguish malware by behaviour: a worm self-propagates, a virus needs a host file and user action, a Trojan disguises itself.",
  "check": [
   [
    "Malware appears on dozens of unpatched servers overnight, though no user opened anything. Is it more likely a virus or a worm, and which controls would have limited it?",
    "A worm, because it spread by itself by exploiting a vulnerability; patching and network segmentation would have limited its spread."
   ],
   [
    "An employee politely holds a secure door open for a stranger carrying boxes. What is this called, and what controls address it?",
    "Piggybacking (tailgating with consent); access control vestibules, guards and training that makes challenging strangers normal address it."
   ],
   [
    "A user's password was captured by a fake login page, but the attacker still could not sign in. Which control most likely prevented access?",
    "Multifactor authentication, because the stolen password alone was not enough without the second factor."
   ],
   [
    "Why are offline or immutable backups an important defence against ransomware?",
    "Ransomware often tries to encrypt or delete reachable backups; offline or immutable copies survive, letting you restore without paying."
   ]
  ]
 },
 {
  "t": "Device hardening: disable unused ports and services, change default passwords, secure management protocols",
  "body": [
   "Hardening means reducing a device's attack surface by removing anything unnecessary and securing what remains. Network devices ship configured for easy setup, not for security: default accounts, convenient but insecure services and every port ready to use. Hardening is one of the first jobs after deployment, and it should be captured in your golden configuration so every device gets the same protection and configuration monitoring can detect when it drifts. Industry benchmarks and vendor hardening guides provide checklists to follow.",
   "Start with defaults. Default usernames and passwords for devices are widely published, so attackers and automated botnets try them first. Change every default credential at installation, use strong unique passwords stored in a password manager or vault, and prefer individual accounts through central AAA (RADIUS or TACACS+) so actions are attributable and access can be revoked per person. Keep a local emergency account with a strong password in case the AAA server is unreachable. Also change or remove default SNMP community strings such as 'public' and 'private', and store passwords in the configuration using strong hashing rather than weak reversible encoding.",
   "Disable what you do not use. Unused switch ports should be administratively shut down and placed in an unused VLAN (sometimes called a parking lot or black hole VLAN), so plugging into a spare wall jack gives an intruder nothing even if the port is re-enabled by mistake. Disable unneeded services: depending on the platform these may include HTTP management, Telnet, unused discovery protocols such as CDP or LLDP on untrusted or internet-facing ports, legacy small servers, and remote management features you do not use. Each running service is a potential vulnerability. Avoid using the default VLAN 1 for users and management. Here is what part of a hardened access switch configuration can look like:",
   "```\nusername netadmin privilege 15 secret <strong-password>\naaa new-model\naaa authentication login default group tacacs+ local\nno ip http server\nip http secure-server\nsnmp-server group MONITOR v3 priv read MON-VIEW\nlogin block-for 120 attempts 5 within 60\nbanner login ^Authorized access only. Activity is logged.^\ninterface range g1/0/20 - 48\n switchport access vlan 999\n shutdown\nline vty 0 4\n transport input ssh\n access-class MGMT-ONLY in\n exec-timeout 10 0\n```",
   "Use secure management protocols. Replace Telnet with SSH version 2, HTTP with HTTPS, SNMPv1 and v2c with SNMPv3 using authPriv, FTP and TFTP with SFTP or SCP for configuration and firmware transfers, and plain LDAP with LDAPS. Restrict management access so it is allowed only from a management network or jump box, using ACLs on the management plane (the access-class on the VTY lines above). Configure idle session timeouts, login banners with legal warnings, limits on failed login attempts (the login block-for line) and logging of all management sessions to a syslog server. Where possible, put management interfaces on a dedicated management VLAN or out-of-band network.",
   "Keep firmware updated through a controlled patch process, because hardening settings cannot fix a known vulnerability in old code. Verify firmware integrity with the vendor's hash before installing it. Enable NTP so logs have accurate time, and send logs to a central collector. Back up the hardened configuration and use configuration monitoring to detect drift. Hardening applies to servers, endpoints and cloud services too: remove unnecessary software, enable host firewalls, apply patches and follow a benchmark. Vulnerability scans after hardening confirm that nothing unexpected is still exposed, for example an authorized nmap scan showing that only TCP 22 and 443 answer on a switch's management address.",
   "Common mistakes include changing the admin password but leaving SNMP 'public' enabled, disabling Telnet in one place but leaving it allowed on some VTY lines, shutting unused ports but leaving them in the user VLAN, relying on a single shared admin account for everyone, and hardening a device once but never checking it again. Another is breaking management access by applying a restrictive ACL remotely without a rollback plan or out-of-band access.",
   "Exam questions usually offer several plausible actions and ask for the best hardening step. Clue words: 'default credentials', 'admin/admin' mean change default passwords; 'spare wall jacks', 'unused ports' mean shut down and move to an unused VLAN; 'clear text management' means SSH, HTTPS, SNMPv3 or SFTP; 'reduce attack surface' means disable unneeded services; 'limit who can manage' means management ACLs and a jump box; 'attributable admin actions' means individual AAA accounts."
  ],
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface by removing unnecessary functions and securing configurations."
   ],
   [
    "Attack surface",
    "The total set of points where an attacker could try to enter or extract data from a system."
   ],
   [
    "Default credentials",
    "Factory-set usernames and passwords that are publicly known and must be changed at installation."
   ],
   [
    "Parking lot VLAN",
    "An unused, isolated VLAN assigned to disabled ports so they give no network access if enabled."
   ],
   [
    "SNMPv3 authPriv",
    "The SNMPv3 security level that provides both authentication and encryption."
   ],
   [
    "Management ACL",
    "An access list restricting which source addresses may reach a device's management interfaces."
   ],
   [
    "Login banner",
    "A legal warning shown before login stating that access is restricted and monitored."
   ]
  ],
  "example": "A new batch of 20 access switches arrives. Before deployment, the technician applies the golden config: default admin passwords replaced with TACACS+ logins and a vaulted emergency account, Telnet and HTTP disabled in favour of SSH and HTTPS, SNMPv3 with authPriv configured, management limited to the jump box subnet, unused ports shut down and moved to VLAN 999, and logging sent to the syslog server with NTP enabled. An authorized scan of each switch's management address confirms only SSH and HTTPS respond. The configuration monitoring tool now compares every switch to this template nightly.",
  "tip": "The most common hardening answers: change default credentials, disable unused ports and services, and replace insecure protocols with secure ones (Telnet to SSH, HTTP to HTTPS, SNMPv1/v2c to SNMPv3, FTP/TFTP to SFTP/SCP).",
  "check": [
   [
    "A switch's unused ports are shut down but left in the user VLAN. Why is moving them to an unused VLAN still worthwhile?",
    "If a port is re-enabled by mistake or by an attacker with some access, it lands in an isolated VLAN with no services instead of the user network."
   ],
   [
    "A scan of a router shows TCP 22, 23 and 443 open. Which should be closed and why?",
    "TCP 23 (Telnet), because it sends credentials and sessions in clear text; SSH on 22 and HTTPS on 443 provide encrypted management."
   ],
   [
    "Why is it important to keep a local emergency account when using TACACS+ for device logins?",
    "If the TACACS+ server is unreachable, administrators can still log in locally to fix the problem; the account should have a strong, vaulted password."
   ],
   [
    "After hardening, how can you verify that no unexpected services remain exposed?",
    "Run an authorized vulnerability or port scan against the device's addresses and compare the results with the intended services."
   ]
  ]
 },
 {
  "t": "Switch security: port security, DHCP snooping, dynamic ARP inspection, BPDU guard",
  "body": [
   "Access switches are where users and devices plug in, so they are the natural place to stop Layer 2 attacks before they spread. Layer 2 protocols such as ARP and DHCP were designed for trusting environments and believe whatever they hear, which attackers exploit. Four features work together to close these gaps, and Network+ expects you to know which one stops which attack, how they depend on each other and what their violation behaviour looks like when you are troubleshooting.",
   "Port security limits which and how many MAC addresses can use a switch port. You can set a maximum number of addresses (for example one for a PC, or two for a phone with a PC behind it), statically define allowed MACs, or use sticky learning, where the switch learns the first MAC addresses it sees and saves them to the running configuration. When a violation occurs, the port takes an action: protect (silently drop the offending frames), restrict (drop them and log and count the violation) or shutdown (put the port into an err-disabled state, the usual default). Port security defeats MAC flooding and stops users from plugging in unauthorized switches or swapping devices. MAC addresses can be spoofed, so port security is a basic control, not strong authentication; 802.1X is stronger.",
   "DHCP snooping protects against rogue DHCP servers. You mark the ports that lead to legitimate DHCP servers or relays, usually uplinks, as trusted; all other ports are untrusted. The switch drops DHCP server messages (offers and acknowledgements) arriving on untrusted ports, so a rogue server plugged into a user port cannot hand out addresses. DHCP snooping can also rate-limit DHCP requests on untrusted ports to resist starvation attacks. As a bonus, it builds a binding table recording which MAC address received which IP address on which port and VLAN, and for how long.",
   "Dynamic ARP inspection (DAI) uses that DHCP snooping binding table to stop ARP poisoning. On untrusted ports, the switch checks each ARP message against the table; if a host claims an IP-to-MAC mapping it was not assigned, for example pretending to be the default gateway, the switch drops the packet and logs it. Devices with static addresses have no DHCP binding, so they need static entries or ARP ACLs, or their legitimate ARP traffic will be dropped. A related feature, IP source guard, uses the same table to block packets with spoofed source IP addresses. The dependency matters: enable DHCP snooping first, or DAI has nothing to check against.",
   "BPDU guard protects the spanning tree. Access ports connected to end devices are configured as edge ports with PortFast so they come up immediately. End devices never send BPDUs, so if one arrives on such a port, someone has connected a switch or something is misbehaving. BPDU guard err-disables the port instantly, preventing loops and stopping an attacker from trying to become the root bridge. Root guard is a related feature for ports that may connect to switches but must never lead toward the root. Here is an access-layer configuration combining all four features:",
   "```\nip dhcp snooping\nip dhcp snooping vlan 10,20\nip arp inspection vlan 10,20\ninterface g1/0/48\n description Uplink to distribution\n ip dhcp snooping trust\n ip arp inspection trust\ninterface range g1/0/1 - 24\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security violation restrict\n switchport port-security mac-address sticky\n spanning-tree portfast\n spanning-tree bpduguard enable\n```",
   "An err-disabled port stays down until an administrator re-enables it (with `shutdown` then `no shutdown`) or an automatic recovery timer does, so you will often meet this state while troubleshooting: `show interfaces status` shows the port as err-disabled, and the log names the feature that triggered it, such as a port security violation or a BPDU guard event. Always find and remove the cause before re-enabling. Common mistakes: forgetting to trust the uplink, so legitimate DHCP offers are dropped and every client gets an APIPA address; enabling DAI without DHCP snooping; setting the port security maximum to one on ports with IP phones and PCs; and enabling BPDU guard on ports that legitimately connect to other switches.",
   "Exam questions map attacks to features. 'Thousands of MAC addresses on one port', 'switch floods like a hub' mean port security. 'Clients getting the wrong IP range or gateway' means DHCP snooping. 'Gateway MAC spoofed', 'on-path via ARP' mean dynamic ARP inspection. 'User connected a small switch', 'port err-disabled after plugging in a device', 'rogue switch trying to become root' mean BPDU guard (or root guard). 'DAI depends on which feature?' is DHCP snooping."
  ],
  "terms": [
   [
    "Port security",
    "A switch feature that limits and controls the MAC addresses allowed on a port."
   ],
   [
    "Sticky MAC",
    "A port security option where the switch learns and saves allowed MAC addresses dynamically."
   ],
   [
    "Violation mode",
    "The action port security takes on a violation: protect, restrict or shutdown."
   ],
   [
    "DHCP snooping",
    "A switch feature that permits DHCP server messages only on trusted ports and builds a binding table."
   ],
   [
    "Dynamic ARP inspection",
    "A switch feature that validates ARP packets against trusted bindings to prevent ARP poisoning."
   ],
   [
    "BPDU guard",
    "A feature that err-disables an edge port if it receives a BPDU."
   ],
   [
    "Err-disabled",
    "A port state where the switch has shut the port down due to a detected error or violation."
   ]
  ],
  "example": "An intern connects a small switch under his desk to add a second PC. The access port has BPDU guard enabled, and the small switch sends BPDUs, so the port immediately goes err-disabled and both PCs lose connectivity. The help desk sees the log message naming BPDU guard, removes the switch, re-enables the port and explains the policy. The following week, the same floor's DAI logs show dropped ARP replies from one laptop claiming to be the gateway, and the security team finds and cleans malware on it before any traffic was intercepted.",
  "tip": "Attack to defence: MAC flooding -> port security; rogue DHCP -> DHCP snooping; ARP poisoning -> dynamic ARP inspection (which depends on DHCP snooping); rogue switch or loop on an edge port -> BPDU guard.",
  "check": [
   [
    "After enabling DHCP snooping on an access switch, every client gets a 169.254 address. What was most likely missed?",
    "The uplink toward the DHCP server or relay was not marked as trusted, so the switch dropped the legitimate DHCP offers."
   ],
   [
    "A desk has an IP phone with a PC plugged into it, and the port err-disables whenever both are on. Port security is set to maximum 1. What should change?",
    "Raise the maximum to 2 (or more if needed) so both the phone's and the PC's MAC addresses are allowed."
   ],
   [
    "DAI is enabled and a server with a static IP suddenly cannot communicate. Why?",
    "It has no DHCP snooping binding, so DAI drops its ARP messages; add a static binding or ARP ACL for it, or trust the port if appropriate."
   ],
   [
    "Which violation mode would you choose if you want to block unauthorized devices but keep the legitimate device working and log the event?",
    "Restrict, which drops frames from unauthorized MACs and logs the violation without shutting down the whole port."
   ]
  ]
 },
 {
  "t": "Network access control: 802.1X, MAC filtering, key management",
  "body": [
   "Network access control (NAC) decides whether a device may connect to the network, and to which part, before it gets access. Instead of trusting anything plugged into a wall jack or joined to Wi-Fi, NAC checks who or what the device is, and often whether it meets security policy, then allows, restricts or denies it. It turns every access port and SSID into a checkpoint, which supports zero trust and segmentation. Network+ focuses on 802.1X, the weak but common alternative of MAC filtering, and the key management that keeps credentials and encryption trustworthy.",
   "IEEE 802.1X is port-based network access control for wired and wireless networks. It has three roles. The supplicant is software on the client that provides credentials. The authenticator is the switch or wireless access point, which initially blocks all traffic from the port except authentication messages. The authentication server, usually RADIUS, checks the credentials, often against a directory such as Active Directory. The protocol between them is EAP (Extensible Authentication Protocol): EAP over LAN (EAPoL) runs between supplicant and authenticator, and EAP is carried inside RADIUS from authenticator to server. EAP methods vary: EAP-TLS uses certificates on both sides and is the strongest; PEAP and EAP-TTLS wrap password authentication inside a TLS tunnel that the server's certificate protects.",
   "Walk through a wired login. A laptop is plugged in and the switch port comes up in an unauthorized state, passing only EAPoL. The switch asks for an identity; the laptop's supplicant responds, and the switch relays the conversation to RADIUS. The RADIUS server presents its certificate, the laptop validates it and proves its own identity with a certificate or password. The server returns Access-Accept, which can include attributes telling the switch to place the device in a specific VLAN or apply a downloadable ACL; this is dynamic VLAN assignment. The port becomes authorized, and the laptop then requests an address through DHCP in its assigned VLAN. If authentication fails, the port stays closed or places the device in a restricted guest VLAN.",
   "Many NAC solutions add posture assessment: before full access, the system checks whether the device has up-to-date antivirus, patches, disk encryption and a firewall enabled, perhaps via a persistent or temporary agent. Non-compliant devices are placed in a quarantine or remediation VLAN where they can reach update servers only, then re-checked. Devices that cannot run a supplicant, such as printers, cameras and badge readers, often use MAC authentication bypass (MAB): the switch sends the device's MAC address to the RADIUS server as its identity, profiling confirms it looks like the expected device type, and it is placed in a suitable restricted VLAN. Guest devices may be redirected to a captive portal.",
   "MAC filtering allows or denies devices based on their MAC address, on a switch port or a wireless access point. It is simple, but it is weak: MAC addresses are sent in the clear in every frame and are easily spoofed, and maintaining allow lists does not scale. Treat MAC filtering as a minor supplementary control, never as authentication. Modern phones and laptops also randomize their Wi-Fi MAC addresses for privacy, which further complicates MAC-based rules; organizations often ask users to disable randomization for the corporate SSID or, better, move to 802.1X.",
   "Key management is the handling of cryptographic keys through their life cycle: generation, distribution, storage, rotation, revocation and destruction. In networking it applies to wireless pre-shared keys, 802.1X certificates, VPN keys, SSH host and user keys, SNMPv3 keys and TLS certificates. Good practice includes generating strong random keys, storing private keys securely (for example in hardware security modules or protected key stores, never in email or shared documents), rotating keys and PSKs regularly and immediately when someone with access leaves, tracking certificate expiry dates so they do not lapse and cause outages, and revoking keys or certificates that are compromised. One reason enterprises prefer 802.1X over a shared PSK is key management: each user or device has its own credentials and session keys, so revoking one does not disrupt everyone.",
   "Common mistakes include mixing up the 802.1X roles (the switch is the authenticator, not the authentication server), treating MAC filtering as secure, letting the RADIUS server's certificate expire so every 802.1X login fails at once, not validating the server certificate on clients (which enables evil twin credential theft), and placing MAB devices in a broad VLAN where a spoofed MAC gains wide access.",
   "Exam clue words: 'port blocked until user authenticates', 'EAP', 'RADIUS' mean 802.1X; 'client software' means supplicant; 'switch or AP' means authenticator; 'check antivirus before access' means posture assessment; 'quarantine VLAN' means remediation; 'printer cannot do 802.1X' means MAB; 'easily spoofed' means MAC filtering; 'rotate', 'revoke', 'expire', 'store securely' mean key management."
  ],
  "terms": [
   [
    "NAC",
    "Network access control: technology that checks identity and policy before granting a device network access."
   ],
   [
    "Supplicant",
    "The client software that requests network access and provides credentials in 802.1X."
   ],
   [
    "Authenticator",
    "The switch or access point that enforces 802.1X by relaying authentication and controlling port access."
   ],
   [
    "EAP",
    "Extensible Authentication Protocol: the framework carrying 802.1X authentication methods such as EAP-TLS and PEAP."
   ],
   [
    "Posture assessment",
    "Checking a device's security state, such as patches and antivirus, before granting network access."
   ],
   [
    "MAB",
    "MAC authentication bypass: using a device's MAC address as its identity for devices that cannot do 802.1X."
   ],
   [
    "Key rotation",
    "Replacing cryptographic keys periodically or after potential exposure to limit risk."
   ]
  ],
  "example": "At a university, a student plugs a laptop into a lab port. The switch holds the port closed while the laptop's supplicant authenticates to RADIUS with the student's credentials inside PEAP. The NAC server's posture check finds antivirus definitions are months old and assigns a remediation VLAN that can reach only update servers; once updated, the laptop is re-checked and moved to the student VLAN automatically. The lab printers use MAB and land in a printer VLAN that can accept print jobs but reach nothing else, and the IT team tracks the RADIUS server certificate's expiry date in its calendar.",
  "tip": "In 802.1X: supplicant = client, authenticator = switch or AP, authentication server = RADIUS. MAC filtering is easily bypassed by spoofing and is not real authentication.",
  "check": [
   [
    "One morning every 802.1X user fails to authenticate, while MAB devices still work. What key management issue could cause this?",
    "The RADIUS server's certificate may have expired, so clients reject the TLS tunnel for EAP; tracking and renewing certificates before expiry prevents it."
   ],
   [
    "An attacker unplugs a printer and plugs a laptop into its port, spoofing the printer's MAC. What does MAB give them, and how do you limit the damage?",
    "The printer's network access; limit it by placing MAB devices in tightly restricted VLANs with ACLs and using profiling to detect a laptop behaving unlike a printer."
   ],
   [
    "In an 802.1X login on a wireless network, which device relays EAP messages to the RADIUS server?",
    "The access point (or wireless controller) acting as the authenticator."
   ],
   [
    "A laptop authenticates successfully but lands in a quarantine VLAN. What most likely happened?",
    "It failed posture assessment, for example out-of-date antivirus or missing patches, so NAC restricted it to remediation until it complies."
   ]
  ]
 },
 {
  "t": "Security rules: ACLs, implicit deny, URL and content filtering, zones and screened subnets",
  "body": [
   "Security rules decide what traffic is permitted between parts of a network. They appear as access control lists on routers and switches, as policies on firewalls and cloud security groups, and as filters on web proxies and secure web gateways. Writing them correctly, and understanding exactly how they are processed, is essential for both the exam and real life, because a single rule in the wrong place can either expose a server to the internet or cut off an entire office.",
   "An access control list (ACL) is an ordered list of permit and deny statements. Each rule matches criteria such as source and destination IP address, protocol and port numbers. On Cisco-style devices, a standard ACL filters only on source address, while an extended ACL matches source, destination, protocol and ports; a common guideline is to place extended ACLs close to the source, so unwanted traffic is dropped early, and standard ACLs close to the destination, so they do not block the source from reaching other places. ACLs are applied to an interface in a direction, inbound or outbound, and only one ACL per interface, per direction, per protocol applies. Cisco ACLs use wildcard masks, the inverse of subnet masks, so 0.0.0.255 matches a /24.",
   "Order matters enormously. The device reads rules from top to bottom and acts on the first match; later rules are not checked. So specific rules must come before general ones: if 'permit ip any any' is first, nothing after it matters. At the end of every ACL is an invisible implicit deny: any traffic that matches no rule is dropped. That makes ACLs and firewalls default-deny by design, which is secure, but it also means that an ACL containing only deny statements blocks everything, because the traffic you meant to allow never gets an explicit permit. Many administrators add an explicit deny with logging at the end so they can see what is being dropped. Stateful firewalls track sessions, so you usually write rules only for the initiating direction; stateless ACLs need return traffic considered too.",
   "Here is a worked example. Web servers sit on 10.0.20.0/24. Staff on 10.0.10.0/24 should reach them on HTTPS only, the monitoring server 10.0.0.21 should ping them, and one compromised host, 10.0.10.66, must be blocked entirely. The deny for the single host must come first, or the broader staff permit would match it:",
   "```\nip access-list extended TO-WEB\n 10 deny   ip host 10.0.10.66 any log\n 20 permit tcp 10.0.10.0 0.0.0.255 10.0.20.0 0.0.0.255 eq 443\n 30 permit icmp host 10.0.0.21 10.0.20.0 0.0.0.255 echo\n 40 deny   ip any any log\n!\ninterface vlan 20\n ip access-group TO-WEB out\n```",
   "Content-level filtering goes beyond addresses and ports. URL filtering allows or blocks web access by site address or by category, such as gambling, malware or newly registered domains, usually on a proxy, next-generation firewall or secure web gateway. Content filtering inspects what is actually transferred, blocking risky file types, malware, or data matching sensitive patterns such as card numbers. Because most web traffic is encrypted, deep inspection often requires TLS inspection, which decrypts and re-encrypts traffic using a trusted internal certificate; it raises privacy and legal considerations (banking and health sites are often exempted) that should be covered by policy.",
   "Firewalls organize interfaces into security zones with different trust levels, such as inside (trusted), outside (untrusted internet), guest, and one or more zones in between. Policies control traffic between zones rather than between individual interfaces. A screened subnet, previously called a DMZ (demilitarized zone), is a zone for servers that must be reachable from the internet, such as public web servers, mail relays or external DNS. Internet users can reach only specific services in the screened subnet, and servers there have very limited, explicitly permitted access to the internal network. If a public server is compromised, the attacker is still separated from internal systems. A screened subnet can be built with one firewall with three interfaces or with two firewalls in series. Keep rule sets documented, reviewed and cleaned up regularly, because old unused rules accumulate and create unexpected openings; rules should have owners and expiry dates where possible.",
   "Common mistakes include placing a broad permit above a specific deny, forgetting the implicit deny when adding a single deny rule, applying an ACL in the wrong direction or on the wrong interface, confusing wildcard masks with subnet masks, and putting public servers on the internal network with a port forward instead of in a screened subnet. Exam clue words: 'first match', 'top-down' mean ACL processing order; 'traffic not matching any rule' means implicit deny; 'block by category' means URL filtering; 'public-facing servers isolated from internal' means screened subnet (DMZ); 'trust levels' means zones."
  ],
  "terms": [
   [
    "ACL",
    "Access control list: an ordered set of permit and deny rules used to filter traffic."
   ],
   [
    "Extended ACL",
    "An ACL that matches on source, destination, protocol and ports, usually placed close to the source."
   ],
   [
    "Implicit deny",
    "The invisible final rule in an ACL or firewall policy that drops any traffic not explicitly permitted."
   ],
   [
    "Wildcard mask",
    "The inverse of a subnet mask used in Cisco ACLs, where 0 bits must match and 1 bits are ignored."
   ],
   [
    "URL filtering",
    "Allowing or blocking web access based on the site address or its category."
   ],
   [
    "Security zone",
    "A group of interfaces or networks with a common trust level, used to define firewall policy."
   ],
   [
    "Screened subnet",
    "A network zone, formerly called a DMZ, that hosts internet-facing services separated from the internal network."
   ]
  ],
  "example": "An administrator adds an ACL to block one troublesome host with a single line, 'deny host 10.1.1.50', and applies it to the subnet's gateway interface. Immediately, the whole subnet loses access, because the implicit deny at the end drops everything that was not explicitly permitted. Adding 'permit ip any any' after the deny line restores access for everyone except 10.1.1.50. At the review afterwards, the team agrees that ACL changes must be written out in full, peer-reviewed and tested in the lab before being applied to production.",
  "tip": "ACLs are processed top-down, first match wins, and every list ends with an implicit deny. A list containing only deny statements blocks everything. Public servers go in the screened subnet (DMZ), not the internal network.",
  "check": [
   [
    "An ACL has 'permit tcp any any eq 443' on line 10 and 'deny ip host 10.0.10.66 any' on line 20. Can 10.0.10.66 still browse HTTPS sites through it? Why?",
    "Yes. Processing stops at the first match, so its HTTPS traffic matches line 10 and is permitted before line 20 is ever checked; the deny must be moved above the permit."
   ],
   [
    "Why is it recommended to place an extended ACL close to the source?",
    "It drops unwanted traffic before it crosses the network, and because it matches destination too, it will not accidentally block the source's traffic to other places."
   ],
   [
    "A company hosts a public web server on its internal LAN with a port forward. What is the risk and the better design?",
    "If the server is compromised, the attacker is already inside the internal network; placing it in a screened subnet limits what a compromised server can reach."
   ],
   [
    "Why might an organization exempt banking and health websites from TLS inspection?",
    "Decrypting that traffic raises privacy and legal concerns, so policy often excludes sensitive categories while still inspecting general web traffic."
   ]
  ]
 },
 {
  "t": "The seven-step troubleshooting methodology and its order",
  "body": [
   "CompTIA's troubleshooting methodology is a structured way to solve problems so you do not jump to conclusions, make things worse, or fix the symptom but not the cause. Experienced engineers often move through it quickly and informally, but the structure keeps you honest when a problem is stressful or unfamiliar. The exam tests the steps and, above all, their order, often by describing what a technician has just done and asking what should come next. Learn the seven steps word for word: identify the problem; establish a theory of probable cause; test the theory; establish a plan of action; implement the solution or escalate; verify full system functionality and implement preventive measures; document findings, actions, outcomes and lessons learned.",
   "Step 1: Identify the problem. Gather information from users, logs, monitoring and error messages; question users about exactly what they see and when it started; identify symptoms; determine whether anything has changed recently, since changes cause many problems; duplicate the problem if possible; and approach multiple problems individually rather than treating them as one. Also establish the scope: is it one user, one floor, one application or everyone? A single user with no network suggests their cable or port; a whole floor suggests the IDF switch or its uplink; everyone at every site suggests a core service such as DNS or the internet link.",
   "Step 2: Establish a theory of probable cause. Question the obvious first: is it plugged in, powered on, in the right VLAN, using the right credentials? Then consider multiple approaches. Top-to-bottom starts at the application layer and works down; bottom-to-top starts with cables and link lights and works up; divide and conquer starts in the middle, for example by pinging the default gateway, and moves toward whichever half fails. The approach you choose depends on the symptoms: 'no link light' suggests bottom-up, while 'one web application fails but others work' suggests top-down.",
   "Step 3: Test the theory to determine the cause. Use tools and observations that confirm or disprove the theory, ideally without changing anything significant yet: check the port's VLAN, look at interface counters, run nslookup, swap a known good cable. If the theory is confirmed, determine the next steps to resolve the problem. If it is not confirmed, establish a new theory or escalate to someone with more knowledge, access or authority. Escalating is not failure; it is part of the method.",
   "Step 4: Establish a plan of action to resolve the problem and identify potential effects. A fix can have side effects, such as rebooting a core switch, clearing a table or changing a firewall rule, so consider the impact on other users and services, follow change management and schedule a maintenance window if needed. Step 5: Implement the solution or escalate as necessary, following the plan. Step 6: Verify full system functionality and, if applicable, implement preventive measures. Confirm with the user that everything works, not just the one symptom you fixed, and take steps so it does not happen again, such as adding monitoring, correcting a template, or enabling a protective feature.",
   "Step 7: Document findings, actions, outcomes and lessons learned, typically in the ticketing system or knowledge base, so the next person solves a similar problem faster and patterns across tickets become visible. Documentation happens even when you escalated or the fix was trivial. Walk through a quick example to see the flow: users on the third floor cannot reach the internet (identify, with scope one floor). You suspect the IDF uplink (theory). Interface counters show the uplink is down/down (test confirms). You plan to move the uplink to a spare fibre pair, noting a two-minute outage (plan). You re-patch it (implement). You confirm several users can browse and add uplink monitoring (verify and prevent). You record the damaged fibre and the fix (document).",
   "A few patterns help with scenario questions. If a technician has just identified the cause, the next step is to establish a plan of action. If a fix has just been applied, the next step is to verify full functionality. If testing disproved the theory, the next step is a new theory or escalation. Gathering information and checking for recent changes come before forming theories. Testing a theory is not the same as fixing the problem: you confirm the cause before making significant changes. And documentation is always last.",
   "Common mistakes include jumping straight from symptom to fix without testing a theory, skipping verification because 'the error went away', forgetting to ask what changed, treating several unrelated complaints as one problem, and leaving documentation for later (and then never doing it). Exam clue words: 'questioned users', 'duplicated the issue', 'determined recent changes' mean Step 1; 'question the obvious', 'divide and conquer' mean Step 2; 'confirmed the cause' leads to Step 4; 'applied the fix' leads to Step 6; 'updated the knowledge base' is Step 7."
  ],
  "terms": [
   [
    "Scope",
    "How widespread a problem is, such as one user, one area or the whole organization, which helps locate the cause."
   ],
   [
    "Theory of probable cause",
    "A hypothesis about what is causing the problem, formed from the gathered information."
   ],
   [
    "Divide and conquer",
    "A troubleshooting approach that starts in the middle of the OSI model or path and narrows toward the failing half."
   ],
   [
    "Bottom-to-top approach",
    "Troubleshooting that starts at the Physical layer and works upward through the OSI model."
   ],
   [
    "Escalation",
    "Passing a problem to someone with more expertise, authority or access when you cannot resolve it."
   ],
   [
    "Preventive measures",
    "Actions taken after a fix to stop the problem recurring, such as monitoring or configuration changes."
   ],
   [
    "Lessons learned",
    "The documented insights from an incident that improve future troubleshooting and prevention."
   ]
  ],
  "example": "A user cannot print. The technician asks questions and learns the printer was moved to another office yesterday, which identifies the problem and a recent change. She suspects the new wall jack is in the wrong VLAN (theory), checks the switch port and confirms it is in the guest VLAN (test). She plans to change the port VLAN, noting there are no side effects for other users (plan), makes the change (implement), then prints test pages from several PCs and adds the port to the printer VLAN template to prevent a repeat (verify and preventive measures). Finally she updates the cable map and closes the ticket with notes (document).",
  "tip": "Learn the order: identify, theorize, test, plan, implement, verify, document. When asked 'what next?', find the step just completed and pick the following one. Documentation is always the final step.",
  "check": [
   [
    "A technician confirms a failed power supply caused a switch outage. What is the next step, and why not replace it immediately?",
    "Establish a plan of action and identify potential effects, because replacing it may require downtime, spares or a maintenance window that affect other users."
   ],
   [
    "A technician tests the theory that DNS is failing, but name resolution works fine. What should happen next?",
    "Establish a new theory of probable cause, or escalate if no further theories can be tested."
   ],
   [
    "After a fix, the reported error disappears. Why is that not enough for Step 6?",
    "Step 6 requires verifying full system functionality, including related services and other users, and implementing preventive measures where appropriate."
   ],
   [
    "Three users on one floor and one remote user report problems at the same time. How does Step 1 guide you?",
    "Approach multiple problems individually and determine scope; the floor issue and the remote user's issue may have different causes."
   ]
  ]
 },
 {
  "t": "Cabling issues: wrong cable type, signal degradation, crosstalk, EMI, attenuation, improper termination, TX/RX transposed",
  "body": [
   "Physical layer problems are common and are often mistaken for higher-layer faults. A cable problem can cause no link at all, a link that comes up at a lower speed than expected, a link that flaps up and down, or a link that works but produces errors and slow performance. Because so much depends on Layer 1, a bottom-up check of cabling is often the fastest route to a fix. Knowing the symptoms of each cabling issue lets you pick the right fix and the right test tool.",
   "Wrong cable type covers several mistakes. Using a lower category than the link needs, for example Cat 5e for a 10 Gbps run or Cat 6 for 10 Gbps beyond about 55 m, may limit speed or cause errors. Using a straight-through cable where a crossover was needed matters only with old equipment lacking Auto-MDIX. Using multimode fibre with single-mode optics, or the reverse, and mixing up connector types or APC and UPC polishes, will cause high loss or no link. A rollover (console) cable is not an Ethernet cable. Using non-plenum cable in plenum spaces is a safety and code violation rather than a performance problem, but it is still the wrong cable type and must be replaced.",
   "Signal degradation is the general weakening or distortion of a signal, and several specific causes are named. Attenuation is the natural loss of signal strength over distance; exceeding 100 metres on copper, or the rated distance on fibre, leads to errors or no link. On fibre, dirty or damaged connectors, tight bends and poor splices add loss, so inspect and clean connectors before replacing anything. Electromagnetic interference (EMI) is noise induced from external sources such as motors, fluorescent light ballasts, lift machinery, power cables and radio transmitters. Solutions include rerouting cables away from sources, crossing power cables at right angles rather than running parallel, using shielded cable (properly grounded) or switching to fibre, which is immune. Radio frequency interference (RFI) is a closely related term for interference from radio sources.",
   "Crosstalk is interference between wire pairs within the same cable, or between adjacent cables (alien crosstalk). Near-end crosstalk (NEXT) is measured at the transmitting end, and far-end crosstalk (FEXT) at the far end. Crosstalk commonly comes from untwisting pairs too far at a termination, poor-quality cable or connectors, cheap untwisted flat cables, or cable categories not suitable for the speed. Keep the untwist to a minimum, about half an inch (13 mm) for Cat 5e and higher, when terminating, and use connectors rated for the cable category.",
   "Improper termination means connectors or punch-downs were done wrong: wires in the wrong order (such as mixing T568A and T568B pin-outs within a run, or split pairs, where a wire from one pair is swapped with a wire from another so the twists no longer cancel noise), wires not fully seated in the RJ45, the jacket not crimped under the strain relief so conductors are pulled loose, or poor punch-downs on a patch panel or keystone jack. Symptoms range from no link to intermittent drops and climbing CRC errors. A basic wiremap test catches opens, shorts and crossed pairs; note that a split pair passes a simple continuity test because every pin connects end to end, so it needs a tester that checks pairing or crosstalk.",
   "TX/RX transposed means transmit and receive are crossed incorrectly. On fibre, each duplex link uses one strand for transmit and one for receive; if the strands are not crossed between the two ends, transmit meets transmit and the link will not come up even though both optics are fine. The fix is to swap the strands (roll the pair) at one end, which is easy with duplex LC clips. On copper this was the straight-through versus crossover issue, now mostly solved by Auto-MDIX. Walk through a diagnosis: a new fibre uplink shows no link. Both SFPs are the correct type and wavelength. A light meter shows light arriving on the strand the switch expects to transmit on, not the one it receives on, confirming transposed strands.",
   "Use the right tool for each symptom: a cable tester for wiring faults such as opens, shorts and miswires; a cable certifier to prove a run meets category performance for NEXT, attenuation and length; a time-domain reflectometer (TDR) for copper or an optical TDR (OTDR) for fibre to find the distance to a break or bad splice; a light meter or visual fault locator for fibre; and a fibre inspection scope to check connector end faces. Common mistakes include replacing switches when the cable is at fault, assuming a cable that passes continuity is good, and pulling cable tight around sharp corners or crushing it with zip ties.",
   "Exam clue words: 'run is 130 m' means attenuation; 'near motors, lifts or fluorescent lights' means EMI; 'untwisted too far', 'NEXT' mean crosstalk; 'passes continuity but has errors' suggests a split pair; 'wrong pin-out', 'loose connector' mean improper termination; 'new fibre link, no light on receive, optics correct' means TX/RX transposed; 'multimode patch on single-mode optic' means wrong cable type."
  ],
  "terms": [
   [
    "Attenuation",
    "The loss of signal strength as it travels over distance through a medium."
   ],
   [
    "EMI",
    "Electromagnetic interference: noise induced in cabling from external electrical or radio sources."
   ],
   [
    "Crosstalk",
    "Unwanted signal coupling between adjacent wire pairs or cables."
   ],
   [
    "NEXT",
    "Near-end crosstalk: crosstalk measured at the same end as the transmitter, often caused by excessive untwisting at terminations."
   ],
   [
    "Split pair",
    "A wiring fault where wires from two different pairs are used together, breaking the twist and causing crosstalk."
   ],
   [
    "TX/RX reversal",
    "A fault where the transmit and receive paths are not correctly crossed, often on fibre, preventing a link."
   ],
   [
    "OTDR",
    "Optical time-domain reflectometer: a tool that locates breaks, bends and bad splices along a fibre by distance."
   ]
  ],
  "example": "A new fibre link between two switches will not come up, even though both optics show the correct type and wavelength and the fibre tests clean with an inspection scope. The technician swaps the two strands of the duplex LC connector at one end, which crosses transmit to receive properly, and the link comes up immediately. Later that week, a copper run in the same building passes a continuity test but logs constant CRC errors at gigabit speed; a certifier reveals a split pair from a bad punch-down on the patch panel, and re-terminating it clears the errors.",
  "tip": "Distance beyond spec = attenuation. Noise from motors or lights = EMI (fix with rerouting, shielding or fibre). Too much untwisting at the connector = crosstalk. Fibre link dead but everything else correct = try swapping TX/RX.",
  "check": [
   [
    "A copper cable passes a simple continuity test on all eight pins but shows heavy errors at 1 Gbps. What wiring fault fits, and which tool proves it?",
    "A split pair, where wires from different pairs are swapped consistently at both ends; a cable tester that checks pair mapping or a certifier measuring NEXT will reveal it."
   ],
   [
    "A cable runs parallel to power cables above a factory floor and shows intermittent errors. Name two fixes and explain why fibre solves it completely.",
    "Reroute it away from the power cables (crossing at right angles) or use shielded cable; fibre carries light, so it is immune to EMI."
   ],
   [
    "A 140 m copper run to a warehouse office has constant errors. What is the cause and what are the options?",
    "Attenuation from exceeding the 100 m Ethernet limit; add a switch in between (an IDF) or use fibre."
   ],
   [
    "Which tool would you use to find how far along a buried fibre a break is located?",
    "An OTDR, which measures reflections and reports the distance to the fault."
   ]
  ]
 },
 {
  "t": "Interface issues: increasing CRC and runt/giant counters, port status, duplex and speed mismatches",
  "body": [
   "Network interfaces keep counters that describe their health, and reading them is one of the fastest ways to find a physical or configuration problem. On a Cisco-style switch you view them with `show interfaces`; on Linux, `ip -s link` or `ethtool -S eth0` shows similar statistics, and on Windows the adapter statistics or `netstat -e` give a summary. The key is not the absolute number, because counters may have been accumulating for months, but whether counters are increasing, so clear them with `clear counters` or compare readings a few minutes apart.",
   "```\nSW1# show interfaces g1/0/14\nGigabitEthernet1/0/14 is up, line protocol is up\n  Full-duplex, 1000Mb/s, media type is 10/100/1000BaseTX\n  MTU 1500 bytes\n     2413 runts, 0 giants, 0 throttles\n     8842 input errors, 6429 CRC, 0 frame, 0 overrun\n     0 output errors, 0 collisions, 0 late collision\n     315 output drops\n```",
   "CRC (cyclic redundancy check) errors mean frames arrived with a frame check sequence that did not match their contents, so the data was corrupted in transit. Increasing CRC errors usually point to Layer 1 problems: a damaged or poor-quality cable, bad termination, EMI, a failing transceiver or a dirty fibre connector. They are also the classic symptom on the full-duplex side of a duplex mismatch. In the output above, rising CRC errors together with runts on a full-duplex port strongly suggest the device at the other end is running half duplex.",
   "Runts are frames smaller than the Ethernet minimum of 64 bytes. They are often fragments caused by collisions, typically from a duplex mismatch or a faulty NIC. Giants are frames larger than the maximum allowed size, 1518 bytes for a standard Ethernet frame (1522 with an 802.1Q tag); they commonly appear when one device sends jumbo frames and the other end has not been configured for them, so check MTU settings on both sides. Other counters to know: input errors (a total that includes CRCs, runts, giants and others), output drops or discards (frames dropped because queues were full, indicating congestion rather than a cable fault), and collisions and late collisions, which should never appear on full-duplex links. Late collisions, occurring after the first 64 bytes, strongly suggest a duplex mismatch or an over-length cable.",
   "Port status tells you whether the interface is working at all, and output such as 'GigabitEthernet0/1 is up, line protocol is up' has two parts. The first reflects Layer 1 (is there a signal); the second reflects Layer 2 (is the data link working). 'Administratively down' means someone shut it down with a command, so the fix is `no shutdown` after checking why it was disabled. 'Down/down' usually means no physical link: an unplugged or broken cable, a device powered off at the far end, a speed mismatch with autonegotiation off, or mismatched optics. 'Up/down' means a physical signal exists but the data link failed, for example mismatched encapsulation or keepalive problems on WAN links. 'Err-disabled' means the switch shut the port because of a security or error condition, such as a port security violation, BPDU guard or a detected loop; the log names the cause. `show interfaces status` gives a quick one-line-per-port summary of state, VLAN, duplex and speed.",
   "Speed and duplex mismatches are configuration problems that masquerade as cabling faults. If speeds do not match and autonegotiation is off on one side, the link usually will not come up at all. If duplex does not match, the link comes up but performs badly, and worse under load: the half-duplex side logs collisions and late collisions, and the full-duplex side logs CRC errors and runts. The fix is to set both sides to autonegotiate, or to hard-code both to the same values. Also check for a link that negotiated lower than expected, such as 100 Mbps instead of 1 Gbps: gigabit Ethernet over copper needs all four pairs, while 100 Mbps uses only two, so a damaged pair often causes a silent downshift to 100 Mbps.",
   "Common mistakes include reacting to a large but static counter that has not changed in weeks, blaming the cable for output drops (which indicate congestion), re-enabling an err-disabled port without removing the cause, and fixing a duplex mismatch by hard-coding only one side, which recreates the problem. Another is ignoring counters on the other end of the link; always check both sides, because some symptoms appear only on one of them.",
   "Exam clue words: 'CRC errors increasing' means cable, EMI, optics or duplex; 'giants' means MTU or jumbo mismatch; 'runts and late collisions' mean duplex mismatch; 'output drops' or 'discards' mean congestion; 'administratively down' means shutdown command; 'down/down' means physical; 'err-disabled' means a protective feature triggered; 'gigabit port running at 100 Mbps' means a bad pair or wrong cable."
  ],
  "terms": [
   [
    "CRC error",
    "A frame whose checksum does not match its contents, indicating corruption in transit."
   ],
   [
    "Runt",
    "An Ethernet frame smaller than the 64-byte minimum."
   ],
   [
    "Giant",
    "An Ethernet frame larger than the maximum allowed size, often from MTU mismatches."
   ],
   [
    "Output drops",
    "Frames discarded because the interface's output queue was full, indicating congestion."
   ],
   [
    "Late collision",
    "A collision detected after the first 64 bytes of a frame, typical of duplex mismatch or excessive cable length."
   ],
   [
    "Administratively down",
    "An interface state meaning it has been disabled by configuration."
   ],
   [
    "Err-disabled",
    "A state in which the switch has automatically shut a port because of an error or security violation."
   ]
  ],
  "example": "A server is slow. `show interfaces` on its switch port shows the port running full duplex with CRC errors and runts climbing every minute, while the server's NIC statistics show late collisions. The NIC had been hard-coded to half duplex during a build years ago. Setting both ends to autonegotiation clears the errors and throughput jumps from a few megabits to near line rate. The technician clears the counters, checks again an hour later to confirm they stay at zero, and notes the fix in the ticket.",
  "tip": "Rising CRCs: suspect cabling, EMI or optics first. Giants: MTU/jumbo mismatch. Runts plus late collisions: duplex mismatch. Output drops: congestion. 'Administratively down' is fixed with no shutdown.",
  "check": [
   [
    "An interface shows 50,000 CRC errors, but the count has not changed in the last hour. Is there an active problem?",
    "Probably not; the errors happened in the past. Clear the counters and watch whether they increase before troubleshooting further."
   ],
   [
    "A storage server's switch port shows a rising giant counter. What should you compare?",
    "The MTU or jumbo frame settings on the server, the switch port and every device in the path, because one side is sending frames larger than the other accepts."
   ],
   [
    "A port shows high output drops but no CRC errors, runts or collisions. Is the cable at fault?",
    "Unlikely. Output drops indicate congestion (queues full), pointing to bandwidth or QoS issues rather than a physical fault."
   ],
   [
    "What is the difference between 'administratively down' and 'down/down'?",
    "Administratively down means it was disabled by a shutdown command; down/down means it is enabled but has no physical link, such as an unplugged or broken cable."
   ]
  ]
 },
 {
  "t": "Hardware issues: PoE power budget exceeded, wrong PoE standard, transceiver mismatch, signal strength",
  "body": [
   "Some network problems come from the hardware itself: not enough power, incompatible modules or signals too weak to be understood. These issues often look like a device being dead, unstable or partly working, which tempts people to replace the device rather than find the cause. Knowing the patterns saves time and money, and the exam presents them as short scenarios with a telling detail, such as 'only some cameras power on' or 'the link works at one end but not the other'.",
   "Power over Ethernet problems are very common now that access points, phones and cameras rely on it. A PoE switch has a total power budget. When the combined draw of connected devices exceeds it, the switch refuses to power additional ports or, depending on configuration, powers down lower-priority ports. Symptoms: some devices never power on, devices power on and then reboot when others start up, or everything works until more devices are added or devices draw more power at certain times. Check with a command such as `show power inline`, which lists the budget, power used and remaining, and each port's allocation and detected class.",
   "```\nSW1# show power inline\nAvailable:370.0(w)  Used:366.8(w)  Remaining:3.2(w)\nInterface Admin  Oper   Power(W) Device        Class\nGi1/0/1   auto   on     25.5     AP-LOBBY      4\nGi1/0/2   auto   on     25.5     AP-FLOOR2     4\nGi1/0/15  auto   off    0.0      n/a           n/a\n```",
   "In that output only 3.2 W remain, so the device on Gi1/0/15 cannot be powered. Fixes include moving devices to another switch, adding or upgrading a power supply to raise the budget, setting port priorities so critical devices such as phones and access points are powered first, or using a PoE injector for an odd device. Wrong PoE standard means the device needs more power than the port can provide, or the two use incompatible methods. A device that requires PoE+ (802.3at, up to 30 W) connected to a port that supplies only 802.3af (15.4 W) may not power up at all, or may boot in a reduced-power mode, for example an access point that disables a radio or a PTZ camera that turns off its heater or motor. High-power devices may need 802.3bt (60 or 90 W). Some cheap devices use passive or proprietary PoE, which does not negotiate and may not work with, or may even damage, standard equipment.",
   "Transceiver mismatch occurs when the modules at each end of a link, or the module and the cable, are incompatible. Common causes: different speeds (a 1 Gbps SFP at one end and a 10 Gbps SFP+ at the other; some ports can run both, many cannot), different standards and wavelengths (for example 850 nm short-range multimode optics facing 1310 nm long-range single-mode optics), multimode optics used on single-mode fibre, BiDi optics not paired with their complementary partner, or a switch rejecting a third-party module it does not support. Symptoms range from no link to a flapping link or high error counts. Check module details and digital optical monitoring with commands such as `show interfaces transceiver`, which on many platforms displays temperature, voltage and transmit and receive optical power levels.",
   "Signal strength problems apply to both optics and wireless. For fibre, received light levels that are too low (from dirty connectors, excessive distance, bends or bad splices) cause errors; levels that are too high, for example long-range optics on a short patch cable, can overload the receiver unless an attenuator is fitted. For wireless, signal strength is measured in dBm, a negative number where closer to zero is stronger: around -30 dBm is excellent, around -67 dBm is a common minimum target for voice and reliable data, and around -80 dBm is poor. Because dBm is logarithmic, every 3 dB is roughly a doubling or halving of power. Weak signal causes low data rates, retransmissions and disconnections. Also watch the signal-to-noise ratio (SNR), the gap between signal and noise floor, since a strong signal in a noisy environment still performs badly. Fixes include moving or adding access points, adjusting power and antennas, and removing obstructions.",
   "Common mistakes include assuming every PoE+ port can deliver 30 W at once, replacing an access point that is simply underpowered, forgetting that power draw varies (cameras switching on infrared heaters at night), mixing SFP types across a link, and thinking -80 dBm is stronger than -60 dBm because 80 is the bigger number. When a link or device misbehaves after new hardware is added, check power and compatibility before assuming a fault.",
   "Exam clue words: 'some PoE devices do not power on', 'devices reboot when more are added' mean the budget is exceeded; 'device boots with reduced features', 'one radio disabled' mean wrong PoE standard or class; 'new optic, no link', 'different wavelength', 'unsupported module' mean transceiver mismatch; 'low receive power', 'dirty connector' mean optical signal loss; '-85 dBm', 'drops at the far end of the building' mean weak wireless signal."
  ],
  "terms": [
   [
    "Power budget",
    "The total PoE wattage a switch can deliver across its ports."
   ],
   [
    "PoE class",
    "A negotiated category indicating how much power a powered device needs from the switch."
   ],
   [
    "Passive PoE",
    "Non-standard PoE that supplies power without negotiation and may be incompatible with standard devices."
   ],
   [
    "Transceiver mismatch",
    "Incompatible optical or copper modules at each end of a link, such as differing speed, wavelength or fibre type."
   ],
   [
    "Digital optical monitoring",
    "Transceiver diagnostics showing temperature, voltage and transmit and receive optical power."
   ],
   [
    "dBm",
    "Decibels relative to one milliwatt; a logarithmic unit for signal power, where values closer to zero are stronger."
   ],
   [
    "Signal-to-noise ratio",
    "The difference between signal strength and background noise; higher values mean cleaner signals."
   ]
  ],
  "example": "Several new security cameras on a switch keep rebooting at night but work fine all day. `show power inline` shows the switch close to its budget during the day; at night the cameras turn on infrared illuminators and heaters, draw more power, and push the total over the budget, so the switch cuts power to low-priority ports. Moving four cameras to a second PoE switch stops the reboots. While there, the technician notices an uplink with rising errors and finds, using `show interfaces transceiver`, very low receive power caused by a dirty connector, which cleaning fixes.",
  "tip": "Some PoE devices dead or rebooting = budget exceeded. One device boots with reduced features = wrong PoE class or standard. Fibre link errors with correct cabling = check both optics' speed, wavelength and fibre type, and read their optical power levels.",
  "check": [
   [
    "A switch has a 370 W budget and 12 access points drawing 25.5 W each are connected. Can you add six IP phones drawing 7 W each?",
    "Yes. The access points use 306 W, leaving 64 W; six phones need 42 W, which fits with 22 W to spare, but one more access point would exceed the budget."
   ],
   [
    "An 802.3at access point connected to an 802.3af switch boots with only one radio. Why, and what are two fixes?",
    "The port supplies at most 15.4 W, less than the access point needs, so it runs in reduced-power mode; use a PoE+ capable switch or port, or a PoE+ injector."
   ],
   [
    "Which is the stronger Wi-Fi signal, -55 dBm or -75 dBm, and roughly how much stronger?",
    "-55 dBm, because values closer to zero are stronger; 20 dB is about 100 times more power."
   ],
   [
    "A fibre link flaps after an SFP was replaced at one end. What should you compare between the two ends?",
    "Speed, standard and wavelength, fibre type (single-mode or multimode), BiDi pairing, and whether the switch supports the module; then check optical power levels."
   ]
  ]
 },
 {
  "t": "Switching issues: STP loops, incorrect VLAN assignment, ACLs",
  "body": [
   "Once the physical layer is sound, Layer 2 switching configuration becomes the next common source of trouble. Network+ focuses on three issue types: spanning tree problems, VLAN mistakes and access control lists that block more or less than intended. They produce very different symptoms, from a whole building grinding to a halt to a single printer that cannot be reached, so learning to read the symptom tells you which to investigate first.",
   "Spanning tree issues cause some of the most dramatic outages. If STP is disabled, misconfigured or bypassed, a redundant path creates a switching loop. Symptoms appear within seconds: the whole network or a large part slows to a crawl, broadcast traffic spikes, switch CPU utilisation is very high, link activity lights flash constantly, and logs show MAC addresses flapping between ports. Causes include someone connecting two wall jacks with a cable, an unmanaged switch that does not pass BPDUs, PortFast enabled on switch-to-switch links, or STP disabled to 'speed things up'. The immediate fix is to break the loop by disconnecting or shutting a link; the lasting fix is enabling STP (preferably RSTP), BPDU guard on edge ports and storm control to cap broadcast rates. A subtler STP problem is a suboptimal root bridge: if an old access switch wins the election because nobody set priorities, traffic takes inefficient paths through it and its uplinks become congested. Check with `show spanning-tree` and set the core switch's priority lower so it becomes root.",
   "Incorrect VLAN assignment is extremely common. If an access port is in the wrong VLAN, the device gets an address from the wrong DHCP scope, or an APIPA address if that VLAN has no DHCP, and cannot reach its resources. It may even appear to work but land on the guest network, reaching the internet but not internal servers. Check with `show vlan brief` or `show interfaces g1/0/7 switchport`. Trunk problems are the other half. If a VLAN is not in a trunk's allowed list, or does not exist in the VLAN database of a switch along the path, hosts on that VLAN at a remote switch are isolated while other VLANs work. A native VLAN mismatch between trunk ends causes traffic to leak between VLANs and generates log warnings. A trunk mode mismatch, with one side set to trunk and the other to access, can stop all but one VLAN. Voice VLAN misconfiguration causes phones to boot into the data VLAN or fail to register.",
   "```\nSW3# show interfaces trunk\nPort      Mode  Encapsulation  Status    Native vlan\nGi1/0/48  on    802.1q         trunking  999\nPort      Vlans allowed on trunk\nGi1/0/48  10,20\nSW3# show vlan brief | include 30\n30   CAMERAS    active    Gi1/0/5, Gi1/0/6\n```",
   "The output above shows the problem in a single look: VLAN 30 exists on SW3 and has ports assigned, but the uplink trunk allows only VLANs 10 and 20, so camera traffic never leaves the switch. Adding VLAN 30 to the allowed list with `switchport trunk allowed vlan add 30` fixes it; note the word add, because omitting it replaces the list and can cut off other VLANs, a classic self-inflicted outage.",
   "ACLs cause problems when they are too strict, too loose or applied in the wrong place. Classic mistakes: forgetting the implicit deny, so a list that only denies one host blocks everyone; placing a broad rule above a specific one so the specific one never matches; applying the list to the wrong interface or in the wrong direction (inbound versus outbound); using the wrong wildcard mask; or forgetting return traffic on a stateless filter. Symptoms are usually selective: some traffic or some hosts fail while others work, often immediately after a change. Check the list with `show access-lists`, where hit counters show which rules are matching, and review the change log for recent edits.",
   "A good method for switching issues is to follow the path of a frame from the host outward: is the host port up and in the right VLAN; does that VLAN exist on every switch along the path; is it allowed on every trunk with matching native VLANs; is the gateway SVI up; and is any ACL in the path matching the traffic? Common mistakes include rebooting switches during a loop (the loop returns as soon as they come back), replacing an allowed VLAN list instead of adding to it, troubleshooting DHCP when the port is simply in the wrong VLAN, and forgetting that ACL direction is from the interface's point of view.",
   "Exam clue words: 'network-wide slowdown', 'high CPU', 'MAC flapping', 'broadcast storm' mean a switching loop; 'traffic takes a strange path through an old switch' means the wrong root bridge; 'one user gets the wrong subnet or APIPA' means the wrong access VLAN; 'a whole VLAN fails at one switch' means the trunk allowed list or a missing VLAN; 'native VLAN mismatch' in logs means trunk configuration; 'some traffic blocked right after a rule change' means ACL order, implicit deny or direction."
  ],
  "terms": [
   [
    "Switching loop",
    "A Layer 2 path loop that causes frames to circulate endlessly, producing broadcast storms."
   ],
   [
    "MAC flapping",
    "A MAC address appearing alternately on different switch ports, a common sign of a loop."
   ],
   [
    "Storm control",
    "A switch feature that limits broadcast, multicast or unknown unicast traffic on a port to a set rate."
   ],
   [
    "Allowed VLAN list",
    "The set of VLANs permitted to cross a trunk link."
   ],
   [
    "Native VLAN mismatch",
    "A configuration where the two ends of a trunk use different untagged VLANs, causing traffic leakage."
   ],
   [
    "Trunk mode mismatch",
    "One end of a link configured as a trunk and the other as an access port, breaking multi-VLAN traffic."
   ],
   [
    "ACL hit counter",
    "A per-rule count of matching packets that shows which ACL entries are actually being used."
   ]
  ],
  "example": "After a new switch is added in a remote wing, users there on VLAN 30 cannot get DHCP while VLAN 10 users on the same switch are fine. `show interfaces trunk` on the uplink shows the allowed VLANs are 10 and 20 only. The technician adds VLAN 30 with `switchport trunk allowed vlan add 30`, the users renew their leases and everything works. At the post-change review, the team adds a step to the switch deployment checklist: compare the new switch's trunk allowed list with its neighbour before connecting users.",
  "tip": "Network-wide slowdown with high CPU and MAC flapping = switching loop. One host with the wrong subnet or APIPA = wrong access VLAN. A whole VLAN failing at one remote switch = VLAN missing on the trunk. Selective failures right after a change = check ACL order and direction.",
  "check": [
   [
    "An engineer types `switchport trunk allowed vlan 40` on an uplink to add VLAN 40, and suddenly users in VLANs 10 and 20 on that switch lose connectivity. What happened?",
    "The command replaced the allowed list with only VLAN 40 instead of adding it; `switchport trunk allowed vlan add 40` should have been used."
   ],
   [
    "During a switching loop, an administrator reboots the affected switches, but the problem returns within a minute. Why, and what should be done instead?",
    "Rebooting does not remove the physical loop; find and disconnect the looping link, then enable STP, BPDU guard and storm control to prevent recurrence."
   ],
   [
    "A user on the finance floor gets an address in the guest subnet and can browse the internet but not reach finance servers. What is the likely cause?",
    "The user's access port is assigned to the guest VLAN instead of the finance VLAN."
   ],
   [
    "An ACL applied inbound on a server VLAN's SVI is meant to block users from reaching the servers, but it has no effect. What is the likely mistake?",
    "It is applied in the wrong direction; traffic from users toward the servers leaves the SVI outbound into the server VLAN, so the ACL should be applied outbound there (or inbound on the users' SVI)."
   ]
  ]
 },
 {
  "t": "Routing issues: routing tables, default routes, address pool exhaustion, incorrect gateway, subnet mask or IP",
  "body": [
   "Routing issues show up when hosts can talk locally but not to other networks, or when some destinations work and others do not. Troubleshooting them means checking two places in order: first the host's own IP configuration, because a single wrong value there breaks everything beyond the local subnet, and then the routers' tables, because every router along the path, in both directions, must know where to send the traffic.",
   "Start with the host. The three settings that must be right are the IP address, the subnet mask and the default gateway (with DNS as a fourth, covered in the next lesson). An incorrect IP address, for example a static address from the wrong subnet, stops the host from reaching its gateway at all. An incorrect subnet mask makes the host miscalculate which addresses are local. If the mask is too broad, such as /16 instead of /24, the host thinks remote addresses are local and sends ARP requests for them instead of sending traffic to the gateway, so those destinations fail. If it is too narrow, the host thinks some local neighbours are remote and sends their traffic via the gateway, which may or may not work. An incorrect default gateway, such as a mistyped address or one on a different subnet, means the host can reach its own subnet but nothing beyond.",
   "Test systematically from the inside out. Each step that succeeds rules out a layer of problems, and the first step that fails tells you where to look:",
   "```\nC:\\> ipconfig /all          (check IP, mask, gateway, DNS)\nC:\\> ping 127.0.0.1         (local TCP/IP stack)\nC:\\> ping 10.5.20.44        (own address and NIC)\nC:\\> ping 10.5.20.1         (default gateway)\nC:\\> ping 10.9.1.10         (remote subnet)\nC:\\> tracert 10.9.1.10      (where the path stops)\nC:\\> route print            (host routing table)\n```",
   "Address pool exhaustion means no addresses are left to assign. For DHCP, new clients get no lease and fall back to APIPA 169.254.x.x addresses, while existing clients keep working until their leases expire. For NAT, a dynamic pool of public addresses or a PAT port space can run out, so some outbound connections fail while others succeed, usually at busy times. Fixes include shortening lease times, enlarging the scope or subnet (for example /24 to /23, remembering to change the mask on the router interface and in DHCP), adding a scope, cleaning up stale leases, using PAT instead of a dynamic pool, or adding public addresses.",
   "Then check the routers. A routing table must contain a route to each destination network, either directly connected, static or learned dynamically. Missing routes cause ICMP 'destination unreachable' messages or timeouts; a route pointing to the wrong next hop sends traffic into a black hole. Routing loops, where two routers keep passing packets back and forth, show up in traceroute as the same pair of addresses repeating until TTL expires. Asymmetric routing, where traffic returns by a different path, can break stateful firewalls, which drop return traffic for sessions they never saw start. Use `show ip route` to inspect the table and confirm which route actually matches (longest prefix wins), traceroute to see where the path stops, and check routing protocol neighbour relationships, since a neighbour that is down means its routes are missing.",
   "The default route (0.0.0.0/0) is the gateway of last resort. If an edge router lacks one, internal traffic works but internet access fails. If the default route points to the wrong ISP next hop, or a static default route remains after the primary link fails, traffic is lost. A floating static default with a higher administrative distance, or a dynamic default learned from the ISP, provides failover. Remember too that routing is two-way: a reply must also find a route back. If a new subnet is added but not advertised or routed on the return path, pings from it time out even though the outbound path is fine. Common mistakes: fixing the router when only one host is affected, forgetting return routes, enlarging a DHCP scope without changing the interface mask, and misreading which route matches a destination.",
   "Exam clue words: 'can reach local hosts but nothing remote' means default gateway; 'some remote subnets unreachable from one host' means subnet mask; 'new devices get 169.254 while existing ones work' means DHCP pool exhaustion; 'some outbound connections fail at busy times' means NAT pool or PAT exhaustion; 'repeating hops in traceroute' means routing loop; 'internal works but no internet' means missing default route; 'traffic leaves but replies never arrive' means a missing return route or asymmetric path."
  ],
  "terms": [
   [
    "Default gateway",
    "The router address a host sends traffic to when the destination is not on its local subnet."
   ],
   [
    "Default route",
    "A route to 0.0.0.0/0 used when no more specific route matches, often pointing to the ISP."
   ],
   [
    "Routing table",
    "The list of known destination networks and next hops a router or host uses to forward packets."
   ],
   [
    "Routing loop",
    "A condition where packets circulate between routers until their TTL expires."
   ],
   [
    "Asymmetric routing",
    "Traffic taking a different path in each direction, which can break stateful firewalls."
   ],
   [
    "Pool exhaustion",
    "Running out of assignable addresses in a DHCP scope or NAT pool."
   ],
   [
    "Black hole",
    "A route or path where traffic is silently discarded."
   ]
  ],
  "example": "A newly installed PC can reach local file servers but not the internet or other buildings. `ipconfig` shows IP 10.5.20.44 with mask 255.255.255.0 and gateway 10.5.21.1, which is on a different subnet, so the PC cannot reach its gateway. The technician corrects the gateway to 10.5.20.1 in the static configuration, and a ping to a remote server succeeds. A traceroute confirms the path, and she records in the ticket that the build template had a typo, then corrects the template so future PCs are right.",
  "tip": "Local works but remote fails: check gateway, then routes. Some remote subnets fail: check mask and routing tables. APIPA on new clients while old ones work: DHCP pool exhaustion. Repeating hops in traceroute: routing loop.",
  "check": [
   [
    "A host configured as 192.168.1.50/16 on a /24 network cannot reach 192.168.7.10 on another subnet, but reaches the internet. Why?",
    "With a /16 mask it believes 192.168.7.10 is local, so it ARPs for it directly instead of sending traffic to the gateway, and nobody on the local segment answers."
   ],
   [
    "A new branch subnet can send pings to headquarters, and headquarters routers see them arrive, but no replies reach the branch. What should you check?",
    "The return path: headquarters routers need a route back to the new branch subnet, either static or advertised by the routing protocol."
   ],
   [
    "An office uses dynamic NAT with a pool of 4 public addresses. At lunchtime some users cannot reach websites while others can. What is the likely cause and fix?",
    "The NAT pool is exhausted when more than 4 hosts need translations; configure PAT (overload) so all hosts share addresses using ports."
   ],
   [
    "Internal networks can reach each other, but nothing reaches the internet after an edge router was replaced. What is the first thing to check?",
    "Whether the new router has a default route (0.0.0.0/0) pointing to the correct ISP next hop, and whether it is advertised internally."
   ]
  ]
 },
 {
  "t": "Service issues: DHCP scope exhaustion, duplicate IPs, DNS failures, NTP issues",
  "body": [
   "Network services such as DHCP, DNS and NTP are invisible when they work and cause confusing symptoms when they fail. Users rarely say 'DNS is broken'; they say 'the internet is down' or 'I can't log in'. Each service has a characteristic failure signature, and learning those signatures lets you go straight to the cause instead of checking cables and routers first. Network+ tests four: DHCP scope exhaustion, duplicate IP addresses, DNS failures and NTP problems.",
   "DHCP scope exhaustion happens when every address in a scope is leased. New devices receive no offer and self-assign APIPA 169.254.x.x addresses, while devices that already hold leases continue to work, so the problem seems to affect 'only new people' or 'only people who arrived after 10 am'. It is common on guest Wi-Fi with long lease times, after adding many devices, or during a DHCP starvation attack in which a malicious client requests addresses with fake MACs. Check the DHCP server's scope statistics for percentage in use. Fixes: shorten lease times on busy transient networks, expand the scope or subnet, remove stale leases and unneeded reservations or exclusions, and use DHCP snooping rate limits and port security to resist starvation. If clients on only one subnet get APIPA and that scope is not full, check the relay (IP helper) instead.",
   "Duplicate IP addresses occur when two devices use the same address, usually because someone assigned a static address inside a DHCP scope without an exclusion, two DHCP servers hand out overlapping ranges, or a device holding a reservation was replaced without updating it. Symptoms are intermittent connectivity for both devices, as traffic goes to whichever one answered ARP most recently, and operating system warnings about an address conflict. Find the culprit by checking the ARP table for the MAC address that currently owns the IP, then look up that MAC in the switch's MAC address table to find its port:",
   "```\nC:\\> arp -a | findstr 10.20.30.40\n  10.20.30.40    00-1a-2b-3c-4d-5e    dynamic\nSW2# show mac address-table address 001a.2b3c.4d5e\nVlan  Mac Address     Type     Ports\n  30  001a.2b3c.4d5e  DYNAMIC  Gi1/0/17\n```",
   "Prevent duplicates with IPAM, exclusions for static ranges, and DHCP conflict detection, where the server pings an address before offering it. DNS failures typically let users reach resources by IP address but not by name, which is a quick test: if `ping 8.8.8.8` works but `ping example.com` fails, suspect DNS. Causes include a wrong or unreachable DNS server in the client's settings (often handed out by DHCP option 6), a DNS server or service that is down, a firewall blocking port 53, a missing or wrong record (for example an A record still pointing to an old server's IP), stale cached entries within the record's TTL, or a bad hosts file entry overriding DNS. Use `nslookup name server` or `dig @server name` to query specific servers and compare answers, flush the client cache with `ipconfig /flushdns`, and check the hosts file. Internal names failing while internet names work often means the client is using a public resolver instead of the internal DNS server.",
   "NTP issues cause clock drift, and incorrect time breaks surprising things. Kerberos authentication fails when clock skew exceeds its tolerance (five minutes by default), so users cannot log on to the domain. Certificates appear expired or not yet valid, so TLS connections and VPNs fail. Log timestamps from different devices do not line up, making incidents impossible to reconstruct, and scheduled jobs run at the wrong time. Causes include an unreachable NTP server, UDP 123 blocked by a firewall, a device configured with no NTP at all, or a dead CMOS battery resetting the clock at boot. A wrong time zone setting is a different problem: the underlying time can be correct while displays and logs look hours off. Check with `show ntp status`, `w32tm /query /status` on Windows or `timedatectl` on Linux, and confirm the device is synchronized to a reliable source.",
   "Common mistakes include restarting the DHCP server when the real issue is a missing relay, assuming DNS is fine because one name resolves (another record may be wrong), forgetting the client cache after fixing a record, changing the time zone to 'fix' a clock that is actually drifting, and ignoring intermittent conflicts because they come and go. In every case, compare what is happening with what should happen: the scope's free addresses, the expected record, the reference time.",
   "Exam clue words: 'new devices get APIPA while others work' means scope exhaustion; 'intermittent connectivity', 'address conflict warning' mean duplicate IP; 'works by IP but not by name' means DNS; 'internal names fail but internet names work' means the wrong DNS server; 'site moved but users still reach the old server' means stale cache or wrong record; 'cannot log on to the domain', 'certificate not yet valid', 'logs out of order' mean time and NTP."
  ],
  "terms": [
   [
    "Scope exhaustion",
    "A DHCP condition where all addresses in a scope are leased and new clients cannot obtain one."
   ],
   [
    "DHCP starvation",
    "An attack that requests many leases using spoofed MAC addresses to exhaust a DHCP scope."
   ],
   [
    "IP address conflict",
    "Two devices configured with the same IP address, causing intermittent connectivity for both."
   ],
   [
    "Conflict detection",
    "A DHCP server feature that checks whether an address is in use before offering it."
   ],
   [
    "DNS cache",
    "Stored DNS answers on clients and resolvers, kept for each record's TTL."
   ],
   [
    "Clock skew",
    "The difference between clocks on two systems, which can break authentication and certificate validation."
   ],
   [
    "Clock drift",
    "The gradual divergence of a device's clock from true time when it is not synchronized."
   ]
  ],
  "example": "Users can reach web sites by IP address but not by name. `ipconfig /all` shows the DNS servers are 10.0.0.53 and nothing else, and `nslookup example.com 10.0.0.53` times out while `nslookup example.com 10.0.0.54` answers instantly. The primary DNS server's service has stopped after an update. The technician restarts it, then adds both servers to the DHCP DNS option so clients have a fallback, and sets up availability monitoring on the DNS service. Users renew their leases, and the problem is closed with a note about the missing redundancy.",
  "tip": "Works by IP but not by name = DNS. New clients get APIPA while old ones work = scope exhaustion. Intermittent connectivity and conflict warnings = duplicate IP. Domain logins or certificates failing on one machine = check its time (NTP).",
  "check": [
   [
    "A web server was moved to a new IP and its A record updated, but some users still reach the old server. What explains this and what can they do?",
    "Their resolvers or clients have cached the old record until its TTL expires; flushing the client cache (and waiting for resolver caches) fixes it, and lowering TTLs before future moves helps."
   ],
   [
    "Two users complain that their network connection drops for a few seconds several times an hour, and both see conflict warnings. How do you find the source?",
    "Check the ARP table for the MAC currently using the IP, look up that MAC in the switch MAC address table to find its port, then correct the static address or DHCP settings."
   ],
   [
    "Only one laptop in the office cannot log on to the domain, and its clock is 12 minutes fast. What is the link?",
    "Kerberos rejects authentication when clock skew exceeds its tolerance (five minutes by default); resynchronize the laptop with NTP."
   ],
   [
    "All clients on the guest VLAN get APIPA addresses, but the guest scope shows 60% free. What should you check?",
    "The DHCP relay (IP helper) on the guest VLAN's gateway, or DHCP snooping trust settings, since the scope itself is not exhausted."
   ]
  ]
 },
 {
  "t": "Performance issues: congestion, bottlenecks, bandwidth, latency, packet loss, jitter",
  "body": [
   "Performance problems are the hardest complaints to pin down because the network is not down, just slow. Users say 'it's laggy', 'the file share crawls' or 'calls keep breaking up'. Translating those complaints into measurable terms is the first step, and the objectives give you the vocabulary: bandwidth, throughput, congestion, bottlenecks, latency, jitter and packet loss. Each has different causes and fixes, and different applications are sensitive to different ones.",
   "Bandwidth is the maximum data rate a link can carry, such as 1 Gbps. Throughput is what you actually achieve, which is always lower because of protocol overhead, errors, retransmissions and sharing. Congestion occurs when more traffic is offered to a link or device than it can carry; queues fill, packets wait (adding delay) and eventually are dropped. A bottleneck is the point in the path with the lowest capacity, and it limits end-to-end performance no matter how fast the rest is: ten-gigabit switches do not help if the WAN link is 100 Mbps, or if a server's disk or CPU cannot keep up. Common bottlenecks are WAN and internet links, uplinks where many access ports aggregate (oversubscription, for example 48 gigabit ports sharing one 10 Gbps uplink), overloaded firewalls or VPN concentrators performing inspection, and busy Wi-Fi cells.",
   "Latency is the time data takes to travel from source to destination, usually measured as round-trip time in milliseconds with ping. It comes from propagation delay (distance, including the long trip to geostationary satellites, around 600 ms round trip), serialization onto the link, processing in devices and, most variably, queuing in congested buffers. High latency hurts interactive applications and chatty protocols that need many round trips, such as file sharing over a WAN. Jitter is the variation in latency from packet to packet. Real-time voice and video suffer more from jitter than from steady latency, because packets arriving irregularly cause choppy or robotic audio; jitter buffers smooth small variations at the cost of a little extra delay. Packet loss means packets never arrive, due to congestion (full queues), errors on links, faulty hardware or wireless interference. TCP retransmits lost segments and slows its sending rate, reducing throughput sharply; UDP applications like voice simply lose that data, causing gaps.",
   "As rough guidance often used for voice, one-way latency under about 150 ms, jitter under about 30 ms and packet loss under about 1 percent give acceptable call quality; exact targets vary by vendor and application, so treat them as a sense of scale rather than fixed rules. To troubleshoot, measure rather than guess, and compare with your baseline. SNMP graphs show saturated interfaces; interface counters show output drops (congestion) versus CRC errors (physical problems); flow data shows which applications or hosts consume bandwidth; ping, traceroute, pathping or mtr show where along the path latency and loss begin; and iperf measures achievable throughput between two points.",
   "```\n$ mtr -r -c 50 branch-fw.example.net\nHOST                    Loss%   Avg   Wrst  StDev\n1. 10.1.1.1              0.0%   0.6    1.1   0.1\n2. 203.0.113.1           0.0%   2.3    4.0   0.4\n3. 198.51.100.9         12.0%  48.7  210.3  41.2\n4. branch-fw             11.8%  51.2  214.9  43.0\n```",
   "Reading that report: loss and highly variable delay (a large standard deviation, which means jitter) begin at hop 3 and carry through to the destination, so the problem starts at or just before hop 3, likely a congested provider link. If loss appeared at hop 3 but not at hop 4, it would usually just mean that router deprioritizes answering probes, not real loss. Remember that performance problems can also sit outside the network, in an overloaded server, storage or application, so check those too before buying bandwidth.",
   "Fixes depend on the cause: add capacity or upgrade the bottleneck link; use link aggregation for congested uplinks; apply QoS so voice and video are prioritized over bulk transfers; schedule backups and updates outside business hours; use caching or a CDN; correct duplex mismatches and cable faults that cause loss; and fix wireless interference or coverage. Common mistakes include assuming more bandwidth fixes latency (it does not reduce propagation delay), expecting QoS to create capacity, reading loss at one intermediate traceroute hop as a real problem, and blaming the network for a slow application server.",
   "Exam clue words: 'choppy', 'robotic voice', 'video freezing' mean jitter and packet loss; 'slow file transfers', 'link at 100 percent' mean congestion or bandwidth; 'every click takes a moment', 'satellite link' mean latency; 'fast LAN but slow internet' means a bottleneck at the WAN; 'output drops' means congestion; 'many ports sharing one uplink' means oversubscription."
  ],
  "terms": [
   [
    "Bandwidth",
    "The maximum data rate a link can carry."
   ],
   [
    "Throughput",
    "The actual data rate achieved across a link or path, as opposed to its theoretical bandwidth."
   ],
   [
    "Congestion",
    "A condition where offered traffic exceeds capacity, causing queuing delay and drops."
   ],
   [
    "Bottleneck",
    "The lowest-capacity point in a path that limits overall performance."
   ],
   [
    "Latency",
    "The delay for data to travel from source to destination, often measured as round-trip time."
   ],
   [
    "Jitter",
    "Variation in packet delay, which degrades real-time voice and video."
   ],
   [
    "Oversubscription",
    "Aggregating more potential traffic onto a link than it can carry at once."
   ]
  ],
  "example": "Remote staff complain that video calls break up every morning. Monitoring shows the branch's internet link at 100 percent from 9 to 10 am, and flow data shows cloud backup uploads starting at 9 on every PC. An mtr test during that hour shows loss and high jitter starting at the branch's own edge router. Moving backups to overnight and adding QoS priority for video traffic removes the jitter and packet loss, and the baseline graphs show the morning peak falling to 40 percent. The team also sets an alert for sustained utilisation above 80 percent.",
  "tip": "Choppy or robotic voice points to jitter and packet loss; slow file transfers point to bandwidth, congestion or a bottleneck; delay on every interaction points to latency. QoS helps prioritize but does not create bandwidth.",
  "check": [
   [
    "A branch upgrades its satellite internet from 50 to 200 Mbps, but remote desktop sessions still feel sluggish. Why?",
    "Remote desktop is sensitive to latency, and satellite propagation delay stays the same regardless of bandwidth; more bandwidth does not reduce round-trip time."
   ],
   [
    "Forty-eight gigabit users share one 1 Gbps uplink, and performance drops at busy times with output drops on the uplink. What is this and what are two fixes?",
    "Oversubscription causing congestion; upgrade the uplink (for example to 10 Gbps) or add links with link aggregation, and use QoS to protect critical traffic."
   ],
   [
    "A traceroute shows 30% loss at hop 4 but 0% loss at hops 5 and 6 and the destination. Is hop 4 dropping user traffic?",
    "Probably not; the router at hop 4 is likely rate-limiting its responses to probes, since traffic passing through it to later hops is not lost."
   ],
   [
    "What is the difference between latency and jitter, and which matters more for a voice call?",
    "Latency is the delay itself; jitter is the variation in that delay. Voice is especially sensitive to jitter, which causes choppy audio, although high latency also hurts conversation."
   ]
  ]
 },
 {
  "t": "Wireless issues: interference, channel overlap, signal degradation, coverage gaps, client disassociation, roaming misconfiguration",
  "body": [
   "Wireless networks share airtime and are exposed to the physical environment, so they produce more varied problems than wired networks, and the same symptom ('Wi-Fi is slow' or 'it keeps dropping') can have several causes. Most wireless complaints come down to radio frequency (RF) conditions, channel planning or configuration consistency. A Wi-Fi analyzer, a spectrum analyzer and survey tools are your main instruments, and the key measurements are signal strength (RSSI, in dBm), noise and the signal-to-noise ratio (SNR). A useful habit is to ask three questions: where does it happen, when does it happen, and to which devices?",
   "Interference is unwanted RF energy on the same frequencies. Non-Wi-Fi sources in 2.4 GHz include microwave ovens, Bluetooth devices, cordless phones, wireless video senders and baby monitors; neighbouring Wi-Fi networks are also a source. Interference raises the noise floor, lowering the SNR, which forces lower data rates and more retransmissions. For example, a signal of -65 dBm over a noise floor of -95 dBm gives a healthy 30 dB SNR, but if a microwave raises the noise to -75 dBm, SNR falls to 10 dB and performance collapses even though the signal itself has not changed. A spectrum analyzer shows non-Wi-Fi sources that a normal Wi-Fi scan cannot identify, and the timing (every lunchtime near the kitchen) is often a giveaway. Fixes include moving clients to 5 or 6 GHz, changing channels, relocating access points or removing the source.",
   "Channel overlap comes in two forms. Adjacent-channel interference occurs when nearby access points use overlapping channels, such as 2.4 GHz channels 1 and 3, so their transmissions corrupt each other. Co-channel interference occurs when nearby access points share the same channel; they do not corrupt each other but must take turns, reducing capacity. Use only non-overlapping channels (1, 6 and 11 in 2.4 GHz), plan channel reuse so neighbours differ, use narrower channel widths in dense areas and reduce transmit power so cells do not overlap excessively. Controllers' automatic radio resource management usually handles this well if it is enabled and not overridden by manual settings.",
   "Signal degradation and coverage gaps are about signal strength. Walls, floors, metal shelving, lift shafts, coated glass, water (including people and fish tanks) and distance all weaken signals through attenuation and absorption, while reflection off metal can cause multipath problems. Coverage gaps, or dead zones, are areas where signal falls below a usable level, such as about -67 dBm for voice-grade service. Symptoms include slow speeds and drops in particular spots, for example a stairwell or a new storeroom full of metal racks. A site survey heat map reveals gaps; fixes are adding or moving access points, adjusting power and antenna types, or using mesh for hard-to-cable areas. Do not simply turn power to maximum everywhere: clients transmit at lower power than access points, and an access point heard from far away but unable to hear the client back causes one-way links and sticky clients.",
   "Client disassociation means clients are disconnected from the access point. Causes include weak signal, interference, aggressive power-saving settings in client drivers, outdated drivers or firmware, access points overloaded with too many clients, authentication problems (for example RADIUS timeouts or an expired server certificate in 802.1X) and deliberate deauthentication attacks, which protected management frames (802.11w, required in WPA3) help prevent. Controller and access point logs usually record a reason code for each disassociation, which quickly separates 'client left' from 'authentication failed' or 'AP overloaded'. If one model of laptop drops constantly while others are fine, suspect its driver.",
   "Roaming misconfiguration breaks the handoff as users move. For seamless roaming, access points in the same ESS must use the same SSID, the same security settings and passphrase or 802.1X configuration, and map to the same VLAN (or the controller must handle the mobility), otherwise clients drop, reauthenticate slowly or get a new IP address that breaks active sessions. Too much cell overlap makes sticky clients cling to a distant access point instead of roaming, while too little overlap (commonly around 15 to 20 percent is targeted for voice) causes drop-outs between cells. Fast roaming features such as 802.11r, with 802.11k and 802.11v assisting, help voice clients move without breaking calls. Common mistakes: changing the passphrase on some access points but not others, mixing autonomous and controller-managed access points with different settings, and adding access points without adjusting channels.",
   "Walk through a diagnosis. Complaint: 'Wi-Fi drops in the east wing every afternoon.' Where: east wing only, so check coverage and channel plan there. When: afternoons, so look for time-based interference or load, such as a class moving in. Which devices: all types, so it is probably RF or capacity rather than a driver. The analyzer shows two access points on channel 6 at full power and a third on channel 4, and the controller logs show high client counts. Moving to 1, 6 and 11, lowering power and adding one access point resolves it.",
   "Exam clue words: 'microwave', 'Bluetooth', 'noise floor' mean interference; 'channels 1, 3 and 5' mean adjacent-channel overlap; 'all APs on the same channel' means co-channel interference; 'drops in one room or stairwell' means a coverage gap; 'disconnects with reason codes', 'deauthentication flood' mean client disassociation; 'drops while walking between areas', 'new IP after moving' mean roaming misconfiguration; 'non-Wi-Fi source' means use a spectrum analyzer."
  ],
  "terms": [
   [
    "Noise floor",
    "The level of background RF energy; a higher noise floor reduces signal-to-noise ratio."
   ],
   [
    "Signal-to-noise ratio",
    "The difference in dB between signal strength and noise; higher values allow faster, more reliable data rates."
   ],
   [
    "Adjacent-channel interference",
    "Corruption caused by nearby access points on overlapping, but not identical, channels."
   ],
   [
    "Co-channel interference",
    "Capacity loss when nearby access points use the same channel and must share airtime."
   ],
   [
    "Dead zone",
    "An area with insufficient wireless signal for reliable connectivity."
   ],
   [
    "Sticky client",
    "A wireless client that stays associated to a distant AP instead of roaming to a closer one."
   ],
   [
    "Deauthentication attack",
    "Sending forged management frames to force clients off a wireless network."
   ]
  ],
  "example": "Nurses' voice badges drop calls when walking between wards. A survey shows the ward access points map the same SSID to different VLANs and one ward still uses an old passphrase, so every move forces a full reauthentication and a new IP address, which ends the call. The team aligns the SSID, security settings and VLAN across all wards, enables fast roaming on the controller, and adjusts power so neighbouring cells overlap by about 20 percent. A walk test with a badge on a call confirms it now roams between five access points without a break.",
  "tip": "Many APs on overlapping 2.4 GHz channels = adjacent channel interference; same channel = co-channel interference. Drops in one area = coverage gap. Drops while walking = roaming configuration (SSID, security and VLAN must match). Non-Wi-Fi noise needs a spectrum analyzer.",
  "check": [
   [
    "A laptop shows a strong -60 dBm signal but very poor throughput near the staff kitchen at lunchtime. What is likely happening and how would you prove it?",
    "Interference, probably from a microwave oven raising the noise floor and lowering SNR; a spectrum analyzer would show the non-Wi-Fi energy at those times."
   ],
   [
    "Why might turning every access point to maximum power make performance worse?",
    "It increases co-channel interference and cell overlap, and clients may hear the access point but be unable to reach it at their lower power, causing sticky clients and poor roaming."
   ],
   [
    "Only one model of laptop keeps disconnecting from Wi-Fi, while phones and other laptops are fine in the same spot. Where should you look first?",
    "The client side: that model's wireless driver, firmware or power-saving settings, since the RF environment is the same for all devices."
   ],
   [
    "Users get a new IP address every time they walk from building A to building B on the same SSID. What configuration is inconsistent?",
    "The VLAN or subnet mapping for the SSID differs between the buildings' access points (or the controllers do not share mobility), so roaming changes networks."
   ]
  ]
 },
 {
  "t": "Software tools: protocol analyzer, command line (ping, traceroute, nslookup, dig, tcpdump, netstat, arp, ip/ipconfig), nmap, LLDP/CDP, speed testers, iperf",
  "body": [
   "Software tools let you see what the network is doing, and Network+ expects you to choose the right one for a scenario and interpret basic output. Think of each tool as answering one question: is it reachable, where does the path break, what is my configuration, is the service listening, what is really on the wire, what is connected to this port, and how fast is this path? Practise each in a lab, because many questions show output and ask what it means. Only scan or capture on networks you are authorized to test.",
   "A protocol analyzer (packet analyzer) such as Wireshark captures traffic and decodes every header and field, letting you examine the TCP handshake, DNS queries, DHCP exchanges, retransmissions and errors. tcpdump is the command-line equivalent on Linux and Unix, often used on servers without a graphical interface; for example `tcpdump -i eth0 port 53` shows DNS traffic, and `tcpdump -w file.pcap` saves a capture you can open later in Wireshark. Capture filters limit what is recorded, which matters on busy links; display filters narrow what you view afterwards, such as `dns` or `tcp.analysis.retransmission` in Wireshark. To capture other hosts' traffic on a switched network, use a SPAN port or tap.",
   "Basic connectivity tools come first. `ping` sends ICMP Echo Requests and reports replies and round-trip times, proving reachability and revealing latency and loss; a failure may mean the host is down, a route is missing or ICMP is filtered, so do not over-interpret it. `traceroute` (Linux and macOS) or `tracert` (Windows) lists each router hop by sending probes with increasing TTL, showing where a path stops or where delay begins; `pathping` on Windows and `mtr` on Linux combine both over time. `ipconfig` on Windows (with `/all`, `/release`, `/renew` and `/flushdns`) and `ip addr` and `ip route` on Linux (replacing older `ifconfig` and `route`) show addressing, gateway and DNS. `arp -a` displays the ARP cache of IP-to-MAC mappings, useful for duplicate IPs and spotting ARP spoofing. `netstat -an` shows active connections and listening ports (`ss -tuln` on modern Linux), which tells you whether a service is actually listening and whether connections are established.",
   "```\n$ ss -tuln | grep 443\ntcp  LISTEN 0  511  0.0.0.0:443  0.0.0.0:*\n$ dig www.example.com +short\n203.0.113.80\n$ nslookup -type=mx example.com\nexample.com  mail exchanger = 10 mail1.example.com.\n$ nmap -p 22,80,443 10.0.20.15\nPORT    STATE    SERVICE\n22/tcp  open     ssh\n80/tcp  closed   http\n443/tcp filtered https\n```",
   "DNS tools test name resolution directly. `nslookup` works on all platforms; `dig` on Linux and macOS gives more detailed output, including the answer section, flags and TTLs. Both let you query a specific server and record type, such as `dig @10.0.0.53 example.com MX` or `nslookup -type=ptr 10.1.1.20`, which helps separate client problems from server problems. `nmap` is a network scanner that discovers live hosts, open ports, running services and versions, and can guess operating systems. In the output above, open means a service answered, closed means the host answered but nothing listens, and filtered means a firewall silently dropped the probe. Administrators use nmap for inventory, verifying firewall rules and hardening, and finding unauthorized services, but scanning without permission is prohibited by most policies and may be illegal.",
   "LLDP (Link Layer Discovery Protocol, the vendor-neutral standard) and CDP (Cisco Discovery Protocol) let directly connected devices advertise their name, model, port and management address. Commands such as `show lldp neighbors` or `show cdp neighbors` quickly reveal what is plugged into which port, and many servers and phones can display the switch and port they are connected to. Because they reveal information useful to attackers, they are often disabled on untrusted user or internet-facing ports. Speed testers measure throughput from a client to a test server, usually on the internet, giving a quick view of download, upload and latency, but results depend on the test server and everything in between. `iperf` gives a controlled measurement: run `iperf3 -s` on one host and `iperf3 -c <server>` on another to measure throughput between two points you control, such as across a WAN link or wireless segment, isolating the network path from internet variables.",
   "Common mistakes include concluding a host is down because ping fails (ICMP may be blocked), trusting an internet speed test to judge an internal link, reading 'filtered' in nmap as 'closed', running nmap on networks you are not authorized to scan, and capturing on your own laptop's switch port and wondering why you only see your own traffic. Choose the least invasive tool that answers the question.",
   "Exam clue words: 'is the host reachable' means ping; 'at which hop does it fail' means traceroute or tracert; 'is the service listening', 'which ports are open locally' means netstat or ss; 'open ports on remote hosts' means nmap; 'name resolution' means nslookup or dig; 'IP-to-MAC mapping' means arp; 'decode packets', 'see the handshake' means a protocol analyzer or tcpdump; 'what switch port is this server on' means LLDP or CDP; 'throughput between two sites we control' means iperf."
  ],
  "terms": [
   [
    "Protocol analyzer",
    "Software that captures and decodes network traffic for detailed inspection, such as Wireshark."
   ],
   [
    "tcpdump",
    "A command-line packet capture tool for Linux and Unix that can save captures for later analysis."
   ],
   [
    "traceroute",
    "A tool that reveals each router hop to a destination by sending packets with increasing TTL values."
   ],
   [
    "netstat",
    "A command that displays network connections, listening ports and routing information on a host."
   ],
   [
    "nmap",
    "A network scanner that discovers hosts, open ports, services and operating systems."
   ],
   [
    "LLDP",
    "Link Layer Discovery Protocol: a vendor-neutral protocol devices use to advertise identity and capabilities to neighbours."
   ],
   [
    "iperf",
    "A tool that measures maximum throughput between a client and a server you control."
   ]
  ],
  "example": "A new branch link is contracted at 500 Mbps, but file copies from headquarters seem slow. The engineer runs an iperf3 server at headquarters and a client at the branch and measures 480 Mbps, proving the WAN link is fine. Running `netstat -an` on the file server shows hundreds of connections, and a Wireshark capture on its switch port via SPAN shows frequent TCP retransmissions from the server itself. `show lldp neighbors` confirms which switch port the server uses, where CRC errors are climbing, and replacing the server's failing network card fixes the problem.",
  "tip": "Where does the path break? traceroute. Is the service listening? netstat. What is plugged into this port? LLDP/CDP. What ports are open on hosts? nmap. Name resolution? nslookup or dig. Throughput between two points you control? iperf.",
  "check": [
   [
    "A server does not reply to ping, but users can still use its website. What does this tell you?",
    "ICMP is probably blocked by a firewall; ping failure alone does not prove a host is down, so test the actual service instead."
   ],
   [
    "An nmap scan reports TCP 443 as filtered on a web server. What is the difference between filtered and closed?",
    "Filtered means no response came back, usually because a firewall dropped the probe; closed means the host responded that nothing is listening on that port."
   ],
   [
    "How does iperf differ from an internet speed test, and when would you prefer it?",
    "iperf measures throughput between two endpoints you control, isolating a specific path such as a WAN link; a speed test measures to an internet server and is affected by external factors."
   ],
   [
    "You start Wireshark on your laptop to troubleshoot traffic between two servers but see none of it. Why, and what fixes it?",
    "Switches send unicast frames only to the destination port, so your port does not receive their traffic; configure a SPAN (port mirror) or use a network tap."
   ]
  ]
 },
 {
  "t": "Hardware tools: toner and probe, cable tester, cable certifier, TDR/OTDR, loopback plug, Wi-Fi analyzer, visual fault locator",
  "body": [
   "When software tools point to Layer 1, you need hardware tools to find the fault. Each tool answers a specific question, and the exam gives a scenario and asks which tool fits, so learn them by their question rather than by their appearance: which cable is it, is it wired correctly, does it meet its category, how far away is the fault, is this port working, what is the radio environment, and where is this fibre broken?",
   "A toner and probe (tone generator and probe) traces and identifies a cable. You attach the toner to one end of a cable, for example at a wall jack, and it puts an audible signal on the wire; at the patch panel or in the ceiling you move the inductive probe along the cables until you hear the tone loudest, identifying the matching cable. It answers 'which cable is this?' and is indispensable in unlabelled wiring closets. It does not test cable quality, and tone can bleed onto neighbouring cables, so confirm the loudest one. Once found, label both ends and update the cable map.",
   "A cable tester checks basic wiring: continuity of each wire, opens, shorts, miswires, reversed pairs and, on better models, split pairs, usually with a remote unit at the far end. It answers 'is this cable wired correctly?'. A cable certifier goes much further, testing the cable against a category standard such as Cat 6 or Cat 6a by measuring insertion loss (attenuation), near-end and far-end crosstalk, return loss, length and more across the relevant frequencies. It produces a pass or fail report that installers provide to prove a new installation meets specification. Certifiers are expensive, so use them for acceptance testing and stubborn intermittent faults, not every patch cord. The distinction matters: a cable can pass a wiremap test and still fail certification because of crosstalk from poor terminations.",
   "A time-domain reflectometer (TDR) sends a pulse down a copper cable and times reflections from faults such as breaks, shorts or impedance changes, reporting the distance to the fault. An optical time-domain reflectometer (OTDR) does the same for fibre with light pulses, producing a trace that shows distance to breaks, bad splices, sharp bends and connectors along a run that may be kilometres long. They answer 'where along the cable is the problem?', which is vital when the cable is buried or hidden in walls. Many cable testers and certifiers include TDR functions. For fibre, an optical power meter and light source measure total loss on a link, which you compare with the loss budget for the optics in use.",
   "A loopback plug connects a port's transmit to its receive, so the device hears its own signal. Plugging one into a NIC, switch port or serial port lets you test whether the port itself works, isolating it from the cable and the far-end device; if the port passes with a loopback plug, look at the cable or remote end. Fibre loopbacks join the transmit and receive connectors of an optic. This is the hardware equivalent of pinging 127.0.0.1: it tests the local piece in isolation.",
   "A Wi-Fi analyzer, which may be a laptop or phone app or a dedicated device, shows nearby SSIDs, BSSIDs, channels, channel widths, signal strength in dBm and often noise and security settings. Use it to choose channels, find overlap, validate coverage and spot rogue or evil twin access points. A spectrum analyzer goes deeper, showing all RF energy including non-Wi-Fi interference such as microwave ovens. A visual fault locator (VFL) shines a bright visible red laser into a fibre. Where the fibre is broken or bent too sharply, red light leaks out and glows through the jacket, and at the far end you can see whether light arrives, confirming continuity and polarity. It works over short distances, commonly patch cords and runs within a building; for long runs use an OTDR. Never look directly into a fibre or optic that may carry invisible laser light.",
   "Walk through choosing tools for one job. A user's desk port is dead. A loopback plug in the switch port shows the port works. A cable tester on the run shows pin 3 open, so the cable is at fault; the TDR function reports the open at 42 m, which the cable map shows is where the run passes through a recently renovated wall. After re-terminating, a certifier confirms the run still passes Cat 6. Common mistakes: using a toner to test quality, using a VFL to locate a break 3 km away, assuming a wiremap pass means the cable supports 10 Gbps, and confusing a Wi-Fi analyzer with a spectrum analyzer.",
   "Exam clue words: 'identify which cable in a bundle' or 'unlabelled patch panel' means toner and probe; 'opens, shorts, miswires' means cable tester; 'prove it meets Cat 6a', 'report for the customer' means certifier; 'distance to the break' means TDR (copper) or OTDR (fibre); 'test the port itself' means loopback plug; 'channels and signal strength' means Wi-Fi analyzer; 'red light shows where the fibre patch cord is broken' means VFL."
  ],
  "terms": [
   [
    "Toner and probe",
    "A tool pair used to trace and identify a specific cable among many."
   ],
   [
    "Cable tester",
    "A tool that checks wiring continuity and detects opens, shorts, miswires and reversed pairs."
   ],
   [
    "Cable certifier",
    "A tester that verifies a cabling run meets a specific category's performance standards and produces a report."
   ],
   [
    "TDR",
    "Time-domain reflectometer: measures reflections in copper cable to find the distance to a fault."
   ],
   [
    "OTDR",
    "Optical time-domain reflectometer: locates breaks, splices and losses along a fibre by timing reflected light."
   ],
   [
    "Loopback plug",
    "A connector that routes a port's transmit signal back to its receive pins to test the port."
   ],
   [
    "Visual fault locator",
    "A device that injects visible red light into fibre to reveal breaks, sharp bends and continuity."
   ]
  ],
  "example": "A fibre link between two buildings 2 km apart goes down after construction work. A light meter at the far end confirms no light arrives, and swapping the optics changes nothing. The technician connects an OTDR, whose trace shows a clean run and then an abrupt end about 740 m from the main building, near the construction trench. The contractor digs at that exact spot, finds the severed cable and splices it, and a second OTDR trace plus a power meter reading confirm the link loss is within budget before the switches are reconnected.",
  "tip": "Which cable is it? Toner and probe. Is it wired right? Cable tester. Does it meet Cat 6 performance? Certifier. How far to the break? TDR (copper) or OTDR (fibre). Is the port itself good? Loopback plug. Where is a fibre patch cord broken? VFL.",
  "check": [
   [
    "A newly installed run passes a basic cable tester's wiremap, but the client refuses to sign off until you prove it supports 10 Gbps at Cat 6a. What tool do you need and why is the tester not enough?",
    "A cable certifier; a basic tester only checks wiring and continuity, while a certifier measures crosstalk, insertion loss and other parameters against the Cat 6a standard."
   ],
   [
    "A switch port shows no link with a known good cable and PC. How can you tell whether the switch port itself is faulty?",
    "Insert a loopback plug into the port; if the port comes up and passes traffic to itself, the port works and the fault is elsewhere."
   ],
   [
    "You need to find the distance to a break in a 5 km fibre run. Why is an OTDR better than a VFL here?",
    "A VFL's visible light only works over short distances and needs you to see the glow; an OTDR measures reflections along the whole run and reports the exact distance to the break."
   ],
   [
    "In a closet full of unlabelled cables, you need to find the one that goes to office 214. Which tool, and how is it used?",
    "A toner and probe: attach the toner at the office 214 jack, then trace with the probe at the patch panel until the tone is loudest, then label it."
   ]
  ]
 },
 {
  "t": "Basic device commands: show mac-address-table, show route, show interface, show config, show arp, show vlan, show power",
  "body": [
   "Network+ includes a set of generic device commands modelled on common switch and router command-line interfaces. Exact syntax varies between vendors, for example `show ip route` on Cisco IOS versus `show route` elsewhere, and `show mac address-table` with or without a hyphen, but the exam focuses on what each command shows and when to use it. Practise them in a simulator or lab and learn to read the output, because performance-based questions may show you output and ask what is wrong. The real skill is chaining them: each command answers one question and points to the next.",
   "`show mac-address-table` (often `show mac address-table`) lists the MAC addresses a switch has learned, with their VLAN, type (dynamic or static) and port. Use it to find where a device is connected, trace a duplicate IP to a port after finding the MAC with ARP, or spot problems: many MACs on a user port suggest an unauthorized switch or access point, and a MAC moving between ports suggests a loop. `show route` (or `show ip route`) displays the routing table: connected, static and dynamic routes, their next hops, administrative distances and metrics, and the gateway of last resort. Use it when traffic to some networks fails, and remember longest prefix match decides which entry is used.",
   "`show interface` (or `show interfaces`) gives detailed status and statistics for each interface: up/down state, line protocol, speed, duplex, MTU, input and output rates, and error counters such as CRC, runts, giants, collisions and output drops. It is the first place to look for physical and duplex problems. Summary versions such as `show ip interface brief` or `show interfaces status` list all ports on one screen, making it easy to spot a port that is down, err-disabled or running at the wrong speed. `show config` covers viewing configurations: `show running-config` shows the active configuration in memory, and `show startup-config` shows what will load after a reboot. Comparing them reveals unsaved changes. Reviewing the configuration lets you confirm VLAN assignments, ACLs, trunk settings, NTP and AAA settings, and compare against the golden config.",
   "`show arp` (or `show ip arp`) displays the device's ARP table, mapping IP addresses to MAC addresses on directly connected networks, typically on a router or Layer 3 switch that is the hosts' gateway. Together with the MAC address table it lets you go from an IP address to a physical switch port. `show vlan` (often `show vlan brief`) lists VLANs configured on the switch with their names, status and assigned access ports. Use it when a device lands in the wrong subnet or a VLAN appears missing; trunk ports are not listed there, so use `show interfaces trunk` for those. `show power` (often `show power inline`) displays PoE status: the total power budget, how much is used and remaining, and for each port whether power is on, which class was detected and how many watts are allocated. Use it when phones, cameras or access points will not power up or keep rebooting.",
   "Here is the classic chain for finding the physical location of an IP address, run first on the gateway and then on the access switch:",
   "```\nCORE# show ip arp 10.1.20.33\nProtocol  Address      Age  Hardware Addr   Type  Interface\nInternet  10.1.20.33   2    0011.2233.4455  ARPA  Vlan20\nACC3# show mac address-table address 0011.2233.4455\nVlan  Mac Address     Type     Ports\n  20  0011.2233.4455  DYNAMIC  Gi1/0/12\nACC3# show interfaces status | include Gi1/0/12\nGi1/0/12  Printer-2F  connected  20  a-full  a-100  10/100/1000BaseTX\n```",
   "The output shows the IP belongs to MAC 0011.2233.4455, which is learned on port Gi1/0/12 of the access switch in VLAN 20, and that port connects to a printer at 100 Mbps full duplex. If the MAC table had shown the address on an uplink port instead, you would repeat the lookup on the next switch downstream until you reach an access port. Common mistakes: looking for a remote host's MAC in the ARP table of a router that is not on that subnet, expecting trunk ports in `show vlan brief`, reacting to old error counters without checking if they are increasing, and forgetting that unsaved running-config changes disappear on reboot.",
   "Exam questions map a need to a command. 'Where is this MAC plugged in' means show mac-address-table; 'which MAC has this IP' means show arp; 'why can't we reach that network' means show route; 'errors, speed or duplex' means show interface; 'is the port in the right VLAN' means show vlan; 'PoE device dead or rebooting' means show power; 'will this change survive a reboot' means comparing running and startup configurations with show config."
  ],
  "terms": [
   [
    "MAC address table",
    "The switch table mapping learned MAC addresses to ports and VLANs."
   ],
   [
    "Routing table",
    "The router's list of destination networks with next hops, administrative distances and metrics."
   ],
   [
    "Interface counters",
    "Per-interface statistics such as CRC errors, runts, giants and drops used to diagnose problems."
   ],
   [
    "Running configuration",
    "The active configuration currently in use in a device's memory."
   ],
   [
    "Startup configuration",
    "The saved configuration loaded when a device boots."
   ],
   [
    "ARP table",
    "A table mapping IP addresses to MAC addresses for devices on directly connected networks."
   ],
   [
    "PoE status",
    "The show power output listing the PoE budget, usage and per-port power allocation."
   ]
  ],
  "example": "A duplicate IP alert names 10.1.20.33. On the core switch, which is the VLAN 20 gateway, `show arp` shows the IP currently maps to MAC 0011.2233.4455. `show mac-address-table` on the access switch finds that MAC on port Gi1/0/12 in VLAN 20, and `show interface` on that port shows it connects to a printer someone configured with a static address inside the DHCP scope. The technician gives the printer a DHCP reservation, adds an exclusion for the static range, and uses `show running-config` and `show startup-config` to confirm the switch has no unsaved changes before closing the ticket.",
  "tip": "Where is this MAC plugged in? show mac-address-table. What IP belongs to which MAC? show arp. Why can't we reach that network? show route. Errors or duplex? show interface. Wrong VLAN? show vlan. PoE device dead? show power. Unsaved changes? compare running and startup config.",
  "check": [
   [
    "You look up a MAC address in a switch's MAC address table and find it on the uplink port Gi1/0/48. What does that mean and what do you do next?",
    "The device is not directly connected to this switch; it is reached through the uplink, so repeat the lookup on the neighbouring switch (found with LLDP or CDP) until the MAC appears on an access port."
   ],
   [
    "A new VLAN 60 port assignment works, but after a power cut the port is back in VLAN 1. Which commands would have shown the risk beforehand?",
    "Comparing show running-config with show startup-config, which would reveal the change was never saved."
   ],
   [
    "A camera on port Gi1/0/9 will not power on, while other PoE devices work. Which command helps, and what would you look for?",
    "show power inline: check the remaining budget, whether port Gi1/0/9 is on or off, and the class detected for the camera versus what the port can supply."
   ],
   [
    "Users in one building cannot reach 10.40.0.0/16, but everything else works. Which command on the building's router is most useful first?",
    "show route (show ip route), to check whether a route to 10.40.0.0/16 exists and which next hop it uses."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
