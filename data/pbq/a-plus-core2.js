CertHub.addPbqs("a-plus-core2", [
  { id: "cmd-tool-match", d: 1, type: "match", title: "Match Windows commands to support tasks",
    prompt: "A help desk ticket queue lists the tasks below. Match each task to the Windows command-line tool that performs it.",
    pairs: [
      ["Repair protected system files that were corrupted or replaced", "sfc /scannow"],
      ["Repair the Windows component store image before running a file check", "DISM /Online /Cleanup-Image /RestoreHealth"],
      ["Apply newly changed Group Policy settings without a reboot", "gpupdate /force"],
      ["Show which Group Policy objects were applied to the current user", "gpresult /r"],
      ["Copy a folder tree with retries and mirror it to a new file server", "robocopy"],
      ["Scan a volume for file system errors and bad sectors", "chkdsk /r"]
    ],
    extra: ["diskpart", "netstat -ano"],
    explain: "sfc checks and restores protected system files, while DISM repairs the component store that sfc copies clean files from, so run DISM first when sfc cannot fix things. gpupdate applies policy and gpresult reports what was applied. robocopy is the robust copy tool that supports retries and /MIR mirroring, and chkdsk /r finds bad sectors and fixes file system errors. diskpart manages partitions and netstat shows connections, so neither fits these tasks." },

  { id: "ipconfig-read", d: 1, type: "fill", title: "Read ipconfig /all output",
    prompt: "A user says they cannot reach websites. Read the ipconfig /all output and fill in the values.",
    context: "Ethernet adapter Ethernet:\n   Connection-specific DNS Suffix  . : corp.example.com\n   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM\n   Physical Address. . . . . . . . . : 3C-52-82-1A-4F-9B\n   DHCP Enabled. . . . . . . . . . . : Yes\n   Autoconfiguration Enabled . . . . : Yes\n   Autoconfiguration IPv4 Address. . : 169.254.23.118(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . . . . . :\n   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1",
    fields: [
      { label: "IPv4 address the PC is using", answers: ["169.254.23.118"] },
      { label: "Name of this address type (four letters)", answers: ["APIPA"] },
      { label: "MAC address of the adapter", answers: ["3C-52-82-1A-4F-9B", "3c:52:82:1a:4f:9b", "3c52821a4f9b"] },
      { label: "Command to request a new lease after fixing the DHCP problem", answers: ["ipconfig /renew", "ipconfig/renew"] }
    ],
    explain: "A 169.254.x.x address with no default gateway is an APIPA (Automatic Private IP Addressing) self-assigned address, which Windows uses when DHCP is enabled but no DHCP server answers. The host can only talk to other APIPA hosts on the same segment, so web access fails. Check cabling, the switch port and the DHCP server, then run ipconfig /release and ipconfig /renew to get a real lease." },

  { id: "filesystem-match", d: 1, type: "match", title: "Choose the right file system",
    prompt: "Match each storage scenario to the most appropriate file system.",
    pairs: [
      ["Windows 11 system drive that needs BitLocker and NTFS permissions", "NTFS"],
      ["128 GB USB drive that must move 20 GB video files between a Mac and a Windows PC", "exFAT"],
      ["Internal SSD in a new MacBook running current macOS", "APFS"],
      ["Root partition on an Ubuntu server", "ext4"],
      ["Old 8 GB flash drive for a device that only supports files under 4 GB", "FAT32"]
    ],
    extra: ["ReFS", "HFS+"],
    explain: "NTFS is the Windows system file system and supports permissions, encryption and BitLocker. exFAT is read and written natively by both Windows and macOS and has no 4 GB file size limit, unlike FAT32, which is kept for maximum compatibility with older devices. APFS is the default for modern macOS on SSDs, and ext4 is the common default for Linux distributions such as Ubuntu. ReFS is aimed at Windows server storage resiliency, not these scenarios." },

  { id: "malware-removal-order", d: 2, type: "order", title: "Malware removal procedure",
    prompt: "A user's PC shows pop-ups and a browser redirecting to unknown search pages. Put the CompTIA best-practice malware removal steps in order.",
    steps: [
      "Investigate and verify the malware symptoms",
      "Quarantine the infected system from the network",
      "Disable System Restore in Windows",
      "Remediate: update anti-malware definitions and run scans and removal",
      "Schedule scans and run updates",
      "Enable System Restore and create a new restore point",
      "Educate the end user"
    ],
    explain: "You first confirm it really is malware, then isolate the machine so it cannot spread. System Restore is disabled before cleaning so infected restore points cannot reinfect the system later. After remediation and scheduled scans, System Restore is turned back on with a fresh, clean restore point, and finally the user is taught how to avoid the infection next time." },

  { id: "malware-symptom-match", d: 2, type: "match", title: "Identify malware types from symptoms",
    prompt: "Match each observed symptom to the malware type it most likely indicates.",
    pairs: [
      ["Files on a mapped share are renamed with a .locked extension and a note demands payment", "Ransomware"],
      ["A free game installer also opened a hidden remote access connection", "Trojan"],
      ["Antivirus cannot see a process that clearly uses CPU; the malware loads before the OS", "Rootkit"],
      ["A security audit finds every typed password being written to a hidden file", "Keylogger"],
      ["The PC sends spam and joins attacks when commanded by a remote server", "Botnet"]
    ],
    extra: ["Adware", "Spyware"],
    explain: "Ransomware encrypts data and demands payment. A Trojan hides malicious code inside something the user wants to install. Rootkits hide at a low level, sometimes loading before the operating system, so normal tools cannot see them. Keyloggers record keystrokes, and a botnet member (zombie) takes orders from a command-and-control server. Adware shows unwanted ads and spyware watches user activity more broadly, but neither is the best fit here." },

  { id: "logon-failure-log", d: 2, type: "select", title: "Spot a brute-force attempt in Event Viewer",
    prompt: "Review the filtered Windows Security log from a reception PC. Select every entry that is evidence of a brute-force attempt against a local account.",
    context: "Time      Event ID  Account        Source workstation  Logon type  Status\n08:01:12  4624      jsmith         RECEPT-01           2           Success\n08:14:40  4625      Administrator  192.168.1.77        3           Bad password\n08:14:41  4625      Administrator  192.168.1.77        3           Bad password\n08:14:42  4625      Administrator  192.168.1.77        3           Bad password\n08:14:43  4740      Administrator  -                   -           Account locked out\n09:02:05  4625      jsmith         RECEPT-01           2           Bad password\n09:02:15  4624      jsmith         RECEPT-01           2           Success\n12:30:00  4634      jsmith         RECEPT-01           2           Logoff",
    options: [
      "08:01:12 4624 jsmith interactive success",
      "08:14:40 4625 Administrator from 192.168.1.77",
      "08:14:41 4625 Administrator from 192.168.1.77",
      "08:14:42 4625 Administrator from 192.168.1.77",
      "08:14:43 4740 Administrator account locked out",
      "09:02:05 4625 jsmith single typo at the console",
      "09:02:15 4624 jsmith interactive success",
      "12:30:00 4634 jsmith logoff"
    ],
    answers: [1, 2, 3, 4],
    explain: "Event 4625 is a failed logon and 4740 is an account lockout. Three failures one second apart against Administrator over the network (logon type 3) from another host, followed by a lockout, is a scripted guessing pattern. A single failed console logon (type 2) followed by a success a few seconds later is a normal typo, and 4624 and 4634 are routine logon and logoff events." },

  { id: "phone-slow-select", d: 3, type: "select", title: "Mobile device possibly compromised",
    prompt: "A user's company Android phone has become slow. Review the battery and data usage summary and select every item that suggests a malicious or unwanted app.",
    context: "Battery use since full charge (6 h):\n  Screen                 18%\n  FlashLight Pro (sideloaded APK, installed 2 days ago)  41%\n  Mail                    9%\n  Maps                    6%\nMobile data this month:\n  FlashLight Pro          3.8 GB  (background: 3.7 GB)\n  YouTube                 2.1 GB  (background: 0.0 GB)\n  Mail                    120 MB\nPermissions for FlashLight Pro: Camera, SMS, Contacts, Location (always), Device admin",
    options: [
      "FlashLight Pro uses 41% of the battery",
      "FlashLight Pro sent 3.7 GB of data in the background",
      "FlashLight Pro was sideloaded rather than installed from the managed app store",
      "FlashLight Pro holds SMS, Contacts and Device admin permissions",
      "YouTube used 2.1 GB of mobile data in the foreground",
      "The screen accounts for 18% of battery use"
    ],
    answers: [0, 1, 2, 3],
    explain: "High battery drain, heavy background data use, installation from an untrusted source and permissions far beyond what a flashlight needs are all classic signs of a malicious app. The fix is to revoke device admin, uninstall the app, scan the device and report it per policy. Foreground YouTube streaming explains its data use, and the screen being a top battery consumer is normal." },

  { id: "symptom-fix-match", d: 3, type: "match", title: "Match Windows problems to first fixes",
    prompt: "Match each Windows symptom to the most appropriate first troubleshooting step.",
    pairs: [
      ["Stop errors started right after a new graphics driver was installed", "Roll back the driver in Device Manager"],
      ["The PC takes five minutes to reach a usable desktop after login", "Disable unneeded startup apps in Task Manager"],
      ["An application crashes on launch after a failed update", "Repair or reinstall the application"],
      ["Windows will not boot after an update and Safe Mode also fails", "Use Startup Repair from the Windows Recovery Environment"],
      ["Only one user's profile loads a temporary desktop", "Rebuild the user profile"]
    ],
    extra: ["Reimage the PC immediately", "Replace the hard drive"],
    explain: "A problem that starts right after a driver change points to that driver, so roll it back. Slow logons are often caused by too many startup items. A single broken application is repaired or reinstalled, a system that will not boot uses WinRE tools such as Startup Repair or uninstalling the update, and a temporary profile issue affects one user and is fixed by rebuilding that profile. Reimaging or replacing hardware comes later, after less disruptive steps fail." },

  { id: "change-mgmt-order", d: 4, type: "order", title: "Change management workflow",
    prompt: "IT needs to upgrade the accounting server's operating system. Put the change management steps in order.",
    steps: [
      "Submit a change request describing the purpose and scope",
      "Perform a risk analysis and write a backout plan",
      "Obtain approval from the change advisory board",
      "Implement the change during the scheduled maintenance window",
      "Confirm end-user acceptance that the system works",
      "Document the change and close the request"
    ],
    explain: "Change management starts with a formal request that states why the change is needed and what it affects. Risk analysis and a backout plan are prepared so the change advisory board (CAB) can make an informed decision. Only an approved change is implemented, in an agreed window, and users confirm it works before the change is documented and closed." },

  { id: "backup-restore-fill", d: 4, type: "fill", title: "Calculate backup sets for a restore",
    prompt: "A file server's drive fails on Thursday morning before that night's backup runs. Use the backup schedule to fill in how many backup sets must be restored.",
    context: "Backup schedule (runs at 23:00):\nSunday     Full backup\nMonday     Daily job\nTuesday    Daily job\nWednesday  Daily job\nThursday   Daily job (not yet run)",
    fields: [
      { label: "Sets to restore if the daily jobs are incremental", answers: ["4", "four"] },
      { label: "Sets to restore if the daily jobs are differential", answers: ["2", "two"] },
      { label: "Which daily type takes longer to back up each night as the week goes on (incremental or differential)", answers: ["differential"] }
    ],
    explain: "Incremental backups only copy changes since the last backup of any kind, so a restore needs the full backup plus every incremental after it: Sunday, Monday, Tuesday and Wednesday, four sets. A differential copies all changes since the last full backup, so you need only Sunday's full and Wednesday's differential, two sets. That is why differentials grow larger and slower each night while restoring them is faster." }
]);
