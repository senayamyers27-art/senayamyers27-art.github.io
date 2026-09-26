/* Hands-on Cisco IOS exercises for the Cisco Certified Support Technician (CCST) Networking exam.
   Checked by tools/check-data.js against public/assets/ios.js. */
CertHub.addHandson("ccst-networking", {
  tables: {},
  items: [
    {
      id: "ccst-hostname", kind: "ios", d: 5,
      title: "Move through IOS modes and set a hostname",
      prompt: "You have just consoled into a new switch that still shows the default name.\n\nEnter privileged EXEC mode, then global configuration mode, change the device name to `AccessSW`, and return to privileged EXEC. This is the basic path every IOS change starts from.",
      hint: "Type enable to reach the # prompt, then configure terminal to reach (config)#. Use end (or Ctrl-Z) to jump back to privileged EXEC.",
      explain: "IOS has three main modes: user EXEC (>), privileged EXEC (#) reached with enable, and global configuration ((config)#) reached with configure terminal. Configuration commands only work in a config mode, while show and copy run from privileged EXEC. Knowing which mode you are in, shown by the prompt, is a core CCST Networking skill.",
      setup: { hostname: "Switch", type: "switch", interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "The hostname is AccessSW", type: "config", includes: "hostname AccessSW" },
        { label: "You end in privileged EXEC mode", type: "mode", mode: "privileged" }
      ],
      solution: ["enable", "configure terminal", "hostname AccessSW", "end"]
    },
    {
      id: "ccst-mgmt-ip", kind: "ios", d: 4,
      title: "Set a management IP and default gateway",
      prompt: "This switch needs to be reachable from the help desk on another subnet.\n\nAssign `10.1.1.10 255.255.255.0` to interface VLAN 1, enable the interface, and configure a default gateway of `10.1.1.1` so it can answer devices outside its own subnet.",
      hint: "The address goes on interface vlan 1 (remember no shutdown). The gateway is the global command ip default-gateway.",
      explain: "A switch forwards frames at Layer 2 but still needs one IP address for remote management, placed on a switch virtual interface such as VLAN 1. Without a default gateway it can only answer hosts in its own subnet, which is why remote management from another network fails. This maps to the CCST default-gateway objective.",
      setup: { hostname: "SW1", type: "switch", interfaces: { "Vlan1": {}, "GigabitEthernet0/1": {} } },
      checks: [
        { label: "VLAN 1 has address 10.1.1.10", type: "intf", name: "Vlan1", path: "ip", value: "10.1.1.10" },
        { label: "The VLAN 1 interface is enabled", type: "intf", name: "Vlan1", path: "shutdown", value: false },
        { label: "The default gateway is 10.1.1.1", type: "config", includes: "ip default-gateway 10.1.1.1" }
      ],
      solution: ["enable", "configure terminal", "interface vlan 1", "ip address 10.1.1.10 255.255.255.0", "no shutdown", "exit", "ip default-gateway 10.1.1.1", "end"]
    },
    {
      id: "ccst-vlan-access", kind: "ios", d: 4,
      title: "Create a VLAN and assign an access port",
      prompt: "Staff devices should sit in their own VLAN, separate from the default.\n\nCreate VLAN 20 named `STAFF`, then make GigabitEthernet0/1 a static access port in VLAN 20 for the connected PC. Verify with `show vlan brief`.",
      hint: "Make the VLAN with vlan 20 and name it, then on the interface use switchport mode access and switchport access vlan 20.",
      explain: "A VLAN separates one physical switch into several broadcast domains, so devices in VLAN 20 cannot directly reach devices in another VLAN without a router. An access port belongs to a single VLAN and connects an end device, while a trunk carries many VLANs between switches. Telling access ports from trunk ports is a CCST infrastructure objective.",
      setup: { hostname: "SW1", type: "switch", interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "VLAN 20 is named STAFF", type: "vlan", id: 20, name: "STAFF" },
        { label: "GigabitEthernet0/1 is an access port", type: "intf", name: "GigabitEthernet0/1", path: "mode", value: "access" },
        { label: "GigabitEthernet0/1 is in VLAN 20", type: "intf", name: "GigabitEthernet0/1", path: "vlan", value: "20" }
      ],
      solution: ["enable", "configure terminal", "vlan 20", "name STAFF", "exit", "interface g0/1", "switchport mode access", "switchport access vlan 20", "end"]
    },
    {
      id: "ccst-trunk", kind: "ios", d: 4,
      title: "Configure a trunk uplink between switches",
      prompt: "GigabitEthernet0/24 connects to a second switch and must carry both VLAN 10 and VLAN 20.\n\nMake GigabitEthernet0/24 a trunk and set its allowed VLAN list to just 10 and 20. Confirm with `show interfaces trunk`.",
      hint: "Set the role with switchport mode trunk, then limit traffic with switchport trunk allowed vlan 10,20.",
      explain: "A trunk link carries traffic for several VLANs at once by tagging each frame with 802.1Q, which is how VLANs span more than one switch. An access port, by contrast, serves a single VLAN and a single end device. Restricting the allowed VLAN list keeps unnecessary traffic off the uplink and is good practice the CCST expects you to recognise.",
      setup: { hostname: "SW1", type: "switch", vlans: { 10: "USERS", 20: "STAFF" }, interfaces: { "GigabitEthernet0/24": {} } },
      checks: [
        { label: "GigabitEthernet0/24 is a trunk", type: "intf", name: "GigabitEthernet0/24", path: "mode", value: "trunk" },
        { label: "Only VLANs 10 and 20 are allowed", type: "config", includes: "switchport trunk allowed vlan 10,20" }
      ],
      solution: ["enable", "configure terminal", "interface g0/24", "switchport mode trunk", "switchport trunk allowed vlan 10,20", "end"]
    },
    {
      id: "ccst-secure-access", kind: "ios", d: 6,
      title: "Protect device access with passwords",
      prompt: "This switch has no passwords at all, so anyone on the console can make changes.\n\nSet `enable secret Str0ngSecret!` to protect privileged mode, then on the console line (`line con 0`) set the password `consolepw` and require login. This is basic device hardening.",
      hint: "enable secret is a global command. On line con 0 add password consolepw and then login so the password is actually enforced.",
      explain: "Changing default or blank credentials is one of the first hardening steps. enable secret stores a strong hash to guard privileged mode, while a console password with the login command forces anyone at the console to authenticate. Without login, a configured line password is never prompted for, a subtle mistake the CCST security domain expects you to avoid.",
      setup: { hostname: "SW1", type: "switch", interfaces: { "GigabitEthernet0/1": {} } },
      checks: [
        { label: "An enable secret protects privileged mode", type: "config", includes: "enable secret" },
        { label: "The console line is configured", type: "config", includes: "line con 0" },
        { label: "The console password is set", type: "config", includes: "password consolepw" }
      ],
      solution: ["enable", "configure terminal", "enable secret Str0ngSecret!", "line con 0", "password consolepw", "login", "end"]
    },
    {
      id: "ccst-describe-save", kind: "ios", d: 5,
      title: "Label a port and save the configuration",
      prompt: "Good documentation starts on the device itself.\n\nAdd the description `Uplink to Core` to GigabitEthernet0/24 so the next technician knows what it connects to, then save the running configuration to startup so the label survives a reboot.",
      hint: "Use the description command inside the interface. Save from privileged EXEC with copy running-config startup-config.",
      explain: "Interface descriptions are on-device documentation that show up in show running-config and show interfaces, making troubleshooting faster. The running configuration lives in RAM and is lost on reload, so copy running-config startup-config writes it to NVRAM to make it permanent. Both habits are part of the CCST diagnostics and documentation objectives.",
      setup: { hostname: "SW1", type: "switch", interfaces: { "GigabitEthernet0/24": {} } },
      checks: [
        { label: "GigabitEthernet0/24 is described as an uplink", type: "intf", name: "GigabitEthernet0/24", path: "description", includes: "Uplink to Core" },
        { label: "The configuration is saved to startup", type: "saved" }
      ],
      solution: ["enable", "configure terminal", "interface g0/24", "description Uplink to Core", "end", "copy running-config startup-config"]
    }
  ]
});
