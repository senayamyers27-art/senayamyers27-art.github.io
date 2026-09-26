/* Systems administration labs: help desk troubleshooting, Windows deployment, Linux storage,
   systemd, package management and patching, PowerShell administration, Azure administration,
   Kubernetes cluster administration and PostgreSQL administration. Format: LABS_FORMAT.md. */
CertHub.registerLabs([
  {
    "id": "lab-helpdesk-tickets",
    "title": "Help desk simulation: build a troubleshooting kit and close six Windows tickets",
    "track": "Systems administration",
    "level": "Beginner",
    "minutes": 210,
    "cost": "Free (Windows evaluation VM, built-in tools and Sysinternals)",
    "summary": "Build a technician's troubleshooting kit, stage six realistic faults on your own Windows VM (stopped print spooler, bad DNS server, a user whose files 'vanished' because of a broken profile, a full system disk, a disabled network driver and a CPU-hogging startup item), then work each one as a ticket with the CompTIA troubleshooting method and write a knowledge-base article.",
    "realWorld": "Help desk and desktop support staff close this exact mix of tickets every week. Interviewers for first-line roles ask you to talk through a ticket from symptom to root cause, and the people who get hired are the ones who test a theory before changing things, check the event log, and document the fix so the next technician is faster.",
    "youWillNeed": [
      "win-client01 (192.168.56.20) from lab-home-lab: Windows 11 Enterprise evaluation, with its NAT adapter ('Ethernet') and host-only adapter ('Ethernet 2')",
      "ubuntu-srv01 (192.168.56.10) running, as the 'file server' users complain they cannot reach",
      "PowerShell run as Administrator",
      "Optional: a friend to run the staging script so you do not know which fault is coming"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Stage every fault only on your own lab VM and take a snapshot first. The staging script deliberately disables a service, a network device and a DNS setting, fills the disk and adds a CPU-hungry startup entry; never run it on a work or family computer. Revert to the snapshot when you finish.",
    "steps": [
      {
        "title": "Snapshot and set up a ticket template",
        "body": "Take a snapshot named 'pre-helpdesk' so you can always get back. Then create a ticket log. Every ticket you close in this lab gets the same fields, following the CompTIA A+ method: identify the problem, establish a theory of probable cause, test the theory, plan and implement the fix, verify full functionality (and add preventive measures), and document findings. Priority comes from impact (how many people) and urgency (how soon it hurts the business).",
        "cmd": "VBoxManage snapshot \"win-client01\" take \"pre-helpdesk\"\n# On win-client01 (PowerShell as Administrator):\nNew-Item -ItemType Directory -Path C:\\Kit, C:\\Kit\\Tickets -Force | Out-Null\n@'\nTicket:        HD-000\nReported by:   \nSymptom (user's words):\nImpact / urgency / priority:\nQuestions asked and answers:\nTheory 1 (and test result):\nTheory 2 (and test result):\nRoot cause:\nFix applied:\nVerification (what the user can now do):\nPrevention:\nTime to resolve:\n'@ | Set-Content C:\\Kit\\Tickets\\TEMPLATE.txt",
        "check": "C:\\Kit\\Tickets\\TEMPLATE.txt exists and the snapshot is listed in VirtualBox."
      },
      {
        "title": "Build your troubleshooting kit",
        "body": "A technician's kit is mostly knowing which built-in tool answers which question. Install the free Sysinternals Suite (Autoruns, Process Explorer, Process Monitor) and record a baseline of the healthy machine; comparing against a known-good baseline is the fastest way to spot what changed. Learn the shortcuts: eventvwr.msc (logs), services.msc, devmgmt.msc, diskmgmt.msc, taskmgr, resmon, msinfo32, printmanagement.msc and msconfig.",
        "cmd": "winget install --id Microsoft.Sysinternals.Suite -e --accept-package-agreements --accept-source-agreements\n# Healthy baseline for later comparison\nGet-ComputerInfo | Select-Object CsName, OsName, OsVersion, OsLastBootUpTime | Out-File C:\\Kit\\baseline.txt\nGet-Service | Where-Object StartType -eq 'Automatic' | Select-Object Name, Status | Out-File -Append C:\\Kit\\baseline.txt\nGet-NetAdapter | Select-Object Name, Status, LinkSpeed | Out-File -Append C:\\Kit\\baseline.txt\nGet-DnsClientServerAddress -AddressFamily IPv4 | Out-File -Append C:\\Kit\\baseline.txt\nGet-Volume -DriveLetter C | Out-File -Append C:\\Kit\\baseline.txt\nGet-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location | Out-File -Append C:\\Kit\\baseline.txt\nGet-Printer | Select-Object Name, PrinterStatus | Out-File -Append C:\\Kit\\baseline.txt",
        "check": "baseline.txt lists Spooler as Running, both adapters Up, your normal DNS server, C: free space, and the 'Microsoft Print to PDF' printer."
      },
      {
        "title": "Create a test user and write the fault staging script",
        "body": "The profile ticket needs an ordinary user with files on their desktop, so create jdoe, sign in as jdoe once, save a file called 'Q3 report.txt' on the desktop, and sign out. Then save the staging script. Each fault is one switch case. If a friend is helping, let them run the faults in a random order and just tell you the user's complaint; otherwise run them in the order shown by the Get-Random line.",
        "cmd": "$pw = Read-Host -AsSecureString 'Password for jdoe'\nNew-LocalUser -Name jdoe -Password $pw -FullName 'Jane Doe'\nAdd-LocalGroupMember -Group Users -Member jdoe\n# Sign in as jdoe once, save 'Q3 report.txt' on the desktop, sign out, sign back in as your admin.\n@'\nparam([Parameter(Mandatory)][ValidateRange(1,6)][int]$Fault)\nswitch ($Fault) {\n 1 { Stop-Service Spooler -Force; Set-Service Spooler -StartupType Disabled }\n 2 { Set-DnsClientServerAddress -InterfaceAlias 'Ethernet' -ServerAddresses 192.0.2.53; Clear-DnsClientCache }\n 3 { $sid = (Get-LocalUser jdoe).SID.Value\n     Rename-Item \"HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\$sid\" -NewName \"$sid.bak\" }\n 4 { New-Item -ItemType Directory C:\\ProgramData\\SyncCache -Force | Out-Null\n     $fill = (Get-Volume -DriveLetter C).SizeRemaining - 700MB\n     fsutil file createnew C:\\ProgramData\\SyncCache\\cache.bin $fill }\n 5 { $nic = Get-NetAdapter -Name 'Ethernet 2'; Disable-PnpDevice -InstanceId $nic.PnpDeviceID -Confirm:$false }\n 6 { New-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' -Name CloudSyncHelper -Force -Value 'powershell.exe -NoProfile -WindowStyle Hidden -Command \"while($true){}\"' | Out-Null }\n}\n'@ | Set-Content C:\\Kit\\stage.ps1\n1..6 | Get-Random -Count 6   # your ticket order",
        "check": "C:\\Kit\\stage.ps1 exists, jdoe has a profile folder under C:\\Users\\jdoe with 'Q3 report.txt' on the desktop, and you have a random order of 1 to 6."
      },
      {
        "title": "Ticket: 'I can't print anything' (print spooler)",
        "body": "Run .\\stage.ps1 -Fault 1. Work it as a ticket: reproduce by printing a page from Notepad to 'Microsoft Print to PDF'. Question: one printer or all? One user or everyone on this PC? When every printer fails on one PC, the spooler service is the first theory. Check the service and its start type, look for Service Control Manager events, then fix it and clear any stuck jobs. Prevention: set service recovery actions so it restarts itself.",
        "cmd": "cd C:\\Kit; .\\stage.ps1 -Fault 1\nGet-Printer                     # fails: the spooler service is not reachable\nGet-Service Spooler | Select-Object Status, StartType\nGet-WinEvent -FilterHashtable @{LogName='System'; ProviderName='Service Control Manager'; StartTime=(Get-Date).AddMinutes(-15)} | Select-Object TimeCreated, Id, Message -First 5\n# Fix\nSet-Service Spooler -StartupType Automatic\nStart-Service Spooler\n# Clear stuck jobs if there are any (stop the spooler first)\nStop-Service Spooler; Remove-Item C:\\Windows\\System32\\spool\\PRINTERS\\* -Force -ErrorAction SilentlyContinue; Start-Service Spooler\nsc.exe failure Spooler reset= 86400 actions= restart/60000/restart/60000//\nGet-Printer | Select-Object Name, PrinterStatus",
        "check": "Get-Printer lists your printers again, a test page prints to PDF, and sc.exe qfailure Spooler shows the RESTART actions."
      },
      {
        "title": "Ticket: 'The internet is down, but Teams still says I'm online' (DNS)",
        "body": "Run the fault 2 stage. The classic sign of DNS trouble: pinging an IP address works but names do not resolve. Test layer by layer: link, IP and gateway, reach an address, then resolve a name. Compare the DNS server with your baseline. 192.0.2.53 is in a documentation-only range, so it can never answer.",
        "cmd": ".\\stage.ps1 -Fault 2\nipconfig /all | Select-String 'DNS Servers|Default Gateway|IPv4'\nTest-NetConnection 1.1.1.1                     # works: routing is fine\nResolve-DnsName www.microsoft.com              # fails or times out\nGet-DnsClientServerAddress -InterfaceAlias 'Ethernet' -AddressFamily IPv4\nResolve-DnsName www.microsoft.com -Server 1.1.1.1   # works: proves the configured server is the problem\n# Fix: go back to the DHCP-provided server\nSet-DnsClientServerAddress -InterfaceAlias 'Ethernet' -ResetServerAddresses\nipconfig /flushdns\nResolve-DnsName www.microsoft.com | Select-Object -First 2",
        "check": "Resolve-DnsName succeeds again and the DNS server matches the one in baseline.txt."
      },
      {
        "title": "Ticket: 'All my files and my desktop are gone' (user profile)",
        "body": "Run the fault 3 stage, then sign in as jdoe. The desktop is empty and 'Q3 report.txt' is missing, which scares users, but the data is safe. Windows could not find jdoe's ProfileList registry entry, so it built a brand-new profile in a folder like C:\\Users\\jdoe.WIN-CLIENT01. Confirm it from jdoe's session, sign jdoe out, then fix it as the administrator: remove the new, empty profile and rename the .bak key back. This is the same repair Microsoft documents for 'signed in with a temporary profile'.",
        "cmd": ".\\stage.ps1 -Fault 3\n# As jdoe: echo $env:USERPROFILE   -> C:\\Users\\jdoe.WIN-CLIENT01 (not C:\\Users\\jdoe). Sign jdoe out.\n# As admin:\nGet-ChildItem C:\\Users | Select-Object Name, LastWriteTime\nGet-WinEvent -FilterHashtable @{LogName='Application'; ProviderName='Microsoft-Windows-User Profiles Service'; StartTime=(Get-Date).AddMinutes(-30)} -ErrorAction SilentlyContinue | Select-Object TimeCreated, Id, Message -First 5\n$sid = (Get-LocalUser jdoe).SID.Value\nGet-ChildItem 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList' | Where-Object PSChildName -like \"$sid*\" | ForEach-Object { $_.PSChildName + ' -> ' + (Get-ItemProperty $_.PSPath).ProfileImagePath }\n# Remove the new empty profile (deletes its folder and its registry key), then restore the original key\nGet-CimInstance Win32_UserProfile | Where-Object { $_.SID -eq $sid -and $_.LocalPath -ne 'C:\\Users\\jdoe' } | Remove-CimInstance\nRename-Item \"HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\$sid.bak\" -NewName $sid",
        "check": "jdoe signs in again, $env:USERPROFILE is C:\\Users\\jdoe, and 'Q3 report.txt' is back on the desktop."
      },
      {
        "title": "Ticket: 'My PC says it's out of space and updates keep failing' (disk full)",
        "body": "Run the fault 4 stage. Measure first, then find what is big and new, and only delete what you can explain. Never delete files from C:\\Windows\\WinSxS or random ProgramData folders by hand in real life; here you know the file is junk because you can see who created it and when. Finish with the safe built-in cleanups.",
        "cmd": ".\\stage.ps1 -Fault 4\nGet-Volume -DriveLetter C | Select-Object DriveLetter, @{n='FreeGB';e={[math]::Round($_.SizeRemaining/1GB,2)}}, @{n='SizeGB';e={[math]::Round($_.Size/1GB,1)}}\n# Largest files on C:, newest first among the top 15\nGet-ChildItem C:\\ -Recurse -File -Force -ErrorAction SilentlyContinue | Sort-Object Length -Descending | Select-Object -First 15 FullName, @{n='GB';e={[math]::Round($_.Length/1GB,2)}}, LastWriteTime\nRemove-Item C:\\ProgramData\\SyncCache -Recurse -Force\n# Safe housekeeping\nDism.exe /Online /Cleanup-Image /StartComponentCleanup\ncleanmgr.exe /d C:\nGet-Volume -DriveLetter C | Select-Object @{n='FreeGB';e={[math]::Round($_.SizeRemaining/1GB,2)}}",
        "check": "Free space on C: is back to roughly your baseline figure, and you can name the file you removed and why it was safe."
      },
      {
        "title": "Ticket: 'I can't reach the file server' (network device driver)",
        "body": "Run the fault 5 stage. The user can browse the internet (NAT adapter) but not 192.168.56.10. Start at the physical and data-link layer: is the adapter present and enabled? A disabled device vanishes from ipconfig and Get-NetAdapter, and shows a down arrow in Device Manager. Check the driver details too; in real tickets the fix is often rolling back a bad driver update (Device Manager > adapter > Properties > Driver > Roll Back Driver).",
        "cmd": ".\\stage.ps1 -Fault 5\nTest-NetConnection 192.168.56.10          # fails\nipconfig | Select-String 'adapter|IPv4'   # Ethernet 2 is missing\nGet-NetAdapter -IncludeHidden | Select-Object Name, Status, InterfaceDescription\nGet-PnpDevice -Class Net | Select-Object Status, FriendlyName, InstanceId\npnputil /enum-devices /class Net /drivers\nGet-CimInstance Win32_PnPSignedDriver | Where-Object DeviceClass -eq 'NET' | Select-Object DeviceName, DriverVersion, DriverDate, IsSigned\n# Fix\n$dev = Get-PnpDevice -Class Net | Where-Object Status -ne 'OK' | Select-Object -First 1\nEnable-PnpDevice -InstanceId $dev.InstanceId -Confirm:$false\nTest-NetConnection 192.168.56.10 -Port 22",
        "check": "Get-PnpDevice shows every network device with Status OK, and Test-NetConnection to 192.168.56.10 on port 22 reports TcpTestSucceeded : True."
      },
      {
        "title": "Ticket: 'My PC is really slow ever since I log in' (startup item)",
        "body": "Run the fault 6 stage, sign out and sign back in. A process is pinning one CPU core. Find the process, then its full command line and parent, then how it starts. Task Manager's Startup apps tab and Sysinternals Autoruns show every auto-start location; Autoruns also flags unsigned entries. Remove the entry and kill the process.",
        "cmd": ".\\stage.ps1 -Fault 6   # then sign out and back in\nGet-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, Id, CPU\nGet-CimInstance Win32_Process -Filter \"Name='powershell.exe'\" | Select-Object ProcessId, ParentProcessId, CommandLine\nGet-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location, User\n# Or open Sysinternals Autoruns (autoruns64.exe) and check the Logon tab\nRemove-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' -Name CloudSyncHelper\nGet-CimInstance Win32_Process -Filter \"Name='powershell.exe'\" | Where-Object CommandLine -like '*while*' | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }",
        "check": "After another sign-in, Task Manager shows normal CPU and Win32_StartupCommand no longer lists CloudSyncHelper."
      },
      {
        "title": "Close the tickets and write a knowledge-base article",
        "body": "Fill in one ticket file per fault from the template, including the theories you ruled out and how long each took. Then write one short knowledge-base article for the fault you found hardest, written for a first-week technician: symptoms in the user's words, quick checks, the fix, and when to escalate. Compare the machine with your baseline to prove you left nothing broken.",
        "cmd": "Get-Service Spooler | Select-Object Status, StartType\nGet-DnsClientServerAddress -InterfaceAlias 'Ethernet' -AddressFamily IPv4\nGet-NetAdapter | Select-Object Name, Status\nGet-Volume -DriveLetter C | Select-Object SizeRemaining\nGet-CimInstance Win32_StartupCommand | Select-Object Name, Command\nGet-ChildItem C:\\Kit\\Tickets",
        "check": "Six completed ticket files plus one KB article, and every value above matches baseline.txt."
      },
      {
        "title": "Revert the VM",
        "body": "Put win-client01 back to the snapshot so later labs start clean. Keep C:\\Kit\\Tickets by copying it to your host first if you want it for your portfolio.",
        "cmd": "# Copy C:\\Kit\\Tickets off the VM first, then on the host:\nVBoxManage controlvm \"win-client01\" poweroff\nVBoxManage snapshot \"win-client01\" restore \"pre-helpdesk\"",
        "check": "The VM boots to the pre-lab state."
      }
    ],
    "verify": [
      "Each of the six faults was reproduced, diagnosed with evidence (a command output or event) and fixed, and the final state matches your baseline.",
      "jdoe's original desktop file is back and $env:USERPROFILE for jdoe is C:\\Users\\jdoe.",
      "The spooler has restart recovery actions configured.",
      "Six ticket records and one KB article exist, each following the six-step troubleshooting method."
    ],
    "deliverable": "A 'Help desk casebook' with six ticket records (symptom, questions, theories tested, root cause, fix, verification, prevention, time taken), your healthy-machine baseline, the staging script, and one knowledge-base article written for a new technician.",
    "resume": "Diagnosed and resolved staged Windows 11 incidents (print spooler, DNS, corrupted user profile, disk exhaustion, disabled network driver, malicious-looking startup item) using the CompTIA troubleshooting method, PowerShell, Event Viewer and Sysinternals, and documented each as a ticket and knowledge-base article.",
    "interview": [
      "Walk me through how you troubleshoot a ticket. — Identify the problem by questioning the user and reproducing it, form a theory, test it before changing anything, plan and apply the fix, verify full functionality and add prevention, then document the findings, actions and outcome.",
      "A user can ping 8.8.8.8 but can't open any websites. What do you check? — Name resolution: the configured DNS servers, whether they answer (Resolve-DnsName or nslookup against them and against a known-good server), and the local cache and hosts file.",
      "A user signs in and their desktop is empty. What happened and is the data lost? — Usually Windows loaded a temporary or new profile because the ProfileList entry or profile folder was damaged; the data is normally still in the original C:\\Users folder and the fix is to repair the ProfileList key, not to copy files around."
    ],
    "cleanup": [
      "Restore win-client01 to the 'pre-helpdesk' snapshot (or reverse each fault as in the ticket steps).",
      "Delete the snapshot once you no longer need it: VBoxManage snapshot \"win-client01\" delete \"pre-helpdesk\"."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Get-Printer (PrintManagement module)",
        "url": "https://learn.microsoft.com/en-us/powershell/module/printmanagement/get-printer"
      },
      {
        "label": "Microsoft Learn: Sysinternals Autoruns",
        "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns"
      },
      {
        "label": "Microsoft Learn: Resolve-DnsName",
        "url": "https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname"
      },
      {
        "label": "Microsoft Learn: Clean up the WinSxS folder",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/clean-up-the-winsxs-folder"
      }
    ]
  },
  {
    "id": "lab-windows-deployment",
    "title": "Deploy Windows 11 with an answer file, a golden image and user state migration",
    "track": "Systems administration",
    "level": "Intermediate",
    "minutes": 300,
    "cost": "Free (Windows 11 Enterprise evaluation, Windows ADK and WinPE add-on); needs about 120 GB of free disk on your host",
    "summary": "Install the Windows ADK, write an autounattend.xml and a provisioning script for a hands-off Windows 11 install, sysprep and capture a reference image with DISM from WinPE, apply it to a blank VM with diskpart and bcdboot, then move a user's documents and settings from an old PC to the new one with USMT.",
    "realWorld": "Desktop engineers and help desk leads rebuild and refresh PCs constantly. Knowing the difference between a clean install, an in-place upgrade and an image deployment, how an answer file drives Windows Setup, what sysprep /generalize does, and how to move a user's data without losing anything is what separates someone who reinstalls Windows by hand from someone who can deploy fifty machines on a Friday and have users working on Monday.",
    "youWillNeed": [
      "win-client01 (192.168.56.20) from lab-home-lab as your technician PC and as the 'old' PC for migration",
      "Windows 11 Enterprise evaluation ISO from the Microsoft Evaluation Center",
      "Windows ADK for Windows 11 and the matching WinPE add-on (free from Microsoft Learn), installed on win-client01",
      "VirtualBox 7.x with two new VMs (win-deploy01 and win-deploy02: 2 vCPU, 4 GB RAM, 64 GB disk, EFI, Secure Boot and TPM 2.0 enabled) and a 60 GB 'images' virtual disk",
      "About 120 GB of free host disk space"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "The diskpart script in this lab wipes disk 0 of whatever machine it runs on. Only run it inside a VM booted from WinPE, and read 'list disk' output before you run it. Keep the answer file's plain-text lab password out of any real environment; production answer files should never contain reusable passwords.",
    "steps": [
      {
        "title": "Choose the deployment method and write the plan",
        "body": "Write a one-page plan before you build anything. Compare the methods: clean install from media (simple, slow, manual), unattended install with an answer file (repeatable), image-based deployment (a captured 'golden' WIM applied to many PCs), in-place upgrade (keeps apps and data, good for version upgrades) and cloud provisioning with Windows Autopilot and Intune (no image at all, needs licences you will not have in a lab). Decide thin image (OS plus updates only, apps installed by script) versus thick image (apps baked in), and write down why. Record VM names, partition layout (GPT: EFI 100 MB, MSR 16 MB, Windows), local admin account name and where logs go.",
        "check": "Your plan names the method for each of the three builds in this lab (unattended install, captured image, migration) and gives one reason for thin versus thick."
      },
      {
        "title": "Install the Windows ADK and WinPE add-on",
        "body": "On win-client01 download the Windows ADK for Windows 11 and the WinPE add-on from the Microsoft Learn ADK page. In the ADK installer select only Deployment Tools and User State Migration Tool (USMT). Then install the WinPE add-on. Open 'Deployment and Imaging Tools Environment' as Administrator for the rest of the lab; it puts DISM, oscdimg, copype and MakeWinPEMedia on the path.",
        "cmd": "# In 'Deployment and Imaging Tools Environment' (run as Administrator):\ndism /?  | findstr /i \"Version\"\nwhere oscdimg copype MakeWinPEMedia\ndir \"C:\\Program Files (x86)\\Windows Kits\\10\\Assessment and Deployment Kit\\User State Migration Tool\\amd64\\scanstate.exe\"\nmkdir C:\\Deploy\\media",
        "check": "oscdimg, copype and MakeWinPEMedia are all found and scanstate.exe exists."
      },
      {
        "title": "Write the answer file",
        "body": "Windows Setup looks for a file called autounattend.xml in the root of every removable drive. This one partitions disk 0 for UEFI, installs to the Windows partition, skips the OOBE screens, creates a local admin called labadmin, signs in once automatically, and runs your provisioning script from whichever drive letter the configuration ISO got. Open it in Windows System Image Manager (installed with the ADK) against the install.wim from your ISO to validate it; SIM will flag typos in component names. If Setup asks you to pick an edition, pick Enterprise Evaluation and note it for your runbook.",
        "cmd": "@'\n<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<unattend xmlns=\"urn:schemas-microsoft-com:unattend\" xmlns:wcm=\"http://schemas.microsoft.com/WMIConfig/2002/State\">\n <settings pass=\"windowsPE\">\n  <component name=\"Microsoft-Windows-International-Core-WinPE\" processorArchitecture=\"amd64\" publicKeyToken=\"31bf3856ad364e35\" language=\"neutral\" versionScope=\"nonSxS\">\n   <SetupUILanguage><UILanguage>en-US</UILanguage></SetupUILanguage>\n   <InputLocale>en-US</InputLocale><SystemLocale>en-US</SystemLocale><UILanguage>en-US</UILanguage><UserLocale>en-US</UserLocale>\n  </component>\n  <component name=\"Microsoft-Windows-Setup\" processorArchitecture=\"amd64\" publicKeyToken=\"31bf3856ad364e35\" language=\"neutral\" versionScope=\"nonSxS\">\n   <DiskConfiguration><Disk wcm:action=\"add\"><DiskID>0</DiskID><WillWipeDisk>true</WillWipeDisk>\n    <CreatePartitions>\n     <CreatePartition wcm:action=\"add\"><Order>1</Order><Type>EFI</Type><Size>100</Size></CreatePartition>\n     <CreatePartition wcm:action=\"add\"><Order>2</Order><Type>MSR</Type><Size>16</Size></CreatePartition>\n     <CreatePartition wcm:action=\"add\"><Order>3</Order><Type>Primary</Type><Extend>true</Extend></CreatePartition>\n    </CreatePartitions>\n    <ModifyPartitions>\n     <ModifyPartition wcm:action=\"add\"><Order>1</Order><PartitionID>1</PartitionID><Format>FAT32</Format><Label>System</Label></ModifyPartition>\n     <ModifyPartition wcm:action=\"add\"><Order>2</Order><PartitionID>3</PartitionID><Format>NTFS</Format><Label>Windows</Label><Letter>C</Letter></ModifyPartition>\n    </ModifyPartitions></Disk></DiskConfiguration>\n   <ImageInstall><OSImage><InstallTo><DiskID>0</DiskID><PartitionID>3</PartitionID></InstallTo></OSImage></ImageInstall>\n   <UserData><AcceptEula>true</AcceptEula></UserData>\n  </component>\n </settings>\n <settings pass=\"oobeSystem\">\n  <component name=\"Microsoft-Windows-Shell-Setup\" processorArchitecture=\"amd64\" publicKeyToken=\"31bf3856ad364e35\" language=\"neutral\" versionScope=\"nonSxS\">\n   <OOBE><HideEULAPage>true</HideEULAPage><HideOnlineAccountScreens>true</HideOnlineAccountScreens><HideWirelessSetupInOOBE>true</HideWirelessSetupInOOBE><ProtectYourPC>3</ProtectYourPC></OOBE>\n   <UserAccounts><LocalAccounts><LocalAccount wcm:action=\"add\"><Name>labadmin</Name><Group>Administrators</Group>\n    <Password><Value>Lab-Only-Pa55!</Value><PlainText>true</PlainText></Password></LocalAccount></LocalAccounts></UserAccounts>\n   <AutoLogon><Enabled>true</Enabled><Username>labadmin</Username><LogonCount>1</LogonCount>\n    <Password><Value>Lab-Only-Pa55!</Value><PlainText>true</PlainText></Password></AutoLogon>\n   <FirstLogonCommands><SynchronousCommand wcm:action=\"add\"><Order>1</Order>\n    <CommandLine>cmd /c for %d in (D E F G H) do if exist %d:\\provision.ps1 powershell -NoProfile -ExecutionPolicy Bypass -File %d:\\provision.ps1</CommandLine>\n    <Description>Run provisioning script</Description></SynchronousCommand></FirstLogonCommands>\n   <TimeZone>UTC</TimeZone>\n  </component>\n </settings>\n</unattend>\n'@ | Set-Content -Encoding UTF8 C:\\Deploy\\media\\autounattend.xml",
        "check": "Windows SIM validates the file with no errors (warnings about unset optional values are fine)."
      },
      {
        "title": "Write the provisioning script and build the configuration ISO",
        "body": "Keep the image thin and do configuration in a script, so a change means editing a text file, not rebuilding an image. The script logs everything with a transcript, renames the PC, sets the time zone, creates a support folder, removes a couple of consumer apps and records what it did. Then pack the answer file and script into a small ISO with oscdimg.",
        "cmd": "@'\nStart-Transcript -Path C:\\ProgramData\\Provision\\provision.log -Append\nSet-TimeZone -Id 'UTC'\nNew-Item -ItemType Directory -Path C:\\Support -Force | Out-Null\nGet-AppxPackage -AllUsers *Xbox* | Remove-AppxPackage -AllUsers -ErrorAction SilentlyContinue\nGet-AppxPackage -AllUsers *BingNews* | Remove-AppxPackage -AllUsers -ErrorAction SilentlyContinue\nNew-Item 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent' -Force | Out-Null\nSet-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent' -Name DisableWindowsConsumerFeatures -Value 1 -Type DWord -Force -ErrorAction SilentlyContinue\nGet-ComputerInfo | Select-Object OsName, OsVersion, CsName | Out-File C:\\Support\\build-info.txt\n'BUILD COMPLETE ' + (Get-Date -Format s) | Out-File -Append C:\\Support\\build-info.txt\nStop-Transcript\nRename-Computer -NewName ('WIN-' + (-join ((48..57) + (65..90) | Get-Random -Count 6 | ForEach-Object { [char]$_ }))) -Restart\n'@ | Set-Content C:\\Deploy\\media\\provision.ps1\noscdimg -u2 -m -lCONFIG C:\\Deploy\\media C:\\Deploy\\config.iso",
        "check": "C:\\Deploy\\config.iso exists and is a few hundred KB. Copy it to your host (a shared folder or scp) for the next step."
      },
      {
        "title": "Run the unattended install",
        "body": "Create win-deploy01 (Windows 11 64-bit, EFI, Secure Boot and TPM 2.0 on, 64 GB disk, NAT adapter). Attach the Windows ISO as the first optical drive and config.iso as a second one, then boot. You should not touch the keyboard until the desktop appears and the VM reboots with its new name. If Setup stops and asks a question, that setting is missing or wrong in your answer file: fix it, rebuild the ISO and try again. That iteration is the real skill.",
        "cmd": "# On the host\nVBoxManage storagectl \"win-deploy01\" --name \"SATA\" --portcount 4\nVBoxManage storageattach \"win-deploy01\" --storagectl \"SATA\" --port 2 --device 0 --type dvddrive --medium \"Win11_Enterprise_Eval.iso\"\nVBoxManage storageattach \"win-deploy01\" --storagectl \"SATA\" --port 3 --device 0 --type dvddrive --medium \"config.iso\"\nVBoxManage startvm \"win-deploy01\"\n# After it finishes, inside win-deploy01:\nGet-Content C:\\Support\\build-info.txt\nGet-Content C:\\ProgramData\\Provision\\provision.log -Tail 15\nfindstr /i \"error\" C:\\Windows\\Panther\\UnattendGC\\setupact.log",
        "check": "The VM reached the desktop without any input, build-info.txt says BUILD COMPLETE, the computer name starts with WIN-, and no provisioning errors are logged."
      },
      {
        "title": "Generalize the reference machine with sysprep",
        "body": "win-deploy01 is now your reference PC. Install anything you want in every image (in a thin image: nothing but Windows updates). Sysprep /generalize removes machine-specific data (SID-related state, device drivers' bindings, event logs) so the captured image can be deployed to many PCs, and /oobe makes the next boot run the out-of-box experience. Sysprep commonly fails on Windows 11 because a Store app was updated for one user but not provisioned for all; the log tells you which package to remove.",
        "cmd": "# Inside win-deploy01 as Administrator (take a VirtualBox snapshot 'pre-sysprep' first)\nC:\\Windows\\System32\\Sysprep\\sysprep.exe /generalize /oobe /shutdown\n# If it fails:\nfindstr /i \"error\" C:\\Windows\\System32\\Sysprep\\Panther\\setupact.log\n# Typical fix: Get-AppxPackage -Name <package from the log> | Remove-AppxPackage   then run sysprep again",
        "check": "Sysprep completes and the VM powers itself off. Do not boot it into Windows again before capture, or you have to sysprep again."
      },
      {
        "title": "Build WinPE and capture the image with DISM",
        "body": "Create WinPE boot media on win-client01, then boot the powered-off reference VM from it with a second empty 60 GB 'images' disk attached. Drive letters in WinPE are not the same as in Windows, so always check with diskpart first. Capture the Windows partition to a WIM on the images disk.",
        "cmd": "# On win-client01, Deployment and Imaging Tools Environment:\ncopype amd64 C:\\WinPE_amd64\nMakeWinPEMedia /ISO C:\\WinPE_amd64 C:\\Deploy\\winpe.iso\n# On the host: create the images disk, attach it and winpe.iso to win-deploy01, boot WinPE\nVBoxManage createmedium disk --filename images.vdi --size 61440\n# In WinPE (X:\\>):\ndiskpart\n  list vol\n  select disk 1\n  clean\n  create partition primary\n  format quick fs=ntfs label=Images\n  assign letter=I\n  exit\ndism /Capture-Image /ImageFile:I:\\win11-ref.wim /CaptureDir:C:\\ /Name:\"Win11 Ent Ref\" /Description:\"Thin ref image\" /Compress:max /CheckIntegrity\ndism /Get-ImageInfo /ImageFile:I:\\win11-ref.wim\nwpeutil shutdown",
        "check": "Get-ImageInfo shows index 1 named 'Win11 Ent Ref' with a size of roughly 10 to 20 GB (compressed WIM on disk is smaller)."
      },
      {
        "title": "Apply the image to a blank PC",
        "body": "Create win-deploy02 with an empty disk, attach winpe.iso and the images disk, and boot WinPE. The diskpart script builds the same GPT layout the answer file made, DISM applies the WIM, and bcdboot writes the UEFI boot files to the EFI partition. The first boot runs OOBE and 'specialize', giving this PC its own identity.",
        "cmd": "# In WinPE on win-deploy02. CHECK 'list disk' FIRST: disk 0 must be the empty 64 GB disk.\nnotepad X:\\layout.txt     # type these lines into it and save:\n  select disk 0\n  clean\n  convert gpt\n  create partition efi size=100\n  format quick fs=fat32 label=System\n  assign letter=S\n  create partition msr size=16\n  create partition primary\n  format quick fs=ntfs label=Windows\n  assign letter=W\n  exit\ndiskpart /s X:\\layout.txt\necho list vol | diskpart     # find the Images volume letter (e.g. D:)\ndism /Apply-Image /ImageFile:D:\\win11-ref.wim /Index:1 /ApplyDir:W:\\ /CheckIntegrity\nbcdboot W:\\Windows /s S: /f UEFI\nwpeutil shutdown\n# Detach winpe.iso and the images disk, then boot win-deploy02 normally",
        "check": "win-deploy02 boots to OOBE (or straight to the desktop if you added an answer file with /unattend), and 'bcdedit /enum' inside Windows shows the Windows Boot Manager on the new disk."
      },
      {
        "title": "Migrate a user with USMT",
        "body": "Now the 'refresh' scenario: jdoe on win-client01 (the old PC) gets the new PC. ScanState collects documents, desktop files and supported app settings into an encrypted-if-you-choose store; LoadState applies them on the new PC and can create the local account. /ue:*\\* /ui: limits the capture to one user. Copy the USMT amd64 folder and the store between machines with a USB-style virtual disk, a shared folder or an SMB share on ubuntu-srv01.",
        "cmd": "# On win-client01 (old PC), as Administrator. Put a few files in jdoe's Documents and Desktop first.\n$usmt = 'C:\\Program Files (x86)\\Windows Kits\\10\\Assessment and Deployment Kit\\User State Migration Tool\\amd64'\n& \"$usmt\\scanstate.exe\" C:\\USMTStore /i:\"$usmt\\MigDocs.xml\" /i:\"$usmt\\MigApp.xml\" /ue:*\\* /ui:$env:COMPUTERNAME\\jdoe /o /c /v:5 /l:C:\\USMTStore\\scan.log\n# Copy the amd64 folder to C:\\USMT and C:\\USMTStore to the new PC, then on win-deploy02 as Administrator:\nC:\\USMT\\loadstate.exe C:\\USMTStore /i:C:\\USMT\\MigDocs.xml /i:C:\\USMT\\MigApp.xml /lac:Temp-Lab-Pa55! /lae /v:5 /l:C:\\USMTStore\\load.log\nfindstr /i \"error warning\" C:\\USMTStore\\load.log",
        "check": "jdoe can sign in on win-deploy02 with the temporary password (change it at first logon in a real rollout) and sees the same Documents and Desktop files."
      },
      {
        "title": "Write the deployment runbook",
        "body": "Record how long each method took (unattended install, image apply, migration), what failed and how you fixed it, and where each log lives. Keep a table of the key logs: C:\\Windows\\Panther\\setupact.log and setuperr.log (Setup), C:\\Windows\\Panther\\UnattendGC (answer file processing), C:\\Windows\\System32\\Sysprep\\Panther (sysprep), the DISM log C:\\Windows\\Logs\\DISM\\dism.log, and your USMT scan.log and load.log.",
        "check": "The runbook lets another technician rebuild win-deploy02 from nothing using only your files and notes."
      }
    ],
    "verify": [
      "win-deploy01 installed with zero keyboard input and its provisioning log ends with BUILD COMPLETE.",
      "dism /Get-ImageInfo shows your captured reference image, and win-deploy02 boots from it.",
      "jdoe's Documents and Desktop files appear on win-deploy02 after LoadState.",
      "Your runbook lists the timings, errors met and the log locations."
    ],
    "deliverable": "A 'Windows deployment kit' folder: the plan, autounattend.xml, provision.ps1, the diskpart layout script, capture and apply commands, USMT command lines and logs, screenshots of each milestone, and the runbook with timings.",
    "resume": "Built an automated Windows 11 deployment with an unattended answer file and PowerShell provisioning, captured and deployed a sysprepped golden image with DISM, WinPE and bcdboot, and migrated user data between PCs with USMT, documenting the process as a repeatable runbook.",
    "interview": [
      "Why do you run sysprep /generalize before capturing an image? — It strips machine-specific state such as the computer name, security identifiers used by some components, activation state and hardware bindings, so every PC deployed from the image gets its own identity during the specialize pass.",
      "Clean install, in-place upgrade or image: when would you use each? — In-place upgrade keeps apps and data for version changes; image or unattended install for a fast, consistent build of new or wiped PCs; clean install from media for a one-off or when the existing install is untrustworthy.",
      "How do you move a user to a new PC without losing data? — Capture their state with a tool such as USMT ScanState (or a cloud profile such as OneDrive Known Folder Move), verify the store, apply it with LoadState on the new PC, and have the user confirm key files before wiping the old one."
    ],
    "cleanup": [
      "Delete win-deploy01 and win-deploy02 and the images.vdi disk when you are finished (VBoxManage unregistervm \"win-deploy01\" --delete, and the same for win-deploy02).",
      "Delete C:\\USMTStore on both PCs; it contains a copy of the user's data.",
      "Keep C:\\Deploy (answer file, script, ISOs) for your portfolio, minus any real passwords."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Download and install the Windows ADK",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install"
      },
      {
        "label": "Microsoft Learn: Answer files (unattend.xml)",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/update-windows-settings-and-scripts-create-your-own-answer-file-sxs"
      },
      {
        "label": "Microsoft Learn: Capture and apply Windows images with DISM",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/capture-and-apply-windows-system-and-recovery-partitions"
      },
      {
        "label": "Microsoft Learn: User State Migration Tool (USMT) overview",
        "url": "https://learn.microsoft.com/en-us/windows/deployment/usmt/usmt-overview"
      }
    ]
  },
  {
    "id": "lab-linux-storage-lvm",
    "title": "Linux storage: partitions, LVM, filesystems, swap and fstab on VM disks",
    "track": "Systems administration",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free (two small extra virtual disks on your Ubuntu VM)",
    "summary": "Add two virtual disks to your Ubuntu server, partition them with GPT, build XFS and ext4 filesystems, mount them persistently by UUID, create an LVM volume group, grow a logical volume while it is in use, shrink one safely, add swap, take an LVM snapshot for a consistent backup, and catch a broken fstab entry before it stops the server booting.",
    "realWorld": "'The disk is full' and 'the server won't boot after I added a disk' are two of the most common Linux tickets. Sysadmins add storage, extend volumes live and edit /etc/fstab weekly, and RHCSA and Linux+ both test these tasks hands-on. One wrong fstab line can drop a production server into emergency mode, so the habit of verifying before rebooting is worth as much as the commands.",
    "youWillNeed": [
      "ubuntu-srv01 (192.168.56.10) from lab-home-lab, powered off for the first step",
      "Two new 5 GB virtual disks (created in step 1)",
      "The xfsprogs and lvm2 packages (lvm2 is already installed on Ubuntu Server)"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "Every destructive command here targets /dev/sdb or /dev/sdc, the new empty disks. Run lsblk before each one and confirm the device name and size, because disk names can change between boots and a mistake on /dev/sda destroys the operating system. Take a snapshot first.",
    "steps": [
      {
        "title": "Snapshot the VM and attach two new disks",
        "body": "Power off ubuntu-srv01, take a snapshot, create two 5 GB dynamically allocated disks and attach them to the SATA controller. Check the controller's real name first; VirtualBox usually calls it 'SATA'.",
        "cmd": "VBoxManage snapshot \"ubuntu-srv01\" take \"pre-storage\"\nVBoxManage showvminfo \"ubuntu-srv01\" | grep -i \"storage controller name\"\nVBoxManage createmedium disk --filename \"$HOME/VirtualBox VMs/ubuntu-srv01/data1.vdi\" --size 5120\nVBoxManage createmedium disk --filename \"$HOME/VirtualBox VMs/ubuntu-srv01/data2.vdi\" --size 5120\nVBoxManage storageattach \"ubuntu-srv01\" --storagectl \"SATA\" --port 1 --device 0 --type hdd --medium \"$HOME/VirtualBox VMs/ubuntu-srv01/data1.vdi\"\nVBoxManage storageattach \"ubuntu-srv01\" --storagectl \"SATA\" --port 2 --device 0 --type hdd --medium \"$HOME/VirtualBox VMs/ubuntu-srv01/data2.vdi\"\nVBoxManage startvm \"ubuntu-srv01\" --type headless",
        "check": "Both storageattach commands return without an error and the VM boots."
      },
      {
        "title": "Identify the disks and the existing layout",
        "body": "Never trust a device name you have not just checked. lsblk shows the tree of disks, partitions and logical volumes; the Ubuntu installer already put the root filesystem on LVM (ubuntu-vg/ubuntu-lv). /dev/disk/by-id gives stable names tied to the disk's serial number.",
        "cmd": "lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS\nsudo fdisk -l /dev/sdb /dev/sdc\nls -l /dev/disk/by-id/ | grep -v part\nsudo pvs; sudo vgs; sudo lvs\ndf -hT -x tmpfs -x devtmpfs\ncat /etc/fstab",
        "check": "sdb and sdc are 5 GiB with no partitions, and you can name the volume group and logical volume holding /."
      },
      {
        "title": "Partition /dev/sdb with GPT",
        "body": "GPT is the modern partition table (MBR is limited to 2 TiB and four primary partitions). Make a 2 GiB partition for a plain filesystem and give the rest to LVM. parted is scriptable; fdisk and gdisk do the same interactively, and RHCSA candidates should be comfortable with fdisk too.",
        "cmd": "sudo apt install -y xfsprogs\nsudo parted -s /dev/sdb mklabel gpt\nsudo parted -s /dev/sdb mkpart data xfs 1MiB 2GiB\nsudo parted -s /dev/sdb mkpart lvm 2GiB 100%\nsudo parted -s /dev/sdb set 2 lvm on\nsudo partprobe /dev/sdb\nsudo parted /dev/sdb print\nlsblk /dev/sdb",
        "check": "parted print shows a GPT table with partition 1 (about 2 GB, name data) and partition 2 (about 3 GB, flag lvm)."
      },
      {
        "title": "Make an XFS filesystem and mount it persistently by UUID",
        "body": "Create XFS on sdb1 with a label, mount it on /srv/data, and add an fstab line using the UUID from blkid; device names like /dev/sdb1 can change, UUIDs do not. Then test the fstab entry without rebooting: unmount, run mount -a, and let findmnt --verify check the whole file. After editing fstab on a systemd system, run daemon-reload so the generated mount units match.",
        "cmd": "sudo mkfs.xfs -L data /dev/sdb1\nsudo mkdir -p /srv/data\nsudo blkid /dev/sdb1\nUUID=$(sudo blkid -s UUID -o value /dev/sdb1)\necho \"UUID=$UUID  /srv/data  xfs  defaults,nofail  0 0\" | sudo tee -a /etc/fstab\nsudo systemctl daemon-reload\nsudo mount -a\nsudo findmnt --verify\nfindmnt /srv/data\ndf -hT /srv/data",
        "check": "findmnt --verify reports 0 parse errors and 0 errors, and df shows /srv/data as xfs on /dev/sdb1."
      },
      {
        "title": "Build an LVM volume group across two devices",
        "body": "LVM separates filesystems from physical disks: physical volumes (PVs) are pooled into a volume group (VG), and logical volumes (LVs) are carved from the pool and can grow across disks. Use the LVM partition on sdb and the whole of sdc.",
        "cmd": "sudo pvcreate /dev/sdb2 /dev/sdc\nsudo vgcreate vg_lab /dev/sdb2 /dev/sdc\nsudo vgs vg_lab\nsudo lvcreate -n lv_app -L 2G vg_lab\nsudo mkfs.ext4 -L app /dev/vg_lab/lv_app\nsudo mkdir -p /srv/app\necho '/dev/vg_lab/lv_app  /srv/app  ext4  defaults  0 2' | sudo tee -a /etc/fstab\nsudo systemctl daemon-reload && sudo mount -a && sudo findmnt --verify\nsudo lvs -o lv_name,vg_name,lv_size,devices",
        "check": "vgs shows vg_lab of about 8 GiB with 2 PVs, and /srv/app is mounted as a 2 GiB ext4 filesystem."
      },
      {
        "title": "Grow a volume while it is in use",
        "body": "Put some data on /srv/app and keep a process writing to it, then extend the LV and filesystem in one step with -r (resizefs). ext4 and XFS both grow online, so users never notice. This is the fix for most 'disk full' tickets on LVM systems.",
        "cmd": "sudo dd if=/dev/urandom of=/srv/app/blob bs=1M count=500 status=progress\n( while true; do date | sudo tee -a /srv/app/writer.log >/dev/null; sleep 1; done ) &\ndf -h /srv/app\nsudo lvextend -r -L +1500M vg_lab/lv_app\ndf -h /srv/app\ntail -3 /srv/app/writer.log\nkill %1",
        "check": "df shows about 3.4 GiB total for /srv/app, and writer.log kept getting a line every second throughout."
      },
      {
        "title": "Shrink an ext4 volume the safe way",
        "body": "Shrinking is riskier than growing. XFS cannot shrink at all (you back up, recreate and restore). ext4 can, but only unmounted, and the filesystem must be shrunk before the LV. lvreduce -r does both in the right order and runs a filesystem check first. Never lvreduce without -r.",
        "cmd": "sudo umount /srv/app\nsudo lvreduce -r -L 2500M vg_lab/lv_app\nsudo mount /srv/app\ndf -h /srv/app\nsha256sum /srv/app/blob",
        "check": "The volume is now about 2.4 GiB, it mounts cleanly and the blob file is still readable."
      },
      {
        "title": "Add swap on a logical volume",
        "body": "Swap on LVM can be resized later. Create it, enable it, make it persistent and confirm. The kernel's swappiness value controls how eagerly it swaps; leave it at the default unless you have a measured reason.",
        "cmd": "sudo lvcreate -n lv_swap -L 512M vg_lab\nsudo mkswap -L labswap /dev/vg_lab/lv_swap\nsudo swapon /dev/vg_lab/lv_swap\necho '/dev/vg_lab/lv_swap  none  swap  sw  0 0' | sudo tee -a /etc/fstab\nsudo systemctl daemon-reload && sudo findmnt --verify\nswapon --show\nfree -h\ncat /proc/sys/vm/swappiness",
        "check": "swapon --show lists /dev/dm-N (vg_lab-lv_swap) at 512M and free -h shows the extra swap."
      },
      {
        "title": "Take an LVM snapshot for a consistent backup, then roll back",
        "body": "An LVM snapshot freezes a point-in-time view of a volume using copy-on-write space from the VG. Back up from the read-only snapshot mount while the live volume keeps changing. Then use a second snapshot to undo a bad change: lvconvert --merge rolls the origin back to the snapshot.",
        "cmd": "sudo lvcreate -s -n app_snap -L 500M vg_lab/lv_app\nsudo mkdir -p /mnt/snap && sudo mount -o ro /dev/vg_lab/app_snap /mnt/snap\nsudo tar -C /mnt/snap -czf /srv/data/app-backup.tgz .\nsudo umount /mnt/snap && sudo lvremove -y vg_lab/app_snap\n# Rollback demo\nsudo lvcreate -s -n before_change -L 500M vg_lab/lv_app\nsudo rm /srv/app/blob          # the 'bad change'\nsudo umount /srv/app\nsudo lvconvert --merge vg_lab/before_change\nsudo mount /srv/app && ls -lh /srv/app/blob\nsudo lvs",
        "check": "app-backup.tgz exists on /srv/data, and after the merge /srv/app/blob is back and the snapshot LV is gone."
      },
      {
        "title": "Catch a broken fstab entry before it bites",
        "body": "Add a line with a deliberately wrong UUID and without nofail, then test. On a reboot this line would make systemd wait for the device and then drop into emergency mode, and on Ubuntu the root account is locked, so emergency mode will not even give you a shell. That is why you always run findmnt --verify and mount -a before rebooting, and why optional disks get nofail. Remove the bad line and reboot to prove the real config.",
        "cmd": "sudo cp /etc/fstab /etc/fstab.good\necho 'UUID=00000000-dead-beef-0000-000000000000  /srv/broken  ext4  defaults  0 2' | sudo tee -a /etc/fstab\nsudo mkdir -p /srv/broken\nsudo systemctl daemon-reload\nsudo findmnt --verify\nsudo mount -a\nsudo cp /etc/fstab.good /etc/fstab && sudo systemctl daemon-reload\nsudo findmnt --verify && sudo reboot\n# After the reboot:\nlsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS /dev/sdb /dev/sdc\nswapon --show",
        "check": "findmnt --verify and mount -a both complained about the fake UUID, and after the reboot /srv/data, /srv/app and the swap LV all came back on their own."
      },
      {
        "title": "Document the storage layout",
        "body": "Write a one-page storage record for the server: each disk, partition, PV, VG and LV with size, filesystem, mount point, fstab options and purpose, plus the procedure you would follow to add a new 10 GB disk to vg_lab and extend /srv/app into it (pvcreate, vgextend, lvextend -r).",
        "cmd": "lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,UUID,MOUNTPOINTS > ~/storage-layout.txt\nsudo pvs >> ~/storage-layout.txt; sudo vgs >> ~/storage-layout.txt; sudo lvs >> ~/storage-layout.txt\ngrep -v '^#' /etc/fstab >> ~/storage-layout.txt",
        "check": "storage-layout.txt matches what is really mounted and your 'add a disk' procedure has the three commands in the right order."
      }
    ],
    "verify": [
      "/srv/data (XFS, by UUID) and /srv/app (ext4 on vg_lab/lv_app) mount automatically after a reboot.",
      "lv_app was grown online with lvextend -r while writer.log kept updating, then shrunk with lvreduce -r without data loss.",
      "swapon --show lists the lv_swap volume.",
      "You have evidence that findmnt --verify caught the bad UUID before a reboot."
    ],
    "deliverable": "A storage record (storage-layout.txt plus notes) with the disk/PV/VG/LV diagram, the final fstab with each option explained, before/after df output for the grow and shrink, the snapshot backup and rollback evidence, and a short 'add a disk and extend a volume' runbook.",
    "resume": "Provisioned and managed Linux storage with GPT partitions, XFS and ext4, LVM volume groups, online volume growth, safe ext4 shrinking, LVM swap and snapshot-based backup and rollback, and used fstab verification to prevent boot failures.",
    "interview": [
      "A filesystem on LVM is 95% full. How do you fix it without downtime? — Check free extents with vgs; if there are none, add a disk and pvcreate plus vgextend it; then lvextend -r to grow the LV and the filesystem online, and find out what filled it so it does not happen again.",
      "Why mount by UUID instead of /dev/sdb1? — Kernel device names depend on detection order and can change when disks are added or removed; a UUID belongs to the filesystem itself, so the right filesystem always lands on the right mount point.",
      "Can you shrink XFS? — No. XFS only grows. To make it smaller you back up the data, recreate a smaller filesystem and restore; ext4 can be shrunk, but only unmounted."
    ],
    "cleanup": [
      "Remove the lab lines from /etc/fstab (or restore /etc/fstab.good from before step 4 if you kept a copy).",
      "sudo umount /srv/data /srv/app; sudo swapoff /dev/vg_lab/lv_swap; sudo vgremove -y vg_lab; sudo pvremove /dev/sdb2 /dev/sdc.",
      "Or simply restore the 'pre-storage' snapshot, then detach and delete data1.vdi and data2.vdi (VBoxManage storageattach ... --medium none; VBoxManage closemedium disk <file> --delete)."
    ],
    "links": [
      {
        "label": "Red Hat: Configuring and managing logical volumes (RHEL 9)",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/index"
      },
      {
        "label": "Red Hat: Managing file systems (RHEL 9)",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_file_systems/index"
      },
      {
        "label": "Ubuntu Server docs: About LVM",
        "url": "https://documentation.ubuntu.com/server/explanation/storage/about-lvm/"
      },
      {
        "label": "man7.org: fstab(5)",
        "url": "https://man7.org/linux/man-pages/man5/fstab.5.html"
      }
    ]
  },
  {
    "id": "lab-systemd-services",
    "title": "Systemd services, timers and journald: build, harden and fix a failing service",
    "track": "Systems administration",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free (systemd and Python 3 already on Ubuntu Server)",
    "summary": "Write your own systemd service that runs as an unprivileged user, give it a restart policy and a drop-in override with sandboxing, replace a cron job with a timer, make the journal persistent and size-limited, then diagnose four staged failures (bad ExecStart, missing directory, port conflict and start-limit-hit) from systemctl and journalctl output alone.",
    "realWorld": "Every modern Linux distribution runs its services under systemd, so 'the service won't start' is a daily ticket. Sysadmins and SREs who can read a unit file, spot a 203/EXEC or 200/CHDIR exit status, follow a journalctl -xeu trail and write a proper unit for an in-house app are far more effective than those who just reboot. RHCSA and Linux+ test these skills directly.",
    "youWillNeed": [
      "ubuntu-srv01 (192.168.56.10) from lab-home-lab (the commands also work on AlmaLinux or Rocky 9)",
      "curl (installed by default)",
      "sudo access"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "Everything runs on your own VM. The demo web service listens on 127.0.0.1 only; do not bind it to 0.0.0.0, because Python's http.server is not meant to face a network. Take a snapshot first.",
    "steps": [
      {
        "title": "Get your bearings in systemd",
        "body": "Snapshot the VM, then look around. Units are services, sockets, timers, mounts and targets; targets group units the way runlevels used to. systemd-analyze shows what slowed the last boot.",
        "cmd": "systemctl get-default\nsystemctl list-units --type=service --state=running | head -20\nsystemctl list-unit-files --type=service --state=enabled | head -20\nsystemctl --failed\nsystemd-analyze\nsystemd-analyze blame | head -10\nsystemd-analyze critical-chain",
        "check": "You can name the default target, count the running services and point to the slowest unit at boot."
      },
      {
        "title": "Create a service account and the app content",
        "body": "Services should run as their own unprivileged system account, not as root and not as your login user. A system account has no home directory and no login shell.",
        "cmd": "sudo useradd --system --no-create-home --shell /usr/sbin/nologin labapp\nsudo mkdir -p /srv/labapp\necho '<h1>labapp is up</h1>' | sudo tee /srv/labapp/index.html\nsudo chown -R root:labapp /srv/labapp && sudo chmod 750 /srv/labapp\nid labapp",
        "check": "id labapp shows a UID below 1000 and /srv/labapp is group-readable by labapp."
      },
      {
        "title": "Write the unit file and start it",
        "body": "Units you write live in /etc/systemd/system, which overrides the packaged ones in /usr/lib/systemd/system. After=network.target orders start-up; WantedBy=multi-user.target is what 'enable' hooks into. Restart=on-failure brings it back if it crashes.",
        "cmd": "sudo tee /etc/systemd/system/labapp.service > /dev/null <<'EOF'\n[Unit]\nDescription=Lab demo web app\nAfter=network.target\n\n[Service]\nType=simple\nUser=labapp\nGroup=labapp\nWorkingDirectory=/srv/labapp\nExecStart=/usr/bin/python3 -m http.server 8081 --bind 127.0.0.1\nRestart=on-failure\nRestartSec=5\n\n[Install]\nWantedBy=multi-user.target\nEOF\nsudo systemd-analyze verify /etc/systemd/system/labapp.service\nsudo systemctl daemon-reload\nsudo systemctl enable --now labapp\nsystemctl status labapp --no-pager\ncurl -s http://127.0.0.1:8081/",
        "check": "status shows active (running) with User labapp in the process list (ps -o user,pid,cmd -C python3), and curl returns 'labapp is up'."
      },
      {
        "title": "Test the restart policy",
        "body": "Kill the main process the way a crash would. systemd notices, waits RestartSec and starts it again, counting restarts in NRestarts. A clean 'systemctl stop' is not a failure, so it does not trigger a restart.",
        "cmd": "systemctl show labapp -p MainPID,NRestarts,Restart\nsudo kill -9 $(systemctl show labapp -p MainPID --value)\nsleep 7\nsystemctl show labapp -p MainPID,NRestarts\njournalctl -u labapp --since '-2min' --no-pager",
        "check": "The MainPID changed, NRestarts went up by one, and the journal shows 'Main process exited, code=killed, status=9/KILL' followed by 'Scheduled restart job'."
      },
      {
        "title": "Harden it with a drop-in override",
        "body": "Never edit a packaged unit; add a drop-in instead (systemctl edit creates one interactively). These sandboxing options make the filesystem read-only for the service, hide home directories, give it a private /tmp and stop privilege escalation. systemd-analyze security scores the exposure before and after.",
        "cmd": "systemd-analyze security labapp | tail -1\nsudo mkdir -p /etc/systemd/system/labapp.service.d\nsudo tee /etc/systemd/system/labapp.service.d/hardening.conf > /dev/null <<'EOF'\n[Service]\nNoNewPrivileges=yes\nProtectSystem=strict\nProtectHome=yes\nPrivateTmp=yes\nPrivateDevices=yes\nProtectKernelTunables=yes\nProtectKernelModules=yes\nProtectControlGroups=yes\nRestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX\nCapabilityBoundingSet=\nEOF\nsudo systemctl daemon-reload && sudo systemctl restart labapp\nsystemctl cat labapp\nsystemd-analyze security labapp | tail -1\ncurl -s http://127.0.0.1:8081/",
        "check": "The overall exposure score drops (for example from 9.x UNSAFE to around 5 or lower), systemctl cat shows both files, and curl still works."
      },
      {
        "title": "Replace a cron job with a timer",
        "body": "A timer starts a matching service on a schedule. Unlike cron, its runs are logged in the journal with exit status, it can catch up on missed runs with Persistent=true, and it respects dependencies. Here a oneshot service writes a disk-usage report every five minutes.",
        "cmd": "sudo tee /etc/systemd/system/labreport.service > /dev/null <<'EOF'\n[Unit]\nDescription=Write a disk usage report\n\n[Service]\nType=oneshot\nExecStart=/bin/sh -c 'df -h / > /var/tmp/labreport.txt; date >> /var/tmp/labreport.txt'\nEOF\nsudo tee /etc/systemd/system/labreport.timer > /dev/null <<'EOF'\n[Unit]\nDescription=Run labreport every 5 minutes\n\n[Timer]\nOnCalendar=*:0/5\nPersistent=true\nRandomizedDelaySec=30\n\n[Install]\nWantedBy=timers.target\nEOF\nsystemd-analyze calendar '*:0/5'\nsudo systemctl daemon-reload && sudo systemctl enable --now labreport.timer\nsystemctl list-timers labreport.timer\nsudo systemctl start labreport.service && cat /var/tmp/labreport.txt",
        "check": "list-timers shows the NEXT run within five minutes and /var/tmp/labreport.txt has today's date."
      },
      {
        "title": "Make the journal persistent and bounded",
        "body": "If /var/log/journal exists the journal survives reboots (Ubuntu creates it; on some RHEL-family installs you create it). Cap its size with a drop-in so logs can never fill /var. Then practise the queries you will use in every incident: by unit, by priority, by boot, by time and as JSON.",
        "cmd": "ls -d /var/log/journal || sudo mkdir -p /var/log/journal\nsudo mkdir -p /etc/systemd/journald.conf.d\nprintf '[Journal]\\nStorage=persistent\\nSystemMaxUse=200M\\nMaxRetentionSec=1month\\n' | sudo tee /etc/systemd/journald.conf.d/lab.conf\nsudo systemctl restart systemd-journald\njournalctl --disk-usage\njournalctl --list-boots | tail -3\njournalctl -p err -b --no-pager | tail -10\njournalctl -u labapp -u labreport --since today --no-pager | tail -10\njournalctl -u labapp -o json-pretty -n 1",
        "check": "journalctl --list-boots shows more than one boot (after any reboot), and --disk-usage is well under 200M."
      },
      {
        "title": "Fault 1: the binary path is wrong",
        "body": "Break ExecStart with a typo and restart. Read the status line carefully: the exit status names the step that failed. 203/EXEC means systemd could not execute the program at all (missing file, not executable, or a bad interpreter line).",
        "cmd": "sudo sed -i 's#/usr/bin/python3#/usr/bin/pyhton3#' /etc/systemd/system/labapp.service\nsudo systemctl daemon-reload; sudo systemctl restart labapp\nsystemctl status labapp --no-pager | head -12\njournalctl -xeu labapp --no-pager | tail -15\n# Fix it\nsudo sed -i 's#/usr/bin/pyhton3#/usr/bin/python3#' /etc/systemd/system/labapp.service\nsudo systemctl daemon-reload; sudo systemctl restart labapp; systemctl is-active labapp",
        "check": "You saw 'status=203/EXEC' and 'No such file or directory' in the journal, and after the fix is-active prints active."
      },
      {
        "title": "Fault 2: the working directory is missing",
        "body": "Rename the content directory. This time the program exists but systemd cannot change into WorkingDirectory, so it fails with 200/CHDIR before Python even starts. The fix is either the directory or the unit, and the journal tells you which path it tried.",
        "cmd": "sudo mv /srv/labapp /srv/labapp.moved\nsudo systemctl restart labapp\nsystemctl status labapp --no-pager | grep -E 'Active|status='\njournalctl -u labapp -n 5 --no-pager\nsudo mv /srv/labapp.moved /srv/labapp && sudo systemctl restart labapp && systemctl is-active labapp",
        "check": "You saw 'status=200/CHDIR' and 'Changing to the requested working directory failed', and the service is active again."
      },
      {
        "title": "Fault 3 and 4: a port conflict that ends in start-limit-hit",
        "body": "Stop labapp, occupy port 8081 with another listener, and start labapp again. Python exits with 'Address already in use', Restart=on-failure keeps retrying, and after five failures in ten seconds (the default StartLimitBurst and StartLimitIntervalSec) systemd gives up with start-limit-hit. Your RestartSec=5 would space the retries too far apart to hit that limit, so a temporary drop-in shortens it to one second for this test. Use ss to find who owns the port, free it, remove the temporary drop-in and clear the failed state with reset-failed.",
        "cmd": "sudo systemctl stop labapp\nprintf '[Service]\\nRestartSec=1\\n' | sudo tee /etc/systemd/system/labapp.service.d/fast-retry.conf\nsudo systemctl daemon-reload\npython3 -m http.server 8081 --bind 127.0.0.1 >/dev/null 2>&1 &\nsudo systemctl start labapp; sleep 15\nsystemctl status labapp --no-pager | grep -E 'Active|Result|start-limit'\njournalctl -u labapp -n 20 --no-pager | grep -iE 'address already in use|start-limit|Failed'\nsudo ss -ltnp 'sport = :8081'\nkill %1\nsudo rm /etc/systemd/system/labapp.service.d/fast-retry.conf && sudo systemctl daemon-reload\nsudo systemctl reset-failed labapp\nsudo systemctl start labapp && systemctl is-active labapp",
        "check": "You saw 'OSError: [Errno 98] Address already in use' in the journal, the unit reached 'start-limit-hit', ss named the rogue python3 process, and labapp runs again after reset-failed."
      },
      {
        "title": "Masks, dependencies and the troubleshooting runbook",
        "body": "Mask makes a unit impossible to start (even as a dependency), which is stronger than disable. list-dependencies shows what a target pulls in. Finish by writing a one-page 'service won't start' runbook: status and exit code, journalctl -xeu, systemd-analyze verify, check the paths, user and permissions, check ports with ss, reset-failed, and the table of exit statuses you met.",
        "cmd": "sudo systemctl mask labreport.timer; sudo systemctl start labreport.timer; systemctl is-enabled labreport.timer\nsudo systemctl unmask labreport.timer && sudo systemctl enable --now labreport.timer\nsystemctl list-dependencies multi-user.target | head -20\nsystemctl list-dependencies --reverse labapp",
        "check": "Starting a masked unit fails with 'Unit labreport.timer is masked', and the runbook covers all four faults with their tell-tale messages."
      }
    ],
    "verify": [
      "labapp.service is enabled, runs as the labapp user, restarts after kill -9, and has a sandboxing drop-in that lowered its systemd-analyze security score.",
      "labreport.timer appears in systemctl list-timers and /var/tmp/labreport.txt updates on schedule.",
      "journald has a size cap in /etc/systemd/journald.conf.d/lab.conf and keeps logs across reboots.",
      "You can show the journal evidence for 203/EXEC, 200/CHDIR, 'Address already in use' and start-limit-hit."
    ],
    "deliverable": "The unit files, drop-in and timer with comments, before/after systemd-analyze security scores, journal excerpts for each of the four faults, and a one-page 'service won't start' runbook with an exit-status cheat sheet.",
    "resume": "Wrote and hardened systemd service and timer units for an in-house app (dedicated service account, restart policy, sandboxing drop-in), configured persistent size-limited journald logging, and built a troubleshooting runbook from diagnosing 203/EXEC, 200/CHDIR, port-conflict and start-limit-hit failures.",
    "interview": [
      "A service won't start. What do you run first? — systemctl status for the state and exit code, then journalctl -xeu <unit> for the full log, then systemd-analyze verify on the unit file; the exit status (203/EXEC, 200/CHDIR, 217/USER and so on) usually names the failing step.",
      "What is the difference between disable and mask? — disable removes the links that start a unit at boot but it can still be started manually or as a dependency; mask links it to /dev/null so nothing can start it until it is unmasked.",
      "Why use a systemd timer instead of cron? — Timers log each run with its exit status in the journal, can catch up missed runs with Persistent=true, add randomized delay, respect unit dependencies and resource controls, and can be managed like any other unit."
    ],
    "cleanup": [
      "sudo systemctl disable --now labapp labreport.timer",
      "sudo rm -r /etc/systemd/system/labapp.service /etc/systemd/system/labapp.service.d /etc/systemd/system/labreport.* && sudo systemctl daemon-reload",
      "sudo userdel labapp; sudo rm -r /srv/labapp /var/tmp/labreport.txt",
      "Keep the journald size cap, or remove /etc/systemd/journald.conf.d/lab.conf and restart systemd-journald."
    ],
    "links": [
      {
        "label": "systemd.service(5) manual",
        "url": "https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html"
      },
      {
        "label": "systemd.timer(5) manual",
        "url": "https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html"
      },
      {
        "label": "systemd.exec(5) manual: sandboxing options and exit codes",
        "url": "https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html"
      },
      {
        "label": "journalctl(1) manual",
        "url": "https://www.freedesktop.org/software/systemd/man/latest/journalctl.html"
      }
    ]
  },
  {
    "id": "lab-package-patching",
    "title": "Package management and patching on AlmaLinux and Ubuntu: repos, updates and rollback",
    "track": "Systems administration",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free (AlmaLinux 9 and Ubuntu Server 24.04, both free to download and update)",
    "summary": "Build an AlmaLinux 9 VM next to your Ubuntu server and learn both package worlds side by side: query and verify packages with rpm/dnf and dpkg/apt, add EPEL and a signed third-party apt repository, build your own local dnf repository, assess and apply security updates, roll a change back with dnf history, pin versions, decide when a reboot is needed and switch on automatic security updates.",
    "realWorld": "Unpatched software is behind a large share of breaches, and patching is the sysadmin's job. Real environments mix Red Hat-family and Debian-family servers, so you need both toolchains, plus the judgement to patch safely: snapshot first, security fixes before feature updates, a rollback plan, and knowing which services need a restart. RHCSA tests repository configuration and dnf; Linux+ covers both families.",
    "youWillNeed": [
      "ubuntu-srv01 (192.168.56.10) from lab-home-lab",
      "A new AlmaLinux 9 VM (alma01: 2 vCPU, 2 GB RAM, 20 GB disk, NAT + host-only adapters), from the AlmaLinux 9 minimal or DVD ISO at almalinux.org (Rocky Linux 9 works the same way)",
      "Internet access through the NAT adapters for both VMs"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "Snapshot both VMs before any upgrade so you can roll back if an update breaks them. Only add repositories from publishers you trust and always with their signing key: a repository can install anything as root. Never disable GPG checking to 'make it work'.",
    "steps": [
      {
        "title": "Build the AlmaLinux VM and give it a lab address",
        "body": "Install AlmaLinux 9 with the Minimal Install environment, create an admin user in the wheel group, and let the NAT adapter use DHCP. Then give the host-only adapter a static address with NetworkManager's nmcli (RHEL-family systems do not use netplan). Snapshot it once it works.",
        "cmd": "# On alma01 after install\nnmcli device status\nsudo nmcli connection modify enp0s8 ipv4.method manual ipv4.addresses 192.168.56.12/24 connection.autoconnect yes\nsudo nmcli connection up enp0s8\nsudo hostnamectl set-hostname alma01\ncat /etc/os-release | head -4\nping -c 2 192.168.56.10\n# On the host\nVBoxManage snapshot \"alma01\" take \"clean-install\"",
        "check": "alma01 answers ping at 192.168.56.12 from ubuntu-srv01, and /etc/os-release says AlmaLinux 9.x. If nmcli says the connection is called 'Wired connection 1' or similar, use that name."
      },
      {
        "title": "Query packages the RPM way",
        "body": "rpm works on single package files and the installed-package database; dnf resolves dependencies against repositories. Learn the questions you ask every week: which package owns this file, what files did this package install, which package provides a command I do not have yet, and has anything been modified since install.",
        "cmd": "dnf repolist\nrpm -qa | wc -l\nrpm -qi openssh-server | head -8\nrpm -ql openssh-server | head\nrpm -qf /etc/ssh/sshd_config\ndnf provides '*/bin/dig'\ndnf info bind-utils\nsudo dnf install -y bind-utils\nrpm -V openssh-server; echo \"exit=$?\"\nsudo sh -c 'echo \"# lab edit\" >> /etc/ssh/sshd_config'; rpm -V openssh-server",
        "check": "dnf provides names bind-utils for dig, and the second rpm -V shows 'S.5....T.  c /etc/ssh/sshd_config' (size, digest and time changed on a config file)."
      },
      {
        "title": "Query packages the Debian way",
        "body": "On ubuntu-srv01 do the same with dpkg (installed database) and apt (repositories). apt-cache policy shows which repository and version apt would pick, which matters once you add third-party repos. Ubuntu 24.04 describes its repositories in deb822 format in /etc/apt/sources.list.d/ubuntu.sources.",
        "cmd": "cat /etc/apt/sources.list.d/ubuntu.sources\ndpkg -l | wc -l\ndpkg -S /usr/sbin/sshd\ndpkg -L openssh-server | head\napt show openssh-server 2>/dev/null | head -8\napt-cache policy openssh-server\napt-file --help >/dev/null 2>&1 || sudo apt install -y apt-file && sudo apt-file update\napt-file search bin/dig | head -3\nsudo apt install -y debsums && sudo debsums -s openssh-server; echo \"exit=$?\"",
        "check": "dpkg -S names openssh-server, apt-file finds bind9-dnsutils for dig, and debsums -s prints nothing (no modified files) for openssh-server."
      },
      {
        "title": "Add repositories safely: EPEL and a signed apt repo",
        "body": "On AlmaLinux, EPEL (Extra Packages for Enterprise Linux) is the standard extra repository and needs the CRB repository enabled too. On Ubuntu, add a vendor repository the modern way: download its key into its own keyring file and reference it with signed-by, so that key can only vouch for that one repository (the old apt-key trusted a key for everything). The PostgreSQL project's repository is used here as the example.",
        "cmd": "# alma01\nsudo dnf install -y dnf-plugins-core epel-release\nsudo dnf config-manager --set-enabled crb\ndnf repolist\ncat /etc/yum.repos.d/epel.repo | head -12\nrpm -q gpg-pubkey --qf '%{NAME}-%{VERSION}\\t%{SUMMARY}\\n'\n# ubuntu-srv01\nsudo install -d /usr/share/postgresql-common/pgdg\nsudo curl -fsSL -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc\necho \"deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(. /etc/os-release; echo $VERSION_CODENAME)-pgdg main\" | sudo tee /etc/apt/sources.list.d/pgdg.list\nsudo apt update\napt-cache policy postgresql-client | head -12",
        "check": "dnf repolist lists epel and crb with gpgcheck=1 in epel.repo, and apt-cache policy lists candidates from both archive.ubuntu.com and apt.postgresql.org."
      },
      {
        "title": "Build a local dnf repository",
        "body": "Air-gapped or tightly controlled networks install from an internal repository, not the internet. Download a package and its dependencies, generate repository metadata with createrepo_c, and point a .repo file at it. Keep gpgcheck=1: the packages are still signed by AlmaLinux, so the signatures verify.",
        "cmd": "sudo dnf install -y createrepo_c\nsudo mkdir -p /srv/localrepo\nsudo dnf download --resolve --destdir /srv/localrepo tree htop\nsudo createrepo_c /srv/localrepo\nsudo tee /etc/yum.repos.d/local.repo > /dev/null <<'EOF'\n[local]\nname=Local lab repository\nbaseurl=file:///srv/localrepo\nenabled=1\ngpgcheck=1\nEOF\nsudo dnf clean all\nsudo dnf --disablerepo='*' --enablerepo=local install -y tree\ndnf info --installed tree | grep -i 'from repo'",
        "check": "tree installs with every other repository disabled and dnf info shows it came from repo 'local'."
      },
      {
        "title": "Assess what needs patching",
        "body": "Before patching, find out what is outstanding and how serious it is. RHEL-family advisories are classified (security with severity, bugfix, enhancement). On Ubuntu, list upgradable packages and use the pro client to see security status. Record the counts: this is your 'before' for the patch report.",
        "cmd": "# alma01\nsudo dnf check-update | tail -n +2 | wc -l\nsudo dnf updateinfo summary\nsudo dnf updateinfo list --security | head -20\nsudo dnf updateinfo info --security | head -30\n# ubuntu-srv01\nsudo apt update\napt list --upgradable 2>/dev/null | tail -n +2 | wc -l\napt list --upgradable 2>/dev/null | grep -- -security | head\npro security-status",
        "check": "You have, for each server, the number of pending updates and how many are security updates (it can be zero on a freshly patched VM; note that too)."
      },
      {
        "title": "Patch with a rollback plan",
        "body": "Snapshot first. Apply security updates only on AlmaLinux, then look at the transaction history. dnf history undo reverses a transaction; demonstrate it on a small install so you know the command works before you need it under pressure (undoing a large upgrade is possible but not guaranteed if older package versions are no longer in the repos, which is why the snapshot matters).",
        "cmd": "# host\nVBoxManage snapshot \"alma01\" take \"pre-patch\"\n# alma01\nsudo dnf upgrade --security -y\nsudo dnf history list | head -5\nsudo dnf install -y cowsay\nsudo dnf history list | head -3\nsudo dnf history info last\nsudo dnf history undo last -y\nrpm -q cowsay\n# ubuntu-srv01\nsudo apt full-upgrade -y\ngrep -E ' (install|upgrade) ' /var/log/dpkg.log | tail -5",
        "check": "dnf history shows the security upgrade transaction, and after 'history undo last' rpm -q cowsay says the package is not installed."
      },
      {
        "title": "Decide what needs a restart",
        "body": "Updated libraries do nothing for processes still running the old copy. A new kernel needs a reboot; a patched OpenSSL needs every service using it restarted. Both families can tell you.",
        "cmd": "# alma01\nrpm -q kernel\nuname -r\nsudo dnf needs-restarting -r; echo \"exit=$?  (1 means reboot needed)\"\nsudo dnf needs-restarting -s\nsudo grubby --default-kernel\ngrep installonly_limit /etc/dnf/dnf.conf\n# ubuntu-srv01\nls /var/run/reboot-required 2>/dev/null && cat /var/run/reboot-required.pkgs\nsudo needrestart -b -r l",
        "check": "You can say for each server whether a reboot is needed and why, and name any services that need restarting."
      },
      {
        "title": "Hold back a package and exclude one",
        "body": "Sometimes an application is certified only on a specific version, so you freeze it. On Ubuntu use apt-mark hold; on AlmaLinux use the versionlock plugin or an exclude line. Holds must be documented and reviewed, or they quietly become unpatched software.",
        "cmd": "# ubuntu-srv01\nsudo apt-mark hold openssh-server\napt-mark showhold\nsudo apt-mark unhold openssh-server\n# alma01\nsudo dnf install -y python3-dnf-plugin-versionlock\nsudo dnf versionlock add openssh-server\nsudo dnf versionlock list\nsudo dnf versionlock delete openssh-server\necho 'exclude=kernel*' | sudo tee -a /etc/dnf/dnf.conf; sudo dnf check-update kernel; sudo sed -i '/^exclude=kernel\\*/d' /etc/dnf/dnf.conf",
        "check": "showhold and versionlock list each showed openssh-server while held, and both holds and the exclude are removed afterwards."
      },
      {
        "title": "Turn on automatic security updates",
        "body": "Automatic security patching for low-risk servers frees you to test the risky changes by hand. Ubuntu ships unattended-upgrades, which by default installs only from the security pocket; dry-run it to see what it would do. On AlmaLinux, dnf-automatic runs from a systemd timer; set it to apply security updates only.",
        "cmd": "# ubuntu-srv01\nsudo apt install -y unattended-upgrades\ncat /etc/apt/apt.conf.d/20auto-upgrades\ngrep -A4 'Allowed-Origins' /etc/apt/apt.conf.d/50unattended-upgrades\nsudo unattended-upgrade --dry-run --debug 2>&1 | tail -15\n# alma01\nsudo dnf install -y dnf-automatic\nsudo sed -i 's/^upgrade_type = .*/upgrade_type = security/; s/^apply_updates = .*/apply_updates = yes/' /etc/dnf/automatic.conf\ngrep -E '^(upgrade_type|apply_updates)' /etc/dnf/automatic.conf\nsudo systemctl enable --now dnf-automatic.timer\nsystemctl list-timers dnf-automatic.timer",
        "check": "20auto-upgrades has Unattended-Upgrade \"1\", the dry run completes without errors, and dnf-automatic.timer shows a next run time."
      },
      {
        "title": "Write the patch report and policy",
        "body": "Write a short patch report for both servers: pending updates before and after, security advisories applied (with their IDs), reboots done, holds in place with reasons, and anything that failed. Then a half-page patch policy: severity-based deadlines (for example critical within 7 days), maintenance windows, snapshot or backup before patching, test on one server first, and who approves exceptions.",
        "check": "The report has before and after counts for each server and the policy states a deadline for each severity."
      }
    ],
    "verify": [
      "alma01 has EPEL, CRB and your file:// local repository enabled with gpgcheck=1, and installs from the local repo work with all other repos disabled.",
      "ubuntu-srv01 has the PostgreSQL apt repository configured with a signed-by keyring, not apt-key.",
      "dnf history shows a security upgrade and an undone test transaction.",
      "dnf-automatic.timer and unattended-upgrades are both enabled for security updates."
    ],
    "deliverable": "A patching pack: the repo files (local.repo, pgdg.list), a before/after patch report for both servers with advisory IDs, reboot and restart decisions with evidence, a hold register, and a one-page patch management policy.",
    "resume": "Administered packages and patching on AlmaLinux 9 and Ubuntu 24.04: configured EPEL, a signed third-party apt repository and a local dnf repository, assessed and applied security advisories with rollback via dnf history and snapshots, managed version holds, and automated security updates with dnf-automatic and unattended-upgrades.",
    "interview": [
      "How do you find which package a file belongs to? — rpm -qf <file> on RHEL-family systems and dpkg -S <file> on Debian-family systems; for a file that is not installed yet, dnf provides or apt-file search.",
      "An update broke an application. How do you roll back? — Restore the pre-patch snapshot or backup if you have one; otherwise dnf history undo <id> (or apt install pkg=<old version>) if the old versions are still available, then hold the package and raise the issue with the vendor.",
      "Why use signed-by instead of apt-key? — apt-key added keys to a global keyring trusted for every repository, so a third-party key could sign packages that replace Ubuntu's own; signed-by scopes the key to the one repository it belongs to."
    ],
    "cleanup": [
      "ubuntu-srv01: sudo rm /etc/apt/sources.list.d/pgdg.list && sudo apt update (keep the key file or delete /usr/share/postgresql-common/pgdg).",
      "alma01: keep it for later labs, or power it off and delete it (VBoxManage unregistervm \"alma01\" --delete).",
      "Delete the 'pre-patch' snapshots once you are happy with the patched state."
    ],
    "links": [
      {
        "label": "Red Hat: Managing software with the DNF tool (RHEL 9)",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_software_with_the_dnf_tool/index"
      },
      {
        "label": "Red Hat: Managing and monitoring security updates (RHEL 9)",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_and_monitoring_security_updates/index"
      },
      {
        "label": "Ubuntu Server docs: Automatic updates",
        "url": "https://documentation.ubuntu.com/server/how-to/software/automatic-updates/"
      },
      {
        "label": "Fedora Docs: EPEL",
        "url": "https://docs.fedoraproject.org/en-US/epel/"
      }
    ]
  },
  {
    "id": "lab-powershell-admin",
    "title": "PowerShell administration: bulk users, services, scheduled tasks and remote management",
    "track": "Systems administration",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free (PowerShell 7, Windows evaluation VMs, PSScriptAnalyzer from the PowerShell Gallery)",
    "summary": "Use PowerShell 7 the way a Windows admin does: work with objects in the pipeline, create users in bulk from a CSV, report and fix services, write a reusable health-check function with -WhatIf support, schedule it as a task, run it on a second machine over PowerShell remoting and CIM sessions, query event logs remotely, and lint your code with PSScriptAnalyzer.",
    "realWorld": "Windows administrators who script get the repetitive work done in minutes instead of days, and make fewer mistakes doing it. Onboarding a batch of starters, checking every server's stopped services, pulling errors from event logs across a fleet and scheduling a nightly report are everyday tasks, and 'show me a script you wrote' is a common interview request for sysadmin and support roles.",
    "youWillNeed": [
      "win-client01 (192.168.56.20) from lab-home-lab",
      "A second Windows VM to manage remotely: the domain controller from lab-ad-gpo, or any Windows Server 2022/2025 evaluation VM on 192.168.56.0/24 (called TARGET below)",
      "PowerShell 7 (installed in step 1) and an Administrator session"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Test every script that changes things with -WhatIf first, and run it against lab machines only. Adding a machine to WinRM TrustedHosts turns off server identity checking for it, so list specific lab IPs, never '*', and remove them afterwards. Do not save plain-text passwords in scripts or CSV files.",
    "steps": [
      {
        "title": "Install PowerShell 7 and learn to find commands",
        "body": "Windows ships Windows PowerShell 5.1; PowerShell 7 installs side by side as pwsh.exe. The three discovery commands are Get-Command (what exists), Get-Help (how to use it, with -Examples) and Get-Member (what an object contains). Allow locally written scripts to run for your user.",
        "cmd": "winget install --id Microsoft.PowerShell -e --accept-package-agreements --accept-source-agreements\n# Open 'PowerShell 7' as Administrator\n$PSVersionTable.PSVersion\nSet-ExecutionPolicy -Scope CurrentUser RemoteSigned\nUpdate-Help -ErrorAction SilentlyContinue\nGet-Command -Noun LocalUser\nGet-Help New-LocalUser -Examples\nGet-Service | Get-Member -MemberType Property",
        "check": "$PSVersionTable shows 7.x and Get-Command lists New-LocalUser, Get-LocalUser, Set-LocalUser and friends."
      },
      {
        "title": "Think in objects: filter, sort, select and export",
        "body": "PowerShell passes objects, not text, so you filter on properties instead of parsing columns. Filter as early (left) as possible, and prefer the command's own -Filter parameter when it has one because it runs faster. Export to CSV or HTML for reports.",
        "cmd": "Get-Service | Where-Object Status -eq 'Stopped' | Sort-Object DisplayName | Select-Object -First 10 Name, DisplayName, StartType\nGet-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 5 Name, Id, @{n='MemMB';e={[math]::Round($_.WorkingSet64/1MB)}}\nGet-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime, @{n='FreeMemGB';e={[math]::Round($_.FreePhysicalMemory/1MB,1)}}\nGet-CimInstance Win32_LogicalDisk -Filter \"DriveType=3\" | Select-Object DeviceID, @{n='FreePct';e={[math]::Round(100*$_.FreeSpace/$_.Size,1)}}\nNew-Item -ItemType Directory C:\\Scripts, C:\\Reports -Force | Out-Null\nGet-Service | Select-Object Name, Status, StartType | Export-Csv C:\\Reports\\services.csv -NoTypeInformation",
        "check": "C:\\Reports\\services.csv opens in a spreadsheet with one row per service."
      },
      {
        "title": "Create users in bulk from a CSV",
        "body": "Onboarding from a CSV is the classic first script. Generate a random initial password for each user, force a change at first sign-in, add them to a group, and write the result (not the passwords) to a log. The same pattern works with New-ADUser in a domain. Run it with -WhatIf first by testing the loop with Write-Output before you let it create anything.",
        "cmd": "@'\nUsername,FullName,Department\namoss,Alex Moss,Finance\nbchen,Bo Chen,Finance\ncokafor,Chidi Okafor,Sales\n'@ | Set-Content C:\\Scripts\\starters.csv\nNew-LocalGroup -Name Finance -Description 'Finance team' -ErrorAction SilentlyContinue\nfunction New-RandomPassword { -join ((33..126) | Get-Random -Count 16 | ForEach-Object { [char]$_ }) }\nImport-Csv C:\\Scripts\\starters.csv | ForEach-Object {\n  $pw = ConvertTo-SecureString (New-RandomPassword) -AsPlainText -Force\n  New-LocalUser -Name $_.Username -FullName $_.FullName -Description $_.Department -Password $pw -WhatIf\n}\n# Now for real, then force a password change and add group membership\nImport-Csv C:\\Scripts\\starters.csv | ForEach-Object {\n  $pw = ConvertTo-SecureString (New-RandomPassword) -AsPlainText -Force\n  New-LocalUser -Name $_.Username -FullName $_.FullName -Description $_.Department -Password $pw | Out-Null\n  net user $_.Username /logonpasswordchg:yes | Out-Null\n  if ($_.Department -eq 'Finance') { Add-LocalGroupMember -Group Finance -Member $_.Username }\n  \"$(Get-Date -Format s) created $($_.Username)\" | Add-Content C:\\Reports\\onboarding.log\n}\nGet-LocalGroupMember Finance\nGet-LocalUser amoss, bchen, cokafor | Select-Object Name, FullName, Enabled, PasswordLastSet",
        "check": "The -WhatIf run printed three 'What if: Performing the operation' lines without creating anything; afterwards three users exist, two are in Finance, and onboarding.log has three lines."
      },
      {
        "title": "Manage services and find broken ones",
        "body": "A useful daily check: services set to start automatically that are not running. Some are expected (delayed-start or trigger-start services stop on their own), so the report is a starting point, not a to-do list. Practise changing start type and restarting safely.",
        "cmd": "Get-CimInstance Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\" | Select-Object Name, DisplayName, State, ExitCode\nGet-Service Spooler | Select-Object Name, Status, StartType, @{n='DependentServices';e={$_.DependentServices.Name -join ','}}\nSet-Service Spooler -StartupType Manual -WhatIf\nRestart-Service Spooler -Verbose\nGet-Service W32Time | Select-Object Status, StartType\nw32tm /query /status",
        "check": "You have a list of auto-start services that are not running and can explain at least one of them (for example a trigger-start service that stopped itself)."
      },
      {
        "title": "Write a reusable health-check function",
        "body": "Wrap the checks in an advanced function that returns one object per computer, so its output can be sorted, exported or compared like any cmdlet's. Save it as a module so other scripts can Import-Module it. Add a second function that deletes old files, with SupportsShouldProcess so -WhatIf and -Confirm work for free.",
        "cmd": "New-Item -ItemType Directory \"$HOME\\Documents\\PowerShell\\Modules\\LabAdmin\" -Force | Out-Null\n@'\nfunction Get-LabHealth {\n  [CmdletBinding()]\n  param()\n  $os   = Get-CimInstance Win32_OperatingSystem\n  $disk = Get-CimInstance Win32_LogicalDisk -Filter \"DeviceID='C:'\"\n  $bad  = Get-CimInstance Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\"\n  $pending = Test-Path 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Component Based Servicing\\RebootPending'\n  [pscustomobject]@{\n    Computer        = $env:COMPUTERNAME\n    UptimeHours     = [math]::Round(((Get-Date) - $os.LastBootUpTime).TotalHours, 1)\n    CFreePct        = [math]::Round(100 * $disk.FreeSpace / $disk.Size, 1)\n    StoppedAutoSvcs = ($bad.Name -join ',')\n    RebootPending   = $pending\n    CheckedAt       = Get-Date -Format s\n  }\n}\nfunction Remove-OldFile {\n  [CmdletBinding(SupportsShouldProcess)]\n  param([Parameter(Mandatory)][string]$Path, [int]$Days = 30)\n  Get-ChildItem $Path -File -Recurse | Where-Object LastWriteTime -lt (Get-Date).AddDays(-$Days) |\n    ForEach-Object { if ($PSCmdlet.ShouldProcess($_.FullName, 'Delete')) { Remove-Item $_.FullName } }\n}\nExport-ModuleMember -Function Get-LabHealth, Remove-OldFile\n'@ | Set-Content \"$HOME\\Documents\\PowerShell\\Modules\\LabAdmin\\LabAdmin.psm1\"\nImport-Module LabAdmin -Force\nGet-LabHealth\nRemove-OldFile -Path $env:TEMP -Days 7 -WhatIf",
        "check": "Get-LabHealth returns one object with all six properties, and Remove-OldFile -WhatIf lists files without deleting any."
      },
      {
        "title": "Schedule the health check as a task",
        "body": "Create a script that appends the health object to a CSV, then register a scheduled task that runs it daily as SYSTEM, which needs no stored password. Run it once on demand and check LastTaskResult (0 means success). Because SYSTEM does not load your user module path, the script imports the module by full path.",
        "cmd": "@\"\nImport-Module '$HOME\\Documents\\PowerShell\\Modules\\LabAdmin\\LabAdmin.psm1'\nGet-LabHealth | Export-Csv C:\\Reports\\health.csv -Append -NoTypeInformation\n\"@ | Set-Content C:\\Scripts\\health.ps1\n$action    = New-ScheduledTaskAction -Execute 'C:\\Program Files\\PowerShell\\7\\pwsh.exe' -Argument '-NoProfile -ExecutionPolicy Bypass -File C:\\Scripts\\health.ps1'\n$trigger   = New-ScheduledTaskTrigger -Daily -At 7:00\n$principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest\n$settings  = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 10)\nRegister-ScheduledTask -TaskName 'LabHealthCheck' -TaskPath '\\Lab\\' -Action $action -Trigger $trigger -Principal $principal -Settings $settings\nStart-ScheduledTask -TaskPath '\\Lab\\' -TaskName 'LabHealthCheck'\nStart-Sleep 10\nGet-ScheduledTaskInfo -TaskPath '\\Lab\\' -TaskName 'LabHealthCheck' | Select-Object LastRunTime, LastTaskResult, NextRunTime\nImport-Csv C:\\Reports\\health.csv | Format-Table",
        "check": "LastTaskResult is 0, NextRunTime is tomorrow at 07:00, and health.csv has a row written by the task."
      },
      {
        "title": "Set up PowerShell remoting to a second machine",
        "body": "PowerShell remoting uses WinRM (HTTP 5985, HTTPS 5986). Domain-joined machines authenticate with Kerberos and need no extra setup. In a workgroup lab, the client must list the target in TrustedHosts because it cannot verify the target's identity with Kerberos; traffic is still encrypted at the message level. Enable remoting on the target (Windows Server has it on by default), then test.",
        "cmd": "# On TARGET (as Administrator)\nEnable-PSRemoting -Force\nGet-NetFirewallRule -DisplayGroup 'Windows Remote Management' | Select-Object DisplayName, Enabled, Profile\n# On win-client01 (skip TrustedHosts if both machines are in the lab domain; then use the DC's name)\n$target = '192.168.56.x'     # your TARGET's IP\nSet-Item WSMan:\\localhost\\Client\\TrustedHosts -Value $target -Concatenate -Force\nTest-WSMan $target\n$cred = Get-Credential        # an admin account on TARGET\nEnter-PSSession -ComputerName $target -Credential $cred\n  hostname; whoami; exit",
        "check": "Test-WSMan returns the protocol version and Enter-PSSession gives a [192.168.56.x]: prompt where hostname prints TARGET's name."
      },
      {
        "title": "Run your tools remotely: Invoke-Command and CIM sessions",
        "body": "Invoke-Command runs a script block or a local script file on one or many computers in parallel and returns objects tagged with PSComputerName. CIM sessions reuse one WinRM connection for many CIM queries. Pull recent errors from the remote System log with a FilterHashtable, which filters on the remote side instead of sending every event back.",
        "cmd": "$s = New-PSSession -ComputerName $target -Credential $cred\n# Send the local function definition to the remote session and run it there\nInvoke-Command -Session $s -ScriptBlock ${function:Get-LabHealth}\n$c = New-CimSession -ComputerName $target -Credential $cred\nGet-CimInstance -CimSession $c Win32_OperatingSystem | Select-Object PSComputerName, Caption, LastBootUpTime\nGet-CimInstance -CimSession $c Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\" | Select-Object PSComputerName, Name\nInvoke-Command -Session $s -ScriptBlock { Get-WinEvent -FilterHashtable @{LogName='System'; Level=2; StartTime=(Get-Date).AddDays(-1)} -MaxEvents 10 -ErrorAction SilentlyContinue | Select-Object TimeCreated, Id, ProviderName }\nRemove-PSSession $s; Remove-CimSession $c",
        "check": "Invoke-Command with ${function:Get-LabHealth} returns a health object whose Computer property is TARGET's name, and the CIM queries return rows with PSComputerName set to the target."
      },
      {
        "title": "Lint and log your scripts",
        "body": "PSScriptAnalyzer is the standard linter: it flags aliases in scripts, unused variables, plain-text password parameters and missing ShouldProcess support. Start-Transcript records a whole admin session, which is useful evidence for change records. Script block logging (see lab-windows-hardening) records what ran for the security team.",
        "cmd": "Install-Module PSScriptAnalyzer -Scope CurrentUser -Force\nInvoke-ScriptAnalyzer -Path \"$HOME\\Documents\\PowerShell\\Modules\\LabAdmin\\LabAdmin.psm1\"\nInvoke-ScriptAnalyzer -Path C:\\Scripts\\health.ps1\nStart-Transcript -Path C:\\Reports\\session-$(Get-Date -Format yyyyMMdd-HHmm).txt\nGet-LabHealth\nStop-Transcript",
        "check": "Invoke-ScriptAnalyzer returns no Error-severity findings (fix any it reports, rerun, and note what changed), and the transcript file exists."
      },
      {
        "title": "Package your toolkit",
        "body": "Put the module, health.ps1, the onboarding script and a README (what each does, parameters, examples, how to schedule it, required permissions) in one folder. Add comment-based help to Get-LabHealth (a <# .SYNOPSIS .EXAMPLE #> block above the function) so Get-Help Get-LabHealth works.",
        "cmd": "Get-Help Get-LabHealth -Full\nGet-ChildItem C:\\Scripts, \"$HOME\\Documents\\PowerShell\\Modules\\LabAdmin\"",
        "check": "Get-Help Get-LabHealth shows your synopsis and example."
      }
    ],
    "verify": [
      "Three users from starters.csv exist with 'must change password at next logon' set, and onboarding.log records each one without passwords.",
      "The \\Lab\\LabHealthCheck scheduled task runs as SYSTEM with LastTaskResult 0 and writes to health.csv.",
      "Get-LabHealth runs on the remote TARGET through Invoke-Command and returns TARGET's name.",
      "PSScriptAnalyzer reports no errors on your module."
    ],
    "deliverable": "A 'LabAdmin' PowerShell toolkit: the module with comment-based help, onboarding and health scripts, the scheduled-task registration script, sample CSV and report output from both machines, the PSScriptAnalyzer results and a README.",
    "resume": "Automated Windows administration with PowerShell 7: bulk user onboarding from CSV, service and event-log reporting, a reusable health-check module with -WhatIf support, scheduled tasks running as SYSTEM, and fleet queries over PowerShell remoting and CIM sessions, linted with PSScriptAnalyzer.",
    "interview": [
      "Why is PowerShell's pipeline different from bash's? — It passes .NET objects with typed properties, not text, so you filter and sort on properties (Where-Object Status -eq 'Stopped') instead of parsing columns with grep and awk.",
      "How do you make a script safe to run in production? — Support -WhatIf and -Confirm with SupportsShouldProcess, validate parameters, handle errors with try/catch and -ErrorAction Stop, log what it did, test on one machine first, and never hard-code credentials.",
      "What does Enable-PSRemoting do and what does it need in a workgroup? — It starts WinRM, creates the listener and firewall rules and registers session configurations; in a workgroup the client must also trust the target through TrustedHosts (or use HTTPS with a certificate) because Kerberos cannot verify it."
    ],
    "cleanup": [
      "Unregister-ScheduledTask -TaskPath '\\Lab\\' -TaskName 'LabHealthCheck' -Confirm:$false",
      "'amoss','bchen','cokafor' | Remove-LocalUser; Remove-LocalGroup Finance",
      "On win-client01: Set-Item WSMan:\\localhost\\Client\\TrustedHosts -Value '' -Force",
      "Optionally on TARGET: Disable-PSRemoting -Force (Windows Server manages itself over WinRM, so leave it on if unsure)."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Installing PowerShell on Windows",
        "url": "https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows"
      },
      {
        "label": "Microsoft Learn: Running remote commands",
        "url": "https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/running-remote-commands"
      },
      {
        "label": "Microsoft Learn: Register-ScheduledTask",
        "url": "https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/register-scheduledtask"
      },
      {
        "label": "Microsoft Learn: PSScriptAnalyzer overview",
        "url": "https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview"
      }
    ]
  },
  {
    "id": "lab-azure-admin",
    "title": "Azure administration basics: resource groups, VNet, NSG, VM, storage, RBAC and cost control",
    "track": "Systems administration",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free-account credit or free-tier services if used as described (read the current terms at azure.microsoft.com/free). A forgotten VM, public IP or disk keeps billing; set the budget alert first and delete the resource group the same day.",
    "summary": "In your own Azure free account, set a budget alert first, then build a tagged resource group with a VNet and two subnets, an NSG that allows SSH only from your IP, a small Ubuntu VM with auto-shutdown, and a locked-down storage account. Learn why Owner cannot read blobs until you grant a data role, give a second user read-only access with RBAC, enforce an allowed-locations policy, read the activity log, and tear it all down.",
    "realWorld": "Azure administrators spend their days on exactly these building blocks: resource groups and tags for organisation and cost, virtual networks and NSGs for isolation, VMs and storage for workloads, RBAC for least privilege and Azure Policy for guardrails. The AZ-104 exam is built on them, and in real teams the admin who sets budgets and cleans up is the one trusted with production subscriptions.",
    "youWillNeed": [
      "An Azure free account you own (sign-up needs a phone number and a credit card for identity verification)",
      "Azure CLI 2.x on your Ubuntu VM or host (or Azure Cloud Shell in the portal)",
      "An SSH client, and a private browser window for testing the second user"
    ],
    "requires": [],
    "safety": "Only create resources in your own subscription. Check costs in Cost Management before and after, keep the VM to a free-tier-eligible size (for example Standard_B1s, where eligible), turn on auto-shutdown, and delete the resource group at the end of the session. Never open SSH (22) or RDP (3389) to 0.0.0.0/0 or 'Any'.",
    "steps": [
      {
        "title": "Create a budget alert before anything else",
        "body": "In the portal go to Cost Management + Billing > Budgets > Add. Scope it to your subscription, set a monthly budget of $5 (or the smallest amount allowed in your currency) with alerts at 50% and 100% of actual cost and 80% of forecast, sent to your email. Budgets alert; they do not stop spending, which is why cleanup still matters. Also note your free credit balance and expiry on the subscription's overview page.",
        "check": "The budget appears under Budgets with your email as an alert recipient."
      },
      {
        "title": "Sign in with the CLI and create a tagged resource group",
        "body": "A resource group is a lifecycle container: everything for one workload goes in it, and deleting it deletes everything inside. Tags (owner, env, cost centre) drive cost reports and cleanup. Pick one region close to you and use it for every resource.",
        "cmd": "az login\naz account show --query \"{name:name, id:id, user:user.name}\" -o table\nexport LOC=eastus RG=rg-lab-admin\naz group create -n $RG -l $LOC --tags env=lab owner=$(az account show --query user.name -o tsv) expires=$(date -d '+1 day' +%F)\naz group show -n $RG -o table",
        "check": "The resource group shows provisioningState Succeeded and your three tags (az group show -n $RG --query tags)."
      },
      {
        "title": "Build a virtual network with two subnets",
        "body": "Plan address space first: 10.20.0.0/16 for the VNet, a /24 for web and a /24 for data, leaving room to grow. Azure reserves five addresses in every subnet (network, gateway, two for DNS, broadcast), so a /24 gives 251 usable addresses.",
        "cmd": "az network vnet create -g $RG -n vnet-lab --address-prefixes 10.20.0.0/16 --subnet-name snet-web --subnet-prefixes 10.20.1.0/24\naz network vnet subnet create -g $RG --vnet-name vnet-lab -n snet-data --address-prefixes 10.20.2.0/24\naz network vnet subnet list -g $RG --vnet-name vnet-lab -o table",
        "check": "Two subnets are listed with the prefixes above."
      },
      {
        "title": "Create an NSG that allows SSH from your IP only",
        "body": "Network security groups are stateful allow/deny rule lists applied to a subnet or a NIC. Rules are evaluated by priority (lower number first); the built-in default rules allow traffic inside the VNet and deny all other inbound traffic from the internet. Attach the NSG to the subnet so every VM in it gets the same rules.",
        "cmd": "MYIP=$(curl -s https://api.ipify.org); echo $MYIP\naz network nsg create -g $RG -n nsg-web\naz network nsg rule create -g $RG --nsg-name nsg-web -n allow-ssh-from-me --priority 100 --direction Inbound --access Allow --protocol Tcp --source-address-prefixes $MYIP/32 --destination-port-ranges 22\naz network vnet subnet update -g $RG --vnet-name vnet-lab -n snet-web --network-security-group nsg-web\naz network nsg rule list -g $RG --nsg-name nsg-web --include-default -o table",
        "check": "The rule list shows your allow-ssh-from-me rule at priority 100 plus the six default rules, including DenyAllInBound at 65500."
      },
      {
        "title": "Deploy a small Ubuntu VM with auto-shutdown",
        "body": "Create the VM in snet-web with SSH key authentication and no NSG of its own (the subnet NSG covers it). Check that your chosen size is free-tier eligible in your region and subscription before you create it. Auto-shutdown stops (deallocates) it every evening in case you forget; a stopped but not deallocated VM still bills for compute.",
        "cmd": "az vm list-skus -l $LOC --size Standard_B1s --query \"[].{name:name, restrictions:restrictions[0].reasonCode}\" -o table\naz vm create -g $RG -n vm-lab01 --image Ubuntu2404 --size Standard_B1s --vnet-name vnet-lab --subnet snet-web --nsg \"\" --public-ip-sku Standard --admin-username azureuser --generate-ssh-keys --tags env=lab\naz vm auto-shutdown -g $RG -n vm-lab01 --time 1900\nIP=$(az vm show -d -g $RG -n vm-lab01 --query publicIps -o tsv)\nssh azureuser@$IP 'hostname; ip -br a; curl -s -H Metadata:true \"http://169.254.169.254/metadata/instance/compute/vmSize?api-version=2021-02-01&format=text\"; echo'",
        "check": "SSH works from your IP, the VM reports a 10.20.1.x private address, and the metadata service returns Standard_B1s."
      },
      {
        "title": "Prove the NSG with effective rules and IP flow verify",
        "body": "When traffic is blocked, check the rules that actually apply to the NIC (subnet and NIC NSGs combined) and ask Network Watcher whether a specific packet would be allowed. Test SSH from an address that is not yours and from yours.",
        "cmd": "NIC=$(az vm show -g $RG -n vm-lab01 --query 'networkProfile.networkInterfaces[0].id' -o tsv)\naz network nic list-effective-nsg --ids $NIC --query 'value[0].effectiveSecurityRules[].{name:name, access:access, prio:priority, src:sourceAddressPrefix, port:destinationPortRange}' -o table\nPRIV=$(az vm show -d -g $RG -n vm-lab01 --query privateIps -o tsv)\naz network watcher test-ip-flow -g $RG --vm vm-lab01 --direction Inbound --protocol TCP --local $PRIV:22 --remote 203.0.113.50:50000\naz network watcher test-ip-flow -g $RG --vm vm-lab01 --direction Inbound --protocol TCP --local $PRIV:22 --remote $MYIP:50000",
        "check": "IP flow verify returns Deny (DenyAllInBound) for 203.0.113.50 and Allow (allow-ssh-from-me) for your own IP."
      },
      {
        "title": "Create a locked-down storage account and meet the data plane",
        "body": "Storage account names are global, 3 to 24 lowercase letters and digits. Turn off anonymous blob access and shared key access, and require TLS 1.2. Then try to create a container with your Entra ID login: it fails even though you are the subscription Owner, because Owner is a control-plane (management) role. Reading and writing data needs a data-plane role such as Storage Blob Data Contributor.",
        "cmd": "SA=stlab$RANDOM$RANDOM; echo $SA\naz storage account create -g $RG -n $SA -l $LOC --sku Standard_LRS --kind StorageV2 --min-tls-version TLS1_2 --allow-blob-public-access false --allow-shared-key-access false --https-only true\naz storage container create --account-name $SA -n docs --auth-mode login     # expect an authorization error\nME=$(az ad signed-in-user show --query id -o tsv)\nSAID=$(az storage account show -g $RG -n $SA --query id -o tsv)\naz role assignment create --assignee $ME --role 'Storage Blob Data Contributor' --scope $SAID\nsleep 60\naz storage container create --account-name $SA -n docs --auth-mode login\necho 'hello from the lab' > hello.txt\naz storage blob upload --account-name $SA -c docs -f hello.txt -n hello.txt --auth-mode login\naz storage blob list --account-name $SA -c docs --auth-mode login -o table",
        "check": "The first container create fails with an AuthorizationPermissionMismatch-type error and the one after the role assignment succeeds; the blob is listed."
      },
      {
        "title": "Give a second user read-only access with RBAC",
        "body": "Create a test user in your Microsoft Entra ID tenant and assign the built-in Reader role at the resource group scope only. Azure RBAC is inherited downwards (management group > subscription > resource group > resource), so assign at the narrowest scope that works. Sign in as the user in a private window: they can see the resources in rg-lab-admin, cannot change them, and cannot see anything outside it.",
        "cmd": "DOMAIN=$(az ad signed-in-user show --query userPrincipalName -o tsv | cut -d@ -f2); echo $DOMAIN\naz ad user create --display-name 'Lab Reader' --user-principal-name labreader@$DOMAIN --password 'Change-Me-Lab-2026!' --force-change-password-next-sign-in true\nRGID=$(az group show -n $RG --query id -o tsv)\naz role assignment create --assignee labreader@$DOMAIN --role Reader --scope $RGID\naz role assignment list --scope $RGID --include-inherited -o table",
        "check": "As labreader in the portal you can open vm-lab01 but the Stop button fails with an authorization error, and other resource groups are not visible."
      },
      {
        "title": "Add a guardrail with Azure Policy",
        "body": "RBAC controls who can act; Azure Policy controls what is allowed to exist. Assign the built-in 'Allowed locations' policy to the resource group with only your region, then try to create a resource somewhere else. Policy assignments can take several minutes to take effect.",
        "cmd": "POL=$(az policy definition list --query \"[?displayName=='Allowed locations'].name\" -o tsv)\naz policy assignment create -n allowed-locations-lab --policy $POL --scope $RGID --params \"{\\\"listOfAllowedLocations\\\":{\\\"value\\\":[\\\"$LOC\\\"]}}\"\nsleep 300\naz network nsg create -g $RG -n nsg-wrong-region -l westeurope     # expect RequestDisallowedByPolicy\naz policy state list -g $RG --query \"[].{resource:resourceId, state:complianceState}\" -o table",
        "check": "Creating the NSG in westeurope fails with RequestDisallowedByPolicy naming allowed-locations-lab (pick a different test region if westeurope is your own)."
      },
      {
        "title": "Read the activity log and cost data",
        "body": "The activity log records every control-plane write in the subscription: who, what, when, and whether it succeeded. Find your role assignments and the policy denial. Then open Cost Management > Cost analysis, filter by tag env=lab, and note today's cost (it can take up to a day to appear).",
        "cmd": "az monitor activity-log list -g $RG --offset 3h --query \"[].{time:eventTimestamp, op:operationName.localizedValue, status:status.value, caller:caller}\" -o table | head -30",
        "check": "You can point to the log entries for the role assignment, the VM creation and the denied NSG creation, with the caller for each."
      },
      {
        "title": "Clean up everything and verify",
        "body": "Delete the resource group, which removes the VM, disk, public IP, NIC, NSG, VNet and storage account together, then delete the test user. Wait until the group is gone and check that no billable resources remain. Keep the budget; it costs nothing. Network Watcher may have created NetworkWatcherRG, which holds a free Network Watcher resource.",
        "cmd": "az group delete -n $RG --yes\naz ad user delete --id labreader@$DOMAIN\naz group list -o table\naz resource list --query \"[].{name:name, type:type, rg:resourceGroup}\" -o table\naz role assignment list --assignee $ME --all -o table",
        "check": "rg-lab-admin no longer exists, az resource list shows nothing of yours except (optionally) the Network Watcher, and the next day's Cost analysis shows no new charges."
      }
    ],
    "verify": [
      "A budget with email alerts existed before any resource was created.",
      "IP flow verify showed SSH allowed only from your IP, and the VM had auto-shutdown configured.",
      "The storage account blocked data access until you had a data-plane role, and labreader could read but not change resources in the resource group only.",
      "The allowed-locations policy denied an out-of-region resource, and the resource group and test user were deleted at the end."
    ],
    "deliverable": "An 'Azure lab build' record: the CLI script with comments, a network diagram (VNet, subnets, NSG, VM, storage), the effective NSG rules and IP flow results, RBAC assignments table, the policy denial, activity-log excerpts, a cost screenshot and the cleanup evidence.",
    "resume": "Built and tore down an Azure environment with the Azure CLI: tagged resource groups, VNet and subnet design, NSG rules verified with Network Watcher, an auto-shutdown Ubuntu VM, a storage account with shared-key and public access disabled, least-privilege RBAC at resource-group scope, an allowed-locations Azure Policy and budget alerts.",
    "interview": [
      "You are the subscription Owner but get 'not authorized' uploading a blob with your login. Why? — Owner is a control-plane role for managing resources; reading and writing blob data with Entra ID needs a data-plane role such as Storage Blob Data Contributor at the account or container scope.",
      "What is the difference between Azure RBAC and Azure Policy? — RBAC decides who can perform which actions at which scope; Policy decides which resource configurations are allowed to exist or must be audited, regardless of who creates them.",
      "How do you stop a lab or dev subscription running up a bill? — Budgets with alerts, tags on every resource, auto-shutdown or schedules on VMs, the smallest suitable SKUs, one resource group per workload so it can be deleted in one go, and regular review in Cost analysis."
    ],
    "cleanup": [
      "az group delete -n rg-lab-admin --yes (removes every resource created in the lab)",
      "az ad user delete --id labreader@<your default domain>",
      "Check Cost Management the next day, and cancel or downgrade the subscription if you do not plan to use Azure again before the free credit or free period ends."
    ],
    "links": [
      {
        "label": "Microsoft Learn: AZ-104 Azure Administrator study guide",
        "url": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104"
      },
      {
        "label": "Microsoft Learn: Network security groups overview",
        "url": "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview"
      },
      {
        "label": "Microsoft Learn: Assign an Azure role for access to blob data",
        "url": "https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access"
      },
      {
        "label": "Microsoft Learn: Create and manage budgets",
        "url": "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets"
      }
    ]
  },
  {
    "id": "lab-k8s-cluster-admin",
    "title": "Kubernetes cluster administration with kubeadm: build, back up etcd, drain, upgrade and troubleshoot",
    "track": "Systems administration",
    "level": "Advanced",
    "minutes": 300,
    "cost": "Free (kubeadm, containerd and Flannel on two local Ubuntu VMs)",
    "summary": "Build a two-node Kubernetes cluster with kubeadm on your own VMs, add a CNI plugin and a worker, back up etcd and restore it after a deliberate deletion, drain and cordon nodes for maintenance, upgrade the control plane and worker by one minor version, and fix a NotReady node and a broken control-plane static pod from the logs.",
    "realWorld": "Platform and cloud engineers who run Kubernetes themselves (on-premises, at the edge or in regulated environments) own the lifecycle: installs, version upgrades every few months, etcd backups and node maintenance. These are exactly the hands-on tasks in the CKA exam, and a practised etcd restore is what lets you recover a cluster when someone deletes the wrong namespace.",
    "youWillNeed": [
      "Two new Ubuntu Server 24.04 VMs on the host-only network: k8s-cp (192.168.56.40; 2 vCPU, 4 GB RAM, 30 GB disk) and k8s-w1 (192.168.56.41; 2 vCPU, 2 GB RAM, 30 GB disk), each with NAT + host-only adapters",
      "Two consecutive Kubernetes minor versions: the one the CKA currently targets (check the CNCF curriculum) as K8S_TO and the minor below it as K8S_FROM, for example v1.35 and v1.36",
      "About 16 GB of host RAM if you also run other lab VMs"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "This is a lab cluster on a private host-only network: do not expose the API server (port 6443) or etcd (2379-2380) to the internet. The etcd snapshot contains every Secret in the cluster in plain form, so protect it like a password file. Snapshot both VMs before the upgrade.",
    "steps": [
      {
        "title": "Prepare both nodes",
        "body": "Do this on k8s-cp and k8s-w1. Give each a static host-only address with netplan (as in lab-home-lab), names in /etc/hosts, swap off (the kubelet refuses to run with swap by default), the overlay and br_netfilter kernel modules, and IP forwarding. Then install containerd and switch it to the systemd cgroup driver, which must match the kubelet's.",
        "cmd": "sudo hostnamectl set-hostname k8s-cp      # k8s-w1 on the worker\nprintf '192.168.56.40 k8s-cp\\n192.168.56.41 k8s-w1\\n' | sudo tee -a /etc/hosts\nsudo swapoff -a && sudo sed -i '/\\sswap\\s/ s/^/#/' /etc/fstab\nprintf 'overlay\\nbr_netfilter\\n' | sudo tee /etc/modules-load.d/k8s.conf && sudo modprobe overlay && sudo modprobe br_netfilter\nprintf 'net.bridge.bridge-nf-call-iptables=1\\nnet.bridge.bridge-nf-call-ip6tables=1\\nnet.ipv4.ip_forward=1\\n' | sudo tee /etc/sysctl.d/k8s.conf && sudo sysctl --system\nsudo apt update && sudo apt install -y containerd apt-transport-https ca-certificates curl gpg\nsudo mkdir -p /etc/containerd && containerd config default | sudo tee /etc/containerd/config.toml >/dev/null\nsudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml\nsudo systemctl restart containerd && systemctl is-active containerd",
        "check": "On both nodes: free -h shows 0B swap, sysctl net.ipv4.ip_forward is 1, grep SystemdCgroup /etc/containerd/config.toml shows true, and containerd is active."
      },
      {
        "title": "Install kubeadm, kubelet and kubectl (older minor)",
        "body": "Kubernetes packages come from pkgs.k8s.io, with one repository per minor version. Install the older minor so you can upgrade later, and hold the packages so a routine apt upgrade never changes the cluster version by surprise. Tell the kubelet to use the host-only address; otherwise it picks the NAT address, which is the same 10.0.2.15 on both VMs.",
        "cmd": "K8S_FROM=v1.35   # set to your chosen older minor\nsudo mkdir -p -m 755 /etc/apt/keyrings\ncurl -fsSL https://pkgs.k8s.io/core:/stable:/$K8S_FROM/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg\necho \"deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/$K8S_FROM/deb/ /\" | sudo tee /etc/apt/sources.list.d/kubernetes.list\nsudo apt update && sudo apt install -y kubelet kubeadm kubectl\nsudo apt-mark hold kubelet kubeadm kubectl\necho \"KUBELET_EXTRA_ARGS=--node-ip=$(ip -4 -br addr show enp0s8 | awk '{print $3}' | cut -d/ -f1)\" | sudo tee /etc/default/kubelet\nkubeadm version -o short",
        "check": "kubeadm version prints the older minor on both nodes and /etc/default/kubelet has the node's 192.168.56.x address."
      },
      {
        "title": "Initialise the control plane",
        "body": "On k8s-cp only. kubeadm init runs preflight checks, creates the cluster CA and certificates in /etc/kubernetes/pki, writes static pod manifests for etcd, the API server, controller manager and scheduler into /etc/kubernetes/manifests, and prints a join command. Copy the admin kubeconfig so kubectl works as your user.",
        "cmd": "sudo kubeadm init --apiserver-advertise-address=192.168.56.40 --pod-network-cidr=10.244.0.0/16 --node-name k8s-cp | tee ~/kubeadm-init.log\nmkdir -p $HOME/.kube && sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config && sudo chown $(id -u):$(id -g) $HOME/.kube/config\nkubectl get nodes\nkubectl get pods -n kube-system -o wide\nls /etc/kubernetes/manifests",
        "check": "kubectl works, k8s-cp is listed as NotReady (no network plugin yet), and the manifests folder has etcd, kube-apiserver, kube-controller-manager and kube-scheduler YAML files."
      },
      {
        "title": "Install the Flannel network plugin",
        "body": "Pods need a CNI plugin to get addresses and talk across nodes. Flannel's default pod network is 10.244.0.0/16, matching the init flag. Because each VM has two interfaces, tell Flannel to use the host-only one (enp0s8) by adding --iface to its arguments.",
        "cmd": "curl -fsSLO https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml\ngrep -n -A2 -- '--kube-subnet-mgr' kube-flannel.yml\n# Add a line '- --iface=enp0s8' directly under '- --kube-subnet-mgr' with the same indentation (nano kube-flannel.yml), then:\ngrep -n -A1 -- '--kube-subnet-mgr' kube-flannel.yml\nkubectl apply -f kube-flannel.yml\nkubectl -n kube-flannel get pods -w     # Ctrl+C when Running\nkubectl get nodes",
        "check": "The flannel pod is Running and k8s-cp turns Ready."
      },
      {
        "title": "Join the worker and run a test workload",
        "body": "Join tokens expire after 24 hours, so generate a fresh join command rather than digging out the one from init. Run it on k8s-w1 with sudo. Then deploy a small app across the nodes and check pods get 10.244.x.x addresses.",
        "cmd": "# k8s-cp\nkubeadm token create --print-join-command\n# k8s-w1: paste the printed command with sudo in front\n# k8s-cp\nkubectl get nodes -o wide\nkubectl create deployment web --image=nginx:stable --replicas=3\nkubectl expose deployment web --port=80 --type=NodePort\nkubectl get pods -o wide\nNP=$(kubectl get svc web -o jsonpath='{.spec.ports[0].nodePort}'); curl -sI http://192.168.56.41:$NP | head -1",
        "check": "Both nodes are Ready with INTERNAL-IP 192.168.56.40 and .41, the web pods run on k8s-w1, and curl returns HTTP/1.1 200 OK."
      },
      {
        "title": "Back up etcd",
        "body": "etcd holds the entire cluster state. Take a snapshot with etcdctl using the etcd server certificates kubeadm created, then check it. Store copies off the node in real life. Newer etcd releases move status and restore into etcdutl; the etcdctl commands below still work with the Ubuntu etcd-client package.",
        "cmd": "sudo apt install -y etcd-client\nsudo mkdir -p /var/backups/etcd\nsudo ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key snapshot save /var/backups/etcd/snap-$(date +%F-%H%M).db\nsudo ETCDCTL_API=3 etcdctl --write-out=table snapshot status /var/backups/etcd/snap-*.db\nsudo chmod 600 /var/backups/etcd/*.db",
        "check": "snapshot status shows a hash, revision, total keys (several hundred or more) and size."
      },
      {
        "title": "Simulate a mistake and restore etcd",
        "body": "Delete the web deployment and service as if by accident. Restore the snapshot into a new data directory, then point the etcd static pod at it by editing only the hostPath in its manifest; the kubelet notices the change and recreates etcd. Keep any backup copies of manifests outside /etc/kubernetes/manifests, because the kubelet runs every file in that folder.",
        "cmd": "kubectl delete deployment web && kubectl delete svc web\nkubectl get deploy\nSNAP=$(ls -t /var/backups/etcd/snap-*.db | head -1)\nsudo ETCDCTL_API=3 etcdctl snapshot restore $SNAP --data-dir /var/lib/etcd-restore\nsudo cp /etc/kubernetes/manifests/etcd.yaml ~/etcd.yaml.bak\nsudo sed -i 's#^\\( *\\)path: /var/lib/etcd$#\\1path: /var/lib/etcd-restore#' /etc/kubernetes/manifests/etcd.yaml   # hostPath only, not mountPath\nsudo grep -n 'etcd-restore' /etc/kubernetes/manifests/etcd.yaml\nsleep 60; sudo crictl ps --name etcd\nkubectl get deploy,svc",
        "check": "After a minute or two (the API server may briefly refuse connections) the web deployment and service are back."
      },
      {
        "title": "Drain and cordon for node maintenance",
        "body": "cordon marks a node unschedulable; drain also evicts its pods (DaemonSet pods stay, emptyDir data is lost). With only one worker, the evicted web pods go Pending because the control plane is tainted against workloads, which is exactly what happens in a real cluster without spare capacity. A PodDisruptionBudget would make drain wait instead of taking every replica down.",
        "cmd": "kubectl create pdb web-pdb --selector=app=web --min-available=2\nkubectl drain k8s-w1 --ignore-daemonsets --delete-emptydir-data --timeout=60s; echo \"exit=$?\"\nkubectl delete pdb web-pdb\nkubectl drain k8s-w1 --ignore-daemonsets --delete-emptydir-data\nkubectl get nodes; kubectl get pods -o wide\nkubectl describe node k8s-cp | grep -i taints\nkubectl uncordon k8s-w1\nkubectl get pods -o wide -w     # Ctrl+C when all Running",
        "check": "The first drain times out because of the PDB, the second one succeeds, pods go Pending while k8s-w1 is SchedulingDisabled, and they run again after uncordon."
      },
      {
        "title": "Upgrade the control plane by one minor version",
        "body": "Snapshot both VMs first. Upgrades go one minor version at a time, control plane first, then workers. Point apt at the new minor's repository, upgrade kubeadm, check the plan, apply it, then upgrade the kubelet and kubectl on the drained control-plane node.",
        "cmd": "K8S_TO=v1.36   # the newer minor\nsudo sed -i \"s#/stable:/v[0-9.]*/#/stable:/$K8S_TO/#\" /etc/apt/sources.list.d/kubernetes.list\nsudo apt update\nVER=$(apt-cache madison kubeadm | awk 'NR==1{print $3}'); echo $VER\nsudo apt-mark unhold kubeadm && sudo apt install -y kubeadm=$VER && sudo apt-mark hold kubeadm\nsudo kubeadm upgrade plan\nsudo kubeadm upgrade apply v${VER%%-*} -y\nkubectl drain k8s-cp --ignore-daemonsets\nsudo apt-mark unhold kubelet kubectl && sudo apt install -y kubelet=$VER kubectl=$VER && sudo apt-mark hold kubelet kubectl\nsudo systemctl daemon-reload && sudo systemctl restart kubelet\nkubectl uncordon k8s-cp\nkubectl get nodes",
        "check": "'kubeadm upgrade apply' ends with 'SUCCESS! Your cluster was upgraded' and k8s-cp shows the new version in kubectl get nodes."
      },
      {
        "title": "Upgrade the worker",
        "body": "On the worker, kubeadm upgrade node updates the local kubelet configuration rather than the control plane. Drain it from the control plane first and uncordon it afterwards.",
        "cmd": "# k8s-w1 (set K8S_TO and repeat the sed and apt update from the previous step)\nVER=$(apt-cache madison kubeadm | awk 'NR==1{print $3}')\nsudo apt-mark unhold kubeadm && sudo apt install -y kubeadm=$VER && sudo apt-mark hold kubeadm\nsudo kubeadm upgrade node\n# k8s-cp\nkubectl drain k8s-w1 --ignore-daemonsets --delete-emptydir-data\n# k8s-w1\nsudo apt-mark unhold kubelet kubectl && sudo apt install -y kubelet=$VER kubectl=$VER && sudo apt-mark hold kubelet kubectl\nsudo systemctl daemon-reload && sudo systemctl restart kubelet\n# k8s-cp\nkubectl uncordon k8s-w1\nkubectl get nodes -o wide",
        "check": "Both nodes show the new version and Ready, and the web pods are Running again."
      },
      {
        "title": "Troubleshoot a NotReady node and a broken control-plane pod",
        "body": "Fault 1: stop the kubelet on the worker; within about a minute the node goes NotReady. Find the cause from the node conditions and the kubelet's journal, then fix it. Fault 2: break the scheduler's static pod manifest with a non-existent image tag; new pods then stay Pending with no events from the scheduler. Diagnose with crictl and the mirror pod's status, restore the manifest, and check certificate expiry while you are there.",
        "cmd": "# Fault 1 (k8s-w1)\nsudo systemctl stop kubelet\n# k8s-cp\nkubectl get nodes; kubectl describe node k8s-w1 | grep -A6 Conditions\n# k8s-w1\nsystemctl status kubelet --no-pager | head -5; sudo journalctl -u kubelet -n 20 --no-pager\nsudo systemctl start kubelet\n# Fault 2 (k8s-cp)\nsudo cp /etc/kubernetes/manifests/kube-scheduler.yaml ~/kube-scheduler.yaml.bak\nsudo sed -i 's#\\(image: registry.k8s.io/kube-scheduler:\\).*#\\1v0.0.0-broken#' /etc/kubernetes/manifests/kube-scheduler.yaml\nkubectl run probe --image=nginx:stable; sleep 30; kubectl get pod probe\nkubectl -n kube-system get pods | grep scheduler\nsudo crictl ps -a --name kube-scheduler\nsudo cp ~/kube-scheduler.yaml.bak /etc/kubernetes/manifests/kube-scheduler.yaml\nsleep 60; kubectl get pod probe\nsudo kubeadm certs check-expiration",
        "check": "k8s-w1 went NotReady with 'Kubelet stopped posting node status' and recovered; the probe pod stayed Pending while the scheduler pod showed ErrImagePull or ImagePullBackOff, and ran once the manifest was restored."
      },
      {
        "title": "Write the cluster operations runbook",
        "body": "Document the build, the etcd backup and restore procedure (with the certificate paths), the drain and upgrade order, and a troubleshooting table: NotReady node (kubelet, container runtime, CNI, certificates), Pending pods (scheduler, resources, taints, PDBs), and control-plane pods (static manifests, crictl, kubelet logs). Add how often you would back up etcd and where the snapshots should live.",
        "check": "Someone else could rebuild and upgrade this cluster from your runbook alone."
      }
    ],
    "verify": [
      "kubectl get nodes shows k8s-cp and k8s-w1 Ready on the newer minor version.",
      "An etcd snapshot exists and the web deployment deleted after it was taken came back after the restore.",
      "You drained and uncordoned a node and can explain why pods went Pending and how the PDB changed drain's behaviour.",
      "You recovered from a stopped kubelet and a broken kube-scheduler manifest using logs as evidence."
    ],
    "deliverable": "A cluster operations pack: build notes and kubeadm-init.log, the etcd backup and restore procedure with snapshot status output, before/after kubectl get nodes for the upgrade, drain evidence, the two troubleshooting cases with log excerpts, and the runbook.",
    "resume": "Built a two-node Kubernetes cluster with kubeadm, containerd and Flannel; performed etcd snapshot backup and restore, node drain and cordon with PodDisruptionBudgets, and a control-plane and worker minor-version upgrade; and diagnosed NotReady nodes and failed control-plane static pods.",
    "interview": [
      "How do you back up and restore a kubeadm cluster? — Snapshot etcd with etcdctl snapshot save using the etcd CA and server certificate, store it securely off the node, and restore with etcdctl/etcdutl snapshot restore into a new data directory, then point the etcd static pod manifest at it; also back up /etc/kubernetes/pki.",
      "What is the order of a kubeadm upgrade? — One minor version at a time: upgrade kubeadm on the first control-plane node, kubeadm upgrade plan and apply, drain it, upgrade kubelet and kubectl, restart kubelet, uncordon; then the other control-plane nodes with kubeadm upgrade node; then each worker the same way.",
      "A node is NotReady. Where do you look? — kubectl describe node for conditions and events, then on the node: systemctl status and journalctl for the kubelet, the container runtime status, the CNI pods on that node, disk and memory pressure, and certificate expiry."
    ],
    "cleanup": [
      "Keep the cluster for CKA practice, or tear it down: sudo kubeadm reset -f on both nodes, then remove /etc/cni/net.d and $HOME/.kube.",
      "Delete the etcd snapshots in /var/backups/etcd (they contain every cluster Secret).",
      "Or delete both VMs: VBoxManage unregistervm \"k8s-cp\" --delete and the same for k8s-w1."
    ],
    "links": [
      {
        "label": "Kubernetes docs: Creating a cluster with kubeadm",
        "url": "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/"
      },
      {
        "label": "Kubernetes docs: Upgrading kubeadm clusters",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/"
      },
      {
        "label": "Kubernetes docs: Operating etcd clusters for Kubernetes (backup and restore)",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/"
      },
      {
        "label": "Kubernetes docs: Safely drain a node",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/"
      }
    ]
  },
  {
    "id": "lab-postgres-dba",
    "title": "PostgreSQL administration: roles, access control, backups, point-in-time restore and tuning",
    "track": "Systems administration",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free (PostgreSQL 16 from the Ubuntu archive)",
    "summary": "Run PostgreSQL 16 like a DBA: design group and login roles with least privilege, restrict network access in pg_hba.conf, load a benchmark database, take logical backups with pg_dump and prove them with a timed restore, set up WAL archiving and a base backup, recover to the moment before an accidental DELETE, then find a slow query with EXPLAIN ANALYZE, fix it with an index and measure the difference.",
    "realWorld": "Database administrators are judged on two things: nobody can see data they should not, and data can always be recovered. Backups that have never been restored are only hopes, which is why DBAs schedule restore tests and practise point-in-time recovery for the 'someone ran DELETE without a WHERE' incident. Reading query plans and adding the right index is the everyday performance work that keeps applications fast.",
    "youWillNeed": [
      "ubuntu-srv01 (192.168.56.10) from lab-home-lab with at least 2 GB RAM and 5 GB free disk",
      "Optionally win-client01 or your host with psql or pgAdmin to test remote access"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "Allow database connections only from 127.0.0.1 and the host-only lab network, never 0.0.0.0/0. Backup files and the WAL archive contain all of the data and password hashes, so keep them readable only by the postgres user. Take a VM snapshot first.",
    "steps": [
      {
        "title": "Install PostgreSQL and find its files",
        "body": "Ubuntu's packaging supports several clusters side by side and wraps them with pg_lsclusters, pg_ctlcluster and a postgresql@16-main systemd unit. Configuration lives in /etc/postgresql/16/main and data in /var/lib/postgresql/16/main. The postgres operating-system user connects as the postgres superuser over the local socket with peer authentication.",
        "cmd": "sudo apt update && sudo apt install -y postgresql postgresql-contrib\npg_lsclusters\nsystemctl status postgresql@16-main --no-pager | head -4\nsudo -u postgres psql -c 'SELECT version();'\nsudo -u postgres psql -c 'SHOW data_directory;' -c 'SHOW config_file;' -c 'SHOW hba_file;'\ngrep -E '^include_dir' /etc/postgresql/16/main/postgresql.conf",
        "check": "pg_lsclusters shows 16 main online on port 5432 and the conf file includes the conf.d directory."
      },
      {
        "title": "Design roles with least privilege",
        "body": "Use group roles (NOLOGIN) to hold privileges and login roles that are members of them, so access is granted by membership, not table by table. The app_owner role owns the schema objects; app_rw can read and write; app_ro can only read. PostgreSQL 15 and later already stop ordinary users creating objects in the public schema. ALTER DEFAULT PRIVILEGES makes the grants apply to tables created later, which is the step most people forget.",
        "cmd": "sudo -u postgres psql <<'EOF'\nCREATE ROLE app_owner LOGIN;\nCREATE ROLE app_rw NOLOGIN;\nCREATE ROLE app_ro NOLOGIN;\nCREATE ROLE alice LOGIN IN ROLE app_rw;\nCREATE ROLE bob   LOGIN IN ROLE app_ro;\nCREATE DATABASE labdb OWNER app_owner;\nREVOKE ALL ON DATABASE labdb FROM PUBLIC;\nGRANT CONNECT ON DATABASE labdb TO app_rw, app_ro;\n\\c labdb\nGRANT USAGE ON SCHEMA public TO app_rw, app_ro;\nALTER DEFAULT PRIVILEGES FOR ROLE app_owner IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_rw;\nALTER DEFAULT PRIVILEGES FOR ROLE app_owner IN SCHEMA public GRANT SELECT ON TABLES TO app_ro;\nALTER DEFAULT PRIVILEGES FOR ROLE app_owner IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_rw;\nEOF\nsudo -u postgres psql -c '\\password app_owner'\nsudo -u postgres psql -c '\\password alice'\nsudo -u postgres psql -c '\\password bob'\nsudo -u postgres psql -c '\\du'",
        "check": "\\du lists app_owner, alice (member of app_rw) and bob (member of app_ro), and the passwords were set interactively so they never appear in shell history."
      },
      {
        "title": "Load benchmark data as the owner",
        "body": "pgbench ships with PostgreSQL. Initialising at scale 10 creates about a million rows in pgbench_accounts. Run it as app_owner over TCP so the tables are owned by app_owner and the default privileges apply. Put the passwords in ~/.pgpass (mode 600) so tools do not prompt.",
        "cmd": "printf 'localhost:5432:labdb:app_owner:YOUR_PASSWORD\\nlocalhost:5432:labdb:alice:YOUR_PASSWORD\\nlocalhost:5432:labdb:bob:YOUR_PASSWORD\\n' > ~/.pgpass && chmod 600 ~/.pgpass && nano ~/.pgpass\npgbench -h localhost -U app_owner -i -s 10 labdb\npsql -h localhost -U app_owner -d labdb -c '\\dt+'\npsql -h localhost -U app_owner -d labdb -c 'SELECT count(*) FROM pgbench_accounts;'",
        "check": "\\dt+ lists four pgbench tables owned by app_owner and pgbench_accounts has 1,000,000 rows."
      },
      {
        "title": "Test the privileges",
        "body": "Prove least privilege works: bob can read but not write, alice can write but cannot drop tables or create new ones, and neither can reach another database. A denied action is the result you want.",
        "cmd": "psql -h localhost -U bob -d labdb -c 'SELECT count(*) FROM pgbench_branches;'\npsql -h localhost -U bob -d labdb -c 'UPDATE pgbench_branches SET bbalance = 0;'\npsql -h localhost -U alice -d labdb -c 'UPDATE pgbench_branches SET bbalance = bbalance WHERE bid = 1;'\npsql -h localhost -U alice -d labdb -c 'DROP TABLE pgbench_history;'\npsql -h localhost -U alice -d labdb -c 'CREATE TABLE t(x int);'\nsudo -u postgres psql -c 'REVOKE CONNECT ON DATABASE postgres FROM PUBLIC;'\npsql -h localhost -U alice -d postgres -c 'SELECT 1;'",
        "check": "bob's SELECT works and his UPDATE fails with 'permission denied for table pgbench_branches'; alice's UPDATE works but DROP fails (must be owner of table) and CREATE fails (permission denied for schema public); after the REVOKE, alice cannot connect to the postgres database (permission denied for database \"postgres\"), because every role can connect to it by default until you remove that."
      },
      {
        "title": "Control network access with listen_addresses and pg_hba.conf",
        "body": "listen_addresses decides which interfaces PostgreSQL listens on; pg_hba.conf decides who may connect from where, to which database, and how they authenticate. Rules are read top to bottom and the first match wins. Use scram-sha-256, never trust or md5, for network connections. Put your settings in conf.d so package upgrades do not overwrite them.",
        "cmd": "echo \"listen_addresses = 'localhost,192.168.56.10'\" | sudo tee /etc/postgresql/16/main/conf.d/10-network.conf\nsudo sed -i '/^# lab rules/,$d' /etc/postgresql/16/main/pg_hba.conf\nprintf '# lab rules\\nhost  labdb  alice,bob,app_owner  192.168.56.0/24  scram-sha-256\\n' | sudo tee -a /etc/postgresql/16/main/pg_hba.conf\nsudo systemctl restart postgresql@16-main\nsudo -u postgres psql -c 'SELECT line_number, type, database, user_name, address, auth_method, error FROM pg_hba_file_rules;'\nsudo ss -ltnp | grep 5432\npsql -h 192.168.56.10 -U bob -d labdb -c 'SELECT current_user, inet_server_addr();'",
        "check": "pg_hba_file_rules shows your rule with no error, ss shows postgres on 127.0.0.1 and 192.168.56.10 port 5432, and bob connects over the lab address (from win-client01 too if you have psql there)."
      },
      {
        "title": "Take logical backups",
        "body": "pg_dump backs up one database in a consistent snapshot without blocking writers. The custom format (-Fc) is compressed and lets pg_restore pick objects and run in parallel. Roles and their passwords are cluster-wide, so they need pg_dumpall --globals-only as well; a database dump restored without its roles fails on every GRANT.",
        "cmd": "sudo install -d -o postgres -g postgres -m 700 /var/backups/pg\nsudo -u postgres pg_dump -Fc -d labdb -f /var/backups/pg/labdb-$(date +%F).dump\nsudo -u postgres pg_dumpall --globals-only -f /var/backups/pg/globals-$(date +%F).sql\nsudo ls -lh /var/backups/pg\nsudo -u postgres pg_restore -l /var/backups/pg/labdb-$(date +%F).dump | head -20",
        "check": "Both files exist, owned by postgres with no access for others, and pg_restore -l lists the four tables, their data and the GRANTs."
      },
      {
        "title": "Prove the backup with a timed restore test",
        "body": "Restore into a new database and compare it with the original: row counts and a checksum over the balances. Time it; that number is your real recovery time for this database, and it belongs in your backup documentation.",
        "cmd": "sudo -u postgres createdb -O app_owner labdb_restore\ntime sudo -u postgres pg_restore -d labdb_restore -j 2 /var/backups/pg/labdb-$(date +%F).dump\nfor db in labdb labdb_restore; do sudo -u postgres psql -d $db -Atc \"SELECT '$db', count(*), sum(abalance) FROM pgbench_accounts;\"; done\nsudo -u postgres psql -d labdb_restore -c '\\dp pgbench_accounts'\nsudo -u postgres dropdb labdb_restore",
        "check": "Both databases report the same count and sum, the restored table has the same access privileges, and you recorded the restore time."
      },
      {
        "title": "Turn on WAL archiving and take a base backup",
        "body": "Logical dumps restore to the moment of the dump. For point-in-time recovery you need a physical base backup plus every write-ahead log (WAL) segment since, which archive_command copies to a safe place as each segment fills. archive_timeout forces a segment switch at least every minute so a quiet database still archives. Then generate some activity with pgbench.",
        "cmd": "sudo install -d -o postgres -g postgres -m 700 /var/lib/postgresql/wal_archive\nsudo tee /etc/postgresql/16/main/conf.d/20-archive.conf > /dev/null <<'EOF'\narchive_mode = on\narchive_command = 'test ! -f /var/lib/postgresql/wal_archive/%f && cp %p /var/lib/postgresql/wal_archive/%f'\narchive_timeout = 60\nEOF\nsudo systemctl restart postgresql@16-main\nsudo -u postgres pg_basebackup -D /var/backups/pg/base-$(date +%F) -Ft -z -X stream -P -c fast\nsudo ls -lh /var/backups/pg/base-$(date +%F)\npgbench -h localhost -U app_owner -c 4 -j 2 -T 60 labdb | tail -3\nsudo -u postgres psql -c 'SELECT archived_count, last_archived_wal, failed_count FROM pg_stat_archiver;'",
        "check": "The base backup folder holds base.tar.gz and pg_wal.tar.gz, and pg_stat_archiver shows archived_count rising and failed_count 0."
      },
      {
        "title": "The accidental DELETE",
        "body": "Record the exact time, wait a few seconds, then make the classic mistake: a DELETE with no WHERE clause on pgbench_history as the app_owner. Force a WAL switch so the change is archived, and note the row count before and after.",
        "cmd": "psql -h localhost -U app_owner -d labdb -Atc 'SELECT count(*) FROM pgbench_history;'\nsudo -u postgres psql -Atc 'SELECT now();' | tee ~/before-delete.txt\nsleep 5\npsql -h localhost -U app_owner -d labdb -c 'DELETE FROM pgbench_history;'\nsudo -u postgres psql -c 'SELECT pg_switch_wal();'\nsleep 5; sudo -u postgres psql -Atc 'SELECT last_archived_wal FROM pg_stat_archiver;'",
        "check": "pgbench_history had thousands of rows (one per pgbench transaction) and now has 0, and before-delete.txt holds a timestamp with time zone."
      },
      {
        "title": "Recover to the moment before the DELETE",
        "body": "Never experiment on the damaged production cluster. Create a second cluster on port 5433, replace its data with the base backup, tell it where the archived WAL lives and to stop replaying just before your recorded time, and start it. recovery.signal puts it in recovery mode; 'promote' opens it for writes when the target is reached. Then copy the lost rows back into production (for example with pg_dump -t pgbench_history --data-only from the recovered cluster).",
        "cmd": "sudo pg_createcluster 16 pitr -p 5433\nPITR=/var/lib/postgresql/16/pitr; BASE=/var/backups/pg/base-$(date +%F)\nsudo -u postgres bash -c \"rm -rf $PITR/* && tar xzf $BASE/base.tar.gz -C $PITR && tar xzf $BASE/pg_wal.tar.gz -C $PITR/pg_wal\"\nsudo mkdir -p /etc/postgresql/16/pitr/conf.d\nsudo tee /etc/postgresql/16/pitr/conf.d/recovery.conf > /dev/null <<EOF\nrestore_command = 'cp /var/lib/postgresql/wal_archive/%f %p'\nrecovery_target_time = '$(cat ~/before-delete.txt)'\nrecovery_target_action = 'promote'\narchive_mode = off\nEOF\nsudo -u postgres touch $PITR/recovery.signal\nsudo pg_ctlcluster 16 pitr start\nsudo tail -20 /var/log/postgresql/postgresql-16-pitr.log\nsudo -u postgres psql -p 5433 -d labdb -Atc 'SELECT count(*) FROM pgbench_history;'\nsudo -u postgres pg_dump -p 5433 -d labdb -t pgbench_history --data-only | sudo -u postgres psql -d labdb -q\nsudo -u postgres psql -d labdb -Atc 'SELECT count(*) FROM pgbench_history;'",
        "check": "The pitr log shows 'recovery stopping before commit of transaction' and 'archive recovery complete', the recovered cluster has the original row count, and production labdb has its rows back."
      },
      {
        "title": "Find and fix a slow query",
        "body": "Log slow statements, run a query that filters on a column with no index, and read the plan: a Seq Scan reading every row. Add an index, run ANALYZE and compare. Then look at the basics of memory settings: shared_buffers (commonly around a quarter of RAM on a dedicated server), work_mem (per sort or hash, per connection, so raise it carefully) and effective_cache_size (a planner hint, not an allocation).",
        "cmd": "echo \"log_min_duration_statement = '200ms'\" | sudo tee /etc/postgresql/16/main/conf.d/30-logging.conf && sudo systemctl reload postgresql@16-main\npgbench -h localhost -U app_owner -c 4 -j 2 -T 60 labdb | tail -1\nQ='SELECT count(*), sum(delta) FROM pgbench_history WHERE aid = 4242;'\npsql -h localhost -U app_owner -d labdb -c \"EXPLAIN (ANALYZE, BUFFERS) $Q\"\npsql -h localhost -U app_owner -d labdb -c 'CREATE INDEX CONCURRENTLY idx_history_aid ON pgbench_history (aid);' -c 'ANALYZE pgbench_history;'\npsql -h localhost -U app_owner -d labdb -c \"EXPLAIN (ANALYZE, BUFFERS) $Q\"\nsudo -u postgres psql -c 'SHOW shared_buffers;' -c 'SHOW work_mem;' -c 'SHOW effective_cache_size;'\nsudo -u postgres psql -d labdb -c 'SELECT relname, n_live_tup, n_dead_tup, last_autovacuum FROM pg_stat_user_tables ORDER BY n_dead_tup DESC;'",
        "check": "The first plan shows a Seq Scan on pgbench_history and the second an Index Scan or Bitmap Index Scan on idx_history_aid, with execution time dropping by an order of magnitude or more."
      },
      {
        "title": "Monitor sessions and write the DBA runbook",
        "body": "pg_stat_activity is the first place to look when 'the database is slow': who is connected, what they are running, for how long, and what they are waiting on. Practise ending a stuck session. Then write the runbook: role model, pg_hba rules, backup schedule and retention, restore-test results and timings, the PITR procedure with commands, and the tuning change with before/after plans.",
        "cmd": "psql -h localhost -U bob -d labdb -c 'SELECT pg_sleep(600);' &\nsudo -u postgres psql -c \"SELECT pid, usename, state, now()-query_start AS runtime, wait_event_type, left(query,40) FROM pg_stat_activity WHERE datname='labdb';\"\nsudo -u postgres psql -c \"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE usename='bob' AND query LIKE '%pg_sleep%';\"\nsudo -u postgres psql -c \"SELECT datname, pg_size_pretty(pg_database_size(datname)) FROM pg_database;\"",
        "check": "The sleeping session appears in pg_stat_activity and ends with 'terminating connection due to administrator command' after pg_terminate_backend."
      }
    ],
    "verify": [
      "bob can only read, alice can read and write but not change the schema, and remote connections are limited to the lab subnet with scram-sha-256.",
      "A pg_dump restore into a second database matched the original's row count and balance sum, with the restore time recorded.",
      "Point-in-time recovery brought back every pgbench_history row deleted after the recorded timestamp.",
      "EXPLAIN ANALYZE shows the new index used and a much lower execution time."
    ],
    "deliverable": "A DBA runbook for labdb: the role and privilege model, pg_hba rules, backup and retention plan, restore-test evidence with timing, the PITR procedure with log excerpts, before/after query plans, and the monitoring queries you would use in an incident.",
    "resume": "Administered PostgreSQL 16: designed least-privilege group roles and scram-sha-256 network access rules, implemented pg_dump and WAL-archived base backups, verified them with timed restore tests and a point-in-time recovery after an accidental DELETE, and cut a query's run time with index tuning guided by EXPLAIN ANALYZE.",
    "interview": [
      "What is the difference between pg_dump and pg_basebackup? — pg_dump is a logical backup of one database (SQL objects and data) that restores to the moment of the dump and can move between versions; pg_basebackup copies the whole cluster's files and, with archived WAL, allows point-in-time recovery, but only to the same major version.",
      "Someone ran DELETE without WHERE an hour ago. How do you recover? — Restore the last base backup to a separate server or cluster, replay archived WAL with recovery_target_time set just before the DELETE, then copy the affected rows back into production; do not roll the whole production database back unless the business accepts losing every later change.",
      "A query is slow. What do you do first? — Get the real plan with EXPLAIN (ANALYZE, BUFFERS), look for sequential scans on large tables, bad row estimates and sorts spilling to disk, check statistics are current with ANALYZE, and add or change an index before touching server-wide settings."
    ],
    "cleanup": [
      "sudo pg_dropcluster 16 pitr --stop",
      "Remove /etc/postgresql/16/main/conf.d/20-archive.conf (or keep archiving and add archive cleanup), then sudo systemctl restart postgresql@16-main.",
      "sudo rm -r /var/lib/postgresql/wal_archive /var/backups/pg once you have your evidence; rm ~/.pgpass.",
      "Keep PostgreSQL for later labs, or sudo apt purge 'postgresql*' to remove it."
    ],
    "links": [
      {
        "label": "PostgreSQL 16 docs: Database roles and privileges",
        "url": "https://www.postgresql.org/docs/16/user-manag.html"
      },
      {
        "label": "PostgreSQL 16 docs: The pg_hba.conf file",
        "url": "https://www.postgresql.org/docs/16/auth-pg-hba-conf.html"
      },
      {
        "label": "PostgreSQL 16 docs: Continuous archiving and point-in-time recovery",
        "url": "https://www.postgresql.org/docs/16/continuous-archiving.html"
      },
      {
        "label": "PostgreSQL 16 docs: Using EXPLAIN",
        "url": "https://www.postgresql.org/docs/16/using-explain.html"
      }
    ]
  }
]);
