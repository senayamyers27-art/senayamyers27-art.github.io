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
      ] }
  ],
  // The VM exam: a timed set of tasks on one VM, scored by the same checks. Tasks are drawn at random.
  exam: {
    minutes: 45, tasks: 6, pass: 70,
    pool: ["users", "shared-dir", "acl", "sudo", "service", "timer", "cron", "partitions", "journal", "processes", "firewall"]
  }
};
