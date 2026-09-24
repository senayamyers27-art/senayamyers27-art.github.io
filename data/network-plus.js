/* CompTIA Network+ N10-009 — generated plan (no hand-written weeks). */
CertHub.register({
  id: "network-plus",
  vendor: "CompTIA",
  name: "CompTIA Network+",
  short: "Network+",
  exam: "N10-009",
  blurb: "Core networking certification: concepts, implementation, operations, security and troubleshooting.",
  status: "verified",
  statusNote: "Weights confirmed against CompTIA's N10-009 objectives on Sept 24, 2026.",
  lastVerified: "2026-09-24",
  notices: [],
  examInfo: { questions: "Up to 90 (multiple choice and PBQs)", minutes: 90, pass: "720 on a 100–900 scale" },
  examSim: { questions: 90, minutes: 90 },
  sources: [{ label: "CompTIA Network+ N10-009 exam objectives", url: "https://www.comptia.org/certifications/network" }],
  planWeeks: 12,

  domains: [
    {
      id: 1,
      name: "Networking concepts",
      w: 23,
      topics: [
        "OSI model layers and the data unit at each layer",
        "Network appliances: routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS/SAN, wireless controllers",
        "Network functions: CDN, VPN, QoS, TTL",
        "Cloud concepts: NFV, VPC, security groups, cloud gateways, deployment and service models (IaaS, PaaS, SaaS)",
        "Common ports and protocols: FTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP/S, NTP, SNMP, LDAP/S, SMB, Syslog, SQL, RDP, SIP",
        "Protocol types (TCP, UDP, ICMP, GRE, IPsec) and traffic types (unicast, multicast, anycast, broadcast)",
        "Transmission media and transceivers: copper categories, single-mode vs multimode fiber, coax, SFP/QSFP, connectors",
        "Topologies and architectures: mesh, star, hub and spoke, spine and leaf, three-tier, collapsed core, north-south vs east-west",
        "IPv4 addressing: public vs private (RFC 1918), APIPA, loopback, classes, subnetting and VLSM, CIDR",
        "Evolving use cases: SDN and SD-WAN, VxLAN, zero trust, SASE/SSE, infrastructure as code",
        "IPv6: address types, dual stack, tunneling, NAT64"
      ],
      notes: ["Objectives 1.1–1.8"],
      labs: [
        "Open Wireshark, load a web page and label one packet's Ethernet, IP, TCP and HTTP/TLS headers with their OSI layers.",
        "Run `netstat -an` (or `ss -tuln` on Linux) and match every listening port to its protocol; then build a port-number flashcard set from the objectives list.",
        "Subnet 10.10.0.0/16 by hand into VLSM blocks for 500, 200, 60 and 2 hosts, then check your answers with `ipcalc` or an online calculator."
      ]
    },
    {
      id: 2,
      name: "Network implementation",
      w: 20,
      topics: [
        "Static vs dynamic routing; OSPF, EIGRP and BGP; route selection (longest prefix, administrative distance, metrics)",
        "NAT and PAT, first hop redundancy (FHRP/VRRP/HSRP), subinterfaces",
        "VLANs, VLAN database, SVIs, 802.1Q trunking, native and voice VLANs",
        "Interface settings: speed, duplex, MTU and jumbo frames, link aggregation",
        "Spanning Tree Protocol and loop prevention",
        "Wireless channels and bands: 2.4, 5 and 6 GHz, channel width, non-overlapping channels, regulatory impacts",
        "802.11 standards, SSID/BSSID/ESSID, autonomous vs controller-based APs, mesh networks",
        "Wireless security: WPA2/WPA3 Personal and Enterprise, PSK vs 802.1X, captive portals; antenna types",
        "Physical installation: IDF/MDF, rack sizes, port-side exhaust/intake, cable management, patch panels",
        "Power and environment: UPS, PDU, PoE/PoE+ budgets, temperature, humidity, fire suppression"
      ],
      notes: ["Objectives 2.1–2.4"],
      labs: [
        "In Cisco Packet Tracer, build two routers with three LANs, configure single-area OSPF and use `show ip route` to explain each route and its administrative distance.",
        "In Packet Tracer, create VLANs 10 and 20 on two switches, join them with an 802.1Q trunk and set up router-on-a-stick so the VLANs can reach each other.",
        "Use a free Wi-Fi analyzer app (or `netsh wlan show networks mode=bssid` on Windows) to map nearby APs by band and channel, and propose a non-overlapping 2.4 GHz plan."
      ]
    },
    {
      id: 3,
      name: "Network operations",
      w: 19,
      topics: [
        "Documentation: physical vs logical diagrams, rack diagrams, cable maps, IPAM, asset inventory, SLAs, wireless surveys",
        "Life-cycle management: end of life/support, software and firmware management, decommissioning",
        "Change management and configuration management: baselines, golden configs, backups",
        "Monitoring: SNMP versions, traps, MIBs, flow data, packet capture, baselines, log aggregation and syslog, API integration",
        "Monitoring solutions: network discovery, traffic analysis, performance and availability monitoring, configuration monitoring",
        "Disaster recovery metrics: RPO, RTO, MTTR, MTBF; hot, warm and cold sites; active-active vs active-passive; DR testing",
        "DHCP: scopes, exclusions, reservations, lease time, options, relay/IP helper; SLAAC for IPv6",
        "DNS: record types (A, AAAA, CNAME, MX, TXT, NS, PTR, SOA), zones, recursive vs authoritative, DNSSEC, DoH/DoT, hosts file",
        "Time protocols: NTP, PTP and NTS",
        "Access and management methods: site-to-site and client VPNs, SSH, GUI, API, console, jump box, in-band vs out-of-band"
      ],
      notes: ["Objectives 3.1–3.5"],
      labs: [
        "Draw both a physical and a logical diagram of your home or Packet Tracer network (draw.io is free), including an IP address table.",
        "Install Wireshark, capture a DHCP exchange with `ipconfig /release` and `ipconfig /renew` (or `dhclient -r` and `dhclient`), and identify the four DORA packets and their options.",
        "Use `nslookup` or `dig` to query A, AAAA, MX, TXT, NS and PTR records for a public domain, and use `dig +trace` to follow resolution from the root down."
      ]
    },
    {
      id: 4,
      name: "Network security",
      w: 14,
      topics: [
        "Logical security: encryption in transit and at rest, PKI and certificates, IAM, AAA, MFA, SSO, RADIUS, TACACS+, LDAP, SAML",
        "Security principles: least privilege, role-based access, CIA triad, defense in depth, zero trust, segmentation",
        "Physical security, deception technologies (honeypots, honeynets), risk terms, audits and compliance (PCI DSS, GDPR)",
        "Network segmentation enforcement for IoT, IIoT, SCADA/ICS/OT, guest and BYOD",
        "Attacks: DoS/DDoS, VLAN hopping, MAC flooding, ARP and DNS poisoning/spoofing, rogue DHCP and APs, evil twin, on-path",
        "Social engineering: phishing, dumpster diving, shoulder surfing, tailgating; malware",
        "Device hardening: disable unused ports and services, change default passwords, secure management protocols",
        "Switch security: port security, DHCP snooping, dynamic ARP inspection, BPDU guard",
        "Network access control: 802.1X, MAC filtering, key management",
        "Security rules: ACLs, implicit deny, URL and content filtering, zones and screened subnets"
      ],
      notes: ["Objectives 4.1–4.3"],
      labs: [
        "In Packet Tracer, configure port security (maximum 2 MACs, violation shutdown) on an access port, trigger a violation and recover the port.",
        "In Packet Tracer, write an extended ACL that allows only HTTP/HTTPS from a user VLAN to a server subnet, and prove the implicit deny blocks everything else.",
        "Open a sample ARP spoofing capture in Wireshark (from the Wireshark sample captures wiki) and use `arp.duplicate-address-detected` to find the attacker's MAC."
      ]
    },
    {
      id: 5,
      name: "Network troubleshooting",
      w: 24,
      topics: [
        "The seven-step troubleshooting methodology and its order",
        "Cabling issues: wrong cable type, signal degradation, crosstalk, EMI, attenuation, improper termination, TX/RX transposed",
        "Interface issues: increasing CRC and runt/giant counters, port status, duplex and speed mismatches",
        "Hardware issues: PoE power budget exceeded, wrong PoE standard, transceiver mismatch, signal strength",
        "Switching issues: STP loops, incorrect VLAN assignment, ACLs",
        "Routing issues: routing tables, default routes, address pool exhaustion, incorrect gateway, subnet mask or IP",
        "Service issues: DHCP scope exhaustion, duplicate IPs, DNS failures, NTP issues",
        "Performance issues: congestion, bottlenecks, bandwidth, latency, packet loss, jitter",
        "Wireless issues: interference, channel overlap, signal degradation, coverage gaps, client disassociation, roaming misconfiguration",
        "Software tools: protocol analyzer, command line (ping, traceroute, nslookup, dig, tcpdump, netstat, arp, ip/ipconfig), nmap, LLDP/CDP, speed testers, iperf",
        "Hardware tools: toner and probe, cable tester, cable certifier, TDR/OTDR, loopback plug, Wi-Fi analyzer, visual fault locator",
        "Basic device commands: show mac-address-table, show route, show interface, show config, show arp, show vlan, show power"
      ],
      notes: ["Objectives 5.1–5.5"],
      labs: [
        "Break your Packet Tracer lab on purpose (wrong gateway, wrong VLAN, shut interface) and fix each fault, writing down all seven methodology steps as you go.",
        "Run `ping`, `traceroute`/`tracert` and `pathping` (Windows) or `mtr` (Linux) to a distant site and note which hop adds latency or loss.",
        "Install iperf3 on two machines, measure TCP and UDP throughput, jitter and loss (`iperf3 -c <host> -u -b 50M`), then repeat over Wi-Fi and compare."
      ]
    }
  ],

  study: {
    1: [
      ["Walk through what happens at each OSI layer when you load a web page.", "Application: HTTP request. Presentation: TLS encryption. Session: session setup. Transport: TCP segment on port 443. Network: IP packet with source and destination addresses. Data link: Ethernet frame with MAC addresses. Physical: bits on copper, fiber or radio."],
      ["When would you pick UDP over TCP? Give two examples.", "When speed matters more than guaranteed delivery and the app can handle loss: VoIP/video (RTP), DNS queries, DHCP, SNMP, syslog. TCP adds a handshake, acknowledgments and retransmission."],
      ["Subnet 192.168.50.0/24 into four equal subnets. List each network, usable range and broadcast.", "Use /26 (block of 64): .0 (hosts .1–.62, broadcast .63), .64 (.65–.126, .127), .128 (.129–.190, .191), .192 (.193–.254, .255)."],
      ["Compare IaaS, PaaS and SaaS by what the customer manages.", "IaaS: the customer manages the OS, runtime, apps and data on provider hardware. PaaS: the customer manages only apps and data. SaaS: the customer just uses the app and manages users and data settings."],
      ["Explain why single-mode fiber reaches farther than multimode.", "Single-mode uses a very small core (about 9 µm) and a laser, so light travels one path with little modal dispersion. Multimode's larger core lets light take many paths, which spreads the signal and limits distance to hundreds of meters."],
      ["What problems do spine-and-leaf designs and SD-WAN each solve?", "Spine and leaf gives every leaf equal, predictable hop counts for heavy east-west traffic in data centers. SD-WAN centrally manages and steers branch traffic across multiple WAN links (broadband, LTE, MPLS) by application and link quality."]
    ],
    2: [
      ["How does a router choose between routes to the same destination?", "First the longest prefix match. If prefixes are equal, the lowest administrative distance (connected 0, static 1, eBGP 20, OSPF 110, RIP 120). Within one protocol, the best metric (such as OSPF cost)."],
      ["Explain the difference between an access port and a trunk port.", "An access port belongs to one VLAN and sends untagged frames to an end device. A trunk carries many VLANs between switches or routers and tags frames with 802.1Q, except the native VLAN, which stays untagged."],
      ["Why is Spanning Tree needed, and what does it do?", "Redundant Layer 2 links create loops that cause broadcast storms and MAC table instability. STP elects a root bridge and blocks redundant ports, unblocking them if the active path fails."],
      ["Compare 2.4, 5 and 6 GHz Wi-Fi.", "2.4 GHz has better range but only three non-overlapping channels and more interference. 5 GHz has many more channels and higher throughput but shorter range. 6 GHz (Wi-Fi 6E/7) adds wide, clean channels but has the shortest range and needs newer clients."],
      ["When should you use WPA3-Enterprise instead of WPA3-Personal?", "Use Enterprise when each user or device needs its own credentials, access can be revoked individually and a RADIUS/802.1X server exists. Personal (SAE) suits homes and small offices with a single passphrase."],
      ["List the physical and environmental factors to plan for in a new IDF.", "Rack space and airflow direction, cable management and patch panels, UPS and PDU capacity, PoE budget, cooling and humidity, fire suppression, physical locks and access logging."]
    ],
    3: [
      ["Why keep a network baseline, and what goes in it?", "It shows what normal looks like so anomalies stand out and capacity can be planned. Include bandwidth use, CPU and memory, latency, error rates, and typical top talkers at different times."],
      ["Contrast SNMP polling, traps and flow data.", "Polling (GET) has the manager ask for values on a schedule. Traps are pushed by the device when an event happens. Flow data (NetFlow/IPFIX) summarizes who talked to whom, on which ports and how much."],
      ["Explain RPO vs RTO with an example.", "RPO is how much data you can lose, measured in time (4-hour RPO means backups at least every 4 hours). RTO is how fast service must be back (2-hour RTO means restored within 2 hours of the outage)."],
      ["Describe the DHCP DORA process and why a relay agent is needed across VLANs.", "Discover (client broadcast), Offer (server), Request (client), Acknowledge (server). Routers do not forward broadcasts, so an IP helper/relay on the client's gateway forwards discovers to the DHCP server as unicast."],
      ["Name six DNS record types and what each is for.", "A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail server), PTR (reverse lookup), NS (authoritative name servers), plus TXT (SPF/verification) and SOA (zone authority details)."],
      ["Why does out-of-band management matter?", "It gives administrators a separate path (console server, dedicated management network, cellular modem) to reach devices when the production network is down or misconfigured."]
    ],
    4: [
      ["Explain defense in depth using a small office network.", "Layered controls so one failure does not expose everything: perimeter firewall, segmented VLANs with ACLs, 802.1X on ports, hardened devices, MFA for admins, endpoint protection, monitoring and backups."],
      ["How do ARP spoofing and MAC flooding differ, and how is each mitigated?", "ARP spoofing sends forged ARP replies to redirect traffic (mitigated with dynamic ARP inspection and static entries). MAC flooding overflows the CAM table so the switch floods frames (mitigated with port security)."],
      ["Compare RADIUS and TACACS+.", "RADIUS uses UDP, encrypts only the password and combines authentication and authorization; it is common for network access and Wi-Fi. TACACS+ uses TCP 49, encrypts the whole payload and separates AAA functions, so it is preferred for device administration."],
      ["List five hardening steps for a new switch.", "Change default credentials, disable Telnet/HTTP and use SSH/HTTPS, shut down unused ports and move them to an unused VLAN, enable port security, DHCP snooping and BPDU guard, keep firmware updated and use SNMPv3."],
      ["Why segment IoT and OT devices, and how?", "They are often unpatchable and weakly secured. Put them on separate VLANs or subnets with strict ACLs or firewall rules that allow only needed traffic, and monitor them."]
    ],
    5: [
      ["List the seven troubleshooting methodology steps in order.", "1 Identify the problem. 2 Establish a theory of probable cause. 3 Test the theory. 4 Establish a plan of action and identify potential effects. 5 Implement the solution or escalate. 6 Verify full system functionality and implement preventive measures. 7 Document findings, actions, outcomes and lessons learned."],
      ["A user can reach local hosts but nothing remote. What do you check and in what order?", "Check `ipconfig`/`ip addr` for IP, mask and gateway; ping the gateway; confirm the gateway is on the same subnet; check the router's interface and routing table; then traceroute to a remote host to find where traffic stops."],
      ["Which symptoms point to a Layer 1 problem?", "No link light, rising CRC or input errors, a link negotiating a lower speed, intermittent drops, late collisions (duplex mismatch) and high attenuation on a cable certifier."],
      ["Match these tools to their jobs: toner and probe, cable certifier, OTDR, loopback plug, Wi-Fi analyzer.", "Toner and probe finds a cable in a bundle. A certifier tests a run against a category standard. An OTDR finds the distance to a break in fiber. A loopback plug tests a port or NIC. A Wi-Fi analyzer shows channels, signal strength and interference."],
      ["Explain latency, jitter and packet loss and which applications suffer most.", "Latency is delay, jitter is variation in delay and packet loss is packets never arriving. Real-time voice and video suffer most, so use QoS, enough bandwidth and wired links where possible."],
      ["A user can ping 8.8.8.8 but browsing by name fails. Walk through your troubleshooting.", "This points to DNS. Check the configured DNS servers with `ipconfig /all`, test with `nslookup` or `dig`, try another resolver, flush the cache (`ipconfig /flushdns`), check the hosts file, and verify firewall rules for port 53."]
    ]
  },

  questions: [
    ["np1",0,1,"A technician watches a switch forward a frame based only on its destination MAC address. At which OSI layer is the switch making this decision?",["Layer 2, data link","Layer 3, network","Layer 4, transport","Layer 1, physical"],0,"MAC addresses and frame forwarding belong to the data link layer; routers make Layer 3 decisions on IP addresses.","Objective 1.1"],
    ["np2",0,1,"An administrator must allow encrypted command-line administration of a Linux server through the firewall. Which port should be opened?",["TCP 23","TCP 22","TCP 3389","TCP 445"],1,"SSH uses TCP 22. Telnet (23) is unencrypted, RDP (3389) is a graphical Windows protocol and 445 is SMB.","Objective 1.4"],
    ["np3",0,1,"Users can reach internal web servers by IP address but not by hostname after a new firewall rule set was applied. Which port was most likely left out?",["67","123","53","389"],2,"Name resolution uses DNS on port 53 (UDP, and TCP for larger responses). 67 is DHCP, 123 is NTP and 389 is LDAP.","Objective 1.4"],
    ["np4",0,1,"How many usable host addresses does the subnet 192.168.10.0/26 provide?",["64","30","126","62"],3,"A /26 leaves 6 host bits: 2^6 = 64 addresses, minus the network and broadcast addresses, gives 62 usable hosts.","Objective 1.7"],
    ["np5",0,1,"A network engineer must create one IPv4 subnet that supports 500 hosts while wasting as few addresses as possible. Which prefix length should be used?",["/24","/22","/23","/25"],2,"A /23 has 9 host bits, giving 510 usable addresses. A /24 only gives 254, and a /22 (1,022) wastes far more.","Objective 1.7"],
    ["np6",0,1,"A host is configured as 172.16.45.130/25. What is the network address of its subnet?",["172.16.45.128","172.16.45.0","172.16.45.129","172.16.45.255"],0,"A /25 splits the last octet into blocks of 128 (0–127 and 128–255), so .130 sits in the 172.16.45.128 network.","Objective 1.7"],
    ["np7",0,1,"A Windows laptop reports the address 169.254.23.7 and cannot reach anything beyond its own segment. What does this address indicate?",["The host was given a static public address by the ISP","The host is using its loopback interface","The host received an IPv6 address mapped into IPv4","The host failed to obtain a DHCP lease and self-assigned an APIPA address"],3,"169.254.0.0/16 is the APIPA (link-local) range a client assigns itself when no DHCP server answers.","Objective 1.7"],
    ["np8",0,1,"Which of the following addresses falls inside an RFC 1918 private range?",["172.32.1.1","172.20.5.9","192.169.1.1","11.0.0.1"],1,"The private ranges are 10.0.0.0/8, 172.16.0.0/12 (172.16–172.31) and 192.168.0.0/16. Only 172.20.5.9 is inside one of them.","Objective 1.7"],
    ["np9",0,1,"A small company wants hosted email and office apps where the provider manages the servers, operating system and application. Which cloud service model fits?",["SaaS","IaaS","PaaS","On-premises hosting"],0,"With Software as a Service the customer just uses the application. IaaS and PaaS leave the OS or the app to the customer.","Objective 1.3"],
    ["np10",0,1,"Two campus buildings 8 km apart need a 10 Gbps link. Which transmission medium is the best choice?",["OM3 multimode fiber","Single-mode fiber","Cat 6a twisted pair","RG-6 coaxial cable"],1,"Single-mode fiber carries 10 Gbps for many kilometers. Multimode reaches a few hundred meters at 10G, and copper Ethernet stops at 100 m.","Objective 1.5"],
    ["np11",0,1,"A retailer wants every branch office to have a single WAN circuit that connects back to headquarters, keeping circuit costs low. Which topology is this?",["Full mesh","Bus","Hub and spoke","Point-to-point between every pair of branches"],2,"In hub and spoke, every branch (spoke) connects only to the central site (hub), minimizing the number of circuits.","Objective 1.6"],
    ["np12",0,1,"Most traffic in a new data center flows between application servers and database servers inside the same facility. How is this traffic described?",["North-south","Broadcast","Out-of-band","East-west"],3,"East-west traffic moves laterally between systems inside the data center; north-south traffic enters or leaves it.","Objective 1.6"],
    ["np13",0,1,"An IPTV system must send one video stream to only the set-top boxes that have joined a channel. Which delivery method is most efficient?",["Unicast","Broadcast","Multicast","Anycast"],2,"Multicast sends a single stream to a group of subscribed receivers; broadcast hits every host and unicast needs one stream per viewer.","Objective 1.4"],
    ["np14",0,1,"Management wants to block a specific file-sharing application even when it tunnels over TCP 443. Which device can do this?",["Next-generation firewall with application awareness","Stateless packet-filtering router","Unmanaged Layer 2 switch","Network hub"],0,"An NGFW inspects traffic at the application layer and can identify apps regardless of port; a packet filter only sees addresses and ports.","Objective 1.2"],
    ["np15",0,1,"A technician sees an IPv6 address beginning with fe80:: on every interface, even with no DHCPv6 server. What type of address is it?",["Global unicast","Unique local","Multicast","Link-local"],3,"fe80::/10 is link-local, auto-configured on every IPv6 interface and valid only on the local segment. Global unicast starts with 2000::/3, unique local with fc00::/7 and multicast with ff00::/8.","Objective 1.8"],
    ["np16",0,1,"A company wants branch traffic to be steered automatically between broadband and MPLS based on application performance, with policy managed centrally. Which technology fits?",["VxLAN","SD-WAN","Spanning Tree Protocol","Port address translation"],1,"SD-WAN uses a central controller to route traffic across multiple WAN transports by application and link quality.","Objective 1.8"],
    ["np17",0,1,"A VoIP system needs low-latency delivery of voice packets and can tolerate an occasional lost packet. Which transport protocol carries the media stream?",["UDP","TCP","ICMP","GRE"],0,"Real-time media (RTP) runs over UDP because retransmitting late voice packets would only add delay.","Objective 1.4"],
    ["np18",0,2,"A multivendor enterprise needs an open-standard interior routing protocol that builds a full link-state map and uses cost as its metric. Which should it deploy?",["BGP","OSPF","RIPv2","EIGRP"],1,"OSPF is an open, link-state IGP with a cost metric. BGP is an exterior path-vector protocol, RIP is distance-vector and EIGRP began as Cisco-proprietary.","Objective 2.1"],
    ["np19",0,2,"A company connects to two different ISPs and must exchange routes with both providers' autonomous systems. Which routing protocol is used?",["OSPF","RIPv2","BGP","A single static default route"],2,"BGP is the exterior gateway protocol used to exchange routes between autonomous systems such as ISPs.","Objective 2.1"],
    ["np20",0,2,"A router has a static route to 10.1.0.0/16 and an OSPF-learned route to 10.1.1.0/24. Which route does it use for a packet to 10.1.1.5?",["The static route, because it has the lower administrative distance","The default route, because two routes conflict","Both routes, load-balanced equally","The OSPF route to 10.1.1.0/24, because the longest prefix match wins"],3,"Routers pick the most specific matching prefix first; administrative distance only breaks ties between routes to the same prefix.","Objective 2.1"],
    ["np21",0,2,"Two hundred internal hosts reach the internet through a single public IP address, with the router tracking sessions by source port. What is this called?",["Static one-to-one NAT","DHCP relay","Port address translation (PAT)","Policy-based routing"],2,"PAT (NAT overload) maps many private addresses to one public address using unique port numbers.","Objective 2.1"],
    ["np22",0,2,"Two routers must share a virtual default-gateway IP so hosts keep working if one router fails. Which technology provides this?",["A first hop redundancy protocol such as VRRP or HSRP","Spanning Tree Protocol","Link Aggregation Control Protocol","Port mirroring"],0,"FHRPs let routers share a virtual IP and MAC so the standby takes over the gateway role transparently.","Objective 2.1"],
    ["np23",0,2,"A switch uplink to another switch must carry VLANs 10, 20 and 30. How should the port be configured?",["As an access port in VLAN 10","With port security set to three MAC addresses","With PoE+ enabled","As an 802.1Q trunk allowing VLANs 10, 20 and 30"],3,"A trunk tags frames with 802.1Q VLAN IDs so multiple VLANs can share one link; an access port carries a single VLAN.","Objective 2.2"],
    ["np24",0,2,"After a user plugs both ends of a patch cable into two wall jacks, the network floods with broadcasts and slows to a crawl. Which protocol should have prevented this?",["Link Aggregation Control Protocol","Spanning Tree Protocol","Virtual Router Redundancy Protocol","802.1X"],1,"STP detects Layer 2 loops and blocks redundant paths, preventing broadcast storms.","Objective 2.2"],
    ["np25",0,2,"A server needs more bandwidth and redundancy by bundling four 1 Gbps switch ports into one logical link. Which technology is used?",["Link aggregation with LACP (802.3ad)","Spanning Tree Protocol","802.1Q trunking","Jumbo frames"],0,"LACP bundles physical links into one logical channel for more throughput and failover.","Objective 2.2"],
    ["np26",0,2,"The storage team wants to reduce per-packet overhead on a dedicated iSCSI network. Which switch setting helps most?",["Enable PoE+","Enable jumbo frames (MTU around 9000)","Change the native VLAN","Force half duplex"],1,"Jumbo frames carry more data per frame, lowering header and CPU overhead for storage traffic. Every device on the path must support the larger MTU.","Objective 2.2"],
    ["np27",0,2,"A technician is assigning 2.4 GHz channels to neighboring access points in the United States. Which set of channels does not overlap?",["1, 5 and 9","1, 7 and 13","1, 6 and 11","36, 40 and 44"],2,"In the 2.4 GHz band with 20 MHz channels, only 1, 6 and 11 do not overlap in North America; 36–44 are 5 GHz channels.","Objective 2.3"],
    ["np28",0,2,"A new wireless deployment must use the 6 GHz band to avoid congestion. Which standard is required?",["802.11ac (Wi-Fi 5)","802.11n (Wi-Fi 4)","802.11g","802.11ax (Wi-Fi 6E)"],3,"Wi-Fi 6E extends 802.11ax into 6 GHz. 802.11ac is 5 GHz only, and 802.11n and 802.11g cannot use 6 GHz.","Objective 2.3"],
    ["np29",0,2,"A company wants each employee to join Wi-Fi with their own directory credentials, checked by a RADIUS server. Which security mode should be configured?",["WPA3-Personal","WEP","WPA3-Enterprise","Open network with a captive portal"],2,"Enterprise mode uses 802.1X/EAP with a RADIUS server for per-user authentication. Personal mode uses one shared passphrase (SAE).","Objective 2.3"],
    ["np30",0,2,"A PTZ security camera draws 25 W over its Ethernet cable. Which is the minimum PoE standard the switch port must support?",["802.3at (PoE+)","802.3af (PoE)","802.3u","802.3ab"],0,"802.3af supplies up to 15.4 W per port and 802.3at up to 30 W. 802.3u and 802.3ab are Fast Ethernet and gigabit copper standards, not power.","Objective 2.4"],
    ["np31",0,2,"A data center uses hot aisle/cold aisle containment. How should new rack servers be mounted?",["With intakes facing the hot aisle so warm air pre-heats the chassis","Alternating direction in each rack to balance airflow","Sideways so air flows between adjacent racks","With air intakes facing the cold aisle and exhausts facing the hot aisle"],3,"Equipment should draw cool air from the cold aisle and exhaust into the hot aisle so hot and cold air do not mix.","Objective 2.4"],
    ["np32",0,2,"Two buildings 400 m apart need a wireless bridge. Which antenna choice is best?",["Omnidirectional antennas on each roof","Highly directional antennas such as Yagi or parabolic, aimed at each other","Standard indoor dipoles with the channel width raised to 160 MHz","Omnidirectional 2.4 GHz antennas at maximum transmit power"],1,"Point-to-point links need directional antennas that focus energy toward the far end; omnis spread signal in every direction.","Objective 2.3"],
    ["np33",0,3,"A technician needs to find which switch port and patch panel position a user's wall jack connects to. Which document should they check?",["Physical network diagram with cable and port labeling","Logical network diagram","Service level agreement","Acceptable use policy"],0,"Physical diagrams and rack/patch documentation show real cable runs and port positions. Logical diagrams show subnets and traffic flow.","Objective 3.1"],
    ["np34",0,3,"A network engineer plans to upgrade the firmware on the core switch. What should happen first?",["Apply the upgrade immediately and document it afterward","Submit a change request with a maintenance window and rollback plan for approval","Upgrade during business hours so users can report problems","Tell users only if the upgrade fails"],1,"Change management requires an approved request, a scheduled window and a tested rollback plan before changes to production.","Objective 3.1"],
    ["np35",0,3,"The WAN link is running at 70% utilization and the manager asks whether that is unusual. What should the administrator compare it against?",["The service level agreement's uptime clause","The organization's acceptable use policy","The network performance baseline","The switch's MAC address table"],2,"A baseline records normal performance so current values can be judged as normal or abnormal.","Objective 3.2"],
    ["np36",0,3,"The security team requires that network device monitoring use authentication and encryption. Which protocol version meets this?",["SNMPv1","SNMPv2c","SNMPv2c with a long community string","SNMPv3"],3,"SNMPv3 adds user-based authentication and encryption; v1 and v2c send community strings in cleartext.","Objective 3.2"],
    ["np37",0,3,"An administrator wants switches to notify the monitoring server immediately when an interface goes down, without waiting for the next poll. Which SNMP feature is this?",["GET request","Walk","Trap","MIB"],2,"Traps are unsolicited messages the agent sends to the manager when an event occurs; GETs and walks are polls started by the manager.","Objective 3.2"],
    ["np38",0,3,"An administrator wants to see which hosts are talking to which, on which ports and with how much data, without capturing full packet payloads. Which technology fits?",["Flow data such as NetFlow or IPFIX","Full packet capture on a SPAN port","Syslog from the firewall only","ICMP echo monitoring"],0,"Flow records summarize conversations (addresses, ports, byte counts) at much lower storage cost than full captures.","Objective 3.2"],
    ["np39",0,3,"Leadership decides the business can lose no more than four hours of transaction data after a disaster. Which metric does this define?",["Recovery time objective (RTO)","Mean time to repair (MTTR)","Mean time between failures (MTBF)","Recovery point objective (RPO)"],3,"RPO is the maximum acceptable data loss measured in time, which sets backup frequency. RTO is how quickly service must be restored.","Objective 3.3"],
    ["np40",0,3,"A recovery site has power, network links and hardware installed, but staff must restore the latest backups before it can go live. What kind of site is it?",["Hot site","Warm site","Cold site","Active-active cluster"],1,"A warm site has equipment ready but not current data. A hot site is fully synced and a cold site is an empty facility.","Objective 3.3"],
    ["np41",0,3,"Clients in VLAN 20 cannot get addresses, while the only DHCP server sits in VLAN 10 and serves both scopes. What should be configured?",["A DHCP relay (IP helper) on the VLAN 20 router interface","A longer lease time on the DHCP server","A DHCP reservation for each VLAN 20 client","Spanning Tree on the VLAN 20 access ports"],0,"DHCP discovers are broadcasts that routers do not forward; a relay agent forwards them to the server as unicast.","Objective 3.4"],
    ["np42",0,3,"Which DNS record maps a hostname to an IPv6 address?",["A","AAAA","PTR","CNAME"],1,"AAAA records hold IPv6 addresses and A records hold IPv4. PTR is for reverse lookups and CNAME is an alias.","Objective 3.4"],
    ["np43",0,3,"Partner mail servers reject the company's email because a reverse lookup of the sending IP returns nothing. Which record must be created?",["MX","SRV","PTR","TXT"],2,"Reverse DNS uses PTR records to map an IP address back to a hostname. MX only tells senders where to deliver inbound mail.","Objective 3.4"],
    ["np44",0,3,"Kerberos logins start failing and the logs show large clock differences between servers. Which service should be fixed?",["SNMP on UDP 161","LDAP on TCP 389","Syslog on UDP 514","NTP on UDP 123"],3,"Kerberos rejects tickets when clocks drift too far apart; NTP keeps time synchronized.","Objective 3.4"],
    ["np45",0,3,"A misconfiguration has taken down the production network, and the core switch can no longer be reached over SSH. Which access method lets the admin fix it?",["In-band SSH from another workstation on the same VLAN","A split-tunnel VPN into the production network","Out-of-band management through a console server or separate management network","A jump box on the production VLAN"],2,"Out-of-band management uses a separate path, such as a console server with its own connection, that still works when production is down.","Objective 3.5"],
    ["np46",0,3,"IPv6 hosts on a new segment configure their own global addresses from router advertisements, without any DHCPv6 server. What is this called?",["SLAAC","Stateful DHCPv6","APIPA","NAT64"],0,"Stateless address autoconfiguration builds an address from the advertised prefix plus an interface identifier.","Objective 3.4"],
    ["np47",0,4,"Help desk staff are given read-only access to switches because they only need to view port status. Which security principle does this apply?",["Implicit trust","Open access","Single sign-on","Least privilege"],3,"Least privilege gives users only the access their job requires.","Objective 4.1"],
    ["np48",0,4,"A capture shows a workstation answering ARP requests for the default gateway's IP with its own MAC address. Which attack is occurring?",["DNS cache poisoning","ARP spoofing (poisoning)","MAC flooding","VLAN hopping"],1,"ARP spoofing links the attacker's MAC to another host's IP so traffic is redirected through the attacker (on-path).","Objective 4.2"],
    ["np49",0,4,"Users report a second wireless network with the exact corporate SSID that asks them to re-enter their passwords. What is this?",["Evil twin","War driving","Bluejacking","Jamming"],0,"An evil twin is a rogue AP impersonating a legitimate SSID to capture credentials or traffic.","Objective 4.2"],
    ["np50",0,4,"An attacker floods a switch with thousands of fake source MAC addresses so it starts flooding all traffic out every port. Which control best mitigates this?",["DHCP snooping","Port security that limits MAC addresses per port","BPDU guard","Dynamic ARP inspection"],1,"MAC flooding fills the CAM table; port security caps the number of learned MAC addresses on each port.","Objective 4.3"],
    ["np51",0,4,"Several users received the wrong default gateway from an unauthorized DHCP server someone plugged into a conference room. Which switch feature prevents this?",["Port mirroring","802.1Q trunking","DHCP snooping","Link aggregation"],2,"DHCP snooping allows DHCP server replies only on trusted ports, blocking rogue servers.","Objective 4.3"],
    ["np52",0,4,"A public web server must be reachable from the internet but kept separate from the internal LAN. Where should it be placed?",["On the internal user VLAN","On the native VLAN of the core trunk","On the wireless guest VLAN","In a screened subnet (DMZ)"],3,"A screened subnet sits between firewalls or firewall interfaces so public services are isolated from internal systems.","Objective 4.3"],
    ["np53",0,4,"The company wants wired devices authenticated against RADIUS before any switch port grants network access. Which standard provides this?",["MAC filtering","WPA2-Personal","802.1X","SNMPv3"],2,"802.1X is port-based network access control using a supplicant, authenticator and RADIUS authentication server.","Objective 4.3"],
    ["np54",0,4,"An audit found dozens of patched but unused switch ports in public areas. What is the best hardening step?",["Administratively shut them down and assign them to an unused VLAN","Leave them enabled in the default VLAN","Configure them as trunk ports","Enable PoE on all of them"],0,"Disabling unused ports and parking them in an unused VLAN stops walk-up access to the network.","Objective 4.3"],
    ["np55",0,4,"An unknown person carrying boxes follows an employee through a badge-controlled door without scanning a badge. What is this?",["Shoulder surfing","Phishing","Dumpster diving","Tailgating"],3,"Tailgating (piggybacking) is entering a secure area by following someone authorized.","Objective 4.2"],
    ["np56",0,4,"A branch office needs a permanent encrypted connection to headquarters that works for every device at the branch without client software. Which solution fits?",["Clientless SSL VPN portal","Site-to-site IPsec VPN between the two firewalls","Client-to-site VPN on each laptop","RDP published to the internet"],1,"A site-to-site VPN links whole networks gateway to gateway, so branch hosts need no VPN client.","Objective 4.1"],
    ["np57",0,4,"A firewall ACL permits TCP 80 and TCP 443 inbound and has no other rules. What happens to inbound traffic on TCP 25?",["It is blocked by the implicit deny","It is allowed because no rule matches","It is allowed and logged","It is redirected to port 443"],0,"Firewall ACLs end with an implicit deny, so anything not explicitly permitted is dropped.","Objective 4.3"],
    ["np58",0,5,"A user reports they cannot print. According to the CompTIA troubleshooting methodology, what should the technician do first?",["Establish a theory of probable cause","Identify the problem by gathering information and questioning the user","Implement a fix by reinstalling the driver","Document findings and lessons learned"],1,"The methodology starts with identifying the problem: gather information, question users, find symptoms and recent changes.","Objective 5.1"],
    ["np59",0,5,"A technician has just implemented a fix for a routing problem. What is the next step in the troubleshooting methodology?",["Document findings, actions and outcomes","Establish a new theory of probable cause","Verify full system functionality and implement preventive measures if applicable","Escalate to the next tier"],2,"After implementing the solution, verify everything works and prevent recurrence; documentation is the final step.","Objective 5.1"],
    ["np60",0,5,"A technician has tested and confirmed the theory that a failed switch power supply caused an outage. What should they do next?",["Verify full system functionality","Document the lessons learned","Question users about recent changes","Establish a plan of action to resolve the problem and identify potential effects"],3,"Once the theory is confirmed, the next step is to plan the fix and consider its side effects before implementing it.","Objective 5.1"],
    ["np61",0,5,"A host is configured as 192.168.1.70/26 with default gateway 192.168.1.1. It reaches local hosts but nothing on other networks. What is the most likely cause?",["The DNS server address is wrong","The switch port is in the wrong duplex mode","The gateway is outside the host's subnet","The subnet mask should be /27"],2,"192.168.1.70/26 is in the 192.168.1.64–127 range, so the gateway 192.168.1.1 is unreachable on the local subnet.","Objective 5.3"],
    ["np62",0,5,"A desktop connected to a gigabit switch keeps linking at only 100 Mbps. Other devices on the switch link at 1 Gbps. What is the most likely cause?",["A damaged pair in the cable, since Fast Ethernet needs only two pairs","The desktop is in the wrong VLAN","The DNS server is unreachable","The switch port has PoE disabled"],0,"Gigabit copper uses all four pairs; a broken pair often forces autonegotiation down to 100 Mbps. A cable tester will confirm it.","Objective 5.2"],
    ["np63",0,5,"An interface's CRC error counter keeps climbing on a cable run beside a large electric motor. What is the most likely cause?",["An incorrect default gateway","A duplicate IP address","An expired DHCP lease","Electromagnetic interference corrupting frames on the cable"],3,"CRC errors mean frames arrive corrupted, pointing to Layer 1 problems such as EMI, bad cabling or bad connectors.","Objective 5.2"],
    ["np64",0,5,"A server link is slow, and one side shows many late collisions while the other side shows none. What is the most likely cause?",["An incorrect subnet mask","A duplex mismatch between the server and the switch port","A DNS misconfiguration","Spanning Tree blocking the port"],1,"Late collisions on only one end are the classic sign that one side is half duplex and the other full duplex.","Objective 5.2"],
    ["np65",0,5,"A technician must find which unlabeled cable in a bundle of 40 runs to a specific wall jack. Which tool should they use?",["Toner and probe","OTDR","Loopback plug","Wi-Fi analyzer"],0,"A toner puts a signal on the cable at the jack, and the probe picks it up at the bundle to identify the matching run.","Objective 5.5"],
    ["np66",0,5,"After a new fiber patch cable is installed between two switches, neither port shows link, though light is visible at both ends. What is the most likely cause?",["The fiber is single-mode on both ends","The transmit and receive strands are reversed","The switch ports are in different VLANs","The cable is too short"],1,"Each end's transmit must reach the other end's receive; swapped TX/RX strands leave light present but no link.","Objective 5.2"],
    ["np67",0,5,"A user can ping 8.8.8.8 but cannot load any website by name. Which command should the technician run next?",["traceroute to 8.8.8.8","arp -a","nslookup or dig against the configured DNS server","iperf3 to the gateway"],2,"Reaching an IP but failing by name points to DNS; nslookup or dig tests name resolution directly.","Objective 5.5"],
    ["np68",0,5,"Two workstations keep showing duplicate IP address warnings. A printer was recently given a static address. What is the most likely cause?",["The DHCP lease time is too long","The switch has Spanning Tree enabled","The DNS server is missing a PTR record","The printer's static address falls inside the DHCP scope"],3,"Static addresses must sit outside the DHCP pool (or be reserved), or the server will hand the same address to another client.","Objective 5.3"],
    ["np69",0,5,"On a busy guest Wi-Fi network, devices that joined earlier work fine, but newly arriving devices get 169.254.x.x addresses. What is the most likely cause?",["The access point's channel is overlapping","The default gateway is misconfigured","The DHCP scope is exhausted","The DNS server is down"],2,"When every lease is used, new clients get no offer and fall back to APIPA; shorter leases or a larger scope fix it.","Objective 5.3"],
    ["np70",0,5,"VoIP calls sound choppy, and monitoring shows the delay between consecutive packets varies widely even though average latency is low. Which metric describes the problem?",["Jitter","Throughput","Attenuation","Bandwidth"],0,"Jitter is variation in packet delay; real-time voice needs it low, often with QoS to prioritize voice.","Objective 5.4"],
    ["np71",0,5,"Two neighboring 2.4 GHz access points are both on channel 6, and users between them see poor throughput. What is the best fix?",["Increase both APs to maximum transmit power","Change both SSIDs to the same name","Switch clients to WEP","Move the APs to different non-overlapping channels, such as 1 and 11"],3,"Both APs on the same channel cause co-channel contention; separate non-overlapping channels reduce interference.","Objective 5.4"],
    ["np72",0,5,"Users report slow access to a cloud app. The technician wants to see which hop along the path adds the most latency. Which tool should be used?",["ping to the default gateway","traceroute (tracert on Windows)","ipconfig /all","nslookup"],1,"traceroute lists each hop with its response times, showing where delay is introduced along the path.","Objective 5.5"],
    ["np73",0,5,"After a new WAN circuit is installed, the admin wants to measure the actual throughput between hosts at each site. Which tool fits?",["iperf","nmap","netstat","arp"],0,"iperf generates traffic between a client and server to measure achievable bandwidth.","Objective 5.5"],
    ["np74",0,5,"A technician wants to confirm from another machine which TCP ports a server is actually listening on. Which tool should they use?",["Toner probe","nmap","Cable certifier","ipconfig"],1,"nmap scans a host remotely and reports open ports and services.","Objective 5.5"],
    ["np75",0,5,"A 2 km single-mode fiber run between buildings has gone dark, and the technician needs to know how far from the patch panel the break is. Which tool should be used?",["Toner and probe","Loopback plug","OTDR","Multimeter"],2,"An optical time-domain reflectometer sends light pulses down the fiber and times the reflections to show the distance to a break or bad splice.","Objective 5.5"]
  ]
});
