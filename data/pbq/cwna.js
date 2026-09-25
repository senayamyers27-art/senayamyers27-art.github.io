CertHub.addPbqs("cwna", [
  { id: "eirp-link-fill", d: 1, type: "fill", title: "Calculate intentional radiator power and EIRP",
    prompt: "An outdoor AP feeds an external antenna. Using the values below, fill in each field (numbers only).",
    context: "Radio transmit power setting : 17 dBm\nLMR-400 cable loss          : 2 dB\nLightning arrestor + connectors : 1 dB (total)\nAntenna gain                : 9 dBi",
    fields: [
      { label: "Transmit power in mW", answers: ["50", "50 mw", "50mw"] },
      { label: "Power delivered to the antenna input (intentional radiator), dBm", answers: ["14", "14 dbm", "14dbm"] },
      { label: "EIRP in dBm", answers: ["23", "23 dbm", "23dbm"] },
      { label: "EIRP in mW", answers: ["200", "200 mw", "200mw"] }
    ],
    explain: "17 dBm is 20 dBm (100 mW) minus 3 dB, so 50 mW. Subtracting the 3 dB of cable, arrestor and connector loss gives 14 dBm at the antenna input, which is the intentional radiator. Adding 9 dBi of antenna gain gives 23 dBm EIRP; 23 dBm is 20 dBm plus 3 dB, so 100 mW doubled to 200 mW. Remember losses are subtracted and antenna gain is added in dB, never multiplied." },

  { id: "amendment-match", d: 2, type: "match", title: "Match features to 802.11 amendments",
    prompt: "A design document lists the features required on the new WLAN. Match each feature to the 802.11 amendment that defines it.",
    pairs: [
      ["Fast BSS transition so voice handsets roam without a full 802.1X exchange", "802.11r"],
      ["Neighbor reports and radio measurements that help clients pick a roaming target", "802.11k"],
      ["BSS transition management requests that suggest a better AP to a client", "802.11v"],
      ["Protection of deauthentication and disassociation frames against spoofing", "802.11w"],
      ["EDCA access categories that give voice frames priority over best effort", "802.11e"]
    ],
    extra: ["802.11h", "802.11s"],
    explain: "802.11k supplies information (neighbor reports), 802.11v lets the network suggest a move (BSS transition management) and 802.11r speeds up the move itself by pre-deriving keys, so the three are often deployed together. 802.11w defines Protected Management Frames and 802.11e defines QoS, which the Wi-Fi Alliance certifies as WMM. 802.11h adds DFS and TPC, and 802.11s defines mesh networking; neither matches these features." },

  { id: "dfs-scan-select", d: 2, type: "select", title: "Identify BSSs on DFS channels",
    prompt: "A US site's scan results are shown. Select every BSS that is operating on a channel where DFS is required.",
    context: "SSID    BSSID              Band     Primary ch  Width\nCORP    00:11:22:33:44:01  5 GHz    36          80 MHz\nCORP    00:11:22:33:44:02  5 GHz    56          20 MHz\nCORP    00:11:22:33:44:03  5 GHz    100         40 MHz\nCORP    00:11:22:33:44:04  5 GHz    149         80 MHz\nGUEST   00:11:22:33:44:05  2.4 GHz  11          20 MHz\nCORP    00:11:22:33:44:06  5 GHz    124         20 MHz\nCORP    00:11:22:33:44:07  6 GHz    37          80 MHz\nCORP    00:11:22:33:44:08  5 GHz    44          40 MHz",
    options: ["BSSID :01, channel 36, 80 MHz", "BSSID :02, channel 56, 20 MHz", "BSSID :03, channel 100, 40 MHz", "BSSID :04, channel 149, 80 MHz", "BSSID :05, channel 11, 2.4 GHz", "BSSID :06, channel 124, 20 MHz", "BSSID :07, 6 GHz channel 37", "BSSID :08, channel 44, 40 MHz"],
    answers: [1, 2, 5],
    explain: "In the US, DFS applies to U-NII-2A (channels 52-64) and U-NII-2C/2e (channels 100-144), so channels 56, 100 and 124 require radar detection. Channel 36 at 80 MHz spans 36-48 and channel 44 at 40 MHz spans 44-48, all in non-DFS U-NII-1; channel 149 at 80 MHz spans 149-161 in U-NII-3. The 2.4 GHz band and 6 GHz band have no DFS requirement (6 GHz standard power uses AFC instead)." },

  { id: "wpa2-join-order", d: 3, type: "order", title: "Order the frames when joining a WPA2-Personal BSS",
    prompt: "A protocol analyzer captured a client joining a WPA2-Personal SSID using active scanning. Put the exchanges in the order they occur.",
    steps: [
      "Client sends a probe request for the SSID",
      "AP replies with a probe response listing its capabilities and RSN information",
      "Open System authentication request and response are exchanged",
      "Client sends an association request",
      "AP sends an association response containing an association ID",
      "EAPOL-Key message 1: the AP sends its ANonce",
      "EAPOL-Key messages 2 through 4 complete the PTK and deliver the GTK",
      "CCMP-protected data frames flow between client and AP"
    ],
    explain: "A client first discovers the BSS (probe request and response, or a beacon with passive scanning), then performs 802.11 Open System authentication, which is only a formality under WPA2. Association follows and gives the client an AID. Only after association does the 4-way handshake run, starting with the AP's ANonce, deriving the PTK and delivering the GTK; the 802.1X controlled port then opens and encrypted data can flow." },

  { id: "frame-purpose-match", d: 3, type: "match", title: "Match 802.11 frames to their purpose",
    prompt: "While reviewing a capture you see the following frame subtypes. Match each frame to its purpose.",
    pairs: [
      ["Beacon", "Advertises the BSS, its capabilities and the TIM at a regular interval"],
      ["ACK", "Confirms that a single unicast frame arrived intact"],
      ["RTS", "Reserves the medium by setting the NAV of stations that hear it"],
      ["Null data", "Signals the client's power-save state without carrying a payload"],
      ["Deauthentication", "Notifies a station that its authentication has ended"],
      ["Block Ack", "Acknowledges a group of frames from an A-MPDU in one response"]
    ],
    extra: ["Assigns an IP address to the client", "Measures the noise floor of the channel"],
    explain: "Beacons are management frames that announce the BSS and carry the TIM for dozing clients. ACK, RTS and Block Ack are control frames: ACK confirms one unicast frame, RTS uses its Duration field to reserve airtime through other stations' NAV, and Block Ack confirms many aggregated frames at once. Null data frames are data frames with no body, commonly used to set the power management bit. Deauthentication is a management notification, not a request, which is why 802.11w protects it. IP addressing comes from DHCP, not an 802.11 frame." },

  { id: "poe-budget-fill", d: 4, type: "fill", title: "Plan PoE for a new AP deployment",
    prompt: "You are planning 802.3at (PoE+) Class 4 APs on an access switch with a 370 W total PoE budget that allocates each port the full class maximum. Fill in:",
    fields: [
      { label: "Maximum power per port at the PSE under 802.3af (W)", answers: ["15.4", "15.4w", "15.4 w"] },
      { label: "Maximum power per port at the PSE under 802.3at Class 4 (W)", answers: ["30", "30w", "30 w"] },
      { label: "Power guaranteed at the powered device under 802.3at (W)", answers: ["25.5", "25.5w", "25.5 w"] },
      { label: "Number of Class 4 APs the switch can power at full allocation", answers: ["12"] }
    ],
    explain: "802.3af supplies up to 15.4 W at the switch (PSE), of which 12.95 W is guaranteed at the device after cable loss. 802.3at Class 4 supplies up to 30 W at the PSE and guarantees 25.5 W at the powered device. With a 370 W budget and 30 W reserved per AP, 370 / 30 = 12.3, so only 12 APs can be powered; round down, because a partial AP cannot be powered. Tri-radio or 4x4 APs may need 802.3bt, so check each AP's power draw during design." },

  { id: "security-choice-match", d: 5, type: "match", title: "Choose the right WLAN security method",
    prompt: "Match each organization's requirement to the security method that best meets it.",
    pairs: [
      ["Coffee shop wants over-the-air encryption on a network with no password", "Enhanced Open (OWE)"],
      ["Small office wants a shared passphrase that resists offline dictionary attacks on a captured handshake", "WPA3-Personal (SAE)"],
      ["Clinic wants per-user username and password logins, protected inside a tunnel built from a server certificate", "PEAP-MSCHAPv2"],
      ["Bank wants mutual certificate authentication with no user passwords at all", "EAP-TLS"],
      ["Campus wants to stop spoofed deauthentication frames from disconnecting clients", "Protected Management Frames (802.11w)"]
    ],
    extra: ["WEP with shared key authentication", "MAC address filtering"],
    explain: "OWE gives each client unique encryption keys on an open network without authentication. SAE replaces the WPA2 PSK exchange with a password-authenticated key exchange, so a captured handshake cannot be brute-forced offline. PEAP needs only a server certificate and carries user credentials inside the TLS tunnel, while EAP-TLS requires certificates on both the server and every client. PMF (802.11w) cryptographically protects deauthentication and disassociation frames. WEP and MAC filtering are legacy measures that provide no meaningful protection." },

  { id: "validation-survey-select", d: 6, type: "select", title: "Find APs that fail the validation survey",
    prompt: "The design requires primary signal of -67 dBm or better, SNR of at least 25 dB, retries below 10% and channel utilization below 50%. Select every AP whose area fails at least one requirement.",
    context: "Post-installation validation survey (5 GHz, worst reading in each AP's coverage area)\nAP       Ch   Signal   Noise   SNR   Retry   ChUtil\nAP-101   36   -62 dBm  -92 dBm  30 dB   4%     22%\nAP-102   52   -71 dBm  -93 dBm  22 dB   6%     18%\nAP-103  149   -64 dBm  -90 dBm  26 dB  17%     35%\nAP-104  100   -60 dBm  -80 dBm  20 dB   8%     30%\nAP-105   44   -66 dBm  -94 dBm  28 dB   5%     61%\nAP-106  157   -58 dBm  -95 dBm  37 dB   3%     25%\nAP-107   60   -67 dBm  -93 dBm  26 dB   9%     49%",
    options: ["AP-101", "AP-102", "AP-103", "AP-104", "AP-105", "AP-106", "AP-107"],
    answers: [1, 2, 3, 4],
    explain: "AP-102 fails both signal (-71 dBm is weaker than -67) and SNR (22 dB). AP-103 has good signal but 17% retries. AP-104 has a strong -60 dBm signal but a high -80 dBm noise floor, so SNR is only 20 dB; a strong RSSI alone does not guarantee a usable link. AP-105 exceeds 50% channel utilization. AP-107 sits exactly on the thresholds (-67 dBm, 26 dB, 9%, 49%) and passes, and AP-101 and AP-106 pass comfortably." },

  { id: "symptom-cause-match", d: 6, type: "match", title: "Match troubleshooting symptoms to likely causes",
    prompt: "Match each symptom observed during troubleshooting to its most likely cause.",
    pairs: [
      ["Spectrum analyzer shows a wide 2.4 GHz energy hump near channels 9-11 with a roughly 50% duty cycle, only at lunchtime near the break room", "Microwave oven interference"],
      ["Clients show strong signal from the AP, but the AP hears them weakly and uplink retries are high", "AP and client transmit power mismatch"],
      ["A laptop stays associated to a distant AP at -80 dBm while a nearby AP is heard at -55 dBm", "Sticky client"],
      ["Clients at opposite ends of a warehouse cannot hear each other and their frames collide at the AP", "Hidden node"],
      ["One device's 4-way handshake stops after message 2 on every attempt", "Incorrect passphrase"],
      ["Clients complete 802.1X authentication but receive 169.254.x.x addresses", "DHCP or VLAN misconfiguration"]
    ],
    extra: ["Co-channel contention", "Expired RADIUS server certificate"],
    explain: "Microwave ovens leak wideband energy in the upper 2.4 GHz band with a duty cycle tied to the mains cycle. An AP set to high power reaches clients that transmit at much lower power, so the uplink fails first. The client, not the AP, decides when to roam, so a sticky client clings to a weak AP. Hidden nodes cannot sense each other's transmissions, and RTS/CTS or smaller cells help. With a wrong PSK the AP finds a bad MIC in message 2 and never sends message 3. APIPA addresses after successful authentication point to DHCP or the wrong VLAN, not to Wi-Fi security; an expired RADIUS certificate would fail during EAP, before any 4-way handshake." },

  { id: "troubleshoot-order", d: 6, type: "order", title: "Order a structured troubleshooting process",
    prompt: "Users report intermittent drops on the warehouse WLAN. Put the steps of a structured troubleshooting methodology in order.",
    steps: [
      "Identify the problem by collecting symptoms from users and help desk tickets",
      "Determine the scale: which users, devices, areas and times are affected",
      "Reproduce the problem and isolate the cause with spectrum and protocol analysis",
      "Plan a corrective action and assess its impact",
      "Implement the corrective action during an approved window",
      "Verify the fix with a survey or capture and confirm with users",
      "Document the problem, the cause and the solution"
    ],
    explain: "Structured troubleshooting starts by defining the problem and its scope, because knowing whether one client or a whole floor is affected points to different causes. You then reproduce and isolate the fault before changing anything, plan and implement the fix, and verify that it actually solved the problem. Documentation comes last so the next engineer can learn from the root cause and the change that fixed it." }
]);
