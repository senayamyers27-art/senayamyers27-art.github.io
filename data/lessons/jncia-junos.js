/* Lessons for Juniper Networks Certified Associate, Junos (JNCIA-Junos) (JN0-106): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("jncia-junos", [
 {
  "t": "Collision domains and broadcast domains, and how switches and routers divide them",
  "body": [
   "Two ideas explain a lot about how Ethernet networks behave as they grow: the collision domain and the broadcast domain. A collision domain is the set of devices whose transmissions can collide with each other on a shared medium. A broadcast domain is the set of devices that all receive a Layer 2 broadcast frame (one sent to the destination MAC address ff:ff:ff:ff:ff:ff) when any one of them sends it. The JNCIA-Junos exam expects you to know which devices split which domain, and why that matters for performance.",
   "Collisions come from the early days of Ethernet, when every station shared one cable or was connected through a hub. A hub is a Layer 1 repeater: whatever arrives on one port is copied out every other port, so only one device can transmit at a time. If two send at once, the signals collide, both stop, wait a random time and try again. That access method is CSMA/CD (carrier sense multiple access with collision detection), and it only applies to half-duplex links. Every port on a hub is in the same collision domain, so adding devices means more collisions and less usable bandwidth.",
   "A switch fixes this. Each switch port is its own collision domain, because the switch buffers frames and forwards them only where they need to go. When a port runs full duplex, which is normal today, the device can send and receive at the same time and collisions cannot happen at all. So a 24-port switch creates 24 collision domains.",
   "A switch does not, however, stop broadcasts. By default it floods a broadcast frame out every port in the same VLAN (virtual LAN) except the one it came in on. All those ports form one broadcast domain. Broadcasts are necessary, because ARP requests and DHCP discovery use them, but in a very large flat network they consume bandwidth and CPU on every host. VLANs let one switch create several separate broadcast domains: each VLAN is its own broadcast domain.",
   "A router divides broadcast domains. It does not forward Layer 2 broadcasts from one interface to another, so each router interface (or each logical unit, on Junos) sits in a different broadcast domain and a different IP subnet. Traffic between broadcast domains must be routed, either by a router or by a Layer 3 switch using an integrated routing and bridging (IRB) interface.",
   "A handy summary: hubs split nothing, switches split collision domains, VLANs and routers split broadcast domains. When you count domains in an exam diagram, count each switch port and router interface as a separate collision domain (a hub and everything on it is one), and count each router interface or VLAN as a separate broadcast domain."
  ],
  "terms": [
   [
    "Collision domain",
    "A network segment where simultaneous transmissions can collide; each switch or router port is its own collision domain."
   ],
   [
    "Broadcast domain",
    "The set of devices that receive a Layer 2 broadcast from any member; bounded by routers and by VLANs."
   ],
   [
    "CSMA/CD",
    "Carrier sense multiple access with collision detection, the half-duplex Ethernet method of listening, detecting collisions and backing off."
   ],
   [
    "Full duplex",
    "A link mode where a device can send and receive at the same time, which removes collisions entirely."
   ],
   [
    "VLAN",
    "Virtual LAN: a logical Layer 2 segment on a switch; each VLAN is a separate broadcast domain."
   ]
  ],
  "example": "An office has 40 PCs on two 24-port EX switches in one VLAN, with an SRX firewall as the gateway. There are about 48 collision domains (one per used switch port) but only one broadcast domain on the LAN side. When the team splits users into a Staff VLAN and a Guest VLAN, the switch now has two broadcast domains, and the SRX (or an IRB interface) must route between them.",
  "tip": "Watch for questions that mix hubs, switches and routers in one diagram. A hub adds no collision domains; a switch adds one per port but none for broadcasts; a router adds a broadcast domain per interface.",
  "check": [
   [
    "How many broadcast domains does a single switch with all ports in the default VLAN create?",
    "One. A switch floods broadcasts out every port in the same VLAN, so without extra VLANs the whole switch is one broadcast domain."
   ],
   [
    "Why can collisions not occur on a full-duplex switch port?",
    "Because the device and the switch port each have a dedicated path to send and receive at the same time, so there is no shared medium for signals to collide on."
   ],
   [
    "What device or feature do you need to separate broadcast domains?",
    "A router (or Layer 3 interface such as an IRB) or VLANs; each router interface and each VLAN is its own broadcast domain."
   ]
  ]
 },
 {
  "t": "What routers and switches do: Layer 2 frame forwarding vs Layer 3 packet forwarding",
  "body": [
   "Switches and routers both move traffic, but they make decisions using different information at different layers. A switch forwards Ethernet frames within a single network using MAC (media access control) addresses, which is Layer 2 of the OSI model. A router forwards IP packets between networks using IP addresses, which is Layer 3. Understanding that split is the foundation for everything else you will configure on Junos devices.",
   "A Layer 2 switch keeps a table that maps MAC addresses to ports, called the MAC table or, on Junos, the Ethernet switching table (`show ethernet-switching table`). When a frame arrives, the switch looks up the destination MAC address. If it knows the port, it forwards the frame out that port only. If not, or if the frame is a broadcast, it floods the frame to all ports in the VLAN. The frame itself is not changed: source and destination MAC stay the same from one end of the switched network to the other.",
   "A router keeps a routing table of destination prefixes (such as 10.1.2.0/24) and the next hop or outgoing interface for each. On Junos the main IPv4 table is `inet.0`, viewed with `show route`. When a packet arrives, the router strips the incoming Layer 2 header, reads the destination IP address, finds the longest (most specific) matching prefix, decrements the TTL (time to live) and builds a new Layer 2 header for the outgoing link, with its own MAC as the source and the next hop's MAC as the destination. So at each routed hop the MAC addresses change while the source and destination IP addresses stay the same.",
   "The two devices also treat unknown traffic differently. A switch floods frames for unknown destinations, because it assumes the device is somewhere on this network. A router drops packets for destinations it has no route to (unless it has a default route, 0.0.0.0/0), and can send an ICMP destination-unreachable message back. Routers also do not forward broadcasts, which is why they bound broadcast domains.",
   "Many modern devices do both. Juniper EX and QFX switches can switch frames in hardware within a VLAN and route between VLANs using IRB interfaces. MX routers can also bridge. On Junos the same idea shows up in the configuration: `family ethernet-switching` on an interface unit means Layer 2 switching, and `family inet` with an address means Layer 3 routing.",
   "For the exam, remember the keywords: frames, MAC addresses, flooding and the switching table for Layer 2; packets, IP addresses, longest match, TTL and the routing table for Layer 3."
  ],
  "terms": [
   [
    "Frame",
    "A Layer 2 unit of data with a header containing source and destination MAC addresses."
   ],
   [
    "Packet",
    "A Layer 3 unit of data with a header containing source and destination IP addresses and a TTL."
   ],
   [
    "Ethernet switching table",
    "The Junos table mapping learned MAC addresses to interfaces and VLANs, shown with `show ethernet-switching table`."
   ],
   [
    "Routing table",
    "A table of destination prefixes and next hops; on Junos the IPv4 unicast table is inet.0."
   ],
   [
    "Longest-prefix match",
    "The rule that a router uses the most specific matching route when several prefixes contain the destination."
   ]
  ],
  "example": "A PC at 10.1.1.10 pings a server at 10.2.2.20. The PC's frame goes through an EX switch unchanged to the gateway router. The router matches 10.2.2.0/24, lowers the TTL by one, rewrites the Ethernet header with its own MAC as source and the server's MAC as destination, and sends it out. A packet capture on each side shows the same IP addresses but different MAC addresses.",
  "tip": "Exam questions like to ask what changes at each hop. In routed traffic, MAC addresses change at every router while IP addresses stay the same (ignoring NAT).",
  "check": [
   [
    "What does a switch do with a frame whose destination MAC is not in its table?",
    "It floods the frame out every port in the same VLAN except the one it arrived on."
   ],
   [
    "What does a router do with a packet when it has no matching route and no default route?",
    "It drops the packet and may send an ICMP destination-unreachable message to the source."
   ],
   [
    "Which header fields does a router rewrite when forwarding a packet?",
    "It builds a new Layer 2 header (new source and destination MAC) and decrements the IP TTL; the source and destination IP addresses stay the same."
   ]
  ]
 },
 {
  "t": "Ethernet frames, MAC addresses (48 bits, OUI) and the MAC learning/flooding process",
  "body": [
   "Ethernet is the Layer 2 technology on almost every LAN (local area network) you will touch. Data is carried in frames, and every frame names its sender and receiver with MAC addresses. Knowing the frame layout and how switches learn addresses helps you read `show ethernet-switching table` output and troubleshoot why traffic is or is not reaching a host.",
   "An Ethernet II frame starts with a preamble that lets the receiver synchronize, then the destination MAC address (6 bytes), the source MAC address (6 bytes), and a 2-byte EtherType that says what is inside, for example 0x0800 for IPv4, 0x86DD for IPv6 and 0x0806 for ARP. If the frame carries an 802.1Q VLAN tag, a 4-byte tag sits between the source MAC and the EtherType. Next comes the payload, normally up to 1500 bytes, and finally a 4-byte frame check sequence (FCS), a CRC (cyclic redundancy check) the receiver uses to detect corruption. Frames that fail the check are dropped and counted as errors.",
   "A MAC address is 48 bits long, written as 12 hexadecimal digits such as `00:05:86:71:2a:c0`. The first 24 bits are the OUI (organizationally unique identifier), assigned by the IEEE to a manufacturer; the last 24 bits are assigned by that manufacturer. Two bits in the first byte are special: the least significant bit marks a group (multicast) address when set, and the next bit marks a locally administered address. The all-ones address ff:ff:ff:ff:ff:ff is the broadcast address.",
   "Switches learn MAC addresses automatically. When a frame arrives, the switch reads the source MAC and records it against the incoming port and VLAN. Then it looks at the destination MAC. If the destination is known, the frame goes out that one port (if the port is the same one it came in on, the frame is filtered, or dropped). If the destination is unknown, broadcast or (by default) multicast, the switch floods it out every other port in the VLAN. When the unknown host replies, its source MAC is learned and future frames are forwarded directly.",
   "Learned entries age out if the switch stops seeing traffic from that address, so the table stays current when devices move. On many Junos switches the default aging time is 300 seconds. You can view the table with `show ethernet-switching table` and clear it with `clear ethernet-switching table`. Because learning is based only on source addresses, a device that never transmits is never learned, and traffic to it keeps being flooded."
  ],
  "terms": [
   [
    "MAC address",
    "A 48-bit Layer 2 hardware address, written as 12 hexadecimal digits, that identifies a network interface."
   ],
   [
    "OUI",
    "Organizationally unique identifier: the first 24 bits of a MAC address, identifying the manufacturer."
   ],
   [
    "EtherType",
    "The 2-byte field that identifies the payload protocol, such as 0x0800 for IPv4 or 0x0806 for ARP."
   ],
   [
    "FCS",
    "Frame check sequence: a CRC at the end of the frame used to detect transmission errors."
   ],
   [
    "Flooding",
    "Sending a frame out all ports in the VLAN except the ingress port, used for broadcasts and unknown destinations."
   ]
  ],
  "example": "You plug a new printer into port ge-0/0/12 of an EX switch. Until the printer sends anything, `show ethernet-switching table` has no entry for it and frames to its MAC are flooded. As soon as it sends a DHCP request, the switch records its MAC against ge-0/0/12 in that VLAN, and later print jobs go only to that port.",
  "tip": "Switches learn from the source MAC and forward based on the destination MAC. Questions often try to swap these two.",
  "check": [
   [
    "How many bits is a MAC address and what do the first 24 bits represent?",
    "48 bits; the first 24 bits are the OUI, which identifies the vendor that made the interface."
   ],
   [
    "Which field of an incoming frame does a switch use to populate its MAC table?",
    "The source MAC address, recorded against the ingress port and VLAN."
   ],
   [
    "Why might traffic to a silent device keep being flooded?",
    "Because the switch never sees a frame with that device's MAC as the source, so it never learns the port and treats the destination as unknown."
   ]
  ]
 },
 {
  "t": "ARP: resolving an IPv4 next hop to a MAC address; gratuitous ARP; `show arp`",
  "body": [
   "IP addresses tell a device where a packet is going, but on an Ethernet link the frame still needs a destination MAC address. ARP (Address Resolution Protocol) bridges that gap for IPv4. Every time a Junos router sends a packet out an Ethernet interface to a next hop, it needs that next hop's MAC address, and ARP is how it gets it.",
   "The process has two messages. First, the sender checks its ARP cache. If there is no entry, it broadcasts an ARP request to ff:ff:ff:ff:ff:ff asking, in effect, 'who has 10.0.0.2? tell 10.0.0.1'. Every host in the broadcast domain receives it, but only the owner of 10.0.0.2 answers, with a unicast ARP reply containing its MAC address. The sender stores the mapping in its ARP cache and sends the waiting packet. The target usually also caches the requester's mapping, since it will probably need to reply.",
   "A key point: a host or router only ARPs for addresses on its own subnet. If the final destination is on another network, the sender ARPs for the next hop (for a host, its default gateway), not for the far-away destination. That is why a wrong default gateway or wrong subnet mask shows up as missing or incorrect ARP entries.",
   "Gratuitous ARP is an ARP message a device sends about its own address without being asked, typically a request or reply where the sender and target IP are the same. Devices send it when an interface comes up or an address changes, for three reasons: to detect a duplicate IP address (if someone answers, the address is already in use), to update other hosts' caches after a MAC change, and to announce a new active device after a failover, for example when a VRRP (Virtual Router Redundancy Protocol) backup takes over a virtual IP. Because ARP has no authentication, attackers can abuse unsolicited replies to poison caches; switch features such as dynamic ARP inspection help defend against that.",
   "On Junos, operational mode commands let you inspect the cache. `show arp` lists entries with MAC address, IP address, name and interface. `show arp no-resolve` skips reverse DNS lookups, which makes output faster and avoids long pauses when DNS is unreachable. `show arp interface ge-0/0/0.0` narrows the view, and `clear arp` removes dynamic entries so they are relearned. Junos ages dynamic ARP entries out after a timer (20 minutes by default), which you can change under `[edit system arp]`.",
   "```\nuser@r1> show arp no-resolve\nMAC Address       Address         Interface      Flags\n2c:6b:f5:10:22:01 10.0.12.2       ge-0/0/0.0     none\n```"
  ],
  "terms": [
   [
    "ARP",
    "Address Resolution Protocol: maps an IPv4 address to a MAC address on the local link using a broadcast request and a unicast reply."
   ],
   [
    "ARP cache",
    "The table of learned IP-to-MAC mappings, shown on Junos with `show arp`."
   ],
   [
    "Gratuitous ARP",
    "An unsolicited ARP about the sender's own IP, used for duplicate address detection and to update neighbors' caches."
   ],
   [
    "no-resolve",
    "A Junos output option that stops the command from doing reverse DNS lookups on addresses."
   ]
  ],
  "example": "After configuring 10.0.12.1/30 on r1 and 10.0.12.2/30 on r2, you ping r2 from r1. The first ping may be slightly slower while ARP runs. Afterward, `show arp no-resolve` on r1 shows r2's MAC against 10.0.12.2 on ge-0/0/0.0, and r2 shows r1's entry too, proving Layer 2 reachability across the link.",
  "tip": "Remember that an ARP request is a broadcast and an ARP reply is normally unicast, and that a device ARPs for its next hop, not for a remote destination.",
  "check": [
   [
    "A host at 192.168.1.10/24 sends to 8.8.8.8. Whose MAC address does it ARP for?",
    "Its default gateway's, because 8.8.8.8 is not on the local subnet; the frame goes to the gateway, which routes it onward."
   ],
   [
    "Name two reasons a device sends a gratuitous ARP.",
    "To detect a duplicate IP address and to update other devices' ARP caches, for example after a failover moves a virtual IP to a new MAC."
   ],
   [
    "Why use `show arp no-resolve` instead of `show arp`?",
    "It skips reverse DNS lookups, so the output appears immediately and is not delayed when DNS is slow or unreachable."
   ]
  ]
 },
 {
  "t": "IPv4 addressing: classes, private ranges, subnet masks, CIDR prefixes and subnetting math",
  "body": [
   "An IPv4 address is 32 bits, written as four decimal octets such as 172.16.5.130. Part of it identifies the network and the rest identifies the host on that network. The subnet mask, or prefix length, says where that boundary is. You will type addresses with prefix lengths on every Junos interface (`set interfaces ge-0/0/0 unit 0 family inet address 172.16.5.129/26`), so subnetting has to become automatic.",
   "Historically addresses were grouped into classes by their first octet: Class A (1 to 126) with a default /8 mask, Class B (128 to 191) with /16, Class C (192 to 223) with /24, Class D (224 to 239) for multicast and Class E (240 to 255) reserved. 127.0.0.0/8 is loopback. Classful addressing wasted space, so today we use CIDR (classless inter-domain routing), where any prefix length from /0 to /32 is allowed and routes are written as prefix/length. Classes still appear on exams as vocabulary.",
   "RFC 1918 reserves three private ranges that are not routed on the internet and are usually translated with NAT: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. You will also meet 169.254.0.0/16, the link-local range a host gives itself when DHCP fails.",
   "A mask is a run of 1 bits followed by 0 bits. /24 is 255.255.255.0, /26 is 255.255.255.192, /30 is 255.255.255.252. For any prefix, the number of host bits is 32 minus the prefix length. A subnet has 2 to the power of host bits addresses, and 2 fewer usable host addresses, because the first address is the network address and the last is the broadcast address. So a /26 has 64 addresses and 62 hosts, and a /30 has 4 addresses and 2 hosts, which is why /30 (or /31, which has no network or broadcast address and is allowed on point-to-point links) is common on router links.",
   "The fastest subnetting method is the block size. Find the octet where the mask stops being 255, and subtract that mask value from 256. For /26 (mask .192) the block is 64, so subnets start at .0, .64, .128 and .192. To find which subnet 172.16.5.130/26 belongs to, find the block that contains 130: it is .128. So the network is 172.16.5.128, the broadcast is 172.16.5.191 and the usable hosts are .129 to .190.",
   "Working the other way, to split 172.16.0.0/22 into /26 blocks, borrow 4 bits (26 minus 22), giving 2 to the 4th, or 16 subnets of 64 addresses each, running 172.16.0.0, .0.64, .0.128, .0.192, 172.16.1.0 and so on up to 172.16.3.192. Practise until you can do these in your head."
  ],
  "terms": [
   [
    "CIDR",
    "Classless inter-domain routing: addressing with arbitrary prefix lengths written as address/length, replacing classful boundaries."
   ],
   [
    "Subnet mask",
    "A 32-bit value of contiguous 1s (network part) followed by 0s (host part), such as 255.255.255.192 for /26."
   ],
   [
    "RFC 1918 private ranges",
    "10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16, reserved for internal use and not routed on the internet."
   ],
   [
    "Broadcast address",
    "The last address in a subnet, with all host bits set to 1, used to reach every host on that subnet."
   ],
   [
    "Block size",
    "256 minus the interesting mask octet; the spacing between consecutive subnet addresses."
   ]
  ],
  "example": "You are given 10.20.0.0/24 and need four equal subnets for four branch LANs. Borrowing 2 bits gives /26: 10.20.0.0, .64, .128 and .192, each with 62 usable hosts. On the first branch router you configure `set interfaces ge-0/0/1 unit 0 family inet address 10.20.0.1/26`, and the hosts use .2 to .62 with .1 as the gateway.",
  "tip": "Check whether a question asks for addresses or usable hosts. The usable count is 2 to the power of host bits minus 2 (except /31 and /32, which are special cases).",
  "check": [
   [
    "What are the network and broadcast addresses for 192.168.10.77/27?",
    "A /27 has a block size of 32, so the subnet containing .77 starts at .64; the network is 192.168.10.64 and the broadcast is 192.168.10.95."
   ],
   [
    "How many usable hosts are in a /28?",
    "A /28 has 4 host bits, so 16 addresses and 14 usable hosts."
   ],
   [
    "Is 172.20.1.1 a private address?",
    "Yes. It falls inside 172.16.0.0/12, which covers 172.16.0.0 to 172.31.255.255."
   ]
  ]
 },
 {
  "t": "IPv6 addressing: 128-bit format, compression rules, global unicast, link-local (fe80::/10), multicast, EUI-64",
  "body": [
   "IPv6 was designed to replace IPv4's 32-bit address space with 128-bit addresses, enough that address scarcity and most NAT go away. An IPv6 address is written as eight groups (hextets) of four hexadecimal digits separated by colons, for example `2001:0db8:0000:0000:0a00:0000:0000:0001`. Like IPv4, it has a prefix length: most LANs use a /64, where the first 64 bits identify the subnet and the last 64 bits, the interface ID, identify the host.",
   "Two compression rules make addresses readable. First, leading zeros in any hextet may be dropped, so `0db8` becomes `db8` and `0000` becomes `0`. Second, one contiguous run of all-zero hextets may be replaced with `::`, but only once per address, because using it twice would make the length ambiguous. Applying both rules to the address above gives `2001:db8::a00:0:0:1` (when two runs of zeros are the same length, the standard form compresses the first one). To expand an address, count the groups present and fill `::` with enough zero groups to make eight.",
   "The main address types to know: global unicast addresses, currently allocated from 2000::/3 (starting with 2 or 3), are routable on the internet. Link-local addresses, fe80::/10, exist on every IPv6-enabled interface automatically and are only valid on that link; routing protocols and neighbor discovery use them, and routers often use them as next hops. Unique local addresses, fc00::/7 (in practice fd00::/8), are the rough equivalent of private IPv4 space. Multicast addresses start with ff00::/8; examples are ff02::1 (all nodes on the link) and ff02::2 (all routers on the link). IPv6 has no broadcast; multicast does that job. The loopback is ::1 and the unspecified address is ::.",
   "EUI-64 is a way to build a 64-bit interface ID from a 48-bit MAC address. Split the MAC in half, insert `fffe` in the middle, then flip the seventh bit of the first byte (the universal/local bit). For MAC `00:05:86:71:2a:c0` the halves are 000586 and 712ac0; inserting fffe gives 0005:86ff:fe71:2ac0; flipping the seventh bit changes 00 to 02, giving the interface ID `205:86ff:fe71:2ac0`. The link-local address would then be `fe80::205:86ff:fe71:2ac0`.",
   "On Junos you configure IPv6 under `family inet6`. `set interfaces ge-0/0/0 unit 0 family inet6 address 2001:db8:1::1/64` sets a static address, and adding the `eui-64` keyword to a /64 prefix lets Junos fill in the interface ID from the MAC. A link-local address is created automatically once `family inet6` is configured. `show interfaces terse` and `show ipv6 neighbors` let you check addresses and neighbor discovery, the IPv6 replacement for ARP."
  ],
  "terms": [
   [
    "Hextet",
    "One of the eight 16-bit groups of an IPv6 address, written as up to four hexadecimal digits."
   ],
   [
    "Link-local address",
    "An fe80::/10 address automatically present on every IPv6 interface, valid only on the local link."
   ],
   [
    "Global unicast address",
    "A publicly routable IPv6 address, currently from 2000::/3."
   ],
   [
    "EUI-64",
    "A method of forming a 64-bit interface ID from a MAC address by inserting fffe and flipping the universal/local bit."
   ],
   [
    "Multicast (IPv6)",
    "Addresses in ff00::/8 that deliver to a group; IPv6 uses multicast instead of broadcast."
   ]
  ],
  "example": "On a lab router you configure `set interfaces ge-0/0/1 unit 0 family inet6 address 2001:db8:10::/64 eui-64` and commit. `show interfaces ge-0/0/1 terse` then lists two IPv6 addresses: a global one ending in the EUI-64 interface ID and an fe80:: link-local address with the same interface ID.",
  "tip": "The double colon may appear only once in an address. An answer choice with two `::` is always invalid.",
  "check": [
   [
    "Compress 2001:0db8:0000:0000:0000:0000:0000:0010.",
    "2001:db8::10. Leading zeros are dropped and the run of six zero hextets becomes a single ::."
   ],
   [
    "What range do link-local addresses come from, and can they be routed?",
    "fe80::/10. They are valid only on the local link and are never forwarded by routers."
   ],
   [
    "What two changes turn a MAC address into an EUI-64 interface ID?",
    "Insert fffe between the two 24-bit halves, and flip the seventh bit of the first byte."
   ]
  ]
 },
 {
  "t": "OSI and TCP/IP models; TCP vs UDP; well-known ports",
  "body": [
   "Layered models give you a shared vocabulary for where a problem or feature lives. The OSI (Open Systems Interconnection) model has seven layers: 1 Physical (bits on the wire, cables, optics), 2 Data Link (frames, MAC addresses, switches), 3 Network (packets, IP addresses, routers), 4 Transport (segments, TCP and UDP ports), 5 Session, 6 Presentation and 7 Application. The TCP/IP model used by the real internet collapses these into four: Network Access (or Link), Internet, Transport and Application, where Application covers OSI layers 5 to 7.",
   "Each layer adds its own header as data travels down the stack, a process called encapsulation. Application data gets a TCP or UDP header to become a segment (or datagram), then an IP header to become a packet, then an Ethernet header and trailer to become a frame, then is sent as bits. The receiver reverses the process. When you hear 'Layer 2 switch' or 'Layer 4 port', people are using OSI numbers.",
   "The transport layer has two main protocols. TCP (Transmission Control Protocol) is connection-oriented and reliable. It opens a session with a three-way handshake (SYN, SYN-ACK, ACK), numbers every byte with sequence numbers, acknowledges what it receives, retransmits lost data, delivers data in order and uses windowing for flow control. It closes with FIN exchanges. UDP (User Datagram Protocol) is connectionless: no handshake, no acknowledgments, no retransmission, just a small header with ports, length and checksum. That makes UDP lighter and faster, which suits DNS queries, voice and video, and protocols that handle loss themselves.",
   "Ports identify the application on a host. Well-known ports are 0 to 1023. Ones worth memorising: FTP 20 and 21 (TCP), SSH 22 (TCP), Telnet 23 (TCP), SMTP 25 (TCP), DNS 53 (UDP and TCP), DHCP 67 server and 68 client (UDP), TFTP 69 (UDP), HTTP 80 (TCP), NTP 123 (UDP), SNMP 161 and traps 162 (UDP), BGP 179 (TCP), HTTPS 443 (TCP) and syslog 514 (UDP). Note that some routing protocols do not use ports at all: OSPF runs directly over IP as protocol number 89.",
   "These numbers matter on Junos because firewall filters match them. A filter term might use `from protocol tcp destination-port ssh` or `destination-port 22`; Junos accepts many well-known names in place of numbers. When you build a filter to protect the Routing Engine, you will list the exact protocols and ports the router needs, so knowing which run over TCP versus UDP saves you from locking out BGP or NTP by mistake."
  ],
  "terms": [
   [
    "Encapsulation",
    "Adding each layer's header (and trailer) to data as it moves down the stack."
   ],
   [
    "TCP",
    "Connection-oriented, reliable transport using a three-way handshake, sequence numbers, acknowledgments and retransmission."
   ],
   [
    "UDP",
    "Connectionless, best-effort transport with a small header and no acknowledgments or retransmission."
   ],
   [
    "Well-known ports",
    "Port numbers 0 to 1023, assigned to common services such as SSH (22) and HTTPS (443)."
   ],
   [
    "Three-way handshake",
    "The SYN, SYN-ACK, ACK exchange that opens a TCP connection."
   ]
  ],
  "example": "A user reports that an internal website does not load, although ping works. Ping (ICMP, Layer 3) succeeding shows routing is fine, so you look higher: a firewall filter on the path allows ICMP but not TCP port 443. Adding a term that accepts `protocol tcp destination-port https` fixes it.",
  "tip": "Know which protocol each well-known port uses. DNS is the classic trick: it uses UDP 53 for most queries but TCP 53 for zone transfers and large responses. BGP uses TCP 179, while OSPF uses IP protocol 89 and no port.",
  "check": [
   [
    "Which OSI layers does the TCP/IP Application layer cover?",
    "OSI layers 5, 6 and 7 (Session, Presentation and Application)."
   ],
   [
    "Give two features TCP provides that UDP does not.",
    "Any two of: connection setup with a handshake, acknowledgments, retransmission of lost data, in-order delivery and flow control through windowing."
   ],
   [
    "What transport protocol and port does SSH use?",
    "TCP port 22."
   ]
  ]
 },
 {
  "t": "Class of service concepts: why traffic is classified, queued, scheduled and rewritten",
  "body": [
   "Class of service (CoS) is how a network decides which traffic gets better treatment when links get busy. Without it, every packet waits in one first-in, first-out queue, so a large file transfer can delay a voice call or even a routing protocol hello. Junos CoS lets you sort traffic into classes and give each class its own share of bandwidth, buffer space and priority. The JNCIA exam tests the concepts and vocabulary rather than detailed tuning.",
   "CoS on Junos works as a pipeline with four main stages. First, classification: as a packet enters an interface, the router assigns it a forwarding class (which decides the output queue) and a loss priority (which says how readily it can be dropped under congestion). Classification can read markings already in the packet, such as the DSCP (Differentiated Services Code Point) value in the IP header, or it can match on other fields with a firewall filter.",
   "Second, policing can limit how much traffic of a class is admitted, dropping or re-marking the excess. Third, queuing and scheduling happen on the egress interface. Each forwarding class maps to a queue. A scheduler defines, per queue, a transmit rate (bandwidth share), a buffer size and a priority, and a scheduler map ties schedulers to forwarding classes for an interface. When the link is congested, the scheduler decides which queue sends next, and drop profiles use techniques like RED (random early detection) to drop some packets before a queue is completely full, usually dropping high loss priority traffic first.",
   "Fourth, rewrite. Before the packet leaves, a rewrite rule can set the DSCP, IP precedence, 802.1p or MPLS EXP bits in the outgoing header to match the forwarding class and loss priority it was given. That way the next router downstream can classify it quickly using those markings, keeping treatment consistent across the whole network.",
   "It helps to remember why each step exists. Classification happens once, at the edge, because it can be expensive. Queuing only matters when there is congestion; on an idle link, every packet leaves immediately regardless of class. Scheduling decides who wins when queues compete. Rewriting carries the decision to the next hop. None of it creates bandwidth, it just decides who suffers when there is not enough.",
   "On Junos all of this lives under `[edit class-of-service]`, with sections such as `classifiers`, `forwarding-classes`, `schedulers`, `scheduler-maps`, `rewrite-rules` and `interfaces`. `show class-of-service interface ge-0/0/0` shows what is applied to an interface."
  ],
  "terms": [
   [
    "Class of service (CoS)",
    "The set of features that classify, queue, schedule and mark traffic so different classes get different treatment."
   ],
   [
    "Forwarding class",
    "The Junos label assigned to a packet that determines which output queue it uses."
   ],
   [
    "Loss priority",
    "A per-packet value (such as low or high) that tells the router which packets to drop first under congestion."
   ],
   [
    "Scheduler",
    "A set of parameters for a queue, including transmit rate, buffer size and priority."
   ],
   [
    "Rewrite rule",
    "An egress rule that sets CoS markings like DSCP in outgoing packets based on forwarding class and loss priority."
   ]
  ],
  "example": "A branch WAN link carries voice and bulk backups. Voice packets arrive marked DSCP EF, so the edge router classifies them into expedited-forwarding and loss priority low. A scheduler gives that queue strict high priority with a limited transmit rate, while backups sit in best-effort. When a nightly backup saturates the link, calls stay clear because the scheduler sends the voice queue first.",
  "tip": "Keep the order straight: classify on ingress, queue and schedule on egress, rewrite on egress. Questions often ask where in the path each step happens.",
  "check": [
   [
    "What two values does a Junos classifier assign to a packet?",
    "A forwarding class (which picks the output queue) and a loss priority (which controls drop preference under congestion)."
   ],
   [
    "Why do rewrite rules exist?",
    "To mark outgoing packets (for example setting DSCP) so downstream routers can classify them consistently without re-examining the traffic."
   ],
   [
    "Does CoS scheduling change anything on an uncongested link?",
    "Not noticeably. When there is no congestion, queues stay empty and packets are sent as soon as they arrive."
   ]
  ]
 },
 {
  "t": "Junos default forwarding classes (best-effort, expedited-forwarding, assured-forwarding, network-control)",
  "body": [
   "Before you configure anything under `[edit class-of-service]`, Junos already has a working CoS setup. It defines four forwarding classes and maps each to an output queue. Knowing these defaults matters because they decide how your traffic is treated on day one, and because the exam asks about the names, queue numbers and what they are meant for.",
   "The four default forwarding classes are: best-effort, mapped to queue 0; expedited-forwarding, mapped to queue 1; assured-forwarding, mapped to queue 2; and network-control, mapped to queue 3. You can see them with `show class-of-service forwarding-class`. The names are often abbreviated BE, EF, AF and NC.",
   "Each class has an intended use. Best-effort is ordinary data with no special guarantee: web browsing, email, file transfers. Expedited-forwarding is for traffic that needs low delay, low jitter and low loss, such as voice; it borrows its name from the EF per-hop behavior in DiffServ (Differentiated Services). Assured-forwarding is for traffic that should get a guaranteed share of bandwidth but can tolerate some delay, such as important business applications; it corresponds to the DiffServ AF classes. Network-control is for the router's own protocol traffic, such as OSPF, BGP and other keepalives, which must get through or the network itself breaks.",
   "The defaults are deliberately simple. With no CoS configuration, most traffic ends up in best-effort. Traffic marked with IP precedence 6 or 7 (the values used for routing and network control) is placed in network-control by the default classifier on many platforms. The default scheduler gives bandwidth and buffer only to the best-effort and network-control queues, roughly 95 percent and 5 percent respectively, and expedited-forwarding and assured-forwarding get nothing until you configure schedulers for them. So simply classifying voice into EF without also building a scheduler would not give it better treatment and could even hurt it.",
   "You can rename forwarding classes, add more (many platforms support eight or more queues) and remap them to different queues under `[edit class-of-service forwarding-classes]`. Most designs keep the four default names because they are widely understood. When you look at `show interfaces queue ge-0/0/0`, you will see per-queue counters labelled with these class names, which is the quickest way to confirm which queue your traffic is actually using and whether any queue is dropping packets.",
   "```\nuser@r1> show class-of-service forwarding-class\nForwarding class          ID   Queue ...\n  best-effort              0     0\n  expedited-forwarding     1     1\n  assured-forwarding       2     2\n  network-control          3     3\n```"
  ],
  "terms": [
   [
    "best-effort (BE)",
    "Default forwarding class for ordinary traffic, mapped to queue 0."
   ],
   [
    "expedited-forwarding (EF)",
    "Default forwarding class for low-latency, low-jitter traffic such as voice, mapped to queue 1."
   ],
   [
    "assured-forwarding (AF)",
    "Default forwarding class for traffic that needs a bandwidth guarantee, mapped to queue 2."
   ],
   [
    "network-control (NC)",
    "Default forwarding class for routing and control protocol traffic, mapped to queue 3."
   ],
   [
    "show interfaces queue",
    "Operational command that shows per-queue transmit and drop counters for an interface."
   ]
  ],
  "example": "An engineer classifies voice into expedited-forwarding but forgets schedulers. Calls get worse during busy hours. `show interfaces queue ge-0/0/0` shows drops on queue 1, because the default scheduler map gives EF no bandwidth. Adding a scheduler for EF and applying a scheduler map to the interface fixes it.",
  "tip": "Memorise the queue numbers: BE 0, EF 1, AF 2, NC 3. Also remember that by default only BE and NC get scheduler resources.",
  "check": [
   [
    "Which queue does network-control use by default and what traffic belongs there?",
    "Queue 3; it carries routing and other control protocol traffic such as OSPF and BGP."
   ],
   [
    "What happens if you put traffic into assured-forwarding but configure no schedulers?",
    "It gets no guaranteed bandwidth, because the default scheduler map only allocates resources to best-effort and network-control."
   ],
   [
    "Which default class is intended for voice?",
    "expedited-forwarding, which is designed for low delay, jitter and loss."
   ]
  ]
 },
 {
  "t": "Behavior aggregate (DSCP-based) vs multifield classification",
  "body": [
   "Classification is the first CoS step: deciding which forwarding class and loss priority a packet gets. Junos offers two ways to do it, and the exam expects you to know when each is used. A behavior aggregate (BA) classifier reads a single CoS marking already in the packet. A multifield (MF) classifier examines several header fields using a firewall filter.",
   "BA classification relies on markings that someone upstream already set. For IP traffic this is usually the DSCP (Differentiated Services Code Point), the upper 6 bits of the IPv4 ToS byte or IPv6 traffic class byte, giving 64 possible values. Common values are EF (decimal 46) for voice, the AF classes such as AF11 to AF43 for assured traffic, CS6 and CS7 for network control, and 0 for best effort. Older gear uses IP precedence, the top 3 bits of the same byte. On Ethernet, 802.1p uses 3 bits in the VLAN tag, and MPLS networks use the EXP (traffic class) bits. A BA classifier is a lookup table: DSCP value X maps to forwarding class Y and loss priority Z. It is fast and simple, and you apply it to an interface under `[edit class-of-service interfaces]`.",
   "The weakness of BA classification is trust. It only works if the markings are correct, which is fine inside your own network but risky at the edge, where a customer or user could mark everything as EF. That is where MF classification helps.",
   "An MF classifier is a firewall filter whose terms match fields such as source and destination address, protocol and ports, and whose action sets `forwarding-class` and `loss-priority`. For example, a term could match UDP traffic from the voice gateway subnet on a range of ports and place it in expedited-forwarding, while another term puts everything else in best-effort. You apply it as an input filter on the ingress interface, like any other filter.",
   "```\nset firewall family inet filter CLASSIFY term voice from source-address 10.9.9.0/24\nset firewall family inet filter CLASSIFY term voice from protocol udp\nset firewall family inet filter CLASSIFY term voice then forwarding-class expedited-forwarding\nset firewall family inet filter CLASSIFY term voice then loss-priority low\nset firewall family inet filter CLASSIFY term rest then forwarding-class best-effort\nset interfaces ge-0/0/1 unit 0 family inet filter input CLASSIFY\n```",
   "The two can coexist. When both are applied to the same interface, the BA classifier runs first and the MF classifier runs after it, so the MF result wins for any packet it matches. The typical design is MF classification at the network edge, where traffic enters from untrusted sources, then a rewrite rule sets DSCP on egress, then BA classification on core routers, which simply trust those markings."
  ],
  "terms": [
   [
    "Behavior aggregate (BA) classifier",
    "A classifier that maps a single CoS marking (DSCP, IP precedence, 802.1p or MPLS EXP) to a forwarding class and loss priority."
   ],
   [
    "Multifield (MF) classifier",
    "A firewall filter that matches several header fields and sets forwarding class and loss priority as its action."
   ],
   [
    "DSCP",
    "Differentiated Services Code Point: 6 bits in the IP header used to mark a packet's CoS treatment."
   ],
   [
    "EF (DSCP 46)",
    "The DSCP value conventionally used for expedited, low-latency traffic such as voice."
   ]
  ],
  "example": "An ISP edge router receives customer traffic where all packets claim DSCP EF. The ISP applies an MF classifier on the customer-facing interface that only honours EF for traffic from the customer's contracted voice subnet and puts the rest in best-effort, then rewrites DSCP on egress. Core routers use a BA classifier and trust those corrected markings.",
  "tip": "If a question mentions matching on addresses or ports, the answer is multifield (a firewall filter). If it mentions reading DSCP, precedence, 802.1p or EXP, the answer is behavior aggregate. When both apply, MF overrides BA.",
  "check": [
   [
    "Which classifier type uses a firewall filter?",
    "Multifield classification; the filter's terms match header fields and the `then` actions set forwarding class and loss priority."
   ],
   [
    "Why is BA classification usually used in the core rather than the edge?",
    "Because it trusts existing markings, which is safe once the edge has classified and rewritten them but risky for traffic from untrusted sources."
   ],
   [
    "If a packet matches both a BA and an MF classifier on the same interface, which result applies?",
    "The MF result, because the multifield classifier is evaluated after the BA classifier and overrides it."
   ]
  ]
 },
 {
  "t": "Junos OS as one modular OS across routing, switching and security platforms",
  "body": [
   "One of Juniper's main selling points, and a recurring exam theme, is that the same operating system, Junos OS, runs across many product families: MX routers, PTX core routers, ACX access routers, EX and QFX switches and SRX security gateways. If you learn the CLI on a virtual router in your lab, the same commands, hierarchy and commit model carry over to a campus switch or a firewall.",
   "Several design ideas make this work. First, there is one source code base, with features added for particular hardware. Second, Juniper traditionally ships releases on a regular schedule, with version names such as 23.4R1, where the first numbers identify the release and R1, R2 and so on are maintenance releases of it. The exact release cadence has changed over the years, so check Juniper's documentation rather than memorising a number.",
   "Third, the software is modular. Rather than one large program, Junos runs many separate processes, called daemons, each with one job: routing protocols, the CLI, interface management, chassis hardware, SNMP and so on. Each daemon runs in its own protected memory space. If one fails, the kernel can restart it without taking down the others or the whole device. This is a big reason Junos is regarded as stable.",
   "Fourth, it separates the control plane from the forwarding plane. The software that runs protocols and management lives on the Routing Engine, while traffic is forwarded by the Packet Forwarding Engine. You will study both in detail in the next lessons.",
   "For you as an operator, consistency is the practical benefit. The configuration is a hierarchy you edit with `set` and `delete`; changes go into a candidate configuration and take effect only when you `commit`; you can roll back to previous commits. Operational commands like `show interfaces terse`, `show route` and `show system alarms` look the same on every family. Platform differences show up mostly as extra hierarchy levels: `security` zones and policies on SRX, `vlans` and `ethernet-switching` on EX and QFX, or chassis-specific settings.",
   "Juniper also offers Junos OS Evolved, a Linux-based variant on certain platforms, which keeps the same CLI and configuration model. From the outside it behaves like Junos, and the exam treats the user interface as common to both."
  ],
  "terms": [
   [
    "Junos OS",
    "Juniper's network operating system, used across its routing, switching and security platforms."
   ],
   [
    "Daemon",
    "A background process with a single responsibility, such as routing or the CLI, running in its own protected memory."
   ],
   [
    "Modularity",
    "The design in which separate processes can fail and restart independently without crashing the system."
   ],
   [
    "Candidate configuration",
    "The working copy of the configuration you edit; it takes effect only after a commit."
   ]
  ],
  "example": "A network engineer who has only used vJunos-router in a lab starts a job running EX switches and SRX firewalls. On day one she logs in, types `show interfaces terse`, `configure`, `show | compare` and `commit confirmed` exactly as in her lab. The only new things to learn are the security and VLAN hierarchies specific to those platforms.",
  "tip": "Exam answers that stress 'one OS, one CLI, one release train, modular daemons' describe Junos. An answer saying each platform has a different operating system is wrong.",
  "check": [
   [
    "Name three Juniper product families that run Junos OS.",
    "Any three of: MX routers, PTX routers, ACX routers, EX switches, QFX switches and SRX firewalls."
   ],
   [
    "What is the benefit of running each function as a separate daemon?",
    "Each daemon has its own protected memory, so a fault in one can be contained and the daemon restarted without crashing the whole system."
   ],
   [
    "Does the CLI change between Junos OS and Junos OS Evolved?",
    "No. Both use the same CLI and configuration model."
   ]
  ]
 },
 {
  "t": "Separation of control plane and forwarding plane",
  "body": [
   "Every router does two very different jobs. It has to work out where traffic should go, by running routing protocols, handling management sessions and building tables. And it has to actually move millions of packets per second out the right interfaces. Junos separates these into the control plane and the forwarding plane (also called the data plane), and runs them on different hardware.",
   "The control plane is handled by the Routing Engine (RE). It is essentially a general-purpose computer: CPU, memory and storage running the Junos kernel and daemons. It talks OSPF, BGP and other protocols with neighbors, runs the CLI and J-Web, handles SSH, SNMP and syslog, and computes the best path to each destination. From that it builds a routing table and then a forwarding table.",
   "The forwarding plane is handled by the Packet Forwarding Engine (PFE). On most platforms it is built from specialised ASICs (application-specific integrated circuits) designed to look up destinations, apply filters, policers and CoS, and forward traffic at line rate. The RE sends a copy of the forwarding table down to the PFE, and the PFE forwards transit traffic using that copy without involving the RE for each packet.",
   "The two are connected by an internal link. Over it the RE pushes forwarding table updates to the PFE, and the PFE sends up the small amount of traffic that the RE itself must handle, such as routing protocol packets or an SSH session to the router. This host-bound traffic is called exception traffic, and it is rate-limited so it cannot overwhelm the RE.",
   "The benefits are the reason this design is on the exam. Performance: forwarding speed does not depend on RE CPU load, so a busy CLI session or a large BGP update does not slow transit traffic. Stability: if the RE is heavily loaded, or a routing daemon restarts, the PFE can keep forwarding with the last forwarding table it received. Security: because transit traffic never reaches the RE, attacks against the router itself are limited to the exception path, which you can protect with a loopback filter. Scale: vendors can improve RE and PFE hardware independently.",
   "You can see both sides from the CLI. `show route` displays the routing table held on the RE. `show route forwarding-table` shows the forwarding table that has been built for the PFE. `show chassis routing-engine` shows RE CPU and memory; `show chassis fpc` shows the line cards that host PFEs on modular platforms."
  ],
  "terms": [
   [
    "Control plane",
    "The functions that decide where traffic goes: routing protocols, management and table building, handled by the Routing Engine."
   ],
   [
    "Forwarding plane",
    "The functions that move transit packets using the forwarding table, handled by the Packet Forwarding Engine."
   ],
   [
    "Routing Engine (RE)",
    "The CPU-based component that runs Junos, the CLI and routing protocols."
   ],
   [
    "Packet Forwarding Engine (PFE)",
    "The component, usually ASIC-based, that forwards traffic at line rate."
   ],
   [
    "Exception traffic",
    "Packets that the PFE must send up to the RE, such as traffic addressed to the router itself."
   ]
  ],
  "example": "During a maintenance window, an engineer runs a large `show route` command and the RE CPU climbs to 90 percent for a minute. Customers see no effect, because their transit traffic is forwarded by the PFE using its forwarding table, which the heavy CLI output does not touch.",
  "tip": "If a question asks which component forwards transit traffic, the answer is the PFE. If it asks which runs protocols, builds tables or hosts the CLI, the answer is the RE.",
  "check": [
   [
    "What does the RE send to the PFE?",
    "A copy of the forwarding table (plus configuration such as filters and CoS), which the PFE uses to forward transit traffic."
   ],
   [
    "Why can a router keep forwarding if its routing daemon restarts?",
    "Because the PFE keeps using the last forwarding table it received from the RE, independent of the RE's processes."
   ],
   [
    "Name one security benefit of separating the planes.",
    "Transit traffic never reaches the RE, so only host-bound exception traffic can target the control plane, and it can be rate-limited and filtered."
   ]
  ]
 },
 {
  "t": "Routing Engine (RE): runs the CLI, routing protocols, builds the routing and forwarding tables",
  "body": [
   "The Routing Engine is the brain of a Junos device. It is a general-purpose computer, with its own CPU, memory and storage, that runs the Junos kernel and all the daemons. When you log in, type commands, change the configuration or watch OSPF form an adjacency, you are interacting with the RE.",
   "Its responsibilities fall into a few groups. Management: it runs the CLI, J-Web, SSH, NETCONF, SNMP and syslog, stores the configuration and its rollback history, and keeps the system clock through NTP. Routing: it runs routing protocols such as OSPF, IS-IS and BGP through the routing protocol daemon, rpd, and it holds static routes and directly connected routes. Chassis control: it monitors hardware, power, fans and temperature and raises alarms. Table building: it turns everything it learns into a forwarding table for the PFE.",
   "That last job is worth understanding step by step. Each source of routes (direct interfaces, local addresses, static routes, OSPF, BGP) contributes candidate routes to the routing table, also called the RIB (routing information base). On Junos, IPv4 unicast routes live in `inet.0` and IPv6 in `inet6.0`. When several sources offer the same prefix, the RE picks the active route using route preference, where the lowest number wins: direct is 0, static is 5, OSPF internal is 10, BGP is 170. The active routes are then used to build the forwarding table, or FIB (forwarding information base), which lists each prefix with its resolved next hop and outgoing interface. The RE pushes the FIB to every PFE.",
   "You can see each stage from the CLI. `show route` lists the routing table; an asterisk marks the active route for each prefix. `show route protocol static` narrows it to one source. `show route forwarding-table destination 10.1.1.0/24` shows the entry the PFE actually uses. `show chassis routing-engine` reports CPU, memory, uptime and, on dual-RE systems, which RE is primary.",
   "Larger platforms often have two Routing Engines for redundancy. One is primary (also called master in older documentation) and the other is backup. Features like graceful Routing Engine switchover can move control to the backup RE while the PFEs keep forwarding. On dual-RE systems you use `commit synchronize` so both REs have the same configuration.",
   "Because the RE is a normal computer with limited CPU compared to the PFE's forwarding capacity, it must be protected. Heavy traffic aimed at the router itself could starve routing protocols of CPU time. That is why Junos rate-limits exception traffic and why you should put a firewall filter on the loopback interface, as later lessons explain."
  ],
  "terms": [
   [
    "Routing table (RIB)",
    "The RE's table of all known routes from every source; inet.0 holds IPv4 unicast routes."
   ],
   [
    "Forwarding table (FIB)",
    "The table of active routes with resolved next hops that the RE pushes to the PFE."
   ],
   [
    "Route preference",
    "Junos's value for choosing between sources for the same prefix; lower wins (direct 0, static 5, OSPF 10, BGP 170)."
   ],
   [
    "Active route",
    "The route the RE chooses for a prefix and installs in the forwarding table, marked with * in `show route`."
   ]
  ],
  "example": "A router learns 10.50.0.0/24 from both OSPF and a static route. `show route 10.50.0.0/24` shows the static route with an asterisk because its preference of 5 beats OSPF's 10. `show route forwarding-table destination 10.50.0.0/24` confirms the static next hop is what the PFE uses.",
  "tip": "The RE builds both tables but does not forward transit traffic. If an answer says the RE forwards packets between interfaces, it is describing the wrong component.",
  "check": [
   [
    "What is the difference between the routing table and the forwarding table?",
    "The routing table holds all learned routes from every source; the forwarding table holds only the active routes with resolved next hops and is copied to the PFE."
   ],
   [
    "Which daemon on the RE runs routing protocols?",
    "rpd, the routing protocol daemon."
   ],
   [
    "Which command shows RE CPU and memory usage?",
    "`show chassis routing-engine`."
   ]
  ]
 },
 {
  "t": "Packet Forwarding Engine (PFE): forwards transit traffic using the forwarding table copied from the RE",
  "body": [
   "The Packet Forwarding Engine is the part of a Junos device that actually moves traffic. Where the Routing Engine thinks, the PFE acts. It receives packets on ingress interfaces, decides where each one goes using the forwarding table, applies any filters, policers and CoS, and sends it out the right interface, typically at line rate.",
   "On most hardware platforms the PFE is built from ASICs designed by Juniper, so lookups and forwarding happen in silicon rather than software. Modular chassis such as larger MX routers have several line cards, called FPCs (Flexible PIC Concentrators), each with one or more PFEs; the physical ports sit on PICs (Physical Interface Cards) or directly on the card. Smaller fixed-configuration devices may have a single PFE. On some SRX branch firewalls and on virtual platforms, forwarding is done in software on dedicated CPU cores, but the architecture and terminology stay the same.",
   "The PFE does not run routing protocols or decide best paths. Instead, the RE computes the forwarding table and pushes a copy to each PFE over the internal link. When a transit packet arrives, the PFE performs a longest-prefix match on the destination address against its copy, finds the next hop and outgoing interface, rewrites the Layer 2 header, decrements TTL and transmits. None of this involves the RE.",
   "Several features are enforced directly in the PFE, which is why they cost little performance. Firewall filters (Juniper's term for stateless access control lists) are evaluated in the PFE. So are policers that rate-limit traffic, CoS classification, queuing and rewriting, and sampling for flow monitoring. When you commit a firewall filter on the RE, the configuration is compiled and installed into the PFE, which then applies it to every packet.",
   "The PFE also decides which packets are not transit traffic. Packets addressed to the router itself, packets with expiring TTL, some packets with IP options and similar exceptions are sent up to the RE over a rate-limited path. This keeps the RE responsive while letting the PFE carry the bulk of the load.",
   "Operational commands let you look at the PFE side. `show route forwarding-table` shows what has been installed. `show chassis fpc` and `show chassis fpc pic-status` show line card status on modular systems. `show pfe statistics traffic` shows counters of packets the PFE handled, including those sent to the RE, which is useful when investigating heavy host-bound traffic."
  ],
  "terms": [
   [
    "PFE",
    "Packet Forwarding Engine: the component that forwards transit traffic using a copy of the forwarding table."
   ],
   [
    "ASIC",
    "Application-specific integrated circuit: custom silicon that performs lookups and forwarding at high speed."
   ],
   [
    "FPC",
    "Flexible PIC Concentrator: a line card in a modular Junos chassis that contains PFE hardware."
   ],
   [
    "PIC",
    "Physical Interface Card: the module that provides the physical ports; its number is the middle value in names like ge-0/1/0."
   ],
   [
    "Firewall filter",
    "Juniper's stateless packet filter, evaluated in the PFE, similar to an access control list."
   ]
  ],
  "example": "An MX router forwards 100 Gbps of customer traffic while an engineer reconfigures OSPF. The new routes are computed on the RE and pushed to the PFEs, which update their forwarding tables. Throughout, the PFEs keep forwarding transit traffic and applying the customer-facing firewall filters with no measurable slowdown.",
  "tip": "Firewall filters, policers and CoS are enforced in the PFE even though you configure them on the RE. Questions sometimes suggest the RE inspects every transit packet; it does not.",
  "check": [
   [
    "Where does the PFE get its forwarding table?",
    "From the Routing Engine, which computes it from the active routes and pushes a copy to each PFE."
   ],
   [
    "Name two features the PFE enforces on transit traffic.",
    "Any two of: firewall filters, policers, CoS classification and queuing, rewrite rules and sampling."
   ],
   [
    "What does the PFE do with a packet addressed to the router itself?",
    "It sends it up to the Routing Engine as exception (host-bound) traffic over a rate-limited internal path."
   ]
  ]
 },
 {
  "t": "Key daemons: rpd (routing), mgd (management/CLI), dcd (interfaces), chassisd (chassis)",
  "body": [
   "Junos is made of many independent processes called daemons, each running in its own protected memory space. The exam focuses on four of them, and knowing what each does helps you understand log messages, `show system processes` output and what happens when something fails.",
   "rpd, the routing protocol daemon, runs every routing protocol: OSPF, IS-IS, BGP, RIP, as well as static routes, routing policy and route selection. It maintains the routing tables such as inet.0 and hands the active routes to the kernel, which builds the forwarding table for the PFE. If your OSPF adjacency is flapping or a BGP session will not come up, rpd is the process doing the work, and its logs are where you look. You can restart it with `restart routing`, although on a production router this disrupts routing briefly.",
   "mgd, the management daemon, is the heart of the user interface. It handles the CLI (each CLI session talks to mgd), processes configuration changes, runs `commit` by checking the candidate configuration and then notifying other daemons of relevant changes, and serves NETCONF and other automation interfaces. When you type `commit check`, mgd validates syntax and consistency.",
   "dcd, the device control daemon, configures and manages interfaces. When you commit changes under `[edit interfaces]`, dcd applies them: setting addresses, MTUs, encapsulation and logical units. It works with the kernel to create the interface entries that other processes see.",
   "chassisd, the chassis daemon, manages the physical hardware: Routing Engines, line cards, power supplies, fans and temperature sensors. It detects hardware insertion and removal, powers components up and down and raises chassis alarms, which you see with `show chassis alarms` and `show chassis hardware`.",
   "Other daemons exist and may come up in logs. snmpd handles SNMP; eventd handles system logging and event policies; alarmd manages alarms on some platforms. The important architectural point is that these processes are independent. If rpd crashes, the kernel restarts it; the CLI (mgd) still works and chassisd keeps managing hardware, and the PFE keeps forwarding with the last forwarding table it had. You can see running processes with `show system processes extensive`, and restart many daemons with commands such as `restart interface-control` (dcd) or `restart chassis-control` (chassisd). Treat restarts carefully on live equipment, since some are disruptive."
  ],
  "terms": [
   [
    "rpd",
    "Routing protocol daemon: runs routing protocols, policy and route selection, and maintains the routing tables."
   ],
   [
    "mgd",
    "Management daemon: serves the CLI and automation interfaces and processes configuration commits."
   ],
   [
    "dcd",
    "Device control daemon: configures and manages physical and logical interfaces."
   ],
   [
    "chassisd",
    "Chassis daemon: monitors and controls hardware components and raises chassis alarms."
   ]
  ],
  "example": "A router logs that a process restarted unexpectedly. The engineer checks `show system core-dumps` and `show system processes extensive` and sees rpd has a recent start time. OSPF neighbors reconverged, but SSH sessions, interfaces and hardware stayed up and transit traffic kept flowing, showing the value of independent daemons.",
  "tip": "Match the daemon to the symptom: routing problems point to rpd, CLI or commit problems to mgd, interface configuration to dcd and hardware alarms to chassisd.",
  "check": [
   [
    "Which daemon validates and applies a commit?",
    "mgd, the management daemon, which checks the candidate and signals other daemons to apply their parts of the configuration."
   ],
   [
    "Which daemon manages power supplies, fans and line cards?",
    "chassisd, the chassis daemon."
   ],
   [
    "What happens to the CLI if rpd crashes?",
    "It keeps working, because mgd is a separate process; rpd is restarted independently."
   ]
  ]
 },
 {
  "t": "Transit traffic vs exception (host-bound) traffic and why exception traffic is rate-limited to the RE",
  "body": [
   "Every packet a Junos device receives falls into one of two groups, and knowing which is essential for understanding performance and security. Transit traffic passes through the device on its way somewhere else. Exception traffic needs attention from the Routing Engine, either because it is addressed to the device or because the PFE cannot handle it alone.",
   "Transit traffic is the vast majority. A web session between a PC and a server, for example, just passes through the router. The PFE looks up the destination in its forwarding table, applies filters and CoS, and sends the packet out. The RE never sees these packets.",
   "Exception traffic comes in several kinds. Host-bound traffic is addressed to one of the device's own IP addresses: routing protocol packets such as OSPF hellos and BGP updates, management sessions such as SSH, SNMP and NTP, and pings to the router. Some traffic needs the RE to generate a response: when a packet's TTL expires, the RE may create an ICMP time-exceeded message, which is what makes traceroute work. Some packets need special processing, such as certain IP options, or packets needing ARP resolution for a next hop. And some traffic is not addressed to the router but still processed by it, like multicast control packets for routing protocols.",
   "The path from PFE to RE is deliberately limited. The RE is a general-purpose CPU with far less packet capacity than the PFE's ASICs. If an attacker, a misconfiguration or a network loop sent line-rate traffic to the router's own address, an unlimited path could saturate the RE's CPU, starving rpd of time to send hellos. Routing adjacencies would drop and the whole network could suffer. Junos therefore rate-limits exception traffic on its way up to the RE, and on many platforms adds per-protocol policing, often called DDoS (distributed denial of service) protection, so a flood of one kind of traffic cannot crowd out the others.",
   "Built-in rate limits are a safety net, not a complete defense, because they limit volume but do not decide which sources are legitimate. You add that decision yourself with a firewall filter applied to the loopback interface, lo0, which the PFE applies to host-bound traffic before sending it up. That filter should accept only the protocols and sources the router needs and discard everything else.",
   "When troubleshooting, remember that a ping to the router measures exception handling, not transit forwarding. Slow or dropped pings to a busy router do not necessarily mean transit traffic is affected. Test through the router, not to it, to judge forwarding performance."
  ],
  "terms": [
   [
    "Transit traffic",
    "Packets that pass through the device to another destination, forwarded entirely by the PFE."
   ],
   [
    "Exception traffic",
    "Packets the PFE sends to the RE, including host-bound traffic and packets needing special handling."
   ],
   [
    "Host-bound traffic",
    "Traffic addressed to the device itself, such as routing protocols, SSH, SNMP or pings."
   ],
   [
    "DDoS protection",
    "Per-protocol policing on many Junos platforms that limits how much of each exception traffic type reaches the RE."
   ]
  ],
  "example": "A misconfigured monitoring server starts sending thousands of SNMP requests per second to a core router. Transit traffic is unaffected, but SNMP responses slow down. Because exception traffic is rate-limited, OSPF and BGP keepalives still get through. The engineer then updates the lo0 filter to only accept SNMP from approved management hosts.",
  "tip": "Traceroute replies, pings to the router and routing protocol packets are all exception traffic. A ping through the router to a host on the other side is transit traffic.",
  "check": [
   [
    "Is an OSPF hello received from a neighbor transit or exception traffic?",
    "Exception (host-bound) traffic, because it is addressed to the router and must be processed by rpd on the RE."
   ],
   [
    "Why does Junos rate-limit traffic sent from the PFE to the RE?",
    "To stop floods of host-bound traffic from overwhelming the RE's CPU and disrupting routing protocols and management."
   ],
   [
    "Why can a slow ping to a router be misleading?",
    "Pings to the router are exception traffic handled by the RE at a limited rate, so they do not reflect how fast the PFE forwards transit traffic."
   ]
  ]
 },
 {
  "t": "Junos OS vs Junos OS Evolved (FreeBSD-based vs Linux-based)",
  "body": [
   "Juniper maintains two variants of its operating system. Classic Junos OS is built on a FreeBSD kernel, a Unix-like operating system, and has been Juniper's platform for most of the company's history. Junos OS Evolved is a newer variant built on Linux, used on a subset of newer platforms. The exam expects you to know the difference in foundation and to understand that the user experience is deliberately the same.",
   "Classic Junos OS runs its daemons, such as rpd, mgd, dcd and chassisd, as FreeBSD processes. When you drop to the shell with `start shell`, you are in a FreeBSD environment. On many newer hardware platforms, Junos OS itself runs as a virtual machine on top of a Linux host, but from the operator's point of view it is still FreeBSD-based Junos.",
   "Junos OS Evolved runs natively on Linux. Its architecture changes how software is organised underneath: applications run as native Linux processes, system state is kept in a distributed database that other applications subscribe to, and components can be restarted or upgraded more independently. The goals are higher availability, easier integration of third-party Linux applications and a more modern base. Release names for Evolved typically carry an EVO tag, which helps you tell which variant a device is running when you look at `show version`.",
   "For operators and for the exam, the most important fact is what does not change. Junos OS Evolved keeps the same CLI, the same configuration hierarchy, the same commit model with candidate and active configurations, rollback, and the same automation interfaces such as NETCONF. Commands like `show interfaces terse`, `show route`, `configure`, `show | compare` and `commit confirmed` work the same way. Skills you build on classic Junos transfer directly.",
   "Which one you meet depends on the hardware. Evolved is used on some newer platforms in the PTX, ACX and QFX families, while MX routers, EX switches and SRX firewalls largely run classic Junos OS. Juniper's hardware documentation for each model states which it supports, so check there rather than relying on a memorised list, since the lineup changes over time.",
   "A useful way to summarise the difference: same user interface and configuration, different kernel and internal architecture. When an exam question contrasts them, FreeBSD goes with Junos OS and Linux goes with Junos OS Evolved."
  ],
  "terms": [
   [
    "Junos OS",
    "The classic Juniper operating system, built on a FreeBSD kernel."
   ],
   [
    "Junos OS Evolved",
    "A Linux-based variant of Junos with a more distributed internal architecture and the same CLI."
   ],
   [
    "FreeBSD",
    "A Unix-like open-source operating system that is the base of classic Junos OS."
   ],
   [
    "show version",
    "Operational command that shows the model, host name and running software release."
   ]
  ],
  "example": "An engineer manages both an MX router and a newer PTX router. On both she uses `show version` and sees the release; the PTX's release name includes EVO. Her OSPF configuration, filters and commit workflow are identical on both, so her change procedure does not need to be rewritten.",
  "tip": "If an answer says Junos OS Evolved needs a different CLI or configuration syntax, it is wrong. The difference is the underlying OS: FreeBSD for Junos OS, Linux for Evolved.",
  "check": [
   [
    "Which kernel is classic Junos OS based on?",
    "FreeBSD."
   ],
   [
    "What stays the same between Junos OS and Junos OS Evolved?",
    "The CLI, configuration hierarchy, commit and rollback model and automation interfaces."
   ],
   [
    "How can you tell which variant a device runs?",
    "Check `show version`; Evolved releases are identified with an EVO tag in the release name, and the platform documentation lists which variant it supports."
   ]
  ]
 },
 {
  "t": "Protecting the RE with a filter on the lo0 interface",
  "body": [
   "The Routing Engine is the one part of a Junos device that attackers and misconfigured systems can overload with relatively little traffic, because it is a general-purpose CPU. Juniper's standard defense is a firewall filter applied to the loopback interface, lo0. Because of how Junos works, a filter on lo0 inspects all host-bound traffic, the traffic headed to the RE, no matter which physical interface it arrived on.",
   "Why lo0? The loopback interface represents the router itself. When you apply an input filter to `lo0.0`, the PFE evaluates it against every packet destined for the RE, whether it came in on ge-0/0/0, xe-1/0/3 or any other interface. You write one filter in one place instead of repeating it on every interface. Transit traffic is not affected, because it never goes to the RE.",
   "A firewall filter is made of ordered terms. Each term has `from` conditions (match criteria like source address, protocol and port) and `then` actions (such as `accept`, `discard`, `reject`, `count` or `log`). Junos checks terms from top to bottom and stops at the first match. If no term matches, there is an implicit final action of discard. That implicit deny is the most important thing to remember: anything you forget to allow will be dropped.",
   "A good RE protection filter therefore lists everything the router legitimately needs. Typical terms accept SSH only from management subnets, BGP only from configured peers, OSPF from neighbors, NTP and SNMP from known servers, DNS replies, and ICMP (often rate-limited with a policer). A final term discards everything else, usually with `count` so you can see what is being dropped. It is common to define prefix lists (named address lists) for management hosts and BGP neighbors so the filter is easier to maintain.",
   "```\nset policy-options prefix-list MGMT 10.99.0.0/24\nset firewall family inet filter PROTECT-RE term ssh from source-prefix-list MGMT\nset firewall family inet filter PROTECT-RE term ssh from protocol tcp\nset firewall family inet filter PROTECT-RE term ssh from destination-port ssh\nset firewall family inet filter PROTECT-RE term ssh then accept\nset firewall family inet filter PROTECT-RE term ospf from protocol ospf\nset firewall family inet filter PROTECT-RE term ospf then accept\nset firewall family inet filter PROTECT-RE term icmp from protocol icmp\nset firewall family inet filter PROTECT-RE term icmp then accept\nset firewall family inet filter PROTECT-RE term deny-rest then count DROPPED\nset firewall family inet filter PROTECT-RE term deny-rest then discard\nset interfaces lo0 unit 0 family inet filter input PROTECT-RE\n```",
   "Applying this kind of filter is the classic way to lock yourself out of a remote router. Always commit it with `commit confirmed` so Junos automatically rolls back if you lose access, and test from your management host before confirming. Afterwards, check `show firewall filter PROTECT-RE` to see counter values and confirm which traffic is being dropped. Remember that IPv6 needs its own filter under `family inet6` if the router has IPv6 addresses."
  ],
  "terms": [
   [
    "lo0",
    "The loopback interface, representing the device itself; a filter on it applies to all host-bound traffic."
   ],
   [
    "Firewall filter term",
    "One rule in a filter, with `from` match conditions and `then` actions, evaluated in order."
   ],
   [
    "Implicit discard",
    "The hidden final action of every Junos firewall filter that drops packets matching no term."
   ],
   [
    "Prefix list",
    "A named list of prefixes under `policy-options` that filters and policies can reference."
   ],
   [
    "commit confirmed",
    "A commit that rolls back automatically unless confirmed with another commit within a set time."
   ]
  ],
  "example": "An engineer applies an RE filter allowing SSH and ICMP but forgets OSPF. She uses `commit confirmed 5`. Within a minute OSPF neighbors drop because hellos match no term and hit the implicit discard. She simply waits; after five minutes Junos rolls back, the adjacencies return, and she adds the missing OSPF term before trying again.",
  "tip": "The filter goes on lo0 as an input filter under the family you want to protect (inet, inet6). Forgetting routing protocols, or forgetting that there is an implicit discard, is the usual trap.",
  "check": [
   [
    "Why apply the RE protection filter to lo0 instead of each physical interface?",
    "Because a lo0 input filter is applied to all traffic destined for the RE regardless of ingress interface, so one filter protects the RE everywhere."
   ],
   [
    "What happens to host-bound traffic that matches no term?",
    "It is discarded by the implicit final discard action of the filter."
   ],
   [
    "Does the lo0 filter affect transit traffic?",
    "No. It only applies to traffic destined for the Routing Engine; transit traffic is filtered only by filters on the interfaces it crosses."
   ]
  ]
 },
 {
  "t": "Boot sequence and storage: primary/backup media, snapshots",
  "body": [
   "A Junos device boots from storage just like a PC, and knowing the order helps you recover when something goes wrong, such as a corrupted disk or a failed upgrade. The exam looks for the ideas of primary and backup boot media and how snapshots protect you.",
   "Most Junos devices have more than one place they can boot from. There is a primary boot device, usually internal flash or an SSD, and one or more alternates, such as a second internal disk, a second partition (on some platforms called dual-root partitioning) or a USB device. On power-up, the system firmware and boot loader try the devices in a set order. Normally the primary device is used. If it is missing or its software is corrupted, the device tries the backup media. When a device boots from backup media, Junos raises an alarm so you know something is wrong.",
   "After the loader finds a valid image, the Junos kernel starts, then init brings up the daemons, and mgd loads the active configuration, stored as `/config/juniper.conf.gz`. Interfaces and routing protocols come up as dcd and rpd apply their parts of the configuration. If the device cannot load the configuration, for example because it is damaged, it can come up using the rescue configuration if one has been saved.",
   "A snapshot is a copy of the currently running software and configuration onto another storage device or partition. Its purpose is to make sure the backup boot media contains a known-good system. The command is `request system snapshot`, with options depending on the platform; on dual-partition platforms you may use `request system snapshot slice alternate` to copy the running partition to the other one. Taking a snapshot after a successful upgrade and verification means that if the primary media later fails, the device can boot a working image rather than an old or empty one. `show system snapshot` shows what the backup media holds.",
   "Some related commands help with boot and storage. `show system storage` shows free space on each file system; low space can make upgrades fail, and `request system storage cleanup` removes old log and temporary files. `request system configuration rescue save` saves the current active configuration as the rescue configuration, which you can reload later with `rollback rescue` in configuration mode. `request system reboot` and `request system halt` restart or shut down the system safely; on some platforms you can also choose to boot from particular media with options on the reboot command.",
   "A good operational habit is: before an upgrade, save a rescue configuration and check storage; after the upgrade is verified, take a snapshot so both boot media match."
  ],
  "terms": [
   [
    "Primary boot media",
    "The storage device the system normally boots Junos from, typically internal flash or SSD."
   ],
   [
    "Backup boot media",
    "Alternate storage, such as a second partition, disk or USB, used when the primary fails."
   ],
   [
    "Snapshot",
    "A copy of the running software and configuration to backup media, made with `request system snapshot`."
   ],
   [
    "Rescue configuration",
    "A saved known-good configuration you can restore with `rollback rescue`."
   ],
   [
    "juniper.conf.gz",
    "The compressed file in /config that holds the active configuration."
   ]
  ],
  "example": "An SRX branch firewall's primary partition becomes corrupted after a power outage. On reboot it boots from the alternate partition and raises an alarm. Because the administrator had run `request system snapshot slice alternate` after the last upgrade, the alternate holds the current release and configuration, and the site stays online while a replacement is planned.",
  "tip": "Snapshots copy software and configuration to backup media for booting; the rescue configuration is only a configuration file. Keep the two apart in exam answers.",
  "check": [
   [
    "What does a device do if its primary boot media fails?",
    "It tries the backup (alternate) boot media and, if it boots from there, raises an alarm."
   ],
   [
    "Why take a snapshot after a successful upgrade?",
    "So the backup media contains the same known-good software and configuration, allowing a clean boot if the primary fails."
   ],
   [
    "Which command saves the current configuration as the rescue configuration?",
    "`request system configuration rescue save`."
   ]
  ]
 },
 {
  "t": "CLI modes: operational (`>`) and configuration (`#`); entering with `configure`, `configure private`, `configure exclusive`",
  "body": [
   "The Junos CLI has two main modes, and nearly everything you do starts by knowing which one you are in. Operational mode is for monitoring and managing the device: viewing status, running tests, restarting processes and upgrading software. Configuration mode is for changing the configuration. The prompt tells you which you are in: `user@router>` means operational mode and `user@router#` means configuration mode.",
   "When you log in as a normal user, you land in operational mode. (If you log in as root at the console, you start at a Unix shell prompt, `%`, and type `cli` to get to operational mode.) Operational commands include `show` (display status), `clear` (reset counters or tables), `ping`, `traceroute`, `monitor` (watch logs or interfaces live), `request` (system actions like reboot or software install), `restart` (restart daemons) and `file` (manage files). You also type `configure` here to enter configuration mode.",
   "There are three common ways to enter configuration mode, and they differ in how they handle other users. Plain `configure` opens the shared candidate configuration. Everyone in plain configure mode edits the same candidate, and when anyone commits, all changes in that candidate, including other users' unfinished ones, are committed. Junos warns you when others are editing, listing who they are.",
   "`configure exclusive` locks the candidate configuration. While you hold the lock, other users cannot commit changes, which prevents surprises during a sensitive change. If you exit without committing, your uncommitted changes are discarded. Other users can see who has the lock.",
   "`configure private` gives you your own private copy of the configuration. Your changes are kept separate from other users' until you commit, and when you commit only your changes are applied, merged with the current active configuration. This is the safest option when several people work on the same device. You cannot enter private mode if the shared candidate has uncommitted changes, and if you exit private mode without committing, your changes are lost.",
   "```\nuser@r1> configure private\nwarning: uncommitted changes will be discarded on exit\nEntering configuration mode\n\n[edit]\nuser@r1#\n```",
   "Configuration mode offers `set`, `delete`, `show`, `edit`, `commit`, `rollback` and more. To leave, type `exit` at the top level or `exit configuration-mode` from anywhere. If you have uncommitted changes, Junos asks whether you really want to exit."
  ],
  "terms": [
   [
    "Operational mode",
    "The CLI mode, shown by the `>` prompt, used for monitoring, troubleshooting and system actions."
   ],
   [
    "Configuration mode",
    "The CLI mode, shown by the `#` prompt, used to change the candidate configuration."
   ],
   [
    "configure exclusive",
    "Enters configuration mode and locks the candidate so no other user can commit."
   ],
   [
    "configure private",
    "Enters configuration mode with a private candidate so only your changes are committed."
   ]
  ],
  "example": "Two engineers need to change the same router at the same time. If both use plain `configure`, the first to commit would also push the other's half-finished edits. Instead each uses `configure private`; each commits only their own changes, which are merged with the active configuration.",
  "tip": "Link the keyword to its effect: exclusive locks others out; private isolates your changes; plain configure shares one candidate with everyone.",
  "check": [
   [
    "Which prompt symbol indicates configuration mode?",
    "The hash sign, `#`; operational mode uses `>`."
   ],
   [
    "What risk does plain `configure` carry when several users edit at once?",
    "A commit by any user commits all changes in the shared candidate, including other users' incomplete work."
   ],
   [
    "What does `configure exclusive` prevent?",
    "It locks the configuration so other users cannot commit changes while you are in exclusive mode."
   ]
  ]
 },
 {
  "t": "Navigating the hierarchy: `edit`, `up`, `top`, `exit`, `exit configuration-mode`; the `[edit ...]` banner",
  "body": [
   "The Junos configuration is a tree. At the top are statements like `system`, `interfaces`, `protocols`, `routing-options`, `firewall` and `policy-options`; each contains more levels, all the way down to individual settings. In configuration mode you can move around this tree much like you move around folders in a file system, which saves typing and helps you focus on one part of the configuration.",
   "The banner above the prompt shows where you are. When you first enter configuration mode it says `[edit]`, meaning the top level. After `edit protocols ospf area 0`, it says `[edit protocols ospf area 0.0.0.0]`. Every command you type is relative to that position, so `set interface ge-0/0/0.0` there adds an interface to OSPF area 0 without retyping the path. `show` at that level displays only that part of the configuration.",
   "`edit` moves you down to a hierarchy level, creating it if it does not exist yet. `up` moves one level up; `up 2` moves two levels. `top` jumps straight to the top of the hierarchy. You can also prefix a command with `top` to run it from the top level without moving, for example `top show interfaces` or `top edit system` while you are deep inside protocols.",
   "`exit` is subtle. It returns you to the level you were at before your most recent `edit`, not necessarily one level up. If you were at `[edit]` and typed `edit protocols ospf area 0`, `exit` takes you straight back to `[edit]`. When you type `exit` at the top level, it leaves configuration mode (asking for confirmation if there are uncommitted changes). `exit configuration-mode` leaves configuration mode from any level in one step.",
   "```\n[edit]\nuser@r1# edit protocols ospf area 0\n\n[edit protocols ospf area 0.0.0.0]\nuser@r1# set interface ge-0/0/0.0\n\n[edit protocols ospf area 0.0.0.0]\nuser@r1# up\n\n[edit protocols ospf]\nuser@r1# top\n\n[edit]\nuser@r1#\n```",
   "Notice that Junos displayed area 0 as 0.0.0.0; it normalises values to its standard format. Use navigation to keep configuration sessions tidy: move into the section you are working on, make changes with short relative `set` commands, check them with `show`, then return to the top to review with `show | compare` before committing."
  ],
  "terms": [
   [
    "[edit] banner",
    "The line above the configuration prompt that shows your current position in the hierarchy."
   ],
   [
    "edit",
    "Moves to (and creates if needed) a configuration hierarchy level."
   ],
   [
    "up",
    "Moves up one level, or several with a number, such as `up 2`."
   ],
   [
    "top",
    "Moves to the top of the hierarchy, or runs a command from the top when used as a prefix."
   ],
   [
    "exit configuration-mode",
    "Leaves configuration mode from any hierarchy level."
   ]
  ],
  "example": "While configuring OSPF at `[edit protocols ospf area 0.0.0.0]`, you want to check the address on ge-0/0/0. Instead of navigating away, you type `top show interfaces ge-0/0/0` to see it, then continue adding interfaces to area 0 from where you are.",
  "tip": "`up` goes one level up; `exit` returns to where you were before the last `edit`, which may be several levels up. At the top level, `exit` leaves configuration mode.",
  "check": [
   [
    "You are at `[edit protocols ospf area 0.0.0.0]`. What does `up` do?",
    "It moves you to `[edit protocols ospf]`, one level up."
   ],
   [
    "How can you view the interfaces configuration without leaving your current hierarchy level?",
    "Use `top show interfaces`, which runs the command from the top level while you stay where you are."
   ],
   [
    "What does the `[edit system login]` banner tell you?",
    "That you are in configuration mode at the system login level, so commands are relative to that position."
   ]
  ]
 },
 {
  "t": "Command completion with Space and Tab; `?` for context help",
  "body": [
   "The Junos CLI is designed to help you type less and make fewer mistakes. It completes commands for you, lists what is valid at each point, and tells you immediately when something is wrong. Getting comfortable with these features makes you faster in the lab and helps you discover commands you do not yet know.",
   "The Space bar completes command names and keywords that are built into Junos. If you type `sh` and press Space, the CLI expands it to `show `. If what you typed is ambiguous, such as `s` (which could be `set`, `show`, `ssh` and others), the CLI lists the possibilities instead. You can also type unambiguous abbreviations and press Enter: `sh int ters` runs `show interfaces terse`.",
   "The Tab key completes the same keywords, and it also completes names you have defined yourself, such as interface names, firewall filter names, policy names and user names. For example, after `show firewall filter ` pressing Tab can complete `PROTECT-RE`, and after `show interfaces ge-` pressing Tab lists the gigabit interfaces present. Space does not complete user-defined values, which is a detail exam questions sometimes test.",
   "The question mark shows context-sensitive help. Type `?` on its own to list every command available at that point, with a short description of each. Type part of a word followed by `?`, such as `show inter?`, to see only matching options. Type a full command followed by a space and `?`, such as `show interfaces ?`, to see what can come next, including options and interface names. In configuration mode `?` also lists possible statements at your current hierarchy level, and after a `set` it shows which values are valid.",
   "The CLI also flags errors precisely. If you mistype a keyword, Junos prints `syntax error` with a caret (^) under the point where the input went wrong, which makes typos easy to find. When a command has a required argument you have not given, the CLI tells you it is missing.",
   "A few keyboard shortcuts, based on Emacs-style editing, round out the toolkit: Ctrl+A goes to the start of the line, Ctrl+E to the end, Ctrl+W deletes the previous word, Ctrl+U deletes the whole line, and the up arrow (or Ctrl+P) recalls previous commands. You can also view recent commands with `show cli history`."
  ],
  "terms": [
   [
    "Space completion",
    "Pressing Space to complete built-in Junos commands and keywords."
   ],
   [
    "Tab completion",
    "Pressing Tab to complete both built-in keywords and user-defined names such as filters and policies."
   ],
   [
    "Context-sensitive help",
    "Using `?` to list the commands, options or values valid at the current point."
   ],
   [
    "Syntax error caret",
    "The ^ marker Junos prints under the part of a command it could not understand."
   ]
  ],
  "example": "You cannot remember the command to see OSPF adjacencies. You type `show ospf ?` and see a list including `neighbor`, `interface` and `database`. You choose `show ospf neighbor`, then later use Tab after `show firewall filter ` to complete the long filter name a colleague created.",
  "tip": "Space completes only built-in keywords; Tab completes built-in keywords and user-defined names. That difference is a favourite exam question.",
  "check": [
   [
    "Which key completes the name of a firewall filter you defined?",
    "Tab. Space only completes Junos's built-in commands and keywords."
   ],
   [
    "What does typing `show interfaces ?` display?",
    "The options and interface names that can follow `show interfaces`, each with a short description."
   ],
   [
    "What does Junos show when you mistype a keyword?",
    "A `syntax error` message with a caret (^) marking where the input went wrong."
   ]
  ]
 },
 {
  "t": "Help: `help topic`, `help reference`, `help apropos`",
  "body": [
   "Beyond `?` for quick context help, Junos includes documentation right inside the CLI. This is useful in labs without internet access, on devices in isolated networks, and during the exam's scenario questions where you need to recognise which help command does what. There are three to know: `help topic`, `help reference` and `help apropos`.",
   "`help topic` shows conceptual explanations: what a feature is and how it is used. For example, `help topic interfaces address` explains how interface addresses are configured, and `help topic ospf area` describes OSPF areas. The text reads like a short excerpt from a user guide. You can see which topics exist by typing `help topic ?` and continuing with `?` at each level.",
   "`help reference` shows syntax and hierarchy information for a configuration statement: the exact statement syntax, where it lives in the configuration hierarchy, its options and default values. For example, `help reference ospf area` shows the statement's syntax, the hierarchy levels under which it appears and what each option means. Think of it as the command reference manual built into the CLI, whereas `help topic` is the concepts guide.",
   "`help apropos` searches for a word or string among the configuration statements available at your current hierarchy level and below, and lists matching statements with their paths. It is how you find a command when you know roughly what it is about but not what it is called. For example, at the `[edit system]` level, `help apropos ntp` lists statements related to NTP; at the top level, `help apropos mtu` lists places where MTU can be configured. Apropos searches configuration statements, so it is most useful in configuration mode.",
   "Two other help commands are worth recognising. `help syslog` followed by a message tag, such as `help syslog UI_COMMIT`, explains what a system log message means and suggests actions. `help tip cli` prints a random tip about using the CLI, which is a painless way to learn shortcuts.",
   "A quick way to remember the three: topic tells you about a concept, reference tells you the exact syntax of a statement, and apropos helps you find a statement whose name you do not know."
  ],
  "terms": [
   [
    "help topic",
    "Displays conceptual, usage-guide information about a feature."
   ],
   [
    "help reference",
    "Displays syntax, hierarchy location, options and defaults for a configuration statement."
   ],
   [
    "help apropos",
    "Searches configuration statements for a string and lists matching statements and their paths."
   ],
   [
    "help syslog",
    "Explains the meaning of a system log message tag."
   ]
  ],
  "example": "In a lab without internet access, you need to limit how long idle CLI sessions stay open but do not know the statement. At `[edit system]` you run `help apropos idle` and see `login class ... idle-timeout`. Then `help reference idle-timeout` shows its syntax and units, and you configure it.",
  "tip": "Match the verb to the need: concepts use `help topic`, exact syntax uses `help reference`, and searching for a statement by keyword uses `help apropos`.",
  "check": [
   [
    "Which help command shows a statement's syntax and where it lives in the hierarchy?",
    "`help reference`."
   ],
   [
    "You know a feature relates to 'mtu' but not the statement name. Which help command finds it?",
    "`help apropos mtu`, which searches configuration statements for that string."
   ],
   [
    "What kind of information does `help topic` give?",
    "Conceptual usage-guide information explaining what a feature is and how it is used."
   ]
  ]
 },
 {
  "t": "Output filtering with pipes: `| match`, `| except`, `| find`, `| count`, `| no-more`, `| last`, `| save`",
  "body": [
   "Many Junos commands produce long output. The routing table on an internet router can hold hundreds of thousands of routes, and `show interfaces extensive` on a single port fills several screens. The pipe symbol, `|`, lets you send a command's output through a filter so you only see what you need. It works in both operational and configuration mode, and you can chain several pipes together.",
   "`| match` shows only lines that contain a pattern. `show interfaces terse | match ge-` lists only gigabit Ethernet lines. The pattern is a regular expression, and you can match several alternatives by quoting and separating them with a vertical bar: `show interfaces terse | match \"ge-0/0/0|ge-0/0/1\"`. `| except` is the opposite: it hides lines that contain the pattern, so `show interfaces terse | except down` hides interfaces that are down.",
   "`| find` starts the display at the first line that matches and shows everything after it. It is handy in long configurations or logs: `show configuration | find protocols` jumps straight to the protocols section. `| count` counts the lines of output instead of showing them: `show route protocol bgp | count` gives a quick idea of volume, and `show interfaces terse | match up | count` tells you how many lines mention up.",
   "`| no-more` prints all output at once without stopping at each screen with the `---(more)---` prompt. It is useful when capturing output into a terminal log or when running commands from scripts. `| last` shows only the last lines of output, and `| last 20` shows the last 20, which is ideal for seeing the newest entries of a log such as `show log messages | last 20`.",
   "`| save` writes the output to a file on the device instead of, or as well as, showing it: `show configuration | save /var/tmp/backup.conf` creates a text copy of the configuration you can later copy off the device. Related options exist too, such as `| display xml` to see XML-formatted output for automation, `| trim` to remove columns from the left and `| hold` to keep the more prompt at the end.",
   "```\nuser@r1> show log messages | match SNMP | last 5\nuser@r1> show route | count\nuser@r1> show configuration | find interfaces | no-more\n```",
   "Pipes are combined left to right. In the first example, the log is filtered to SNMP lines, then only the last five matches are shown. Practising a few combinations is the fastest way to become efficient on the CLI."
  ],
  "terms": [
   [
    "| match",
    "Shows only output lines that match a pattern (regular expression)."
   ],
   [
    "| except",
    "Hides output lines that match a pattern."
   ],
   [
    "| find",
    "Starts displaying output at the first line matching a pattern."
   ],
   [
    "| count",
    "Counts output lines instead of displaying them."
   ],
   [
    "| save",
    "Writes command output to a file on the device."
   ]
  ],
  "example": "During an outage call you need to know which interfaces are down. You run `show interfaces terse | match down | except \".32768|.16386\"` to list down interfaces while hiding internal units, then `show log messages | match SNMP_TRAP_LINK_DOWN | last 10` to see when they went down.",
  "tip": "`find` starts at the first match and keeps printing everything after it; `match` prints only matching lines. Questions often contrast them.",
  "check": [
   [
    "Which pipe option shows only lines containing 'inet'?",
    "`| match inet`."
   ],
   [
    "How would you see only the last 10 lines of the messages log?",
    "`show log messages | last 10`."
   ],
   [
    "What does `| no-more` do?",
    "It displays the entire output at once, without pausing at each screen for the more prompt."
   ]
  ]
 },
 {
  "t": "`| display set`, `| compare`, `| display inheritance`",
  "body": [
   "Some pipe options do more than filter lines: they change how configuration is displayed. Three that you will use constantly are `| display set`, `| compare` and `| display inheritance`. Each answers a different question: what commands would build this, what have I changed, and where does this setting really come from.",
   "By default Junos shows configuration in a hierarchical format with curly braces and indentation, which is easy to read as a structure. `| display set` shows the same configuration as the flat list of `set` commands that would recreate it. For example, `show configuration interfaces | display set` might print `set interfaces ge-0/0/0 unit 0 family inet address 10.0.12.1/30`. Set format is ideal for copying configuration between devices, documenting changes and searching with `| match`, because every line carries its full path. You can paste set commands directly into configuration mode.",
   "`| compare` shows the difference between two configurations. In configuration mode, `show | compare` compares your candidate configuration with the active (committed) configuration, and is the command to run before every commit. Lines beginning with `+` will be added, lines beginning with `-` will be removed, and headers in square brackets show where in the hierarchy each change is. You can also compare against earlier commits: `show | compare rollback 3` compares the candidate with the configuration from three commits ago, and in operational mode `show configuration | compare rollback 1` shows what the last commit changed.",
   "```\n[edit]\nuser@r1# show | compare\n[edit system]\n-  host-name r1-old;\n+  host-name r1;\n[edit interfaces ge-0/0/1 unit 0 family inet]\n+       address 10.0.13.1/30;\n```",
   "`| display inheritance` deals with configuration groups. Junos lets you define reusable blocks of configuration under `[edit groups]` and apply them with `apply-groups`, for example a group setting the same syslog and NTP servers on every router, or one that applies an MTU to all interfaces matching a wildcard such as `<ge-*>`. Because inherited settings are not shown in the normal `show` output, it can be hard to tell what is really configured. Adding `| display inheritance` shows the configuration with inherited values filled in and marks them with comments naming the group they came from. Adding `| display inheritance no-comments` shows them without the annotation.",
   "Combining these is common. `show configuration | display inheritance | display set | match mtu` answers 'where is every MTU setting, including those from groups?' in one line."
  ],
  "terms": [
   [
    "| display set",
    "Shows configuration as the list of `set` commands that would recreate it."
   ],
   [
    "| compare",
    "Shows differences between the candidate and active configuration, or against a rollback, using + and - markers."
   ],
   [
    "| display inheritance",
    "Shows configuration with values inherited from configuration groups filled in and annotated."
   ],
   [
    "Configuration group",
    "A reusable block of configuration under `[edit groups]` applied elsewhere with `apply-groups`."
   ]
  ],
  "example": "Before a maintenance change you run `show | compare` and notice an unexpected `- protocols ospf area 0.0.0.0 interface ge-0/0/2.0` line that a colleague left in the shared candidate. You remove it from your commit plan, avoiding an outage, and afterward use `show configuration | display set | save /var/tmp/after.set` to document the change.",
  "tip": "In configuration mode, `show | compare` compares candidate against active. Adding `rollback n` compares against an older commit. Inherited group settings stay hidden unless you use `| display inheritance`.",
  "check": [
   [
    "What does a line starting with `+` mean in `show | compare` output?",
    "That the line exists in the candidate but not in the active configuration, so the commit will add it."
   ],
   [
    "Why is `| display set` useful for copying configuration between routers?",
    "Because it outputs complete set commands with their full paths, which can be pasted straight into configuration mode on another device."
   ],
   [
    "How do you see settings a router inherits from an apply-groups statement?",
    "Add `| display inheritance` to the show command; inherited values appear with comments naming the source group."
   ]
  ]
 },
 {
  "t": "Running operational commands from configuration mode with `run`",
  "body": [
   "When you are in the middle of configuring something, you often need to check the device's state: is the interface up, did the route appear, what is the neighbor's address? Operational commands like `show interfaces` or `ping` are not available directly in configuration mode, because in configuration mode `show` displays configuration, not status. The `run` command solves this: it runs any operational mode command without leaving configuration mode.",
   "Usage is simple: put `run` in front of the operational command. `run show interfaces terse` shows interface status. `run ping 10.0.12.2 count 3` tests reachability. `run show route 10.1.1.0/24` checks the routing table. `run show ospf neighbor` checks adjacencies. Command completion and `?` work after `run` just as in operational mode, and pipes work too, for example `run show log messages | last 10`.",
   "The distinction between `show` and `run show` is worth understanding clearly, because it is easy to confuse and exams test it. In configuration mode, `show interfaces` displays the interfaces section of the candidate configuration: what you have configured, including uncommitted changes. `run show interfaces` displays the operational state of the interfaces: whether they are up, their counters and addresses currently in use. One tells you what you asked for; the other tells you what the device is actually doing.",
   "Using `run` keeps your configuration session intact. You stay at the same hierarchy level, your uncommitted changes remain in the candidate, and you avoid the round trip of exiting, checking and re-entering. This is especially useful in `configure exclusive` or `configure private` modes, where exiting could discard uncommitted work.",
   "A typical workflow looks like this: make a change, `commit`, then `run show ...` to confirm the effect, all without leaving configuration mode. If you used `commit confirmed`, you can verify with `run` and then type `commit` again to confirm.",
   "```\n[edit interfaces ge-0/0/1]\nuser@r1# set unit 0 family inet address 10.0.13.1/30\nuser@r1# commit\ncommit complete\nuser@r1# run show interfaces ge-0/0/1 terse\nInterface      Admin Link Proto  Local\nge-0/0/1       up    up\nge-0/0/1.0     up    up   inet   10.0.13.1/30\n```"
  ],
  "terms": [
   [
    "run",
    "A configuration-mode command that executes an operational-mode command without leaving configuration mode."
   ],
   [
    "show (configuration mode)",
    "Displays the candidate configuration at or below the current hierarchy level."
   ],
   [
    "run show",
    "Displays operational state from within configuration mode."
   ],
   [
    "Operational state",
    "What the device is actually doing now, such as interface status, routes and neighbors."
   ]
  ],
  "example": "While configuring OSPF at `[edit protocols ospf area 0.0.0.0]`, you commit and then type `run show ospf neighbor` to see whether the adjacency reached Full state. It shows Init, so you type `run show interfaces ge-0/0/0 terse` and discover the neighbor-facing address is on the wrong subnet, all without leaving your place in the hierarchy.",
  "tip": "In configuration mode, `show` means configuration and `run show` means live status. If a question asks how to ping from configuration mode, the answer includes `run`.",
  "check": [
   [
    "How do you ping 10.1.1.1 without leaving configuration mode?",
    "Type `run ping 10.1.1.1`."
   ],
   [
    "In configuration mode, what is the difference between `show interfaces` and `run show interfaces`?",
    "`show interfaces` displays the configured (candidate) interface statements; `run show interfaces` displays the live operational status of the interfaces."
   ],
   [
    "Do uncommitted changes survive using `run`?",
    "Yes. You stay in configuration mode at the same level, and the candidate configuration is untouched."
   ]
  ]
 },
 {
  "t": "Active vs candidate configuration",
  "body": [
   "Junos never changes the running device the moment you type a configuration command. Instead it keeps two configurations: the active configuration, which the device is actually running, and the candidate configuration, a working copy you edit. Only when you commit does the candidate become the new active configuration. This model is one of the most important Junos ideas and makes changes safer and easier to undo.",
   "When you enter configuration mode, Junos gives you a candidate that starts as a copy of the active configuration (in private mode you get your own copy). Every `set`, `delete`, `rename` or `copy` changes only the candidate. Nothing on the device changes yet: interfaces do not move, routes do not change, users are not added. You can make many related changes and review them together with `show | compare` before any of them take effect.",
   "When you type `commit`, Junos checks the whole candidate for syntax and consistency errors. For example, it will refuse to commit a firewall filter reference that points to a filter that does not exist. If the check passes, the candidate becomes the active configuration and the daemons apply the changes. If it fails, nothing is activated and you get error messages to fix.",
   "Every commit is saved. The newly active configuration is rollback 0, the previous one becomes rollback 1, and so on. Junos stores the current configuration plus up to 49 previous ones, 50 in total. The active configuration is stored as `/config/juniper.conf.gz`, the most recent few rollbacks sit alongside it in `/config`, and older ones in `/var/db/config`. You can see the history with `show system commit`, which lists each commit's time, user, method and comment.",
   "The rollback command works on the candidate. `rollback 0` in configuration mode discards all uncommitted changes, resetting the candidate to match the active configuration. `rollback 1` loads the previous commit into the candidate; the device is not changed until you `commit` again. This two-step design lets you check with `show | compare` exactly what a rollback would do before applying it. In operational mode you can view old versions with `show system rollback 3` or `show configuration | compare rollback 3`.",
   "The two views are shown by different commands. In operational mode, `show configuration` displays the active configuration. In configuration mode, `show` displays the candidate, including uncommitted changes. When they differ, `show | compare` is the bridge between them."
  ],
  "terms": [
   [
    "Active configuration",
    "The committed configuration the device is currently running."
   ],
   [
    "Candidate configuration",
    "The editable copy of the configuration; changes take effect only after commit."
   ],
   [
    "Rollback",
    "Loading a previously committed configuration (0 to 49) into the candidate; it must then be committed."
   ],
   [
    "rollback 0",
    "Discards uncommitted changes by resetting the candidate to the active configuration."
   ],
   [
    "show system commit",
    "Lists commit history with time, user and any comments."
   ]
  ],
  "example": "An engineer changes OSPF costs, commits, and traffic shifts badly. She enters configuration mode, runs `rollback 1`, checks `show | compare` to confirm it reverses only the cost change, then commits. The previous behavior returns within seconds, and `show system commit` shows both commits for the change record.",
  "tip": "Rollback only changes the candidate. Nothing on the device changes until you commit the rolled-back candidate.",
  "check": [
   [
    "What command discards all uncommitted configuration changes?",
    "`rollback 0` in configuration mode, which resets the candidate to the active configuration."
   ],
   [
    "How many committed configurations can Junos keep for rollback?",
    "50 in total: the current one (rollback 0) plus 49 previous ones (rollback 1 to 49)."
   ],
   [
    "In operational mode, which command shows the active configuration?",
    "`show configuration`."
   ]
  ]
 },
 {
  "t": "J-Web GUI and enabling it with `system services web-management`",
  "body": [
   "Not everyone wants to manage devices from a command line. J-Web is the web-based graphical interface built into many Junos devices, particularly SRX firewalls and EX switches. It lets you monitor the device, configure common features through forms and wizards, and view and commit configuration changes from a browser.",
   "J-Web runs on the device itself, so you just point a browser at one of the device's IP addresses. It uses the same configuration database as the CLI. Changes you make in J-Web go into a candidate configuration and must be committed, and they appear in `show system commit` like any other commit. That means you can mix CLI and J-Web freely, and the rollback history covers both. J-Web typically includes a dashboard with system and interface status, monitoring pages for routing, security and logs, configuration pages, a point-and-click configuration editor and tools such as ping and traceroute.",
   "J-Web is enabled with the `web-management` service under `[edit system services]`. You choose HTTP, HTTPS or both. HTTP is unencrypted, so credentials and configuration cross the network in clear text; HTTPS is preferred. For HTTPS you need a certificate; the simplest option is to let the device generate a self-signed one. You can also restrict which interfaces accept J-Web connections.",
   "```\nset system services web-management https system-generated-certificate\nset system services web-management https interface ge-0/0/0.0\n```",
   "After committing, open an HTTPS session to the device's address in a browser and log in with a Junos user account. Your permissions in J-Web follow your login class, so a read-only user can view but not change configuration. On some SRX branch models, J-Web is enabled in the factory-default configuration so you can do the initial setup from a browser. Some platforms and releases ship J-Web as a separate package that you install before you can use it, so check the documentation for your model.",
   "From a security point of view, treat J-Web like any management service. Enable only HTTPS where possible, limit it to management interfaces or trusted networks, and allow it in your loopback firewall filter only from management hosts. If you do not use it, leave it disabled to reduce the device's attack surface."
  ],
  "terms": [
   [
    "J-Web",
    "The web-based graphical interface for managing many Junos devices."
   ],
   [
    "web-management",
    "The `[edit system services]` statement that enables J-Web over HTTP and/or HTTPS."
   ],
   [
    "system-generated-certificate",
    "An option that lets Junos create a self-signed certificate for HTTPS access to J-Web."
   ],
   [
    "Login class",
    "The set of permissions assigned to a user, which applies in J-Web as in the CLI."
   ]
  ],
  "example": "A small office receives a new SRX firewall. The administrator connects a laptop, browses to the default address and uses J-Web's setup wizard to set a root password and addresses. Later, from the CLI, he runs `show system commit` and sees the J-Web commits listed alongside his CLI changes.",
  "tip": "The statement is `set system services web-management` with `http` or `https`. J-Web changes use the same candidate, commit and rollback model as the CLI.",
  "check": [
   [
    "Which configuration hierarchy enables J-Web?",
    "`[edit system services web-management]`, with `http` and/or `https`."
   ],
   [
    "Why prefer HTTPS over HTTP for J-Web?",
    "HTTP sends credentials and configuration unencrypted; HTTPS encrypts the session."
   ],
   [
    "Do J-Web changes take effect immediately?",
    "No. Like the CLI, they go into a candidate configuration and take effect when committed."
   ]
  ]
 },
 {
  "t": "Remote access: SSH, console, out-of-band management interface (fxp0/em0/me0)",
  "body": [
   "You can reach a Junos device in several ways, and good designs use more than one so you can still get in when something breaks. The main methods are the console port, SSH over the network, and a dedicated out-of-band management interface.",
   "The console port is a serial connection directly to the Routing Engine. It works even when no network configuration exists, which makes it the method for initial setup, password recovery and troubleshooting when the device is unreachable over the network. You connect with a console cable and terminal software; the usual default settings are 9600 baud, 8 data bits, no parity and 1 stop bit. On a new device the only account is root, which logs in without a password at the console and lands at the Unix shell, where you type `cli`.",
   "SSH (Secure Shell) is the standard way to manage Junos remotely. It encrypts the whole session, including passwords, and runs over TCP port 22. You enable it with `set system services ssh`. It is good practice to prevent the root account from logging in over SSH, with `set system services ssh root-login deny`, so administrators log in with their own named accounts and are audited individually. Telnet also exists but sends everything in clear text, so avoid enabling it. Protect SSH further with your lo0 filter, allowing it only from management networks.",
   "Out-of-band management means managing a device over a network path separate from the traffic it forwards. Many Junos devices have a dedicated management Ethernet port wired directly to the Routing Engine rather than to the PFE. Its name depends on the platform: fxp0 on many routers and SRX firewalls, me0 on EX switches, and em0 on some other platforms, including several QFX models. You configure it like any interface, for example `set interfaces fxp0 unit 0 family inet address 192.168.100.11/24`.",
   "Because this port connects to the RE, it does not forward transit traffic between itself and the revenue ports. That makes it useful for management even when the production network is down, and keeps management traffic off the data plane. It also means you usually need a route for the management network. Options include a static route, a `backup-router` statement that works when rpd is not running, or placing the management interface in a dedicated management routing instance on platforms that support one, which keeps management routes out of the main table.",
   "A resilient setup combines all three: console access through a terminal server for emergencies, an out-of-band management network reaching fxp0, me0 or em0, and SSH with named accounts for daily work."
  ],
  "terms": [
   [
    "Console port",
    "A serial port connected directly to the RE, usable without any network configuration."
   ],
   [
    "SSH",
    "Secure Shell: encrypted remote CLI access over TCP port 22, enabled with `set system services ssh`."
   ],
   [
    "Out-of-band management",
    "Managing a device over a network path separate from the traffic it forwards."
   ],
   [
    "fxp0 / me0 / em0",
    "Platform-specific names for the dedicated management Ethernet interface connected to the RE."
   ],
   [
    "root-login deny",
    "SSH option that blocks the root account from logging in over SSH."
   ]
  ],
  "example": "A routing loop takes down a site's production network. The engineer cannot reach the router's loopback over the WAN, but she can SSH to its fxp0 address over the separate management network, find the bad static route and fix it. Had the management network also failed, a console server would have been the last resort.",
  "tip": "Know which management interface name goes with which platform family and remember it connects to the RE, not the PFE, so it does not route transit traffic.",
  "check": [
   [
    "Why is the console port useful even when the network is down?",
    "It is a direct serial connection to the Routing Engine that needs no network configuration."
   ],
   [
    "What statement enables SSH on a Junos device?",
    "`set system services ssh`."
   ],
   [
    "Does fxp0 forward transit traffic to other interfaces?",
    "No. It connects to the Routing Engine for management only and is not part of the forwarding plane."
   ]
  ]
 },
 {
  "t": "Factory-default configuration and the root-password requirement before the first commit",
  "body": [
   "Every Junos device ships with a factory-default configuration: a minimal set of statements that lets the device boot and, on some platforms, do something useful straight away. Knowing what it contains and what it lacks explains the first thing you will run into on a new box: Junos will not let you commit anything until you set a root password.",
   "The contents of the factory default vary by platform. Routers such as MX tend to have a very small default: system logging settings and little else, with interfaces unconfigured. EX switches typically put their ports into Ethernet switching in the default VLAN so they work as a plain switch out of the box. SRX branch firewalls usually include security zones, a basic policy allowing trust-to-untrust traffic, source NAT, a DHCP server on the inside and a DHCP client on the outside, so a small office can plug in and go. Whatever the platform, the factory default has no root password.",
   "That missing password is intentional. The first time you log in at the console as root, no password is asked. But when you try to commit any change, Junos checks for a root authentication statement, and if there is none the commit fails with an error saying the `root-authentication` statement is missing. You must set one before any other change can take effect. This stops a device from being deployed on a network with an open root account.",
   "```\n[edit]\nroot# set system host-name lab-r1\nroot# commit\n[edit]\n  'system'\n    Missing mandatory statement: 'root-authentication'\nerror: configuration check-out failed\nroot# set system root-authentication plain-text-password\nNew password:\nRetype new password:\nroot# commit\ncommit complete\n```",
   "With `plain-text-password`, Junos prompts for the password twice and stores it as a hash, so the configuration shows an `encrypted-password` string rather than your actual password. You can also supply an existing hash with `encrypted-password` or an SSH public key with `ssh-rsa` or `ssh-ed25519`, depending on what your release supports.",
   "You can return a device to its factory default at any time. In configuration mode, `load factory-default` replaces the candidate with the factory default; you must then set the root password again before you can commit. In operational mode, `request system zeroize` goes further, erasing all configuration and log data and returning the device to factory state, which is appropriate before returning or disposing of hardware. Many devices also have a reset button that restores the defaults.",
   "The takeaway is simple: on a new or reset device, the very first configuration you commit must include a root password."
  ],
  "terms": [
   [
    "Factory-default configuration",
    "The platform-specific configuration a Junos device ships with and returns to after a reset."
   ],
   [
    "root-authentication",
    "The mandatory `[edit system]` statement that sets the root account's password or key."
   ],
   [
    "plain-text-password",
    "An option that prompts for a password and stores it in hashed form in the configuration."
   ],
   [
    "load factory-default",
    "A configuration-mode command that replaces the candidate with the factory-default configuration."
   ],
   [
    "request system zeroize",
    "An operational command that erases configuration and data and returns the device to factory state."
   ]
  ],
  "example": "You unbox a vSRX in your lab, log in as root at the console, type `cli` and `configure`, set a host name and commit. The commit fails with 'Missing mandatory statement: root-authentication'. You add `set system root-authentication plain-text-password`, enter a strong password twice, commit again and it succeeds.",
  "tip": "After `load factory-default` the root password is gone from the candidate, so you must set it again before committing. Questions often describe this failed commit and ask why.",
  "check": [
   [
    "Why does the first commit on a new Junos device fail?",
    "Because the factory default has no root password, and Junos requires `system root-authentication` before any commit succeeds."
   ],
   [
    "How is a password entered with `plain-text-password` stored?",
    "Junos hashes it and stores it as `encrypted-password` in the configuration."
   ],
   [
    "What is the difference between `load factory-default` and `request system zeroize`?",
    "`load factory-default` replaces only the candidate configuration (which you then commit); `request system zeroize` erases configuration and data and resets the whole device."
   ]
  ]
 },
 {
  "t": "Initial configuration: host name, root authentication, users and login classes, management interface, static default route",
  "body": [
   "Once a device boots with its factory default, a handful of settings make it identifiable, secure and reachable. Nearly every Junos device you deploy will get the same starter set: a host name, a root password, named user accounts with appropriate login classes, a management interface address and a route so management traffic can get home. These are also the first tasks in most JNCIA labs.",
   "The host name identifies the device in the prompt, logs and SNMP. `set system host-name r1` changes the prompt to `user@r1`. Root authentication, `set system root-authentication plain-text-password`, is mandatory before the first commit, as the previous lesson explained.",
   "Named user accounts are better than sharing root, because each person is accountable and gets only the rights they need. Each account has a login class that defines permissions. Junos includes four predefined classes: `super-user` (all permissions), `operator` (can view and perform actions like clearing and restarting, but not change configuration), `read-only` (can view only) and `unauthorized` (no permissions). You can also create custom classes under `[edit system login class]` with specific permission flags and commands allowed or denied, and settings like `idle-timeout`.",
   "```\nset system host-name r1\nset system root-authentication plain-text-password\nset system login user alice class super-user authentication plain-text-password\nset system login user noc class read-only authentication plain-text-password\nset interfaces fxp0 unit 0 family inet address 192.168.100.11/24\nset routing-options static route 0.0.0.0/0 next-hop 192.168.100.1\nset system services ssh root-login deny\n```",
   "The management interface address makes the device reachable for SSH. Use fxp0, me0 or em0 depending on the platform, or a regular interface if there is no out-of-band port. A static route provides the path back to management workstations. A static default route, `0.0.0.0/0`, is the catch-all route used when no more specific route matches. It appears in `show route` with the Static protocol and a preference of 5.",
   "One caution: a default route pointing out the management interface is fine in a small lab, but on a production router it would pull transit traffic toward a port that cannot forward it. In production, prefer a specific static route for the management subnets, the `backup-router` statement, or a dedicated management routing instance where the platform supports one. Also consider adding `set system name-server`, `set system ntp server` and `set system time-zone`, since correct time and DNS make logs and troubleshooting far easier.",
   "After committing, verify: `show system users` shows who is logged in, `show interfaces terse fxp0` confirms the address, and `show route 0.0.0.0/0 exact` confirms the default route is active."
  ],
  "terms": [
   [
    "host-name",
    "The `[edit system]` statement that names the device, shown in the prompt and logs."
   ],
   [
    "Login class",
    "A set of permissions assigned to user accounts; predefined classes are super-user, operator, read-only and unauthorized."
   ],
   [
    "super-user",
    "Predefined login class with all permissions."
   ],
   [
    "Static default route",
    "A manually configured 0.0.0.0/0 route used when no more specific route matches."
   ],
   [
    "next-hop",
    "The address of the neighboring router to which a static route sends matching traffic."
   ]
  ],
  "example": "For a new lab router you set the host name r1, a root password, a super-user account for yourself and a read-only account for a colleague, address fxp0 as 192.168.100.11/24 and add a static route to the jump host network via 192.168.100.1. Your colleague logs in as noc, can run `show` commands, but gets a permission error when trying `configure`.",
  "tip": "Know the four predefined login classes and what each allows: super-user everything, operator view plus operational actions, read-only view only, unauthorized nothing.",
  "check": [
   [
    "Which predefined login class lets a user view status but not change configuration or clear counters?",
    "read-only."
   ],
   [
    "Write the command for a static default route via 10.0.0.1.",
    "`set routing-options static route 0.0.0.0/0 next-hop 10.0.0.1`."
   ],
   [
    "Why create named user accounts instead of sharing root?",
    "So each person is individually authenticated and logged, and receives only the permissions their login class allows."
   ]
  ]
 },
 {
  "t": "Interface naming (type-fpc/pic/port.unit), physical vs logical properties, unit 0, family inet/inet6",
  "body": [
   "Junos names network interfaces in a consistent format that tells you exactly where a port is in the hardware: `type-fpc/pic/port`, followed by `.unit` for a logical unit. For example, `ge-0/0/1.0` is a gigabit Ethernet port on FPC 0, PIC 0, port 1, logical unit 0. Reading these names quickly is basic Junos literacy.",
   "The type is a short prefix for the interface technology. Common ones are `fe` (Fast Ethernet, 100 Mbps), `ge` (Gigabit Ethernet), `xe` (10 Gigabit Ethernet), and `et` (higher-speed Ethernet such as 40 and 100 Gbps and above). You will also see `ae` for aggregated Ethernet bundles and several special types covered in the next lesson. FPC is the line card slot number (on fixed switches it is often 0, or the member number in a Virtual Chassis). PIC is the interface card or module slot on that FPC. Port is the physical port on that PIC. All three start at 0.",
   "Each interface has physical properties and logical properties. Physical properties apply to the whole port and are configured directly under the interface name: `description`, `disable`, `mtu`, `speed`, link-mode settings, `vlan-tagging` and `encapsulation`. Logical properties are configured under a unit, which is a logical interface: protocol families, addresses, VLAN IDs and filters. Commands show the split: `set interfaces ge-0/0/1 mtu 9192` is physical, `set interfaces ge-0/0/1 unit 0 family inet address 10.0.13.1/30` is logical.",
   "Every interface that carries traffic needs at least one unit. On a plain Ethernet port without VLAN tagging, there is exactly one unit, and it must be unit 0. When you enable `vlan-tagging`, you can create several units, each with a `vlan-id`, turning one physical port into many logical interfaces (sometimes called subinterfaces). The unit number does not have to match the VLAN ID, but making them match is a common convention.",
   "The family statement defines which protocol the unit carries. `family inet` is IPv4 and holds IPv4 addresses. `family inet6` is IPv6. Other families include `mpls`, `iso` (needed for IS-IS) and `ethernet-switching` for Layer 2 ports on switches. A unit can have several families at once, so one unit can carry both IPv4 and IPv6. It can also have more than one address per family.",
   "```\nset interfaces ge-0/0/1 description \"to r2\"\nset interfaces ge-0/0/1 unit 0 family inet address 10.0.12.1/30\nset interfaces ge-0/0/1 unit 0 family inet6 address 2001:db8:12::1/64\n```",
   "`show interfaces terse` lists each physical interface and its logical units with admin status, link status, families and addresses. Physical lines have no dot; logical lines have a dot and unit number. `show interfaces ge-0/0/1 extensive` gives detailed physical and logical statistics."
  ],
  "terms": [
   [
    "type-fpc/pic/port",
    "The Junos interface naming format, such as ge-0/0/1, identifying technology, line card, interface card and port."
   ],
   [
    "Logical unit",
    "A logical interface under a physical port, written as .unit, that holds families and addresses."
   ],
   [
    "Physical properties",
    "Settings for the whole port, such as MTU, speed, description and VLAN tagging."
   ],
   [
    "family inet / inet6",
    "Protocol families that enable IPv4 or IPv6 on a logical unit."
   ],
   [
    "vlan-tagging",
    "A physical property that allows multiple units, each with its own VLAN ID, on one port."
   ]
  ],
  "example": "A router has one port, ge-0/0/2, connected to a switch trunk carrying VLANs 100 and 200. You set `vlan-tagging` on the physical interface, then create unit 100 with `vlan-id 100` and address 10.100.0.1/24, and unit 200 with `vlan-id 200` and address 10.200.0.1/24. `show interfaces terse` lists ge-0/0/2.100 and ge-0/0/2.200 as separate logical interfaces.",
  "tip": "In a name like xe-1/2/3.0, the numbers are FPC 1, PIC 2, port 3, unit 0. Addresses always go under a unit and family, never directly on the physical interface.",
  "check": [
   [
    "What does each part of et-2/0/5.0 mean?",
    "et is a high-speed Ethernet interface; FPC 2, PIC 0, port 5; logical unit 0."
   ],
   [
    "Is MTU a physical or logical property in the command `set interfaces ge-0/0/0 mtu 1600`?",
    "Physical, because it is configured directly under the interface name rather than under a unit."
   ],
   [
    "Which family statement enables IPv6 on a unit?",
    "`family inet6`."
   ]
  ]
 },
 {
  "t": "Special interfaces: lo0, fxp0/em0/me0, irb",
  "body": [
   "Besides ordinary Ethernet ports, Junos has several special interfaces that do not map to a single transit port. Three appear throughout the JNCIA material: the loopback interface lo0, the management interface (fxp0, em0 or me0 depending on platform) and the integrated routing and bridging interface, irb.",
   "lo0 is the loopback interface. It is a logical interface that represents the device itself, and it is always up as long as the device is running, because it does not depend on any physical link. That makes it the best address to identify a router. Routing protocols like OSPF and BGP commonly use the lo0 address as the router ID and as the source for sessions, so sessions can survive the failure of any one physical link as long as some path exists. Loopback addresses are usually host addresses: a /32 for IPv4 or /128 for IPv6, as in `set interfaces lo0 unit 0 family inet address 192.168.255.1/32`. As an earlier lesson explained, lo0 is also where you apply the input firewall filter that protects the Routing Engine.",
   "The management interface is a dedicated Ethernet port connected to the Routing Engine for out-of-band management. It is fxp0 on many routers and SRX firewalls, me0 on EX switches and em0 on some other platforms. It does not connect to the PFE, so it does not forward transit traffic between itself and other interfaces. You configure it like any other interface, with a unit 0 and family inet address, and use it for SSH, SNMP, NTP and similar management traffic.",
   "irb stands for integrated routing and bridging. It is a logical Layer 3 interface attached to a VLAN (or bridge domain), giving that VLAN a routed gateway address. Hosts in the VLAN use the irb address as their default gateway, and the device routes between the VLAN and other networks. On EX and QFX switches, irb interfaces are how you route between VLANs without an external router. Older EX software used an interface called `vlan` for the same purpose, which you may still see in older documentation.",
   "```\nset vlans STAFF vlan-id 10\nset vlans STAFF l3-interface irb.10\nset interfaces irb unit 10 family inet address 10.10.0.1/24\nset interfaces ge-0/0/5 unit 0 family ethernet-switching vlan members STAFF\n```",
   "On a device you will also see internal interfaces in `show interfaces terse` that you should not configure, such as those used for communication between the RE and the PFE. Their names vary by platform. The ones you configure deliberately are the three in this lesson, plus the regular ports."
  ],
  "terms": [
   [
    "lo0",
    "The loopback interface representing the device itself; always up, typically holding a /32 router ID address."
   ],
   [
    "Management interface",
    "fxp0, em0 or me0: an out-of-band Ethernet port connected to the RE, not used for transit traffic."
   ],
   [
    "irb",
    "Integrated routing and bridging: a Layer 3 interface attached to a VLAN that acts as its routed gateway."
   ],
   [
    "l3-interface",
    "The VLAN statement that associates a VLAN with its irb unit."
   ]
  ],
  "example": "A campus EX switch has VLANs STAFF (10) and VOICE (20). You create irb.10 with 10.10.0.1/24 and irb.20 with 10.20.0.1/24 and associate them with the VLANs. PCs use 10.10.0.1 as their gateway and phones use 10.20.0.1, and the switch routes between them. The switch's lo0 address 192.168.255.10/32 is advertised in OSPF so the network team can always reach it.",
  "tip": "lo0 is always up and used for router IDs and RE protection; the management interface is out-of-band and does not forward transit traffic; irb is the Layer 3 gateway for a VLAN.",
  "check": [
   [
    "Why is the lo0 address a good choice for a router ID?",
    "Because lo0 is always up and does not depend on any physical link, so the ID stays stable."
   ],
   [
    "What is the role of an irb interface?",
    "It provides a Layer 3 gateway address for a VLAN so the device can route traffic between that VLAN and other networks."
   ],
   [
    "What mask is typically used on a lo0 IPv4 address?",
    "A /32 host mask."
   ]
  ]
 },
 {
  "t": "Commit model: `commit check`, `commit confirmed`, `commit and-quit`, `commit comment`, `commit at`",
  "body": [
   "In Junos, a commit is the moment the candidate configuration becomes the active configuration. Because a single bad commit can cut off a remote site, Junos offers several commit options that make changes safer and easier to track. The exam expects you to know what each one does and when to use it.",
   "`commit check` validates the candidate without activating it. Junos parses the whole configuration and reports errors, such as a missing mandatory statement or a reference to a filter or policy that does not exist, but nothing is applied. Use it while building a large change to catch mistakes early. Passing `commit check` does not guarantee the change is a good idea; it only means the configuration is valid.",
   "`commit confirmed` is the safety net for remote changes. It commits the candidate as usual, but starts a timer, 10 minutes by default, or the number of minutes you specify, as in `commit confirmed 5`. If you do not confirm the change by committing again before the timer expires, Junos automatically rolls back to the previous configuration and commits it. If your change locks you out, for example with a bad firewall filter or a wrong route, you just wait and access returns. To confirm, you issue another `commit` (Junos also accepts `commit check` for this). Use it for any change that could affect your own connectivity.",
   "`commit and-quit` commits and, if successful, exits configuration mode and returns you to operational mode in one step. `commit comment` attaches a note to the commit, for example `commit comment \"CHG1234 add OSPF on ge-0/0/1\"`. Comments appear in `show system commit`, making it far easier to find which rollback to return to later. Options can be combined, so `commit confirmed 5 comment \"CHG1234\"` is valid.",
   "`commit at` schedules a commit for later. You give a time, such as `commit at 02:00:00` or a full date and time like `commit at \"2026-10-03 02:00:00\"`. Junos validates the configuration immediately and then activates it at the scheduled time, which is useful for changes that must happen in a maintenance window. While a commit is pending, the configuration is locked, and you can cancel it with the operational command `clear system commit`. `show system commit` shows the pending commit.",
   "```\n[edit]\nuser@r1# show | compare\nuser@r1# commit check\nconfiguration check succeeds\nuser@r1# commit confirmed 5 comment \"add lo0 filter\"\ncommit confirmed will be automatically rolled back in 5 minutes unless confirmed\ncommit complete\nuser@r1# run show ospf neighbor\nuser@r1# commit\ncommit complete\n```",
   "A safe everyday routine follows from these: review with `show | compare`, validate with `commit check`, apply with `commit confirmed` plus a comment, verify with `run show` commands, then confirm with `commit`. On systems with two Routing Engines, `commit synchronize` applies the commit to both."
  ],
  "terms": [
   [
    "commit check",
    "Validates the candidate configuration without activating it."
   ],
   [
    "commit confirmed",
    "Commits with an automatic rollback (10 minutes by default) unless confirmed by a second commit."
   ],
   [
    "commit and-quit",
    "Commits and then exits configuration mode if the commit succeeds."
   ],
   [
    "commit comment",
    "Attaches a text note to a commit, shown in `show system commit`."
   ],
   [
    "commit at",
    "Schedules a validated commit to take effect at a specified time; cancel with `clear system commit`."
   ]
  ],
  "example": "You are changing the lo0 filter on a router 300 kilometres away. You run `commit confirmed 5 comment \"tighten RE filter\"`. Your SSH session freezes, which means the filter blocks you. You reconnect after five minutes, once the automatic rollback has restored access, fix the missing term, and repeat. This time `run show system users` works, so you confirm with `commit`.",
  "tip": "If you do not confirm, `commit confirmed` rolls back automatically, 10 minutes by default. Confirm with a plain `commit`. `commit check` never changes the active configuration.",
  "check": [
   [
    "What happens if you use `commit confirmed` and never commit again?",
    "When the timer expires (10 minutes by default), Junos automatically rolls back to the previous configuration and commits it."
   ],
   [
    "Which option validates the configuration without applying it?",
    "`commit check`."
   ],
   [
    "How do you cancel a pending `commit at`?",
    "Use `clear system commit` in operational mode."
   ]
  ]
 },
 {
  "t": "Rollback: `rollback n` (0–49), `show | compare rollback n`, rescue configuration",
  "body": [
   "Every time you run `commit` on a Junos device, the software keeps a copy of the configuration that was active before. These saved copies form a numbered history. The currently active configuration is rollback 0, the one committed just before it is rollback 1, and so on back to rollback 49, so Junos keeps up to 50 versions in total. This history is one of the biggest practical advantages of Junos: undoing a bad change is a single command instead of a frantic retyping session.",
   "To go back, enter configuration mode and type `rollback n`, where n is the number you want. This is the part many beginners miss: `rollback` only loads the old version into the candidate configuration. Nothing changes on the running device until you `commit`. That gives you a chance to check what you are about to do. `rollback` with no number is the same as `rollback 0`, which throws away all uncommitted changes in the candidate and brings you back to the active configuration.",
   "Before rolling back, look at the differences. In configuration mode, `show | compare rollback 3` compares the candidate with rollback 3 and prints lines starting with `+` (would be added) and `-` (would be removed). From operational mode you can see the history itself with `show system commit`, which lists each commit with its number, time, user and method (CLI, NETCONF and so on), and you can view any old version with `show configuration | compare rollback 1` or `file compare`.",
   "```\n[edit]\nuser@R1# show | compare rollback 1\n[edit interfaces ge-0/0/1 unit 0 family inet]\n-      address 10.1.1.1/24;\n+      address 10.1.1.5/24;\nuser@R1# rollback 1\nload complete\nuser@R1# commit\n```",
   "The rescue configuration is different from the numbered history. It is a single, known-good configuration that you save on purpose, usually a minimal config that gives you management access (an interface address, a route, SSH and the root password). You save it with `request system configuration rescue save`, and you load it in configuration mode with `rollback rescue` followed by `commit`. Unlike rollback 1 through 49, it never ages out because of new commits. If no rescue configuration is saved, the device typically raises a minor system alarm reminding you that it is missing.",
   "Think of the two as a short-term and a long-term safety net. The numbered rollbacks let you step back a few commits after a mistake. The rescue configuration is the version you trust when you no longer know which numbered version was the last good one."
  ],
  "terms": [
   [
    "Rollback 0",
    "The currently active (committed) configuration; `rollback` with no number returns the candidate to it."
   ],
   [
    "Rollback n",
    "A previously committed configuration, numbered 1 to 49 by age, which can be loaded into the candidate."
   ],
   [
    "show | compare",
    "Displays differences between the candidate and the active configuration or a named rollback, using + and - markers."
   ],
   [
    "Rescue configuration",
    "A manually saved known-good configuration, loaded with `rollback rescue`, that is not replaced by normal commits."
   ]
  ],
  "example": "An engineer changes an OSPF interface cost and commits, and suddenly traffic takes a slow path. She types `configure`, then `show | compare rollback 1` to confirm the only difference is the cost, then `rollback 1` and `commit`. Traffic returns to the fast path within seconds.",
  "tip": "Remember that `rollback n` does not take effect by itself; it only replaces the candidate. You must still commit. Also remember the range: 0 is the active config and 49 is the oldest.",
  "check": [
   [
    "You type `rollback 2` in configuration mode. Has the device's behavior changed yet?",
    "No. The rollback only loads that version into the candidate configuration; it takes effect only after you commit."
   ],
   [
    "What is the difference between rollback 1 and the rescue configuration?",
    "Rollback 1 is automatically the previous committed version and shifts with every commit; the rescue configuration is saved deliberately with `request system configuration rescue save` and stays until you replace or delete it."
   ],
   [
    "Which command shows who committed each configuration and when?",
    "`show system commit` in operational mode."
   ]
  ]
 },
 {
  "t": "Saving and loading: `save`, `load merge`, `load override`, `load replace`, `load set`, `load factory-default`",
  "body": [
   "Besides typing `set` commands one at a time, you can move whole configurations in and out of the candidate as files. This is how you back up a device, copy a standard configuration to many devices, or paste a block of config from a template. All the `load` commands change only the candidate; as usual, nothing is live until you commit.",
   "`save` writes configuration to a file. At the top of the hierarchy, `save r1-backup.conf` writes the whole candidate to that file, by default in your home directory. If you are inside a hierarchy level such as `[edit protocols ospf]`, `save` writes only that part. You can also save to a remote destination using an FTP or SCP style path.",
   "The `load` options differ in how they combine the file with what is already in the candidate. `load merge` adds the file's statements to the existing configuration; where both define the same statement, the file's value wins, and everything else is kept. `load override` discards the entire existing candidate and replaces it with the file, so anything not in the file is gone. `load replace` looks for statements in the file tagged with `replace:` and replaces only those sections, leaving the rest alone. `load set` reads a file (or pasted text) made of `set` and `delete` commands, the same format that `show configuration | display set` produces. The source can be a filename or the word `terminal`, which lets you paste text and finish with Ctrl+D.",
   "```\n[edit interfaces ge-0/0/2]\nuser@R1# load merge terminal relative\n[Type ^D at a new line to end input]\nunit 0 { family inet { address 10.9.9.1/24; } }\n^D\nload complete\n```",
   "The `relative` keyword makes the loaded text relative to your current hierarchy level, which is handy when pasting a snippet while you are already inside, for example, `[edit interfaces ge-0/0/2]`.",
   "`load factory-default` replaces the candidate with the factory default configuration for that platform. Because the factory default does not include a root password, Junos will refuse to commit until you set one with `set system root-authentication plain-text-password`. This is a common exam fact: every commit requires root authentication to be configured. For a full reset of the device, including logs and files, there is also the operational command `request system zeroize`, which is more drastic than loading the defaults."
  ],
  "terms": [
   [
    "load merge",
    "Combines statements from a file or terminal with the existing candidate, with the loaded values winning on conflicts."
   ],
   [
    "load override",
    "Discards the whole candidate and replaces it with the loaded configuration."
   ],
   [
    "load replace",
    "Replaces only the configuration sections that are marked with the `replace:` tag in the loaded text."
   ],
   [
    "load set",
    "Loads a list of `set` and `delete` commands, as produced by `| display set`."
   ],
   [
    "load factory-default",
    "Loads the platform's factory default configuration into the candidate; a root password must be set before commit."
   ]
  ],
  "example": "A team keeps a golden baseline for branch routers. When a new router arrives, the engineer copies the baseline file to it, runs `load override /var/tmp/branch-baseline.conf`, sets the site-specific hostname and addresses, checks with `commit check` and then commits. Nothing from the factory configuration survives, which is exactly what they want.",
  "tip": "Exam questions usually test merge versus override: merge keeps existing config and adds to it, override wipes everything not in the file. Also remember that factory-default will not commit without a root password.",
  "check": [
   [
    "You need to paste a set of `set` commands copied from another router. Which load option fits?",
    "`load set terminal`, which accepts set-style commands; then commit."
   ],
   [
    "After `load factory-default`, the commit fails. What is the most likely reason?",
    "The root authentication password is missing; Junos requires `system root-authentication` before any commit."
   ],
   [
    "Which option would remove a static route that exists in the candidate but not in the loaded file?",
    "`load override`, because it replaces the entire candidate with the file."
   ]
  ]
 },
 {
  "t": "Editing tools: `delete`, `deactivate`/`activate`, `annotate`, `copy`, `rename`, `insert`",
  "body": [
   "Junos gives you several commands for changing configuration beyond `set`. Knowing them saves time and, more importantly, lets you make changes safely. All of them work on the candidate configuration and take effect at commit.",
   "`delete` removes a statement or an entire hierarchy. `delete interfaces ge-0/0/1 unit 0 family inet address 10.1.1.1/24` removes one address; `delete protocols ospf` removes the whole OSPF configuration. Be careful: `delete` at a high level with no argument, such as at the top of `[edit]`, asks for confirmation because it would erase everything under that level.",
   "`deactivate` keeps a statement in the configuration but tells Junos to ignore it. The statement is marked `inactive:` when you view the configuration. This is ideal for temporarily turning something off, for example `deactivate protocols bgp group ISP-B`, because you can bring it back exactly as it was with `activate protocols bgp group ISP-B`. Compare that with `delete`, which loses the configuration for good (until a rollback). There is also `disable` inside many objects, such as interfaces, which is a real configuration setting that administratively shuts the item down. An interface that is deactivated is not configured at all; an interface with `disable` is configured but administratively down.",
   "`annotate` adds a comment to a statement at the current level. For example, at `[edit interfaces]` you can type `annotate ge-0/0/0 \"Uplink to ISP-A, circuit 4411\"`. The comment appears as a `/* ... */` line above the statement in the configuration and helps the next engineer understand why something is there. Comments are shown in normal configuration views but not in `display set` output.",
   "`copy` duplicates a configuration element under a new name: `copy interfaces ge-0/0/1 to ge-0/0/2` copies the entire interface configuration. `rename` changes a name in place: `rename firewall family inet filter PROTECT to filter PROTECT-RE`. References to the old name elsewhere are not updated automatically, so check with `show | compare` afterwards.",
   "`insert` changes the order of items where order matters, which is mainly terms in routing policies and firewall filters. New terms are always added at the end, so if you add a term that must be evaluated earlier you move it: `insert term BLOCK-TELNET before term ALLOW-ALL`. Order matters because both policies and filters are evaluated from the top down and stop at the first terminating action.",
   "```\n[edit firewall family inet filter PROTECT-RE]\nuser@R1# insert term ALLOW-SSH before term DENY-ALL\nuser@R1# show | compare\n```"
  ],
  "terms": [
   [
    "deactivate",
    "Marks a statement `inactive:` so it stays in the configuration but is ignored at commit; reversed with `activate`."
   ],
   [
    "annotate",
    "Attaches a comment to a statement at the current hierarchy level, shown as `/* ... */`."
   ],
   [
    "rename",
    "Changes the name of a configuration element in place without updating other references to it."
   ],
   [
    "insert",
    "Moves an ordered element, such as a policy or filter term, before or after another."
   ]
  ],
  "example": "During a maintenance window a network engineer needs to stop a BGP session to a backup ISP but may need it again tomorrow. Instead of deleting the group, she runs `deactivate protocols bgp group BACKUP` and commits. The next day `activate protocols bgp group BACKUP` and a commit restore the exact same session settings.",
  "tip": "Know the difference between `deactivate` (configuration kept but ignored), `delete` (configuration removed) and `disable` (configured but administratively down). Also know that new terms go to the end, so `insert` is the fix when term order is wrong.",
  "check": [
   [
    "You add a new firewall filter term, but it never matches because an earlier term accepts everything. How do you fix it without retyping?",
    "Use `insert term NEW before term OLD` to move it above the broader term, then commit."
   ],
   [
    "How does a deactivated statement appear when you run `show`?",
    "It is prefixed with `inactive:`."
   ]
  ]
 },
 {
  "t": "Configuration groups with `groups` and `apply-groups`, including wildcards",
  "body": [
   "Configuration groups let you write a piece of configuration once and apply it in many places. This keeps large configurations short, consistent and easier to change. A group is defined under the `groups` hierarchy using the same structure as the normal configuration, and it has no effect until you reference it with `apply-groups`.",
   "Here is a simple case: every Gigabit Ethernet interface should have a certain MTU (maximum transmission unit) setting. You define a group with a wildcard in the interface name and then apply it at the top level.",
   "```\nset groups GE-DEFAULTS interfaces <ge-*> mtu 9192\nset groups GE-DEFAULTS interfaces <ge-*> unit 0 family inet\nset apply-groups GE-DEFAULTS\n```",
   "The angle brackets hold a wildcard pattern. `<ge-*>` matches any interface name starting with `ge-`, and `<*>` matches anything. The wildcard only matches items that actually exist in the normal configuration; a group does not create interfaces on its own. It fills in statements for objects you have already configured. Patterns can also use `?` for a single character and bracketed ranges.",
   "You can apply groups at the top of the configuration or at a specific hierarchy level, such as `set interfaces apply-groups GE-DEFAULTS` or under one protocol. The rules for which value wins follow a clear order. Anything you configure explicitly in the normal configuration overrides a value inherited from a group. If several groups are applied at the same level, the one listed first takes priority. Groups applied at a more specific (deeper) level take priority over those applied higher up. To stop inheritance for one object, use `apply-groups-except GROUPNAME` at that level.",
   "Because inherited statements are not shown in the normal `show` output, you need a special view to see the real configuration. `show | display inheritance` expands the groups and marks inherited lines with a comment naming the group they came from. Add `| display inheritance brief` for a compact version. This is also the view to use when troubleshooting a value you did not expect.",
   "One group you will see on every device is `junos-defaults`, a built-in group that holds predefined settings such as named applications. You do not normally edit it, but it explains why some values exist even though you never typed them. On dual Routing Engine systems, the special groups `re0` and `re1` hold settings like hostnames and management addresses that differ per Routing Engine."
  ],
  "terms": [
   [
    "groups",
    "The configuration hierarchy where reusable blocks of configuration are defined."
   ],
   [
    "apply-groups",
    "The statement that makes a group's configuration inherit into the level where it is applied."
   ],
   [
    "Wildcard (<...>)",
    "A pattern in angle brackets inside a group, such as `<ge-*>`, that matches existing configuration names."
   ],
   [
    "display inheritance",
    "A `show` pipe option that expands inherited group statements and marks where each came from."
   ]
  ],
  "example": "A service provider wants every core-facing interface to run OSPF point-to-point with the same hello settings. It writes a group with `protocols ospf area 0 interface <ge-*>` settings, applies it under protocols, and uses `apply-groups-except` on the one ge- interface in OSPF that needs different timers.",
  "tip": "Explicit configuration always beats group inheritance, and the first group listed wins among peers. If a question asks why a statement is in effect but not visible, the answer is usually a group; `show | display inheritance` reveals it.",
  "check": [
   [
    "A group sets MTU 9192 on `<ge-*>`, and interface ge-0/0/3 has `mtu 1500` configured directly. Which MTU applies?",
    "1500, because explicitly configured statements override group-inherited values."
   ],
   [
    "Does a wildcard group create configuration for interfaces that are not otherwise configured?",
    "No. Wildcards only match objects that already exist in the configuration."
   ],
   [
    "How can you see inherited statements in the configuration?",
    "Use `show | display inheritance` (or `show configuration | display inheritance`)."
   ]
  ]
 },
 {
  "t": "System services: SSH, NTP, syslog, SNMP basics",
  "body": [
   "A new Junos device does very little for management by default. You decide which services run, and each one is configured under the `system` hierarchy (SNMP has its own top-level `snmp` hierarchy). This lesson covers the four you will set up on almost every device: SSH for remote CLI, NTP for time, syslog for logging and SNMP for monitoring.",
   "SSH (Secure Shell) gives you an encrypted remote CLI session. Enable it with `set system services ssh`. It is good practice to add `set system services ssh root-login deny` so that nobody can log in directly as root over the network; administrators log in with their own accounts and their actions are logged under their names. Telnet can be enabled with `set system services telnet`, but it sends passwords in clear text and should be avoided. Web management, NETCONF over SSH and others are also under `system services`.",
   "NTP (Network Time Protocol) keeps the device clock accurate. Correct time matters because log entries, commit history and certificates all depend on it; when you correlate an incident across ten devices, their timestamps must agree. Configure a server with `set system ntp server 192.0.2.10` and set the local time zone with `set system time-zone`. If the clock is far off, NTP may take a long time to correct it gradually, so you can set it once with `set date ntp` from operational mode.",
   "Syslog is how Junos records events. Local log files live in `/var/log`, and each file is configured with a facility and a severity: `set system syslog file messages any notice` logs events from any facility at severity notice or more serious. To also send events to a central log server, use `set system syslog host 192.0.2.50 any warning`. Severities from most to least serious are emergency, alert, critical, error, warning, notice, info and debug; choosing one includes everything more severe.",
   "SNMP (Simple Network Management Protocol) lets a monitoring system poll the device for counters and status and receive traps (unsolicited alerts). A basic SNMPv2c setup uses a community string: `set snmp community monitor-ro authorization read-only` and optionally `clients` to restrict which addresses may poll. Traps are sent to targets defined in a `trap-group`. SNMPv2c communities are sent in clear text, so SNMPv3, which adds authentication and encryption, is preferred where supported.",
   "```\nset system services ssh root-login deny\nset system ntp server 192.0.2.10\nset system syslog host 192.0.2.50 any warning\nset snmp community monitor-ro authorization read-only\n```"
  ],
  "terms": [
   [
    "SSH",
    "Secure Shell, an encrypted protocol for remote command-line access, enabled with `set system services ssh`."
   ],
   [
    "NTP",
    "Network Time Protocol, which synchronizes the device clock with a time server."
   ],
   [
    "Syslog severity",
    "The level of an event, from emergency (most serious) to debug; a configured level includes all more serious levels."
   ],
   [
    "SNMP community",
    "A shared string used by SNMPv1/v2c to authorize polling; it provides weak, clear-text protection."
   ]
  ],
  "example": "After a security audit, a company requires encrypted management and central logging. The engineer enables SSH with root login denied, removes the telnet service, points NTP at the internal time servers and adds a syslog host so the security team's log platform receives every warning and above from each router.",
  "tip": "Expect questions on where services live: `system services` for SSH and telnet, `system ntp`, `system syslog`, but top-level `snmp`. Also remember that a syslog severity includes everything more severe than it.",
  "check": [
   [
    "Which statement prevents direct root logins over SSH?",
    "`set system services ssh root-login deny`."
   ],
   [
    "Why is accurate time from NTP important for troubleshooting?",
    "Log timestamps and commit history must line up across devices to correlate events correctly."
   ],
   [
    "If syslog is set to severity `warning`, will `error` messages be logged?",
    "Yes. Error is more severe than warning, and a severity setting includes all more serious levels."
   ]
  ]
 },
 {
  "t": "Monitoring the platform: `show chassis hardware`, `show chassis alarms`, `show system alarms`, `show chassis routing-engine`, `show system storage`",
  "body": [
   "Before you troubleshoot routing or interfaces, you need to know the device itself is healthy. Junos provides a small set of operational-mode commands that tell you what hardware is installed, whether anything is alarming, how busy the control plane is and whether storage is filling up. These are the first commands many engineers type after logging in.",
   "`show chassis hardware` lists the physical inventory: the chassis, Routing Engines, line cards (such as FPCs, Flexible PIC Concentrators), PICs (Physical Interface Cards), power supplies, fans and optics, with part numbers and serial numbers. You use it to confirm a replacement card was detected, to record serial numbers for a support case, or to check which transceiver is plugged into a port. Adding `detail` or `extensive` shows more, such as memory and component versions.",
   "Junos separates alarms into two kinds. `show chassis alarms` reports hardware and environmental problems: a failed fan, a power supply without input, a temperature over the limit or a link down on an interface configured to alarm. `show system alarms` reports software and configuration conditions, such as a missing rescue configuration, a license issue or a problem with the boot media. Each alarm has a class, Major (red, needs immediate attention) or Minor (yellow). Many devices also show alarm LEDs on the front panel, and the CLI prompt banner may tell you alarms are active.",
   "`show chassis routing-engine` shows the health of the Routing Engine (RE), the component that runs Junos, the routing protocols and the CLI. Key fields are CPU utilization (split into user, kernel, interrupt and idle), memory utilization, temperature, uptime, the last reboot reason and load averages. A consistently high CPU can point to a routing protocol problem or excessive traffic being sent to the RE. On dual-RE systems it also shows which RE is the primary (master) and which is the backup.",
   "`show system storage` works like the Unix `df` command. It lists each file system with its size, used space, available space and mount point. If `/var` fills up, logs cannot be written and software upgrades will fail because there is no room to stage the package. When space is low you clean it with `request system storage cleanup`, covered in a later lesson.",
   "```\nuser@R1> show chassis alarms\n1 alarms currently active\nAlarm time               Class  Description\n2026-03-02 09:14:21 UTC  Major  PEM 1 Not OK\nuser@R1> show system alarms\n1 alarms currently active\nAlarm time               Class  Description\n2026-03-01 18:02:44 UTC  Minor  Rescue configuration is not set\n```",
   "Together these commands give you a quick health check: inventory, alarms of both kinds, control plane load and disk space. Related commands worth knowing are `show chassis environment` for temperatures and fan status and `show system uptime` for when the system and protocols last started."
  ],
  "terms": [
   [
    "Chassis alarm",
    "A hardware or environmental alarm, such as a failed fan or power supply, shown by `show chassis alarms`."
   ],
   [
    "System alarm",
    "A software or configuration alarm, such as a missing rescue configuration, shown by `show system alarms`."
   ],
   [
    "Routing Engine (RE)",
    "The control-plane component that runs Junos, routing protocols and management; its health is shown by `show chassis routing-engine`."
   ],
   [
    "FPC",
    "Flexible PIC Concentrator, a line card slot that holds PICs and forwards traffic on many Junos platforms."
   ]
  ],
  "example": "The NOC receives an SNMP trap that a router has a major alarm. The on-call engineer logs in, runs `show chassis alarms` and sees a power supply reporting no input. `show chassis hardware` gives the power supply's part and serial number, which she adds to the replacement request. `show system alarms` is clean, so the software side is fine.",
  "tip": "Chassis alarms are about hardware and environment; system alarms are about software and configuration. A missing rescue configuration is the classic example of a system alarm.",
  "check": [
   [
    "Which command would report that no rescue configuration is saved?",
    "`show system alarms`, because it is a software/configuration condition."
   ],
   [
    "Where would you find the Routing Engine's CPU and memory utilization and last reboot reason?",
    "`show chassis routing-engine`."
   ],
   [
    "Why might a software upgrade fail after `show system storage` shows /var almost full?",
    "There is no room to copy and unpack the package; clean up storage first."
   ]
  ]
 },
 {
  "t": "Monitoring interfaces: `show interfaces terse`, `extensive`, `monitor interface`, `monitor traffic interface`",
  "body": [
   "Interfaces are where most problems show up, so Junos gives you several views of them, from a one-line summary to a detailed error report to live counters and packet captures.",
   "`show interfaces terse` is the quick overview. Each physical interface and each logical unit gets one line with columns for Admin status, Link status, Proto (the protocol families such as inet, inet6 or iso) and Local and Remote addresses. Admin up and Link down usually means a cabling, optic or far-end problem. Admin down means someone configured `disable`. You can narrow it with an interface name, for example `show interfaces terse ge-0/0/1`, or a wildcard like `show interfaces terse ge-*`.",
   "```\nuser@R1> show interfaces terse ge-0/0/1\nInterface       Admin Link Proto    Local            Remote\nge-0/0/1        up    up\nge-0/0/1.0      up    up   inet     10.1.12.1/30\n```",
   "Without options, `show interfaces ge-0/0/1` shows a medium level of detail: speed, MTU, MAC address, flags, input and output rates and addresses per unit. `show interfaces ge-0/0/1 detail` adds traffic statistics and `extensive` shows everything, including error counters: input errors, CRC (cyclic redundancy check) or framing errors, drops, runts, collisions, carrier transitions and queue statistics. When a link is up but users complain it is slow or dropping, extensive output is where you look. Rising CRC errors usually point at a bad cable or optic; carrier transitions show a link that is flapping. Use `clear interfaces statistics ge-0/0/1` to reset counters so you can see whether errors are still increasing.",
   "`monitor interface ge-0/0/1` opens a full-screen, real-time display of the interface's counters and rates that refreshes every second or so, with a column showing how much each counter changed. Keys let you switch interfaces (n for next), freeze the display and quit (q). It is useful for watching whether traffic is flowing right now or whether errors are climbing during a test. `monitor interface traffic` shows a live summary of all interfaces at once.",
   "`monitor traffic interface ge-0/0/1` is a packet capture similar to tcpdump. An important limitation: on most platforms it only shows packets sent to or from the Routing Engine, such as routing protocol hellos, pings to the device, SSH and ARP, not transit traffic being forwarded through the box by the hardware. It is therefore excellent for checking whether OSPF hellos or BGP packets are arriving. Options include `no-resolve` to avoid DNS lookups, `detail` for more decode, `count` and a `matching` expression to filter, for example `monitor traffic interface ge-0/0/1 matching \"proto ospf\"`. Press Ctrl+C to stop."
  ],
  "terms": [
   [
    "show interfaces terse",
    "A one-line-per-interface summary of admin status, link status, protocol families and addresses."
   ],
   [
    "extensive",
    "The most detailed interface output, including error counters such as CRC errors, drops and carrier transitions."
   ],
   [
    "monitor interface",
    "A live, auto-refreshing display of one interface's counters and rates."
   ],
   [
    "monitor traffic interface",
    "A tcpdump-like capture of packets to and from the Routing Engine on an interface."
   ]
  ],
  "example": "Users on a branch report slow file transfers. `show interfaces terse` shows the uplink as up/up, but `show interfaces ge-0/0/0 extensive` shows thousands of input CRC errors. After `clear interfaces statistics ge-0/0/0`, `monitor interface ge-0/0/0` shows the CRC count still rising during a transfer. Replacing the patch cable stops the errors.",
  "tip": "Remember that `monitor traffic interface` normally sees only traffic to or from the Routing Engine, not transit traffic. And up/down (admin up, link down) is a physical problem, while down in the Admin column means the interface is disabled in configuration.",
  "check": [
   [
    "In `show interfaces terse`, ge-0/0/2 shows Admin up, Link down. What is the likely cause?",
    "A physical-layer problem such as a cable, optic or the far-end port, since the interface is enabled in configuration."
   ],
   [
    "Which command shows CRC errors on an interface?",
    "`show interfaces <name> extensive`."
   ],
   [
    "Would `monitor traffic interface` show a web download passing through the router between two hosts?",
    "Generally no; it captures traffic to and from the Routing Engine, not transit traffic forwarded in hardware."
   ]
  ]
 },
 {
  "t": "Network tools: ping, traceroute, SSH, telnet from the CLI",
  "body": [
   "Junos includes the familiar network testing tools directly in operational mode. You do not need to leave the CLI to test reachability, trace a path or open a session to another device. What makes them powerful on a router is the set of options that let you choose the source address, the routing instance and the packet size.",
   "`ping` sends ICMP (Internet Control Message Protocol) echo requests. Unlike some other systems, Junos ping keeps running until you press Ctrl+C unless you give a `count`. Useful options include `count 5`, `rapid` (sends five packets quickly and prints `!` for each reply and `.` for each timeout), `source 10.0.0.1` to test from a specific address, `interface ge-0/0/1` to send out a specific interface, `routing-instance vr1` to use another routing table, `size 1472` together with `do-not-fragment` to test the path MTU, and `ttl` to limit hops.",
   "```\nuser@R1> ping 10.1.12.2 rapid count 5\nPING 10.1.12.2 (10.1.12.2): 56 data bytes\n!!!!!\n--- 10.1.12.2 ping statistics ---\n5 packets transmitted, 5 packets received, 0% packet loss\n```",
   "Choosing the source matters. When you ping a remote network from a router, the default source is the address of the outgoing interface. The far end may have no route back to that link address even though it can reach your loopback, so the ping fails while real traffic works. Testing with `source` set to the loopback address, or to a LAN address, gives a more realistic result.",
   "`traceroute` shows each router hop on the path to a destination by sending probes with increasing TTL (time to live) values and recording which router returns an ICMP time-exceeded message. Each line shows a hop and its response times; asterisks mean no reply within the timeout, which may be a filter rather than a failure. It supports the same `source` and `routing-instance` options, and `no-resolve` to skip DNS lookups. `traceroute inet6` works for IPv6, and `ping inet6` for IPv6 pings.",
   "`ssh user@192.0.2.20` and `telnet 192.0.2.20` open a session from the device to another host. This is useful when you can only reach a remote device through a jump point, or to test that a TCP port is open: `telnet 192.0.2.20 port 179`, for example, checks whether something is listening on the BGP port. Both accept `routing-instance` and `source` options. Remember that telnet is unencrypted, so use it for testing rather than for managing production devices."
  ],
  "terms": [
   [
    "ping rapid",
    "A ping mode that sends a burst of echo requests and prints `!` for replies and `.` for timeouts."
   ],
   [
    "source option",
    "Sets the source IP address of a test packet, which affects whether the far end can reply."
   ],
   [
    "traceroute",
    "A tool that reveals each router hop to a destination using increasing TTL values."
   ],
   [
    "routing-instance option",
    "Runs a test using a specific routing instance's table instead of the default inet.0."
   ]
  ],
  "example": "A new link to a partner network is up, and `ping 172.16.5.1` from the router works, but hosts on the LAN cannot reach the partner. `ping 172.16.5.1 source 10.10.10.1` (the LAN gateway address) fails, revealing that the partner has no return route to the LAN prefix. Adding that route on the partner side fixes it.",
  "tip": "Junos ping runs forever without `count` or `rapid`. When a question describes a ping from the router working but hosts failing, think about the source address and the return route.",
  "check": [
   [
    "How do you ping from a router using its loopback address as the source?",
    "`ping <destination> source <loopback address>`."
   ],
   [
    "How would you test whether a remote router accepts TCP connections on port 179?",
    "`telnet <address> port 179` from the CLI."
   ],
   [
    "What does a line of asterisks in traceroute output mean?",
    "That hop did not reply within the timeout, possibly because of filtering or rate limiting, not necessarily a failure."
   ]
  ]
 },
 {
  "t": "System logging (`/var/log/messages`, `show log`) and protocol traceoptions",
  "body": [
   "Logs tell you what the device has been doing: interfaces going up and down, commits, logins, routing protocol neighbors changing state and hardware events. Junos writes these to files under `/var/log`, and the most important one is `messages`, which is configured by default on most platforms to collect events at notice level and above from all facilities.",
   "You read logs from operational mode with `show log messages`. The output can be long, so pipe it: `show log messages | match ge-0/0/1` finds lines mentioning an interface, `show log messages | last 20` shows the most recent entries, and `| except` hides noisy lines. Another useful file is `interactive-commands`, if configured, which records the commands users typed. `show log` alone lists the files in `/var/log`.",
   "```\nuser@R1> show log messages | match SNMP_TRAP_LINK | last 3\nMar  2 10:01:12 R1 mib2d[1780]: SNMP_TRAP_LINK_DOWN: ifIndex 526, ifAdminStatus up(1), ifOperStatus down(2), ifName ge-0/0/1\n```",
   "To watch a log live, use `monitor start messages`. New lines are printed to your terminal as they are written, which is ideal while you reproduce a problem. Stop it with `monitor stop`. You can also press Esc-Q to pause the output temporarily. Log files rotate when they reach their size limit, keeping a set of compressed older files such as `messages.0.gz`.",
   "Syslog tells you what happened; traceoptions tell you why. Traceoptions are a detailed debugging facility you enable per protocol or process. You choose a file name and one or more flags that select what to record. For OSPF, for example, the `hello` flag records hello packets, `error` records errors and `state` records neighbor state changes.",
   "```\nset protocols ospf traceoptions file ospf-trace size 1m files 3\nset protocols ospf traceoptions flag hello detail\nset protocols ospf traceoptions flag error\n```",
   "After committing, read the trace with `show log ospf-trace` or watch it with `monitor start ospf-trace`. Trace files are also stored in `/var/log`. Traceoptions can generate a lot of output and use Routing Engine CPU, so enable only the flags you need, limit the file size and number of files, and remove or deactivate the traceoptions when you finish. The `all` flag is tempting but is usually far too verbose on a production device.",
   "A typical workflow is: check `show log messages` for the event (for example, an OSPF neighbor went down), then enable traceoptions for that protocol to see the details (for example, that hello intervals do not match), fix the problem and then turn the tracing off."
  ],
  "terms": [
   [
    "/var/log/messages",
    "The main system log file on Junos, holding events from all facilities at the configured severity."
   ],
   [
    "show log",
    "Displays a log file from /var/log, or lists the files when used alone."
   ],
   [
    "monitor start",
    "Prints new lines of a log or trace file to the terminal in real time until `monitor stop`."
   ],
   [
    "traceoptions",
    "Per-protocol or per-process debugging configuration that writes detailed events to a trace file based on selected flags."
   ]
  ],
  "example": "An OSPF adjacency to a new router will not form. `show log messages | match OSPF` shows nothing useful, so the engineer enables `traceoptions` with the `hello` and `error` flags. The trace shows hellos arriving with a dead interval of 120 seconds while the local setting is 40. Matching the timers brings the neighbor up, and she deletes the traceoptions.",
  "tip": "Syslog records events at a chosen severity; traceoptions give protocol-level debugging detail. Both end up in /var/log and both are read with `show log <file>`. Always remove traceoptions after troubleshooting.",
  "check": [
   [
    "How do you display only the last 10 lines of the messages log?",
    "`show log messages | last 10`."
   ],
   [
    "How do you see new log entries in real time and then stop?",
    "`monitor start messages` to begin and `monitor stop` to end."
   ],
   [
    "Why should traceoptions be removed after use?",
    "They can generate large files and consume Routing Engine CPU and storage."
   ]
  ]
 },
 {
  "t": "Managing files: `file list`, `file show`, `request system storage cleanup`",
  "body": [
   "Junos is built on a Unix-like operating system, so it has a normal file system with directories such as `/var/log` for logs, `/var/tmp` for temporary files and software packages, `/config` and `/var/db/config` for saved configurations and `/var/home/<user>` for each user's home directory. From the CLI you manage these files with the `file` commands, without needing a Unix shell.",
   "`file list` shows the contents of a directory. With no argument it lists your home directory; `file list /var/tmp` lists temporary files and `file list /var/log detail` adds size, owner and date, similar to `ls -l`. This is how you confirm a software package finished copying or find the name of an old log.",
   "`file show` displays a text file, for example `file show /var/log/messages` or `file show /var/tmp/backup.conf`. Other file commands you should recognize are `file copy` (including copying to or from a remote server using FTP, SCP or HTTP style URLs), `file delete`, `file rename`, `file compare files` to compare two files, and `file archive` to compress files.",
   "```\nuser@R1> file list /var/tmp detail\n/var/tmp:\n-rw-r--r--  1 root  wheel  412331520 Mar  1 22:10 junos-install-package.tgz\n-rw-r--r--  1 admin wheel      18234 Mar  2 08:02 r1-backup.conf\nuser@R1> file copy /var/tmp/r1-backup.conf scp://admin@192.0.2.30/backups/\n```",
   "Over time, storage fills with rotated log files, crash dumps, old software packages and temporary files. `show system storage` tells you how full each file system is. To reclaim space, Junos provides `request system storage cleanup`. It first lists the files it plans to delete and asks for confirmation before removing them. If you only want to see the list without deleting anything, add `dry-run`: `request system storage cleanup dry-run`. This is a safe first step on any device you are not familiar with.",
   "Running cleanup before a software upgrade is a common best practice, since the new package must be copied to the device and then expanded during installation. After cleanup, run `show system storage` again to confirm you have enough room.",
   "Be careful with manual deletes. `file delete` removes a file immediately without a recycle bin. Do not delete files you do not understand, especially in configuration directories. The cleanup command is the preferred method because it only targets files the system considers safe to remove."
  ],
  "terms": [
   [
    "file list",
    "Lists files in a directory; `detail` adds size, owner and date."
   ],
   [
    "file show",
    "Displays the contents of a text file from the CLI."
   ],
   [
    "request system storage cleanup",
    "Removes rotated logs, crash files and temporary files after showing the list and asking for confirmation."
   ],
   [
    "dry-run",
    "A cleanup option that shows which files would be deleted without deleting them."
   ]
  ],
  "example": "Before upgrading a branch router, an engineer runs `show system storage` and sees /var at 93 percent. `request system storage cleanup dry-run` shows old log archives and a leftover package from the last upgrade. She runs the cleanup for real, confirms the space is freed and then copies the new package to /var/tmp.",
  "tip": "Use `dry-run` to preview a cleanup. Know the directories: logs in /var/log, packages usually staged in /var/tmp, and user files in the home directory where `save` writes by default.",
  "check": [
   [
    "How do you see which files a storage cleanup would remove without deleting them?",
    "`request system storage cleanup dry-run`."
   ],
   [
    "Which command displays the contents of a saved configuration file?",
    "`file show <path>`, for example `file show /var/tmp/backup.conf`."
   ]
  ]
 },
 {
  "t": "Software installation and upgrades with `request system software add`; snapshots",
  "body": [
   "Upgrading Junos is a routine but high-stakes task. A careful process minimizes the risk of ending up with a device that does not boot or does not support your configuration. The general steps are the same on most platforms, even though package names and some options differ by product line, so always read the release notes for your specific device and version.",
   "First, prepare. Check the current version with `show version`, confirm the target release supports your hardware and features, save a copy of the configuration off the device, and make sure there is enough storage with `show system storage` and `request system storage cleanup`. Then copy the package to the device, usually into `/var/tmp`, using `file copy` from an FTP, SCP or HTTP server, or by uploading it with SCP from your workstation.",
   "Second, install. The command is `request system software add` followed by the package path, typically with the `reboot` option so the new software is activated right away:",
   "```\nuser@R1> request system software add /var/tmp/<package-name>.tgz reboot\n```",
   "By default, Junos validates your current configuration against the new software before installing, and it stops if the configuration would not commit. This protects you from booting into a release that rejects your configuration. You may see options such as `validate` and `no-validate`; skipping validation removes that safety net and should be done only when you understand why. Without `reboot`, the package is staged and becomes active on the next reboot. On some platforms, `request system software rollback` returns to the previously installed software if the upgrade causes problems.",
   "Third, verify. After the reboot, use `show version` to confirm the new release, then check alarms, interfaces, routing protocol neighbors and the logs for errors.",
   "Snapshots protect you against boot media problems. A snapshot copies the running software and configuration to another storage device or partition, often called the alternate or backup media. If the primary media fails or becomes corrupted, the device can boot from the alternate copy. The command is `request system snapshot`, with platform-dependent options such as selecting the media or the alternate slice, and you check the result with `show system snapshot`. A good practice is to take a snapshot only after you have confirmed the new software is stable, so the backup copy is a known-good one. Some systems raise an alarm if they booted from backup media, which is a signal to repair the primary.",
   "On devices with two Routing Engines, upgrades are done on each RE, and features like graceful switchover can reduce downtime, but the basic command remains `request system software add`."
  ],
  "terms": [
   [
    "request system software add",
    "The operational command that installs a Junos software package, optionally with `reboot` to activate it immediately."
   ],
   [
    "Configuration validation",
    "A check during installation that confirms the current configuration is compatible with the new software."
   ],
   [
    "request system snapshot",
    "Copies the current software and configuration to alternate boot media as a backup."
   ],
   [
    "show version",
    "Displays the hostname, model and installed Junos software version."
   ]
  ],
  "example": "An operations team plans a Junos upgrade on a core router. They save the configuration to a server, clean storage, copy the package to /var/tmp, and run `request system software add /var/tmp/<package>.tgz reboot` in a maintenance window. After verifying neighbors and alarms for a day, they run `request system snapshot` so the backup media also holds the new, proven release.",
  "tip": "The install command is `request system software add`; add `reboot` to activate it immediately. Snapshots copy software and configuration to alternate media, so take them after the new release has proven stable.",
  "check": [
   [
    "What happens by default if your configuration is not compatible with the new software during installation?",
    "Validation fails and the installation stops, protecting you from booting with an unusable configuration."
   ],
   [
    "When is the best time to run `request system snapshot` after an upgrade?",
    "After you have verified that the new software and configuration work correctly, so the backup is known good."
   ]
  ]
 },
 {
  "t": "Rebooting, halting and powering off safely: `request system reboot`, `halt`, `power-off`",
  "body": [
   "A Junos device runs a full operating system with file systems that are being written to constantly. Pulling the power cord without warning risks corrupting those file systems, which can leave the device unable to boot. Junos therefore provides commands to shut down in an orderly way: processes stop, files are closed and disks are synchronized before anything turns off.",
   "`request system reboot` performs a graceful restart. The device shuts down its software cleanly and boots again. You are asked to confirm before it proceeds. You can schedule it with `at`, for example `request system reboot at 23:00`, or delay it with `in 10` for ten minutes. A pending scheduled reboot can be cancelled with `clear system reboot`. On systems with two Routing Engines, options such as `both-routing-engines` or `other-routing-engine` control which RE is restarted. Rebooting interrupts all traffic through the device on most single-RE platforms, so schedule it in a maintenance window.",
   "`request system halt` stops the software gracefully but leaves the hardware powered on. The device ends at a boot-loader prompt on the console, waiting. To bring it back you typically press a key on the console to boot, or power-cycle it. Halt is the right choice when you need to physically remove power afterwards, for example to move a device, because the file systems are already safely closed when you pull the cord.",
   "`request system power-off` shuts the software down gracefully and then turns the power off, on hardware that supports software-controlled power. The device stays off until someone physically powers it on again, so be very careful using it on a remote device you cannot reach.",
   "```\nuser@R1> request system reboot in 5 message \"Maintenance reboot\"\nReboot the system in 5 minutes? [yes,no] (no) yes\nuser@R1> clear system reboot\n```",
   "The `message` option broadcasts a notice to other logged-in users so they are not surprised. After any reboot, `show system uptime` tells you when the system booted, and `show chassis routing-engine` shows the last reboot reason, which is useful for confirming whether a restart was planned or caused by a fault.",
   "A simple way to remember the three: reboot comes back on its own, halt stops and waits with power on, and power-off stops and turns the power off. On dual-RE systems, the commands apply to the RE you are logged into unless you specify otherwise."
  ],
  "terms": [
   [
    "request system reboot",
    "Gracefully shuts down and restarts the device, optionally at a scheduled time."
   ],
   [
    "request system halt",
    "Gracefully stops the software while leaving power on, so the device can be safely unplugged or restarted from the console."
   ],
   [
    "request system power-off",
    "Gracefully shuts down and powers off the device; it stays off until powered on physically."
   ],
   [
    "clear system reboot",
    "Cancels a pending scheduled reboot."
   ]
  ],
  "example": "A technician needs to move a branch router to a new rack. The engineer on the console runs `request system halt`, waits for the boot-loader prompt that shows the system has stopped, and tells the technician it is safe to unplug the power. After the move, the router boots normally with no file system repair.",
  "tip": "Know the outcome of each command: reboot restarts automatically, halt stops but stays powered, power-off turns the power off. Never pull power from a running device without halting first.",
  "check": [
   [
    "You want to physically unplug a router safely. Which command do you run first?",
    "`request system halt` (or `request system power-off`), so the file systems are closed before power is removed."
   ],
   [
    "How do you cancel a reboot you scheduled for tonight?",
    "`clear system reboot`."
   ]
  ]
 },
 {
  "t": "Root password recovery from the console using recovery (single-user) mode",
  "body": [
   "If nobody knows the root password and no other administrator account works, you can still regain control of a Junos device, but only with physical access to its console port. This is a deliberate design: the recovery procedure proves you are physically present, which is why console access and the room the device sits in must be protected. The exact prompts vary by platform and Junos generation, so treat this as the general flow and follow the documented procedure for your model.",
   "Step 1: Connect a terminal or laptop to the console port (typically 9600 baud, 8 data bits, no parity, 1 stop bit) and reboot or power-cycle the device. Step 2: Watch the boot messages and interrupt the normal boot at the loader. On many devices you see a prompt such as 'Hit [Enter] to boot immediately, or space bar for command prompt'; pressing the space bar gives you a loader prompt. On some newer platforms you instead choose a recovery or single-user entry from a boot menu.",
   "Step 3: Boot into single-user mode. At the classic loader prompt this is `boot -s`. The system starts with only the minimum services and then asks you to enter a full path name for a shell or 'recovery' for root password recovery. Step 4: Type `recovery`. Junos starts the management process and drops you into the CLI in operational mode as root, without asking for a password.",
   "```\nloader> boot -s\n...\nEnter full pathname of shell or 'recovery' for root password recovery or RETURN for /bin/sh: recovery\n...\nroot> configure\nroot# set system root-authentication plain-text-password\nNew password:\nRetype new password:\nroot# commit\nroot# exit\nroot> exit\n```",
   "Step 5: Enter configuration mode, set a new root password with `set system root-authentication plain-text-password`, and commit. This is a normal commit, so any other errors in the configuration must be resolved first. Step 6: Exit the CLI, and when prompted confirm that you want to reboot. The device boots normally with its existing configuration and the new root password. Only the root password changed; the rest of the configuration is untouched.",
   "From a security point of view this procedure is a reminder that physical access is powerful. You can make recovery harder with `set system ports console insecure`. When the console is marked insecure, entering single-user mode requires the root password, which blocks this recovery path. Use that setting only if you have another way to recover, because a forgotten password on a device with an insecure console may require a much more disruptive reset. Other controls include locked racks, console servers with their own authentication and logging of console access.",
   "Finally, store root and emergency credentials in a proper password vault so recovery is rarely needed, and change them when staff leave."
  ],
  "terms": [
   [
    "Single-user mode",
    "A minimal boot state, entered from the loader (for example with `boot -s`), used for recovery tasks."
   ],
   [
    "recovery",
    "The keyword typed at the single-user prompt to start the Junos CLI as root for password recovery."
   ],
   [
    "root-authentication",
    "The `system` configuration statement that holds the root user's password; it must be set before any commit."
   ],
   [
    "console insecure",
    "A `system ports console` setting that requires the root password to enter single-user mode, blocking console password recovery."
   ]
  ],
  "example": "A small company's only network engineer leaves without handing over the firewall's root password. A consultant visits the site, connects to the console, reboots, interrupts the loader, boots into single-user mode, types `recovery`, sets a new root password and commits. After a reboot the device runs normally with its original configuration.",
  "tip": "Password recovery requires physical console access and ends with a normal commit of the new root password. Marking the console `insecure` prevents this recovery method.",
  "check": [
   [
    "What must you type at the single-user prompt to reach the Junos CLI for password recovery?",
    "`recovery`."
   ],
   [
    "Which setting would stop someone with console access from using this recovery procedure?",
    "`set system ports console insecure`, which makes single-user mode require the root password."
   ],
   [
    "Does password recovery erase the rest of the configuration?",
    "No. Only the root password is changed; the existing configuration is kept."
   ]
  ]
 },
 {
  "t": "Saving and restoring a rescue configuration",
  "body": [
   "A rescue configuration is your personal known-good fallback. It is typically a minimal configuration that is guaranteed to give you management access to the device: the root password, a management interface address, a default route, SSH and maybe a login account. Its job is not to run the full network; its job is to let you get back in when everything else has gone wrong.",
   "You create it from operational mode by saving the currently active configuration: `request system configuration rescue save`. Junos stores it in a dedicated file (on most platforms under /config as rescue.conf.gz). Because it is saved from the active configuration, the common approach is either to save it when the device is in a clean, stable state or to commit a trimmed-down management configuration, save it as rescue, and then load the full configuration. You can view it with `show system configuration rescue`.",
   "```\nuser@R1> request system configuration rescue save\nuser@R1> show system configuration rescue | match root-authentication\nuser@R1> request system configuration rescue delete\n```",
   "To restore it, enter configuration mode and type `rollback rescue`. Like every rollback, this only loads the rescue configuration into the candidate, and you must commit to make it active. The rescue configuration does not age out like rollback numbers 1 to 49; new commits do not replace it. It changes only when you save a new one or delete it with `request system configuration rescue delete`.",
   "Many Junos devices raise a minor system alarm, 'Rescue configuration is not set', when none exists. Some smaller platforms, such as certain branch SRX and EX devices, also let you load the rescue configuration with the physical Config or Reset button on the front panel. The exact button behavior varies by model, but it lets someone on site restore access without logging in.",
   "How does it differ from the numbered rollbacks? Rollbacks are automatic and relative: rollback 1 is always the configuration before the last commit, whatever it was. The rescue configuration is manual and absolute: it is whatever you decided was safe. After a long sequence of changes where you are not sure which rollback was the last working one, the rescue configuration gives you a known starting point.",
   "Keep it current. If you change the management address, the admin accounts or the root password, save a new rescue configuration too, or the fallback may not actually let you in when you need it."
  ],
  "terms": [
   [
    "request system configuration rescue save",
    "Saves the current active configuration as the rescue configuration."
   ],
   [
    "rollback rescue",
    "Loads the rescue configuration into the candidate; a commit activates it."
   ],
   [
    "request system configuration rescue delete",
    "Removes the saved rescue configuration."
   ],
   [
    "Rescue alarm",
    "A minor system alarm raised on many devices when no rescue configuration has been saved."
   ]
  ],
  "example": "After a long evening of firewall and routing changes, an engineer loses SSH access to a remote router but can still reach it through an out-of-band console server. Unsure which rollback is safe, she types `configure`, `rollback rescue` and `commit`. The router returns to its minimal management configuration, and she rebuilds the production changes carefully from a saved file.",
  "tip": "Saving is an operational-mode `request` command, but restoring is `rollback rescue` in configuration mode followed by commit. A missing rescue configuration shows up in `show system alarms`.",
  "check": [
   [
    "Which command saves the rescue configuration?",
    "`request system configuration rescue save` in operational mode."
   ],
   [
    "After typing `rollback rescue`, is the rescue configuration active?",
    "Not until you commit; rollback only loads it into the candidate."
   ]
  ]
 },
 {
  "t": "NTP, SNMP and remote syslog for ongoing operations",
  "body": [
   "Configuring NTP, SNMP and syslog once is only the start. In daily operations you need to confirm they are working, keep them secure and use them to spot problems before users do. This lesson focuses on verifying and using these services.",
   "For NTP, the key verification commands are `show ntp associations` and `show ntp status`. The associations output lists each configured server with its stratum, reachability and offset. An asterisk (`*`) in front of a server means the device is synchronized to it. If no server has an asterisk, the clock is not synchronized, perhaps because the server is unreachable, a firewall filter blocks UDP port 123 or the clock was too far off. `show system uptime` shows the current time. Configure at least two or three servers for redundancy, and use `source-address` if the servers only accept requests from certain addresses. NTP authentication keys can be added so the device only trusts genuine time sources.",
   "```\nuser@R1> show ntp associations\n     remote           refid      st t when poll reach   delay   offset  jitter\n==============================================================================\n*192.0.2.10      .GPS.            1 u   33   64  377    1.022    0.114   0.050\n 192.0.2.11      192.0.2.10       2 u   40   64  377    1.305    0.240   0.071\n```",
   "For SNMP, the device runs an agent that answers polls (get requests) from a network management system and sends traps when events occur, such as a link going down or a chassis alarm. Polls are authorized by community strings in SNMPv2c or by users with authentication and privacy (encryption) settings in SNMPv3. Traps are defined with `set snmp trap-group <name> targets <address>` and a list of categories. `show snmp statistics` shows counts of requests, responses and traps, which helps prove whether the monitoring system is actually reaching the device. Restrict access with `clients` lists and read-only authorization, and protect the Routing Engine with a firewall filter that only allows SNMP from the monitoring servers.",
   "For remote syslog, `set system syslog host <address> <facility> <severity>` sends events to a central server over UDP port 514 by default. Central logging matters because local logs rotate and are lost if the device fails, and because a security team needs events from all devices in one place to correlate incidents. Useful options include `source-address` so logs always come from the loopback address, and `structured-data` for a more machine-readable format. Pairing remote syslog with accurate NTP time is what makes the logs trustworthy.",
   "A good operational habit is a periodic check: are NTP servers synchronized, is the monitoring system still polling (SNMP counters increasing), and are recent events arriving at the log server? A quiet log server might mean everything is fine, or that the device stopped sending."
  ],
  "terms": [
   [
    "show ntp associations",
    "Lists NTP servers with stratum, reachability and offset; `*` marks the server the device is synchronized to."
   ],
   [
    "SNMP trap",
    "An unsolicited message from the device's SNMP agent to a management system about an event."
   ],
   [
    "SNMPv3",
    "A version of SNMP that adds user-based authentication and encryption."
   ],
   [
    "source-address",
    "An option for services such as syslog and NTP that fixes the source IP of outgoing packets, often to the loopback."
   ]
  ],
  "example": "A security analyst notices a gap in firewall logs from one site. The network engineer checks the router and finds `show ntp associations` has no `*` and the syslog host is configured, but a new lo0 filter is blocking return NTP traffic. After permitting NTP in the filter, the clock synchronizes and logs with accurate timestamps resume at the central server.",
  "tip": "An asterisk in `show ntp associations` means synchronized. SNMP polls are answered by the agent, traps are pushed by it; SNMPv3 adds authentication and encryption that v2c lacks.",
  "check": [
   [
    "How can you tell from `show ntp associations` that the device is synchronized?",
    "One server is marked with an asterisk (`*`)."
   ],
   [
    "Why send syslog to a remote server instead of relying only on local files?",
    "Local logs rotate and can be lost with the device, and central logs allow correlation across many devices."
   ],
   [
    "Which SNMP version provides encryption?",
    "SNMPv3."
   ]
  ]
 },
 {
  "t": "Packet forwarding decisions: longest-prefix match, next hops, active vs inactive routes (`*`)",
  "body": [
   "A router's core job is to decide, for every packet, where to send it next. Junos makes that decision in two stages. The Routing Engine collects routes from all sources (directly connected interfaces, static configuration and routing protocols) into routing tables and picks the best route for each destination prefix. Those best routes are copied into the forwarding table, which the Packet Forwarding Engine (PFE) uses to forward packets at high speed.",
   "When a packet arrives, the forwarding decision uses longest-prefix match. The router compares the destination address with all prefixes in the forwarding table and picks the most specific one that contains it, meaning the one with the longest prefix length. Suppose the table has 0.0.0.0/0, 10.0.0.0/8 and 10.1.1.0/24. A packet to 10.1.1.7 matches all three, but /24 is the longest, so that route wins. A packet to 10.2.3.4 matches the /8 and the default route and uses the /8. A packet to 8.8.8.8 matches only the default route. Longest match always wins over route preference or metric, because those only compare routes to the same prefix.",
   "Each route points to a next hop: the neighboring router's address and the outgoing interface. There are also special next hops. A local route (/32 for the device's own address) sends packets up to the Routing Engine. A discard next hop drops packets silently, and a reject next hop drops them and sends an ICMP unreachable message. When several equal next hops exist, a route can list more than one.",
   "Now the active versus inactive idea. For a single prefix, Junos may learn several routes, for example a static route and an OSPF route to 10.5.0.0/16. Only one of them becomes the active route, chosen mainly by route preference (lower is better) and then by tie-breakers such as metric. The active route is the only one placed in the forwarding table. In `show route` output, the active route is marked with an asterisk `*`. You may also see `+` for the active route and `-` for the previously active route, which appear in the legend line at the top of the output.",
   "```\nuser@R1> show route 10.5.0.0/16\ninet.0: 12 destinations, 13 routes (12 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n10.5.0.0/16  *[Static/5] 00:12:40\n              >  to 10.1.12.2 via ge-0/0/1.0\n              [OSPF/10] 00:03:11, metric 20\n              >  to 10.1.13.2 via ge-0/0/2.0\n```",
   "Inactive routes are not useless; they are backups. If the active route disappears, the next-best route for that prefix becomes active and is installed in the forwarding table. The `>` symbol marks the next hop actually selected when a route has more than one. To see exactly what the PFE is using, run `show route forwarding-table destination 10.5.1.1`."
  ],
  "terms": [
   [
    "Longest-prefix match",
    "The forwarding rule that chooses the most specific matching prefix for a destination address."
   ],
   [
    "Next hop",
    "The neighboring address and outgoing interface to which a packet is sent."
   ],
   [
    "Active route",
    "The single best route for a prefix, marked `*` in `show route`, and the only one installed in the forwarding table."
   ],
   [
    "Forwarding table",
    "The table built from active routes that the Packet Forwarding Engine uses to forward packets."
   ]
  ],
  "example": "A router has a default route to an ISP and a static route for 172.16.0.0/12 to a partner. A server sends traffic to 172.16.40.9. Even though the default route also matches, the /12 is more specific, so the packet goes to the partner. Traffic to any public address falls through to the default route.",
  "tip": "Longest match is decided first; preference only chooses among routes to the exact same prefix. The `*` marks the active route and `>` marks the selected next hop.",
  "check": [
   [
    "A router has routes to 10.0.0.0/8 (static) and 10.20.0.0/16 (OSPF). Which is used for 10.20.5.5?",
    "The /16 learned from OSPF, because longest-prefix match beats preference."
   ],
   [
    "What does an asterisk before a route in `show route` mean?",
    "It is the active route for that prefix and is installed in the forwarding table."
   ],
   [
    "What happens to an inactive route when the active route is withdrawn?",
    "It can become the new active route and be installed in the forwarding table."
   ]
  ]
 },
 {
  "t": "Routing tables: inet.0, inet6.0, inet.3, and instance tables such as vr1.inet.0",
  "body": [
   "Junos does not keep all routes in one table. It keeps separate routing tables for different address families and purposes, each with a name that tells you what it holds. Knowing the names helps you read `show route` output and understand why a route appears in one place but not another.",
   "`inet.0` is the main IPv4 unicast routing table. Directly connected networks, static routes, OSPF, RIP and BGP IPv4 routes all go here by default, and it is the table used to forward normal IPv4 traffic. When you run `show route` without options, most of what you see is inet.0.",
   "`inet6.0` is the IPv6 unicast table. IPv6 connected, static and dynamic routes (OSPFv3, BGP with IPv6, and so on) are stored here. You view it with `show route table inet6.0`.",
   "`inet.3` holds IPv4 routes to the egress points of MPLS (Multiprotocol Label Switching) label-switched paths, typically the loopback addresses of other routers reachable by an LSP. It is not used to forward ordinary IP packets directly. Instead, BGP uses it when resolving next hops: if a BGP next hop is reachable through an LSP in inet.3, traffic for that BGP route is sent over the MPLS tunnel. You will meet it more in later certifications, but you should recognize the name. Other tables you may see include `mpls.0` for label-switching entries, `inet.1` for the multicast forwarding cache and `inet.2` for multicast reverse-path checks.",
   "Routing instances get their own tables. Their names follow the pattern instance-name dot family dot number. An instance called `vr1` has `vr1.inet.0` for IPv4 and `vr1.inet6.0` for IPv6. Interfaces placed in that instance, and routes configured or learned in it, appear only in its tables, not in the main inet.0. This separation is what lets you run multiple independent routing domains on one device.",
   "```\nuser@R1> show route table vr1.inet.0\nvr1.inet.0: 3 destinations, 3 routes (3 active, 0 holddown, 0 hidden)\n192.168.50.0/24    *[Direct/0] 01:02:03\n                    >  via ge-0/0/3.0\n192.168.50.1/32    *[Local/0] 01:02:03\n                       Local via ge-0/0/3.0\n```",
   "The header line of each table shows destinations, routes and counts of active, holddown and hidden routes. Hidden routes are ones Junos cannot use, for example because the next hop cannot be resolved or a policy rejected them; you can see them with `show route hidden`. `show route summary` gives a quick count of routes per table and per protocol, which is a good way to see at a glance which tables exist on a device."
  ],
  "terms": [
   [
    "inet.0",
    "The main IPv4 unicast routing table."
   ],
   [
    "inet6.0",
    "The IPv6 unicast routing table."
   ],
   [
    "inet.3",
    "An IPv4 table of MPLS LSP egress addresses used mainly for BGP next-hop resolution."
   ],
   [
    "Instance table",
    "A routing table belonging to a routing instance, named like `vr1.inet.0`."
   ]
  ],
  "example": "An engineer puts a guest Wi-Fi interface into a virtual-router instance called GUEST. Guests' routes appear in GUEST.inet.0 and never mix with the corporate routes in inet.0. When she needs to test from the guest side, she runs `ping 8.8.8.8 routing-instance GUEST` so the ping uses the instance table.",
  "tip": "Learn the naming pattern: family (inet or inet6) plus a number, with instance tables prefixed by the instance name. inet.3 is for MPLS next-hop resolution, not ordinary IP forwarding.",
  "check": [
   [
    "Which table stores IPv6 unicast routes?",
    "inet6.0."
   ],
   [
    "What table would hold IPv4 routes for a routing instance named CUST-A?",
    "CUST-A.inet.0."
   ],
   [
    "What command gives a quick count of routes in every table?",
    "`show route summary`."
   ]
  ]
 },
 {
  "t": "Route preference values: direct/local 0, static 5, OSPF internal 10, RIP 100, aggregate/generated 130, OSPF external 150, BGP 170",
  "body": [
   "When Junos learns more than one route to exactly the same prefix from different sources, it must pick one to make active. The first and most important criterion is route preference, a number assigned to each routing source. Other vendors call the same idea administrative distance. The rule is simple: the lower the preference, the more the route is trusted, so the lower value wins.",
   "The default values you need to know are: Direct and Local routes 0; Static 5; OSPF internal routes 10; RIP 100; Aggregate and Generated routes 130; OSPF external (AS external) routes 150; and BGP 170, for both internal and external BGP. IS-IS internal routes also exist with values between OSPF and RIP (15 for Level 1 and 18 for Level 2), but the list above is the core of the exam objective.",
   "The ordering reflects trust. Directly connected networks are facts, so they get 0. A static route is a deliberate instruction from an administrator, so it gets 5. OSPF internal routes are learned inside your own network with full topology knowledge, so they rank next. RIP is older and less precise. Aggregate routes are summaries you create. OSPF external routes are routes that were redistributed into OSPF from elsewhere, so they are trusted less than internal ones. BGP routes typically come from outside your network, so they have the highest default value.",
   "Remember that preference only compares routes to the same prefix. It never overrides longest-prefix match. If you have a static route to 10.0.0.0/8 (preference 5) and a BGP route to 10.1.0.0/16 (preference 170), both are active in their own right, and a packet to 10.1.2.3 uses the more specific BGP route.",
   "```\n10.5.0.0/16  *[Static/5] 00:12:40\n              >  to 10.1.12.2 via ge-0/0/1.0\n              [OSPF/150] 00:03:11, metric 20, tag 0\n              >  to 10.1.13.2 via ge-0/0/2.0\n```",
   "In `show route`, the preference is shown in brackets next to the protocol, such as `[Static/5]` or `[OSPF/150]`, which tells you the OSPF route above is an external one. If preference ties, Junos moves on to tie-breakers, such as the protocol metric.",
   "You can change preference. A static route can be given `preference 200` so that it loses to a dynamic route and only takes over when the dynamic route disappears, which is called a floating static route. OSPF allows `preference` and `external-preference` settings, and routing policy can set preference with the `then preference` action. Changing defaults should be done deliberately and consistently, because it changes which path every packet takes."
  ],
  "terms": [
   [
    "Route preference",
    "A number assigned to each route source in Junos; for the same prefix the lowest value becomes active."
   ],
   [
    "OSPF internal route",
    "A route learned from within the OSPF domain, with default preference 10."
   ],
   [
    "OSPF external route",
    "A route redistributed into OSPF from another source, with default preference 150."
   ],
   [
    "Floating static route",
    "A static route with a raised preference so it is used only when a better route is missing."
   ]
  ],
  "example": "A router learns 172.20.0.0/16 by OSPF from inside the network (preference 10) and the same prefix by BGP from a partner (preference 170). The OSPF route is active and traffic stays on the internal path. When the internal link fails and the OSPF route disappears, the BGP route becomes active automatically.",
  "tip": "Memorize the list in order: 0, 5, 10, 100, 130, 150, 170. The classic trap is comparing OSPF external (150) with RIP (100): RIP wins. Another trap is forgetting that longest match comes before preference.",
  "check": [
   [
    "A prefix is learned via RIP and as an OSPF external route. Which is active by default?",
    "RIP, with preference 100, beats OSPF external at 150."
   ],
   [
    "What is the default preference of both internal and external BGP routes in Junos?",
    "170."
   ],
   [
    "What does `[Static/5]` in `show route` output mean?",
    "The route came from a static route and has preference 5."
   ]
  ]
 },
 {
  "t": "Routing instances: virtual-router, forwarding and VRF types",
  "body": [
   "A routing instance is a separate collection of routing tables, interfaces and routing protocol settings inside a single Junos device. By default everything lives in the master (default) instance, which uses inet.0 and inet6.0. Additional instances let you run independent routing domains side by side, with their own tables such as `vr1.inet.0`. The kind of separation you get depends on the `instance-type` you choose.",
   "The virtual-router type is the simplest way to split a device into several independent routers. You assign interfaces to it, and you can run static routes and protocols such as OSPF or BGP inside it. Its routes stay in its own table and do not mix with the default instance unless you deliberately leak them. There is no MPLS VPN signaling involved. Typical uses are separating guest and corporate traffic, isolating a management network, or building a lab with several routers on one box.",
   "```\nset routing-instances vr1 instance-type virtual-router\nset routing-instances vr1 interface ge-0/0/3.0\nset routing-instances vr1 routing-options static route 0.0.0.0/0 next-hop 192.168.50.254\n```",
   "The forwarding type is used for filter-based forwarding (FBF), also called policy-based routing. A forwarding instance has its own routing table but no interfaces of its own. A firewall filter on an incoming interface matches certain traffic (for example, by source address) and uses the `routing-instance` action to send it to the forwarding instance, which then looks the packet up in its own table. This lets you send traffic from one department out a different ISP than the rest of the network, even though the destination is the same. To make interface routes available to the forwarding instance's table, FBF designs usually share them using a RIB group.",
   "The vrf type (VPN routing and forwarding) is used by service providers for Layer 3 VPNs over MPLS. Like a virtual router, it has its own interfaces and routing table, but it also requires a route distinguisher, which makes each customer's prefixes unique across the provider network, and a VRF target (route target) community or import and export policies, which control which VPN routes are shared between sites via BGP. Multiple customers can use the same private addresses without conflict because each lives in its own VRF.",
   "You work with instances using `show route table vr1.inet.0`, `show route instance` (which lists instances and their tables), and test commands with the `routing-instance` option, such as `ping 8.8.8.8 routing-instance vr1`. Remember that an interface can belong to only one instance at a time. Other instance types exist, for Layer 2 VPNs and virtual switches for example, but the three above are the ones associated with Layer 3 routing at this level."
  ],
  "terms": [
   [
    "virtual-router",
    "An instance type with its own interfaces and routing table, used to create independent routers on one device without VPN signaling."
   ],
   [
    "forwarding instance",
    "An instance type with a routing table but no interfaces, used with firewall filters for filter-based forwarding."
   ],
   [
    "VRF",
    "VPN routing and forwarding instance type used for MPLS Layer 3 VPNs, requiring a route distinguisher and VRF target or policies."
   ],
   [
    "Route distinguisher",
    "A value added to VPN prefixes to keep overlapping customer addresses unique in the provider network."
   ]
  ],
  "example": "A hotel router must keep guest traffic away from its property management systems. The engineer places the guest-facing VLAN interface into a virtual-router instance with its own default route to a separate internet circuit. Guests can browse the web, but no route exists between the guest table and inet.0, so they cannot reach internal systems.",
  "tip": "Match the type to the use: virtual-router for simple separation, forwarding for filter-based forwarding (no interfaces), vrf for MPLS Layer 3 VPNs with route distinguishers and targets.",
  "check": [
   [
    "Which instance type has no interfaces and is used with firewall filters to steer traffic?",
    "The forwarding instance type, used for filter-based forwarding."
   ],
   [
    "What two things does a VRF need that a virtual router does not?",
    "A route distinguisher and a VRF target (or VRF import/export policies)."
   ],
   [
    "How do you ping using a routing instance's table?",
    "`ping <address> routing-instance <name>`."
   ]
  ]
 },
 {
  "t": "Static routes: `routing-options static`, next-hop, qualified-next-hop with preference (floating routes), discard and reject",
  "body": [
   "A static route is a route you configure by hand. It does not adapt to failures on its own the way a routing protocol does, but it is simple, predictable and uses no protocol overhead. Static routes are common for default routes to an ISP, for stub sites with a single uplink and for backup paths. In Junos they live under `routing-options static` for the default instance, or under `routing-instances <name> routing-options static` for an instance. The basic form names a prefix and a next hop, as shown below.",
   "```\nset routing-options static route 0.0.0.0/0 next-hop 203.0.113.1\nset routing-options static route 10.50.0.0/16 next-hop 10.1.12.2\n```",
   "By default the next-hop address must be on a directly connected subnet. If it is not reachable through a directly connected interface, the route stays inactive (hidden) because Junos cannot resolve which interface to use. If you really need a next hop several hops away, the `resolve` option lets Junos resolve it through other routes, but directly connected next hops are the normal case. Static routes have a default preference of 5. You can list several `next-hop` statements for the same route; they are treated as equal-cost next hops. A qualified next hop, by contrast, lets you give different next hops for the same route their own preference (and metric). This is how you build a primary and backup path inside one static route:",
   "```\nset routing-options static route 0.0.0.0/0 next-hop 203.0.113.1\nset routing-options static route 0.0.0.0/0 qualified-next-hop 198.51.100.1 preference 7\n```",
   "Here the plain next hop uses preference 5 and is preferred. If the interface toward 203.0.113.1 goes down, that next hop becomes unusable and the qualified next hop with preference 7 takes over. A floating static route is the same idea applied between a static route and a dynamic protocol: you give the static route a preference higher than the protocol's, for example `set routing-options static route 10.50.0.0/16 next-hop 10.9.9.2 preference 200`. OSPF (10 or 150) and even BGP (170) then win while they are available, and the static route floats up to active only when the dynamic route disappears.",
   "Instead of a next hop, a static route can point to special actions. `discard` silently drops matching packets. `reject` drops them and returns an ICMP destination unreachable message to the sender. Both are useful for blackholing traffic, for example for a summary prefix you advertise so that packets to unused parts of it are dropped rather than looping, or to stop traffic to a bad destination. Discard is usually preferred facing the internet because it does not generate ICMP messages an attacker could use or that add load.",
   "Verify with `show route protocol static` and check that the route has the `*` for active. Other options you may see include `no-readvertise`, which keeps the route from being exported by routing policy, and `retain`, which keeps it in the forwarding table if the routing process restarts."
  ],
  "terms": [
   [
    "next-hop",
    "The directly connected address a static route forwards to; if unreachable, the route is not usable."
   ],
   [
    "qualified-next-hop",
    "A next hop within a static route that has its own preference or metric, used for backup paths."
   ],
   [
    "Floating static route",
    "A static route with a preference higher than a dynamic route, so it becomes active only when the dynamic route is gone."
   ],
   [
    "discard vs reject",
    "Both drop matching packets; reject also sends an ICMP unreachable message, discard stays silent."
   ]
  ],
  "example": "A branch router has a fiber link to the main ISP and a cheaper LTE link. The engineer configures a default route with `next-hop` pointing to the fiber gateway and a `qualified-next-hop` to the LTE gateway with preference 7. When the fiber interface goes down, the default route immediately uses LTE, and it moves back when the fiber recovers.",
  "tip": "A static next hop must normally be directly connected, or the route will not become active. A higher preference makes a route a backup, and reject differs from discard only by sending an ICMP unreachable.",
  "check": [
   [
    "You configure a static route whose next hop is on a remote network, and it does not appear as active. Why?",
    "Junos requires the next hop to be directly reachable by default; without `resolve` the next hop cannot be resolved."
   ],
   [
    "How do you make a static route that is used only if OSPF loses its route to the same prefix?",
    "Give the static route a preference higher than OSPF's, such as `preference 200`, creating a floating static route."
   ],
   [
    "What is the difference between discard and reject?",
    "Both drop traffic; reject sends an ICMP unreachable to the source, discard drops silently."
   ]
  ]
 },
 {
  "t": "Default routes and summarization (aggregate routes)",
  "body": [
   "A default route, written 0.0.0.0/0 for IPv4 and ::/0 for IPv6, matches every destination because its prefix length is zero. Thanks to longest-prefix match, it is used only when no more specific route exists. That makes it the classic way to send all unknown traffic toward an internet provider or a core router. You can create it as a static route (`set routing-options static route 0.0.0.0/0 next-hop 203.0.113.1`), learn it from a routing protocol, or advertise it into OSPF with an export policy so other routers learn it.",
   "Summarization is the opposite idea: instead of sending many specific routes, you advertise one broader prefix that covers them. If a site uses 10.20.0.0/24 through 10.20.255.0/24, you can advertise just 10.20.0.0/16. Summarization makes routing tables smaller, reduces the work routers do when a single subnet flaps (because the summary stays stable) and hides internal detail from neighbors.",
   "In Junos, a summary is created with an aggregate route under `routing-options aggregate`:",
   "```\nset routing-options aggregate route 10.20.0.0/16\nuser@R1> show route 10.20.0.0/16 exact detail\n```",
   "An aggregate route becomes active only when at least one contributing route exists. A contributing route is any active route that is more specific than the aggregate and falls inside it, such as 10.20.5.0/24. If all contributing routes disappear, the aggregate goes away too, so you do not advertise a summary for networks that are not reachable. `show route 10.20.0.0/16 exact detail` lists the contributing routes.",
   "The next hop of an aggregate route is reject by default. That can seem odd at first, but it makes sense. The router forwards packets for a specific subnet using the more specific contributing route, thanks to longest match. Packets that match only the aggregate are for unused parts of the range, and dropping them prevents routing loops, for example between you and a neighbor that has a default route pointing back at you. You can change the action to `discard` for silent drops. Aggregate routes have a default preference of 130.",
   "Creating an aggregate does not advertise it. You still need a routing policy that exports it into OSPF or BGP, for example a term matching `from protocol aggregate` and `route-filter 10.20.0.0/16 exact` with `then accept`. You often also want to stop the specific routes from being advertised, so only the summary goes out.",
   "Junos also has generated routes, configured under `routing-options generate`. They also depend on contributing routes and have preference 130, but instead of reject they take the next hop of the primary contributing route. Generated routes are often used to create a conditional default route that exists only while certain upstream routes are present."
  ],
  "terms": [
   [
    "Default route",
    "The route 0.0.0.0/0 (or ::/0) that matches any destination not covered by a more specific route."
   ],
   [
    "Aggregate route",
    "A summary route under `routing-options aggregate`, active only when a contributing route exists, with a reject next hop by default."
   ],
   [
    "Contributing route",
    "An active, more specific route that falls within an aggregate or generated route and keeps it active."
   ],
   [
    "Generated route",
    "A summary-like route that takes the next hop of its primary contributing route instead of reject."
   ]
  ],
  "example": "A regional office owns 10.20.0.0/16, split into dozens of /24 subnets. Its edge router creates an aggregate for 10.20.0.0/16 and exports only that into BGP toward the core. The core table holds one route instead of dozens, and when a single /24 flaps at the office, the core does not notice.",
  "tip": "An aggregate needs at least one contributing route to be active, uses preference 130, has reject as its default next hop and is not advertised until an export policy sends it out.",
  "check": [
   [
    "What must exist for an aggregate route to become active?",
    "At least one active, more specific contributing route within the aggregate's range."
   ],
   [
    "What happens to a packet that matches only the aggregate route and no contributing route?",
    "It is rejected (dropped with ICMP unreachable) by default, or silently discarded if configured with discard."
   ],
   [
    "How does a generated route differ from an aggregate route?",
    "A generated route uses the next hop of its primary contributing route instead of reject."
   ]
  ]
 },
 {
  "t": "Dynamic routing concepts: why IGPs and EGPs exist, OSPF and BGP at a high level",
  "body": [
   "Static routes work well for a handful of networks, but they do not scale and they do not react to failures on their own. Dynamic routing protocols let routers tell each other which networks they can reach, detect link failures and recalculate paths automatically. Protocols fall into two groups based on where they operate relative to an autonomous system (AS), which is a network under a single administrative control with its own routing policy, usually identified by an AS number.",
   "Interior gateway protocols (IGPs) run inside one AS. Their goal is to find the best path quickly within a network you control and trust. OSPF (Open Shortest Path First), IS-IS (Intermediate System to Intermediate System) and RIP (Routing Information Protocol) are IGPs. Exterior gateway protocols (EGPs) run between autonomous systems, where the priorities are different: scale to the size of the internet, enforce business policy (which neighbor you prefer, what you are willing to carry) and prevent loops between organizations. BGP (Border Gateway Protocol) is the EGP used on the internet.",
   "OSPF is a link-state protocol. Each router describes its own links in link-state advertisements (LSAs) and floods them to every router in the area. Every router then builds the same map of the network, the link-state database, and runs the SPF (shortest path first) algorithm, also called Dijkstra's algorithm, to compute the lowest-cost path to each destination. Cost is based on interface bandwidth by default. OSPF neighbors discover each other with hello packets, and they must agree on parameters such as area, hello and dead intervals and subnet to form an adjacency. For scale, OSPF divides a network into areas, with area 0 as the backbone that all other areas connect to. OSPF converges fast and is well suited to enterprise and service provider cores.",
   "```\nset protocols ospf area 0.0.0.0 interface ge-0/0/1.0\nset protocols ospf area 0.0.0.0 interface lo0.0 passive\nuser@R1> show ospf neighbor\n```",
   "BGP is a path-vector protocol. BGP speakers form sessions over TCP port 179, and each advertised route carries attributes, the most important being the AS path, which lists the autonomous systems the route has passed through. A router that sees its own AS in the path rejects the route, preventing loops. BGP sessions between different ASs are external BGP (EBGP); sessions within one AS are internal BGP (IBGP). BGP chooses routes through a sequence of attribute comparisons rather than a single metric, which gives operators fine-grained policy control. It is slower to converge than an IGP but can carry very large numbers of routes.",
   "In practice, the two work together. An IGP such as OSPF provides fast, internal reachability (including to other routers' loopback addresses), and BGP runs on top of it to exchange external and customer routes. In Junos, OSPF routes have preference 10 (internal) or 150 (external), and BGP routes have 170."
  ],
  "terms": [
   [
    "Autonomous system (AS)",
    "A network under one administrative control with its own routing policy, identified by an AS number."
   ],
   [
    "IGP",
    "Interior gateway protocol, such as OSPF, IS-IS or RIP, used within a single AS."
   ],
   [
    "EGP",
    "Exterior gateway protocol used between autonomous systems; BGP is the one used today."
   ],
   [
    "Link-state",
    "A protocol design, used by OSPF, where routers flood link information and each computes paths with SPF."
   ],
   [
    "AS path",
    "A BGP attribute listing the autonomous systems a route has crossed, used for loop prevention and path selection."
   ]
  ],
  "example": "A university runs OSPF across its campus so every building router quickly finds the best internal path and reroutes around a broken fiber in seconds. At the edge, it runs EBGP with two internet providers to announce its public prefixes and receive internet routes, using policy to prefer one provider for outbound traffic.",
  "tip": "IGP means inside one AS and is about fast, best-path convergence; EGP means between ASs and is about policy and scale. OSPF is link-state with SPF and areas; BGP is path-vector over TCP 179 with the AS path for loop prevention.",
  "check": [
   [
    "Is OSPF an IGP or an EGP, and what algorithm does it use?",
    "An IGP; it uses the SPF (Dijkstra) algorithm on its link-state database."
   ],
   [
    "What transport and port does BGP use?",
    "TCP port 179."
   ],
   [
    "How does BGP prevent routing loops between autonomous systems?",
    "A router rejects routes whose AS path already contains its own AS number."
   ]
  ]
 },
 {
  "t": "Reading `show route`, `show route detail`, `show route protocol`, `show route table`",
  "body": [
   "`show route` is the command you will use most when troubleshooting routing on Junos. Reading its output quickly and correctly is a core skill, and exam questions often show a snippet and ask what it means.",
   "```\nuser@R1> show route\ninet.0: 9 destinations, 10 routes (9 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n\n0.0.0.0/0          *[Static/5] 2d 03:11:20\n                    >  to 203.0.113.1 via ge-0/0/0.0\n10.1.12.0/30       *[Direct/0] 2d 03:11:25\n                    >  via ge-0/0/1.0\n10.1.12.1/32       *[Local/0] 2d 03:11:25\n                       Local via ge-0/0/1.0\n10.255.0.2/32      *[OSPF/10] 00:41:02, metric 1\n                    >  to 10.1.12.2 via ge-0/0/1.0\n```",
   "Start with the header. It names the table (inet.0) and gives counts: destinations (prefixes), routes (a prefix can have several), and how many are active, in holddown (being withdrawn) and hidden (unusable). Next is the legend for the symbols. Each route entry then shows the prefix, a `*` if it is active, the protocol and preference in brackets such as `[OSPF/10]`, how long the route has been known, the metric if any, and one or more next-hop lines. The `>` marks the next hop in use. A Direct route is the subnet on an interface, and a Local route is the device's own /32 address on that subnet.",
   "Filtering helps on real devices with thousands of routes. `show route 10.255.0.2` shows the best match for that address, while `show route 10.0.0.0/8 exact` shows only that exact prefix. `show route protocol ospf` (or static, bgp, direct, local, aggregate) shows only routes from that source, which is a quick way to check what a protocol is contributing. `show route table inet6.0` or `show route table vr1.inet.0` shows a specific table. `show route terse` shows a compact one-line-per-route view, and `show route hidden` lists routes Junos cannot use.",
   "`show route detail` (and the even longer `extensive`) explains why a route is what it is. For each route you see its preference, the next-hop type and interface, the State field (for example `<Active Int>` or `<Inactive reason>`), the Age, the Task that installed it, the metric, the announcement bits showing which protocols or processes use it, and for BGP routes attributes such as the AS path, local preference and communities. The Inactive reason is especially useful: it tells you why a route lost, for example to a route with better preference.",
   "For BGP specifically, `show route receive-protocol bgp <neighbor>` shows routes received from a neighbor and `show route advertising-protocol bgp <neighbor>` shows what you are sending. These let you check both sides of a policy.",
   "Get into the habit of reading each route in this order: is it active (`*`), where did it come from (protocol and preference), where does it go (`>` next hop and interface), and how long has it been there. A short age on an important route often reveals a flapping link."
  ],
  "terms": [
   [
    "Hidden route",
    "A route Junos knows but cannot use, often because its next hop is unresolvable or a policy rejected it; shown with `show route hidden`."
   ],
   [
    "Direct route",
    "A route to the subnet configured on an interface, with preference 0."
   ],
   [
    "Local route",
    "A /32 (or /128) route to the device's own interface address, with preference 0."
   ],
   [
    "show route detail",
    "Output that adds state, age, task, inactive reason and protocol attributes for each route."
   ]
  ],
  "example": "Users report that a remote site is unreachable for a few seconds every few minutes. `show route 10.44.0.0/16` shows the OSPF route with an age of only 00:00:37. Checking again later shows the age reset, so the route is flapping. The engineer checks `show interfaces extensive` on the link toward the site and finds carrier transitions increasing.",
  "tip": "Know every symbol: `*` active, `>` selected next hop, brackets show protocol/preference. Use `protocol` to filter by source, `table` to choose a table and `detail` to see why a route is inactive.",
  "check": [
   [
    "Which command shows only static routes?",
    "`show route protocol static`."
   ],
   [
    "In `show route` output, what does `[OSPF/10]` indicate?",
    "The route was learned from OSPF as an internal route with preference 10."
   ],
   [
    "Where would you look to see why a route is not active?",
    "`show route <prefix> detail` (or extensive), which shows the inactive reason."
   ]
  ]
 },
 {
  "t": "Routing policy uses: import (into the routing table) and export (out of the routing table)",
  "body": [
   "Routing policy is how you control which routes enter the routing table and which routes a device advertises to others. In Junos, every policy is applied in one of two directions, and the direction is always described from the point of view of the routing table.",
   "An import policy acts on routes coming from a routing protocol into the routing table. It decides which received routes are accepted and can change their attributes, such as preference, local preference, metric or communities, before they are installed. For example, you can reject a BGP neighbor's advertisement of a private prefix, or raise the local preference of routes from a preferred provider. Import policies are applied under the protocol, for example `set protocols bgp group ISP import FROM-ISP`.",
   "An export policy acts on routes going from the routing table out into a routing protocol, to be advertised to neighbors. It decides which active routes are advertised and can change attributes on the way out. Export policy is also how redistribution works in Junos: to advertise static, direct or aggregate routes into OSPF, you write a policy that matches them and accept them, and then apply it with `set protocols ospf export ADVERTISE-STATIC`. Without that export policy, those routes are not advertised.",
   "```\nset policy-options policy-statement ADVERTISE-STATIC term 1 from protocol static\nset policy-options policy-statement ADVERTISE-STATIC term 1 then accept\nset protocols ospf export ADVERTISE-STATIC\n```",
   "There is an important limitation for link-state protocols such as OSPF. Because every OSPF router must have the same link-state database, you cannot use import policy to block LSAs from being flooded or entering the database. OSPF import policy can only affect which OSPF external routes are installed into the local routing table. Export policy is how OSPF originates external routes into the domain. With BGP, a path-vector protocol, both import and export policies are very flexible.",
   "Policies can also be applied in other places. `routing-options forwarding-table export` applies a policy as routes go from the routing table to the forwarding table; the classic use is enabling load balancing across equal-cost paths with the `load-balance per-packet` action, which on modern hardware actually balances per flow. Policies are also used for route leaking between instances and for creating generated routes.",
   "A useful mental picture: the routing table sits in the middle. Protocols feed routes in through import policies and receive routes to advertise through export policies. If you remember that import means into the table and export means out of the table, you can place any policy correctly."
  ],
  "terms": [
   [
    "Import policy",
    "A routing policy applied to routes received from a protocol before they are placed in the routing table."
   ],
   [
    "Export policy",
    "A routing policy applied to active routes as they are advertised from the routing table into a protocol."
   ],
   [
    "Redistribution",
    "Advertising routes learned from one source into another protocol; in Junos this is done with export policy."
   ],
   [
    "policy-statement",
    "The named routing policy object configured under `policy-options`."
   ]
  ],
  "example": "An enterprise connected to two ISPs wants to receive only a default route from each. It applies an import policy on both BGP groups that accepts 0.0.0.0/0 and rejects everything else, and an export policy that advertises only its own aggregate, so it never accidentally becomes a transit path between the providers.",
  "tip": "Import and export are relative to the routing table: import is into it, export is out of it. OSPF import policy cannot stop LSA flooding; to advertise static or direct routes into OSPF you need an export policy.",
  "check": [
   [
    "You want OSPF to advertise a static route. Which type of policy do you apply, and where?",
    "An export policy matching the static route, applied under `protocols ospf export`."
   ],
   [
    "You want to stop routes from a BGP neighbor entering your routing table. Which direction?",
    "Import policy on that BGP neighbor or group."
   ]
  ]
 },
 {
  "t": "Default policies: BGP accepts and advertises active BGP routes; OSPF import accepts all and export rejects all; RIP export rejects all",
  "body": [
   "Every routing protocol in Junos has a built-in default policy. It is applied automatically at the end of any policy chain, so it decides what happens to a route that none of your configured policies explicitly accepts or rejects. If you do not configure any policy at all, the default policy is all that applies. Knowing each protocol's default explains a lot of behavior that surprises beginners.",
   "BGP's default import policy accepts all BGP routes received from neighbors, so they are placed in the routing table (subject to normal checks such as loop detection). BGP's default export policy advertises all active BGP routes to BGP neighbors. There is one important restriction from the protocol itself: routes learned from an IBGP peer are not advertised to other IBGP peers, which is why IBGP normally needs a full mesh or route reflectors. Notice what the default does not do: it does not advertise static, direct, OSPF or aggregate routes into BGP. To announce your own prefixes, you need an export policy.",
   "OSPF's default import policy accepts all OSPF routes. OSPF's default export policy rejects everything. That sounds alarming until you recall how OSPF works: routers share their own links and neighbors through LSAs, which are generated and flooded by the protocol itself, not by policy. So OSPF still exchanges all internal OSPF information normally; the export default only means that non-OSPF routes, such as statics or a default route, are not injected. When you want to advertise a static default route into OSPF, you write an export policy for it.",
   "RIP's default import policy accepts RIP routes from neighbors, but its default export policy rejects everything. Unlike OSPF, RIP learns and advertises routes through the routing table, so with the default export policy a Junos router running RIP receives routes but advertises nothing, not even its directly connected networks or routes it learned by RIP. To make RIP work you always need an export policy, typically one that accepts `from protocol [ rip direct ]`.",
   "```\nset policy-options policy-statement RIP-OUT term 1 from protocol [ rip direct ]\nset policy-options policy-statement RIP-OUT term 1 then accept\nset protocols rip group NEIGHBORS export RIP-OUT\nset protocols rip group NEIGHBORS neighbor ge-0/0/1.0\n```",
   "Summarizing the defaults in one place: BGP accepts all received BGP routes and advertises active BGP routes; OSPF accepts all and exports nothing extra (while still flooding its own link-state information); RIP accepts received RIP routes and advertises nothing. When a protocol does not behave as you expect, the first question to ask is whether your policy chain ends by falling through to one of these defaults."
  ],
  "terms": [
   [
    "Default policy",
    "The built-in, protocol-specific policy evaluated after all configured policies when none has made a final decision."
   ],
   [
    "BGP default export",
    "Advertises active BGP routes to BGP peers, except that IBGP-learned routes are not sent to other IBGP peers."
   ],
   [
    "OSPF default export",
    "Rejects all routes; OSPF's own link-state information is still flooded by the protocol itself."
   ],
   [
    "RIP default export",
    "Rejects all routes, so a RIP router advertises nothing until an export policy is configured."
   ]
  ],
  "example": "An engineer enables RIP on two lab routers and sees routes arriving on neither. `show route protocol rip` is empty on both. Because RIP's default export policy rejects everything, neither router is advertising. Adding an export policy that accepts RIP and direct routes on each router makes the routes appear within seconds.",
  "tip": "The RIP trap is common: RIP needs an export policy even to advertise its own connected networks. For OSPF, 'export rejects all' does not stop normal OSPF operation; it only stops redistribution of other routes.",
  "check": [
   [
    "Without any policy, will a Junos BGP router advertise its static routes to peers?",
    "No. The default BGP export advertises only active BGP routes; static routes need an export policy."
   ],
   [
    "Why does OSPF still work with a default export policy that rejects all routes?",
    "OSPF shares its topology through LSAs flooded by the protocol, not through export policy."
   ],
   [
    "What must you add for a Junos router to advertise anything via RIP?",
    "An export policy under the RIP group, for example accepting `from protocol [ rip direct ]`."
   ]
  ]
 },
 {
  "t": "Policy structure: terms, `from` match conditions, `then` actions; terminating vs flow-control actions (next term, next policy)",
  "body": [
   "A Junos routing policy is a `policy-statement` defined under `policy-options`. Each policy is made of one or more terms, and each term is an if-then rule: a `from` section with match conditions and a `then` section with actions. Terms are evaluated in the order they appear, from top to bottom.",
   "```\nset policy-options policy-statement EXPORT-BGP term STATICS from protocol static\nset policy-options policy-statement EXPORT-BGP term STATICS from route-filter 192.0.2.0/24 exact\nset policy-options policy-statement EXPORT-BGP term STATICS then community add CUST\nset policy-options policy-statement EXPORT-BGP term STATICS then accept\nset policy-options policy-statement EXPORT-BGP term REJECT-REST then reject\n```",
   "The `from` section lists match conditions such as `protocol`, `route-filter`, `prefix-list`, `neighbor`, `interface`, `area`, `as-path`, `community` and `tag`. When a term has several different conditions, all must match (a logical AND). When one condition lists several values, like `protocol [ static direct ]`, any value can match (a logical OR). A term with no `from` section matches every route, which is how you write a catch-all final term like REJECT-REST above. There is also a `to` section for some conditions about where a route is going, such as a specific neighbor.",
   "The `then` section holds actions, and they fall into three groups. Terminating actions are `accept` and `reject`. When a route matches a term with one of these, evaluation stops right there for that route: no further terms and no further policies are checked. Flow-control actions change where evaluation continues: `next term` skips to the next term in the policy, and `next policy` skips the rest of this policy and moves to the next policy in the chain. Modifying actions change route attributes, such as `metric`, `preference`, `local-preference`, `community add`, `as-path-prepend` and `next-hop self`. Modifying actions do not stop evaluation by themselves.",
   "What happens if a term matches but has no terminating or flow-control action, only modifiers? The modifications are applied, and evaluation continues with the next term, as if `next term` were present. What if a route matches no term at all in the policy? Evaluation moves to the next policy in the chain, and if there are no more, to the protocol's default policy. This is why many engineers end their policies with an explicit final term, to make the result clear instead of relying on the default.",
   "Order matters because the first terminating action wins. If the first term of an export policy accepts all static routes, a later term that tries to reject one static prefix never gets the chance. Use `insert` to move terms, and use `show policy-options policy-statement NAME` to read the policy top to bottom. Also note that a policy is only a definition: it does nothing until you apply it as an import or export policy somewhere."
  ],
  "terms": [
   [
    "Term",
    "A named if-then rule inside a policy, containing `from` match conditions and `then` actions."
   ],
   [
    "Terminating action",
    "`accept` or `reject`; ends policy evaluation for that route immediately."
   ],
   [
    "Flow-control action",
    "`next term` or `next policy`; moves evaluation to another term or policy without deciding the route's fate."
   ],
   [
    "Modifying action",
    "An action that changes route attributes, such as metric or community, without ending evaluation."
   ]
  ],
  "example": "An ISP customer wants to prepend its AS twice on announcements to a backup provider. Its export policy has a first term that matches its aggregate, applies `as-path-prepend` and then `accept`, and a final term with no `from` that rejects everything else, so nothing but the aggregate is ever sent.",
  "tip": "Several conditions in one `from` are ANDed; several values in one condition are ORed. A term with no `from` matches everything, and a term with only modifying actions continues to the next term.",
  "check": [
   [
    "A term matches a route and its `then` section only sets `metric 50`. What happens next?",
    "The metric is set and evaluation continues with the next term, because no terminating action was given."
   ],
   [
    "What does `next policy` do?",
    "It stops evaluating the current policy and moves to the next policy in the chain."
   ],
   [
    "How does a term with no `from` section behave?",
    "It matches all routes."
   ]
  ]
 },
 {
  "t": "Policy chains and evaluation order, falling through to the default policy",
  "body": [
   "You can apply more than one policy in the same place. When you list several policies, for example `set protocols bgp group ISP export [ NO-BOGONS ADVERTISE-AGG ]`, they form a policy chain. Understanding how Junos walks through a chain is essential to predicting what a policy configuration will do.",
   "Evaluation works like this. For each route, Junos starts with the first policy in the chain and evaluates its terms from top to bottom. As soon as the route matches a term with a terminating action, `accept` or `reject`, the decision is final. Junos does not look at any remaining terms, any remaining policies or the default policy. If a route matches a term with `next policy`, or if it matches no term with a terminating action in this policy, evaluation moves on to the next policy in the chain. If the route gets to the end of the last configured policy without a terminating action, it falls through to the protocol's default policy, which makes the final decision.",
   "```\nChain: export [ P1 P2 P3 ] -> then default policy\nRoute A: P1 term 2 says reject   -> rejected, P2/P3/default never checked\nRoute B: no match in P1, P2 term 1 says accept -> accepted\nRoute C: no match in P1, P2 or P3 -> protocol default decides\n```",
   "Because of this, the order of policies in the chain matters just as much as the order of terms in each policy. A broad `accept` in an early policy will prevent any later policy from rejecting the same route. A common design is to put the most specific protections first (for example, a policy that rejects bogon or private prefixes), then the policies that accept what you want to advertise, and finally an explicit reject-all term or policy so nothing slips through to a permissive default. When you add a policy to an existing chain, it goes to the end of the list by default; use `insert` to place it earlier, for example `insert export NO-BOGONS before ADVERTISE-AGG` under the protocol or group.",
   "Falling through to the default policy is often where surprises come from. Imagine a BGP export chain containing only a policy that accepts your aggregate route. Your aggregate is accepted, but other active BGP routes, such as routes from another provider, also get advertised because they fall through to BGP's default export policy, which advertises active BGP routes. The result is that you accidentally offer transit between two ISPs. Adding a final `then reject` term fixes it.",
   "Policies can also be applied at more than one level of BGP, such as the global, group and neighbor level. The most specific level wins: a neighbor-level export replaces the group-level export for that neighbor rather than adding to it. Junos also supports policy expressions, which combine policies with logical operators such as `&&`, `||` and `!`, but chains are the everyday tool. You can verify behavior with `test policy` and by checking `show route advertising-protocol bgp <neighbor>`."
  ],
  "terms": [
   [
    "Policy chain",
    "An ordered list of policies applied in one place, evaluated left to right."
   ],
   [
    "Fall-through",
    "What happens when no configured policy makes a terminating decision, so the protocol's default policy decides."
   ],
   [
    "Explicit reject term",
    "A final term with no `from` and `then reject`, used to prevent routes from reaching the default policy."
   ],
   [
    "Policy hierarchy in BGP",
    "Policies applied at neighbor level override those at group level, which override global ones."
   ]
  ],
  "example": "A company's BGP export chain is `[ AGG-ONLY ]`, which accepts its 198.51.100.0/24 aggregate. A few days later its second ISP notices it is receiving routes from the first ISP through the company. The engineer adds a term with `then reject` at the end of AGG-ONLY, so other BGP routes no longer fall through to the default export policy.",
  "tip": "The first terminating action anywhere in the chain wins; later policies and the default are never consulted for that route. If nothing terminates, the protocol default policy decides, which for BGP export means advertising active BGP routes.",
  "check": [
   [
    "In `export [ A B ]`, policy A accepts a route. Does policy B get to reject it?",
    "No. Once a terminating action accepts the route, evaluation stops."
   ],
   [
    "What decides the fate of a route that matches no terminating term in any policy of the chain?",
    "The protocol's default policy."
   ],
   [
    "How can you ensure only intended routes are exported by BGP?",
    "End the chain with an explicit reject term or policy so nothing falls through to the default."
   ]
  ]
 },
 {
  "t": "Route filters and match types: exact, orlonger, longer, upto, prefix-length-range; prefix lists",
  "body": [
   "Most policies need to match specific prefixes. Junos does this with the `route-filter` match condition, which pairs a prefix with a match type that describes which routes inside or equal to that prefix should match. The syntax is `from route-filter <prefix>/<length> <match-type>`.",
   "The match types, using 192.168.0.0/16 as the filter prefix, are: `exact` matches only 192.168.0.0/16 itself. `orlonger` matches 192.168.0.0/16 and any more specific route inside it, such as 192.168.5.0/24 or 192.168.5.1/32. `longer` matches only routes more specific than /16 inside it, but not the /16 itself. `upto /24` matches routes inside 192.168.0.0/16 with prefix lengths from /16 up to /24, so 192.168.0.0/16 and 192.168.7.0/24 match but 192.168.7.128/25 does not. `prefix-length-range /20-/24` matches routes inside the /16 whose lengths are between /20 and /24; the /16 itself does not match. There is also `through`, which matches a chain of prefixes between two given prefixes, but it is used less often.",
   "```\nset policy-options policy-statement FROM-CUST term OK from route-filter 203.0.113.0/24 upto /26\nset policy-options policy-statement FROM-CUST term OK then accept\nset policy-options policy-statement FROM-CUST term REST then reject\n```",
   "Always remember that the route must first fall within the filter's prefix; the match type then checks its length. A route to 10.0.0.0/24 never matches `route-filter 192.168.0.0/16 orlonger`, no matter the length.",
   "When a single term contains several route filters, Junos does not simply try them one by one. It first finds the route filter whose prefix is the longest match for the route, and then checks only that filter's match type. If that check fails, the route does not match the term, even if a shorter filter in the same term would have matched. For example, with `10.0.0.0/8 orlonger` and `10.1.0.0/16 exact` in the same term, a route to 10.1.1.0/24 is compared against the /16 filter (the longest match), fails `exact`, and so does not match the term at all. If you want independent checks, put the filters in separate terms.",
   "Prefix lists are named lists of prefixes defined under `policy-options prefix-list`. They are reusable: the same list can be referenced in many policies and in firewall filters. In a policy, `from prefix-list NAME` matches routes that exactly equal an entry in the list. When you need a match type with a list, use `from prefix-list-filter NAME orlonger` (or exact, longer and so on). A handy feature is `apply-path`, which builds a prefix list automatically from other parts of the configuration, for example from all configured BGP neighbor addresses.",
   "```\nset policy-options prefix-list CUSTOMER-NETS 203.0.113.0/24\nset policy-options prefix-list CUSTOMER-NETS 198.51.100.0/24\nset policy-options policy-statement P term 1 from prefix-list-filter CUSTOMER-NETS orlonger\n```"
  ],
  "terms": [
   [
    "exact",
    "Matches only the route equal to the filter's prefix and length."
   ],
   [
    "orlonger",
    "Matches the filter's prefix and any more specific route inside it."
   ],
   [
    "longer",
    "Matches only routes more specific than the filter's prefix, not the prefix itself."
   ],
   [
    "upto",
    "Matches routes inside the prefix with lengths from the prefix's own length up to the stated length."
   ],
   [
    "prefix-length-range",
    "Matches routes inside the prefix whose lengths fall between two stated lengths."
   ],
   [
    "Prefix list",
    "A named, reusable list of prefixes, matched exactly with `prefix-list` or with a match type via `prefix-list-filter`."
   ]
  ],
  "example": "A provider lets a customer announce its 203.0.113.0/24 and any subnets down to /26 for traffic engineering, but nothing smaller. The import policy uses `route-filter 203.0.113.0/24 upto /26` with accept, and a final reject term. Announcements of /27s or of anyone else's space are rejected.",
  "tip": "Know the difference between orlonger (includes the prefix) and longer (excludes it), and between upto (starts at the prefix length) and prefix-length-range (starts where you say). Multiple route filters in one term use longest match first, then the match type.",
  "check": [
   [
    "Does 172.16.0.0/12 match `route-filter 172.16.0.0/12 longer`?",
    "No. `longer` matches only more specific routes, not the prefix itself."
   ],
   [
    "Which routes match `route-filter 10.0.0.0/8 prefix-length-range /16-/24`?",
    "Routes inside 10.0.0.0/8 with prefix lengths from /16 through /24."
   ],
   [
    "How do you apply the `orlonger` match type to every entry of a prefix list?",
    "Use `from prefix-list-filter NAME orlonger`."
   ]
  ]
 },
 {
  "t": "Testing with `test policy`",
  "body": [
   "Routing policies can have wide effects, and a mistake in a route filter or term order can advertise or block far more than you intended. Junos gives you a way to see what a policy would match before you trust it: the operational-mode command `test policy`.",
   "The syntax is `test policy <policy-name> <prefix>`. Junos takes the routes currently in the routing table (inet.0 by default) that fall within the prefix you give, runs each through the named policy, and displays the routes the policy accepts. To test against every route in the table, use `0.0.0.0/0` as the prefix. Because the command works on routes already in the routing table, it is a good way to check export policies, which operate on routes the device already has.",
   "```\nuser@R1> test policy ADVERTISE-AGG 0.0.0.0/0\ninet.0: 25 destinations, 27 routes (25 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n198.51.100.0/24    *[Aggregate/130] 01:12:04\n                       Reject\nPolicy ADVERTISE-AGG: 1 prefix accepted, 24 prefix rejected\n```",
   "There is one behavior you must remember: the default action of `test policy` is accept. When a route passes through all the terms without hitting a terminating action, `test policy` treats it as accepted and shows it. It does not apply the default policy of whatever protocol you will eventually use the policy with, because it is not tied to any protocol. So if your policy has no final reject term, `test policy` may show many more accepted routes than the protocol will actually advertise, or the reverse depending on the protocol's default. The cleanest approach is to end policies with an explicit terminating term, which also makes the test output match reality.",
   "`test policy` is a check of logic, not a full simulation. It does not show attribute changes such as metric or community modifications, and it cannot tell you what a BGP neighbor will do with the routes. For those, look at the real results after committing: `show route advertising-protocol bgp <neighbor>` shows what is actually being sent, and `show route receive-protocol bgp <neighbor>` shows what is received before import policy. Comparing test output with those commands is a solid habit.",
   "A practical workflow is: write or change the policy in configuration mode, commit it (the policy has no effect until it is applied, so committing an unapplied policy is harmless), run `test policy` with `0.0.0.0/0` and specific prefixes, and only then apply it under the protocol. Using `commit confirmed` for the final step gives you an automatic rollback if the change cuts off your access."
  ],
  "terms": [
   [
    "test policy",
    "An operational command that runs routing table entries through a policy and shows the routes it accepts."
   ],
   [
    "Default accept in test policy",
    "Routes not explicitly rejected by the tested policy are shown as accepted."
   ],
   [
    "advertising-protocol",
    "`show route advertising-protocol bgp <neighbor>` shows the routes actually being advertised to a BGP neighbor."
   ],
   [
    "commit confirmed",
    "A commit that rolls back automatically unless confirmed within a set time, useful when applying risky policy changes."
   ]
  ],
  "example": "Before applying a new BGP export policy, an engineer commits the policy definition without applying it and runs `test policy EXPORT-ISP 0.0.0.0/0`. The output shows 400 routes accepted instead of the expected 2. She realizes the policy lacks a final reject term, adds it, retests to see only the two aggregates, and then applies the policy.",
  "tip": "`test policy` accepts by default any route the policy does not explicitly reject, regardless of the protocol's default policy. Use `0.0.0.0/0` to test the whole table.",
  "check": [
   [
    "What prefix do you give `test policy` to evaluate every route in inet.0?",
    "`0.0.0.0/0`."
   ],
   [
    "A route matches no term in the tested policy. How does `test policy` show it?",
    "As accepted, because the default action of `test policy` is accept."
   ]
  ]
 },
 {
  "t": "Firewall filters: stateless, term order, match conditions, implicit discard at the end",
  "body": [
   "Junos firewall filters inspect packets and decide what to do with them. Other vendors call the same feature access control lists (ACLs). Filters are configured under `firewall family <family> filter <name>`, where the family is usually `inet` for IPv4 or `inet6` for IPv6. They are applied to interfaces and are processed in the Packet Forwarding Engine at high speed.",
   "Firewall filters are stateless. Each packet is examined on its own, with no memory of previous packets or connections. If you allow a client inside your network to open a TCP connection to a server outside, a stateless filter on the inbound direction must also explicitly allow the server's replies. The `tcp-established` match condition helps here: it matches TCP packets with the ACK or RST flag set, which is what reply packets look like. This is different from stateful security policies on SRX Series firewalls, which track sessions and permit return traffic automatically.",
   "A filter is made of terms, evaluated in order from top to bottom, just like policy terms. Each term has a `from` section with match conditions and a `then` section with actions. The first term that matches and applies a terminating action decides the packet's fate, and later terms are not checked.",
   "```\nset firewall family inet filter PROTECT term SSH from source-address 192.0.2.0/24\nset firewall family inet filter PROTECT term SSH from protocol tcp\nset firewall family inet filter PROTECT term SSH from destination-port ssh\nset firewall family inet filter PROTECT term SSH then accept\nset firewall family inet filter PROTECT term ICMP from protocol icmp\nset firewall family inet filter PROTECT term ICMP then accept\n```",
   "Common match conditions for IPv4 include `source-address`, `destination-address` (and `address` for either), `source-prefix-list` and `destination-prefix-list`, `protocol` (tcp, udp, icmp, ospf and so on), `source-port` and `destination-port` (by number or name), `icmp-type`, `tcp-flags`, `tcp-established` and `tcp-initial`, `dscp` and `fragment-flags`. The logic matches routing policy: different conditions in one term are combined with AND, and multiple values for one condition are combined with OR. A term with no `from` section matches all packets.",
   "Every filter ends with an implicit term that discards everything not matched earlier. You do not see it in the configuration, but it is always there. In the example above, a Telnet packet from anywhere, or an SSH packet from outside 192.0.2.0/24, matches no term and is silently discarded. This default-deny behavior is secure, but it also means that when you apply a filter you must explicitly permit everything you still need, or you can cut off traffic, including your own management session. A common practice is to end filters with an explicit final term that counts or logs what is being dropped, so the implicit discard never happens without you seeing it.",
   "Because order matters and new terms are added at the bottom, use `insert` to reposition terms and review the filter with `show firewall family inet filter <name>` in configuration mode before committing."
  ],
  "terms": [
   [
    "Stateless filter",
    "A filter that evaluates each packet independently without tracking connections, so return traffic must be explicitly allowed."
   ],
   [
    "Implicit discard",
    "The hidden final action of every Junos firewall filter that silently drops packets not matched by any term."
   ],
   [
    "tcp-established",
    "A match condition for TCP packets with the ACK or RST flag set, typically reply traffic."
   ],
   [
    "Match condition",
    "A `from` criterion such as address, protocol or port used to select packets in a filter term."
   ]
  ],
  "example": "An engineer applies a filter permitting only HTTPS to a web server subnet and commits. Suddenly the server cannot resolve names or download updates. The filter is stateless and ends with an implicit discard, so the DNS and update replies coming back are dropped. Adding a term for return traffic, using `tcp-established` for TCP and a term for the DNS responses, restores service.",
  "tip": "Filters are stateless, evaluated top to bottom, and end with an implicit discard. Multiple conditions in one term are ANDed, multiple values in one condition are ORed.",
  "check": [
   [
    "A packet matches no term in a filter. What happens to it?",
    "It is silently discarded by the implicit final term."
   ],
   [
    "Why might a stateless filter need a `tcp-established` term?",
    "Because it does not track connections, reply packets must be explicitly permitted; `tcp-established` matches them."
   ],
   [
    "A term has `from protocol tcp` and `from destination-port [ 22 443 ]`. Which packets match?",
    "TCP packets to destination port 22 or 443."
   ]
  ]
 },
 {
  "t": "Filter actions: terminating (accept, discard, reject) and non-terminating (count, log, syslog, policer)",
  "body": [
   "The `then` section of a firewall filter term decides what happens to matching packets. Actions come in two kinds. Terminating actions decide the packet's fate and stop filter evaluation. Non-terminating actions (also called action modifiers) do something extra, such as counting or rate limiting, and can be combined with a terminating action in the same term.",
   "The terminating actions you need to know are `accept`, `discard` and `reject`. `accept` lets the packet continue. `discard` drops it silently, sending nothing back. `reject` drops it and sends an ICMP message to the source, by default a destination unreachable message indicating the traffic was administratively filtered; you can choose other ICMP message types or a TCP reset. Discard is usually the safer choice facing untrusted networks because it gives an attacker less information and generates no extra traffic, while reject can be friendlier inside a network because applications fail quickly instead of timing out. `routing-instance` is also terminating: it sends the packet to a forwarding instance for filter-based forwarding.",
   "The main non-terminating actions are these. `count <name>` increments a named counter for matching packets and bytes, shown with `show firewall filter <name>` or `show firewall`. `log` records packet headers in a buffer on the Routing Engine, viewed with `show firewall log`; the buffer is small and is overwritten over time. `syslog` sends a message about the packet to the system log, so it can go to local files or a remote syslog server if a file or host is configured for the firewall facility. `policer <name>` applies a rate limit defined under `firewall policer`, so traffic above a bandwidth and burst size is dropped or marked. Others include `forwarding-class` and `loss-priority` for class of service, `sample` for traffic sampling, and the flow-control action `next term`.",
   "```\nset firewall policer LIMIT-ICMP if-exceeding bandwidth-limit 1m burst-size-limit 15k\nset firewall policer LIMIT-ICMP then discard\nset firewall family inet filter PROTECT term ICMP from protocol icmp\nset firewall family inet filter PROTECT term ICMP then policer LIMIT-ICMP\nset firewall family inet filter PROTECT term ICMP then count ICMP-IN\nset firewall family inet filter PROTECT term ICMP then accept\nset firewall family inet filter PROTECT term LAST then count DROPPED\nset firewall family inet filter PROTECT term LAST then discard\n```",
   "An important rule: if a term has only non-terminating actions and no terminating action, Junos treats the term as though it also said `accept`. So a term with only `count` will count and accept the packet, not pass it on to later terms. If you want to count a packet and still let later terms decide, add `next term` explicitly.",
   "Counters and logs are your window into what a filter is doing. When a filter seems to block the wrong thing, check which term's counter is increasing with `show firewall filter <name>`, and use `clear firewall filter <name>` to reset the counters before a test. The final `count DROPPED` term above makes the normally invisible implicit discard visible."
  ],
  "terms": [
   [
    "discard",
    "A terminating action that drops the packet silently."
   ],
   [
    "reject",
    "A terminating action that drops the packet and sends an ICMP unreachable (or TCP reset) to the source."
   ],
   [
    "count",
    "A non-terminating action that increments a named packet and byte counter."
   ],
   [
    "policer",
    "A non-terminating action that rate-limits matching traffic using a policer defined under `firewall policer`."
   ],
   [
    "log vs syslog",
    "`log` stores packet headers in a Routing Engine buffer for `show firewall log`; `syslog` writes to the system log."
   ]
  ],
  "example": "A router's CPU spikes whenever someone floods it with pings. The engineer adds a term to its loopback filter that matches ICMP, applies a policer limiting it to a small rate, counts it and accepts it. Normal troubleshooting pings still work, the counter shows how much ICMP is arriving, and the flood no longer overwhelms the Routing Engine.",
  "tip": "A term with only non-terminating actions implicitly accepts the packet. Discard is silent; reject sends ICMP back. Log goes to a local buffer (`show firewall log`); syslog goes to the system log.",
  "check": [
   [
    "A term matches a packet and has only `then count WEB`. What happens to the packet?",
    "It is counted and accepted, because a term with no terminating action implies accept."
   ],
   [
    "What is the difference between discard and reject?",
    "Discard drops silently; reject drops and sends an ICMP unreachable or TCP reset to the sender."
   ],
   [
    "Where do you view packets recorded by the `log` action?",
    "With `show firewall log`."
   ]
  ]
 },
 {
  "t": "Applying filters to interfaces (input/output) and to lo0 to protect the RE",
  "body": [
   "A firewall filter does nothing until you apply it. You apply filters to a logical interface (unit) under the protocol family, choosing a direction. `input` filters packets arriving on the interface; `output` filters packets leaving it. You can apply one input and one output filter per family on an interface, or use `input-list` and `output-list` to apply several filters in sequence.",
   "```\nset interfaces ge-0/0/0 unit 0 family inet filter input FROM-INTERNET\nset interfaces ge-0/0/1 unit 0 family inet filter output TO-SERVERS\nset interfaces lo0 unit 0 family inet filter input PROTECT-RE\n```",
   "Choose the direction by thinking about where traffic comes from. To stop unwanted traffic entering your network from the internet, apply an input filter on the internet-facing interface, which drops it as early as possible. To control what reaches a particular server segment regardless of which interface it came in on, an output filter on the interface toward that segment is often simpler. Remember that a filter is stateless, so a filter in one direction may need terms for the replies of traffic you initiated.",
   "The loopback interface, lo0, has a special role. Traffic destined to the device itself, the Routing Engine (RE), such as SSH, SNMP, NTP, BGP, OSPF, ping and DNS replies, is handled by the RE no matter which physical interface it arrived on. An input filter on lo0 is applied to all of that host-bound traffic from every interface, so one filter protects the control plane. It does not affect transit traffic that the device merely forwards. This makes an lo0 input filter the standard way to protect the RE from unauthorized access and floods.",
   "A good lo0 filter permits only what the device needs, from only the sources that need it. Typical terms allow SSH from management networks, SNMP from monitoring servers, NTP from time servers, BGP from configured neighbors (a prefix list built with `apply-path` can list them automatically), OSPF and BFD from the internal network, rate-limited ICMP, DNS and other replies you rely on, and then count and discard everything else. Because of the implicit discard, forgetting a term breaks that function: forget OSPF and your adjacencies drop; forget NTP replies and the clock stops synchronizing.",
   "Applying an lo0 filter is a classic way to lock yourself out, so use `commit confirmed 5`. If your SSH session dies, the device automatically rolls back after five minutes. If everything still works, run `commit` again to make it permanent. Afterwards, verify with `show firewall filter PROTECT-RE` to see the counters for each term and with `show interfaces lo0 detail` or `show configuration interfaces lo0` to confirm the filter is applied.",
   "Filters can also be applied to IPv6 with `family inet6`, and an IPv4 filter never inspects IPv6 packets. If the device is reachable over IPv6, protect lo0 for both families."
  ],
  "terms": [
   [
    "Input filter",
    "A filter applied to packets arriving on an interface."
   ],
   [
    "Output filter",
    "A filter applied to packets leaving an interface."
   ],
   [
    "lo0 filter",
    "An input filter on the loopback interface that inspects all traffic destined to the Routing Engine from any interface."
   ],
   [
    "Host-bound traffic",
    "Packets addressed to the device itself, such as management and routing protocol traffic, processed by the RE."
   ]
  ],
  "example": "A security team wants to stop SSH brute-force attempts reaching a router from the internet. The engineer creates PROTECT-RE allowing SSH only from the management prefix list, BGP from peers, OSPF, NTP and limited ICMP, with a final count-and-discard term. She applies it to lo0 input with `commit confirmed 5`, verifies her session and the BGP sessions remain up, then commits again.",
  "tip": "A filter on lo0 input protects the Routing Engine from traffic arriving on any interface but does not filter transit traffic. Always include routing protocols and management services, and use `commit confirmed`.",
  "check": [
   [
    "Does an input filter on lo0 block transit traffic passing through the router?",
    "No. It only applies to traffic destined to the Routing Engine."
   ],
   [
    "You apply a new lo0 filter and all OSPF neighbors go down. What is the likely cause?",
    "The filter lacks a term permitting OSPF, so OSPF packets hit the implicit discard."
   ],
   [
    "Why use `commit confirmed` when applying an lo0 filter?",
    "If the filter blocks your management access, the configuration rolls back automatically after the timer."
   ]
  ]
 },
 {
  "t": "Unicast reverse path forwarding (uRPF) checks: strict and loose",
  "body": [
   "Attackers often forge (spoof) the source address of packets, for example in denial-of-service floods, to hide their origin or to make replies hit a victim. Unicast reverse path forwarding (uRPF) is a simple defense. Normally a router looks only at a packet's destination address. With uRPF enabled on an interface, the router also looks up the packet's source address in its forwarding table and asks whether that source is plausible. Packets that fail the check are dropped. This supports the widely recommended practice of filtering spoofed traffic at the network edge.",
   "In strict mode, the source address must be reachable through the same interface the packet arrived on. In other words, if the router were to send a reply to that source, it would use this interface. A packet arriving on a customer interface with a source address from some other network fails, because the route to that source points elsewhere. Strict mode is very effective on single-homed customer or access interfaces where traffic always comes back the way it went.",
   "In loose mode, the source address only needs to have a route in the forwarding table through any interface. Loose mode does not verify the arrival interface, so it catches fewer spoofed packets, mainly those using sources the router has no route for at all, such as unallocated or unrouted address space. It is useful where routing is asymmetric, for example on links to multiple providers, where strict mode would drop legitimate traffic. Keep in mind that a default route can make almost any source look reachable, which weakens loose mode considerably.",
   "Asymmetric routing is the main risk with strict mode. If traffic from a network arrives on one link but the router's best route back to that network uses another link, strict uRPF drops valid traffic. By default Junos compares against active paths only. The option `set routing-options forwarding-table unicast-reverse-path feasible-paths` makes the check consider all feasible paths, such as alternate routes learned from BGP, which reduces false drops in multihomed designs.",
   "Configuration is per interface and per family:",
   "```\nset interfaces ge-0/0/1 unit 0 family inet rpf-check\nset interfaces ge-0/0/2 unit 0 family inet rpf-check mode loose\nset interfaces ge-0/0/1 unit 0 family inet rpf-check fail-filter RPF-EXCEPTIONS\n```",
   "The first line enables strict mode (the default). The second enables loose mode. The `fail-filter` option names a firewall filter that is applied only to packets that fail the check, letting you make exceptions, such as accepting DHCP requests that legitimately use a source of 0.0.0.0, or count and log failures before dropping them. Detailed interface output such as `show interfaces ge-0/0/1.0 extensive` shows RPF failure counters, which tell you how much traffic is being dropped. Platform support and exact behavior can vary, so check the documentation for your hardware."
  ],
  "terms": [
   [
    "uRPF",
    "Unicast reverse path forwarding, a check that validates a packet's source address against the forwarding table to drop spoofed traffic."
   ],
   [
    "Strict mode",
    "The source must be reachable via the same interface the packet arrived on."
   ],
   [
    "Loose mode",
    "The source only needs a route in the forwarding table via any interface."
   ],
   [
    "fail-filter",
    "A firewall filter applied only to packets that fail the uRPF check, used for exceptions or logging."
   ],
   [
    "Feasible paths",
    "An option that lets uRPF consider all valid alternate paths, not just active ones, to handle asymmetric routing."
   ]
  ],
  "example": "An ISP enables strict `rpf-check` on each single-homed customer interface. A compromised customer device starts sending floods with random source addresses. Because those sources do not route back through that customer's interface, the router drops them, and the ISP's RPF failure counters reveal which customer needs to be contacted.",
  "tip": "Strict mode checks the arrival interface and suits single-homed edges; loose mode only checks that a route exists and suits asymmetric or multihomed links. Asymmetric routing plus strict mode drops legitimate traffic.",
  "check": [
   [
    "Why can strict uRPF drop legitimate traffic on a multihomed link?",
    "With asymmetric routing, the best route back to the source may use a different interface than the one the packet arrived on."
   ],
   [
    "Which Junos statement enables loose uRPF on an interface?",
    "`set interfaces <if> unit <n> family inet rpf-check mode loose`."
   ],
   [
    "What is the purpose of `fail-filter`?",
    "To apply a filter to packets that fail the check, for exceptions such as DHCP or for counting and logging."
   ]
  ]
 }
]);
