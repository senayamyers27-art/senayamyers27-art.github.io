/* Lessons for Palo Alto Networks Certified Next-Generation Firewall Engineer (NGFW-Engineer): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("palo-alto-ngfw", [
 {
  "t": "Interface types: Layer 3, Layer 2, virtual wire, tap, loopback, tunnel, VLAN and aggregate Ethernet (LACP); subinterfaces and 802.1Q tags",
  "body": [
   "Every PAN-OS deployment starts with a decision about how each physical port behaves. The interface type decides whether the firewall routes, switches, sits invisibly in the path, or only watches. Picking the right type matters because it controls which features you can use later: NAT, routing protocols, GlobalProtect and IPsec all need Layer 3 interfaces, while a tap interface can never block anything.",
   "A Layer 3 interface has an IP address, belongs to a virtual router (or logical router) and a Layer 3 zone, and forwards by routing. This is the most common type and the only physical type that supports NAT, DHCP server, routing protocols and VPN termination. A Layer 2 interface has no IP address; the firewall switches frames between Layer 2 interfaces that share a VLAN object, while still applying security policy between Layer 2 zones. A virtual wire (vwire) binds exactly two interfaces together as a 'bump in the wire': no IP addresses, no MAC learning, no routing. You drop it into an existing link without re-addressing anything, yet you still get App-ID, threat prevention and policy. A vwire can pass tagged traffic and can be told which VLAN tags to allow. A tap interface receives a copy of traffic from a switch SPAN or mirror port. It gives visibility (App-ID, threat logs) but cannot block, because the firewall is not in the traffic path.",
   "Several interfaces are logical rather than physical. A loopback interface is a Layer 3 interface that is always up, useful for management access, DNS proxy, GlobalProtect portals or as a stable source address. A tunnel interface (for example `tunnel.1`) is the logical endpoint for route-based IPsec, GlobalProtect or GRE; you assign it to a zone and a router just like a physical Layer 3 port, and routes pointing at it send traffic into the VPN. A VLAN interface gives a Layer 2 VLAN an IP address so hosts in that VLAN can be routed to Layer 3 networks, much like a switched virtual interface on a switch.",
   "An aggregate Ethernet (AE) interface, such as `ae1`, bundles several physical ports of the same speed and media into one logical link for more bandwidth and redundancy. You create the group, then set each member port's type to 'Aggregate Ethernet' and assign it to the group. Link Aggregation Control Protocol (LACP) is optional but recommended: it negotiates membership with the switch and detects a misconnected or failed member, so traffic is not black-holed. The AE group itself then gets a type (Layer 3, Layer 2, vwire and so on).",
   "Subinterfaces let one physical or AE port carry many networks using IEEE 802.1Q VLAN tags. On a Layer 3 port you create `ethernet1/3.20` with tag 20 and its own IP, zone and router, which is the classic 'router on a stick' design facing a trunk port on a switch. Layer 2 and vwire interfaces also support subinterfaces. By convention the subinterface number matches the tag, but it is the tag field that actually matters.",
   "In the web interface all of this lives under Network > Interfaces, with tabs for Ethernet, VLAN, Loopback and Tunnel. The Ethernet tab shows each port's type, zone and router at a glance, which is the first screen to read when you inherit a firewall."
  ],
  "terms": [
   [
    "Virtual wire",
    "A pair of interfaces bound together so the firewall inspects traffic transparently with no IP addresses, routing or switching."
   ],
   [
    "Tap interface",
    "An interface fed by a switch SPAN/mirror port that gives visibility and logging but cannot enforce or block."
   ],
   [
    "Aggregate Ethernet (AE)",
    "A logical interface bundling several same-speed physical ports, optionally negotiated with LACP, for bandwidth and redundancy."
   ],
   [
    "Subinterface",
    "A logical interface on a parent port that handles one 802.1Q VLAN tag, with its own zone and addressing."
   ],
   [
    "Tunnel interface",
    "A logical Layer 3 interface used as the endpoint of a route-based IPsec, GRE or GlobalProtect tunnel."
   ]
  ],
  "example": "A hospital wants threat prevention on the link between its core switch and an old router, but nobody can re-address the router this quarter. You configure ethernet1/5 and ethernet1/6 as a virtual wire in two vwire zones, cable the firewall inline, and it begins enforcing App-ID and threat profiles without any IP or routing change.",
  "tip": "If a question says the firewall must be added 'with no network changes' or 'without IP addresses', the answer is virtual wire. If it must only observe and never block, it is tap. NAT and routing require Layer 3.",
  "check": [
   [
    "Which interface type provides visibility only and can never block traffic?",
    "Tap, because it receives a mirrored copy of traffic from a SPAN port and is not in the forwarding path."
   ],
   [
    "What does LACP add to an aggregate Ethernet group?",
    "It negotiates the bundle with the peer switch and detects failed or misconnected member links so they are removed from use."
   ],
   [
    "How do you carry VLAN 30 and VLAN 40 on one Layer 3 port with separate zones?",
    "Create two Layer 3 subinterfaces (for example ethernet1/2.30 and .40) with 802.1Q tags 30 and 40, each with its own IP and zone."
   ]
  ]
 },
 {
  "t": "Security zones: zone types, one zone per interface, intrazone vs interzone default rules, User-ID enablement per zone",
  "body": [
   "A security zone is a named group of interfaces that share the same trust level, such as Trust, Untrust or DMZ. Palo Alto security policy is written between zones, not between interfaces, so zones are the backbone of every rule you will write. Traffic is always classified by a source zone (where it entered) and a destination zone (where it will leave).",
   "Zones have types that must match the interfaces placed in them: Layer 3, Layer 2, Virtual Wire, Tap, Tunnel and External. A Layer 3 interface can only join a Layer 3 zone, a vwire interface only a Virtual Wire zone, and so on. The External type is special: it exists only on multi-vsys firewalls and represents another virtual system, used for traffic passing between vsys. The Tunnel zone type is used with tunnel content inspection, where the firewall inspects the traffic carried inside a cleartext tunnel.",
   "The key rule is that an interface (or subinterface) belongs to exactly one zone, while a zone can contain many interfaces. That is why subinterfaces are so useful: two VLANs on the same port can sit in different zones. Traffic entering and leaving interfaces in the same zone is intrazone; traffic crossing from one zone to a different zone is interzone.",
   "At the bottom of every rulebase are two predefined rules. `intrazone-default` allows traffic within the same zone, and `interzone-default` denies traffic between different zones. Neither logs by default. You can override them (select the rule and click Override) to enable logging or attach security profiles, which is a common best practice so that denied interzone traffic shows up in the Traffic log. You cannot delete them, and any rule you write above them takes precedence because the rulebase is evaluated top-down, first match wins.",
   "Zones also control where User-ID runs. In the zone settings there is an 'Enable User Identification' checkbox. When it is enabled, the firewall maps IP addresses from that zone to usernames, so source users appear in logs and user or group based rules can match. Enable it only on internal zones where your users actually are. Enabling it on an Internet-facing zone is a known risk: it can cause the firewall to attempt probing or exposing User-ID information for untrusted addresses. You can further narrow mapping with include and exclude network lists.",
   "Zones are also where zone protection profiles attach, and they are the unit that logs and reports summarize by. In the web interface you create them under Network > Zones and assign interfaces either there or on the interface itself."
  ],
  "terms": [
   [
    "Security zone",
    "A logical group of interfaces with the same trust level that security and NAT policy reference."
   ],
   [
    "intrazone-default",
    "The predefined rule that allows traffic whose source and destination zone are the same; not logged by default."
   ],
   [
    "interzone-default",
    "The predefined rule that denies traffic between different zones; not logged by default."
   ],
   [
    "External zone",
    "A zone type used on multi-vsys firewalls to represent another virtual system for inter-vsys traffic."
   ]
  ],
  "example": "Two web servers sit in the DMZ zone on different subinterfaces. Traffic between them is intrazone and allowed by default, which worries the auditor. You add an explicit DMZ-to-DMZ rule allowing only the needed application, then a deny rule below it with logging, so lateral movement between the servers is restricted and visible.",
  "tip": "Remember the defaults: intrazone allowed, interzone denied, neither logged. Exam questions often ask why denied traffic does not appear in the Traffic log; the answer is that interzone-default must be overridden to enable logging.",
  "check": [
   [
    "Can one Layer 3 interface belong to two zones?",
    "No. Each interface or subinterface belongs to exactly one zone; use subinterfaces if you need different zones on one port."
   ],
   [
    "Where should 'Enable User Identification' be turned on?",
    "Only on trusted internal zones where users originate, never on Internet-facing untrusted zones."
   ],
   [
    "What happens to traffic from Trust to DMZ if no rule matches it?",
    "It hits interzone-default and is denied, without logging unless the rule is overridden."
   ]
  ]
 },
 {
  "t": "Zone protection profiles (flood, reconnaissance, packet-based) and interface management profiles",
  "body": [
   "A zone protection profile defends a whole zone against floods, scans and malformed packets. You attach it to the ingress zone (typically the Internet-facing zone) under Network > Zones, and the firewall enforces it before security policy is even evaluated. That early placement is why it is cheap and effective: bad traffic is dropped before it consumes session resources.",
   "Flood protection covers SYN, UDP, ICMP, ICMPv6 and 'other IP' floods. Each uses three thresholds measured in new connections per second to the zone: Alarm (log an alarm), Activate (start dropping) and Maximum (drop everything above this rate). For UDP, ICMP and other floods the drop mechanism is Random Early Drop (RED), which discards an increasing share of packets as the rate climbs. For SYN floods you can choose RED or SYN cookies. With SYN cookies the firewall answers the SYN on the server's behalf and only forwards the connection once the client completes the handshake, so legitimate users still connect. SYN cookies is the usual recommendation. Base thresholds on measured normal peaks rather than guessing.",
   "Reconnaissance protection detects TCP port scans, UDP port scans and host sweeps (one source probing many addresses). For each you set an interval and threshold, and an action: allow, alert, block, or block-ip for a set duration. You can exclude trusted scanners, such as your own vulnerability scanner, by source address.",
   "Packet-based attack protection drops traffic that is malformed or abused. Examples include spoofed IP addresses (source not reachable via the arriving interface), IP options like strict or loose source routing, fragmented traffic if you choose, TCP SYN packets carrying data, mismatched overlapping TCP segments, TCP split handshakes, oversized ICMP and ping of death, and suspicious IPv6 extension headers. Many of these are off by default because they can break unusual but legitimate applications, so test before enabling.",
   "Do not confuse zone protection with DoS protection policy. Zone protection is aggregate and zone-wide; DoS protection policy with DoS profiles protects specific critical hosts with classified (per-IP) or aggregate thresholds. Best practice uses both.",
   "An interface management profile is unrelated to attacks from the network side; it controls which management services a data-plane interface answers. Services include ping, SSH, HTTPS, HTTP, Telnet, SNMP, Response Pages (needed for Authentication Portal and URL block pages), User-ID and User-ID syslog listeners, among others, plus a Permitted IP Addresses list. You create it under Network > Network Profiles > Interface Mgmt and attach it on the interface's Advanced tab. Without a profile, a data interface does not even answer ping. Never attach a profile allowing HTTPS or SSH to an untrusted Internet-facing interface."
  ],
  "terms": [
   [
    "Zone protection profile",
    "A profile applied to an ingress zone that defends against floods, reconnaissance and malformed packets before policy lookup."
   ],
   [
    "SYN cookies",
    "A SYN flood defense where the firewall completes the handshake on the server's behalf and forwards only validated connections."
   ],
   [
    "Random Early Drop (RED)",
    "A flood defense that drops a growing share of packets once the activate threshold is exceeded."
   ],
   [
    "Interface management profile",
    "A profile that controls which management and response services (ping, SSH, HTTPS, response pages and more) a data interface accepts."
   ]
  ],
  "example": "After a port scan from the Internet shows up in threat logs, you apply a zone protection profile to the Untrust zone with TCP port scan detection set to block-ip for an hour, SYN flood protection using SYN cookies, and spoofed-IP drops. Your internal vulnerability scanner's address is added as an exclusion so it keeps working.",
  "tip": "Zone protection attaches to the ingress zone, not the destination. If a question asks why an interface will not answer ping or show a block page, look for a missing interface management profile or a missing Response Pages option.",
  "check": [
   [
    "What are the three flood thresholds?",
    "Alarm, Activate and Maximum, measured in new connections per second to the zone."
   ],
   [
    "How does zone protection differ from DoS protection policy?",
    "Zone protection is zone-wide and applied at ingress; DoS protection policy targets specific hosts with rules and DoS profiles."
   ],
   [
    "Where do you allow ping on a data interface?",
    "In an interface management profile with ping enabled, attached to the interface's Advanced settings."
   ]
  ]
 },
 {
  "t": "Routing: virtual routers vs logical routers (Advanced Routing Engine), static routes, OSPF, BGP, administrative distance defaults, ECMP",
  "body": [
   "A PAN-OS firewall routes with a routing instance to which Layer 3 interfaces are assigned. For many years that instance has been the virtual router (VR); a new firewall ships with one called `default`. You can create more VRs to separate routing domains, and routes can point to another VR as the next hop. Each VR has its own routing table (RIB) and forwarding table (FIB).",
   "Newer PAN-OS releases add the Advanced Routing Engine on supported platforms. When you enable Advanced Routing (in the management settings, followed by a commit and reboot), virtual routers are replaced by logical routers. The protocols are the same in spirit, but configuration is reorganized: route filtering, redistribution and BGP/OSPF tuning use reusable routing profiles, filters and route maps, closer to how traditional routers are configured. Enabling it changes how the routing configuration is structured, so back up and plan the change first. On the exam, know that 'logical router' means the Advanced Routing Engine and 'virtual router' means the legacy engine.",
   "Static routes have a destination prefix, an egress interface and/or next hop, an administrative distance and a metric. Optional path monitoring pings an address and withdraws the route when it fails, which lets a backup static route take over. OSPF (Open Shortest Path First) is a link-state interior protocol: you define the router ID, areas (area 0 as backbone, plus stub or NSSA areas), and which interfaces participate, then check neighbors reach Full state. BGP (Border Gateway Protocol) is used toward ISPs and between large networks: you set the local AS, peer groups and peers with their AS numbers, and import/export or redistribution rules to control what is advertised.",
   "When the same prefix is learned from multiple sources, the firewall prefers the longest prefix match first, then the lowest administrative distance (AD), then the lowest metric. The PAN-OS default AD values are: static 10, eBGP 20, OSPF internal 30, RIP 120, OSPF external 110 and iBGP 200. Notice that OSPF internal (30) differs from Cisco's 110, a frequent exam trap. You can change AD per route or per protocol.",
   "Equal-cost multipath (ECMP) lets the firewall install several equal-cost routes to the same destination and share sessions across them. You enable it on the router and pick a load-balancing method: IP Modulo, IP Hash, Weighted Round Robin or Balanced Round Robin. Balancing is per session, so packets of one session stay on one path. The Symmetric Return option makes return traffic leave through the interface on which the session arrived.",
   "To troubleshoot, use Network > Virtual Routers (or Logical Routers) > More Runtime Stats, or CLI commands such as `show routing route` and `test routing fib-lookup` on the legacy engine. The Advanced Routing Engine has its own `show advanced-routing` command family."
  ],
  "terms": [
   [
    "Virtual router",
    "The legacy PAN-OS routing instance holding interfaces, static routes and dynamic protocols with its own routing table."
   ],
   [
    "Logical router",
    "The routing instance used when the Advanced Routing Engine is enabled, configured with reusable routing profiles and route maps."
   ],
   [
    "Administrative distance",
    "A preference value for route sources; lower wins when prefixes are equal length. PAN-OS defaults include static 10 and OSPF internal 30."
   ],
   [
    "ECMP",
    "Equal-cost multipath: installing multiple equal routes and balancing sessions across them."
   ]
  ],
  "example": "A branch firewall learns 10.20.0.0/16 from OSPF and also has a static route for 10.20.0.0/16 via a backup circuit. You set the static route's AD to 200 so OSPF (internal, AD 30) is preferred, and the floating static route only appears in the forwarding table if OSPF loses the prefix.",
  "tip": "Memorize the PAN-OS AD defaults, especially OSPF internal 30 and iBGP 200, and remember that longest prefix match beats AD. Logical router always implies the Advanced Routing Engine.",
  "check": [
   [
    "What must you do to switch from virtual routers to logical routers?",
    "Enable Advanced Routing in the device management settings, commit and reboot, on a platform and release that supports it."
   ],
   [
    "Which wins: a /24 learned by iBGP or a /16 static route, for a destination inside the /24?",
    "The /24, because longest prefix match is evaluated before administrative distance."
   ],
   [
    "Is ECMP load balancing per packet or per session?",
    "Per session; all packets of a session use the same path."
   ]
  ]
 },
 {
  "t": "Policy-based forwarding with path monitoring; service routes; DHCP server/relay and DNS proxy",
  "body": [
   "Normally the firewall forwards by destination using the routing table. Policy-based forwarding (PBF) overrides that for traffic matching specific criteria, for example sending guest traffic out a cheap broadband link while corporate traffic uses MPLS. PBF rules live under Policies > Policy Based Forwarding and are evaluated before the route lookup for a new session.",
   "A PBF rule matches on source zone or interface, source address, source user, destination address, application and service. Its action is Forward (with an egress interface and optional next hop), Forward to VR or Forward to vsys, Discard, or No PBF (use normal routing). Application-based PBF has a catch: PBF is decided on the first packet, before App-ID has identified the application. The firewall solves this with an application cache, so the first session of an application follows the routing table and later sessions match the PBF rule once the app is cached. Use service or address criteria where you can.",
   "Path monitoring makes PBF safe. You add a monitor profile and a monitored IP (often the next hop or something beyond it). If pings fail, the action Fail Over disables the rule so traffic falls back to the routing table, while Wait Recover keeps using the rule until the path returns. Symmetric Return, available on the forward action, makes replies to sessions that arrived on a particular interface leave by that same interface and next hop, which is important with two ISPs so return traffic does not exit the wrong provider.",
   "Service routes answer a different question: which interface does the firewall's own management plane use to reach services like DNS, NTP, software updates, syslog, LDAP, RADIUS or Panorama? By default everything leaves the dedicated MGT port. Under Device > Setup > Services > Service Route Configuration you can pick a data interface and source address per service, which is common when the MGT network has no Internet access.",
   "On Layer 3 interfaces the firewall can act as a DHCP server, handing out addresses from a pool along with gateway, DNS and other options, and can inherit DNS settings from an upstream DHCP client interface. Or it can act as a DHCP relay, forwarding client broadcasts to a central DHCP server. An interface cannot be both server and relay. Configure these under Network > DHCP.",
   "A DNS proxy (Network > DNS Proxy) makes a firewall interface answer DNS queries for clients. It forwards queries to primary and secondary servers, can send specific domains to specific servers using domain rules (split DNS), can hold static FQDN-to-IP entries, and caches answers. It is handy for branches and is required by some features such as the web proxy."
  ],
  "terms": [
   [
    "Policy-based forwarding (PBF)",
    "Rules that forward matching traffic by criteria like source, user or application instead of the routing table."
   ],
   [
    "Symmetric return",
    "A PBF option that sends replies back out the same interface and next hop on which the original traffic arrived."
   ],
   [
    "Service route",
    "A setting that makes a management-plane service such as DNS, updates or syslog source its traffic from a data interface instead of MGT."
   ],
   [
    "DNS proxy",
    "A firewall feature that answers client DNS queries, forwards them to chosen servers per domain and caches the results."
   ]
  ],
  "example": "A retail branch has MPLS and a broadband link. A PBF rule sends the Guest zone to the broadband interface with path monitoring on the ISP gateway set to Fail Over. When the broadband link drops, the rule disables itself and guest traffic follows the default route over MPLS until the link recovers.",
  "tip": "PBF is evaluated before routing, but app-based PBF only applies after the app is in the application cache, so the first session uses the routing table. Service routes are for firewall-originated traffic, not user traffic.",
  "check": [
   [
    "Why might the first session of an application ignore an app-based PBF rule?",
    "The PBF decision is made on the first packet before App-ID identifies the app; only later sessions match via the application cache."
   ],
   [
    "Your MGT port has no Internet access and dynamic updates fail. What do you configure?",
    "A service route so the update service (Palo Alto Networks services) uses a data interface with Internet access."
   ],
   [
    "What does Fail Over do in PBF path monitoring?",
    "It disables the PBF rule when monitoring fails so traffic falls back to the normal routing table."
   ]
  ]
 },
 {
  "t": "NAT on Layer 3 interfaces: source NAT (DIPP, dynamic IP, static), destination NAT, U-turn NAT, pre-NAT IP vs post-NAT zone in security rules",
  "body": [
   "Network Address Translation (NAT) rewrites addresses as traffic crosses the firewall. PAN-OS handles NAT in its own rulebase (Policies > NAT), separate from security rules, and evaluates it top-down, first match. To use NAT you need Layer 3 interfaces (virtual wire supports some NAT too, but the exam focuses on Layer 3).",
   "Source NAT changes the source address, usually so private hosts can reach the Internet. Dynamic IP and Port (DIPP) is the everyday choice: many internal hosts share one public address (often the egress interface address), and the firewall keeps them apart by translating source ports. Dynamic IP translates each host one-to-one to the next free address in a pool without changing ports; when the pool runs out, new sessions fail unless you configure a fallback to DIPP. Static IP translates a fixed address to a fixed address, and the Bi-directional option also creates the matching inbound translation.",
   "Destination NAT changes the destination address, typically to publish an internal server. A rule matching the server's public IP translates it to the private address, optionally with port translation (public 443 to private 8443). Destination translation can also target an FQDN or distribute across several addresses.",
   "The most tested concept is how zones and addresses line up. When a packet arrives, the firewall determines the source zone from the ingress interface, then does a route lookup on the original (pre-NAT) destination to find the destination zone, and matches NAT policy with those values. Then security policy is checked using the pre-NAT IP addresses and the post-NAT zone. For an inbound web server: the NAT rule is from Untrust to Untrust (the public IP routes toward the Untrust interface), destination the public IP, translated to 10.1.1.10. The security rule is from Untrust to DMZ (post-NAT zone), destination the public IP (pre-NAT address).",
   "U-turn NAT solves internal users reaching an internal server by its public IP. Without it, the request goes to the firewall, is translated to the server, and the server replies directly to the user, bypassing the firewall and breaking the session. The fix is a NAT rule from Trust to Untrust (the route lookup for the public IP points to Untrust), destination the public IP, translated to the server, plus source translation to the firewall's interface so replies come back through the firewall. Split DNS that hands internal clients the private address is often a cleaner alternative.",
   "Verify with the Traffic log's NAT columns, or from the CLI with `test nat-policy-match` and `test security-policy-match`, and `show running nat-policy`."
  ],
  "terms": [
   [
    "DIPP",
    "Dynamic IP and Port source NAT: many hosts share one or a few addresses with source port translation."
   ],
   [
    "Dynamic IP NAT",
    "Source NAT that maps each host one-to-one to a free pool address without port translation; the pool can be exhausted."
   ],
   [
    "U-turn NAT",
    "NAT that lets internal clients reach an internal server via its public IP by translating destination and source so traffic returns through the firewall."
   ],
   [
    "Post-NAT zone",
    "The zone where the translated destination actually lives, used as the destination zone in security rules."
   ]
  ],
  "example": "A web server at 10.10.10.5 in the DMZ is published as 203.0.113.10. The NAT rule matches Untrust to Untrust, destination 203.0.113.10, translated to 10.10.10.5. The security rule allows Untrust to DMZ, destination 203.0.113.10, application web-browsing and ssl. Written with 10.10.10.5 as the destination, the security rule would never match.",
  "tip": "Security rules use pre-NAT addresses and post-NAT zone. NAT rules use pre-NAT addresses and the zone found by routing the pre-NAT destination. Almost every NAT exam question turns on this.",
  "check": [
   [
    "Which source NAT type can run out of addresses?",
    "Dynamic IP, because it maps hosts one-to-one to pool addresses without port translation."
   ],
   [
    "In the security rule for an inbound destination NAT, which destination address and zone do you use?",
    "The public (pre-NAT) address and the DMZ (post-NAT) zone."
   ],
   [
    "Why does U-turn NAT also translate the source?",
    "So the server replies to the firewall rather than directly to the internal client, keeping the session symmetric."
   ]
  ]
 },
 {
  "t": "High availability: active/passive vs active/active, HA1/HA2/HA3 and backup links, priority and preemption, link and path monitoring, floating IPs",
  "body": [
   "High availability (HA) pairs two identical firewalls so that if one fails, the other carries on with minimal disruption. Both peers must be the same model, run the same PAN-OS and content versions, and have matching licenses. HA is configured under Device > High Availability.",
   "In active/passive mode, one firewall handles all traffic while the other stays synchronized and ready. On failover, the passive peer takes over the same interface IP and MAC addresses, so neighbors barely notice. It works with Layer 3, Layer 2 and virtual wire deployments and is the recommended mode for most designs because it is simple to troubleshoot. In active/active mode, both peers process traffic at once. It supports only Layer 3 and virtual wire and exists mainly for asymmetric routing designs where traffic may arrive on either firewall. It adds concepts such as the session owner (the peer that does Layer 7 inspection), the session setup peer, and floating IP addresses. It does not double throughput guarantees, because each peer must still be able to carry the full load after a failure.",
   "Peers talk over dedicated links. HA1 is the control link: hellos, heartbeats, HA state and management-plane configuration synchronization. HA2 is the data link: it synchronizes sessions, forwarding tables, IPsec security associations and ARP tables, so existing sessions survive failover. HA2 can use Ethernet, IP or UDP transport. HA3 exists only in active/active and forwards packets between peers for session setup and asymmetric traffic; it is a Layer 2 link and benefits from jumbo frames. HA1 backup and HA2 backup links provide redundancy for the control and data links, which avoids split brain, where both peers believe they should be active because the only HA1 link failed.",
   "Device priority decides which peer should be active; the lower number wins. Preemption lets the higher-priority firewall take the active role back after it recovers. Preemption only works if it is enabled on both peers, and it is off by default, so the failed-over peer normally stays active.",
   "Failover triggers include heartbeat loss and monitoring. Link monitoring watches physical interfaces grouped into link groups; the failure condition 'any' fails over if one link in the group goes down, 'all' only when every link fails. Path monitoring pings destination IPs, such as the upstream router, and fails over when they become unreachable. Together they catch failures a heartbeat would miss, such as a dead switch port.",
   "Floating IP addresses belong to active/active. Instead of one peer owning the interface address, a floating IP is bound to a device ID and moves to the surviving peer on failure. For load sharing, you can use two floating IPs (one active on each peer) or ARP load-sharing, where both peers answer for one IP. Check status in the dashboard HA widget or with `show high-availability state`."
  ],
  "terms": [
   [
    "HA1",
    "The HA control link carrying hellos, heartbeats, state and configuration synchronization."
   ],
   [
    "HA2",
    "The HA data link that synchronizes sessions, forwarding tables, IPsec SAs and ARP tables."
   ],
   [
    "HA3",
    "The active/active-only link that forwards packets between peers for session setup and asymmetric flows."
   ],
   [
    "Preemption",
    "The option that lets the higher-priority (lower number) peer reclaim the active role; must be enabled on both peers."
   ],
   [
    "Floating IP",
    "An active/active address bound to one peer that moves to the other peer on failure."
   ]
  ],
  "example": "In an active/passive pair, the upstream switch port for the active firewall's Untrust interface dies but the firewall stays up. Because you configured a link group containing ethernet1/1 with the 'any' condition, the firewall fails over, the passive peer becomes active with the same IP and MAC, and synchronized sessions over HA2 continue.",
  "tip": "Lower priority number wins, and preemption must be on for both peers. Active/active supports only Layer 3 and virtual wire. HA3 appears only in active/active questions.",
  "check": [
   [
    "Which HA link keeps existing sessions alive after failover?",
    "HA2, because it synchronizes the session table and related state between peers."
   ],
   [
    "Firewall A (priority 50) failed and recovered but did not become active again. Why?",
    "Preemption is not enabled on both peers, so the current active peer keeps the role."
   ],
   [
    "Why add an HA1 backup link?",
    "To avoid split brain if the only HA1 link fails and both peers would otherwise assume they should be active."
   ]
  ]
 },
 {
  "t": "Site-to-site IPsec: IKE gateway, IKE and IPsec crypto profiles, tunnel interfaces, proxy IDs, tunnel monitoring",
  "body": [
   "Palo Alto firewalls build route-based site-to-site VPNs. Instead of a policy saying 'encrypt traffic from A to B', you create a tunnel interface and route the remote networks to it. Anything routed into the tunnel is encrypted with IPsec. This keeps VPN logic in routing, where static routes or dynamic protocols can steer traffic.",
   "The building blocks are configured in order. First, a tunnel interface (Network > Interfaces > Tunnel, for example `tunnel.10`) assigned to a virtual or logical router and a security zone; an IP address on it is optional but required for tunnel monitoring or dynamic routing over the tunnel. Second, an IKE crypto profile for phase 1: Diffie-Hellman (DH) group, encryption algorithm, authentication (hash) algorithm and key lifetime. Third, an IPsec crypto profile for phase 2: ESP (or AH), encryption, authentication, DH group for perfect forward secrecy (PFS) and lifetime. Both peers must agree on these values.",
   "Next is the IKE gateway (Network > Network Profiles > IKE Gateways). It defines the IKE version (IKEv1, IKEv2 or IKEv2 preferred), the local interface and IP, the peer address (static IP, FQDN or dynamic), authentication by pre-shared key or certificate, local and peer identification, the IKE crypto profile and options like NAT traversal and dead peer detection. Finally, the IPsec tunnel object (Network > IPsec Tunnels) ties together the tunnel interface, the IKE gateway and the IPsec crypto profile.",
   "Proxy IDs define which local and remote subnets the phase 2 security association covers. A PAN-OS-to-PAN-OS tunnel does not need them, because both sides use 0.0.0.0/0 by default. But when the peer is a policy-based device, you must enter proxy IDs that exactly mirror the peer's configured local and remote networks, one per subnet pair. A mismatch is the classic cause of phase 1 coming up while phase 2 fails.",
   "Tunnel monitoring sends pings through the tunnel to a destination IP on the far side, sourced from the tunnel interface IP. A monitor profile chooses what happens on failure: Wait Recover keeps the tunnel and waits, while Fail Over lets routing or PBF move traffic to a backup path. Dead peer detection works at the IKE level; tunnel monitoring proves traffic actually passes.",
   "Do not forget policy and routing. You need a route for the remote subnets pointing to the tunnel interface and security rules between the internal zone and the VPN zone. Troubleshoot with the IPsec Tunnels page status lights, the System log (IKE messages), and CLI commands such as `show vpn ike-sa`, `show vpn ipsec-sa` and `test vpn ike-sa gateway <name>`."
  ],
  "terms": [
   [
    "IKE gateway",
    "The object defining the VPN peer, local interface, IKE version, authentication and IKE crypto profile for phase 1."
   ],
   [
    "IPsec crypto profile",
    "Phase 2 settings: ESP or AH, encryption, authentication, PFS DH group and lifetime."
   ],
   [
    "Proxy ID",
    "A local/remote subnet pair that defines a phase 2 SA, required when the peer uses policy-based VPN."
   ],
   [
    "Tunnel monitoring",
    "Pings through the tunnel to a remote IP that detect a broken data path and trigger wait-recover or fail-over."
   ]
  ],
  "example": "You connect a PAN-OS firewall to a partner's policy-based VPN device protecting 172.16.5.0/24 and 172.16.6.0/24. Phase 1 establishes, but only one subnet works. The System log shows a phase 2 proposal mismatch. Adding two proxy IDs, one for each remote subnet paired with your local 10.1.0.0/16, brings both SAs up.",
  "tip": "Phase 1 up but phase 2 down with a policy-based peer almost always means proxy IDs. Remember the tunnel interface needs a zone and router, and traffic still needs security rules and a route.",
  "check": [
   [
    "Which object ties the tunnel interface, IKE gateway and IPsec crypto profile together?",
    "The IPsec tunnel configuration under Network > IPsec Tunnels."
   ],
   [
    "When are proxy IDs required?",
    "When the peer is a policy-based VPN device; they must mirror the peer's local and remote subnet pairs."
   ],
   [
    "What does tunnel monitoring require on the tunnel interface?",
    "An IP address, used as the source of the monitoring pings."
   ]
  ]
 },
 {
  "t": "Quantum-resistant IKEv2 VPNs (post-quantum preshared keys) and GRE tunnels",
  "body": [
   "Today's VPNs use Diffie-Hellman key exchange, which a large enough quantum computer could break. The worry is 'harvest now, decrypt later': an attacker records encrypted VPN traffic today and decrypts it years from now. Quantum-resistant VPN features in recent PAN-OS releases address this for IKEv2 site-to-site tunnels.",
   "The approach this topic names is post-quantum preshared keys (PPKs), standardized in RFC 8784 for IKEv2. Both peers are configured with the same high-entropy secret key and a matching key ID, in addition to normal authentication. The PPK is mixed into the key derivation for the IPsec keys. Even if an attacker later breaks the Diffie-Hellman exchange, they still cannot derive the session keys without the PPK, which was never sent over the wire. PPKs work only with IKEv2, not IKEv1, and both peers must support the extension. You configure them on the IKE gateway's advanced IKEv2 options, with a negotiation setting that decides whether the tunnel requires the PPK or can fall back to a normal exchange for peers that do not support it. Requiring it is stronger but will fail against a non-supporting peer.",
   "Newer releases also add hybrid key exchange, where a post-quantum key encapsulation mechanism is combined with classical Diffie-Hellman using IKEv2 extensions for multiple key exchanges. The principle to remember is 'hybrid': the result is at least as strong as the stronger of the two methods. Check the release notes for which algorithms your PAN-OS version supports rather than assuming.",
   "Practical guidance: use strong symmetric algorithms such as AES-256 with SHA-256 or better, because symmetric crypto with large keys is considered much less exposed to quantum attacks. Manage PPKs like any secret, rotate them, and never reuse them across unrelated peers.",
   "Generic Routing Encapsulation (GRE) is a simple, unencrypted tunneling protocol (IP protocol 47) that wraps packets inside a new IP header. It is used to reach partners or cloud services that require GRE, and to carry traffic such as routing protocol exchanges to a peer. On PAN-OS you configure it under Network > GRE Tunnels: a tunnel interface (with zone and router), the local interface and address, the peer address, TTL, an optional Copy ToS setting, and keepalives that mark the tunnel down if the peer stops responding. Then you route traffic to the tunnel interface as with IPsec.",
   "Because GRE provides no confidentiality or integrity, do not use it over untrusted networks for sensitive data unless something else protects it. Security policy still applies to traffic entering and leaving the GRE tunnel interface's zone, and you need a rule permitting GRE between the tunnel endpoints."
  ],
  "terms": [
   [
    "Post-quantum preshared key (PPK)",
    "An extra shared secret mixed into IKEv2 key derivation (RFC 8784) so session keys resist future quantum attacks on Diffie-Hellman."
   ],
   [
    "Harvest now, decrypt later",
    "The threat of recording encrypted traffic today to decrypt it once quantum computers can break the key exchange."
   ],
   [
    "GRE",
    "Generic Routing Encapsulation, an unencrypted tunneling protocol (IP protocol 47) that encapsulates packets in a new IP header."
   ],
   [
    "Hybrid key exchange",
    "Combining a classical and a post-quantum key exchange so the result is at least as strong as the stronger one."
   ]
  ],
  "example": "A bank's data center-to-DR tunnel carries replication data that must stay confidential for decades. Both sides run IKEv2 on PAN-OS versions that support PPKs, so the engineers add the same randomly generated PPK and key ID on each IKE gateway and set the negotiation to require it. Recorded traffic is now protected even if Diffie-Hellman is broken later.",
  "tip": "PPKs mean IKEv2 only and must match on both peers. GRE is not encryption; if a question needs confidentiality over the Internet, GRE alone is the wrong answer.",
  "check": [
   [
    "Why does a PPK protect against future quantum attacks?",
    "It is mixed into the IPsec key derivation but never transmitted, so breaking Diffie-Hellman alone does not reveal the keys."
   ],
   [
    "Can you use a PPK with an IKEv1 gateway?",
    "No, PPKs are an IKEv2 extension."
   ],
   [
    "What does a GRE keepalive do?",
    "It checks the peer is responding and marks the tunnel down if it is not, so routing can react."
   ]
  ]
 },
 {
  "t": "GlobalProtect: portal, gateways (internal/external), authentication, connect methods (user-logon, pre-logon, on-demand), split tunneling, HIP objects and profiles, IPsec vs SSL tunnels",
  "body": [
   "GlobalProtect extends firewall policy to users wherever they are. It has three parts: the portal, one or more gateways, and the GlobalProtect app on endpoints. The portal is the first contact point: the app authenticates to it and downloads its configuration, including the list of gateways, connect method, split tunnel settings and HIP collection settings. The portal is configured under Network > GlobalProtect > Portals on a Layer 3 interface or loopback with an SSL/TLS service profile.",
   "Gateways enforce policy. External gateways accept tunnels from remote users over the Internet; the app picks the best one by priority and response time. Internal gateways sit inside the network: users on the LAN connect to them without a tunnel (or optionally with one) so the firewall learns their User-ID and host information. The app decides whether it is inside or outside using internal host detection, a reverse DNS lookup of a known internal IP that only resolves correctly on the corporate network.",
   "Authentication uses authentication profiles tied to LDAP, RADIUS, SAML, Kerberos and others, client certificates via a certificate profile, or both. You can require authentication at the portal and gateway separately and use authentication override cookies so users are not prompted twice.",
   "Connect methods set when the tunnel comes up. User-logon (Always On) connects automatically after the user signs in to the endpoint, giving continuous protection. Pre-logon connects before the user signs in, authenticating the machine with a certificate, so login scripts, password resets and domain authentication work for remote laptops; after user login it transitions to the user's tunnel. On-demand connects only when the user clicks Connect, suited to occasional access. Pre-logon then On-demand is also available.",
   "Split tunneling decides what goes through the tunnel. By default all traffic does (full tunnel). With split tunneling you include or exclude routes, domains or applications on the gateway's client settings, for example excluding video conferencing traffic to save bandwidth. Full tunnel gives the most visibility and control.",
   "Host Information Profile (HIP) checks let policy consider endpoint posture. The app sends HIP data such as OS version, patch level, disk encryption and anti-malware status. HIP objects define individual criteria, and HIP profiles combine objects with AND, OR and NOT logic. HIP profiles are then used as a match condition in security rules, for example allowing finance servers only from encrypted, patched laptops. HIP checks require a GlobalProtect subscription.",
   "The tunnel itself prefers IPsec, which is faster and uses UDP, and falls back to SSL over TCP 443 if IPsec is blocked or disabled. SSL is more likely to pass restrictive hotel or guest networks but performs worse for real-time traffic."
  ],
  "terms": [
   [
    "Portal",
    "The GlobalProtect component that authenticates the app and delivers its configuration and gateway list."
   ],
   [
    "Internal gateway",
    "A gateway inside the network used for User-ID and HIP enforcement, often without a tunnel."
   ],
   [
    "Pre-logon",
    "A connect method that establishes the tunnel with a machine certificate before the user signs in."
   ],
   [
    "HIP profile",
    "A combination of HIP objects evaluated as a match condition in security policy."
   ]
  ],
  "example": "Help desk calls rise because remote users cannot reset expired domain passwords at the Windows login screen. You deploy machine certificates and switch the portal's agent configuration to pre-logon. Laptops now reach the domain controllers through the tunnel before sign-in, and password changes work from home.",
  "tip": "Portal configures, gateway enforces. Pre-logon uses machine certificates before user login. IPsec is preferred, SSL is the fallback. HIP objects are criteria; HIP profiles are what security rules reference.",
  "check": [
   [
    "How does the app decide whether it is on the internal network?",
    "Internal host detection: a reverse DNS lookup of a configured internal IP that returns the expected hostname only when inside."
   ],
   [
    "Which object do you place in a security rule to require disk encryption?",
    "A HIP profile that references a HIP object checking disk encryption."
   ],
   [
    "Why would a tunnel use SSL instead of IPsec?",
    "IPsec is blocked or unavailable on the client's network, so the app falls back to SSL over TCP 443."
   ]
  ]
 },
 {
  "t": "Administrator accounts: dynamic roles vs admin role profiles, API and CLI permissions",
  "body": [
   "Every person or system that manages the firewall should have its own administrator account with the least privilege needed. Accounts are created under Device > Administrators, and each account has an authentication method and an administrative role. The role decides what the account can see and change.",
   "Dynamic roles are built in and cover common needs: Superuser (full access, including creating other admins), Superuser (read-only), Device Administrator (full access to one firewall except managing admins and some settings), Device Administrator (read-only), and on multi-vsys firewalls Virtual System Administrator and its read-only version, which restrict the admin to chosen vsys. They are called dynamic because Palo Alto updates them automatically when new features arrive in a PAN-OS release, so an admin with a dynamic role gets access to new menus without you editing anything.",
   "Admin role profiles are custom roles you create under Device > Admin Roles. They are either device-scoped or vsys-scoped. For each area of the web interface you set Enable, Read Only or Disable, for example granting full access to Monitor and Policies but no access to Device. The profile also has separate tabs for the XML API, the REST API and the command line. The trade-off is maintenance: when an upgrade adds new features, custom profiles are not updated, so you must review and adjust them.",
   "CLI permission in a role profile is a single choice: none, superuser, superreader, deviceadmin, devicereader (and vsys equivalents on multi-vsys systems). Setting it to none blocks SSH and console management for that role even if the web interface is allowed. XML API permissions are set per request type, such as report, log, configuration, operational requests, commit, User-ID agent, export and import. REST API permissions are set per resource. This granularity is how you build API-only accounts: disable all web UI and CLI access and enable only the API types a script needs.",
   "Authentication for admins can be local (password stored on the firewall, with password complexity and password profiles for expiry) or external through an authentication profile, such as RADIUS or SAML. With RADIUS, TACACS+ and SAML you can even assign the role and access domain from the server using vendor-specific attributes, so accounts need not exist locally.",
   "Track what admins do in the Config log, which records who changed what, and in the System log for logins. Enable lockout settings in authentication profiles so repeated failures lock the account."
  ],
  "terms": [
   [
    "Dynamic role",
    "A built-in admin role such as Superuser or Device Administrator that is updated automatically with new features."
   ],
   [
    "Admin role profile",
    "A custom role defining per-area web UI, XML API, REST API and CLI permissions; must be maintained manually after upgrades."
   ],
   [
    "superreader",
    "A CLI role level that allows read-only access to the full CLI."
   ],
   [
    "Vsys administrator",
    "A role restricted to managing specific virtual systems on a multi-vsys firewall."
   ]
  ],
  "example": "A monitoring script only needs to pull threat logs. You create an admin role profile with all web UI areas disabled, CLI set to none, and only the XML API Log type enabled, then create an account using that profile and generate an API key for it. If the key leaks, it cannot change configuration.",
  "tip": "Dynamic roles update automatically, custom admin role profiles do not. If a question mentions granular control, API-only access, or disabling CLI, the answer is an admin role profile.",
  "check": [
   [
    "Why might an admin with a custom role not see a new feature after an upgrade?",
    "Custom admin role profiles are not updated automatically; the new area must be enabled in the profile."
   ],
   [
    "How do you stop a role from using SSH while allowing the web UI?",
    "Set the role profile's Command Line option to none."
   ],
   [
    "Which dynamic role cannot create or manage other administrator accounts?",
    "Device Administrator; only Superuser can manage administrators."
   ]
  ]
 },
 {
  "t": "Server profiles (LDAP, RADIUS, TACACS+, SAML, Kerberos), authentication profiles and sequences, MFA",
  "body": [
   "PAN-OS separates 'where is the identity server' from 'how do we authenticate'. A server profile tells the firewall how to reach an external service. An authentication profile says which server profile (or local database) to use for a given login and adds rules like MFA and allow lists. Features such as admin login, GlobalProtect and Authentication Portal then reference the authentication profile.",
   "Server profiles live under Device > Server Profiles. LDAP profiles list servers, the type (Active Directory, eDirectory, Sun or other), base DN, bind DN and password, and whether to use SSL/TLS (LDAPS). They are used both for authentication and for User-ID group mapping. RADIUS profiles hold servers, a shared secret, timeout and retries, and an authentication protocol such as PEAP-MSCHAPv2 or PAP; RADIUS supports challenge-response, which many MFA products use, and can return vendor-specific attributes for admin roles. TACACS+ profiles are similar but encrypt the whole payload and run over TCP, and are popular for device administration. SAML profiles are built by importing the identity provider's (IdP) metadata, including its signing certificate and SSO URL, enabling single sign-on through providers such as Microsoft Entra ID or Okta. Kerberos profiles point to a Key Distribution Center for Kerberos authentication; Kerberos single sign-on for web clients also needs a keytab on the authentication profile.",
   "An authentication profile (Device > Authentication Profile) sets the type (Local Database, LDAP, RADIUS, TACACS+, SAML, Kerberos, Cloud Authentication Service), the server profile, a user domain and username modifier (for example `%USERDOMAIN%\\%USERINPUT%`), an allow list of users or groups, and lockout settings. Its Factors tab enables multi-factor authentication (MFA) by adding MFA server profiles for supported vendors, which prompt for additional factors after the first succeeds.",
   "An authentication sequence is an ordered list of authentication profiles. The firewall tries each in turn until one succeeds. A common use is trying LDAP for employees, then the local database as a break-glass fallback if the directory is unreachable, or trying two domains. You reference a sequence wherever an authentication profile is accepted.",
   "Multi-factor authentication can happen in several places. The simplest is an IdP handling MFA through SAML, or a RADIUS server that performs MFA itself. The firewall can also drive MFA via MFA server profiles in an authentication profile, and Authentication policy can require MFA before users reach sensitive resources, even for non-web applications.",
   "Test with `test authentication authentication-profile <name> username <user>` in the CLI, and review failures in the System and Authentication logs."
  ],
  "terms": [
   [
    "Server profile",
    "Connection settings for an external service such as LDAP, RADIUS, TACACS+, SAML IdP or Kerberos KDC."
   ],
   [
    "Authentication profile",
    "A profile that selects the authentication method and server, username format, allow list, lockout and MFA factors."
   ],
   [
    "Authentication sequence",
    "An ordered list of authentication profiles tried one after another until one succeeds."
   ],
   [
    "TACACS+",
    "A device administration AAA protocol that runs over TCP and encrypts the entire payload."
   ]
  ],
  "example": "Remote admins log in with RADIUS backed by an MFA service, but if the RADIUS servers are unreachable nobody can manage the firewall. You create an authentication sequence that tries the RADIUS profile first and the local database second, and keep one strong local emergency account stored securely.",
  "tip": "Server profile = where; authentication profile = how and who; sequence = try several in order. SAML is configured by importing IdP metadata. RADIUS and SAML IdPs commonly provide MFA.",
  "check": [
   [
    "Which server profile type encrypts the entire packet body and uses TCP?",
    "TACACS+."
   ],
   [
    "What does an authentication sequence do if the first profile's server is unreachable?",
    "It moves on to the next authentication profile in the list."
   ],
   [
    "Which server profile is used for both authentication and group mapping?",
    "LDAP."
   ]
  ]
 },
 {
  "t": "Authentication policy and Authentication Portal",
  "body": [
   "User-ID usually learns who is behind an IP address silently, from domain controllers, GlobalProtect or syslog. Sometimes that is not enough: a contractor's laptop is not on the domain, or a sensitive server should demand fresh proof of identity, possibly with MFA. Authentication policy and the Authentication Portal (formerly called Captive Portal) cover these cases.",
   "Authentication policy (Policies > Authentication) is a rulebase evaluated for traffic before security policy uses the user. Each rule matches source zone, source address, source user (often 'unknown' for unmapped users, or 'known-user' for step-up MFA), destination zone and address, service and URL category. Its action is an authentication enforcement object that picks the method and authentication profile, plus a timeout that decides how long the user stays authenticated before being challenged again.",
   "The enforcement methods are browser-challenge, web-form and no-captive-portal. Browser-challenge uses Kerberos single sign-on (SPNEGO), so domain browsers authenticate transparently without a prompt. Web-form shows a login page, falling back from browser-challenge when SSO fails. No-captive-portal lets matching traffic through without authenticating, useful as an exception rule above broader rules. There are predefined objects such as default-browser-challenge, default-web-form and default-no-captive-portal, and you can create your own to attach an authentication profile with MFA.",
   "The Authentication Portal itself is set up under Device > User Identification > Authentication Portal Settings. Its two modes matter. Transparent mode has the firewall impersonate the original destination website and answer with an authentication challenge; it works for any interface type including virtual wire and Layer 2 but causes certificate warnings unless decryption with a trusted certificate is in place. Redirect mode sends the browser to a firewall Layer 3 interface (the redirect host) with an HTTP 302, which allows session cookies so users are not re-prompted and is required for Kerberos SSO and multi-site designs. Redirect mode needs an interface management profile with Response Pages enabled on the redirect interface, and a DNS name that resolves to it.",
   "Only web traffic can trigger the portal, because the firewall needs a browser to show the page. For HTTPS sites, the firewall must decrypt the session to inject the challenge, so pair authentication rules with a decryption policy. For non-web applications such as SSH to a server, the user first authenticates in a browser, which creates a user mapping and timestamp, and the authentication rule then permits the non-web traffic until the timeout expires. This is how you add MFA in front of legacy protocols.",
   "Results appear in the Authentication log and in Monitor > Logs with the user. Remember that security rules must still allow the traffic; authentication identifies users, it does not grant access by itself."
  ],
  "terms": [
   [
    "Authentication policy",
    "A rulebase that decides which traffic must authenticate, how, and for how long before security policy applies to it."
   ],
   [
    "Authentication enforcement object",
    "The rule action choosing browser-challenge, web-form or no-captive-portal and an authentication profile."
   ],
   [
    "Redirect mode",
    "Authentication Portal mode that redirects users to a firewall Layer 3 interface, supporting session cookies and Kerberos SSO."
   ],
   [
    "Transparent mode",
    "Authentication Portal mode where the firewall impersonates the destination site to present the challenge."
   ]
  ],
  "example": "Guest Wi-Fi users are not on the domain, so their IPs map to unknown. An authentication rule for source user unknown from the Guest zone uses a web-form enforcement object tied to a local guest database. After logging in, a guest's IP maps to their account, and security rules allow them only web browsing.",
  "tip": "Redirect mode needs a Layer 3 interface with Response Pages in its management profile; transparent mode suits vwire and Layer 2. HTTPS triggers require decryption. Authentication policy identifies; security policy still decides allow or deny.",
  "check": [
   [
    "Which enforcement method gives transparent SSO for domain browsers?",
    "browser-challenge, using Kerberos."
   ],
   [
    "Why can't an SSH session trigger the portal directly?",
    "The portal needs a web browser to display the challenge; users authenticate via a browser first and SSH is then allowed until the timeout."
   ],
   [
    "What must the redirect host interface have for redirect mode?",
    "An interface management profile with Response Pages enabled on a Layer 3 interface."
   ]
  ]
 },
 {
  "t": "Virtual systems: vsys creation, interfaces/zones/routers per vsys, shared gateway, inter-vsys traffic via external zones",
  "body": [
   "Virtual systems (vsys) split one physical firewall into several logical firewalls, each with its own interfaces, zones, policies, objects and administrators. Service providers use them for tenants, and enterprises use them to separate business units that need independent policy. Every firewall runs vsys1 even when you never see it.",
   "To create more, you first enable Multi Virtual System Capability under Device > Setup > Management; enabling it requires a commit. How many vsys you can run depends on the platform, and many platforms need a virtual systems license for additional vsys beyond the base. Smaller models may not support multi-vsys at all. After that, Device > Virtual Systems lets you add vsys2, vsys3 and so on, set resource limits such as sessions and rules, and choose which interfaces, VLANs, virtual wires and routers the vsys can use.",
   "Each interface belongs to exactly one vsys, and each zone belongs to one vsys. Virtual routers are more flexible: a vsys can have its own VR for full routing separation, or several vsys can share one VR. Objects and policies can be defined per vsys or in the Shared location to be reused by all. Admins can be restricted to a vsys using the virtual system administrator roles.",
   "A shared gateway is a special virtual system that several vsys use to reach a common network, usually the Internet, through the same interfaces. Instead of giving every tenant its own public interface, the shared gateway owns the outside interface. Shared gateways have zones, NAT and PBF, but no security policy of their own; security is enforced in each tenant vsys. Traffic between a vsys and a shared gateway does not need an external zone: the shared gateway appears as a zone option to the vsys.",
   "Traffic between two vsys uses external zones. In vsys1 you create an external zone that points to vsys2, and in vsys2 an external zone that points to vsys1. A session from vsys1's Trust to vsys2's DMZ is evaluated twice: vsys1 needs a rule from Trust to its external zone, and vsys2 needs a rule from its external zone to DMZ. Routing must also send the traffic to the other vsys, either through a shared VR or a route whose next hop is the other VR. Because each vsys inspects the session, logs appear in both.",
   "Think of vsys as separate firewalls wired together by an internal cable: each side needs its own zones, routes and security rules. When troubleshooting multi-vsys, always check which vsys you are viewing in the web interface's vsys selector and in CLI commands such as `set system setting target-vsys`."
  ],
  "terms": [
   [
    "Virtual system (vsys)",
    "A logical firewall inside one physical firewall with its own interfaces, zones, policies and admins."
   ],
   [
    "Shared gateway",
    "A virtual system that lets multiple vsys share external interfaces; it supports NAT and PBF but has no security policy."
   ],
   [
    "External zone",
    "A zone type pointing at another vsys, used to pass traffic between virtual systems."
   ],
   [
    "Multi Virtual System Capability",
    "The device setting that enables creating additional vsys, subject to platform support and licensing."
   ]
  ],
  "example": "A college runs vsys1 for administration and vsys2 for student housing. Both reach the Internet through a shared gateway that owns ethernet1/1 and performs source NAT. When the registrar's app in vsys1 must reach a portal in vsys2, admins create external zones in both vsys and matching rules on both sides, and the session appears in both vsys logs.",
  "tip": "Inter-vsys traffic needs an external zone and a security rule in each vsys. Shared gateways do NAT and routing but no security policy. An interface and a zone always belong to exactly one vsys.",
  "check": [
   [
    "How many security rules does traffic from vsys1 to vsys2 need?",
    "Two: one in vsys1 to its external zone and one in vsys2 from its external zone."
   ],
   [
    "Where is security policy enforced for traffic using a shared gateway?",
    "In the tenant vsys, because shared gateways have no security policy."
   ],
   [
    "What must you enable before creating vsys2?",
    "Multi Virtual System Capability in the device management settings, on a supported and licensed platform."
   ]
  ]
 },
 {
  "t": "Logging: log types, log forwarding profiles, syslog/SNMP/email/HTTP server profiles, Device > Log Settings, Strata Logging Service",
  "body": [
   "Logs are how you prove what the firewall did and how you feed a security operations team. PAN-OS writes many log types, visible under Monitor > Logs. The ones you will use most are Traffic (a record of each session, by default at session end), Threat (vulnerability, spyware, virus, flood and scan detections), URL Filtering, WildFire Submissions, Data Filtering, HIP Match, GlobalProtect, User-ID, IP-Tag, Decryption, Tunnel Inspection, Authentication, Configuration, System and Alarms. The Unified log view combines several types for one search.",
   "Traffic logging is controlled per security rule. On a rule's Actions tab, Log at Session End is on by default and Log at Session Start is off; enable start logging only when troubleshooting, because it adds volume. Denied traffic is logged only if the deny rule has logging enabled, which is why people override interzone-default.",
   "To send logs elsewhere, you first define server profiles under Device > Server Profiles. A syslog profile lists servers, transport (UDP, TCP or SSL), port, format (BSD or IETF) and facility, and lets you customize the message format per log type, which matters for SIEM parsing. An SNMP trap profile sends traps to network monitoring systems. An email profile sends messages through an SMTP gateway. An HTTP profile sends logs to web services, with custom URI, headers and payload per log type, which is how you integrate with ticketing and chat tools.",
   "A log forwarding profile (Objects > Log Forwarding) decides where policy-driven logs go. Each entry picks a log type (traffic, threat, URL, WildFire, data, tunnel, authentication, decryption), an optional filter (for example severity critical or high), and destinations: Panorama or cloud logging, syslog, SNMP, email or HTTP. Entries can also run built-in actions such as tagging. You attach the profile to security rules on the Actions tab. A profile named `default` is automatically applied to new rules.",
   "Logs that are not produced by policy (System, Configuration, User-ID, HIP Match, GlobalProtect, IP-Tag and similar) are forwarded from Device > Log Settings instead, with the same kind of filters and destinations.",
   "Strata Logging Service, formerly Cortex Data Lake, is Palo Alto's cloud log storage. Firewalls forward logs to it directly or through Panorama, which gives centralized retention and lets cloud apps such as Strata Cloud Manager and Cortex products analyze the data. It requires a license and the firewall's device certificate. Panorama with Log Collectors is the on-premises alternative. Check log receipt with `show logging-status`."
  ],
  "terms": [
   [
    "Log forwarding profile",
    "An object attached to security rules that sends matching policy logs to Panorama, cloud logging, syslog, SNMP, email or HTTP."
   ],
   [
    "Device > Log Settings",
    "Where System, Configuration, User-ID, HIP Match and other non-policy logs are forwarded."
   ],
   [
    "HTTP server profile",
    "A server profile that sends logs to web services with customizable URI, headers and payload."
   ],
   [
    "Strata Logging Service",
    "Palo Alto's cloud log storage service (formerly Cortex Data Lake) used by cloud management and analytics apps."
   ]
  ],
  "example": "The SOC wants every critical threat in its SIEM within seconds and all config changes too. You create a syslog server profile over TCP, a log forwarding profile with a threat entry filtered on severity critical, attach it to the Internet rules, and in Device > Log Settings forward Configuration logs to the same syslog profile.",
  "tip": "Traffic, Threat, URL, WildFire and Data logs are forwarded with a log forwarding profile on security rules; System and Configuration logs use Device > Log Settings. Traffic logs default to session end only.",
  "check": [
   [
    "Where do you configure forwarding of Configuration logs to syslog?",
    "Device > Log Settings, using a syslog server profile."
   ],
   [
    "Why might blocked traffic not appear in the Traffic log?",
    "The matching deny rule, often interzone-default, does not have logging enabled."
   ],
   [
    "What happens to new security rules if a log forwarding profile is named default?",
    "It is automatically attached to them."
   ]
  ]
 },
 {
  "t": "Software and content updates: PAN-OS upgrade paths and base images, HA upgrade order, dynamic update schedules and thresholds",
  "body": [
   "A firewall runs two kinds of code that update on different schedules. PAN-OS software is the operating system, released as feature releases (such as 10.2, 11.0, 11.1) with maintenance releases within each (like 11.1.x). Content updates are signatures and data: Applications and Threats (App-IDs and vulnerability and spyware signatures), Antivirus, WildFire, GlobalProtect data files and others. They update frequently without a reboot.",
   "PAN-OS upgrade paths have rules. To install a maintenance release of a new feature release, you must first download that feature release's base image (the .0 release), even if you never install it; the firewall needs it present to install, say, a later 11.1 maintenance release. Traditionally you also upgrade through each feature release in sequence rather than jumping over one. Newer releases support skipping some versions in certain cases, so always read the upgrade path in the release notes. Each PAN-OS release also requires a minimum content version, so install current Applications and Threats content before upgrading software.",
   "A safe single-firewall upgrade looks like this: read the release notes and known issues, save and export a named configuration snapshot and the device state, update content, download the base and target images, install, reboot, and verify. If you manage the firewall with Panorama, upgrade Panorama first; Panorama must run the same or a later release than the firewalls it manages.",
   "HA pairs are upgraded one peer at a time to keep traffic flowing. A typical active/passive order: disable preemption if it is enabled, upgrade the passive peer and reboot it, confirm it is healthy and synchronized, suspend the active peer so the upgraded peer takes over, upgrade the former active peer, then return it to functional and restore preemption. Peers briefly run different versions during this window, which HA tolerates for the upgrade.",
   "Dynamic updates are scheduled under Device > Dynamic Updates. Each type has a schedule (for example every 30 minutes for WildFire, daily or hourly for others) and an action: download only, or download and install. The threshold setting delays installing a new content release until it has been available for a set number of hours, giving Palo Alto time to pull a problematic release before your firewall installs it. For mission-critical networks, a threshold is a common best practice. Applications and Threats updates also let you review new App-IDs and choose to disable new App-IDs until you have checked how they affect policy.",
   "Everything here can be managed centrally: Panorama can push software and content to firewalls and act as an update server. Check the result with `show system info` and the dynamic updates page."
  ],
  "terms": [
   [
    "Base image",
    "The .0 image of a feature release, which must be downloaded before installing a maintenance release of that feature release."
   ],
   [
    "Maintenance release",
    "A bug-fix release within a PAN-OS feature release, such as a later 11.1.x build."
   ],
   [
    "Threshold",
    "A dynamic update setting that waits a set number of hours after release before installing new content."
   ],
   [
    "Applications and Threats",
    "The content package containing App-ID definitions and vulnerability and spyware signatures."
   ]
  ],
  "example": "You must move an HA pair from 10.2 to a later 11.1 maintenance release. You first upgrade Panorama, install the latest content on both firewalls, then check the release notes for the supported path. You download each required base image, upgrade the passive peer, fail over, upgrade the other peer, and confirm sessions synced throughout.",
  "tip": "Base image first, content before software, Panorama before firewalls, passive peer before active. Thresholds delay content installation to reduce risk from a bad release.",
  "check": [
   [
    "Why must you download a base image you will not run?",
    "PAN-OS requires the feature release's base image to be present before installing a maintenance release of that feature release."
   ],
   [
    "In an active/passive pair, which peer do you upgrade first?",
    "The passive peer, then fail over and upgrade the former active peer."
   ],
   [
    "What does the dynamic update threshold do?",
    "It holds off installing a new content release until it has been published for the configured number of hours."
   ]
  ]
 },
 {
  "t": "Certificate management: CAs, forward trust/untrust, SSL inbound inspection, SSL/TLS service profiles, certificate profiles, OCSP/CRL",
  "body": [
   "Certificates underpin decryption, GlobalProtect, the management interface and many authentication features. You manage them under Device > Certificate Management > Certificates, where you can generate, import and export certificates and keys, or create certificate signing requests (CSRs) for an enterprise CA to sign.",
   "For SSL Forward Proxy, which decrypts users' outbound HTTPS, the firewall acts as a certificate authority (CA). When a user visits a site, the firewall checks the real server certificate, then creates an impersonated copy signed by one of two CA certificates. The Forward Trust certificate signs the copy when the real server certificate is valid and trusted. The Forward Untrust certificate signs it when the server certificate is invalid (expired, self-signed, untrusted issuer), so the user still gets a browser warning instead of silently trusting a bad site. Forward Trust should be a subordinate CA issued by your enterprise PKI (or a self-signed CA) that endpoints trust, pushed by group policy or device management. Forward Untrust should deliberately be a self-signed CA that endpoints do not trust.",
   "SSL Inbound Inspection protects your own servers. There is no impersonation: you import the server's actual certificate and private key onto the firewall, and it decrypts inbound sessions to inspect them for threats. The decryption rule references that certificate. Because the firewall uses the real key, clients see no difference.",
   "An SSL/TLS service profile defines the certificate and allowed protocol versions (minimum and maximum TLS version) for services the firewall itself hosts: the management web interface, GlobalProtect portal and gateways, Authentication Portal, and others. Raising the minimum version is a simple hardening step.",
   "A certificate profile is used when the firewall needs to validate someone else's certificate, such as GlobalProtect client certificates, admin certificate logins or peers in IPsec. It lists the trusted CA certificates, which certificate field supplies the username, and revocation checking options. Revocation can be checked with a Certificate Revocation List (CRL), a periodically downloaded list of revoked serial numbers, or Online Certificate Status Protocol (OCSP), a real-time query to a responder. When both are enabled, PAN-OS tries OCSP first and falls back to CRL. You can choose to block sessions if the status is unknown or the check times out, trading availability for strictness.",
   "Also mark certificates for their role: Trusted Root CA for certificates you want in the firewall's trust store, and Forward Trust or Forward Untrust for decryption. Watch expiry dates; an expired Forward Trust CA breaks browsing for every decrypted user."
  ],
  "terms": [
   [
    "Forward Trust certificate",
    "The CA certificate the firewall uses to sign impersonated server certificates when the real server certificate is trusted."
   ],
   [
    "Forward Untrust certificate",
    "An untrusted CA certificate used to sign impersonated certificates for sites with invalid certificates, so users see a warning."
   ],
   [
    "SSL Inbound Inspection",
    "Decryption of traffic to your own servers using their imported certificate and private key."
   ],
   [
    "Certificate profile",
    "Settings for validating client or peer certificates: trusted CAs, username field and OCSP/CRL checks."
   ],
   [
    "OCSP",
    "Online Certificate Status Protocol, a real-time query to a responder about a certificate's revocation status."
   ]
  ],
  "example": "After enabling decryption, users visiting a site with an expired certificate see no warning, which alarms the security team. The cause: the same trusted CA was selected as both Forward Trust and Forward Untrust. You generate a separate self-signed Forward Untrust CA that endpoints do not trust, and warnings return for bad sites.",
  "tip": "Forward Trust must be trusted by clients; Forward Untrust must not be. Inbound inspection uses the server's real key, forward proxy uses impersonation. Service profiles protect the firewall's own services; certificate profiles validate others' certificates.",
  "check": [
   [
    "What do you need on the firewall for SSL Inbound Inspection?",
    "The protected server's certificate and private key, imported and referenced by the decryption rule."
   ],
   [
    "When both OCSP and CRL are configured, which is tried first?",
    "OCSP, with CRL as the fallback."
   ],
   [
    "Which object sets the minimum TLS version for the GlobalProtect portal?",
    "An SSL/TLS service profile."
   ]
  ]
 },
 {
  "t": "Decryption exclusions for pinned and sensitive apps",
  "body": [
   "Decryption gives the firewall visibility into encrypted traffic, but not everything can or should be decrypted. Some applications break when a middlebox decrypts them, and some traffic should stay private for legal or ethical reasons. Planning exclusions is part of every decryption rollout.",
   "Technical exclusions come first. Certificate pinning means an app only accepts a specific certificate or CA for its server, not whatever the operating system trusts. When the firewall substitutes its impersonated certificate, the app refuses to connect, even though a browser would accept it. Many mobile apps, software updaters and some desktop clients pin. Other breakers include mutual TLS (client certificate authentication), where the firewall cannot present the client's certificate to the server, and servers using protocols or ciphers the firewall does not support for decryption.",
   "Palo Alto maintains a predefined list of known problem sites under Device > Certificate Management > SSL Decryption Exclusion. It is updated through content updates, and you can see why each entry is there. You can add your own entries by hostname (wildcards allowed) for internal apps that pin or require client certificates. These exclusions apply regardless of decryption policy. Separately, when a session fails decryption for reasons such as client authentication, the firewall can add the server to a local exclusion cache so later sessions pass without decryption. The Decryption log shows failures and their reasons, which is how you find apps that need exclusions.",
   "Policy-based exclusions cover sensitive traffic. In decryption policy (Policies > Decryption) you create rules with the action No Decrypt, typically matching URL categories such as financial-services, health-and-medicine and government, or specific users, groups or destinations. Place these above the broad decrypt rules. This protects employee privacy and helps comply with regulations and works council agreements. Local law may require such exclusions, so involve legal and HR.",
   "Not decrypting does not mean not checking. Attach a decryption profile to No Decrypt rules to still validate server certificates, for example blocking sessions with expired certificates or untrusted issuers. You also still get App-ID based on the TLS handshake and the Server Name Indication, and URL filtering on the SNI.",
   "Keep exclusions as narrow as possible. Excluding a broad category or a wildcard domain can hide command-and-control traffic that hides in popular services. Review exclusions periodically and prefer specific hostnames over categories."
  ],
  "terms": [
   [
    "Certificate pinning",
    "An app accepting only a specific certificate or CA for its server, which breaks when a firewall substitutes its own certificate."
   ],
   [
    "SSL Decryption Exclusion list",
    "The predefined and custom list of hostnames the firewall never decrypts, found under Certificate Management."
   ],
   [
    "No Decrypt rule",
    "A decryption policy rule that leaves matching traffic encrypted, often for sensitive URL categories."
   ],
   [
    "Decryption profile",
    "Settings that validate certificates and protocols for decrypted and non-decrypted sessions."
   ]
  ],
  "example": "After decryption goes live, a department's desktop backup client stops working, while browsing is fine. The Decryption log shows handshake failures to the backup service's hostname. Because the client pins its certificate, you add that hostname to the SSL Decryption Exclusion list and the backups resume.",
  "tip": "Pinned apps and mutual TLS need technical exclusions; privacy categories use No Decrypt rules. Attach a decryption profile to No Decrypt rules so certificate checks still happen.",
  "check": [
   [
    "Why does a pinned app fail when a browser does not?",
    "The app accepts only its expected certificate or CA, so it rejects the firewall's impersonated certificate even though the OS trusts it."
   ],
   [
    "How do you keep banking sites private while decrypting other traffic?",
    "Add a No Decrypt rule for the financial-services URL category above the decrypt rules."
   ],
   [
    "Where do you look to find apps failing decryption?",
    "The Decryption log, which records handshake failures and reasons."
   ]
  ]
 },
 {
  "t": "User-ID sources (server monitoring, syslog listener, GlobalProtect, XML API), group mapping and Cloud Identity Engine",
  "body": [
   "User-ID maps IP addresses to usernames so policy and logs can refer to people and groups instead of addresses. The firewall does not guess: it learns mappings from sources you configure. It then enforces rules only in zones where User Identification is enabled.",
   "Server monitoring is the most common source. The firewall's built-in PAN-OS integrated User-ID agent, or the Windows-based User-ID agent installed on a server, reads security event logs from Microsoft Active Directory domain controllers, where successful logon events record which user logged on from which IP. It can also monitor Exchange servers and Novell eDirectory. The account used needs rights to read the event logs, such as membership in the Event Log Readers group, and should not be a domain admin. The Windows agent is useful at scale because it offloads the collection work from the firewall.",
   "A syslog listener collects mappings from systems that already authenticate users, such as wireless controllers, network access control (NAC) systems, VPN concentrators or proxies. You define syslog parse profiles with regular expressions or field identifiers that pick out the username and IP address from login and logout messages, then add the sending servers to the monitored server list. The listener is enabled on an interface through an interface management profile (User-ID Syslog Listener-UDP or -SSL).",
   "GlobalProtect is the most reliable source for remote and roaming users: the user authenticates to the gateway, so the firewall knows exactly who holds the tunnel IP. Internal gateways extend this to LAN users. The XML API lets any script or third-party system push login and logout events, and tags, to the firewall; this is how custom apps, cloud platforms and orchestration tools feed User-ID. Other sources include Authentication Portal, terminal server agents for multi-user hosts (which map by port range because many users share one IP), and client probing, which Palo Alto discourages.",
   "Knowing a username is only half the job; policy is usually written for groups. Group mapping (Device > User Identification > Group Mapping Settings) uses an LDAP server profile to read group membership from the directory, with a group include list to limit which groups are retrieved and an update interval. Check it with `show user group list` and `show user ip-user-mapping all`.",
   "The Cloud Identity Engine (CIE) is a cloud service that does directory synchronization and authentication for Palo Alto products. It reads users and groups from on-premises Active Directory (through an agent), Microsoft Entra ID, Okta and other identity providers, and firewalls query it for group information instead of each running LDAP group mapping. Its Cloud Authentication Service can also act as the authentication method for features like GlobalProtect and Authentication Portal using SAML identity providers. It is especially useful for cloud-based directories that have no LDAP interface."
  ],
  "terms": [
   [
    "Server monitoring",
    "User-ID collection of logon events from domain controllers, Exchange or eDirectory by the integrated or Windows User-ID agent."
   ],
   [
    "Syslog parse profile",
    "Regex or field rules that extract username and IP address from third-party syslog messages."
   ],
   [
    "Group mapping",
    "Retrieving directory group membership, usually via LDAP, so policy can reference groups."
   ],
   [
    "Cloud Identity Engine",
    "A Palo Alto cloud service that syncs users and groups from directories and IdPs and provides cloud authentication."
   ]
  ],
  "example": "Staff connect through a Wi-Fi controller using 802.1X, but those logins do not touch the domain controllers, so many IPs show as unknown. You configure the controller to send authentication syslog to the firewall, write a syslog parse profile that extracts user and IP, and the Wi-Fi users now appear in logs and match group-based rules.",
  "tip": "Server monitoring reads DC security logs; syslog listeners parse third-party messages; GlobalProtect is best for remote users; XML API is for scripts. Group mapping needs LDAP or the Cloud Identity Engine.",
  "check": [
   [
    "Which User-ID source suits a NAC system that logs user authentications?",
    "A syslog listener with a syslog parse profile for that system's messages."
   ],
   [
    "Why use the Cloud Identity Engine for an organization using only Microsoft Entra ID?",
    "It syncs cloud directory users and groups for policy without needing an LDAP connection to an on-premises directory."
   ],
   [
    "How does User-ID handle a terminal server with many users on one IP?",
    "A terminal server agent maps users to source port ranges instead of the shared IP."
   ]
  ]
 },
 {
  "t": "Management plane: permitted IPs, service routes, candidate vs running config, commits, partial commits, config locks and named snapshots",
  "body": [
   "Palo Alto firewalls separate the management plane, which runs the web interface, CLI, logging and configuration, from the data plane, which processes traffic. Protecting and operating the management plane carefully is basic hygiene and a favorite exam area.",
   "Start with access. The dedicated MGT interface (Device > Setup > Interfaces > Management) has its own IP and settings for which services it allows (HTTPS, SSH, ping, SNMP, User-ID and so on) and a Permitted IP Addresses list. Only listed addresses or subnets can reach those services. Best practice is to keep management on an isolated network, disable HTTP and Telnet, restrict permitted IPs to admin jump hosts, and never expose management to the Internet. Data interfaces with interface management profiles have their own permitted IP lists.",
   "Service routes, covered earlier, decide which interface the management plane uses to reach external services such as DNS, NTP, updates, syslog and authentication servers. If the MGT network cannot reach them, configure a service route on a data interface.",
   "The firewall keeps two configurations. The candidate configuration is what you edit in the web interface or CLI configure mode; changes there do nothing yet. The running configuration is what the firewall is actually enforcing. A commit validates the candidate and makes it running. Before committing you can Preview Changes to see a diff, Validate to check for errors without applying, and Change Summary to see who changed what. A partial commit applies only some changes, for example only the changes made by specific administrators, which prevents one admin from accidentally committing another's unfinished work. In the CLI, commands like `commit partial admin <name>` do the same.",
   "Locks coordinate multiple admins. A config lock stops other admins from changing the candidate configuration; a commit lock stops others from committing. Locks can be set manually from the lock icon, and superusers can remove other admins' locks. Automatically acquiring a commit lock when you start editing is an optional setting.",
   "Named configuration snapshots protect you from mistakes. Under Device > Setup > Operations you can Save named configuration snapshot (writes the candidate to a named file), Load named configuration snapshot (replaces the candidate with it), Revert to running configuration (discard uncommitted changes), Load configuration version (return to an earlier committed version), and Export or Import to move files off the box. Loading a snapshot only changes the candidate; nothing takes effect until you commit. Exporting a snapshot and the device state before an upgrade is standard practice."
  ],
  "terms": [
   [
    "Candidate configuration",
    "The editable copy of the configuration that takes effect only after a commit."
   ],
   [
    "Running configuration",
    "The configuration the firewall is currently enforcing."
   ],
   [
    "Partial commit",
    "A commit of only selected changes, such as those made by specific administrators."
   ],
   [
    "Config lock",
    "A lock preventing other administrators from changing the candidate configuration."
   ],
   [
    "Named snapshot",
    "A saved, named copy of the configuration that can later be loaded into the candidate."
   ]
  ],
  "example": "Two admins edit the same firewall. Priya has finished a NAT change, while Sam's half-built security rules are still in the candidate. Priya uses Commit with the scope limited to her own changes, so her NAT rule goes live and Sam's work stays pending until he is ready.",
  "tip": "Loading or reverting a snapshot changes only the candidate; you still need to commit. Permitted IPs on the MGT interface are the main control over who can reach management.",
  "check": [
   [
    "You loaded a named snapshot but the firewall behavior is unchanged. Why?",
    "Loading a snapshot replaces the candidate configuration only; you must commit to make it running."
   ],
   [
    "How do you discard all uncommitted changes?",
    "Revert to running configuration."
   ],
   [
    "Which setting limits which hosts can reach the MGT interface's web UI?",
    "The Permitted IP Addresses list on the management interface settings."
   ]
  ]
 },
 {
  "t": "Web proxy (explicit and transparent) on supported PAN-OS 11.x platforms",
  "body": [
   "Many organizations have long run separate web proxies so browsers send web requests to a proxy that inspects and forwards them. PAN-OS 11.x added a web proxy feature on supported platforms so the firewall itself can play that role, helping customers consolidate or migrate off legacy proxy appliances. Support depends on the hardware or VM model and the PAN-OS release, so check the compatibility information before planning.",
   "An explicit proxy is one clients know about. Browsers or operating systems are configured, manually or with a proxy auto-config (PAC) file, to send web requests to the proxy's IP address and listening port. The client connects to the proxy and asks it, using HTTP CONNECT for HTTPS, to reach the destination. Because the client knowingly talks to the proxy, the proxy can challenge it for authentication, typically with Kerberos for domain machines or SAML through an identity provider. Explicit proxy is useful when you want every web request attributed to a user, and where the firewall is not otherwise in the path for web traffic.",
   "A transparent proxy intercepts web traffic without client configuration. The firewall sits in the traffic path, and traffic destined for web ports is redirected into the proxy function. Users do not know a proxy exists, which avoids distributing PAC files, but it relies on routing traffic through the firewall and on other methods, such as User-ID, for identifying users.",
   "Setup is done in the web proxy configuration (under Network > Proxy on supported releases). Expect to provide a loopback interface for the proxy, a DNS proxy object the proxy uses for name resolution, the listening port for explicit mode, the authentication method, and zones for proxy traffic. Security policy still applies: rules must allow the proxied traffic, and URL filtering and threat profiles do their normal job. To inspect HTTPS content rather than just see the domain in the CONNECT request, you still need decryption.",
   "How does this relate to the normal firewall? A regular next-generation firewall inspects traffic in line without acting as a proxy endpoint; the web proxy feature is an additional mode of handling web traffic that preserves proxy-dependent workflows, such as PAC files and proxy authentication, that some applications and policies were built around. Choose explicit when clients must be steered to the proxy and authenticated there; choose transparent when you cannot touch client settings.",
   "When troubleshooting, check whether clients are really using the PAC file (explicit), whether DNS resolution through the DNS proxy works, and whether authentication succeeded, then review Traffic and URL Filtering logs for the proxied sessions."
  ],
  "terms": [
   [
    "Explicit proxy",
    "A proxy that clients are configured to use, directly or via a PAC file, sending requests to its IP and port."
   ],
   [
    "Transparent proxy",
    "A proxy that intercepts web traffic in the path without any client configuration."
   ],
   [
    "PAC file",
    "A proxy auto-config script that tells browsers which proxy to use for which destinations."
   ],
   [
    "HTTP CONNECT",
    "The method an explicit proxy client uses to ask the proxy to open a tunnel to an HTTPS destination."
   ]
  ],
  "example": "A company is retiring an old proxy appliance that browsers reach through a PAC file with Kerberos authentication. On a supported firewall running PAN-OS 11.x, the team configures an explicit web proxy with Kerberos, updates the PAC file to point at the firewall's proxy address, and keeps user-based URL filtering working without changing browser settings.",
  "tip": "Explicit means clients are configured (PAC file or settings) and can be challenged for authentication; transparent means no client changes. The feature depends on platform and release, and HTTPS content inspection still needs decryption.",
  "check": [
   [
    "What distinguishes an explicit proxy from a transparent one?",
    "Clients are configured to send requests to an explicit proxy; a transparent proxy intercepts traffic without client configuration."
   ],
   [
    "Which proxy mode naturally supports prompting users to authenticate to the proxy?",
    "Explicit proxy, commonly with Kerberos or SAML."
   ],
   [
    "Does using the web proxy remove the need for decryption to inspect HTTPS content?",
    "No. Without decryption the firewall sees only the requested domain, not the encrypted content."
   ]
  ]
 },
 {
  "t": "Panorama: device groups and hierarchy, pre-rules and post-rules, templates, template stacks, template variables and overrides",
  "body": [
   "Panorama is Palo Alto's centralized management platform for many firewalls. It splits configuration into two families: device groups for policies and objects, and templates for network and device settings. Keeping these straight is essential for the exam.",
   "A device group contains firewalls that share policy, such as all branch firewalls. It holds security, NAT, decryption and other rules plus address, service and profile objects. Device groups form a hierarchy under the Shared location: Shared at the top, then parent device groups, then children, several levels deep. Objects and rules defined higher up are inherited by lower groups, so you can define company-wide rules once and region-specific rules below. A child can override an inherited object value when allowed.",
   "Panorama rules are placed before or after the firewall's own local rules. Pre-rules are evaluated first and cannot be overridden locally; they are ideal for company-wide blocks. Post-rules come after local rules and just above the default rules; they suit catch-all logging or cleanup rules. The full evaluation order on a managed firewall is: Shared pre-rules, ancestor device group pre-rules, the firewall's device group pre-rules, local firewall rules, the device group post-rules, ancestor post-rules, Shared post-rules, then the intrazone and interzone defaults. Local admins can see Panorama rules but not edit them.",
   "Templates configure the Network and Device tabs: interfaces, zones, routers, VPN, HA, server profiles, log settings and so on. A template stack combines several templates, for example a global template for DNS and NTP, a regional template for syslog servers, and a model-specific template for interfaces. Templates in a stack have an order, and when two templates configure the same setting, the one higher in the stack wins. You assign firewalls to the stack, not directly to individual templates. The stack itself can also hold configuration that overrides its member templates.",
   "Template variables make shared templates work for many firewalls whose values differ. You write a variable like `$mgmt-dns` or `$branch-lan-ip` in the template, and then give each firewall its own value in the template stack's per-device variable settings. One template can then serve a hundred branches, each with its own IP addresses.",
   "Overrides allow local deviations. A firewall admin can override a template-pushed value locally, shown with an override icon, unless Panorama was configured to prevent it. Overridden local values win over the template until someone reverts the override. Excessive overrides make fleets inconsistent, so use variables where values legitimately differ."
  ],
  "terms": [
   [
    "Device group",
    "A Panorama container of firewalls sharing policies and objects, arranged in a hierarchy under Shared."
   ],
   [
    "Pre-rules / post-rules",
    "Panorama rules evaluated before, or after, a firewall's local rules."
   ],
   [
    "Template stack",
    "An ordered combination of templates assigned to firewalls; higher templates win when settings conflict."
   ],
   [
    "Template variable",
    "A placeholder such as $dns-primary in a template whose value is set per firewall."
   ]
  ],
  "example": "A retailer has 300 stores with identical designs but different subnets. The engineer builds one store template with variables for the LAN IP and gateway, stacks it under a global template for DNS, NTP and logging, and places Shared pre-rules blocking high-risk categories. Each store gets its own variable values and the same policy.",
  "tip": "Device groups = policy and objects; templates = Network and Device tabs. Pre-rules come before local rules and cannot be overridden locally. In a stack, the higher template wins.",
  "check": [
   [
    "Where would you configure interfaces and zones for 50 firewalls in Panorama?",
    "In a template, assigned to the firewalls through a template stack."
   ],
   [
    "Where does a local firewall rule fall relative to Panorama rules?",
    "After all pre-rules and before all post-rules."
   ],
   [
    "How do you use one template for many firewalls with different IPs?",
    "Use template variables and set each firewall's values in the template stack."
   ]
  ]
 },
 {
  "t": "Panorama commit and push workflow; Panorama modes (Panorama, Management Only, Log Collector) and version requirements",
  "body": [
   "Panorama has its own candidate and running configuration, just like a firewall, and it also holds configuration intended for managed devices. Changes therefore take two steps to reach a firewall, and forgetting the second step is one of the most common real-world mistakes.",
   "Step one is Commit to Panorama. This validates your changes and makes them part of Panorama's running configuration, but nothing reaches the firewalls yet. Step two is Push to Devices, which sends device group and template configuration to the selected firewalls (and collector group configuration to log collectors). Each firewall then performs its own commit. The Commit and Push option does both in sequence. You can edit the push scope to choose which device groups, templates and devices receive the push, and the Panorama Task Manager or the Push Status shows per-device success, warnings and failures.",
   "The Panorama > Managed Devices summary shows whether each firewall's device group and template are In Sync or Out of Sync with Panorama, a quick way to find devices that missed a push. The Preview Changes option lets you see what a push will change on a device before sending it. If a local admin overrides a template setting, that device's configuration diverges until the override is reverted.",
   "Panorama runs in one of several modes. Panorama mode manages firewalls and also collects logs using its local log collector (on an M-Series appliance or a virtual appliance with log disks). Management Only mode manages devices but does not store firewall logs locally; logs go to dedicated log collectors or cloud logging. Log Collector mode turns the appliance into a dedicated log collector with no web interface for management; it is managed by a Panorama in Panorama or Management Only mode, and log collectors are grouped into collector groups for redundancy and scale. Older virtual deployments may also appear in a legacy mode. You change modes from the CLI with `request system system-mode`, and the change reboots the appliance.",
   "Version requirements follow one rule: Panorama must run the same or a later release than the firewalls it manages. That means upgrade Panorama first, then firewalls. Dedicated log collectors should run the same release as the Panorama managing them. Panorama plugins, such as those for cloud or Kubernetes integrations, have their own compatibility requirements to check.",
   "Panorama can itself be deployed in an HA pair for resilience. And while Panorama is managing a firewall, local changes are still possible, but best practice is to make all shared changes centrally."
  ],
  "terms": [
   [
    "Commit to Panorama",
    "Makes changes part of Panorama's running configuration without sending them to firewalls."
   ],
   [
    "Push to Devices",
    "Sends device group, template or collector group configuration from Panorama to managed devices."
   ],
   [
    "Management Only mode",
    "Panorama mode that manages devices but stores no firewall logs locally."
   ],
   [
    "Log Collector mode",
    "Mode that makes an appliance a dedicated log collector managed by another Panorama."
   ]
  ],
  "example": "An engineer adds a block rule for a new malicious domain list in Panorama and commits. An hour later the firewalls still allow the traffic. Managed Devices shows the device group Out of Sync: the change was only committed to Panorama. A Push to Devices for that device group fixes it.",
  "tip": "Commit to Panorama is not enough; you must also push. Panorama must be on the same or newer release than its firewalls, so it is always upgraded first. Log Collector mode has no management web UI.",
  "check": [
   [
    "What does Commit and Push do?",
    "Commits changes to Panorama, then pushes the resulting configuration to the selected devices."
   ],
   [
    "Which Panorama mode manages devices but relies on dedicated log collectors for logs?",
    "Management Only mode."
   ],
   [
    "Can a Panorama running an older release manage a firewall on a newer release?",
    "No, Panorama must run the same or a later release than its managed firewalls."
   ]
  ]
 },
 {
  "t": "PAN-OS XML API (keygen, config, op, commit) and REST API; API-only admin role profiles",
  "body": [
   "Everything you do in the web interface is ultimately an API call, and PAN-OS exposes two APIs for automation. The XML API is the older, comprehensive one covering configuration, operational commands, commits, logs, reports, User-ID and file transfers. The REST API offers JSON-based access to policies, objects, network and device configuration. Both run over HTTPS on the management interface (or a data interface with management enabled).",
   "The XML API is organized by request type in the `type` parameter of requests to the `/api/` endpoint. First you get an API key with `type=keygen`, supplying a username and password (preferably in a POST body rather than the URL). The key is then sent in later requests, ideally in the X-PAN-KEY header. Using a dedicated service account means the key has only that account's rights.",
   "Configuration requests use `type=config` with an `action` and an `xpath` pointing at a node in the configuration tree. Common actions are get (read the candidate configuration), show (read the running configuration), set (add or merge), edit (replace), delete, rename, clone and move. Operational requests use `type=op` with a `cmd` parameter containing the CLI command expressed as XML, such as the XML form of `show system info`. A handy trick is running `debug cli on` in the CLI, which prints the XML equivalent of commands you type. Commits use `type=commit`, optionally partial, and return a job ID that you poll with an op request to check completion. Other types include log, report, export, import, user-id and version.",
   "The REST API uses resource URLs with a version in the path, such as `/restapi/v11.0/Objects/Addresses`, with location parameters (for example vsys and name) and standard HTTP methods: GET to read, POST to create, PUT to edit, DELETE to remove. It is easy for developers who know JSON, but it does not cover everything; operations such as commit are done through the XML API. Use the documentation built into the firewall's API browser, reachable under the management address, to explore both.",
   "Security for API use comes from an API-only admin role profile. Create an admin role profile with every Web UI area disabled, the Command Line set to none, and only the XML API types and REST API resources the script needs enabled. For a read-only log exporter, enable only XML API Log. For an address-object updater, enable configuration and commit permissions and nothing else. Assign that profile to a dedicated admin account, generate the key, and store it in a secrets manager. You can also set an API key lifetime in the device settings so keys expire, and regenerating keys invalidates old ones.",
   "Always test automation against a lab firewall, handle errors in the XML responses (status='error'), and remember that config changes land in the candidate until committed."
  ],
  "terms": [
   [
    "keygen",
    "The XML API request type that returns an API key for a username and password."
   ],
   [
    "XPath",
    "The path syntax the XML API uses to address a node in the configuration tree."
   ],
   [
    "type=op",
    "The XML API request type for running operational (non-configuration) commands expressed as XML."
   ],
   [
    "API-only role",
    "An admin role profile with web UI and CLI disabled and only needed API permissions enabled."
   ]
  ],
  "example": "A security team's orchestration tool must add attacker IPs to an address group. You create an admin role with web UI and CLI off and only XML API configuration and commit enabled, generate a key for that account, and the tool uses type=config action=set with an xpath to the address object, then type=commit, polling the job ID.",
  "tip": "Know the XML request types: keygen, config (with actions like get, show, set, edit, delete), op and commit. REST uses versioned URLs and JSON; commit is an XML API function. API-only accounts come from admin role profiles, not dynamic roles.",
  "check": [
   [
    "What is the difference between set and edit in the XML API?",
    "set adds or merges at the xpath, while edit replaces the node at the xpath with the supplied element."
   ],
   [
    "How can you find the XML for an operational CLI command?",
    "Run debug cli on in the CLI and then the command; the XML equivalent is printed."
   ],
   [
    "How do you ensure a leaked API key cannot change configuration?",
    "Generate it for an account whose admin role profile allows only the read-only API types needed."
   ]
  ]
 },
 {
  "t": "Infrastructure as code: Terraform panos provider, Ansible paloaltonetworks.panos collection, pan-os-python SDK",
  "body": [
   "Infrastructure as code (IaC) means describing firewall configuration in text files kept in version control, then letting a tool apply it. The benefits are repeatability, peer review of changes, easy rollback to a known version, and consistency across many firewalls. All three tools in this topic talk to the PAN-OS XML API underneath, so everything from the API lesson (keys, API-only roles, candidate versus running configuration) still applies.",
   "Terraform, from HashiCorp, is declarative: you write the desired end state in HCL files and Terraform works out what to create, change or delete. The Palo Alto Networks panos provider supplies resources for objects, policies, network settings and more, for firewalls and Panorama. Terraform records what it manages in a state file, and `terraform plan` shows the changes before `terraform apply` makes them. Terraform is excellent at building configuration, for example spinning up a set of address objects and rules alongside cloud VM-Series deployments. Committing is handled separately from the resource changes, and how depends on the provider version, so check its documentation; a pushed configuration is not live until committed. Protect the state file, because it can contain sensitive values.",
   "Ansible, from Red Hat, uses YAML playbooks of tasks run in order. The paloaltonetworks.panos collection, installed from Ansible Galaxy, provides modules for address objects, security rules, NAT, interfaces, commits and operational commands. Each module takes a provider dictionary with the firewall address and credentials or API key. Modules are designed to be idempotent: running a playbook twice should change nothing the second time. Ansible is well suited to procedural workflows such as onboarding a firewall, running an upgrade sequence or collecting information.",
   "```yaml\n- name: Ensure web server object exists\n  paloaltonetworks.panos.panos_address_object:\n    provider: '{{ provider }}'\n    name: web-srv\n    value: 10.1.1.10\n    description: DMZ web server\n\n- name: Commit\n  paloaltonetworks.panos.panos_commit_firewall:\n    provider: '{{ provider }}'\n```",
   "pan-os-python is Palo Alto's Python SDK (imported as `panos`). It models the configuration as an object tree: a Firewall or Panorama object at the top, with children such as address objects, rulebases and rules. You build or refresh objects in Python, then call methods like `create()`, `apply()`, `delete()` and `commit()`. It is the most flexible choice when you need custom logic, and it is what the Ansible collection uses internally.",
   "```python\nfrom panos.firewall import Firewall\nfrom panos.objects import AddressObject\n\nfw = Firewall('192.0.2.10', api_key=API_KEY)\nobj = AddressObject('web-srv', '10.1.1.10')\nfw.add(obj)\nobj.create()   # goes into the candidate config\nfw.commit()    # makes it running\n```",
   "Choosing between them: Terraform for declarative state-driven builds, especially alongside cloud infrastructure; Ansible for ordered workflows and teams already using it; pan-os-python for custom scripts and integrations. Whatever you choose, use a dedicated API-only account and keep secrets out of code."
  ],
  "terms": [
   [
    "Declarative",
    "Describing the desired end state and letting the tool compute the changes, as Terraform does."
   ],
   [
    "Idempotent",
    "Producing the same result no matter how many times an operation runs, a design goal of Ansible modules."
   ],
   [
    "Terraform state",
    "The file where Terraform records the resources it manages and their current values."
   ],
   [
    "pan-os-python",
    "Palo Alto's Python SDK that models firewall and Panorama configuration as an object tree."
   ]
  ],
  "example": "A cloud team deploys VM-Series firewalls with Terraform. They add the panos provider to the same repository so each new application's address objects and security rules are defined next to its infrastructure, reviewed in a pull request, planned, applied and then committed through their pipeline.",
  "tip": "Terraform is declarative and state-based, Ansible runs ordered idempotent tasks, pan-os-python is the SDK both build on. All of them change the candidate configuration, so a commit is still required.",
  "check": [
   [
    "Which tool records managed resources in a state file?",
    "Terraform."
   ],
   [
    "What is the Ansible collection for PAN-OS called?",
    "paloaltonetworks.panos."
   ],
   [
    "After obj.create() in pan-os-python, is the object live?",
    "No, it is in the candidate configuration until you commit."
   ]
  ]
 },
 {
  "t": "External dynamic lists (IP, domain, URL) and dynamic address groups with tags",
  "body": [
   "Static policy is slow to change: every new malicious address or new server means an edit and a commit. External dynamic lists and dynamic address groups let policy adapt automatically, and both are central to automation on PAN-OS.",
   "An external dynamic list (EDL) is a text file hosted on a web server, one entry per line, that the firewall downloads on a schedule. You create it under Objects > External Dynamic Lists with a type, a source URL, an optional certificate profile for HTTPS validation, credentials if needed, and a check interval (every five minutes, hourly, daily, weekly or monthly). Changes in the file take effect at the next refresh with no commit. You can force a refresh from the CLI with `request system external-list refresh` and view the entries with `request system external-list show`.",
   "The type decides where the list can be used. An IP Address list holds addresses, ranges and subnets and is used as a source or destination in security, NAT, PBF and decryption rules. A Domain list is used in anti-spyware profiles, under DNS policies, so the firewall can alert, block or sinkhole DNS queries for listed domains. A URL list is used as a custom URL category in URL filtering profiles or as a URL category match in security and decryption rules. Palo Alto also provides predefined IP lists, such as known malicious IP addresses and bulletproof hosting providers, maintained through threat content subscriptions, and predefined URL lists. Each platform has capacity limits for entries, which vary by model.",
   "A dynamic address group (DAG) is an address group whose membership is defined by a match expression on tags, such as `'web' and 'prod'`, rather than a fixed list. Any IP address registered with matching tags becomes a member automatically. Tags can come from address objects, from the XML API (register and unregister calls from scripts or orchestration tools), from VM information sources that read cloud or hypervisor metadata, from auto-tagging in log forwarding, and from Panorama or User-ID agents. Membership updates happen at runtime without a commit, which is why DAGs are used for quarantines and cloud workloads that come and go.",
   "Dynamic user groups are the user equivalent: groups whose members are users carrying certain tags, useful for quarantining a compromised account rather than an IP.",
   "Use EDLs when the source of truth is a list maintained elsewhere, such as a threat feed or an internal IT inventory. Use DAGs when membership comes from events or metadata. Always consider what happens if the list server is unreachable (the firewall keeps the last successfully retrieved list) and protect the list source, since whoever controls it controls your policy."
  ],
  "terms": [
   [
    "External dynamic list (EDL)",
    "A web-hosted list of IPs, domains or URLs that the firewall retrieves periodically and uses in policy without a commit."
   ],
   [
    "Dynamic address group (DAG)",
    "An address group whose members are IP addresses registered with tags that match its filter."
   ],
   [
    "DNS sinkhole",
    "An anti-spyware action that answers malicious domain queries with a controlled address so infected hosts can be found."
   ],
   [
    "Dynamic user group",
    "A group whose membership is users with matching tags, used for user-based quarantine."
   ]
  ],
  "example": "A threat intelligence platform publishes a list of command-and-control domains. You add it as a Domain EDL, reference it in the anti-spyware profile's DNS policy with the sinkhole action, and then look for internal hosts querying the sinkhole address in the Traffic log to find infected machines.",
  "tip": "IP lists go in rules, domain lists go in anti-spyware DNS policies, URL lists go in URL filtering or rule URL categories. EDL and DAG changes take effect without a commit.",
  "check": [
   [
    "Where is a Domain EDL used?",
    "In an anti-spyware profile's DNS policies, for alert, block or sinkhole actions."
   ],
   [
    "How does an IP become a member of a dynamic address group?",
    "It is registered with tags that match the group's match expression, for example through the API, VM monitoring or auto-tagging."
   ],
   [
    "Does updating the EDL file on the web server require a commit on the firewall?",
    "No, the firewall picks up changes at its next scheduled refresh."
   ]
  ]
 },
 {
  "t": "Auto-tagging from log forwarding profiles and HTTP server profiles for webhooks and ticketing",
  "body": [
   "Auto-tagging closes the loop between detection and enforcement. When the firewall logs an event that matters, such as a critical threat from an internal host, it can tag the host's IP address. A dynamic address group that matches the tag then places the host into a quarantine rule, all within seconds and without a commit.",
   "Tagging is configured in a log forwarding profile (Objects > Log Forwarding). Each match list entry has a log type and a filter, for example the threat log with severity critical. Under Built-in Actions you add an action of type Tagging: choose the target (source address, destination address, and for some log types the user or the XFF address), the action (add tag or remove tag), where the tag is registered (the local User-ID, Panorama, or a remote device via an HTTP server profile), the tag itself, and an optional timeout after which the tag expires. Then attach the log forwarding profile to the security rules that should trigger it.",
   "The enforcement side is ordinary policy. Create a DAG with a match expression on the tag, such as `'quarantine'`, and place a rule near the top of the rulebase that denies or restricts traffic from that DAG, perhaps allowing only access to remediation servers. Because DAG membership updates dynamically, tagged hosts are restricted immediately. A timeout lets hosts return automatically; without one, an admin removes the tag after cleanup. Tagging users into dynamic user groups works the same way when user identity matters more than IP.",
   "HTTP server profiles extend this to other systems. Under Device > Server Profiles > HTTP, you define one or more servers (address, protocol, port, method) and, per log type, a URI format, headers, parameters and a payload template built from log fields. Predefined payload formats exist for some common services, and you can write your own JSON. When a log forwarding profile sends a matching log to the HTTP profile, the firewall calls the webhook. That can open a ticket in an IT service management tool, post to a chat channel, or trigger an orchestration playbook that investigates further. Use HTTPS and authentication headers so the receiving side can trust the request.",
   "Put together, a single critical threat can tag the host into quarantine, open an incident ticket and notify the on-call analyst. This is the kind of integration the exam expects you to design. Remember the pieces: log forwarding profile with a filter, tagging built-in action, DAG in a security rule, and HTTP server profile for external notification. Review IP-Tag logs to confirm tags were registered and removed as expected.",
   "Be careful with filters. Tagging on low-severity or false-positive-prone events can quarantine healthy machines, so start with alerting only and tighten as you gain confidence."
  ],
  "terms": [
   [
    "Auto-tagging",
    "A log forwarding built-in action that adds or removes tags on IPs or users when a matching log is generated."
   ],
   [
    "Built-in action",
    "An action inside a log forwarding profile entry, such as tagging, performed when a log matches."
   ],
   [
    "Webhook",
    "An HTTP request sent to another system when an event occurs, used here via an HTTP server profile."
   ],
   [
    "IP-Tag log",
    "The log that records tags registered to and removed from IP addresses."
   ]
  ],
  "example": "A laptop triggers a critical spyware signature. The log forwarding profile tags its IP 'quarantine' with a 24-hour timeout and sends the threat log to an HTTP server profile that opens a ticket. A top rule denies the Quarantine DAG everything except the remediation server, so the laptop is isolated before an analyst even looks.",
  "tip": "The chain is: log forwarding profile filter, then tagging action, then DAG matching the tag, then a security rule using the DAG. HTTP server profiles send logs to webhooks for tickets and chat.",
  "check": [
   [
    "Where do you configure a tag to be added when a critical threat is logged?",
    "In a log forwarding profile entry filtered on severity, using a tagging built-in action, attached to security rules."
   ],
   [
    "How does a tagged IP become blocked?",
    "A dynamic address group matching the tag is used in a deny or restrict rule, and the IP joins the group automatically."
   ],
   [
    "What defines the payload format sent to a ticketing webhook?",
    "The HTTP server profile's per-log-type payload format and headers."
   ]
  ]
 },
 {
  "t": "VM-Series bootstrapping (init-cfg.txt, bootstrap.xml, content/license/software/plugins folders) and Zero Touch Provisioning",
  "body": [
   "Deploying a firewall by hand, logging in to set an IP, license it, update it and configure it, does not scale in the cloud or across hundreds of sites. Bootstrapping lets a VM-Series firewall configure itself on first boot, and Zero Touch Provisioning (ZTP) does something similar for supported hardware firewalls.",
   "A bootstrap package is a set of folders the firewall reads at first boot. `config` holds `init-cfg.txt` and optionally `bootstrap.xml`. `license` holds an `authcodes` file with the license authorization codes. `software` holds a PAN-OS image to upgrade to. `content` holds Applications and Threats and optionally antivirus content packages to install. `plugins` holds VM-Series plugin images. All the folders must exist, even when empty.",
   "The `init-cfg.txt` file holds basic settings as key-value pairs: management interface type (DHCP client or static with IP address, netmask and default gateway), hostname, DNS servers, Panorama server addresses, the template stack and device group names to join, the VM auth key that lets the firewall register with Panorama, and operational options such as swapping the management interface (common on some cloud load balancer designs). The optional `bootstrap.xml` is a complete configuration file, typically exported from a working firewall, that becomes the running configuration. Many teams skip it and let Panorama push configuration after registration, which keeps configuration in one place.",
   "The package can be delivered in several ways depending on the platform: an ISO image attached as a virtual CD-ROM, a block storage volume, a cloud storage bucket or file share (such as AWS S3, Azure storage or Google Cloud Storage) referenced in the instance's user data, or basic init-cfg settings passed directly as user data or custom data without a full package. Bootstrapping only happens when the firewall boots from a factory-default state; it will not reapply to an already-configured firewall.",
   "The first boot then runs in order: apply management settings, license from the auth codes, install content and software (rebooting if needed), load configuration, and register with Panorama. Watch progress with `show system bootstrap status`. Common failures are missing folders, wrong file names, unreadable buckets due to permissions, and firewalls that cannot reach the licensing servers.",
   "Zero Touch Provisioning is for hardware firewalls ordered as ZTP-capable models. An admin registers the serial numbers and claim information with Panorama (using its ZTP plugin) or cloud management ahead of time. On site, someone just plugs the firewall into power and an Internet-connected port. The firewall contacts the Palo Alto ZTP service, learns which Panorama it belongs to, connects, and receives its template and device group configuration. No skilled engineer needs to be present."
  ],
  "terms": [
   [
    "init-cfg.txt",
    "Bootstrap file with basic management, DNS, hostname and Panorama registration settings as key-value pairs."
   ],
   [
    "bootstrap.xml",
    "An optional full configuration file loaded during bootstrapping."
   ],
   [
    "authcodes",
    "The file in the license folder containing license authorization codes applied at first boot."
   ],
   [
    "Zero Touch Provisioning (ZTP)",
    "A process where supported hardware firewalls automatically connect to their assigned Panorama or cloud manager on first power-up."
   ]
  ],
  "example": "An autoscaling group in AWS launches new VM-Series instances during peak load. Each instance's user data points to an S3 bucket containing init-cfg.txt with Panorama addresses, device group and template stack names, plus an authcodes file. New firewalls license themselves, register with Panorama, receive policy and join the load balancer target group automatically.",
  "tip": "Know the five folders: config, license, software, content, plugins. init-cfg.txt handles bootstrap basics and Panorama registration; bootstrap.xml is optional full config. Bootstrapping only runs from factory default.",
  "check": [
   [
    "Which file tells a bootstrapping firewall which device group and template stack to join?",
    "init-cfg.txt."
   ],
   [
    "Why might a firewall ignore a bootstrap package after a reboot?",
    "Bootstrapping only runs on first boot from a factory-default state."
   ],
   [
    "What does the on-site person do in ZTP?",
    "Connect power and an Internet-connected interface; the firewall contacts the ZTP service and registers to its assigned manager."
   ]
  ]
 },
 {
  "t": "Form factors: PA-Series, VM-Series, CN-Series, Cloud NGFW for AWS and Azure",
  "body": [
   "Palo Alto runs the same core technology, PAN-OS with App-ID, User-ID, Content-ID and the security subscriptions, across several form factors. The exam expects you to pick the right one for a scenario and to know how each is managed.",
   "PA-Series firewalls are physical appliances, from small branch models to large chassis for data centers and service providers. They use a single-pass architecture where traffic is classified and inspected once, with dedicated hardware for the management plane and data plane so heavy management tasks do not slow traffic. Choose PA-Series for campus edges, data centers and branches where you own the physical network.",
   "VM-Series firewalls are the same PAN-OS as a virtual machine. They run on private cloud hypervisors such as VMware ESXi, KVM and Hyper-V, and in public clouds such as AWS, Azure, Google Cloud and Oracle Cloud. Licensing is available through flexible credit-based models or cloud marketplaces. You manage VM-Series like any firewall, usually through Panorama or cloud management, and deploy them with bootstrapping and infrastructure as code. In the cloud you still own the virtual machines: sizing, scaling, patching and high availability are your responsibility, often using cloud load balancers.",
   "CN-Series firewalls protect Kubernetes environments. They are delivered as containers: a management component (CN-MGMT) and firewall data plane components (CN-NGFW) that inspect traffic between pods, namespaces and services, including east-west traffic that never leaves the cluster. They are deployed with Kubernetes manifests or Helm charts, either as a DaemonSet (a firewall pod per node) or as a Kubernetes service mode, and they are managed by Panorama with a Kubernetes plugin that can learn pod labels and turn them into tags for dynamic policy.",
   "Cloud NGFW for AWS and Cloud NGFW for Azure are managed services. Palo Alto operates the firewall infrastructure, including scaling, availability and upgrades, and you consume it as a native cloud resource bought through the cloud marketplace. In AWS it is inserted with endpoints that work with the Gateway Load Balancer model; in Azure it is deployed into a virtual network or Virtual WAN hub. Policy is managed as rulestacks through the cloud console, APIs or infrastructure as code, or through Panorama integration. You give up some low-level control compared with VM-Series in exchange for not running the firewalls yourself.",
   "A simple way to decide: physical network, PA-Series; virtual machines you want to control fully, VM-Series; Kubernetes workloads, CN-Series; cloud networks where you want the provider-like managed experience, Cloud NGFW. Remote users and branches consumed as a cloud service point toward Prisma Access, the SASE offering built on the same technology."
  ],
  "terms": [
   [
    "PA-Series",
    "Palo Alto's physical hardware firewalls with separate management and data plane resources."
   ],
   [
    "VM-Series",
    "The virtual machine form of PAN-OS for private hypervisors and public clouds, operated by the customer."
   ],
   [
    "CN-Series",
    "Containerized firewalls for Kubernetes, with CN-MGMT and CN-NGFW components managed by Panorama."
   ],
   [
    "Cloud NGFW",
    "A managed firewall service for AWS and Azure that Palo Alto operates and customers consume as a native cloud resource."
   ],
   [
    "Rulestack",
    "The collection of rules and objects used to configure a Cloud NGFW resource."
   ]
  ],
  "example": "A company protects its data center with PA-Series, runs VM-Series in a private VMware cloud, uses CN-Series to control traffic between namespaces in its Kubernetes clusters, and for a new AWS account where the team does not want to manage firewall instances it subscribes to Cloud NGFW for AWS through the marketplace.",
  "tip": "Managed service with no instances to operate means Cloud NGFW. Kubernetes east-west inspection means CN-Series. Full control of a virtual firewall on any hypervisor or cloud means VM-Series.",
  "check": [
   [
    "Which form factor should you choose to inspect pod-to-pod traffic inside a Kubernetes cluster?",
    "CN-Series."
   ],
   [
    "Who handles scaling and upgrades for Cloud NGFW for AWS?",
    "Palo Alto Networks, because it is a managed service."
   ],
   [
    "What manages CN-Series firewalls?",
    "Panorama with the Kubernetes plugin."
   ]
  ]
 },
 {
  "t": "Strata Cloud Manager and cloud-delivered management",
  "body": [
   "Strata Cloud Manager (SCM) is Palo Alto's cloud-delivered management platform for network security. Instead of installing Panorama as an appliance or virtual machine, you manage firewalls and Prisma Access from a web console hosted by Palo Alto. It brings configuration, visibility, and AI-driven operations together in one place.",
   "Configuration in SCM uses a different model from Panorama's device groups and templates. Folders organize firewalls hierarchically; configuration applied at a higher folder is inherited by the folders and devices beneath it, similar to device group inheritance. Snippets are reusable, named sets of configuration, such as a standard set of security profiles or a DNS and NTP baseline, that you can associate with folders or devices. Configuration that differs per device can be set at the device level. Like Panorama, you edit a candidate and then push the configuration to devices.",
   "Onboarding a firewall to cloud management requires the device to be registered to your customer support account, licensed for cloud management, and able to reach the cloud service; the firewall uses a device certificate to authenticate. Logs flow to Strata Logging Service, which SCM uses for visibility and reporting. This is why cloud management and cloud logging usually go together.",
   "Beyond configuration, SCM includes operational features that grew out of AIOps for NGFW. These include best practice assessments that score your configuration against Palo Alto recommendations, continuous checks that warn about risky policy changes before or after you push them, health monitoring and predictive alerts about capacity, and dashboards and a command center summarizing threats, users and applications across the fleet. Many organizations also use SCM to gain these insights for firewalls still managed by Panorama, through Panorama's integration with the cloud.",
   "When to choose SCM versus Panorama? SCM suits organizations that want no management infrastructure to host, patch or back up, that also use Prisma Access, or that want unified cloud visibility. Panorama suits environments that must keep management on premises, including isolated or regulated networks without reliable Internet, and it remains the manager for some integrations. They are not mutually exclusive during migrations.",
   "Exam questions tend to test the concepts: SCM is cloud-delivered, uses folders and snippets, relies on Strata Logging Service for logs, and provides AIOps-style assessments. Avoid assuming a specific feature exists on every license tier; features and names in cloud services evolve, so confirm the current documentation when you plan a deployment."
  ],
  "terms": [
   [
    "Strata Cloud Manager (SCM)",
    "Palo Alto's cloud-delivered console for managing and monitoring NGFWs and Prisma Access."
   ],
   [
    "Folder",
    "An SCM hierarchy container whose configuration is inherited by the folders and devices beneath it."
   ],
   [
    "Snippet",
    "A reusable, named set of configuration in SCM that can be applied to folders or devices."
   ],
   [
    "Best practice assessment",
    "An evaluation of configuration against Palo Alto recommendations with scores and remediation advice."
   ]
  ],
  "example": "A fast-growing startup has 20 branch firewalls and Prisma Access for remote users but no data center to host Panorama. It onboards the firewalls to Strata Cloud Manager, organizes them into a Branches folder with a snippet holding standard security profiles, forwards logs to Strata Logging Service, and reviews the best practice assessment weekly.",
  "tip": "Map concepts: Panorama device groups and templates correspond to SCM folders and snippets. SCM is cloud-hosted and uses Strata Logging Service; Panorama is customer-hosted and suits on-premises or isolated environments.",
  "check": [
   [
    "What SCM construct holds a reusable set of configuration like a standard DNS and NTP baseline?",
    "A snippet."
   ],
   [
    "Where do firewalls managed by SCM send their logs?",
    "Strata Logging Service."
   ],
   [
    "Why might an organization keep Panorama instead of SCM?",
    "It needs management on premises, for example in an isolated or regulated network without reliable Internet access."
   ]
  ]
 }
]);
