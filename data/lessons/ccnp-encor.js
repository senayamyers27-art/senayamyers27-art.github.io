/* Lessons for Cisco CCNP Enterprise core exam (ENCOR) (350-401 v1.2): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ccnp-encor", [
 {
  "t": "Enterprise design: two-tier (collapsed core) and three-tier campus, fabric/spine-leaf, cloud vs on-premises",
  "body": [
   "Enterprise network design is about arranging switches and routers into layers so the network is predictable, easy to grow and quick to recover from failures. Cisco's classic campus model uses three logical layers: access, distribution and core. ENCOR expects you to know what each layer does, when you can merge layers, and how data center and cloud designs differ from the campus.",
   "The access layer is where users, phones, access points and printers connect. It provides port density, Power over Ethernet (PoE), VLAN assignment and edge security features such as port security, 802.1X and DHCP snooping. The distribution layer aggregates many access switches. It is the natural boundary between Layer 2 and Layer 3: it usually hosts the default gateways (with a first hop redundancy protocol), summarizes routes toward the core and applies policy such as access control lists (ACLs) and quality of service (QoS). The core layer is the high-speed backbone that connects distribution blocks, the data center and the WAN edge. The core should do as little as possible other than forward packets quickly and converge fast, so you avoid heavy policy there.",
   "A three-tier design makes sense for a large campus with several buildings, where many distribution blocks need a common backbone. Without a core, every distribution pair would need links to every other pair, which grows as a full mesh and becomes hard to manage. A two-tier design, also called a collapsed core, merges the core and distribution functions into one pair of switches. It fits a single building or a smaller campus, costs less and has fewer hops. The trade-off is scale: when you add more buildings, a dedicated core becomes worth it.",
   "Modern campus designs push Layer 3 closer to the edge. In a routed access design, the access switches run a routing protocol toward the distribution layer, so there are no Layer 2 loops between access and distribution, spanning tree is confined to each access switch, and convergence depends on routing rather than spanning tree timers. The trade-off is that a VLAN can no longer span several access switches.",
   "Data centers usually use a spine-leaf (Clos) fabric instead. Every leaf switch connects to every spine switch, and spines do not connect to each other, nor do leaves. Servers attach to leaves. Any server is always exactly two hops from any other (leaf to spine to leaf), which gives predictable latency and lots of equal-cost paths for east-west traffic between servers. You scale bandwidth by adding spines and scale ports by adding leaves. Overlays such as VXLAN usually run on top of a routed spine-leaf underlay.",
   "Finally, ENCOR asks you to compare on-premises and cloud deployments. On-premises means you buy, house and operate the hardware: you get full control, predictable costs after purchase and data locality, but you carry capital expense, capacity planning and hardware refresh. Cloud (public infrastructure as a service, platform or software as a service) shifts spending to operating expense, lets you scale up and down quickly and removes hardware management, but adds dependence on WAN or internet connectivity, less control over the underlying platform, and ongoing usage-based cost. Many enterprises end up hybrid, with some workloads in each."
  ],
  "terms": [
   [
    "Access layer",
    "The layer where endpoints connect; provides port density, PoE, VLAN assignment and edge security."
   ],
   [
    "Distribution layer",
    "Aggregates access switches, usually hosts default gateways, and applies policy and route summarization."
   ],
   [
    "Core layer",
    "The high-speed backbone joining distribution blocks, designed for fast forwarding and fast convergence."
   ],
   [
    "Collapsed core",
    "A two-tier design where one pair of switches performs both core and distribution roles."
   ],
   [
    "Spine-leaf",
    "A data center topology where every leaf connects to every spine, giving equal-cost, two-hop paths between servers."
   ]
  ],
  "example": "A company with one office building uses a pair of Catalyst switches as a collapsed core, with access switches in each wiring closet uplinked to both. When it opens two more buildings on the same campus, it adds a dedicated core pair so each building's distribution pair needs only two uplinks to the core instead of links to every other building.",
  "tip": "If a question describes predictable latency for east-west server traffic and every leaf connecting to every spine, the answer is spine-leaf. If it describes a small site merging core and distribution, it is a two-tier collapsed core.",
  "check": [
   [
    "Why does a large campus add a dedicated core layer instead of connecting every distribution pair directly?",
    "Directly meshing distribution blocks grows as a full mesh and becomes costly and hard to manage; a core gives every block a small, fixed number of uplinks to a common backbone."
   ],
   [
    "In a spine-leaf fabric, how many switch hops separate servers on two different leaves?",
    "Two hops across the fabric, leaf to spine to leaf, because every leaf connects to every spine."
   ],
   [
    "Name one advantage and one drawback of public cloud compared with on-premises.",
    "Advantage: fast elastic scaling with operating rather than capital expense. Drawback: less control over the platform and dependence on connectivity, plus ongoing usage costs."
   ]
  ]
 },
 {
  "t": "High availability: redundancy, first hop redundancy protocols, stateful switchover (SSO)",
  "body": [
   "High availability (HA) means designing the network so that a single failure, such as a dead link, a failed supervisor or a crashed gateway, causes little or no disruption. You get there with redundancy at several levels: redundant links, redundant devices, redundant components inside a device, and protocols that fail over quickly between them.",
   "Link and device redundancy is the foundation. Access switches uplink to two distribution switches, distribution switches connect to two core switches, and critical servers are dual-homed. EtherChannel bundles several physical links into one logical link so losing one member does not change the topology. Redundant paths only help if something decides quickly which path to use, which is the job of spanning tree at Layer 2 and routing protocols at Layer 3.",
   "Endpoints are the weak spot. A PC is configured with a single default gateway IP address and has no routing protocol to discover an alternative. First hop redundancy protocols (FHRPs) solve this by letting two or more routers share a virtual IP address and a virtual MAC address. Hosts use the virtual IP as their gateway. One router actively forwards traffic for it; if that router fails, another takes over the same virtual addresses and the hosts never notice. Hot Standby Router Protocol (HSRP) is Cisco proprietary and uses one active and one standby router. Virtual Router Redundancy Protocol (VRRP) is an open standard with one master and one or more backups. Gateway Load Balancing Protocol (GLBP) is Cisco proprietary and lets several routers forward at once by handing out different virtual MAC addresses to different hosts. Features such as priority, preemption and interface or object tracking let you control which router is active and move the role if an uplink fails.",
   "Inside a chassis switch or router with two route processors or supervisors, you also need redundancy. Stateful switchover (SSO) keeps the standby supervisor synchronized with the active one: configuration, and state information such as interface and Layer 2 protocol state. If the active supervisor fails, the standby takes over without resetting line cards, so forwarding in hardware continues. SSO on its own does not preserve routing protocol adjacencies; the new supervisor must rebuild them. That is why SSO is paired with Nonstop Forwarding (NSF), which lets the device keep forwarding using the existing forwarding table while graceful restart helpers (the neighbors) keep their adjacencies and routes in place during the rebuild.",
   "Stacking and virtual switching add another layer. Catalyst switch stacks and StackWise Virtual let two or more physical switches act as one logical switch, with one control plane and SSO between members. Neighbors can then use a multichassis EtherChannel to both physical switches, removing spanning tree blocked links.",
   "When you design HA, remember that more redundancy adds complexity. Too many parallel paths can slow convergence and make troubleshooting harder. The usual guidance is two of everything at each layer, with fast, deterministic failover."
  ],
  "terms": [
   [
    "FHRP",
    "First hop redundancy protocol: lets several routers share a virtual gateway IP and MAC so hosts survive a gateway failure."
   ],
   [
    "HSRP",
    "Hot Standby Router Protocol, a Cisco FHRP with one active and one standby router per group."
   ],
   [
    "VRRP",
    "Virtual Router Redundancy Protocol, an open-standard FHRP with a master and backups."
   ],
   [
    "SSO",
    "Stateful switchover: the standby supervisor stays synchronized and takes over without resetting line cards."
   ],
   [
    "NSF",
    "Nonstop Forwarding: keeps forwarding packets using existing forwarding tables while routing protocols reconverge after a switchover."
   ]
  ],
  "example": "A distribution pair runs HSRP for each user VLAN, with switch A at priority 110 and preemption enabled and tracking its core uplink. When A's uplink fails, tracking lowers its priority below B's, B becomes active, and users keep using the same gateway address without noticing.",
  "tip": "SSO alone does not keep routing adjacencies up. Pair SSO with NSF (and graceful restart on neighbors) to keep forwarding during a supervisor failover.",
  "check": [
   [
    "Why do hosts need an FHRP when the network already has two gateway routers?",
    "Hosts have a single statically configured or DHCP-assigned gateway and cannot detect its failure; an FHRP presents one virtual IP and MAC that another router takes over."
   ],
   [
    "Which FHRP lets several routers forward traffic for the same group at the same time?",
    "GLBP, by assigning different virtual MAC addresses to different hosts."
   ],
   [
    "What does SSO synchronize to the standby supervisor?",
    "Configuration and state information, so the standby can take over without resetting line cards; NSF is added so forwarding continues while routing protocols rebuild."
   ]
  ]
 },
 {
  "t": "SD-WAN control and data plane: Manager, Validator, Controllers, WAN Edges, OMP and IPsec tunnels",
  "body": [
   "Cisco Catalyst SD-WAN (formerly Viptela) separates the WAN into distinct planes, each handled by a different component. This separation is what lets you manage hundreds of branch routers as one fabric from a single dashboard. ENCOR expects you to name each component, its plane and what it does. Cisco renamed the components; you will see both the old and new names.",
   "The management plane is SD-WAN Manager (formerly vManage). It is the graphical interface and API endpoint where you build device templates or configuration groups, define policies, push software upgrades and view monitoring data. It does not forward user traffic.",
   "The orchestration plane is SD-WAN Validator (formerly vBond). It is the first point of contact for a new or rebooting WAN Edge. The Validator authenticates the device, tells it where the Controllers and Manager are, and helps devices behind Network Address Translation (NAT) discover their public addresses so tunnels can form. It needs a publicly reachable address for that reason.",
   "The control plane is SD-WAN Controller (formerly vSmart). WAN Edges build secure Datagram Transport Layer Security (DTLS) or Transport Layer Security (TLS) control connections to the Controllers and exchange routing information with them using the Overlay Management Protocol (OMP). OMP runs only between WAN Edges and Controllers, much like a BGP route reflector: Edges advertise their service-side prefixes (OMP routes), their transport endpoints (TLOC routes, for transport locators, which identify a WAN interface by system IP, color and encapsulation) and service routes. The Controller applies centralized control policy, for example to build hub-and-spoke topologies, and reflects the results to other Edges. OMP also distributes the keys that Edges use for data plane encryption, so Edges do not need to run a key exchange with every peer.",
   "The data plane is the WAN Edge routers (formerly vEdge or cEdge). They sit at branches, campuses and data centers, connect to one or more transports such as MPLS, broadband internet or LTE, and build IPsec tunnels directly to each other across those transports. Each transport interface is identified by a color such as mpls, biz-internet or lte. Bidirectional Forwarding Detection (BFD) runs inside each tunnel to measure loss, latency and jitter and to detect failures, which feeds application-aware routing.",
   "An important design point: if the Controllers become unreachable, existing IPsec tunnels and forwarding keep working for a while using the last known routes and keys, because the data plane is independent of the control plane. Losing the Manager affects only management and monitoring, not forwarding."
  ],
  "terms": [
   [
    "SD-WAN Manager (vManage)",
    "The management plane: GUI, templates, policy definition, monitoring and REST API."
   ],
   [
    "SD-WAN Validator (vBond)",
    "The orchestration plane: authenticates WAN Edges, points them to controllers and assists NAT traversal."
   ],
   [
    "SD-WAN Controller (vSmart)",
    "The control plane: runs OMP with WAN Edges, applies control policy and distributes routes and keys."
   ],
   [
    "OMP",
    "Overlay Management Protocol, the routing protocol between WAN Edges and Controllers carrying OMP, TLOC and service routes."
   ],
   [
    "TLOC",
    "Transport locator: identifies a WAN Edge transport attachment by system IP, color and encapsulation."
   ]
  ],
  "example": "A new branch router boots with only a basic bootstrap configuration. It contacts the Validator, is authenticated by its certificate and serial number, learns the Controller and Manager addresses, downloads its configuration from the Manager, forms OMP sessions with two Controllers, and then builds IPsec tunnels to the data center over both its MPLS and internet colors.",
  "tip": "Match the component to the plane: Manager is management, Validator is orchestration, Controller is control (OMP), WAN Edge is data (IPsec plus BFD). OMP never runs directly between two WAN Edges.",
  "check": [
   [
    "Which SD-WAN component does a WAN Edge contact first when it comes online?",
    "The Validator (vBond), which authenticates it and tells it how to reach the Controllers and Manager."
   ],
   [
    "What three kinds of routes does OMP carry?",
    "OMP routes (service-side prefixes), TLOC routes (transport endpoints) and service routes."
   ],
   [
    "What happens to user traffic if the SD-WAN Manager fails?",
    "Forwarding continues; only management, configuration changes and monitoring are affected, because the Manager is not in the data or control plane."
   ]
  ]
 },
 {
  "t": "SD-WAN benefits and limitations compared with traditional WAN",
  "body": [
   "A traditional enterprise WAN typically connects branches to a data center over private circuits such as MPLS (Multiprotocol Label Switching) Layer 3 VPNs or leased lines. Each branch router is configured individually through the command line. Internet access is often backhauled through the data center so it can be inspected centrally. This works, but it is expensive, slow to change and poorly suited to cloud applications.",
   "SD-WAN (software-defined WAN) changes the model in several ways. It is transport independent: a branch can use MPLS, business broadband, LTE or 5G interchangeably, and the fabric builds encrypted IPsec tunnels over all of them. This lets you replace or supplement expensive private circuits with cheaper internet links and use all links actively rather than keeping one idle as a backup.",
   "Centralized management is the second big benefit. You define configuration templates and policies once in SD-WAN Manager and apply them to hundreds of sites. Zero-touch provisioning lets a router shipped to a branch contact the orchestrator and pull its configuration without an engineer on site. Change becomes faster and more consistent.",
   "Application-aware routing is the third. Because BFD continuously measures loss, latency and jitter on every tunnel, you can write service-level agreement (SLA) policies such as 'send voice over any path with less than a set latency and loss; if MPLS degrades, move it to broadband.' A traditional WAN routing protocol picks paths by metric, not by live application quality. SD-WAN can also break out Software as a Service (SaaS) traffic directly to the internet at the branch, with cloud security in the path, instead of hairpinning it through the data center, which improves performance for cloud applications.",
   "Security is built in: all overlay traffic is encrypted with IPsec, devices authenticate with certificates, and segmentation with VPNs (VRFs in the overlay) keeps, for example, guest, corporate and payment traffic apart end to end.",
   "There are limitations and trade-offs. Internet transports offer no end-to-end SLA from a provider, so quality depends on your policy and path diversity. IPsec and SD-WAN headers add overhead, which can matter for MTU and small links. The solution depends on controllers and orchestration, so you must design for their availability and certificate lifecycle. Licensing and subscription costs replace some circuit costs. Operations staff need new skills and tools, and migrations must coexist with legacy routing for a period. Finally, direct internet access at every branch expands the attack surface unless you pair it with firewalling or cloud security."
  ],
  "terms": [
   [
    "Transport independence",
    "The ability of the SD-WAN overlay to run over any mix of MPLS, broadband, LTE or 5G links."
   ],
   [
    "Application-aware routing",
    "Choosing a path per application based on measured loss, latency and jitter against an SLA policy."
   ],
   [
    "Zero-touch provisioning",
    "Automatic onboarding where a new device contacts the orchestrator and downloads its configuration without manual setup."
   ],
   [
    "Direct internet access",
    "Sending internet or SaaS traffic straight out of the branch instead of backhauling it through the data center."
   ]
  ],
  "example": "A retailer with 300 stores replaces its single MPLS circuit per store with MPLS plus broadband under SD-WAN. Point-of-sale traffic stays on MPLS unless its latency or loss exceeds the SLA, while Microsoft 365 traffic leaves directly over broadband through a cloud security service, relieving the congested data center internet link.",
  "tip": "Exam answers favor SD-WAN for active use of multiple transports, centralized policy, SLA-based path choice and cloud breakout. Watch for distractors claiming SD-WAN guarantees internet performance; it measures and steers but cannot guarantee a provider's network.",
  "check": [
   [
    "How does SD-WAN decide that voice should move from MPLS to broadband?",
    "BFD probes in each tunnel measure loss, latency and jitter; when MPLS violates the SLA class in the application-aware routing policy, traffic moves to a compliant path."
   ],
   [
    "Give two limitations of SD-WAN compared with a traditional MPLS WAN.",
    "Internet transports have no provider SLA, and encryption overhead plus controller and licensing dependencies add complexity and cost."
   ]
  ]
 },
 {
  "t": "SD-Access: control plane (LISP), data plane (VXLAN), policy plane (TrustSec), fabric node roles",
  "body": [
   "Cisco SD-Access is the campus fabric solution managed by Catalyst Center (formerly DNA Center). Instead of stretching VLANs across the campus and relying on spanning tree, SD-Access builds a routed underlay and an overlay fabric on top of it. Each plane of the fabric uses a specific protocol, and ENCOR expects you to match them.",
   "The control plane uses LISP (Locator/ID Separation Protocol). LISP splits an endpoint's identity (its IP or MAC address, called the EID or endpoint identifier) from its location (the loopback address of the switch it is attached to, called the RLOC or routing locator). When an endpoint connects, the edge switch registers the EID-to-RLOC mapping with the control plane node, which acts as a LISP map server and map resolver. When another switch needs to reach that endpoint, it asks the control plane node where it lives instead of flooding. Endpoints can move between switches and keep their IP address, because only the mapping changes.",
   "The data plane uses VXLAN (Virtual Extensible LAN). Traffic between fabric switches is encapsulated in VXLAN over UDP, carried across the routed underlay. SD-Access uses a variant often called VXLAN-GPO (group policy option), which adds a field to the VXLAN header to carry the source Scalable Group Tag. The VXLAN network identifier (VNI) keeps virtual networks (which map to VRFs) separate.",
   "The policy plane uses Cisco TrustSec. Users and devices are classified into Scalable Groups (for example Employees, Contractors, Cameras) usually by Cisco Identity Services Engine (ISE) during authentication. Each group has a Scalable Group Tag (SGT) that travels with the packet in the VXLAN header. Group-based access policies, enforced as SGACLs (scalable group ACLs) at the egress edge, decide which groups can talk. This gives two levels of segmentation: macro-segmentation between virtual networks (VRFs) and micro-segmentation between groups inside a virtual network.",
   "The fabric node roles are: the control plane node, which runs the LISP map server and map resolver; the edge node, the access switch where endpoints connect, which registers endpoints and acts as the anycast default gateway for its subnets; the border node, which connects the fabric to outside networks, with internal borders for known networks such as the data center and external borders as the default exit, often the internet; intermediate nodes, underlay switches that simply route IP packets and are unaware of the fabric; and the fabric wireless controller with fabric-mode access points, which integrate wireless into the same fabric. Catalyst Center is the management and automation platform and ISE is the policy and identity platform. Border and control plane functions are often co-located on the same pair of switches."
  ],
  "terms": [
   [
    "EID",
    "Endpoint identifier: the IP or MAC address that identifies an endpoint in LISP."
   ],
   [
    "RLOC",
    "Routing locator: the underlay address (usually a loopback) of the fabric node where an endpoint is attached."
   ],
   [
    "Edge node",
    "The fabric access switch that connects endpoints, registers them with the control plane node and acts as their anycast gateway."
   ],
   [
    "Border node",
    "The fabric node that connects the SD-Access fabric to external networks such as the data center, WAN or internet."
   ],
   [
    "SGT",
    "Scalable Group Tag: a 16-bit group identifier assigned to a user or device and used for group-based policy."
   ]
  ],
  "example": "A laptop in the Contractors group moves from building 1 to building 3. The new edge node registers the laptop's EID with the control plane node against its own RLOC. Other edges query the control plane node, send VXLAN traffic to the new location, and the Contractors SGT in each packet still blocks access to the Finance group servers.",
  "tip": "Memorize the triad: control plane LISP, data plane VXLAN, policy plane TrustSec (SGT). Intermediate nodes are the only fabric role that knows nothing about the overlay.",
  "check": [
   [
    "Which SD-Access node role runs the LISP map server and map resolver?",
    "The control plane node."
   ],
   [
    "How does the SGT reach the enforcement point in SD-Access?",
    "It is carried inline in the VXLAN-GPO header from the ingress edge node to the egress node, which enforces the SGACL."
   ],
   [
    "What is the difference between macro- and micro-segmentation in SD-Access?",
    "Macro-segmentation separates virtual networks (VRFs); micro-segmentation uses SGTs to control traffic between groups within the same virtual network."
   ]
  ]
 },
 {
  "t": "Traditional campus vs SD-Access: underlay and overlay, group-based policy from Catalyst Center",
  "body": [
   "In a traditional campus, segmentation and policy are tied to network topology. You create VLANs, map each VLAN to a subnet and default gateway, and write IP-based access control lists to control traffic between subnets. If you want a user group available in several buildings, you stretch VLANs across trunks, which brings spanning tree, broadcast domains that grow and larger failure domains. Every switch is configured by hand, and ACLs grow into long lists of addresses that must change whenever addressing changes.",
   "SD-Access separates the network into an underlay and an overlay. The underlay is the physical network of switches and links running a simple routed design, typically IS-IS (Intermediate System to Intermediate System) when Catalyst Center builds it through LAN automation, though OSPF or another IGP can be used in a manually built underlay. Its only job is to provide reachability between the loopback addresses (RLOCs) of fabric nodes. There is no spanning tree between switches because every link is routed.",
   "The overlay is the virtual network built on top, with LISP as control plane and VXLAN tunnels between fabric nodes. Endpoints sit in virtual networks that correspond to VRFs, and within each virtual network, subnets can exist on every edge switch at once with the same anycast gateway IP and MAC. A user gets the same subnet and policy in any building without stretching Layer 2 across the campus. Because it is an overlay, you can change segmentation without touching the physical design.",
   "Policy in SD-Access is group-based rather than address-based. Catalyst Center, integrated with Cisco ISE, lets you define Scalable Groups (such as Employees, Guests, IoT Cameras, PCI Servers) and draw a policy matrix of which groups may talk to which, and with what contract (permit, deny or a specific set of ports). When a user authenticates with 802.1X or MAB, ISE assigns the SGT. The policy follows the user regardless of IP address or location, and the matrix stays small even as the network grows.",
   "Catalyst Center organizes the work into workflows often described as design, policy, provision and assurance. In design you set up sites, IP pools and network settings. In policy you define virtual networks and group-based access. In provision you assign devices to sites and fabric roles and push configuration. In assurance you monitor health and troubleshoot. This is the intent-based model: you describe what you want, and the controller renders device configuration.",
   "The trade-offs: SD-Access needs supported hardware, licensing, Catalyst Center and usually ISE, and staff must learn fabric troubleshooting. A traditional campus is simpler to understand and works on almost any switch, but it is slower to change and harder to segment consistently."
  ],
  "terms": [
   [
    "Underlay",
    "The physical routed network that provides IP reachability between fabric node loopbacks."
   ],
   [
    "Overlay",
    "The virtual network (LISP plus VXLAN) built on the underlay that carries endpoint traffic and segmentation."
   ],
   [
    "Anycast gateway",
    "The same default gateway IP and MAC configured on every edge node for a subnet, so hosts keep their gateway anywhere."
   ],
   [
    "Group-based policy",
    "Access rules written between scalable groups (SGTs) instead of IP addresses."
   ],
   [
    "Virtual network",
    "An SD-Access macro-segment that maps to a VRF in the fabric."
   ]
  ],
  "example": "A hospital needs infusion pumps in every ward isolated from guest devices. In the traditional design this meant an IoT VLAN trunked to every closet and ACLs on every distribution switch. With SD-Access the pumps authenticate by MAB, ISE assigns the Medical-Devices SGT, and a single row in the Catalyst Center policy matrix blocks Guests from Medical-Devices everywhere.",
  "tip": "Underlay equals physical routed reachability between fabric nodes; overlay equals the virtual tunnels carrying user traffic. Questions about avoiding stretched VLANs and spanning tree point to the SD-Access routed underlay.",
  "check": [
   [
    "Which routing protocol does Catalyst Center LAN automation use to build the SD-Access underlay?",
    "IS-IS."
   ],
   [
    "Why does group-based policy scale better than IP ACLs?",
    "Rules are written between a small number of groups, and the policy follows the user's SGT regardless of IP address or location, so addressing changes do not require rule changes."
   ]
  ]
 },
 {
  "t": "QoS components: classification and marking (DSCP, CoS), policing, shaping, queuing (CBWFQ, LLQ), WRED",
  "body": [
   "Quality of service (QoS) is a set of tools that decide which traffic gets priority when a link is congested. It cannot create bandwidth, but it can make sure voice and video, which are sensitive to delay, jitter and loss, get served before bulk transfers. ENCOR focuses on the building blocks and on the difference between them.",
   "Classification identifies traffic, for example by ACL, by protocol using NBAR (Network-Based Application Recognition), or by an existing marking. Marking writes a value into the packet so later devices can classify it quickly. At Layer 2, the 802.1Q tag has a 3-bit Class of Service (CoS) field, values 0 to 7, which exists only on trunk links. At Layer 3, the IP header's 6-bit DSCP (Differentiated Services Code Point) field gives values 0 to 63 and survives across routed hops. Common DSCP markings are EF (Expedited Forwarding, decimal 46) for voice, AF classes (Assured Forwarding, such as AF41 for interactive video) with drop precedence, CS (class selector) values for backward compatibility with IP precedence, and default (0) for best effort. You establish a trust boundary: the point in the network, ideally the access port or IP phone, where markings are either trusted or rewritten.",
   "Policing and shaping both enforce a rate. A policer measures traffic against a rate and drops or re-marks the excess immediately; it does not buffer, so it causes no delay but can cause TCP retransmissions. It can be applied inbound or outbound, and service providers use it to enforce contracts. A shaper buffers excess traffic and sends it later, smoothing bursts to the target rate. It adds delay but avoids drops, and applies outbound only. A typical use is shaping a branch interface to the provider's contracted rate so the provider's policer does not drop your traffic.",
   "Queuing decides the order in which packets leave an interface during congestion. Class-Based Weighted Fair Queuing (CBWFQ) lets you define classes and give each a guaranteed minimum bandwidth. Low Latency Queuing (LLQ) adds a strict-priority queue to CBWFQ: traffic in the priority class is always sent first, which is ideal for voice. The priority queue is implicitly policed to its configured rate during congestion so it cannot starve other classes.",
   "Congestion avoidance prevents queues from filling completely. When a queue is full, tail drop discards every new arrival, which can cause many TCP flows to slow down at once and then speed up together (global synchronization). Weighted Random Early Detection (WRED) randomly drops some packets before the queue is full, with higher drop probability for lower-priority markings such as higher AF drop precedence. TCP senders back off gradually and the queue stays healthier.",
   "In Cisco IOS these tools are configured with the Modular QoS CLI (MQC): a `class-map` to classify, a `policy-map` to define actions per class, and `service-policy input|output` to apply it to an interface."
  ],
  "terms": [
   [
    "DSCP",
    "Differentiated Services Code Point: a 6-bit Layer 3 marking in the IP header, values 0 to 63."
   ],
   [
    "CoS",
    "Class of Service: a 3-bit Layer 2 priority in the 802.1Q tag, values 0 to 7, present only on tagged links."
   ],
   [
    "Policing",
    "Enforcing a rate by dropping or re-marking excess traffic without buffering."
   ],
   [
    "Shaping",
    "Enforcing a rate by buffering excess traffic and sending it later, outbound only."
   ],
   [
    "LLQ",
    "Low Latency Queuing: CBWFQ plus a strict-priority queue, typically for voice."
   ],
   [
    "WRED",
    "Weighted Random Early Detection: drops packets early and selectively by marking to avoid tail drop and TCP global synchronization."
   ]
  ],
  "example": "A branch has a 100 Mbps circuit on a gigabit interface, and the provider polices at 100 Mbps. The engineer applies an outbound shaper at 100 Mbps with a child policy: voice marked EF in an LLQ priority class, video AF41 with a bandwidth guarantee, and WRED on the default class. Calls stay clear during large file uploads.",
  "tip": "Policing drops (no delay, both directions); shaping buffers (adds delay, outbound only). CoS lives in the 802.1Q tag and disappears on untagged or routed hops; DSCP survives end to end.",
  "check": [
   [
    "Why is LLQ preferred over plain CBWFQ for voice?",
    "LLQ adds a strict-priority queue that is always serviced first, minimizing delay and jitter, while its implicit policer prevents voice from starving other classes."
   ],
   [
    "What problem does WRED address that tail drop causes?",
    "TCP global synchronization, where many flows lose packets at once, back off together and then ramp up together."
   ],
   [
    "What decimal DSCP value is EF and what traffic uses it?",
    "46, used for voice bearer traffic."
   ]
  ]
 },
 {
  "t": "Hardware and software switching: process switching, CEF, FIB, RIB, adjacency table",
  "body": [
   "A router has to make a forwarding decision for every packet: look up the destination, pick an outgoing interface and next hop, rewrite the Layer 2 header and send it. How that decision is made determines how fast the device can forward. Cisco devices have used three generations of switching methods, and ENCOR expects you to know how they differ and which tables are involved.",
   "Process switching is the oldest and slowest method. Each packet is handed to the main CPU, which runs a process that looks up the destination in the routing table, resolves the next hop's Layer 2 address and rewrites the frame. Every packet repeats the whole lookup. Today, process switching is used only for traffic that cannot be handled any other way, such as packets addressed to the router itself or packets needing special handling.",
   "Fast switching improved on this with a route cache: the first packet to a destination was process switched, and the result was cached so later packets to the same destination used the cache. The weakness was that the cache was built on demand and had to be invalidated when routes changed, so a burst of new destinations could still overwhelm the CPU.",
   "Cisco Express Forwarding (CEF) is the current method and is enabled by default. CEF builds its tables in advance from the control plane rather than on demand. The routing protocols and static routes populate the RIB (Routing Information Base, the routing table you see with `show ip route`). From the RIB, CEF builds the FIB (Forwarding Information Base), a copy of the best routes optimized for fast lookup, with recursive next hops already resolved. Separately, CEF builds the adjacency table from ARP (IPv4) and neighbor discovery (IPv6), holding the prebuilt Layer 2 rewrite header for each directly connected next hop. A FIB entry points to an adjacency, so forwarding is a single longest-match lookup followed by a header rewrite. Because the tables are prebuilt, the first packet to a destination is forwarded as quickly as the thousandth.",
   "On platforms with dedicated forwarding hardware, such as Catalyst switches, the FIB and adjacency information are programmed into ASICs (application-specific integrated circuits) and TCAM, so forwarding happens entirely in hardware without the CPU. This is often called hardware switching, and the CPU-based versions are called software switching. On software routers, CEF runs in software on the CPU but is still far faster than process switching.",
   "Some adjacency entries are special. A glean adjacency means the destination is on a connected subnet but ARP has not resolved it yet, so the packet is sent to the CPU to trigger ARP. A punt adjacency sends packets to the CPU for features CEF cannot handle. Drop and null adjacencies discard traffic. You can inspect these tables with `show ip cef`, `show ip cef <prefix> detail` and `show adjacency detail`."
  ],
  "terms": [
   [
    "RIB",
    "Routing Information Base: the routing table built by routing protocols, static and connected routes."
   ],
   [
    "FIB",
    "Forwarding Information Base: CEF's lookup-optimized copy of the RIB's best routes with next hops resolved."
   ],
   [
    "Adjacency table",
    "CEF's table of directly connected next hops with prebuilt Layer 2 rewrite headers, built from ARP or ND."
   ],
   [
    "Process switching",
    "Forwarding each packet by a CPU process with a full routing table lookup; slowest method."
   ],
   [
    "CEF",
    "Cisco Express Forwarding: prebuilds the FIB and adjacency table so forwarding needs no per-destination CPU work."
   ]
  ],
  "example": "An engineer notices traffic to one server is slow. `show ip cef 10.20.30.40 detail` shows the correct next hop, but `show adjacency detail` reveals the next hop is in glean state because ARP is failing on that VLAN, sending packets to the CPU. Fixing the VLAN mismatch lets ARP resolve and traffic returns to hardware forwarding.",
  "tip": "The RIB is built by the control plane; the FIB and adjacency table are derived from it by CEF for the data plane. CEF tables are built before traffic arrives, unlike fast switching's demand-built route cache.",
  "check": [
   [
    "Where does CEF get the Layer 2 rewrite information for a next hop?",
    "From the adjacency table, which CEF builds from ARP (IPv4) or neighbor discovery (IPv6) entries."
   ],
   [
    "Why is CEF faster than fast switching for the first packet to a new destination?",
    "CEF's FIB and adjacency table are prebuilt from the RIB and ARP, while fast switching had to process switch the first packet to create a cache entry."
   ]
  ]
 },
 {
  "t": "CAM and TCAM tables and what each stores",
  "body": [
   "Switches forward at line rate because they perform lookups in special memory rather than searching tables in software. Two kinds of lookup memory matter for ENCOR: CAM and TCAM. Knowing what each holds explains why some features are fast and why switches can run out of resources.",
   "CAM (content addressable memory) is searched by content rather than by address. You give it a value and it returns where that value is stored in one lookup, regardless of table size. CAM performs exact matches only: the result is either a hit or a miss. That makes it ideal for the MAC address table, which is why the MAC address table is often called the CAM table. Each entry maps a MAC address and VLAN to an outgoing port. The switch learns entries from the source MAC of incoming frames and ages them out after a timer (300 seconds by default on Cisco switches). When a frame arrives, the switch looks up the destination MAC and VLAN; a hit sends it out one port, a miss causes flooding within the VLAN. You view it with `show mac address-table`.",
   "TCAM (ternary content addressable memory) adds a third state. Each bit in a TCAM entry can be matched as 0, 1 or 'don't care' (X). This works through a value and a mask for each entry, and lets a single lookup match ranges and prefixes rather than only exact values. TCAM is used for lookups where the longest or first match matters: the IP routing FIB (longest-prefix match, because a /24 route masks the last 8 bits as don't care), access control lists, QoS classification, policy-based routing and similar features. TCAM returns the first matching entry, so entries are ordered appropriately, for example longer prefixes before shorter ones, or ACL entries in configured order.",
   "Because TCAM is fast but expensive, power-hungry and limited in size, switches divide it into regions for different features. On many Catalyst platforms this allocation is controlled by an SDM (Switch Database Management) template, which trades space between, for example, unicast routes, MAC addresses and ACL entries. If a feature exhausts its TCAM space, the switch may fail to program new entries in hardware and log an error, and traffic that cannot be handled in hardware may be punted to the CPU or dropped, depending on platform. You can check utilization with platform-specific commands such as `show sdm prefer` or `show platform hardware ... resource` commands.",
   "A simple way to remember the difference: CAM answers 'is this exact value present?' and is used for Layer 2 MAC lookups; TCAM answers 'which is the first entry that matches this value when some bits do not matter?' and is used for Layer 3 routes, ACLs and QoS."
  ],
  "terms": [
   [
    "CAM",
    "Content addressable memory that returns a result for an exact match in a single lookup; used for the MAC address table."
   ],
   [
    "TCAM",
    "Ternary CAM whose bits can be 0, 1 or don't care; used for prefix and ACL lookups."
   ],
   [
    "MAC address table",
    "The table mapping MAC address and VLAN to a switch port, stored in CAM."
   ],
   [
    "SDM template",
    "A Catalyst setting that divides TCAM and other hardware resources among features."
   ]
  ],
  "example": "After a network team adds thousands of ACL entries for a new security policy on an access switch, some rules stop working and the log shows TCAM space warnings. Reviewing `show sdm prefer` shows the ACL region is full; they condense the ACL using object groups and summarized ranges so it fits in hardware.",
  "tip": "Exact match equals CAM (MAC addresses). Longest-prefix or masked match equals TCAM (routes, ACLs, QoS). The 'T' for ternary means the third value: don't care.",
  "check": [
   [
    "Why can't plain CAM hold the IP routing table efficiently?",
    "Routing needs longest-prefix matching with masked bits, and CAM supports only exact matches; TCAM's don't-care bits allow prefix matching in a single lookup."
   ],
   [
    "What does a switch do when the destination MAC of a frame is not in the CAM table?",
    "It floods the frame out all ports in that VLAN except the one it arrived on."
   ]
  ]
 },
 {
  "t": "Punted traffic and its effect on the control plane CPU",
  "body": [
   "A network device has several planes. The data plane forwards transit traffic, ideally in hardware. The control plane runs routing protocols, spanning tree and other processes that build forwarding tables. The management plane handles SSH, SNMP and similar access. The control and management planes run on the route processor CPU, which is far slower than the forwarding hardware. Punting is when the data plane hands a packet up to the CPU instead of forwarding it in hardware.",
   "Some punts are legitimate and necessary. Packets addressed to the device itself are punted: routing protocol hellos and updates (OSPF, EIGRP, BGP), SSH and SNMP sessions, and ping to the device's address. Other packets are punted because they need processing that the hardware cannot do. Common examples are packets with an expired TTL (time to live), which require the CPU to generate an ICMP time exceeded message, as traceroute relies on; packets with IP options set; traffic that needs ARP resolution (the glean adjacency); packets that must be fragmented because they exceed the egress MTU; traffic matched by features configured with logging, such as an ACL entry with the `log` keyword; and traffic whose TCAM entries could not be programmed because the table is full.",
   "Why this matters: the CPU has limited capacity. If too much traffic is punted, CPU utilization climbs toward 100 percent. The processes that keep the network running then starve: routing protocol hellos are missed and adjacencies drop, spanning tree BPDUs are not processed on time, which can cause loops, first hop redundancy protocols flap, and management access becomes slow or impossible. A single misconfiguration can take down a stable network this way. Attackers can deliberately cause punting, for example by flooding a router with packets aimed at its own addresses or packets with expiring TTLs, as a denial of service against the control plane.",
   "To diagnose punting, check CPU with `show processes cpu sorted` and `show processes cpu history`. High utilization in interrupt context (the second number in the 'CPU utilization for five seconds: X%/Y%' line) suggests traffic being handled by the CPU, while high process utilization points to a specific process. On Catalyst IOS XE platforms, commands such as `show platform software fed switch active punt cause summary` or a CPU packet capture can show which punt causes and queues are busy.",
   "Protections include Control Plane Policing (CoPP), which rate-limits traffic to the CPU by class; hardware rate limiters on many platforms; avoiding the `log` keyword on high-volume ACL entries; fixing MTU mismatches to reduce fragmentation; and ensuring TCAM is sized so features stay in hardware. The goal is that the CPU only sees traffic it genuinely needs to process, at a rate it can handle."
  ],
  "terms": [
   [
    "Punt",
    "Sending a packet from the hardware data plane up to the route processor CPU for software handling."
   ],
   [
    "Control plane",
    "The functions that build forwarding state, such as routing protocols and spanning tree, running on the CPU."
   ],
   [
    "Data plane",
    "The forwarding path that moves transit packets, ideally in hardware."
   ],
   [
    "CoPP",
    "Control Plane Policing: a QoS policy that rate-limits traffic destined to or punted to the CPU."
   ]
  ],
  "example": "After a change, a distribution switch shows 95 percent CPU and its OSPF neighbors flap. `show processes cpu sorted` shows high interrupt time, and punt statistics reveal a new ACL entry with the log keyword matching a busy backup flow. Removing the log keyword brings the traffic back into hardware and OSPF stabilizes.",
  "tip": "If a question links high CPU with flapping adjacencies, think punted traffic and protect with CoPP. TTL-expired packets, IP options, glean (ARP) and ACL logging are classic punt causes.",
  "check": [
   [
    "Name three kinds of transit traffic that are commonly punted to the CPU.",
    "Packets with TTL expiring (needing ICMP time exceeded), packets with IP options, and packets matching an ACL entry with the log keyword; also traffic needing ARP resolution or fragmentation."
   ],
   [
    "Why can excessive punting cause a routing outage?",
    "The CPU is saturated, so routing protocol hellos are not sent or processed in time, adjacencies time out and routes are withdrawn."
   ]
  ]
 },
 {
  "t": "Hypervisors: type 1 vs type 2, virtual machines and virtual switching",
  "body": [
   "Virtualization lets one physical server run many isolated operating systems. The software that makes this possible is the hypervisor, also called a virtual machine monitor. It divides the server's CPU, memory, storage and network interfaces among virtual machines (VMs), each of which believes it has its own hardware. Network engineers need this knowledge because many network functions, from firewalls to SD-WAN controllers to Catalyst Center components, now run as VMs, and because servers bring their own virtual switches into the network.",
   "A type 1 hypervisor, also called a bare-metal or native hypervisor, runs directly on the server hardware without a general-purpose operating system underneath. Examples are VMware ESXi, Microsoft Hyper-V, KVM (the Kernel-based Virtual Machine built into Linux) and Xen. Because it has direct access to hardware, it is efficient and is what data centers use for production. A type 2 hypervisor, also called a hosted hypervisor, runs as an application on top of a normal operating system such as Windows, macOS or Linux. Examples are VMware Workstation, VMware Fusion and Oracle VirtualBox. It is convenient for labs and desktops but has more overhead because every hardware access passes through the host operating system.",
   "A virtual machine consists of virtual hardware (vCPUs, virtual memory, virtual disks stored as files, and virtual NICs) plus a guest operating system and its applications. Each VM is isolated from the others, can run a different operating system, and can be moved, snapshotted or cloned as a set of files. Features such as live migration move a running VM between hosts with minimal interruption, which requires shared storage or storage migration and matching network connectivity on both hosts.",
   "VMs must communicate, so the hypervisor includes a virtual switch. A virtual switch is a software Layer 2 switch inside the host. Each VM's virtual NIC connects to a port on it, and the host's physical NICs act as uplinks to the physical network. Virtual switches support VLAN tagging, so a VM's port can be placed in a VLAN, and the uplink to the physical switch is typically an 802.1Q trunk carrying several VLANs. Traffic between two VMs on the same host and VLAN never touches the physical network. Examples include the VMware vSphere Standard Switch (configured per host), the vSphere Distributed Switch (managed centrally across many hosts), the Hyper-V virtual switch, and Open vSwitch on Linux.",
   "For the network engineer, the key design points are to configure the physical switch port facing a hypervisor as a trunk with the right allowed VLANs, to use link aggregation or the hypervisor's NIC teaming consistently on both sides, and to remember that some traffic is invisible to physical monitoring tools because it stays inside the host."
  ],
  "terms": [
   [
    "Hypervisor",
    "Software that creates and runs virtual machines by sharing physical hardware among them."
   ],
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor running directly on hardware, such as ESXi, Hyper-V or KVM."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor running as an application on a host operating system, such as VirtualBox or VMware Workstation."
   ],
   [
    "Virtual switch",
    "A software Layer 2 switch inside the hypervisor connecting virtual NICs to each other and to physical uplinks."
   ]
  ],
  "example": "A data center host running ESXi has two 25-gigabit NICs connected to two leaf switches as 802.1Q trunks. Web VMs sit in VLAN 110 and database VMs in VLAN 120 on the same distributed switch; web-to-web traffic stays inside the host, while web-to-database traffic goes up the trunk to the leaf switch for routing and firewall inspection.",
  "tip": "Type 1 runs on bare metal (production, data center); type 2 runs on a host OS (labs, desktops). The physical port facing a hypervisor is usually a trunk, not an access port.",
  "check": [
   [
    "Is KVM a type 1 or type 2 hypervisor, and why?",
    "Type 1, because it is part of the Linux kernel and runs VMs with direct hardware access rather than as an application on a separate host OS."
   ],
   [
    "Why might traffic between two VMs not appear in a SPAN session on the physical switch?",
    "If both VMs are on the same host and VLAN, the virtual switch forwards the traffic internally and it never reaches the physical switch."
   ]
  ]
 },
 {
  "t": "Containers compared with virtual machines",
  "body": [
   "Containers are another way to isolate applications, and they have become the standard way to package modern software, including many network tools and some Cisco applications. ENCOR asks you to understand how containers differ from virtual machines and when each fits.",
   "A virtual machine virtualizes hardware. The hypervisor presents virtual CPUs, memory and devices, and each VM runs its own complete guest operating system with its own kernel. That gives strong isolation and lets you run different operating systems side by side, for example Windows and Linux on the same host. The cost is size and start time: each VM carries a full operating system, typically gigabytes, and boots like a real computer.",
   "A container virtualizes the operating system instead. All containers on a host share the host's kernel. The container engine, such as Docker or containerd, uses kernel features (namespaces to give each container its own view of processes, network interfaces and file system, and control groups to limit CPU and memory) to isolate processes. A container image contains only the application and the libraries it needs, not a kernel, so images are small, often megabytes, and containers start in about the time it takes to start a process. You can run many more containers than VMs on the same hardware.",
   "The trade-offs follow directly. Because containers share the host kernel, they must be compatible with it: Linux containers need a Linux kernel. Isolation is weaker than a VM's, since a kernel vulnerability can affect every container on the host, so security practices such as running as non-root, minimal images and image scanning matter. VMs are better for running different operating systems, legacy applications and workloads that need strong isolation. Containers are better for microservices, fast scaling, consistent environments from a developer laptop to production, and automated deployment pipelines. In practice they are often combined: containers run inside VMs.",
   "When many containers run across many hosts, an orchestrator schedules them, restarts failed ones, scales them and connects them. Kubernetes is the most common. Container networking uses virtual interfaces and bridges on each host, and orchestrators add overlay networks so containers on different hosts can talk.",
   "Cisco network devices also host containers. Many Catalyst IOS XE switches and routers support application hosting, which lets you run a Docker container on the device, for example a monitoring agent or a troubleshooting tool, isolated from the IOS XE processes. Guest Shell is a built-in Linux container environment on IOS XE that lets you run Python scripts on the device."
  ],
  "terms": [
   [
    "Container",
    "An isolated process environment that shares the host operating system kernel and packages an application with its dependencies."
   ],
   [
    "Container image",
    "A portable, layered package of an application and its libraries used to start containers."
   ],
   [
    "Namespaces and cgroups",
    "Linux kernel features that isolate a container's view of the system and limit its resource use."
   ],
   [
    "Kubernetes",
    "A container orchestration platform that schedules, scales and heals containers across a cluster of hosts."
   ]
  ],
  "example": "A network team packages its configuration backup script with Python and its libraries into a small container image. It runs identically on a laptop, a Linux server and a Kubernetes cluster, and it starts in about a second each night, whereas the old approach needed a dedicated VM that took minutes to boot and patch.",
  "tip": "The core distinction is the kernel: every VM has its own guest OS kernel; containers share the host kernel. That is why containers are lighter and faster but less isolated and must match the host OS family.",
  "check": [
   [
    "Why do containers start faster than virtual machines?",
    "They do not boot an operating system; they are isolated processes sharing the already running host kernel."
   ],
   [
    "When would you choose a VM over a container?",
    "When you need a different operating system from the host, strong isolation, or you are running a legacy application not designed for containers."
   ]
  ]
 },
 {
  "t": "VRF and VRF-Lite: separate routing tables, overlapping addresses, per-VRF routing",
  "body": [
   "A VRF (virtual routing and forwarding instance) splits one physical router into several logical routers. Each VRF has its own routing table, its own CEF forwarding table and its own set of interfaces. Traffic in one VRF cannot reach another VRF unless you deliberately leak routes between them. VRFs are the Layer 3 equivalent of VLANs and are a key tool for segmentation.",
   "Because each VRF has an independent routing table, the same IP prefix can exist in two VRFs at once without conflict. This is how service providers carry many customers who all use 10.0.0.0/8, and how an enterprise can keep, for example, a merged company's overlapping addresses separate until renumbering. It is also used to isolate guest traffic, management traffic or payment card systems from the corporate network.",
   "VRF-Lite means using VRFs without MPLS. Each router keeps its VRFs separate locally, and between routers you carry each VRF on its own interface or, more commonly, its own 802.1Q subinterface or VLAN, with a separate routing protocol instance or address family per VRF. This works well for a handful of VRFs across a few hops but grows awkward at scale because every link needs a subinterface per VRF. In MPLS Layer 3 VPNs, by contrast, MP-BGP (multiprotocol BGP) carries all VRFs' routes with route distinguishers and route targets over a shared core, and labels keep traffic separate.",
   "A modern IOS XE configuration looks like this: create the VRF, enable address families, then assign interfaces. Assigning an interface to a VRF removes its IP address, so you configure `vrf forwarding` before the IP address.",
   "```\nvrf definition GUEST\n address-family ipv4\n exit-address-family\n!\ninterface GigabitEthernet0/1.20\n encapsulation dot1Q 20\n vrf forwarding GUEST\n ip address 10.1.20.1 255.255.255.0\n!\nrouter ospf 2 vrf GUEST\n network 10.1.20.0 0.0.0.255 area 0\n```",
   "The older syntax `ip vrf NAME` with `ip vrf forwarding NAME` still works for IPv4-only VRFs. Routing protocols run per VRF: OSPF uses a separate process per VRF, while EIGRP and BGP use address families under one process, for example `address-family ipv4 vrf GUEST`. Static routes specify the VRF: `ip route vrf GUEST 0.0.0.0 0.0.0.0 10.1.99.1`.",
   "Troubleshooting commands must also include the VRF, which is the most common mistake in labs. `show ip route` shows only the global table; use `show ip route vrf GUEST`. Likewise use `ping vrf GUEST 10.1.20.10` and `traceroute vrf GUEST ...`. `show vrf` lists VRFs and their interfaces. To let VRFs share a service, such as internet access or a shared DNS server, you can leak routes using static routes pointing into another VRF, BGP route targets, or route replication features, but only as deliberately as the security design allows."
  ],
  "terms": [
   [
    "VRF",
    "Virtual routing and forwarding: an isolated routing and forwarding table with its own interfaces on a router."
   ],
   [
    "VRF-Lite",
    "Using VRFs hop by hop without MPLS, typically with one subinterface per VRF between devices."
   ],
   [
    "Route leaking",
    "Deliberately importing routes from one VRF into another so selected traffic can cross between them."
   ],
   [
    "Route distinguisher",
    "A value prepended to prefixes in MPLS VPNs so overlapping prefixes from different VRFs stay unique in MP-BGP."
   ]
  ],
  "example": "After acquiring another company, an enterprise finds both use 10.10.0.0/16. The engineers place the acquired company's links in a VRF named ACQ on the core routers. Both networks keep working unchanged, and only shared services such as email are reachable through carefully leaked routes until the acquired network is renumbered.",
  "tip": "When a lab says a host is unreachable but the interface is up, check whether you forgot the vrf keyword in ping, traceroute or show ip route. Also remember that applying vrf forwarding to an interface deletes its IP address.",
  "check": [
   [
    "How can two customers both use 192.168.1.0/24 on the same router?",
    "By placing each customer's interfaces in a separate VRF, so each prefix lives in its own routing table."
   ],
   [
    "What does VRF-Lite lack compared with MPLS L3VPN?",
    "It has no MPLS labels or MP-BGP VPN routes; each VRF must be carried hop by hop on separate interfaces or subinterfaces."
   ],
   [
    "Which command pings 10.1.20.10 inside VRF GUEST?",
    "ping vrf GUEST 10.1.20.10"
   ]
  ]
 },
 {
  "t": "GRE tunnels: configuration, keepalives, recursive routing problems, MTU and MSS",
  "body": [
   "Generic Routing Encapsulation (GRE) is a simple tunneling protocol that wraps one packet inside another. The original packet, which can be IPv4, IPv6 or even multicast and routing protocol traffic, becomes the payload of a new IP packet with a GRE header, using IP protocol number 47. GRE lets you build a virtual point-to-point link across a network that does not know about your addresses, such as the internet, and run routing protocols over it. GRE provides no encryption or authentication of its own, which is why it is often combined with IPsec.",
   "A basic GRE tunnel needs a tunnel interface on each router with three things: an IP address for the tunnel itself (the overlay), a tunnel source (a local interface or address in the underlay) and a tunnel destination (the far router's underlay address).",
   "```\ninterface Tunnel0\n ip address 172.16.0.1 255.255.255.252\n tunnel source GigabitEthernet0/0\n tunnel destination 203.0.113.2\n ip mtu 1400\n ip tcp adjust-mss 1360\n```",
   "The default tunnel mode is `tunnel mode gre ip`. A tunnel interface comes up as soon as the router has a route to the tunnel destination, even if the far end is down or misconfigured. GRE keepalives fix this: `keepalive 10 3` sends a keepalive every 10 seconds and brings the line protocol down after 3 missed replies. Running a routing protocol over the tunnel also detects failure through its own hellos.",
   "Recursive routing is the classic GRE problem. The router must reach the tunnel destination through the underlay. If a routing protocol running over the tunnel ever learns a better route to the tunnel destination through the tunnel itself, the router would have to send the tunnel's packets through the tunnel, which is impossible. IOS detects this, logs a message saying the tunnel is temporarily disabled due to recursive routing, and the tunnel flaps. Prevent it by never advertising the underlay (the tunnel source and destination networks) into the routing protocol running over the tunnel, for example by using separate protocols or processes, filtering with distribute lists, or using static routes for the underlay.",
   "GRE adds overhead: 20 bytes for the new IP header plus 4 bytes of GRE header, so 24 bytes in total. On a standard 1500-byte Ethernet path, a full-size original packet no longer fits and must be fragmented or dropped. Setting `ip mtu` on the tunnel (commonly 1400 to leave room for IPsec later) makes the router fragment before encapsulating or signals senders with ICMP. Because many networks block ICMP, Path MTU Discovery can fail, so you also set `ip tcp adjust-mss`, which rewrites the maximum segment size in TCP SYN packets. The MSS is the MTU minus 40 bytes of IPv4 and TCP headers, so an MTU of 1400 pairs with an MSS of 1360.",
   "Verify with `show interfaces tunnel 0`, `show ip interface brief` and ping across the tunnel with large packets and the don't-fragment bit, for example `ping 172.16.0.2 size 1400 df-bit`."
  ],
  "terms": [
   [
    "GRE",
    "Generic Routing Encapsulation: a tunneling protocol (IP protocol 47) that carries one packet inside another without encryption."
   ],
   [
    "Tunnel source and destination",
    "The underlay addresses the GRE packets use between the two tunnel endpoints."
   ],
   [
    "Recursive routing",
    "A failure where the route to the tunnel destination points through the tunnel itself, causing the tunnel to go down."
   ],
   [
    "MSS",
    "Maximum segment size: the largest TCP payload a host will accept, normally MTU minus 40 bytes."
   ],
   [
    "GRE keepalive",
    "Periodic probes that bring the tunnel line protocol down when the far end stops responding."
   ]
  ],
  "example": "Two branches build a GRE tunnel over the internet and run EIGRP across it. Someone adds `network 0.0.0.0` under EIGRP, which advertises the public interfaces into EIGRP. Each router learns the other's public address via the tunnel, the log reports recursive routing, and the tunnel flaps until the network statement is narrowed to the tunnel and LAN subnets.",
  "tip": "A GRE tunnel is up/up whenever the destination is routable, even if the far end is dead, unless keepalives are enabled. GRE adds 24 bytes; set ip mtu and ip tcp adjust-mss (MTU minus 40).",
  "check": [
   [
    "What causes the log message that a tunnel was temporarily disabled due to recursive routing?",
    "The best route to the tunnel destination was learned through the tunnel itself, usually because underlay addresses were advertised into the routing protocol running over the tunnel."
   ],
   [
    "If the tunnel ip mtu is 1400, what should ip tcp adjust-mss be set to?",
    "1360, which is 1400 minus 20 bytes of IP header and 20 bytes of TCP header."
   ]
  ]
 },
 {
  "t": "IPsec: IKE phases, tunnel vs transport mode, crypto maps vs tunnel protection",
  "body": [
   "IPsec (IP Security) is a framework of protocols that protects IP traffic with confidentiality (encryption), integrity (a hash-based message authentication code), authentication of the peers and anti-replay protection. It is used for site-to-site VPNs between routers and firewalls and for remote access. ENCOR focuses on how the tunnel is negotiated, how packets are encapsulated and the two main ways to configure it on Cisco IOS.",
   "Before any data is protected, the peers must agree on algorithms and keys. That is the job of IKE (Internet Key Exchange). In IKEv1, phase 1 builds a secure management channel called the ISAKMP or IKE security association (SA). The peers negotiate encryption, hash, authentication method (pre-shared key or certificates), Diffie-Hellman group and lifetime, run a Diffie-Hellman exchange to create shared keying material, and authenticate each other. Phase 1 uses main mode (six messages, which protects identities) or aggressive mode (three messages, faster but exposes identity information). Phase 2, called quick mode, runs inside the protected phase 1 channel and negotiates the IPsec SAs that actually protect data: the transform set (for example ESP with AES and SHA-2), the traffic to protect and lifetimes. IPsec SAs are one-directional, so each tunnel has at least one pair. IKEv2 streamlines this into an initial exchange (IKE_SA_INIT and IKE_AUTH, four messages) that creates the IKE SA and the first child SA together, with built-in support for features like NAT traversal and dead peer detection.",
   "IPsec uses two protocols for data. ESP (Encapsulating Security Payload, IP protocol 50) provides encryption plus integrity and is what you use in practice. AH (Authentication Header, IP protocol 51) provides integrity and authentication only, with no encryption, and does not work through NAT because it protects the outer IP header. When NAT is present, ESP is encapsulated in UDP port 4500 (NAT traversal); IKE itself uses UDP 500.",
   "IPsec has two modes. In tunnel mode, the entire original IP packet is encrypted and a new outer IP header is added between the VPN gateways. This is the normal mode for site-to-site VPNs because it hides the internal addresses. In transport mode, only the payload is protected and the original IP header is kept. Transport mode is used when the endpoints themselves are the traffic source and destination, for example to protect a GRE tunnel between two routers, since GRE already provides the outer header.",
   "On IOS, the older method is the crypto map. You define an ISAKMP policy, a transform set, and an ACL that identifies interesting traffic, then bind them in a crypto map applied to the physical outgoing interface. Traffic matching the ACL is encrypted. This is policy-based: routing protocols and multicast do not work across it naturally, and the ACLs must mirror each other on both peers. The modern method is tunnel protection: you create an IPsec profile and apply it to a tunnel interface with `tunnel protection ipsec profile NAME`. Everything routed into the tunnel interface is encrypted. This is route-based and supports routing protocols, multicast and simpler configuration, and is the basis of GRE over IPsec, VTIs and DMVPN.",
   "Verify with `show crypto isakmp sa` or `show crypto ikev2 sa` for the control channel and `show crypto ipsec sa` for packet encrypt and decrypt counters."
  ],
  "terms": [
   [
    "IKE phase 1",
    "Negotiates and authenticates the IKE (ISAKMP) SA, a secure channel for further negotiation."
   ],
   [
    "IKE phase 2",
    "Quick mode, which negotiates the IPsec SAs that protect user data."
   ],
   [
    "ESP",
    "Encapsulating Security Payload (IP protocol 50): provides encryption, integrity and anti-replay."
   ],
   [
    "Tunnel mode",
    "Encrypts the whole original packet and adds a new outer IP header; typical for site-to-site VPNs."
   ],
   [
    "Transport mode",
    "Protects only the payload and keeps the original IP header; used when endpoints are the traffic endpoints, such as GRE over IPsec."
   ],
   [
    "Tunnel protection",
    "Applying an IPsec profile to a tunnel interface to encrypt all traffic routed through it."
   ]
  ],
  "example": "An engineer troubleshooting a new VPN runs `show crypto isakmp sa` and sees the state stuck in MM_NO_STATE, meaning phase 1 never completed. Comparing ISAKMP policies reveals one side uses a different Diffie-Hellman group. After matching them, phase 1 reaches QM_IDLE and `show crypto ipsec sa` shows encrypt and decrypt counters increasing.",
  "tip": "Crypto maps are policy-based (ACL chooses traffic, applied to the physical interface); tunnel protection is route-based (routing chooses traffic, applied to a tunnel interface) and supports routing protocols and multicast. AH breaks with NAT; ESP with NAT-T uses UDP 4500.",
  "check": [
   [
    "Which IPsec mode hides the original source and destination addresses?",
    "Tunnel mode, because it encrypts the whole original packet and adds a new outer header."
   ],
   [
    "Why is tunnel protection better than a crypto map for running OSPF across a VPN?",
    "Tunnel protection encrypts everything routed through a tunnel interface, which supports multicast routing protocol traffic; crypto maps only match unicast interesting traffic defined by ACL."
   ],
   [
    "What does phase 2 negotiate that phase 1 does not?",
    "The IPsec SAs for user data: transform set, protected traffic and their keys and lifetimes."
   ]
  ]
 },
 {
  "t": "GRE over IPsec and virtual tunnel interfaces for routing protocols over VPNs",
  "body": [
   "Enterprises want two things from a site-to-site VPN: encryption across an untrusted network, and dynamic routing so that sites learn each other's prefixes and fail over automatically. GRE alone gives you routing but no encryption. A classic crypto map gives encryption but does not carry multicast, so routing protocols such as OSPF and EIGRP, which use multicast hellos, do not work across it. Two designs combine the strengths: GRE over IPsec and IPsec virtual tunnel interfaces (VTIs).",
   "In GRE over IPsec, you build a normal GRE tunnel and then encrypt the GRE packets. The routing protocol runs over the GRE tunnel interface just as it would over a physical link, and all its multicast and unicast traffic is encapsulated in GRE (unicast between the two router addresses), which IPsec can protect. The modern way to configure it is to apply an IPsec profile to the tunnel: `tunnel protection ipsec profile VPN-PROF`. Because GRE already adds a new IP header between the routers, IPsec can use transport mode, which saves the 20 bytes of an extra outer header; tunnel mode also works. The older approach applies a crypto map to the physical interface with an ACL matching GRE (protocol 47) between the tunnel endpoints.",
   "A static VTI removes GRE entirely. You create a tunnel interface with `tunnel mode ipsec ipv4` and apply the IPsec profile. The tunnel interface is itself an IPsec endpoint, so traffic routed into it is encrypted in IPsec tunnel mode directly, with no GRE header. It still behaves like a routable point-to-point interface, so routing protocols (including multicast hellos) work, you can apply QoS, ACLs and NetFlow on the tunnel interface, and the configuration is simpler than crypto maps. It uses less overhead than GRE over IPsec because there is no GRE header.",
   "```\ncrypto ipsec profile VPN-PROF\n set transform-set TS-AES\n!\ninterface Tunnel10\n ip address 10.255.0.1 255.255.255.252\n tunnel source GigabitEthernet0/0\n tunnel destination 198.51.100.2\n tunnel mode ipsec ipv4\n tunnel protection ipsec profile VPN-PROF\n```",
   "Choose between them by what the tunnel must carry. A VTI carries only one protocol family per tunnel (IPv4 or IPv6, depending on mode), and not non-IP traffic. GRE can carry multiple protocols over one tunnel and supports multipoint GRE (mGRE), which is the foundation of DMVPN (Dynamic Multipoint VPN) where spokes build tunnels to each other on demand. For a simple site-to-site link with IPv4 routing, a VTI is usually the cleanest choice. Dynamic VTIs, created from a virtual template on a hub, allow many remote peers to connect without a separate tunnel configuration for each.",
   "All the GRE lessons still apply: avoid recursive routing by keeping underlay addresses out of the overlay routing protocol, and account for overhead. Encryption adds ESP headers, padding and an integrity check on top of GRE, so tunnels commonly use `ip mtu 1400` and `ip tcp adjust-mss 1360` to avoid fragmentation. Verify with `show crypto ipsec sa` (counters should increase in both directions), `show interfaces tunnel` and the routing protocol's neighbor table."
  ],
  "terms": [
   [
    "GRE over IPsec",
    "A GRE tunnel whose packets are encrypted by IPsec, allowing routing protocols and multicast across an encrypted VPN."
   ],
   [
    "Static VTI",
    "An IPsec virtual tunnel interface (tunnel mode ipsec ipv4) that encrypts all traffic routed into it without a GRE header."
   ],
   [
    "IPsec profile",
    "A named set of IPsec parameters, such as the transform set, applied to a tunnel interface with tunnel protection."
   ],
   [
    "DMVPN",
    "Dynamic Multipoint VPN: hub-and-spoke mGRE plus NHRP and IPsec, letting spokes build direct tunnels on demand."
   ]
  ],
  "example": "A company links its headquarters and a branch with a crypto map but finds that OSPF never forms an adjacency across it. It replaces the crypto map with a static VTI on each router and runs OSPF on the tunnel interfaces. The adjacency forms, branch prefixes appear in the headquarters routing table, and traffic counters rise in `show crypto ipsec sa`.",
  "tip": "If the scenario needs multicast or a routing protocol across an encrypted tunnel, pick GRE over IPsec or a VTI, not a crypto map. A VTI has less overhead but carries a single IP family; GRE can carry multiple protocols and supports multipoint designs.",
  "check": [
   [
    "Why can GRE over IPsec use IPsec transport mode?",
    "GRE already adds a new outer IP header between the routers, so IPsec only needs to protect the GRE payload, saving the extra outer header."
   ],
   [
    "Which tunnel mode command turns a tunnel interface into a static VTI?",
    "tunnel mode ipsec ipv4 (or ipsec ipv6 for IPv6)."
   ]
  ]
 },
 {
  "t": "LISP: EID, RLOC, map server and map resolver, ITR and ETR",
  "body": [
   "LISP (Locator/ID Separation Protocol) addresses a basic limitation of IP: an IP address says both who a device is and where it is. When a device moves, its address has to change, and every prefix that must be reachable ends up in routing tables across the network. LISP separates those two roles into two address spaces and adds a mapping system between them. It is the control plane of Cisco SD-Access, so ENCOR expects you to know its components.",
   "The EID (endpoint identifier) is the address of the endpoint, such as a host's IP address. EIDs identify who the device is and stay the same when it moves. The RLOC (routing locator) is the address of the LISP router that the EID sits behind, usually a loopback reachable in the underlay. RLOCs identify where the device is. The underlay core only needs to route RLOCs; it does not need to know about EID prefixes.",
   "The mapping system stores which EIDs live behind which RLOCs. It has two functions, often run on the same device. The map server (MS) receives registrations: LISP routers send Map-Register messages saying 'these EID prefixes are reachable via my RLOC.' The map resolver (MR) receives Map-Request queries from routers that need to find an EID and forwards them to the map server, which either passes the request to the authoritative ETR or, if asked to, sends a proxy Map-Reply on its behalf. In SD-Access, the control plane node runs both roles.",
   "LISP routers have roles by direction of traffic. The ITR (ingress tunnel router) receives packets from local hosts headed to a remote EID. It looks up its map cache; if there is no entry, it sends a Map-Request to the map resolver, receives a Map-Reply with the RLOC, caches it, and encapsulates the packet with an outer header addressed to that RLOC. The ETR (egress tunnel router) is the router in front of the destination EIDs. It registers its EIDs with the map server, answers Map-Requests, and decapsulates arriving packets and delivers them to the local host. A router that does both is an xTR, which is the usual case for a site edge. Proxy ITRs and proxy ETRs (PITR and PETR) connect LISP sites with non-LISP networks, similar to how a border node in SD-Access connects the fabric to the outside.",
   "The flow is demand-based, like DNS: routers pull only the mappings they need and cache them, rather than every router holding every route. This keeps state small and makes mobility easy. When a host moves to a new site, the new ETR registers the EID with its own RLOC, the map server updates the mapping, and the old ETR or map server signals ITRs to refresh their caches, for example with a Solicit-Map-Request.",
   "Traditional LISP uses its own data plane encapsulation over UDP port 4341, with control messages on UDP 4342. SD-Access keeps the LISP control plane but uses VXLAN for the data plane so it can carry Layer 2 frames and the Scalable Group Tag."
  ],
  "terms": [
   [
    "EID",
    "Endpoint identifier: the address that identifies a host and stays with it when it moves."
   ],
   [
    "RLOC",
    "Routing locator: the underlay address of the LISP router through which an EID is reachable."
   ],
   [
    "Map server",
    "Receives Map-Register messages from ETRs and stores EID-to-RLOC mappings."
   ],
   [
    "Map resolver",
    "Receives Map-Request queries from ITRs and resolves them to the correct RLOC."
   ],
   [
    "ITR and ETR",
    "Ingress tunnel router encapsulates traffic toward a remote RLOC; egress tunnel router registers local EIDs and decapsulates arriving traffic."
   ]
  ],
  "example": "Host 10.1.1.10 at site A sends a packet to 10.2.2.20 at site B. Site A's ITR has no cache entry, so it sends a Map-Request to the map resolver. Site B's ETR had registered 10.2.2.0/24 with RLOC 192.0.2.2, so the ITR learns that mapping, caches it and encapsulates the packet to 192.0.2.2, where the ETR decapsulates and delivers it.",
  "tip": "Registration goes to the map server (ETR sends Map-Register); lookups go to the map resolver (ITR sends Map-Request). Identity is the EID; location is the RLOC.",
  "check": [
   [
    "Which LISP device sends Map-Register messages and to whom?",
    "The ETR, to the map server, advertising the EID prefixes reachable behind its RLOC."
   ],
   [
    "Why does LISP make host mobility easier?",
    "The host keeps its EID; only the EID-to-RLOC mapping changes when it moves, so the underlay routing does not change."
   ]
  ]
 },
 {
  "t": "VXLAN: VNI, VTEP, UDP encapsulation, overlay vs underlay",
  "body": [
   "VXLAN (Virtual Extensible LAN) is an encapsulation that carries Layer 2 Ethernet frames across a Layer 3 IP network. It solves two problems of traditional VLANs. First, the 12-bit VLAN ID allows only about 4,000 segments, which is not enough for large data centers and multitenant clouds. Second, stretching VLANs across a network requires Layer 2 trunks and spanning tree, which limit scale and create large failure domains. VXLAN lets you build Layer 2 segments on top of a routed network. It is the data plane of SD-Access and of most modern data center fabrics.",
   "Each VXLAN segment is identified by a VNI (VXLAN network identifier), a 24-bit value, giving about 16 million possible segments. A VNI plays the role a VLAN ID plays in a traditional network. A Layer 2 VNI represents a bridged segment; a Layer 3 VNI is used for routed traffic between segments of the same VRF.",
   "The device that encapsulates and decapsulates is the VTEP (VXLAN tunnel endpoint). A VTEP can be a physical switch, such as a leaf switch or an SD-Access edge node, or a software switch in a hypervisor. It has an IP address in the underlay, usually a loopback. When a host sends a frame, the VTEP adds an 8-byte VXLAN header containing the VNI, then a UDP header, then an outer IP header from its own address to the destination VTEP's address, and finally an outer Ethernet header for the next hop. The standard destination UDP port is 4789. The source UDP port is usually derived from a hash of the inner frame's headers, which gives the underlay's equal-cost multipath (ECMP) load balancing some entropy to spread different flows across paths. The total overhead is about 50 bytes, so the underlay MTU must be raised (for example to 9000 or at least about 1550) to avoid fragmenting full-size frames.",
   "This creates a clean split between underlay and overlay. The underlay is the physical routed IP network, often a spine-leaf fabric running OSPF, IS-IS or BGP, whose only job is to deliver packets between VTEP addresses, ideally with ECMP. The overlay is the set of VXLAN segments that hosts see, with their own MAC and IP addresses, independent of the underlay topology.",
   "VTEPs must also learn which remote VTEP a destination MAC lives behind, and handle broadcast, unknown unicast and multicast (BUM) traffic. The original VXLAN approach used flood-and-learn with underlay multicast groups per VNI. Modern fabrics use a control plane instead: BGP EVPN (Ethernet VPN) in most data centers, which advertises MAC and IP reachability between VTEPs, or LISP in SD-Access, where VTEPs query the control plane node. A control plane reduces flooding and enables features such as distributed anycast gateways.",
   "Remember that VXLAN itself provides no encryption; it is purely an encapsulation."
  ],
  "terms": [
   [
    "VXLAN",
    "An encapsulation that carries Ethernet frames inside UDP over an IP network."
   ],
   [
    "VNI",
    "VXLAN network identifier: a 24-bit segment ID, allowing about 16 million segments."
   ],
   [
    "VTEP",
    "VXLAN tunnel endpoint: the device that encapsulates and decapsulates VXLAN traffic, identified by an underlay IP address."
   ],
   [
    "UDP 4789",
    "The IANA-assigned destination port for VXLAN."
   ],
   [
    "BGP EVPN",
    "A control plane that advertises MAC and IP reachability between VTEPs, reducing flood-and-learn behavior."
   ]
  ],
  "example": "Two servers in the same application tier sit on leaves in different racks. Server A sends a frame to server B's MAC in VNI 10100. Leaf 1, acting as VTEP, encapsulates it in UDP port 4789 toward leaf 4's loopback, the spines route it using ECMP, and leaf 4 decapsulates it and delivers the original frame, so both servers believe they share a LAN.",
  "tip": "Know the numbers: VNI is 24 bits (about 16 million segments) versus 12-bit VLAN IDs, VXLAN uses UDP destination port 4789, and it adds about 50 bytes, so raise the underlay MTU.",
  "check": [
   [
    "What does a VTEP add to an Ethernet frame?",
    "A VXLAN header with the VNI, a UDP header (destination 4789), an outer IP header between VTEP addresses and an outer Ethernet header."
   ],
   [
    "Why is the VXLAN UDP source port usually variable?",
    "It is derived from a hash of the inner frame's headers so the underlay's ECMP can spread different flows across multiple paths."
   ]
  ]
 },
 {
  "t": "Layer 2: static and dynamic 802.1Q trunking (DTP), allowed VLANs and native VLAN",
  "body": [
   "A trunk is a switch link that carries traffic for multiple VLANs. On a trunk, IEEE 802.1Q inserts a 4-byte tag into each Ethernet frame, containing the 12-bit VLAN ID and the 3-bit CoS priority. The receiving switch reads the tag and places the frame in the correct VLAN. Trunks connect switches to each other, to routers doing router-on-a-stick, and to hypervisors and wireless controllers.",
   "You can make a trunk statically with `switchport mode trunk`. Many Catalyst switches that also support the old Cisco ISL encapsulation require `switchport trunk encapsulation dot1q` first; newer platforms support only 802.1Q and do not need it. A port set to `switchport mode access` is never a trunk and carries one VLAN untagged.",
   "Cisco's Dynamic Trunking Protocol (DTP) negotiates trunking automatically. `switchport mode dynamic desirable` actively tries to form a trunk; `switchport mode dynamic auto` forms a trunk only if the other side asks. The results: desirable with desirable, auto or trunk makes a trunk; auto with auto stays an access link because neither side initiates; trunk with access is a misconfiguration that causes problems. The default mode varies by platform, with many current Catalyst switches defaulting to dynamic auto. Best practice is to disable negotiation: hard-code trunks with `switchport mode trunk` plus `switchport nonegotiate`, and hard-code user ports with `switchport mode access`. This avoids surprises and prevents an attacker from negotiating a trunk from an access port (switch spoofing). Verify with `show interfaces trunk` and `show interfaces gi1/0/1 switchport`.",
   "By default a trunk carries all VLANs. Restrict it with `switchport trunk allowed vlan 10,20,30`. Be careful when editing: typing that command again with a different list replaces the whole list, which is a common way to cut off production VLANs. Use `switchport trunk allowed vlan add 40` or `remove 40` to change it incrementally. `show interfaces trunk` shows the allowed VLANs, the VLANs active in the management domain, and those forwarding (not pruned or blocked by spanning tree).",
   "The native VLAN is the one VLAN whose frames cross the trunk untagged. By default it is VLAN 1. Both ends must agree; if they don't, untagged frames from one side's native VLAN arrive in a different VLAN on the other side, leaking traffic between VLANs. Cisco Discovery Protocol reports a native VLAN mismatch in the log. Change it with `switchport trunk native vlan 999`.",
   "The native VLAN also matters for security. In a VLAN hopping attack by double tagging, an attacker on the native VLAN sends a frame with two tags; the first switch strips the outer tag (because it matches the native VLAN) and forwards the frame with the inner tag onto the trunk, where the next switch places it in the victim VLAN. Defenses are to set the native VLAN to an unused VLAN with no users, avoid using VLAN 1 for anything, or tag the native VLAN with `vlan dot1q tag native`. Also shut down unused ports and place them in an unused VLAN."
  ],
  "terms": [
   [
    "802.1Q",
    "The IEEE trunking standard that inserts a 4-byte tag with a 12-bit VLAN ID into Ethernet frames."
   ],
   [
    "DTP",
    "Dynamic Trunking Protocol: Cisco protocol that negotiates whether a link becomes a trunk."
   ],
   [
    "Native VLAN",
    "The VLAN whose frames are sent untagged on an 802.1Q trunk; must match on both ends."
   ],
   [
    "Allowed VLAN list",
    "The set of VLANs permitted to cross a trunk, set with switchport trunk allowed vlan."
   ],
   [
    "Switchport nonegotiate",
    "Disables DTP frames on a port."
   ]
  ],
  "example": "An engineer needs to add VLAN 50 to an uplink and types `switchport trunk allowed vlan 50`. Immediately, users in VLANs 10 and 20 on that switch lose connectivity, because the command replaced the allowed list. The fix is `switchport trunk allowed vlan 10,20,50`, and in future `switchport trunk allowed vlan add 50`.",
  "tip": "Two dynamic auto ports never form a trunk. Without the add keyword, switchport trunk allowed vlan replaces the whole list. A native VLAN mismatch leaks traffic between VLANs and triggers CDP warnings.",
  "check": [
   [
    "What happens when both ends of a link are set to dynamic auto?",
    "No trunk forms; the link stays in access mode because neither side actively initiates trunking."
   ],
   [
    "How do you mitigate double-tagging VLAN hopping?",
    "Set the native VLAN to an unused VLAN (or tag the native VLAN), keep users out of it and out of VLAN 1, and disable DTP on access ports."
   ],
   [
    "Which command adds VLAN 40 to an existing trunk without removing others?",
    "switchport trunk allowed vlan add 40"
   ]
  ]
 },
 {
  "t": "EtherChannel: LACP, PAgP and static; member consistency; load balancing",
  "body": [
   "EtherChannel bundles two or more physical Ethernet links between the same two devices into one logical link, called a port channel. It increases bandwidth and provides redundancy: if one member fails, traffic moves to the others without a topology change. Just as important, spanning tree treats the bundle as a single link, so all members forward instead of all but one being blocked.",
   "There are three ways to form a bundle, set per interface with `channel-group <number> mode <mode>`. LACP (Link Aggregation Control Protocol, IEEE 802.3ad, now 802.1AX) is the open standard. Its modes are `active`, which sends LACP packets to start negotiation, and `passive`, which only responds. Active with active or active with passive forms a bundle; passive with passive does not. PAgP (Port Aggregation Protocol) is Cisco proprietary, with `desirable` (initiates) and `auto` (responds); desirable with desirable or desirable with auto forms a bundle, auto with auto does not. Static mode is `on`, which forces the bundle without any protocol. `on` only works with `on` at the other end, and because there is no negotiation it cannot detect misconfiguration, so a mismatch can cause loops or black-holed traffic. You cannot mix protocols: LACP will not bundle with PAgP or with `on`. LACP is usually preferred because it is standard and supports features such as a configurable maximum number of active links with standby members.",
   "Member consistency is where most bundles fail. All member ports must match in speed and duplex, switchport mode (all access or all trunk), access VLAN or allowed VLAN list and native VLAN, and they should have consistent spanning tree settings. If a member differs, it is suspended or the channel does not form. A good habit is to configure the physical interfaces the same way, create the channel, then make later changes on the port-channel interface, which pushes them to the members. Verify with `show etherchannel summary`: flags show P for bundled, s for suspended, I for stand-alone, D for down, and SU for a Layer 2 channel in use (RU for Layer 3). `show lacp neighbor` or `show pagp neighbor` shows the negotiation.",
   "EtherChannel does not split a single flow across links; that would reorder packets. Instead, the switch runs a hash on fields of each frame and uses the result to pick a member. All frames of the same conversation hash to the same link. The fields are set globally with `port-channel load-balance`, with options such as `src-mac`, `dst-mac`, `src-dst-mac`, `src-ip`, `dst-ip`, `src-dst-ip`, and on many platforms Layer 4 ports. The choice matters: if most traffic goes from many clients to one router, hashing on destination MAC alone sends everything down one link, while `src-dst-ip` spreads it better. Check the setting with `show etherchannel load-balance`. Because of hashing, bundles work best with power-of-two member counts, such as 2, 4 or 8 links, for an even distribution.",
   "A Layer 3 EtherChannel is created by using `no switchport` on the port-channel and members and putting the IP address on the port-channel interface."
  ],
  "terms": [
   [
    "LACP",
    "Link Aggregation Control Protocol, the IEEE standard for negotiating EtherChannel; modes active and passive."
   ],
   [
    "PAgP",
    "Port Aggregation Protocol, the Cisco proprietary EtherChannel negotiation protocol; modes desirable and auto."
   ],
   [
    "Mode on",
    "Static EtherChannel with no negotiation protocol; must be on at both ends."
   ],
   [
    "Load-balancing hash",
    "The per-frame calculation on address or port fields that chooses which member link carries a flow."
   ]
  ],
  "example": "Two switches are connected with four links configured as `channel-group 1 mode passive` on both sides. `show etherchannel summary` shows every member as I (stand-alone) and spanning tree blocks three of them. Changing one side to `mode active` lets LACP negotiate, the members show P, and the port channel shows SU with all four links forwarding.",
  "tip": "Passive-passive (LACP) and auto-auto (PAgP) never form a channel. On does not negotiate and only pairs with on. A single flow never uses more than one member link's bandwidth.",
  "check": [
   [
    "Will LACP active on one side bundle with PAgP desirable on the other?",
    "No; the protocols are different and cannot negotiate with each other."
   ],
   [
    "Traffic from 200 clients to one server all uses one member link. What should you check?",
    "The load-balance method; if it hashes only on destination MAC or IP, all traffic to one server picks the same link, so use a source-and-destination method."
   ],
   [
    "Name three settings that must match on all member ports.",
    "Speed and duplex, switchport mode, and access VLAN or trunk allowed and native VLANs."
   ]
  ]
 },
 {
  "t": "Spanning tree: RSTP and MST, port roles, root placement, BPDU guard, root guard, loop guard",
  "body": [
   "Redundant Layer 2 links create loops, and Ethernet frames have no TTL, so a loop causes broadcast storms and MAC table instability that can take down a network in seconds. Spanning Tree Protocol (STP) prevents loops by electing a root bridge and blocking redundant ports. ENCOR focuses on the faster modern versions and the protection features.",
   "The election works on bridge IDs, made of a priority (default 32768, configured in steps of 4096) plus the system ID extension (the VLAN or instance number) and the switch MAC. Lowest bridge ID wins root. Every other switch picks one root port, its best path to the root by lowest cost, then lowest sender bridge ID, then lowest sender port ID. On each segment one designated port forwards toward that segment. Remaining ports are non-designated and do not forward. Rapid STP (RSTP, IEEE 802.1w) adds names for these: the alternate port is a backup path to the root (a ready replacement for the root port), and the backup port is a redundant port to the same segment, which is rare. RSTP port states are discarding, learning and forwarding.",
   "RSTP converges much faster than classic 802.1D because it does not wait for timers. On point-to-point links a designated port uses a proposal and agreement handshake with its neighbor and can move to forwarding almost immediately. Alternate ports take over quickly when a root port fails. Edge ports (PortFast) go straight to forwarding. Cisco's implementation is Rapid PVST+, which runs one RSTP instance per VLAN.",
   "MST (Multiple Spanning Tree, 802.1s) maps many VLANs to a few instances, so a switch with hundreds of VLANs runs perhaps two or three trees instead of hundreds. Switches are in the same MST region only if they share the same region name, revision number and VLAN-to-instance mapping; any difference makes them separate regions. Instance 0 (the IST, internal spanning tree) interacts with other regions and with other STP versions.",
   "Root placement should be deliberate. Make the distribution or core switch that hosts the gateway the root, with `spanning-tree vlan 10 priority 4096` or `spanning-tree vlan 10 root primary`, and a second switch the secondary. Otherwise the switch with the lowest MAC, often the oldest, wins. With FHRP gateways, align the STP root and the active gateway on the same switch per VLAN for optimal paths.",
   "Protection features: PortFast (`spanning-tree portfast`) puts access ports straight into forwarding. BPDU guard err-disables a PortFast port if it receives any BPDU, stopping someone from plugging in a switch; enable it per port or globally with `spanning-tree portfast bpduguard default`. Root guard, configured on designated ports facing switches that should never become root, puts the port into root-inconsistent (blocking) state if it receives a superior BPDU, and recovers automatically when those stop. Loop guard protects root and alternate ports against unidirectional links: if a non-designated port stops receiving BPDUs, it moves to loop-inconsistent (blocking) instead of wrongly becoming designated and forwarding. UDLD (Unidirectional Link Detection) complements it on fiber links."
  ],
  "terms": [
   [
    "Root port",
    "The port on a non-root switch with the best path to the root bridge."
   ],
   [
    "Designated port",
    "The forwarding port on each segment toward that segment, chosen by best path to root."
   ],
   [
    "Alternate port",
    "An RSTP discarding port with an alternative path to the root, ready to replace the root port."
   ],
   [
    "BPDU guard",
    "Err-disables a PortFast port that receives a BPDU."
   ],
   [
    "Root guard",
    "Blocks a designated port that receives a superior BPDU, preventing an unwanted switch from becoming root."
   ],
   [
    "Loop guard",
    "Blocks a non-designated port that stops receiving BPDUs, preventing loops from unidirectional links."
   ]
  ],
  "example": "A contractor plugs a small switch with a low bridge priority into a conference room port. Because the access port has PortFast and BPDU guard, the port err-disables as soon as the first BPDU arrives, the log records the event, and the campus root bridge is never challenged.",
  "tip": "BPDU guard shuts the port (err-disabled) on any BPDU; root guard blocks only on superior BPDUs and recovers by itself; loop guard acts when BPDUs stop arriving. MST regions must match name, revision and VLAN mapping exactly.",
  "check": [
   [
    "Which three values must match for two switches to be in the same MST region?",
    "Region name, revision number and VLAN-to-instance mapping."
   ],
   [
    "Where should root guard be configured?",
    "On designated ports facing switches that should never become root, typically distribution ports toward access switches."
   ],
   [
    "What problem does loop guard prevent?",
    "A blocked port becoming designated and forwarding after it stops receiving BPDUs, usually because of a unidirectional link failure."
   ]
  ]
 },
 {
  "t": "EIGRP vs OSPF: algorithms, metrics, path selection, load balancing, summarization",
  "body": [
   "EIGRP and OSPF are the two interior gateway protocols (IGPs) ENCOR tests, and many questions ask you to compare them. They reach the same goal, loop-free best paths inside one organization, by very different methods.",
   "OSPF (Open Shortest Path First) is an open-standard link-state protocol. Each router describes its links in link-state advertisements (LSAs) and floods them to all routers in the area, so every router has an identical link-state database (LSDB), a full map of the area. Each router then runs Dijkstra's shortest path first (SPF) algorithm to compute a tree of best paths to every destination. EIGRP (Enhanced Interior Gateway Routing Protocol), originally Cisco proprietary and later published as an informational RFC, is an advanced distance vector protocol. A router knows only what its neighbors tell it: each destination's distance as reported by the neighbor. It uses DUAL (Diffusing Update Algorithm) to choose loop-free paths and keep precomputed backups called feasible successors.",
   "Metrics differ. OSPF uses cost, derived by default as reference bandwidth divided by interface bandwidth. The default reference bandwidth is 100 Mbps, which means every link of 100 Mbps or faster gets cost 1, so you should raise it consistently on all routers with `auto-cost reference-bandwidth`. EIGRP uses a composite metric built from bandwidth and delay by default (K values K1 and K3); load and reliability exist but are off by default. Bandwidth is the minimum along the path and delay is cumulative. Named mode EIGRP adds a wide metric that scales to high-speed links.",
   "Path selection and administrative distance: when both protocols offer the same prefix, the router prefers the lower administrative distance: internal EIGRP 90, OSPF 110, external EIGRP 170. Within OSPF, path type matters before cost: intra-area routes beat inter-area routes, which beat external type 1, then external type 2, regardless of cost.",
   "Load balancing: both do equal-cost multipath across several paths (by default up to 4 on many IOS versions, configurable with `maximum-paths`). Only EIGRP supports unequal-cost load balancing, with the `variance` command, using feasible successors whose metric is within a multiple of the best.",
   "Summarization: EIGRP can summarize on any interface in any router with `ip summary-address eigrp` (or `summary-address` in named mode), creating a Null0 route to prevent loops. OSPF can summarize only at area borders and domain boundaries: `area X range` on an ABR (area border router) for inter-area routes and `summary-address` on an ASBR (autonomous system boundary router) for external routes. This follows from OSPF's design: all routers in an area must have the same LSDB, so you cannot hide detail inside an area.",
   "Other differences: OSPF uses a hierarchical design with a backbone area 0 and scales through areas; EIGRP scales through summarization and stub routing. OSPF sends hellos to 224.0.0.5 and 224.0.0.6 and runs directly over IP protocol 89; EIGRP uses 224.0.0.10 and IP protocol 88 with its own reliable transport."
  ],
  "terms": [
   [
    "Link-state",
    "A routing approach where routers share topology and each computes paths with SPF from a full map."
   ],
   [
    "Advanced distance vector",
    "EIGRP's approach, learning distances from neighbors and using DUAL to keep paths loop-free."
   ],
   [
    "Administrative distance",
    "Trust value for choosing between routing sources: EIGRP internal 90, OSPF 110, EIGRP external 170."
   ],
   [
    "Reference bandwidth",
    "OSPF's value divided by interface bandwidth to get cost; defaults to 100 Mbps."
   ],
   [
    "Unequal-cost load balancing",
    "Sharing traffic across paths with different metrics, supported only by EIGRP through variance."
   ]
  ],
  "example": "A network has 1 Gbps and 10 Gbps links, but OSPF sends traffic over the slower path. Both links show cost 1 because the default reference bandwidth is 100 Mbps. Setting `auto-cost reference-bandwidth 100000` on every router makes the 10 Gbps link cost 10 and the 1 Gbps link cost 100, and the correct path is chosen.",
  "tip": "OSPF: link-state, SPF, cost, summarize only on ABR or ASBR, equal-cost only. EIGRP: DUAL, bandwidth plus delay, summarize anywhere, unequal-cost with variance. Lower administrative distance wins before metric is compared.",
  "check": [
   [
    "Where can OSPF summarize routes, and why not elsewhere?",
    "Only on ABRs (area range) and ASBRs (summary-address), because every router within an area must share the same link-state database."
   ],
   [
    "An OSPF inter-area route has cost 10 and an intra-area route to the same prefix has cost 50. Which is used?",
    "The intra-area route, because OSPF prefers intra-area over inter-area paths before comparing cost."
   ],
   [
    "Which default EIGRP metric components are used?",
    "Bandwidth (minimum along the path) and delay (cumulative)."
   ]
  ]
 },
 {
  "t": "EIGRP: feasible successors, variance, stub routing",
  "body": [
   "EIGRP's speed and stability come from DUAL, the Diffusing Update Algorithm. To understand feasible successors, variance and stub routing you need two distances that EIGRP tracks for every path.",
   "The reported distance (RD), also called advertised distance, is the metric from the neighbor to the destination, as the neighbor reports it. The feasible distance (FD) is your total metric to the destination through that neighbor: the neighbor's reported distance plus the cost of your link to the neighbor. The best path, with the lowest FD, is the successor, and it is installed in the routing table. The lowest FD is remembered as the feasible distance for the route.",
   "A feasible successor is a backup path that is guaranteed loop-free. The rule, called the feasibility condition, is that a neighbor's reported distance must be strictly less than your current feasible distance. The logic: if the neighbor is closer to the destination than you are, its path cannot be going back through you. When the successor fails and a feasible successor exists, the router switches to it immediately without asking anyone, which is why EIGRP can converge in well under a second. If there is no feasible successor, the route goes active: the router sends queries to all neighbors asking for an alternative path and waits for replies before it can choose. In large networks, queries can travel far, and if a router does not answer within the active timer (three minutes by default), the route becomes stuck in active (SIA) and the neighbor relationship may be reset.",
   "You can see successors and feasible successors with `show ip eigrp topology`. Each entry lists paths as '(FD/RD)'. Paths that do not meet the feasibility condition appear only with `show ip eigrp topology all-links`.",
   "Variance enables unequal-cost load balancing. By default EIGRP installs only equal-cost paths. With `variance 2`, EIGRP also installs any feasible successor whose FD is less than 2 times the successor's FD. Traffic is shared in proportion to the metrics. Only paths that are feasible successors qualify, so a path that fails the feasibility condition is never used even if its metric is within the variance. `maximum-paths` still limits how many paths are installed.",
   "Stub routing controls query scope. A remote branch router with a single hub connection should never be used as a transit path, and queries sent to it are wasted. Configuring `eigrp stub` on the branch (in classic mode under `router eigrp`, or `eigrp stub` under the address family in named mode) tells neighbors it is a stub, so the hub does not send it queries and SIA risk shrinks. By default a stub advertises connected and summary routes (`eigrp stub connected summary`); other options include `static`, `redistributed`, `receive-only` and `leak-map`. A stub does not advertise routes learned from one neighbor to another, which also prevents the branch from becoming an accidental transit.",
   "Summarization is the other tool for limiting query scope: a query stops at a router that does not have the specific prefix in its topology table, such as one that only knows a summary."
  ],
  "terms": [
   [
    "Feasible distance",
    "The router's total metric to a destination through the best path."
   ],
   [
    "Reported distance",
    "The metric to the destination as advertised by a neighbor."
   ],
   [
    "Feasibility condition",
    "A neighbor's reported distance must be less than the current feasible distance for it to be a feasible successor."
   ],
   [
    "Variance",
    "A multiplier that allows EIGRP to install feasible successors with higher metrics for unequal-cost load balancing."
   ],
   [
    "Stub router",
    "An EIGRP router that tells neighbors not to query it and advertises only selected route types."
   ]
  ],
  "example": "Router R1 reaches 10.5.0.0/16 via R2 with FD 3000 (RD 1000) and via R3 with FD 5000 (RD 2500). R3's RD of 2500 is less than R1's FD of 3000, so R3 is a feasible successor. With `variance 2`, R1 installs both paths because 5000 is less than 2 times 3000, sharing traffic roughly in proportion to the metrics.",
  "tip": "Feasible successor test: RD of the backup less than FD of the successor, strictly less. Variance only ever uses feasible successors. Stub routing is the main fix for stuck-in-active problems at hub sites.",
  "check": [
   [
    "A backup path has RD 3000 and the current FD is 3000. Is it a feasible successor?",
    "No; the reported distance must be strictly less than the feasible distance."
   ],
   [
    "What happens when a successor fails and there is no feasible successor?",
    "The route goes active and the router queries its neighbors for an alternative path, waiting for replies before reconverging."
   ],
   [
    "Why configure eigrp stub on branch routers?",
    "So hubs do not send them queries, reducing query scope and stuck-in-active risk, and so the branch never becomes a transit path."
   ]
  ]
 },
 {
  "t": "OSPFv2 and OSPFv3: multi-area, adjacencies, network types, area types (stub, totally stubby, NSSA), summarization and filtering",
  "body": [
   "OSPF scales by dividing the network into areas. Area 0 is the backbone, and every other area must connect to it (directly or through a virtual link). Routers inside an area share an identical LSDB. An ABR (area border router) has interfaces in area 0 and another area and passes summarized information between them as type 3 summary LSAs. An ASBR (autonomous system boundary router) redistributes external routes, which appear as type 5 LSAs. Inside an area, type 1 (router) and type 2 (network, from the DR) LSAs describe the topology. Areas limit the scope of SPF recalculation and LSA flooding.",
   "Adjacencies progress through states: Down, Init (hello received), 2-Way (each sees itself in the other's hello), ExStart and Exchange (database descriptions), Loading (requesting missing LSAs) and Full. To become neighbors, routers must match area ID, subnet and mask, hello and dead timers, authentication, stub area flags and MTU (an MTU mismatch typically sticks the neighbors in ExStart or Exchange), and they must have unique router IDs.",
   "Network types control hellos and designated routers. Broadcast (the default on Ethernet) elects a DR (designated router) and BDR (backup) to reduce adjacencies; the highest interface priority wins, then highest router ID, and the election is not preemptive. Other routers stay in 2-Way with each other, which is normal, and are Full only with the DR and BDR. Point-to-point has no DR and suits links with exactly two routers, including Ethernet links between two routers, where `ip ospf network point-to-point` speeds adjacency formation. Non-broadcast and point-to-multipoint exist for NBMA and hub-and-spoke designs. Hello and dead timers default to 10 and 40 seconds on broadcast and point-to-point.",
   "Area types reduce LSDB size at the edge. A stub area blocks type 5 external LSAs; the ABR injects a default route instead. A totally stubby area (Cisco) also blocks type 3 inter-area summaries, leaving only intra-area routes and a default, configured with `area 1 stub no-summary` on the ABR. An NSSA (not-so-stubby area) blocks type 5 but allows an ASBR inside the area to redistribute externals as type 7 LSAs, which the ABR translates into type 5 for the rest of the domain. A totally NSSA also blocks type 3. All routers in the area must agree on the stub flag.",
   "Summarization happens only at boundaries: `area 1 range 10.1.0.0 255.255.0.0` on the ABR and `summary-address` on the ASBR. Filtering options include `area X filter-list prefix` on an ABR to block type 3 LSAs, the `not-advertise` keyword on area range, and `distribute-list in`, which only prevents routes from entering the local routing table without stopping LSA flooding.",
   "OSPFv3 is the IPv6-capable version. It runs per link rather than per subnet, uses link-local addresses for neighbors, uses IPsec-based or built-in authentication rather than OSPFv2's fields, and adds new LSA types (link LSA type 8 and intra-area prefix LSA type 9) so topology and prefixes are carried separately. It still uses a 32-bit router ID, which must be set manually if the router has no IPv4 addresses. With address families, OSPFv3 can carry IPv4 as well. Configure it on the interface, for example `ospfv3 1 ipv6 area 0`."
  ],
  "terms": [
   [
    "ABR",
    "Area border router: connects area 0 to other areas and generates type 3 summary LSAs."
   ],
   [
    "ASBR",
    "Autonomous system boundary router: redistributes external routes into OSPF."
   ],
   [
    "DR and BDR",
    "Designated and backup designated router elected on broadcast networks to reduce adjacencies."
   ],
   [
    "Totally stubby area",
    "An area that blocks type 3 and type 5 LSAs and receives only a default route from the ABR."
   ],
   [
    "NSSA",
    "Not-so-stubby area: blocks type 5 LSAs but allows local externals as type 7 LSAs, translated to type 5 by the ABR."
   ]
  ],
  "example": "A branch area has a router that redistributes a partner's static routes, and the design team wants to keep the branch LSDB small. A stub area is impossible because it forbids an ASBR, so they configure NSSA: the partner routes enter as type 7, the ABR translates them to type 5 for the backbone, and the branch never receives other external LSAs.",
  "tip": "Stub blocks type 5; totally stubby blocks 3 and 5; NSSA blocks type 5 but allows type 7 from a local ASBR. Neighbors stuck in ExStart or Exchange usually mean an MTU mismatch; routers stuck in 2-Way on Ethernet are normal between DROTHERs.",
  "check": [
   [
    "Which LSA type does an ASBR inside an NSSA generate, and what happens to it at the ABR?",
    "Type 7, which the ABR translates to type 5 for other areas."
   ],
   [
    "Two OSPF routers stay in ExStart. What is the likely cause?",
    "An interface MTU mismatch between them."
   ],
   [
    "Why might you set ip ospf network point-to-point on an Ethernet link between two routers?",
    "To skip the DR/BDR election and form the adjacency faster, since only two routers share the link."
   ]
  ]
 },
 {
  "t": "eBGP between directly connected neighbors: neighbor states and best-path selection",
  "body": [
   "BGP (Border Gateway Protocol) is the routing protocol of the internet and the usual way enterprises connect to service providers. It is a path-vector protocol: each route carries attributes, including the list of autonomous systems (AS) it has crossed. External BGP (eBGP) runs between routers in different autonomous systems; internal BGP (iBGP) runs within one AS. ENCOR focuses on eBGP between directly connected neighbors and on how BGP picks a best path.",
   "BGP does not discover neighbors automatically; you configure each one. BGP uses TCP port 179 for reliable transport. A basic configuration:",
   "```\nrouter bgp 65001\n bgp router-id 1.1.1.1\n neighbor 203.0.113.1 remote-as 65100\n network 198.51.100.0 mask 255.255.255.0\n```",
   "The `network` command advertises a prefix only if an exact match (same prefix and mask) exists in the routing table, which is why you sometimes add a static route to Null0 for an aggregate. For eBGP, the neighbor address must be directly connected by default because eBGP packets are sent with a TTL of 1. Peering between loopbacks would need `ebgp-multihop` (or `disable-connected-check`) plus `update-source`. When advertising to an eBGP peer, the router sets itself as the next hop and prepends its AS to the AS_PATH. A router rejects any route containing its own AS in the AS_PATH, which is BGP's loop prevention.",
   "Neighbor states progress: Idle (not trying, or waiting after an error), Connect (attempting the TCP connection), Active (TCP failed; retrying and listening), OpenSent (TCP up, OPEN message sent), OpenConfirm (OPEN received and parameters acceptable, waiting for KEEPALIVE), and Established (exchanging UPDATE messages). A neighbor flipping between Idle and Active usually means the session cannot come up: TCP cannot complete because of a wrong neighbor address, an ACL blocking TCP 179 or missing reachability, or TCP completes but the peer rejects the OPEN because of a wrong AS number, sending the session back to Idle. In `show ip bgp summary`, an Established neighbor shows a number of received prefixes in the State/PfxRcd column instead of a state name.",
   "When BGP has several paths to the same prefix, it picks one best path by walking an ordered list of attributes. First the next hop must be reachable. Then, in Cisco order: highest weight (Cisco-specific, local to the router, default 0 for learned routes); highest local preference (shared within the AS, default 100); prefer locally originated routes; shortest AS_PATH; lowest origin type (IGP before EGP before incomplete); lowest MED (multi-exit discriminator, a hint from a neighboring AS about which entry to use, compared by default only between paths from the same AS); eBGP over iBGP; lowest IGP metric to the next hop; then tie-breakers such as oldest eBGP path and lowest router ID. A common mnemonic for the start is 'We Love Oranges AS Oranges Mean Pure Refreshment' (Weight, Local preference, Originated, AS path, Origin, MED, Paths eBGP over iBGP, Router ID), though it skips a few steps.",
   "Weight and local preference influence outbound traffic (which exit you use). AS_PATH prepending and MED influence inbound traffic (how others reach you). Check the result with `show ip bgp`, where '>' marks the best path."
  ],
  "terms": [
   [
    "eBGP",
    "BGP between routers in different autonomous systems; uses TTL 1 by default."
   ],
   [
    "Established",
    "The BGP state in which the session is up and UPDATE messages are exchanged."
   ],
   [
    "Weight",
    "Cisco-specific, router-local attribute; the highest value is preferred first."
   ],
   [
    "Local preference",
    "AS-wide attribute used to choose the exit point; the highest value wins, default 100."
   ],
   [
    "AS_PATH",
    "The list of autonomous systems a route has crossed, used for loop prevention and path length."
   ],
   [
    "MED",
    "Multi-exit discriminator: a lower value suggests a preferred entry point into a neighboring AS."
   ]
  ],
  "example": "An enterprise with two ISPs wants outbound traffic to use ISP A. It sets local preference 200 on routes received from ISP A. To steer inbound traffic toward ISP A as well, it prepends its own AS twice on advertisements to ISP B, making that path look longer to the rest of the internet.",
  "tip": "Idle or Active means the session is not up; Active does not mean healthy. Remember the order Weight, Local preference, Originated, AS_PATH, Origin, MED, eBGP over iBGP. Weight and local preference are high-wins; AS_PATH length and MED are low-wins.",
  "check": [
   [
    "A BGP neighbor cycles between Active and Idle. Name two likely causes.",
    "The TCP session on port 179 cannot complete because of a wrong neighbor address or no route, or an ACL blocking TCP 179; or TCP completes but the OPEN is rejected because of a remote-as mismatch."
   ],
   [
    "Which attribute would you change to influence outbound path choice for the whole AS?",
    "Local preference, because it is shared among iBGP peers and higher is preferred."
   ],
   [
    "Why does a network statement sometimes fail to advertise a prefix?",
    "The exact prefix and mask must exist in the routing table; without a matching route it is not advertised."
   ]
  ]
 },
 {
  "t": "Policy-based routing with route maps",
  "body": [
   "Normal routing looks only at the destination address. Policy-based routing (PBR) lets you override that decision based on other criteria, such as the source address, the application or the packet size. You might send guest traffic out a cheap internet link while corporate traffic uses MPLS, or route a specific server's backups over a dedicated path.",
   "PBR is built with a route map. A route map is an ordered list of statements, each with a sequence number, an action (permit or deny) and optional `match` and `set` clauses. Statements are evaluated in sequence order; the first statement whose match clauses all succeed is applied. In PBR, a permit statement that matches means 'apply the set actions'; a deny statement that matches means 'do not policy-route this packet; use normal destination-based routing'. Packets that match no statement are also routed normally, because the implicit deny at the end of a route map, in PBR, simply means normal forwarding rather than dropping.",
   "Match criteria typically use an ACL: `match ip address 101` matches packets permitted by ACL 101. You can also match on packet length with `match length`. The set clause chooses what to do. `set ip next-hop 192.0.2.1` sends the packet to that next hop if it is directly connected and reachable. `set ip default next-hop` is used only if the routing table has no explicit route to the destination (other than the default route). `set interface` sends out a specific interface, best for point-to-point links. You can also set markings, such as `set ip precedence` or DSCP on some platforms.",
   "```\naccess-list 110 permit ip 10.10.50.0 0.0.0.255 any\n!\nroute-map GUEST-OUT permit 10\n match ip address 110\n set ip next-hop 198.51.100.1\n!\ninterface GigabitEthernet0/2\n ip policy route-map GUEST-OUT\n```",
   "The policy is applied inbound on the interface where traffic arrives with `ip policy route-map NAME`; it acts on packets as they enter, before the routing decision. Traffic generated by the router itself is not affected unless you use `ip local policy route-map NAME` globally.",
   "A key risk is black-holing traffic: if the configured next hop fails but its interface stays up, PBR may keep sending traffic there. Use `set ip next-hop verify-availability` with object tracking (for example an IP SLA probe) so the router falls back to normal routing, or to another next hop, when the tracked object goes down. PBR is also processed in hardware on most Catalyst switches, using TCAM, but complex policies can consume resources.",
   "Verify with `show route-map` (which shows match counters), `show ip policy` and `debug ip policy` in a lab. Remember that ACLs used for PBR only classify traffic; a deny in the ACL just means that packet does not match that statement."
  ],
  "terms": [
   [
    "Policy-based routing",
    "Forwarding packets based on criteria other than the destination, defined by a route map."
   ],
   [
    "Route map",
    "An ordered list of permit or deny statements with match and set clauses."
   ],
   [
    "set ip next-hop",
    "A PBR action that forwards matching packets to a specific directly connected next hop."
   ],
   [
    "ip policy route-map",
    "Interface command that applies PBR to packets arriving on that interface."
   ],
   [
    "ip local policy",
    "Applies PBR to traffic generated by the router itself."
   ]
  ],
  "example": "A branch wants guest Wi-Fi (10.10.50.0/24) to use the broadband link while everything else follows OSPF over MPLS. The engineer matches the guest subnet in ACL 110, sets the broadband gateway as next hop with verify-availability tied to an IP SLA track, and applies the route map inbound on the guest subinterface. When broadband fails, guest traffic falls back to normal routing.",
  "tip": "PBR is applied inbound on the ingress interface and is checked before the routing table. A packet that matches a deny statement or no statement is routed normally, not dropped.",
  "check": [
   [
    "What happens to a packet that does not match any statement in a PBR route map?",
    "It is forwarded using the normal routing table."
   ],
   [
    "What is the difference between set ip next-hop and set ip default next-hop?",
    "set ip next-hop overrides the routing table; set ip default next-hop is used only when there is no explicit route for the destination."
   ],
   [
    "On which interface and direction is PBR applied?",
    "Inbound, on the interface where the traffic enters the router."
   ]
  ]
 },
 {
  "t": "IP services: NTP and PTP, NAT and PAT, HSRP and VRRP",
  "body": [
   "Accurate time underpins logging, certificates, authentication and troubleshooting. NTP (Network Time Protocol, UDP port 123) synchronizes device clocks to a reference. Its hierarchy is measured in stratum: stratum 0 is a reference clock such as GPS or an atomic clock, a server directly attached to it is stratum 1, and each hop adds one. Lower stratum is closer to the source; 16 means unsynchronized. On IOS, `ntp server 192.0.2.10` makes the device a client, and `ntp master` makes it an authoritative source using its own clock. Protect NTP with authentication (`ntp authenticate`, `ntp authentication-key`, `ntp trusted-key`) and verify with `show ntp status` and `show ntp associations`. NTP typically achieves millisecond-level accuracy. PTP (Precision Time Protocol, IEEE 1588) achieves much higher precision, down to sub-microsecond, by using hardware timestamping in network interfaces. It elects a grandmaster clock with the best master clock algorithm, and switches can act as boundary clocks or transparent clocks that correct for their own delay. PTP matters for industrial automation, broadcast audio and video, and financial trading.",
   "NAT (Network Address Translation) rewrites IP addresses as packets cross a router, most often to let private RFC 1918 addresses reach the internet. Cisco uses four address terms: inside local (the host's real private address), inside global (the address the outside world sees for that host), outside global (the remote host's real address) and outside local (how the remote host appears inside, usually the same as outside global). Static NAT maps one inside address permanently to one global address, used for servers that must be reachable from outside. Dynamic NAT maps inside hosts to addresses from a pool on demand, one to one. PAT (Port Address Translation), also called NAT overload, maps many inside hosts to one global address by also translating source ports, and is how most networks share a single public address.",
   "```\ninterface Gi0/0\n ip nat inside\ninterface Gi0/1\n ip nat outside\n!\naccess-list 1 permit 10.0.0.0 0.255.255.255\nip nat inside source list 1 interface Gi0/1 overload\n```",
   "Verify with `show ip nat translations` and `show ip nat statistics`. Common mistakes are reversed inside and outside interfaces and an ACL that does not match the real source addresses.",
   "HSRP and VRRP provide first hop redundancy. HSRP is Cisco proprietary; one router is active and one standby, sharing a virtual IP. HSRP version 1 uses multicast 224.0.0.2 and virtual MAC 0000.0c07.acXX (XX is the group in hex); version 2 uses 224.0.0.102, supports more groups and IPv6, with MAC 0000.0c9f.fXXX. Default priority is 100; highest priority wins, and preemption is disabled by default, so a recovered router does not reclaim the role unless you configure `standby 1 preempt`. VRRP (RFC standard) has a master and backups, uses 224.0.0.18 and MAC 0000.5e00.01XX, allows the virtual IP to be a real interface address, and has preemption enabled by default. Both support tracking so an uplink failure lowers priority and triggers failover. Check with `show standby brief` or `show vrrp brief`."
  ],
  "terms": [
   [
    "Stratum",
    "NTP's distance from the reference clock; lower is more accurate, 16 means unsynchronized."
   ],
   [
    "PTP",
    "Precision Time Protocol (IEEE 1588): hardware-timestamped time sync with sub-microsecond accuracy."
   ],
   [
    "Inside local and inside global",
    "The host's real private address and the translated address the outside sees."
   ],
   [
    "PAT",
    "NAT overload: many inside hosts share one global address using different source ports."
   ],
   [
    "Preemption",
    "Allows a higher-priority FHRP router to take back the active or master role; off by default in HSRP, on in VRRP."
   ]
  ],
  "example": "After a power cut, the original HSRP active router reboots with priority 110 but stays in standby, and traffic keeps flowing through the backup router's slower uplink. The engineer adds `standby 10 preempt` on the primary, which then reclaims the active role once it is up.",
  "tip": "HSRP preemption is off by default; VRRP preemption is on. In NAT, inside local is the real private address and inside global is what the internet sees. NTP is millisecond class; PTP uses hardware timestamps for sub-microsecond accuracy.",
  "check": [
   [
    "What is the difference between static NAT and PAT?",
    "Static NAT is a permanent one-to-one mapping; PAT maps many inside hosts to one address by translating ports."
   ],
   [
    "Which FHRP is the open standard and what multicast address does it use?",
    "VRRP, using 224.0.0.18."
   ],
   [
    "What does a device with stratum 3 tell you?",
    "It is three hops from a reference clock: synchronized to a stratum 2 server."
   ]
  ]
 },
 {
  "t": "Multicast: IGMPv2/v3, PIM sparse mode, RP, RPF check, SSM",
  "body": [
   "Multicast sends one stream to many receivers without the source sending a separate copy to each. Receivers join a group, identified by a class D address in 224.0.0.0/4, and the network replicates packets only where paths toward interested receivers diverge. Common uses are video distribution, financial market data and software imaging. Multicast has two halves: hosts telling their local router they want a group, and routers building distribution trees between sources and receivers.",
   "IGMP (Internet Group Management Protocol) runs between hosts and their first-hop router. In IGMPv2, a host sends a membership report to join a group, the router periodically sends general queries to check for members, and a host sends a leave message when it is done, so the router can stop forwarding quickly after a group-specific query. IGMPv2 joins are (*,G): 'any source for group G'. IGMPv3 adds source filtering: a host can ask for traffic from a specific source to a group, (S,G), or exclude sources. IGMPv3 is required for Source-Specific Multicast. On switches, IGMP snooping listens to these messages so the switch forwards multicast only to ports with interested receivers instead of flooding the VLAN.",
   "Between routers, PIM (Protocol Independent Multicast) builds the trees. It is independent because it uses whatever unicast routing table exists rather than its own topology protocol. PIM sparse mode (PIM-SM) assumes receivers are sparse and uses explicit joins: nothing is forwarded until someone asks. It relies on a rendezvous point (RP), a router where sources and receivers meet. When a receiver joins, its router (the last-hop router) sends a (*,G) PIM join hop by hop toward the RP, building a shared tree (RPT). When a source starts sending, its first-hop router registers the traffic with the RP by encapsulating it in unicast PIM register messages; the RP then joins a tree toward the source. Once traffic flows, the last-hop router usually switches to the shortest path tree (SPT), sending an (S,G) join directly toward the source for a more efficient path. The RP can be configured statically with `ip pim rp-address`, or learned dynamically with Auto-RP (Cisco) or BSR (bootstrap router, standard). PIM dense mode, the older flood-and-prune approach, is rarely used.",
   "The RPF (reverse path forwarding) check prevents loops. When a multicast packet arrives, the router checks whether it came in on the interface the router would use to reach the source (or the RP, for shared tree traffic) according to the unicast routing table. If yes, it forwards; if not, it drops the packet. RPF failures are a common reason multicast does not work, usually because unicast routing is asymmetric or PIM is not enabled on the interface that unicast routing prefers.",
   "SSM (Source-Specific Multicast) simplifies everything: receivers use IGMPv3 to specify both source and group, and routers build an (S,G) shortest path tree directly to the source. No RP is needed, which removes a single point of failure and the register process. SSM uses the 232.0.0.0/8 range by default and is enabled with `ip pim ssm default`.",
   "Enable multicast routing with `ip multicast-routing` and `ip pim sparse-mode` on each interface. Check with `show ip mroute`, `show ip pim neighbor`, `show ip igmp groups` and `show ip rpf <source>`."
  ],
  "terms": [
   [
    "IGMP",
    "The protocol hosts use to join and leave multicast groups with their local router."
   ],
   [
    "PIM sparse mode",
    "A multicast routing protocol that forwards only after explicit joins, using an RP for shared trees."
   ],
   [
    "Rendezvous point",
    "The router where multicast sources register and receivers join the shared (*,G) tree."
   ],
   [
    "RPF check",
    "Forwarding a multicast packet only if it arrived on the interface used to reach its source."
   ],
   [
    "SSM",
    "Source-Specific Multicast: receivers request (S,G) with IGMPv3, trees go directly to the source, no RP; range 232.0.0.0/8."
   ]
  ],
  "example": "A video stream reaches the RP but not a remote site. `show ip mroute` on the remote router shows the (S,G) incoming interface as Null, and `show ip rpf` for the source points out an interface where PIM is not enabled. Enabling `ip pim sparse-mode` on that interface lets the RPF check pass and the stream flows.",
  "tip": "IGMP is host to router; PIM is router to router. (*,G) means shared tree through the RP; (S,G) means source tree. SSM needs IGMPv3 and no RP.",
  "check": [
   [
    "Why does SSM not need a rendezvous point?",
    "Receivers specify the source with IGMPv3, so routers can build (S,G) trees directly toward it without a meeting point."
   ],
   [
    "A multicast packet arrives on an interface that is not the router's best path back to the source. What happens?",
    "It fails the RPF check and is dropped."
   ],
   [
    "What does IGMP snooping do on a switch?",
    "It listens to IGMP messages so it forwards multicast only to ports with interested receivers instead of flooding the VLAN."
   ]
  ]
 },
 {
  "t": "Diagnose problems with debugs, conditional debugs, ping and traceroute",
  "body": [
   "Troubleshooting on ENCOR combines simple reachability tests with detailed protocol inspection. The skill being tested is choosing the right tool and using it safely on a production device.",
   "Ping sends ICMP echo requests and waits for echo replies. On Cisco IOS, each result has a character: '!' is a reply, '.' is a timeout, 'U' means destination unreachable was returned, 'Q' means source quench, 'M' means the packet could not be fragmented, and '?' is an unknown packet type. The extended ping (type `ping` alone, or use keywords) lets you set the source interface, packet size, repeat count and the don't-fragment bit. Sourcing from a LAN interface with `ping 10.2.2.2 source Loopback0` tests whether the return path exists for that subnet, which a default ping from the outgoing interface does not. Using `size 1500 df-bit` is how you find MTU problems on tunnels.",
   "Traceroute shows the path hop by hop. Cisco IOS sends UDP probes with increasing TTL starting at 1. Each router that decrements TTL to 0 returns an ICMP time exceeded message, identifying itself; the destination returns port unreachable, ending the trace. Windows `tracert` uses ICMP echo instead. In IOS output, '*' means no reply within the timeout, which can mean a filter or a router rate-limiting ICMP rather than a real failure; a trace that stops at a specific hop points to where to look next. Both ping and traceroute take `vrf NAME` when working inside a VRF.",
   "Debugs show real-time events from a process, such as `debug ip ospf adj` or `debug ip bgp updates`. They are powerful but dangerous: debug output is processed by the CPU, and on a busy router a broad debug such as `debug ip packet` can drive CPU to 100 percent and cause an outage. Good practice: prefer `show` commands first; send debug output to the log buffer rather than the console (`no logging console`, `logging buffered 64000 debugging`), view it with `show logging`; use `terminal monitor` to see it in an SSH session; always know how to stop it (`undebug all` or `u all`); and scope the debug as narrowly as possible. Enable `service timestamps debug datetime msec` so events are timestamped.",
   "Conditional debugging restricts output to what you care about. `debug condition interface GigabitEthernet0/1` limits supported debugs to that interface; `debug condition ip 10.1.1.10` limits them to a host. Many debugs also accept an ACL, as in `debug ip packet 100 detail`, which shows only packets matching ACL 100 (and note that `debug ip packet` only shows process-switched packets, not CEF-switched ones). Remove conditions with `undebug condition all` or `no debug condition all`.",
   "A structured method helps: define the problem, gather information with show commands, ping and traceroute, form a hypothesis, test it (perhaps with a narrow debug), fix, verify and document. Many ENCOR scenarios follow the OSI model, bottom up, confirming physical and data link before looking at routing."
  ],
  "terms": [
   [
    "Extended ping",
    "A ping that lets you choose the source, size, count and don't-fragment bit."
   ],
   [
    "Traceroute",
    "A tool that increments TTL on probes to list each Layer 3 hop to a destination."
   ],
   [
    "Conditional debug",
    "Debugging limited to a specific interface, address or other condition."
   ],
   [
    "undebug all",
    "Command that turns off all debugging immediately."
   ]
  ],
  "example": "Users in a branch cannot reach a server, but a ping from the branch router's WAN interface succeeds. The engineer runs `ping 10.9.9.9 source Gi0/1` from the LAN interface and it fails, revealing that the headquarters router has no route back to the branch LAN because the new subnet was never advertised.",
  "tip": "Always prefer show commands, send debug output to the buffer, scope debugs with conditions or ACLs, and know undebug all. In ping output, '.' is a timeout and 'U' is an unreachable message returned by a router.",
  "check": [
   [
    "Why source a ping from a LAN interface when testing branch connectivity?",
    "It tests that the far end has a route back to the LAN subnet, which a ping sourced from the WAN interface does not prove."
   ],
   [
    "How does IOS traceroute discover each hop?",
    "It sends UDP probes with increasing TTL; each router where TTL expires returns ICMP time exceeded, and the destination returns port unreachable."
   ],
   [
    "How can you limit debug output to one interface?",
    "Use debug condition interface followed by the interface name before enabling the debug."
   ]
  ]
 },
 {
  "t": "SNMP versions (v2c vs v3 authPriv), traps and polling",
  "body": [
   "SNMP (Simple Network Management Protocol) lets a network management system (NMS) monitor devices. Each device runs an SNMP agent that exposes data organized in a MIB (Management Information Base), a tree of objects each identified by an OID (object identifier), such as interface counters or CPU utilization. SNMP is still the most widely supported monitoring protocol, and ENCOR tests its versions, security and message types.",
   "There are two ways information flows. In polling, the NMS sends Get, GetNext or GetBulk requests to UDP port 161 on the agent and receives responses, usually on a schedule such as every five minutes, which gives regular performance graphs. A Set request changes a value, which is why write access is dangerous. In notifications, the agent sends an unsolicited message to the NMS on UDP port 162 when an event happens, such as a link going down. A trap is sent once with no acknowledgment, so it can be lost. An inform, available from v2c on, is acknowledged by the NMS and resent if not, making it reliable at the cost of more overhead. Polling gives trends; notifications give fast alerts. Most deployments use both.",
   "SNMPv1 and SNMPv2c authenticate with a community string sent in clear text. Anyone who captures a packet learns the string, and a read-write community lets them change configuration. SNMPv2c adds GetBulk, informs and 64-bit counters (important on fast interfaces, where 32-bit counters wrap quickly) but keeps the same weak security. If you must use v2c, use read-only communities, restrict them with an ACL, and never use default strings such as public or private.",
   "SNMPv3 adds real security through the user-based security model. It has three security levels. noAuthNoPriv uses a username only. authNoPriv adds authentication with a hash (HMAC with SHA or MD5; SHA variants are preferred), proving who sent the message and that it was not changed. authPriv adds privacy, encrypting the payload with AES (or DES in old deployments). authPriv is the recommended level. SNMPv3 also uses views to restrict which parts of the MIB a group can read or write.",
   "```\nsnmp-server view NMS-VIEW iso included\nsnmp-server group NMS-GRP v3 priv read NMS-VIEW access 10\nsnmp-server user nmsuser NMS-GRP v3 auth sha AuthPass123 priv aes 128 PrivPass123\nsnmp-server host 10.0.0.50 version 3 priv nmsuser\nsnmp-server enable traps\n```",
   "Here the group uses `priv`, which is authPriv; ACL 10 limits which hosts can query. Note that SNMPv3 users do not appear in the running configuration for security reasons; verify them with `show snmp user` and groups with `show snmp group`. For troubleshooting, check that the NMS and device agree on username, authentication and privacy protocols and passwords, and that UDP 161 and 162 are permitted along the path."
  ],
  "terms": [
   [
    "MIB and OID",
    "The structured database of manageable objects and the numeric identifier for each object."
   ],
   [
    "Community string",
    "The clear-text shared password used by SNMPv1 and v2c."
   ],
   [
    "Trap",
    "An unacknowledged notification sent by the agent to the NMS on UDP 162."
   ],
   [
    "Inform",
    "An acknowledged notification, retransmitted if the NMS does not confirm it."
   ],
   [
    "authPriv",
    "The SNMPv3 security level with both authentication and encryption."
   ]
  ],
  "example": "An audit finds routers using SNMPv2c with the community public and read-write access. The team migrates to SNMPv3 authPriv with SHA and AES, restricts polling to the monitoring server subnet with an ACL, removes the old communities, and changes link-down notifications to informs so alerts are not lost during congestion.",
  "tip": "Polling is NMS to agent on UDP 161; traps and informs are agent to NMS on UDP 162. Only SNMPv3 authPriv both authenticates and encrypts. Informs are acknowledged; traps are not.",
  "check": [
   [
    "What does SNMPv3 authNoPriv provide that noAuthNoPriv does not, and what does it still lack?",
    "It adds message authentication and integrity with a hash, but it does not encrypt the payload."
   ],
   [
    "Why might an inform be preferred over a trap?",
    "Informs are acknowledged and resent if lost, so critical events are more reliably delivered."
   ]
  ]
 },
 {
  "t": "Syslog severity levels and logging configuration",
  "body": [
   "Syslog is the standard way network devices report events: interfaces going up or down, neighbors changing state, configuration changes, security violations and hardware problems. Messages can be kept locally or sent to a central syslog server, where they can be searched, correlated and kept for audit. ENCOR expects you to know the severity levels by number and name and how to configure where messages go.",
   "Every message has a severity from 0 to 7, where lower numbers are more serious:",
   "```\n0 Emergencies    system is unusable\n1 Alerts         immediate action needed\n2 Critical       critical conditions\n3 Errors         error conditions\n4 Warnings       warning conditions\n5 Notifications  normal but significant\n6 Informational  informational messages\n7 Debugging      debug messages\n```",
   "A common mnemonic is 'Every Awesome Cisco Engineer Will Need Ice cream Daily'. When you set a logging level, the device sends messages at that level and every more severe level (lower number). For example, `logging trap warnings` sends levels 0 through 4 to the syslog server. An interface changing state is typically a level 3 (LINK-3-UPDOWN) message and line protocol changes are level 5 (LINEPROTO-5-UPDOWN).",
   "A Cisco message looks like `*Sep 25 10:15:02.123: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down`. The parts are a timestamp, then the facility (the component, here LINEPROTO), the severity number, a mnemonic (UPDOWN) and the description. A sequence number can be added with `service sequence-numbers`.",
   "Messages can go to several destinations, each with its own level. The console (`logging console <level>`) is on by default at debugging level, which can overwhelm a slow console line during an event, so many engineers raise it or disable it. The monitor destination (`logging monitor <level>`) sends messages to VTY sessions that have run `terminal monitor`. The buffer (`logging buffered <size> <level>`) keeps messages in RAM, viewed with `show logging`, and is lost on reload. The syslog server is set with `logging host 10.0.0.60` and its level with `logging trap <level>` (default informational). Syslog to a server uses UDP port 514 by default; some platforms support TCP or TLS transport for reliability and security.",
   "Good practice: make timestamps meaningful with `service timestamps log datetime msec localtime show-timezone` and synchronize clocks with NTP, otherwise correlating events across devices is guesswork. Set a consistent source address with `logging source-interface Loopback0` so the server sees one identity per device. Send informational or notifications-level messages to a central server, keep a local buffer for quick checks, and avoid sending debugging level to the server in production. `logging facility` sets the syslog facility (such as local7) that the server uses to sort messages. Use `show logging` to see the current configuration, counters per destination and the buffer contents.",
   "Remember that syslog over UDP is unacknowledged and unencrypted, so for important records combine it with SNMP notifications, reliable transport where supported, and protection of the management network."
  ],
  "terms": [
   [
    "Syslog severity",
    "A 0 to 7 scale where 0 is emergencies and 7 is debugging; lower is more severe."
   ],
   [
    "logging trap",
    "Sets the maximum severity level sent to syslog servers."
   ],
   [
    "logging buffered",
    "Stores log messages in device RAM for viewing with show logging."
   ],
   [
    "terminal monitor",
    "Displays log and debug messages in the current SSH or Telnet session."
   ],
   [
    "Facility",
    "The component or category of a message, such as LINEPROTO or OSPF, or the syslog facility like local7."
   ]
  ],
  "example": "An engineer investigating intermittent outages sets `logging trap notifications` and `logging host 10.0.0.60` on every switch, with NTP and millisecond timestamps. The syslog server then shows LINK-3-UPDOWN messages on the same distribution uplink across several switches within the same second, pointing to a failing optic.",
  "tip": "Setting a level includes every lower number. logging trap 4 (warnings) sends 0 to 4. Level 7 is debugging and level 0 is emergencies. Syslog uses UDP 514 by default.",
  "check": [
   [
    "Which severity levels are sent with logging trap errors?",
    "Levels 0 to 3: emergencies, alerts, critical and errors."
   ],
   [
    "Why should you configure NTP when using syslog?",
    "So timestamps across devices are accurate and events can be correlated."
   ],
   [
    "You are connected by SSH and see no log messages. What command is missing?",
    "terminal monitor."
   ]
  ]
 },
 {
  "t": "Flexible NetFlow: flow records, exporters and monitors",
  "body": [
   "SNMP tells you how much traffic crossed an interface; NetFlow tells you what that traffic was: who talked to whom, on which ports, how many packets and bytes. A flow is a set of packets sharing the same key fields, classically source and destination IP, source and destination port, protocol, type of service and input interface. The device tracks each flow in a cache and exports summarized records to a collector for analysis. NetFlow is used for capacity planning, application visibility, billing, and security, such as detecting scans, data exfiltration or unusual traffic patterns.",
   "Traditional NetFlow used a fixed set of key fields. Flexible NetFlow (FNF) lets you define exactly which fields identify a flow and which fields you collect about it. It is built from three components, configured in order and applied to an interface.",
   "The flow record defines the fields. `match` statements are key fields: a packet with a different value in any key field creates a new flow. `collect` statements are non-key fields gathered for each flow, such as byte and packet counters and timestamps. Cisco also provides predefined records, such as the traditional IPv4 record.",
   "The flow exporter defines where and how records are sent: the collector's destination address, the source interface, the transport (UDP) and port, and the export format. NetFlow version 9 is template-based, which makes flexible records possible; IPFIX (IP Flow Information Export) is the IETF standard based on version 9. Collectors commonly listen on UDP ports such as 2055 or 9996, and you must configure the port the collector expects.",
   "The flow monitor ties them together: it references a record and one or more exporters and sets cache parameters, such as active and inactive timeouts. The inactive timeout exports a flow that has been idle; the active timeout periodically exports long-running flows so the collector sees them before they end. Finally, apply the monitor to an interface in a direction.",
   "```\nflow record REC-APP\n match ipv4 source address\n match ipv4 destination address\n match transport source-port\n match transport destination-port\n match ipv4 protocol\n collect counter bytes\n collect counter packets\n!\nflow exporter EXP-COLL\n destination 10.0.0.70\n source Loopback0\n transport udp 2055\n export-protocol netflow-v9\n!\nflow monitor MON-APP\n record REC-APP\n exporter EXP-COLL\n!\ninterface GigabitEthernet0/1\n ip flow monitor MON-APP input\n```",
   "Verify with `show flow monitor MON-APP cache` to see flows on the device, `show flow exporter statistics` to confirm records are being sent, and `show flow record`. On very high-speed links, sampled NetFlow reduces load by examining only a fraction of packets, trading precision for scalability."
  ],
  "terms": [
   [
    "Flow",
    "A set of packets that share the same values in the defined key fields."
   ],
   [
    "Flow record",
    "Defines key fields (match) and non-key fields (collect) for Flexible NetFlow."
   ],
   [
    "Flow exporter",
    "Defines the collector destination, source, transport port and export format."
   ],
   [
    "Flow monitor",
    "Links a record and exporters with cache settings and is applied to an interface."
   ],
   [
    "IPFIX",
    "The IETF standard flow export protocol based on NetFlow version 9."
   ]
  ],
  "example": "A WAN link keeps saturating every afternoon. SNMP graphs only show that it is full. After applying a Flexible NetFlow monitor, the collector shows that most of the traffic is a single host sending large volumes to an unfamiliar external address on an unusual port, which the security team investigates as possible data exfiltration.",
  "tip": "Order of building: record, then exporter, then monitor that references both, then apply the monitor to an interface. Match fields are keys that define a flow; collect fields are just gathered data.",
  "check": [
   [
    "What is the difference between match and collect in a flow record?",
    "match defines key fields that distinguish flows; collect gathers additional data such as counters without creating new flows."
   ],
   [
    "Which component is applied directly to an interface?",
    "The flow monitor, with ip flow monitor NAME input or output."
   ]
  ]
 },
 {
  "t": "SPAN, RSPAN and ERSPAN",
  "body": [
   "Sometimes you need to see actual packets: to troubleshoot an application, feed an intrusion detection system (IDS) or record traffic for analysis. On a switched network, a device plugged into a random port only sees its own traffic and floods. Port mirroring solves this by copying traffic from one or more sources to a destination where a packet analyzer is connected. Cisco calls it SPAN (Switched Port Analyzer) and offers three variants depending on where the analyzer sits.",
   "Local SPAN copies traffic from source ports or VLANs to a destination port on the same switch. You choose the direction: `rx` (received), `tx` (transmitted) or `both`.",
   "```\nmonitor session 1 source interface Gi1/0/5 both\nmonitor session 1 destination interface Gi1/0/48\n```",
   "The destination port stops acting as a normal switch port: by default it does not forward incoming traffic and does not participate in spanning tree, so it is dedicated to the analyzer. If the analyzer needs to send traffic, for example an IDS sending TCP resets, some platforms allow `ingress` options on the destination. Mirroring a busy VLAN or several gigabit ports to one gigabit destination can oversubscribe it, and excess copies are dropped.",
   "RSPAN (Remote SPAN) carries mirrored traffic across Layer 2 to an analyzer on another switch. You create a special VLAN marked with `remote-span` in its VLAN configuration, and it must be allowed on every trunk between the switches. On the source switch the session's destination is `remote vlan <id>`; on the destination switch the session's source is `remote vlan <id>` and its destination is the analyzer port. RSPAN only works across a Layer 2 path, and the RSPAN VLAN uses trunk bandwidth, so plan capacity.",
   "ERSPAN (Encapsulated Remote SPAN) carries mirrored traffic across a Layer 3 network by encapsulating it in GRE. It is useful when the analyzer is in a different building or data center reachable only through routing. On the source device you configure an ERSPAN source session with the source ports, an ERSPAN ID, the destination IP address (the far device or directly an analyzer that can decapsulate GRE) and an origin IP address. On the far end, an ERSPAN destination session with the same ERSPAN ID decapsulates the traffic and sends it out a local port, or a capable analyzer receives it directly. Because it adds GRE and ERSPAN headers, watch MTU along the path.",
   "Keep in mind that mirroring is a copy, so mirrored traffic has no effect on the original flow, but it consumes switch resources and bandwidth. Mirrored copies of corrupted frames may not be forwarded, and SPAN is not guaranteed lossless under heavy load. Verify sessions with `show monitor session 1` or `show monitor session all`. Many IOS XE devices also offer Embedded Packet Capture (`monitor capture`) to capture traffic on the device itself without an external analyzer."
  ],
  "terms": [
   [
    "SPAN",
    "Switched Port Analyzer: local mirroring of source ports or VLANs to a destination port on the same switch."
   ],
   [
    "RSPAN",
    "Remote SPAN: mirrored traffic carried in a dedicated remote-span VLAN across Layer 2 trunks."
   ],
   [
    "ERSPAN",
    "Encapsulated Remote SPAN: mirrored traffic carried in GRE across a routed Layer 3 network."
   ],
   [
    "Destination port",
    "The port that receives mirrored copies for the analyzer; it no longer forwards normal traffic."
   ]
  ],
  "example": "Voice quality complaints come from a branch whose only analyzer is at headquarters, several routed hops away. The engineer configures an ERSPAN source session on the branch switch for the IP phone port and sends it to the headquarters switch, which decapsulates the GRE stream to a port with Wireshark attached, revealing heavy jitter from a misconfigured QoS policy.",
  "tip": "Same switch: SPAN. Different switch across Layer 2: RSPAN with a remote-span VLAN allowed on trunks. Across a routed network: ERSPAN with GRE.",
  "check": [
   [
    "Which SPAN type works when the analyzer is on the other side of a router?",
    "ERSPAN, because it encapsulates mirrored traffic in GRE for routing across Layer 3."
   ],
   [
    "What must you configure on the trunks for RSPAN to work?",
    "The RSPAN VLAN, created with the remote-span keyword, must be allowed on every trunk between source and destination switches."
   ]
  ]
 },
 {
  "t": "IP SLA probes and object tracking",
  "body": [
   "IP SLA (IP service level agreement) is a Cisco IOS feature that generates synthetic traffic to measure network performance continuously: reachability, round-trip time, jitter, packet loss and even application responses such as DNS or HTTP. Because the router actively probes, you can detect problems before users do and make routing decisions based on actual path health rather than just link state.",
   "An IP SLA operation defines what to send, where and how often. The most common is `icmp-echo`, which pings a target. `udp-jitter` sends UDP packets and measures delay, jitter and loss in each direction, which is ideal for voice; it needs an IP SLA responder on the far Cisco device (`ip sla responder`) to add timestamps. Other types include `tcp-connect`, `http`, `dns` and `udp-echo`.",
   "```\nip sla 10\n icmp-echo 203.0.113.1 source-interface GigabitEthernet0/0\n frequency 10\n threshold 500\n timeout 1000\nip sla schedule 10 life forever start-time now\n!\ntrack 1 ip sla 10 reachability\n delay down 10 up 30\n!\nip route 0.0.0.0 0.0.0.0 203.0.113.1 track 1\nip route 0.0.0.0 0.0.0.0 198.51.100.1 10\n```",
   "This probe pings the primary ISP's gateway every 10 seconds. An operation does nothing until it is scheduled, which is a frequent lab mistake. Results appear in `show ip sla statistics` and the configuration in `show ip sla configuration`.",
   "Object tracking connects measurements to actions. A track object watches something and reports up or down. It can follow an IP SLA operation's `reachability` (up if the operation succeeds) or `state` (up only if the return code is OK and, for some operations, within the threshold), an interface's line protocol (`track 2 interface Gi0/1 line-protocol`), or whether a route is in the routing table (`track 3 ip route 10.0.0.0 255.0.0.0 reachability`). Tracks can be combined with Boolean logic (`track 10 list boolean and`). The `delay` command dampens flapping by waiting before changing state.",
   "Clients of tracking include static routes (the route is removed when the track is down, letting a floating static with higher administrative distance take over, as in the example above), HSRP and VRRP (decrement priority when a tracked uplink or remote target fails, so the other router becomes active), PBR (`set ip next-hop verify-availability` with a track), and EEM applets that react to track changes.",
   "The key insight is that an interface can stay up while the path beyond it is broken. A broadband modem, for instance, keeps Ethernet up even when the ISP fails. Tracking the interface alone would miss that; tracking an IP SLA probe to a remote target catches it. Choose a target that truly represents the path, such as the ISP's next hop or a well-known remote address reachable only via that link, and source the probe from the correct interface. Check tracking with `show track`."
  ],
  "terms": [
   [
    "IP SLA operation",
    "A configured synthetic probe, such as icmp-echo or udp-jitter, that measures a path."
   ],
   [
    "IP SLA responder",
    "A Cisco device feature that answers and timestamps probes such as udp-jitter for accurate measurements."
   ],
   [
    "Track object",
    "An object whose up or down state follows an IP SLA, interface or route and is used by other features."
   ],
   [
    "Floating static route",
    "A backup static route with a higher administrative distance that is used only when the primary disappears."
   ]
  ],
  "example": "A branch router's primary ISP link stays physically up during a provider outage, so traffic is black-holed. After adding an icmp-echo IP SLA to the ISP gateway, a track object and a tracked default route, the router removes the primary default within seconds of the outage and the floating static via the LTE backup takes over.",
  "tip": "IP SLA operations must be scheduled with ip sla schedule or they never run. Tracking an interface misses failures beyond the link; tracking an IP SLA detects them.",
  "check": [
   [
    "Why use IP SLA tracking instead of interface tracking for an internet uplink?",
    "The interface can stay up while the provider path is down; an IP SLA probe to a remote target detects end-to-end failure."
   ],
   [
    "Which IP SLA operation measures jitter for voice, and what does it need on the far end?",
    "udp-jitter, which needs an IP SLA responder on the far Cisco device."
   ],
   [
    "How does a tracked static route provide failover?",
    "When the track goes down, the tracked route is removed from the routing table and a floating static route with higher administrative distance becomes active."
   ]
  ]
 },
 {
  "t": "Catalyst Center (formerly DNA Center) workflows: assurance, health scores, AI-driven insights",
  "body": [
   "Cisco Catalyst Center, formerly Cisco DNA Center, is the controller and management platform for enterprise campus and branch networks. It automates configuration, runs SD-Access, manages software images and, the focus here, provides assurance: continuous monitoring and analytics that tell you how well the network is serving users and applications, rather than only whether devices are up.",
   "The main workflows in the Catalyst Center interface follow a lifecycle. Design builds the network hierarchy of areas, buildings and floors, and defines network settings (DNS, DHCP, NTP, AAA servers), IP address pools, software image standards and templates. Policy defines group-based access, virtual networks and application QoS. Provision assigns devices to sites, pushes configuration and templates and sets up fabric roles. Assurance monitors everything and helps troubleshoot. Platform functions expose APIs and integrations.",
   "Assurance collects telemetry from many sources: model-driven streaming telemetry, SNMP, syslog, NetFlow, and data from wireless controllers and ISE. It correlates this data and presents it as health scores. Network health summarizes device health across the network; each device gets a score based on factors such as CPU and memory utilization, interface errors, link status and control plane reachability. Client health rates wired and wireless clients, for example by onboarding success (association, authentication, obtaining an IP address) and connection quality. Application health uses metrics such as latency, jitter and loss for business applications. Scores are shown on a scale (commonly 1 to 10) with color coding, so you can drill from a site with poor health down to the specific device, client or interface.",
   "Issues are detected problems, such as a device with high CPU, a client failing DHCP or an interface with errors. Each issue comes with impact, context and suggested actions. Catalyst Center can also run guided troubleshooting tools such as path trace, which calculates the path between two endpoints through the network and highlights where ACLs or interfaces may block traffic, and device 360 or client 360 views that show a timeline of an entity's history, letting you look back in time to what happened when a user reported a problem.",
   "AI-driven features, often grouped as AI network analytics, go beyond fixed thresholds. Instead of alerting only when a value crosses a static number, machine learning builds a dynamic baseline of what is normal for each site, time of day and device, then raises an issue when behavior deviates, which reduces both missed problems and noise. Other capabilities include comparative insights (how one site's performance compares with similar sites or peers), trend detection and root cause suggestions. Specific feature names and what is included depend on licensing and software release, so focus on the concepts: baselines, anomaly detection and correlation.",
   "For the exam, remember that assurance measures experience, correlates many telemetry sources, and presents health scores and actionable issues, while the design, policy and provision workflows handle intent and configuration."
  ],
  "terms": [
   [
    "Assurance",
    "Catalyst Center's monitoring and analytics function that measures network, client and application health."
   ],
   [
    "Health score",
    "A rating that summarizes the condition of a device, client, site or application from many metrics."
   ],
   [
    "Path trace",
    "A tool that computes the path between two endpoints and highlights blocking ACLs or problem interfaces."
   ],
   [
    "Dynamic baseline",
    "A machine-learned model of normal behavior used to detect anomalies instead of fixed thresholds."
   ]
  ],
  "example": "A help desk ticket says a user could not join the network at 9:15. The engineer opens Client 360 for the user's MAC address, scrolls the timeline back to 9:15 and sees repeated DHCP timeouts on one access switch. The issue list already flagged that the switch lost connectivity to the DHCP server because of an ACL change.",
  "tip": "Know the lifecycle names: Design, Policy, Provision, Assurance. Assurance questions revolve around health scores, issues with suggested actions, 360 views with time travel, path trace and AI baselines rather than static thresholds.",
  "check": [
   [
    "What advantage does a machine-learned baseline have over a static threshold?",
    "It learns what is normal for each context, so it detects unusual behavior that stays under fixed thresholds and avoids alerts for behavior that is normal there."
   ],
   [
    "Which Catalyst Center tool shows where an ACL blocks traffic between two hosts?",
    "Path trace."
   ]
  ]
 },
 {
  "t": "NETCONF and RESTCONF for configuration and operational data",
  "body": [
   "Screen-scraping CLI output is fragile: a new software version changes a column and your script breaks. Model-driven programmability replaces that with structured data defined by YANG models. NETCONF and RESTCONF are the two protocols ENCOR expects you to know for reading and changing that data on Cisco IOS XE devices.",
   "Both work with two kinds of data. Configuration data is what you can set: interfaces, routing, VLANs. Operational data is read-only state: interface counters, neighbor tables, CPU. YANG models describe both, and both protocols encode the data according to those models.",
   "NETCONF (Network Configuration Protocol, RFC 6241) runs over SSH on TCP port 830. It encodes messages in XML and uses remote procedure calls (RPCs). A session starts with both sides exchanging hello messages that list their capabilities, including the YANG models the device supports. Main operations are `get` (configuration and operational data), `get-config` (configuration from a specified datastore), `edit-config` (change configuration), `copy-config`, `delete-config`, `lock` and `unlock` (prevent others from changing a datastore while you work), and `commit` and `discard-changes` where a candidate datastore is supported. NETCONF has the concept of datastores: running (active configuration), startup and candidate (a scratch copy that you validate and then commit). Changes can be transactional: if any part fails, the whole change can be rejected. On IOS XE, enable it with `netconf-yang`, and a user with privilege 15 is required. Python's ncclient library is the usual client.",
   "RESTCONF (RFC 8040) provides a REST-like HTTP interface to the same YANG data. It runs over HTTPS, encodes data in JSON or XML, and maps operations to HTTP methods: GET to read, POST to create, PUT to create or replace, PATCH to merge changes, and DELETE to remove. Resources are addressed by URLs built from the YANG model path, for example the path `/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1` on the device's HTTPS address. Set the headers `Accept` and `Content-Type` to `application/yang-data+json` for JSON. On IOS XE, enable it with `restconf` plus the HTTPS server (`ip http secure-server`) and authentication. RESTCONF is easy to use from any HTTP tool, such as curl, Postman or Python requests.",
   "Choosing between them: NETCONF has richer transaction features (candidate datastore, locking, confirmed commits, validation) and is favored by orchestration systems that change many devices reliably. RESTCONF is simpler, stateless and familiar to web developers, and is ideal for quick reads and single changes, but it has no locking or candidate datastore. Both use the same YANG models, so the data looks the same whichever protocol you use.",
   "A related technology is model-driven telemetry, where the device streams YANG-modeled operational data to a collector on a schedule or on change, instead of being polled."
  ],
  "terms": [
   [
    "NETCONF",
    "An XML-based network management protocol over SSH port 830 that uses RPC operations and datastores."
   ],
   [
    "RESTCONF",
    "An HTTPS interface using GET, POST, PUT, PATCH and DELETE on YANG-modeled data encoded in JSON or XML."
   ],
   [
    "Datastore",
    "A copy of configuration, such as running, startup or candidate, that NETCONF operations act on."
   ],
   [
    "Capabilities exchange",
    "The NETCONF hello exchange in which each side lists the features and models it supports."
   ],
   [
    "edit-config",
    "The NETCONF operation that changes configuration in a datastore."
   ]
  ],
  "example": "An engineer writes a Python script with ncclient that connects to 200 switches on port 830, locks each candidate datastore, applies a new NTP server with edit-config, validates and commits. For a quick dashboard, a second script uses RESTCONF GET requests with JSON to read interface counters from the ietf-interfaces model.",
  "tip": "NETCONF: SSH, port 830, XML, RPC operations, datastores and locking. RESTCONF: HTTPS, JSON or XML, HTTP verbs, no candidate datastore or locking. Both are driven by YANG models.",
  "check": [
   [
    "Which port and transport does NETCONF use?",
    "TCP port 830 over SSH."
   ],
   [
    "Which HTTP method would you use in RESTCONF to merge a change into existing configuration without replacing it?",
    "PATCH."
   ],
   [
    "Name one capability NETCONF offers that RESTCONF lacks.",
    "Datastore locking or a candidate datastore with commit, allowing transactional changes."
   ]
  ]
 },
 {
  "t": "Device access control: line and local user authentication, SSH-only VTY access",
  "body": [
   "Every router and switch must be protected against unauthorized administrative access. ENCOR tests the basic building blocks on Cisco IOS: how the console and VTY lines authenticate users, how passwords are stored, and how to allow only SSH.",
   "Cisco devices have lines: the console line (`line con 0`) for direct serial access and virtual terminal lines (`line vty 0 4`, or `0 15` on many platforms) for remote Telnet or SSH. The simplest method is a line password: `password` plus `login` under the line. Everyone shares one password and there is no accountability, so it is only suitable for labs. A better method is local user accounts: `username admin privilege 15 secret <password>` creates a user, and `login local` under the line makes the device prompt for username and password and check the local database. Each administrator gets their own account, and logs can record who did what.",
   "Protect the privileged EXEC mode with `enable secret`, which is stored as a hash, rather than the old `enable password`. Use the `secret` keyword for usernames as well. Modern IOS XE supports strong hashing types such as type 8 (PBKDF2 with SHA-256) and type 9 (scrypt), selectable with `algorithm-type`; type 5 is MD5-based and older, and type 7, produced by `service password-encryption` for plain `password` commands, is a weak reversible encoding that only stops shoulder surfing. Never rely on type 7.",
   "Telnet sends everything, including passwords, in clear text, so SSH should be the only remote access method. Enabling SSH requires a hostname other than the default, a domain name, and an RSA key pair, plus user authentication:",
   "```\nhostname R1\nip domain name example.com\ncrypto key generate rsa modulus 2048\nip ssh version 2\nusername admin privilege 15 algorithm-type scrypt secret <password>\n!\nline vty 0 15\n login local\n transport input ssh\n exec-timeout 10 0\n access-class 10 in\n```",
   "`transport input ssh` blocks Telnet on the VTY lines. `ip ssh version 2` disables the weaker SSHv1. `exec-timeout` logs out idle sessions. `access-class 10 in` applies a standard ACL that limits which source addresses may connect to the VTY lines, typically only the management network. Also consider `login block-for` to slow down password guessing (temporarily blocking logins after repeated failures), `security passwords min-length`, and disabling unused services such as the HTTP server if not needed.",
   "Privilege levels range from 0 to 15. Level 1 is user EXEC and 15 is full privileged access; intermediate levels can be assigned specific commands, though role-based access through AAA is generally cleaner. For the console, apply `login local` and an `exec-timeout` too, since physical access is also a risk. Verify with `show ip ssh`, `show ssh` and `show users`. Local accounts remain important even with central AAA, as a fallback when the servers are unreachable."
  ],
  "terms": [
   [
    "VTY lines",
    "Virtual terminal lines used for remote Telnet or SSH management sessions."
   ],
   [
    "login local",
    "Line command that authenticates users against the device's local username database."
   ],
   [
    "enable secret",
    "The hashed password protecting privileged EXEC mode."
   ],
   [
    "transport input ssh",
    "Line command that permits only SSH for incoming remote sessions."
   ],
   [
    "access-class",
    "Applies an ACL to VTY lines to restrict which source addresses can connect."
   ]
  ],
  "example": "A security review finds switches reachable by Telnet from the user VLAN with a shared line password. The team creates individual local accounts with scrypt secrets, generates 2048-bit RSA keys, sets `transport input ssh`, applies `access-class` permitting only the management subnet and adds `exec-timeout 10 0` to every VTY and console line.",
  "tip": "SSH needs a hostname, domain name and RSA keys. Use access-class (not ip access-group) to filter VTY access. Type 7 passwords are reversible; prefer secret with type 8 or 9 hashing.",
  "check": [
   [
    "What four things must be in place before SSH works on IOS?",
    "A non-default hostname, an IP domain name, an RSA key pair and a user authentication method such as a local username with login local."
   ],
   [
    "Which command limits VTY access to the management subnet?",
    "access-class with a standard ACL applied inbound under line vty."
   ]
  ]
 },
 {
  "t": "AAA with TACACS+ and RADIUS, method lists and fallback",
  "body": [
   "Local accounts on every device do not scale: adding or removing an administrator means touching hundreds of devices. AAA centralizes this. It stands for authentication (who are you), authorization (what may you do) and accounting (what did you do). Devices send AAA requests to a central server, such as Cisco ISE, which checks credentials against a directory and returns decisions, while logging activity.",
   "Two protocols carry AAA. TACACS+ (Terminal Access Controller Access-Control System Plus) was developed by Cisco and is now documented as an informational RFC. It runs over TCP port 49, encrypts the entire packet body, and separates authentication, authorization and accounting into distinct exchanges. That separation lets you authorize each individual command an administrator types and log each command, which makes TACACS+ the preferred choice for device administration. RADIUS (Remote Authentication Dial-In User Service) is an open standard that runs over UDP, commonly ports 1812 for authentication and 1813 for accounting (older implementations used 1645 and 1646). It encrypts only the password field, combines authentication and authorization in one response, and has extensive support for network access, so it is the protocol for 802.1X, VPN and wireless user access. A useful summary: TACACS+ for administrators logging into devices, RADIUS for users and endpoints accessing the network.",
   "AAA configuration starts with `aaa new-model`, which enables AAA and immediately changes how lines authenticate, so have a local account ready before you type it. Then define servers and server groups, and method lists that say in what order to try authentication sources:",
   "```\naaa new-model\ntacacs server ISE1\n address ipv4 10.0.0.20\n key <shared-key>\naaa group server tacacs+ ADMIN-TAC\n server name ISE1\n!\naaa authentication login VTY-AUTH group ADMIN-TAC local\naaa authorization exec VTY-AUTH group ADMIN-TAC local\naaa authorization commands 15 VTY-AUTH group ADMIN-TAC local\naaa accounting commands 15 VTY-AUTH start-stop group ADMIN-TAC\n!\nline vty 0 15\n login authentication VTY-AUTH\n authorization exec VTY-AUTH\n authorization commands 15 VTY-AUTH\n accounting commands 15 VTY-AUTH\n```",
   "A method list is a named (or `default`) ordered list of methods. The `default` list applies automatically to all lines that do not specify a named list; a named list applies only where referenced. Methods are tried left to right, but fallback happens only on an error, meaning no response from the server. If the TACACS+ server is reachable and rejects the password, that is a failure, and the device does not try the next method; the login is denied. So in the example, `local` is used only when every server in ADMIN-TAC is unreachable. Common trailing methods are `local`, `enable` and, dangerously, `none`, which allows access with no authentication.",
   "Keep console access safe: many designs use a named list for VTY lines and keep the console on `local` or a list with local fallback so a network failure never locks you out. Set a source interface for AAA traffic (`ip tacacs source-interface Loopback0`) so the server recognizes the device. Verify with `show aaa servers`, `test aaa group ADMIN-TAC user pass legacy` and `debug aaa authentication` in a lab."
  ],
  "terms": [
   [
    "AAA",
    "Authentication, authorization and accounting: identifying users, controlling their actions and logging activity."
   ],
   [
    "TACACS+",
    "Cisco-developed AAA protocol on TCP 49 that encrypts the whole body and separates the three A's; best for device administration."
   ],
   [
    "RADIUS",
    "Open-standard AAA protocol on UDP 1812/1813 that encrypts only the password and combines authentication and authorization; used for network access."
   ],
   [
    "Method list",
    "An ordered list of authentication or authorization sources, applied by name or as default."
   ],
   [
    "Fallback",
    "Moving to the next method in a list, which happens only when a method returns an error such as no server response."
   ]
  ],
  "example": "During a WAN outage, a branch router cannot reach the TACACS+ servers. Because its VTY method list is `group ADMIN-TAC local`, the router falls back to the local break-glass account and the engineer can still log in. When the servers are reachable again, a colleague who mistypes her password is rejected outright rather than falling back to local.",
  "tip": "Fallback to the next method happens only on error (no response), never on a rejected password. TACACS+ equals TCP 49, full-body encryption, per-command authorization; RADIUS equals UDP, password-only encryption, 802.1X.",
  "check": [
   [
    "The TACACS+ server rejects a user's password. Will the device try the local database next?",
    "No; a rejection is a failure, not an error, so the method list stops and access is denied."
   ],
   [
    "Why is TACACS+ preferred for device administration?",
    "It separates authorization from authentication so every command can be authorized and accounted individually, and it encrypts the whole payload."
   ],
   [
    "What is the risk of typing aaa new-model without preparation?",
    "Line authentication immediately switches to AAA defaults, which can lock you out if no local user or method list is configured."
   ]
  ]
 },
 {
  "t": "Infrastructure security: standard and extended ACLs, placement and order",
  "body": [
   "Access control lists (ACLs) are ordered lists of permit and deny statements that routers and switches use to filter traffic. They are the most basic infrastructure security tool, protecting device access and separating network segments, and they also classify traffic for QoS, NAT, PBR and route filtering. ENCOR tests how they are built, how they are processed and where to apply them.",
   "A standard ACL matches only the source IP address. Numbered standard ACLs use 1 to 99 and 1300 to 1999. An extended ACL matches protocol, source and destination addresses, source and destination ports, and other fields such as TCP flags or ICMP types. Numbered extended ACLs use 100 to 199 and 2000 to 2699. Named ACLs (`ip access-list standard NAME` or `ip access-list extended NAME`) are clearer and let you insert or delete individual entries by sequence number, so they are preferred.",
   "```\nip access-list extended WEB-IN\n 10 permit tcp any host 10.1.1.10 eq 443\n 20 permit icmp any host 10.1.1.10 echo\n 30 deny ip any any log\n!\ninterface GigabitEthernet0/1\n ip access-group WEB-IN in\n```",
   "Addresses are matched with wildcard masks, where 0 means the bit must match and 1 means ignore it: `10.1.1.0 0.0.0.255` matches the whole /24, `host 10.1.1.10` equals a 0.0.0.0 wildcard and `any` matches everything.",
   "Processing order is critical. Entries are checked top to bottom and the first match wins; nothing further is checked. Every ACL ends with an invisible implicit `deny any` (for extended, `deny ip any any`), so any traffic not explicitly permitted is dropped. An ACL with only deny statements therefore blocks everything. Put more specific entries before more general ones: if `permit ip 10.0.0.0 0.255.255.255 any` comes before `deny ip host 10.1.1.50 any`, the deny is never reached. Named ACLs number entries in steps of 10 by default, so you can insert, for example, entry 15 between 10 and 20.",
   "An interface can have one ACL per protocol per direction. Inbound ACLs are checked before the routing decision; outbound ACLs after it. Outbound ACLs do not filter traffic generated by the router itself.",
   "Placement guidance: put extended ACLs as close to the source as possible, because they are specific enough to block only the unwanted traffic and they stop it before it uses bandwidth. Put standard ACLs as close to the destination as possible, because matching only the source would block that source from everything downstream if placed near it. Protect the device itself with `access-class` on VTY lines and with infrastructure ACLs at the network edge that block traffic addressed to your infrastructure addresses while permitting required protocols. Remember that ACLs used for filtering are stateless: return traffic needs its own permit (or use `established` for TCP, or a stateful firewall).",
   "Verify with `show access-lists` (hit counters per entry) and `show ip interface` (which ACLs are applied where)."
  ],
  "terms": [
   [
    "Standard ACL",
    "Matches only the source IP address; numbered 1-99 and 1300-1999."
   ],
   [
    "Extended ACL",
    "Matches protocol, source, destination and ports; numbered 100-199 and 2000-2699."
   ],
   [
    "Wildcard mask",
    "A mask where 0 bits must match and 1 bits are ignored."
   ],
   [
    "Implicit deny",
    "The invisible final entry in every ACL that drops anything not permitted."
   ],
   [
    "First match",
    "ACL processing stops at the first entry that matches the packet."
   ]
  ],
  "example": "An engineer adds `deny tcp any host 10.1.1.10 eq 23` to the end of an ACL whose earlier entry permits all TCP to that host, and Telnet still works. Because the first match wins, the permit catches the traffic first. Resequencing the deny as entry 5 fixes it, and the hit counters in `show access-lists` confirm the change.",
  "tip": "First match wins and every ACL ends with an implicit deny. Extended ACLs go near the source; standard ACLs go near the destination. Use access-class for VTY lines and ip access-group for interfaces.",
  "check": [
   [
    "Why should a standard ACL be placed close to the destination?",
    "It matches only the source, so placing it near the source would block that source from reaching every destination, not just the intended one."
   ],
   [
    "An ACL contains only deny statements. What does it do to other traffic?",
    "It blocks all traffic, because the implicit deny at the end drops everything not explicitly permitted."
   ],
   [
    "What does the wildcard 0.0.0.255 match with 172.16.5.0?",
    "Any address from 172.16.5.0 to 172.16.5.255."
   ]
  ]
 },
 {
  "t": "Control Plane Policing (CoPP)",
  "body": [
   "The route processor CPU handles routing protocols, management sessions and any packet punted from the data plane. It has limited capacity, so a flood of traffic aimed at the device, whether from an attack, a misconfiguration or a loop, can overwhelm it and cause routing adjacencies to drop. Control Plane Policing (CoPP) protects the CPU by applying a QoS policy to traffic headed to the control plane, limiting each category of traffic to a safe rate.",
   "CoPP uses the Modular QoS CLI you already know. You classify control plane traffic with ACLs and class maps, define a policy map with police actions per class, and attach the policy to the special `control-plane` interface instead of a physical interface:",
   "```\nip access-list extended COPP-ROUTING\n permit ospf any any\n permit tcp any any eq bgp\n permit tcp any eq bgp any\nip access-list extended COPP-MGMT\n permit tcp 10.99.0.0 0.0.0.255 any eq 22\n permit udp 10.99.0.0 0.0.0.255 any eq snmp\n!\nclass-map match-all CM-ROUTING\n match access-group name COPP-ROUTING\nclass-map match-all CM-MGMT\n match access-group name COPP-MGMT\n!\npolicy-map PM-COPP\n class CM-ROUTING\n  police 1000000 conform-action transmit exceed-action transmit\n class CM-MGMT\n  police 500000 conform-action transmit exceed-action drop\n class class-default\n  police 200000 conform-action transmit exceed-action drop\n!\ncontrol-plane\n service-policy input PM-COPP\n```",
   "Design classes by importance. Critical traffic such as routing protocols gets a generous rate, and some designs even transmit its excess so adjacencies are never harmed. Management traffic from trusted sources gets a moderate rate. Anything that does not match a defined class lands in class-default, which is policed tightly. Traffic you never expect to reach the CPU, such as management protocols from untrusted sources, can be classified and dropped. Note that in CoPP ACLs, `permit` means 'this traffic belongs to the class' and `deny` means 'not in this class'; the action comes from the policy map, not the ACL.",
   "Choosing rates requires knowing your baseline. Rates that are too low will drop legitimate hellos during normal bursts; rates that are too high give no protection. A safe approach is to deploy with exceed actions set to transmit, watch the counters with `show policy-map control-plane` to learn normal traffic levels, then tighten and change exceed actions to drop.",
   "Platform differences matter. On many Catalyst IOS XE switches, a system-defined CoPP policy (`system-cpp-policy`) is applied by default with preconfigured classes and hardware rate limiters, and you can adjust its rates rather than building your own from scratch. On routers, CoPP is typically configured manually as above.",
   "CoPP works alongside other controls: infrastructure ACLs at the edge block unwanted traffic before it reaches the device, `access-class` restricts VTY access, and features like routing protocol authentication protect the protocols themselves. CoPP is the last line of defense that keeps the CPU responsive when something gets through."
  ],
  "terms": [
   [
    "CoPP",
    "Control Plane Policing: an MQC policy applied to the control-plane interface that rate-limits traffic to the CPU."
   ],
   [
    "control-plane",
    "The special configuration mode representing the route processor, where the CoPP service policy is attached."
   ],
   [
    "class-default",
    "The catch-all class for traffic that matches no defined class, usually policed tightly in CoPP."
   ],
   [
    "Exceed action",
    "What a policer does with traffic above the configured rate, such as drop or transmit."
   ]
  ],
  "example": "A misconfigured monitoring server starts sending thousands of SNMP requests per second to a core router, and CPU climbs. Because CoPP polices SNMP in its management class and class-default, excess requests are dropped at the control plane, CPU stays moderate and OSPF adjacencies remain stable while the team fixes the server.",
  "tip": "CoPP is applied with service-policy input under control-plane. ACL permit only classifies traffic into a class; the police action decides whether it is dropped. Baseline first, then tighten.",
  "check": [
   [
    "Where is a CoPP policy attached?",
    "Under the control-plane configuration mode, with service-policy input."
   ],
   [
    "In a CoPP classification ACL, what does a deny entry mean?",
    "The traffic does not match that class and is evaluated against the next class; it is not dropped by the ACL."
   ],
   [
    "Why start CoPP deployment with exceed-action transmit?",
    "To measure normal control plane traffic without dropping anything, so rates can be set safely before enforcing drops."
   ]
  ]
 },
 {
  "t": "REST API security: HTTPS, tokens, secret handling",
  "body": [
   "Controllers such as Catalyst Center and SD-WAN Manager, and devices running RESTCONF, expose REST APIs that can read and change the entire network. Whoever holds valid API credentials effectively holds administrator access. ENCOR expects you to understand how these APIs are protected and how to handle credentials safely in automation.",
   "Transport security comes first. APIs should be reachable only over HTTPS, which uses TLS (Transport Layer Security) to encrypt requests and responses and to prove the server's identity with a certificate. Plain HTTP would expose credentials and tokens to anyone on the path. Clients should validate the server certificate against a trusted certificate authority. Disabling verification, for example with `verify=False` in Python requests, is common in labs with self-signed certificates but in production it allows man-in-the-middle attacks. The better fix is to install a certificate from your enterprise certificate authority on the controller or device, or to point the client at the correct CA bundle.",
   "Authentication methods vary. HTTP Basic authentication sends a base64-encoded username and password in the Authorization header on each request; base64 is encoding, not encryption, so it is only acceptable over HTTPS. Most controllers use token-based authentication instead: the client sends credentials once to an authentication endpoint and receives a token, then includes the token in subsequent requests. Catalyst Center, for example, returns a token from its authentication endpoint that you pass in the `X-Auth-Token` header. Tokens expire after a set time, limiting the damage if one leaks. Other schemes include API keys (long-lived secrets identifying an application), OAuth 2.0 bearer tokens (`Authorization: Bearer <token>`) with scopes, and session cookies with cross-site request forgery (CSRF) tokens, which SD-WAN Manager uses.",
   "Authorization should follow least privilege. Create service accounts for automation with only the roles they need, such as read-only for monitoring scripts, rather than reusing a personal administrator account. Controllers support role-based access control for this. Log and review API activity, and apply rate limiting and source address restrictions where possible.",
   "Secret handling is where most real-world failures happen. Never hard-code passwords, tokens or keys in scripts, and never commit them to version control; a secret pushed to a repository should be considered compromised and rotated even if deleted later. Instead, read secrets from environment variables, a protected configuration file excluded from the repository, or, best, a secrets manager or vault that provides access control, auditing and rotation. Mask secrets in logs and error messages. Rotate credentials periodically and immediately when someone leaves or a leak is suspected. Store tokens only in memory for the length of the job, and request a fresh one when they expire.",
   "Finally, validate input and handle errors: a 401 response means authentication failed or the token expired, and a 403 means the identity is authenticated but not permitted, which is a signal to check roles rather than retry."
  ],
  "terms": [
   [
    "HTTPS",
    "HTTP protected by TLS, encrypting traffic and authenticating the server with a certificate."
   ],
   [
    "Token authentication",
    "Exchanging credentials once for a time-limited token that is sent with later requests."
   ],
   [
    "Bearer token",
    "A token presented in the Authorization header; whoever holds it can use it."
   ],
   [
    "Least privilege",
    "Granting an account only the permissions its task requires."
   ],
   [
    "Secrets manager",
    "A system that stores credentials securely with access control, auditing and rotation."
   ]
  ],
  "example": "A developer's script for Catalyst Center contains an administrator password in plain text and is pushed to a shared Git repository. The team rotates the password, creates a read-only service account for the script, stores its credentials in the company vault, and changes the script to fetch them at runtime and request a fresh token for each run.",
  "tip": "Basic authentication is only encoded, not encrypted, so it needs HTTPS. 401 means authenticate again; 403 means you lack permission. A leaked secret must be rotated, not just deleted from the file.",
  "check": [
   [
    "Why is verify=False dangerous in production scripts?",
    "It disables certificate validation, allowing a man-in-the-middle to impersonate the API server and capture credentials or tokens."
   ],
   [
    "Why do token-based APIs improve on sending credentials with every request?",
    "Credentials are sent once; the token is time-limited and can be scoped, reducing exposure if it leaks."
   ],
   [
    "Name two safe places to keep API secrets for a script.",
    "Environment variables or, preferably, a secrets manager or vault; not in the script or repository."
   ]
  ]
 },
 {
  "t": "Network security design: threat defense, endpoint security, next-generation firewall",
  "body": [
   "No single product secures a network. Modern security design layers several controls so that if an attacker gets past one, others detect or stop them, an approach called defense in depth. ENCOR asks you to understand the roles of the main components in Cisco's enterprise security architecture and how they fit together.",
   "Threat defense covers the whole attack continuum: before an attack (reduce exposure through segmentation, hardening, access control and patching), during an attack (detect and block with firewalls, intrusion prevention and web and email security), and after an attack (investigate, contain and remediate, using telemetry and forensic data). A key design principle is that you should assume a breach will happen, so visibility into what is happening inside the network matters as much as the perimeter.",
   "Next-generation firewalls (NGFWs) go beyond traditional stateful firewalls, which filter by addresses, ports and connection state. An NGFW adds application visibility and control (identifying applications regardless of port), user identity awareness (policies by user or group, often from ISE or Active Directory), an integrated intrusion prevention system (IPS) that inspects traffic for exploit signatures and anomalous behavior, URL filtering by category and reputation, and advanced malware protection that checks files against threat intelligence and can sandbox unknown files. Many can also decrypt TLS traffic for inspection where policy and privacy rules allow. Cisco's current NGFW line is Cisco Secure Firewall, managed by a management center. NGFWs are placed at the internet edge, between data center segments and increasingly at branch sites.",
   "Endpoint security protects the devices themselves, since users can be attacked through email, web browsing or removable media wherever they are. Endpoint protection platforms combine antivirus, host firewalls and exploit prevention; endpoint detection and response (EDR) records endpoint activity to detect suspicious behavior and support investigation and containment, such as isolating an infected laptop. Cisco's offerings include Cisco Secure Endpoint (formerly AMP for Endpoints). Endpoint posture checks, enforced through network access control with ISE, can ensure a device has current patches and protection before it gets full access.",
   "Other pieces complete the picture. Network access control (802.1X and MAB with ISE) decides who and what may connect and assigns them to segments. Segmentation with VLANs, VRFs and TrustSec limits lateral movement. DNS-layer and secure web gateways, such as Cisco Umbrella, block malicious domains before a connection is made. Email security blocks phishing and malicious attachments. Network telemetry analysis, such as Cisco Secure Network Analytics (formerly Stealthwatch), uses NetFlow to baseline traffic and detect anomalies like data exfiltration inside the network. Security information and event management (SIEM) and extended detection and response (XDR) platforms correlate alerts across all these sources.",
   "When designing, combine these in layers, share context between them (for example ISE identity feeding firewall policy), and plan for visibility and response as well as prevention. Zero trust principles tie it together: verify every user and device, grant least privilege and inspect continuously rather than trusting anything inside the perimeter."
  ],
  "terms": [
   [
    "Defense in depth",
    "Layering multiple security controls so the failure of one does not expose the whole network."
   ],
   [
    "NGFW",
    "Next-generation firewall: a stateful firewall with application awareness, user identity, IPS, URL filtering and malware protection."
   ],
   [
    "IPS",
    "Intrusion prevention system: inspects traffic inline and blocks known attack patterns and anomalies."
   ],
   [
    "EDR",
    "Endpoint detection and response: records endpoint activity to detect, investigate and contain threats."
   ],
   [
    "Zero trust",
    "A model that never assumes trust based on network location and continuously verifies users and devices."
   ]
  ],
  "example": "A user clicks a phishing link. DNS-layer security blocks the malicious domain for most users, but one laptop connected through a hotel network is infected. Its EDR agent flags suspicious behavior and isolates it; when it later connects to the office, ISE posture assessment places it in a quarantine segment, and NetFlow analytics confirm no data left the network.",
  "tip": "The NGFW's distinguishing features are application awareness, identity-based policy and integrated IPS and malware inspection, on top of stateful filtering. Questions about an infected laptop outside the office point to endpoint security, not the perimeter firewall.",
  "check": [
   [
    "What does an NGFW add beyond a stateful firewall?",
    "Application identification and control, user identity-based policy, integrated IPS, URL filtering and malware protection."
   ],
   [
    "Why is endpoint security needed if you already have a strong perimeter firewall?",
    "Users and devices work outside the perimeter and threats arrive through email, web and removable media, so protection and detection must also run on the endpoint itself."
   ]
  ]
 },
 {
  "t": "Cisco TrustSec (SGT, SGACL) and MACsec",
  "body": [
   "Traditional access control ties policy to IP addresses and VLANs. As users move, addresses change and ACLs multiply, the policy becomes hard to manage. Cisco TrustSec replaces this with group-based segmentation: users and devices are classified into groups, and policy is written between groups. TrustSec is the policy plane of SD-Access but can also be deployed in a traditional network.",
   "TrustSec has three functions: classification, propagation and enforcement. Classification assigns a Scalable Group Tag (SGT, also called a Security Group Tag), a 16-bit number, to traffic from a user or device. Dynamic classification happens during 802.1X, MAB or WebAuth, when ISE returns the SGT as part of the authorization result. Static classification maps an SGT to an IP address or subnet, a VLAN or a port, which is useful for servers and devices that cannot authenticate.",
   "Propagation carries the SGT from where traffic enters to where policy is enforced. Inline tagging inserts the SGT into the frame in a Cisco metadata (CMD) field between switches that support it, and in SD-Access it rides in the VXLAN header. Where hardware cannot tag inline, the SGT Exchange Protocol (SXP) sends IP-to-SGT mappings over a TCP connection from a device that knows them to one that must enforce, so the enforcing device can look up the source's group from its IP address.",
   "Enforcement applies a Scalable Group ACL (SGACL), which is written as a policy between a source group and a destination group, for example Contractors to Finance-Servers deny, or Employees to Web-Servers permit HTTPS. These policies form a matrix defined centrally in ISE (or Catalyst Center with SD-Access) and downloaded to network devices. Enforcement usually happens at the egress point, near the destination, where the device knows both the source SGT (from the packet) and the destination group. Firewalls can also use SGTs in their rules. Because policy refers to groups, it does not change when addresses change, and the matrix is much smaller than equivalent IP ACLs.",
   "MACsec (IEEE 802.1AE) is a different but related TrustSec feature: it encrypts traffic at Layer 2, hop by hop, on each Ethernet link. Each frame is encrypted and integrity-protected (using AES-GCM) between two directly connected devices, then decrypted at the next device, which can inspect it, and re-encrypted on the next link. MACsec protects against wiretapping and tampering on cables and against man-in-the-middle insertion on a link. Keys are negotiated with MKA (MACsec Key Agreement, 802.1X-2010). Between switches, keys can come from a pre-shared key or 802.1X; between a host and a switch, 802.1X authentication with ISE drives key agreement, which requires a MACsec-capable supplicant. Because it works hop by hop at line rate in hardware, it does not hide traffic from the network devices themselves, unlike end-to-end encryption such as IPsec or TLS.",
   "Summarize the pair as: SGT and SGACL control who can talk to whom; MACsec protects the confidentiality and integrity of frames on each link."
  ],
  "terms": [
   [
    "SGT",
    "Scalable (Security) Group Tag: a 16-bit identifier that represents a user or device group."
   ],
   [
    "SGACL",
    "Scalable Group ACL: a permit or deny policy between a source SGT and a destination group."
   ],
   [
    "SXP",
    "SGT Exchange Protocol: shares IP-to-SGT mappings over TCP where inline tagging is not supported."
   ],
   [
    "MACsec",
    "IEEE 802.1AE hop-by-hop Layer 2 encryption and integrity protection on Ethernet links."
   ],
   [
    "MKA",
    "MACsec Key Agreement: the protocol that negotiates and distributes MACsec keys."
   ]
  ],
  "example": "A retailer must keep point-of-sale terminals away from guest and office devices across 100 stores. ISE assigns the POS SGT when terminals authenticate with MAB, older branch switches that cannot tag inline send mappings to the data center firewall with SXP, and a single SGACL policy blocks all other groups from reaching POS systems, while MACsec encrypts the uplinks between switches in shared wiring closets.",
  "tip": "Classification assigns the SGT, propagation carries it (inline tag or SXP), enforcement applies the SGACL, usually at egress. MACsec is hop-by-hop Layer 2 encryption, not end-to-end.",
  "check": [
   [
    "How does an enforcing switch learn the source SGT when upstream devices cannot tag inline?",
    "Through SXP, which sends IP-to-SGT mappings so the switch can derive the SGT from the source IP address."
   ],
   [
    "What does MACsec protect, and what does it not?",
    "It encrypts and integrity-protects frames on each link between devices, but traffic is decrypted inside each device, so it is not end-to-end encryption."
   ]
  ]
 },
 {
  "t": "Network access control: 802.1X, MAB and WebAuth",
  "body": [
   "Network access control decides who and what may connect to a switch port or wireless network, and what access they receive. Without it, anyone who plugs into a wall jack joins the network. Cisco's solution uses Cisco ISE as the policy server with three authentication methods on switches: 802.1X, MAB and WebAuth.",
   "IEEE 802.1X defines port-based access control with three roles. The supplicant is the software on the endpoint (built into Windows, macOS, Linux and phones). The authenticator is the switch or wireless controller. The authentication server is a RADIUS server such as ISE. The supplicant and switch exchange EAP (Extensible Authentication Protocol) messages over the LAN, called EAPOL (EAP over LAN). The switch relays them inside RADIUS to ISE. Until authentication succeeds, the port allows only EAPOL traffic. When ISE approves, it returns RADIUS Access-Accept with authorization attributes such as a VLAN, a downloadable ACL or an SGT, and the switch applies them. EAP methods include PEAP (Protected EAP, username and password inside a TLS tunnel), EAP-TLS (certificates on both sides, the strongest common option) and EAP-FAST.",
   "Many devices, such as printers, cameras and older IoT devices, have no supplicant. MAB (MAC Authentication Bypass) handles them: when the port gets no EAPOL response, the switch learns the device's MAC address from its first frame and sends it to ISE as the username in a RADIUS request. ISE checks it against an endpoint list or profiling data and authorizes it. MAB is weak authentication because MAC addresses are easy to spoof, so give MAB devices narrow access, and use ISE profiling to detect a device that claims a printer's MAC but behaves like a laptop.",
   "WebAuth (web authentication) redirects the user's browser to a login page, used mainly for guests and devices without supplicants. Local WebAuth serves the portal from the switch; Central WebAuth (CWA), more common, uses MAB first, then ISE returns a redirect URL and ACL so the switch sends the browser to the ISE guest portal. After login, ISE issues a change of authorization (CoA) to reapply the session with guest access.",
   "On the switch, you enable AAA with RADIUS, `dot1x system-auth-control`, and configure ports with `authentication port-control auto`, `dot1x pae authenticator` and `mab`. Order and priority decide which method runs first; the common approach tries 802.1X then falls back to MAB after a timeout. Host modes control how many devices a port allows: single-host, multi-host (first device authenticates for all), multi-domain (one data device and one voice device, typical for an IP phone with a PC behind it) and multi-auth (each device authenticates separately). Newer IOS XE uses Identity-Based Networking Services (IBNS) 2.0 policy maps for this configuration.",
   "Roll out carefully. Monitor mode (open authentication) lets you see what would fail without blocking anyone; low-impact mode then permits limited traffic before authentication; closed mode enforces strictly. Verify with `show access-session interface Gi1/0/5 details`."
  ],
  "terms": [
   [
    "Supplicant",
    "The 802.1X client software on the endpoint."
   ],
   [
    "Authenticator",
    "The switch or wireless controller that controls the port and relays EAP to the RADIUS server."
   ],
   [
    "EAPOL",
    "EAP over LAN: carries EAP messages between the supplicant and the switch."
   ],
   [
    "MAB",
    "MAC Authentication Bypass: authenticates devices without supplicants using their MAC address."
   ],
   [
    "Change of authorization",
    "A RADIUS message from ISE that tells the switch to re-authenticate or apply new policy to an active session."
   ]
  ],
  "example": "A conference room port is configured for 802.1X with MAB fallback and multi-domain mode. An IP phone authenticates by MAB into the voice domain, an employee laptop behind it uses PEAP and lands in the corporate VLAN, and a visitor's laptop without credentials fails 802.1X, falls back to MAB, and is redirected to the ISE guest portal through Central WebAuth.",
  "tip": "Know the three 802.1X roles: supplicant, authenticator, authentication server. EAPOL runs between endpoint and switch; RADIUS runs between switch and ISE. MAB is for devices with no supplicant and is weak because MACs can be spoofed.",
  "check": [
   [
    "What traffic does an 802.1X port allow before authentication?",
    "Only EAPOL (and, depending on mode, limited traffic defined by a pre-authentication ACL)."
   ],
   [
    "Which host mode supports an IP phone with a PC connected behind it?",
    "Multi-domain authentication, which allows one voice device and one data device."
   ],
   [
    "Why is MAB considered weak?",
    "MAC addresses can be easily spoofed, so MAB devices should get restricted access and be verified with profiling."
   ]
  ]
 },
 {
  "t": "Layer 2 protections: DHCP snooping, dynamic ARP inspection, IP source guard",
  "body": [
   "Layer 2 protocols such as DHCP and ARP were designed for trusted networks and have no authentication. An attacker on an access port can exploit that: a rogue DHCP server can hand out itself as the default gateway to intercept traffic, ARP spoofing can redirect traffic through the attacker (a man-in-the-middle), and IP spoofing can make an attacker's traffic appear to come from another host. Cisco switches provide three features that build on each other to stop these attacks.",
   "DHCP snooping acts as a firewall for DHCP. You mark ports as trusted or untrusted. Trusted ports are uplinks toward legitimate DHCP servers; all others are untrusted by default. On untrusted ports, the switch drops DHCP server messages (offers and acknowledgments), so a rogue server on a user port cannot answer clients. It can also rate-limit DHCP messages on untrusted ports to prevent starvation attacks that exhaust the address pool. As clients successfully obtain addresses, the switch builds the DHCP snooping binding table, recording each client's MAC address, IP address, VLAN, port and lease time. This table is what the other two features rely on.",
   "```\nip dhcp snooping\nip dhcp snooping vlan 10,20\ninterface GigabitEthernet1/0/48\n ip dhcp snooping trust\ninterface range GigabitEthernet1/0/1 - 24\n ip dhcp snooping limit rate 15\n```",
   "Dynamic ARP inspection (DAI) validates ARP packets on untrusted ports. For each ARP request or reply, the switch checks the sender's IP-to-MAC pairing against the DHCP snooping binding table and drops packets that do not match, blocking ARP spoofing and poisoning. Devices with static addresses, which are not in the binding table, need ARP ACLs to be permitted. Uplinks between switches are usually marked trusted with `ip arp inspection trust`. Enable DAI per VLAN with `ip arp inspection vlan 10,20`. Optional validation (`ip arp inspection validate src-mac dst-mac ip`) adds checks that addresses in the ARP body match the Ethernet header.",
   "IP source guard (IPSG) filters ordinary IP traffic on untrusted access ports. With `ip verify source` on an interface, the switch permits only traffic whose source IP (or both source IP and MAC, with `ip verify source port-security`) matches a binding for that port, taken from the DHCP snooping table or static bindings. Everything else is dropped, preventing a host from spoofing another address.",
   "The dependency chain is important: DAI and IP source guard both need the DHCP snooping binding table, so DHCP snooping must be enabled on the relevant VLANs first. A common lab problem is that DHCP stops working after enabling snooping because the uplink toward the server was not marked trusted, or because the switch inserts DHCP option 82 and the server or relay rejects it (fix with `no ip dhcp snooping information option` where appropriate). Verify with `show ip dhcp snooping`, `show ip dhcp snooping binding`, `show ip arp inspection` and `show ip verify source`. Violations are logged and, for rate-limit violations, the port can be err-disabled."
  ],
  "terms": [
   [
    "DHCP snooping",
    "Blocks DHCP server messages on untrusted ports and builds a binding table of legitimate leases."
   ],
   [
    "Binding table",
    "The DHCP snooping record of MAC, IP, VLAN and port for each client lease."
   ],
   [
    "Dynamic ARP inspection",
    "Drops ARP packets on untrusted ports whose IP-to-MAC mapping does not match the binding table."
   ],
   [
    "IP source guard",
    "Filters traffic on access ports so only sources matching the port's binding are allowed."
   ],
   [
    "Trusted port",
    "A port, usually an uplink or server port, exempt from DHCP snooping and DAI checks."
   ]
  ],
  "example": "A user plugs a home router into an office port and its DHCP server starts handing out 192.168.1.x addresses. With DHCP snooping enabled, the switch drops its offers on the untrusted port. Later, a tool on another machine sends forged ARP replies claiming the gateway's IP; DAI drops them because the MAC does not match the binding table, and a log message identifies the port.",
  "tip": "DHCP snooping comes first because DAI and IP source guard both use its binding table. Mark uplinks toward DHCP servers and other switches as trusted, or DHCP and ARP will break.",
  "check": [
   [
    "What happens to a DHCP offer received on an untrusted port with DHCP snooping enabled?",
    "The switch drops it, because server messages are allowed only on trusted ports."
   ],
   [
    "Which feature stops ARP poisoning, and what does it check against?",
    "Dynamic ARP inspection, which validates ARP IP-to-MAC pairs against the DHCP snooping binding table (or ARP ACLs for static hosts)."
   ]
  ]
 },
 {
  "t": "Python basics: variables, loops, functions, dictionaries, the requests library",
  "body": [
   "Python is the most common language for network automation because it is readable, runs everywhere, and has libraries for SSH, NETCONF and REST APIs. ENCOR does not expect you to be a developer, but you must be able to read a short script and predict what it does, especially one that calls a REST API.",
   "Variables hold values and do not need declared types. Common types are strings (`hostname = \"R1\"`), integers (`vlan = 10`), floats, booleans (`True`, `False`), lists (ordered collections, `vlans = [10, 20, 30]`, indexed from 0 so `vlans[0]` is 10) and dictionaries. Indentation is part of the syntax: the lines inside a loop, function or if statement must be indented consistently, usually four spaces.",
   "A dictionary stores key-value pairs and is how Python represents JSON objects. You read a value by key and can nest dictionaries and lists:",
   "```python\ndevice = {\"hostname\": \"SW1\", \"ip\": \"10.0.0.11\", \"vlans\": [10, 20]}\nprint(device[\"hostname\"])      # SW1\nprint(device[\"vlans\"][1])      # 20\ndevice[\"site\"] = \"Branch-5\"     # add a key\nprint(device.get(\"model\", \"unknown\"))  # unknown\n```",
   "Loops repeat work. A `for` loop iterates over a list or dictionary; a `while` loop repeats while a condition is true. Conditions use `if`, `elif` and `else`. Functions package reusable logic with `def`, take parameters and `return` a result:",
   "```python\ndef describe(dev):\n    return dev[\"hostname\"] + \" at \" + dev[\"ip\"]\n\ninventory = [{\"hostname\": \"R1\", \"ip\": \"10.0.0.1\"},\n             {\"hostname\": \"R2\", \"ip\": \"10.0.0.2\"}]\nfor dev in inventory:\n    if dev[\"hostname\"] != \"R2\":\n        print(describe(dev))    # R1 at 10.0.0.1\nfor key, value in inventory[0].items():\n    print(key, value)\n```",
   "The `requests` library makes HTTP calls simple. `requests.get(url, headers=..., auth=..., verify=...)` sends a GET; `requests.post(url, json=payload)` sends a POST with a JSON body. The returned response object has `status_code` (such as 200), `text` (the raw body), `json()` (the body parsed into Python dictionaries and lists) and `headers`. `raise_for_status()` raises an exception for 4xx and 5xx codes. In the example below, `user` and `password` would come from environment variables or a vault rather than being hard-coded, and `verify` points to the CA certificate so the server's identity is checked.",
   "```python\nimport os, requests\nBASE = os.environ[\"DEVICE_URL\"]  # the device's HTTPS address\nuser, password = os.environ[\"API_USER\"], os.environ[\"API_PASS\"]\nurl = BASE + \"/restconf/data/ietf-interfaces:interfaces\"\nheaders = {\"Accept\": \"application/yang-data+json\"}\nresp = requests.get(url, headers=headers, auth=(user, password), verify=\"ca.pem\")\nif resp.status_code == 200:\n    for intf in resp.json()[\"ietf-interfaces:interfaces\"][\"interface\"]:\n        print(intf[\"name\"], intf[\"enabled\"])\n```"
  ],
  "terms": [
   [
    "Variable",
    "A name bound to a value; Python infers its type."
   ],
   [
    "List",
    "An ordered, zero-indexed collection written in square brackets."
   ],
   [
    "Dictionary",
    "A collection of key-value pairs written in braces, equivalent to a JSON object."
   ],
   [
    "Function",
    "A reusable block defined with def that takes parameters and can return a value."
   ],
   [
    "requests",
    "A Python library for sending HTTP requests and handling responses."
   ]
  ],
  "example": "An engineer needs to know which of 50 switches run an outdated image. A short script loops over a list of device dictionaries, calls the controller's REST API for each with requests.get, reads the software version from resp.json(), and prints the hostnames whose version does not match the approved standard.",
  "tip": "Know how to index nested data: resp.json()['key'][0]['name'] means dictionary key, then first list element, then another key. List indexes start at 0. response.json() parses the body; response.status_code gives the HTTP code.",
  "check": [
   [
    "Given data = {'vlans': [10, 20, 30]}, what does data['vlans'][2] return?",
    "30, because list indexes start at 0."
   ],
   [
    "Which requests attribute tells you whether an API call succeeded?",
    "status_code, for example 200 for success (or call raise_for_status to raise on errors)."
   ],
   [
    "What does resp.json() return?",
    "The response body parsed from JSON into Python dictionaries and lists."
   ]
  ]
 },
 {
  "t": "JSON syntax and parsing JSON in Python",
  "body": [
   "JSON (JavaScript Object Notation) is the most common data format for REST APIs, including RESTCONF, Catalyst Center and SD-WAN Manager. It is plain text, easy for people to read and for programs to parse. ENCOR questions often show a JSON snippet and ask whether it is valid or how to extract a value.",
   "JSON has a small set of rules. An object is an unordered set of key-value pairs inside curly braces `{}`. Keys must be strings in double quotes, followed by a colon and a value, and pairs are separated by commas. An array is an ordered list of values inside square brackets `[]`, separated by commas. Values can be a string (always double quotes, never single), a number (no quotes, such as 10 or 1.5), a boolean (`true` or `false`, lowercase), `null`, an object or an array. Objects and arrays can nest to any depth.",
   "```json\n{\n  \"hostname\": \"core-sw1\",\n  \"managed\": true,\n  \"uptimeDays\": 142,\n  \"interfaces\": [\n    {\"name\": \"Gi1/0/1\", \"vlan\": 10, \"status\": \"up\"},\n    {\"name\": \"Gi1/0/2\", \"vlan\": null, \"status\": \"down\"}\n  ]\n}\n```",
   "Common validity mistakes that exam questions use: single quotes around strings or keys, a trailing comma after the last item in an object or array, missing commas between pairs, unquoted keys, comments (JSON has none), and Python-style `True`, `False` or `None` instead of `true`, `false` and `null`. Whitespace and indentation do not matter to validity.",
   "Python's built-in `json` module converts between JSON text and Python objects. `json.loads(text)` parses a JSON string into Python (loads means load string); `json.load(file)` reads from a file object. `json.dumps(obj, indent=2)` turns Python data into a JSON string, and `json.dump(obj, file)` writes to a file. The mapping is: object to dict, array to list, string to str, number to int or float, true and false to True and False, null to None.",
   "```python\nimport json\ndata = json.loads(raw_text)  # raw_text holds the JSON document above as a string\nprint(data[\"hostname\"])                 # core-sw1\nprint(data[\"interfaces\"][1][\"status\"])   # down\nup = [i[\"name\"] for i in data[\"interfaces\"] if i[\"status\"] == \"up\"]\nprint(up)                               # ['Gi1/0/1']\nprint(json.dumps({\"vlan\": 10, \"active\": True}))  # {\"vlan\": 10, \"active\": true}\n```",
   "When you use the requests library, `response.json()` does the `json.loads` step for you. To navigate nested data, read from the outside in: find the key of the outer object, notice whether its value is a list (use an index or loop) or another object (use a key), and repeat. If you ask for a key that does not exist, Python raises a `KeyError`, and `dict.get()` returns a default instead."
  ],
  "terms": [
   [
    "JSON object",
    "Key-value pairs in curly braces with double-quoted string keys; maps to a Python dict."
   ],
   [
    "JSON array",
    "An ordered list of values in square brackets; maps to a Python list."
   ],
   [
    "json.loads",
    "Parses a JSON string into Python objects."
   ],
   [
    "json.dumps",
    "Serializes Python objects into a JSON string."
   ],
   [
    "null",
    "JSON's empty value, which becomes None in Python."
   ]
  ],
  "example": "A script that builds a JSON payload for a controller fails with a 400 Bad Request. Printing the payload shows the engineer built the string by hand with single quotes and a trailing comma. Replacing it with a Python dictionary passed through json.dumps (or requests' json= parameter) produces valid JSON and the call succeeds.",
  "tip": "Valid JSON uses double quotes only, lowercase true, false and null, and no trailing commas or comments. loads and dumps work with strings; load and dump work with files.",
  "check": [
   [
    "Is {'name': 'R1'} valid JSON?",
    "No; JSON strings and keys must use double quotes."
   ],
   [
    "What Python type does a JSON array become after json.loads?",
    "A list."
   ],
   [
    "Given the example document, how do you get the vlan of the first interface?",
    "data['interfaces'][0]['vlan'], which returns 10."
   ]
  ]
 },
 {
  "t": "YANG data models and how NETCONF and RESTCONF use them",
  "body": [
   "YANG (Yet Another Next Generation, RFC 7950) is a data modeling language. A YANG model does not hold configuration itself; it defines the structure, names, data types and constraints of configuration and operational data, like a schema. Because every tool agrees on the model, a script can set an interface description through NETCONF or RESTCONF and know exactly what field it is changing and what values are valid, without parsing CLI text.",
   "YANG models are built from a few node types. A container groups related nodes and has no value itself, like a folder. A leaf holds a single value of a defined type, such as a string, integer, boolean or enumeration. A leaf-list holds multiple values of one type, such as a list of DNS servers. A list holds multiple entries of a set of nodes, each identified by a key leaf, such as a list of interfaces keyed by name. Models also define types (typedef), reusable groups of nodes (grouping and uses), constraints such as ranges and patterns, and whether data is configuration (`config true`) or state (`config false`, operational data).",
   "```\ncontainer interfaces {\n  list interface {\n    key \"name\";\n    leaf name { type string; }\n    leaf description { type string; }\n    leaf enabled { type boolean; default true; }\n  }\n}\n```",
   "There are several families of models. IETF models are standards-based and vendor-neutral, such as `ietf-interfaces` and `ietf-ip`. OpenConfig models are written by a group of network operators to be vendor-neutral and operationally focused. Native (vendor) models, such as Cisco's `Cisco-IOS-XE-native`, cover every feature the platform supports, including ones the standard models do not. Standard models make scripts portable; native models give full coverage. Devices advertise the models they support, and you can explore them with tools such as pyang, which prints a model as a tree, or Cisco's YANG Suite.",
   "NETCONF and RESTCONF are the transports that carry data defined by YANG. NETCONF encodes it in XML inside RPCs over SSH, with XML namespaces identifying the model; the capabilities exchanged in the hello message list supported models. A NETCONF `get-config` with a subtree filter selects part of a model. RESTCONF encodes it in JSON or XML over HTTPS, and the URL path follows the model tree: `/restconf/data/` plus module name, colon, top-level node, then child nodes, with list keys given after an equals sign. For example `/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1/description` addresses the description leaf of one interface. In JSON, the top-level key is qualified with the module name, as in `\"ietf-interfaces:interfaces\"`.",
   "The key idea for ENCOR is the separation of concerns: YANG is the model (what the data looks like), XML or JSON is the encoding (how it is written), and NETCONF or RESTCONF is the protocol (how it is transported and what operations are allowed)."
  ],
  "terms": [
   [
    "YANG",
    "A data modeling language that defines the structure and types of network configuration and state data."
   ],
   [
    "Container",
    "A YANG node that groups other nodes and holds no value itself."
   ],
   [
    "Leaf",
    "A YANG node holding a single typed value."
   ],
   [
    "List",
    "A YANG node with multiple entries, each identified by a key leaf."
   ],
   [
    "Native model",
    "A vendor-specific YANG model covering all platform features, such as Cisco-IOS-XE-native."
   ]
  ],
  "example": "An engineer wants to disable an interface through RESTCONF. Looking at the ietf-interfaces tree in pyang, she sees interfaces is a container, interface is a list keyed by name, and enabled is a boolean leaf. She sends a PATCH to /restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet2 with the JSON body setting enabled to false.",
  "tip": "Remember the layers: YANG is the model, XML or JSON is the encoding, NETCONF or RESTCONF is the transport. A list needs a key; a container does not.",
  "check": [
   [
    "What is the difference between a leaf and a leaf-list?",
    "A leaf holds one value; a leaf-list holds multiple values of the same type."
   ],
   [
    "How is a specific list entry identified in a RESTCONF URL?",
    "By appending an equals sign and the key value to the list name, for example interface=GigabitEthernet1."
   ],
   [
    "Why might you use a native model instead of an IETF model?",
    "Native models cover every platform feature, including ones the vendor-neutral models do not define."
   ]
  ]
 },
 {
  "t": "REST API methods and response codes (200, 201, 204, 400, 401, 403, 404, 500)",
  "body": [
   "REST (representational state transfer) is an architectural style for APIs built on HTTP. Resources, such as devices, sites or interfaces, are identified by URLs, and you act on them with standard HTTP methods. The server replies with a status code that tells you what happened. REST APIs are stateless: each request carries everything the server needs, including authentication.",
   "The main methods map to CRUD (create, read, update, delete) operations. GET reads a resource and should not change anything. POST creates a new resource, usually in a collection, or triggers an action; the server often assigns the new resource's identifier. PUT creates or replaces a resource at a known URL with the full representation you send; fields you omit may be removed. PATCH partially updates a resource, merging only the fields you send. DELETE removes a resource. GET, PUT and DELETE are idempotent: repeating the same request has the same result as sending it once. POST is not idempotent; sending it twice may create two resources.",
   "A request consists of the method, the URL (often with query parameters after a `?`, such as `?family=Switches`), headers and, for POST, PUT and PATCH, a body. Important headers are `Content-Type`, which says what format the body is in (for example `application/json`), `Accept`, which says what format you want back, and authentication headers such as `Authorization` or `X-Auth-Token`.",
   "Status codes come in classes. 2xx means success: 200 OK is the general success with a body, typical for GET; 201 Created means a new resource was created, typical for POST (often with a Location header pointing to it); 202 Accepted means the request was accepted for asynchronous processing, which Catalyst Center uses for tasks; 204 No Content means success with no body, typical for DELETE or some PUT and PATCH calls. 3xx codes are redirects.",
   "4xx codes mean the client did something wrong. 400 Bad Request means the server could not understand the request, often malformed JSON or a missing required field. 401 Unauthorized means authentication is missing, invalid or expired, so get a new token or fix credentials. 403 Forbidden means the server knows who you are but you are not allowed to do this, a permissions or role problem, and re-authenticating will not help. 404 Not Found means the URL or resource does not exist, often a typo in the path or a wrong identifier. Other 4xx codes include 405 Method Not Allowed and 409 Conflict. 5xx codes mean the server failed: 500 Internal Server Error is a generic server-side fault, and 503 Service Unavailable means the service is temporarily unable to handle the request. With 5xx errors the request may be valid; the problem lies on the server.",
   "A good script checks the status code before using the body, handles 401 by refreshing the token, and logs 4xx and 5xx responses with the error message the API returns."
  ],
  "terms": [
   [
    "CRUD",
    "Create, read, update, delete: the basic operations mapped to POST, GET, PUT or PATCH, and DELETE."
   ],
   [
    "Idempotent",
    "Repeating the request has the same effect as sending it once; true of GET, PUT and DELETE."
   ],
   [
    "201 Created",
    "Success status indicating a new resource was created."
   ],
   [
    "401 vs 403",
    "401 means not authenticated or token invalid; 403 means authenticated but not permitted."
   ],
   [
    "Content-Type",
    "The header declaring the format of the request or response body."
   ]
  ],
  "example": "A script creating VLANs through a controller API receives 201 for the first call, then 401 an hour later. The token has expired, so the script requests a new token and retries. A later call to delete a site returns 403 because the service account has only the observer role, so the team adjusts the role instead of retrying.",
  "tip": "200 OK, 201 Created, 204 No Content; 400 malformed request, 401 authentication problem, 403 permission problem, 404 wrong URL or resource, 500 server fault. PUT replaces, PATCH merges.",
  "check": [
   [
    "A POST that creates a new device record succeeds. Which status code is most appropriate?",
    "201 Created."
   ],
   [
    "What is the practical difference between receiving 401 and 403?",
    "401 means you must authenticate or refresh your token; 403 means you are authenticated but lack permission, so retrying with the same identity will not help."
   ],
   [
    "Which method should you use to change one field of a resource without sending the whole object?",
    "PATCH."
   ]
  ]
 },
 {
  "t": "Catalyst Center Intent APIs: token authentication and common calls",
  "body": [
   "Catalyst Center exposes a northbound REST API, called the Intent API, that lets scripts and other systems do what you can do in the GUI: list devices, read health, query clients, run commands and provision. It is called intent-based because you describe what you want, such as 'give me the health of all sites', and Catalyst Center works out how to get it from the devices. The API is documented inside the product in its platform section and on Cisco's developer site.",
   "Authentication uses a token. First you send a POST request to the authentication endpoint, `/dna/system/api/v1/auth/token`, using HTTP Basic authentication with a Catalyst Center username and password. The response is JSON containing a `Token` value. For every following request, you send that token in the `X-Auth-Token` header. The token is valid for a limited time (Cisco documents a default of about one hour), after which the API returns 401 and you must request a new one.",
   "```python\nimport os, requests\nfrom requests.auth import HTTPBasicAuth\nBASE = os.environ[\"CC_URL\"]  # Catalyst Center HTTPS address\nuser, password = os.environ[\"CC_USER\"], os.environ[\"CC_PASS\"]\nr = requests.post(BASE + \"/dna/system/api/v1/auth/token\",\n                  auth=HTTPBasicAuth(user, password), verify=\"ca.pem\")\ntoken = r.json()[\"Token\"]\nheaders = {\"X-Auth-Token\": token, \"Content-Type\": \"application/json\"}\ndevs = requests.get(BASE + \"/dna/intent/api/v1/network-device\",\n                    headers=headers, verify=\"ca.pem\").json()\nfor d in devs[\"response\"]:\n    print(d[\"hostname\"], d[\"managementIpAddress\"], d[\"softwareVersion\"])\n```",
   "Intent API paths start with `/dna/intent/api/v1/`. Common calls include `network-device` (the inventory, with query parameters to filter by hostname, family or platform, and a device ID you can use in other calls), `site` (the site hierarchy), `network-health` and `site-health` (the assurance health scores), `client-health` and `client-detail` (client experience), `topology` endpoints (physical and Layer 2 or Layer 3 topology), and `interface` endpoints. Most responses wrap results in a `response` key, so you read `json()[\"response\"]` first.",
   "Some operations take time, such as running CLI commands with the command runner (`network-device-poller/cli/read-request`), provisioning or template deployment. These are asynchronous: the API replies immediately (often with 202 Accepted) and returns a `taskId`. You then poll the task endpoint, `/dna/intent/api/v1/task/{taskId}`, until it reports completion, and read the result, which may point to a file ID containing command output that you fetch from the file endpoint. Design your scripts to wait and poll rather than assuming the work finished instantly.",
   "Beyond the Intent API, Catalyst Center offers event notifications (webhooks) that push assurance issues to external systems such as ITSM tools, and integration APIs. For security, use a dedicated account with the minimum role needed, keep credentials out of the code, and validate the server certificate. Exact endpoints evolve between releases, so check the API documentation for your version."
  ],
  "terms": [
   [
    "Intent API",
    "Catalyst Center's northbound REST API for querying and configuring the network in terms of desired outcomes."
   ],
   [
    "X-Auth-Token",
    "The HTTP header that carries the Catalyst Center token on each API request."
   ],
   [
    "Token endpoint",
    "POST /dna/system/api/v1/auth/token with Basic authentication, returning a time-limited token."
   ],
   [
    "taskId",
    "The identifier returned by an asynchronous operation, polled via the task API to get its status and result."
   ]
  ],
  "example": "Every morning a script authenticates to Catalyst Center, calls the site-health endpoint, and posts any site with a health score below target to the operations chat channel. When a site looks bad, it runs a show command on that site's switches through the command runner, polls the returned taskId and attaches the output.",
  "tip": "Token first: POST to /dna/system/api/v1/auth/token with Basic auth, then send X-Auth-Token on every call. Long-running actions return a taskId to poll, not the final result.",
  "check": [
   [
    "Which header carries the Catalyst Center token?",
    "X-Auth-Token."
   ],
   [
    "A command runner request returns immediately with a taskId. What do you do next?",
    "Poll the task endpoint with that taskId until it completes, then retrieve the result, such as the output file."
   ]
  ]
 },
 {
  "t": "SD-WAN Manager REST APIs",
  "body": [
   "Cisco Catalyst SD-WAN Manager (formerly vManage) exposes a REST API that covers nearly everything in its GUI: device inventory, monitoring statistics, alarms and events, templates and configuration groups, policies and software upgrades. It is the single programmable entry point to the whole SD-WAN fabric, because WAN Edges are managed through the Manager rather than individually.",
   "API paths start with `/dataservice/` on the Manager's HTTPS address. Authentication is session-based rather than using a simple token header. First, you send a POST to `/j_security_check` with form-encoded fields `j_username` and `j_password`. If successful, the Manager returns a session cookie named JSESSIONID, which the client must send on later requests. A requests Session object handles this automatically. Second, for any request that changes something (POST, PUT, DELETE), you need a cross-site request forgery (CSRF or XSRF) token: send a GET to `/dataservice/client/token` and include the returned value in an `X-XSRF-TOKEN` header. Some newer releases also support other token-based methods, but the session cookie plus XSRF token pattern is the one to know.",
   "```python\nimport os, requests\ns = requests.Session()\nBASE = os.environ[\"MANAGER_URL\"]  # SD-WAN Manager HTTPS address\nuser, password = os.environ[\"MANAGER_USER\"], os.environ[\"MANAGER_PASS\"]\ns.post(BASE + \"/j_security_check\",\n       data={\"j_username\": user, \"j_password\": password}, verify=\"ca.pem\")\nxsrf = s.get(BASE + \"/dataservice/client/token\", verify=\"ca.pem\").text\ns.headers.update({\"X-XSRF-TOKEN\": xsrf, \"Content-Type\": \"application/json\"})\ndevices = s.get(BASE + \"/dataservice/device\", verify=\"ca.pem\").json()\nfor d in devices[\"data\"]:\n    print(d[\"host-name\"], d[\"system-ip\"], d[\"reachability\"])\n```",
   "A few things to notice. A failed login often still returns HTTP 200 but with an HTML login page instead of a cookie, so check the response content, not just the status code. Most monitoring responses wrap results in a `data` key, and field names use hyphens, such as `host-name` and `system-ip`. When you finish, log out (an endpoint such as `/logout`) to free the session, since the Manager limits concurrent sessions.",
   "The API is grouped into areas. Monitoring endpoints give device status, interface statistics, BFD session and tunnel health, control connections and OMP state for a device identified by system IP. Alarm and event endpoints report problems. Configuration endpoints manage templates, configuration groups and policies, and device action endpoints trigger operations such as software upgrades or reboots, which are asynchronous and return an ID you check for status. Real-time queries are sent to the device through the Manager and should be used sparingly because they load the device. The Manager includes built-in API documentation (often reachable from its help menu) that lists the endpoints for your release, which is the authoritative reference since paths change between versions.",
   "Typical automation uses include pulling inventory into a CMDB, exporting tunnel performance to a reporting system, auditing that every edge has the approved software version, and integrating alarms into ticketing. Follow the same security practices as any API: dedicated least-privilege accounts, secrets outside code, certificate validation and logging out."
  ],
  "terms": [
   [
    "/dataservice",
    "The base path of SD-WAN Manager REST API endpoints."
   ],
   [
    "j_security_check",
    "The login endpoint that accepts form-encoded username and password and returns a JSESSIONID cookie."
   ],
   [
    "JSESSIONID",
    "The session cookie that authenticates subsequent SD-WAN Manager API calls."
   ],
   [
    "X-XSRF-TOKEN",
    "Header carrying the CSRF token from /dataservice/client/token, required for POST, PUT and DELETE."
   ]
  ],
  "example": "An operations team wants a nightly report of WAN Edges that are unreachable or on an old software version. A script logs in through j_security_check, reads /dataservice/device, filters the data list on reachability and version, writes a CSV and logs out, without anyone opening the GUI.",
  "tip": "SD-WAN Manager uses a session cookie (JSESSIONID from j_security_check) plus an X-XSRF-TOKEN for changes; Catalyst Center uses X-Auth-Token. Don't mix them up.",
  "check": [
   [
    "What two credentials does a script need to send a POST to SD-WAN Manager?",
    "The JSESSIONID session cookie from logging in via j_security_check and the XSRF token in the X-XSRF-TOKEN header."
   ],
   [
    "Why check the content of the login response and not only its status code?",
    "A failed login can return HTTP 200 with an HTML login page instead of a valid session."
   ]
  ]
 },
 {
  "t": "Embedded Event Manager (EEM) applets",
  "body": [
   "Embedded Event Manager (EEM) is automation that runs on the Cisco IOS or IOS XE device itself. It watches for events and responds with actions, without an external server. It is useful for reacting instantly to problems, collecting diagnostic data at the moment something happens, and enforcing simple rules. EEM supports applets, written in configuration mode, and Tcl scripts; ENCOR focuses on applets.",
   "An applet has a name, one event (the trigger) and a set of actions. Common event detectors include `event syslog pattern` (a log message matching a regular expression), `event timer` (watchdog for a repeating interval, countdown for a one-time delay, cron for a schedule), `event track` (an object tracking state change, such as an IP SLA failing), `event interface` (an interface counter crossing a threshold), `event snmp` (an SNMP object crossing a threshold), `event cli pattern` (someone typing a command, which can even be blocked) and `event none` (run manually with `event manager run NAME`).",
   "Actions are labeled and run in sorted order of their labels, which are compared as strings, so labels such as 1.0, 2.0 and 10.0 can sort unexpectedly; many engineers use consistent formats such as 010, 020 and 030. Useful actions include `cli command` to run an EXEC or configuration command, `syslog msg` to write a log message, `mail` to send an email, `snmp-trap` to send a trap, `wait` to pause, and control flow with `if`, `foreach` and variables. When an applet runs CLI commands it needs to enter privileged mode itself, so the first CLI action is usually `enable`.",
   "```\nevent manager applet UPLINK-DOWN\n event syslog pattern \"Interface GigabitEthernet0/1, changed state to down\"\n action 010 cli command \"enable\"\n action 020 cli command \"show ip route | redirect flash:uplink-down.txt\"\n action 030 syslog priority critical msg \"Uplink Gi0/1 down, routing table saved\"\n```",
   "Another common pattern is scheduled work: `event timer cron cron-entry \"0 2 * * *\"` with an action that copies the running configuration to a server every night at 02:00. With `event track 1 state down`, an applet can shut a backup interface or change a route when an IP SLA probe fails.",
   "If AAA command authorization is configured, commands run by EEM are authorized too, so the applet may fail unless you configure `event manager session cli username NAME` with an account authorized to run them. Test applets with `event manager run` (for `event none` applets), check them with `show event manager policy registered` and `show event manager history events`, and use `debug event manager action cli` in a lab to see the commands being executed.",
   "EEM is best for local, fast, simple reactions. For fleet-wide configuration and complex logic, use off-box tools such as Ansible or Python with NETCONF and RESTCONF; the two approaches complement each other."
  ],
  "terms": [
   [
    "EEM",
    "Embedded Event Manager: on-device automation that runs actions when defined events occur."
   ],
   [
    "Applet",
    "An EEM policy written in configuration mode with one event and a set of actions."
   ],
   [
    "Event detector",
    "The EEM component that triggers an applet, such as syslog, timer, track or interface."
   ],
   [
    "action cli command",
    "An EEM action that runs a CLI command on the device."
   ]
  ],
  "example": "A router's CPU spikes for a few seconds every afternoon, and nobody is watching when it happens. The engineer creates an applet with an SNMP event on CPU utilization that runs `show processes cpu sorted` and `show interfaces` into a file on flash and writes a syslog message. The next day, the file shows exactly which process was busy.",
  "tip": "Every applet needs exactly one event and at least one action. Action labels run in sorted string order. Start CLI actions with 'enable', and watch for AAA command authorization blocking EEM commands.",
  "check": [
   [
    "Which event detector triggers an applet when a specific log message appears?",
    "event syslog pattern with a regular expression matching the message."
   ],
   [
    "How do you run an applet on demand?",
    "Configure it with event none and run it with event manager run followed by the applet name."
   ]
  ]
 },
 {
  "t": "Orchestration tools: agent-based (Puppet, Chef) vs agentless (Ansible)",
  "body": [
   "Configuration management and orchestration tools let you describe the desired state of many devices in files, keep those files in version control, and apply them consistently. Instead of logging into 300 switches, you change one file and run the tool. The main distinction ENCOR tests is how the tool reaches its targets: with an agent installed on each device or without one.",
   "Agent-based tools install software on every managed node. Puppet uses a Puppet agent that periodically contacts a Puppet server (pull model), sends facts about itself, receives a compiled catalog describing its desired state and enforces it. Policies are written in Puppet's declarative domain-specific language in files called manifests, grouped into modules. Chef also uses an agent, the Chef client (or Chef Infra client), that pulls configuration from a Chef server; configurations are recipes grouped into cookbooks, written in a Ruby-based language. Agent-based tools are strong for servers, continuously correcting drift because the agent checks in on a schedule. Their drawback for networking is that many network devices cannot run a third-party agent, and you must install, secure and maintain the agent everywhere. SaltStack (Salt) is another tool that typically uses agents called minions with a master, though it also offers an agentless SSH mode.",
   "Ansible is agentless. A control node connects to managed devices over existing protocols, SSH for Linux and network devices, and also NETCONF or HTTPS APIs, and pushes tasks to them (push model). Nothing extra is installed on the target. You describe the work in playbooks written in YAML. A playbook contains plays, which target groups of hosts from an inventory file, and each play contains tasks that call modules, such as `cisco.ios.ios_config`, `cisco.ios.ios_vlans` or `cisco.ios.ios_command`. Many modules are idempotent: they check current state and only change what differs, so running the playbook twice gives the same result. Variables and Jinja2 templates generate per-device configuration.",
   "```yaml\n- name: Ensure NTP server on branch routers\n  hosts: branch_routers\n  gather_facts: false\n  tasks:\n    - name: Configure NTP\n      cisco.ios.ios_config:\n        lines:\n          - ntp server 10.0.0.10\n```",
   "Because network devices already support SSH and APIs, and cannot usually host agents, Ansible has become the most widely used of these tools in networking. Its weaknesses are that it only acts when you run it (no continuous enforcement unless you schedule runs, for example with a controller such as Ansible Automation Platform) and that performance over SSH can be slower at very large scale.",
   "Summary: Puppet and Chef are agent-based and pull; Puppet uses manifests, Chef uses recipes and cookbooks in Ruby. Ansible is agentless and push, uses YAML playbooks, inventory files and modules, and connects over SSH or APIs."
  ],
  "terms": [
   [
    "Agent-based",
    "Management where software on each target pulls and enforces its configuration from a central server."
   ],
   [
    "Agentless",
    "Management where a control node connects over existing protocols such as SSH and pushes changes."
   ],
   [
    "Playbook",
    "An Ansible YAML file of plays and tasks applied to hosts from an inventory."
   ],
   [
    "Manifest",
    "A Puppet file that declares desired state in Puppet's language."
   ],
   [
    "Cookbook and recipe",
    "Chef's units of configuration, written in a Ruby-based language."
   ]
  ],
  "example": "A team needs to update SNMP settings on 400 Catalyst switches that cannot run third-party agents. They write an Ansible playbook with the ios_config module, list the switches in an inventory grouped by site, run it against one site as a test, then against all sites, and commit the playbook to Git for review.",
  "tip": "Ansible: agentless, push, YAML playbooks, SSH or API. Puppet: agent, pull, manifests. Chef: agent, pull, Ruby recipes and cookbooks. For network devices that cannot host agents, Ansible is the usual answer.",
  "check": [
   [
    "Why is Ansible popular for network automation?",
    "It is agentless, connecting over SSH or APIs that network devices already support, so nothing has to be installed on the devices."
   ],
   [
    "What language are Ansible playbooks written in?",
    "YAML."
   ],
   [
    "Which tools use a pull model with an agent?",
    "Puppet and Chef (and Salt in its usual minion mode)."
   ]
  ]
 },
 {
  "t": "AI in network operations: baselining, anomaly detection, AI-assisted troubleshooting and safe guardrails",
  "body": [
   "Networks produce far more telemetry than people can watch: interface counters, flow records, logs, client connection events, application performance data. AI and machine learning (ML) help turn that volume into useful signals. ENCOR v1.2 added AI to the automation domain, so you should understand what these techniques do, where they help and how to use them safely.",
   "Baselining is the foundation. Instead of a fixed threshold such as 'alert at 80 percent utilization', an ML model learns what is normal for each metric in its context: this site, this device, this time of day, this day of the week. A link that normally runs at 70 percent on Monday mornings is fine, while the same link at 40 percent at 3 a.m. might be unusual. Dynamic baselines adapt as patterns change and reduce both false alarms and missed problems.",
   "Anomaly detection flags behavior that deviates significantly from the baseline, such as a spike in DHCP failures at one site, unusual latency on one WAN path, or a host suddenly sending large volumes to a new destination. Detection is statistical, so it produces some false positives and false negatives; tuning sensitivity and feeding back which alerts were real improves results. Related capabilities include trend forecasting (predicting when a link or pool will run out of capacity), correlation (grouping many alerts that share one root cause into a single issue) and peer comparison (comparing a site with similar ones). Catalyst Center assurance and SD-WAN analytics apply these ideas.",
   "AI-assisted troubleshooting increasingly uses generative AI, such as a large language model (LLM) assistant, to let engineers ask questions in natural language: 'Why are clients at the Denver site failing to onboard?' The assistant can summarize issues, explain likely causes, retrieve relevant telemetry and documentation, and suggest commands or configuration changes. This speeds up investigation, especially for less experienced staff.",
   "These tools must be used with guardrails. LLMs can produce confident but wrong answers (hallucinations), such as nonexistent commands or incorrect causes, so every recommendation must be verified against real data and documentation. Keep a human in the loop for changes: AI can propose, but a qualified engineer approves, ideally through the normal change process with peer review, testing in a lab or on a limited scope first, and a rollback plan. Grant AI tools least-privilege access, starting read-only, and never give an assistant unrestricted write access to production devices. Protect data: do not paste credentials, keys or sensitive configuration into external AI services unless your organization has approved them and understands where the data goes. Keep audit logs of what the AI suggested and what was done. Watch for prompt injection, where malicious text in logs, tickets or documents tries to steer an AI agent into harmful actions, which is another reason for restricted permissions and human approval.",
   "The right mental model is that AI augments engineers: it handles scale and pattern recognition, and people provide judgment, context and accountability."
  ],
  "terms": [
   [
    "Baseline",
    "A learned model of normal behavior for a metric in its context, such as time of day and site."
   ],
   [
    "Anomaly detection",
    "Identifying behavior that deviates significantly from the baseline."
   ],
   [
    "Hallucination",
    "A confident but incorrect or fabricated output from a generative AI model."
   ],
   [
    "Human in the loop",
    "Requiring a qualified person to review and approve AI recommendations before changes are made."
   ],
   [
    "Prompt injection",
    "Malicious instructions hidden in input data that attempt to manipulate an AI system's behavior."
   ]
  ],
  "example": "An AI assistant reviewing assurance data reports that wireless onboarding failures at one branch rose sharply after 08:00 and suggests a DHCP scope may be exhausted. The engineer confirms in the DHCP server that the pool is full, rejects the assistant's suggested command because it does not exist on that platform, and expands the scope through the normal change process.",
  "tip": "Exam answers favor dynamic baselines over static thresholds, and human review, least privilege and verification over letting AI make unreviewed production changes. Treat AI output as a recommendation, not an authority.",
  "check": [
   [
    "Why is a dynamic baseline better than a static threshold for alerting?",
    "It learns normal behavior for each context, so it catches unusual values that stay under a fixed threshold and avoids alerts for levels that are normal at that time or place."
   ],
   [
    "Name three guardrails for using an AI assistant in network operations.",
    "Keep a human in the loop to approve changes, give the tool least-privilege (initially read-only) access, and verify its output against real data; also protect sensitive data and log actions."
   ]
  ]
 }
]);
