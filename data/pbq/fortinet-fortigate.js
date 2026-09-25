CertHub.addPbqs("fortinet-fortigate", [
  {
    id: "ha-election-order", d: 1, type: "order",
    title: "FGCP primary election (override disabled)",
    prompt: "With HA override disabled (the default), put the FGCP primary-election criteria in the order FortiGate compares them, from checked first to checked last.",
    steps: [
      "Number of connected monitored interfaces (most wins)",
      "HA uptime beyond the uptime margin (highest wins)",
      "Device priority (highest wins)",
      "Serial number (highest wins)"
    ],
    explain: "With override off, FGCP compares monitored interfaces first, then HA uptime, then priority, then serial number. Because uptime outranks priority here, raising a returning unit's priority does not make it primary until override is enabled or uptime is reset. Serial number is only the final tie-breaker."
  },
  {
    id: "debug-flow-order", d: 1, type: "order",
    title: "Trace a dropped session with debug flow",
    prompt: "Put these CLI steps in the correct order to capture a debug flow trace for traffic to 192.0.2.50 and then clean up.",
    steps: [
      "diagnose debug reset",
      "diagnose debug flow filter addr 192.0.2.50",
      "diagnose debug flow trace start 20",
      "diagnose debug enable",
      "diagnose debug disable"
    ],
    explain: "You reset any old filters first, set the address filter, start the trace for a number of packets, then enable debug so output prints to the console. Nothing appears until debug is enabled. You finish with diagnose debug disable so the console stops streaming once you have the output."
  },
  {
    id: "conserve-mode-select", d: 1, type: "select",
    title: "Read get system performance status",
    prompt: "Given this output, select every statement that is correct.",
    context: "FGT # get system performance status\nCPU states: 3% user 2% system 0% nice 95% idle\nMemory: 2020168k total, 1717060k used (85.0%), 303108k free\nMemory conserve mode: on\nAverage sessions: 4200 sessions\nUptime: 6 days, 2 hours, 11 minutes",
    options: [
      "The unit is in memory conserve mode",
      "Memory usage is about 85%, above the red threshold",
      "CPU is the resource under pressure, not memory",
      "The av-failopen setting now decides whether proxy-inspected traffic passes uninspected",
      "The device has been up for about 6 days"
    ],
    answers: [0, 1, 3, 4],
    explain: "The output shows conserve mode on and memory at 85% used, which is why the unit entered conserve mode; CPU is 95% idle, so memory not CPU is the pressure. In conserve mode av-failopen decides whether traffic needing proxy AV passes uninspected, is dropped, or passes once. Uptime confirms about 6 days."
  },
  {
    id: "policy-fields-select", d: 2, type: "select",
    title: "What matches a firewall policy",
    prompt: "A FortiGate is choosing which firewall policy a new session hits. Select every field that is used to MATCH the policy (not fields applied only after a match).",
    options: [
      "Incoming and outgoing interface",
      "Source address, user or ISDB",
      "Destination address",
      "Service and schedule",
      "The antivirus profile attached to the policy",
      "The IP pool used for source NAT"
    ],
    answers: [0, 1, 2, 3],
    explain: "Policy matching uses interfaces, source, destination, service and schedule, evaluated top-down for the first match. Security profiles such as antivirus and the NAT/IP-pool settings are applied only after a policy has matched, so they never decide which policy is selected."
  },
  {
    id: "ippool-match", d: 2, type: "match",
    title: "Match NAT scenario to source-NAT choice",
    prompt: "Match each outbound-NAT scenario to the best source-NAT option.",
    pairs: [
      ["One public WAN IP for all internal users", "NAT with outgoing interface address"],
      ["Four public IPs shared by 800 users", "Overload IP pool"],
      ["Each host needs its own public IP, no port translation", "One-to-one IP pool"],
      ["Predictable external port ranges for logging", "Fixed port range IP pool"]
    ],
    extra: ["Static NAT VIP", "Central DNAT"],
    explain: "A single WAN IP is handled by NAT using the outgoing interface address. Overload shares a small pool among many users with port translation, while one-to-one gives each host a whole IP (so pool size caps users). Fixed port range maps predictable external ports. VIPs and DNAT are destination NAT, not source NAT."
  },
  {
    id: "vip-portfwd-fill", d: 2, type: "fill",
    title: "Publish an internal server with a VIP",
    prompt: "An internal web server 198.51.100.10 listening on TCP 443 must be reachable from the Internet on public IP 203.0.113.20, external port 8443, using a port-forwarding VIP. Fill in the VIP values.",
    fields: [
      { label: "External IP address", answers: ["203.0.113.20"] },
      { label: "Mapped (internal) IP address", answers: ["198.51.100.10"] },
      { label: "External service port", answers: ["8443"] },
      { label: "Mapped (internal) port", answers: ["443"] },
      { label: "Policy direction (from zone to zone, e.g. WAN to DMZ)", answers: ["WAN to DMZ", "wan-to-dmz", "WAN-DMZ", "WAN to LAN", "external to internal"] }
    ],
    explain: "A port-forwarding VIP translates both address and port: external 203.0.113.20:8443 maps to 198.51.100.10:443. The VIP is used as the destination of an inbound policy from the untrusted (WAN) side toward the server's interface. Services only match traffic; they never rewrite the port, so port forwarding must be set on the VIP."
  },
  {
    id: "fsso-mode-match", d: 2, type: "match",
    title: "Match FSSO requirement to mode",
    prompt: "Match each Active Directory constraint to the FSSO deployment that fits it.",
    pairs: [
      ["Real-time logons, agent allowed on each DC", "DC agent mode"],
      ["No software permitted on domain controllers", "Polling mode"],
      ["Identify users who never trigger a login page", "Passive authentication"],
      ["Prompt users for AD credentials at a portal", "Active (captive portal) authentication"]
    ],
    extra: ["TACACS+ accounting", "RADIUS CoA"],
    explain: "DC agent mode installs an agent on each domain controller and pushes logon events in real time. Polling mode reads DC security logs remotely with no DC software. FSSO is passive single sign-on; a captive portal is active authentication that prompts the user. TACACS+ and RADIUS CoA are unrelated to FSSO group discovery."
  },
  {
    id: "ssl-inspection-select", d: 3, type: "select",
    title: "Certificate vs deep inspection",
    prompt: "A policy currently uses certificate inspection. Select every statement that is TRUE about certificate inspection versus deep inspection.",
    context: "Policy: LAN -> WAN\nSSL inspection profile: certificate-inspection\nSecurity profiles: AV (enabled), Web filter (enabled), App control (enabled)",
    options: [
      "Certificate inspection can read the SNI and apply web categories",
      "Antivirus can scan files inside HTTPS with certificate inspection",
      "Deep inspection re-signs server certificates with the FortiGate CA",
      "Clients must trust the FortiGate CA for deep inspection to avoid warnings",
      "Certificate-pinned apps may break under deep inspection"
    ],
    answers: [0, 2, 3, 4],
    explain: "Certificate inspection reads the unencrypted handshake (SNI, certificate names) so it can apply categories, but it cannot see payloads, so AV cannot scan files inside TLS with it. Deep inspection decrypts by re-signing with the FortiGate CA, which clients must trust, and pinned apps that reject the re-signed certificate can break."
  },
  {
    id: "webfilter-action-match", d: 3, type: "match",
    title: "Match web filter behavior to action",
    prompt: "Match what the user experiences to the FortiGuard web filter or static URL filter action that causes it.",
    pairs: [
      ["Interstitial page; user may choose to continue", "Warning"],
      ["Skips all remaining web filter checks for that URL", "Exempt"],
      ["Permitted but still sent to the category check", "Allow"],
      ["Silently recorded but not stopped", "Monitor"]
    ],
    extra: ["Quarantine", "Disclaimer"],
    explain: "Warning shows a page the user can click through, while Block gives no choice. In the static URL filter, Exempt skips later checks entirely, but Allow still passes the URL on to the FortiGuard category check, which may block it. Monitor permits and logs without stopping traffic."
  },
  {
    id: "inspection-tools-match", d: 3, type: "match",
    title: "Match the security control to the threat",
    prompt: "Match each requirement to the FortiGate content-inspection feature that best addresses it.",
    pairs: [
      ["Block BitTorrent that hops ports and uses TLS", "Application control"],
      ["Strip macros from Office files before delivery", "Content disarm and reconstruction"],
      ["Detect unknown malware by running it", "FortiSandbox"],
      ["Stop hosts reaching known C&C servers", "IPS botnet C&C blocking"],
      ["Limit a SYN flood before policy lookup", "DoS policy"]
    ],
    extra: ["IP pool overload", "Traffic shaper"],
    explain: "Port-hopping P2P needs signature-based application control, not a single port block. CDR (proxy mode) rebuilds files without active content. FortiSandbox runs unknown files for behavior analysis. IPS botnet C&C blocking uses FortiGuard's C&C list, and DoS policies apply anomaly thresholds early, before firewall policy lookup."
  },
  {
    id: "route-select-fill", d: 4, type: "fill",
    title: "Static route selection by distance and priority",
    prompt: "A FortiGate has two static default routes: Route A via wan1 (distance 10, priority 0) and Route B via wan2 (distance 20, priority 0). Answer each question with a short value.",
    fields: [
      { label: "Which route is installed in the active routing table? (A or B)", answers: ["A", "Route A", "wan1"] },
      { label: "Administrative distance of the active route", answers: ["10"] },
      { label: "If both routes had distance 10 and priorities 0 and 5, which is preferred? (A or B)", answers: ["A", "Route A"] },
      { label: "If both had equal distance AND equal priority, what forwarding results? (one word/acronym)", answers: ["ECMP", "equal-cost multipath", "equal cost multipath"] }
    ],
    explain: "Lower administrative distance wins, so Route A (distance 10) is installed and B waits in the routing database. With equal distance, the lower priority value is preferred, so priority 0 beats priority 5. Equal distance and equal priority produce ECMP, which by default distributes sessions by source IP."
  },
  {
    id: "sdwan-strategy-match", d: 4, type: "match",
    title: "Match traffic goal to SD-WAN rule strategy",
    prompt: "Match each business goal to the SD-WAN rule strategy that fits it.",
    pairs: [
      ["Always use the member with the lowest jitter", "Best quality"],
      ["Use cheap broadband while it meets the SLA", "Lowest cost (SLA)"],
      ["Spread sessions over all members meeting the SLA", "Maximize bandwidth (SLA)"],
      ["Force voice down MPLS first regardless of metrics", "Manual"]
    ],
    extra: ["Round robin per packet", "Longest prefix match"],
    explain: "Best quality picks the member with the best measured value (here jitter). Lowest cost (SLA) uses the cheapest member that still meets the SLA target. Maximize bandwidth (SLA) load-balances across all compliant members, and Manual pins traffic to chosen members regardless of measurements."
  },
  {
    id: "ipsec-p2-order", d: 5, type: "order",
    title: "Troubleshoot phase 2 failure",
    prompt: "Phase 1 of a site-to-site IPsec tunnel is up but phase 2 never forms. Put these troubleshooting steps in a sensible order.",
    steps: [
      "diagnose debug application ike -1",
      "diagnose debug enable",
      "Reproduce the traffic so IKE renegotiates",
      "Compare phase 2 proposals, PFS/DH group and selectors on both peers",
      "Fix the mismatched selector or proposal and re-test"
    ],
    explain: "Phase 1 success proves the key, IKE version and reachability are fine, so phase 2 problems are almost always mismatched proposals, PFS/DH group or quick-mode selectors. You start the IKE debug, enable output, trigger traffic to force negotiation, read the mismatch, then correct the offending side and verify."
  },
  {
    id: "vpn-ports-fill", d: 5, type: "fill",
    title: "IPsec ports and tunnel counts",
    prompt: "Answer these IPsec facts. Keep answers short.",
    fields: [
      { label: "UDP port used by IKE", answers: ["500", "udp 500"] },
      { label: "UDP port used after NAT traversal (NAT-T)", answers: ["4500", "udp 4500"] },
      { label: "Tunnels needed for a full mesh of 5 sites", answers: ["10"] },
      { label: "Feature that lets spokes build direct tunnels on demand", answers: ["ADVPN", "auto-discovery vpn"] }
    ],
    explain: "IKE negotiates on UDP 500 and shifts to UDP 4500 when NAT-T is needed. A full mesh needs n(n-1)/2 tunnels, so 5 sites need 10, versus only 4 in hub-and-spoke. ADVPN starts as hub-and-spoke and builds on-demand shortcut tunnels between spokes."
  }
]);
