/* Hands-on Cisco IOS exercises for CCNA (200-301 v2.0). Checked by tools/check-data.js against public/assets/ios.js. */
CertHub.addHandson("ccna", {
  tables: {},
  items: [
    {
      id: "ccna-svi-ip", kind: "ios", d: 1,
      title: "Give a switch a management IP address",
      prompt: "This access switch has no IP address, so you cannot reach it remotely.\n\nPut a management address on interface VLAN 1 (`192.168.1.10 255.255.255.0`), bring the interface up, and set the switch's default gateway to `192.168.1.1` so replies can leave the subnet.",
      hint: "A switch reaches other subnets through ip default-gateway, which is a global command, not an interface one. The SVI itself needs no shutdown to come up.",
      explain: "A Layer 2 switch has one IP for management, usually on an SVI such as interface VLAN 1. Because the switch does not route, it relies on ip default-gateway to answer hosts in other subnets, exactly like an end device. Forgetting no shutdown on the SVI, or the gateway, is a classic reason remote management fails.",
      setup: { hostname: "AccessSW", type: "switch", interfaces: { "Vlan1": {}, "GigabitEthernet0/1": {} } },
      checks: [
        { label: "VLAN 1 has address 192.168.1.10", type: "intf", name: "Vlan1", path: "ip", value: "192.168.1.10" },
        { label: "The VLAN 1 interface is enabled (no shutdown)", type: "intf", name: "Vlan1", path: "shutdown", value: false },
        { label: "The default gateway is 192.168.1.1", type: "config", includes: "ip default-gateway 192.168.1.1" }
      ],
      solution: ["enable", "configure terminal", "interface vlan 1", "ip address 192.168.1.10 255.255.255.0", "no shutdown", "exit", "ip default-gateway 192.168.1.1", "end"]
    },
    {
      id: "ccna-dhcp-pool", kind: "ios", d: 1,
      title: "Configure an IOS DHCP server pool",
      prompt: "Hosts on 192.168.20.0/24 should lease their addresses from this router.\n\nCreate a DHCP pool named `LAN` for the `192.168.20.0 255.255.255.0` network, hand clients the default router `192.168.20.1`, and give them the DNS server `8.8.8.8`.",
      hint: "Start with ip dhcp pool NAME to enter the pool, then set network, default-router and dns-server one per line.",
      explain: "An IOS DHCP pool supplies clients with an address from its network statement plus options such as the default gateway (default-router) and DNS server (dns-server). Addresses the router itself uses should be kept back with ip dhcp excluded-address so they are never leased twice. This is the CCNA DHCPv4 objective in Domain 1.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { ip: "192.168.20.1", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "A DHCP pool named LAN exists", type: "config", includes: "ip dhcp pool LAN" },
        { label: "The pool serves 192.168.20.0/24", type: "config", includes: "network 192.168.20.0 255.255.255.0" },
        { label: "Clients get default router 192.168.20.1", type: "config", includes: "default-router 192.168.20.1" },
        { label: "Clients get DNS server 8.8.8.8", type: "config", includes: "dns-server 8.8.8.8" }
      ],
      solution: ["enable", "configure terminal", "ip dhcp pool LAN", "network 192.168.20.0 255.255.255.0", "default-router 192.168.20.1", "dns-server 8.8.8.8", "end"]
    },
    {
      id: "ccna-vlans", kind: "ios", d: 2,
      title: "Create and name two VLANs",
      prompt: "This switch still has only the default VLAN.\n\nCreate VLAN 10 named `USERS` and VLAN 20 named `SERVERS` so the two groups sit in separate broadcast domains. Confirm your work with `show vlan brief`.",
      hint: "Enter each VLAN with vlan N in global config, then set its name with the name command before you exit.",
      explain: "Each VLAN is a separate broadcast domain, so splitting users and servers into VLAN 10 and VLAN 20 limits broadcast traffic and lets you apply different policies. The name is only a label for humans, but the exam expects consistent names across switches. show vlan brief lists every VLAN and the access ports assigned to it.",
      setup: { hostname: "SW1", type: "switch", interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "VLAN 10 is named USERS", type: "vlan", id: 10, name: "USERS" },
        { label: "VLAN 20 is named SERVERS", type: "vlan", id: 20, name: "SERVERS" }
      ],
      solution: ["enable", "configure terminal", "vlan 10", "name USERS", "exit", "vlan 20", "name SERVERS", "end"]
    },
    {
      id: "ccna-access-port", kind: "ios", d: 2,
      title: "Assign an access port to a VLAN",
      prompt: "A user PC is plugged into GigabitEthernet0/1, but the port still carries the default VLAN.\n\nMake GigabitEthernet0/1 a static access port and place it in VLAN 10. Verify with `show vlan brief` that the port now shows under VLAN 10.",
      hint: "Set the port role with switchport mode access first, then switchport access vlan 10 to place it.",
      explain: "An access port belongs to exactly one data VLAN and strips tags before delivering frames to the host. Setting switchport mode access pins the role so it will not negotiate a trunk, and switchport access vlan 10 assigns membership. Leaving a port on dynamic auto is a common exam trap because it can unexpectedly form a trunk.",
      setup: { hostname: "SW1", type: "switch", vlans: { 10: "USERS" }, interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "GigabitEthernet0/1 is an access port", type: "intf", name: "GigabitEthernet0/1", path: "mode", value: "access" },
        { label: "GigabitEthernet0/1 is in VLAN 10", type: "intf", name: "GigabitEthernet0/1", path: "vlan", value: "10" }
      ],
      solution: ["enable", "configure terminal", "interface g0/1", "switchport mode access", "switchport access vlan 10", "end"]
    },
    {
      id: "ccna-trunk", kind: "ios", d: 2,
      title: "Build an 802.1Q trunk between switches",
      prompt: "GigabitEthernet0/24 is the uplink to the next switch and must carry several VLANs.\n\nConfigure it as a trunk, set the native VLAN to 99, and restrict the allowed VLAN list to 10 and 20. Check the result with `show interfaces trunk`.",
      hint: "Force the role with switchport mode trunk, then use the switchport trunk native vlan and switchport trunk allowed vlan commands.",
      explain: "A trunk carries many VLANs over one link by tagging frames with 802.1Q. Matching the native VLAN on both ends avoids a native VLAN mismatch, and pruning the allowed list to only the VLANs in use limits the failure domain and unneeded flooding. show interfaces trunk confirms the mode, native VLAN and allowed list.",
      setup: { hostname: "SW1", type: "switch", vlans: { 10: "USERS", 20: "SERVERS", 99: "NATIVE" }, interfaces: { "GigabitEthernet0/24": {} } },
      checks: [
        { label: "GigabitEthernet0/24 is a trunk", type: "intf", name: "GigabitEthernet0/24", path: "mode", value: "trunk" },
        { label: "The native VLAN is 99", type: "intf", name: "GigabitEthernet0/24", path: "native", value: "99" },
        { label: "Only VLANs 10 and 20 are allowed", type: "config", includes: "switchport trunk allowed vlan 10,20" }
      ],
      solution: ["enable", "configure terminal", "interface g0/24", "switchport mode trunk", "switchport trunk native vlan 99", "switchport trunk allowed vlan 10,20", "end"]
    },
    {
      id: "ccna-default-route", kind: "ios", d: 3,
      title: "Add a default static route to the internet",
      prompt: "This edge router reaches the internet through the next hop `203.0.113.1`.\n\nAdd a default static route (`0.0.0.0 0.0.0.0`) pointing at that next hop, then confirm it appears with `show ip route`.",
      hint: "The syntax is ip route PREFIX MASK NEXT-HOP; a default route uses 0.0.0.0 for both the prefix and the mask.",
      explain: "A default route (0.0.0.0/0) matches any destination not found more specifically in the table, which is how a stub network reaches the internet. Longest-prefix match still prefers any more specific route first, so the default is used only as a last resort and shows as the gateway of last resort. This is core CCNA static routing.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/1": { ip: "203.0.113.2", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "A default route to 203.0.113.1 is configured", type: "config", includes: "ip route 0.0.0.0 0.0.0.0 203.0.113.1" },
        { label: "The default route appears in the routing table", type: "route", prefix: "0.0.0.0/0" }
      ],
      solution: ["enable", "configure terminal", "ip route 0.0.0.0 0.0.0.0 203.0.113.1", "end"]
    },
    {
      id: "ccna-static-route", kind: "ios", d: 3,
      title: "Reach a remote subnet with a static route",
      prompt: "The subnet 192.168.50.0/24 lives behind a neighbour router at `10.0.0.2`.\n\nAdd a static route so this router can reach 192.168.50.0/24 through that next hop, then confirm it with `show ip route`.",
      hint: "Use ip route with the destination network, its subnet mask (255.255.255.0 for a /24), and the next-hop address.",
      explain: "A static route tells the router exactly where to send traffic for a destination it is not directly connected to. Static routes have an administrative distance of 1, so they are trusted over most dynamic routes, and they are predictable but do not adapt if the path fails. Reading and writing ip route lines is a graded CCNA skill.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { ip: "10.0.0.1", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "A static route to 192.168.50.0/24 via 10.0.0.2 exists", type: "config", includes: "ip route 192.168.50.0 255.255.255.0 10.0.0.2" },
        { label: "192.168.50.0/24 is in the routing table", type: "route", prefix: "192.168.50.0/24" }
      ],
      solution: ["enable", "configure terminal", "ip route 192.168.50.0 255.255.255.0 10.0.0.2", "end"]
    },
    {
      id: "ccna-ospf", kind: "ios", d: 3,
      title: "Advertise networks with single-area OSPF",
      prompt: "Both interfaces on this router already have addresses in 10.0.0.0/24 and 10.0.1.0/24.\n\nEnable OSPF process 1, set the router ID to `1.1.1.1`, and advertise both connected networks into area 0 using wildcard masks.",
      hint: "Under router ospf 1 set router-id, then use network ADDRESS WILDCARD area 0 for each subnet (a /24 wildcard is 0.0.0.255).",
      explain: "OSPF network statements use a wildcard mask, the inverse of the subnet mask, to decide which interfaces run OSPF and which subnets are advertised. A manually set router-id keeps the identity stable across reboots, and every router in the same area must agree on area, timers and MTU to form an adjacency. This is the single-area OSPFv2 objective.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { ip: "10.0.0.1", mask: "255.255.255.0", shut: false }, "GigabitEthernet0/1": { ip: "10.0.1.1", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "OSPF process 1 is configured", type: "config", includes: "router ospf 1" },
        { label: "The router ID is 1.1.1.1", type: "config", includes: "router-id 1.1.1.1" },
        { label: "10.0.0.0/24 is advertised into area 0", type: "config", includes: "network 10.0.0.0 0.0.0.255 area 0" }
      ],
      solution: ["enable", "configure terminal", "router ospf 1", "router-id 1.1.1.1", "network 10.0.0.0 0.0.0.255 area 0", "network 10.0.1.0 0.0.0.255 area 0", "end"]
    },
    {
      id: "ccna-ssh", kind: "ios", d: 4,
      title: "Secure remote management with SSH",
      prompt: "Telnet must be replaced with SSH on this device.\n\nSet a domain name of `example.com`, create the local user `admin` with privilege 15 and secret `S3cureAdmin`, generate a 2048-bit RSA key, force SSH version 2, then on the VTY lines require local login and allow only SSH.",
      hint: "SSH needs a hostname and ip domain-name before crypto key generate rsa. On line vty 0 4 use login local and transport input ssh.",
      explain: "SSH encrypts management sessions, unlike Telnet which sends everything in cleartext. IOS needs a hostname and domain name to name the RSA key pair, and a local username with login local lets each admin authenticate individually. transport input ssh on the VTY lines blocks Telnet outright. These steps are the CCNA secure-access objective.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { ip: "10.1.1.1", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "The domain name is example.com", type: "config", includes: "ip domain-name example.com" },
        { label: "SSH version 2 is enforced", type: "config", includes: "ip ssh version 2" },
        { label: "The VTY lines use local login", type: "config", includes: "login local" },
        { label: "The VTY lines allow only SSH", type: "config", includes: "transport input ssh" }
      ],
      solution: ["enable", "configure terminal", "ip domain-name example.com", "username admin privilege 15 secret S3cureAdmin", "crypto key generate rsa modulus 2048", "ip ssh version 2", "line vty 0 4", "login local", "transport input ssh", "end"]
    },
    {
      id: "ccna-acl", kind: "ios", d: 4,
      title: "Filter management traffic with a standard ACL",
      prompt: "Only hosts in 192.168.1.0/24 should be allowed to reach this router's LAN interface.\n\nBuild a named standard ACL called `MGMT` that permits 192.168.1.0/24, then apply it inbound on GigabitEthernet0/0. Confirm with `show access-lists`.",
      hint: "Create the list with ip access-list standard MGMT, add a permit line with a wildcard mask, then apply it on the interface with ip access-group MGMT in.",
      explain: "A standard ACL matches on source address only and should sit close to the destination so it does not block traffic too early. Every ACL ends in an implicit deny, so anything not permitted is dropped. Applying it with ip access-group in the right direction is as important as the permit lines themselves, a frequent CCNA exam point.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { ip: "192.168.10.1", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "A standard ACL named MGMT exists", type: "config", includes: "ip access-list standard MGMT" },
        { label: "It permits 192.168.1.0/24", type: "config", includes: "permit 192.168.1.0 0.0.0.255" },
        { label: "It is applied inbound on GigabitEthernet0/0", type: "intf", name: "GigabitEthernet0/0", path: "aclin", value: "MGMT" }
      ],
      solution: ["enable", "configure terminal", "ip access-list standard MGMT", "permit 192.168.1.0 0.0.0.255", "exit", "interface g0/0", "ip access-group MGMT in", "end"]
    },
    {
      id: "ccna-portsec", kind: "ios", d: 4,
      title: "Lock an access port with port security",
      prompt: "GigabitEthernet0/1 is an access port in VLAN 10 in a public area.\n\nTurn on port security, allow a maximum of 2 MAC addresses, learn them as sticky, and set the violation mode to `restrict` so an extra device is dropped and logged without shutting the port.",
      hint: "The port must be an access port first. Then add switchport port-security plus its maximum, mac-address sticky and violation options.",
      explain: "Port security caps how many MAC addresses a port accepts, which stops MAC flooding and rogue devices. Sticky learning saves the seen addresses into the running configuration, and the restrict mode drops offending frames and increments a counter while keeping the port up, unlike shutdown which err-disables it. This is the Layer 2 security objective.",
      setup: { hostname: "SW1", type: "switch", vlans: { 10: "USERS" }, interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "Port security is enabled on the port", type: "config", includes: "switchport port-security" },
        { label: "The violation mode is restrict", type: "config", includes: "switchport port-security violation restrict" },
        { label: "Addresses are learned as sticky", type: "intf", name: "GigabitEthernet0/1", path: "pssticky", value: true }
      ],
      solution: ["enable", "configure terminal", "interface g0/1", "switchport mode access", "switchport access vlan 10", "switchport port-security", "switchport port-security maximum 2", "switchport port-security mac-address sticky", "switchport port-security violation restrict", "end"]
    },
    {
      id: "ccna-baseline-save", kind: "ios", d: 5,
      title: "Apply a baseline config and save it",
      prompt: "Standardise this new switch to the site baseline.\n\nSet the hostname to `CampusSW1`, protect privileged mode with `enable secret Str0ngSecret`, turn on service password-encryption, add a login banner warning that access is authorized only, then save the configuration to startup so it survives a reboot.",
      hint: "banner motd uses a delimiter character at each end of the text. Save with copy running-config startup-config or write memory once you return to privileged mode.",
      explain: "A consistent baseline (hostname, enable secret, password encryption and a legal banner) is what golden configs and configuration management enforce across a fleet. enable secret stores a strong hash rather than cleartext, and saving to startup-config is essential because the running configuration is lost on reload. This ties the config-management ideas in Domain 5 to real commands.",
      setup: { hostname: "Switch", type: "switch", interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "The hostname is CampusSW1", type: "config", includes: "hostname CampusSW1" },
        { label: "Password encryption is on", type: "config", includes: "\nservice password-encryption" },
        { label: "A login banner is set", type: "config", includes: "banner motd" },
        { label: "The configuration is saved to startup", type: "saved" },
        { label: "You end back in privileged mode", type: "mode", mode: "privileged" }
      ],
      solution: ["enable", "configure terminal", "hostname CampusSW1", "enable secret Str0ngSecret", "service password-encryption", "banner motd #Authorized access only. Disconnect now if you are not authorized.#", "end", "write memory"]
    }
  ]
});
