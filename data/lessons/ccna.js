/* Lessons for Cisco CCNA (200-301 v2.0): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ccna", [
 {
  "t": "Diagnose interface and cable issues (copper and fiber): collisions, CRC/input errors, duplex and speed mismatch, distance limits, cable types",
  "body": [
   "Most network problems that look mysterious turn out to be physical: a bad cable, a connector that is not seated, a fiber run that is too long, or two ends of a link that disagree about speed or duplex. Cisco expects you to read interface counters and status lines and work out which of these is happening, because fixing the physical layer first saves hours of chasing routing or VLAN issues that are not really there.",
   "Start with `show interfaces` on a switch or router. The first line tells you the interface state and the line protocol state. 'up/up' is healthy. 'administratively down' means someone typed `shutdown`. 'down/down' usually means no cable, a dead far end or a bad cable. 'up/down' points to a Layer 2 problem such as a keepalive or encapsulation mismatch on a serial link. On a switch, `show interfaces status` gives a quick table of every port, its VLAN, duplex and speed, and states like 'notconnect' or 'err-disabled'.",
   "Next read the counters. Input errors is a total of several receive problems. CRC (cyclic redundancy check) errors mean frames arrived whose checksum did not match, which usually means electrical noise, a damaged cable or a bad connector. Runts are frames smaller than 64 bytes and giants are larger than the maximum; both suggest collisions or a misbehaving NIC. Collisions are normal only on half-duplex links. Late collisions, which happen after the first 64 bytes have been sent, are the classic sign of a duplex mismatch or a cable that exceeds the length limit.",
   "A duplex mismatch happens when one side is full duplex and the other is half. The half-duplex side sees the full-duplex side transmitting while it is also sending, so it records collisions and late collisions, while the full-duplex side records CRC errors and runts because the half-duplex side stops frames midway. The link stays up but is slow and lossy. The usual cause is one side hard-coded (for example `duplex full` and `speed 100`) while the other autonegotiates: when autonegotiation fails, a 10/100 port assumes half duplex. The fix is to set both ends to auto, or hard-code both identically. A speed mismatch is different: the link usually just stays down.",
   "Know the common cable types. Unshielded twisted pair (UTP) copper such as Category 5e and Category 6 supports Ethernet up to 100 metres per segment. Straight-through cables connect unlike devices (PC to switch) and crossover cables historically connected like devices (switch to switch), but Auto-MDIX on modern ports detects and adjusts for either. Fiber comes as multimode, which uses a wider core and cheaper light sources for shorter runs inside buildings, and single-mode, which has a narrow core and laser light for kilometres. Fiber is immune to electromagnetic interference, which makes it the right choice near motors or between buildings where ground potential differences can damage copper.",
   "When you see errors, work from the physical layer upward: reseat or swap the cable, try another port, check the transceiver type matches the fiber type on both ends, verify the run length, then compare speed and duplex on both ends with `show interfaces` and fix any mismatch. Clear the counters with `clear counters` and watch whether errors keep climbing; a counter that stopped growing weeks ago may not be your current problem."
  ],
  "terms": [
   [
    "CRC error",
    "A received frame whose frame check sequence does not match its contents, usually caused by noise, a damaged cable or a duplex mismatch."
   ],
   [
    "Late collision",
    "A collision detected after the first 64 bytes of a frame, typically caused by a duplex mismatch or an over-length cable."
   ],
   [
    "Duplex mismatch",
    "One end of a link runs full duplex and the other half duplex, causing collisions on one side and CRC errors and runts on the other."
   ],
   [
    "Auto-MDIX",
    "A port feature that detects whether a straight-through or crossover cable is attached and adjusts transmit and receive pairs automatically."
   ],
   [
    "Multimode vs single-mode fiber",
    "Multimode has a wider core for shorter runs; single-mode has a narrow core and laser light for long distances."
   ]
  ],
  "example": "Users on the third floor complain that file transfers crawl. On the uplink you find `Full-duplex, 100Mb/s` on the access switch and, on the distribution switch, `Half-duplex, 100Mb/s` with thousands of late collisions. Someone had hard-coded one end. You set both ends back to `speed auto` and `duplex auto`, clear the counters and the errors stop.",
  "tip": "Collisions and late collisions show up on the half-duplex side; CRC errors and runts show up on the full-duplex side. If the exam gives you counters from both ends, use that pattern to name the duplex mismatch.",
  "check": [
   [
    "An interface shows 'up/up' but has a rising number of CRC errors and no collisions. What are the most likely causes?",
    "A damaged or noisy cable or connector, electromagnetic interference, or being the full-duplex side of a duplex mismatch. Check the cabling and compare duplex on both ends."
   ],
   [
    "What is the maximum segment length for twisted-pair Ethernet, and what should you use for longer or electrically noisy runs?",
    "100 metres. For longer runs or noisy environments use fiber: multimode for shorter in-building runs, single-mode for long distances."
   ],
   [
    "Why does hard-coding one side of a link to full duplex often cause a mismatch?",
    "Hard-coding disables autonegotiation on that side, so the other side cannot negotiate and falls back to half duplex at 10 or 100 Mbps."
   ]
  ]
 },
 {
  "t": "Hypervisors (type 1 vs type 2), virtual machines and containers",
  "body": [
   "Modern data centers rarely run one operating system per physical server. Instead, a hypervisor lets one physical host run many isolated virtual machines (VMs), each believing it has its own CPU, memory, disk and network card. This matters to network engineers because those VMs still need VLANs, addresses and security, and much of the switching now happens inside the server in a virtual switch.",
   "A hypervisor is the software layer that creates and runs VMs and shares the physical hardware among them. A type 1 hypervisor, also called bare-metal, installs directly on the server hardware with no general-purpose operating system underneath. Examples include VMware ESXi, Microsoft Hyper-V and KVM. Type 1 is what you find in data centers and clouds because it is efficient and stable. A type 2 hypervisor, also called hosted, runs as an application on top of a normal operating system such as Windows or macOS. VirtualBox and VMware Workstation are examples. Type 2 is convenient for labs and desktops but adds overhead because every request passes through the host OS.",
   "Each VM contains a full guest operating system, its own kernel, libraries and applications. It connects to the network through a virtual NIC (vNIC) that plugs into a virtual switch (vSwitch) inside the hypervisor. The vSwitch connects VMs on the same host to each other and uplinks through the server's physical NICs to the real network. Those uplinks are often 802.1Q trunks so different VMs can sit in different VLANs, which is why a server-facing switch port is frequently configured as a trunk rather than an access port.",
   "Containers take a lighter approach. Instead of virtualizing hardware, a container engine such as Docker shares the host's operating system kernel and packages only the application and its libraries. Containers start in seconds, use far less memory and disk than VMs, and many more can run on one host. The trade-off is weaker isolation: all containers on a host share one kernel, and a container must be built for that kernel type (Linux containers need a Linux kernel). Orchestration platforms such as Kubernetes schedule and connect large numbers of containers.",
   "For the exam, keep the layers straight. Physical hardware at the bottom; a type 1 hypervisor directly on it, or a host OS with a type 2 hypervisor on top; VMs each with a guest OS; or, for containers, a single host OS with a container engine and isolated application packages. Virtualization also brings benefits the exam likes: better hardware utilization, faster provisioning, snapshots, and moving running VMs between hosts for maintenance."
  ],
  "terms": [
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor installed directly on server hardware, such as ESXi, Hyper-V or KVM."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on a desktop operating system, such as VirtualBox."
   ],
   [
    "Virtual machine (VM)",
    "A software-defined computer with its own guest operating system, running on a hypervisor."
   ],
   [
    "Container",
    "An isolated application package that shares the host operating system kernel instead of running its own OS."
   ],
   [
    "Virtual switch (vSwitch)",
    "Software inside a hypervisor that switches traffic between VM virtual NICs and the host's physical NICs."
   ]
  ],
  "example": "A company replaces twelve lightly used physical servers with two hosts running a type 1 hypervisor. Each host's two physical NICs connect to a pair of switches with 802.1Q trunks carrying VLANs 10, 20 and 30, and the vSwitch places each VM's vNIC in the right VLAN. Meanwhile, a developer tests the same web app locally in containers on her laptop.",
  "tip": "The words 'bare metal' mean type 1; 'runs on top of an existing OS' means type 2. If a question stresses sharing the host kernel and lightweight startup, the answer is containers, not VMs.",
  "check": [
   [
    "Which hypervisor type would you expect to find on a production data-center server, and why?",
    "Type 1 (bare-metal), because it runs directly on the hardware with less overhead and fewer layers that can fail than a hosted type 2 hypervisor."
   ],
   [
    "What is the key architectural difference between a VM and a container?",
    "A VM includes its own full guest operating system and kernel; a container shares the host operating system's kernel and packages only the app and its dependencies."
   ],
   [
    "Why is a switch port connected to a virtualization host often configured as a trunk?",
    "Because VMs on that host belong to different VLANs, so the vSwitch uplink must carry tagged traffic for several VLANs."
   ]
  ]
 },
 {
  "t": "Network topology architectures: two-tier, three-tier, spine-leaf, WAN, SOHO, on-premises vs cloud",
  "body": [
   "A topology architecture is the overall shape of a network: which devices connect to which, and what job each layer does. Choosing the right shape determines how well the network scales, how failures are contained and how predictable its performance is. The CCNA expects you to recognize the common designs and say when each fits.",
   "The classic campus design is three-tier. The access layer is where end devices plug in; it provides ports, Power over Ethernet, VLAN assignment and edge security. The distribution layer aggregates access switches, is often where routing between VLANs and policy happen, and provides redundancy with dual uplinks. The core layer is a fast, simple backbone that connects distribution blocks and moves traffic between buildings or to the data center and WAN. The core should do as little processing as possible so it can switch quickly and stay stable.",
   "Two-tier, or collapsed core, merges the core and distribution layers into one pair of switches. Smaller campuses use it because a separate core adds cost without benefit when there are only a few distribution blocks. As the campus grows, a dedicated core becomes worthwhile so you are not building a full mesh between many distribution pairs.",
   "Data centers now favor spine-leaf. Every leaf switch connects to every spine switch, and leaves never connect to each other and spines never connect to each other. Servers, storage and firewalls attach to leaves. Any server reaches any other server in the same number of hops (leaf to spine to leaf), which gives consistent latency for the heavy east-west traffic between servers. To add capacity, you add a spine; to add ports, you add a leaf.",
   "A WAN (wide area network) connects sites across distance using provider services such as MPLS, metro Ethernet, broadband internet with VPNs, or cellular. Common WAN topologies include point-to-point, hub-and-spoke, where branches connect through a central site, and full or partial mesh. A SOHO (small office/home office) network is at the other extreme: usually one device combines router, switch, wireless access point, firewall and often the modem, with NAT to a single public address.",
   "Finally, you must compare on-premises and cloud. On-premises means you own and operate the hardware in your own facility: full control, but capital cost and your staff maintain it. Cloud means a provider runs the infrastructure and you consume it as a service, paying for what you use and scaling quickly. The standard service models are IaaS (you manage the OS and up), PaaS (you manage the application and data) and SaaS (you just use the application). Many organizations run hybrid designs, connecting their campus to cloud resources over VPNs or dedicated links."
  ],
  "terms": [
   [
    "Access / distribution / core",
    "The three campus layers: end-device connectivity, aggregation and policy, and a high-speed backbone."
   ],
   [
    "Collapsed core",
    "A two-tier design where the core and distribution layers are combined into one set of switches."
   ],
   [
    "Spine-leaf",
    "A data-center design in which every leaf connects to every spine, giving equal hop count between any two servers."
   ],
   [
    "East-west traffic",
    "Traffic between servers inside the data center, as opposed to north-south traffic entering or leaving it."
   ],
   [
    "IaaS / PaaS / SaaS",
    "Cloud service models where the provider manages progressively more of the stack, from infrastructure up to the full application."
   ]
  ],
  "example": "A school district with one building uses a collapsed core: two distribution/core switches with every access closet dual-homed to both. Its new data center uses four leaf switches and two spines; when a new server rack arrives, the team adds a fifth leaf and cables it to both spines without touching the existing leaves.",
  "tip": "In spine-leaf, leaves do not connect to each other and spines do not connect to each other. Questions often show a diagram and ask which link violates the design.",
  "check": [
   [
    "What is the main advantage of spine-leaf for data-center traffic?",
    "Every leaf-to-leaf path is exactly one spine hop, so east-west latency is predictable and capacity scales by adding spines or leaves."
   ],
   [
    "When would you choose a two-tier (collapsed core) campus instead of three-tier?",
    "For a smaller campus where a separate core adds cost without benefit because there are only a few distribution blocks."
   ],
   [
    "In which cloud service model does the customer still manage the operating system?",
    "IaaS (infrastructure as a service): the provider supplies virtual hardware and the customer manages the OS, middleware and applications."
   ]
  ]
 },
 {
  "t": "IPv4 addressing and subnetting, including VLSM and private (RFC 1918) ranges",
  "body": [
   "An IPv4 address is 32 bits written as four decimal octets, such as 192.168.10.37. The subnet mask says how many of those bits identify the network and how many identify the host. In prefix notation, /24 means the first 24 bits are network bits, which is the mask 255.255.255.0. Subnetting is the skill of borrowing host bits to make more, smaller networks, and the CCNA expects you to do it quickly and accurately without a calculator.",
   "For any prefix, the number of host bits is 32 minus the prefix length. Usable hosts equal 2 to the power of the host bits, minus 2: one address is the network ID (all host bits 0) and one is the broadcast (all host bits 1). So /26 has 6 host bits, 64 addresses and 62 usable hosts. The block size, or increment, is 256 minus the mask value in the interesting octet. A /26 mask is 255.255.255.192, so the block size is 64 and subnets start at .0, .64, .128 and .192.",
   "To find the subnet an address belongs to, find the multiple of the block size at or below the address in the interesting octet. For 192.168.10.100/26, 100 falls between 64 and 128, so the network is 192.168.10.64, the broadcast is 192.168.10.127 and the usable range is .65 to .126. Practise this until it takes seconds, because many questions hide a subnetting step inside a routing or troubleshooting scenario.",
   "VLSM (variable-length subnet masking) means using different mask lengths within the same major network so each subnet is sized for its need. The method is to sort requirements from largest to smallest and allocate each from the next free block boundary. For 192.168.10.0/24 with needs of 60, 28, 12 and 2 hosts: 60 hosts needs /26 (62 usable), giving 192.168.10.0/26; 28 needs /27 (30 usable), giving 192.168.10.64/27; 12 needs /28 (14 usable), giving 192.168.10.96/28; and a point-to-point link needs /30 (2 usable), giving 192.168.10.112/30. Allocating largest first keeps every block on a valid boundary.",
   "RFC 1918 reserves three private ranges that are not routed on the internet: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. Organizations use them internally and translate to public addresses with NAT at the edge. Other special addresses worth knowing are 127.0.0.0/8 for loopback and 169.254.0.0/16 for link-local APIPA addresses.",
   "```text\nPrefix  Mask             Block  Usable hosts\n/24     255.255.255.0    256    254\n/25     255.255.255.128  128    126\n/26     255.255.255.192  64     62\n/27     255.255.255.224  32     30\n/28     255.255.255.240  16     14\n/29     255.255.255.248  8      6\n/30     255.255.255.252  4      2\n```"
  ],
  "terms": [
   [
    "Subnet mask / prefix length",
    "The bits that identify the network portion of an address, written as dotted decimal or as /n."
   ],
   [
    "Block size",
    "256 minus the mask value in the interesting octet; the distance between consecutive subnet IDs."
   ],
   [
    "VLSM",
    "Variable-length subnet masking: using different prefix lengths within one address space to size each subnet to its need."
   ],
   [
    "RFC 1918",
    "The standard defining private IPv4 ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
   ],
   [
    "Broadcast address",
    "The last address in a subnet, with all host bits set to 1, used to reach every host on that subnet."
   ]
  ],
  "example": "You are given 172.16.4.0/22 for a new building. You carve a /24 for each of three user floors and split the fourth /24 into smaller VLSM pieces: a /26 for printers, a /27 for cameras and several /30s for router links. Every block starts on a multiple of its own size, so none overlap.",
  "tip": "Watch for 172.x addresses: only 172.16 through 172.31 are private. An address like 172.32.1.1 is public, and questions use that to trap you.",
  "check": [
   [
    "What are the network, broadcast and usable range for 10.1.1.200/27?",
    "Block size is 32, so the subnet is 10.1.1.192, the broadcast is 10.1.1.223 and usable hosts are 10.1.1.193 to 10.1.1.222."
   ],
   [
    "What is the smallest prefix that supports 50 hosts?",
    "/26, which provides 62 usable addresses; /27 only provides 30."
   ],
   [
    "Why should you allocate the largest subnets first when doing VLSM?",
    "Large blocks need boundaries at larger multiples; allocating them first keeps every subnet aligned and avoids overlaps or wasted gaps."
   ]
  ]
 },
 {
  "t": "Troubleshoot IPv4 addressing: wrong mask, gateway outside the subnet, duplicate addresses, APIPA",
  "body": [
   "When a host cannot reach something, its own IP settings are one of the first things to check. Four problems appear again and again: a wrong subnet mask, a default gateway that is not in the host's subnet, two devices using the same address, and a host that failed to get DHCP and gave itself an APIPA address. Each has a recognizable symptom pattern.",
   "A wrong mask changes which destinations the host believes are local. If a host at 192.168.1.50 should be /24 but is configured /16, it thinks 192.168.5.10 is on its own network and sends an ARP request instead of forwarding to the gateway. Nobody answers, so that traffic fails, while traffic to other destinations may still work. A mask that is too long causes the opposite problem: the host treats some genuinely local neighbours as remote and sends their traffic to the gateway, which may or may not route it back. Partial connectivity, where some addresses work and some do not, is a strong hint to check the mask.",
   "The default gateway must be an address in the host's own subnet, because the host reaches the gateway by ARPing for it directly. If a host is 10.1.1.20/24 and its gateway is 10.1.2.1, the host can talk to local devices but nothing off-subnet. The same applies in reverse: the router interface must be configured with an address and mask that match the hosts. Compare `ipconfig` on the PC with `show ip interface brief` and `show running-config interface` on the router.",
   "Duplicate addresses cause intermittent problems. Two devices answer ARP for the same IP, so switches and other hosts keep updating their tables and traffic goes to one device, then the other. Windows usually warns about an address conflict, and IOS logs a duplicate address message when a device uses the router's own interface address. Use `show ip arp` on the router or `arp -a` on a host to see which MAC address currently owns the IP, then trace that MAC through `show mac address-table` to the switch port. DHCP servers help avoid conflicts, and excluding statically assigned addresses from DHCP pools prevents the server from handing them out.",
   "APIPA (Automatic Private IP Addressing) is what Windows and many other systems do when they are set to use DHCP but get no reply: they assign themselves an address from 169.254.0.0/16 with no gateway. An APIPA address therefore tells you the host never reached a DHCP server. The cause is on the path to DHCP: a disconnected cable, the port in the wrong VLAN, a missing `ip helper-address` on the router, or a DHCP server that has run out of addresses. It is not a problem to fix on the host itself.",
   "A good troubleshooting habit is to ping outward in steps: the host's own address, the default gateway, a remote address and then a name. Where the steps start failing tells you which layer or setting to inspect."
  ],
  "terms": [
   [
    "Default gateway",
    "The router address a host sends off-subnet traffic to; it must be inside the host's own subnet."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing: a self-assigned 169.254.x.x/16 address used when a DHCP client gets no reply."
   ],
   [
    "Duplicate address",
    "Two devices configured with the same IP, causing ARP entries to flip and intermittent connectivity."
   ],
   [
    "ARP",
    "Address Resolution Protocol, which maps a known IPv4 address to the MAC address on the local segment."
   ]
  ],
  "example": "A user reports that email works but the internal wiki does not. `ipconfig` shows 10.10.20.35 with mask 255.0.0.0. The wiki is at 10.10.40.8, which the PC now considers local, so it ARPs for it and gets no answer. Correcting the mask to 255.255.255.0 sends that traffic to the gateway and the wiki loads.",
  "tip": "A 169.254.x.x address never means 'fix the PC's IP'; it means the DHCP exchange failed. Look for the answer about VLANs, cabling, the DHCP server or the helper address.",
  "check": [
   [
    "A PC shows 169.254.33.7 with no default gateway. What does this tell you?",
    "The PC is a DHCP client that received no offer and self-assigned an APIPA address; the problem lies in reaching the DHCP server, such as VLAN, cabling, relay or pool exhaustion."
   ],
   [
    "A host is 192.168.4.10/24 with gateway 192.168.5.1. What works and what fails?",
    "Communication with other hosts in 192.168.4.0/24 works; everything off-subnet fails because the gateway is not in the host's subnet and cannot be ARPed."
   ],
   [
    "Which commands help locate the device using a duplicate IP address?",
    "Use show ip arp or arp -a to find the MAC address for the IP, then show mac address-table to find the switch port where that MAC is learned."
   ]
  ]
 },
 {
  "t": "IPv6 address types and prefixes: global unicast, unique local, link-local, multicast, anycast",
  "body": [
   "IPv6 addresses are 128 bits, written as eight groups of four hexadecimal digits separated by colons, such as 2001:0db8:0000:0000:0000:0000:0000:0001. Two rules shorten them. Leading zeros in any group can be dropped, so 0db8 becomes db8. One run of consecutive all-zero groups can be replaced by a double colon, so the address above becomes 2001:db8::1. You may use the double colon only once in an address, otherwise its length is ambiguous.",
   "IPv6 has no broadcast. Instead it uses unicast (one to one), multicast (one to many) and anycast (one to nearest). The address type is identified by its leading bits, and the CCNA expects you to recognize each by its prefix. Most networks use a /64 prefix on every LAN, giving 64 bits for the network and 64 bits for the interface ID.",
   "Global unicast addresses (GUAs) are the IPv6 equivalent of public IPv4 addresses and are routable on the internet. They currently come from 2000::/3, so they begin with 2 or 3. A typical GUA has a global routing prefix assigned by a provider or registry, a subnet ID the organization uses to number its subnets, and the interface ID. The range 2001:db8::/32 is reserved for documentation, which is why examples use it.",
   "Unique local addresses (ULAs) are the rough equivalent of RFC 1918 private space. They are in fc00::/7, and in practice start with fd because the eighth bit should be set to 1 for locally assigned prefixes, followed by a pseudo-random global ID. ULAs are meant for internal use and are not routed on the internet.",
   "Link-local addresses are in fe80::/10 and are always present on every IPv6-enabled interface, created automatically. They are valid only on the local link and are never forwarded by a router. They are used for neighbor discovery, router advertisements and as the next-hop address in routing protocols. That is why `show ipv6 route` often lists next hops that begin with FE80.",
   "Multicast addresses begin with ff, from ff00::/8. Important ones are ff02::1 (all nodes on the link), ff02::2 (all routers on the link), ff02::5 and ff02::6 (OSPFv3 routers), and the solicited-node multicast address ff02::1:ffxx:xxxx, which replaces ARP broadcasts by letting a host send a neighbor solicitation to only those nodes whose address ends in the same 24 bits. Anycast is not a separate range: it is a unicast address configured on several devices, and routing delivers packets to the nearest one. It is commonly used for DNS servers and content delivery. Finally, :: is the unspecified address and ::1 is the loopback."
  ],
  "terms": [
   [
    "Global unicast address",
    "A publicly routable IPv6 address, currently allocated from 2000::/3."
   ],
   [
    "Unique local address",
    "A private IPv6 address from fc00::/7 (in practice fd00::/8), not routed on the internet."
   ],
   [
    "Link-local address",
    "An automatically created fe80::/10 address valid only on one link, used by neighbor discovery and routing protocols."
   ],
   [
    "Solicited-node multicast",
    "An ff02::1:ff00:0/104 address derived from the last 24 bits of a unicast address, used for address resolution instead of broadcast."
   ],
   [
    "Anycast",
    "A unicast address assigned to multiple devices so that packets are routed to the nearest one."
   ]
  ],
  "example": "On a router interface, `show ipv6 interface g0/0` lists a link-local address FE80::1, a global address 2001:DB8:ACAD:10::1/64, and joined groups FF02::1, FF02::2 and FF02::1:FF00:1. Hosts on the LAN learn the router's link-local address as their default gateway from its router advertisements.",
  "tip": "Memorize the first characters: 2 or 3 is global unicast, FD is unique local, FE80 is link-local, FF is multicast. Anycast has no prefix of its own, which is a favourite trick question.",
  "check": [
   [
    "Compress 2001:0db8:0000:0010:0000:0000:0000:0001.",
    "2001:db8:0:10::1. Leading zeros are removed and the longest run of zero groups becomes the double colon."
   ],
   [
    "Which IPv6 address type would a router use as the next hop in its routing table for a directly connected neighbor, and why?",
    "The neighbor's link-local (fe80::/10) address, because every IPv6 interface has one and routing protocols use it for neighbor communication."
   ],
   [
    "What replaces IPv4 broadcasts in IPv6 address resolution?",
    "Neighbor solicitation messages sent to the target's solicited-node multicast address, so only interested hosts process them."
   ]
  ]
 },
 {
  "t": "IPv6 address configuration: static, EUI-64, SLAAC and RA messages; troubleshoot IPv6 addressing",
  "body": [
   "Once you know the address types, you need to know how an interface actually gets its IPv6 address. There are three main ways: configure it statically, let the device build the interface ID with EUI-64, or let hosts configure themselves with SLAAC (stateless address autoconfiguration) based on router advertisements. DHCPv6 is a fourth option you should recognize.",
   "On a Cisco router, IPv6 routing must be turned on globally with `ipv6 unicast-routing`. Without it the router will not forward IPv6 packets or send router advertisements. A static address is set with `ipv6 address 2001:db8:acad:1::1/64` on the interface. Adding `ipv6 address` automatically enables IPv6 on the interface and creates a link-local address; you can also set a memorable link-local with `ipv6 address fe80::1 link-local`.",
   "EUI-64 lets you configure just the prefix and have the router build the 64-bit interface ID from its MAC address: `ipv6 address 2001:db8:acad:1::/64 eui-64`. The process takes the 48-bit MAC, splits it in half, inserts FFFE in the middle, and flips the seventh bit of the first byte (the universal/local bit). For MAC 0050.3e11.2233, the halves are 0050.3e and 11.2233; inserting FFFE gives 0050:3eff:fe11:2233; flipping the seventh bit changes 00 to 02, giving the interface ID 0250:3eff:fe11:2233, written as 250:3eff:fe11:2233.",
   "SLAAC lets hosts configure themselves with no DHCP server. A router sends router advertisement (RA) messages to ff02::1 periodically, and immediately in reply to a router solicitation (RS) that a host sends to ff02::2 when it boots. The RA carries the on-link prefix and length, and the router's link-local address, which the host uses as its default gateway. The host builds its own interface ID, using EUI-64 or, more commonly on modern operating systems, a random value for privacy. Before using any address, the host runs duplicate address detection (DAD) by sending a neighbor solicitation for that address; if nobody answers, the address is unique.",
   "RA flags tell hosts what else to do. With the M (managed) flag set, hosts use stateful DHCPv6 for their address. With the O (other) flag set, they use SLAAC for the address but get extra information such as DNS servers from stateless DHCPv6. With neither, they rely on SLAAC and whatever the RA itself provides.",
   "When troubleshooting, verify with `show ipv6 interface brief` and `show ipv6 interface`, and on hosts with `ipconfig` or `ip -6 addr`. Common faults are: a host with only a link-local address, which means it received no RA, often because `ipv6 unicast-routing` is missing; a prefix length other than /64 on a LAN, which breaks SLAAC; mistyped prefixes that put the router and hosts in different subnets; and a duplicate address flagged as DUPLICATE by DAD."
  ],
  "terms": [
   [
    "EUI-64",
    "A method of building a 64-bit interface ID from a 48-bit MAC by inserting FFFE and flipping the seventh bit."
   ],
   [
    "SLAAC",
    "Stateless address autoconfiguration, where hosts build their own address from the prefix in a router advertisement."
   ],
   [
    "Router advertisement (RA)",
    "An ICMPv6 message from a router announcing the prefix, default gateway and configuration flags."
   ],
   [
    "Router solicitation (RS)",
    "An ICMPv6 message a host sends to ff02::2 asking routers to send an RA immediately."
   ],
   [
    "Duplicate address detection (DAD)",
    "A check in which a host sends a neighbor solicitation for its tentative address to make sure no one else uses it."
   ]
  ],
  "example": "A new IPv6 lab has routers configured with global addresses, yet PCs only show fe80 addresses. Checking the running config reveals `ipv6 unicast-routing` was never entered, so the routers are not sending router advertisements. After adding it, the PCs receive RAs, build 2001:db8:acad:10:: addresses with SLAAC and ping the router.",
  "tip": "In EUI-64, remember both steps: insert FFFE in the middle and flip the seventh bit. Most wrong answer choices do only one of the two.",
  "check": [
   [
    "What interface ID does EUI-64 produce from MAC address 00a0.c912.3456?",
    "02a0:c9ff:fe12:3456. Split the MAC, insert FFFE, and flip the seventh bit so 00 becomes 02."
   ],
   [
    "A host has only a link-local IPv6 address. What is the most likely cause?",
    "It is not receiving router advertisements, for example because ipv6 unicast-routing is not enabled on the router or no router is on that link."
   ],
   [
    "What does a set O flag in an RA tell hosts?",
    "Build the address with SLAAC but obtain other settings, such as DNS servers, from stateless DHCPv6."
   ]
  ]
 },
 {
  "t": "Wireless principles: 2.4, 5 and 6 GHz bands, non-overlapping channels, SSID, RF interference",
  "body": [
   "Wireless LANs (WLANs) based on the IEEE 802.11 standards send data over radio frequency (RF) instead of cables. Radio is a shared medium: every device on the same channel in the same area competes for airtime, and only one can transmit at a time. That is why channel planning and interference control matter so much, and why the CCNA tests the bands, channels and naming terms.",
   "Wi-Fi uses three unlicensed bands. The 2.4 GHz band has the longest range and best penetration through walls, but it is crowded and narrow. Its channels are 5 MHz apart while each transmission is about 20 MHz wide, so neighbouring channels overlap. In most regions, including North America, the only three non-overlapping channels are 1, 6 and 11, and a good design assigns neighbouring access points (APs) to different ones of those three. The 2.4 GHz band is also shared with Bluetooth, microwave ovens, cordless phones and other devices.",
   "The 5 GHz band offers many more non-overlapping 20 MHz channels, which makes it easier to avoid co-channel interference, and supports channel bonding into 40, 80 or 160 MHz channels for higher throughput. The trade-off is shorter range and weaker penetration. Some 5 GHz channels require dynamic frequency selection (DFS), meaning the AP must move off a channel if it detects radar. The 6 GHz band, opened for Wi-Fi 6E and later, adds a large block of clean spectrum with many wide channels and no legacy devices, but has even shorter range and only newer clients can use it. 6 GHz networks must use WPA3 (or Enhanced Open for open networks); older WPA2 security is not allowed there.",
   "Several names describe WLAN structure. The SSID (service set identifier) is the human-readable network name clients see. A BSS (basic service set) is one AP and its associated clients, identified by the BSSID, which is the AP radio's MAC address. An ESS (extended service set) is multiple APs sharing the same SSID, connected by a wired distribution system, so clients can roam between them. An IBSS, or ad hoc network, is clients talking directly with no AP. When designing an ESS, adjacent cells should overlap slightly (often cited as around 10 to 15 percent) so clients can roam, but use different channels.",
   "RF interference comes in a few forms. Co-channel interference happens when nearby APs use the same channel, forcing them to share airtime. Adjacent-channel interference happens when they use overlapping channels, such as 1 and 3 in 2.4 GHz, and is worse because the signals corrupt each other. Non-Wi-Fi interference comes from microwaves, Bluetooth, wireless cameras and similar devices. Physical effects also weaken signals: absorption by walls and water, reflection off metal, refraction, scattering and diffraction around obstacles. Signal strength is measured with RSSI (received signal strength indicator) and quality with SNR (signal-to-noise ratio); a strong signal with a high noise floor can still perform badly."
  ],
  "terms": [
   [
    "SSID",
    "The service set identifier, the network name that clients use to find and join a WLAN."
   ],
   [
    "BSSID",
    "The MAC address of an AP radio, uniquely identifying a basic service set."
   ],
   [
    "ESS",
    "An extended service set: several APs with the same SSID joined by a wired network so clients can roam."
   ],
   [
    "Non-overlapping channels",
    "Channels whose frequencies do not overlap; in 2.4 GHz these are 1, 6 and 11."
   ],
   [
    "Co-channel interference",
    "Contention when nearby APs use the same channel and must share airtime."
   ]
  ],
  "example": "An office has four 2.4 GHz APs all on channel 6 and users complain of slow Wi-Fi. A site survey shows heavy co-channel contention and a microwave oven near one AP. The engineer reassigns the APs to channels 1, 6, 11 and 1 (placing the two channel-1 APs furthest apart) and moves most clients to the 5 GHz band.",
  "tip": "If the question asks for non-overlapping 2.4 GHz channels, answer 1, 6 and 11. If it asks which band gives the most range, answer 2.4 GHz; if it asks for the most channels and capacity, answer 5 or 6 GHz.",
  "check": [
   [
    "Why is using channels 1, 4, 8 and 11 on adjacent 2.4 GHz APs a poor design?",
    "Channels 4 and 8 overlap with their neighbours, causing adjacent-channel interference; adjacent APs should use only 1, 6 and 11."
   ],
   [
    "What identifies a single AP radio's BSS, and what do multiple APs with the same network name form?",
    "The BSSID, which is the radio's MAC address; multiple APs sharing an SSID over a wired distribution system form an ESS."
   ],
   [
    "Name two trade-offs of the 6 GHz band compared with 2.4 GHz.",
    "It offers far more clean spectrum and wide channels, but has shorter range and weaker wall penetration, and only newer clients support it."
   ]
  ]
 },
 {
  "t": "Troubleshoot wired and wireless client connectivity (verify IP settings on Windows, macOS and Linux)",
  "body": [
   "Many network tickets start with a single user who cannot connect. Before you look at switches or routers, verify what the client itself believes: its IP address, mask, default gateway and DNS servers, and whether it is actually connected at Layers 1 and 2. The CCNA expects you to know the commands on the three common desktop operating systems and to interpret their output.",
   "On Windows, `ipconfig` shows the IPv4 and IPv6 addresses, mask and default gateway for each adapter. `ipconfig /all` adds the MAC (physical) address, whether DHCP is enabled, the DHCP server, lease times and DNS servers. `ipconfig /release` and `ipconfig /renew` drop and request a DHCP lease, and `ipconfig /flushdns` clears the local DNS cache. `netsh wlan show interfaces` reports the connected SSID, BSSID, channel and signal quality for Wi-Fi.",
   "On macOS, `ifconfig` shows interfaces and addresses (en0 is often Wi-Fi on laptops). `ipconfig getifaddr en0` prints just the address, and `networksetup -getinfo Wi-Fi` shows address, mask and router. `netstat -rn` shows the routing table, where the default route reveals the gateway. On Linux, the modern tool is `ip`: `ip addr` (or `ip a`) lists addresses, `ip route` shows the default gateway, and `ip link` shows link state. Older systems still have `ifconfig` and `route -n`. DNS settings live in `/etc/resolv.conf` or can be checked with `resolvectl status` on systems using systemd-resolved. All three platforms support `ping`, `nslookup` and a traceroute tool (`tracert` on Windows, `traceroute` on macOS and Linux).",
   "Use a structured approach. First check the physical and data link layers: is the cable plugged in and the link light on, or is the laptop associated to the correct SSID with a reasonable signal? Then check the IP configuration: a 169.254 address points to DHCP failure; a correct-looking address with the wrong mask or gateway points to static misconfiguration. Next, test reachability in steps: ping the gateway, then a remote IP, then a name. If an IP works but a name does not, the problem is DNS.",
   "Wireless adds its own failure points. The client may be on the wrong SSID, may have a saved wrong passphrase, may fail 802.1X authentication, may be too far from the AP, or may be on a crowded or interfered-with channel. A client that is associated but has an APIPA address often has a correct wireless connection but the WLAN is mapped to a VLAN where DHCP is not reachable. Also compare with a working client in the same place: if others connect fine, focus on the client; if everyone fails, focus on the network."
  ],
  "terms": [
   [
    "ipconfig /all",
    "Windows command that shows full adapter details, including MAC, DHCP server, lease and DNS servers."
   ],
   [
    "ip addr / ip route",
    "Linux commands that show interface addresses and the routing table, including the default gateway."
   ],
   [
    "ifconfig",
    "Legacy interface command still used on macOS and older Linux to display addresses and interface state."
   ],
   [
    "RSSI",
    "Received signal strength indicator, a measure of how strong the wireless signal is at the client."
   ]
  ],
  "example": "A Linux laptop user cannot browse. `ip a` shows 10.20.30.44/24 on wlan0 and `ip route` shows a default via 10.20.30.1. `ping 10.20.30.1` and `ping 8.8.8.8` both succeed, but `ping intranet.example.com` fails with a name resolution error. `/etc/resolv.conf` lists an old DNS server. Correcting the DNS setting fixes the problem.",
  "tip": "Know which OS each command belongs to: ipconfig on Windows, ifconfig on macOS, ip addr on Linux. Questions often show output and ask which platform or which setting is wrong.",
  "check": [
   [
    "Which Windows command shows the DNS servers and DHCP server a client is using?",
    "ipconfig /all."
   ],
   [
    "A user can ping a remote server by IP but not by name. Which setting do you investigate?",
    "DNS: the client's configured DNS servers and whether they can resolve the name."
   ],
   [
    "On a modern Linux host, how do you display the default gateway?",
    "Run ip route and look for the line starting with 'default via'."
   ]
  ]
 },
 {
  "t": "DHCPv4 on IOS: server pools, excluded addresses, relay with ip helper-address, troubleshooting leases",
  "body": [
   "DHCP (Dynamic Host Configuration Protocol) hands out IP addresses and settings automatically so you do not configure every host by hand. A Cisco router or multilayer switch can act as a DHCP server for small sites, and more commonly as a relay that forwards requests to a central server. You need to know both configurations and how to troubleshoot them.",
   "The DHCP exchange has four steps, remembered as DORA. The client broadcasts a Discover. The server replies with an Offer containing a proposed address. The client broadcasts a Request to accept that offer (broadcast so other servers know their offers were declined). The server confirms with an Acknowledgment. Clients use UDP port 68 and servers UDP port 67. Leases expire, so clients try to renew with the server at half the lease time.",
   "To configure an IOS DHCP server, first exclude addresses you assign statically, such as the gateway, servers and printers, then build a pool. Exclusions are global commands and apply across all pools.",
   "```text\nip dhcp excluded-address 192.168.10.1 192.168.10.10\nip dhcp pool LAN10\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 192.168.1.53\n domain-name example.local\n lease 7\n```",
   "Because Discover messages are broadcasts, they do not cross routers. When the DHCP server is on another subnet, configure a relay on the router interface that faces the clients: `ip helper-address 10.1.1.20` on interface g0/1 (or the VLAN's SVI). The router receives the broadcast, fills in the giaddr (gateway IP address) field with its interface address and unicasts the request to the server. The server uses giaddr to pick the pool whose network matches, which is why the server must have a pool for that client subnet. By default `ip helper-address` also forwards several other UDP broadcast services, such as DNS and TFTP.",
   "Useful verification commands are `show ip dhcp binding` to see leased addresses and client identifiers, `show ip dhcp pool` for utilization, `show ip dhcp conflict` for addresses the server found already in use, and `debug ip dhcp server events`. A router can also be a DHCP client on an interface with `ip address dhcp`, which is common on a WAN link to an internet provider.",
   "Common faults: no helper address on the client-facing interface, so remote clients get APIPA; a helper pointing at the wrong server; a pool whose `network` statement does not match the client subnet; forgetting `default-router`, so clients get an address but cannot leave the subnet; exclusions missing, so the server hands out the gateway address; the pool running out of addresses; and DHCP snooping dropping offers on an untrusted port."
  ],
  "terms": [
   [
    "DORA",
    "The DHCP exchange: Discover, Offer, Request, Acknowledgment."
   ],
   [
    "ip dhcp excluded-address",
    "Global IOS command that prevents the DHCP server from leasing a range of addresses."
   ],
   [
    "ip helper-address",
    "Interface command that relays client DHCP broadcasts as unicasts to a server on another subnet."
   ],
   [
    "giaddr",
    "The gateway IP address field a relay agent fills in so the server knows which subnet the client is on."
   ],
   [
    "show ip dhcp binding",
    "Command listing the addresses the IOS DHCP server has leased and to which clients."
   ]
  ],
  "example": "A new VLAN 30 is created and its SVI gets 10.30.0.1/24, but PCs on it receive 169.254 addresses. The central Windows DHCP server is at 10.1.1.20. Adding `ip helper-address 10.1.1.20` under `interface vlan 30` and creating a 10.30.0.0/24 scope on the server fixes it, and the server's lease list for the new scope confirms the clients are getting addresses.",
  "tip": "The helper address goes on the interface that receives the client broadcasts, not the interface facing the server. This placement is a common exam trap.",
  "check": [
   [
    "What does the relay agent put in giaddr, and why does it matter?",
    "The IP address of the interface that received the client's broadcast; the server uses it to choose the pool or scope matching the client's subnet."
   ],
   [
    "Clients get addresses but cannot reach anything off-subnet. Which pool command was likely forgotten?",
    "default-router, which supplies the default gateway."
   ],
   [
    "Why should you exclude the router's interface address from the pool?",
    "Otherwise the server could lease that address to a client, creating a duplicate address conflict with the gateway."
   ]
  ]
 },
 {
  "t": "Switching concepts: MAC learning and aging, frame forwarding, flooding of unknown unicast and broadcast",
  "body": [
   "A Layer 2 switch forwards Ethernet frames based on MAC (media access control) addresses. Unlike a hub, which repeats every bit out every port, a switch sends each frame only where it needs to go, which creates a separate collision domain on each port and allows full-duplex operation. Understanding exactly how a switch decides where to send a frame is the foundation for VLANs, spanning tree and Layer 2 security.",
   "The switch builds its MAC address table (also called the CAM table, for content addressable memory) by learning. Every time a frame arrives, the switch reads the source MAC address and records it against the incoming port and VLAN. If the entry already exists, the timer is refreshed; if the MAC appears on a different port, the entry moves. Entries that are not refreshed are removed after the aging time, which is 300 seconds by default on Cisco switches. Aging keeps the table accurate when devices move or disconnect.",
   "Forwarding uses the destination MAC. If the destination is a known unicast address in the table on a different port, the switch forwards the frame out only that port. If the destination is on the same port the frame arrived on, the switch filters (drops) it, because the destination has already seen it. If the destination is an unknown unicast, meaning not in the table, the switch floods the frame out every port in that VLAN except the one it arrived on. Broadcasts (FFFF.FFFF.FFFF) are always flooded the same way, and multicasts are flooded too unless a feature such as IGMP snooping limits them.",
   "Flooding is normal and self-correcting: when the destination replies, the switch learns its location from the reply's source address, and future frames are forwarded directly. All ports in a VLAN share one broadcast domain, so every broadcast reaches every device in that VLAN. Routers, and VLAN boundaries, separate broadcast domains.",
   "Switches forward in one of two ways. Store-and-forward receives the whole frame and checks the frame check sequence before forwarding, dropping corrupted frames; this is what most modern Cisco switches use. Cut-through starts forwarding as soon as it reads the destination address, which lowers latency but can forward damaged frames.",
   "On the CLI, `show mac address-table` lists entries with VLAN, MAC, type (DYNAMIC or STATIC) and port. `show mac address-table dynamic interface g0/1` narrows it down, `show mac address-table aging-time` shows the timer and `clear mac address-table dynamic` empties learned entries. These commands are how you trace a device to the port it is connected to."
  ],
  "terms": [
   [
    "MAC address table (CAM table)",
    "The switch table mapping learned MAC addresses to ports and VLANs."
   ],
   [
    "Aging time",
    "How long an unrefreshed MAC entry stays in the table; 300 seconds by default on Cisco switches."
   ],
   [
    "Unknown unicast flooding",
    "Sending a frame out all ports in the VLAN except the ingress port because its destination MAC is not yet in the table."
   ],
   [
    "Broadcast domain",
    "The set of devices that receive each other's broadcasts; one per VLAN, bounded by routers."
   ],
   [
    "Store-and-forward",
    "Switching method that receives and error-checks the entire frame before forwarding it."
   ]
  ],
  "example": "PC-A (port 1) sends its first frame to PC-B (port 5) on a freshly booted switch. The switch learns PC-A on port 1, does not know PC-B, and floods the frame out every other port in the VLAN. PC-B replies; the switch learns PC-B on port 5 and forwards the reply only out port 1. From then on, traffic between them goes only between ports 1 and 5.",
  "tip": "Learning uses the source MAC; forwarding uses the destination MAC. If a question asks what the switch does when it has never seen the destination, the answer is flood out all ports in the same VLAN except the one it came in on.",
  "check": [
   [
    "Which address does a switch use to populate its MAC address table?",
    "The source MAC address of incoming frames, recorded with the ingress port and VLAN."
   ],
   [
    "What does a switch do with a frame whose destination MAC is in the table on the same port it arrived on?",
    "It filters (drops) the frame, because the destination is on the segment the frame came from."
   ],
   [
    "Why does a switch flood broadcast frames?",
    "A broadcast is addressed to every device in the broadcast domain, so it must be sent out every port in the VLAN except the ingress port."
   ]
  ]
 },
 {
  "t": "VLANs (normal range) across multiple switches: access ports, data and voice VLANs, default VLAN",
  "body": [
   "A VLAN (virtual LAN) splits one physical switch, or a group of switches, into separate Layer 2 networks. Each VLAN is its own broadcast domain and normally its own IP subnet. VLANs let you group users by role instead of location, limit the reach of broadcasts, and apply security between groups, because traffic between VLANs must go through a router or Layer 3 switch where it can be filtered.",
   "Normal-range VLANs are numbered 1 to 1005. VLAN 1 is the default VLAN: every port belongs to it out of the box, and it cannot be deleted or renamed. VLANs 1002 to 1005 are reserved for legacy Token Ring and FDDI and also cannot be deleted. On many switches normal-range VLANs are stored in a file called vlan.dat in flash rather than in the running configuration. Extended-range VLANs are 1006 to 4094. A common security practice is to move all user ports out of VLAN 1 and shut down unused ports in an unused VLAN.",
   "An access port belongs to a single data VLAN and sends and receives untagged frames; end devices do not know which VLAN they are in. You create the VLAN and assign ports like this:",
   "```text\nvlan 10\n name SALES\nvlan 20\n name VOICE\ninterface g1/0/5\n switchport mode access\n switchport access vlan 10\n switchport voice vlan 20\n```",
   "The voice VLAN solves a common problem: an IP phone plugs into the switch port and a PC plugs into the phone. The switch uses CDP (or LLDP) to tell the phone which voice VLAN to use. The phone tags its voice traffic with VLAN 20 and marks it with a priority, while the PC's traffic passes through untagged into data VLAN 10. The port is still treated as an access port, with one data VLAN and one voice VLAN, which lets voice and data use separate subnets and QoS treatment.",
   "When VLANs span several switches, every switch must know the VLAN, and the links between switches must be trunks that carry that VLAN, tagged with 802.1Q. A host in VLAN 10 on switch 1 can then reach a host in VLAN 10 on switch 2 at Layer 2. If the VLAN does not exist on a switch in the path, or the trunk does not allow it, frames for that VLAN are dropped. Hosts in different VLANs still need a router to communicate.",
   "Verify with `show vlan brief`, which lists each VLAN and its access ports (trunk ports are not listed), and `show interfaces g1/0/5 switchport`, which shows the administrative and operational mode, access VLAN and voice VLAN. A port assigned to a VLAN that has not been created, or was deleted, becomes inactive and passes no traffic."
  ],
  "terms": [
   [
    "VLAN",
    "A logical Layer 2 broadcast domain created on switches, usually mapped to one IP subnet."
   ],
   [
    "Access port",
    "A switch port that carries untagged traffic for a single data VLAN (optionally plus a voice VLAN)."
   ],
   [
    "Voice VLAN",
    "A separate VLAN for IP phone traffic on an access port, tagged by the phone while PC traffic stays untagged."
   ],
   [
    "Default VLAN",
    "VLAN 1, to which all ports belong by default; it cannot be deleted."
   ],
   [
    "Normal-range VLANs",
    "VLAN IDs 1 to 1005, with 1002 to 1005 reserved for legacy technologies."
   ]
  ],
  "example": "A clinic has reception and doctors on two floors, each floor with its own switch. VLAN 10 (STAFF) and VLAN 20 (VOICE) are created on both switches, desks use access ports with `switchport access vlan 10` and `switchport voice vlan 20`, and the inter-floor link is a trunk. A doctor's PC upstairs and the reception PC downstairs sit in the same subnet, while phones on both floors share the voice subnet.",
  "tip": "show vlan brief never lists trunk ports. If a question shows a port missing from that output, suspect it is a trunk, not that it is in no VLAN.",
  "check": [
   [
    "Which VLAN are all switch ports in by default, and can it be deleted?",
    "VLAN 1, the default VLAN; it cannot be deleted or renamed."
   ],
   [
    "An IP phone and PC share one switch port. How does the switch separate their traffic?",
    "The phone tags voice frames with the voice VLAN learned via CDP or LLDP, while the PC's frames arrive untagged and are placed in the access (data) VLAN."
   ],
   [
    "Hosts in VLAN 30 on two different switches cannot ping each other, but other VLANs work. Name two likely causes.",
    "VLAN 30 does not exist on one switch, or it is not allowed on the trunk between them."
   ]
  ]
 },
 {
  "t": "Layer 2 edge-port attributes: VLAN, Power over Ethernet (PoE), port channel and LACP",
  "body": [
   "Edge ports are the switch ports that face end devices and servers, as opposed to the links between switches. Configuring an edge port correctly means deciding which VLAN it belongs to, whether it supplies power to the attached device, and, for servers or uplinks that need more bandwidth and redundancy, whether several ports should be bundled together. The CCNA groups these together as edge-port attributes.",
   "The VLAN decision comes first. A user port is an access port in the correct data VLAN, often with a voice VLAN for a phone. A port facing a virtualization host or an AP that serves several SSIDs may instead be a trunk carrying several VLANs. Unused ports should be shut down and placed in an unused VLAN, and edge ports are usually configured with PortFast so they begin forwarding immediately.",
   "Power over Ethernet (PoE) lets the switch supply DC power over the same twisted-pair cable that carries data, so IP phones, wireless APs and cameras need no separate power supply. The switch is the power sourcing equipment (PSE) and the phone or AP is the powered device (PD). Before applying power, the PSE detects whether a PD is present, so it will not send power to an ordinary PC NIC. The IEEE standards have increased available power over time: 802.3af (PoE), 802.3at (PoE+) and 802.3bt, which supports higher-power devices. The switch has a total PoE power budget, and if too many devices draw power, some may not be powered. `show power inline` shows each port's draw and the remaining budget, and `power inline auto` (the default) or `power inline never` controls it per port.",
   "A port channel, also called EtherChannel, bundles two to eight physical links into one logical link. Spanning tree sees the bundle as one link, so all members forward instead of all but one being blocked. Traffic is load-balanced across the members per flow, based on a hash of addresses, and if one member fails the others keep carrying traffic. Port channels are common between switches and also between a switch and a server with two or more NICs.",
   "LACP (Link Aggregation Control Protocol, IEEE 802.3ad, now part of 802.1AX) negotiates and monitors the bundle. Each side sends LACP messages to confirm that the other end is part of the same bundle with matching settings, which protects against miscabling. LACP modes are active, which initiates negotiation, and passive, which responds only. Active with active, or active with passive, forms a bundle; passive with passive does not. Cisco's older proprietary equivalent is PAgP, and you can also configure a static bundle with `mode on`, which uses no negotiation at all."
  ],
  "terms": [
   [
    "Power over Ethernet (PoE)",
    "Delivery of DC power over Ethernet twisted-pair cabling from a switch to devices such as phones and APs."
   ],
   [
    "PSE / PD",
    "Power sourcing equipment (the switch) and powered device (the phone, AP or camera)."
   ],
   [
    "Power budget",
    "The total PoE power a switch can supply across all ports."
   ],
   [
    "Port channel (EtherChannel)",
    "A logical link made of several bundled physical links that load-share and provide redundancy."
   ],
   [
    "LACP",
    "The IEEE standard protocol that negotiates EtherChannel bundles, with active and passive modes."
   ]
  ],
  "example": "A new ceiling AP needs power and two VLANs for its staff and guest SSIDs. The port is configured as a trunk allowing VLANs 10 and 50, and `show power inline` confirms the AP is drawing power within the switch's budget. The server beside it has two NICs bundled into Port-channel 5 with `channel-group 5 mode active` on both switch ports.",
  "tip": "LACP passive plus passive never forms a channel, because neither side starts negotiation. At least one side must be active.",
  "check": [
   [
    "Why does a PoE switch not damage a laptop plugged into a PoE-enabled port?",
    "The PSE first performs detection to confirm a powered device is present, and only then supplies power."
   ],
   [
    "What advantage does an EtherChannel have over two separate parallel links between switches?",
    "Spanning tree treats the bundle as one link, so both links forward and share load instead of one being blocked, and a member failure does not trigger reconvergence."
   ],
   [
    "Which LACP mode combinations form a bundle?",
    "Active-active and active-passive. Passive-passive does not."
   ]
  ]
 },
 {
  "t": "802.1Q trunking: native VLAN, allowed VLAN lists, DTP modes",
  "body": [
   "A trunk is a switch link that carries traffic for many VLANs over one physical connection. Without trunks you would need a separate cable between switches for every VLAN. The IEEE 802.1Q standard makes trunking work by inserting a 4-byte tag into each Ethernet frame between the source MAC address and the EtherType. The tag includes a 12-bit VLAN ID (so up to 4094 usable VLANs) and a 3-bit priority field used for class of service. The receiving switch reads the tag, removes it and forwards the frame in the right VLAN.",
   "One VLAN on each 802.1Q trunk is the native VLAN, and its frames are sent untagged. By default the native VLAN is VLAN 1. If a switch receives an untagged frame on a trunk, it places it in the native VLAN. Both ends of the trunk must agree on the native VLAN; if they differ, traffic from one VLAN leaks into another, and CDP will log a native VLAN mismatch error. For security, best practice is to change the native VLAN to an unused VLAN that carries no user traffic, which helps mitigate VLAN hopping by double tagging.",
   "The allowed VLAN list controls which VLANs a trunk carries. By default, all VLANs are allowed. You can restrict it, and you must be careful with syntax: `switchport trunk allowed vlan 10,20` replaces the list, while `switchport trunk allowed vlan add 30` adds to it and `remove` removes from it. Forgetting the `add` keyword is a classic outage cause. `show interfaces trunk` displays each trunk's mode, encapsulation, native VLAN, allowed VLANs, VLANs active in the management domain and VLANs forwarding (not pruned or blocked by spanning tree).",
   "```text\ninterface g0/1\n switchport trunk encapsulation dot1q   ! only on switches that also support ISL\n switchport mode trunk\n switchport trunk native vlan 999\n switchport trunk allowed vlan 10,20,30\n switchport nonegotiate\n```",
   "DTP (Dynamic Trunking Protocol) is a Cisco protocol that negotiates whether a link becomes a trunk. The modes are `access` (never a trunk), `trunk` (always a trunk, and still sends DTP unless disabled), `dynamic desirable` (actively tries to form a trunk) and `dynamic auto` (becomes a trunk only if the other side asks). The results: desirable with trunk, desirable or auto forms a trunk; auto with trunk forms a trunk; auto with auto stays an access port, because neither side initiates. `switchport nonegotiate` turns DTP off on a statically configured trunk.",
   "Because DTP could let an attacker's device negotiate a trunk with an edge port, the security best practice is to hard-code every port: `switchport mode access` on edge ports and `switchport mode trunk` with `switchport nonegotiate` on trunks. Also, 802.1Q is the only trunking protocol on most current switches; Cisco's older ISL is legacy and needed the encapsulation command only on platforms that supported both."
  ],
  "terms": [
   [
    "802.1Q tag",
    "A 4-byte field inserted into Ethernet frames carrying a 12-bit VLAN ID and 3-bit priority."
   ],
   [
    "Native VLAN",
    "The VLAN whose frames cross an 802.1Q trunk untagged; VLAN 1 by default."
   ],
   [
    "Allowed VLAN list",
    "The set of VLANs permitted on a trunk, edited with the add, remove and except keywords."
   ],
   [
    "DTP",
    "Dynamic Trunking Protocol, Cisco's protocol for negotiating trunk formation."
   ],
   [
    "Dynamic auto / dynamic desirable",
    "Passive and active DTP negotiation modes; auto-auto does not form a trunk."
   ]
  ],
  "example": "A technician adds VLAN 40 to a trunk by typing `switchport trunk allowed vlan 40`. Immediately, VLANs 10 to 30 stop working across the link, because the command replaced the list. `show interfaces trunk` shows only VLAN 40 allowed. Re-entering `switchport trunk allowed vlan 10,20,30,40` restores service; the correct original command would have been `switchport trunk allowed vlan add 40`.",
  "tip": "Two switches with default dynamic auto ports connected together will not trunk. If an exam topology shows auto on both ends, the link is an access link.",
  "check": [
   [
    "What happens to frames in the native VLAN on an 802.1Q trunk?",
    "They are sent untagged, and untagged frames received on the trunk are placed in the native VLAN."
   ],
   [
    "Which DTP combination fails to form a trunk: desirable-auto, auto-auto, or trunk-auto?",
    "Auto-auto, because neither side actively initiates trunk negotiation."
   ],
   [
    "How do you add VLAN 50 to an existing trunk without removing the others?",
    "Use switchport trunk allowed vlan add 50."
   ]
  ]
 },
 {
  "t": "Layer 2 discovery protocols: CDP and LLDP",
  "body": [
   "When you arrive at an unfamiliar network, or a diagram is out of date, discovery protocols tell you what is plugged into each port. Cisco Discovery Protocol (CDP) and Link Layer Discovery Protocol (LLDP) both have devices periodically advertise information about themselves to their directly connected neighbours. They run at Layer 2, so they work even before IP is configured, and they are never forwarded past the immediate neighbour.",
   "CDP is Cisco proprietary and enabled by default on Cisco devices. Each device sends CDP advertisements every 60 seconds by default, and neighbours keep the information for a holdtime of 180 seconds. An advertisement includes the device ID (hostname), the local and remote interface, the platform and model, capabilities (router, switch, phone and so on), the software version, the management IP address, and on switches the native VLAN and duplex. Because it carries the native VLAN and duplex, CDP is what logs native VLAN mismatch and duplex mismatch warnings.",
   "LLDP is the IEEE 802.1AB open standard equivalent, so it works between devices from different vendors. It is usually disabled by default on Cisco IOS devices and is enabled globally with `lldp run`. By default it advertises every 30 seconds with a holdtime of 120 seconds. Unlike CDP's single on/off control per interface, LLDP separates transmit and receive: `lldp transmit` and `lldp receive` under an interface. LLDP-MED is an extension used with IP phones to advertise things like voice VLAN and power needs.",
   "The key commands mirror each other. `show cdp neighbors` gives a table of neighbour device ID, local interface, holdtime, capability, platform and remote port ID. `show cdp neighbors detail` (or `show cdp entry *`) adds IP addresses and software version. The LLDP equivalents are `show lldp neighbors` and `show lldp neighbors detail`. Global control is `cdp run` / `no cdp run` and `lldp run` / `no lldp run`; per interface, `no cdp enable` stops CDP on that port. `cdp timer` and `cdp holdtime`, or `lldp timer` and `lldp holdtime`, change the timers.",
   "```text\nSW1# show cdp neighbors\nDevice ID   Local Intrfce  Holdtme  Capability  Platform   Port ID\nR1          Gig 0/1        152      R B S I     ISR4331    Gig 0/0/0\nSW2         Gig 0/24       171      S I         WS-C2960X  Gig 0/24\n```",
   "Discovery protocols also reveal information an attacker would like: model, software version and addresses. The defensive practice is to disable CDP and LLDP on ports facing untrusted networks, such as internet links and guest or public ports, while leaving them on for infrastructure links and phone ports where they are useful. In a show output, remember that 'Local Intrfce' is your port and 'Port ID' is the neighbour's port; mixing them up is the most common reading mistake."
  ],
  "terms": [
   [
    "CDP",
    "Cisco Discovery Protocol, a proprietary Layer 2 protocol that shares device details with directly connected Cisco neighbours; on by default."
   ],
   [
    "LLDP",
    "Link Layer Discovery Protocol (IEEE 802.1AB), the vendor-neutral equivalent of CDP; enabled on IOS with lldp run."
   ],
   [
    "Holdtime",
    "How long a device keeps a neighbour's advertised information without hearing a new advertisement."
   ],
   [
    "LLDP-MED",
    "An LLDP extension for media endpoints such as IP phones, carrying voice VLAN and power information."
   ]
  ],
  "example": "You are asked to document which switch port connects to the branch router. `show cdp neighbors` on the switch shows R1 on local interface Gig 0/1 with Port ID Gig 0/0/0, and `show cdp neighbors detail` gives R1's management address 10.0.0.1. A third-party firewall does not appear, so you enable `lldp run` on the switch and it shows up in `show lldp neighbors`.",
  "tip": "CDP defaults are 60 seconds and 180 seconds holdtime; LLDP defaults are 30 and 120, and LLDP is off by default on Cisco IOS. Expect a question that tests whether you know you must enable LLDP first.",
  "check": [
   [
    "Which discovery protocol would you use to identify a non-Cisco switch connected to a Cisco switch?",
    "LLDP, because it is an IEEE open standard; CDP is Cisco proprietary."
   ],
   [
    "In show cdp neighbors output, which column is the neighbour's interface?",
    "Port ID. Local Intrfce is the port on the device where you ran the command."
   ],
   [
    "Why might you disable CDP on an internet-facing interface?",
    "CDP reveals model, software version and addresses that could help an attacker; there is no benefit sending it to an untrusted network."
   ]
  ]
 },
 {
  "t": "EtherChannel (LACP and static), Layer 2 and Layer 3, and member-port consistency rules",
  "body": [
   "EtherChannel combines several parallel Ethernet links into one logical port-channel interface. It adds bandwidth, provides redundancy if a member fails, and, crucially, looks like a single link to spanning tree so no member is blocked. You configure it by putting physical interfaces into a channel group; IOS creates the matching `interface port-channel` automatically.",
   "There are three ways to form the bundle. LACP (IEEE 802.3ad/802.1AX) uses modes `active` and `passive`. PAgP, Cisco's proprietary protocol, uses `desirable` and `auto`. Static mode `on` forms the bundle without any negotiation. The mode must be compatible on both ends: LACP active-active or active-passive works; PAgP desirable-desirable or desirable-auto works; on only works with on. Mixing protocols, such as LACP on one end and PAgP on the other, or on with active, does not form a working bundle. Negotiated modes are preferred because they detect miscabling and a far end that is not bundled; with `on`, a mismatch can cause loops or lost traffic.",
   "```text\ninterface range g1/0/1 - 2\n channel-group 1 mode active\ninterface port-channel 1\n switchport mode trunk\n switchport trunk allowed vlan 10,20\n```",
   "A Layer 2 EtherChannel acts like a switchport: an access port or a trunk. A Layer 3 EtherChannel acts like a routed port with an IP address, used between multilayer switches or to a router. To build one, you make the physical members routed with `no switchport` before adding them to the channel group, and put the IP address on the port-channel interface, not on the members: `interface port-channel 2`, `no switchport`, `ip address 10.0.12.1 255.255.255.252`.",
   "Member-port consistency is what the exam tests most. All members must match on speed and duplex, switchport mode (all access or all trunk), access VLAN, native VLAN and allowed VLAN list on trunks, and must all be Layer 2 or all Layer 3. If a member does not match, it is suspended and does not carry traffic. Settings applied to the port-channel interface are pushed to the members, which is the easiest way to keep them consistent.",
   "Traffic is load-balanced by a hash, not packet by packet, so a single flow always uses the same member, preserving order. The hash inputs are set globally with `port-channel load-balance`, using combinations such as source and destination MAC or IP. If most traffic comes from one source to one destination, it may land on a single link; choosing a hash with more variety helps. Verify with `show etherchannel summary`, where flags show the state: `SU` means a Layer 2 channel in use, `RU` a Layer 3 channel in use, `P` a bundled member, `s` suspended, `I` stand-alone and `D` down. `show etherchannel load-balance` shows the hash method."
  ],
  "terms": [
   [
    "channel-group",
    "Interface command that assigns a physical port to an EtherChannel and sets its negotiation mode."
   ],
   [
    "Mode on",
    "Static EtherChannel with no negotiation protocol; works only when both ends are set to on."
   ],
   [
    "Layer 3 EtherChannel",
    "A routed port-channel with an IP address, built from members set with no switchport."
   ],
   [
    "Suspended member",
    "A port that failed consistency checks and is excluded from the bundle, shown with an s flag."
   ],
   [
    "Load-balancing hash",
    "The per-flow calculation, based on MAC or IP fields, that picks which member carries each flow."
   ]
  ],
  "example": "Two distribution switches are joined by a four-port LACP bundle. `show etherchannel summary` shows Po1(SU) with three members flagged P and one flagged s. Checking that port reveals its native VLAN is 1 while the others use 999. Configuring `switchport trunk native vlan 999` on the port-channel interface pushes the setting to all members and the fourth link joins the bundle.",
  "tip": "on is not a negotiation protocol, so it does not work with active, passive, desirable or auto. And LACP passive-passive or PAgP auto-auto never forms a bundle.",
  "check": [
   [
    "Where do you configure the IP address for a Layer 3 EtherChannel?",
    "On the port-channel interface, after setting no switchport on the member interfaces and the port channel."
   ],
   [
    "Name four settings that must match for a port to join an EtherChannel.",
    "Any four of: speed, duplex, switchport mode, access VLAN, native VLAN, allowed VLANs, and Layer 2 versus Layer 3."
   ],
   [
    "Why can a single large file transfer use only one member link of a bundle?",
    "Load balancing is per flow using a hash, so all packets of one flow map to the same member link."
   ]
  ]
 },
 {
  "t": "Rapid PVST+: root bridge election, root/designated/alternate ports, port states, PortFast, BPDU guard",
  "body": [
   "Redundant links between switches protect against failures, but at Layer 2 they create loops. Ethernet frames have no time-to-live, so a broadcast in a loop circulates forever, causing a broadcast storm, MAC table instability and duplicate frames. Spanning Tree Protocol (STP) prevents this by blocking just enough ports to leave a loop-free tree. Rapid PVST+ is Cisco's implementation of Rapid Spanning Tree (IEEE 802.1w) that runs a separate instance per VLAN, and it is the default on many current Cisco switches.",
   "Switches exchange BPDUs (bridge protocol data units) to elect a root bridge. Each switch has a bridge ID made of a priority and its MAC address. The priority defaults to 32768 and includes the extended system ID, which is the VLAN number, so a switch in VLAN 10 advertises 32778. The lowest bridge ID wins: lowest priority first, then lowest MAC as a tiebreaker. Because the oldest switch often has the lowest MAC, you should choose the root deliberately with `spanning-tree vlan 10 root primary` or `spanning-tree vlan 10 priority 4096`. Priorities must be multiples of 4096.",
   "Every non-root switch then picks one root port, its best path to the root, based on the lowest root path cost. Default costs are based on link speed; with the common short method, 10 Mbps costs 100, 100 Mbps costs 19, 1 Gbps costs 4 and 10 Gbps costs 2. Ties are broken by the lowest neighbouring bridge ID, then by the lowest neighbouring port ID (port priority, default 128, plus port number). On each link segment, one designated port is chosen: the port with the lowest cost to the root, and all ports on the root bridge are designated. Every remaining port becomes an alternate port (a backup path to the root, discarding) or, rarely, a backup port (a redundant port on a shared segment the same switch already serves).",
   "RSTP simplifies port states to three: discarding (no forwarding, no learning), learning (building the MAC table but not forwarding) and forwarding. RSTP converges fast because, on point-to-point links, switches use a proposal and agreement handshake instead of waiting on timers, and an alternate port can take over immediately when the root port fails.",
   "Edge ports connect to end devices and should never receive BPDUs. PortFast (`spanning-tree portfast` on an interface, or `spanning-tree portfast default` globally for access ports) makes a port go straight to forwarding, so PCs get DHCP addresses without delay. BPDU guard (`spanning-tree bpduguard enable`, or `spanning-tree portfast bpduguard default`) protects those ports: if a BPDU arrives, meaning someone plugged in a switch, the port is err-disabled. It stays down until recovered with `shutdown` then `no shutdown`, or automatically by errdisable recovery.",
   "Verify with `show spanning-tree vlan 10`, which shows the root ID and whether 'This bridge is the root', plus each interface's role (Root, Desg, Altn, Back), state (FWD, BLK/discarding, LRN) and cost."
  ],
  "terms": [
   [
    "Bridge ID",
    "A switch's priority (including the VLAN number) plus its MAC address; the lowest wins the root election."
   ],
   [
    "Root port",
    "On a non-root switch, the single port with the lowest-cost path to the root bridge."
   ],
   [
    "Designated port",
    "The forwarding port on each segment with the best path to the root; all root bridge ports are designated."
   ],
   [
    "Alternate port",
    "A discarding RSTP port that offers a backup path to the root and can take over immediately."
   ],
   [
    "BPDU guard",
    "A feature that err-disables a PortFast port if it receives a BPDU."
   ]
  ],
  "example": "Three switches in a triangle all have priority 32769 in VLAN 1, and the oldest access switch with the lowest MAC became root, pulling traffic through a slow closet. The engineer sets `spanning-tree vlan 1-100 root primary` on the core. `show spanning-tree` now shows the core as root, the access switches' uplinks to the core as root ports and one inter-access link as alternate.",
  "tip": "Lower is better at every step: lowest bridge ID for root, lowest cost for root and designated ports, then lowest sender bridge ID, then lowest sender port ID.",
  "check": [
   [
    "Two switches have priority 32768 in VLAN 20. Which becomes root?",
    "The one with the lower MAC address, because priority ties are broken by MAC address."
   ],
   [
    "What happens when a PortFast port with BPDU guard receives a BPDU?",
    "The port is placed in the err-disabled state and stops forwarding until it is recovered."
   ],
   [
    "What are the three RSTP port states?",
    "Discarding, learning and forwarding."
   ]
  ]
 },
 {
  "t": "Inter-VLAN routing: router-on-a-stick subinterfaces and multilayer switch SVIs",
  "body": [
   "Each VLAN is a separate broadcast domain and IP subnet, so hosts in different VLANs cannot talk directly. Something must route between them, and that router becomes each VLAN's default gateway. The CCNA covers two methods: router-on-a-stick with subinterfaces, and switch virtual interfaces (SVIs) on a multilayer switch. A third, legacy method uses one physical router interface per VLAN, which does not scale.",
   "Router-on-a-stick uses a single physical router interface connected to a switch trunk. On the router, you create one subinterface per VLAN, tell it which 802.1Q tag it handles with `encapsulation dot1Q`, and give it the gateway address for that VLAN. The physical interface itself has no IP address but must be up (`no shutdown`).",
   "```text\ninterface g0/0\n no shutdown\ninterface g0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.1 255.255.255.0\ninterface g0/0.20\n encapsulation dot1Q 20\n ip address 192.168.20.1 255.255.255.0\ninterface g0/0.99\n encapsulation dot1Q 99 native\n ip address 192.168.99.1 255.255.255.0\n```",
   "The switch port facing the router must be a trunk allowing those VLANs. Traffic from VLAN 10 to VLAN 20 goes up the trunk tagged 10, the router routes it, and it comes back down the same trunk tagged 20. Its weakness is that one link carries all inter-VLAN traffic twice, so it can become a bottleneck, and the router is a single point of failure. It suits small branches.",
   "A multilayer (Layer 3) switch routes in hardware using SVIs. An SVI is a virtual interface for a VLAN: `interface vlan 10` with `ip address 192.168.10.1 255.255.255.0`. You must enable routing with `ip routing`, which is off by default on many switches. An SVI is up/up only if the VLAN exists and at least one port in that VLAN (an access port or a trunk allowing it) is up and forwarding, and the SVI is not shut down. Multilayer switches also support routed ports, with `no switchport` and an IP address, typically used for uplinks to routers or other Layer 3 switches.",
   "SVIs are faster and scale better than router-on-a-stick because routing happens inside the switch at wire speed with no trunk bottleneck, which is why campus distribution layers use them. When troubleshooting, check the subinterface VLAN number matches the switch VLAN, the trunk allows the VLAN, the physical router interface is not shut down, `ip routing` is enabled on the switch, and hosts use the correct gateway. `show ip interface brief` should show each SVI or subinterface up/up, and `show ip route` should list each VLAN's subnet as connected (C) with a local (L) route for the gateway address."
  ],
  "terms": [
   [
    "Router-on-a-stick",
    "Inter-VLAN routing over one router interface using 802.1Q subinterfaces on a trunk link."
   ],
   [
    "Subinterface",
    "A logical division of a physical router interface, such as g0/0.10, each with its own VLAN tag and IP address."
   ],
   [
    "encapsulation dot1Q",
    "Subinterface command specifying which 802.1Q VLAN tag the subinterface handles."
   ],
   [
    "SVI",
    "Switch virtual interface: a Layer 3 interface for a VLAN on a switch, used as that VLAN's gateway."
   ],
   [
    "ip routing",
    "Global command that enables IPv4 routing on a multilayer switch."
   ]
  ],
  "example": "A branch office has one router and one access switch with VLANs 10 and 20. The switch's g0/24 is a trunk and the router uses g0/0.10 and g0/0.20 as gateways. When the head office later deploys a Catalyst Layer 3 switch at the core, it creates `interface vlan 10` and `interface vlan 20`, enables `ip routing` and points a routed uplink to the WAN router.",
  "tip": "If an SVI shows down/down, check that the VLAN exists and has at least one active port. If routing between SVIs fails with the SVIs up, check for a missing ip routing command.",
  "check": [
   [
    "What command tells a router subinterface which VLAN's traffic to accept?",
    "encapsulation dot1Q <vlan-id>, optionally with the native keyword for the native VLAN."
   ],
   [
    "Name two conditions required for an SVI to be up/up.",
    "The VLAN must exist in the VLAN database, and at least one port in that VLAN (access or allowing trunk) must be up and forwarding; the SVI must also not be shut down."
   ],
   [
    "Why do larger campuses prefer SVIs to router-on-a-stick?",
    "SVIs route in switch hardware without sending all inter-VLAN traffic over one trunk to an external router, so they are faster and avoid a bottleneck."
   ]
  ]
 },
 {
  "t": "Wireless architectures and AP modes: autonomous, lightweight (CAPWAP), cloud-managed",
  "body": [
   "Once a network has more than a handful of access points (APs), managing each one separately becomes painful: channels, power, SSIDs and security must be consistent, and clients must roam smoothly. Cisco wireless architectures answer the question of where the intelligence and configuration live. The CCNA compares three: autonomous, lightweight with a controller, and cloud-managed.",
   "An autonomous AP is self-contained. It holds its own configuration, handles its own client authentication, and bridges wireless traffic onto the wired network, usually with a trunk to carry several VLANs for several SSIDs. Each AP is configured individually through its CLI or web interface. This is fine for a small office, but in a large deployment it is hard to keep settings consistent and there is no central view of RF conditions.",
   "A lightweight AP works with a wireless LAN controller (WLC) in a split-MAC architecture. The AP handles real-time functions that must happen at the radio: transmitting and receiving frames, beacons, encryption and acknowledgments. The WLC handles management functions: configuration, authentication, roaming, RF management such as channel and power assignment, and security policy. The AP and WLC communicate over CAPWAP (Control and Provisioning of Wireless Access Points), which builds two tunnels: a control tunnel on UDP port 5246, which is encrypted with DTLS, and a data tunnel on UDP port 5247 that carries client traffic. Because client traffic is tunnelled, the AP's switch port is usually an access port in a management VLAN, while the WLC connects to the network with a trunk. A lightweight AP finds its controller through methods such as DHCP option 43, DNS, or a previously known controller address.",
   "Controller deployments vary. A centralized (unified) WLC sits in the data center or campus core; an embedded WLC runs inside a switch; a controller-on-AP model (Cisco's Embedded Wireless Controller, which replaced Mobility Express) lets one AP act as the controller for a small site; and virtual WLCs run in a hypervisor or cloud. Lightweight APs also support modes: local (the default, serving clients and scanning channels), FlexConnect (switches client traffic locally at a branch and keeps working if the WAN link to the controller fails), monitor (scanning only, for intrusion detection and location), sniffer, rogue detector and bridge or mesh modes.",
   "A cloud-managed architecture, such as Cisco Meraki, moves the management plane to a cloud dashboard. The APs keep forwarding client data locally on the site's network, and only management and statistics traffic goes to the cloud. This gives you a single web dashboard for many sites with no on-premises controller, at the cost of relying on internet connectivity and a subscription for management.",
   "For the exam, match the scenario: a single AP at a small site with local configuration is autonomous; many APs managed from an on-premises controller with tunnelled traffic is lightweight with CAPWAP; many sites managed from a web dashboard over the internet is cloud-managed."
  ],
  "terms": [
   [
    "Autonomous AP",
    "A standalone AP configured individually that bridges traffic directly onto the wired network."
   ],
   [
    "Lightweight AP",
    "An AP that relies on a WLC for management and control using a split-MAC design."
   ],
   [
    "WLC",
    "Wireless LAN controller, which centrally manages lightweight APs, clients, RF and security."
   ],
   [
    "CAPWAP",
    "Protocol between lightweight APs and a WLC, with a DTLS-encrypted control tunnel (UDP 5246) and a data tunnel (UDP 5247)."
   ],
   [
    "FlexConnect",
    "An AP mode for branches that switches client traffic locally and keeps serving clients if the controller link fails."
   ]
  ],
  "example": "A retailer with 200 small stores cannot put a controller in each store and does not want all client traffic hauled back to headquarters. It deploys cloud-managed APs: each store's APs forward traffic locally, and IT uses one web dashboard to push the same SSIDs to every store. Its headquarters campus, by contrast, uses a pair of WLCs with lightweight APs in local mode.",
  "tip": "Remember which switch-port type each AP needs: an autonomous AP serving several VLANs uses a trunk; a lightweight AP in local mode uses an access port because traffic is tunnelled to the WLC; the WLC itself connects with a trunk.",
  "check": [
   [
    "Which functions stay on a lightweight AP in the split-MAC architecture?",
    "Real-time functions such as sending and receiving frames, beacons, acknowledgments and encryption at the radio."
   ],
   [
    "Which CAPWAP tunnel is encrypted by default and what port does it use?",
    "The control tunnel, encrypted with DTLS, on UDP port 5246."
   ],
   [
    "Which AP mode lets a branch AP keep serving clients if the WAN to the controller fails?",
    "FlexConnect."
   ]
  ]
 },
 {
  "t": "Troubleshoot VLAN, trunk, EtherChannel and spanning tree problems from show command output",
  "body": [
   "Many CCNA questions show a few lines of switch output and ask what is wrong. The skill is to know which command reveals which problem and what the tell-tale values look like. Work systematically from the physical link up: interface status, VLAN membership, trunk state, EtherChannel bundling and finally spanning tree.",
   "Start with `show interfaces status` or `show ip interface brief` to see if ports are connected. A status of `err-disabled` means a protection feature such as BPDU guard or port security shut the port; `show interfaces status err-disabled` or the log will name the reason. `inactive` in `show vlan brief` or a port showing it is in a VLAN that does not exist means the access VLAN was never created or was deleted, so the port cannot forward.",
   "For VLAN problems, `show vlan brief` confirms the VLAN exists and which access ports belong to it. `show interfaces g0/5 switchport` shows administrative and operational mode and the access VLAN. Classic faults are a port in the wrong VLAN, a VLAN missing on one switch in the path, or a host using the wrong subnet for its VLAN. Remember trunk ports do not appear in `show vlan brief`.",
   "For trunks, `show interfaces trunk` is the key command. Look at four sections: the mode and status (is it 'trunking'?), the native VLAN on each end, the allowed VLAN list, and the 'VLANs in spanning tree forwarding state and not pruned' list. If a port is not listed at all, it is not trunking; check DTP modes, because dynamic auto on both ends leaves the link as access. A native VLAN mismatch generates CDP log messages naming both native VLANs. If a VLAN is allowed but missing from the forwarding list, it may not exist on the switch or spanning tree may be blocking it.",
   "For EtherChannel, `show etherchannel summary` shows the port-channel with flags such as `SU` (Layer 2, in use) or `SD` (down), and member flags `P` (bundled), `s` (suspended), `I` (stand-alone) and `D` (down). Suspended or stand-alone members usually mean mismatched settings (speed, duplex, VLANs, trunk mode) or incompatible modes such as LACP on one side and PAgP or `on` on the other. `show etherchannel port-channel` and `show interfaces port-channel 1` give more detail.",
   "For spanning tree, `show spanning-tree vlan 10` shows the root bridge ID and whether this switch is root, then each port's role, state and cost. Unexpected results usually have one of these causes: the wrong switch is root because priorities were left at default; a link that should forward is alternate because of cost; or a port is blocked as `BKN` (broken) due to an inconsistency such as a PVID mismatch. An access port that takes about 30 seconds to come up lacks PortFast, which delays DHCP. Loops with high CPU and flapping MAC addresses (log messages about a MAC moving between ports) suggest spanning tree was disabled or a hub-connected device created a loop."
  ],
  "terms": [
   [
    "show interfaces trunk",
    "Displays trunking ports, their mode, native VLAN, allowed VLANs and forwarding VLANs."
   ],
   [
    "show etherchannel summary",
    "Displays each port-channel and its members with status flags such as P, s, I and D."
   ],
   [
    "err-disabled",
    "A port state where the switch has shut a port because a protection feature detected a violation."
   ],
   [
    "MAC flapping",
    "A MAC address repeatedly learned on different ports, often a symptom of a Layer 2 loop."
   ]
  ],
  "example": "Hosts in VLAN 30 on SW2 cannot reach their gateway on SW1. `show interfaces trunk` on SW1 shows Gi0/1 trunking with allowed VLANs 10,20,30, but on SW2 the 'VLANs allowed and active' list shows only 10,20. `show vlan brief` on SW2 confirms VLAN 30 was never created there. Creating VLAN 30 on SW2 restores connectivity.",
  "tip": "Map each symptom to one command: VLAN membership to show vlan brief, trunk issues to show interfaces trunk, bundles to show etherchannel summary, root and port roles to show spanning-tree. Questions reward picking the right one.",
  "check": [
   [
    "An EtherChannel member shows the flag s in show etherchannel summary. What does it mean and what do you check?",
    "The member is suspended; compare its speed, duplex, mode, VLAN and trunk settings with the other members and the far end."
   ],
   [
    "show interfaces trunk does not list a link you expected to trunk. What is a likely cause?",
    "The link did not negotiate a trunk, for example both ends are dynamic auto or one end is set to access."
   ],
   [
    "A PC takes about 30 seconds after link-up before it can get a DHCP address. What is missing?",
    "PortFast on the access port, so spanning tree makes it wait through the forward-delay timers (discarding, then learning) before it forwards."
   ]
  ]
 },
 {
  "t": "Routing table components: protocol code, prefix and mask, next hop, administrative distance, metric, gateway of last resort",
  "body": [
   "A router forwards packets by looking up the destination in its routing table. Reading that table fluently is one of the most-tested CCNA skills, because nearly every routing question starts with `show ip route` output. Each line tells you where a route came from, what destination it covers, how trustworthy and how good it is, and where to send packets.",
   "Consider this entry: `O 10.1.3.0/24 [110/3] via 10.0.12.2, 00:05:12, GigabitEthernet0/1`. The first field is the protocol code, here O for OSPF. Other codes are C for connected, L for local, S for static, D for EIGRP, R for RIP, B for BGP, and an asterisk marks a candidate default route. Modifiers like `O IA` (OSPF inter-area) or `O E2` (OSPF external type 2) also appear.",
   "Next is the destination prefix and mask, here 10.1.3.0/24. The router compares packet destinations against these. Every configured, up interface produces two entries: a C route for the connected subnet and an L route for the interface's own address as a /32 host route (or /128 in IPv6).",
   "The bracketed pair is [administrative distance/metric]. Administrative distance (AD) measures how trustworthy the source of the route is and is used to choose between routes to the same prefix learned from different sources. Lower is preferred. Common Cisco defaults: connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120, external EIGRP 170 and iBGP 200. An AD of 255 means the route is not trusted and is never installed. The metric is the routing protocol's own measure of path quality, used to choose between routes from the same protocol: OSPF uses cost, RIP uses hop count, EIGRP uses a composite based on bandwidth and delay. Metrics from different protocols cannot be compared, which is exactly why AD exists.",
   "After 'via' comes the next hop, the neighbouring router's address to forward to. Then the age of the route and the outgoing interface. Connected routes show 'is directly connected' and an interface instead of a next hop. Static routes may show only a next hop, only an interface or both.",
   "At the top, 'Gateway of last resort' shows the default route, used when nothing more specific matches. If it says 'Gateway of last resort is not set', packets with no matching route are dropped and the router sends an ICMP unreachable. A default route appears as `S* 0.0.0.0/0 [1/0] via 203.0.113.1` or as an OSPF-learned `O*E2 0.0.0.0/0`. The IPv6 equivalent is `show ipv6 route`, where default is ::/0 and next hops are often link-local addresses."
  ],
  "terms": [
   [
    "Administrative distance (AD)",
    "A value rating the trustworthiness of a route source; lower wins when the same prefix is learned from different sources."
   ],
   [
    "Metric",
    "A routing protocol's measure of path quality, used to compare routes from that same protocol."
   ],
   [
    "Next hop",
    "The address of the neighbouring router to which a packet is forwarded for a given route."
   ],
   [
    "Local route (L)",
    "A /32 host route for the router's own interface address."
   ],
   [
    "Gateway of last resort",
    "The default route used when no more specific route matches a destination."
   ]
  ],
  "example": "`show ip route` on R1 lists `S* 0.0.0.0/0 [1/0] via 203.0.113.1`, `C 10.0.12.0/30 is directly connected, G0/1`, `L 10.0.12.1/32 is directly connected, G0/1` and `O 10.1.3.0/24 [110/3] via 10.0.12.2`. You can read that R1 reaches 10.1.3.0/24 via OSPF with cost 3 through R2, and sends internet traffic to the ISP via a static default route.",
  "tip": "In [110/3], the first number is AD and the second is the metric. Questions often swap them in the answer choices.",
  "check": [
   [
    "A router learns 172.16.5.0/24 from OSPF and from EIGRP. Which does it install and why?",
    "The EIGRP route, because EIGRP's administrative distance (90) is lower than OSPF's (110)."
   ],
   [
    "What does 'Gateway of last resort is not set' imply?",
    "There is no default route, so packets to destinations not in the table are dropped."
   ],
   [
    "Why does every configured interface create both a C and an L route?",
    "C is the directly connected subnet; L is a /32 host route for the interface's own IP so the router recognizes packets addressed to itself."
   ]
  ]
 },
 {
  "t": "Forwarding decisions: longest prefix match first, then administrative distance, then metric",
  "body": [
   "Two different questions get mixed up in routing: which routes get into the routing table, and which of the routes in the table a particular packet uses. Administrative distance and metric answer the first question. Longest prefix match answers the second. Keeping these separate is the key to getting forwarding questions right.",
   "When a packet arrives, the router compares its destination address against every route in the table and finds all routes that contain it. Among those matches, it chooses the one with the longest prefix, meaning the most specific mask. Suppose the table has 10.0.0.0/8, 10.1.0.0/16, 10.1.1.0/24 and 0.0.0.0/0, and a packet is going to 10.1.1.77. All four routes match, but /24 is the longest, so the router uses 10.1.1.0/24. A packet to 10.1.9.9 matches the /16, /8 and default, so the /16 is used. A packet to 172.20.1.1 matches only the default route.",
   "This happens regardless of AD or metric. A static route with AD 1 for 10.0.0.0/8 will not be used for 10.1.1.77 if OSPF, with AD 110, has installed 10.1.1.0/24. The prefixes differ, so they are different routes, and both are in the table; longest match simply prefers the more specific one.",
   "Administrative distance matters only when the router learns the exact same prefix and mask from different sources. For example, OSPF and a static route both offer 192.168.50.0/24. The router installs only the one with the lower AD, the static route with AD 1, and the OSPF route stays in the OSPF database as a backup. If the static route's next hop disappears, the OSPF route can be installed.",
   "Metric matters only when the same routing protocol finds several paths to the same prefix. OSPF computes the cost of each path and installs the lowest. If two paths have exactly equal cost, OSPF installs both and load-balances across them (equal-cost multipath), up to a configurable maximum.",
   "So the full order is: a route must first win AD and metric contests to be in the table at all; then for each packet, longest prefix match decides which of the installed routes is used. Exam questions often give a table and a destination and include a tempting route with a lower AD or metric but a shorter prefix. Always find all matching entries first, then take the longest.",
   "To check what the router will do for a destination, use `show ip route 10.1.1.77`. It displays the specific entry that longest match selects, including its source, AD, metric and next hop. `show ip cef 10.1.1.77` shows the Cisco Express Forwarding entry actually used in the data plane."
  ],
  "terms": [
   [
    "Longest prefix match",
    "Choosing, among all routes that contain the destination, the one with the most specific (longest) mask."
   ],
   [
    "Administrative distance",
    "Used only to choose between routes to the identical prefix from different sources; lower wins."
   ],
   [
    "Metric",
    "Used only to choose between paths to the identical prefix from the same routing protocol; lower wins."
   ],
   [
    "Equal-cost multipath (ECMP)",
    "Installing several equal-metric routes to one prefix and load-sharing traffic across them."
   ]
  ],
  "example": "A router has `S 10.0.0.0/8 [1/0] via 192.0.2.1` and `O 10.20.0.0/16 [110/20] via 192.0.2.5`. A packet to 10.20.3.4 goes to 192.0.2.5 because /16 is longer than /8, even though the static route has lower AD. A packet to 10.30.1.1 matches only the /8 and goes to 192.0.2.1.",
  "tip": "First filter by 'does this route contain the destination', then pick the longest mask. Only after that do AD and metric matter, and only for identical prefixes.",
  "check": [
   [
    "Routes exist for 172.16.0.0/16, 172.16.8.0/21 and 172.16.10.0/24. Which is used for 172.16.10.5 and for 172.16.12.1?",
    "172.16.10.5 uses 172.16.10.0/24. 172.16.12.1 falls in 172.16.8.0/21 (172.16.8.0 to 172.16.15.255) so it uses the /21."
   ],
   [
    "A static route and an OSPF route both exist for 10.5.5.0/24. Which is installed?",
    "The static route, with default AD 1, beats OSPF's AD of 110 for the identical prefix."
   ],
   [
    "When does the metric decide between routes?",
    "Only when the same routing protocol has multiple paths to the identical prefix."
   ]
  ]
 },
 {
  "t": "IPv4 and IPv6 static routing: default, network, host and floating static routes",
  "body": [
   "A static route is a route you configure by hand. Static routes are predictable, use no bandwidth or CPU for route updates and reveal nothing to neighbours, so they suit small networks, stub sites with a single exit and backup paths. Their weakness is that they do not adapt: if the topology changes, you must change them yourself.",
   "The IPv4 syntax is `ip route <prefix> <mask> <next-hop | exit-interface> [AD]`. With a next-hop address, the router performs a recursive lookup to find the interface that reaches that next hop. With only an exit interface, the route appears as directly connected; this works well on point-to-point links but on Ethernet it makes the router ARP for every destination, so it is better to use a next hop or both: `ip route 10.2.0.0 255.255.0.0 g0/1 10.0.12.2`, a fully specified static route.",
   "There are four types to know. A network route points to a subnet, such as `ip route 192.168.20.0 255.255.255.0 10.0.12.2`. A host route points to one address with a /32 mask: `ip route 192.168.20.50 255.255.255.255 10.0.13.2`, useful for sending traffic to one server over a particular path. A default route matches everything with 0.0.0.0 0.0.0.0 and becomes the gateway of last resort: `ip route 0.0.0.0 0.0.0.0 203.0.113.1`. A branch with a single WAN link often needs only a default route.",
   "A floating static route is a backup. You configure it with an administrative distance higher than the primary route's, so it stays out of the routing table while the primary exists. For example, if OSPF (AD 110) provides the primary path to the head office, `ip route 10.0.0.0 255.0.0.0 172.31.1.1 120` is ignored until the OSPF route disappears, and then it is installed. To back up a primary static route (AD 1), give the floating route any AD greater than 1. The floating route must have a higher AD than the primary, otherwise it would replace it.",
   "IPv6 static routes work the same way with `ipv6 route`. First enable `ipv6 unicast-routing`. Examples: a network route `ipv6 route 2001:db8:acad:2::/64 2001:db8:0:12::2`, a host route with /128, and a default route `ipv6 route ::/0 2001:db8:0:12::2`. If you use a link-local address as the next hop, you must also specify the exit interface, because the same fe80 address can exist on every link: `ipv6 route ::/0 g0/0 fe80::2`.",
   "Verify with `show ip route static` and `show ipv6 route static`, and test the path with ping and traceroute. A static route whose next hop is unreachable, or whose exit interface is down, is removed from the table. Remember that routing must work in both directions: the remote router also needs a route back to your networks."
  ],
  "terms": [
   [
    "Default route",
    "A route to 0.0.0.0/0 (or ::/0) that matches any destination not otherwise matched."
   ],
   [
    "Host route",
    "A route to a single address, with a /32 mask in IPv4 or /128 in IPv6."
   ],
   [
    "Floating static route",
    "A backup static route configured with a higher AD than the primary, installed only when the primary is gone."
   ],
   [
    "Fully specified static route",
    "A static route that includes both the exit interface and the next-hop address."
   ],
   [
    "Recursive lookup",
    "Looking up a static route's next hop in the routing table to find the exit interface."
   ]
  ],
  "example": "A branch router uses OSPF over an MPLS circuit and has a broadband VPN as backup. The engineer adds `ip route 0.0.0.0 0.0.0.0 198.51.100.1 250`. While OSPF provides a default route (AD 110), the static stays hidden. When the MPLS link fails and OSPF withdraws its route, `show ip route` shows `S* 0.0.0.0/0 [250/0] via 198.51.100.1` and traffic continues over broadband.",
  "tip": "A floating static must have a higher AD than the route it backs up. If an exam option uses a lower value, it would replace the primary route instead of backing it up.",
  "check": [
   [
    "Write an IPv4 default route to next hop 203.0.113.1.",
    "ip route 0.0.0.0 0.0.0.0 203.0.113.1"
   ],
   [
    "Why must an IPv6 static route using a link-local next hop include an exit interface?",
    "Link-local addresses are only unique per link, so the router needs the interface to know which link the next hop is on."
   ],
   [
    "OSPF is the primary path to 10.0.0.0/8. What AD would make a static route a working backup?",
    "Any AD above 110, such as 120 or 200, so the static route stays out of the table until OSPF's route disappears."
   ]
  ]
 },
 {
  "t": "Single-area OSPFv2: neighbors and adjacencies, point-to-point vs broadcast networks, DR/BDR election",
  "body": [
   "OSPF (Open Shortest Path First) is an open-standard link-state routing protocol. OSPFv2 carries IPv4 routes. Instead of passing whole routing tables between neighbours, each OSPF router describes its own links in link-state advertisements (LSAs), floods them so every router in the area has an identical link-state database (LSDB), and runs the shortest path first (SPF) algorithm to compute the best routes. In a single-area design, all routers are in area 0, the backbone.",
   "OSPF routers discover each other by sending hello packets to the multicast address 224.0.0.5 out every OSPF-enabled interface. On broadcast and point-to-point networks the default hello interval is 10 seconds and the dead interval, how long to wait before declaring a neighbour down, is 40 seconds. A neighbour relationship progresses through states: Down, Init (I have heard your hello), 2-Way (we see each other in our hellos), ExStart and Exchange (we agree on master/slave and swap database summaries), Loading (I request LSAs I lack) and Full (our databases are synchronized). A router that is Full with a neighbour has an adjacency with it.",
   "The network type changes what happens. On a point-to-point link, such as a serial link or an Ethernet link configured with `ip ospf network point-to-point`, there are only two routers, so they simply become fully adjacent. On a broadcast multi-access network such as Ethernet, which is the default type for Ethernet interfaces, many routers can share the segment. If every router became fully adjacent with every other, flooding would scale poorly. So OSPF elects a designated router (DR) and a backup designated router (BDR).",
   "On a broadcast segment, every router forms a full adjacency only with the DR and BDR. Routers that are neither, called DROTHERs, stay in the 2-Way state with each other, which is normal and not a fault. DROTHERs send updates to the DR and BDR at 224.0.0.6, and the DR refloods them to everyone at 224.0.0.5. The BDR takes over if the DR fails.",
   "The DR election uses the interface OSPF priority first: highest priority wins, default 1, range 0 to 255, and priority 0 means the router can never be DR or BDR. If priorities tie, the highest router ID wins. The second-best becomes BDR. The election is not preemptive: once a DR is elected, a new router with a higher priority does not take over until the DR fails or the OSPF process is reset. That is why the first routers to boot often end up as DR. Set priority with `ip ospf priority 100` on the interface.",
   "Check with `show ip ospf neighbor`, which lists each neighbour's router ID, priority, state such as FULL/DR, FULL/BDR, FULL/- (point-to-point) or 2WAY/DROTHER, dead time, address and interface. `show ip ospf interface g0/0` shows the network type, DR, BDR, timers and cost."
  ],
  "terms": [
   [
    "Link-state advertisement (LSA)",
    "An OSPF data unit describing a router's links, flooded to build the link-state database."
   ],
   [
    "Adjacency",
    "A neighbour relationship that has reached the Full state with synchronized databases."
   ],
   [
    "DR / BDR",
    "The designated router and backup designated router elected on a multi-access segment to reduce flooding."
   ],
   [
    "DROTHER",
    "A router on a broadcast segment that is neither DR nor BDR; it stays 2-Way with other DROTHERs."
   ],
   [
    "OSPF priority",
    "Interface value (default 1) used first in DR/BDR election; 0 means never eligible."
   ]
  ],
  "example": "Four routers share an Ethernet VLAN. On R4, `show ip ospf neighbor` shows R1 as FULL/DR, R2 as FULL/BDR and R3 as 2WAY/DROTHER. A junior engineer thinks R3 is broken, but this is normal: DROTHERs only fully peer with the DR and BDR. Between R1 and R5 over a point-to-point link, the state is FULL/- with no election.",
  "tip": "2WAY/DROTHER between two non-DR routers is expected. A neighbour stuck in INIT, EXSTART or EXCHANGE is the real sign of a problem.",
  "check": [
   [
    "What is the default OSPF network type on Ethernet and what does it cause?",
    "Broadcast, which triggers a DR and BDR election on the segment."
   ],
   [
    "R1 has priority 1 and router ID 5.5.5.5; R2 has priority 10 and router ID 1.1.1.1. Which becomes DR if both start together?",
    "R2, because priority is compared before router ID and 10 is higher than 1."
   ],
   [
    "A new router with priority 200 joins a segment that already has a DR. Does it take over?",
    "No. The DR election is non-preemptive; it only becomes DR after the current DR and BDR fail or OSPF is reset."
   ]
  ]
 },
 {
  "t": "OSPF router ID selection and configuration (network statements vs interface commands, passive interfaces)",
  "body": [
   "Every OSPF router needs a router ID (RID), a 32-bit value written like an IPv4 address that identifies it in the LSDB, in neighbour tables and in DR elections. It does not have to be a reachable address, but it must be unique within the OSPF domain.",
   "IOS picks the router ID in this order. First, a manually configured `router-id` under the OSPF process. If there is none, the highest IPv4 address on any up loopback interface. If there are no loopbacks, the highest IPv4 address on any up physical interface. Loopbacks are preferred because they never go down unless deliberately shut, which keeps the RID stable. Best practice is to set it explicitly: `router ospf 1` then `router-id 1.1.1.1`.",
   "The RID is chosen when the OSPF process starts and does not change on its own. If you change the configured router ID, IOS tells you it will take effect after a reload or a `clear ip ospf process`. Duplicate router IDs cause adjacency failures and log messages, so a copied configuration that repeats a RID is a common lab mistake.",
   "There are two ways to enable OSPF on interfaces. The traditional way uses network statements under the process: `network 10.1.1.0 0.0.0.255 area 0`. The address and wildcard mask are a pattern: any interface whose IP address matches the pattern runs OSPF in that area, and its connected subnet is advertised. The wildcard is an inverse mask, where 0 bits must match and 1 bits are ignored. You can be broad (`network 10.0.0.0 0.255.255.255 area 0`) or precise, matching one interface exactly with `network 10.1.1.1 0.0.0.0 area 0`. The network statement does not decide which prefix is advertised; the interface's own address and mask do.",
   "The newer way is to enable OSPF directly on the interface: `interface g0/1` then `ip ospf 1 area 0`. This is explicit and easy to read, and it overrides any network statement for that interface. Both methods produce the same result, and the exam expects you to read either.",
   "```text\nrouter ospf 1\n router-id 1.1.1.1\n network 192.168.10.0 0.0.0.255 area 0\n passive-interface g0/2\n!\ninterface g0/1\n ip ospf 1 area 0\n```",
   "A passive interface is one where OSPF advertises the connected subnet but sends no hellos, so no neighbours form. Use it on LAN interfaces facing users, where there are no routers: it stops unnecessary hellos and prevents a rogue device from forming an adjacency and injecting routes. Configure `passive-interface g0/2`, or make all interfaces passive with `passive-interface default` and then re-enable the ones that need neighbours with `no passive-interface g0/0`. Loopback interfaces advertise as /32 host routes by default; `ip ospf network point-to-point` on the loopback advertises its configured mask instead.",
   "Verify with `show ip protocols`, which shows the RID, network statements, passive interfaces and routing information sources, and `show ip ospf interface brief`, which lists the interfaces running OSPF, their area, cost and state."
  ],
  "terms": [
   [
    "Router ID",
    "A unique 32-bit OSPF identifier chosen from router-id, the highest loopback IP, or the highest active interface IP, in that order."
   ],
   [
    "Network statement",
    "An OSPF process command using an address and wildcard to select which interfaces run OSPF in an area."
   ],
   [
    "ip ospf area",
    "Interface command (ip ospf <process> area <area>) that enables OSPF directly on an interface."
   ],
   [
    "Passive interface",
    "An interface whose subnet OSPF advertises but on which it sends no hellos and forms no neighbours."
   ],
   [
    "Wildcard mask",
    "An inverse mask where 0 bits must match and 1 bits are ignored."
   ]
  ],
  "example": "R2 has loopback 0 at 2.2.2.2 and interfaces 10.0.12.2 and 192.168.20.1. With no router-id command, its RID is 2.2.2.2 from the loopback. The engineer adds `router-id 22.22.22.22`, sees the message that it takes effect after a reload or clear, runs `clear ip ospf process`, and makes the user LAN passive so PCs never receive hellos.",
  "tip": "Order of RID selection: manual router-id, then highest loopback, then highest physical interface. 'Highest' refers to the numeric address, not the interface number.",
  "check": [
   [
    "A router has no router-id command, loopbacks 10.1.1.1 and 10.9.9.9, and G0/0 at 192.168.1.1. What is its RID?",
    "10.9.9.9, the highest loopback address; loopbacks are preferred over physical interfaces even when a physical address is higher."
   ],
   [
    "Which interfaces does network 172.16.0.0 0.0.255.255 area 0 enable OSPF on?",
    "Any interface with an address from 172.16.0.0 to 172.16.255.255."
   ],
   [
    "What does passive-interface do to the connected subnet of that interface?",
    "The subnet is still advertised into OSPF, but no hellos are sent and no neighbours form on that interface."
   ]
  ]
 },
 {
  "t": "OSPF cost and reference bandwidth",
  "body": [
   "OSPF chooses paths using cost. Each OSPF interface has a cost, and the cost of a route is the sum of the outgoing interface costs along the path from this router to the destination. The route with the lowest total cost wins, and equal-cost routes are load-balanced. Because cost is a simple additive number, you can predict and tune OSPF's path choices precisely.",
   "By default, IOS calculates interface cost as reference bandwidth divided by interface bandwidth, with the result rounded down and never less than 1. The default reference bandwidth is 100 Mbps. So a 10 Mbps interface costs 10, a 100 Mbps FastEthernet interface costs 1, and a 1 Gbps or 10 Gbps interface also costs 1, because the result cannot go below 1. With the default reference, OSPF cannot tell FastEthernet from 10 Gigabit Ethernet, which leads to poor path choices in modern networks.",
   "The fix is to raise the reference bandwidth with `auto-cost reference-bandwidth` under the OSPF process. The value is in Mbps. With `auto-cost reference-bandwidth 100000` (100 Gbps), a 100 Gbps link costs 1, 10 Gbps costs 10, 1 Gbps costs 100 and 100 Mbps costs 1000. Set the same reference on every router in the domain; otherwise routers compute costs on different scales and paths become inconsistent. IOS prints a reminder to do exactly that when you enter the command.",
   "You can override the calculation per interface in two ways. `ip ospf cost 50` sets the cost directly and takes precedence over any bandwidth calculation. Alternatively, `bandwidth 50000` sets the interface's bandwidth value in kilobits per second, which changes the calculated cost. The `bandwidth` command does not change the real link speed; it only changes the number that protocols like OSPF use. Direct cost is usually clearer.",
   "Remember that cost is applied on the outgoing interface only. When calculating a path from R1 to a LAN behind R3, you add R1's exit interface cost toward R2, R2's exit interface cost toward R3, and R3's interface cost on the destination LAN. A path can therefore have a different total cost in each direction if interface costs differ.",
   "To verify, `show ip ospf interface brief` lists each interface's cost, and `show ip ospf interface g0/0` shows the cost with other details. In `show ip route`, the metric in brackets after the AD, such as [110/21], is the total cost to that prefix."
  ],
  "terms": [
   [
    "OSPF cost",
    "The interface metric; a route's cost is the sum of outgoing interface costs along the path."
   ],
   [
    "Reference bandwidth",
    "The value divided by interface bandwidth to compute cost; 100 Mbps by default."
   ],
   [
    "auto-cost reference-bandwidth",
    "OSPF process command, in Mbps, that changes the reference bandwidth."
   ],
   [
    "ip ospf cost",
    "Interface command that sets OSPF cost directly, overriding the bandwidth-based calculation."
   ],
   [
    "bandwidth command",
    "Interface setting in kbps used by routing protocols for metric calculation; it does not change the actual speed."
   ]
  ],
  "example": "R1 reaches a data-center LAN by two paths: one over a 1 Gbps link and one over a 10 Gbps link. With the default reference, both links cost 1, so OSPF load-balances and half the traffic uses the slower path. After `auto-cost reference-bandwidth 100000` on every router, the 1 Gbps link costs 100 and the 10 Gbps link costs 10, and all traffic prefers the faster path.",
  "tip": "Default reference bandwidth is 100 Mbps, so anything 100 Mbps or faster costs 1. The auto-cost value is in Mbps, while the interface bandwidth command is in kbps.",
  "check": [
   [
    "With the default reference bandwidth, what is the OSPF cost of a 1 Gbps interface?",
    "1, because 100 Mbps divided by 1000 Mbps is less than 1 and cost cannot be below 1."
   ],
   [
    "With auto-cost reference-bandwidth 10000, what does a 100 Mbps interface cost?",
    "100 (10000 divided by 100)."
   ],
   [
    "R1's path to a LAN leaves through an interface of cost 10, then R2 exits through cost 5, and the LAN interface on R3 costs 1. What is the total?",
    "16, the sum of the outgoing interface costs along the path."
   ]
  ]
 },
 {
  "t": "OSPF adjacency requirements: area, subnet, hello/dead timers, MTU, authentication, unique router ID",
  "body": [
   "Two OSPF routers on the same link will not always become neighbours. OSPF checks several parameters in hello packets, and some after that, and if they disagree the relationship stalls. Knowing each requirement, and the state where each mismatch leaves the neighbour, lets you diagnose adjacency problems quickly.",
   "The following must match in the hello packets, or the routers ignore each other and never get past Down or Init. The area ID: both interfaces must be in the same area, such as area 0. The subnet and mask: on broadcast and point-to-point Ethernet links, both interfaces must be in the same subnet with the same mask. The hello and dead intervals: if one router uses 10 and 40 seconds and the other 5 and 20, they will not become neighbours. Authentication: if one side uses OSPF authentication and the other does not, or the keys differ, hellos are rejected. The stub area flag must also match, though stub areas are beyond single-area CCNA scope.",
   "Router IDs must be unique. If two routers have the same RID, they will not form an adjacency, and IOS logs a duplicate router-id message. This often happens when a configuration is copied between routers including the `router-id` line.",
   "MTU (maximum transmission unit) is checked later, during database exchange. If the interface MTUs differ, the routers see each other and reach ExStart or Exchange, but the database description packets are rejected and they get stuck there. The fix is to make the MTU values match; the command `ip ospf mtu-ignore` exists but hides the real issue.",
   "Other conditions also prevent adjacency. A passive interface sends no hellos, so no neighbour forms on it. An interface that is not enabled for OSPF by a network statement or `ip ospf` command also sends nothing. An ACL that blocks OSPF (IP protocol 89) or the 224.0.0.5 and 224.0.0.6 multicasts breaks hellos. On broadcast segments, if both routers have priority 0, neither can become DR, so no full adjacency forms. A network type mismatch (one side broadcast, the other point-to-point) may still reach Full but routes will not install properly, because the two sides describe the link differently.",
   "```text\nR1# show ip ospf interface g0/0\n  Internet Address 10.0.12.1/24, Area 0\n  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n```",
   "Troubleshoot by comparing `show ip ospf interface` on both ends: area, address and mask, network type and timers are all there. `show ip ospf neighbor` shows the state reached. `debug ip ospf adj` and `debug ip ospf hello` (used carefully) reveal messages such as mismatched hello parameters or authentication errors."
  ],
  "terms": [
   [
    "Hello/dead interval",
    "How often hellos are sent and how long to wait before declaring a neighbour down; 10 and 40 seconds by default on broadcast and point-to-point links."
   ],
   [
    "MTU mismatch",
    "Different maximum transmission units on two ends, leaving OSPF neighbours stuck in ExStart or Exchange."
   ],
   [
    "OSPF authentication",
    "Verification of OSPF packets with a shared key; both sides must use the same type and key."
   ],
   [
    "Duplicate router ID",
    "Two routers using the same RID, which prevents adjacency and causes log errors."
   ]
  ],
  "example": "R1 and R2 connect over an Ethernet link, but `show ip ospf neighbor` on R1 is empty. `show ip ospf interface g0/0` on each router reveals R1 has 10.0.12.1/24 while R2 has 10.0.12.2/25. Both are in the same range, but the masks differ, so hellos are rejected. Correcting R2's mask to /24 brings the neighbour to FULL within seconds.",
  "tip": "Neighbours stuck in EXSTART or EXCHANGE point to an MTU mismatch. No neighbour at all points to hello-level mismatches: area, subnet/mask, timers, authentication, or a passive interface.",
  "check": [
   [
    "Which OSPF parameters must match in hello packets for two routers to become neighbours?",
    "Area ID, subnet and mask, hello and dead intervals, authentication, and the stub flag; router IDs must also be unique."
   ],
   [
    "Two neighbours are stuck in EXSTART. What is the most likely cause?",
    "An MTU mismatch between the two interfaces."
   ],
   [
    "Does the OSPF process ID need to match between neighbours?",
    "No. The process ID is locally significant; only parameters such as area, subnet, timers and authentication must match."
   ]
  ]
 },
 {
  "t": "First hop redundancy: HSRP and VRRP virtual IP, priority, preemption",
  "body": [
   "Hosts are normally configured with a single default gateway. If that router fails, hosts lose all off-subnet connectivity even when a second router is sitting on the same subnet, because they have no way to switch gateways on their own. First hop redundancy protocols (FHRPs) solve this by letting two or more routers share a virtual IP address and virtual MAC address that hosts use as their gateway. One router actively forwards; another takes over if it fails, and hosts notice nothing.",
   "HSRP (Hot Standby Router Protocol) is Cisco proprietary. Routers in an HSRP group elect one active router, which answers ARP for the virtual IP with the virtual MAC and forwards traffic, and one standby router, which monitors the active router's hellos and takes over if they stop. Other routers in the group listen. The virtual MAC is derived from the group number: 0000.0c07.acXX for HSRPv1 and 0000.0c9f.fXXX for HSRPv2. HSRPv2 supports more group numbers, IPv6 and millisecond timers.",
   "Election uses priority, default 100, highest wins; if priorities tie, the highest interface IP address wins. Preemption is disabled by default in HSRP. That means if a higher-priority router boots after another has become active, it does not take over until the active router fails. To make your intended router always active when it is healthy, configure both a higher priority and `preempt`. Object tracking can lower priority automatically when an uplink fails so that the other router takes over.",
   "```text\ninterface g0/1\n ip address 192.168.10.2 255.255.255.0\n standby version 2\n standby 10 ip 192.168.10.1\n standby 10 priority 110\n standby 10 preempt\n```",
   "VRRP (Virtual Router Redundancy Protocol) is the open standard equivalent. Its roles are master and backup rather than active and standby. Priority also defaults to 100 with highest winning, but preemption is enabled by default. VRRP allows the virtual IP to be the real address of one router's interface; that router is the address owner and gets priority 255. The VRRP virtual MAC is 0000.5e00.01XX, where XX is the group number. GLBP (Gateway Load Balancing Protocol) is another Cisco FHRP that load-balances by giving different hosts different virtual MACs, but HSRP and VRRP are the CCNA focus.",
   "Hosts must use the virtual IP as their default gateway, not either router's real address, or they lose the benefit. Verify with `show standby brief` for HSRP, which lists the group, priority, preempt flag (P), state (Active, Standby, Listen), active and standby routers and virtual IP, and `show vrrp brief` for VRRP. Groups, virtual IPs and versions must match on all routers in a group. If two routers both claim to be active, check that they can hear each other's hellos, which usually means a VLAN or trunk problem between them."
  ],
  "terms": [
   [
    "FHRP",
    "First hop redundancy protocol: a protocol that gives hosts a resilient virtual default gateway."
   ],
   [
    "Virtual IP / virtual MAC",
    "The shared gateway address and MAC that the active or master router answers for."
   ],
   [
    "HSRP active / standby",
    "The router forwarding for the virtual IP, and the router ready to take over if it fails."
   ],
   [
    "VRRP master / backup",
    "VRRP's equivalents of active and standby."
   ],
   [
    "Preemption",
    "Allowing a higher-priority router to take the active or master role back; off by default in HSRP, on by default in VRRP."
   ]
  ],
  "example": "Two distribution switches serve VLAN 10 with HSRP virtual IP 192.168.10.1. DSW1 has priority 110 with preempt; DSW2 has default 100. When DSW1 reloads for an upgrade, DSW2 becomes active within seconds and PCs keep working. When DSW1 comes back, preemption lets it reclaim the active role; without `preempt` it would stay standby.",
  "tip": "HSRP: active/standby, Cisco-only, preempt off by default. VRRP: master/backup, open standard, preempt on by default. Both default to priority 100 with higher winning.",
  "check": [
   [
    "What must hosts use as their default gateway when an FHRP is configured?",
    "The virtual IP address shared by the group, not a router's physical interface address."
   ],
   [
    "Router A (priority 120, no preempt) boots after Router B (priority 100) has become HSRP active. What happens?",
    "Router B stays active, because HSRP preemption is off by default; A becomes standby until B fails or preempt is configured on A."
   ],
   [
    "Name one difference between HSRP and VRRP besides the role names.",
    "HSRP is Cisco proprietary with preemption off by default; VRRP is an open standard with preemption on by default and can use a router's real interface address as the virtual IP."
   ]
  ]
 },
 {
  "t": "Troubleshoot IP connectivity with ping, extended ping and traceroute",
  "body": [
   "Ping and traceroute are the first tools you reach for when something cannot be reached. Ping tells you whether a destination answers; traceroute tells you where along the path packets stop. Used together, and with the extended options IOS offers, they let you narrow a failure down to a specific router or link.",
   "Ping sends ICMP (Internet Control Message Protocol) echo requests and waits for echo replies. On IOS, each result is shown as a symbol: `!` means a reply arrived, `.` means the request timed out with no reply, and `U` means a router along the path sent back a destination unreachable message. You may also see `M` (could not fragment, often from an MTU problem with the don't-fragment bit set) and `&` (packet lifetime exceeded). The summary shows the success rate and round-trip times. It is common for the first ping to a new destination on an Ethernet segment to time out while ARP resolves, giving `.!!!!`, which is normal.",
   "The meaning of `.` versus `U` matters. `U` means some router had no route or was told to reject the packet, and it said so. `.` means nothing came back: the packet may have been dropped, the reply may have been lost on the return path, or a firewall or ACL may be silently discarding it. Always remember that a successful ping requires routing in both directions. A missing return route on a remote router produces timeouts even though your router's forward route is fine.",
   "Extended ping lets you control the test. Type `ping` alone at privileged EXEC and answer the prompts, or use options on one line: `ping 10.3.3.3 source g0/1 repeat 100 size 1500 df-bit`. Setting the source interface is the most useful option. A normal ping from a router uses the exit interface's address as the source, which the remote side usually knows how to reach. Sourcing from a LAN interface tests whether the remote network has a route back to that LAN, just as a user's PC would need. The repeat count finds intermittent loss, and a large size with the don't-fragment bit set tests the path MTU.",
   "Traceroute discovers each hop by sending probes with increasing TTL (time to live) values. The first probe has TTL 1, so the first router decrements it to 0, drops it and returns an ICMP time exceeded message, revealing its address. The next probe has TTL 2, and so on, until the destination replies. IOS and Linux traceroute send UDP probes to high port numbers by default, and the destination answers with port unreachable; Windows `tracert` uses ICMP echo requests. An asterisk means no reply within the timeout for that probe. Output that shows several hops then only asterisks tells you traffic stops after the last responding router, which is where to look for a missing route, a down link or a filter. Hops that repeat, such as two routers alternating, indicate a routing loop.",
   "A methodical approach is to ping the local gateway, then the far side of each link, then the destination, and use traceroute to identify the last good hop. Then check that hop's routing table with `show ip route` for the destination and for the return path."
  ],
  "terms": [
   [
    "ICMP echo request/reply",
    "The messages ping sends and receives to test reachability."
   ],
   [
    "Extended ping",
    "An IOS ping with options such as source interface, repeat count, size and don't-fragment bit."
   ],
   [
    "TTL",
    "Time to live, a hop counter decremented by each router; traceroute uses it to reveal each hop."
   ],
   [
    "ICMP time exceeded",
    "Message a router sends when it drops a packet whose TTL reached zero."
   ],
   [
    "U in ping output",
    "A destination unreachable message was received from a router along the path."
   ]
  ],
  "example": "From R1, `ping 10.3.3.3` succeeds, but users on R1's LAN cannot reach 10.3.3.3. `ping 10.3.3.3 source g0/1` from R1 fails with timeouts. The extended ping reveals that R3 has no route back to R1's LAN subnet. Adding that route on R3 fixes both the extended ping and the users' connectivity.",
  "tip": "A standard router ping uses the exit interface as its source, which can hide return-route problems. When a question says users fail but the router's ping works, the answer usually involves an extended ping from the LAN interface.",
  "check": [
   [
    "What is the difference between . and U in IOS ping output?",
    "A dot means no reply arrived before the timeout; U means a router returned an ICMP destination unreachable message."
   ],
   [
    "How does traceroute learn the address of each router in the path?",
    "It sends probes with TTL 1, 2, 3 and so on; each router that decrements the TTL to zero drops the probe and returns ICMP time exceeded from its address."
   ],
   [
    "Why would you set the source interface in an extended ping?",
    "To test reachability from, and the return route to, a specific network such as a user LAN, rather than the default exit interface address."
   ]
  ]
 },
 {
  "t": "Troubleshoot OSPF neighbor and route problems from show ip ospf output",
  "body": [
   "OSPF problems fall into two groups: routers that will not become neighbours, and neighbours that are up but routes are missing or not the expected ones. A handful of show commands answers nearly every question, and the exam frequently shows their output and asks for the cause.",
   "Start with `show ip ospf neighbor`. Healthy neighbours show FULL, with /DR, /BDR, /DROTHER or /- for point-to-point, and 2WAY/DROTHER between two non-DR routers is also healthy on broadcast segments. If a neighbour you expect is missing entirely, the routers are not exchanging valid hellos: check that OSPF is enabled on both interfaces, that neither is passive, and that area, subnet and mask, hello and dead timers and authentication match, and that router IDs differ. A neighbour stuck in INIT means this router hears the other but the other does not list it back, suggesting one-way traffic, such as an ACL blocking OSPF in one direction. EXSTART or EXCHANGE points to an MTU mismatch.",
   "Next, `show ip ospf interface` (or `brief`) shows each OSPF interface's area, IP and mask, cost, network type, state (DR, BDR, DROTHER, P2P), DR and BDR, timers and neighbour count. Comparing this output from both ends is the fastest way to spot mismatched area, mask, timers or network type. If an interface you expect is absent from `show ip ospf interface brief`, OSPF is not enabled there: fix the network statement wildcard or add `ip ospf 1 area 0`.",
   "`show ip protocols` shows the router ID, the network statements with wildcards and areas, the passive interfaces, the reference bandwidth and the neighbours the router is learning routes from. A typo such as `network 10.1.1.0 0.0.0.255 area 1` on one router instead of area 0 shows up here. `show ip ospf` shows the RID, reference bandwidth, areas and SPF run counts.",
   "If neighbours are FULL but a route is missing, check that the remote router actually advertises the network: its interface must be up and included in OSPF, even if passive. Check `show ip ospf database` to see whether the LSA exists in your LSDB. If the LSA is present but the route is not installed, a route with a better administrative distance may have been installed instead, such as a static route, or the network type mismatch may be preventing SPF from using the link. If the route is present but uses an unexpected path, compare costs with `show ip ospf interface brief` and check reference bandwidth consistency.",
   "```text\nR1# show ip ospf neighbor\nNeighbor ID  Pri  State          Dead Time  Address     Interface\n2.2.2.2        1  FULL/DR        00:00:35   10.0.12.2   Gi0/0\n3.3.3.3        1  EXSTART/DROTHER 00:00:33  10.0.13.3   Gi0/1\n```",
   "In the output above, R2 is healthy and R3 is stuck in EXSTART, so you would compare MTU on R1 Gi0/1 and R3's interface with `show interfaces`. Keep your checks ordered: neighbour state, interface parameters, process configuration, database, then routing table."
  ],
  "terms": [
   [
    "show ip ospf neighbor",
    "Lists OSPF neighbours with router ID, priority, state and role, dead timer, address and interface."
   ],
   [
    "show ip ospf interface",
    "Shows OSPF settings per interface, including area, cost, network type, DR/BDR and timers."
   ],
   [
    "show ip protocols",
    "Shows the router ID, network statements, passive interfaces and routing sources for running protocols."
   ],
   [
    "show ip ospf database",
    "Displays the link-state database, the LSAs this router has learned."
   ],
   [
    "INIT state",
    "The router has received a hello from the neighbour but does not see its own RID listed in it."
   ]
  ],
  "example": "R4 has no route to 10.40.0.0/24 behind R5, although `show ip ospf neighbor` shows R5 as FULL. On R5, `show ip ospf interface brief` does not list G0/2, the LAN interface. `show ip protocols` shows `network 10.4.0.0 0.0.255.255 area 0`, a typo that misses 10.40.0.1. Correcting the statement to cover 10.40.0.0 makes the LAN appear on R4 as an O route.",
  "tip": "No neighbour at all means hello mismatch or OSPF not enabled; INIT means one-way communication; EXSTART/EXCHANGE means MTU. FULL neighbours with a missing route means the network is not being advertised or a lower-AD route won.",
  "check": [
   [
    "A neighbour is stuck in INIT. What does that indicate?",
    "This router receives the neighbour's hellos but the neighbour is not receiving this router's hellos, suggesting one-way communication such as a filtering ACL."
   ],
   [
    "Which command would reveal a mistyped area number in a network statement?",
    "show ip protocols (or show running-config section router ospf); show ip ospf interface would also show the interface in the wrong area."
   ],
   [
    "Neighbours are FULL but a remote LAN is missing. Name two likely causes.",
    "The remote LAN interface is not enabled for OSPF (not matched by a network statement or ip ospf command), or the LAN interface is down."
   ]
  ]
 },
 {
  "t": "AAA for device access: local usernames, TACACS+ and RADIUS clients",
  "body": [
   "AAA stands for authentication, authorization and accounting. Authentication asks who you are, usually with a username and password. Authorization decides what you are allowed to do, such as which commands or privilege level. Accounting records what you did and when, for audit and troubleshooting. Applying AAA to routers and switches means administrators log in with individual accounts, not a shared password, and their actions can be controlled and logged.",
   "The simplest method uses local usernames stored on each device. `username admin privilege 15 secret S3cureP@ss` creates an account whose password is stored as a strong hash. On the VTY lines, `login local` makes the device check that local database. Local accounts are fine for a few devices, but on dozens of devices, adding or removing a user means touching every one, and there is no central log.",
   "Central AAA servers solve that. The network device acts as an AAA client and sends each login to a server, such as Cisco ISE, that holds the accounts or checks them against a directory. There are two protocols. TACACS+ (Terminal Access Controller Access-Control System Plus) was developed by Cisco and uses TCP port 49. It encrypts the entire body of the packet and separates authentication, authorization and accounting, which allows per-command authorization. That makes it the usual choice for administering network devices. RADIUS (Remote Authentication Dial-In User Service) is an open standard that uses UDP, with ports 1812 for authentication and 1813 for accounting (older implementations use 1645 and 1646). It encrypts only the password and combines authentication and authorization in one exchange. RADIUS is the usual choice for network access, such as 802.1X for users and Wi-Fi.",
   "Configuration starts with `aaa new-model`, which turns on the AAA framework and changes how login works, so configure a local fallback account first. Then define the server and a method list that says which sources to try, in order.",
   "```text\naaa new-model\nusername admin privilege 15 secret S3cureP@ss\ntacacs server ISE1\n address ipv4 10.1.1.50\n key MySharedKey\naaa authentication login default group tacacs+ local\naaa authorization exec default group tacacs+ local\naaa accounting commands 15 default start-stop group tacacs+\n```",
   "The method list `group tacacs+ local` means: ask the TACACS+ servers; if none respond, fall back to the local database. The fallback happens only when the servers are unreachable, not when they reject a password; a rejection is final. The `default` list applies to all lines unless a named list is applied to a line with `login authentication <name>`. RADIUS is configured similarly with `radius server` and `group radius`. Always keep a local account as fallback so you can still log in if the AAA servers go down, and verify with `show aaa servers` and test logins before closing your session."
  ],
  "terms": [
   [
    "AAA",
    "Authentication (who you are), authorization (what you may do) and accounting (what you did)."
   ],
   [
    "TACACS+",
    "Cisco-developed AAA protocol on TCP port 49 that encrypts the whole payload and separates the three A functions."
   ],
   [
    "RADIUS",
    "Open-standard AAA protocol on UDP 1812/1813 that encrypts only the password and combines authentication and authorization."
   ],
   [
    "Method list",
    "An ordered list of authentication or authorization sources, such as group tacacs+ then local."
   ],
   [
    "aaa new-model",
    "Global command that enables the AAA framework on an IOS device."
   ]
  ],
  "example": "A company with 150 switches uses TACACS+ so engineers log in with their directory accounts. When an engineer leaves, disabling one directory account removes access to every device, and accounting logs show which commands were entered on each switch. During a server outage, the local fallback account still works because the method list ends with `local`.",
  "tip": "TACACS+: TCP, full-payload encryption, separate AAA functions, device administration. RADIUS: UDP, password-only encryption, combined authentication and authorization, network access. Questions usually ask you to pick based on these.",
  "check": [
   [
    "Which AAA protocol encrypts the entire packet body and supports per-command authorization?",
    "TACACS+."
   ],
   [
    "With aaa authentication login default group radius local, when is the local database used?",
    "Only when no RADIUS server responds; if a server rejects the credentials, access is denied."
   ],
   [
    "Why configure a local username before enabling aaa new-model and a server method list?",
    "So there is a working fallback login if the AAA servers are unreachable or misconfigured, avoiding lockout."
   ]
  ]
 },
 {
  "t": "Secure management access: SSH version 2, enable secret, VTY access-class, login banners",
  "body": [
   "Anyone who gains administrative access to a router or switch controls the network. Securing management access means encrypting remote sessions, protecting privileged mode with a strong password, restricting who can even attempt a login, and showing a legal warning. These are some of the most commonly configured items in CCNA labs.",
   "Telnet sends everything, including passwords, in clear text, so anyone capturing traffic can read it. SSH (Secure Shell) encrypts the session and uses TCP port 22. To enable SSH on IOS, the device needs a hostname other than the default, a domain name, and an RSA key pair, because the key name is built from the hostname and domain. SSH version 2 is more secure than version 1 and should be enforced; IOS requires an RSA modulus of at least 768 bits for version 2, and 2048 bits is a sensible choice.",
   "```text\nhostname R1\nip domain-name example.local\ncrypto key generate rsa modulus 2048\nip ssh version 2\nusername admin privilege 15 secret Str0ngPass\nline vty 0 15\n login local\n transport input ssh\n access-class 10 in\n exec-timeout 10 0\n```",
   "`transport input ssh` allows only SSH on the VTY lines, blocking Telnet. `login local` uses the local user database (or you could use AAA). Protect the console line with a password or `login local` as well, and set `exec-timeout` so idle sessions are closed.",
   "Privileged EXEC mode is protected by `enable secret`, which stores the password as a strong hash. The older `enable password` stores it in clear text or, with `service password-encryption`, as a type 7 value, which is easily reversed and only prevents shoulder-surfing of the configuration. If both are configured, `enable secret` takes precedence. Use `secret` for every password where it is available, including `username ... secret`. `security passwords min-length` and `login block-for` add protection against short passwords and brute-force attempts.",
   "`access-class` applies a standard ACL to the VTY lines to control which source addresses can connect. For example, `access-list 10 permit 10.1.99.0 0.0.0.255` then `access-class 10 in` under the VTY lines allows only the management subnet to open SSH sessions. Note the difference: `access-class` filters on lines, while `ip access-group` filters on interfaces.",
   "Login banners display a legal notice. `banner motd # Authorized access only. Activity is monitored. #` shows a message-of-the-day banner before login; the character after `motd` is a delimiter that marks the start and end. Banners should warn against unauthorized use and never say 'welcome'. Verify SSH with `show ip ssh` and `show ssh`, and test with an SSH client from an allowed and a disallowed address."
  ],
  "terms": [
   [
    "SSH version 2",
    "An encrypted remote management protocol on TCP port 22; the version to enforce on network devices."
   ],
   [
    "enable secret",
    "Command that protects privileged EXEC mode with a hashed password; it overrides enable password."
   ],
   [
    "transport input ssh",
    "VTY line command permitting only SSH connections."
   ],
   [
    "access-class",
    "Line command applying a standard ACL to restrict which source addresses can use VTY lines."
   ],
   [
    "banner motd",
    "A message-of-the-day banner shown before login, typically a legal warning."
   ]
  ],
  "example": "An audit finds switches allowing Telnet from anywhere. The team pushes a standard configuration: hostname and domain, `crypto key generate rsa modulus 2048`, `ip ssh version 2`, `transport input ssh` and `access-class 10 in` permitting only 10.1.99.0/24, plus `enable secret` and a warning banner. A follow-up scan shows port 23 closed and SSH reachable only from the management subnet.",
  "tip": "SSH needs a hostname, a domain name and RSA keys before it works. If a question says crypto key generation failed or SSH is not enabled, look for a missing hostname or ip domain-name.",
  "check": [
   [
    "What are the prerequisites for generating RSA keys for SSH on IOS?",
    "A non-default hostname and a domain name (ip domain-name); then crypto key generate rsa with a suitable modulus."
   ],
   [
    "If both enable password and enable secret are configured, which is used?",
    "enable secret, which also stores the password as a stronger hash."
   ],
   [
    "What is the difference between access-class and ip access-group?",
    "access-class applies an ACL to VTY lines to control management sessions; ip access-group applies an ACL to an interface to filter traffic passing through."
   ]
  ]
 },
 {
  "t": "Standard and extended IPv4 ACLs: wildcard masks, sequence and first match, implicit deny, placement",
  "body": [
   "An access control list (ACL) is an ordered list of permit and deny statements (access control entries, or ACEs) that a router uses to filter packets. Applied to an interface in a direction, it decides whether each packet passes. ACLs are also used to select traffic for other features, such as NAT, VTY access and QoS.",
   "Standard ACLs match only the source IP address. They are numbered 1 to 99 and 1300 to 1999, or named. Extended ACLs match protocol, source address, destination address and, for TCP and UDP, source and destination ports. They are numbered 100 to 199 and 2000 to 2699, or named. Named ACLs are easier to read and edit: `ip access-list extended WEB-IN` then entries like `10 permit tcp 10.1.1.0 0.0.0.255 host 10.2.2.10 eq 443`.",
   "ACLs use wildcard masks, not subnet masks. A 0 bit means 'must match' and a 1 bit means 'ignore'. The wildcard for a subnet is 255.255.255.255 minus its mask: a /24 is 0.0.0.255, a /26 is 0.0.0.63 and a /30 is 0.0.0.3. `host 10.1.1.5` is shorthand for 10.1.1.5 0.0.0.0, and `any` for 0.0.0.0 255.255.255.255.",
   "Processing is top-down, first match. The router compares a packet with each entry in sequence order and acts on the first one that matches, ignoring the rest. Order therefore matters: put specific entries before general ones. Every ACL ends with an invisible implicit deny any, so a packet that matches nothing is dropped. An ACL containing only deny statements blocks everything; you normally need a `permit ip any any` (or `permit any` in a standard ACL) at the end if you intend to allow all other traffic. Named and numbered ACLs support sequence numbers, so you can insert an entry, such as `15 deny ...`, between 10 and 20, or remove one with `no 20`.",
   "An ACL does nothing until it is applied. `ip access-group WEB-IN in` on an interface filters packets entering that interface; `out` filters packets leaving it. Only one ACL is allowed per interface, per direction, per protocol (IPv4 or IPv6). Outbound ACLs do not filter traffic the router itself generates.",
   "Placement guidance: put extended ACLs as close to the source as possible, because they can match precisely and drop unwanted traffic before it crosses the network. Put standard ACLs as close to the destination as possible, because they match only on source; placed near the source, they would block that source from reaching everything beyond, not just the one destination you intended.",
   "Verify with `show access-lists`, which shows each entry and a match counter, and `show ip interface g0/0`, which shows which ACLs are applied in which direction. Counters that do not increase tell you traffic is not reaching the entry you expect."
  ],
  "terms": [
   [
    "Standard ACL",
    "An ACL matching only the source IPv4 address; numbered 1 to 99 and 1300 to 1999."
   ],
   [
    "Extended ACL",
    "An ACL matching protocol, source, destination and ports; numbered 100 to 199 and 2000 to 2699."
   ],
   [
    "Wildcard mask",
    "Inverse mask where 0 means the bit must match and 1 means ignore; for a /24 it is 0.0.0.255."
   ],
   [
    "Implicit deny",
    "The invisible final entry in every ACL that denies anything not matched earlier."
   ],
   [
    "ip access-group",
    "Interface command that applies an ACL inbound or outbound."
   ]
  ],
  "example": "Guests on 10.50.0.0/24 must not reach the finance server 10.10.10.20 but may use the internet. On the guest VLAN interface, inbound, you apply `ip access-list extended GUEST` with `10 deny ip 10.50.0.0 0.0.0.255 host 10.10.10.20` and `20 permit ip any any`. Without entry 20, the implicit deny would block all guest traffic, including the internet.",
  "tip": "Standard near the destination, extended near the source. And always ask whether the ACL ends with a permit, because the implicit deny catches questions where 'everything else' should be allowed.",
  "check": [
   [
    "What is the wildcard mask for 172.16.32.0/20?",
    "0.0.15.255 (255.255.255.255 minus 255.255.240.0)."
   ],
   [
    "An ACL has 10 permit ip any any then 20 deny ip host 10.1.1.5 any. Is traffic from 10.1.1.5 blocked?",
    "No. First match wins, and entry 10 matches all traffic, so entry 20 is never reached."
   ],
   [
    "Why are standard ACLs placed close to the destination?",
    "They only match the source address, so placing them near the source would block that source from all destinations behind that point, not just the intended one."
   ]
  ]
 },
 {
  "t": "Layer 2 security: port security (maximum, sticky, violation modes), DHCP snooping, dynamic ARP inspection",
  "body": [
   "Many attacks on a LAN happen at Layer 2, from a device plugged into an access port: flooding the switch's MAC table, running a rogue DHCP server, or poisoning ARP caches to intercept traffic. Cisco switches offer three features that work together to detect and prevent these attacks at the edge. The CCNA tests how each works and how they interact.",
   "Port security limits which and how many MAC addresses can use an access port. Enable it with `switchport port-security` on an access port. The default maximum is 1 MAC address; change it with `switchport port-security maximum 2`, for example for a phone plus PC. Allowed MACs can be configured statically, learned dynamically, or learned as sticky with `switchport port-security mac-address sticky`, which adds learned addresses to the running configuration so they survive a reload once you save it. This defeats MAC flooding attacks, where a tool sends frames from thousands of fake MACs to overflow the table so the switch floods traffic everywhere.",
   "When an unauthorized MAC appears or the maximum is exceeded, the violation mode decides the response. Shutdown, the default, err-disables the port, logs a message and increments the violation counter. Restrict drops the offending frames, logs and increments the counter, but keeps the port up for allowed MACs. Protect silently drops the offending frames with no log and no counter. A port shut down by a violation stays err-disabled until an administrator uses `shutdown` then `no shutdown`, or errdisable recovery is configured. Verify with `show port-security interface g0/5` and `show port-security address`.",
   "DHCP snooping stops rogue DHCP servers, which could hand clients a malicious gateway or DNS server. You enable it globally and per VLAN (`ip dhcp snooping` and `ip dhcp snooping vlan 10`), then mark the ports that lead to legitimate DHCP servers, usually uplinks, as trusted with `ip dhcp snooping trust`. All other ports are untrusted: server messages such as DHCP Offer and Ack arriving there are dropped. Snooping also builds a binding table of MAC address, IP address, VLAN, port and lease time for every client that gets an address, and it can rate-limit DHCP messages on untrusted ports to prevent starvation attacks. On some switches you may need `no ip dhcp snooping information option` if the upstream server rejects option 82.",
   "Dynamic ARP inspection (DAI) stops ARP spoofing, where an attacker sends forged ARP replies claiming the gateway's IP maps to the attacker's MAC, putting the attacker in the middle of traffic. With `ip arp inspection vlan 10`, the switch intercepts ARP messages on untrusted ports and checks the IP-to-MAC pairing against the DHCP snooping binding table. Mismatches are dropped and logged. Uplinks are trusted with `ip arp inspection trust`. Because DAI relies on the snooping table, DHCP snooping must be enabled first, and hosts with static IPs need ARP ACLs to be allowed."
  ],
  "terms": [
   [
    "Port security",
    "A switch feature that limits the number and identity of MAC addresses allowed on an access port."
   ],
   [
    "Sticky MAC",
    "A dynamically learned MAC that port security adds to the running configuration."
   ],
   [
    "Violation modes",
    "Shutdown (err-disable, log), restrict (drop, log, count) and protect (drop silently)."
   ],
   [
    "DHCP snooping",
    "A feature that drops DHCP server messages on untrusted ports and builds a binding table of client leases."
   ],
   [
    "Dynamic ARP inspection",
    "A feature that validates ARP messages on untrusted ports against the DHCP snooping binding table."
   ]
  ],
  "example": "A student plugs a home router into a classroom port and it starts offering 192.168.0.x addresses. With DHCP snooping enabled on the classroom VLAN and only the uplink trusted, its offers are dropped, and the students keep receiving leases from the real server. Port security with maximum 1 also err-disables the port because the router's MAC and the PC behind it exceed the limit.",
  "tip": "Remember which violation mode does what: protect drops silently, restrict drops and logs, shutdown err-disables. And DAI depends on DHCP snooping's binding table.",
  "check": [
   [
    "Which port security violation mode drops traffic and increments the violation counter but keeps the port up?",
    "Restrict."
   ],
   [
    "Which port should be trusted for DHCP snooping?",
    "The port leading toward the legitimate DHCP server, typically the uplink; client-facing ports stay untrusted."
   ],
   [
    "What does DAI compare ARP messages against?",
    "The DHCP snooping binding table of IP address, MAC address, VLAN and port (or configured ARP ACLs)."
   ]
  ]
 },
 {
  "t": "NAT and PAT: static, dynamic pool, overload; inside local/global and outside local/global",
  "body": [
   "Network Address Translation (NAT) rewrites IP addresses as packets pass through a router, most commonly to let hosts using private RFC 1918 addresses reach the internet with public addresses. It conserves scarce public IPv4 space and hides internal addressing. The CCNA covers three forms and a set of four address terms that confuse many learners.",
   "The four terms describe an address from two viewpoints. Inside means the host is on your network; outside means it is elsewhere. Local means the address as seen on the inside network; global means as seen on the outside. So the inside local address is the private address actually configured on your PC, such as 192.168.1.10. The inside global address is the public address that represents your PC to the outside, such as 203.0.113.5. The outside global address is the real address of the remote host, such as a web server at 198.51.100.80. The outside local address is how that remote host appears from inside; unless you also translate outside addresses, it is the same as the outside global.",
   "Static NAT maps one inside local address to one inside global address permanently: `ip nat inside source static 192.168.1.20 203.0.113.20`. It is used for servers that must be reachable from the internet, because the mapping exists before any traffic starts.",
   "Dynamic NAT maps inside hosts to a pool of public addresses on a first-come basis. An ACL identifies which inside addresses to translate, and a pool defines the public range. Each active host uses one public address; if the pool is exhausted, new hosts cannot be translated.",
   "```text\naccess-list 1 permit 192.168.1.0 0.0.0.255\nip nat pool PUBLIC 203.0.113.10 203.0.113.14 netmask 255.255.255.248\nip nat inside source list 1 pool PUBLIC\n! or PAT on the outside interface address:\nip nat inside source list 1 interface g0/0 overload\ninterface g0/1\n ip nat inside\ninterface g0/0\n ip nat outside\n```",
   "PAT (port address translation), also called NAT overload, lets many inside hosts share a single public address by also translating source port numbers. The router tracks each connection by address and port, so thousands of sessions can share one address. Adding `overload` enables it, either to the interface's own address or to a pool. PAT is what nearly every home and office router does.",
   "Every NAT setup needs the interfaces marked: `ip nat inside` on the LAN-facing interface and `ip nat outside` on the internet-facing interface. Forgetting one of these, or an ACL that does not match the inside hosts, are the most common faults. Verify with `show ip nat translations`, which lists inside global, inside local, outside local and outside global for each entry (with ports for PAT), and `show ip nat statistics`, which shows hits, misses and pool use. `clear ip nat translation *` removes dynamic entries."
  ],
  "terms": [
   [
    "Inside local",
    "The actual, usually private, address of an inside host."
   ],
   [
    "Inside global",
    "The public address that represents an inside host to the outside network."
   ],
   [
    "Outside global / outside local",
    "A remote host's real address, and that host's address as seen from inside (usually the same)."
   ],
   [
    "Static NAT",
    "A permanent one-to-one mapping of an inside local to an inside global address."
   ],
   [
    "PAT (overload)",
    "Translation of many inside addresses to one public address, distinguished by port numbers."
   ]
  ],
  "example": "A small office has one public address on its router's G0/0. PAT with `ip nat inside source list 1 interface g0/0 overload` lets 40 PCs browse. The office also hosts a camera server at 192.168.1.50 that a vendor must reach, so the ISP provides a second public address, 203.0.113.6, mapped with static NAT to 192.168.1.50.",
  "tip": "Inside local is the private address you configured on the host; inside global is its public face. If you remember 'inside/outside is where the host is, local/global is where you're looking from', the four terms follow.",
  "check": [
   [
    "A PC 10.1.1.5 browses to 198.51.100.7 via PAT to 203.0.113.2. Name the inside local, inside global and outside global addresses.",
    "Inside local 10.1.1.5, inside global 203.0.113.2, outside global 198.51.100.7."
   ],
   [
    "Which NAT type should you use for a web server that must accept connections from the internet?",
    "Static NAT (or a static port mapping), so the server's public address is always mapped to it."
   ],
   [
    "NAT is configured but show ip nat translations stays empty. Name two things to check.",
    "That ip nat inside and ip nat outside are on the correct interfaces, and that the ACL in the NAT rule matches the inside hosts' addresses."
   ]
  ]
 },
 {
  "t": "DHCP and DNS roles in the network; troubleshoot name resolution and DHCP client issues",
  "body": [
   "Two services quietly make every network usable. DHCP (Dynamic Host Configuration Protocol) gives hosts their IP address, mask, default gateway and DNS server addresses automatically. DNS (Domain Name System) translates names people remember, such as www.example.com, into the IP addresses computers need. When either fails, users report that 'the network is down', even though routing and switching are fine. Knowing each service's role lets you tell those failures apart.",
   "DHCP works through the DORA exchange: Discover, Offer, Request, Acknowledgment, using UDP ports 67 (server) and 68 (client). Because Discover is a broadcast, a relay agent, configured with `ip helper-address` on the router interface facing the clients, is needed when the server is on another subnet. The lease is temporary, and clients renew it before it expires. Besides the address, DHCP options deliver the gateway, DNS servers, domain name and, for devices like IP phones and APs, things like controller or TFTP server addresses.",
   "DNS is a distributed, hierarchical database. A client asks its configured DNS resolver, which answers from cache or queries the hierarchy: root servers, then top-level domain servers such as .com, then the authoritative server for the domain. Common record types are A (name to IPv4 address), AAAA (name to IPv6 address), CNAME (an alias for another name), MX (mail server for a domain), NS (name servers for a zone) and PTR (address to name, for reverse lookups). DNS queries normally use UDP port 53, with TCP port 53 for large responses and zone transfers. Answers are cached for their TTL, which is why a changed record may take time to be seen everywhere.",
   "On a Cisco router, `ip name-server 10.1.1.53` sets the DNS server the router uses, and `ip domain-lookup` (on by default) enables lookups. A familiar annoyance is that mistyped commands at the CLI are treated as hostnames and the router tries to resolve them; `no ip domain-lookup` stops that in labs. `ip host SERVER1 10.1.1.10` creates a static local mapping.",
   "To troubleshoot a DHCP client, check its IP configuration first. A 169.254.x.x APIPA address, or no address at all, means DHCP failed. Then check the path: link up, correct VLAN, relay configured with the right server address on the right interface, a pool or scope for that subnet on the server, free addresses in the pool, and DHCP snooping not dropping legitimate offers. `ipconfig /release` and `ipconfig /renew` on Windows, or `dhclient` on some Linux systems, retry the process; `show ip dhcp binding` and `show ip dhcp pool` on an IOS server show leases and exhaustion.",
   "To troubleshoot DNS, separate reachability from name resolution. If `ping 10.1.1.10` works but `ping server1.example.com` fails, the problem is DNS. Check which DNS server the client uses with `ipconfig /all`, `resolvectl status` or `/etc/resolv.conf`, then test directly with `nslookup server1.example.com` or `dig`. Possible causes are a wrong DNS server address from DHCP, the DNS server being unreachable or blocked by an ACL on UDP 53, a missing or incorrect record, or a stale cache that `ipconfig /flushdns` clears."
  ],
  "terms": [
   [
    "DNS resolver",
    "The DNS server a client queries; it answers from cache or looks the name up through the DNS hierarchy."
   ],
   [
    "A / AAAA record",
    "DNS records mapping a name to an IPv4 or IPv6 address."
   ],
   [
    "PTR record",
    "A reverse DNS record mapping an IP address to a name."
   ],
   [
    "nslookup",
    "A command-line tool that queries DNS servers directly to test name resolution."
   ],
   [
    "DHCP lease",
    "The period for which a client may use an address before renewing it with the server."
   ]
  ],
  "example": "After a DHCP server change, users can reach websites by IP but not by name. `ipconfig /all` shows the DNS server as 10.1.1.99, an address that no longer exists. The new DHCP scope had copied an old DNS option. Correcting the scope's DNS server and having users run `ipconfig /renew` restores name resolution.",
  "tip": "If IP works but names fail, the answer is DNS. If the client has a 169.254 address, the answer is DHCP. Many troubleshooting questions are solved by that one distinction.",
  "check": [
   [
    "Which DNS record type maps a name to an IPv6 address?",
    "AAAA."
   ],
   [
    "A user can ping 8.8.8.8 but browsing by name fails. What should you check first?",
    "The client's DNS server settings and whether that server is reachable and resolving, for example with nslookup."
   ],
   [
    "Why does a DHCP client need a relay agent when the server is on another subnet?",
    "DHCP Discover is a broadcast, and routers do not forward broadcasts; the relay forwards it as a unicast to the server."
   ]
  ]
 },
 {
  "t": "NTP role in keeping logs and certificates consistent",
  "body": [
   "Every device has a clock, and on its own each one drifts. Network Time Protocol (NTP) keeps device clocks synchronized to accurate sources so that every router, switch, server and firewall agrees on the time. That sounds minor, but many security and operational tasks depend on it.",
   "Logs are the first reason. When an incident spans several devices, you piece together what happened by lining up syslog messages by timestamp. If one router's clock is five minutes fast and another's is three minutes slow, the sequence of events becomes impossible to reconstruct and correlation tools in a SIEM or monitoring system give wrong results. Configure timestamps with `service timestamps log datetime msec` so messages carry the date and time, not just uptime.",
   "Certificates are the second reason. Digital certificates used for HTTPS, VPNs, 802.1X and secure device management have validity dates. A device whose clock is far wrong may think a valid certificate has not yet become valid or has already expired, and reject it. Authentication protocols such as Kerberos also reject requests if clocks differ by more than a small allowed skew. Time-based one-time passwords rely on synchronized time too.",
   "NTP organizes sources in strata. Stratum 0 are reference clocks such as GPS receivers or atomic clocks, which are not on the network directly. Stratum 1 servers connect directly to a stratum 0 source. A device synchronized to a stratum 1 server becomes stratum 2, and so on. Lower stratum means closer to the reference, and devices prefer it. Stratum 16 means unsynchronized. NTP uses UDP port 123 and continually adjusts for network delay.",
   "On IOS, `ntp server 10.1.1.123` makes the device a client of that server; configure two or more servers for redundancy. A device synchronized to a server can in turn serve time to others. `ntp master` makes a router an authoritative source using its own clock, useful in labs or isolated networks; it defaults to stratum 8. Set the local time zone with `clock timezone`, while NTP itself carries UTC. To stop devices accepting time from rogue sources, enable NTP authentication: `ntp authenticate`, `ntp authentication-key 1 md5 <key>` and `ntp trusted-key 1`, and add `key 1` to the `ntp server` command.",
   "```text\nclock timezone EST -5\nntp server 10.1.1.123 prefer\nntp server 10.1.2.123\nservice timestamps log datetime msec localtime\n```",
   "Verify with `show ntp status`, which shows whether the clock is synchronized, the stratum and the reference, and `show ntp associations`, where an asterisk marks the server the device is synchronized to. `show clock` displays the current time; a leading asterisk there means the time is not authoritative or not synchronized."
  ],
  "terms": [
   [
    "NTP",
    "Network Time Protocol, which synchronizes device clocks over UDP port 123."
   ],
   [
    "Stratum",
    "An NTP source's distance from a reference clock; lower is better and 16 means unsynchronized."
   ],
   [
    "ntp master",
    "IOS command that makes a router an authoritative NTP source from its own clock, stratum 8 by default."
   ],
   [
    "NTP authentication",
    "Using shared keys so a device only accepts time from trusted NTP servers."
   ],
   [
    "service timestamps",
    "IOS command that adds date and time stamps to log and debug messages."
   ]
  ],
  "example": "An engineer investigating a suspicious login compares logs from the firewall, the core switch and an AAA server, but events appear out of order by several minutes. The switch shows `show ntp status` as unsynchronized because its NTP server was retired. After pointing all devices to two internal NTP servers, the timestamps align and the sequence of events is clear.",
  "tip": "Lower stratum is more accurate, and stratum 16 means not synchronized. An exam question about failed certificate validation or out-of-order logs is usually pointing at NTP.",
  "check": [
   [
    "Why can a wrong device clock cause certificate validation to fail?",
    "Certificates have validity start and end dates; if the clock is outside that window the device believes the certificate is not yet valid or has expired."
   ],
   [
    "A router syncs to a stratum 2 server. What is the router's stratum?",
    "Stratum 3."
   ],
   [
    "Which command shows whether a Cisco device's clock is synchronized?",
    "show ntp status (show ntp associations shows the selected server)."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2 and WPA3, Personal (PSK/SAE) vs Enterprise (802.1X)",
  "body": [
   "Anyone within radio range can receive wireless frames, so a WLAN must authenticate who joins and encrypt what they send. The Wi-Fi Alliance certifies security generations called WPA (Wi-Fi Protected Access). The original WEP and first-generation WPA with TKIP are broken and obsolete. The CCNA focuses on WPA2 and WPA3, each in Personal and Enterprise modes.",
   "WPA2 uses AES encryption in CCMP mode (counter mode with CBC-MAC protocol) for confidentiality and integrity. WPA3 keeps AES and adds stronger protections: it replaces the pre-shared key handshake in Personal mode with SAE, requires Protected Management Frames (PMF) so attackers cannot forge frames like deauthentication messages, and offers a 192-bit security suite in Enterprise mode for high-security environments. For open guest networks, the related Enhanced Open feature (OWE, Opportunistic Wireless Encryption) encrypts traffic without a password.",
   "Personal mode uses one shared passphrase for everyone. In WPA2-Personal the passphrase produces a pre-shared key (PSK), and clients and the AP prove they know it in the four-way handshake, which also creates per-session encryption keys. Its weakness is that an attacker who captures a handshake can try guesses against it offline, so a weak passphrase can be cracked. WPA3-Personal uses SAE (Simultaneous Authentication of Equals), a key exchange that resists offline dictionary attacks: each guess requires a live interaction with the AP. SAE also provides forward secrecy, so learning the passphrase later does not decrypt previously captured traffic. Personal mode suits homes and small offices; its drawbacks are that everyone shares one secret and changing it means updating every device.",
   "Enterprise mode uses 802.1X to authenticate each user or device individually against a central server. There are three roles. The supplicant is the client device software. The authenticator is the AP or wireless LAN controller, which passes messages but does not make the decision. The authentication server, usually a RADIUS server, checks credentials against a directory and tells the authenticator to allow or deny. The messages use EAP (Extensible Authentication Protocol) in one of several methods, such as EAP-TLS with certificates on both sides, or PEAP, which protects a username and password inside a TLS tunnel. Each user gets unique session keys, access can be revoked per user, and RADIUS can assign a VLAN or policy per user.",
   "On a Cisco WLC, you configure these choices per WLAN: the security type (WPA2, WPA3 or a transition mode supporting both), the authentication key management method (PSK, SAE or 802.1X) and, for Enterprise, the RADIUS servers. A transition mode helps when older clients cannot yet use WPA3. Remember that 6 GHz operation requires WPA3 or Enhanced Open."
  ],
  "terms": [
   [
    "WPA2",
    "Wi-Fi security generation using AES-CCMP encryption, with PSK or 802.1X authentication."
   ],
   [
    "WPA3",
    "The newer generation adding SAE, mandatory protected management frames and a 192-bit Enterprise option."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals, WPA3-Personal's key exchange that resists offline dictionary attacks."
   ],
   [
    "802.1X",
    "Port-based network access control using a supplicant, an authenticator and an authentication server."
   ],
   [
    "EAP",
    "Extensible Authentication Protocol, the framework carrying 802.1X authentication methods such as EAP-TLS and PEAP."
   ]
  ],
  "example": "A hospital uses WPA3-Enterprise for staff: laptops authenticate with certificates using EAP-TLS, the WLC relays to a RADIUS server, and each role lands in its own VLAN. When a nurse leaves, disabling her account ends her access without changing anything for others. The visitor network uses Enhanced Open so guests' traffic is encrypted without a shared password.",
  "tip": "Personal = shared key (PSK for WPA2, SAE for WPA3). Enterprise = 802.1X with a RADIUS server. In 802.1X, the AP or WLC is the authenticator, not the authentication server.",
  "check": [
   [
    "What weakness of WPA2-Personal does WPA3's SAE address?",
    "Offline dictionary attacks against a captured four-way handshake; SAE requires live interaction for each guess and provides forward secrecy."
   ],
   [
    "Name the three 802.1X roles and give an example of each.",
    "Supplicant (the client laptop), authenticator (the AP or WLC) and authentication server (a RADIUS server)."
   ],
   [
    "Why is Enterprise mode preferred in a large organization?",
    "Each user authenticates individually, gets unique keys and can be revoked or assigned policy centrally, instead of everyone sharing one passphrase."
   ]
  ]
 },
 {
  "t": "VPNs: site-to-site IPsec vs remote-access",
  "body": [
   "A virtual private network (VPN) creates a secure tunnel across an untrusted network, usually the internet, so that traffic is private and protected from tampering. VPNs give organizations the security of a private WAN at the cost of internet connectivity. The CCNA distinguishes two main uses: connecting whole sites, and connecting individual users.",
   "A site-to-site VPN links two networks, such as a branch and headquarters. VPN gateways, typically routers or firewalls at each site, build a permanent tunnel between them. Hosts at each site send traffic normally to their default gateway and are unaware of the VPN; the gateway encrypts traffic destined for the other site, sends it across the internet, and the far gateway decrypts it. No software is needed on end devices.",
   "Site-to-site VPNs normally use IPsec, a framework of protocols. IKE (Internet Key Exchange) negotiates security settings and authenticates the peers, using pre-shared keys or certificates, and creates the keys. ESP (Encapsulating Security Payload, IP protocol 50) then provides confidentiality through encryption, integrity through hashing, and origin authentication. AH (Authentication Header, IP protocol 51) provides integrity and authentication but no encryption, so ESP is what you will see in practice. In tunnel mode, used between gateways, the entire original packet is encrypted and a new IP header is added with the gateways' addresses; transport mode protects only the payload and is used between two hosts. Plain IPsec does not carry multicast, so routing protocols across the tunnel usually require GRE over IPsec or virtual tunnel interfaces. Cisco DMVPN builds many branch tunnels dynamically in a hub-and-spoke design.",
   "A remote-access VPN connects an individual user's device to the organization's network, typically for teleworkers and travellers. The user runs a VPN client on the laptop or phone, such as Cisco Secure Client (formerly AnyConnect), which connects to a VPN headend, usually a firewall. Remote-access VPNs commonly use TLS (the same protection as HTTPS) or IPsec with IKEv2. Clientless VPNs, in which the user reaches selected internal web applications through a browser over TLS, are another form. The user authenticates, often with multifactor authentication through RADIUS or similar, and receives an internal address.",
   "Remote-access designs also choose between full tunnel, where all the user's traffic goes through the VPN, and split tunnel, where only traffic for corporate networks uses the tunnel and internet traffic goes directly. Full tunnel gives more inspection and control; split tunnel reduces load on the headend.",
   "To compare them for the exam: site-to-site is always on, connects networks, is invisible to users and uses gateway devices at both ends. Remote access is on demand, connects one device, requires client software or a browser on the user side, and is started by the user."
  ],
  "terms": [
   [
    "Site-to-site VPN",
    "A permanent tunnel between gateways connecting whole networks, transparent to end hosts."
   ],
   [
    "Remote-access VPN",
    "An on-demand tunnel from an individual user's device to a VPN headend."
   ],
   [
    "IPsec",
    "A framework of protocols (IKE, ESP, AH) providing confidentiality, integrity and authentication for IP traffic."
   ],
   [
    "ESP",
    "Encapsulating Security Payload, IP protocol 50, which encrypts and authenticates IPsec traffic."
   ],
   [
    "Split tunnel",
    "A remote-access setup where only corporate-bound traffic uses the VPN and other traffic goes directly to the internet."
   ]
  ],
  "example": "A retailer connects 30 stores to its data center with site-to-site IPsec tunnels on each store router, so point-of-sale terminals reach the payment servers without any client software. Its buyers, who travel, use a remote-access VPN client on their laptops that authenticates with MFA to a firewall at headquarters.",
  "tip": "If the scenario mentions client software, individual users or teleworkers, choose remote access. If it mentions connecting offices with devices at both ends and no user involvement, choose site-to-site IPsec.",
  "check": [
   [
    "Which IPsec protocol provides encryption?",
    "ESP (Encapsulating Security Payload). AH provides integrity and authentication but no encryption."
   ],
   [
    "Do hosts at a branch need VPN software to use a site-to-site VPN?",
    "No. The gateways handle encryption; hosts send traffic normally."
   ],
   [
    "What is a split-tunnel remote-access VPN?",
    "Only traffic destined for corporate networks goes through the tunnel; other internet traffic leaves the device directly."
   ]
  ]
 },
 {
  "t": "Security fundamentals: threats, vulnerabilities, exploits, mitigation and user awareness",
  "body": [
   "Security discussions use a few words with precise meanings, and the CCNA expects you to use them correctly. A vulnerability is a weakness in a system, such as unpatched software, a default password or an open management port. A threat is anything that could take advantage of a vulnerability to cause harm, such as an attacker, malware or even a flood. An exploit is the specific method or tool that actually takes advantage of a vulnerability. Risk is the likelihood that a threat will exploit a vulnerability combined with the impact if it does. Mitigation is any measure that reduces risk: removing the vulnerability, reducing the threat's chance of success or limiting the damage.",
   "Know the common attack categories well enough to recognize them. Reconnaissance gathers information, for example scanning for open ports or reading discovery protocol output, to plan an attack. Denial of service (DoS) overwhelms a target so legitimate users cannot use it; distributed DoS (DDoS) uses many compromised machines, often a botnet. Reflection and amplification attacks spoof the victim's address in small requests to services that send much larger replies to the victim. Spoofing forges an identity, such as a source IP, MAC address or DHCP server. Man-in-the-middle (on-path) attacks insert the attacker between two parties, for example through ARP spoofing. Password attacks include guessing, brute force and dictionary attacks.",
   "Malware is malicious software. A virus attaches to a file and spreads when that file is run. A worm spreads by itself across networks by exploiting vulnerabilities. A trojan pretends to be legitimate software. Ransomware encrypts data and demands payment. Spyware and keyloggers steal information.",
   "Social engineering targets people rather than technology. Phishing sends fraudulent messages to many recipients to steal credentials or deliver malware; spear phishing targets specific people, and whaling targets executives. Vishing uses voice calls, smishing uses text messages. Pretexting invents a scenario, such as pretending to be IT support. Tailgating or piggybacking means following an authorized person through a secure door.",
   "Mitigations come in layers, often called defense in depth. Technical controls include patching, strong passwords and multifactor authentication (MFA, combining two or more of something you know, have and are), ACLs, firewalls, intrusion prevention systems, port security, DHCP snooping, dynamic ARP inspection, encryption and disabling unused services. Physical controls include locked wiring closets, badge readers and cameras. Administrative controls include policies, procedures and background checks.",
   "Because many attacks rely on fooling a person, a security program must include user awareness. Awareness campaigns keep security in people's minds with posters, emails and simulated phishing tests. User training teaches specific skills, such as how to spot and report phishing. Physical access control limits who can reach equipment. The CCNA lists these three together as elements of a security program, and they complement technical controls rather than replace them."
  ],
  "terms": [
   [
    "Vulnerability",
    "A weakness in a system that could be exploited."
   ],
   [
    "Threat",
    "A potential danger, such as an attacker or malware, that could exploit a vulnerability."
   ],
   [
    "Exploit",
    "The specific method or tool used to take advantage of a vulnerability."
   ],
   [
    "Mitigation",
    "A measure that reduces the likelihood or impact of a threat exploiting a vulnerability."
   ],
   [
    "Social engineering",
    "Manipulating people into revealing information or performing actions that weaken security."
   ]
  ],
  "example": "A switch still uses the default SNMP community (a vulnerability). A criminal group scanning the internet (a threat) uses a tool that reads the configuration via that community (an exploit). The company mitigates by removing the default community, moving to SNMPv3, restricting management access with an ACL and running phishing awareness training after discovering the scan started with a stolen VPN password.",
  "tip": "Do not mix up the terms: the weakness is the vulnerability, the potential attacker is the threat, and the tool or technique is the exploit. Exam distractors swap them.",
  "check": [
   [
    "An unpatched web server is running on a public IP. Is the missing patch a threat or a vulnerability?",
    "A vulnerability; the threat is an attacker or malware that might exploit it."
   ],
   [
    "What is the difference between phishing and spear phishing?",
    "Phishing targets many people with generic messages; spear phishing is tailored to a specific person or group."
   ],
   [
    "Name the three elements of a security program the CCNA lists alongside technical controls.",
    "User awareness, user training and physical access control."
   ]
  ]
 },
 {
  "t": "AI in network operations: predictive AI and machine learning (anomaly detection, predictive analytics) vs generative AI",
  "body": [
   "Networks generate far more data than people can watch: interface counters, logs, flow records, wireless client statistics and more. Artificial intelligence helps operations teams make sense of it. The CCNA distinguishes two broad families: predictive AI, built on machine learning that finds patterns in data and forecasts outcomes, and generative AI, which creates new content such as text or configuration. They solve different problems, and you should be able to tell which one a scenario describes.",
   "Machine learning (ML) is a way of building systems that learn patterns from data instead of following rules written by hand. In supervised learning, the model trains on labelled examples, such as past events tagged as 'failure' or 'normal', and learns to classify new data. In unsupervised learning, the model looks for structure in unlabelled data, such as grouping similar behaviour or noticing outliers. Both need good, representative data; a model trained on unrepresentative data makes poor predictions.",
   "Anomaly detection is one of the most common uses in networking. The system first learns a baseline of normal behaviour for each device, link or user, including how it varies by time of day and day of week. It then flags deviations: a sudden jump in traffic from one host, an access point with unusually many failed client associations, or DHCP taking longer than normal. Because the baseline is learned and dynamic, it catches problems that a fixed threshold would miss and raises fewer false alarms when load changes predictably, such as a Monday morning spike.",
   "Predictive analytics uses historical trends to forecast what will happen. Examples include predicting when a WAN link will reach capacity so you can upgrade before users suffer, forecasting which hardware is likely to fail based on error trends, or anticipating that a wireless area will be congested during an event. The value is shifting operations from reactive (fixing after complaints) to proactive.",
   "Generative AI, based on large language models (LLMs) and similar models, produces new content in response to a prompt. In network operations it can summarize long logs or incident timelines in plain language, explain an unfamiliar show command output, draft a configuration snippet or script, write documentation, or answer questions through a natural-language assistant. Its key limitation is that it can produce confident but wrong output, often called hallucination, so anything it generates, especially configuration, must be reviewed and tested before use. It also raises data-handling questions: sending device configurations or logs to an external service may expose sensitive information.",
   "To keep them apart: predictive AI analyses data to detect, classify and forecast; generative AI creates new text, code or content. Many platforms combine them, for example an anomaly detection engine raising an alert and a generative assistant summarizing it and suggesting next steps for an engineer to verify."
  ],
  "terms": [
   [
    "Machine learning",
    "Techniques that let a system learn patterns from data rather than from hand-written rules."
   ],
   [
    "Anomaly detection",
    "Identifying behaviour that deviates from a learned baseline of normal activity."
   ],
   [
    "Predictive analytics",
    "Using historical data and trends to forecast future events such as capacity exhaustion or failures."
   ],
   [
    "Generative AI",
    "AI that creates new content such as text, summaries, code or configuration in response to prompts."
   ],
   [
    "Hallucination",
    "Plausible-sounding but incorrect output from a generative AI model."
   ]
  ],
  "example": "A campus assurance platform learns that DHCP normally completes in under a second on each floor. One morning it flags an anomaly: clients on floor 4 are taking several seconds. Its predictive module had also forecast that floor's pool would run low. An engineer then asks a generative assistant to summarize the related logs, checks the suggested cause against `show ip dhcp pool` and expands the pool.",
  "tip": "Words like baseline, anomaly, forecast, trend and classification point to predictive AI/ML. Words like draft, summarize, generate and natural-language prompt point to generative AI.",
  "check": [
   [
    "An AI system warns that a WAN link will reach 90 percent utilization in six weeks. Is this predictive or generative AI?",
    "Predictive AI (predictive analytics), because it forecasts from historical trends."
   ],
   [
    "Why can dynamic baselines produce fewer false alarms than fixed thresholds?",
    "They learn normal variation, such as daily peaks, so predictable changes are not flagged while true deviations still are."
   ],
   [
    "What must an engineer do before applying a configuration drafted by generative AI?",
    "Review, validate and test it, because generative models can produce incorrect output."
   ]
  ]
 },
 {
  "t": "Agentic AI in network operations: agents that plan steps and call tools, with guardrails and human approval",
  "body": [
   "Generative AI on its own answers questions or drafts text. Agentic AI goes further: an AI agent is given a goal, plans the steps to reach it, calls tools to gather information or take actions, looks at the results and decides what to do next, repeating until the goal is met or it needs help. In network operations, that could mean an agent that investigates an alert by running show commands, checking a monitoring system and a ticket history, and then proposing or applying a fix.",
   "The loop has recognizable parts. A language model provides the reasoning: interpreting the goal, breaking it into steps and choosing tools. Tools are the defined functions the agent is allowed to call, such as 'run a read-only command on a device', 'query the telemetry database', 'open a ticket' or 'push a configuration change through the controller API'. Each tool has a clear description and inputs so the model knows when and how to use it. Memory or context holds what the agent has learned so far in the task. The agent observes each tool's output and updates its plan.",
   "Because an agent can take real actions, safety design matters more than with a chatbot. Guardrails are the limits and checks placed around the agent. Common guardrails include least privilege, giving the agent only the tools and permissions the task needs, such as read-only access for diagnosis; scoping which devices or sites it may touch; validation, such as checking a proposed configuration against policy or running it in a test environment first; rate limits and change windows; and complete logging of every step and tool call for audit.",
   "Human approval, often called human-in-the-loop, is the most important guardrail for changes. The agent may diagnose and propose on its own, but a person reviews and approves before any change that could affect production is executed. Many organizations start agents in read-only or recommend-only mode and expand their autonomy only for low-risk, well-understood actions as trust grows. The agent should also know when to stop and escalate, rather than guessing.",
   "Risks to recognize include acting on a wrong conclusion, since the underlying model can be mistaken; making changes that cascade across many devices quickly; prompt injection, where untrusted input such as a log line or ticket text contains instructions that try to steer the agent; and data exposure if sensitive information passes to external services. These are addressed with the guardrails above, by treating tool outputs and external text as data rather than instructions, and by keeping humans accountable for changes.",
   "For the exam, remember the distinction: generative AI produces content when asked, while agentic AI autonomously plans multi-step work and calls tools to act. Also remember that responsible deployment pairs agents with guardrails and human approval, especially for configuration changes."
  ],
  "terms": [
   [
    "AI agent",
    "A system that uses a model to plan steps toward a goal, call tools and act on their results in a loop."
   ],
   [
    "Tool calling",
    "An agent invoking defined functions or APIs, such as running a command or querying a database."
   ],
   [
    "Guardrails",
    "Limits and checks around an agent, such as least privilege, scope restrictions, validation and logging."
   ],
   [
    "Human-in-the-loop",
    "Requiring a person to review and approve an agent's proposed actions before they are executed."
   ],
   [
    "Prompt injection",
    "Untrusted input crafted to make an AI system follow instructions it should not."
   ]
  ],
  "example": "An alert says users in building B have slow Wi-Fi. An operations agent with read-only tools queries the wireless controller, finds one AP with high channel utilization and interference, checks change history and drafts a plan to move that AP to another channel. It posts the plan and evidence to the change ticket; an engineer reviews it, approves, and only then does the agent apply the change through the controller API and confirm the improvement.",
  "tip": "If a scenario describes an AI that decides on steps and executes them through tools, it is agentic AI. The best-practice answer almost always includes least privilege and human approval before production changes.",
  "check": [
   [
    "What distinguishes agentic AI from a generative AI chatbot?",
    "An agent plans multi-step work toward a goal and calls tools to gather data or take actions, observing results and iterating; a chatbot only generates responses."
   ],
   [
    "Name three guardrails for an AI agent in network operations.",
    "Any three of: least-privilege tool access, limited scope, human approval for changes, validation or testing before changes, change windows or rate limits, and full logging."
   ],
   [
    "Why should an agent treat text in logs or tickets as data rather than instructions?",
    "Such text could contain prompt injection that tries to make the agent take unintended actions."
   ]
  ]
 },
 {
  "t": "Writing prompts for a generative AI system: persona, instructions, data classification, output format",
  "body": [
   "A generative AI system responds to the prompt you give it, and the quality of its answer depends heavily on how clear that prompt is. A vague request such as 'fix my OSPF' leaves the model to guess the device type, the problem, what you already tried and what kind of answer you want. A well-structured prompt gets more accurate, more useful output on the first try. The CCNA frames good prompting around a few elements: persona, instructions, context and data, and output format, together with handling data according to its classification.",
   "A persona tells the model what role to take and at what level to pitch the answer, for example: 'You are a senior network engineer reviewing Cisco IOS configurations for a mid-sized enterprise.' This steers vocabulary and depth. You can also describe the audience: 'Explain it for a help-desk technician who is new to routing.'",
   "Instructions state the task precisely. Say what you want done, with any constraints: 'Review the OSPF configuration below for reasons the neighbour with R2 is not forming. List each problem, the evidence for it in the output, and the command to fix it. Do not change the area design.' Break complex tasks into steps, give the relevant context such as the platform and what you have already checked, and include an example of what a good answer looks like if the format is unusual. Clear, specific, positive instructions ('do this') work better than long lists of prohibitions.",
   "Data is the material the model works on: show command output, configuration excerpts, log lines. Provide only what the task needs, and mark it clearly, for example between separators, so the model knows what is data and what is instruction. This matters because of data classification. Organizations classify information by sensitivity, such as public, internal, confidential and restricted, and policy decides which classes may be shared with which AI tools. Device configurations often contain passwords, SNMP communities, pre-shared keys, internal addressing and customer data. Before pasting them into a prompt, check the tool is approved for that classification, and redact or replace secrets and identifying details. Public AI services may retain or process data outside your control.",
   "Output format tells the model how to present the result so you can use it directly: 'Respond as a table with columns Problem, Evidence and Fix', 'Return only the IOS configuration commands, one per line', or 'Produce valid JSON with the keys device, issue and remediation'. Structured output is especially useful when the response feeds a script or ticketing system.",
   "Finally, treat the output as a draft. Check facts, commands and syntax against documentation and test changes in a lab before production. If the answer misses the mark, refine the prompt: add missing context, tighten the instructions or give an example, rather than simply asking again."
  ],
  "terms": [
   [
    "Persona",
    "The role and expertise level you ask the model to adopt, which shapes vocabulary and depth."
   ],
   [
    "Instructions",
    "The specific task, constraints and steps you want the model to follow."
   ],
   [
    "Data classification",
    "Labelling information by sensitivity to control where it may be shared, including with AI tools."
   ],
   [
    "Output format",
    "The requested structure of the answer, such as a table, a command list or JSON."
   ],
   [
    "Redaction",
    "Removing or replacing sensitive values such as passwords and keys before sharing data."
   ]
  ],
  "example": "An engineer writes: 'You are a Cisco CCNP-level troubleshooter. Using only the output between the lines, identify why R1 and R2 are not OSPF neighbours. Answer as a table: Problem, Evidence, Fix command.' Before pasting `show ip ospf interface` and the running config, she replaces the authentication key and public addresses with placeholders, as her company's policy for internal data requires.",
  "tip": "A strong prompt names who the model should be, what exactly to do, what data to use, and how to format the answer, and it never includes secrets that the data classification policy forbids sharing.",
  "check": [
   [
    "Name the four prompt elements emphasized for network operations.",
    "Persona, instructions, data (with attention to its classification) and output format."
   ],
   [
    "Why should you redact a configuration before pasting it into a generative AI tool?",
    "Configurations can contain passwords, keys, SNMP communities and internal details; sharing them may violate data classification policy or expose them to a third party."
   ],
   [
    "Why is specifying an output format useful?",
    "It makes the answer consistent and directly usable, for example as a table for a ticket or JSON for a script."
   ]
  ]
 },
 {
  "t": "Network management approaches: device-by-device CLI, cloud-managed, controller-based, automation, infrastructure as code",
  "body": [
   "How you manage a network determines how quickly you can make changes, how consistent devices are and how often mistakes cause outages. The CCNA compares several approaches, from traditional to modern, and expects you to understand the trade-offs rather than declare one always best. Real networks usually mix them.",
   "Device-by-device CLI management is the traditional approach: an engineer connects to each router or switch with SSH or the console and types commands. It gives complete control and is essential for troubleshooting and for recovering a device when everything else fails. But it scales poorly. Making the same change on two hundred switches takes a long time, typos creep in, configurations drift apart over time and there is little record of who changed what unless AAA accounting is in place.",
   "Cloud-managed networking puts the management plane in a vendor-hosted cloud dashboard, as with Cisco Meraki. Devices connect out to the cloud, receive their configuration and report status. Administrators manage many sites from one web interface with templates, and new devices can be shipped to a site and configure themselves when plugged in (zero-touch provisioning). Data traffic still flows locally. The trade-offs are dependence on internet connectivity for management and on the vendor platform and licensing.",
   "Controller-based networking uses an on-premises or private-cloud controller, such as Cisco Catalyst Center (formerly DNA Center) for campus networks or a wireless LAN controller for APs. The controller holds the intended policy, pushes configuration to devices, collects telemetry and offers assurance views. Administrators express intent, such as 'these user groups may reach these applications', and the controller translates it into device configuration. It exposes APIs so other tools can automate against it.",
   "Automation means using scripts and tools, such as Python or Ansible, to perform tasks that would otherwise be typed by hand: pushing standard configurations, collecting show output from many devices, checking compliance or upgrading software. Automation provides speed and consistency, and it reduces human error, but a mistake in a script can spread to many devices quickly, so testing matters.",
   "Infrastructure as code (IaC) takes automation further by describing the desired state of the network in files, such as YAML variables and templates, that are stored in version control like Git. Changes are made by editing those files, reviewing them through pull requests, testing them automatically and then deploying them with tools. The files become the source of truth, you gain a full history of every change and the ability to roll back, and new sites can be built repeatably. Tools such as Ansible or Terraform apply the declared state.",
   "In summary, CLI offers control but not scale; cloud and controller platforms centralize management and visibility; automation adds speed and consistency; and infrastructure as code adds versioning, review and repeatability. A mature team uses automation and a controller or IaC for day-to-day changes and keeps CLI skills for troubleshooting."
  ],
  "terms": [
   [
    "Configuration drift",
    "Devices gradually diverging from their intended or standard configuration over time."
   ],
   [
    "Cloud-managed networking",
    "Managing devices from a vendor-hosted cloud dashboard while data traffic stays local."
   ],
   [
    "Controller-based networking",
    "A central controller holds policy, configures devices and collects data, often exposing APIs."
   ],
   [
    "Infrastructure as code",
    "Defining network configuration in version-controlled files that tools apply automatically."
   ],
   [
    "Zero-touch provisioning",
    "A new device automatically obtains its configuration when connected, without manual setup."
   ]
  ],
  "example": "A company with 60 branches used to configure each switch by CLI, and an audit found SNMP and NTP settings differing across sites. It moves to templates stored in Git: an engineer changes the NTP servers in one YAML file, a colleague reviews the pull request, and Ansible applies the change to every branch, with the Git history recording exactly what changed and when.",
  "tip": "Match keywords: 'version control', 'source of truth' and 'pull request' mean infrastructure as code; 'web dashboard hosted by the vendor' means cloud-managed; 'intent' and 'northbound API' mean controller-based.",
  "check": [
   [
    "What are two drawbacks of device-by-device CLI management at scale?",
    "It is slow, and it is prone to human error and configuration drift, with limited change history."
   ],
   [
    "What does infrastructure as code add beyond basic automation scripts?",
    "The desired state lives in version-controlled files, giving review, change history, rollback and repeatable deployment."
   ],
   [
    "In a cloud-managed network, where does user data traffic usually flow?",
    "Locally through the site's network; only management and monitoring traffic goes to the cloud."
   ]
  ]
 },
 {
  "t": "Controller-based networking: management, control and data planes; northbound and southbound APIs",
  "body": [
   "To understand controller-based networking, you first need the idea of planes: the logical jobs a network device performs. Separating these jobs, and moving some of them to a central controller, is the core idea behind software-defined networking (SDN).",
   "The data plane, also called the forwarding plane, moves user traffic: it receives frames and packets, looks up where they go, applies features such as ACLs and NAT, and forwards them out an interface. It works at high speed, often in specialized hardware. The control plane builds the information the data plane uses. Routing protocols such as OSPF, spanning tree, ARP and the building of the MAC and routing tables are control plane functions. The management plane is how administrators and systems manage the device: SSH, SNMP, syslog, NTP configuration, and APIs. A simple test: if it forwards user traffic, it is data plane; if it decides how traffic should be forwarded, it is control plane; if it lets people or tools configure and monitor the device, it is management plane.",
   "In a traditional network, every device has its own control plane and management plane. Each router runs OSPF, each switch runs spanning tree, and each is configured separately. In a controller-based design, a central controller takes over management and some or all control-plane functions. The controller has a network-wide view, calculates policy or paths, and programs devices, which keep doing the data-plane forwarding. In practice, most enterprise controllers such as Cisco Catalyst Center centralize management and policy while devices still run distributed routing protocols, whereas pure SDN designs like early OpenFlow deployments moved forwarding decisions themselves to the controller.",
   "The controller communicates in two directions, described with the controller drawn in the middle. Southbound interfaces (SBIs) connect the controller down to network devices, to push configuration and collect state. Examples include NETCONF, RESTCONF, OpenFlow, gRPC, and also traditional SSH, CLI and SNMP. Northbound interfaces (NBIs) connect the controller up to applications, scripts, orchestration and IT systems, which use them to request changes and read data. Northbound APIs are usually REST APIs: HTTP-based, using verbs such as GET, POST, PUT and DELETE, and exchanging data usually encoded as JSON.",
   "Cisco's campus fabric, SD-Access, illustrates the model. It separates an underlay, the physical network of switches and IP routing that provides reachability, from an overlay, virtual tunnels (VXLAN) built on top that carry user traffic and enforce segmentation. Catalyst Center automates and manages it, while policy is enforced with identity-based groups.",
   "Benefits of controller-based networking include centralized, consistent configuration; network-wide visibility and assurance; faster deployment; policy expressed as intent; and APIs that let other systems automate the network. The trade-off is dependence on the controller, which must itself be highly available and secured."
  ],
  "terms": [
   [
    "Data plane",
    "The functions that forward user traffic through a device."
   ],
   [
    "Control plane",
    "The functions that decide how traffic is forwarded, such as routing protocols, STP and ARP."
   ],
   [
    "Management plane",
    "The functions used to configure and monitor a device, such as SSH, SNMP and APIs."
   ],
   [
    "Southbound API",
    "Interface between a controller and network devices, such as NETCONF, RESTCONF or OpenFlow."
   ],
   [
    "Northbound API",
    "Interface between a controller and applications or scripts, typically a REST API using JSON."
   ]
  ],
  "example": "A security team's ticketing system detects an infected laptop and calls the campus controller's northbound REST API with a POST request to quarantine that endpoint. The controller then uses its southbound connections to the access switches to apply the quarantine policy. Neither the security analyst nor the network engineer logs in to a switch.",
  "tip": "Northbound is controller to applications (usually REST and JSON); southbound is controller to devices (NETCONF, RESTCONF, OpenFlow, SSH, SNMP). OSPF and STP are control plane; forwarding a frame is data plane; SSH is management plane.",
  "check": [
   [
    "Is building the OSPF routing table a control, data or management plane function?",
    "Control plane."
   ],
   [
    "A Python script retrieves a device list from a controller over HTTPS with JSON. Which interface is it using?",
    "A northbound API (typically REST)."
   ],
   [
    "Name two southbound protocols a controller might use.",
    "Any two of NETCONF, RESTCONF, OpenFlow, gRPC, SSH/CLI or SNMP."
   ]
  ]
 },
 {
  "t": "SNMP: manager, agent, MIB, get/set/trap/inform, v2c communities vs v3 security levels",
  "body": [
   "Simple Network Management Protocol (SNMP) is the long-standing standard for monitoring network devices. It lets a central monitoring system read values such as interface counters, CPU load and temperature, receive alerts when something happens, and, when permitted, change settings. Even as streaming telemetry grows, SNMP remains everywhere, and the CCNA tests its components, message types and versions.",
   "There are three components. The SNMP manager is the network management station (NMS) software that collects and displays data. The SNMP agent is software on each managed device that answers the manager and sends alerts. The MIB (management information base) is the structured collection of variables the agent exposes, organized as a tree. Each variable is identified by an OID (object identifier), a dotted string of numbers such as the one for an interface's input octets. Standard MIBs cover common data, and vendors publish their own for device-specific values.",
   "Message types determine who talks and why. Get requests the value of one or more OIDs; GetNext walks to the next OID in the tree; GetBulk (added in v2c) retrieves many values efficiently. Set changes a value on the agent, for example to shut an interface, which is why write access must be tightly controlled. A trap is an unsolicited alert sent from the agent to the manager, such as 'link down', and is not acknowledged, so it can be lost. An inform is like a trap but the manager acknowledges it, and the agent resends it if no acknowledgment arrives, making it more reliable. Agents listen on UDP port 161; managers receive traps and informs on UDP port 162.",
   "SNMPv1 and v2c secure access only with community strings, which act like shared passwords: typically a read-only (RO) community and a read-write (RW) community. They are sent in clear text, so anyone capturing traffic can read them, and default communities such as 'public' and 'private' are a well-known weakness. On IOS: `snmp-server community N0tPublic RO 10` allows read-only access from sources permitted by ACL 10, and `snmp-server host 10.1.1.5 version 2c N0tPublic` sends traps.",
   "SNMPv3 adds real security with users and groups, and three security levels. noAuthNoPriv authenticates with a username only and does not encrypt. authNoPriv authenticates messages with a hash such as SHA, so they cannot be forged or altered, but does not encrypt. authPriv adds encryption such as AES, so contents are confidential. authPriv is the recommended level.",
   "```text\nsnmp-server group NMS-GROUP v3 priv\nsnmp-server user nmsuser NMS-GROUP v3 auth sha AuthPass123 priv aes 128 PrivPass123\nsnmp-server host 10.1.1.5 version 3 priv nmsuser\n```",
   "Verify with `show snmp`, `show snmp user` and `show snmp group`. Security practice is to use SNMPv3 authPriv, avoid RW access unless needed, restrict which hosts may query with an ACL, and never leave default community strings configured."
  ],
  "terms": [
   [
    "SNMP manager / agent",
    "The monitoring station that polls and receives alerts, and the device software that responds and sends them."
   ],
   [
    "MIB / OID",
    "The tree of manageable variables on a device, and the numeric identifier of each variable."
   ],
   [
    "Trap vs inform",
    "Both are agent-initiated alerts; a trap is unacknowledged, an inform is acknowledged and retransmitted if needed."
   ],
   [
    "Community string",
    "The clear-text shared password used by SNMPv1 and v2c for read-only or read-write access."
   ],
   [
    "authPriv",
    "The SNMPv3 security level with both authentication and encryption."
   ]
  ],
  "example": "A network monitoring system polls each switch every five minutes with GetBulk to graph interface utilization. When an uplink fails, the switch immediately sends an SNMPv3 inform to the NMS on UDP 162; the NMS acknowledges it and pages the on-call engineer. The old v2c 'public' community found during an audit is removed.",
  "tip": "Traps are not acknowledged; informs are. For security levels, remember the order: noAuthNoPriv, authNoPriv, authPriv, and that only authPriv encrypts.",
  "check": [
   [
    "Which SNMP message lets an agent alert the manager and ensures delivery with an acknowledgment?",
    "Inform."
   ],
   [
    "What is the main security weakness of SNMPv2c?",
    "Community strings are sent in clear text and provide no per-user authentication or encryption."
   ],
   [
    "Which SNMPv3 security level provides authentication but not encryption?",
    "authNoPriv."
   ]
  ]
 },
 {
  "t": "Configuration management with Ansible: agentless, SSH, YAML playbooks, inventory, idempotency",
  "body": [
   "Ansible is an open-source automation tool widely used to configure network devices and servers. It lets you describe what you want done in readable files and apply it to many devices at once, which makes configuration faster, more consistent and repeatable. The CCNA focuses on how Ansible works and how it compares with other configuration management tools.",
   "Ansible is agentless. You install it on one control node, a Linux or macOS machine, and nothing needs to be installed on the managed devices. For network devices it connects using SSH to the CLI, or uses APIs such as NETCONF where supported, which fits routers and switches well because you usually cannot install agents on them. Ansible uses a push model: the control node initiates connections and pushes changes when you run it. By contrast, Puppet and Chef traditionally rely on agents installed on managed nodes that pull their configuration from a central server.",
   "The inventory lists the devices Ansible manages and organizes them into groups, such as `[core]` and `[access]`, in INI or YAML format. It can also hold variables such as the connection type and platform, for example `ansible_network_os=cisco.ios.ios` and `ansible_connection=ansible.netcommon.network_cli`. Credentials should be kept in encrypted form, such as with Ansible Vault, not in plain text.",
   "Playbooks describe the work, written in YAML (YAML Ain't Markup Language), a human-readable data format where indentation defines structure. A playbook contains one or more plays; each play targets hosts from the inventory and lists tasks; each task calls a module, a unit of code that performs one job, such as `cisco.ios.ios_config` to apply configuration lines or `cisco.ios.ios_command` to run show commands. Templates written in Jinja2 can generate device-specific configuration from variables.",
   "```yaml\n- name: Standard NTP on access switches\n  hosts: access\n  gather_facts: false\n  tasks:\n    - name: Configure NTP servers\n      cisco.ios.ios_config:\n        lines:\n          - ntp server 10.1.1.123\n          - ntp server 10.1.2.123\n```",
   "Idempotency is a key concept: running the same playbook many times produces the same end state, and makes changes only where the device does not already match. If NTP is already configured correctly, the task reports 'ok' and changes nothing; if it differs, it reports 'changed'. This lets you safely rerun playbooks to enforce a standard and correct drift. You run a playbook with `ansible-playbook -i inventory.yml ntp.yml`, and the `--check` option performs a dry run that reports what would change without changing it.",
   "Ansible fits naturally with infrastructure as code: inventories, variables, templates and playbooks live in Git, changes are reviewed, and a pipeline or scheduled job applies them."
  ],
  "terms": [
   [
    "Agentless",
    "Requiring no software on managed devices; Ansible connects over SSH or APIs from a control node."
   ],
   [
    "Inventory",
    "The file listing managed hosts, their groups and variables."
   ],
   [
    "Playbook",
    "A YAML file containing plays, each with tasks that call modules against inventory hosts."
   ],
   [
    "Module",
    "A reusable unit of code that performs one task, such as applying IOS configuration lines."
   ],
   [
    "Idempotency",
    "The property that repeated runs produce the same end state and change only what differs."
   ]
  ],
  "example": "A team must ensure every one of its 120 access switches has the same banner and NTP servers. It writes a playbook targeting the `access` group and runs it with `--check` to preview changes: 17 switches would change. After the real run, rerunning the playbook reports 'ok' for all 120 and 'changed' for none, proving the configuration is consistent.",
  "tip": "Ansible: agentless, push, SSH, YAML. Puppet and Chef: agent-based, pull. An exam question describing no software on managed devices points to Ansible.",
  "check": [
   [
    "Why does Ansible suit network devices that cannot run extra software?",
    "It is agentless; it connects from the control node over SSH or device APIs, so nothing is installed on the managed devices."
   ],
   [
    "What does idempotency mean for an Ansible playbook?",
    "Running it repeatedly results in the same state, with changes made only where a device does not already match."
   ],
   [
    "What file tells Ansible which devices to manage and how they are grouped?",
    "The inventory."
   ]
  ]
 },
 {
  "t": "Syslog: message format, severity levels 0–7, facilities, logging to a server",
  "body": [
   "Syslog is the standard way network devices report events: an interface going down, a configuration change, a failed login, an OSPF neighbour change. Messages can be shown on the console, kept in a memory buffer, or sent to a central syslog server where they are stored, searched and correlated. Central logging is essential for troubleshooting and security investigations, because device buffers are small and are lost on reload.",
   "A Cisco syslog message has a recognizable structure: an optional sequence number, a timestamp, and then `%FACILITY-SEVERITY-MNEMONIC: description`. For example, `*Mar 1 10:15:32.117: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down`. Here LINEPROTO is the facility (the part of the system that generated the message), 5 is the severity, UPDOWN is the mnemonic identifying the message type, and the rest describes the event. Timestamps come from the device clock, so NTP and `service timestamps log datetime msec` are needed for useful times.",
   "There are eight severity levels, and lower numbers are more severe. 0 Emergency: the system is unusable. 1 Alert: immediate action needed. 2 Critical: critical conditions. 3 Error: error conditions. 4 Warning: warning conditions. 5 Notification: normal but significant conditions, such as interface up and down. 6 Informational: informational messages, such as ACL hits. 7 Debugging: output from debug commands. A common memory aid is 'Every Awesome Cisco Engineer Will Need Ice cream Daily'.",
   "When you set a logging level, the device sends messages at that level and every more severe level, meaning lower numbers. `logging trap warnings` (or `logging trap 4`) sends levels 0 to 4 to the syslog server. Setting level 7 sends everything, which can be very noisy.",
   "Destinations are configured separately. `logging console` controls messages on the console, `logging monitor` controls messages to VTY (SSH) sessions, which you must also enable in the session with `terminal monitor`, and `logging buffered 16384 informational` keeps messages in RAM for viewing with `show logging`. To send to a server, use `logging host 10.1.1.5` and set the level with `logging trap`. Syslog traditionally uses UDP port 514, which is unreliable and unencrypted, so critical environments may use TCP or TLS-based transport where supported.",
   "The syslog facility is also a label on messages sent to a server, used by the server to sort messages from different sources, with values such as local0 through local7. Cisco devices use local7 by default, changeable with `logging facility local5`. Note that this server-side facility is different from the Cisco message facility such as LINEPROTO shown in the message text.",
   "Verify with `show logging`, which displays the configured destinations, levels, message counts and the contents of the buffer."
  ],
  "terms": [
   [
    "Syslog severity",
    "A level from 0 (emergency, most severe) to 7 (debugging, least severe)."
   ],
   [
    "Mnemonic",
    "The short code in a Cisco log message identifying the specific event, such as UPDOWN."
   ],
   [
    "logging trap",
    "IOS command that sets the severity level of messages sent to syslog servers."
   ],
   [
    "logging host",
    "IOS command that specifies a syslog server to receive messages."
   ],
   [
    "terminal monitor",
    "Session command that displays log messages in the current SSH or Telnet session."
   ]
  ],
  "example": "A security team wants all warnings and more severe events from every router in its central log platform. Each router gets `logging host 10.1.1.5`, `logging trap warnings` and `service timestamps log datetime msec`. When an engineer is connected over SSH and wants to see messages live while troubleshooting, she types `terminal monitor`.",
  "tip": "Setting a level includes all lower-numbered, more severe levels. If a question sets logging trap 3, the server receives levels 0 through 3 but not warnings (4) or notifications (5).",
  "check": [
   [
    "In %OSPF-5-ADJCHG, what are the facility, severity and mnemonic?",
    "Facility OSPF, severity 5 (notification), mnemonic ADJCHG."
   ],
   [
    "Which severity levels are sent with logging trap informational?",
    "Levels 0 through 6; only debugging (7) is excluded."
   ],
   [
    "You are connected by SSH and see no log messages. What command displays them in your session?",
    "terminal monitor (with logging monitor enabled at a suitable level)."
   ]
  ]
 },
 {
  "t": "Telemetry and AIOps: streaming telemetry vs polling, baselines and event correlation",
  "body": [
   "Monitoring tells you what a network is doing. The traditional method is polling: a monitoring system such as an SNMP manager asks each device for values at an interval, often every few minutes. Polling is simple and universal, but it has limits. Anything that happens between polls is averaged away or missed entirely, such as a 20-second traffic burst. Increasing the polling frequency across thousands of devices adds load on both the collector and the devices, because each request must be processed.",
   "Streaming telemetry reverses the direction. Instead of the collector asking, the device pushes data continuously to a collector, following a subscription. Subscriptions can be periodic, sending a set of values every few seconds, or on-change, sending an update only when something changes, such as an interface state or a routing neighbour. Model-driven telemetry describes the data with YANG models, a standard way of structuring device data, and typically transports it with protocols such as gRPC or gNMI, or over NETCONF, encoded efficiently. The result is near real-time, fine-grained data with less overhead than intensive polling, which is what AI-driven analysis needs.",
   "AIOps (artificial intelligence for IT operations) applies machine learning and analytics to that operational data: telemetry, logs, events, flow records and tickets. Its goals are to detect problems earlier, reduce alert noise and find root causes faster.",
   "Baselines are central. Rather than a static threshold such as 'alert at 80 percent utilization', an AIOps platform learns what normal looks like for each metric on each device, including daily and weekly patterns. It then flags deviations from that dynamic baseline. A link at 70 percent on a Monday morning may be normal; the same link at 70 percent at 3 a.m. may be an anomaly worth investigating.",
   "Event correlation addresses alert storms. When a core switch fails, hundreds of downstream devices may report interface down, OSPF neighbour loss, unreachable hosts and failed application checks. Without correlation, engineers see hundreds of unrelated alerts. Correlation groups related events by time, topology and dependencies, identifies the probable root cause, the core switch, and presents it as one incident with the downstream symptoms attached. This reduces noise and shortens the time to identify and repair the problem.",
   "AIOps platforms may then suggest or, with guardrails and approval, trigger remediation, and a generative AI assistant may summarize the incident. The foundation remains good data: accurate timestamps from NTP, consistent logging and telemetry from every device, and an accurate topology."
  ],
  "terms": [
   [
    "Polling",
    "A collector periodically requesting data from devices, as with SNMP Get."
   ],
   [
    "Streaming telemetry",
    "Devices pushing data to a collector continuously according to a subscription."
   ],
   [
    "On-change subscription",
    "A telemetry subscription that sends data only when a value changes."
   ],
   [
    "Baseline",
    "A learned model of normal behaviour for a metric, used to detect anomalies."
   ],
   [
    "Event correlation",
    "Grouping related alerts by time, topology and dependencies to identify a single root cause."
   ]
  ],
  "example": "A data center switch streams interface counters every 10 seconds. Five-minute SNMP polls had shown uplinks at 40 percent, but telemetry reveals short microbursts at full line rate causing drops. Later, when a spine switch reboots, the AIOps platform correlates 300 alerts from leaves and servers into one incident titled 'spine-2 unreachable'.",
  "tip": "Polling is pull (the collector asks at intervals); streaming telemetry is push (the device sends by subscription). Event correlation is about reducing many related alerts to one root cause.",
  "check": [
   [
    "Why might five-minute SNMP polling miss a problem that streaming telemetry catches?",
    "Polling averages over the interval and misses short events such as microbursts, while telemetry pushes fine-grained data frequently or on change."
   ],
   [
    "What is the benefit of a dynamic baseline over a static threshold?",
    "It learns normal patterns by time and device, so it flags truly unusual behaviour and avoids false alarms during expected peaks."
   ],
   [
    "What problem does event correlation solve?",
    "Alert storms, by grouping many related alerts into one incident and identifying the probable root cause."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
