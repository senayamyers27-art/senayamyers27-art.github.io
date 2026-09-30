/* Lessons for Cisco CCNA (200-301 v2.0): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ccna", [
 {
  "t": "Diagnose interface and cable issues (copper and fiber): collisions, CRC/input errors, duplex and speed mismatch, distance limits, cable types",
  "body": [
   "Most network problems that look mysterious turn out to be physical: a bad cable, a connector that is not seated, a fiber run that is too long, the wrong transceiver, or two ends of a link that disagree about speed or duplex. Cisco expects you to read interface status lines and error counters and work out which of these is happening. Fixing the physical layer first saves hours of chasing routing or VLAN (virtual LAN) problems that are not really there, because nothing above Layer 1 can work reliably on a link that is corrupting frames.",
   "Start with `show interfaces` on a switch or router. The first line gives two states: the interface (Layer 1) and the line protocol (Layer 2). 'up/up' is healthy. 'administratively down/down' means someone typed `shutdown`, and `no shutdown` fixes it. 'down/down' usually means no cable, a dead far end, a bad cable or a speed mismatch. 'up/down' points to a Layer 2 problem such as a keepalive or encapsulation mismatch on a serial link. On a switch, `show interfaces status` gives a one-line summary of every port with its VLAN, duplex, speed and a status such as 'connected', 'notconnect' or 'err-disabled'. Lines beginning `a-full` or `a-100` show values that were autonegotiated rather than hard-coded.",
   "Next read the counters. Input errors is a total of several receive problems. CRC (cyclic redundancy check) errors mean frames arrived whose frame check sequence did not match the contents, which usually means electrical noise, a damaged cable, a dirty fiber connector or being the full-duplex side of a duplex mismatch. Runts are frames smaller than 64 bytes and giants are larger than the maximum frame size; both suggest collisions, a faulty NIC (network interface card) or an MTU mismatch. Collisions are normal only on half-duplex links. Late collisions, detected after the first 64 bytes have been sent, are the classic sign of a duplex mismatch or a cable that exceeds the length limit. On the output side, output drops usually mean congestion rather than a cabling fault.",
   "A duplex mismatch happens when one side runs full duplex and the other half. The half-duplex side sees the full-duplex side transmitting while it is sending, so it records collisions and late collisions; the full-duplex side records CRC errors and runts because the half-duplex side aborts frames midway. The link stays up but is slow and lossy. The usual cause is one side hard-coded with `speed 100` and `duplex full` while the other autonegotiates. The autonegotiating side can still sense the speed, but without negotiation it falls back to half duplex at 10 or 100 Mbps. A speed mismatch is different: the link usually just stays down. The fix is to set both ends to `speed auto` and `duplex auto`, or hard-code both identically.",
   "Know the cable types and limits. Unshielded twisted pair (UTP) copper such as Category 5e and Category 6 supports Ethernet up to 100 metres per segment. Straight-through cables connect unlike devices (PC to switch) and crossover cables historically connected like devices (switch to switch), but Auto-MDIX (automatic medium-dependent interface crossover) on modern ports detects and adjusts for either. Fiber comes as multimode, with a wider core and cheaper light sources for shorter runs inside buildings and campuses, and single-mode, with a narrow core and laser light for many kilometres. Both ends must use transceivers that match the fiber type and wavelength. Fiber is immune to electromagnetic interference (EMI), so it suits runs near motors, fluorescent ballasts or between buildings where differences in ground potential can damage copper.",
   "Consider a worked example. Users on the third floor say file transfers crawl. On the access switch uplink, `show interfaces` shows `Full-duplex, 100Mb/s` and a growing number of CRC errors and runts. On the distribution switch end you find `Half-duplex, 100Mb/s` with thousands of late collisions. The pattern tells you it is a duplex mismatch and which side is which. `show running-config interface` on the access switch shows hard-coded `speed 100` and `duplex full` from an old change. You set both ends to auto, run `clear counters`, wait, and confirm the counters stay at zero and both ends show `a-full` and `a-1000`.",
   "Common mistakes: blaming a speed mismatch for errors on a link that is up (speed mismatches usually keep the link down); assuming collisions are always bad when they are normal on a genuinely half-duplex segment; reading counters without clearing them, so an old burst of errors looks like a current problem; forgetting that a mismatched multimode and single-mode pairing or a dirty connector produces CRC errors just like damaged copper; and swapping configuration before checking the cable. Work bottom up: reseat or swap the cable, try another port, check the transceiver and fiber type, verify the run length, then compare speed and duplex on both ends.",
   "Exam questions usually show counters or status output and ask for the cause. 'Late collisions' plus 'half-duplex' points to a duplex mismatch or an over-length cable. 'CRC errors with no collisions' on a full-duplex link points to cabling, EMI or the full-duplex side of a mismatch. 'Down/down' after a new cable points to cabling or a speed mismatch; 'administratively down' points to `shutdown`. 'Long distance between buildings' or 'kilometres' points to single-mode fiber, and 'near heavy machinery' points to fiber in general."
  ],
  "terms": [
   [
    "CRC error",
    "A received frame whose frame check sequence does not match its contents, usually caused by noise, a damaged cable or connector, or a duplex mismatch."
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
    "Runt and giant",
    "A runt is a frame smaller than 64 bytes; a giant is larger than the maximum allowed frame size."
   ],
   [
    "Auto-MDIX",
    "A port feature that detects whether a straight-through or crossover cable is attached and adjusts transmit and receive pairs automatically."
   ],
   [
    "Multimode vs single-mode fiber",
    "Multimode has a wider core for shorter runs; single-mode has a narrow core and laser light for long distances."
   ],
   [
    "Autonegotiation",
    "The process by which two Ethernet ports agree on the best common speed and duplex."
   ]
  ],
  "example": "A warehouse link between two buildings keeps logging CRC errors and dropping during storms. The run is 140 metres of Category 6 copper along a steel wall near large motors. It exceeds the 100-metre limit and is exposed to EMI. The team replaces it with multimode fiber and matching SFP transceivers at both ends, clears the counters, and the errors stop.",
  "tip": "Collisions and late collisions show up on the half-duplex side; CRC errors and runts show up on the full-duplex side. A speed mismatch usually brings the link down, while a duplex mismatch leaves it up but slow and error-prone.",
  "check": [
   [
    "An interface shows 'up/up' with a rising number of CRC errors and no collisions. What are the most likely causes?",
    "A damaged or noisy cable or connector, electromagnetic interference, or being the full-duplex side of a duplex mismatch. Check the cabling and compare duplex on both ends."
   ],
   [
    "What is the maximum segment length for twisted-pair Ethernet, and what should you use for longer or electrically noisy runs?",
    "100 metres. For longer runs or noisy environments use fiber: multimode for shorter in-building runs, single-mode for long distances."
   ],
   [
    "Why does hard-coding one side of a link to full duplex often cause a mismatch?",
    "Hard-coding disables autonegotiation on that side, so the other side cannot negotiate duplex and falls back to half duplex at 10 or 100 Mbps."
   ],
   [
    "A port shows 'administratively down'. What does that mean and how do you fix it?",
    "The interface was disabled with the shutdown command; enter interface configuration mode and issue no shutdown."
   ]
  ]
 },
 {
  "t": "Hypervisors (type 1 vs type 2), virtual machines and containers",
  "body": [
   "Modern data centers rarely run one operating system per physical server. Instead, a hypervisor lets one physical host run many isolated virtual machines (VMs), each believing it has its own CPU, memory, disk and network card. This matters to network engineers because those VMs still need VLANs (virtual LANs), IP addresses and security policy, and a lot of switching now happens inside the server in software. Understanding the layers helps you configure the physical switch port a host plugs into and explain where a packet actually travels.",
   "A hypervisor is the software layer that creates and runs VMs and shares the physical hardware among them. A type 1 hypervisor, also called bare-metal, installs directly on the server hardware with no general-purpose operating system underneath. Examples include VMware ESXi, Microsoft Hyper-V and KVM (Kernel-based Virtual Machine). Type 1 is what you find in data centers and public clouds because it is efficient and stable. A type 2 hypervisor, also called hosted, runs as an application on top of a normal operating system such as Windows, macOS or Linux desktop. Oracle VirtualBox and VMware Workstation are examples. Type 2 is convenient for labs, training and desktop testing, but it adds overhead because hardware access passes through the host OS.",
   "Each VM contains a full guest operating system with its own kernel, libraries and applications. It connects to the network through a virtual NIC (vNIC) that plugs into a virtual switch (vSwitch) inside the hypervisor. The vSwitch forwards frames between VMs on the same host without them ever touching a physical cable, and it uplinks through the server's physical NICs to the real network. Those uplinks are usually 802.1Q trunks so different VMs can sit in different VLANs. That is why a server-facing switch port is frequently configured as a trunk rather than an access port, often with two NICs to two switches for redundancy.",
   "Containers take a lighter approach. Instead of virtualizing hardware, a container engine such as Docker shares the host's operating system kernel and packages only the application and its libraries. Containers start in seconds, use far less memory and disk than VMs, and many more can run on one host. The trade-off is weaker isolation: every container on a host shares one kernel, and a container must be built for that kernel type, so Linux containers need a Linux kernel. Orchestration platforms such as Kubernetes schedule, scale and connect large numbers of containers across many hosts.",
   "Keep the layers straight, because the exam often asks you to place them. Physical hardware sits at the bottom. With type 1, the hypervisor runs directly on it and each VM runs its own guest OS. With type 2, a host OS runs on the hardware, the hypervisor runs as an application on that OS, and VMs run above it. With containers, a single host OS runs a container engine and isolated application packages share its kernel. Virtualization brings benefits the exam likes: better hardware utilization, faster provisioning from templates, snapshots before risky changes, and live migration of running VMs between hosts for maintenance.",
   "Consider a worked example. A company replaces twelve lightly used physical servers with two hosts running a type 1 hypervisor. Each host has two physical NICs, one to each of two access switches. Those switch ports are configured with `switchport mode trunk` and `switchport trunk allowed vlan 10,20,30`, and the vSwitch places each VM's vNIC in VLAN 10, 20 or 30. Two VMs in VLAN 20 on the same host talk through the vSwitch without leaving the server. Meanwhile, a developer tests the web application on her laptop in containers, and later the operations team runs those same container images on Linux hosts in the data center.",
   "Common mistakes: calling Hyper-V or ESXi type 2 because you see a management console on a desktop (the hypervisor itself is bare-metal); thinking containers each carry their own kernel; assuming a Windows container runs natively on a Linux kernel; configuring a server-facing port as an access port and then wondering why only one VLAN of VMs works; and forgetting that VM-to-VM traffic on one host may never appear on the physical switch, which matters for monitoring and security policy.",
   "Exam questions use clear clue words. 'Bare metal', 'installed directly on hardware' or 'data center' point to type 1. 'Runs on top of an existing operating system' or 'desktop lab software' points to type 2. 'Shares the host kernel', 'lightweight', 'starts in seconds' or 'packages the app and its dependencies' points to containers. 'Each instance has its own operating system' points to VMs. 'Software switch inside the host' is a vSwitch, and 'the host uplink carries several VLANs' means an 802.1Q trunk."
  ],
  "terms": [
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor installed directly on server hardware, such as ESXi, Hyper-V or KVM."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on a desktop operating system, such as VirtualBox or VMware Workstation."
   ],
   [
    "Virtual machine (VM)",
    "A software-defined computer with its own guest operating system and kernel, running on a hypervisor."
   ],
   [
    "Container",
    "An isolated application package that shares the host operating system kernel instead of running its own OS."
   ],
   [
    "Virtual switch (vSwitch)",
    "Software inside a hypervisor that switches traffic between VM virtual NICs and the host's physical NICs."
   ],
   [
    "Guest OS",
    "The operating system installed inside a virtual machine."
   ],
   [
    "Orchestration",
    "Automated scheduling, scaling and networking of many containers across hosts, as Kubernetes does."
   ]
  ],
  "example": "A hospital's server team consolidates its file, print and directory servers onto a pair of type 1 hypervisor hosts. The network team configures each host-facing switch port as an 802.1Q trunk carrying the server, management and backup VLANs. Before patching a VM, the server team takes a snapshot, and during hardware maintenance they migrate running VMs to the other host so users notice nothing.",
  "tip": "'Bare metal' means type 1; 'runs on top of an existing OS' means type 2. If a question stresses sharing the host kernel and fast, lightweight startup, the answer is containers, not VMs.",
  "check": [
   [
    "Which hypervisor type would you expect on a production data-center server, and why?",
    "Type 1 (bare-metal), because it runs directly on the hardware with less overhead and fewer layers that can fail than a hosted type 2 hypervisor."
   ],
   [
    "What is the key architectural difference between a VM and a container?",
    "A VM includes its own full guest operating system and kernel; a container shares the host operating system's kernel and packages only the app and its dependencies."
   ],
   [
    "Why is a switch port connected to a virtualization host often configured as a trunk?",
    "Because VMs on that host belong to different VLANs, so the vSwitch uplink must carry tagged traffic for several VLANs."
   ],
   [
    "Two VMs in the same VLAN on the same host exchange traffic. Does it cross the physical switch?",
    "Usually not; the hypervisor's vSwitch forwards it internally, so it never appears on the physical network."
   ]
  ]
 },
 {
  "t": "Network topology architectures: two-tier, three-tier, spine-leaf, WAN, SOHO, on-premises vs cloud",
  "body": [
   "A topology architecture is the overall shape of a network: which devices connect to which, and what job each layer does. Choosing the right shape determines how well the network scales, how failures are contained and how predictable its performance is. The CCNA (Cisco Certified Network Associate) expects you to recognize the common designs from a description or diagram, name each layer's role, and say when each design fits.",
   "The classic campus design is three-tier. The access layer is where end devices plug in; it provides ports, Power over Ethernet (PoE), VLAN (virtual LAN) assignment and edge security such as port security and DHCP snooping. The distribution layer aggregates access switches, is often where routing between VLANs and policy happen, and provides redundancy through dual uplinks from every access switch. The core layer is a fast, simple backbone that connects distribution blocks and moves traffic between buildings or to the data center and WAN. The core should do as little processing as possible so it switches quickly and stays stable. Two-tier, or collapsed core, merges the core and distribution layers into one pair of switches. Smaller campuses use it because a separate core adds cost without benefit when there are only a few distribution blocks. As the campus grows, a dedicated core becomes worthwhile: without it, every distribution pair would need links to every other pair, and that mesh becomes expensive and hard to manage. The key idea is that the core exists to reduce the number of links and to scale.",
   "Data centers now favor spine-leaf. Every leaf switch connects to every spine switch; leaves never connect to each other and spines never connect to each other. Servers, storage, firewalls and routers attach to leaves. Any server reaches any other server on a different leaf in the same number of hops, leaf to spine to leaf, which gives consistent latency for the heavy east-west traffic between servers. To add bandwidth you add a spine; to add ports you add a leaf and cable it to every spine. Traffic entering or leaving the data center is called north-south.",
   "A WAN (wide area network) connects sites across distance using provider services such as MPLS (Multiprotocol Label Switching), Metro Ethernet, broadband internet with VPNs (virtual private networks), or cellular. WAN topologies include point-to-point, hub-and-spoke (branches connect through a central site), full mesh (every site connects to every other) and partial mesh. Branches may be single-homed or dual-homed to one or two providers for redundancy. A SOHO (small office/home office) network sits at the other extreme: one device usually combines router, switch, wireless access point and firewall, often with the modem, and uses NAT (network address translation) to share one public address.",
   "On-premises means you own and operate the hardware in your own facility: full control, but capital cost, space, power and staff to maintain it. Cloud means a provider runs the infrastructure and you consume it as a service, paying for what you use and scaling quickly. The standard service models are IaaS (infrastructure as a service: you manage the OS and up), PaaS (platform as a service: you manage the application and data) and SaaS (software as a service: you simply use the application). Many organizations run hybrid designs, connecting their campus to cloud resources over VPNs or dedicated private links.",
   "Consider a worked example. A school district with one building uses a collapsed core: two combined core and distribution switches with every access closet dual-homed to both. Its new data center uses four leaf switches and two spines. When a rack of servers arrives, the team adds a fifth leaf and cables it to both spines without touching the other leaves. The district's twenty small schools connect in a hub-and-spoke WAN to the main site over broadband VPNs, and the student information system is a SaaS product the district never patches.",
   "Common mistakes: connecting leaf to leaf or spine to spine in a spine-leaf diagram; placing end devices on the core; assuming the core should run heavy policy such as ACLs (access control lists); confusing north-south with east-west; and mixing up the cloud models.",
   "Exam wording is predictable: 'where users connect' is access, 'aggregates access switches and applies policy' is distribution, 'high-speed backbone' is core, 'core and distribution combined' is collapsed core, 'every leaf connects to every spine' or 'predictable east-west latency' is spine-leaf, 'branches connect through headquarters' is hub-and-spoke, and 'customer manages the operating system' is IaaS."
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
    "Hub-and-spoke",
    "A WAN topology where branch sites connect to a central site rather than directly to each other."
   ],
   [
    "SOHO",
    "Small office/home office: a small network usually served by one combined router, switch, access point and firewall."
   ],
   [
    "IaaS / PaaS / SaaS",
    "Cloud service models where the provider manages progressively more of the stack, from infrastructure up to the full application."
   ]
  ],
  "example": "A retail chain runs a three-tier campus at headquarters, with access switches in every wiring closet, a distribution pair per building and a core pair joining the buildings and the data center. Each store is a SOHO-style site with one integrated router and a VPN back to headquarters in a hub-and-spoke WAN. The data center uses spine-leaf, and email has moved to a SaaS provider.",
  "tip": "In spine-leaf, leaves never connect to each other and spines never connect to each other. Questions often show a diagram and ask which link violates the design, or ask why the design gives predictable latency.",
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
   ],
   [
    "Which campus layer should end devices connect to, and which layer should stay as simple and fast as possible?",
    "End devices connect to the access layer; the core layer should stay simple and fast."
   ]
  ]
 },
 {
  "t": "IPv4 addressing and subnetting, including VLSM and private (RFC 1918) ranges",
  "body": [
   "An IPv4 address is 32 bits written as four decimal octets, such as 192.168.10.37. The subnet mask says how many of those bits identify the network and how many identify the host. In prefix notation, /24 means the first 24 bits are network bits, which is the mask 255.255.255.0. Subnetting is the skill of borrowing host bits to make more, smaller networks. The CCNA expects you to do it quickly and accurately without a calculator, because subnetting steps hide inside routing, ACL (access control list) and troubleshooting questions.",
   "For any prefix, the number of host bits is 32 minus the prefix length. Usable hosts equal 2 to the power of the host bits, minus 2: one address is the network ID (all host bits 0) and one is the broadcast (all host bits 1). So /26 has 6 host bits, 64 addresses and 62 usable hosts. The block size, or increment, is 256 minus the mask value in the interesting octet, which is the octet where the mask is neither 255 nor 0. A /26 mask is 255.255.255.192, so the block size is 64 and subnets start at .0, .64, .128 and .192. The number of subnets created is 2 to the power of the bits you borrowed.",
   "To find the subnet an address belongs to, find the multiple of the block size at or below the address in the interesting octet. For 192.168.10.100/26, 100 falls between 64 and 128, so the network is 192.168.10.64, the broadcast is 192.168.10.127 (one less than the next subnet) and the usable range is .65 to .126. The same method works in any octet: for 10.20.37.5/20 the mask is 255.255.240.0, the block size in the third octet is 16, so the subnet is 10.20.32.0 and the broadcast is 10.20.47.255.",
   "```text\nPrefix  Mask             Block  Usable hosts\n/24     255.255.255.0    256    254\n/25     255.255.255.128  128    126\n/26     255.255.255.192  64     62\n/27     255.255.255.224  32     30\n/28     255.255.255.240  16     14\n/29     255.255.255.248  8      6\n/30     255.255.255.252  4      2\n```",
   "VLSM (variable-length subnet masking) means using different prefix lengths within the same address space so each subnet is sized for its need. The method is to sort requirements from largest to smallest and allocate each from the next free block boundary. Point-to-point router links commonly use /30, or /31, which IOS supports on point-to-point links and which has no network or broadcast address. RFC 1918 reserves three private ranges that are not routed on the internet: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. Organizations use them internally and translate to public addresses with NAT (network address translation) at the edge. Also know 127.0.0.0/8 for loopback and 169.254.0.0/16 for link-local APIPA (Automatic Private IP Addressing).",
   "Consider a worked example. You have 192.168.10.0/24 and need subnets for 60, 28 and 12 hosts plus one router link. Sixty hosts need 6 host bits, so /26 (62 usable) gives 192.168.10.0/26. Twenty-eight hosts need /27 (30 usable), giving 192.168.10.64/27. Twelve hosts need /28 (14 usable), giving 192.168.10.96/28. The router link needs /30, giving 192.168.10.112/30 with usable .113 and .114. Everything from .116 upward remains free for growth, and because you allocated largest first, every block starts on a multiple of its own size.",
   "Common mistakes: forgetting to subtract 2 for the network and broadcast addresses; choosing /27 for 30-plus hosts when 30 is the maximum usable; assigning a network ID or broadcast address to a host; allocating small subnets first and then finding a large block will not fit on a valid boundary; overlapping VLSM blocks; and treating all of 172.0.0.0 as private. Only 172.16.0.0 through 172.31.255.255 are private, so 172.32.1.1 is a public address. When you are unsure, write the interesting octet in binary and mark where the mask ends; the network bits never lie, and the check takes only a few seconds.",
   "Exam questions are worded in a few standard ways. 'Which subnet does this host belong to' or 'what is the broadcast address' is a block-size calculation. 'Smallest subnet' or 'most efficient mask for N hosts' means find the smallest power of two that is at least N plus 2. 'Minimum number of subnets with at least N hosts each' means balance borrowed bits against host bits. 'Private address' questions test the three RFC 1918 ranges, and 'point-to-point link with the fewest wasted addresses' points to /30 or /31."
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
    "Network ID",
    "The first address in a subnet, with all host bits set to 0, which identifies the subnet itself."
   ],
   [
    "Broadcast address",
    "The last address in a subnet, with all host bits set to 1, used to reach every host on that subnet."
   ],
   [
    "VLSM",
    "Variable-length subnet masking: using different prefix lengths within one address space to size each subnet to its need."
   ],
   [
    "RFC 1918",
    "The standard defining private IPv4 ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
   ]
  ],
  "example": "You are given 172.16.4.0/22 for a new building. You carve a /24 for each of three user floors (172.16.4.0, 172.16.5.0 and 172.16.6.0) and split 172.16.7.0/24 into smaller VLSM pieces: a /26 for printers, a /27 for cameras and several /30s for router links. Every block starts on a multiple of its own size, so none overlap.",
  "tip": "Watch for 172.x addresses: only 172.16 through 172.31 are private. An address like 172.32.1.1 is public, and questions use that to trap you. Also remember usable hosts is always 2 to the power of host bits minus 2.",
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
   ],
   [
    "Is 172.20.5.9 a private or public address?",
    "Private, because it falls within 172.16.0.0/12, which covers 172.16.0.0 through 172.31.255.255."
   ]
  ]
 },
 {
  "t": "Troubleshoot IPv4 addressing: wrong mask, gateway outside the subnet, duplicate addresses, APIPA",
  "body": [
   "When a host cannot reach something, its own IP settings are one of the first things to check. Four problems appear again and again on the CCNA: a wrong subnet mask, a default gateway that is not in the host's subnet, two devices using the same address, and a host that failed to get an address from DHCP (Dynamic Host Configuration Protocol) and gave itself an APIPA (Automatic Private IP Addressing) address. Each has a recognizable symptom pattern, so once you know the patterns you can diagnose them from a single output.",
   "Everything starts with how a host decides where to send a packet. It compares the destination with its own address and mask. If the destination is in the same subnet, the host uses ARP (Address Resolution Protocol) to find the destination's MAC address and sends directly. If not, it ARPs for the default gateway's MAC address and sends the frame to the router. A wrong mask or gateway breaks exactly this decision, which is why the symptoms are so specific.",
   "A wrong mask changes which destinations the host believes are local. If a host at 192.168.1.50 should be /24 but is configured /16, it thinks 192.168.5.10 is on its own network and ARPs for it instead of forwarding to the gateway. Nobody answers, so that traffic fails, while traffic to destinations outside 192.168.0.0/16 still works. A mask that is too long causes the opposite problem: the host treats genuinely local neighbours as remote and sends their traffic to the gateway, which may or may not route it back. Partial connectivity, where some addresses work and others do not, is a strong hint to check the mask.",
   "The default gateway must be an address in the host's own subnet, because the host reaches it by ARPing for it directly. If a host is 10.1.1.20/24 and its gateway is 10.1.2.1, it can talk to local devices but nothing off-subnet. The router side matters too: its interface, subinterface or SVI (switched virtual interface) must use an address and mask that match the hosts. Compare `ipconfig /all` on Windows with `show ip interface brief` and `show running-config interface g0/0` on the router.",
   "Duplicate addresses cause intermittent problems. Two devices answer ARP for the same IP, so other hosts and the router keep updating their ARP tables and traffic goes to one device, then the other. Windows usually warns about an address conflict, and IOS logs a duplicate address message when another device uses the router's own interface address. Use `show ip arp` on the router or `arp -a` on a host to see which MAC address currently owns the IP, then trace that MAC with `show mac address-table address <mac>` to the switch port. Excluding statically assigned addresses from DHCP pools with `ip dhcp excluded-address` prevents the server from handing them out. APIPA, by contrast, is what a DHCP client does when it gets no reply: it assigns itself an address from 169.254.0.0/16 with no gateway. That tells you the host never reached a DHCP server, so the cause lies on the path: a disconnected cable, a port in the wrong VLAN, a missing `ip helper-address` on the router, or a server that has run out of addresses.",
   "Consider a worked example. A user reports that email works but the internal wiki does not. `ipconfig` shows 10.10.20.35 with mask 255.0.0.0 and gateway 10.10.20.1. The wiki is at 10.10.40.8, which the PC now considers local, so it ARPs for it and gets no answer; email lives on an external server, so that traffic goes to the gateway and works. Correcting the mask to 255.255.255.0 sends wiki traffic to the gateway and the page loads. A good habit confirms the fix: ping the host's own address, then the gateway, then a remote address, then a name. Where the steps start failing tells you which layer or setting to inspect.",
   "Common mistakes: trying to fix a 169.254 address by typing a static address on the PC instead of finding why DHCP failed; assuming a gateway outside the subnet will work because the router is physically connected; checking only the host and not the router's interface mask; and forgetting that a duplicate IP produces intermittent rather than total failure. Another trap is thinking a wrong mask always breaks everything. It usually breaks only some destinations, which is exactly the clue.",
   "Exam questions describe symptoms and ask for the cause. 'Can reach local hosts but nothing remote' points to the gateway. 'Some remote subnets work and others do not' points to the mask. 'Connectivity comes and goes' or 'address conflict' points to a duplicate IP. '169.254.x.x' or 'no default gateway after DHCP' points to a DHCP failure, so pick the answer about VLAN, cabling, the helper address or the DHCP pool."
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
   ],
   [
    "Subnet mask",
    "The value that tells a host which part of an address is the network, and therefore which destinations are local."
   ],
   [
    "ip helper-address",
    "An IOS interface command that relays client DHCP broadcasts to a DHCP server on another subnet."
   ]
  ],
  "example": "After a switch replacement, every PC on the second floor shows a 169.254 address. The new switch has its user ports in VLAN 1 instead of VLAN 30, where the router subinterface with `ip helper-address` lives. Moving the ports into VLAN 30 lets the clients' DHCP discovers reach the relay, and they receive proper leases with a gateway within a minute.",
  "tip": "A 169.254.x.x address never means 'fix the PC's IP'; it means the DHCP exchange failed. Look for the answer about VLANs, cabling, the DHCP server or the helper address. Partial reachability points to the mask; local-only reachability points to the gateway.",
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
   ],
   [
    "A host's mask is too short, such as /16 instead of /24. Why do only some destinations fail?",
    "The host wrongly treats destinations inside the larger /16 as local and ARPs for them directly; destinations outside it still go to the gateway and work."
   ]
  ]
 },
 {
  "t": "IPv6 address types and prefixes: global unicast, unique local, link-local, multicast, anycast",
  "body": [
   "IPv6 addresses are 128 bits, written as eight groups (hextets) of four hexadecimal digits separated by colons, such as 2001:0db8:0000:0000:0000:0000:0000:0001. Two rules shorten them. Leading zeros in any group can be dropped, so 0db8 becomes db8 and 0010 becomes 10. One run of consecutive all-zero groups can be replaced by a double colon, so the address above becomes 2001:db8::1. You may use the double colon only once, otherwise nobody could tell how many zero groups each one stands for. When two runs of zeros exist, the convention is to compress the longest one.",
   "IPv6 has no broadcast. Instead it uses unicast (one to one), multicast (one to many) and anycast (one to nearest). The type is identified by the address's leading bits, and the CCNA expects you to recognize each by its prefix. Almost every LAN uses a /64 prefix, giving 64 bits for the network portion (the routing prefix plus a subnet ID) and 64 bits for the interface ID. Using /64 on LANs is also what makes SLAAC (stateless address autoconfiguration) work.",
   "Global unicast addresses (GUAs) are the IPv6 equivalent of public IPv4 addresses and are routable on the internet. They are currently allocated from 2000::/3, so they begin with 2 or 3. A typical GUA has a global routing prefix assigned by a provider or regional registry (often /48 for a site), a subnet ID the organization uses to number its subnets (the next 16 bits in a /48), and the 64-bit interface ID. The range 2001:db8::/32 is reserved for documentation, which is why examples use it.",
   "Unique local addresses (ULAs) are the rough equivalent of RFC 1918 private space. They come from fc00::/7, and in practice start with fd because the eighth bit is set to 1 for locally assigned prefixes, followed by a pseudo-random 40-bit global ID that makes collisions unlikely if two organizations later merge. ULAs are for internal use and are not routed on the internet. Link-local addresses come from fe80::/10 and exist automatically on every IPv6-enabled interface. They are valid only on the local link and are never forwarded by a router. Neighbor discovery, router advertisements and routing protocols use them, which is why `show ipv6 route` often lists next hops beginning FE80.",
   "Multicast addresses begin with ff, from ff00::/8. Know ff02::1 (all nodes on the link), ff02::2 (all routers on the link), ff02::5 and ff02::6 (OSPFv3 routers and designated routers), ff02::9 (RIPng routers) and the solicited-node multicast address ff02::1:ffxx:xxxx. That last one replaces ARP (Address Resolution Protocol) broadcasts: a host sends a neighbor solicitation only to nodes whose address ends in the same 24 bits, so other hosts never process it. Anycast is not a separate range. It is an ordinary unicast address configured on several devices, and routing delivers each packet to the nearest one; on IOS you add the `anycast` keyword to the `ipv6 address` command. It is commonly used for DNS (Domain Name System) resolvers. Finally, :: is the unspecified address a host uses before it has one, and ::1 is the loopback.",
   "Consider a worked example. On a router, `show ipv6 interface g0/0` lists a link-local address FE80::1, a global address 2001:DB8:ACAD:10::1/64, and joined groups FF02::1, FF02::2 and FF02::1:FF00:1. Reading it: FE80::1 was set manually to make it easy to recognize; the global address sits in subnet 10 of the 2001:db8:acad::/48 site; FF02::2 appears because the router has `ipv6 unicast-routing` enabled; and FF02::1:FF00:1 is the solicited-node group matching the last 24 bits of both addresses, which both end in ::1. Hosts on the LAN learn FE80::1 as their default gateway from the router's advertisements.",
   "Common mistakes: using the double colon twice; dropping trailing zeros instead of leading ones (db8 is correct, but 0010 shortens to 10, not 1); calling fd addresses link-local; expecting a router to forward a packet sourced from an fe80 address to another link; and looking for an anycast prefix. Another trap is thinking a link-local address is optional. Every IPv6 interface has one, even when no global address is configured.",
   "Exam questions usually give an address and ask its type, or describe a use and ask which type fits. Leading 2 or 3 means global unicast. FD or FC means unique local, the private equivalent. FE80 means link-local, used by neighbor discovery and as a routing next hop. FF means multicast, and FF02 means link-local scope. 'Same address on several servers, delivered to the nearest' means anycast. 'Replaces ARP' means neighbor solicitation to the solicited-node multicast address, and 'no broadcast in IPv6' is always true."
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
    "Multicast address",
    "An ff00::/8 address that delivers a packet to every interface that has joined the group."
   ],
   [
    "Solicited-node multicast",
    "An ff02::1:ff00:0/104 address derived from the last 24 bits of a unicast address, used for address resolution instead of broadcast."
   ],
   [
    "Anycast",
    "A unicast address assigned to multiple devices so that packets are routed to the nearest one."
   ],
   [
    "Interface ID",
    "The last 64 bits of a typical IPv6 address, identifying the interface within its /64 subnet."
   ]
  ],
  "example": "A company receives 2001:db8:5a00::/48 from its provider. It numbers VLAN 10 as 2001:db8:5a00:10::/64 and VLAN 20 as 2001:db8:5a00:20::/64, uses fd12:3456:789a::/48 for an isolated lab that must never reach the internet, and relies on the automatic fe80 addresses for OSPFv3 neighbor communication between its routers.",
  "tip": "Memorize the first characters: 2 or 3 is global unicast, FD is unique local, FE80 is link-local, FF is multicast. Anycast has no prefix of its own, which is a favourite trick question.",
  "check": [
   [
    "Compress 2001:0db8:0000:0010:0000:0000:0000:0001.",
    "2001:db8:0:10::1. Leading zeros are removed and the longest run of zero groups becomes the double colon."
   ],
   [
    "Which IPv6 address type does a router use as the next hop for a directly connected neighbor, and why?",
    "The neighbor's link-local (fe80::/10) address, because every IPv6 interface has one and routing protocols use it for neighbor communication."
   ],
   [
    "What replaces IPv4 broadcasts in IPv6 address resolution?",
    "Neighbor solicitation messages sent to the target's solicited-node multicast address, so only interested hosts process them."
   ],
   [
    "Which address type is the IPv6 equivalent of RFC 1918 private space?",
    "Unique local addresses from fc00::/7, which in practice begin with fd."
   ]
  ]
 },
 {
  "t": "IPv6 address configuration: static, EUI-64, SLAAC and RA messages; troubleshoot IPv6 addressing",
  "body": [
   "Once you know the address types, you need to know how an interface actually gets its IPv6 address. There are three main ways the CCNA tests: configure it statically, let the device build the interface ID with EUI-64 (extended unique identifier, 64-bit), or let hosts configure themselves with SLAAC (stateless address autoconfiguration) from router advertisements. DHCPv6 (Dynamic Host Configuration Protocol for IPv6), stateful or stateless, is a fourth option you should recognize.",
   "On a Cisco router, IPv6 routing must be enabled globally with `ipv6 unicast-routing`. Without it the router will not forward IPv6 packets between interfaces or send router advertisements. A static address is set with `ipv6 address 2001:db8:acad:1::1/64` on the interface. Adding any global address automatically enables IPv6 on that interface and creates a link-local address; you can instead set a memorable one with `ipv6 address fe80::1 link-local`, or enable only link-local with `ipv6 enable`. Unlike IPv4, an interface can hold several IPv6 addresses at once.",
   "EUI-64 lets you configure just the prefix and have the device build the 64-bit interface ID from its MAC address: `ipv6 address 2001:db8:acad:1::/64 eui-64`. The process takes the 48-bit MAC, splits it in half, inserts FFFE in the middle, and flips the seventh bit of the first byte (the universal/local bit). For MAC 0050.3e11.2233 the halves are 0050.3e and 11.2233; inserting FFFE gives 0050:3eff:fe11:2233; flipping the seventh bit changes 00 to 02, so the interface ID is 0250:3eff:fe11:2233, written 250:3eff:fe11:2233. Flipping means toggling: a first byte of 02 would become 00.",
   "SLAAC lets hosts configure themselves with no DHCP server. A router sends router advertisement (RA) messages, which are ICMPv6 (Internet Control Message Protocol for IPv6) messages, to ff02::1 periodically, and immediately in reply to a router solicitation (RS) that a host sends to ff02::2 when it starts. The RA carries the on-link prefix and length and comes from the router's link-local address, which the host uses as its default gateway. The host builds its own interface ID with EUI-64 or, more commonly on modern operating systems, a random value for privacy. Before using any address, the host runs duplicate address detection (DAD) by sending a neighbor solicitation for it; if nobody answers, the address is unique.",
   "RA flags tell hosts what else to do. With the M (managed address configuration) flag set, hosts use stateful DHCPv6 to get their address, much like DHCPv4. With the O (other configuration) flag set, hosts use SLAAC for the address but get extra information such as DNS (Domain Name System) servers from stateless DHCPv6. With neither, hosts rely on SLAAC and whatever the RA itself carries. Note that the default gateway always comes from the RA, never from DHCPv6. A router interface can itself use SLAAC with `ipv6 address autoconfig`, or be a DHCPv6 client with `ipv6 address dhcp`.",
   "Consider a worked example. A new IPv6 lab has routers configured with global addresses, yet PCs show only fe80 addresses. `show ipv6 interface brief` on the router looks correct, but `show running-config` reveals `ipv6 unicast-routing` was never entered, so the router sends no RAs. After adding it, the PCs receive RAs, build 2001:db8:acad:10:: addresses with SLAAC, and `ipconfig` shows the router's link-local address as the gateway. A second PC reports a DUPLICATE address in `show ipv6 interface` style output on a switch management interface: someone had statically given it the router's ::1 address, and DAD caught it.",
   "Common mistakes: forgetting `ipv6 unicast-routing`; using a prefix length other than /64 on a LAN, which breaks SLAAC; doing only one of the two EUI-64 steps; mistyping a prefix so the router and hosts sit in different subnets; expecting DHCPv6 to supply the gateway; and applying an ACL (access control list) that blocks ICMPv6, which silently breaks neighbor discovery. Verify with `show ipv6 interface brief`, `show ipv6 interface`, and on hosts `ipconfig`, `ifconfig` or `ip -6 addr`.",
   "Exam wording follows patterns. 'Only a link-local address' means no RA arrived, so check `ipv6 unicast-routing` or the router's presence. 'Insert FFFE and flip the seventh bit' is EUI-64. 'Host builds its own address from the router's prefix' is SLAAC. 'M flag' means stateful DHCPv6; 'O flag' means SLAAC plus stateless DHCPv6 for options. 'Host asks routers to advertise now' is an RS; 'checks that no one else uses the address' is DAD."
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
   ],
   [
    "Stateful DHCPv6",
    "A DHCPv6 mode, signalled by the RA M flag, in which a server assigns and tracks each host's address."
   ],
   [
    "ipv6 unicast-routing",
    "The global IOS command that enables IPv6 forwarding and router advertisements."
   ]
  ],
  "example": "A branch router interface is configured with `ipv6 address 2001:db8:77:5::/64 eui-64`. Its MAC is 00a0.c912.3456, so `show ipv6 interface brief` shows 2001:DB8:77:5:2A0:C9FF:FE12:3456. The PCs behind it use SLAAC from the router's RAs, and because the RA has the O flag set they also query a stateless DHCPv6 server for DNS server addresses.",
  "tip": "In EUI-64, remember both steps: insert FFFE in the middle and flip the seventh bit. Most wrong answer choices do only one of the two. A host with only an fe80 address is not receiving RAs.",
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
   ],
   [
    "Where does an IPv6 host learn its default gateway, even when it uses stateful DHCPv6?",
    "From router advertisements; the gateway is the router's link-local address, and DHCPv6 does not provide it."
   ]
  ]
 },
 {
  "t": "Wireless principles: 2.4, 5 and 6 GHz bands, non-overlapping channels, SSID, RF interference",
  "body": [
   "Wireless LANs (WLANs) based on the IEEE 802.11 standards send data over radio frequency (RF) instead of cables. Radio is a shared, half-duplex medium: every device on the same channel in the same area competes for airtime, and only one can transmit at a time. Wi-Fi uses CSMA/CA (carrier sense multiple access with collision avoidance), so stations listen and wait before sending rather than detecting collisions. That is why channel planning and interference control matter so much, and why the CCNA tests bands, channels and naming terms.",
   "Wi-Fi uses three unlicensed bands. The 2.4 GHz band has the longest range and best penetration through walls, but it is crowded and narrow. Its channels are 5 MHz apart while each transmission is about 20 MHz wide, so neighbouring channels overlap. In most regions, including North America, the only three non-overlapping channels are 1, 6 and 11, and a good design gives neighbouring access points (APs) different ones of those three. The band is also shared with Bluetooth, microwave ovens, cordless phones and other devices, so non-Wi-Fi interference is common there.",
   "The 5 GHz band offers many more non-overlapping 20 MHz channels, making co-channel interference easier to avoid, and supports channel bonding into 40, 80 or 160 MHz channels for higher throughput. The trade-off is shorter range and weaker penetration. Some 5 GHz channels require dynamic frequency selection (DFS): the AP must leave a channel if it detects radar. The 6 GHz band, opened for Wi-Fi 6E and later, adds a large block of clean spectrum with many wide channels and no legacy devices, but has shorter range still and only newer clients can use it. Networks in 6 GHz must use WPA3 (Wi-Fi Protected Access 3) or Enhanced Open; WPA2 is not allowed there.",
   "Several names describe WLAN structure. The SSID (service set identifier) is the human-readable network name clients see. A BSS (basic service set) is one AP and its associated clients, identified by the BSSID (basic service set identifier), which is the AP radio's MAC address; the area it covers is the basic service area, or cell. An ESS (extended service set) is multiple APs sharing the same SSID, connected by a wired distribution system, so clients can roam between them. An IBSS (independent basic service set), or ad hoc network, is clients talking directly with no AP. In an ESS, adjacent cells should overlap slightly, often cited as around 10 to 15 percent, so clients can roam, but they should use different channels.",
   "RF interference comes in a few forms. Co-channel interference happens when nearby APs share a channel and must take turns for airtime. Adjacent-channel interference happens when they use overlapping channels, such as 1 and 3 in 2.4 GHz, and is worse because the signals corrupt each other. Non-Wi-Fi interference comes from microwaves, Bluetooth, wireless cameras and similar devices. Physical effects also weaken or distort signals: absorption by walls, people and water, reflection off metal, refraction, scattering and diffraction around obstacles. Signal strength is measured as RSSI (received signal strength indicator), usually in negative dBm (decibels relative to a milliwatt), and quality as SNR (signal-to-noise ratio). A strong signal over a high noise floor can still perform badly.",
   "Consider a worked example. An office has four 2.4 GHz APs all on channel 6, and users complain of slow Wi-Fi even with full signal bars. A site survey shows heavy co-channel contention and a microwave oven next to one AP. The engineer reassigns the APs to channels 1, 6, 11 and 1, placing the two channel-1 APs furthest apart, moves the AP away from the kitchen, and enables 5 GHz on every AP with the same SSID so capable clients prefer the cleaner band. Throughput improves because each AP now has its own airtime.",
   "Common mistakes: choosing channels like 1, 4, 8 and 11 because they 'spread out' the band (4 and 8 overlap their neighbours); assuming more transmit power always helps, when it often increases co-channel interference and creates clients that hear the AP but cannot be heard by it; confusing SSID with BSSID; thinking a strong RSSI guarantees good performance without checking SNR; and expecting older WPA2-only clients to join a 6 GHz network.",
   "Exam clue words map neatly to answers. 'Non-overlapping 2.4 GHz channels' is 1, 6 and 11. 'Greatest range' or 'best wall penetration' is 2.4 GHz. 'Most channels', 'least interference' or 'highest capacity' points to 5 or 6 GHz. 'Network name' is SSID, 'AP radio MAC address' is BSSID, 'several APs with one SSID for roaming' is ESS, and 'clients with no AP' is IBSS. 'Nearby APs on the same channel' is co-channel interference, and 'must vacate for radar' is DFS."
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
   ],
   [
    "DFS",
    "Dynamic frequency selection: a 5 GHz rule requiring an AP to move off a channel when it detects radar."
   ],
   [
    "SNR",
    "Signal-to-noise ratio: how far the received signal rises above the background noise, a key measure of link quality."
   ]
  ],
  "example": "A university lecture hall has 300 students with laptops and phones. Engineers deploy several APs using 20 MHz channels in 5 GHz and 6 GHz so each AP gets its own clean channel, keep 2.4 GHz only on a few radios set to channels 1, 6 and 11 for older devices, and lower transmit power so cells stay small and many clients share each cell less.",
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
    "It offers far more clean spectrum and wide channels, but has shorter range and weaker wall penetration, and only newer WPA3-capable clients support it."
   ],
   [
    "A client shows a strong RSSI but poor throughput. What else should you check?",
    "The SNR and noise floor, plus co-channel contention; a strong signal over high noise or crowded airtime still performs badly."
   ]
  ]
 },
 {
  "t": "Troubleshoot wired and wireless client connectivity (verify IP settings on Windows, macOS and Linux)",
  "body": [
   "Many network tickets start with a single user who cannot connect. Before you look at switches or routers, verify what the client itself believes: its IP address, mask, default gateway and DNS (Domain Name System) servers, and whether it is actually connected at Layers 1 and 2. The CCNA expects you to know the verification commands on the three common desktop operating systems and to interpret their output quickly, because a single line such as a 169.254 address or a missing gateway often tells you where the real fault is.",
   "On Windows, `ipconfig` shows the IPv4 and IPv6 addresses, mask and default gateway for each adapter. `ipconfig /all` adds the MAC (media access control) address, labelled Physical Address, whether DHCP (Dynamic Host Configuration Protocol) is enabled, the DHCP server, lease times and DNS servers. `ipconfig /release` and `ipconfig /renew` drop and request a DHCP lease, and `ipconfig /flushdns` clears the local DNS cache. `netsh wlan show interfaces` reports the connected SSID (service set identifier), BSSID, channel and signal quality for Wi-Fi, and `route print` shows the routing table.",
   "On macOS, `ifconfig` shows interfaces and addresses; en0 is often Wi-Fi on laptops. `ipconfig getifaddr en0` prints just the address, and `networksetup -getinfo Wi-Fi` shows address, mask and router. `netstat -rn` shows the routing table, where the default route reveals the gateway, and `scutil --dns` lists the resolvers. On Linux the modern tool is `ip`: `ip addr` (or `ip a`) lists addresses, `ip route` shows the default gateway on the line beginning `default via`, and `ip link` shows link state. Older systems still have `ifconfig` and `route -n`. DNS settings live in `/etc/resolv.conf`, or can be checked with `resolvectl status` on systems using systemd-resolved. All three support `ping`, `nslookup` and a path trace (`tracert` on Windows, `traceroute` on macOS and Linux).",
   "Use a structured, bottom-up approach. First check Layers 1 and 2: is the cable plugged in with a link light, or is the laptop associated to the correct SSID with a reasonable signal? Then check the IP configuration: a 169.254 address points to DHCP failure; a correct-looking address with the wrong mask or gateway points to static misconfiguration. Next, test reachability in steps: ping the loopback, the host's own address, the gateway, a remote IP, then a name. If an IP works but a name fails, the problem is DNS. If the gateway answers but remote addresses do not, look beyond the client at routing or firewalls.",
   "Wireless adds its own failure points. The client may be on the wrong SSID or a guest network, may have a saved wrong passphrase, may fail 802.1X authentication, may be too far from the AP (access point) or on a crowded or interfered-with channel. A client that is associated but has an APIPA (Automatic Private IP Addressing) address usually has a working wireless connection, but the WLAN is mapped to a VLAN where DHCP is unreachable. Always compare with a working client in the same place: if others connect fine, focus on the client; if everyone fails, focus on the network.",
   "Consider a worked example. A Linux laptop user cannot browse. `ip a` shows 10.20.30.44/24 on wlan0 and `ip route` shows `default via 10.20.30.1`. `ping 10.20.30.1` and a ping to a known external IP both succeed, but `ping intranet.example.com` fails with a name resolution error. `/etc/resolv.conf` lists a DNS server that was retired last month, left over from a static configuration. Switching the connection back to DHCP-supplied DNS, then confirming with `nslookup intranet.example.com`, fixes the problem. Layers 1 to 3 were never the issue.",
   "Common mistakes: mixing up commands between operating systems, such as typing `ipconfig /all` on Linux; renewing DHCP repeatedly when the switch port is in the wrong VLAN; skipping the gateway ping and jumping straight to the internet; blaming Wi-Fi when the client has a static IP from another site; and forgetting that a stale DNS cache can make one site fail while others work. Record what you checked, because the next engineer should not repeat every step.",
   "Exam questions often show output and ask what is wrong or which platform produced it. 'ipconfig' is Windows, 'ifconfig' with en0 suggests macOS, and 'ip addr' or 'ip route' is Linux. 'Ping by IP works but by name fails' points to DNS. '169.254' points to DHCP. 'Can ping local devices but not the gateway' points to the gateway setting or VLAN. 'Associated to the SSID but no valid IP' points to the WLAN-to-VLAN mapping or DHCP."
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
    "nslookup",
    "A command on all three platforms that queries DNS to test whether a name resolves."
   ],
   [
    "RSSI",
    "Received signal strength indicator, a measure of how strong the wireless signal is at the client."
   ],
   [
    "/etc/resolv.conf",
    "The Linux file that lists the DNS servers the system resolver uses."
   ]
  ],
  "example": "A Windows user on the new guest SSID cannot reach anything. `ipconfig /all` shows 169.254.12.80 with no gateway, while `netsh wlan show interfaces` shows a strong signal and the right SSID. Other guests fail too. The wireless controller maps the guest WLAN to VLAN 99, which was never added to the AP's trunk; adding it lets DHCP through and clients get proper addresses.",
  "tip": "Know which OS each command belongs to: ipconfig on Windows, ifconfig on macOS, ip addr on Linux. Questions often show output and ask which platform or which setting is wrong.",
  "check": [
   [
    "Which Windows command shows the DNS servers and DHCP server a client is using?",
    "ipconfig /all, which shows full adapter details including DHCP server, lease times and DNS servers."
   ],
   [
    "A user can ping a remote server by IP but not by name. Which setting do you investigate?",
    "DNS: the client's configured DNS servers and whether they can resolve the name."
   ],
   [
    "On a modern Linux host, how do you display the default gateway?",
    "Run ip route and look for the line starting with 'default via'."
   ],
   [
    "Several wireless users in the same area all get 169.254 addresses. Is the fault more likely on the clients or the network?",
    "The network, because many clients fail together; check the WLAN's VLAN mapping, trunks and DHCP reachability."
   ]
  ]
 },
 {
  "t": "DHCPv4 on IOS: server pools, excluded addresses, relay with ip helper-address, troubleshooting leases",
  "body": [
   "DHCP (Dynamic Host Configuration Protocol) hands out IP addresses and settings automatically so you do not configure every host by hand. A Cisco router or multilayer switch running IOS can act as a DHCP server for small sites, and more commonly as a relay agent that forwards requests to a central server. It can also be a DHCP client itself. The CCNA expects you to configure and verify all three roles and to troubleshoot why a client did not get a lease.",
   "The exchange has four steps, remembered as DORA. The client broadcasts a Discover. The server replies with an Offer containing a proposed address. The client broadcasts a Request accepting that offer, broadcast so other servers know their offers were declined. The server confirms with an Acknowledgment. Clients use UDP (User Datagram Protocol) port 68 and servers UDP port 67. Leases expire, so a client tries to renew with the same server at half the lease time, and if that fails it tries any server later in the lease.",
   "To configure an IOS DHCP server, first exclude addresses you assign statically, such as the gateway, servers and printers, then build a pool. Exclusions are global commands and apply across all pools. The `network` statement tells the pool which subnet it serves, `default-router` supplies the gateway, `dns-server` the resolvers, and `lease` the duration in days (the default is one day). The order matters in practice: enter the exclusions before clients start requesting addresses, because a lease already handed out is not withdrawn just because you exclude it later. Remember too that a router hosting the pool must have an interface in, or a relay path to, the subnet named in the `network` statement, or no client will ever reach it.",
   "```text\nip dhcp excluded-address 192.168.10.1 192.168.10.10\nip dhcp pool LAN10\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 192.168.1.53\n domain-name example.local\n lease 7\n```",
   "Because Discover messages are broadcasts, they do not cross routers. When the server is on another subnet, configure a relay on the interface that faces the clients: `ip helper-address 10.1.1.20` on interface g0/1, a subinterface, or the VLAN's SVI (switched virtual interface). The router receives the broadcast, writes its receiving interface address into the giaddr (gateway IP address) field, and unicasts the request to the server. The server uses giaddr to pick the pool whose network matches, which is why it must have a pool for that client subnet. By default `ip helper-address` also forwards several other UDP broadcast services, such as DNS and TFTP. A router becomes a DHCP client with `ip address dhcp`, common on an internet-facing interface.",
   "Consider a worked example. A new VLAN 30 is created and its SVI gets 10.30.0.1/24, but PCs on it receive 169.254 addresses. The central DHCP server is at 10.1.1.20. You check `show running-config interface vlan 30` and find no helper address. Adding `ip helper-address 10.1.1.20` under `interface vlan 30` gets requests to the server, but clients still fail because the server has no 10.30.0.0/24 scope; creating it completes the fix. On an IOS server you would confirm with `show ip dhcp binding`, which lists each leased address and client identifier, and `show ip dhcp pool`, which shows utilization.",
   "Common mistakes: putting the helper address on the interface that faces the server instead of the clients; a helper pointing at the wrong server; a pool `network` statement that does not match the client subnet; forgetting `default-router`, so clients get an address but cannot leave the subnet; missing exclusions, so the server leases the gateway's address; a pool that has run out of addresses; and DHCP snooping dropping server replies arriving on an untrusted port. `show ip dhcp conflict` lists addresses the server found already in use, and `debug ip dhcp server events` shows the exchange live in a lab.",
   "Exam questions use recognizable wording. 'Clients on a remote subnet get 169.254 addresses' points to a missing or wrong `ip helper-address`. 'Clients get addresses but cannot reach other subnets' points to a missing `default-router`. 'A client received the router's own address' points to missing exclusions. 'Which field tells the server the client's subnet' is giaddr. 'Order of DHCP messages' is Discover, Offer, Request, Acknowledgment, and 'router obtains its own address from the provider' is `ip address dhcp`."
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
    "DHCP pool",
    "A named IOS configuration block that defines the subnet, gateway, DNS servers and lease for clients."
   ],
   [
    "show ip dhcp binding",
    "Command listing the addresses the IOS DHCP server has leased and to which clients."
   ]
  ],
  "example": "A small branch has no server, so its router hands out addresses. The engineer excludes 172.16.5.1 to 172.16.5.20 for the router, printers and a NAS, creates pool BRANCH with `network 172.16.5.0 255.255.255.0`, `default-router 172.16.5.1` and head-office DNS servers, and checks `show ip dhcp binding` the next morning to see forty laptops leased from .21 upward.",
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
   ],
   [
    "Which UDP ports do DHCP clients and servers use?",
    "Clients use UDP port 68 and servers use UDP port 67."
   ]
  ]
 },
 {
  "t": "Switching concepts: MAC learning and aging, frame forwarding, flooding of unknown unicast and broadcast",
  "body": [
   "A Layer 2 switch forwards Ethernet frames based on MAC (media access control) addresses. Unlike a hub, which repeats every bit out every port, a switch sends each frame only where it needs to go. That gives every port its own collision domain and allows full-duplex operation, so collisions disappear on modern switched networks. Understanding exactly how a switch decides where a frame goes is the foundation for VLANs (virtual LANs), spanning tree and Layer 2 security features such as port security.",
   "The switch builds its MAC address table, also called the CAM (content addressable memory) table, by learning. Every time a frame arrives, the switch reads the source MAC address and records it against the incoming port and VLAN. If the entry already exists, its timer is refreshed; if the MAC appears on a different port, the entry moves to the new port. Entries that are not refreshed are removed after the aging time, 300 seconds by default on Cisco switches. Aging keeps the table accurate when devices move or disconnect, and it frees space, because the table has a finite size.",
   "Forwarding uses the destination MAC. If the destination is a known unicast address in the table on a different port, the switch forwards the frame out only that port. If the destination is on the same port the frame arrived on, the switch filters (drops) it, because the destination has already seen it. If the destination is an unknown unicast, meaning it is not in the table, the switch floods the frame out every port in that VLAN except the one it arrived on. Broadcasts to FFFF.FFFF.FFFF are always flooded the same way, and multicasts are flooded too unless a feature such as IGMP (Internet Group Management Protocol) snooping limits them.",
   "Flooding is normal and self-correcting. When the destination replies, the switch learns its location from the reply's source address, and future frames are forwarded directly. All ports in a VLAN share one broadcast domain, so every broadcast, such as an ARP (Address Resolution Protocol) request, reaches every device in that VLAN. Routers and VLAN boundaries separate broadcast domains; switches separate collision domains. Switches forward in one of two ways. Store-and-forward receives the whole frame and checks the frame check sequence before forwarding, dropping corrupted frames; most modern Cisco switches use it. Cut-through starts forwarding as soon as it reads the destination address, which lowers latency but can forward damaged frames.",
   "On the CLI (command-line interface), `show mac address-table` lists entries with VLAN, MAC, type (DYNAMIC or STATIC) and port. `show mac address-table dynamic interface g0/1` narrows the output to one port, `show mac address-table address 0011.2233.4455` finds one device, `show mac address-table aging-time` shows the timer, and `clear mac address-table dynamic` empties learned entries. You can add a static entry with `mac address-table static 0011.2233.4455 vlan 10 interface g0/5`. These commands are how you trace a device to the port it is connected to, often hop by hop across several switches.",
   "Consider a worked example. PC-A on port 1 sends its first frame to PC-B on port 5 of a freshly booted switch, both in VLAN 10. The switch learns PC-A's MAC on port 1, does not know PC-B, and floods the frame out every other VLAN 10 port; devices in VLAN 20 never see it. PC-B replies, so the switch learns PC-B on port 5 and forwards the reply only out port 1, because PC-A is already known. From then on, traffic between them flows only between ports 1 and 5. If PC-B then stays silent for more than five minutes, its entry ages out and the next frame to it is flooded again.",
   "Common mistakes: saying a switch learns from the destination address; thinking flooding goes out every port on the switch rather than only ports in the same VLAN; forgetting that the ingress port is excluded from flooding; treating a switch as a boundary for broadcasts; and assuming the table never changes. When one MAC address flaps rapidly between two ports, suspect a Layer 2 loop or a misbehaving device, and look at spanning tree.",
   "Exam questions often walk through a frame and ask what the switch does. The rule to remember is that learning uses the source MAC and forwarding uses the destination MAC. 'Destination not in the table' means flood within the VLAN except the ingress port. 'Destination on the same port' means filter. 'FFFF.FFFF.FFFF' means flood. 'Entry removed after inactivity' means aging, 300 seconds by default. 'Checks the FCS (frame check sequence) before forwarding' is store-and-forward; 'lowest latency, may forward errors' is cut-through."
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
    "Filtering",
    "Dropping a frame whose destination MAC is known on the same port it arrived on."
   ],
   [
    "Broadcast domain",
    "The set of devices that receive each other's broadcasts; one per VLAN, bounded by routers."
   ],
   [
    "Collision domain",
    "A segment where simultaneous transmissions can collide; each switch port is its own collision domain."
   ],
   [
    "Store-and-forward",
    "Switching method that receives and error-checks the entire frame before forwarding it."
   ]
  ],
  "example": "A help-desk engineer needs to find the port a misbehaving printer is on. From its web page she has its MAC, 00a1.b2c3.d4e5. On the distribution switch `show mac address-table address 00a1.b2c3.d4e5` shows it on uplink g1/0/12, so she follows CDP to the access switch, repeats the command, and finds it on g1/0/33 in VLAN 40.",
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
   ],
   [
    "What is the default MAC address aging time on Cisco switches, and why does aging exist?",
    "300 seconds; aging removes stale entries so the table stays accurate when devices move or disconnect."
   ]
  ]
 },
 {
  "t": "VLANs (normal range) across multiple switches: access ports, data and voice VLANs, default VLAN",
  "body": [
   "A VLAN (virtual LAN) splits one physical switch, or a group of switches, into separate Layer 2 networks. Each VLAN is its own broadcast domain and normally its own IP subnet. VLANs let you group users by role instead of location, limit how far broadcasts travel, and apply security between groups, because traffic between VLANs must pass through a router or Layer 3 switch where it can be filtered with ACLs (access control lists).",
   "Normal-range VLANs are numbered 1 to 1005. VLAN 1 is the default VLAN: every port belongs to it out of the box, and it cannot be deleted or renamed. VLANs 1002 to 1005 are reserved for legacy Token Ring and FDDI (Fiber Distributed Data Interface) and also cannot be deleted. On many switches normal-range VLANs are stored in a file called vlan.dat in flash rather than in the running configuration. Extended-range VLANs are 1006 to 4094. A common hardening practice is to move all user ports out of VLAN 1 and to shut down unused ports and place them in an unused VLAN.",
   "An access port belongs to a single data VLAN and sends and receives untagged frames; the end device does not know which VLAN it is in. You create the VLAN, optionally name it, and assign ports. If you assign a port to a VLAN that does not yet exist, many switches create it automatically, but if a VLAN is later deleted, its ports become inactive and pass no traffic until reassigned.",
   "```text\nvlan 10\n name SALES\nvlan 20\n name VOICE\ninterface g1/0/5\n switchport mode access\n switchport access vlan 10\n switchport voice vlan 20\n```",
   "The voice VLAN solves a common problem: an IP phone plugs into the switch port and a PC plugs into the phone. The switch uses CDP (Cisco Discovery Protocol) or LLDP (Link Layer Discovery Protocol) to tell the phone which voice VLAN to use. The phone tags its voice frames with VLAN 20 and a priority value, while the PC's traffic passes through untagged into data VLAN 10. The port is still an access port with one data VLAN and one voice VLAN, so voice and data get separate subnets and separate QoS (quality of service) treatment. When VLANs span several switches, every switch must know the VLAN, and the links between switches must be 802.1Q trunks that carry it. If the VLAN is missing on a switch in the path, or the trunk does not allow it, frames for that VLAN are dropped. Hosts in different VLANs still need a router to talk.",
   "Consider a worked example. A clinic has reception on the ground floor and doctors upstairs, each floor with its own switch. VLAN 10 (STAFF) and VLAN 20 (VOICE) are created on both switches, desks use access ports with `switchport access vlan 10` and `switchport voice vlan 20`, and the link between floors is a trunk. A doctor's PC upstairs and the reception PC downstairs are in the same subnet and reach each other at Layer 2. Later someone creates VLAN 30 for cameras only on the downstairs switch; the upstairs cameras get no addresses until VLAN 30 is also created upstairs and allowed on the trunk.",
   "Common mistakes: forgetting to create the VLAN on every switch that carries it; expecting hosts in different VLANs to communicate without routing; leaving user ports in VLAN 1; configuring `switchport voice vlan` and then expecting the phone to work on a port the switch treats as a trunk; and reading `show vlan brief` and concluding a missing port is broken. Trunk ports never appear there. Verify with `show vlan brief`, which lists VLANs and their access ports, and `show interfaces g1/0/5 switchport`, which shows administrative and operational mode, access VLAN and voice VLAN.",
   "Exam wording points clearly to answers. 'All ports by default' or 'cannot be deleted' means VLAN 1. 'Normal range' is 1 to 1005. 'Phone and PC share one port' means a voice VLAN on an access port. 'Hosts in the same VLAN on different switches cannot communicate' points to a missing VLAN or a trunk that does not allow it. 'Port not listed in show vlan brief' suggests a trunk. 'Separate broadcast domains' and 'one subnet per VLAN' describe what VLANs create."
  ],
  "terms": [
   [
    "VLAN",
    "A logical Layer 2 broadcast domain created on switches, usually mapped to one IP subnet."
   ],
   [
    "Access port",
    "A switch port that carries untagged traffic for a single data VLAN, optionally plus a voice VLAN."
   ],
   [
    "Voice VLAN",
    "A separate VLAN for IP phone traffic on an access port, tagged by the phone while PC traffic stays untagged."
   ],
   [
    "Default VLAN",
    "VLAN 1, to which all ports belong by default; it cannot be deleted or renamed."
   ],
   [
    "Normal-range VLANs",
    "VLAN IDs 1 to 1005, with 1002 to 1005 reserved for legacy technologies."
   ],
   [
    "vlan.dat",
    "The flash file where many Cisco switches store normal-range VLAN definitions."
   ]
  ],
  "example": "An accounting firm puts staff PCs in VLAN 10, phones in VLAN 20 and printers in VLAN 30 across three access switches. Each desk port has `switchport access vlan 10` and `switchport voice vlan 20`, the uplinks are trunks, and unused ports are shut down and assigned to VLAN 999. A broadcast storm from a faulty printer stays inside VLAN 30 instead of reaching every PC.",
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
   ],
   [
    "What happens to access ports when their VLAN is deleted?",
    "They become inactive and pass no traffic until the VLAN is recreated or they are assigned to another VLAN."
   ]
  ]
 },
 {
  "t": "Layer 2 edge-port attributes: VLAN, Power over Ethernet (PoE), port channel and LACP",
  "body": [
   "Edge ports are the switch ports that face end devices, access points and servers, as opposed to the links between switches. Configuring an edge port correctly means deciding which VLAN (virtual LAN) it belongs to, whether it supplies power to the attached device, and, for servers or devices that need more bandwidth and redundancy, whether several ports should be bundled together. The CCNA groups these decisions as edge-port attributes, and a typical exam item shows a port configuration and asks what it will do.",
   "The VLAN decision comes first. A user port is an access port in the correct data VLAN, often with a voice VLAN for a phone. A port facing a virtualization host, or an autonomous AP (access point) that serves several SSIDs (service set identifiers) mapped to different VLANs, may instead be a trunk. A lightweight AP in local mode usually needs only an access port, because its client traffic is tunnelled to the controller. Unused ports should be shut down and placed in an unused VLAN, and edge ports are usually configured with PortFast so they begin forwarding immediately instead of waiting through spanning tree states.",
   "Power over Ethernet (PoE) lets the switch supply DC power over the same twisted-pair cable that carries data, so IP phones, wireless APs and cameras need no separate power supply. The switch is the power sourcing equipment (PSE) and the phone or AP is the powered device (PD). Before applying power, the PSE runs detection to confirm a PD is present, so it will not send power to an ordinary PC NIC (network interface card); classification then tells the switch roughly how much power the device needs. The IEEE standards have increased available power over time: 802.3af (PoE), 802.3at (PoE+) and 802.3bt for higher-power devices. The switch has a total power budget, and if too many devices draw power, some are not powered. `show power inline` shows each port's draw and the remaining budget, and `power inline auto` (the default) or `power inline never` controls it per port.",
   "A port channel, also called EtherChannel, bundles two to eight active physical links into one logical link. Spanning tree sees the bundle as one link, so all members forward instead of all but one being blocked. Traffic is load-balanced across members per flow, based on a hash of addresses, so a single flow uses one member while many flows spread out. If one member fails, the others keep carrying traffic without a spanning tree recalculation. Port channels are common between switches and between a switch and a server with two or more NICs.",
   "LACP (Link Aggregation Control Protocol, originally IEEE 802.3ad and now part of 802.1AX) negotiates and monitors the bundle. Each side sends LACP messages to confirm the other end is part of the same bundle with matching settings, which protects against miscabling. The modes are active, which initiates negotiation, and passive, which only responds. Active with active, or active with passive, forms a bundle; passive with passive does not. Cisco's older proprietary equivalent is PAgP (Port Aggregation Protocol), and a static bundle with `mode on` uses no negotiation at all, so it must be `on` at both ends.",
   "Consider a worked example. A new ceiling AP running in autonomous mode needs power and two VLANs for its staff and guest SSIDs. You configure its port with `switchport mode trunk` and `switchport trunk allowed vlan 10,50`, and `show power inline` confirms the AP draws power within the switch budget. The file server beside it has two NICs set for LACP, so both switch ports get `channel-group 5 mode active`. `show etherchannel summary` shows Po5 flagged SU (Layer 2, in use) with both members flagged P (bundled), and pulling one cable leaves the server reachable.",
   "Common mistakes: configuring LACP passive on both ends; mixing `mode on` on one side with LACP on the other; bundling ports whose speed, duplex, VLAN or trunk settings differ; forgetting that PoE budgets are shared across the whole switch; plugging a high-power AP into a port or switch that cannot deliver enough power, so it boots with reduced radios; and making every edge port a trunk when an access port is enough.",
   "Exam questions follow patterns. 'Phone or AP needs no power adapter' means PoE, with the switch as PSE. 'Some cameras have no power after new devices were added' means the power budget is exhausted. 'Both links forward and spanning tree sees one link' is EtherChannel. 'IEEE standard that negotiates bundles' is LACP. 'Which mode pair fails' is passive with passive. 'Cisco proprietary negotiation' is PAgP, and 'no negotiation' is `mode on`."
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
   ],
   [
    "PAgP",
    "Port Aggregation Protocol, Cisco's proprietary bundle negotiation protocol with desirable and auto modes."
   ],
   [
    "PortFast",
    "A spanning tree feature that lets an edge port move straight to forwarding."
   ]
  ],
  "example": "A school adds twenty PoE cameras to a switch that already powers forty phones and six APs. Several cameras stay dark, and `show power inline` shows the budget is fully allocated. The team moves the cameras to a second switch with spare budget, and sets `power inline never` on ports in the staff room where no powered devices should connect.",
  "tip": "LACP passive plus passive never forms a channel, because neither side starts negotiation. At least one side must be active. Static on must be matched with static on.",
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
   ],
   [
    "Which command shows how much PoE each port draws and how much budget remains?",
    "show power inline."
   ]
  ]
 },
 {
  "t": "802.1Q trunking: native VLAN, allowed VLAN lists, DTP modes",
  "body": [
   "A trunk is a switch link that carries traffic for many VLANs (virtual LANs) over one physical connection. Without trunks you would need a separate cable between switches for every VLAN. The IEEE 802.1Q standard makes trunking work by inserting a 4-byte tag into each Ethernet frame between the source MAC address and the EtherType. The tag includes a 12-bit VLAN ID, giving IDs up to 4094, and a 3-bit priority field used for class of service. The receiving switch reads the tag, removes it and forwards the frame in the right VLAN.",
   "One VLAN on each 802.1Q trunk is the native VLAN, and its frames are sent untagged. By default the native VLAN is VLAN 1. When a switch receives an untagged frame on a trunk, it places it in the native VLAN. Both ends must agree on the native VLAN; if they differ, traffic from one VLAN leaks into another, and CDP (Cisco Discovery Protocol) logs a native VLAN mismatch. For security, best practice is to change the native VLAN to an unused VLAN that carries no user traffic, which helps mitigate VLAN hopping by double tagging, where a frame with two tags reaches a VLAN it should not.",
   "The allowed VLAN list controls which VLANs a trunk carries. By default all VLANs are allowed. You can restrict it, but be careful with syntax: `switchport trunk allowed vlan 10,20` replaces the whole list, `switchport trunk allowed vlan add 30` adds to it, `remove` takes one away and `except` allows all but the listed ones. Forgetting the `add` keyword is a classic outage. `show interfaces trunk` displays each trunk's mode, encapsulation, status, native VLAN, the allowed VLANs, the VLANs allowed and active in the management domain, and the VLANs in spanning tree forwarding state and not pruned.",
   "```text\ninterface g0/1\n switchport trunk encapsulation dot1q   ! only on switches that also support ISL\n switchport mode trunk\n switchport trunk native vlan 999\n switchport trunk allowed vlan 10,20,30\n switchport nonegotiate\n```",
   "DTP (Dynamic Trunking Protocol) is a Cisco protocol that negotiates whether a link becomes a trunk. The modes are `access` (never a trunk), `trunk` (always a trunk, still sending DTP unless disabled), `dynamic desirable` (actively tries to form a trunk) and `dynamic auto` (becomes a trunk only if the other side asks). Desirable with trunk, desirable or auto forms a trunk; auto with trunk forms a trunk; auto with auto stays an access link because neither side initiates. `switchport nonegotiate` turns DTP off on a statically configured trunk. Because DTP could let an attacker's device negotiate a trunk on an edge port, best practice is to hard-code every port: `switchport mode access` on edge ports, and `switchport mode trunk` plus `switchport nonegotiate` on trunks. 802.1Q is the only trunking protocol on most current switches; Cisco's older ISL (Inter-Switch Link) is legacy, which is why the encapsulation command appears only on platforms that supported both.",
   "Consider a worked example. A technician adds VLAN 40 to a trunk by typing `switchport trunk allowed vlan 40`. Immediately, VLANs 10 to 30 stop working across the link, because the command replaced the list. `show interfaces trunk` shows only VLAN 40 allowed. Re-entering `switchport trunk allowed vlan 10,20,30,40` restores service; the correct command would have been `switchport trunk allowed vlan add 40`. The same review finds the far end still using native VLAN 1 while this end uses 999, which explains the CDP mismatch messages in the log, so both ends are set to 999.",
   "Common mistakes: leaving both ends at the default `dynamic auto` and expecting a trunk; forgetting `add`; mismatched native VLANs; assuming the native VLAN is tagged; allowing a VLAN on the trunk that does not exist on the far switch; and leaving DTP enabled on user-facing ports. Also remember that a VLAN missing from the 'forwarding' column of `show interfaces trunk` may be blocked by spanning tree rather than disallowed.",
   "Exam questions use steady wording. 'Untagged frames on a trunk' means native VLAN. 'Native VLAN mismatch' leads to traffic leaking between VLANs and CDP error messages. 'Which DTP pair will not trunk' is auto-auto. 'Prevent a user port from becoming a trunk' is `switchport mode access` or `switchport nonegotiate`. 'Add a VLAN without affecting others' is `allowed vlan add`. 'Tag size' is 4 bytes, and 'VLAN ID field' is 12 bits."
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
   ],
   [
    "switchport nonegotiate",
    "Interface command that stops a port from sending DTP frames."
   ],
   [
    "VLAN hopping",
    "An attack that sends traffic into an unauthorized VLAN, for example by abusing DTP or double tagging."
   ]
  ],
  "example": "Two new access switches are uplinked to a distribution switch. Nothing crosses VLANs between them because every port is still at the default dynamic auto. The engineer configures each uplink with `switchport mode trunk`, native VLAN 999, an allowed list of 10, 20 and 30, and `switchport nonegotiate`, then confirms with `show interfaces trunk` on both ends.",
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
   ],
   [
    "Why is changing the native VLAN to an unused VLAN a security best practice?",
    "It keeps untagged trunk traffic away from user VLANs and helps mitigate double-tagging VLAN hopping."
   ]
  ]
 },
 {
  "t": "Layer 2 discovery protocols: CDP and LLDP",
  "body": [
   "When you arrive at an unfamiliar network, or a diagram is out of date, discovery protocols tell you what is plugged into each port. Cisco Discovery Protocol (CDP) and Link Layer Discovery Protocol (LLDP) both have devices periodically advertise information about themselves to their directly connected neighbours. They run at Layer 2, so they work even before IP is configured, and their messages are never forwarded past the immediate neighbour. That makes them ideal for building a map one hop at a time, and for confirming that a cable really lands where the documentation says it does.",
   "CDP is Cisco proprietary and enabled by default on Cisco devices. Each device sends advertisements every 60 seconds by default, and neighbours keep the information for a holdtime of 180 seconds. An advertisement includes the device ID (usually the hostname), the local and remote interface, the platform and model, capabilities (router, switch, phone and so on), the software version, the management IP address, and on switches the native VLAN and duplex. Because it carries the native VLAN and duplex, CDP is what logs native VLAN mismatch and duplex mismatch warnings. It also tells Cisco IP phones which voice VLAN to use.",
   "LLDP is the IEEE 802.1AB open standard equivalent, so it works between devices from different vendors. It is usually disabled by default on Cisco IOS devices and is enabled globally with `lldp run`. By default it advertises every 30 seconds with a holdtime of 120 seconds, plus a reinitialization delay of 2 seconds. Unlike CDP's single on/off control per interface, LLDP separates sending and receiving: `lldp transmit` and `lldp receive` under an interface. LLDP-MED (Media Endpoint Discovery) is an extension used with IP phones and other endpoints to advertise voice VLAN, location and power needs.",
   "The key commands mirror each other. `show cdp neighbors` gives a table of neighbour device ID, local interface, holdtime, capability, platform and remote port ID. `show cdp neighbors detail` (or `show cdp entry *`) adds IP addresses and software version. The LLDP equivalents are `show lldp neighbors` and `show lldp neighbors detail`. `show cdp` and `show lldp` show the timers. Global control is `cdp run` or `no cdp run`, and `lldp run` or `no lldp run`; per interface, `no cdp enable` stops CDP on that port. `cdp timer` and `cdp holdtime`, or `lldp timer` and `lldp holdtime`, change the timers.",
   "```text\nSW1# show cdp neighbors\nDevice ID   Local Intrfce  Holdtme  Capability  Platform   Port ID\nR1          Gig 0/1        152      R B S I     ISR4331    Gig 0/0/0\nSW2         Gig 0/24       171      S I         WS-C2960X  Gig 0/24\n```",
   "Consider a worked example. You are asked to document which switch port connects to the branch router. On the switch, `show cdp neighbors` (above) shows R1 on local interface Gig 0/1 with Port ID Gig 0/0/0, so the cable runs from the switch's Gig 0/1 to the router's Gig 0/0/0. `show cdp neighbors detail` gives R1's management address 10.0.0.1, so you can SSH (Secure Shell) to it. A third-party firewall does not appear at all, so you enter `lldp run` on the switch, confirm the firewall also runs LLDP, and after up to 30 seconds it appears in `show lldp neighbors`.",
   "Common mistakes: reading 'Local Intrfce' as the neighbour's port (it is yours; Port ID is theirs); expecting LLDP output on a Cisco switch before running `lldp run`; expecting a device two hops away to appear; mixing up the CDP and LLDP timers; and forgetting that disabling CDP on a phone port can stop the phone learning its voice VLAN. Discovery protocols also reveal model, software version and addresses that an attacker would value, so the defensive practice is to disable them on ports facing untrusted networks, such as internet links and guest or public ports, while keeping them on infrastructure and phone ports.",
   "Exam questions test defaults and use cases. 'Multivendor' or 'IEEE standard' means LLDP. 'Enabled by default on Cisco' means CDP. '60 and 180 seconds' are CDP timers; '30 and 120' are LLDP. 'Which command shows the neighbour's IP address' is the `detail` form. 'Which column is the remote port' is Port ID. 'Reduce information exposure on an internet link' is `no cdp enable` and `no lldp transmit` on that interface."
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
    "Advertisement timer",
    "How often a device sends discovery messages: 60 seconds for CDP and 30 seconds for LLDP by default."
   ],
   [
    "LLDP-MED",
    "An LLDP extension for media endpoints such as IP phones, carrying voice VLAN and power information."
   ],
   [
    "Port ID",
    "The column in neighbor output that shows the neighbour's own interface."
   ]
  ],
  "example": "A network team inherits a site with no diagrams. From the core switch they run `show cdp neighbors detail` to list every attached Cisco switch with its management IP, SSH to each one and repeat, and enable `lldp run` to catch the non-Cisco storage switches. Within an hour they have an accurate port-to-port map, and they then disable CDP and LLDP on the internet-facing router interface.",
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
   ],
   [
    "How do you stop a Cisco interface from sending LLDP while still receiving it?",
    "Enter no lldp transmit under the interface, leaving lldp receive enabled."
   ]
  ]
 },
 {
  "t": "EtherChannel (LACP and static), Layer 2 and Layer 3, and member-port consistency rules",
  "body": [
   "EtherChannel combines several parallel Ethernet links into one logical port-channel interface. It adds bandwidth, provides redundancy if a member fails, and, crucially, looks like a single link to spanning tree, so no member is blocked. Without it, STP (Spanning Tree Protocol) would block all but one of the parallel links, wasting the rest. You configure EtherChannel by putting physical interfaces into a channel group; IOS creates the matching `interface port-channel` automatically, and from then on you manage the bundle mostly through that logical interface. Both ends must be configured as a bundle; a channel on one switch facing ordinary independent ports on the other is a recipe for loops or dropped traffic.",
   "There are three ways to form the bundle. LACP (Link Aggregation Control Protocol, IEEE 802.3ad, now 802.1AX) uses modes `active` and `passive`. PAgP (Port Aggregation Protocol), Cisco's proprietary protocol, uses `desirable` and `auto`. Static mode `on` forms the bundle without any negotiation. The modes must be compatible on both ends: LACP active-active or active-passive works; PAgP desirable-desirable or desirable-auto works; `on` works only with `on`. Mixing protocols, such as LACP on one end and PAgP on the other, or `on` with active, does not form a working bundle. Negotiated modes are preferred because they detect miscabling and a far end that is not bundled; with `on`, a mismatch can cause loops or lost traffic.",
   "```text\ninterface range g1/0/1 - 2\n channel-group 1 mode active\ninterface port-channel 1\n switchport mode trunk\n switchport trunk allowed vlan 10,20\n```",
   "A Layer 2 EtherChannel acts like a switchport, either access or trunk. A Layer 3 EtherChannel acts like a routed port with an IP address, used between multilayer switches or to a router. To build one, you make the physical members routed with `no switchport` before adding them to the channel group, then put the IP address on the port-channel interface, not on the members: `interface port-channel 2`, `no switchport`, `ip address 10.0.12.1 255.255.255.252`. Its flag in `show etherchannel summary` is `R` for Layer 3 instead of `S` for Layer 2.",
   "Member-port consistency is what the exam tests most. All members must match on speed and duplex, switchport mode (all access or all trunk), access VLAN, native VLAN and allowed VLAN list on trunks, and must all be Layer 2 or all Layer 3. A member that does not match is suspended and carries no traffic. Settings applied to the port-channel interface are pushed to the members, which is the easiest way to keep them consistent. Traffic is load-balanced by a hash, not packet by packet, so a single flow always uses the same member and packet order is preserved. The hash inputs are set globally with `port-channel load-balance`, using fields such as source and destination MAC or IP; `show etherchannel load-balance` shows the method.",
   "Consider a worked example. Two distribution switches are joined by a four-port LACP bundle. `show etherchannel summary` shows `Po1(SU)` with three members flagged `P` (bundled) and one flagged `s` (suspended). `show interfaces g1/0/4 switchport` reveals its native VLAN is 1 while the others use 999, a leftover from before the bundle was built. Configuring `switchport trunk native vlan 999` on the port-channel interface pushes the setting to all members, and a moment later the fourth link shows `P`. Later, users notice one backup job never goes faster than one link: that is expected, because a single flow hashes to one member.",
   "Common mistakes: pairing `on` with a negotiating mode; LACP passive-passive or PAgP auto-auto, where neither side starts; configuring members individually and letting them drift apart; putting the IP address on a member instead of the port-channel; forgetting `no switchport` on Layer 3 members; and expecting one flow to use the combined bandwidth of all links. Other flags to know are `I` (stand-alone, not bundled), `D` (down) and `U` (port-channel in use).",
   "Exam questions usually show `show etherchannel summary` or configuration snippets. 'Member flagged s' points to a consistency mismatch. 'Channel will not form' with one side `on` points to a mode mismatch. 'Open standard' is LACP; 'Cisco proprietary' is PAgP; 'no negotiation' is `on`. 'Where does the IP address go' is the port-channel interface. 'Why does one transfer use a single link' is per-flow hashing, and 'why no links are blocked' is that STP sees one logical link."
  ],
  "terms": [
   [
    "channel-group",
    "Interface command that assigns a physical port to an EtherChannel and sets its negotiation mode."
   ],
   [
    "LACP active / passive",
    "LACP modes: active initiates negotiation, passive only responds; at least one side must be active."
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
  "example": "Two core Layer 3 switches need a fast, resilient routed link. The engineer sets `no switchport` on four 10-gigabit ports on each side, adds them with `channel-group 10 mode active`, and configures `interface port-channel 10` with a /30 address. `show etherchannel summary` shows `Po10(RU)` with all four members `P`, and OSPF sees one neighbor over one link instead of four.",
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
   ],
   [
    "One switch uses channel-group 1 mode on and the other mode active. What happens?",
    "No working bundle forms, because on does not negotiate and cannot interoperate with LACP."
   ]
  ]
 },
 {
  "t": "Rapid PVST+: root bridge election, root/designated/alternate ports, port states, PortFast, BPDU guard",
  "body": [
   "Redundant links between switches protect against failures, but at Layer 2 they create loops. Ethernet frames have no TTL (time to live), so a broadcast in a loop circulates forever, causing a broadcast storm, MAC table instability and duplicate frames. Spanning Tree Protocol (STP) prevents this by blocking just enough ports to leave a loop-free tree, while keeping the blocked links ready as backups. Rapid PVST+ (Rapid Per-VLAN Spanning Tree Plus) is Cisco's implementation of Rapid Spanning Tree (IEEE 802.1w) that runs a separate instance per VLAN, so different VLANs can use different roots and paths.",
   "Switches exchange BPDUs (bridge protocol data units) to elect a root bridge. Each switch has a bridge ID made of a priority and its MAC address. The priority defaults to 32768 and includes the extended system ID, which is the VLAN number, so a default switch advertises 32778 in VLAN 10. The lowest bridge ID wins: lowest priority first, then lowest MAC as a tiebreaker. Because the oldest switch often has the lowest MAC, choose the root deliberately with `spanning-tree vlan 10 root primary` or `spanning-tree vlan 10 priority 4096`, and a backup with `root secondary`. Priorities must be multiples of 4096.",
   "Every non-root switch then picks one root port, its best path to the root, based on the lowest root path cost. Default costs follow link speed; with the common short method, 10 Mbps costs 100, 100 Mbps costs 19, 1 Gbps costs 4 and 10 Gbps costs 2. Ties are broken by the lowest neighbouring bridge ID, then the lowest neighbouring port ID (port priority, default 128, plus port number). On each link, one designated port is chosen: the port with the lowest cost to the root, and every port on the root bridge is designated. Every remaining port becomes an alternate port (a discarding backup path to the root) or, rarely, a backup port (a redundant port on a shared segment the same switch already serves).",
   "RSTP (Rapid Spanning Tree Protocol) simplifies port states to three: discarding (no forwarding, no learning), learning (building the MAC table but not forwarding) and forwarding. Classic STP's disabled, blocking and listening states all map to discarding. RSTP converges quickly because, on point-to-point links, switches use a proposal and agreement handshake instead of waiting on timers, and an alternate port can take over at once when the root port fails.",
   "Edge ports connect to end devices and should never receive BPDUs. PortFast (`spanning-tree portfast` on an interface, or `spanning-tree portfast default` globally for all access ports) makes a port go straight to forwarding, so PCs get DHCP addresses without delay. BPDU guard (`spanning-tree bpduguard enable`, or `spanning-tree portfast bpduguard default`) protects those ports: if a BPDU arrives, meaning someone connected a switch, the port is err-disabled. It stays down until recovered with `shutdown` then `no shutdown`, or automatically by errdisable recovery. Verify with `show spanning-tree vlan 10`, which shows the root ID, 'This bridge is the root' where true, and each interface's role (Root, Desg, Altn, Back), state (FWD, BLK, LRN) and cost.",
   "Consider a worked example. Three switches in a triangle all use default priority, and the oldest access switch, with the lowest MAC, became root, pulling traffic through a slow closet. You enter `spanning-tree vlan 1-100 root primary` on the core and `root secondary` on the second core switch. `show spanning-tree vlan 10` on an access switch now shows its uplink to the core as root port with cost 4, and the link to the other access switch as alternate. Later a user plugs a small switch into a desk port; BPDU guard err-disables that port and a log message names the cause.",
   "Common mistakes: picking the highest priority as the winner (lower always wins); forgetting the VLAN number is added to the priority; comparing total path cost using the neighbour's port cost instead of your own receiving port; enabling PortFast on a switch-to-switch link; and expecting BPDU guard to block the frame and leave the port up. Remember every port on the root bridge is designated, and each non-root switch has exactly one root port per VLAN.",
   "Exam questions reward the rule 'lower is better at every step': lowest bridge ID for root, lowest cost for root and designated ports, then lowest sender bridge ID, then lowest sender port ID. 'Backup path that takes over immediately' is an alternate port. 'Port goes straight to forwarding' is PortFast. 'Port shut when a BPDU arrives' is BPDU guard. 'Three RSTP states' is discarding, learning, forwarding, and 'separate tree per VLAN' is PVST+."
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
    "PortFast",
    "A feature that moves an edge port directly to forwarding without waiting through spanning tree states."
   ],
   [
    "BPDU guard",
    "A feature that err-disables a PortFast port if it receives a BPDU."
   ],
   [
    "Root path cost",
    "The sum of port costs along the path to the root bridge, based on link speed."
   ]
  ],
  "example": "A campus uses two core switches. For VLANs 10 to 19 the engineer makes Core1 root primary and Core2 root secondary, and for VLANs 20 to 29 the reverse, so each access switch forwards some VLANs on each uplink. All user ports get PortFast and BPDU guard, which later err-disables a port where a contractor plugged in a travel switch.",
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
   ],
   [
    "What role do all ports on the root bridge take?",
    "Designated, because the root bridge has the lowest possible cost to itself on every segment it connects to."
   ]
  ]
 },
 {
  "t": "Inter-VLAN routing: router-on-a-stick subinterfaces and multilayer switch SVIs",
  "body": [
   "Each VLAN (virtual LAN) is a separate broadcast domain and IP subnet, so hosts in different VLANs cannot talk directly. Something must route between them, and that device becomes each VLAN's default gateway. The CCNA covers two methods: router-on-a-stick with subinterfaces, and switch virtual interfaces (SVIs) on a multilayer switch. A third, legacy method uses one physical router interface per VLAN, which does not scale because you run out of ports.",
   "Router-on-a-stick uses a single physical router interface connected to a switch trunk. On the router you create one subinterface per VLAN, tell it which 802.1Q tag it handles with `encapsulation dot1Q`, and give it the gateway address for that VLAN. The physical interface has no IP address but must be up with `no shutdown`; shutting it down takes every subinterface down with it. The `native` keyword marks the subinterface that handles untagged frames from the native VLAN.",
   "```text\ninterface g0/0\n no shutdown\ninterface g0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.1 255.255.255.0\ninterface g0/0.20\n encapsulation dot1Q 20\n ip address 192.168.20.1 255.255.255.0\ninterface g0/0.99\n encapsulation dot1Q 99 native\n ip address 192.168.99.1 255.255.255.0\n```",
   "The switch port facing the router must be a trunk allowing those VLANs. Traffic from VLAN 10 to VLAN 20 goes up the trunk tagged 10, the router routes it, and it comes back down the same trunk tagged 20. The weakness is that one link carries all inter-VLAN traffic in both directions, so it can become a bottleneck, and the router is a single point of failure. It suits small branches with modest traffic. The router also needs no special routing configuration for this: each subinterface's subnet appears as a connected route as soon as the subinterface is up, so the router already knows every VLAN. To verify, `show interfaces trunk` on the switch should list the router-facing port, and `show vlans` on the router lists each subinterface with its 802.1Q tag and traffic counters, which quickly reveals a tag that does not match.",
   "A multilayer (Layer 3) switch routes in hardware using SVIs. An SVI is a virtual interface for a VLAN: `interface vlan 10` with `ip address 192.168.10.1 255.255.255.0`. You must enable routing with `ip routing`, which is off by default on many access-class switches. An SVI is up/up only if the VLAN exists, at least one port in that VLAN (an access port, or a trunk allowing it) is up and forwarding, and the SVI itself is not shut down. Multilayer switches also support routed ports, configured with `no switchport` and an IP address, typically for uplinks to routers or other Layer 3 switches. SVIs are faster and scale better than router-on-a-stick because routing happens inside the switch at wire speed with no trunk bottleneck, which is why campus distribution layers use them.",
   "Consider a worked example. A branch has one router and one switch with VLANs 10 and 20. The switch's g0/24 is a trunk and the router uses g0/0.10 and g0/0.20 as gateways. PCs in VLAN 20 cannot reach VLAN 10. `show ip interface brief` shows g0/0.20 up/up, but `show running-config` reveals `encapsulation dot1Q 30` on it, a typo. Fixing the tag restores routing. At head office, a Layer 3 switch has SVIs for VLANs 10 and 20, both up/up, yet routing fails; `show running-config | include ip routing` returns nothing, and entering `ip routing` fixes it.",
   "Common mistakes: a subinterface tag that does not match the switch VLAN; a switch port facing the router left as an access port; the router's physical interface shut down; an SVI down/down because its VLAN was never created or has no active ports; forgetting `ip routing`; and hosts pointing to the wrong gateway. When things work, `show ip route` lists each VLAN subnet as connected (C) with a local (L) /32 route for each gateway address.",
   "Exam questions often pair a symptom with one line of output. 'One physical router interface, many VLANs' is router-on-a-stick. 'Which command sets the VLAN on a subinterface' is `encapsulation dot1Q`. 'SVI is down/down' points to a missing VLAN or no active ports. 'SVIs up but no routing between VLANs' points to missing `ip routing`. 'Best performance for many VLANs' or 'avoid a trunk bottleneck' points to SVIs on a multilayer switch."
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
    "Routed port",
    "A physical multilayer switch port configured with no switchport so it acts like a router interface."
   ],
   [
    "ip routing",
    "Global command that enables IPv4 routing on a multilayer switch."
   ]
  ],
  "example": "A growing office outgrows router-on-a-stick: backups between the server VLAN and user VLANs saturate the single trunk to the router. The team moves the gateways to SVIs on a new Layer 3 core switch, enables `ip routing`, and connects the switch to the router with a routed port and a /30. Inter-VLAN traffic now stays in the switch, and only internet-bound traffic crosses to the router.",
  "tip": "If an SVI shows down/down, check that the VLAN exists and has at least one active port. If routing between SVIs fails with the SVIs up, check for a missing ip routing command.",
  "check": [
   [
    "What command tells a router subinterface which VLAN's traffic to accept?",
    "encapsulation dot1Q <vlan-id>, optionally with the native keyword for the native VLAN."
   ],
   [
    "Name two conditions required for an SVI to be up/up.",
    "The VLAN must exist, and at least one port in that VLAN (access or allowing trunk) must be up and forwarding; the SVI must also not be shut down."
   ],
   [
    "Why do larger campuses prefer SVIs to router-on-a-stick?",
    "SVIs route in switch hardware without sending all inter-VLAN traffic over one trunk to an external router, so they are faster and avoid a bottleneck."
   ],
   [
    "How must the switch port connected to a router-on-a-stick interface be configured?",
    "As an 802.1Q trunk that allows every VLAN the router's subinterfaces serve."
   ]
  ]
 },
 {
  "t": "Wireless architectures and AP modes: autonomous, lightweight (CAPWAP), cloud-managed",
  "body": [
   "Once a network has more than a handful of access points (APs), managing each one separately becomes painful: channels, power, SSIDs (service set identifiers) and security must stay consistent, and clients must roam smoothly. Cisco wireless architectures answer the question of where the intelligence and configuration live. The CCNA compares three: autonomous, lightweight with a controller, and cloud-managed, and it tests the AP modes and the switch-port configuration each one needs. The right choice depends on the number of APs, the number of sites and where you want client traffic to flow.",
   "An autonomous AP is self-contained. It holds its own configuration, handles its own client authentication and bridges wireless traffic onto the wired network, usually over a trunk so several SSIDs can map to several VLANs. Each AP is configured individually through its CLI (command-line interface) or web interface. That is fine for a small office, but in a large deployment settings drift apart and there is no central view of RF (radio frequency) conditions.",
   "A lightweight AP works with a wireless LAN controller (WLC) in a split-MAC architecture. The AP handles real-time functions that must happen at the radio: transmitting and receiving frames, beacons, acknowledgments and encryption. The WLC handles management: configuration, authentication, roaming, RF management such as channel and power assignment, and security policy. They communicate over CAPWAP (Control and Provisioning of Wireless Access Points), which builds a control tunnel on UDP port 5246, encrypted with DTLS (Datagram Transport Layer Security), and a data tunnel on UDP port 5247 that carries client traffic (DTLS on the data tunnel is optional). Because client traffic is tunnelled, a local-mode AP's switch port is usually an access port, while the WLC connects with a trunk. An AP finds its controller through methods such as DHCP option 43, a DNS lookup, or a previously learned controller address.",
   "Controller deployments vary. A centralized (unified) WLC sits in the data center or campus core; an embedded WLC runs inside a switch; a controller-on-AP model, Cisco's Embedded Wireless Controller, lets one AP act as controller for a small site; and virtual WLCs run in a hypervisor or cloud. Lightweight APs support several modes: local (the default, serving clients and briefly scanning other channels), FlexConnect (switches client traffic locally at a branch and keeps serving clients if the WAN link to the controller fails), monitor (no clients, scanning for intrusion detection and location), sniffer (captures frames for analysis), rogue detector (listens on the wire for rogue devices), SE-Connect (spectrum analysis) and bridge or mesh modes for linking APs wirelessly.",
   "A cloud-managed architecture, such as Cisco Meraki, moves the management plane to a cloud dashboard. The APs forward client data locally on the site's network, and only management and statistics traffic goes to the cloud. You get one web dashboard for many sites and no on-premises controller, at the cost of relying on internet connectivity for management and on a licensing subscription. If the internet link drops, clients generally keep working, but you cannot change configuration until it returns.",
   "Consider a worked example. A retailer with 200 small stores cannot put a controller in each store and does not want all client traffic hauled back to headquarters. It deploys cloud-managed APs: each store's APs forward traffic locally, and IT pushes the same SSIDs to every store from one dashboard. Its headquarters campus uses a pair of WLCs with lightweight APs in local mode on access ports, the WLCs on trunks. Three regional offices with slow WAN links use FlexConnect so a WAN outage does not knock users off Wi-Fi.",
   "Common mistakes: putting a local-mode lightweight AP on a trunk because it serves several SSIDs (its traffic is tunnelled, so an access port is enough); thinking the WLC handles beacons and encryption; forgetting which CAPWAP port is control and which is data; assuming cloud-managed APs send all client traffic to the cloud; and confusing monitor mode, which serves no clients, with local mode.",
   "Exam wording maps cleanly to answers. 'Configured individually' or 'standalone' means autonomous. 'Split-MAC', 'controller' or 'tunnel to the WLC' means lightweight with CAPWAP. 'Web dashboard for many sites' means cloud-managed. 'UDP 5246, encrypted' is the CAPWAP control tunnel; '5247' is data. 'Keep working when the WAN to the controller fails' is FlexConnect. 'Dedicated to detecting threats, no clients' is monitor mode."
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
    "Split-MAC",
    "The division of 802.11 functions between the AP (real-time radio tasks) and the WLC (management tasks)."
   ],
   [
    "CAPWAP",
    "Protocol between lightweight APs and a WLC, with a DTLS-encrypted control tunnel (UDP 5246) and a data tunnel (UDP 5247)."
   ],
   [
    "FlexConnect",
    "An AP mode for branches that switches client traffic locally and keeps serving clients if the controller link fails."
   ],
   [
    "Monitor mode",
    "An AP mode that serves no clients and scans channels for intrusion detection, rogue detection and location."
   ]
  ],
  "example": "A hospital runs two WLCs in its data center and 400 lightweight APs in local mode. Security asks for better rogue AP detection in the emergency department, so the team converts two APs there to monitor mode; they stop serving clients and scan every channel full time, and their reports appear on the controller alongside the local-mode APs' findings.",
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
    "FlexConnect, because it switches client traffic locally at the branch."
   ],
   [
    "In a cloud-managed architecture, where does client data traffic go?",
    "It is forwarded locally on the site network; only management and statistics traffic goes to the cloud dashboard."
   ]
  ]
 },
 {
  "t": "Troubleshoot VLAN, trunk, EtherChannel and spanning tree problems from show command output",
  "body": [
   "Many CCNA questions show a few lines of switch output and ask what is wrong. The skill is knowing which command reveals which problem and what the tell-tale values look like. Work systematically from the physical link up: interface status, VLAN (virtual LAN) membership, trunk state, EtherChannel bundling and finally spanning tree. Each layer depends on the one below it, so a fix high up rarely helps when a lower check fails.",
   "Start with `show interfaces status` or `show ip interface brief` to see if ports are connected. A status of `err-disabled` means a protection feature such as BPDU (bridge protocol data unit) guard or port security shut the port; `show interfaces status err-disabled` or the log names the reason. `inactive` for a port, or a VLAN shown as missing, means the access VLAN was never created or was deleted, so the port cannot forward.",
   "For VLAN problems, `show vlan brief` confirms the VLAN exists and which access ports belong to it, and `show interfaces g0/5 switchport` shows the administrative and operational mode and the access VLAN. Classic faults are a port in the wrong VLAN, a VLAN missing on one switch in the path, or a host using the wrong subnet for its VLAN. Trunk ports never appear in `show vlan brief`. For trunks, `show interfaces trunk` is the key command. Read its four sections: mode and status (is it 'trunking'?), the native VLAN, the allowed VLAN list, and 'VLANs in spanning tree forwarding state and not pruned'. A port not listed at all is not trunking; check DTP (Dynamic Trunking Protocol) modes, because dynamic auto on both ends leaves an access link. A native VLAN mismatch produces CDP log messages naming both VLANs. A VLAN allowed but missing from the forwarding list may not exist on that switch, or spanning tree may be blocking it.",
   "For EtherChannel, `show etherchannel summary` shows each port-channel with flags such as `SU` (Layer 2, in use), `RU` (Layer 3, in use) or `SD` (Layer 2, down), and member flags `P` (bundled), `s` (suspended), `I` (stand-alone) and `D` (down). Suspended or stand-alone members usually mean mismatched settings (speed, duplex, VLANs, trunk mode) or incompatible modes such as LACP on one side and PAgP or `on` on the other.",
   "For spanning tree, `show spanning-tree vlan 10` shows the root bridge ID and whether this switch is root, then each port's role, state and cost. Unexpected results usually have one of a few causes: the wrong switch is root because priorities were left at default; a link that should forward is alternate because of cost; or a port is marked `BKN` (broken) due to an inconsistency such as a native VLAN mismatch. An access port that takes about 30 seconds to pass traffic lacks PortFast, which delays DHCP. A loop, shown by high CPU, broadcast storms and log messages about a MAC address flapping between ports, suggests spanning tree was disabled or a device bridged two ports.",
   "Consider a worked example. Hosts in VLAN 30 on SW2 cannot reach their gateway on SW1. `show interfaces trunk` on SW1 shows Gi0/1 trunking with VLANs 10, 20 and 30 allowed, but on SW2 the 'VLANs allowed and active in management domain' line shows only 10 and 20. `show vlan brief` on SW2 confirms VLAN 30 was never created there. Creating it with `vlan 30` restores connectivity. While checking, you also see `Po1(SU)` on SW2 with one member flagged `s`; its allowed VLAN list differs from the others, so you configure the list on the port-channel interface.",
   "Common mistakes: jumping to spanning tree before confirming the ports are up; reading a missing trunk port in `show vlan brief` as a fault; forgetting that the allowed list can be fine while the VLAN does not exist locally; fixing one member of a bundle instead of the port-channel; and re-enabling an err-disabled port without removing the cause, so it shuts again.",
   "Exam questions reward mapping each symptom to one command: VLAN membership to `show vlan brief`, trunk issues to `show interfaces trunk`, bundles to `show etherchannel summary`, root and port roles to `show spanning-tree`, and shut ports to `show interfaces status`. Clue words help: 'err-disabled' means a protection feature fired; 'not listed as trunking' means DTP or mode; 'suspended' means a member mismatch; 'wrong root' means priority; '30-second delay' means no PortFast; 'MAC flapping' means a loop."
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
    "show spanning-tree vlan",
    "Displays the root bridge and each port's role, state and cost for one VLAN."
   ],
   [
    "err-disabled",
    "A port state where the switch has shut a port because a protection feature detected a violation."
   ],
   [
    "MAC flapping",
    "A MAC address repeatedly learned on different ports, often a symptom of a Layer 2 loop."
   ],
   [
    "Native VLAN mismatch",
    "Different native VLANs on the two ends of a trunk, reported by CDP and causing traffic to leak between VLANs."
   ]
  ],
  "example": "After a weekend change, users on one floor lose access every few minutes. The switch log shows a MAC address flapping between Gi1/0/1 and Gi1/0/2, and CPU is high. `show spanning-tree vlan 10` shows no alternate ports, and the running configuration contains `no spanning-tree vlan 10` from the change. Re-enabling spanning tree blocks one uplink as alternate and the storm stops.",
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
    "PortFast on the access port, so spanning tree makes it wait through the discarding and learning timers before it forwards."
   ],
   [
    "A port shows err-disabled after someone connected a small switch to it. Which feature most likely triggered it?",
    "BPDU guard, which err-disables a PortFast edge port when it receives a BPDU."
   ]
  ]
 },
 {
  "t": "Routing table components: protocol code, prefix and mask, next hop, administrative distance, metric, gateway of last resort",
  "body": [
   "A router forwards packets by looking up each destination in its routing table. Reading that table fluently is one of the most-tested CCNA skills, because nearly every routing question starts with `show ip route` output. Each line tells you where a route came from, what destinations it covers, how trustworthy and how good it is, and where to send matching packets. Once you can read one line confidently, most routing questions become a matter of careful reading.",
   "Take this entry: `O 10.1.3.0/24 [110/3] via 10.0.12.2, 00:05:12, GigabitEthernet0/1`. The first field is the protocol code, here O for OSPF (Open Shortest Path First). Other codes are C for connected, L for local, S for static, D for EIGRP (Enhanced Interior Gateway Routing Protocol), R for RIP (Routing Information Protocol) and B for BGP (Border Gateway Protocol). An asterisk marks a candidate default route, and modifiers such as `O IA` (OSPF inter-area) or `O E2` (OSPF external type 2) also appear. The legend at the top of the output lists every code.",
   "Next is the destination prefix and mask, here 10.1.3.0/24, which the router compares with packet destinations. Every configured interface that is up produces two entries: a C route for the connected subnet and an L route for the interface's own address as a /32 host route (/128 in IPv6), so the router recognizes packets addressed to itself. When several subnets of one classful network exist, IOS groups them under a header line such as `10.0.0.0/8 is variably subnetted, 5 subnets, 3 masks`, which is only a heading, not a route.",
   "The bracketed pair is [administrative distance/metric]. Administrative distance (AD) rates how trustworthy the source of a route is and is used to choose between routes to the same prefix learned from different sources; lower is preferred. Common Cisco defaults: connected 0, static 1, eBGP (external BGP) 20, EIGRP 90, OSPF 110, RIP 120, external EIGRP 170 and iBGP (internal BGP) 200. An AD of 255 means the route is never trusted or installed. The metric is the routing protocol's own measure of path quality, used to choose between routes from the same protocol: OSPF uses cost, RIP uses hop count, EIGRP uses a composite based mainly on bandwidth and delay. Metrics from different protocols cannot be compared, which is exactly why AD exists.",
   "After 'via' comes the next hop, the neighbouring router's address to forward to, then the age of the route and the outgoing interface. Connected routes show 'is directly connected' and an interface instead of a next hop. Static routes may show only a next hop, only an interface, or both. At the top, 'Gateway of last resort' shows the default route, used when nothing more specific matches. If it says 'Gateway of last resort is not set', packets with no matching route are dropped and the router may send an ICMP (Internet Control Message Protocol) destination unreachable. A default route appears as `S* 0.0.0.0/0 [1/0] via 203.0.113.1` or as an OSPF-learned `O*E2 0.0.0.0/0`. The IPv6 equivalent is `show ipv6 route`, where the default is ::/0 and next hops are often link-local addresses.",
   "Consider a worked example. `show ip route` on R1 shows `Gateway of last resort is 203.0.113.1 to network 0.0.0.0`, then `S* 0.0.0.0/0 [1/0] via 203.0.113.1`, `C 10.0.12.0/30 is directly connected, GigabitEthernet0/1`, `L 10.0.12.1/32 is directly connected, GigabitEthernet0/1` and `O 10.1.3.0/24 [110/3] via 10.0.12.2, 00:05:12, GigabitEthernet0/1`. Reading line by line: R1 sends internet traffic to the provider through a static default route; it owns 10.0.12.1 on a /30 link to R2; and it learned 10.1.3.0/24 from OSPF with AD 110 and total cost 3, reached through R2 at 10.0.12.2 out G0/1. The route has been stable for just over five minutes.",
   "Common mistakes: reading [110/3] as metric 110; comparing a RIP hop count with an OSPF cost; treating the 'variably subnetted' heading as a route; forgetting that L routes are /32 even when the interface mask is /24; assuming every router has a default route; and mixing up the next hop (the neighbour's address) with the outgoing interface (your own port). Also remember that a route only appears if its outgoing interface is up and, for a static route, its next hop is reachable.",
   "Exam questions usually point at one field. 'Which value represents trustworthiness' is the first number in the brackets, AD. 'Which value is the OSPF cost' is the second. 'Which route is used when no other matches' is the gateway of last resort. 'Code L' means the router's own interface address. 'Which router will receive the packet' is the address after 'via'. 'Two sources offer the same prefix' means compare AD, and 'no default route exists' means unmatched packets are dropped."
  ],
  "terms": [
   [
    "Protocol code",
    "The letter at the start of a route, such as C, L, S or O, showing how the route was learned."
   ],
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
  "example": "A branch router shows `D 172.16.40.0/24 [90/3072] via 10.9.9.1` and no OSPF entry for that prefix, even though OSPF is also running and has learned it. The EIGRP route wins because its AD of 90 beats OSPF's 110, so only the EIGRP version is installed. When the EIGRP neighbour is shut down for maintenance, the OSPF route with [110/20] appears in its place.",
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
   ],
   [
    "What are the default administrative distances of static routes, OSPF and RIP?",
    "Static 1, OSPF 110 and RIP 120; connected routes are 0."
   ]
  ]
 },
 {
  "t": "Forwarding decisions: longest prefix match first, then administrative distance, then metric",
  "body": [
   "Two different questions get mixed up in routing: which routes get into the routing table, and which of the installed routes a particular packet uses. Administrative distance (AD) and metric answer the first question. Longest prefix match answers the second. Keeping these separate is the key to getting CCNA forwarding questions right, because answer choices are often designed to tempt you into applying the wrong rule at the wrong stage. Think of it as two separate moments: building the table happens in the control plane as routes are learned, and choosing a route happens in the data plane for every packet.",
   "When a packet arrives, the router compares its destination address against every route in the table and finds all routes that contain it. Among those matches, it chooses the one with the longest prefix, meaning the most specific mask. Suppose the table holds 10.0.0.0/8, 10.1.0.0/16, 10.1.1.0/24 and 0.0.0.0/0, and a packet is going to 10.1.1.77. All four match, but /24 is longest, so the router uses 10.1.1.0/24. A packet to 10.1.9.9 matches the /16, /8 and default, so the /16 wins. A packet to 172.20.1.1 matches only the default route, and without a default it would be dropped.",
   "This happens regardless of AD or metric. A static route with AD 1 for 10.0.0.0/8 will not be used for 10.1.1.77 if OSPF (Open Shortest Path First), with AD 110, has installed 10.1.1.0/24. The prefixes differ, so they are different routes and both sit in the table; longest match simply prefers the more specific one. This is also how summarization and default routes coexist with specific routes: the general route catches everything the specific ones do not.",
   "Administrative distance matters only when the router learns the exact same prefix and mask from different sources. If OSPF and a static route both offer 192.168.50.0/24, the router installs only the lower AD, the static route with AD 1, and the OSPF route stays in the OSPF database as a backup. If the static route's next hop becomes unreachable, the static is removed and the OSPF route is installed. Metric matters only when the same routing protocol finds several paths to the same prefix. OSPF computes the cost of each and installs the lowest. If two paths have exactly equal cost, OSPF installs both and load-balances across them, called ECMP (equal-cost multipath), up to a configurable maximum set with `maximum-paths`.",
   "So the full order is: a route must first win the AD and metric contests to be in the table at all; then, for each packet, longest prefix match decides which installed route is used. To check what the router will do for a destination, use `show ip route 10.1.1.77`, which displays the entry that longest match selects, including its source, AD, metric and next hop. `show ip cef 10.1.1.77` shows the Cisco Express Forwarding entry actually used in the data plane.",
   "Consider a worked example. A router has `S 10.0.0.0/8 [1/0] via 192.0.2.1`, `O 10.20.0.0/16 [110/20] via 192.0.2.5` and `O 10.20.4.0/22 [110/30] via 192.0.2.9`. A packet to 10.20.6.10 matches all three, because 10.20.4.0/22 covers 10.20.4.0 to 10.20.7.255, so it goes to 192.0.2.9: /22 is longest, even though its metric is higher than the /16 and its AD is higher than the static. A packet to 10.20.9.1 falls outside the /22, matches the /16 and /8, and goes to 192.0.2.5. A packet to 10.30.1.1 matches only the /8 and goes to 192.0.2.1.",
   "Common mistakes: choosing the route with the lowest AD before checking which routes even contain the destination; comparing metrics between routes with different prefixes; forgetting to check whether a destination actually falls inside a route's range (work out the block size); treating a default route as a strong match; and thinking a floating static with a higher AD can never be used. It is used the moment the preferred route for that same prefix disappears.",
   "Exam questions typically give a routing table and a destination and ask which next hop is used. The method is always the same: first filter to routes that contain the destination, then pick the longest mask. Only questions about two sources offering the identical prefix call for AD, and only questions about one protocol with several paths call for metric. Clue words: 'most specific' means longest prefix; 'more trustworthy source' means AD; 'lowest cost path' means metric; 'both paths used' means ECMP."
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
   ],
   [
    "Default route",
    "The 0.0.0.0/0 route, which matches every destination but is the least specific match possible."
   ],
   [
    "CEF",
    "Cisco Express Forwarding, the data-plane table built from the routing table that routers use to forward packets."
   ]
  ],
  "example": "A company summarizes its branch networks as 10.64.0.0/12 toward a backup router, while the primary router advertises each branch /24 through OSPF. Traffic to a live branch follows the specific /24. When one branch's /24 disappears after a WAN failure, traffic for it falls through to the /12 summary and reaches the backup router, with no configuration change.",
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
   ],
   [
    "A static /8 route has AD 1 and an OSPF /24 route has AD 110. Which is used for a destination inside the /24?",
    "The OSPF /24, because longest prefix match is applied first and AD only compares identical prefixes."
   ]
  ]
 },
 {
  "t": "IPv4 and IPv6 static routing: default, network, host and floating static routes",
  "body": [
   "A static route is a route you configure by hand. Static routes are predictable, use no bandwidth or CPU for route updates and reveal nothing to neighbours, so they suit small networks, stub sites with a single exit, and backup paths. Their weakness is that they do not adapt: if the topology changes, you must change them yourself, and a mistake is easy to miss until traffic fails. The CCNA expects you to write, read and troubleshoot them for both IPv4 and IPv6.",
   "The IPv4 syntax is `ip route <prefix> <mask> <next-hop | exit-interface> [distance]`. With a next-hop address, the router performs a recursive lookup to find the interface that reaches that next hop. With only an exit interface, the route appears as directly connected; that works well on point-to-point serial links, but on Ethernet it makes the router ARP (Address Resolution Protocol) for every destination and relies on proxy ARP at the neighbour. It is better to use a next hop, or both, as in the fully specified `ip route 10.2.0.0 255.255.0.0 g0/1 10.0.12.2`.",
   "There are four types to know. A network route points to a subnet, such as `ip route 192.168.20.0 255.255.255.0 10.0.12.2`. A host route points to one address with a /32 mask, such as `ip route 192.168.20.50 255.255.255.255 10.0.13.2`, useful for steering traffic to one server over a particular path. A default route matches everything with 0.0.0.0 0.0.0.0 and becomes the gateway of last resort: `ip route 0.0.0.0 0.0.0.0 203.0.113.1`. A branch with a single WAN link often needs nothing else. A floating static route is a backup, configured with an administrative distance (AD) higher than the primary route's, so it stays out of the routing table while the primary exists.",
   "For example, if OSPF (Open Shortest Path First, AD 110) provides the primary path to head office, `ip route 10.0.0.0 255.0.0.0 172.31.1.1 120` stays hidden until the OSPF route disappears, and then it is installed. To back up a primary static route (AD 1), give the floating route any AD above 1. A floating route with a lower AD than the primary would replace it instead of backing it up. Note that a static route is removed when its exit interface goes down, but a next-hop-only route over Ethernet can stay installed if the link stays up even though the next hop has failed, which is one reason dynamic protocols or tracking are used for important failover.",
   "IPv6 static routes work the same way with `ipv6 route`, after enabling `ipv6 unicast-routing`. Examples: a network route `ipv6 route 2001:db8:acad:2::/64 2001:db8:0:12::2`, a host route with /128, a default route `ipv6 route ::/0 2001:db8:0:12::2`, and a floating static by adding a distance at the end. If you use a link-local address as the next hop, you must also specify the exit interface, because the same fe80 address can exist on every link: `ipv6 route ::/0 g0/0 fe80::2`.",
   "Consider a worked example. A branch router uses OSPF over an MPLS (Multiprotocol Label Switching) circuit and has a broadband VPN (virtual private network) as backup. The engineer adds `ip route 0.0.0.0 0.0.0.0 198.51.100.1 250`. While OSPF supplies a default route with AD 110, the static stays hidden and `show ip route static` shows nothing. When the MPLS link fails and OSPF withdraws its route, `show ip route` shows `S* 0.0.0.0/0 [250/0] via 198.51.100.1` and traffic continues over broadband. When MPLS returns, the OSPF default comes back and the static floats out again.",
   "Common mistakes: giving a floating static a lower AD than the primary; writing the mask as a prefix length in IPv4 (IOS needs dotted decimal); pointing a next hop at your own interface address; omitting the exit interface with a link-local IPv6 next hop; and forgetting the return path. Routing must work in both directions, so the remote router needs a route back to your networks. Verify with `show ip route static`, `show ipv6 route static`, ping and traceroute.",
   "Exam questions use steady wording. 'Stub network with one exit' points to a default static route. 'Route to a single server' is a host route with /32 or /128. 'Backup route used only when the primary fails' is a floating static with a higher AD. 'Includes both interface and next hop' is fully specified. 'Link-local next hop' requires an exit interface. 'Ping works one way only' suggests a missing return route."
  ],
  "terms": [
   [
    "Default route",
    "A route to 0.0.0.0/0 (or ::/0) that matches any destination not otherwise matched."
   ],
   [
    "Network route",
    "A static route to a whole subnet, such as 192.168.20.0/24."
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
  "example": "A small office router has one internet link and an internal LAN, so the engineer configures only `ip route 0.0.0.0 0.0.0.0 203.0.113.1` and `ipv6 route ::/0 g0/0 fe80::1` toward the provider. A security camera recorder at head office must always use the private WAN link, so she adds a host route, `ip route 10.8.8.20 255.255.255.255 172.31.0.2`, which longest match prefers over the default.",
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
   ],
   [
    "Write an IPv4 host route to 192.168.20.50 via next hop 10.0.13.2.",
    "ip route 192.168.20.50 255.255.255.255 10.0.13.2"
   ]
  ]
 },
 {
  "t": "Single-area OSPFv2: neighbors and adjacencies, point-to-point vs broadcast networks, DR/BDR election",
  "body": [
   "OSPF (Open Shortest Path First) is an open-standard link-state routing protocol, and OSPFv2 carries IPv4 routes. Instead of passing whole routing tables between neighbours, each OSPF router describes its own links in link-state advertisements (LSAs), floods them so every router in the area holds an identical link-state database (LSDB), and runs the SPF (shortest path first) algorithm to compute the best routes. In a single-area design, all routers are in area 0, the backbone. OSPF's metric is cost, based by default on interface bandwidth.",
   "OSPF routers discover each other by sending hello packets to the multicast address 224.0.0.5 out every OSPF-enabled interface. On broadcast and point-to-point networks the default hello interval is 10 seconds and the dead interval, how long to wait before declaring a neighbour down, is 40 seconds. To become neighbours, two routers must agree on several hello parameters: area ID, subnet and mask, hello and dead timers, authentication and stub flags, and they must have different router IDs. A mismatch in any of these stops the relationship from forming.",
   "A neighbour relationship progresses through states: Down, Init (I have heard your hello), 2-Way (each sees itself listed in the other's hellos), ExStart and Exchange (agree on who leads the exchange and swap database summaries), Loading (request LSAs I lack) and Full (databases synchronized). A router that is Full with a neighbour has an adjacency with it. The network type changes what happens next. On a point-to-point link, such as a serial link or an Ethernet link configured with `ip ospf network point-to-point`, only two routers exist, so they simply become fully adjacent with no election. On a broadcast multi-access network such as Ethernet, the default for Ethernet interfaces, many routers can share the segment, and if every router became fully adjacent with every other, flooding would scale poorly. So OSPF elects a designated router (DR) and a backup designated router (BDR).",
   "On a broadcast segment, every router forms a full adjacency only with the DR and BDR. Routers that are neither, called DROTHERs, stay in the 2-Way state with each other, which is normal. DROTHERs send updates to the DR and BDR at 224.0.0.6, and the DR refloods them to everyone at 224.0.0.5. The BDR takes over if the DR fails. The election uses the interface OSPF priority first: highest wins, default 1, range 0 to 255, and priority 0 means never DR or BDR. If priorities tie, the highest router ID wins, and the second-best becomes BDR. The election is not preemptive: a new router with a higher priority does not take over until the DR fails or the OSPF process is reset. Set priority with `ip ospf priority 100` on the interface.",
   "Verify with `show ip ospf neighbor`, which lists each neighbour's router ID, priority, state such as FULL/DR, FULL/BDR, FULL/- (point-to-point) or 2WAY/DROTHER, dead time, address and interface. `show ip ospf interface g0/0` shows the network type, DR and BDR, timers and cost. Using point-to-point on an Ethernet link between exactly two routers is a common design choice: it skips the election, removes the wait before adjacency forms, and simplifies the LSDB.",
   "Consider a worked example. Four routers share an Ethernet VLAN. On R4, `show ip ospf neighbor` shows R1 as FULL/DR, R2 as FULL/BDR and R3 as 2WAY/DROTHER. A junior engineer thinks R3 is broken, but this is normal: DROTHERs fully peer only with the DR and BDR. The team wants R2 as DR, so they set `ip ospf priority 200` on R2 and `ip ospf priority 0` on R3 and R4, then reset OSPF during a maintenance window; afterwards R2 is DR and R1 BDR. Between R1 and R5 over a point-to-point link, the state is FULL/- with no election.",
   "Common mistakes: treating 2WAY/DROTHER as a fault; expecting a higher-priority router to take over the DR role immediately; comparing router IDs before priority; forgetting that priority 0 removes a router from the election; and ignoring timer or area mismatches when neighbours never appear. A neighbour stuck in INIT, EXSTART or EXCHANGE is the real sign of trouble, often a one-way path or an MTU (maximum transmission unit) mismatch in the ExStart and Exchange stages.",
   "Exam wording is consistent. 'Default network type on Ethernet' is broadcast, which elects a DR and BDR. 'No election' means point-to-point. 'Highest priority, then highest router ID' decides the DR. 'Priority 0' means never DR. 'New router with higher priority joins' means no change until reset. '224.0.0.5' is all OSPF routers and '224.0.0.6' is DR and BDR. 'FULL' means adjacency; '2WAY between DROTHERs' is expected."
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
    "Hello and dead intervals",
    "OSPF timers (10 and 40 seconds by default on broadcast and point-to-point links) that must match between neighbours."
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
  "example": "Two data-center routers connect over a dedicated Ethernet link. Because the link has only two routers, the engineer configures `ip ospf network point-to-point` on both ends. `show ip ospf neighbor` shows FULL/- instead of FULL/DR, the adjacency forms faster after a reload, and the database no longer needs a network LSA for that segment.",
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
   ],
   [
    "Name three hello parameters that must match for two OSPF routers to become neighbours.",
    "Any three of: area ID, subnet and mask, hello interval, dead interval, authentication and stub area flag."
   ]
  ]
 },
 {
  "t": "OSPF router ID selection and configuration (network statements vs interface commands, passive interfaces)",
  "body": [
   "Every OSPF (Open Shortest Path First) router needs a router ID (RID), a 32-bit value written like an IPv4 address that identifies it in the link-state database (LSDB), in neighbour tables and in DR (designated router) elections. It does not have to be a reachable address, but it must be unique within the OSPF domain. Knowing how the RID is chosen, and the two ways to enable OSPF on interfaces, lets you read and write almost any CCNA OSPF configuration.",
   "IOS picks the router ID in this order. First, a manually configured `router-id` under the OSPF process. If there is none, the highest IPv4 address on any up loopback interface. If there are no loopbacks, the highest IPv4 address on any up physical interface. 'Highest' means the numeric address, not the interface number. Loopbacks are preferred because they never go down unless deliberately shut, which keeps the RID stable. Best practice is to set it explicitly: `router ospf 1` then `router-id 1.1.1.1`. The RID is chosen when the process starts and does not change on its own. If you change it, IOS says it will take effect after a reload or `clear ip ospf process`. Duplicate router IDs cause adjacency failures and log messages, so a copied configuration that repeats a RID is a common lab mistake.",
   "There are two ways to enable OSPF on interfaces. The traditional way uses network statements under the process: `network 10.1.1.0 0.0.0.255 area 0`. The address and wildcard mask form a pattern: any interface whose IP address matches runs OSPF in that area, and its connected subnet is advertised. The wildcard is an inverse mask, where 0 bits must match and 1 bits are ignored. You can be broad (`network 10.0.0.0 0.255.255.255 area 0`) or precise, matching exactly one interface with `network 10.1.1.1 0.0.0.0 area 0`. The network statement does not decide which prefix is advertised; the interface's own address and mask do. The newer way is to enable OSPF directly on the interface: `interface g0/1` then `ip ospf 1 area 0`. It is explicit and easy to read, and it takes precedence over a network statement for that interface. Both methods produce the same result, and the exam expects you to read either.",
   "```text\nrouter ospf 1\n router-id 1.1.1.1\n network 192.168.10.0 0.0.0.255 area 0\n passive-interface g0/2\n!\ninterface g0/1\n ip ospf 1 area 0\n```",
   "A passive interface is one where OSPF still advertises the connected subnet but sends no hellos, so no neighbours form. Use it on LAN interfaces facing users, where there are no routers: it stops unnecessary hellos and prevents a rogue device from forming an adjacency and injecting routes. Configure `passive-interface g0/2`, or make all interfaces passive with `passive-interface default` and re-enable the ones that need neighbours with `no passive-interface g0/0`. Loopback interfaces are advertised as /32 host routes by default; `ip ospf network point-to-point` on the loopback advertises its configured mask instead. Verify with `show ip protocols`, which shows the RID, network statements, passive interfaces and routing sources, and `show ip ospf interface brief`, which lists OSPF interfaces with their area, cost and state.",
   "Consider a worked example. R2 has loopback 0 at 2.2.2.2 and interfaces 10.0.12.2 and 192.168.20.1, with no router-id command, so its RID is 2.2.2.2 from the loopback, even though 192.168.20.1 is numerically higher. The engineer adds `router-id 22.22.22.22`, sees the message that it takes effect after a reload or clear, and runs `clear ip ospf process` in a maintenance window. She enables OSPF with `network 10.0.12.0 0.0.0.3 area 0` and `ip ospf 1 area 0` on g0/2, then makes g0/2 passive so the user PCs on 192.168.20.0/24 never receive hellos while the subnet is still advertised to R1.",
   "Common mistakes: expecting a new router-id to apply immediately; picking a physical address when a loopback exists; writing a subnet mask where a wildcard belongs; thinking a network statement sets the advertised prefix length; making a router-facing link passive and then wondering why the neighbour disappeared; and forgetting that passive interfaces are still advertised.",
   "Exam clue words: 'no router-id configured' means check loopbacks first; 'stop hellos on a user LAN but keep advertising it' means passive-interface; 'enable OSPF on one interface without a network statement' means `ip ospf <process> area <area>`; and 'neighbours do not form, duplicate RID in the log' means fix the router ID."
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
   ],
   [
    "clear ip ospf process",
    "Command that restarts OSPF so a changed router ID takes effect, briefly dropping adjacencies."
   ]
  ],
  "example": "A lab team copies R3's configuration to build R4 and forgets to change `router-id 3.3.3.3`. The two routers never form a stable adjacency and the log reports a duplicate router ID. Changing R4 to `router-id 4.4.4.4` and running `clear ip ospf process` brings the neighbour to FULL, and `show ip protocols` confirms the new ID.",
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
   ],
   [
    "You change the router-id on a running OSPF router. When does it take effect?",
    "After a reload or clear ip ospf process, because the RID is only chosen when the OSPF process starts."
   ]
  ]
 },
 {
  "t": "OSPF cost and reference bandwidth",
  "body": [
   "OSPF (Open Shortest Path First) chooses paths using a metric called cost. Every OSPF-enabled interface has a cost, and the cost of a route is the sum of the outgoing interface costs along the path from this router to the destination. The route with the lowest total cost wins, and when two or more routes tie, OSPF installs them all and load-balances across them (up to four equal-cost paths by default on IOS). Because cost is a simple additive number, you can predict OSPF's choices on paper and tune them precisely, which is exactly what exam questions ask you to do.",
   "By default, IOS calculates interface cost as the reference bandwidth divided by the interface bandwidth, rounded down and never less than 1. The default reference bandwidth is 100 Mbps. So a 10 Mbps Ethernet interface costs 10, a 100 Mbps FastEthernet interface costs 1, and a 1 Gbps or 10 Gbps interface also costs 1, because the result cannot drop below 1. A serial link with the default bandwidth of 1544 kbps costs 64 (100,000 divided by 1544, rounded down). With the default reference, OSPF cannot tell FastEthernet from 10 Gigabit Ethernet, which leads to poor path choices in modern networks where almost every link is 100 Mbps or faster.",
   "The fix is to raise the reference bandwidth under the OSPF process with `auto-cost reference-bandwidth`. The value is entered in Mbps. With `auto-cost reference-bandwidth 100000` (100 Gbps), a 100 Gbps link costs 1, 10 Gbps costs 10, 1 Gbps costs 100 and 100 Mbps costs 1000. Set the same reference on every router in the OSPF domain; otherwise routers compute costs on different scales and paths become inconsistent or even asymmetric. IOS prints a reminder to do exactly that when you enter the command.",
   "```text\nrouter ospf 1\n auto-cost reference-bandwidth 100000\n!\ninterface g0/1\n ip ospf cost 50\n!\ninterface g0/2\n bandwidth 50000\n```",
   "You can override the calculation per interface in two ways, shown above. `ip ospf cost 50` sets the cost directly and takes precedence over any bandwidth-based calculation. Alternatively, `bandwidth 50000` sets the interface's bandwidth value in kilobits per second, which changes the calculated cost. The `bandwidth` command does not change the real link speed or how fast frames leave the port; it only changes the number that protocols such as OSPF and EIGRP (Enhanced Interior Gateway Routing Protocol) use in their calculations. Setting the cost directly is usually clearer, because `bandwidth` also affects other features. Remember that cost is applied on the outgoing interface only. When calculating a path from R1 to a LAN behind R3, you add R1's exit interface cost toward R2, R2's exit interface cost toward R3, and R3's interface cost on the destination LAN. A path can therefore have a different total cost in each direction if interface costs differ.",
   "Consider a worked example. R1 reaches the 10.3.3.0/24 LAN on R3 through two paths. Path A goes R1 to R3 directly over a 100 Mbps link. Path B goes R1 to R2 over 1 Gbps and R2 to R3 over 1 Gbps. With the default reference, path A costs 1 (link) plus 1 (R3's LAN interface) = 2, while path B costs 1 + 1 + 1 = 3, so OSPF picks the slower direct link. After you set `auto-cost reference-bandwidth 10000` on all three routers, the 100 Mbps link costs 100, each 1 Gbps link costs 10, and a 1 Gbps LAN interface costs 10. Path A becomes 100 + 10 = 110 and path B becomes 10 + 10 + 10 = 30, so OSPF now correctly prefers the faster path through R2. In `show ip route` you would see `[110/30]`, where 110 is the administrative distance and 30 is the total cost.",
   "Common mistakes: entering the reference bandwidth in kbps instead of Mbps, or the interface `bandwidth` in Mbps instead of kbps; changing the reference on only one router; forgetting to include the destination LAN interface cost when adding up a path; adding the incoming interface costs instead of the outgoing ones; and believing `bandwidth` speeds up or slows down a link. To verify your work, `show ip ospf interface brief` lists each interface's cost, `show ip ospf interface g0/0` shows the cost with other details, and `show ip protocols` or `show ip ospf` confirms the reference bandwidth in use.",
   "Exam questions usually give a small topology with link speeds and ask which path OSPF chooses or what the metric in the routing table will be. Clue words such as 'all links are 1 Gbps and 10 Gbps but OSPF load-balances between them' point to the default reference bandwidth making both cost 1, so the answer is `auto-cost reference-bandwidth`. 'Force traffic onto a specific link without changing other protocols' points to `ip ospf cost`. A number such as [110/65] asks you to recognize AD 110 and a cost of 65, perhaps a serial link (64) plus a FastEthernet LAN (1). When a question says 'lowest cost' or 'sum of outgoing interfaces', do the arithmetic carefully, and always check whether the question uses the default reference."
  ],
  "terms": [
   [
    "Cost",
    "The OSPF metric of an interface; a route's cost is the sum of outgoing interface costs to the destination."
   ],
   [
    "Reference bandwidth",
    "The value divided by interface bandwidth to compute cost; 100 Mbps by default and set in Mbps with auto-cost reference-bandwidth."
   ],
   [
    "ip ospf cost",
    "An interface command that sets the OSPF cost directly, overriding the bandwidth-based calculation."
   ],
   [
    "bandwidth (interface)",
    "An interface command in kbps that changes the value routing protocols use for calculations, not the real link speed."
   ],
   [
    "Equal-cost multipath",
    "Installing several routes with the same lowest cost and load-balancing traffic across them."
   ],
   [
    "Administrative distance",
    "The trustworthiness of a route source; OSPF's default is 110, shown first in brackets in the routing table."
   ]
  ],
  "example": "A company upgrades its core links to 10 Gbps but keeps a few 1 Gbps paths as backups. Users notice that traffic is split evenly between the fast and slow links, and the backup links saturate at busy times. The engineer checks `show ip ospf interface brief` and sees every interface with cost 1. She sets `auto-cost reference-bandwidth 100000` on every router, the 10 Gbps links drop to cost 10 and the 1 Gbps links rise to 100, and OSPF now sends traffic over the core links, using the backups only on failure.",
  "tip": "Default reference bandwidth is 100 Mbps, so anything 100 Mbps or faster costs 1. The auto-cost value is in Mbps, while the interface bandwidth command is in kbps, and cost is added on outgoing interfaces only.",
  "check": [
   [
    "With the default reference bandwidth, what is the OSPF cost of a 1 Gbps interface and a 10 Gbps interface?",
    "Both cost 1, because 100 Mbps divided by any speed of 100 Mbps or more rounds to below 1 and cost cannot be less than 1."
   ],
   [
    "After `auto-cost reference-bandwidth 10000`, what is the cost of a 1 Gbps interface?",
    "10, because 10,000 Mbps divided by 1,000 Mbps is 10."
   ],
   [
    "Which command changes only OSPF's cost on an interface without affecting other protocols' view of bandwidth?",
    "`ip ospf cost <value>`, which overrides the calculation directly, whereas `bandwidth` changes the value all protocols see."
   ],
   [
    "Why must the reference bandwidth be the same on every router?",
    "Otherwise routers calculate costs on different scales, so path choices become inconsistent and traffic may take unexpected or asymmetric paths."
   ]
  ]
 },
 {
  "t": "OSPF adjacency requirements: area, subnet, hello/dead timers, MTU, authentication, unique router ID",
  "body": [
   "Two OSPF (Open Shortest Path First) routers on the same link will not always become neighbours. OSPF checks several parameters inside hello packets, and some more during the database exchange that follows, and if they disagree the relationship stalls. Knowing each requirement, and the neighbour state where each mismatch leaves the routers, lets you diagnose adjacency problems in seconds rather than guessing, and it is a favourite exam topic.",
   "The following must match in the hello packets, or the routers ignore each other and never get past Down or Init. The area ID: both interfaces must be in the same area, such as area 0. The subnet and mask: on broadcast and point-to-point Ethernet links, both interfaces must be in the same subnet with the same mask. The hello and dead intervals: if one router uses 10 and 40 seconds (the defaults on broadcast and point-to-point links) and the other uses 5 and 20, they will not become neighbours. Authentication: if one side uses OSPF authentication and the other does not, or the keys differ, hellos are rejected. The stub area flag must also match, though stub areas are beyond single-area CCNA scope.",
   "Router IDs (RIDs) must be unique. The RID is a 32-bit value written like an IPv4 address, chosen from the `router-id` command, else the highest loopback address, else the highest active physical interface address. If two routers have the same RID, they will not form an adjacency, and IOS logs a duplicate router-id message. This often happens when a configuration is copied between routers including the `router-id` line. After changing a RID you must run `clear ip ospf process` for it to take effect.",
   "MTU (maximum transmission unit) is not in the hello, so it is checked later, during database exchange. If the interface MTUs differ, the routers see each other and reach ExStart or Exchange, but the database description packets are rejected and they get stuck there. The fix is to make the MTU values match with the `ip mtu` or `mtu` interface command; `ip ospf mtu-ignore` exists but hides the real issue.",
   "Other conditions also prevent adjacency. A passive interface (`passive-interface g0/1`) sends no hellos, so no neighbour forms on it, although its subnet is still advertised. An interface not enabled for OSPF by a `network` statement or an `ip ospf 1 area 0` command sends nothing. An ACL (access control list) that blocks OSPF, which is IP protocol 89, or the 224.0.0.5 and 224.0.0.6 multicast addresses breaks hellos. On broadcast segments, if both routers have priority 0, neither can become DR (designated router), so no full adjacency forms. A network type mismatch, one side broadcast and the other point-to-point, may still reach Full, but routes may not install properly because the two sides describe the link differently. Process IDs, by contrast, are locally significant and do not need to match.",
   "```text\nR1# show ip ospf interface g0/0\n  Internet Address 10.0.12.1/24, Area 0\n  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n```",
   "Consider a worked example. R1 and R2 connect on 10.0.12.0/24, but `show ip ospf neighbor` on R1 is empty. You run `show ip ospf interface g0/0` on both. R1 shows Area 0, /24, Hello 10, Dead 40. R2 shows Area 0, /24, Hello 5, Dead 20, because someone set `ip ospf hello-interval 5` while testing. Fixing R2 with `no ip ospf hello-interval` restores the defaults, and within seconds the neighbour moves through Init, 2-Way, ExStart, Exchange and Loading to Full. Had the neighbour instead been stuck in ExStart, you would have compared `show interfaces` MTU values. `debug ip ospf adj` and `debug ip ospf hello`, used carefully in a lab, print messages such as 'mismatched hello parameters' or authentication errors that confirm the cause.",
   "Common mistakes: thinking the OSPF process ID must match (it does not); assuming a passive interface stops the subnet being advertised (it only stops hellos); forgetting that MTU is not part of the hello; setting the same `router-id` on two routers; and blaming a mismatched priority, which never blocks adjacency unless both sides are 0. Exam questions often show two outputs side by side. Clue words map cleanly: 'no neighbour at all' points to area, subnet or mask, timers, authentication, a passive interface or a duplicate RID; 'stuck in EXSTART or EXCHANGE' points to MTU; 'Init only' points to one-way hellos, often an ACL; and 'process IDs differ' is a distractor, because they are local."
  ],
  "terms": [
   [
    "Hello packet",
    "An OSPF message sent to 224.0.0.5 that discovers neighbours and carries parameters that must match."
   ],
   [
    "Hello and dead intervals",
    "How often hellos are sent and how long to wait before declaring a neighbour down; 10 and 40 seconds by default on Ethernet."
   ],
   [
    "Router ID (RID)",
    "A unique 32-bit identifier for each OSPF router, written like an IPv4 address."
   ],
   [
    "MTU mismatch",
    "Different maximum packet sizes on the two ends, which leaves neighbours stuck in ExStart or Exchange."
   ],
   [
    "Passive interface",
    "An OSPF interface that advertises its subnet but sends no hellos, so no neighbours form on it."
   ],
   [
    "Process ID",
    "The locally significant number in router ospf; it does not need to match between neighbours."
   ],
   [
    "Area ID",
    "The OSPF area an interface belongs to; both ends of a link must use the same area."
   ]
  ],
  "example": "After a branch router is replaced, it never forms an OSPF adjacency with headquarters. The engineer compares `show ip ospf interface` on both ends: area, mask and timers match, but the new router's log shows a duplicate router-id message. The technician had pasted the old router's configuration into the new one, including `router-id 2.2.2.2`, while the old router was still connected for testing. Changing the RID and running `clear ip ospf process` brings the neighbour to Full.",
  "tip": "Neighbours stuck in EXSTART or EXCHANGE point to an MTU mismatch. No neighbour at all points to hello-level mismatches: area, subnet and mask, timers, authentication, a passive interface or a duplicate router ID. Process IDs never need to match.",
  "check": [
   [
    "Which neighbour state suggests an MTU mismatch?",
    "ExStart or Exchange, because MTU is checked in database description packets after the hello stage succeeds."
   ],
   [
    "Do two OSPF neighbours need the same process ID?",
    "No, the process ID is locally significant; area, subnet, timers, authentication and unique router IDs are what must line up."
   ],
   [
    "R1 uses hello 10 and dead 40, R2 uses hello 5 and dead 20. What happens?",
    "They never become neighbours, because hello and dead intervals must match in the hello packet."
   ],
   [
    "What does a passive interface do to OSPF on that link?",
    "It stops hellos so no adjacency forms, but the interface's subnet is still advertised to other neighbours."
   ]
  ]
 },
 {
  "t": "First hop redundancy: HSRP and VRRP virtual IP, priority, preemption",
  "body": [
   "Hosts are normally configured with a single default gateway. If that router fails, hosts lose all off-subnet connectivity even when a second router is sitting on the same subnet, because they have no way to switch gateways on their own. First hop redundancy protocols (FHRPs) solve this by letting two or more routers share a virtual IP address and a virtual MAC (media access control) address that hosts use as their gateway. One router actively forwards; another takes over if it fails, and hosts notice nothing because the gateway IP and MAC they already know stay the same.",
   "HSRP (Hot Standby Router Protocol) is Cisco proprietary. Routers in an HSRP group elect one active router, which answers ARP (Address Resolution Protocol) requests for the virtual IP with the virtual MAC and forwards traffic, and one standby router, which monitors the active router's hellos and takes over if they stop. Other routers in the group listen. The virtual MAC is derived from the group number: 0000.0c07.acXX for HSRPv1 and 0000.0c9f.fXXX for HSRPv2, where the Xs are the group number in hexadecimal. HSRPv2 supports more group numbers, IPv6 and millisecond timers, and versions must match within a group.",
   "Election uses priority, default 100, with the highest winning; if priorities tie, the highest interface IP address wins. Preemption is disabled by default in HSRP. That means if a higher-priority router boots after another has become active, it does not take over until the active router fails. To make your intended router active whenever it is healthy, configure both a higher priority and `preempt`. Object tracking can lower priority automatically when an uplink fails so that the other router, if it preempts, takes over.",
   "```text\ninterface g0/1\n ip address 192.168.10.2 255.255.255.0\n standby version 2\n standby 10 ip 192.168.10.1\n standby 10 priority 110\n standby 10 preempt\n```",
   "VRRP (Virtual Router Redundancy Protocol) is the open standard equivalent. Its roles are master and backup rather than active and standby. Priority also defaults to 100 with highest winning, but preemption is enabled by default. VRRP allows the virtual IP to be the real address of one router's interface; that router is the address owner and gets priority 255, so it is always master when up. The VRRP virtual MAC is 0000.5e00.01XX, where XX is the group number. GLBP (Gateway Load Balancing Protocol) is another Cisco FHRP that load-balances by giving different hosts different virtual MACs, but HSRP and VRRP are the CCNA focus. Neither HSRP nor VRRP load-balances a single group; to share load you run two groups with different active routers and give half the hosts each gateway.",
   "Consider a worked example. R1 (192.168.10.2) and R2 (192.168.10.3) serve VLAN 10, and DHCP hands out 192.168.10.1 as the gateway. R1 has priority 110 with preempt, R2 has the default 100. R1 is active. When R1 reloads, R2 stops hearing hellos, becomes active after the hold time and starts answering for the virtual MAC; the switch learns the MAC on R2's port from R2's gratuitous ARP, and user sessions continue. When R1 returns, preempt lets it reclaim the active role. Without `preempt` on R1, R2 would stay active until it failed. `show standby brief` on R1 would show group 10, priority 110, a P flag, state Active, and R2 listed as standby.",
   "Common mistakes: pointing hosts at a router's real address instead of the virtual IP, which removes the benefit; assuming HSRP preempts by default; mismatching group numbers, virtual IPs or versions across routers; and misreading 'two routers both Active', which usually means they cannot hear each other's hellos because of a VLAN or trunk problem between them. Verify HSRP with `show standby brief` (group, priority, P flag, state, active and standby routers, virtual IP) and VRRP with `show vrrp brief`. Also remember that an FHRP protects only the gateway itself: if the active router's WAN uplink fails but its LAN interface stays up, it keeps attracting traffic unless you use object tracking to lower its priority, and the standby router is configured to preempt.",
   "Exam questions usually test vocabulary and defaults. 'Cisco proprietary, active and standby' means HSRP; 'open standard, master and backup' means VRRP; 'load-balance with multiple virtual MACs in one group' means GLBP. 'A higher-priority router came back but did not take over' points to missing preemption in HSRP. A MAC such as 0000.0c07.ac0a identifies HSRPv1 group 10, and 0000.5e00.0105 identifies VRRP group 5. 'Priority 255' means the VRRP address owner."
  ],
  "terms": [
   [
    "FHRP",
    "First hop redundancy protocol: routers share a virtual gateway IP and MAC so hosts keep working if one router fails."
   ],
   [
    "HSRP",
    "Hot Standby Router Protocol, Cisco proprietary, with active and standby roles and preemption off by default."
   ],
   [
    "VRRP",
    "Virtual Router Redundancy Protocol, an open standard with master and backup roles and preemption on by default."
   ],
   [
    "Virtual IP",
    "The shared gateway address that hosts are configured to use."
   ],
   [
    "Priority",
    "The election value, default 100, where the highest wins and ties go to the highest interface IP."
   ],
   [
    "Preemption",
    "Allowing a higher-priority router to take over the active or master role when it comes online."
   ],
   [
    "GLBP",
    "Gateway Load Balancing Protocol, a Cisco FHRP that shares load by answering ARP with different virtual MACs."
   ]
  ],
  "example": "A clinic has two routers on its staff VLAN running HSRP with virtual IP 10.20.0.1. During a firmware upgrade on the active router, the standby router takes over within seconds, and the electronic records application stays connected. After the upgrade, the first router reclaims the active role because the engineer configured priority 110 and preempt on it, keeping traffic on the router with the better WAN link.",
  "tip": "HSRP: active/standby, Cisco only, preempt off by default. VRRP: master/backup, open standard, preempt on by default. Both default to priority 100 with higher winning, and hosts must use the virtual IP as their gateway.",
  "check": [
   [
    "A higher-priority HSRP router reboots and does not become active again. Why?",
    "HSRP preemption is disabled by default, so it must be configured with `standby <group> preempt`."
   ],
   [
    "What role names does VRRP use?",
    "Master for the forwarding router and backup for the others."
   ],
   [
    "Which address should hosts use as their default gateway in an FHRP design?",
    "The virtual IP, so the gateway stays reachable whichever router is forwarding."
   ],
   [
    "Two HSRP routers both show Active for the same group. What is the likely cause?",
    "They cannot hear each other's hellos, usually because of a VLAN, trunk or connectivity problem between them."
   ]
  ]
 },
 {
  "t": "Troubleshoot IP connectivity with ping, extended ping and traceroute",
  "body": [
   "Ping and traceroute are the first tools you reach for when something cannot be reached. Ping tells you whether a destination answers; traceroute tells you where along the path packets stop. Used together, and with the extended options IOS offers, they let you narrow a failure down to a specific router or link instead of guessing, and the CCNA exam expects you to read their output fluently.",
   "Ping sends ICMP (Internet Control Message Protocol) echo requests and waits for echo replies. On IOS, each result is shown as a symbol: `!` means a reply arrived, `.` means the request timed out with no reply, and `U` means a router along the path sent back a destination unreachable message. You may also see `M` (could not fragment, often from an MTU problem with the don't-fragment bit set) and `&` (packet lifetime exceeded). The summary shows the success rate and minimum, average and maximum round-trip times. It is common for the first ping to a new destination on an Ethernet segment to time out while ARP (Address Resolution Protocol) resolves the next hop, giving `.!!!!`, which is normal.",
   "The meaning of `.` versus `U` matters. `U` means some router had no route or was told to reject the packet, and it said so. `.` means nothing came back: the packet may have been dropped, the reply may have been lost on the return path, or a firewall or ACL (access control list) may be silently discarding it. Always remember that a successful ping requires routing in both directions. A missing return route on a remote router produces timeouts even though your router's forward route is fine.",
   "Extended ping lets you control the test. Type `ping` alone at privileged EXEC and answer the prompts, or put options on one line, such as `ping 10.3.3.3 source g0/1 repeat 100 size 1500 df-bit`. Setting the source interface is the most useful option. A normal ping from a router uses the exit interface's address as the source, which the remote side usually knows how to reach because it is a directly connected link. Sourcing from a LAN interface tests whether the remote network has a route back to that LAN, just as a user's PC would need. The repeat count reveals intermittent loss, and a large size with the don't-fragment bit set tests the path MTU (maximum transmission unit).",
   "Traceroute discovers each hop by sending probes with increasing TTL (time to live) values. The first probe has TTL 1, so the first router decrements it to 0, drops it and returns an ICMP time exceeded message, revealing its address. The next probe has TTL 2, and so on, until the destination replies. IOS and Linux `traceroute` send UDP (User Datagram Protocol) probes to high port numbers by default, and the destination answers with port unreachable; Windows `tracert` uses ICMP echo requests. An asterisk means no reply within the timeout for that probe. Several hops followed by only asterisks tells you traffic stops after the last responding router, which is where to look for a missing route, a down link or a filter. Hops that repeat, with two routers alternating, indicate a routing loop.",
   "Consider a worked example. Users on R1's LAN 10.1.1.0/24 cannot reach a server at 10.3.3.10 behind R3. From R1, `ping 10.3.3.10` succeeds, so the forward path looks fine. You then run `ping 10.3.3.10 source g0/1`, sourcing from the user LAN, and get `.....`. That proves R3 or the server's gateway has no route back to 10.1.1.0/24. On R3, `show ip route 10.1.1.0` returns '% Subnet not in table'. Adding the missing route, or fixing the routing protocol advertisement on R1, makes the sourced ping succeed, and users connect. Traceroute from a user PC before the fix would have shown hops completing to R3 then asterisks, because replies from the server could not return.",
   "Common mistakes: treating the first timed-out ping as a failure; assuming `.` means the destination is down rather than that something did not reply; forgetting the return path; testing from the router's WAN interface when the users are on the LAN; and concluding a host is unreachable when a firewall simply blocks ICMP. A methodical approach is to ping your own interface, then the local gateway, then the far side of each link, then the destination, and use traceroute to find the last good hop. Then check that hop's `show ip route` for both the destination and the return path.",
   "Exam questions often show output and ask what it proves. 'U.U.U' means a router is returning unreachables, usually no route. 'Five dots' means silent loss, including a missing return route or an ACL. 'The router can ping but users cannot' points to an extended ping sourced from the LAN interface. 'Traceroute shows asterisks after hop 3' points to a problem at or just beyond hop 3. 'Test path MTU' means extended ping with a large size and the DF bit set."
  ],
  "terms": [
   [
    "ICMP",
    "Internet Control Message Protocol, used for echo request and reply, unreachable and time exceeded messages."
   ],
   [
    "Extended ping",
    "A ping with chosen options such as source interface, repeat count, size and the don't-fragment bit."
   ],
   [
    "TTL",
    "Time to live, a counter decremented by each router; at zero the packet is dropped and time exceeded is returned."
   ],
   [
    "Traceroute",
    "A tool that sends probes with increasing TTL to reveal each router hop to a destination."
   ],
   [
    "U (unreachable)",
    "A ping result showing a router returned an ICMP destination unreachable message."
   ],
   [
    "Return route",
    "The route the destination's network needs back to the source; its absence causes timeouts."
   ]
  ],
  "example": "A new branch is connected, and the branch router can ping the data centre, but branch PCs cannot. The engineer runs an extended ping from the branch LAN interface and it fails with timeouts. A traceroute from the data centre towards the branch LAN stops at the core router. The core router had no route to the new branch LAN, because the branch had not been added to the routing protocol. Advertising the LAN fixes both the sourced ping and user access.",
  "tip": "A standard router ping uses the exit interface as its source, which can hide return-route problems. When a question says users fail but the router's ping works, the answer usually involves an extended ping from the LAN interface.",
  "check": [
   [
    "What is the difference between `.` and `U` in IOS ping output?",
    "A dot means no reply arrived before the timeout; U means a router actively returned an ICMP destination unreachable."
   ],
   [
    "Why is `.!!!!` a normal result for a first ping on Ethernet?",
    "The first packet times out while ARP resolves the next-hop MAC address; later packets succeed."
   ],
   [
    "How does traceroute learn the address of each hop?",
    "It sends probes with TTL 1, 2, 3 and so on, and each router that drops a probe at TTL 0 returns an ICMP time exceeded message from its address."
   ],
   [
    "Why would you use `ping <dest> source g0/1` on a router?",
    "To test from a LAN address, proving the remote network has a return route to that LAN, as user PCs require."
   ]
  ]
 },
 {
  "t": "Troubleshoot OSPF neighbor and route problems from show ip ospf output",
  "body": [
   "OSPF (Open Shortest Path First) problems fall into two groups: routers that will not become neighbours, and neighbours that are up while routes are missing or not the ones you expected. A handful of show commands answers nearly every question, and the CCNA exam frequently shows their output and asks for the cause. The skill is reading the output methodically rather than changing configuration at random.",
   "Start with `show ip ospf neighbor`. Healthy neighbours show FULL, with /DR, /BDR or /DROTHER on broadcast links, or /- on point-to-point links. On a broadcast segment, 2WAY/DROTHER between two routers that are both DROTHER is also healthy, because non-DR (designated router) routers only form full adjacencies with the DR and BDR (backup designated router). If a neighbour you expect is missing entirely, the routers are not exchanging valid hellos: check that OSPF is enabled on both interfaces, that neither is passive, that area, subnet and mask, hello and dead timers and authentication match, and that router IDs differ. A neighbour stuck in INIT means this router hears the other but the other does not list it back, suggesting one-way traffic, such as an ACL (access control list) blocking OSPF in one direction. EXSTART or EXCHANGE points to an MTU (maximum transmission unit) mismatch.",
   "Next, `show ip ospf interface` (or `show ip ospf interface brief`) shows each OSPF interface's area, IP address and mask, cost, network type, state (DR, BDR, DROTHER, P2P), the DR and BDR, timers and neighbour count. Comparing this output from both ends is the fastest way to spot mismatched area, mask, timers or network type. If an interface you expect is absent from the brief output, OSPF is not enabled there: fix the `network` statement wildcard or add `ip ospf 1 area 0` on the interface.",
   "`show ip protocols` shows the router ID, the network statements with wildcards and areas, the passive interfaces, the reference bandwidth and the neighbours the router is learning routes from. A typo such as `network 10.1.1.0 0.0.0.255 area 1` on one router instead of area 0 shows up here. `show ip ospf` shows the router ID, reference bandwidth, areas and how many times SPF (shortest path first) has run; a rapidly climbing SPF count suggests a flapping link.",
   "If neighbours are FULL but a route is missing, check that the remote router actually advertises the network: its interface must be up and included in OSPF, even if passive. Check `show ip ospf database` to see whether the LSA (link-state advertisement) exists in your LSDB (link-state database). If the LSA is present but the route is not installed, a route with a better administrative distance may have been installed instead, such as a static route with AD 1, or a network type mismatch may be preventing SPF from using the link. If the route is present but uses an unexpected path, compare costs with `show ip ospf interface brief` and check that the reference bandwidth is consistent on every router.",
   "```text\nR1# show ip ospf neighbor\nNeighbor ID  Pri  State           Dead Time  Address     Interface\n2.2.2.2        1  FULL/DR         00:00:35   10.0.12.2   Gi0/0\n3.3.3.3        1  EXSTART/DROTHER 00:00:33   10.0.13.3   Gi0/1\n```",
   "Consider a worked example. In the output above, R2 is healthy and R3 is stuck in EXSTART, so you compare MTU on R1 Gi0/1 and on R3's interface with `show interfaces`, find 1500 on one side and 1400 on the other, and set them to match. Now suppose R3 reaches FULL but R1 still has no route to R3's LAN 10.3.3.0/24. `show ip ospf database` on R1 shows R3's router LSA without that prefix, so the problem is on R3. There, `show ip protocols` shows `network 10.3.0.0 0.0.0.255 area 0`, a wildcard that does not cover 10.3.3.0. Correcting the statement to `network 10.3.3.0 0.0.0.255 area 0` makes the prefix appear in the database and then in R1's `show ip route ospf` as an O route with [110/cost]. Keep your checks ordered: neighbour state, interface parameters, process configuration, database, then routing table.",
   "Common mistakes: treating 2WAY/DROTHER as a fault; assuming a process ID mismatch blocks adjacency (it does not); forgetting that a passive interface still advertises its subnet; overlooking a static route that beats OSPF on administrative distance; and troubleshooting the router that is missing a route when the fault is on the router that should be advertising it. Exam questions pair clue words with causes: 'no neighbour listed' means hello mismatch or OSPF not enabled; 'INIT' means one-way communication; 'EXSTART/EXCHANGE' means MTU; 'FULL but route missing' means the network is not advertised or a lower-AD route won; 'unexpected path' means cost or reference bandwidth."
  ],
  "terms": [
   [
    "show ip ospf neighbor",
    "Lists each neighbour's router ID, priority, state, dead timer, address and interface."
   ],
   [
    "FULL",
    "The neighbour state where link-state databases are synchronized and the adjacency is complete."
   ],
   [
    "2WAY",
    "A state where bidirectional communication exists; normal between two DROTHER routers on a broadcast segment."
   ],
   [
    "INIT",
    "A state where a router hears a neighbour's hello but is not listed in it, indicating one-way communication."
   ],
   [
    "LSDB",
    "Link-state database, the collection of LSAs from which each router runs SPF to compute routes."
   ],
   [
    "show ip protocols",
    "Shows the OSPF router ID, network statements, passive interfaces, reference bandwidth and routing sources."
   ]
  ],
  "example": "After a maintenance window, a branch loses its route to the data centre. `show ip ospf neighbor` shows the WAN neighbour in INIT. The engineer checks the WAN interface and finds a new inbound ACL that permits only TCP and UDP traffic, so OSPF hellos (IP protocol 89) from headquarters are dropped while the branch's own hellos still leave. Adding a permit for OSPF above the implicit deny moves the neighbour to FULL and the routes return.",
  "tip": "No neighbour at all means hello mismatch or OSPF not enabled; INIT means one-way communication; EXSTART or EXCHANGE means MTU. FULL neighbours with a missing route means the network is not being advertised or a lower-AD route won.",
  "check": [
   [
    "A neighbour shows 2WAY/DROTHER on a broadcast segment. Is that a problem?",
    "No, two DROTHER routers stay at 2-Way; they form full adjacencies only with the DR and BDR."
   ],
   [
    "Which command shows network statements and passive interfaces?",
    "`show ip protocols`, which also shows the router ID and reference bandwidth."
   ],
   [
    "The LSA for a prefix is in the database but the route is not in the routing table as O. What could explain it?",
    "A route with lower administrative distance, such as a static route, was installed instead, or a network type mismatch is stopping SPF from using the link."
   ],
   [
    "An interface is missing from `show ip ospf interface brief`. What does that mean?",
    "OSPF is not enabled on it, usually because no network statement matches its address or no `ip ospf area` command is applied."
   ]
  ]
 },
 {
  "t": "AAA for device access: local usernames, TACACS+ and RADIUS clients",
  "body": [
   "AAA stands for authentication, authorization and accounting. Authentication asks who you are, usually with a username and password. Authorization decides what you are allowed to do, such as which commands you may run or which privilege level you receive. Accounting records what you did and when, for audit and troubleshooting. Applying AAA to routers and switches means administrators log in with individual accounts rather than a shared password, so their actions can be controlled, logged and traced back to a person, and a departing employee's access can be removed in one place.",
   "The simplest method uses local usernames stored on each device. `username admin privilege 15 secret S3cureP@ss` creates an account whose password is stored as a strong hash. On the VTY (virtual terminal) lines, `login local` makes the device check that local database. Local accounts are fine for a few devices, but on dozens of devices, adding or removing a user means touching every one, passwords drift out of sync, and there is no central log of who did what.",
   "Central AAA servers solve that. The network device acts as an AAA client and sends each login to a server, such as Cisco ISE (Identity Services Engine), that holds the accounts or checks them against a directory. There are two protocols. TACACS+ (Terminal Access Controller Access-Control System Plus) was developed by Cisco and uses TCP port 49. It encrypts the entire body of the packet and separates authentication, authorization and accounting, which allows per-command authorization. That makes it the usual choice for administering network devices. RADIUS (Remote Authentication Dial-In User Service) is an open standard that uses UDP, with ports 1812 for authentication and 1813 for accounting (older implementations use 1645 and 1646). It encrypts only the password and combines authentication and authorization in one exchange. RADIUS is the usual choice for network access, such as 802.1X for wired users and Wi-Fi.",
   "Configuration starts with `aaa new-model`, which turns on the AAA framework and immediately changes how login works on the lines, so configure a local fallback account first. Then define the server with its shared key and a method list that says which sources to try, in order.",
   "```text\naaa new-model\nusername admin privilege 15 secret S3cureP@ss\ntacacs server ISE1\n address ipv4 10.1.1.50\n key MySharedKey\naaa authentication login default group tacacs+ local\naaa authorization exec default group tacacs+ local\naaa accounting commands 15 default start-stop group tacacs+\n```",
   "The method list `group tacacs+ local` means: ask the TACACS+ servers; if none respond, fall back to the local database. The fallback happens only when the servers are unreachable or return an error, not when they reject a password; a rejection is final. The `default` list applies to all lines unless a named list is applied to a line with `login authentication <name>`. RADIUS is configured the same way with `radius server` and `group radius`. Verify with `show aaa servers`, which shows server state and counters, and always test a new login from a second session before closing your current one.",
   "Consider a worked example. A network team of eight manages 60 switches with a shared enable password. An auditor asks who changed a VLAN last month, and nobody can say. The team configures TACACS+ on every switch pointing at two ISE nodes, with `local` as fallback and one emergency local account stored in a password vault. Each engineer now logs in with a personal account, junior staff are authorized only for show commands, and command accounting records every configuration change with a username and time. When the ISE servers were once unreachable during a WAN outage, the emergency account still worked because of the local fallback.",
   "Common mistakes: entering `aaa new-model` without a local account and locking yourself out; expecting the local database to be tried after a server rejects a password; mixing up which protocol encrypts the whole payload; and choosing RADIUS when per-command authorization of administrators is required. Exam questions usually compare the two protocols. Clue words 'TCP 49', 'encrypts entire payload', 'separates authorization', 'device administration' or 'command authorization' point to TACACS+. 'UDP 1812/1813', 'open standard', 'only the password encrypted', '802.1X' or 'network access for users' point to RADIUS. 'Record which commands an admin ran' is accounting, and 'what level an admin receives' is authorization."
  ],
  "terms": [
   [
    "AAA",
    "Authentication, authorization and accounting: who you are, what you may do, and what you did."
   ],
   [
    "TACACS+",
    "Cisco-developed AAA protocol on TCP 49 that encrypts the whole payload and separates the three AAA functions."
   ],
   [
    "RADIUS",
    "Open-standard AAA protocol on UDP 1812 and 1813 that encrypts only the password and combines authentication and authorization."
   ],
   [
    "Method list",
    "An ordered list of authentication sources, such as group tacacs+ then local."
   ],
   [
    "aaa new-model",
    "The command that enables the AAA framework on a Cisco IOS device."
   ],
   [
    "Local fallback",
    "Using the device's own username database when AAA servers cannot be reached."
   ],
   [
    "Accounting",
    "Recording sessions and commands, with usernames and times, for audit."
   ]
  ],
  "example": "A university network team moves switch logins from shared passwords to TACACS+ on ISE. Each engineer logs in with a directory account, student technicians receive privilege 1 with only show commands authorized, and every configuration command is logged. Separately, the Wi-Fi uses RADIUS with 802.1X so students authenticate to the network with their own credentials. When an unexpected ACL change appears, accounting records show which account made it and when.",
  "tip": "TACACS+: TCP 49, full-payload encryption, separate AAA functions, device administration. RADIUS: UDP 1812/1813, password-only encryption, combined authentication and authorization, network access. The local fallback applies only when servers do not respond.",
  "check": [
   [
    "Which AAA protocol encrypts the entire packet body and uses TCP?",
    "TACACS+, on TCP port 49, which is why it is preferred for device administration."
   ],
   [
    "With `aaa authentication login default group tacacs+ local`, what happens if the TACACS+ server rejects a password?",
    "The login fails; local is tried only if the servers do not respond, not after a rejection."
   ],
   [
    "Why should you create a local user before typing `aaa new-model`?",
    "AAA changes login behaviour immediately, and without a local account you could lock yourself out if servers are unavailable."
   ],
   [
    "Which AAA function records the commands an administrator entered?",
    "Accounting, for example with `aaa accounting commands 15 default start-stop group tacacs+`."
   ]
  ]
 },
 {
  "t": "Secure management access: SSH version 2, enable secret, VTY access-class, login banners",
  "body": [
   "Anyone who gains administrative access to a router or switch controls the network. Securing management access means encrypting remote sessions, protecting privileged mode with a strong password, restricting who can even attempt a login, and showing a legal warning. These are some of the most commonly configured items in CCNA labs, and a missing step usually means SSH silently does not work.",
   "Telnet sends everything, including passwords, in clear text over TCP port 23, so anyone capturing traffic can read it. SSH (Secure Shell) encrypts the session and uses TCP port 22. To enable SSH on IOS, the device needs a hostname other than the default `Router` or `Switch`, a domain name, and an RSA (Rivest-Shamir-Adleman) key pair, because the key's name is built from the hostname and domain. SSH version 2 is more secure than version 1 and should be enforced; IOS requires an RSA modulus of at least 768 bits for version 2, and 2048 bits is a sensible choice.",
   "```text\nhostname R1\nip domain-name example.local\ncrypto key generate rsa modulus 2048\nip ssh version 2\nusername admin privilege 15 secret Str0ngPass\naccess-list 10 permit 10.1.99.0 0.0.0.255\nline vty 0 15\n login local\n transport input ssh\n access-class 10 in\n exec-timeout 10 0\n```",
   "Walk through the configuration step by step. The hostname and domain name allow key generation; generating the keys enables the SSH server. `ip ssh version 2` refuses version 1 clients. The username gives each administrator a login. Under the VTY (virtual terminal) lines, `login local` uses the local user database (or you could use AAA), `transport input ssh` allows only SSH, blocking Telnet, and `exec-timeout 10 0` closes sessions idle for ten minutes. Protect the console line with `login local` or a password too, because physical access is still access.",
   "Privileged EXEC mode is protected by `enable secret`, which stores the password as a strong hash. The older `enable password` stores it in clear text or, with `service password-encryption`, as a type 7 value, which is easily reversed and only prevents someone reading the configuration over your shoulder. If both are configured, `enable secret` takes precedence. Use `secret` wherever it is available, including `username ... secret`. `security passwords min-length` rejects short passwords, and `login block-for 120 attempts 5 within 60` pauses logins after repeated failures to slow brute-force guessing.",
   "`access-class` applies a standard ACL (access control list) to the VTY lines to control which source addresses can connect. In the example, ACL 10 permits the 10.1.99.0/24 management subnet, and `access-class 10 in` under the VTY lines means only that subnet can open SSH sessions; everyone else hits the implicit deny. Note the difference: `access-class` filters on lines, while `ip access-group` filters traffic passing through interfaces. Login banners display a legal notice. `banner motd # Authorized access only. Activity is monitored. #` shows a message-of-the-day banner before login; the character after `motd` is a delimiter marking the start and end. Banners should warn against unauthorized use and never say 'welcome'.",
   "Consider a worked example. A new switch is deployed and an engineer types `crypto key generate rsa`, but IOS refuses with a message asking for a domain name. She adds `ip domain-name corp.local`, generates a 2048-bit key, sets `ip ssh version 2`, and restricts the VTY lines as above. Testing from her management PC succeeds, and a test from a user VLAN is refused, as intended. `show ip ssh` confirms 'SSH Enabled - version 2.0', and `show ssh` lists her active session. A security review then flags the old `enable password`, which she replaces with `enable secret`.",
   "Common mistakes: forgetting the domain name or leaving the default hostname; applying the VTY restriction with `ip access-group` instead of `access-class`; leaving `transport input all` so Telnet still works; configuring only `vty 0 4` on a device with lines up to 15, leaving the rest open; and trusting type 7 passwords as secure. Exam clue words: 'crypto key generation failed' points to a missing hostname or domain name; 'allow only the management subnet to log in remotely' is `access-class` on the VTY lines; 'prevent Telnet' is `transport input ssh`; 'password stored as a hash' is `enable secret`; 'legal warning before login' is a MOTD (message of the day) banner."
  ],
  "terms": [
   [
    "SSH",
    "Secure Shell, an encrypted remote login protocol on TCP port 22 that replaces Telnet."
   ],
   [
    "RSA key pair",
    "The public and private keys the device generates to enable its SSH server."
   ],
   [
    "enable secret",
    "The privileged EXEC password stored as a strong hash; it overrides enable password."
   ],
   [
    "Type 7 password",
    "The weak, reversible obfuscation applied by service password-encryption."
   ],
   [
    "access-class",
    "Applies a standard ACL to VTY lines to control which source addresses may connect."
   ],
   [
    "transport input ssh",
    "A line command that permits only SSH sessions on the VTY lines."
   ],
   [
    "MOTD banner",
    "A message-of-the-day notice shown before login, used for legal warnings."
   ]
  ],
  "example": "During an audit, a retailer finds that store routers accept Telnet from any address and use `enable password`. The network team pushes a standard template: hostname and domain name, 2048-bit RSA keys, SSH version 2, `transport input ssh`, `access-class` limiting logins to the operations subnet, `enable secret`, `login block-for`, and a banner stating that access is restricted and monitored. A follow-up scan shows TCP 23 closed and SSH answering only from the management network.",
  "tip": "SSH needs a hostname, a domain name and RSA keys before it works. VTY lines are filtered with access-class, interfaces with ip access-group, and enable secret beats enable password.",
  "check": [
   [
    "What three things must exist before `crypto key generate rsa` can enable SSH?",
    "A non-default hostname and an IP domain name, from which the key name is built, then the key generation itself."
   ],
   [
    "How do you allow only SSH, not Telnet, on the VTY lines?",
    "Use `transport input ssh` under `line vty 0 15`."
   ],
   [
    "If both `enable password` and `enable secret` are configured, which is used?",
    "`enable secret`, which also stores the password as a strong hash."
   ],
   [
    "Which command restricts remote logins to a management subnet?",
    "`access-class <acl> in` under the VTY lines, with a standard ACL permitting that subnet."
   ]
  ]
 },
 {
  "t": "Standard and extended IPv4 ACLs: wildcard masks, sequence and first match, implicit deny, placement",
  "body": [
   "An access control list (ACL) is an ordered list of permit and deny statements, called access control entries (ACEs), that a router uses to filter packets. Applied to an interface in a direction, it decides whether each packet passes. ACLs are also used to select traffic for other features, such as NAT (Network Address Translation), VTY access and QoS (quality of service), so reading them correctly matters well beyond firewalling.",
   "Standard ACLs match only the source IP address. They are numbered 1 to 99 and 1300 to 1999, or named. Extended ACLs match the protocol, source address, destination address and, for TCP and UDP, source and destination ports. They are numbered 100 to 199 and 2000 to 2699, or named. Named ACLs are easier to read and edit: `ip access-list extended WEB-IN` followed by entries such as `10 permit tcp 10.1.1.0 0.0.0.255 host 10.2.2.10 eq 443`. In that entry, the source is 10.1.1.0/24, the destination is one host, and `eq 443` matches the destination port.",
   "ACLs use wildcard masks, not subnet masks. A 0 bit means 'must match' and a 1 bit means 'ignore'. The wildcard for a subnet is 255.255.255.255 minus its mask: a /24 is 0.0.0.255, a /26 (255.255.255.192) is 0.0.0.63 and a /30 is 0.0.0.3. `host 10.1.1.5` is shorthand for 10.1.1.5 0.0.0.0, and `any` for 0.0.0.0 255.255.255.255. Wildcards need not follow subnet boundaries: 10.1.0.0 0.0.254.255, for example, matches only the even-numbered third octets, although such masks are rare in practice.",
   "Processing is top-down, first match. The router compares a packet with each entry in sequence order and acts on the first one that matches, ignoring the rest. Order therefore matters: put specific entries before general ones. Every ACL ends with an invisible implicit deny any, so a packet that matches nothing is dropped. An ACL containing only deny statements blocks everything; you normally need a `permit ip any any` (or `permit any` in a standard ACL) at the end if you intend to allow all other traffic. Sequence numbers let you insert an entry, such as `15 deny ...`, between 10 and 20, or remove one with `no 20` inside the ACL configuration mode.",
   "An ACL does nothing until it is applied. `ip access-group WEB-IN in` on an interface filters packets entering that interface; `out` filters packets leaving it. Only one ACL is allowed per interface, per direction, per protocol (IPv4 or IPv6). Outbound ACLs do not filter traffic the router itself generates. Placement guidance: put extended ACLs as close to the source as possible, because they match precisely and drop unwanted traffic before it crosses the network. Put standard ACLs as close to the destination as possible, because they match only on source; placed near the source, they would block that source from reaching everything beyond, not just the one destination you intended.",
   "```text\nip access-list extended BLOCK-TELNET\n 10 deny tcp 10.1.1.0 0.0.0.255 host 10.2.2.10 eq 23\n 20 permit ip any any\ninterface g0/1\n ip access-group BLOCK-TELNET in\n```",
   "Consider a worked example. You must stop the 10.1.1.0/24 sales LAN, on R1 G0/1, from using Telnet to server 10.2.2.10, while all other traffic flows. Because you need protocol, destination and port, you choose an extended ACL and place it inbound on R1 G0/1, nearest the source, as shown above. Entry 10 matches the Telnet traffic; entry 20 allows everything else past the implicit deny. After applying it, `show access-lists` shows the counter on entry 10 increasing when someone tries Telnet, and `show ip interface g0/1` confirms 'Inbound access list is BLOCK-TELNET'. Had you been limited to a standard ACL that denies 10.1.1.0/24, you would place it outbound on the interface facing the server, so sales could still reach everything else.",
   "Common mistakes: using a subnet mask such as 255.255.255.0 where a wildcard belongs; putting a broad permit above a specific deny so the deny never matches; forgetting the final permit; applying the ACL in the wrong direction; and placing a standard ACL near the source. Exam clue words: 'only source address' means standard; 'port', 'protocol' or 'destination' means extended; 'nothing gets through after the ACL was applied' means the implicit deny with no permit; 'counters on an entry stay at zero' means traffic matches an earlier entry or never reaches that interface and direction; 'where should it be placed' means standard near destination, extended near source."
  ],
  "terms": [
   [
    "ACE",
    "Access control entry, one permit or deny line in an ACL."
   ],
   [
    "Standard ACL",
    "An ACL that matches only the source IP address; numbered 1 to 99 or 1300 to 1999."
   ],
   [
    "Extended ACL",
    "An ACL that matches protocol, source, destination and ports; numbered 100 to 199 or 2000 to 2699."
   ],
   [
    "Wildcard mask",
    "A mask where 0 bits must match and 1 bits are ignored, such as 0.0.0.255 for a /24."
   ],
   [
    "First match",
    "Processing stops at the first entry that matches the packet, so order matters."
   ],
   [
    "Implicit deny",
    "The invisible final entry that drops any packet not matched by an earlier entry."
   ],
   [
    "ip access-group",
    "The interface command that applies an ACL inbound or outbound."
   ]
  ],
  "example": "A school wants guest Wi-Fi users on 172.16.50.0/24 to reach the internet but not the internal 10.0.0.0/8 network. The engineer writes an extended ACL applied inbound on the guest VLAN interface: permit UDP to the DNS server on port 53, deny ip 172.16.50.0 0.0.0.255 10.0.0.0 0.255.255.255, then permit ip any any. Counters confirm guest attempts to reach internal servers are dropped while web browsing works.",
  "tip": "Standard near the destination, extended near the source. Always ask whether the ACL ends with a permit, because the implicit deny catches questions where everything else should be allowed.",
  "check": [
   [
    "What is the wildcard mask for a /27 network?",
    "0.0.0.31, because 255.255.255.255 minus 255.255.255.224 is 0.0.0.31."
   ],
   [
    "An ACL contains only `deny host 10.1.1.5`. What happens to other traffic?",
    "It is all dropped by the implicit deny; a permit statement is needed to allow it."
   ],
   [
    "Why are standard ACLs placed near the destination?",
    "They match only the source, so near the source they would block that host from every destination, not just the intended one."
   ],
   [
    "How many IPv4 ACLs can you apply inbound on one interface?",
    "One per interface, per direction, per protocol."
   ]
  ]
 },
 {
  "t": "Layer 2 security: port security (maximum, sticky, violation modes), DHCP snooping, dynamic ARP inspection",
  "body": [
   "Many attacks on a LAN happen at Layer 2, from a device plugged into an access port: flooding the switch's MAC (media access control) address table, running a rogue DHCP (Dynamic Host Configuration Protocol) server, or poisoning ARP (Address Resolution Protocol) caches to intercept traffic. Cisco switches offer three features that work together to detect and prevent these attacks at the edge. The CCNA tests how each works, its defaults, and how they depend on one another.",
   "Port security limits which and how many MAC addresses can use an access port. Enable it with `switchport port-security` on a port set to `switchport mode access`. The default maximum is 1 MAC address; change it with `switchport port-security maximum 2`, for example for an IP phone plus a PC. Allowed MACs can be configured statically, learned dynamically, or learned as sticky with `switchport port-security mac-address sticky`, which adds learned addresses to the running configuration so they survive a reload once you save it. This defeats MAC flooding attacks, where a tool sends frames from thousands of fake MACs to overflow the table so the switch floods traffic out every port.",
   "When an unauthorized MAC appears or the maximum is exceeded, the violation mode decides the response. Shutdown, the default, err-disables the port, logs a message and increments the violation counter. Restrict drops the offending frames, logs and increments the counter, but keeps the port up for allowed MACs. Protect silently drops the offending frames with no log and no counter. A port shut down by a violation stays err-disabled until an administrator enters `shutdown` then `no shutdown`, or errdisable recovery is configured. Verify with `show port-security interface g0/5` and `show port-security address`.",
   "DHCP snooping stops rogue DHCP servers, which could hand clients a malicious gateway or DNS (Domain Name System) server. You enable it globally and per VLAN with `ip dhcp snooping` and `ip dhcp snooping vlan 10`, then mark the ports that lead to legitimate DHCP servers, usually uplinks, as trusted with `ip dhcp snooping trust`. All other ports are untrusted: server messages such as DHCP Offer and Ack arriving there are dropped. Snooping also builds a binding table of MAC address, IP address, VLAN, port and lease time for every client that gets an address, and it can rate-limit DHCP messages on untrusted ports with `ip dhcp snooping limit rate` to slow starvation attacks. Some upstream servers reject the option 82 information snooping inserts, in which case `no ip dhcp snooping information option` may be needed.",
   "Dynamic ARP inspection (DAI) stops ARP spoofing, where an attacker sends forged ARP replies claiming the gateway's IP maps to the attacker's MAC, putting the attacker in the middle of traffic. With `ip arp inspection vlan 10`, the switch intercepts ARP messages on untrusted ports and checks the IP-to-MAC pairing against the DHCP snooping binding table. Mismatches are dropped and logged. Uplinks are trusted with `ip arp inspection trust`. Because DAI relies on the snooping table, DHCP snooping must be enabled first, and hosts with static IPs need ARP ACLs to be allowed.",
   "```text\nip dhcp snooping\nip dhcp snooping vlan 10\nip arp inspection vlan 10\ninterface g0/24\n ip dhcp snooping trust\n ip arp inspection trust\ninterface g0/5\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security mac-address sticky\n switchport port-security violation restrict\n```",
   "Consider a worked example. In an office, a user plugs a home wireless router into a wall port on VLAN 10, and colleagues start getting 192.168.0.x addresses. With DHCP snooping enabled as above, the router's Offers arrive on untrusted port g0/5 and are dropped, so clients keep receiving leases from the real server via trusted uplink g0/24. The home router's extra MAC addresses also exceed the port-security maximum of two, and because the mode is restrict, the switch logs the violation and drops the extra frames while the user's PC keeps working. Later, someone runs an ARP spoofing tool; DAI finds no matching binding for the forged reply and drops it.",
   "Common mistakes: forgetting to trust the uplink, so all DHCP stops; enabling DAI without DHCP snooping; enabling port security on a dynamic (DTP) port, which IOS rejects; and mixing up restrict and protect. Exam clue words: 'rogue DHCP server' means DHCP snooping; 'man-in-the-middle with forged ARP' means DAI; 'MAC flooding' or 'limit devices per port' means port security; 'port is err-disabled' means shutdown mode; 'drops and logs but stays up' means restrict; 'drops with no log' means protect; 'survives reload' means sticky plus saving the configuration."
  ],
  "terms": [
   [
    "Port security",
    "A switch feature that limits which and how many MAC addresses may use an access port."
   ],
   [
    "Sticky MAC",
    "Dynamically learned MAC addresses written into the running configuration by port security."
   ],
   [
    "Violation modes",
    "Shutdown (err-disable, default), restrict (drop and log) and protect (drop silently)."
   ],
   [
    "DHCP snooping",
    "Filters DHCP server messages on untrusted ports and builds a binding table of clients."
   ],
   [
    "Trusted port",
    "A port, usually an uplink, where DHCP server messages or ARP are accepted without inspection."
   ],
   [
    "Dynamic ARP inspection",
    "Validates ARP messages on untrusted ports against the DHCP snooping binding table."
   ],
   [
    "Err-disabled",
    "A port state where the switch has shut the port because of an error such as a security violation."
   ]
  ],
  "example": "A hospital enables DHCP snooping and DAI on its clinical VLANs and port security with a maximum of two sticky MACs on patient-room ports. A visitor connects a laptop running a spoofing tool to a room port. The laptop is a third MAC, so port security in restrict mode drops its frames and logs the event, and even on a spare port DAI would reject its forged ARP replies because no DHCP binding supports them.",
  "tip": "Protect drops silently, restrict drops and logs, shutdown err-disables and is the default. DAI depends on the DHCP snooping binding table, and uplinks to real DHCP servers must be trusted.",
  "check": [
   [
    "Which port-security violation mode keeps the port up and logs violations?",
    "Restrict, which drops unauthorized frames, logs and increments the counter."
   ],
   [
    "What happens to a DHCP Offer arriving on an untrusted port with snooping enabled?",
    "It is dropped, because only trusted ports may carry DHCP server messages."
   ],
   [
    "What does DAI compare ARP messages against?",
    "The DHCP snooping binding table of IP-to-MAC mappings per port and VLAN."
   ],
   [
    "How do you recover a port err-disabled by port security?",
    "Fix the cause, then `shutdown` and `no shutdown` on the interface, or configure errdisable recovery."
   ]
  ]
 },
 {
  "t": "NAT and PAT: static, dynamic pool, overload; inside local/global and outside local/global",
  "body": [
   "Network Address Translation (NAT) rewrites IP addresses as packets pass through a router, most commonly to let hosts using private RFC 1918 addresses (10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16) reach the internet with public addresses. It conserves scarce public IPv4 space and hides internal addressing. The CCNA covers three forms, static, dynamic and PAT, and a set of four address terms that confuse many learners until the pattern clicks.",
   "The four terms describe an address from two viewpoints. Inside means the host is on your network; outside means it is elsewhere. Local means the address as seen on the inside network; global means as seen on the outside. So the inside local address is the private address actually configured on your PC, such as 192.168.1.10. The inside global address is the public address that represents your PC to the outside, such as 203.0.113.5. The outside global address is the real address of the remote host, such as a web server at 198.51.100.80. The outside local address is how that remote host appears from inside; unless you also translate outside addresses, it is the same as the outside global.",
   "Static NAT maps one inside local address to one inside global address permanently: `ip nat inside source static 192.168.1.20 203.0.113.20`. It is used for servers that must be reachable from the internet, because the mapping exists before any traffic starts and works in both directions. Dynamic NAT maps inside hosts to a pool of public addresses on a first-come basis. An ACL (access control list) identifies which inside addresses to translate, and a pool defines the public range. Each active host uses one public address; if the pool is exhausted, new hosts cannot be translated until an entry times out.",
   "```text\naccess-list 1 permit 192.168.1.0 0.0.0.255\nip nat pool PUBLIC 203.0.113.10 203.0.113.14 netmask 255.255.255.248\nip nat inside source list 1 pool PUBLIC\n! or PAT on the outside interface address:\nip nat inside source list 1 interface g0/0 overload\ninterface g0/1\n ip nat inside\ninterface g0/0\n ip nat outside\n```",
   "PAT (Port Address Translation), also called NAT overload, lets many inside hosts share a single public address by also translating source port numbers. The router tracks each connection by address and port, so thousands of sessions can share one address. Adding `overload` enables it, either to the interface's own address, as in the second option above, or to a pool. PAT is what nearly every home and office router does. Every NAT setup needs the interfaces marked: `ip nat inside` on the LAN-facing interface and `ip nat outside` on the internet-facing interface. The router translates only packets that cross from an inside interface to an outside one, or back.",
   "Consider a worked example. A small office has 40 PCs on 192.168.1.0/24 and one public address, 203.0.113.2, on G0/0. You configure ACL 1 to match the LAN, `ip nat inside source list 1 interface g0/0 overload`, and mark G0/1 inside and G0/0 outside. When PC 192.168.1.10 browses to 198.51.100.80 from source port 50000, the router rewrites the source to 203.0.113.2 port 50000 (or another free port if that one is taken) and records the mapping. `show ip nat translations` shows a line such as 'tcp 203.0.113.2:50000 192.168.1.10:50000 198.51.100.80:443 198.51.100.80:443', listing inside global, inside local, outside local and outside global. When the reply arrives, the router looks up the port and forwards it to 192.168.1.10. The office's printer server needs to be reachable from outside, so you would add a static entry for it, using a second public address or a static PAT entry on a specific port.",
   "Common mistakes: forgetting `ip nat inside` or `ip nat outside`, or putting them on the wrong interfaces; writing an ACL that does not match the inside hosts; leaving off `overload` so only as many hosts as pool addresses can connect; and confusing inside global with outside global. Verify with `show ip nat translations` and `show ip nat statistics`, which shows hits, misses and pool usage; `clear ip nat translation *` removes dynamic entries. Also remember that NAT is not a firewall, even though unsolicited inbound traffic has no mapping and is dropped as a side effect.",
   "Exam questions often show a translation table and ask you to name an address. Clue words: 'private address configured on the host' is inside local; 'public address representing the internal host' is inside global; 'real address of the internet server' is outside global. 'Server must be reachable from the internet' means static NAT; 'many users, one public IP' means PAT or overload; 'only the first five users can browse' suggests dynamic NAT with a five-address pool and no overload. 'No translations appear' points to missing inside or outside interface commands or an ACL mismatch."
  ],
  "terms": [
   [
    "NAT",
    "Network Address Translation, rewriting IP addresses as packets cross a router."
   ],
   [
    "PAT (overload)",
    "Port Address Translation, letting many hosts share one public address by tracking port numbers."
   ],
   [
    "Inside local",
    "The address actually configured on an inside host, usually private."
   ],
   [
    "Inside global",
    "The public address that represents an inside host to the outside world."
   ],
   [
    "Outside global",
    "The real address of a remote host on the outside network."
   ],
   [
    "Outside local",
    "How a remote host's address appears from inside; normally the same as outside global."
   ],
   [
    "Static NAT",
    "A permanent one-to-one mapping, used for servers that must accept inbound connections."
   ]
  ],
  "example": "A café's router uses PAT so 30 customer devices share the single public address on its internet interface. The owner also runs a booking server on 192.168.10.50 that must be reachable from outside, so the engineer adds a static NAT entry mapping it to a second public address from the provider. `show ip nat translations` then shows one permanent static line and many short-lived PAT entries with different ports.",
  "tip": "Inside local is the private address you configured on the host; inside global is its public face. Remember that inside or outside is where the host is, and local or global is where you are looking from.",
  "check": [
   [
    "A PC is configured with 10.1.1.5 and appears on the internet as 198.51.100.7. Which is the inside local and which is the inside global?",
    "10.1.1.5 is inside local and 198.51.100.7 is inside global."
   ],
   [
    "What keyword makes dynamic NAT share one address among many hosts?",
    "`overload`, which enables PAT by translating port numbers as well as addresses."
   ],
   [
    "Which NAT type suits a web server that must accept connections from the internet?",
    "Static NAT, because the mapping exists permanently before any inbound traffic arrives."
   ],
   [
    "NAT is configured but `show ip nat translations` is empty. What should you check first?",
    "The `ip nat inside` and `ip nat outside` interface commands and whether the ACL matches the inside hosts."
   ]
  ]
 },
 {
  "t": "DHCP and DNS roles in the network; troubleshoot name resolution and DHCP client issues",
  "body": [
   "Two services quietly make every network usable. DHCP (Dynamic Host Configuration Protocol) gives hosts their IP address, mask, default gateway and DNS server addresses automatically. DNS (Domain Name System) translates names people remember, such as www.example.com, into the IP addresses computers need. When either fails, users report that the network is down, even though routing and switching are fine. Knowing each service's role lets you tell those failures apart quickly.",
   "DHCP works through the DORA exchange: Discover, Offer, Request, Acknowledgment, using UDP (User Datagram Protocol) ports 67 for the server and 68 for the client. Because Discover is a broadcast, and routers do not forward broadcasts, a relay agent is needed when the server is on another subnet. You configure it with `ip helper-address 10.1.1.20` on the router interface facing the clients, and the router forwards the request as unicast to the server. The lease is temporary, and clients try to renew it at half the lease time. Besides the address, DHCP options deliver the gateway, DNS servers and domain name and, for devices such as IP phones and APs (access points), controller or TFTP (Trivial File Transfer Protocol) server addresses. An IOS router can itself be a DHCP server with `ip dhcp pool`, `network`, `default-router` and `dns-server`, plus `ip dhcp excluded-address` for static devices.",
   "DNS is a distributed, hierarchical database. A client asks its configured DNS resolver, which answers from cache or queries the hierarchy: root servers, then top-level domain servers such as .com, then the authoritative server for the domain. Common record types are A (name to IPv4 address), AAAA (name to IPv6 address), CNAME (an alias for another name), MX (mail server for a domain), NS (name servers for a zone) and PTR (address to name, for reverse lookups). DNS queries normally use UDP port 53, with TCP port 53 for large responses and zone transfers. Answers are cached for their TTL (time to live), which is why a changed record may take time to be seen everywhere.",
   "On a Cisco router, `ip name-server 10.1.1.53` sets the DNS server the router uses, and `ip domain-lookup` (on by default) enables lookups. A familiar annoyance is that mistyped commands at the CLI are treated as hostnames, and the router tries to resolve them; `no ip domain-lookup` stops that in labs. `ip host SERVER1 10.1.1.10` creates a static local mapping.",
   "To troubleshoot a DHCP client, check its IP configuration first. A 169.254.x.x APIPA (Automatic Private IP Addressing) address, or no address at all, means DHCP failed. Then check the path: link up, correct access VLAN, relay configured with the right server address on the right interface, a pool or scope for that subnet on the server, free addresses in the pool, and DHCP snooping not dropping legitimate offers because an uplink is untrusted. `ipconfig /release` and `ipconfig /renew` on Windows, or `dhclient` on some Linux systems, retry the process; `show ip dhcp binding`, `show ip dhcp pool` and `show ip dhcp conflict` on an IOS server show leases, exhaustion and duplicate addresses.",
   "To troubleshoot DNS, separate reachability from name resolution. If `ping 10.1.1.10` works but `ping server1.example.com` fails, the problem is DNS. Check which DNS server the client uses with `ipconfig /all`, `resolvectl status` or `/etc/resolv.conf`, then test directly with `nslookup server1.example.com` or `dig server1.example.com`. Possible causes are a wrong DNS server address handed out by DHCP, the DNS server being unreachable or blocked by an ACL on UDP 53, a missing or incorrect record, or a stale cache that `ipconfig /flushdns` clears.",
   "Consider a worked example. After a new VLAN 30 is created for a finance team, every PC shows a 169.254 address. The VLAN interface on the core switch has an IP address, and the DHCP server has a scope for 10.30.0.0/24, but `show running-config interface vlan 30` has no `ip helper-address`. Adding `ip helper-address 10.1.1.20` lets Discovers reach the server, and PCs get leases. Next day, a user can reach the ERP (enterprise resource planning) server by IP but not by name. `ipconfig /all` shows a DNS server of 10.30.0.53, which does not exist; the scope's DNS option was mistyped. Correcting it to 10.1.1.53 and renewing fixes name resolution.",
   "Common mistakes: putting `ip helper-address` on the server-facing interface instead of the client-facing one; treating a name failure as a routing failure; forgetting to exclude static addresses from a pool, causing conflicts; and assuming DNS uses only TCP. Exam clue words: '169.254 address' means DHCP failure; 'works by IP, fails by name' means DNS; 'clients on a remote subnet get no address' means a missing relay (`ip helper-address`); 'pool exhausted' means no free leases; 'name maps to IPv6' means AAAA; 'reverse lookup' means PTR."
  ],
  "terms": [
   [
    "DORA",
    "Discover, Offer, Request, Acknowledgment: the four-message DHCP exchange."
   ],
   [
    "ip helper-address",
    "Configures a router interface as a DHCP relay, forwarding client broadcasts to a server on another subnet."
   ],
   [
    "Lease",
    "The time a DHCP client may use its assigned address before renewing."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing, a 169.254.x.x self-assigned address that signals DHCP failure."
   ],
   [
    "A and AAAA records",
    "DNS records mapping a name to an IPv4 or IPv6 address respectively."
   ],
   [
    "PTR record",
    "A DNS record mapping an address back to a name for reverse lookups."
   ],
   [
    "nslookup",
    "A command-line tool that queries DNS servers directly to test name resolution."
   ]
  ],
  "example": "A warehouse's handheld scanners stop connecting to the inventory server by name after a DNS migration. They can still ping the server's IP address. The engineer finds that the DHCP scope still hands out the old DNS server address, which has been shut down. Updating the scope's DNS option and having the scanners renew their leases restores name resolution without any routing change.",
  "tip": "If IP works but names fail, the answer is DNS. If the client has a 169.254 address, the answer is DHCP, and on a remote subnet the first suspect is a missing ip helper-address on the client-facing interface.",
  "check": [
   [
    "What are the four DHCP messages, in order?",
    "Discover, Offer, Request and Acknowledgment."
   ],
   [
    "Why is `ip helper-address` needed when the DHCP server is on another subnet?",
    "DHCP Discover is a broadcast, which routers do not forward; the helper relays it as unicast to the server."
   ],
   [
    "A user can ping 10.2.2.2 but not `app.corp.local`. Which service is failing?",
    "DNS, because IP connectivity works and only name resolution fails."
   ],
   [
    "Which DNS record type maps a name to an IPv6 address?",
    "AAAA."
   ]
  ]
 },
 {
  "t": "NTP role in keeping logs and certificates consistent",
  "body": [
   "Every device has a clock, and on its own each one drifts. NTP (Network Time Protocol) keeps device clocks synchronized to accurate sources so that every router, switch, server and firewall agrees on the time. That sounds minor, but many security and operational tasks quietly depend on it, and the CCNA expects you to know both why it matters and how to configure and verify it.",
   "Logs are the first reason. When an incident spans several devices, you piece together what happened by lining up syslog messages by timestamp. If one router's clock is five minutes fast and another's is three minutes slow, the sequence of events becomes impossible to reconstruct, and correlation tools in a SIEM (security information and event management) or monitoring system give wrong results. Configure timestamps with `service timestamps log datetime msec` so messages carry the date and time, not just uptime. Accurate time also matters for evidence: if logs are ever used in a disciplinary or legal process, investigators need to trust that the timestamps reflect when events really happened, and a consistent, documented time source makes that possible.",
   "Certificates are the second reason. Digital certificates used for HTTPS, VPNs (virtual private networks), 802.1X and secure device management have validity dates. A device whose clock is far wrong may think a valid certificate has not yet become valid or has already expired, and reject it. Authentication protocols such as Kerberos also reject requests if clocks differ by more than a small allowed skew. Time-based one-time passwords rely on synchronized time too, and so do scheduled tasks and log retention.",
   "NTP organizes sources in strata. Stratum 0 devices are reference clocks such as GPS (Global Positioning System) receivers or atomic clocks, which are not on the network directly. Stratum 1 servers connect directly to a stratum 0 source. A device synchronized to a stratum 1 server becomes stratum 2, and so on. Lower stratum means closer to the reference, and devices prefer it. Stratum 16 means unsynchronized. NTP uses UDP port 123 and continually adjusts for network delay, slewing the clock gradually rather than jumping it where possible.",
   "On IOS, `ntp server 10.1.1.123` makes the device a client of that server; configure two or more servers for redundancy. A device synchronized to a server can in turn serve time to others. `ntp master` makes a router an authoritative source using its own clock, useful in labs or isolated networks; it defaults to stratum 8. Set the local time zone with `clock timezone`, while NTP itself carries UTC (Coordinated Universal Time). To stop devices accepting time from rogue sources, enable NTP authentication with `ntp authenticate`, `ntp authentication-key 1 md5 <key>` and `ntp trusted-key 1`, and add `key 1` to the `ntp server` command. If you use daylight saving time, `clock summer-time` adjusts the displayed local time; the underlying NTP time is unaffected.",
   "```text\nclock timezone EST -5\nntp server 10.1.1.123 prefer\nntp server 10.1.2.123\nservice timestamps log datetime msec localtime\n```",
   "Consider a worked example. A security team investigates a suspicious configuration change. The firewall log shows a VPN login at 02:14, but the core switch shows the change at 01:58, apparently before the attacker logged in. `show clock` on the switch has a leading asterisk, and `show ntp status` reports 'Clock is unsynchronized, stratum 16'. An ACL on the management VLAN was blocking UDP 123 to the NTP servers. After permitting NTP, `show ntp associations` shows an asterisk next to 10.1.1.123, meaning the switch is synchronized to it, and the status shows stratum 3. The team recalculates the offset for the old logs and confirms the change followed the login. Afterwards, they add NTP authentication and a second server.",
   "Common mistakes: configuring only one server; forgetting that timestamps must be enabled for logs to show dates; assuming `ntp master` is the right choice in production when a proper upstream source exists; confusing a higher stratum with a better one; and blocking UDP 123 with an ACL. Exam questions usually describe the symptom rather than naming NTP. Clue words: 'logs from different devices are out of order', 'correlation fails', 'certificate reported as not yet valid or expired although it is current', or 'Kerberos clock skew' all point to NTP. 'Stratum 16' means unsynchronized; 'asterisk in show ntp associations' marks the selected server; 'authoritative source in a lab' means `ntp master`."
  ],
  "terms": [
   [
    "NTP",
    "Network Time Protocol, which synchronizes device clocks over UDP port 123."
   ],
   [
    "Stratum",
    "The distance from a reference clock; lower is more accurate and 16 means unsynchronized."
   ],
   [
    "ntp server",
    "The IOS command that makes a device a client of the named NTP server."
   ],
   [
    "ntp master",
    "Makes a router an authoritative time source from its own clock, stratum 8 by default."
   ],
   [
    "NTP authentication",
    "Keys that ensure devices accept time only from trusted servers."
   ],
   [
    "Clock skew",
    "The difference between two devices' clocks, which can break certificate and Kerberos validation."
   ]
  ],
  "example": "Remote users suddenly fail to connect to a company's certificate-based VPN. The VPN gateway had rebooted after a power cut and its battery-backed clock reset to a date years in the past, so every client certificate looked not yet valid. NTP had never been configured on it. The engineer configures two internal NTP servers, the clock corrects within minutes, and connections succeed again.",
  "tip": "Lower stratum is more accurate, and stratum 16 means not synchronized. An exam question about failed certificate validation or out-of-order logs is usually pointing at NTP.",
  "check": [
   [
    "Why does inaccurate time break certificate validation?",
    "Certificates have validity dates, so a wrong clock can make a valid certificate appear expired or not yet valid."
   ],
   [
    "What does stratum 16 indicate?",
    "The device is not synchronized to any time source."
   ],
   [
    "Which command shows the server a router is synchronized to?",
    "`show ntp associations`, where an asterisk marks the selected server; `show ntp status` confirms sync and stratum."
   ],
   [
    "What transport and port does NTP use?",
    "UDP port 123."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2 and WPA3, Personal (PSK/SAE) vs Enterprise (802.1X)",
  "body": [
   "Anyone within radio range can receive wireless frames, so a WLAN (wireless LAN) must authenticate who joins and encrypt what they send. The Wi-Fi Alliance certifies security generations called WPA (Wi-Fi Protected Access). The original WEP (Wired Equivalent Privacy) and first-generation WPA with TKIP (Temporal Key Integrity Protocol) are broken and obsolete. The CCNA focuses on WPA2 and WPA3, each in Personal and Enterprise modes, and on who does what during 802.1X authentication.",
   "WPA2 uses AES (Advanced Encryption Standard) in CCMP mode (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol) for confidentiality and integrity. WPA3 keeps AES and adds stronger protections: it replaces the pre-shared key handshake in Personal mode with SAE, requires PMF (Protected Management Frames) so attackers cannot forge frames such as deauthentication messages, and offers a 192-bit security suite in Enterprise mode for high-security environments. For open guest networks, the related Enhanced Open feature, based on OWE (Opportunistic Wireless Encryption), encrypts traffic without a password.",
   "Personal mode uses one shared passphrase for everyone. In WPA2-Personal the passphrase produces a PSK (pre-shared key), and clients and the AP (access point) prove they know it in the four-way handshake, which also creates per-session encryption keys. Its weakness is that an attacker who captures a handshake can try guesses against it offline, so a weak passphrase can be cracked. WPA3-Personal uses SAE (Simultaneous Authentication of Equals), a key exchange that resists offline dictionary attacks: each guess requires a live interaction with the AP. SAE also provides forward secrecy, so learning the passphrase later does not decrypt previously captured traffic. Personal mode suits homes and small offices; its drawbacks are that everyone shares one secret and changing it means updating every device. Hiding the SSID (service set identifier) or filtering by MAC address are sometimes suggested as extra protection, but neither is real security: the SSID still appears in client probes and MAC addresses are easy to observe and spoof.",
   "Enterprise mode uses 802.1X to authenticate each user or device individually against a central server. There are three roles. The supplicant is the client device software. The authenticator is the AP or WLC (wireless LAN controller), which passes messages but does not make the decision. The authentication server, usually a RADIUS (Remote Authentication Dial-In User Service) server, checks credentials against a directory and tells the authenticator to allow or deny. The messages use EAP (Extensible Authentication Protocol) in one of several methods, such as EAP-TLS with certificates on both sides, or PEAP (Protected EAP), which protects a username and password inside a TLS (Transport Layer Security) tunnel. Each user gets unique session keys, access can be revoked per user, and RADIUS can assign a VLAN or policy per user.",
   "On a Cisco WLC, you configure these choices per WLAN, usually under the WLAN's Security tab in the GUI: the security type (WPA2, WPA3 or a transition mode supporting both), the AKM (authentication key management) method, which is PSK, SAE or 802.1X, and, for Enterprise, the RADIUS servers to use. A transition mode helps when older clients cannot yet use WPA3, at the cost of accepting the weaker method for those clients. Remember that 6 GHz operation requires WPA3 or Enhanced Open.",
   "Consider a worked example. A law firm has 60 staff and a guest room. Today everyone shares one WPA2-Personal passphrase, and a former employee still knows it. The engineer creates a staff WLAN with WPA2/WPA3 Enterprise and 802.1X against the firm's RADIUS server, using PEAP for laptops and EAP-TLS for managed phones. Laptops are the supplicants, the WLC is the authenticator, and RADIUS checks directory accounts. When someone leaves, their account is disabled and their Wi-Fi access ends immediately. Guests get a separate WLAN with WPA3-Personal using SAE, and the passphrase is changed monthly without affecting staff.",
   "Common mistakes: calling the AP or WLC the authentication server; thinking WPA3-Personal still uses a PSK four-way handshake that is vulnerable to offline guessing; choosing TKIP for compatibility; and assuming Personal mode can identify individual users. Exam clue words: 'one shared password' means Personal; 'individual credentials', 'certificates' or 'RADIUS' means Enterprise with 802.1X; 'resists offline dictionary attacks' or 'forward secrecy' means SAE and WPA3; 'AES-CCMP' means WPA2; 'client software' is the supplicant; 'AP passes EAP messages' is the authenticator; 'checks credentials' is the authentication server."
  ],
  "terms": [
   [
    "WPA2",
    "Wi-Fi security generation using AES-CCMP, in Personal (PSK) or Enterprise (802.1X) mode."
   ],
   [
    "WPA3",
    "The newer generation adding SAE, mandatory Protected Management Frames and a 192-bit Enterprise suite."
   ],
   [
    "PSK",
    "Pre-shared key, the single passphrase-derived secret used by WPA2-Personal."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals, the WPA3-Personal key exchange that resists offline guessing."
   ],
   [
    "802.1X",
    "Port-based network access control that authenticates each user through an authenticator and server."
   ],
   [
    "Supplicant",
    "The client software that requests access in 802.1X."
   ],
   [
    "Authenticator",
    "The AP or WLC that relays EAP messages and enforces the server's decision."
   ]
  ],
  "example": "A hotel runs staff Wi-Fi with WPA3-Enterprise and 802.1X, so each employee signs in with their own account and RADIUS places housekeeping and management devices in different VLANs. Guest Wi-Fi uses WPA3-Personal with SAE and a passphrase printed on room cards, changed each month. When a staff member leaves, disabling their directory account removes their wireless access without touching any other device.",
  "tip": "Personal means a shared key (PSK for WPA2, SAE for WPA3). Enterprise means 802.1X with a RADIUS server. In 802.1X, the AP or WLC is the authenticator, not the authentication server.",
  "check": [
   [
    "Which WPA3-Personal feature resists offline dictionary attacks?",
    "SAE, because each password guess requires a live exchange with the AP."
   ],
   [
    "Name the three 802.1X roles.",
    "Supplicant (client), authenticator (AP or WLC) and authentication server (usually RADIUS)."
   ],
   [
    "Which encryption does WPA2 use?",
    "AES in CCMP mode."
   ],
   [
    "Why is Enterprise mode better for a large organization?",
    "Each user authenticates individually and gets unique keys, and access can be revoked per user without changing a shared passphrase."
   ]
  ]
 },
 {
  "t": "VPNs: site-to-site IPsec vs remote-access",
  "body": [
   "A VPN (virtual private network) creates a secure tunnel across an untrusted network, usually the internet, so that traffic stays private and is protected from tampering. VPNs give organizations much of the security of a private WAN (wide area network) at the cost of ordinary internet connectivity. The CCNA distinguishes two main uses: connecting whole sites to each other, and connecting individual users to the organization. Most exam questions come down to recognizing which one a scenario describes.",
   "A site-to-site VPN links two networks, such as a branch and headquarters. VPN gateways, typically routers or firewalls at each site, build a permanent tunnel between them. Hosts at each site send traffic normally to their default gateway and are unaware of the VPN; the gateway encrypts traffic destined for the other site, sends it across the internet, and the far gateway decrypts it and forwards it on. No software is needed on end devices, and the tunnel stays up whether or not anyone is using it.",
   "Site-to-site VPNs normally use IPsec (Internet Protocol Security), a framework of protocols rather than a single protocol. IKE (Internet Key Exchange) negotiates security settings, authenticates the peers using pre-shared keys or certificates, and creates the keys. ESP (Encapsulating Security Payload, IP protocol 50) then provides confidentiality through encryption, integrity through hashing, and origin authentication. AH (Authentication Header, IP protocol 51) provides integrity and authentication but no encryption, so ESP is what you will see in practice. In tunnel mode, used between gateways, the entire original packet is encrypted and a new IP header is added with the gateways' public addresses; transport mode protects only the payload and is used between two hosts.",
   "Plain IPsec tunnels do not carry multicast, so running a routing protocol such as OSPF across them usually requires GRE (Generic Routing Encapsulation) over IPsec or virtual tunnel interfaces. GRE adds a tunnel that can carry multicast and other protocols, and IPsec then encrypts it, because GRE alone provides no security. Cisco DMVPN (Dynamic Multipoint VPN) builds many branch tunnels dynamically in a hub-and-spoke design, letting branches reach each other directly when needed without a manually configured full mesh.",
   "A remote-access VPN connects an individual user's device to the organization's network, typically for teleworkers and travellers. The user runs a VPN client on the laptop or phone, such as Cisco Secure Client (formerly AnyConnect), which connects to a VPN headend, usually a firewall. Remote-access VPNs commonly use TLS (Transport Layer Security, the same protection as HTTPS) or IPsec with IKEv2. Clientless VPNs, in which the user reaches selected internal web applications through a browser over TLS, are another form. The user authenticates, often with MFA (multifactor authentication) through RADIUS or a similar service, and receives an internal address. Designs also choose between full tunnel, where all the user's traffic goes through the VPN, and split tunnel, where only traffic for corporate networks uses the tunnel and internet traffic goes directly. Full tunnel gives more inspection and control; split tunnel reduces load on the headend and the corporate internet link.",
   "Consider a worked example. A retailer has a head office and twelve stores, plus thirty area managers who travel. For the stores, the engineer configures site-to-site IPsec tunnels from each store router to the head-office firewall, using certificates for IKE authentication and ESP in tunnel mode. Point-of-sale terminals simply send traffic to their local gateway, and it arrives at head office encrypted in transit. For the managers, the firewall is configured as a remote-access headend; they install Secure Client, authenticate with their directory account plus a one-time code, and receive an address from a VPN pool. Security asks for full tunnel so all manager traffic passes the firewall's inspection. Later, when stores need OSPF to learn head-office routes, the engineer switches to GRE over IPsec.",
   "Common mistakes: thinking site-to-site VPNs need client software on hosts; assuming GRE encrypts traffic; choosing AH when confidentiality is required; confusing tunnel mode (gateway to gateway, new outer header) with transport mode (host to host); and forgetting that remote access is initiated by the user. To compare them: site-to-site is always on, connects networks, is invisible to users and uses gateway devices at both ends. Remote access is on demand, connects one device, requires client software or a browser on the user side, and is started by the user.",
   "Exam questions usually describe a need and ask which VPN fits. Clue words 'branch offices', 'no software on end devices', 'permanent tunnel between routers' point to site-to-site IPsec. 'Teleworkers', 'VPN client', 'Secure Client', 'user logs in from a hotel' point to remote access, often over TLS. 'Encryption' means ESP; 'integrity only, no encryption' means AH; 'negotiates keys' means IKE; 'routing protocol over the tunnel' means GRE over IPsec; 'send only corporate traffic through the tunnel' means split tunnel."
  ],
  "terms": [
   [
    "VPN",
    "Virtual private network, a secure tunnel across an untrusted network."
   ],
   [
    "Site-to-site VPN",
    "A permanent tunnel between gateways that connects whole networks, invisible to end users."
   ],
   [
    "Remote-access VPN",
    "An on-demand tunnel from one user's device, using client software or a browser, to a headend."
   ],
   [
    "IPsec",
    "A framework of protocols, including IKE, ESP and AH, that secures IP traffic."
   ],
   [
    "ESP",
    "Encapsulating Security Payload, IP protocol 50, providing encryption, integrity and authentication."
   ],
   [
    "IKE",
    "Internet Key Exchange, which authenticates peers and negotiates keys and security settings."
   ],
   [
    "Split tunnel",
    "Sending only corporate-bound traffic through the VPN while internet traffic goes directly."
   ]
  ],
  "example": "An engineering firm opens a second office across town. Rather than lease a private line, it connects the two office firewalls with a site-to-site IPsec VPN over their existing internet links, so staff access file servers in either office without doing anything differently. Engineers working from home use a remote-access VPN client with MFA, and the firm uses split tunnelling so video calls go directly to the internet rather than through the head-office connection.",
  "tip": "If the scenario mentions client software, individual users or teleworkers, choose remote access. If it mentions connecting offices with devices at both ends and no user involvement, choose site-to-site IPsec. ESP encrypts; AH does not.",
  "check": [
   [
    "Which IPsec protocol provides encryption?",
    "ESP, IP protocol 50; AH provides integrity and authentication only."
   ],
   [
    "Do hosts at a branch need VPN software for a site-to-site VPN?",
    "No, the gateways encrypt and decrypt traffic, so hosts are unaware of the tunnel."
   ],
   [
    "Why is GRE over IPsec used for some site-to-site VPNs?",
    "Plain IPsec does not carry multicast, so GRE carries routing protocol traffic and IPsec encrypts the GRE tunnel."
   ],
   [
    "What is the difference between full tunnel and split tunnel?",
    "Full tunnel sends all the user's traffic through the VPN; split tunnel sends only corporate traffic through it."
   ]
  ]
 },
 {
  "t": "Security fundamentals: threats, vulnerabilities, exploits, mitigation and user awareness",
  "body": [
   "Security discussions use a few words with precise meanings, and the CCNA expects you to use them correctly. A vulnerability is a weakness in a system, such as unpatched software, a default password or an open management port. A threat is anything that could take advantage of a vulnerability to cause harm, such as an attacker, malware or even a flood. An exploit is the specific method or tool that actually takes advantage of a vulnerability. Risk is the likelihood that a threat will exploit a vulnerability combined with the impact if it does. Mitigation is any measure that reduces risk: removing the vulnerability, reducing the threat's chance of success or limiting the damage.",
   "Know the common attack categories well enough to recognize and defend against them. Reconnaissance gathers information, for example scanning for open ports or reading discovery protocol output such as CDP (Cisco Discovery Protocol), to plan an attack. DoS (denial of service) overwhelms a target so legitimate users cannot use it; DDoS (distributed DoS) uses many compromised machines, often a botnet. Reflection and amplification attacks spoof the victim's address in small requests to services that send much larger replies to the victim. Spoofing forges an identity, such as a source IP, MAC address or DHCP server. Man-in-the-middle, also called on-path, attacks insert the attacker between two parties, for example through ARP spoofing. Password attacks include guessing, brute force and dictionary attacks.",
   "Malware is malicious software. A virus attaches to a file and spreads when that file is run. A worm spreads by itself across networks by exploiting vulnerabilities, with no user action. A trojan pretends to be legitimate software. Ransomware encrypts data and demands payment. Spyware and keyloggers steal information. Social engineering targets people rather than technology. Phishing sends fraudulent messages to many recipients to steal credentials or deliver malware; spear phishing targets specific people, and whaling targets executives. Vishing uses voice calls and smishing uses text messages. Pretexting invents a scenario, such as pretending to be IT support. Tailgating or piggybacking means following an authorized person through a secure door.",
   "Mitigations come in layers, often called defense in depth, so that one failed control does not expose everything. Technical controls include patching, strong passwords and MFA (multifactor authentication, combining two or more of something you know, something you have and something you are), ACLs (access control lists), firewalls, IPS (intrusion prevention systems), port security, DHCP snooping, dynamic ARP inspection, encryption and disabling unused services and ports. Physical controls include locked wiring closets, badge readers and cameras. Administrative controls include policies, procedures and background checks.",
   "Because many attacks rely on fooling a person, a security program must include user awareness. Awareness campaigns keep security in people's minds with posters, emails and simulated phishing tests. User training teaches specific skills, such as how to spot and report phishing or how to handle sensitive data. Physical access control limits who can reach equipment. The CCNA lists these three together as elements of a security program, and they complement technical controls rather than replace them.",
   "Consider a worked example. A switch in a branch still uses the default admin password and runs Telnet; that is the vulnerability. An outside criminal group scanning the internet for such devices is the threat. A script that logs in with default credentials is the exploit. Because the switch carries payment traffic, the risk is high. Mitigation includes changing to strong credentials with AAA, disabling Telnet in favour of SSH, restricting management access with an access-class ACL, moving management to a separate VLAN, and adding MFA through the AAA server. Separately, staff receive training after a simulated phishing test shows that many clicked a fake password-reset link, and the wiring closet gets a badge reader so only network staff can reach the switch.",
   "Common mistakes: swapping the terms threat, vulnerability and exploit; thinking technical controls alone are enough; confusing awareness (general reminders) with training (specific skills); calling a worm a virus when no user action was needed; and assuming a DoS steals data rather than denying availability. Remember too that insiders are threats, not only outside attackers.",
   "Exam questions often give a scenario and ask you to label it. Clue words: 'weakness', 'unpatched', 'default password' point to vulnerability; 'person or event that could cause harm' points to threat; 'code or technique used to take advantage' points to exploit. 'Spreads on its own' means worm; 'disguised as useful software' means trojan; 'encrypts files and demands payment' means ransomware. 'Email to many users' means phishing; 'targets the CEO' means whaling; 'phone call' means vishing; 'text message' means smishing; 'follows an employee through a door' means tailgating. 'Simulated phishing and posters' is an awareness program; 'teaching staff to report suspicious email' is training."
  ],
  "terms": [
   [
    "Vulnerability",
    "A weakness in a system that could be taken advantage of."
   ],
   [
    "Threat",
    "Anything, such as an attacker, malware or natural event, that could exploit a vulnerability to cause harm."
   ],
   [
    "Exploit",
    "The specific tool or technique used to take advantage of a vulnerability."
   ],
   [
    "Mitigation",
    "A measure that reduces risk by removing a weakness, blocking a threat or limiting damage."
   ],
   [
    "Defense in depth",
    "Layering technical, physical and administrative controls so one failure does not expose everything."
   ],
   [
    "Phishing",
    "Fraudulent messages that trick recipients into revealing credentials or running malware."
   ],
   [
    "MFA",
    "Multifactor authentication, requiring two or more factors from know, have and are."
   ]
  ],
  "example": "A manufacturing company is hit by ransomware that entered through a phishing email and then spread using an unpatched file-sharing vulnerability. In the recovery, the team patches systems, enables MFA for remote access, segments the plant network with ACLs, and restores data from offline backups. It also starts quarterly awareness campaigns and phishing simulations with follow-up training for staff who click, because the original entry point was a person, not a firewall gap.",
  "tip": "The weakness is the vulnerability, the potential attacker or event is the threat, and the tool or technique is the exploit. Exam distractors swap them, so match the wording carefully.",
  "check": [
   [
    "An unpatched router operating system is an example of what?",
    "A vulnerability, a weakness that a threat could exploit."
   ],
   [
    "What distinguishes a worm from a virus?",
    "A worm spreads by itself across networks without user action; a virus needs its host file to be run."
   ],
   [
    "Name the three elements of a security program listed in the CCNA objectives.",
    "User awareness, user training and physical access control."
   ],
   [
    "An attacker calls the help desk pretending to be a manager locked out of email. What is this?",
    "Social engineering by pretexting over the phone, also called vishing."
   ]
  ]
 },
 {
  "t": "AI in network operations: predictive AI and machine learning (anomaly detection, predictive analytics) vs generative AI",
  "body": [
   "Networks generate far more data than people can watch: interface counters, logs, flow records, wireless client statistics and more. AI (artificial intelligence) helps operations teams make sense of it. The CCNA distinguishes two broad families: predictive AI, built on machine learning that finds patterns in data and forecasts outcomes, and generative AI, which creates new content such as text or configuration. They solve different problems, and you should be able to tell which one a scenario describes.",
   "ML (machine learning) is a way of building systems that learn patterns from data instead of following rules written by hand. In supervised learning, the model trains on labelled examples, such as past events tagged 'failure' or 'normal', and learns to classify new data. In unsupervised learning, the model looks for structure in unlabelled data, such as grouping similar behaviour or noticing outliers. Both need good, representative data; a model trained on unrepresentative or poor-quality data makes poor predictions, which is often summarized as garbage in, garbage out.",
   "Anomaly detection is one of the most common uses in networking. The system first learns a baseline of normal behaviour for each device, link or user, including how it varies by time of day and day of week. It then flags deviations: a sudden jump in traffic from one host, an AP (access point) with unusually many failed client associations, or DHCP taking longer than normal. Because the baseline is learned and dynamic, it catches problems that a fixed threshold would miss and raises fewer false alarms when load changes predictably, such as a Monday morning spike. A static threshold, by contrast, is a rule a person wrote, such as alert when CPU exceeds 80 percent.",
   "Predictive analytics uses historical trends to forecast what will happen. Examples include predicting when a WAN link will reach capacity so you can upgrade before users suffer, forecasting which hardware is likely to fail based on error trends, or anticipating that a wireless area will be congested during an event. The value is shifting operations from reactive, fixing things after complaints, to proactive, preventing the complaint.",
   "Generative AI, based on LLMs (large language models) and similar models, produces new content in response to a prompt. In network operations it can summarize long logs or incident timelines in plain language, explain unfamiliar show command output, draft a configuration snippet or script, write documentation, or answer questions through a natural-language assistant. Its key limitation is that it can produce confident but wrong output, often called hallucination, so anything it generates, especially configuration, must be reviewed and tested before use. It also raises data-handling questions: sending device configurations or logs to an external service may expose sensitive information such as addresses, usernames or keys.",
   "Consider a worked example. A campus network management platform learns that the library's wireless normally carries a certain level of traffic with few authentication failures. One evening, its anomaly detection flags a sharp rise in failed 802.1X attempts on two APs, well above the learned baseline for that hour, though below any fixed threshold an engineer had set. Its predictive analytics also forecasts that the library's uplink will saturate during exam week based on last year's trend. The engineer then asks the platform's generative assistant to summarize the authentication failures; it produces a readable summary and suggests the RADIUS certificate may have expired. The engineer verifies this with `show` commands and the RADIUS logs before acting, because the suggestion could be wrong.",
   "Common mistakes: calling any AI feature generative; assuming machine learning needs no data preparation; treating generative output as verified fact; confusing a learned baseline with a static threshold; and forgetting privacy when pasting configurations into an external tool. Many platforms combine both families, for example an anomaly detection engine raising an alert and a generative assistant summarizing it and suggesting next steps for an engineer to verify.",
   "Exam questions usually describe what the system does and ask which type it is. Clue words 'baseline', 'anomaly', 'deviation from normal', 'forecast', 'trend', 'predict failure' or 'classify' point to predictive AI and machine learning. 'Draft', 'summarize', 'generate a configuration', 'chat assistant' or 'natural-language prompt' point to generative AI. 'Labelled training data' means supervised learning; 'finds groups or outliers without labels' means unsupervised. 'Confident but incorrect answer' is hallucination, and the right response is human review and testing."
  ],
  "terms": [
   [
    "Machine learning",
    "Building systems that learn patterns from data rather than following hand-written rules."
   ],
   [
    "Predictive AI",
    "AI that analyses data to detect, classify and forecast, such as anomaly detection."
   ],
   [
    "Generative AI",
    "AI that creates new content such as text, code or configuration from a prompt."
   ],
   [
    "Baseline",
    "A learned picture of normal behaviour against which deviations are measured."
   ],
   [
    "Anomaly detection",
    "Flagging behaviour that deviates significantly from the learned baseline."
   ],
   [
    "Predictive analytics",
    "Using historical trends to forecast future events such as capacity exhaustion or failures."
   ],
   [
    "Hallucination",
    "Confident but incorrect output from a generative model."
   ]
  ],
  "example": "A regional ISP uses machine learning on interface error counters and optical power readings to predict which customer-facing links are likely to fail in the coming weeks, and schedules proactive replacements. Its engineers also use a generative assistant to draft maintenance notices and summarize overnight alarms, but every drafted configuration is checked in a lab before deployment because the assistant has occasionally suggested commands that do not exist on their platform.",
  "tip": "Words like baseline, anomaly, forecast, trend and classification point to predictive AI and machine learning. Words like draft, summarize, generate and natural-language prompt point to generative AI.",
  "check": [
   [
    "A system learns normal traffic for each hour of the week and alerts on unusual spikes. Which kind of AI is this?",
    "Predictive AI using machine learning for anomaly detection against a learned baseline."
   ],
   [
    "What is a key risk of using generative AI to write device configurations?",
    "It can produce plausible but wrong commands, so output must be reviewed and tested before use."
   ],
   [
    "What is the difference between supervised and unsupervised learning?",
    "Supervised learning trains on labelled examples; unsupervised learning finds structure or outliers in unlabelled data."
   ],
   [
    "Why can a learned baseline beat a static threshold?",
    "It adapts to normal patterns such as daily peaks, catching unusual behaviour below a fixed limit and raising fewer false alarms during expected load."
   ]
  ]
 },
 {
  "t": "Agentic AI in network operations: agents that plan steps and call tools, with guardrails and human approval",
  "body": [
   "Generative AI on its own answers questions or drafts text. Agentic AI goes further: an AI agent is given a goal, plans the steps to reach it, calls tools to gather information or take actions, looks at the results and decides what to do next, repeating until the goal is met or it needs help. In network operations, that could mean an agent that investigates an alert by running show commands, checking a monitoring system and a ticket history, and then proposing or applying a fix.",
   "The loop has recognizable parts. A language model provides the reasoning: interpreting the goal, breaking it into steps and choosing tools. Tools are the defined functions the agent is allowed to call, such as run a read-only command on a device, query the telemetry database, open a ticket or push a configuration change through the controller API (application programming interface). Each tool has a clear description and defined inputs so the model knows when and how to use it. Memory or context holds what the agent has learned so far in the task. The agent observes each tool's output and updates its plan, a cycle often described as plan, act, observe, repeat.",
   "Because an agent can take real actions, safety design matters far more than with a chatbot. Guardrails are the limits and checks placed around the agent. Common guardrails include least privilege, giving the agent only the tools and permissions the task needs, such as read-only access for diagnosis; scoping which devices or sites it may touch; validation, such as checking a proposed configuration against policy or running it in a test environment first; rate limits and change windows; and complete logging of every step and tool call for audit.",
   "Human approval, often called human-in-the-loop, is the most important guardrail for changes. The agent may diagnose and propose on its own, but a person reviews and approves before any change that could affect production is executed. Many organizations start agents in read-only or recommend-only mode and expand their autonomy only for low-risk, well-understood actions as trust grows. The agent should also know when to stop and escalate, rather than guessing, for example when results contradict each other or a step fails.",
   "Risks to recognize include acting on a wrong conclusion, since the underlying model can be mistaken; making changes that cascade across many devices quickly; prompt injection, where untrusted input such as a log line, web page or ticket text contains instructions that try to steer the agent; and data exposure if sensitive information passes to external services. These are addressed with the guardrails above, by treating tool outputs and external text as data rather than instructions, and by keeping named humans accountable for changes.",
   "Consider a worked example. A monitoring system raises an alert that users at a branch cannot reach a cloud application. An operations agent receives the goal 'find the cause and propose a fix'. It plans its steps, calls a read-only tool to run `show ip route` and `show ip ospf neighbor` on the branch router, finds a neighbour missing, calls `show interfaces` and sees the WAN interface down with errors, then queries the ticket system and finds the provider reported a fault. It drafts a proposal to shift traffic to the backup link by adjusting an OSPF cost. Because the change affects production, the agent stops and requests approval; an engineer reviews the evidence, approves during the change window, and the agent applies the change through the controller API and logs every step. When a ticket comment later contains text telling the agent to disable logging, the agent treats it as data and ignores it.",
   "Common mistakes: calling a simple chatbot agentic; giving an agent broad write access to every device from the start; assuming logging is optional because the agent is automated; and trusting text from logs or tickets as commands. For the exam, remember the distinction: generative AI produces content when asked, while agentic AI autonomously plans multi-step work and calls tools to act.",
   "Exam questions typically describe behaviour and ask what it is or what control is best. Clue words 'plans steps', 'calls tools or APIs', 'acts on results' or 'works toward a goal' point to agentic AI. 'Limit the agent to read-only commands' is least privilege; 'an engineer must approve before changes' is human-in-the-loop; 'a ticket contains hidden instructions' is prompt injection; 'record every action' is audit logging. The best-practice answer for production changes almost always includes human approval."
  ],
  "terms": [
   [
    "Agentic AI",
    "AI that pursues a goal by planning steps, calling tools, observing results and deciding what to do next."
   ],
   [
    "Tool",
    "A defined function an agent may call, such as a read-only show command or an API request."
   ],
   [
    "Guardrails",
    "Limits and checks around an agent, such as scoped permissions, validation and logging."
   ],
   [
    "Human-in-the-loop",
    "Requiring a person to review and approve an agent's proposed action before it runs."
   ],
   [
    "Least privilege",
    "Giving the agent only the tools and permissions the task requires."
   ],
   [
    "Prompt injection",
    "Untrusted input that contains instructions trying to steer an AI agent."
   ]
  ],
  "example": "A data centre team pilots an agent that handles overnight interface alerts. For the first months it has only read-only tools: it collects show output, checks recent changes and writes a diagnosis in the ticket. After the team sees that its diagnoses are reliable, they allow it to bounce a single access port on its own, while any routing or ACL change still waits for an on-call engineer's approval, and every tool call is logged.",
  "tip": "If a scenario describes an AI that decides on steps and executes them through tools, it is agentic AI. The best-practice answer almost always includes least privilege and human approval before production changes.",
  "check": [
   [
    "What distinguishes agentic AI from generative AI?",
    "Agentic AI plans multi-step work and calls tools to act on its own; generative AI produces content in response to a prompt."
   ],
   [
    "Name two guardrails for an operations agent.",
    "Any two of least privilege, scoped device access, validation or testing, change windows, audit logging and human approval."
   ],
   [
    "What is prompt injection?",
    "Untrusted input, such as log or ticket text, containing instructions that try to redirect the agent, which should be treated as data."
   ],
   [
    "Why do organizations often start agents in read-only mode?",
    "To build trust in their diagnoses without risking production changes, expanding autonomy only for low-risk actions later."
   ]
  ]
 },
 {
  "t": "Writing prompts for a generative AI system: persona, instructions, data classification, output format",
  "body": [
   "A generative AI system responds to the prompt you give it, and the quality of its answer depends heavily on how clear that prompt is. A vague request such as 'fix my OSPF' leaves the model to guess the device type, the problem, what you already tried and what kind of answer you want. A well-structured prompt gets more accurate, more useful output on the first try. The CCNA frames good prompting around a few elements: persona, instructions, context and data, and output format, together with handling data according to its classification.",
   "A persona tells the model what role to take and at what level to pitch the answer, for example: 'You are a senior network engineer reviewing Cisco IOS configurations for a mid-sized enterprise.' This steers vocabulary, assumptions and depth. You can also describe the audience: 'Explain it for a help-desk technician who is new to routing.' The same question answered for a senior engineer and for a new technician should look quite different, and the persona and audience tell the model which one you need.",
   "Instructions state the task precisely. Say what you want done, with any constraints: 'Review the OSPF configuration below for reasons the neighbour with R2 is not forming. List each problem, the evidence for it in the output, and the command to fix it. Do not change the area design.' Break complex tasks into steps, give the relevant context such as the platform, software family and what you have already checked, and include an example of what a good answer looks like if the format is unusual. Clear, specific, positive instructions ('do this') work better than long lists of prohibitions.",
   "Data is the material the model works on: show command output, configuration excerpts, log lines. Provide only what the task needs, and mark it clearly, for example between separators such as lines of dashes or labelled sections, so the model knows what is data and what is instruction. That separation also helps defend against instructions hidden inside pasted text. This matters because of data classification. Organizations classify information by sensitivity, such as public, internal, confidential and restricted, and policy decides which classes may be shared with which AI tools. Device configurations often contain passwords, SNMP (Simple Network Management Protocol) community strings, pre-shared keys, internal addressing and customer data. Before pasting them into a prompt, check the tool is approved for that classification, and redact or replace secrets and identifying details. Public AI services may retain or process data outside your control.",
   "Output format tells the model how to present the result so you can use it directly: 'Respond as a table with columns Problem, Evidence and Fix', 'Return only the IOS configuration commands, one per line', or 'Produce valid JSON (JavaScript Object Notation) with the keys device, issue and remediation'. Structured output is especially useful when the response feeds a script or ticketing system, because the next step can parse it without a person reformatting it.",
   "Consider a worked example. An engineer first types: 'why is OSPF broken'. The answer is a generic list of ten possible causes. She rewrites the prompt: 'You are a senior network engineer. Task: identify why R1 and R2 are not forming an OSPF adjacency, using only the output between the markers. For each issue give the evidence and the fix. Output a table with columns Issue, Evidence, Fix.' She then pastes `show ip ospf interface g0/0` from both routers, after replacing the authentication key with REDACTED and the public addresses with documentation addresses, because the company classifies configurations as confidential and the tool is approved only for internal data. The model points out that the hello intervals differ, citing the lines. She confirms this on the devices before changing anything.",
   "Common mistakes: pasting complete running configurations with secrets; leaving out the platform or what has already been tried; asking several unrelated questions at once; accepting the output without checking commands against documentation; and repeating the same vague prompt instead of refining it. Treat the output as a draft. Check facts, commands and syntax, and test changes in a lab before production. If the answer misses the mark, add missing context, tighten the instructions or give an example.",
   "Exam questions usually describe a prompt and ask which element it shows or what is missing. Clue words: 'act as' or 'you are a' means persona; 'list', 'compare' or 'do not change' means instructions and constraints; 'the output below' means data or context; 'as a table', 'in JSON', 'one command per line' means output format. 'The configuration contains keys and passwords' or 'confidential data' points to data classification, and the correct action is to redact or use an approved tool. 'The model gave a generic answer' points to missing context or specific instructions."
  ],
  "terms": [
   [
    "Prompt",
    "The input text that tells a generative AI system what to do."
   ],
   [
    "Persona",
    "The role and expertise the model is asked to adopt, which shapes its vocabulary and depth."
   ],
   [
    "Instructions",
    "The specific task, steps and constraints the model should follow."
   ],
   [
    "Context and data",
    "The background facts and material, such as show output, the model should use."
   ],
   [
    "Data classification",
    "Labelling information by sensitivity to decide how it may be handled and shared."
   ],
   [
    "Redaction",
    "Removing or replacing sensitive values such as passwords and keys before sharing data."
   ],
   [
    "Output format",
    "The required structure of the answer, such as a table, JSON or plain commands."
   ]
  ],
  "example": "A service provider's NOC (network operations centre) team writes a standard prompt template for summarizing overnight alarms. It sets the persona as a NOC shift lead, instructs the model to group alarms by site and severity, pastes syslog lines between markers after a script strips customer names and IP addresses, and asks for a Markdown table plus three bullet points of recommended checks. The morning shift gets a consistent summary, and no customer data leaves the approved system.",
  "tip": "A strong prompt names who the model should be, what exactly to do, what data to use and how to format the answer, and it never includes secrets that the data classification policy forbids sharing.",
  "check": [
   [
    "What does the persona element of a prompt do?",
    "It sets the role and expertise the model should adopt, which shapes the depth and vocabulary of the answer."
   ],
   [
    "Why should you consider data classification before pasting a running configuration into an AI tool?",
    "Configurations can contain passwords, keys and internal details that policy may forbid sharing with that tool, so they must be redacted or kept in an approved tool."
   ],
   [
    "Give an example of an output format instruction.",
    "'Return a table with columns Problem, Evidence and Fix' or 'Return valid JSON with the keys device and remediation'."
   ],
   [
    "The model returns a generic answer. What should you do?",
    "Refine the prompt with more context, specific instructions and the relevant data rather than repeating it."
   ]
  ]
 },
 {
  "t": "Network management approaches: device-by-device CLI, cloud-managed, controller-based, automation, infrastructure as code",
  "body": [
   "How you manage a network determines how quickly you can make changes, how consistent devices are and how often mistakes cause outages. The CCNA compares several approaches, from traditional to modern, and expects you to understand the trade-offs rather than declare one always best. Real networks usually mix them, and knowing when each fits is the skill being tested.",
   "Device-by-device CLI (command-line interface) management is the traditional approach: an engineer connects to each router or switch with SSH or the console and types commands. It gives complete control and is essential for troubleshooting and for recovering a device when everything else fails. But it scales poorly. Making the same change on two hundred switches takes a long time, typos creep in, configurations drift apart over time and there is little record of who changed what unless AAA accounting is in place.",
   "Cloud-managed networking puts the management plane in a vendor-hosted cloud dashboard, as with Cisco Meraki. Devices connect out to the cloud, receive their configuration and report status. Administrators manage many sites from one web interface with templates, and new devices can be shipped to a site and configure themselves when plugged in, known as ZTP (zero-touch provisioning). User data traffic still flows locally rather than through the cloud. The trade-offs are dependence on internet connectivity for management and on the vendor platform and its licensing.",
   "Controller-based networking uses an on-premises or private-cloud controller, such as Cisco Catalyst Center (formerly DNA Center) for campus networks or a WLC (wireless LAN controller) for access points. The controller holds the intended policy, pushes configuration to devices, collects telemetry and offers assurance views. Administrators express intent, such as 'these user groups may reach these applications', and the controller translates it into device configuration. It exposes APIs (application programming interfaces) so other tools can automate against it.",
   "Automation means using scripts and tools, such as Python or Ansible, to perform tasks that would otherwise be typed by hand: pushing standard configurations, collecting show output from many devices, checking compliance or upgrading software. Automation provides speed and consistency and reduces human error, but a mistake in a script can spread to many devices quickly, so testing and a staged rollout matter. IaC (infrastructure as code) takes automation further by describing the desired state of the network in files, such as YAML variables and templates, stored in version control like Git. Changes are made by editing those files, reviewing them through pull requests, testing them automatically and then deploying them with tools such as Ansible or Terraform. The files become the source of truth, you gain a full history of every change and the ability to roll back, and new sites can be built repeatably.",
   "Consider a worked example. A company with 150 retail stores needs to change the NTP servers on every store switch. With CLI, an engineer would log in 150 times over several days, and a few stores would inevitably be missed or mistyped. With IaC, the engineer edits one line in a YAML variables file in Git, opens a pull request, a colleague reviews it, and an automated test renders the configurations and checks syntax. After approval, an Ansible pipeline applies the change to all stores in batches, starting with five pilot stores. The Git history records who changed what and why, and reverting the commit would roll the change back. The same company manages its store Wi-Fi from a cloud dashboard, and its head-office campus through Catalyst Center, while engineers still use the CLI when a single switch misbehaves.",
   "Common mistakes: thinking automation removes the need for CLI skills; assuming cloud-managed means user traffic goes through the cloud; confusing a controller with infrastructure as code (a controller is a platform, IaC is a practice of versioned, declared state); running untested scripts against production; and treating the device's running configuration as the source of truth after adopting IaC, which lets manual changes drift away from the files.",
   "Exam questions pair keywords with approaches. 'Version control', 'source of truth', 'pull request' or 'declared desired state' mean infrastructure as code. 'Web dashboard hosted by the vendor', 'zero-touch provisioning' or 'devices phone home to the cloud' mean cloud-managed. 'Intent', 'assurance', 'northbound API' or 'central policy pushed to devices' mean controller-based. 'Python script' or 'Ansible playbook' means automation. 'Log in to each device' means traditional CLI, whose weaknesses are scale, consistency and configuration drift."
  ],
  "terms": [
   [
    "Device-by-device CLI",
    "Managing each device individually by typing commands over SSH or console."
   ],
   [
    "Cloud-managed networking",
    "Managing devices from a vendor-hosted dashboard that devices connect out to, such as Meraki."
   ],
   [
    "Controller-based networking",
    "A central controller that holds policy, programs devices and exposes APIs."
   ],
   [
    "Automation",
    "Using scripts and tools to perform repetitive network tasks consistently and quickly."
   ],
   [
    "Infrastructure as code",
    "Describing desired network state in version-controlled files that tools apply automatically."
   ],
   [
    "Source of truth",
    "The authoritative record of intended configuration, such as files in Git."
   ],
   [
    "Configuration drift",
    "Gradual divergence of device configurations from the intended standard."
   ]
  ],
  "example": "A university used to configure each of its 400 access switches by hand, and audits kept finding ports with old VLANs and missing security settings. It moves switch configuration into templates and variables in Git, reviewed through pull requests and applied by Ansible, and a nightly job compares running configurations with the templates to report drift. Wi-Fi is managed through a wireless controller, and engineers still use the CLI for troubleshooting individual devices.",
  "tip": "Match keywords: version control, source of truth and pull request mean infrastructure as code; web dashboard hosted by the vendor means cloud-managed; intent and northbound API mean controller-based.",
  "check": [
   [
    "What is the main weakness of device-by-device CLI management?",
    "It scales poorly, leading to slow changes, typos, inconsistent configurations and drift."
   ],
   [
    "What makes infrastructure as code different from simply running scripts?",
    "The desired state lives in version-controlled files that are reviewed, tested and applied, giving history, repeatability and rollback."
   ],
   [
    "In a cloud-managed network, does user traffic go through the vendor's cloud?",
    "No, the management plane is in the cloud but user data traffic is forwarded locally."
   ],
   [
    "Why is testing important before running automation against production?",
    "A single mistake in a script can be applied to many devices at once, causing a wide outage."
   ]
  ]
 },
 {
  "t": "Controller-based networking: management, control and data planes; northbound and southbound APIs",
  "body": [
   "To understand controller-based networking, you first need the idea of planes: the logical jobs a network device performs. Separating these jobs, and moving some of them to a central controller, is the core idea behind SDN (software-defined networking). The CCNA expects you to classify functions by plane and to know which interfaces a controller uses in each direction.",
   "The data plane, also called the forwarding plane, moves user traffic: it receives frames and packets, looks up where they go, applies features such as ACLs and NAT, and forwards them out an interface. It works at high speed, often in specialized hardware such as ASICs (application-specific integrated circuits). The control plane builds the information the data plane uses. Routing protocols such as OSPF, STP (Spanning Tree Protocol), ARP and the building of the MAC and routing tables are control plane functions. The management plane is how administrators and systems manage the device: SSH, SNMP, syslog, NTP configuration and APIs. A simple test: if it forwards user traffic, it is data plane; if it decides how traffic should be forwarded, it is control plane; if it lets people or tools configure and monitor the device, it is management plane.",
   "In a traditional network, every device has its own control plane and management plane. Each router runs OSPF, each switch runs spanning tree, and each is configured separately. In a controller-based design, a central controller takes over management and some or all control-plane functions. The controller has a network-wide view, calculates policy or paths, and programs devices, which keep doing the data-plane forwarding. In practice, most enterprise controllers such as Cisco Catalyst Center centralize management and policy while devices still run distributed routing protocols, whereas pure SDN designs, like early OpenFlow deployments, moved forwarding decisions themselves to the controller.",
   "The controller communicates in two directions, described with the controller drawn in the middle. SBIs (southbound interfaces) connect the controller down to network devices, to push configuration and collect state. Examples include NETCONF (Network Configuration Protocol), RESTCONF, OpenFlow and gRPC, as well as traditional SSH, CLI and SNMP. NBIs (northbound interfaces) connect the controller up to applications, scripts, orchestration and IT systems, which use them to request changes and read data. Northbound APIs are usually REST (Representational State Transfer) APIs: HTTP-based, using verbs such as GET, POST, PUT and DELETE, and exchanging data usually encoded as JSON (JavaScript Object Notation).",
   "Cisco's campus fabric, SD-Access (Software-Defined Access), illustrates the model. It separates an underlay, the physical network of switches and IP routing that provides reachability, from an overlay, virtual tunnels using VXLAN (Virtual Extensible LAN) built on top that carry user traffic and enforce segmentation. Catalyst Center automates and manages it, while policy is enforced with identity-based groups. Benefits of controller-based networking include centralized, consistent configuration; network-wide visibility and assurance; faster deployment; policy expressed as intent; and APIs that let other systems automate the network. The trade-off is dependence on the controller, which must itself be highly available and secured, because it can change every device.",
   "Consider a worked example. An IT service management system needs to create a new guest VLAN at a site when a ticket is approved. It sends an HTTPS POST with a JSON body to the controller's northbound REST API. The controller validates the request against policy, then uses southbound NETCONF sessions to push the VLAN and SVI (switch virtual interface) configuration to the site's switches. The switches' data planes start forwarding guest traffic in the new VLAN, their control planes run spanning tree for it, and the controller confirms success back to the ticketing system with a JSON response. The engineer never logs in to a switch, but the controller's audit log records the change.",
   "Common mistakes: calling the device-facing API northbound; thinking a controller forwards user traffic in a typical enterprise design; placing SSH in the control plane; assuming that controller-based means routing protocols disappear; and forgetting that REST is the usual northbound style while NETCONF and RESTCONF are southbound. Remember that the direction is always named from the controller's point of view.",
   "Exam questions often list functions or protocols and ask for the plane or the direction. Clue words: 'forwards frames', 'applies an ACL to traffic' or 'hardware lookup' mean data plane; 'OSPF', 'STP', 'builds the routing table' mean control plane; 'SSH', 'SNMP', 'syslog' mean management plane. 'Script talks to the controller', 'REST' and 'JSON' mean northbound; 'controller configures switches', 'NETCONF', 'OpenFlow' mean southbound. 'Underlay' is physical reachability; 'overlay' is the virtual network on top."
  ],
  "terms": [
   [
    "Data plane",
    "The forwarding function that moves user traffic through a device."
   ],
   [
    "Control plane",
    "Functions such as routing protocols and STP that decide how traffic should be forwarded."
   ],
   [
    "Management plane",
    "Functions such as SSH, SNMP and syslog used to configure and monitor a device."
   ],
   [
    "SDN",
    "Software-defined networking, centralizing control or management in software controllers."
   ],
   [
    "Northbound interface",
    "The API between the controller and applications, usually REST with JSON."
   ],
   [
    "Southbound interface",
    "The interface between the controller and devices, such as NETCONF, RESTCONF, OpenFlow or SSH."
   ],
   [
    "Underlay and overlay",
    "The physical routed network, and the virtual tunnelled network built on top of it."
   ]
  ],
  "example": "A hospital uses a campus controller to manage 80 switches. Its security team's script calls the controller's northbound REST API to quarantine a compromised laptop by moving it into a restricted group. The controller pushes the change to the access switch over its southbound interface, and the switch's data plane immediately starts enforcing the restriction on that laptop's traffic, while OSPF and spanning tree keep running on the switches as before.",
  "tip": "Northbound is controller to applications (usually REST and JSON); southbound is controller to devices (NETCONF, RESTCONF, OpenFlow, SSH, SNMP). OSPF and STP are control plane; forwarding a frame is data plane; SSH is management plane.",
  "check": [
   [
    "Which plane does OSPF belong to?",
    "The control plane, because it builds the routing information used for forwarding decisions."
   ],
   [
    "An automation script sends a REST request to the controller. Which interface is that?",
    "Northbound, between applications and the controller."
   ],
   [
    "Give two examples of southbound protocols.",
    "Any two of NETCONF, RESTCONF, OpenFlow, gRPC, SSH or SNMP."
   ],
   [
    "In a typical enterprise controller design, which device forwards user traffic?",
    "The network devices, whose data planes still forward traffic; the controller manages and programs them."
   ]
  ]
 },
 {
  "t": "SNMP: manager, agent, MIB, get/set/trap/inform, v2c communities vs v3 security levels",
  "body": [
   "SNMP (Simple Network Management Protocol) is the long-standing standard for monitoring network devices. It lets a central monitoring system read values such as interface counters, CPU load and temperature, receive alerts when something happens, and, when permitted, change settings. Even as streaming telemetry grows, SNMP remains nearly everywhere, and the CCNA tests its components, message types, ports and versions.",
   "There are three components. The SNMP manager is the NMS (network management station) software that collects, stores and displays data. The SNMP agent is software on each managed device that answers the manager and sends alerts. The MIB (management information base) is the structured collection of variables the agent exposes, organized as a tree. Each variable is identified by an OID (object identifier), a dotted string of numbers such as the one for an interface's input octet counter. Standard MIBs cover common data, and vendors publish their own for device-specific values. You can walk a device's MIB from a management station with a tool such as `snmpwalk`, which issues repeated GetNext or GetBulk requests, to discover which OIDs it supports.",
   "Message types determine who talks and why. Get requests the value of one or more OIDs; GetNext walks to the next OID in the tree; GetBulk, added in v2c, retrieves many values efficiently. Set changes a value on the agent, for example to shut an interface, which is why write access must be tightly controlled. A trap is an unsolicited alert sent from the agent to the manager, such as link down, and is not acknowledged, so it can be lost. An inform is like a trap, but the manager acknowledges it, and the agent resends it if no acknowledgment arrives, making it more reliable at the cost of a little more overhead. Agents listen on UDP port 161; managers receive traps and informs on UDP port 162.",
   "SNMPv1 and v2c secure access only with community strings, which act like shared passwords: typically a read-only (RO) community and a read-write (RW) community. They are sent in clear text, so anyone capturing traffic can read them, and default communities such as 'public' and 'private' are a well-known weakness. On IOS, `snmp-server community N0tPublic RO 10` allows read-only access from sources permitted by ACL 10, and `snmp-server host 10.1.1.5 version 2c N0tPublic` sends traps to the manager. Because a community string alone decides access, anyone who learns the RW string can change the device, so treat it like an administrator password.",
   "SNMPv3 adds real security with users and groups, and three security levels. noAuthNoPriv identifies the user by username only and does not encrypt. authNoPriv authenticates messages with a hash such as SHA (Secure Hash Algorithm), so they cannot be forged or altered, but does not encrypt. authPriv adds encryption such as AES (Advanced Encryption Standard), so contents are confidential. authPriv is the recommended level. In the configuration below, the group requires `priv`, the user has both an authentication and a privacy password, and traps are sent using that user.",
   "```text\nsnmp-server group NMS-GROUP v3 priv\nsnmp-server user nmsuser NMS-GROUP v3 auth sha AuthPass123 priv aes 128 PrivPass123\nsnmp-server host 10.1.1.5 version 3 priv nmsuser\n```",
   "Consider a worked example. A security audit of a regional office finds switches answering SNMP queries with the community 'public' from any address, plus an RW community used by nobody. An attacker on the user VLAN could read the full interface and ARP tables, and with the RW string could even change settings. The engineer removes both communities, creates an SNMPv3 group and user at authPriv as above, applies an ACL so only the NMS at 10.1.1.5 may query, and configures informs rather than traps for critical events so link-down alerts are not lost if a packet is dropped. The NMS is updated with the v3 credentials, and `show snmp user` and `show snmp group` confirm the settings. Graphs keep updating, and a packet capture now shows encrypted SNMP payloads.",
   "Common mistakes: reversing the ports (agents on 161, managers on 162); thinking traps are acknowledged; believing v2c communities are encrypted; assuming authNoPriv hides the data; and leaving RW access enabled when only monitoring is needed. Exam clue words: 'unsolicited alert, not acknowledged' means trap; 'acknowledged alert' means inform; 'change a value' means Set; 'database of variables' means MIB; 'numeric identifier' means OID; 'software on the device' means agent; 'clear-text shared string' means community (v1 or v2c); 'authentication and encryption' means SNMPv3 authPriv; 'authentication but no encryption' means authNoPriv."
  ],
  "terms": [
   [
    "SNMP manager",
    "The network management station software that polls agents and receives alerts."
   ],
   [
    "SNMP agent",
    "Software on a managed device that answers requests and sends traps or informs."
   ],
   [
    "MIB",
    "Management information base, the tree of variables an agent exposes, each identified by an OID."
   ],
   [
    "Trap",
    "An unsolicited, unacknowledged alert sent from agent to manager on UDP 162."
   ],
   [
    "Inform",
    "An alert like a trap that the manager acknowledges, so the agent can resend it."
   ],
   [
    "Community string",
    "A clear-text shared password used by SNMPv1 and v2c for RO or RW access."
   ],
   [
    "authPriv",
    "The SNMPv3 security level that both authenticates and encrypts messages."
   ]
  ],
  "example": "A managed service provider monitors hundreds of customer routers. It standardizes on SNMPv3 authPriv with a per-customer user, restricts SNMP to its collector addresses with ACLs, and uses informs for power supply and link failures so alerts are retried if the WAN drops a packet. Old v2c communities left by previous installers are found by a compliance script and removed.",
  "tip": "Traps are not acknowledged; informs are. For security levels remember the order noAuthNoPriv, authNoPriv, authPriv, and that only authPriv encrypts. Agents listen on UDP 161, managers on UDP 162.",
  "check": [
   [
    "What is the difference between a trap and an inform?",
    "A trap is not acknowledged and can be lost; an inform is acknowledged by the manager and resent if no acknowledgment arrives."
   ],
   [
    "Which SNMPv3 security level provides encryption?",
    "authPriv, which adds privacy (encryption such as AES) to authentication."
   ],
   [
    "Why are SNMPv2c community strings considered weak?",
    "They are shared passwords sent in clear text, and defaults such as public and private are widely known."
   ],
   [
    "Which UDP ports does SNMP use?",
    "Agents receive requests on 161; managers receive traps and informs on 162."
   ]
  ]
 },
 {
  "t": "Configuration management with Ansible: agentless, SSH, YAML playbooks, inventory, idempotency",
  "body": [
   "Ansible is an open-source automation tool widely used to configure network devices and servers. It lets you describe what you want done in readable files and apply it to many devices at once, which makes configuration faster, more consistent and repeatable. The CCNA focuses on how Ansible works, its vocabulary, and how it compares with other configuration management tools such as Puppet and Chef.",
   "Ansible is agentless. You install it on one control node, a Linux or macOS machine, and nothing needs to be installed on the managed devices. For network devices it connects using SSH (Secure Shell) to the CLI, or uses APIs such as NETCONF where supported, which suits routers and switches because you usually cannot install agents on them. Ansible uses a push model: the control node initiates connections and pushes changes when you run it. By contrast, Puppet and Chef traditionally rely on agents installed on managed nodes that pull their configuration from a central server on a schedule.",
   "The inventory lists the devices Ansible manages and organizes them into groups, such as `[core]` and `[access]`, in INI or YAML format. It can also hold variables such as the connection type and platform, for example `ansible_network_os=cisco.ios.ios` and `ansible_connection=ansible.netcommon.network_cli`. Credentials should be kept in encrypted form, such as with Ansible Vault, not in plain text in the inventory or playbooks. Groups can be nested and targeted separately, so a single playbook can apply one task to `core` switches and a different task to `access` switches, and host or group variables let each device receive its own values.",
   "Playbooks describe the work, written in YAML (YAML Ain't Markup Language), a human-readable data format in which indentation defines structure, so spaces matter and tabs are not allowed. A playbook contains one or more plays; each play targets hosts or groups from the inventory and lists tasks; each task calls a module, a unit of code that performs one job, such as `cisco.ios.ios_config` to apply configuration lines or `cisco.ios.ios_command` to run show commands. Templates written in Jinja2 can generate device-specific configuration from variables, such as a hostname or management IP per switch.",
   "```yaml\n- name: Standard NTP on access switches\n  hosts: access\n  gather_facts: false\n  tasks:\n    - name: Configure NTP servers\n      cisco.ios.ios_config:\n        lines:\n          - ntp server 10.1.1.123\n          - ntp server 10.1.2.123\n```",
   "Idempotency is a key concept: running the same playbook many times produces the same end state, and makes changes only where the device does not already match. If NTP is already configured correctly, the task reports 'ok' and changes nothing; if it differs, it reports 'changed'. This lets you safely rerun playbooks to enforce a standard and correct drift. You run a playbook with `ansible-playbook -i inventory.yml ntp.yml`, and the `--check` option performs a dry run that reports what would change without changing it; `--limit` restricts a run to certain hosts. Ansible fits naturally with infrastructure as code: inventories, variables, templates and playbooks live in Git, changes are reviewed, and a pipeline or scheduled job applies them.",
   "Consider a worked example. A company has 120 access switches, and an audit shows that some have one NTP server, some two, and a few the wrong address. The engineer writes the playbook above, lists the switches under `[access]` in the inventory, and stores the SSH credentials in Ansible Vault. A run with `--check --limit lab-sw1` shows the expected change on a lab switch. She then runs it against five pilot switches, then all of them. The summary shows 'changed' on 37 switches that needed fixing and 'ok' on the rest. A week later someone adds a wrong NTP server by hand on one switch; the nightly scheduled run reports it and restores the standard, because rerunning the idempotent playbook is safe.",
   "Common mistakes: thinking Ansible needs an agent on each switch; confusing push (Ansible) with pull (Puppet and Chef); mis-indenting YAML so the playbook fails to parse; storing passwords in clear text; and running untested playbooks against everything at once. Exam clue words: 'agentless', 'SSH', 'push model', 'YAML playbook' mean Ansible; 'agent on the managed node pulls configuration' means Puppet or Chef; 'list of managed devices and groups' means inventory; 'reusable unit that does one job' means module; 'running it again makes no further changes' means idempotency; 'report changes without making them' means check mode."
  ],
  "terms": [
   [
    "Agentless",
    "Managing devices without installing software on them, using SSH or APIs from a control node."
   ],
   [
    "Control node",
    "The machine where Ansible is installed and from which it pushes changes."
   ],
   [
    "Inventory",
    "The file listing managed hosts, their groups and connection variables."
   ],
   [
    "Playbook",
    "A YAML file of plays and tasks that describes the automation to perform."
   ],
   [
    "Module",
    "A unit of code called by a task to do one job, such as ios_config."
   ],
   [
    "Idempotency",
    "Running the same automation repeatedly yields the same end state and changes only what differs."
   ],
   [
    "Push vs pull",
    "Ansible pushes changes from the control node; agent-based tools pull configuration from a server."
   ]
  ],
  "example": "Before a security audit, a network team must ensure every router has the same login banner, SSH version 2 and a specific syslog server. Instead of logging in to 60 routers, they write one Ansible playbook with three tasks, test it with check mode on a lab router, and apply it. The output lists which routers changed and which were already compliant, and the playbook is saved in Git so the same standard can be enforced before every future audit.",
  "tip": "Ansible is agentless, push-based, uses SSH and YAML. Puppet and Chef are agent-based and pull. An exam question describing no software on managed devices points to Ansible.",
  "check": [
   [
    "Why is Ansible described as agentless?",
    "It connects to devices over SSH or APIs from a control node, so no software is installed on the managed devices."
   ],
   [
    "What does the inventory file contain?",
    "The managed hosts, their groups and variables such as connection type and platform."
   ],
   [
    "What does idempotency mean in Ansible?",
    "Running a playbook again produces the same end state and changes only devices that do not already match."
   ],
   [
    "Which model do Puppet and Chef traditionally use, compared with Ansible?",
    "Agent-based pull, where managed nodes fetch configuration, while Ansible pushes from a control node."
   ]
  ]
 },
 {
  "t": "Syslog: message format, severity levels 0–7, facilities, logging to a server",
  "body": [
   "Syslog is the standard way network devices report events: an interface going down, a configuration change, a failed login, an OSPF neighbour change. Messages can be shown on the console, kept in a memory buffer, sent to SSH sessions, or sent to a central syslog server where they are stored, searched and correlated. Central logging is essential for troubleshooting and security investigations, because device buffers are small and their contents are lost on reload.",
   "A Cisco syslog message has a recognizable structure: an optional sequence number, a timestamp, and then `%FACILITY-SEVERITY-MNEMONIC: description`. For example, `*Mar 1 10:15:32.117: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down`. Here LINEPROTO is the facility (the part of the system that generated the message), 5 is the severity, UPDOWN is the mnemonic identifying the message type, and the rest describes the event. Timestamps come from the device clock, so NTP (Network Time Protocol) and `service timestamps log datetime msec` are needed for useful times; the leading asterisk in the example shows the clock is not synchronized.",
   "There are eight severity levels, and lower numbers are more severe. 0 Emergency: the system is unusable. 1 Alert: immediate action needed. 2 Critical: critical conditions. 3 Error: error conditions. 4 Warning: warning conditions. 5 Notification: normal but significant conditions, such as interface up and down. 6 Informational: informational messages, such as ACL hits. 7 Debugging: output from debug commands. A common memory aid is 'Every Awesome Cisco Engineer Will Need Ice cream Daily'.",
   "When you set a logging level, the device sends messages at that level and every more severe level, meaning lower numbers. `logging trap warnings` (or `logging trap 4`) sends levels 0 to 4 to the syslog server. Setting level 7 sends everything, which can be very noisy and, with debugs running, can load the device. The default for `logging trap` on IOS is informational (6), so unless you change it, the server receives everything except debugging output.",
   "Destinations are configured separately, each with its own level, so the console can stay quiet while the server receives more detail. `logging console` controls messages on the console, `logging monitor` controls messages to VTY (SSH) sessions, which you must also enable in the session with `terminal monitor`, and `logging buffered 16384 informational` keeps messages in RAM for viewing with `show logging`. To send to a server, use `logging host 10.1.1.5` and set the level with `logging trap`. Syslog traditionally uses UDP port 514, which is unreliable and unencrypted, so critical environments may use TCP or TLS-based transport where supported. The syslog facility is also a label on messages sent to a server, used by the server to sort messages from different sources, with values such as local0 through local7. Cisco devices use local7 by default, changeable with `logging facility local5`. Note that this server-side facility is different from the Cisco message facility, such as LINEPROTO, shown in the message text.",
   "```text\nservice timestamps log datetime msec localtime\nlogging buffered 16384 informational\nlogging host 10.1.1.5\nlogging trap notifications\nlogging facility local5\n```",
   "Consider a worked example. An engineer is asked why the central syslog server shows no interface up and down messages from a branch router, even though it shows errors. `show logging` reveals 'Trap logging: level errors', meaning `logging trap 3` is set. Interface state changes are level 5 notifications, so they are filtered out. Changing to `logging trap notifications` as above sends levels 0 to 5, and the next flap appears on the server. She also notices the timestamps show uptime rather than dates, so she adds the `service timestamps` line and confirms NTP is synchronized. Finally, her SSH session shows no messages until she types `terminal monitor`.",
   "Common mistakes: thinking higher numbers are more severe; believing a level sends only that level rather than it and everything lower; forgetting `terminal monitor` in SSH sessions; confusing the server facility (local7) with the message facility; and relying only on the local buffer. Exam clue words: '%LINK-3-UPDOWN' means severity 3, error; 'which levels reach the server with logging trap 4' means 0 to 4; 'debug output' means level 7; 'interface up/down' is typically 5; 'messages not seen over SSH' means `terminal monitor`; 'UDP 514' means syslog; 'timestamps show uptime' means timestamps or NTP."
  ],
  "terms": [
   [
    "Syslog",
    "The standard protocol and format for sending event messages, traditionally over UDP 514."
   ],
   [
    "Severity level",
    "A number from 0 (emergency) to 7 (debugging); lower is more severe."
   ],
   [
    "Mnemonic",
    "The short code in a Cisco message, such as UPDOWN, identifying the message type."
   ],
   [
    "logging trap",
    "Sets the lowest-severity level (highest number) sent to syslog servers."
   ],
   [
    "logging buffered",
    "Stores messages in device RAM for viewing with show logging."
   ],
   [
    "terminal monitor",
    "Enables log messages to appear in the current SSH or Telnet session."
   ],
   [
    "Syslog facility (local0 to local7)",
    "A server-side label used to sort messages; Cisco uses local7 by default."
   ]
  ],
  "example": "A bank's security team requires every network device to send syslog to two central servers at the informational level, with NTP-synchronized timestamps. During an investigation of an unexpected ACL change, they search the servers for %SYS-5-CONFIG_I messages, find the time and source address of the session that made the change, and match it with AAA accounting records, something the small local buffers on the routers could not have provided after a reload.",
  "tip": "Setting a level includes all lower-numbered, more severe levels. If a question sets logging trap 3, the server receives levels 0 through 3 but not warnings (4) or notifications (5).",
  "check": [
   [
    "In `%OSPF-5-ADJCHG`, what do OSPF and 5 mean?",
    "OSPF is the facility that generated the message and 5 is the severity, notification."
   ],
   [
    "Which levels are sent with `logging trap warnings`?",
    "Levels 0 through 4: emergency, alert, critical, error and warning."
   ],
   [
    "Why might an SSH user see no log messages?",
    "`terminal monitor` has not been entered in that session, or `logging monitor` is set to a more restrictive level."
   ],
   [
    "What is the most severe syslog level and its number?",
    "Emergency, level 0, meaning the system is unusable."
   ]
  ]
 },
 {
  "t": "Telemetry and AIOps: streaming telemetry vs polling, baselines and event correlation",
  "body": [
   "Monitoring tells you what a network is doing. The traditional method is polling: a monitoring system such as an SNMP (Simple Network Management Protocol) manager asks each device for values at an interval, often every few minutes. Polling is simple and universal, but it has limits. Anything that happens between polls is averaged away or missed entirely, such as a 20-second traffic burst. Increasing the polling frequency across thousands of devices adds load on both the collector and the devices, because each request must be received, processed and answered.",
   "Streaming telemetry reverses the direction. Instead of the collector asking, the device pushes data continuously to a collector, following a subscription. Subscriptions can be periodic, sending a set of values every few seconds, or on-change, sending an update only when something changes, such as an interface state or a routing neighbour. Model-driven telemetry describes the data with YANG models, a standard way of structuring device data, and typically transports it with protocols such as gRPC or gNMI (gRPC Network Management Interface), or over NETCONF, encoded efficiently. Subscriptions can be dial-in, where the collector connects and subscribes, or dial-out, where the device is configured to connect to the collector. The result is near real-time, fine-grained data with less overhead than intensive polling, which is what AI-driven analysis needs.",
   "AIOps (artificial intelligence for IT operations) applies machine learning and analytics to that operational data: telemetry, logs, events, flow records and tickets. Its goals are to detect problems earlier, reduce alert noise and find root causes faster, so engineers spend their time fixing issues rather than sorting alerts. In practice AIOps sits on top of the telemetry, syslog and SNMP data you already collect; it does not replace good monitoring but makes sense of it.",
   "Baselines are central. Rather than a static threshold such as alert at 80 percent utilization, an AIOps platform learns what normal looks like for each metric on each device, including daily and weekly patterns. It then flags deviations from that dynamic baseline. A link at 70 percent on a Monday morning may be normal; the same link at 70 percent at 3 a.m. may be an anomaly worth investigating, perhaps a backup running at the wrong time or data being copied out.",
   "Event correlation addresses alert storms. When a core switch fails, hundreds of downstream devices may report interface down, OSPF neighbour loss, unreachable hosts and failed application checks. Without correlation, engineers see hundreds of seemingly unrelated alerts. Correlation groups related events by time, topology and dependencies, identifies the probable root cause, the core switch, and presents it as one incident with the downstream symptoms attached. This reduces noise and shortens the MTTR (mean time to repair). AIOps platforms may then suggest or, with guardrails and human approval, trigger remediation, and a generative AI assistant may summarize the incident for the ticket.",
   "Consider a worked example. A distribution switch in a campus building loses power at 09:12. Within a minute, the monitoring system receives streaming on-change updates from 30 access switches reporting uplinks down, syslog messages about lost OSPF neighbours on two routers, and failed health checks from an application monitor for 400 users. The AIOps platform correlates them using the topology map and the tight time window, opens a single incident naming the distribution switch as probable root cause, and suppresses the dependent alerts. Earlier that week, the same platform had flagged the switch's power supply temperature as rising above its learned baseline, though still below the vendor's static threshold, which the team had noted for replacement.",
   "Common mistakes: calling telemetry pull-based; assuming polling every few seconds is equivalent without considering load; confusing a baseline with a fixed threshold; thinking correlation hides problems rather than grouping symptoms under a root cause; and forgetting that correlation depends on accurate timestamps from NTP, consistent logging and telemetry from every device, and an accurate topology. Poor input data leads to poor conclusions.",
   "Exam questions often contrast the two collection methods and the AIOps functions. Clue words: 'collector requests values at intervals' or 'SNMP Get every five minutes' mean polling (pull); 'device sends data by subscription', 'on-change', 'YANG', 'gRPC' or 'near real-time' mean streaming telemetry (push). 'Learns normal patterns' means baseline; 'unusual compared with normal' means anomaly detection; 'hundreds of alerts reduced to one incident' or 'identify root cause across devices' means event correlation."
  ],
  "terms": [
   [
    "Polling",
    "A collector periodically requesting values from devices, as SNMP managers do."
   ],
   [
    "Streaming telemetry",
    "Devices pushing data to a collector by subscription, periodically or on change."
   ],
   [
    "YANG",
    "A data modelling language that structures device configuration and operational data."
   ],
   [
    "AIOps",
    "Artificial intelligence for IT operations, applying machine learning to operational data."
   ],
   [
    "Dynamic baseline",
    "A learned model of normal behaviour, including time-of-day and weekly patterns."
   ],
   [
    "Event correlation",
    "Grouping related alerts by time, topology and dependency to identify a root cause."
   ],
   [
    "On-change subscription",
    "Telemetry that sends an update only when a value or state changes."
   ]
  ],
  "example": "A cloud provider's network team replaced five-minute SNMP polling of its spine switches with streaming telemetry every few seconds. Microbursts that had been invisible in averaged graphs now show up, explaining intermittent packet loss complaints. Its AIOps platform learns baselines for each link and, when a line card fails, groups dozens of resulting alerts into a single incident pointing at that card.",
  "tip": "Polling is pull: the collector asks at intervals. Streaming telemetry is push: the device sends by subscription. Event correlation reduces many related alerts to one root cause, and baselines are learned rather than fixed.",
  "check": [
   [
    "What is the main difference between polling and streaming telemetry?",
    "Polling has the collector request data at intervals (pull); streaming telemetry has devices push data by subscription (push)."
   ],
   [
    "Why can polling miss short events?",
    "Anything that happens between polls is averaged or unseen, such as a burst lasting seconds."
   ],
   [
    "What problem does event correlation solve?",
    "Alert storms, by grouping related symptoms into one incident with a probable root cause."
   ],
   [
    "How is a dynamic baseline different from a static threshold?",
    "A baseline is learned from normal behaviour and varies with time patterns, while a static threshold is a fixed value set by a person."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
