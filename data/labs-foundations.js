/* Foundations labs: home lab, Linux and Windows basics, hardening, hashing, PKI, honeypot, MFA.
   Format: see LABS_FORMAT.md. Lab IP plan used throughout (from lab-home-lab):
   host 192.168.56.1, ubuntu-srv01 192.168.56.10, win-client01 192.168.56.20. */
CertHub.registerLabs([
  {
    id: "lab-home-lab",
    title: "Build a home security lab with VirtualBox",
    track: "Foundations",
    level: "Beginner",
    minutes: 180,
    cost: "Free (VirtualBox, Ubuntu Server and Windows evaluation ISOs)",
    summary: "Build a small virtual lab: an Ubuntu Server 24.04 VM and a Windows evaluation VM on an isolated host-only network, with a NAT adapter for updates, a written IP plan, snapshots and a network diagram. Most other labs build on this one.",
    realWorld: "Security teams test patches, detections and hardening in a lab before touching production. Being able to stand up and document a segmented test environment is expected of junior sysadmins, SOC analysts and security engineers, and the diagram and IP plan are the same artifacts you would hand to a change board.",
    youWillNeed: [
      "A computer with a 64-bit CPU that supports virtualization (Intel VT-x or AMD-V), 16 GB RAM recommended (8 GB works if you run one VM at a time) and about 150 GB free SSD space",
      "Oracle VirtualBox 7.x (virtualbox.org) or VMware Workstation Pro (free for personal use; download from the Broadcom support portal)",
      "Ubuntu Server 24.04 LTS ISO (ubuntu.com/download/server)",
      "Windows 11 Enterprise evaluation (90 days) or Windows Server 2022 evaluation (180 days) ISO from the Microsoft Evaluation Center",
      "diagrams.net (draw.io) for the lab diagram"
    ],
    safety: "Keep lab VMs on the host-only network for anything that scans, captures or simulates attacks. The NAT adapter exists only for updates; disconnect it (VM Settings > Network > uncheck 'Cable Connected') during risky labs. Apple Silicon Macs can only run ARM64 guests, so download the ARM64 Ubuntu ISO and Windows 11 ARM builds, or use UTM.",
    steps: [
      {
        title: "Check that hardware virtualization is on",
        body: "Hypervisors need CPU virtualization extensions enabled in the BIOS/UEFI. On Windows open Task Manager > Performance > CPU and look for 'Virtualization: Enabled'. On a Linux host run the command below. If it is off, enable Intel VT-x / AMD-V (sometimes called SVM) in the firmware setup.",
        cmd: "grep -Ec '(vmx|svm)' /proc/cpuinfo",
        check: "Windows shows 'Virtualization: Enabled'; on Linux the count is greater than 0."
      },
      {
        title: "Write the lab plan before you click anything",
        body: "Decide names, addresses and sizes up front so every later lab uses the same plan. Use the table below: the host-only network is 192.168.56.0/24 (VirtualBox's default), static addresses sit below .100 so they never clash with VirtualBox's DHCP range, and the host-only adapter gets no gateway so lab traffic cannot route anywhere. Save this as lab-plan.md.",
        cmd: "# Name          Role              vCPU  RAM   Disk   NIC1  NIC2 (host-only)\n# ubuntu-srv01  Linux server      2     2 GB  25 GB  NAT   192.168.56.10/24\n# win-client01  Windows endpoint  2     4 GB  64 GB  NAT   192.168.56.20/24\n# (host)        Your PC           -     -     -      -     192.168.56.1/24\n# Windows Server 2022 instead of Windows 11: 2 vCPU, 4 GB RAM, 50 GB disk",
        check: "You have a written table with a hostname, role, IP, RAM and disk for every machine."
      },
      {
        title: "Install the hypervisor and verify your ISOs",
        body: "Install VirtualBox 7.x with default options (or VMware Workstation Pro). Download both ISOs, then compare each file's SHA-256 hash against the value published on the download page so you know the installer was not corrupted or tampered with. On a Windows host use PowerShell; on Linux or macOS use sha256sum / shasum -a 256.",
        cmd: "Get-FileHash .\\ubuntu-24.04*-live-server-amd64.iso -Algorithm SHA256\nsha256sum ubuntu-24.04*-live-server-amd64.iso",
        check: "The hash printed matches the one published on ubuntu.com (SHA256SUMS) character for character."
      },
      {
        title: "Create the host-only network",
        body: "In VirtualBox open File > Tools > Network Manager > Host-only Networks. Make sure one exists (named 'VirtualBox Host-Only Ethernet Adapter' on Windows or 'vboxnet0' on Linux/macOS) with IPv4 address 192.168.56.1 and mask 255.255.255.0. A host-only network lets VMs talk to each other and to your PC but not to the internet. For labs that must be fully cut off from your PC too, use an 'Internal Network' (e.g. named labnet) instead.",
        cmd: "VBoxManage list hostonlyifs",
        check: "The output shows an interface with IPAddress 192.168.56.1 and NetworkMask 255.255.255.0."
      },
      {
        title: "Create the Ubuntu Server VM",
        body: "Click New, name it ubuntu-srv01, choose the Ubuntu Server ISO, tick 'Skip Unattended Installation', and give it 2 vCPU, 2048 MB RAM and a 25 GB dynamically allocated disk. In Settings > Network set Adapter 1 to NAT (internet for updates) and enable Adapter 2 as Host-only Adapter on the network from the previous step.",
        check: "Settings > Network shows Adapter 1 = NAT and Adapter 2 = Host-only Adapter."
      },
      {
        title: "Install Ubuntu Server 24.04",
        body: "Boot the VM and follow the installer. On the network screen the NAT NIC (usually enp0s3) gets DHCP; select the second NIC (usually enp0s8) > Edit IPv4 > Manual, subnet 192.168.56.0/24, address 192.168.56.10, and leave gateway and name servers empty. Keep the default LVM storage layout, set hostname ubuntu-srv01, create your admin user, and tick 'Install OpenSSH server'. Skip the optional snaps.",
        check: "The installer finishes, you reboot, and you can log in at the console."
      },
      {
        title: "Check networking and patch the server",
        body: "Confirm both NICs have the right addresses and that only the NAT NIC has a default route. Then install updates. The last two commands check whether the installer left free space in the LVM volume group (it often uses only part of the disk) and grow the root volume if so. If vgs shows VFree as 0, skip the lvextend line.",
        cmd: "ip -br a\nip route\nping -c 3 ubuntu.com\nsudo apt update && sudo apt full-upgrade -y\nsudo vgs\nsudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv",
        check: "enp0s8 shows 192.168.56.10/24, 'default via 10.0.2.2' is the only default route, ping gets replies, and df -h / shows most of the 25 GB."
      },
      {
        title: "Fix the host-only IP with netplan (only if needed)",
        body: "If enp0s8 has no address, set it with a small netplan file. Check your interface name with ip -br a first and replace enp0s8 if yours differs. Netplan files must not be world-readable, so set mode 600.",
        cmd: "sudo tee /etc/netplan/60-lab.yaml > /dev/null <<'EOF'\nnetwork:\n  version: 2\n  ethernets:\n    enp0s8:\n      dhcp4: false\n      addresses: [192.168.56.10/24]\nEOF\nsudo chmod 600 /etc/netplan/60-lab.yaml\nsudo netplan try\nsudo netplan apply",
        check: "ip -br a shows enp0s8 UP with 192.168.56.10/24."
      },
      {
        title: "Create and install the Windows VM",
        body: "Create win-client01 with 2 vCPU, 4096 MB RAM and a 64 GB disk, tick 'Skip Unattended Installation', and use the same two adapters (NAT + Host-only). When you pick a Windows 11 type, VirtualBox 7 adds the TPM 2.0 and Secure Boot that Windows 11 requires. During Windows 11 Enterprise setup, choose 'Sign-in options' > 'Domain join instead' to create a local account. Windows Server 2022 needs neither step.",
        check: "Windows boots to the desktop and you are signed in with a local administrator account."
      },
      {
        title: "Give Windows its lab IP and name",
        body: "Open PowerShell as Administrator. Find the second adapter (the one with no internet, often 'Ethernet 2'), give it a static IP with no gateway, allow ping so you can test connectivity, and rename the computer to match your plan.",
        cmd: "Get-NetAdapter\nNew-NetIPAddress -InterfaceAlias \"Ethernet 2\" -IPAddress 192.168.56.20 -PrefixLength 24\nEnable-NetFirewallRule -DisplayName \"File and Printer Sharing (Echo Request - ICMPv4-In)\"\nRename-Computer -NewName win-client01 -Restart",
        check: "After the restart, ipconfig shows 192.168.56.20 on the second adapter and the hostname is win-client01."
      },
      {
        title: "Test the lab network end to end",
        body: "Prove that every machine can reach the others on the lab network. SSH from your host to the Ubuntu server is how you will work in most later labs, so make sure it works now.",
        cmd: "# On ubuntu-srv01\nping -c 3 192.168.56.20\n# On your host\nping 192.168.56.10\nssh youruser@192.168.56.10",
        check: "Pings succeed in both directions and you get an SSH shell on ubuntu-srv01 from your host."
      },
      {
        title: "Take clean snapshots",
        body: "A snapshot saves the VM's disk and settings so you can roll back after a lab breaks something. Shut both VMs down and take a named snapshot of each. Use a numbered naming scheme so you know the order later.",
        cmd: "VBoxManage snapshot \"ubuntu-srv01\" take \"01-clean-install\" --description \"Patched Ubuntu 24.04, static 192.168.56.10\"\nVBoxManage snapshot \"win-client01\" take \"01-clean-install\" --description \"Fresh Windows eval, static 192.168.56.20\"\nVBoxManage snapshot \"ubuntu-srv01\" list",
        check: "The snapshot list shows 01-clean-install for each VM (also visible in the VM's Snapshots view)."
      },
      {
        title: "Draw the lab diagram",
        body: "In diagrams.net draw your host, the two VMs, the NAT path to the internet and the host-only 192.168.56.0/24 segment. Label every box with hostname, OS and IP, and mark which link carries lab traffic versus update traffic. Export it as PNG and keep the .drawio source so you can add machines later.",
        check: "The diagram shows every IP from your plan and makes clear the host-only network has no route to the internet."
      }
    ],
    verify: [
      "ubuntu-srv01 has 192.168.56.10 on the host-only NIC and its only default route goes through the NAT NIC.",
      "win-client01 and ubuntu-srv01 can ping each other on 192.168.56.0/24.",
      "You can SSH from your host to 192.168.56.10.",
      "Each VM has a 01-clean-install snapshot you can restore.",
      "Your lab-plan.md table matches what ip -br a and ipconfig actually show."
    ],
    deliverable: "A 'Home Lab' page in your portfolio (GitHub README works well) with the diagram PNG, the IP/naming/sizing table, the hypervisor and OS versions, a screenshot of both VMs' snapshot lists, and a short paragraph on why lab traffic is isolated on host-only and why updates go through NAT.",
    resume: "Built a segmented virtual security lab (VirtualBox, Ubuntu Server 24.04, Windows 11) with an isolated host-only network, documented IP plan and snapshot-based rollback, used as the test bed for 8+ hardening and detection projects.",
    interview: [
      "What is the difference between NAT, bridged and host-only networking in a hypervisor? — NAT hides the VM behind the host for outbound access, bridged puts the VM directly on the physical LAN, and host-only creates a private network between the host and VMs with no outside route.",
      "Why take snapshots before a change? — They give a fast, known-good rollback point, the same idea as a backout plan in change management.",
      "Why no default gateway on the lab NIC? — Without a gateway, traffic on the lab segment cannot be routed off it, which keeps test attacks and captures contained."
    ],
    cleanup: [
      "Nothing to remove: keep both VMs and the 01-clean-install snapshots for the next labs.",
      "Windows evaluations expire (90 days for Windows 11 Enterprise, 180 for Server 2022); note the expiry date in lab-plan.md and rebuild from the ISO when it arrives."
    ],
    links: [
      { label: "Oracle VirtualBox User Manual", url: "https://www.virtualbox.org/manual/" },
      { label: "Microsoft Evaluation Center", url: "https://www.microsoft.com/en-us/evalcenter" },
      { label: "Ubuntu Server documentation", url: "https://documentation.ubuntu.com/server/" }
    ]
  },

  {
    id: "lab-linux-cli",
    title: "Linux command line for security work",
    track: "Foundations",
    level: "Beginner",
    minutes: 90,
    cost: "Free",
    summary: "Use the Linux commands a security analyst reaches for every day: manage users and groups, set permission bits, use sudo safely, find risky files, triage SSH logs with grep and awk, list listening ports and apply updates.",
    realWorld: "When an alert fires on a Linux server, the first responder SSHes in and checks who logged in, from where, what is listening and what changed. Access reviews, SUID audits and patch checks are routine tickets for junior sysadmins and SOC analysts.",
    youWillNeed: [
      "ubuntu-srv01 (192.168.56.10) from lab-home-lab",
      "An SSH client on your host (built into Windows 11, macOS and Linux)"
    ],
    requires: ["lab-home-lab"],
    safety: "Generate failed logins only against your own lab VM.",
    steps: [
      {
        title: "Get your bearings",
        body: "Snapshot the VM first, then SSH in and confirm who you are, which groups you belong to and what system you are on. id shows your UID, GID and supplementary groups, which decide what you can access.",
        cmd: "whoami\nid\nhostnamectl\ncat /etc/os-release\nuname -r",
        check: "id lists groups such as adm and sudo; os-release shows Ubuntu 24.04."
      },
      {
        title: "Create a user and a team group",
        body: "Create an analyst account and a secops group, then add the user to the group. The -a in usermod -aG means append; without it the user is removed from every other supplementary group, which is a common and painful mistake.",
        cmd: "sudo adduser analyst1\nsudo groupadd secops\nsudo usermod -aG secops analyst1\ngetent group secops\nid analyst1",
        check: "getent shows secops:x:<gid>:analyst1 and id analyst1 lists secops."
      },
      {
        title: "Build a shared folder with the right permission bits",
        body: "Create a case folder only the secops group can use. Mode 2770 means owner rwx, group rwx, others nothing, and the leading 2 sets the setgid bit so new files inherit the secops group. Read the ls -ld output left to right: type, owner bits, group bits, other bits.",
        cmd: "sudo mkdir -p /srv/secops\nsudo chown root:secops /srv/secops\nsudo chmod 2770 /srv/secops\nls -ld /srv/secops",
        check: "ls -ld shows drwxrws--- root secops /srv/secops (the s is the setgid bit)."
      },
      {
        title: "Test access as each user",
        body: "Prove the permissions work. analyst1 can create files and they are group-owned by secops; your own account, which is not in secops, is refused. Then lock one file down to owner read/write, group read (640).",
        cmd: "sudo -u analyst1 touch /srv/secops/case-001.txt\nls /srv/secops\nsudo chmod 640 /srv/secops/case-001.txt\nsudo stat -c '%A %a %U:%G %n' /srv/secops/case-001.txt",
        check: "ls /srv/secops as your user fails with 'Permission denied'; stat shows -rw-r----- 640 analyst1:secops."
      },
      {
        title: "Grant least-privilege sudo",
        body: "Instead of full sudo, let secops read logs only. Always edit sudoers with visudo, which checks syntax before saving; a broken sudoers file can lock you out of root. Put the rule below into the file, save, then confirm what analyst1 may run.",
        cmd: "sudo visudo -f /etc/sudoers.d/secops\n# add this single line, then save:\n# %secops ALL=(root) /usr/bin/journalctl, /usr/bin/tail /var/log/auth.log\nsudo -l -U analyst1",
        check: "sudo -l -U analyst1 lists only /usr/bin/journalctl and /usr/bin/tail /var/log/auth.log."
      },
      {
        title: "Hunt for risky files with find",
        body: "Attackers abuse SUID binaries (which run as their owner, often root) and world-writable files. Build a baseline list of SUID files so you can spot new ones later, then look for world-writable files and anything in /etc changed in the last hour. -xdev keeps find on the root filesystem.",
        cmd: "sudo find / -xdev -type f -perm -4000 2>/dev/null | sort > ~/suid-baseline.txt\ncat ~/suid-baseline.txt\nsudo find / -xdev -type f -perm -0002 2>/dev/null\nsudo find /etc -type f -mmin -60",
        check: "suid-baseline.txt lists expected binaries such as /usr/bin/passwd and /usr/bin/sudo; /etc/sudoers.d/secops appears in the recent-changes list."
      },
      {
        title: "Generate some authentication events",
        body: "From your host, try to log in a few times with a user that does not exist and a few times with analyst1 and a wrong password. These create the log lines you will triage next.",
        cmd: "ssh nosuchuser@192.168.56.10\nssh analyst1@192.168.56.10",
        check: "Each attempt ends with 'Permission denied' after the wrong password."
      },
      {
        title: "Read /var/log/auth.log",
        body: "Ubuntu writes SSH, sudo and login events to /var/log/auth.log. Members of the adm group (your install user) can read it. Look for failed passwords, invalid users and sudo commands.",
        cmd: "sudo tail -n 30 /var/log/auth.log\nsudo grep -E 'Failed password|Invalid user' /var/log/auth.log\nsudo grep 'COMMAND=' /var/log/auth.log | tail -n 5",
        check: "You see lines like 'Failed password for invalid user nosuchuser from 192.168.56.1 port ... ssh2'."
      },
      {
        title: "Triage with grep, awk, sort and uniq",
        body: "Turn raw lines into answers: which IPs failed most, and which usernames were tried. In a 'Failed password' line the IP is always the fourth field from the end, so awk's $(NF-3) grabs it; the username is the word right before 'from'. Save the pipeline as a script you can reuse.",
        cmd: "sudo grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn\nsudo grep 'Failed password' /var/log/auth.log | awk '{for(i=1;i<=NF;i++) if($i==\"from\") print $(i-1)}' | sort | uniq -c | sort -rn",
        check: "The first command shows a count next to 192.168.56.1; the second shows counts for nosuchuser and analyst1."
      },
      {
        title: "Query the systemd journal",
        body: "journalctl reads the same events from the systemd journal with better filtering. The SSH service unit on Ubuntu is called ssh. Filter by unit, time, priority and by the program name.",
        cmd: "sudo journalctl -u ssh --since \"1 hour ago\" --no-pager\nsudo journalctl -p warning -b --no-pager | tail -n 20\nsudo journalctl _COMM=sudo -n 10 --no-pager",
        check: "The ssh output shows your failed attempts with timestamps; the sudo output shows the commands you ran."
      },
      {
        title: "List listening ports with ss",
        body: "ss -tulpn shows TCP and UDP sockets that are listening, the address they are bound to and the owning process. 0.0.0.0 or [::] means reachable from every interface; 127.0.0.x means local only. Every listener should have a reason to exist.",
        cmd: "sudo ss -tulpn\nsudo ss -tnp state established",
        check: "You can see sshd on port 22 bound to 0.0.0.0 and systemd-resolved on 127.0.0.53:53, plus your own SSH session under established."
      },
      {
        title: "Check and apply package updates",
        body: "Refresh the package lists, see what is pending, upgrade, and check whether a reboot is required (usually after kernel or libc updates). apt keeps a history log you can use as evidence of patching.",
        cmd: "sudo apt update\napt list --upgradable\nsudo apt upgrade -y\ncat /var/run/reboot-required 2>/dev/null || echo 'No reboot needed'\ngrep -A4 'Start-Date' /var/log/apt/history.log | tail -n 10",
        check: "apt list --upgradable is empty after the upgrade and history.log shows today's Start-Date entry."
      }
    ],
    verify: [
      "ls -ld /srv/secops shows drwxrws--- root secops.",
      "sudo -l -U analyst1 shows only the two allowed log commands.",
      "Your awk pipeline prints failed-login counts per IP and per username.",
      "You can explain every listening port in sudo ss -tulpn.",
      "apt list --upgradable returns no packages."
    ],
    deliverable: "A 'Linux triage cheat sheet' in your portfolio: each command you used, one line on when an analyst uses it, and a screenshot of your failed-login summary by IP and username. Include the reusable triage pipeline as a small script in your repo.",
    resume: "Performed Linux access and log triage on Ubuntu 24.04: configured group-based permissions and least-privilege sudo, baselined SUID binaries, and summarized SSH brute-force attempts by source IP and username with grep/awk.",
    interview: [
      "What does chmod 2770 do on a directory? — Owner and group get full access, others get none, and setgid makes new files inherit the directory's group.",
      "Where do you look for failed SSH logins on Ubuntu? — /var/log/auth.log or journalctl -u ssh, filtering for 'Failed password' and 'Invalid user'.",
      "Why audit SUID binaries? — They run with the owner's privileges, usually root, so an unexpected or vulnerable SUID file is a privilege-escalation path."
    ],
    cleanup: [
      "Keep analyst1 and secops if you like; otherwise run sudo deluser --remove-home analyst1, sudo groupdel secops and sudo rm /etc/sudoers.d/secops.",
      "Or revert ubuntu-srv01 to its 01-clean-install snapshot."
    ],
    links: [
      { label: "Ubuntu Server documentation", url: "https://documentation.ubuntu.com/server/" },
      { label: "Ubuntu manual pages", url: "https://manpages.ubuntu.com/" }
    ]
  },

  {
    id: "lab-linux-hardening",
    title: "Harden an Ubuntu 24.04 server",
    track: "Foundations",
    level: "Intermediate",
    minutes: 150,
    cost: "Free",
    summary: "Take a default Ubuntu 24.04 server to a hardened baseline: automatic security updates, a named admin account, key-only SSH with root login off, a default-deny firewall, fail2ban and fewer services, measured before and after with Lynis.",
    realWorld: "Every new server a company deploys goes through a build standard like this one, usually checked against a CIS Benchmark. Hardening tickets, audit evidence and 'why did the score change' write-ups are daily work for sysadmins, security engineers and compliance analysts.",
    youWillNeed: [
      "ubuntu-srv01 (192.168.56.10) from lab-home-lab",
      "win-client01 (192.168.56.20) to play the untrusted client",
      "An SSH client on your host"
    ],
    requires: ["lab-home-lab", "lab-linux-cli"],
    safety: "Keep one working SSH session (or the VirtualBox console) open while changing SSH or firewall settings so a mistake cannot lock you out. Run brute-force tests only from your own lab VM.",
    steps: [
      {
        title: "Snapshot and record the 'before' state",
        body: "Take a snapshot, install Lynis and run a baseline audit. The hardening index (0-100) is Lynis's rough score. Save the report and the listening ports so you can prove what changed.",
        cmd: "sudo apt update && sudo apt install -y lynis\nsudo lynis audit system | tee ~/lynis-before.txt\nsudo grep hardening_index /var/log/lynis-report.dat\nsudo cp /var/log/lynis-report.dat ~/lynis-report-before.dat\nsudo ss -tulpn > ~/ports-before.txt",
        check: "You get a line like hardening_index=6x and the two 'before' files exist in your home folder."
      },
      {
        title: "Patch and turn on automatic security updates",
        body: "Unpatched software is the most common way in. Apply all updates, then make sure unattended-upgrades installs security updates daily. The dry run shows what it would do without changing anything.",
        cmd: "sudo apt full-upgrade -y\nsudo apt install -y unattended-upgrades\nsudo dpkg-reconfigure -plow unattended-upgrades\ncat /etc/apt/apt.conf.d/20auto-upgrades\nsudo unattended-upgrade --dry-run --debug | tail -n 20",
        check: "20auto-upgrades contains APT::Periodic::Update-Package-Lists \"1\"; and APT::Periodic::Unattended-Upgrade \"1\";."
      },
      {
        title: "Create a named admin account",
        body: "Admins should log in as themselves, not as root or a shared account, so every action is attributable. Create labadmin, add it to the sudo group, and test it.",
        cmd: "sudo adduser labadmin\nsudo usermod -aG sudo labadmin\nsu - labadmin\nsudo whoami\nexit",
        check: "sudo whoami run as labadmin prints root."
      },
      {
        title: "Set up SSH key authentication",
        body: "On your host, create an Ed25519 key pair and copy the public key to labadmin. The private key never leaves your host. Windows hosts do not have ssh-copy-id, so use the PowerShell line instead.",
        cmd: "ssh-keygen -t ed25519 -C \"labadmin@home-lab\"\nssh-copy-id labadmin@192.168.56.10\n# Windows host (PowerShell):\ntype $env:USERPROFILE\\.ssh\\id_ed25519.pub | ssh labadmin@192.168.56.10 \"mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys\"\nssh labadmin@192.168.56.10",
        check: "The last command logs you in using the key (you are asked for the key passphrase, not the account password)."
      },
      {
        title: "Lock down the SSH server",
        body: "Put your settings in a drop-in file. sshd uses the first value it reads for most options and loads /etc/ssh/sshd_config.d/*.conf in name order, so a file named 01-... wins over 50-cloud-init.conf, which on some installs sets PasswordAuthentication yes. This turns off root login and passwords and allows only labadmin.",
        cmd: "ls /etc/ssh/sshd_config.d/\nsudo tee /etc/ssh/sshd_config.d/01-hardening.conf > /dev/null <<'EOF'\nPermitRootLogin no\nPasswordAuthentication no\nKbdInteractiveAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\nLoginGraceTime 30\nX11Forwarding no\nAllowUsers labadmin\nEOF",
        check: "The file exists and ls shows it sorts before any 50-cloud-init.conf."
      },
      {
        title: "Validate, restart and test SSH",
        body: "Always syntax-check before restarting. sshd -T prints the settings sshd will actually use, which is the proof an auditor wants. Then, from a second terminal, prove a password-only login is refused while your key still works.",
        cmd: "sudo sshd -t && sudo systemctl restart ssh\nsudo sshd -T | grep -Ei '^(permitrootlogin|passwordauthentication|kbdinteractiveauthentication|maxauthtries|allowusers)'\n# From your host, in a new terminal:\nssh -o PubkeyAuthentication=no labadmin@192.168.56.10\nssh labadmin@192.168.56.10",
        check: "sshd -T shows permitrootlogin no and passwordauthentication no; the password-only attempt fails with 'Permission denied (publickey)' and the key login works."
      },
      {
        title: "Enable a default-deny firewall",
        body: "ufw is Ubuntu's front end to the kernel firewall. Deny all inbound traffic by default, allow outbound, and open only SSH. Add the SSH rule before enabling or you will cut off your own session.",
        cmd: "sudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow OpenSSH\nsudo ufw logging on\nsudo ufw enable\nsudo ufw status verbose",
        check: "Status: active, Default: deny (incoming), allow (outgoing), and 22/tcp (OpenSSH) ALLOW IN Anywhere."
      },
      {
        title: "Install and configure fail2ban for sshd",
        body: "fail2ban watches for repeated login failures and temporarily blocks the source IP. Put your settings in jail.local (never edit jail.conf, which package updates overwrite). ignoreip keeps your own host from being banned. python3-systemd lets fail2ban read the journal.",
        cmd: "sudo apt install -y fail2ban python3-systemd\nsudo tee /etc/fail2ban/jail.local > /dev/null <<'EOF'\n[DEFAULT]\nignoreip = 127.0.0.1/8 ::1 192.168.56.1\nbantime = 1h\nfindtime = 10m\nmaxretry = 3\n\n[sshd]\nenabled = true\nbackend = systemd\nEOF\nsudo systemctl enable --now fail2ban\nsudo systemctl restart fail2ban\nsudo fail2ban-client status sshd",
        check: "fail2ban-client shows the sshd jail with 'Currently banned: 0'."
      },
      {
        title: "Test fail2ban from the Windows VM",
        body: "From win-client01 (not your host, which is on the ignore list) try to log in as a user that does not exist four or five times. sshd logs 'Invalid user' each time and fail2ban bans the IP after three. Then unban it.",
        cmd: "# On win-client01 (PowerShell), repeat 4-5 times:\nssh fakeuser@192.168.56.10\n# On ubuntu-srv01:\nsudo fail2ban-client status sshd\nsudo fail2ban-client set sshd unbanip 192.168.56.20",
        check: "The status shows 192.168.56.20 under 'Banned IP list' and further connections from Windows time out until you unban it."
      },
      {
        title: "Remove or disable services you do not need",
        body: "Every running service is attack surface. List running services and listening ports, and for each one write keep or remove with a reason. Only disable something you understand. For example, if ModemManager is present it only supports cellular modems and is not needed in a VM.",
        cmd: "systemctl list-units --type=service --state=running\nsudo ss -tulpn\n# only if ModemManager is installed and you do not need it:\nsystemctl status ModemManager --no-pager\nsudo systemctl disable --now ModemManager\nsudo apt autoremove --purge -y",
        check: "Your keep/remove table covers every running service, and ss -tulpn shows nothing listening that you cannot justify."
      },
      {
        title: "Act on Lynis suggestions",
        body: "Lynis lists warnings and suggestions with test IDs. Pick at least three, apply them or write down why you are accepting the risk. Common quick wins are extra SSH restrictions and the libpam-tmpdir and apt-show-versions packages. Re-validate SSH after any change.",
        cmd: "sudo grep -E '^(warning|suggestion)\\[\\]' /var/log/lynis-report.dat\nsudo apt install -y libpam-tmpdir apt-show-versions\nprintf 'AllowTcpForwarding no\\nAllowAgentForwarding no\\nClientAliveCountMax 2\\n' | sudo tee -a /etc/ssh/sshd_config.d/01-hardening.conf\nsudo sshd -t && sudo systemctl restart ssh",
        check: "sshd -t prints nothing (no errors) and you can still log in with your key."
      },
      {
        title: "Re-run Lynis and compare",
        body: "Run the audit again and compare the hardening index and the number of warnings and suggestions. Save the after-files next to the before-files and take a new snapshot of the hardened VM.",
        cmd: "sudo lynis audit system | tee ~/lynis-after.txt\nsudo grep hardening_index ~/lynis-report-before.dat /var/log/lynis-report.dat\nsudo ss -tulpn > ~/ports-after.txt\ndiff ~/ports-before.txt ~/ports-after.txt",
        check: "The hardening index is higher than your baseline (expect a gain of several points; the exact number varies)."
      }
    ],
    verify: [
      "sudo sshd -T shows permitrootlogin no, passwordauthentication no and allowusers labadmin.",
      "A password-only SSH attempt is refused and key-based login as labadmin works.",
      "sudo ufw status verbose shows default deny incoming with only SSH allowed.",
      "fail2ban banned 192.168.56.20 after repeated failures and you unbanned it.",
      "The Lynis hardening index went up and you can explain which changes caused it."
    ],
    deliverable: "A hardening report: a before/after table (hardening index, warnings, suggestions, listening ports), every change with the exact config line and the risk it addresses, sshd -T and ufw status output as evidence, the fail2ban ban screenshot, and a list of Lynis suggestions you did not apply with your reasoning. Publish your 01-hardening.conf and jail.local in the repo.",
    resume: "Hardened an Ubuntu 24.04 server to a documented baseline (key-only SSH, default-deny ufw, fail2ban, unattended security updates, reduced services), raising its Lynis hardening index from [before] to [after].",
    interview: [
      "How would you secure SSH on a new Linux server? — Key-based auth only, root login disabled, AllowUsers or AllowGroups, a firewall rule limiting who can reach port 22, and fail2ban or similar for repeated failures.",
      "Why use a drop-in file in sshd_config.d instead of editing sshd_config? — It keeps your changes separate from the vendor file so upgrades do not overwrite them, and file order controls precedence.",
      "What does fail2ban do and what are its limits? — It bans IPs after repeated failures in the logs; it slows brute force but does nothing against a correct stolen key or a distributed attack from many IPs."
    ],
    cleanup: [
      "Keep this hardened VM and take a snapshot named 02-hardened; later labs assume labadmin, key-only SSH, ufw and fail2ban are in place."
    ],
    links: [
      { label: "Ubuntu Server docs: OpenSSH server", url: "https://documentation.ubuntu.com/server/how-to/security/openssh-server/" },
      { label: "CIS Benchmarks: Ubuntu Linux", url: "https://www.cisecurity.org/benchmark/ubuntu_linux" },
      { label: "Lynis (CISOfy)", url: "https://cisofy.com/lynis/" }
    ]
  },

  {
    id: "lab-windows-hardening",
    title: "Apply a Windows security baseline and audit logons",
    track: "Foundations",
    level: "Beginner",
    minutes: 120,
    cost: "Free (Windows evaluation)",
    summary: "Set password and lockout policy, confirm Microsoft Defender and the firewall with PowerShell, turn on logon auditing with auditpol, find Event IDs 4624, 4625 and 4720 in Event Viewer and with Get-WinEvent, remove SMBv1, and compare your settings to a published baseline.",
    realWorld: "Windows endpoints and servers are the bulk of most enterprise fleets. Help desk, sysadmin and SOC roles all touch account policy, Defender status and Security log events; 4625 failed logons and 4720 account creations are among the first things a SOC alerts on.",
    youWillNeed: [
      "win-client01 (192.168.56.20) from lab-home-lab: Windows 11 Enterprise or Windows Server 2022 evaluation",
      "PowerShell run as Administrator"
    ],
    requires: ["lab-home-lab"],
    steps: [
      {
        title: "Snapshot and export the 'before' settings",
        body: "Take a snapshot, then open PowerShell as Administrator. Export the current local security policy, audit policy and account policy so you can prove what changed.",
        cmd: "New-Item -ItemType Directory -Path C:\\Lab -Force\nsecedit /export /cfg C:\\Lab\\secpol-before.inf\nauditpol /backup /file:C:\\Lab\\audit-before.csv\nnet accounts | Out-File C:\\Lab\\net-accounts-before.txt",
        check: "C:\\Lab contains secpol-before.inf, audit-before.csv and net-accounts-before.txt."
      },
      {
        title: "Set password and lockout policy",
        body: "Open secpol.msc > Account Policies. Under Password Policy set Minimum password length to 14 and make sure 'Password must meet complexity requirements' is Enabled. Under Account Lockout Policy set the threshold to 5 invalid attempts, and the duration and reset counter to 15 minutes. The net accounts line sets the same numbers from the command line.",
        cmd: "net accounts /minpwlen:14 /lockoutthreshold:5 /lockoutduration:15 /lockoutwindow:15\nnet accounts",
        check: "net accounts shows Minimum password length 14, Lockout threshold 5, Lockout duration 15 and Lockout observation window 15."
      },
      {
        title: "Check Microsoft Defender Antivirus",
        body: "Confirm real-time protection is on and signatures are current. In the real world this is the first check when an endpoint looks unhealthy in a console.",
        cmd: "Update-MpSignature\nGet-MpComputerStatus | Select-Object AMServiceEnabled, AntivirusEnabled, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated",
        check: "AMServiceEnabled, AntivirusEnabled and RealTimeProtectionEnabled are True and the signature date is today."
      },
      {
        title: "Check the firewall and log dropped packets",
        body: "Confirm all three profiles (Domain, Private, Public) are on and block inbound by default, then turn on logging of dropped packets so blocked traffic leaves evidence.",
        cmd: "Get-NetFirewallProfile | Format-Table Name, Enabled, DefaultInboundAction, DefaultOutboundAction\nSet-NetFirewallProfile -All -LogBlocked True -LogMaxSizeKilobytes 16384\nGet-NetFirewallProfile | Format-Table Name, LogBlocked, LogFileName",
        check: "Every profile shows Enabled True, LogBlocked True, and a log path ending in pfirewall.log."
      },
      {
        title: "Turn on logon and account auditing",
        body: "Advanced audit policy decides which events land in the Security log. Enable success and failure for Logon, failure for Account Lockout, and success and failure for User Account Management so you capture 4624, 4625, 4740 and 4720.",
        cmd: "auditpol /set /subcategory:\"Logon\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Account Lockout\" /failure:enable\nauditpol /set /subcategory:\"User Account Management\" /success:enable /failure:enable\nauditpol /get /subcategory:\"Logon,Account Lockout,User Account Management\"",
        check: "Logon shows 'Success and Failure', Account Lockout shows at least 'Failure', and User Account Management shows 'Success and Failure'."
      },
      {
        title: "Create a test account (Event 4720)",
        body: "Creating a local user writes Event ID 4720, 'A user account was created'. Attackers create accounts for persistence, so SOCs watch this event closely.",
        cmd: "New-LocalUser -Name \"labtest\" -Password (Read-Host -AsSecureString \"Password for labtest\") -Description \"Audit test account\"",
        check: "Get-LocalUser labtest shows the account as Enabled."
      },
      {
        title: "Generate failed and successful logons (4625, 4624)",
        body: "runas asks for the account password. Run it twice with a wrong password (each makes a 4625), then once with the right password (a 4624, and a command window opens as labtest). Close that window afterwards.",
        cmd: "runas /user:labtest cmd",
        check: "The wrong attempts print 'The user name or password is incorrect'; the correct one opens a new cmd window titled 'running as ...\\labtest'."
      },
      {
        title: "Find the events in Event Viewer",
        body: "Open eventvwr.msc > Windows Logs > Security > Filter Current Log, and type 4624,4625,4720 in the Event IDs box. Open a 4625 and read Account For Which Logon Failed, Logon Type, Status/Sub Status and Source Network Address.",
        check: "You find your 4720 for labtest, your 4625 failures and a 4624 for labtest."
      },
      {
        title: "Query the same events with Get-WinEvent",
        body: "At scale you query logs rather than click through them. This pulls failed logons and turns the event's XML fields into columns. Sub Status 0xC000006A means wrong password and 0xC0000064 means the user does not exist, which tells you whether an attacker guessed a real username.",
        cmd: "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 20 | ForEach-Object { $d = @{}; ([xml]$_.ToXml()).Event.EventData.Data | ForEach-Object { $d[$_.Name] = $_.'#text' }; [pscustomobject]@{ Time = $_.TimeCreated; User = $d.TargetUserName; LogonType = $d.LogonType; SubStatus = $d.SubStatus; SourceIP = $d.IpAddress } } | Format-Table -AutoSize\nGet-WinEvent -FilterHashtable @{LogName='Security'; Id=4720} -MaxEvents 5 | Format-List TimeCreated, Id, Message\nGet-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4720} -MaxEvents 50 | Select-Object TimeCreated, Id, ProviderName | Export-Csv C:\\Lab\\logon-events.csv -NoTypeInformation",
        check: "The table shows User labtest with SubStatus 0xc000006a, and logon-events.csv exists."
      },
      {
        title: "Test the lockout policy (Event 4740)",
        body: "Run runas with a wrong password five times. The account locks and Windows writes Event 4740 'A user account was locked out'. Unlock it in lusrmgr.msc (Users > labtest > clear 'Account is locked out') or wait 15 minutes.",
        cmd: "runas /user:labtest cmd\nGet-WinEvent -FilterHashtable @{LogName='Security'; Id=4740} -MaxEvents 1 | Format-List TimeCreated, Message",
        check: "The sixth attempt reports the account is locked out and a 4740 event names labtest."
      },
      {
        title: "Make sure SMBv1 is off",
        body: "SMBv1 is an obsolete file-sharing protocol exploited by WannaCry and NotPetya. It is not installed by default on current Windows, but you check anyway because older images and upgrades can still have it.",
        cmd: "Get-WindowsOptionalFeature -Online -FeatureName SMB1Protocol | Select-Object FeatureName, State\nGet-SmbServerConfiguration | Select-Object EnableSMB1Protocol, EnableSMB2Protocol\nDisable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart\nSet-SmbServerConfiguration -EnableSMB1Protocol $false -Force",
        check: "SMB1Protocol State is Disabled (or DisabledWithPayloadRemoved) and EnableSMB1Protocol is False."
      },
      {
        title: "Compare against a published baseline",
        body: "Download the Microsoft Security Compliance Toolkit and pick the baseline for your OS, or register for the free CIS Benchmark PDF. Compare at least ten settings (password, lockout, audit, firewall, Defender, SMB) with what you configured, and record matches, gaps and any setting you would not apply in this lab with a reason. The toolkit's Policy Analyzer can do the comparison for you.",
        check: "You have a table of 10+ settings with columns: setting, baseline value, your value, match/gap, reason."
      },
      {
        title: "Export the 'after' settings and diff",
        body: "Export again and let PowerShell show exactly which lines changed. This is the evidence section of your write-up.",
        cmd: "secedit /export /cfg C:\\Lab\\secpol-after.inf\nauditpol /backup /file:C:\\Lab\\audit-after.csv\nCompare-Object (Get-Content C:\\Lab\\secpol-before.inf) (Get-Content C:\\Lab\\secpol-after.inf)",
        check: "The diff shows MinimumPasswordLength = 14, LockoutBadCount = 5 and the other values you changed."
      }
    ],
    verify: [
      "net accounts shows minimum length 14 and a lockout threshold of 5.",
      "Get-MpComputerStatus shows real-time protection on with current signatures, and all firewall profiles are enabled with dropped-packet logging.",
      "auditpol shows Logon success and failure enabled.",
      "You can show 4720, 4625, 4624 and 4740 events for labtest from both Event Viewer and Get-WinEvent.",
      "SMBv1 is disabled and you have a baseline comparison table."
    ],
    deliverable: "A 'Windows endpoint baseline' report: the settings you changed with before/after evidence (secedit diff, auditpol output), Defender and firewall status screenshots, a timeline of your test events (4720 create, 4625 failures, 4740 lockout, 4624 success) from the Get-WinEvent table, and the baseline gap table.",
    resume: "Applied a Windows 11 security baseline (password/lockout policy, advanced logon auditing, Defender and firewall verification, SMBv1 removal) and built PowerShell Get-WinEvent queries that surface failed logons (4625) and account creation (4720).",
    interview: [
      "What is the difference between Event IDs 4624, 4625 and 4720? — 4624 is a successful logon, 4625 is a failed logon, and 4720 is a new user account being created.",
      "A 4625 shows Sub Status 0xC0000064. What does that tell you? — The username does not exist, so the attacker is guessing names rather than passwords for a known account.",
      "Why disable SMBv1? — It lacks modern security features and was exploited by EternalBlue-based worms like WannaCry; SMBv2/3 replace it."
    ],
    cleanup: [
      "Remove the test account: Remove-LocalUser -Name labtest.",
      "Keep the hardened settings and take a snapshot named 02-baseline, or revert to 01-clean-install."
    ],
    links: [
      { label: "Microsoft Security Compliance Toolkit", url: "https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10" },
      { label: "Microsoft Learn: Event 4625", url: "https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4625" },
      { label: "Microsoft Learn: Detect, enable and disable SMBv1, v2 and v3", url: "https://learn.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3" }
    ]
  },

  {
    id: "lab-hashing-integrity",
    title: "Hashing, signed downloads and file integrity monitoring",
    track: "Foundations",
    level: "Beginner",
    minutes: 90,
    cost: "Free",
    summary: "Hash files on Linux and Windows, verify a real Ubuntu download with SHA256SUMS and its GPG signature, see the avalanche effect, compare salted password hashes, and set up AIDE to detect a changed system file.",
    realWorld: "Analysts hash files to look them up in threat intel, admins verify installers before deploying them, and file integrity monitoring (FIM) is required by PCI DSS and most compliance frameworks. Knowing why a checksum alone is not enough without a signature is a classic supply-chain interview topic.",
    youWillNeed: [
      "ubuntu-srv01 from lab-home-lab",
      "The Ubuntu Server ISO you downloaded in lab-home-lab (on your host or copied to the VM)",
      "PowerShell on your Windows host or win-client01"
    ],
    requires: ["lab-home-lab"],
    steps: [
      {
        title: "Hash a file three ways",
        body: "A hash is a fixed-length fingerprint of data. Create a file and hash it with MD5, SHA-1 and SHA-256. MD5 and SHA-1 are broken for collision resistance, so use SHA-256 or better for anything security-related. On Windows, Get-FileHash does the same job.",
        cmd: "echo 'Quarterly access review - approved' > report.txt\nmd5sum report.txt\nsha1sum report.txt\nsha256sum report.txt\n# Windows PowerShell:\nGet-FileHash .\\report.txt -Algorithm SHA256",
        check: "You get a 32-, 40- and 64-hex-character digest; the same file gives the same SHA-256 on Linux and Windows if the bytes match."
      },
      {
        title: "See the avalanche effect",
        body: "Change one character and the hash changes completely. That is what makes hashes useful for integrity: you cannot tweak a file and keep the same fingerprint. printf avoids adding a newline so you hash exactly the text shown.",
        cmd: "printf '%s' 'cyber' | sha256sum\nprintf '%s' 'cybes' | sha256sum",
        check: "The two 64-character digests share no obvious pattern even though the inputs differ by one letter."
      },
      {
        title: "Download Ubuntu's checksum file and signature",
        body: "Ubuntu publishes SHA256SUMS (the hashes) and SHA256SUMS.gpg (a signature over that file). Download both from the official release server into the folder with your ISO. If your ISO is on a Windows host, still download these in the VM for the GPG steps.",
        cmd: "mkdir -p ~/verify && cd ~/verify\nwget https://releases.ubuntu.com/noble/SHA256SUMS https://releases.ubuntu.com/noble/SHA256SUMS.gpg\ncat SHA256SUMS",
        check: "SHA256SUMS lists a hash for each noble ISO, including the live-server one you downloaded."
      },
      {
        title: "Check the ISO hash",
        body: "If the ISO is in the same folder, sha256sum -c checks it against the list and --ignore-missing skips ISOs you did not download. On a Windows host, hash the ISO with Get-FileHash and compare it to the matching line in SHA256SUMS. Use the exact file name you have; point releases (24.04.x) change it.",
        cmd: "sha256sum -c SHA256SUMS --ignore-missing\n# Windows host:\nGet-FileHash .\\ubuntu-24.04*-live-server-amd64.iso -Algorithm SHA256",
        check: "Linux prints '<iso name>: OK'; on Windows the hash matches the SHA256SUMS line (case does not matter)."
      },
      {
        title: "Verify the GPG signature on the checksum file",
        body: "A hash only proves the ISO matches the list; if an attacker controlled the mirror they could change both. The signature proves Ubuntu produced the list. Import the Ubuntu CD Image signing key by its full fingerprint (published on ubuntu.com's verification tutorial) and verify.",
        cmd: "gpg --keyid-format long --keyserver hkp://keyserver.ubuntu.com --recv-keys 0x843938DF228D22F7B3742BC0D94AA3F0EFE21092\ngpg --keyid-format long --verify SHA256SUMS.gpg SHA256SUMS",
        check: "gpg prints 'Good signature from \"Ubuntu CD Image Automatic Signing Key (2012) <cdimage@ubuntu.com>\"'. A warning that the key is not certified with a trusted signature is normal: it means you have not personally signed that key, which is why you checked the fingerprint against ubuntu.com."
      },
      {
        title: "Prove tampering is detected",
        body: "Copy the checksum file, change one character in a hash, and verify the signature against the copy. The signature no longer matches, which is exactly what would happen if a mirror were compromised.",
        cmd: "cp SHA256SUMS SHA256SUMS.tampered\nsed -i '1s/^./0/' SHA256SUMS.tampered\ngpg --verify SHA256SUMS.gpg SHA256SUMS.tampered",
        check: "gpg reports 'BAD signature from \"Ubuntu CD Image Automatic Signing Key (2012)...\"'. (If the first hash already started with 0, change the sed to put a 1 instead.)"
      },
      {
        title: "Compare salted password hashes",
        body: "Passwords are stored as salted, slow hashes, not plain SHA-256. openssl passwd -6 makes a SHA-512-crypt hash in the $6$salt$hash format. Same password with the same salt gives the same hash; with a random salt it differs every time, which defeats precomputed rainbow tables. Ubuntu 24.04 itself uses the even slower yescrypt ($y$) in /etc/shadow.",
        cmd: "openssl passwd -6 -salt Xy7pQ2mN 'Summer2026!'\nopenssl passwd -6 -salt Xy7pQ2mN 'Summer2026!'\nopenssl passwd -6 'Summer2026!'\nopenssl passwd -6 'Summer2026!'\nsudo grep \"^$USER:\" /etc/shadow | cut -d: -f2 | cut -c1-4",
        check: "The first two outputs match, the last two differ from each other, and your shadow entry starts with $y$."
      },
      {
        title: "Install AIDE",
        body: "AIDE (Advanced Intrusion Detection Environment) records hashes and attributes of important files and later reports anything that changed. If the installer shows a Postfix mail configuration screen, choose 'No configuration' (or 'Local only').",
        cmd: "sudo apt update\nsudo apt install -y aide\naide --version",
        check: "aide --version prints a version (0.18.x on Ubuntu 24.04)."
      },
      {
        title: "Build the baseline database",
        body: "aideinit scans the filesystem using the rules in /etc/aide/aide.conf and writes the database. It can take 5-15 minutes. In production you build the baseline on a known-good system and keep a copy offline so an intruder cannot quietly rewrite it.",
        cmd: "sudo aideinit\nsudo ls -l /var/lib/aide/",
        check: "/var/lib/aide/ contains aide.db (and aide.db.new)."
      },
      {
        title: "Run a clean check",
        body: "Check the system against the baseline straight away. A few changes in logs or state files are normal; note them so you can tell noise from signal later.",
        cmd: "sudo aide --config /etc/aide/aide.conf --check",
        check: "The summary shows zero or only a handful of changed entries, all of which you can explain."
      },
      {
        title: "Change files and catch it",
        body: "Simulate what an intruder might do: add a hosts entry (a common way to redirect traffic) and create a new local user (persistence). Then check again.",
        cmd: "echo '10.66.66.66 updates.example.com' | sudo tee -a /etc/hosts\nsudo useradd -M -s /usr/sbin/nologin auditme\nsudo aide --config /etc/aide/aide.conf --check",
        check: "AIDE reports /etc/hosts, /etc/passwd, /etc/shadow and /etc/group as changed, with old and new hashes or sizes."
      },
      {
        title: "Investigate, revert and update the baseline",
        body: "After an investigation you either revert the change or accept it. Revert both, then update the database so the next check is clean. Only update the baseline after a change has been approved; otherwise you are hiding evidence.",
        cmd: "sudo sed -i '/updates.example.com/d' /etc/hosts\nsudo userdel auditme\nsudo aide --config /etc/aide/aide.conf --update\nsudo cp /var/lib/aide/aide.db.new /var/lib/aide/aide.db\nsudo aide --config /etc/aide/aide.conf --check",
        check: "The final check reports no differences (or only the normal noise you noted earlier)."
      },
      {
        title: "Find the scheduled daily check",
        body: "The Ubuntu package schedules a daily AIDE check. Depending on the package version it runs from a systemd timer or from cron. Find which one your system uses and note it in your write-up.",
        cmd: "systemctl list-timers --all | grep -i aide\nls /etc/cron.daily/ | grep -i aide",
        check: "One of the commands shows the daily AIDE job (for example dailyaidecheck)."
      }
    ],
    verify: [
      "You can show one-character input changes producing completely different SHA-256 digests.",
      "sha256sum -c (or Get-FileHash) matches your ISO to SHA256SUMS and gpg reports a Good signature.",
      "gpg reports a BAD signature for the tampered copy.",
      "AIDE flagged /etc/hosts and /etc/passwd after your change and was clean after the approved update."
    ],
    deliverable: "A short 'Integrity controls' write-up: screenshots of the checksum and signature checks (good and tampered), the avalanche example, the salted-hash comparison with a paragraph on why salts and slow hashes matter, and the AIDE report showing the detected change. End with a paragraph on where FIM fits in a real environment (PCI DSS, change management, SIEM alerts).",
    resume: "Implemented file integrity monitoring with AIDE on Ubuntu 24.04 that detected unauthorized changes to /etc/hosts and account files, and verified OS installers with SHA-256 checksums and GPG signatures.",
    interview: [
      "Why is a published checksum not enough on its own? — Whoever can change the download may also change the checksum next to it; a digital signature from the publisher's key proves the checksum list is authentic.",
      "What is a salt and why use it? — A unique random value added to each password before hashing, so identical passwords get different hashes and precomputed rainbow tables are useless.",
      "What is file integrity monitoring? — A control that baselines hashes and attributes of critical files and alerts when they change, catching tampering and unauthorized configuration changes."
    ],
    cleanup: [
      "Keep AIDE installed if you like; it is useful in later labs. Otherwise sudo apt purge -y aide aide-common.",
      "Delete ~/verify and report.txt when you have your screenshots."
    ],
    links: [
      { label: "Ubuntu tutorial: How to verify your Ubuntu download", url: "https://ubuntu.com/tutorials/how-to-verify-ubuntu" },
      { label: "AIDE project", url: "https://aide.github.io/" },
      { label: "NIST CSRC: Hash functions", url: "https://csrc.nist.gov/projects/hash-functions" }
    ]
  },

  {
    id: "lab-pki-openssl",
    title: "Build a two-tier PKI with OpenSSL and serve HTTPS",
    track: "Foundations",
    level: "Intermediate",
    minutes: 150,
    cost: "Free",
    summary: "Create a root CA and an intermediate CA with OpenSSL, issue a server certificate with SAN entries, serve it from nginx, trust the root on a client, inspect the chain with openssl s_client and a browser, then revoke the certificate and publish a CRL.",
    realWorld: "Companies run internal CAs for intranet sites, VPNs, Wi-Fi (802.1X) and device identity. Expired or mis-chained certificates cause real outages, and 'why does the browser say this cert is not trusted?' tickets land on sysadmins and security engineers constantly. Security+ and CISSP both test the chain of trust, CRLs and OCSP.",
    youWillNeed: [
      "ubuntu-srv01 (192.168.56.10) from lab-home-lab, hardened or not",
      "win-client01 (192.168.56.20) with Microsoft Edge as the client"
    ],
    requires: ["lab-home-lab"],
    safety: "These CA keys are for the lab only. Never import your lab root into a machine you use for real browsing, and remove it from win-client01 when you are done.",
    steps: [
      {
        title: "Lay out the CA folders",
        body: "Each CA gets folders for certificates, private keys, CRLs, CSRs and issued certs, plus an index.txt database and serial counters that openssl ca maintains. Private key folders are readable only by you.",
        cmd: "mkdir -p ~/pki/{root,intermediate}/{certs,private,crl,newcerts,csr}\nchmod 700 ~/pki/root/private ~/pki/intermediate/private\ncd ~/pki\ntouch root/index.txt intermediate/index.txt\necho 1000 > root/serial\necho 1000 > intermediate/serial\necho 1000 > intermediate/crlnumber",
        check: "tree -L 2 ~/pki (or ls -R) shows both CA folders with the subfolders and files."
      },
      {
        title: "Write the root CA config",
        body: "The config tells openssl ca where things live and which extensions to stamp on certificates. v3_root marks the root as a CA allowed to sign certificates and CRLs; v3_intermediate adds pathlen:0 so the intermediate can sign server certs but not further CAs.",
        cmd: "cat > ~/pki/root/openssl.cnf <<'EOF'\n[ ca ]\ndefault_ca = CA_default\n[ CA_default ]\ndir = $ENV::HOME/pki/root\ndatabase = $dir/index.txt\nserial = $dir/serial\nnew_certs_dir = $dir/newcerts\ncertificate = $dir/certs/root.crt\nprivate_key = $dir/private/root.key\ndefault_md = sha256\ndefault_days = 1825\npolicy = policy_loose\n[ policy_loose ]\ncommonName = supplied\norganizationName = optional\ncountryName = optional\n[ req ]\ndistinguished_name = req_dn\nprompt = no\n[ req_dn ]\nCN = Home Lab Root CA\n[ v3_root ]\nbasicConstraints = critical, CA:TRUE\nkeyUsage = critical, keyCertSign, cRLSign\nsubjectKeyIdentifier = hash\nauthorityKeyIdentifier = keyid:always\n[ v3_intermediate ]\nbasicConstraints = critical, CA:TRUE, pathlen:0\nkeyUsage = critical, keyCertSign, cRLSign\nsubjectKeyIdentifier = hash\nauthorityKeyIdentifier = keyid:always\nEOF",
        check: "cat ~/pki/root/openssl.cnf shows the file exactly as written."
      },
      {
        title: "Create the root CA",
        body: "Generate a P-384 elliptic-curve key encrypted with a passphrase, then a self-signed root certificate valid for 10 years. In a real company the root key lives offline or in an HSM and is used only to sign intermediates.",
        cmd: "cd ~/pki\nopenssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-384 -aes-256-cbc -out root/private/root.key\nopenssl req -config root/openssl.cnf -new -x509 -key root/private/root.key -sha384 -days 3650 -extensions v3_root -out root/certs/root.crt\nopenssl x509 -in root/certs/root.crt -noout -subject -issuer -dates -ext basicConstraints,keyUsage",
        check: "Subject and issuer are both CN = Home Lab Root CA, and Basic Constraints shows critical CA:TRUE."
      },
      {
        title: "Write the intermediate CA config",
        body: "server_cert defines what a web server certificate may do: not a CA, digital signatures only, server authentication only, and a CRL Distribution Point telling clients where to fetch revocations. copy_extensions = copy takes the SAN list from the CSR; real CAs vet those names before signing.",
        cmd: "cat > ~/pki/intermediate/openssl.cnf <<'EOF'\n[ ca ]\ndefault_ca = CA_default\n[ CA_default ]\ndir = $ENV::HOME/pki/intermediate\ndatabase = $dir/index.txt\nserial = $dir/serial\ncrlnumber = $dir/crlnumber\nnew_certs_dir = $dir/newcerts\ncertificate = $dir/certs/intermediate.crt\nprivate_key = $dir/private/intermediate.key\ndefault_md = sha256\ndefault_days = 397\ndefault_crl_days = 30\npolicy = policy_loose\ncopy_extensions = copy\n[ policy_loose ]\ncommonName = supplied\norganizationName = optional\ncountryName = optional\n[ server_cert ]\nbasicConstraints = critical, CA:FALSE\nkeyUsage = critical, digitalSignature\nextendedKeyUsage = serverAuth\nsubjectKeyIdentifier = hash\nauthorityKeyIdentifier = keyid:always\ncrlDistributionPoints = URI:http://192.168.56.10/crl/intermediate.crl\nEOF",
        check: "The file exists at ~/pki/intermediate/openssl.cnf."
      },
      {
        title: "Create and sign the intermediate CA",
        body: "The intermediate does day-to-day signing so the root can stay offline. Make its key and a CSR, then have the root sign it with the v3_intermediate extensions. You are asked for the root key passphrase.",
        cmd: "cd ~/pki\nopenssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out intermediate/private/intermediate.key\nopenssl req -new -key intermediate/private/intermediate.key -subj \"/O=Home Lab/CN=Home Lab Intermediate CA\" -out intermediate/csr/intermediate.csr\nopenssl ca -config root/openssl.cnf -extensions v3_intermediate -days 1825 -in intermediate/csr/intermediate.csr -out intermediate/certs/intermediate.crt\nopenssl verify -CAfile root/certs/root.crt intermediate/certs/intermediate.crt",
        check: "openssl ca asks 'Sign the certificate? [y/n]' and '1 out of 1 certificate requests certified, commit?' (answer y to both), and verify prints intermediate.crt: OK."
      },
      {
        title: "Issue a server certificate with SANs",
        body: "Browsers ignore the Common Name and check only the Subject Alternative Name list, so every name and IP clients will use must be in the SAN. Create the key and CSR with the SANs, sign it with the intermediate, and build a full chain file (server cert first, then intermediate).",
        cmd: "cd ~/pki\nopenssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out intermediate/private/lab.key\nopenssl req -new -key intermediate/private/lab.key -subj \"/O=Home Lab/CN=lab.home.arpa\" -addext \"subjectAltName=DNS:lab.home.arpa,DNS:www.lab.home.arpa,IP:192.168.56.10\" -out intermediate/csr/lab.csr\nopenssl ca -config intermediate/openssl.cnf -extensions server_cert -in intermediate/csr/lab.csr -out intermediate/certs/lab.crt\nopenssl x509 -in intermediate/certs/lab.crt -noout -ext subjectAltName,extendedKeyUsage,crlDistributionPoints\nopenssl verify -CAfile root/certs/root.crt -untrusted intermediate/certs/intermediate.crt intermediate/certs/lab.crt\ncat intermediate/certs/lab.crt intermediate/certs/intermediate.crt > intermediate/certs/lab-fullchain.crt",
        check: "The SAN shows DNS:lab.home.arpa, DNS:www.lab.home.arpa, IP Address:192.168.56.10 and verify prints lab.crt: OK."
      },
      {
        title: "Install the certificate on nginx",
        body: "Copy the chain and key into place with tight permissions, add an HTTPS server block, test the config and reload. If ufw is on, open 80 (for the CRL) and 443 (for HTTPS).",
        cmd: "sudo apt install -y nginx\nsudo install -d -m 700 /etc/nginx/tls\nsudo install -m 644 ~/pki/intermediate/certs/lab-fullchain.crt /etc/nginx/tls/\nsudo install -m 600 ~/pki/intermediate/private/lab.key /etc/nginx/tls/\nsudo tee /etc/nginx/sites-available/lab-https > /dev/null <<'EOF'\nserver {\n    listen 443 ssl;\n    server_name lab.home.arpa www.lab.home.arpa;\n    ssl_certificate     /etc/nginx/tls/lab-fullchain.crt;\n    ssl_certificate_key /etc/nginx/tls/lab.key;\n    ssl_protocols TLSv1.2 TLSv1.3;\n    root /var/www/html;\n}\nEOF\nsudo ln -s /etc/nginx/sites-available/lab-https /etc/nginx/sites-enabled/\nsudo nginx -t && sudo systemctl reload nginx\nsudo ufw allow 'Nginx Full'",
        check: "nginx -t reports 'syntax is ok' and 'test is successful', and sudo ss -tlnp shows nginx on :443."
      },
      {
        title: "Inspect the chain with openssl s_client",
        body: "s_client is the command-line way to see what a server actually sends. First connect without trusting your root (verification fails), then with -CAfile pointing at the root. Add a hosts entry so the name resolves.",
        cmd: "echo '192.168.56.10 lab.home.arpa www.lab.home.arpa' | sudo tee -a /etc/hosts\nopenssl s_client -connect lab.home.arpa:443 -servername lab.home.arpa </dev/null 2>/dev/null | grep -E 'Verify return code|depth'\nopenssl s_client -connect lab.home.arpa:443 -servername lab.home.arpa -CAfile ~/pki/root/certs/root.crt -showcerts </dev/null",
        check: "The first run ends with a non-zero Verify return code (for example 20, unable to get local issuer certificate); the second shows two certificates in the chain and 'Verify return code: 0 (ok)'."
      },
      {
        title: "Trust the root on the Windows client and browse",
        body: "Copy root.crt to win-client01 (for example with scp from Windows: scp labadmin@192.168.56.10:pki/root/certs/root.crt C:\\Lab\\). Import it into the machine's Trusted Root store, add the hosts entry, and open the site in Edge. Click the padlock > certificate to see the three-level chain.",
        cmd: "Import-Certificate -FilePath C:\\Lab\\root.crt -CertStoreLocation Cert:\\LocalMachine\\Root\nAdd-Content -Path C:\\Windows\\System32\\drivers\\etc\\hosts -Value \"192.168.56.10 lab.home.arpa\"\nStart-Process msedge https://lab.home.arpa",
        check: "Edge shows the nginx page with a padlock and no warning, and the certificate viewer shows Home Lab Root CA > Home Lab Intermediate CA > lab.home.arpa."
      },
      {
        title: "Revoke the certificate and publish a CRL",
        body: "Pretend the server key leaked. Revoke the certificate with a reason, generate a new CRL signed by the intermediate, and publish it at the URL in the certificate's CRL Distribution Point.",
        cmd: "cd ~/pki\nopenssl ca -config intermediate/openssl.cnf -revoke intermediate/certs/lab.crt -crl_reason keyCompromise\nopenssl ca -config intermediate/openssl.cnf -gencrl -out intermediate/crl/intermediate.crl\nopenssl crl -in intermediate/crl/intermediate.crl -noout -text | head -n 20\ncat intermediate/index.txt\nsudo mkdir -p /var/www/html/crl\nsudo cp intermediate/crl/intermediate.crl /var/www/html/crl/\ncurl -s http://192.168.56.10/crl/intermediate.crl | openssl crl -noout -issuer",
        check: "The CRL lists Serial Number 1000 with reason Key Compromise, index.txt shows an R at the start of that line, and curl fetches the CRL from nginx."
      },
      {
        title: "Prove revocation is enforced",
        body: "Verify the server certificate again, this time asking OpenSSL to check the CRL. The certificate is still inside its validity dates, but it is now rejected.",
        cmd: "cd ~/pki\nopenssl verify -crl_check -CAfile root/certs/root.crt -untrusted intermediate/certs/intermediate.crt -CRLfile intermediate/crl/intermediate.crl intermediate/certs/lab.crt",
        check: "Output includes 'error 23 at 0 depth lookup: certificate revoked'."
      },
      {
        title: "Understand OCSP",
        body: "CRLs are whole lists clients download periodically, so they can be large and stale. OCSP (RFC 6960) lets a client ask a responder about one certificate and get a signed good/revoked/unknown answer; OCSP stapling has the web server fetch that answer and send it in the TLS handshake so clients do not have to call the CA. Write two or three sentences comparing CRL, OCSP and stapling for your report. (OpenSSL includes a test responder, openssl ocsp, if you want to try it.)",
        check: "You can explain in your own words why stapling improves privacy and performance over plain OCSP."
      }
    ],
    verify: [
      "openssl verify shows the server certificate chains to your root: lab.crt: OK.",
      "openssl s_client with -CAfile ends with Verify return code: 0 (ok) and shows the SAN names.",
      "Edge on win-client01 loads https://lab.home.arpa without a warning after you trusted the root.",
      "After revocation, openssl verify -crl_check reports 'certificate revoked', and the CRL is downloadable from nginx."
    ],
    deliverable: "A PKI write-up with a diagram of root > intermediate > server, your two openssl.cnf files (never the keys), openssl x509 -text output of the server cert with the SAN, s_client output before and after trusting the root, the Edge certificate viewer screenshot, and the revoked CRL. Add a paragraph on CRL vs OCSP vs stapling and why the root should be offline.",
    resume: "Built a two-tier internal PKI with OpenSSL (offline-style root, intermediate CA), issued SAN-based TLS certificates for nginx, distributed trust to Windows clients, and demonstrated revocation through a published CRL.",
    interview: [
      "Why use an intermediate CA instead of signing with the root? — The root key can stay offline; if the intermediate is compromised you revoke it and issue a new one without replacing the root in every trust store.",
      "Why does a browser reject a certificate whose CN matches but has no SAN? — Modern browsers validate only the Subject Alternative Name extension; the CN is ignored for hostname matching.",
      "What is the difference between a CRL and OCSP? — A CRL is a signed list of revoked serials that clients download; OCSP answers a real-time query for one certificate, and stapling lets the server deliver that answer in the handshake."
    ],
    cleanup: [
      "On win-client01 remove the lab root: Get-ChildItem Cert:\\LocalMachine\\Root | Where-Object Subject -like '*Home Lab Root CA*' | Remove-Item, and delete the hosts line.",
      "On ubuntu-srv01: sudo rm /etc/nginx/sites-enabled/lab-https && sudo systemctl reload nginx, and remove the lab.home.arpa line from /etc/hosts.",
      "Keep ~/pki for later labs or delete it; never publish anything from the private folders."
    ],
    links: [
      { label: "OpenSSL 3.0 manual: openssl-ca", url: "https://docs.openssl.org/3.0/man1/openssl-ca/" },
      { label: "nginx: Configuring HTTPS servers", url: "https://nginx.org/en/docs/http/configuring_https_servers.html" },
      { label: "RFC 6960: Online Certificate Status Protocol", url: "https://www.rfc-editor.org/rfc/rfc6960" }
    ]
  },

  {
    id: "lab-honeypot",
    title: "Run a Cowrie SSH honeypot and block attackers",
    track: "Foundations",
    level: "Intermediate",
    minutes: 150,
    cost: "Free",
    summary: "Run the Cowrie SSH honeypot in Docker on the isolated lab network, restrict the real SSH service, play the attacker from another lab VM, analyze Cowrie's JSON logs with jq, and block the source IP at the host and at the container.",
    realWorld: "Security teams use honeypots as early-warning sensors: anything that touches one is suspicious by definition. Pulling IOCs (source IPs, usernames, passwords, commands) from logs, blocking them and writing it up maps to MITRE ATT&CK is day-to-day SOC and threat-intel work.",
    youWillNeed: [
      "ubuntu-srv01 (192.168.56.10), ideally after lab-linux-hardening (ufw on, labadmin with key-only SSH)",
      "win-client01 (192.168.56.20) as the simulated attacker (Windows 11 includes an OpenSSH client)",
      "Docker from Ubuntu's docker.io package and jq"
    ],
    requires: ["lab-home-lab"],
    safety: "Keep the honeypot on the host-only lab network only. Do not port-forward it on your home router or run it on a cloud VM until you understand the risks: real attackers will find it within minutes, a misconfiguration can expose your real services, and some ISPs prohibit hosting such services. Only 'attack' the honeypot from your own lab VMs.",
    steps: [
      {
        title: "Snapshot and check your starting point",
        body: "Take a snapshot of ubuntu-srv01. Confirm ufw is active and note the rule number of the existing SSH rule; you will narrow it next.",
        cmd: "sudo ufw status numbered\nip -br a",
        check: "ufw is active and 192.168.56.10 is on the host-only NIC."
      },
      {
        title: "Restrict the real SSH service",
        body: "On a real sensor the honeypot is the thing attackers find, while the real SSH is hidden or locked down. Here you allow real SSH only from your admin host (192.168.56.1). Delete the broad OpenSSH rule from lab-linux-hardening and add a source-restricted one. Moving real SSH to another port is the other common approach; on Ubuntu 24.04 SSH is socket-activated, so after changing Port you must run sudo systemctl daemon-reload and sudo systemctl restart ssh.socket.",
        cmd: "sudo ufw allow from 192.168.56.1 to any port 22 proto tcp comment 'admin SSH from host only'\nsudo ufw delete allow OpenSSH\nsudo ufw status numbered",
        check: "Your host can still SSH in; from win-client01, ssh labadmin@192.168.56.10 now times out."
      },
      {
        title: "Install Docker and jq",
        body: "Ubuntu's docker.io package is the simplest install for a lab. jq is a command-line JSON processor you will use to read Cowrie's logs.",
        cmd: "sudo apt update\nsudo apt install -y docker.io jq\nsudo systemctl enable --now docker\nsudo docker run --rm hello-world",
        check: "hello-world prints 'Hello from Docker!'."
      },
      {
        title: "Run Cowrie bound to the lab IP only",
        body: "Cowrie listens on port 2222 inside the container. Publishing as 192.168.56.10:2222 means it is reachable only on the lab network, not on the NAT interface. The named volume keeps logs if the container is recreated.",
        cmd: "sudo docker run -d --name cowrie --restart unless-stopped -p 192.168.56.10:2222:2222 -v cowrie-var:/cowrie/cowrie-git/var cowrie/cowrie:latest\nsudo docker ps\nsudo ss -tlnp | grep 2222",
        check: "docker ps shows cowrie Up with 192.168.56.10:2222->2222/tcp, and ss shows a listener on 192.168.56.10:2222."
      },
      {
        title: "Notice that Docker bypasses ufw",
        body: "You never ran ufw allow 2222, yet the port is reachable. Docker writes its own iptables NAT and FORWARD rules, and published-port traffic is forwarded to the container before ufw's INPUT rules see it. This surprises many admins and is why you bound the port to the lab IP. Look at the rules Docker created.",
        cmd: "sudo ufw status | grep 2222 || echo 'no ufw rule for 2222'\nsudo iptables -t nat -L DOCKER -n\nsudo iptables -L DOCKER-USER -n -v",
        check: "ufw has no 2222 rule, the DOCKER nat chain shows a DNAT to the container on port 2222, and DOCKER-USER is empty."
      },
      {
        title: "Play the attacker from win-client01",
        body: "From PowerShell on win-client01, try several logins to the honeypot: a few usernames like admin and oracle, and root with passwords like 123456 and password. Cowrie's default user database accepts most root passwords, so you will land in a fake shell. Run a few discovery commands, then exit.",
        cmd: "ssh -p 2222 admin@192.168.56.10\nssh -p 2222 oracle@192.168.56.10\nssh -p 2222 root@192.168.56.10\n# inside the fake shell:\nwhoami\nuname -a\ncat /etc/passwd\nexit",
        check: "Some attempts are refused, one root login succeeds with a prompt like root@svr04:~#, and the commands return fake output."
      },
      {
        title: "Watch the activity live",
        body: "Cowrie also logs to the container's standard output, which is handy for watching attacks in real time. Press Ctrl+C to stop following.",
        cmd: "sudo docker logs --tail 50 -f cowrie",
        check: "You see 'login attempt' lines with the usernames and passwords you tried and 'CMD:' lines for your commands, all from 192.168.56.20."
      },
      {
        title: "Copy out the JSON log",
        body: "Cowrie writes one JSON object per line to cowrie.json, which is what you would ship to a SIEM. Copy it out of the container (docker cp works even though the image has no shell). The same file is also on the host inside the cowrie-var volume.",
        cmd: "sudo docker cp cowrie:/cowrie/cowrie-git/var/log/cowrie/cowrie.json ~/cowrie.json\nsudo chown $USER: ~/cowrie.json\nhead -n 3 ~/cowrie.json | jq .",
        check: "jq pretty-prints events with fields such as eventid, src_ip, session and timestamp."
      },
      {
        title: "Analyze the log with jq",
        body: "Answer the questions an analyst would ask: what happened, from where, with which credentials, and what did they run? Each command pulls one view out of the same file.",
        cmd: "jq -r '.eventid' ~/cowrie.json | sort | uniq -c | sort -rn\njq -r 'select(.eventid==\"cowrie.session.connect\") | .src_ip' ~/cowrie.json | sort | uniq -c\njq -r 'select(.eventid==\"cowrie.login.failed\" or .eventid==\"cowrie.login.success\") | [.timestamp, .src_ip, .eventid, .username, .password] | @tsv' ~/cowrie.json\njq -r 'select(.eventid==\"cowrie.command.input\") | [.timestamp, .src_ip, .input] | @tsv' ~/cowrie.json\njq -r 'select(.eventid==\"cowrie.client.version\") | .version' ~/cowrie.json | sort -u",
        check: "You get counts per event type, 192.168.56.20 as the only source, a table of every credential tried, your three commands and the SSH client version string."
      },
      {
        title: "Block the attacker on the host with ufw",
        body: "Insert a deny rule at the top of the list so it is evaluated first. This blocks 192.168.56.20 from every service on the host itself. Then try the honeypot again from win-client01.",
        cmd: "sudo ufw insert 1 deny from 192.168.56.20 comment 'Cowrie attacker'\nsudo ufw status numbered\n# On win-client01:\nssh -p 2222 root@192.168.56.10",
        check: "The rule is number 1, but the honeypot connection still works, because Docker-published ports bypass ufw (step 5)."
      },
      {
        title: "Block the attacker at the container too",
        body: "Docker provides the DOCKER-USER chain for your own rules; it is evaluated before Docker's accept rules for container traffic. Add a drop for the attacker, then retry from win-client01 and watch the packet counter climb.",
        cmd: "sudo iptables -I DOCKER-USER -s 192.168.56.20 -j DROP\nsudo iptables -L DOCKER-USER -n -v --line-numbers\n# On win-client01:\nssh -p 2222 root@192.168.56.10",
        check: "The connection from win-client01 now times out and the DROP rule's pkts counter is above 0."
      },
      {
        title: "Map the activity to MITRE ATT&CK and write findings",
        body: "Turn raw events into a short incident-style report: timeline, source IP, credentials tried, commands run, actions taken and recommendations. Map what you saw to ATT&CK techniques such as T1110 Brute Force, T1078 Valid Accounts, T1033 System Owner/User Discovery and T1082 System Information Discovery.",
        check: "Your report has a timeline table, an IOC list (IP, usernames, passwords, client version), ATT&CK mappings and the blocking evidence."
      }
    ],
    verify: [
      "sudo docker ps shows Cowrie published only on 192.168.56.10:2222.",
      "Real SSH on port 22 accepts connections only from 192.168.56.1.",
      "Your jq queries list the credentials and commands used from 192.168.56.20.",
      "You can explain why the ufw rule alone did not stop connections to the container and show the DOCKER-USER drop working."
    ],
    deliverable: "A 'Honeypot sensor' report: lab diagram showing the honeypot port and the restricted real SSH, the docker run command, jq output tables (events, credentials, commands), a timeline, IOC list, ATT&CK mapping, the ufw and DOCKER-USER blocking evidence, and a 'lessons learned' paragraph on Docker bypassing host firewalls. It is all lab data, so nothing needs redacting; include the safety reasoning for keeping it off the internet.",
    resume: "Deployed a Cowrie SSH honeypot in Docker on an isolated lab network, extracted attacker IOCs from JSON logs with jq, mapped activity to MITRE ATT&CK, and blocked the source at both the host firewall (ufw) and Docker's DOCKER-USER chain.",
    interview: [
      "What is the value of a honeypot if it holds no real data? — Any interaction is suspicious, so it gives high-signal alerts and real attacker IOCs and techniques with almost no false positives.",
      "Why might a ufw deny rule not block traffic to a Docker container? — Docker's published ports are DNATed and forwarded through Docker's own iptables chains before ufw's INPUT rules; you filter them in DOCKER-USER or bind the port to a specific interface.",
      "What would you do before exposing a honeypot to the internet? — Isolate it on its own network or VM with no route to internal systems, move and restrict real management access, limit outbound traffic, monitor it, and confirm your provider allows it."
    ],
    cleanup: [
      "Remove the container and its logs: sudo docker rm -f cowrie && sudo docker volume rm cowrie-var.",
      "Remove the blocks: sudo iptables -D DOCKER-USER -s 192.168.56.20 -j DROP and sudo ufw delete deny from 192.168.56.20.",
      "Restore normal SSH access if you want it: sudo ufw allow OpenSSH (or revert to your 02-hardened snapshot)."
    ],
    links: [
      { label: "Cowrie documentation", url: "https://docs.cowrie.org/en/latest/" },
      { label: "Docker docs: Packet filtering and firewalls", url: "https://docs.docker.com/engine/network/packet-filtering-firewalls/" },
      { label: "MITRE ATT&CK T1110 Brute Force", url: "https://attack.mitre.org/techniques/T1110/" }
    ]
  },

  {
    id: "lab-ssh-mfa",
    title: "Password policy, SSH MFA and breached-password checks",
    track: "Foundations",
    level: "Intermediate",
    minutes: 120,
    cost: "Free",
    summary: "Enforce a password policy with pam_pwquality, require an SSH key plus a TOTP code with libpam-google-authenticator, test failure and recovery, set up a password manager, and check a password against Have I Been Pwned without sending it.",
    realWorld: "Stolen and reused passwords drive most account compromises, so password policy, MFA rollout and breached-password screening are core IAM tasks. Admins must also plan for lost MFA devices; a broken MFA rollout that locks out administrators is a real outage.",
    youWillNeed: [
      "ubuntu-srv01 with labadmin and key-only SSH from lab-linux-hardening (or at least lab-home-lab plus an SSH key)",
      "An authenticator app on your phone (Microsoft Authenticator, Google Authenticator, or similar) or KeePassXC's TOTP feature",
      "Bitwarden (bitwarden.com) or KeePassXC (keepassxc.org)"
    ],
    requires: ["lab-home-lab"],
    safety: "Keep an existing SSH session and the VirtualBox console open while changing PAM and sshd so you can undo mistakes. Never type a real password you use elsewhere into lab commands; use test passwords.",
    steps: [
      {
        title: "Snapshot and back up the auth configs",
        body: "PAM mistakes can lock everyone out, so snapshot the VM and copy the files you will edit.",
        cmd: "sudo cp /etc/pam.d/sshd /etc/pam.d/sshd.bak\nsudo cp /etc/security/pwquality.conf /etc/security/pwquality.conf.bak 2>/dev/null || true\nls -l /etc/pam.d/sshd.bak",
        check: "sshd.bak exists."
      },
      {
        title: "Install pwquality and set a password policy",
        body: "pam_pwquality checks new passwords when they are set. Following NIST SP 800-63B, favor length and a dictionary check over forced symbol rules. enforce_for_root makes the policy apply even when an admin sets a password with sudo.",
        cmd: "sudo apt install -y libpam-pwquality libpwquality-tools\ngrep pam_pwquality /etc/pam.d/common-password\nsudo tee -a /etc/security/pwquality.conf > /dev/null <<'EOF'\nminlen = 14\ndictcheck = 1\nusercheck = 1\nmaxrepeat = 3\nenforce_for_root\nEOF",
        check: "common-password contains a 'password requisite pam_pwquality.so retry=3' line."
      },
      {
        title: "Test the policy",
        body: "pwscore rates a candidate password against the policy without changing anything. Then try to set a weak password on a test user; it is rejected even though you are using sudo.",
        cmd: "echo 'Password1' | pwscore\necho 'Winter2026!' | pwscore\necho 'correct-horse-battery-staple-lab' | pwscore\nsudo adduser --disabled-password pwtest\nsudo passwd pwtest",
        check: "adduser asks for a full name and other details; press Enter to skip them. The first two pwscore tests fail (dictionary word or too short), the passphrase scores a number, and passwd rejects a short password with 'BAD PASSWORD'."
      },
      {
        title: "Check the clock and install the TOTP module",
        body: "TOTP codes are derived from the current time, so the server clock must be accurate. Then install the PAM module that checks the codes.",
        cmd: "timedatectl\nsudo apt install -y libpam-google-authenticator",
        check: "timedatectl shows 'System clock synchronized: yes'."
      },
      {
        title: "Enroll labadmin in TOTP",
        body: "Run this as labadmin, not with sudo, because it writes ~/.google_authenticator for the current user. The flags choose time-based codes (-t), block code reuse (-d), rate-limit to 3 logins per 30 seconds (-r 3 -R 30) and allow one step of clock skew (-w 3). Scan the QR code (or type the secret key) into your authenticator app, and save the emergency scratch codes in your password manager.",
        cmd: "google-authenticator -t -d -f -r 3 -R 30 -w 3\nls -l ~/.google_authenticator",
        check: "The app shows a 6-digit code for the account, and ~/.google_authenticator exists with mode -r-------- (400)."
      },
      {
        title: "Configure PAM for SSH",
        body: "With key-based login, PAM should ask only for the TOTP code, not the account password. Comment out the common-auth include in /etc/pam.d/sshd and add the Google Authenticator module. Without the nullok option, any user who has not enrolled cannot log in over SSH, which is what you want once everyone is enrolled.",
        cmd: "sudo sed -i 's/^@include common-auth/#@include common-auth/' /etc/pam.d/sshd\necho 'auth required pam_google_authenticator.so' | sudo tee -a /etc/pam.d/sshd\ngrep -nE 'common-auth|google' /etc/pam.d/sshd",
        check: "grep shows #@include common-auth and the new auth required pam_google_authenticator.so line."
      },
      {
        title: "Require key plus TOTP in sshd",
        body: "AuthenticationMethods publickey,keyboard-interactive means a login needs a valid key first and then the PAM challenge (the TOTP code). The file is named 00-mfa.conf so it loads before 01-hardening.conf, which set KbdInteractiveAuthentication no; sshd keeps the first value it reads.",
        cmd: "sudo tee /etc/ssh/sshd_config.d/00-mfa.conf > /dev/null <<'EOF'\nKbdInteractiveAuthentication yes\nAuthenticationMethods publickey,keyboard-interactive\nEOF\nsudo sshd -t && sudo systemctl restart ssh\nsudo sshd -T | grep -Ei '^(kbdinteractiveauthentication|authenticationmethods|passwordauthentication|usepam)'",
        check: "sshd -T shows kbdinteractiveauthentication yes, authenticationmethods publickey,keyboard-interactive, passwordauthentication no and usepam yes."
      },
      {
        title: "Test a login with key and code",
        body: "Keep your current session open and connect from a new terminal on your host. After the key is accepted you are prompted for a verification code.",
        cmd: "ssh labadmin@192.168.56.10",
        check: "You see 'Verification code:', entering the current app code logs you in, and a wrong code gives 'Permission denied'."
      },
      {
        title: "Test failure logging and the rate limit",
        body: "Enter wrong codes a few times, then try several quick logins in a row. Check what the server recorded; this is what an analyst would see during an MFA-fatigue or brute-force attempt.",
        cmd: "sudo journalctl -u ssh --since '15 min ago' --no-pager | grep -iE 'google_authenticator|invalid verification|failed|accepted'",
        check: "The log shows the failed verification codes and the accepted publickey+keyboard-interactive logins."
      },
      {
        title: "Practice recovery",
        body: "Plan for a lost phone. Log in once with an emergency scratch code instead of the TOTP code; each code works only once and is removed from ~/.google_authenticator. Then practice the out-of-band path: at the VirtualBox console (local login, which still uses common-auth and is not affected by the SSH PAM change) re-run google-authenticator for labadmin to re-enroll.",
        cmd: "ssh labadmin@192.168.56.10\ngrep -cE '^[0-9]{8}$' ~/.google_authenticator",
        check: "The scratch code logs you in and the count of 8-digit scratch codes drops by one."
      },
      {
        title: "Set up a password manager",
        body: "Install Bitwarden or KeePassXC on your host. Create a vault protected by a long passphrase plus MFA (Bitwarden) or a key file (KeePassXC), store the labadmin TOTP scratch codes and a generated 20+ character password for pwtest. A manager makes unique, long passwords practical, which is what actually stops credential stuffing.",
        cmd: "# Ubuntu desktop host (KeePassXC):\nsudo apt install -y keepassxc",
        check: "Your vault contains a lab entry with a generated password and the scratch codes, and you can explain why you chose that manager."
      },
      {
        title: "Check a password with the HIBP k-anonymity API",
        body: "Have I Been Pwned's Pwned Passwords API never receives your password. You SHA-1 hash it locally and send only the first 5 hex characters; the API returns every hash suffix sharing that prefix (hundreds of them) with breach counts, and you look for your suffix locally. Test a known-bad password first. read -s keeps it out of the screen and your shell history.",
        cmd: "read -rs -p 'Password to check: ' PW; echo\nHASH=$(printf '%s' \"$PW\" | sha1sum | awk '{print toupper($1)}'); unset PW\necho \"Sent to the API: ${HASH:0:5}\"\ncurl -s -H 'Add-Padding: true' \"https://api.pwnedpasswords.com/range/${HASH:0:5}\" | grep -i \"^${HASH:5}:\" || echo 'Not found in Pwned Passwords'",
        check: "For P@ssw0rd you get a line like 2DC183F740EE76F27B78EB39C8AD972A757:<large count>; for your generated password you get 'Not found in Pwned Passwords'."
      }
    ],
    verify: [
      "pwscore and passwd reject short or dictionary passwords under your pwquality policy.",
      "SSH as labadmin requires both the key and a TOTP code; a wrong code is denied and logged.",
      "You logged in once with a scratch code and can describe the console re-enrollment path.",
      "Your HIBP check shows only a 5-character prefix leaving the machine."
    ],
    deliverable: "An 'Authentication hardening' write-up: your pwquality.conf with a note on how it follows NIST SP 800-63B, the 00-mfa.conf and /etc/pam.d/sshd changes, a screenshot of the Verification code prompt, log lines for failed and successful MFA logins, your recovery runbook (scratch codes, console access, re-enrollment), a paragraph on your password manager choice, and a diagram of the HIBP k-anonymity flow.",
    resume: "Implemented SSH multi-factor authentication (public key plus TOTP via PAM) and a NIST 800-63B-aligned password policy with pam_pwquality on Ubuntu 24.04, including a tested recovery runbook and privacy-preserving breached-password checks via the HIBP k-anonymity API.",
    interview: [
      "What are the authentication factor types, and which does key plus TOTP use? — Something you know, have and are; an SSH private key and a TOTP authenticator are both 'something you have' on different devices, and the key's passphrase adds 'something you know'.",
      "How does the HIBP range API protect the password being checked? — Only the first 5 hex characters of its SHA-1 hash are sent, and the match against the returned suffixes happens locally, so the service never learns the full hash.",
      "What does NIST SP 800-63B recommend for passwords? — Favor length and screening against breached and common passwords, and avoid forced periodic changes and arbitrary composition rules."
    ],
    cleanup: [
      "To remove MFA: sudo rm /etc/ssh/sshd_config.d/00-mfa.conf, sudo cp /etc/pam.d/sshd.bak /etc/pam.d/sshd, then sudo sshd -t && sudo systemctl restart ssh.",
      "Delete the test user: sudo deluser --remove-home pwtest.",
      "Or revert ubuntu-srv01 to your 02-hardened snapshot."
    ],
    links: [
      { label: "Ubuntu tutorial: Configure SSH to use two-factor authentication", url: "https://ubuntu.com/tutorials/configure-ssh-2fa" },
      { label: "Have I Been Pwned API: Pwned Passwords", url: "https://haveibeenpwned.com/API/v3#PwnedPasswords" },
      { label: "NIST SP 800-63B: Authentication and Lifecycle Management", url: "https://pages.nist.gov/800-63-4/sp800-63b.html" }
    ]
  }
]);
