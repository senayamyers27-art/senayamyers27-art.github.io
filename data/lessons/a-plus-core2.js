/* Lessons for CompTIA A+ Core 2 (220-1202): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("a-plus-core2", [
 {
  "t": "OS types and purposes: Windows, macOS, Linux, ChromeOS, iOS/iPadOS, Android; vendor life cycles and end-of-life",
  "body": [
   "An operating system (OS) is the software layer that sits between the hardware and the programs you run. It manages memory, schedules work on the CPU, talks to devices through drivers, stores files and enforces who is allowed to do what. Applications never talk to the hardware directly; they ask the OS. As a support technician you will meet several operating systems every week, and the A+ exam expects you to know what each one is for, who makes it, what hardware it runs on and how it is kept up to date and supported.",
   "Desktop and laptop operating systems come first. Microsoft Windows dominates business desktops because of its huge software catalog and its tight integration with Active Directory domains and Group Policy. Apple macOS runs only on Apple Mac hardware and is popular with creative and development teams; because Apple controls both the hardware and the software, drivers are rarely a problem. Linux is a family of open-source distributions (Ubuntu, Fedora, Debian, Red Hat Enterprise Linux and many more) built on the Linux kernel; it runs most web servers, many network appliances and plenty of developer workstations, and is usually free to use. ChromeOS, from Google, is a lightweight, browser-centred OS on Chromebooks; it is cheap to manage, keeps most data in the cloud, updates itself and is very common in schools.",
   "Mobile operating systems are the second group. Apple iOS runs on iPhone and iPadOS on iPad; both are closed ecosystems, and apps normally come only from the App Store after Apple reviews them. Google Android is based on the Linux kernel and is licensed to many phone makers (Samsung, Google Pixel, Motorola and others), who each add their own customizations and choose how long to support each model. That diversity is why Android update timing varies by manufacturer and sometimes by carrier, while Apple ships each update to all supported devices on the same day. Android also allows apps from sources other than the Google Play Store, which adds flexibility and risk.",
   "Every vendor publishes a life cycle for its products. During mainstream support the product receives new features, bug fixes and security patches. Some vendors then offer an extended period with security fixes only, sometimes as a paid program. At end-of-life (EOL), often called end of support, the vendor stops issuing patches entirely. The software keeps working, but every newly discovered vulnerability stays open forever, vendors stop helping with problems, and new applications and drivers gradually stop supporting it. Compliance frameworks usually forbid running EOL software on systems that handle sensitive data. Mobile devices reach EOL when the vendor stops shipping OS updates to that model, which often happens while the hardware still works fine.",
   "The distinctions the exam tests are mostly about fit and compatibility. Software is written for a particular OS, so a Windows application will not run natively on macOS, and an Android APK (Android package) will not install on an iPhone; the right OS depends on the software the user needs. Choose Windows when the user needs line-of-business Windows applications or domain management, macOS for Apple-centred creative workflows, Linux for servers and appliances, ChromeOS for low-cost, web-based fleets such as classrooms, and iOS or Android for phones and tablets. Know the update channels too: Windows uses Windows Update, macOS uses Software Update in System Settings, Linux distributions use their package managers, ChromeOS updates automatically in the background, and phones receive over-the-air (OTA) updates.",
   "Consider a worked example. A clinic runs a reception PC on an OS version that has just reached end of support, and it hosts an old scheduling program that the vendor never updated. You cannot simply leave it, because new vulnerabilities will never be patched. First you check whether the scheduling vendor offers a supported version on a current OS; if so, you budget, test and schedule the migration. If the program truly cannot move, you isolate the PC on its own network segment, block internet access, restrict who can sign in, document the accepted risk and set a date to replace it.",
   "Common mistakes: believing EOL means the OS stops booting (it keeps working, it just stops being patched); assuming every Android phone gets updates at the same time as Google's own devices; thinking ChromeOS runs traditional Windows desktop software natively; and forgetting that a phone model can reach EOL while it still looks new. Another trap is treating Linux as a single product. It is a kernel shared by many distributions, each with its own support schedule and package manager.",
   "Exam questions usually describe a need and ask which OS or action fits. 'Inexpensive devices for students that mostly use web apps' points to ChromeOS. 'Runs only on Apple hardware' is macOS. 'Open source, runs most web servers' is Linux. 'Updates depend on the manufacturer and carrier' is Android. 'The vendor no longer releases security patches' means end-of-life, and the answer is to upgrade, replace or, if neither is possible, isolate the system and document the risk."
  ],
  "terms": [
   [
    "Operating system (OS)",
    "The software that manages hardware resources and provides services to applications and users."
   ],
   [
    "Distribution (distro)",
    "A packaged version of Linux that combines the Linux kernel with tools, a package manager and default software."
   ],
   [
    "ChromeOS",
    "Google's lightweight, browser-centred operating system for Chromebooks that updates itself automatically."
   ],
   [
    "Over-the-air (OTA) update",
    "An operating system update delivered wirelessly to a mobile device."
   ],
   [
    "Life cycle",
    "The vendor's published timeline of support phases for a product, from release to retirement."
   ],
   [
    "End-of-life (EOL)",
    "The point after which a vendor stops providing patches and support for a product."
   ],
   [
    "Extended support",
    "A later support phase, sometimes paid, in which only security fixes are provided."
   ]
  ],
  "example": "A school district replaces aging Windows laptops in its classrooms with Chromebooks. Students work almost entirely in web-based office apps, the devices update themselves overnight, and teachers can wipe and reassign a lost device through the management console. The district keeps a small lab of Windows PCs for one design program that has no web version.",
  "tip": "End-of-life does not mean the OS stops working; it means no more security patches. Answers about EOL systems point to upgrading or replacing them, or isolating them if they cannot be replaced.",
  "check": [
   [
    "A user needs to run a Windows-only accounting program. Can you give them an iPad instead of a laptop?",
    "Not for native use, because applications are written for a specific OS and a Windows desktop program will not install on iPadOS."
   ],
   [
    "Why do different Android phones receive the same Android update at different times?",
    "Android is licensed to many manufacturers who customize it and decide when, or whether, to ship updates to each model, sometimes with carrier involvement."
   ],
   [
    "What changes when an OS reaches end-of-life?",
    "The vendor stops releasing patches and support, so new vulnerabilities remain unfixed even though the system still runs."
   ],
   [
    "A legacy EOL system cannot be upgraded. What is the best mitigation?",
    "Isolate it on a restricted network segment, limit who can reach it, document the accepted risk and plan its replacement."
   ]
  ]
 },
 {
  "t": "File systems: NTFS, ReFS, FAT32, exFAT, ext4, XFS, APFS and their limits",
  "body": [
   "A file system is the set of rules an operating system uses to organize data on a storage device: how files are named, where their pieces live on the disk, what metadata (dates, owners, permissions) is kept and how free space is tracked. When you format a drive you choose a file system, and that choice decides which operating systems can read and write it, how large individual files can be and which security features, such as permissions and encryption, are available. Choosing the wrong one is behind many 'why can't I copy this file' tickets.",
   "NTFS (New Technology File System) is the standard for Windows system drives. It supports file and folder permissions, encryption with EFS (Encrypting File System), compression, disk quotas and journaling, which records pending changes so the volume can recover cleanly after a crash or power loss. Its file and volume size limits are so large that they never matter for normal work. macOS can read NTFS but cannot write to it by default, and Linux support varies by distribution, so NTFS is a poor choice for a drive that must be shared with a Mac.",
   "ReFS (Resilient File System) is a newer Microsoft file system designed for data integrity and very large volumes. It uses checksums to detect corruption and can repair damaged data automatically when paired with Storage Spaces mirroring. It is aimed at servers, storage pools and virtual machine storage, and it lacks some NTFS features, so you do not normally install Windows onto it. Think of ReFS as the choice for resilient data storage rather than for a boot drive.",
   "FAT32 (File Allocation Table, 32-bit) is old, simple and readable by almost everything: Windows, macOS, Linux, cameras, game consoles and car stereos. Its famous limit is a maximum file size of 4 GB (minus one byte), and Windows's built-in graphical formatting tools have traditionally offered FAT32 only for volumes up to 32 GB. It has no permissions and no journaling. exFAT (Extended FAT) was created for flash media: it removes the 4 GB file limit, supports very large volumes and is readable and writable by modern Windows and macOS, which makes it the usual choice for large USB drives and SD cards shared between those systems. Like FAT32, it has no permissions or journaling.",
   "The other operating systems have their own defaults. On Linux, ext4 (fourth extended file system) is the common default; it is journaled and supports Linux permissions and large files. XFS is a high-performance journaled file system, the default on Red Hat Enterprise Linux and its relatives, and is well suited to large files and parallel workloads. Windows cannot read either natively. APFS (Apple File System) is the default for macOS, iOS and iPadOS. It is optimized for SSDs and supports snapshots, space sharing between volumes in one container and strong built-in encryption. Older Macs used HFS+ (Mac OS Extended). Windows cannot read APFS without third-party tools.",
   "Consider a worked example. A video editor tries to copy a 12 GB project file from a Windows PC to a brand-new 128 GB USB drive and gets 'The file is too large for the destination file system', even though the drive is empty. You check the drive's properties and see FAT32. Because the editor also uses a Mac at home, NTFS would be awkward, since the Mac could read but not write it. You back up anything on the drive, reformat it as exFAT, and the copy succeeds on both computers. Formatting erases the drive, so always copy data off first.",
   "Common mistakes: thinking 'file too large' means the drive is full (it usually means FAT32's per-file limit); choosing NTFS for a drive that a Mac must write to; assuming exFAT has permissions or journaling like NTFS; and expecting Windows to open an ext4 or APFS drive without extra software. Remember too that the 32 GB figure is a limit of Windows's formatting tools for FAT32, while the 4 GB figure is a limit of the file system itself.",
   "Exam questions match the file system to the job, so learn the pairs. Windows boot drive or need for permissions and EFS: NTFS. Large-file flash drive shared between Windows and Mac: exFAT. Maximum compatibility with old devices and small files: FAT32. Linux server: ext4 or XFS. Mac or iPhone: APFS. Resilient Windows storage pool with automatic integrity checking: ReFS. Clue words such as 'journaling', 'permissions', 'checksums', 'snapshots' and '4 GB' point straight at the answer."
  ],
  "terms": [
   [
    "File system",
    "The structure an operating system uses to name, store, locate and protect files on a volume."
   ],
   [
    "NTFS",
    "The Windows default file system, with permissions, EFS encryption, compression, quotas and journaling."
   ],
   [
    "ReFS",
    "Microsoft's Resilient File System, which uses checksums and self-repair for large, integrity-focused storage."
   ],
   [
    "FAT32",
    "A widely compatible legacy file system with a 4 GB maximum file size and no permissions."
   ],
   [
    "exFAT",
    "A flash-oriented file system without FAT32's 4 GB file limit, readable and writable by Windows and macOS."
   ],
   [
    "ext4 and XFS",
    "Journaled Linux file systems; ext4 is a common default and XFS is the Red Hat default for high performance."
   ],
   [
    "APFS",
    "Apple File System, the SSD-optimized default for macOS, iOS and iPadOS with snapshots and encryption."
   ],
   [
    "Journaling",
    "Recording pending changes in a log so a file system can recover consistently after a crash."
   ]
  ],
  "example": "A photographer's camera card, formatted FAT32, stops recording long 4K video clips at the same point every time. The camera splits or stops files at 4 GB. Switching to a card formatted exFAT, which the camera supports, lets it record long single clips that her Windows laptop and Mac can both open.",
  "tip": "'File too large' on a drive with plenty of free space almost always means FAT32 and its 4 GB per-file limit. Reformat as exFAT for Windows and Mac sharing, or NTFS for Windows only.",
  "check": [
   [
    "Which file system should you choose for a USB drive that must carry 10 GB files between Windows and macOS?",
    "exFAT, because it removes FAT32's 4 GB file limit and both operating systems can read and write it."
   ],
   [
    "Which Windows file system supports EFS encryption and NTFS permissions on a boot drive?",
    "NTFS, the standard Windows system drive file system."
   ],
   [
    "What is the default file system on current Macs and iPhones?",
    "APFS, the Apple File System, which is optimized for SSDs and supports snapshots and encryption."
   ],
   [
    "What feature helps a file system recover cleanly after a sudden power loss?",
    "Journaling, which logs pending changes so the volume can be brought back to a consistent state."
   ]
  ]
 },
 {
  "t": "Installations and upgrades: boot methods (USB, PXE, ISO), clean vs in-place vs image deployment vs repair install, GPT vs MBR, third-party drivers",
  "body": [
   "Installing an operating system has three big decisions: how the computer will boot the installer, what kind of installation you will perform, and how the disk will be partitioned. The A+ exam describes a situation, such as fifty new laptops, a failing Windows install or a new 4 TB disk, and asks which method fits. Getting these choices right saves hours and protects the user's data.",
   "Start with getting the computer to boot the installer. The most common method is a bootable USB flash drive created from the vendor's installation media. An ISO file is a single-file image of an optical disc; you can burn it to DVD, write it to USB with a tool, mount it in Windows, or attach it directly to a virtual machine. PXE (Preboot Execution Environment, pronounced 'pixie') lets a computer boot from the network: the network card requests an address from DHCP (Dynamic Host Configuration Protocol), is pointed at a deployment server and downloads a small boot image. PXE is how organizations image dozens of machines without carrying USB sticks around, and it must be enabled in firmware. Other options include an internal recovery partition, an external drive or a network share. You select the boot device in the UEFI (Unified Extensible Firmware Interface) or BIOS settings, or from a one-time boot menu.",
   "Next, choose the installation type. A clean install wipes the target partition and installs a fresh OS; it removes old problems but also removes applications and data, so back up first. An in-place upgrade installs a newer version over the existing one and keeps files, settings and most apps; it is convenient but can carry existing problems forward. Image deployment copies a prepared, standardized image (OS plus apps plus settings) onto many machines, often over PXE or from a deployment server, which gives every user an identical, tested build. A repair install (an in-place repair) reinstalls the same Windows version over itself to replace damaged system files while keeping data and apps. You may also meet a recovery partition reset, a remote network installation and multiboot, where two operating systems live on separate partitions.",
   "Before installing, the disk needs a partition style. MBR (Master Boot Record) is the legacy scheme: it supports up to four primary partitions (or three plus an extended partition holding logical drives) and disks up to about 2 TB. GPT (GUID Partition Table) is the modern scheme used with UEFI firmware: it supports far larger disks, Windows allows up to 128 partitions, and it stores a backup copy of the partition table at the end of the disk for resilience. Windows 11 requires UEFI with Secure Boot capability, which in practice means a GPT system disk. If a 4 TB disk shows only about 2 TB usable, it was initialized as MBR.",
   "Sometimes the installer cannot see the drive at all. That usually means the storage controller, for example a RAID (redundant array of independent disks) controller or certain NVMe (Non-Volatile Memory Express) controllers, needs a third-party driver that is not on the installation media. Setup offers a 'Load driver' option so you can supply the driver from a USB stick. The same idea applies after installation: download chipset, graphics and network drivers from the manufacturer if Windows Update does not supply suitable ones. Before any upgrade, also check hardware requirements, application compatibility, free disk space and a verified backup.",
   "Consider a worked example. A company receives forty identical desktops and wants each one built with Windows, the office suite, antivirus and company settings. Installing each by hand from USB would take days and produce slightly different results. Instead, the technician builds and tests one reference machine, captures it as an image, enables network boot in firmware on the new desktops and uses PXE to deploy the image to all forty. Separately, one existing laptop has corrupted system files but the user's apps must stay, so that laptop gets a repair install rather than a clean one.",
   "Common mistakes: choosing a clean install when the user must keep files and apps; forgetting to back up before any installation; confusing an ISO (a file) with PXE (a network boot method); initializing a large disk as MBR and losing the space above 2 TB; and assuming a missing disk in setup means the disk is dead when it simply needs a storage driver. Also remember that an in-place upgrade keeps problems as well as data.",
   "Exam wording gives the answer away. 'Keep files and applications while moving to a newer version' means in-place upgrade. 'Fix damaged system files but keep everything' means repair install. 'Start fresh' or 'remove all traces of the old system' means clean install. 'Many identical machines' means image deployment. 'Boot over the network' or 'no USB ports available' means PXE. 'Disk larger than 2 TB', 'more than four partitions' or 'UEFI and Secure Boot' means GPT. 'Setup does not see the drive' means load a third-party storage driver."
  ],
  "terms": [
   [
    "ISO file",
    "A single-file image of an optical disc that can be mounted, burned or written to USB."
   ],
   [
    "PXE",
    "Preboot Execution Environment, which lets a network card boot a computer from a deployment server."
   ],
   [
    "Clean install",
    "Installing a fresh OS on a wiped partition, removing previous apps, settings and data."
   ],
   [
    "In-place upgrade",
    "Installing a newer OS version over the existing one while keeping files, settings and most apps."
   ],
   [
    "Image deployment",
    "Copying a standardized, pre-built OS image to many computers."
   ],
   [
    "Repair install",
    "Reinstalling the same OS version over itself to fix system files while keeping data and apps."
   ],
   [
    "MBR",
    "Legacy partition style limited to about 2 TB disks and four primary partitions."
   ],
   [
    "GPT",
    "Modern partition style used with UEFI that supports very large disks and many partitions."
   ]
  ],
  "example": "A technician installs Windows on a workstation with a hardware RAID controller, but setup shows no drives. She downloads the controller's storage driver from the manufacturer on another PC, copies it to a USB stick, chooses Load driver in setup and browses to it. The RAID volume appears, she creates GPT partitions and the installation proceeds.",
  "tip": "Match keywords: keep files and apps means in-place upgrade or repair install; start fresh means clean install; many identical machines means image deployment; network boot means PXE; disks over 2 TB need GPT.",
  "check": [
   [
    "A user wants to move to a newer Windows version and keep all programs and files. Which installation type fits?",
    "An in-place upgrade, because it installs over the existing OS and preserves files, settings and most apps."
   ],
   [
    "A new 4 TB disk shows only about 2 TB of usable space. Why?",
    "It was initialized with MBR, which cannot address beyond about 2 TB; converting to GPT (after backing up) fixes it."
   ],
   [
    "Windows setup does not list any disks on a server with a RAID controller. What should you do?",
    "Use Load driver to supply the controller's third-party storage driver from removable media."
   ],
   [
    "Which boot method lets you image many PCs without removable media?",
    "PXE, which boots the computers from a deployment server over the network."
   ]
  ]
 },
 {
  "t": "Windows 10/11 editions (Home, Pro, Enterprise, Education) and which features each has: BitLocker, domain join, Group Policy, Remote Desktop host",
  "body": [
   "Microsoft sells Windows 10 and Windows 11 in several editions. They share the same core, but business features are switched on only in the higher editions. The A+ exam often describes a need, such as 'the laptop must join the company domain' or 'the drive must be encrypted with BitLocker', and asks which edition supports it or what to do when the current edition cannot. Memorizing the dividing line between Home and Pro answers most of these questions.",
   "Windows Home is aimed at consumers. It cannot join an Active Directory domain, does not include the Local Group Policy Editor (`gpedit.msc`), cannot act as a Remote Desktop host (it can still connect out to other computers with the Remote Desktop client), and does not include full BitLocker management. Many Home devices offer a simpler 'Device encryption' feature when the hardware supports it, but that is not the same as full BitLocker with its management options and BitLocker To Go. Home is fine for personal use and typically signs in with a Microsoft account.",
   "Windows Pro adds what a small business needs: domain join (Active Directory and Microsoft Entra ID, formerly Azure AD), Group Policy, BitLocker and BitLocker To Go, the ability to host incoming Remote Desktop connections, Hyper-V virtualization and business update management. Pro is the minimum edition for most corporate desktops. If a user on Home needs one of these features, you can upgrade the edition in place by entering a Pro product key or buying the upgrade, without reinstalling or losing data.",
   "Windows Enterprise is licensed to organizations through volume licensing or subscriptions. It includes everything in Pro plus advanced security and management features aimed at large fleets, such as additional application control, credential protection and deployment options. Windows Education is essentially Enterprise-level functionality licensed to schools and universities. For exam purposes, treat Enterprise and Education as 'everything Pro has, and more', and remember they are not sold as retail boxes to individual consumers. Here is the summary to memorize. BitLocker: Pro, Enterprise, Education, not Home. Domain join: Pro, Enterprise, Education, not Home. Group Policy Editor: Pro, Enterprise, Education, not Home. Remote Desktop host: Pro, Enterprise, Education, not Home. Every edition can use the Remote Desktop client to connect out to another computer. The distinction between being a Remote Desktop client and a Remote Desktop host is a favourite exam trap: Home can connect to a Pro machine, but nobody can connect in to a Home machine with Remote Desktop.",
   "Consider a worked example. A small accounting firm buys a laptop from a retail store for a new hire, and it arrives with Windows Home. When you try to join it to the firm's domain, the option to join a domain is not available, and the firm's policy also requires BitLocker. Rather than wiping the machine, you open Settings, go to System and Activation, and upgrade the edition to Pro with a purchased key. After a restart, the laptop can join the domain, receive Group Policy and have BitLocker enabled, with the user's files intact.",
   "Also consider hardware requirements and support dates. Windows 11 requires, among other things, a TPM (Trusted Platform Module) 2.0 chip, UEFI firmware with Secure Boot capability and a supported processor. Windows 10 reached end of support in October 2025, so organizations still running it need to upgrade or enrol in extended security updates. You can check the current edition and version with `winver` or in Settings under System and About.",
   "Common mistakes: assuming Device encryption on Home is the same as BitLocker with its full management tools; reinstalling Windows to change edition when an in-place key upgrade works and keeps the data; forgetting that Home can still use the Remote Desktop client to reach other machines; and assuming Enterprise can be bought off the shelf for a single home PC. Another trap is blaming the network when Remote Desktop into a Home PC fails, when the real cause is the edition.",
   "Exam questions usually give a symptom on a Home machine. 'The option to join a domain is missing', '`gpedit.msc` cannot be found', 'BitLocker is not available in Control Panel' or 'colleagues cannot connect to this PC with Remote Desktop' all lead to the same answer: upgrade to Pro or higher. 'Large organization, volume licensing, advanced security' suggests Enterprise, and 'school or university licensing' suggests Education. If the question asks what Windows 11 needs that older PCs may lack, look for TPM 2.0 and Secure Boot."
  ],
  "terms": [
   [
    "Windows Home",
    "The consumer edition, without domain join, Group Policy Editor, BitLocker management or Remote Desktop host."
   ],
   [
    "Windows Pro",
    "The business edition that adds domain join, Group Policy, BitLocker, Remote Desktop host and Hyper-V."
   ],
   [
    "Windows Enterprise",
    "The volume-licensed edition for organizations with Pro features plus advanced security and management."
   ],
   [
    "Windows Education",
    "Enterprise-level features licensed for schools and universities."
   ],
   [
    "Domain join",
    "Adding a computer to a directory such as Active Directory so it uses central accounts and policies."
   ],
   [
    "Remote Desktop host",
    "A computer that accepts incoming Remote Desktop connections, available in Pro and higher."
   ],
   [
    "TPM 2.0",
    "A hardware security chip that stores keys, required by Windows 11 and used by BitLocker."
   ]
  ],
  "example": "A remote worker asks the help desk to connect to her home PC with Remote Desktop from the office, but the connection fails every time. The help desk finds the home PC runs Windows Home, which can only be a Remote Desktop client. They suggest a supported remote support tool for now and explain that hosting Remote Desktop requires upgrading that PC to Pro.",
  "tip": "If a question mentions domain join, gpedit.msc, BitLocker or accepting Remote Desktop connections on a Home machine, the answer is an edition upgrade to Pro or higher, not a reinstall.",
  "check": [
   [
    "A Windows Home laptop must join the company domain. What is the simplest fix?",
    "Upgrade the edition to Pro with a product key; Home cannot join a domain, and the upgrade does not require reinstalling."
   ],
   [
    "Can a Windows Home PC connect to another computer using Remote Desktop?",
    "Yes, every edition includes the Remote Desktop client; Home only lacks the ability to host incoming sessions."
   ],
   [
    "Which editions include BitLocker?",
    "Pro, Enterprise and Education; Home does not include full BitLocker."
   ],
   [
    "Which hardware components are commonly missing on older PCs that cannot run Windows 11?",
    "A TPM 2.0 chip, UEFI firmware with Secure Boot capability or a supported processor."
   ]
  ]
 },
 {
  "t": "Windows tools: Task Manager, MMC snap-ins (Event Viewer, Disk Management, Task Scheduler, Device Manager, Certificate Manager, Local Users and Groups, Performance Monitor, Group Policy Editor), msinfo32, Resource Monitor, System Configuration, Registry Editor, Disk Cleanup",
  "body": [
   "Windows includes a toolbox of graphical utilities, and the exam gives you a symptom or a task and asks which tool to open. Learning each tool's purpose and its run command pays off twice: you answer questions quickly, and in real support work you can launch most of them from the Run box (Windows key + R) or a command prompt without hunting through menus. Think of each tool as the answer to a specific question a technician asks.",
   "Task Manager (`taskmgr`, or Ctrl+Shift+Esc) is the first stop for a slow or frozen PC. It shows running processes and their CPU, memory, disk and network use; lets you end unresponsive tasks; shows live performance graphs; lists startup apps with their impact so you can disable them; and shows services and signed-in users. Resource Monitor (`resmon`) goes deeper, showing exactly which process is using which file, network connection or disk, which is how you find the program that has a file locked. System Configuration (`msconfig`) controls boot options, such as booting into Safe Mode, and lets you hide Microsoft services and disable the rest for clean-boot troubleshooting. System Information (`msinfo32`) gives a read-only report of hardware, drivers, BIOS or UEFI version and system resources, useful when you need model details without opening the case.",
   "The Microsoft Management Console (MMC, `mmc`) is a container for administrative tools called snap-ins; you can build a custom console with the ones you use most, and many are also available directly. Event Viewer (`eventvwr.msc`) shows the Application, Security and System logs, where you look up errors, warnings and audit events by time and source. Disk Management (`diskmgmt.msc`) initializes disks, creates, extends, shrinks and formats partitions, and assigns drive letters. Task Scheduler (`taskschd.msc`) runs programs or scripts on a schedule or on triggers such as sign-in or startup. Device Manager (`devmgmt.msc`) shows hardware, lets you update, roll back, disable or uninstall drivers, and flags problem devices with a warning icon.",
   "More snap-ins round out the list. Certificate Manager (`certmgr.msc` for the current user, `certlm.msc` for the local computer) views, imports and exports digital certificates. Local Users and Groups (`lusrmgr.msc`) creates local accounts and manages group memberships, and is not available in Home editions. Performance Monitor (`perfmon`) records counters such as processor time or available memory over time, and can create data collector sets and baselines for later comparison. The Local Group Policy Editor (`gpedit.msc`, Pro and above) configures policies on a single machine. The Registry Editor (`regedit`) edits the registry, the hierarchical database of Windows and application settings organized into hives such as HKEY_LOCAL_MACHINE and HKEY_CURRENT_USER. Mistakes there can make Windows unbootable, so export the key before you change it. Disk Cleanup (`cleanmgr`) removes temporary files, Recycle Bin contents, old update files and other clutter; the newer Storage settings page offers similar options.",
   "The distinctions the exam likes are real-time versus over time, and viewing versus changing. Task Manager shows what is happening now; Performance Monitor records trends over hours or days. Task Manager tells you a process is busy; Resource Monitor tells you which file or connection it is using. `msinfo32` reports configuration but changes nothing, while `msconfig` changes boot and startup behaviour. Device Manager deals with drivers and devices, while Disk Management deals with partitions and volumes.",
   "Consider a worked example. A user reports that her PC became slow and crashes about once a day since last week. You open Task Manager and see nothing unusual at the moment, so you check Event Viewer's System log and find repeated errors from a display driver starting on the day a new driver was installed. In Device Manager you open the display adapter's properties and choose Roll Back Driver. To confirm the fix, you create a Performance Monitor data collector set to log processor and memory counters for the next few days.",
   "Common mistakes: using Task Manager to investigate a problem that happened last night (Event Viewer holds the history); editing the registry without exporting the key first; looking for `lusrmgr.msc` or `gpedit.msc` on a Home edition, where they are not included; confusing `msconfig` with `msinfo32`; and using Disk Management to fix a driver problem. Also remember that a startup program is disabled from Task Manager's Startup tab in current Windows, not from `msconfig`, which now points you there.",
   "Exam questions are easiest if you map clue to tool. 'What is using the CPU right now?' Task Manager. 'Which process has this file open?' Resource Monitor. 'What error happened last night?' Event Viewer. 'Why is this device not working, or roll back a driver?' Device Manager. 'Run a script every Monday?' Task Scheduler. 'Track memory use over a week or build a baseline?' Performance Monitor. 'Add, shrink or extend a partition?' Disk Management. 'Boot into Safe Mode next restart?' System Configuration. 'Find the BIOS version without rebooting?' System Information."
  ],
  "terms": [
   [
    "Task Manager",
    "Real-time view of processes, performance, startup apps, services and users, opened with Ctrl+Shift+Esc."
   ],
   [
    "Microsoft Management Console (MMC)",
    "A framework that hosts administrative snap-ins such as Event Viewer and Device Manager."
   ],
   [
    "Event Viewer",
    "The snap-in that displays Application, Security and System logs for troubleshooting past events."
   ],
   [
    "Performance Monitor",
    "A tool that logs performance counters over time to build baselines and find trends."
   ],
   [
    "Resource Monitor",
    "A detailed view of which processes are using specific files, disk, network and memory resources."
   ],
   [
    "System Configuration (msconfig)",
    "A tool for changing boot options such as Safe Mode and disabling services for clean-boot troubleshooting."
   ],
   [
    "Registry",
    "The hierarchical database of Windows and application settings, edited with regedit."
   ]
  ],
  "example": "A user cannot delete a spreadsheet because Windows says it is open in another program, yet nothing is visible on screen. The technician opens Resource Monitor, searches the CPU tab's associated handles for the file name, finds a hung background process holding it, ends that process and deletes the file.",
  "tip": "Task Manager shows real-time use while Performance Monitor records data over time. lusrmgr.msc and gpedit.msc are not available on Windows Home, and Event Viewer is the tool for what already happened.",
  "check": [
   [
    "Which tool would you use to see errors logged overnight?",
    "Event Viewer, which records Application, Security and System events with timestamps."
   ],
   [
    "You need to track memory usage over a full week. Which tool fits?",
    "Performance Monitor, because it can log counters over time with a data collector set."
   ],
   [
    "Which tool lets you configure the next restart to boot into Safe Mode?",
    "System Configuration (msconfig), on its Boot tab."
   ],
   [
    "What should you do before changing a registry key?",
    "Export or back up the key so you can restore it if the change causes problems."
   ]
  ]
 },
 {
  "t": "Command-line tools: cd, dir, md, rmdir, robocopy, xcopy, diskpart, format, chkdsk, sfc, DISM, gpupdate, gpresult, net use, net user, whoami, winver, shutdown, ipconfig, ping, tracert, pathping, nslookup, netstat, hostname",
  "body": [
   "The Windows command line (Command Prompt, `cmd`, or PowerShell, which runs most of the same commands) is faster than the graphical interface for many tasks and is essential for scripting and remote work. Some commands need an elevated prompt: right-click Command Prompt or Terminal and choose 'Run as administrator'. Add `/?` to any command to see its help, for example `robocopy /?`. The exam lists these commands and expects you to know what each does and which switch performs a common task. Start with file and folder navigation: `cd` changes directory (`cd ..` goes up one level, `cd \\` goes to the root of the drive). `dir` lists a folder's contents (`dir /a` includes hidden and system files). `md` (or `mkdir`) makes a directory and `rmdir` (or `rd`) removes one; `rmdir /s` removes it with all its contents. `xcopy` copies files and directory trees (`/s` for subfolders, `/e` including empty ones). `robocopy` (Robust File Copy) is the more powerful replacement: it can resume after interruptions, retry, preserve permissions and timestamps, and mirror folders with `/mir`, which makes it the choice for migrations and large backups. Be careful with `/mir`, because it also deletes files at the destination that no longer exist at the source.",
   "Disk tools: `diskpart` is an interactive partitioning tool; you `list disk`, `select disk 1`, then `clean`, `create partition primary`, `format` and so on. It acts immediately with no undo, so confirm the disk number twice. `format` prepares a volume with a file system, for example `format E: /fs:NTFS`. `chkdsk` checks a volume for file system errors; `chkdsk /f` fixes them and `chkdsk /r` also locates bad sectors and recovers readable data. System repair tools: `sfc /scannow` (System File Checker) scans protected Windows files and replaces corrupted ones from a local cache. `DISM` (Deployment Image Servicing and Management) repairs that underlying Windows image, commonly with `DISM /Online /Cleanup-Image /RestoreHealth`; run it when sfc cannot fix files, then run sfc again.",
   "Policy and accounts: `gpupdate` refreshes Group Policy (`gpupdate /force` reapplies all policies, not just changed ones). `gpresult /r` shows which policies were applied to the current user and computer. `net use` maps or disconnects network drives, as in `net use S: \\\\server\\share`. `net user` lists, creates or changes local accounts, for example `net user alice /add`, or `net user alice /domain` to query a domain account. `whoami` shows the signed-in account (`whoami /groups` shows memberships). `winver` opens a window with the Windows version and build. `shutdown /s /t 0` shuts down now, `/r` restarts and `/a` aborts a pending shutdown.",
   "Networking: `ipconfig` shows IP settings; `/all` adds the MAC address, DHCP and DNS servers, `/release` and `/renew` get a new DHCP lease, and `/flushdns` clears the DNS (Domain Name System) cache. `ping` tests reachability with ICMP (Internet Control Message Protocol) echo requests. `tracert` lists each router hop to a destination. `pathping` combines both, measuring packet loss at each hop over a period. `nslookup` queries DNS to check name resolution. `netstat` lists connections and listening ports (`-a` all, `-n` numeric, `-b` owning program, which needs elevation). `hostname` prints the computer's name.",
   "```\nipconfig /all\nping 8.8.8.8\nnslookup intranet.example.com\nsfc /scannow\nrobocopy C:\\Data D:\\Backup /mir\n```",
   "Consider a worked example. A user cannot reach the intranet by name. You run `ipconfig /all` and see a valid address and DNS server. `ping` to the intranet server's IP address succeeds, but `nslookup intranet.example.com` fails, so the network path is fine and the problem is name resolution. After the DNS team fixes the record, you run `ipconfig /flushdns` so the PC stops using its cached failure.",
   "Common mistakes: running `sfc` or `DISM` from a non-elevated prompt; confusing `gpupdate` (apply) with `gpresult` (report); expecting `tracert` to show loss statistics, which is `pathping`'s job; using `format` when the disk needs partitioning in `diskpart` first; and forgetting that `rmdir /s` and `diskpart clean` have no Recycle Bin.",
   "Exam questions pair a task with a command. 'Copy a folder and resume after network drops, keeping permissions' is `robocopy`. 'Corrupted system files' is `sfc /scannow`, and 'sfc could not repair them' is DISM. 'Policy changes have not applied yet' is `gpupdate /force`; 'which policies applied?' is `gpresult`. 'Map a drive letter to a share' is `net use`. 'Which account am I using?' is `whoami`. 'Find where packets are being lost along the path' is `pathping`. 'Which ports is this PC listening on?' is `netstat`."
  ],
  "terms": [
   [
    "robocopy",
    "Robust File Copy, a resilient copy tool that retries, resumes, preserves permissions and can mirror folders."
   ],
   [
    "diskpart",
    "An interactive command-line tool for managing disks, partitions and volumes with no undo."
   ],
   [
    "chkdsk",
    "Checks a volume for file system errors; /f fixes errors and /r also finds bad sectors."
   ],
   [
    "sfc",
    "System File Checker, which scans and repairs protected Windows system files."
   ],
   [
    "DISM",
    "Deployment Image Servicing and Management, which repairs the Windows component store that sfc relies on."
   ],
   [
    "gpupdate and gpresult",
    "gpupdate applies Group Policy now; gpresult reports which policies were applied."
   ],
   [
    "nslookup",
    "A tool that queries DNS servers to test name resolution."
   ],
   [
    "pathping",
    "Combines ping and tracert to measure latency and packet loss at each hop over time."
   ]
  ],
  "example": "After a failed update, Windows shows odd errors and `sfc /scannow` reports it found corrupt files it could not repair. The technician runs `DISM /Online /Cleanup-Image /RestoreHealth` from an elevated prompt to repair the component store, restarts, then runs `sfc /scannow` again, which now repairs the remaining files successfully.",
  "tip": "Know the pairs: sfc repairs system files and DISM repairs the image sfc uses; gpupdate applies policy and gpresult reports it; tracert shows the path and pathping adds per-hop loss statistics.",
  "check": [
   [
    "sfc /scannow reports corrupt files it cannot fix. What should you run next?",
    "DISM /Online /Cleanup-Image /RestoreHealth to repair the image, then run sfc /scannow again."
   ],
   [
    "Which command shows the MAC address and DNS servers of each adapter?",
    "ipconfig /all."
   ],
   [
    "How do you force all Group Policy settings to reapply immediately?",
    "Run gpupdate /force."
   ],
   [
    "Which command copies a large folder tree with retries and can mirror the source to the destination?",
    "robocopy, for example with the /mir switch."
   ]
  ]
 },
 {
  "t": "Settings and Control Panel: Accounts, Privacy, Update and Security, Apps, Power Options (sleep, hibernate, fast startup), Display, Devices",
  "body": [
   "Windows has two configuration interfaces. The modern Settings app (Windows key + I) is where Microsoft adds new options, and the classic Control Panel (`control`) still hosts many older applets. Over time more features move from Control Panel into Settings, so you should be comfortable finding a setting in either place. The exam names the categories, so learn what lives in each and which symptom sends you there.",
   "Accounts is where users manage their sign-in: switching between a local account and a Microsoft account, sign-in options such as a PIN, Windows Hello face or fingerprint and security keys, adding family members or other users, and connecting a work or school account. The Control Panel equivalent is User Accounts, which also lets you change an account type between Standard and Administrator and manage stored credentials through Credential Manager.",
   "Privacy (called Privacy and security in Windows 11) controls what apps can access: location, camera, microphone, contacts, diagnostic data and advertising ID. If a video-call app cannot see the webcam even though the driver is fine, check the camera permission here. Update and Security in Windows 10 (split in Windows 11 into Windows Update and Privacy and security, with some items under System) covers Windows Update, including pausing updates, active hours and optional driver updates, as well as Windows Security, backup, troubleshooters, recovery options such as Reset this PC and Advanced startup, and activation.",
   "Apps lists installed programs so you can uninstall, modify or repair them, set default apps (which browser opens web links, which app opens .pdf files), manage startup apps and add optional features. The Control Panel equivalent is Programs and Features, which also has 'Turn Windows features on or off' for items such as Hyper-V or the Telnet client. Display handles resolution, scaling, orientation, refresh rate, multiple monitors (duplicate or extend) and night light. Devices (Bluetooth and devices in Windows 11) covers pairing Bluetooth accessories, printers and scanners, mouse and touchpad settings, AutoPlay and USB. Other Control Panel items include Internet Options (proxy and browser security zones), Sound, Mail, Network and Sharing Center, Windows Defender Firewall, File Explorer Options (show hidden files and file extensions) and Indexing Options.",
   "Power Options control how the computer saves energy, and the exam tests the differences carefully. Sleep keeps the session in RAM using a trickle of power, so it resumes in seconds, but a laptop battery slowly drains and a desktop loses unsaved work if power fails. Hibernate writes the contents of RAM to a file on disk (`hiberfil.sys`) and powers off completely; it resumes more slowly than sleep but uses no power and survives a dead battery. Fast startup is a hybrid: when you choose Shut down, Windows signs you out and then hibernates just the kernel session, so the next boot is quicker. Because the kernel is not fully restarted, some driver or update problems are cleared only by choosing Restart, which bypasses fast startup. You can also configure what the power button and lid do, and choose or customize power plans.",
   "Consider a worked example. A traveller complains that her laptop is always dead when she opens it after a long flight, even though she closed the lid at full charge. The lid is set to sleep, and sleep keeps drawing power to hold RAM. You open Power Options, set closing the lid on battery to hibernate, and explain that resume will take a little longer but the battery and her open documents will survive. Later that week, a desktop driver update 'does not take effect' after she shuts down each night; you explain fast startup and have her choose Restart.",
   "Common mistakes: expecting Shut down to fully reset the kernel when fast startup is on; confusing sleep (RAM, low power) with hibernate (disk, no power); troubleshooting a webcam driver when the Privacy camera toggle is blocking the app; looking only in Control Panel for settings that have moved to Settings; and changing a user's account type to Administrator to fix a permission problem that least privilege says should be solved another way.",
   "Exam wording maps to categories. 'App cannot use the microphone' is Privacy. 'Pause updates or set active hours' is Windows Update. 'Change which program opens a file type' is Apps and default apps. 'Laptop battery drains while closed' or 'resume with no power used' is hibernate in Power Options. 'Shut down does not clear a problem but Restart does' is fast startup. 'Second monitor shows the same image instead of extending the desktop' is Display. 'Pair a Bluetooth headset' is Devices."
  ],
  "terms": [
   [
    "Settings app",
    "The modern Windows configuration interface, opened with Windows key + I."
   ],
   [
    "Control Panel",
    "The classic Windows configuration interface containing applets such as Programs and Features and Power Options."
   ],
   [
    "Sleep",
    "A low-power state that keeps the session in RAM for very fast resume but still uses power."
   ],
   [
    "Hibernate",
    "Saves RAM contents to hiberfil.sys on disk and powers off fully, resuming more slowly with no power used."
   ],
   [
    "Fast startup",
    "A shutdown mode that hibernates the kernel session to speed the next boot; Restart bypasses it."
   ],
   [
    "Default apps",
    "Settings that decide which application opens each file type or link type."
   ],
   [
    "Active hours",
    "The period when Windows Update avoids automatically restarting the device."
   ]
  ],
  "example": "A user's new video-conferencing app shows a black screen instead of her webcam, but the camera works in the built-in Camera app. The technician opens Settings, Privacy and security, Camera, and finds that desktop apps are not allowed to use the camera. After turning that permission on, the conferencing app shows her video.",
  "tip": "If a driver fix or update does not seem to take effect after Shut down, remember fast startup: choose Restart instead. Sleep keeps data in RAM and uses power; hibernate saves to disk and uses none.",
  "check": [
   [
    "Which power state saves the session to disk and uses no power while off?",
    "Hibernate, which writes memory to hiberfil.sys and powers down completely."
   ],
   [
    "Why might Restart fix a problem that Shut down does not?",
    "With fast startup, Shut down hibernates the kernel session, while Restart performs a full kernel reload."
   ],
   [
    "An app cannot access the microphone although the device works elsewhere. Where do you check?",
    "The Privacy (Privacy and security) microphone permissions in Settings."
   ],
   [
    "Where do you change which program opens .pdf files?",
    "In Settings under Apps, Default apps."
   ]
  ]
 },
 {
  "t": "Windows networking: workgroup vs domain, mapped drives and shares, firewall exceptions, static vs DHCP addressing, VPN and proxy settings, public vs private network profiles, metered connections",
  "body": [
   "Windows networking questions ask how computers are organized, how users reach shared files, and why one PC cannot connect when others can. The concepts are simple once you see what each setting controls. Windows computers can be organized in two ways. In a workgroup, every computer is a peer that keeps its own local user accounts, so a user needs an account on each machine they want to access. Workgroups suit small offices with a handful of computers and no server. In a domain, a server running Active Directory Domain Services (a domain controller) holds a central database of users, computers and policies. Users sign in once with a domain account from any joined computer, and administrators apply Group Policy to everyone. Joining a domain needs Windows Pro or higher. HomeGroup was an older home-sharing feature and is no longer present in current Windows.",
   "To share a folder, open its Properties, use the Sharing tab (Advanced Sharing) to set a share name and share permissions, and remember that NTFS permissions on the Security tab also apply. Users reach the share through a UNC (Universal Naming Convention) path such as `\\\\fileserver\\sales`. Mapping a drive assigns a letter to that path so it looks like a local drive: in File Explorer choose 'Map network drive' and tick 'Reconnect at sign-in' to make it persistent, or use `net use S: \\\\fileserver\\sales /persistent:yes`. A share name ending in `$` is hidden from browsing, and Windows creates administrative shares such as `C$` and `ADMIN$` for administrators.",
   "Windows Defender Firewall blocks unsolicited inbound traffic by default. When an application or service must accept connections, you create an exception: allow an app through the firewall in the basic interface, or create an inbound rule for a specific program, port and protocol in Windows Defender Firewall with Advanced Security (`wf.msc`). Rules can apply to specific network profiles. Each connection is given a profile. Public is for untrusted places like coffee shops; it turns off network discovery and file sharing and applies stricter rules. Private is for trusted home or small-office networks; it lets the computer be discovered and share files and printers. Domain is applied automatically when the computer can reach its domain controller.",
   "IP addressing can be dynamic or static. With DHCP (Dynamic Host Configuration Protocol), the computer receives its IP address, subnet mask, default gateway and DNS servers automatically, which is right for most clients. A static address is typed in by hand under the adapter's IPv4 properties and suits servers, printers and network devices that must never change address. If a DHCP client shows an address starting with 169.254, it is an APIPA (Automatic Private IP Addressing) address, meaning no DHCP server answered. You can also set an alternate configuration used when DHCP is unavailable, which helps laptops that move between an office and a site with fixed addressing.",
   "A VPN (virtual private network) creates an encrypted tunnel across an untrusted network to a remote network; add one under Settings, Network and internet, VPN, or install the vendor's client. A proxy server forwards web requests on the user's behalf for filtering, logging or caching; configure it under Network and internet, Proxy, either automatically with a setup script or manually with an address and port. A wrong proxy setting is a common reason why one PC cannot browse while others can. Finally, a metered connection tells Windows that data costs money, as on a mobile hotspot, so it limits background downloads such as some updates and sync.",
   "Consider a worked example. A new employee's laptop can reach websites but cannot see the office printer or the file server's shares, and colleagues cannot see it either. `ipconfig` shows a normal address from the office DHCP scope, so addressing is fine. In Settings you find the office Wi-Fi was marked Public when she first joined, which disables network discovery and file sharing. You change the profile to Private, since the office is a trusted network without a domain, and the printer and shares appear. You then map the sales share to `S:` with reconnect at sign-in.",
   "Common mistakes: treating a 169.254 address as a working network; giving a printer a DHCP address and then losing it when the lease changes; marking a café network Private; opening a firewall port for all profiles when only the domain profile needs it; confusing a VPN (encrypted tunnel to a network) with a proxy (a relay for web requests); and forgetting that share permissions and NTFS permissions both apply over the network, with the more restrictive winning.",
   "Exam questions use clear clue words. 'Central accounts and policies' means domain; 'each PC has its own accounts' means workgroup. 'Address starts with 169.254' means DHCP failed. 'Printer must always keep the same address' means static IP. 'Cannot see other computers on a trusted network' means the profile is Public. 'Only this PC cannot browse; others can' suggests a bad proxy setting. 'Avoid large downloads on a phone hotspot' means metered connection. 'Access company resources securely from home' means VPN."
  ],
  "terms": [
   [
    "Workgroup",
    "A peer-to-peer arrangement where each Windows computer keeps its own local accounts."
   ],
   [
    "Domain",
    "A centrally managed network where a domain controller provides accounts, authentication and Group Policy."
   ],
   [
    "UNC path",
    "A network path in the form \\\\server\\share used to reach shared resources."
   ],
   [
    "Mapped drive",
    "A drive letter assigned to a network share so it appears like a local drive."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing, which assigns a 169.254.x.x address when no DHCP server responds."
   ],
   [
    "Network profile",
    "The Public, Private or Domain category that sets discovery, sharing and firewall behaviour for a connection."
   ],
   [
    "Proxy server",
    "A server that forwards web requests on a client's behalf for filtering, logging or caching."
   ],
   [
    "Metered connection",
    "A setting that tells Windows data is limited or costly so it reduces background downloads."
   ]
  ],
  "example": "A remote accountant can browse the web at home but cannot open the finance share. She has not connected the company VPN, so her laptop has no route to the internal server. Once the VPN connects, `\\\\fileserver\\finance` opens and her mapped drive reconnects, because the traffic now travels through the encrypted tunnel into the office network.",
  "tip": "A 169.254.x.x address means DHCP failed, not that the network is fine. The Public profile blocks discovery and sharing; Private allows it on trusted networks.",
  "check": [
   [
    "A PC shows the address 169.254.12.7. What does that tell you?",
    "It is an APIPA address, so the PC could not reach a DHCP server."
   ],
   [
    "Why might a laptop on a trusted office network not see shared printers?",
    "The network may be set to the Public profile, which turns off network discovery and file sharing."
   ],
   [
    "Which command maps drive S: to a share persistently?",
    "net use S: \\\\server\\share /persistent:yes."
   ],
   [
    "What is the main difference between a workgroup and a domain?",
    "A workgroup has separate local accounts on each PC, while a domain uses central accounts and policies on a domain controller."
   ]
  ]
 },
 {
  "t": "MacOS: installing and removing apps (.dmg, .pkg, .app, App Store), System Settings, Time Machine, FileVault, Keychain, Spotlight, Mission Control, Terminal, Disk Utility, Force Quit",
  "body": [
   "Support technicians increasingly meet Macs, and the exam checks that you can do everyday tasks on them and map them to what you already know from Windows. Start with software. The simplest source is the App Store, which installs, updates and removes vetted apps tied to the user's Apple ID. Outside the store, apps usually arrive as a .dmg (disk image) file: double-click it to mount it like a virtual drive, drag the .app into the Applications folder, then eject the image. A .app is actually a folder-like bundle containing the program and its resources. A .pkg is an installer package that runs a step-by-step wizard and can place files in several system locations; it is used when an app needs drivers, background services or components beyond a single bundle.",
   "Removing apps is usually easy: drag the .app from Applications to the Trash, or in Launchpad hold an App Store app until it jiggles and click the delete button. Apps installed from a .pkg may leave components behind, so check whether the vendor provides an uninstaller. Gatekeeper, a built-in macOS protection, checks that downloaded apps are signed and notarized by identified developers and warns before opening anything else. If a user sees a warning that an app cannot be opened, that is Gatekeeper doing its job, and the safe response is to confirm the app's source rather than simply bypass the warning.",
   "System Settings (named System Preferences before macOS Ventura) is the Mac's control panel: users and groups, network, displays, privacy and security, printers, software updates and so on. Time Machine is the built-in backup tool; point it at an external drive or a supported network destination and it keeps hourly, daily and weekly backups, letting you restore single files or the whole Mac. FileVault is full-disk encryption; turn it on in Privacy and Security, and store the recovery key safely, because without it or an authorized user's password the data cannot be recovered.",
   "Keychain is the macOS password manager. Keychain Access stores website and Wi-Fi passwords, certificates and secure notes, and iCloud Keychain syncs passwords across the user's Apple devices. Repeated password prompts after a password change are often a keychain issue. Spotlight (Command + Space) searches files, apps, settings and more, and is the quickest way to launch anything. Mission Control shows all open windows and virtual desktops (Spaces) so you can switch between them; you open it with a trackpad swipe or its keyboard key. Other items worth knowing include the Dock, Finder, iCloud, trackpad gestures, and Remote Disc for sharing another computer's optical drive.",
   "Terminal gives a Unix command-line shell (zsh by default in current versions), where Linux-style commands such as `ls`, `cd`, `sudo` and `ps` work. Disk Utility manages drives: erase and format with APFS, Mac OS Extended, exFAT or FAT, partition, create disk images, and run First Aid to check and repair a volume. Force Quit ends a frozen app; press Command + Option + Esc, or choose it from the Apple menu. Activity Monitor is the Mac's equivalent of Task Manager, showing CPU, memory, energy, disk and network use per process. A useful mapping: Activity Monitor is Task Manager, Force Quit is End task, FileVault is BitLocker, Time Machine is File History or Windows backup, Disk Utility is Disk Management plus chkdsk, and Spotlight is Windows search.",
   "Consider a worked example. A designer's Mac freezes in one app and she has an important deadline. You press Command + Option + Esc, select the frozen app and choose Force Quit, which returns control without restarting. She then mentions that her external drive shows errors, so you open Disk Utility, select the volume and run First Aid. Finally you notice she has no backups, so you connect a spare external drive, enable Time Machine and confirm FileVault is on with the recovery key stored in the company's records.",
   "Common mistakes: running the app directly from the mounted .dmg instead of copying it to Applications, so it disappears when the image is ejected; expecting dragging an app to the Trash to remove every component a .pkg installed; turning on FileVault without saving the recovery key; confusing Keychain (passwords) with FileVault (disk encryption); and looking for Task Manager instead of Activity Monitor. Another trap is treating Time Machine as optional: it is the simplest way to protect a Mac user's files.",
   "Exam questions typically describe a Mac task in plain words. 'Drag the application into the Applications folder' describes installing from a .dmg. 'An installer wizard that places files in system locations' is a .pkg. 'Encrypt the entire disk' is FileVault. 'Restore last Tuesday's version of a file' is Time Machine. 'Saved passwords and certificates' is Keychain. 'Find and launch anything quickly' is Spotlight. 'See all open windows and desktops' is Mission Control. 'Repair a volume' is Disk Utility First Aid. 'App is unresponsive' is Force Quit."
  ],
  "terms": [
   [
    ".dmg",
    "A macOS disk image file that mounts like a drive and usually contains an app to drag into Applications."
   ],
   [
    ".pkg",
    "A macOS installer package that runs a wizard and can install components in several system locations."
   ],
   [
    "Time Machine",
    "The built-in macOS backup tool that keeps hourly, daily and weekly versions on an external or network drive."
   ],
   [
    "FileVault",
    "macOS full-disk encryption, protected by the user's password and a recovery key."
   ],
   [
    "Keychain",
    "The macOS password manager that stores passwords, certificates and secure notes."
   ],
   [
    "Spotlight",
    "The macOS system-wide search, opened with Command + Space."
   ],
   [
    "Disk Utility",
    "The macOS tool for erasing, formatting, partitioning and repairing drives with First Aid."
   ],
   [
    "Force Quit",
    "Ends an unresponsive macOS app, opened with Command + Option + Esc."
   ]
  ],
  "example": "After changing her network password, a Mac user keeps getting prompts to unlock the login keychain and to re-enter her Wi-Fi password. The technician explains that the keychain still uses her old password, opens Keychain Access and updates the keychain password so the stored credentials match and the prompts stop.",
  "tip": "Map Mac tools to Windows equivalents: Activity Monitor is Task Manager, Force Quit is End task, FileVault is BitLocker, Time Machine is backup, Disk Utility is Disk Management plus chkdsk, Spotlight is search.",
  "check": [
   [
    "How do you install a typical app delivered as a .dmg?",
    "Open the .dmg to mount it, drag the .app into the Applications folder, then eject the image."
   ],
   [
    "Which macOS feature provides full-disk encryption?",
    "FileVault, enabled in Privacy and Security, with the recovery key stored safely."
   ],
   [
    "What key combination opens the Force Quit window?",
    "Command + Option + Esc."
   ],
   [
    "A user needs yesterday's version of a document on a Mac. Which tool restores it?",
    "Time Machine, which keeps versioned backups on an external or network destination."
   ]
  ]
 },
 {
  "t": "Linux: file and permission commands (ls, cp, mv, rm, chmod, chown, sudo, su), package managers (apt, dnf), ip, df, top, ps, grep, find, man, key files (/etc/passwd, /etc/shadow, /etc/hosts, /etc/fstab, /etc/resolv.conf)",
  "body": [
   "Linux is managed mostly from a shell such as bash. Commands are case-sensitive, paths use forward slashes and there are no drive letters: everything hangs off the root directory `/`, and other disks are mounted into that tree. When in doubt, read the manual page with `man`, as in `man chmod`, and press q to quit. The A+ exam expects you to recognize the core commands, read a permission string and know which configuration file does what.",
   "Working with files: `ls` lists a directory (`ls -l` shows permissions, owner, size and date; `ls -a` includes hidden dotfiles). `cp` copies (`cp -r` for directories), `mv` moves or renames, and `rm` deletes (`rm -r` deletes a directory tree). There is no Recycle Bin at the shell, so `rm` is permanent. `pwd` prints the current directory and `cd` changes it. `grep` searches text for a pattern, as in `grep error /var/log/syslog`, and is often combined with pipes: `ps aux | grep ssh`. `find` searches the file system by name, size or date, for example `find /home -name '*.pdf'`.",
   "Permissions are shown by `ls -l` as a string such as `-rwxr-x---`: the first character is the type (`-` for a file, `d` for a directory), then three sets of read (r), write (w) and execute (x) for the owner (user), the group and others. `chmod` changes them, either symbolically (`chmod g+w file`) or in octal, where r=4, w=2 and x=1 are added together, so `chmod 750 script.sh` gives the owner rwx (7), the group r-x (5) and others nothing (0). `chown` changes ownership, for example `chown alice:staff report.txt`. Running as the root superuser for daily work is risky, so administrators use `sudo` to run a single command with elevated rights (it asks for the user's own password, checks that the user is allowed and logs the action) and `su` to switch to another user, by default root, which requires that account's password.",
   "Software is installed with a package manager, which downloads from trusted repositories, verifies packages and resolves dependencies. Debian and Ubuntu use `apt`: `sudo apt update` refreshes the package list, then `sudo apt upgrade` or `sudo apt install nginx`. Red Hat, Fedora and related distributions use `dnf` (the successor to yum): `sudo dnf install nginx`, `sudo dnf upgrade`. System and network information: `ip addr` (or `ip a`) shows interfaces and addresses, and `ip route` shows the routing table; it replaces the older `ifconfig`. `df -h` shows free space per mounted file system in human-readable units. `top` is a live, updating view of processes and CPU and memory use, and `ps aux` gives a snapshot list of all processes. Finally, know these configuration files. `/etc/passwd` lists user accounts (name, user ID, home directory and login shell) and is readable by everyone; despite its name it no longer holds passwords. `/etc/shadow` stores the hashed passwords and password-aging data and is readable only by root. `/etc/hosts` maps hostnames to IP addresses locally and is normally checked before DNS. `/etc/fstab` lists file systems to mount at boot and where. `/etc/resolv.conf` lists the DNS servers the system uses.",
   "```\nls -l /var/www\nsudo chmod 644 index.html\nsudo chown www-data:www-data index.html\nsudo apt update && sudo apt install htop\ndf -h\n```",
   "Consider a worked example. A web page on an Ubuntu server returns 'permission denied'. You run `ls -l` and see the file is `-rw-------` owned by root, so the web server account cannot read it. You run `sudo chown www-data:www-data index.html` and `sudo chmod 644 index.html`, giving the owner read and write and everyone else read only. The page loads.",
   "Common mistakes: using `chmod 777` to 'fix' access, which lets anyone modify the file; confusing `su` (switch user, needs the target's password) with `sudo` (one command, your own password); expecting `apt` on a Red Hat system; thinking `/etc/passwd` holds password hashes; and running `rm -r` without checking the path.",
   "Exam questions test recognition. 'Show free disk space' is `df`. 'Live view of processes' is `top`; 'snapshot of processes' is `ps`. 'Search inside files for text' is `grep`; 'locate files by name' is `find`. 'Change permissions' is `chmod`; 'change owner' is `chown`. 'Install software on Ubuntu' is `apt`; 'on Fedora or Red Hat' is `dnf`. 'Where are password hashes?' is `/etc/shadow`. 'Which DNS servers?' is `/etc/resolv.conf`. 'Mount a drive at every boot' is `/etc/fstab`. Octal digits decode as 7 rwx, 6 rw-, 5 r-x and 4 r--."
  ],
  "terms": [
   [
    "chmod",
    "Changes file permissions using symbolic notation or octal numbers such as 750."
   ],
   [
    "chown",
    "Changes the owner and group of a file or directory."
   ],
   [
    "sudo",
    "Runs a single command with elevated privileges using the user's own password, with logging."
   ],
   [
    "su",
    "Switches to another user account, root by default, using that account's password."
   ],
   [
    "Package manager",
    "A tool such as apt or dnf that installs and updates software from repositories and resolves dependencies."
   ],
   [
    "/etc/shadow",
    "The root-only file that stores hashed passwords and password-aging information."
   ],
   [
    "/etc/fstab",
    "The file listing file systems to mount automatically at boot."
   ],
   [
    "/etc/resolv.conf",
    "The file listing the DNS servers a Linux system uses."
   ]
  ],
  "example": "A Linux workstation cannot resolve internal names, while other machines can. The technician runs `ip addr` to confirm an address, pings the gateway successfully, then checks `/etc/resolv.conf` and finds it points to a retired DNS server. After correcting the network configuration so the right DNS server is used, name resolution works.",
  "tip": "Octal permissions come up often: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--. Also remember that /etc/passwd holds accounts but /etc/shadow holds the password hashes.",
  "check": [
   [
    "What permissions does chmod 640 give?",
    "Owner read and write, group read, others no access."
   ],
   [
    "Which command installs a package on Ubuntu?",
    "sudo apt install followed by the package name, usually after sudo apt update."
   ],
   [
    "Which file stores hashed user passwords on Linux?",
    "/etc/shadow, which only root can read."
   ],
   [
    "What is the difference between sudo and su?",
    "sudo runs one command with elevated rights using your own password; su switches to another account, root by default, using that account's password."
   ]
  ]
 },
 {
  "t": "Installing applications: 32- vs 64-bit, RAM/CPU/GPU/storage requirements, distribution methods (ISO, download, image) and business impact",
  "body": [
   "Installing software looks simple, but a technician's job is to make sure it will actually run, fits the hardware, is licensed and does not disrupt the business. Before you click Install, you check compatibility and requirements, choose a trustworthy distribution method and think about who else the change will affect. The exam presents a failed or risky installation and asks what should have been checked.",
   "Start with architecture. A 32-bit (x86) application can address a limited amount of memory, about 4 GB, while a 64-bit (x64) application can use far more. A 64-bit Windows OS runs both 64-bit apps and most 32-bit apps, using a compatibility layer and keeping 32-bit programs in the `C:\\Program Files (x86)` folder, while 64-bit programs go in `C:\\Program Files`. A 32-bit OS cannot run 64-bit applications at all, and 64-bit drivers are required on a 64-bit OS. Windows 11 is available only in 64-bit versions. ARM-based devices use a different instruction set, so check that the software offers an ARM version or is supported under emulation.",
   "Next, compare the published system requirements with the machine. RAM (random access memory): an app that needs more memory than is free will page to disk and become sluggish. CPU: check the required speed, number of cores and any required instruction features. GPU (graphics processing unit): graphics-heavy software such as CAD, video editing or games may need a dedicated graphics card, a minimum amount of video RAM (VRAM) or support for a particular graphics API. Storage: check free space for the installation and its data, and whether the app expects an SSD for acceptable performance. Also check the supported OS versions, any required frameworks or runtimes, external hardware tokens or peripherals, and whether the user needs administrator rights to install.",
   "Software can be distributed in several ways. Downloads from the vendor's website or an app store are common for individual installs; always use trusted sources and verify the file's hash when the vendor publishes one. An ISO file is a disc image that you mount (double-click in Windows) or burn, often used for large suites and OS media. In organizations, applications are frequently built into a standard OS image or pushed by management tools, so hundreds of machines get the same tested version without technicians visiting each desk. Physical media such as USB drives are still used in some environments, especially where networks are isolated.",
   "Finally, consider business impact, which the exam divides into device, network, operation and business. On the device, a new installation can hurt performance or stability, conflict with existing software or change file associations. On the network, large downloads or updates can consume bandwidth, and new software may open ports. For operations, an install may need a reboot during working hours or cause downtime for a line-of-business system. For the business, every user needs a valid licence, support must be arranged, and unapproved software can break compliance. That is why organizations test software first, schedule deployments, follow change management and document which version is installed where.",
   "Consider a worked example. An engineering firm wants to roll out a new 3D modelling package to twenty workstations. You check the requirements and find it needs a 64-bit OS, a dedicated GPU with a stated minimum of VRAM and more RAM than five of the older machines have. Those five get upgrades or replacements first. The vendor supplies an ISO, so you test the install on one machine, package it for the management tool, schedule the push for after hours to avoid saturating the office connection, and confirm there are twenty licences before anyone launches it.",
   "Common mistakes: assuming a 64-bit installer will work on a 32-bit OS; checking only CPU speed and ignoring GPU or VRAM requirements; downloading installers from unofficial mirrors; installing during business hours without warning when a reboot is required; and forgetting licensing, which is a business impact even if the software runs perfectly. Another trap is thinking an app needs a 64-bit OS just because the computer has a 64-bit processor; the OS installed is what matters.",
   "Exam questions give clues. 'Installer will not run on an older PC' suggests a 32-bit OS with a 64-bit app. 'App is extremely slow and the disk is constantly busy' suggests insufficient RAM. 'Video editing software displays errors or will not start' points to GPU or VRAM requirements. 'Deploy the same version to hundreds of machines' points to an image or management tool. 'Verify the download has not been tampered with' means compare its hash. 'Consider licences, downtime and bandwidth' is business impact."
  ],
  "terms": [
   [
    "32-bit (x86)",
    "An architecture whose applications can address about 4 GB of memory; runs on 32-bit and most 64-bit systems."
   ],
   [
    "64-bit (x64)",
    "An architecture that can address far more memory and requires a 64-bit operating system."
   ],
   [
    "System requirements",
    "The vendor's minimum and recommended OS, CPU, RAM, GPU and storage needed to run software."
   ],
   [
    "VRAM",
    "Video RAM on a graphics card, required in minimum amounts by graphics-heavy applications."
   ],
   [
    "ISO file",
    "A disc image used to distribute large software suites or operating systems."
   ],
   [
    "Hash verification",
    "Comparing a downloaded file's hash with the vendor's published value to confirm it is unaltered."
   ],
   [
    "Business impact",
    "The effect of an installation on devices, the network, operations and licensing or compliance."
   ]
  ],
  "example": "A charity volunteer downloads a donor-management program onto an old office PC, and the installer immediately fails. The technician checks System Information and finds a 32-bit edition of Windows, while the program is 64-bit only. Because the hardware supports 64-bit, they plan a clean 64-bit OS installation after backing up data, then install the program successfully.",
  "tip": "A 64-bit OS runs 32-bit apps, but a 32-bit OS cannot run 64-bit apps. If an installer refuses to run on an older machine, check whether the OS is 32-bit before blaming the software.",
  "check": [
   [
    "Where does 64-bit Windows install 32-bit programs?",
    "In C:\\Program Files (x86), while 64-bit programs go in C:\\Program Files."
   ],
   [
    "A graphics program starts but renders very poorly on a laptop with integrated graphics. What requirement was likely missed?",
    "The GPU or VRAM requirement, which may call for a dedicated graphics card."
   ],
   [
    "Why should you verify a downloaded installer's hash?",
    "To confirm the file matches what the vendor published and was not corrupted or tampered with."
   ],
   [
    "Name two business impacts to consider before a large deployment.",
    "Examples include licensing for every user, reboots or downtime, network bandwidth use and compatibility with existing software."
   ]
  ]
 },
 {
  "t": "Cloud productivity tools: email, synced storage, collaboration suites, account setup and licensing",
  "body": [
   "Most organizations now run their everyday productivity software as cloud services, such as Microsoft 365 or Google Workspace. Instead of installing a mail server and file server on site, the company subscribes to hosted email, file storage, calendars and collaboration apps, and the provider runs the servers. As a support technician, you will set up accounts, connect devices, fix sync problems, manage sharing and assign licences. The exam focuses on how these services behave and what commonly goes wrong.",
   "Email is usually the first service a user needs. A cloud mailbox is reached through a web browser, a desktop client such as Outlook, or a mobile mail app. Modern cloud email uses the provider's own protocols or Exchange-style synchronization, which keep mail, calendar and contacts in step across devices. Some clients use IMAP (Internet Message Access Protocol), which leaves mail on the server and syncs folders, for receiving, and SMTP (Simple Mail Transfer Protocol) for sending. The older POP3 (Post Office Protocol version 3) downloads mail to one device and is rarely appropriate for business because other devices will not see those messages. Most accounts now require modern authentication with multifactor sign-in.",
   "Synced storage services, such as OneDrive, Google Drive, Dropbox and iCloud Drive, keep a copy of files in the cloud and synchronize them to each signed-in device. Files-on-demand features show every file but download content only when opened, saving local disk space. Common support issues include sync conflicts when two people edit offline, sync paused because the storage quota is full, and file names with characters or path lengths the service does not allow. Remember that sync is not the same as backup: if a user deletes a file or ransomware encrypts it, the change syncs everywhere, so rely on version history, the service's recycle bin and a real backup.",
   "Collaboration suites combine documents, spreadsheets and presentations that several people can edit at the same time in a browser, along with chat, video meetings and shared team spaces. Real-time co-authoring removes the old problem of emailed copies with conflicting edits. Sharing permissions matter here: a link set to 'anyone with the link' can expose data to outsiders, so organizations usually restrict sharing to internal users or named people and may apply data loss prevention rules to sensitive content.",
   "Account setup generally happens in an administrator console. You create the user, add them to groups, assign a licence, enforce MFA (multifactor authentication) and let the user complete sign-in on their devices. Deprovisioning at offboarding is just as important: disable sign-in, transfer or retain their mailbox and files according to policy, and reclaim the licence. Licensing is typically per user and subscription-based, billed monthly or yearly, and different plans include different apps, storage and features. Licences tied to a user usually allow installation on a set number of that user's devices, while shared or device-based licensing exists for kiosks and shared PCs.",
   "Consider a worked example. A new sales hire can sign in to the web portal but has no mailbox, and the desktop office apps say they cannot be activated. You open the admin console and see the account exists but no licence is assigned. You assign the plan that includes email and desktop apps; after a short wait, the mailbox is created and activation succeeds. You also confirm MFA is enrolled, add her to the sales group so she sees the team's shared files, and set her synced storage to files-on-demand because her laptop has a small SSD.",
   "Common mistakes: treating synced storage as a backup; using POP3 for a user with several devices; forgetting to reclaim licences when staff leave, which wastes money; sharing folders with 'anyone with the link' for convenience; and troubleshooting Outlook profiles when the real problem is a missing licence. Another trap is disabling a departing user's account without first arranging retention of their mailbox and files as policy requires.",
   "Exam questions use recognizable clues. 'User has no mailbox' or 'cannot activate office apps' points to licence assignment. 'Deleted file vanished from every device' shows that sync replicates deletions, so restore from version history or the recycle bin. 'Mail is only on one device' suggests POP3; IMAP or Exchange-style sync fixes it. 'Two people editing the same document at once' is co-authoring in a collaboration suite. 'Sync stopped' often means the quota is full or a file name is invalid. 'Employee left' means disable sign-in, retain data and reclaim the licence."
  ],
  "terms": [
   [
    "Cloud productivity suite",
    "A subscription service providing hosted email, storage, office apps and collaboration tools."
   ],
   [
    "IMAP",
    "Internet Message Access Protocol, which keeps mail on the server and syncs folders across devices."
   ],
   [
    "POP3",
    "Post Office Protocol version 3, which downloads mail to a single device and usually removes it from the server."
   ],
   [
    "SMTP",
    "Simple Mail Transfer Protocol, used to send email."
   ],
   [
    "Synced storage",
    "A cloud service that keeps files synchronized across a user's devices, such as OneDrive or Google Drive."
   ],
   [
    "Files-on-demand",
    "A sync feature that lists all files but downloads content only when the file is opened."
   ],
   [
    "Licence assignment",
    "Allocating a subscription plan to a user so they receive the included apps and services."
   ],
   [
    "Deprovisioning",
    "Disabling a departing user's access, handling their data per policy and reclaiming their licence."
   ]
  ],
  "example": "Ransomware on a user's laptop encrypts his synced project folder, and within minutes the encrypted copies replace the originals on his other devices. Because the organization's cloud storage keeps version history, the technician cleans the laptop, then restores the folder to the version from before the infection, and reminds the team that sync is not a backup.",
  "tip": "Cloud sync replicates deletions and ransomware-encrypted files too, so it is not a backup. If a user has no mailbox or cannot activate office apps, check licence assignment first.",
  "check": [
   [
    "Why is synced cloud storage not a replacement for backup?",
    "Deletions, corruption and ransomware encryption sync to every device, so you need version history and separate backups."
   ],
   [
    "A user reads mail on a laptop but it never appears on her phone. Which protocol is likely in use?",
    "POP3, which downloads mail to one device; IMAP or Exchange-style sync keeps devices in step."
   ],
   [
    "What should happen to a cloud account when an employee leaves?",
    "Disable sign-in, retain or transfer data according to policy, and reclaim the licence."
   ],
   [
    "A new user can sign in but has no mailbox. What do you check first?",
    "Whether a licence that includes email has been assigned to the account."
   ]
  ]
 },
 {
  "t": "Physical security: access control vestibules, badge readers, video surveillance, alarm systems, locks, guards, bollards, fences",
  "body": [
   "Physical security protects people, buildings and equipment from unauthorized physical access. It matters to IT because anyone who can touch a computer or server can steal it, plug in a malicious device, or boot it from their own media and bypass many software controls. Strong passwords and encryption help, but they are much weaker when an intruder can carry the server out of the building. Good physical security uses several layers, so an intruder must defeat one barrier after another. This idea is called defense in depth.",
   "The outer layer keeps vehicles and people at a distance. Fences mark the boundary and slow intruders; taller fences topped with barbed or razor wire deter more. Bollards are short, sturdy posts placed in front of entrances or along walkways to stop vehicles from being driven into a building while still letting pedestrians through. Lighting helps guards and cameras see and discourages intruders, and signage warns off casual trespassers. These controls are mostly deterrent and preventive: they make an attack harder and less attractive before anyone reaches a door.",
   "At the building entrance, access is controlled. Badge readers read an ID card, often using RFID (radio-frequency identification) or a smart card, and unlock the door only for authorized badges while logging who entered and when. Key fobs work the same way. Biometric readers check fingerprints, palms or faces. An access control vestibule (formerly called a mantrap) is a small space with two doors where only one can be open at a time; a person enters, the first door closes, and only after authentication does the second door open. It stops tailgating, where an unauthorized person slips in behind someone who badged in.",
   "Security guards add human judgment: they check IDs, sign in visitors, issue visitor badges, escort guests and respond to alarms. Many sites keep an access list or visitor log so there is a record of who was on site. Locks come in many forms: traditional keyed locks, cipher (keypad) locks that need a code, electronic locks tied to the badge system, and biometric locks. Inside, server rooms, network closets and even individual racks and cabinets should be locked. Cable locks secure laptops to desks, and privacy screens stop onlookers from reading displays.",
   "Detection and monitoring complete the picture. Video surveillance (CCTV, closed-circuit television, or networked IP cameras) deters wrongdoing when visible, records evidence and lets guards watch several areas at once. Alarm systems use door contacts, glass-break sensors and motion detectors to alert guards or a monitoring company when something happens after hours. Motion sensors can also switch on lights. Magnetometers (metal detectors) screen people at some high-security sites. The key distinction is between preventive controls such as fences, bollards, locks and vestibules, which stop access, and detective controls such as cameras and alarms, which notice and record it.",
   "Consider a worked example. A company discovers that a stranger followed an employee through the badge-controlled front door and wandered into an unlocked network closet. The review recommends layers rather than a single fix: an access control vestibule at the main entrance to stop tailgating, a guard at reception to sign in and escort visitors, a badge reader with logging on the network closet door, cameras covering the entrance and closet corridor, and a door alarm on the closet after hours. Staff also receive training to challenge people without visible badges.",
   "Common mistakes: thinking bollards stop people (they stop vehicles); relying on cameras to prevent entry, when they mainly detect and record; assuming a badge reader alone prevents tailgating, since one valid badge can let two people through; leaving the server room secure but the wiring closet unlocked; and forgetting the human layer of guards and trained staff. Another trap is treating a keyed lock as auditable; only electronic systems log who opened a door and when.",
   "Exam questions match the control to the threat. 'Prevent a vehicle from being driven into the lobby' is bollards. 'Stop tailgating' or 'only one person may pass at a time' is an access control vestibule, often with guards. 'Know who entered the room and when' is badge readers with logging. 'After-hours break-ins' or 'evidence of who took the equipment' is alarms and video surveillance. 'Laptops stolen from desks' is cable locks. 'Mark the perimeter' is fencing. 'Verify visitors' identity and escort them' is guards."
  ],
  "terms": [
   [
    "Defense in depth",
    "Using several layers of security controls so that one failure does not expose everything."
   ],
   [
    "Access control vestibule",
    "A two-door entry space that allows only one door open at a time, preventing tailgating."
   ],
   [
    "Badge reader",
    "A device that reads an ID card or fob, unlocks for authorized users and logs entries."
   ],
   [
    "Bollard",
    "A short, sturdy post that blocks vehicles while allowing pedestrians to pass."
   ],
   [
    "Video surveillance",
    "Cameras that deter, monitor and record activity for evidence."
   ],
   [
    "Alarm system",
    "Sensors such as door contacts, glass-break and motion detectors that alert when triggered."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secured entrance without authenticating."
   ]
  ],
  "example": "A data centre places concrete bollards in front of its glass lobby, surrounds the site with a tall fence, and requires staff to pass a guard desk and then an access control vestibule with a badge and fingerprint. Inside, each customer's rack is locked, and cameras record every aisle so any access can be reviewed later.",
  "tip": "Bollards stop vehicles, not people. Access control vestibules stop tailgating. Video surveillance mainly detects and records rather than prevents, although visible cameras also deter.",
  "check": [
   [
    "Which control is designed to stop tailgating at an entrance?",
    "An access control vestibule, which lets only one authenticated person through at a time."
   ],
   [
    "What threat do bollards address?",
    "Vehicles being driven into buildings or pedestrian areas."
   ],
   [
    "Why are badge readers preferred over keyed locks for sensitive rooms?",
    "They can be revoked per person and log who entered and when."
   ],
   [
    "Is video surveillance primarily preventive or detective?",
    "Detective, since it records and alerts, though visible cameras also have a deterrent effect."
   ]
  ]
 },
 {
  "t": "Logical security: least privilege, zero trust, MFA methods (authenticator apps, SMS, hardware tokens, email), SSO, MDM, DLP, IAM, directory services, access control lists",
  "body": [
   "Logical security uses software and configuration, rather than locks and walls, to control who can use systems and data. Its starting principle is least privilege: give each user, service and device only the access it needs to do its job, and no more. A receptionist does not need administrator rights; a backup service account does not need to log on interactively. Least privilege limits the damage from mistakes, malware and stolen accounts, because whatever runs under an account can do only what that account can do.",
   "Zero trust takes this further. Traditional networks trusted anything inside the firewall, so one compromised laptop could reach almost everything. A zero trust model assumes no user or device is trusted by default, wherever it is. Every request is authenticated, authorized and checked against conditions (for example, is the device managed and patched, and is the sign-in location normal) before access is granted, and access is granted per resource rather than to the whole network. 'Never trust, always verify' is the usual summary.",
   "Authentication proves identity, and multifactor authentication (MFA) requires two or more different factor types: something you know (password, PIN), something you have (phone, token, smart card) and something you are (fingerprint, face). Two passwords are still single-factor. Common MFA methods, roughly from strongest to weakest: hardware tokens and security keys, physical devices that generate codes or perform cryptographic sign-in and are strongly phishing-resistant when they use modern standards; authenticator apps, which generate time-based one-time passwords or approve push notifications on a phone; SMS text codes, convenient but vulnerable to SIM swapping and interception; and email codes, only as secure as the mailbox. Any MFA is far better than a password alone. Watch for MFA fatigue attacks, where an attacker spams push requests hoping the user taps Approve.",
   "Single sign-on (SSO) lets a user authenticate once and then reach many applications without signing in again, using trust between an identity provider and each application. SSO improves the user experience, reduces password reuse and lets administrators disable one account to cut off everything, but it makes that one account very valuable, so SSO should always be paired with MFA. Identity and access management (IAM) is the overall discipline of creating identities, assigning roles and permissions, reviewing access and removing it when people change jobs or leave. It relies on directory services, central databases of users, groups and computers such as Microsoft Active Directory, which other systems use for authentication and lookups.",
   "Access control lists (ACLs) are the lists attached to resources, such as files, folders, printers or network devices, that state which users or groups are allowed or denied which actions. On a router or firewall, an ACL permits or blocks traffic by address, protocol and port. Two more tools protect data on endpoints. Mobile device management (MDM) enrols phones, tablets and laptops so the organization can enforce passcodes and encryption, push apps and settings, and remotely lock or wipe devices. Data loss prevention (DLP) inspects email, files, cloud storage and endpoints for sensitive content such as card numbers or health records and blocks or alerts when it is about to leave the organization improperly.",
   "Consider a worked example. A company's staff sign in to a dozen separate cloud apps, each with its own password, and several reused passwords were exposed in a breach elsewhere. You recommend SSO through the company directory so there is one strong identity per person, enforced MFA using an authenticator app, with hardware security keys for administrators, and conditional access that allows sign-in only from MDM-enrolled devices. During offboarding, disabling one directory account now removes access to every app at once, and a DLP policy flags attempts to email customer card numbers outside the company.",
   "Common mistakes: counting a password plus a PIN as MFA (both are something you know); assuming SMS codes are as strong as a hardware key; thinking SSO removes the need for MFA; confusing MDM (managing the device) with DLP (watching the data); and giving everyone administrator rights to reduce help-desk tickets, which breaks least privilege. Another trap is believing zero trust is a single product; it is an approach that combines identity, device health and per-resource authorization.",
   "Exam questions use clear cues. 'Only the access needed for the job' is least privilege. 'Never trust, always verify, regardless of location' is zero trust. 'Sign in once, reach many apps' is SSO. 'Remotely wipe a lost phone or enforce a passcode' is MDM. 'Block emails containing credit card numbers' is DLP. 'Central database of users and groups' is a directory service. 'Permissions list on a folder' or 'router rule allowing port 443' is an ACL. 'Weakest MFA method listed' is usually SMS or email."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting users and services only the minimum access required for their tasks."
   ],
   [
    "Zero trust",
    "A model where no user or device is trusted by default and every access request is verified."
   ],
   [
    "Multifactor authentication (MFA)",
    "Authentication using two or more different factor types: know, have and are."
   ],
   [
    "Single sign-on (SSO)",
    "Authenticating once to an identity provider to access many applications."
   ],
   [
    "Directory service",
    "A central database of users, groups and computers, such as Active Directory, used for authentication."
   ],
   [
    "Access control list (ACL)",
    "A list of permissions or rules stating who or what traffic is allowed or denied."
   ],
   [
    "Mobile device management (MDM)",
    "Central enrolment and control of devices to enforce policy and remotely lock or wipe them."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools that detect and block sensitive data from leaving the organization improperly."
   ]
  ],
  "example": "An employee receives a burst of MFA push notifications late at night that she did not request. She denies them and reports it. The security team realizes her password was stolen, resets it, switches her to number-matching push approvals and reminds staff that unexpected MFA prompts mean someone else has their password.",
  "tip": "A password plus a PIN is still single-factor, because both are something you know. Of the listed MFA methods, SMS and email codes are the weakest and hardware tokens the strongest.",
  "check": [
   [
    "Does a password and a security question count as MFA?",
    "No, both are something you know, so it is single-factor authentication."
   ],
   [
    "What is the main risk of SSO, and how is it reduced?",
    "One compromised account opens many apps, so SSO is paired with MFA."
   ],
   [
    "Which technology would block an email containing customer credit card numbers from leaving the company?",
    "Data loss prevention (DLP)."
   ],
   [
    "What principle says a help-desk technician should not have domain administrator rights for daily work?",
    "Least privilege, which grants only the access a role needs."
   ]
  ]
 },
 {
  "t": "Windows security: Microsoft Defender Antivirus and Firewall, users and groups, NTFS vs share permissions, inheritance, UAC, BitLocker and BitLocker To Go, EFS, Windows Hello, run as administrator",
  "body": [
   "Windows includes a set of built-in security features that you will configure and troubleshoot constantly. Microsoft Defender Antivirus provides real-time protection against malware, cloud-delivered protection and scheduled or on-demand scans; you manage it in the Windows Security app, where you can check that definitions are current, run a quick, full or offline scan, and review quarantined items. If a third-party antivirus is installed, Defender typically steps aside. Windows Defender Firewall filters inbound and outbound traffic per network profile (domain, private, public); you can allow apps, open ports and create detailed rules in the Advanced Security console.",
   "Accounts are organized into users and groups. Built-in groups include Administrators, with full control; Users (standard users), who can run programs but not change system-wide settings; Guests, for the Guest account, which is disabled by default; and Power Users, kept only for legacy compatibility. Assign permissions to groups rather than individuals so access is easy to manage as people join and leave. Day to day, people should use standard accounts. User Account Control (UAC) enforces this: even an administrator runs with standard rights until an action needs elevation, and then UAC shows a consent prompt, or asks a standard user for admin credentials. That pause stops malware from silently making system changes. 'Run as administrator' (right-click a program) starts just that one program elevated.",
   "Folders on a network have two kinds of permission. Share permissions (Full Control, Change, Read) apply only when the folder is accessed over the network. NTFS permissions (Full Control, Modify, Read and Execute, List folder contents, Read, Write) apply both locally and over the network. When both apply, Windows calculates each set separately and the most restrictive result wins. Within each set, permissions from multiple groups add up, but an explicit Deny overrides Allow. By default NTFS permissions are inherited: a new file or subfolder takes the permissions of its parent, and you can disable inheritance to set explicit permissions. When you move a file within the same NTFS volume it keeps its permissions; when you copy it, or move it to a different volume, it inherits the destination's permissions.",
   "Encryption protects data at rest. BitLocker encrypts an entire volume, normally using the computer's TPM (Trusted Platform Module) chip to protect the key, so a stolen drive is unreadable; you must store the recovery key safely, for example in the organization's directory or the user's Microsoft account. BitLocker To Go applies the same protection to removable drives such as USB sticks, typically unlocked with a password. EFS (Encrypting File System) encrypts individual files and folders on NTFS and ties them to the user's certificate, so other users on the same PC cannot open them; losing that certificate can mean losing the files. Full BitLocker management and EFS need Pro or higher editions.",
   "Windows Hello provides passwordless sign-in with a PIN, fingerprint or facial recognition. The Windows Hello PIN is tied to that specific device's hardware, so a stolen PIN is useless on any other machine, unlike a password that works anywhere. Together with MFA, it is Microsoft's preferred way to sign in.",
   "Consider a worked example. A folder `D:\\Finance` is shared with the share permission Everyone: Full Control, while its NTFS permissions give the Accounting group Modify and the Sales group Read. When a sales user opens it over the network, the share allows Full Control but NTFS allows Read, so the effective permission is Read. If you later add a Deny Write entry for a contractor in Accounting, that Deny wins over the group's Allow. A manager then copies a report from `D:\\Finance` to `D:\\Public`; because it was copied, it takes on Public's permissions, which could expose it.",
   "Common mistakes: adding the most permissive result instead of the most restrictive when share and NTFS permissions combine; forgetting that Deny overrides Allow; assuming moved and copied files behave the same; disabling UAC to stop prompts, which removes a key protection; turning on BitLocker without backing up the recovery key; and confusing BitLocker (whole volume) with EFS (individual files per user). Another trap is expecting share permissions to protect a user who signs in locally at the server; only NTFS applies there.",
   "Exam questions cue these features clearly. 'Laptop stolen, protect the whole drive' is BitLocker. 'Encrypt a USB stick' is BitLocker To Go. 'Encrypt one user's files so others on the PC cannot read them' is EFS. 'Prompt before system changes' is UAC. 'Sign in with face or a device-bound PIN' is Windows Hello. 'Effective permission over the network' means take the most restrictive of share and NTFS. 'File copied to another folder has different permissions' means it inherited the destination's permissions."
  ],
  "terms": [
   [
    "Microsoft Defender Antivirus",
    "Built-in Windows anti-malware with real-time, cloud-delivered and scheduled scanning."
   ],
   [
    "User Account Control (UAC)",
    "A feature that runs users with standard rights and prompts before elevating for system changes."
   ],
   [
    "Share permissions",
    "Full Control, Change and Read permissions that apply only to network access to a shared folder."
   ],
   [
    "NTFS permissions",
    "File and folder permissions that apply both locally and over the network."
   ],
   [
    "Inheritance",
    "Child files and folders automatically receiving the permissions of their parent folder."
   ],
   [
    "BitLocker",
    "Full-volume encryption for Windows, usually protected by the TPM and a recovery key."
   ],
   [
    "EFS",
    "Encrypting File System, which encrypts individual NTFS files tied to a user's certificate."
   ],
   [
    "Windows Hello",
    "Device-bound sign-in using a PIN, fingerprint or facial recognition."
   ]
  ],
  "example": "An auditor finds that a laptop containing payroll data was left in a taxi. Because the laptop had BitLocker enabled with the recovery key escrowed in the company directory, the IT team documents that the data was encrypted at rest, and the incident is recorded as a lost device rather than a data breach.",
  "tip": "For combined share and NTFS permissions, take the most restrictive. Copying a file inherits the destination's permissions; moving within the same volume keeps the original permissions.",
  "check": [
   [
    "Share permission is Read and NTFS permission is Modify. What is the effective network permission?",
    "Read, because the most restrictive of the two sets applies."
   ],
   [
    "What happens to NTFS permissions when a file is moved within the same volume?",
    "It keeps its original permissions."
   ],
   [
    "Which feature encrypts a USB flash drive?",
    "BitLocker To Go."
   ],
   [
    "Why should users not disable UAC?",
    "UAC prompts before elevation, preventing malware and users from silently making system-wide changes."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2 vs WPA3, AES vs TKIP, RADIUS, TACACS+, Kerberos, multifactor",
  "body": [
   "Wireless networks broadcast through walls, so anyone nearby can try to join or listen. Wireless security protocols provide two things: authentication, which decides who may join, and encryption, which keeps traffic private. The original WEP (Wired Equivalent Privacy) and the first WPA (Wi-Fi Protected Access) are broken and should never be used. The A+ exam asks you to pick the strongest option a device supports and to recognize which authentication protocol fits which job.",
   "WPA2 has been the standard for many years. It uses AES (Advanced Encryption Standard) through the CCMP protocol for strong encryption. WPA2-Personal (PSK, pre-shared key) uses one passphrase for everyone, so anyone who knows the passphrase can join, and a captured handshake can be attacked offline by guessing weak passphrases. WPA3 is the current standard. WPA3-Personal replaces the pre-shared key handshake with SAE (Simultaneous Authentication of Equals), which resists offline password guessing and provides forward secrecy, so recording traffic now and learning the password later does not decrypt it. WPA3 also requires Protected Management Frames, which help prevent attackers from forcing devices off the network. Many access points offer a mixed WPA2/WPA3 transition mode for older devices.",
   "AES versus TKIP: TKIP (Temporal Key Integrity Protocol) was a stopgap used with the original WPA to patch WEP's weaknesses on old hardware. It is deprecated and weak. AES is strong and is the one you should select. If a router offers 'WPA2-PSK (AES)' versus 'WPA/WPA2 TKIP', choose AES; selecting TKIP can also limit speeds on newer Wi-Fi standards. In short, the protocol (WPA2 or WPA3) and the cipher (AES or TKIP) are separate choices, and the right answer is the newest protocol with AES.",
   "Businesses use the Enterprise modes (WPA2-Enterprise or WPA3-Enterprise), which authenticate each user individually through 802.1X instead of a shared password. The access point passes the login to an authentication server, usually a RADIUS (Remote Authentication Dial-In User Service) server, which checks credentials against a directory such as Active Directory. Each user has their own credentials, so a departing employee is simply disabled instead of changing the Wi-Fi password for everyone. RADIUS is an open standard, uses UDP (User Datagram Protocol) and encrypts only the password in its packets. It is common for Wi-Fi, VPN and network access for end users.",
   "TACACS+ (Terminal Access Controller Access-Control System Plus) is another AAA (authentication, authorization and accounting) protocol, originally from Cisco. It uses TCP (Transmission Control Protocol), encrypts the entire payload and separates authentication, authorization and accounting, so it is typically used to control administrator access to network devices such as routers and switches, with per-command authorization and detailed logging. Kerberos is the ticket-based authentication protocol used by Active Directory domains: a user authenticates once to the Key Distribution Center and receives tickets to access services without resending the password, supporting single sign-on within the domain. It depends on reasonably synchronized clocks, so a large time difference causes sign-in failures. Multifactor authentication can protect wireless and remote access too, for example certificates on managed devices plus user credentials, or RADIUS integrated with an MFA service for VPN sign-ins.",
   "Consider a worked example. A growing office uses WPA2-Personal with one passphrase that has been shared with staff, contractors and former employees for years. You replace it with WPA3-Enterprise where devices support it, with a WPA2/WPA3 transition mode for a few older laptops, and point the access points at a RADIUS server that checks Active Directory accounts. Staff now sign in with their own credentials, and when a contractor leaves, disabling their account removes Wi-Fi access immediately. Network engineers, meanwhile, authenticate to switches through TACACS+ so each command they run is authorized and logged.",
   "Common mistakes: choosing TKIP because it appears alongside WPA2 in a menu; believing a long WPA2-Personal passphrase solves the problem of former staff still knowing it; confusing RADIUS (UDP, password-only encryption, user network access) with TACACS+ (TCP, full encryption, device administration); forgetting that Kerberos needs synchronized time; and assuming WPA3 transition mode is as strong as WPA3-only, when it exists for compatibility.",
   "Exam questions use these clue words. 'Strongest encryption for a home router' is WPA3 with AES, or WPA2 with AES if WPA3 is unavailable. 'Resists offline dictionary attacks' or 'SAE' is WPA3-Personal. 'Each user signs in to Wi-Fi with their own domain credentials' is Enterprise mode with 802.1X and RADIUS. 'Administrator access to routers with per-command authorization' or 'encrypts the entire packet, uses TCP' is TACACS+. 'Tickets' or 'Key Distribution Center' is Kerberos. 'Legacy, deprecated cipher' is TKIP."
  ],
  "terms": [
   [
    "WPA2",
    "Wi-Fi security standard using AES-CCMP, in Personal (pre-shared key) or Enterprise (802.1X) modes."
   ],
   [
    "WPA3",
    "The current Wi-Fi security standard, using SAE in Personal mode and requiring Protected Management Frames."
   ],
   [
    "AES",
    "Advanced Encryption Standard, the strong cipher used by WPA2 and WPA3."
   ],
   [
    "TKIP",
    "Temporal Key Integrity Protocol, a deprecated cipher from the original WPA."
   ],
   [
    "RADIUS",
    "An open AAA protocol over UDP, commonly used for Wi-Fi, VPN and network access authentication."
   ],
   [
    "TACACS+",
    "A Cisco-originated AAA protocol over TCP that encrypts the whole payload, used for device administration."
   ],
   [
    "Kerberos",
    "The ticket-based authentication protocol used in Active Directory domains for single sign-on."
   ],
   [
    "802.1X",
    "Port-based network access control that passes authentication to a server such as RADIUS."
   ]
  ],
  "example": "A home user's older router offers WEP, WPA-TKIP and WPA2-AES. Her new laptop supports WPA3, but the router does not. The technician selects WPA2 with AES, sets a long unique passphrase and updates the router firmware, then recommends replacing the router with one that supports WPA3 at the next opportunity.",
  "tip": "RADIUS uses UDP, encrypts only the password and is common for Wi-Fi and VPN users. TACACS+ uses TCP, encrypts everything and is common for admin access to network devices. Always choose AES over TKIP and WPA3 over WPA2 when available.",
  "check": [
   [
    "Which Wi-Fi feature in WPA3-Personal resists offline password guessing?",
    "SAE, Simultaneous Authentication of Equals, which replaces the pre-shared key handshake."
   ],
   [
    "A router offers WPA2 with TKIP or with AES. Which should you choose and why?",
    "AES, because TKIP is deprecated and weak while AES provides strong encryption."
   ],
   [
    "Which protocol would you use to authenticate administrators to switches with per-command authorization?",
    "TACACS+, which uses TCP, encrypts the full payload and separates AAA functions."
   ],
   [
    "Why might Kerberos sign-ins fail on a PC whose clock is badly wrong?",
    "Kerberos tickets depend on synchronized time, so a large clock difference causes authentication to fail."
   ]
  ]
 },
 {
  "t": "Malware: virus, trojan, rootkit, ransomware, keylogger, spyware, adware, cryptominer, boot sector virus, stalkerware, fileless malware; tools such as anti-malware, recovery console, EDR/MDR/XDR, email security gateways",
  "body": [
   "Malware is any software designed to harm a system or its user, and the exam expects you to identify each type from its behaviour or symptoms, then choose the right tool to deal with it. It helps to group malware by how it spreads, how it hides and what it does. A virus attaches itself to a legitimate program or file and spreads when that host is run or shared; it needs human action to spread. A boot sector virus infects the boot sector or master boot record, so it loads before the operating system and the antivirus software, making it hard to remove from within Windows. A trojan pretends to be useful software, such as a free game or a cracked application, but carries a hidden malicious function, often opening a backdoor. Trojans do not replicate on their own.",
   "Some malware focuses on hiding. A rootkit modifies the operating system or firmware at a deep level so it can conceal files, processes and network connections from the OS and security tools, giving attackers persistent, privileged access. Fileless malware avoids writing a traditional executable to disk; it lives in memory and abuses legitimate built-in tools such as PowerShell or Windows Management Instrumentation, which makes signature-based detection difficult and calls for behaviour-based tools.",
   "Other malware is defined by what it does. Ransomware encrypts the victim's files, or threatens to publish stolen data, and demands payment; good offline or immutable backups are the main defense. A keylogger records keystrokes to steal passwords and messages; it may be software or a small hardware device between keyboard and PC. Spyware secretly gathers information about the user's activity. Stalkerware is spyware installed on someone's phone or computer, often by a partner or acquaintance, to track their location, messages and calls. Adware floods the user with advertisements and may change browser settings. A cryptominer uses the victim's CPU or GPU to mine cryptocurrency, showing up as high resource use, heat, fan noise and battery drain.",
   "Defenses come in layers. Anti-malware (antivirus) software scans files and behaviour, must be kept updated and should run in real time. When malware prevents normal repair, you can use a recovery console or recovery environment, such as the Windows Recovery Environment or bootable offline scanners, to scan and repair while the infected OS is not running; this is particularly useful against rootkits and boot sector viruses. Prevention also includes patching, least privilege, user training, disabling AutoRun, application allow-listing and reliable backups.",
   "Organizations add more advanced tools. EDR (endpoint detection and response) continuously records endpoint activity, detects suspicious behaviour, and lets responders investigate and isolate a device. MDR (managed detection and response) is a service in which an outside security team monitors and responds using such tools on the organization's behalf, useful when there is no in-house security team watching around the clock. XDR (extended detection and response) correlates data from endpoints, email, network, identity and cloud into one view. An email security gateway filters inbound and outbound mail, blocking spam, phishing, malicious attachments and dangerous links before they reach inboxes, since email is one of the most common ways malware arrives.",
   "Consider a worked example. Several laptops in a small firm run hot and slow, with fans at full speed even when idle, and Task Manager shows an unfamiliar process using most of the CPU. The pattern points to a cryptominer. The EDR console shows it arrived through a trojanized 'free PDF converter' downloaded from an unofficial site. The team isolates the laptops from the network using EDR, removes the malware following the standard removal procedure, blocks the site, and adds application allow-listing so unapproved installers cannot run.",
   "Common mistakes: calling every infection a virus; assuming a trojan spreads itself like a worm; trying to clean a rootkit from inside the running infected OS instead of from recovery or bootable media; relying on signature scanning alone against fileless malware; and treating synced cloud storage as protection against ransomware. Another trap is confusing EDR (a tool on endpoints), MDR (a managed service) and XDR (correlation across many data sources).",
   "Exam questions describe symptoms. 'Files renamed and encrypted with a ransom note' is ransomware. 'High CPU and fan noise with no user activity' is a cryptominer. 'Pop-ups and changed home page' is adware. 'Partner can see my location and messages' is stalkerware. 'Passwords stolen by recording typing' is a keylogger. 'Loads before the OS' is a boot sector virus or rootkit, which calls for scanning from recovery or bootable media. 'Lives only in memory using PowerShell' is fileless. 'Outside team monitors our endpoints' is MDR."
  ],
  "terms": [
   [
    "Virus",
    "Malware that attaches to a host file or program and spreads when that host is run or shared."
   ],
   [
    "Trojan",
    "Malware disguised as legitimate software that carries a hidden malicious function."
   ],
   [
    "Rootkit",
    "Malware that hides deep in the OS or firmware to conceal itself and keep privileged access."
   ],
   [
    "Ransomware",
    "Malware that encrypts or steals data and demands payment."
   ],
   [
    "Fileless malware",
    "Malware that runs in memory and abuses built-in tools instead of installing executable files."
   ],
   [
    "Cryptominer",
    "Malware that uses a victim's CPU or GPU to mine cryptocurrency."
   ],
   [
    "EDR",
    "Endpoint detection and response, which records endpoint activity, detects threats and can isolate devices."
   ],
   [
    "Email security gateway",
    "A filter that blocks spam, phishing and malicious attachments before they reach mailboxes."
   ]
  ],
  "example": "A user reports that antivirus keeps finding and removing the same threat after every reboot, and the Task Manager process list looks clean. The technician suspects a rootkit, boots the PC from a trusted offline scanning image so the infected OS is not running, and the scan finds and removes the hidden component the live scans could not see.",
  "tip": "Match the symptom: encrypted files with a ransom note mean ransomware; unexplained high CPU means a cryptominer; malware loading before the OS means a boot sector virus or rootkit, which calls for scanning from recovery or bootable media.",
  "check": [
   [
    "How does a trojan differ from a virus?",
    "A trojan disguises itself as useful software and does not self-replicate, while a virus attaches to host files and spreads when they are run or shared."
   ],
   [
    "Why are rootkits often removed using bootable media?",
    "The rootkit hides from the running OS, so scanning while that OS is not running lets tools see and remove it."
   ],
   [
    "Which service provides an outside team to monitor and respond to endpoint threats?",
    "MDR, managed detection and response."
   ],
   [
    "What is the main defense against losing data to ransomware?",
    "Tested offline or immutable backups, supported by patching, anti-malware and user training."
   ]
  ]
 },
 {
  "t": "Social engineering and threats: phishing, vishing, smishing, QR code phishing, whaling, impersonation, tailgating, shoulder surfing, dumpster diving, evil twin, DoS/DDoS, zero-day, on-path, brute force, insider threat, SQL injection, XSS, BEC, supply chain",
  "body": [
   "Social engineering manipulates people rather than technology, exploiting trust, urgency, fear, curiosity and the wish to be helpful. It is often the easiest way into an organization, so the best defenses are training, verification procedures and a culture where it is safe to say no or to double-check. The exam lists many threat names; your job is to recognize each from a short description and pick the control that reduces it.",
   "Phishing uses fraudulent emails that imitate trusted senders to trick recipients into clicking a malicious link, opening an attachment or entering credentials. Spear phishing targets specific people using personal details. Whaling is phishing aimed at senior executives. Vishing (voice phishing) uses phone calls, often pretending to be the help desk or a bank. Smishing uses SMS text messages. QR code phishing, sometimes called quishing, hides a malicious link in a QR code on a poster, parking meter or email, bypassing link filters because the user scans it with a phone. Impersonation means pretending to be someone else, such as a technician, delivery driver or executive, to gain access or information.",
   "Business email compromise (BEC) is a costly variant: attackers take over or spoof an executive's or supplier's email account and ask staff to wire money or change bank details. The defense is procedural: verify payment changes by calling a known number, not one in the email. Physical techniques include tailgating (following someone through a secure door; piggybacking is the same with the insider's knowledge), shoulder surfing (watching someone type a PIN or read their screen) and dumpster diving (searching trash for documents and discarded media). Shredding, privacy screens and access control vestibules counter them.",
   "Network and technical threats appear too. An evil twin is a rogue Wi-Fi access point that copies a legitimate network's name to lure users so the attacker can intercept traffic. An on-path attack (formerly called man-in-the-middle) places the attacker between two parties to read or alter their communication. A denial of service (DoS) attack overwhelms a service so legitimate users cannot reach it; a distributed DoS (DDoS) uses many compromised machines, a botnet, at once. A brute force attack tries many passwords until one works; dictionary attacks and credential stuffing (reusing leaked passwords) are related. Defenses include account lockout, rate limiting, strong unique passwords and MFA (multifactor authentication).",
   "A zero-day is a vulnerability unknown to the vendor or lacking a patch, so defenders have had 'zero days' to fix it; behaviour-based detection and layered defenses help. An insider threat comes from a current or former employee, contractor or partner who misuses their access, deliberately or carelessly; least privilege, monitoring and prompt offboarding reduce the risk. A supply chain attack compromises a trusted vendor, software update or hardware component to reach that vendor's customers. Two web application attacks round out the list. SQL injection happens when an application builds database queries directly from user input, letting an attacker alter the query to read or change data; the defense is input validation and parameterized queries. Cross-site scripting (XSS) happens when a site includes untrusted input in its pages so a malicious script runs in other visitors' browsers; the defense is input validation and output encoding. As a technician you mostly recognize these and report them to developers.",
   "Consider a worked example. An accounts clerk receives an email that appears to come from a regular supplier, saying their bank has changed and the next invoice should be paid to a new account. The message is polite, references a real invoice number and asks for quick action. Following policy, the clerk does not reply to the email but phones the supplier on the number already in the vendor file. The supplier confirms nothing changed; their mailbox had been compromised. This was BEC, stopped by out-of-band verification, and the incident is reported so other staff are warned.",
   "Common mistakes: mixing up the channels (vishing is voice, smishing is SMS); calling any fake Wi-Fi network an on-path attack when the specific term is evil twin; assuming DoS steals data, when it attacks availability; thinking a zero-day means an attack that happened today; and believing insider threats are always malicious, when carelessness counts too. Another trap is treating SQL injection and XSS as the same: SQL injection targets the database, while XSS runs script in other users' browsers.",
   "Exam wording maps directly to terms. 'Email to many users' is phishing; 'to the CEO' is whaling; 'phone call from the help desk' is vishing; 'text message' is smishing; 'scan this code' is QR code phishing. 'Followed an employee through the door' is tailgating. 'Watched her type the PIN' is shoulder surfing. 'Wi-Fi with the same name as the café' is an evil twin. 'Many systems flood a website' is DDoS. 'No patch exists yet' is zero-day. 'Change our bank details' is BEC. 'Compromised vendor update' is supply chain."
  ],
  "terms": [
   [
    "Phishing",
    "Fraudulent messages impersonating trusted senders to steal credentials or deliver malware."
   ],
   [
    "Whaling",
    "Phishing aimed at senior executives."
   ],
   [
    "Vishing and smishing",
    "Social engineering by voice call and by SMS text message respectively."
   ],
   [
    "Business email compromise (BEC)",
    "Using a compromised or spoofed business email account to trick staff into payments or data release."
   ],
   [
    "Evil twin",
    "A rogue access point imitating a legitimate Wi-Fi network to intercept traffic."
   ],
   [
    "On-path attack",
    "An attacker positioned between two parties to intercept or alter communication."
   ],
   [
    "Zero-day",
    "A vulnerability with no available patch because the vendor has had no time to fix it."
   ],
   [
    "Supply chain attack",
    "Compromising a trusted supplier or its products to reach that supplier's customers."
   ]
  ],
  "example": "A person in a high-visibility vest carrying a ladder arrives at reception saying he must fix the building's Wi-Fi and asks to be let into the network closet. The receptionist asks him to wait, checks the facilities schedule, finds no work order and calls the facilities manager, who knows nothing about it. The visitor leaves before security arrives; it was an impersonation attempt.",
  "tip": "Know the channels: phishing is email, vishing is voice, smishing is SMS, QR code phishing is a scanned code and whaling targets executives. An evil twin is a fake Wi-Fi network; an on-path attack is interception between two parties.",
  "check": [
   [
    "An attacker texts employees a link claiming their parcel is delayed. What is this called?",
    "Smishing, phishing delivered by SMS text message."
   ],
   [
    "What is the best defense against a request to change a supplier's bank details by email?",
    "Verify out of band by calling the supplier on a known, previously recorded number."
   ],
   [
    "Many compromised computers flood a web server so customers cannot reach it. Name the attack.",
    "A distributed denial of service (DDoS) attack."
   ],
   [
    "Which defense prevents SQL injection in an application?",
    "Input validation combined with parameterized queries."
   ]
  ]
 },
 {
  "t": "The seven-step malware removal procedure, in order",
  "body": [
   "CompTIA publishes a best-practice procedure for removing malware, and the exam expects you to know the seven steps in order and to pick the next step in a scenario. The order is not arbitrary: each step protects the network, the evidence or the repair from what comes after it. If you understand why each step sits where it does, you will not need to rely on memorization alone.",
   "Step 1: Investigate and verify malware symptoms. Before acting, confirm that the problem really is malware and not a hardware fault, a failing update or a misconfiguration. Look for pop-ups, browser redirects, unknown processes, disabled security tools, renamed or encrypted files, unusual network activity, certificate warnings and security alerts. Step 2: Quarantine the infected systems. Disconnect the machine from the network (unplug Ethernet, turn off Wi-Fi) so the malware cannot spread, contact a command server or send data out. Also stop using removable media with it, since USB drives can carry the infection elsewhere.",
   "Step 3: Disable System Restore in Windows. Restore points can contain copies of the malware, and the anti-malware tool may be unable to clean them. If you leave System Restore on, a later restore could reinfect the machine. Disabling it deletes the existing restore points, which is why it happens only after you have confirmed and isolated the infection, not before.",
   "Step 4: Remediate the infected systems. First, update the anti-malware software's definitions and engine; because the PC is quarantined, you may download updates on a clean machine and bring them over, or briefly allow only the update. Then scan and remove, using techniques that fit the infection: scanning in Safe Mode, where fewer programs load, or booting into a preinstallation environment such as Windows PE, the Windows Recovery Environment or a vendor's bootable rescue media, so the malware is not running while it is removed. If the infection cannot be removed confidently, reimage the system from a known-good image and restore data from clean backups.",
   "Step 5: Schedule scans and run updates. Configure regular automatic scans, make sure real-time protection is on, and install operating system and application updates so the vulnerability that allowed the infection is closed. Step 6: Enable System Restore and create a restore point in Windows. Now that the system is clean, turn System Restore back on and create a new, clean restore point to fall back on in future. Step 7: Educate the end user. Explain how the infection likely happened, such as an email attachment, a fake download or a malicious browser extension, and how to avoid it. Point them to the acceptable use policy and to how to report suspicious activity. Throughout the process, document what you found and did in the ticket.",
   "Consider a worked example. A user calls because her browser keeps redirecting to strange shopping sites and her antivirus icon has disappeared. You check and confirm symptoms consistent with malware rather than a proxy misconfiguration (step 1). You unplug her Ethernet cable and turn off Wi-Fi (step 2), then disable System Restore (step 3). On a clean PC you download the latest definitions, copy them over, boot into Safe Mode and run a full scan, which removes an adware bundle and a malicious extension (step 4). You reconnect, install pending updates and schedule weekly scans (step 5), re-enable System Restore and create a restore point (step 6), and explain to her how the free 'video downloader' she installed carried the malware (step 7).",
   "Common mistakes: disabling System Restore before quarantining, which gives the malware more time to spread; scanning with out-of-date definitions; re-enabling System Restore before the system is confirmed clean, which saves an infected snapshot; skipping user education, which invites the same infection next week; and forgetting to document. Another trap is jumping straight to reimaging without verifying the symptoms; reimaging is a valid remediation choice, but it belongs in step 4.",
   "Exam questions almost always ask for the next step or the first step. A memory aid for the order is: Identify, Quarantine, Disable restore, Remediate, Schedule, Enable restore, Educate. 'You have confirmed malware; what next?' is quarantine. 'The system is isolated; what next?' is disable System Restore. 'Before scanning, what should you do?' is update the anti-malware software. 'The system is clean and updated; what next?' is enable System Restore and create a restore point. 'What is the final step?' is educate the end user."
  ],
  "terms": [
   [
    "Investigate and verify",
    "Step 1: confirm symptoms are caused by malware before taking action."
   ],
   [
    "Quarantine",
    "Step 2: isolate the infected system from networks and shared media to stop spread."
   ],
   [
    "System Restore",
    "A Windows feature that saves restore points, which can harbour malware and so is disabled during cleanup."
   ],
   [
    "Remediation",
    "Step 4: update anti-malware, then scan and remove using Safe Mode or a preinstallation environment, or reimage."
   ],
   [
    "Preinstallation environment",
    "A minimal boot environment such as Windows PE used to scan while the infected OS is not running."
   ],
   [
    "Restore point",
    "A snapshot of system files and settings that Windows can roll back to."
   ],
   [
    "End-user education",
    "Step 7: teaching the user how the infection happened and how to avoid it."
   ]
  ],
  "example": "A technician confirms a user's PC is infected and immediately disconnects it from the network. A colleague suggests running System Restore to 'go back to before the infection'. The technician explains that restore points may contain the malware, disables System Restore, remediates with updated tools from Safe Mode, and only later creates a fresh restore point once the system is clean.",
  "tip": "Most questions ask for the next step. Quarantine comes before disabling System Restore; updating the anti-malware software comes before scanning; re-enabling System Restore comes after the system is clean; educating the user is last.",
  "check": [
   [
    "What is the first step in the malware removal procedure?",
    "Investigate and verify malware symptoms."
   ],
   [
    "Why is System Restore disabled before remediation?",
    "Restore points may contain the malware and could reinfect the system if used later."
   ],
   [
    "What should you do immediately before scanning an infected PC?",
    "Update the anti-malware software's definitions and engine."
   ],
   [
    "Which step comes directly after scheduling scans and running updates?",
    "Enable System Restore and create a new restore point."
   ]
  ]
 },
 {
  "t": "Workstation hardening: data-at-rest encryption, password policy, end-user best practices (screensaver locks, logging off), account management, disable AutoRun/AutoPlay, disable guest account",
  "body": [
   "Hardening means reducing a system's attack surface: turning off what is not needed, locking down what is, and making the remaining features as secure as possible. Workstations are a prime target because users sit at them all day, open email, browse the web and plug in devices, so the A+ exam covers a standard hardening checklist. Each item answers a specific risk, and exam questions usually describe the risk and ask for the matching control.",
   "Data-at-rest encryption protects information stored on the disk if a laptop is lost or stolen or a drive is removed. On Windows this is usually BitLocker (full-volume encryption) or EFS (Encrypting File System) for individual files; on macOS it is FileVault. Without encryption, anyone can remove the drive, connect it to another computer and read everything, regardless of the Windows password, because the sign-in screen only protects the running OS. Store recovery keys centrally so a forgotten password or hardware change does not lock the owner out.",
   "A password policy sets rules for passwords, usually enforced by Group Policy or a device-management tool. It can include minimum length (length matters more than complexity for resisting guessing), complexity requirements (mixing character types), password history to stop reuse, expiration where policy requires it, and account lockout after a number of failed attempts to slow brute-force guessing. Current guidance favours long passphrases, screening against known-breached passwords and MFA (multifactor authentication) over frequent forced changes, which tend to produce predictable passwords. Also set BIOS/UEFI passwords so no one can change boot settings or boot from USB without authorization.",
   "End-user best practices matter just as much. Configure a screensaver or screen lock that activates after a short idle period and requires a password to resume. Teach users to lock the screen manually whenever they walk away (Windows key + L on Windows, Control + Command + Q on a Mac) and to log off at the end of the day. Encourage them to keep sensitive paperwork off desks, use privacy screens in public and never write passwords on sticky notes. Account management applies least privilege: users work with standard accounts and use a separate administrator account only when needed. Restrict sign-in times where appropriate, disable accounts promptly when people leave, remove unused accounts, change default passwords, rename or disable the built-in Administrator account where policy allows, and set expiration dates for temporary staff.",
   "Disable the Guest account: it lets anyone use the machine without their own credentials, and while it is disabled by default in current Windows, you should check that it stays that way. Finally, disable AutoRun and AutoPlay. AutoRun could once launch a program automatically when a CD or USB drive was inserted, which malware abused to spread. AutoPlay asks what to do with new media. Modern Windows no longer honours AutoRun from USB drives, but hardening guides still call for turning AutoPlay off, in Settings under Bluetooth and devices, AutoPlay, or through Group Policy, so inserted media never triggers actions without the user choosing. Other steps include removing unneeded software and services, keeping the OS and apps patched and running up-to-date anti-malware.",
   "Consider a worked example. A law firm asks you to harden twenty laptops before a compliance audit. You enable BitLocker with recovery keys stored in the directory, apply a Group Policy password policy with a long minimum length and account lockout, set the screen to lock after a few minutes of inactivity, confirm the Guest account is disabled, turn off AutoPlay for all drives, remove local administrator rights from everyday accounts and set a UEFI password. You document each setting so the auditor can verify it, and you brief staff on locking their screens.",
   "Common mistakes: assuming a Windows password protects data on a removed drive; forcing frequent password changes while ignoring length and MFA; setting a lockout threshold so low that users lock themselves out constantly; giving users administrator rights 'just to be safe'; forgetting to disable accounts of people who have left; and thinking AutoRun is the same as AutoPlay. Another trap is treating a screensaver without a password as a security control; it only hides the screen until someone moves the mouse.",
   "Exam questions use risk-based wording. 'Lost or stolen laptop' points to data-at-rest encryption. 'Users leave desks unattended' points to screen lock timeouts and logging off. 'Repeated password guessing' points to account lockout. 'Malware spreads from USB sticks' points to disabling AutoRun and AutoPlay. 'Anyone can sign in without an account' points to disabling the Guest account. 'Temporary contractor' points to account expiration. 'Someone booted the PC from USB' points to a BIOS/UEFI password and boot order restrictions."
  ],
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface by removing, disabling and securing features."
   ],
   [
    "Data-at-rest encryption",
    "Encrypting stored data, for example with BitLocker or FileVault, so a stolen drive is unreadable."
   ],
   [
    "Password policy",
    "Rules for password length, complexity, history, expiration and lockout, often enforced by Group Policy."
   ],
   [
    "Account lockout",
    "Temporarily disabling an account after a set number of failed sign-in attempts."
   ],
   [
    "Screen lock timeout",
    "Automatically locking the session after a period of inactivity, requiring a password to resume."
   ],
   [
    "AutoRun and AutoPlay",
    "Features that launch or prompt actions when media is inserted; hardening disables them."
   ],
   [
    "Guest account",
    "A built-in account allowing access without personal credentials, which should remain disabled."
   ]
  ],
  "example": "During a walk-through, a security officer finds a finance clerk's PC unlocked with a payroll spreadsheet open while the clerk is at lunch. The IT team sets a Group Policy screen lock after a short idle period with a password required to resume, and reminds staff to press Windows key + L whenever they leave their desk.",
  "tip": "Lost or stolen laptop questions point to data-at-rest encryption. 'Users leave desks unattended' points to screen lock timeouts. 'Malware spreads from USB sticks' points to disabling AutoRun and AutoPlay.",
  "check": [
   [
    "Why does a Windows sign-in password not protect data on a stolen hard drive?",
    "The drive can be read in another computer; only data-at-rest encryption such as BitLocker protects it."
   ],
   [
    "Which password policy setting slows brute-force guessing?",
    "Account lockout after a set number of failed attempts."
   ],
   [
    "What keyboard shortcut locks a Windows workstation?",
    "Windows key + L."
   ],
   [
    "Why disable AutoPlay?",
    "So inserted media cannot automatically trigger actions, reducing the spread of malware from removable drives."
   ]
  ]
 },
 {
  "t": "Mobile device security: screen locks, remote wipe, locator apps, OS updates, device encryption, remote backup, MDM, BYOD vs corporate-owned",
  "body": [
   "Phones and tablets carry email, files, authenticator apps and company chat, and they are easily lost or stolen. Mobile security aims to keep a lost device from becoming a data breach, to keep devices free of malware and to let the organization manage devices it does not physically control. The exam tests which control fits each scenario and how ownership changes what you are allowed to do.",
   "The first control is the screen lock. Options include a PIN, a passcode or password, a pattern (swipe) lock, fingerprint and facial recognition. Biometrics are convenient, but a strong PIN or passcode remains the fallback and the root of the protection. Devices can be configured to erase themselves or impose increasing delays after a number of failed attempts, which defeats guessing. A short auto-lock timeout matters too, because an unlocked phone left on a table bypasses every other control.",
   "Device encryption protects data at rest. Modern iOS and Android devices encrypt storage by default when a screen lock is set, and the encryption key is tied to the lock, so a weak or missing lock weakens the protection. Keep the OS updated: updates patch vulnerabilities that attackers use, and devices that no longer receive updates (end-of-life models) should be replaced for business use. App updates matter as well, and apps should come from the official stores rather than side-loaded files.",
   "If a device is lost, locator apps (such as Find My on Apple devices and Google's Find Hub, formerly Find My Device, on Android) show its location, play a sound, lock it and display a contact message. If the device cannot be recovered, remote wipe erases it so the data cannot be read. Remote wipe only works if the feature was enabled beforehand and the device can reach the network. Remote backup, such as iCloud, Google backup or the organization's cloud services, means that wiping a device does not mean losing the data. Activation lock ties the device to the owner's account so a thief cannot reset and reuse it.",
   "Mobile device management (MDM) lets an organization enforce all of this centrally: require passcodes and encryption, push Wi-Fi, email and VPN settings, install or block apps, enforce minimum OS versions, and lock or wipe devices remotely. Mobile application management (MAM) focuses on managing just the company's apps and data. Compliance checks often run before a device may reach corporate resources, so a jailbroken or rooted, out-of-date phone can be blocked. Ownership models shape what is appropriate. With BYOD (bring your own device), employees use personal phones for work; it saves money but the company must respect privacy, so it typically manages only a separate work profile or container and performs a selective wipe that removes corporate data only. With corporate-owned devices, the organization can manage fully, including full wipes. Variants include COPE (corporate-owned, personally enabled) and CYOD (choose your own device from an approved list). An acceptable use policy should spell out the rules for each model.",
   "Consider a worked example. A sales manager leaves her personal phone, enrolled under the company's BYOD programme, in a taxi. She reports it within the hour. The help desk uses the locator to confirm it is moving across town, locks it with a message, and when it is not recovered by the end of the day, issues a selective wipe through MDM that removes the work profile, company email and files while leaving her personal photos untouched. Because her work data lives in cloud services, nothing is lost, and her replacement phone is enrolled the next morning.",
   "Common mistakes: assuming remote wipe can be switched on after the device is lost; performing a full wipe on an employee's personal BYOD phone; relying on biometrics alone without a strong fallback passcode; keeping end-of-life phones in service because they still work; and allowing jailbroken or rooted devices to connect to company email. Another trap is confusing a locator app, which finds the device, with remote backup, which protects the data.",
   "Exam wording gives the answer. 'Prevent data access on a lost phone' is remote wipe, with screen lock and encryption as the first line. 'Find a misplaced tablet' is a locator app. 'Enforce passcodes on all company phones' is MDM. 'Employees use personal phones; protect company data without touching personal data' is a work profile with selective wipe under BYOD. 'Phone no longer receives updates' means replace it. 'Keep data after a wipe' is remote backup. 'Company buys phones but allows personal use' is COPE."
  ],
  "terms": [
   [
    "Screen lock",
    "A PIN, passcode, pattern or biometric required to unlock a mobile device."
   ],
   [
    "Remote wipe",
    "Erasing a device's data remotely, which must be configured before loss."
   ],
   [
    "Locator app",
    "A service that shows a lost device's location and can lock it or play a sound."
   ],
   [
    "Device encryption",
    "Encryption of mobile storage tied to the screen lock to protect data at rest."
   ],
   [
    "Mobile device management (MDM)",
    "Central tools to enforce policy, configure, lock and wipe mobile devices."
   ],
   [
    "BYOD",
    "Bring your own device, where employees use personal devices for work, usually with a separate work profile."
   ],
   [
    "Selective wipe",
    "Removing only corporate apps and data from a device while leaving personal data intact."
   ],
   [
    "COPE",
    "Corporate-owned, personally enabled devices that the company owns but allows some personal use."
   ]
  ],
  "example": "A company notices an employee's phone has not installed OS updates for months because the model reached end of support. MDM compliance marks it non-compliant and blocks its access to company email. The employee receives a supported phone under the CYOD programme, enrols it in MDM and regains access the same day.",
  "tip": "For BYOD, the answer is usually a work profile plus a selective wipe of corporate data, not a full wipe of the employee's personal phone. Remote wipe only works if it was set up before the device was lost.",
  "check": [
   [
    "Why must remote wipe be configured before a device is lost?",
    "The device must already be enrolled and able to receive the wipe command; it cannot be set up afterward."
   ],
   [
    "On a BYOD phone, what type of wipe protects company data while respecting privacy?",
    "A selective wipe that removes only the work profile, apps and data."
   ],
   [
    "What is the relationship between a phone's screen lock and its encryption?",
    "Encryption is enabled and keyed to the lock, so a strong lock makes encryption effective."
   ],
   [
    "Which tool enforces passcode and OS version requirements across company phones?",
    "Mobile device management (MDM)."
   ]
  ]
 },
 {
  "t": "Data destruction: shredding, drilling, degaussing, incineration; erasing/wiping vs low-level vs standard format; certificates of destruction",
  "body": [
   "When storage devices leave service, the data on them must not leave with them. Deleting files or even formatting a drive does not reliably remove data, and freely available recovery tools can often retrieve it. Organizations therefore choose between sanitizing a device so it can be reused, donated or resold, and physically destroying it so it can never be read. The right choice depends on how sensitive the data is, whether the device has any reuse value and what regulations apply.",
   "Physical destruction methods come first. Shredding feeds drives, tapes, optical discs or paper into an industrial shredder that cuts them into small pieces, and is thorough for every media type. Drilling puts holes through a hard disk's platters, which quickly makes the drive unusable, although fragments of platter between the holes could in theory still hold data, so it is less thorough than shredding. For SSDs (solid-state drives), the memory chips themselves must be destroyed. Incineration burns media completely and is often used for paper and highly sensitive items. Pulverizing and crushing are related methods.",
   "Degaussing exposes magnetic media, meaning hard disk platters and tapes, to a very strong magnetic field that scrambles the stored data. It usually also destroys the drive's servo information, so the drive cannot be reused afterward. Degaussing does not work on SSDs, flash drives or optical discs, because they do not store data magnetically. This is one of the most frequently tested facts in the topic.",
   "Sanitizing for reuse is the other path. Erasing or wiping software overwrites every addressable location on the drive, often with zeros or random data, so previous data cannot be read. For SSDs, use the manufacturer's secure erase command or the drive's built-in sanitize feature, because wear leveling means ordinary overwriting may miss some cells. Self-encrypting drives can be sanitized by cryptographic erase, which destroys the encryption key so the remaining data is unreadable. Choose sanitizing when the device will be reused inside the organization, donated or returned at the end of a lease.",
   "Know how formats differ. A standard format, such as a quick format in Windows, creates a new empty file system and marks the space as free, but the old data remains on the disk until it is overwritten and can be recovered. A full format in modern Windows also writes zeros across the volume, which is better, but it is not a formal, verified sanitization process. A low-level format originally meant rewriting the drive's physical sector structure at the factory; modern drives cannot be truly low-level formatted by users, and what tools call a low-level format today is really a manufacturer's zero-fill utility. For the exam, remember that standard formats leave data recoverable, while wiping or low-level formatting with drive tools makes recovery much harder. Many organizations use a third-party destruction vendor, which should provide a certificate of destruction listing the devices (often by serial number), the method and the date. This document proves the organization met its legal and regulatory obligations and completes the asset's life-cycle record.",
   "Consider a worked example. A hospital retires 200 desktops. The hard drives held patient records, so policy requires destruction. The hospital hires a certified vendor that shreds the drives on site while a staff member watches, then issues a certificate of destruction listing every serial number. Meanwhile, twenty newer laptops with SSDs will be donated to a school, so technicians run each drive's manufacturer secure erase utility, verify the result and record it in the asset system before the laptops leave the building.",
   "Common mistakes: degaussing an SSD or USB stick and assuming the data is gone; treating a quick format as sanitization; relying on ordinary overwriting for SSDs; drilling a drive holding highly sensitive data when shredding is required; and failing to get a certificate of destruction from a vendor, which leaves no proof that obligations were met. Another trap is destroying drives that could have been securely wiped and reused, when policy allows reuse.",
   "Exam questions hinge on reuse and media type. 'The drive will be reused or donated' points to wiping or secure erase. 'The data must never be recoverable' points to shredding or incineration. 'Magnetic tapes and hard disks, quickly' suggests degaussing, but 'SSD' or 'flash' rules it out. 'Files were recovered after formatting' means a standard format was used. 'Proof that a vendor destroyed the drives' is a certificate of destruction."
  ],
  "terms": [
   [
    "Shredding",
    "Mechanically cutting media into small pieces so it cannot be read or reassembled."
   ],
   [
    "Degaussing",
    "Using a strong magnetic field to erase magnetic media; ineffective on SSDs, flash and optical discs."
   ],
   [
    "Drilling",
    "Boring holes through drive platters to make a drive unusable, less thorough than shredding."
   ],
   [
    "Incineration",
    "Burning media completely, often for paper and highly sensitive material."
   ],
   [
    "Wiping",
    "Overwriting all addressable storage so previous data cannot be recovered, allowing reuse."
   ],
   [
    "Standard format",
    "Creating a new empty file system without removing old data, which remains recoverable."
   ],
   [
    "Secure erase",
    "A drive's built-in command, important for SSDs, that sanitizes all cells including those hidden by wear leveling."
   ],
   [
    "Certificate of destruction",
    "A vendor's document recording which devices were destroyed, how and when."
   ]
  ],
  "example": "A small business sells old office PCs online after quick-formatting the drives. A buyer runs a free recovery tool and finds customer invoices. The business changes its process: drives from future sales are wiped with a verified overwrite or secure erase, and drives that held payment data are shredded by a vendor that issues certificates of destruction.",
  "tip": "Degaussing does nothing to SSDs or flash media, and a quick or standard format does not remove data. If the drive must be reused, wipe it; if it must never be readable again, physically destroy it and get a certificate.",
  "check": [
   [
    "Why is degaussing ineffective on an SSD?",
    "SSDs store data in flash memory rather than magnetically, so a magnetic field does not erase them."
   ],
   [
    "A drive is quick-formatted and sold. Can the data be recovered?",
    "Yes, a standard format only creates a new file system and leaves the old data until it is overwritten."
   ],
   [
    "Which method lets a hard drive be safely reused?",
    "Wiping, meaning overwriting all data with a verified tool, or a manufacturer secure erase."
   ],
   [
    "What does a certificate of destruction provide?",
    "Documented proof of which devices were destroyed, by what method and when, for compliance records."
   ]
  ]
 },
 {
  "t": "SOHO router hardening: default passwords, firmware updates, disabling WPS and UPnP, content filtering, port forwarding, DHCP reservations, guest networks",
  "body": [
   "A SOHO (small office/home office) router usually combines several devices in one box: a router, a small switch, a wireless access point, a basic firewall and a DHCP (Dynamic Host Configuration Protocol) server that hands out IP addresses. Out of the box it is configured for easy installation, not for security. Anyone who knows the model can guess its default settings, and features that make setup painless also make attacks easier. Hardening the router is therefore one of the first jobs a technician does in a small office, because every computer, printer and phone behind it depends on it.",
   "Start with access to the router itself. Change the default administrator username and password first, since default credentials are printed in manuals, published online and tried automatically by attackers and botnets. Disable remote management from the internet (sometimes called WAN-side administration) so the admin page is reachable only from inside the network, and use the HTTPS management option if the router offers it. Change the default SSID (service set identifier, the Wi-Fi network name) if it reveals the brand or model, and set WPA3, or WPA2 with AES (Advanced Encryption Standard) where older devices require it, with a long passphrase. Hiding the SSID by disabling its broadcast is listed as an option, but it only hides the name from casual view; tools still detect the network, so it is not real protection. Place the router in a secure location where visitors cannot press its reset button, and adjust transmit power and channel so the signal does not spread far beyond the premises.",
   "Next, update the firmware. Firmware is the router's operating system, and vendors release updates to fix security flaws. Check the router's update page or the vendor's support site, enable automatic updates if available, and plan to replace any router the vendor no longer supports, because an unpatched router stays vulnerable forever. Then disable features that trade security for convenience. WPS (Wi-Fi Protected Setup) lets devices join by pushing a button or entering an eight-digit PIN; the PIN method has a design weakness that lets it be guessed quickly, so turn WPS off. UPnP (Universal Plug and Play) lets devices and applications automatically open ports on the router with no approval, which malware can abuse to expose internal systems, so disable it unless a documented need exists.",
   "Then control traffic in and out. Port forwarding sends traffic arriving on a specific external port to one internal IP address and port, for example so a remote technician can reach a camera recorder. Forward only what is needed, to the exact device, and remove unused rules. Because the rule points at an internal IP, that device needs an address that never changes: either a DHCP reservation, which ties an IP address to the device's MAC (media access control) address, or a static IP outside the DHCP pool. A screened subnet (formerly DMZ) places an internet-facing device in a separate zone, which is safer than forwarding many ports to the main LAN. Content filtering blocks categories of websites or specific domains, and IP filtering allows or blocks specific addresses. MAC filtering exists too, but MAC addresses are easy to spoof, so treat it as a weak control.",
   "Finally, separate visitors and gadgets. A guest network gives visitors internet access on its own SSID and network segment, isolated from office computers, printers and file shares. Enable it only when needed, give it its own passphrase, and turn on client isolation if offered. Many offices also put smart TVs, cameras and other IoT (Internet of Things) devices on a separate network so a compromised gadget cannot reach work computers. If the office does not need guest access, disable the guest network entirely.",
   "Consider a worked example. A small accounting firm's router still uses its factory admin password, WPS and UPnP are enabled, and visitors get the main Wi-Fi passphrase. The firm also needs remote access to its network video recorder. You update the firmware, set a unique admin password, disable remote management, WPS and UPnP, and switch to WPA3 with WPA2 fallback. You create a DHCP reservation for the video recorder and forward only its single required port to that reserved address. You set up an isolated guest SSID for clients and enable a content filter category for known malware sites.",
   "Common mistakes: forwarding a port to a device that still receives a dynamic address, so the rule breaks when the address changes; believing a hidden SSID or MAC filtering is strong security; updating firmware once and never again; leaving WPS on because the push-button method seems harmless; and giving guests the main network's passphrase instead of a guest network.",
   "Exam questions usually give a scenario and ask for the first or best step. 'New router, what should you do first' points to changing the default admin password. 'A port forward stops working after a power outage' points to a missing DHCP reservation or static IP. 'Malware opened ports on the router without anyone configuring them' points to UPnP. 'A PIN-based setup feature can be brute-forced' points to WPS. 'Visitors need internet but must not reach internal resources' points to a guest network, and 'block gambling or known malicious sites' points to content filtering."
  ],
  "terms": [
   [
    "SOHO router",
    "An all-in-one device combining routing, switching, wireless access, firewall and DHCP for a small office or home."
   ],
   [
    "WPS (Wi-Fi Protected Setup)",
    "A convenience feature for joining Wi-Fi by button or PIN whose PIN method can be guessed quickly, so it should be disabled."
   ],
   [
    "UPnP (Universal Plug and Play)",
    "A feature that lets devices open router ports automatically without approval, which malware can abuse."
   ],
   [
    "Port forwarding",
    "A rule that sends traffic arriving on an external port to a specific internal IP address and port."
   ],
   [
    "DHCP reservation",
    "A setting that always gives the same IP address to a device identified by its MAC address."
   ],
   [
    "Content filtering",
    "Blocking websites by category or domain at the router or another filtering device."
   ],
   [
    "Guest network",
    "A separate SSID and network segment that gives visitors internet access without reaching internal resources."
   ],
   [
    "Screened subnet",
    "A separate network zone, formerly called a DMZ, for devices that must be reachable from the internet."
   ]
  ],
  "example": "A dental office's router has WPS on, UPnP on and the default admin password, and patients use the staff Wi-Fi. A technician updates the firmware, changes the admin password, disables WPS, UPnP and remote administration, reserves an address for the imaging server, forwards only the one port its vendor needs for support, and creates an isolated guest SSID for the waiting room.",
  "tip": "The first hardening step for any SOHO router is changing the default admin password. Port forwarding needs a stable internal address, so pair it with a DHCP reservation or static IP. Ports opening by themselves means UPnP; a guessable setup PIN means WPS.",
  "check": [
   [
    "What is the first thing you should change on a newly installed SOHO router?",
    "The default administrator password, because default credentials are publicly known and tried automatically by attackers."
   ],
   [
    "A port-forwarding rule to a security camera stops working after the router reboots. What is the likely fix?",
    "Give the camera a DHCP reservation or a static IP outside the pool, because it received a different dynamic address and the rule now points to the wrong device."
   ],
   [
    "Why should UPnP usually be disabled?",
    "It lets any device or program on the network open ports on the router without approval, and malware can use it to expose internal systems."
   ],
   [
    "How does a guest network protect an office?",
    "It gives visitors internet access on a separate SSID and segment, so their devices cannot reach office computers, printers or shares."
   ]
  ]
 },
 {
  "t": "Browser security: trusted sources and hash checks, extensions, password managers, certificates, pop-up blockers, clearing cache, private browsing, profile sync",
  "body": [
   "The web browser is where users meet most online threats, from fake downloads and malicious extensions to phishing pages. It holds saved passwords, session cookies and synced data, so securing it protects much more than web surfing. As a technician you will install and configure browsers, clean up problems and advise users, and the exam expects you to know what each browser security feature does and, just as important, what it does not do.",
   "Start with where software comes from. Install browsers, extensions and applications only from trusted sources: the vendor's official site or an official app or extension store. Avoid download mirrors and ads styled as download buttons, which often bundle adware. When a vendor publishes a hash, such as a SHA-256 (Secure Hash Algorithm, 256-bit) value, compute the hash of your downloaded file and compare. Matching hashes show the file was not altered or corrupted; a mismatch means do not install it. On Windows you can use `certutil -hashfile file.iso SHA256` or PowerShell's `Get-FileHash file.iso`, and on Linux or macOS `sha256sum` or `shasum -a 256`.",
   "Extensions (add-ons or plug-ins) add features, but many can read and change every page you visit. A malicious extension, or a legitimate one that was sold to a new owner and updated with bad code, can steal data, inject ads or redirect searches. Install only extensions you need, from the official store and reputable developers, review the permissions they request, and remove unused ones. Organizations can allow-list approved extensions through group policy or device management. Password managers generate and store a unique, strong password for every site and fill it automatically. They also help against phishing, because a manager will not auto-fill on a look-alike domain. Browsers include built-in managers, and standalone managers work across browsers and devices; protect either with a strong master password and MFA (multifactor authentication).",
   "Certificates make HTTPS work. A site presents a digital certificate issued by a trusted certificate authority (CA). The browser checks that it is valid, unexpired, issued for the site's name and chains to a trusted root, then sets up an encrypted connection and shows a padlock. The padlock means the connection is encrypted to that domain, not that the site is honest; phishing sites can have valid certificates. Certificate warnings (expired, name mismatch, untrusted issuer) should never be clicked through casually, because they may signal an on-path attack. Organizations may install their own internal CA certificate on managed devices so internal sites are trusted.",
   "Several features handle everyday privacy. Pop-up blockers stop sites from opening unwanted windows, often ads or scams, and you can allow pop-ups for specific trusted sites, such as a bank's statement viewer. Clearing the cache and cookies removes stored website data; it fixes many display and sign-in problems and removes tracking data, but it also signs the user out of sites. Private browsing (Incognito, InPrivate) does not keep history, cookies or form data after the window closes, which suits shared computers. It does not hide activity from the network, the employer, the ISP or the sites visited, and it offers no malware protection. Profile sync signs the browser into an account so bookmarks, passwords, history, extensions and settings follow the user to other devices. It is convenient, but it spreads saved passwords and extensions everywhere, so protect the sync account with MFA and keep personal and work profiles separate. Keep the browser itself updated, since browsers patch serious vulnerabilities often.",
   "Consider a worked example. A user's searches keep landing on an unfamiliar search engine full of ads. You open the extension manager and find a 'PDF converter' add-on installed from a pop-up, with permission to read and change data on all sites. You remove it, reset the default search engine and home page, clear the cache and check that the extension does not return through sync. You then show the user how to install extensions only from the official store and check the permissions before clicking add.",
   "Common mistakes: believing private browsing makes the user anonymous or protects against malware; treating the padlock as proof a site is trustworthy; clearing the cache and being surprised that the user is signed out everywhere; syncing a personal browser profile, with its extensions, onto a corporate laptop; and skipping hash checks because the download 'looks fine'. Another trap is disabling the pop-up blocker entirely when only one trusted site needs an exception.",
   "Exam questions tend to use clear clue words. 'Verify a downloaded file has not been altered' points to comparing hashes. 'Unique strong password for every site' points to a password manager. 'Shared computer, leave no history' points to private browsing. 'Bookmarks and passwords on every device' points to profile sync. 'Site displays fine after clearing stored data' points to clearing the cache, and 'untrusted issuer' or 'name mismatch' points to a certificate problem."
  ],
  "terms": [
   [
    "Hash check",
    "Comparing a computed hash of a downloaded file with the vendor's published value to confirm the file was not altered."
   ],
   [
    "Browser extension",
    "An add-on that extends browser features and may be able to read and change the pages you visit."
   ],
   [
    "Password manager",
    "A tool that generates, stores and auto-fills unique strong passwords and will not fill them on look-alike domains."
   ],
   [
    "Certificate authority (CA)",
    "A trusted organization that issues digital certificates binding a public key to a domain name."
   ],
   [
    "Pop-up blocker",
    "A browser feature that stops sites from opening unwanted new windows, with exceptions for trusted sites."
   ],
   [
    "Private browsing",
    "A mode that does not keep history, cookies or form data after the window closes, without hiding activity from networks or sites."
   ],
   [
    "Profile sync",
    "Signing the browser into an account so bookmarks, passwords, extensions and settings follow the user across devices."
   ]
  ],
  "example": "A new hire downloads a free video player from an ad-filled mirror site, and the next day the browser shows ads on every page. The technician removes the bundled adware and two extensions it added, then reinstalls the player from the vendor's site after comparing its SHA-256 hash with the published value. They also turn on the browser's built-in password manager with MFA on the sync account.",
  "tip": "Private browsing only avoids saving history, cookies and form data on the local device; it is not anonymity or malware protection. A valid padlock proves encryption to a named domain, not that the site is trustworthy.",
  "check": [
   [
    "How do you confirm that a downloaded installer matches what the vendor published?",
    "Compute its hash, for example with Get-FileHash or certutil, and compare it to the vendor's published hash; a match shows it was not altered."
   ],
   [
    "A user wants no browsing history left on a library computer. What should they use, and what does it not protect against?",
    "Private browsing; it does not hide activity from the network or sites and does not protect against malware."
   ],
   [
    "Why does a password manager help against phishing?",
    "It fills passwords only on the exact domain they were saved for, so it will not fill them on a look-alike phishing site."
   ],
   [
    "What is a side effect of clearing the browser cache and cookies?",
    "The user is signed out of websites and loses saved site preferences, although display and sign-in problems are often fixed."
   ]
  ]
 },
 {
  "t": "Windows symptoms: blue screen (BSOD), degraded performance, boot problems, frequent shutdowns, services not starting, application crashes, low memory warnings, USB controller resource warnings, system instability, no OS found, slow profile load, time drift",
  "body": [
   "Troubleshooting starts with recognizing a symptom and knowing what it usually points to. The exam describes what a user sees and asks for the most likely cause or the best next step, so you need a mental map from each symptom to its common causes. Before jumping to fixes, ask three questions every time: what changed recently, does it affect one user or many, and is it more likely hardware or software? These questions narrow the list quickly and are the start of the CompTIA troubleshooting methodology.",
   "A blue screen of death (BSOD), also called a stop error, means Windows hit a fatal error and halted to protect data. The screen shows a stop code, such as IRQL_NOT_LESS_OR_EQUAL, and Windows writes a memory dump file. Common causes are faulty or incompatible drivers, failing RAM, overheating, disk errors and recent hardware or software changes. Write down the stop code, check Event Viewer and Reliability Monitor, and think about what changed. System instability, meaning random freezes, restarts and odd errors without a clear pattern, has the same list of suspects plus malware and power problems.",
   "Degraded performance, where the PC is simply slow, often comes from too many startup programs, a nearly full disk, too little RAM for the workload, a failing drive, malware, background updates or thermal throttling. Low memory warnings mean the system is running out of RAM and virtual memory; a program with a memory leak, too many open applications or a small paging file can cause them. Application crashes come from bugs, corrupt installations, missing dependencies, incompatible versions or damaged user settings. Services not starting usually trace to a disabled service, a failed dependency, wrong service account credentials or corrupt files; the Services console (`services.msc`) and the System log show the reason.",
   "Boot problems deserve special care. 'No OS found' (or 'Operating system not found') means the firmware found no bootable disk. Check the boot order in UEFI (Unified Extensible Firmware Interface) or BIOS settings, look for a USB stick or disc left attached, confirm the drive is detected at all, and consider damaged boot records or boot configuration. 'Bootmgr is missing' and similar messages point to damaged boot files, which Startup Repair can often fix. Frequent shutdowns, where the PC powers off suddenly with no BSOD, point strongly to overheating (dust, a failed fan, dried thermal paste) or a failing power supply, rather than software. A slow profile load, a long wait at the Welcome screen, often comes from a large or corrupt roaming profile, slow connections to mapped drives or logon scripts, or a corrupt local profile, which may also cause Windows to sign the user in with a temporary profile.",
   "Two symptoms are easy to forget. USB controller resource warnings appear when too many devices share one USB controller and it runs out of resources, such as endpoints or bandwidth. Moving devices to ports on a different controller, removing a hub, or updating chipset drivers usually fixes it. Time drift means the system clock is wrong or slowly wanders. Causes include a failing CMOS battery (time resets after the PC loses power), a wrong time zone, and failure to sync with a time source using NTP (Network Time Protocol) or, in a domain, the domain controller. Time matters: Kerberos authentication fails when clocks differ too much, and certificate checks can fail, so drift often shows up as sign-in or HTTPS errors.",
   "Consider a worked example. A workstation shows a BSOD every afternoon, and the stop code names a network driver file. You open Reliability Monitor and see the crashes began the day after a new network adapter driver was installed. The pattern, a specific driver and a recent change, tells you the cause is almost certainly the driver, not RAM or heat. You roll back the driver in Device Manager, the crashes stop, and you record the driver version in the ticket so it is not redeployed.",
   "Common mistakes: reinstalling Windows for a BSOD before reading the stop code and checking recent changes; blaming software for sudden power-offs that are really heat or power supply failures; overlooking a USB drive left in the port when a PC reports no OS found; treating a clock that resets after unplugging as a software problem instead of a CMOS battery; and assuming a slow profile load is the PC's fault when the delay is really waiting on a network share or script.",
   "Exam questions map clue words to causes. 'Stop error after installing a new driver' points to the driver. 'Shuts down without warning, especially under load' points to overheating or the power supply. 'Clock is wrong every morning after unplugging' points to the CMOS battery. 'Cannot log on to the domain and the time is off' points to time drift and Kerberos. 'Operating system not found with a flash drive attached' points to boot order. 'Not enough USB controller resources' points to redistributing devices across controllers, and 'user gets a temporary profile' points to a corrupt profile."
  ],
  "terms": [
   [
    "BSOD (stop error)",
    "A Windows fatal error screen that halts the system and shows a stop code, often caused by drivers, RAM or heat."
   ],
   [
    "Stop code",
    "The identifier on a blue screen that names the kind of fatal error and helps locate the cause."
   ],
   [
    "Memory leak",
    "A program fault where memory is allocated but never released, gradually exhausting RAM."
   ],
   [
    "No OS found",
    "A boot error meaning firmware could not find a bootable operating system on the devices in the boot order."
   ],
   [
    "USB controller resource warning",
    "A message that a USB controller has run out of endpoints or bandwidth because too many devices share it."
   ],
   [
    "Time drift",
    "A system clock that is wrong or gradually wanders, which can break Kerberos authentication and certificate checks."
   ],
   [
    "CMOS battery",
    "The small motherboard battery that keeps firmware settings and the real-time clock while the PC is unplugged."
   ]
  ],
  "example": "Several users in one office cannot sign in to the domain, and they see an error about the time. Their PCs show clocks eight minutes behind the domain controller. The technician finds that a recent group policy change broke time synchronization, fixes the policy, forces a resync, and sign-ins succeed because Kerberos tolerates only a small clock difference.",
  "tip": "Unexpected shutdowns without a BSOD usually mean heat or power. 'No OS found' often means boot order or a USB drive left attached. A clock that resets after power loss means the CMOS battery, and domain sign-in failures with a wrong clock mean time drift.",
  "check": [
   [
    "A PC powers off suddenly several times a day with no blue screen. What are the most likely causes?",
    "Overheating or a failing power supply, because sudden power-offs without a stop error usually come from hardware protection or power loss."
   ],
   [
    "A computer reports that no operating system was found after a user left a flash drive in. What should you check first?",
    "The boot order and any attached USB drives, because the firmware may be trying to boot from the flash drive."
   ],
   [
    "Why can time drift cause domain sign-in failures?",
    "Kerberos authentication requires client and domain controller clocks to be close, so a large difference makes tickets invalid."
   ],
   [
    "What does a USB controller resource warning mean, and how is it usually fixed?",
    "Too many devices share one controller's resources; move some devices to ports on another controller or remove a hub."
   ]
  ]
 },
 {
  "t": "Windows fixes: reboot, restart services, uninstall/reinstall/update apps, add resources, verify requirements, sfc and DISM, repair Windows, System Restore, reimage, roll back updates, rebuild the user profile",
  "body": [
   "Once you have identified a probable cause, you need to choose a fix. The guiding rule is to try the least disruptive fix that addresses the cause, then escalate to more drastic options only if needed. A reboot costs the user a minute; a reimage can cost a day. Before anything that could lose data, back up the user's files, and document every step in the ticket so the next technician knows what was tried.",
   "Start simple. A reboot clears memory, restarts services and completes pending updates, and it fixes a surprising number of problems. Choose Restart rather than Shut down, because with fast startup enabled a shutdown saves the kernel session instead of fully reloading it. If one service has stopped, restart it in the Services console (`services.msc`) or Task Manager's Services tab, check its startup type and dependencies, and read the System log for the reason it failed. For a misbehaving application, update it first, since the vendor may have fixed the bug; then try the Repair or Reset option in Settings > Apps; then uninstall and reinstall it to replace damaged files and settings. Some problems are really capacity or compatibility. If the system lacks capacity, add resources: more RAM for low-memory warnings, a larger or faster drive for a full disk, or a larger paging file. Before blaming Windows, verify requirements: confirm the application, driver or OS version meets the vendor's stated requirements for CPU, RAM, storage, OS edition and 32-bit or 64-bit architecture. An app that needs more than the hardware offers will never run well no matter how often you reinstall it.",
   "For corrupted system files, use the built-in repair tools from an elevated prompt. `sfc /scannow` (System File Checker) scans protected system files and replaces damaged ones from the local component store. If sfc reports it could not fix everything, the component store itself may be damaged, so run DISM (Deployment Image Servicing and Management) to repair it, then run sfc again. If Windows is badly damaged, repair Windows: use Startup Repair from the Windows Recovery Environment (WinRE) for boot problems, or perform an in-place repair install (running setup over the existing installation) that reinstalls Windows while keeping apps and files.",
   "```\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\nsfc /scannow\n```",
   "When problems began after a change, undo the change. System Restore returns system files, drivers, registry settings and installed programs to a restore point without touching personal documents. Roll back a driver in Device Manager, and roll back updates by uninstalling a recent quality update from Settings > Windows Update > Update history > Uninstall updates, or by going back to the previous feature version within the allowed period; pause updates while you wait for a vendor fix. For problems that affect only one user, such as settings not saving, a temporary profile, or apps crashing only for that person, rebuild the user profile: back up the user's data, sign in as another administrator, rename or remove the damaged profile folder and its entry under the ProfileList registry key, have the user sign in to create a fresh profile, then copy data back. When the system is heavily damaged, infected beyond confidence, or would take longer to fix than to rebuild, reimage it with the standard image or use Reset this PC, which can keep or remove personal files.",
   "Consider a worked example. After a monthly update, a line-of-business app crashes on start for every user on one PC model. Reliability Monitor shows the crashes began the morning after the update installed, and other models without the update are fine. You uninstall that specific update from Update history, pause updates on those machines, confirm the app works, and report the conflict to the vendor. You did not reinstall the app or reimage, because the evidence pointed to the update.",
   "Common mistakes: reimaging first because it is familiar, losing time and user data; running DISM without then running sfc again; forgetting to back up before a profile rebuild; using System Restore expecting it to recover deleted documents, which it does not do; and treating a single user's problem as a system-wide one.",
   "Exam questions reward order and matching. 'Only one user affected' points to rebuilding the profile. 'Problem began after an update' points to rolling back the update. 'sfc cannot repair files' points to DISM. 'Undo recent driver and program changes but keep documents' points to System Restore, and 'malware cannot be removed with confidence' points to reimaging."
  ],
  "terms": [
   [
    "sfc /scannow",
    "The System File Checker command that scans and repairs protected Windows system files from the component store."
   ],
   [
    "DISM",
    "Deployment Image Servicing and Management, used with /RestoreHealth to repair the component store that sfc depends on."
   ],
   [
    "System Restore",
    "A feature that returns system files, drivers, registry and programs to an earlier restore point without changing personal files."
   ],
   [
    "In-place repair install",
    "Running Windows setup over the existing installation to replace system files while keeping apps and data."
   ],
   [
    "Reimage",
    "Wiping a computer and reinstalling a standard operating system image, the most thorough and disruptive fix."
   ],
   [
    "Rebuilding a user profile",
    "Replacing a corrupt Windows user profile with a fresh one and copying the user's data back."
   ],
   [
    "Roll back",
    "Reverting a driver or update to the previous version when the new one causes problems."
   ]
  ],
  "example": "A user's Start menu and search stop working, but only on her account; another user on the same PC has no problem. The technician backs up her documents and desktop, renames her profile folder, removes its ProfileList registry entry, has her sign in to generate a new profile, and copies her data back. Everything works, and the ticket notes the profile corruption as the cause.",
  "tip": "Pick the least invasive fix that matches the cause: restart before reinstall, update or repair the app before repairing Windows, sfc then DISM then sfc, System Restore before reimage. If only one user has the problem, suspect the profile.",
  "check": [
   [
    "sfc /scannow reports that some files could not be repaired. What should you run next?",
    "DISM /Online /Cleanup-Image /RestoreHealth to repair the component store, then run sfc /scannow again."
   ],
   [
    "Does System Restore bring back a document the user deleted yesterday?",
    "No. System Restore changes system files, drivers, registry and programs, not personal files."
   ],
   [
    "An app crashes for one user but works for others on the same PC. What fix is most likely?",
    "Rebuild that user's profile, after backing up their data, because the problem follows the profile."
   ],
   [
    "When is reimaging the right choice?",
    "When the system is heavily damaged or infected beyond confidence, or when a rebuild is faster than further troubleshooting, after data is backed up."
   ]
  ]
 },
 {
  "t": "Using Event Viewer, Reliability Monitor, Task Manager and Safe Mode / Windows Recovery Environment to find root causes",
  "body": [
   "Guessing wastes time. Windows records a great deal about what goes wrong, and a handful of built-in tools let you trace a symptom back to its root cause instead of treating it again and again. Each tool answers a different question, so the skill the exam tests is choosing the right one for the situation: what is happening now, what was logged, what changed, and what to do when Windows will not start normally.",
   "Event Viewer (`eventvwr.msc`) is the central log reader. The main Windows logs are Application (events from programs), System (events from Windows components and drivers, such as service failures, disk errors and unexpected shutdowns) and Security (audited events such as successful and failed sign-ins). Setup and Forwarded Events also exist, and Applications and Services Logs hold detailed logs for individual components. Each event has a level (Information, Warning, Error, Critical), a date and time, a source and an Event ID. Filter the log by level and by the time the problem occurred, then look up the source and Event ID in vendor documentation. Custom views save useful filters for next time.",
   "Reliability Monitor (search for 'reliability history', or open Control Panel > Security and Maintenance) shows a day-by-day stability chart. Each day lists application failures, Windows failures, miscellaneous failures, warnings, and informational events such as software installs and successful updates. Because it places crashes next to installs on a single timeline, it is the fastest way to answer 'what changed right before this started?'. Click any event to see its details. Task Manager (Ctrl+Shift+Esc) shows what is happening right now. The Processes tab shows which program is using CPU, memory, disk or network; the Performance tab shows whether RAM, disk or CPU is saturated; the Startup apps tab lists programs that load at sign-in with their impact; and the Services tab shows running services. Resource Monitor, opened from the Performance tab, breaks down disk and network use per process.",
   "When Windows is too unstable to troubleshoot normally, Safe Mode starts it with a minimal set of drivers and services. If a problem disappears in Safe Mode, the cause is probably a third-party driver, startup program or service, and you can remove it from there. Safe Mode with Networking adds network drivers so you can download tools or updates, and Safe Mode with Command Prompt gives a command shell. You reach Safe Mode through WinRE's Startup Settings, or by setting Safe boot on the Boot tab of `msconfig`; remember to clear that setting afterward, or the PC will keep booting into Safe Mode.",
   "The Windows Recovery Environment (WinRE) is a small recovery operating system. It loads automatically after repeated failed boots, and you can reach it from Settings > System > Recovery > Advanced startup, by holding Shift while choosing Restart, or by booting installation media. Under Troubleshoot > Advanced options it offers Startup Repair, Startup Settings (including Safe Mode), System Restore, Uninstall Updates, System Image Recovery, UEFI Firmware Settings and a Command Prompt for tools such as `chkdsk`, `sfc` and boot-repair commands like `bootrec`. Together these let you fix a machine that never reaches the desktop.",
   "Consider a worked example. A laptop restarts on its own a few times a week. You open Reliability Monitor and see 'Windows was not properly shut down' on those days, with no application failures or installs just before. In Event Viewer's System log you find a Kernel-Power critical event (Event ID 41) each time, which means the system lost power or stopped responding without a clean shutdown; there is no BSOD recorded. The laptop's vents are clogged with dust. You clean the cooling system, monitor temperatures under load, and the unexpected restarts stop.",
   "Common mistakes: looking in the Application log for driver and service failures that are recorded in the System log; looking in the Security log for crashes when it only holds audit events; forgetting to turn off Safe boot in msconfig; using Task Manager to investigate something that happened yesterday, when it only shows the present; and reinstalling Windows when WinRE's Startup Repair or System Restore would have fixed the boot problem in minutes.",
   "Exam questions pair the need with the tool. 'Which process is using all the CPU right now' points to Task Manager. 'Failed sign-in attempts' points to the Security log in Event Viewer. 'A service failed to start at boot' points to the System log. 'Crashes began sometime last week; what changed' points to Reliability Monitor. 'Problem disappears when only essential drivers load' points to Safe Mode and a third-party driver or startup item. 'PC will not reach the desktop' points to WinRE and Startup Repair."
  ],
  "terms": [
   [
    "Event Viewer",
    "The Windows log reader showing Application, System, Security and other logs with levels, sources and Event IDs."
   ],
   [
    "Event ID",
    "A number that identifies a specific type of logged event and can be looked up in documentation."
   ],
   [
    "Reliability Monitor",
    "A timeline of failures, warnings and installs used to find what changed before a problem began."
   ],
   [
    "Task Manager",
    "A tool showing current processes, performance, startup apps and services."
   ],
   [
    "Resource Monitor",
    "A detailed view of per-process CPU, memory, disk and network activity, opened from Task Manager."
   ],
   [
    "Safe Mode",
    "A startup mode that loads only essential drivers and services to isolate third-party causes."
   ],
   [
    "Windows Recovery Environment (WinRE)",
    "A recovery OS offering Startup Repair, Safe Mode access, System Restore, uninstalling updates and a command prompt."
   ]
  ],
  "example": "A PC became very slow this morning. Task Manager's Processes tab shows a backup agent using nearly all disk activity. Reliability Monitor shows that agent was updated overnight, and Event Viewer's Application log shows it retrying a failed job every minute. The technician fixes the job's destination path, the agent calms down, and performance returns.",
  "tip": "Use the right tool for the question: 'what is slow right now' is Task Manager, 'what errors were logged' is Event Viewer, 'what changed before this started' is Reliability Monitor, and 'Windows will not boot' is WinRE.",
  "check": [
   [
    "Which Event Viewer log records failed sign-in attempts, and which records a driver or service failure?",
    "The Security log records audited sign-ins; the System log records driver and service failures."
   ],
   [
    "What does it tell you if a problem disappears in Safe Mode?",
    "The cause is probably a third-party driver, startup program or service, because Safe Mode loads only essential components."
   ],
   [
    "Which tool best shows that a crash started right after a software install?",
    "Reliability Monitor, because it shows failures and installs on the same day-by-day timeline."
   ],
   [
    "Name two ways to reach the Windows Recovery Environment.",
    "Hold Shift while choosing Restart, use Settings > System > Recovery > Advanced startup, boot from installation media, or let it load after repeated failed boots."
   ]
  ]
 },
 {
  "t": "Mobile OS and app issues: app fails to launch, close or update; slow response; poor battery life; random reboots; Bluetooth, Wi-Fi and NFC connectivity; screen won't autorotate",
  "body": [
   "Mobile troubleshooting follows the same method as PC troubleshooting, but the tools are simpler and the fixes follow a predictable ladder. From least to most disruptive: close and reopen the app, restart the device, update the app and the operating system, clear the app's cache or data, reinstall the app, reset network settings, and as a last resort back up and factory reset. Knowing that ladder lets you pick the right next step for each symptom, which is exactly what exam questions ask.",
   "When an app fails to launch or keeps crashing, force-stop it and try again, then restart the device. Check that both the app and the OS are up to date, because apps often break on outdated OS versions or before the developer supports a new one. On Android you can clear the app's cache and, if needed, its data from the app's settings page; clearing data resets the app to a fresh state and may sign the user out. On iOS you can offload the app (remove it but keep its documents) or delete and reinstall it. Check storage too, since many apps fail or refuse to update when the device is nearly full. An app that fails to close is usually frozen; swipe it away in the app switcher or restart the device. Apps that fail to update usually point to low storage, a poor connection, an app store account or payment problem, or an OS version the new release no longer supports.",
   "Slow response usually comes from low storage, too many apps running, an outdated OS, or an overheating device that throttles its processor. Freeing space, closing apps, updating and restarting are the standard fixes. Poor battery life comes from high screen brightness, apps running in the background, weak cellular signal (the radio works harder to stay connected), location services, and an aging battery. Check the battery usage screen to see which apps consume the most, restrict their background activity or location access, and check battery health, because batteries lose capacity over time. A swollen battery is a safety hazard: stop using and charging the device and send it for service. Random reboots may be caused by faulty apps, OS bugs fixed in updates, overheating, a failing battery or hardware faults. Update everything, look for a recently installed app, and if it persists, back up and reset or send the device for repair.",
   "For connectivity problems, check the obvious first: airplane mode is off and the right radio is on. For Wi-Fi, confirm the device is in range, forget the network and rejoin it with the correct password, and restart the access point if many devices are affected. For Bluetooth, confirm the accessory is charged and in pairing mode, unpair (forget) it and pair again, and make sure it is not still connected to another phone or laptop. For NFC (near-field communication), which powers contactless payments and tap-to-pair, confirm NFC is enabled, the payment app is set as the default, and the phone is held very close to the reader, since NFC works only over a few centimeters and thick or metal cases interfere. Resetting network settings clears saved Wi-Fi networks, Bluetooth pairings and VPN settings and fixes many stubborn issues, but the user must re-enter passwords afterward.",
   "When the screen won't autorotate, check that rotation lock (portrait orientation lock) is off in the control center or quick settings panel. Some apps and home screens do not rotate by design, so test in an app that should rotate, such as the browser or video player. If rotation still fails, restart the device; a persistent failure may point to a faulty accelerometer or gyroscope, the sensors that detect orientation.",
   "Consider a worked example. A user says her phone's battery barely lasts until lunch since last week. You open the battery usage screen and see a newly installed fitness app using most of the power in the background, with location access set to 'always'. You change its location access to 'only while using the app' and restrict its background activity. Battery life returns to normal the next day, and you did not need to reset anything, because the evidence pointed to one app.",
   "Common mistakes: factory resetting before trying the simple steps; forgetting that clearing app data or resetting network settings removes saved information the user will need to re-enter; replacing hardware for a rotation problem that is only rotation lock; ignoring storage when apps will not update; and treating a swollen battery as a battery-life issue rather than a safety hazard. Another trap is assuming Bluetooth is broken when the accessory is simply still paired to another device.",
   "Exam questions use clear clue words. 'Screen will not rotate' points to rotation lock first. 'App will not update' points to storage, connectivity or OS compatibility. 'Battery drains fast after installing an app' points to background activity and the battery usage screen. 'Bluetooth headset will not connect' points to unpairing and re-pairing. 'Contactless payment fails' points to NFC being disabled or the default payment app, and 'many connectivity problems at once' points to resetting network settings."
  ],
  "terms": [
   [
    "Force stop",
    "Ending an app's process completely so it can be relaunched from a clean state."
   ],
   [
    "Clear cache",
    "Removing an app's temporary files without deleting the user's account or settings."
   ],
   [
    "Clear data",
    "Resetting an app to its freshly installed state, removing its settings and sign-in."
   ],
   [
    "Offload app",
    "An iOS option that removes an app but keeps its documents and data for reinstallation."
   ],
   [
    "Reset network settings",
    "Clearing saved Wi-Fi networks, Bluetooth pairings and VPN settings to fix stubborn connectivity problems."
   ],
   [
    "NFC (near-field communication)",
    "Very short-range wireless used for contactless payments and tap-to-pair."
   ],
   [
    "Rotation lock",
    "A setting that keeps the screen in portrait orientation regardless of how the device is held."
   ],
   [
    "Accelerometer",
    "A sensor that detects movement and orientation, used for autorotation."
   ]
  ],
  "example": "A sales rep's phone will not connect to his car's hands-free system after he bought a new phone. The technician finds the car still remembers the old phone as its active device. They remove the old pairing in the car, delete the car from the new phone's Bluetooth list, put the car in pairing mode and pair again, and calls now route through the car speakers.",
  "tip": "Screen will not rotate: check rotation lock first. App will not update: check storage and OS compatibility. Bluetooth accessory will not connect: unpair and re-pair. Factory reset is always the last step, after a backup.",
  "check": [
   [
    "A user's screen will not rotate in any app. What is the first thing to check?",
    "Whether rotation lock is enabled in the control center or quick settings panel."
   ],
   [
    "An app will not install its latest update. Name two likely causes.",
    "Insufficient storage, a poor connection, an app store account problem, or an OS version the new release no longer supports."
   ],
   [
    "What is the downside of resetting network settings on a phone?",
    "It removes saved Wi-Fi networks, Bluetooth pairings and VPN settings, so the user must re-enter passwords and pair again."
   ],
   [
    "A phone battery is visibly swollen. What should you do?",
    "Stop using and charging the device and send it for service, because a swollen lithium-ion battery is a safety hazard."
   ]
  ]
 },
 {
  "t": "Mobile security issues: unofficial app stores, jailbreaking and rooting, sideloaded APKs, high network traffic, data-limit alerts, sluggish response, fake security warnings, unexpected app behavior, leaked personal files",
  "body": [
   "Mobile devices are protected mainly by two things: official app stores that screen apps before publishing them, and an operating system sandbox that keeps each app isolated from other apps and from the system. Most mobile security problems begin when a user weakens one of those protections. This topic splits naturally into causes (what weakened the device) and symptoms (what you notice when something is wrong), and the exam expects you to tell them apart and choose the right response.",
   "Start with the causes. Unofficial app stores, meaning third-party marketplaces, do not vet apps the way official stores do, and many host repackaged copies of popular apps with malware added. Sideloading means installing an app from outside the official store. On Android this usually means downloading an APK (Android Package) file and allowing installs from unknown sources; sideloaded APKs skip store screening and are a common way to deliver spyware, stalkerware and banking trojans. Jailbreaking (iOS) and rooting (Android) remove the manufacturer's restrictions and grant full administrative control. That also removes the security model that keeps apps isolated, can block official OS updates, may void warranties, and causes MDM (mobile device management) systems to flag the device as noncompliant. Organizations normally forbid all three on devices that access company data.",
   "Now the symptoms. High network traffic and data-limit alerts when the user has not changed their habits can mean malware is sending data out, downloading ads or taking part in a botnet. Sluggish response, overheating and fast battery drain can mean hidden processes such as cryptominers or spyware. Fake security warnings, pop-ups claiming 'your phone is infected' and urging the user to install a cleaner app or call a number, are scareware; the real OS does not warn users that way. Unexpected app behavior includes apps opening on their own, apps the user did not install, changed settings, new permissions, or strange messages sent from the user's accounts. Leaked personal files, such as photos, messages or documents appearing online or used for extortion, indicate stolen data, often through a malicious app with excessive permissions or a compromised cloud account.",
   "Each symptom has innocent explanations too, so verify before acting. A data alert may come from a new streaming habit or automatic photo backup over cellular, and sluggishness may just be a full device. Check the data usage screen for which app used the traffic, check the battery screen for which app is busy, and ask what changed. When the evidence points to malware, respond calmly and in order.",
   "Response steps: disconnect the device from networks if active data theft is suspected. Review installed apps, especially recently installed ones and any with device administrator or accessibility privileges, which malware abuses to control the screen, and remove anything unrecognized. Review app permissions, update the OS, and run a reputable mobile security scan. If the device is jailbroken or rooted, or symptoms persist, back up personal data only (not apps, which could reinstall the malware), factory reset, and restore from a known-good backup. Change passwords for accounts used on the device from a clean device, enable MFA (multifactor authentication), and check cloud accounts for unknown sessions. If stalkerware is suspected, be aware the person who installed it may notice its removal, and involve appropriate support with care for the user's safety. Prevention is simpler: official stores only, prompt OS updates, MDM policies that block unknown sources and detect jailbreaks, and periodic permission reviews.",
   "Consider a worked example. An employee's phone triggers a data-limit alert halfway through the month, and the battery drains quickly. The data usage screen shows a 'free' video app using gigabytes in the background. It was installed from a website as an APK and has permissions for SMS, contacts and accessibility services. You disconnect the phone, back up the employee's photos and contacts, factory reset it, restore the personal data, have the employee change passwords from a clean computer, and enable an MDM policy that blocks installs from unknown sources.",
   "Common mistakes: confusing causes with symptoms (rooting is a cause, battery drain is a symptom); restoring a full backup that includes the malicious app; tapping 'clean now' on a fake warning; changing passwords from the still-infected phone; and ignoring the accessibility and device administrator lists, where malicious apps like to hide. Another mistake is assuming iPhones cannot be affected; a jailbroken iPhone has lost much of its protection.",
   "Exam questions use strong clue words. 'Installed from outside the store' or 'APK from a website' points to sideloading. 'Bypassed manufacturer restrictions for full control' points to jailbreaking (iOS) or rooting (Android). 'Data-limit alert with no change in use' points to malware sending traffic. 'Pop-up says the phone is infected and to install a cleaner' points to a fake security warning. 'The best fix for a compromised or jailbroken phone' is usually backing up personal data and a factory reset."
  ],
  "terms": [
   [
    "Sideloading",
    "Installing an app from outside the official app store, bypassing its security screening."
   ],
   [
    "APK (Android Package)",
    "The file format used to distribute and install Android apps."
   ],
   [
    "Jailbreaking",
    "Removing Apple's iOS restrictions to gain full control, which weakens the security model."
   ],
   [
    "Rooting",
    "Gaining full administrative (root) access on Android, which removes built-in protections."
   ],
   [
    "Unofficial app store",
    "A third-party marketplace that does not screen apps as thoroughly as official stores."
   ],
   [
    "Scareware",
    "Fake security warnings designed to frighten users into installing malware, paying or calling a scammer."
   ],
   [
    "Stalkerware",
    "Hidden monitoring software installed to track a person's location, messages or activity without consent."
   ]
  ],
  "example": "A user reports that her phone keeps showing full-screen ads even on the home screen and that she received a 'virus detected' pop-up. The technician finds a flashlight app from a third-party store with device administrator rights. They remove its admin rights, uninstall it, update the OS, change the user's account passwords from a clean PC, and enable a policy that allows only the official store.",
  "tip": "Jailbreaking, rooting, unofficial stores and sideloading are causes; high data use, battery drain, fake warnings and strange app behavior are symptoms. The usual remedy for a compromised or jailbroken device is backing up personal data and a factory reset.",
  "check": [
   [
    "What is the difference between jailbreaking and rooting?",
    "Jailbreaking removes restrictions on iOS; rooting gains full administrative access on Android. Both weaken the security model."
   ],
   [
    "A phone shows a data-limit alert although the user's habits have not changed. What might it indicate?",
    "Malware sending data out or downloading content in the background; check data usage per app to confirm."
   ],
   [
    "Why should you restore only personal data, not apps, after resetting a compromised phone?",
    "Restoring apps from the backup could reinstall the malicious app and bring the infection back."
   ],
   [
    "A pop-up says the phone is infected and offers a cleaner app. What is it and what should the user do?",
    "It is a fake security warning (scareware); close it without tapping and do not install anything or call any number."
   ]
  ]
 },
 {
  "t": "PC security issues: unable to reach the network, fake antivirus alerts, altered or missing system files, unwanted OS notifications, failed OS updates",
  "body": [
   "Some symptoms on a Windows PC are strong signs of malware rather than ordinary faults. The exam expects you to recognize them, rule out the everyday explanations, and then respond with the malware removal procedure instead of simply patching over the symptom. Malware often damages the very things that would help you remove it, such as network access to security sites, update services and system files, so these symptoms are clues about what it is trying to protect itself from.",
   "Being unable to reach the network, or reaching only some sites, can be caused by malware. Some malware changes the DNS (Domain Name System) server settings on the adapter, edits the `hosts` file at `C:\\Windows\\System32\\drivers\\etc\\hosts` to redirect or block security sites, sets a rogue proxy, or disables network adapters so the machine cannot be updated or cleaned. A classic sign is that general browsing works but antivirus vendors' sites and Windows Update do not. Of course, rule out ordinary network faults first: check cabling, Wi-Fi, IP configuration and whether other users are affected. Then compare DNS, proxy and hosts settings with a known-good machine.",
   "Fake antivirus alerts, also called rogue antivirus or scareware, look like security software reporting dozens of infections and demanding payment for a 'full version', or urging the user to call a support number. They may be a pop-up from a website or a program actually installed on the machine. Genuine alerts come from the security product the organization uses, which you can confirm in Windows Security or the managed antivirus console. Never pay and never call; treat the PC as possibly infected and investigate. Unwanted OS notifications appear in the Windows notification area, often because the user clicked 'Allow' when a website asked to send notifications; the site then delivers ads or fake warnings that look like system messages. Remove that site's notification permission in the browser settings and check for adware.",
   "Altered or missing system files, such as renamed or deleted files in System32, changed permissions, or unfamiliar executables in system folders, may result from malware tampering with the OS or hiding itself, often causing errors or crashes. Run `sfc /scannow` to detect and repair changed protected files, scan with updated anti-malware tools, and consider reimaging if the system's integrity cannot be trusted. Also watch for changed file extensions and files encrypted by ransomware. Failed OS updates, where Windows Update keeps failing or the security software cannot update its definitions, are another classic sign, because malware tries to keep the machine vulnerable by stopping or breaking update services. Low disk space, corrupted update components and network problems cause failures too, so check those, but if Windows Update and the antivirus both fail, suspect malware.",
   "When several of these signs appear together, along with others such as a disabled antivirus or firewall, security settings that revert after you fix them, unknown user accounts or new startup items, follow CompTIA's seven-step malware removal procedure: (1) investigate and verify malware symptoms; (2) quarantine the infected system by disconnecting it from the network; (3) disable System Restore in Windows so infected restore points are not reused; (4) remediate by updating anti-malware software and scanning, using Safe Mode or a preinstallation environment if needed; (5) schedule scans and run updates; (6) enable System Restore and create a new restore point; (7) educate the end user.",
   "Consider a worked example. A user reports that their antivirus says it cannot update and that the vendor's website will not load, although news and shopping sites work. You open the hosts file and find entries pointing the antivirus vendor's domains and Microsoft's update domains to `127.0.0.1`, the local loopback address, which silently blocks them. Recognizing malware tampering, you disconnect the PC, disable System Restore, scan from bootable rescue media, clean the hosts file, update and rescan, then re-enable System Restore and explain to the user how the infection likely arrived.",
   "Common mistakes: fixing the hosts file or DNS setting and closing the ticket without removing the malware that changed it; calling the number in a fake antivirus alert to 'check'; blaming every failed update on malware without checking disk space; leaving System Restore enabled during cleanup so an infected restore point survives; and keeping the machine on the network while investigating.",
   "Exam questions use recognizable patterns. 'Only security websites are unreachable' points to hosts file, DNS or proxy tampering by malware. 'Pop-up demands payment to remove detected threats' points to rogue antivirus. 'Security software and Windows Update both fail' points to malware. 'Notifications with ads appear in the Windows corner after visiting a site' points to browser notification permissions. 'What should be done first' is usually verifying the symptoms; 'what should be done next after confirming malware' is quarantine."
  ],
  "terms": [
   [
    "Rogue antivirus",
    "Fake security software that reports invented infections to extort payment or install malware."
   ],
   [
    "Hosts file",
    "A local file that maps names to IP addresses before DNS is used, which malware can edit to redirect or block sites."
   ],
   [
    "Rogue proxy",
    "An unauthorized proxy setting that routes the PC's web traffic through a server controlled by an attacker."
   ],
   [
    "System File Checker (sfc)",
    "A Windows tool that scans protected system files and repairs altered or missing ones."
   ],
   [
    "Quarantine",
    "Isolating an infected system from the network so malware cannot spread or communicate."
   ],
   [
    "Malware removal procedure",
    "CompTIA's seven ordered steps from verifying symptoms through educating the user."
   ]
  ],
  "example": "A PC's Windows Security page shows real-time protection turned off, and each time the technician turns it on, it switches off again within minutes. Windows Update also fails with generic errors. Rather than repeatedly re-enabling protection, the technician treats this as malware, disconnects the PC, disables System Restore, and cleans it from a preinstallation environment before updating and rescanning.",
  "tip": "When security software and Windows Update both fail, or only security sites are unreachable, suspect malware. Real Windows security alerts come from Windows Security or the managed antivirus, never from a browser pop-up with a phone number.",
  "check": [
   [
    "Why might malware edit the hosts file?",
    "To redirect or block specific domains, such as antivirus and update sites, so the PC cannot be cleaned or patched."
   ],
   [
    "What are the first two steps of the CompTIA malware removal procedure?",
    "Investigate and verify malware symptoms, then quarantine the infected system."
   ],
   [
    "Why is System Restore disabled during malware removal?",
    "So restore points that may contain the malware are removed and cannot reinfect the system later."
   ],
   [
    "Ads appear as Windows notifications after a user visited a website. What is the likely cause and fix?",
    "The user allowed the site to send notifications; remove its notification permission in the browser settings and check for adware."
   ]
  ]
 },
 {
  "t": "Browser security issues: random pop-ups, certificate warnings, redirection, degraded browser performance",
  "body": [
   "The browser is where users most often notice that something is wrong. The exam covers four browser symptoms: random pop-ups, certificate warnings, redirection and degraded browser performance. Each can have an innocent explanation, but each is also a classic sign of adware, a malicious extension or other malware. Your job is to tell the harmless cause from the security problem, fix it, and educate the user so it does not happen again.",
   "Random pop-ups that appear even on trusted sites, or when no website is open, are a strong sign of adware, a malicious extension, or site notifications the user allowed. Check the browser's extensions and remove anything unknown, review which sites are allowed to send notifications, make sure the pop-up blocker is on, check installed programs for adware, and run an anti-malware scan. If a pop-up claims the computer is infected and shows a phone number, it is a tech support scam. Close the browser, using Task Manager to end it if the page blocks closing, and never call the number or allow remote access.",
   "Certificate warnings appear when the browser cannot validate a site's certificate. Harmless causes include an expired certificate on that one site, a name mismatch (the certificate was issued for a different name), and a wrong date and time on the PC; a clock that is years off makes nearly every certificate look invalid. Security-relevant causes include an on-path attack, where someone intercepts traffic with their own certificate, often on untrusted public Wi-Fi or through a malicious proxy, and malware that installed a rogue root certificate so interception looks trusted. If many sites show warnings, check the system clock first, then the proxy settings and the certificate store (`certmgr.msc`) for unknown root certificates. Users should never click through a warning on a site where they enter credentials.",
   "Redirection means the browser goes somewhere other than where the user asked: searches go through an unfamiliar search engine, or typing a bank's address leads to a look-alike page. Causes include a hijacked home page or search provider set by a malicious extension or program, a modified hosts file, altered DNS (Domain Name System) settings on the PC or the router, or a malicious proxy. Fix it by removing the offending extension or program, resetting the browser's settings, checking the hosts file, DNS and proxy configuration, and scanning for malware. If every device on the network is redirected, look at the router's DNS settings rather than one PC.",
   "Degraded browser performance, where the browser becomes slow, freezes or uses a lot of memory and CPU, may come from too many open tabs or extensions, a bloated cache, an outdated browser, or malicious scripts such as in-browser cryptomining. Use the browser's own task manager (available in Chromium-based browsers with Shift+Esc) to find the tab or extension using resources, disable extensions one at a time, clear the cache, update the browser, and reset it to defaults if needed. When any of these symptoms point to malware, handle the machine with the malware removal procedure.",
   "Consider a worked example. A user reports certificate warnings on nearly every HTTPS site since this morning. You notice the taskbar clock shows a date several years in the past. Because one wrong setting explains every warning, you check the time before anything else: you correct the date, enable automatic time sync, and the warnings disappear. Because the clock may have reset after a power loss, you log a follow-up to check the CMOS battery. Had the clock been correct, your next checks would have been the proxy settings and unknown root certificates.",
   "Common mistakes: treating certificate warnings on every site as a website problem when the PC's clock is wrong; clicking through a certificate warning on a login page; removing a malicious extension but not resetting the search engine and home page it changed; checking only the default browser when the adware installed extensions in all of them; and blaming slow browsing on the network when one extension is consuming the CPU.",
   "Exam questions tend to follow patterns. 'Warnings on every HTTPS site' points to the system date and time first, then an intercepting proxy or rogue root certificate. 'Warning on one site only' points to that site's certificate or interception on that connection. 'Search results go through an unknown search engine' points to a browser hijacker extension. 'Pop-up says call support to remove a virus' points to a scam. 'Browser slow with high CPU on one tab' points to a malicious or heavy script, found with the browser's task manager."
  ],
  "terms": [
   [
    "Adware",
    "Unwanted software that displays advertising, often through pop-ups, injected ads or redirected searches."
   ],
   [
    "Browser hijacker",
    "Software or an extension that changes the home page, search engine or new tab page without consent."
   ],
   [
    "Certificate warning",
    "A browser message that a site's certificate is expired, mismatched or from an untrusted issuer."
   ],
   [
    "On-path attack",
    "An attack where someone intercepts traffic between two parties, formerly called man-in-the-middle."
   ],
   [
    "Rogue root certificate",
    "An unauthorized certificate authority certificate installed so that intercepted traffic appears trusted."
   ],
   [
    "Cryptomining script",
    "Code that uses the visitor's CPU to mine cryptocurrency, slowing the browser."
   ],
   [
    "Tech support scam",
    "A fake alert urging the user to call a number or allow remote access to fix a non-existent problem."
   ]
  ],
  "example": "Every PC in a small office suddenly sends users to a look-alike banking site, while phones on mobile data reach the real site. The technician checks the router and finds its DNS servers changed to unknown addresses and its admin password still at the default. They reset the router's DNS to the ISP's servers, change the admin password, update the firmware and clear DNS caches on the PCs.",
  "tip": "Certificate errors on every site usually mean a wrong system clock, or an intercepting proxy or rogue root certificate. A warning on just one site usually means that site's certificate has a problem, or that connection is being intercepted.",
  "check": [
   [
    "A user sees certificate warnings on almost every HTTPS website. What do you check first?",
    "The system date and time, because a wrong clock makes valid certificates appear expired or not yet valid."
   ],
   [
    "A user's searches are sent through an unfamiliar search engine. What is the likely cause?",
    "A browser hijacker, usually a malicious extension or program that changed the search provider."
   ],
   [
    "How can you find which tab or extension is slowing the browser?",
    "Use the browser's built-in task manager to see CPU and memory use per tab and extension."
   ],
   [
    "All devices on a network are redirected to fake sites. Where should you look?",
    "At the router's DNS settings, since a change there affects every device that uses it."
   ]
  ]
 },
 {
  "t": "Checking and repairing startup items, scheduled tasks, browser extensions and proxy settings after an infection",
  "body": [
   "Removing the malware file is not always enough. Many infections set up persistence, meaning mechanisms that relaunch the malware or restore its changes after a reboot or after you delete the main file. Others change settings, such as the proxy or the browser's search engine, that keep causing harm even after the program is gone. After remediation, you need to check the common persistence locations and the settings malware likes to change, or the problem will quietly return.",
   "Start with startup items. Task Manager's Startup apps tab lists programs that launch at sign-in, with their publisher and startup impact; disable anything unknown or suspicious, and look it up if unsure. Programs can also start from the Startup folders (type `shell:startup` for the current user or `shell:common startup` for all users in the Run box) and from the registry Run keys, such as `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` and the matching key under `HKEY_LOCAL_MACHINE`. Review the Services console (`services.msc`) for unfamiliar services set to start automatically, especially ones with odd names or no description. Tools such as Microsoft's Sysinternals Autoruns show every autostart location in one list, which saves a lot of clicking.",
   "Next, scheduled tasks. Malware frequently creates a task in Task Scheduler (`taskschd.msc`) that runs at logon, at startup or every few minutes to reinstall itself or launch a script. Browse the Task Scheduler Library and its subfolders, look for tasks with random or look-alike names, and open each unfamiliar task's Actions tab to see what program or script it runs, along with the Triggers tab to see when. Note the details in the ticket, then disable or delete malicious tasks. A task that runs a script from a user's temporary folder or AppData is a common red flag.",
   "Then browser extensions and settings. Open the extension or add-on manager in every installed browser, not just the default one, and remove anything the user did not intentionally install. Then check the home page, startup pages, new tab page and default search engine, because hijackers change them. If settings keep coming back, check whether a policy has been applied; browsers show a 'managed by your organization' notice when policies are set, and some malware installs its own browser policies. Resetting the browser to defaults removes most leftovers. Clear the cache and cookies, and remove unexpected notification permissions. Finally, proxy and name resolution settings. Malware may set a proxy so all web traffic passes through the attacker's server, or so security sites fail to load. Check Settings > Network and internet > Proxy and the legacy Internet Options > Connections > LAN settings; unless the organization uses a proxy, automatic setup scripts and manual proxy servers should be off. Check the system proxy used by services with `netsh winhttp show proxy`, the DNS server settings on the network adapter, and the hosts file for redirect entries.",
   "```\nshell:startup\ntaskschd.msc\nnetsh winhttp show proxy\nnotepad C:\\Windows\\System32\\drivers\\etc\\hosts\n```",
   "Consider a worked example. After removing adware, a technician finds the ads return after each reboot. Task Scheduler shows a task named to resemble a browser updater that runs a script from AppData every 30 minutes, and the browser still lists an unknown extension that sync keeps restoring. You delete the task, remove the extension, sign the browser out of sync and clear the synced extension from the account, reset the browser, and reboot twice to confirm nothing reappears. You finish with a full scan using updated definitions and document each item removed. If persistence had kept returning despite cleanup, the safest course would have been to reimage.",
   "Common mistakes: deleting the malware file but leaving the scheduled task that downloads it again; checking only Task Manager's Startup apps and missing services, Run keys and tasks; cleaning one browser but not the others; forgetting that profile sync can restore a malicious extension; and fixing the browser's proxy while missing the WinHTTP proxy or hosts file.",
   "Exam questions often describe the aftermath of a cleanup. 'The malware returns after every reboot' points to persistence such as a scheduled task, a Run key or a service. 'Web traffic still misbehaves after removal' points to proxy, DNS or hosts settings, and 'browser home page keeps changing back' points to an extension, sync or a browser policy. When a question asks what to do after all cleanup attempts fail and the infection keeps returning, the answer is to reimage the system from a known-good image."
  ],
  "terms": [
   [
    "Persistence",
    "A mechanism that lets malware survive reboots or removal attempts, such as a scheduled task or startup entry."
   ],
   [
    "Run key",
    "A registry location whose entries launch programs automatically when a user signs in."
   ],
   [
    "Startup folder",
    "A folder, opened with shell:startup, whose shortcuts run at sign-in."
   ],
   [
    "Task Scheduler",
    "The Windows tool that runs programs on triggers such as logon, startup or a timer."
   ],
   [
    "Autoruns",
    "A Sysinternals tool that lists every autostart location on a Windows system in one view."
   ],
   [
    "Proxy setting",
    "A configuration that routes web traffic through an intermediate server, which malware may set to intercept traffic."
   ],
   [
    "netsh winhttp show proxy",
    "A command that displays the system-wide proxy used by Windows services."
   ]
  ],
  "example": "A user's browser keeps opening a shopping site at sign-in, even after an anti-malware scan reported the PC clean. The technician opens Autoruns and finds a Run key entry launching the browser with that address, plus a scheduled task that recreates the entry daily. Removing both and resetting the browser stops the behavior, and the ticket lists each item for future reference.",
  "tip": "If malware keeps coming back after removal, look for persistence: Startup apps, Run keys, services and especially scheduled tasks. If web traffic still misbehaves, check the proxy, DNS and hosts file.",
  "check": [
   [
    "Adware returns after every reboot even though its files were deleted. What should you check?",
    "Persistence locations: scheduled tasks, Run registry keys, Startup folders, services and browser extensions."
   ],
   [
    "How can you see the system-wide proxy used by Windows services?",
    "Run netsh winhttp show proxy from a command prompt."
   ],
   [
    "Why check every browser, not only the default one?",
    "Malware often installs extensions or changes settings in all installed browsers, and an untouched one can reinfect or keep redirecting."
   ],
   [
    "What might cause a removed extension to reappear?",
    "Browser profile sync restoring it from the account, or a browser policy or scheduled task reinstalling it."
   ]
  ]
 },
 {
  "t": "Ticketing systems: user and device information, descriptions, categories, severity, escalation levels, clear progress notes and resolutions",
  "body": [
   "A ticketing system, also called a help desk or ITSM (IT service management) system, records every request and incident from the moment it is reported until it is closed. Tickets make sure nothing is forgotten, let work be handed from one technician to another, measure performance against SLAs (service level agreements), and build a searchable history that helps solve future problems. Writing a good ticket is a skill, and the A+ exam tests it directly through scenario questions about what belongs in a ticket and when to escalate.",
   "Every ticket starts with who and what. User information includes the person's name, contact details, department, location and preferred way to be reached, so anyone picking up the ticket can contact them. Device information identifies the affected asset: asset tag or hostname, make and model, OS version and any related systems or peripherals. Linking the ticket to the asset record in the inventory makes patterns visible, such as the same laptop failing three times in a month, which may justify replacing it rather than repairing it again. The description explains the problem in specific, factual terms: what the user was doing, what happened, exact error messages or codes, when it started, whether it happens every time, who else is affected, and what has already been tried. 'Outlook shows error 0x800CCC0E when sending since 9:00; receiving works; webmail works' lets the next technician start troubleshooting immediately. 'Email broken' does not. Screenshots help, and so does the user's own description in their words. The description is also the first step of the troubleshooting methodology, identifying the problem, written down.",
   "Categories group tickets by type, such as hardware, software, network, account or access request, often with subcategories. Accurate categories route tickets to the right team and produce useful reports, for example showing that printer tickets doubled after a driver change. Severity describes how serious the impact is, and many systems combine impact (how many people or how critical a system) with urgency (how quickly it gets worse) to set a priority. A single user's cosmetic issue is low; one user unable to work is medium or high; an outage affecting a department, a critical system down or a security incident is critical. Priority drives the response and resolution targets in the SLA.",
   "Escalation levels describe who handles what. Tier 1, the first line or service desk, handles common issues such as password resets, basic troubleshooting and known fixes from the knowledge base. Tier 2 handles deeper technical problems and desk-side support. Tier 3 includes specialists and engineers, and some organizations escalate further to vendors. Escalate when a problem is beyond your skill or permissions, when it exceeds the time allowed at your tier, or when its severity demands it. When you escalate, include everything you found, so the next person does not repeat your tests or call the user with the same questions.",
   "Progress notes record each action, finding and communication in time order: who you contacted, what you tested, what you changed and what the result was. Write them so another technician, or the user, could understand them later, in plain professional language without blame or opinions. When the ticket is closed, the resolution states the root cause if known, the fix applied, and confirmation that the user verified the problem is solved. A good resolution note can become a knowledge base article, saving time the next time the problem appears.",
   "Consider a worked example. A Tier 1 technician receives a ticket that a sales rep's laptop cannot connect to the VPN (virtual private network). They record the laptop's asset tag and OS version, the exact error code and the time it started, confirm the internet connection works and the user's password is valid, and note each test. Two other remote users report the same error that hour, so they raise the priority because impact has grown. The error points to a certificate problem on the VPN server, so they escalate to Tier 2 with all notes attached. The network team renews the server certificate, the users confirm they can connect, and the resolution records the cause and fix.",
   "Common mistakes: vague descriptions such as 'PC not working'; leaving out the device information; choosing a priority based on who is shouting rather than impact and urgency; escalating without notes; writing notes that blame the user; and closing a ticket without confirming the fix with the user.",
   "Exam questions follow recognizable patterns. 'the next technician had to start over' points to missing progress notes, 'many users affected' raises severity, 'beyond your permissions or skills' points to escalation, and 'what should the resolution include' points to root cause, fix and user verification."
  ],
  "terms": [
   [
    "Ticketing system",
    "Software that records, routes and tracks support requests and incidents from report to resolution."
   ],
   [
    "Category",
    "A classification of a ticket by type, such as hardware or network, used for routing and reporting."
   ],
   [
    "Severity",
    "A measure of how serious a problem's impact is on users and the business."
   ],
   [
    "Priority",
    "The order in which tickets are handled, usually set from impact and urgency."
   ],
   [
    "Escalation",
    "Passing a ticket to a higher tier or specialist when it exceeds the current technician's skill, authority or time limit."
   ],
   [
    "Progress notes",
    "Time-ordered records of actions, findings and communications on a ticket."
   ],
   [
    "Resolution",
    "The closing note stating the cause, the fix applied and the user's confirmation."
   ]
  ],
  "example": "A help desk receives three tickets in ten minutes saying the shared accounting drive is unavailable. The technician links them to one parent incident, categorizes it as network storage, raises it to high priority because a whole department cannot work, records the exact error and affected paths, and escalates to the storage team with all findings so no one repeats the same checks.",
  "tip": "Good ticket notes are specific, factual and complete enough that someone else could continue the work. Severity and priority rise with the number of people affected and the business impact, not with how loudly someone complains.",
  "check": [
   [
    "What should a ticket description include?",
    "What the user was doing, what happened, exact error messages, when it started, how often it happens, who is affected and what has been tried."
   ],
   [
    "When should a Tier 1 technician escalate a ticket?",
    "When the problem exceeds their skills, permissions or allowed time, or its severity requires a higher tier."
   ],
   [
    "Why link tickets to device information such as the asset tag?",
    "It identifies the affected equipment and reveals patterns, such as repeated failures on the same device."
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
   "Asset management means knowing what IT equipment and software an organization owns, where it is, who uses it, what it cost, and when it must be replaced. It sounds like bookkeeping, but it underpins security and support. You cannot patch or protect devices you do not know about, you waste money on licenses nobody uses, you pay for repairs that warranties would cover, and audits become painful. As a technician you will tag equipment, update records and look up assets when working tickets.",
   "The foundation is an inventory list, a record of every asset with fields such as asset ID, type, manufacturer, model, serial number, location, purchase date, cost, assigned user, status (in use, in storage, in repair, retired) and warranty end date. Small organizations may use a spreadsheet, but most use an asset management tool that can discover devices on the network automatically and pull hardware and software details from an installed agent. Automatic discovery also reveals unknown devices that appear on the network, which is a security benefit.",
   "A CMDB (configuration management database) goes further than an inventory. It stores configuration items (CIs), which can be hardware, software, services and documentation, together with their relationships: this server hosts that application, which depends on this database and supports the payroll service. Those relationships let you assess the impact of a change or an outage before it happens, which is why CMDBs are central to change management and incident management. An inventory answers 'what do we have'; a CMDB also answers 'what depends on what'.",
   "Each physical asset gets an asset tag with a unique asset ID, often a barcode, QR code or RFID (radio-frequency identification) label, attached to the device and recorded in the inventory. Scanning the tag pulls up the record, which speeds up audits and ties tickets to specific devices. Tags also help recover lost or stolen equipment and discourage theft. The asset ID is the organization's own identifier and is different from the manufacturer's serial number, although records usually hold both.",
   "The procurement life cycle follows an asset from start to finish. It begins with identifying a need and approving the purchase, then ordering from an approved vendor, receiving and tagging the equipment, configuring and deploying it, supporting and maintaining it through repairs and upgrades, and finally retiring it: securely wiping or destroying data, removing it from service, and recycling or disposing of it properly, with records such as a certificate of destruction. Planning replacements around warranty and end-of-life dates avoids surprise failures and unsupported systems. Warranty records (start and end dates, support level, service tags) tell you whether a failed part is repaired at no cost. Software licenses must be tracked against installations to stay compliant with license agreements, avoid audit penalties and avoid paying for unused seats, and subscription renewal dates must be tracked so services do not lapse. Finally, record assigned users: who is responsible for each device. This supports accountability, makes onboarding and offboarding smoother, since you know exactly which laptop, phone and badge to collect when someone leaves, and helps the security team contact the right person when a device raises an alert. Keep the record current when devices move between people.",
   "Consider a worked example. A laptop's screen fails. You scan its asset tag, and the inventory shows it is still under the manufacturer's next-business-day warranty and assigned to a user in the finance team. Instead of buying a replacement screen, you open a warranty claim with the serial number, assign a loaner laptop to the user in the asset system, and add the repair to the asset's history. Two months later, the history shows this model's screens failing repeatedly, which informs the next procurement decision.",
   "Common mistakes: confusing an inventory with a CMDB; assuming the serial number and asset tag are the same thing; forgetting to update the assigned user when a device changes hands; disposing of equipment without wiping data or recording it; and tracking hardware but not software licenses.",
   "Exam questions follow recognizable patterns. 'relationships and dependencies between systems' points to a CMDB, 'barcode label with a unique ID' points to an asset tag, 'is this repair covered' points to warranty records, 'more installations than purchased seats' points to license tracking, and 'who has this laptop' points to the assigned user field."
  ],
  "terms": [
   [
    "Inventory list",
    "A record of every asset with details such as ID, model, serial number, location, status and assigned user."
   ],
   [
    "CMDB (configuration management database)",
    "A database of configuration items and the relationships and dependencies between them."
   ],
   [
    "Configuration item (CI)",
    "Any component tracked in a CMDB, such as a server, application, service or document."
   ],
   [
    "Asset tag",
    "A label with a unique organizational ID, often a barcode, QR code or RFID tag, attached to equipment."
   ],
   [
    "Procurement life cycle",
    "The stages of an asset from purchase request through deployment, maintenance and disposal."
   ],
   [
    "Software license compliance",
    "Ensuring the number and type of installations match what the license agreements allow."
   ],
   [
    "Assigned user",
    "The person recorded as responsible for a specific asset."
   ]
  ],
  "example": "Before a planned server upgrade, the change team checks the CMDB and discovers that the server also hosts a small reporting database used by the sales dashboard. Because the relationship was recorded, they schedule the change outside sales reporting hours and notify the dashboard owner, avoiding an outage nobody had anticipated.",
  "tip": "An inventory tells you what you own; a CMDB also tells you how items relate and depend on each other. Asset records should include the assigned user, warranty dates and license information, and the asset tag ID is the organization's own identifier, not the serial number.",
  "check": [
   [
    "What does a CMDB record that a simple inventory does not?",
    "The relationships and dependencies between configuration items, such as which services depend on which servers."
   ],
   [
    "Why record the assigned user for each device?",
    "For accountability, easier offboarding and equipment collection, and so security teams can contact the right person."
   ],
   [
    "What happens at the end of the procurement life cycle?",
    "The asset is retired: data is wiped or destroyed, it is removed from inventory, and it is recycled or disposed of with records."
   ],
   [
    "Why track software licenses against installations?",
    "To stay compliant with license agreements, avoid audit penalties and avoid paying for unused seats."
   ]
  ]
 },
 {
  "t": "Documentation types: acceptable use policy, incident reports, SOPs, onboarding and offboarding checklists, SLAs, knowledge base articles",
  "body": [
   "IT support relies on written documentation so that work is consistent, rules are clear, and knowledge does not live only in one person's head. When a technician leaves or is on vacation, good documents let someone else carry on. The exam expects you to know what each common document is for and to pick the right one for a scenario, so focus on purpose: rules, records, procedures, promises or solutions.",
   "An acceptable use policy (AUP) tells users what they may and may not do with the organization's systems, networks, email and data. Typical rules include no installing unapproved software, no personal file-sharing services, no accessing inappropriate content, protecting passwords, and acknowledging that activity may be monitored. Users usually sign or acknowledge the AUP when hired and periodically afterward, which gives the organization a clear basis for enforcing the rules. Related policies include password, remote access and BYOD (bring your own device) policies.",
   "An incident report documents a security or service incident: what happened, when and how it was detected, which systems and data were affected, who was involved, what actions were taken and the outcome. It supports investigation, lessons learned, insurance claims and legal needs, and may be required by regulation. Write it factually and promptly, while details are fresh, and avoid speculation or blame. A standard operating procedure (SOP) is a step-by-step instruction for performing a routine task the same way every time, such as setting up a new workstation, running a backup, or installing a custom software package. SOPs reduce errors, make training easier and help show compliance, because an auditor can see both the procedure and evidence it was followed.",
   "Onboarding and offboarding checklists make sure nothing is missed when people join, change roles or leave. Onboarding covers creating accounts, assigning group memberships and licenses, issuing hardware and badges, setting up MFA (multifactor authentication), and providing the AUP and security training. Offboarding covers disabling accounts promptly, ideally at the moment of departure, revoking access and badges, collecting equipment, transferring or retaining data according to policy, reclaiming licenses, and changing any shared credentials the person knew. Missed offboarding steps are a common source of insider risk and of accounts attackers later abuse.",
   "A service level agreement (SLA) is a formal agreement that defines the expected level of service between a provider and a customer, whether an outside vendor or the internal IT department and the business. It typically states response and resolution times by priority, availability targets, support hours, how performance is measured and what happens if targets are missed. Tickets are measured against the SLA, which is why priority matters. Knowledge base (KB) articles document solutions to known problems and how-to guides, either internal for technicians or external for user self-service. A good article has a searchable title, the symptoms, the cause and the step-by-step fix. Writing one after solving a new problem saves time the next time it appears.",
   "Consider a worked example. A contractor's project ends on Friday, but a month later a review finds their VPN account still active and recently used. Nobody followed the offboarding checklist, because HR never told IT the end date. The team disables the account, writes an incident report documenting what was accessed and when, and updates the offboarding SOP so HR automatically notifies IT of every departure date. They also add a KB article for technicians on how to verify an account is fully deprovisioned.",
   "Common mistakes: confusing an SOP (how to do a task) with a policy such as the AUP (what users may do); treating an SLA as an internal procedure rather than an agreed service commitment; writing incident reports days later from memory; relying on memory for offboarding instead of a checklist; and solving the same problem repeatedly without ever writing a KB article.",
   "Exam questions usually describe a need and ask which document fits. 'Users must agree not to install personal software' points to the AUP. 'Step-by-step instructions so every technician images laptops the same way' points to an SOP. 'The vendor must respond to critical issues within a set time' points to an SLA. 'Record of what happened during the breach' points to an incident report. 'Former employee still has access' points to offboarding, and 'users can fix a common problem themselves' points to a knowledge base article."
  ],
  "terms": [
   [
    "Acceptable use policy (AUP)",
    "A policy stating what users may and may not do with an organization's systems and data."
   ],
   [
    "Incident report",
    "A factual record of an incident: what happened, when, what was affected and what actions were taken."
   ],
   [
    "Standard operating procedure (SOP)",
    "Step-by-step instructions for performing a routine task consistently."
   ],
   [
    "Onboarding checklist",
    "A list of steps for setting up a new user's accounts, access, equipment and training."
   ],
   [
    "Offboarding checklist",
    "A list of steps for removing a departing user's access, recovering equipment and handling their data."
   ],
   [
    "Service level agreement (SLA)",
    "A formal agreement defining service targets such as response times and availability."
   ],
   [
    "Knowledge base (KB) article",
    "A documented solution or how-to guide for technicians or end users."
   ]
  ],
  "example": "A help desk notices it resets the same printer queue several times a week. A technician documents the symptom, cause and fix in a KB article and publishes a user-facing version with simple steps. Tickets for the problem drop sharply, and the remaining ones are solved faster because Tier 1 follows the article instead of escalating.",
  "tip": "Rules for users: AUP. Step-by-step routine task: SOP. Promised response or uptime: SLA. Record of what happened: incident report. Reusable fix: knowledge base article. Access removed at departure: offboarding checklist.",
  "check": [
   [
    "Which document tells employees they may not use company email for personal business?",
    "The acceptable use policy (AUP)."
   ],
   [
    "A vendor must restore service within four hours for critical tickets. Where is this defined?",
    "In the service level agreement (SLA)."
   ],
   [
    "Why is prompt offboarding important for security?",
    "Accounts and access left active after someone leaves can be misused by the former user or by attackers."
   ],
   [
    "What is the difference between an SOP and a KB article?",
    "An SOP gives standard steps for a routine task; a KB article documents the solution to a known problem or a how-to for reuse."
   ]
  ]
 },
 {
  "t": "Change management: request forms, purpose and scope, risk analysis, change advisory board approval, sandbox testing, rollback and backup plans, end-user acceptance",
  "body": [
   "Many IT outages are caused not by attacks or hardware failures but by well-intended changes made without planning: a firewall rule, a patch, a new driver pushed to every PC. Change management is the formal process for proposing, reviewing, approving, implementing and documenting changes to systems, so they happen in a controlled way with minimal disruption and a clear record. As a technician you will submit change requests, carry out approved changes, and be expected to follow the process even when a change seems small.",
   "A change starts with a request form (change request). It describes the change, its purpose (the business reason, such as fixing a vulnerability or supporting a new application) and its scope (which systems, sites, users and services are affected, and how many devices). It also proposes a date and time, usually inside an agreed maintenance window, names who will perform the work, and classifies the change type: standard (pre-approved, routine and low risk, such as a routine password policy update), normal (needs review and approval) or emergency (urgent, approved rapidly and documented afterward). It should also name the change owner, the person accountable for the change.",
   "A risk analysis estimates what could go wrong and how badly: the likelihood of failure, the impact on users and the business, and the risk of not making the change at all. Risk is often rated low, medium or high, and higher-risk changes need more testing, more approvers and tighter scheduling. The CMDB (configuration management database) helps identify dependencies that could be affected. The change advisory board (CAB) is a group of stakeholders, such as IT managers, system owners, security and business representatives, that reviews normal changes and approves them, rejects them or asks for more information. The CAB checks that the plan is sound, that the timing does not collide with other changes or busy business periods, and that affected people will be told.",
   "Before touching production, test the change in a sandbox, an isolated environment that mirrors production closely, where mistakes cannot harm real users or data. Testing confirms the change works and reveals side effects. Every change also needs a backup plan and a rollback plan. Take backups, configuration exports or snapshots before starting, so data and settings can be recovered; and document exactly how to return the system to its previous state if the change fails or causes problems, including who decides to roll back and at what point. A rollback plan that has never been tested may fail when you need it most.",
   "After implementation, confirm success through end-user acceptance: the business owner or representative users verify that the system works as they need it to and sign off. Then update documentation and the CMDB, record the outcome in the change record and close it. Changes made outside this process are unauthorized changes; they cause outages, weaken security and make incidents hard to investigate. A useful sequence to remember is request, purpose and scope, risk analysis, backup and rollback planning, sandbox testing, CAB approval, implementation, end-user acceptance and documentation.",
   "Consider a worked example. The network team wants to upgrade firewall firmware to fix a security flaw. The request describes the purpose, the three affected sites and a Saturday night window. The risk analysis notes that remote access depends on the firewall, so an outage would stop all remote staff. They test the firmware on a lab firewall, export the current configuration and keep the old firmware image as the rollback path. The CAB approves. The upgrade succeeds, remote users confirm on Monday that the VPN works, and the change is closed with updated documentation.",
   "Common mistakes: testing in production because the sandbox takes time; assuming a backup is the same thing as a rollback plan (a backup saves data, a rollback plan describes how to return to the previous state); treating the CAB as the people who perform the work, when they approve and technicians implement; skipping end-user acceptance because the technical check passed; and not documenting emergency changes afterward.",
   "Exam questions usually ask which step was missing or comes next. 'A change broke an application nobody considered' points to risk analysis or scope. 'The failed change could not be undone' points to the rollback plan. 'Test without affecting users' points to a sandbox. 'Who approves' points to the CAB. 'Users confirm the system meets their needs after the change' points to end-user acceptance, and 'why and what is affected' points to the purpose and scope on the request form."
  ],
  "terms": [
   [
    "Change request",
    "A form describing a proposed change, its purpose, scope, schedule, owner and risk."
   ],
   [
    "Scope",
    "The systems, users, locations and services a change will affect."
   ],
   [
    "Risk analysis",
    "An assessment of the likelihood and impact of a change failing, and of not making it."
   ],
   [
    "Change advisory board (CAB)",
    "A group of stakeholders that reviews and approves or rejects normal changes."
   ],
   [
    "Sandbox",
    "An isolated test environment that mirrors production so changes can be tested safely."
   ],
   [
    "Rollback plan",
    "Documented steps to return a system to its previous state if a change fails."
   ],
   [
    "End-user acceptance",
    "Confirmation by users or the business owner that the changed system meets their needs."
   ]
  ],
  "example": "A technician wants to push a new printer driver to all 300 office PCs. The change request states the purpose (fixing duplex printing), the scope (all PCs and four printer models) and a rollback plan (redeploy the previous driver package). Sandbox testing reveals the new driver breaks label printing in the warehouse, so the scope is narrowed to office floors, and the CAB approves the revised change.",
  "tip": "Test changes in a sandbox and get CAB approval before implementation; every change needs a rollback plan and backups. End-user acceptance comes after implementation, and emergency changes are still documented afterward.",
  "check": [
   [
    "What is the purpose of sandbox testing?",
    "To confirm a change works and reveal side effects in an isolated environment without harming production users or data."
   ],
   [
    "Who approves normal changes?",
    "The change advisory board (CAB), made up of IT, security, system owner and business stakeholders."
   ],
   [
    "How does a rollback plan differ from a backup?",
    "A backup preserves data and settings; a rollback plan documents the steps and decision point for returning the system to its previous state."
   ],
   [
    "When does end-user acceptance happen, and what does it confirm?",
    "After implementation; users or the business owner confirm the changed system meets their needs."
   ]
  ]
 },
 {
  "t": "Backup and recovery: full, incremental, differential and synthetic backups; testing restores; on-site vs off-site; 3-2-1 rule; grandfather-father-son rotation",
  "body": [
   "Backups are the last line of defense against hardware failure, accidental deletion, ransomware and disasters. A backup strategy decides what to back up, how often, where to keep copies, how long to keep them and how quickly you can restore. The exam focuses on three areas: the backup types and what each needs for a restore, where copies are stored, and rotation schemes that balance history against media and storage use.",
   "A full backup copies all selected data every time. It is the simplest to restore, since you need only one backup set, but it takes the most time and storage. Traditional Windows backup software tracks changes with the archive bit, a file attribute set whenever a file changes. A full backup copies everything and clears the archive bit. An incremental backup copies only data changed since the last backup of any type (full or incremental) and clears the archive bit. Incrementals are fast and small, but a restore needs the last full backup plus every incremental since, applied in order. A differential backup copies everything changed since the last full backup and does not clear the archive bit, so each differential grows during the week. A restore needs only the last full plus the latest differential. Modern tools often track changes with their own databases or snapshots rather than the archive bit, but the restore logic is the same.",
   "A synthetic full backup is built by the backup system from an earlier full backup plus the incrementals since, combined on the backup storage rather than read again from the source. It gives you a fresh full backup, and therefore fast restores, without the load of a real full backup on production systems and the network. It is useful when the full backup window is too short or the link to a remote site is slow.",
   "A backup you have never restored is only a hope. Testing restores regularly, by restoring files or whole systems to a test location, verifies that the data is complete, the media is readable, the process is documented and the time needed meets recovery goals. Organizations define an RPO (recovery point objective), the maximum acceptable data loss measured in time, which drives backup frequency, and an RTO (recovery time objective), how quickly service must return, which drives the restore method. Also back up the right things: user data, databases, system state and configuration, not just files on one drive.",
   "Where copies live matters. On-site backups, such as a local backup appliance or NAS (network-attached storage), restore quickly but can be destroyed by the same fire, flood, theft or ransomware that hits the primary data. Off-site backups, at another location or in the cloud, survive local disasters but usually restore more slowly. The 3-2-1 rule combines both: keep at least 3 copies of data (the original plus two backups), on 2 different types of media or storage, with 1 copy off-site. Many organizations also keep one copy offline or immutable so ransomware cannot encrypt or delete it. The GFS (grandfather-father-son) rotation scheme balances history against media use. Son backups are daily, often incremental or differential, and are reused each week. Father backups are weekly fulls kept for about a month. Grandfather backups are monthly fulls kept longer, often a year, and typically stored off-site. GFS lets you restore from yesterday, several weeks ago or months ago with a manageable number of media sets.",
   "Consider a worked example. A company runs a full backup on Sunday night and incrementals Monday through Friday nights. A server fails Thursday morning. To restore, you need Sunday's full backup plus Monday's, Tuesday's and Wednesday's incrementals, applied in that order; if Tuesday's is damaged, anything changed after Monday may be lost. If the company used differentials instead, you would need only Sunday's full and Wednesday's differential. Either way, data created Thursday morning before the failure is lost, which is why RPO decides backup frequency.",
   "Common mistakes: mixing up incremental and differential restore requirements; assuming a synced cloud folder is a backup, when deletions and encryption sync too; keeping every copy in the same building; never testing restores; and believing RAID (redundant array of independent disks) replaces backups, when it only protects against a disk failure and copies deletions and corruption instantly.",
   "Exam questions use predictable clues. 'Fastest daily backup' points to incremental. 'Fewest sets needed to restore after a full' points to differential. 'Fresh full without reading all data from production' points to synthetic full. 'Fire destroyed the server room and the backups' points to missing off-site copies. 'Three copies, two media, one off-site' is the 3-2-1 rule, and 'daily, weekly and monthly sets' is GFS."
  ],
  "terms": [
   [
    "Full backup",
    "A copy of all selected data, simplest to restore but the slowest and largest to create."
   ],
   [
    "Incremental backup",
    "A copy of data changed since the last backup of any type; restore needs the full plus every incremental."
   ],
   [
    "Differential backup",
    "A copy of data changed since the last full backup; restore needs the full plus the latest differential."
   ],
   [
    "Synthetic full backup",
    "A full backup assembled on backup storage from a previous full and later incrementals."
   ],
   [
    "3-2-1 rule",
    "Keep three copies of data on two types of media with one copy off-site."
   ],
   [
    "Grandfather-father-son (GFS)",
    "A rotation scheme using daily, weekly and monthly backup sets kept for increasing lengths of time."
   ],
   [
    "RPO and RTO",
    "Recovery point objective is the acceptable data loss; recovery time objective is how quickly service must return."
   ]
  ],
  "example": "Ransomware encrypts a small firm's file server and the backup NAS on the same network. Because the firm follows the 3-2-1 rule, it also has a weekly copy in immutable cloud storage and last month's grandfather set in a safe off-site. The technician restores from the cloud copy after confirming it is clean, losing only a few days of work that is rebuilt from email attachments.",
  "tip": "Incremental: fastest backups, slowest restore (full plus every incremental). Differential: backups grow each day, restore needs only the full plus the latest differential. Untested backups cannot be trusted, and RAID is not a backup.",
  "check": [
   [
    "A full backup runs Sunday and differentials run nightly. The server fails Friday morning. What do you need to restore?",
    "Sunday's full backup and Thursday night's differential."
   ],
   [
    "What does the 3-2-1 rule require?",
    "Three copies of data, on two different types of media or storage, with one copy off-site."
   ],
   [
    "What is the advantage of a synthetic full backup?",
    "It creates a fresh full backup on backup storage without reading all data from production systems again."
   ],
   [
    "Why must restores be tested?",
    "To prove backups are complete, readable and restorable within the required recovery time, rather than assuming they work."
   ]
  ]
 },
 {
  "t": "Safety: ESD straps and mats, grounding, power handling, lifting technique, electrical fire safety, PPE",
  "body": [
   "Technicians work with electricity, heavy equipment, sharp metal and chemicals, so safety procedures protect both you and the equipment you repair. The A+ exam tests standard practices, and scenario questions often ask what to do first or which precaution fits a task. A good mental rule is that personal safety comes first, then protecting the equipment, then getting the job done.",
   "ESD (electrostatic discharge) is the sudden flow of static electricity between two objects at different electrical potentials, like the small shock you feel after walking across carpet. A discharge far too small to feel can still damage or weaken chips on motherboards, RAM and expansion cards, sometimes causing failures that appear weeks later and are hard to trace. To prevent it, wear an ESD wrist strap connected to a grounding point or to unpainted metal on the computer chassis, work on a grounded ESD mat, and keep components in antistatic bags until you install them. If no strap is available, touch unpainted metal on the case frequently to equalize your charge, called self-grounding. Low humidity increases static buildup, so take extra care in dry conditions, and avoid working on carpet in synthetic clothing.",
   "Grounding (earthing) also matters for electrical safety. Equipment connects to earth ground through the third prong of the power plug, so that if a fault occurs, current flows to ground instead of through a person. Never remove the ground prong or use adapters that defeat it. Equipment grounding and ESD protection are different things: an ESD strap contains a resistor so static bleeds away slowly and safely, and it is meant for low-voltage components. Never wear an ESD strap while working on high-voltage equipment such as power supplies or monitors with internal high voltage, because it would give current a path through your body.",
   "Power handling starts with turning off and unplugging equipment before opening it, and pressing the power button afterward to drain residual power. Power supplies, CRT monitors and some printers contain capacitors that can hold a dangerous charge even when unplugged, so never open a power supply unit; replace it as a whole. Follow general electrical safety: do not overload circuits or daisy-chain power strips, keep liquids away, and inspect cords for damage. In larger facilities, lockout/tagout procedures lock a circuit off and label it so nobody re-energizes it while you work. Also remove jewelry, which can catch on parts or conduct electricity.",
   "Lifting technique prevents many back injuries from servers, UPS units and printers. Bend at the knees and hips, not the waist; keep your back straight; hold the load close to your body; lift with your legs; and avoid twisting while carrying. Get help or use a cart for heavy or awkward items; organizations often set a weight above which two people or equipment are required, so follow local policy. Electrical fire safety starts with never using water on an electrical fire, because water conducts electricity. Use a Class C extinguisher in the United States (Class E in some other regions), or a multipurpose ABC or carbon dioxide (CO2) extinguisher rated for electrical fires. If it is safe, cut power to the equipment. Know where extinguishers and exits are and how to raise the alarm, and leave if the fire is not small and contained. PPE (personal protective equipment) includes safety glasses when cutting cable, working with springs or using compressed air; gloves for sharp metal edges or handling toner; and an air filter mask when cleaning dusty equipment or dealing with toner spills. Good cable management prevents trip hazards, and keeping walkways clear protects coworkers as well as you.",
   "Consider a worked example. You are installing RAM in a desktop. You place the PC on an ESD mat, clip the wrist strap to bare metal on the chassis, unplug the power cord, and press the power button to drain residual charge. The new modules stay in their antistatic bag until the moment of installation, and you handle them by the edges. Later that day you need to replace the same PC's power supply: you do not open the old unit, you simply swap the whole assembly.",
   "Common mistakes: opening a power supply to replace a fan; wearing an ESD strap on high-voltage equipment; clipping a strap to painted metal, which does not conduct well; lifting with the back; and grabbing a water extinguisher for a burning PC.",
   "Exam questions follow recognizable patterns. 'protect components from static' points to an ESD strap and mat, 'no strap available' points to touching unpainted metal, 'electrical fire' points to a Class C or CO2 extinguisher, 'heavy UPS to a rack' points to lifting with the legs or getting help, and 'cleaning a toner spill' points to a mask and a toner vacuum."
  ],
  "terms": [
   [
    "ESD (electrostatic discharge)",
    "A sudden flow of static electricity that can damage electronic components without being felt."
   ],
   [
    "ESD wrist strap",
    "A strap with a resistor that connects you to ground so static bleeds away safely while working on components."
   ],
   [
    "ESD mat",
    "A grounded work surface that keeps components and tools at the same potential."
   ],
   [
    "Antistatic bag",
    "Packaging that shields components from static charges during storage and transport."
   ],
   [
    "Grounding",
    "Connecting equipment to earth so fault current flows to ground instead of through a person."
   ],
   [
    "Class C fire",
    "A fire involving energized electrical equipment, fought with non-conductive agents such as CO2."
   ],
   [
    "PPE (personal protective equipment)",
    "Gear such as safety glasses, gloves and masks that protects the wearer from hazards."
   ]
  ],
  "example": "A technician is asked to clean out a dusty server closet and replace a failed server power supply. They wear a mask and safety glasses while using compressed air, get a colleague to help lift the server out of the rack, swap the power supply as a whole unit without opening it, and note that the closet's extinguisher is a CO2 unit suitable for electrical fires.",
  "tip": "Never use water on an electrical fire, never open a power supply, and never wear an ESD strap when working on high-voltage equipment. Lift with your legs, not your back, and touch unpainted metal if no strap is available.",
  "check": [
   [
    "Why should you never wear an ESD strap while working inside a power supply or high-voltage device?",
    "The strap provides a path to ground through your body, which could let dangerous current flow through you."
   ],
   [
    "What type of extinguisher should be used on a burning computer?",
    "A Class C (electrical) extinguisher, such as CO2 or a multipurpose ABC unit, never water."
   ],
   [
    "How can you reduce ESD risk if no wrist strap is available?",
    "Touch unpainted metal on the case frequently to equalize your charge, and handle components by their edges."
   ],
   [
    "What is the correct technique for lifting a heavy UPS?",
    "Bend at the knees, keep your back straight, hold it close, lift with your legs, avoid twisting, and get help or a cart if it is too heavy."
   ]
  ]
 },
 {
  "t": "Environment: safety data sheets, battery and toner disposal, temperature and humidity, ventilation, UPS and surge suppressors",
  "body": [
   "Environmental controls protect three things: people, equipment and the wider environment. Technicians handle hazardous materials such as toner and batteries, dispose of electronic waste that is often regulated by law, and keep equipment running in safe conditions with clean power. The exam expects you to know where to find handling information, how to dispose of common IT waste, what conditions equipment needs, and which power protection device fits which problem.",
   "A safety data sheet (SDS), formerly called a material safety data sheet (MSDS), is provided by the manufacturer for products containing hazardous substances, such as toner, cleaning solvents, thermal paste and batteries. It lists the ingredients and hazards, safe handling and storage, required protective equipment, first-aid measures, what to do about spills and fires, and disposal considerations. When you are unsure how to handle or dispose of something, or someone has been exposed to it, consult the SDS. Organizations keep SDS documents where workers can reach them, and following them is often a workplace safety requirement.",
   "Never put IT equipment or its consumables in regular trash. Batteries, especially lithium-ion, nickel-based and lead-acid types, contain materials that are toxic or can start fires, so take them to approved battery recycling programs, tape or bag the terminals of loose lithium batteries, and handle swollen or damaged lithium-ion batteries carefully in a fire-safe container. Toner cartridges should go back to the manufacturer's recycling program or a recycler. Clean toner spills with a toner vacuum designed for fine particles; an ordinary vacuum can blow the powder back into the air and the fine dust can even ignite. Wear a mask, and use cold water, not hot, to wash toner off skin or clothes, since heat melts it. Old computers, monitors (CRTs contain lead), phones and printers are e-waste and must go to certified recyclers after data has been destroyed. Local government regulations always take precedence over general guidance.",
   "Temperature and humidity affect reliability. Heat shortens component life and causes throttling and unexpected shutdowns, so keep equipment rooms cool and within the manufacturer's specified operating range. Humidity that is too low increases static electricity and ESD (electrostatic discharge) risk, while humidity that is too high causes condensation and corrosion. Server rooms therefore monitor both and use climate control. When moving equipment from a cold vehicle into a warm room, let it acclimate before powering it on, so condensation can evaporate. Protect equipment from dust and airborne particles with enclosures or filters, and clean it with compressed air or an electronics-safe vacuum. Ventilation matters for both people and equipment. Keep vents clear, do not block airflow around computers, and do not stack devices on top of each other. Rooms with laser printers or chemicals should be well ventilated. Servers usually draw cool air in the front and exhaust hot air out the back, which is the basis for hot aisle and cold aisle layouts in server rooms.",
   "Power problems damage hardware and data. A surge suppressor (surge protector) diverts voltage spikes away from equipment; its rating in joules indicates how much energy it can absorb, and its protection wears down after absorbing surges. A plain power strip only adds outlets and offers no protection. A UPS (uninterruptible power supply) contains a battery that keeps equipment running through short outages, sags (brownouts) and fluctuations, giving time for a clean shutdown or for a generator to start. Many UPS units connect to the computer by USB or network so it can shut down automatically when the battery runs low. Size a UPS for the load and the runtime you need, and test and replace its batteries periodically. Never plug a laser printer into a small UPS, because its fuser draws large bursts of power.",
   "Consider a worked example. During a storm, the power in a small office flickers several times and then fails for twenty minutes. The file server is connected to a UPS, keeps running through the flickers, and when the outage continues it receives a low-battery signal over USB and shuts down cleanly. The desktop PCs on ordinary power strips lose unsaved work, and one has a corrupted document. You recommend small UPS units for key workstations and replacing the power strips with surge suppressors.",
   "Common mistakes: using a regular vacuum on toner; throwing batteries or cartridges in the trash; believing a power strip protects equipment; expecting a surge suppressor to keep equipment running during an outage; and running equipment in a hot closet with blocked vents.",
   "Exam questions follow recognizable patterns: 'how to handle or dispose of a chemical' points to the SDS, 'keep the server running long enough to shut down cleanly' points to a UPS, 'protect against spikes from lightning' points to a surge suppressor, 'static problems in winter' points to low humidity, and 'disposal rules conflict' points to following local government regulations."
  ],
  "terms": [
   [
    "Safety data sheet (SDS)",
    "A manufacturer's document describing a product's hazards, safe handling, first aid, spill response and disposal."
   ],
   [
    "E-waste",
    "Discarded electronic equipment that must be recycled through certified channels because it contains hazardous materials."
   ],
   [
    "Toner vacuum",
    "A vacuum with fine filtering designed to safely collect toner particles."
   ],
   [
    "Surge suppressor",
    "A device that diverts voltage spikes away from connected equipment, rated in joules."
   ],
   [
    "UPS (uninterruptible power supply)",
    "A battery-backed device that keeps equipment powered through outages and sags long enough for a clean shutdown."
   ],
   [
    "Brownout (sag)",
    "A temporary drop in voltage below normal levels."
   ],
   [
    "Hot aisle / cold aisle",
    "A server room layout where equipment intakes face a cool aisle and exhausts face a hot aisle."
   ]
  ],
  "example": "A technician finds a pile of old laptops, loose lithium batteries and used toner cartridges in a storage room. They check the SDS for the batteries, tape the terminals and place them in a recycling container, return the cartridges through the manufacturer's program, and send the laptops to a certified e-waste recycler after the drives are wiped, recording each item for the asset records.",
  "tip": "To learn how to handle or dispose of a chemical, consult its SDS. A UPS keeps power on during outages; a surge suppressor only protects against spikes; a power strip protects against nothing. Local regulations override general disposal advice.",
  "check": [
   [
    "Where do you find instructions for handling a toner spill or disposing of a cleaning solvent?",
    "In the product's safety data sheet (SDS)."
   ],
   [
    "Why should you not use a regular vacuum on a toner spill?",
    "It can spread the fine particles into the air and the toner dust can ignite; use a toner vacuum and a mask."
   ],
   [
    "What is the difference between a surge suppressor and a UPS?",
    "A surge suppressor diverts voltage spikes; a UPS also uses a battery to keep equipment running through outages and sags."
   ],
   [
    "What problem does very low humidity cause for IT equipment?",
    "It increases static buildup and the risk of electrostatic discharge damaging components."
   ]
  ]
 },
 {
  "t": "Prohibited content and privacy: incident response and chain of custody, licensing (EULA, DRM, open source vs commercial, personal vs corporate), PII, PCI DSS, GDPR, PHI, data retention",
  "body": [
   "Technicians see a lot of other people's data. Sometimes you come across prohibited content or activity on a device, such as illegal material, stolen data or clear policy violations, and sometimes you simply handle regulated data during routine work. Handling both correctly protects the users, the organization and any later investigation. This topic combines three areas the exam tests: responding to prohibited content, software licensing, and the types of regulated data and how long to keep them.",
   "When you find prohibited content, the first response is to identify what you have found without browsing further than needed, and then report it through proper channels, usually your manager or the security team, according to company policy. Next, preserve the data or device: do not delete anything, copy it around, or keep using the device, because changes can destroy evidence. Document everything: what you saw, when, where, and every action you took. If the matter could involve law enforcement or court proceedings, maintain chain of custody, a written record of everyone who handled the evidence, when, and what they did with it, from collection to presentation. Evidence is sealed, labeled and signed over each time it changes hands. A gap in the chain can make evidence inadmissible, because no one can prove it was not altered. Do not confront the user or investigate on your own; that is the responsibility of those you reported to.",
   "Licensing is a compliance area too. An EULA (end-user license agreement) is the contract a user accepts to install software; you do not own the software, only a license to use it under its terms. DRM (digital rights management) is technology that enforces licensing by restricting copying, sharing or use of software, music and video. Commercial (proprietary) software is sold or subscribed under restrictive licenses, and its source code is not shared. Open-source software makes its source code available and allows use, modification and sharing, but its licenses still have conditions that must be followed, such as keeping notices or sharing modifications. Personal licenses are for an individual, often limited to non-commercial use, while corporate (business or enterprise) licenses cover organizational use, often counted by users, devices or cores. Using a personally licensed copy at work may violate the EULA, so track licenses and report unlicensed software.",
   "Regulated data needs special care. PII (personally identifiable information) is any data that identifies a person, such as a name with a birth date, government ID number, address or personal email. PHI (protected health information) is health information linked to an individual, protected in the United States under HIPAA (Health Insurance Portability and Accountability Act). PCI DSS (Payment Card Industry Data Security Standard) is an industry standard, not a law, that organizations storing, processing or transmitting payment card data must follow, covering encryption, access control and network security. GDPR (General Data Protection Regulation) is the European Union regulation that protects personal data of people in the EU, requiring lawful processing, data minimization, breach notification and individual rights such as access and erasure, and it applies to organizations anywhere that process such data.",
   "Data retention policies define how long each kind of data must be kept to meet legal, regulatory and business needs, and when it must be securely destroyed. Keeping data too briefly can break laws or lose records needed for audits; keeping it too long increases breach exposure and legal risk. Follow the policy, destroy data securely at the end of its retention period, and never destroy data that is under a legal hold, which suspends normal deletion because of litigation or investigation.",
   "Consider a worked example. While repairing an employee's laptop, you notice a folder of spreadsheets containing customer credit card numbers, which policy forbids storing on laptops. You stop, open nothing further, note the folder path and time, and report it to your manager and the security team. At their direction you power the laptop off, seal and label it, and hand it over with a signed chain-of-custody form. Because the data is cardholder data, the security team treats it as a possible PCI DSS issue.",
   "Common mistakes: deleting prohibited content to 'clean up'; continuing to browse through files to see how much there is; confronting the user; leaving gaps in the chain-of-custody record; calling PCI DSS a law; and assuming open-source software has no license obligations. Another mistake is thinking GDPR applies only to companies based in Europe.",
   "Exam questions use clear clue words. 'Found illegal content on a user's PC, what first' points to reporting through proper channels and preserving evidence, not deleting or confronting. 'Documented handling of evidence' points to chain of custody. 'Credit card numbers' points to PCI DSS, 'medical records' to PHI, 'EU citizens' data' to GDPR, and 'name and birth date' to PII. 'Technology restricting copying of media' points to DRM, and 'how long to keep email' points to the data retention policy."
  ],
  "terms": [
   [
    "Chain of custody",
    "A documented record of everyone who handled evidence, when and what they did, preserving its integrity."
   ],
   [
    "EULA (end-user license agreement)",
    "The contract defining the terms under which software may be used."
   ],
   [
    "DRM (digital rights management)",
    "Technology that restricts copying and use of digital content to enforce licensing."
   ],
   [
    "Open-source license",
    "A license that makes source code available and permits use, modification and sharing under stated conditions."
   ],
   [
    "PII (personally identifiable information)",
    "Any data that can identify a specific person."
   ],
   [
    "PHI (protected health information)",
    "Health information linked to an individual, protected in the US under HIPAA."
   ],
   [
    "PCI DSS",
    "The Payment Card Industry Data Security Standard for protecting payment card data."
   ],
   [
    "GDPR",
    "The EU General Data Protection Regulation governing personal data of people in the EU."
   ]
  ],
  "example": "A small business discovers that several employees installed a personally licensed photo editor on work PCs. The IT technician documents the installations, explains that the personal license forbids commercial use, removes the software, and arranges corporate licenses through procurement, updating the asset records so future audits show compliance.",
  "tip": "Order for prohibited content: identify, report through proper channels, preserve evidence and document. PCI DSS covers card data, PHI is health data, GDPR is EU personal data, and PII is any identifying data. Never delete data under legal hold.",
  "check": [
   [
    "You find prohibited material on a PC during a repair. What should you do?",
    "Stop, report it through proper channels, preserve the device without altering it, and document what you saw and did."
   ],
   [
    "Why is chain of custody important?",
    "It proves who handled evidence and that it was not altered, so it remains admissible."
   ],
   [
    "Which standard applies to a company that stores customer credit card numbers?",
    "PCI DSS, an industry standard for protecting payment card data."
   ],
   [
    "What is the risk of keeping data longer than the retention policy requires?",
    "It increases exposure in a breach and legal risk, while providing no business value."
   ]
  ]
 },
 {
  "t": "Professionalism: punctuality, active listening, avoiding jargon, handling difficult customers, confidentiality, setting expectations and following up",
  "body": [
   "Technical skill solves problems, but professionalism decides whether customers trust you and whether they call you again. IT support is a customer-facing job, whether the customer is a paying client or a coworker, and CompTIA includes communication and professional conduct in the exam. Scenario questions often present several technically correct actions and ask for the most professional one, so you need to recognize good conduct as well as practice it. Punctuality and presence come first. Arrive on time for appointments, and if you will be late, contact the customer before the appointment time, apologize and give a new estimate. Dress appropriately for the environment, whether formal or business casual. While with a customer, avoid distractions: no personal calls, texting, social media or side conversations with coworkers unless it is an urgent work matter. Keep a positive attitude, project confidence, and use proper language, avoiding slang and anything that could be offensive.",
   "Active listening means giving full attention, letting the customer finish without interrupting, taking notes, and then restating the problem in your own words to confirm you understood. Ask open-ended questions such as 'What were you doing when this happened?' to gather information, then closed-ended questions such as 'Does it happen on every website?' to narrow things down. Avoid jargon, acronyms and technical slang; explain in plain language suited to the customer's level without talking down to them. 'The network card driver' can become 'the software that lets your laptop talk to Wi-Fi'.",
   "Handling difficult customers takes patience. Stay calm, and do not argue, become defensive or take it personally. Do not minimize their problem or blame them, even if they caused it, and never post about customers or their experiences on social media. Let them explain, acknowledge their frustration, restate the issue to show you understand, and focus on what you can do next. If the situation escalates beyond what you can resolve, involve your supervisor. Respect cultural differences, use appropriate titles and names, and treat everyone with the same courtesy.",
   "Confidentiality is part of professionalism. While working, you may see private files, email, screens, and documents on desks and printers. Do not read, copy or discuss them, and ask the user to close sensitive material if you need to work on the screen. Do not ask for passwords when another approach exists, and if you must know one, have the user enter it or change it afterward. Respect customers' property too: their equipment, workspace and belongings.",
   "Setting expectations and following up close the loop. Tell the customer what you are going to do, how long it will likely take, and what options exist, including costs where relevant, so they can make informed decisions. If a repair cannot be completed, offer alternatives such as a loaner, escalation or replacement. When the work is done, explain what was fixed in plain words, provide documentation of the services performed, and verify the customer is satisfied. Follow up later to confirm the fix held, and handle any disputes through the organization's formal process, documenting everything in the ticket.",
   "Consider a worked example. A frustrated manager says her laptop 'never works' and that IT is useless. You listen without interrupting, acknowledge that losing time before a deadline is stressful, and restate the problem: the laptop drops Wi-Fi in meeting rooms. You explain the plan in plain words, estimate thirty minutes, update the wireless driver, and demonstrate that it stays connected in a meeting room. Two days later you check in to confirm the problem is gone, and you note the follow-up in the ticket.",
   "Common mistakes: answering a personal call while with a customer; interrupting to jump to a solution; using acronyms the user does not understand; arguing about whose fault a problem is; commenting on files or photos seen on the screen; and promising a time you cannot meet.",
   "Exam questions follow recognizable patterns. Choose the answer that is calm, respectful, keeps the customer informed and avoids distractions. 'Customer is angry' points to listening and acknowledging, not arguing. 'Will be late' points to calling ahead. 'Sensitive document on screen' points to not reading it and asking the user to close it. 'Repair takes longer than expected' points to updating the customer with options. When two answers both seem polite, prefer the one that communicates proactively and documents the outcome."
  ],
  "terms": [
   [
    "Active listening",
    "Giving full attention, not interrupting, taking notes and restating the problem to confirm understanding."
   ],
   [
    "Open-ended question",
    "A question that invites a detailed answer, used to gather information."
   ],
   [
    "Closed-ended question",
    "A question with a short or yes/no answer, used to narrow down a problem."
   ],
   [
    "Jargon",
    "Technical terms and acronyms that a non-technical customer may not understand."
   ],
   [
    "Confidentiality",
    "Protecting customers' private information and not reading, copying or discussing it."
   ],
   [
    "Setting expectations",
    "Telling the customer what will be done, how long it will take and what options and costs exist."
   ],
   [
    "Follow-up",
    "Contacting the customer after the work to confirm the problem stays solved."
   ]
  ],
  "example": "A technician running late to a home office appointment calls the customer twenty minutes before the scheduled time, apologizes and gives a new arrival time. On site, they avoid their phone, explain the fix without acronyms, cover the customer's open banking page before taking control, and follow up by email two days later to confirm the printer still works.",
  "tip": "When in doubt on professionalism questions, choose the answer that is calm, respectful, keeps the customer informed and avoids distractions. Never argue, blame the user, post about customers or look through their private data.",
  "check": [
   [
    "You will be 30 minutes late to an appointment. What should you do?",
    "Contact the customer before the appointment time, apologize and give a new estimated arrival time."
   ],
   [
    "What is the purpose of restating the customer's problem in your own words?",
    "It confirms you understood correctly and shows the customer you were listening."
   ],
   [
    "A customer becomes angry and blames IT. What is the professional response?",
    "Stay calm, listen without arguing, acknowledge their frustration, restate the issue and focus on the solution, escalating to a supervisor if needed."
   ],
   [
    "You see a confidential document open on a user's screen while working. What should you do?",
    "Do not read it; ask the user to close or save it before you continue."
   ]
  ]
 },
 {
  "t": "Scripting basics: .bat, .ps1, .vbs, .sh, .js, .py; use cases (automation, restarts, drive mapping, installs, backups, updates) and risks",
  "body": [
   "A script is a plain-text file of commands that an interpreter runs in order. Unlike a compiled program, you can open a script in a text editor, read it, and change it. Scripts let technicians automate repetitive tasks, apply the same configuration to many machines and avoid manual mistakes. The A+ exam does not expect you to write complex code, but it does expect you to recognize common script types by their extension, know what they are used for, recognize basic building blocks, and understand the risks.",
   "Know the script types. `.bat` is a Windows batch file run by the Command Prompt interpreter (cmd.exe); it uses classic commands such as `net use`, `copy` and `robocopy`. `.ps1` is a PowerShell script, the modern and far more powerful Windows scripting language, able to manage almost every part of Windows and many cloud services; PowerShell's execution policy controls whether scripts may run. `.vbs` is VBScript, an older Windows scripting language run by Windows Script Host; Microsoft has deprecated it, but it still appears in legacy logon scripts and in malware. `.sh` is a shell script for Linux and macOS, run by bash or another shell, and usually starts with a line naming its interpreter. `.js` is JavaScript, used in web browsers and on servers through Node.js, and on Windows also runnable by Windows Script Host. `.py` is Python, a cross-platform, general-purpose language popular for automation and data tasks.",
   "Recognize the building blocks. Variables are named storage for values, such as a username or file path. Comments are notes the interpreter ignores: `REM` or `::` in batch files, `#` in PowerShell, bash and Python, an apostrophe in VBScript and `//` in JavaScript. Loops repeat actions, for example once for each computer in a list, and conditional statements (`if`) run code only when something is true, such as only if a folder exists. Data types include strings (text), integers (whole numbers) and Boolean values (true or false). Common use cases include basic automation of repetitive tasks; restarting machines or services on a schedule; remapping network drives at logon; installing applications silently across many computers; initiating updates; running backups and copying files with tools such as robocopy or rsync; gathering information such as installed software or disk space; and remote administration of many devices at once. Scripts are often deployed through Group Policy, an RMM (remote monitoring and management) tool or a scheduled task.",
   "```\nREM map-drives.bat: map shared drives at logon\nnet use S: \\\\fileserver\\sales /persistent:yes\nnet use H: \\\\fileserver\\home\\%USERNAME%\n```",
   "Scripts carry real risks. A script runs with the permissions of whoever runs it, so a mistake in a script run as administrator can delete data or misconfigure hundreds of machines at once. Test scripts in a sandbox or on a single test machine before deploying them widely. Scripts from the internet may contain malware, and attackers commonly use PowerShell, VBScript and JavaScript files as email attachments or for fileless attacks, so review scripts before running them, keep execution policies and application controls in place, and digitally sign trusted scripts. The exam's risk list includes unintentionally introducing malware, inadvertently changing system settings, and browser or system crashes caused by mishandling resources, such as a loop that never ends and consumes all memory. Never hard-code passwords in scripts; use a secure credential store.",
   "Consider a worked example. Every new hire needs the same five network drives mapped. Instead of mapping them by hand at each desk, you write a short batch logon script with `net use` commands, add comments explaining each line, and test it on a lab machine with a standard user account. You find one path is wrong, fix it, and then assign the script through Group Policy. Every user now gets the same drives automatically at sign-in, and the script is documented in the knowledge base.",
   "Common mistakes: running an untested script as administrator across all computers; downloading a script from a forum and running it without reading it; storing passwords in plain text inside a script; and confusing file types, such as thinking `.sh` runs natively in Windows Command Prompt.",
   "Exam questions follow recognizable patterns. Match extensions to platforms: `.bat`, `.ps1` and `.vbs` are Windows; `.sh` is Linux and macOS; `.py` and `.js` are cross-platform. 'Map drives at logon' points to a logon script, 'unexpected system changes after running a script' points to insufficient testing, and 'script from an email attachment' points to malware risk."
  ],
  "terms": [
   [
    "Script",
    "A plain-text file of commands executed in order by an interpreter."
   ],
   [
    "Batch file (.bat)",
    "A Windows script run by the Command Prompt interpreter."
   ],
   [
    "PowerShell (.ps1)",
    "Microsoft's powerful scripting language and shell for administering Windows and other systems."
   ],
   [
    "Shell script (.sh)",
    "A script for Linux or macOS run by bash or another shell."
   ],
   [
    "Variable",
    "A named storage location that holds a value a script can use and change."
   ],
   [
    "Loop",
    "A structure that repeats a set of commands, for example for each item in a list."
   ],
   [
    "Execution policy",
    "A PowerShell setting that controls whether and which scripts are allowed to run."
   ]
  ],
  "example": "A technician writes a PowerShell script to delete temporary files on all lab PCs and tests it only on their own laptop. On the lab PCs a variable is empty because of a different folder layout, and the script starts deleting the wrong directory until someone notices. After restoring from backup, the team adopts a rule that scripts are reviewed, tested on a sample lab machine and signed before deployment.",
  "tip": "Match extensions to platforms: .bat, .ps1 and .vbs are Windows; .sh is Linux and macOS; .py and .js are cross-platform. The main risks are introducing malware, changing system settings unintentionally and crashes from mishandled resources, so test before deploying.",
  "check": [
   [
    "Which script extension would you expect for automating tasks on a Linux server?",
    ".sh, a shell script run by bash or another shell."
   ],
   [
    "Name three common uses for scripts in IT support.",
    "Examples include mapping network drives, installing applications, restarting services or machines, running backups and initiating updates."
   ],
   [
    "Why should scripts be tested before wide deployment?",
    "They run with the user's permissions and can change settings, delete data or consume resources across many machines at once."
   ],
   [
    "How do you write a comment in a PowerShell or Python script?",
    "Start the line with the # character; the interpreter ignores it."
   ]
  ]
 },
 {
  "t": "Remote access: RDP, VPN, VNC, SSH, RMM, SPICE, WinRM, screen-sharing and file-transfer tools, and their security considerations",
  "body": [
   "Remote access lets technicians support users and manage systems without traveling to them, and lets staff work from anywhere. Each method has a specific purpose, and each also creates a path attackers can try to use. Exposed remote access services are among the most common entry points for ransomware, and scammers regularly trick people into installing remote tools. The exam tests both sides: which tool fits the job, and how to secure it.",
   "RDP (Remote Desktop Protocol) gives a full graphical desktop session on a Windows computer, by default over TCP port 3389. Hosting RDP connections requires a Pro or higher edition of Windows, while any edition can run the client. Never expose RDP directly to the internet; put it behind a VPN or a remote desktop gateway, require NLA (Network Level Authentication), which authenticates the user before a session is created, add MFA (multifactor authentication), and use strong passwords with account lockout. VNC (Virtual Network Computing) is a cross-platform screen-sharing protocol that shows and controls the actual console session; many implementations have weak or no encryption, so tunnel it through SSH or a VPN.",
   "SSH (Secure Shell) provides an encrypted command-line session, by default on TCP port 22, and is the standard for managing Linux servers and network devices. It replaced Telnet, which sends everything, including passwords, in plain text. Use key-based authentication rather than passwords where possible and disable direct root login. SSH also carries secure file transfer through SFTP (SSH File Transfer Protocol) and SCP (Secure Copy Protocol). SPICE (Simple Protocol for Independent Computing Environments) is a remote display protocol used mainly to reach virtual machine consoles on some virtualization platforms. WinRM (Windows Remote Management) lets administrators run PowerShell commands and scripts on remote Windows computers without a graphical session; restrict it to administrators and management networks.",
   "A VPN (virtual private network) creates an encrypted tunnel from a remote device to the organization's network, so remote users can reach internal resources as if they were in the office. A VPN is not a remote control tool itself; it provides the secure connection over which other tools, such as RDP, run. VPN accounts need MFA and prompt removal when people leave. RMM (remote monitoring and management) platforms are used by IT departments and MSPs (managed service providers) to monitor many endpoints, deploy patches and software, run scripts and take remote control from one console. Because the RMM agent has administrative control of every managed device, a compromised RMM account is extremely dangerous, so protect it with MFA, least privilege and logging.",
   "Screen-sharing and remote-support tools, including desktop sharing in video conferencing and third-party remote support apps, let a user invite a technician to view or control their screen, ideally with the user's explicit consent for each session and a visible indicator while it is active. File-transfer tools, such as SFTP, cloud file sharing and managed transfer services, should use encryption; avoid plain FTP (File Transfer Protocol), which sends credentials unencrypted. Across all methods: use encryption, MFA and strong authentication; allow only approved tools; restrict access by IP address or require a VPN; keep software patched; log sessions; and train users that legitimate IT staff will not cold-call them demanding remote access.",
   "Consider a worked example. A small business allows RDP directly from the internet to its office server, and the Security log shows thousands of failed sign-in attempts from unfamiliar addresses. You close port 3389 on the firewall, set up a VPN with MFA for remote staff, allow RDP only from VPN addresses, confirm NLA is required, and enable account lockout. The failed attempts from the internet stop, and remote staff connect through the VPN as before.",
   "Common mistakes: forwarding RDP straight through the router for convenience; using Telnet or plain FTP because they are simple; thinking a VPN alone gives remote control of a PC; leaving unused remote tools installed; sharing one RMM administrator account among technicians; and letting remote-support sessions start without the user's consent.",
   "Exam questions use strong clue words. 'Encrypted command line to a Linux server' points to SSH on port 22. 'Full graphical desktop on a Windows PC' points to RDP on 3389. 'Cross-platform screen sharing of the console session' points to VNC. 'Run PowerShell on remote Windows machines without a desktop' points to WinRM. 'Manage patches and monitoring for hundreds of client endpoints' points to RMM. 'Virtual machine console display' points to SPICE, and 'secure tunnel to the office network' points to a VPN."
  ],
  "terms": [
   [
    "RDP (Remote Desktop Protocol)",
    "Microsoft's protocol for full graphical remote desktop sessions, by default on TCP port 3389."
   ],
   [
    "SSH (Secure Shell)",
    "An encrypted remote command-line protocol, by default on TCP port 22, that replaced Telnet."
   ],
   [
    "VNC (Virtual Network Computing)",
    "A cross-platform screen-sharing protocol that controls the console session, often needing an encrypted tunnel."
   ],
   [
    "VPN (virtual private network)",
    "An encrypted tunnel connecting a remote device to a private network."
   ],
   [
    "RMM (remote monitoring and management)",
    "A platform for monitoring, patching, scripting and remotely controlling many endpoints."
   ],
   [
    "WinRM (Windows Remote Management)",
    "A service that lets administrators run PowerShell commands on remote Windows computers."
   ],
   [
    "SPICE",
    "A remote display protocol used to access virtual machine consoles."
   ],
   [
    "NLA (Network Level Authentication)",
    "An RDP setting that requires users to authenticate before a remote session is created."
   ]
  ],
  "example": "An MSP technician supports forty client offices through an RMM platform. After a peer company is breached through a stolen RMM password, the MSP enforces MFA on every RMM account, gives each technician a named account with only the permissions they need, restricts console access to the office VPN, and reviews session logs weekly.",
  "tip": "SSH (22) replaced Telnet for secure command-line access; RDP (3389) is Windows graphical access and should never be exposed directly to the internet. A VPN secures the connection but is not a remote-control tool by itself, and RMM accounts need MFA.",
  "check": [
   [
    "Which remote access method provides an encrypted command line to Linux servers, and on what default port?",
    "SSH, on TCP port 22."
   ],
   [
    "Why should RDP not be exposed directly to the internet?",
    "It is constantly targeted by password guessing and exploits and is a common ransomware entry point; put it behind a VPN or gateway with MFA."
   ],
   [
    "What is the purpose of an RMM platform?",
    "To monitor, patch, script and remotely control many endpoints from one console, as IT teams and MSPs do."
   ],
   [
    "Does a VPN let a technician control a user's screen?",
    "No. A VPN only provides an encrypted connection to the network; a remote control tool such as RDP or VNC runs over it."
   ]
  ]
 },
 {
  "t": "Artificial intelligence basics: app integration, appropriate-use policy and plagiarism, bias, hallucinations and accuracy, public vs private models and data privacy",
  "body": [
   "Artificial intelligence (AI) tools, especially generative AI built on LLMs (large language models), are now part of many everyday applications: office suites that draft documents and summarize meetings, email clients that suggest replies, help desk systems that propose answers, search engines, and operating system assistants. Technicians support these features and advise users on using them responsibly, so the exam covers the basics: how AI is integrated, what policies govern it, its known weaknesses, and how to protect data when using it.",
   "App integration means AI features are embedded in existing software or connected to it through APIs (application programming interfaces). Integration raises practical questions for IT: what data the AI feature can reach, such as a user's entire mailbox and file storage; whether the user is licensed for it; whether the organization has approved it; and how it is configured. AI features usually act with the signed-in user's permissions, so poorly set file permissions can suddenly expose information through AI search and summaries. Reviewing access before enabling an AI assistant is a sensible step.",
   "Organizations should publish an appropriate-use policy for AI, similar to an acceptable use policy. It typically lists which AI tools are approved, what types of data may and may not be entered, when output must be reviewed by a person, and when AI use must be disclosed. Plagiarism is a concern: presenting AI-generated text or code as your own original work may violate academic or workplace rules, and generated content can closely resemble existing copyrighted material. Users remain responsible for what they submit, whoever or whatever drafted it.",
   "AI has known weaknesses. Bias arises because models learn from training data that reflects human and historical biases, so results can be unfair or skewed, for example in screening job applications or describing groups of people. Hallucinations are confident, plausible-sounding outputs that are simply false, such as invented facts, citations, commands, settings or menu paths that do not exist. Because a model generates likely-sounding text rather than looking up verified facts, accuracy must be checked. Verify important outputs against authoritative sources, test generated scripts and commands in a sandbox before running them on real systems, and keep a human in the loop for decisions that affect people.",
   "Public versus private models is mainly a data privacy question. A public model is a consumer AI service available to anyone. Depending on its terms, the prompts and files users enter may be stored, reviewed by the provider or used to train future models, and could be exposed. Entering customer PII (personally identifiable information), PHI (protected health information), payment card data, passwords, source code or confidential business information into such a service can breach policy, contracts and regulations. A private model is one run by the organization itself or provided under an enterprise agreement that keeps data within the organization's control and excludes it from training. Organizations often steer users toward approved enterprise tools and use DLP (data loss prevention) controls to block sensitive data from reaching unapproved AI services.",
   "Consider a worked example. A help desk technician asks a public AI chatbot for a PowerShell command to fix a user's problem and pastes in the full error log, which includes the user's email address and internal server names. Company policy permits only the enterprise AI assistant for work data. The manager explains the privacy risk and reports the exposure under the data-handling procedure. The technician also discovers that one command the chatbot suggested does not exist, a hallucination that testing in a sandbox would have caught before it reached a real machine.",
   "Common mistakes: trusting AI output because it sounds confident; running AI-generated scripts directly in production; pasting confidential or regulated data into a public tool; assuming an AI assistant can see only 'safe' files when it inherits the user's access; submitting AI-written work as your own without disclosure where rules require it; and assuming AI decisions are neutral.",
   "Exam questions use recognizable clues. 'Invented a citation or a command that does not exist' points to a hallucination. 'Results unfairly favor one group' points to bias. 'Employee pasted customer data into a public chatbot' points to a data privacy violation and the need for private or approved models. 'Rules on which AI tools may be used and how' points to an appropriate-use policy. 'Presented AI-generated work as original' points to plagiarism, and 'AI assistant revealed files a user should not see' points to permissions and app integration."
  ],
  "terms": [
   [
    "Generative AI",
    "AI that creates new text, images or code based on patterns learned from training data."
   ],
   [
    "Large language model (LLM)",
    "An AI model trained on large amounts of text to generate and interpret language."
   ],
   [
    "Hallucination",
    "A confident but false or invented output produced by an AI model."
   ],
   [
    "Bias",
    "Systematic unfairness in AI output caused by skewed training data or design."
   ],
   [
    "Appropriate-use policy",
    "An organizational policy defining approved AI tools, permitted data and review requirements."
   ],
   [
    "Public model",
    "A consumer AI service open to anyone whose terms may allow storing or training on user input."
   ],
   [
    "Private model",
    "An AI model run by or contracted for an organization that keeps its data under the organization's control."
   ]
  ],
  "example": "A company enables an AI assistant in its office suite. Within a day, a user asks it to summarize 'salary information' and receives details from a spreadsheet that had been shared with everyone by mistake. IT fixes the file permissions, reviews other broadly shared folders, and publishes an appropriate-use policy explaining what the assistant can reach and what data may be entered into it.",
  "tip": "Never put confidential or regulated data into a public AI model unless policy explicitly allows it. Always verify AI output, since hallucinations sound confident, and remember that AI features inherit the user's access permissions.",
  "check": [
   [
    "What is an AI hallucination?",
    "A confident, plausible-sounding output that is false, such as an invented fact, citation or command."
   ],
   [
    "Why is entering customer data into a public AI chatbot risky?",
    "The provider may store, review or train on the input, which can expose the data and violate policy or regulations."
   ],
   [
    "What does an AI appropriate-use policy typically define?",
    "Approved tools, what data may be entered, when human review is required and when AI use must be disclosed."
   ],
   [
    "How should a technician handle a script generated by AI?",
    "Review it, test it in a sandbox or test machine, and verify it against documentation before running it on production systems."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
