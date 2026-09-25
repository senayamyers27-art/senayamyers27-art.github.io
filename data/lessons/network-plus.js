/* Lessons for CompTIA Network+ (N10-009): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("network-plus", [
 {
  "t": "OSI model layers and the data unit at each layer",
  "body": [
   "The Open Systems Interconnection (OSI) model is a seven-layer reference model that splits the job of moving data between two computers into separate responsibilities. Nobody implements the OSI model exactly as written, but every network professional uses it as a shared vocabulary. When a colleague says 'it is a Layer 2 problem' they mean the fault is in switching, MAC addresses or VLANs, not in routing or the application. Network+ uses the model constantly, both directly (which layer does X work at?) and indirectly in troubleshooting questions.",
   "From the bottom up the layers are: 1 Physical, 2 Data Link, 3 Network, 4 Transport, 5 Session, 6 Presentation and 7 Application. A common memory aid bottom-up is 'Please Do Not Throw Sausage Pizza Away'; top-down, 'All People Seem To Need Data Processing'. Layer 1 moves raw bits as electrical, light or radio signals over cables and connectors. Layer 2 frames those bits for delivery on the local segment using MAC (Media Access Control) addresses, and it detects errors with a frame check sequence. Layer 3 gives logical, routable addresses (IPv4 and IPv6) and chooses paths between networks. Layer 4 provides end-to-end delivery between applications using port numbers, with TCP (Transmission Control Protocol) for reliable delivery or UDP (User Datagram Protocol) for lightweight delivery.",
   "The upper layers are often blurred together in practice. Layer 5, Session, sets up, maintains and tears down conversations between applications. Layer 6, Presentation, handles data formatting, character encoding, compression and encryption, which is why TLS is sometimes placed here. Layer 7, Application, is the network-facing interface that programs use: HTTP, DNS, SMTP, SSH and similar protocols. Layer 7 does not mean the application itself, such as the web browser; it means the protocol the browser speaks.",
   "As data travels down the stack on the sender, each layer adds its own header (and Layer 2 also adds a trailer). This is encapsulation; the receiver strips headers in reverse order, which is de-encapsulation. The name for the chunk of data at each layer is its protocol data unit (PDU). Layers 5 to 7 simply call it data. Layer 4 produces a segment for TCP (a UDP unit is usually called a datagram). Layer 3 produces a packet. Layer 2 produces a frame. Layer 1 transmits bits.",
   "Devices map to layers too, and the exam likes these pairings. Hubs, repeaters, cables and media converters are Layer 1. Switches and bridges forward frames by MAC address at Layer 2; wireless access points also operate largely at Layer 2. Routers forward packets by IP address at Layer 3, and a multilayer switch can do both. Load balancers, proxies and next-generation firewalls can inspect up to Layer 7.",
   "Use the model for troubleshooting as well. A bottom-up approach starts with link lights and cables, then MAC and VLAN, then IP addressing and routing, then ports and services. A top-down approach starts at the application. Either way, the layers let you split a big problem into testable pieces. In Wireshark you can see this directly: each captured packet shows an Ethernet section, an IP section, a TCP or UDP section and then the application protocol, which is encapsulation laid out for you."
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
    "MAC address",
    "A 48-bit hardware address used at Layer 2 to deliver frames on the local network segment."
   ],
   [
    "Frame check sequence",
    "The Layer 2 trailer field containing a CRC value that the receiver uses to detect corrupted frames."
   ]
  ],
  "example": "A user cannot reach an internal web site. You check the switch port and see the link light on (Layer 1 fine), confirm the PC is in the right VLAN (Layer 2), ping the server's IP successfully (Layer 3), then find the web service is not listening on TCP 443 (Layer 4/7). Working through the layers took you straight to the fault.",
  "tip": "Memorize the PDU names in order: bits (1), frames (2), packets (3), segments or datagrams (4), data (5 to 7). Also remember that switches are Layer 2 and routers Layer 3 unless the question says multilayer switch.",
  "check": [
   [
    "At which OSI layer does a router make its forwarding decision, and what is the PDU called there?",
    "Layer 3, the Network layer; the PDU is a packet and the decision uses the destination IP address."
   ],
   [
    "Which layer handles encryption, compression and data format translation?",
    "Layer 6, the Presentation layer."
   ],
   [
    "What does a switch look at to forward traffic?",
    "The destination MAC address in the Layer 2 frame header."
   ]
  ]
 },
 {
  "t": "Network appliances: routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS/SAN, wireless controllers",
  "body": [
   "Network appliances are the building blocks you connect to make a network work. They can be dedicated physical boxes or virtual appliances running on a hypervisor or in the cloud. The exam expects you to know what each one does, which OSI layer it mainly operates at and when to choose one over another.",
   "A router connects different IP networks and forwards packets between them using a routing table (Layer 3). Every subnet needs a router interface as its default gateway to reach other networks. A switch connects devices within the same network and forwards frames by learning which MAC address lives on which port (Layer 2). Unlike an old hub, which repeated every bit out every port, a switch sends unicast frames only to the right port, and each switch port is its own collision domain. A Layer 3 or multilayer switch can also route between VLANs at high speed.",
   "A firewall enforces a security policy by allowing or blocking traffic. A basic stateless packet filter checks addresses and ports in each packet. A stateful firewall tracks connections, so return traffic for a session a user started is allowed automatically. A next-generation firewall (NGFW) adds application awareness, user identity and often intrusion prevention. An intrusion detection system (IDS) watches a copy of traffic, for example from a span port or tap, and alerts on suspicious patterns; it does not block. An intrusion prevention system (IPS) sits inline and can drop malicious traffic as it happens. Both use signatures (known patterns) and anomaly or behaviour detection (deviations from a baseline).",
   "A load balancer spreads client requests across a pool of servers to improve performance and availability. It performs health checks so it stops sending traffic to a failed server, and it can use methods such as round robin or least connections. Many can also terminate TLS and keep a user on the same server (session persistence). A proxy server makes requests on behalf of clients. A forward proxy sits in front of users and can cache content and filter web access; a reverse proxy sits in front of servers and hides them from the internet.",
   "Storage appliances come in two flavours. Network-attached storage (NAS) is a file server: clients access shared files over the normal network using file protocols such as SMB or NFS. A storage area network (SAN) provides block-level storage that servers see as local disks; it usually runs on a dedicated network using Fibre Channel or iSCSI (SCSI over IP). The short version: NAS shares files, SAN shares blocks.",
   "Finally, a wireless LAN controller (WLC) centrally manages many lightweight access points: it pushes configuration, coordinates channels and transmit power, and handles roaming and authentication. Without a controller, each autonomous access point must be configured individually."
  ],
  "terms": [
   [
    "Stateful firewall",
    "A firewall that tracks the state of connections and automatically allows return traffic that belongs to an established session."
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
   ]
  ],
  "example": "An online store runs three web servers behind a load balancer. When one server crashes, the balancer's health check fails and it sends all customers to the other two, so nobody notices. An NGFW in front filters traffic, and an IDS fed by a span port alerts the security team to scanning attempts.",
  "tip": "IDS is passive and only alerts; IPS is inline and can block. NAS is file-level access over the LAN; SAN is block-level access, usually over a dedicated network.",
  "check": [
   [
    "A company wants a device that can drop attack traffic automatically. Should it deploy an IDS or an IPS?",
    "An IPS, because it sits inline and can block traffic; an IDS only monitors and alerts."
   ],
   [
    "Which appliance distributes client requests across several servers and removes failed servers from the pool?",
    "A load balancer, using health checks."
   ],
   [
    "Servers need storage that appears as local disks. NAS or SAN?",
    "SAN, because it provides block-level storage."
   ]
  ]
 },
 {
  "t": "Network functions: CDN, VPN, QoS, TTL",
  "body": [
   "Beyond boxes, the Network+ objectives name several functions that networks provide. Four of them show up often: content delivery networks, virtual private networks, quality of service and time to live. Each solves a different problem, so learn them by the problem they fix.",
   "A content delivery network (CDN) is a geographically distributed set of servers that cache copies of content close to users. When someone in another country loads your site, their request is directed to a nearby edge server instead of your origin server. The result is lower latency, less load on the origin and better resilience against traffic spikes and some denial-of-service attacks. CDNs are ideal for static content like images, video, scripts and software downloads.",
   "A virtual private network (VPN) creates an encrypted tunnel across an untrusted network such as the internet, so traffic between two points is private and protected from tampering. A site-to-site VPN links whole networks, such as a branch office to headquarters, and is usually built between two firewalls or routers with IPsec. A client-to-site (remote access) VPN lets an individual device join the corporate network, often using an IPsec or SSL/TLS VPN client. With a full tunnel, all of the client's traffic goes through the VPN; with a split tunnel, only traffic for corporate networks goes through it and internet traffic goes out directly. Full tunnel gives more control and inspection; split tunnel saves bandwidth.",
   "Quality of service (QoS) is the set of techniques that give some traffic priority over other traffic when links are congested. Voice and video are sensitive to delay and jitter (variation in delay), while a file download is not. QoS works by classifying and marking traffic, then queuing and scheduling it. At Layer 3, the Differentiated Services Code Point (DSCP) field in the IP header carries the marking; at Layer 2, 802.1Q frames carry a Class of Service (CoS) priority value. Traffic shaping buffers excess traffic to smooth it out, while policing drops or re-marks traffic that exceeds a rate. QoS cannot create bandwidth; it only decides who waits when there is not enough.",
   "Time to live (TTL) is a counter that stops data from living forever. In IPv4, the TTL field in the IP header is set by the sender and decremented by one at every router. When it reaches zero, the router discards the packet and usually sends an ICMP Time Exceeded message back. That prevents packets from circling endlessly in a routing loop, and it is exactly how `traceroute` (or `tracert` on Windows) maps a path: it sends packets with TTL 1, 2, 3 and so on and records who replies. IPv6 has the same idea under the name hop limit. DNS also uses the term TTL for how long a resolver may cache a record, which is a different meaning you should recognise from context."
  ],
  "terms": [
   [
    "CDN",
    "Content delivery network: distributed edge servers that cache content close to users to reduce latency and origin load."
   ],
   [
    "Split tunnel",
    "A VPN mode where only traffic for corporate networks uses the tunnel and other traffic goes directly to the internet."
   ],
   [
    "DSCP",
    "Differentiated Services Code Point: a field in the IP header used to mark packets for QoS treatment."
   ],
   [
    "TTL",
    "Time to live: an IP header counter decremented at each router hop; the packet is discarded at zero to prevent loops."
   ]
  ],
  "example": "A company's VoIP calls sound choppy whenever staff back up files to the cloud. The network team marks voice traffic with a high-priority DSCP value and configures the WAN router to queue it first. Calls become clear, and the backups simply take slightly longer.",
  "tip": "If a question mentions choppy voice or video during busy periods, think QoS. If it mentions reaching global users faster, think CDN. If it mentions routing loops or how traceroute works, think TTL.",
  "check": [
   [
    "What happens when a router receives an IPv4 packet whose TTL drops to zero?",
    "It discards the packet and typically sends an ICMP Time Exceeded message to the source."
   ],
   [
    "What is the difference between a full-tunnel and split-tunnel VPN?",
    "Full tunnel sends all client traffic through the VPN; split tunnel sends only corporate-bound traffic through it."
   ],
   [
    "Does QoS increase available bandwidth?",
    "No. It prioritizes traffic so important flows are served first when bandwidth is limited."
   ]
  ]
 },
 {
  "t": "Cloud concepts: NFV, VPC, security groups, cloud gateways, deployment and service models (IaaS, PaaS, SaaS)",
  "body": [
   "Cloud computing means using computing resources, such as servers, storage and networking, that a provider runs and that you consume on demand over a network. The provider pools resources for many customers, lets you scale up and down quickly and usually charges by use. Network+ focuses on how networking works in that world and on the vocabulary of service and deployment models.",
   "Network functions virtualization (NFV) replaces dedicated hardware appliances, such as routers, firewalls and load balancers, with software versions running on standard servers or in the cloud. Instead of shipping a firewall box to a site, you spin up a virtual firewall. NFV is what makes cloud networking possible, because a provider cannot rack a physical firewall for every customer.",
   "A virtual private cloud (VPC) is your own logically isolated network inside a public cloud. You choose its IP address range and divide it into subnets, typically public subnets for internet-facing resources and private subnets for databases and internal servers. You control routing with route tables. To reach the internet, a VPC uses an internet gateway, which allows traffic in and out for resources with public addresses. Resources in private subnets reach out through a NAT gateway, which allows outbound connections but blocks unsolicited inbound ones. Connecting a VPC back to your data centre uses a VPN gateway or a dedicated private link. Together these are the cloud gateways the exam mentions.",
   "Security in a VPC is layered. A security group is a stateful virtual firewall attached to an individual instance or interface: you list what is allowed in and out, and return traffic is automatically permitted. A network access control list (NACL), in providers that offer one, applies to a whole subnet and is usually stateless, so you must allow both directions explicitly. Remember security group = instance-level and stateful.",
   "Service models describe how much the provider manages for you. In Infrastructure as a Service (IaaS) you rent virtual machines, storage and networks; you manage the operating system and everything above it. In Platform as a Service (PaaS) the provider also runs the OS and runtime, and you deploy your code or database. In Software as a Service (SaaS) you simply use a finished application, such as web email or a CRM. This is the shared responsibility model: the further you go from IaaS to SaaS, the more the provider is responsible for, though you always remain responsible for your data and user access.",
   "Deployment models describe who the cloud is for. A public cloud is shared infrastructure offered to anyone. A private cloud is dedicated to one organization, on premises or hosted. A hybrid cloud combines public and private and moves workloads between them. A community cloud is shared by organizations with common needs, such as government agencies. Cloud networking also brings terms like elasticity (automatically adding or removing resources with demand) and multitenancy (many customers sharing the same physical hardware, isolated logically)."
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
    "NAT gateway",
    "A cloud gateway that lets resources in private subnets make outbound internet connections without accepting unsolicited inbound traffic."
   ],
   [
    "IaaS",
    "Infrastructure as a Service: the customer rents virtual compute, storage and network and manages the OS and above."
   ]
  ],
  "example": "A startup builds a VPC with a public subnet for its web servers and a private subnet for its database. The web servers' security group allows HTTPS from anywhere; the database security group allows only the database port from the web servers' group. The database installs patches through a NAT gateway but cannot be reached from the internet.",
  "tip": "Map the models by who manages the OS: IaaS you do, PaaS and SaaS the provider does. SaaS is a finished application. Internet gateway allows inbound and outbound; NAT gateway allows outbound only.",
  "check": [
   [
    "A developer wants to deploy code without managing servers or the OS. Which service model fits?",
    "PaaS, where the provider manages the infrastructure, OS and runtime."
   ],
   [
    "Are security groups stateful or stateless?",
    "Stateful: return traffic for allowed connections is permitted automatically."
   ],
   [
    "What cloud component lets private-subnet servers download updates without being reachable from the internet?",
    "A NAT gateway."
   ]
  ]
 },
 {
  "t": "Common ports and protocols: FTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP/S, NTP, SNMP, LDAP/S, SMB, Syslog, SQL, RDP, SIP",
  "body": [
   "Applications find each other on a host using port numbers, 16-bit values carried in the TCP or UDP header. Well-known ports (0 to 1023) are assigned to common services, so a server listens on a known port and clients connect to it from a random high-numbered source port. The exam expects you to recognise the port and transport of each common protocol and whether it is secure. Firewall rules, troubleshooting and scan results all depend on this knowledge.",
   "File transfer and remote access: FTP (File Transfer Protocol) uses TCP 21 for control and TCP 20 for data in active mode; it sends credentials in clear text. SFTP runs inside SSH on TCP 22, and FTPS is FTP secured with TLS (often TCP 990 for implicit mode). SSH (Secure Shell) on TCP 22 gives encrypted command-line access and replaces Telnet on TCP 23, which is unencrypted. TFTP (Trivial FTP) uses UDP 69, has no authentication and is used for things like device firmware and configuration files. RDP (Remote Desktop Protocol) uses TCP 3389 for graphical remote access to Windows.",
   "Email and web: SMTP (Simple Mail Transfer Protocol) sends mail between servers on TCP 25; mail clients often submit mail on TCP 587 with STARTTLS, and SMTP over implicit TLS (SMTPS) uses 465. HTTP uses TCP 80 and HTTPS, which is HTTP over TLS, uses TCP 443. For completeness, POP3 is 110 (995 secure) and IMAP is 143 (993 secure).",
   "Infrastructure services: DNS uses port 53, UDP for most queries and TCP for zone transfers and large responses. DHCP uses UDP 67 on the server and UDP 68 on the client. NTP (Network Time Protocol) uses UDP 123. SNMP (Simple Network Management Protocol) uses UDP 161 for polling devices and UDP 162 for traps sent to the manager. Syslog sends log messages to a collector on UDP 514 (TCP and TLS variants also exist). LDAP (Lightweight Directory Access Protocol) queries directories on TCP 389, and LDAPS (LDAP over TLS) uses TCP 636.",
   "File sharing, databases and voice: SMB (Server Message Block), used for Windows file and printer sharing, runs directly over TCP 445. Microsoft SQL Server listens on TCP 1433 by default; other databases use their own ports, such as 3306 for MySQL and 1521 for Oracle. SIP (Session Initiation Protocol) sets up and tears down voice and video calls on port 5060 (UDP or TCP), and 5061 when secured with TLS. The actual audio travels separately, usually as RTP.",
   "A practical way to study is to run `netstat -an` on Windows or `ss -tuln` on Linux and match each listening port to a service, then make flashcards. Group insecure protocols with their secure replacements: Telnet to SSH, HTTP to HTTPS, FTP to SFTP or FTPS, LDAP to LDAPS, SNMPv1/v2c to SNMPv3. Security questions often ask which replacement to use."
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
    "SNMP trap",
    "An unsolicited alert sent by a managed device to the SNMP manager on UDP 162."
   ],
   [
    "LDAPS",
    "LDAP secured with TLS, on TCP 636."
   ]
  ],
  "example": "A firewall administrator is asked to let the help desk manage switches securely and receive their logs. She allows TCP 22 (SSH) to the switches, blocks TCP 23 (Telnet), and allows UDP 514 from the switches to the syslog server and UDP 162 for SNMP traps to the monitoring server.",
  "tip": "Watch for pairs that are easy to swap: SNMP 161 (polling) vs 162 (traps), DHCP 67 (server) vs 68 (client), LDAP 389 vs LDAPS 636, SSH 22 vs Telnet 23, FTP 20/21 vs TFTP UDP 69.",
  "check": [
   [
    "Which port and protocol should replace Telnet for remote CLI management?",
    "SSH on TCP 22, because it encrypts the session."
   ],
   [
    "Which ports does DNS use and when does it use TCP?",
    "Port 53; UDP for normal queries and TCP for zone transfers and large responses."
   ],
   [
    "What port does RDP use?",
    "TCP 3389."
   ]
  ]
 },
 {
  "t": "Protocol types (TCP, UDP, ICMP, GRE, IPsec) and traffic types (unicast, multicast, anycast, broadcast)",
  "body": [
   "Above IP, different protocols carry data in different ways. The IP header has a protocol field that tells the receiver what comes next: 6 for TCP, 17 for UDP, 1 for ICMP, 47 for GRE, 50 for ESP and 51 for AH. You rarely need these numbers on the exam, but knowing that ICMP, GRE and IPsec sit directly on IP (with no port numbers) explains why firewalls must treat them differently.",
   "TCP (Transmission Control Protocol) is connection-oriented and reliable. Before sending data it performs the three-way handshake: the client sends SYN, the server replies SYN-ACK and the client sends ACK. TCP numbers every byte with sequence numbers, the receiver acknowledges what arrives, and lost segments are retransmitted. A sliding window provides flow control so a fast sender does not overwhelm a slow receiver. Connections close with FIN messages, or abruptly with RST. HTTP/S, SSH, SMTP and SMB use TCP.",
   "UDP (User Datagram Protocol) is connectionless and best-effort. There is no handshake, acknowledgement or retransmission, so the header is small and delivery is fast. Applications that prefer timeliness to perfection use it: voice and video, DNS queries, DHCP, NTP, SNMP, syslog and TFTP. If reliability matters, the application itself must handle it.",
   "ICMP (Internet Control Message Protocol) carries error and diagnostic messages for IP. `ping` sends Echo Request and receives Echo Reply; routers send Destination Unreachable when they cannot deliver and Time Exceeded when TTL expires. Blocking all ICMP breaks useful functions like path MTU discovery, so firewalls usually allow selected types. GRE (Generic Routing Encapsulation) is a tunnelling protocol that wraps one packet inside another, letting you carry multicast or routing protocol traffic across a network; GRE provides no encryption on its own. IPsec (Internet Protocol Security) protects IP traffic. AH (Authentication Header) provides integrity and authentication but no encryption; ESP (Encapsulating Security Payload) provides encryption plus integrity. IKE (Internet Key Exchange, UDP 500, and UDP 4500 with NAT traversal) negotiates the keys. Transport mode protects only the payload between two hosts; tunnel mode encrypts the entire original packet and adds a new header, which is what site-to-site VPNs use. GRE over IPsec combines GRE's flexibility with IPsec's encryption.",
   "Traffic types describe how many receivers a packet is meant for. Unicast is one-to-one: a single source to a single destination, which is most traffic. Broadcast is one-to-all on the local network, such as ARP requests and DHCP Discover messages sent to 255.255.255.255 or to the subnet's broadcast address; routers do not forward broadcasts, so a router interface bounds a broadcast domain. Multicast is one-to-many for hosts that have joined a group, using the 224.0.0.0/4 range in IPv4; it suits streaming video and routing protocols such as OSPF. Anycast is one-to-nearest: the same address is advertised from several locations and routing delivers each packet to the closest one. Public DNS resolvers and CDNs rely on anycast. IPv6 has no broadcast at all and uses multicast instead."
  ],
  "terms": [
   [
    "Three-way handshake",
    "The TCP connection setup exchange of SYN, SYN-ACK and ACK."
   ],
   [
    "ESP",
    "Encapsulating Security Payload: the IPsec protocol that provides encryption, integrity and authentication."
   ],
   [
    "GRE",
    "Generic Routing Encapsulation: an unencrypted tunnelling protocol that encapsulates packets, including multicast, inside IP."
   ],
   [
    "Anycast",
    "Addressing where one address is shared by several nodes and traffic is routed to the nearest one."
   ]
  ],
  "example": "A company links two sites with GRE tunnels so that OSPF, which uses multicast, can run between them. Because GRE is unencrypted, the tunnels are protected with IPsec in ESP mode. Meanwhile, users' DNS queries to a public resolver reach whichever anycast node is closest.",
  "tip": "AH authenticates but does not encrypt; ESP encrypts. GRE tunnels but does not encrypt. IPv6 has no broadcast. TCP is reliable and connection-oriented; UDP is fast and connectionless.",
  "check": [
   [
    "Which IPsec protocol provides confidentiality?",
    "ESP (Encapsulating Security Payload); AH provides only integrity and authentication."
   ],
   [
    "What traffic type is an ARP request, and does it cross routers?",
    "Broadcast; routers do not forward it, so it stays in the local broadcast domain."
   ],
   [
    "Why do VoIP and DNS commonly use UDP?",
    "Because they value low overhead and speed over guaranteed delivery; retransmitting late voice data or small queries is not worth TCP's overhead."
   ]
  ]
 },
 {
  "t": "Transmission media and transceivers: copper categories, single-mode vs multimode fiber, coax, SFP/QSFP, connectors",
  "body": [
   "Transmission media are the physical paths that carry signals: copper cables carrying electrical signals, fibre carrying light, and the air carrying radio. Choosing the right medium depends on distance, speed, cost and the environment, and many real-world problems come down to the wrong cable or connector.",
   "Twisted-pair copper is the most common LAN cable. Pairs of wires are twisted to cancel electromagnetic interference and crosstalk. Unshielded twisted pair (UTP) is typical in offices; shielded twisted pair (STP) adds foil or braid for noisy environments such as factory floors. Categories rate what the cable supports. Cat 5e supports 1 Gbps; Cat 6 supports 1 Gbps at 100 m and 10 Gbps over shorter runs (about 55 m); Cat 6a supports 10 Gbps at the full 100 m; Cat 8 supports 25 or 40 Gbps over short runs of about 30 m, mainly in data centres. The standard maximum length for an Ethernet copper channel is 100 metres. Copper uses RJ45 (8P8C) connectors, wired to the T568A or T568B standard. Using the same standard at both ends gives a straight-through cable; using A at one end and B at the other gives a crossover, though most modern ports detect and fix this automatically with Auto-MDIX. For cables run through air-handling spaces above ceilings or below floors, fire codes require plenum-rated cable, which produces less toxic smoke than ordinary PVC.",
   "Coaxial cable has a central conductor surrounded by insulation, a shield and a jacket. You meet it in cable internet and TV, where RG-6 is the common type, using F-type screw connectors. Twinaxial (twinax) cable, with two inner conductors, is used for short, cheap high-speed links in data centres as direct attach copper (DAC) cables.",
   "Fibre-optic cable carries light, so it is immune to electromagnetic interference, is hard to tap and reaches far greater distances than copper. Single-mode fibre (SMF) has a very thin core (about 9 micrometres), uses laser light and can span many kilometres; it is used for long campus and carrier links. Multimode fibre (MMF) has a wider core (50 or 62.5 micrometres), usually uses cheaper LED or VCSEL light sources and is limited to shorter distances, typically within a building or data centre. Common fibre connectors are LC (small, push-latch, very common on transceivers), SC (square, push-pull), ST (round, bayonet twist) and MPO (multi-fibre, for high-density links). Fibre connectors also have polish types: UPC is flat and usually blue, APC is angled and usually green, and the two must not be mated.",
   "Switches and routers often have empty slots that accept pluggable transceivers, which convert electrical signals to the right medium. SFP (small form-factor pluggable) supports around 1 Gbps; SFP+ supports 10 Gbps; QSFP (quad SFP) modules bundle four lanes, so QSFP+ (4 x 10 Gbps) provides 40 Gbps and QSFP28 (4 x 25 Gbps) provides 100 Gbps. Transceivers must match on both ends: same speed, same wavelength and the correct fibre type. A single-mode optic plugged into multimode fibre, or mismatched wavelengths, will not form a reliable link. Bidirectional (BiDi) transceivers send and receive on one strand using two different wavelengths.",
   "Also recognise media converters, which join copper and fibre segments, and wireless, which uses radio as its medium and is covered in later lessons."
  ],
  "terms": [
   [
    "Plenum cable",
    "Cable with a fire-resistant jacket required for runs through air-handling spaces."
   ],
   [
    "Single-mode fibre",
    "Fibre with a narrow core that carries a single light path via laser, supporting long distances."
   ],
   [
    "SFP+",
    "A hot-swappable small form-factor pluggable transceiver supporting 10 Gbps links."
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
  "example": "A company needs to link two buildings 3 km apart at 10 Gbps. Copper cannot reach 100 m beyond, and multimode is too short, so they choose single-mode fibre with matching 10 Gbps single-mode SFP+ optics and LC connectors on each switch.",
  "tip": "Long distance equals single-mode; short, cheaper runs equal multimode. Copper Ethernet tops out at 100 m. Cat 6a is the first category rated for 10 Gbps at the full 100 m.",
  "check": [
   [
    "Why would you choose fibre over copper in a factory full of heavy motors?",
    "Fibre carries light and is immune to electromagnetic interference, and it supports longer distances."
   ],
   [
    "Which transceiver form factor provides 40 Gbps?",
    "QSFP+ (quad small form-factor pluggable)."
   ],
   [
    "What cable jacket type is required above a drop ceiling used for air return?",
    "Plenum-rated cable."
   ]
  ]
 },
 {
  "t": "Topologies and architectures: mesh, star, hub and spoke, spine and leaf, three-tier, collapsed core, north-south vs east-west",
  "body": [
   "A topology is the shape of a network: how devices are connected physically and how traffic logically flows. An architecture is a proven design built from those shapes. Network+ asks you to recognise each and pick the right one for a scenario.",
   "In a star topology, every device connects to a central device, today almost always a switch. It is easy to add devices and troubleshoot, and one failed cable affects only one host, but the central switch is a single point of failure. A mesh topology connects nodes to many other nodes. A full mesh links every node to every other node, giving maximum redundancy but requiring n(n-1)/2 links, which quickly gets expensive; a partial mesh links only the important nodes redundantly. Hub and spoke is a star at WAN scale: branch sites (spokes) connect to a central site (hub). It is simple and cheap, but branch-to-branch traffic must go through the hub, adding delay, and the hub is a single point of failure. Older topologies such as bus and ring are mostly historical but may appear as distractors. A hybrid topology mixes several of these.",
   "Enterprise campus networks traditionally use a three-tier hierarchy. The access layer connects end devices and provides port security, PoE and VLAN assignment. The distribution layer aggregates access switches, routes between VLANs and applies policy. The core layer is a fast, highly redundant backbone that simply moves traffic quickly between distribution blocks. In smaller sites the core and distribution layers are merged into one pair of switches, a collapsed core (two-tier) design, which saves cost while keeping redundancy.",
   "Data centres increasingly use spine and leaf. Every leaf switch (where servers and storage connect) links to every spine switch, and leaves never connect to each other, nor do spines. Any server is therefore always the same number of hops, leaf to spine to leaf, from any other, giving predictable low latency. To add capacity you add spines; to add ports you add leaves. Links are active at the same time using equal-cost multipath routing rather than being blocked by spanning tree.",
   "Traffic direction matters for design and security. North-south traffic flows in and out of the data centre, between clients or the internet and servers. East-west traffic flows sideways between servers inside the data centre, such as a web server talking to a database or virtual machines replicating. Modern applications generate lots of east-west traffic, which is one reason spine and leaf replaced three-tier designs in data centres, and why security now focuses on inspecting internal traffic too (microsegmentation), not just the perimeter."
  ],
  "terms": [
   [
    "Full mesh",
    "A topology where every node connects directly to every other node, maximizing redundancy."
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
  "example": "A retailer connects 200 stores to headquarters with a hub-and-spoke VPN design because it is cheap and simple. Its data centre, where application servers constantly exchange data, uses spine and leaf so any server can reach any other in two switch hops.",
  "tip": "Hub and spoke: cheap but the hub is a single point of failure and spoke-to-spoke traffic transits the hub. Spine and leaf: data centre, east-west heavy. Collapsed core: small or medium campus combining core and distribution.",
  "check": [
   [
    "How many links does a full mesh of 5 nodes require?",
    "10, using n(n-1)/2 = 5 x 4 / 2."
   ],
   [
    "In spine and leaf, do leaf switches connect to each other?",
    "No. Leaves connect only to spines, and every leaf connects to every spine."
   ],
   [
    "Traffic from a web server to a database server in the same data centre is called what?",
    "East-west traffic."
   ]
  ]
 },
 {
  "t": "IPv4 addressing: public vs private (RFC 1918), APIPA, loopback, classes, subnetting and VLSM, CIDR",
  "body": [
   "An IPv4 address is 32 bits written as four decimal octets, such as 192.168.10.25. A subnet mask, such as 255.255.255.0 or /24 in CIDR notation, marks which bits are the network portion and which identify the host. Hosts with the same network portion are on the same subnet and talk directly; anything else goes to the default gateway.",
   "Public addresses are globally unique and routable on the internet. Private addresses, defined in RFC 1918, are free to reuse inside any organization and are not routed on the internet: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. Private hosts reach the internet through NAT. Other special ranges: 127.0.0.0/8 is loopback (127.0.0.1 tests your own TCP/IP stack), and 169.254.0.0/16 is APIPA (Automatic Private IP Addressing), which a Windows host assigns itself when it cannot reach a DHCP server. Seeing a 169.254.x.x address is a strong clue that DHCP failed. The address 100.64.0.0/10 is reserved for carrier-grade NAT.",
   "Classful addressing is historical but still tested. Class A is 1 to 126 in the first octet with a default /8 mask; Class B is 128 to 191 with /16; Class C is 192 to 223 with /24; Class D, 224 to 239, is multicast; Class E, 240 to 255, is experimental. (127 is reserved for loopback.) Classes were replaced by CIDR (Classless Inter-Domain Routing), which allows any prefix length and lets routers summarize many networks into one route, such as advertising 10.1.0.0/16 instead of 256 /24s.",
   "Subnetting borrows host bits to create smaller networks. The key formulas: number of subnets = 2 to the power of borrowed bits; usable hosts per subnet = 2 to the power of host bits, minus 2 (one for the network address, one for the broadcast address). A /26 leaves 6 host bits: 64 addresses, 62 usable. The block size, 256 minus the mask value in the interesting octet, tells you where subnets start: for /26 (255.255.255.192) the block is 64, so subnets start at .0, .64, .128 and .192. For 192.168.1.100/26, the network is 192.168.1.64, the broadcast 192.168.1.127 and usable hosts .65 to .126. A /30 gives 2 usable hosts, handy for point-to-point links, and a /31 is also allowed for them.",
   "VLSM (variable-length subnet masking) means using different mask lengths within one address block so each subnet fits its need without waste. Allocate the largest subnets first. To carve 10.10.0.0/16 for 500, 200, 60 and 2 hosts: 500 hosts need 9 host bits, so 10.10.0.0/23 (510 usable); 200 hosts need 8 host bits, so 10.10.2.0/24; 60 hosts need a /26, 10.10.3.0/26; the 2-host link gets a /30, 10.10.3.64/30. Practise until you can do this on paper quickly, then check with `ipcalc`.",
   "Memorize a small table: /24 = 254 hosts, /25 = 126, /26 = 62, /27 = 30, /28 = 14, /29 = 6, /30 = 2. Subnetting questions are about speed as much as knowledge."
  ],
  "terms": [
   [
    "RFC 1918",
    "The standard defining private IPv4 ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing: self-assigned 169.254.0.0/16 addresses used when DHCP is unavailable."
   ],
   [
    "CIDR",
    "Classless Inter-Domain Routing: notation and routing that use any prefix length instead of fixed classes."
   ],
   [
    "VLSM",
    "Variable-length subnet masking: using different subnet mask lengths within one address space to fit each subnet's size."
   ]
  ],
  "example": "A user reports no network access. `ipconfig` shows 169.254.33.7 with mask 255.255.0.0. That APIPA address tells you the PC never got a DHCP lease, so you check the DHCP server, the relay and the switch port VLAN instead of DNS or the browser.",
  "tip": "Usable hosts = 2^h - 2. Watch for 172.32.x.x: it is public, because the private block stops at 172.31.255.255. A 169.254 address means DHCP failure.",
  "check": [
   [
    "How many usable host addresses does a /27 provide?",
    "30 (32 addresses minus network and broadcast)."
   ],
   [
    "What is the network and broadcast address for 172.16.5.77/28?",
    "Block size 16, so the network is 172.16.5.64 and the broadcast is 172.16.5.79."
   ],
   [
    "Is 172.20.1.1 public or private?",
    "Private, because it falls within 172.16.0.0/12."
   ]
  ]
 },
 {
  "t": "Evolving use cases: SDN and SD-WAN, VxLAN, zero trust, SASE/SSE, infrastructure as code",
  "body": [
   "Networks are moving from box-by-box manual configuration toward centrally defined, software-driven and identity-aware designs. The Network+ objectives group several of these ideas together. You do not need vendor detail, but you must understand what each concept does and why it exists.",
   "Software-defined networking (SDN) separates the control plane, which decides where traffic should go, from the data plane, which actually forwards it. A central controller holds the network-wide view and programs the forwarding devices. SDN is usually described in planes: the application layer (business applications that express intent), the control layer (the controller), and the infrastructure or data layer (switches and routers). Applications talk to the controller through northbound APIs, and the controller talks to devices through southbound APIs. A management plane handles monitoring and configuration of the devices themselves. The benefit is consistency and automation: one policy change is pushed everywhere.",
   "SD-WAN (software-defined wide area network) applies the same idea to branch connectivity. Instead of relying on one expensive private circuit, a branch can use several transports, such as broadband internet, LTE/5G and MPLS, and the SD-WAN controller steers each application over the best path based on measured latency, loss and jitter. It is application aware, supports zero-touch provisioning of new branch devices, and often sends cloud traffic straight to the internet instead of backhauling it through headquarters.",
   "VXLAN (Virtual Extensible LAN) solves data centre scale problems. Traditional VLAN IDs are 12 bits, allowing about 4,094 usable VLANs. VXLAN uses a 24-bit VXLAN network identifier (VNI), allowing around 16 million segments. It encapsulates Layer 2 Ethernet frames inside UDP packets so they can cross a routed Layer 3 network, letting a virtual machine keep its Layer 2 segment even when it moves to another rack. This is called a Layer 2 overlay on a Layer 3 underlay; the devices that encapsulate and decapsulate are VTEPs (VXLAN tunnel endpoints). Data Center Interconnect (DCI) uses such overlays between sites.",
   "Zero trust drops the idea that anything inside the network perimeter is trusted. Every request is authenticated, authorized and continuously evaluated using identity, device health and context, with least privilege access. It relies on policy-based authentication and authorization and on microsegmentation. SASE (secure access service edge) combines SD-WAN networking with cloud-delivered security. SSE (security service edge) is the security part alone: secure web gateway, cloud access security broker (CASB), zero trust network access (ZTNA) and firewall as a service, delivered from the cloud close to users wherever they are.",
   "Infrastructure as code (IaC) means defining network and cloud infrastructure in text files, such as templates or playbooks, that tools apply automatically. Because the files live in version control, changes are reviewed, repeatable and can be rolled back. IaC fights configuration drift, where devices slowly diverge from their intended settings, and supports automation with playbooks, templates and reusable tasks. It also enables consistent dynamic inventories and the use of source control branches for testing changes before merging them."
  ],
  "terms": [
   [
    "Control plane",
    "The part of a network device or system that decides how traffic should be forwarded, such as routing protocols."
   ],
   [
    "VXLAN",
    "An overlay protocol that encapsulates Layer 2 frames in UDP over a Layer 3 network, using a 24-bit segment ID."
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
  "example": "A company with 40 branches replaces MPLS-only links with SD-WAN over broadband and LTE. Video calls automatically use the path with the lowest jitter, and when a broadband link degrades, traffic shifts to LTE. New branches come online by plugging in a device that downloads its configuration from the controller.",
  "tip": "SDN separates control plane from data plane. VXLAN = Layer 2 over Layer 3 with a 24-bit ID for millions of segments. SSE is the security portion of SASE, without the SD-WAN networking.",
  "check": [
   [
    "What problem does VXLAN solve compared with VLANs?",
    "It scales to about 16 million segments with a 24-bit ID and extends Layer 2 segments across a routed Layer 3 network."
   ],
   [
    "In SDN, which plane forwards the actual traffic?",
    "The data plane (infrastructure layer)."
   ],
   [
    "What is the core principle of zero trust?",
    "Never trust by network location; verify every request explicitly based on identity and context, with least privilege."
   ]
  ]
 },
 {
  "t": "IPv6: address types, dual stack, tunneling, NAT64",
  "body": [
   "IPv6 was created mainly because IPv4's roughly 4.3 billion addresses ran out. An IPv6 address is 128 bits, written as eight groups of four hexadecimal digits separated by colons, such as 2001:0db8:0000:0000:0000:ff00:0042:8329. Two rules shorten it: drop leading zeros in each group, and replace one run of all-zero groups with a double colon, which may be used only once. That address becomes 2001:db8::ff00:42:8329. Subnets are almost always /64, with the first 64 bits for the network prefix and the last 64 bits for the interface ID.",
   "Address types matter on the exam. Global unicast addresses (GUA) are public and routable, currently allocated from 2000::/3, so they start with 2 or 3. Unique local addresses (ULA), fc00::/7 (in practice fd00::/8), are like RFC 1918 private space. Link-local addresses, fe80::/10, are automatically configured on every IPv6 interface and are valid only on the local link; routers use them as next hops and neighbours use them to talk before other addresses exist. The loopback is ::1, and :: means unspecified. Multicast addresses start with ff00::/8; for example, ff02::1 reaches all nodes on the link and ff02::2 all routers. Anycast addresses look like unicast but are assigned to several devices. There is no broadcast in IPv6.",
   "IPv6 hosts can configure themselves. Neighbor Discovery Protocol (NDP), carried in ICMPv6, replaces ARP: hosts send neighbor solicitations to find MAC addresses and router solicitations to find routers, and routers reply with router advertisements carrying the network prefix. With SLAAC (stateless address autoconfiguration), the host combines that prefix with an interface ID it generates, either from its MAC address using the EUI-64 method or, more commonly now, randomly for privacy. DHCPv6 can also be used, statefully to assign addresses or statelessly for options such as DNS servers.",
   "Because the internet will run both versions for a long time, you need transition methods. Dual stack means a device runs IPv4 and IPv6 at the same time with addresses of both types; it is the preferred approach and simply uses whichever protocol the destination supports. Tunneling carries IPv6 packets inside IPv4 across networks that do not yet support IPv6. Examples include manually configured 6in4 tunnels, 6to4, and Teredo, which tunnels through NAT using UDP; the automatic methods are largely deprecated today but may still appear on the exam.",
   "NAT64 lets IPv6-only clients reach IPv4-only servers. A NAT64 gateway translates between the protocols, and DNS64 helps by synthesising AAAA (IPv6) records for names that only have A (IPv4) records, pointing them at an address inside a special prefix that the gateway translates. This is common on IPv6-only mobile networks.",
   "In the lab, run `ipconfig` or `ip -6 addr` and you will see at least an fe80:: link-local address on each interface, even if nobody configured IPv6."
  ],
  "terms": [
   [
    "Link-local address",
    "An automatically configured fe80::/10 IPv6 address valid only on the local network segment."
   ],
   [
    "SLAAC",
    "Stateless address autoconfiguration: hosts build their own IPv6 address from a router-advertised prefix."
   ],
   [
    "Dual stack",
    "Running IPv4 and IPv6 simultaneously on the same devices and network."
   ],
   [
    "NAT64",
    "A translation mechanism that lets IPv6-only hosts communicate with IPv4-only hosts, usually paired with DNS64."
   ],
   [
    "NDP",
    "Neighbor Discovery Protocol: ICMPv6-based protocol that replaces ARP and provides router discovery in IPv6."
   ]
  ],
  "example": "A mobile carrier runs an IPv6-only network. When a phone looks up a site that only has an IPv4 address, DNS64 returns a synthesized IPv6 address, and the carrier's NAT64 gateway translates the traffic to IPv4 so the user never notices.",
  "tip": "fe80 = link-local, fc00/fd00 = unique local (private), 2000::/3 = global unicast, ff = multicast, ::1 = loopback. The double colon can appear only once in an address. IPv6 has no broadcast.",
  "check": [
   [
    "Shorten 2001:0db8:0000:0000:0000:0000:0000:0001.",
    "2001:db8::1"
   ],
   [
    "What IPv6 address type begins with fe80?",
    "Link-local, valid only on the local link."
   ],
   [
    "Which IPv6 transition method runs both protocols side by side?",
    "Dual stack."
   ]
  ]
 },
 {
  "t": "Static vs dynamic routing; OSPF, EIGRP and BGP; route selection (longest prefix, administrative distance, metrics)",
  "body": [
   "A router forwards each packet by looking up the destination address in its routing table. Routes get into the table in three ways: directly connected networks (from the router's own interfaces), static routes an administrator types in, and dynamic routes learned from routing protocols. A default route, 0.0.0.0/0 in IPv4 or ::/0 in IPv6, matches anything not otherwise known and is often called the gateway of last resort.",
   "Static routing is simple, predictable and uses no bandwidth or CPU for protocol traffic, which makes it ideal for small networks, stub sites with one exit and default routes to an ISP. Its weakness is that it does not adapt: if a link fails, the static route stays until someone changes it, and in large networks maintaining static routes is error-prone. A floating static route is a backup static route given a worse administrative distance so it is used only when the primary route disappears. Dynamic routing protocols exchange routes automatically and reconverge after failures, at the cost of some complexity and overhead.",
   "Interior gateway protocols (IGPs) route inside one organization's network, called an autonomous system. OSPF (Open Shortest Path First) is an open-standard link-state protocol: every router learns the full topology map, runs the shortest path first algorithm and chooses paths by cost, which is based on interface bandwidth. It organizes networks into areas, with area 0 as the backbone, and converges quickly. EIGRP (Enhanced Interior Gateway Routing Protocol) is a Cisco-developed advanced distance-vector (sometimes called hybrid) protocol that uses a composite metric, by default based on bandwidth and delay, and converges quickly thanks to precomputed backup routes. Older RIP uses hop count, with a maximum of 15 hops.",
   "BGP (Border Gateway Protocol) is the exterior gateway protocol that routes between autonomous systems and holds the internet together. Each organization or ISP has an autonomous system number (ASN). BGP is a path-vector protocol: it selects routes using attributes such as the AS path and policies, not raw link speed. External BGP (eBGP) runs between different ASes; internal BGP (iBGP) runs within one. Organizations use BGP when they connect to more than one ISP.",
   "When a router has several routes to a destination, it chooses in a fixed order. First, longest prefix match: the most specific route wins. A packet to 10.1.1.5 matches 10.0.0.0/8, 10.1.0.0/16 and 10.1.1.0/24, and the /24 is used. Second, if identical prefixes come from different sources, the lowest administrative distance (AD), a trustworthiness rating, wins. Typical Cisco defaults are connected 0, static 1, eBGP 20, internal EIGRP 90, OSPF 110, RIP 120 and iBGP 200. Third, within one protocol, the lowest metric wins, such as OSPF cost or RIP hop count. If metrics tie, many routers load-balance across equal-cost paths.",
   "On a router, `show ip route` displays the table with codes such as C for connected, S for static and O for OSPF, and each entry shows the AD and metric in brackets, for example [110/20]."
  ],
  "terms": [
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
   ]
  ],
  "example": "A router has an OSPF route to 172.16.0.0/16 and a static route to 172.16.8.0/24. A packet to 172.16.8.9 follows the static /24 because of longest prefix match, while a packet to 172.16.9.9 follows the OSPF /16. If the router also had an EIGRP route to 172.16.0.0/16, it would prefer EIGRP (AD 90) over OSPF (AD 110).",
  "tip": "Order of selection: longest prefix first, then administrative distance, then metric. Do not compare metrics across different protocols. BGP is the only exterior gateway protocol you need to know.",
  "check": [
   [
    "Which is preferred: a static route (AD 1) to 10.0.0.0/8 or an OSPF route (AD 110) to 10.5.0.0/16, for a packet to 10.5.1.1?",
    "The OSPF /16 route, because longest prefix match is evaluated before administrative distance."
   ],
   [
    "What metric does OSPF use?",
    "Cost, derived from interface bandwidth."
   ],
   [
    "Which routing protocol connects autonomous systems on the internet?",
    "BGP (Border Gateway Protocol)."
   ]
  ]
 },
 {
  "t": "NAT and PAT, first hop redundancy (FHRP/VRRP/HSRP), subinterfaces",
  "body": [
   "Network address translation (NAT) rewrites IP addresses as packets pass through a router or firewall. Its main job is letting hosts with private RFC 1918 addresses reach the internet using public addresses, which conserves scarce IPv4 space and hides internal addressing. The router keeps a translation table so return traffic is mapped back to the right inside host.",
   "There are several forms. Static NAT maps one private address to one public address permanently, which is used when an internal server must be reachable from outside. Dynamic NAT maps private addresses to public addresses taken from a pool on a first-come basis; when the pool is empty, new hosts cannot connect. Port address translation (PAT), also called NAT overload, maps many private addresses to a single public address by also translating the source port, so each inside connection gets a unique public address and port pair. PAT is what every home router and most corporate edges do. Port forwarding is a static rule that sends inbound traffic for a particular public port to an inside host, for example public TCP 443 to an internal web server.",
   "NAT terms you may see in router output: inside local is the private address of the inside host, inside global is the public address it is translated to, and outside global is the real address of the internet host. NAT breaks true end-to-end addressing, which complicates some protocols like IPsec (hence NAT traversal) and SIP, and it is not a security control by itself, although it does block unsolicited inbound connections as a side effect.",
   "Every host has one default gateway. If that router fails, hosts lose access beyond their subnet even when a second router exists. A first hop redundancy protocol (FHRP) solves this by letting two or more routers share a virtual IP address and virtual MAC address. Hosts use the virtual IP as their gateway; one router is active and answers for it, and if it fails, a standby router takes over the virtual address within seconds, without any host reconfiguration. HSRP (Hot Standby Router Protocol) is Cisco proprietary with active and standby roles. VRRP (Virtual Router Redundancy Protocol) is the open standard, with master and backup roles. Both use a configurable priority to choose the active router, and preemption lets a higher-priority router take the role back when it recovers. GLBP is another Cisco option that also load-balances.",
   "A subinterface is a logical interface created on one physical interface, such as `GigabitEthernet0/0.10`. The classic use is router on a stick: a single router port connects to a switch trunk, and each subinterface is tagged with a VLAN ID using 802.1Q encapsulation and given an IP address to act as that VLAN's gateway. The router then routes between VLANs over one cable. It is cheap and simple, though the single link can become a bottleneck, which is why larger networks use Layer 3 switches with SVIs instead.",
   "When troubleshooting, `show ip nat translations` reveals current mappings, and a PAT failure often shows as some users working and others timing out when port or pool resources run out."
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
  "example": "An office has two routers configured with VRRP sharing virtual gateway 192.168.1.1. All PCs use that address. When the master router loses power, the backup takes over the virtual IP within seconds and users keep browsing, while PAT on the routers continues translating everyone's traffic to the office's single public address.",
  "tip": "PAT = many-to-one using ports. Static NAT = one-to-one, used for servers reachable from outside. HSRP is Cisco-only; VRRP is the open standard. Router on a stick uses subinterfaces with 802.1Q tags.",
  "check": [
   [
    "Which type of NAT lets a whole office share one public IP address?",
    "PAT (NAT overload), which distinguishes connections by source port."
   ],
   [
    "What do hosts configure as their default gateway when an FHRP is in use?",
    "The shared virtual IP address, not either router's physical address."
   ],
   [
    "Why would you create subinterfaces on a router port?",
    "To route between multiple VLANs over one trunk link, with each subinterface tagged for one VLAN (router on a stick)."
   ]
  ]
 },
 {
  "t": "VLANs, VLAN database, SVIs, 802.1Q trunking, native and voice VLANs",
  "body": [
   "A virtual LAN (VLAN) divides one physical switch, or a group of switches, into separate logical Layer 2 networks. Each VLAN is its own broadcast domain and normally its own IP subnet. VLANs let you group users by function rather than location, contain broadcast traffic, and separate traffic for security, for example keeping guest, staff, voice and management traffic apart. Devices in different VLANs cannot talk to each other without a router or Layer 3 switch.",
   "Each VLAN has a numeric ID. VLAN 1 is the default VLAN on most switches; all ports start there, which is why hardening guides recommend moving user ports and management off VLAN 1. On Cisco-style switches, VLANs are stored in the VLAN database (a file called vlan.dat on many models), separate from the running configuration. You create a VLAN with commands such as `vlan 20` and `name SALES`, and `show vlan brief` lists VLANs and the access ports in each. Normal-range VLAN IDs are 1 to 1005, and extended-range IDs go up to 4094.",
   "A switch port is usually either an access port or a trunk port. An access port belongs to one VLAN and carries untagged frames; end devices such as PCs and printers connect to access ports. A trunk port carries traffic for many VLANs between switches, or between a switch and a router, hypervisor or access point. To keep traffic separate on a trunk, each frame is tagged using IEEE 802.1Q, which inserts a 4-byte tag containing the 12-bit VLAN ID (and a 3-bit priority value used for QoS) into the Ethernet header. The receiving switch reads the tag, removes it and delivers the frame into the right VLAN. You can restrict which VLANs a trunk carries with an allowed VLAN list.",
   "The native VLAN is the one VLAN whose frames cross an 802.1Q trunk untagged. By default it is VLAN 1. Both ends of a trunk must agree on the native VLAN; a mismatch causes traffic to leak between VLANs and generates warnings. Because untagged traffic can be abused in VLAN hopping attacks, best practice is to set the native VLAN to an unused VLAN, and even to tag it.",
   "A voice VLAN lets one access port carry two kinds of traffic: an IP phone's tagged voice traffic in the voice VLAN and the untagged data from a PC plugged into the phone's built-in switch port in the data VLAN. The switch tells the phone which VLAN to use, often via CDP or LLDP-MED. Separating voice this way makes QoS easier and protects call quality.",
   "To route between VLANs, a multilayer switch uses a switched virtual interface (SVI): a virtual Layer 3 interface for a VLAN, such as `interface vlan 20` with an IP address, which becomes the default gateway for hosts in VLAN 20. SVIs route at hardware speed inside the switch and are the modern alternative to router on a stick. An SVI is also often used simply to give a Layer 2 switch a management IP address."
  ],
  "terms": [
   [
    "VLAN",
    "A logical Layer 2 network and broadcast domain created on switches, independent of physical location."
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
    "SVI",
    "Switched virtual interface: a virtual Layer 3 interface for a VLAN on a switch, used for inter-VLAN routing or management."
   ]
  ],
  "example": "An office uses VLAN 10 for staff, VLAN 20 for voice and VLAN 99 for guests. Desk ports are access ports in VLAN 10 with voice VLAN 20 for the phones. The uplink to the core is an 802.1Q trunk allowing all three, and the core switch has SVIs for VLANs 10, 20 and 99 that act as gateways and apply ACLs so guests cannot reach staff.",
  "tip": "Access port = one untagged VLAN; trunk = many VLANs with 802.1Q tags. The native VLAN is the untagged one on a trunk and must match on both ends. Hosts in different VLANs need a Layer 3 device to talk.",
  "check": [
   [
    "What happens to frames in the native VLAN on an 802.1Q trunk?",
    "They are sent without a VLAN tag."
   ],
   [
    "What provides inter-VLAN routing inside a multilayer switch?",
    "Switched virtual interfaces (SVIs), one per VLAN, acting as each VLAN's gateway."
   ],
   [
    "How many bits does the 802.1Q VLAN ID use?",
    "12 bits, allowing IDs up to 4094 usable."
   ]
  ]
 },
 {
  "t": "Interface settings: speed, duplex, MTU and jumbo frames, link aggregation",
  "body": [
   "Every switch, router and host network interface has settings that must agree with the device at the other end of the cable. When they do not, the link may come up but perform badly, which makes these problems hard to spot. Network+ tests the main settings: speed, duplex, MTU and link aggregation.",
   "Speed is the data rate, such as 100 Mbps, 1 Gbps or 10 Gbps. Duplex describes direction. Half duplex means a device can send or receive but not both at once, as on old hubs, which is why collisions and CSMA/CD existed. Full duplex means sending and receiving simultaneously, which every modern switch port supports, and collisions cannot happen. By default, ports autonegotiate both values with their neighbour. If one side is hard-coded, for example to 100 Mbps full duplex, and the other is left on auto, the auto side can detect the speed but not the duplex, so it falls back to half duplex. The result is a duplex mismatch: the link works but is slow, and the half-duplex side logs collisions, especially late collisions, while the full-duplex side logs CRC errors and runts. Best practice is to leave both sides on auto or hard-code both identically.",
   "The maximum transmission unit (MTU) is the largest payload a frame can carry. Standard Ethernet MTU is 1500 bytes. Jumbo frames raise it, commonly to about 9000 bytes, so large transfers need fewer frames and less CPU; they are typical on storage networks such as iSCSI and in data centres. Every device along the path must support the larger MTU, or frames will be dropped or packets fragmented. MTU problems also appear with tunnels: VPN and GRE headers add overhead, so a 1500-byte packet may not fit, causing symptoms like web pages that partially load. Path MTU discovery uses ICMP messages to find the smallest MTU on a path, which is one reason to not block all ICMP. You can test with `ping` using the don't fragment flag and a large size.",
   "Link aggregation bundles several physical links into one logical link for more bandwidth and redundancy. The IEEE standard is 802.3ad (now maintained as 802.1AX), and its negotiation protocol is LACP (Link Aggregation Control Protocol); Cisco calls the bundle an EtherChannel and has an older proprietary protocol, PAgP. Four 1 Gbps links aggregated give up to 4 Gbps of total capacity, and if one link fails the others carry on. Note that a single flow is usually hashed onto one member link, so one file transfer typically will not exceed a single link's speed. Member ports must match in speed, duplex and VLAN settings. Spanning tree treats the bundle as one link, so none of the members are blocked.",
   "In a lab, `show interfaces` on a switch shows the negotiated speed, duplex and MTU and the error counters, and on Linux `ethtool eth0` or `ip link` shows similar details."
  ],
  "terms": [
   [
    "Full duplex",
    "A mode in which a link can transmit and receive at the same time without collisions."
   ],
   [
    "Duplex mismatch",
    "A misconfiguration where one side of a link runs full duplex and the other half duplex, causing errors and poor performance."
   ],
   [
    "Jumbo frame",
    "An Ethernet frame with an MTU larger than 1500 bytes, commonly around 9000 bytes."
   ],
   [
    "LACP",
    "Link Aggregation Control Protocol: the IEEE protocol that negotiates bundling multiple links into one logical link."
   ]
  ],
  "example": "A server's file copies crawl even though the link shows 1 Gbps. The switch port counters show late collisions, and the server NIC is hard-coded to full duplex while the switch port is set to auto and fell back to half duplex. Setting both sides to auto fixes it immediately.",
  "tip": "Late collisions on one side plus CRC errors on the other point to a duplex mismatch. Jumbo frames must be supported end to end. LACP is the open standard for link aggregation.",
  "check": [
   [
    "What is the standard Ethernet MTU?",
    "1500 bytes."
   ],
   [
    "Why might one large file transfer not use all four links of an aggregated bundle?",
    "Traffic is distributed by hashing flows, so a single flow usually uses one member link."
   ],
   [
    "What happens if one side is hard-set to full duplex and the other uses autonegotiation?",
    "The auto side typically falls back to half duplex, causing a duplex mismatch with collisions and errors."
   ]
  ]
 },
 {
  "t": "Spanning Tree Protocol and loop prevention",
  "body": [
   "Redundant links between switches are good for availability but dangerous at Layer 2. Ethernet frames have no TTL, so a broadcast sent around a loop of switches circulates forever, multiplying at every switch. Within seconds a broadcast storm consumes all bandwidth and CPU, MAC address tables flap as the same address appears on different ports, and the network grinds to a halt. Spanning Tree Protocol (STP), IEEE 802.1D, prevents this by logically blocking redundant paths while keeping them available as backups.",
   "STP builds a loop-free tree. Switches exchange bridge protocol data units (BPDUs) and first elect a root bridge: the switch with the lowest bridge ID wins. The bridge ID is a priority value (default 32768) plus the switch's MAC address, so if priorities are equal the lowest MAC wins, which is often the oldest switch. That is why you should set the priority on your chosen core switch deliberately rather than let chance decide. Next, every other switch picks one root port: its port with the lowest path cost to the root, where faster links have lower cost. Then each network segment picks one designated port, the port that forwards toward that segment with the best path to the root. All remaining ports go into the blocking state.",
   "In classic STP, ports move through states: blocking (receiving BPDUs only), listening, learning (building the MAC table) and forwarding, and a disabled state for shut-down ports. Moving from blocking to forwarding takes roughly 30 to 50 seconds with default timers, which was painfully slow. Rapid Spanning Tree Protocol (RSTP, 802.1w) cuts convergence to a second or two, and it simplifies states to discarding, learning and forwarding, with port roles including root, designated, alternate (a backup path to the root) and backup. Per-VLAN variants run a separate tree per VLAN, and MSTP (802.1s) maps groups of VLANs to a smaller number of instances.",
   "Several features protect the tree. PortFast (an edge port) lets ports connected to end devices go straight to forwarding, so PCs do not wait for DHCP to time out; it must never be used on ports to other switches. BPDU guard shuts down (err-disables) a PortFast port if a BPDU arrives, stopping someone from plugging in an unauthorized switch. Root guard prevents a port from accepting a superior BPDU that would make a downstream switch the root. Link aggregation helps too, because STP sees an EtherChannel as one link and leaves all its members forwarding.",
   "Signs of a switching loop include a sudden network-wide slowdown, switch CPUs at maximum, link lights blinking furiously on many ports and log messages about MAC addresses flapping between ports. The fix is to break the loop, often by unplugging the offending cable, then find why STP failed, such as a disabled STP, a misconfigured PortFast, or a small unmanaged switch that dropped BPDUs. `show spanning-tree` displays the root bridge, port roles and states."
  ],
  "terms": [
   [
    "Root bridge",
    "The switch with the lowest bridge ID, which serves as the reference point for the spanning tree."
   ],
   [
    "BPDU",
    "Bridge protocol data unit: the frames switches exchange to run STP."
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
  "example": "A user plugs both ends of a spare patch cable into two wall jacks in a meeting room to 'tidy up'. Without STP, a broadcast storm would take down the floor. Because the access ports use PortFast with BPDU guard, the switch detects BPDUs arriving on an edge port and err-disables it, containing the problem to one port.",
  "tip": "Lowest bridge ID (priority, then MAC) becomes root. Loops cause broadcast storms and MAC flapping. PortFast is for end-device ports only, paired with BPDU guard.",
  "check": [
   [
    "How is the STP root bridge elected?",
    "The switch with the lowest bridge ID wins; bridge ID is priority plus MAC address, so lowest MAC breaks a priority tie."
   ],
   [
    "What does BPDU guard do?",
    "It err-disables a port that receives a BPDU, preventing unauthorized switches from joining through edge ports."
   ],
   [
    "Name two symptoms of a Layer 2 switching loop.",
    "Broadcast storms that saturate links and switch CPUs, and MAC address table flapping between ports."
   ]
  ]
 },
 {
  "t": "Wireless channels and bands: 2.4, 5 and 6 GHz, channel width, non-overlapping channels, regulatory impacts",
  "body": [
   "Wi-Fi uses unlicensed radio spectrum in three main bands: 2.4 GHz, 5 GHz and, with Wi-Fi 6E and Wi-Fi 7, 6 GHz. Each band is divided into channels, and choosing bands, channels and channel widths well is the biggest single factor in wireless performance.",
   "The 2.4 GHz band has the longest range and best penetration through walls, but it is narrow and crowded. It is shared with Bluetooth, microwave ovens, cordless devices and neighbours' networks. Channels are spaced 5 MHz apart but each is about 20 to 22 MHz wide, so adjacent channels overlap. In North America channels 1 to 11 are available, and the only three non-overlapping 20 MHz channels are 1, 6 and 11. Access points near each other should use different channels from that set. Using 40 MHz channels in 2.4 GHz is generally a bad idea because there is room for only one non-overlapping 40 MHz channel.",
   "The 5 GHz band offers many more non-overlapping 20 MHz channels, higher throughput and less interference, at the cost of shorter range and weaker wall penetration. Some 5 GHz channels are DFS (dynamic frequency selection) channels, shared with radar systems such as weather radar. An access point using a DFS channel must listen for radar and move off the channel if it detects it, which can cause brief disconnections; transmit power control (TPC) is another regulatory feature that limits power. The 6 GHz band, used by Wi-Fi 6E and Wi-Fi 7, adds a large block of clean spectrum with many wide channels and no legacy devices, but has the shortest range of the three and requires newer clients. WPA3 is mandatory on 6 GHz.",
   "Channel width is how much spectrum one channel uses: 20, 40, 80 or 160 MHz (and 320 MHz in Wi-Fi 7 on 6 GHz). Channel bonding combines adjacent channels into a wider one, roughly doubling throughput each time, but it also halves the number of channels available for neighbouring access points. In dense deployments such as offices, stadiums or schools, narrower channels (20 or 40 MHz) usually give better overall performance because they reduce co-channel interference. In a home or a lightly used area, wider channels can make sense.",
   "Regulatory impacts are the rules set by each country's regulator, such as the FCC in the United States, that define which channels you may use and at what maximum transmit power. For example, channels 12 and 13 in 2.4 GHz are allowed in many countries but not in North America, and channel 14 is effectively limited to Japan. Access points are configured with a country code so they follow local rules; setting the wrong one can break the law and confuse clients. Rules for 6 GHz in particular vary by country.",
   "In practice, run a Wi-Fi analyzer app, look at which channels nearby networks use and how strong they are, then pick the clearest channels and suitable widths, or let a wireless controller do this automatically."
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
    "Channel bonding",
    "Combining adjacent channels into a wider channel to increase throughput."
   ],
   [
    "Co-channel interference",
    "Performance loss when nearby access points share the same channel and must take turns transmitting."
   ]
  ],
  "example": "A clinic's Wi-Fi is slow. A Wi-Fi analyzer shows three access points on 2.4 GHz channels 3, 6 and 9, all overlapping, and 5 GHz radios set to 80 MHz. Moving 2.4 GHz to channels 1, 6 and 11 and narrowing 5 GHz to 40 MHz gives each access point clean spectrum and speeds improve.",
  "tip": "Remember 1, 6 and 11 for 2.4 GHz. 2.4 GHz = range and penetration; 5 and 6 GHz = speed and capacity with shorter range. Wider channels mean more speed per AP but fewer channels to reuse.",
  "check": [
   [
    "Which three 2.4 GHz channels do not overlap in North America?",
    "Channels 1, 6 and 11."
   ],
   [
    "Why might an access point on a 5 GHz channel suddenly change channels?",
    "It is on a DFS channel and detected radar, so regulations require it to move."
   ],
   [
    "What is the trade-off of using 80 or 160 MHz channels?",
    "Higher throughput per access point, but fewer non-overlapping channels and more chance of interference in dense deployments."
   ]
  ]
 },
 {
  "t": "802.11 standards, SSID/BSSID/ESSID, autonomous vs controller-based APs, mesh networks",
  "body": [
   "IEEE 802.11 is the family of wireless LAN standards, marketed by the Wi-Fi Alliance under generation names. Knowing the band and approximate theoretical maximum speed of each helps you pick equipment and understand compatibility. Real-world throughput is always well below these theoretical figures.",
   "The main standards: 802.11a uses 5 GHz at up to 54 Mbps. 802.11b uses 2.4 GHz at up to 11 Mbps. 802.11g uses 2.4 GHz at up to 54 Mbps and is backward compatible with b. 802.11n (Wi-Fi 4) uses 2.4 and 5 GHz, introduced MIMO (multiple-input multiple-output, using several antennas and spatial streams) and 40 MHz channels, and reaches up to 600 Mbps. 802.11ac (Wi-Fi 5) uses 5 GHz only, adds wider channels and downlink MU-MIMO (multi-user MIMO), and reaches several gigabits per second in theory. 802.11ax (Wi-Fi 6) uses 2.4 and 5 GHz and adds OFDMA, which splits a channel so many clients can be served at once, making it efficient in crowded spaces; Wi-Fi 6E is 802.11ax extended into 6 GHz. 802.11be (Wi-Fi 7) builds on this with even wider channels and multi-link operation. Mixed networks slow down when older clients are present, so many organizations disable the oldest data rates.",
   "Names matter. The SSID (service set identifier) is the human-readable network name, such as 'CorpWiFi', up to 32 characters. A BSS (basic service set) is one access point and its clients, and the BSSID is the unique identifier of that radio, normally its MAC address. An ESS (extended service set) is several access points advertising the same SSID so clients can roam between them; that shared network name is sometimes called the ESSID. One access point can broadcast several SSIDs, each with its own BSSID, commonly mapped to different VLANs. Hiding the SSID (disabling beacon broadcasts) is not real security, because the name still appears in other management frames. An ad hoc or IBSS network connects clients directly without an access point.",
   "Access points can be deployed in two ways. Autonomous (fat) access points are configured and managed individually, with each one holding its full configuration; this works for a few access points but does not scale. Lightweight (thin) access points are controlled by a wireless LAN controller, on-premises or in the cloud, which pushes configuration, manages channel and power planning, handles authentication and coordinates fast roaming. Lightweight access points tunnel traffic or control messages to the controller, using protocols such as CAPWAP. Controller-based designs are the norm in enterprises.",
   "A wireless mesh network links access points to each other wirelessly, so only some need a wired connection to the network (root or gateway nodes) while others (mesh points) relay traffic over the air. Mesh is useful where running cable is impractical, such as warehouses, outdoor areas, older buildings and homes, but each wireless hop uses airtime, so throughput drops and latency rises with more hops. Placement and backhaul planning are important."
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
    "Wireless LAN controller",
    "A device or cloud service that centrally configures and manages lightweight access points."
   ],
   [
    "OFDMA",
    "Orthogonal frequency-division multiple access: an 802.11ax feature that lets an AP serve multiple clients simultaneously within one channel."
   ]
  ],
  "example": "A university has 400 lightweight access points broadcasting the same SSID, forming one ESS managed by a controller. When a student walks between buildings, the laptop roams from one BSSID to another without reconnecting. Outdoor quad areas are covered by mesh access points that relay traffic wirelessly to a wired root node.",
  "tip": "802.11ac is 5 GHz only; 802.11n and 802.11ax work in both 2.4 and 5 GHz; 6E adds 6 GHz. SSID = name, BSSID = one radio's MAC, ESS = many APs with one SSID.",
  "check": [
   [
    "Which 802.11 standard introduced MIMO and works in both 2.4 and 5 GHz?",
    "802.11n (Wi-Fi 4)."
   ],
   [
    "What identifies a specific access point radio, as opposed to the network name?",
    "The BSSID, usually the radio's MAC address."
   ],
   [
    "Why do enterprises prefer controller-based access points over autonomous ones?",
    "Central configuration, automatic channel and power management, and coordinated roaming scale much better than configuring each AP individually."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2/WPA3 Personal and Enterprise, PSK vs 802.1X, captive portals; antenna types",
  "body": [
   "Radio signals do not stop at the walls, so anyone nearby can capture Wi-Fi traffic. Wireless security therefore rests on two things: authenticating who can join and encrypting what they send. Older WEP and original WPA are broken and must not be used.",
   "WPA2 (Wi-Fi Protected Access 2) uses AES encryption with CCMP and has been the baseline for many years. WPA3 is the current standard. In Personal mode it replaces WPA2's pre-shared key handshake with SAE (Simultaneous Authentication of Equals), which resists offline password-guessing attacks and provides forward secrecy, so capturing traffic today and learning the password later does not let an attacker decrypt it. WPA3 also requires Protected Management Frames, which defends against deauthentication attacks. Many networks run a WPA2/WPA3 transition mode for older clients.",
   "Each version has two modes. Personal mode uses a pre-shared key (PSK): everyone knows the same passphrase. It is simple and right for homes and small offices, but you cannot tell users apart, and when someone leaves you must change the key on every device. The strength of WPA2-Personal depends heavily on passphrase length and randomness, because a captured handshake can be attacked offline. Enterprise mode uses 802.1X with a RADIUS server: each user or device authenticates with its own credentials or certificate through an EAP (Extensible Authentication Protocol) method, such as PEAP (username and password inside a TLS tunnel) or EAP-TLS (certificates on both sides, the strongest option). Enterprise mode gives individual accountability, per-user revocation and per-session keys, and can assign VLANs dynamically. In 802.1X the client is the supplicant, the access point is the authenticator and the RADIUS server is the authentication server.",
   "A captive portal is a web page that intercepts new users on an open or guest network and requires them to accept terms, log in or pay before the firewall grants access. It is common in hotels, airports and cafes. A captive portal alone does not encrypt the wireless traffic, so guests should also be isolated from internal networks, and OWE (Opportunistic Wireless Encryption, part of Enhanced Open) can encrypt open networks.",
   "Antennas shape where signal goes, which affects both coverage and security. Omnidirectional antennas radiate in all horizontal directions, like a doughnut, and are the default for ceiling-mounted access points covering a room. Directional antennas focus energy one way for longer range: a Yagi antenna gives a focused beam for point-to-point links between buildings, a patch or panel antenna covers a sector such as a long hallway or one side of a building, and a parabolic dish gives very long, narrow links. Higher gain, measured in dBi, means a more focused pattern, not more total power. Placing directional antennas to cover the inside of a building, rather than the car park, reduces signal leakage."
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
  "example": "A company uses WPA3-Enterprise with EAP-TLS for staff laptops, so each device authenticates with its own certificate and a lost laptop is revoked individually. Visitors join a separate guest SSID with a captive portal that places them on an internet-only VLAN, and a Yagi antenna links the warehouse across the car park.",
  "tip": "Personal = PSK, Enterprise = 802.1X with RADIUS. WPA3-Personal uses SAE. If a scenario says users must authenticate individually or be revoked individually, choose Enterprise mode.",
  "check": [
   [
    "What replaces the PSK handshake in WPA3-Personal, and why is it stronger?",
    "SAE, which resists offline dictionary attacks and provides forward secrecy."
   ],
   [
    "In 802.1X, what role does the wireless access point play?",
    "The authenticator, relaying EAP messages between the supplicant and the RADIUS authentication server."
   ],
   [
    "Which antenna type would you use to link two buildings 500 m apart?",
    "A directional antenna, such as a Yagi or parabolic dish."
   ]
  ]
 },
 {
  "t": "Physical installation: IDF/MDF, rack sizes, port-side exhaust/intake, cable management, patch panels",
  "body": [
   "A network is only as reliable as its physical installation. Good planning of equipment rooms, racks, airflow and cabling makes a network easier to troubleshoot, expand and keep cool. Network+ expects you to know the vocabulary of structured cabling and to recognise good and bad practices.",
   "Buildings typically have a hierarchy of equipment rooms. The main distribution frame (MDF) is the central point, often near where carrier circuits enter the building (the demarcation point, or demarc, where the provider's responsibility ends and yours begins). The MDF usually holds core switches, routers, firewalls and sometimes servers. Intermediate distribution frames (IDFs) are smaller wiring closets on each floor or in each wing; they hold access switches and connect back to the MDF over backbone (vertical) cabling, usually fibre. Horizontal cabling runs from the IDF to wall jacks in work areas and is normally copper limited to 90 metres of permanent cable, leaving 10 metres for patch cords to reach the 100-metre channel limit.",
   "Equipment mounts in standard 19-inch-wide racks. Height is measured in rack units (U), where 1U is 1.75 inches (44.45 mm); a full-height rack is commonly 42U, and a typical switch is 1U or 2U. Two-post racks are open frames suited to lightweight network gear; four-post racks and enclosed cabinets support deep, heavy servers and can be locked. Wall-mounted racks serve small closets. When planning, allow space for growth, cable managers, patch panels and power distribution units, and put heavy items such as UPS units at the bottom for stability.",
   "Airflow is a common exam topic. Data centres arrange racks in hot aisle / cold aisle layouts: equipment fronts face each other across a cold aisle where chilled air is supplied, and backs face each other across a hot aisle where exhaust is collected. Every device in a rack must breathe the same way. Switches often come with a choice of fans: port-side intake (air enters at the port side) or port-side exhaust (air leaves at the port side). If a top-of-rack switch is mounted with its ports facing the rear to meet server cabling, you must choose the fan direction so it still pulls from the cold aisle and exhausts into the hot aisle. Mixing directions recirculates hot air and causes overheating. Blanking panels in empty rack spaces stop hot air from looping back to the front.",
   "Structured cabling keeps things organized. Horizontal cables terminate on a patch panel in the IDF, punched down on the back (typically with a 110 punch-down tool) and presented as numbered RJ45 ports on the front. Short patch cables then connect patch panel ports to switch ports. This means the permanent cabling is never touched; moves and changes are done by moving a patch cord. Fibre uses fibre distribution panels in the same way. Good cable management uses horizontal and vertical managers, correct-length patch cords, hook-and-loop straps instead of tight zip ties, respect for minimum bend radius, colour coding by function and clear labelling at both ends of every cable. Keep data cables away from power cables and fluorescent lighting to limit interference.",
   "Good physical work pays back during troubleshooting, because a labelled patch panel plus an up-to-date cable map turns 'which port is this?' into a quick look-up."
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
    "Rack unit (U)",
    "The standard unit of vertical rack space, 1.75 inches (44.45 mm)."
   ],
   [
    "Patch panel",
    "A panel where permanent cable runs terminate, providing ports that are connected to equipment with patch cords."
   ],
   [
    "Demarc",
    "The demarcation point where the service provider's network ends and the customer's begins."
   ]
  ],
  "example": "In a new data centre row, a technician mounts top-of-rack switches with ports facing the rear to match server NICs. Because the rear of the rack, and therefore the ports, faces the hot aisle, he orders the switches with port-side exhaust fans. The switch draws cold air from the front and blows hot air out of the port side into the hot aisle, matching the servers.",
  "tip": "Fan direction must match the rack's airflow: if the ports face the hot aisle, choose port-side exhaust; if the ports face the cold aisle, choose port-side intake. 1U = 1.75 inches. MDF is central, IDFs are per floor.",
  "check": [
   [
    "A switch's ports face the cold aisle. Which fan option do you need?",
    "Port-side intake, so it draws cool air in at the ports and exhausts to the hot aisle."
   ],
   [
    "Why terminate horizontal cabling on a patch panel instead of directly on a switch?",
    "It protects the permanent cabling and lets moves and changes be done by swapping short patch cords, with clear labelled ports."
   ],
   [
    "How tall is a 42U rack's usable space in inches?",
    "42 x 1.75 = 73.5 inches."
   ]
  ]
 },
 {
  "t": "Power and environment: UPS, PDU, PoE/PoE+ budgets, temperature, humidity, fire suppression",
  "body": [
   "Network equipment needs clean, continuous power and a controlled environment. Power problems and heat are among the most common causes of outages, and Network+ expects you to plan for both.",
   "An uninterruptible power supply (UPS) provides battery power when mains power fails, long enough to ride through short outages or to shut systems down gracefully or wait for a generator to start. UPS units also condition power, protecting against sags, surges and noise. Standby (offline) UPS units switch to battery when power fails; line-interactive units also regulate voltage; online (double-conversion) units always run equipment from the inverter, giving the cleanest power with no transfer time. UPS capacity is rated in volt-amperes (VA) and watts, and runtime depends on the load, so size a UPS for the actual load plus growth. Generators cover long outages but take time to start, which the UPS bridges. Dual power supplies in devices, fed from separate circuits, remove another single point of failure.",
   "A power distribution unit (PDU) is essentially an industrial power strip for racks. Basic PDUs simply distribute power; metered PDUs display current draw; switched or managed PDUs let you monitor and power-cycle individual outlets remotely, which is handy for rebooting a hung device in a remote site. Keep an eye on total current so you do not overload a circuit, and give each device's two power supplies separate PDUs on separate circuits.",
   "Power over Ethernet (PoE) delivers DC power over the same twisted-pair cable as data, so IP phones, access points and cameras need no local power outlet. The switch is the power sourcing equipment (PSE) and the device is the powered device (PD). Standards: IEEE 802.3af (PoE) supplies up to 15.4 W per port at the switch; 802.3at (PoE+) up to 30 W; 802.3bt (sometimes called PoE++) Type 3 up to 60 W and Type 4 up to 90 W. Some power is lost in the cable, so the device receives slightly less. Every PoE switch also has a total power budget. If a switch has a 370 W budget, it cannot power 24 devices that each draw 25 W (600 W), even though every port supports PoE+. When the budget is exceeded, some ports will not power up or devices reboot. Plan the budget and use `show power inline` to check usage.",
   "Environmental monitoring keeps equipment healthy. Temperature should be kept within the equipment's recommended range, often summarized as roughly the low to mid 20s Celsius for inlet air; heat shortens equipment life and causes shutdowns. Humidity matters in both directions: too high causes condensation and corrosion, too low increases electrostatic discharge risk. Sensors for temperature, humidity and water leaks should send alerts via SNMP or the building management system.",
   "Fire suppression in equipment rooms must put out fires without destroying electronics. Water sprinklers are common by law; a pre-action (dry pipe) system keeps pipes empty until a detector trips, reducing accidental water damage. Clean-agent gaseous systems extinguish fire without water or residue and are preferred for data centres, but they require alarms and procedures so people can evacuate safely before discharge."
  ],
  "terms": [
   [
    "UPS",
    "Uninterruptible power supply: a battery-backed device that keeps equipment running during power loss and conditions power."
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
    "Clean agent",
    "A gaseous fire suppressant that leaves no residue and is safe for electronic equipment."
   ]
  ],
  "example": "A school adds 20 new Wi-Fi 6 access points that each need about 25 W on a 24-port PoE+ switch with a 370 W budget. The first 14 or so power up and the rest stay dark. The team moves half the access points to a second switch, and `show power inline` confirms both switches are now within budget.",
  "tip": "802.3af = 15.4 W, 802.3at (PoE+) = 30 W, 802.3bt = 60 W (Type 3) or 90 W (Type 4). Every port supporting PoE+ does not mean the switch can power them all at full wattage; check the total budget.",
  "check": [
   [
    "What PoE standard supplies up to 30 W per port?",
    "IEEE 802.3at, known as PoE+."
   ],
   [
    "Why is low humidity a concern in a server room?",
    "It increases the risk of electrostatic discharge that can damage components."
   ],
   [
    "What does a managed PDU add over a basic one?",
    "Remote monitoring and the ability to switch individual outlets on and off, such as to power-cycle a device."
   ]
  ]
 },
 {
  "t": "Documentation: physical vs logical diagrams, rack diagrams, cable maps, IPAM, asset inventory, SLAs, wireless surveys",
  "body": [
   "Documentation turns a network from something only one person understands into something a team can operate. Good documentation speeds troubleshooting, supports audits and change planning, and makes onboarding easier. It only helps if it is accurate, so updating documentation should be part of every change.",
   "Network diagrams come in two main forms. A physical diagram shows real devices and how they are cabled: which switch port connects to which router, the cable types, the rooms and racks. It answers 'where is it and how is it plugged in?'. A logical diagram shows how traffic flows: subnets, VLANs, IP addressing, routing domains, VPN tunnels and security zones, regardless of physical placement. It answers 'how does data move and what can talk to what?'. You usually need both. Diagrams are often grouped by OSI layer: a Layer 1 diagram shows cabling, a Layer 2 diagram shows switches, VLANs and trunks, and a Layer 3 diagram shows subnets and routers.",
   "A rack diagram (rack elevation) shows the front and often rear of each rack, with every device drawn at its rack-unit position, plus patch panels, cable managers and PDUs. It helps technicians find equipment and plan space, power and airflow. A cable map or cable schedule records each cable run: its label, both endpoints (for example patch panel A port 12 to wall jack 3-114), type and length. Combined with labelled cables, it saves hours of tracing.",
   "IP address management (IPAM) is the practice and tooling for tracking IP address space: which subnets exist, which addresses are assigned, reserved or free, and which DHCP scopes and DNS records go with them. IPAM prevents duplicate addresses and helps planning, and it is far better than a forgotten spreadsheet. An asset inventory lists hardware and software: make, model, serial number, location, owner, warranty and support dates, firmware and licence details. It supports life-cycle planning, budgeting, security (you cannot protect what you do not know you have) and audits.",
   "Agreements are documentation too. A service-level agreement (SLA) is a contract with a provider, or between IT and the business, that defines measurable service levels such as uptime percentage, response and resolution times and penalties when targets are missed. For example, 99.9 percent uptime allows roughly 8.8 hours of downtime per year. Related documents include memoranda of understanding (MOU), non-disclosure agreements (NDA) and standard operating procedures.",
   "A wireless survey (site survey) measures radio coverage and interference. A predictive survey uses floor plans and software to model coverage before installation; an on-site survey walks the space with an analyzer to measure signal strength, noise and channel use; the result is often shown as a heat map. Surveys are done before deployment to place access points and after changes or complaints to validate coverage."
  ],
  "terms": [
   [
    "Logical diagram",
    "A diagram showing how data flows: subnets, VLANs, addressing and routing, independent of physical layout."
   ],
   [
    "Rack diagram",
    "An elevation drawing showing each device's position in a rack by rack unit."
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
  "example": "A help desk ticket says room 3-114 has no network. The technician checks the cable map, finds the wall jack is patch panel 3A port 14, looks at the rack diagram to find panel 3A in IDF-3, and sees in IPAM that the room belongs to VLAN 30. She finds the patch cord was moved during an earlier change and fixes it in minutes.",
  "tip": "Physical diagram = cables, ports and locations; logical diagram = subnets, VLANs and traffic flow. If a question asks which document shows device positions in a rack, it is a rack diagram. SLAs define measurable uptime and response commitments.",
  "check": [
   [
    "Which diagram would show VLANs and IP subnets?",
    "A logical diagram (a Layer 2 or Layer 3 diagram)."
   ],
   [
    "What tool helps prevent duplicate IP assignments across many subnets?",
    "IPAM (IP address management)."
   ],
   [
    "What is the difference between a predictive and an on-site wireless survey?",
    "A predictive survey models coverage in software from floor plans; an on-site survey physically measures signal and interference in the space."
   ]
  ]
 },
 {
  "t": "Life-cycle management: end of life/support, software and firmware management, decommissioning",
  "body": [
   "Every network device has a life cycle: planning and procurement, deployment, operation and maintenance, and finally retirement. Managing it deliberately keeps the network secure and supported and avoids nasty surprises when an old device fails and no replacement or support is available.",
   "Vendors publish milestones for their products. End of sale (EOS) is when the product can no longer be bought. End of life (EOL) usually marks the start of the phase-out, and end of support (EOS or EOSL) is when the vendor stops providing bug fixes, security patches, technical support and often replacement parts. The exact terms vary by vendor, so read each announcement carefully. Running equipment past end of support is a risk: newly discovered vulnerabilities will never be patched, which is a common audit finding and may break compliance requirements. Track these dates in the asset inventory and budget for replacements well before they arrive.",
   "Software and firmware management keeps devices current. Network operating systems and firmware receive updates that fix bugs, patch security vulnerabilities and add features. A sound process includes: tracking vendor advisories, reading release notes to understand fixes and known issues, choosing a stable recommended release rather than simply the newest, verifying the image's integrity with its published hash, testing in a lab or on a small pilot group, scheduling the upgrade in a maintenance window through change management, backing up the configuration first, and having a rollback plan with the previous image available. Upgrades should also keep devices on consistent versions, because a mix of versions makes troubleshooting harder. Vulnerability scanning and patch reports help find devices that were missed.",
   "Licensing is part of life-cycle management too. Many devices need feature licences or subscriptions for support, security signatures or advanced functions; letting them lapse can silently disable protection.",
   "Decommissioning retires a device safely. Steps include: confirm via documentation that nothing still depends on it, migrate services and update routing, DNS and monitoring, remove it from management systems and the asset inventory, and revoke its certificates and accounts. Crucially, sanitize the device: configuration files can contain password hashes, SNMP community strings, VPN keys and network maps. Wipe configurations and storage according to policy (for example, erase and reset to factory defaults, or physically destroy drives), and keep a record, often a certificate of destruction from a disposal vendor. Finally, dispose of or recycle hardware responsibly in line with environmental rules.",
   "A mature organization reviews the life cycle regularly, so a device approaching end of support becomes a planned project rather than an emergency."
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
    "Sanitization",
    "Securely removing data from a device, by wiping or destruction, so it cannot be recovered."
   ]
  ],
  "example": "An audit flags a pair of firewalls that reached end of support last year and no longer receive security fixes. The team buys replacements, migrates rules during a maintenance window, then factory-resets and securely wipes the old units, removes them from monitoring and the inventory, and files the disposal certificate.",
  "tip": "Past end of support means no more security patches, which is the key risk the exam wants you to identify. Before upgrading firmware, back up the config and have a rollback plan; before disposal, sanitize.",
  "check": [
   [
    "Why is running a switch past its end-of-support date a security risk?",
    "The vendor no longer releases patches, so new vulnerabilities will remain unfixed."
   ],
   [
    "Name three steps to take before a firmware upgrade.",
    "Read the release notes, back up the configuration and verify the image hash; also test it and schedule a maintenance window with a rollback plan."
   ],
   [
    "What sensitive data might a decommissioned router still hold?",
    "Its configuration, including password hashes, SNMP strings, VPN keys and network details."
   ]
  ]
 },
 {
  "t": "Change management and configuration management: baselines, golden configs, backups",
  "body": [
   "Many outages are caused not by hardware failure but by changes: a mistyped command, an untested upgrade, a rule added in a hurry. Change management and configuration management are the processes that keep changes controlled and configurations known and recoverable.",
   "Change management is the formal process for proposing, approving, implementing and reviewing changes. A typical flow: someone submits a change request describing what will change, why, the risk and impact, the implementation steps, a test plan and a rollback (backout) plan. A change advisory board (CAB) or approver reviews it. Approved changes are scheduled in a maintenance window, usually at low-usage times, and affected users are notified. After implementation, the change is verified, documentation is updated and the change is closed. Emergency changes still need approval and documentation, just faster. Standard changes, low-risk and repeatable ones, may be pre-approved. The goal is not bureaucracy but fewer surprises and a record of what changed when something breaks.",
   "Configuration management is about knowing and controlling the configuration of every device. A baseline is a documented, approved reference state. A configuration baseline records how a device should be set up; a performance baseline records normal behaviour, such as typical bandwidth, CPU use and latency, so you can recognise when something is abnormal. A golden configuration (golden config) is a standard, approved template for a device type or role, such as every access switch, including security hardening, logging, NTP, SNMP and AAA settings. New devices are built from it and existing devices are compared against it.",
   "Configuration drift happens when devices gradually diverge from the baseline through one-off fixes and undocumented changes. Configuration monitoring tools regularly pull device configs, compare them with the golden config or previous version and alert on differences, so unauthorized or accidental changes are caught. Infrastructure as code and automation reduce drift by applying the same template everywhere.",
   "Backups make recovery possible. Back up device configurations automatically and regularly, and after every change; store them off the device, ideally in version control so you can see exactly what changed and roll back. On many network devices the running configuration (in RAM) is lost on reboot unless it is saved to the startup configuration (in NVRAM or flash), for example with `copy running-config startup-config`. Forgetting this step is a classic mistake that turns a successful change into an outage after the next power cycle. Also back up firmware images, licences and certificates, and test restores periodically, because an untested backup is only a hope.",
   "Together, these practices mean that when something breaks, you can answer three questions quickly: what changed, what should it look like, and how do I get back to a known good state."
  ],
  "terms": [
   [
    "Change advisory board",
    "A group that reviews, assesses and approves proposed changes."
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
  "example": "An engineer adds a new VLAN to a core switch during an approved maintenance window, verifies connectivity and saves the running config to startup. The nightly config backup captures the change in version control. A week later, monitoring flags that one access switch no longer matches the golden config: someone enabled Telnet. The team reverts it and opens an incident.",
  "tip": "Every change needs an approved request, a maintenance window and a rollback plan. Configuration baseline = how it should be configured; performance baseline = how it normally behaves. Save the running config or lose changes on reboot.",
  "check": [
   [
    "What is the purpose of a rollback plan in a change request?",
    "To restore the previous working state quickly if the change fails."
   ],
   [
    "What is configuration drift and how is it detected?",
    "Gradual divergence from the approved configuration; detected by comparing current configs with a baseline or golden config."
   ],
   [
    "A switch lost a recent VLAN change after a power outage. What was probably missed?",
    "Saving the running configuration to the startup configuration."
   ]
  ]
 },
 {
  "t": "Monitoring: SNMP versions, traps, MIBs, flow data, packet capture, baselines, log aggregation and syslog, API integration",
  "body": [
   "Monitoring tells you how the network is behaving before users call. It combines several data sources, each with different detail: device statistics via SNMP, conversation summaries via flow data, full packets via capture, and events via logs. Knowing which to use for which question is a core Network+ skill.",
   "SNMP (Simple Network Management Protocol) lets a network management station (NMS, the manager) read statistics from agents on devices. The manager polls agents on UDP 161 with get requests, and can change settings with set requests; agents send unsolicited traps (or acknowledged informs) to the manager on UDP 162 when events happen, such as an interface going down. The data an agent exposes is described in a MIB (Management Information Base), a hierarchical database of variables, each identified by an OID (object identifier), such as the counter of bytes received on an interface. Versions matter for security. SNMPv1 and v2c authenticate with a community string sent in clear text (defaults like 'public' and 'private' must be changed); v2c added bulk retrieval and 64-bit counters. SNMPv3 adds real user-based authentication and encryption, with security levels noAuthNoPriv, authNoPriv and authPriv. Use SNMPv3 whenever possible.",
   "Flow data summarizes conversations rather than their contents. NetFlow, IPFIX and sFlow export records containing source and destination addresses and ports, protocol, byte and packet counts and timestamps to a collector. Flow data answers 'who is talking to whom, and how much?', making it ideal for finding top talkers, capacity planning and spotting unusual traffic such as data exfiltration, with far less storage than full captures.",
   "Packet capture records complete packets, including payloads, using tools such as Wireshark or tcpdump. It gives the deepest detail for troubleshooting protocol problems but produces huge volumes of data and may capture sensitive information. To capture traffic that is not destined for your machine on a switched network, use port mirroring (a SPAN port) or a network tap.",
   "A baseline records normal behaviour, such as typical utilisation, error rates, CPU and latency at different times, so alerts can trigger on meaningful deviations and anomalies stand out.",
   "Logs record events. Syslog is the standard way network devices send log messages to a central collector, on UDP 514 by default. Each message has a facility (the source type) and a severity level from 0 to 7: 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug; lower numbers are more severe. Log aggregation gathers logs from many sources into one place, normalizes them and keeps them for searching and retention requirements. A SIEM (security information and event management) system goes further, correlating events across sources and alerting on security incidents. Accurate time from NTP on every device is essential for correlating logs.",
   "Modern monitoring increasingly uses APIs. Devices and controllers expose REST APIs, and streaming telemetry pushes data rather than waiting to be polled. API integration lets monitoring platforms, ticketing systems and automation tools share data, for example automatically opening a ticket when an alert fires."
  ],
  "terms": [
   [
    "MIB",
    "Management Information Base: the structured set of variables an SNMP agent exposes, each identified by an OID."
   ],
   [
    "SNMP trap",
    "An unsolicited message from an SNMP agent to the manager, sent on UDP 162, reporting an event."
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
  "example": "Users say the WAN is slow every afternoon. SNMP graphs show the link at 95 percent utilisation from 2 pm, well above the baseline. NetFlow data shows one host sending large volumes to a cloud storage provider, which turns out to be a misconfigured backup job. No packet capture was needed.",
  "tip": "SNMPv3 is the only version with encryption and user authentication. Polls use UDP 161, traps UDP 162. Flow data answers who talked to whom and how much; packet capture shows the full contents. Syslog severity 0 is the most severe.",
  "check": [
   [
    "Which SNMP version provides authentication and encryption?",
    "SNMPv3."
   ],
   [
    "What is the difference between flow data and a packet capture?",
    "Flow data summarizes conversations (addresses, ports, byte counts); a packet capture records full packet contents."
   ],
   [
    "Which syslog level is more severe, 2 or 6?",
    "Level 2 (Critical); lower numbers are more severe, and 6 is Informational."
   ]
  ]
 },
 {
  "t": "Monitoring solutions: network discovery, traffic analysis, performance and availability monitoring, configuration monitoring",
  "body": [
   "The previous lesson covered monitoring data sources. This one covers what monitoring solutions do with that data. Network+ lists several capabilities you should be able to match to a scenario: discovery, traffic analysis, performance and availability monitoring, and configuration monitoring. Many commercial and open-source platforms combine all of them in one network monitoring system.",
   "Network discovery finds what is on the network. Tools sweep address ranges with ping and port probes, query devices with SNMP, and read neighbour information from LLDP (Link Layer Discovery Protocol) or Cisco's CDP to build an inventory and often an automatic topology map. Discovery can be ad hoc, when you run a scan to answer a question, or scheduled, so new or unknown devices are detected over time. Discovery helps keep the asset inventory accurate and exposes rogue devices, such as an unauthorized access point or a forgotten server. A classic command-line example is running `nmap -sn` against a subnet to list live hosts, but only on networks you are authorized to scan.",
   "Traffic analysis examines what is flowing across the network. Using flow data (NetFlow, IPFIX, sFlow) and, when needed, packet captures, it shows top talkers, top applications, protocols in use and traffic patterns over time. Operations teams use it for capacity planning and to find what is eating bandwidth; security teams use it to spot anomalies, such as a workstation suddenly sending gigabytes to an unknown external address or scanning internal hosts.",
   "Performance monitoring tracks how well the network works. Typical metrics are bandwidth utilisation, throughput, latency, jitter, packet loss, interface errors and discards, and device CPU and memory. Values are compared with baselines and thresholds, and graphs show trends that support capacity planning, such as a WAN link growing toward saturation. Synthetic monitoring actively generates test traffic, for example measuring round-trip time and loss between sites continuously, so you detect degradation even when real users are quiet.",
   "Availability monitoring answers the simplest question: is it up? The system regularly checks devices and services, using ping, SNMP polls, TCP port checks or application-level checks such as loading a web page, and raises an alert when something stops responding. Availability is often reported as a percentage for SLA reporting. Alerts should be tuned to avoid alert fatigue, for instance by requiring several failed checks before paging someone and by suppressing alerts for devices behind a failed upstream link.",
   "Configuration monitoring watches device configurations. It regularly collects configs, stores versions, compares them with the golden configuration or baseline, and alerts on unexpected changes, which catches both mistakes and unauthorized modifications. It also supports compliance reporting, for instance proving that every switch has Telnet disabled and logging enabled. Combined with change management, it tells you exactly what changed and when."
  ],
  "terms": [
   [
    "Network discovery",
    "Automatically finding and cataloguing devices on a network, often producing a topology map."
   ],
   [
    "Top talkers",
    "The hosts or applications generating the most traffic, typically identified through flow analysis."
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
  "example": "A monitoring platform runs nightly discovery and finds a new device with a consumer router's MAC vendor in a conference room. Traffic analysis shows it is bridging guests onto the staff VLAN. At the same time, configuration monitoring alerts that an access switch's config changed outside any approved change window, leading the team to the same room.",
  "tip": "Match the need to the solution: 'what is on my network' is discovery; 'what is using my bandwidth' is traffic analysis; 'is it slow' is performance monitoring; 'is it up' is availability monitoring; 'did someone change it' is configuration monitoring.",
  "check": [
   [
    "Which monitoring capability would reveal an unauthorized device newly connected to the network?",
    "Network discovery, especially scheduled discovery compared against the inventory."
   ],
   [
    "A manager wants to know which applications consume the most WAN bandwidth. What should you use?",
    "Traffic analysis with flow data such as NetFlow or IPFIX."
   ],
   [
    "Why would you require several failed checks before sending an availability alert?",
    "To reduce false alarms and alert fatigue caused by brief, harmless blips."
   ]
  ]
 },
 {
  "t": "Disaster recovery metrics: RPO, RTO, MTTR, MTBF; hot, warm and cold sites; active-active vs active-passive; DR testing",
  "body": [
   "Disaster recovery (DR) is how an organization restores IT services after a major disruption such as a fire, flood, ransomware attack or regional outage. It is part of the wider business continuity plan, which keeps the business itself running. Network+ tests the metrics that set recovery targets, the types of recovery site and redundancy models, and how DR plans are tested.",
   "Two metrics define targets. The recovery point objective (RPO) is the maximum acceptable amount of data loss, measured in time. An RPO of four hours means you must be able to restore data from no more than four hours before the disaster, so backups or replication must run at least that often. The recovery time objective (RTO) is the maximum acceptable time to restore the service after a disruption. An RTO of two hours means the service must be running again within two hours. A simple memory aid: RPO looks backward at data, RTO looks forward at downtime.",
   "Two metrics describe reliability. Mean time between failures (MTBF) is the average operating time between failures of a repairable component; higher is better. Mean time to repair (or recover) (MTTR) is the average time it takes to fix a failure and restore service; lower is better. Together they drive availability: reliable components (high MTBF) and fast repairs (low MTTR), aided by spares on site, good documentation and support contracts, mean more uptime.",
   "Recovery sites trade cost against speed. A hot site is a fully equipped duplicate with current data and running systems, so failover can happen in minutes to hours; it is the most expensive. A warm site has hardware and connectivity in place but needs data restored and systems configured, taking hours to days. A cold site is just space with power and cooling; equipment must be brought in and installed, taking days or weeks, but it is the cheapest. Cloud-based recovery sites are increasingly common, since resources can be started only when needed.",
   "Redundancy models describe how multiple sites or devices share work. In active-active, all sites or devices handle live traffic at the same time, often behind a load balancer or with global DNS load balancing. Failure of one reduces capacity, but service continues immediately, and you get full use of your investment; each side must be sized to carry the load if the other fails. In active-passive, one side handles all traffic while the other waits on standby, taking over only when the active one fails. It is simpler but leaves the standby idle, and failover may take some time. FHRPs and firewall pairs commonly run active-passive.",
   "A plan that has never been tested probably will not work. DR testing ranges from low effort to high: a tabletop exercise walks key staff through a scenario in discussion; a walkthrough reviews the steps; a simulation tests parts of the plan; a parallel test brings recovery systems up alongside production; a full failover test actually switches production to the recovery site. After each test, update the plan with lessons learned."
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
   ]
  ],
  "example": "An online retailer decides it can lose at most 15 minutes of orders (RPO 15 minutes) and be down no longer than one hour (RTO 1 hour). Nightly backups cannot meet the RPO, so it replicates the database continuously to a hot site in another region and runs the web tier active-active across both. A twice-yearly failover test confirms the targets.",
  "tip": "RPO = data loss tolerance (how often to back up); RTO = downtime tolerance (how fast to recover). Hot = fastest and costliest, cold = slowest and cheapest. High MTBF and low MTTR are good.",
  "check": [
   [
    "If backups run every 6 hours, what is the best RPO you can meet?",
    "About 6 hours, because up to 6 hours of data could be lost."
   ],
   [
    "Which recovery site has power and space but no equipment?",
    "A cold site."
   ],
   [
    "What is the key operational difference between active-active and active-passive?",
    "Active-active has all nodes serving traffic at once; active-passive has a standby node that takes over only on failure."
   ]
  ]
 },
 {
  "t": "DHCP: scopes, exclusions, reservations, lease time, options, relay/IP helper; SLAAC for IPv6",
  "body": [
   "Dynamic Host Configuration Protocol (DHCP) automatically gives hosts their IP configuration: an address, subnet mask, default gateway, DNS servers and more. Without it, every device would need manual configuration, which is slow and invites duplicate addresses. DHCP servers listen on UDP 67 and clients use UDP 68.",
   "A client gets an address through the DORA exchange. Discover: the client, which has no address yet, broadcasts looking for a server. Offer: a server replies offering an address. Request: the client broadcasts that it accepts that offer (which also tells other servers their offers were declined). Acknowledge: the server confirms, and the lease begins. If no server answers, a Windows client falls back to an APIPA 169.254.x.x address.",
   "A scope is the range of addresses a server can hand out for one subnet, such as 192.168.10.100 to 192.168.10.200, together with its settings. Exclusions are addresses inside the scope range that the server must never hand out, typically because they are statically assigned to printers, servers or the gateway. Reservations tie a specific address to a specific client, identified by its MAC address, so that device always gets the same IP while still being managed centrally through DHCP; this suits printers and access points. A server can host many scopes, one per subnet or VLAN.",
   "Addresses are leased, not given permanently. The lease time sets how long the client may use the address. At 50 percent of the lease (the T1 timer) the client tries to renew with its server; at 87.5 percent (T2) it tries any server; if the lease expires, it must stop using the address. Short leases suit busy guest networks with many transient devices, so addresses are recycled quickly; long leases suit stable wired offices and reduce DHCP traffic.",
   "DHCP options carry extra configuration. Common ones include option 3 (router, the default gateway), option 6 (DNS servers), option 15 (domain name), option 42 (NTP servers) and option 66 (TFTP server, used by IP phones for booting). Options can be set per scope or server-wide.",
   "Because Discover messages are broadcasts, they do not cross routers. With one central DHCP server serving many VLANs, you configure a DHCP relay agent on each VLAN's router interface or SVI; on Cisco devices this is the `ip helper-address` command. The relay receives the broadcast, forwards it as unicast to the DHCP server and includes the interface's address, which tells the server which scope to use. A missing or wrong helper address is a common reason one VLAN gets APIPA addresses while others work.",
   "IPv6 can use DHCPv6, but it also offers SLAAC (stateless address autoconfiguration). Routers send router advertisements with the network prefix; hosts build their own addresses from that prefix and an interface ID. Flags in the router advertisement tell hosts whether to use SLAAC only, stateless DHCPv6 for extra options such as DNS servers, or stateful DHCPv6 for addresses too. DNS servers can also be delivered in the router advertisement itself (RDNSS)."
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
    "Reservation",
    "A DHCP entry that always assigns a specific IP address to a specific MAC address."
   ],
   [
    "Exclusion",
    "An address or range within a scope that the DHCP server will not assign."
   ],
   [
    "DHCP relay",
    "A router or switch function (IP helper) that forwards DHCP broadcasts to a server on another subnet."
   ]
  ],
  "example": "After a new VLAN 40 is created for a lab, every PC in it gets a 169.254 address, while other VLANs work. The DHCP server has a scope for 10.40.0.0/24, so the technician checks the VLAN 40 SVI and finds no `ip helper-address`. Adding the helper pointing to the DHCP server fixes it.",
  "tip": "Exclusion = never hand out this address; reservation = always give this address to this MAC. If clients on only one remote subnet get APIPA addresses, suspect the relay (IP helper).",
  "check": [
   [
    "What are the four DHCP messages in order?",
    "Discover, Offer, Request, Acknowledge (DORA)."
   ],
   [
    "Why is a DHCP relay needed for a centralized server?",
    "Because DHCP Discover is a broadcast and routers do not forward broadcasts; the relay forwards it as unicast to the server."
   ],
   [
    "Which DHCP option provides the default gateway?",
    "Option 3 (router)."
   ]
  ]
 },
 {
  "t": "DNS: record types (A, AAAA, CNAME, MX, TXT, NS, PTR, SOA), zones, recursive vs authoritative, DNSSEC, DoH/DoT, hosts file",
  "body": [
   "The Domain Name System (DNS) translates names people remember, like www.example.com, into IP addresses computers use. Almost every connection starts with a DNS lookup, so when DNS fails, users say 'the internet is down' even though the network is fine. DNS uses port 53, UDP for most queries and TCP for zone transfers and large responses.",
   "DNS data lives in resource records. An A record maps a name to an IPv4 address; an AAAA record maps a name to an IPv6 address. A CNAME (canonical name) record is an alias that points one name to another name, such as www pointing to a load balancer's name. An MX (mail exchanger) record lists the mail servers for a domain, with preference values where lower numbers are tried first. A TXT record holds arbitrary text, widely used for email security (SPF, DKIM and DMARC policies) and for proving domain ownership to cloud services. An NS (name server) record names the authoritative servers for a zone. A PTR (pointer) record does the reverse lookup, mapping an IP address back to a name, stored in special zones such as in-addr.arpa for IPv4. The SOA (start of authority) record sits at the top of every zone and contains the primary server, the administrator contact, a serial number and timers that control how secondary servers refresh. Records also carry a TTL that tells resolvers how long to cache them.",
   "A zone is the portion of the DNS namespace that a particular server is responsible for. A forward lookup zone resolves names to addresses; a reverse lookup zone resolves addresses to names. A primary server holds the editable copy of the zone; secondary servers hold read-only copies obtained through zone transfers (AXFR for a full transfer, IXFR for incremental), which should be restricted to authorized servers because they reveal the whole zone.",
   "Two kinds of server play different roles. An authoritative server holds the actual records for a zone and gives definitive answers about it. A recursive resolver, such as your ISP's or company's DNS server, does the legwork for clients: it asks a root server, which refers it to the top-level domain server (for example .com), which refers it to the domain's authoritative server, which gives the answer. The resolver caches results to speed up later queries. Your PC makes a recursive query to its resolver; the resolver makes iterative queries to other servers.",
   "Classic DNS is unauthenticated and unencrypted, which allows cache poisoning (forged answers) and eavesdropping. DNSSEC (DNS Security Extensions) adds digital signatures to records, so resolvers can verify that answers are authentic and unaltered; it provides integrity and authenticity but not confidentiality. For privacy, DNS over TLS (DoT) encrypts DNS on TCP 853, and DNS over HTTPS (DoH) sends DNS inside HTTPS on TCP 443, making it blend with web traffic. Organizations sometimes block or control DoH so their own DNS filtering is not bypassed.",
   "Finally, the local hosts file (`/etc/hosts` on Linux and macOS, `C:\\Windows\\System32\\drivers\\etc\\hosts` on Windows) maps names to addresses statically and is checked before DNS by default. It is handy for testing but can also be abused by malware to redirect sites, so an unexpected entry there is a red flag. Use `nslookup` or `dig` to test DNS directly."
  ],
  "terms": [
   [
    "CNAME",
    "A DNS record that makes one name an alias for another name."
   ],
   [
    "PTR record",
    "A DNS record used for reverse lookups, mapping an IP address to a hostname."
   ],
   [
    "Authoritative server",
    "A DNS server that holds the official records for a zone."
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
  "example": "Email from a company is being marked as spam at some recipients. `dig example.com TXT` shows there is no SPF record, and `dig example.com MX` confirms the mail servers. The admin adds a TXT record with an SPF policy listing the legitimate mail servers, and deliverability improves.",
  "tip": "A = IPv4, AAAA = IPv6, PTR = reverse, MX = mail, NS = name servers, SOA = zone authority and serial, TXT = SPF/DKIM/verification, CNAME = alias. DNSSEC gives integrity, not encryption; DoH and DoT give encryption.",
  "check": [
   [
    "Which record type would you create so that 10.1.1.20 resolves back to server1.example.com?",
    "A PTR record in the reverse lookup zone."
   ],
   [
    "What does DNSSEC protect against, and what does it not provide?",
    "It protects against forged or altered DNS answers (such as cache poisoning) using signatures; it does not encrypt queries."
   ],
   [
    "What port does DNS over TLS use?",
    "TCP 853."
   ]
  ]
 },
 {
  "t": "Time protocols: NTP, PTP and NTS",
  "body": [
   "Accurate, consistent time across all devices matters far more than it first seems. Log correlation during troubleshooting and incident response depends on matching timestamps from many devices. Kerberos authentication, used by Active Directory, fails if clocks differ by more than a few minutes (five by default). Certificates have validity dates, so a device with a badly wrong clock may reject valid certificates. Scheduled jobs, backups and financial transactions all depend on time.",
   "Network Time Protocol (NTP) is the standard way to synchronize clocks over a network, using UDP 123. NTP is hierarchical, organized in strata. Stratum 0 devices are reference clocks, such as GPS receivers or atomic clocks; they are not on the network directly. Stratum 1 servers are directly attached to a stratum 0 source. Stratum 2 servers synchronize from stratum 1, and so on down to stratum 15; stratum 16 means unsynchronized. A lower stratum number means closer to the reference, not necessarily more accurate in practice. NTP measures network delay and gradually adjusts the local clock, typically achieving accuracy within milliseconds over a LAN and tens of milliseconds over the internet.",
   "Good practice is to have two or more internal NTP servers that sync from reliable upstream sources, then point all network devices, servers and clients at them. On network devices you configure a command like `ntp server 10.0.0.5`, and verify with `show ntp status` or `show ntp associations`; on Linux you might check with `timedatectl` or `chronyc sources`. Configure devices to use UTC or a consistent time zone in logs, and use NTP authentication so devices cannot be fed false time.",
   "Precision Time Protocol (PTP), defined in IEEE 1588, provides much higher accuracy than NTP, down to microseconds or better, by using hardware timestamping in network interfaces and switches. A grandmaster clock provides the reference, and PTP-aware switches (boundary or transparent clocks) correct for the delay they introduce. PTP is used where precise timing is critical: financial trading, telecommunications (such as mobile networks), industrial automation, power grids and broadcast media. It requires supporting hardware, so it is chosen only when NTP's accuracy is not enough.",
   "Network Time Security (NTS) adds security to NTP. Traditional NTP is unauthenticated unless you configure symmetric keys, which do not scale well. An attacker who can feed false time could make certificates appear expired, disrupt authentication or muddle log evidence. NTS uses a TLS-based key establishment step followed by authenticated NTP packets, so clients can cryptographically verify that time comes from the genuine server. It provides authentication and integrity for time data, and it scales to public servers.",
   "For the exam, remember the port (UDP 123), the stratum concept, why time matters for logs and authentication, when to choose PTP over NTP, and that NTS secures NTP."
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
    "PTP",
    "Precision Time Protocol (IEEE 1588): hardware-assisted time synchronization with sub-microsecond accuracy."
   ],
   [
    "NTS",
    "Network Time Security: a mechanism that authenticates NTP time using TLS-established keys."
   ]
  ],
  "example": "During an incident, analysts try to trace an intruder across firewall, switch and server logs but the timestamps disagree by up to 12 minutes, making the sequence impossible to reconstruct. Afterwards, the team deploys two internal NTP servers, points every device at them and enables NTS where supported, so future logs line up.",
  "tip": "NTP = UDP 123, millisecond-level accuracy, stratum hierarchy. PTP = microsecond or better, needs hardware support. NTS = secure (authenticated) NTP. Clock skew breaks Kerberos and log correlation.",
  "check": [
   [
    "What does a stratum 1 NTP server synchronize with?",
    "A stratum 0 reference clock, such as GPS or an atomic clock, attached directly."
   ],
   [
    "When would you choose PTP over NTP?",
    "When sub-microsecond accuracy is required, such as in trading, telecom or industrial control, and hardware support is available."
   ],
   [
    "Why can a large clock difference cause user logins to fail in Active Directory?",
    "Kerberos rejects authentication when the clock skew exceeds its tolerance, five minutes by default."
   ]
  ]
 },
 {
  "t": "Access and management methods: site-to-site and client VPNs, SSH, GUI, API, console, jump box, in-band vs out-of-band",
  "body": [
   "Administrators need secure ways to reach networks and manage devices, and they need a way in even when the network itself is broken. Network+ expects you to know the options and the security trade-offs of each.",
   "Virtual private networks provide secure access across untrusted networks. A site-to-site VPN connects entire networks, such as a branch to headquarters, through a permanent tunnel between two gateways, usually firewalls or routers using IPsec; users do not install anything. A client-to-site (remote access) VPN connects an individual device to the corporate network. It may use a full client with IPsec or TLS, or a clientless VPN through a web browser portal that exposes specific applications over HTTPS. Remote access VPNs may be full tunnel or split tunnel, as covered earlier.",
   "For device management, SSH (Secure Shell, TCP 22) is the standard for command-line access: it encrypts the session and supports key-based authentication. Telnet must be disabled because it sends everything, including passwords, in clear text. Many devices also offer a graphical user interface (GUI) through a web browser; it should be accessed over HTTPS only, never HTTP. APIs, usually REST APIs using JSON over HTTPS, let automation tools and scripts configure and query devices programmatically, which scales far better than manual CLI work and underpins infrastructure as code; API access should use tokens or keys with least privilege.",
   "The console port provides direct, local access to a device's CLI through a serial connection, using a rollover (console) cable or a USB console cable and a terminal program. It works even when the device has no IP configuration, which is why it is used for initial setup and recovery. Protect console access physically and with passwords.",
   "A jump box (jump server or bastion host) is a hardened system that administrators must connect to first before reaching management interfaces. Instead of allowing SSH to every device from every laptop, you allow it only from the jump box, which is tightly controlled, uses MFA and logs sessions. This shrinks the attack surface and creates an audit trail.",
   "In-band management uses the same network that carries user traffic, for example SSH to a switch's IP address on a production VLAN (ideally a dedicated management VLAN). It is convenient, but if the network fails you lose management access exactly when you need it most. Out-of-band (OOB) management uses a separate path that does not depend on the production network, such as a dedicated management network, a console server connected to device console ports, or a cellular modem for remote sites. OOB lets you fix a router whose misconfiguration cut off its own in-band access. Critical sites commonly have both."
  ],
  "terms": [
   [
    "Site-to-site VPN",
    "A VPN that permanently connects two networks through their gateways."
   ],
   [
    "Jump box",
    "A hardened intermediary host that administrators must use to access management interfaces of other systems."
   ],
   [
    "Out-of-band management",
    "Managing devices through a separate path independent of the production network, such as a console server."
   ],
   [
    "Console port",
    "A local serial management port that provides CLI access without needing network connectivity."
   ],
   [
    "Clientless VPN",
    "Remote access through a web browser over TLS without a dedicated VPN client."
   ]
  ],
  "example": "An engineer pushes an ACL that accidentally blocks SSH to a remote branch router, locking herself out. Because the branch has a console server reachable over an LTE modem, she connects out-of-band, fixes the ACL through the router's console port, and the branch is back online within minutes.",
  "tip": "If the question says the network is down but you still need to manage the device, the answer is out-of-band management (console server, separate network, cellular). Replace Telnet with SSH and HTTP with HTTPS. A jump box centralizes and audits admin access.",
  "check": [
   [
    "What is the key advantage of out-of-band management?",
    "It provides access even when the production network is down or misconfigured."
   ],
   [
    "What kind of VPN connects a branch office network to headquarters without user software?",
    "A site-to-site VPN."
   ],
   [
    "Why use a jump box?",
    "It limits management access to one hardened, monitored host, reducing the attack surface and providing an audit trail."
   ]
  ]
 },
 {
  "t": "Logical security: encryption in transit and at rest, PKI and certificates, IAM, AAA, MFA, SSO, RADIUS, TACACS+, LDAP, SAML",
  "body": [
   "Logical security uses technology, rather than locks and guards, to protect data and control who can do what. Two pillars run through this lesson: encrypting data so it stays confidential, and managing identities so only the right people and devices get access.",
   "Data needs protection in two states. Data in transit is moving across a network; protect it with protocols such as TLS (HTTPS, LDAPS), SSH, IPsec VPNs and WPA3 on wireless. Data at rest is stored on disks, databases, backups or removable media; protect it with full-disk encryption, database or file encryption and encrypted backups, so a stolen laptop or drive reveals nothing. Many standards require both.",
   "Public key infrastructure (PKI) makes encryption and identity work at scale. Asymmetric cryptography gives each entity a key pair: a public key shared freely and a private key kept secret. A digital certificate binds a public key to an identity, such as a web server's name, and is signed by a certificate authority (CA) that clients trust. When your browser connects to a site, it checks that the certificate is signed by a trusted CA, is within its validity dates, matches the site name and has not been revoked (via a certificate revocation list or OCSP). Self-signed certificates are not trusted by default and are common on new devices' management pages, which is why you should replace them with CA-issued certificates.",
   "Identity and access management (IAM) covers creating, managing and removing user and device identities and their permissions. AAA is the classic framework: authentication proves who you are, authorization decides what you are allowed to do, and accounting records what you did. Multifactor authentication (MFA) requires factors from different categories: something you know (password), something you have (phone app, token, smart card) and something you are (fingerprint); some definitions add somewhere you are. Two passwords are still one factor. Single sign-on (SSO) lets a user authenticate once and access many applications, improving usability and centralizing control, though the SSO account becomes very valuable and should be protected with MFA.",
   "Several protocols implement these ideas. RADIUS (Remote Authentication Dial-In User Service) is an open standard used for network access, such as 802.1X Wi-Fi and VPN logins; it uses UDP (1812 for authentication, 1813 for accounting), combines authentication and authorization, and encrypts only the password in its messages. TACACS+ (Terminal Access Controller Access-Control System Plus), originally from Cisco, is favoured for device administration: it uses TCP 49, encrypts the entire payload and separates authentication, authorization and accounting, allowing per-command authorization for network engineers. LDAP (Lightweight Directory Access Protocol) queries and updates directory services, such as Active Directory, on TCP 389, or LDAPS on 636. SAML (Security Assertion Markup Language) is an XML-based standard for web SSO and federation: an identity provider authenticates the user and sends a signed assertion to a service provider, such as a SaaS application, which trusts it.",
   "In short: RADIUS for network access, TACACS+ for device administration, LDAP for directory look-ups, SAML for browser-based SSO."
  ],
  "terms": [
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
    "TACACS+",
    "A AAA protocol on TCP 49 that encrypts the full payload and separates authentication, authorization and accounting."
   ],
   [
    "SAML",
    "An XML-based standard that lets an identity provider send authentication assertions to service providers for SSO."
   ]
  ],
  "example": "Network engineers log in to switches with their own accounts via TACACS+, which authorizes only certain commands for junior staff and logs every command. Employees join Wi-Fi via 802.1X with RADIUS against Active Directory, and use SAML-based SSO with MFA to reach cloud apps. Laptops use full-disk encryption for data at rest.",
  "tip": "RADIUS: UDP, network access, encrypts only the password. TACACS+: TCP 49, device administration, encrypts everything, separates the three As. A password plus a security question is not MFA; both are something you know.",
  "check": [
   [
    "Which AAA protocol would you choose to control and log individual commands on network devices?",
    "TACACS+, because it separates authorization and supports per-command authorization and accounting."
   ],
   [
    "Is a password plus a PIN multifactor authentication?",
    "No. Both are something you know, so it is single-factor."
   ],
   [
    "What does a browser check when validating a server certificate?",
    "That a trusted CA signed it, it is within its validity period, the name matches the site and it has not been revoked."
   ]
  ]
 },
 {
  "t": "Security principles: least privilege, role-based access, CIA triad, defense in depth, zero trust, segmentation",
  "body": [
   "Security principles are the ideas behind every specific control. When an exam question describes a situation and asks which principle applies, or which design is best, these concepts are what it is testing.",
   "The CIA triad defines what security protects. Confidentiality means only authorized people can read data; controls include encryption and access control. Integrity means data is accurate and unaltered; controls include hashing, digital signatures and change control. Availability means systems and data are accessible when needed; controls include redundancy, backups, UPS power and DDoS protection. Every attack and control can be mapped to one or more of these. A ransomware attack hits availability (and often confidentiality, if data is stolen); a tampered configuration hits integrity.",
   "The principle of least privilege says every user, service and device should have only the minimum access needed to do its job, and only for as long as needed. It limits the damage from mistakes, compromised accounts and insider threats. Examples: a help desk technician can reset passwords but not change firewall rules; a monitoring server has read-only SNMP access. Role-based access control (RBAC) makes least privilege manageable by assigning permissions to roles, such as 'network operator' or 'network administrator', and then placing users in roles. When someone changes jobs, you change their role instead of editing dozens of individual permissions. Related ideas include separation of duties, so no one person can complete a sensitive task alone, and regular access reviews.",
   "Defense in depth means layering multiple independent controls so that if one fails, others still protect you. A layered network might combine a perimeter firewall, an IPS, network segmentation, NAC on switch ports, host firewalls and endpoint protection, encryption, MFA, logging and monitoring, physical security and user training. No single control is perfect; layers buy time and increase the chance of detection.",
   "Zero trust removes implicit trust based on network location. The traditional castle-and-moat model trusted anything inside the perimeter, so an attacker who got in could move freely. Zero trust says 'never trust, always verify': every access request is authenticated and authorized based on identity, device posture and context, with least privilege, and trust is continuously re-evaluated. It assumes a breach may already have happened.",
   "Segmentation divides a network into smaller zones with controlled communication between them, using VLANs, subnets, firewalls and ACLs, or in data centres and clouds, microsegmentation down to individual workloads. It limits lateral movement by attackers, contains malware outbreaks, reduces broadcast traffic and helps compliance by isolating sensitive systems (for example, keeping card payment systems in their own zone reduces the scope of a PCI DSS audit). Segmentation is a practical building block of both defense in depth and zero trust."
  ],
  "terms": [
   [
    "CIA triad",
    "Confidentiality, integrity and availability: the three core goals of information security."
   ],
   [
    "Least privilege",
    "Granting only the minimum access rights needed to perform a task."
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
    "Lateral movement",
    "An attacker moving from one compromised system to others inside a network."
   ]
  ],
  "example": "Ransomware infects a receptionist's PC. Because the network is segmented, the PC's VLAN cannot reach the finance servers, and because the receptionist's account has least privilege, it cannot map the file shares used by engineering. The EDR agent isolates the host and backups restore it: several layers each limited the damage.",
  "tip": "Map attacks to the triad: DoS hits availability, eavesdropping hits confidentiality, tampering hits integrity. 'Grant only what is needed' is least privilege; 'manage by job function' is RBAC; 'multiple layers' is defense in depth; 'never trust, always verify' is zero trust.",
  "check": [
   [
    "A DDoS attack takes a web site offline. Which part of the CIA triad is affected?",
    "Availability."
   ],
   [
    "How does network segmentation limit a breach?",
    "It restricts communication between zones, reducing lateral movement and containing the attacker or malware."
   ],
   [
    "What is the main advantage of RBAC over assigning permissions to individual users?",
    "Permissions are managed per role, so access is consistent and easy to change when people join, move or leave."
   ]
  ]
 },
 {
  "t": "Physical security, deception technologies (honeypots, honeynets), risk terms, audits and compliance (PCI DSS, GDPR)",
  "body": [
   "If an attacker can touch your equipment, many logical controls can be bypassed: they can plug into a switch, reset a device to factory defaults via its console, or simply steal a server. Physical security is therefore the first layer of defense in depth, and Network+ pairs it with deception, risk vocabulary and compliance.",
   "Physical security controls fall into prevention and detection. Prevention includes locked server rooms and racks, badge readers, keypads, biometric scanners, fences and security guards, and access control vestibules (formerly called mantraps): small rooms with two doors where only one can open at a time, which stops tailgating. Detection includes cameras (CCTV), motion sensors, door alarms and tamper-evident seals or asset tags. Logs from badge systems show who entered and when. Locking equipment cabinets and disabling unused wall jacks are simple but effective.",
   "Deception technologies lure attackers into revealing themselves. A honeypot is a decoy system that looks valuable, such as a fake file server, but has no legitimate users, so any interaction with it is suspicious and triggers an alert. A honeynet is a network of honeypots that simulates a realistic environment, letting defenders observe attacker techniques in more depth. Related ideas include honeyfiles and honeytokens, fake credentials or documents that alert when used. Deception must be isolated so it cannot become a launch point into the real network.",
   "Risk management uses precise terms. A vulnerability is a weakness, such as unpatched firmware or a default password. A threat is anything that could exploit a weakness, such as an attacker, malware or a flood. An exploit is the actual technique or code that takes advantage of a vulnerability. Risk combines the likelihood that a threat exploits a vulnerability with the impact if it does. Organizations respond to risk by mitigating it (adding controls), transferring it (such as buying insurance), avoiding it (stopping the risky activity) or accepting it. A risk assessment identifies and prioritizes risks; a vulnerability assessment scans for weaknesses; a penetration test, done only with written authorization, tries to exploit them in a controlled way. Posture assessment evaluates overall security.",
   "Audits check that controls exist and work, and compliance means following laws, regulations and industry standards. PCI DSS (Payment Card Industry Data Security Standard) is an industry standard that applies to any organization that stores, processes or transmits payment card data; it requires things like firewalls, segmentation of the cardholder data environment, encryption, access control, logging and regular testing. GDPR (General Data Protection Regulation) is a European Union law protecting the personal data of people in the EU, wherever the processing organization is based; it requires lawful processing, data minimization, security, breach notification within strict timelines and respect for individuals' rights. Related concepts are data locality, rules about where data may be physically stored, and regular internal and external audits to demonstrate compliance."
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
    "Vulnerability",
    "A weakness in a system that could be exploited by a threat."
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
  "example": "A hotel chain that processes card payments must meet PCI DSS, so it segments its payment terminals into an isolated network, encrypts card data and logs access. It also places a honeypot that mimics a reservation database; an alert from it one night reveals a compromised laptop scanning the network.",
  "tip": "Vulnerability = weakness, threat = potential danger, exploit = the method used, risk = likelihood times impact. PCI DSS is about card data; GDPR is about personal data of people in the EU. Any traffic to a honeypot is suspicious by definition.",
  "check": [
   [
    "Why does any connection to a honeypot deserve investigation?",
    "It has no legitimate users or services, so any interaction is likely malicious or a misconfiguration."
   ],
   [
    "Which physical control specifically prevents tailgating?",
    "An access control vestibule (mantrap), with guards and training also helping."
   ],
   [
    "A company buys cyber insurance. Which risk response is that?",
    "Risk transference."
   ]
  ]
 },
 {
  "t": "Network segmentation enforcement for IoT, IIoT, SCADA/ICS/OT, guest and BYOD",
  "body": [
   "Some devices and users should never share a flat network with your critical systems. Internet of Things gadgets, industrial controllers, guests and personal devices each bring different risks, and segmentation lets you connect them while containing those risks. Network+ asks you to recognise these groups and the controls that separate them.",
   "IoT (Internet of Things) devices include smart TVs, cameras, thermostats, badge readers, printers and building sensors. They often have weak default passwords, infrequent or no firmware updates, limited processing for security software and chatty cloud connections. IIoT (Industrial IoT) applies the same ideas to industrial settings: sensors on factory machines, smart meters and connected equipment. Because these devices are hard to secure individually, the network must protect them and protect everything else from them.",
   "Operational technology (OT) is hardware and software that monitors and controls physical processes. ICS (industrial control systems) is the umbrella term, and SCADA (supervisory control and data acquisition) systems monitor and control geographically spread processes such as power grids, pipelines and water treatment. OT priorities differ from IT: availability and safety come first, systems may run for decades on old operating systems, and patching or even scanning can disrupt operations. A compromise can cause physical harm. OT networks should therefore be strongly isolated from the corporate IT network, with traffic passing only through firewalls and tightly controlled points such as a DMZ between IT and OT, jump hosts for remote support and one-way data flows where possible. Some very sensitive systems are air-gapped, with no network connection to other systems at all.",
   "Guest networks give visitors internet access without access to internal resources. Put guests on their own SSID and VLAN, route them straight to the internet, block access to internal subnets with ACLs or firewall rules, enable client isolation so guests cannot reach each other's devices, rate-limit bandwidth and use a captive portal for terms acceptance. BYOD (bring your own device) covers employees' personal phones and laptops. They are not managed by IT, so they may be unpatched or infected. Common approaches are a separate BYOD VLAN with limited access, NAC posture checks before granting access, and mobile device management (MDM) to enforce policies such as screen locks and encryption, sometimes with containerization separating work data from personal data.",
   "The enforcement tools are the same across all these groups: VLANs and separate subnets to divide traffic, ACLs and firewalls between segments with default-deny rules, NAC (including 802.1X with dynamic VLAN assignment) to put each device in the right segment automatically, separate SSIDs for wireless, and monitoring of traffic between segments. The design principle is least privilege at the network level: an IP camera needs to talk to the video recorder, not to the finance server."
  ],
  "terms": [
   [
    "IoT",
    "Internet of Things: everyday devices, such as cameras and sensors, connected to networks."
   ],
   [
    "SCADA",
    "Supervisory control and data acquisition: systems that monitor and control distributed industrial processes."
   ],
   [
    "OT",
    "Operational technology: systems that control physical processes, prioritizing safety and availability."
   ],
   [
    "Air gap",
    "Complete physical isolation of a system or network from other networks."
   ],
   [
    "BYOD",
    "Bring your own device: a policy allowing personal devices to access organizational resources."
   ]
  ],
  "example": "A hospital places its infusion pumps and building sensors on an IoT VLAN that can reach only their management servers, puts guests on an internet-only VLAN behind a captive portal, and uses NAC so staff personal phones land on a BYOD VLAN with access only to email and the intranet. When a smart TV in a waiting room is compromised, it cannot reach patient records.",
  "tip": "OT and ICS prioritize availability and safety; they need the strongest isolation, even air gaps. Guest and BYOD traffic should go to separate VLANs with internet-only or limited access enforced by ACLs and NAC.",
  "check": [
   [
    "Why are IoT devices typically placed in their own segment?",
    "They often have weak security and limited patching, so isolation limits both their exposure and their ability to be used to attack other systems."
   ],
   [
    "What CIA priority dominates in SCADA and ICS environments?",
    "Availability (and physical safety)."
   ],
   [
    "Name three controls for a guest wireless network.",
    "A separate SSID and VLAN, ACLs blocking internal networks, client isolation, and a captive portal (also bandwidth limits)."
   ]
  ]
 },
 {
  "t": "Attacks: DoS/DDoS, VLAN hopping, MAC flooding, ARP and DNS poisoning/spoofing, rogue DHCP and APs, evil twin, on-path",
  "body": [
   "To defend a network you must recognise how it is attacked. This lesson explains the network attacks named in the objectives at the level needed to spot and prevent them. Each one pairs naturally with a defence you will study in later lessons.",
   "A denial-of-service (DoS) attack tries to make a service unavailable by exhausting bandwidth, connection tables, CPU or application resources. A distributed DoS (DDoS) uses many sources, usually a botnet of compromised devices, making it harder to block. Reflection and amplification attacks spoof the victim's address in small requests to open services that send much larger responses to the victim. Defences include upstream DDoS scrubbing services and CDNs, rate limiting, firewalls that handle SYN floods, and having a response plan with your ISP.",
   "VLAN hopping lets traffic escape its VLAN. In switch spoofing, an attacker's device pretends to be a switch and negotiates a trunk with a port left in dynamic trunking mode, gaining access to all VLANs. In double tagging, the attacker sends a frame with two 802.1Q tags; the first switch strips the outer tag matching the native VLAN, and the next switch forwards the frame into the inner tag's VLAN. Defences: set user ports to access mode, disable trunk negotiation, and set the native VLAN to an unused VLAN.",
   "MAC flooding sends huge numbers of frames with fake source MAC addresses to fill the switch's MAC address table. When the table is full, many switches flood unknown frames out of all ports, like a hub, letting the attacker see traffic. Port security, which limits the number of MAC addresses per port, prevents it. ARP poisoning (ARP spoofing) sends forged ARP replies so that victims associate the attacker's MAC address with the default gateway's IP, redirecting traffic through the attacker. Dynamic ARP inspection blocks it. DNS poisoning or spoofing feeds false DNS answers, either into a resolver's cache or directly to clients, or through a modified hosts file, redirecting users to malicious sites. DNSSEC, patched resolvers and secure DNS reduce the risk.",
   "A rogue DHCP server, whether a misconfigured home router or a malicious device, hands out wrong settings, such as an attacker-controlled gateway or DNS server, or causes outages with bad addresses. DHCP snooping on switches blocks DHCP server messages on untrusted ports. A rogue access point is an unauthorized AP connected to the wired network, perhaps installed by an employee for convenience, that bypasses security. An evil twin is an attacker's AP that imitates a legitimate SSID so users connect to it, often combined with deauthentication frames to push users off the real network. Wireless intrusion prevention systems, regular wireless scans, 802.1X with server certificate validation and WPA3's protected management frames all help.",
   "An on-path attack (formerly man-in-the-middle) places the attacker between two parties so they can intercept or alter traffic. ARP poisoning, rogue DHCP, evil twins and DNS spoofing are all ways to get on-path. Strong encryption with proper certificate validation (TLS, SSH, VPNs) is the core defence, because even an on-path attacker cannot read or silently modify properly encrypted traffic."
  ],
  "terms": [
   [
    "DDoS",
    "Distributed denial of service: an attack from many sources that overwhelms a target's resources."
   ],
   [
    "Double tagging",
    "A VLAN hopping technique using two 802.1Q tags to reach a VLAN through the native VLAN."
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
  "example": "Users on one floor suddenly get addresses in 192.168.0.x instead of 10.20.x.x and cannot reach internal servers. An employee plugged in a home router with DHCP enabled. The team removes it and enables DHCP snooping, trusting only the uplink ports, so any future rogue DHCP offers are dropped.",
  "tip": "Pair each attack with its defence: MAC flooding with port security; ARP poisoning with dynamic ARP inspection; rogue DHCP with DHCP snooping; VLAN hopping with disabling trunk negotiation and changing the native VLAN; evil twin with 802.1X and WIPS.",
  "check": [
   [
    "What happens to a switch when its MAC address table is flooded?",
    "It may flood frames out all ports like a hub, letting an attacker capture traffic."
   ],
   [
    "How does an evil twin differ from a rogue access point?",
    "An evil twin impersonates a legitimate SSID to trick users; a rogue AP is any unauthorized AP connected to the network, often bypassing security."
   ],
   [
    "Which switch feature defeats rogue DHCP servers?",
    "DHCP snooping, which allows DHCP server replies only on trusted ports."
   ]
  ]
 },
 {
  "t": "Social engineering: phishing, dumpster diving, shoulder surfing, tailgating; malware",
  "body": [
   "Social engineering attacks people rather than technology. It is often easier to trick someone into giving up a password or opening a door than to break encryption, so attackers exploit trust, helpfulness, fear, curiosity and urgency. Technical controls help, but awareness training and clear procedures are the main defence.",
   "Phishing uses fraudulent messages, usually email, that impersonate a trusted party to make the victim click a malicious link, open an infected attachment or enter credentials on a fake login page. Warning signs include urgent or threatening language, unexpected attachments, mismatched sender addresses and links whose real destination differs from the displayed text. Variants target the channel or victim: spear phishing targets specific individuals with personalized details; whaling targets executives; vishing uses voice calls; smishing uses SMS text messages. Defences include email filtering, SPF, DKIM and DMARC to detect spoofed senders, MFA so stolen passwords are less useful, easy ways to report suspicious messages and simulated phishing exercises.",
   "Dumpster diving means searching rubbish for useful information: printed network diagrams, password notes, invoices, org charts or discarded drives. Defences are shredding paper, secure disposal bins and proper media sanitization. Shoulder surfing is watching someone enter a password or view sensitive data, in person or through a camera; privacy screens, careful positioning of screens and awareness reduce it. Tailgating is following an authorized person through a secure door without badging in; piggybacking is similar but with the person's consent, for example someone holding the door out of politeness. Access control vestibules, guards, turnstiles and a culture where challenging unbadged people is normal all help.",
   "Malware is malicious software, and social engineering is one of the main ways it gets in. Know the types by behaviour. A virus attaches to files and spreads when they are run or shared. A worm spreads by itself across the network by exploiting vulnerabilities, which is why segmentation and patching matter. A Trojan horse pretends to be legitimate software while hiding a malicious function; a remote access Trojan gives an attacker control. Ransomware encrypts data and demands payment for the key, often also stealing data to threaten publication. Spyware secretly monitors activity; a keylogger records keystrokes. A rootkit hides deep in the operating system to conceal itself and other malware. Adware shows unwanted advertising. A logic bomb triggers when a condition is met, such as a date. A botnet is a network of infected machines controlled by an attacker through command-and-control servers, often used for DDoS or spam.",
   "Defences against malware form layers: endpoint protection or EDR on hosts, email and web filtering, patching operating systems and firmware, least privilege so users cannot install software freely, application allow-listing, segmentation to slow worms, network monitoring for command-and-control traffic, and tested offline or immutable backups so ransomware does not force you to pay. Train users to report, not hide, suspicious events; fast reporting shortens incidents."
  ],
  "terms": [
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
    "Ransomware",
    "Malware that encrypts or steals data and demands payment for its release."
   ],
   [
    "Rootkit",
    "Malware that hides itself deep in the operating system to maintain concealed access."
   ]
  ],
  "example": "An accounts clerk receives an urgent email that appears to come from the CEO asking for a payment to a new supplier. The display name is right but the address domain is misspelled. Having completed phishing training, she calls the CEO on a known number, confirms it is fake and reports it, and the security team blocks the sending domain.",
  "tip": "Distinguish by delivery: phishing = email, vishing = voice, smishing = SMS, whaling = executives. Distinguish malware by behaviour: a worm self-propagates, a virus needs a host file and user action, a Trojan disguises itself.",
  "check": [
   [
    "What is the main difference between a virus and a worm?",
    "A virus needs a host file and user action to spread; a worm spreads by itself across networks."
   ],
   [
    "Which control best reduces the risk from dumpster diving?",
    "Shredding and secure disposal of paper and media."
   ],
   [
    "Why does MFA reduce the impact of credential phishing?",
    "A stolen password alone is not enough to log in without the second factor."
   ]
  ]
 },
 {
  "t": "Device hardening: disable unused ports and services, change default passwords, secure management protocols",
  "body": [
   "Hardening means reducing a device's attack surface by removing anything unnecessary and securing what remains. Network devices ship configured for easy setup, not for security, so hardening is one of the first jobs after deployment and should be captured in your golden configuration so every device gets the same protection.",
   "Start with defaults. Default usernames and passwords for devices are widely published, so attackers try them first. Change every default credential at installation, use strong unique passwords stored in a password manager or vault, and prefer individual accounts through central AAA (RADIUS or TACACS+) so actions are attributable and access can be revoked. Keep a local emergency account with a strong password in case the AAA server is unreachable. Also change default SNMP community strings such as 'public' and 'private', and store passwords in the configuration using strong hashing rather than weak reversible encoding.",
   "Disable what you do not use. Unused switch ports should be administratively shut down and placed in an unused VLAN (sometimes called a parking lot or black hole VLAN), so plugging into a spare wall jack gives an intruder nothing. Disable unneeded services: on older or default configurations these may include HTTP management, Telnet, unused discovery protocols on untrusted ports, small legacy servers or remote management features. Each running service is a potential vulnerability. Removing the default VLAN 1 from use for users and management is also good practice.",
   "Use secure management protocols. Replace Telnet with SSH (version 2), HTTP with HTTPS, SNMPv1 and v2c with SNMPv3 using authPriv, FTP and TFTP with SFTP or SCP for configuration and firmware transfers, and plain LDAP with LDAPS. Restrict management access so it is only allowed from a management network or jump box, using ACLs on the management plane (on Cisco-style devices, an access-class on the VTY lines). Configure idle session timeouts, login banners with legal warnings, limits on failed login attempts and logging of all management sessions to a syslog server.",
   "Keep firmware updated through a controlled patch process, because hardening settings cannot fix a known vulnerability in old code. Verify firmware integrity before installing it. Enable NTP so logs have accurate time. Back up the hardened configuration and use configuration monitoring to detect drift.",
   "Hardening applies to servers, endpoints and cloud services too: remove unnecessary software, enable host firewalls, apply patches and follow a benchmark or vendor hardening guide. Vulnerability scans after hardening confirm that nothing unexpected is still exposed, for example by checking for open ports with an authorized `nmap` scan."
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
    "Parking lot VLAN",
    "An unused, isolated VLAN assigned to disabled ports so they give no network access if enabled."
   ],
   [
    "SNMPv3 authPriv",
    "The SNMPv3 security level that provides both authentication and encryption."
   ]
  ],
  "example": "A new batch of switches arrives. Before deployment, the technician applies the golden config: default admin passwords replaced with TACACS+ logins, Telnet and HTTP disabled in favour of SSH and HTTPS, SNMPv3 configured, management limited to the jump box subnet, unused ports shut down and moved to VLAN 999, and logging sent to the syslog server.",
  "tip": "The most common hardening answers: change default credentials, disable unused ports and services, and replace insecure protocols with secure ones (Telnet to SSH, HTTP to HTTPS, SNMPv1/v2c to SNMPv3, FTP/TFTP to SFTP/SCP).",
  "check": [
   [
    "What should be done with unused switch ports?",
    "Administratively shut them down and assign them to an unused VLAN."
   ],
   [
    "Which protocol should replace SNMPv2c for secure monitoring?",
    "SNMPv3 with authentication and encryption (authPriv)."
   ],
   [
    "Why use central AAA accounts instead of one shared admin password?",
    "Individual accounts provide accountability and can be revoked per person, and changes are logged per user."
   ]
  ]
 },
 {
  "t": "Switch security: port security, DHCP snooping, dynamic ARP inspection, BPDU guard",
  "body": [
   "Access switches are where users and devices plug in, so they are the natural place to stop Layer 2 attacks. Four features work together, and Network+ expects you to know which one stops which attack.",
   "Port security limits which and how many MAC addresses can use a switch port. You can set a maximum number of addresses (for example one for a PC, or two for a phone with a PC behind it), statically define allowed MACs, or use sticky learning, where the switch learns the first MAC addresses it sees and saves them to the configuration. When a violation occurs, the port takes an action: protect (silently drop the offending frames), restrict (drop them and log or count the violation) or shutdown (put the port into an err-disabled state, the usual default). Port security defeats MAC flooding and stops users from plugging in unauthorized switches or devices. Note that MAC addresses can be spoofed, so port security is a basic control, not strong authentication; 802.1X is stronger.",
   "DHCP snooping protects against rogue DHCP servers. You mark the ports that lead to legitimate DHCP servers, usually uplinks, as trusted; all other ports are untrusted. The switch drops DHCP server messages (offers and acknowledgements) arriving on untrusted ports, so a rogue server plugged into a user port cannot hand out addresses. DHCP snooping can also rate-limit DHCP requests to resist starvation attacks. As a bonus, it builds a binding table recording which MAC address received which IP address on which port and VLAN.",
   "Dynamic ARP inspection (DAI) uses that DHCP snooping binding table to stop ARP poisoning. On untrusted ports, the switch checks each ARP message against the table; if a host claims an IP-to-MAC mapping it was not assigned, for example pretending to be the default gateway, the switch drops the packet and logs it. Devices with static addresses need static entries or ARP ACLs, because they have no DHCP binding. A related feature, IP source guard, uses the same table to block packets with spoofed source IPs.",
   "BPDU guard protects the spanning tree. Access ports connected to end devices are configured as edge ports with PortFast so they come up immediately. End devices never send BPDUs, so if one arrives on such a port, someone has connected a switch or something is misbehaving. BPDU guard err-disables the port instantly, preventing loops and stopping an attacker from trying to become the root bridge. Root guard is a related feature for ports that may connect to switches but must never lead toward the root.",
   "An err-disabled port stays down until an administrator re-enables it (with `shutdown` then `no shutdown`) or an automatic recovery timer does, so you will often meet this while troubleshooting: `show interfaces status` shows the port as err-disabled, and the log explains which feature triggered it."
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
    "DHCP snooping",
    "A switch feature that permits DHCP server messages only on trusted ports and builds a binding table."
   ],
   [
    "Dynamic ARP inspection",
    "A switch feature that validates ARP packets against trusted bindings to prevent ARP poisoning."
   ],
   [
    "Err-disabled",
    "A port state where the switch has shut the port down due to a detected error or violation."
   ]
  ],
  "example": "An intern connects a small switch under his desk to add a second PC. The access port has BPDU guard, and the small switch sends BPDUs, so the port immediately goes err-disabled. The help desk sees the log message, removes the switch, re-enables the port and explains the policy.",
  "tip": "Attack to defence: MAC flooding -> port security; rogue DHCP -> DHCP snooping; ARP poisoning -> dynamic ARP inspection (which depends on DHCP snooping); rogue switch or loop on an edge port -> BPDU guard.",
  "check": [
   [
    "Which feature must be enabled for dynamic ARP inspection to validate DHCP clients?",
    "DHCP snooping, because DAI uses its binding table."
   ],
   [
    "What are the three port security violation modes?",
    "Protect, restrict and shutdown."
   ],
   [
    "Which port should be trusted for DHCP snooping?",
    "The port or uplink leading toward the legitimate DHCP server or relay."
   ]
  ]
 },
 {
  "t": "Network access control: 802.1X, MAC filtering, key management",
  "body": [
   "Network access control (NAC) decides whether a device may connect to the network, and to which part, before it gets access. Instead of trusting anything plugged into a wall jack or joined to Wi-Fi, NAC checks who or what the device is, and often whether it meets security policy, then allows, restricts or denies it.",
   "IEEE 802.1X is port-based network access control for wired and wireless networks. It has three roles. The supplicant is software on the client that provides credentials. The authenticator is the switch or wireless access point, which initially blocks all traffic from the port except authentication messages. The authentication server, usually RADIUS, checks the credentials against a directory such as Active Directory. The protocol between them is EAP (Extensible Authentication Protocol): EAP over LAN (EAPoL) runs between supplicant and authenticator, and EAP is carried inside RADIUS from authenticator to server. After success, the port opens, and the RADIUS server can tell the switch to place the device in a specific VLAN or apply an ACL, which is dynamic VLAN assignment. EAP methods vary: EAP-TLS uses certificates on both sides and is the strongest; PEAP and EAP-TTLS wrap password authentication in a TLS tunnel.",
   "Many NAC solutions add posture assessment: before full access, the system checks whether the device has up-to-date antivirus, patches and a firewall enabled, perhaps via an agent. Non-compliant devices are placed in a quarantine or remediation VLAN where they can reach update servers only. Devices that cannot run a supplicant, such as printers and cameras, often use MAC authentication bypass (MAB): the switch sends the device's MAC address to the RADIUS server as its identity, and it is profiled and placed in a suitable VLAN. Guest devices may be redirected to a captive portal.",
   "MAC filtering allows or denies devices based on their MAC address, on a switch port or a wireless access point. It is simple, but it is weak: MAC addresses are sent in the clear and are easily spoofed, and maintaining lists does not scale. Treat MAC filtering as a minor supplementary control, never as authentication. Modern phones also randomize their Wi-Fi MAC addresses for privacy, which further complicates MAC-based rules.",
   "Key management is the handling of cryptographic keys through their life cycle: generation, distribution, storage, rotation, revocation and destruction. In networking it applies to wireless pre-shared keys, 802.1X certificates, VPN keys, SSH host and user keys and TLS certificates. Good practice includes generating strong random keys, storing private keys securely (for example in hardware security modules or protected key stores), rotating keys and PSKs regularly and immediately when someone with access leaves, tracking certificate expiry dates so they do not lapse and cause outages, and revoking keys or certificates that are compromised. One reason enterprises prefer 802.1X over a shared PSK is key management: each user or device has its own credentials and session keys, so revoking one does not disrupt everyone."
  ],
  "terms": [
   [
    "Supplicant",
    "The client software that requests network access and provides credentials in 802.1X."
   ],
   [
    "Authenticator",
    "The switch or access point that enforces 802.1X by relaying authentication and controlling port access."
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
  "example": "At a university, a student plugs a laptop into a lab port. The switch holds the port closed while the laptop's supplicant authenticates to RADIUS with the student's credentials. The NAC server finds antivirus definitions are months old and assigns a remediation VLAN; once updated, the laptop is moved to the student VLAN automatically.",
  "tip": "In 802.1X: supplicant = client, authenticator = switch or AP, authentication server = RADIUS. MAC filtering is easily bypassed by spoofing and is not real authentication.",
  "check": [
   [
    "In 802.1X, what does the switch do before authentication succeeds?",
    "It blocks all traffic on the port except EAP authentication messages."
   ],
   [
    "Why is MAC filtering considered weak security?",
    "MAC addresses are visible and easily spoofed, so an attacker can copy an allowed address."
   ],
   [
    "How can printers that do not support 802.1X be handled on a NAC-protected network?",
    "With MAC authentication bypass and profiling, placing them in a restricted VLAN."
   ]
  ]
 },
 {
  "t": "Security rules: ACLs, implicit deny, URL and content filtering, zones and screened subnets",
  "body": [
   "Security rules decide what traffic is permitted between parts of a network. They appear as access control lists on routers and switches, as policies on firewalls and as filters on web proxies. Writing them correctly, and understanding how they are processed, is essential for both the exam and real life.",
   "An access control list (ACL) is an ordered list of permit and deny statements. Each rule matches criteria such as source and destination IP address, protocol and port numbers. On Cisco-style devices, a standard ACL filters only on source address, while an extended ACL matches source, destination, protocol and ports; a common guideline is to place extended ACLs close to the source and standard ACLs close to the destination. ACLs are applied to an interface in a direction, inbound or outbound, and only one ACL per interface, per direction, per protocol applies.",
   "Order matters enormously. The device reads rules from top to bottom and acts on the first match; later rules are not checked. So specific rules must come before general ones. If you put 'permit any' first, nothing after it matters. At the end of every ACL is an invisible implicit deny: any traffic that matches no rule is dropped. That makes firewalls default-deny by design, which is secure, but it also means that if you create an ACL containing only deny statements, you block everything, because the permitted traffic never gets an explicit permit. Many administrators add an explicit 'deny any' with logging at the end so they can see what is being dropped. Stateful firewalls track sessions, so you usually write rules only for the initiating direction.",
   "Content-level filtering goes beyond addresses and ports. URL filtering allows or blocks web access by site address or by category, such as gambling, malware or social media, usually on a proxy, next-generation firewall or secure web gateway. Content filtering inspects what is actually transferred, blocking file types, malware, or data matching sensitive patterns. Because most web traffic is encrypted, deep inspection often requires TLS inspection, which decrypts and re-encrypts traffic using a trusted internal certificate, raising privacy considerations that should be covered by policy.",
   "Firewalls organize interfaces into security zones with different trust levels, such as inside (trusted), outside (untrusted internet) and one or more zones in between. Policies control traffic between zones. A screened subnet, previously called a DMZ (demilitarized zone), is a zone for servers that must be reachable from the internet, such as public web, mail relay or DNS servers. Internet users can reach only those specific services in the screened subnet, and servers there have very limited access to the internal network. If a public server is compromised, the attacker is still separated from internal systems. A screened subnet can be built with one firewall with three interfaces or with two firewalls in series.",
   "Keep rule sets documented, reviewed and cleaned up regularly, because old unused rules accumulate and create unexpected openings."
  ],
  "terms": [
   [
    "ACL",
    "Access control list: an ordered set of permit and deny rules used to filter traffic."
   ],
   [
    "Implicit deny",
    "The invisible final rule in an ACL or firewall policy that drops any traffic not explicitly permitted."
   ],
   [
    "Screened subnet",
    "A network zone, formerly called a DMZ, that hosts internet-facing services separated from the internal network."
   ],
   [
    "URL filtering",
    "Allowing or blocking web access based on the site address or its category."
   ],
   [
    "Security zone",
    "A group of interfaces or networks with a common trust level, used to define firewall policy."
   ]
  ],
  "example": "An administrator adds an ACL to block one troublesome host: 'deny host 10.1.1.50'. Immediately, the whole subnet loses access, because the implicit deny blocks everything else. Adding 'permit ip any any' after the deny line restores access for everyone except 10.1.1.50.",
  "tip": "ACLs are processed top-down, first match wins, and every list ends with an implicit deny. A list containing only deny statements blocks everything. Public servers go in the screened subnet (DMZ), not the internal network.",
  "check": [
   [
    "Why must specific ACL rules be placed above general ones?",
    "Because processing stops at the first match, so a general rule above would match first and the specific rule would never be used."
   ],
   [
    "What happens to traffic that matches no rule in an ACL?",
    "It is dropped by the implicit deny."
   ],
   [
    "Where should a company place its public web server?",
    "In a screened subnet (DMZ), separated from the internal network by firewall rules."
   ]
  ]
 },
 {
  "t": "The seven-step troubleshooting methodology and its order",
  "body": [
   "CompTIA's troubleshooting methodology is a structured way to solve problems so you do not jump to conclusions, make things worse or fix the symptom but not the cause. The exam tests the steps and, above all, their order, often by describing what a technician did and asking what should come next.",
   "Step 1: Identify the problem. Gather information from users, logs, monitoring and error messages; question users about what they see and when it started; identify symptoms; determine whether anything has changed recently, since changes cause many problems; duplicate the problem if possible; and approach multiple problems individually rather than as one. If the issue is large, check whether others are affected, which helps define the scope.",
   "Step 2: Establish a theory of probable cause. Question the obvious first: is it plugged in, powered on, in the right VLAN? Consider multiple approaches: top-to-bottom or bottom-to-top through the OSI model, or divide and conquer, where you start in the middle, such as by pinging the gateway, and work toward the half that fails.",
   "Step 3: Test the theory to determine the cause. If the theory is confirmed, determine the next steps to resolve the problem. If it is not confirmed, establish a new theory or escalate to someone with more knowledge or access.",
   "Step 4: Establish a plan of action to resolve the problem and identify potential effects. A fix can have side effects, such as rebooting a core switch or changing a firewall rule, so consider the impact, follow change management and schedule a maintenance window if needed. Step 5: Implement the solution or escalate as necessary. Step 6: Verify full system functionality and, if applicable, implement preventive measures. Confirm with the user that everything works, not just the one symptom, and take steps so it does not happen again, such as adding monitoring or updating a template. Step 7: Document findings, actions, outcomes and lessons learned, typically in the ticketing system or knowledge base, so the next person solves it faster.",
   "A few patterns help with scenario questions. If a technician has just identified the cause, the next step is to establish a plan of action. If a fix has just been applied, the next step is to verify full functionality. Documentation is always last, and it happens even if you escalated. Gathering information and checking for recent changes come before forming theories. And testing a theory is not the same as fixing the problem: you confirm the cause before you change anything significant."
  ],
  "terms": [
   [
    "Theory of probable cause",
    "A hypothesis about what is causing the problem, formed from the gathered information."
   ],
   [
    "Divide and conquer",
    "A troubleshooting approach that starts in the middle of the OSI model or path and narrows toward the failing half."
   ],
   [
    "Escalation",
    "Passing a problem to someone with more expertise, authority or access when you cannot resolve it."
   ],
   [
    "Preventive measures",
    "Actions taken after a fix to stop the problem recurring, such as monitoring or configuration changes."
   ]
  ],
  "example": "A user cannot print. The technician asks questions and learns the printer was moved yesterday (identify the problem, recent change). She suspects the new wall jack is in the wrong VLAN (theory), checks the switch and confirms it (test). She plans to change the port VLAN with no side effects (plan), changes it (implement), prints a test page from several PCs (verify) and updates the cable map and ticket (document).",
  "tip": "Learn the order: identify, theorize, test, plan, implement, verify, document. When asked 'what next?', find the step just completed and pick the following one. Documentation is always the final step.",
  "check": [
   [
    "A technician confirms a failed power supply caused the outage. What is the next step?",
    "Establish a plan of action to resolve the problem and identify potential effects."
   ],
   [
    "What should happen if a theory is not confirmed during testing?",
    "Establish a new theory or escalate."
   ],
   [
    "Which step includes implementing preventive measures?",
    "Step 6, verify full system functionality and, if applicable, implement preventive measures."
   ]
  ]
 },
 {
  "t": "Cabling issues: wrong cable type, signal degradation, crosstalk, EMI, attenuation, improper termination, TX/RX transposed",
  "body": [
   "Physical layer problems are common and often mistaken for higher-layer faults. A cable problem can cause no link at all, a link that comes up at a lower speed, or a link that works but produces errors and slow performance. Knowing the symptoms of each cabling issue lets you pick the right fix and the right tool.",
   "Wrong cable type covers several mistakes. Using a lower category than the link needs, for example Cat 5e for a 10 Gbps run, may limit speed or cause errors. Using a straight-through cable where a crossover was needed matters only with old equipment lacking Auto-MDIX. Using multimode fibre with single-mode optics, or the reverse, and mixing up connector types or APC and UPC polishes, will cause loss or no link. A rollover (console) cable is not an Ethernet cable. Using non-plenum cable in plenum spaces is a safety and code violation rather than a performance problem, but it is still the wrong cable type.",
   "Signal degradation is the general weakening or distortion of a signal, and several specific causes are named. Attenuation is the natural loss of signal strength over distance; exceeding 100 metres on copper, or the rated distance on fibre, leads to errors or no link. Dirty or damaged fibre connectors and tight bends also add loss on fibre, so inspect and clean connectors. Electromagnetic interference (EMI) is noise induced from external sources such as motors, fluorescent lights, lift machinery, power cables and radio transmitters. Solutions include rerouting cables away from sources, crossing power cables at right angles, using shielded cable or switching to fibre, which is immune.",
   "Crosstalk is interference between wire pairs within the same cable (or adjacent cables). Near-end crosstalk (NEXT) is measured at the transmitting end, and far-end crosstalk (FEXT) at the other end. Crosstalk commonly comes from untwisting pairs too far at a termination, poor-quality cable or connectors, or cable categories not suitable for the speed. Keep the untwist to a minimum, about half an inch or 13 mm for Cat 5e and higher, when terminating.",
   "Improper termination means connectors or punch-downs were done wrong: wires in the wrong order (such as mixing T568A and B, or split pairs, where a wire from one pair is swapped with a wire from another), wires not fully seated in the RJ45, the jacket not crimped under the strain relief, or poor punch-downs on a patch panel. Symptoms range from no link to intermittent drops and lots of CRC errors. A cable tester reveals opens, shorts, miswires and split pairs.",
   "TX/RX transposed means transmit and receive are crossed incorrectly. On fibre, each duplex link has one strand for transmit and one for receive; if the strands are not crossed between the two ends, transmit meets transmit and the link will not come up. The fix is to swap the strands (roll the pair) at one end. On copper this was the straight-through vs crossover issue, now mostly solved by Auto-MDIX.",
   "Use the right tool for each symptom: a cable tester for wiring faults, a certifier to prove a run meets category performance, a TDR or OTDR to find the distance to a break, and a light meter or visual fault locator for fibre."
  ],
  "terms": [
   [
    "Attenuation",
    "The loss of signal strength as it travels over distance through a medium."
   ],
   [
    "Crosstalk",
    "Unwanted signal coupling between adjacent wire pairs or cables."
   ],
   [
    "EMI",
    "Electromagnetic interference: noise induced in cabling from external electrical or radio sources."
   ],
   [
    "Split pair",
    "A wiring fault where wires from two different pairs are used together, breaking the twist and causing crosstalk."
   ],
   [
    "TX/RX reversal",
    "A fault where the transmit and receive paths are not correctly crossed, often on fibre, preventing a link."
   ]
  ],
  "example": "A new fibre link between two switches will not come up, even though both optics show the correct type and the fibre tests clean. The technician swaps the two strands of the duplex LC connector at one end, which crosses transmit to receive properly, and the link comes up immediately.",
  "tip": "Distance beyond spec = attenuation. Noise from motors or lights = EMI (fix with rerouting, shielding or fibre). Too much untwisting at the connector = crosstalk. Fibre link dead but everything else correct = try swapping TX/RX.",
  "check": [
   [
    "A copper run of 140 m to a warehouse office shows many errors. What is the likely cause?",
    "Attenuation from exceeding the 100 m Ethernet limit; add a switch or use fibre."
   ],
   [
    "What installation mistake commonly causes near-end crosstalk?",
    "Untwisting the wire pairs too much when terminating the connector."
   ],
   [
    "A cable runs alongside a large motor and has intermittent errors. Name two fixes.",
    "Reroute it away from the motor, use shielded cable or replace it with fibre."
   ]
  ]
 },
 {
  "t": "Interface issues: increasing CRC and runt/giant counters, port status, duplex and speed mismatches",
  "body": [
   "Network interfaces keep counters that describe their health, and reading them is one of the fastest ways to find a physical or configuration problem. On a Cisco-style switch you view them with `show interfaces` (or `show interface` on some platforms); on Linux, `ip -s link` or `ethtool -S` shows similar statistics. The key is not the absolute number but whether counters are increasing, so clear them or compare over time.",
   "CRC (cyclic redundancy check) errors mean frames arrived with a frame check sequence that did not match their contents, so the data was corrupted in transit. Increasing CRC errors usually point to Layer 1 problems: a damaged or poor-quality cable, bad termination, EMI, a failing transceiver or a dirty fibre connector. They are also the classic symptom on the full-duplex side of a duplex mismatch.",
   "Runts are frames smaller than the Ethernet minimum of 64 bytes. They are often fragments caused by collisions, typically from a duplex mismatch or a faulty NIC. Giants are frames larger than the maximum allowed size, 1518 bytes for standard Ethernet frames (1522 with an 802.1Q tag); they commonly appear when one device sends jumbo frames and the other end has not been configured for them, so check MTU settings. Other counters to know: input errors (a total that includes CRCs, runts and giants), output drops or discards (frames dropped because buffers or queues were full, indicating congestion rather than a cable fault), and collisions and late collisions, which should never appear on full-duplex links. Late collisions, occurring after the first 64 bytes, strongly suggest a duplex mismatch or an over-length cable.",
   "Port status tells you whether the interface is working at all, and output such as `GigabitEthernet0/1 is up, line protocol is up` has two parts. The first reflects Layer 1 (is there a signal); the second reflects Layer 2 (is the data link working). 'Administratively down' means someone shut it down with a command, so the fix is `no shutdown`. 'Down/down' usually means no physical link: an unplugged or broken cable, a dead device at the far end or mismatched optics. 'Up/down' means a physical signal exists but the data link failed, for example due to mismatched encapsulation or keepalive problems on WAN links. 'Err-disabled' means the switch shut the port because of a security or error condition, such as port security, BPDU guard or a detected loop.",
   "Speed and duplex mismatches are configuration problems that masquerade as cabling faults. If speeds do not match and autonegotiation is off on one side, the link usually will not come up at all. If duplex does not match, the link comes up but performs badly: the half-duplex side logs collisions and late collisions, and the full-duplex side logs CRC errors and runts. The fix is to set both sides to autonegotiate, or to hard-code both to the same values. Also check for a link that negotiated lower than expected, such as 100 Mbps instead of 1 Gbps, which often indicates a cable with a broken pair, because gigabit needs all four pairs."
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
    "Late collision",
    "A collision detected after the first 64 bytes of a frame, typical of duplex mismatch or excessive cable length."
   ],
   [
    "Administratively down",
    "An interface state meaning it has been disabled by configuration."
   ]
  ],
  "example": "A server is slow. `show interfaces` on its switch port shows the port running full duplex with CRC errors and runts climbing, while the server's NIC statistics show late collisions. The NIC had been hard-coded to half duplex years ago. Setting both ends to auto clears the errors and throughput jumps.",
  "tip": "Rising CRCs: suspect cabling, EMI or optics first. Giants: MTU/jumbo mismatch. Runts plus late collisions: duplex mismatch. Output drops: congestion. 'Administratively down' is fixed with no shutdown.",
  "check": [
   [
    "An interface shows 'administratively down, line protocol down'. What is the fix?",
    "Enable it with the no shutdown command (after checking why it was disabled)."
   ],
   [
    "What does an increasing giant counter usually indicate?",
    "A mismatch where one side sends jumbo frames or a larger MTU than the other side accepts."
   ],
   [
    "A gigabit port negotiated only 100 Mbps. What should you suspect?",
    "A cable fault such as a broken pair, since gigabit needs all four pairs while 100 Mbps uses two."
   ]
  ]
 },
 {
  "t": "Hardware issues: PoE power budget exceeded, wrong PoE standard, transceiver mismatch, signal strength",
  "body": [
   "Some network problems come from the hardware itself: not enough power, incompatible modules or signals too weak to be understood. These issues often look like a device being dead or unstable, so knowing the patterns saves time.",
   "Power over Ethernet problems are very common now that access points, phones and cameras rely on it. A PoE switch has a total power budget. When the combined draw of connected devices exceeds it, the switch refuses to power additional ports or, depending on configuration, powers down lower-priority ports. Symptoms: some devices never power on, devices power on and then reboot when others start up, or everything works until more devices are added. Check with a command like `show power inline`, which lists the budget, power used and remaining, and each port's allocation. Fixes include moving devices to another switch, adding a power supply that raises the budget, setting port priorities so critical devices are powered first, or using PoE injectors.",
   "Wrong PoE standard means the device needs more power than the port can provide, or the two use incompatible methods. A device that requires PoE+ (802.3at, up to 30 W) connected to a port that supplies only 802.3af (15.4 W) may not power up at all, or may boot in a reduced-power mode, for example an access point that disables some radios or a camera that turns off its heater or pan-tilt motor. High-power devices may need 802.3bt. Some older or cheap devices use passive or proprietary PoE, which does not negotiate and can fail to work with, or even damage, standard equipment. Always compare the device's power requirement with the switch port's capability and check the class the switch detected.",
   "Transceiver mismatch occurs when the modules at each end of a link, or the module and the cable, are incompatible. Common causes: different speeds (a 1 Gbps SFP at one end and a 10 Gbps SFP+ at the other; some ports can run both, many cannot), different wavelengths (for example 850 nm short-range multimode optics facing 1310 nm long-range single-mode optics), multimode optics used on single-mode fibre, BiDi optics not paired with their matching counterpart, or a switch rejecting a third-party module that it does not support. Symptoms range from no link to a flapping link or high error counts. Check module details and diagnostics with commands such as `show interfaces transceiver`, which on many platforms displays temperature, voltage and transmit and receive optical power levels.",
   "Signal strength problems apply to both optics and wireless. For fibre, received light levels that are too low (from dirty connectors, excessive distance, bends or bad splices) cause errors; levels that are too high, for example long-range optics on a short patch cable, can overload the receiver unless an attenuator is used. For wireless, signal strength is measured in dBm, a negative number where closer to zero is stronger: around -30 dBm is excellent, around -67 dBm is a common minimum target for voice and reliable data, and around -80 dBm is poor. Weak signal causes low data rates, retransmissions and disconnections. Also watch signal-to-noise ratio, since a strong signal in a noisy environment still performs badly. Fixes include moving or adding access points, adjusting power and antennas, and removing obstructions."
  ],
  "terms": [
   [
    "Power budget",
    "The total PoE wattage a switch can deliver across its ports."
   ],
   [
    "Transceiver mismatch",
    "Incompatible optical or copper modules at each end of a link, such as differing speed, wavelength or fibre type."
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
  "example": "Several new security cameras on a switch keep rebooting at night. `show power inline` shows the switch near its budget during the day; at night the cameras turn on infrared illuminators and draw more power, pushing the total over the budget. Moving four cameras to a second PoE switch stops the reboots.",
  "tip": "Some PoE devices dead or rebooting = budget exceeded. One device boots with reduced features = wrong PoE class or standard. Fibre link errors with correct cabling = check both optics' speed, wavelength and fibre type, and read their optical power levels.",
  "check": [
   [
    "An 802.3at access point connected to an 802.3af switch boots with only one radio. Why?",
    "The port supplies only up to 15.4 W, less than the AP needs, so it runs in a reduced-power mode."
   ],
   [
    "Which is the stronger Wi-Fi signal, -55 dBm or -75 dBm?",
    "-55 dBm, because values closer to zero are stronger."
   ],
   [
    "Name two causes of a transceiver mismatch.",
    "Different speeds or wavelengths at each end, or multimode optics used with single-mode fibre (also unsupported third-party modules)."
   ]
  ]
 },
 {
  "t": "Switching issues: STP loops, incorrect VLAN assignment, ACLs",
  "body": [
   "Once the physical layer is sound, Layer 2 switching configuration becomes the next source of trouble. Network+ focuses on three issue types: spanning tree problems, VLAN mistakes and access control lists that block more or less than intended.",
   "Spanning tree issues cause some of the most dramatic outages. If STP is disabled, misconfigured or bypassed, a redundant path creates a switching loop. Symptoms appear quickly: the whole network or a large part slows to a crawl, broadcast traffic spikes, switch CPU utilisation is very high, link activity lights flash constantly, and logs show MAC addresses flapping between ports. Causes include someone connecting two wall jacks with a cable, an unmanaged switch that does not pass BPDUs, PortFast enabled on switch-to-switch links, or STP disabled to 'speed things up'. The immediate fix is to break the loop by disconnecting or shutting a link; the lasting fix is enabling STP (preferably RSTP), BPDU guard on edge ports and storm control. A subtler STP problem is a suboptimal root bridge: if an old access switch wins the election because nobody set priorities, traffic takes inefficient paths through it. Check with `show spanning-tree` and set the core switch's priority lower so it becomes root.",
   "Incorrect VLAN assignment is extremely common. If an access port is in the wrong VLAN, the device gets an address from the wrong DHCP scope, or an APIPA address if that VLAN has no DHCP, and cannot reach its resources. It may even appear to work but land on the guest network. Check with `show vlan brief` or `show interfaces switchport`. Trunk problems are the other half: if a VLAN is not in a trunk's allowed list, or does not exist on a switch along the path, hosts on that VLAN at a remote switch are isolated while others work. A native VLAN mismatch between trunk ends causes traffic to leak between VLANs and generates log warnings. A trunk mode mismatch, one side trunk and the other access, can stop all but one VLAN. Voice VLAN misconfiguration causes phones to boot into the data VLAN or fail to register.",
   "ACLs cause problems when they are too strict, too loose or applied in the wrong place. Classic mistakes: forgetting the implicit deny, so a list that only denies one host blocks everyone; placing a broad rule above a specific one so the specific one never matches; applying the list to the wrong interface or in the wrong direction (inbound vs outbound); using the wrong wildcard mask; or forgetting return traffic on a stateless filter. Symptoms are usually selective: some traffic or some hosts fail while others work, often immediately after a change. Check the list with `show access-lists`, where hit counters show which rules are matching, and review the change log.",
   "A good method for switching issues is to follow the path of a frame: is the host port up and in the right VLAN, does that VLAN exist on every switch, is it allowed on every trunk, is the gateway SVI up, and is any ACL in the path matching the traffic?"
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
    "Allowed VLAN list",
    "The set of VLANs permitted to cross a trunk link."
   ],
   [
    "Native VLAN mismatch",
    "A configuration where the two ends of a trunk use different untagged VLANs, causing traffic leakage."
   ]
  ],
  "example": "After a new switch is added in a remote wing, users there on VLAN 30 cannot get DHCP while VLAN 10 users are fine. `show interfaces trunk` on the uplink shows the allowed VLANs are 1, 10 and 20. Adding VLAN 30 to the trunk's allowed list fixes the problem.",
  "tip": "Network-wide slowdown with high CPU and MAC flapping = switching loop. One host with the wrong subnet or APIPA = wrong access VLAN. A whole VLAN failing at one remote switch = VLAN missing on the trunk. Selective failures right after a change = check ACL order and direction.",
  "check": [
   [
    "What are three symptoms of a switching loop?",
    "Broadcast storms and slow network, very high switch CPU and MAC address flapping in logs (also constantly flashing link lights)."
   ],
   [
    "Hosts on VLAN 40 at one switch cannot reach the gateway, but VLAN 40 hosts elsewhere can. What should you check?",
    "Whether VLAN 40 exists on that switch and is allowed on its trunk uplink."
   ],
   [
    "What does an ACL hit counter help you learn?",
    "Which rules are actually matching traffic, revealing misordered or unused rules."
   ]
  ]
 },
 {
  "t": "Routing issues: routing tables, default routes, address pool exhaustion, incorrect gateway, subnet mask or IP",
  "body": [
   "Routing issues show up when hosts can talk locally but not to other networks, or when some destinations work and others do not. Troubleshooting them means checking two places: the host's IP configuration and the routers' tables.",
   "Start with the host. The three settings that must be right are the IP address, the subnet mask and the default gateway (with DNS as a fourth, covered in the next lesson). An incorrect IP address, for example a static address from the wrong subnet, stops the host from reaching its gateway at all; it may still see traffic on the local segment but cannot communicate properly. An incorrect subnet mask makes the host miscalculate which addresses are local. If the mask is too large, the host thinks remote addresses are local and sends ARP requests for them instead of sending traffic to the gateway, so those destinations fail; if it is too small, the host thinks some local neighbours are remote and sends their traffic via the gateway, which may or may not work. An incorrect default gateway, such as a wrong address or one on a different subnet, means the host can reach its own subnet but nothing beyond. Check with `ipconfig /all` on Windows or `ip addr` and `ip route` on Linux, and test by pinging the loopback, your own IP, the gateway and then a remote host, in that order.",
   "Address pool exhaustion means no addresses are left to assign. For DHCP, new clients get no lease and fall back to APIPA 169.254.x.x addresses; existing clients keep working until their leases expire. For NAT, a dynamic pool of public addresses or a PAT port space can run out, so some outbound connections fail while others succeed. Fixes include shortening lease times, enlarging the scope or subnet (for example /24 to /23), adding a scope, cleaning up stale leases, using PAT instead of a dynamic pool, or adding public addresses.",
   "Then check the routers. A routing table must contain a route to each destination network, either directly connected, static or learned dynamically. Missing routes cause 'destination unreachable' messages or timeouts; a route that points to the wrong next hop sends traffic into a black hole. Routing loops, where two routers keep sending packets back and forth, show up in `traceroute` as the same pair of addresses repeating until TTL expires. Asymmetric routing, where traffic returns by a different path, can break stateful firewalls. Use `show ip route` to inspect the table, `traceroute` or `tracert` to see where the path stops, and check routing protocol neighbour relationships.",
   "The default route (0.0.0.0/0) is the gateway of last resort. If an edge router lacks one, internal traffic works but internet access fails. If the default route points to the wrong ISP next hop, or a static default route remains after the primary link fails, traffic is lost. A floating static default with a higher administrative distance, or a dynamic default learned from the ISP, provides failover.",
   "Remember that routing is two-way: a reply must also find a route back. If a new subnet is added but not advertised or routed on the return path, pings from it time out even though the outbound path is fine."
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
    "Routing loop",
    "A condition where packets circulate between routers until their TTL expires."
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
  "example": "A newly installed PC can reach local file servers but not the internet or other buildings. `ipconfig` shows IP 10.5.20.44/24 and gateway 10.5.21.1, which is on a different subnet. The technician corrects the gateway to 10.5.20.1 in the static configuration, and remote access works.",
  "tip": "Local works but remote fails: check gateway, then routes. Some remote subnets fail: check mask and routing tables. APIPA on new clients while old ones work: DHCP pool exhaustion. Repeating hops in traceroute: routing loop.",
  "check": [
   [
    "A host can ping everything on its subnet but nothing beyond. What is the most likely misconfiguration?",
    "An incorrect or missing default gateway."
   ],
   [
    "What happens to existing and new DHCP clients when a scope is exhausted?",
    "Existing clients keep their leases until they expire; new clients get no lease and self-assign APIPA addresses."
   ],
   [
    "What does a traceroute showing the same two router addresses repeating indicate?",
    "A routing loop between those routers."
   ]
  ]
 },
 {
  "t": "Service issues: DHCP scope exhaustion, duplicate IPs, DNS failures, NTP issues",
  "body": [
   "Network services such as DHCP, DNS and NTP are invisible when they work and cause confusing symptoms when they fail. Users rarely say 'DNS is broken'; they say 'the internet is down' or 'I can't log in'. Learning each service's failure signature lets you go straight to the cause.",
   "DHCP scope exhaustion happens when every address in a scope is leased. New devices receive no offer and self-assign APIPA 169.254.x.x addresses (or have no IPv4 address at all on some systems), while devices that already hold leases continue to work. It is common on guest Wi-Fi with long lease times, after adding many devices, or during a DHCP starvation attack in which a malicious client requests addresses with fake MACs. Check the DHCP server's scope statistics. Fixes: shorten lease times on busy transient networks, expand the scope or subnet, remove stale leases or reservations and exclusions that are no longer needed, and use DHCP snooping rate limits to resist starvation. If clients on only one subnet get APIPA and the scope is not full, check the relay (IP helper) instead.",
   "Duplicate IP addresses occur when two devices use the same address, usually because someone assigned a static address inside a DHCP scope without an exclusion, two DHCP servers hand out overlapping ranges, or a device with a reservation was replaced. Symptoms are intermittent connectivity for both devices, as traffic goes to whichever one answered ARP most recently, and operating system warnings about an address conflict. Find the culprit by checking the ARP table (`arp -a`) for the MAC address that owns the IP, then look up that MAC in the switch's MAC address table to find its port. Prevent it with IPAM, exclusions for static ranges and DHCP conflict detection. A duplicate MAC address, rare but possible with virtual machines cloned carelessly, causes similar confusion.",
   "DNS failures typically let users reach resources by IP address but not by name, which is a quick test: if `ping 8.8.8.8` works but `ping example.com` fails, suspect DNS. Causes include a wrong or unreachable DNS server in the client's settings (often handed out by DHCP option 6), a DNS server that is down, a firewall blocking port 53, a missing or wrong record (for example an A record still pointing to an old server's IP), stale cached entries within the record's TTL, or a bad hosts file entry overriding DNS. Use `nslookup` or `dig` to query specific servers and compare answers, flush the client cache (`ipconfig /flushdns` on Windows), and check the hosts file. Internal names failing while internet names work often means the client uses a public resolver instead of the internal DNS server.",
   "NTP issues cause clock drift, and incorrect time breaks surprising things. Kerberos authentication fails when clock skew exceeds its tolerance (five minutes by default), so users cannot log on to the domain. Certificates appear expired or not yet valid, so TLS connections fail. Log timestamps from different devices do not line up, making incidents impossible to reconstruct, and scheduled jobs run at the wrong time. Causes include an unreachable NTP server, UDP 123 blocked by a firewall, a wrong time zone setting (which is not the same as wrong time), or a device configured with no NTP at all. Check with `show ntp status`, `w32tm /query /status` on Windows or `timedatectl` on Linux, and confirm the device is synchronized to a reliable source."
  ],
  "terms": [
   [
    "Scope exhaustion",
    "A DHCP condition where all addresses in a scope are leased and new clients cannot obtain one."
   ],
   [
    "IP address conflict",
    "Two devices configured with the same IP address, causing intermittent connectivity for both."
   ],
   [
    "DHCP starvation",
    "An attack that requests many leases using spoofed MAC addresses to exhaust a DHCP scope."
   ],
   [
    "Clock skew",
    "The difference between clocks on two systems, which can break authentication and certificate validation."
   ]
  ],
  "example": "Users can reach web sites by IP but not by name. `ipconfig /all` shows the DNS server is 10.0.0.53, and `nslookup example.com 10.0.0.53` times out while `nslookup example.com 10.0.0.54` works. The primary DNS server's service has stopped; restarting it and adding both servers to the DHCP DNS option fixes the issue and adds resilience.",
  "tip": "Works by IP but not by name = DNS. New clients get APIPA while old ones work = scope exhaustion. Intermittent connectivity and conflict warnings = duplicate IP. Domain logins or certificates failing on one machine = check its time (NTP).",
  "check": [
   [
    "How can you quickly tell whether a connectivity complaint is really a DNS problem?",
    "Ping or connect to the resource by IP address; if that works but the name fails, DNS is the likely cause."
   ],
   [
    "How do you find which device is using a duplicate IP address?",
    "Check the ARP table for the MAC address associated with the IP, then find that MAC in the switch's MAC address table to locate the port."
   ],
   [
    "Why can wrong time on a workstation stop domain logins?",
    "Kerberos rejects authentication when clock skew exceeds its allowed tolerance."
   ]
  ]
 },
 {
  "t": "Performance issues: congestion, bottlenecks, bandwidth, latency, packet loss, jitter",
  "body": [
   "Performance problems are the hardest complaints to pin down because the network is not down, just slow. Users say 'it's laggy' or 'calls keep breaking up'. Translating those complaints into measurable terms is the first step, and the objectives give you the vocabulary.",
   "Bandwidth is the maximum data rate a link can carry, such as 1 Gbps. Throughput is what you actually achieve, which is always lower because of overhead, errors and contention. Congestion occurs when more traffic is offered to a link or device than it can carry; queues fill and packets wait or are dropped. A bottleneck is the point in the path with the lowest capacity, and it limits end-to-end performance no matter how fast the rest is: ten gigabit switches do not help if the WAN link is 100 Mbps, or if a server's disk or CPU cannot keep up. Common bottlenecks are WAN and internet links, uplinks where many access ports aggregate (oversubscription), overloaded firewalls or VPN concentrators, and underpowered Wi-Fi.",
   "Latency is the time data takes to travel from source to destination, usually measured as round-trip time in milliseconds with `ping`. It comes from propagation delay (distance, including the long trip to geostationary satellites), serialization onto the link, processing in devices and, most variably, queuing in congested buffers. High latency hurts interactive applications and chatty protocols that need many round trips. Jitter is the variation in latency from packet to packet. Real-time voice and video suffer more from jitter than from steady latency, because packets arriving irregularly cause choppy or robotic audio; jitter buffers smooth small variations at the cost of a little extra delay. Packet loss means packets never arrive, due to congestion (full queues), errors on links, faulty hardware or wireless interference. TCP retransmits lost segments, which slows throughput; UDP applications like voice simply lose that data, causing gaps.",
   "As rough guidance often used for voice, one-way latency under about 150 ms, jitter under about 30 ms and packet loss under about 1 percent give acceptable call quality; exact targets vary by vendor and application, so use them as a sense of scale.",
   "To troubleshoot, measure rather than guess. Compare current utilization, latency, loss and jitter with your baseline. SNMP graphs show saturated interfaces; interface counters show output drops (congestion) and errors (physical problems); flow data shows which applications or hosts consume bandwidth; `ping` and `traceroute` or `pathping`/`mtr` show where along the path latency and loss begin; and `iperf` measures achievable throughput between two points. Remember that performance problems can also sit outside the network, in an overloaded server or application.",
   "Fixes depend on the cause: add capacity or upgrade the bottleneck link, use link aggregation, apply QoS so voice and video are prioritized, schedule backups and updates outside business hours, use caching or a CDN, correct duplex mismatches and cable faults that cause loss, and fix wireless interference."
  ],
  "terms": [
   [
    "Throughput",
    "The actual data rate achieved across a link or path, as opposed to its theoretical bandwidth."
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
    "Bottleneck",
    "The lowest-capacity point in a path that limits overall performance."
   ],
   [
    "Oversubscription",
    "Aggregating more potential traffic onto a link than it can carry at once."
   ]
  ],
  "example": "Remote staff complain that video calls break up every morning. Monitoring shows the branch's internet link at 100 percent from 9 to 10 am, and flow data shows cloud backup uploads starting at 9. Moving backups to overnight and adding QoS priority for video traffic removes the jitter and packet loss.",
  "tip": "Choppy or robotic voice points to jitter and packet loss; slow file transfers point to bandwidth, congestion or a bottleneck; delay on every interaction points to latency. QoS helps prioritize but does not create bandwidth.",
  "check": [
   [
    "What is the difference between latency and jitter?",
    "Latency is the delay itself; jitter is the variation in that delay between packets."
   ],
   [
    "A 10 Gbps LAN connects through a 200 Mbps internet link. What limits internet downloads?",
    "The 200 Mbps link, which is the bottleneck."
   ],
   [
    "Which interface counter suggests congestion rather than a cable fault?",
    "Output drops or discards, because queues were full; CRC errors point to physical faults instead."
   ]
  ]
 },
 {
  "t": "Wireless issues: interference, channel overlap, signal degradation, coverage gaps, client disassociation, roaming misconfiguration",
  "body": [
   "Wireless networks share airtime and are exposed to the physical environment, so they produce more varied problems than wired networks. Most wireless complaints come down to radio frequency (RF) conditions, channel planning or configuration consistency, and a Wi-Fi analyzer or survey tool is your main instrument.",
   "Interference is unwanted RF energy on the same frequencies. Non-Wi-Fi sources in 2.4 GHz include microwave ovens, Bluetooth devices, cordless phones, wireless cameras and baby monitors; neighbouring Wi-Fi networks are also a source. Interference raises the noise floor, lowering the signal-to-noise ratio, which forces lower data rates and more retransmissions. A spectrum analyzer shows non-Wi-Fi sources that a normal Wi-Fi scan cannot identify. Fixes include moving to 5 or 6 GHz, changing channels, relocating access points or removing the source.",
   "Channel overlap comes in two forms. Adjacent channel interference occurs when nearby access points use overlapping channels, such as 2.4 GHz channels 1 and 3, so their transmissions corrupt each other. Co-channel interference occurs when nearby access points share the same channel; they do not corrupt each other but must take turns, reducing capacity. Use only non-overlapping channels (1, 6 and 11 in 2.4 GHz), plan channel reuse so neighbours differ, use narrower channel widths in dense areas and reduce transmit power so cells do not overlap excessively.",
   "Signal degradation and coverage gaps are about signal strength. Walls, floors, metal, glass with coatings, water (including people and fish tanks) and distance all weaken signals; this is attenuation or absorption, and reflection off metal can cause multipath problems. Coverage gaps, or dead zones, are areas where signal falls below a usable level, such as about -67 dBm for voice-grade service. Symptoms include slow speeds and drops in particular spots. A site survey heat map reveals gaps; fixes are adding or moving access points, adjusting power and antenna types, or using mesh for hard-to-cable areas. Do not simply turn power to maximum everywhere: clients transmit at lower power than access points, and an AP heard from far away but unable to hear the client back causes problems.",
   "Client disassociation means clients are disconnected from the access point. Causes include weak signal, interference, power-saving settings on client drivers, outdated drivers, APs overloaded with too many clients, authentication problems (for example RADIUS timeouts or expired certificates in 802.1X) and deliberate deauthentication attacks from an attacker, which protected management frames (802.11w, required in WPA3) help prevent. Controller and AP logs usually record the reason code for each disassociation.",
   "Roaming misconfiguration breaks the handoff as users move. For seamless roaming, access points in the same ESS must use the same SSID, the same security settings and passphrase or 802.1X configuration, and map to the same VLAN (or the controller must handle it); otherwise clients drop, reauthenticate slowly or get a new IP address. Too much cell overlap makes 'sticky clients' cling to a distant AP instead of roaming, while too little overlap causes drop-outs between cells. Fast roaming features such as 802.11r and consistent controller settings help voice clients roam without breaking calls."
  ],
  "terms": [
   [
    "Noise floor",
    "The level of background RF energy; a higher noise floor reduces signal-to-noise ratio."
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
  "example": "Nurses' voice badges drop calls when walking between wards. A survey shows the ward APs are on different VLANs and one ward uses a different passphrase, so every move forces a full reauthentication and a new IP. Aligning the SSID, security and VLAN, and enabling fast roaming on the controller, lets calls survive the handoff.",
  "tip": "Many APs on overlapping 2.4 GHz channels = adjacent channel interference; same channel = co-channel interference. Drops in one area = coverage gap. Drops while walking = roaming configuration (SSID, security and VLAN must match). Non-Wi-Fi noise needs a spectrum analyzer.",
  "check": [
   [
    "Why might turning every access point to maximum power make performance worse?",
    "It increases co-channel interference and cell overlap, and clients may hear the AP but be unable to reach it at their lower power, causing sticky clients and poor roaming."
   ],
   [
    "Which tool identifies a microwave oven causing interference?",
    "A spectrum analyzer, which can see non-Wi-Fi RF sources."
   ],
   [
    "What must match across access points for clients to roam smoothly?",
    "The SSID, security settings and credentials, and VLAN or network mapping."
   ]
  ]
 },
 {
  "t": "Software tools: protocol analyzer, command line (ping, traceroute, nslookup, dig, tcpdump, netstat, arp, ip/ipconfig), nmap, LLDP/CDP, speed testers, iperf",
  "body": [
   "Software tools let you see what the network is doing, and Network+ expects you to choose the right one for a scenario and interpret basic output. Practise each in a lab; many questions describe output and ask what it means. Only scan or capture on networks you are authorized to test.",
   "A protocol analyzer (packet analyzer) such as Wireshark captures traffic and decodes every header and field, letting you examine the TCP handshake, DNS queries, DHCP exchanges, retransmissions and errors. tcpdump is the command-line equivalent on Linux and Unix, often used on servers without a GUI; for example `tcpdump -i eth0 port 53` shows DNS traffic, and saved captures can be opened later in Wireshark. Capture filters limit what is recorded; display filters narrow what you view.",
   "Basic connectivity tools come first. `ping` sends ICMP Echo Requests and reports replies and round-trip times, proving reachability and revealing latency and loss; a failure may mean the host is down, a route is missing or ICMP is filtered. `traceroute` (Linux and macOS) or `tracert` (Windows) lists each router hop by manipulating TTL, showing where a path stops or where delay begins; `pathping` on Windows and `mtr` on Linux combine both over time. `ipconfig` on Windows (with `/all`, `/release`, `/renew` and `/flushdns`) and `ip addr` and `ip route` on Linux (replacing older `ifconfig` and `route`) show addressing, gateway and DNS. `arp -a` displays the ARP cache of IP-to-MAC mappings, useful for duplicate IPs and spoofing. `netstat` shows active connections, listening ports and routing tables (`netstat -an`, or `ss -tuln` on modern Linux), which tells you whether a service is actually listening.",
   "DNS tools test name resolution directly. `nslookup` works on all platforms; `dig` on Linux and macOS gives more detailed output, including the answer section and TTLs. Both let you query a specific server and record type, such as `dig example.com MX` or `nslookup -type=ptr 10.1.1.20`, which helps separate client problems from server problems.",
   "`nmap` is a network scanner. It discovers live hosts, open ports, running services and versions, and can guess operating systems. Administrators use it for inventory, verifying firewall rules and hardening, and finding unauthorized services; but scanning networks without permission is prohibited by most policies and may be illegal. LLDP (Link Layer Discovery Protocol, the vendor-neutral standard) and CDP (Cisco Discovery Protocol) let directly connected devices advertise their identity, model, port and management address; commands such as `show lldp neighbors` or `show cdp neighbors` quickly reveal what is plugged into which port. Because they reveal information, they are often disabled on untrusted user ports.",
   "Speed testers measure throughput from a client to a test server, usually on the internet, giving a quick view of upload, download and latency. They are affected by the test server and the wider internet. `iperf` gives a controlled measurement: run `iperf3 -s` on one host as a server and `iperf3 -c <server>` on another as a client to measure throughput between two points you control, such as across a WAN link or wireless segment, isolating the network from internet variables."
  ],
  "terms": [
   [
    "Protocol analyzer",
    "Software that captures and decodes network traffic for detailed inspection, such as Wireshark."
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
    "LLDP",
    "Link Layer Discovery Protocol: a vendor-neutral protocol devices use to advertise identity and capabilities to neighbours."
   ],
   [
    "iperf",
    "A tool that measures maximum throughput between a client and a server you control."
   ]
  ],
  "example": "A new branch link is contracted at 500 Mbps but file copies seem slow. The engineer runs an iperf3 server at headquarters and a client at the branch and measures 480 Mbps, proving the link is fine. `netstat` and a Wireshark capture on the file server then reveal TCP retransmissions caused by a failing NIC on the server.",
  "tip": "Where does the path break? traceroute. Is the service listening? netstat. What is plugged into this port? LLDP/CDP. What ports are open on hosts? nmap. Name resolution? nslookup or dig. Throughput between two points you control? iperf.",
  "check": [
   [
    "Which tool would you use to see which switch and port a server is connected to?",
    "LLDP or CDP neighbor information, viewed from the switch or server."
   ],
   [
    "How does iperf differ from an internet speed test?",
    "iperf measures throughput between two endpoints you control, isolating a specific path; a speed test measures to an internet server affected by external factors."
   ],
   [
    "Which command shows the IP-to-MAC mappings a host has learned?",
    "arp -a."
   ]
  ]
 },
 {
  "t": "Hardware tools: toner and probe, cable tester, cable certifier, TDR/OTDR, loopback plug, Wi-Fi analyzer, visual fault locator",
  "body": [
   "When software tools point to Layer 1, you need hardware tools to find the fault. The exam gives a scenario and asks which tool fits, so learn each by what question it answers.",
   "A toner and probe (tone generator and probe) traces and identifies a cable. You attach the toner to one end of a cable, for example at a wall jack, and it puts a signal on the wire; at the patch panel or in the ceiling you move the inductive probe along cables until you hear the tone loudest, identifying the matching cable. It answers 'which cable is this?' and is indispensable in unlabelled wiring closets. It does not test cable quality.",
   "A cable tester checks basic wiring: continuity of each wire, opens, shorts, miswires, reversed pairs and often split pairs, usually with a remote unit at the other end. It answers 'is this cable wired correctly?'. A cable certifier goes much further, testing the cable against a category standard, such as Cat 6 or Cat 6a, by measuring attenuation (insertion loss), crosstalk, return loss, length and more at the relevant frequencies. It produces a pass or fail report that installers provide to prove a new installation meets specification. Certifiers are expensive, so use them for acceptance testing and hard intermittent faults, not every patch cord.",
   "A time domain reflectometer (TDR) sends a pulse down a copper cable and times reflections from faults such as breaks, shorts or impedance changes, reporting the distance to the fault. An optical time domain reflectometer (OTDR) does the same for fibre with light pulses, showing distance to breaks, bad splices, bends and connectors along a run that may be kilometres long. They answer 'where along the cable is the problem?'. Many cable testers and certifiers include TDR functions. For fibre, an optical power meter and light source also measure total loss on a link.",
   "A loopback plug connects a port's transmit to its receive, so the device hears its own signal. Plugging one into a NIC, switch port or serial port lets you test whether the port itself works, isolating it from the cable and the far-end device. Fibre loopbacks join the transmit and receive connectors of an optic.",
   "A Wi-Fi analyzer, which may be a laptop or phone app or a dedicated device, shows nearby SSIDs, BSSIDs, channels, channel widths, signal strength in dBm and often noise and security settings. Use it to choose channels, find overlap, validate coverage and spot rogue access points. A spectrum analyzer goes deeper, showing all RF energy including non-Wi-Fi interference.",
   "A visual fault locator (VFL) shines a bright visible red laser into a fibre. Where the fibre is broken or bent too sharply, red light leaks out and glows, and at the far end you can see whether light arrives, confirming continuity and polarity over short distances. It is for fibre only and finds faults within its limited range, commonly patch cords and short runs; for long runs use an OTDR. Never look directly into a fibre or optic that may carry invisible laser light."
  ],
  "terms": [
   [
    "Toner and probe",
    "A tool pair used to trace and identify a specific cable among many."
   ],
   [
    "Cable certifier",
    "A tester that verifies a cabling run meets a specific category's performance standards and produces a report."
   ],
   [
    "OTDR",
    "Optical time domain reflectometer: locates breaks, splices and losses along a fibre by timing reflected light."
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
  "example": "A fibre link between two buildings 2 km apart goes down after construction work. A light meter confirms no light arrives. The technician uses an OTDR, which shows a break about 740 m from the main building, near the construction trench, so the contractor knows exactly where to dig and splice.",
  "tip": "Which cable is it? Toner and probe. Is it wired right? Cable tester. Does it meet Cat 6 performance? Certifier. How far to the break? TDR (copper) or OTDR (fibre). Is the port itself good? Loopback plug. Where is a fibre patch cord broken? VFL.",
  "check": [
   [
    "Which tool proves a newly installed cable run meets Cat 6a specification?",
    "A cable certifier."
   ],
   [
    "You need to find the distance to a break in a long fibre run. Which tool?",
    "An OTDR (optical time domain reflectometer)."
   ],
   [
    "How does a loopback plug help isolate a problem?",
    "It tests the port by itself, removing the cable and remote device from the equation."
   ]
  ]
 },
 {
  "t": "Basic device commands: show mac-address-table, show route, show interface, show config, show arp, show vlan, show power",
  "body": [
   "Network+ includes a set of generic device commands modelled on common switch and router command-line interfaces. Exact syntax varies between vendors (for example `show ip route` on Cisco IOS or `show route` elsewhere, and `show mac address-table` with or without a hyphen), but the exam focuses on what each command shows and when to use it. Practise them in a simulator or lab and learn to read the output.",
   "`show mac-address-table` (often `show mac address-table`) lists the MAC addresses a switch has learned, with their VLAN and port. Use it to find where a device is connected, trace a duplicate IP to a port after finding the MAC with `arp`, or spot problems: many MACs on a user port suggest an unauthorized switch, and a MAC moving between ports suggests a loop. `show route` (or `show ip route`) displays the routing table: connected, static and dynamic routes, their next hops, administrative distances and metrics, and the gateway of last resort. Use it when traffic to some networks fails.",
   "`show interface` (or `show interfaces`) gives detailed status and statistics for each interface: up/down state, line protocol, speed, duplex, MTU, input and output rates, and error counters such as CRC, runts, giants, collisions and drops. It is the first place to look for physical and duplex problems. Brief versions such as `show ip interface brief` or `show interfaces status` summarize all ports on one screen.",
   "`show config` covers viewing configurations: `show running-config` shows the active configuration in memory, and `show startup-config` shows what will load after a reboot. Comparing them reveals unsaved changes. Reviewing the config lets you confirm VLAN assignments, ACLs, trunk settings, NTP and AAA settings, and compare against the golden config.",
   "`show arp` (or `show ip arp`) displays the device's ARP table, mapping IP addresses to MAC addresses on connected networks, typically on a router or Layer 3 switch. Together with the MAC address table it lets you go from an IP address to a physical switch port. `show vlan` (often `show vlan brief`) lists VLANs configured on the switch with their names, status and assigned access ports. Use it when a device lands in the wrong subnet or a VLAN appears missing; note that trunk ports are not listed there, so use `show interfaces trunk` for those.",
   "`show power` (often `show power inline`) displays PoE status: the total power budget, how much is used and remaining, and for each port whether power is on, which class was detected and how many watts are allocated. Use it when phones, cameras or access points will not power up or keep rebooting.",
   "```text\nSwitch# show mac address-table\nVlan  Mac Address       Type     Ports\n----  ----------------- -------  -----\n  10  0050.56a1.2b3c    DYNAMIC  Gi1/0/5\n  20  0011.2233.4455    DYNAMIC  Gi1/0/12\n```"
  ],
  "terms": [
   [
    "MAC address table",
    "The switch table mapping learned MAC addresses to ports and VLANs."
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
   ]
  ],
  "example": "A duplicate IP alert names 10.1.20.33. On the core switch, `show arp` shows the IP maps to MAC 0011.2233.4455. `show mac address-table` finds that MAC on port Gi1/0/12 of an access switch in VLAN 20, and `show interface` on that port shows it connects to a printer someone configured with a static address inside the DHCP scope.",
  "tip": "Where is this MAC plugged in? show mac-address-table. What IP belongs to which MAC? show arp. Why can't we reach that network? show route. Errors or duplex? show interface. Wrong VLAN? show vlan. PoE device dead? show power. Unsaved changes? compare running and startup config.",
  "check": [
   [
    "Which two commands let you trace an IP address to a physical switch port?",
    "show arp to find the MAC address for the IP, then show mac-address-table to find the port for that MAC."
   ],
   [
    "A camera will not power on. Which command checks the switch's PoE budget and port allocation?",
    "show power (show power inline)."
   ],
   [
    "How can you find out whether a switch has configuration changes that would be lost on reboot?",
    "Compare the running configuration with the startup configuration using show config commands."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
