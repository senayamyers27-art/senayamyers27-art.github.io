/* Performance-based simulations for Juniper JNCIA-Junos (JN0-106). */
CertHub.addPbqs("jncia-junos", [
  { id: "subnet-27-fill", d: 1, type: "fill", title: "Work out the subnet on a Junos interface",
    prompt: "A router's configuration contains the line below. Fill in the values for the subnet that ge-0/0/2 is connected to.",
    context: "user@R1> show configuration interfaces ge-0/0/2 | display set\nset interfaces ge-0/0/2 unit 0 family inet address 10.20.30.77/27",
    fields: [
      { label: "Network address", answers: ["10.20.30.64"] },
      { label: "Broadcast address", answers: ["10.20.30.95"] },
      { label: "First usable host", answers: ["10.20.30.65"] },
      { label: "Last usable host", answers: ["10.20.30.94"] },
      { label: "Dotted-decimal subnet mask", answers: ["255.255.255.224"] },
      { label: "Number of usable hosts", answers: ["30"] }
    ],
    explain: "A /27 mask is 255.255.255.224, so the block size in the last octet is 256 - 224 = 32 and subnets start at .0, .32, .64, .96 and so on. The address .77 falls in the .64 block, so the broadcast is one below the next block (.95). Usable hosts run .65 to .94, which is 2^5 - 2 = 30 addresses." },

  { id: "cos-components-match", d: 1, type: "match", title: "Match CoS components to their jobs",
    prompt: "You are reviewing a class-of-service design for a Junos edge router. Match each CoS component to what it does.",
    pairs: [
      ["Behavior aggregate classifier", "Assigns a forwarding class from the DSCP, EXP or 802.1p value already in the packet"],
      ["Multifield classifier", "Assigns a forwarding class with a firewall filter that matches several header fields"],
      ["Policer", "Limits a traffic rate and discards or re-marks the excess"],
      ["Scheduler", "Sets a queue's bandwidth share, buffer size and priority on egress"],
      ["Rewrite rule", "Sets the CoS marking on packets as they leave an interface"],
      ["Drop profile", "Controls how aggressively packets are dropped as a queue fills"]
    ],
    extra: ["Resolves an IPv4 next hop to a MAC address", "Chooses the active route when two protocols offer the same prefix"],
    explain: "Classification happens on ingress: a behavior aggregate (BA) classifier trusts one existing marking, while a multifield classifier is a firewall filter that can look at addresses, ports and protocol. Policers enforce rate limits. On egress, schedulers decide how queues share the link and drop profiles (RED) decide when a filling queue starts dropping. Rewrite rules set the outgoing marking so the next hop can classify correctly. A common confusion is thinking classifiers change markings; they only read them, and rewrite rules write them." },

  { id: "daemons-match", d: 2, type: "match", title: "Match Junos daemons to their roles",
    prompt: "While reading `show system processes` on a router you see several daemons. Match each daemon to its role.",
    context: "user@R1> show system processes | match \"rpd|mgd|dcd|chassisd|snmpd\"\n 1822  ??  S      2:41.07 /usr/sbin/rpd -N\n 1790  ??  S      0:12.44 /usr/sbin/mgd -N\n 1801  ??  S      0:03.51 /usr/sbin/dcd -N\n 1795  ??  S      1:05.19 /usr/sbin/chassisd -N\n 1840  ??  S      0:07.62 /usr/sbin/snmpd -N",
    pairs: [
      ["rpd", "Runs routing protocols and builds the routing table"],
      ["mgd", "Runs the CLI and processes configuration commits"],
      ["dcd", "Configures and manages interfaces"],
      ["chassisd", "Monitors hardware components and raises chassis alarms"],
      ["snmpd", "Answers SNMP polls and sends traps"]
    ],
    extra: ["Forwards transit packets using the forwarding table", "Stores the rescue configuration"],
    explain: "All of these daemons run on the Routing Engine. rpd runs OSPF, BGP and other protocols and selects active routes; mgd is the management daemon behind the CLI and the commit process; dcd (device control) applies interface settings such as addresses and MTU; chassisd watches fans, power and cards and raises alarms; snmpd serves SNMP. Forwarding transit packets is not a daemon job at all: the Packet Forwarding Engine does that in hardware with the forwarding table the RE gives it." },

  { id: "exception-traffic-select", d: 2, type: "select", title: "Identify exception (host-bound) traffic",
    prompt: "Packets arrive at R1, whose addresses are shown below. Select every packet that the PFE must send to the Routing Engine as exception traffic.",
    context: "R1 addresses:\n  ge-0/0/0.0  203.0.113.2/30   (to ISP, peer 203.0.113.1)\n  ge-0/0/1.0  10.0.12.1/30     (to R2)\n  ge-0/0/2.0  10.10.0.1/24     (user LAN)\n  lo0.0       192.0.2.1/32\nR1 has a default route to 203.0.113.1 and OSPF routes for 10.0.0.0/8.",
    options: [
      "TCP 443 from 10.10.0.50 to 198.51.100.80, TTL 63",
      "TCP 22 from 10.10.0.50 to 192.0.2.1, TTL 64",
      "OSPF hello from 10.0.12.2 to 224.0.0.5 on ge-0/0/1",
      "UDP 33434 from 10.10.0.50 to 198.51.100.80, TTL 1",
      "ICMP echo request from 10.10.0.50 to 10.10.0.1",
      "UDP 53 from 10.10.0.50 to 198.51.100.53, TTL 64",
      "TCP 179 from 203.0.113.1 to 203.0.113.2",
      "TCP 80 from 203.0.113.9 to 10.10.0.20, TTL 50"
    ],
    answers: [1, 2, 3, 4, 6],
    explain: "Exception traffic is anything the PFE cannot simply forward: packets addressed to the router itself (SSH to lo0, a ping to its own interface, BGP to 203.0.113.2), control protocol packets such as OSPF hellos to 224.0.0.5, and packets that need an ICMP reply from the router, such as the traceroute probe whose TTL expires here. Web, DNS and inbound HTTP packets passing through to other hosts are transit traffic and stay in the PFE. Exception traffic is rate-limited on its way to the RE so a flood cannot starve the control plane." },

  { id: "cli-pipes-match", d: 3, type: "match", title: "Match CLI pipe options to their output",
    prompt: "An engineer is working at `user@R1>` and adds different pipe options to `show configuration` and `show interfaces terse`. Match each pipe option to what it does.",
    pairs: [
      ["| match ge-0/0", "Shows only lines that contain the string"],
      ["| except down", "Hides lines that contain the string"],
      ["| find inet", "Starts the output at the first line containing the string"],
      ["| count", "Prints only the number of lines"],
      ["| display set", "Shows the configuration as set commands"],
      ["| compare rollback 1", "Shows differences from an earlier committed configuration"],
      ["| no-more", "Prints all output without pausing at each screen"]
    ],
    extra: ["Shows the output in XML", "Saves the output to a file on the router"],
    explain: "`match` and `except` are opposite line filters, while `find` does not filter at all: it skips ahead to the first match and prints everything after it. `count` reports how many lines there are, which pairs well with match (for example `| match down | count`). `display set` flattens the hierarchy into one-line set commands you can paste elsewhere, `compare rollback 1` shows what the last commit changed, and `no-more` turns off the --(more)-- pager. XML output comes from `| display xml` and saving to a file uses `| save`." },

  { id: "safe-commit-order", d: 4, type: "order", title: "Commit a risky change on a remote router",
    prompt: "You are connected over SSH to a remote branch router and must change the filter that protects its management access. Put the steps in the safest correct order.",
    steps: [
      "Enter configuration mode with configure private",
      "Make the change with set commands in the candidate configuration",
      "Review exactly what changed with show | compare",
      "Validate the candidate with commit check",
      "Apply the change with commit confirmed 5",
      "Open a new SSH session and test that management access still works",
      "Enter commit before the 5 minutes expire to make the change permanent"
    ],
    explain: "Changes are made in a candidate configuration, so reviewing with `show | compare` and validating with `commit check` catch mistakes before anything goes live. `commit confirmed 5` activates the change but rolls back automatically after 5 minutes unless it is confirmed, which protects you if the new filter locks you out. After testing access from a fresh session, a plain `commit` (or `commit check`) confirms it. If you are cut off, simply wait and the router restores the previous configuration by itself." },

  { id: "interface-name-fill", d: 4, type: "fill", title: "Decode a Junos interface name",
    prompt: "Read the configuration line below and fill in each part of the interface naming.",
    context: "set interfaces xe-2/1/5 vlan-tagging\nset interfaces xe-2/1/5 unit 30 vlan-id 300\nset interfaces xe-2/1/5 unit 30 family inet address 10.30.0.1/24",
    fields: [
      { label: "FPC slot number", answers: ["2"] },
      { label: "PIC slot number", answers: ["1"] },
      { label: "Port number", answers: ["5"] },
      { label: "Logical unit number", answers: ["30"] },
      { label: "VLAN ID carried by that unit", answers: ["300"] },
      { label: "Interface speed implied by the xe prefix", answers: ["10 Gbps", "10Gbps", "10G", "10 Gb/s", "10Gb/s", "10 Gigabit", "10 Gigabit Ethernet", "10GbE", "10 GbE"] }
    ],
    explain: "Junos interface names follow type-fpc/pic/port.unit, so xe-2/1/5.30 is a 10-Gigabit Ethernet port (xe) on FPC 2, PIC 1, port 5, logical unit 30. The unit number is just a label for the logical interface; the VLAN it carries is set separately with vlan-id, which is why unit 30 can carry VLAN 300. Matching unit and VLAN numbers is a convenient habit, not a requirement. The IP address is always configured on the unit under family inet." },

  { id: "root-recovery-order", d: 5, type: "order", title: "Recover a lost root password",
    prompt: "Nobody knows the root password of a Junos OS router in the lab. Put the password recovery steps in the correct order.",
    steps: [
      "Connect to the router's console port",
      "Reboot or power-cycle the router",
      "Interrupt the boot process and choose single-user (recovery) boot",
      "Enter recovery mode so Junos starts the CLI without a password",
      "Enter configuration mode and set a new root-authentication password",
      "Commit the configuration",
      "Exit and let the router finish booting normally"
    ],
    explain: "Password recovery needs physical console access, because the boot process must be interrupted before Junos starts normally. Booting to single-user mode and typing recovery brings up the CLI without authentication, where you configure `set system root-authentication plain-text-password` and commit, since the new password only takes effect once committed. Recovery does not require a factory reset and keeps the rest of the configuration, which is why console ports must be physically secured." },

  { id: "commit-audit-select", d: 5, type: "select", title: "Find the configuration change in the log",
    prompt: "OSPF to R2 dropped at 02:14. Using `show log messages`, select every line that records the configuration being changed or committed.",
    context: "user@R1> show log messages | match \"Sep 20 02:1\"\nSep 20 02:10:11 R1 mgd[4312]: UI_LOGIN_EVENT: User 'jdoe' login, class 'j-super-user' [4312], ssh-connection '192.0.2.44 51234 192.0.2.1 22', client-mode 'cli'\nSep 20 02:12:58 R1 mgd[4312]: UI_CMDLINE_READ_LINE: User 'jdoe', command 'set interfaces ge-0/0/1 unit 0 family inet address 10.0.12.5/30 '\nSep 20 02:13:40 R1 mgd[4312]: UI_COMMIT: User 'jdoe' requested 'commit' operation (comment: none)\nSep 20 02:13:42 R1 mgd[4312]: UI_COMMIT_COMPLETED: commit complete\nSep 20 02:14:05 R1 rpd[1822]: RPD_OSPF_NBRDOWN: OSPF neighbor 10.0.12.2 (realm ospf-v2 ge-0/0/1.0 area 0.0.0.0) state changed from Full to Down\nSep 20 02:14:30 R1 xntpd[1507]: NTP Server 192.0.2.10 is Reachable\nSep 20 02:16:02 R1 mgd[4312]: UI_LOGOUT_EVENT: User 'jdoe' logout",
    options: [
      "02:10:11 UI_LOGIN_EVENT: User 'jdoe' login",
      "02:12:58 UI_CMDLINE_READ_LINE: 'set interfaces ge-0/0/1 ... address 10.0.12.5/30'",
      "02:13:40 UI_COMMIT: User 'jdoe' requested 'commit' operation",
      "02:13:42 UI_COMMIT_COMPLETED: commit complete",
      "02:14:05 RPD_OSPF_NBRDOWN: neighbor 10.0.12.2 Full to Down",
      "02:14:30 NTP Server 192.0.2.10 is Reachable",
      "02:16:02 UI_LOGOUT_EVENT: User 'jdoe' logout"
    ],
    answers: [1, 2, 3],
    explain: "The UI_CMDLINE_READ_LINE entry shows the set command typed into the candidate (a new address that no longer matches R2's 10.0.12.0/30 link), and UI_COMMIT plus UI_COMMIT_COMPLETED show when it went live. The login and logout lines show the session but not a change, and the OSPF neighbor-down message is the effect of the change rather than the change itself. `show system commit` would confirm the same commit, and `rollback 1` followed by commit would undo it." },

  { id: "route-lookup-fill", d: 6, type: "fill", title: "Read the routing table and pick next hops",
    prompt: "Using the routing table below, fill in where R1 sends traffic for each destination (enter the next-hop IP address, or discard).",
    context: "user@R1> show route table inet.0\n\ninet.0: 4 destinations, 5 routes (4 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n\n0.0.0.0/0          *[Static/5] 3d 02:11:09\n                    >  to 203.0.113.1 via ge-0/0/0.0\n10.1.0.0/16        *[OSPF/10] 01:22:43, metric 20\n                    >  to 10.0.12.2 via ge-0/0/1.0\n10.1.1.0/24        *[OSPF/10] 01:22:43, metric 30\n                    >  to 10.0.13.3 via ge-0/0/2.0\n                    [BGP/170] 00:45:10, localpref 100\n                      AS path: 64500 I\n                    >  to 203.0.113.1 via ge-0/0/0.0\n10.1.1.128/25      *[Static/5] 00:10:02\n                       Discard",
    fields: [
      { label: "Traffic to 10.1.1.5", answers: ["10.0.13.3"] },
      { label: "Traffic to 10.1.200.9", answers: ["10.0.12.2"] },
      { label: "Traffic to 198.51.100.77", answers: ["203.0.113.1"] },
      { label: "Traffic to 10.1.1.200", answers: ["discard", "discarded", "dropped", "drop"] },
      { label: "Preference of the active route for 10.1.1.0/24", answers: ["10"] }
    ],
    explain: "Junos first uses longest-prefix match: 10.1.1.5 matches the /24 (more specific than the /16), 10.1.200.9 only matches the /16, and 198.51.100.77 matches nothing but the default route. 10.1.1.200 falls in 10.1.1.128/25, the most specific match, whose static next hop is discard, so it is dropped silently. Route preference only decides between routes for the same prefix: for 10.1.1.0/24, OSPF (10) beats BGP (170), so the OSPF route carries the asterisk." },

  { id: "route-preference-match", d: 6, type: "match", title: "Match route sources to default preference",
    prompt: "Two routing sources offer the same prefix and you need to predict which one Junos makes active. Match each route source to its default Junos route preference.",
    pairs: [
      ["Direct", "0"],
      ["Static", "5"],
      ["OSPF internal", "10"],
      ["IS-IS Level 1 internal", "15"],
      ["RIP", "100"],
      ["OSPF AS external", "150"],
      ["BGP", "170"]
    ],
    extra: ["20", "110", "200"],
    explain: "In Junos a lower preference wins: directly connected routes (0) beat static (5), which beat OSPF internal (10) and IS-IS Level 1 internal (15). RIP is 100, OSPF external routes are 150 and BGP (both internal and external) is 170. The values 20, 110 and 200 are administrative distances from another vendor's platform (eBGP, OSPF and iBGP there), which is a very common trap on this exam." },

  { id: "lo0-filter-select", d: 7, type: "select", title: "Evaluate a loopback firewall filter",
    prompt: "This filter is applied as an input filter on lo0.0 of R1 (192.0.2.1). Select every packet to R1 that is DISCARDED.",
    context: "firewall {\n    family inet {\n        filter PROTECT-RE {\n            term ALLOW-SSH {\n                from {\n                    source-address 192.0.2.0/24;\n                    protocol tcp;\n                    destination-port ssh;\n                }\n                then accept;\n            }\n            term ALLOW-OSPF {\n                from protocol ospf;\n                then accept;\n            }\n            term ALLOW-ICMP {\n                from protocol icmp;\n                then accept;\n            }\n            term COUNT-TELNET {\n                from {\n                    protocol tcp;\n                    destination-port telnet;\n                }\n                then count telnet-hits;\n            }\n        }\n    }\n}\ninterfaces lo0 unit 0 family inet filter input PROTECT-RE;",
    options: [
      "SSH (TCP 22) from 192.0.2.25",
      "SSH (TCP 22) from 198.51.100.9",
      "OSPF hello from 10.0.12.2",
      "ICMP echo request from 203.0.113.50",
      "Telnet (TCP 23) from 203.0.113.50",
      "SNMP (UDP 161) from 192.0.2.25",
      "BGP (TCP 179) from 198.51.100.1",
      "NTP (UDP 123) from 192.0.2.10"
    ],
    answers: [1, 5, 6, 7],
    explain: "Terms are checked in order and the first match wins; anything that matches no term hits the implicit discard at the end of every filter. SSH from outside 192.0.2.0/24 fails the first term and matches nothing else, and SNMP, BGP and NTP have no term at all, so all four are silently dropped, which would break BGP and NTP on a real router. The trap is COUNT-TELNET: a term with only a non-terminating action (count) gets an implicit accept, so telnet is counted and allowed. Fix that by adding `discard` to the term." },

  { id: "route-filter-select", d: 7, type: "select", title: "Predict routes accepted by an export policy",
    prompt: "This policy is applied as the BGP export policy toward an ISP. Select every route from R1's routing table that is ADVERTISED.",
    context: "policy-options {\n    policy-statement EXPORT-ISP {\n        term CUSTOMERS {\n            from {\n                route-filter 172.16.0.0/16 upto /24;\n                route-filter 10.0.0.0/8 longer;\n            }\n            then accept;\n        }\n        term BLOCK-REST {\n            then reject;\n        }\n    }\n}",
    options: [
      "172.16.0.0/16",
      "172.16.10.0/24",
      "172.16.10.128/25",
      "172.17.0.0/16",
      "172.16.0.0/12",
      "172.16.200.0/22",
      "10.0.0.0/8",
      "10.20.0.0/16"
    ],
    answers: [0, 1, 5, 7],
    explain: "`upto /24` matches 172.16.0.0/16 itself and any more-specific prefix inside it with a length from /16 to /24, so the /16, /22 and /24 match but the /25 is too long. 172.17.0.0/16 is outside the range, and 172.16.0.0/12 is shorter (less specific) than the filter prefix, so neither matches. `longer` matches only prefixes strictly more specific than 10.0.0.0/8, so 10.20.0.0/16 matches but 10.0.0.0/8 itself does not (that would need `orlonger`). Everything that misses the first term is rejected by BLOCK-REST." }
]);
