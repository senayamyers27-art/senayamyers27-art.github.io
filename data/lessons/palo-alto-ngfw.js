/* Lessons for Palo Alto Networks Certified Next-Generation Firewall Engineer (NGFW-Engineer): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("palo-alto-ngfw", [
 {
  "t": "Interface types: Layer 3, Layer 2, virtual wire, tap, loopback, tunnel, VLAN and aggregate Ethernet (LACP); subinterfaces and 802.1Q tags",
  "body": [
   "Every PAN-OS deployment starts with a decision about how each physical port behaves. The interface type decides whether the firewall routes, switches, sits invisibly in the path, or only watches. Picking the right type matters because it controls which features you can use later: routing protocols, GlobalProtect and IPsec termination need Layer 3 interfaces, most Network Address Translation (NAT) designs use them, and a tap interface can never block anything. When you inherit a firewall, the first screen to read is Network > Interfaces, whose Ethernet, VLAN, Loopback and Tunnel tabs show each port's type, zone and router at a glance.",
   "A Layer 3 interface has an IP address, belongs to a virtual router (or logical router) and a Layer 3 zone, and forwards by routing. It is the most common type and the only physical type that supports a DHCP (Dynamic Host Configuration Protocol) server, dynamic routing protocols and VPN (virtual private network) termination, and it is the usual home for NAT. A Layer 2 interface has no IP address; the firewall switches frames between Layer 2 interfaces that share a VLAN object, while still applying security policy between Layer 2 zones. A virtual wire (vwire) binds exactly two interfaces together as a 'bump in the wire': no IP addresses, no MAC (media access control) learning and no routing. You drop it into an existing link without re-addressing anything, yet you still get App-ID, threat prevention and security policy. A vwire can pass tagged traffic, and its Tag Allowed field limits which VLAN tags it accepts. A tap interface receives a copy of traffic from a switch SPAN (Switched Port Analyzer) or mirror port. It gives visibility, such as App-ID and threat logs, but cannot block, because the firewall is not in the forwarding path.",
   "Several interfaces are logical rather than physical. A loopback interface is a Layer 3 interface that is always up, useful for management access, DNS proxy, a GlobalProtect portal or a stable source address that does not depend on one cable. A tunnel interface, for example `tunnel.1`, is the logical endpoint for route-based IPsec, GlobalProtect or GRE (Generic Routing Encapsulation); you assign it to a zone and a router just like a physical Layer 3 port, and routes that point at it send traffic into the tunnel. A VLAN interface gives a Layer 2 VLAN an IP address so hosts in that VLAN can be routed to Layer 3 networks, much like a switched virtual interface on a switch.",
   "An aggregate Ethernet (AE) interface, such as `ae1`, bundles several physical ports of the same speed and media into one logical link for more bandwidth and redundancy. You create the group under Network > Interfaces > Ethernet > Add Aggregate Group, then set each member port's Interface Type to Aggregate Ethernet and assign it to the group. Link Aggregation Control Protocol (LACP) is optional but recommended: it negotiates membership with the switch and detects a misconnected or failed member, so traffic is not black-holed. The AE group itself then gets a type, such as Layer 3, Layer 2 or virtual wire, and all configuration (IP, zone, subinterfaces) is done on the group, not on the members.",
   "Subinterfaces let one physical or AE port carry many networks using IEEE 802.1Q VLAN tags. On a Layer 3 port you create `ethernet1/3.20` with tag 20 and its own IP, zone and router, which is the classic 'router on a stick' design facing a trunk port on a switch. Layer 2 and vwire interfaces support subinterfaces too; on a vwire they let you put different VLANs into different zones. By convention the subinterface number matches the tag, but it is the tag field that actually matters. The distinction the exam tests is which type fits which requirement: routing, NAT or VPN means Layer 3; switching between hosts in one subnet means Layer 2; inline inspection with no network change means virtual wire; observe only means tap.",
   "Consider a worked example. A hospital wants threat prevention on the link between its core switch and an old router, but nobody can re-address the router this quarter. You configure ethernet1/5 and ethernet1/6 as a virtual wire, place each side in its own Virtual Wire zone, and cable the firewall inline. The firewall immediately enforces App-ID and threat profiles without any IP or routing change. Later the hospital adds a guest network on the same trunk, so you add vwire subinterfaces with tag 50 in a separate Guest zone, and guest traffic now gets its own rules while the clinical VLANs keep theirs.",
   "Common mistakes: expecting a tap interface to block (it only observes), trying to configure an IP address on AE member ports instead of on the `ae` group, putting a subinterface in a different VLAN from the switch's trunk tag so traffic never arrives, and assuming a loopback or tunnel interface works without a zone and router assignment.",
   "Exam questions usually describe a requirement and ask for the interface type. 'No network changes', 'no IP addresses' or 'transparent inline' point to virtual wire. 'Only monitor', 'SPAN port' or 'must never affect traffic' point to tap. 'Route between subnets', 'NAT', 'IPsec' or 'GlobalProtect' point to Layer 3. 'Bundle ports for bandwidth and failover' points to aggregate Ethernet with LACP, and 'several VLANs on one physical port with different zones' points to subinterfaces with 802.1Q tags."
  ],
  "terms": [
   [
    "Virtual wire",
    "A pair of interfaces bound together so the firewall inspects traffic transparently with no IP addresses, routing or switching."
   ],
   [
    "Tap interface",
    "An interface fed by a switch SPAN or mirror port that gives visibility and logging but cannot enforce or block."
   ],
   [
    "Aggregate Ethernet (AE)",
    "A logical interface bundling several same-speed physical ports, optionally negotiated with LACP, for bandwidth and redundancy."
   ],
   [
    "LACP",
    "Link Aggregation Control Protocol, which negotiates an aggregate bundle with the peer and removes failed or misconnected members."
   ],
   [
    "Subinterface",
    "A logical interface on a parent port that handles one 802.1Q VLAN tag, with its own zone and addressing."
   ],
   [
    "Tunnel interface",
    "A logical Layer 3 interface used as the endpoint of a route-based IPsec, GRE or GlobalProtect tunnel."
   ],
   [
    "Loopback interface",
    "An always-up logical Layer 3 interface used for services such as management, DNS proxy or a GlobalProtect portal."
   ],
   [
    "VLAN interface",
    "A Layer 3 interface attached to a Layer 2 VLAN so its hosts can be routed to other networks."
   ]
  ],
  "example": "A hospital wants threat prevention on the link between its core switch and an old router, but nobody can re-address the router this quarter. You configure ethernet1/5 and ethernet1/6 as a virtual wire in two Virtual Wire zones, cable the firewall inline, and it begins enforcing App-ID and threat profiles without any IP or routing change. When a guest VLAN is added to the same trunk, vwire subinterfaces with its tag place guests in their own zone.",
  "tip": "If a question says the firewall must be added 'with no network changes' or 'without IP addresses', the answer is virtual wire. If it must only observe and never block, it is tap. Routing, NAT and VPN termination require Layer 3.",
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
    "Create two Layer 3 subinterfaces (for example ethernet1/2.30 and ethernet1/2.40) with 802.1Q tags 30 and 40, each with its own IP address and zone."
   ],
   [
    "Where do you configure the IP address for an aggregate Ethernet bundle?",
    "On the ae interface (or its subinterfaces), not on the member ports, which are set to type Aggregate Ethernet."
   ]
  ]
 },
 {
  "t": "Security zones: zone types, one zone per interface, intrazone vs interzone default rules, User-ID enablement per zone",
  "body": [
   "A security zone is a named group of interfaces that share the same trust level, such as Trust, Untrust or DMZ (demilitarized zone). Palo Alto security policy is written between zones, not between interfaces, so zones are the backbone of every rule you will write. Traffic is always classified by a source zone, where it entered the firewall, and a destination zone, where it will leave. If an interface has no zone, the firewall will not pass traffic through it at all, which is a common surprise on a new deployment.",
   "Zones have types that must match the interfaces placed in them: Layer 3, Layer 2, Virtual Wire, Tap, Tunnel and External. A Layer 3 interface can only join a Layer 3 zone, a vwire interface only a Virtual Wire zone, and so on. The External type is special: it exists only on firewalls with multiple virtual systems (vsys) and represents another virtual system, used for traffic passing between vsys. The Tunnel zone type is used with tunnel content inspection, where the firewall inspects the traffic carried inside a cleartext tunnel such as GRE or unencrypted GTP (GPRS Tunneling Protocol), so you can write policy on the inner traffic.",
   "The key rule is that an interface or subinterface belongs to exactly one zone, while a zone can contain many interfaces. That is why subinterfaces are so useful: two VLANs on the same port can sit in different zones. Traffic entering and leaving interfaces in the same zone is intrazone; traffic crossing from one zone to a different zone is interzone. You create zones under Network > Zones and assign interfaces there or on the interface's Config tab. Zones are also where zone protection profiles attach, and they are the unit that logs, reports and the Application Command Center summarize by.",
   "At the bottom of every rulebase are two predefined rules. `intrazone-default` allows traffic within the same zone, and `interzone-default` denies traffic between different zones. Neither logs by default. You cannot delete them, but you can select one and click Override to enable logging or attach security profiles, which is a common best practice so that denied interzone traffic shows up in the Traffic log. Any rule you write above them takes precedence because the rulebase is evaluated top-down and the first match wins. Security rules also have a rule type: universal (the default, matching intrazone and interzone), intrazone or interzone, which changes how the zones you list are interpreted.",
   "Zones also control where User-ID runs. In the zone settings there is an Enable User Identification checkbox. When it is enabled, the firewall maps IP addresses from that zone to usernames, so source users appear in logs and user or group based rules can match. Enable it only on internal zones where your users actually are. Enabling it on an Internet-facing zone is a known risk: if client probing is configured, the firewall may try to probe untrusted addresses, which can expose credentials or hashes to outsiders, and it wastes resources mapping addresses that will never be users. You can further narrow mapping with include and exclude network lists on the zone.",
   "Consider a worked example. Two web servers sit in the DMZ zone on different subinterfaces. Traffic between them is intrazone and therefore allowed by the default rule, which worries the auditor because a compromised server could attack its neighbor. You add an explicit DMZ-to-DMZ rule allowing only the application the servers genuinely need, such as `mysql` from the front end to the database, then add an intrazone deny rule with logging below it. You also override interzone-default to log at session end. Lateral movement between the servers is now restricted and visible in the Traffic log.",
   "Common mistakes: expecting denied interzone traffic to appear in the Traffic log without overriding the default rule, forgetting to assign a newly created subinterface to a zone, trying to put a Layer 3 interface into a Virtual Wire zone, and enabling User Identification on the Untrust zone. Another subtle mistake is assuming intrazone traffic is inspected just because it is allowed; the default intrazone rule has no security profiles unless you override it or write your own rule.",
   "Exam questions often ask about defaults and placement. 'Why does blocked traffic not appear in the logs?' points to overriding interzone-default to enable logging. 'Hosts in the same zone can reach each other without any rule' points to intrazone-default. 'Two VLANs on one port need different policy' points to subinterfaces in separate zones. 'Where should User-ID be enabled?' points to trusted internal zones only, and 'zone that represents another vsys' points to the External zone type."
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
   ],
   [
    "Tunnel zone",
    "A zone type used with tunnel content inspection so policy can apply to traffic inside a cleartext tunnel."
   ],
   [
    "Enable User Identification",
    "A per-zone setting that tells the firewall to map IP addresses in that zone to usernames."
   ],
   [
    "Rule override",
    "Changing the settings, such as logging or profiles, of a predefined default rule, which cannot be deleted."
   ]
  ],
  "example": "Two web servers sit in the DMZ zone on different subinterfaces. Traffic between them is intrazone and allowed by default, which worries the auditor. You add an explicit DMZ-to-DMZ rule allowing only the needed application, then an intrazone deny rule with logging below it, and override interzone-default to log. Lateral movement between the servers is now restricted and every blocked attempt is visible in the Traffic log.",
  "tip": "Remember the defaults: intrazone allowed, interzone denied, neither logged. When a question asks why denied traffic does not appear in the Traffic log, the answer is that interzone-default must be overridden to enable logging.",
  "check": [
   [
    "Can one Layer 3 interface belong to two zones?",
    "No. Each interface or subinterface belongs to exactly one zone; use subinterfaces if you need different zones on one port."
   ],
   [
    "Where should 'Enable User Identification' be turned on?",
    "Only on trusted internal zones where users originate, never on Internet-facing untrusted zones, to avoid probing or exposing credentials to outsiders."
   ],
   [
    "What happens to traffic from Trust to DMZ if no rule matches it?",
    "It hits interzone-default and is denied, without logging unless the rule is overridden."
   ],
   [
    "Which zone type represents another virtual system?",
    "The External zone type, available on multi-vsys firewalls for inter-vsys traffic."
   ]
  ]
 },
 {
  "t": "Zone protection profiles (flood, reconnaissance, packet-based) and interface management profiles",
  "body": [
   "A zone protection profile defends a whole zone against floods, scans and malformed packets. You create it under Network > Network Profiles > Zone Protection and attach it to the ingress zone, typically the Internet-facing zone, under Network > Zones. The firewall enforces it before security policy is even evaluated. That early placement is why it is cheap and effective: bad traffic is dropped before it consumes session resources. Zone protection is your first, broad layer of denial-of-service (DoS) defense.",
   "Flood protection covers SYN, UDP, ICMP (Internet Control Message Protocol), ICMPv6 and 'other IP' floods. Each uses three thresholds measured in new connections per second arriving at the zone: Alarm (generate an alarm), Activate (start dropping) and Maximum (drop everything above this rate). For UDP, ICMP and other floods the drop mechanism is Random Early Drop (RED), which discards an increasing share of packets as the rate climbs from Activate toward Maximum. For SYN floods you can choose RED or SYN cookies. With SYN cookies the firewall answers the SYN on the server's behalf and only forwards the connection once the client completes the handshake, so legitimate users still connect while spoofed SYNs are absorbed. SYN cookies is the usual recommendation. Base thresholds on measured normal peaks rather than guessing, because thresholds that are too low drop legitimate traffic.",
   "Reconnaissance protection detects TCP port scans, UDP port scans and host sweeps, where one source probes many addresses. For each you set an interval and a threshold of events, and an action: allow, alert, block, or block-ip for a set duration, tracking by source or by source and destination. You can exclude trusted scanners, such as your own vulnerability scanner, by source address so they are not blocked during authorized scans.",
   "Packet-based attack protection drops traffic that is malformed or abused. Options include dropping spoofed IP addresses (the source is not reachable through the interface it arrived on), IP options such as strict or loose source routing, fragmented traffic if you choose, TCP SYN packets carrying data, mismatched overlapping TCP segments, TCP split handshakes, oversized ICMP and ping of death, and suspicious IPv6 extension headers. Many of these are off by default because they can break unusual but legitimate applications, so enable them in a test window and watch the Threat log.",
   "Do not confuse zone protection with DoS protection policy. Zone protection is aggregate and zone-wide. DoS protection policy (Policies > DoS Protection) uses DoS protection profiles to protect specific critical hosts, with classified (per source or destination IP) or aggregate thresholds, and matches on zones, addresses and services like a rule. Best practice uses both. An interface management profile is unrelated to attacks from the network; it controls which management services a data-plane interface answers. Services include ping, SSH, HTTPS, HTTP, Telnet, SNMP, Response Pages (needed for Authentication Portal and URL block pages), User-ID and the User-ID syslog listeners, plus a Permitted IP Addresses list. You create it under Network > Network Profiles > Interface Mgmt and attach it on the interface's Advanced tab. Without a profile, a data interface does not even answer ping.",
   "Consider a worked example. After a port scan from the Internet shows up in the Threat log, you create a zone protection profile for the Untrust zone. TCP port scan detection is set to block-ip for an hour, SYN flood protection uses SYN cookies with thresholds just above your measured peak, and spoofed-IP packets are dropped. Your internal vulnerability scanner's address is added as an exclusion. Separately, the branch team cannot ping the inside gateway, so you create an interface management profile allowing ping and HTTPS from the admin subnet only and attach it to the inside interface, never to the outside one.",
   "Common mistakes: attaching zone protection to the destination zone instead of the ingress zone, copying threshold numbers from another site without measuring, enabling every packet-based option at once and breaking an application, and attaching an interface management profile that allows HTTPS or SSH to an Internet-facing interface. Another is forgetting Response Pages in the profile, which silently stops block pages and Authentication Portal from working.",
   "Exam questions use clear clue words. 'Protect the whole zone', 'before policy lookup' or 'SYN flood from the Internet' point to a zone protection profile on the ingress zone. 'Protect one critical server with per-IP thresholds' points to DoS protection policy. 'Complete the handshake on the server's behalf' is SYN cookies. 'Interface will not answer ping' or 'block page not shown' points to a missing interface management profile or a missing Response Pages option."
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
    "A flood defense that drops a growing share of packets once the Activate threshold is exceeded."
   ],
   [
    "Reconnaissance protection",
    "Zone protection settings that detect port scans and host sweeps and can alert, block or block the source IP."
   ],
   [
    "DoS protection policy",
    "Rules with DoS profiles that protect specific hosts using classified or aggregate thresholds."
   ],
   [
    "Interface management profile",
    "A profile that controls which management and response services (ping, SSH, HTTPS, response pages and more) a data interface accepts."
   ]
  ],
  "example": "After a port scan from the Internet shows up in the Threat log, you apply a zone protection profile to the Untrust zone with TCP port scan detection set to block-ip for an hour, SYN flood protection using SYN cookies, and spoofed-IP drops. Your internal vulnerability scanner's address is added as an exclusion so authorized scans keep working, and an interface management profile allowing only ping and HTTPS from the admin subnet goes on the inside interface.",
  "tip": "Zone protection attaches to the ingress zone, not the destination. If a question asks why an interface will not answer ping or show a block page, look for a missing interface management profile or a missing Response Pages option.",
  "check": [
   [
    "What are the three flood thresholds?",
    "Alarm, Activate and Maximum, measured in new connections per second to the zone."
   ],
   [
    "How does zone protection differ from DoS protection policy?",
    "Zone protection is zone-wide and applied at ingress; DoS protection policy targets specific hosts with rules and DoS profiles, including per-IP thresholds."
   ],
   [
    "Where do you allow ping on a data interface?",
    "In an interface management profile with ping enabled, attached on the interface's Advanced tab."
   ],
   [
    "Why is SYN cookies usually preferred over RED for SYN floods?",
    "It lets legitimate clients complete connections while spoofed SYNs are absorbed, instead of dropping packets randomly."
   ]
  ]
 },
 {
  "t": "Routing: virtual routers vs logical routers (Advanced Routing Engine), static routes, OSPF, BGP, administrative distance defaults, ECMP",
  "body": [
   "A PAN-OS firewall routes with a routing instance to which Layer 3 interfaces are assigned. For many years that instance has been the virtual router (VR); a new firewall ships with one called `default`. You can create more VRs to separate routing domains, and a static route can use another VR as its next hop. Each VR has its own routing table, the RIB (routing information base), and forwarding table, the FIB (forwarding information base). Routing matters for security because the destination zone of every session is found by a route lookup.",
   "Newer PAN-OS releases add the Advanced Routing Engine on supported platforms. When you enable Advanced Routing under Device > Setup > Management > General Settings, then commit and reboot, virtual routers are replaced by logical routers. The protocols are the same in spirit, but configuration is reorganized: route filtering, redistribution and BGP or OSPF tuning use reusable routing profiles, filters, access lists, prefix lists and route maps under Network > Routing > Routing Profiles, closer to how traditional routers are configured. Enabling it restructures the routing configuration, so back up and plan the change first. On the exam, 'logical router' means the Advanced Routing Engine and 'virtual router' means the legacy engine.",
   "Static routes have a destination prefix, an egress interface and/or next hop, an administrative distance and a metric. Optional path monitoring pings an address and withdraws the route when it fails, which lets a backup static route take over. OSPF (Open Shortest Path First) is a link-state interior gateway protocol: you set the router ID, define areas (area 0 as the backbone, plus normal, stub or NSSA, not-so-stubby areas), add participating interfaces, and confirm neighbors reach Full state. BGP (Border Gateway Protocol) is used toward ISPs and between large networks: you set the local AS (autonomous system) number and router ID, create peer groups and peers with their AS numbers, and use import and export rules or redistribution to control what is learned and advertised.",
   "When the same destination is available from several sources, the firewall prefers the longest prefix match first, then the lowest administrative distance (AD), then the lowest metric. The PAN-OS default AD values are: static 10, eBGP 20, OSPF internal 30, OSPF external 110, RIP 120 and iBGP 200. Notice that OSPF internal (30) differs from the common Cisco value of 110, a frequent exam trap. You can change AD per static route or per protocol. Equal-cost multipath (ECMP) lets the router install several equal-cost routes to one destination and share sessions across them. You enable it on the router and choose a load-balancing method: IP Modulo, IP Hash, Weighted Round Robin or Balanced Round Robin. Balancing is per session, so packets of one session stay on one path, and the Symmetric Return option sends return traffic out the interface on which the session arrived.",
   "Consider a worked example. A branch firewall learns 10.20.0.0/16 from OSPF over MPLS and also has a static route for 10.20.0.0/16 through a backup IPsec tunnel. With default values the static route (AD 10) would win and send everything over the backup path. You set the static route's AD to 200 so the OSPF internal route (AD 30) is preferred. The static route becomes a floating route that only enters the FIB if OSPF loses the prefix. You verify with `show routing route` on the legacy engine, or the `show advanced-routing route` family on a logical router, and test a destination with `test routing fib-lookup virtual-router default ip 10.20.1.5`.",
   "Common mistakes: forgetting to add a new Layer 3 interface to the router, so connected routes never appear; assuming Cisco AD values apply; expecting AD to beat a more specific prefix; enabling ECMP and expecting per-packet balancing; and changing to the Advanced Routing Engine without reviewing the migrated configuration. Another is forgetting that OSPF neighbors stuck in ExStart or Exchange often point to an MTU (maximum transmission unit) mismatch, while neighbors that never appear point to area, authentication or hello settings.",
   "Exam questions tend to test ordering and defaults. 'Which route is used?' is answered by longest prefix first, then AD, then metric. 'Floating static route' means raising the static AD above the dynamic protocol. 'Logical router', 'route maps' and 'routing profiles' point to the Advanced Routing Engine. 'Several equal paths, balance sessions' points to ECMP, and 'return traffic must use the same interface' points to Symmetric Return."
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
    "Floating static route",
    "A static route given a higher administrative distance so it is used only when the preferred dynamic route disappears."
   ],
   [
    "ECMP",
    "Equal-cost multipath: installing multiple equal routes to a destination and balancing sessions across them."
   ],
   [
    "RIB and FIB",
    "The routing information base holds all learned routes; the forwarding information base holds the best routes actually used to forward."
   ]
  ],
  "example": "A branch firewall learns 10.20.0.0/16 from OSPF and also has a static route for 10.20.0.0/16 via a backup circuit. You set the static route's AD to 200 so OSPF (internal, AD 30) is preferred, and the floating static route only appears in the forwarding table if OSPF loses the prefix. A test with test routing fib-lookup confirms the OSPF next hop is used while the primary circuit is up.",
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
   ],
   [
    "What is the PAN-OS default administrative distance for OSPF internal routes?",
    "30, which differs from the value used by some other vendors."
   ]
  ]
 },
 {
  "t": "Policy-based forwarding with path monitoring; service routes; DHCP server/relay and DNS proxy",
  "body": [
   "Normally the firewall forwards by destination using the routing table. Policy-based forwarding (PBF) overrides that for traffic matching specific criteria, for example sending guest traffic out a cheap broadband link while corporate traffic uses MPLS (Multiprotocol Label Switching). PBF rules live under Policies > Policy Based Forwarding and are evaluated before the route lookup for a new session. This lesson also covers three services the firewall provides to itself and to clients: service routes, DHCP and DNS proxy.",
   "A PBF rule matches on source zone or interface, source address, source user, destination address, application and service. Its action is Forward (with an egress interface and optional next hop), Forward to VSYS on multi-vsys firewalls, Discard, or No PBF, which exempts matching traffic so it uses normal routing. Application-based PBF has a catch: the PBF decision is made on the first packet, before App-ID has identified the application. The firewall solves this with an application cache, so the first session of an application follows the routing table and later sessions match the PBF rule once the app is cached. Use service or address criteria where you can.",
   "Path monitoring makes PBF safe. On the Forwarding tab you enable monitoring with a monitor profile and a monitored IP, often the next hop or something beyond it. If the pings fail, the action Fail Over disables the rule so traffic falls back to the routing table, while Wait Recover keeps using the rule and waits for the path to return. Enforce Symmetric Return, set on the same tab, makes replies to sessions that arrived on a particular interface leave by that same interface and next hop, which matters with two ISPs so return traffic does not exit through the wrong provider and get dropped.",
   "Service routes answer a different question: which interface does the firewall's own management plane use to reach services such as DNS, NTP (Network Time Protocol), dynamic updates, syslog, LDAP, RADIUS or Panorama? By default everything leaves the dedicated MGT port. Under Device > Setup > Services > Service Route Configuration you can pick a data interface and source address per service, which is common when the MGT network has no Internet access. On Layer 3 interfaces the firewall can act as a DHCP (Dynamic Host Configuration Protocol) server under Network > DHCP, handing out addresses from a pool along with gateway, DNS and other options, and it can inherit DNS settings from an upstream DHCP client interface. Or it can act as a DHCP relay, forwarding client broadcasts to a central DHCP server. An interface cannot be both server and relay.",
   "A DNS proxy (Network > DNS Proxy) makes a firewall interface answer DNS queries for clients. It forwards queries to primary and secondary servers, can send specific domains to specific servers using domain rules (split DNS), can hold static FQDN-to-IP entries, and caches answers to speed up responses. It is handy for branches and is required by some features, such as the web proxy. The distinction to hold onto: PBF steers user traffic, service routes steer firewall-originated traffic, DHCP hands out addresses and DNS proxy answers name queries.",
   "Consider a worked example. A retail branch has MPLS and a broadband link. You write a PBF rule matching the Guest zone, forwarding to the broadband interface with the ISP gateway as next hop, path monitoring on 198.51.100.1 with action Fail Over, and symmetric return enabled. When the broadband link drops, the rule disables itself and guest traffic follows the default route over MPLS until the link recovers. The branch's MGT port sits on an isolated network, so you configure service routes for Palo Alto Networks Services and DNS through the broadband interface so content updates keep arriving.",
   "Common mistakes: expecting an app-based PBF rule to catch the very first session, forgetting that a PBF forward rule without monitoring keeps black-holing traffic when the path dies, using PBF to fix management traffic that actually needs a service route, and configuring an interface as both DHCP server and relay. Another is forgetting that PBF only changes the path: security policy still has to allow the traffic in the new egress zone.",
   "Exam questions use recognizable clues. 'Send traffic from a particular user, zone or application out a different ISP' points to PBF. 'First session ignored the rule' points to the application cache. 'Rule should stop being used when the link fails' is Fail Over path monitoring. 'Firewall cannot download updates because MGT has no Internet' points to a service route. 'Forward DHCP requests to a central server' is DHCP relay, and 'send internal domains to internal DNS servers' is a DNS proxy domain rule."
  ],
  "terms": [
   [
    "Policy-based forwarding (PBF)",
    "Rules that forward matching traffic by criteria like source, user or application instead of the routing table."
   ],
   [
    "Application cache",
    "The record of App-ID results by destination that lets later sessions of an application match app-based PBF rules."
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
    "DHCP relay",
    "A firewall interface role that forwards client DHCP broadcasts to a DHCP server on another network."
   ],
   [
    "DNS proxy",
    "A firewall feature that answers client DNS queries, forwards them to chosen servers per domain and caches the results."
   ]
  ],
  "example": "A retail branch has MPLS and a broadband link. A PBF rule sends the Guest zone to the broadband interface with path monitoring on the ISP gateway set to Fail Over. When the broadband link drops, the rule disables itself and guest traffic follows the default route over MPLS until the link recovers. Because the branch's MGT network has no Internet, service routes send update and DNS traffic out the broadband interface.",
  "tip": "PBF is evaluated before routing, but app-based PBF only applies after the app is in the application cache, so the first session uses the routing table. Service routes are for firewall-originated traffic, not user traffic.",
  "check": [
   [
    "Why might the first session of an application ignore an app-based PBF rule?",
    "The PBF decision is made on the first packet before App-ID identifies the app; only later sessions match via the application cache."
   ],
   [
    "Your MGT port has no Internet access and dynamic updates fail. What do you configure?",
    "A service route so the Palo Alto Networks Services traffic uses a data interface with Internet access."
   ],
   [
    "What does Fail Over do in PBF path monitoring?",
    "It disables the PBF rule when monitoring fails so traffic falls back to the normal routing table."
   ],
   [
    "Can one interface be both a DHCP server and a DHCP relay?",
    "No, an interface is configured as either a DHCP server or a DHCP relay, not both."
   ]
  ]
 },
 {
  "t": "NAT on Layer 3 interfaces: source NAT (DIPP, dynamic IP, static), destination NAT, U-turn NAT, pre-NAT IP vs post-NAT zone in security rules",
  "body": [
   "Network Address Translation (NAT) rewrites addresses as traffic crosses the firewall. PAN-OS handles NAT in its own rulebase (Policies > NAT), separate from security rules, and evaluates it top-down with the first match winning. Only one NAT rule applies to a session, so a rule can translate both source and destination at once if needed. NAT is normally done on Layer 3 interfaces; virtual wire supports some NAT too, but the exam focuses on Layer 3. Understanding NAT is essential because nearly every Internet-facing design uses it, and misreading how NAT and security policy interact is the most common cause of rules that never match.",
   "Source NAT changes the source address, usually so private hosts can reach the Internet. Dynamic IP and Port (DIPP) is the everyday choice: many internal hosts share one public address, often the egress interface address, and the firewall keeps their sessions apart by translating source ports. Dynamic IP translates each host one-to-one to the next free address in a pool without changing ports; when the pool runs out, new sessions fail unless you configure a fallback to DIPP. Static IP translates a fixed address to a fixed address, keeping the port, and its Bi-directional option also creates the matching inbound translation so outside hosts can start sessions to the inside host.",
   "Destination NAT changes the destination address, typically to publish an internal server. A rule matching the server's public IP translates it to the private address, optionally with port translation, such as public 443 to private 8443. Destination translation can also target an address object that resolves by FQDN, or distribute sessions across several addresses. For dynamic destination translation, PAN-OS offers distribution methods such as round robin.",
   "The most tested concept is how zones and addresses line up. When a packet arrives, the firewall determines the source zone from the ingress interface, then does a route lookup on the original (pre-NAT) destination to find the destination zone, and matches NAT policy with those values. Security policy is then checked using the pre-NAT IP addresses and the post-NAT zone, the zone where the translated destination actually lives. For an inbound web server, the NAT rule is from Untrust to Untrust (the public IP routes toward the Untrust interface), destination the public IP, translated to the private address. The security rule is from Untrust to DMZ (post-NAT zone), with the public IP (pre-NAT address) as its destination.",
   "U-turn NAT solves internal users reaching an internal server by its public IP. With only a destination translation, and the server in the same subnet as the users, the request goes to the firewall, is translated to the server, and the server replies directly to the user, bypassing the firewall and breaking the session. The fix is a NAT rule from Trust to Untrust (the route lookup for the public IP points to Untrust), destination the public IP, translated to the server, plus source translation to the firewall's interface address so replies come back through the firewall. Split DNS, which hands internal clients the private address, is often a cleaner alternative.",
   "Consider a worked example. A web server at 10.10.10.5 in the DMZ is published as 203.0.113.10. The NAT rule matches source zone Untrust, destination zone Untrust, destination 203.0.113.10, and translates the destination to 10.10.10.5. The security rule allows Untrust to DMZ, destination 203.0.113.10, applications `web-browsing` and `ssl`. You verify with `test nat-policy-match from Untrust to Untrust source 198.51.100.7 destination 203.0.113.10 destination-port 443 protocol 6` and the matching `test security-policy-match` command, then check the NAT columns in the Traffic log. Written with 10.10.10.5 as the destination, the security rule would never match.",
   "Common mistakes: using the private (post-NAT) address in the security rule for inbound traffic, using the DMZ zone as the destination zone of the inbound NAT rule, placing a broad outbound DIPP rule above a specific static rule so the static rule never matches, and using Dynamic IP for a large user population and running out of pool addresses. Another is forgetting that the firewall must own or answer ARP (Address Resolution Protocol) for public addresses that are not its interface address, usually by routing the range to the firewall.",
   "Exam questions almost always turn on the address and zone rule. 'Which destination address in the security rule?' is the pre-NAT public address. 'Which destination zone in the security rule?' is the post-NAT zone. 'Which destination zone in the NAT rule?' is the zone found by routing the pre-NAT destination. 'Many users share one address' is DIPP, 'pool exhausted' is Dynamic IP, 'internal users reach a server by its public name' is U-turn NAT, and 'one-to-one in both directions' is static with Bi-directional."
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
    "Static IP NAT",
    "A fixed one-to-one address translation that can be made bi-directional to allow inbound connections."
   ],
   [
    "Destination NAT",
    "Translation of the destination address, and optionally port, usually to publish an internal server."
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
  "example": "A web server at 10.10.10.5 in the DMZ is published as 203.0.113.10. The NAT rule matches Untrust to Untrust, destination 203.0.113.10, translated to 10.10.10.5. The security rule allows Untrust to DMZ, destination 203.0.113.10, applications web-browsing and ssl. Written with 10.10.10.5 as the destination, the security rule would never match, and test security-policy-match would show the session hitting interzone-default.",
  "tip": "Security rules use pre-NAT addresses and the post-NAT zone. NAT rules use pre-NAT addresses and the zone found by routing the pre-NAT destination. Almost every NAT exam question turns on this.",
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
   ],
   [
    "What destination zone does the NAT rule for an inbound published server use?",
    "Untrust, because the route lookup for the public (pre-NAT) address points to the Untrust interface."
   ]
  ]
 },
 {
  "t": "High availability: active/passive vs active/active, HA1/HA2/HA3 and backup links, priority and preemption, link and path monitoring, floating IPs",
  "body": [
   "High availability (HA) pairs two identical firewalls so that if one fails, the other carries on with minimal disruption. Both peers must be the same model, run the same PAN-OS and content versions, and have matching licenses, and each is given a group ID and the peer's HA1 address. HA is configured under Device > High Availability. Because a firewall is often the only path to the Internet or between network segments, HA is how you remove it as a single point of failure.",
   "In active/passive mode, one firewall handles all traffic while the other stays synchronized and ready. On failover, the passive peer takes over the same interface IP and MAC addresses, so neighbors barely notice. It works with Layer 3, Layer 2 and virtual wire deployments and is the recommended mode for most designs because it is simple to troubleshoot. In active/active mode, both peers process traffic at once. It supports only Layer 3 and virtual wire and exists mainly for asymmetric routing designs where traffic may arrive on either firewall. It adds concepts such as the session owner (the peer that performs Layer 7 inspection), the session setup peer, and floating IP addresses. It does not double usable capacity, because each peer must still be able to carry the full load after a failure.",
   "Peers talk over dedicated links. HA1 is the control link: hellos, heartbeats, HA state and management-plane configuration synchronization. HA2 is the data link: it synchronizes sessions, forwarding tables, IPsec security associations and ARP tables, so existing sessions survive failover. HA2 can use Ethernet, IP or UDP transport. HA3 exists only in active/active and forwards packets between peers for session setup and asymmetric traffic; it is a Layer 2 link and benefits from jumbo frames. HA1 backup and HA2 backup links provide redundancy for the control and data links, which avoids split brain, where both peers believe they should be active because the only HA1 link failed.",
   "Device priority decides which peer should be active; the lower number wins. Preemption lets the higher-priority firewall take the active role back after it recovers. Preemption only works if it is enabled on both peers, and it is off by default, so the peer that took over normally stays active. Failover triggers include heartbeat loss and monitoring. Link monitoring watches physical interfaces grouped into link groups: the failure condition 'any' fails over if one link in the group goes down, 'all' only when every link fails. Path monitoring pings destination IPs, such as the upstream router, and fails over when they become unreachable. Together they catch failures a heartbeat would miss, such as a dead switch port.",
   "Floating IP addresses belong to active/active. Instead of one peer owning the interface address, a floating IP is bound to a device ID and moves to the surviving peer on failure. For load sharing you can use two floating IPs, one active on each peer, or ARP load-sharing, where both peers answer for one virtual IP. Check status in the dashboard's High Availability widget or with `show high-availability state`, and review HA events in the System log.",
   "Consider a worked example. In an active/passive pair, the upstream switch port for the active firewall's Untrust interface dies, but the firewall itself stays up and keeps sending heartbeats. Because you configured a link group containing ethernet1/1 with the 'any' condition, the firewall declares itself non-functional and fails over. The passive peer becomes active with the same IP and MAC addresses, and sessions synchronized over HA2 continue. Once the port is repaired, the original peer returns to passive, because preemption is disabled, and you fail back in a maintenance window with `request high-availability state suspend` on the active peer.",
   "Common mistakes: expecting the higher priority number to win, enabling preemption on only one peer, running HA1 over a single cable with no backup and causing split brain, and choosing active/active for extra throughput when active/passive would be simpler. Another is forgetting to configure link or path monitoring, so a dead upstream switch causes an outage while HA shows everything as healthy.",
   "Exam questions use clear signals. 'Sessions survive failover' points to HA2. 'Heartbeats and configuration sync' is HA1. 'Packet forwarding between peers' or 'asymmetric routing' points to HA3 and active/active. 'Recovered firewall did not become active again' points to preemption. 'Both peers active after a link failure' is split brain, fixed with backup links, and 'address moves between peers in active/active' is a floating IP."
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
    "Split brain",
    "A failure where both peers believe they should be active, usually because the only HA1 link failed."
   ],
   [
    "Link group",
    "A set of monitored interfaces whose failure condition (any or all) triggers failover."
   ],
   [
    "Floating IP",
    "An active/active address bound to one peer that moves to the other peer on failure."
   ]
  ],
  "example": "In an active/passive pair, the upstream switch port for the active firewall's Untrust interface dies but the firewall stays up. Because you configured a link group containing ethernet1/1 with the 'any' condition, the firewall fails over, the passive peer becomes active with the same IP and MAC, and synchronized sessions over HA2 continue. Preemption is off, so you fail back later in a maintenance window.",
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
   ],
   [
    "Which deployment types does active/active support?",
    "Layer 3 and virtual wire only."
   ]
  ]
 },
 {
  "t": "Site-to-site IPsec: IKE gateway, IKE and IPsec crypto profiles, tunnel interfaces, proxy IDs, tunnel monitoring",
  "body": [
   "Palo Alto firewalls build route-based site-to-site VPNs (virtual private networks). Instead of a policy saying 'encrypt traffic from A to B', you create a tunnel interface and route the remote networks to it. Anything routed into the tunnel is protected with IPsec (IP Security). This keeps VPN logic in routing, where static routes or dynamic protocols such as OSPF and BGP can steer traffic, and it makes the tunnel look like any other interface in a zone.",
   "The building blocks are configured in order. First, a tunnel interface (Network > Interfaces > Tunnel, for example `tunnel.10`) assigned to a virtual or logical router and a security zone; an IP address on it is optional but required for tunnel monitoring or dynamic routing over the tunnel. Second, an IKE (Internet Key Exchange) crypto profile for phase 1: Diffie-Hellman (DH) group, encryption algorithm, authentication (hash) algorithm and key lifetime. Third, an IPsec crypto profile for phase 2: ESP (Encapsulating Security Payload) or AH (Authentication Header), encryption, authentication, the DH group for perfect forward secrecy (PFS) and the lifetime. Both peers must agree on these values. Both profiles live under Network > Network Profiles.",
   "Next is the IKE gateway (Network > Network Profiles > IKE Gateways). It defines the IKE version (IKEv1 only, IKEv2 only, or IKEv2 preferred), the local interface and IP, the peer address (static IP, FQDN or dynamic), authentication by pre-shared key or certificate, local and peer identification, the IKE crypto profile, and advanced options like NAT traversal, passive mode and dead peer detection. Finally, the IPsec tunnel object (Network > IPsec Tunnels) ties together the tunnel interface, the IKE gateway and the IPsec crypto profile, and holds proxy IDs and tunnel monitoring settings.",
   "Proxy IDs define which local and remote subnets a phase 2 security association (SA) covers. A PAN-OS-to-PAN-OS route-based tunnel does not need them, because both sides propose 0.0.0.0/0 by default. But when the peer is a policy-based device, you must enter proxy IDs that exactly mirror the peer's configured local and remote networks, one per subnet pair, with each side's local matching the other side's remote. A mismatch is the classic cause of phase 1 coming up while phase 2 fails. Tunnel monitoring sends pings through the tunnel to a destination IP on the far side, sourced from the tunnel interface IP. A monitor profile chooses what happens on failure: Wait Recover keeps the tunnel and waits, while Fail Over lets routing or PBF move traffic to a backup path. Dead peer detection works at the IKE level; tunnel monitoring proves traffic actually passes.",
   "Do not forget policy and routing. You need a route for the remote subnets pointing to the tunnel interface, security rules between the internal zone and the VPN zone in both directions, and a rule permitting IKE and IPsec (applications `ike` and `ipsec-esp`) between the public endpoints if the external interface's zone requires it. Troubleshoot with the status lights on the IPsec Tunnels page, the System log filtered for IKE messages, and CLI commands such as `show vpn ike-sa`, `show vpn ipsec-sa`, `test vpn ike-sa gateway <name>` and `test vpn ipsec-sa tunnel <name>`.",
   "Consider a worked example. You connect a PAN-OS firewall to a partner's policy-based VPN device protecting 172.16.5.0/24 and 172.16.6.0/24. Phase 1 establishes, but nothing passes. The System log shows the phase 2 negotiation failing because the proposed networks do not match. You add two proxy IDs on the IPsec tunnel, each pairing your local 10.1.0.0/16 with one remote subnet, add static routes for both remote subnets to `tunnel.20`, and write rules between Trust and the Partner-VPN zone. Both SAs come up, and tunnel monitoring against the partner's server keeps watch.",
   "Common mistakes: mismatched crypto profiles (phase 1 fails), mismatched proxy IDs (phase 2 fails), forgetting the route to the tunnel interface so traffic leaves in cleartext toward the Internet, leaving the tunnel interface without a zone, and enabling tunnel monitoring without an IP address on the tunnel interface. Another is mismatched peer identification when one side is behind NAT, which NAT traversal and correct local and peer IDs resolve.",
   "Exam questions often describe symptoms. 'Phase 1 fails' points to IKE gateway or IKE crypto settings: pre-shared key, IKE version, DH group or peer ID. 'Phase 1 up, phase 2 down with a third-party peer' points to proxy IDs or the IPsec crypto profile. 'Tunnel up but no traffic' points to routing or security policy. 'Detect a broken data path and fail over' is tunnel monitoring, and 'object that ties it all together' is the IPsec tunnel."
  ],
  "terms": [
   [
    "IKE gateway",
    "The object defining the VPN peer, local interface, IKE version, authentication and IKE crypto profile for phase 1."
   ],
   [
    "IKE crypto profile",
    "Phase 1 settings: Diffie-Hellman group, encryption, authentication and key lifetime."
   ],
   [
    "IPsec crypto profile",
    "Phase 2 settings: ESP or AH, encryption, authentication, PFS DH group and lifetime."
   ],
   [
    "Proxy ID",
    "A local/remote subnet pair that defines a phase 2 SA, required when the peer uses a policy-based VPN."
   ],
   [
    "Tunnel monitoring",
    "Pings through the tunnel to a remote IP that detect a broken data path and trigger wait-recover or fail-over."
   ],
   [
    "Perfect forward secrecy (PFS)",
    "A fresh Diffie-Hellman exchange for phase 2 keys so one compromised key does not expose other sessions."
   ]
  ],
  "example": "You connect a PAN-OS firewall to a partner's policy-based VPN device protecting 172.16.5.0/24 and 172.16.6.0/24. Phase 1 establishes, but phase 2 fails and the System log shows a proposal mismatch. Adding two proxy IDs, one for each remote subnet paired with your local 10.1.0.0/16, plus routes to the tunnel interface and matching security rules, brings both SAs up and traffic flows.",
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
   ],
   [
    "The tunnel shows green but users cannot reach the remote network. What should you check first?",
    "The route for the remote subnets to the tunnel interface and the security rules between the internal and VPN zones."
   ]
  ]
 },
 {
  "t": "Quantum-resistant IKEv2 VPNs (post-quantum preshared keys) and GRE tunnels",
  "body": [
   "Today's VPNs use Diffie-Hellman key exchange, which a sufficiently large quantum computer could break. The worry is 'harvest now, decrypt later': an attacker records encrypted VPN traffic today and decrypts it years from now once the key exchange can be broken. For data that must stay confidential for a long time, that future risk is a present problem. Quantum-resistant VPN features in recent PAN-OS releases address this for IKEv2 (Internet Key Exchange version 2) site-to-site tunnels. This lesson also covers GRE, a simple tunnel with no cryptography at all, so you can tell the two apart.",
   "The approach this topic names is post-quantum preshared keys (PPKs), standardized in RFC 8784 for IKEv2. Both peers are configured with the same high-entropy secret key and a matching key ID, in addition to their normal authentication. The PPK is mixed into the derivation of the IPsec keys. Even if an attacker later breaks the Diffie-Hellman exchange, they still cannot derive the session keys without the PPK, which was never sent over the wire. PPKs work only with IKEv2, not IKEv1, and both peers must support the extension. You configure them in the IKE gateway's advanced IKEv2 options, with a negotiation setting that decides whether the tunnel requires the PPK or can fall back to a normal exchange for peers that do not support it. Requiring it is stronger but will fail against a non-supporting peer.",
   "Newer releases also add hybrid key exchange, where a post-quantum key encapsulation mechanism (KEM) is combined with classical Diffie-Hellman using IKEv2 extensions for multiple key exchanges. The principle to remember is 'hybrid': the result is at least as strong as the stronger of the two methods, so you do not lose classical security while gaining quantum resistance. Check the release notes for which algorithms your PAN-OS version supports rather than assuming. Practical guidance: use strong symmetric algorithms such as AES-256 (Advanced Encryption Standard) with SHA-256 or better, because symmetric cryptography with large keys is considered much less exposed to quantum attacks. Manage PPKs like any secret: generate them randomly, rotate them, and never reuse them across unrelated peers.",
   "Generic Routing Encapsulation (GRE) is a simple, unencrypted tunneling protocol, IP protocol 47, that wraps packets inside a new IP header. It is used to reach partners or cloud services that require GRE, and to carry traffic such as routing protocol exchanges or multicast to a peer. On PAN-OS you configure it under Network > GRE Tunnels: a tunnel interface (with zone and router), the local interface and address, the peer address, TTL (time to live), an optional Copy ToS (type of service) setting, and keepalives that mark the tunnel down if the peer stops responding. Then you route traffic to the tunnel interface as you would with IPsec.",
   "The distinction the exam tests is protection. A PPK strengthens the confidentiality of an IPsec tunnel against future quantum attacks; GRE provides no confidentiality or integrity at all. Do not use GRE over untrusted networks for sensitive data unless something else, such as IPsec, protects it. Security policy still applies to traffic entering and leaving the GRE tunnel interface's zone, and you need a rule permitting GRE between the tunnel endpoints on the outside zone.",
   "Consider a worked example. A bank's data center to disaster recovery tunnel carries replication data that must stay confidential for decades. Both sides run IKEv2 on PAN-OS versions that support PPKs, so the engineers generate a long random PPK, enter the same key and key ID on each IKE gateway, and set the negotiation to require it. They confirm the SA comes up with `show vpn ike-sa` and check the System log for PPK negotiation messages. Separately, a cloud provider's service requires GRE, so the team builds a GRE tunnel with keepalives and runs it only across a private interconnect, not the Internet.",
   "Common mistakes: trying to use a PPK on an IKEv1 gateway, entering different key IDs on each side, setting the PPK as mandatory when the peer does not support it and then wondering why the tunnel is down, treating GRE as a secure VPN, and forgetting the security rule for GRE itself. Another is assuming a PPK replaces normal authentication; it is added on top of the pre-shared key or certificate authentication.",
   "Exam questions tend to use these clues. 'Harvest now, decrypt later', 'quantum-resistant' or 'RFC 8784' point to post-quantum preshared keys with IKEv2. 'Combine classical and post-quantum key exchange' is hybrid key exchange. 'IP protocol 47', 'unencrypted encapsulation' or 'keepalive marks the tunnel down' point to GRE, and 'needs confidentiality over the Internet' means GRE alone is the wrong answer."
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
    "Hybrid key exchange",
    "Combining a classical and a post-quantum key exchange so the result is at least as strong as the stronger one."
   ],
   [
    "Key encapsulation mechanism (KEM)",
    "A public key method for establishing a shared secret, the form most post-quantum key exchange algorithms take."
   ],
   [
    "GRE",
    "Generic Routing Encapsulation, an unencrypted tunneling protocol (IP protocol 47) that encapsulates packets in a new IP header."
   ],
   [
    "GRE keepalive",
    "A periodic check that marks a GRE tunnel down when the peer stops responding so routing can react."
   ]
  ],
  "example": "A bank's data center-to-DR tunnel carries replication data that must stay confidential for decades. Both sides run IKEv2 on PAN-OS versions that support PPKs, so the engineers add the same randomly generated PPK and key ID on each IKE gateway and set the negotiation to require it. Recorded traffic is now protected even if Diffie-Hellman is broken later, while a separate GRE tunnel to a cloud service runs only over a private link.",
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
   ],
   [
    "What happens if you require a PPK but the peer does not support it?",
    "The tunnel fails to establish; allowing fallback keeps it up but without post-quantum protection."
   ]
  ]
 },
 {
  "t": "GlobalProtect: portal, gateways (internal/external), authentication, connect methods (user-logon, pre-logon, on-demand), split tunneling, HIP objects and profiles, IPsec vs SSL tunnels",
  "body": [
   "GlobalProtect extends firewall policy to users wherever they are. It has three parts: the portal, one or more gateways, and the GlobalProtect app on endpoints. The portal is the first contact point: the app authenticates to it and downloads its configuration, including the list of gateways, the connect method, split tunnel behavior and HIP (Host Information Profile) collection settings. The portal is configured under Network > GlobalProtect > Portals on a Layer 3 interface or loopback, with an SSL/TLS service profile that supplies its certificate.",
   "Gateways enforce policy. External gateways accept tunnels from remote users over the Internet; the app picks the best one by configured priority and response time. Internal gateways sit inside the network: users on the LAN connect to them, usually without a tunnel, so the firewall learns their User-ID and HIP information. The app decides whether it is inside or outside using internal host detection, a reverse DNS lookup of a known internal IP that only returns the expected hostname on the corporate network. Gateways are configured under Network > GlobalProtect > Gateways, where you also define the IP pool for tunnel clients and the tunnel interface in the VPN zone.",
   "Authentication uses authentication profiles tied to LDAP, RADIUS, SAML, Kerberos and others, client certificates validated by a certificate profile, or both together. You can configure authentication separately at the portal and at the gateway, and use authentication override cookies so users are not prompted twice. Connect methods set when the tunnel comes up. User-logon (Always On) connects automatically after the user signs in to the endpoint, giving continuous protection. Pre-logon connects before the user signs in, authenticating the machine with a certificate, so login scripts, password resets and domain authentication work for remote laptops; after user login it transitions to the user's tunnel. On-demand connects only when the user clicks Connect, suited to occasional access. Pre-logon then On-demand is also available.",
   "Split tunneling decides what goes through the tunnel. By default all traffic does (full tunnel). With split tunneling you include or exclude routes, domains or applications in the gateway's client settings, for example excluding a video conferencing service to save bandwidth. Full tunnel gives the most visibility and control; split tunnel reduces load but sends excluded traffic directly to the Internet without inspection. The tunnel itself prefers IPsec, which uses UDP and performs better, and falls back to SSL over TCP 443 if IPsec is blocked or disabled. SSL is more likely to pass restrictive hotel or guest networks but performs worse for real-time traffic.",
   "HIP checks let policy consider endpoint posture. The app sends HIP data such as OS version, patch level, disk encryption and anti-malware status. HIP objects (Objects > GlobalProtect > HIP Objects) define individual criteria, and HIP profiles combine objects with AND, OR and NOT logic. HIP profiles are then used as a match condition in security rules, for example allowing finance servers only from encrypted, patched laptops. HIP checks require a GlobalProtect subscription on the gateway firewalls, and results appear in the HIP Match log.",
   "Consider a worked example. Help desk calls rise because remote users cannot reset expired domain passwords at the Windows sign-in screen. You deploy machine certificates through the company's device management, add a certificate profile to the portal and gateway, and change the portal's agent configuration to pre-logon. Laptops now reach the domain controllers through the tunnel before sign-in, and password changes work from home. You also add a HIP profile requiring disk encryption to the rule that allows access to the finance servers.",
   "Common mistakes: confusing portal and gateway roles, putting HIP objects directly in security rules (rules reference HIP profiles), forgetting the machine certificate for pre-logon, using split tunneling for traffic you are required to inspect, and forgetting a security rule from the VPN zone to internal resources. Another is a portal certificate that clients do not trust, which causes connection failures before authentication even starts.",
   "Exam questions use these clues. 'Delivers configuration and gateway list' is the portal; 'enforces policy and terminates the tunnel' is the gateway. 'Before the user signs in' is pre-logon; 'only when the user clicks' is on-demand. 'Is the device inside the network?' is internal host detection. 'Require disk encryption' points to a HIP profile in a security rule, and 'IPsec blocked on hotel Wi-Fi' points to the SSL fallback."
  ],
  "terms": [
   [
    "Portal",
    "The GlobalProtect component that authenticates the app and delivers its configuration and gateway list."
   ],
   [
    "External gateway",
    "A gateway that terminates tunnels from remote users over the Internet and enforces policy on their traffic."
   ],
   [
    "Internal gateway",
    "A gateway inside the network used for User-ID and HIP enforcement, often without a tunnel."
   ],
   [
    "Internal host detection",
    "A reverse DNS check of a known internal IP that tells the app whether it is on the corporate network."
   ],
   [
    "Pre-logon",
    "A connect method that establishes the tunnel with a machine certificate before the user signs in."
   ],
   [
    "Split tunneling",
    "Sending only chosen routes, domains or applications through the tunnel while other traffic goes directly to the Internet."
   ],
   [
    "HIP profile",
    "A combination of HIP objects evaluated as a match condition in security policy."
   ]
  ],
  "example": "Help desk calls rise because remote users cannot reset expired domain passwords at the Windows login screen. You deploy machine certificates and switch the portal's agent configuration to pre-logon. Laptops now reach the domain controllers through the tunnel before sign-in, and password changes work from home. A HIP profile requiring disk encryption is then added to the rule allowing access to the finance servers.",
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
   ],
   [
    "Which connect method lets remote users run login scripts and reset passwords at the sign-in screen?",
    "Pre-logon, which connects with a machine certificate before the user signs in."
   ]
  ]
 },
 {
  "t": "Administrator accounts: dynamic roles vs admin role profiles, API and CLI permissions",
  "body": [
   "Every person or system that manages the firewall should have its own administrator account with the least privilege needed. Shared accounts make it impossible to tell who changed what, and over-privileged accounts turn one stolen password into a full compromise. Accounts are created under Device > Administrators, and each account has an authentication method and an administrative role. The role decides what the account can see and change in the web interface, the command-line interface (CLI) and the APIs.",
   "Dynamic roles are built in and cover common needs. Superuser has full access, including creating other administrators and virtual systems. Superuser (read-only) can see everything but change nothing. Device Administrator has full access to the firewall except defining new administrator accounts and virtual systems. Device Administrator (read-only) is its view-only form. On multi-vsys firewalls, Virtual System Administrator and its read-only version restrict the admin to chosen vsys. They are called dynamic because Palo Alto updates them automatically when new features arrive in a PAN-OS release, so an admin with a dynamic role gets access to new menus without you editing anything.",
   "Admin role profiles are custom roles you create under Device > Admin Roles. Each is either device-scoped or vsys-scoped. For each area of the web interface you set Enable, Read Only or Disable, for example granting full access to Monitor and Policies but no access to Device. The profile also has separate tabs for the XML API, the REST API and the Command Line. The trade-off is maintenance: when an upgrade adds new features, custom profiles are not updated, so you must review and adjust them after upgrades.",
   "CLI permission in a role profile is a single choice: none, superuser, superreader, deviceadmin or devicereader, with vsys equivalents on multi-vsys systems. Setting it to none blocks SSH and console management for that role even if the web interface is allowed. XML API permissions are set per request type, such as Report, Log, Configuration, Operational Requests, Commit, User-ID Agent, Export and Import. REST API permissions are set per resource. This granularity is how you build API-only accounts: disable all web UI and CLI access and enable only the API types a script needs. The distinction the exam tests: dynamic roles are simple and self-updating but coarse; admin role profiles are granular but need upkeep.",
   "Authentication for admins can be local, with the password stored on the firewall, password complexity rules and password profiles for expiry, or external through an authentication profile such as RADIUS, TACACS+, LDAP or SAML. With RADIUS, TACACS+ and SAML you can assign the role and access domain from the server using vendor-specific attributes, so individual accounts need not exist locally. Track what admins do in the Config log, which records who changed what and when, and in the System log for logins and failures. Set lockout values in the authentication profile, or in Device > Setup > Management for local accounts, so repeated failures lock the account.",
   "Consider a worked example. A monitoring script only needs to pull threat logs every five minutes. You create an admin role profile named `api-log-reader` with every web UI area disabled, Command Line set to none, REST API disabled, and only the XML API Log type enabled. You create an administrator `svc-siem` using that profile, generate an API key with it, and store the key in the team's secrets manager. A help desk group, meanwhile, gets a role profile with read-only Monitor access so they can check whether traffic was blocked without touching policy. If the script's key leaks, it cannot change configuration.",
   "Common mistakes: giving scripts and service accounts Superuser, sharing one admin account among a team, forgetting to update custom role profiles after an upgrade so admins cannot see new features, and assuming disabling the web UI also disables the CLI (they are separate settings). Another is expecting a Device Administrator to create new admin accounts, which only a Superuser can do.",
   "Exam questions often hinge on these words. 'Automatically gains access to new features after an upgrade' points to a dynamic role. 'Granular', 'read-only access to one tab', 'API-only' or 'disable CLI' point to an admin role profile. 'Restrict an admin to one tenant' points to a vsys administrator role. 'Who changed this rule?' points to the Config log, and 'assign roles from the RADIUS server' points to vendor-specific attributes."
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
    "Device Administrator",
    "A dynamic role with full firewall access except creating administrator accounts and virtual systems."
   ],
   [
    "superreader",
    "A CLI role level that allows read-only access to the full CLI."
   ],
   [
    "Vsys administrator",
    "A role restricted to managing specific virtual systems on a multi-vsys firewall."
   ],
   [
    "Vendor-specific attribute (VSA)",
    "A value returned by RADIUS, TACACS+ or SAML that assigns an admin role or access domain without a local account."
   ],
   [
    "Config log",
    "The log that records configuration changes, including which administrator made them."
   ]
  ],
  "example": "A monitoring script only needs to pull threat logs. You create an admin role profile with all web UI areas disabled, CLI set to none, and only the XML API Log type enabled, then create an account using that profile and generate an API key for it. The key is stored in a secrets manager, and if it ever leaks, it cannot change configuration or open an SSH session.",
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
   ],
   [
    "How can a RADIUS server decide which role an admin receives?",
    "By returning vendor-specific attributes that name the admin role and access domain."
   ]
  ]
 },
 {
  "t": "Server profiles (LDAP, RADIUS, TACACS+, SAML, Kerberos), authentication profiles and sequences, MFA",
  "body": [
   "PAN-OS separates 'where is the identity server' from 'how do we authenticate'. A server profile tells the firewall how to reach an external service. An authentication profile says which server profile, or the local database, to use for a given login and adds rules such as multi-factor authentication (MFA) and allow lists. Features such as administrator login, GlobalProtect, Authentication Portal and the web proxy then reference the authentication profile. Keeping these layers straight makes configuration reusable and makes exam questions much easier.",
   "Server profiles live under Device > Server Profiles. LDAP (Lightweight Directory Access Protocol) profiles list servers, the type (active-directory, e-directory, sun or other), base DN (distinguished name), bind DN and password, and whether to require SSL/TLS (LDAPS). They are used both for authentication and for User-ID group mapping. RADIUS (Remote Authentication Dial-In User Service) profiles hold servers, a shared secret, timeout and retries, and an authentication protocol such as PEAP-MSCHAPv2 or PAP. RADIUS supports challenge-response, which many MFA products use, and can return vendor-specific attributes for admin roles. TACACS+ (Terminal Access Controller Access-Control System Plus) profiles are similar but encrypt the whole payload and run over TCP, and are popular for device administration.",
   "SAML (Security Assertion Markup Language) profiles are built by importing the identity provider's (IdP) metadata, including its signing certificate and single sign-on URL, enabling SSO through providers such as Microsoft Entra ID or Okta. Kerberos profiles point to a Key Distribution Center (KDC) for Kerberos authentication; Kerberos single sign-on for browsers also needs a keytab imported into the authentication profile. An authentication profile (Device > Authentication Profile) sets the type (Local Database, LDAP, RADIUS, TACACS+, SAML, Kerberos or Cloud Authentication Service), the server profile, a user domain and username modifier such as `%USERDOMAIN%\\%USERINPUT%`, an allow list of users or groups, and lockout settings (failed attempts and lockout time). Its Factors tab enables MFA by adding MFA server profiles for supported vendors, which prompt for extra factors after the first succeeds.",
   "An authentication sequence (Device > Authentication Sequence) is an ordered list of authentication profiles. The firewall tries each in turn until one succeeds. A common use is trying RADIUS or LDAP for employees, then the local database as a break-glass fallback if the directory is unreachable, or trying two different domains. You reference a sequence wherever an authentication profile is accepted. MFA can happen in several places: an IdP handling MFA through SAML, a RADIUS server that performs MFA itself, the firewall driving MFA through MFA server profiles on the Factors tab, or Authentication policy requiring MFA before users reach sensitive resources, even for non-web applications.",
   "The distinction the exam likes is protocol choice. TACACS+ encrypts the whole body and uses TCP, and it separates authorization from authentication, which suits device administration. RADIUS uses UDP, encrypts only the password, and is common for network access and MFA push or token flows. SAML is browser-based federation where the IdP authenticates the user. LDAP is a directory protocol that also provides groups. Kerberos provides ticket-based single sign-on for domain-joined machines.",
   "Consider a worked example. Remote admins log in with RADIUS backed by an MFA service, but if the RADIUS servers are unreachable nobody can manage the firewall. You create an authentication sequence that tries the RADIUS profile first and a Local Database profile second, and keep one strong local emergency account whose password is stored in a vault. You test with `test authentication authentication-profile Admin-RADIUS username jlee password` and review results in the System and Authentication logs.",
   "Common mistakes: building the server profile but never referencing it from an authentication profile, forgetting the allow list so every directory user can log in (or leaving it empty so nobody can), using LDAP without TLS so bind credentials cross the network in cleartext, and mismatched username formats between what users type and what the server expects. Another is an expired IdP signing certificate in a SAML profile, which breaks every login at once.",
   "Exam questions tend to use these clues. 'Where is the server and how do I reach it?' is a server profile. 'Which method, which users, how many failed attempts?' is an authentication profile. 'Try one, then another' is an authentication sequence. 'Import IdP metadata' is SAML. 'Encrypts the entire payload over TCP' is TACACS+, and 'used for both authentication and group mapping' is LDAP."
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
   ],
   [
    "SAML IdP metadata",
    "The identity provider's details, including signing certificate and SSO URL, imported to build a SAML server profile."
   ],
   [
    "Allow list",
    "The users or groups in an authentication profile that are permitted to authenticate with it."
   ],
   [
    "Multi-factor authentication (MFA)",
    "Requiring more than one type of proof, such as a password plus a push approval or token code."
   ]
  ],
  "example": "Remote admins log in with RADIUS backed by an MFA service, but if the RADIUS servers are unreachable nobody can manage the firewall. You create an authentication sequence that tries the RADIUS profile first and the local database second, and keep one strong local emergency account stored securely in a vault. The test authentication command confirms both paths work before you rely on them.",
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
   ],
   [
    "How do you build a SAML server profile quickly and correctly?",
    "Import the identity provider's metadata, which supplies its SSO URL and signing certificate."
   ]
  ]
 },
 {
  "t": "Authentication policy and Authentication Portal",
  "body": [
   "User-ID usually learns who is behind an IP address silently, from domain controllers, GlobalProtect or syslog. Sometimes that is not enough: a contractor's laptop is not on the domain, a guest network has no directory at all, or a sensitive server should demand fresh proof of identity, possibly with multi-factor authentication (MFA). Authentication policy and the Authentication Portal, formerly called Captive Portal, cover these cases by asking the user to prove who they are.",
   "Authentication policy (Policies > Authentication) is a rulebase evaluated for traffic before security policy relies on the user. Each rule matches source zone, source address, source user (often `unknown` for unmapped users, or `known-user` for step-up MFA), destination zone and address, service and URL category. Its action is an authentication enforcement object, which picks the method and authentication profile, plus a timeout that decides how long the user stays authenticated before being challenged again. Rules are evaluated top-down like other rulebases, and traffic that matches no authentication rule is not challenged at all, so rule order and scope decide exactly who sees a login prompt.",
   "The enforcement methods are browser-challenge, web-form and no-captive-portal. Browser-challenge uses Kerberos single sign-on through SPNEGO (Simple and Protected GSS-API Negotiation), so domain-joined browsers authenticate transparently without a prompt. Web-form shows a login page; if browser-challenge fails, the firewall falls back to the web form. No-captive-portal lets matching traffic through without authenticating, useful as an exception rule above broader rules. Predefined objects include `default-browser-challenge`, `default-web-form` and `default-no-captive-portal`, and you can create your own under Objects > Authentication to attach an authentication profile with MFA factors.",
   "The Authentication Portal itself is set up under Device > User Identification > Authentication Portal Settings. Its two modes matter. Transparent mode has the firewall impersonate the original destination website and answer with an authentication challenge; it works on any interface type, including virtual wire and Layer 2, but causes certificate warnings unless decryption with a trusted certificate is in place. Redirect mode sends the browser to a firewall Layer 3 interface (the redirect host) with an HTTP 302, which allows session cookies so users are not re-prompted, and is required for Kerberos SSO and multi-site designs. Redirect mode needs an interface management profile with Response Pages enabled on the redirect interface, and a DNS name for the redirect host that resolves to it.",
   "Only web traffic can trigger the portal, because the firewall needs a browser to show the page. For HTTPS sites the firewall must decrypt the session to inject the challenge, so pair authentication rules with a decryption policy. For non-web applications such as SSH to a server, the user first authenticates in a browser, which creates an IP-to-user mapping and timestamp; the authentication rule then permits the non-web traffic until the timeout expires. This is how you add MFA in front of legacy protocols. Remember the division of labor: authentication policy identifies users, while security policy still decides allow or deny.",
   "Consider a worked example. Guest Wi-Fi users are not on the domain, so their IPs map to `unknown`. You create an authentication rule for source zone Guest, source user `unknown`, service `service-http` and `service-https`, using a web-form enforcement object tied to a local guest database, with a timeout of a few hours. You enable redirect mode on a loopback in the Guest zone with Response Pages allowed, and a decryption rule so HTTPS requests can be challenged. After logging in, a guest's IP maps to their account, and security rules allow them only web browsing. Results appear in the Authentication log.",
   "Common mistakes: expecting SSH or RDP to pop up a login page, forgetting decryption so HTTPS sites never show the portal, using redirect mode on a virtual wire deployment, leaving Response Pages off the redirect interface, and assuming authentication grants access by itself. Another is a timeout that is too short, which annoys users with repeated prompts, or too long, which weakens step-up MFA.",
   "Exam questions use these clues. 'Transparent SSO for domain browsers' is browser-challenge with Kerberos. 'Login page' is web-form. 'Exempt this traffic' is no-captive-portal. 'Virtual wire or Layer 2' points to transparent mode; 'session cookies', 'Kerberos' or 'Layer 3 redirect host' point to redirect mode. 'MFA before reaching an SSH server' points to an authentication rule with an MFA-enabled profile and a browser login first."
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
    "Browser-challenge",
    "An enforcement method using Kerberos SPNEGO so domain browsers authenticate without a prompt."
   ],
   [
    "Redirect mode",
    "Authentication Portal mode that redirects users to a firewall Layer 3 interface, supporting session cookies and Kerberos SSO."
   ],
   [
    "Transparent mode",
    "Authentication Portal mode where the firewall impersonates the destination site to present the challenge."
   ],
   [
    "Authentication timeout",
    "How long a user stays authenticated for an authentication rule before being challenged again."
   ]
  ],
  "example": "Guest Wi-Fi users are not on the domain, so their IPs map to unknown. An authentication rule for source user unknown from the Guest zone uses a web-form enforcement object tied to a local guest database, with redirect mode on a Layer 3 interface that allows Response Pages. After logging in, a guest's IP maps to their account, and security rules allow them only web browsing.",
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
   ],
   [
    "Why do HTTPS sites need decryption for Authentication Portal to work?",
    "The firewall must decrypt the session to inject the authentication challenge into the browser's traffic."
   ]
  ]
 },
 {
  "t": "Virtual systems: vsys creation, interfaces/zones/routers per vsys, shared gateway, inter-vsys traffic via external zones",
  "body": [
   "Virtual systems (vsys) split one physical firewall into several logical firewalls, each with its own interfaces, zones, policies, objects and administrators. Service providers use them for tenants, and enterprises use them to separate business units that need independent policy and separate administration on shared hardware. Every firewall runs vsys1 even when you never see it, so everything you configure on a single-vsys firewall already lives in vsys1.",
   "To create more, you first enable Multi Virtual System Capability under Device > Setup > Management > General Settings; enabling it requires a commit. How many vsys you can run depends on the platform, many platforms need a virtual systems license for additional vsys beyond the base number, and smaller models may not support multi-vsys at all. After that, Device > Virtual Systems lets you add vsys2, vsys3 and so on, set resource limits such as sessions, rules and VPN tunnels, and choose which interfaces, VLANs, virtual wires and routers the vsys can use.",
   "Each interface belongs to exactly one vsys, and each zone belongs to one vsys. Virtual routers are more flexible: a vsys can have its own router for full routing separation, or several vsys can share one. Objects and policies can be defined per vsys or in the Shared location to be reused by all. Administrators can be restricted to a vsys using the virtual system administrator roles, so a tenant's admin never sees another tenant's policy. In the web interface a vsys selector appears at the top of the Policies, Objects and Network tabs, and in the CLI `set system setting target-vsys vsys2` scopes your commands.",
   "A shared gateway is a special virtual system that several vsys use to reach a common network, usually the Internet, through the same interfaces. Instead of giving every tenant its own public interface, the shared gateway owns the outside interface. Shared gateways have zones, NAT and PBF, but no security policy of their own; security is enforced in each tenant vsys. Traffic between a vsys and a shared gateway does not need an external zone: the shared gateway's interfaces appear to the vsys as a destination zone.",
   "Traffic between two vsys uses external zones. In vsys1 you create an external zone that points to vsys2, and in vsys2 an external zone that points to vsys1; both vsys must list each other as visible virtual systems. A session from vsys1's Trust zone to vsys2's DMZ is evaluated twice: vsys1 needs a rule from Trust to its external zone, and vsys2 needs a rule from its external zone to DMZ. Routing must also send the traffic to the other vsys, either through a shared router or a route whose next hop is the other vsys's router. Because each vsys inspects the session, logs appear in both. Think of vsys as separate firewalls wired together by an internal cable: each side needs its own zones, routes and rules.",
   "Consider a worked example. A college runs vsys1 for administration and vsys2 for student housing. Both reach the Internet through a shared gateway that owns ethernet1/1 and performs source NAT. When the registrar's application in vsys1 must reach a portal in vsys2, admins create external zones in both vsys, add a route in vsys1's router pointing the housing subnet at vsys2's router, and write matching rules on both sides. The session appears in both vsys Traffic logs, and each tenant's admin can see only their own side.",
   "Common mistakes: writing a rule on only one side of an inter-vsys flow, forgetting the route between vsys, trying to put one interface in two vsys, expecting security rules inside the shared gateway, and troubleshooting in the wrong vsys context. Another is assuming the platform supports many vsys without checking its capacity and licensing, or forgetting that resource limits set on one vsys can cap its sessions or rules long before the hardware is busy.",
   "Exam questions use these clues. 'Separate firewalls for tenants on one appliance' is multiple vsys. 'Tenants share one Internet interface' is a shared gateway. 'Traffic between two vsys' is external zones with rules in each vsys. 'Where is security enforced for shared gateway traffic?' is the tenant vsys. 'Must enable before creating vsys2' is Multi Virtual System Capability, and 'restrict an admin to one tenant' is a vsys administrator role."
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
   ],
   [
    "Shared location",
    "The configuration scope whose objects and policies are available to every vsys."
   ],
   [
    "Target vsys",
    "The CLI setting that scopes commands to a particular virtual system."
   ]
  ],
  "example": "A college runs vsys1 for administration and vsys2 for student housing. Both reach the Internet through a shared gateway that owns ethernet1/1 and performs source NAT. When the registrar's app in vsys1 must reach a portal in vsys2, admins create external zones in both vsys, a route between their routers, and matching rules on both sides, and the session appears in both vsys logs.",
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
   ],
   [
    "Can two virtual systems share one virtual router?",
    "Yes; interfaces and zones belong to one vsys, but routers can be shared or kept separate."
   ]
  ]
 },
 {
  "t": "Logging: log types, log forwarding profiles, syslog/SNMP/email/HTTP server profiles, Device > Log Settings, Strata Logging Service",
  "body": [
   "Logs are how you prove what the firewall did and how you feed a security operations center (SOC). PAN-OS writes many log types, visible under Monitor > Logs. The ones you will use most are Traffic (a record of each session, by default written at session end), Threat (vulnerability, spyware, virus, flood and scan detections), URL Filtering, WildFire Submissions, Data Filtering, HIP Match, GlobalProtect, User-ID, IP-Tag, Decryption, Tunnel Inspection, Authentication, Configuration, System and Alarms. The Unified log view combines several types for one search, and filters such as `( addr.src in 10.1.1.5 ) and ( action eq deny )` narrow results quickly.",
   "Traffic logging is controlled per security rule. On a rule's Actions tab, Log at Session End is on by default and Log at Session Start is off; enable start logging only when troubleshooting, because it adds volume. Denied traffic is logged only if the deny rule has logging enabled, which is why people override interzone-default. Threat, URL and other content logs are generated by the security profiles attached to the rule, so a rule without profiles produces no threat logs even if an attack passes through it.",
   "To send logs elsewhere, you first define server profiles under Device > Server Profiles. A syslog profile lists servers, transport (UDP, TCP or SSL), port, format (BSD or IETF) and facility, and lets you customize the message format per log type, which matters for SIEM (security information and event management) parsing. An SNMP (Simple Network Management Protocol) trap profile sends traps to network monitoring systems. An email profile sends messages through an SMTP gateway. An HTTP profile sends logs to web services, with a custom URI, headers and payload per log type, which is how you integrate with ticketing and chat tools.",
   "A log forwarding profile (Objects > Log Forwarding) decides where policy-driven logs go. Each match list entry picks a log type (traffic, threat, URL, WildFire, data, tunnel, authentication or decryption), an optional filter such as `(severity geq high)`, and destinations: Panorama or cloud logging, syslog, SNMP, email or HTTP. Entries can also run built-in actions such as tagging. You attach the profile to security rules on the Actions tab. A profile named `default` is automatically applied to new rules. Logs that are not produced by policy (System, Configuration, User-ID, HIP Match, GlobalProtect, IP-Tag and similar) are forwarded from Device > Log Settings instead, with the same kind of filters and destinations.",
   "Strata Logging Service, formerly Cortex Data Lake, is Palo Alto's cloud log storage. Firewalls forward logs to it directly or through Panorama, which gives centralized retention and lets cloud applications such as Strata Cloud Manager and Cortex products analyze the data. It requires a license and the firewall's device certificate. Panorama with Log Collectors is the on-premises alternative. On the firewall, `show logging-status` shows whether logs are reaching Panorama or the cloud service. If forwarding fails, the firewall buffers logs locally for a time, so check connectivity and certificates before the local buffer is overwritten.",
   "Consider a worked example. The SOC wants every critical and high threat in its SIEM within seconds, plus all configuration changes. You create a syslog server profile over TCP (or SSL for confidentiality) with IETF format, then a log forwarding profile with a threat entry filtered on `(severity geq high)` and a traffic entry for denied sessions, and attach it to the Internet-facing rules. In Device > Log Settings you forward Configuration and System logs to the same syslog profile. The SIEM team confirms events arrive and parse correctly.",
   "Common mistakes: expecting denied traffic in the Traffic log without logging on the deny rule, trying to forward System logs with a log forwarding profile, sending logs over UDP where loss is unacceptable, forgetting to attach the log forwarding profile to the rules that matter, and turning on Log at Session Start everywhere and flooding storage. Another is forgetting that no security profile means no threat logs.",
   "Exam questions use these clues. 'Forward threat or traffic logs from specific rules' is a log forwarding profile attached to those rules. 'Forward configuration or system logs' is Device > Log Settings. 'Send to a ticketing webhook' is an HTTP server profile. 'Cloud log storage for Strata Cloud Manager' is Strata Logging Service, and 'automatically applied to new rules' is a log forwarding profile named default."
  ],
  "terms": [
   [
    "Traffic log",
    "A per-session record written by default at session end for sessions matching rules with logging enabled."
   ],
   [
    "Log forwarding profile",
    "An object attached to security rules that sends matching policy logs to Panorama, cloud logging, syslog, SNMP, email or HTTP."
   ],
   [
    "Device > Log Settings",
    "Where System, Configuration, User-ID, HIP Match and other non-policy logs are forwarded."
   ],
   [
    "Syslog server profile",
    "Settings for syslog destinations, including transport, port, format, facility and custom message formats."
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
  "example": "The SOC wants every critical threat in its SIEM within seconds and all config changes too. You create a syslog server profile over TCP, a log forwarding profile with a threat entry filtered on severity critical, attach it to the Internet rules, and in Device > Log Settings forward Configuration logs to the same syslog profile. The SIEM team then verifies that both log types arrive and parse.",
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
   ],
   [
    "Why might an allowed session with an exploit attempt produce no Threat log?",
    "The matching rule has no vulnerability protection or other security profile attached, so no threat inspection occurred."
   ]
  ]
 },
 {
  "t": "Software and content updates: PAN-OS upgrade paths and base images, HA upgrade order, dynamic update schedules and thresholds",
  "body": [
   "A firewall runs two kinds of code that update on different schedules. PAN-OS software is the operating system, released as feature releases (such as 10.2, 11.0 or 11.1) with maintenance releases within each (like a later 11.1.x build) that fix bugs and security issues. Content updates are signatures and data: Applications and Threats (App-IDs plus vulnerability and spyware signatures), Antivirus, WildFire, GlobalProtect data files and others. Content updates arrive frequently and install without a reboot. Keeping both current is a core security task, and doing it carelessly is a common cause of outages.",
   "PAN-OS upgrade paths have rules. To install a maintenance release of a new feature release, you must first download that feature release's base image (the .0 release), even if you never install it; the firewall needs it present to install, say, a later 11.1 maintenance release. Traditionally you also upgrade through each feature release in sequence rather than jumping over one. Newer releases support skipping some versions in certain cases, so always read the upgrade path in the release notes rather than assuming. Each PAN-OS release also requires a minimum content version, so install current Applications and Threats content before upgrading software.",
   "A safe single-firewall upgrade follows a routine. Read the release notes and known issues. Save and export a named configuration snapshot and the device state (Device > Setup > Operations). Update content. Under Device > Software, click Check Now, then download the base image and the target image. Install the target image, reboot, and verify with `show system info`, the dashboard, and a quick check that sessions, VPNs and User-ID are healthy. From the CLI the same steps are `request system software check`, `request system software download version <ver>` and `request system software install version <ver>`. If you manage the firewall with Panorama, upgrade Panorama first; Panorama must run the same or a later release than the firewalls it manages.",
   "HA (high availability) pairs are upgraded one peer at a time to keep traffic flowing. A typical active/passive order: disable preemption if it is enabled, upgrade the passive peer and reboot it, confirm it is healthy and synchronized, suspend the active peer with `request high-availability state suspend` so the upgraded peer takes over, upgrade the former active peer, then return it to functional and restore preemption. Peers briefly run different versions during this window, which HA tolerates for the upgrade, but you should not leave them mismatched.",
   "Dynamic updates are scheduled under Device > Dynamic Updates. Each type has a recurrence (for example very frequent for WildFire, hourly or daily for others) and an action: download only, or download and install. The threshold setting delays installing a new content release until it has been available for a set number of hours, giving Palo Alto time to pull a problematic release before your firewall installs it. For mission-critical networks a threshold is a common best practice, balanced against the need for fast protection. Applications and Threats updates also let you review new App-IDs and choose to disable new App-IDs on install, so you can check how they affect policy before they change which rules match.",
   "Consider a worked example. You must move an HA pair from 10.2 to a later 11.1 maintenance release. You first upgrade Panorama, then install the latest content on both firewalls. The release notes show the supported path, so you download each required base image. You export a snapshot and device state from each peer, disable preemption, upgrade and reboot the passive peer, check `show high-availability state` shows it synchronized, suspend the active peer, upgrade it, return it to functional and re-enable preemption. Sessions stay up throughout.",
   "Common mistakes: forgetting the base image and getting an install error, upgrading firewalls before Panorama, upgrading software before content, upgrading both HA peers at once, and scheduling content to install instantly on critical firewalls with no threshold. Another is skipping the configuration and device state export, leaving no clean rollback if the upgrade goes wrong.",
   "Exam questions use these clues. 'Why download a version you will not run?' is the base image requirement. 'Which to upgrade first?' is Panorama before firewalls, content before software, and the passive peer before the active one. 'Delay content installation to reduce risk' is the threshold. 'New App-IDs might change which rules match' points to reviewing or disabling new App-IDs, and 'download but let an admin decide' is the download-only action."
  ],
  "terms": [
   [
    "Feature release",
    "A PAN-OS version that introduces new capabilities, such as 11.1, identified by its first two numbers."
   ],
   [
    "Base image",
    "The .0 image of a feature release, which must be downloaded before installing a maintenance release of that feature release."
   ],
   [
    "Maintenance release",
    "A bug-fix release within a PAN-OS feature release, such as a later 11.1.x build."
   ],
   [
    "Applications and Threats",
    "The content package containing App-ID definitions and vulnerability and spyware signatures."
   ],
   [
    "Threshold",
    "A dynamic update setting that waits a set number of hours after release before installing new content."
   ],
   [
    "Device state",
    "An export of the firewall's configuration and related files used to restore or replace a device."
   ]
  ],
  "example": "You must move an HA pair from 10.2 to a later 11.1 maintenance release. You first upgrade Panorama, install the latest content on both firewalls, then check the release notes for the supported path. You download each required base image, upgrade the passive peer, fail over by suspending the active peer, upgrade the other peer, and confirm sessions stayed synchronized throughout.",
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
   ],
   [
    "Why install current content before a PAN-OS upgrade?",
    "Each PAN-OS release requires a minimum content version, and the install can fail without it."
   ]
  ]
 },
 {
  "t": "Certificate management: CAs, forward trust/untrust, SSL inbound inspection, SSL/TLS service profiles, certificate profiles, OCSP/CRL",
  "body": [
   "Certificates underpin decryption, GlobalProtect, the management interface and many authentication features. You manage them under Device > Certificate Management > Certificates, where you can generate, import and export certificates and keys, or create certificate signing requests (CSRs) for an enterprise certificate authority (CA) to sign. A CA is the entity that signs certificates and vouches for their identity; whether an endpoint trusts a certificate depends on whether it trusts the CA that signed it.",
   "For SSL Forward Proxy, which decrypts users' outbound HTTPS, the firewall acts as a CA. When a user visits a site, the firewall checks the real server certificate, then creates an impersonated copy signed by one of two CA certificates. The Forward Trust certificate signs the copy when the real server certificate is valid and trusted. The Forward Untrust certificate signs it when the server certificate is invalid (expired, self-signed or from an untrusted issuer), so the user still gets a browser warning instead of silently trusting a bad site. Forward Trust should be a subordinate CA issued by your enterprise PKI (public key infrastructure), or a self-signed CA, that endpoints trust through group policy or device management. Forward Untrust should deliberately be a self-signed CA that endpoints do not trust.",
   "SSL Inbound Inspection protects your own servers. There is no impersonation: you import the server's actual certificate and private key onto the firewall, and it decrypts inbound sessions to inspect them for threats. The decryption rule references that certificate. Because the firewall uses the real key, clients see no difference. Guard these keys carefully, since anyone who obtains them can impersonate your server, and remember to import the renewed certificate and key whenever the server's certificate is replaced.",
   "An SSL/TLS service profile (Device > Certificate Management > SSL/TLS Service Profile) defines the certificate and allowed protocol versions, minimum and maximum TLS (Transport Layer Security) version, for services the firewall itself hosts: the management web interface, GlobalProtect portal and gateways, Authentication Portal and others. Raising the minimum version is a simple hardening step. A certificate profile (Device > Certificate Management > Certificate Profile) is used when the firewall needs to validate someone else's certificate, such as GlobalProtect client certificates, administrator certificate logins or IPsec peers. It lists the trusted CA certificates, which certificate field supplies the username, and revocation checking options.",
   "Revocation can be checked with a Certificate Revocation List (CRL), a periodically downloaded list of revoked serial numbers, or Online Certificate Status Protocol (OCSP), a real-time query to a responder. When both are enabled, PAN-OS tries OCSP first and falls back to CRL. You can choose to block sessions if the status is unknown or the check times out, trading availability for strictness. Also mark certificates for their role: Trusted Root CA for certificates you want in the firewall's trust store, and Forward Trust or Forward Untrust for decryption. Watch expiry dates; an expired Forward Trust CA breaks browsing for every decrypted user.",
   "Consider a worked example. After enabling decryption, users visiting a site with an expired certificate see no warning, which alarms the security team. The cause: the same trusted CA was selected as both Forward Trust and Forward Untrust. You generate a separate self-signed CA named `fwd-untrust`, mark it as Forward Untrust only, and leave the enterprise-issued subordinate CA as Forward Trust. Warnings return for bad sites while good sites load normally. You then add a certificate profile with OCSP and CRL checks to the GlobalProtect portal so revoked client certificates are rejected.",
   "Common mistakes: using the same CA for Forward Trust and Forward Untrust, forgetting to deploy the Forward Trust CA to endpoints so every decrypted site shows an error, confusing an SSL/TLS service profile with a certificate profile, and letting the Forward Trust or portal certificate expire. Another is setting block-on-unknown-status without a reachable OCSP responder or CRL distribution point, which blocks legitimate users.",
   "Exam questions use these clues. 'Users see warnings for every site after decryption' points to the Forward Trust CA not being trusted by endpoints. 'No warning for sites with bad certificates' points to Forward Untrust misconfigured. 'Decrypt traffic to our own web server' is SSL Inbound Inspection with the server's key. 'Minimum TLS version for the portal' is an SSL/TLS service profile, 'validate client certificates' is a certificate profile, and 'real-time revocation check' is OCSP."
  ],
  "terms": [
   [
    "Certificate authority (CA)",
    "An entity that signs certificates; endpoints trust certificates signed by CAs in their trust store."
   ],
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
    "SSL/TLS service profile",
    "Settings for the certificate and TLS versions used by services the firewall hosts, such as the web interface and portal."
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
  "example": "After enabling decryption, users visiting a site with an expired certificate see no warning, which alarms the security team. The cause: the same trusted CA was selected as both Forward Trust and Forward Untrust. You generate a separate self-signed Forward Untrust CA that endpoints do not trust, and warnings return for bad sites while trusted sites load without errors.",
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
   ],
   [
    "Why must endpoints trust the Forward Trust CA?",
    "Because the firewall signs impersonated server certificates with it; if endpoints do not trust it, every decrypted site shows a certificate error."
   ]
  ]
 },
 {
  "t": "Decryption exclusions for pinned and sensitive apps",
  "body": [
   "Decryption gives the firewall visibility into encrypted traffic, but not everything can or should be decrypted. Some applications break when a middlebox decrypts them, and some traffic should stay private for legal or ethical reasons. Planning exclusions is part of every decryption rollout, and doing it well is what lets you decrypt most traffic without a flood of help desk calls. Palo Alto's guidance is to decrypt as much as you can and exclude only what you must, documenting a reason for every exception so auditors and future administrators understand why it exists.",
   "Technical exclusions come first. Certificate pinning means an app only accepts a specific certificate, public key or CA for its server, not whatever the operating system trusts. When the firewall substitutes its impersonated certificate, the app refuses to connect, even though a browser would accept it. Many mobile apps, software updaters and some desktop clients pin. Other breakers include mutual TLS (client certificate authentication), where the firewall cannot present the client's certificate to the server, and servers using protocols or ciphers the firewall does not support for decryption.",
   "Palo Alto maintains a predefined list of known problem sites under Device > Certificate Management > SSL Decryption Exclusion. It is updated through content updates, and each entry shows why it is there. You can add your own entries by hostname, with wildcards allowed, for internal apps that pin or require client certificates. These exclusions apply regardless of decryption policy. Separately, when a session fails decryption for reasons such as client authentication, the firewall can add the server to a local exclusion cache so later sessions pass without decryption. The Decryption log (Monitor > Logs > Decryption) shows failures and their reasons, which is how you find apps that need exclusions.",
   "Policy-based exclusions cover sensitive traffic. In decryption policy (Policies > Decryption) you create rules with the action No Decrypt, typically matching URL categories such as `financial-services`, `health-and-medicine` and `government`, or specific users, groups or destinations. Place these above the broad decrypt rules, because decryption policy is evaluated top-down like other rulebases. This protects employee privacy and helps comply with regulations and works council agreements. Local law may require such exclusions, so involve legal and human resources teams.",
   "Not decrypting does not mean not checking. Attach a decryption profile to No Decrypt rules to still validate server certificates, for example blocking sessions with expired certificates or untrusted issuers. You also still get App-ID based on the TLS handshake and the Server Name Indication (SNI), and URL filtering on the SNI and certificate. Keep exclusions as narrow as possible. Excluding a broad category or a wildcard domain can hide command-and-control traffic that abuses popular services. Review exclusions periodically, remove entries for apps that no longer exist, and prefer specific hostnames over categories.",
   "Consider a worked example. After decryption goes live, a department's desktop backup client stops working, while browsing is fine. The Decryption log shows handshake failures to `backup.example.com` with an error indicating the client rejected the certificate. Because the client pins its certificate, you add that hostname to the SSL Decryption Exclusion list rather than the whole cloud provider's domain, and the backups resume. In the same review, HR asks that employee medical portals stay private, so you add a No Decrypt rule for `health-and-medicine` with a decryption profile that still blocks expired certificates.",
   "Common mistakes: placing the No Decrypt rule below the broad decrypt rule so it never matches, excluding a whole category or wildcard when one hostname would do, forgetting to attach a decryption profile to No Decrypt rules, and trying to fix a pinned app by deploying the Forward Trust CA more widely (pinning ignores the OS trust store). Another is treating the exclusion list and a No Decrypt rule as interchangeable: one handles technical breakage, the other policy decisions.",
   "Exam questions use these clues. 'App fails but browser works after decryption' points to certificate pinning and an SSL Decryption Exclusion. 'Client certificate authentication' points to mutual TLS, which cannot be decrypted. 'Privacy', 'banking' or 'healthcare' points to a No Decrypt rule on URL categories. 'Still block expired certificates on excluded traffic' points to a decryption profile, and 'find which apps fail' points to the Decryption log."
  ],
  "terms": [
   [
    "Certificate pinning",
    "An app accepting only a specific certificate or CA for its server, which breaks when a firewall substitutes its own certificate."
   ],
   [
    "Mutual TLS",
    "TLS where the client also presents a certificate; a forward proxy cannot present the client's certificate, so it cannot decrypt the session."
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
   ],
   [
    "Decryption log",
    "The log that records decryption sessions and failures, with reasons, used to find apps needing exclusions."
   ]
  ],
  "example": "After decryption goes live, a department's desktop backup client stops working, while browsing is fine. The Decryption log shows handshake failures to the backup service's hostname. Because the client pins its certificate, you add that single hostname to the SSL Decryption Exclusion list and the backups resume, while a No Decrypt rule with a decryption profile keeps health sites private but still checks their certificates.",
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
   ],
   [
    "What can the firewall still inspect on traffic it does not decrypt?",
    "App-ID from the handshake, URL filtering on the SNI, and certificate checks through a decryption profile."
   ]
  ]
 },
 {
  "t": "User-ID sources (server monitoring, syslog listener, GlobalProtect, XML API), group mapping and Cloud Identity Engine",
  "body": [
   "User-ID maps IP addresses to usernames so policy and logs can refer to people and groups instead of addresses. That matters because addresses change constantly through DHCP, Wi-Fi roaming and VPNs, while a rule such as 'finance may reach the payroll app' should follow the person. The firewall does not guess: it learns mappings from sources you configure, and it applies them only in zones where User Identification is enabled.",
   "Server monitoring is the most common source. The firewall's built-in PAN-OS integrated User-ID agent, or the Windows-based User-ID agent installed on a server, reads security event logs from Microsoft Active Directory domain controllers, where successful logon events record which user logged on from which IP. It can also monitor Exchange servers and Novell eDirectory. The service account needs rights to read the event logs, such as membership in the Event Log Readers group, and should not be a domain admin. The Windows agent is useful at scale because it offloads collection from the firewall. You configure the integrated agent under Device > User Identification > User Mapping.",
   "A syslog listener collects mappings from systems that already authenticate users, such as wireless controllers, network access control (NAC) systems, VPN concentrators or proxies. You define syslog parse profiles with regular expressions or field identifiers that pick out the username and IP address from login and logout messages, then add the sending servers to the monitored server list. The listener is enabled through an interface management profile (User-ID Syslog Listener-UDP or -SSL) on the receiving interface; SSL is preferred because it protects the messages.",
   "GlobalProtect is the most reliable source for remote and roaming users: the user authenticates to the gateway, so the firewall knows exactly who holds the tunnel IP. Internal gateways extend this to LAN users. The XML API lets any script or third-party system push login and logout events, and tags, to the firewall; this is how custom apps, cloud platforms and orchestration tools feed User-ID. Other sources include Authentication Portal, terminal server agents for multi-user hosts (which map by source port range because many users share one IP), and client probing, which Palo Alto discourages because it can expose credentials. Mappings expire after a timeout, so choose a value that fits how long your users' addresses stay stable.",
   "Knowing a username is only half the job; policy is usually written for groups. Group mapping (Device > User Identification > Group Mapping Settings) uses an LDAP server profile to read group membership from the directory, with a group include list to limit which groups are retrieved and an update interval. The Cloud Identity Engine (CIE) is a cloud service that does directory synchronization and authentication for Palo Alto products. It reads users and groups from on-premises Active Directory (through an agent), Microsoft Entra ID, Okta and other identity providers, and firewalls query it for group information instead of each running LDAP group mapping. Its Cloud Authentication Service can also act as the authentication method for GlobalProtect and Authentication Portal using SAML identity providers. It is especially useful for cloud directories that have no LDAP interface.",
   "Consider a worked example. Staff connect through a Wi-Fi controller using 802.1X, but those logins do not touch the domain controllers, so many IPs show as unknown. You configure the controller to send authentication syslog over SSL to the firewall, write a syslog parse profile that extracts the user and IP, and add the controller as a monitored server. You check with `show user ip-user-mapping all` and `show user group list`, and the Wi-Fi users now appear in logs and match group-based rules.",
   "Common mistakes: running the User-ID service account as a domain admin, forgetting to enable User Identification on the internal zone, not including the groups used in policy in the group include list, parsing only login messages so stale mappings linger, and enabling client probing. Another is expecting LDAP group mapping to work against a cloud-only directory that has no LDAP service.",
   "Exam questions use these clues. 'Read logon events from domain controllers' is server monitoring. 'Wireless controller or NAC sends login messages' is a syslog listener with a parse profile. 'Remote users' is GlobalProtect. 'Custom script or orchestration platform' is the XML API. 'Many users share one IP' is the terminal server agent. 'Groups from Entra ID or Okta' points to the Cloud Identity Engine."
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
    "Terminal server agent",
    "A User-ID component that maps users on shared multi-user hosts by source port range."
   ],
   [
    "Group mapping",
    "Retrieving directory group membership, usually via LDAP, so policy can reference groups."
   ],
   [
    "Group include list",
    "The set of directory groups the firewall retrieves for use in policy."
   ],
   [
    "Cloud Identity Engine",
    "A Palo Alto cloud service that syncs users and groups from directories and IdPs and provides cloud authentication."
   ]
  ],
  "example": "Staff connect through a Wi-Fi controller using 802.1X, but those logins do not touch the domain controllers, so many IPs show as unknown. You configure the controller to send authentication syslog to the firewall, write a syslog parse profile that extracts user and IP, and the Wi-Fi users now appear in logs and match group-based rules, confirmed with show user ip-user-mapping all.",
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
   ],
   [
    "What permission should the server monitoring account have?",
    "Rights to read security event logs, such as the Event Log Readers group, not domain admin."
   ]
  ]
 },
 {
  "t": "Management plane: permitted IPs, service routes, candidate vs running config, commits, partial commits, config locks and named snapshots",
  "body": [
   "Palo Alto firewalls separate the management plane, which runs the web interface, CLI, logging, reporting and configuration, from the data plane, which processes traffic. The separation means a busy data plane does not lock you out of management, and heavy management tasks do not slow traffic. Protecting and operating the management plane carefully is basic hygiene and a favorite exam area, because a compromised management interface means a compromised firewall.",
   "Start with access. The dedicated MGT interface (Device > Setup > Interfaces > Management) has its own IP, the services it allows (HTTPS, SSH, ping, SNMP, User-ID and so on) and a Permitted IP Addresses list. Only listed addresses or subnets can reach those services. Best practice is to keep management on an isolated network, disable HTTP and Telnet, restrict permitted IPs to administrator jump hosts, require strong authentication, and never expose management to the Internet. Data interfaces with interface management profiles have their own permitted IP lists. Service routes decide which interface the management plane uses to reach external services such as DNS, NTP, updates, syslog and authentication servers; if the MGT network cannot reach them, configure a service route on a data interface under Device > Setup > Services.",
   "The firewall keeps two configurations. The candidate configuration is what you edit in the web interface or CLI configure mode; changes there do nothing yet. The running configuration is what the firewall is actually enforcing. A commit validates the candidate and makes it running. Before committing you can use Preview Changes to see a diff, Validate to check for errors without applying, and Change Summary to see what changed and who changed it. A partial commit applies only some changes, for example only those made by specific administrators, which prevents one admin from accidentally committing another's unfinished work. In the CLI, `commit partial admin <name>` does the same, and `show jobs all` tracks commit jobs.",
   "Locks coordinate multiple admins. A config lock stops other admins from changing the candidate configuration; a commit lock stops others from committing. Locks are set from the lock icon at the top of the web interface, and superusers can remove other admins' locks. Automatically acquiring a commit lock when you start editing is an optional setting. Named configuration snapshots protect you from mistakes. Under Device > Setup > Operations you can Save named configuration snapshot (writes the candidate to a named file), Load named configuration snapshot (replaces the candidate with it), Revert to running configuration (discard uncommitted changes), Load configuration version (return to an earlier committed version), and Export or Import to move files off the box. Loading a snapshot or version changes only the candidate; nothing takes effect until you commit.",
   "The distinctions the exam tests: candidate versus running, save versus commit, revert versus load, and config lock versus commit lock. Saving a snapshot does not apply anything; committing does. Reverting throws away uncommitted edits; loading a version brings back an older committed state into the candidate. A config lock protects editing; a commit lock protects committing.",
   "Consider a worked example. Two admins edit the same firewall. Priya has finished a NAT change, while Sam's half-built security rules are still in the candidate. Priya opens Commit, sets the scope to changes made by her own account, previews the diff and commits, so her NAT rule goes live and Sam's work stays pending until he is ready. Before the next weekend's upgrade, Sam saves a named snapshot `pre-upgrade-oct` and exports it with the device state to the team's file share.",
   "Common mistakes: believing a loaded snapshot is live without a commit, committing everything and pushing a colleague's unfinished rules, exposing HTTPS management on an Internet-facing data interface, leaving the permitted IP list empty so any host can reach the login page, and forgetting that `save` in the CLI writes a snapshot but does not commit. Another is holding a config lock and going home, blocking the whole team.",
   "Exam questions use these clues. 'Changes made but firewall behavior unchanged' points to no commit. 'Only commit my changes' is a partial commit. 'Prevent others from editing while I work' is a config lock. 'Discard all uncommitted changes' is Revert to running configuration. 'Go back to last week's committed configuration' is Load configuration version, followed by commit, and 'limit who can reach the web UI' is Permitted IP Addresses."
  ],
  "terms": [
   [
    "Management plane",
    "The part of the firewall that runs the web interface, CLI, logging and configuration, separate from traffic processing."
   ],
   [
    "Permitted IP Addresses",
    "A list on the MGT interface or an interface management profile limiting which hosts can reach management services."
   ],
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
  "example": "Two admins edit the same firewall. Priya has finished a NAT change, while Sam's half-built security rules are still in the candidate. Priya uses Commit with the scope limited to her own changes, so her NAT rule goes live and Sam's work stays pending until he is ready. Before the next upgrade, Sam saves and exports a named snapshot as a rollback point.",
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
   ],
   [
    "What is the difference between a config lock and a commit lock?",
    "A config lock stops others from editing the candidate; a commit lock stops others from committing."
   ]
  ]
 },
 {
  "t": "Web proxy (explicit and transparent) on supported PAN-OS 11.x platforms",
  "body": [
   "Many organizations have long run separate web proxies: browsers send web requests to a proxy that authenticates the user, inspects the request and forwards it. PAN-OS 11.x added a web proxy feature on supported platforms so the firewall itself can play that role, helping customers consolidate or migrate off legacy proxy appliances without rebuilding every workflow that assumes a proxy exists. Support depends on the hardware or VM model and the PAN-OS release, so check the compatibility information before planning rather than assuming every firewall can do it.",
   "An explicit proxy is one clients know about. Browsers or operating systems are configured, manually or with a PAC (proxy auto-config) file, to send web requests to the proxy's IP address and listening port. For HTTPS, the client sends an HTTP CONNECT request asking the proxy to open a tunnel to the destination. Because the client knowingly talks to the proxy, the proxy can challenge it for authentication, typically with Kerberos for domain machines or SAML (Security Assertion Markup Language) through an identity provider, often via the Cloud Identity Engine. Explicit proxy is useful when every web request must be attributed to a user, and where the firewall is not otherwise in the traffic path.",
   "A transparent proxy intercepts web traffic without client configuration. The firewall sits in the traffic path, and traffic destined for web ports is redirected into the proxy function. Users do not know a proxy exists, which avoids distributing PAC files, but it relies on routing traffic through the firewall, and user identity comes from other methods, such as User-ID mappings, rather than a proxy authentication challenge.",
   "Setup is done in the web proxy configuration (under Network > Proxy on supported releases). Expect to provide a loopback interface for the proxy, a DNS proxy object that the proxy uses for name resolution, the listening port for explicit mode, the authentication method, and the zones for proxy traffic. Security policy still applies: rules must allow the proxied traffic, and URL filtering, threat prevention and WildFire profiles do their normal jobs. To inspect HTTPS content rather than just see the domain in the CONNECT request or the SNI (Server Name Indication), you still need a decryption policy.",
   "How does this relate to the normal firewall? A regular next-generation firewall inspects traffic in line without being a proxy endpoint. The web proxy is an additional way of handling web traffic that preserves proxy-dependent workflows, such as PAC files, proxy authentication and applications hard-coded to use a proxy. Choose explicit when clients must be steered to the proxy and authenticated there, or when the firewall is not in the default path. Choose transparent when you cannot touch client settings and the firewall already sits in the path.",
   "Consider a worked example. A company is retiring an old proxy appliance that browsers reach through a PAC file with Kerberos authentication. On a supported firewall running a PAN-OS 11.x release with web proxy support, the team creates a loopback interface in a Proxy zone, a DNS proxy for resolution, and an explicit proxy listening on the same port the old appliance used, with Kerberos as the authentication method. They update the PAC file to point at the loopback's address, add a decryption rule for general web categories, and keep their user-based URL filtering rules. Browsers need no changes beyond the PAC update, and the Traffic and URL Filtering logs show usernames for every request.",
   "Common mistakes: assuming every model and release supports the web proxy, forgetting the DNS proxy the proxy depends on, expecting transparent mode to prompt users for credentials, and believing the proxy inspects HTTPS content without decryption. Another is updating the proxy but not the PAC file, so clients keep sending traffic to the old appliance. When troubleshooting, check that clients really use the PAC file, that DNS resolution through the DNS proxy works, that authentication succeeded, and then review Traffic and URL Filtering logs for the proxied sessions.",
   "Exam questions use these clues. 'Clients configured with a PAC file' or 'proxy authentication with Kerberos or SAML' point to explicit proxy. 'No client changes' or 'intercept in the path' point to transparent proxy. 'Migrate off a legacy proxy appliance' points to the web proxy feature on a supported platform. 'See HTTPS content' still requires decryption, and 'required components' include a loopback interface and a DNS proxy."
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
   ],
   [
    "Proxy authentication",
    "Challenging a client that talks to an explicit proxy to prove its identity, commonly with Kerberos or SAML."
   ],
   [
    "DNS proxy object",
    "The firewall DNS proxy configuration that the web proxy uses to resolve destination names."
   ]
  ],
  "example": "A company is retiring an old proxy appliance that browsers reach through a PAC file with Kerberos authentication. On a supported firewall running PAN-OS 11.x, the team configures an explicit web proxy on a loopback with a DNS proxy and Kerberos, updates the PAC file to point at the firewall's proxy address, and keeps user-based URL filtering working without changing browser settings.",
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
   ],
   [
    "Which supporting objects does the web proxy configuration expect?",
    "A loopback interface for the proxy and a DNS proxy for name resolution, plus zones and an authentication method for explicit mode."
   ]
  ]
 },
 {
  "t": "Panorama: device groups and hierarchy, pre-rules and post-rules, templates, template stacks, template variables and overrides",
  "body": [
   "Panorama is Palo Alto's centralized management platform for many firewalls. It lets you write policy once, push it to hundreds of devices, and see logs from all of them in one place. It splits configuration into two families: device groups for policies and objects, and templates for network and device settings. Keeping these straight is essential for the exam and for avoiding a messy fleet.",
   "A device group contains firewalls that share policy, such as all branch firewalls. It holds security, NAT, decryption, PBF and other rules plus address, service and security profile objects. Device groups form a hierarchy under the Shared location: Shared at the top, then parent device groups, then children, several levels deep. Objects and rules defined higher up are inherited by lower groups, so you can define company-wide rules once and region-specific rules below. A child can override an inherited object value when the object allows it, and each firewall belongs to exactly one device group.",
   "Panorama rules are placed before or after the firewall's own local rules. Pre-rules are evaluated first and cannot be overridden locally; they are ideal for company-wide blocks. Post-rules come after local rules and just above the default rules; they suit catch-all logging or cleanup rules. The full evaluation order on a managed firewall is: Shared pre-rules, ancestor device group pre-rules, the firewall's own device group pre-rules, local firewall rules, the device group post-rules, ancestor post-rules, Shared post-rules, then the intrazone and interzone defaults. Local admins can see Panorama rules but not edit them, which is exactly what makes pre-rules useful for mandatory controls.",
   "Templates configure the settings on the firewall's Network and Device tabs: interfaces, zones, routers, VPN, HA, server profiles, log settings and so on. A template stack combines several templates, for example a global template for DNS and NTP, a regional template for syslog servers, and a model-specific template for interfaces. Templates in a stack have an order, and when two templates configure the same setting, the one higher in the list wins. You assign firewalls to the stack, not directly to individual templates. The stack itself can also hold configuration that overrides its member templates.",
   "Template variables make shared templates work for many firewalls whose values differ. You write a variable like `$mgmt-dns` or `$branch-lan-ip` in the template, then give each firewall its own value in the template stack's per-device variable settings (Manage Variables, or a CSV import for many devices). One template can then serve a hundred branches, each with its own addresses. Overrides allow local deviations: a firewall admin can override a template-pushed value locally, shown with an override icon, unless you have set the template to prevent it. Overridden local values win over the template until someone reverts the override. Excessive overrides make fleets inconsistent, so use variables where values legitimately differ, and review the override icons on template-managed settings regularly so exceptions do not become permanent by accident.",
   "Consider a worked example. A retailer has 300 stores with identical designs but different subnets. The engineer builds one Store template with variables for the LAN IP and gateway, stacks it below a Global template for DNS, NTP and logging, and assigns all store firewalls to the Store-Stack. Policy lives in a Stores device group under a Retail parent. Shared pre-rules block high-risk URL categories everywhere, the Stores group adds point-of-sale rules, and a Shared post-rule denies and logs everything else. Each store gets its own variable values and the same policy.",
   "Common mistakes: looking for interfaces in a device group or security rules in a template, assuming the lower template in a stack wins, expecting local rules to override pre-rules, copying a template per site instead of using variables, and letting local overrides pile up unnoticed. Another is forgetting that Panorama rules only exist on the firewall after a push, which the next lesson covers.",
   "Exam questions use these clues. 'Policies and objects for a set of firewalls' is a device group. 'Interfaces, zones, DNS, server profiles' is a template. 'Combine global, regional and model templates' is a template stack. 'Same template, different IPs per firewall' is template variables. 'Company rule that local admins cannot bypass' is a Shared or device group pre-rule, and 'catch-all logging just above the defaults' is a post-rule."
  ],
  "terms": [
   [
    "Device group",
    "A Panorama container of firewalls sharing policies and objects, arranged in a hierarchy under Shared."
   ],
   [
    "Shared location",
    "The top of the device group hierarchy, whose objects and rules are inherited by every device group."
   ],
   [
    "Pre-rules / post-rules",
    "Panorama rules evaluated before, or after, a firewall's local rules."
   ],
   [
    "Template",
    "Panorama configuration for the firewall's Network and Device tab settings, such as interfaces, zones and server profiles."
   ],
   [
    "Template stack",
    "An ordered combination of templates assigned to firewalls; higher templates win when settings conflict."
   ],
   [
    "Template variable",
    "A placeholder such as $dns-primary in a template whose value is set per firewall."
   ],
   [
    "Override",
    "A local firewall value that replaces a template-pushed value until the override is reverted."
   ]
  ],
  "example": "A retailer has 300 stores with identical designs but different subnets. The engineer builds one store template with variables for the LAN IP and gateway, stacks it under a global template for DNS, NTP and logging, and places Shared pre-rules blocking high-risk categories. Each store gets its own variable values and the same policy, and local admins cannot bypass the pre-rules.",
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
   ],
   [
    "Two templates in a stack set different DNS servers. Which value is used?",
    "The value from the template higher in the stack's order."
   ]
  ]
 },
 {
  "t": "Panorama commit and push workflow; Panorama modes (Panorama, Management Only, Log Collector) and version requirements",
  "body": [
   "Panorama has its own candidate and running configuration, just like a firewall, and it also holds configuration intended for managed devices. Changes therefore take two steps to reach a firewall, and forgetting the second step is one of the most common real-world mistakes. This lesson covers that workflow, the modes a Panorama appliance can run in, and the version rules that decide upgrade order.",
   "Step one is Commit to Panorama. This validates your changes and makes them part of Panorama's running configuration, but nothing reaches the firewalls yet. Step two is Push to Devices, which sends device group and template configuration to the selected firewalls, and collector group configuration to Log Collectors. Each firewall then performs its own commit. The Commit and Push option does both in sequence. You can edit the push scope to choose which device groups, templates and devices receive the push, and the Task Manager or Push Status shows per-device success, warnings and failures.",
   "The Panorama > Managed Devices > Summary page shows whether each firewall's device group and template are In Sync or Out of Sync with Panorama, a quick way to find devices that missed a push, along with connection status and software versions. Preview Changes lets you see what a push will change on a device before sending it. If a local admin overrides a template setting, that device's configuration diverges until the override is reverted. Panorama can also be deployed as a high availability pair for resilience, and while Panorama manages a firewall, local changes are still possible, though best practice is to make shared changes centrally.",
   "Panorama runs in one of several modes. Panorama mode manages firewalls and also collects logs using its local Log Collector (on an M-Series appliance or a virtual appliance with log disks). Management Only mode manages devices but does not store firewall logs locally; logs go to dedicated Log Collectors or cloud logging. Log Collector mode turns the appliance into a dedicated log collector with no web interface for management; it is managed by a Panorama in Panorama or Management Only mode, and Log Collectors are grouped into collector groups for redundancy and scale. Older virtual deployments may also appear in a legacy mode. You change modes from the CLI with commands such as `request system system-mode logger` or `request system system-mode management-only`, and the change reboots the appliance.",
   "Version requirements follow one rule: Panorama must run the same or a later release than the firewalls it manages. That means you upgrade Panorama first, then firewalls. Dedicated Log Collectors should run the same release as the Panorama managing them, so in a large deployment you upgrade Panorama, then its Log Collectors, then the firewalls, checking each stage before moving on. Panorama plugins, such as those for cloud or Kubernetes integrations, have their own compatibility requirements to check. The distinction the exam tests is between committing and pushing, and between managing and collecting: Management Only manages without logs, Log Collector collects without managing.",
   "Consider a worked example. An engineer adds a block rule for a new malicious domain list to the Branches device group and clicks Commit to Panorama. An hour later the firewalls still allow the traffic. Managed Devices shows the Branches device group as Out of Sync on every branch firewall: the change was only committed to Panorama. The engineer uses Push to Devices with the scope set to the Branches device group, watches the Push Status until each firewall reports success, and the rule takes effect.",
   "Common mistakes: stopping after Commit to Panorama, pushing to the wrong scope and changing devices that were not ready, upgrading firewalls before Panorama, running Log Collectors on a different release from Panorama, and expecting to log in to a Log Collector's web interface. Another is switching an appliance's mode without planning, forgetting that the mode change reboots it and changes what it stores.",
   "Exam questions use these clues. 'Changes committed but firewalls unchanged' points to a missing push. 'Out of Sync' points to Managed Devices and a push. 'Manages devices, stores no logs locally' is Management Only mode. 'Dedicated log storage with no management UI' is Log Collector mode. 'Can older Panorama manage newer firewalls?' is no, so Panorama is always upgraded first."
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
    "Commit and Push",
    "A single action that commits to Panorama and then pushes to the selected devices."
   ],
   [
    "Panorama mode",
    "The mode in which Panorama both manages devices and stores logs with its local Log Collector."
   ],
   [
    "Management Only mode",
    "Panorama mode that manages devices but stores no firewall logs locally."
   ],
   [
    "Log Collector mode",
    "Mode that makes an appliance a dedicated log collector managed by another Panorama."
   ],
   [
    "Collector group",
    "A set of Log Collectors that share log storage for redundancy and scale."
   ]
  ],
  "example": "An engineer adds a block rule for a new malicious domain list in Panorama and commits. An hour later the firewalls still allow the traffic. Managed Devices shows the device group Out of Sync: the change was only committed to Panorama. A Push to Devices for that device group fixes it, and the Push Status confirms each firewall committed successfully.",
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
   ],
   [
    "Where do you see which firewalls missed a push?",
    "Panorama > Managed Devices, where device group and template status show In Sync or Out of Sync."
   ]
  ]
 },
 {
  "t": "PAN-OS XML API (keygen, config, op, commit) and REST API; API-only admin role profiles",
  "body": [
   "Everything you do in the web interface is ultimately an API call, and PAN-OS exposes two APIs for automation. The XML API is the older, comprehensive one, covering configuration, operational commands, commits, logs, reports, User-ID and file transfers. The REST API offers JSON-based access to policies, objects, network and device configuration. Both run over HTTPS on the management interface, or a data interface whose management profile allows HTTPS. Automation matters because it makes repeated changes consistent and lets security tools react faster than a human can.",
   "The XML API is organized by request type, the `type` parameter of requests to the `/api/` endpoint. First you get an API key with `type=keygen`, supplying a username and password, preferably in a POST body rather than the URL so credentials do not end up in logs. The key is then sent with later requests, ideally in the `X-PAN-KEY` header. Using a dedicated service account means the key has only that account's rights.",
   "Configuration requests use `type=config` with an `action` and an `xpath` pointing at a node in the configuration tree. Common actions are get (read the candidate configuration), show (read the running configuration), set (add or merge), edit (replace), delete, rename, clone and move. Operational requests use `type=op` with a `cmd` parameter containing the CLI command expressed as XML, such as `<show><system><info></info></system></show>`. A handy trick is running `debug cli on` in the CLI, which prints the XML equivalent of commands you type. Commits use `type=commit`, optionally partial, and return a job ID that you poll with an op request such as `<show><jobs><id>42</id></jobs></show>` to check completion. Other types include log, report, export, import, user-id and version.",
   "The REST API uses resource URLs with a version in the path, such as `/restapi/v11.0/Objects/Addresses`, with query parameters for location (for example `location=vsys&vsys=vsys1`) and name, and standard HTTP methods: GET to read, POST to create, PUT to edit, DELETE to remove. It is easy for developers who know JSON, but it does not cover everything; operations such as commit are done through the XML API. The firewall hosts API documentation and an API browser under its management address, which you can use to explore both APIs.",
   "Security for API use comes from an API-only admin role profile. Create an admin role profile with every Web UI area disabled, Command Line set to none, and only the XML API types and REST API resources the script needs enabled. For a read-only log exporter, enable only XML API Log. For an address-object updater, enable Configuration and Commit and nothing else. Assign that profile to a dedicated administrator account, generate the key, and store it in a secrets manager. You can set an API key lifetime in the device authentication settings so keys expire, and use Expire All API Keys to revoke existing keys; generating a new key does not by itself invalidate older ones.",
   "Consider a worked example. A security team's orchestration tool must add attacker IPs to an address group. You create an admin role profile with web UI and CLI off and only XML API Configuration and Commit enabled, create `svc-soar` with it, and generate a key. The tool sends `type=config&action=set` with an xpath to `/config/devices/entry/vsys/entry[@name='vsys1']/address` and an element defining the new address object, adds it to the group, then sends `type=commit` and polls the job ID until it reports success. Every change appears in the Config log under `svc-soar`.",
   "Common mistakes: using a Superuser key in scripts, putting passwords in URLs, using edit when you meant set and wiping out siblings under the xpath, forgetting that config changes land in the candidate until a commit, and ignoring XML responses with `status=\"error\"`. Another is expecting the REST API to commit. Always test automation against a lab firewall first, and log the job IDs your scripts receive so a failed commit can be traced and retried instead of silently leaving changes in the candidate.",
   "Exam questions use these clues. 'Obtain an API key' is keygen. 'Read or change configuration at a path' is type=config with an xpath. 'Run a show command' is type=op. 'Make changes live' is type=commit and polling the job. 'JSON with GET, POST, PUT and DELETE on versioned URLs' is the REST API. 'Script must only read logs' points to an admin role profile with only XML API Log enabled."
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
    "set vs edit",
    "XML API config actions: set adds or merges at the xpath, edit replaces the node at the xpath."
   ],
   [
    "type=op",
    "The XML API request type for running operational (non-configuration) commands expressed as XML."
   ],
   [
    "REST API",
    "The JSON-based PAN-OS API using versioned resource URLs and standard HTTP methods."
   ],
   [
    "API-only role",
    "An admin role profile with web UI and CLI disabled and only needed API permissions enabled."
   ],
   [
    "API key lifetime",
    "A device setting that makes API keys expire after a set period."
   ]
  ],
  "example": "A security team's orchestration tool must add attacker IPs to an address group. You create an admin role with web UI and CLI off and only XML API configuration and commit enabled, generate a key for that account, and the tool uses type=config action=set with an xpath to the address object, then type=commit, polling the job ID. Each change is traceable to the service account in the Config log.",
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
   ],
   [
    "What is the difference between action=get and action=show in a config request?",
    "get reads the candidate configuration; show reads the running configuration."
   ]
  ]
 },
 {
  "t": "Infrastructure as code: Terraform panos provider, Ansible paloaltonetworks.panos collection, pan-os-python SDK",
  "body": [
   "Infrastructure as code (IaC) means describing firewall configuration in text files kept in version control, then letting a tool apply it. The benefits are repeatability, peer review of changes, easy rollback to a known version, and consistency across many firewalls. All three tools in this topic talk to the PAN-OS XML API underneath, so everything from the API lesson still applies: API keys, API-only admin roles, and the difference between candidate and running configuration. The tools differ mainly in style: whether you describe an end state, a sequence of steps, or write your own program. Terraform, from HashiCorp, is declarative: you write the desired end state in HCL (HashiCorp Configuration Language) files and Terraform works out what to create, change or delete. The Palo Alto Networks `panos` provider supplies resources for objects, policies, network settings and more, for firewalls and Panorama. Terraform records what it manages in a state file, `terraform plan` shows the changes before `terraform apply` makes them, and `terraform destroy` removes what it created. Terraform is excellent at building configuration, for example creating address objects and rules alongside cloud VM-Series deployments. Committing is handled separately from the resource changes, and how depends on the provider version, so check its documentation; pushed configuration is not live until committed. Protect the state file, because it can contain sensitive values.",
   "Ansible, from Red Hat, uses YAML playbooks of tasks run in order. The `paloaltonetworks.panos` collection, installed with `ansible-galaxy collection install paloaltonetworks.panos`, provides modules for address objects, security rules, NAT, interfaces, commits and operational commands. Each module takes a provider dictionary with the firewall address and credentials or API key. Modules are designed to be idempotent: running a playbook twice should change nothing the second time. Ansible is well suited to procedural workflows such as onboarding a firewall, running an upgrade sequence or collecting information.",
   "```yaml\n- name: Ensure web server object exists\n  paloaltonetworks.panos.panos_address_object:\n    provider: '{{ provider }}'\n    name: web-srv\n    value: 10.1.1.10\n    description: DMZ web server\n\n- name: Commit\n  paloaltonetworks.panos.panos_commit_firewall:\n    provider: '{{ provider }}'\n```",
   "pan-os-python is Palo Alto's Python SDK (software development kit), imported as `panos`. It models the configuration as an object tree: a Firewall or Panorama object at the top, with children such as address objects, rulebases and rules. You build or refresh objects in Python, then call methods like `create()`, `apply()`, `delete()` and `commit()`. It is the most flexible choice when you need custom logic, and it is what the Ansible collection uses internally.",
   "```python\nfrom panos.firewall import Firewall\nfrom panos.objects import AddressObject\n\nfw = Firewall('192.0.2.10', api_key=API_KEY)\nobj = AddressObject('web-srv', '10.1.1.10')\nfw.add(obj)\nobj.create()   # goes into the candidate config\nfw.commit()    # makes it running\n```",
   "Consider a worked example. A cloud team deploys VM-Series firewalls with Terraform. They add the `panos` provider to the same repository so each new application's address objects and security rules are defined next to its infrastructure. A developer opens a pull request, the pipeline runs `terraform plan` and posts the output for review, a security engineer approves, and the pipeline applies and commits using a dedicated API-only account whose key lives in the pipeline's secret store. Separately, operations uses an Ansible playbook for monthly content and software upgrades because the steps must run in a fixed order.",
   "Common mistakes: forgetting the commit and wondering why nothing changed, editing objects by hand in the web interface so they drift from Terraform state, storing API keys or passwords in the repository, using a Superuser account for automation, and writing Ansible tasks with raw commands that break idempotency. Choosing between the tools is its own trap: Terraform for declarative, state-driven builds, especially alongside cloud infrastructure; Ansible for ordered workflows and teams already using it; pan-os-python for custom scripts and integrations. Many teams combine them, for example Terraform to build the baseline and Ansible or Python for day-two operations, as long as each object has one clear owner so tools do not fight over it.",
   "Exam questions use these clues. 'Desired state', 'plan and apply' or 'state file' point to Terraform. 'Playbook', 'YAML tasks', 'idempotent modules' or 'Galaxy collection' point to Ansible and `paloaltonetworks.panos`. 'Python object tree with create and commit methods' is pan-os-python. 'Changes made but not live' points to a missing commit, whichever tool was used."
  ],
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Managing configuration through version-controlled text files applied by tools rather than manual changes."
   ],
   [
    "Declarative",
    "Describing the desired end state and letting the tool compute the changes, as Terraform does."
   ],
   [
    "Terraform state",
    "The file where Terraform records the resources it manages and their current values."
   ],
   [
    "Idempotent",
    "Producing the same result no matter how many times an operation runs, a design goal of Ansible modules."
   ],
   [
    "paloaltonetworks.panos",
    "The Ansible collection of modules for managing PAN-OS firewalls and Panorama."
   ],
   [
    "pan-os-python",
    "Palo Alto's Python SDK that models firewall and Panorama configuration as an object tree."
   ]
  ],
  "example": "A cloud team deploys VM-Series firewalls with Terraform. They add the panos provider to the same repository so each new application's address objects and security rules are defined next to its infrastructure, reviewed in a pull request, planned, applied and then committed through their pipeline using an API-only account whose key is kept in the pipeline's secret store.",
  "tip": "Terraform is declarative and state-based, Ansible runs ordered idempotent tasks, pan-os-python is the Python SDK the Ansible collection builds on. All of them change the candidate configuration, so a commit is still required.",
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
   ],
   [
    "Why does idempotency matter in Ansible playbooks?",
    "Running the same playbook again makes no further changes, so it is safe to re-run and reports only real drift."
   ]
  ]
 },
 {
  "t": "External dynamic lists (IP, domain, URL) and dynamic address groups with tags",
  "body": [
   "Static policy is slow to change: every new malicious address or new server means an edit and a commit. External dynamic lists and dynamic address groups let policy adapt automatically, and both are central to automation on PAN-OS. They share one idea: the rule stays the same while its membership changes at runtime, so security keeps pace with threat feeds and cloud workloads without an administrator in the loop for every change.",
   "An external dynamic list (EDL) is a text file hosted on a web server, one entry per line, that the firewall downloads on a schedule. You create it under Objects > External Dynamic Lists with a type, a source URL, an optional certificate profile to validate an HTTPS server, credentials if needed, and a check interval (every five minutes, hourly, daily, weekly or monthly). Changes in the file take effect at the next refresh with no commit. You can force a refresh from the CLI with `request system external-list refresh type ip name <list>` and view the entries with `request system external-list show type ip name <list>`. You can also list exceptions in the EDL object so specific entries are ignored even if they appear in the file.",
   "The type decides where the list can be used. An IP Address list holds addresses, ranges and subnets and is used as a source or destination in security, NAT, PBF and decryption rules. A Domain list is used in anti-spyware profiles, under DNS policies, so the firewall can alert, block or sinkhole DNS queries for listed domains. A URL list is used as a custom URL category in URL filtering profiles, or as a URL category match in security and decryption rules. Palo Alto also provides predefined IP lists, such as known malicious IP addresses and bulletproof hosting providers, maintained through threat content subscriptions, and predefined URL lists. Each platform has capacity limits for entries, which vary by model.",
   "A dynamic address group (DAG) is an address group whose membership is defined by a match expression on tags, such as `'web' and 'prod'`, rather than a fixed list. Any IP address registered with matching tags becomes a member automatically. Tags can come from address objects, from the XML API (register and unregister calls from scripts or orchestration tools), from VM information sources that read cloud or hypervisor metadata, from auto-tagging in log forwarding profiles, and from Panorama or User-ID agents. Membership updates happen at runtime without a commit, which is why DAGs are used for quarantines and cloud workloads that come and go. You can see current members from the group's 'more' link or with `show object dynamic-address-group all`. Dynamic user groups are the user equivalent: groups whose members are users carrying certain tags, useful for quarantining a compromised account rather than an IP.",
   "The choice between them is about where the truth lives. Use an EDL when the source of truth is a list maintained elsewhere, such as a threat intelligence feed or an internal IT inventory published as a file. Use a DAG when membership comes from events or metadata, such as a detection, a VM's cloud tags or an orchestration tool's decision. Always consider what happens if the list server is unreachable (the firewall keeps the last successfully retrieved list) and protect the list source, since whoever controls it controls your policy.",
   "Consider a worked example. A threat intelligence platform publishes a list of command-and-control domains over HTTPS. You add it as a Domain EDL with a certificate profile, reference it in the anti-spyware profile's DNS Policies with the sinkhole action, and attach that profile to your outbound rules. Infected hosts now receive the sinkhole address when they query a listed domain, and you look for internal hosts connecting to the sinkhole address in the Traffic log to find infected machines. Meanwhile, web servers in the cloud carry tags `web` and `prod`, and a DAG with that match expression lets the inbound rule follow them as they scale.",
   "Common mistakes: using a Domain list in a security rule (it belongs in anti-spyware DNS policies), expecting EDL changes to need a commit or DAG membership to appear only after one, hosting a list on an unauthenticated server anyone can edit, and setting a long refresh interval for a fast-moving feed. Another is writing a DAG match expression with a typo in the tag name, so the group silently stays empty.",
   "Exam questions use these clues. 'Threat feed of IPs used as a rule source or destination' is an IP EDL. 'Block or sinkhole malicious domains from a feed' is a Domain EDL in an anti-spyware profile. 'Feed of URLs for URL filtering' is a URL EDL. 'Membership changes with tags, no commit' is a dynamic address group, and 'quarantine a user account' is a dynamic user group."
  ],
  "terms": [
   [
    "External dynamic list (EDL)",
    "A web-hosted list of IPs, domains or URLs that the firewall retrieves periodically and uses in policy without a commit."
   ],
   [
    "Check interval",
    "How often the firewall retrieves an EDL: every five minutes, hourly, daily, weekly or monthly."
   ],
   [
    "Dynamic address group (DAG)",
    "An address group whose members are IP addresses registered with tags that match its filter."
   ],
   [
    "Tag registration",
    "Associating a tag with an IP address or user at runtime, via the API, VM monitoring, auto-tagging or agents."
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
  "example": "A threat intelligence platform publishes a list of command-and-control domains. You add it as a Domain EDL, reference it in the anti-spyware profile's DNS policy with the sinkhole action, and then look for internal hosts connecting to the sinkhole address in the Traffic log to find infected machines. The list refreshes every five minutes with no commit required.",
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
   ],
   [
    "What happens if the EDL web server becomes unreachable?",
    "The firewall keeps using the last list it successfully retrieved."
   ]
  ]
 },
 {
  "t": "Auto-tagging from log forwarding profiles and HTTP server profiles for webhooks and ticketing",
  "body": [
   "Auto-tagging closes the loop between detection and enforcement. When the firewall logs an event that matters, such as a critical threat from an internal host, it can tag the host's IP address. A dynamic address group (DAG) that matches the tag then places the host into a quarantine rule, all within seconds and without a commit. HTTP server profiles extend the same idea outward, sending the event to ticketing, chat or orchestration systems so people and other tools can respond too.",
   "Tagging is configured in a log forwarding profile (Objects > Log Forwarding). Each match list entry has a log type and a filter, for example the threat log with `(severity eq critical)`. Under Built-in Actions you add an action of type Tagging: choose the target (source address, destination address, and for some log types the user or the XFF, X-Forwarded-For, address), the action (add tag or remove tag), where the tag is registered (the local User-ID, Panorama, or a remote device through an HTTP server profile), the tag itself, and an optional timeout after which the tag expires. Then attach the log forwarding profile to the security rules whose traffic should trigger it.",
   "The enforcement side is ordinary policy. Create a DAG with a match expression on the tag, such as `'quarantine'`, and place a rule near the top of the rulebase that denies or restricts traffic from that DAG, perhaps allowing only access to remediation servers. Because DAG membership updates dynamically, tagged hosts are restricted immediately. A timeout lets hosts return automatically; without one, an administrator removes the tag after cleanup, for example with an XML API unregister call. Tagging users into dynamic user groups works the same way when user identity matters more than IP.",
   "HTTP server profiles send logs to other systems. Under Device > Server Profiles > HTTP you define one or more servers (address, protocol, port, method) and, on the Payload Format tab, a URI format, headers, parameters and a payload template per log type, built from log field variables such as `$src`, `$threatid` and `$severity`. Predefined payload formats exist for some common services, and you can write your own JSON. When a log forwarding profile sends a matching log to the HTTP profile, the firewall calls the webhook. That can open a ticket in an IT service management tool, post to a chat channel, or trigger an orchestration playbook. Use HTTPS and authentication headers so the receiving side can trust the request, and use the profile's Send Test Log button to check the format.",
   "Put together, a single critical threat can tag the host into quarantine, open an incident ticket and notify the on-call analyst. This is the kind of integration the exam expects you to design, so remember the chain: a log forwarding profile entry with a filter, a tagging built-in action, a DAG matching the tag, a security rule using the DAG, and an HTTP server profile for external notification. Review the IP-Tag log to confirm tags were registered and removed as expected.",
   "Consider a worked example. A laptop triggers a critical spyware signature. The log forwarding profile on the outbound rule has a threat entry filtered on critical severity with two actions: tag the source address `quarantine` with a 24-hour timeout, and forward the log to an HTTP server profile that opens a ticket with the host, user and threat name. A rule at the top of the rulebase denies the Quarantine DAG everything except the remediation server. The laptop is isolated before an analyst even looks, and the ticket is waiting when they do.",
   "Common mistakes: tagging on low-severity or false-positive-prone events and quarantining healthy machines, forgetting to attach the log forwarding profile to the rules that generate the logs, placing the quarantine rule below broader allow rules so it never matches, and sending webhooks over plain HTTP with no authentication. Start with alerting only, and tighten filters as you gain confidence before turning on automatic quarantine.",
   "Exam questions use these clues. 'Automatically isolate a host after a critical threat without a commit' points to a tagging built-in action plus a DAG in a deny rule. 'Open a ticket' or 'send to a chat or orchestration webhook' points to an HTTP server profile. 'Tag expires automatically' is the tag timeout. 'Verify tags were applied' points to the IP-Tag log."
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
    "Tag timeout",
    "The time after which an auto-applied tag is removed, letting a host leave quarantine automatically."
   ],
   [
    "Webhook",
    "An HTTP request sent to another system when an event occurs, used here via an HTTP server profile."
   ],
   [
    "Payload format",
    "The per-log-type URI, headers and body template an HTTP server profile uses to build its requests."
   ],
   [
    "IP-Tag log",
    "The log that records tags registered to and removed from IP addresses."
   ]
  ],
  "example": "A laptop triggers a critical spyware signature. The log forwarding profile tags its IP 'quarantine' with a 24-hour timeout and sends the threat log to an HTTP server profile that opens a ticket. A top rule denies the Quarantine DAG everything except the remediation server, so the laptop is isolated before an analyst even looks, and the IP-Tag log records when the tag was added and removed.",
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
   ],
   [
    "How can a quarantined host be released automatically?",
    "Set a timeout on the tagging action so the tag, and therefore DAG membership, expires."
   ]
  ]
 },
 {
  "t": "VM-Series bootstrapping (init-cfg.txt, bootstrap.xml, content/license/software/plugins folders) and Zero Touch Provisioning",
  "body": [
   "Deploying a firewall by hand, logging in to set an IP, license it, update it and configure it, does not scale in the cloud or across hundreds of sites. Bootstrapping lets a VM-Series firewall configure itself on first boot, and Zero Touch Provisioning (ZTP) does something similar for supported hardware firewalls. Both remove the skilled engineer from the first-boot process, which makes autoscaling and large rollouts possible, and it guarantees every new firewall starts from the same known configuration. A bootstrap package is a set of folders the firewall reads at first boot. `config` holds `init-cfg.txt` and optionally `bootstrap.xml`. `license` holds an `authcodes` file with the license authorization codes. `software` holds a PAN-OS image to upgrade to. `content` holds Applications and Threats and optionally antivirus content packages to install. `plugins` holds VM-Series plugin images. The config, license, software and content folders must exist even when empty; plugins is optional.",
   "The `init-cfg.txt` file holds basic settings as key-value pairs: the management interface type (DHCP client or static, with IP address, netmask and default gateway), hostname, DNS servers, Panorama server addresses, the template stack and device group names to join, the VM auth key that lets the firewall register with Panorama, and operational options such as swapping the management interface, which some cloud load balancer designs need. The optional `bootstrap.xml` is a complete configuration file, typically exported from a working firewall, that becomes the running configuration. Many teams skip it and let Panorama push configuration after registration, which keeps configuration in one place.",
   "```\ntype=dhcp-client\nhostname=fw-aws-01\npanorama-server=10.0.10.5\ntplname=AWS-Stack\ndgname=AWS-Firewalls\nvm-auth-key=<key generated on Panorama>\ndns-primary=10.0.0.2\n```",
   "The package can be delivered in several ways depending on the platform: an ISO image attached as a virtual CD-ROM, a block storage volume, a cloud storage bucket or file share (such as AWS S3, Azure storage or Google Cloud Storage) referenced in the instance's user data, or basic init-cfg settings passed directly as user data or custom data without a full package. Bootstrapping only happens when the firewall boots from a factory-default state; it will not reapply to an already-configured firewall. The first boot runs in order: apply management settings, license from the auth codes, install content and software (rebooting if needed), load configuration, and register with Panorama. Watch progress with `show system bootstrap status`, and check the System log if a step fails.",
   "Zero Touch Provisioning is for hardware firewalls ordered as ZTP-capable models. An administrator registers the serial numbers and claim information with Panorama (using its ZTP plugin) or cloud management ahead of time. On site, someone plugs the firewall into power and an Internet-connected port. The firewall contacts the Palo Alto ZTP service, learns which manager it belongs to, connects, and receives its template and device group configuration. No skilled engineer needs to be present. The distinction to remember: bootstrapping is a package you supply to a VM-Series instance; ZTP is a cloud-assisted claim process for hardware.",
   "Consider a worked example. An autoscaling group in AWS launches new VM-Series instances during peak load. Each instance's user data points to an S3 bucket containing `init-cfg.txt` with Panorama addresses, device group and template stack names and a VM auth key, plus an `authcodes` file, with the instance role granted read access to the bucket. New firewalls license themselves, register with Panorama, receive policy and join the load balancer target group automatically. When a new instance stays unlicensed, `show system bootstrap status` reveals it could not reach the licensing servers because a route was missing.",
   "Common mistakes: missing required folders, wrong file names or case, buckets the instance cannot read because of permissions, firewalls that cannot reach the licensing servers or Panorama, an expired VM auth key, and expecting a bootstrap package to reconfigure a firewall that has already been set up. Another is embedding long-lived secrets in user data that many people can read; keep auth codes and keys in storage with tight access controls.",
   "Exam questions use these clues: 'which device group and template stack to join' is `init-cfg.txt`; 'full configuration at boot' is `bootstrap.xml`; 'license codes' is the authcodes file in the license folder; 'plug in power and network at a branch' is ZTP; and 'bootstrap ignored after reboot' means the firewall was not factory default."
  ],
  "terms": [
   [
    "Bootstrap package",
    "The config, license, software, content and plugins folders a VM-Series firewall reads on first boot."
   ],
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
    "VM auth key",
    "A key generated on Panorama that lets a bootstrapping VM-Series firewall register with it."
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
   ],
   [
    "Which bootstrap folders must exist even if empty?",
    "config, license, software and content; plugins is optional."
   ]
  ]
 },
 {
  "t": "Form factors: PA-Series, VM-Series, CN-Series, Cloud NGFW for AWS and Azure",
  "body": [
   "Palo Alto runs the same core technology, PAN-OS with App-ID, User-ID, Content-ID and the security subscriptions, across several form factors. What changes is where the firewall runs and who operates it. The exam expects you to pick the right one for a scenario and to know how each is deployed and managed, so think of each form factor as an answer to 'what am I protecting, and how much of the firewall do I want to run myself?'",
   "PA-Series firewalls are physical appliances, from small branch models to large chassis for data centers and service providers. They use a single-pass architecture, where traffic is classified and inspected once, with dedicated resources for the management plane and data plane so heavy management tasks do not slow traffic. Choose PA-Series for campus edges, data centers and branches where you own the physical network, need high throughput, or want hardware-based features such as dedicated HA ports.",
   "VM-Series firewalls are the same PAN-OS as a virtual machine. They run on private cloud hypervisors such as VMware ESXi, KVM and Hyper-V, and in public clouds such as AWS, Azure, Google Cloud and Oracle Cloud. Licensing is available through flexible credit-based models or cloud marketplaces. You manage VM-Series like any firewall, usually through Panorama or cloud management, and deploy them with bootstrapping and infrastructure as code. In the cloud you still own the virtual machines: sizing, scaling, patching and high availability are your responsibility, often using cloud load balancers.",
   "CN-Series firewalls protect Kubernetes environments. They are delivered as containers: a management component (CN-MGMT) and firewall data plane components (CN-NGFW) that inspect traffic between pods, namespaces and services, including east-west traffic that never leaves the cluster. They are deployed with Kubernetes manifests or Helm charts, either as a DaemonSet (a firewall pod on each node) or as a Kubernetes service, and they are managed by Panorama with a Kubernetes plugin that can learn pod labels and turn them into tags for dynamic address groups, so policy follows workloads as they scale.",
   "Cloud NGFW for AWS and Cloud NGFW for Azure are managed services. Palo Alto operates the firewall infrastructure, including scaling, availability and upgrades, and you consume it as a native cloud resource bought through the cloud marketplace. In AWS it is inserted with endpoints that work with the Gateway Load Balancer model; in Azure it is deployed into a virtual network or a Virtual WAN hub. Policy is managed as rulestacks through the cloud console, APIs or infrastructure as code, or through Panorama or Strata Cloud Manager integration. You give up some low-level control compared with VM-Series in exchange for not running the firewalls yourself.",
   "Consider a worked example. A company protects its data center with PA-Series in an HA pair, runs VM-Series in a private VMware cloud where it needs full PAN-OS control and custom routing, uses CN-Series to control traffic between namespaces in its Kubernetes clusters, and, for a new AWS account where the team does not want to patch or scale firewall instances, subscribes to Cloud NGFW for AWS through the marketplace and manages its rulestack with Terraform. Remote users and small branches are served by Prisma Access, the SASE (secure access service edge) offering built on the same technology.",
   "Common mistakes: choosing Cloud NGFW when the scenario needs full control of routing or PAN-OS features on the instance, choosing VM-Series when the requirement is 'no firewall instances to manage', using a perimeter firewall to inspect pod-to-pod traffic that never leaves the cluster, and forgetting that VM-Series in the cloud still needs a scaling and HA design. Another is assuming form factors run different security engines; the inspection technology is shared, while capacity and operational model differ. Licensing also differs: hardware is bought per appliance, while virtual and cloud options are often consumed through credits or marketplace billing, so read the scenario for hints about how the customer wants to pay and operate.",
   "Exam questions use these clues. 'Physical campus or data center' is PA-Series. 'Hypervisor or cloud VM you operate' is VM-Series. 'Kubernetes', 'pods', 'namespaces' or 'east-west inside the cluster' is CN-Series. 'Managed service', 'marketplace', 'no instances to operate' or 'rulestack' is Cloud NGFW. 'Remote users as a cloud service' points to Prisma Access."
  ],
  "terms": [
   [
    "PA-Series",
    "Palo Alto's physical hardware firewalls with separate management and data plane resources."
   ],
   [
    "Single-pass architecture",
    "Processing each packet once for classification and inspection instead of passing it through separate engines."
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
  "example": "A company protects its data center with PA-Series, runs VM-Series in a private VMware cloud, uses CN-Series to control traffic between namespaces in its Kubernetes clusters, and for a new AWS account where the team does not want to manage firewall instances it subscribes to Cloud NGFW for AWS through the marketplace and manages the rulestack as code.",
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
   ],
   [
    "Who is responsible for scaling and HA of VM-Series firewalls in a public cloud?",
    "The customer, often using cloud load balancers and automation."
   ]
  ]
 },
 {
  "t": "Strata Cloud Manager and cloud-delivered management",
  "body": [
   "Strata Cloud Manager (SCM) is Palo Alto's cloud-delivered management platform for network security. Instead of installing Panorama as an appliance or virtual machine, you manage next-generation firewalls (NGFWs) and Prisma Access from a web console hosted by Palo Alto. It brings configuration, visibility and AI-driven operations together in one place, and because it is a cloud service there is no management server for you to size, patch or back up.",
   "Configuration in SCM uses a different model from Panorama's device groups and templates. Folders organize firewalls hierarchically; configuration applied at a higher folder is inherited by the folders and devices beneath it, similar to device group inheritance. Snippets are reusable, named sets of configuration, such as a standard set of security profiles or a DNS and NTP baseline, that you associate with folders or devices. Configuration that genuinely differs per device can be set at the device level, and variables handle values such as addresses that change from site to site. Like Panorama, you edit a candidate and then push the configuration to devices, reviewing the changes before they deploy.",
   "Onboarding a firewall to cloud management requires the device to be registered to your customer support account, licensed for cloud management, and able to reach the cloud service; the firewall authenticates with a device certificate. Logs flow to Strata Logging Service, which SCM uses for visibility and reporting. This is why cloud management and cloud logging usually go together, and why outbound connectivity from the firewall's management plane, including any service routes, must be planned before onboarding.",
   "Beyond configuration, SCM includes operational features that grew out of AIOps for NGFW. These include best practice assessments that score your configuration against Palo Alto recommendations, continuous checks that warn about risky policy changes before or after you push them, health monitoring and predictive alerts about capacity, and dashboards and a command center summarizing threats, users and applications across the fleet. Many organizations also use SCM to gain these insights for firewalls still managed by Panorama, through Panorama's integration with the cloud.",
   "When should you choose SCM versus Panorama? SCM suits organizations that want no management infrastructure to host, that also use Prisma Access, or that want unified cloud visibility across the fleet. Panorama suits environments that must keep management on premises, including isolated or regulated networks without reliable Internet, and it remains the manager for some integrations. They are not mutually exclusive during migrations, and a common path is to connect an existing Panorama to the cloud first for insights, then move folders of firewalls to SCM once the team is comfortable with the new model. Map the concepts: Panorama device groups correspond broadly to SCM folders for policy inheritance, and reusable template configuration corresponds to snippets.",
   "Consider a worked example. A fast-growing company has 20 branch firewalls and Prisma Access for remote users but no data center to host Panorama. It registers the firewalls to its support account, activates cloud management and Strata Logging Service licenses, and onboards the devices to SCM. The firewalls are organized into a Branches folder under the global folder, a snippet holds the standard security profile group and DNS and NTP settings, and per-branch addresses are set as variables. The team reviews the best practice assessment weekly and fixes the lowest-scoring rules first.",
   "Common mistakes: expecting Panorama terms such as templates and device groups in SCM, onboarding a firewall that cannot reach the cloud service or lacks the right license, forgetting that logs go to Strata Logging Service rather than local collectors, and choosing SCM for a site that is required to stay disconnected from the Internet. Avoid assuming a specific feature exists on every license tier; features and names in cloud services evolve, so confirm current documentation when you plan a deployment, and check which management platform supports each feature you rely on before moving firewalls.",
   "Exam questions tend to test the concepts. 'Cloud-delivered management with nothing to host' is Strata Cloud Manager. 'Hierarchy whose configuration is inherited' is a folder. 'Reusable named configuration block' is a snippet. 'Where do SCM-managed firewalls send logs?' is Strata Logging Service. 'Score configuration against recommendations' is a best practice assessment, and 'isolated network with no Internet' points to Panorama instead."
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
    "Strata Logging Service",
    "The cloud log service that SCM-managed firewalls forward logs to for visibility and reporting."
   ],
   [
    "Best practice assessment",
    "An evaluation of configuration against Palo Alto recommendations with scores and remediation advice."
   ],
   [
    "AIOps",
    "AI-driven operations features that predict health and capacity problems and flag risky configuration."
   ]
  ],
  "example": "A fast-growing startup has 20 branch firewalls and Prisma Access for remote users but no data center to host Panorama. It onboards the firewalls to Strata Cloud Manager, organizes them into a Branches folder with a snippet holding standard security profiles, forwards logs to Strata Logging Service, and reviews the best practice assessment weekly to fix the weakest rules first.",
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
   ],
   [
    "What does a firewall need before it can be onboarded to SCM?",
    "Registration to the support account, the required cloud management license, a device certificate and connectivity to the cloud service."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
