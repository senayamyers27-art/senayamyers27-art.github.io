/* Performance-based simulations for CCST Networking (100-150). */
CertHub.addPbqs("ccst-networking", [
  { id: "ports-match", d: 1, type: "match", title: "Match protocols to default ports",
    prompt: "A help desk ticket asks you to confirm which ports a new firewall must allow. Match each protocol to its default port.",
    pairs: [["FTP (control)", "21"], ["SSH / SFTP", "22"], ["DNS", "53"], ["TFTP", "69"], ["NTP", "123"], ["HTTPS", "443"]],
    extra: ["20", "80", "3389"],
    explain: "FTP uses TCP 21 for its control channel (20 is the classic active-mode data port), and SFTP runs inside SSH on TCP 22. DNS uses 53 (UDP for most lookups, TCP for large responses and zone transfers), TFTP uses UDP 69, NTP uses UDP 123 and HTTPS uses TCP 443. Port 80 is plain HTTP and 3389 is RDP, both common distractors." },

  { id: "encap-order", d: 1, type: "order", title: "Order the encapsulation steps",
    prompt: "A laptop sends an HTTPS request to a web server. Put the steps in the order they happen on the sending laptop, from the application down to the wire.",
    steps: [
      "The browser creates the application data (the HTTP request inside TLS)",
      "TCP adds source and destination ports, creating a segment",
      "IP adds source and destination IP addresses, creating a packet",
      "Ethernet or Wi-Fi adds MAC addresses and a trailer (FCS), creating a frame",
      "The network interface sends the frame as bits (electrical, light or radio signals)"
    ],
    explain: "Encapsulation works top-down: data at the application layer, a segment at the transport layer (ports), a packet at the network layer (IP addresses), a frame at the data link layer (MAC addresses plus a frame check sequence) and bits at the physical layer. The receiver reverses the process (de-encapsulation), removing each header from the bottom up." },

  { id: "subnet-27-fill", d: 2, type: "fill", title: "Calculate a /27 subnet",
    prompt: "A printer is configured with 172.16.45.200/27. Fill in the values for its subnet.",
    context: "C:\\> ipconfig\nEthernet adapter Ethernet:\n   IPv4 Address. . . . . . . . . . . : 172.16.45.200\n   Subnet Mask . . . . . . . . . . . : 255.255.255.224\n   Default Gateway . . . . . . . . . : 172.16.45.193",
    fields: [
      { label: "Network address", answers: ["172.16.45.192"] },
      { label: "Broadcast address", answers: ["172.16.45.223"] },
      { label: "Last usable host address", answers: ["172.16.45.222"] },
      { label: "Number of usable hosts", answers: ["30"] }
    ],
    explain: "A /27 mask (255.255.255.224) leaves 5 host bits, so each subnet is a block of 32 addresses: .0, .32, .64 ... .192, .224. The address .200 falls in the .192 block, so the network is 172.16.45.192 and the broadcast is the last address before the next block, 172.16.45.223. Usable hosts are 2^5 - 2 = 30 (.193 to .222), and the gateway .193 is correctly inside that range." },

  { id: "ipv6-types-match", d: 2, type: "match", title: "Identify IPv6 address types",
    prompt: "You ran ipconfig and a packet capture on a dual-stack network. Match each IPv6 address to its type.",
    pairs: [
      ["fe80::1c2b:3aff:fe4d:5e6f", "Link-local unicast"],
      ["2001:db8:acad:10::25", "Global unicast"],
      ["fd12:3456:789a::10", "Unique local"],
      ["ff02::1", "Multicast"],
      ["::1", "Loopback"]
    ],
    extra: ["Broadcast", "APIPA"],
    explain: "Link-local addresses start with fe80::/10 and exist on every IPv6 interface; global unicast addresses fall in 2000::/3 (2001:db8::/32 is the documentation range inside it). Unique local addresses use fc00::/7, in practice fd00::/8, like private IPv4 ranges. ff00::/8 is multicast (ff02::1 is all nodes on the link) and ::1 is loopback. IPv6 has no broadcast, and APIPA (169.254.x.x) is an IPv4 concept." },

  { id: "connector-match", d: 3, type: "match", title: "Match connectors to their use",
    prompt: "A technician is building a labeled connector ID sheet. Match each connector to its description.",
    pairs: [
      ["RJ-45", "8-position connector on twisted-pair Ethernet cable"],
      ["RJ-11", "Smaller 6-position connector on a telephone or DSL line"],
      ["F-type", "Threaded coax connector on a cable modem or TV outlet"],
      ["BNC", "Bayonet twist-lock coax connector on older video and CCTV gear"],
      ["LC", "Small latching duplex fiber connector used with most SFP modules"],
      ["SC", "Square push-pull fiber connector"]
    ],
    extra: ["USB connector used for a Cisco console session"],
    explain: "RJ-45 terminates the 8 wires of Ethernet twisted pair, while the narrower RJ-11 carries analog phone and DSL. F-type (threaded) and BNC (bayonet) are both coaxial: F-type for cable internet and TV, BNC for older Ethernet and video/CCTV. LC is the small form-factor fiber connector that fits SFP transceivers, and SC is the larger square push-pull fiber connector; ST, a round bayonet fiber connector, is the one usually confused with BNC." },

  { id: "cable-runs-select", d: 3, type: "select", title: "Spot the problem cable runs",
    prompt: "Review the planned cable runs for an office remodel. Select every run that violates the standard or is likely to cause problems.",
    context: "Run  Media                      Length  Speed needed  Notes\nA    Cat 6 UTP                  85 m    1 Gbps        Through a plenum-rated ceiling tray\nB    Cat 5e UTP                 120 m   1 Gbps        Warehouse camera, no switch in between\nC    Cat 6 UTP                  40 m    1 Gbps        Strapped along an elevator motor housing\nD    Single-mode fiber (LC)     60 m    1 Gbps        Plugged into a 1000BASE-SX (multimode) SFP\nE    Cat 6a UTP                 90 m    10 Gbps       Server room to wiring closet\nF    Multimode fiber OM3 (LC)   250 m   1 Gbps        Between buildings, 1000BASE-SX SFPs\nG    Cat 5e UTP                 80 m    10 Gbps       Uplink between two switches",
    options: ["Run A", "Run B", "Run C", "Run D", "Run E", "Run F", "Run G"],
    answers: [1, 2, 3, 6],
    explain: "Twisted-pair Ethernet is limited to 100 m per run, so B at 120 m fails. Run C is exposed to strong EMI from the motor, which causes errors on unshielded copper. Run D mixes single-mode fiber with a multimode (SX) transceiver; fiber and optics must match. Run G needs Cat 6a (or better) for 10GBASE-T at that distance, so Cat 5e is not rated for it. A, E and F are within spec: OM3 multimode easily covers 250 m at 1 Gbps." },

  { id: "mac-table-flood", d: 4, type: "select", title: "Predict where a switch floods a frame",
    prompt: "The PC on Gi1/0/1 sends a unicast frame to MAC 0050.56aa.9c10, which is not in the MAC address table. All listed ports are connected and up. Select every port the switch sends the frame out of.",
    context: "SW1# show vlan brief\nVLAN Name        Status    Ports\n10   STAFF       active    Gi1/0/1, Gi1/0/2, Gi1/0/3, Gi1/0/4\n20   GUEST       active    Gi1/0/5, Gi1/0/6\n(Gi1/0/24 is an 802.1Q trunk allowing VLANs 10 and 20)\n\nSW1# show mac address-table dynamic\nVlan  Mac Address       Type     Ports\n10    0011.2233.4401    DYNAMIC  Gi1/0/1\n10    0011.2233.4402    DYNAMIC  Gi1/0/2\n20    0011.2233.4405    DYNAMIC  Gi1/0/5\n10    00aa.bbcc.0001    DYNAMIC  Gi1/0/24",
    options: ["Gi1/0/1", "Gi1/0/2", "Gi1/0/3", "Gi1/0/4", "Gi1/0/5", "Gi1/0/6", "Gi1/0/24"],
    answers: [1, 2, 3, 6],
    explain: "A switch floods an unknown unicast frame out of every port in the same VLAN except the port it arrived on. The sender is in VLAN 10, so the frame goes to Gi1/0/2, Gi1/0/3 and Gi1/0/4, and also out the trunk Gi1/0/24 because the trunk carries VLAN 10. VLAN 20 ports (Gi1/0/5 and Gi1/0/6) never see it, because VLANs are separate broadcast domains, and the switch never sends a frame back out its ingress port." },

  { id: "port-led-match", d: 4, type: "match", title: "Interpret Catalyst port LEDs",
    prompt: "An engineer on the phone asks what the port LEDs on a Cisco Catalyst access switch are showing (port status mode). Match each LED state to its meaning.",
    pairs: [
      ["Off", "No link, or the port is administratively shut down"],
      ["Solid green", "Link is up with no current traffic"],
      ["Blinking green", "Link is up and sending or receiving traffic"],
      ["Alternating green and amber", "Link fault, such as excessive errors"],
      ["Solid amber", "Port is blocked by Spanning Tree and not forwarding"]
    ],
    extra: ["Switch is receiving PoE power from the port"],
    explain: "Green means a good link, and blinking green adds activity. Off means nothing is detected (unplugged, far end off or shut down). Solid amber usually means Spanning Tree is blocking the port, which is normal for up to about 30 seconds after a device is plugged in, while alternating green/amber points to a link fault such as errors from a bad cable or a duplex problem. Switch ports supply PoE; they do not receive it." },

  { id: "troubleshoot-order", d: 5, type: "order", title: "Order the troubleshooting methodology",
    prompt: "A user reports that they cannot print to the shared office printer. Put the troubleshooting steps in the correct order.",
    steps: [
      "Identify the problem: ask questions, find out what changed and how many users are affected",
      "Establish a theory of probable cause",
      "Test the theory to determine the cause",
      "Establish a plan of action to resolve the problem",
      "Implement the solution or escalate if needed",
      "Verify full system functionality and apply preventive measures",
      "Document findings, actions and outcomes in the ticket"
    ],
    explain: "The methodology moves from information to action: identify the problem and scope, form a theory, and test it before changing anything. If the test confirms the theory, plan the fix, implement it (or escalate if it is beyond your permissions), then verify that the user can print and nothing else broke. Documentation comes last so the ticket records what was found and done for the next technician." },

  { id: "ip-int-brief-select", d: 5, type: "select", title: "Read show ip interface brief",
    prompt: "Users on two branch networks report outages. Review the router output and select every statement that is supported by it.",
    context: "R1# show ip interface brief\nInterface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     192.168.1.1     YES manual up                    up\nGigabitEthernet0/1     10.0.12.1       YES manual administratively down down\nGigabitEthernet0/2     10.0.23.1       YES manual down                  down\nSerial0/0/0            203.0.113.2     YES manual up                    down\nVlan1                  unassigned      YES unset  administratively down down",
    options: [
      "Gi0/0 is working at both Layer 1 and Layer 2",
      "Gi0/1 was disabled with the shutdown command and needs no shutdown to come up",
      "Gi0/2 most likely has a physical problem, such as an unplugged cable or a powered-off device at the far end",
      "Serial0/0/0 has no cable connected",
      "Serial0/0/0 has a physical signal but a data link problem, such as an encapsulation or keepalive mismatch",
      "Gi0/0 has no IP address configured",
      "Vlan1 is forwarding routed traffic"
    ],
    answers: [0, 1, 2, 4],
    explain: "The Status column is Layer 1 and Protocol is Layer 2. up/up (Gi0/0) is healthy; 'administratively down' (Gi0/1) means someone entered shutdown; down/down with no admin shutdown (Gi0/2) points to cabling or the far end. up/down on Serial0/0/0 means the physical layer is fine but the data link protocol is not, which is typical of an encapsulation mismatch, so it is not a missing cable. Gi0/0 clearly has 192.168.1.1, and Vlan1 is shut down with no address." },

  { id: "fw-rules-select", d: 6, type: "select", title: "Evaluate firewall rules",
    prompt: "The firewall processes rules top-down, uses the first match and ends with an implicit deny. Select every flow that will be permitted.",
    context: "#  Action  Proto  Source             Destination        Dest port\n1  permit  TCP    any                198.51.100.10      443\n2  permit  TCP    any                198.51.100.10      80\n3  deny    TCP    any                198.51.100.10      22\n4  permit  TCP    192.168.50.0/24    any                22\n5  permit  UDP    192.168.50.0/24    198.51.100.53      53\n   (implicit deny all)",
    options: [
      "203.0.113.44 to 198.51.100.10, TCP 443",
      "192.168.50.20 to 198.51.100.10, TCP 22",
      "192.168.50.20 to 198.51.100.20, TCP 22",
      "192.168.60.5 to 198.51.100.53, UDP 53",
      "192.168.50.7 to 198.51.100.53, UDP 53",
      "203.0.113.44 to 198.51.100.10, TCP 3389",
      "203.0.113.44 to 198.51.100.10, UDP 443"
    ],
    answers: [0, 2, 4],
    explain: "HTTPS to .10 matches rule 1. SSH from 192.168.50.20 to .10 hits the deny in rule 3 before it ever reaches rule 4, because order matters; SSH to .20 skips rule 3 and matches rule 4. DNS from 192.168.50.7 matches rule 5, but 192.168.60.5 is outside 192.168.50.0/24 and falls to the implicit deny. RDP (3389) and UDP 443 match no permit rule, since rule 1 only allows TCP, so both are denied." },

  { id: "wifi-security-match", d: 6, type: "match", title: "Match wireless security options",
    prompt: "You are reviewing the wireless settings page on a small-office router. Match each option to its description.",
    pairs: [
      ["WEP", "Legacy RC4-based encryption that can be cracked in minutes"],
      ["WPA2-Personal", "AES-CCMP encryption with one shared passphrase"],
      ["WPA3-Personal", "SAE handshake that resists offline password guessing"],
      ["WPA2/WPA3-Enterprise", "802.1X login against a RADIUS server with per-user credentials"],
      ["WPS", "PIN or push-button setup feature that should be turned off"],
      ["Open (no security)", "No encryption of traffic over the air"]
    ],
    extra: ["Hides the SSID so attackers cannot find the network"],
    explain: "WEP is broken and should never be used. WPA2-Personal uses AES with a pre-shared key, and WPA3-Personal replaces the PSK handshake with SAE, which stops attackers from capturing a handshake and guessing the password offline. Enterprise modes use 802.1X and a RADIUS server so each user has their own credentials. WPS's PIN method is vulnerable to brute force, and open networks send traffic unencrypted. Hiding the SSID is not real security, because the name still appears in client probe traffic." }
]);
