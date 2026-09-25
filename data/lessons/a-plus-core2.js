/* Lessons for CompTIA A+ Core 2 (220-1202): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("a-plus-core2", [
 {
  "t": "OS types and purposes: Windows, macOS, Linux, ChromeOS, iOS/iPadOS, Android; vendor life cycles and end-of-life",
  "body": [
   "An operating system (OS) is the software layer that sits between hardware and the programs you run. It manages memory, schedules the CPU, talks to devices through drivers, stores files and enforces who may do what. As a support technician you will meet several operating systems every week, and the A+ exam expects you to know what each one is for, who makes it and how it is kept up to date.",
   "Desktop and laptop operating systems come first. Microsoft Windows dominates business desktops because of its huge software catalog and its tight integration with Active Directory domains. Apple macOS runs only on Apple Mac hardware and is popular with creative and development teams. Linux is a family of open-source distributions (Ubuntu, Fedora, Debian, Red Hat Enterprise Linux and many more) built on the Linux kernel; it runs most web servers, many network appliances and plenty of developer workstations. ChromeOS, from Google, is a lightweight, browser-centred OS on Chromebooks; it is cheap to manage, keeps most data in the cloud and is common in schools.",
   "Mobile operating systems are the second group. Apple iOS runs on iPhone and iPadOS on iPad; both are closed, and apps normally come only from the App Store. Google Android is based on the Linux kernel and is licensed to many phone makers (Samsung, Google Pixel, Motorola and others), who each add their own customizations. That diversity is why Android update timing varies by manufacturer and carrier, while Apple ships updates to all supported devices at once.",
   "Every vendor publishes a life cycle for its products. During mainstream support the product receives new features, bug fixes and security patches. Some vendors then offer an extended period with security fixes only. At end-of-life (EOL), sometimes called end of support, the vendor stops issuing patches entirely. The software keeps working, but every newly discovered vulnerability stays open forever, and compliance frameworks usually forbid running it on systems that handle sensitive data. Mobile devices reach EOL when the vendor stops shipping OS updates to that model, which often happens while the hardware still works fine.",
   "In practice, EOL drives planning. Before a product's support ends you budget for upgrades, test applications on the newer version and schedule the migration. If a legacy system truly cannot be upgraded, you isolate it on its own network segment, restrict who can reach it and document the accepted risk. Also remember compatibility: an app written for Windows will not run natively on macOS, and an Android APK will not install on an iPhone, so the right OS depends on the software the user needs.",
   "Finally, know the update channels. Windows uses Windows Update, macOS uses Software Update in System Settings, Linux distributions use their package managers, ChromeOS updates itself automatically in the background, and phones use over-the-air (OTA) updates."
  ],
  "terms": [
   [
    "Operating system (OS)",
    "Software that manages hardware resources and provides services and an interface for applications and users."
   ],
   [
    "End-of-life (EOL)",
    "The date after which a vendor no longer provides security patches or support for a product."
   ],
   [
    "Open source",
    "Software whose source code is publicly available to inspect, modify and redistribute under its license, as with the Linux kernel and Android's core."
   ],
   [
    "Over-the-air (OTA) update",
    "An OS or firmware update delivered wirelessly to a mobile device."
   ],
   [
    "ChromeOS",
    "Google's lightweight, cloud-focused OS for Chromebooks, centred on the Chrome browser and web apps."
   ]
  ],
  "example": "A dental office still runs an imaging program on a Windows PC whose OS version has reached end of support. The vendor of the imaging software certifies a newer version on a supported Windows release, so the technician schedules the upgrade after hours; until then the old PC is moved to an isolated network segment with no internet access.",
  "tip": "EOL does not mean the OS stops working; it means no more security patches. Exam answers about EOL systems usually point to upgrading, replacing or isolating them.",
  "check": [
   [
    "Why do Android phones from different manufacturers receive OS updates at different times, while iPhones update together?",
    "Android is licensed to many manufacturers who customize it and push updates on their own schedules (often with carriers); Apple controls both iOS and the hardware, so it releases updates to all supported models at once."
   ],
   [
    "What is the main risk of keeping an end-of-life OS in production?",
    "It no longer receives security patches, so any newly discovered vulnerability stays exploitable and the system may violate compliance requirements."
   ],
   [
    "A school wants inexpensive laptops that are easy to manage centrally and keep data in the cloud. Which OS fits best?",
    "ChromeOS on Chromebooks, because it is lightweight, updates automatically and is built around cloud accounts and web apps."
   ]
  ]
 },
 {
  "t": "File systems: NTFS, ReFS, FAT32, exFAT, ext4, XFS, APFS and their limits",
  "body": [
   "A file system is the set of rules an operating system uses to organize data on a storage device: how files are named, where their pieces live on disk, what metadata (dates, owners, permissions) is kept and how free space is tracked. When you format a drive you choose a file system, and that choice decides which operating systems can read it, how large files can be and which security features are available.",
   "NTFS (New Technology File System) is the standard for Windows system drives. It supports file and folder permissions, encryption with EFS (Encrypting File System), compression, disk quotas and journaling, which records pending changes so the volume can recover cleanly after a crash. Its file and volume size limits are so large that they never matter for normal work. macOS can read NTFS but cannot write to it by default, and Linux support varies by distribution.",
   "ReFS (Resilient File System) is a newer Microsoft file system designed for data integrity and very large volumes. It uses checksums to detect corruption and can repair data automatically when paired with Storage Spaces mirroring. It is aimed at servers and storage pools, and it lacks some NTFS features, so you do not normally install Windows onto it.",
   "FAT32 (File Allocation Table, 32-bit) is old, simple and readable by almost everything: Windows, macOS, Linux, cameras, game consoles and car stereos. Its famous limit is a maximum file size of 4 GB (minus one byte), and Windows's built-in graphical formatting tools have traditionally offered FAT32 only for volumes up to 32 GB. It has no permissions and no journaling. exFAT (Extended FAT) was created for flash media: it removes the 4 GB file limit, supports very large volumes and is readable and writable by modern Windows and macOS, which makes it the usual choice for large USB drives and SD cards shared between those systems.",
   "On Linux, ext4 (fourth extended file system) is the common default; it is journaled and supports Linux permissions and large files. XFS is a high-performance journaled file system, the default on Red Hat Enterprise Linux and its relatives, and is well suited to large files and parallel workloads. Windows cannot read either natively.",
   "APFS (Apple File System) is the default for macOS, iOS and iPadOS. It is optimized for SSDs and supports snapshots, space sharing between volumes in one container, and strong built-in encryption. Older Macs used HFS+ (Mac OS Extended). Windows cannot read APFS without third-party tools.",
   "For the exam, match the file system to the job. Windows boot drive: NTFS. Large-file flash drive shared between Windows and Mac: exFAT. Maximum compatibility with old devices and small files: FAT32. Linux server: ext4 or XFS. Mac: APFS. Resilient Windows storage pool: ReFS."
  ],
  "terms": [
   [
    "NTFS",
    "Windows's primary journaled file system, supporting permissions, EFS encryption, compression and quotas."
   ],
   [
    "exFAT",
    "A lightweight file system for flash media without FAT32's 4 GB file limit, readable and writable by Windows and macOS."
   ],
   [
    "Journaling",
    "Recording intended changes in a log before committing them, so the file system can recover consistently after a crash or power loss."
   ],
   [
    "APFS",
    "Apple File System, the SSD-optimized default for macOS, iOS and iPadOS, with snapshots and native encryption."
   ],
   [
    "ext4",
    "The fourth extended file system, a common journaled default on Linux distributions."
   ]
  ],
  "example": "A video editor copies a 9 GB project file to a new USB stick and gets an error that the file is too large, even though the stick has 60 GB free. The stick is formatted FAT32. The technician backs up the stick's contents, reformats it as exFAT so both the editor's Windows PC and Mac can use it, and the copy succeeds.",
  "tip": "'File too large' on a drive with plenty of free space almost always means FAT32 and its 4 GB per-file limit. The fix is exFAT (for cross-platform) or NTFS (for Windows only).",
  "check": [
   [
    "Which file system would you choose for a USB drive that must hold 10 GB video files and be used on both Windows and macOS?",
    "exFAT, because it has no 4 GB file limit and both operating systems can read and write it natively."
   ],
   [
    "Which Windows file system supports per-file permissions and EFS encryption?",
    "NTFS."
   ],
   [
    "What is the default file system on current Macs and iPhones?",
    "APFS (Apple File System)."
   ]
  ]
 },
 {
  "t": "Installations and upgrades: boot methods (USB, PXE, ISO), clean vs in-place vs image deployment vs repair install, GPT vs MBR, third-party drivers",
  "body": [
   "Installing an operating system starts with getting the computer to boot the installer. The most common method is a bootable USB flash drive created from the vendor's installation media. An ISO file is a single-file image of an optical disc; you can burn it to DVD, write it to USB with a tool, or attach it directly to a virtual machine. PXE (Preboot Execution Environment, pronounced 'pixie') lets a computer boot from the network: the network card requests an address from DHCP, is pointed at a deployment server and downloads a small boot image. PXE is how organizations image dozens of machines without carrying USB sticks around. Other options include booting from an internal recovery partition or an external drive. You select the boot device in the UEFI/BIOS firmware settings or a one-time boot menu.",
   "Next, choose the installation type. A clean install wipes the target partition and installs a fresh OS; it removes old problems but also removes applications and data, so back up first. An in-place upgrade installs a newer version over the existing one and keeps files, settings and most apps; it is convenient but can carry over existing problems. Image deployment copies a prepared, standardized image (OS plus apps plus settings) onto many machines, often over PXE or from a deployment server, which gives every user an identical, tested build. A repair install (sometimes called an in-place repair) reinstalls the same Windows version over itself to replace damaged system files while keeping data and apps. Other terms you may see are a recovery partition reset and a multiboot setup, where two OSs live on separate partitions.",
   "Before installing, the disk needs a partition style. MBR (Master Boot Record) is the legacy scheme: it supports up to four primary partitions (or three plus an extended partition holding logical drives) and disks up to about 2 TB. GPT (GUID Partition Table) is the modern scheme used with UEFI firmware: it supports far larger disks, Windows allows up to 128 partitions, and it stores a backup copy of the partition table at the end of the disk. Windows 11 requires UEFI with Secure Boot capability, which means a GPT system disk. If a 4 TB disk shows only about 2 TB usable, it was initialized as MBR.",
   "Sometimes the installer cannot see the drive. That usually means the storage controller (for example a RAID or certain NVMe controllers) needs a third-party driver that is not included on the installation media. Setup offers a 'Load driver' option so you can supply the driver from a USB stick. The same idea applies after installation: download chipset, graphics and network drivers from the manufacturer if Windows Update does not supply suitable ones.",
   "Finally, check compatibility and prerequisites before any upgrade: hardware requirements, application compatibility, available disk space, and a verified backup."
  ],
  "terms": [
   [
    "PXE",
    "Preboot Execution Environment: firmware feature that lets a computer boot and load an installer or image over the network."
   ],
   [
    "In-place upgrade",
    "Installing a newer OS version over the existing one while keeping user files, settings and applications."
   ],
   [
    "GPT",
    "GUID Partition Table: modern partitioning scheme used with UEFI that supports very large disks and many partitions."
   ],
   [
    "MBR",
    "Master Boot Record: legacy partitioning scheme limited to four primary partitions and about 2 TB disks."
   ],
   [
    "Image deployment",
    "Copying a prebuilt, standardized OS image onto many computers so they are configured identically."
   ]
  ],
  "example": "An IT team must roll out 40 new laptops. Instead of installing Windows by hand on each one, they build a reference image with Windows, Office and the company VPN client, then PXE-boot each laptop and deploy the image from the deployment server. Every laptop ends up with the same tested configuration in a fraction of the time.",
  "tip": "Know the keywords: 'keep files and apps' means in-place upgrade or repair install; 'start fresh' means clean install; 'many identical machines' means image deployment; 'boot over the network' means PXE; disks over 2 TB need GPT.",
  "check": [
   [
    "During Windows Setup no drives appear on the disk selection screen. What should you try?",
    "Use 'Load driver' to supply the storage controller's third-party driver from USB, then the disk should appear."
   ],
   [
    "A user's Windows system files are damaged but they want to keep all apps and data. Which installation type fits?",
    "A repair install (in-place repair of the same version), which replaces system files while keeping apps and data."
   ],
   [
    "What partition style should a 6 TB boot disk on a UEFI system use, and why?",
    "GPT, because MBR cannot address more than about 2 TB and UEFI boot uses GPT."
   ]
  ]
 },
 {
  "t": "Windows 10/11 editions (Home, Pro, Enterprise, Education) and which features each has: BitLocker, domain join, Group Policy, Remote Desktop host",
  "body": [
   "Microsoft sells Windows 10 and Windows 11 in several editions. They share the same core, but business features are switched on only in the higher editions. The A+ exam often describes a need, such as 'the laptop must join the company domain', and asks which edition supports it, so it pays to memorize the dividing line.",
   "Windows Home is aimed at consumers. It cannot join an Active Directory domain, does not include the Local Group Policy Editor (gpedit.msc), cannot act as a Remote Desktop host (it can still connect out to other computers with the Remote Desktop client), and does not include full BitLocker management. Many Home devices offer a simpler 'Device encryption' feature when the hardware supports it, but that is not the same as full BitLocker with its management options. Home is fine for personal use and can sign in with a Microsoft account.",
   "Windows Pro adds the features a small business needs: domain join (Active Directory and Microsoft Entra ID, formerly Azure AD), Group Policy, BitLocker and BitLocker To Go, the ability to host incoming Remote Desktop connections, Hyper-V virtualization and support for business update management. Pro is the minimum edition for most corporate desktops. If a user on Home needs one of these features, you can upgrade the edition in place by entering a Pro product key, without reinstalling.",
   "Windows Enterprise is licensed to organizations through volume licensing or subscriptions. It includes everything in Pro plus advanced security and management features aimed at large fleets, such as extra application control and deployment options. Windows Education is essentially Enterprise-level functionality licensed to schools and universities. For exam purposes, treat Enterprise and Education as 'everything Pro has, and more'.",
   "Here is the summary to memorize. BitLocker: Pro, Enterprise, Education (not Home). Domain join: Pro, Enterprise, Education (not Home). Group Policy Editor: Pro, Enterprise, Education (not Home). Remote Desktop host: Pro, Enterprise, Education (not Home). Every edition can use the Remote Desktop client to connect to another computer.",
   "Also consider hardware requirements and upgrade paths. Windows 11 requires, among other things, a TPM (Trusted Platform Module) 2.0 chip, UEFI firmware with Secure Boot capability and a supported processor. Windows 10 reached end of support in October 2025, so organizations still running it need to upgrade or buy extended security updates. You can check your current edition and version with `winver` or in Settings under System > About."
  ],
  "terms": [
   [
    "Domain join",
    "Adding a computer to an Active Directory (or Entra ID) domain so it is managed centrally and users sign in with domain accounts."
   ],
   [
    "Group Policy",
    "A centralized way to push configuration and security settings to users and computers; the local editor is gpedit.msc."
   ],
   [
    "Remote Desktop host",
    "A computer that accepts incoming Remote Desktop Protocol (RDP) connections; not available on Home editions."
   ],
   [
    "BitLocker",
    "Windows full-volume encryption, available in Pro, Enterprise and Education editions."
   ],
   [
    "Edition upgrade",
    "Changing, for example, Home to Pro by entering a new product key, keeping apps and data."
   ]
  ],
  "example": "A new employee brings a laptop bought at a retail store to work, and the technician cannot find the option to join it to the company domain. Checking Settings > System > About shows Windows 11 Home. The technician purchases a Pro upgrade key, enters it under Activation, restarts, and the domain join option now appears.",
  "tip": "If a question mentions domain join, gpedit.msc, BitLocker or accepting Remote Desktop connections and the machine runs Home, the answer is to upgrade to Pro (or higher).",
  "check": [
   [
    "Can a Windows 11 Home computer connect to another computer using Remote Desktop?",
    "Yes, it can use the Remote Desktop client to connect out; it just cannot act as a Remote Desktop host that accepts incoming connections."
   ],
   [
    "What is the lowest Windows edition that can join an Active Directory domain?",
    "Pro."
   ],
   [
    "How do you move from Home to Pro without reinstalling?",
    "Enter a Pro product key (or buy the upgrade) in Settings under Activation; Windows upgrades the edition in place."
   ]
  ]
 },
 {
  "t": "Windows tools: Task Manager, MMC snap-ins (Event Viewer, Disk Management, Task Scheduler, Device Manager, Certificate Manager, Local Users and Groups, Performance Monitor, Group Policy Editor), msinfo32, Resource Monitor, System Configuration, Registry Editor, Disk Cleanup",
  "body": [
   "Windows includes a toolbox of graphical utilities, and the exam gives you a symptom or task and asks which tool to open. Learn each tool's purpose and its run command, because you can launch most of them from the Run box (Windows key + R).",
   "Task Manager (`taskmgr`, or Ctrl+Shift+Esc) shows running processes and their CPU, memory, disk and network use; lets you end unresponsive tasks; shows performance graphs; lists startup apps with their impact so you can disable them; and shows services and signed-in users. Resource Monitor (`resmon`) goes deeper, showing exactly which process is using which file, network connection or disk. System Configuration (`msconfig`) controls boot options, such as booting into Safe Mode, and lets you disable non-Microsoft services for troubleshooting. System Information (`msinfo32`) gives a read-only report of hardware, drivers, BIOS version and system resources.",
   "The Microsoft Management Console (MMC, `mmc`) is a container for administrative tools called snap-ins. Many are also available directly. Event Viewer (`eventvwr.msc`) shows the Application, Security and System logs, where you look up errors and warnings by time. Disk Management (`diskmgmt.msc`) initializes disks, creates, extends, shrinks and formats partitions, and assigns drive letters. Task Scheduler (`taskschd.msc`) runs programs or scripts on a schedule or on events such as log-on. Device Manager (`devmgmt.msc`) shows hardware, lets you update, roll back, disable or uninstall drivers, and flags problem devices with a yellow warning icon. Certificate Manager (`certmgr.msc` for the current user, `certlm.msc` for the local computer) views and manages digital certificates. Local Users and Groups (`lusrmgr.msc`) creates accounts and group memberships on the local machine (not in Home editions). Performance Monitor (`perfmon`) records counters such as processor time or available memory over time and can create data collector sets and baselines. The Local Group Policy Editor (`gpedit.msc`, Pro and above) configures policies on a single machine.",
   "The Registry Editor (`regedit`) edits the registry, the hierarchical database of Windows and application settings, organized into hives such as HKEY_LOCAL_MACHINE and HKEY_CURRENT_USER. Mistakes here can make Windows unbootable, so export the key (or back it up) before you change it, and only make changes you understand.",
   "Disk Cleanup (`cleanmgr`) removes temporary files, the Recycle Bin contents, old update files and other clutter to free space. The newer Storage settings page offers similar options.",
   "A good way to remember them is by question. 'What is using the CPU right now?' Task Manager. 'Which process has this file open?' Resource Monitor. 'What error happened last night?' Event Viewer. 'Why is this device not working?' Device Manager. 'Run a script every Monday?' Task Scheduler. 'Track memory use over a week?' Performance Monitor. 'Add a partition?' Disk Management."
  ],
  "terms": [
   [
    "MMC",
    "Microsoft Management Console: a framework that hosts administrative snap-ins such as Device Manager and Event Viewer."
   ],
   [
    "Snap-in",
    "A management tool that loads into the MMC, usually saved as a .msc file."
   ],
   [
    "msconfig",
    "System Configuration utility, used to change boot options (such as Safe Boot) and selectively disable services."
   ],
   [
    "Registry",
    "Windows's hierarchical database of system, hardware, user and application settings, edited with regedit."
   ],
   [
    "Performance Monitor",
    "Tool (perfmon) that logs performance counters over time for baselines and trend analysis."
   ]
  ],
  "example": "A user reports that their PC slows to a crawl every morning at 9:00. The technician opens Task Scheduler and finds a third-party updater set to run at that time, confirms in Task Manager that the process consumes most of the CPU, and reschedules the task to run at lunchtime.",
  "tip": "Watch for Home edition traps: lusrmgr.msc and gpedit.msc are not available on Windows Home. Also, Task Manager shows real-time use while Performance Monitor records data over time.",
  "check": [
   [
    "Which tool would you use to assign a drive letter to a newly installed second hard drive?",
    "Disk Management (diskmgmt.msc), after initializing the disk and creating a volume."
   ],
   [
    "A device shows a yellow triangle. Where would you see it, and what can you do there?",
    "In Device Manager; you can update, roll back, disable or reinstall the driver and view the error code in the device's properties."
   ],
   [
    "What should you do before editing the registry?",
    "Back up the registry or export the key you are changing so you can restore it if something breaks."
   ]
  ]
 },
 {
  "t": "Command-line tools: cd, dir, md, rmdir, robocopy, xcopy, diskpart, format, chkdsk, sfc, DISM, gpupdate, gpresult, net use, net user, whoami, winver, shutdown, ipconfig, ping, tracert, pathping, nslookup, netstat, hostname",
  "body": [
   "The Windows command line (Command Prompt, `cmd`, or PowerShell, which runs most of the same commands) is faster than the GUI for many tasks and is essential for scripting and remote work. Some commands need an elevated prompt: right-click Command Prompt and choose 'Run as administrator'. Add `/?` to any command to see its help, for example `robocopy /?`.",
   "File and folder navigation: `cd` changes directory (`cd ..` goes up one level, `cd \\` goes to the root). `dir` lists a folder's contents (`dir /a` includes hidden files). `md` (or `mkdir`) makes a directory and `rmdir` (or `rd`) removes one; `rmdir /s` removes it with all its contents. `xcopy` copies files and directory trees (`/s` for subfolders, `/e` including empty ones). `robocopy` (Robust File Copy) is the more powerful replacement: it can resume after interruptions, retry, preserve permissions and mirror folders (`/mir`), which makes it ideal for migrations and backups.",
   "Disk tools: `diskpart` is an interactive partitioning tool; you `list disk`, `select disk 1`, then `clean`, `create partition primary` and so on. Be careful, because it acts immediately with no undo. `format` prepares a volume with a file system, for example `format E: /fs:NTFS`. `chkdsk` checks a volume for file system errors; `chkdsk /f` fixes them and `chkdsk /r` also locates bad sectors and recovers readable data. System repair tools: `sfc /scannow` (System File Checker) scans protected Windows files and replaces corrupted ones from a local cache. `DISM` (Deployment Image Servicing and Management) repairs that underlying Windows image, commonly with `DISM /Online /Cleanup-Image /RestoreHealth`; run it when sfc cannot fix files, then run sfc again.",
   "Policy and accounts: `gpupdate` refreshes Group Policy (`gpupdate /force` reapplies all policies). `gpresult /r` shows which policies were applied to the current user and computer. `net use` maps or disconnects network drives, as in `net use S: \\\\server\\share`. `net user` lists, creates or changes local accounts, for example `net user alice /add`. `whoami` shows the signed-in account (`whoami /groups` shows memberships). `winver` opens a window with the Windows version and build. `shutdown /s /t 0` shuts down now, `/r` restarts and `/a` aborts a pending shutdown.",
   "Networking: `ipconfig` shows IP settings; `/all` adds the MAC address, DHCP and DNS servers, `/release` and `/renew` get a new DHCP lease, and `/flushdns` clears the DNS cache. `ping` tests reachability with ICMP echo requests. `tracert` lists each router hop to a destination. `pathping` combines both, measuring packet loss at each hop over a period. `nslookup` queries DNS to check name resolution. `netstat` lists connections and listening ports (`-a` all, `-n` numeric, `-b` owning program, which needs elevation). `hostname` prints the computer's name.",
   "```\nipconfig /all\nping 8.8.8.8\nnslookup intranet.example.com\nsfc /scannow\nrobocopy C:\\Data D:\\Backup /mir\n```"
  ],
  "terms": [
   [
    "robocopy",
    "Robust file copy tool that can retry, resume, preserve permissions and mirror directory trees."
   ],
   [
    "sfc /scannow",
    "System File Checker command that verifies and repairs protected Windows system files."
   ],
   [
    "DISM",
    "Deployment Image Servicing and Management: repairs or services the Windows image that sfc relies on."
   ],
   [
    "gpresult",
    "Command that reports the Group Policy settings applied to a user and computer."
   ],
   [
    "pathping",
    "Command combining ping and tracert to measure latency and packet loss at each hop."
   ]
  ],
  "example": "A user cannot reach an internal website by name. The technician runs `ping` to the server's IP address and gets replies, then runs `nslookup` on the site's name and gets no answer. That points to DNS, so they check the DNS server listed in `ipconfig /all` and run `ipconfig /flushdns` after the DNS record is corrected.",
  "tip": "Know the pairs: sfc repairs system files, DISM repairs the image sfc uses; gpupdate applies policy, gpresult reports it; tracert shows the path, pathping adds per-hop loss statistics.",
  "check": [
   [
    "sfc /scannow reports that it found corrupt files but could not fix some of them. What should you run next?",
    "DISM /Online /Cleanup-Image /RestoreHealth to repair the component store, then run sfc /scannow again."
   ],
   [
    "Which command maps drive letter S: to a shared folder on a server?",
    "net use S: \\\\servername\\sharename"
   ],
   [
    "Which command shows which Group Policy objects applied to the current user?",
    "gpresult /r"
   ]
  ]
 },
 {
  "t": "Settings and Control Panel: Accounts, Privacy, Update and Security, Apps, Power Options (sleep, hibernate, fast startup), Display, Devices",
  "body": [
   "Windows has two configuration interfaces. The modern Settings app (Windows key + I) is where Microsoft adds new options, and the classic Control Panel (`control`) still hosts many older applets. Over time more features move from Control Panel into Settings, so you should be comfortable finding a setting in either place. The exam names the categories, so learn what lives in each.",
   "Accounts is where users manage their sign-in: switching between a local account and a Microsoft account, sign-in options such as a PIN, Windows Hello face or fingerprint and security keys, adding family members or other users, and connecting a work or school account. The Control Panel equivalent is User Accounts, which also lets you change an account type between Standard and Administrator.",
   "Privacy (called Privacy and security in Windows 11) controls what apps can access: location, camera, microphone, contacts, diagnostic data and advertising ID. If a video-call app cannot see the webcam even though the driver is fine, check the camera permission here. Update and Security in Windows 10 (split in Windows 11 into Windows Update and Privacy and security) covers Windows Update, including pausing updates, active hours and optional driver updates, as well as Windows Security, backup, troubleshooters, recovery options (reset this PC, advanced startup) and activation.",
   "Apps lists installed programs so you can uninstall or repair them, set default apps (which browser opens web links, which app opens .pdf files), manage startup apps and optional features. The Control Panel equivalent is Programs and Features, which also has 'Turn Windows features on or off' for items such as Hyper-V or the Telnet client.",
   "Power Options control how the computer saves energy. Sleep keeps the session in RAM using a trickle of power, so it resumes in seconds, but a laptop battery slowly drains and a desktop loses the session if power fails. Hibernate writes the contents of RAM to a file on disk (hiberfil.sys) and powers off completely; it resumes more slowly than sleep but uses no power and survives a dead battery. Fast startup is a hybrid: when you choose Shut down, Windows logs you off and then hibernates just the kernel session, so the next boot is quicker. Because the kernel is not fully restarted, some driver or update problems are only cleared by choosing Restart, which bypasses fast startup. You can also configure what the power button and lid do, and choose or customize power plans.",
   "Display handles resolution, scaling, orientation, refresh rate, multiple monitors (duplicate or extend) and night light. Devices (Bluetooth and devices in Windows 11) covers pairing Bluetooth accessories, printers and scanners, mouse and touchpad settings, AutoPlay and USB. Other Control Panel items you will meet include Internet Options (proxy and browser security zones), Device Manager, Sound, Mail, Network and Sharing Center, Windows Defender Firewall, File Explorer Options (show hidden files and file extensions) and Indexing Options."
  ],
  "terms": [
   [
    "Sleep",
    "Low-power state that keeps the session in RAM for very fast resume; the session is lost if power is cut."
   ],
   [
    "Hibernate",
    "Saves RAM contents to disk (hiberfil.sys) and powers off fully, so the session survives loss of power."
   ],
   [
    "Fast startup",
    "Windows feature that hibernates the kernel session at shutdown to speed up the next boot; Restart bypasses it."
   ],
   [
    "Default apps",
    "Settings that decide which application opens a given file type or link."
   ],
   [
    "Microsoft account",
    "An online identity used to sign in to Windows that can sync settings and connect to Microsoft cloud services, as opposed to a local account."
   ]
  ],
  "example": "A traveling salesperson's laptop battery often dies overnight in the bag, and they lose unsaved work each time. The technician changes the lid-close action in Power Options from Sleep to Hibernate, so the laptop saves its session to disk and draws no power while closed.",
  "tip": "If a driver fix or update does not seem to take effect after Shut down, remember fast startup: choose Restart instead, because Shut down with fast startup does not fully reload the kernel.",
  "check": [
   [
    "Which power state saves the session to disk and uses no power?",
    "Hibernate."
   ],
   [
    "A conferencing app cannot use the webcam, but Device Manager shows no problem. Where should you look?",
    "The camera permissions under Settings > Privacy (Privacy and security), which may be blocking app access to the camera."
   ],
   [
    "Where do you set which browser opens web links by default?",
    "Settings > Apps > Default apps."
   ]
  ]
 },
 {
  "t": "Windows networking: workgroup vs domain, mapped drives and shares, firewall exceptions, static vs DHCP addressing, VPN and proxy settings, public vs private network profiles, metered connections",
  "body": [
   "Windows computers can be organized in two ways. In a workgroup, every computer is a peer that keeps its own local user accounts, so a user needs an account on each machine they want to access. Workgroups suit small offices with a handful of computers. In a domain, a server running Active Directory Domain Services (a domain controller) holds a central database of users, computers and policies. Users sign in once with a domain account from any joined computer, and administrators apply Group Policy to everyone. Domains need Windows Pro or higher. A homegroup was an older home-sharing feature and is no longer present in current Windows.",
   "To share a folder, open its Properties, use the Sharing tab (Advanced Sharing) to set a share name and share permissions, and remember that NTFS permissions on the Security tab also apply. Users reach the share through a UNC (Universal Naming Convention) path such as `\\\\fileserver\\sales`. Mapping a drive assigns a letter to that path so it looks like a local drive: in File Explorer choose 'Map network drive', tick 'Reconnect at sign-in' to make it persistent, or use `net use S: \\\\fileserver\\sales /persistent:yes`. A share name ending in `$` is hidden from browsing, and Windows creates administrative shares such as `C$` and `ADMIN$` for administrators.",
   "Windows Defender Firewall blocks unsolicited inbound traffic by default. When an application or service must accept connections, you create an exception: allow an app through the firewall in the basic interface, or create an inbound rule for a specific program, port and protocol in Windows Defender Firewall with Advanced Security (`wf.msc`). Rules can apply to specific network profiles.",
   "Each network connection is given a profile. Public is for untrusted places like coffee shops; it turns off network discovery and file sharing and applies stricter firewall rules. Private is for trusted home or small-office networks; it lets the computer be discovered and share files and printers. Domain is applied automatically when the computer can reach its domain controller. If a user cannot see other PCs on the office network, check that the network is not marked Public.",
   "IP addressing can be dynamic or static. With DHCP (Dynamic Host Configuration Protocol), the computer receives its IP address, subnet mask, default gateway and DNS servers automatically, which is right for most clients. A static address is typed in by hand under the adapter's IPv4 properties and suits servers and printers that must never change address. If a DHCP client shows an address starting with 169.254, it is an APIPA (Automatic Private IP Addressing) address, meaning no DHCP server answered. You can also set an alternate configuration used when DHCP is unavailable.",
   "A VPN (virtual private network) creates an encrypted tunnel to a remote network; add one under Settings > Network and internet > VPN or install the vendor's client. A proxy server forwards web requests on the user's behalf for filtering or caching; configure it under Network and internet > Proxy, either automatically with a setup script or manually with an address and port. A wrong proxy setting is a common reason why one PC cannot browse while others can. Finally, a metered connection tells Windows that data costs money, as on a mobile hotspot, so it limits background downloads such as some updates and sync."
  ],
  "terms": [
   [
    "Workgroup",
    "A peer-to-peer arrangement in which each computer manages its own local user accounts."
   ],
   [
    "Domain",
    "A centrally managed group of computers and users controlled by Active Directory domain controllers."
   ],
   [
    "UNC path",
    "Universal Naming Convention path to a network resource, in the form \\\\server\\share."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing: a self-assigned 169.254.x.x address used when no DHCP server responds."
   ],
   [
    "Metered connection",
    "A network marked as limited or costly, so Windows restricts background data use."
   ]
  ],
  "example": "An office manager's laptop cannot see the shared printer or file server, while colleagues can. The technician finds the office Wi-Fi was set to Public when the laptop first joined. Changing the network profile to Private turns on network discovery and file and printer sharing, and the resources appear.",
  "tip": "A 169.254.x.x address means DHCP failed, not that the network is fine. Public profile blocks discovery and sharing; Private allows it.",
  "check": [
   [
    "What is the main administrative difference between a workgroup and a domain?",
    "In a workgroup each computer has its own local accounts; in a domain, accounts and policies are managed centrally on domain controllers."
   ],
   [
    "Why would you assign a static IP address to a network printer?",
    "So its address never changes and clients configured to print to that address keep working."
   ],
   [
    "A laptop on a mobile hotspot keeps using lots of data for updates. What setting helps?",
    "Mark the connection as metered, which limits background downloads."
   ]
  ]
 },
 {
  "t": "macOS: installing and removing apps (.dmg, .pkg, .app, App Store), System Settings, Time Machine, FileVault, Keychain, Spotlight, Mission Control, Terminal, Disk Utility, Force Quit",
  "body": [
   "Support technicians increasingly meet Macs, and the exam checks that you can do everyday tasks on them. Start with software. The simplest source is the App Store, which installs, updates and removes vetted apps tied to the user's Apple ID. Outside the store, apps usually arrive as a .dmg (disk image) file: double-click it to mount it like a virtual drive, then drag the .app into the Applications folder and eject the image. A .app is actually a folder-like bundle containing the program and its resources. A .pkg is an installer package that runs a step-by-step wizard and can place files in several system locations; it is used when an app needs drivers, services or components beyond a single bundle.",
   "Removing apps is usually easy: drag the .app from Applications to the Trash, or in Launchpad hold an App Store app until it jiggles and click the delete button. Apps installed from a .pkg may leave components behind, so check whether the vendor provides an uninstaller. Gatekeeper, a built-in macOS protection, checks that downloaded apps are signed and notarized by identified developers and warns before opening anything else.",
   "System Settings (named System Preferences before macOS Ventura) is the Mac's control panel: users and groups, network, displays, privacy and security, printers, software updates and so on. Time Machine is the built-in backup tool; point it at an external drive or a supported network destination and it keeps hourly, daily and weekly backups, letting you restore single files or the whole Mac. FileVault is full-disk encryption; turn it on in Privacy and Security (or its equivalent section), and store the recovery key safely, because without it or the user's password the data cannot be recovered.",
   "Keychain is the macOS password manager. Keychain Access stores website and Wi-Fi passwords, certificates and secure notes, and iCloud Keychain syncs passwords across the user's Apple devices. Repeated password prompts after a password change are often a keychain issue. Spotlight (Command + Space) searches files, apps, settings and more, and is the quickest way to launch anything. Mission Control shows all open windows and virtual desktops (Spaces) so you can switch between them; you open it with a trackpad swipe or its keyboard key.",
   "Terminal gives a Unix command-line shell (zsh by default in current versions), where Linux-style commands such as `ls`, `cd`, `sudo` and `ps` work. Disk Utility manages drives: erase and format with APFS, Mac OS Extended, exFAT or FAT, partition, create disk images, and run First Aid to check and repair a volume. Force Quit ends a frozen app; press Command + Option + Esc, or choose it from the Apple menu. You can also open Activity Monitor, the Mac's equivalent of Task Manager, to see CPU and memory use.",
   "Other items worth knowing include the Dock, Finder, iCloud, gestures for the trackpad, Boot Camp on older Intel Macs for running Windows, and Remote Disc for sharing another computer's optical drive with Macs that lack one."
  ],
  "terms": [
   [
    ".dmg",
    "A macOS disk image file that mounts like a drive and usually contains an app to drag into Applications."
   ],
   [
    ".pkg",
    "A macOS installer package that runs a guided installation and can install components in several locations."
   ],
   [
    "Time Machine",
    "The built-in macOS backup utility that keeps incremental backups on an external or network drive."
   ],
   [
    "FileVault",
    "macOS full-disk encryption that protects data if the Mac is lost or stolen."
   ],
   [
    "Keychain",
    "The macOS credential store for passwords, certificates and secure notes, optionally synced through iCloud."
   ]
  ],
  "example": "A designer's Mac freezes while a large export runs, and the mouse still moves but the app ignores clicks. The technician presses Command + Option + Esc, selects the unresponsive app and chooses Force Quit, then uses Activity Monitor to confirm memory pressure has dropped before relaunching the app.",
  "tip": "Map Mac tools to their Windows equivalents: Activity Monitor is Task Manager, Force Quit is End task, FileVault is BitLocker, Time Machine is File History or backup, Disk Utility is Disk Management plus chkdsk, Spotlight is Windows search.",
  "check": [
   [
    "A user downloads an app as a .dmg. How do they usually install it?",
    "Double-click to mount the .dmg, drag the .app into the Applications folder, then eject the disk image."
   ],
   [
    "Which keyboard shortcut opens the Force Quit window?",
    "Command + Option + Esc."
   ],
   [
    "What should the user keep safe after turning on FileVault, and why?",
    "The recovery key, because without it or the account password the encrypted disk cannot be unlocked."
   ]
  ]
 },
 {
  "t": "Linux: file and permission commands (ls, cp, mv, rm, chmod, chown, sudo, su), package managers (apt, dnf), ip, df, top, ps, grep, find, man, key files (/etc/passwd, /etc/shadow, /etc/hosts, /etc/fstab, /etc/resolv.conf)",
  "body": [
   "Linux is managed mostly from a shell such as bash. Commands are case-sensitive, paths use forward slashes and there are no drive letters: everything hangs off the root directory `/`. When in doubt, read the manual page with `man`, as in `man chmod`, and press q to quit.",
   "Working with files: `ls` lists a directory (`ls -l` shows permissions, owner, size and date; `ls -a` includes hidden dotfiles). `cp` copies (`cp -r` for directories), `mv` moves or renames, and `rm` deletes (`rm -r` deletes a directory tree). There is no Recycle Bin at the shell, so `rm` is permanent. `pwd` prints the current directory and `cd` changes it.",
   "Permissions are shown by `ls -l` as a string such as `-rwxr-x---`: the first character is the type, then three sets of read (r), write (w) and execute (x) for the owner (user), the group and others. `chmod` changes them, either symbolically (`chmod g+w file`) or in octal, where r=4, w=2, x=1, so `chmod 750 script.sh` gives the owner rwx (7), the group r-x (5) and others nothing (0). `chown` changes ownership, for example `chown alice:staff report.txt`. Running as the root superuser for daily work is risky, so administrators use `sudo` to run a single command with elevated rights (it asks for the user's own password and logs the action) and `su` to switch to another user, by default root, which requires that account's password.",
   "Software is installed with a package manager, which downloads from trusted repositories and resolves dependencies. Debian and Ubuntu use `apt`: `sudo apt update` refreshes the package list, then `sudo apt upgrade` or `sudo apt install nginx`. Red Hat, Fedora and related distributions use `dnf` (the successor to yum): `sudo dnf install nginx`, `sudo dnf upgrade`.",
   "System and network information: `ip addr` (or `ip a`) shows interfaces and addresses, and `ip route` shows the routing table; it replaces the older `ifconfig`. `df -h` shows free space per mounted file system in human-readable units. `top` is a live, updating view of processes and CPU and memory use, and `ps aux` gives a snapshot list of all processes. `grep` searches text for a pattern, as in `grep error /var/log/syslog`, and is often combined with pipes: `ps aux | grep ssh`. `find` searches the file system by name, size or date, for example `find /home -name '*.pdf'`.",
   "Know these configuration files. `/etc/passwd` lists user accounts (name, user ID, home directory and login shell) and is readable by everyone; despite its name it no longer holds passwords. `/etc/shadow` stores the hashed passwords and password-aging data and is readable only by root. `/etc/hosts` maps hostnames to IP addresses locally and is checked before DNS by default. `/etc/fstab` lists file systems to mount at boot and where. `/etc/resolv.conf` lists the DNS servers the system uses.",
   "```\nls -l /var/www\nsudo chmod 644 index.html\nsudo chown www-data:www-data index.html\nsudo apt update && sudo apt install htop\ndf -h\n```"
  ],
  "terms": [
   [
    "sudo",
    "Runs a single command with elevated (usually root) privileges, authenticating with the user's own password and logging the action."
   ],
   [
    "chmod",
    "Changes file permissions, symbolically or with octal values such as 755."
   ],
   [
    "Package manager",
    "Tool such as apt or dnf that installs, updates and removes software from repositories while handling dependencies."
   ],
   [
    "/etc/shadow",
    "Root-only file storing hashed user passwords and password-aging information."
   ],
   [
    "/etc/fstab",
    "File that defines which file systems are mounted at boot and at which mount points."
   ]
  ],
  "example": "A web developer's new script will not run and the shell says 'Permission denied'. The technician runs `ls -l` and sees `-rw-r--r--`, meaning nobody has execute permission. Running `chmod 755 deploy.sh` gives the owner full rights and everyone else read and execute, and the script now runs.",
  "tip": "Octal permissions come up often: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--. Also remember that /etc/passwd holds accounts but /etc/shadow holds the password hashes.",
  "check": [
   [
    "What permissions does chmod 640 set?",
    "Owner read and write (6), group read only (4), others no access (0)."
   ],
   [
    "Which command installs a package on Ubuntu, and which on Fedora?",
    "sudo apt install <package> on Ubuntu; sudo dnf install <package> on Fedora."
   ],
   [
    "Which file would you check to see which DNS servers a Linux host uses?",
    "/etc/resolv.conf."
   ]
  ]
 },
 {
  "t": "Installing applications: 32- vs 64-bit, RAM/CPU/GPU/storage requirements, distribution methods (ISO, download, image) and business impact",
  "body": [
   "Installing software looks simple, but a technician's job is to make sure it will actually run, fits the hardware and does not disrupt the business. Before you click Install, check compatibility and requirements.",
   "Start with architecture. A 32-bit (x86) application can address a limited amount of memory (about 4 GB), while a 64-bit (x64) application can use far more. A 64-bit Windows OS runs both 64-bit apps and most 32-bit apps, using a compatibility layer and keeping 32-bit programs in the `C:\\Program Files (x86)` folder, while 64-bit programs go in `C:\\Program Files`. A 32-bit OS cannot run 64-bit applications at all. 64-bit drivers are required on a 64-bit OS. Windows 11 is available only in 64-bit versions. Note also that ARM-based devices use a different instruction set, so check that software offers an ARM version or is supported under emulation.",
   "Next, compare the published system requirements with the machine. RAM: an app that needs more memory than is free will page to disk and become sluggish. CPU: check the required speed, number of cores and any required instruction features. GPU: graphics-heavy software such as CAD, video editing or games may need a dedicated graphics card, a minimum amount of video RAM (VRAM) or support for a particular graphics API. Storage: check both free space for the installation and whether the app expects an SSD for acceptable performance. Also check the OS version the vendor supports, any external hardware tokens or peripherals, and required frameworks.",
   "Software can be distributed in several ways. Downloads from the vendor's website or an app store are common for individual installs; always use trusted sources and verify the file's hash when the vendor publishes one. An ISO file is a disc image that you mount (double-click in Windows) or burn, often used for large suites and OS media. In organizations, applications are frequently packaged into a standard OS image, or pushed by management tools, so hundreds of machines get the same version without technicians visiting each desk. Physical media such as USB drives are still used in some environments.",
   "Finally, consider business impact. A new installation can conflict with existing software, change file associations, require a reboot during work hours, need licenses for every user, or open new network ports. On a user's device, an install might affect only that person; in a line-of-business system it can halt a department. That is why organizations test software first, schedule deployments, follow change management and document which version is installed where. Consider impact on the device (performance, stability), the network (bandwidth for large downloads), operations (downtime) and the business (license compliance and support)."
  ],
  "terms": [
   [
    "64-bit application",
    "Software compiled for a 64-bit processor and OS, able to address far more than 4 GB of memory."
   ],
   [
    "Program Files (x86)",
    "The folder where 64-bit Windows installs 32-bit applications, separate from 64-bit programs in Program Files."
   ],
   [
    "System requirements",
    "The minimum or recommended CPU, RAM, GPU, storage and OS a program needs to run properly."
   ],
   [
    "VRAM",
    "Video RAM: dedicated memory on a graphics card used for textures and frame data."
   ],
   [
    "ISO",
    "A single-file image of an optical disc used to distribute installers; it can be mounted or burned."
   ]
  ],
  "example": "The engineering department buys a 3D modeling suite that requires a 64-bit OS, 16 GB RAM and a dedicated GPU. Before deploying, the technician checks the asset inventory, finds six older PCs with integrated graphics and 8 GB RAM, and recommends upgrading those machines before the rollout rather than letting users discover the software is unusable.",
  "tip": "A 64-bit OS runs 32-bit apps, but a 32-bit OS cannot run 64-bit apps. If an installer refuses to run on an older machine, check whether the OS is 32-bit.",
  "check": [
   [
    "Can a 64-bit application be installed on 32-bit Windows?",
    "No. A 32-bit OS cannot run 64-bit applications; the OS must be 64-bit."
   ],
   [
    "Where does 64-bit Windows install 32-bit applications?",
    "In C:\\Program Files (x86)."
   ],
   [
    "Name two business impacts to consider before installing new software company-wide.",
    "Examples: licensing costs and compliance, downtime or reboots during work hours, conflicts with existing apps, network bandwidth for deployment, and support and training needs."
   ]
  ]
 },
 {
  "t": "Cloud productivity tools: email, synced storage, collaboration suites, account setup and licensing",
  "body": [
   "Most organizations now run their everyday productivity software as cloud services, such as Microsoft 365 or Google Workspace. Instead of installing a mail server and file server on site, the company subscribes to hosted email, file storage, calendars and collaboration apps. As a support technician, you will set up accounts, connect devices, fix sync problems and manage licenses.",
   "Email is usually the first service a user needs. A cloud mailbox is reached through a web browser, a desktop client such as Outlook, or the mobile mail app. Modern cloud email uses the provider's own protocols or Exchange-style synchronization, which keep mail, calendar and contacts in step across devices. Some clients use IMAP (Internet Message Access Protocol), which leaves mail on the server and syncs folders, for receiving and SMTP (Simple Mail Transfer Protocol) for sending; the older POP3 downloads mail to one device and is rarely appropriate for business. Most accounts now require modern authentication with multifactor sign-in.",
   "Synced storage services, such as OneDrive, Google Drive, Dropbox and iCloud Drive, keep a copy of files in the cloud and synchronize them to each signed-in device. Files-on-demand features show every file but download its content only when opened, saving local disk space. Common support issues include sync conflicts when two people edit offline, files paused because of storage quotas, and characters or path lengths the service does not allow. Remember that sync is not the same as backup: if a user deletes or ransomware encrypts a synced file, the change syncs everywhere, so rely on version history, the recycle bin and a real backup.",
   "Collaboration suites combine documents, spreadsheets and presentations that several people can edit at the same time in a browser, along with chat, video meetings and shared team spaces. Sharing permissions matter here: a link set to 'anyone with the link' can expose data to outsiders, so organizations usually restrict sharing to internal users or named people.",
   "Account setup generally happens in an administrator console. You create the user, assign them to groups, assign a license, set up MFA and let the user complete sign-in on their devices. Deprovisioning at offboarding is just as important: disable sign-in, transfer or retain their data according to policy, and reclaim the license. Licensing is typically per user and subscription-based, billed monthly or yearly, and different plans include different apps and storage. A user who cannot open desktop apps or whose mailbox is missing often simply lacks the right license. Licenses tied to a user usually allow installation on a set number of that user's devices, while shared or device-based licenses exist for kiosks and shared PCs."
  ],
  "terms": [
   [
    "Software as a Service (SaaS)",
    "Applications hosted and maintained by a provider and used over the internet by subscription."
   ],
   [
    "Synced storage",
    "A cloud file service that keeps files synchronized between the cloud and all of a user's signed-in devices."
   ],
   [
    "IMAP",
    "Internet Message Access Protocol: keeps mail on the server and synchronizes it across multiple clients."
   ],
   [
    "Subscription licensing",
    "Per-user or per-device licensing paid on a recurring basis, reassignable when staff leave."
   ],
   [
    "Files on demand",
    "A sync feature that lists all cloud files locally but downloads each one only when it is opened."
   ]
  ],
  "example": "A new hire can sign in to the company web portal but gets an error when opening the desktop word processor. In the admin console, the technician sees the user was created without a license. Assigning the correct subscription plan lets the desktop apps activate within a few minutes.",
  "tip": "Cloud sync replicates deletions and ransomware-encrypted files too; it is not a backup. If a user 'has no mailbox' or 'cannot activate Office', check license assignment first.",
  "check": [
   [
    "Why is IMAP preferred over POP3 for a user with a laptop and a phone?",
    "IMAP keeps mail on the server and syncs it across devices, while POP3 typically downloads mail to one device."
   ],
   [
    "What should happen to a departing employee's cloud license?",
    "Their account should be disabled, data retained or transferred per policy, and the license reclaimed for reuse."
   ],
   [
    "Why is a synced folder not a true backup?",
    "Changes, including deletions and encryption by ransomware, synchronize to every copy; you need separate versioned backups."
   ]
  ]
 },
 {
  "t": "Physical security: access control vestibules, badge readers, video surveillance, alarm systems, locks, guards, bollards, fences",
  "body": [
   "Physical security protects people, buildings and equipment from unauthorized physical access. It matters to IT because anyone who can touch a computer or server can steal it, plug in a malicious device, or boot it from their own media and bypass many software controls. Good physical security uses several layers, so an intruder must defeat one barrier after another. This idea is called defense in depth.",
   "The outer layer keeps vehicles and people at a distance. Fences mark the boundary and slow intruders; taller fences topped with barbed wire deter more. Bollards are short, sturdy posts placed in front of entrances or along walkways to stop vehicles from being driven into a building while still letting pedestrians through. Lighting helps guards and cameras see, and signage deters casual trespassers.",
   "At the building entrance, access is controlled. Badge readers read an ID card (often using RFID, radio-frequency identification, or a smart card) and unlock the door only for authorized badges, while logging who entered and when. Key fobs work the same way. Biometric readers check fingerprints, palms or faces. An access control vestibule (formerly called a mantrap) is a small space with two doors where only one can be open at a time; a person enters, the first door closes, and only after authentication does the second door open. It stops tailgating, where an unauthorized person slips in behind someone who badged in.",
   "Security guards add human judgment: they check IDs, sign in visitors, escort them and respond to alarms. Many sites keep an access list or visitor log. Locks come in many forms: traditional keyed locks, cipher (keypad) locks that need a code, electronic locks tied to the badge system, and biometric locks. Inside, server rooms, network closets and even individual racks and cabinets should be locked. Cable locks secure laptops to desks, and privacy screens stop onlookers from reading displays.",
   "Detection and monitoring complete the picture. Video surveillance (CCTV, closed-circuit television, or IP cameras) deters wrongdoing, records evidence and lets guards watch several areas at once. Alarm systems use door contacts, glass-break sensors and motion detectors to alert guards or a monitoring company when something happens after hours. Motion sensors can also switch on lights. Magnetometers (metal detectors) screen people at some high-security sites.",
   "For the exam, focus on matching the control to the threat. Vehicle ramming: bollards. Tailgating: access control vestibule and guards. Knowing who entered a room and when: badge readers with logging. After-hours break-ins: alarms and video surveillance. Theft of laptops from desks: cable locks. Unauthorized people in the server room: locked door with badge or biometric access."
  ],
  "terms": [
   [
    "Access control vestibule",
    "A small entry area with two interlocking doors that lets only one authenticated person through at a time, preventing tailgating."
   ],
   [
    "Bollard",
    "A short, strong post that blocks vehicles from reaching a building entrance while allowing pedestrians to pass."
   ],
   [
    "Badge reader",
    "A device that reads ID cards or fobs to unlock doors for authorized users and log each entry."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secured door without authenticating."
   ],
   [
    "Defense in depth",
    "Using multiple layers of security controls so that the failure of one does not expose the asset."
   ]
  ],
  "example": "A company notices that visitors often walk into the office behind employees without signing in. It installs an access control vestibule at the main entrance, requires badges to pass the inner door, and stations a guard to sign in and badge visitors. Tailgating incidents stop, and the badge logs show exactly who entered.",
  "tip": "Bollards stop vehicles, not people. Access control vestibules stop tailgating. Video surveillance mostly detects and records rather than prevents, although visible cameras also deter.",
  "check": [
   [
    "Which physical control is specifically designed to stop tailgating?",
    "An access control vestibule (mantrap), backed by guards."
   ],
   [
    "What control protects a building's glass entrance from a car being driven into it?",
    "Bollards."
   ],
   [
    "Besides unlocking doors, what useful security record do badge readers provide?",
    "A log of which badge opened which door and when, useful for audits and investigations."
   ]
  ]
 },
 {
  "t": "Logical security: least privilege, zero trust, MFA methods (authenticator apps, SMS, hardware tokens, email), SSO, MDM, DLP, IAM, directory services, access control lists",
  "body": [
   "Logical security uses software and configuration, rather than locks and walls, to control who can use systems and data. Its starting principle is least privilege: give each user, service and device only the access it needs to do its job, and no more. A receptionist does not need administrator rights; a backup service account does not need to log on interactively. Least privilege limits the damage from mistakes, malware and stolen accounts.",
   "Zero trust takes this further. Traditional networks trusted anything inside the firewall. A zero trust model assumes no user or device is trusted by default, wherever it is; every request is authenticated, authorized and checked (for example, is the device managed and patched?) before access is granted, and access is granted per resource rather than to the whole network.",
   "Authentication proves identity, and multifactor authentication (MFA) requires two or more different factor types: something you know (password, PIN), something you have (phone, token, smart card) and something you are (fingerprint, face). Two passwords are still single-factor. Common MFA methods, roughly from strongest to weakest: hardware tokens and security keys (physical devices that generate codes or perform cryptographic sign-in, strongly resistant to phishing when they use modern standards); authenticator apps (generate time-based one-time passwords or approve push notifications on a phone); SMS text codes (convenient but vulnerable to SIM swapping and interception); and email codes (only as secure as the mailbox). Any MFA is far better than a password alone. Watch for MFA fatigue attacks, where an attacker spams push requests hoping the user taps Approve.",
   "Single sign-on (SSO) lets a user authenticate once and then reach many applications without signing in again, using trust between an identity provider and each application. SSO improves the user experience and lets administrators disable one account to cut off everything, but it makes that one account very valuable, so SSO is always paired with MFA.",
   "Identity and access management (IAM) is the overall discipline of creating identities, assigning roles and permissions, reviewing access and removing it when people change jobs or leave. It relies on directory services, central databases of users, groups and computers, such as Microsoft Active Directory, which administrators query and manage and which other systems use for authentication. Access control lists (ACLs) are the lists attached to resources, such as files, folders, printers or network devices, that state which users or groups are allowed or denied which actions. On a router or firewall, an ACL permits or blocks traffic by address and port.",
   "Two more tools protect data on endpoints. Mobile device management (MDM) enrolls phones, tablets and laptops so the organization can enforce passcodes and encryption, push apps and settings, and remotely lock or wipe devices. Data loss prevention (DLP) inspects data in email, files, cloud storage and endpoints for sensitive content such as card numbers or health records and blocks or alerts when it is about to leave the organization improperly."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum access rights required to perform a task."
   ],
   [
    "Zero trust",
    "Security model that never automatically trusts a user or device and verifies every access request."
   ],
   [
    "MFA",
    "Multifactor authentication: requiring factors from at least two different categories (know, have, are)."
   ],
   [
    "SSO",
    "Single sign-on: one authentication grants access to multiple connected applications."
   ],
   [
    "DLP",
    "Data loss prevention: tools that detect and block unauthorized transfer of sensitive data."
   ]
  ],
  "example": "After an employee's password is phished, the attacker tries to sign in but is stopped by a push-notification MFA prompt that the employee does not approve. The help desk resets the password, reviews sign-in logs, and moves the finance team to hardware security keys, which are much harder to phish.",
  "tip": "A password plus a PIN is still single-factor (both are 'something you know'). Of the listed MFA methods, SMS and email codes are the weakest; hardware tokens are the strongest.",
  "check": [
   [
    "Is a password plus a security question multifactor authentication? Why?",
    "No. Both are 'something you know', so it is a single factor used twice."
   ],
   [
    "What does DLP do?",
    "It detects sensitive data (such as card numbers or PII) in transit, at rest or in use and blocks or alerts on unauthorized sharing or transfer."
   ],
   [
    "What is the security trade-off of SSO?",
    "It is convenient and centralizes control, but one compromised SSO account reaches many applications, so it needs strong MFA."
   ]
  ]
 },
 {
  "t": "Windows security: Microsoft Defender Antivirus and Firewall, users and groups, NTFS vs share permissions, inheritance, UAC, BitLocker and BitLocker To Go, EFS, Windows Hello, run as administrator",
  "body": [
   "Windows includes a set of built-in security features you will configure and troubleshoot constantly. Microsoft Defender Antivirus provides real-time protection against malware, cloud-delivered protection and scheduled or on-demand scans; you manage it in the Windows Security app, where you can check that definitions are current, run a quick, full or offline scan, and review quarantined items. If a third-party antivirus is installed, Defender typically steps aside. Windows Defender Firewall filters inbound and outbound traffic per network profile (domain, private, public); you can allow apps, open ports and create detailed rules in the Advanced Security console.",
   "Accounts are organized into users and groups. Built-in groups include Administrators, with full control; Users (standard users), who can run programs but not change system-wide settings; Guest, which is disabled by default; and Power Users, kept only for legacy compatibility. Assign permissions to groups rather than individuals so access is easy to manage. Day-to-day, people should use standard accounts. User Account Control (UAC) enforces this: even an administrator runs with standard rights until an action needs elevation, and then UAC shows a prompt (or asks a standard user for admin credentials). That pause stops malware from silently making system changes. 'Run as administrator' (right-click a program) starts that one program elevated.",
   "Folders on a network have two kinds of permission. Share permissions (Full Control, Change, Read) apply only when accessed over the network. NTFS permissions (Full Control, Modify, Read and Execute, List folder contents, Read, Write) apply both locally and over the network. When both apply, Windows calculates each set separately and the most restrictive result wins. Deny overrides Allow. By default, NTFS permissions are inherited: a new file or subfolder takes the permissions of its parent, and you can disable inheritance to set explicit permissions. When you move a file within the same NTFS volume it keeps its permissions; when you copy it, or move it to a different volume, it inherits the destination's permissions.",
   "Encryption protects data at rest. BitLocker encrypts an entire volume, normally using the computer's TPM (Trusted Platform Module) chip to protect the key, so a stolen drive is unreadable; you must store the recovery key safely (for example in the organization's directory or Microsoft account). BitLocker To Go applies the same protection to removable drives such as USB sticks, unlocked with a password. EFS (Encrypting File System) encrypts individual files and folders on NTFS and ties them to the user's certificate; other users on the same PC cannot open them. BitLocker and EFS need Pro or higher editions.",
   "Windows Hello provides passwordless sign-in with a PIN, fingerprint or facial recognition. The Windows Hello PIN is tied to that specific device's hardware, so a stolen PIN is useless elsewhere, unlike a password. Together with MFA, it is Microsoft's preferred way to sign in."
  ],
  "terms": [
   [
    "UAC",
    "User Account Control: prompts for consent or credentials before actions that require administrative rights."
   ],
   [
    "NTFS permissions",
    "File-system permissions that apply both locally and over the network."
   ],
   [
    "Share permissions",
    "Permissions on a shared folder that apply only to network access; combined with NTFS, the most restrictive wins."
   ],
   [
    "BitLocker To Go",
    "BitLocker encryption for removable drives such as USB flash drives."
   ],
   [
    "EFS",
    "Encrypting File System: per-file encryption on NTFS tied to a user's certificate."
   ]
  ],
  "example": "A shared folder gives Everyone Full Control at the share level, but the Sales group has only Read at the NTFS level. When a salesperson tries to save a file over the network, it fails. The technician explains that the more restrictive NTFS Read wins, and grants the Sales group Modify on the NTFS permissions.",
  "tip": "For combined share and NTFS permissions, take the most restrictive. Copying a file inherits the destination's permissions; moving within the same volume keeps the original permissions.",
  "check": [
   [
    "A user has Share: Read and NTFS: Full Control on a folder. What is their effective access over the network? Locally?",
    "Read over the network (most restrictive wins); Full Control when logged on locally, where only NTFS applies."
   ],
   [
    "What is the difference between BitLocker and EFS?",
    "BitLocker encrypts an entire volume; EFS encrypts individual files and folders for a specific user."
   ],
   [
    "What does UAC protect against?",
    "Programs or malware making system-level changes silently, by requiring consent or admin credentials for elevation."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2 vs WPA3, AES vs TKIP, RADIUS, TACACS+, Kerberos, multifactor",
  "body": [
   "Wireless networks broadcast through walls, so anyone nearby can try to join or listen. Wireless security protocols provide two things: authentication (who may join) and encryption (keeping traffic private). The original WEP and the first WPA are broken and should never be used.",
   "WPA2 (Wi-Fi Protected Access 2) has been the standard for many years. It uses AES (Advanced Encryption Standard) through the CCMP protocol for strong encryption. WPA2-Personal (PSK, pre-shared key) uses one passphrase for everyone, so it is vulnerable to offline dictionary attacks against weak passphrases captured from the handshake, and anyone who knows the passphrase can join. WPA3 is the current standard. WPA3-Personal replaces the pre-shared key handshake with SAE (Simultaneous Authentication of Equals), which resists offline password guessing and provides forward secrecy, so recording traffic now and learning the password later does not decrypt it. WPA3 also requires Protected Management Frames, which help prevent attackers from forcing devices off the network. Many access points offer a mixed WPA2/WPA3 mode for older devices.",
   "AES vs TKIP: TKIP (Temporal Key Integrity Protocol) was a stopgap used with the original WPA to patch WEP's weaknesses on old hardware. It is deprecated and weak. AES is strong and is the one you should select. If a router offers 'WPA2-PSK (AES)' versus 'WPA/WPA2 TKIP', choose AES; selecting TKIP can also limit Wi-Fi speeds on newer standards.",
   "Businesses use the Enterprise modes (WPA2-Enterprise or WPA3-Enterprise), which authenticate each user individually through 802.1X instead of a shared password. The access point passes the login to an authentication server, usually a RADIUS (Remote Authentication Dial-In User Service) server, which checks credentials against a directory like Active Directory. Each user has their own credentials, so a departing employee is simply disabled. RADIUS is an open standard, uses UDP and encrypts only the password in its packets. It is common for Wi-Fi, VPN and network access.",
   "TACACS+ (Terminal Access Controller Access-Control System Plus) is another AAA (authentication, authorization and accounting) protocol, originally from Cisco. It uses TCP, encrypts the entire payload and separates authentication, authorization and accounting, so it is typically used to control administrator access to network devices such as routers and switches, with per-command authorization. Kerberos is the ticket-based authentication protocol used by Active Directory domains: a user authenticates once to the Key Distribution Center and receives tickets to access services without resending the password, supporting single sign-on within the domain. It depends on reasonably synchronized clocks.",
   "Multifactor authentication can also protect wireless and remote access, for example certificates on managed devices plus user credentials, or RADIUS integrated with an MFA service for VPN logins."
  ],
  "terms": [
   [
    "WPA3",
    "Current Wi-Fi security standard, using SAE in Personal mode to resist offline password guessing."
   ],
   [
    "AES",
    "Advanced Encryption Standard: the strong symmetric cipher used by WPA2 and WPA3."
   ],
   [
    "TKIP",
    "Temporal Key Integrity Protocol: deprecated encryption from the original WPA; avoid it."
   ],
   [
    "RADIUS",
    "An AAA protocol and server used to centrally authenticate Wi-Fi, VPN and network users; uses UDP."
   ],
   [
    "TACACS+",
    "An AAA protocol using TCP and full-payload encryption, commonly for administrator access to network devices."
   ],
   [
    "Kerberos",
    "Ticket-based authentication protocol used by Active Directory domains."
   ]
  ],
  "example": "A company's office Wi-Fi uses one WPA2 passphrase that has been shared with years of former staff and contractors. The technician moves the network to WPA3-Enterprise with a RADIUS server tied to Active Directory, so every employee signs in with their own account and leavers lose Wi-Fi access the moment their account is disabled.",
  "tip": "RADIUS: UDP, encrypts only the password, common for Wi-Fi and VPN users. TACACS+: TCP, encrypts everything, common for admin access to network devices. Choose AES over TKIP and WPA3 over WPA2 when available.",
  "check": [
   [
    "Which Wi-Fi encryption should you choose on a router: TKIP or AES?",
    "AES; TKIP is deprecated and weak."
   ],
   [
    "What does WPA3-Personal's SAE improve over WPA2-Personal?",
    "It resists offline dictionary attacks on the passphrase and provides forward secrecy."
   ],
   [
    "Which protocol would you use to authenticate and authorize network administrators' commands on routers, with full encryption?",
    "TACACS+."
   ]
  ]
 },
 {
  "t": "Malware: virus, trojan, rootkit, ransomware, keylogger, spyware, adware, cryptominer, boot sector virus, stalkerware, fileless malware; tools such as anti-malware, recovery console, EDR/MDR/XDR, email security gateways",
  "body": [
   "Malware is any software designed to harm a system or its user, and the exam expects you to identify each type from its behavior. A virus attaches itself to a legitimate program or file and spreads when that host is run or shared; it needs human action to spread. A boot sector virus infects the boot sector or master boot record, so it loads before the operating system and antivirus software, making it hard to remove from within Windows. A trojan pretends to be useful software, such as a free game or a cracked application, but carries a hidden malicious function, often opening a backdoor. Trojans do not replicate on their own.",
   "Some malware focuses on hiding. A rootkit modifies the operating system or firmware at a deep level so it can conceal files, processes and network connections from the OS and security tools, giving attackers persistent, privileged access. Fileless malware avoids writing a traditional executable to disk; it lives in memory and abuses legitimate built-in tools such as PowerShell or Windows Management Instrumentation, which makes signature-based detection difficult.",
   "Other malware is defined by what it does. Ransomware encrypts the victim's files (or threatens to publish stolen data) and demands payment; good offline backups are the main defense. A keylogger records keystrokes to steal passwords and messages; it may be software or a small hardware device between keyboard and PC. Spyware secretly gathers information about the user's activity. Stalkerware is spyware installed on someone's phone or computer, often by a partner or acquaintance, to track their location, messages and calls. Adware floods the user with advertisements and may change browser settings. A cryptominer uses the victim's CPU or GPU to mine cryptocurrency, showing up as high resource use, heat, fan noise and battery drain.",
   "Defenses come in layers. Anti-malware (antivirus) software scans files and behavior, must be kept updated and should run in real time. When malware prevents normal repair, you can use a recovery console or recovery environment, such as the Windows Recovery Environment or bootable offline scanners, to scan and repair while the infected OS is not running; this is particularly useful against rootkits and boot sector viruses.",
   "Organizations add more advanced tools. EDR (endpoint detection and response) continuously records endpoint activity, detects suspicious behavior, and lets responders investigate and isolate a device. MDR (managed detection and response) is a service in which an outside security team monitors and responds using such tools on the organization's behalf. XDR (extended detection and response) correlates data from endpoints, email, network, identity and cloud into one view. An email security gateway filters inbound and outbound mail, blocking spam, phishing, malicious attachments and dangerous links before they reach inboxes, since email is the most common way malware arrives.",
   "Prevention also includes patching, least privilege, user training, disabling AutoRun, application allow-listing and reliable backups."
  ],
  "terms": [
   [
    "Trojan",
    "Malware disguised as legitimate software that performs hidden malicious actions; it does not self-replicate."
   ],
   [
    "Rootkit",
    "Malware that embeds deep in the OS or firmware to hide itself and maintain privileged access."
   ],
   [
    "Ransomware",
    "Malware that encrypts or steals data and demands payment for its release."
   ],
   [
    "Fileless malware",
    "Malware that runs in memory and abuses legitimate system tools instead of dropping files on disk."
   ],
   [
    "EDR",
    "Endpoint detection and response: tools that monitor endpoint behavior to detect, investigate and contain threats."
   ]
  ],
  "example": "Several laptops in an office suddenly run hot with fans constantly at full speed, and Task Manager shows an unknown process using most of the CPU even when idle. The technician recognizes the signs of a cryptominer, isolates the machines, and uses the EDR console to find that all of them installed the same trojanized browser extension.",
  "tip": "Match the symptom: files encrypted with a ransom note means ransomware; high CPU with no reason means cryptominer; malware that loads before the OS means boot sector virus or rootkit, which calls for scanning from recovery or bootable media.",
  "check": [
   [
    "What distinguishes a trojan from a virus?",
    "A trojan disguises itself as legitimate software and does not self-replicate; a virus attaches to host files and spreads when they are run or shared."
   ],
   [
    "Why is a rootkit hard to detect with software running inside the infected OS?",
    "It modifies the OS at a low level to hide its files, processes and connections from the OS and security tools."
   ],
   [
    "What is the difference between EDR and MDR?",
    "EDR is the technology that monitors and responds on endpoints; MDR is a managed service where an external team uses such tools to monitor and respond for you."
   ]
  ]
 },
 {
  "t": "Social engineering and threats: phishing, vishing, smishing, QR code phishing, whaling, impersonation, tailgating, shoulder surfing, dumpster diving, evil twin, DoS/DDoS, zero-day, on-path, brute force, insider threat, SQL injection, XSS, BEC, supply chain",
  "body": [
   "Social engineering manipulates people rather than technology, exploiting trust, urgency, fear and helpfulness. It is often the easiest way into an organization, so the best defenses are training, verification procedures and a culture where it is safe to say no. Phishing uses fraudulent emails that imitate trusted senders to trick recipients into clicking a malicious link, opening an attachment or entering credentials. Spear phishing targets specific people using personal details. Whaling is phishing aimed at senior executives. Vishing (voice phishing) uses phone calls, often pretending to be the help desk or a bank. Smishing uses SMS text messages. QR code phishing (sometimes called quishing) hides a malicious link in a QR code on a poster, parking meter or email, bypassing link filters because the user scans it with a phone.",
   "Impersonation means pretending to be someone else, such as a technician, delivery driver or executive, to gain access or information. Business email compromise (BEC) is a costly variant: attackers take over or spoof an executive's or supplier's email account and ask staff to wire money or change bank details. Always verify payment changes by calling a known number. Physical techniques include tailgating (following someone through a secure door; piggybacking is the same with the insider's knowledge), shoulder surfing (watching someone type a PIN or read their screen) and dumpster diving (searching trash for documents and discarded media). Shred documents and use privacy screens.",
   "Network and technical threats appear on the exam too. An evil twin is a rogue Wi-Fi access point that copies a legitimate network's name to lure users so the attacker can intercept traffic. An on-path attack (formerly man-in-the-middle) places the attacker between two parties to read or alter their communication. A denial of service (DoS) attack overwhelms a service so legitimate users cannot reach it; a distributed DoS (DDoS) uses many compromised machines, a botnet, at once. A brute force attack tries many passwords until one works; dictionary attacks and credential stuffing (reusing leaked passwords) are related. Defenses include account lockout, strong passwords and MFA.",
   "A zero-day is a vulnerability unknown to the vendor or lacking a patch, so defenders have had 'zero days' to fix it; behavior-based detection and layered defenses help. An insider threat comes from a current or former employee, contractor or partner who misuses their access, deliberately or carelessly; least privilege, monitoring and prompt offboarding reduce the risk. A supply chain attack compromises a trusted vendor, software update or hardware component to reach that vendor's customers.",
   "Two web application attacks round out the list. SQL injection happens when an application builds database queries directly from user input, letting an attacker alter the query to read or change data. The defense is input validation and parameterized queries. Cross-site scripting (XSS) happens when a site includes untrusted input in its pages, so a malicious script runs in other visitors' browsers and can steal session cookies. The defense is validating input and encoding output. As a technician you mostly recognize these and report them to developers."
  ],
  "terms": [
   [
    "Phishing",
    "Fraudulent messages that impersonate trusted sources to steal credentials or deliver malware."
   ],
   [
    "Whaling",
    "Phishing specifically targeting senior executives."
   ],
   [
    "Evil twin",
    "A rogue wireless access point that imitates a legitimate network's name to intercept users' traffic."
   ],
   [
    "BEC",
    "Business email compromise: using a hijacked or spoofed business email account to trick staff into payments or data disclosure."
   ],
   [
    "Zero-day",
    "A vulnerability that is unknown to the vendor or has no available patch."
   ],
   [
    "On-path attack",
    "An attacker positioned between two communicating parties to intercept or modify traffic."
   ]
  ],
  "example": "An accounts payable clerk receives an email that appears to come from a regular supplier, saying their bank account has changed and asking that the next invoice be paid to the new account. Following company procedure, the clerk calls the supplier using the phone number on file, learns the email is fake, and reports it as a BEC attempt.",
  "tip": "Know the channels: phishing is email, vishing is voice, smishing is SMS, quishing is QR code, whaling targets executives. Evil twin is a fake Wi-Fi network; on-path is interception between two parties.",
  "check": [
   [
    "An attacker calls an employee pretending to be from IT and asks for their password. What is this called?",
    "Vishing (voice phishing), a form of impersonation."
   ],
   [
    "What makes a DDoS different from a DoS attack?",
    "A DDoS comes from many distributed sources (often a botnet) at once, while a DoS comes from a single source."
   ],
   [
    "What coding practice prevents SQL injection?",
    "Using parameterized queries (prepared statements) and validating input, instead of building queries from raw user input."
   ]
  ]
 },
 {
  "t": "The seven-step malware removal procedure, in order",
  "body": [
   "CompTIA publishes a best-practice procedure for removing malware, and the exam expects you to know the steps in order and to pick the next step in a scenario. The order is not arbitrary: each step protects the network, the evidence or the repair from the step that follows.",
   "Step 1: Investigate and verify malware symptoms. Before acting, confirm that the problem really is malware and not a hardware fault or misconfiguration. Look for pop-ups, browser redirects, unknown processes, disabled security tools, renamed or encrypted files, unusual network activity and security alerts. Step 2: Quarantine the infected systems. Disconnect the machine from the network (unplug Ethernet, turn off Wi-Fi) so the malware cannot spread, contact a command server or exfiltrate data. Also stop sharing removable media from it.",
   "Step 3: Disable System Restore in Windows. Restore points can contain copies of the malware, and the anti-malware tool may be unable to clean them. If you leave System Restore on, a later restore could reinfect the machine. Disabling it deletes the existing restore points, which is why it happens only after you have confirmed and isolated the infection.",
   "Step 4: Remediate the infected systems. First, update the anti-malware software's definitions and engine; because the PC is quarantined, you may download updates on a clean machine and bring them over, or temporarily allow only the update. Then scan and remove, using the techniques that fit the infection: scanning in Safe Mode, where fewer programs load, or booting into a preinstallation environment (such as Windows PE, the Windows Recovery Environment or a vendor's bootable rescue media) so the malware is not running while it is removed. If the infection cannot be removed confidently, reimage the system from a known-good image and restore data from clean backups.",
   "Step 5: Schedule scans and run updates. Configure regular automatic scans, make sure real-time protection is on, and install operating system and application updates so the vulnerability that allowed the infection is closed. Step 6: Enable System Restore and create a restore point in Windows. Now that the system is clean, turn System Restore back on and create a new, clean restore point to fall back on in future.",
   "Step 7: Educate the end user. Explain how the infection likely happened, such as an email attachment, a fake download or a malicious extension, and how to avoid it. Point them to the acceptable use policy and to how to report suspicious activity. Education is what prevents the same infection returning next week. Throughout the process, document what you found and did in the ticket.",
   "A memory aid for the order: Identify, Quarantine, Disable restore, Remediate, Schedule, Enable restore, Educate."
  ],
  "terms": [
   [
    "Quarantine",
    "Isolating an infected system from the network and other devices to stop malware spreading."
   ],
   [
    "System Restore",
    "Windows feature that returns system files and settings to an earlier restore point; disabled during malware removal because restore points may be infected."
   ],
   [
    "Remediation",
    "Removing the malware and repairing the damage, starting by updating anti-malware tools."
   ],
   [
    "Preinstallation environment",
    "A minimal bootable OS, such as Windows PE, used to scan or repair a system while its own OS is not running."
   ],
   [
    "Restore point",
    "A snapshot of system files, registry and settings that System Restore can roll back to."
   ]
  ],
  "example": "A user reports browser redirects and a new toolbar they did not install. The technician confirms the symptoms, unplugs the network cable, turns off System Restore, updates the anti-malware definitions from USB, scans in Safe Mode and removes the adware. After scheduling daily scans and patching the browser, they re-enable System Restore, create a restore point and explain to the user how the fake download installed the toolbar.",
  "tip": "Most questions ask for the next step. Quarantine comes before disabling System Restore; updating the anti-malware software comes before scanning; re-enabling System Restore comes after the system is clean; educating the user is last.",
  "check": [
   [
    "You have confirmed malware on a PC. What is the next step?",
    "Quarantine the system by disconnecting it from the network."
   ],
   [
    "Why is System Restore disabled before remediation?",
    "Existing restore points may contain the malware, and restoring from them later could reinfect the system."
   ],
   [
    "What is the first thing you do within the remediation step?",
    "Update the anti-malware software and its definitions, then scan and remove the malware."
   ]
  ]
 },
 {
  "t": "Workstation hardening: data-at-rest encryption, password policy, end-user best practices (screensaver locks, logging off), account management, disable AutoRun/AutoPlay, disable guest account",
  "body": [
   "Hardening means reducing a system's attack surface: turning off what is not needed, locking down what is, and making the remaining features as secure as possible. Workstations are a prime target because users sit at them all day, open email and browse the web, so the A+ exam covers a standard hardening checklist.",
   "Data-at-rest encryption protects information stored on the disk if a laptop is lost or stolen or a drive is removed. On Windows this is usually BitLocker (full-volume encryption) or EFS for individual files; on macOS it is FileVault. Without encryption, anyone can remove the drive, connect it to another computer and read everything, regardless of the Windows password.",
   "A password policy sets rules for passwords, usually enforced by Group Policy or a device-management tool. It can include minimum length (length matters more than complexity for resisting guessing), complexity requirements (mixing character types), password history to stop reuse, expiration where required by policy, and account lockout after a number of failed attempts to slow brute-force guessing. Current guidance favors long passphrases, screening against known-breached passwords and MFA over frequent forced changes. Also set BIOS/UEFI passwords so no one can change boot settings or boot from USB without authorization.",
   "End-user best practices matter just as much. Configure a screensaver or screen lock that activates after a short idle period and requires a password to resume. Teach users to lock the screen manually whenever they walk away (Windows key + L on Windows, Control + Command + Q on a Mac) and to log off at the end of the day. Encourage them to keep sensitive paperwork off desks, use privacy screens in public and never write passwords on sticky notes.",
   "Account management applies least privilege to workstation accounts. Users should work with standard accounts and use a separate administrator account only when needed. Restrict login times where appropriate, disable accounts promptly when people leave, remove unused accounts, rename or disable the built-in Administrator account where policy allows, and set account expiration for temporary staff. Disable the Guest account: it allows anyone to use the machine without their own credentials, and it is disabled by default in current Windows, so check that it stays that way.",
   "Finally, disable AutoRun and AutoPlay. AutoRun could once launch a program automatically when a CD or USB drive was inserted, which malware abused to spread. AutoPlay asks what to do with new media. Modern Windows no longer honors AutoRun from USB drives, but hardening guides still call for turning AutoPlay off (Settings > Bluetooth and devices > AutoPlay, or through Group Policy) so inserted media never triggers actions without the user choosing. Other hardening steps include removing unneeded software and services, changing default passwords, keeping the OS and apps patched and running up-to-date anti-malware."
  ],
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface by disabling unneeded features and securing the rest."
   ],
   [
    "Data at rest",
    "Data stored on a disk or other media, as opposed to data moving across a network."
   ],
   [
    "Account lockout",
    "Policy that disables an account temporarily after a set number of failed sign-in attempts."
   ],
   [
    "AutoPlay",
    "Windows feature that prompts or acts automatically when removable media is inserted; disabled when hardening."
   ],
   [
    "Guest account",
    "A built-in account allowing sign-in without personal credentials; it should remain disabled."
   ]
  ],
  "example": "During an office walk-through after hours, a security auditor finds three unlocked, logged-on PCs and a sticky note with a password under a keyboard. The IT team responds by pushing a Group Policy that locks screens after five minutes of inactivity, running a short awareness session on Windows key + L, and requiring BitLocker on all laptops.",
  "tip": "Lost or stolen laptop questions point to data-at-rest encryption. 'Users leave desks unattended' points to screen lock timeouts. 'Malware spreads from USB sticks' points to disabling AutoRun/AutoPlay.",
  "check": [
   [
    "What threat does full-disk encryption address that a Windows password alone does not?",
    "Someone removing the drive or booting another OS to read data; encryption keeps the data unreadable without the key."
   ],
   [
    "Which policy slows brute-force password guessing at the sign-in screen?",
    "Account lockout after a set number of failed attempts."
   ],
   [
    "Why should the Guest account stay disabled?",
    "It allows access without individual credentials, so actions are unaccountable and an attacker gets an easy foothold."
   ]
  ]
 },
 {
  "t": "Mobile device security: screen locks, remote wipe, locator apps, OS updates, device encryption, remote backup, MDM, BYOD vs corporate-owned",
  "body": [
   "Phones and tablets carry email, files, authenticator apps and company chat, and they are easily lost or stolen. Mobile security aims to keep a lost device from becoming a data breach and to keep devices free of malware.",
   "The first control is the screen lock. Options include a PIN, a passcode or password, a pattern (swipe) lock, fingerprint and facial recognition. Biometrics are convenient, but a strong PIN or passcode remains the fallback. Devices can be configured to erase themselves or impose increasing delays after a number of failed attempts, which defeats guessing. A short auto-lock timeout matters too.",
   "Device encryption protects data at rest. Modern iOS and Android devices encrypt storage by default when a screen lock is set, and the encryption key is tied to the lock, so a weak or missing lock weakens the protection. Keep the OS updated: updates patch vulnerabilities that attackers use, and devices that no longer receive updates (end-of-life models) should be replaced for business use. App updates matter as well.",
   "If a device is lost, locator apps (such as Find My on Apple devices and Find My Device on Android) show its location, play a sound, lock it and display a message. If the device cannot be recovered, remote wipe erases it so the data cannot be read. Remote wipe only works if the feature was enabled beforehand and the device can connect to the network. Remote backup, such as iCloud or Google backup, or the organization's cloud services, means that wiping a device does not mean losing the data. Many organizations also require the device's built-in anti-theft protections, such as activation lock, which ties the device to the owner's account so a thief cannot reset and reuse it.",
   "Mobile device management (MDM) lets an organization enforce all of this centrally: require passcodes and encryption, push Wi-Fi, email and VPN settings, install or block apps, enforce OS versions, and lock or wipe devices remotely. Mobile application management (MAM) focuses on managing just the company's apps and data. Security policies are often checked before a device may reach corporate resources; a jailbroken or out-of-date phone can be blocked.",
   "Ownership models shape what is appropriate. With BYOD (bring your own device), employees use personal phones for work. It saves money and is convenient, but the company must respect privacy, so it typically manages only a separate work profile or container and performs a selective wipe that removes corporate data only. With corporate-owned devices, the organization buys the device and can manage it fully, including full wipes and restrictions. Variants include COPE (corporate-owned, personally enabled) and CYOD (choose your own device from an approved list). An acceptable use policy should spell out the rules for each model."
  ],
  "terms": [
   [
    "Remote wipe",
    "Erasing a lost or stolen device's data over the network."
   ],
   [
    "MDM",
    "Mobile device management: central enrollment and policy enforcement for mobile devices, including remote lock and wipe."
   ],
   [
    "BYOD",
    "Bring your own device: employees use personal devices for work, usually with a managed work profile."
   ],
   [
    "Locator app",
    "An app or service that shows a device's location and can ring, lock or wipe it."
   ],
   [
    "Selective wipe",
    "Removing only corporate data and apps from a device while leaving personal data intact."
   ]
  ],
  "example": "A sales manager leaves a company-managed phone in a taxi. She reports it within the hour. The help desk uses the MDM console to see the phone's last location, locks it with a message showing a return phone number, and when it has not been returned by the next day, issues a remote wipe. Because her data is backed up to the cloud, a replacement phone is ready by the afternoon.",
  "tip": "For BYOD, the answer is usually a work profile plus selective wipe of corporate data, not a full wipe of the employee's personal phone. Remote wipe only works if it was set up before the device was lost.",
  "check": [
   [
    "Why is a strong screen lock important even though phones encrypt storage by default?",
    "The encryption key is protected by the lock; a weak or missing lock makes the encryption easy to bypass."
   ],
   [
    "What is the difference in wiping between BYOD and corporate-owned devices?",
    "BYOD usually gets a selective wipe of corporate data only; corporate-owned devices can be fully wiped."
   ],
   [
    "What service lets an organization enforce passcodes and push VPN settings to all company phones?",
    "Mobile device management (MDM)."
   ]
  ]
 },
 {
  "t": "Data destruction: shredding, drilling, degaussing, incineration; erasing/wiping vs low-level vs standard format; certificates of destruction",
  "body": [
   "When storage devices leave service, the data on them must not leave with them. Deleting files or even formatting a drive does not reliably remove data, and recovery tools can often retrieve it. Organizations therefore choose between sanitizing a device so it can be reused and physically destroying it so it can never be read.",
   "Physical destruction methods: Shredding feeds drives, tapes, optical discs or paper into an industrial shredder that cuts them into small pieces. Drilling puts holes through a hard disk's platters, which quickly makes the drive unusable, although fragments of platter between the holes could in theory still hold data, so it is less thorough than shredding. For SSDs, the memory chips themselves must be destroyed. Incineration burns media completely and is often used for paper and highly sensitive items. Pulverizing and crushing are related methods. Degaussing exposes magnetic media (hard disk platters, tapes) to a very strong magnetic field that scrambles the stored data; it usually also destroys the drive's servo information, so the drive cannot be reused. Degaussing does not work on SSDs, flash drives or optical discs, which do not store data magnetically.",
   "Sanitizing for reuse: Erasing or wiping software overwrites every addressable location on the drive, often with zeros or random data, so previous data cannot be read. For SSDs, use the manufacturer's secure erase command or the drive's built-in sanitize feature, because wear leveling means ordinary overwriting may miss some cells. Self-encrypting drives can be sanitized by cryptographic erase, which destroys the encryption key.",
   "Know how formats differ. A standard format (a quick format in Windows) creates a new empty file system and marks the space as free, but the old data remains on the disk until overwritten and can be recovered. A full format in modern Windows also writes zeros across the volume, which is better, but it is not a formal, verified sanitization process. A low-level format originally meant rewriting the drive's physical sector structure at the factory; modern drives cannot be truly low-level formatted by users, and what tools call a low-level format today is really a zero-fill utility from the manufacturer. For the exam, remember that standard formats leave data recoverable, while wiping or low-level formatting with drive tools makes it much harder to recover.",
   "Outsourcing and records: Many organizations use a third-party destruction vendor. The vendor should provide a certificate of destruction listing the devices (often by serial number), the method and the date. This document proves the organization met its legal and regulatory obligations and completes the asset's life cycle record. Some organizations witness the destruction or require on-site shredding for extra assurance."
  ],
  "terms": [
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field; ineffective on SSDs and optical media."
   ],
   [
    "Wiping",
    "Overwriting all data on a drive so it cannot be recovered, allowing the drive to be reused."
   ],
   [
    "Standard format",
    "Creating a new file system without overwriting data; the old data remains recoverable."
   ],
   [
    "Certificate of destruction",
    "Document from a destruction vendor recording which media were destroyed, how and when."
   ],
   [
    "Cryptographic erase",
    "Sanitizing a self-encrypting drive by destroying its encryption key, making the data unreadable."
   ]
  ],
  "example": "A clinic is replacing 30 PCs that stored patient records. Drives that will be donated with the PCs are wiped with the manufacturer's secure erase tool and verified. Drives from the records server are sent to a certified vendor for shredding, and the clinic files the certificate of destruction listing each serial number with its compliance records.",
  "tip": "Degaussing does nothing to SSDs or flash media. A quick or standard format does not remove data. If the drive must be reused, wipe it; if it must never be readable again, physically destroy it and get a certificate.",
  "check": [
   [
    "Why is degaussing not suitable for an SSD?",
    "SSDs store data in flash memory, not magnetically, so a magnetic field does not erase them."
   ],
   [
    "A company wants to donate old PCs. Which method is appropriate for their hard drives?",
    "Wiping (secure overwrite or manufacturer secure erase) so the drives remain usable but the data is unrecoverable."
   ],
   [
    "What does a certificate of destruction prove?",
    "That specific media were destroyed by a stated method on a stated date, providing evidence for compliance and audits."
   ]
  ]
 },
 {
  "t": "SOHO router hardening: default passwords, firmware updates, disabling WPS and UPnP, content filtering, port forwarding, DHCP reservations, guest networks",
  "body": [
   "A SOHO (small office/home office) router usually combines a router, switch, wireless access point, firewall and DHCP server in one box. Out of the box it is set up for easy installation, not security, so hardening it is one of the first things a technician does.",
   "Change the default administrator username and password first. Default credentials are published in manuals and online, so attackers try them automatically. Also change the default Wi-Fi network name (SSID) if it reveals the router model, and set strong WPA3 or WPA2 (AES) security with a long passphrase. Consider disabling remote management from the internet so the admin page is reachable only from inside the network, and use the router's HTTPS management option if available.",
   "Update the firmware. Router firmware contains the operating system of the device, and vendors release updates to fix security flaws. Check the vendor's support site or the router's update page, enable automatic updates if available, and replace routers that no longer receive updates.",
   "Disable features that trade security for convenience. WPS (Wi-Fi Protected Setup) lets devices join by pressing a button or entering an eight-digit PIN; the PIN method has a design weakness that allows it to be guessed quickly, so turn WPS off. UPnP (Universal Plug and Play) lets devices and applications on the network automatically open ports on the router, which malware can abuse to expose internal systems, so disable it unless a specific need is documented.",
   "Configure what is allowed in and out. Port forwarding sends traffic arriving at a specific external port to a particular internal IP address and port, for example to reach a security camera recorder. Forward only what is needed, to the exact device, and remove rules that are no longer used. Because port forwarding points at an internal IP, give that device a DHCP reservation, which ties an IP address to the device's MAC address so it always receives the same address, or a static IP outside the DHCP pool. DHCP reservations also make it easy to track devices. Content filtering blocks categories of websites or specific sites, which is useful for parental controls or blocking known malicious domains. Some routers also offer MAC filtering, although MAC addresses can be spoofed, so it is a weak control on its own.",
   "Finally, create a guest network. It gives visitors internet access on a separate SSID and network segment that cannot reach the office's computers, printers or file shares. Many organizations also put smart home or IoT (Internet of Things) devices on a separate network so a compromised gadget cannot reach work computers. Also consider physical placement of the router and adjusting wireless transmit power so the signal does not extend far beyond the premises."
  ],
  "terms": [
   [
    "WPS",
    "Wi-Fi Protected Setup: a simplified pairing feature whose PIN method is vulnerable to guessing; disable it."
   ],
   [
    "UPnP",
    "Universal Plug and Play: lets devices automatically open router ports; disable it to prevent abuse."
   ],
   [
    "Port forwarding",
    "Router rule that sends traffic arriving on an external port to a specific internal device and port."
   ],
   [
    "DHCP reservation",
    "Configuration that always assigns the same IP address to a device based on its MAC address."
   ],
   [
    "Guest network",
    "A separate wireless network that gives visitors internet access while isolating them from internal resources."
   ]
  ],
  "example": "A small accounting firm's router still uses its factory admin password, has WPS and UPnP enabled, and gives visitors the main Wi-Fi password. The technician updates the firmware, sets a unique admin password, disables WPS, UPnP and remote administration, creates a guest SSID isolated from the office LAN, and reserves an address for the network printer.",
  "tip": "The first hardening step for any SOHO router is changing the default admin password. Port forwarding needs a stable internal address, so pair it with a DHCP reservation or static IP.",
  "check": [
   [
    "Why should WPS be disabled?",
    "Its PIN method can be brute-forced quickly, letting attackers recover the Wi-Fi passphrase and join the network."
   ],
   [
    "Why does a device that receives port-forwarded traffic need a DHCP reservation?",
    "Port forwarding points to a fixed internal IP address; if the device's address changed, the rule would send traffic to the wrong place."
   ],
   [
    "What is the benefit of a guest network?",
    "Visitors get internet access without being able to reach internal computers, printers and shares."
   ]
  ]
 },
 {
  "t": "Browser security: trusted sources and hash checks, extensions, password managers, certificates, pop-up blockers, clearing cache, private browsing, profile sync",
  "body": [
   "The web browser is where users meet most online threats, from fake downloads to phishing pages, so securing it is a key support task. Start with where software comes from. Download browsers, extensions and applications only from trusted sources: the vendor's official website or an official app or extension store. Avoid download mirrors and ads that imitate download buttons. When a vendor publishes a hash (such as a SHA-256 value) for a file, compute the hash of what you downloaded and compare; if they match, the file was not altered or corrupted. On Windows you can use `certutil -hashfile file.iso SHA256` or PowerShell's `Get-FileHash`.",
   "Extensions (add-ons, plug-ins) add features but can read and change the pages you visit, so a malicious or compromised extension can steal data, inject ads or redirect searches. Install only extensions you need, from the official store, from reputable developers, and review the permissions they request. Remove unused ones. Organizations can allow-list extensions through policy.",
   "Password managers generate and store unique, strong passwords for every site and fill them automatically. They also help against phishing, because a manager will not auto-fill a password on a look-alike domain. Browsers include built-in managers, and standalone ones work across browsers and devices. Protect the manager with a strong master password and MFA.",
   "Certificates make HTTPS work. A website presents a digital certificate issued by a trusted certificate authority (CA); the browser checks that it is valid, unexpired and issued for the site's name, then sets up an encrypted connection and shows a padlock. A padlock means the connection is encrypted to that domain, not that the site is honest; phishing sites can have valid certificates. Certificate warnings (expired, wrong name, untrusted issuer) should never be clicked through casually, because they may indicate an on-path attack. Organizations may install internal CA certificates on managed devices.",
   "Pop-up blockers stop sites from opening unwanted windows, which are often ads or scams; you can allow pop-ups for specific trusted sites that need them, such as a bank's statements. Clearing the cache and cookies removes stored website data, which fixes many display and sign-in problems and removes tracking data, but it also signs the user out of sites. Private browsing (Incognito or InPrivate) does not save history, cookies or form data after the window closes, which is useful on shared computers, but it does not hide activity from the network, employer or websites, and it does not protect against malware.",
   "Profile sync signs the browser into an account so bookmarks, passwords, history, extensions and settings follow the user to other devices. It is convenient, but it spreads saved passwords and extensions everywhere, so protect the sync account with MFA, and avoid syncing a personal profile on a work device or a work profile on a personal one. Keep the browser itself updated, since browsers patch serious vulnerabilities frequently."
  ],
  "terms": [
   [
    "Hash check",
    "Comparing a file's computed hash value with the vendor's published value to confirm it was not altered."
   ],
   [
    "Browser extension",
    "An add-on that extends browser features and can access page content, so it must come from trusted sources."
   ],
   [
    "Certificate authority (CA)",
    "A trusted organization that issues digital certificates vouching for a website's identity."
   ],
   [
    "Private browsing",
    "A browser mode that does not keep local history, cookies or form data after the session ends."
   ],
   [
    "Profile sync",
    "Syncing bookmarks, passwords, extensions and settings across devices through a browser account."
   ]
  ],
  "example": "A user's searches keep landing on an unfamiliar search engine full of ads. The technician checks the browser's extensions and finds a 'PDF converter' add-on the user installed from a pop-up. After removing it, resetting the search and home page settings and clearing the cache, the browser behaves normally, and the user learns to install extensions only from the official store.",
  "tip": "Private browsing hides history on the local device only; it is not anonymity or malware protection. A valid padlock proves encryption to a named domain, not that the site is trustworthy.",
  "check": [
   [
    "How can you verify that a downloaded ISO has not been tampered with?",
    "Compute its hash (for example SHA-256) and compare it with the hash published by the vendor on its official site."
   ],
   [
    "What does private browsing not protect against?",
    "Tracking by the network, employer, ISP or websites themselves, and malware; it only avoids storing local history and cookies."
   ],
   [
    "Why can a malicious extension be so harmful?",
    "Extensions can read and modify the pages a user visits, letting them steal data, inject ads or redirect traffic."
   ]
  ]
 },
 {
  "t": "Windows symptoms: blue screen (BSOD), degraded performance, boot problems, frequent shutdowns, services not starting, application crashes, low memory warnings, USB controller resource warnings, system instability, no OS found, slow profile load, time drift",
  "body": [
   "Troubleshooting starts with recognizing a symptom and knowing what it usually points to. The exam describes what the user sees and asks for the most likely cause or the best next step, so link each symptom to its common causes.",
   "A blue screen of death (BSOD), or stop error, means Windows hit a fatal error and halted to protect itself. The screen shows a stop code (such as a named code like IRQL_NOT_LESS_OR_EQUAL) and Windows writes a memory dump. Common causes are faulty or incompatible drivers, failing RAM, overheating, disk errors and recent hardware or software changes. Note the stop code, check Event Viewer and Reliability Monitor, and think about what changed recently. System instability, meaning random freezes, restarts and odd errors, has the same list of suspects plus malware and power problems.",
   "Degraded performance (the PC is slow) often comes from too many startup programs, a nearly full disk, insufficient RAM for the workload, a failing drive, malware, background updates or thermal throttling. Low memory warnings mean the system has run out of RAM and virtual memory; a program with a memory leak, too many applications or a small paging file can cause them. Application crashes can come from bugs, corrupt installations, missing dependencies, incompatible versions or damaged user settings. Services not starting usually trace to a disabled service, a dependency that failed, wrong service account credentials or corrupt files; Services (`services.msc`) and Event Viewer show the reason.",
   "Boot problems cover several symptoms. 'No OS found' (or 'Operating system not found', 'Bootmgr is missing') suggests the firmware cannot find a bootable disk: check the boot order, whether a USB stick is left plugged in, whether the drive is detected in UEFI/BIOS, and whether the boot configuration is damaged. Frequent shutdowns without warning point strongly to overheating (dust, failed fan) or a failing power supply rather than software. A slow profile load, a long wait at 'Preparing Windows' or 'Welcome', often comes from a large or corrupt roaming profile, slow network connections to mapped drives or login scripts, or a corrupt local profile, which may also produce a temporary profile.",
   "USB controller resource warnings appear when too many devices are connected to one USB controller and it runs out of resources (endpoints or bandwidth). Moving devices to ports on a different controller, removing a hub or updating chipset drivers usually fixes it. Time drift means the system clock is wrong or slowly drifts. Causes include a failing CMOS battery (time resets after power loss), incorrect time zone, and failure to sync with a time server (NTP, Network Time Protocol) or domain controller. Time matters: Kerberos authentication in a domain fails if clocks differ too much, and certificate checks can fail.",
   "A good habit for every symptom is asking three questions: what changed recently, is it one user or many, and is it software or hardware?"
  ],
  "terms": [
   [
    "BSOD",
    "Blue screen of death: a Windows stop error that halts the system after a critical fault, often driver or hardware related."
   ],
   [
    "Stop code",
    "The error name or number shown on a BSOD that identifies the type of failure."
   ],
   [
    "Memory leak",
    "A program bug that keeps consuming memory without releasing it, eventually causing low-memory conditions."
   ],
   [
    "Time drift",
    "A computer clock gradually becoming inaccurate, often due to a failed CMOS battery or time sync problems."
   ],
   [
    "Temporary profile",
    "A profile Windows loads when the user's real profile cannot be loaded, discarding changes at sign-out."
   ]
  ],
  "example": "A workstation shows a BSOD every afternoon, and the stop code refers to a network driver file. Reliability Monitor shows the crashes began the day after a new network adapter driver was installed. The technician rolls back the driver in Device Manager and the crashes stop.",
  "tip": "Unexpected shutdowns without a BSOD usually mean heat or power. 'No OS found' often means the boot order is wrong or a USB drive is still attached. Clock resetting after power loss means the CMOS battery.",
  "check": [
   [
    "A PC's clock resets to a date years ago every time it is unplugged. What is the likely cause?",
    "A failed CMOS battery on the motherboard."
   ],
   [
    "What is the most common cause of a BSOD right after installing new hardware?",
    "A faulty or incompatible driver for that hardware."
   ],
   [
    "A user gets a USB controller resource warning after plugging in a new hub full of devices. What should you try?",
    "Move some devices to ports on a different USB controller, remove the hub or reduce devices, and update chipset drivers."
   ]
  ]
 },
 {
  "t": "Windows fixes: reboot, restart services, uninstall/reinstall/update apps, add resources, verify requirements, sfc and DISM, repair Windows, System Restore, reimage, roll back updates, rebuild the user profile",
  "body": [
   "Once you have identified a probable cause, choose a fix. A good rule is to try the least disruptive fix that addresses the cause, and move to more drastic options only if needed. Always back up user data before anything that could lose it, and document what you did.",
   "Start simple. A reboot clears memory, restarts services and completes pending updates; it fixes a surprising number of problems. Remember that Shut down with fast startup does not fully reload the kernel, so choose Restart. If one service has stopped, restart it in Services (`services.msc`) or Task Manager, set its startup type correctly and check its dependencies. For a misbehaving application, update it first (the vendor may have fixed the bug), then try the repair option in Apps settings, then uninstall and reinstall to replace damaged files and settings.",
   "If the system simply lacks capacity, add resources: more RAM for low-memory warnings, a larger or faster drive for a full disk, or a larger paging file. Before blaming Windows, verify requirements: check that the application, driver or OS version meets the vendor's stated requirements and is supported on this edition and architecture.",
   "For corrupted system files, run `sfc /scannow` from an elevated prompt. If it cannot repair everything, run `DISM /Online /Cleanup-Image /RestoreHealth` to repair the component store and then run sfc again. If Windows is badly damaged, repair Windows: use Startup Repair from the Windows Recovery Environment for boot problems, or perform an in-place repair install that reinstalls Windows while keeping apps and files.",
   "Undo recent changes when problems began after one. System Restore rolls back system files, drivers, registry and installed programs to a restore point without touching personal documents. You can roll back a driver in Device Manager, and roll back updates by uninstalling a recent quality update (Settings > Windows Update > Update history > Uninstall updates) or going back to the previous feature version within the allowed window. Pause updates while waiting for a fix.",
   "For profile-specific problems, such as settings not saving, a temporary profile or one user's apps crashing while other users are fine, rebuild the user profile. The usual approach is to back up the user's data, sign in as an administrator, rename or remove the damaged profile folder and its registry entry (ProfileList), and have the user sign in again so Windows creates a fresh profile, then copy the data back.",
   "Finally, reimage the computer, which means reinstalling a standard image or doing a clean install, when the system is heavily damaged, infected beyond confidence, or when troubleshooting would take longer than rebuilding. Reset this PC is a built-in variant that can keep or remove personal files. Reimaging is reliable but slow for the user, so make sure data is backed up and applications can be reinstalled."
  ],
  "terms": [
   [
    "System Restore",
    "Rolls back system files, registry, drivers and programs to a restore point while keeping personal files."
   ],
   [
    "Reimage",
    "Replacing a computer's OS installation with a fresh standard image or clean install."
   ],
   [
    "Roll back driver",
    "A Device Manager option that reinstalls the previously installed driver version."
   ],
   [
    "Repair install",
    "Reinstalling Windows in place to replace system files while keeping applications and data."
   ],
   [
    "User profile rebuild",
    "Creating a fresh user profile to fix corruption, then restoring the user's data into it."
   ]
  ],
  "example": "After a monthly update, a line-of-business app crashes on start for every user on one PC model. The technician confirms the timing in Reliability Monitor, uninstalls the specific update from Update history, pauses updates on those machines, and reports the conflict to the vendor.",
  "tip": "Pick the least invasive fix that matches the cause: restart before reinstall, reinstall the app before repairing Windows, System Restore before reimage. If only one user has the problem, suspect the profile.",
  "check": [
   [
    "Only one user on a shared PC gets a temporary profile at sign-in. What fix is appropriate?",
    "Rebuild that user's profile: back up data, remove or rename the corrupt profile and let Windows create a new one, then restore data."
   ],
   [
    "Does System Restore delete a user's documents?",
    "No; it rolls back system files, settings, drivers and programs but leaves personal files alone."
   ],
   [
    "What should you run if sfc /scannow cannot repair some files?",
    "DISM /Online /Cleanup-Image /RestoreHealth, then sfc /scannow again."
   ]
  ]
 },
 {
  "t": "Using Event Viewer, Reliability Monitor, Task Manager and Safe Mode / Windows Recovery Environment to find root causes",
  "body": [
   "Guessing wastes time; Windows records a great deal about what goes wrong, and these tools help you find the root cause instead of just treating symptoms.",
   "Event Viewer (`eventvwr.msc`) is the central log reader. The main Windows logs are Application (events from programs), System (events from Windows components and drivers, such as service failures and unexpected shutdowns) and Security (audited events such as sign-ins and failed log-on attempts). Setup and Forwarded Events also exist, and Applications and Services Logs hold detailed logs for individual components. Each event has a level (Information, Warning, Error, Critical), a date and time, a source and an Event ID. Filter the log by level and time around when the problem happened, then search the source and Event ID in vendor documentation. Custom views save useful filters.",
   "Reliability Monitor (search 'reliability history', or open it through Security and Maintenance) shows a day-by-day stability chart. Each day lists application failures, Windows failures, warnings and informational events such as successful updates and software installs. Because it places crashes next to installs on a timeline, it is the fastest way to answer 'what changed right before this started?'. Click an event for its details and a link to its technical information.",
   "Task Manager shows what is happening right now. The Processes tab reveals which program is consuming CPU, memory, disk or network; the Performance tab shows whether the system is short of RAM or disk throughput; the Startup apps tab shows programs that load at sign-in with their impact; the Services tab shows which services are running. Resource Monitor (from the Performance tab) digs into per-process disk and network use.",
   "When Windows is too unstable to troubleshoot normally, Safe Mode starts it with a minimal set of drivers and services. If a problem disappears in Safe Mode, the cause is likely a third-party driver, startup program or service. Safe Mode with Networking adds network drivers, useful for downloading tools. You reach it through the Windows Recovery Environment or by setting Safe boot in `msconfig` (remember to turn it off afterwards).",
   "The Windows Recovery Environment (WinRE) loads automatically after repeated failed boots, or from Settings > System > Recovery > Advanced startup, by holding Shift while clicking Restart, or from installation media. Its Troubleshoot > Advanced options menu offers Startup Repair, Startup Settings (Safe Mode and others), System Restore, uninstall updates, System Image Recovery, UEFI firmware settings and a Command Prompt for tools like `chkdsk`, `sfc` and boot repair commands. Together these tools let you trace a problem back to its cause and fix it even when Windows will not start normally."
  ],
  "terms": [
   [
    "Event ID",
    "A number identifying the type of event logged by a given source in Event Viewer."
   ],
   [
    "Reliability Monitor",
    "A timeline of application and Windows failures, warnings and installs used to correlate problems with changes."
   ],
   [
    "Safe Mode",
    "A diagnostic startup mode that loads only essential drivers and services."
   ],
   [
    "WinRE",
    "Windows Recovery Environment: a recovery OS offering Startup Repair, System Restore, Safe Mode options and a command prompt."
   ],
   [
    "System log",
    "The Event Viewer log that records events from Windows components, drivers and services."
   ]
  ],
  "example": "A laptop restarts on its own a few times a week. Reliability Monitor shows 'Windows was not properly shut down' on those days, and the System log in Event Viewer shows a Kernel-Power critical event each time. There is no BSOD, and the laptop's vents are full of dust. The technician cleans the cooling system, and the unexpected restarts stop.",
  "tip": "Use the right tool for the question: 'what is slow right now' is Task Manager, 'what errors were logged' is Event Viewer, 'what changed before this started' is Reliability Monitor, 'Windows will not boot' is WinRE.",
  "check": [
   [
    "Which Event Viewer log would show a failed sign-in attempt?",
    "The Security log (when auditing is enabled)."
   ],
   [
    "A problem disappears when you boot into Safe Mode. What does that suggest?",
    "A third-party driver, startup program or service is causing it, since Safe Mode loads only essential components."
   ],
   [
    "Name two ways to reach the Windows Recovery Environment.",
    "Hold Shift while clicking Restart; use Settings > Recovery > Advanced startup; boot from installation media; or let it start automatically after repeated failed boots."
   ]
  ]
 },
 {
  "t": "Mobile OS and app issues: app fails to launch, close or update; slow response; poor battery life; random reboots; Bluetooth, Wi-Fi and NFC connectivity; screen won't autorotate",
  "body": [
   "Mobile troubleshooting follows the same method as PC troubleshooting, but the tools are simpler and the fixes follow a predictable ladder: close and reopen the app, restart the device, update the app and the OS, clear the app's cache or data, reinstall the app, reset network settings, and as a last resort back up and factory reset.",
   "When an app fails to launch or keeps crashing, force-stop it and try again, restart the device, and check that both the app and the OS are up to date, since apps often stop working on outdated OS versions or before an update adds support for a new OS. On Android you can clear the app's cache and, if needed, its data from the app's settings page; on iOS you can offload or delete and reinstall it. Check storage too: many apps fail or refuse to update when the device is nearly full. An app that fails to close may be frozen; use the app switcher to swipe it away, or restart the device. Apps that fail to update usually point to low storage, a poor connection, account or payment issues in the app store, or an OS version the new release no longer supports.",
   "Slow response usually comes from low storage, too many apps running, a full memory, an outdated OS or an overheating device. Freeing space, closing apps, updating and restarting are the standard fixes. Poor battery life comes from high screen brightness, apps running in the background, weak cellular signal (the radio works harder), location services, and an aging battery. Check the battery usage screen to see which apps consume the most, restrict their background activity, and check battery health; batteries lose capacity over time and eventually need replacement. A swollen battery is a safety hazard, so stop using the device.",
   "Random reboots may be caused by faulty apps, OS bugs fixed in updates, overheating, a failing battery or hardware faults. Update everything, check for a recently installed app, and if it persists, back up and reset or send the device for repair.",
   "For connectivity problems, first check the obvious: airplane mode off, the right radio switched on. For Wi-Fi, forget the network and rejoin it, confirm the password and that the phone is in range, and restart the router if many devices are affected. For Bluetooth, confirm the accessory is charged and in pairing mode, remove (unpair) the device and pair it again, and check it is not still connected to another phone. For NFC (near-field communication, used for contactless payments), make sure NFC is enabled, the payment app is set as default, and the phone is held very close to the reader; thick cases can interfere. Resetting network settings clears saved networks and pairings and fixes many stubborn issues.",
   "When the screen won't autorotate, check that rotation lock (portrait orientation lock) is off in the control center or quick settings panel, and remember that some apps and home screens do not rotate by design. If rotation still fails in apps that should rotate, restart the device; a persistent failure may mean a faulty accelerometer or gyroscope sensor."
  ],
  "terms": [
   [
    "Force stop",
    "Closing an app's processes completely so it restarts cleanly the next time it opens."
   ],
   [
    "Clear cache",
    "Deleting an app's temporary files without removing its account data or settings."
   ],
   [
    "Reset network settings",
    "Restoring Wi-Fi, Bluetooth and cellular settings to defaults, removing saved networks and pairings."
   ],
   [
    "NFC",
    "Near-field communication: very short-range wireless used for contactless payments and pairing."
   ],
   [
    "Rotation lock",
    "A setting that keeps the display in one orientation regardless of how the device is held."
   ]
  ],
  "example": "A user says their phone battery barely lasts until lunch since last week. The battery usage screen shows a newly installed fitness app using most of the power in the background with constant location access. The technician restricts the app's background activity and changes location access to 'only while using the app', and battery life returns to normal.",
  "tip": "Screen will not rotate: check rotation lock first. App will not update: check storage and OS compatibility. Bluetooth accessory will not connect: unpair and re-pair.",
  "check": [
   [
    "A phone's screen stays in portrait in every app. What is the first thing to check?",
    "Whether rotation lock (portrait orientation lock) is turned on."
   ],
   [
    "What is the difference between clearing an app's cache and clearing its data on Android?",
    "Clearing cache removes temporary files only; clearing data resets the app completely, removing its settings and signed-in account."
   ],
   [
    "Name three common causes of poor battery life.",
    "Background apps, high screen brightness, weak signal, heavy location use, and an aging battery."
   ]
  ]
 },
 {
  "t": "Mobile security issues: unofficial app stores, jailbreaking and rooting, sideloaded APKs, high network traffic, data-limit alerts, sluggish response, fake security warnings, unexpected app behavior, leaked personal files",
  "body": [
   "Mobile devices are secured largely by their app stores and operating system sandboxes, which keep apps isolated from each other and from the system. Most mobile security problems begin when a user weakens those protections, so recognizing the causes and the symptoms is the core of this topic.",
   "Causes to watch for: Unofficial app stores (third-party marketplaces) do not vet apps the way official stores do, and many host repackaged apps with malware added. Sideloading means installing an app from outside the official store; on Android this usually means downloading an APK (Android Package) file and allowing installs from unknown sources. Sideloaded APKs skip store screening and are a common way to deliver spyware, stalkerware and banking trojans. Jailbreaking (iOS) and rooting (Android) remove the manufacturer's restrictions and give full administrative control. That also removes the security model that keeps apps isolated, may stop OS updates, voids some warranties, and causes MDM systems to flag or block the device. Organizations normally forbid all three.",
   "Symptoms that suggest compromise: High network traffic and data-limit alerts when the user has not changed their habits can mean malware is sending data out, downloading ads or taking part in a botnet. Sluggish response, overheating and fast battery drain can mean hidden processes, such as cryptominers or spyware. Fake security warnings, pop-ups claiming 'your phone is infected' and urging you to install a cleaner app or call a number, are scareware; the real OS does not display warnings that way. Unexpected app behavior includes apps opening on their own, new apps the user did not install, changed settings, unusual permissions or strange messages sent from the account. Leaked personal files, such as photos, messages or documents appearing online or being used for extortion, indicate stolen data, often through malicious apps with excessive permissions or a compromised cloud account.",
   "Response steps: Disconnect the device from networks if active exfiltration is suspected. Review installed apps, especially recently installed ones and those with device administrator or accessibility privileges, and remove anything unrecognized. Review app permissions. Run a reputable mobile security scan and update the OS. If the device is jailbroken, rooted or still shows symptoms, back up personal data only (not apps) and perform a factory reset, then restore from a known-good backup. Change passwords for accounts used on the device from a clean device, enable MFA and check cloud accounts for unknown sessions. If stalkerware is suspected, be aware the person who installed it may notice its removal, and handle it with appropriate care for the user's safety.",
   "Prevention is simpler: install apps only from official stores, keep the OS updated, use MDM policies that block unknown sources and detect jailbreaks, and review permissions periodically."
  ],
  "terms": [
   [
    "Sideloading",
    "Installing an app from outside the official app store, such as from a downloaded APK file."
   ],
   [
    "APK",
    "Android Package: the file format used to distribute and install Android apps."
   ],
   [
    "Jailbreaking",
    "Removing Apple's iOS restrictions to gain full control, weakening the device's security model."
   ],
   [
    "Rooting",
    "Gaining root (administrator) access on an Android device, bypassing its built-in protections."
   ],
   [
    "Scareware",
    "Fake security alerts designed to frighten users into installing malware or paying for useless services."
   ]
  ],
  "example": "An employee's phone triggers a data-limit alert halfway through the month, and the battery drains quickly. The technician finds a 'free' video app installed from a website as an APK, with permissions for SMS, contacts and accessibility services. They remove it, reset the device from a clean backup, change the employee's passwords and turn on MDM policy that blocks installs from unknown sources.",
  "tip": "Jailbreaking and rooting are causes; high data use, battery drain, fake warnings and strange app behavior are symptoms. The usual remedy for a compromised or jailbroken device is backup of personal data and a factory reset.",
  "check": [
   [
    "Why does jailbreaking or rooting make a device less secure?",
    "It removes the OS restrictions and sandboxing that isolate apps and protect the system, and it can stop official updates."
   ],
   [
    "A phone shows a pop-up saying it has 12 viruses and urging a download. What is it likely to be?",
    "A fake security warning (scareware), usually from a website or malicious app, not a real OS alert."
   ],
   [
    "What might an unexpected data-limit alert indicate?",
    "Malware or a malicious app sending or receiving data in the background."
   ]
  ]
 },
 {
  "t": "PC security issues: unable to reach the network, fake antivirus alerts, altered or missing system files, unwanted OS notifications, failed OS updates",
  "body": [
   "Some symptoms on a Windows PC are strong signs of malware, and the exam expects you to recognize them and respond with the malware removal procedure rather than treating them as ordinary faults.",
   "Being unable to reach the network, or reaching only some sites, can be caused by malware. Some malware changes DNS server settings, edits the `hosts` file (`C:\\Windows\\System32\\drivers\\etc\\hosts`) to redirect or block security sites, sets a rogue proxy, or disables network adapters to stop the machine from receiving updates or being cleaned. Other malware blocks access specifically to antivirus vendors' websites. Check the adapter's DNS settings, the hosts file and proxy settings, and compare with a known-good machine. Of course, rule out ordinary network faults first.",
   "Fake antivirus alerts, often called rogue antivirus or scareware, look like security software claiming dozens of infections and demanding payment for a 'full version' to remove them, or urging the user to call a support number. They may appear as pop-ups from a website or as a program installed on the machine. Genuine alerts come from the security product the organization actually uses, which you can confirm in Windows Security. Never pay or call; treat the PC as infected.",
   "Altered or missing system files, such as renamed or deleted files, changed permissions, or files disappearing from System32, may result from malware tampering with the OS or hiding itself, often causing errors or crashes. Run `sfc /scannow` to detect and repair changed system files, investigate further with anti-malware tools, and consider reimaging if the system's integrity cannot be trusted. Also watch for unfamiliar files, changed file extensions and files encrypted by ransomware.",
   "Unwanted OS notifications appear in the Windows notification area, often because the user allowed a website to send browser notifications, which then deliver ads or fake warnings. Remove the site's notification permission in the browser settings and check for adware. Failed OS updates, where Windows Update repeatedly fails or security software cannot update its definitions, are a classic sign, because malware tries to keep the machine vulnerable by stopping or breaking update services. Other causes include low disk space, corrupted update components and network issues, so check those too. If Windows Update and the antivirus are both failing, suspect malware.",
   "Other symptoms in this family include a disabled antivirus or firewall, security settings that change back after you fix them, unknown user accounts, and new startup items. When several of these appear together, follow the seven-step malware removal procedure: verify symptoms, quarantine, disable System Restore, remediate with updated tools, schedule scans and updates, re-enable System Restore, and educate the user."
  ],
  "terms": [
   [
    "Rogue antivirus",
    "Fake security software that reports bogus infections to trick users into paying or installing malware."
   ],
   [
    "hosts file",
    "A local file that maps hostnames to IP addresses and is checked before DNS; malware may edit it to redirect or block sites."
   ],
   [
    "Browser notifications",
    "Site-permitted alerts that appear in the OS notification area, abused to push ads and fake warnings."
   ],
   [
    "Integrity",
    "Assurance that files and systems have not been altered without authorization."
   ],
   [
    "Windows Update failure",
    "Updates that repeatedly fail to install, possibly caused by malware disabling update services."
   ]
  ],
  "example": "A user reports that their antivirus says it cannot update and that the vendor's website will not load, although other sites work. The technician finds entries in the hosts file pointing the antivirus vendor's domains to 127.0.0.1. Recognizing malware tampering, they disconnect the PC and start the malware removal procedure, scanning from bootable rescue media.",
  "tip": "When security software and Windows Update both fail, or only security sites are unreachable, suspect malware. Real Windows security alerts come from Windows Security or the managed antivirus, not from a browser pop-up.",
  "check": [
   [
    "Why would malware block Windows Update?",
    "To keep the system unpatched and stop security tools from updating, so the malware is not removed or detected."
   ],
   [
    "What file might malware modify to redirect or block specific websites?",
    "The hosts file (C:\\Windows\\System32\\drivers\\etc\\hosts)."
   ],
   [
    "A user keeps seeing ad pop-ups in the Windows notification area from a website. What is the fix?",
    "Remove that website's notification permission in the browser settings and check for adware or unwanted extensions."
   ]
  ]
 },
 {
  "t": "Browser security issues: random pop-ups, certificate warnings, redirection, degraded browser performance",
  "body": [
   "Browsers are the most common place users notice something wrong. The exam covers four symptoms: random pop-ups, certificate warnings, redirection and degraded browser performance. Each can be innocent, but each is also a classic sign of adware or other malware.",
   "Random pop-ups that appear even on trusted sites or when no site is open are a strong sign of adware, a malicious extension or allowed site notifications. Check the browser's extensions and remove anything unknown, review site notification permissions, make sure the pop-up blocker is enabled, check installed programs for adware, and run an anti-malware scan. If a pop-up claims the computer is infected and gives a phone number, it is a tech support scam; close the browser (force close if needed) and never call.",
   "Certificate warnings appear when the browser cannot validate a site's certificate. Common harmless causes are an expired certificate on the site, a name mismatch, or a wrong date and time on the PC (a clock years off makes every certificate look invalid). Security-relevant causes include an on-path attack, where someone intercepts traffic with their own certificate, often on untrusted public Wi-Fi or through a malicious proxy, and malware that installed a rogue root certificate. If many sites show warnings, check the system clock first, then check the proxy settings and the certificate store (`certmgr.msc`) for unknown root certificates. Users should not click through warnings on sites where they enter credentials.",
   "Redirection means the browser goes to a different site than requested: searches go through an unfamiliar search engine, or typing a bank's address leads to a look-alike page. Causes include a hijacked home page or search provider set by a malicious extension or program, a modified hosts file, altered DNS settings on the PC or router, or a malicious proxy. Fix by removing the offending extension or program, resetting the browser settings, checking the hosts file, DNS and proxy configuration, and scanning for malware.",
   "Degraded browser performance, where the browser becomes slow, freezes or uses lots of memory and CPU, may come from too many tabs or extensions, a bloated cache, an outdated browser, or malicious scripts such as in-browser cryptomining. Use the browser's own task manager to find the tab or extension using resources, disable extensions one at a time, clear the cache, update the browser, and reset it to defaults if needed.",
   "When these symptoms point to malware, handle the machine with the malware removal procedure, and educate the user about extensions, fake downloads and scam pop-ups."
  ],
  "terms": [
   [
    "Browser hijacker",
    "Malware or an unwanted extension that changes the home page, search engine or new-tab page and redirects traffic."
   ],
   [
    "Certificate warning",
    "A browser alert that a site's certificate is invalid, expired, untrusted or does not match the address."
   ],
   [
    "Tech support scam",
    "A pop-up or call falsely claiming the computer is infected and urging the victim to call or pay."
   ],
   [
    "Browser reset",
    "Restoring a browser's settings to defaults, disabling extensions and clearing temporary data."
   ],
   [
    "Rogue root certificate",
    "An untrusted certificate authority added to the certificate store, allowing an attacker to impersonate secure sites."
   ]
  ],
  "example": "A user reports certificate warnings on nearly every HTTPS site since the morning. The technician notices the taskbar clock shows a date from several years ago. After correcting the time zone and enabling automatic time sync, the warnings disappear. Because the CMOS battery might be the underlying cause, they log a follow-up to check it.",
  "tip": "Certificate errors on every site usually mean a wrong system clock (or an intercepting proxy). A warning on just one site usually means that site's certificate has a problem, or you are being intercepted on that connection.",
  "check": [
   [
    "All HTTPS sites suddenly show certificate errors on one PC. What should you check first?",
    "The system date and time, then proxy settings and the certificate store."
   ],
   [
    "Searches keep going to an unfamiliar search engine. What are likely causes?",
    "A browser hijacker extension or program, changed browser settings, or modified DNS, hosts or proxy settings."
   ],
   [
    "What should a user do when a pop-up says their PC is infected and to call a number?",
    "Close the browser without calling or clicking, and report it; it is a tech support scam."
   ]
  ]
 },
 {
  "t": "Checking and repairing startup items, scheduled tasks, browser extensions and proxy settings after an infection",
  "body": [
   "Removing the malware file is not always enough. Many infections set up persistence, meaning mechanisms that relaunch the malware or restore its changes after a reboot or after you delete it. After remediation, check the common persistence locations and the settings malware likes to change, or the problem will return.",
   "Startup items: open Task Manager's Startup apps tab to see programs that launch at sign-in, with their publisher and impact. Disable anything unknown or suspicious (look it up if unsure). Programs can also start from the Startup folders (type `shell:startup` for the current user or `shell:common startup` for all users in the Run box) and from registry Run keys, such as `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` and the matching key under `HKEY_LOCAL_MACHINE`. Also review Services (`services.msc`) for unfamiliar services set to Automatic, and `msconfig` for boot settings. Tools such as Microsoft's Sysinternals Autoruns show every autostart location in one list.",
   "Scheduled tasks: malware frequently creates a task in Task Scheduler (`taskschd.msc`) that runs at log-on, at startup or every few minutes to reinstall itself or launch a script. Browse the Task Scheduler Library, sort by author or next run time, and inspect each unfamiliar task's Actions tab to see what program or script it runs. Disable or delete malicious tasks after noting details in the ticket.",
   "Browser extensions: open the extension or add-on manager in every installed browser, not just the default one, and remove anything the user did not intentionally install. Then check the browser's home page, startup pages, new tab page and default search engine, because hijackers change them. If settings keep coming back, check whether a policy has been set (browsers show a 'managed by your organization' notice when policies apply); malware sometimes installs browser policies. Resetting the browser to defaults removes most leftovers. Clear cache and cookies, and remove unexpected notification permissions.",
   "Proxy settings: malware may set a proxy so all web traffic passes through the attacker's server, or so security sites fail. Check Settings > Network and internet > Proxy (and the legacy Internet Options > Connections > LAN settings). Unless the organization uses a proxy, automatic setup scripts and manual proxy servers should be off. Also check `netsh winhttp show proxy` for the system proxy used by services, the DNS server settings on the network adapter and the hosts file for redirects.",
   "Finish by rebooting and checking again that nothing reappears, running a full scan with updated anti-malware, and documenting each item removed. If persistence keeps returning despite cleanup, the safest course is to reimage the computer.",
   "```\nshell:startup\ntaskschd.msc\nnetsh winhttp show proxy\nnotepad C:\\Windows\\System32\\drivers\\etc\\hosts\n```"
  ],
  "terms": [
   [
    "Persistence",
    "Techniques malware uses to survive reboots and removal attempts, such as Run keys, services and scheduled tasks."
   ],
   [
    "Run key",
    "A registry location whose entries launch programs automatically at sign-in or startup."
   ],
   [
    "Startup folder",
    "A folder whose shortcuts are launched when a user signs in (shell:startup)."
   ],
   [
    "Proxy server",
    "An intermediary that forwards web requests; a malicious proxy can intercept or redirect traffic."
   ],
   [
    "Autoruns",
    "A Sysinternals utility that lists every location Windows uses to launch programs automatically."
   ]
  ],
  "example": "After removing adware, a technician finds the ads return after each reboot. Task Scheduler shows a task named to look like an updater that runs a script every 30 minutes, and the browser still lists an unknown extension. Deleting the task, removing the extension and resetting the browser stops the ads from returning.",
  "tip": "If malware keeps coming back after removal, look for persistence: Startup apps, Run keys, services and especially scheduled tasks. If web traffic still misbehaves, check the proxy, DNS and hosts file.",
  "check": [
   [
    "Where would you look for a task that reinstalls malware every 30 minutes?",
    "In Task Scheduler (taskschd.msc), in the Task Scheduler Library, checking each task's triggers and actions."
   ],
   [
    "Name two places Windows launches programs automatically at sign-in.",
    "Task Manager's Startup apps (backed by the Startup folder and registry Run keys), plus services and scheduled tasks."
   ],
   [
    "Why check proxy settings after an infection?",
    "Malware may set a malicious proxy to intercept or redirect web traffic or to block security sites."
   ]
  ]
 },
 {
  "t": "Ticketing systems: user and device information, descriptions, categories, severity, escalation levels, clear progress notes and resolutions",
  "body": [
   "A ticketing system (help desk or IT service management system) records every request and incident from the moment it is reported until it is closed. Tickets make sure nothing is forgotten, let work be handed between technicians, measure performance against service level agreements, and build a history that helps solve future problems. Writing good tickets is a skill the A+ exam tests directly.",
   "Every ticket starts with who and what. User information includes the name, contact details, department and location, plus how they prefer to be reached. Device information identifies the affected asset: asset tag or hostname, model, OS version and any related systems. Linking the ticket to the asset in the inventory makes patterns visible, such as the same laptop failing three times.",
   "The description explains the problem in specific, factual terms: what the user was doing, what happened, any exact error messages or codes, when it started, whether it happens every time, and what has already been tried. 'Outlook shows error 0x800CCC0E when sending since this morning; receiving works; webmail works' is useful. 'Email broken' is not. Include screenshots when helpful.",
   "Categories group tickets by type, such as hardware, software, network, account or access request, and sometimes by subcategory. Accurate categories route tickets to the right team and produce useful reports. Severity (often combined with urgency and impact into a priority) describes how serious the problem is: a single user's minor cosmetic issue is low, one user unable to work is medium or high, and an outage affecting a whole department or a security incident is critical. Priority decides response and resolution targets.",
   "Escalation levels describe who handles what. Tier 1 (the first line, or service desk) handles common issues such as password resets and basic troubleshooting. Tier 2 handles deeper technical problems and desk-side support. Tier 3 includes specialists or engineers, and some organizations also escalate to vendors. Escalate when a problem is beyond your skill or permissions, when it exceeds the time allowed at your tier, or when its severity demands it. When you escalate, include everything you found so the next person does not start over.",
   "Progress notes record each action, finding and communication in time order: who you contacted, what you tested, what changed. Write them so another technician, or the user, could understand them later, using clear language and no blame. When the ticket is closed, the resolution states the root cause (if known), the fix applied, and confirmation that the user verified it works. A good resolution note can become a knowledge base article, saving time for the next technician."
  ],
  "terms": [
   [
    "Ticket",
    "A record in an IT service management system that tracks a request or incident from report to resolution."
   ],
   [
    "Severity",
    "How serious a problem's impact is; combined with urgency it sets the ticket's priority."
   ],
   [
    "Escalation",
    "Passing a ticket to a higher support tier or specialist team when it exceeds current skills, permissions or time limits."
   ],
   [
    "Progress notes",
    "Time-ordered entries documenting actions, findings and communications on a ticket."
   ],
   [
    "Resolution",
    "The closing entry describing the cause, the fix and the user's confirmation."
   ]
  ],
  "example": "A Tier 1 technician receives a ticket that a sales rep's laptop cannot connect to the VPN. They note the laptop's asset tag and OS version, record the exact error code, confirm the internet works and that the user's password is valid, and document each test. When the error points to a certificate issue on the VPN server, they escalate to Tier 2 with all notes attached, and the network team fixes the server certificate.",
  "tip": "Good ticket notes are specific, factual and complete enough that someone else could continue the work. Severity and priority rise with the number of people affected and business impact.",
  "check": [
   [
    "What should an escalated ticket include?",
    "All user and device details, the problem description, what has been tested and the results, so the next tier does not repeat work."
   ],
   [
    "Which is higher priority: one user's broken mouse or the finance department unable to reach the accounting system?",
    "The finance department outage, because it affects many users and business operations."
   ],
   [
    "What belongs in a ticket's resolution?",
    "The root cause if known, the fix applied, and confirmation that the user verified the problem is solved."
   ]
  ]
 },
 {
  "t": "Asset management: inventory lists, CMDB, asset tags and IDs, procurement life cycle, warranty and licensing, assigned users",
  "body": [
   "Asset management means knowing what IT equipment and software an organization owns, where it is, who uses it, what it cost and when it must be replaced. Without it, you cannot secure devices you do not know about, you pay for licenses nobody uses, you miss warranty repairs, and audits become painful.",
   "The foundation is an inventory list: a record of every asset with fields such as asset ID, type, manufacturer, model, serial number, location, purchase date, cost, assigned user, status (in use, in storage, in repair, retired) and warranty end date. Inventories can be spreadsheets in small organizations, but most use an asset management tool that can automatically discover devices on the network and pull hardware and software details.",
   "A configuration management database (CMDB) goes further than an inventory. It stores configuration items (CIs), which can be hardware, software, services and documents, together with their relationships: this server hosts that application, which depends on this database and is used by the payroll service. Those relationships let you assess the impact of a change or an outage, which is why CMDBs are central to change management and incident management.",
   "Each physical asset gets an asset tag with a unique ID, often a barcode, QR code or RFID label, attached to the device and recorded in the inventory. Scanning the tag pulls up the record, which speeds up audits and ties tickets to specific devices. Tags also help recover lost or stolen equipment.",
   "The procurement life cycle follows an asset from start to finish. It begins with identifying a need and approving the purchase, then ordering from an approved vendor, receiving and tagging the equipment, configuring and deploying it, supporting and maintaining it (including repairs and upgrades), and finally retiring it: wiping or destroying data, removing it from the inventory, and recycling or disposing of it properly with records such as a certificate of destruction. Planning replacements around warranty and end-of-life dates avoids surprise failures.",
   "Track warranty and licensing information. Warranty records (start and end dates, support level, service tags) tell you whether a failed part is repaired at no cost. Software licenses must be tracked against installations to stay compliant with license agreements, avoid audit penalties and avoid paying for unused seats. Subscription licenses need renewal dates tracked. Finally, record assigned users: who is responsible for each device. This supports accountability, makes onboarding and offboarding smoother (collect the laptop, phone and badge at departure), and helps security teams contact the right person when a device raises an alert."
  ],
  "terms": [
   [
    "Asset tag",
    "A label with a unique ID, often a barcode or QR code, that links a physical device to its inventory record."
   ],
   [
    "CMDB",
    "Configuration management database: stores configuration items and their relationships to support change and incident management."
   ],
   [
    "Configuration item (CI)",
    "Any component tracked in a CMDB, such as a server, application or service."
   ],
   [
    "Procurement life cycle",
    "The stages of an asset from purchase request through deployment, maintenance and disposal."
   ],
   [
    "License compliance",
    "Ensuring the number and type of software installations match the licenses owned."
   ]
  ],
  "example": "A laptop's screen fails. The technician scans its asset tag, sees in the inventory that it is still under the manufacturer's next-business-day warranty, and opens a warranty claim with its serial number instead of buying a replacement screen. The asset record is updated with the repair history and a loaner laptop is assigned to the user in the meantime.",
  "tip": "An inventory tells you what you own; a CMDB also tells you how items relate and depend on each other. Asset records should always include the assigned user, warranty and license information.",
  "check": [
   [
    "What does a CMDB add beyond a simple inventory list?",
    "Relationships and dependencies between configuration items, supporting impact analysis for changes and incidents."
   ],
   [
    "Why track software licenses against installations?",
    "To stay compliant with license agreements, avoid audit penalties and avoid paying for unused licenses."
   ],
   [
    "What happens to an asset at the end of its life cycle?",
    "Its data is wiped or destroyed, it is removed from active inventory and disposed of or recycled properly, with records kept."
   ]
  ]
 },
 {
  "t": "Documentation types: acceptable use policy, incident reports, SOPs, onboarding and offboarding checklists, SLAs, knowledge base articles",
  "body": [
   "IT support relies on written documentation so that work is consistent, rules are clear and knowledge does not live only in one person's head. The exam expects you to know what each common document is for and to pick the right one for a scenario.",
   "An acceptable use policy (AUP) tells users what they may and may not do with the organization's systems, networks, email and data: for example, no personal file sharing software, no installing unapproved apps, no accessing inappropriate content, and consent to monitoring. Users usually acknowledge the AUP when they are hired, and it gives the organization a basis for enforcing rules. Related policies include password, remote access and BYOD policies.",
   "An incident report documents a security or service incident: what happened, when and how it was detected, what systems and data were affected, who was involved, the actions taken, and the outcome. It supports investigation, lessons learned, insurance and legal needs, and may be required by regulation. Write it factually and promptly, while details are fresh.",
   "A standard operating procedure (SOP) is a step-by-step instruction for performing a routine task the same way every time, such as setting up a new workstation, performing a backup, or installing custom software packages. SOPs reduce errors, make training easier and ensure compliance requirements are met.",
   "Onboarding and offboarding checklists make sure nothing is missed when people join or leave. Onboarding covers creating accounts, assigning group memberships and licenses, issuing hardware and badges, setting up MFA, and providing the AUP and training. Offboarding covers disabling accounts promptly (ideally at the moment of departure), revoking access and badges, collecting equipment, transferring or retaining data, reclaiming licenses and changing any shared credentials the person knew. Missed offboarding steps are a common source of insider risk.",
   "A service level agreement (SLA) is a contract or formal agreement that defines the expected level of service between a provider and a customer, whether an outside vendor or the internal IT department and the business. It typically states response and resolution times by priority, uptime targets, support hours and what happens if targets are missed. Tickets are measured against the SLA.",
   "Knowledge base (KB) articles document solutions to known problems and how-to guides, for technicians (internal KB) or for users (self-service). A good article has a clear title matching what people search for, the symptoms, the cause and the step-by-step fix. Writing a KB article after solving a new problem saves time the next time it appears."
  ],
  "terms": [
   [
    "AUP",
    "Acceptable use policy: rules for how users may use the organization's systems and data."
   ],
   [
    "SOP",
    "Standard operating procedure: documented step-by-step instructions for a routine task."
   ],
   [
    "SLA",
    "Service level agreement: defines expected service levels such as response times and uptime between provider and customer."
   ],
   [
    "Incident report",
    "A factual record of a security or service incident, its impact and the response."
   ],
   [
    "Knowledge base",
    "A searchable collection of articles documenting solutions and procedures."
   ]
  ],
  "example": "A contractor's project ends on Friday, but their VPN account is still active a month later because nobody followed the offboarding checklist. After the IT team discovers it during a review, they disable the account, file an incident report, and update the offboarding SOP so HR automatically notifies IT of every departure date.",
  "tip": "Rules for users: AUP. Step-by-step routine task: SOP. Promised response or uptime: SLA. Record of what happened: incident report. Reusable fix: knowledge base article.",
  "check": [
   [
    "Which document would define that critical tickets receive a response within one hour?",
    "The service level agreement (SLA)."
   ],
   [
    "What is the most important security step on an offboarding checklist?",
    "Disabling the departing user's accounts and access promptly, along with collecting equipment and badges."
   ],
   [
    "Which document do new employees typically sign to agree to rules about using company systems?",
    "The acceptable use policy (AUP)."
   ]
  ]
 },
 {
  "t": "Change management: request forms, purpose and scope, risk analysis, change advisory board approval, sandbox testing, rollback and backup plans, end-user acceptance",
  "body": [
   "Many IT outages are caused not by attacks or hardware failures but by well-intended changes made without planning. Change management is a formal process for proposing, reviewing, approving, implementing and documenting changes to systems, so they happen in a controlled way with minimal disruption. As a technician you will submit change requests and carry out approved changes.",
   "A change starts with a request form (change request). It describes the change, its purpose (the business reason, such as fixing a vulnerability or supporting a new application) and its scope (which systems, sites, users and services are affected, and how many devices). It also proposes a date and time, often in an agreed maintenance window, lists who will perform the work, and classifies the change type: standard (pre-approved, routine, low risk), normal (needs review) or emergency (urgent, approved rapidly, documented afterwards).",
   "A risk analysis estimates what could go wrong and how badly: the likelihood of failure, the impact on users and business, and the risk of not making the change. Risk is often rated low, medium or high, and higher-risk changes need more testing, more approvers and tighter scheduling. The CMDB helps identify dependencies that could be affected.",
   "The change advisory board (CAB) is a group of stakeholders, such as IT managers, system owners, security and business representatives, that reviews normal changes and approves, rejects or requests more information. The CAB checks that the plan is sound, the timing does not conflict with other changes or business events, and the affected people have been told.",
   "Before touching production, test the change in a sandbox: an isolated environment that mirrors production closely, where mistakes cannot harm real users or data. Testing confirms that the change works and reveals side effects. Every change also needs a backup plan and a rollback plan. Take backups or snapshots before the change, and document exactly how to return the system to its previous state if the change fails or causes problems, including who decides to roll back and when.",
   "After implementation, confirm success through end-user acceptance: the business owner or representative users verify that the system works as they need it to, and sign off. Then update documentation, the CMDB and the change record, and close the change. Changes outside this process are called unauthorized changes and can cause outages and security gaps.",
   "The sequence to remember is: request, purpose and scope, risk analysis, plan with backup and rollback, sandbox testing, CAB approval, implementation, end-user acceptance and documentation."
  ],
  "terms": [
   [
    "Change request",
    "A formal form proposing a change, including purpose, scope, schedule, risk and plans."
   ],
   [
    "CAB",
    "Change advisory board: the group that reviews and approves or rejects proposed changes."
   ],
   [
    "Rollback plan",
    "Documented steps to restore systems to their pre-change state if a change fails."
   ],
   [
    "Sandbox",
    "An isolated test environment where changes can be tried without affecting production."
   ],
   [
    "End-user acceptance",
    "Confirmation by the business or users that a completed change meets their needs."
   ]
  ],
  "example": "The network team wants to upgrade firewall firmware. They submit a change request describing the security fix, the affected sites and a Saturday night window. After testing the firmware on a lab firewall and saving the current configuration, the CAB approves. The upgrade succeeds, users confirm on Monday that remote access works, and the change is closed with updated documentation.",
  "tip": "Changes should be tested in a sandbox and approved by the CAB before implementation, and every change needs a rollback plan. End-user acceptance comes after implementation.",
  "check": [
   [
    "What is the purpose of a rollback plan?",
    "To return the system to its previous working state quickly if the change fails or causes problems."
   ],
   [
    "Who approves normal changes in a formal change management process?",
    "The change advisory board (CAB)."
   ],
   [
    "Why test changes in a sandbox?",
    "To confirm the change works and find side effects without risking production systems or real data."
   ]
  ]
 },
 {
  "t": "Backup and recovery: full, incremental, differential and synthetic backups; testing restores; on-site vs off-site; 3-2-1 rule; grandfather-father-son rotation",
  "body": [
   "Backups are the last line of defense against hardware failure, accidental deletion, ransomware and disasters. A backup strategy decides what to back up, how often, where to keep copies and how quickly you can restore. The exam focuses on backup types, rotation schemes and storage locations.",
   "A full backup copies all selected data every time. It is the simplest to restore (one backup set) but takes the most time and storage. Backup software traditionally marks files as backed up by clearing the archive bit, which is set whenever a file changes. An incremental backup copies only data changed since the last backup of any type (full or incremental) and clears the archive bit. Incrementals are fast and small, but a restore needs the last full backup plus every incremental since, in order. A differential backup copies everything changed since the last full backup and does not clear the archive bit, so each differential grows during the week. A restore needs only the last full plus the latest differential.",
   "A synthetic full backup is built by the backup system from an earlier full backup plus subsequent incrementals, combined on the backup storage rather than by reading all the data from the source again. It gives you a fresh full backup for fast restores without the load of a real full backup on the production systems or network.",
   "A backup you have never restored is only a hope. Testing restores regularly, restoring files or whole systems to a test location, verifies that the data is complete, the media are readable, the process is documented and the time needed meets recovery goals. Organizations often define a recovery point objective (how much data loss is acceptable) and a recovery time objective (how quickly service must return).",
   "Where copies live matters. On-site backups, such as a local backup appliance or NAS, restore quickly but can be destroyed by the same fire, flood, theft or ransomware that hits the primary data. Off-site backups, stored at another location or in the cloud, survive local disasters but restore more slowly. The 3-2-1 rule combines both: keep at least 3 copies of data (the original plus two backups), on 2 different types of media or storage, with 1 copy off-site. Many organizations also keep one copy offline or immutable so ransomware cannot encrypt it.",
   "The grandfather-father-son (GFS) rotation scheme balances history against media use. Son backups are daily (often incremental or differential) and are reused each week. Father backups are weekly fulls kept for about a month. Grandfather backups are monthly fulls kept for a longer period, often a year, and are typically stored off-site. GFS lets you restore from yesterday, from several weeks ago or from months ago using a manageable number of media sets."
  ],
  "terms": [
   [
    "Incremental backup",
    "Backs up data changed since the last backup of any kind; restore needs the full plus all incrementals."
   ],
   [
    "Differential backup",
    "Backs up data changed since the last full backup; restore needs the full plus the latest differential."
   ],
   [
    "Synthetic full backup",
    "A full backup assembled from a previous full and later incrementals on the backup system."
   ],
   [
    "3-2-1 rule",
    "Keep three copies of data on two different media types with one copy off-site."
   ],
   [
    "GFS rotation",
    "Grandfather-father-son: daily, weekly and monthly backup sets retained for increasing lengths of time."
   ]
  ],
  "example": "A company runs a full backup on Sunday and incrementals Monday through Friday. A server fails Thursday morning. To restore, the technician needs Sunday's full backup plus Monday's, Tuesday's and Wednesday's incrementals, applied in order. If the company used differentials instead, the technician would need only Sunday's full and Wednesday's differential.",
  "tip": "Incremental: fastest backups, slowest restore (full plus every incremental). Differential: backups grow each day, restore needs only full plus the latest differential. Untested backups cannot be trusted.",
  "check": [
   [
    "With full backups on Sunday and differentials daily, what is needed to restore on Friday morning?",
    "Sunday's full backup and Thursday's differential."
   ],
   [
    "What does the 3-2-1 rule require?",
    "Three copies of the data, on two different types of media, with one copy off-site."
   ],
   [
    "Why should backups be test-restored regularly?",
    "To prove the data is complete and restorable and that the process and timing meet recovery requirements."
   ]
  ]
 },
 {
  "t": "Safety: ESD straps and mats, grounding, power handling, lifting technique, electrical fire safety, PPE",
  "body": [
   "Technicians work with electricity, heavy equipment and chemicals, so safety procedures protect both you and the equipment. The A+ exam tests the standard practices.",
   "Electrostatic discharge (ESD) is the sudden flow of static electricity between two objects at different electrical potentials, like the small shock you feel after walking on carpet. A discharge far too small to feel can still damage or weaken chips on motherboards, RAM and expansion cards, sometimes causing failures that appear much later. To prevent it, wear an ESD wrist strap connected to a ground point or to the unpainted metal of the computer chassis, work on an ESD mat that is itself grounded, and store components in antistatic bags. If no strap is available, touch the unpainted metal of the case frequently to equalize your charge (self-grounding). Low humidity increases static, and avoid carpet and synthetic clothing when working on components.",
   "Grounding (earthing) also matters for electrical safety: equipment connects to earth ground through the third prong of the power plug so that a fault sends current to ground instead of through a person. Never remove the ground prong or use adapters that defeat it. Equipment grounding and ESD protection are different things; an ESD strap is designed with a resistor to safely bleed static, and you must never wear one while working on high-voltage devices.",
   "Power handling: turn off and unplug equipment before opening it. Power supplies, CRT monitors and some laser printers contain capacitors that can hold a dangerous charge even when unplugged, so never open a power supply unit; replace it as a whole. Follow electrical safety rules such as not overloading circuits, keeping liquids away and inspecting cords for damage. In larger environments, lockout/tagout procedures ensure circuits stay off while you work.",
   "Lifting technique: heavy servers, UPS units and printers cause many back injuries. Bend at the knees and hips, not the waist; keep your back straight; hold the load close to your body; lift with your legs; avoid twisting; and get help or use a cart for heavy or awkward items. Organizations often set a weight above which two people or equipment are required, so follow local policy.",
   "Electrical fire safety: never use water on an electrical fire, since water conducts electricity. Use a Class C extinguisher in the United States (Class E in some other regions), or a multipurpose ABC or carbon dioxide (CO2) extinguisher suitable for electrical fires. If safe, cut power to the equipment. Know where extinguishers and exits are and how to raise the alarm; personal safety comes first.",
   "Personal protective equipment (PPE) includes safety glasses when cutting cables or working with springs, gloves for handling sharp metal or toner, and air filter masks when cleaning dusty equipment or dealing with toner spills. Also follow cable management practices to avoid trip hazards, and remove jewelry that could catch or conduct electricity."
  ],
  "terms": [
   [
    "ESD",
    "Electrostatic discharge: sudden static electricity transfer that can damage electronic components."
   ],
   [
    "ESD wrist strap",
    "A strap connected to ground that safely drains static from the technician's body while working on components."
   ],
   [
    "Class C extinguisher",
    "US classification for extinguishers suitable for energized electrical equipment fires."
   ],
   [
    "PPE",
    "Personal protective equipment such as safety glasses, gloves and masks."
   ],
   [
    "Self-grounding",
    "Touching unpainted metal on a grounded chassis to equalize static charge when no strap is available."
   ]
  ],
  "example": "A technician installing RAM in a desktop places the computer on an ESD mat, clips the wrist strap to bare metal on the chassis, unplugs the power cord and presses the power button to drain residual power. The new modules stay in their antistatic bag until the moment they are installed.",
  "tip": "Never use water on an electrical fire, never open a power supply, and never wear an ESD strap when working on high-voltage equipment. Lift with your legs, not your back.",
  "check": [
   [
    "Which fire extinguisher type is appropriate for a burning computer in the US?",
    "A Class C (or multipurpose ABC or CO2) extinguisher rated for electrical fires; never water."
   ],
   [
    "Why should technicians not open a power supply unit?",
    "Its capacitors can store a dangerous charge even when unplugged; faulty PSUs are replaced, not repaired."
   ],
   [
    "Name two ways to prevent ESD damage while installing a component.",
    "Use a grounded ESD wrist strap and mat, keep components in antistatic bags, and touch unpainted chassis metal to self-ground."
   ]
  ]
 },
 {
  "t": "Environment: safety data sheets, battery and toner disposal, temperature and humidity, ventilation, UPS and surge suppressors",
  "body": [
   "Environmental controls protect people, equipment and the wider environment. Technicians must know how to handle hazardous materials, how to dispose of IT waste legally and responsibly, and how to keep equipment running in safe conditions with clean power.",
   "A safety data sheet (SDS), formerly called a material safety data sheet (MSDS), is provided by the manufacturer for any product containing hazardous substances, such as toner, cleaning solvents, thermal paste or batteries. It lists the ingredients and hazards, safe handling and storage, protective equipment needed, first-aid measures, what to do about spills and fires, and disposal considerations. When you are unsure how to handle or dispose of something, or someone is exposed to it, consult the SDS.",
   "Disposal: never put IT equipment or its consumables in regular trash. Batteries, especially lithium-ion, nickel-based and lead-acid types, contain materials that are toxic or can start fires; take them to approved battery recycling programs, and handle swollen or damaged lithium-ion batteries carefully. Toner cartridges should be returned to the manufacturer's recycling program or a recycler; clean toner spills with a special toner vacuum (a regular vacuum can spread the fine powder and can even ignite it) and wear a mask. Old computers, monitors (particularly CRTs, which contain lead) and phones are electronic waste (e-waste) and must go to certified recyclers, following local regulations, and only after data has been destroyed. Local government rules always take precedence.",
   "Temperature and humidity affect reliability. Heat shortens component life and causes throttling and shutdowns, so keep equipment rooms cool and follow the equipment's specified operating range. Humidity that is too low increases static electricity and ESD risk, while humidity that is too high causes condensation and corrosion. Data centers and server rooms therefore monitor both and use climate control. Also protect equipment from dust and airborne particles, using enclosures or filters where necessary and cleaning with compressed air or an electronics-safe vacuum.",
   "Ventilation matters for both people and equipment. Keep vents clear, do not block airflow around computers or stack devices on each other, and ensure rooms with laser printers or chemicals are well ventilated. Servers are designed to draw air in the front and exhaust out the back, which is the basis for hot aisle and cold aisle layouts.",
   "Power problems damage hardware and data. A surge suppressor (surge protector) diverts voltage spikes away from equipment; its rating in joules shows how much energy it can absorb, and it wears out over time. A plain power strip only adds outlets and offers no protection. An uninterruptible power supply (UPS) contains a battery that keeps equipment running through short outages, sags (brownouts) and fluctuations, giving time for a clean shutdown or for a generator to start. Many UPS units connect to the computer by USB or network so it can shut down automatically. Size a UPS for the load and runtime needed, and test and replace its batteries periodically."
  ],
  "terms": [
   [
    "SDS",
    "Safety data sheet: manufacturer document describing a product's hazards, handling, first aid and disposal."
   ],
   [
    "E-waste",
    "Discarded electronic equipment that must be recycled or disposed of according to regulations."
   ],
   [
    "UPS",
    "Uninterruptible power supply: battery-backed unit that powers equipment through outages and sags."
   ],
   [
    "Surge suppressor",
    "A device that protects equipment from voltage spikes by diverting excess energy, rated in joules."
   ],
   [
    "Toner vacuum",
    "A vacuum with a fine filter designed to safely clean toner spills."
   ]
  ],
  "example": "During a storm, the power in a small office flickers several times. The file server, connected to a UPS, keeps running and receives a low-battery signal over USB when the outage lasts longer, so it shuts down cleanly. The desktop PCs plugged into ordinary power strips lose unsaved work, prompting the office manager to buy small UPS units for key workstations.",
  "tip": "To learn how to handle or dispose of a chemical, consult its SDS. A UPS keeps power on during outages; a surge suppressor only protects against spikes; a power strip protects against nothing.",
  "check": [
   [
    "Where would you find instructions for handling a toner spill safely?",
    "In the toner's safety data sheet (SDS); in practice use a toner vacuum and a mask."
   ],
   [
    "Why is very low humidity a problem in a server room?",
    "It increases static electricity and the risk of ESD damage."
   ],
   [
    "What is the difference between a UPS and a surge suppressor?",
    "A UPS supplies battery power during outages and sags; a surge suppressor only absorbs voltage spikes."
   ]
  ]
 },
 {
  "t": "Prohibited content and privacy: incident response and chain of custody, licensing (EULA, DRM, open source vs commercial, personal vs corporate), PII, PCI DSS, GDPR, PHI, data retention",
  "body": [
   "Technicians sometimes come across prohibited content or activity on a device, such as illegal material, stolen data or clear policy violations. Handling it correctly protects the organization and any later investigation. The first response is to identify what you have found, without browsing further than needed, and report it through the proper channels, usually your manager or security team, according to company policy. Then preserve the data or device: do not delete, copy around, or keep using it, because changes can destroy evidence. Document everything: what you saw, when, where, and every action you took, since the documentation must hold up later.",
   "If the matter could involve law enforcement or court proceedings, maintain chain of custody. This is a written record of everyone who handled the evidence, when, and what they did with it, from collection to presentation. Evidence is sealed, labeled and signed over each time it changes hands. A gap in the chain can make evidence inadmissible, because no one can prove it was not altered.",
   "Licensing is another compliance area. An EULA (end-user license agreement) is the contract accepting the terms under which software may be used; you do not own the software, only a license to use it. DRM (digital rights management) is technology that enforces licensing by restricting copying or use of software, music and video. Commercial (proprietary) software is sold or subscribed under restrictive licenses, while open-source software makes its source code available and allows use, modification and sharing under licenses whose conditions still must be followed. Personal licenses allow use by an individual, often non-commercially, whereas corporate or business licenses cover organizational use, sometimes by number of users, devices or cores. Using a personal license at work may violate the EULA. Track licenses and report unlicensed software.",
   "Regulated data needs special care. PII (personally identifiable information) is any data that identifies a person, such as name with birth date, government ID number, address or email. PHI (protected health information) is health information linked to an individual, protected in the US under HIPAA. PCI DSS (Payment Card Industry Data Security Standard) is an industry standard, not a law, that organizations handling payment card data must follow, covering encryption, access control and network security. GDPR (General Data Protection Regulation) is the European Union regulation that protects personal data of people in the EU, requiring lawful processing, data minimization, breach notification and rights such as access and deletion, and it applies to organizations worldwide that process such data.",
   "Data retention policies define how long each kind of data must be kept, to meet legal, regulatory and business needs, and when it must be securely destroyed. Keeping data too briefly can break laws; keeping it too long increases breach and legal exposure. Follow the policy, and never destroy data that is subject to a legal hold."
  ],
  "terms": [
   [
    "Chain of custody",
    "Documented record of every person who handled evidence and when, proving it was not altered."
   ],
   [
    "EULA",
    "End-user license agreement: the terms under which a user is permitted to use software."
   ],
   [
    "PII",
    "Personally identifiable information: data that can identify a specific individual."
   ],
   [
    "PCI DSS",
    "Payment Card Industry Data Security Standard: security requirements for handling payment card data."
   ],
   [
    "GDPR",
    "EU regulation protecting the personal data and privacy rights of people in the European Union."
   ],
   [
    "PHI",
    "Protected health information: individually identifiable health data, protected in the US under HIPAA."
   ]
  ],
  "example": "While repairing an employee's laptop, a technician notices a folder of spreadsheets containing customer credit card numbers, which policy forbids storing there. The technician stops, does not open more files, notes the path and time, and reports it to their manager and security team. The laptop is powered off, labeled and handed over with a signed chain-of-custody form.",
  "tip": "Order for prohibited content: identify, report through proper channels, preserve evidence, document. PCI DSS covers card data, PHI is health data, GDPR is EU personal data, PII is any identifying data.",
  "check": [
   [
    "What is the purpose of chain of custody?",
    "To document who handled evidence and when, proving it was not tampered with so it remains admissible."
   ],
   [
    "Which standard governs organizations that store or process credit card data?",
    "PCI DSS (Payment Card Industry Data Security Standard)."
   ],
   [
    "Can software under a personal license be used for company work?",
    "Often not; personal licenses frequently restrict commercial use, so check the EULA and use a corporate license."
   ]
  ]
 },
 {
  "t": "Professionalism: punctuality, active listening, avoiding jargon, handling difficult customers, confidentiality, setting expectations and following up",
  "body": [
   "Technical skill solves problems, but professionalism decides whether customers trust you. CompTIA includes communication and professionalism in the exam because IT support is a customer-facing job, and scenario questions often ask for the most professional response.",
   "Punctuality and presence: arrive on time for appointments, and if you will be late, contact the customer before the appointment time, apologize and give a new estimate. Dress appropriately for the environment, whether formal or business casual. While with a customer, avoid distractions: no personal calls, texts, social media or side conversations, unless it is an urgent work matter. Stay focused on the customer's problem, and have a positive attitude and project confidence.",
   "Active listening means giving full attention, letting the customer finish without interrupting, taking notes, and then restating the problem in your own words to confirm you understood. Ask open-ended questions ('What were you doing when this happened?') to gather information, then closed-ended questions to narrow things down ('Does it happen on every website?'). Avoid jargon, acronyms and slang: explain things in plain language suited to the customer's level, without talking down to them.",
   "Handling difficult customers: stay calm and do not argue, get defensive or take it personally. Do not dismiss their problem or blame them, and never post about customers on social media. Let them explain, acknowledge their frustration, restate the issue to show you understand, and focus on what you can do. If the situation escalates beyond what you can resolve, involve your supervisor. Respect cultural differences, use appropriate titles and treat everyone with the same courtesy.",
   "Confidentiality: while working you may see private files, email, screens and documents, both on computers and on desks and printers. Do not read, copy or discuss them, and ask the user to close sensitive material if needed. Treat passwords and personal data with care, and follow company policy on privacy. Respecting customers' property, including their equipment and workspace, is part of this.",
   "Setting expectations and following up: tell the customer what you are going to do, how long it will likely take, and what options exist, including costs where relevant, so they can make decisions. If a repair cannot be completed, offer alternatives such as a loaner, escalation or replacement. When the work is done, explain what was fixed, provide documentation of the services, and verify the customer is satisfied. Follow up later to confirm the fix held. Deal with problems through your organization's formal process, and document everything in the ticket."
  ],
  "terms": [
   [
    "Active listening",
    "Focusing fully on the speaker, not interrupting, and restating the problem to confirm understanding."
   ],
   [
    "Open-ended question",
    "A question that invites a detailed answer, used to gather information."
   ],
   [
    "Closed-ended question",
    "A question answerable with yes, no or a specific fact, used to narrow down a problem."
   ],
   [
    "Jargon",
    "Specialized technical language that non-experts may not understand."
   ],
   [
    "Setting expectations",
    "Telling the customer what will happen, how long it will take and what the options are."
   ]
  ],
  "example": "A frustrated manager says that her laptop 'never works' and that IT is useless. The technician listens without interrupting, acknowledges that losing time before a deadline is stressful, and restates the problem: the laptop drops Wi-Fi in meeting rooms. They explain the plan in plain words, give a time estimate, fix the driver, and check in two days later to confirm the problem is gone.",
  "tip": "When in doubt on professionalism questions, choose the answer that is calm, respectful, keeps the customer informed and avoids distractions. Never argue, blame the user or discuss their private data.",
  "check": [
   [
    "You are running late for an on-site appointment. What should you do?",
    "Contact the customer before the scheduled time, apologize and give a realistic new arrival time."
   ],
   [
    "What should you do after the customer finishes describing the problem?",
    "Restate or summarize it in your own words to confirm your understanding, then ask clarifying questions."
   ],
   [
    "A customer's confidential documents are open on the screen while you work. What is appropriate?",
    "Do not read them; ask the customer to close or secure them before you continue."
   ]
  ]
 },
 {
  "t": "Scripting basics: .bat, .ps1, .vbs, .sh, .js, .py; use cases (automation, restarts, drive mapping, installs, backups, updates) and risks",
  "body": [
   "A script is a plain-text file of commands that an interpreter runs in order. Scripts let technicians automate repetitive tasks, apply the same configuration to many machines and avoid manual mistakes. The A+ exam expects you to recognize common script types by extension, know what they are used for and understand the risks.",
   "Script types: `.bat` is a Windows batch file run by the Command Prompt interpreter (cmd.exe); it uses classic commands such as `net use` and `copy`. `.ps1` is a PowerShell script, the modern and far more powerful Windows scripting language, able to manage almost every part of Windows and many cloud services; its execution policy controls whether scripts may run. `.vbs` is VBScript, an older Windows scripting language run by Windows Script Host, now deprecated by Microsoft and common in legacy logon scripts and malware. `.sh` is a shell script for Linux and macOS, run by bash or another shell. `.js` is JavaScript, used in web browsers and with Node.js, and on Windows also runnable through Windows Script Host. `.py` is Python, a cross-platform general-purpose language popular for automation and data tasks.",
   "Script building blocks you should recognize include variables (named storage for values), comments (notes ignored by the interpreter, such as `REM` in batch, `#` in PowerShell, bash and Python, `'` in VBScript and `//` in JavaScript), loops that repeat actions, conditional `if` statements and data types such as strings and integers.",
   "Common use cases: basic automation of repetitive tasks; restarting machines or services on a schedule; remapping network drives at logon; installing applications silently across many computers; initiating updates; running backups and copying files with robocopy or rsync; gathering information or logs; and remote administration of many devices at once.",
   "```\nREM map-drives.bat: map the shared drives at logon\nnet use S: \\\\fileserver\\sales /persistent:yes\nnet use H: \\\\fileserver\\home\\%USERNAME%\n```",
   "Risks and considerations: a script runs with the permissions of whoever runs it, so a mistake in a script run as administrator can delete data or break many machines at once. Test scripts in a sandbox before deploying them. Scripts downloaded from the internet may contain malware, and attackers commonly use PowerShell, VBScript and JavaScript files as email attachments or for fileless attacks, so review scripts before running them, keep execution policies and application controls in place, and digitally sign trusted scripts. Other risks include accidentally changing system settings, browser or system crashes from mishandled resources, and scripts that consume excessive resources. Never hard-code passwords in scripts; use a secure credential store instead."
  ],
  "terms": [
   [
    ".ps1",
    "A PowerShell script file, the modern Windows automation language."
   ],
   [
    ".bat",
    "A Windows batch file of Command Prompt commands."
   ],
   [
    ".sh",
    "A shell script for Linux or macOS, run by bash or another shell."
   ],
   [
    "Execution policy",
    "PowerShell setting that controls whether and which scripts can run, for example only signed scripts."
   ],
   [
    "Variable",
    "A named placeholder in a script that stores a value for later use."
   ]
  ],
  "example": "Every new hire needs the same five network drives mapped. Instead of mapping them by hand, the technician writes a short batch logon script with `net use` commands, tests it on a lab machine, and assigns it through Group Policy. Every user now gets the same drives automatically at sign-in.",
  "tip": "Match extensions to platforms: .bat and .ps1 and .vbs are Windows; .sh is Linux/macOS; .py and .js are cross-platform. The main risk answers are unintended system changes, introducing malware, and resource problems, so test before deploying.",
  "check": [
   [
    "Which script file type would you use to automate a task on a Linux server?",
    "A shell script (.sh), or a cross-platform Python (.py) script."
   ],
   [
    "Why is it dangerous to run a downloaded script as administrator without reviewing it?",
    "It runs with full privileges and could contain malware or commands that damage the system."
   ],
   [
    "Name three common uses for scripts in IT support.",
    "Examples: mapping drives, restarting machines or services, installing applications, running backups, initiating updates, collecting information."
   ]
  ]
 },
 {
  "t": "Remote access: RDP, VPN, VNC, SSH, RMM, SPICE, WinRM, screen-sharing and file-transfer tools, and their security considerations",
  "body": [
   "Remote access lets technicians support users and manage systems without traveling to them, and lets staff work from anywhere. Each method has a purpose and a security profile, and attackers target remote access heavily, so both are exam material.",
   "RDP (Remote Desktop Protocol) gives a full graphical desktop session on a Windows machine, by default over TCP port 3389. The host must run a Pro or higher edition. Never expose RDP directly to the internet; put it behind a VPN or gateway, require Network Level Authentication and MFA, and use strong passwords with account lockout, because exposed RDP is a common ransomware entry point. VNC (Virtual Network Computing) is a cross-platform screen-sharing protocol that shows and controls the actual console session; many implementations have weak or no encryption, so tunnel it through SSH or a VPN.",
   "SSH (Secure Shell) provides an encrypted command-line session, typically on TCP port 22, and is the standard for managing Linux servers and network devices; it replaced the insecure Telnet. Use key-based authentication rather than passwords where possible and disable direct root login. SSH also underpins secure file transfer with SFTP and SCP. SPICE (Simple Protocol for Independent Computing Environments) is a remote display protocol used mainly to access virtual machines' consoles in some virtualization platforms. WinRM (Windows Remote Management) lets administrators run PowerShell commands and scripts on remote Windows computers without a graphical session; restrict it to administrators and management networks.",
   "A VPN (virtual private network) creates an encrypted tunnel from a remote device to the organization's network, so remote users can reach internal resources as if they were in the office. VPN is not itself a remote control tool; it provides the secure connection over which other tools run. VPN accounts need MFA and prompt deprovisioning.",
   "RMM (remote monitoring and management) platforms are used by IT departments and managed service providers to monitor many endpoints, deploy patches and software, run scripts and take remote control from one console. Because an RMM agent has administrative control of every managed device, a compromised RMM account is extremely dangerous; protect it with MFA and least privilege. Screen-sharing and remote-support tools, including desktop sharing, video conferencing and third-party remote support apps, let a user invite a technician to view or control their screen, ideally with the user's explicit consent for each session. File-transfer tools, including SFTP, cloud file sharing and managed transfer services, should use encryption; avoid unencrypted FTP.",
   "Security considerations across all methods: use encryption, MFA and strong authentication; allow only approved tools; restrict by IP or require a VPN; keep software patched; log sessions; and train users that legitimate IT staff will not cold-call them demanding remote access. Scammers commonly persuade victims to install remote-access tools, so an unexpected request to install one is a red flag."
  ],
  "terms": [
   [
    "RDP",
    "Remote Desktop Protocol: Microsoft's graphical remote session protocol, default TCP port 3389."
   ],
   [
    "SSH",
    "Secure Shell: encrypted remote command-line access, default TCP port 22."
   ],
   [
    "VNC",
    "Virtual Network Computing: cross-platform screen-sharing protocol, often needing an encrypted tunnel."
   ],
   [
    "RMM",
    "Remote monitoring and management: platforms for monitoring, patching and controlling many endpoints."
   ],
   [
    "WinRM",
    "Windows Remote Management: protocol for running PowerShell commands on remote Windows systems."
   ]
  ],
  "example": "A small business allows RDP directly from the internet to its office server and sees thousands of failed login attempts in the Security log. The technician closes the port on the firewall, sets up a VPN with MFA for remote staff, and allows RDP only from VPN addresses. The failed attempts stop immediately.",
  "tip": "SSH (22) replaced Telnet for secure command-line access; RDP (3389) is Windows graphical access and should never be exposed directly to the internet. A VPN secures the connection; it is not a remote-control tool by itself.",
  "check": [
   [
    "Which protocol would you use for encrypted command-line administration of a Linux server?",
    "SSH."
   ],
   [
    "What is the safest way to give remote workers RDP access to office PCs?",
    "Require a VPN (or RD gateway) with MFA and allow RDP only through it, never directly from the internet."
   ],
   [
    "Why is a compromised RMM account so dangerous?",
    "The RMM platform has administrative control over every managed device, so an attacker could deploy malware to all of them."
   ]
  ]
 },
 {
  "t": "Artificial intelligence basics: app integration, appropriate-use policy and plagiarism, bias, hallucinations and accuracy, public vs private models and data privacy",
  "body": [
   "Artificial intelligence (AI) tools, especially generative AI based on large language models (LLMs), are now built into many of the applications users rely on: office suites that draft documents and summarize meetings, email clients that suggest replies, help desk systems that suggest answers, search engines and operating system assistants. A technician will support these features and advise users on using them responsibly, so the exam covers the basics.",
   "App integration means AI features are embedded in existing software or connected to it through APIs (application programming interfaces). Integration raises practical questions: what data the AI feature can reach (for example, all of a user's mailbox and files), whether it is licensed for the user, and whether the organization has approved it. AI features inherit the user's permissions, so poor file permissions can expose information through AI search and summaries.",
   "Organizations should publish an appropriate-use policy for AI, similar to an acceptable use policy. It typically says which AI tools are approved, which types of data may be entered into them, when output must be reviewed by a person, and how AI use should be disclosed. Plagiarism is a concern: presenting AI-generated text or code as your own original work may violate academic or company rules, and generated content can closely resemble copyrighted material. Users remain responsible for what they submit.",
   "Bias arises because AI models learn from training data that reflects human and historical biases. The results can be unfair or skewed, for example in screening job applications or describing groups of people. Hallucinations are confident, plausible-sounding outputs that are simply false, such as invented facts, citations, commands or settings that do not exist. Because models generate likely-sounding text rather than looking up verified facts, accuracy must be checked: verify important outputs against authoritative sources, test generated scripts in a sandbox before running them, and keep a human in the loop for decisions that matter.",
   "Public vs private models affects data privacy. A public model is a consumer AI service available to anyone; depending on its terms, the prompts and data users enter may be stored, reviewed or used to train future models, and could be exposed. Entering customer PII, PHI, card data, passwords, source code or confidential business information into such a service can breach policy, contracts and regulations. A private model is one run by the organization itself or provided under an enterprise agreement that keeps data within the organization's control and excludes it from training. Organizations often steer users to approved enterprise tools and use DLP controls to block sensitive data from reaching unapproved AI services.",
   "In short: use approved tools, protect sensitive data, verify results, watch for bias and take responsibility for the output."
  ],
  "terms": [
   [
    "Generative AI",
    "AI that creates new text, images, code or other content based on patterns learned from training data."
   ],
   [
    "Hallucination",
    "A confident but false or fabricated output from an AI model."
   ],
   [
    "Bias",
    "Systematic unfairness in AI output caused by skewed training data or design."
   ],
   [
    "Public model",
    "An AI service open to the public, whose terms may allow prompts to be stored or used for training."
   ],
   [
    "Private model",
    "An AI model run internally or under an enterprise agreement that keeps the organization's data under its control."
   ]
  ],
  "example": "A help desk technician asks a public AI chatbot for a PowerShell command to fix a user's problem and pastes in the user's full error log, which includes their email address and internal server names. Company policy only permits the enterprise AI assistant for work data. The technician's manager explains the privacy risk, and the technician also learns that one command the chatbot suggested does not exist, which is a hallucination they should have tested for in a sandbox.",
  "tip": "Never put confidential or regulated data into a public AI model unless policy explicitly allows it. Always verify AI output, since hallucinations sound confident.",
  "check": [
   [
    "What is an AI hallucination?",
    "An output that sounds plausible and confident but is false or made up, such as a nonexistent command or citation."
   ],
   [
    "Why might entering customer data into a public AI chatbot violate policy?",
    "The provider may store or use the data, including for training, taking it outside the organization's control and possibly breaching privacy laws or contracts."
   ],
   [
    "How should a technician treat a script generated by an AI tool?",
    "Review it, verify commands against documentation, and test it in a sandbox before running it in production."
   ]
  ]
 }
]);
