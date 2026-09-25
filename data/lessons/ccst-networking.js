/* Lessons for Cisco Certified Support Technician (CCST) Networking (100-150 v1.0): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ccst-networking", [
 {
  "t": "The TCP/IP and OSI models: layer names, what each layer does and where devices and protocols fit",
  "body": [
   "Networking models split the job of moving data into layers, so each layer only has to solve one problem and can rely on the layer below it. The two models you need are the OSI (Open Systems Interconnection) reference model, which has seven layers, and the TCP/IP model, which is the model the internet actually runs on. Technicians use layer numbers as shorthand every day: 'it is a Layer 1 problem' means a cable, port or signal issue, not a software setting.",
   "The OSI layers from bottom to top are: 1 Physical (bits as electrical, light or radio signals; cables, connectors, hubs), 2 Data Link (frames and MAC addresses on the local network; switches and network interface cards), 3 Network (packets and IP addresses, choosing paths between networks; routers), 4 Transport (segments, ports and end-to-end delivery; TCP and UDP), 5 Session (setting up and tearing down conversations), 6 Presentation (formatting, encoding, compression and encryption), and 7 Application (the network services programs use, such as HTTP, DNS and SMTP). A common memory aid from Layer 1 upward is 'Please Do Not Throw Sausage Pizza Away'.",
   "The TCP/IP model groups these into four layers: Link (also called Network Access, covering OSI 1 and 2), Internet (OSI 3, where IP and ICMP live), Transport (OSI 4, TCP and UDP) and Application (OSI 5 to 7 combined). Some textbooks, including Cisco material, show an updated five-layer TCP/IP model that splits Link back into Physical and Data Link. Either way, the ideas line up: the numbers people say out loud almost always refer to OSI layers.",
   "Knowing where devices sit is heavily tested. A hub or repeater only regenerates signals, so it is Layer 1. A switch reads destination MAC addresses to forward frames, so it is Layer 2. A router reads destination IP addresses to forward packets between networks, so it is Layer 3. A multilayer (Layer 3) switch does both. Firewalls commonly work at Layers 3 and 4, and next-generation firewalls can inspect up to Layer 7. Protocols fit the same way: Ethernet and Wi-Fi at 1 and 2, IP at 3, TCP and UDP at 4, and HTTP, DNS, DHCP, FTP and SSH at the application layer.",
   "In a lab, open any packet in Wireshark and you will see the layers stacked in the details pane: a Frame line, then Ethernet II (Layer 2), Internet Protocol (Layer 3), Transmission Control Protocol or User Datagram Protocol (Layer 4) and finally the application data such as HTTP or TLS. Troubleshooting also follows the layers: check the link light and cable first, then addressing, then ports and services."
  ],
  "terms": [
   [
    "OSI model",
    "A seven-layer reference model (Physical, Data Link, Network, Transport, Session, Presentation, Application) used to describe and troubleshoot networking."
   ],
   [
    "TCP/IP model",
    "The four-layer model (Link, Internet, Transport, Application) that describes how internet protocols are actually organized."
   ],
   [
    "Layer 2 device",
    "A device, such as a switch, that forwards frames based on MAC addresses within a local network."
   ],
   [
    "Layer 3 device",
    "A device, such as a router, that forwards packets between networks based on IP addresses."
   ]
  ],
  "example": "A user reports no network access. You notice the port light on the wall jack's switch port is off, so you tell your team it looks like a Layer 1 problem and replace the patch cable before touching any IP settings. The link light comes on and the user is back online.",
  "tip": "Match devices to layers: hub = 1, switch = 2, router = 3. Also remember that the TCP/IP Application layer covers OSI Layers 5, 6 and 7, and the TCP/IP Link layer covers OSI Layers 1 and 2.",
  "check": [
   [
    "At which OSI layer do routers make forwarding decisions, and what address do they use?",
    "Layer 3, the Network layer, using the destination IP address."
   ],
   [
    "Which OSI layers does the TCP/IP Application layer combine?",
    "Session (5), Presentation (6) and Application (7)."
   ],
   [
    "Where do TCP and UDP sit in both models?",
    "At the Transport layer, which is Layer 4 in OSI and also called Transport in the TCP/IP model."
   ]
  ]
 },
 {
  "t": "Encapsulation: data, segments, packets, frames and bits; MAC addresses vs IP addresses",
  "body": [
   "Encapsulation is how each layer wraps the data it receives from the layer above with its own header (and sometimes a trailer) before handing it down. On the receiving side the process runs in reverse, called de-encapsulation: each layer reads and removes its own header and passes the rest up. This is why a packet capture shows nested sections, each belonging to one layer.",
   "Each stage has a name, called a PDU (protocol data unit). At the application layers it is simply data. The Transport layer adds a TCP or UDP header with source and destination port numbers, and the result is a segment (with UDP, often called a datagram). The Network layer adds an IP header with source and destination IP addresses, making a packet. The Data Link layer adds a header with source and destination MAC addresses plus a trailer containing a Frame Check Sequence used to detect errors, making a frame. The Physical layer transmits the frame as bits: voltages on copper, pulses of light on fiber or radio waves in Wi-Fi. A memory aid is 'Do Some People Fear Birthdays': data, segment, packet, frame, bits.",
   "The two kinds of address in that stack do different jobs. A MAC (Media Access Control) address is a 48-bit hardware address burned into a network interface, written as 12 hexadecimal digits such as `00:1A:2B:3C:4D:5E` or `001a.2b3c.4d5e` on Cisco devices. The first half usually identifies the manufacturer. MAC addresses only matter on the local network segment; switches use them to deliver frames to the right port. An IP address is a logical address assigned by configuration or DHCP, and it identifies both the network and the host, so routers can move packets across many networks to the final destination.",
   "Here is the key behavior the exam likes: as a packet crosses routers, the source and destination IP addresses stay the same end to end (unless NAT changes them), but the MAC addresses are rewritten at every hop. Each router strips the incoming frame, looks at the IP header, and builds a new frame addressed from its own outgoing interface MAC to the next device's MAC. To learn the MAC address that belongs to a local IP address, IPv4 hosts use ARP (Address Resolution Protocol); IPv6 uses Neighbor Discovery.",
   "You can see both addresses yourself. On Windows, `ipconfig /all` shows the Physical Address (MAC) and the IPv4 address; on Linux, `ip addr` shows `link/ether` and `inet` lines. `arp -a` lists the IP-to-MAC mappings your computer has learned."
  ],
  "terms": [
   [
    "Encapsulation",
    "Adding a layer's header (and trailer) to data as it moves down the stack before transmission."
   ],
   [
    "PDU",
    "Protocol data unit, the name for data at a given layer: data, segment, packet, frame or bits."
   ],
   [
    "MAC address",
    "A 48-bit hardware address used to deliver frames on the local network segment."
   ],
   [
    "IP address",
    "A logical address that identifies a host and its network, used by routers to forward packets between networks."
   ],
   [
    "ARP",
    "Address Resolution Protocol, which finds the MAC address that matches a known IPv4 address on the local network."
   ]
  ],
  "example": "Your laptop at 192.168.1.20 loads a web page from a server on the internet. The frame leaving your laptop is addressed to your home router's MAC address, but the packet inside is addressed to the web server's IP address. At the router, the frame is replaced with a new one for the next link, while the IP destination stays the same.",
  "tip": "If a question asks which address changes at every router hop, the answer is the MAC address. The IP addresses stay the same end to end unless NAT is involved.",
  "check": [
   [
    "What is the PDU at the Transport layer, and what key information does its header add?",
    "A segment, whose TCP or UDP header adds source and destination port numbers."
   ],
   [
    "When a frame is sent to a server on another network, whose MAC address is the destination?",
    "The default gateway's (router's) MAC address, because MAC addresses only reach the next hop on the local network."
   ]
  ]
 },
 {
  "t": "Bandwidth vs throughput; latency, delay and jitter; speed tests vs iperf",
  "body": [
   "Users say 'the network is slow', but slowness can mean several different measurements. Bandwidth is the maximum data rate a link can carry, such as a 1 Gbps Ethernet port or a 500 Mbps internet plan. Throughput is the rate you actually achieve in practice, which is always lower because of protocol overhead, congestion, errors, retransmissions, wireless conditions and the slowest link along the path. A useful picture is a highway: bandwidth is the number of lanes, throughput is how many cars actually get through per minute.",
   "Rates are measured in bits per second (bps, Kbps, Mbps, Gbps). File sizes are usually shown in bytes, and one byte is eight bits, so a 100 Mbps connection moves at most about 12.5 megabytes per second. Watch for the lowercase b (bits) versus uppercase B (bytes).",
   "Latency is how long it takes data to travel from one point to another, usually measured in milliseconds. Ping reports round-trip time (RTT), the time for a request to reach the target and the reply to come back. Delay is the general term for time added along the path: propagation delay from distance, serialization delay from putting bits on the wire, processing delay in devices and queuing delay when links are busy. Jitter is the variation in delay between packets. If one packet takes 20 ms and the next takes 90 ms, jitter is high even if the average looks fine.",
   "Different applications care about different measurements. Large downloads mostly need throughput. Voice and video calls need low latency and especially low jitter, because packets arriving unevenly cause choppy audio and frozen video; they can tolerate a small amount of loss better than long waits. Online games are sensitive to latency. Quality of Service (QoS) settings on network devices exist largely to protect latency- and jitter-sensitive traffic.",
   "An internet speed test in a browser measures download, upload and latency between your device and a test server somewhere on the internet. It tells you roughly how your internet connection performs, but the result depends on the server chosen, Wi-Fi quality and other traffic. `iperf` (current version `iperf3`) is a command-line tool you run on two machines you control: one as a server with `iperf3 -s` and one as a client with `iperf3 -c <server-ip>`. It measures throughput between exactly those two points, which makes it ideal for testing your internal LAN, a Wi-Fi link or a specific WAN path without the internet in the way."
  ],
  "terms": [
   [
    "Bandwidth",
    "The maximum theoretical data rate of a link, measured in bits per second."
   ],
   [
    "Throughput",
    "The actual data rate achieved in practice, always at or below bandwidth."
   ],
   [
    "Latency",
    "The time it takes data to travel across the network, often measured as round-trip time in milliseconds."
   ],
   [
    "Jitter",
    "Variation in latency from packet to packet, which harms real-time voice and video."
   ],
   [
    "iperf3",
    "A client/server tool that measures throughput between two hosts you control."
   ]
  ],
  "example": "A small office pays for a 300 Mbps internet plan, but a browser speed test on a laptop shows 90 Mbps. Running iperf3 between two wired PCs shows about 940 Mbps across the gigabit LAN, and the same speed test from a wired PC shows about 290 Mbps. The internet link is fine; the laptop's Wi-Fi is the bottleneck.",
  "tip": "Choppy voice or video calls with an otherwise fast connection usually point to jitter or latency, not bandwidth. And iperf tests between two points you choose, while a speed test measures your path to an internet server.",
  "check": [
   [
    "Why is throughput lower than bandwidth?",
    "Because overhead, congestion, errors, retransmissions and slower links along the path reduce the data rate actually achieved."
   ],
   [
    "What does jitter measure, and which applications suffer most from it?",
    "The variation in packet delay; real-time voice and video suffer most."
   ],
   [
    "You want to test the speed of a new Wi-Fi access point without the internet affecting the result. Which tool fits?",
    "iperf3, run between a wired server on the LAN and a wireless client."
   ]
  ]
 },
 {
  "t": "Network types: LAN, WAN, MAN, CAN, PAN and WLAN",
  "body": [
   "Networks are often described by the size of the area they cover and who owns the links. The categories are not strict technical boundaries, but exam questions expect you to recognize the right term from a short description.",
   "A PAN (personal area network) connects devices around one person, typically within a few meters: a phone to wireless earbuds, a smartwatch or a car over Bluetooth, or a laptop to a phone by USB tethering. A LAN (local area network) connects devices in a single home, office or floor, usually with Ethernet switches, and is owned and managed by the organization using it. LANs offer high speeds and low latency. A WLAN (wireless LAN) is a LAN whose clients connect over Wi-Fi (IEEE 802.11) through access points; in most offices the WLAN and the wired LAN are part of the same network.",
   "A CAN (campus area network) links several LANs across buildings that belong to one organization and sit close together, such as a university, hospital or corporate campus. The organization usually owns the cabling between buildings, often fiber. A MAN (metropolitan area network) spans a city or metropolitan region, for example linking a city government's offices or a provider's network across town. MAN links are often supplied by a service provider or municipal fiber.",
   "A WAN (wide area network) connects networks over large geographic distances, such as branch offices in different cities or countries. Organizations rarely own WAN links; they lease them from service providers or use the internet with VPNs over it. The internet itself is the largest WAN. Compared with LANs, WAN links traditionally cost more per unit of bandwidth and have higher latency.",
   "Two quick ways to classify a scenario: first, ask how big the area is (person, room or building, group of nearby buildings, city, beyond); second, ask who owns the links. If the organization owns everything, it is likely a LAN or CAN; if a provider is involved and distances are large, it is a MAN or WAN. Also remember that the medium does not change the size category except for WLAN, which specifically names wireless access to a LAN.",
   "In practice, a single company uses several of these at once: employees' headsets form PANs, each floor is a LAN with a WLAN, the headquarters buildings form a CAN, and branch offices join over a WAN."
  ],
  "terms": [
   [
    "LAN",
    "Local area network: devices in one building or site connected by switches and owned by the organization."
   ],
   [
    "WAN",
    "Wide area network: links between distant sites, usually leased from service providers; the internet is the largest WAN."
   ],
   [
    "CAN",
    "Campus area network: multiple LANs across nearby buildings of one organization."
   ],
   [
    "MAN",
    "Metropolitan area network: a network spanning a city or metro region."
   ],
   [
    "PAN",
    "Personal area network: devices around one person, such as Bluetooth earbuds and a phone."
   ],
   [
    "WLAN",
    "Wireless LAN: a local network whose clients connect using Wi-Fi."
   ]
  ],
  "example": "A college connects its library, dorms and science building with fiber it owns, links to a downtown research center over a provider's metro Ethernet service, and students pair Bluetooth keyboards with tablets. Those are a CAN, a MAN link and PANs.",
  "tip": "Look for clues about area and ownership. 'Multiple buildings on one site' means CAN, 'across a city' means MAN, 'between cities or countries' means WAN, and 'Bluetooth around a person' means PAN.",
  "check": [
   [
    "A company connects offices in Chicago and Denver. What type of network link is this?",
    "A WAN, because it spans a large geographic distance and is usually leased from a provider."
   ],
   [
    "Which network type describes a smartwatch paired to a phone?",
    "A PAN (personal area network)."
   ]
  ]
 },
 {
  "t": "Cloud vs on-premises: public, private and hybrid cloud; SaaS, PaaS and IaaS",
  "body": [
   "On-premises (on-prem) means the organization owns and runs the servers, storage and networking in its own building or data center. It controls everything, but it must also buy the hardware up front, power and cool it, patch it and replace it. Cloud computing means using computing resources delivered over a network on demand, typically paid for as you use them, and able to scale up or down quickly.",
   "Cloud deployment models describe who uses the infrastructure. A public cloud is run by a provider and shared by many customers (tenants), each isolated from the others; you rent resources over the internet. A private cloud gives one organization cloud-style self-service and automation on infrastructure dedicated to it, either in its own data center or hosted by a provider. A hybrid cloud combines on-premises or private cloud with public cloud, connected so that workloads and data can move between them. Many organizations are hybrid: for example, keeping a sensitive database on-prem while running a web front end in a public cloud. You may also see community cloud (shared by organizations with common needs) and multicloud (using more than one public provider).",
   "Cloud service models describe how much the provider manages. With IaaS (Infrastructure as a Service), the provider supplies virtual machines, storage and networks; you install and manage the operating system and applications. With PaaS (Platform as a Service), the provider also manages the operating system and runtime, and you just deploy your code and data. With SaaS (Software as a Service), you simply use a finished application through a browser or app, such as web email, online office suites or a customer relationship management system; the provider manages everything underneath.",
   "The shared responsibility idea ties these together: the further you move from IaaS toward SaaS, the more the provider handles and the less you do. But the customer is always responsible for its own data, user accounts and access settings. A misconfigured sharing setting in a SaaS app is still the customer's problem.",
   "For support technicians, the model changes troubleshooting. A problem with an on-prem file server might be fixed in the server room. A problem with a SaaS app usually means checking the user's internet connection, DNS, sign-in and the provider's status page, then contacting the provider if the service itself is down."
  ],
  "terms": [
   [
    "On-premises",
    "Infrastructure the organization owns and operates in its own facilities."
   ],
   [
    "Hybrid cloud",
    "A combination of on-premises or private cloud with public cloud, connected so workloads can span both."
   ],
   [
    "IaaS",
    "Infrastructure as a Service: rented virtual machines, storage and networks; the customer manages the OS and apps."
   ],
   [
    "PaaS",
    "Platform as a Service: the provider manages the OS and runtime; the customer deploys code and data."
   ],
   [
    "SaaS",
    "Software as a Service: a complete application delivered over the network and managed by the provider."
   ]
  ],
  "example": "A dental practice replaces its on-prem email server with a hosted email service (SaaS), runs its patient booking website on a cloud provider's managed web platform (PaaS), and keeps its imaging server on-premises because of equipment integration. Overall, it now uses a hybrid approach.",
  "tip": "Ask 'who manages the operating system?' If the customer does, it is IaaS. If the provider does but the customer writes the code, it is PaaS. If the customer only uses the app, it is SaaS.",
  "check": [
   [
    "Which service model gives you virtual machines where you install your own operating system?",
    "IaaS."
   ],
   [
    "What is a hybrid cloud?",
    "A deployment that combines on-premises or private cloud resources with public cloud resources, connected and used together."
   ]
  ]
 },
 {
  "t": "How cloud and hybrid work change where apps run and how users reach them (VPN, internet access)",
  "body": [
   "Traditionally, applications ran on servers in the company's own data center and employees worked in the office on the same LAN. Traffic stayed inside, and the firewall at the internet edge was the main boundary. Two changes have reshaped that picture: applications moved to the cloud, and users started working from home, hotels and coffee shops. As a support technician you need to know which path a user's traffic takes, because that tells you where to look when something breaks.",
   "When an app is SaaS or hosted in a public cloud, users reach it over the internet, usually with HTTPS. An office user's traffic goes through the office firewall and internet connection; a home user goes straight out through the home router and internet provider. The internet connection has become as important as the LAN. If the office internet link is down, cloud apps fail for everyone in the office even though the local network is fine.",
   "Some resources are still internal: an on-prem file server, a printer, an internal web app. Remote users reach these through a VPN (virtual private network). A VPN creates an encrypted tunnel across the internet between the user's device and a VPN gateway or firewall at the company. A remote-access VPN usually requires a client application on the laptop; a site-to-site VPN connects whole networks, such as a branch office to headquarters, using routers or firewalls at each end, so users do not need to do anything.",
   "VPNs can be configured in two ways that affect troubleshooting. With full tunnel, all traffic, including internet browsing and SaaS, goes through the company first, which lets the company inspect it but adds load and latency. With split tunnel, only traffic for company networks goes through the VPN, and other internet traffic goes directly out the home connection. A user who can reach cloud email but not the internal file share may have a VPN problem; a user who can reach nothing may have a home internet or Wi-Fi problem.",
   "Hybrid environments also connect the data center to the cloud with site-to-site VPNs or dedicated private links from a provider, so cloud-hosted apps can reach on-prem databases. Many organizations add identity-based controls, such as MFA and checks on device health, so access decisions depend on who the user is and what device they are using rather than only on where they are connected. For you, a good first question in any ticket is: where does this app live, and how is this user trying to reach it?"
  ],
  "terms": [
   [
    "VPN",
    "Virtual private network: an encrypted tunnel across an untrusted network such as the internet."
   ],
   [
    "Remote-access VPN",
    "A VPN from one user's device, usually running a client app, to a company VPN gateway."
   ],
   [
    "Site-to-site VPN",
    "A VPN between two networks' routers or firewalls, so every device at each site can communicate."
   ],
   [
    "Split tunnel",
    "A VPN setting that sends only company-bound traffic through the tunnel and other traffic directly to the internet."
   ]
  ],
  "example": "A remote employee can open web email and the online office suite but cannot reach the accounting server at head office. Her internet works, so you check the VPN client and find it disconnected after a password change. Once she signs in again, the internal server is reachable through the tunnel.",
  "tip": "Internal resources for remote users need a VPN (or a similar secure access service); public SaaS apps just need working internet access. Use that split to narrow down which part of the path is failing.",
  "check": [
   [
    "What is the difference between full tunnel and split tunnel VPN?",
    "Full tunnel sends all traffic through the VPN to the company; split tunnel sends only company-bound traffic through the VPN and the rest directly to the internet."
   ],
   [
    "An office loses its internet connection but the LAN works. Which apps fail?",
    "Cloud and SaaS apps and anything on the internet; local on-prem servers and printers keep working."
   ]
  ]
 },
 {
  "t": "TCP vs UDP: connection-oriented vs connectionless, the three-way handshake, when each is used",
  "body": [
   "TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are the two main Transport layer protocols. Both use port numbers so a host can tell which application a segment belongs to, but they make very different promises about delivery.",
   "TCP is connection-oriented and reliable. Before sending data, the two hosts set up a connection with a three-way handshake. The client sends a segment with the SYN (synchronize) flag and a starting sequence number. The server replies with SYN-ACK, acknowledging the client's number and sending its own. The client finishes with ACK. After that, TCP numbers every byte it sends, the receiver acknowledges what arrived, and anything not acknowledged in time is retransmitted. TCP also reorders data that arrives out of sequence and uses flow control (the window) so a fast sender does not overwhelm a slow receiver. When finished, the hosts close the connection with FIN and ACK segments, or abruptly with RST (reset).",
   "UDP is connectionless and best-effort. There is no handshake, no acknowledgments, no retransmission and no ordering. The UDP header is only 8 bytes, compared with at least 20 bytes for TCP, so UDP is lightweight and fast. If an application needs reliability on top of UDP, the application must build it itself.",
   "Choose by what the application values. TCP suits anything where every byte must arrive correctly: web browsing (HTTP and HTTPS), email (SMTP, IMAP, POP3), file transfer (FTP, SFTP) and remote login (SSH, Telnet). UDP suits real-time and simple request/response traffic where speed matters more than perfect delivery, or where a lost message is simply resent: voice and video calls, live streaming and games, DNS queries, DHCP, TFTP, NTP and SNMP. A late voice packet is useless, so retransmitting it would only add delay. DNS uses UDP for normal queries but switches to TCP for large responses and zone transfers.",
   "In Wireshark you can watch a handshake: filter on `tcp.flags.syn == 1` and you will see SYN and SYN-ACK pairs at the start of each connection. On a computer, `netstat -an` on Windows or `ss -tuna` on Linux lists connections with TCP states such as LISTEN, ESTABLISHED and TIME_WAIT; UDP entries have no state because there is no connection."
  ],
  "terms": [
   [
    "TCP",
    "Transmission Control Protocol: connection-oriented, reliable, ordered delivery with acknowledgments and retransmission."
   ],
   [
    "UDP",
    "User Datagram Protocol: connectionless, best-effort delivery with minimal overhead and no retransmission."
   ],
   [
    "Three-way handshake",
    "The SYN, SYN-ACK, ACK exchange TCP uses to open a connection."
   ],
   [
    "Flow control",
    "TCP's windowing mechanism that limits how much data a sender transmits before receiving acknowledgment."
   ]
  ],
  "example": "During a video meeting the picture briefly pixelates when Wi-Fi drops a few packets, but the call continues; that is UDP carrying media without retransmission. Meanwhile, a file you upload in the chat arrives intact because it travels over TCP, which resends any missing pieces.",
  "tip": "Order matters: SYN, SYN-ACK, ACK. And if a question emphasizes 'reliable, ordered, acknowledged', pick TCP; 'low overhead, real-time, no handshake', pick UDP.",
  "check": [
   [
    "What are the three segments of the TCP handshake, in order?",
    "SYN from the client, SYN-ACK from the server, and ACK from the client."
   ],
   [
    "Why do voice calls usually use UDP instead of TCP?",
    "Retransmitting late voice packets would add delay and they would arrive too late to be useful, so low overhead and speed matter more than reliability."
   ],
   [
    "Name two common protocols that use UDP.",
    "Examples include DNS queries, DHCP, TFTP and NTP."
   ]
  ]
 },
 {
  "t": "Common protocols and ports: FTP 20/21, SFTP/SSH 22, TFTP 69, HTTP 80, HTTPS 443, DNS 53, DHCP 67/68, NTP 123",
  "body": [
   "A port number is a 16-bit value (0 to 65535) in the TCP or UDP header that tells the receiving host which application or service should get the data. Servers listen on well-known ports (0 to 1023) so clients know where to connect, while the client picks a temporary high-numbered source port for each conversation. An IP address plus a port, such as 192.168.1.10:443, is called a socket. Firewalls and troubleshooting both depend on knowing which ports a service uses, so memorize this list.",
   "FTP (File Transfer Protocol) uses TCP 21 for the control connection (logging in and sending commands) and TCP 20 for data in active mode. FTP sends usernames, passwords and files in clear text, so it should be avoided on untrusted networks. SSH (Secure Shell) uses TCP 22 to provide encrypted remote command-line access to servers and network devices. SFTP (SSH File Transfer Protocol) runs inside SSH on the same port 22, giving encrypted file transfer. Do not confuse SFTP with FTPS, which is FTP secured with TLS. TFTP (Trivial File Transfer Protocol) uses UDP 69; it has no authentication and no directory listing, and is used on trusted networks for simple jobs such as copying configuration files or operating system images to and from network devices and booting devices over the network.",
   "HTTP (Hypertext Transfer Protocol) uses TCP 80 for web traffic in clear text. HTTPS is HTTP protected by TLS (Transport Layer Security) and uses TCP 443; it encrypts the traffic and lets the browser verify the server's certificate. Most web and SaaS traffic today is HTTPS.",
   "DNS (Domain Name System) uses port 53, over UDP for normal lookups and TCP for large responses and zone transfers between DNS servers. It translates names like www.example.com into IP addresses. DHCP (Dynamic Host Configuration Protocol) uses UDP 67 on the server and UDP 68 on the client. It automatically gives a device its IP address, subnet mask, default gateway and DNS servers through four messages: Discover, Offer, Request and Acknowledge (DORA). NTP (Network Time Protocol) uses UDP 123 to keep device clocks synchronized, which matters for log timestamps, certificates and authentication systems.",
   "To see ports in use on a computer, run `netstat -an` on Windows or `ss -tuln` on Linux; listening services show in the LISTEN state. In Wireshark, a display filter such as `tcp.port == 443` or `udp.port == 53` isolates one service."
  ],
  "terms": [
   [
    "Port number",
    "A 16-bit number in the TCP or UDP header that identifies the application or service on a host."
   ],
   [
    "Well-known ports",
    "Ports 0 to 1023, reserved for standard services such as HTTP (80) and HTTPS (443)."
   ],
   [
    "Socket",
    "The combination of an IP address, transport protocol and port that identifies one end of a conversation."
   ],
   [
    "DORA",
    "The four DHCP messages: Discover, Offer, Request, Acknowledge."
   ],
   [
    "SFTP",
    "SSH File Transfer Protocol, encrypted file transfer running over SSH on TCP 22."
   ]
  ],
  "example": "Users can browse websites by IP address but not by name. You check the firewall change log and find that a new rule blocked outbound UDP 53. Restoring DNS traffic to the company's DNS servers fixes name resolution for everyone.",
  "tip": "Know the transport too: DHCP, TFTP, NTP and normal DNS queries use UDP; FTP, SSH/SFTP, HTTP and HTTPS use TCP. SFTP shares port 22 with SSH, not port 21 with FTP.",
  "check": [
   [
    "Which ports does DHCP use, and over which transport?",
    "UDP 67 for the server and UDP 68 for the client."
   ],
   [
    "Why is SSH preferred over Telnet and SFTP over FTP?",
    "SSH and SFTP encrypt credentials and data, while Telnet and FTP send them in clear text."
   ],
   [
    "Which protocol uses UDP 69 and has no authentication?",
    "TFTP, the Trivial File Transfer Protocol."
   ]
  ]
 },
 {
  "t": "ICMP and what ping uses it for",
  "body": [
   "ICMP (Internet Control Message Protocol) is a helper protocol at the Network layer that carries error and diagnostic messages about IP delivery. It does not carry user data and does not use port numbers; instead, each message has a type and a code. Routers and hosts send ICMP messages to report problems such as an unreachable destination, and administrators use ICMP to test reachability. IPv6 has its own version, ICMPv6, which also handles Neighbor Discovery and router advertisements, so it is essential there rather than optional.",
   "`ping` is the most common tool built on ICMP. It sends ICMP Echo Request messages (type 8) to a target, and a reachable host that is allowed to answer sends back Echo Reply messages (type 0). For each reply, ping shows the round-trip time in milliseconds and the TTL (Time to Live) of the reply. At the end it summarizes packets sent, received and lost, plus minimum, average and maximum times. Windows sends four pings by default; Linux and macOS keep going until you press Ctrl+C unless you add `-c 4`.",
   "Other ICMP messages you will meet include Destination Unreachable (type 3), which has codes for network unreachable, host unreachable, port unreachable and 'administratively prohibited' when a filter blocks traffic; and Time Exceeded (type 11), sent when a packet's TTL reaches zero at a router. Traceroute relies on Time Exceeded messages to discover each router hop along a path. Redirect messages tell a host there is a better gateway.",
   "Reading ping output is a core skill. 'Reply from 8.8.8.8: bytes=32 time=14ms TTL=117' means success. 'Request timed out' means no reply arrived in time; the host could be down, a route could be missing, or a firewall could be dropping ICMP. 'Destination host unreachable' reported by your own gateway or PC means there is no route or no ARP response on the local segment. 'TTL expired in transit' can indicate a routing loop. Consistent timeouts to one address but normal replies to others help you locate the failure.",
   "A good troubleshooting sequence is to ping outward in steps: your own loopback (127.0.0.1) to test the IP stack, your own IP address, your default gateway, a remote IP address such as a public DNS server, and finally a name such as example.com to test DNS. The first step that fails tells you where to look. Remember, though, that many hosts and firewalls block ICMP, so a failed ping alone does not prove a service is down."
  ],
  "terms": [
   [
    "ICMP",
    "Internet Control Message Protocol, a Network layer protocol for error reporting and diagnostics."
   ],
   [
    "Echo Request / Echo Reply",
    "ICMP types 8 and 0, the messages ping sends and receives."
   ],
   [
    "Destination Unreachable",
    "ICMP type 3, reporting that a packet could not be delivered, with a code that gives the reason."
   ],
   [
    "Time Exceeded",
    "ICMP type 11, sent when a packet's TTL reaches zero; traceroute depends on it."
   ]
  ],
  "example": "A user cannot reach the internet. Pinging 127.0.0.1 and the PC's own address works, pinging the gateway 192.168.10.1 works, but pinging 8.8.8.8 times out. The problem is beyond the local network, so you check the router's WAN link and find the provider's circuit is down.",
  "tip": "ICMP has no ports. If an answer choice says 'ping uses TCP or UDP port X', it is wrong. Also, 'Request timed out' does not prove a host is off; a firewall may simply be dropping ICMP.",
  "check": [
   [
    "Which ICMP messages does ping send and receive?",
    "It sends Echo Request (type 8) and expects Echo Reply (type 0)."
   ],
   [
    "What does pinging 127.0.0.1 test?",
    "That the local TCP/IP stack is working on the computer itself, without using the network."
   ]
  ]
 },
 {
  "t": "Private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) vs public addresses",
  "body": [
   "IPv4 addresses are 32 bits long, which gives only about 4.3 billion possible addresses, far fewer than the number of devices online. To stretch that supply, RFC 1918 set aside three ranges as private addresses. Anyone may use them inside their own network without asking permission, and many organizations reuse the same ranges. Internet routers do not route private addresses, so traffic from them must be translated (NAT) to a public address before it reaches the internet.",
   "The three private ranges are: 10.0.0.0/8, which covers 10.0.0.0 to 10.255.255.255 (a single very large block, popular in enterprises); 172.16.0.0/12, which covers 172.16.0.0 to 172.31.255.255 (note it stops at 172.31, not 172.255); and 192.168.0.0/16, which covers 192.168.0.0 to 192.168.255.255 (the usual choice for home routers, such as 192.168.0.x or 192.168.1.x).",
   "Public addresses are every other normal unicast address. They are globally unique and routable on the internet, assigned through regional internet registries to internet providers and organizations. Your home router's WAN interface usually gets a public address from your internet provider (though some providers use carrier-grade NAT, placing you behind another shared address), while your devices at home get private addresses from the router's DHCP server.",
   "Being able to spot private addresses quickly is useful in troubleshooting. If `ipconfig` shows 192.168.1.25, your computer is on a private LAN behind NAT, and websites see your router's public address instead. If a server's address is 172.20.5.10, it is private and cannot be reached directly from the internet. A common trap is 172.32.0.1 or 172.15.0.1: both are public because they fall outside 172.16 to 172.31.",
   "Private addressing also has security and design benefits. Internal devices are not directly addressable from the internet, which reduces exposure (though NAT is not a replacement for a firewall). Organizations have plenty of room to design subnets, and they can change internet providers without renumbering internal hosts. The trade-off is that two companies using the same private range can conflict if their networks are connected, for example after a merger or over a site-to-site VPN."
  ],
  "terms": [
   [
    "Private address",
    "An IPv4 address from the RFC 1918 ranges, usable inside any organization but not routed on the internet."
   ],
   [
    "Public address",
    "A globally unique, internet-routable IP address assigned through registries and providers."
   ],
   [
    "RFC 1918",
    "The standard that defines the private IPv4 ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
   ],
   [
    "Carrier-grade NAT",
    "Provider-level NAT that places many customers behind shared public addresses."
   ]
  ],
  "example": "A technician sees that a laptop has 172.24.8.50 at the office and 192.168.0.14 at home. Both are private addresses. When the user checks a 'what is my IP' website from home, it shows a completely different public address belonging to their internet provider.",
  "tip": "The 172 range is the one people miss: only 172.16.x.x through 172.31.x.x are private. Any address outside the three ranges (and outside special ranges like 127 and 169.254) is public.",
  "check": [
   [
    "Is 172.30.1.1 private or public? What about 172.33.1.1?",
    "172.30.1.1 is private (within 172.16.0.0/12); 172.33.1.1 is public."
   ],
   [
    "Why can't a device with a private address browse the internet without NAT?",
    "Internet routers do not route private addresses, so replies could never return; NAT swaps in a public address."
   ]
  ]
 },
 {
  "t": "NAT and PAT: how a home router shares one public address",
  "body": [
   "NAT (Network Address Translation) is a function on a router or firewall that rewrites IP addresses in packets as they cross between an inside network and an outside network. Its main job is letting devices with private addresses communicate on the internet using public addresses. In NAT terminology, the inside local address is the host's private address and the inside global address is the public address it is translated to.",
   "There are several forms. Static NAT maps one private address permanently to one public address, which is useful when a server inside must be reachable from outside. Dynamic NAT maps private addresses to public addresses from a pool, first come, first served; if the pool runs out, additional hosts cannot connect. PAT (Port Address Translation), also called NAT overload, maps many private addresses to a single public address by also translating port numbers. PAT is what nearly every home and small office router does.",
   "Here is how PAT works. Your laptop at 192.168.1.20 opens a web connection from source port 51000 to a server on port 443. The router replaces the source address with its public WAN address, say 203.0.113.5, and may change the source port to a unique value, say 62001. It records the mapping in its translation table: 192.168.1.20:51000 is 203.0.113.5:62001. When the reply comes back to 203.0.113.5:62001, the router looks up the table, rewrites the destination back to 192.168.1.20:51000 and forwards it to the laptop. Because each conversation gets a unique port, thousands of inside connections can share one public address.",
   "A side effect is that unsolicited inbound connections have no matching entry, so the router drops them. That is why hosting a game server or camera at home needs port forwarding, a static rule telling the router to send inbound traffic on a certain port to a specific inside host. Port forwarding deliberately exposes that device, so it should be used carefully. NAT hides internal addressing but is not a security control by itself; a firewall policy is still needed.",
   "On Cisco routers you will see interfaces marked with `ip nat inside` and `ip nat outside`, and `show ip nat translations` lists active mappings. On a home router, the NAT table is usually hidden, but the port forwarding page is where you create inbound rules."
  ],
  "terms": [
   [
    "NAT",
    "Network Address Translation: rewriting IP addresses as packets cross a router, typically private to public."
   ],
   [
    "PAT",
    "Port Address Translation (NAT overload): many inside hosts share one public address, distinguished by port numbers."
   ],
   [
    "Static NAT",
    "A fixed one-to-one mapping between a private and a public address."
   ],
   [
    "Port forwarding",
    "A static rule that sends inbound traffic on a specific public port to a chosen inside host."
   ],
   [
    "Translation table",
    "The router's list of active mappings between inside addresses/ports and outside addresses/ports."
   ]
  ],
  "example": "A family has a phone, two laptops, a TV and a game console all online at once with one public address from their provider. The router's PAT table tracks every connection by port, so replies from streaming services and websites always return to the right device.",
  "tip": "'Many to one using ports' is PAT (NAT overload). 'One to one, permanent' is static NAT. 'Many to many from a pool' is dynamic NAT.",
  "check": [
   [
    "How does a PAT router know which inside device a reply belongs to?",
    "It looks up the destination port of the reply in its translation table, which maps each outside port to an inside address and port."
   ],
   [
    "Why does an inside web server need static NAT or port forwarding to be reached from the internet?",
    "Without a pre-configured mapping, inbound connections have no translation entry and the router drops them."
   ]
  ]
 },
 {
  "t": "Special IPv4 addresses: loopback 127.0.0.1, APIPA 169.254.x.x, broadcast",
  "body": [
   "Some IPv4 addresses are reserved for special jobs. Recognizing them on sight is one of the fastest ways to diagnose a problem from a single `ipconfig` output.",
   "The loopback range is 127.0.0.0/8, and the address you will use is 127.0.0.1, also known by the name localhost. Traffic sent to it never leaves the computer; the operating system loops it straight back. Pinging 127.0.0.1 tests whether the local TCP/IP software is working, and developers use it to reach services running on the same machine. A successful loopback ping says nothing about the network card or cable. In IPv6 the loopback address is ::1.",
   "APIPA (Automatic Private IP Addressing) uses the link-local range 169.254.0.0/16. When a Windows computer, and most other systems, is set to get an address automatically but cannot reach a DHCP server, it assigns itself a random address such as 169.254.37.112 with mask 255.255.0.0. It checks with ARP that no one else is using it. Devices with APIPA addresses can talk only to other devices on the same link that also have 169.254 addresses; there is no default gateway, so there is no internet access. The key lesson: a 169.254.x.x address means DHCP failed. Check the cable or Wi-Fi association, the switch port and VLAN, and whether the DHCP server or router is working. Running `ipconfig /release` and `ipconfig /renew` after fixing the cause should obtain a proper address.",
   "A broadcast address reaches every host on a network segment. The limited broadcast 255.255.255.255 goes to all hosts on the local network and is never forwarded by routers; a DHCP Discover is sent this way because the client does not yet know its own network. A directed broadcast is the last address in a subnet, with all host bits set to 1, such as 192.168.1.255 for 192.168.1.0/24. Because the network address (all host bits 0) and the broadcast address (all host bits 1) are reserved, you cannot assign them to hosts. Routers separate broadcast domains, which keeps broadcasts from flooding an entire organization.",
   "Two more to recognize: 0.0.0.0 means 'this host, no address yet' or, in a routing table, 'any address' (0.0.0.0/0 is the default route). Multicast addresses, 224.0.0.0 to 239.255.255.255, deliver one stream to a group of interested hosts."
  ],
  "terms": [
   [
    "Loopback",
    "The 127.0.0.0/8 range (usually 127.0.0.1) that sends traffic back to the same host to test the local IP stack."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing: a self-assigned 169.254.x.x address used when DHCP fails."
   ],
   [
    "Limited broadcast",
    "255.255.255.255, sent to all hosts on the local segment and never routed."
   ],
   [
    "Directed broadcast",
    "The last address in a subnet (all host bits 1), which reaches all hosts in that subnet."
   ]
  ],
  "example": "A printer suddenly shows 169.254.88.3 on its status page and nobody can print. The switch port was moved to the wrong VLAN during a rewiring job, so the printer could not reach DHCP. After the port is corrected and the printer renews, it gets its usual 10.10.20.x address.",
  "tip": "169.254.x.x in a question almost always means 'the host could not reach a DHCP server'. Do not confuse it with a private RFC 1918 address.",
  "check": [
   [
    "What does a 169.254.x.x address on a PC tell you?",
    "The PC is set for DHCP but could not reach a DHCP server, so it assigned itself an APIPA address."
   ],
   [
    "What is the broadcast address of 192.168.5.0/24?",
    "192.168.5.255, the address with all host bits set to 1."
   ]
  ]
 },
 {
  "t": "IPv4 format: dotted decimal, subnet masks and slash (CIDR) notation",
  "body": [
   "An IPv4 address is 32 bits. To make it readable, the bits are split into four 8-bit groups called octets, each written as a decimal number from 0 to 255 and separated by dots. This is dotted decimal notation, for example 192.168.10.25. Converting one octet to binary is a skill you need: the bit values from left to right are 128, 64, 32, 16, 8, 4, 2 and 1. So 192 is 11000000 (128 + 64), and 25 is 00011001 (16 + 8 + 1).",
   "Every address has two parts: the network portion, shared by all hosts on the same subnet, and the host portion, unique to each device. The subnet mask tells you where the split is. It is also 32 bits: 1s mark network bits and 0s mark host bits, and the 1s are always contiguous from the left. The mask 255.255.255.0 is 24 ones followed by 8 zeros, so the first three octets are the network and the last octet is the host.",
   "CIDR (Classless Inter-Domain Routing) notation writes the mask as a slash and the number of 1 bits: 192.168.10.25/24 is the same as mask 255.255.255.0. Common equivalents to memorize: /8 is 255.0.0.0, /16 is 255.255.0.0, /24 is 255.255.255.0, /25 is 255.255.255.128, /26 is 255.255.255.192, /27 is 255.255.255.224, /28 is 255.255.255.240, /29 is 255.255.255.248 and /30 is 255.255.255.252. The only valid values for a mask octet are 0, 128, 192, 224, 240, 248, 252, 254 and 255, because the 1s must be contiguous. A mask like 255.255.0.255 is invalid.",
   "Older material talks about classes: Class A (first octet 1 to 126, default /8), Class B (128 to 191, default /16) and Class C (192 to 223, default /24), with Class D for multicast and Class E reserved. Modern networks are classless, meaning any prefix length can be used, but you may still see the class names used to describe default masks.",
   "In practice, you see masks in `ipconfig` output ('Subnet Mask . . . : 255.255.255.0'), in Linux `ip addr` output as a slash ('inet 192.168.10.25/24') and in Cisco configuration as `ip address 192.168.10.1 255.255.255.0`. Being fluent with both formats lets you move between tools quickly."
  ],
  "terms": [
   [
    "Octet",
    "One 8-bit group of an IPv4 address, written as a decimal number from 0 to 255."
   ],
   [
    "Subnet mask",
    "A 32-bit value whose 1 bits mark the network portion of an address and 0 bits mark the host portion."
   ],
   [
    "CIDR notation",
    "Writing the mask as a slash followed by the number of network bits, such as /24."
   ],
   [
    "Prefix length",
    "The number of network bits in an address, the number after the slash."
   ]
  ],
  "example": "A switch's configuration shows `ip address 10.1.50.2 255.255.255.192`. On the network diagram, the same subnet is labeled 10.1.50.0/26. You recognize that 255.255.255.192 has 26 one bits, so both describe the same subnet.",
  "tip": "Know the mask octet values cold: 128, 192, 224, 240, 248, 252, 254, 255, which add 1, 2, 3, 4, 5, 6, 7 and 8 bits. For example, /27 is 24 + 3, so the last octet is 224.",
  "check": [
   [
    "What dotted decimal mask matches /28?",
    "255.255.255.240."
   ],
   [
    "Is 255.255.255.100 a valid subnet mask? Why?",
    "No. 100 in binary is 01100100, which does not have contiguous 1 bits from the left."
   ]
  ]
 },
 {
  "t": "Network address, broadcast address, usable host range and host count for common masks",
  "body": [
   "For any IPv4 subnet you should be able to find four things: the network address (the first address, identifying the subnet itself), the broadcast address (the last address), the usable host range (everything in between) and the number of usable hosts. The network and broadcast addresses cannot be assigned to devices.",
   "The host count comes from the number of host bits, which is 32 minus the prefix length. The total number of addresses is 2 to the power of the host bits, and the usable hosts are that number minus 2. So /24 has 8 host bits, 256 addresses and 254 usable hosts. /25 has 128 addresses and 126 hosts; /26 has 64 and 62; /27 has 32 and 30; /28 has 16 and 14; /29 has 8 and 6; /30 has 4 and 2, which is why /30 is common on point-to-point router links. At the other end, /16 has 65,536 addresses and 65,534 usable hosts.",
   "A quick method for masks that end in the last octet is the block size: 256 minus the mask's last octet. For /26 the mask ends in 192, so the block size is 64, and subnets start at 0, 64, 128 and 192. To find the subnet for 192.168.1.100/26, find the block containing 100: it falls in 64 to 127. So the network address is 192.168.1.64, the broadcast address is 192.168.1.127, the usable range is 192.168.1.65 to 192.168.1.126 and there are 62 usable hosts.",
   "Try another: 10.0.0.37/29. The mask ends in 248, so the block size is 8 and subnets start at 0, 8, 16, 24, 32, 40 and so on. 37 falls in the 32 to 39 block. The network is 10.0.0.32, broadcast 10.0.0.39, usable hosts 10.0.0.33 to 10.0.0.38, six in total. For a /24, it is simpler: 172.16.5.200/24 has network 172.16.5.0, broadcast 172.16.5.255 and usable range .1 to .254.",
   "The default gateway is normally one of the usable addresses, often the first (.1) or the last usable. When a device is configured with its own network or broadcast address, or a gateway outside its subnet, it will not communicate properly. Practice these calculations until you can do /24 through /30 in your head; exam questions often give an address and ask which host range, broadcast or host count is correct."
  ],
  "terms": [
   [
    "Network address",
    "The first address in a subnet, with all host bits 0; it identifies the subnet and cannot be assigned to a host."
   ],
   [
    "Broadcast address",
    "The last address in a subnet, with all host bits 1; it reaches all hosts in the subnet."
   ],
   [
    "Usable host range",
    "The addresses between the network and broadcast addresses that can be assigned to devices."
   ],
   [
    "Block size",
    "256 minus the last non-255 mask octet; the spacing between subnet boundaries."
   ]
  ],
  "example": "A small branch needs a subnet for 25 devices. A /27 gives 30 usable hosts, enough with room to grow, while a /28 gives only 14. The team assigns 192.168.50.32/27: hosts .33 to .62, gateway .33 and broadcast .63.",
  "tip": "Usable hosts = 2^(host bits) minus 2. Remember the table: /24 254, /25 126, /26 62, /27 30, /28 14, /29 6, /30 2.",
  "check": [
   [
    "What are the network and broadcast addresses for 192.168.1.130/25?",
    "Network 192.168.1.128 and broadcast 192.168.1.255; usable hosts are .129 to .254."
   ],
   [
    "How many usable hosts does a /28 provide?",
    "14 (16 addresses minus the network and broadcast addresses)."
   ],
   [
    "Can 10.0.0.39/29 be assigned to a host?",
    "No. It is the broadcast address of the 10.0.0.32/29 subnet."
   ]
  ]
 },
 {
  "t": "Using a subnet calculator and checking whether two hosts are on the same subnet",
  "body": [
   "Whether two devices are on the same subnet decides how they talk. If they share a subnet, the sender delivers frames directly using ARP to find the other device's MAC address. If they are on different subnets, the sender must hand the packet to its default gateway. A mask typo that puts a host in the wrong subnet causes confusing, one-sided failures, so checking this quickly is a practical help desk skill.",
   "The rule is simple: two hosts are on the same subnet if they have the same network address after applying the mask. The computer does this with a bitwise AND: each address bit is ANDed with the mask bit, which keeps network bits and zeroes out host bits. You can do the same by hand with the block size method. For example, 192.168.1.60/26 and 192.168.1.70/26: the block size is 64, so .60 is in the .0 to .63 subnet and .70 is in the .64 to .127 subnet. Different subnets, even though the first three octets match. By contrast, 192.168.1.60/24 and 192.168.1.70/24 share the network 192.168.1.0 and are on the same subnet.",
   "A subnet calculator is any tool, web page, phone app or command-line utility, where you enter an address and mask (or prefix length) and it shows the network address, broadcast address, first and last usable host, number of hosts, mask in both formats and often the binary view. On Linux, the `ipcalc` utility does this in a terminal, for example `ipcalc 10.4.7.19/21`. Calculators are excellent for checking your work and for large or odd prefixes such as /21 or /19, where the boundary falls in the third octet.",
   "Still, you need to understand the output rather than just read it. Check three things when a device misbehaves: that its mask matches the rest of the subnet, that its address is inside the usable range (not the network or broadcast address), and that its default gateway is in the same subnet as the device. A gateway outside the host's subnet cannot be reached directly, so the host will fail to reach any remote network.",
   "Also watch for mismatched masks. If PC A is 10.1.1.10/24 and PC B is 10.1.1.200/25, A thinks B is local, but B calculates that A (in .0 to .127) is on a different subnet and sends its replies to its gateway. Traffic may work in one direction and not the other, or not at all, depending on the router. Consistent masks across a subnet avoid this."
  ],
  "terms": [
   [
    "Subnet calculator",
    "A tool that computes network address, broadcast address, host range and host count from an address and mask."
   ],
   [
    "Bitwise AND",
    "The operation that combines an address with its mask to find the network address."
   ],
   [
    "Same subnet",
    "Two hosts whose addresses produce the same network address under the same mask; they communicate directly without a router."
   ],
   [
    "ipcalc",
    "A command-line subnet calculator available on many Linux systems."
   ]
  ],
  "example": "A new IP camera at 172.16.8.140/25 cannot reach its recording server at 172.16.8.20/25, although both are on the same switch. A subnet calculator shows the camera is in 172.16.8.128/25 and the server in 172.16.8.0/25. The camera was given an address from the wrong block; readdressing it to 172.16.8.60 fixes the problem.",
  "tip": "Matching first three octets does not mean same subnet when the mask is longer than /24. Always find the network address for each host using the mask.",
  "check": [
   [
    "Are 10.0.5.9/29 and 10.0.5.14/29 on the same subnet?",
    "Yes. Both fall in the 10.0.5.8 to 10.0.5.15 block, network 10.0.5.8."
   ],
   [
    "What should you check about a host's default gateway using a subnet calculator?",
    "That the gateway address lies inside the same subnet as the host, within the usable range."
   ]
  ]
 },
 {
  "t": "IPv6 format: eight hextets, leading-zero and :: compression, prefix length (usually /64)",
  "body": [
   "IPv6 was created because IPv4's 32-bit address space ran out. An IPv6 address is 128 bits long, which gives a practically unlimited number of addresses and removes the need for NAT to conserve addresses. The 128 bits are written as eight groups of four hexadecimal digits separated by colons. Each group is 16 bits and is often called a hextet (or quartet). A full example: 2001:0db8:0000:0000:0000:ff00:0042:8329. Hexadecimal uses the digits 0 to 9 and letters a to f, and letters are case-insensitive, though lowercase is standard.",
   "Two rules shorten addresses. First, leading zeros in any hextet can be dropped: 0db8 becomes db8, 0042 becomes 42 and 0000 becomes 0. Trailing zeros cannot be dropped, because 'db80' and 'db8' are different values. Second, one run of consecutive all-zero hextets can be replaced with a double colon (::). Applying both to the example gives 2001:db8::ff00:42:8329. The double colon can appear only once in an address; if it appeared twice, you could not tell how many zero hextets each one stands for. When there are two separate runs of zeros, the standard practice is to compress the longest run (or the first one if they are equal).",
   "To expand a compressed address, count the hextets shown and fill the :: with enough 0000 groups to reach eight. For fe80::1, there are two hextets shown, so :: stands for six zero hextets: fe80:0000:0000:0000:0000:0000:0000:0001. The loopback ::1 expands to seven zero hextets followed by 0001, and :: alone means the all-zeros unspecified address.",
   "Like CIDR in IPv4, IPv6 uses a prefix length after a slash to show how many bits are the network part. IPv6 does not use dotted subnet masks. The standard subnet size for a LAN is /64: the first 64 bits are the network prefix (routing prefix plus subnet ID) and the last 64 bits are the interface ID that identifies the host. Features such as SLAAC depend on /64 subnets. An organization might receive a /48 from its provider and then create many /64 subnets from it by using the 16 bits between /48 and /64 as the subnet ID.",
   "You will see IPv6 addresses in `ipconfig` on Windows (with a %number zone index after link-local addresses, which identifies the interface), in `ip -6 addr` on Linux and in `show ipv6 interface brief` on Cisco devices."
  ],
  "terms": [
   [
    "Hextet",
    "One 16-bit group of an IPv6 address, written as four hexadecimal digits."
   ],
   [
    "Double colon (::)",
    "Notation that replaces one run of consecutive all-zero hextets; it can be used only once per address."
   ],
   [
    "Prefix length",
    "The number of network bits in an IPv6 address, written after a slash; LAN subnets are usually /64."
   ],
   [
    "Interface ID",
    "The host portion of an IPv6 address, usually the last 64 bits."
   ]
  ],
  "example": "A network diagram lists a server as 2001:db8:acad:10::25/64. Expanded, that is 2001:0db8:acad:0010:0000:0000:0000:0025. The first four hextets, 2001:db8:acad:10, are the /64 prefix shared by every host on that subnet.",
  "tip": "An address with two double colons is always invalid. And only leading zeros can be removed from a hextet, never trailing ones.",
  "check": [
   [
    "Compress 2001:0db8:0000:0000:0000:0000:0000:0001 as far as possible.",
    "2001:db8::1."
   ],
   [
    "Why can :: appear only once in an address?",
    "If it appeared twice, there would be no way to know how many zero hextets each :: represents."
   ],
   [
    "How many bits is the interface ID in a typical /64 IPv6 subnet?",
    "64 bits."
   ]
  ]
 },
 {
  "t": "IPv6 address types: global unicast (2000::/3), link-local (fe80::/10), unique local (fc00::/7), multicast (ff00::/8), loopback ::1",
  "body": [
   "IPv6 has no broadcast. Instead it uses three kinds of delivery: unicast (one interface), multicast (a group of interfaces) and anycast (the nearest of several interfaces sharing an address). Within unicast, several address types have different scopes, meaning how far they are valid. A single interface normally has more than one IPv6 address at the same time, so you must recognize each type by its first hex digits.",
   "Global unicast addresses (GUAs) are the IPv6 equivalent of public IPv4 addresses: globally unique and routable on the internet. They come from 2000::/3, which means the first hextet is between 2000 and 3fff. So an address starting with 2 or 3, such as 2001:db8:acad::10 or 2600:..., is a global unicast address. (2001:db8::/32 is reserved for documentation and examples.)",
   "Link-local addresses begin with fe80 (the fe80::/10 block, in practice always fe80::/64). Every IPv6-enabled interface creates one automatically, even when no router or DHCP server exists. Link-local addresses are only valid on the local link and are never routed. They are used for Neighbor Discovery, router advertisements and as the next-hop address in routing, so the default gateway shown on an IPv6 host is often a fe80 address. Do not confuse this with IPv4 APIPA: an fe80 address is normal and expected, not a sign of failure.",
   "Unique local addresses (ULAs) come from fc00::/7. In practice they begin with fd, because the fd00::/8 half is the part used with a locally generated random identifier. They are similar to IPv4 private addresses: usable within an organization and routable internally, but not routed on the internet.",
   "Multicast addresses start with ff (ff00::/8). Examples include ff02::1 (all nodes on the link) and ff02::2 (all routers on the link). Multicast replaces most jobs broadcast did in IPv4, such as Neighbor Discovery's solicited-node multicast addresses (ff02::1:ffxx:xxxx) that replace ARP broadcasts. The loopback address is ::1, the equivalent of 127.0.0.1, and :: (all zeros) is the unspecified address a host uses before it has an address.",
   "A quick way to classify: 2 or 3 at the start means global unicast, fe80 means link-local, fc or fd means unique local, ff means multicast, and ::1 means loopback."
  ],
  "terms": [
   [
    "Global unicast address",
    "A globally routable IPv6 address from 2000::/3, similar to a public IPv4 address."
   ],
   [
    "Link-local address",
    "An automatically created fe80::/10 address valid only on the local link and never routed."
   ],
   [
    "Unique local address",
    "An fc00::/7 address (in practice fd00::/8) for internal use, similar to IPv4 private addresses."
   ],
   [
    "Multicast address",
    "An ff00::/8 address that delivers traffic to a group of interfaces; IPv6 uses multicast instead of broadcast."
   ]
  ],
  "example": "Running `ipconfig` on a laptop shows three IPv6 entries: 2600:1700:5a0:3c10::45 (global unicast from the provider), fd12:3456:789a:1::45 (a unique local address from the office network) and fe80::1c2b:3aff:fe4d:5e6f%12 (link-local). The default gateway is listed as fe80::1.",
  "tip": "IPv6 has no broadcast addresses; multicast (ff) does that job. And an fe80 address on an interface is normal, unlike a 169.254 address in IPv4.",
  "check": [
   [
    "What type of address is fe80::a1b2:3c4d:5e6f:7a8b?",
    "A link-local address, valid only on the local link."
   ],
   [
    "Which prefix identifies IPv6 multicast addresses?",
    "ff00::/8, so they begin with ff."
   ],
   [
    "What is the IPv6 loopback address?",
    "::1."
   ]
  ]
 },
 {
  "t": "IPv6 address assignment: SLAAC, modified EUI-64, DHCPv6, and dual stack",
  "body": [
   "IPv6 hosts can get addresses in several ways, and a network may use more than one at once. Besides manual (static) configuration, the main methods are SLAAC and DHCPv6, and they rely on messages from the local router.",
   "Routers periodically send Router Advertisement (RA) messages, part of ICMPv6 Neighbor Discovery, to the all-nodes multicast address ff02::1, and hosts can ask for one immediately with a Router Solicitation. An RA carries the subnet's prefix (for example 2001:db8:acad:1::/64), the router's link-local address to use as the default gateway, and flags that tell hosts how to get addresses and other settings.",
   "SLAAC (Stateless Address Autoconfiguration) lets a host build its own global address with no server: it takes the /64 prefix from the RA and adds its own 64-bit interface ID. 'Stateless' means nothing keeps track of which host has which address. The host then uses Duplicate Address Detection to make sure no one else has the same address. The interface ID can be created in two main ways. Modified EUI-64 derives it from the 48-bit MAC address: split the MAC in half, insert fffe in the middle, and flip the seventh bit of the first byte (the universal/local bit). For MAC 00:1a:2b:3c:4d:5e, the first byte 00 becomes 02, giving the interface ID 021a:2bff:fe3c:4d5e. Because this reveals the hardware address, most modern operating systems instead use randomly generated interface IDs for privacy, including temporary addresses that change over time.",
   "DHCPv6 works like IPv4 DHCP but uses UDP ports 546 (client) and 547 (server). Stateful DHCPv6 assigns addresses and tracks them, which gives administrators a record of who had which address. Stateless DHCPv6 is used alongside SLAAC: the host builds its own address but gets extra information, such as DNS server addresses, from a DHCPv6 server. Note that a DHCPv6 server does not provide the default gateway; that always comes from the router's RA.",
   "Dual stack means a device or network runs IPv4 and IPv6 at the same time, each with its own addresses. This is the most common way organizations move to IPv6, because hosts can reach IPv4-only and IPv6-capable services alike. When both are available, operating systems usually prefer IPv6. On Cisco routers, `ipv6 unicast-routing` enables IPv6 routing and RA messages, and `ipv6 address 2001:db8:acad:1::/64 eui-64` configures an interface with an EUI-64 address."
  ],
  "terms": [
   [
    "SLAAC",
    "Stateless Address Autoconfiguration: a host builds its IPv6 address from the router's advertised prefix plus its own interface ID."
   ],
   [
    "Router Advertisement",
    "An ICMPv6 message from a router announcing the prefix, default gateway and address assignment method."
   ],
   [
    "Modified EUI-64",
    "A method that builds a 64-bit interface ID from a MAC address by inserting fffe and flipping the seventh bit."
   ],
   [
    "DHCPv6",
    "The IPv6 version of DHCP; stateful mode assigns addresses, stateless mode supplies only extra settings like DNS."
   ],
   [
    "Dual stack",
    "Running IPv4 and IPv6 simultaneously on the same devices and network."
   ]
  ],
  "example": "An office router advertises 2001:db8:10:5::/64. A new laptop uses SLAAC to create 2001:db8:10:5:8c3a:12ff:fe00:9b1 style addresses (with a randomized ID on modern systems), gets DNS servers from stateless DHCPv6, and still gets 192.168.5.40 from IPv4 DHCP because the office runs dual stack.",
  "tip": "In EUI-64, remember 'insert fffe, flip the seventh bit'. And the IPv6 default gateway always comes from the router advertisement, never from DHCPv6.",
  "check": [
   [
    "What does 'stateless' mean in SLAAC?",
    "No server keeps track of which host has which address; hosts build their own addresses from the advertised prefix."
   ],
   [
    "Using modified EUI-64, what interface ID results from MAC 00:1a:2b:3c:4d:5e?",
    "021a:2bff:fe3c:4d5e."
   ],
   [
    "What is dual stack?",
    "Running IPv4 and IPv6 at the same time on the same hosts and network."
   ]
  ]
 },
 {
  "t": "Copper cable categories: Cat 5e, Cat 6, Cat 6a; straight-through vs crossover; 100 m Ethernet limit",
  "body": [
   "Most wired LAN connections use UTP (unshielded twisted pair) copper cable: four pairs of wires, each pair twisted together to cancel electromagnetic interference, ending in RJ-45 connectors. STP (shielded twisted pair) adds foil or braided shielding for electrically noisy environments. Cables are rated in categories that indicate the frequencies and speeds they support.",
   "Cat 5e (enhanced Category 5) supports up to 1 Gbps (1000BASE-T) at the full 100 meters and is still found in many buildings. Cat 6 has tighter twists and better separation between pairs, reducing crosstalk; it supports 1 Gbps at 100 m and 10 Gbps (10GBASE-T) over shorter distances, commonly quoted as up to 55 meters. Cat 6a (augmented) supports 10 Gbps over the full 100 meters and is common in new installations, especially where access points or other high-bandwidth devices need multi-gigabit links. Higher categories cost more and are thicker and stiffer, which affects how easily they fit through conduits and cable trays.",
   "The 100-meter limit is the maximum length of a twisted-pair Ethernet channel between two active devices, such as a switch and a PC. In structured cabling, this is typically up to 90 meters of solid-core horizontal cable in the walls from the patch panel to the wall jack, plus up to 10 meters total of flexible stranded patch cables at each end. Beyond this, signals weaken (attenuation) and errors increase. To go farther, use a switch in between or fiber.",
   "Straight-through and crossover describe how wires are arranged at each end. The two wiring standards are T568A and T568B, which differ only in swapping the orange and green pairs. A straight-through cable uses the same standard on both ends (usually B on both) and connects unlike devices: PC to switch, switch to router. A crossover cable uses A on one end and B on the other, swapping transmit and receive pairs; it was traditionally needed for like devices, such as switch to switch or PC to PC. Today almost all Ethernet ports support Auto-MDIX, which detects the cable type and adjusts automatically, so straight-through cables work nearly everywhere. Gigabit and faster Ethernet use all four pairs.",
   "A rollover (console) cable is a third type that reverses all pins and connects a computer's serial port to a Cisco console port; do not confuse it with crossover. Cable testers and certifiers verify wiring order and length."
  ],
  "terms": [
   [
    "UTP",
    "Unshielded twisted pair: copper cable with twisted pairs that reduce interference, the standard for Ethernet LANs."
   ],
   [
    "Cat 6a",
    "Augmented Category 6 cable supporting 10 Gbps Ethernet at up to 100 meters."
   ],
   [
    "Straight-through cable",
    "A cable wired with the same standard on both ends, used between unlike devices such as PC and switch."
   ],
   [
    "Crossover cable",
    "A cable wired T568A on one end and T568B on the other, traditionally used between like devices."
   ],
   [
    "Auto-MDIX",
    "A port feature that automatically adjusts for straight-through or crossover cabling."
   ]
  ],
  "example": "A warehouse needs a network camera 140 meters from the nearest switch. Running Cat 6 the whole way would exceed the 100 m limit and produce errors or no link, so the installer places a small switch in a cabinet halfway, or runs fiber to it, keeping each copper segment under 100 meters.",
  "tip": "The 100 m limit applies to Cat 5e, Cat 6 and Cat 6a alike. The difference is speed: Cat 6a supports 10 Gbps at the full 100 m, while Cat 6 supports 10 Gbps only at shorter distances.",
  "check": [
   [
    "Which cable type connects a PC to a switch?",
    "A straight-through cable (and Auto-MDIX makes most connections work regardless)."
   ],
   [
    "What is the maximum length of a standard twisted-pair Ethernet run?",
    "100 meters."
   ]
  ]
 },
 {
  "t": "Coaxial cable, and single-mode vs multimode fiber (distance, light source, core size)",
  "body": [
   "Coaxial (coax) cable has a solid copper center conductor, surrounded by insulation, a braided or foil shield and an outer jacket. The shared axis gives it its name, and the shield makes it quite resistant to interference. Today you will mainly see coax delivering cable TV and cable internet, connecting the provider's line to a cable modem, and in some security camera and antenna installations. RG-6 is the common type for cable TV and internet, while RG-59 is thinner and older. Early Ethernet also used coax, but modern LANs do not.",
   "Fiber-optic cable carries data as pulses of light through a glass (or sometimes plastic) core surrounded by cladding that reflects the light back into the core. Fiber is immune to electromagnetic interference, does not carry electricity (useful between buildings with different electrical grounds), is hard to tap without detection, and supports much higher speeds over far longer distances than copper. The trade-offs are cost, fragility and the need for special tools to terminate and splice it.",
   "There are two main kinds. Single-mode fiber (SMF) has a very small core, about 9 micrometers, which lets light travel in essentially one path (mode). It uses lasers as its light source and can carry signals for many kilometers, so it is used for campus backbones between distant buildings, metro networks and provider links. Its jacket is commonly yellow.",
   "Multimode fiber (MMF) has a larger core, 50 or 62.5 micrometers, so light travels in many paths that bounce at different angles. Those paths arrive at slightly different times (modal dispersion), which limits distance to typically hundreds of meters, depending on the grade and speed. Multimode traditionally used LEDs and now commonly uses VCSELs (vertical-cavity surface-emitting lasers), which are cheaper than single-mode lasers. It is common inside buildings and data centers. Jackets are often orange or aqua. Grades are labeled OM1 through OM5, with higher grades supporting higher speeds at longer distances.",
   "A key rule: single-mode and multimode fiber, and the transceivers designed for them, must match. Plugging a multimode patch cord into a single-mode transceiver, or the reverse, usually gives no link or an unreliable link. Fiber also has two strands for most connections, one for transmit and one for receive; if the link stays down, a swapped strand pair is a common cause."
  ],
  "terms": [
   [
    "Coaxial cable",
    "Cable with a central conductor and a surrounding shield, used mainly for cable TV and cable internet."
   ],
   [
    "Single-mode fiber",
    "Fiber with a small core (about 9 micrometers) that uses lasers and reaches many kilometers."
   ],
   [
    "Multimode fiber",
    "Fiber with a larger core (50 or 62.5 micrometers), using LEDs or VCSELs, for shorter distances such as within buildings."
   ],
   [
    "Modal dispersion",
    "Spreading of a light signal because different paths through a multimode core arrive at different times, which limits distance."
   ]
  ],
  "example": "A school links two buildings 3 kilometers apart. Multimode would not reach that far, so the contractor installs single-mode fiber with yellow jackets and long-range transceivers. Inside each building's wiring closet, short multimode runs connect the switches in the same room.",
  "tip": "Small core, laser, long distance: single-mode. Larger core, LED or VCSEL, shorter distance: multimode. Coax today usually means a cable modem or TV connection.",
  "check": [
   [
    "Which fiber type uses a smaller core and reaches longer distances?",
    "Single-mode fiber, with a core of about 9 micrometers, using lasers."
   ],
   [
    "Name two advantages of fiber over copper.",
    "Immunity to electromagnetic interference and much longer distances at high speeds; it also isolates electrical grounds between buildings."
   ]
  ]
 },
 {
  "t": "Connectors: RJ-45, RJ-11, BNC, F-type, LC, SC and ST; SFP transceivers",
  "body": [
   "Identifying connectors by sight is a common exam task and an everyday support skill, especially when someone on the phone describes a cable. Connectors fall into three groups: twisted pair, coaxial and fiber.",
   "For twisted pair, the RJ-45 is the 8-pin (8P8C) connector on Ethernet cables, about the width of a finger, with a clip on top. It is also used for Cisco console ports, which can confuse beginners. The RJ-11 is smaller, with fewer contacts (usually 2 or 4 wires used), and connects analog telephone lines and DSL modems. An RJ-11 plug fits loosely into an RJ-45 jack, but it does not belong there.",
   "For coax, the F-type connector screws onto a threaded post and connects cable TV and cable modems; its center conductor is the wire itself. The BNC (Bayonet Neill-Concelman) connector uses a push-and-quarter-twist locking mechanism. It was used by old coax Ethernet and is still found in some analog CCTV cameras and test equipment.",
   "Fiber connectors to know are LC, SC and ST. The LC (Lucent Connector) is small, with a latch similar to RJ-45, and is usually paired side by side as a duplex connector; it is the most common connector on modern switches and SFP modules because it is compact. The SC (subscriber connector, sometimes remembered as 'square connector' or 'stick and click') is a larger square push-pull connector. The ST (straight tip, 'stick and twist') is round with a bayonet twist-lock, similar in style to BNC, and is found in older installations. A patch cable can have different connectors on each end, such as LC to SC, to join older and newer equipment.",
   "An SFP (small form-factor pluggable) is a hot-swappable transceiver module that slides into an SFP slot on a switch or router. It converts the device's electrical signals into the right media: multimode or single-mode fiber at a certain wavelength, or even copper with an RJ-45 port. This lets one switch model support many types of links; you just choose the right module. SFP+ supports higher speeds (commonly 10 Gbps), and larger formats such as QSFP support even higher speeds. The module must match the fiber type, the distance and the transceiver at the other end, and many vendors only fully support their own compatible modules.",
   "On Cisco devices, `show interfaces status` and `show inventory` list which transceiver is installed in each slot."
  ],
  "terms": [
   [
    "RJ-45",
    "8-pin modular connector used for Ethernet twisted-pair cables and Cisco console ports."
   ],
   [
    "RJ-11",
    "Smaller modular connector used for analog telephone and DSL lines."
   ],
   [
    "F-type",
    "Threaded coaxial connector used for cable TV and cable modems."
   ],
   [
    "LC connector",
    "Small latching fiber connector, usually duplex, common on SFP modules."
   ],
   [
    "SFP",
    "Small form-factor pluggable: a hot-swappable transceiver that adapts a switch port to a particular fiber or copper medium."
   ]
  ],
  "example": "A switch in a new rack has four empty SFP slots. The link to the next building uses single-mode fiber with LC connectors, so the technician installs a long-range single-mode SFP, plugs in an LC duplex patch cord, and confirms the port comes up with `show interfaces status`.",
  "tip": "Memory aids: SC 'stick and click' (square, push-pull), ST 'stick and twist' (round, bayonet), LC 'little connector' (small, latched). F-type screws on; BNC twists on.",
  "check": [
   [
    "Which connector is used for a cable modem's coaxial input?",
    "The F-type connector."
   ],
   [
    "What is an SFP module for?",
    "It is a hot-swappable transceiver that lets a switch or router port use a specific medium, such as multimode or single-mode fiber or copper."
   ]
  ]
 },
 {
  "t": "Sources of interference on copper and wireless: EMI, crosstalk, microwaves, walls and distance",
  "body": [
   "Signals on any medium weaken and pick up noise. When the noise gets too high compared with the signal, bits are misread, frames fail their error checks and have to be resent, and users experience slowness or dropouts. Knowing the common sources helps you find a fix faster than just replacing equipment.",
   "EMI (electromagnetic interference) is unwanted electrical noise induced into a cable or radio channel by nearby equipment. On copper cabling, typical sources are fluorescent light fixtures and their ballasts, electric motors, elevators, HVAC units, power cables running in parallel and industrial machinery. Twisting the wire pairs cancels much of this noise, but running UTP right beside a heavy power feed or over lights can still cause errors. Remedies include rerouting cables, crossing power lines at right angles, using STP (shielded twisted pair), or switching to fiber, which is immune to EMI. RFI (radio frequency interference) is the same idea at radio frequencies.",
   "Crosstalk is interference between the wire pairs inside the same cable, or between neighboring cables. NEXT (near-end crosstalk) is measured at the same end as the transmitter, and FEXT at the far end. It gets worse when pairs are untwisted too much at connectors, when poor-quality or lower-category cable is used for high speeds, or when cables are bundled very tightly. Good termination practice, keeping untwisting to a minimum, and correct cable categories reduce it. Attenuation, the natural loss of signal strength over distance, is why copper Ethernet has a 100-meter limit.",
   "Wireless faces more challenges because the air is shared. In the 2.4 GHz band, microwave ovens, cordless phones, Bluetooth devices, baby monitors and wireless cameras can all interfere; a microwave oven operates near 2.45 GHz, so Wi-Fi near a kitchen may drop while it runs. Neighboring Wi-Fi networks on the same or overlapping channels cause co-channel and adjacent-channel interference, a common problem in apartment buildings.",
   "Physical obstacles absorb or reflect radio signals. Concrete, brick, metal (including filing cabinets, elevator shafts and foil-backed insulation), mirrors, water (fish tanks, and people) and even thick glass weaken Wi-Fi. Higher frequencies such as 5 and 6 GHz lose more strength through walls than 2.4 GHz. Distance matters too: signal strength drops quickly as you move away from an access point, so throughput falls as devices step down to slower data rates.",
   "On a switch, interference on a copper link shows up as input errors, CRC errors and runts in `show interfaces`. On Wi-Fi, look at the client's signal strength (RSSI, in negative dBm, where closer to zero is stronger) and signal-to-noise ratio."
  ],
  "terms": [
   [
    "EMI",
    "Electromagnetic interference: electrical noise from motors, lights, power cables and similar sources that disrupts signals."
   ],
   [
    "Crosstalk",
    "Signal bleeding from one wire pair into another within or between cables."
   ],
   [
    "Attenuation",
    "The loss of signal strength as it travels over distance or through obstacles."
   ],
   [
    "Co-channel interference",
    "Interference between Wi-Fi networks or access points using the same channel."
   ]
  ],
  "example": "Staff in a break room report that Wi-Fi drops every lunchtime. The access point nearby uses the 2.4 GHz band, and the microwave oven is running. Moving those clients to 5 GHz and adjusting the access point channel stops the dropouts.",
  "tip": "Fiber is the answer when a question asks for a medium immune to EMI. Microwave ovens and Bluetooth interfere with 2.4 GHz Wi-Fi, not with 5 GHz.",
  "check": [
   [
    "What is crosstalk?",
    "Interference caused when the signal on one wire pair couples into another pair in the same or a nearby cable."
   ],
   [
    "Why might a CRC error count grow on a switch port connected by a cable running over fluorescent lights?",
    "EMI from the lights corrupts frames, so they fail the frame check sequence and are counted as CRC errors."
   ]
  ]
 },
 {
  "t": "Wi-Fi bands 2.4, 5 and 6 GHz and their trade-offs; 802.11 generations",
  "body": [
   "Wi-Fi (IEEE 802.11) uses unlicensed radio bands, and modern access points can operate in three of them: 2.4 GHz, 5 GHz and 6 GHz. Each band involves a trade-off between range and wall penetration on one side and speed and available channels on the other.",
   "The 2.4 GHz band has the longest range and best penetration through walls, because lower frequencies are absorbed less. But it is narrow and crowded. In North America there are 11 usable channels, yet only three that do not overlap: 1, 6 and 11. It is also shared with microwave ovens, Bluetooth and many other devices, so interference is common and throughput is modest. Many simple IoT devices support only 2.4 GHz.",
   "The 5 GHz band offers many more non-overlapping channels and allows wider channels (40, 80 or 160 MHz), so it supports higher speeds with less interference. Its range is shorter and it is weakened more by walls. Some 5 GHz channels are DFS (dynamic frequency selection) channels shared with radar; access points must move off them if radar is detected.",
   "The 6 GHz band, opened for Wi-Fi 6E and later, adds a large amount of clean spectrum with room for many wide channels and no older devices slowing it down. Its range and wall penetration are shorter still, so it works best in the same room or nearby rooms as the access point, and only newer client devices can use it. WPA3 security is required on 6 GHz.",
   "The 802.11 generations, with their Wi-Fi Alliance names where they have them: 802.11b used 2.4 GHz (up to 11 Mbps). 802.11a used 5 GHz and 802.11g used 2.4 GHz (both up to 54 Mbps). 802.11n (Wi-Fi 4) added MIMO (multiple antennas) and works on 2.4 and 5 GHz. 802.11ac (Wi-Fi 5) works on 5 GHz with wider channels and higher speeds. 802.11ax (Wi-Fi 6) works on 2.4 and 5 GHz and improves efficiency in crowded areas with features such as OFDMA; Wi-Fi 6E is 802.11ax extended into 6 GHz. 802.11be (Wi-Fi 7) uses 2.4, 5 and 6 GHz with even wider channels. Newer standards are backward compatible within a band, but older clients can reduce efficiency for everyone.",
   "Advertised maximum speeds are theoretical totals across multiple streams; real throughput is far lower. When choosing a band, think about the device and its location: a smart plug in the garage may need 2.4 GHz, while a laptop in the same room as the access point benefits from 5 or 6 GHz."
  ],
  "terms": [
   [
    "2.4 GHz band",
    "Wi-Fi band with the best range and penetration but few non-overlapping channels (1, 6, 11) and much interference."
   ],
   [
    "5 GHz band",
    "Wi-Fi band with many channels and higher speeds but shorter range than 2.4 GHz."
   ],
   [
    "6 GHz band",
    "Newest Wi-Fi band, used by Wi-Fi 6E and Wi-Fi 7, with abundant clean spectrum and the shortest range."
   ],
   [
    "Wi-Fi 6",
    "The Wi-Fi Alliance name for 802.11ax, focused on efficiency in busy environments."
   ],
   [
    "MIMO",
    "Multiple input, multiple output: using several antennas to send multiple data streams at once."
   ]
  ],
  "example": "A home user complains that the Wi-Fi is fast in the living room but slow in the back bedroom. The laptop joins the 5 GHz network near the router but struggles through two brick walls. Placing a second access point or mesh node closer, or using 2.4 GHz in that room, improves the connection.",
  "tip": "Lower frequency means longer range and better wall penetration; higher frequency means more channels and speed but shorter range. The only non-overlapping 2.4 GHz channels in North America are 1, 6 and 11.",
  "check": [
   [
    "Which 802.11 standard is Wi-Fi 5, and which band does it use?",
    "802.11ac, on the 5 GHz band."
   ],
   [
    "Why might an IoT device be put on 2.4 GHz?",
    "Many simple IoT devices only support 2.4 GHz, and it has better range through walls."
   ],
   [
    "Which Wi-Fi generation first added the 6 GHz band?",
    "Wi-Fi 6E (802.11ax extended into 6 GHz)."
   ]
  ]
 },
 {
  "t": "Cellular 4G/5G as licensed spectrum vs unlicensed Wi-Fi; hotspots and tethering",
  "body": [
   "Wireless networks differ in who is allowed to use the radio spectrum. Cellular networks use licensed spectrum: governments sell or assign specific frequency ranges to mobile carriers, who have exclusive rights to transmit there in a region. Wi-Fi and Bluetooth use unlicensed spectrum, such as the 2.4, 5 and 6 GHz bands, which anyone may use with approved equipment as long as they follow power and other rules.",
   "This difference has practical consequences. Because carriers control their spectrum, they can plan cell sites and power levels to cover large areas with predictable performance, from a few hundred meters to many kilometers per cell tower. The carrier also manages the core network, and users pay for a subscription and typically a data allowance. Unlicensed Wi-Fi is free to deploy and cheap, but everyone shares the same channels, so interference from neighbors and other devices is common, and range is limited to a building or a small outdoor area.",
   "4G LTE (Long-Term Evolution) and 5G are cellular generations. 5G offers higher peak speeds, lower latency and support for far more connected devices per area than 4G. 5G uses a range of frequencies: low-band for wide coverage, mid-band for a balance of speed and coverage, and high-band millimeter wave, which is very fast but short-range and easily blocked by walls, windows and even hands. Actual speeds depend heavily on location, signal strength and how busy the cell is.",
   "Devices join cellular networks using a SIM (subscriber identity module), either a physical card or an embedded eSIM, which identifies the subscriber to the carrier. Businesses use cellular for mobile staff, as a backup internet link for branch routers when the wired connection fails, and for IoT devices in places without Wi-Fi.",
   "Tethering means sharing a phone's cellular data connection with another device. A mobile hotspot is the most common method: the phone (or a dedicated hotspot device) acts as a small Wi-Fi access point and router, performing NAT so laptops and tablets can use the cellular connection. Tethering can also use a USB cable or Bluetooth. When helping a user on a hotspot, remember that the laptop has a private address from the phone, that data caps and weak signal can slow things down, and that the hotspot should be protected with WPA2 or WPA3 and a strong password."
  ],
  "terms": [
   [
    "Licensed spectrum",
    "Radio frequencies assigned exclusively to a carrier in a region, used by cellular networks."
   ],
   [
    "Unlicensed spectrum",
    "Radio frequencies anyone may use with approved equipment, such as the Wi-Fi bands."
   ],
   [
    "Tethering",
    "Sharing a phone's cellular data connection with another device over Wi-Fi, USB or Bluetooth."
   ],
   [
    "Mobile hotspot",
    "A phone or dedicated device acting as a Wi-Fi access point and router for a cellular connection."
   ],
   [
    "SIM / eSIM",
    "The physical or embedded module that identifies a subscriber to a cellular carrier."
   ]
  ],
  "example": "A field engineer's laptop has no Wi-Fi at a customer site. She turns on the hotspot on her phone, protected with WPA2 and a strong password, and connects the laptop to it. The laptop receives a private address from the phone, and her traffic travels over the carrier's 5G network.",
  "tip": "Cellular = licensed, carrier-managed, wide coverage, subscription. Wi-Fi = unlicensed, locally managed, shorter range, shared channels. A hotspot turns the phone into a Wi-Fi router using the cellular link.",
  "check": [
   [
    "Why is cellular coverage more predictable than Wi-Fi in public spaces?",
    "Carriers hold exclusive licensed spectrum and plan their cell sites, while Wi-Fi shares unlicensed channels with many other users and devices."
   ],
   [
    "What does a phone do when acting as a mobile hotspot?",
    "It acts as a Wi-Fi access point and router, sharing its cellular data connection with other devices using NAT."
   ]
  ]
 },
 {
  "t": "What a client needs to join Wi-Fi: SSID, security type and password or credentials",
  "body": [
   "To connect to a wireless network, a client device needs three pieces of information that match the access point's settings: the network name (SSID), the security type, and the password or credentials that security type requires. If any one does not match, the connection fails.",
   "The SSID (service set identifier) is the network's name, up to 32 characters, and it is case-sensitive. Access points normally broadcast it in beacon frames several times a second, so it appears in the device's list of available networks. An SSID can be hidden (not broadcast), in which case the user must type the exact name manually. Hiding the SSID is not a security measure, because the name still appears in other wireless frames and is easy to discover with common tools. A single access point can offer several SSIDs, for example one for staff and one for guests, each mapped to a different VLAN.",
   "The security type defines how clients authenticate and how traffic is encrypted. Common choices are Open (no encryption, sometimes with a web captive portal), WPA2-Personal, WPA3-Personal, WPA2/WPA3 mixed or transition mode, and WPA2- or WPA3-Enterprise. A device usually detects the type automatically from the beacon, but when adding a hidden network by hand, you must select it correctly. Older devices that do not support WPA3 cannot join a WPA3-only network.",
   "The credentials depend on the security type. Personal modes use a pre-shared key (PSK), a passphrase shared by everyone on the network; with WPA2, it must be 8 to 63 characters, and it is case-sensitive. Enterprise modes use 802.1X, where each user signs in with their own username and password or a digital certificate, checked by an authentication server (usually RADIUS). Enterprise setups may also require the device to trust the server's certificate. Captive portals, common in hotels and cafes, let the device connect first and then ask the user to accept terms or sign in on a web page before allowing internet access.",
   "When a user cannot connect, check that Wi-Fi is enabled and airplane mode is off, that they chose the correct SSID (similar names are common, such as Office and Office-Guest), that the password is typed exactly including capitals, and that the device supports the security type and band. After a password change, the device may keep trying the old saved profile; 'forget' the network and rejoin. Once connected, confirm an IP address was received and not a 169.254 address."
  ],
  "terms": [
   [
    "SSID",
    "Service set identifier: the case-sensitive name of a wireless network."
   ],
   [
    "Pre-shared key (PSK)",
    "A passphrase shared by all users of a WPA2- or WPA3-Personal network."
   ],
   [
    "802.1X",
    "Port-based authentication used by Enterprise Wi-Fi, where each user or device is checked by an authentication server."
   ],
   [
    "Captive portal",
    "A web page that users must complete, such as accepting terms or signing in, before getting internet access."
   ]
  ],
  "example": "After the office changed its Wi-Fi passphrase, a user's laptop shows 'Can't connect to this network'. The laptop still has the old passphrase saved. You have the user forget the network, select the correct SSID and enter the new passphrase, and the laptop connects and receives a normal address.",
  "tip": "Hiding the SSID does not secure a network. Security comes from WPA2 or WPA3 encryption with a strong passphrase or 802.1X credentials.",
  "check": [
   [
    "What three things must a client have to join a secured Wi-Fi network?",
    "The correct SSID, a matching security type, and the right passphrase or credentials."
   ],
   [
    "How do WPA2-Personal and WPA2-Enterprise differ in the credentials users provide?",
    "Personal uses one shared passphrase for everyone; Enterprise uses individual credentials checked by an authentication server through 802.1X."
   ]
  ]
 },
 {
  "t": "Endpoint types: desktops, laptops, phones, tablets, servers, printers and IoT devices",
  "body": [
   "An endpoint is any device at the edge of the network that sends or receives data for users or applications, as opposed to infrastructure devices like switches, routers and access points that move data between endpoints. Support technicians spend much of their time helping endpoints connect, so it helps to know how each type typically joins the network and what problems are common.",
   "Desktops are usually wired with Ethernet, stay in one place and often have a fixed switch port, which makes them simple to troubleshoot: check the cable, port lights and IP settings. Laptops move between wired and wireless connections and between office, home and public networks, so they often use VPN clients, and problems frequently involve Wi-Fi, saved network profiles or VPN. Phones and tablets connect over Wi-Fi and cellular, run mobile operating systems (Android and iOS/iPadOS) with more limited diagnostic tools, and are often personally owned (BYOD, bring your own device). Organizations commonly put them on separate networks and manage them with mobile device management (MDM).",
   "Servers provide services to other devices: file sharing, email, web applications, databases, DHCP and DNS. They normally have static IP addresses so clients can always find them, often have redundant network connections and power supplies, and live in a data center or server room, or in the cloud as virtual machines. A server outage affects many users at once, so it is usually a high-priority ticket.",
   "Network printers connect by Ethernet or Wi-Fi and are shared by many users. They should have static or DHCP-reserved addresses, because computers are configured to print to a specific address; if the printer's address changes, printing breaks. Printers often have a small web interface for configuration and a front panel that shows their IP address.",
   "IoT (Internet of Things) devices include smart TVs, cameras, thermostats, sensors, door locks, building controls and medical devices. They often have limited interfaces, may support only 2.4 GHz Wi-Fi, and can be hard to patch or configure securely. Many ship with default passwords. Best practice is to change default credentials, keep firmware updated, and place IoT devices on a separate network segment or VLAN so a compromised device cannot reach sensitive systems.",
   "When you take a ticket, identifying the endpoint type tells you which tools and connection methods apply and how urgent the issue is likely to be."
  ],
  "terms": [
   [
    "Endpoint",
    "A device at the edge of the network, such as a computer, phone, printer, server or IoT device, that users or applications use."
   ],
   [
    "Server",
    "A computer that provides services to clients, usually with a static IP address."
   ],
   [
    "IoT device",
    "An Internet of Things device, such as a camera, sensor or smart appliance, that connects to the network with limited user interface."
   ],
   [
    "BYOD",
    "Bring your own device: employees using personal phones, tablets or laptops for work."
   ],
   [
    "MDM",
    "Mobile device management: software for enforcing settings, apps and security on phones, tablets and laptops."
   ]
  ],
  "example": "After a router replacement, nobody can print. The printer had been using a DHCP address that changed, while every PC still points to the old address. You create a DHCP reservation so the printer always receives its previous address, and printing resumes.",
  "tip": "Servers and printers should have static or reserved addresses; ordinary clients use DHCP. IoT devices are a security concern and belong on their own segment with changed default passwords.",
  "check": [
   [
    "Why should a network printer have a static or reserved IP address?",
    "Clients are configured to send jobs to its address, so if the address changes, printing stops."
   ],
   [
    "Name two security measures for IoT devices.",
    "Change default credentials, keep firmware updated and isolate them on a separate VLAN or network segment."
   ]
  ]
 },
 {
  "t": "Checking connectivity on Windows, Linux, macOS, Android and iOS: settings screens and command-line tools",
  "body": [
   "Every operating system lets you view a device's network settings: its IP address, subnet mask, default gateway, DNS servers and connection status. Knowing where to look on each platform lets you guide a user over the phone and confirm the basics before deeper troubleshooting.",
   "On Windows, the Settings app under Network and internet shows each connection and its properties, including IP and DNS details. The classic Control Panel Network Connections view (reachable by running `ncpa.cpl`) lists adapters and whether they are enabled. From Command Prompt or PowerShell, `ipconfig` shows the address, mask and gateway, and `ipconfig /all` adds the MAC address, DHCP server, lease times and DNS servers. `ipconfig /release` and `ipconfig /renew` request a new DHCP lease, and `ipconfig /flushdns` clears cached DNS results. Other useful tools are `ping`, `tracert`, `nslookup`, `netstat` and `arp -a`. PowerShell also offers `Test-NetConnection`, which can test a specific TCP port.",
   "On Linux, graphical desktops have a network settings panel, but technicians mostly use the terminal. `ip addr` (or `ip a`) shows interfaces and addresses, `ip route` shows the routing table including the default gateway, and `ip link` shows whether interfaces are up. The older `ifconfig` still exists on some systems. DNS servers are often listed in `/etc/resolv.conf` or shown by `resolvectl status`. Tools include `ping`, `traceroute` (or `tracepath`), `nslookup` and `dig`, and `ss` for open connections.",
   "On macOS, System Settings (System Preferences on older versions) has a Network section showing the Wi-Fi or Ethernet connection, its IP address, router (the default gateway) and DNS servers under Details. In Terminal, `ifconfig` shows interfaces, and commands like `ping`, `traceroute`, `nslookup` and `networksetup` work. Holding the Option key while clicking the Wi-Fi icon shows extra details such as signal strength and channel.",
   "On Android, open Settings, then Network and internet (the exact names vary by manufacturer), select the connected Wi-Fi network and view its details, including IP address, gateway, signal strength and security type. The About phone screen shows Wi-Fi MAC address information. On iOS and iPadOS, go to Settings, Wi-Fi, and tap the info icon next to the connected network to see the IP address, subnet mask, router and DNS settings, and options like Renew Lease and Private Wi-Fi Address. Mobile devices have no built-in command line, so technicians rely on these screens or on network utility apps.",
   "Whatever the platform, check the same things in the same order: connected or not, a valid address (not 169.254), the correct gateway and DNS, then reachability tests."
  ],
  "terms": [
   [
    "ipconfig",
    "Windows command that displays IP configuration; /all adds details, /release and /renew refresh DHCP, /flushdns clears the DNS cache."
   ],
   [
    "ip",
    "Linux command for viewing and configuring interfaces (ip addr), routes (ip route) and links (ip link)."
   ],
   [
    "ifconfig",
    "Older Unix command to view interface settings, still used on macOS."
   ],
   [
    "Test-NetConnection",
    "PowerShell command that tests reachability and can check whether a specific TCP port is open."
   ]
  ],
  "example": "An iPhone user says the office Wi-Fi shows connected but nothing loads. You ask them to open Settings, Wi-Fi, and tap the info icon. The IP address starts with 169.254, so the phone never got a DHCP lease. Tapping Renew Lease, then checking the access point's VLAN setting, resolves the issue.",
  "tip": "Know the command per platform: Windows uses ipconfig and tracert; Linux uses ip and traceroute; macOS uses ifconfig and traceroute. Phones use the Wi-Fi details screen.",
  "check": [
   [
    "Which Windows command shows the MAC address and DNS servers of each adapter?",
    "`ipconfig /all`."
   ],
   [
    "How can you see the default gateway on a Linux host from the terminal?",
    "Run `ip route` and look for the line beginning with `default via`."
   ]
  ]
 },
 {
  "t": "Cisco device LEDs: system and port lights, green vs amber, solid vs blinking, and what they tell an engineer on the phone",
  "body": [
   "Cisco switches and routers have LEDs on the front panel that give a quick health report without logging in. As an entry-level technician, you may be the person standing in the wiring closet while a senior engineer on the phone asks what the lights are doing. Describing them accurately, including color and whether each is solid, blinking or off, can save a lot of time.",
   "The SYST (system) LED shows overall health. On typical Cisco Catalyst access switches, solid green means the system is operating normally, blinking green means it is booting or running its power-on self-test (POST), and amber means the system has power but is not working properly, such as a failed self-test. Off means no power. Many switches also have an RPS LED for a redundant power supply, and some have a status LED for a stack or PoE budget. Many models have a MODE button that changes what the port LEDs show: status (STAT), speed (SPD), duplex (DUPLX) or PoE usage, with a mode LED to indicate which is selected.",
   "In the default status mode, each port LED means the following on common Catalyst models. Off: no link, often an unplugged cable, a device powered off or a bad cable. Solid green: link is up with no activity. Blinking green: link is up and traffic is passing. Alternating green and amber: a link fault, such as excessive errors that can come from a bad cable or a duplex mismatch. Amber, solid or blinking: the port is not forwarding; it may be blocked by Spanning Tree Protocol (often briefly while a new link comes up), disabled by an administrator, or shut down by a security violation. Exact meanings vary by model, so engineers check the hardware guide for the specific device, but green-good and amber-problem is the general rule.",
   "When reporting over the phone, be precise: 'Port 12 is solid amber, port 11 is blinking green and the SYST light is solid green.' Also say which switch and which port numbers, counting carefully; port numbering often runs top row odd, bottom row even. Useful follow-ups are reseating the cable, trying a known-good cable, and checking whether the far-end device is powered on.",
   "Routers and access points follow similar patterns, often with a system or power LED and per-interface link LEDs. Meraki and other cloud-managed devices may use a single multicolor status LED to indicate booting, firmware upgrades, and whether they are connected to the cloud dashboard. After your observations, the engineer will usually confirm with commands like `show interfaces status`, which shows connected, notconnect or err-disabled for each port."
  ],
  "terms": [
   [
    "SYST LED",
    "The system status LED; green means normal operation, amber means a problem such as a failed self-test."
   ],
   [
    "POST",
    "Power-on self-test: hardware checks a device runs at startup, shown by a blinking system LED."
   ],
   [
    "Port LED",
    "Per-port light showing link and activity; off means no link, green means link up, amber means not forwarding."
   ],
   [
    "MODE button",
    "A button on many Cisco switches that changes what the port LEDs display, such as status, speed, duplex or PoE."
   ]
  ],
  "example": "A senior engineer asks you to check why a conference room phone is offline. You report that the SYST LED is solid green but port 23's LED is off. The engineer asks you to check the patch panel, and you find the patch cable unplugged at the panel. After reconnecting, the port goes amber briefly and then turns green.",
  "tip": "Off means no link, green means link (blinking means traffic), amber means blocked or faulty, and alternating green-amber means errors. A port that is briefly amber after connecting is often Spanning Tree still checking the link.",
  "check": [
   [
    "What does a blinking green port LED usually indicate?",
    "The link is up and traffic is passing on that port."
   ],
   [
    "The SYST LED on a switch is amber. What does that suggest?",
    "The switch has power but is not operating properly, for example a failed power-on self-test."
   ]
  ]
 },
 {
  "t": "Reading a network diagram to patch the right cable into the right port",
  "body": [
   "A network diagram is a map of how devices connect. Support technicians are often asked to connect, move or replace a cable according to a diagram, and plugging into the wrong port can put a device in the wrong VLAN, create a loop or take down a link. Reading the diagram carefully and matching it to the physical labels is how you avoid that.",
   "There are two main kinds. A physical diagram shows actual devices, their locations (building, room, rack, rack unit), the specific ports used and the cable types between them. A logical diagram shows how traffic flows: subnets and their IP ranges, VLANs, routing and which devices act as gateways, with less emphasis on physical placement. For patching, you need the physical diagram, but the logical one tells you which network a port should belong to.",
   "Diagrams use standard symbols. In Cisco-style icons, a router is a round cylinder with arrows, a switch is a rectangular box with arrows, a firewall is often a brick wall, an access point is a small device with radio waves, a cloud shape represents the internet or a WAN, and servers and PCs look like simple computers. Lines represent links; solid lines usually mean wired copper or fiber, a lightning-bolt shape often means a serial WAN link, and dashed lines may indicate wireless or logical connections. A legend on the diagram explains any custom symbols.",
   "Interface labels identify each end of a link. Cisco names combine the type and a number: `Gi1/0/24` means GigabitEthernet, switch (stack member) 1, module 0, port 24; `Fa0/1` is FastEthernet; `Te1/1/1` is TenGigabitEthernet, often an uplink or SFP slot. A line labeled `SW1 Gi1/0/48 to R1 Gi0/0/1` tells you exactly which two ports to connect. Diagrams often also show cable IDs, patch panel port numbers and VLAN numbers.",
   "To patch correctly: identify the rack and device from the diagram; confirm the device's hostname label matches; count ports carefully, since many switches number the top row with odd numbers and the bottom row with even numbers; check the patch panel label for the wall jack or cable ID; use the correct cable type (copper or the right fiber with the right connectors); and verify afterwards. Verification can be the port LED turning green, `show interfaces status` showing the port as connected, or `show cdp neighbors` confirming which device is on the other end. Update the diagram and labels if you change anything, so the next person can trust them."
  ],
  "terms": [
   [
    "Physical diagram",
    "A diagram showing real devices, their locations, specific ports and cable types."
   ],
   [
    "Logical diagram",
    "A diagram showing subnets, VLANs, IP addressing and traffic flow rather than physical placement."
   ],
   [
    "Interface identifier",
    "A name such as Gi1/0/24 that gives the interface type and its switch, module and port numbers."
   ],
   [
    "Legend",
    "The key on a diagram that explains its symbols and line styles."
   ]
  ],
  "example": "A ticket asks you to connect a new access point to the switch port shown on the diagram as SW-2F Gi1/0/12, patch panel port 2F-12. You find the rack labeled 2F, patch from panel port 12 to switch port 12 on the top row's even side, and the engineer confirms with `show cdp neighbors` that the access point appears on Gi1/0/12.",
  "tip": "Physical diagrams answer 'which port and cable', logical diagrams answer 'which subnet and VLAN'. In interface names like Gi1/0/24, the last number is the port.",
  "check": [
   [
    "Which kind of diagram shows VLANs and IP subnets?",
    "A logical diagram."
   ],
   [
    "What does the interface name Gi1/0/5 tell you?",
    "It is a Gigabit Ethernet port, on switch or stack member 1, module 0, port 5."
   ]
  ]
 },
 {
  "t": "Device ports: RJ-45 Ethernet, SFP/fiber, console (RJ-45 and USB), management, serial, USB and PoE ports",
  "body": [
   "Network devices have several kinds of ports, and knowing what each one is for helps you connect the right cable and avoid mistakes such as plugging a network cable into a console port.",
   "RJ-45 Ethernet ports carry normal network traffic over twisted-pair copper. Access switches have many of them, often 24 or 48, for connecting endpoints, and they are labeled by speed, such as Fast Ethernet (100 Mbps), Gigabit Ethernet or multi-gigabit. SFP (and SFP+ and similar) ports are empty slots that accept pluggable transceiver modules, most often for fiber connections to other switches, routers or buildings, though copper SFPs also exist. On a switch, SFP ports are usually grouped on the right side and used as uplinks.",
   "The console port provides direct, out-of-band command-line access to the device, independent of the network. It is how you configure a new device that has no IP address yet, or recover one that is unreachable. Traditional Cisco console ports use an RJ-45 connector (usually light blue labeling) with a rollover console cable to a computer's serial port or a USB-to-serial adapter. Many newer devices also have a USB console port (mini-USB or USB-C) that connects directly to a laptop's USB port, sometimes requiring a driver. You then open a terminal emulator at the usual settings of 9600 baud, 8 data bits, no parity, 1 stop bit and no flow control.",
   "A management port (often labeled MGMT) is a dedicated Ethernet port connected to a separate management network, used for SSH, monitoring and file transfer without mixing management traffic with user traffic. It typically does not forward user data. Serial ports on routers were used for older WAN links such as leased lines, connecting to provider equipment; on modern hardware they are less common but still appear in exam topics and lab simulators. USB ports on routers and switches (type A) are for storage: copying configuration files and operating system images to and from a USB flash drive.",
   "PoE (Power over Ethernet) ports are RJ-45 Ethernet ports that also supply electrical power over the same cable to devices such as IP phones, wireless access points and cameras. They are often marked with a lightning symbol or noted in the model name. Not every port on every switch is PoE-capable, so check before plugging in a powered device.",
   "Remember that console and Ethernet ports can both be RJ-45; read the label before connecting."
  ],
  "terms": [
   [
    "Console port",
    "A port for direct out-of-band command-line access to a device, using an RJ-45 rollover cable or USB."
   ],
   [
    "Management port",
    "A dedicated Ethernet port for administrative access over a separate management network."
   ],
   [
    "SFP port",
    "A slot for a pluggable transceiver, commonly used for fiber uplinks."
   ],
   [
    "Serial port",
    "A router port for older WAN connections such as leased lines."
   ],
   [
    "PoE port",
    "An Ethernet port that also supplies electrical power to a connected device."
   ]
  ],
  "example": "A new switch arrives with no configuration. You connect a USB-C cable from your laptop to the switch's USB console port, open a terminal emulator at 9600 baud, and see the initial setup prompt. You set a management IP address so the team can reach it over SSH later.",
  "tip": "Console access works even when the network is down, because it is out-of-band. The default console settings to remember are 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control.",
  "check": [
   [
    "What is the console port used for?",
    "Direct out-of-band command-line access for initial configuration and recovery, independent of network connectivity."
   ],
   [
    "Which type of switch port would you normally use for a fiber link to another building?",
    "An SFP (or SFP+) port with a suitable fiber transceiver."
   ]
  ]
 },
 {
  "t": "Power over Ethernet: powering phones, APs and cameras from the switch",
  "body": [
   "PoE (Power over Ethernet) lets a network cable carry both data and DC electrical power to a device. Instead of running a separate power outlet to every ceiling access point, security camera or desk phone, the switch supplies power down the same Ethernet cable. This simplifies installation, allows devices to be placed where there is no outlet, and lets you power all those devices from a switch that can be protected by a UPS (uninterruptible power supply), keeping phones and cameras running during a power cut.",
   "There are two roles. The PSE (power sourcing equipment) supplies the power; usually this is a PoE switch, or a PoE injector, a small box placed between a non-PoE switch and the device. The PD (powered device) receives it: IP phones, wireless access points, IP cameras, badge readers and some small switches or lights. Before sending power, the PSE performs detection to confirm a PoE device is attached, so plugging a normal laptop into a PoE port is safe. It can also classify how much power the device needs.",
   "IEEE standards define power levels. 802.3af (PoE) provides up to about 15.4 watts per port at the switch. 802.3at (PoE+) provides up to about 30 watts. 802.3bt (sometimes called PoE++ or 4-pair PoE) raises this further, to about 60 watts and up to about 90 to 100 watts in its higher types, by using all four pairs. The device receives a little less than the switch supplies because of losses in the cable. Newer access points and pan-tilt-zoom cameras may need PoE+ or 802.3bt to use all their features. Cisco also had older proprietary PoE methods, and UPOE is Cisco's term for higher-power PoE.",
   "A PoE switch has a total power budget, the maximum wattage it can supply across all ports at once. If too many devices draw power, the switch may refuse to power new devices or turn off low-priority ports. So a 48-port PoE switch might not be able to deliver full PoE+ to every port simultaneously. On Cisco switches, `show power inline` shows the total budget, how much is in use and the power drawn on each port.",
   "Common PoE troubleshooting: a phone or access point that stays dark may be on a non-PoE port, exceed the port's PoE class, or be on a switch that has run out of budget. Cables longer than 100 meters or poor-quality cables can also cause problems. Check the port with `show power inline`, move the device to a known PoE port, or use an injector as a test."
  ],
  "terms": [
   [
    "PoE",
    "Power over Ethernet: sending DC power along with data over a twisted-pair Ethernet cable."
   ],
   [
    "PSE",
    "Power sourcing equipment: the device that supplies PoE, such as a PoE switch or injector."
   ],
   [
    "PD",
    "Powered device: the device receiving PoE, such as an IP phone, access point or camera."
   ],
   [
    "Power budget",
    "The total wattage a PoE switch can supply across all its ports."
   ],
   [
    "PoE injector",
    "A device that adds power to an Ethernet cable when the switch does not provide PoE."
   ]
  ],
  "example": "A school adds ten new security cameras to a switch that already powers 30 phones and 8 access points. Two cameras do not come on. `show power inline` shows the switch is near its power budget, so the team moves some cameras to a second PoE switch and the problem is solved.",
  "tip": "The switch (or injector) is the PSE and the phone, AP or camera is the PD. PoE+ (802.3at) provides about 30 W, basic PoE (802.3af) about 15.4 W. When some PoE devices fail to power on, think power budget.",
  "check": [
   [
    "What is a PoE power budget?",
    "The total wattage a PoE switch can supply across all ports at once; exceeding it leaves some devices unpowered."
   ],
   [
    "Why is it safe to plug a laptop into a PoE port?",
    "The switch detects whether a PoE-capable device is attached before sending power, and does not supply power otherwise."
   ]
  ]
 },
 {
  "t": "Default gateway: why a host needs one and what happens without it",
  "body": [
   "A host can talk directly only to devices on its own subnet. For anything else, including every internet destination, it must send traffic to a router on its subnet that knows how to reach other networks. That router's address, configured on the host, is the default gateway. On a home network, the default gateway is the home router, often 192.168.0.1 or 192.168.1.1; in an office, it is usually a router or Layer 3 switch interface for that VLAN.",
   "Every time a host sends a packet, it decides whether the destination is local or remote by comparing the destination IP address with its own address and subnet mask. If the destination is on the same subnet, the host uses ARP to find the destination's MAC address and sends the frame directly. If it is on a different subnet, the host uses ARP to find the default gateway's MAC address and sends the frame to the gateway, while the IP packet inside is still addressed to the final destination. The router then forwards it onward.",
   "The default gateway is usually supplied by DHCP along with the IP address, mask and DNS servers, or configured manually for devices with static addresses. On Windows, `ipconfig` shows it as Default Gateway; on Linux, `ip route` shows it as `default via`; on Cisco switches configured for management, the command `ip default-gateway` sets it so the switch can be managed from other subnets.",
   "If the default gateway is missing or wrong, the symptoms are distinctive: the host can reach other devices on its own subnet (a printer or a PC next to it), but nothing on other subnets or the internet. Pinging a remote address fails, while pinging a local neighbor works. Typical causes are a mistyped static setting, a gateway address outside the host's subnet, the router interface being down, or a DHCP server that is handing out the wrong option. Another cause is the gateway router itself having no route or internet connection, which looks similar from the user's side.",
   "A standard test sequence is to check `ipconfig` for a gateway, ping the gateway, then ping a remote IP address. If the gateway does not answer (and is known to allow ping), the problem is between the host and the router: cabling, VLAN, or the router interface. If the gateway answers but remote addresses do not, the problem lies beyond the router. Note that name resolution is a separate step; a correct gateway with wrong DNS still lets you reach remote IP addresses but not names."
  ],
  "terms": [
   [
    "Default gateway",
    "The router address a host sends traffic to when the destination is not on its own subnet."
   ],
   [
    "Local destination",
    "An address in the host's own subnet, reached directly by ARP and a frame to that device."
   ],
   [
    "Remote destination",
    "An address on a different subnet, reached by sending the frame to the default gateway."
   ],
   [
    "ip default-gateway",
    "Cisco command that sets the gateway a Layer 2 switch uses for its own management traffic."
   ]
  ],
  "example": "A PC with a manually configured address can print to a printer on its subnet but cannot open any website. `ipconfig` shows the default gateway field is empty. After you add the correct gateway, 10.20.30.1, the PC reaches the internet.",
  "tip": "Classic symptom: local devices work, remote networks and the internet do not. Think missing or wrong default gateway. Also, the gateway must be in the same subnet as the host.",
  "check": [
   [
    "What happens when a host with no default gateway tries to reach a server on another subnet?",
    "It has nowhere to send the packet, so communication with remote networks fails while local communication still works."
   ],
   [
    "When a host sends a packet to a remote network, whose MAC address goes in the frame's destination field?",
    "The default gateway's MAC address."
   ]
  ]
 },
 {
  "t": "Local vs remote networks and how a router decides where to send a packet",
  "body": [
   "A router connects different networks and forwards packets between them. Each router interface belongs to a different subnet, and the router keeps a routing table: a list of known destination networks and how to reach each one. When a packet arrives, the router examines the destination IP address, finds the best matching route and sends the packet out the matching interface toward the next hop.",
   "Routes come from several sources. Directly connected routes are added automatically when an interface is configured with an IP address and is up; the router knows it can reach that subnet directly. On Cisco routers these appear with code C, plus a local route (L) for the router's own interface address. Static routes are entered manually by an administrator, with code S. Dynamic routes are learned from other routers through routing protocols such as OSPF (code O) or EIGRP (code D), which adapt automatically when links change. A default route, 0.0.0.0/0, matches any destination that has no more specific route and usually points toward the internet; on Cisco it shows as S* or as the 'Gateway of last resort'.",
   "When several routes match a destination, the router chooses the longest prefix match, the route with the most specific (longest) prefix. For example, with routes to 10.0.0.0/8, 10.1.0.0/16 and 0.0.0.0/0, a packet to 10.1.5.9 matches all three, but the router uses 10.1.0.0/16 because it is the most specific. A packet to 8.8.8.8 matches only the default route. If no route matches and there is no default route, the router drops the packet and may send an ICMP Destination Unreachable message back to the sender.",
   "After choosing a route, the router decrements the packet's TTL (Time to Live) by one, discarding it if TTL reaches zero, which prevents packets from circling forever in a loop. It then builds a new Layer 2 frame for the outgoing link, addressed to the next-hop router or, if the destination is directly connected, to the destination host itself, using ARP to find the MAC address.",
   "Hosts make a simpler version of this decision: local destinations are sent directly, and everything else goes to the default gateway. The router then repeats the lookup at each hop until the packet reaches the router that is directly connected to the destination network. On a Cisco device, `show ip route` displays the routing table; reading it tells you whether the router knows how to reach a network at all."
  ],
  "terms": [
   [
    "Routing table",
    "A router's list of known networks and the interface or next hop used to reach each."
   ],
   [
    "Directly connected route",
    "A route to a subnet on one of the router's own active interfaces, added automatically."
   ],
   [
    "Static route",
    "A route manually configured by an administrator."
   ],
   [
    "Default route",
    "The 0.0.0.0/0 route used when no more specific route matches, often pointing to the internet."
   ],
   [
    "Longest prefix match",
    "The rule that the most specific matching route wins when several match."
   ]
  ],
  "example": "A branch router has connected routes for 192.168.10.0/24 and 192.168.20.0/24, a static route for 10.0.0.0/8 through a VPN to head office, and a default route to the internet provider. A packet to 10.5.1.1 goes over the VPN, a packet to 192.168.20.7 goes out the local interface, and a packet to a public website goes to the provider.",
  "tip": "When routes overlap, the longest prefix (most specific route) wins, not the one listed first. With no match and no default route, the packet is dropped.",
  "check": [
   [
    "A router has routes to 172.16.0.0/16 and 172.16.4.0/24. Which does it use for 172.16.4.20?",
    "172.16.4.0/24, because it is the longest (most specific) prefix match."
   ],
   [
    "Which routing table code marks directly connected networks on a Cisco router?",
    "C (with L for the router's own interface address)."
   ]
  ]
 },
 {
  "t": "Layer 2 vs Layer 3 switches, and routers vs switches",
  "body": [
   "Switches and routers both forward traffic, but at different layers and for different purposes. Knowing which device does what tells you where a problem can be and which device needs configuring.",
   "A Layer 2 switch connects devices within the same network (the same VLAN or broadcast domain). It forwards Ethernet frames based on destination MAC addresses, which it learns by watching source addresses on each port and storing them in its MAC address table. Each switch port is its own collision domain, and switches forward in hardware at high speed. A Layer 2 switch does not look at IP addresses for forwarding and cannot move traffic between VLANs or subnets on its own; it may have a single IP address, but only for management.",
   "A router connects different networks and forwards packets based on destination IP addresses using its routing table. Every router interface is a separate subnet and a separate broadcast domain, and routers do not forward broadcasts. Routers typically offer features for the network edge and WAN: NAT, VPN termination, firewall functions, various WAN interfaces and routing protocols for exchanging routes with providers. Compared with switches, routers usually have fewer ports.",
   "A Layer 3 switch (multilayer switch) combines both. It switches frames within a VLAN like any Layer 2 switch, and it can also route between VLANs using virtual interfaces called SVIs (switched virtual interfaces), one per VLAN, such as `interface vlan 10` with an IP address that hosts use as their default gateway. Because it routes in hardware, a Layer 3 switch is well suited to fast routing between many internal VLANs in a campus. However, it usually has fewer edge features than a dedicated router, so organizations commonly use Layer 3 switches for internal routing and routers or firewalls at the internet and WAN edge.",
   "In summary: switches create one broadcast domain per VLAN and forward by MAC address; routers separate broadcast domains and forward by IP address; Layer 3 switches do both within the campus. Hubs, which you may still see in exam questions, are Layer 1 devices that repeat every signal out every port and create one big collision domain; switches replaced them.",
   "In the lab, `show mac address-table` shows the Layer 2 view and `show ip route` shows the Layer 3 view. On a Layer 3 switch you will see both, plus `ip routing` enabled in the configuration."
  ],
  "terms": [
   [
    "Layer 2 switch",
    "A switch that forwards frames within a VLAN using MAC addresses."
   ],
   [
    "Router",
    "A device that forwards packets between networks using IP addresses and separates broadcast domains."
   ],
   [
    "Layer 3 switch",
    "A multilayer switch that switches frames and also routes between VLANs, usually through SVIs."
   ],
   [
    "SVI",
    "Switched virtual interface: a virtual VLAN interface with an IP address on a switch, used for management or inter-VLAN routing."
   ],
   [
    "Broadcast domain",
    "The set of devices that receive a broadcast frame; routers and VLANs separate broadcast domains."
   ]
  ],
  "example": "A company's campus has 20 VLANs. Instead of sending all inter-VLAN traffic to the edge router, the core Layer 3 switch has an SVI for each VLAN and routes between them at high speed. The edge router handles only internet traffic, NAT and the VPN to branch offices.",
  "tip": "Switches forward on MAC addresses and routers forward on IP addresses. Routers separate broadcast domains; Layer 2 switches do not (except by VLAN). A Layer 3 switch routes between VLANs using SVIs.",
  "check": [
   [
    "Can a Layer 2 switch route traffic between two VLANs by itself?",
    "No. Traffic between VLANs needs a router or a Layer 3 switch."
   ],
   [
    "What does each router interface represent in terms of broadcast domains?",
    "A separate broadcast domain; routers do not forward broadcasts between interfaces."
   ]
  ]
 },
 {
  "t": "MAC address tables: how a switch learns, forwards, floods and filters",
  "body": [
   "A switch decides where to send each frame using its MAC address table (on Cisco also called the CAM table, for content-addressable memory). Each entry maps a MAC address to a switch port and a VLAN. The table is built automatically, and understanding the four actions a switch takes explains most Layer 2 behavior.",
   "Learning: whenever a frame arrives, the switch looks at its source MAC address and records that the address is reachable through the port the frame came in on, in that VLAN. If the address was already known on a different port, the entry is updated, which is how the switch notices when a device moves. Dynamic entries age out if the address is not seen for a while (on Cisco switches the default aging time is 300 seconds), so the table stays current.",
   "Forwarding: the switch then looks up the frame's destination MAC address. If it finds it, it sends the frame only out of that one port. This is what makes a switch more efficient and more private than a hub, which sends everything everywhere.",
   "Flooding: if the destination MAC address is not in the table (an unknown unicast), the switch sends the frame out every port in the same VLAN except the one it arrived on. When the destination replies, the switch learns its location and later frames are forwarded directly. Broadcast frames (destination FF:FF:FF:FF:FF:FF), such as ARP requests and DHCP Discover messages, are always flooded to all ports in the VLAN, and multicast is flooded unless the switch has features to limit it.",
   "Filtering: if the destination MAC address is known to be on the same port the frame arrived on, the switch drops (filters) the frame, since the destination has already received it on that segment. More generally, filtering means the switch does not send frames out ports where they are not needed.",
   "You can view the table with `show mac address-table` on Cisco switches, which lists VLAN, MAC address, type (DYNAMIC or STATIC) and port. Adding `address 0011.2233.4455` finds one device, and `interface gi1/0/5` shows what is learned on one port. Seeing many MAC addresses on one access port suggests an unmanaged switch or hub attached there; seeing an uplink port with many addresses is normal. Security features such as port security can limit how many MAC addresses a port may learn, which helps defend against MAC flooding attacks that try to fill the table and force the switch to flood traffic."
  ],
  "terms": [
   [
    "MAC address table",
    "A switch's list mapping MAC addresses to ports and VLANs; also called the CAM table."
   ],
   [
    "Learning",
    "Recording a frame's source MAC address against the port it arrived on."
   ],
   [
    "Flooding",
    "Sending a frame out all ports in the VLAN except the incoming one, for broadcasts and unknown destinations."
   ],
   [
    "Filtering",
    "Not forwarding a frame out ports where it is not needed, including dropping it when the destination is on the incoming port."
   ],
   [
    "Aging time",
    "How long a dynamic MAC entry stays without being refreshed; 300 seconds by default on Cisco switches."
   ]
  ],
  "example": "An engineer asks where a user's laptop is plugged in. You run `show mac address-table address a4b1.c2d3.e4f5` and see it on Gi1/0/17 in VLAN 20. The patch panel label for port 17 leads you to the right desk.",
  "tip": "Switches learn from the source address and forward based on the destination address. Unknown unicasts and broadcasts are flooded within the VLAN only, never to other VLANs.",
  "check": [
   [
    "Which address does a switch use to learn, and which to forward?",
    "It learns from the source MAC address and forwards based on the destination MAC address."
   ],
   [
    "What does a switch do with a frame whose destination MAC is not in its table?",
    "It floods the frame out all ports in the same VLAN except the one it arrived on."
   ]
  ]
 },
 {
  "t": "VLANs: separating broadcast domains on one switch; access vs trunk ports",
  "body": [
   "A VLAN (virtual LAN) divides one physical switch, or a group of switches, into several separate logical networks. Each VLAN is its own broadcast domain and normally its own IP subnet. Devices in different VLANs cannot communicate at Layer 2, even when they are plugged into the same switch; traffic between VLANs must go through a router or Layer 3 switch, where it can be controlled with access lists or a firewall.",
   "Organizations use VLANs for several reasons: security (keeping guest, IoT, voice and staff traffic apart), performance (smaller broadcast domains mean less broadcast traffic reaching every device), and flexibility (a user can be placed in the right VLAN regardless of where they physically sit). VLANs are identified by numbers from 1 to 4094, often with names such as 10 STAFF, 20 VOICE and 30 GUEST. VLAN 1 is the default VLAN on Cisco switches, and every port belongs to it until changed; best practice is not to use VLAN 1 for user traffic.",
   "An access port belongs to a single VLAN and connects an end device such as a PC, printer or access point in local mode. Frames on an access port are untagged; the end device does not know about VLANs at all. On Cisco, you configure it with `switchport mode access` and `switchport access vlan 10`. Many access ports also carry a voice VLAN for an IP phone, with the PC plugged into the phone.",
   "A trunk port carries traffic for multiple VLANs over one link, typically between switches, or from a switch to a router or to certain access points and servers. To keep VLANs separate on the shared link, each frame is tagged with its VLAN number using the IEEE 802.1Q standard, which inserts a 4-byte tag into the Ethernet header. One VLAN on the trunk, the native VLAN, is sent untagged (VLAN 1 by default), and the native VLAN must match on both ends. You configure a trunk with `switchport mode trunk`, and can limit which VLANs it carries with `switchport trunk allowed vlan`.",
   "Common problems: a device on the wrong access VLAN gets an address from the wrong subnet or none at all (often an APIPA address); a VLAN missing from a trunk's allowed list means devices in that VLAN on the far switch are cut off; and a native VLAN mismatch produces warnings and misdirected traffic. `show vlan brief` lists VLANs and their access ports, and `show interfaces trunk` shows trunk ports, their native VLAN and the VLANs allowed on them."
  ],
  "terms": [
   [
    "VLAN",
    "A virtual LAN: a logical network on a switch that forms its own broadcast domain, usually its own subnet."
   ],
   [
    "Access port",
    "A switch port assigned to one VLAN, carrying untagged frames to an end device."
   ],
   [
    "Trunk port",
    "A switch port carrying multiple VLANs, identifying each frame with an 802.1Q tag."
   ],
   [
    "802.1Q",
    "The IEEE standard for VLAN tagging that inserts a 4-byte tag into Ethernet frames on trunks."
   ],
   [
    "Native VLAN",
    "The VLAN whose frames cross an 802.1Q trunk untagged; VLAN 1 by default."
   ]
  ],
  "example": "A guest connects a laptop to a spare conference room jack and can see internal file servers. The port was left in the staff VLAN. You set it with `switchport access vlan 30` into the guest VLAN, which reaches only the internet through a firewall, and the laptop gets a guest-subnet address.",
  "tip": "Access port = one VLAN, untagged, to an end device. Trunk port = many VLANs, 802.1Q tagged, usually between switches. Inter-VLAN traffic always needs Layer 3 routing.",
  "check": [
   [
    "Can two PCs on the same switch but in different VLANs communicate without a router?",
    "No. Each VLAN is a separate broadcast domain, so traffic between them must be routed."
   ],
   [
    "What does 802.1Q do on a trunk link?",
    "It inserts a tag in each frame identifying its VLAN so multiple VLANs can share one link."
   ],
   [
    "Which command shows VLANs and their access ports on a Cisco switch?",
    "`show vlan brief`."
   ]
  ]
 },
 {
  "t": "Cable management and labeling in racks and patch panels",
  "body": [
   "In a wiring closet or data center, hundreds of cables may run between patch panels, switches, servers and power strips. Good cable management and labeling make it possible to find the right cable in seconds, trace problems, keep equipment cool and avoid unplugging the wrong thing. Poor management, the tangle sometimes called spaghetti cabling, leads to outages and slow repairs.",
   "Structured cabling is the organized approach used in most buildings. Permanent horizontal cables run from wall jacks in work areas through walls and ceilings to the telecommunications room, where each one terminates on the back of a patch panel. A patch panel is a passive panel of numbered jacks mounted in the rack; it does nothing electrically but provides a tidy, fixed termination point. Short patch cables then connect patch panel ports to switch ports. Changing which switch port a desk uses means moving a short patch cable rather than re-running cable through the building.",
   "Equipment mounts in racks measured in rack units (U); one U is 1.75 inches (44.45 mm) high, and a typical switch is 1U. Cable managers, horizontal ones between patch panels and switches and vertical ones at the rack sides, hold cables in neat paths. Good practices include using the shortest patch cables that reach without strain, routing cables along managers instead of across the front of equipment, respecting a cable's bend radius (especially fiber, which can be damaged by tight bends), using hook-and-loop (Velcro) straps rather than tight zip ties that can crush cables, separating power and data cables, and keeping airflow paths clear so equipment does not overheat. Color coding, for example one color per VLAN or function, helps too if it is documented and used consistently.",
   "Labeling ties the physical world to the documentation. Each wall jack, patch panel port and both ends of every patch cable should carry a unique, consistent label, such as room, panel and port (2F-A-12). Racks and devices should be labeled with names that match the network diagram. Labels should be printed and durable, not handwritten on tape. Documentation, whether a spreadsheet or a cable management system, records which jack connects to which panel port and switch port.",
   "When you move, add or remove a cable, update the labels and records immediately. Out-of-date documentation can be worse than none, because people trust it and patch the wrong port. Before unplugging anything in a production rack, confirm the label, check the diagram and, where possible, verify on the switch which device is on that port."
  ],
  "terms": [
   [
    "Patch panel",
    "A rack-mounted panel of numbered jacks where permanent building cables terminate, connected to switches with short patch cables."
   ],
   [
    "Structured cabling",
    "An organized, standards-based system of horizontal cables, patch panels and patch cords."
   ],
   [
    "Rack unit (U)",
    "The standard height unit for rack equipment, 1.75 inches (44.45 mm)."
   ],
   [
    "Bend radius",
    "The minimum curve a cable can be bent through without damage or signal loss."
   ],
   [
    "Cable manager",
    "Horizontal or vertical rack hardware that routes and holds cables neatly."
   ]
  ],
  "example": "A user in room 214 has no network. Because the wall jack is labeled 2F-B-14, you go straight to patch panel B, port 14, in the second-floor closet, follow the labeled patch cable to switch port Gi1/0/14 and find it seated loosely. Reseating it restores the link in minutes.",
  "tip": "Label both ends of every cable and keep documentation current. Patch panels are passive; they provide organized termination but do not switch or amplify signals.",
  "check": [
   [
    "Why do horizontal building cables end at a patch panel instead of plugging straight into a switch?",
    "It gives a fixed, labeled termination point, so moves and changes only require changing a short patch cable."
   ],
   [
    "Name two cable management practices that protect equipment or cables.",
    "Keeping airflow clear, respecting bend radius, using hook-and-loop straps instead of tight zip ties and separating power from data."
   ]
  ]
 },
 {
  "t": "Troubleshooting methodology: identify the problem, theory, test, plan, fix, verify, document",
  "body": [
   "A structured troubleshooting method keeps you from guessing, making random changes or fixing a symptom while missing the cause. The widely taught approach has these steps, in order.",
   "First, identify the problem. Gather information from the user and the system: what exactly is failing, error messages, when it started, whether it worked before, what changed recently, and how many users are affected. Try to reproduce it. Question the obvious, such as whether the device is powered on and plugged in. If several problems are reported, treat them one at a time.",
   "Second, establish a theory of probable cause. Based on the facts, list likely causes, starting with the simplest and most common. The OSI model provides a framework: a bottom-up approach starts with the physical layer (cable, link light) and moves up; a top-down approach starts with the application; divide and conquer starts in the middle, for example with a ping, and moves up or down depending on the result. Follow-the-path traces traffic from source to destination.",
   "Third, test the theory to determine the cause. Run tests without making disruptive changes: check lights, ping, examine settings. If the test confirms the theory, move on. If not, form a new theory or escalate if you have reached the limit of your access or knowledge.",
   "Fourth, establish a plan of action to resolve the problem and identify its potential effects. Some fixes, like rebooting a switch or changing a VLAN, affect other users. Consider timing, get approval through the change process if required, and plan how to roll back. Fifth, implement the solution or escalate as needed.",
   "Sixth, verify full system functionality and, if applicable, implement preventive measures. Confirm with the user that the problem is solved, not just that your test passed; check that you did not break anything else. If a loose cable was the cause, perhaps secure it; if a setting was wrong, check other devices for the same mistake.",
   "Seventh, document findings, actions and outcomes. Record the symptoms, cause, fix and time in the ticket. Good documentation helps the next technician, reveals recurring problems and builds a knowledge base. Skipping documentation is one of the most common and costly mistakes."
  ],
  "terms": [
   [
    "Theory of probable cause",
    "A reasoned guess at what is causing the problem, based on gathered facts, to be tested."
   ],
   [
    "Bottom-up approach",
    "Troubleshooting that starts at the physical layer and works upward through the OSI model."
   ],
   [
    "Divide and conquer",
    "Starting troubleshooting in the middle of the OSI model and moving up or down based on test results."
   ],
   [
    "Escalation",
    "Passing a problem to someone with more expertise or access when you cannot resolve it."
   ],
   [
    "Verification",
    "Confirming the whole system works for the user after a fix, not just that one test passes."
   ]
  ],
  "example": "Several users on one floor lose network access. You gather facts (all on the same switch, started at 9 a.m., electricians worked there earlier), theorize a power or uplink issue, test by checking the switch LEDs and find the uplink port dark. You plan to reseat the uplink fiber, do it, verify users can work, and document the cause as an uplink cable disturbed during electrical work.",
  "tip": "Know the order: identify, theory, test, plan, implement, verify, document. Documentation is always the last step, and you should consider the impact of a fix before implementing it.",
  "check": [
   [
    "What should you do if testing does not confirm your theory?",
    "Establish a new theory, or escalate if you cannot determine the cause."
   ],
   [
    "What is the final step of the troubleshooting methodology?",
    "Document findings, actions and outcomes."
   ],
   [
    "Why question the user about recent changes?",
    "Recent changes are a very common cause of new problems and can point directly to the likely cause."
   ]
  ]
 },
 {
  "t": "Help desk practice: tickets, gathering information, priorities, escalation and clear documentation",
  "body": [
   "Most entry-level network support happens through a help desk or service desk. Work is tracked in a ticketing system, and the quality of your tickets and communication matters as much as your technical skill, because other people rely on what you record.",
   "A ticket (incident or service request) records one issue from start to finish. A good ticket includes: who reported it and how to contact them; the affected device, location and user count; a clear description of the problem in the user's words and in technical terms; when it started; what has been tried; the priority; and every action taken with timestamps. An incident is something broken or degraded; a service request is a routine ask, such as a new network jack or a password reset.",
   "Gathering information is a skill. Ask open-ended questions to understand the problem ('What happens when you try to open the file?'), then closed questions to confirm details ('Does it happen on Wi-Fi and on the wired dock?'). Find out what changed, whether others are affected, the exact error message (a screenshot is best) and whether it can be reproduced. Listen without interrupting, avoid jargon, restate the problem to confirm understanding and set expectations about what will happen next. Stay patient and professional even when users are frustrated.",
   "Priority is usually based on impact (how many people or how critical a service) and urgency (how quickly it hurts the business). A whole site offline or a server down is high priority; one user's slow printer is low. Many organizations define service level agreements (SLAs) that set response and resolution targets for each priority level.",
   "Escalation means passing a ticket to a higher support tier or a specialist team when it is beyond your knowledge, permissions or time limits. Tier 1 typically handles common issues and triage; tier 2 and 3 handle deeper technical problems. Escalating is not failure; escalating late, or without good notes, is the real problem. When you escalate, include everything you found and tested, so the next person does not repeat your work. Functional escalation goes to a different skill group; hierarchical escalation goes to management, for example when an SLA is at risk.",
   "Clear documentation means writing so someone else can understand it without asking you: specific facts, the commands you ran and their key results, what fixed the issue and confirmation from the user. Close the ticket only after verifying with the user. Recurring issues documented well become knowledge base articles that help everyone solve them faster next time."
  ],
  "terms": [
   [
    "Ticket",
    "A record in a tracking system of one incident or request, from report to resolution."
   ],
   [
    "Priority",
    "The order in which work is handled, based on impact and urgency."
   ],
   [
    "Escalation",
    "Transferring a ticket to a higher tier, specialist team or management."
   ],
   [
    "SLA",
    "Service level agreement: agreed targets for response and resolution times."
   ],
   [
    "Knowledge base",
    "A searchable collection of documented solutions and procedures."
   ]
  ],
  "example": "A caller says 'the internet is down'. By asking questions, you learn that only one website fails, only on her laptop, and it began after a browser update. You record these details, try clearing the browser cache without success, and escalate to the desktop team with your notes, the error screenshot and the exact time it started.",
  "tip": "Escalate with complete notes: symptoms, tests run and results. Priority depends on impact and urgency, so an outage affecting many users outranks a single-user inconvenience.",
  "check": [
   [
    "What two factors usually decide a ticket's priority?",
    "Impact (how many users or how critical the service) and urgency (how quickly it affects the business)."
   ],
   [
    "What should a ticket include when you escalate it?",
    "A clear description, affected users and devices, what you tested and the results, and relevant timestamps and contact details."
   ]
  ]
 },
 {
  "t": "Wireshark: capturing on the right interface, simple display filters and saving a .pcapng file",
  "body": [
   "Wireshark is a free, widely used packet analyzer. It captures frames passing through a network interface and decodes them layer by layer, so you can see exactly what devices are sending. Support technicians use it to confirm whether traffic is leaving a computer, whether a server answers, and where a conversation fails. Capture only on networks where you are authorized, since packets can contain sensitive data.",
   "The first step is choosing the right interface. Wireshark's start screen lists all interfaces, such as Ethernet, Wi-Fi, loopback and VPN adapters, each with a small activity graph (sparkline). Pick the one that is carrying the traffic you care about; if you capture on the Ethernet adapter while the laptop is using Wi-Fi, you will see nothing useful. A computer normally sees only its own traffic plus broadcasts and multicasts on a switched network. To see traffic between other devices, an engineer configures a SPAN (port mirroring) on the switch to copy it to your port. You can also set a capture filter, which limits what is recorded at all (for example `host 10.1.1.5`), useful on busy links.",
   "Once capturing, you see three panes: the packet list (one line per frame with time, source, destination, protocol and a summary), the packet details (the layers expanded: frame, Ethernet, IP, TCP or UDP, application) and the packet bytes in hexadecimal. Press the red square to stop capturing.",
   "Display filters hide packets you do not need without deleting them. Type them into the filter bar; it turns green when the syntax is valid. Useful examples: `ip.addr == 192.168.1.10` (to or from one host), `tcp.port == 443`, `udp.port == 53` or simply `dns`, `http`, `dhcp`, `arp`, `icmp`, and `tcp.flags.syn == 1` for connection attempts. Combine with `&&` (and), `||` (or) and `!` (not), for example `ip.addr == 10.1.1.5 && dns`. Note that display filter syntax differs from capture filter syntax.",
   "Save captures with File, Save As. The default format is .pcapng (PCAP Next Generation), which stores packets plus extra information such as interface details and comments. The older .pcap format is still supported for compatibility with other tools. Saving lets you attach a capture to a ticket for a senior engineer or compare before and after a change. You can also export only displayed packets to keep a file small and focused."
  ],
  "terms": [
   [
    "Wireshark",
    "A packet analyzer that captures and decodes network traffic."
   ],
   [
    "Display filter",
    "A Wireshark expression that shows only matching packets from a capture, such as ip.addr == 10.1.1.5."
   ],
   [
    "Capture filter",
    "A filter applied before capturing that limits which packets are recorded at all."
   ],
   [
    ".pcapng",
    "Wireshark's default capture file format, storing packets plus interface and comment information."
   ],
   [
    "SPAN",
    "Switched Port Analyzer: a switch feature that mirrors traffic from ports or VLANs to a monitoring port."
   ]
  ],
  "example": "A user's PC does not receive an address. You capture on its Ethernet interface, apply the display filter `dhcp` and see repeated Discover messages with no Offer. That shows the PC is asking but no DHCP server is answering, so you save the capture as dhcp-fail.pcapng and attach it to the ticket for the network team.",
  "tip": "Choose the interface that actually carries the traffic. Display filters (like ip.addr == x) change only what you see; capture filters limit what gets recorded. The default save format is .pcapng.",
  "check": [
   [
    "Which display filter shows only traffic to or from 10.0.0.25?",
    "`ip.addr == 10.0.0.25`."
   ],
   [
    "Why might a Wireshark capture on your laptop not show traffic between two other hosts on a switch?",
    "A switch forwards unicast frames only to the destination port, so you need port mirroring (SPAN) to see others' traffic."
   ]
  ]
 },
 {
  "t": "ping, tracert/traceroute, ipconfig/ifconfig/ip and nslookup: running them and reading the results",
  "body": [
   "These four tool families answer the most common questions in network support: what are my settings, can I reach it, which path does traffic take, and does the name resolve. Knowing how to run each and read its output is essential for the exam and daily work.",
   "`ipconfig` (Windows), `ifconfig` (macOS and older Linux) and `ip addr` (modern Linux) show your configuration. Check that the adapter is connected, the IPv4 address is valid for your network (not 169.254.x.x), the subnet mask matches the network, a default gateway is present and, with `ipconfig /all`, that DNS servers and the DHCP server are listed. Many problems are solved just by reading this output carefully.",
   "`ping <target>` tests reachability with ICMP Echo. Success shows replies with round-trip times in milliseconds; the summary shows packet loss. 'Request timed out' means no reply; 'Destination host unreachable' means a router or your own PC could not deliver it; intermittent loss suggests a flaky link or congestion. Useful options include `ping -t` on Windows (continuous until Ctrl+C) and `ping -c 5` on Linux and macOS (send five). Ping outward in steps: loopback, own IP, gateway, remote IP, remote name.",
   "`tracert` (Windows) and `traceroute` (Linux and macOS) show each router hop along the path. They send packets with increasing TTL values; each router that decrements TTL to zero sends back an ICMP Time Exceeded message, revealing its address and timing. Each line shows a hop number, three round-trip times and the router's address or name. An asterisk (*) means no reply within the timeout for that probe. A few asterisks in the middle with later hops answering is normal, because some routers do not reply; a trace that stops at a certain hop and shows only asterisks afterward points to where traffic is being lost or blocked. Windows tracert uses ICMP, while traditional Linux traceroute uses UDP probes by default.",
   "`nslookup <name>` queries DNS. It first shows which DNS server answered, then the resolved addresses. 'Non-authoritative answer' is normal and means the answer came from a server's cache rather than the authoritative server for the domain. Errors such as 'can't find ... Non-existent domain' (NXDOMAIN) mean the name does not exist, or is misspelled, and a timeout means the DNS server could not be reached. You can query a specific server with `nslookup example.com 8.8.8.8` to compare results; if that works while the default fails, the configured DNS server is the problem.",
   "Putting it together: if ping to 8.8.8.8 works but ping to a name fails, focus on DNS with nslookup. If ping to the gateway fails, focus on the local connection. If ping to remote IPs fails beyond the gateway, run tracert to see where it stops."
  ],
  "terms": [
   [
    "ping",
    "A tool that sends ICMP Echo Requests to test reachability and measure round-trip time."
   ],
   [
    "tracert / traceroute",
    "Tools that list each router hop to a destination by using increasing TTL values."
   ],
   [
    "nslookup",
    "A tool that queries DNS servers to resolve names to addresses."
   ],
   [
    "Non-authoritative answer",
    "A DNS answer from a server's cache rather than from the domain's authoritative server."
   ]
  ],
  "example": "A user cannot open the company portal by name. `ipconfig /all` shows correct addresses, ping to the portal's IP works, but `nslookup portal.example.com` times out. `nslookup portal.example.com 10.0.0.53`, using the secondary DNS server, works, so you report that the primary DNS server is not responding.",
  "tip": "IP works but name does not: DNS problem, use nslookup. A traceroute that shows asterisks from one hop onward suggests where traffic is dropped, but single asterisks with later replies are often harmless.",
  "check": [
   [
    "How does traceroute discover each router along a path?",
    "It sends probes with increasing TTL values; each router that drops a probe when TTL hits zero replies with ICMP Time Exceeded, revealing its address."
   ],
   [
    "What does 'Non-authoritative answer' in nslookup mean?",
    "The answer came from a DNS server's cache, not directly from the domain's authoritative server; it is normal."
   ]
  ]
 },
 {
  "t": "How firewalls can make ping or traceroute fail even when the service works",
  "body": [
   "Ping and traceroute are excellent first tests, but they rely on ICMP and, for traceroute, on routers replying with ICMP Time Exceeded messages. Firewalls, including host firewalls on computers and servers, often block some or all ICMP. When that happens, the diagnostic tool fails while the real service, such as a website on TCP 443, works perfectly. You need to recognize this so you do not chase a problem that does not exist.",
   "Why block ICMP? Some administrators do it to make hosts harder to discover with network scans, to reduce the attack surface, or because firewall policies are written to allow only the specific services needed and ICMP simply is not on the list. For example, Windows Defender Firewall blocks inbound ICMP echo requests on many network profiles by default, so pinging another Windows PC often fails even though it is online and sharing files. Many public websites and cloud servers also drop ping. Blocking all ICMP is not ideal, because some ICMP messages are important for proper network operation (IPv6 in particular depends on ICMPv6), but it is common.",
   "Traceroute has more ways to fail. Routers may be configured not to send Time Exceeded messages, or to rate-limit them, producing asterisks for some hops even though traffic passes through them fine. Firewalls may block the probe type: Windows tracert uses ICMP Echo, while Linux and macOS traceroute use UDP probes to high ports by default, and a firewall might allow one but not the other. So a trace that ends in asterisks before the destination does not prove the destination is unreachable for the application.",
   "The right approach is to test the actual service. For a website, open it in a browser or use a tool that connects to the TCP port. On Windows, `Test-NetConnection server.example.com -Port 443` reports whether the TCP connection succeeded. On Linux and macOS, `nc -zv server.example.com 443` (netcat) or `curl -I` to the web address does the same job. If the port test succeeds, the service is reachable regardless of what ping says. Some traceroute versions can also use TCP probes to a service port, which firewalls are more likely to allow.",
   "The reverse is also true: a successful ping does not prove a service works. The host can be up while the web service is stopped or its port is blocked. Always ask what the user actually needs and test that directly. When reporting, say specifically what you tested, for example 'ICMP to the server times out, but TCP 443 connects successfully, so the web service is reachable and ICMP is probably filtered.'"
  ],
  "terms": [
   [
    "ICMP filtering",
    "A firewall policy that blocks some or all ICMP messages, causing ping or traceroute to fail."
   ],
   [
    "Host-based firewall",
    "Firewall software running on a computer that controls its inbound and outbound traffic."
   ],
   [
    "Port test",
    "Checking whether a TCP connection to a specific port succeeds, for example with Test-NetConnection or nc."
   ],
   [
    "Rate limiting",
    "Restricting how many ICMP replies a router sends, which can make some traceroute hops show asterisks."
   ]
  ],
  "example": "A technician reports the company website is down because ping to it times out. You run `Test-NetConnection www.example.com -Port 443` and it reports TcpTestSucceeded: True, and the page loads in a browser. The web server's firewall simply drops ICMP; the service is fine.",
  "tip": "A failed ping does not prove a host or service is down, and a successful ping does not prove the service works. Test the actual port the application uses.",
  "check": [
   [
    "Why might ping to a Windows PC fail even though it is online?",
    "Windows Defender Firewall often blocks inbound ICMP echo requests by default."
   ],
   [
    "How can you confirm a web server is reachable if it does not respond to ping?",
    "Test the service port directly, for example with Test-NetConnection -Port 443, nc -zv, curl or a browser."
   ]
  ]
 },
 {
  "t": "Remote access and data collection: console cable and terminal emulator, SSH vs Telnet, RDP, VPN",
  "body": [
   "Support technicians need to reach devices without always walking up to them, and to collect information such as command output and logs for engineers. The methods differ in whether they need a working network and in how secure they are.",
   "A console connection is physical and out-of-band: it does not depend on the network or the device's IP settings. You connect a console cable from your laptop to the device's console port, using an RJ-45-to-serial rollover cable (often with a USB-to-serial adapter) or a USB console cable, then open a terminal emulator such as PuTTY, Tera Term, SecureCRT or `screen` on macOS and Linux. Select the correct COM port or serial device and the usual settings: 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control. Console access is used for initial setup, password recovery and when the device is unreachable over the network. For data collection, most terminal emulators can log the session to a text file, which you can attach to a ticket.",
   "SSH (Secure Shell, TCP 22) provides encrypted remote command-line access over the network. It protects the login credentials and everything typed or displayed, and is the standard way to manage network devices and Linux servers. Telnet (TCP 23) provides similar command-line access but sends everything, including passwords, in clear text, so anyone capturing traffic can read it. Telnet should not be used for management; it survives mainly on old equipment and in labs. On Cisco devices, the `transport input ssh` setting on the virtual terminal (VTY) lines allows only SSH.",
   "RDP (Remote Desktop Protocol, TCP 3389 by default) gives graphical remote control of a Windows computer's desktop. Technicians use it to administer Windows servers and help users. Because RDP exposed to the internet is a frequent target of password-guessing and exploitation, it should be reached only through a VPN or a secure gateway, with strong passwords and MFA. Remote support tools with screen sharing serve a similar purpose for helping users.",
   "A VPN (virtual private network) is not a management tool by itself but the secure path that lets a remote technician reach internal devices. Once connected to the company VPN, you can SSH to switches or RDP to servers as if you were in the office. Many organizations require VPN or a jump host (a hardened server used as the single entry point for administration) before any management access.",
   "When collecting data for escalation, capture complete output (for example `show running-config`, `show interfaces`, `show logging`), note the time and device name, and remove or protect passwords and other secrets before sharing."
  ],
  "terms": [
   [
    "Out-of-band management",
    "Accessing a device through a path independent of the production network, such as a console port."
   ],
   [
    "Terminal emulator",
    "Software such as PuTTY or Tera Term that provides a text session over serial, SSH or Telnet."
   ],
   [
    "SSH",
    "Secure Shell, encrypted remote command-line access on TCP 22."
   ],
   [
    "Telnet",
    "Unencrypted remote command-line access on TCP 23; not safe for management."
   ],
   [
    "RDP",
    "Remote Desktop Protocol, graphical remote access to Windows computers, TCP 3389 by default."
   ]
  ],
  "example": "A branch switch lost its management IP after a bad change and cannot be reached by SSH. The on-site technician connects a USB console cable, opens PuTTY at 9600 baud on the right COM port and enables session logging. The engineer, on a call, reads the logged output and talks the technician through restoring the configuration.",
  "tip": "Console is out-of-band and works without network settings. Choose SSH over Telnet because Telnet sends passwords in clear text. RDP is graphical Windows access and should sit behind a VPN.",
  "check": [
   [
    "Why is SSH preferred to Telnet for device management?",
    "SSH encrypts the session, including credentials, while Telnet sends everything in clear text."
   ],
   [
    "Which access method still works when a switch has no IP address configured?",
    "A console connection through the console port, because it is out-of-band."
   ]
  ]
 },
 {
  "t": "Cloud-managed devices (for example Cisco Meraki dashboard)",
  "body": [
   "Traditionally, each switch, router, firewall and access point was configured individually, usually by command line over console or SSH, and monitored with separate tools. Cloud-managed networking changes this: devices connect over the internet to a vendor-hosted management platform, and administrators configure and monitor the whole network through a single web dashboard. Cisco Meraki is the best-known example, with its dashboard managing Meraki switches, access points, security appliances, cameras and more.",
   "How it works: a cloud-managed device needs power and an internet connection, usually through DHCP. When it boots, it contacts the vendor's cloud and downloads its configuration from the dashboard. This supports zero-touch provisioning: a device can be shipped to a branch office, assigned to that site's network in the dashboard by serial number, and a non-technical person at the site just plugs it in. The management traffic is separate from user traffic, so if the connection to the cloud is lost, the device normally keeps forwarding traffic using its last configuration; you just cannot change it or see live data until the connection returns.",
   "The dashboard offers a central view: device status (online, offline, alerting), connected clients, bandwidth usage by application, topology maps, event logs and alerts by email or other channels. Firmware updates can be scheduled across many devices at once. Configuration is often done with templates, so many sites share the same settings, which improves consistency. The dashboard also includes troubleshooting tools, such as live ping, traceroute, cable tests and packet captures run from the device itself, which is very useful for a help desk technician who cannot visit the site.",
   "Benefits include easier management of many sites with a small team, fast deployment, consistent configuration and good visibility. Trade-offs include ongoing subscription licensing (the devices need valid licenses to stay managed), dependency on internet connectivity and the vendor's cloud for management, less granular control than a full command line in some cases, and the need to protect dashboard accounts carefully, because one compromised admin login could change the whole network. Use MFA and role-based access, giving help desk staff read-only or limited rights where possible.",
   "For troubleshooting, the first check is often whether the device shows as online in the dashboard. If it is offline, verify power, the uplink cable, that it can get an address and reach the internet, and that firewalls allow its outbound connection to the cloud. The device's status LED often indicates whether it has connected to the cloud."
  ],
  "terms": [
   [
    "Cloud-managed network",
    "Network devices configured and monitored through a vendor-hosted web platform over the internet."
   ],
   [
    "Cisco Meraki dashboard",
    "Cisco's cloud management portal for Meraki switches, access points, security appliances and other devices."
   ],
   [
    "Zero-touch provisioning",
    "Deploying a device that automatically fetches its configuration when connected, with no local setup."
   ],
   [
    "Configuration template",
    "A reusable set of settings applied to many sites or devices for consistency."
   ]
  ],
  "example": "A retail chain opens a new store. Head office claims the new Meraki security appliance, switch and access points in the dashboard and binds them to the store template. The store manager plugs them in, they download their settings, and the help desk sees them come online and runs a remote cable test on one switch port that shows a fault.",
  "tip": "If a cloud-managed device loses its cloud connection, it typically keeps passing traffic with its last configuration; only management and monitoring are lost. The device needs internet access to be managed.",
  "check": [
   [
    "What does a cloud-managed device need in order to receive its configuration?",
    "Power and internet connectivity (usually via DHCP) so it can reach the vendor's cloud management platform."
   ],
   [
    "Name one benefit and one drawback of cloud-managed networking.",
    "Benefit: central management and zero-touch deployment across many sites. Drawback: dependency on the internet and vendor cloud plus ongoing licensing."
   ]
  ]
 },
 {
  "t": "Cisco IOS basics: user vs privileged EXEC, `?` help and tab completion",
  "body": [
   "Cisco IOS (Internetwork Operating System) and its close relatives like IOS XE run most Cisco routers and switches. You interact with it through a command-line interface (CLI) over console, SSH or Telnet. The CLI is organized into modes, each shown by a different prompt, and each allowing different commands.",
   "User EXEC mode is where you land after logging in. The prompt ends with `>`, as in `Switch>`. It allows only limited monitoring commands, such as some `show` commands and `ping`, and you cannot change the configuration or view the full running configuration. Privileged EXEC mode, entered with the `enable` command (often protected by an enable secret password), has a prompt ending in `#`, as in `Switch#`. From here you can run all show and debug commands, copy and save configurations with `copy running-config startup-config`, reload the device and enter configuration mode. Use `disable` to return to user EXEC and `exit` to log out.",
   "Global configuration mode is entered from privileged EXEC with `configure terminal` (commonly shortened to `conf t`), and the prompt becomes `Switch(config)#`. Commands here change the running configuration immediately. From global configuration you can enter sub-modes, such as interface configuration with `interface gigabitethernet1/0/1`, giving `Switch(config-if)#`, or line configuration with `line vty 0 4`. `exit` goes back one level and `end` (or Ctrl+Z) returns straight to privileged EXEC. As a support technician you will mostly work in user and privileged EXEC, running show commands.",
   "Context-sensitive help is built in. Typing `?` at a prompt lists all commands available in the current mode. Typing part of a word followed immediately by `?`, like `sh?`, lists commands starting with those letters. Typing a command, a space and `?`, like `show ?` or `show ip ?`, lists the options that can come next, and `<cr>` in the list means you can press Enter now. This is the fastest way to explore when you do not remember exact syntax.",
   "IOS accepts abbreviations as long as they are unambiguous: `sh ip int br` works for `show ip interface brief`. Pressing Tab completes a partially typed keyword, which confirms that your abbreviation is correct. If IOS does not understand, it shows messages such as '% Invalid input detected at ^ marker', with a caret pointing at the problem, '% Incomplete command' or '% Ambiguous command'. The up arrow (or Ctrl+P) recalls previous commands. Commands entered in configuration mode affect the running configuration in memory; they are saved permanently only when copied to the startup configuration."
  ],
  "terms": [
   [
    "User EXEC mode",
    "The limited initial CLI mode, with a prompt ending in >."
   ],
   [
    "Privileged EXEC mode",
    "The full-access CLI mode entered with enable, with a prompt ending in #."
   ],
   [
    "Global configuration mode",
    "The mode entered with configure terminal, where changes are made to the running configuration."
   ],
   [
    "Context-sensitive help",
    "Using ? to list available commands or the next valid options in the current mode."
   ],
   [
    "Tab completion",
    "Pressing Tab to complete a partially typed IOS keyword."
   ]
  ],
  "example": "Over the phone, an engineer asks you to check interface status. You log in, see `SW-3F>`, type `enable` and the password to reach `SW-3F#`, then type `show ip int?` to confirm the options and run `sh ip int br`. You read the results back to the engineer.",
  "tip": "Prompt ending > means user EXEC, # means privileged EXEC, (config)# means global configuration. `enable` moves up from user to privileged, and `configure terminal` enters global configuration.",
  "check": [
   [
    "What command moves you from user EXEC to privileged EXEC mode?",
    "`enable`."
   ],
   [
    "What is the difference between `sh?` and `show ?`?",
    "`sh?` lists commands starting with 'sh'; `show ?` (with a space) lists the keywords that can follow the show command."
   ],
   [
    "What does the prompt `Router(config-if)#` indicate?",
    "Interface configuration mode."
   ]
  ]
 },
 {
  "t": "Show commands: show running-config, show version, show ip interface brief, show interfaces, show interfaces status, show ip route, show mac address-table, show cdp neighbors, show inventory",
  "body": [
   "Show commands display information without changing anything, which makes them safe for support technicians to run. Most need privileged EXEC mode (the # prompt). Knowing which command answers which question is heavily tested and is exactly what an engineer will ask you to run.",
   "`show running-config` displays the active configuration in memory: hostname, interface settings, VLAN assignments, IP addresses, routing and security settings. Changes take effect here immediately but are lost at reboot unless saved with `copy running-config startup-config`; `show startup-config` shows the saved version. Treat this output as sensitive, since it can contain password hashes and keys. `show version` shows the IOS software version, how long the device has been up (uptime) and why it last restarted, the hardware model, memory, serial number and the configuration register. It is the go-to for 'did this switch reboot?' and 'what software is it running?'.",
   "`show ip interface brief` gives a one-line summary per interface: name, IP address, whether it was assigned manually or by DHCP, Status and Protocol. Status up and Protocol up is healthy. 'administratively down' means someone shut it down with the `shutdown` command. down/down usually means a Layer 1 issue, such as no cable or the far end being off. up/down suggests a Layer 2 issue, such as a keepalive or encapsulation mismatch on a WAN link. `show interfaces` gives full detail for each interface: status, MAC address, MTU, speed and duplex, input and output rates, and error counters such as input errors, CRC errors, collisions and drops. Rising CRC errors point to cabling or interference; late collisions suggest a duplex mismatch. `show interfaces status` on switches lists each port with its description, status (connected, notconnect, err-disabled, disabled), VLAN, duplex, speed and media type, which is the fastest way to find which ports are in use.",
   "`show ip route` displays the routing table, with codes for connected (C), local (L), static (S), and dynamic routes such as OSPF (O), plus the gateway of last resort (default route). Use it to confirm that a router knows how to reach a network. `show mac address-table` lists learned MAC addresses with their VLAN and port, which lets you locate a device on a switch.",
   "`show cdp neighbors` uses CDP (Cisco Discovery Protocol), a Layer 2 protocol Cisco devices use to announce themselves to directly connected neighbors. It lists each neighbor's device ID (hostname), your local interface, holdtime, capabilities (R for router, S for switch, and so on), platform (model) and the neighbor's port. Add `detail` to see neighbors' IP addresses and software versions. It is extremely useful for verifying cabling and building diagrams; LLDP is the vendor-neutral equivalent. `show inventory` lists the hardware components with product IDs and serial numbers, including chassis, modules, power supplies and installed SFP transceivers, useful for warranty and support cases or confirming the right module is installed."
  ],
  "terms": [
   [
    "show running-config",
    "Displays the active configuration in memory."
   ],
   [
    "show version",
    "Displays IOS version, uptime, last reload reason, model, memory and serial number."
   ],
   [
    "show ip interface brief",
    "One-line summary of each interface's IP address, status and protocol."
   ],
   [
    "show cdp neighbors",
    "Lists directly connected Cisco devices, their platforms and the ports that connect them."
   ],
   [
    "show inventory",
    "Lists hardware components, product IDs and serial numbers, including transceivers."
   ]
  ],
  "example": "Users on a floor report an outage that ended on its own. An engineer asks you to run `show version`, which shows an uptime of 12 minutes and a last reload reason of power failure. Then `show cdp neighbors` confirms the uplink to the core switch is back, and `show interfaces status` shows user ports connected again.",
  "tip": "Match the question to the command: uptime or IOS version, show version; IP and up/down status, show ip interface brief; errors and duplex, show interfaces; which device is on the other end, show cdp neighbors; serial numbers and modules, show inventory.",
  "check": [
   [
    "Which command tells you how long a switch has been running since its last reboot?",
    "`show version`, which shows uptime and the reason for the last reload."
   ],
   [
    "An interface shows 'administratively down' in show ip interface brief. What does that mean?",
    "It has been disabled with the shutdown command and must be enabled with no shutdown."
   ],
   [
    "Which command shows the hostname and port of the device plugged into each interface?",
    "`show cdp neighbors` (or LLDP equivalents)."
   ]
  ]
 },
 {
  "t": "How firewalls filter traffic: permit and deny rules, ports and protocols, implicit deny",
  "body": [
   "A firewall is a device or software that controls which traffic may pass between networks or into and out of a host, based on a security policy. It sits at boundaries, such as between the internal network and the internet, between internal zones or on a computer itself, and inspects each packet or connection against an ordered list of rules.",
   "Each rule (on Cisco routers, often an access control entry within an ACL, an access control list) matches traffic using criteria such as source IP address or network, destination IP address or network, protocol (TCP, UDP, ICMP) and source or destination port, and specifies an action: permit (allow) or deny (block, sometimes called drop or reject). For example, a rule might permit TCP from any source to the web server 203.0.113.10 on port 443, and deny TCP from the internet to any internal host on port 3389 (RDP). Rules can also apply to a direction, inbound or outbound, on a particular interface or zone.",
   "Rules are processed from top to bottom, and the first rule that matches decides the action; later rules are not checked. Order therefore matters. A broad 'deny any' placed above a specific permit will block the permitted traffic, and a broad permit above a specific deny makes the deny useless. Good practice is to put specific rules before general ones.",
   "If no rule matches, the implicit deny applies: at the end of every access list and most firewall policies there is an unseen 'deny everything' rule. Anything not explicitly permitted is blocked. This supports the principle of least privilege, allowing only what is needed. It also explains a common mistake: adding an ACL with only deny statements blocks all traffic, because nothing is ever permitted. Many administrators add an explicit deny with logging at the end to record what is being blocked.",
   "Ports and protocols are how firewalls recognize services, so knowing common port numbers helps you read rules: allowing DNS means UDP (and TCP) 53, web means TCP 80 and 443, SSH means TCP 22. Some firewalls go further with application awareness, identifying applications regardless of port.",
   "Whether a blocked connection is dropped silently or rejected changes what the user sees: dropped traffic usually causes a timeout, while a reject sends back a TCP reset or ICMP message so the failure appears quickly. When troubleshooting, firewall logs showing denied connections, with source, destination and port, are one of the most useful clues."
  ],
  "terms": [
   [
    "Firewall",
    "A device or software that permits or denies traffic according to a security policy."
   ],
   [
    "ACL",
    "Access control list: an ordered list of permit and deny statements used to filter traffic."
   ],
   [
    "Implicit deny",
    "The unseen rule at the end of a policy that blocks any traffic not explicitly permitted."
   ],
   [
    "First match",
    "Rule processing where the first rule that matches a packet determines the action."
   ],
   [
    "Least privilege",
    "Allowing only the access necessary and denying everything else."
   ]
  ],
  "example": "An administrator adds a firewall rule permitting HTTPS to a new web server but places it below an existing rule that denies all traffic to that server's subnet. Users cannot connect. Moving the permit rule above the deny rule fixes it, because the firewall stops at the first match.",
  "tip": "Rules are read top-down and the first match wins. Anything not permitted is blocked by the implicit deny at the end.",
  "check": [
   [
    "What happens to traffic that matches no rule in a firewall policy?",
    "It is blocked by the implicit deny at the end of the policy."
   ],
   [
    "Why does rule order matter?",
    "Rules are processed top to bottom and the first match decides, so a general rule above a specific one can override it."
   ]
  ]
 },
 {
  "t": "Stateful firewalls vs simple packet filters; host-based vs network firewalls",
  "body": [
   "Firewalls differ in how much they remember about traffic and where they are placed. Both distinctions appear in exam questions and affect how you troubleshoot.",
   "A simple packet filter, also called a stateless firewall, examines each packet on its own, checking header fields such as source and destination IP address, protocol and ports against its rules. It has no memory of earlier packets. This makes it fast and simple, and standard router ACLs work this way. The drawback is return traffic: when an internal user opens a website, the reply comes back from port 443 to a random high port on the user's computer. A stateless filter must have a rule that permits those replies, which usually means opening a wide range of high ports inbound, which is less secure. Stateless filters are also easier to fool with packets that pretend to be part of an existing conversation.",
   "A stateful firewall tracks connections in a state table. When an internal host starts a connection that the policy allows, the firewall records details such as the addresses, ports and TCP state. Returning packets that match an established connection are allowed automatically, while unsolicited inbound packets that do not match any known connection are dropped. So you only need a rule for the outgoing request; the reply is handled by state. Stateful inspection is more secure and easier to manage, and it is the norm for modern network firewalls, including home routers. Next-generation firewalls (NGFWs) add further capabilities such as application identification, intrusion prevention and user-based rules.",
   "Placement is the other distinction. A network-based firewall is a dedicated appliance, or a function in a router or cloud service, placed at a network boundary to protect everything behind it: at the internet edge, between internal zones or in front of a server network. It enforces one policy for many devices and is managed by the network team. A host-based firewall is software on an individual computer or server, such as Windows Defender Firewall, the macOS application firewall or Linux firewalls managed with tools like `ufw` or `firewalld`. It protects that one device, including from other devices on the same LAN, and it goes with a laptop when it leaves the office.",
   "Defense in depth uses both: a network firewall stops most unwanted traffic at the edge, and host firewalls limit what reaches each device, which slows the spread of malware inside the network. For troubleshooting, remember that a connection can be blocked at either layer. If a service works from the server itself but not from other computers, check the host firewall on the server as well as any network firewall in between."
  ],
  "terms": [
   [
    "Stateless packet filter",
    "A firewall that evaluates each packet independently against rules, without tracking connections."
   ],
   [
    "Stateful firewall",
    "A firewall that tracks connections in a state table and automatically allows matching return traffic."
   ],
   [
    "State table",
    "The firewall's record of active connections used to match returning packets."
   ],
   [
    "Host-based firewall",
    "Firewall software that protects a single device."
   ],
   [
    "Network-based firewall",
    "A firewall at a network boundary that protects all devices behind it."
   ]
  ],
  "example": "A new application server works when tested locally but other PCs cannot connect to it on TCP 8443. The network firewall between the zones allows the port, so you check the server itself and find Windows Defender Firewall blocking inbound 8443. Adding a scoped inbound rule on the host fixes it.",
  "tip": "Stateful firewalls automatically allow replies to permitted outbound connections; stateless filters need explicit rules for return traffic. Host-based protects one device; network-based protects a whole segment.",
  "check": [
   [
    "Why don't you need a separate inbound rule for web replies on a stateful firewall?",
    "It tracks the outbound connection in its state table and automatically permits matching return traffic."
   ],
   [
    "Give one advantage of a host-based firewall over a network firewall.",
    "It protects the device even from other hosts on the same LAN and when the device is on other networks, such as a laptop at home."
   ]
  ]
 },
 {
  "t": "CIA triad: confidentiality, integrity, availability",
  "body": [
   "The CIA triad is the core model of information security. It names the three properties that security controls aim to protect. When you evaluate a risk, an attack or a control, you can ask which of the three it affects.",
   "Confidentiality means information is available only to people and systems authorized to see it. Threats to confidentiality include eavesdropping on unencrypted traffic, stolen passwords, misconfigured file shares and lost laptops. Controls that protect it include encryption (HTTPS, SSH, WPA2 and WPA3 for Wi-Fi, VPNs and full-disk encryption), authentication and access permissions, and data classification so sensitive data is handled carefully. Choosing SSH instead of Telnet is a confidentiality decision.",
   "Integrity means information is accurate and has not been altered without authorization, whether accidentally or deliberately. Threats include an attacker modifying data in transit, malware changing files, or a mistaken configuration change. Controls include hashing (a hash is a fixed-length fingerprint of data; if the data changes, the hash changes), digital signatures, checksums, file integrity monitoring, version control and change management. Network protocols also include integrity checks: Ethernet's frame check sequence detects transmission errors, and TLS and SSH detect tampering. Verifying a downloaded software image's published hash before installing it on a switch is an integrity check.",
   "Availability means systems and data are accessible to authorized users when needed. Threats include hardware failure, power outages, natural disasters, misconfiguration, ransomware that encrypts data, and denial-of-service attacks. Controls include redundancy (dual power supplies, redundant links, clustered servers), UPS units and generators, backups and disaster recovery plans, patching, capacity planning and DDoS protection. For a network technician, availability is often the most visible property: when the network is down, everyone notices.",
   "The three properties can conflict. Adding more authentication steps improves confidentiality but can slow users; making data widely replicated improves availability but creates more copies to protect. Security design is about balancing them to suit the organization's needs. You may also see related concepts alongside the triad, such as authentication, authorization and accounting (AAA) and non-repudiation, which means a person cannot credibly deny an action they took, often supported by digital signatures and logs."
  ],
  "terms": [
   [
    "Confidentiality",
    "Ensuring information is accessible only to those authorized, typically protected by encryption and access control."
   ],
   [
    "Integrity",
    "Ensuring information is accurate and unaltered, protected by hashing, signatures and change control."
   ],
   [
    "Availability",
    "Ensuring systems and data are accessible when needed, protected by redundancy, backups and resilience."
   ],
   [
    "Hash",
    "A fixed-length value computed from data; any change in the data produces a different hash."
   ]
  ],
  "example": "A clinic encrypts its laptops (confidentiality), verifies hashes on software updates and logs record changes (integrity), and runs its internet connection through two providers with a UPS on its core switch (availability). A ransomware attack that encrypts patient files would harm availability, and if data was copied out first, confidentiality too.",
  "tip": "Map the scenario to one property: data seen by the wrong person means confidentiality; data changed means integrity; system unreachable means availability. A DoS attack targets availability.",
  "check": [
   [
    "Which element of the CIA triad does a DDoS attack mainly target?",
    "Availability."
   ],
   [
    "What security property does verifying a file's hash protect?",
    "Integrity, by confirming the file has not been altered."
   ]
  ]
 },
 {
  "t": "Vulnerability, threat, exploit and risk",
  "body": [
   "Security discussions use four related terms precisely, and exam questions often test whether you can tell them apart. Think of them as a chain: a threat uses an exploit against a vulnerability, and risk is how likely and how damaging that would be.",
   "A vulnerability is a weakness that could be used to cause harm. It can be in software (an unpatched bug in a router's operating system or a web application), in configuration (default passwords left unchanged, Telnet enabled, an overly permissive firewall rule, an open Wi-Fi network), in hardware, or in people and processes (staff untrained to spot phishing, no backup procedure). Vulnerabilities exist whether or not anyone is currently attacking. Publicly known software vulnerabilities are catalogued with CVE (Common Vulnerabilities and Exposures) identifiers, which vendors and security tools use to refer to them consistently.",
   "A threat is anything with the potential to cause harm by taking advantage of a vulnerability. A threat actor is the person or group behind a deliberate threat: criminals seeking money, hacktivists, nation-state groups, or insiders such as a disgruntled employee. Threats also include non-malicious events: accidental deletion, hardware failure, fire, flood or power loss.",
   "An exploit is the specific method, tool or code used to take advantage of a vulnerability. If a vulnerability is an unlocked window, the exploit is the act of climbing through it. A zero-day is a vulnerability that attackers know about and exploit before the vendor has released a fix, which makes it especially dangerous.",
   "Risk is the potential for loss, commonly described as likelihood multiplied by impact: how probable it is that a threat will exploit a vulnerability, and how bad the consequences would be. A severe vulnerability on an isolated lab device may be lower risk than a moderate one on an internet-facing server. Organizations manage risk in four ways: mitigate (reduce it with controls such as patching, MFA or firewalls), transfer (shift it, for example through cyber insurance or a service contract), accept (acknowledge it when the cost of fixing outweighs the risk) or avoid (stop the risky activity entirely).",
   "For network support work, the practical takeaways are to keep devices patched, change default credentials, disable unneeded services, and report anything suspicious. Vulnerability scanners find known weaknesses, and a penetration test, carried out only with written authorization, checks whether they can actually be exploited."
  ],
  "terms": [
   [
    "Vulnerability",
    "A weakness in software, configuration, hardware or process that could be used to cause harm."
   ],
   [
    "Threat",
    "A potential cause of harm, deliberate or accidental, that could take advantage of a vulnerability."
   ],
   [
    "Exploit",
    "The method or code used to take advantage of a specific vulnerability."
   ],
   [
    "Risk",
    "The likelihood that a threat exploits a vulnerability combined with the impact if it does."
   ],
   [
    "Zero-day",
    "A vulnerability exploited before the vendor has made a fix available."
   ]
  ],
  "example": "A vendor announces that a router software version has a flaw allowing remote attackers to crash the device. The flaw is the vulnerability, attackers scanning the internet are the threat, the crafted traffic they send is the exploit, and because your router's management interface faces the internet, the risk is high, so you patch it and restrict management access that night.",
  "tip": "Vulnerability = weakness; threat = who or what could cause harm; exploit = how it is done; risk = likelihood times impact. Patching removes vulnerabilities; it does not remove threats.",
  "check": [
   [
    "An administrator leaves a switch with its default password. Is that a threat, vulnerability or exploit?",
    "A vulnerability, a weakness that a threat could exploit."
   ],
   [
    "What are the four common ways to handle risk?",
    "Mitigate, transfer, accept or avoid."
   ]
  ]
 },
 {
  "t": "Malware types, phishing and other social engineering, DoS and DDoS",
  "body": [
   "Many security incidents start with malicious software, deception of people, or attacks that overload services. You need to recognize each type well enough to spot symptoms and take the right first steps.",
   "Malware is software designed to cause harm. A virus attaches to a legitimate file or program and spreads when that file is run or shared. A worm spreads by itself across the network by exploiting vulnerabilities, without user action, which can cause sudden network-wide slowdowns. A Trojan disguises itself as useful software but carries a hidden malicious function. Ransomware encrypts files, and sometimes steals them, then demands payment for the key; it attacks availability and often confidentiality. Spyware and keyloggers secretly collect information such as passwords. A rootkit hides deep in the operating system to conceal itself and other malware. A bot is an infected device controlled remotely as part of a botnet, often used for spam or DDoS attacks. Defenses include keeping systems patched, endpoint protection (antivirus or EDR), least privilege, email filtering, backups kept offline or immutable, and user awareness.",
   "Social engineering manipulates people rather than technology, exploiting trust, urgency, fear or helpfulness. Phishing uses fraudulent emails that impersonate trusted organizations to get victims to click a malicious link, open an attachment or enter credentials on a fake sign-in page. Spear phishing targets specific individuals using personal details, and whaling targets executives. Vishing uses voice calls, for example someone pretending to be from the help desk asking for a password, and smishing uses text messages. In-person techniques include tailgating (following an authorized person through a secure door) and shoulder surfing. Warning signs include urgency, unexpected attachments, mismatched sender addresses and requests for credentials or payments. The defense is training plus procedures: verify requests through a known channel, never share passwords (a real help desk will not ask for yours) and report suspicious messages.",
   "A DoS (denial-of-service) attack tries to make a service unavailable by overwhelming it with traffic or requests, or by triggering a crash. A DDoS (distributed denial-of-service) attack does the same from many sources at once, usually a botnet of thousands of compromised devices, including poorly secured IoT devices. Because the traffic comes from everywhere, blocking a single source does not work. Symptoms include a sudden, massive traffic spike, saturated internet links and unresponsive services. Mitigation includes upstream filtering by the internet provider, cloud-based DDoS protection services, rate limiting and having redundant capacity. DoS attacks target availability.",
   "As a support technician, your role is usually to recognize and report quickly: isolate a suspected infected machine from the network, follow the incident response procedure, and preserve information rather than wiping evidence."
  ],
  "terms": [
   [
    "Worm",
    "Malware that spreads across networks by itself without user action."
   ],
   [
    "Ransomware",
    "Malware that encrypts data and demands payment for its release."
   ],
   [
    "Phishing",
    "Fraudulent messages that trick people into revealing information, clicking malicious links or opening malicious files."
   ],
   [
    "Social engineering",
    "Manipulating people into breaking security practices or giving up information."
   ],
   [
    "DDoS",
    "Distributed denial of service: overwhelming a target with traffic from many sources, usually a botnet."
   ]
  ],
  "example": "A user reports that a 'CEO' emailed asking her to urgently buy gift cards and send the codes. The sender's address is an outside domain with a similar name. You recognize whaling-style phishing and business email compromise tactics, tell her not to respond, and report it to security, who block the sender and warn other staff.",
  "tip": "Worms spread by themselves; viruses need a host file and user action; Trojans pretend to be legitimate. DoS comes from one source, DDoS from many, and both attack availability.",
  "check": [
   [
    "What is the main difference between a virus and a worm?",
    "A virus needs a host file and user action to spread; a worm spreads across the network on its own."
   ],
   [
    "Why is a DDoS attack harder to stop than a DoS attack?",
    "The traffic comes from many distributed sources, so blocking one address does not stop it."
   ]
  ]
 },
 {
  "t": "Authentication basics: strong passwords, MFA, changing default credentials",
  "body": [
   "Authentication is proving you are who you claim to be. It is the first step of access control, followed by authorization (what you are allowed to do) and accounting (recording what you did), together known as AAA. Weak authentication is one of the most common ways attackers get in, so these basics matter for both users and network devices.",
   "Authentication factors fall into categories: something you know (a password or PIN), something you have (a phone app, hardware security key or smart card) and something you are (a fingerprint or face). Some systems also consider somewhere you are (location). MFA (multifactor authentication) requires two or more different categories. A password plus a code from an authenticator app is MFA; a password plus a security question is not, because both are things you know. MFA blocks most attacks that rely on stolen or guessed passwords, because the attacker also needs the second factor. Phishing-resistant methods such as hardware security keys and passkeys offer the strongest protection; codes sent by SMS are better than nothing but weaker, because they can be intercepted or redirected.",
   "Strong passwords resist guessing and cracking. Length matters most: a long passphrase of several unrelated words is both strong and memorable. Passwords should be unique for each account, so a breach of one site does not unlock others (credential stuffing uses leaked passwords on other sites). Avoid dictionary words alone, personal information and common patterns. Password managers make unique, long passwords practical. Current guidance generally favors length and checking against known-breached passwords over forcing frequent changes, though you should change a password immediately if it may be compromised. Account lockout or rate limiting after repeated failures slows brute-force attacks.",
   "Default credentials are a major risk. Routers, switches, access points, cameras, printers and IoT devices often ship with well-known usernames and passwords, sometimes printed in public manuals. Attackers and botnets scan for devices still using them. Change default credentials during initial setup, before connecting the device to production networks, and disable or rename unused default accounts where possible. On Cisco devices, configure an `enable secret` (which is stored hashed) rather than the older `enable password`, create local user accounts with strong passwords, use `service password-encryption` to hide other passwords in the configuration (a weak obscuring, not strong encryption), and prefer centralized authentication with a RADIUS or TACACS+ server in larger networks.",
   "Also protect accounts in daily practice: lock your screen when you step away, never share credentials, and treat anyone asking for your password as a possible social engineer."
  ],
  "terms": [
   [
    "Authentication",
    "Verifying the identity of a user or device."
   ],
   [
    "MFA",
    "Multifactor authentication: requiring factors from two or more different categories, such as know, have and are."
   ],
   [
    "Passphrase",
    "A long password made of several words, easier to remember and harder to crack."
   ],
   [
    "Default credentials",
    "Factory-set usernames and passwords that are widely known and must be changed."
   ],
   [
    "AAA",
    "Authentication, authorization and accounting: verifying identity, granting permissions and logging activity."
   ]
  ],
  "example": "A small business installs new IP cameras and leaves them on their default admin password. Weeks later, they are found participating in a botnet. After resetting them, the technician sets unique strong passwords, updates firmware, places them on an isolated VLAN and enables MFA on the camera vendor's cloud account.",
  "tip": "MFA needs different factor categories; two passwords or a password plus a PIN is still single-factor. Changing default credentials is one of the first steps when installing any device.",
  "check": [
   [
    "Is a password plus a security question multifactor authentication? Why?",
    "No. Both are something you know, so it is a single factor used twice."
   ],
   [
    "Why should default credentials be changed before a device goes into service?",
    "They are publicly known and attackers scan for devices still using them."
   ]
  ]
 },
 {
  "t": "Home router wireless security: WPA2 vs WPA3, Personal (pre-shared key) vs Enterprise (802.1X)",
  "body": [
   "Wireless signals travel through walls and beyond the building, so anyone nearby can pick them up. Wireless security protocols provide authentication (who may join) and encryption (keeping traffic private over the air). On a home or small office router, you choose the security mode in the wireless settings, and choosing well is one of the most effective ways to protect the network.",
   "WPA2 (Wi-Fi Protected Access 2) has been the baseline for many years. It uses AES encryption through CCMP (a protocol built on the Advanced Encryption Standard), which is strong. WPA2 has weaknesses, though. In Personal mode, anyone who captures the four-way handshake when a device connects can attempt an offline dictionary attack to guess the passphrase, so weak passphrases can be cracked. WPA2 also does not protect management frames by default. Always choose WPA2 with AES, not the older TKIP option, if WPA2 is used.",
   "WPA3 is the current standard. In Personal mode it replaces the pre-shared key exchange with SAE (Simultaneous Authentication of Equals), which resists offline dictionary attacks; an attacker must interact with the network for every guess. It also provides forward secrecy, so capturing traffic today and learning the password later does not decrypt the old traffic, and it requires Protected Management Frames. WPA3-Enterprise offers an optional stronger 192-bit security mode. Many routers offer a WPA2/WPA3 transition (mixed) mode so older devices can still connect, at the cost of keeping WPA2 weaknesses for those clients. Use WPA3 where all devices support it; otherwise use transition mode or WPA2-AES with a long passphrase.",
   "Both WPA2 and WPA3 come in two modes. Personal (PSK, pre-shared key) mode uses one passphrase shared by everyone. It is simple and suits homes and small offices, but everyone with the passphrase has the same access, and when someone leaves you must change it on every device. Enterprise mode uses 802.1X: each user or device authenticates individually, with a username and password or a certificate, against an authentication server, usually RADIUS. The access point acts as the authenticator, passing credentials to the server using EAP (Extensible Authentication Protocol). Enterprise mode lets you disable one person's access without affecting others, provides per-user accountability and generates unique encryption keys for each session. It requires more infrastructure, so it is typical of businesses, schools and campuses.",
   "Other good home router practices: change the router's default admin password, keep firmware updated, disable remote administration from the internet unless needed, use a separate guest network for visitors and IoT devices, and choose a long, unique passphrase. Changing the SSID from its default name is sensible, but hiding it is not a real security measure."
  ],
  "terms": [
   [
    "WPA2",
    "Wi-Fi Protected Access 2, using AES-CCMP encryption; Personal mode is vulnerable to offline passphrase guessing."
   ],
   [
    "WPA3",
    "The current Wi-Fi security standard, using SAE in Personal mode and requiring Protected Management Frames."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals, WPA3-Personal's handshake that resists offline dictionary attacks."
   ],
   [
    "Personal (PSK) mode",
    "Wi-Fi security using one shared passphrase for all users."
   ],
   [
    "Enterprise (802.1X) mode",
    "Wi-Fi security where each user or device authenticates individually through a RADIUS server."
   ]
  ],
  "example": "A small accounting firm has 15 staff sharing one WPA2 passphrase that was never changed after several employees left. The consultant moves the office network to WPA3-Enterprise with 802.1X using the firm's existing user accounts, so leaving staff lose access when their account is disabled, and sets up a separate WPA3-Personal guest network.",
  "tip": "Personal = one shared passphrase; Enterprise = individual credentials through 802.1X and RADIUS. WPA3-Personal's SAE defeats offline dictionary attacks that threaten WPA2-Personal.",
  "check": [
   [
    "What does WPA3-Personal use instead of the WPA2 pre-shared key handshake, and why does it matter?",
    "SAE (Simultaneous Authentication of Equals), which resists offline dictionary attacks on the passphrase."
   ],
   [
    "What server usually checks credentials in WPA2/WPA3-Enterprise?",
    "A RADIUS server, with the access point passing the 802.1X/EAP authentication to it."
   ],
   [
    "Why is Enterprise mode better when employees leave often?",
    "Each user has individual credentials, so you disable one account instead of changing a shared passphrase on every device."
   ]
  ]
 },
 {
  "t": "Why WEP and open networks should not be used, and why WPS should be turned off",
  "body": [
   "Some wireless options remain available on routers for backward compatibility even though they provide little or no protection. Recognizing them and knowing why to avoid them is basic security hygiene and a common exam topic.",
   "WEP (Wired Equivalent Privacy) was the original 802.11 security method. It used the RC4 cipher with short initialization vectors (IVs) that repeat quickly on a busy network, plus weak key handling and no real integrity protection. Researchers showed that by collecting enough traffic, the WEP key can be recovered in a short time using freely available tools, regardless of how complex the key is. WEP was officially deprecated many years ago and replaced first by WPA and then WPA2. If a device supports only WEP, it should be replaced or kept on an isolated network, not used as a reason to weaken the whole network. The original WPA with TKIP is also deprecated and should not be selected.",
   "An open network has no authentication and no encryption at the Wi-Fi layer. Anyone in range can join, and anyone nearby can capture unencrypted traffic out of the air. Open networks also make it easy for attackers to set up an evil twin, a rogue access point with the same SSID that tricks devices into connecting to it so the attacker can intercept or redirect traffic. Public hotspots are often open with a captive portal; the portal's sign-in page does not encrypt the wireless link. Users on open networks should rely on HTTPS and a VPN. For guest access, a better choice is WPA3 with a simple shared passphrase or Wi-Fi Enhanced Open (OWE, Opportunistic Wireless Encryption), which encrypts each client's traffic without requiring a password.",
   "WPS (Wi-Fi Protected Setup) was designed to make joining a network easy, by pressing a button on the router or entering an 8-digit PIN. The PIN method has a serious design flaw: the router checks the PIN in two halves, and the last digit is a checksum, which reduces the number of possible combinations to about 11,000. An attacker within range can brute-force it in hours, and once the PIN is found, the router reveals the actual WPA2 passphrase, no matter how strong it is. Some routers do not fully disable WPS even when the setting appears off, and some lack lockout protection. The push-button method is less risky but still opens a short window when anyone nearby can join. Best practice is to turn WPS off completely in the router settings and use a strong passphrase or QR-code sharing instead.",
   "When you audit a home or small office router, check for these three settings first: no WEP or TKIP, no open network for staff or family, and WPS disabled."
  ],
  "terms": [
   [
    "WEP",
    "Wired Equivalent Privacy, the original Wi-Fi encryption, now broken and deprecated."
   ],
   [
    "Open network",
    "A Wi-Fi network with no authentication or encryption at the wireless layer."
   ],
   [
    "WPS",
    "Wi-Fi Protected Setup, an easy-join feature whose PIN method can be brute-forced to reveal the passphrase."
   ],
   [
    "Evil twin",
    "A rogue access point that imitates a legitimate SSID to lure users into connecting."
   ],
   [
    "Enhanced Open (OWE)",
    "A Wi-Fi mode that encrypts traffic on open networks without requiring a password."
   ]
  ],
  "example": "During a home office check, you find the router uses WPA2-AES with a strong passphrase, but WPS PIN is enabled. Because an attacker nearby could brute-force the PIN and recover the passphrase, you disable WPS, update the router firmware and confirm the setting remains off after a reboot.",
  "tip": "WPS PIN attacks recover the passphrase itself, so a strong password does not help while WPS is on. WEP is broken no matter how long the key is, and open networks provide no over-the-air encryption.",
  "check": [
   [
    "Why doesn't a long, complex key make WEP secure?",
    "WEP's design flaws, such as short repeating IVs and weak key handling, let attackers recover the key from captured traffic regardless of its complexity."
   ],
   [
    "What does an attacker gain by cracking a router's WPS PIN?",
    "The router reveals the network's WPA/WPA2 passphrase, giving full access to the network."
   ]
  ]
 }
]);
