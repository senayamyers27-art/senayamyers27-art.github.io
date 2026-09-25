CertHub.addPbqs("ccnp-encor", [
  { id: "sdwan-roles-match", d: 1, type: "match", title: "Match SD-WAN components to their roles",
    prompt: "A branch rollout plan lists the Cisco Catalyst SD-WAN components. Match each component to the job it performs in the fabric.",
    pairs: [
      ["SD-WAN Manager (vManage)", "Central GUI and API for configuration templates, monitoring and software upgrades"],
      ["SD-WAN Validator (vBond)", "First point of contact that authenticates devices, orchestrates onboarding and helps with NAT traversal"],
      ["SD-WAN Controller (vSmart)", "Control plane that runs OMP, distributes routes, TLOCs and centralized policy"],
      ["WAN Edge router", "Data plane device that builds IPsec tunnels to other sites and forwards user traffic"]
    ],
    extra: ["Stores EID-to-RLOC mappings for the LISP control plane", "Assigns Security Group Tags to endpoints after 802.1X"],
    explain: "The Manager is the management plane (single pane of glass), the Validator is the orchestration plane that authenticates every component and tells edges where the Controllers are, and the Controllers are the control plane that exchange OMP routes and push policy. Only WAN Edges carry user traffic, over IPsec tunnels built directly between sites. The distractors describe SD-Access pieces: LISP map servers and ISE/TrustSec SGT assignment." },

  { id: "dscp-values-fill", d: 1, type: "fill", title: "Fill in DSCP values for a QoS policy",
    prompt: "You are writing an MQC policy that matches traffic by DSCP. Enter the decimal DSCP value for each marking (and the binary for EF).",
    context: "class-map match-any VOICE\n match dscp ef\nclass-map match-any VIDEO\n match dscp af41\nclass-map match-any CRITICAL-DATA\n match dscp af31\nclass-map match-any SIGNALING\n match dscp cs3\n!\npolicy-map WAN-EDGE\n class VOICE\n  priority percent 20\n class VIDEO\n  bandwidth percent 25\n class CRITICAL-DATA\n  bandwidth percent 20\n class class-default\n  fair-queue",
    fields: [
      { label: "EF (decimal)", answers: ["46"] },
      { label: "EF (6-bit binary)", answers: ["101110"] },
      { label: "AF41 (decimal)", answers: ["34"] },
      { label: "AF31 (decimal)", answers: ["26"] },
      { label: "CS3 (decimal)", answers: ["24"] }
    ],
    explain: "EF is 46 (binary 101110) and is used for voice in the LLQ priority class. AFxy values follow DSCP = 8x + 2y, so AF41 = 32 + 2 = 34 and AF31 = 24 + 2 = 26. Class selector values are 8 times the class number, so CS3 = 24, which keeps backward compatibility with IP Precedence 3." },

  { id: "gre-mtu-fill", d: 2, type: "fill", title: "Size MTU and MSS for a GRE tunnel",
    prompt: "Users report that some web pages stall over a new GRE tunnel whose underlay path has a 1500-byte MTU. Fill in the correct values to avoid fragmentation of plain GRE over IPv4 (no key, no checksum, no IPsec).",
    context: "interface Tunnel0\n ip address 10.255.0.1 255.255.255.252\n ip mtu ____\n ip tcp adjust-mss ____\n tunnel source GigabitEthernet0/0\n tunnel destination 203.0.113.2\n!\ninterface GigabitEthernet0/0\n ip address 198.51.100.1 255.255.255.0\n mtu 1500",
    fields: [
      { label: "GRE overhead in bytes", answers: ["24"] },
      { label: "Tunnel ip mtu", answers: ["1476"] },
      { label: "ip tcp adjust-mss value", answers: ["1436"] }
    ],
    explain: "Plain GRE over IPv4 adds a new 20-byte IP header plus a 4-byte GRE header, so 24 bytes of overhead and a tunnel IP MTU of 1500 - 24 = 1476. The TCP MSS must also leave room for the 20-byte inner IP header and 20-byte TCP header, so 1476 - 40 = 1436. Adding IPsec would add more overhead, which is why many designs use 1400 and 1360 for safety." },

  { id: "stp-guards-match", d: 3, type: "match", title: "Match spanning tree protection features",
    prompt: "Match each spanning tree feature to what it does when its condition is met.",
    pairs: [
      ["BPDU guard", "Err-disables an edge port as soon as it receives any BPDU"],
      ["Root guard", "Puts a port into root-inconsistent state if it receives a superior BPDU"],
      ["Loop guard", "Puts a non-designated port into loop-inconsistent state when BPDUs stop arriving"],
      ["BPDU filter", "Stops sending and processing BPDUs on the port"],
      ["PortFast", "Moves an access port straight to forwarding, skipping listening and learning"]
    ],
    extra: ["Limits broadcast traffic to a percentage of port bandwidth", "Blocks the port if the far end stops echoing UDLD frames"],
    explain: "BPDU guard protects edge ports from rogue switches, while root guard is used on designated ports toward the access layer so a downstream switch cannot become root. Loop guard protects root and alternate ports against unidirectional links that stop delivering BPDUs. BPDU filter silently ignores BPDUs, which is risky because it can allow loops, and PortFast only speeds up convergence for host ports. The extras describe storm control and aggressive UDLD, which are not STP features." },

  { id: "eigrp-fs-select", d: 3, type: "select", title: "Identify EIGRP feasible successors",
    prompt: "Using the topology table below, select every neighbor that qualifies as a feasible successor for 10.10.10.0/24.",
    context: "R1# show ip eigrp topology all-links\nP 10.10.10.0/24, 1 successors, FD is 30720, serno 42\n        via 10.0.12.2 (30720/28160), GigabitEthernet0/1\n        via 10.0.13.3 (35840/25600), GigabitEthernet0/2\n        via 10.0.14.4 (33280/30720), GigabitEthernet0/3\n        via 10.0.15.5 (40960/15360), GigabitEthernet0/4\n        via 10.0.16.6 (46080/40960), GigabitEthernet0/5",
    options: ["10.0.12.2 via Gi0/1", "10.0.13.3 via Gi0/2", "10.0.14.4 via Gi0/3", "10.0.15.5 via Gi0/4", "10.0.16.6 via Gi0/5"],
    answers: [1, 3],
    explain: "The feasibility condition says a neighbor's reported distance (the second number) must be strictly lower than the current feasible distance of 30720. 10.0.13.3 (RD 25600) and 10.0.15.5 (RD 15360) pass, so they are loop-free backups. 10.0.12.2 is the successor itself, 10.0.14.4 has an RD equal to the FD (not lower), and 10.0.16.6 has an RD above the FD, so neither can be a feasible successor." },

  { id: "bgp-bestpath-order", d: 3, type: "order", title: "Order the BGP best-path attributes",
    prompt: "A Cisco router has several paths to the same prefix. Put the best-path selection checks in the order IOS evaluates them.",
    steps: [
      "Highest weight",
      "Highest local preference",
      "Prefer a locally originated route (network, redistribute or aggregate)",
      "Shortest AS_PATH",
      "Lowest origin type (IGP, then EGP, then incomplete)",
      "Lowest MED",
      "Prefer eBGP over iBGP paths",
      "Lowest IGP metric to the next hop"
    ],
    explain: "IOS first checks the Cisco-specific weight (local to the router), then local preference (shared across the AS), then routes the router originated itself. AS_PATH length, origin code and MED follow, and only then does it prefer external over internal paths and the closest next hop by IGP metric. Later tie-breakers include the oldest eBGP path and the lowest router ID. A common memory aid is 'We Love Oranges AS Oranges Mean Pure Refreshment'." },

  { id: "ospf-areas-match", d: 3, type: "match", title: "Match OSPF area types to LSA behavior",
    prompt: "Match each OSPF area type to how its ABR handles LSAs entering the area.",
    pairs: [
      ["Standard (normal) area", "Allows type 1, 2, 3, 4 and 5 LSAs"],
      ["Stub area", "Blocks type 4 and 5 LSAs and injects a default route as a type 3 LSA"],
      ["Totally stubby area", "Blocks type 3, 4 and 5 LSAs except a single type 3 default route"],
      ["NSSA", "Blocks type 5 LSAs but lets a local ASBR originate type 7 LSAs"],
      ["Totally NSSA", "Blocks type 3, 4 and 5 LSAs except a default route, and still allows type 7 LSAs"]
    ],
    extra: ["Floods only type 1 LSAs and no summaries"],
    explain: "Stub areas remove external (type 5) and ASBR summary (type 4) LSAs and rely on a default route; totally stubby also removes inter-area type 3 summaries. NSSA works like a stub but allows redistribution inside the area, carried as type 7 LSAs that the ABR translates to type 5. Totally NSSA combines both ideas. Totally stubby and totally NSSA are Cisco features configured with the no-summary keyword on the ABR." },

  { id: "etherchannel-select", d: 3, type: "select", title: "Find EtherChannel members that are not forwarding",
    prompt: "Users on DIST-SW1 report reduced uplink capacity. Select every member interface that is NOT currently forwarding traffic as part of Po1.",
    context: "DIST-SW1# show etherchannel summary\nFlags:  D - down        P - bundled in port-channel\n        I - stand-alone s - suspended\n        H - Hot-standby (LACP only)\n        S - Layer2      U - in use\n\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+----------------------------------\n1      Po1(SU)         LACP      Gi1/0/1(P)  Gi1/0/2(P)  Gi1/0/3(s)\n                                 Gi1/0/4(I)  Gi1/0/5(D)  Gi1/0/6(P)",
    options: ["Gi1/0/1", "Gi1/0/2", "Gi1/0/3", "Gi1/0/4", "Gi1/0/5", "Gi1/0/6"],
    answers: [2, 3, 4],
    explain: "Only ports flagged P are bundled and carrying traffic in Po1. Gi1/0/3 is suspended (s), which usually means its speed, duplex, trunk or VLAN settings do not match the other members. Gi1/0/4 is stand-alone (I), so it is up but got no LACP PDUs from a partner, and Gi1/0/5 is down (D). Fix the member config consistency and the far-end channel-group mode to restore full bandwidth." },

  { id: "syslog-trap-select", d: 4, type: "select", title: "Predict which messages reach the syslog server",
    prompt: "A router has 'logging host 192.0.2.50' and 'logging trap warnings'. Select every message below that will be sent to the syslog server.",
    context: "Router(config)# logging host 192.0.2.50\nRouter(config)# logging trap warnings\n\nMessages generated in the last hour:\n%LINK-3-UPDOWN: Interface GigabitEthernet0/2, changed state to down\n%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/2, changed state to down\n%SEC-6-IPACCESSLOGP: list EDGE-IN denied tcp 203.0.113.9(51514) -> 198.51.100.10(23), 1 packet\n%SYS-2-MALLOCFAIL: Memory allocation of 65536 bytes failed\n%CDP-4-DUPLEX_MISMATCH: duplex mismatch discovered on GigabitEthernet0/3\n%OSPF-5-ADJCHG: Process 1, Nbr 10.0.0.2 on Gi0/2 from FULL to DOWN",
    options: ["%LINK-3-UPDOWN", "%LINEPROTO-5-UPDOWN", "%SEC-6-IPACCESSLOGP", "%SYS-2-MALLOCFAIL", "%CDP-4-DUPLEX_MISMATCH", "%OSPF-5-ADJCHG"],
    answers: [0, 3, 4],
    explain: "The number in the middle of each mnemonic is the severity, and 'logging trap warnings' sends level 4 and everything more severe (lower numbers 0-4). That means Errors (3), Critical (2) and Warnings (4) are sent. Notifications (5) such as interface line protocol and OSPF adjacency changes, and Informational (6) ACL log hits, stay local unless the trap level is raised to notifications or informational." },

  { id: "acl-evaluate-select", d: 5, type: "select", title: "Evaluate an extended ACL",
    prompt: "The ACL below is applied inbound on the Internet-facing interface. Select every packet that the router will permit.",
    context: "ip access-list extended EDGE-IN\n 10 permit tcp any host 192.0.2.10 eq 443\n 20 deny   tcp any host 192.0.2.10 eq 22\n 30 permit tcp 198.51.100.0 0.0.0.255 host 192.0.2.10 eq 22\n 40 permit udp any host 192.0.2.53 eq 53\n 50 deny   ip any any log\n!\ninterface GigabitEthernet0/0\n ip access-group EDGE-IN in",
    options: [
      "TCP 203.0.113.5:50122 -> 192.0.2.10:443",
      "TCP 198.51.100.20:50200 -> 192.0.2.10:22",
      "UDP 203.0.113.9:53001 -> 192.0.2.53:53",
      "TCP 203.0.113.9:53002 -> 192.0.2.53:53",
      "TCP 198.51.100.20:50300 -> 192.0.2.10:80",
      "ICMP echo 203.0.113.5 -> 192.0.2.10"
    ],
    answers: [0, 2],
    explain: "ACLs are processed top-down and stop at the first match. HTTPS to 192.0.2.10 matches line 10 and DNS over UDP matches line 40. The SSH packet from 198.51.100.20 is denied by line 20 before it ever reaches the more specific permit on line 30, a classic ordering mistake. DNS over TCP, HTTP and ICMP match no permit and hit the explicit deny on line 50." },

  { id: "l2-security-match", d: 5, type: "match", title: "Match access-layer security features",
    prompt: "Match each access-layer security feature to what it does.",
    pairs: [
      ["DHCP snooping", "Drops DHCP server messages on untrusted ports and builds the IP-to-MAC binding table"],
      ["Dynamic ARP inspection", "Validates ARP packets on untrusted ports against the binding table"],
      ["IP source guard", "Filters traffic on a port whose source IP does not match the binding for that port"],
      ["Port security", "Limits how many MAC addresses a port can learn and acts on violations"],
      ["802.1X", "Authenticates the user or device with EAP through a RADIUS server before granting access"],
      ["MAC Authentication Bypass", "Uses the endpoint's MAC address as its credential when it has no supplicant"]
    ],
    extra: ["Encrypts frames hop by hop between switches", "Rate-limits traffic destined to the route processor"],
    explain: "DHCP snooping is the foundation: its binding table is what DAI and IP source guard check against, so those two depend on snooping being enabled. Port security works purely on MAC counts. 802.1X is the preferred identity-based control and MAB is the fallback for printers, cameras and other devices without a supplicant. The extras describe MACsec and CoPP." },

  { id: "rest-codes-match", d: 6, type: "match", title: "Match REST API responses to scenarios",
    prompt: "A Python script calls the Catalyst Center Intent API. Match each HTTP status code to the scenario that most likely produced it.",
    pairs: [
      ["200", "GET /dna/intent/api/v1/network-device returned the device list"],
      ["201", "A POST created a new site and the response points to the new resource"],
      ["204", "A DELETE succeeded and the response has no body"],
      ["400", "The JSON body sent with a POST was malformed"],
      ["401", "The X-Auth-Token header was missing or the token had expired"],
      ["403", "The token was valid but the user's role is not allowed to make changes"],
      ["404", "The request used a device ID that does not exist"]
    ],
    extra: ["The API server hit an unhandled internal error", "The client exceeded its request rate limit"],
    explain: "2xx codes mean success: 200 OK, 201 Created and 204 No Content. 4xx codes are client-side problems: 400 is a bad request body, 401 means you are not authenticated (get a new token), 403 means you are authenticated but not authorized, and 404 means the resource does not exist. The extras describe 500 Internal Server Error and 429 Too Many Requests." },

  { id: "python-json-fill", d: 6, type: "fill", title: "Read values from parsed JSON in Python",
    prompt: "The script below parses an API response. Fill in what each expression evaluates to.",
    context: "import json\n\nresp_text = '''\n{\n  \"response\": [\n    {\"hostname\": \"edge-rtr1\", \"softwareVersion\": \"17.9.4\", \"reachabilityStatus\": \"Reachable\"},\n    {\"hostname\": \"acc-sw2\", \"softwareVersion\": \"17.6.5\", \"reachabilityStatus\": \"Unreachable\"},\n    {\"hostname\": \"acc-sw3\", \"softwareVersion\": \"17.9.4\", \"reachabilityStatus\": \"Reachable\"}\n  ],\n  \"version\": \"1.0\"\n}\n'''\ndata = json.loads(resp_text)\ndown = [d[\"hostname\"] for d in data[\"response\"] if d[\"reachabilityStatus\"] != \"Reachable\"]",
    fields: [
      { label: "len(data[\"response\"])", answers: ["3"] },
      { label: "data[\"response\"][0][\"softwareVersion\"]", answers: ["17.9.4", "'17.9.4'", "\"17.9.4\""] },
      { label: "type(data[\"response\"]).__name__", answers: ["list"] },
      { label: "down[0]", answers: ["acc-sw2", "'acc-sw2'", "\"acc-sw2\""] }
    ],
    explain: "json.loads turns a JSON object into a Python dict and a JSON array into a list, so data['response'] is a list of three dicts. Indexing starts at 0, so element 0 is edge-rtr1 with version 17.9.4. The list comprehension keeps only devices whose status is not Reachable, so down contains just acc-sw2." }
]);
