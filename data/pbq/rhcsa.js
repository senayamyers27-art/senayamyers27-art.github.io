CertHub.addPbqs("rhcsa", [
  { id: "perm-octal", d: 1, type: "fill", title: "Translate permission requirements to numeric modes",
    prompt: "You must set each path to the permissions described. Fill in the numeric (octal) mode you would pass to chmod.",
    context: "1. /opt/app/run.sh   owner rwx, group r-x, others no access\n2. /srv/shared        owner and group rwx, others none, new files inherit the directory's group\n3. /etc/app.conf      owner rw, group r, others r\n4. /scratch           everyone rwx, but users may only delete their own files",
    fields: [
      { label: "1. /opt/app/run.sh", answers: ["750", "0750"] },
      { label: "2. /srv/shared", answers: ["2770"] },
      { label: "3. /etc/app.conf", answers: ["644", "0644"] },
      { label: "4. /scratch", answers: ["1777"] }
    ],
    explain: "Read=4, write=2, execute=1, added per user/group/other: rwx=7, r-x=5, rw-=6, r--=4. A fourth leading digit sets special bits: 4 is set-UID, 2 is set-GID (new files in a directory inherit its group, so /srv/shared is 2770) and 1 is the sticky bit (only the owner can delete a file, as on /tmp, so /scratch is 1777). Don't confuse 2770 with 1770: the sticky bit does not change group ownership." },

  { id: "pkg-query-match", d: 2, type: "match", title: "Pick the right rpm, dnf or flatpak command",
    prompt: "Match each administration task to the command that does it.",
    pairs: [
      ["Which installed package owns /etc/chrony.conf?", "rpm -qf /etc/chrony.conf"],
      ["List only the config files shipped in openssh-server", "rpm -qc openssh-server"],
      ["List every file installed by the httpd package", "rpm -ql httpd"],
      ["Find which package (installed or not) supplies semanage", "dnf provides '*/semanage'"],
      ["Reverse the most recent dnf transaction", "dnf history undo last"],
      ["Show the Flatpak remotes configured on the system", "flatpak remotes"]
    ],
    extra: ["rpm -qi httpd", "dnf repolist"],
    explain: "rpm only queries the local database: -qf maps a file to the package that owns it, -qc lists its config files and -ql lists all of its files. dnf provides searches the repository metadata, so it finds packages that are not installed yet. dnf history undo reverses a transaction by ID or 'last'. rpm -qi shows package details (version, summary) and dnf repolist lists enabled RPM repositories, not Flatpak remotes." },

  { id: "script-args-fill", d: 3, type: "fill", title: "Predict a script's output from its arguments",
    prompt: "The script below is run as: ./report.sh alpha \"beta gamma\" delta   Fill in the value printed after each label.",
    context: "#!/bin/bash\necho \"count=$#\"\necho \"second=$2\"\nn=0\nfor w in $@; do\n  n=$((n+1))\ndone\necho \"words=$n\"\ntest $# -gt 3\necho \"status=$?\"",
    fields: [
      { label: "count=", answers: ["3"] },
      { label: "second=", answers: ["beta gamma"] },
      { label: "words=", answers: ["4"] },
      { label: "status=", answers: ["1"] }
    ],
    explain: "The quotes keep \"beta gamma\" as one argument, so $# is 3 and $2 is 'beta gamma'. Unquoted $@ in the for loop is word-split, giving alpha, beta, gamma and delta, so the loop runs 4 times; quoting it as \"$@\" would give 3. test 3 -gt 3 is false, and a false test sets $? to 1 (0 means success/true)." },

  { id: "root-reset-order", d: 4, type: "order", title: "Reset a forgotten root password",
    prompt: "Nobody knows the root password on a RHEL server with SELinux enforcing. Put the recovery steps in the correct order.",
    steps: [
      "At the GRUB menu press e and append rd.break to the line that starts with linux, then press Ctrl+X",
      "mount -o remount,rw /sysroot",
      "chroot /sysroot",
      "passwd root",
      "touch /.autorelabel",
      "Type exit twice to leave the chroot and continue booting"
    ],
    explain: "rd.break stops boot inside the initramfs with the real root mounted read-only at /sysroot, so it must be remounted read-write before you chroot into it and change the password. Changing /etc/shadow from the initramfs leaves it without a correct SELinux label, so /.autorelabel forces a full relabel on the next boot; skipping it can stop every login. Exiting the chroot and then the emergency shell resumes the boot." },

  { id: "journal-match", d: 4, type: "match", title: "Choose the journalctl command",
    prompt: "Match each log-reading need to the journalctl command that answers it.",
    pairs: [
      ["All messages from the current boot only", "journalctl -b"],
      ["Errors and worse from the previous boot", "journalctl -b -1 -p err"],
      ["Watch sshd messages live as they arrive", "journalctl -u sshd -f"],
      ["Messages since 09:00 today", "journalctl --since 09:00"],
      ["Kernel messages only", "journalctl -k"]
    ],
    extra: ["journalctl -p info", "journalctl --vacuum-size=100M"],
    explain: "-b limits output to a boot (-b -1 is the previous one, which only exists if the journal is persistent in /var/log/journal), -p err shows priority err and more severe, -u filters by systemd unit and -f follows new entries, --since takes a time or date, and -k shows kernel messages. -p info would include almost everything, and --vacuum-size deletes old journal files rather than reading them." },

  { id: "lvm-build-order", d: 5, type: "order", title: "Build a persistent XFS logical volume",
    prompt: "A new empty disk /dev/vdb must hold a 2 GiB logical volume lvdata in volume group vgdata, mounted at /data on every boot. Put the steps in order.",
    steps: [
      "parted /dev/vdb mklabel gpt, then mkpart and set 1 lvm on",
      "pvcreate /dev/vdb1",
      "vgcreate vgdata /dev/vdb1",
      "lvcreate -n lvdata -L 2G vgdata",
      "mkfs.xfs /dev/vgdata/lvdata",
      "mkdir /data and add the device's UUID to /etc/fstab",
      "systemctl daemon-reload, then mount -a and check with findmnt /data"
    ],
    explain: "LVM builds bottom-up: a partition (flagged for LVM) becomes a physical volume, PVs form a volume group, and logical volumes are carved from the VG. The file system goes on the LV, not on the PV. Only after mkfs does the device have a UUID for /etc/fstab. Running mount -a tests the fstab entry now, so a typo shows up before a reboot rather than dropping the machine into emergency mode." },

  { id: "lvm-extent-fill", d: 5, type: "fill", title: "Calculate LVM extent sizes",
    prompt: "Volume group vgdata was created with vgcreate -s 8M. Answer using MiB (numbers only) or extent counts.",
    context: "# vgcreate -s 8M vgdata /dev/vdb1\n# lvcreate -n lvapp -l 60 vgdata\n# lvcreate -n lvlog -L 100M vgdata\n  Rounding up size to full physical extent ...",
    fields: [
      { label: "Size of lvapp in MiB", answers: ["480", "480M", "480MiB", "480 MiB"] },
      { label: "Number of extents used by lvlog", answers: ["13"] },
      { label: "Actual size of lvlog in MiB", answers: ["104", "104M", "104MiB", "104 MiB"] }
    ],
    explain: "-l takes a count of extents, so 60 x 8 MiB = 480 MiB. -L takes a size, and LVM rounds up to a whole number of extents: 100 / 8 = 12.5, so it allocates 13 extents, which is 104 MiB. Exam tasks often give the extent size and count, so read -s, -l and -L carefully." },

  { id: "fstab-select", d: 6, type: "select", title: "Find the broken /etc/fstab entries",
    prompt: "An admin edited /etc/fstab. Select every line that will fail to mount (or that findmnt --verify will report as an error).",
    context: "1  UUID=5b0d2c1e-7f3a-4c11-9a2e-0c1d2e3f4a5b  /          xfs    defaults          0 0\n2  /dev/mapper/vgdata-lvdata                  /data      xfs    defaults          0 0\n3  UUID=9e8d7c6b-5a49-4382-a1b0-c9d8e7f6a5b4  none       swap   defaults          0 0\n4  192.168.50.10:/exports/home                /mnt/home  nfs    defaults,_netdev  0 0\n5  /dev/vdb1                                  /backup    ext4   default           0 2\n6  LABEL=archive                              archive    xfs    defaults          0 0",
    options: ["Line 1 (root file system by UUID)", "Line 2 (LVM device path)", "Line 3 (swap with mount point none)", "Line 4 (NFS export with _netdev)", "Line 5 (/backup ext4)", "Line 6 (LABEL=archive)"],
    answers: [4, 5],
    explain: "Line 5 uses the option 'default', which is not a mount option (the keyword is 'defaults'), so the mount fails. Line 6 has a relative mount point 'archive'; the second field must be an absolute path such as /archive. Swap entries use 'none' (or 'swap') as the mount point, /dev/mapper paths are stable for LVs, and _netdev correctly marks a network mount. Always test with mount -a or findmnt --verify before rebooting." },

  { id: "cron-fill", d: 7, type: "fill", title: "Schedule a weekday cron job",
    prompt: "User alice needs /home/alice/bin/sync.sh to run at 02:30 every Monday through Friday. Fill in the crontab fields and the command root uses to edit her crontab.",
    context: "# crontab line format:\n# minute  hour  day-of-month  month  day-of-week  command\n  ___     ___   *             *      ___          /home/alice/bin/sync.sh",
    fields: [
      { label: "minute", answers: ["30"] },
      { label: "hour", answers: ["2", "02"] },
      { label: "day-of-week", answers: ["1-5", "mon-fri", "1,2,3,4,5"] },
      { label: "Command root runs to edit alice's crontab", answers: ["crontab -e -u alice", "crontab -u alice -e"] }
    ],
    explain: "Cron fields are minute, hour, day of month, month and day of week, so 02:30 is '30 2' and weekdays are 1-5 (0 and 7 are Sunday). A common mistake is writing '2 30', which cron rejects because hour must be 0-23. crontab -u alice -e edits her personal crontab under /var/spool/cron; a systemd timer with OnCalendar=Mon..Fri 02:30 is the alternative." },

  { id: "nmcli-match", d: 8, type: "match", title: "Networking tasks and their commands",
    prompt: "Server1 must use a static address on connection eth0 and resolve names correctly. Match each task to the command.",
    pairs: [
      ["Set the persistent system hostname", "hostnamectl set-hostname server1.example.com"],
      ["Set the static IPv4 address and prefix", "nmcli con mod eth0 ipv4.addresses 192.168.50.10/24"],
      ["Stop using DHCP on the profile", "nmcli con mod eth0 ipv4.method manual"],
      ["Set the DNS server for the profile", "nmcli con mod eth0 ipv4.dns 192.168.50.1"],
      ["Activate the modified profile now", "nmcli con up eth0"],
      ["Check name resolution through /etc/hosts and DNS", "getent hosts server2.example.com"]
    ],
    extra: ["nmcli con reload", "ip addr add 192.168.50.10/24 dev eth0"],
    explain: "nmcli con mod only changes the saved profile (a keyfile in /etc/NetworkManager/system-connections on RHEL 10); nmcli con up applies it. ip addr add changes the running interface but is lost at reboot, and nmcli con reload only rereads files edited by hand. getent hosts follows /etc/nsswitch.conf, so it checks /etc/hosts as well as DNS, unlike dig or nslookup." },

  { id: "login-select", d: 9, type: "select", title: "Identify accounts that cannot log in with a password",
    prompt: "Using the excerpts below, select every account that cannot get an interactive login with a password.",
    context: "/etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nalice:x:1001:1001:Alice Admin:/home/alice:/bin/bash\nbob:x:1002:1002:Bob:/home/bob:/bin/bash\ncarol:x:1003:1003::/home/carol:/bin/false\napache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin\nsvcbackup:x:985:985::/var/lib/backup:/sbin/nologin\n\n/etc/shadow (hashes shortened)\nroot:$6$Xy...:20350:0:99999:7:::\nalice:$6$Ab...:20351:0:90:7:::\nbob:!$6$Cd...:20340:0:99999:7:::",
    options: ["root", "alice", "bob", "carol", "apache", "svcbackup"],
    answers: [2, 3, 4, 5],
    explain: "A '!' at the start of the shadow hash means the password is locked (usermod -L or passwd -l), so bob's password can't match. carol's shell /bin/false exits right away, and /sbin/nologin prints a refusal and exits, which is standard for service accounts like apache and svcbackup. alice's 90-day maximum age only forces a password change later; it does not block login today." },

  { id: "selinux-cmd-match", d: 10, type: "match", title: "SELinux and firewall task commands",
    prompt: "httpd must serve content on TCP 8088 with SELinux enforcing. Match each task to its command.",
    pairs: [
      ["Allow httpd to bind to TCP 8088", "semanage port -a -t http_port_t -p tcp 8088"],
      ["Open TCP 8088 in the firewall permanently", "firewall-cmd --permanent --add-port=8088/tcp"],
      ["Allow httpd outbound network connections, surviving reboot", "setsebool -P httpd_can_network_connect on"],
      ["Show the current SELinux mode", "getenforce"],
      ["Reset labels under /web to the policy defaults", "restorecon -Rv /web"],
      ["Find recent SELinux denials", "ausearch -m AVC -ts recent"]
    ],
    extra: ["setenforce 0", "chcon -R -t httpd_sys_content_t /web"],
    explain: "SELinux controls which ports a domain may bind, so a non-standard port needs a semanage port label; firewalld is a separate layer and also needs the port opened (then --reload). setsebool -P writes the boolean permanently. restorecon applies the labels defined in policy, and ausearch -m AVC pulls denials from /var/log/audit/audit.log. setenforce 0 just switches to permissive, which is not a fix." },

  { id: "avc-web-select", d: 10, type: "select", title: "Fix an SELinux denial for a web root",
    prompt: "httpd returns 403 for pages in /web. Select the commands that together fix this persistently with SELinux kept in enforcing mode.",
    context: "# ls -Zd /web /web/index.html\nunconfined_u:object_r:default_t:s0 /web\nunconfined_u:object_r:default_t:s0 /web/index.html\n\n# ausearch -m AVC -ts recent\ntype=AVC msg=audit(1758790000.123:412): avc:  denied  { getattr } for  pid=2211 comm=\"httpd\" path=\"/web/index.html\" dev=\"vda3\" ino=33620 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:default_t:s0 tclass=file permissive=0",
    options: [
      "semanage fcontext -a -t httpd_sys_content_t \"/web(/.*)?\"",
      "restorecon -Rv /web",
      "setenforce 0",
      "chcon -R -t httpd_sys_content_t /web",
      "chmod -R 777 /web",
      "setsebool -P httpd_read_user_content on",
      "semanage port -a -t http_port_t -p tcp 80"
    ],
    answers: [0, 1],
    explain: "The AVC shows httpd_t being denied on a file labeled default_t, so the fix is a label, not permissions. semanage fcontext adds a rule to policy and restorecon applies it, so the label survives a relabel. chcon works only until the next restorecon or autorelabel, setenforce 0 disables protection, chmod 777 doesn't address SELinux, the user-content boolean is for home directories, and port 80 is already labeled http_port_t." },

  { id: "umask-fill", d: 10, type: "fill", title: "Work out permissions from a umask",
    prompt: "A user's ~/.bashrc sets umask 027. Fill in the permissions of a new file and a new directory that this user creates.",
    context: "$ umask 027\n$ touch report.txt\n$ mkdir project\n$ ls -ld report.txt project",
    fields: [
      { label: "report.txt numeric mode", answers: ["640", "0640"] },
      { label: "report.txt symbolic mode", answers: ["rw-r-----", "-rw-r-----"] },
      { label: "project numeric mode", answers: ["750", "0750"] }
    ],
    explain: "New files start from 666 and new directories from 777, and the umask bits are removed. 666 minus 027 gives 640 (rw-r-----), and 777 minus 027 gives 750 (rwxr-x---). Files never get execute from the default because 666 has no x bits; the umask can only take permissions away." }
]);
