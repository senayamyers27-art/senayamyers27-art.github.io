/* CWNP CWNA (CWNA-109) — generated plan (no hand-written weeks). */
CertHub.register({
  id: "cwna",
  vendor: "CWNP",
  name: "CWNP Certified Wireless Network Administrator",
  short: "CWNA",
  exam: "CWNA-109",
  blurb: "Vendor-neutral enterprise Wi-Fi certification covering RF, 802.11 standards and protocols, WLAN design, security and site surveys, for network staff who build and support wireless networks.",
  status: "check",
  statusNote: "cwnp.com could not be opened from this environment on Sept 24, 2026, so the official page was not read directly. Domains and weights (15/20/20/15/10/20) are taken from CWNP's CWNA-109 objectives PDF (January 2023) as indexed by search. Exam length, time and pass mark are CWNP's long-standing CWNA figures and need confirming. CWNA-110 is reported to have launched in September 2026 with different objectives; check which version you will sit.",
  lastVerified: "2026-09-24",
  notices: [
    { from: "2026-09-01", until: "2026-12-31", text: "CWNA-110 is reported to be launching in September 2026, with CWNA-109 available until December 31, 2026. This plan follows CWNA-109. If you will test in 2027 or choose CWNA-110, compare its objectives on cwnp.com first." }
  ],
  examInfo: { questions: "60 multiple choice", minutes: 90, pass: "70% (72% for CWNP instructor candidates)" },
  examSim: { questions: 60, minutes: 90 },
  sources: [
    { label: "CWNP CWNA certification page", url: "https://www.cwnp.com/certifications/cwna" },
    { label: "CWNA-109 exam objectives (PDF)", url: "https://www.cwnp.com/uploads/cwna-109-objectives-2023.pdf" }
  ],
  planWeeks: 10,
  hoursPerWeek: "6–8",

  domains: [
    {
      id: 1,
      name: "Radio frequency (RF) technologies",
      w: 15,
      topics: [
        "RF wave characteristics: wavelength, frequency, amplitude and phase, and how wavelength shrinks as frequency rises",
        "RF behaviors: reflection, refraction, diffraction, scattering, absorption, free space path loss and multipath",
        "RF math: mW and dBm conversion, the rule of 10s and 3s, dB gain and loss, dBi vs dBd",
        "Signal metrics: RSSI, noise floor, SNR, receive sensitivity and fade margin",
        "Link budgets and EIRP: transmitter power, cable and connector loss, antenna gain",
        "Antenna types: omnidirectional, semi-directional (patch, panel, Yagi, sector) and highly directional (parabolic dish)",
        "Antenna characteristics: gain, beamwidth, polarization, azimuth and elevation charts",
        "Point-to-point links: visual vs RF line of sight, the Fresnel zone and earth bulge",
        "MIMO radios: radio chains, spatial streams, transmit beamforming, MU-MIMO",
        "Modulation and coding basics: DSSS, OFDM, OFDMA, BPSK through QAM, and MCS indexes"
      ],
      notes: ["CWNA-109 Domain 1: Radio Frequency (RF) Technologies"],
      labs: [
        "Build an RF math sheet: convert 1, 10, 25, 50, 100 and 200 mW to dBm with the rule of 10s and 3s, then check each answer with a spreadsheet using 10*log10(mW).",
        "On your own laptop, run `netsh wlan show interfaces` (Windows) or `iw dev wlan0 link` (Linux) and record signal while you walk away from your home AP through walls, a doorway and a kitchen, noting which RF behavior explains each drop.",
        "Use a free Wi-Fi analyzer app on your own phone to log your home AP's RSSI in the same spot with the phone held vertically, then horizontally, and in your hand vs on a table, and explain the differences (polarization, absorption)."
      ]
    },
    {
      id: 2,
      name: "WLAN regulations and standards",
      w: 20,
      topics: [
        "Roles of the IEEE, Wi-Fi Alliance, IETF and national regulators such as the FCC",
        "Wi-Fi Alliance certifications and generation names: Wi-Fi 4, 5, 6, 6E and 7",
        "802.11 PHYs: DSSS/HR-DSSS (b), OFDM (a), ERP (g), HT (n), VHT (ac), HE (ax)",
        "2.4 GHz channels, channel overlap and the 1/6/11 plan",
        "5 GHz U-NII bands, 20/40/80/160 MHz channel bonding and channel numbering",
        "6 GHz operation: WPA3 or Enhanced Open requirement and preferred scanning channels",
        "DFS and TPC requirements in 5 GHz radar bands",
        "802.11ax features: OFDMA resource units, 1024-QAM, BSS coloring, Target Wake Time, uplink MU-MIMO",
        "Roaming and management amendments: 802.11k, 802.11r, 802.11v and 802.11w",
        "Regulatory power limits, EIRP rules and why they vary by country"
      ],
      notes: ["CWNA-109 Domain 2: WLAN Regulations and Standards"],
      labs: [
        "On your own AP or home router admin page, list which 2.4, 5 and 6 GHz channels and widths it offers for your country setting, and mark which 5 GHz channels are DFS.",
        "Use `netsh wlan show networks mode=bssid` (Windows) or `sudo iw dev wlan0 scan` (Linux) to list nearby BSSIDs, then classify each by band, channel, width and PHY (HT, VHT, HE) from the output.",
        "Make a one-page table matching 802.11 amendments (a, b, g, n, ac, ax, e, k, r, v, w) to their Wi-Fi generation name, band and main feature, then quiz yourself from memory."
      ]
    },
    {
      id: 3,
      name: "WLAN protocols and devices",
      w: 20,
      topics: [
        "802.11 frame types: management, control and data, and common subtypes (beacon, probe, auth, assoc, ACK, RTS/CTS, null data)",
        "Frame addressing: BSSID, SSID/ESSID, source, destination, transmitter and receiver addresses",
        "Joining a BSS: passive and active scanning, open system authentication, association and the 4-way handshake",
        "Medium access: CSMA/CA, DCF, physical carrier sense (CCA) and virtual carrier sense (NAV)",
        "Interframe spaces (SIFS, DIFS, AIFS), random backoff and contention windows",
        "QoS with WMM/EDCA access categories: voice, video, best effort and background",
        "Protection mechanisms: RTS/CTS and CTS-to-self",
        "Power management: power save bit, TIM, DTIM, U-APSD and Target Wake Time",
        "Aggregation and Block Ack; frame control flags such as Retry",
        "Client-driven roaming, reassociation and 802.11k/v assistance",
        "AP types and devices: autonomous, controller-managed, cloud-managed, mesh and bridges; PoE standards"
      ],
      notes: ["CWNA-109 Domain 3: WLAN Protocols and Devices"],
      labs: [
        "Open one of the free 802.11 sample captures from the Wireshark wiki and filter `wlan.fc.type == 0`, `== 1` and `== 2` to count management, control and data frames; label one beacon's fields.",
        "Using a Linux laptop whose adapter supports monitor mode, capture your own phone joining your own home SSID and find the probe, authentication, association and four EAPOL-Key frames in order.",
        "In the same capture, filter `wlan.fc.retry == 1` and compare the retry count with the phone next to the AP and then two rooms away."
      ]
    },
    {
      id: 4,
      name: "WLAN network architecture and design concepts",
      w: 15,
      topics: [
        "Management, control and data planes and where each lives in autonomous, controller-based, cloud-managed and distributed designs",
        "Centralized (tunneled) vs local (distributed) data forwarding",
        "Gathering requirements: client types and capabilities, applications, density, coverage areas and constraints",
        "Coverage vs capacity design, cell sizing and airtime",
        "Channel reuse plans, co-channel contention and channel width choices",
        "Design targets for voice and real-time apps: signal, SNR, secondary coverage",
        "High-density design: more APs at lower power, directional antennas, 5 and 6 GHz",
        "SSID and VLAN design, 802.1Q trunks to APs, SSID overhead",
        "Data rate settings, band steering and load balancing",
        "PoE planning: 802.3af, 802.3at and 802.3bt power budgets"
      ],
      notes: ["CWNA-109 Domain 4: WLAN Network Architecture and Design Concepts"],
      labs: [
        "Draw your home or small office floor plan to scale in draw.io, mark wall materials, and propose AP locations, channels and power for both coverage and a 20-person meeting room.",
        "On your own AP (or a free OpenWrt image if your router supports it), create two SSIDs mapped to two VLANs and confirm on a client which subnet each SSID hands out.",
        "Write a requirements worksheet for a fictional clinic: list client devices with their bands and spatial streams, applications and their latency needs, and turn each into a design decision."
      ]
    },
    {
      id: 5,
      name: "WLAN network security",
      w: 10,
      topics: [
        "Legacy weaknesses: WEP, TKIP, shared key authentication, SSID hiding and MAC filtering",
        "WPA2 and WPA3 Personal and Enterprise; CCMP/AES and GCMP",
        "SAE and its resistance to offline dictionary attacks; transition mode",
        "Enhanced Open (OWE) for open networks",
        "802.1X roles: supplicant, authenticator and authentication server (RADIUS)",
        "EAP methods: EAP-TLS, PEAP, EAP-TTLS and their certificate needs",
        "The 4-way handshake: PMK, PTK and GTK",
        "Protected Management Frames (802.11w)",
        "Rogue APs, evil twins and WIPS; guest access, captive portals and client isolation"
      ],
      notes: ["CWNA-109 Domain 5: WLAN Network Security"],
      labs: [
        "On your own AP, switch between WPA2-Personal, WPA3-Personal and WPA2/WPA3 transition mode, and record which of your devices can join each and what the client shows as the security type.",
        "Install FreeRADIUS in a free Linux VM, add a test user, point your own AP's WPA2-Enterprise SSID at it and log in with PEAP; read the RADIUS debug output (`freeradius -X`).",
        "In a capture of your own device joining your own WPA2-Personal network, find the four EAPOL-Key messages and note which carry a MIC and which delivers the GTK."
      ]
    },
    {
      id: 6,
      name: "RF validation and remediation",
      w: 20,
      topics: [
        "Site survey types: predictive, passive, active and AP-on-a-stick",
        "Pre-survey preparation: floor plans, scale, requirements, access and safety",
        "Post-installation validation surveys against design requirements",
        "Spectrum analysis: FFT, waterfall and duty cycle views; identifying non-Wi-Fi interferers",
        "Protocol analysis: monitor mode, channel selection, capture location, filters",
        "Key metrics: RSSI, SNR, retry rate, channel utilization, data rates",
        "Common RF problems: co-channel contention, adjacent channel interference, hidden nodes, low SNR",
        "Client problems: sticky clients, power mismatch between AP and client, driver issues",
        "Connection problems: wrong passphrase, expired RADIUS certificates, DHCP and VLAN errors",
        "Structured troubleshooting and documenting findings"
      ],
      notes: ["CWNA-109 Domain 6: RF Validation and Remediation"],
      labs: [
        "Run a mini passive survey of your own home: stand at 10 marked spots and record RSSI, noise and channel for your AP with a free analyzer app, then draw a rough coverage map.",
        "Start a download on your own laptop next to your own microwave oven, run the oven with a cup of water, and compare throughput and retries on 2.4 GHz vs 5 GHz.",
        "Deliberately enter a wrong passphrase on a test device for your own WPA2-Personal network while capturing, and find where the 4-way handshake stops."
      ]
    }
  ],

  study: {
    1: [
      ["Convert 50 mW and 200 mW to dBm using the rule of 10s and 3s.", "1 mW = 0 dBm, 10 mW = 10 dBm, 100 mW = 20 dBm. 50 mW is half of 100 (−3 dB), so 17 dBm. 200 mW is double 100 (+3 dB), so 23 dBm."],
      ["What is EIRP and how is it calculated?", "Equivalent isotropically radiated power is the power leaving the antenna in its strongest direction: transmitter output (dBm) minus cable and connector loss (dB) plus antenna gain (dBi). Regulators often limit it."],
      ["Explain reflection, refraction, diffraction, scattering and absorption with one indoor example each.", "Reflection off metal shelving; refraction bending through glass or changing air; diffraction bending around a wall corner (leaving an RF shadow); scattering off rough surfaces or chain-link fence; absorption by water, people and concrete."],
      ["Why does SNR matter more than RSSI alone?", "Higher data rates need more complex modulation, which needs a larger gap between signal and noise. A strong signal in a noisy environment can still give poor rates and retries."],
      ["What is the Fresnel zone and why does it matter for bridges?", "It is the football-shaped area around the visual line of sight that carries much of the signal. Obstructions such as trees or roofs in it reduce the link even when you can see the far antenna, so keep most of it clear."],
      ["What does a 3x3:2 MIMO radio mean?", "Three transmit radio chains, three receive radio chains and support for two spatial streams. Extra chains beyond the stream count add diversity and beamforming gain."]
    ],
    2: [
      ["Compare the roles of the IEEE, the Wi-Fi Alliance and regulators.", "The IEEE writes the 802.11 standard and amendments. The Wi-Fi Alliance tests interoperability and certifies products (Wi-Fi CERTIFIED, WPA3, generation names). Regulators such as the FCC decide which frequencies, channels and power levels are legal in their country."],
      ["Why does the 2.4 GHz plan use channels 1, 6 and 11?", "2.4 GHz channels are 5 MHz apart but each signal is about 20–22 MHz wide, so only channels at least five numbers apart avoid overlapping. In most regions that gives 1, 6 and 11."],
      ["What are DFS and TPC?", "Dynamic Frequency Selection makes devices in radar-shared 5 GHz channels listen for radar and leave the channel if it is detected. Transmit Power Control lets devices lower power to limit interference. Both are regulatory requirements in some bands."],
      ["List four 802.11ax (Wi-Fi 6) features and what each improves.", "OFDMA splits a channel into resource units to serve several clients at once; BSS coloring helps reuse the channel despite overlapping BSSs; Target Wake Time schedules wake-ups to save battery; 1024-QAM raises peak rates at high SNR."],
      ["What is different about 6 GHz (Wi-Fi 6E) security?", "Only WPA3 (SAE or Enterprise) or Enhanced Open (OWE) are allowed, and Protected Management Frames are required. WPA2 and plain open networks are not permitted in 6 GHz."],
      ["Match 802.11k, r, v and w to their purpose.", "k gives radio measurements and neighbor reports; r defines fast BSS transition for quick roaming; v adds network management such as BSS transition requests; w protects management frames like deauthentication."]
    ],
    3: [
      ["Describe the frames a client exchanges to join a WPA2-Personal network.", "Probe request/response (or it hears a beacon), open system authentication request/response, association request/response, then the 4-way EAPOL-Key handshake to create encryption keys. Only then does protected data flow."],
      ["How do physical and virtual carrier sense work together?", "Physical carrier sense (CCA) listens for energy or a Wi-Fi preamble on the channel. Virtual carrier sense uses the NAV timer, set from the Duration field of frames heard, so a station defers even when it cannot sense the signal."],
      ["How does WMM give voice priority?", "Voice frames use a shorter arbitration interframe space (AIFS) and a smaller contention window, so on average they win access to the medium sooner than best-effort or background traffic."],
      ["Explain TIM and DTIM.", "Beacons carry a Traffic Indication Map that tells dozing clients the AP is buffering unicast frames for them. Every DTIM beacon the AP also releases buffered broadcast and multicast frames, so the DTIM interval trades battery life against group traffic delay."],
      ["Who decides to roam and how can the network help?", "The client decides. The network can help with 802.11k neighbor reports, 802.11v BSS transition suggestions, 802.11r fast transition and sensible cell overlap and data rate settings."],
      ["Compare autonomous, controller-based and cloud-managed APs.", "Autonomous APs hold all planes and are configured one by one. Controller-based APs are managed and often tunnel to a controller for control and sometimes data. Cloud-managed APs are configured and monitored from a cloud service while forwarding data locally."]
    ],
    4: [
      ["What requirements do you gather before designing a WLAN?", "Coverage areas, number and type of clients, their bands, streams and features, applications and their throughput and latency needs, security and VLAN design, PoE and cabling limits, building materials, aesthetics and regulations."],
      ["Contrast coverage-based and capacity-based design.", "Coverage design places enough APs to reach every area at a target signal. Capacity design adds APs, lowers power and uses narrower channels so each cell serves fewer clients and more airtime is available per user."],
      ["What are typical signal goals for voice over Wi-Fi?", "Many vendors recommend about −67 dBm or better with an SNR of roughly 25 dB, low retries and a second AP heard at a similar level so the phone can roam without drops."],
      ["Why limit the number of SSIDs?", "Each SSID sends its own beacons and answers probes, usually at a low basic rate, so many SSIDs on many APs can use a large share of airtime before any user data is sent."],
      ["When would you choose local data forwarding over tunneling to a controller?", "At branches where tunneling across the WAN to a central controller would add latency and WAN load, or when traffic should stay on the local network. Tunneling is useful when central policy or a single guest egress point is needed."]
    ],
    5: [
      ["Why are SSID hiding and MAC filtering not real security?", "Hidden SSIDs still appear in probe and association frames, and MAC addresses are sent in the clear and easy to spoof. They only deter casual users."],
      ["How does WPA3-Personal improve on WPA2-Personal?", "SAE replaces the PSK-based key derivation with a password-authenticated key exchange, so a captured handshake cannot be attacked offline with a dictionary, and it gives forward secrecy. PMF is required."],
      ["Name the three 802.1X roles on a WLAN.", "Supplicant (the client), authenticator (the AP or controller) and authentication server (usually RADIUS)."],
      ["Compare EAP-TLS and PEAP.", "EAP-TLS uses certificates on both the server and the client, so no passwords are sent. PEAP uses a server certificate to build a tunnel and then authenticates the user inside it, usually with a username and password."],
      ["What is a rogue AP and how is it found?", "An unauthorized AP connected to the organization's wired network. WIPS sensors or APs scan the air and correlate wireless MAC addresses with the wired network to separate rogues from harmless neighbor APs."]
    ],
    6: [
      ["Compare predictive, passive and active surveys.", "Predictive uses software and a floor plan with wall losses to model coverage before install. Passive listens to all APs and records signal and noise. Active associates to the network and measures real performance such as throughput, retries and roaming."],
      ["When do you use a spectrum analyzer rather than a protocol analyzer?", "A spectrum analyzer shows all RF energy, including non-Wi-Fi sources such as microwave ovens and video transmitters. A protocol analyzer decodes 802.11 frames, so it shows retries, handshakes and management traffic but cannot see non-802.11 interference."],
      ["What is co-channel contention and how do you reduce it?", "APs and clients on the same channel that hear each other must share airtime. Reduce it by lowering power, using more channels (5 and 6 GHz), narrower channel widths and fewer unnecessary APs or SSIDs."],
      ["Describe the hidden node problem and fixes.", "Two clients can hear the AP but not each other, so they transmit at the same time and collide at the AP. Fixes include moving or adding APs, removing obstructions, reducing cell size and enabling RTS/CTS."],
      ["A client shows full bars but has poor performance. What do you check?", "Check SNR and noise, retries and channel utilization, uplink vs downlink (AP power much higher than client power), the data rates in use, interference with a spectrum analyzer and client driver versions."],
      ["Where should you capture frames when troubleshooting a client?", "As close to the client as possible and on the channel it uses, because that is what the client hears. Capturing near the AP may miss frames the client sends or receives poorly."]
    ]
  },

  questions: [
    ["cw1",0,1,"An engineer reads that an access point is transmitting at 100 mW. What is this power level in dBm?",["10 dBm","20 dBm","30 dBm","100 dBm"],1,"10 × log10(100) = 20, so 100 mW is 20 dBm. 10 dBm would be 10 mW and 30 dBm would be 1,000 mW.","Domain 1 – RF math"],
    ["cw2",0,1,"A radio outputs 17 dBm through a cable with 2 dB of loss to an antenna rated at 6 dBi. What is the EIRP?",["23 dBm","25 dBm","19 dBm","21 dBm"],3,"EIRP = 17 − 2 + 6 = 21 dBm. Adding the cable loss instead of subtracting it gives the tempting 25 dBm.","Domain 1 – EIRP and link budget"],
    ["cw3",0,1,"A laptop reports a received signal of −65 dBm and a noise floor of −92 dBm. What is the SNR?",["27 dB","157 dB","−27 dB","92 dB"],0,"SNR is signal minus noise: −65 − (−92) = 27 dB. Adding the absolute values gives the wrong 157.","Domain 1 – Signal metrics"],
    ["cw4",0,1,"A 40 mW transmitter has 3 dB of gain added to its output. About how much power results?",["120 mW","43 mW","80 mW","400 mW"],2,"Every 3 dB of gain roughly doubles power, so 40 mW becomes about 80 mW. 10 dB of gain would give 400 mW.","Domain 1 – RF math"],
    ["cw5",0,1,"Which statement about 2.4 GHz and 5 GHz signals is correct?",["Both bands share one wavelength","2.4 GHz has the shorter wavelength","5 GHz has the shorter wavelength","Wavelength depends on transmit power"],2,"Wavelength is inversely related to frequency, so the higher 5 GHz band has the shorter wavelength (about 6 cm vs 12.5 cm). Power changes amplitude, not wavelength.","Domain 1 – RF characteristics"],
    ["cw6",0,1,"In a warehouse full of metal racking, a client receives several delayed copies of the same transmission. Which RF behavior mainly causes this?",["Reflection","Absorption","Refraction","Free space path loss"],0,"Metal surfaces reflect RF, creating multiple paths that arrive at different times (multipath). Absorption weakens a signal but does not create copies.","Domain 1 – RF behaviors"],
    ["cw7",0,1,"Signal in a lecture hall is strong when it is empty but drops sharply once it fills with students. Which behavior explains this?",["Scattering","Diffraction","Reflection","Absorption"],3,"The human body is mostly water, which absorbs RF energy and converts it to heat. Diffraction is bending around edges, not loss inside a material.","Domain 1 – RF behaviors"],
    ["cw8",0,1,"Users just behind the corner of a thick concrete wall still get a weak signal even though the wall blocks the direct path. Which behavior lets the signal reach them?",["Absorption in the wall","Diffraction around the wall's edge","Refraction through the air","Polarization of the signal"],1,"Diffraction bends a wave around the edge of an obstacle, leaving a weaker RF shadow behind it. Absorption only removes energy.","Domain 1 – RF behaviors"],
    ["cw9",0,1,"An outdoor bridge with a completely clear path still shows lower received signal as the distance is increased. What is the main reason?",["The cable VSWR rises with distance","Water vapor absorbs most 5 GHz energy","Multipath always cancels the main signal","The wavefront spreads out with distance"],3,"Free space path loss comes from the wave spreading over a larger area as it travels, even with no obstacles. Weather effects are minor at these distances and VSWR does not depend on link length.","Domain 1 – RF behaviors"],
    ["cw10",0,1,"A point-to-point link was installed with one Yagi mounted vertically and the other horizontally. What is the likely result?",["Higher gain from polarization diversity","Heavy loss from polarization mismatch","No effect, since Yagis are omnidirectional","A wider beamwidth on both antennas"],1,"Antennas on a link should share the same polarization; a 90-degree mismatch causes large signal loss. Yagis are semi-directional, not omnidirectional.","Domain 1 – Antennas"],
    ["cw11",0,1,"Two buildings can see each other's rooftop antennas, but trees intrude on the area just below the visual path and the link is unstable. What should the engineer address?",["The ground plane under the mast","The antennas' back lobe","Clearance of the Fresnel zone","The horizontal beamwidth only"],2,"RF line of sight needs most of the first Fresnel zone clear, not just a visual path. Obstructions in it reduce and destabilize the signal.","Domain 1 – Point-to-point links"],
    ["cw12",0,1,"A company needs a high-gain, narrow-beam link between two sites several kilometers apart. Which antenna type fits best?",["Parabolic dish","Omnidirectional dipole","Indoor ceiling patch","Wide-angle sector"],0,"Highly directional parabolic dishes provide the most gain and narrowest beam for long point-to-point links. Omnis and sectors spread energy over wide areas.","Domain 1 – Antennas"],
    ["cw13",0,1,"An antenna datasheet lists a gain of 5 dBd. What is the equivalent gain in dBi?",["2.86 dBi","7.14 dBi","5 dBi","10 dBi"],1,"A dipole has 2.14 dBi of gain, so dBi = dBd + 2.14 = 7.14 dBi. Subtracting instead gives 2.86.","Domain 1 – RF math"],
    ["cw14",0,1,"An AP radio is described as 3x3:2. What does this mean?",["3 spatial streams and 2 receive chains","3 streams, 3 antennas, 2 bands","3 radios per band and 2 bands in total","3 transmit chains, 3 receive chains, 2 streams"],3,"MIMO notation is transmit chains × receive chains : spatial streams. The radio can send two streams while using all three chains for diversity.","Domain 1 – MIMO"],

    ["cw15",0,2,"Which organization writes and publishes the 802.11 standard and its amendments?",["IEEE","Wi-Fi Alliance","IETF","FCC"],0,"The IEEE maintains 802.11. The Wi-Fi Alliance certifies interoperability, the IETF writes internet protocols such as RADIUS, and the FCC regulates spectrum in the US.","Domain 2 – Standards bodies"],
    ["cw16",0,2,"A buyer wants assurance that a new client adapter will work with WPA3 on other vendors' access points. What should they look for?",["FCC equipment authorization for the adapter","IEEE 802.11 ratification of the adapter","Wi-Fi CERTIFIED WPA3 from the Wi-Fi Alliance","An IETF RFC number on the product box"],2,"The Wi-Fi Alliance tests products for interoperability and security features such as WPA3. FCC authorization covers emissions, not interoperability.","Domain 2 – Standards bodies"],
    ["cw17",0,2,"Who decides which channels and maximum transmit power an AP may legally use in a given country?",["The Wi-Fi Alliance","The IEEE 802.11 working group","That country's regulatory authority","The AP manufacturer"],2,"National regulators, such as the FCC in the United States, set legal frequencies and power limits. The IEEE defines how the protocol works within those rules.","Domain 2 – Regulations"],
    ["cw18",0,2,"An engineer is planning 20 MHz 2.4 GHz channels for an office in North America. Which set avoids overlap?",["1, 6 and 11","1, 5 and 9","2, 7 and 12","1, 4, 8 and 11"],0,"2.4 GHz channels are 5 MHz apart but about 20 MHz wide, so 1, 6 and 11 are the standard non-overlapping set in North America.","Domain 2 – Channels"],
    ["cw19",0,2,"Which 802.11 amendment introduced OFDMA and BSS coloring?",["802.11g","802.11ac","802.11n","802.11ax"],3,"802.11ax (HE, Wi-Fi 6) added OFDMA, BSS coloring, Target Wake Time and 1024-QAM. 802.11ac introduced downlink MU-MIMO but not OFDMA.","Domain 2 – 802.11ax"],
    ["cw20",0,2,"A client's datasheet lists only VHT (802.11ac) rates. In which band can it use those rates?",["2.4 GHz only","5 GHz only","2.4 and 5 GHz","6 GHz only"],1,"802.11ac VHT is defined for 5 GHz only. 802.11ax (HE) works in 2.4, 5 and 6 GHz, which is the tempting mix-up.","Domain 2 – PHYs"],
    ["cw21",0,2,"Which amendment first introduced MIMO and 40 MHz channels under the name HT?",["802.11ac","802.11a","802.11g","802.11n"],3,"802.11n (High Throughput, Wi-Fi 4) added MIMO and 40 MHz channels. 802.11ac later added 80 and 160 MHz.","Domain 2 – PHYs"],
    ["cw22",0,2,"An old barcode scanner supports only 1, 2, 5.5 and 11 Mbps. Which PHY does it use?",["ERP-OFDM (802.11g)","HR/DSSS (802.11b)","OFDM (802.11a)","HT (802.11n)"],1,"Those four rates are the DSSS and HR/DSSS rates of 802.11b. ERP-OFDM and OFDM rates start at 6 Mbps.","Domain 2 – PHYs"],
    ["cw23",0,2,"An admin wants to add a 6 GHz radio to an existing WPA2-Personal SSID. What is the problem?",["6 GHz needs 802.11b protection","6 GHz allows only 20 MHz channels","6 GHz needs WPA3 or Enhanced Open","6 GHz cannot use any passphrase"],2,"Wi-Fi 6E rules require WPA3 (SAE or Enterprise) or OWE with PMF in 6 GHz; WPA2 is not allowed. 6 GHz supports wide channels and WPA3-Personal uses a passphrase.","Domain 2 – 6 GHz"],
    ["cw24",0,2,"An AP on 5 GHz channel 100 suddenly changes channel and clients disconnect briefly. The log shows a radar event. Which requirement caused this?",["Dynamic Frequency Selection","Transmit Power Control","Clear Channel Assessment","Automatic rate selection"],0,"DFS requires devices in radar-shared channels to leave when radar is detected. TPC controls power levels, not channel changes after radar.","Domain 2 – DFS and TPC"],
    ["cw25",0,2,"Why do clients at the edge of an 802.11ax cell never reach 1024-QAM data rates?",["1024-QAM works only on 2.4 GHz","1024-QAM needs a very high SNR near the AP","1024-QAM is limited to legacy clients","1024-QAM is disabled whenever DFS is on"],1,"Denser modulation packs more bits per symbol but needs a clean, strong signal. Far from the AP, SNR drops and the rate shifts to simpler modulation.","Domain 2 – 802.11ax"],
    ["cw26",0,2,"A dense office wants 40 MHz channels on 2.4 GHz for more speed. What is the best advice?",["Avoid it: 40 MHz exists only in 6 GHz","Use it: 2.4 GHz has four clean 40 MHz channels","Use it: bonding removes co-channel contention","Avoid it: only one clean 40 MHz channel fits"],3,"The 2.4 GHz band is too narrow for more than one non-overlapping 40 MHz channel, so bonding there causes heavy overlap. 40 MHz is common in 5 GHz.","Domain 2 – Channels"],
    ["cw27",0,2,"Which amendment defines fast BSS transition so 802.1X clients can roam without a full reauthentication?",["802.11r","802.11k","802.11v","802.11w"],0,"802.11r (FT) pre-derives keys for the target AP. 802.11k gives neighbor reports and 802.11w protects management frames.","Domain 2 – Amendments"],
    ["cw28",0,2,"A client asks its AP for a list of nearby APs to speed up roaming. Which amendment provides this neighbor report?",["802.11w","802.11r","802.11k","802.11e"],2,"802.11k radio resource measurement includes neighbor reports. 802.11r speeds up the key exchange once a target is chosen.","Domain 2 – Amendments"],
    ["cw29",0,2,"A spec sheet says the AP supports Wi-Fi 5. Which amendment is that?",["802.11n","802.11ax","802.11ac","802.11be"],2,"The Wi-Fi Alliance names are Wi-Fi 4 (n), Wi-Fi 5 (ac), Wi-Fi 6/6E (ax) and Wi-Fi 7 (be).","Domain 2 – Generation names"],
    ["cw30",0,2,"Which list shows adjacent, non-overlapping 20 MHz channels in the 5 GHz U-NII-1 band?",["36, 40, 44, 48","1, 6, 11, 14","36, 38, 40, 42","100, 101, 102, 103"],0,"5 GHz channel numbers are 5 MHz apart, so 20 MHz channels step by four: 36, 40, 44 and 48 in U-NII-1.","Domain 2 – Channels"],
    ["cw31",0,2,"What does OFDMA let an 802.11ax AP do?",["Transmit on 2.4 GHz channel 14 in all regions","Bond two separate bands into one wide channel","Encrypt frames without any 4-way handshake","Serve several clients at once using resource units"],3,"OFDMA divides a channel into resource units so several clients can be served in one transmission, cutting overhead for small frames.","Domain 2 – 802.11ax"],
    ["cw32",0,2,"Battery-powered IoT sensors on an 802.11ax network need longer battery life. Which feature lets the AP schedule when they wake?",["BSS coloring","Target Wake Time","MU-MIMO","Transmit beamforming"],1,"TWT lets the AP and client agree wake schedules so the radio can sleep longer. BSS coloring helps with spatial reuse, not power saving.","Domain 2 – 802.11ax"],

    ["cw33",0,3,"A capture shows beacon frames every 102.4 ms. What 802.11 frame type is a beacon?",["Null function","Control","Data","Management"],3,"Beacons, probes, authentication and association frames are management frames. Null function is a data subtype.","Domain 3 – Frame types"],
    ["cw34",0,3,"Which 802.11 frame type carries ACK, RTS and CTS frames?",["Management","Control","Data","Action"],1,"ACK, RTS, CTS and Block Ack are control frames that help deliver other frames. Action frames are a management subtype.","Domain 3 – Frame types"],
    ["cw35",0,3,"What is the correct order of frames when a client joins a WPA2-Personal BSS?",["Authentication, probe, 4-way handshake, association","Probe, association, 4-way handshake, authentication","Probe, authentication, association, 4-way handshake","4-way handshake, probe, authentication, association"],2,"The client discovers the BSS, performs open system authentication, associates, and then runs the 4-way handshake to derive keys.","Domain 3 – Joining a BSS"],
    ["cw36",0,3,"A capture shows a laptop sending probe requests on each channel in turn. What is the laptop doing?",["Active scanning","Passive scanning","Reassociating","Deauthenticating"],0,"Active scanning means sending probe requests and waiting for probe responses. Passive scanning only listens for beacons.","Domain 3 – Joining a BSS"],
    ["cw37",0,3,"A station hears a frame whose Duration field is 300 µs and holds off transmitting for that time. Which mechanism is this?",["Energy detect CCA","Virtual carrier sense (NAV)","The random backoff timer","The SIFS interval"],1,"The NAV timer is set from the Duration field of frames heard, so the station defers even if it later cannot sense energy. CCA is physical carrier sense.","Domain 3 – Medium access"],
    ["cw38",0,3,"What does an RTS/CTS exchange achieve before a data frame is sent?",["It checks the client's power save state","It encrypts the next data frame","It asks the AP for a higher data rate","It reserves the medium through the NAV"],3,"The CTS from the AP sets the NAV of every station that hears it, including hidden stations that did not hear the RTS, so they defer.","Domain 3 – Protection"],
    ["cw39",0,3,"Which interframe space is the shortest and is used before an ACK?",["SIFS","DIFS","AIFS","EIFS"],0,"SIFS is the shortest gap, giving ACKs and CTS frames priority. DIFS and AIFS are longer and used for contention; EIFS follows a corrupted frame.","Domain 3 – Medium access"],
    ["cw40",0,3,"With WMM enabled, voice frames reach the air sooner than best-effort frames. Why?",["Higher transmit power for voice","A dedicated voice-only channel","Shorter AIFS and smaller contention windows","A guaranteed slot in each beacon"],2,"EDCA gives the voice access category a shorter AIFS and smaller contention window, so it usually wins contention. WMM does not reserve channels or slots.","Domain 3 – QoS"],
    ["cw41",0,3,"A dozing phone wakes for a beacon and learns the AP is holding unicast frames for it. Which beacon field told it?",["The DS parameter set","The SSID element","The Traffic Indication Map","The supported rates element"],2,"The TIM lists association IDs with buffered unicast frames. The DS parameter set gives the channel and the SSID element names the network.","Domain 3 – Power management"],
    ["cw42",0,3,"Push-to-talk badges on a WLAN have long delays for multicast voice after the admin raised the DTIM interval to save battery. What explains this?",["Group frames wait for the next DTIM beacon","The TIM stops listing unicast frames","The AP drops multicast from sleeping clients","A higher DTIM forces a lower data rate"],0,"The AP buffers broadcast and multicast until a DTIM beacon, so a larger DTIM interval saves power but adds delay to group traffic.","Domain 3 – Power management"],
    ["cw43",0,3,"In an 802.11 WLAN, which device makes the final decision to roam?",["The RADIUS server","The access point","The WLAN controller","The client station"],3,"Roaming is client-driven. 802.11v lets the network suggest a better AP, but the client chooses whether and when to move.","Domain 3 – Roaming"],
    ["cw44",0,3,"Which identifier names a single basic service set and is normally the MAC address of an AP radio?",["SSID","BSSID","ESSID","OUI"],1,"The BSSID is a 48-bit MAC-style address for one BSS. The SSID is the human-readable network name that can span many BSSs.","Domain 3 – Addressing"],
    ["cw45",0,3,"In a controller-based WLAN, which protocol do lightweight APs commonly use to talk to the controller?",["BGP","LLDP","STP","CAPWAP"],3,"CAPWAP is the standard tunneling protocol for AP-to-controller control and optional data traffic. LLDP only advertises neighbor information.","Domain 3 – Devices"],
    ["cw46",0,3,"A new AP needs about 25 W at the device, and the switch supports only 802.3af. What is the minimum PoE standard the switch should support?",["802.3af (PoE)","802.3at (PoE+)","802.3ab","802.3u"],1,"802.3af provides at most 12.95 W at the device; 802.3at provides up to 25.5 W. 802.3ab and 802.3u are Ethernet speed standards, not PoE.","Domain 3 – PoE"],
    ["cw47",0,3,"A small shop has two APs, no controller and no cloud account. Each AP holds its own configuration. What kind of APs are these?",["Cloud-managed APs","Lightweight APs","Autonomous APs","Mesh portal APs"],2,"Autonomous APs contain the management, control and data planes and are configured individually. Lightweight APs need a controller.","Domain 3 – Devices"],
    ["cw48",0,3,"A parking garage has no cabling in its upper levels. The APs there must forward traffic wirelessly to an AP that has a wired uplink. Which design is this?",["Mesh","Band steering","Channel bonding","Load balancing"],0,"In a mesh, APs use wireless backhaul to reach a root or portal AP connected to the wired network. The others are radio features, not backhaul designs.","Domain 3 – Devices"],
    ["cw49",0,3,"In a capture, which frame control flag shows that a frame is a retransmission?",["More Data","Retry","Power Management","Protected Frame"],1,"The Retry bit is set when a frame is sent again. More Data tells a dozing client more frames are buffered.","Domain 3 – Frames"],
    ["cw50",0,3,"802.11n and later radios send several MPDUs in one A-MPDU. How does the receiver confirm them efficiently?",["A bit in the next beacon","A separate ACK for each MPDU","A CTS-to-self frame","A single Block Ack frame"],3,"Block Ack confirms many frames at once with a bitmap, keeping aggregation efficient. CTS-to-self is a protection mechanism.","Domain 3 – Aggregation"],

    ["cw51",0,4,"An auditorium must serve 800 users. Which approach best fits a capacity-based design?",["More APs at lower power on 20 MHz channels","Fewer APs at maximum power for full coverage","80 MHz channels on every AP in 2.4 GHz","One high-gain omni in the center of the room"],0,"Capacity design makes smaller cells so each AP serves fewer clients and channels can be reused. Maximum power and wide channels reduce reuse.","Domain 4 – Capacity design"],
    ["cw52",0,4,"A hospital is designing for Wi-Fi phones. Which target is common vendor guidance?",["About −30 dBm with no SNR target","About −85 dBm with an SNR near 5 dB","About −67 dBm with an SNR near 25 dB","About −90 dBm with an SNR near 10 dB"],2,"Many voice client vendors recommend around −67 dBm and 25 dB SNR so higher rates and low retries are possible. −85 dBm is near the edge of usable signal.","Domain 4 – Design targets"],
    ["cw53",0,4,"Why do voice designs call for each area to hear a second AP at a usable signal level?",["So the controller can load balance by SSID","So each phone can join two APs at once","So phones can roam without dropping calls","So radar detection is shared across APs"],2,"Secondary coverage gives the phone a roaming target before the current signal becomes too weak, avoiding gaps and dropped calls.","Domain 4 – Design targets"],
    ["cw54",0,4,"Which architecture keeps configuration and monitoring in a vendor-hosted service while user traffic is forwarded locally by the APs?",["Cloud-managed","Autonomous","Centralized controller","Standalone mesh"],0,"Cloud-managed WLANs host the management plane in the cloud; data stays local. Autonomous APs have no central management at all.","Domain 4 – Architectures"],
    ["cw55",0,4,"Branch APs tunnel all user traffic across the WAN to a controller at headquarters, and branch users complain about slow access to a local printer. What is the best change?",["Move the branch APs to 40 MHz channels","Raise AP power at the branch office","Add another SSID for printer access","Forward branch traffic locally at the AP"],3,"Local (distributed) forwarding keeps branch traffic on the branch LAN instead of hairpinning across the WAN. Radio changes do not fix the traffic path.","Domain 4 – Data forwarding"],
    ["cw56",0,4,"Radio resource management that adjusts channels and power across APs belongs to which plane?",["Management plane","Control plane","Data plane","User plane"],1,"The control plane coordinates the network, such as RRM and roaming. The management plane handles configuration and monitoring; the data plane forwards user traffic.","Domain 4 – Planes"],
    ["cw57",0,4,"An autonomous AP will serve three SSIDs, each mapped to a different VLAN. How should the switch port for the AP be configured?",["As a routed port with no VLANs","As an access port in the guest VLAN","As an access port in the native VLAN","As an 802.1Q trunk with those VLANs"],3,"Carrying several VLANs to the AP requires an 802.1Q trunk. An access port carries only one VLAN.","Domain 4 – SSIDs and VLANs"],
    ["cw58",0,4,"A site has eight SSIDs on every AP and high channel utilization even when few users are active. What is the likely cause?",["DFS events in the 2.4 GHz band","Beacon and probe overhead from many SSIDs","Too few spatial streams on the APs","Overly strong WPA3 encryption"],1,"Each SSID beacons separately, usually at a low basic rate, so many SSIDs consume airtime before any data flows. DFS applies to 5 GHz only.","Domain 4 – SSID design"],
    ["cw59",0,4,"An admin disables the 1, 2, 5.5 and 11 Mbps rates on 2.4 GHz. What is the main benefit?",["Each AP cell becomes larger","Legacy 802.11b clients connect more easily","Frames use less airtime, which helps roaming","Beacons are no longer transmitted"],2,"Higher minimum rates shorten management frames and make cells effectively smaller, encouraging clients to roam. It locks out 802.11b clients rather than helping them.","Domain 4 – Data rates"],
    ["cw60",0,4,"Which feature encourages dual-band clients to connect on 5 GHz instead of 2.4 GHz?",["Band steering","Load balancing","BSS coloring","Dynamic Frequency Selection"],0,"Band steering delays or ignores 2.4 GHz probe responses for dual-band clients so they join on 5 GHz. Load balancing spreads clients across APs.","Domain 4 – Client steering"],
    ["cw61",0,4,"A warehouse uses 1x1 scanners that support only 2.4 GHz. Why should this be found before the design is done?",["Scanners can use only DFS channels in 5 GHz","The design must suit the weakest critical client","2.4 GHz clients need 160 MHz channels","It only affects the choice of SSID name"],1,"Coverage, band and rate choices must work for the least capable devices the business depends on, so a 5 GHz-only design would fail these scanners.","Domain 4 – Requirements"],
    ["cw62",0,4,"A switch has a 370 W PoE budget. The plan adds 16 APs that can each draw 25.5 W. What is the concern?",["PoE budget applies only to phones","The APs need 802.3af instead","The budget suits 32 of these APs","The 408 W demand exceeds the budget"],3,"16 × 25.5 W = 408 W, above the 370 W budget, so some APs may not power up or may run in a reduced mode.","Domain 4 – PoE planning"],
    ["cw63",0,4,"Several nearby 5 GHz APs are all on the same 80 MHz channel and users see slow throughput. What design change helps most?",["Use narrower channels to allow more reuse","Increase transmit power on every AP","Add more SSIDs to split the users","Move every AP to channel 36 at 160 MHz"],0,"Narrower channels give more non-overlapping channels, reducing co-channel contention. More power or wider channels increase contention.","Domain 4 – Channel reuse"],

    ["cw64",0,5,"A small business worries that someone could capture its Wi-Fi handshake and guess the password offline. Which change helps most?",["Enable MAC address filtering","Hide the SSID from beacon frames","Move to WPA3-Personal using SAE","Switch from CCMP to TKIP"],2,"SAE resists offline dictionary attacks against a captured exchange. Hiding the SSID and MAC filtering are easily bypassed, and TKIP is deprecated.","Domain 5 – WPA3"],
    ["cw65",0,5,"A café wants an open network with no password but encrypted traffic for each guest. Which option fits?",["WEP with a shared key","WPA2-Personal with a posted key","Enhanced Open (OWE)","A hidden SSID"],2,"OWE gives each client unique encryption without a passphrase. A shared posted key lets anyone with it attack others' sessions.","Domain 5 – Enhanced Open"],
    ["cw66",0,5,"In a WPA2-Enterprise network, which 802.1X role does the access point or controller play?",["Authenticator","Supplicant","Authentication server","Certificate authority"],0,"The client is the supplicant, the AP or controller is the authenticator, and RADIUS is the authentication server.","Domain 5 – 802.1X"],
    ["cw67",0,5,"A company wants mutual certificate authentication with no user passwords sent over Wi-Fi. Which EAP method fits?",["LEAP","PEAP-MSCHAPv2","EAP-TTLS with PAP","EAP-TLS"],3,"EAP-TLS requires certificates on both server and client. PEAP and TTLS normally use passwords inside a tunnel; LEAP is obsolete.","Domain 5 – EAP"],
    ["cw68",0,5,"Which encryption protocol is mandatory for WPA2?",["TKIP, based on RC4","CCMP, based on AES","WEP with 104-bit keys","Triple DES in CBC mode"],1,"WPA2 certification requires CCMP (AES). TKIP was an interim fix for WEP hardware and is now deprecated.","Domain 5 – Encryption"],
    ["cw69",0,5,"Clients keep dropping off an SSID, and a capture shows floods of deauthentication frames spoofing the AP's MAC address. Which feature prevents this attack?",["Band steering","Fast BSS transition (802.11r)","Neighbor reports (802.11k)","Protected Management Frames (802.11w)"],3,"802.11w protects deauthentication and disassociation frames so forged ones are ignored. 802.11r only speeds up roaming.","Domain 5 – PMF"],
    ["cw70",0,5,"WIPS finds an unmanaged AP plugged into a conference room wall jack on the corporate LAN. How is it classified?",["Neighbor AP","Rogue AP","Mesh portal","Managed AP"],1,"A rogue AP is unauthorized and connected to the organization's wired network. A neighbor AP belongs to someone else and is not on your LAN.","Domain 5 – Rogues and WIPS"],
    ["cw71",0,5,"In WPA2-Personal, where does the Pairwise Master Key come from?",["The group temporal key","The RADIUS server's reply","The passphrase and SSID","The AP's BSSID alone"],2,"With a PSK, the PMK is derived from the passphrase and SSID. In Enterprise mode it comes from the EAP exchange with RADIUS.","Domain 5 – Key hierarchy"],
    ["cw72",0,5,"A guest SSID must stop guest devices from reaching one another. Which setting should be used?",["Client isolation","MAC filtering","SSID hiding","A longer DTIM interval"],0,"Client (peer-to-peer) isolation blocks traffic between wireless clients. MAC filtering and hiding do not stop client-to-client traffic.","Domain 5 – Guest access"],

    ["cw73",0,6,"An engineer walks a site recording signal and noise from every AP without associating to any of them. Which survey is this?",["Active survey","Passive survey","Predictive survey","Spectrum-only survey"],1,"A passive survey listens to all APs. An active survey associates and measures throughput, retries and roaming.","Domain 6 – Survey types"],
    ["cw74",0,6,"Before a new building is finished, a designer uses floor plans and wall attenuation values in software to plan AP locations. Which survey is this?",["Validation survey","Passive survey","Active survey","Predictive survey"],3,"A predictive survey models RF with software and building data before APs are installed. The others need measurements on site.","Domain 6 – Survey types"],
    ["cw75",0,6,"Users in a break room lose 2.4 GHz Wi-Fi around lunchtime, but 5 GHz is fine. Which tool best identifies the source?",["Spectrum analyzer","Protocol analyzer","Cable tester","RADIUS debug log"],0,"The likely cause is non-Wi-Fi energy such as a microwave oven, which only a spectrum analyzer shows. A protocol analyzer only decodes 802.11 frames.","Domain 6 – Spectrum analysis"],
    ["cw76",0,6,"A laptop running Wireshark shows only its own traffic and no beacons from other networks. What must change to see all 802.11 frames on a channel?",["Join every SSID to be captured","Turn on promiscuous mode on the switch port","Put the adapter in monitor mode on that channel","Use a wired mirror port on the AP uplink"],2,"Monitor mode lets a wireless adapter capture all 802.11 frames on its channel, including management and control frames. Wired mirroring never shows RF frames.","Domain 6 – Protocol analysis"],
    ["cw77",0,6,"Two laptops at opposite ends of a long room both connect to the central AP but cannot hear each other, and retries are high. What is the likely problem?",["Co-channel contention","Adjacent channel interference","Hidden node","Sticky client"],2,"Stations that cannot hear each other transmit at the same time and collide at the AP. RTS/CTS, AP placement or smaller cells can help.","Domain 6 – Troubleshooting"],
    ["cw78",0,6,"Twelve APs in an open office are all on channel 6 at full power, and airtime is saturated. What is the best fix?",["Reduce power and spread APs across channels","Raise power on all APs to beat noise","Enable 40 MHz channels in 2.4 GHz","Add a second SSID on channel 6"],0,"The APs hear each other and must share airtime (co-channel contention). Lower power and more channels, ideally 5 GHz, restore capacity.","Domain 6 – Troubleshooting"],
    ["cw79",0,6,"A client stays connected to a distant AP with a weak signal even when standing under another AP. What is this called?",["An evil twin","A hidden node","A rogue client","A sticky client"],3,"Sticky clients delay roaming. 802.11k/v, raising minimum basic rates and tuning power can encourage them to move.","Domain 6 – Troubleshooting"],
    ["cw80",0,6,"A phone shows full signal bars but uploads are very slow, and the AP is set to its maximum power. What is a likely cause?",["The phone uses too high a DTIM value","The AP's power far exceeds the phone's","The AP's 2.4 GHz band is turned off","The SSID is sent in every beacon"],1,"The phone hears the strong AP, but its weaker transmissions reach the AP poorly, causing uplink retries. Matching AP power to client capability helps.","Domain 6 – Troubleshooting"],
    ["cw81",0,6,"A capture made next to the AP looks clean, but the user far away still complains. Where should the next capture be made?",["Next to a different AP","At the core switch","On the RADIUS server","Near the affected client"],3,"Capture close to the client on its channel to see what it hears and sends. Wired captures miss RF behavior entirely.","Domain 6 – Protocol analysis"],
    ["cw82",0,6,"Which capture statistic most directly points to RF problems such as interference or collisions?",["A high beacon count","A high retry rate","A long DTIM interval","Many probe responses"],1,"Retransmissions mean frames were not acknowledged, often from interference, collisions or weak signal. Beacon counts are normal background traffic.","Domain 6 – Metrics"],
    ["cw83",0,6,"After APs are installed, the customer wants proof that the design targets were met. Which activity provides this?",["A wired cable certification","A predictive design refresh","A post-installation validation survey","A new requirements interview"],2,"A validation survey measures the live network against the agreed requirements. Predictive models are estimates, not proof.","Domain 6 – Validation"],
    ["cw84",0,6,"All WPA2-Enterprise clients began failing authentication on the same morning with no configuration changes. PEAP logs show a server certificate error. What is the likely cause?",["The RADIUS server certificate expired","The PSK was changed overnight","The AP moved to a DFS channel","The DHCP scope ran out of leases"],0,"An expired server certificate breaks PEAP and EAP-TLS for every client at once. There is no PSK in Enterprise mode, and DHCP happens after authentication.","Domain 6 – Troubleshooting"],
    ["cw85",0,6,"On a WPA2-Personal network, a capture shows EAPOL messages 1 and 2 but the AP never sends message 3. What is most likely wrong?",["The client's RADIUS certificate expired","The client has the wrong passphrase","The AP lacks a DHCP reservation","The AP uses a hidden SSID"],1,"The AP checks the MIC in message 2; with a mismatched passphrase it fails and the AP does not continue. Personal mode uses no RADIUS.","Domain 6 – Troubleshooting"],
    ["cw86",0,6,"Two neighboring 2.4 GHz APs are on channels 1 and 3. What problem does this create?",["DFS radar events","Co-channel contention only","Hidden node collisions","Adjacent channel interference"],3,"Overlapping but different channels cannot share the medium properly and corrupt each other's frames. Use 1, 6 and 11 instead.","Domain 6 – Troubleshooting"],
    ["cw87",0,6,"During an active survey, the engineer places a temporary AP on a stand at planned locations to find the cell edge. What is this method called?",["AP-on-a-stick survey","Predictive modeling","Passive walk-through","Spectrum sweep"],0,"AP-on-a-stick uses a temporary AP to measure real coverage at candidate spots before final mounting.","Domain 6 – Survey types"],
    ["cw88",0,6,"A spectrum analyzer shows a source using nearly 100% duty cycle across channels 1 to 4. What happens to Wi-Fi devices there?",["They raise power until the noise stops","They switch to 6 GHz on their own","They defer constantly and cannot send","They ignore it because it is not 802.11"],2,"A constant non-Wi-Fi signal keeps CCA busy or ruins SNR, so devices defer or fail to decode. Remove the source or move channels.","Domain 6 – Spectrum analysis"],
    ["cw89",0,6,"A laptop associates to the corporate SSID and completes the handshake, but it gets a 169.254.x.x address. Where should troubleshooting focus next?",["The 802.11 authentication frames","The antenna's polarization","DHCP and VLAN mapping for the SSID","The AP's channel and power"],2,"The Wi-Fi link works; the problem is Layer 3 addressing, often a wrong VLAN on the SSID or trunk, or a DHCP scope or relay issue.","Domain 6 – Troubleshooting"],
    ["cw90",0,6,"Which channel utilization finding most suggests a cell cannot take more clients?",["Utilization stays high while busy","Utilization is low all day","Utilization rises for a moment","Utilization is the same on each band"],0,"Consistently high utilization during busy periods means little airtime is left for new clients. Brief spikes are normal.","Domain 6 – Metrics"]
  ]
});
