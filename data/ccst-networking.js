/* Cisco Certified Support Technician (CCST) Networking, exam 100-150. Generated plan (no hand-written weeks). */
CertHub.register({
  id: "ccst-networking",
  vendor: "Cisco",
  name: "Cisco Certified Support Technician (CCST) Networking",
  short: "CCST Networking",
  exam: "100-150 v1.0",
  blurb: "Entry-level Cisco networking certification for help desk and support technicians: network models, IP addressing, cables and wireless, Cisco device basics, troubleshooting and basic security.",
  status: "check",
  statusNote: "Exam code 100-150, the six domain names and the 50-minute length were confirmed in search results for Cisco's official pages on Sept 24, 2026, but the cisco.com and learningnetwork.cisco.com pages could not be opened from this environment. Cisco does not appear to publish domain weights for CCST, so the weights here are estimates based on the number of objectives in each domain (5/3/4/5/5/3). Check the objectives on the official exam topics page before you test.",
  lastVerified: "2026-09-24",
  notices: [],
  examInfo: { questions: "Not published (usually reported as about 40–50 multiple choice, drag-and-drop and similar items)", minutes: 50, pass: "Not published" },
  examSim: { questions: 45, minutes: 50 },
  sources: [
    { label: "Cisco 100-150 CCST Networking exam page", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccst-networking.html" },
    { label: "Cisco Learning Network: CCST Networking exam topics", url: "https://learningnetwork.cisco.com/s/ccst-networking-exam-topics" }
  ],
  planWeeks: 6,
  hoursPerWeek: "5–7",

  domains: [
    {
      id: 1,
      name: "Standards and concepts",
      w: 20,
      topics: [
        "The TCP/IP and OSI models: layer names, what each layer does and where devices and protocols fit",
        "Encapsulation: data, segments, packets, frames and bits; MAC addresses vs IP addresses",
        "Bandwidth vs throughput; latency, delay and jitter; speed tests vs iperf",
        "Network types: LAN, WAN, MAN, CAN, PAN and WLAN",
        "Cloud vs on-premises: public, private and hybrid cloud; SaaS, PaaS and IaaS",
        "How cloud and hybrid work change where apps run and how users reach them (VPN, internet access)",
        "TCP vs UDP: connection-oriented vs connectionless, the three-way handshake, when each is used",
        "Common protocols and ports: FTP 20/21, SFTP/SSH 22, TFTP 69, HTTP 80, HTTPS 443, DNS 53, DHCP 67/68, NTP 123",
        "ICMP and what ping uses it for"
      ],
      notes: ["Objectives 1.1–1.5"],
      labs: [
        "Capture a web page load in Wireshark and label the Ethernet, IP, TCP and HTTP/TLS parts of one packet with their TCP/IP and OSI layers.",
        "Run an online speed test and then `iperf3` between two computers on your home network (or two VMs) and explain why the numbers differ.",
        "Run `netstat -an` (Windows) or `ss -tuln` (Linux) and match each listening port to its protocol and to TCP or UDP."
      ]
    },
    {
      id: 2,
      name: "Addressing and subnet formats",
      w: 12,
      topics: [
        "Private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) vs public addresses",
        "NAT and PAT: how a home router shares one public address",
        "Special IPv4 addresses: loopback 127.0.0.1, APIPA 169.254.x.x, broadcast",
        "IPv4 format: dotted decimal, subnet masks and slash (CIDR) notation",
        "Network address, broadcast address, usable host range and host count for common masks",
        "Using a subnet calculator and checking whether two hosts are on the same subnet",
        "IPv6 format: eight hextets, leading-zero and :: compression, prefix length (usually /64)",
        "IPv6 address types: global unicast (2000::/3), link-local (fe80::/10), unique local (fc00::/7), multicast (ff00::/8), loopback ::1",
        "IPv6 address assignment: SLAAC, modified EUI-64, DHCPv6, and dual stack"
      ],
      notes: ["Objectives 2.1–2.3"],
      labs: [
        "Run `ipconfig /all` (Windows) or `ip addr` (Linux/macOS: `ifconfig`) and identify your IPv4 address, mask, gateway and any IPv6 link-local and global addresses.",
        "Compare the address your computer shows with the public address from a \"what is my IP\" site, and explain where NAT happens.",
        "Work out network, broadcast and host range for five addresses (/24, /25, /26, /27, /30) by hand, then check each with `ipcalc` or an online subnet calculator."
      ]
    },
    {
      id: 3,
      name: "Endpoints and media types",
      w: 16,
      topics: [
        "Copper cable categories: Cat 5e, Cat 6, Cat 6a; straight-through vs crossover; 100 m Ethernet limit",
        "Coaxial cable, and single-mode vs multimode fiber (distance, light source, core size)",
        "Connectors: RJ-45, RJ-11, BNC, F-type, LC, SC and ST; SFP transceivers",
        "Sources of interference on copper and wireless: EMI, crosstalk, microwaves, walls and distance",
        "Wi-Fi bands 2.4, 5 and 6 GHz and their trade-offs; 802.11 generations",
        "Cellular 4G/5G as licensed spectrum vs unlicensed Wi-Fi; hotspots and tethering",
        "What a client needs to join Wi-Fi: SSID, security type and password or credentials",
        "Endpoint types: desktops, laptops, phones, tablets, servers, printers and IoT devices",
        "Checking connectivity on Windows, Linux, macOS, Android and iOS: settings screens and command-line tools"
      ],
      notes: ["Objectives 3.1–3.4"],
      labs: [
        "Collect (or look up photos of) RJ-45, RJ-11, F-type, LC and SC connectors and make a labeled one-page ID sheet with what each is used for.",
        "On a phone and a laptop, find the IP address, gateway, DNS server and Wi-Fi band/channel in the settings, and write down where each OS hides them.",
        "Use a free Wi-Fi analyzer app (or `netsh wlan show networks mode=bssid` on Windows) to list nearby networks by band, channel and signal strength."
      ]
    },
    {
      id: 4,
      name: "Infrastructure",
      w: 20,
      topics: [
        "Cisco device LEDs: system and port lights, green vs amber, solid vs blinking, and what they tell an engineer on the phone",
        "Reading a network diagram to patch the right cable into the right port",
        "Device ports: RJ-45 Ethernet, SFP/fiber, console (RJ-45 and USB), management, serial, USB and PoE ports",
        "Power over Ethernet: powering phones, APs and cameras from the switch",
        "Default gateway: why a host needs one and what happens without it",
        "Local vs remote networks and how a router decides where to send a packet",
        "Layer 2 vs Layer 3 switches, and routers vs switches",
        "MAC address tables: how a switch learns, forwards, floods and filters",
        "VLANs: separating broadcast domains on one switch; access vs trunk ports",
        "Cable management and labeling in racks and patch panels"
      ],
      notes: ["Objectives 4.1–4.5"],
      labs: [
        "In Cisco Packet Tracer, cable two PCs, a switch and a router from a diagram you draw first, then confirm every link light turns green.",
        "In Packet Tracer, ping between PCs and then run `show mac address-table` on the switch to see which MACs it learned on which ports.",
        "In Packet Tracer, put two PCs in different VLANs on one switch, show that they cannot ping each other, and explain why a router or Layer 3 switch is needed."
      ]
    },
    {
      id: 5,
      name: "Diagnosing problems",
      w: 20,
      topics: [
        "Troubleshooting methodology: identify the problem, theory, test, plan, fix, verify, document",
        "Help desk practice: tickets, gathering information, priorities, escalation and clear documentation",
        "Wireshark: capturing on the right interface, simple display filters and saving a .pcapng file",
        "ping, tracert/traceroute, ipconfig/ifconfig/ip and nslookup: running them and reading the results",
        "How firewalls can make ping or traceroute fail even when the service works",
        "Remote access and data collection: console cable and terminal emulator, SSH vs Telnet, RDP, VPN",
        "Cloud-managed devices (for example Cisco Meraki dashboard)",
        "Cisco IOS basics: user vs privileged EXEC, `?` help and tab completion",
        "Show commands: show running-config, show version, show ip interface brief, show interfaces, show interfaces status, show ip route, show mac address-table, show cdp neighbors, show inventory"
      ],
      notes: ["Objectives 5.1–5.5"],
      labs: [
        "Capture a DNS lookup and a ping in Wireshark, filter with `dns` and `icmp`, and save the capture as a .pcapng file.",
        "Run `ping`, `tracert`/`traceroute`, `nslookup` and `ipconfig /all` against a public site and write a short ticket note describing what each result proves.",
        "In Packet Tracer, run show ip interface brief, show interfaces status, show cdp neighbors, show ip route and show version, and write one sentence on what each told you."
      ]
    },
    {
      id: 6,
      name: "Security",
      w: 12,
      topics: [
        "How firewalls filter traffic: permit and deny rules, ports and protocols, implicit deny",
        "Stateful firewalls vs simple packet filters; host-based vs network firewalls",
        "CIA triad: confidentiality, integrity, availability",
        "Vulnerability, threat, exploit and risk",
        "Malware types, phishing and other social engineering, DoS and DDoS",
        "Authentication basics: strong passwords, MFA, changing default credentials",
        "Home router wireless security: WPA2 vs WPA3, Personal (pre-shared key) vs Enterprise (802.1X)",
        "Why WEP and open networks should not be used, and why WPS should be turned off"
      ],
      notes: ["Objectives 6.1–6.3"],
      labs: [
        "Open Windows Defender Firewall with Advanced Security (or `ufw` on Linux), create a rule that blocks one port, test it and remove it.",
        "Log in to your home router (or a router emulator from the vendor's site) and set WPA3 or WPA2-AES Personal with a strong passphrase; turn off WPS.",
        "Write a one-page table mapping five threats (phishing, ransomware, DDoS, rogue AP, weak password) to the CIA goal they hurt and one control that helps."
      ]
    }
  ],

  study: {
    1: [
      ["Name the four TCP/IP model layers and match one protocol or device to each.", "Application (HTTP, DNS), Transport (TCP, UDP), Internet (IP, ICMP; routers), Network access/link (Ethernet, Wi-Fi; switches, cables). The OSI model splits these into seven layers."],
      ["Explain bandwidth vs throughput using a home internet plan as the example.", "Bandwidth is the link's maximum capacity (the 500 Mbps you pay for). Throughput is what you actually get (say 320 Mbps on Wi-Fi) after overhead, congestion, interference and distance."],
      ["When is UDP a better choice than TCP?", "When speed matters more than guaranteed delivery and the app can handle loss or retry itself: voice and video calls, DNS lookups, DHCP, TFTP, NTP."],
      ["Compare SaaS, PaaS and IaaS with one example each.", "SaaS: you just use the app (Microsoft 365, Webex). PaaS: you deploy code on a managed platform (a web app service). IaaS: you rent virtual servers and networks and manage the OS yourself (a cloud VM)."],
      ["A user asks what the difference is between a LAN, a WAN and a PAN.", "LAN: one building or home. WAN: links sites over long distances, like the internet or a carrier link. PAN: a few meters around one person, such as Bluetooth earbuds to a phone."]
    ],
    2: [
      ["List the three private IPv4 ranges and explain why they need NAT to reach the internet.", "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. They are not routed on the internet, so the router translates them to a public address (usually PAT, many hosts sharing one address)."],
      ["For 192.168.10.77/26, find the network, broadcast and usable host range.", "/26 = blocks of 64 (0, 64, 128, 192). 77 is in 64–127: network 192.168.10.64, broadcast .127, hosts .65–.126 (62 hosts)."],
      ["A PC shows 169.254.23.9. What does that mean and what do you check first?", "It is an APIPA self-assigned address, so the PC got no reply from a DHCP server. Check the cable or Wi-Fi connection, the switch port/VLAN and whether the DHCP server is up."],
      ["Shorten 2001:0db8:0000:0000:0000:00a0:0000:0001.", "Drop leading zeros and replace the longest zero run once with ::, giving 2001:db8::a0:0:1."],
      ["What is the difference between an IPv6 link-local and a global unicast address?", "Link-local (fe80::/10) works only on the local link and is created automatically; routers never forward it. Global unicast (2000::/3) is routable on the internet, like a public IPv4 address."]
    ],
    3: [
      ["When would you pick single-mode fiber over multimode?", "For long runs (kilometers) such as between buildings. Multimode is cheaper and fine for shorter runs, typically up to a few hundred meters inside a building."],
      ["Compare 2.4 GHz and 5 GHz Wi-Fi.", "2.4 GHz has longer range and passes walls better but is crowded with only three non-overlapping channels (1, 6, 11) and interference from microwaves and Bluetooth. 5 GHz is faster with many more channels but shorter range."],
      ["What does a laptop need to join a WPA2-Personal network?", "The SSID, the matching security type (WPA2-Personal/AES) and the correct passphrase. It then gets an IP address, usually by DHCP."],
      ["Name the command on Windows, Linux and macOS that shows a computer's IP settings.", "Windows: ipconfig (ipconfig /all for DNS, gateway and MAC). Linux: ip addr and ip route (older: ifconfig). macOS: ifconfig, or System Settings > Network."],
      ["What is the maximum length of a copper Ethernet run and what happens if you exceed it?", "100 meters (90 m permanent link plus patch cords). Longer runs suffer attenuation, causing errors, slow speeds or no link."]
    ],
    4: [
      ["An engineer on the phone asks what the port light shows. What do green, amber and blinking usually mean on a Cisco switch?", "Solid green: link up. Blinking green: traffic. Amber: port blocked by STP, disabled or faulty (briefly amber is normal while a port comes up). Off: no link."],
      ["Why does a PC need a default gateway?", "To reach any address outside its own subnet. The PC sends that traffic to the gateway (router) MAC; without a gateway it can only talk to local hosts."],
      ["How does a switch build its MAC address table and what does it do with an unknown destination?", "It learns the source MAC of each frame and the port it arrived on. For a known destination it forwards out one port; for an unknown unicast or a broadcast it floods out all ports in that VLAN except the one it came in on."],
      ["What is a VLAN and why use one?", "A logical group of switch ports that forms its own broadcast domain. It separates users (staff, guests, phones) on the same switches for security and less broadcast traffic; a router or Layer 3 switch is needed to move traffic between VLANs."],
      ["What is the console port for, and what do you need to use it?", "Out-of-band management directly on the device, even with no IP configured. You need a console cable (RJ-45 rollover or USB) and a terminal emulator such as PuTTY at 9600 baud."]
    ],
    5: [
      ["List the troubleshooting steps in order.", "Identify the problem (gather information, ask questions), establish a theory, test it, make a plan, implement the fix (or escalate), verify full functionality, and document findings and actions."],
      ["What should a good help desk ticket contain?", "Who is affected, contact info, a clear description and symptoms, when it started, what changed, the steps already tried with results, priority/impact and the resolution or escalation notes."],
      ["A user can ping 8.8.8.8 but cannot open websites by name. What do you check and with which tool?", "DNS. Run nslookup against a site name to see whether the configured DNS server answers, and check the DNS server setting with ipconfig /all."],
      ["Why might ping to a working web server fail?", "A firewall on the server or path may block ICMP echo while still allowing HTTPS. Test the actual service (open the page, or test the port) before declaring the host down."],
      ["Which show command gives a one-line-per-interface summary of IP address and up/down status?", "show ip interface brief. Status is Layer 1, Protocol is Layer 2; 'administratively down' means someone shut the interface."],
      ["Why use SSH instead of Telnet to manage a switch?", "Telnet sends everything, including passwords, in clear text. SSH encrypts the session."]
    ],
    6: [
      ["How does a firewall decide whether to allow traffic?", "It checks each packet or connection against an ordered rule list (source, destination, protocol, port). The first matching rule permits or denies it; if nothing matches, the implicit deny drops it. Stateful firewalls also allow return traffic for sessions started inside."],
      ["Define vulnerability, threat, exploit and risk in one line each.", "Vulnerability: a weakness. Threat: something that could use it. Exploit: the method or code that actually uses it. Risk: the likelihood and impact of that happening."],
      ["What is the CIA triad? Give an example of an attack on each part.", "Confidentiality (data theft), integrity (changing a record), availability (a DDoS taking a site offline)."],
      ["Which Wi-Fi security should you choose on a new home router, and what should you turn off?", "WPA3-Personal, or WPA2/WPA3 mixed or WPA2-AES if older devices need it. Never WEP or open. Turn off WPS, and change the default admin password."]
    ]
  },

  questions: [
    ["cs1",0,1,"A web page request moves down the stack on a PC. At which TCP/IP layer are TCP port numbers added?",["Application","Transport","Internet","Network access"],1,"TCP and UDP port numbers belong to the Transport layer. The Internet layer adds IP addresses, not ports.","Objective 1.1"],
    ["cs2",0,1,"Which address does a switch use to forward a frame within the local network?",["The destination IP address","The destination port number","The destination MAC address","The default gateway address"],2,"Switches forward Ethernet frames by destination MAC address. IP addresses are used by routers to move packets between networks.","Objective 1.1"],
    ["cs3",0,1,"What is the unit of data called at the data link layer?",["Frame","Segment","Packet","Bit"],0,"Layer 2 encapsulates data in frames. Packets are Layer 3 and segments are Layer 4.","Objective 1.1"],
    ["cs4",0,1,"A customer pays for a 1 Gbps internet plan, but a speed test over Wi-Fi shows 380 Mbps. What does the 380 Mbps figure describe?",["Bandwidth","Round-trip latency","Jitter","Throughput"],3,"Throughput is the data rate actually achieved. Bandwidth is the 1 Gbps maximum capacity of the plan.","Objective 1.2"],
    ["cs5",0,1,"A technician wants to measure the real data rate between two office PCs without using the internet. Which tool fits best?",["iperf","A web speed test","nslookup","tracert"],0,"iperf sends test traffic between a client and server that you control, so it measures the local path. A web speed test measures the path to an internet server instead.","Objective 1.2"],
    ["cs6",0,1,"A user on a video call says voices arrive late but clear. Which measurement describes how long data takes to travel from sender to receiver?",["Bandwidth","Latency","Throughput","Packet size"],1,"Latency is the delay for data to cross the network. Bandwidth is capacity and does not by itself describe delay.","Objective 1.2"],
    ["cs7",0,1,"A university connects the networks in its library, dorms and science buildings on one campus. What type of network is this?",["PAN","WAN","CAN","MAN"],2,"A campus area network links buildings on one site. A MAN covers a city, and a WAN spans larger distances.","Objective 1.3"],
    ["cs8",0,1,"Wireless earbuds are paired with a phone using Bluetooth. What type of network is this?",["PAN","WLAN","LAN","CAN"],0,"A personal area network covers a few meters around one person. A WLAN is Wi-Fi covering a building or home.","Objective 1.3"],
    ["cs9",0,1,"A company links its offices in three different countries through a service provider. What type of network is this?",["MAN","LAN","CAN","WAN"],3,"A wide area network connects sites over long distances. A MAN is limited to about one city.","Objective 1.3"],
    ["cs10",0,1,"A small business wants email and documents without managing any servers or operating systems. Which cloud model fits?",["IaaS","PaaS","SaaS","On-premises"],2,"With SaaS the provider runs the whole application. IaaS still requires the customer to manage operating systems.","Objective 1.4"],
    ["cs11",0,1,"A company keeps its payroll servers in its own data center but runs its website on a public cloud provider. Which deployment is this?",["Hybrid cloud","Private cloud","Public cloud only","Community cloud"],0,"Combining on-premises or private resources with public cloud is a hybrid deployment. A private cloud alone would not include the public provider.","Objective 1.4"],
    ["cs12",0,1,"A developer rents virtual machines and installs and patches the operating system on each one. Which service model is being used?",["SaaS","IaaS","PaaS","FaaS"],1,"IaaS provides virtual servers, storage and networking, and the customer manages the OS. PaaS would hide the OS from the developer.","Objective 1.4"],
    ["cs13",0,1,"Which statement about TCP is correct?",["It sends data without any acknowledgments","It is the protocol DHCP relies on to lease out IP addresses","It has no way to detect lost data","It sets up a connection with a three-way handshake"],3,"TCP is connection-oriented: SYN, SYN-ACK, ACK, then acknowledged and retransmitted data. DHCP uses UDP, not TCP.","Objective 1.5"],
    ["cs14",0,1,"A firewall must allow secure web browsing. Which port should be open?",["TCP 443","TCP 8080","UDP 69","TCP 21"],0,"HTTPS uses TCP 443. TCP 8080 is a common alternate port for plain, unencrypted HTTP.","Objective 1.5"],
    ["cs15",0,1,"PCs on a network are not getting their time synchronized from the time server. Which protocol and port should be checked?",["SNMP on UDP 161","DNS on UDP 53","NTP on UDP 123","TFTP on UDP 69"],2,"Network Time Protocol uses UDP 123. DNS on 53 resolves names and does not set clocks.","Objective 1.5"],
    ["cs16",0,1,"A technician needs to copy a switch configuration to a simple server that has no login or authentication. Which protocol is commonly used?",["SFTP","HTTPS","SSH","TFTP"],3,"TFTP (UDP 69) is a simple transfer protocol with no authentication, often used for device configs and images. SFTP requires a login.","Objective 1.5"],
    ["cs17",0,1,"Which protocol does the ping command use?",["ICMP","UDP","ARP","DHCP"],0,"Ping sends ICMP echo requests and waits for echo replies. ARP resolves IP addresses to MAC addresses and is not what ping uses.","Objective 1.5"],
    ["cs18",0,1,"Which pair of protocols normally uses UDP rather than TCP?",["HTTP and HTTPS","DNS queries and DHCP","SSH and FTP","SMTP and HTTPS"],1,"Standard DNS queries (UDP 53) and DHCP (UDP 67/68) use UDP. SSH and FTP use TCP.","Objective 1.5"],

    ["cs19",0,2,"Which of these addresses is a private IPv4 address?",["172.32.4.10","192.169.1.5","11.0.0.8","172.20.15.3"],3,"The private range 172.16.0.0/12 covers 172.16.0.0–172.31.255.255, so 172.20.15.3 is private. 172.32.4.10 is just outside that range.","Objective 2.1"],
    ["cs20",0,2,"Twenty devices in a home all reach the internet through one public IPv4 address. What makes this possible?",["PAT (NAT overload)","DNS","DHCP relay (IP helper)","VLAN tagging"],0,"Port address translation maps many private addresses to one public address using different port numbers. DHCP hands out addresses but does not translate them.","Objective 2.1"],
    ["cs21",0,2,"A laptop shows the address 169.254.40.12 and cannot reach anything. What is the most likely cause?",["The DNS server is down","The laptop has a duplicate IP address","The laptop did not get a reply from a DHCP server","The default gateway is configured with the wrong address"],2,"169.254.x.x is an APIPA address a device assigns itself when DHCP fails. A DNS problem would not change the IP address.","Objective 2.1"],
    ["cs22",0,2,"Which subnet mask matches the prefix /26?",["255.255.255.0","255.255.255.192","255.255.255.128","255.255.255.224"],1,"/26 is 24 bits plus 2 more: 128 + 64 = 192. 255.255.255.224 is /27.","Objective 2.2"],
    ["cs23",0,2,"How many usable host addresses are in a /27 subnet?",["30","32","62","14"],0,"/27 leaves 5 host bits: 2^5 = 32, minus the network and broadcast addresses = 30. 32 is the total, not usable, count.","Objective 2.2"],
    ["cs24",0,2,"A host is 10.1.1.70/26. What is its network address?",["10.1.1.0","10.1.1.32","10.1.1.64","10.1.1.70"],2,"/26 uses blocks of 64 (0, 64, 128, 192). 70 falls in 64–127, so the network is 10.1.1.64.","Objective 2.2"],
    ["cs25",0,2,"PC A is 192.168.5.20/25 and PC B is 192.168.5.140/25 with no router between them. Why can't they ping each other?",["They are in different subnets","They share the same broadcast address","A /25 allows only two hosts","Both addresses are public"],0,"A /25 splits the network at .128: .0–.127 and .128–.255, so the PCs are in different subnets and need a router. They do not share a broadcast address.","Objective 2.2"],
    ["cs26",0,2,"What is the broadcast address of 192.168.8.0/24?",["192.168.8.0","192.168.8.1","192.168.255.255","192.168.8.255"],3,"The broadcast address has all host bits set to 1, which is .255 in a /24. 192.168.8.0 is the network address.","Objective 2.2"],
    ["cs27",0,2,"Which is a valid shortened form of 2001:0db8:0000:0000:0000:0000:0000:0010?",["2001:db8::1","2001:db8::10","2001:db8:0:10","2001::db8::10"],1,"Remove leading zeros and replace the zero run with :: once, giving 2001:db8::10. The :: can appear only once, so 2001::db8::10 is invalid.","Objective 2.3"],
    ["cs28",0,2,"An IPv6 address begins with fe80. What type of address is it?",["Global unicast","Multicast","Link-local","Loopback"],2,"fe80::/10 is link-local, used only on the local link. Multicast addresses start with ff.","Objective 2.3"],
    ["cs29",0,2,"A laptop builds its own IPv6 global address from the router's advertised prefix without a DHCP server. What is this called?",["SLAAC","APIPA","PAT","DHCPv4"],0,"Stateless address autoconfiguration uses the prefix from router advertisements. APIPA is an IPv4 fallback, not IPv6.","Objective 2.3"],

    ["cs30",0,3,"A technician must run a network cable 70 meters across an office ceiling and support 10 Gbps. Which cable is the best choice?",["Cat 5e","Cat 6a","Cat 3","RG-6 coax"],1,"Cat 6a supports 10 Gbps up to 100 m. Cat 5e is rated for 1 Gbps.","Objective 3.1"],
    ["cs31",0,3,"Which connector is used on a standard Ethernet patch cable?",["RJ-11","BNC","F-type","RJ-45"],3,"RJ-45 is the 8-pin connector used for twisted-pair Ethernet. RJ-11 is the smaller telephone connector.","Objective 3.1"],
    ["cs32",0,3,"Two buildings are 5 km apart. Which cable should connect them?",["Single-mode fiber","Multimode fiber","Cat 6 shielded copper cable","Coaxial cable"],0,"Single-mode fiber carries signals for many kilometers. Multimode is limited to much shorter runs, and copper Ethernet stops at 100 m.","Objective 3.1"],
    ["cs33",0,3,"A cable modem connects to the provider's wall outlet with a threaded, screw-on connector. Which connector is it?",["LC","RJ-45","F-type","ST"],2,"Cable TV and cable internet use coax with F-type screw-on connectors. LC and ST are fiber connectors.","Objective 3.1"],
    ["cs34",0,3,"A switch has an empty slot that accepts a hot-swappable module so it can connect to fiber. What is this module called?",["PoE injector","SFP transceiver","Patch panel","Media keystone"],1,"SFP (small form-factor pluggable) transceivers plug into switch slots to support fiber or copper. A patch panel is a passive termination point, not a module.","Objective 3.1"],
    ["cs35",0,3,"Which fiber connector is small, square and commonly found in pairs on SFP modules?",["BNC","RJ-11","F-type","LC"],3,"LC is the small form-factor fiber connector common on SFPs. BNC and F-type are coax connectors.","Objective 3.1"],
    ["cs36",0,3,"Users near a break room lose 2.4 GHz Wi-Fi each time the microwave oven runs. What is the best fix?",["Move those users to the 5 GHz band","Lower the AP's channel to 1","Switch the network to WEP","Increase the DHCP lease time for those laptops"],0,"Microwave ovens interfere in the 2.4 GHz band; 5 GHz avoids that interference. Changing security settings does nothing for radio interference.","Objective 3.2"],
    ["cs37",0,3,"Which statement correctly compares cellular and Wi-Fi networks?",["Wi-Fi uses licensed spectrum and cellular does not","Both require an Ethernet cable to the device","Cellular uses licensed spectrum run by a carrier","Cellular is limited to a single building"],2,"Cellular (4G/5G) runs on spectrum licensed to carriers. Wi-Fi uses unlicensed bands, so the first option reverses them.","Objective 3.2"],
    ["cs38",0,3,"Which three 2.4 GHz channels do not overlap in North America?",["1, 6 and 11","2, 7 and 12","1, 5 and 9","3, 8 and 13"],0,"Channels 1, 6 and 11 are the standard non-overlapping 2.4 GHz set in North America. Other combinations overlap.","Objective 3.2"],
    ["cs39",0,3,"A visitor needs to join the office guest Wi-Fi using WPA2-Personal. What must they know?",["The AP's MAC address and serial number","The SSID and the passphrase","The switch VLAN ID and gateway","Their username and a smart card"],1,"WPA2-Personal requires the network name (SSID) and the pre-shared passphrase. Username-based logins are for WPA2-Enterprise.","Objective 3.2"],
    ["cs40",0,3,"A copper cable run between a switch and a PC is 130 meters long and the link is slow with many errors. What is the problem?",["The cable is too short","The PC needs a static IP","The run exceeds the 100 m Ethernet limit","The switch needs an SFP module"],2,"Twisted-pair Ethernet is limited to 100 m; beyond that attenuation causes errors. The IP configuration has nothing to do with signal loss.","Objective 3.2"],
    ["cs41",0,3,"A smart thermostat, a door sensor and a security camera are all on the network. What category of endpoints are these?",["Servers","Thin clients","Workstations","IoT devices"],3,"Internet of Things devices are single-purpose, connected sensors and appliances. Servers provide services to many clients.","Objective 3.3"],
    ["cs42",0,3,"On a Windows PC, which command shows the IP address, subnet mask, default gateway, DNS servers and MAC address?",["ipconfig /all","netstat -an","ping -t","tracert -d 8.8.8.8"],0,"ipconfig /all shows the full adapter configuration. Plain ipconfig leaves out DNS and MAC details, and netstat shows connections.","Objective 3.4"],
    ["cs43",0,3,"A Linux user wants to see the addresses assigned to each interface. Which modern command should they run?",["ipconfig /all","ip addr","show ip interface brief","nslookup"],1,"ip addr (ip a) lists interfaces and addresses on Linux. ipconfig is the Windows command.","Objective 3.4"],
    ["cs44",0,3,"An iPhone user says Wi-Fi shows connected but apps do not load. Where can the technician check the phone's IP address and router address?",["The App Store","The phone's Bluetooth settings","The Wi-Fi settings, info icon next to the network","The Battery settings"],2,"On iOS, tapping the info (i) icon beside the joined Wi-Fi network shows the IP address, subnet mask and router. Bluetooth settings do not show IP details.","Objective 3.4"],

    ["cs45",0,4,"An engineer asks what a switch port LED is doing, and the technician reports solid green that flickers when a PC is used. What does this usually mean?",["The port is disabled","The port has a link and is passing traffic","The port has failed POST","The port is blocked by Spanning Tree Protocol"],1,"Green means link up, and blinking green shows activity. Amber usually indicates blocked, disabled or faulty.","Objective 4.1"],
    ["cs46",0,4,"A newly connected switch port stays amber for a long time, while other ports turn green. What should the technician report to the engineer?",["The port is working normally at full speed","The PoE budget has increased","The port may be blocked, disabled or faulty","The switch firmware is up to date"],2,"A steady amber port light on a Cisco switch commonly means the port is blocked (for example by STP), disabled or has a fault. Green would indicate normal link.","Objective 4.1"],
    ["cs47",0,4,"The system LED on a Cisco switch is off and none of the port lights are on. What should the technician check first?",["The DNS server","The VLAN configuration","The DHCP scope","The power supply and power cable"],3,"If the system light is off the switch likely has no power. VLAN and DHCP settings cannot affect the system LED.","Objective 4.1"],
    ["cs48",0,4,"An engineer sends a diagram showing SW1 Gi1/0/24 connecting to R1 G0/0. What should the technician do?",["Connect a patch cable from port Gi1/0/24 on SW1 to port G0/0 on R1","Connect any free switch port to the router's console port","Connect SW1 port 1 to R1 port 24","Connect R1's USB port to the first free SFP slot on SW1 using a console cable"],0,"Diagrams list the exact device and interface at each end of a link, so the cable goes from SW1 Gi1/0/24 to R1 G0/0. Connecting any free port would not match the design.","Objective 4.2"],
    ["cs49",0,4,"After patching a cable from the diagram, the technician wants to confirm it is in the right port without logging in. What is the quickest check?",["Reboot the switch","Look for the link light on the expected port turning green","Replace the patch panel","Change the port's VLAN"],1,"The port LED shows link as soon as the other end is connected, confirming the physical connection. Rebooting disrupts users and proves nothing.","Objective 4.2"],
    ["cs50",0,4,"Which port is used to manage a new Cisco router that has no IP address configured yet?",["An SFP port","A PoE port","The console port","A serial WAN port"],2,"The console port gives out-of-band CLI access with no IP needed. Serial ports connect to WAN links, not management terminals.","Objective 4.3"],
    ["cs51",0,4,"A VoIP phone has no power adapter but lights up once plugged into the switch. What feature is the switch port providing?",["Power over Ethernet","Port security","Link aggregation","VLAN trunking"],0,"PoE delivers power over the Ethernet cable to phones, APs and cameras. Trunking carries VLANs but no power.","Objective 4.3"],
    ["cs52",0,4,"Which cable connects a laptop's USB port to the RJ-45 console port on a Cisco switch?",["A Cat 6 crossover cable","A coax jumper","A single-mode fiber patch","A USB-to-RJ-45 console (rollover) cable"],3,"Console access uses a rollover-style console cable, often USB to RJ-45. A crossover is for Ethernet links, not console access.","Objective 4.3"],
    ["cs53",0,4,"A PC can reach other PCs on its subnet but nothing on other networks. Its IP and mask are correct. What is the most likely missing setting?",["DNS suffix","Default gateway","MAC address","Proxy server port number"],1,"The default gateway is where a host sends traffic for remote networks. A missing DNS setting would still allow pinging remote IP addresses.","Objective 4.4"],
    ["cs54",0,4,"PC 10.0.5.10/24 sends a packet to 10.0.9.20. Where does the PC send the frame?",["Directly to 10.0.9.20's MAC address","To the DNS server","To every host as a broadcast","To its default gateway's MAC address"],3,"10.0.9.20 is outside 10.0.5.0/24, so the PC sends the frame to its gateway, which routes it. It cannot reach the remote host's MAC directly.","Objective 4.4"],
    ["cs55",0,4,"What can a Layer 3 switch do that a Layer 2 switch cannot?",["Route traffic between VLANs or subnets","Learn MAC addresses","Forward frames within one VLAN","Provide Power over Ethernet to IP phones"],0,"A Layer 3 switch can route using IP addresses. Learning MACs and forwarding within a VLAN are basic Layer 2 functions that both perform.","Objective 4.4"],
    ["cs56",0,4,"Which device separates networks and forwards packets between them using IP addresses?",["Hub","Unmanaged switch","Router","Access point"],2,"Routers connect different networks and make decisions by IP address. An unmanaged switch only forwards by MAC within one network.","Objective 4.4"],
    ["cs57",0,4,"How does a switch learn which port a device is connected to?",["It asks the DNS server","It reads the source MAC address of frames arriving on each port","It reads the destination IP address of each packet","The administrator types every entry in manually"],1,"Switches record the source MAC and incoming port of each frame in the MAC address table. Destination IPs are used by routers, not for MAC learning.","Objective 4.5"],
    ["cs58",0,4,"A switch receives a frame for a MAC address that is not in its MAC address table. What does it do?",["Drops the frame","Sends it back to the sender","Sends it only to the default gateway","Floods it out all ports in the VLAN except the one it arrived on"],3,"Unknown unicast frames are flooded within the VLAN so the destination can receive them. Dropping it would break new conversations.","Objective 4.5"],
    ["cs59",0,4,"An office wants guest devices and staff PCs on the same switches but in separate broadcast domains. What should be configured?",["VLANs","A larger DHCP scope","Faster uplinks","A new SSID only"],0,"VLANs split one physical switch into separate broadcast domains. A larger DHCP scope only adds addresses, it does not separate traffic.","Objective 4.5"],
    ["cs60",0,4,"Two PCs are on the same switch but in different VLANs. What is needed for them to communicate?",["A longer patch cable","A router or Layer 3 switch","A hub between them","The same MAC address on both"],1,"Each VLAN is its own network, so traffic between them must be routed. A hub cannot join VLANs.","Objective 4.5"],
    ["cs61",0,4,"A switch port connects to another switch and must carry traffic for VLANs 10, 20 and 30. How should the port be set?",["As an access port in VLAN 10","As a console port","As a trunk port","As a shutdown port"],2,"Trunk ports carry several VLANs using 802.1Q tags. An access port belongs to only one VLAN.","Objective 4.5"],
    ["cs62",0,4,"An engineer asks the technician to check which switch port a PC with a known MAC address is using. Which command should be run?",["show version","show mac address-table","show ip route","show running-config | include hostname"],1,"show mac address-table lists each learned MAC with its VLAN and port. show version shows software and hardware, not MAC locations.","Objective 4.5"],

    ["cs63",0,5,"A user reports that email stopped working. What is the first step of the troubleshooting methodology?",["Identify the problem by gathering information and asking questions","Replace the user's network cable and reboot the PC to see if it helps","Reboot the mail server","Document the fix in the ticket"],0,"Troubleshooting starts by identifying the problem: symptoms, scope and recent changes. Replacing hardware first skips the diagnosis.","Objective 5.1"],
    ["cs64",0,5,"A technician fixes a user's printer mapping. Which step should come before closing the ticket?",["Establish a theory of probable cause","Escalate to the network team","Verify full functionality and document the solution","Question the user about what changed"],2,"After a fix, verify it works for the user and document what was done. Establishing a theory happens earlier in the process.","Objective 5.1"],
    ["cs65",0,5,"Two tickets arrive at once: one user cannot change a desktop wallpaper, and the whole sales floor has lost internet. How should they be handled?",["In the order they were received","Whichever is easier first","Wallpaper first because it is quick","Sales floor outage first because it affects more people and the business"],3,"Priority is based on impact and urgency; a department-wide outage outranks a single-user cosmetic issue. First-come order ignores impact.","Objective 5.1"],
    ["cs66",0,5,"A help desk technician cannot fix a switch problem and escalates it. What makes the escalation most useful?",["A ticket with symptoms, affected users, tests run and results","A short message saying the network is broken","A phone call with no ticket","Asking the user to phone the network engineer directly and explain the problem"],0,"Clear notes on symptoms, scope and steps already tried stop the next tier repeating work. A vague message forces them to start over.","Objective 5.1"],
    ["cs67",0,5,"A technician wants to capture traffic in Wireshark from a laptop's wired connection. What must be selected before starting?",["A display filter","The correct network interface","The file format .txt","The router's IP address"],1,"Wireshark captures on the interface you select, so pick the wired adapter. Display filters can be applied after capture.","Objective 5.2"],
    ["cs68",0,5,"After a capture, the technician wants to view only DNS traffic in Wireshark. What should be typed in the display filter bar?",["port 53 only","show dns","dns","filter=dns"],2,"The Wireshark display filter dns shows DNS packets. The other entries are not valid display filter syntax.","Objective 5.2"],
    ["cs69",0,5,"An engineer asks for a packet capture to review later. How should the technician share it?",["Take a screenshot of the packet list","Copy the summary line into the ticket","Export it as a CSV of source IPs","Save it as a .pcapng file and attach it"],3,"Saving the capture as .pcapng keeps every packet so the engineer can open it in Wireshark. A screenshot loses the packet details.","Objective 5.2"],
    ["cs70",0,5,"ping 8.8.8.8 succeeds, but ping www.example.com says it could not find the host. Which area is most likely failing?",["Name resolution (DNS)","The physical cable","The default gateway setting","The Wi-Fi password"],0,"Reaching an IP address proves the path and gateway work; failing by name points to DNS. A cable or gateway fault would also break the IP ping.","Objective 5.3"],
    ["cs71",0,5,"A user cannot reach a website. tracert shows replies from the first three hops, then only asterisks. What does this suggest?",["The user's PC has no IP address","The problem, or an ICMP-blocking device, is beyond the third hop","The DNS server is down","The Wi-Fi password is wrong"],1,"The first hops answered, so the local link and gateway work; the issue or a firewall that drops traceroute probes lies further along the path. A PC with no IP would get no replies at all.","Objective 5.3"],
    ["cs72",0,5,"A server's website loads fine in a browser, but ping to the server times out. What is the most likely explanation?",["The server's network card is unplugged","The server's DNS record is missing","A firewall is blocking ICMP echo requests","The server is powered off"],2,"Firewalls often block ICMP while allowing web traffic, so a failed ping does not mean the service is down. An unplugged or powered-off server would not serve the page.","Objective 5.3"],
    ["cs73",0,5,"Which command checks whether a DNS server can resolve a host name to an IP address?",["arp -a","ipconfig /release","netstat","nslookup"],3,"nslookup queries a DNS server directly. arp -a shows the local IP-to-MAC cache and does not test DNS.","Objective 5.3"],
    ["cs74",0,5,"A technician runs ping 127.0.0.1 on a PC and gets replies. What does this confirm?",["The PC's TCP/IP stack is working","The default gateway is reachable","The DNS server is responding","The internet connection is up"],0,"127.0.0.1 is the loopback address, so the reply shows only that the local IP stack works. It never leaves the PC, so it says nothing about the gateway.","Objective 5.3"],
    ["cs75",0,5,"An engineer needs to manage a switch remotely with an encrypted command-line session. Which protocol should be used?",["Telnet","SSH","RDP","TFTP"],1,"SSH provides an encrypted CLI session on TCP 22. Telnet sends everything, including passwords, in clear text.","Objective 5.4"],
    ["cs76",0,5,"A technician needs to see a Windows server's desktop from home to change a setting. Which tool fits?",["Serial console cable with PuTTY","SSH","Remote Desktop Protocol","SNMP"],2,"RDP gives a remote graphical desktop on Windows. SSH provides command-line access, not the Windows desktop.","Objective 5.4"],
    ["cs77",0,5,"A company's switches and access points are managed from a web dashboard hosted by the vendor, with no on-site controller. What is this approach called?",["Out-of-band console management","Telnet management","A local TFTP server","Cloud-based network management"],3,"Cloud-managed platforms such as Cisco Meraki let admins configure and monitor devices from a hosted dashboard. Console management requires a physical cable.","Objective 5.4"],
    ["cs78",0,5,"A remote worker must reach internal file shares securely over the internet. What should they connect with first?",["A VPN","Telnet","FTP","An open guest Wi-Fi"],0,"A VPN creates an encrypted tunnel into the company network. FTP sends data unencrypted and does not provide network access.","Objective 5.4"],
    ["cs79",0,5,"Which Cisco command gives a short list of every interface with its IP address and up/down status?",["show running-config","show version","show ip interface brief","show cdp neighbors"],2,"show ip interface brief shows one line per interface with IP, status and protocol. show running-config shows the whole configuration and is far longer.","Objective 5.5"],
    ["cs80",0,5,"An engineer asks which Cisco devices are directly connected to the switch and on which ports. Which command answers this?",["show ip route","show cdp neighbors","show inventory","show interfaces status"],1,"CDP discovers directly connected Cisco devices, showing their names, platforms and local ports. show ip route lists routes, not neighbors.","Objective 5.5"],
    ["cs81",0,5,"A technician is asked for the switch's IOS version and how long it has been running since the last reload. Which command shows both?",["show version","show running-config","show mac address-table","show ip interface brief"],0,"show version displays the IOS version, uptime, model and more. The running config does not show uptime.","Objective 5.5"],
    ["cs82",0,5,"The switch prompt shows Switch>. What must be typed to reach privileged EXEC mode to run more show commands?",["configure terminal","exit","show privilege","enable"],3,"enable moves from user EXEC (>) to privileged EXEC (#). configure terminal only works after you are already in privileged mode.","Objective 5.5"],
    ["cs83",0,5,"A technician forgets the exact show command syntax on a Cisco switch. What is the quickest built-in help?",["Reload the switch","Type show ? to list the options","Type help show all","Unplug the console cable"],1,"Typing ? lists the valid options at that point in the command, and Tab completes partial words. help show all is not IOS syntax.","Objective 5.5"],
    ["cs84",0,5,"show interfaces on a port shows a steadily increasing count of CRC errors. What does this most likely indicate?",["Wrong VLAN assignment","A DNS misconfiguration","A cabling or physical-layer problem","The port has no IP address"],2,"CRC errors mean frames arrive corrupted, usually from bad cables, connectors or interference. DNS and VLAN settings do not corrupt frames.","Objective 5.5"],

    ["cs85",0,6,"A firewall rule list has no rule matching a new incoming connection. What happens to the traffic?",["It is allowed by default","It is logged and forwarded","It is sent to the DNS server","It is dropped by the implicit deny"],3,"Firewalls end with an implicit deny, so unmatched traffic is blocked. Allowing unmatched traffic would defeat the rule list.","Objective 6.1"],
    ["cs86",0,6,"A small office firewall lets users browse the web, and reply traffic comes back in automatically without an inbound rule. What feature allows this?",["Stateful inspection","MAC filtering","Port mirroring","DHCP snooping on the LAN"],0,"A stateful firewall tracks outbound sessions and allows the matching return traffic. MAC filtering controls which devices can join, not return traffic.","Objective 6.1"],
    ["cs87",0,6,"An administrator wants to stop anyone outside the network from using Telnet to reach internal devices. Which firewall rule fits?",["Permit TCP 23 from any","Deny TCP 23 from outside","Deny UDP 53 from outside","Permit TCP 443 from any"],1,"Telnet uses TCP 23, so denying it inbound blocks outside Telnet access. UDP 53 is DNS.","Objective 6.1"],
    ["cs88",0,6,"An attacker changes the amounts in a bank transfer while it is in transit. Which part of the CIA triad is affected?",["Confidentiality","Availability","Integrity","Accountability"],2,"Unauthorized changes to data hurt integrity. Confidentiality is about data being read by the wrong people.","Objective 6.2"],
    ["cs89",0,6,"A web server has an unpatched flaw that attackers could use. What is the unpatched flaw called?",["A security threat","A risk","An exploit","A vulnerability"],3,"A vulnerability is a weakness. The exploit is the code or method that uses it, and the threat is who or what might use it.","Objective 6.2"],
    ["cs90",0,6,"Thousands of infected computers flood a company's website with traffic until it stops responding. What type of attack is this?",["DDoS","Phishing","Man-in-the-middle","Tailgating"],0,"A distributed denial-of-service attack uses many systems to overwhelm a target and harms availability. Phishing tricks users with fake messages.","Objective 6.2"],
    ["cs91",0,6,"An employee gets an email that looks like it is from IT, asking them to click a link and re-enter their password. What is this?",["Ransomware","Phishing","A DoS attack","A brute-force attack"],1,"Phishing uses fake messages to steal credentials or install malware. Brute force guesses passwords rather than asking for them.","Objective 6.2"],
    ["cs92",0,6,"Malware encrypts a user's files and displays a demand for payment to unlock them. What type of malware is this?",["A keylogger","Adware","Ransomware","A rootkit"],2,"Ransomware encrypts data and demands payment. A keylogger records keystrokes but does not lock files.","Objective 6.2"],
    ["cs93",0,6,"A customer is setting up a new home router. Which wireless security option should the technician recommend?",["WPA3-Personal","WEP","Open with a hidden SSID","WPA with TKIP"],0,"WPA3-Personal is the current, strongest option for homes. WEP and TKIP are broken, and hiding an SSID provides no real security.","Objective 6.3"],
    ["cs94",0,6,"A home router offers a push-button setting for connecting devices without typing the passphrase. Why should it usually be turned off?",["It forces clients to use 6 GHz","It lowers Wi-Fi range","It changes the SSID and channel every day automatically","WPS can be attacked to reveal the network key"],3,"Wi-Fi Protected Setup, especially the PIN method, has known weaknesses that can leak the passphrase. It has no effect on range or band.","Objective 6.3"],
    ["cs95",0,6,"What is the main difference between WPA2-Personal and WPA2-Enterprise?",["Personal uses AES and Enterprise uses WEP","Enterprise authenticates each user through 802.1X, Personal uses one shared passphrase","Personal works only on 5 GHz","Enterprise needs no passwords at all"],1,"Enterprise mode checks individual credentials against an authentication server with 802.1X, while Personal uses a pre-shared key. Both use AES, not WEP.","Objective 6.3"],
    ["cs96",0,6,"After enabling WPA3 on a home router, an older printer can no longer join. What is a reasonable fix that keeps security strong?",["Switch the router to WEP","Turn off Wi-Fi security completely","Use WPA2/WPA3 transition mode or connect the printer by cable","Share the router admin password with the printer"],2,"Transition mode lets older WPA2 devices join while newer ones use WPA3, and a cable avoids Wi-Fi entirely. WEP or open Wi-Fi would expose the whole network.","Objective 6.3"]
  ]
});
