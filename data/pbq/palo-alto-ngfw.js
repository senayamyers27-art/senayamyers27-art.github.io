CertHub.addPbqs("palo-alto-ngfw", [
  { id: "ha-links-match", d: 1, type: "match", title: "Match HA links to what they carry",
    prompt: "Two PA-Series firewalls are being paired for high availability. Match each HA link to the traffic it carries.",
    pairs: [
      ["HA1", "Hellos, heartbeats, HA state and configuration sync"],
      ["HA2", "Session table, forwarding table and IPsec SA synchronization"],
      ["HA3", "Packet forwarding to the session owner (active/active only)"],
      ["HA1 backup", "Redundant path for control traffic if the control link fails"]
    ],
    extra: ["Administrator web GUI and SSH sessions", "GlobalProtect tunnels from remote users"],
    explain: "HA1 is the control link: hellos, heartbeats, state and config sync. HA2 is the data link that syncs sessions, forwarding tables and IPsec SAs, which is why a broken HA2 causes sessions to drop on failover. HA3 exists only in active/active and forwards packets to the peer that owns the session. Backup links protect HA1 and HA2; admin access and GlobalProtect never ride on HA links." },

  { id: "dnat-rule-fill", d: 1, type: "fill", title: "Build rules for an inbound destination NAT",
    prompt: "Internet users must reach a DMZ web server through a public IP. Using the topology below, fill in the values for the NAT rule and the security rule.",
    context: "ethernet1/1  zone: untrust  IP: 203.0.113.2/24\nethernet1/2  zone: dmz      IP: 192.168.50.1/24\n\nWeb server private IP : 192.168.50.10\nPublic IP for the site: 203.0.113.10 (owned by the firewall on ethernet1/1)\n\nNAT rule \"web-in\":    source zone untrust, destination zone ?, destination address 203.0.113.10\n                      translate destination to 192.168.50.10\nSecurity rule \"web-in\": source zone untrust, destination zone ?, destination address ?, application web-browsing, ssl",
    fields: [
      { label: "NAT rule destination zone", answers: ["untrust"] },
      { label: "Security rule destination zone", answers: ["dmz"] },
      { label: "Security rule destination address", answers: ["203.0.113.10", "203.0.113.10/32"] }
    ],
    explain: "A NAT rule matches the packet as it arrives, so both zones are pre-NAT: the public IP routes out untrust, making the NAT destination zone untrust. Security policy then uses the post-NAT zone (dmz, found by the route lookup for 192.168.50.10) but still the pre-NAT destination IP 203.0.113.10. Putting the private IP in the security rule is the classic mistake." },

  { id: "packet-flow-order", d: 1, type: "order", title: "Order the first-packet flow through PAN-OS",
    prompt: "A new TCP session arrives on a Layer 3 interface and no existing session matches. Put the firewall's processing steps in the correct order.",
    steps: [
      "Parse the packet and find no existing session (slow path)",
      "Apply zone protection checks for the ingress zone",
      "Perform the route lookup to determine the egress interface and zone",
      "Evaluate NAT policy and record the matching translation",
      "Evaluate security policy using the pre-NAT IP and post-NAT zone",
      "Identify the application with App-ID and inspect content with security profiles",
      "Apply the NAT translation and forward the packet out the egress interface"
    ],
    explain: "The firewall needs the egress zone before it can match NAT or security policy, so the forwarding lookup comes first after zone protection. NAT is evaluated before security (which is why security rules see the post-NAT zone) but translation is applied only on egress, so security still sees original addresses. App-ID and Content-ID work on the allowed session before the packet leaves." },

  { id: "ha-failover-logs", d: 1, type: "select", title: "Find the cause of an HA failover",
    prompt: "FW-A was active and failed over to FW-B overnight. Select every system log line from FW-A that shows the CAUSE of the failover (not its consequences or unrelated events).",
    context: "FW-A system log (severity  type  description)\n02:12:40 informational ha       HA1 hello received from peer 10.254.0.2\n02:13:55 high          ha       Path monitoring group 'isp-gw': destination 203.0.113.1 unreachable (3 of 3 pings failed)\n02:13:55 critical      ha       Path monitoring failed; local device state changing from active to non-functional\n02:13:56 informational ha       Peer device state changed from passive to active\n02:14:10 informational auth     User admin logged in via web from 192.168.1.20\n02:14:30 informational ha       HA2 session synchronization from peer completed\n02:15:02 informational general  Link ethernet1/1 is up",
    options: [
      "02:12:40 HA1 hello received from peer",
      "02:13:55 Path monitoring group 'isp-gw': 203.0.113.1 unreachable",
      "02:13:55 Path monitoring failed; local state active to non-functional",
      "02:13:56 Peer device state changed from passive to active",
      "02:14:10 User admin logged in via web",
      "02:14:30 HA2 session synchronization completed",
      "02:15:02 Link ethernet1/1 is up"
    ],
    answers: [1, 2],
    explain: "Path monitoring pinged the upstream router 203.0.113.1, lost it, and moved FW-A to non-functional, which triggered the failover even though ethernet1/1 stayed up (so link monitoring would not have caught it). The peer becoming active and HA2 sync are consequences, and the hello and admin login are routine events." },

  { id: "userid-source-match", d: 2, type: "match", title: "Match User-ID sources to scenarios",
    prompt: "Match each scenario to the User-ID mapping method that fits it best.",
    pairs: [
      ["Read Windows logon events (4624) from domain controllers", "Server monitoring"],
      ["A Linux wireless controller can only send authentication events as syslog", "Syslog listener with a parse profile"],
      ["Remote laptops sign in to the corporate VPN app", "GlobalProtect"],
      ["A NAC script posts login and logout events from 10.20.0.0/16", "XML API"],
      ["Unmapped users on a guest network must sign in through a web form", "Authentication Portal"]
    ],
    extra: ["Group mapping", "SSL/TLS service profile"],
    explain: "Server monitoring reads DC security logs; a syslog listener uses parse profiles to pull user and IP from third-party messages; GlobalProtect maps users when they connect; the XML API lets scripts and NAC tools push mappings; and Authentication Portal prompts users who are not mapped any other way. Group mapping only supplies group membership, not IP-to-user mappings." },

  { id: "log-forwarding-select", d: 2, type: "select", title: "Which logs does a log forwarding profile send?",
    prompt: "A syslog server receives system logs but not session or threat data. Select every log type that is forwarded by a Log Forwarding profile attached to security rules (rather than from Device > Log Settings).",
    options: ["Traffic", "Threat", "URL Filtering", "WildFire Submissions", "System", "Configuration", "HIP Match", "User-ID"],
    answers: [0, 1, 2, 3],
    explain: "Logs tied to sessions matched by a security rule (traffic, threat, URL filtering, WildFire submissions, data filtering) are forwarded by the Log Forwarding profile on that rule. System, configuration, HIP match, User-ID and GlobalProtect logs are not tied to a rule, so they are forwarded from Device > Log Settings, which explains why system logs arrive while traffic logs do not." },

  { id: "decryption-fill", d: 2, type: "fill", title: "Choose decryption certificates and actions",
    prompt: "An engineer is designing decryption. Fill in the certificate, policy type or rule action for each requirement.",
    context: "Req 1: Outbound HTTPS to sites with a valid, trusted certificate chain must be decrypted without browser warnings.\nReq 2: Outbound HTTPS to a site with an expired certificate must still show users a browser warning.\nReq 3: Inbound HTTPS to the company's own web server (cert and key available) must be decrypted.\nReq 4: A banking app that uses certificate pinning breaks when decrypted.",
    fields: [
      { label: "Req 1: certificate that signs impersonated server certs", answers: ["forward trust", "forward trust certificate", "forward-trust", "forward trust ca"] },
      { label: "Req 2: certificate presented instead", answers: ["forward untrust", "forward untrust certificate", "forward-untrust", "forward untrust ca"] },
      { label: "Req 3: decryption policy type", answers: ["ssl inbound inspection", "inbound inspection", "ssl inbound"] },
      { label: "Req 4: decryption rule action for the app", answers: ["no-decrypt", "no decrypt", "no-decryption"] }
    ],
    explain: "Forward proxy signs certificates with the forward trust CA, which clients trust, for valid sites; for invalid sites it uses the deliberately untrusted forward untrust certificate so the warning survives. Inbound inspection decrypts with the server's own certificate and key. Pinned apps reject any impersonated certificate, so they get a no-decrypt rule or a decryption exclusion." },

  { id: "ha-upgrade-order", d: 2, type: "order", title: "Upgrade an active/passive HA pair",
    prompt: "Put the steps for upgrading PAN-OS on an active/passive HA pair without a traffic outage in the correct order.",
    steps: [
      "Export a configuration backup, download the target release (and its base image) on both peers, and disable preemption",
      "Install the new PAN-OS on the passive peer and reboot it",
      "Verify the upgraded peer is back in passive state with HA and config sync healthy",
      "Suspend the active peer so the upgraded peer becomes active",
      "Install the new PAN-OS on the suspended peer and reboot it",
      "Make the suspended peer functional again and re-enable preemption"
    ],
    explain: "Upgrading the passive peer first means traffic is never interrupted: once it is verified, suspending the active peer fails traffic over to the already-upgraded firewall. Preemption is disabled so the higher-priority peer does not grab the active role mid-upgrade while versions differ, and re-enabled only when both peers run the same release." },

  { id: "panorama-match", d: 3, type: "match", title: "Match Panorama objects to their purpose",
    prompt: "Match each Panorama requirement to the construct that provides it.",
    pairs: [
      ["Security rules evaluated before any rule a local admin writes", "Device group pre-rules"],
      ["Cleanup rules evaluated after all local rules", "Device group post-rules"],
      ["Interfaces, zones, DNS and NTP settings for a set of firewalls", "Template"],
      ["Combine a global baseline template with a regional template", "Template stack"],
      ["One template sets a different IP address on each branch firewall", "Template variable"]
    ],
    extra: ["Log Collector group", "Shared gateway"],
    explain: "Device groups carry policy and objects: pre-rules run before local rules and post-rules after them. Templates carry network and device settings, template stacks layer several templates with the higher one winning, and template variables let one template supply unique per-device values. Log Collector groups handle log storage and shared gateways are a multi-vsys feature." },

  { id: "xml-api-fill", d: 3, type: "fill", title: "Fill in PAN-OS XML API request types",
    prompt: "A script automates a firewall at 192.168.1.1 through the XML API. Fill in the value of the type parameter for each call.",
    context: "1) GET /api/?type=____&user=apiadmin&password=********      -> returns <key>...</key>\n2) GET /api/?type=____&cmd=<show><system><info></info></system></show>&key=KEY\n3) GET /api/?type=____&action=set&xpath=/config/devices/entry/vsys/entry[@name='vsys1']/address/entry[@name='web-srv']&element=<ip-netmask>192.168.50.10/32</ip-netmask>&key=KEY\n4) GET /api/?type=____&cmd=<commit></commit>&key=KEY",
    fields: [
      { label: "Call 1 (get an API key)", answers: ["keygen"] },
      { label: "Call 2 (operational command)", answers: ["op"] },
      { label: "Call 3 (add an address object)", answers: ["config"] },
      { label: "Call 4 (activate the candidate config)", answers: ["commit"] }
    ],
    explain: "type=keygen exchanges credentials for an API key used by every later call. type=op runs operational commands such as show system info, type=config with action=set/edit/delete changes the candidate configuration at an XPath, and type=commit makes the candidate running. Use a dedicated admin role profile limited to the XML API for the script account." },

  { id: "bootstrap-match", d: 3, type: "match", title: "Match VM-Series bootstrap contents",
    prompt: "A VM-Series firewall is bootstrapped from a storage bucket. Match each item to where it belongs in the bootstrap package.",
    pairs: [
      ["Hostname, Panorama server IP, auth key, device group and template stack", "init-cfg.txt"],
      ["A complete firewall configuration to load at first boot", "bootstrap.xml"],
      ["Auth codes to license the firewall", "license folder"],
      ["Applications and Threats and antivirus packages", "content folder"],
      ["A PAN-OS image to upgrade to during first boot", "software folder"]
    ],
    extra: ["Template variable", "Named configuration snapshot"],
    explain: "init-cfg.txt (in the config folder) holds basic first-boot settings such as hostname and Panorama registration, while bootstrap.xml is an optional full configuration. The license folder holds the authcodes file, the content folder holds content updates, and the software folder holds a PAN-OS image to install. Snapshots and template variables are not part of a bootstrap package." }
]);
