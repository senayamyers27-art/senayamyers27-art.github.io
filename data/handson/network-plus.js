/* Hands-on Cisco IOS exercises for CompTIA Network+ (N10-009). These practise the device-configuration
   and troubleshooting objectives on a simulated switch/router. Checked by tools/check-data.js against public/assets/ios.js. */
CertHub.addHandson("network-plus", {
  tables: {},
  items: [
    {
      id: "netp-intf-ip", kind: "ios", d: 2,
      title: "Bring up a router interface with an address",
      prompt: "A new LAN needs a gateway on this router.\n\nOn GigabitEthernet0/0 configure the address `172.16.1.1 255.255.255.0` and enable the interface so it can serve as the default gateway for the 172.16.1.0/24 network.",
      hint: "Router interfaces start administratively down, so after ip address you must issue no shutdown for the link to come up.",
      explain: "Router interfaces are shut down by default and stay down until no shutdown is issued, a frequent reason a freshly configured gateway does not respond. The interface address becomes the default gateway that hosts on that subnet point to. Reading interface state with show ip interface brief is a Network+ implementation and troubleshooting skill.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": {} } },
      checks: [
        { label: "GigabitEthernet0/0 has address 172.16.1.1", type: "intf", name: "GigabitEthernet0/0", path: "ip", value: "172.16.1.1" },
        { label: "GigabitEthernet0/0 is enabled (no shutdown)", type: "intf", name: "GigabitEthernet0/0", path: "shutdown", value: false }
      ],
      solution: ["enable", "configure terminal", "interface g0/0", "ip address 172.16.1.1 255.255.255.0", "no shutdown", "end"]
    },
    {
      id: "netp-vlan-trunk", kind: "ios", d: 2,
      title: "Create VLANs and a trunk uplink",
      prompt: "This access switch needs a data VLAN and a voice VLAN, plus an uplink that carries both.\n\nCreate VLAN 10 named `DATA` and VLAN 20 named `VOICE`, then make GigabitEthernet0/24 a trunk. Verify with `show vlan brief` and `show interfaces trunk`.",
      hint: "Create each VLAN with vlan N and name it, then on the uplink use switchport mode trunk.",
      explain: "VLANs segment one switch into separate broadcast domains, commonly a data VLAN and a voice VLAN for IP phones. A trunk carries several VLANs between switches using 802.1Q tags, while access ports serve one VLAN each. Configuring VLANs and 802.1Q trunking is squarely in the Network+ implementation domain.",
      setup: { hostname: "SW1", type: "switch", interfaces: { "GigabitEthernet0/1": {}, "GigabitEthernet0/24": {} } },
      checks: [
        { label: "VLAN 10 is named DATA", type: "vlan", id: 10, name: "DATA" },
        { label: "VLAN 20 is named VOICE", type: "vlan", id: 20, name: "VOICE" },
        { label: "GigabitEthernet0/24 is a trunk", type: "intf", name: "GigabitEthernet0/24", path: "mode", value: "trunk" }
      ],
      solution: ["enable", "configure terminal", "vlan 10", "name DATA", "exit", "vlan 20", "name VOICE", "exit", "interface g0/24", "switchport mode trunk", "end"]
    },
    {
      id: "netp-ospf", kind: "ios", d: 2,
      title: "Enable dynamic routing with OSPF",
      prompt: "Two directly connected subnets, 10.0.0.0/24 and 10.0.1.0/24, should be shared by a routing protocol instead of static routes.\n\nEnable OSPF process 1 and advertise both networks into area 0 using their wildcard masks.",
      hint: "Under router ospf 1, add a network line per subnet: network ADDRESS 0.0.0.255 area 0 for each /24.",
      explain: "OSPF is a link-state interior gateway protocol that learns routes dynamically and reconverges when a link changes, unlike static routes which must be edited by hand. Its network statements use wildcard masks (the inverse of the subnet mask) to decide which interfaces participate. Comparing static and dynamic routing and route selection is a Network+ objective.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { ip: "10.0.0.1", mask: "255.255.255.0", shut: false }, "GigabitEthernet0/1": { ip: "10.0.1.1", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "OSPF process 1 is configured", type: "config", includes: "router ospf 1" },
        { label: "10.0.0.0/24 is advertised into area 0", type: "config", includes: "network 10.0.0.0 0.0.0.255 area 0" },
        { label: "10.0.1.0/24 is advertised into area 0", type: "config", includes: "network 10.0.1.0 0.0.0.255 area 0" }
      ],
      solution: ["enable", "configure terminal", "router ospf 1", "network 10.0.0.0 0.0.0.255 area 0", "network 10.0.1.0 0.0.0.255 area 0", "end"]
    },
    {
      id: "netp-portsec", kind: "ios", d: 4,
      title: "Harden a switch port with port security",
      prompt: "An access port in the lobby must accept only known devices.\n\nOn GigabitEthernet0/1, enable port security, allow at most 2 MAC addresses, learn them as sticky, and use the default `shutdown` violation action so an extra device err-disables the port.",
      hint: "Set switchport mode access first, then switchport port-security with its maximum, mac-address sticky and violation shutdown options.",
      explain: "Port security limits which and how many MAC addresses a port accepts, defending against MAC flooding and unauthorized devices. Sticky learning records the allowed addresses in the configuration, and the shutdown violation mode err-disables the port on a breach, the strictest response. Switch port hardening is a Network+ network-security objective.",
      setup: { hostname: "SW1", type: "switch", vlans: { 10: "USERS" }, interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "Port security is enabled on the port", type: "config", includes: "switchport port-security" },
        { label: "The violation mode is shutdown", type: "config", includes: "switchport port-security violation shutdown" },
        { label: "Addresses are learned as sticky", type: "intf", name: "GigabitEthernet0/1", path: "pssticky", value: true }
      ],
      solution: ["enable", "configure terminal", "interface g0/1", "switchport mode access", "switchport port-security", "switchport port-security maximum 2", "switchport port-security mac-address sticky", "switchport port-security violation shutdown", "end"]
    },
    {
      id: "netp-acl", kind: "ios", d: 4,
      title: "Allow only web traffic with an extended ACL",
      prompt: "A user VLAN should reach a server subnet over HTTP and HTTPS only.\n\nBuild a named extended ACL called `WEB` that permits TCP to ports 80 and 443 and denies everything else, then apply it inbound on GigabitEthernet0/0. Check it with `show access-lists`.",
      hint: "Use ip access-list extended WEB, add permit tcp any any eq 80 and eq 443, add a deny ip any any, then apply with ip access-group WEB in.",
      explain: "Extended ACLs match on source, destination, protocol and port, so they can permit web ports while blocking other traffic. The implicit deny at the end drops anything not permitted, and an explicit deny ip any any is often added for logging clarity. Applying the ACL in the correct direction is essential, and ACLs are a Network+ security and troubleshooting topic.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { ip: "192.168.30.1", mask: "255.255.255.0", shut: false } } },
      checks: [
        { label: "An extended ACL named WEB exists", type: "config", includes: "ip access-list extended WEB" },
        { label: "It permits HTTPS (TCP 443)", type: "config", includes: "permit tcp any any eq 443" },
        { label: "It is applied inbound on GigabitEthernet0/0", type: "intf", name: "GigabitEthernet0/0", path: "aclin", value: "WEB" }
      ],
      solution: ["enable", "configure terminal", "ip access-list extended WEB", "permit tcp any any eq 80", "permit tcp any any eq 443", "deny ip any any", "exit", "interface g0/0", "ip access-group WEB in", "end"]
    },
    {
      id: "netp-fix-interface", kind: "ios", d: 5,
      title: "Troubleshoot a down interface and save the fix",
      prompt: "Users on GigabitEthernet0/0 have lost connectivity. `show ip interface brief` shows the interface administratively down with no address.\n\nAssign `192.168.100.1 255.255.255.0`, bring the interface back up, then save the configuration so the fix survives a reload.",
      hint: "Add the ip address, then no shutdown to clear the administratively down state. Save with copy running-config startup-config or write memory.",
      explain: "An interface listed as administratively down was shut down by configuration, and no shutdown clears it; a missing address is a second common cause of a dead gateway. After fixing a fault you should verify with show ip interface brief and then save to startup, because an unsaved fix is lost on reboot. This follows the Network+ troubleshooting methodology.",
      setup: { hostname: "R1", type: "router", interfaces: { "GigabitEthernet0/0": { shut: true } } },
      checks: [
        { label: "GigabitEthernet0/0 has address 192.168.100.1", type: "intf", name: "GigabitEthernet0/0", path: "ip", value: "192.168.100.1" },
        { label: "GigabitEthernet0/0 is back up (no shutdown)", type: "intf", name: "GigabitEthernet0/0", path: "shutdown", value: false },
        { label: "The fix is saved to startup", type: "saved" }
      ],
      solution: ["enable", "configure terminal", "interface g0/0", "ip address 192.168.100.1 255.255.255.0", "no shutdown", "end", "write memory"]
    }
  ]
});
