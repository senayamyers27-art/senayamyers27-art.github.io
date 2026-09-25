/* Juniper JNCIA-Junos JN0-106 — generated plan (no hand-written weeks). */
CertHub.register({
  id: "jncia-junos",
  vendor: "Juniper Networks (HPE)",
  name: "Juniper Networks Certified Associate, Junos (JNCIA-Junos)",
  short: "JNCIA-Junos",
  exam: "JN0-106",
  blurb: "Entry-level Juniper certification on networking basics, the Junos OS CLI, configuration, monitoring, routing and routing policy/firewall filters, for people starting on Juniper gear.",
  status: "check",
  statusNote: "Exam code JN0-106 (replaced JN0-105 in April 2026), the seven objective areas, 65 questions and 90 minutes come from search listings of Juniper's JNCIA-Junos page on Sept 24, 2026. The juniper.net page itself could not be opened from this environment, so re-check the objectives there. Juniper does not publish domain weights or the passing score: the weights here are estimates based on the number of objectives in each area.",
  lastVerified: "2026-09-24",
  notices: [],
  examInfo: { questions: "65 multiple choice", minutes: 90, pass: "Not published (Juniper does not disclose the cut score)" },
  examSim: { questions: 65, minutes: 90 },
  sources: [
    { label: "Juniper JNCIA-Junos certification page (exam JN0-106 objectives)", url: "https://www.juniper.net/us/en/training/certification/tracks/junos/jncia-junos.html" },
    { label: "Juniper Open Learning: JNCIA-Junos free course and practice exam", url: "https://learningportal.juniper.net/juniper/user_activity_info.aspx?id=EDU-JUN-WBT-JOL-JNCIA-JUNOS" }
  ],
  planWeeks: 8,
  hoursPerWeek: "5–7",

  domains: [
    {
      id: 1,
      name: "Networking fundamentals",
      w: 15,
      topics: [
        "Collision domains and broadcast domains, and how switches and routers divide them",
        "What routers and switches do: Layer 2 frame forwarding vs Layer 3 packet forwarding",
        "Ethernet frames, MAC addresses (48 bits, OUI) and the MAC learning/flooding process",
        "ARP: resolving an IPv4 next hop to a MAC address; gratuitous ARP; `show arp`",
        "IPv4 addressing: classes, private ranges, subnet masks, CIDR prefixes and subnetting math",
        "IPv6 addressing: 128-bit format, compression rules, global unicast, link-local (fe80::/10), multicast, EUI-64",
        "OSI and TCP/IP models; TCP vs UDP; well-known ports",
        "Class of service concepts: why traffic is classified, queued, scheduled and rewritten",
        "Junos default forwarding classes (best-effort, expedited-forwarding, assured-forwarding, network-control)",
        "Behavior aggregate (DSCP-based) vs multifield classification"
      ],
      notes: ["Objective 1: Networking fundamentals (includes CoS concepts)"],
      labs: [
        "Start two vJunos-router (free download from Juniper) instances in Containerlab or EVE-NG Community, address a shared link, ping across it and read `show arp no-resolve` on both.",
        "Subnet 172.16.0.0/22 by hand into /26 blocks, then assign three of them to vJunos interfaces and confirm the masks with `show interfaces terse`.",
        "Configure an IPv6 address with `eui-64` on a vJunos interface and compare the generated interface ID with the interface MAC shown in `show interfaces`."
      ]
    },
    {
      id: 2,
      name: "Junos OS fundamentals",
      w: 15,
      topics: [
        "Junos OS as one modular OS across routing, switching and security platforms",
        "Separation of control plane and forwarding plane",
        "Routing Engine (RE): runs the CLI, routing protocols, builds the routing and forwarding tables",
        "Packet Forwarding Engine (PFE): forwards transit traffic using the forwarding table copied from the RE",
        "Key daemons: rpd (routing), mgd (management/CLI), dcd (interfaces), chassisd (chassis)",
        "Transit traffic vs exception (host-bound) traffic and why exception traffic is rate-limited to the RE",
        "Junos OS vs Junos OS Evolved (FreeBSD-based vs Linux-based)",
        "Protecting the RE with a filter on the lo0 interface",
        "Boot sequence and storage: primary/backup media, snapshots"
      ],
      notes: ["Objective 2: Junos OS fundamentals"],
      labs: [
        "On a vJunos-router, run `show system processes extensive | match \"rpd|mgd|dcd|chassisd\"` and write one line on what each daemon does.",
        "Compare `show route` (RE routing table) with `show route forwarding-table` (what is pushed to the PFE) for the same prefix.",
        "Use Juniper vLabs (free, browser-based) to open a Junos sandbox, run `show version` and `show chassis hardware`, and identify the RE and FPC components."
      ]
    },
    {
      id: 3,
      name: "User interfaces",
      w: 14,
      topics: [
        "CLI modes: operational (`>`) and configuration (`#`); entering with `configure`, `configure private`, `configure exclusive`",
        "Navigating the hierarchy: `edit`, `up`, `top`, `exit`, `exit configuration-mode`; the `[edit ...]` banner",
        "Command completion with Space and Tab; `?` for context help",
        "Help: `help topic`, `help reference`, `help apropos`",
        "Output filtering with pipes: `| match`, `| except`, `| find`, `| count`, `| no-more`, `| last`, `| save`",
        "`| display set`, `| compare`, `| display inheritance`",
        "Running operational commands from configuration mode with `run`",
        "Active vs candidate configuration",
        "J-Web GUI and enabling it with `system services web-management`",
        "Remote access: SSH, console, out-of-band management interface (fxp0/em0/me0)"
      ],
      notes: ["Objective 3: User interfaces"],
      labs: [
        "On vJunos, practice moving through `[edit interfaces ge-0/0/0 unit 0 family inet]` with `edit`, `up 2`, `top` and `exit`, watching the banner change.",
        "Run `show configuration | display set | match interfaces` and `show interfaces terse | except down | count` and explain each pipe.",
        "Enable J-Web over HTTPS on a vSRX evaluation image (60-day free trial) and compare the GUI's interface page with `show interfaces terse`."
      ]
    },
    {
      id: 4,
      name: "Configuration basics",
      w: 15,
      topics: [
        "Factory-default configuration and the root-password requirement before the first commit",
        "Initial configuration: host name, root authentication, users and login classes, management interface, static default route",
        "Interface naming (type-fpc/pic/port.unit), physical vs logical properties, unit 0, family inet/inet6",
        "Special interfaces: lo0, fxp0/em0/me0, irb",
        "Commit model: `commit check`, `commit confirmed`, `commit and-quit`, `commit comment`, `commit at`",
        "Rollback: `rollback n` (0–49), `show | compare rollback n`, rescue configuration",
        "Saving and loading: `save`, `load merge`, `load override`, `load replace`, `load set`, `load factory-default`",
        "Editing tools: `delete`, `deactivate`/`activate`, `annotate`, `copy`, `rename`, `insert`",
        "Configuration groups with `groups` and `apply-groups`, including wildcards",
        "System services: SSH, NTP, syslog, SNMP basics"
      ],
      notes: ["Objective 4: Configuration basics"],
      labs: [
        "Zeroize a vJunos-router (`request system zeroize`), then build an initial config: host name, root password, an admin user in class super-user, SSH, NTP and a management address.",
        "Make a risky change with `commit confirmed 3`, let it roll back on its own, then compare configurations with `show system commit` and `show | compare rollback 1`.",
        "Create a group that sets MTU on `<ge-*>` interfaces, apply it with `apply-groups`, and view the result with `show interfaces | display inheritance`."
      ]
    },
    {
      id: 5,
      name: "Operational monitoring and maintenance",
      w: 15,
      topics: [
        "Monitoring the platform: `show chassis hardware`, `show chassis alarms`, `show system alarms`, `show chassis routing-engine`, `show system storage`",
        "Monitoring interfaces: `show interfaces terse`, `extensive`, `monitor interface`, `monitor traffic interface`",
        "Network tools: ping, traceroute, SSH, telnet from the CLI",
        "System logging (`/var/log/messages`, `show log`) and protocol traceoptions",
        "Managing files: `file list`, `file show`, `request system storage cleanup`",
        "Software installation and upgrades with `request system software add`; snapshots",
        "Rebooting, halting and powering off safely: `request system reboot`, `halt`, `power-off`",
        "Root password recovery from the console using recovery (single-user) mode",
        "Saving and restoring a rescue configuration",
        "NTP, SNMP and remote syslog for ongoing operations"
      ],
      notes: ["Objective 5: Operational monitoring and maintenance"],
      labs: [
        "On vJunos, set `system syslog file changes change-log info`, commit a change, then read it with `show log changes` and filter it with `| last 5`.",
        "Configure `traceoptions` for OSPF to a file, bring an adjacency up, read the trace, and then remove the traceoptions to save disk space.",
        "Save a rescue configuration, break the config on purpose, then recover with `rollback rescue` and `commit`; practise the root-recovery console steps in a vLabs sandbox if available."
      ]
    },
    {
      id: 6,
      name: "Routing fundamentals",
      w: 14,
      topics: [
        "Packet forwarding decisions: longest-prefix match, next hops, active vs inactive routes (`*`)",
        "Routing tables: inet.0, inet6.0, inet.3, and instance tables such as vr1.inet.0",
        "Route preference values: direct/local 0, static 5, OSPF internal 10, RIP 100, aggregate/generated 130, OSPF external 150, BGP 170",
        "Routing instances: virtual-router, forwarding and VRF types",
        "Static routes: `routing-options static`, next-hop, qualified-next-hop with preference (floating routes), discard and reject",
        "Default routes and summarization (aggregate routes)",
        "Dynamic routing concepts: why IGPs and EGPs exist, OSPF and BGP at a high level",
        "Reading `show route`, `show route detail`, `show route protocol`, `show route table`"
      ],
      notes: ["Objective 6: Routing fundamentals"],
      labs: [
        "Connect three vJunos-routers in a line, add static routes so the end loopbacks can ping each other, and check `show route protocol static`.",
        "Add a floating static default route with `qualified-next-hop ... preference 20`, disable the primary link and watch the backup become active.",
        "Create a virtual-router routing instance, place an interface in it and compare `show route table inet.0` with `show route table <name>.inet.0`."
      ]
    },
    {
      id: 7,
      name: "Routing policy and firewall filters",
      w: 12,
      topics: [
        "Routing policy uses: import (into the routing table) and export (out of the routing table)",
        "Default policies: BGP accepts and advertises active BGP routes; OSPF import accepts all and export rejects all; RIP export rejects all",
        "Policy structure: terms, `from` match conditions, `then` actions; terminating vs flow-control actions (next term, next policy)",
        "Policy chains and evaluation order, falling through to the default policy",
        "Route filters and match types: exact, orlonger, longer, upto, prefix-length-range; prefix lists",
        "Testing with `test policy`",
        "Firewall filters: stateless, term order, match conditions, implicit discard at the end",
        "Filter actions: terminating (accept, discard, reject) and non-terminating (count, log, syslog, policer)",
        "Applying filters to interfaces (input/output) and to lo0 to protect the RE",
        "Unicast reverse path forwarding (uRPF) checks: strict and loose"
      ],
      notes: ["Objective 7: Routing policy and firewall filters"],
      labs: [
        "Run OSPF between two vJunos-routers and write an export policy that redistributes one static route; prove it with `show route protocol ospf` on the neighbor.",
        "Build a route-filter policy with `orlonger` and `upto` terms and check which prefixes match using `test policy`.",
        "Apply an lo0 input filter that allows SSH, ICMP and OSPF only from your lab subnet and counts everything else, then read the counters with `show firewall`."
      ]
    }
  ],

  study: {
    1: [
      ["How do switches and routers affect collision and broadcast domains?", "Each switch port is its own collision domain, but all ports in one VLAN share a broadcast domain. A router (or each VLAN/IRB interface) separates broadcast domains because it does not forward broadcasts."],
      ["Walk through ARP when a host sends to a remote network.", "The host sees the destination is off-subnet, so it ARPs for its default gateway's IP. The gateway replies with its MAC, and the frame is sent to that MAC while the IP header keeps the remote destination address."],
      ["How many usable hosts are in a /27, and what are the subnets of 192.168.10.0/27?", "32 addresses minus network and broadcast leaves 30 hosts. Subnets start at .0, .32, .64, .96, .128, .160, .192 and .224."],
      ["Give three IPv6 address types and their prefixes.", "Global unicast (2000::/3), link-local (fe80::/10, always present on IPv6 interfaces) and multicast (ff00::/8). Unique local uses fc00::/7."],
      ["Why does class of service exist and what are its basic steps?", "Links congest, so some traffic (voice, network control) must be protected. CoS classifies packets into forwarding classes, queues and schedules them on egress, may drop or police, and may rewrite markings for the next hop."]
    ],
    2: [
      ["Explain control plane vs forwarding plane in Junos.", "The Routing Engine is the control plane: it runs routing protocols and management and builds the routing table and forwarding table. The Packet Forwarding Engine is the forwarding plane: it moves transit packets using its copy of the forwarding table."],
      ["What is exception traffic? Give examples.", "Traffic the PFE cannot simply forward and must send to the RE: packets addressed to the device (SSH, routing protocols), packets with expired TTL, IP options, or those needing ICMP replies. It is rate-limited to protect the RE."],
      ["Name four Junos daemons and their jobs.", "rpd runs routing protocols and builds routing tables; mgd handles the CLI and configuration; dcd configures interfaces; chassisd manages chassis hardware and alarms."],
      ["Why is the separation of RE and PFE useful?", "Heavy routing work or a management problem on the RE does not stop the PFE forwarding at line rate, and the RE can be protected by filtering host-bound traffic."]
    ],
    3: [
      ["How do you tell operational and configuration mode apart?", "Operational mode shows a `>` prompt and runs show/request/monitor commands. Configuration mode shows `#` and an `[edit]` banner that marks your place in the hierarchy."],
      ["What is the difference between the candidate and active configuration?", "The active configuration is what the device is running. Changes go into the candidate configuration and only become active after a successful `commit`."],
      ["Name five pipe options and what they do.", "`match` shows matching lines, `except` hides matching lines, `find` starts output at the first match, `count` counts lines, `no-more` turns off paging; `display set` shows configuration as set commands."],
      ["How can you run `show interfaces terse` without leaving configuration mode?", "Prefix it with `run`: `run show interfaces terse`."],
      ["What is the difference between `configure private` and `configure exclusive`?", "Private gives each user their own candidate copy, and only their changes are committed. Exclusive locks the configuration so no one else can change it while you edit."]
    ],
    4: [
      ["What must be done before a factory-default device accepts its first commit?", "A root password must be configured under `system root-authentication`; the commit fails without it."],
      ["Explain `commit confirmed`.", "It activates the change but rolls back automatically (after 10 minutes by default, or the minutes you give) unless you commit again. It protects you from locking yourself out."],
      ["How do `rollback` and the rescue configuration differ?", "Junos keeps up to 50 committed versions (0–49), and `rollback n` loads one into the candidate. The rescue configuration is a known-good file you save on purpose and load with `rollback rescue`."],
      ["What is the difference between `load merge` and `load override`?", "Merge combines the file with the candidate configuration. Override replaces the whole candidate with the file."],
      ["Explain the interface name ge-0/0/3.0.", "Gigabit Ethernet, FPC slot 0, PIC slot 0, port 3, logical unit 0. Protocol families and addresses are set on the logical unit."],
      ["How do configuration groups work?", "You define shared statements under `groups <name>` (wildcards like `<ge-*>` allowed) and apply them with `apply-groups`. Explicit statements override inherited ones, and `| display inheritance` shows where values came from."]
    ],
    5: [
      ["Which commands check hardware and alarms?", "`show chassis hardware` for inventory, `show chassis alarms` and `show system alarms` for active alarms, `show chassis routing-engine` for RE CPU, memory and temperature, `show system storage` for disk use."],
      ["Contrast `monitor interface` and `monitor traffic interface`.", "`monitor interface` shows live counters and errors for an interface. `monitor traffic interface` captures and decodes packets sent to or from the RE on that interface, like tcpdump."],
      ["Outline root password recovery.", "Connect to the console, reboot and interrupt boot to choose recovery (single-user) mode, type `recovery` at the prompt, enter configuration mode, set a new root password, commit and reboot."],
      ["How do you upgrade Junos OS?", "Copy the package to /var/tmp, back up the config (or snapshot), run `request system software add <package> reboot`, then check the version with `show version`."],
      ["What is the difference between syslog and traceoptions?", "Syslog records system events at chosen facilities and severities to files or remote servers. Traceoptions logs detailed debugging for a specific protocol or feature and should be turned off after troubleshooting."]
    ],
    6: [
      ["How does Junos choose between routes to the same prefix from different sources?", "The route with the lowest preference wins (for example static 5 beats OSPF internal 10). Within one protocol, the protocol's own metric and tie-breakers decide. The active route is marked with `*`."],
      ["How does a floating static route work?", "A second static route with a higher preference (using `qualified-next-hop` with its own preference, or a separate route) stays inactive until the preferred route disappears."],
      ["What is the difference between discard and reject next hops?", "Both drop matching packets. Discard drops silently; reject drops and sends an ICMP unreachable back to the source."],
      ["What is a routing instance, and when would you use a virtual router?", "A routing instance is a separate routing table with its own interfaces and protocols. A virtual router separates routing for different customers or functions on one device without VPN signaling."]
    ],
    7: [
      ["What is the difference between import and export policies?", "Import policies control which routes from a protocol are placed in the routing table. Export policies control which routes from the routing table are advertised into a protocol."],
      ["What happens when no term in a policy chain matches a route?", "Evaluation moves to the next policy in the chain, and if none match, the protocol's default policy decides."],
      ["Explain orlonger, longer and upto.", "`orlonger` matches the prefix and anything more specific. `longer` matches only more specific routes, not the prefix itself. `upto /n` matches the prefix and more specifics up to length n."],
      ["What happens to a packet that matches no term in a firewall filter?", "It is discarded by the implicit discard at the end of every filter. Add a final accept term if other traffic should pass."],
      ["Why apply a filter to lo0?", "An input filter on lo0 is applied to all traffic destined to the Routing Engine, whatever interface it arrives on, so it protects the control plane."]
    ]
  },

  questions: [
    ["jj1",0,1,"A switch has 24 ports, all in the same VLAN, each connected to one PC. How many broadcast domains and collision domains does it create?",["1 broadcast, 1 collision","1 broadcast, 24 collision","24 broadcast, 1 collision","24 broadcast, 24 collision"],1,"Each switch port is its own collision domain, but one VLAN is one broadcast domain. Answers with 24 broadcast domains confuse ports with VLANs.","Objective 1"],
    ["jj2",0,1,"Host 10.1.1.10/24 pings 10.2.2.20. Which address does it resolve with ARP first?",["Its default gateway","10.2.2.20","The DNS server","The broadcast address"],0,"The destination is off-subnet, so the host ARPs for its default gateway and sends the frame there. ARPing for 10.2.2.20 would only happen if it were on the local subnet.","Objective 1"],
    ["jj3",0,1,"How many usable host addresses does a /26 IPv4 subnet provide?",["30","64","126","62"],3,"A /26 has 64 addresses; minus network and broadcast leaves 62. 64 counts the reserved addresses.","Objective 1"],
    ["jj4",0,1,"An engineer needs the subnet that contains host 172.16.45.130/25. What is the network address?",["172.16.45.0","172.16.45.64","172.16.45.128","172.16.44.128"],2,"A /25 splits the last octet into .0 and .128 blocks, and .130 falls in the .128 block. 172.16.45.0 is the other half.","Objective 1"],
    ["jj5",0,1,"Which prefix identifies IPv6 link-local addresses that every IPv6 interface uses?",["2001:db8::/32","fe80::/10","ff00::/8","fc00::/7"],1,"Link-local addresses are fe80::/10. 2000::/3 is global unicast and fc00::/7 is unique local.","Objective 1"],
    ["jj6",0,1,"How long is an Ethernet MAC address, and what do the first 24 bits usually identify?",["48 bits; the vendor OUI","32 bits; the network","48 bits; the VLAN ID","64 bits; the interface ID"],0,"MAC addresses are 48 bits and the first 24 bits are the organizationally unique identifier. 64 bits is the IPv6 interface ID length, not a MAC.","Objective 1"],
    ["jj7",0,1,"A switch receives a unicast frame for a destination MAC that is not yet in its table. What does it do?",["Drops the frame","Sends an ARP request","Returns it to the sending port","Floods it within the VLAN"],3,"Unknown unicast frames are flooded within the VLAN until the MAC is learned. Switches do not ARP to forward frames.","Objective 1"],
    ["jj8",0,1,"A voice application uses UDP. Why is UDP preferred over TCP for real-time voice?",["It guarantees in-order delivery of packets","It encrypts payloads","It avoids retransmission delay","It uses larger headers"],2,"UDP has no retransmission or handshake, so late packets are not resent and delay stays low. Guaranteed delivery is a TCP feature.","Objective 1"],
    ["jj9",0,1,"Which Junos default forwarding class is reserved for routing protocol and other control traffic?",["best-effort","network-control","assured-forwarding","expedited-forwarding"],1,"network-control carries routing and control protocol traffic. expedited-forwarding is for low-latency user traffic such as voice.","Objective 1"],
    ["jj10",0,1,"An ingress interface assigns packets to forwarding classes using only the DSCP value already in each header. What type of classifier is this?",["Behavior aggregate","Multifield classifier","Rewrite rule","Scheduler map"],0,"A behavior aggregate classifier reads one CoS field such as DSCP. A multifield classifier uses a firewall filter matching several fields.","Objective 1"],
    ["jj11",0,1,"Which CoS component changes the DSCP marking on packets as they leave an interface?",["Classifier","Policer","Drop profile","Rewrite rule"],3,"Rewrite rules set markings on egress for the next hop. Classifiers read markings on ingress.","Objective 1"],
    ["jj12",0,1,"What is the compressed form of 2001:0db8:0000:0000:0000:0000:0000:0001?",["2001:db8:0:1","2001::db8::1","2001:db8::1","2001:0db8::0:1:0"],2,"Leading zeros can be dropped and one run of zero groups replaced with ::. Using :: twice is not allowed.","Objective 1"],
    ["jj13",0,1,"Two hosts are in VLAN 10 and VLAN 20 on the same switch. What is needed for them to communicate?",["An 802.1Q trunk port between the two VLANs","A Layer 3 interface routing between them","A larger MAC table","Spanning Tree"],1,"Different VLANs are different broadcast domains, so traffic must be routed (for example by an IRB interface). A trunk only carries VLANs between switches.","Objective 1"],

    ["jj14",0,2,"Which Junos component runs routing protocols and builds the routing table?",["Routing Engine","Packet Forwarding Engine","Switch fabric","Physical Interface Card"],0,"The Routing Engine is the control plane that runs rpd and builds the routing table. The PFE only forwards using the forwarding table.","Objective 2"],
    ["jj15",0,2,"A transit packet enters a router and leaves toward its destination. Which component normally handles it?",["The Routing Engine CPU","The management daemon (mgd) process","The chassis daemon","The Packet Forwarding Engine"],3,"Transit traffic is forwarded by the PFE using its forwarding table without involving the RE. The RE handles only exception traffic.","Objective 2"],
    ["jj16",0,2,"Which traffic is exception traffic that the PFE passes to the Routing Engine?",["A web session crossing the router","A packet matching the default route","An OSPF hello sent to the router","A frame switched within a VLAN"],2,"Routing protocol packets addressed to the device are host-bound, so they go to the RE. Traffic crossing the router stays in the PFE.","Objective 2"],
    ["jj17",0,2,"Which daemon handles the CLI and processes configuration commits?",["rpd","mgd","dcd","chassisd"],1,"mgd, the management daemon, runs the CLI and configuration database. rpd is the routing protocol daemon.","Objective 2"],
    ["jj18",0,2,"An engineer changes an interface's MTU and commits. Which daemon applies the change to the interface?",["dcd","rpd","chassisd","snmpd"],0,"dcd, the device control daemon, configures interfaces. chassisd monitors hardware and alarms.","Objective 2"],
    ["jj19",0,2,"Where does the PFE get the table it uses to forward packets?",["It builds it from ARP only","It runs its own OSPF and BGP processes locally","It reads the candidate config","The RE copies the forwarding table to it"],3,"The RE selects active routes and pushes the forwarding table to the PFE. The PFE does not run routing protocols.","Objective 2"],
    ["jj20",0,2,"Why is traffic from the PFE to the Routing Engine rate-limited?",["To save forwarding table space","To speed up transit traffic through the PFE","To protect the control plane from floods","To encrypt management sessions"],2,"Rate limiting host-bound traffic stops a flood from overwhelming the RE. It does not change forwarding table size.","Objective 2"],
    ["jj21",0,2,"A router receives a packet whose TTL reaches zero. How is it handled?",["The PFE forwards it with the TTL reset to 64","It is sent to the RE as exception traffic","It is queued for retransmission","It is mirrored to all ports"],1,"Expired TTL needs an ICMP time-exceeded reply, so the packet is treated as exception traffic. It is never forwarded onward.","Objective 2"],
    ["jj22",0,2,"What is a key benefit of separating the control plane and forwarding plane in Junos?",["Heavy RE load does not stop forwarding","The RE forwards faster","The PFE no longer needs a forwarding table","Interfaces need no configuration"],0,"The PFE keeps forwarding even while the RE is busy with routing or management tasks. The RE is not in the transit path.","Objective 2"],
    ["jj23",0,2,"What is the main difference between Junos OS and Junos OS Evolved?",["Evolved has no CLI","Junos OS cannot route IPv6","Evolved uses a different config syntax","Evolved runs on a Linux base"],3,"Junos OS Evolved runs on Linux, while traditional Junos OS is based on FreeBSD. Both keep the same CLI and configuration style.","Objective 2"],
    ["jj24",0,2,"An engineer wants one filter that protects the RE from unwanted SSH attempts on every interface. Where should it be applied?",["As an output filter on ge-0/0/0","On the management interface only","As an input filter on lo0","In the forwarding table"],2,"An input filter on lo0 applies to all host-bound traffic regardless of the arrival interface. Applying it to one interface misses others.","Objective 2"],
    ["jj25",0,2,"Which daemon monitors hardware components and raises chassis alarms?",["mgd (management)","chassisd (chassis)","rpd (routing protocols)","dcd (device control)"],1,"chassisd manages chassis hardware and alarms. mgd handles management and configuration.","Objective 2"],
    ["jj26",0,2,"Which statement about Junos software across Juniper platforms is correct?",["One OS with the same CLI across families","Each platform family needs its own separate CLI","Switches do not run Junos","Only routers support commit"],0,"Junos uses a common OS and CLI across routing, switching and security products. The commit model is the same everywhere.","Objective 2"],
    ["jj27",0,2,"Which command shows the routes the RE has pushed to the PFE?",["show route","show interfaces terse","show pfe statistics traffic detail","show route forwarding-table"],3,"`show route forwarding-table` shows the forwarding table. `show route` shows the RE's routing table, including inactive routes.","Objective 2"],

    ["jj28",0,3,"A prompt reads `admin@R1#`. What mode is the user in?",["Operational mode","Shell mode","Configuration mode","Single-user recovery mode"],2,"The # prompt, usually with an [edit] banner, means configuration mode. Operational mode ends with >.","Objective 3"],
    ["jj29",0,3,"An engineer in configuration mode wants to check interface status without leaving. Which command works?",["show interfaces terse","run show interfaces terse","exit show interfaces terse","op show interfaces terse"],1,"`run` executes an operational command from configuration mode. `show` in configuration mode shows configuration, not interface status.","Objective 3"],
    ["jj30",0,3,"Which command shows only the lines of `show interfaces terse` that contain \"ge-0/0\"?",["show interfaces terse | match ge-0/0","show interfaces terse | find ge-0/0","show interfaces terse | count ge-0/0","show interfaces terse | except ge-0/0"],0,"`| match` keeps only matching lines. `| find` starts at the first match but prints everything after it.","Objective 3"],
    ["jj31",0,3,"An engineer wants the whole configuration as one-line commands to paste into another device. Which pipe should be used?",["| display xml","| compare","| no-more","| display set"],3,"`| display set` prints the configuration as set commands. `| no-more` only disables paging.","Objective 3"],
    ["jj32",0,3,"The user is at [edit protocols ospf area 0.0.0.0] and wants to return to the top of the hierarchy. Which command?",["up","exit configuration-mode","top","quit"],2,"`top` jumps to the top of the hierarchy. `exit configuration-mode` leaves configuration mode entirely.","Objective 3"],
    ["jj33",0,3,"Two admins must edit the same router, and each wants to commit only their own changes. Which command should each use?",["configure exclusive","configure private","configure batch","edit shared"],1,"`configure private` gives each user a private candidate so only their changes commit. Exclusive locks everyone else out.","Objective 3"],
    ["jj34",0,3,"Which configuration is the device running right now?",["The active","The candidate","The rescue","The factory default"],0,"The active configuration is running; candidate changes apply only after commit. The rescue configuration is a saved fallback.","Objective 3"],
    ["jj35",0,3,"What does pressing Tab do in the Junos CLI that Space does not?",["Runs the command","Shows the full command history list","Leaves the current level","Completes user-defined names"],3,"Tab completes both keywords and user-defined names such as policy names; Space completes only built-in keywords.","Objective 3"],
    ["jj36",0,3,"An engineer needs to count how many interfaces are down. Which command gives a single number?",["show interfaces terse | find down","show interfaces terse | last","show interfaces terse | match down | count","show interfaces terse | except up | no-more"],2,"Filtering with match and then counting gives the number of lines. `| except down` shows the up lines instead.","Objective 3"],
    ["jj37",0,3,"Which command gives a detailed description and syntax for a configuration statement from the CLI?",["help topic","help reference","help history","help syslog messages"],1,"`help reference` shows statement syntax and hierarchy. `help topic` gives background on a feature.","Objective 3"],
    ["jj38",0,3,"A team wants a browser-based GUI to configure a branch SRX. What must be configured?",["system services web-management","system services netconf","system login class","system services extension-service"],0,"J-Web is enabled under `system services web-management` with HTTP or HTTPS. NETCONF is an API, not a GUI.","Objective 3"],
    ["jj39",0,3,"Before committing, an engineer wants to see exactly what changed from the active config. Which command?",["show | display set","commit check","show system commit","show | compare"],3,"`show | compare` lists additions and deletions against the active configuration. `commit check` only validates syntax and semantics.","Objective 3"],
    ["jj40",0,3,"Which command moves up two levels in the configuration hierarchy?",["exit 2","top 2","up 2","back 2"],2,"`up` accepts a number of levels. `top` always goes to the top of the hierarchy.","Objective 3"],

    ["jj41",0,4,"A new router with the factory default configuration rejects the first commit. What is the most likely missing setting?",["A host name","A root password","An NTP server","A loopback address"],1,"Junos requires root authentication before the first commit. A host name is useful but not mandatory.","Objective 4"],
    ["jj42",0,4,"An engineer is changing a remote router's management filter and fears losing access. Which command reduces the risk?",["commit confirmed 5","commit check","commit and-quit","commit synchronize"],0,"`commit confirmed 5` rolls back automatically after 5 minutes unless confirmed. `commit check` does not apply anything.","Objective 4"],
    ["jj43",0,4,"How many previous committed configurations does Junos keep for rollback?",["10","20","32","50"],3,"Junos stores rollback 0 through 49, which is 50 configurations. Rollback 0 is the active one.","Objective 4"],
    ["jj44",0,4,"After a bad change was committed, the engineer wants to restore the previous version. Which sequence works?",["rollback 0, then commit","load factory-default, then commit","rollback 1, then commit","rollback 1 only"],2,"`rollback 1` loads the previous version into the candidate and commit makes it active. Without commit nothing changes.","Objective 4"],
    ["jj45",0,4,"In ge-1/2/3.100, what does 100 represent?",["The VLAN ID","The logical unit","The port number","The PIC slot number"],1,"The number after the dot is the logical unit. It may match a VLAN ID but that is a separate setting.","Objective 4"],
    ["jj46",0,4,"Where is an IPv4 address configured on a Junos interface?",["Under the unit's family inet","At the physical interface level","Under routing-options","Under system services"],0,"Addresses are set on a logical unit under family inet (for example unit 0 family inet address). Physical properties like MTU sit above the unit.","Objective 4"],
    ["jj47",0,4,"An engineer wants to replace the entire candidate configuration with a file. Which command?",["load merge","load patch","load merge relative","load override"],3,"`load override` discards the candidate and uses the file. `load merge` combines the file with the existing candidate.","Objective 4"],
    ["jj48",0,4,"A term should stay in the configuration but be ignored for now. Which command does that?",["delete","annotate","deactivate","insert before"],2,"`deactivate` marks it inactive so it is kept but ignored at commit. `delete` removes it.","Objective 4"],
    ["jj49",0,4,"The same MTU must be set on every ge- interface. Which feature avoids repeating it?",["A rescue configuration","A configuration group with apply-groups","A login class","A separate routing instance per interface"],1,"Groups hold shared statements, and wildcards like <ge-*> apply them to matching interfaces. A rescue configuration is only a backup.","Objective 4"],
    ["jj50",0,4,"A new admin needs full configuration rights. Which predefined login class fits?",["super-user","operator","read-only","unauthorized"],0,"super-user has all permissions. operator can clear and restart some things but cannot configure.","Objective 4"],
    ["jj51",0,4,"Which command saves the current active configuration as the rescue configuration?",["save rescue","rollback rescue","load rescue","request system configuration rescue save"],3,"`request system configuration rescue save` stores it. `rollback rescue` loads it back into the candidate.","Objective 4"],
    ["jj52",0,4,"An engineer wants a change to take effect at 02:00 during a maintenance window. Which option?",["commit confirmed","commit comment","commit at","commit check"],2,"`commit at` schedules the commit. `commit confirmed` applies now with an automatic rollback.","Objective 4"],
    ["jj53",0,4,"Which interface is the out-of-band management Ethernet port on many Junos routers?",["lo0","fxp0","irb","ae10"],1,"fxp0 (em0 or me0 on some platforms) is the management port. lo0 is the loopback.","Objective 4"],
    ["jj54",0,4,"Which command adds a note to a configuration statement that others will see in the config?",["annotate","comment","describe","note"],0,"`annotate` adds a comment above the statement. `commit comment` records a note in the commit history instead.","Objective 4"],

    ["jj55",0,5,"An engineer wants to watch live input and output rates and errors on ge-0/0/1. Which command?",["show log messages","monitor traffic interface ge-0/0/1","show interfaces terse","monitor interface ge-0/0/1"],3,"`monitor interface` shows real-time counters. `monitor traffic interface` captures packets to and from the RE instead.","Objective 5"],
    ["jj56",0,5,"A router seems to be sending OSPF hellos incorrectly. Which command decodes packets to and from the RE on an interface?",["show ospf interface ge-0/0/1 extensive","show ospf neighbor","monitor traffic interface ge-0/0/1","show route"],2,"`monitor traffic interface` works like tcpdump for host-bound traffic. `show interfaces extensive` gives counters, not packet contents.","Objective 5"],
    ["jj57",0,5,"Where are most system events logged by default?",["/var/tmp/messages","/var/log/messages","/config/juniper.conf","/var/db/log"],1,"The default syslog file is /var/log/messages, read with `show log messages`. /config holds configuration files.","Objective 5"],
    ["jj58",0,5,"An engineer enabled OSPF traceoptions to debug an adjacency, and the issue is fixed. What should be done next?",["Remove or deactivate the traceoptions","Leave traceoptions running for future issues","Reboot the router","Delete /var/log/messages"],0,"Traceoptions use CPU and disk, so they should be removed after troubleshooting. Deleting the main log loses history.","Objective 5"],
    ["jj59",0,5,"Which command installs a new Junos package and restarts the device to finish?",["request system reboot pkg.tgz","load override /var/tmp/pkg.tgz","request system software validate /var/tmp/pkg.tgz reboot","request system software add /var/tmp/pkg.tgz reboot"],3,"`request system software add ... reboot` installs and restarts. `load override` loads configuration, not software.","Objective 5"],
    ["jj60",0,5,"A router's root password is lost. What does recovery require?",["SSH with any user","A factory reset through the J-Web GUI","Console access and recovery mode","An SNMP write community"],2,"Password recovery is done from the console by booting into recovery (single-user) mode. It does not need a factory reset.","Objective 5"],
    ["jj61",0,5,"A router must be shut down before being moved. Which command stops Junos safely?",["request system zeroize","request system halt","restart routing","clear system commit"],1,"`request system halt` stops the OS gracefully. `zeroize` erases the configuration and data.","Objective 5"],
    ["jj62",0,5,"Disk space is low on a router. Which command removes old log files and temporary files?",["request system storage cleanup","file delete /config/juniper.conf.gz","request system zeroize","clear log all"],0,"`request system storage cleanup` lists and removes unneeded files safely. Deleting /config would destroy saved configurations.","Objective 5"],
    ["jj63",0,5,"Which command shows active hardware alarms such as a failed fan?",["show system processes","show system users","show version","show chassis alarms"],3,"`show chassis alarms` lists chassis alarms. `show version` shows software versions.","Objective 5"],
    ["jj64",0,5,"An engineer wants to check RE CPU and memory usage and temperature. Which command?",["show system uptime","show interfaces extensive","show chassis routing-engine","show system storage partitions"],2,"`show chassis routing-engine` reports RE utilization and temperature. `show system uptime` shows boot and commit times.","Objective 5"],
    ["jj65",0,5,"Which configuration sends syslog messages of severity warning and above to a remote server 10.0.0.50?",["set snmp trap-group 10.0.0.50","set system syslog host 10.0.0.50 any warning","set system ntp server 10.0.0.50","set system syslog file remote-10.0.0.50 any warning"],1,"`system syslog host` sends to a remote server. `syslog file` writes a local file.","Objective 5"],
    ["jj66",0,5,"Which configuration keeps a router's clock in sync with 192.0.2.10?",["set system ntp server 192.0.2.10","set system time-zone 192.0.2.10","set system syslog host 192.0.2.10","set routing-options static route 192.0.2.10"],0,"`system ntp server` points the router at an NTP server. Time zone only changes how time is shown.","Objective 5"],
    ["jj67",0,5,"After an upgrade an engineer must confirm the running software. Which command?",["show system storage","show chassis hardware","show system snapshot","show version"],3,"`show version` lists the running Junos release. `show chassis hardware` shows hardware inventory.","Objective 5"],
    ["jj68",0,5,"Traceroute from a router fails after the third hop. What does this suggest?",["The router's local outgoing interface is down","DNS is broken","A problem at or after the fourth hop","The router's clock is wrong"],2,"Replies stop after hop three, so the problem lies at or beyond the next hop (or it blocks ICMP). A down local interface would fail at hop one.","Objective 5"],

    ["jj69",0,6,"A router has routes to 10.1.0.0/16 and 10.1.1.0/24. Which route is used for traffic to 10.1.1.5?",["10.1.0.0/16","10.1.1.0/24","The one with lower preference","The oldest route"],1,"Longest-prefix match picks the most specific route, the /24. Preference matters only between routes to the same prefix.","Objective 6"],
    ["jj70",0,6,"The same prefix is learned from a static route and from OSPF internal. Which becomes active by default?",["Static, preference 5","OSPF, preference 10","Whichever has more hops","Both, load-balanced"],0,"Static routes have preference 5, lower than OSPF internal 10, so static wins. Lower preference is better.","Objective 6"],
    ["jj71",0,6,"What is the default Junos route preference for BGP routes?",["20","110","200","170"],3,"BGP routes have preference 170 in Junos. 20 and 200 are administrative distances used by another vendor.","Objective 6"],
    ["jj72",0,6,"Which routing table holds IPv4 unicast routes in the master instance?",["inet6.0","inet.3","inet.0","mpls.0"],2,"inet.0 holds IPv4 unicast routes. inet6.0 is for IPv6.","Objective 6"],
    ["jj73",0,6,"In `show route` output, what does an asterisk (*) next to a route mean?",["The route is hidden","It is the active route","It is a static route","It was learned in the last minute"],1,"* marks the active route that is used for forwarding. Hidden routes are shown only with `show route hidden`.","Objective 6"],
    ["jj74",0,6,"Which configuration adds an IPv4 default route via 10.0.0.1?",["set routing-options static route 0.0.0.0/0 next-hop 10.0.0.1","set protocols static default 10.0.0.1","set interfaces default-route 10.0.0.1","set routing-options default-gateway 10.0.0.1"],0,"Static routes live under `routing-options static route`. `protocols static` does not exist in Junos.","Objective 6"],
    ["jj75",0,6,"An engineer wants a backup static default route via a second ISP that is used only if the primary fails. What should be configured?",["A second next-hop with the same preference value","A reject next hop","A discard route","A qualified-next-hop with a higher preference"],3,"A qualified next hop with a higher preference stays inactive until the primary is gone. Equal preference would load-balance or pick one.","Objective 6"],
    ["jj76",0,6,"What is the difference between `discard` and `reject` static next hops?",["Discard sends ICMP unreachable","Only reject drops traffic","Reject sends ICMP unreachable","Only discard installs a route"],2,"Both drop traffic; reject also sends ICMP unreachable, while discard drops silently.","Objective 6"],
    ["jj77",0,6,"A service provider wants separate routing tables for two customers on one router without MPLS VPN signaling. Which instance type fits?",["forwarding","virtual-router","vrf with route targets","l2vpn"],1,"A virtual-router instance gives an independent routing table without VPN signaling. vrf is used for Layer 3 VPNs.","Objective 6"],
    ["jj78",0,6,"A virtual-router instance is named CUST-A. What is the name of its IPv4 routing table?",["CUST-A.inet.0","inet.CUST-A","inet.0.CUST-A","CUST-A.inet6.0"],0,"Instance tables are named <instance>.inet.0. CUST-A.inet6.0 would be the IPv6 table.","Objective 6"],
    ["jj79",0,6,"What is the default preference of an OSPF external route in Junos?",["10","100","170","150"],3,"OSPF external routes use 150. 10 is OSPF internal.","Objective 6"],
    ["jj80",0,6,"Which protocol type exchanges routes between different autonomous systems?",["IGP such as OSPF","First-hop protocol such as VRRP","EGP such as BGP","Link-layer protocol such as LLDP"],2,"BGP is the exterior gateway protocol used between autonomous systems. OSPF routes within one AS.","Objective 6"],
    ["jj81",0,6,"A static route stays inactive even though it is configured. What is a common cause?",["Its preference is too low","The next hop is not reachable","It is missing a description statement","The router has no loopback"],1,"Junos needs the next hop to resolve through a directly connected route, or the static route stays inactive. A low preference makes a route more preferred.","Objective 6"],

    ["jj82",0,7,"Which policy direction controls routes placed into the routing table from a protocol?",["Import","Export","Forwarding","Input filter"],0,"Import policies act between the protocol and the routing table. Export policies control what is advertised out.","Objective 7"],
    ["jj83",0,7,"Static routes are not appearing in OSPF on neighbors. Why, by default?",["OSPF import rejects statics","Static routes have preference 5","OSPF needs BGP","OSPF export rejects all routes"],3,"The OSPF default export policy rejects everything, so an export policy is needed to redistribute statics. Import policies do not affect what is advertised.","Objective 7"],
    ["jj84",0,7,"A route matches no term in any policy in a chain. What decides its fate?",["It is always rejected","It is accepted with its original attributes","The protocol's default policy","The first term again"],2,"If no policy terminates the evaluation, the default policy of the protocol applies. It is not simply rejected.","Objective 7"],
    ["jj85",0,7,"Which route-filter match type matches 10.0.0.0/8 and all more specific routes?",["prefix-length-range","orlonger","longer","upto /8"],1,"`orlonger` includes the prefix and all more specifics. `longer` excludes the /8 itself.","Objective 7"],
    ["jj86",0,7,"Which route-filter matches 192.168.0.0/16 and more specific prefixes only up to /24?",["192.168.0.0/16 upto /24","192.168.0.0/16 longer","192.168.0.0/24 exact","192.168.0.0/16 orlonger"],0,"`upto /24` limits matches to lengths /16 through /24. `orlonger` would also match /25 through /32.","Objective 7"],
    ["jj87",0,7,"What happens to a packet that does not match any term in a Junos firewall filter?",["It is accepted","It is sent to the RE","It is counted and accepted","It is discarded"],3,"Every firewall filter ends with an implicit discard. A final accept term is needed to allow other traffic.","Objective 7"],
    ["jj88",0,7,"Which firewall filter action drops a packet and sends an ICMP message back?",["discard","count","reject","next term"],2,"reject drops and sends ICMP (by default port unreachable). discard drops silently.","Objective 7"],
    ["jj89",0,7,"A filter term has `then count web-hits` and no other action. What happens to a matching packet?",["It is discarded","It is counted, then accepted","It moves on to the next filter in the list","It is rejected with ICMP"],1,"When a term has only non-terminating actions, Junos adds an implicit accept. It does not continue to the next filter.","Objective 7"],
    ["jj90",0,7,"An engineer wants to check whether prefix 172.20.5.0/24 is accepted by policy EXPORT-ISP before applying it. Which command?",["test policy EXPORT-ISP 172.20.5.0/24","show policy EXPORT-ISP 172.20.5.0/24 detail","commit check EXPORT-ISP","show route export EXPORT-ISP"],0,"`test policy` runs routing table entries through the policy and shows which match. `show policy` only displays the policy.","Objective 7"],
    ["jj91",0,7,"A router should drop packets whose source address is not reachable via the interface they arrived on. Which feature does this?",["A route-filter","An export policy on the interface","A discard static route","Unicast RPF strict mode"],3,"Strict uRPF checks that the best route back to the source uses the receiving interface. A route-filter works on routes, not packets.","Objective 7"],
    ["jj92",0,7,"A routing policy term ends with `then { metric 10; }` and no accept or reject. What happens to a matching route?",["It is rejected immediately","It is accepted without changes","Its metric is set, then evaluation continues","The whole policy chain stops"],2,"A modifier such as metric is not terminating, so evaluation continues to the next term, next policy or the default policy. It is not accepted until a terminating action or default policy says so.","Objective 7"]
  ]
});
