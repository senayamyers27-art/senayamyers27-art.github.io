/* CompTIA A+ Core 1 220-1201 (V15) — generated plan (no hand-written weeks). */
CertHub.register({
  id: "a-plus-core1",
  vendor: "CompTIA",
  name: "CompTIA A+ Core 1",
  short: "A+ Core 1",
  exam: "220-1201",
  blurb: "Entry-level IT support certification (first of two A+ exams) covering mobile devices, networking, PC hardware, virtualization and cloud, and hardware and network troubleshooting.",
  status: "check",
  statusNote: "comptia.org was unreachable from this environment on Sept 24, 2026, so the official objectives could not be read directly. Exam code 220-1201 (A+ V15, launched Mar 25, 2025), up to 90 questions, 90 minutes, 675 passing score and the five domain weights (13/23/25/11/28) come from search results for CompTIA's Core 1 V15 page and CompTIA-published objectives mirrors. Confirm against the official 220-1201 objectives PDF.",
  lastVerified: "2026-09-24",
  notices: [{"from":"2026-09-24","until":"2026-12-31","text":"The older Core 1 exam, 220-1101, retired Sept 25, 2025. This plan covers 220-1201 (A+ V15). Study guides and practice tests written for 220-1101 are out of date."}],
  examInfo: {"questions":"Up to 90 (multiple choice, drag and drop and PBQs)","minutes":90,"pass":"675 on a 100–900 scale","extra":"A+ needs both Core 1 (220-1201) and Core 2 (220-1202) from the same series."},
  examSim: {"questions":90,"minutes":90},
  sources: [{"label":"CompTIA A+ Core 1 (V15) certification page","url":"https://www.comptia.org/en-us/certifications/a/core-1-v15/"},{"label":"CompTIA A+ Core 1 and Core 2 (V15) exam details and objectives","url":"https://www.comptia.org/en-us/certifications/a/core-1-and-2-v15/"}],
  planWeeks: 10,
  hoursPerWeek: "6–8",
  domains: [
    {
      "id": 1,
      "name": "Mobile devices",
      "w": 13,
      "topics": [
        "Laptop hardware replacement: battery, keyboard, RAM (SODIMM vs soldered), storage (2.5-inch, M.2 SATA vs NVMe), wireless cards and antennas",
        "Screen parts: LCD vs OLED panels, backlight, digitizer/touch layer, webcam and microphone placement in the bezel",
        "Physical privacy and security: biometrics, privacy screens, NFC-based security",
        "Mobile ports and accessories: USB-C, Lightning, micro-USB, docking stations and port replicators",
        "Accessories: touch pens/stylus, headsets, speakers, webcams, trackpads and drawing pads",
        "Wireless connection methods: Bluetooth pairing, NFC, hotspot and tethering, Wi-Fi",
        "Cellular connectivity: 4G/5G, enabling and disabling radios, airplane mode, eSIM vs physical SIM",
        "Location services: GPS and cellular location",
        "Mobile device management (MDM) and mobile application management: enrollment, policies, remote wipe",
        "Mobile app and data sync: email, calendar and contacts, cloud sync, two-factor authenticator apps"
      ],
      "notes": [
        "Objectives 1.1–1.3"
      ],
      "labs": [
        "Look up your own laptop's service manual (the maker's support site) and list which parts are replaceable: battery, RAM (slot or soldered), SSD type (M.2 SATA or NVMe) and Wi-Fi card; run `wmic memorychip get devicelocator,capacity,speed` or CPU-Z to confirm what is installed.",
        "Pair a Bluetooth device with your phone and PC, then turn on your phone's hotspot, join it from the laptop and check the new IP settings with `ipconfig /all`.",
        "Run `powercfg /batteryreport` on a Windows laptop and compare design capacity with full charge capacity to judge battery wear."
      ]
    },
    {
      "id": 2,
      "name": "Networking",
      "w": 23,
      "topics": [
        "TCP vs UDP and common ports: FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, HTTP 80, POP3 110, IMAP 143, SNMP 161/162, LDAP 389, HTTPS 443, SMB 445, RDP 3389",
        "Networking hardware: routers, managed vs unmanaged switches, access points, patch panels, firewalls, PoE injectors and switches, cable modems, DSL and ONT",
        "Wireless: 2.4, 5 and 6 GHz bands, channels and regulations, 802.11a/b/g/n/ac/ax, Bluetooth, NFC, RFID",
        "Networked host services: DNS, DHCP, file and print servers, mail, syslog, web servers, AAA/RADIUS, proxy servers, spam gateways, UTM, load balancers, IoT and legacy/embedded systems",
        "SOHO setup: DHCP scopes and reservations, static addressing, NAT, port forwarding, DMZ, UPnP, screened subnet, Wi-Fi security (WPA2/WPA3)",
        "IP addressing: IPv4 vs IPv6, public vs private ranges, APIPA, static vs dynamic, subnet mask and default gateway",
        "DNS records: A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC); VLANs and VPNs",
        "Internet connection types: satellite, fiber, cable, DSL, cellular, fixed wireless (WISP)",
        "Network types: LAN, WAN, PAN, MAN, SAN, WLAN",
        "Networking tools: crimper, cable stripper, punchdown tool, toner probe, cable tester, loopback plug, Wi-Fi analyzer, network tap"
      ],
      "notes": [
        "Objectives 2.1–2.8"
      ],
      "labs": [
        "Run `netstat -ano` (Windows) or `ss -tulpn` (Linux) on your PC, match each listening port to a protocol from the port list, and use `Get-NetTCPConnection -State Listen` to see which process owns it.",
        "Log in to your home router's admin page and document the DHCP scope, lease time, Wi-Fi security mode, bands and channels; create a DHCP reservation for one device and confirm it with `ipconfig /release` and `ipconfig /renew`.",
        "Use `nslookup -type=MX` and `nslookup -type=TXT` on a public domain to read its mail servers and SPF record, then scan nearby Wi-Fi with `netsh wlan show networks mode=bssid` and note each network's band and channel."
      ]
    },
    {
      "id": 3,
      "name": "Hardware",
      "w": 25,
      "topics": [
        "Displays: LCD panel types (IPS, TN, VA), OLED, mini-LED, resolution, refresh rate, brightness, color gamut, touch screens",
        "Cables and connectors: USB-A/C, Thunderbolt, HDMI, DisplayPort, DVI, VGA, SATA, Molex, Lightning, Cat 5e/6/6a, T568A/B, plenum vs riser, coax, fiber, adapters",
        "RAM: DDR4 vs DDR5, DIMM vs SODIMM, single, dual and multichannel, ECC, virtual RAM",
        "Storage: HDD speeds and form factors, SSD interfaces (SATA, NVMe, M.2 keys), flash drives and cards, RAID 0, 1, 5, 6 and 10",
        "Motherboards: ATX, microATX, Mini-ITX; connectors, headers and expansion slots (PCIe); CPU sockets",
        "Firmware: BIOS/UEFI settings, boot order, passwords, Secure Boot, TPM and HSM, virtualization support, fan and temperature monitoring",
        "CPUs: x86/x64 vs ARM, cores and threads, integrated graphics; cooling with fans, heat sinks, thermal paste/pads and liquid cooling",
        "Expansion cards: graphics, sound, capture, NIC",
        "Power supplies: 110/115 vs 220/240 V input, 3.3/5/12 V output, 24-pin, modular, redundant, wattage rating",
        "Printers and multifunction devices: setup, drivers, duplex, orientation, tray settings, network and cloud printing, secure print",
        "Printer types and consumables: laser imaging process and maintenance kits, inkjet, thermal, impact, 3-D printers"
      ],
      "notes": [
        "Objectives 3.1–3.8"
      ],
      "labs": [
        "Inventory your own PC with free tools: CPU-Z (CPU, motherboard, RAM type and channel mode), CrystalDiskInfo (drive interface and S.M.A.R.T. health) and `msinfo32` (BIOS mode, Secure Boot state); write up what you could upgrade.",
        "Reboot into your PC's UEFI setup and find (without changing) boot order, Secure Boot, TPM/fTPM/PTT, virtualization (VT-x/AMD-V/SVM) and fan/temperature pages; then check `tpm.msc` in Windows.",
        "Use an online PSU calculator with your inventory to estimate wattage needs, then open your printer's properties in Windows and set duplex and tray defaults and print a test page."
      ]
    },
    {
      "id": 4,
      "name": "Virtualization and cloud computing",
      "w": 11,
      "topics": [
        "Virtualization purposes: sandbox, test/development, application virtualization, legacy software and operating systems",
        "Hypervisors: Type 1 (bare metal) vs Type 2 (hosted)",
        "Resource requirements for VMs: CPU virtualization support, RAM, storage, network (NAT, bridged, internal)",
        "Security for VMs: isolation, snapshots, patching guests",
        "Containers vs virtual machines",
        "Virtual desktop infrastructure (VDI) and desktop as a service",
        "Cloud deployment models: public, private, hybrid, community",
        "Cloud service models: IaaS, PaaS, SaaS",
        "Cloud characteristics: shared vs dedicated resources, metered utilization, rapid elasticity, high availability, multitenancy, file synchronization"
      ],
      "notes": [
        "Objectives 4.1–4.2"
      ],
      "labs": [
        "Install VirtualBox (free) on your PC, confirm virtualization is enabled in Task Manager > Performance > CPU, and build a Linux VM (for example Ubuntu) with 2 GB RAM and a 20 GB disk.",
        "Take a snapshot of the VM, break something on purpose (delete a folder or change a setting), then revert the snapshot; switch the VM's network between NAT and bridged and compare `ip addr` output.",
        "Make a table of three free cloud services you already use (for example OneDrive, Gmail, a free-tier cloud VM) and label each as IaaS, PaaS or SaaS and public or private."
      ]
    },
    {
      "id": 5,
      "name": "Hardware and network troubleshooting",
      "w": 28,
      "topics": [
        "The CompTIA troubleshooting methodology: identify (question users, back up, check recent changes), theorize, test, plan, implement, verify, document",
        "Motherboard, RAM, CPU and power problems: POST beeps, no power, overheating shutdowns, blue screens, burning smell, swollen capacitors, date/time resets",
        "Storage problems: clicking or grinding noises, S.M.A.R.T. warnings, bootable device not found, slow performance, degraded or failed RAID",
        "Video, projector and display problems: no image, dim image, dead pixels, flickering, burn-in, fuzzy image at non-native resolution, projector overheating",
        "Mobile device problems: poor battery life, swollen battery, overheating, slow charging, broken screen, cursor drift, liquid damage, no connectivity",
        "Printer problems: faded or streaked prints, ghost images, toner not fused, paper jams, garbled print, stuck print queue, incorrect paper settings",
        "Wired and wireless network problems: intermittent or no connectivity, APIPA address, IP conflicts, slow speeds, high latency and jitter, interference, SSID not found, port flapping",
        "Diagnostic tools: Windows Memory Diagnostic, CrystalDiskInfo, Event Viewer, Device Manager, ping, ipconfig, tracert, nslookup, cable tester and multimeter"
      ],
      "notes": [
        "Objectives 5.1–5.7"
      ],
      "labs": [
        "Pick a real problem on your own PC (or create one, such as disabling the network adapter) and write up all seven methodology steps as you fix it.",
        "Run Windows Memory Diagnostic (`mdsched.exe`), check drive health in CrystalDiskInfo, and look in Event Viewer (System log) for disk, WHEA or unexpected-shutdown errors.",
        "Troubleshoot your network with `ipconfig /all`, `ping` to the gateway and 8.8.8.8, `nslookup` and `tracert`; then force an APIPA address by setting DHCP on a disconnected adapter and explain what you see."
      ]
    }
  ],
  study: {
    "1": [
      [
        "What are the warning signs of a swollen laptop battery, and what should you do?",
        "A bulging touchpad or keyboard, a case that will not close flat, or a battery that no longer sits flush. Power off, stop charging, remove the battery if it is safe to do so and recycle it through an approved battery program."
      ],
      [
        "How do M.2 SATA and M.2 NVMe drives differ?",
        "They share the M.2 form factor, but SATA drives use the SATA bus (about 600 MB/s max) while NVMe drives use PCIe lanes and run several times faster. The slot must support the type you buy."
      ],
      [
        "Compare Bluetooth, NFC and a mobile hotspot.",
        "Bluetooth links nearby accessories over a few meters after pairing. NFC works within a few centimeters for tap-to-pay and quick pairing. A hotspot shares a phone's cellular data with other devices over Wi-Fi, USB or Bluetooth."
      ],
      [
        "What can mobile device management do for a company?",
        "Enroll devices, push Wi-Fi, VPN and email settings, enforce passcodes and encryption, deploy or block apps, and locate, lock or wipe lost devices."
      ],
      [
        "When would you recommend a docking station?",
        "When a laptop user needs to connect monitors, wired network, peripherals and charging at a desk with one cable, usually over USB-C or Thunderbolt."
      ]
    ],
    "2": [
      [
        "List the ports for SSH, DNS, DHCP, HTTPS, SMB and RDP.",
        "SSH 22, DNS 53, DHCP 67/68, HTTPS 443, SMB 445, RDP 3389."
      ],
      [
        "When is UDP used instead of TCP?",
        "When speed matters more than guaranteed delivery and the app can handle loss, such as DNS queries, DHCP, streaming and voice. TCP adds a handshake, acknowledgments and retransmission."
      ],
      [
        "Walk through securing a new SOHO wireless router.",
        "Change the default admin password, update firmware, use WPA3 (or WPA2-AES), set a strong passphrase, disable WPS and unneeded UPnP, set up a guest network, and turn off remote management unless needed."
      ],
      [
        "Explain port forwarding vs a DMZ.",
        "Port forwarding sends traffic on specific ports to one internal host. A DMZ (on SOHO routers) sends all unsolicited inbound traffic to one host, which exposes it far more."
      ],
      [
        "What do SPF, DKIM and DMARC do?",
        "All are published in DNS TXT records. SPF lists allowed sending servers, DKIM signs messages so receivers can check they were not altered, and DMARC tells receivers what to do when checks fail and where to send reports."
      ],
      [
        "Match these tools to their jobs: punchdown tool, crimper, toner probe, loopback plug, Wi-Fi analyzer.",
        "Punchdown seats wires in a 110 block or keystone. A crimper attaches RJ45 plugs. A toner probe traces a cable. A loopback plug tests a port. A Wi-Fi analyzer shows channels, signal strength and interference."
      ]
    ],
    "3": [
      [
        "Describe the seven steps of the laser printing process.",
        "Processing (building the page image), charging the drum, exposing it with a laser, developing with toner, transferring toner to paper, fusing it with heat and pressure, and cleaning the drum."
      ],
      [
        "Compare RAID 0, 1, 5 and 10.",
        "RAID 0 stripes for speed with no redundancy (2+ drives). RAID 1 mirrors (2 drives). RAID 5 stripes with parity and survives one failure (3+ drives). RAID 10 stripes mirrored pairs for speed and redundancy (4+ drives)."
      ],
      [
        "What should you check before adding a graphics card?",
        "A free PCIe x16 slot, physical space in the case, PSU wattage and PCIe power connectors, cooling, and whether the monitor connectors match."
      ],
      [
        "Why won't a DDR4 module fit a DDR5 slot, and what is dual channel?",
        "Each generation has its notch in a different place and different electrical needs. Dual channel means matched modules in paired slots so the memory controller can use two channels at once for more bandwidth."
      ],
      [
        "Which printer type suits each job: receipts, multipart forms, photos, office documents?",
        "Thermal for receipts, impact for multipart forms, inkjet for photos, laser for high-volume office documents."
      ]
    ],
    "4": [
      [
        "Compare Type 1 and Type 2 hypervisors with examples.",
        "Type 1 runs directly on hardware (Hyper-V Server, VMware ESXi, Proxmox) and is used in data centers. Type 2 runs on a host OS (VirtualBox, VMware Workstation) and suits desktops and labs."
      ],
      [
        "What does a PC need to run virtual machines well?",
        "A CPU with virtualization extensions enabled in firmware (VT-x or AMD-V), enough RAM for the host and every guest, enough storage for virtual disks, and suitable virtual networking."
      ],
      [
        "Explain IaaS, PaaS and SaaS by who manages what.",
        "IaaS: the provider runs hardware and virtualization; the customer manages the OS and apps. PaaS: the provider also runs the OS and runtime; the customer manages apps and data. SaaS: the provider runs everything; the customer uses the app."
      ],
      [
        "What are rapid elasticity and metered utilization?",
        "Rapid elasticity is scaling resources up and down quickly with demand. Metered utilization is measuring use so customers pay only for what they consume."
      ]
    ],
    "5": [
      [
        "List the troubleshooting methodology steps in order.",
        "1 Identify the problem (question users, back up data, check recent changes). 2 Establish a theory of probable cause. 3 Test the theory. 4 Establish a plan of action and implement it. 5 Verify full system functionality and add preventive measures. 6 Document findings, actions and outcomes."
      ],
      [
        "A PC powers on with fans spinning but shows nothing on screen. What do you check?",
        "Monitor power, input and cable; beep or POST codes; reseat RAM and the graphics card; try onboard video; check CPU power connectors; then test with known-good parts."
      ],
      [
        "What symptoms point to a failing hard drive or SSD?",
        "Clicking or grinding (HDD), S.M.A.R.T. warnings, reallocated sectors, very slow access, read errors, files that will not open, and boot failures."
      ],
      [
        "How do you troubleshoot a laser printer that smears toner?",
        "Toner that rubs off means it is not being fused. Check the fuser (heat and rollers), confirm paper type settings and replace the fuser or maintenance kit."
      ],
      [
        "A laptop shows a 169.254.x.x address. Walk through fixing it.",
        "It means no DHCP lease. Check the physical or Wi-Fi link, confirm the right SSID and password, run `ipconfig /release` and `/renew`, check the DHCP server or router and whether the scope is full."
      ],
      [
        "What causes wireless drops in one part of an office?",
        "Interference (microwaves, cordless phones, other APs on the same channel), distance and obstacles, or weak coverage. Use a Wi-Fi analyzer, change channels or bands, or add or move access points."
      ]
    ]
  },
  questions: [
    ["ap1",0,1,"A laptop's touchpad has started bulging upward and the lid no longer closes flat. What should the technician do first?",["Power it off, unplug it and remove the swollen battery","Fully discharge and recharge the battery to recalibrate it","Update the touchpad driver and the system firmware","Press the case closed and reseat the touchpad cable"],0,"A bulging touchpad usually means a swelling lithium-ion battery, which is a fire risk; stop charging it and replace it. Recalibrating a swollen battery keeps a dangerous part in service.","Objective 1.1"],
    ["ap2",0,1,"A technician opens an ultrathin laptop to add memory but finds no SODIMM slots. What is the most likely explanation?",["The SODIMM slots sit behind the display panel","The slots stay hidden until enabled in UEFI","The memory is soldered onto the system board","The laptop takes full-size DIMMs under the keyboard"],2,"Many thin laptops use memory soldered to the motherboard, so it cannot be upgraded. Firmware settings never hide physical slots.","Objective 1.1"],
    ["ap3",0,1,"A laptop has an M.2 slot that supports PCIe. Which replacement drive gives the best storage performance?",["An M.2 SATA SSD","A 2.5-inch 7200 RPM hard drive","A 2.5-inch SATA SSD in an adapter","An M.2 NVMe SSD"],3,"NVMe drives use PCIe lanes and are much faster than anything limited to the SATA interface, including M.2 SATA SSDs that look similar.","Objective 1.1"],
    ["ap4",0,1,"After replacing a laptop's Wi-Fi card, the user sees only one weak network even next to the access point. What was most likely missed?",["The new card needs a static IP address","The access point must be rebooted after a card swap","The SSID has to be re-entered in UEFI setup","The antenna leads were not reattached to the card"],3,"Laptop Wi-Fi antennas usually run through the display bezel and clip onto the card; without them the card barely receives. IP settings do not affect signal strength.","Objective 1.1"],
    ["ap5",0,1,"A user wants to pair a new Bluetooth headset with a phone. Bluetooth is already on. What is the next step?",["Put the headset in pairing mode","Tap the headset against the phone's NFC area","Connect the headset to the phone with USB-C","Join the headset to the same Wi-Fi network"],0,"Pairing needs the accessory to be discoverable; then the user selects it on the phone and confirms the PIN or passkey if asked. Wi-Fi plays no part in Bluetooth pairing.","Objective 1.2"],
    ["ap6",0,1,"Which wireless technology lets a phone make a payment when held within a few centimeters of a terminal?",["Bluetooth","Infrared","NFC","Wi-Fi Direct"],2,"Near-field communication works only over a few centimeters, which suits tap-to-pay. Bluetooth works over meters and is not used for contactless card payments.","Objective 1.2"],
    ["ap7",0,1,"A traveling employee needs internet on a laptop at a site with no Wi-Fi. The employee's phone has an unlimited cellular plan. What is the quickest fix?",["Enable NFC on both devices","Pair the laptop and phone for file transfer","Enable the phone's location services","Turn on the phone's mobile hotspot"],3,"A hotspot (tethering) shares the phone's cellular data with the laptop over Wi-Fi, USB or Bluetooth. File transfer pairing does not share an internet connection.","Objective 1.3"],
    ["ap8",0,1,"A company wants to push email settings to staff phones, require a screen lock and remotely wipe a lost device. What should it deploy?",["A site-to-site VPN","Mobile device management","A captive portal on the guest Wi-Fi","A KVM switch in each office"],1,"MDM enrolls devices so IT can push configuration, enforce policies such as passcodes and wipe lost devices. A VPN only protects traffic in transit.","Objective 1.3"],
    ["ap9",0,1,"A user wants a single cable from a laptop to connect two monitors, wired Ethernet, a keyboard and charging. What should the technician recommend?",["A KVM switch","A USB-C or Thunderbolt dock","A PoE injector","A USB 2.0 hub"],1,"A USB-C/Thunderbolt docking station carries video, data, network and power delivery over one cable. A KVM shares one set of peripherals between several computers.","Objective 1.2"],
    ["ap10",0,1,"Which phone component determines location from satellites even when no cellular or Wi-Fi signal is available?",["GPS receiver","Gyroscope","NFC controller","Digitizer"],0,"The GPS (GNSS) receiver calculates position from satellite signals. A gyroscope only measures rotation and orientation.","Objective 1.3"],
    ["ap11",0,1,"A tablet's display shows a clear picture, but taps in the lower third of the screen are ignored. Which part most likely needs replacing?",["The digitizer","The LCD backlight","The display inverter","The graphics processor"],0,"The digitizer is the touch layer; a damaged one ignores touch while the image stays fine. A backlight fault would dim the picture, not block touch.","Objective 1.1"],
    ["ap12",0,1,"A graphic designer wants to draw with pressure sensitivity on a laptop that has no touchscreen. Which accessory fits?",["A webcam","A drawing pad","A trackpoint","A barcode scanner"],1,"A drawing pad (graphics tablet) with a stylus lets the user draw with pressure sensitivity on any laptop. A trackpoint only moves the pointer.","Objective 1.2"],
    ["ap13",0,2,"A help desk needs to connect to users' Windows desktops with Remote Desktop through an internal firewall. Which port must be open?",["TCP 3389","TCP 22","TCP 445","UDP 3390"],0,"RDP listens on TCP 3389. Port 22 is SSH, which Windows Remote Desktop does not use.","Objective 2.1"],
    ["ap14",0,2,"Users can reach a website by its IP address but not by its name. Traffic on which port is most likely being blocked?",["80","25","53","110"],2,"Name resolution uses DNS on port 53 (UDP and TCP). Port 80 carries HTTP, which works here because the site loads by IP.","Objective 2.1"],
    ["ap15",0,2,"Which statement best describes UDP?",["Connectionless, with no delivery guarantee","Connection-oriented, with a three-way handshake","Resends lost segments and reorders them","Used only for secure web traffic"],0,"UDP sends datagrams without a handshake or acknowledgments, which suits DNS queries, DHCP and streaming. The handshake and retransmission belong to TCP.","Objective 2.1"],
    ["ap16",0,2,"A technician is troubleshooting Windows file shares that fail to open across the office. Which port does SMB use directly?",["TCP 389","TCP 445","UDP 161","TCP 143"],1,"Modern SMB runs directly over TCP 445. Port 389 is LDAP, which is used for directory lookups, not file sharing.","Objective 2.1"],
    ["ap17",0,2,"Which protocol and port do mail servers use to send email to other mail servers?",["IMAP on port 143","POP3 on port 110","SMTP on port 25","LDAP on port 389"],2,"SMTP (port 25) transfers mail between servers. IMAP and POP3 are used by clients to retrieve mail from their own server.","Objective 2.1"],
    ["ap18",0,2,"A small office replaces an old hub with a device that learns MAC addresses and forwards frames only to the destination port. What was installed?",["A repeater","A modem","A switch","A patch panel"],2,"A switch keeps a MAC address table and forwards frames only where they need to go. A hub or repeater sends every frame out every port.","Objective 2.2"],
    ["ap19",0,2,"New IP cameras must be mounted on a warehouse ceiling where there are no power outlets. Which switch feature should be used?",["Power over Ethernet","Port mirroring","Link aggregation","Jumbo frames"],0,"PoE carries power and data over the same twisted-pair cable to cameras, phones and access points. Port mirroring only copies traffic for analysis.","Objective 2.2"],
    ["ap20",0,2,"A technician is setting up a 2.4 GHz network for an office with three access points. Which channels avoid overlap?",["1, 6 and 11","1, 2 and 3","3, 7 and 9","4, 8 and 12"],0,"In the 2.4 GHz band only channels 1, 6 and 11 do not overlap in North America. Neighboring channel numbers share most of their frequencies.","Objective 2.3"],
    ["ap21",0,2,"Which Wi-Fi generation matches the IEEE 802.11ax standard?",["Wi-Fi 6","Wi-Fi 4","Wi-Fi 5","Wi-Fi 3"],0,"802.11ax is Wi-Fi 6 (and Wi-Fi 6E when it uses 6 GHz). 802.11ac is Wi-Fi 5 and 802.11n is Wi-Fi 4.","Objective 2.3"],
    ["ap22",0,2,"A home office owner wants the strongest security available on a new wireless router that all devices support. What should be chosen?",["WEP with a long key","WPA with TKIP","WPA3-Personal","An open network with MAC filtering"],2,"WPA3-Personal uses SAE, which resists offline password guessing. WEP and TKIP are broken, and MAC filtering is easy to bypass.","Objective 2.5"],
    ["ap23",0,2,"A company wants employees to log in to Wi-Fi with their own domain credentials instead of a shared passphrase. Which server does the access point need to use?",["A syslog server","A RADIUS server","A proxy server","A DHCP server"],1,"WPA2/WPA3-Enterprise hands authentication to a RADIUS (AAA) server that checks each user's credentials. A DHCP server only hands out addresses.","Objective 2.4"],
    ["ap24",0,2,"A network printer's address keeps changing, which breaks users' print mappings. What is the best fix on a SOHO router?",["Shorten the DHCP lease time","Enable UPnP on the router","Turn on the router's DMZ","Create a DHCP reservation for its MAC"],3,"A reservation always gives the printer the same address while keeping central management. Shorter leases would make the address change even more often.","Objective 2.6"],
    ["ap25",0,2,"A user hosts a game server on a home PC and friends cannot connect from the internet. What should be configured on the SOHO router?",["A new SSID on the 5 GHz band","Port forwarding to the PC's private IP","MAC filtering for the PC","A static DNS entry for the router"],1,"Port forwarding sends incoming traffic on a given port through NAT to one internal host. A new SSID does nothing for inbound internet traffic.","Objective 2.5"],
    ["ap26",0,2,"Which address is a private IPv4 address that will not be routed on the public internet?",["172.34.1.10","172.20.5.4","11.0.0.5","193.168.1.20"],1,"Private ranges are 10.0.0.0/8, 172.16.0.0–172.31.255.255 and 192.168.0.0/16. 172.34.1.10 is outside 172.16–31, so it is public.","Objective 2.6"],
    ["ap27",0,2,"A mail administrator wants to publish which servers may send email for the company's domain so receivers can reject forged mail. Which DNS record holds this?",["An MX record","A CNAME record","An AAAA record","A TXT record containing SPF"],3,"SPF is published in a TXT record and lists allowed sending servers; DKIM and DMARC also use TXT records. MX records only say where to deliver incoming mail.","Objective 2.6"],
    ["ap28",0,2,"A company wants guest devices and accounting PCs on the same physical switches but kept on separate networks. What should be configured?",["VLANs","A VPN","A proxy server","NAT"],0,"VLANs split one switch into separate broadcast domains so traffic stays apart unless routed. A VPN encrypts traffic over untrusted networks instead.","Objective 2.6"],
    ["ap29",0,2,"A remote cabin can only get geostationary satellite internet. Which issue should the owner expect most?",["High latency for video calls and gaming","No support for web browsing","Frequent DHCP address conflicts","Crosstalk on the indoor cabling"],0,"Signals must travel to a satellite about 36,000 km up and back, adding hundreds of milliseconds of delay. Browsing still works, just with lag.","Objective 2.7"],
    ["ap30",0,2,"A user connects wireless earbuds and a smartwatch to a phone. Which network type do these devices form?",["LAN","PAN","MAN","SAN"],1,"A personal area network links devices a few meters from one person, usually over Bluetooth. A SAN is dedicated storage networking.","Objective 2.7"],
    ["ap31",0,2,"A technician is terminating new Cat 6 runs onto a 110 block in the wiring closet. Which tool is needed?",["A punchdown tool","An RJ45 crimping tool","A loopback plug","A toner probe"],0,"A punchdown tool seats wires into 110 or Krone blocks and trims them. A crimper is for attaching RJ45 plugs to patch cables.","Objective 2.8"],
    ["ap32",0,2,"In a closet full of unlabeled cables, a technician must find which one runs to office 214's wall jack. Which tool helps most?",["A Wi-Fi analyzer","A digital multimeter","A cable stripper","A toner and probe"],3,"The toner puts a signal on the cable at the jack, and the probe finds that cable at the closet end. A Wi-Fi analyzer only examines wireless signals.","Objective 2.8"],
    ["ap33",0,2,"A small business wants all web traffic from staff PCs to pass through a server that caches pages and filters blocked sites. Which device fits?",["A load balancer","A DNS server","A syslog server","A proxy server"],3,"A proxy makes requests on clients' behalf and can cache content and filter URLs. A load balancer spreads incoming traffic across several servers.","Objective 2.4"],
    ["ap34",0,3,"A photo editor wants the most accurate colors and wide viewing angles on a budget LCD monitor. Which panel type should be chosen?",["TN","VA","IPS","CCFL-backlit TN"],2,"IPS panels give the best color accuracy and viewing angles among LCD types. TN panels are fast but shift color at an angle.","Objective 3.1"],
    ["ap35",0,3,"A gamer notices motion blur and wants smoother animation. Which monitor specification matters most?",["A higher contrast ratio","A wider color gamut","A higher refresh rate","A larger screen size"],2,"A higher refresh rate (144 Hz or more) draws more frames per second, which smooths motion. Contrast ratio affects blacks and whites, not smoothness.","Objective 3.1"],
    ["ap36",0,3,"A technician is installing a new SATA SSD in a desktop. Which two cables are needed?",["A Molex cable and an eSATA cable","A SATA data cable and a SATA power cable","An M.2 ribbon and a 4-pin fan cable","A USB header cable and a 24-pin cable"],1,"SATA drives take a 7-pin data cable from the motherboard and a 15-pin SATA power connector from the PSU. Molex is an older 4-pin power connector.","Objective 3.2"],
    ["ap37",0,3,"Cable must run through the drop-ceiling air return space of an office building. Which cable jacket is required?",["Plenum-rated","PVC riser-rated","Direct-burial","Outdoor UV-rated"],0,"Air-handling spaces need plenum-rated jackets, which give off less toxic smoke when burning. Riser-rated cable is for vertical runs between floors.","Objective 3.2"],
    ["ap38",0,3,"What is the maximum recommended length of a Cat 6 run carrying Ethernet between a switch and a device?",["100 meters","50 meters","185 meters","500 meters"],0,"Twisted-pair Ethernet segments are limited to 100 meters. 185 m and 500 m were limits for old coax Ethernet.","Objective 3.2"],
    ["ap39",0,3,"A user wants to connect a monitor using a cable that carries both video and audio and is common on TVs. Which connector fits?",["VGA","DVI-D","HDMI","PS/2"],2,"HDMI carries digital video and audio and is standard on TVs and monitors. DVI-D carries digital video only, and VGA is analog video only.","Objective 3.2"],
    ["ap40",0,3,"A technician tries to install a DDR4 module into a DDR5 motherboard slot, and it will not seat. Why?",["DDR5 slots need a BIOS update first","The module must be installed at an angle","The CPU is not seated correctly","The notch is in a different place"],3,"Each DDR generation has its notch in a different place so incompatible modules cannot be inserted. The generations are not electrically compatible either.","Objective 3.3"],
    ["ap41",0,3,"A desktop has four memory slots and two matching modules. Following the motherboard manual, where should they go for best performance?",["Both side by side in slots 1 and 2","In any slots, since placement has no effect","In slots 3 and 4, leaving 1 and 2 empty for cooling","In matching-colored slots for dual channel"],3,"Installing matched modules in the paired slots (often color-coded) enables dual-channel mode, which doubles memory bandwidth.","Objective 3.3"],
    ["ap42",0,3,"A server needs memory that can detect and correct single-bit errors. Which type should be ordered?",["SODIMM","ECC","Non-parity DDR4","Virtual RAM"],1,"Error-correcting code memory detects and fixes single-bit errors, which matters for servers. SODIMM describes a laptop form factor, not error correction.","Objective 3.3"],
    ["ap43",0,3,"A small office wants a RAID array that survives a single drive failure and uses capacity efficiently. It has four drives. Which RAID level fits best?",["RAID 5","RAID 0","RAID 1","Spanned volume"],0,"RAID 5 stripes data with parity across three or more drives and survives one failure while losing only one drive's worth of capacity. RAID 0 has no redundancy.","Objective 3.4"],
    ["ap44",0,3,"What is the minimum number of drives needed for RAID 10?",["Two","Three","Four","Five"],2,"RAID 10 is a stripe of mirrors, so it needs at least two mirrored pairs, or four drives. RAID 1 needs two and RAID 5 needs three.","Objective 3.4"],
    ["ap45",0,3,"A user wants to run Windows 11, which requires a TPM and Secure Boot. Where should the technician check that both are enabled?",["In Device Manager under Disk drives","In the router's admin page","In the UEFI firmware setup","In the PSU's voltage switch"],2,"TPM (often called PTT or fTPM) and Secure Boot are turned on in UEFI firmware settings. Device Manager cannot enable firmware features.","Objective 3.5"],
    ["ap46",0,3,"A technician builds a small living-room PC and must choose the smallest common motherboard form factor. Which one fits?",["ATX","Mini-ITX","microATX","Extended ATX"],1,"Mini-ITX boards are 17 x 17 cm, smaller than microATX and ATX. Extended ATX is the largest and suits workstations.","Objective 3.5"],
    ["ap47",0,3,"After installing a new CPU cooler, a desktop shuts down within minutes under load. The technician finds the old thermal paste was cleaned off. What was most likely missed?",["Applying new thermal paste","Updating the chipset driver","Setting the RAM to dual channel","Enabling the TPM in firmware"],0,"Thermal paste fills tiny gaps between the CPU and heat sink; without it the CPU overheats and shuts down. Drivers do not affect heat transfer.","Objective 3.5"],
    ["ap48",0,3,"A user plans to add a high-end graphics card to a desktop. Which item must the technician check before buying?",["That the case has a front-panel USB-C port","That the network adapter supports Wi-Fi 6","That the monitor uses a VGA connector","That the PSU has enough wattage and power connectors"],3,"Powerful GPUs draw a lot of current and need PCIe power connectors, so the PSU must have the capacity and cables. Front-panel ports do not matter.","Objective 3.6"],
    ["ap49",0,3,"A server has two power supplies connected to separate circuits. What is the main benefit?",["It doubles the available wattage for the CPU","It converts DC back to AC for the UPS","It keeps running if one supply fails","It lets the server use 3.3 V fans"],2,"Redundant PSUs let the system keep running when one supply or circuit fails. They share the load for resilience, not to double the power budget.","Objective 3.6"],
    ["ap50",0,3,"Which voltages does a standard ATX power supply provide to components?",["1.5 V, 9 V and 24 V","5 V, 48 V and 120 V","12 V, 110 V and 220 V","3.3 V, 5 V and 12 V"],3,"ATX supplies deliver 3.3, 5 and 12 V DC rails. 110/220 V is AC input from the wall, not output to components.","Objective 3.6"],
    ["ap51",0,3,"A laser printer prints a page. Which step comes right after the image is transferred to the paper?",["Exposing","Charging","Developing","Fusing"],3,"The order is processing, charging, exposing, developing, transferring, fusing and cleaning. Fusing melts toner onto the paper after transfer.","Objective 3.7"],
    ["ap52",0,3,"A shipping desk prints receipts on heat-sensitive paper with no ink or toner. Which printer type is this?",["Impact","Inkjet","Color laser","Thermal"],3,"Thermal printers heat special paper to create the image. Impact printers strike an inked ribbon, which suits multipart forms.","Objective 3.7"],
    ["ap53",0,3,"An office must print carbon-copy multipart invoices. Which printer type is required?",["Thermal","Inkjet","Impact","3-D"],2,"Only an impact (dot-matrix) printer physically strikes the page hard enough to mark all copies of a multipart form.","Objective 3.7"],
    ["ap54",0,3,"A laser printer shows a 'replace maintenance kit' message after 200,000 pages. Which parts does the kit usually contain?",["Fuser assembly and rollers","Toner cartridge and drum","Ink cartridges and printhead","Ribbon and platen"],0,"Laser maintenance kits usually contain a fuser, pickup and feed rollers and separation pads. Toner is replaced separately and more often.","Objective 3.8"],
    ["ap55",0,3,"Users want a shared office printer to print on both sides by default to save paper. Where should the technician set this?",["The duplex setting in the printer's properties","The paper orientation in the application","The collate option in the print dialog","The printer's IP address settings"],0,"Setting duplex as the default in the printer's properties or on the device applies it to every job. Collation only orders multiple copies.","Objective 3.7"],
    ["ap56",0,4,"A technician installs a hypervisor directly on bare-metal server hardware with no host operating system. What type is it?",["Type 2","Type 1","Container runtime","Emulator"],1,"A Type 1 hypervisor runs directly on the hardware. A Type 2 hypervisor such as VirtualBox runs as an app on a host OS.","Objective 4.1"],
    ["ap57",0,4,"VirtualBox refuses to start a 64-bit virtual machine, saying hardware virtualization is unavailable. What should the technician check first?",["That the VM has a second virtual NIC","That VT-x or AMD-V is enabled in UEFI","That the host has a dedicated GPU","That the guest has Secure Boot disabled"],1,"64-bit guests need CPU virtualization extensions, which are often turned off in firmware. The number of virtual NICs has nothing to do with this error.","Objective 4.1"],
    ["ap58",0,4,"An analyst wants to open a suspicious file without risking the company network. Which use of virtualization fits best?",["A VM bridged to the production LAN","A sandbox VM with no network","A container that shares the host's files","A cloud VM with a public IP address"],1,"An isolated sandbox VM contains any damage and can be reverted from a snapshot. Bridging it to the LAN would expose other systems.","Objective 4.1"],
    ["ap59",0,4,"How do containers differ from virtual machines?",["They each include a full guest OS","They require a Type 1 hypervisor","They share the host's OS kernel","They cannot run on Linux"],2,"Containers package an app and its dependencies but share the host kernel, so they are lighter than VMs, which each run a full OS.","Objective 4.1"],
    ["ap60",0,4,"A company runs a 1990s accounting app that only works on an old OS. How can it keep using the app on new hardware?",["Run the old OS in a virtual machine","Install the app directly on Windows 11","Move the app to a SaaS email platform","Replace the PSU with a legacy model"],0,"Virtualization lets legacy operating systems and apps run on modern hardware in an isolated VM. Newer operating systems may not run the old app.","Objective 4.1"],
    ["ap61",0,4,"A business rents virtual servers from a provider and manages the OS, patches and applications itself. Which cloud service model is this?",["SaaS","PaaS","IaaS","DaaS"],2,"With IaaS the provider supplies compute, storage and networking, and the customer manages everything from the OS up. With SaaS the customer only uses the app.","Objective 4.2"],
    ["ap62",0,4,"A retailer's cloud web servers add capacity automatically during holiday sales and scale back afterward. Which cloud characteristic is this?",["Multitenancy","Rapid elasticity","Shared responsibility","File synchronization"],1,"Rapid elasticity means resources scale out and in quickly with demand. Multitenancy means many customers share the provider's infrastructure.","Objective 4.2"],
    ["ap63",0,4,"A company keeps sensitive databases in its own data center but runs its public website on a cloud provider, with the two connected. Which deployment model is this?",["Community cloud","Private cloud","Hybrid cloud","Public cloud"],2,"A hybrid cloud combines private and public clouds that work together. A community cloud is shared by organizations with common needs.","Objective 4.2"],
    ["ap64",0,4,"A company pays its cloud provider only for the compute hours and storage it actually uses each month. Which characteristic does this describe?",["High availability","Metered utilization","Rapid elasticity","Shared responsibility"],1,"Metered (measured) utilization tracks consumption so customers pay as they go. Rapid elasticity is about scaling, not billing.","Objective 4.2"],
    ["ap65",0,4,"Employees log in to desktops that run on central servers and stream to thin clients. What is this called?",["NAS","SDN","KVM","VDI"],3,"Virtual desktop infrastructure hosts desktop VMs centrally and streams them to clients. A NAS provides file storage.","Objective 4.1"],
    ["ap66",0,5,"A technician has identified a problem and questioned the user. What is the next step in the CompTIA troubleshooting methodology?",["Implement the solution","Document findings and outcomes","Establish a theory of probable cause","Verify full system functionality"],2,"The order is identify, theorize, test the theory, plan, implement, verify, document. Implementing comes only after the theory is tested and a plan is made.","Objective 5.1"],
    ["ap67",0,5,"Before replacing a failing drive in a user's PC, what should the technician do as part of identifying the problem?",["Back up the user's data if possible","Order a replacement motherboard","Document lessons learned","Escalate to the vendor"],0,"Identifying the problem includes making backups before changes and asking about recent changes. Documentation comes at the end of the process.","Objective 5.1"],
    ["ap68",0,5,"A technician's theory about a failing network card turns out to be wrong after testing. What should happen next?",["Implement the original fix anyway","Establish a new theory or escalate","Document the problem as resolved","Verify full system functionality"],1,"If the theory is not confirmed, re-establish a new theory or escalate. Applying an unproven fix wastes time and may cause new problems.","Objective 5.1"],
    ["ap69",0,5,"A desktop's date and time reset to a default each time it is unplugged. What is the most likely cause?",["A dead CMOS battery","A failing hard drive","An outdated graphics driver","A loose SATA cable"],0,"The CMOS/RTC battery keeps the clock and firmware settings alive without AC power. A weak one loses them every time power is removed.","Objective 5.2"],
    ["ap70",0,5,"A PC powers on and its fans spin, but there is no display and the motherboard beeps in a repeating pattern. What should the technician check first?",["The Windows Event Viewer logs","The monitor's color calibration","The keyboard layout settings","The POST code meaning in the board manual"],3,"Beep codes come from POST before the OS loads, and the manual maps each pattern to a fault such as memory or video. Windows logs do not exist yet.","Objective 5.2"],
    ["ap71",0,5,"A workstation randomly shows blue screens with different stop codes, and a new memory module was installed last week. What should the technician run?",["A disk defragmenter","A DNS cache flush","A printer test page","A memory diagnostic"],3,"Random stop errors after a memory change suggest faulty or incompatible RAM; Windows Memory Diagnostic or MemTest86 will test it.","Objective 5.2"],
    ["ap72",0,5,"A technician smells burning and finds swollen, leaking capacitors on a motherboard. What is the right action?",["Update the BIOS and retest","Reseat the RAM modules","Replace the motherboard","Apply new thermal paste"],2,"Bulging or leaking capacitors are a physical failure that firmware updates cannot fix; the board should be replaced.","Objective 5.2"],
    ["ap73",0,5,"A PC shuts off after about 20 minutes of gaming, and the case feels very hot. Which cause should the technician check first?",["A wrong DNS server address","Clogged fans or dust buildup","A corrupted user profile","A full print queue"],1,"Heat-related shutdowns point to cooling problems such as dust, failed fans or dried thermal paste. DNS and profiles do not cause sudden power-offs.","Objective 5.2"],
    ["ap74",0,5,"A hard drive makes a loud clicking noise and the system has become very slow. What should the technician do?",["Defragment the drive to fix the noise","Increase the page file size","Disable S.M.A.R.T. alerts in firmware","Back up the data and replace the drive"],3,"Clicking often means a failing read/write head; save the data while possible and replace the drive. Defragmenting stresses a failing drive.","Objective 5.3"],
    ["ap75",0,5,"A PC shows 'Bootable device not found' after a technician added a second drive. What is the most likely fix?",["Replace the power supply unit in the PC","Correct the boot order in UEFI","Update the video driver","Reset the router"],1,"Adding a drive can change the boot order so firmware tries the new, empty disk first. The PSU is working if the PC reaches this message.","Objective 5.3"],
    ["ap76",0,5,"A RAID 1 array reports a 'degraded' status in the management utility. What does this mean?",["One member drive has failed or dropped out","The array is rebuilding faster than normal","All data on the array is already lost","The array was converted to RAID 0"],0,"Degraded means the array is running without full redundancy; replace the failed drive and let it rebuild before a second drive fails.","Objective 5.3"],
    ["ap77",0,5,"CrystalDiskInfo shows a caution status with a rising reallocated sector count on a laptop drive. What does this indicate?",["The drive needs to be defragmented","The file system is FAT32 instead of NTFS","The drive's firmware is too new","The drive is failing and should be replaced soon"],3,"S.M.A.R.T. reallocated sectors mean the drive is remapping bad areas, a warning of coming failure. Back up and plan a replacement.","Objective 5.3"],
    ["ap78",0,5,"A laptop display is very dim, but shining a flashlight on it shows the image faintly. Which component is most likely faulty?",["The digitizer","The backlight","The GPU driver","The Wi-Fi antenna"],1,"A faint image under a flashlight shows the LCD is drawing the picture but not being lit, which points to the backlight or its power.","Objective 5.4"],
    ["ap79",0,5,"A new monitor shows text that looks fuzzy, and the image seems stretched. What should the technician check first?",["That the monitor has dead pixels","That the refresh rate is set to its minimum","That the resolution matches the native resolution","That the cable is plenum-rated"],2,"LCDs look sharp only at their native resolution; other settings are scaled and blurry. Dead pixels appear as fixed dots, not blur.","Objective 5.4"],
    ["ap80",0,5,"A projector keeps shutting down after 30 minutes in a conference room. Its lamp is new. What should the technician check?",["The HDMI cable for bent pins","The laptop's screen resolution","The projector's keystone setting","The air filter and vents for blockage"],3,"Projectors overheat and shut down when filters or vents are clogged. Keystone only corrects image shape.","Objective 5.4"],
    ["ap81",0,5,"A phone takes hours to charge and only charges when the cable is held at an angle. What should the technician check first?",["The phone's screen brightness","The Wi-Fi calling setting","The phone's storage space","The charging port for lint"],3,"Lint packed into the port stops the plug from seating fully. Cleaning it carefully often fixes charging without replacing the port.","Objective 5.5"],
    ["ap82",0,5,"A smartphone has become hot to the touch and its battery drains quickly, even while idle. What should the technician check first?",["Apps using high background CPU","The installed case and screen protector","The ringtone volume level","The SIM card's PIN"],0,"Runaway apps keep the processor busy, which drains the battery and makes heat. Check battery usage by app and close or update the culprit.","Objective 5.5"],
    ["ap83",0,5,"A laptop's mouse pointer drifts across the screen on its own when nobody is touching it. What is a likely cause?",["A failed CMOS battery","Contamination on the touchpad","An incorrect DNS server","A wrong display refresh rate"],1,"Moisture, dirt or a swelling battery pressing on the touchpad can cause cursor drift. Clean the pad, check touchpad settings and inspect the battery.","Objective 5.5"],
    ["ap84",0,5,"Laser-printed pages come out with toner that smears or rubs off easily. Which component is most likely failing?",["The pickup roller","The transfer belt's cleaning blade","The fuser","The network interface"],2,"The fuser uses heat and pressure to bond toner; if it fails, toner is not melted onto the page and smears. Pickup rollers only feed paper.","Objective 5.6"],
    ["ap85",0,5,"Every page from a laser printer shows a faint copy of an earlier image lower on the page. What is this called and what is the usual cause?",["Garbled print from a wrong driver","Ghosting from a worn drum or cleaning","Paper jams from worn feed rollers","Faded print from low toner"],1,"Ghost images come from the drum not being cleaned or discharged properly, often a worn drum or cleaning blade. Garbled text points to drivers.","Objective 5.6"],
    ["ap86",0,5,"Users' print jobs stay stuck in the Windows print queue and new jobs pile up behind them. What should the technician try first?",["Replace the printer's fuser","Clear the queue and restart the spooler","Install a new toner cartridge","Change the paper tray settings"],1,"Stopping the Print Spooler service, clearing the stuck jobs and restarting it often releases a jammed queue. Hardware parts are not the cause.","Objective 5.6"],
    ["ap87",0,5,"A printer prints pages full of random symbols after being replaced with a different model. What is the most likely cause?",["The toner is low","The fuser is overheating","The old model's driver is still in use","The printer's pickup rollers are dirty"],2,"Garbled output usually comes from a wrong or corrupt driver that sends the wrong page description language. Low toner causes faded print.","Objective 5.6"],
    ["ap88",0,5,"A laptop reports 'No internet' and ipconfig shows 169.254.33.10. What does this address indicate?",["The PC has a valid public address","DNS resolution is working normally","The gateway is a Linux server","The PC could not get a DHCP lease"],3,"169.254.x.x is an APIPA address, assigned when no DHCP server responds. Check the cable or Wi-Fi link, the DHCP server and the scope.","Objective 5.7"],
    ["ap89",0,5,"Wi-Fi in an office kitchen drops every time the microwave runs. What is the best fix?",["Lower the router's DHCP lease time","Change the DNS server to a public one","Switch the SSID to hidden","Move clients to the 5 GHz band"],3,"Microwave ovens radiate around 2.4 GHz and interfere with that band. The 5 GHz band avoids this interference.","Objective 5.7"],
    ["ap90",0,5,"A user's wired connection works but is much slower than expected, and the NIC shows it linked at 100 Mbps on a gigabit switch. What should the technician check first?",["The user's browser extensions","The DNS suffix search list","The patch cable for a damaged pair","The printer's IP address"],2,"Gigabit Ethernet needs all four pairs; a damaged pair often forces the link down to 100 Mbps. Test or replace the patch cable.","Objective 5.7"]
  ]
});
