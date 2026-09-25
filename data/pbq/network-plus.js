/* Performance-based simulations for CompTIA Network+ (N10-009). */
CertHub.addPbqs("network-plus", [
  { id: "ports-match", d: 1, type: "match", title: "Match protocols to default ports",
    prompt: "A firewall change request lists services by name. Match each protocol to its well-known default port.",
    pairs: [["SMTP", "25"], ["NTP", "123"], ["SNMP (agent queries)", "161"], ["Syslog", "514"], ["LDAPS", "636"], ["RDP", "3389"], ["SIP", "5060"]],
    extra: ["162", "389", "587"],
    explain: "SMTP relays mail on 25 (587 is the submission port used by mail clients). NTP uses UDP 123, SNMP agents are polled on UDP 161 while traps are sent to the manager on 162, and syslog uses UDP 514. LDAPS is LDAP over TLS on 636, whereas plain LDAP is 389. RDP listens on 3389 and SIP signaling uses 5060 (5061 for SIP over TLS)." },

  { id: "subnet-27-fill", d: 1, type: "fill", title: "Calculate a /27 subnet",
    prompt: "A printer is configured as 172.16.45.130/27. Fill in the subnet details.",
    fields: [
      { label: "Subnet mask (dotted decimal)", answers: ["255.255.255.224"] },
      { label: "Network address", answers: ["172.16.45.128"] },
      { label: "Broadcast address", answers: ["172.16.45.159"] },
      { label: "First usable host", answers: ["172.16.45.129"] },
      { label: "Last usable host", answers: ["172.16.45.158"] },
      { label: "Number of usable hosts", answers: ["30"] }
    ],
    explain: "A /27 borrows 3 bits in the last octet, giving a mask of 255.255.255.224 and a block size of 256 - 224 = 32. The blocks are .0, .32, .64, .96, .128, .160, so .130 falls in the .128 block. Its broadcast is one less than the next block (.159), usable hosts run .129 to .158, and 2^5 - 2 = 30 usable addresses remain after removing network and broadcast." },

  { id: "osi-pdu-match", d: 1, type: "match", title: "Match OSI layers to their data units and devices",
    prompt: "Match each description to the OSI layer it belongs to.",
    pairs: [["Bits on the wire; hubs, repeaters and transceivers operate here", "Layer 1 - Physical"], ["Frames addressed by MAC; switches forward here", "Layer 2 - Data Link"], ["Packets addressed by IP; routers forward here", "Layer 3 - Network"], ["Segments or datagrams identified by port numbers", "Layer 4 - Transport"], ["Encryption, compression and character encoding", "Layer 6 - Presentation"]],
    extra: ["Layer 5 - Session", "Layer 7 - Application"],
    explain: "Layer 1 moves raw bits and includes cabling, hubs and transceivers. Layer 2 builds frames with MAC addresses, which is what switches read. Layer 3 handles logical IP addressing and routing between networks. Layer 4 uses port numbers, calling its PDU a segment for TCP or a datagram for UDP. Data translation such as encryption and encoding is the Presentation layer's job, not the Session layer, which sets up and tears down dialogs." },

  { id: "route-select-fill", d: 2, type: "fill", title: "Pick the route the router will use",
    prompt: "Using the routing table below, enter the next-hop address the router uses for each destination.",
    context: "R1# show ip route\nCodes: S - static, O - OSPF, D - EIGRP, C - connected\n\nS*    0.0.0.0/0          [1/0]     via 203.0.113.1\nO     10.0.0.0/8         [110/20]  via 10.255.0.2\nD     10.20.0.0/16       [90/3072] via 10.255.0.6\nS     10.20.30.0/24      [1/0]     via 10.255.0.10\nC     10.255.0.0/28      is directly connected, GigabitEthernet0/1",
    fields: [
      { label: "Next hop for 10.20.30.9", answers: ["10.255.0.10"] },
      { label: "Next hop for 10.20.99.5", answers: ["10.255.0.6"] },
      { label: "Next hop for 10.5.5.5", answers: ["10.255.0.2"] },
      { label: "Next hop for 198.51.100.40", answers: ["203.0.113.1"] }
    ],
    explain: "Routers choose by longest prefix match first; administrative distance only breaks ties between routes to the exact same prefix. 10.20.30.9 matches /0, /8, /16 and /24, so the static /24 wins. 10.20.99.5 matches up to the EIGRP /16, 10.5.5.5 only matches the OSPF /8, and 198.51.100.40 matches nothing but the default route to 203.0.113.1." },

  { id: "stp-order", d: 2, type: "order", title: "Order Spanning Tree convergence",
    prompt: "Three switches were just connected in a triangle. Put the Spanning Tree Protocol decisions in the order they occur.",
    steps: [
      "Switches exchange BPDUs and elect the root bridge (lowest bridge ID: priority, then MAC)",
      "Each non-root switch selects one root port with the lowest path cost to the root bridge",
      "A designated port is chosen on each network segment",
      "All remaining ports are placed in the blocking (discarding) state to break the loop",
      "Forwarding ports transition through listening/learning into forwarding"
    ],
    explain: "STP first elects a root bridge, since every other decision is measured relative to it. Each non-root switch then picks its single best path toward the root (the root port), and each segment gets one designated port. Any port that is neither root nor designated is blocked, breaking the loop, and only then do active ports move through listening and learning into forwarding (a slower process in classic 802.1D than in RSTP)." },

  { id: "dr-metrics-match", d: 3, type: "match", title: "Match disaster recovery terms",
    prompt: "Match each business continuity term to its definition.",
    pairs: [["RPO", "Maximum acceptable amount of data loss, measured back in time from the outage"], ["RTO", "Maximum acceptable time to restore a service after an outage"], ["MTTR", "Average time taken to repair a failed component"], ["MTBF", "Average operating time between failures of a repairable component"], ["Warm site", "Facility with hardware in place that needs current data restored before use"], ["Cold site", "Space and power only; equipment must be brought in and installed"]],
    extra: ["Fully mirrored facility that can take over almost immediately"],
    explain: "RPO is about data (how far back your last good copy can be), while RTO is about time to get the service running again. MTTR and MTBF describe component reliability: how long repairs take and how long things run between failures. A cold site is only an empty facility, a warm site has equipment but needs data restored, and the leftover definition describes a hot site." },

  { id: "syslog-severity-select", d: 3, type: "select", title: "Filter syslog by severity",
    prompt: "The NOC only pages on-call staff for messages of severity 3 (error) or more severe. Select every line that should trigger a page.",
    context: "Sep 25 02:11:04 core-sw1: %SYS-5-CONFIG_I: Configured from console by admin\nSep 25 02:13:40 core-sw1: %LINK-3-UPDOWN: Interface Gi1/0/24, changed state to down\nSep 25 02:13:41 core-sw1: %LINEPROTO-5-UPDOWN: Line protocol on Interface Gi1/0/24, changed state to down\nSep 25 02:20:17 edge-rtr: %SYS-2-MALLOCFAIL: Memory allocation of 65536 bytes failed\nSep 25 02:25:55 core-sw1: %SW_MATM-4-MACFLAP_NOTIF: Host 0050.56a1.2b3c in vlan 20 is flapping between port Gi1/0/5 and port Gi1/0/6\nSep 25 02:30:02 edge-rtr: %SEC-6-IPACCESSLOGP: list OUTSIDE denied tcp 203.0.113.44(51514) -> 198.51.100.10(23)\nSep 25 02:31:19 ups-mgmt: %ENV-1-POWER: Input power lost, running on battery",
    options: ["%SYS-5-CONFIG_I (configured from console)", "%LINK-3-UPDOWN (Gi1/0/24 down)", "%LINEPROTO-5-UPDOWN (line protocol down)", "%SYS-2-MALLOCFAIL (memory allocation failed)", "%SW_MATM-4-MACFLAP_NOTIF (MAC flapping)", "%SEC-6-IPACCESSLOGP (ACL deny)", "%ENV-1-POWER (running on battery)"],
    answers: [1, 3, 6],
    explain: "The digit after the facility is the syslog severity: 0 emergency, 1 alert, 2 critical, 3 error, 4 warning, 5 notice, 6 informational, 7 debug. Lower numbers are more severe, so levels 1, 2 and 3 meet the threshold. The MAC flap (4) is a warning worth investigating in the morning, and the config (5) and ACL log (6) messages are routine." },

  { id: "acl-eval-select", d: 4, type: "select", title: "Evaluate an inbound ACL",
    prompt: "This ACL is applied inbound on the internet-facing interface. Select every flow that will be PERMITTED.",
    context: "ip access-list extended OUTSIDE-IN\n 10 deny   tcp any host 192.0.2.10 eq 23\n 20 permit tcp any host 192.0.2.10 eq 443\n 30 permit tcp 198.51.100.0 0.0.0.255 host 192.0.2.10 eq 22\n 40 permit udp any host 192.0.2.53 eq 53\n (implicit deny ip any any)",
    options: ["203.0.113.5 -> 192.0.2.10 TCP/443", "198.51.100.20 -> 192.0.2.10 TCP/22", "203.0.113.5 -> 192.0.2.10 TCP/22", "198.51.100.20 -> 192.0.2.10 TCP/23", "203.0.113.9 -> 192.0.2.53 UDP/53", "203.0.113.9 -> 192.0.2.53 TCP/53", "198.51.100.20 -> 192.0.2.10 TCP/80"],
    answers: [0, 4, 1],
    explain: "ACLs are processed top-down and the first match wins, with an implicit deny at the end. HTTPS to 192.0.2.10 is allowed from anywhere, SSH only from 198.51.100.0/24 (the wildcard 0.0.0.255 matches the whole /24), and DNS only over UDP. Telnet is explicitly denied, while SSH from 203.0.113.5, DNS over TCP (used for zone transfers and large responses) and HTTP fall through to the implicit deny." },

  { id: "l2-attack-match", d: 4, type: "match", title: "Match Layer 2 attacks to mitigations",
    prompt: "Match each switch-level threat to the control that most directly mitigates it.",
    pairs: [["A rogue device on an access port answers DHCP requests", "DHCP snooping"], ["An attacker sends forged ARP replies to become the man in the middle", "Dynamic ARP inspection"], ["A tool floods the switch with thousands of fake source MACs", "Port security with a MAC address limit"], ["A host negotiates a trunk to reach other VLANs", "Disable DTP and hard-code access ports"], ["An unknown laptop is plugged into a conference room jack", "802.1X port-based authentication"], ["A user connects a consumer switch that could create a loop", "BPDU guard"]],
    extra: ["Jumbo frames"],
    explain: "DHCP snooping marks only uplinks as trusted for DHCP server replies, and Dynamic ARP inspection uses that snooping table to drop forged ARP replies. Port security caps the number of MACs learned on a port, stopping CAM table overflow. Switch spoofing is prevented by disabling DTP and statically setting access mode, 802.1X requires devices to authenticate before the port passes traffic, and BPDU guard shuts down an edge port that receives a BPDU." },

  { id: "troubleshoot-order", d: 5, type: "order", title: "Apply the troubleshooting methodology",
    prompt: "Users on the third floor cannot reach a file server. Put CompTIA's troubleshooting methodology steps in order.",
    steps: [
      "Identify the problem: gather information, question users, identify symptoms and recent changes",
      "Establish a theory of probable cause",
      "Test the theory to determine the cause",
      "Establish a plan of action to resolve the problem and identify potential effects",
      "Implement the solution or escalate as necessary",
      "Verify full system functionality and implement preventive measures if applicable",
      "Document findings, actions, outcomes and lessons learned"
    ],
    explain: "The Network+ methodology has seven steps and exams often test their order. You must understand the problem before theorizing, and test the theory before planning a fix; if the test fails you form a new theory or escalate. Planning comes before implementing so side effects and change windows are considered, verification confirms the whole service works, and documentation always comes last." },

  { id: "ipconfig-apipa-select", d: 5, type: "select", title: "Interpret ipconfig output",
    prompt: "A user reports no network access. Based on the output, select every statement that is TRUE.",
    context: "C:\\> ipconfig /all\n\nEthernet adapter Ethernet:\n   Connection-specific DNS Suffix  . :\n   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM\n   Physical Address. . . . . . . . . : 3C-52-82-1A-7F-04\n   DHCP Enabled. . . . . . . . . . . : Yes\n   Autoconfiguration Enabled . . . . : Yes\n   Autoconfiguration IPv4 Address. . : 169.254.83.17(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . . . . . :\n   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1",
    options: ["The client did not receive a lease from a DHCP server", "The IPv4 address was self-assigned through APIPA", "The host has a statically configured IPv4 address", "The adapter shows no physical link (media disconnected)", "The host can currently reach hosts on other subnets", "Checking the switch port VLAN and DHCP scope/relay are good next steps"],
    answers: [0, 1, 5],
    explain: "A 169.254.0.0/16 address labeled 'Autoconfiguration' with DHCP enabled means the client asked for a lease and got no answer, so Windows assigned an APIPA address. The adapter has link (otherwise ipconfig would report 'Media disconnected'), but with no default gateway it cannot leave the local segment. Likely causes include a wrong access VLAN, a missing DHCP relay (ip helper) or an exhausted scope." },

  { id: "symptom-cause-match", d: 5, type: "match", title: "Match symptoms to root causes",
    prompt: "Match each observed symptom to its most likely cause.",
    pairs: [["Interface counters show late collisions; one side is half duplex", "Duplex mismatch"], ["CRC errors keep rising on a single copper link that runs near fluorescent lighting", "EMI or a damaged cable"], ["Pings work across a VPN tunnel but large file transfers stall", "MTU mismatch / fragmentation issue"], ["New clients get 169.254.x.x while existing clients work fine", "DHCP scope exhaustion"], ["Wi-Fi drops in the break room every time lunch is heated", "2.4 GHz interference from a microwave oven"], ["Users can reach sites by IP address but not by name", "DNS misconfiguration"]],
    extra: ["Incorrect default gateway"],
    explain: "Late collisions are a classic sign of a duplex mismatch, while CRC errors point to physical problems like EMI, bad terminations or damaged cable. Small packets passing while large ones fail suggests MTU or fragmentation issues, often on tunnels. New clients failing to lease while old ones keep working points to an exhausted scope, microwave ovens interfere in the 2.4 GHz band, and working IP but failing names isolates the fault to DNS rather than the gateway." }
]);
