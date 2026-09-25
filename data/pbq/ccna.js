/* Performance-based simulations for Cisco CCNA (200-301 v2.0). */
CertHub.addPbqs("ccna", [
  { id: "subnet-27-fill", d: 1, type: "fill", title: "Subnet a /27 host address",
    prompt: "A branch printer is configured as 172.16.45.200/27. Fill in the values for its subnet.",
    fields: [
      { label: "Network address", answers: ["172.16.45.192"] },
      { label: "First usable host", answers: ["172.16.45.193"] },
      { label: "Last usable host", answers: ["172.16.45.222"] },
      { label: "Broadcast address", answers: ["172.16.45.223"] },
      { label: "Number of usable hosts", answers: ["30"] }
    ],
    explain: "A /27 mask is 255.255.255.224, so the block size in the fourth octet is 256 - 224 = 32. Subnets start at 0, 32, 64 ... 192, 224, and .200 falls in the 192 block. The broadcast is one less than the next block (.223), usable hosts run .193 to .222, and 2^5 - 2 = 30 hosts are usable." },

  { id: "ipv6-types-match", d: 1, type: "match", title: "Identify IPv6 address types",
    prompt: "You run show ipv6 interface on several devices and note these addresses. Match each address to its type.",
    pairs: [
      ["FE80::21A:2BFF:FE3C:4D5E", "Link-local unicast"],
      ["2001:DB8:ACAD:10::25", "Global unicast"],
      ["FD12:3456:789A:1::1", "Unique local"],
      ["FF02::1", "Multicast (all nodes)"],
      ["::1", "Loopback"]
    ],
    extra: ["IPv4-mapped", "Unspecified"],
    explain: "FE80::/10 is link-local and is created automatically on every IPv6 interface (the FFFE in the middle shows an EUI-64 interface ID). 2000::/3 is global unicast (2001:DB8::/32 is the documentation range inside it). FC00::/7, used in practice as FD00::/8, is unique local, the IPv6 counterpart to RFC 1918 space. FF00::/8 is multicast and FF02::1 reaches all nodes on the link. ::1 is loopback, while :: alone is the unspecified address." },

  { id: "duplex-mismatch-select", d: 1, type: "select", title: "Spot duplex mismatch symptoms",
    prompt: "Users behind SW1 report slow file transfers to R1. R1 Gi0/0 was hard-coded to speed 100 and duplex full; SW1 Gi0/1 is left on auto. Select every line that is a symptom of a duplex mismatch.",
    context: "SW1# show interfaces gi0/1\nGigabitEthernet0/1 is up, line protocol is up (connected)\n  Half-duplex, 100Mb/s, media type is 10/100/1000BaseTX\n     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n     0 output errors, 2140 collisions, 0 interface resets\n     0 babbles, 187 late collision, 0 deferred\n\nR1# show interfaces gi0/0\nGigabitEthernet0/0 is up, line protocol is up\n  Full-duplex, 100Mb/s, media type is RJ45\n     22 runts, 0 giants, 0 throttles\n     812 input errors, 790 CRC, 0 frame, 0 overrun, 0 ignored\n     0 output errors, 0 collisions, 0 interface resets",
    options: [
      "SW1 reports Half-duplex while R1 reports Full-duplex",
      "SW1 shows 187 late collisions",
      "R1 shows rising CRC errors and runts",
      "Both interfaces report 100Mb/s",
      "SW1 media type is 10/100/1000BaseTX",
      "SW1 shows 0 output errors and 0 interface resets"
    ],
    answers: [0, 1, 2],
    explain: "When one side is hard-coded, autonegotiation fails and the auto side falls back to half duplex at the sensed speed. The half-duplex side (SW1) sees late collisions because the full-duplex side transmits whenever it likes; the full-duplex side (R1) sees CRC errors and runts from frames SW1 abandoned mid-transmission. Matching speeds rule out a speed mismatch, and the media type and zero output errors say nothing about duplex. Fix it by setting both sides to auto or both to the same fixed values." },

  { id: "rstp-output-select", d: 2, type: "select", title: "Read Rapid PVST+ output",
    prompt: "Review the spanning-tree output from SW2. Select every statement that is true.",
    context: "SW2# show spanning-tree vlan 10\nVLAN0010\n  Spanning tree enabled protocol rstp\n  Root ID    Priority    24586\n             Address     0011.2233.4401\n             Cost        4\n             Port        1 (GigabitEthernet0/1)\n  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)\n             Address     0011.2233.4402\n\nInterface           Role Sts Cost      Prio.Nbr Type\n------------------- ---- --- --------- -------- ----------\nGi0/1               Root FWD 4         128.1    P2p\nGi0/2               Altn BLK 4         128.2    P2p\nFa0/5               Desg FWD 19        128.5    P2p Edge\nFa0/6               Desg FWD 19        128.6    P2p",
    options: [
      "SW2 is not the root bridge for VLAN 10",
      "The root bridge's configured priority is 24576",
      "Gi0/2 is discarding frames to prevent a loop",
      "Fa0/5 is configured with PortFast",
      "SW2's root path cost is 19",
      "Gi0/1 is a designated port",
      "Fa0/6 is blocking"
    ],
    answers: [0, 1, 2, 3],
    explain: "The Root ID and Bridge ID addresses differ, so SW2 is not the root; SW2 reaches the root through Gi0/1 (its root port) at a cost of 4. The bridge priority includes the VLAN number (sys-id-ext), so 24586 - 10 = 24576 was configured. Altn BLK means an alternate port in the discarding state, and the Edge type shows PortFast. Fa0/6 is a designated port and forwarding." },

  { id: "roas-fill", d: 2, type: "fill", title: "Complete a router-on-a-stick design",
    prompt: "R1 Gi0/0 connects to SW1 Gi0/24 and must route between VLAN 10 and VLAN 20. Using the design table, fill in the missing configuration values.",
    context: "VLAN  Name    Subnet             Gateway rule\n10    SALES   192.168.10.0/24    first usable address\n20    STAFF   192.168.20.0/24    first usable address\n99    NATIVE  (no hosts)\n\nR1(config)# interface gi0/0.20\nR1(config-subif)# ______________\nR1(config-subif)# ip address ______________ 255.255.255.0\n\nSW1(config)# interface gi0/24\nSW1(config-if)# switchport mode ______\nSW1(config-if)# switchport trunk native vlan 99",
    fields: [
      { label: "Command that tags subinterface traffic for VLAN 20", answers: ["encapsulation dot1q 20", "encapsulation dot1q 20 ", "encap dot1q 20"] },
      { label: "IP address on Gi0/0.20", answers: ["192.168.20.1"] },
      { label: "Switchport mode on SW1 Gi0/24", answers: ["trunk"] },
      { label: "Default gateway for a PC in VLAN 20", answers: ["192.168.20.1"] }
    ],
    explain: "Each router subinterface needs encapsulation dot1Q <vlan-id> before it will accept an IP address, and the subinterface address becomes the default gateway for hosts in that VLAN. The switch port facing the router must be an 802.1Q trunk so frames from VLAN 10 and 20 arrive tagged. Because the native VLAN is 99 on the switch, a router subinterface for VLAN 99 would need encapsulation dot1Q 99 native to match." },

  { id: "route-lookup-fill", d: 3, type: "fill", title: "Choose next hops from a routing table",
    prompt: "Using R1's routing table, enter the next-hop address R1 uses for each destination.",
    context: "R1# show ip route\nGateway of last resort is 203.0.113.1 to network 0.0.0.0\n\nS*    0.0.0.0/0 [1/0] via 203.0.113.1\n      10.0.0.0/8 is variably subnetted, 9 subnets, 5 masks\nC        10.0.12.0/30 is directly connected, GigabitEthernet0/1\nL        10.0.12.1/32 is directly connected, GigabitEthernet0/1\nC        10.0.13.0/30 is directly connected, GigabitEthernet0/2\nL        10.0.13.1/32 is directly connected, GigabitEthernet0/2\nC        10.0.14.0/30 is directly connected, GigabitEthernet0/3\nL        10.0.14.1/32 is directly connected, GigabitEthernet0/3\nO        10.1.0.0/16 [110/20] via 10.0.12.2, 00:14:02, GigabitEthernet0/1\nO        10.1.4.0/22 [110/30] via 10.0.13.2, 00:14:02, GigabitEthernet0/2\nS        10.1.5.0/24 [1/0] via 10.0.14.2\n      203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks\nC        203.0.113.0/29 is directly connected, GigabitEthernet0/0\nL        203.0.113.2/32 is directly connected, GigabitEthernet0/0",
    fields: [
      { label: "Destination 10.1.5.77", answers: ["10.0.14.2"] },
      { label: "Destination 10.1.6.9", answers: ["10.0.13.2"] },
      { label: "Destination 10.1.200.1", answers: ["10.0.12.2"] },
      { label: "Destination 10.2.0.1", answers: ["203.0.113.1"] }
    ],
    explain: "The router always picks the longest matching prefix; administrative distance and metric only break ties between routes to the same prefix. 10.1.5.77 matches /16, /22 and /24, so the static /24 wins. 10.1.6.9 is inside 10.1.4.0/22 (10.1.4.0 to 10.1.7.255) but not the /24, so the OSPF /22 wins. 10.1.200.1 matches only the /16, and 10.2.0.1 matches nothing but the default route." },

  { id: "ospf-adjacency-select", d: 3, type: "select", title: "Find why OSPF neighbors will not form",
    prompt: "R1 and R2 share the 10.0.12.0/24 link but show ip ospf neighbor is empty on both. Select every mismatch that prevents the adjacency.",
    context: "R1# show ip ospf interface gi0/0\nGigabitEthernet0/0 is up, line protocol is up\n  Internet Address 10.0.12.1/24, Area 0\n  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n\nR2# show ip ospf interface gi0/0\nGigabitEthernet0/0 is up, line protocol is up\n  Internet Address 10.0.12.2/24, Area 1\n  Process ID 2, Router ID 2.2.2.2, Network Type BROADCAST, Cost: 10\n  Timer intervals configured, Hello 5, Dead 20, Wait 20, Retransmit 5",
    options: [
      "The interfaces are in different areas (0 and 1)",
      "The hello and dead timers do not match",
      "The OSPF process IDs differ (1 and 2)",
      "The interface costs differ (1 and 10)",
      "The router IDs are different",
      "The subnet masks do not match"
    ],
    answers: [0, 1],
    explain: "Neighbors must agree on area ID, subnet and mask, hello and dead intervals, authentication, and (for full adjacency) MTU, and their router IDs must be unique. Here the area and timers differ, so hellos are rejected. The process ID is locally significant and may differ, cost is a per-router outgoing value, different router IDs are required, and both masks are /24." },

  { id: "ospf-states-order", d: 3, type: "order", title: "Order the OSPF neighbor states",
    prompt: "Two OSPF routers on a broadcast segment are brought up. Put the neighbor states in the order they pass through on the way to full adjacency.",
    steps: ["Down", "Init", "2-Way", "ExStart", "Exchange", "Loading", "Full"],
    explain: "Down means no hellos yet; Init means a hello arrived but it does not list our router ID; 2-Way means each router sees itself in the other's hello (DR/BDR election happens here). In ExStart the pair picks a master and starting sequence number, in Exchange they swap DBD summaries, in Loading they request missing LSAs, and Full means the databases are synchronized. A router stuck in ExStart/Exchange often points to an MTU mismatch." },

  { id: "acl-evaluate-select", d: 4, type: "select", title: "Evaluate an extended ACL",
    prompt: "The ACL below is applied inbound on R1 Gi0/1, which faces the 192.168.10.0/24 LAN. Select every flow that the ACL permits.",
    context: "R1# show access-lists LAN-IN\nExtended IP access list LAN-IN\n    10 deny tcp 192.168.10.0 0.0.0.255 host 10.20.0.5 eq www\n    20 permit icmp 192.168.10.0 0.0.0.255 any\n    30 permit tcp 192.168.10.0 0.0.0.127 any eq 443\n    40 permit udp any any eq domain\n\nR1# show running-config interface gi0/1\ninterface GigabitEthernet0/1\n ip address 192.168.10.1 255.255.255.0\n ip access-group LAN-IN in",
    options: [
      "192.168.10.20 to 10.20.0.5, TCP port 80",
      "192.168.10.20 to 10.20.0.5, ICMP echo request",
      "192.168.10.200 to 10.20.0.5, TCP port 443",
      "192.168.10.50 to 10.20.0.5, TCP port 443",
      "192.168.10.60 to 10.20.0.9, TCP port 80",
      "192.168.10.90 to 10.20.0.53, UDP port 53",
      "192.168.10.30 to 10.20.0.5, TCP port 22"
    ],
    answers: [1, 3, 5],
    explain: "ACLs are processed top-down and stop at the first match, with an implicit deny at the end. Line 10 blocks HTTP to 10.20.0.5; line 20 permits all ICMP from the LAN. Wildcard 0.0.0.127 on line 30 matches only .0 to .127, so .50 is allowed HTTPS but .200 is not. HTTP to 10.20.0.9 and SSH match no permit and hit the implicit deny, while DNS on UDP 53 matches line 40." },

  { id: "l2-security-match", d: 4, type: "match", title: "Match Layer 2 protection features",
    prompt: "Match each access-switch feature or setting to the action it takes.",
    pairs: [
      ["Port security, violation shutdown", "Err-disables the port when an unknown MAC exceeds the maximum"],
      ["Port security, violation restrict", "Drops violating frames, increments the violation counter and logs it"],
      ["Port security, violation protect", "Drops violating frames silently with no counter or log"],
      ["DHCP snooping", "Drops DHCP server messages arriving on untrusted ports"],
      ["Dynamic ARP inspection", "Drops ARP packets whose IP-to-MAC binding is not in the snooping table"],
      ["BPDU guard", "Err-disables a PortFast port that receives a BPDU"]
    ],
    extra: ["Encrypts frames between the switch and the host", "Assigns the port to a guest VLAN after failed 802.1X"],
    explain: "Port security has three violation modes: shutdown (the default) err-disables the port, restrict drops and reports, and protect drops silently. DHCP snooping stops rogue DHCP servers by trusting only uplink ports and builds a binding table, which dynamic ARP inspection then uses to reject spoofed ARP. BPDU guard protects PortFast edge ports from someone plugging in a switch." },

  { id: "syslog-trap-select", d: 5, type: "select", title: "Predict which syslog messages reach the server",
    prompt: "R1 is configured with logging host 192.168.50.10 and logging trap warnings. Select every message that will be sent to the syslog server.",
    context: "R1# show logging (buffer excerpt)\n1. %SYS-5-CONFIG_I: Configured from console by admin on vty0 (192.168.50.25)\n2. %LINK-3-UPDOWN: Interface GigabitEthernet0/1, changed state to down\n3. %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down\n4. %OSPF-5-ADJCHG: Process 1, Nbr 2.2.2.2 on GigabitEthernet0/1 from FULL to DOWN\n5. %SEC_LOGIN-4-LOGIN_FAILED: Login failed [user: admin] [Source: 198.51.100.44]\n6. %SYS-2-MALLOCFAIL: Memory allocation of 65536 bytes failed\n7. %SEC-6-IPACCESSLOGP: list LAN-IN denied tcp 192.168.10.60 -> 10.20.0.9(80), 1 packet",
    options: ["Message 1", "Message 2", "Message 3", "Message 4", "Message 5", "Message 6", "Message 7"],
    answers: [1, 4, 5],
    explain: "The number after the facility in %FACILITY-SEVERITY-MNEMONIC is the severity (0 emergencies, 1 alerts, 2 critical, 3 errors, 4 warnings, 5 notifications, 6 informational, 7 debugging). logging trap warnings sends level 4 and everything more severe (0-4), so the level 3, 4 and 2 messages go out. The level 5 notifications and level 6 ACL log stay local unless the trap level is raised." }
]);
