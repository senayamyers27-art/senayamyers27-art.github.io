/* Performance-based simulations for CompTIA A+ Core 1 (220-1201). */
CertHub.addPbqs("a-plus-core1", [
  { id: "mobile-connect-match", d: 1, type: "match", title: "Pick the mobile connection method",
    prompt: "A help desk ticket queue contains these user requests. Match each request to the technology or feature that meets it.",
    pairs: [
      ["Pay at a store checkout by holding the phone near the terminal", "NFC"],
      ["Connect a pair of wireless earbuds to a phone", "Bluetooth"],
      ["Let three coworkers' laptops share the phone's 5G data over Wi-Fi", "Mobile hotspot"],
      ["Share the phone's cellular data with one laptop over a charging cable", "USB tethering"],
      ["Activate a carrier plan on a new phone without inserting a card", "eSIM"],
      ["Erase company data on a phone that was lost in a taxi", "MDM remote wipe"]
    ],
    extra: ["Airplane mode", "Infrared (IrDA)"],
    explain: "NFC works only at a few centimeters, which is why tap-to-pay uses it; Bluetooth is the short-range personal-area link for headsets and earbuds. A hotspot shares cellular data to several devices over Wi-Fi, while tethering usually means a single device over USB (or Bluetooth). An eSIM is a programmable embedded SIM activated by QR code or carrier app, and remote wipe is an MDM policy action pushed to an enrolled device. Airplane mode disables radios rather than providing a connection."
  },
  { id: "laptop-battery-order", d: 1, type: "order", title: "Replace an internal laptop battery",
    prompt: "A user's laptop battery holds a charge for only 20 minutes. Put the replacement steps in the correct order.",
    steps: [
      "Look up the model's service manual and order the exact vendor-specified battery",
      "Shut the laptop down completely and unplug the AC adapter",
      "Put on an ESD strap and remove the bottom cover screws",
      "Disconnect the battery cable from the motherboard before touching other components",
      "Remove the old battery and install the new one, reconnecting its cable",
      "Reattach the cover, connect AC power and verify the battery charges and reports its health"
    ],
    explain: "Research comes first so you have the right part and know the disassembly order. The system must be fully off and unplugged before opening it, and the internal battery is disconnected as soon as it is reachable so nothing inside is live while you work. Verifying that the OS detects the new battery and that it charges closes the job, just like the final step of any repair."
  },
  { id: "firewall-ports-match", d: 2, type: "match", title: "Open the right firewall ports",
    prompt: "You are filling in a firewall change request for an office. Match each service to the default TCP/UDP port(s) it needs.",
    pairs: [
      ["SMTP (sending mail between servers)", "25"],
      ["DNS name resolution", "53"],
      ["DHCP address assignment", "67/68"],
      ["POP3 mail retrieval", "110"],
      ["IMAP mail retrieval", "143"],
      ["LDAP directory queries", "389"],
      ["SMB file sharing", "445"],
      ["Remote Desktop Protocol", "3389"]
    ],
    extra: ["23", "161/162", "993"],
    explain: "These are the default ports CompTIA expects you to recall: SMTP 25, DNS 53, DHCP 67 (server) and 68 (client), POP3 110, IMAP 143, LDAP 389, SMB 445 and RDP 3389. The distractors are Telnet (23), SNMP (161/162) and IMAP over TLS (993). A common mix-up is POP3 and IMAP: POP3 is the lower number (110) and typically downloads mail, while IMAP (143) keeps mail synchronized on the server."
  },
  { id: "subnet-27-fill", d: 2, type: "fill", title: "Work out a /27 subnet",
    prompt: "A printer is configured with 192.168.50.100/27. Fill in the subnet details.",
    fields: [
      { label: "Subnet mask (dotted decimal)", answers: ["255.255.255.224"] },
      { label: "Network address", answers: ["192.168.50.96"] },
      { label: "Broadcast address", answers: ["192.168.50.127"] },
      { label: "First usable host", answers: ["192.168.50.97"] },
      { label: "Last usable host", answers: ["192.168.50.126"] },
      { label: "Number of usable hosts", answers: ["30"] }
    ],
    explain: "A /27 borrows 3 bits in the last octet, giving a mask of 255.255.255.224 and blocks of 32 addresses (0, 32, 64, 96, 128...). The address .100 falls in the block that starts at .96, so the network is .96 and the broadcast is .127. Removing the network and broadcast addresses leaves 32 - 2 = 30 usable hosts, .97 through .126."
  },
  { id: "wifi-5ghz-select", d: 2, type: "select", title: "Which Wi-Fi standards use 5 GHz?",
    prompt: "A client wants to put all laptops on the less crowded 5 GHz band. Using the inventory below, select every 802.11 standard that can operate in the 5 GHz band.",
    context: "Device inventory (wireless adapters)\nACCT-PC01   802.11a\nACCT-PC02   802.11b\nLOBBY-KSK   802.11g\nSALES-LT03  802.11n (Wi-Fi 4)\nSALES-LT04  802.11ac (Wi-Fi 5)\nENG-LT07    802.11ax (Wi-Fi 6)",
    options: ["802.11a", "802.11b", "802.11g", "802.11n (Wi-Fi 4)", "802.11ac (Wi-Fi 5)", "802.11ax (Wi-Fi 6)"],
    answers: [0, 3, 4, 5],
    explain: "802.11a was 5 GHz only, 802.11n supports both 2.4 and 5 GHz, 802.11ac is 5 GHz only, and 802.11ax works in 2.4 and 5 GHz (Wi-Fi 6E adds 6 GHz). 802.11b and 802.11g are 2.4 GHz only, so those two adapters would need to be replaced to join a 5 GHz-only network."
  },
  { id: "connector-match", d: 3, type: "match", title: "Identify connectors by use",
    prompt: "You are sorting a bin of cables at a branch office. Match each connector to what it is normally used for.",
    pairs: [
      ["RJ45", "Twisted-pair Ethernet to a switch"],
      ["RJ11", "Analog phone line or DSL modem"],
      ["F-type", "Coaxial cable to a cable modem"],
      ["LC", "Small-form-factor fiber-optic link"],
      ["DisplayPort", "Digital video and audio to a monitor"],
      ["SATA (7-pin data)", "Internal data link to a 2.5-inch SSD"],
      ["Molex (4-pin)", "Legacy power to older drives and fans"]
    ],
    extra: ["Serial console to a router", "Analog VGA video"],
    explain: "RJ45 is the 8-pin twisted-pair Ethernet connector, while the smaller RJ11 carries telephone and DSL. F-type screws onto coax for cable internet, and LC is a small push-latch fiber connector (SC and ST are larger). DisplayPort is a digital video/audio interface, SATA's 7-pin data cable connects internal drives, and the 4-pin Molex is the older peripheral power connector. VGA uses a 15-pin DE-15 and console cables typically use RJ45 or DB-9, which is why they are distractors here."
  },
  { id: "laser-print-order", d: 3, type: "order", title: "Laser printer imaging process",
    prompt: "A trainee needs to understand how a laser printer creates a page. Put the imaging process steps in order.",
    steps: ["Processing", "Charging", "Exposing", "Developing", "Transferring", "Fusing", "Cleaning"],
    explain: "The printer first processes the page into a raster image. The drum is then charged uniformly, the laser exposes (discharges) the image onto the drum, and toner develops onto the exposed areas. The toner is transferred to the paper, fused with heat and pressure, and finally the drum is cleaned of leftover toner and charge. Knowing the order helps you map defects: toner that smears points to fusing, and repeating images point to cleaning or the drum."
  },
  { id: "raid-capacity-fill", d: 3, type: "fill", title: "Calculate RAID capacity",
    prompt: "A small office NAS has four identical 4 TB drives. Fill in the usable capacity (in TB) for each RAID level, and the minimum drive count for RAID 5.",
    fields: [
      { label: "RAID 0 usable TB", answers: ["16", "16 TB", "16TB"] },
      { label: "RAID 5 usable TB", answers: ["12", "12 TB", "12TB"] },
      { label: "RAID 6 usable TB", answers: ["8", "8 TB", "8TB"] },
      { label: "RAID 10 usable TB", answers: ["8", "8 TB", "8TB"] },
      { label: "Minimum drives for RAID 5", answers: ["3", "three"] }
    ],
    explain: "RAID 0 stripes across all drives with no redundancy, so you get the full 4 x 4 = 16 TB. RAID 5 gives up one drive's worth of space to parity (12 TB) and needs at least three drives. RAID 6 uses two drives' worth for dual parity (8 TB) and survives two failures, and RAID 10 mirrors pairs of drives and stripes across them, so half the raw space (8 TB) is usable."
  },
  { id: "cloud-model-match", d: 4, type: "match", title: "Match cloud models and characteristics",
    prompt: "A manager is reviewing a cloud proposal. Match each description to the cloud term it describes.",
    pairs: [
      ["We rent virtual machines and still patch the guest operating systems ourselves", "IaaS"],
      ["Developers upload code to a managed runtime and never touch the OS", "PaaS"],
      ["Staff use a browser-based email and office suite", "SaaS"],
      ["Our on-site private cloud bursts to a public provider at month-end", "Hybrid cloud"],
      ["Several regional hospitals share infrastructure built for their compliance rules", "Community cloud"],
      ["Web servers are added automatically as traffic spikes and removed afterward", "Rapid elasticity"],
      ["The invoice charges only for compute hours actually used", "Metered utilization"]
    ],
    extra: ["Public cloud", "High availability"],
    explain: "In IaaS the provider runs the hardware and hypervisor but you manage the OS and above; PaaS also hides the OS so you manage only code and data; SaaS delivers a finished application. Hybrid combines private and public clouds, while a community cloud is shared by organizations with common requirements. Rapid elasticity is automatic scaling up and down, and metered utilization means pay-per-use billing."
  },
  { id: "hyperv-host-select", d: 4, type: "select", title: "Can this PC host the VMs?",
    prompt: "A technician wants this desktop to run two Windows 11 test VMs in Hyper-V, each assigned 4 GB of RAM, at the same time. Review the systeminfo output and select every problem that must be fixed first.",
    context: "OS Name:                   Microsoft Windows 11 Pro\nOS Version:                10.0.22631 N/A Build 22631\nSystem Type:               x64-based PC\nProcessor(s):              1 Processor(s) Installed.\n                           [01]: Intel64 Family 6 Model 154 ~2400 Mhz\nTotal Physical Memory:     4,096 MB\nAvailable Physical Memory: 1,212 MB\nHyper-V Requirements:      VM Monitor Mode Extensions: Yes\n                           Virtualization Enabled In Firmware: No\n                           Second Level Address Translation: Yes\n                           Data Execution Prevention Available: Yes\n\nC:\\> fsutil volume diskfree C:\nTotal free bytes  : 193,273,528,320 (180.0 GB)",
    options: [
      "Hardware virtualization is disabled in UEFI/BIOS",
      "The host does not have enough RAM for the two VMs",
      "The CPU does not support Second Level Address Translation",
      "Data Execution Prevention is not available",
      "Windows 11 Pro does not include Hyper-V",
      "There is not enough free disk space for two VM disks"
    ],
    answers: [0, 1],
    explain: "\"Virtualization Enabled In Firmware: No\" means Intel VT-x must be turned on in UEFI setup before Hyper-V can run. The host has only 4 GB total, yet the two VMs need 8 GB plus memory for the host OS, so RAM must be upgraded. SLAT and DEP are reported as available, Windows 11 Pro (unlike Home) includes Hyper-V, and 180 GB free is enough for two typical test VM disks."
  },
  { id: "troubleshoot-method-order", d: 5, type: "order", title: "CompTIA troubleshooting methodology",
    prompt: "A user reports their workstation randomly reboots. Put the CompTIA troubleshooting methodology steps in the correct order.",
    steps: [
      "Identify the problem by questioning the user and noting recent changes",
      "Establish a theory of probable cause (question the obvious)",
      "Test the theory to determine the cause",
      "Establish a plan of action to resolve the problem and implement the solution",
      "Verify full system functionality and, if applicable, implement preventive measures",
      "Document findings, actions and outcomes"
    ],
    explain: "CompTIA's six-step method starts by gathering information and backing up data where needed, then forms and tests a theory. If the theory is not confirmed, you form a new one or escalate. Only after the cause is confirmed do you plan and implement the fix, then verify the whole system works and prevent a repeat. Documentation is always last so the record reflects what actually solved the issue."
  },
  { id: "apipa-ipconfig-select", d: 5, type: "select", title: "Read ipconfig output for a no-internet ticket",
    prompt: "A user says they cannot reach any websites or shares. Review the ipconfig /all output and select every statement that is true.",
    context: "Ethernet adapter Ethernet:\n\n   Connection-specific DNS Suffix  . :\n   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM\n   Physical Address. . . . . . . . . : 00-1A-2B-3C-4D-5E\n   DHCP Enabled. . . . . . . . . . . : Yes\n   Autoconfiguration Enabled . . . . : Yes\n   Autoconfiguration IPv4 Address. . : 169.254.23.118(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . . . . . :\n   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1",
    options: [
      "The PC assigned itself an APIPA address because it did not get a DHCP lease",
      "The adapter has a physical link, since it is not reporting \"Media disconnected\"",
      "The PC can reach other subnets through its default gateway",
      "A DHCP server handed out the 169.254.23.118 lease",
      "The adapter is configured with a static IP address",
      "Once DHCP connectivity is restored, ipconfig /renew should obtain a valid address"
    ],
    answers: [0, 1, 5],
    explain: "An address in 169.254.0.0/16 labeled Autoconfiguration means Windows gave up waiting for DHCP and used APIPA; DHCP servers never hand out this range, and DHCP Enabled: Yes shows it is not static. The adapter would show Media disconnected if there were no link, so the fault is between the PC and the DHCP server (switch port, VLAN, scope exhausted or server down). With no default gateway it cannot leave the local segment, and ipconfig /renew will get a proper lease once DHCP is reachable."
  },
  { id: "symptom-cause-match", d: 5, type: "match", title: "Match symptoms to likely causes",
    prompt: "Match each reported symptom to its most likely cause.",
    pairs: [
      ["Loud clicking from the tower, then very slow file access and read errors", "Failing hard disk drive"],
      ["Date and time reset every time the PC is unplugged overnight", "Depleted CMOS battery"],
      ["Printed text smudges and rubs off the page when touched", "Faulty fuser assembly"],
      ["A faint copy of the image repeats lower down the page", "Drum not being cleaned properly (ghosting)"],
      ["Laptop touchpad is lifting and the case is separating", "Swollen lithium-ion battery"],
      ["PC shuts off after 10 minutes of gaming and fans are very loud", "Overheating from a dust-clogged heat sink"],
      ["No power, no fans, and a burning smell from the back of the case", "Failed power supply"]
    ],
    extra: ["Low toner", "Faulty RAM module"],
    explain: "Clicking plus read errors is the classic sign of a failing mechanical drive, so back up data immediately. Lost time and date points to the CMOS battery, toner that rubs off means the fuser is not melting it into the paper, and ghost images mean residual toner or charge is left on the drum. A bulging touchpad or case means a swollen battery that must be removed safely, heavy-load shutdowns with loud fans mean overheating, and a burning smell with no power points to the PSU. Low toner causes faded prints rather than smears."
  }
]);
