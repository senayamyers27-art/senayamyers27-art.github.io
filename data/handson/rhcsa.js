/* Hands-on exercises for Red Hat Certified System Administrator (EX200). Checked by tools/check-data.js (and tools/check-python.js for Python). */
CertHub.addHandson("rhcsa", {
  tables: {},
  items: [
    {
      id: "rh-grep-words", kind: "shell", d: 1,
      title: "Save matching lines to a file",
      prompt: "A classic exam task: find every line in `/usr/share/dict/words` that contains the string `ich` and save them, in their original order, to `/root/lines.txt`.",
      hint: "grep prints the matching lines. Send its output to the file with a redirection operator.",
      explain: "grep PATTERN FILE > DEST writes only the matching lines into DEST, keeping their order. Using > replaces any existing content, while >> would append. The exam checks the file's contents exactly, so do not add extra lines or reorder them, and remember that grep is case-sensitive unless you add -i.",
      setup: { cwd: "/root", user: "root", files: { "/usr/share/dict/words": "apple\nrich\nbanana\nsandwich\nlichen\nRichard\norange\nostrich\n" } },
      checks: [
        { label: "/root/lines.txt exists", type: "exists", path: "/root/lines.txt" },
        { label: "It holds exactly the five matching lines", type: "content", path: "/root/lines.txt", equals: "rich\nsandwich\nlichen\nRichard\nostrich" }
      ],
      solution: ["grep ich /usr/share/dict/words > /root/lines.txt", "cat /root/lines.txt"]
    },
    {
      id: "rh-find-conf", kind: "shell", d: 1,
      title: "Find files by name and record the paths",
      prompt: "Locate every regular file whose name ends in `.conf` anywhere under `/etc/app`, and save the list of full paths to `/root/conf-files.txt`.",
      hint: "find takes a start directory, a -type test and a -name test. Quote the wildcard so the shell does not expand it.",
      explain: "find /etc/app -type f -name \"*.conf\" walks the whole tree below /etc/app and prints full paths of files that match. Quoting the pattern keeps the shell from expanding it in the current directory first. RHCSA tasks often ask you to find files by name, owner or size and save the results or copy them somewhere.",
      setup: { cwd: "/root", user: "root", files: { "/etc/app/main.conf": "port=8080\n", "/etc/app/conf.d/logging.conf": "level=info\n", "/etc/app/conf.d/cache.conf": "size=64\n", "/etc/app/README": "Configuration for app\n", "/etc/app/conf.d/old.conf.bak": "port=80\n" } },
      checks: [
        { label: "main.conf is listed", type: "content", path: "/root/conf-files.txt", includes: "/etc/app/main.conf" },
        { label: "conf.d/logging.conf is listed", type: "content", path: "/root/conf-files.txt", includes: "/etc/app/conf.d/logging.conf" },
        { label: "conf.d/cache.conf is listed", type: "content", path: "/root/conf-files.txt", includes: "/etc/app/conf.d/cache.conf" }
      ],
      solution: ["find /etc/app -type f -name \"*.conf\" > /root/conf-files.txt", "cat /root/conf-files.txt"]
    },
    {
      id: "rh-log-review", kind: "shell", d: 4,
      title: "Pull failed logins out of /var/log/secure",
      prompt: "Authentication events on RHEL are written to `/var/log/secure`.\n\nSave every line containing `Failed password` to `/root/failed-logins.txt`, and save the number of those lines to `/root/failed-count.txt`.",
      hint: "Quote a pattern that contains a space. grep has an option that prints a count instead of the lines.",
      explain: "/var/log/secure collects sshd, sudo and PAM authentication messages, while /var/log/messages holds most other system logs. grep \"Failed password\" filters the relevant lines and grep -c counts them. On the exam you can also use journalctl -u sshd with --since to see the same events from the journal.",
      setup: { cwd: "/root", user: "root", files: { "/var/log/secure": "Sep 25 08:01:10 server1 sshd[1201]: Accepted publickey for student from 192.0.2.10 port 50122\nSep 25 08:14:22 server1 sshd[1250]: Failed password for student from 203.0.113.40 port 41822\nSep 25 08:14:25 server1 sshd[1250]: Failed password for student from 203.0.113.40 port 41822\nSep 25 08:20:03 server1 sudo[1302]: student : TTY=pts/0 ; PWD=/home/student ; USER=root ; COMMAND=/bin/dnf update\nSep 25 08:31:47 server1 sshd[1377]: Failed password for root from 198.51.100.9 port 60211\nSep 25 08:32:10 server1 sshd[1380]: Accepted password for admin from 192.0.2.11 port 50300\n" } },
      checks: [
        { label: "failed-logins.txt holds the failed attempts", type: "content", path: "/root/failed-logins.txt", includes: "Failed password for root from 198.51.100.9" },
        { label: "failed-logins.txt has no accepted logins", type: "content", path: "/root/failed-logins.txt", equals: "Sep 25 08:14:22 server1 sshd[1250]: Failed password for student from 203.0.113.40 port 41822\nSep 25 08:14:25 server1 sshd[1250]: Failed password for student from 203.0.113.40 port 41822\nSep 25 08:31:47 server1 sshd[1377]: Failed password for root from 198.51.100.9 port 60211" },
        { label: "failed-count.txt contains 3", type: "content", path: "/root/failed-count.txt", equals: "3" }
      ],
      solution: ["grep \"Failed password\" /var/log/secure > /root/failed-logins.txt", "grep -c \"Failed password\" /var/log/secure > /root/failed-count.txt"]
    },
    {
      id: "rh-users-groups", kind: "shell", d: 9,
      title: "Create users, a group and a service account",
      prompt: "Set up these accounts:\n\n1. A group named `sysadmins`.\n2. Users `natasha` and `harry`, both with `sysadmins` as a supplementary group.\n3. A user `sarah` who is not in `sysadmins` and has the non-interactive shell `/sbin/nologin`.\n\nSet passwords with `passwd` if you like, then confirm with `id`.",
      hint: "Create the group before the users that need it. useradd has options for supplementary groups and for the login shell.",
      explain: "groupadd creates the group, useradd -G adds supplementary groups at creation time and useradd -s /sbin/nologin gives an account that can own files and run services but cannot log in interactively. This exact pattern appears on almost every RHCSA exam, and id USER is the quickest way to verify membership.",
      setup: { cwd: "/root", user: "root" },
      checks: [
        { label: "natasha is in sysadmins", type: "ingroup", user: "natasha", group: "sysadmins" },
        { label: "harry is in sysadmins", type: "ingroup", user: "harry", group: "sysadmins" },
        { label: "sarah exists", type: "user", user: "sarah" },
        { label: "sarah has the /sbin/nologin shell", type: "shell", user: "sarah", shell: "/sbin/nologin" }
      ],
      solution: ["groupadd sysadmins", "useradd -G sysadmins natasha", "useradd -G sysadmins harry", "useradd -s /sbin/nologin sarah", "passwd natasha", "id natasha"]
    },
    {
      id: "rh-hosts-entry", kind: "shell", d: 8,
      title: "Add a static host name entry",
      prompt: "DNS for the lab is not ready yet. Make the name `server2.lab.example.com` (short name `server2`) resolve to `192.168.56.20` on this host by adding one line to the end of `/etc/hosts`. Keep the existing entries.",
      hint: "Append rather than overwrite. The /etc/hosts format is IP address, then the full name, then any aliases.",
      explain: "/etc/hosts is checked before DNS by default (the hosts line in /etc/nsswitch.conf reads files dns), so a line like 192.168.56.20 server2.lab.example.com server2 resolves both names locally. Using >> appends and keeps the localhost entries; using > would wipe them and break local name resolution. getent hosts server2 verifies the result on a real system.",
      setup: { cwd: "/root", user: "root", files: { "/etc/hosts": "127.0.0.1   localhost localhost.localdomain\n::1         localhost localhost.localdomain\n" } },
      checks: [
        { label: "server2 maps to 192.168.56.20", type: "content", path: "/etc/hosts", includes: "192.168.56.20 server2.lab.example.com server2" },
        { label: "The localhost entry is still there", type: "content", path: "/etc/hosts", includes: "127.0.0.1   localhost" }
      ],
      solution: ["echo \"192.168.56.20 server2.lab.example.com server2\" >> /etc/hosts", "cat /etc/hosts"]
    },
    {
      id: "rh-repo-file", kind: "shell", d: 2,
      title: "Write a local DNF repository file",
      prompt: "Packages for this lab are in a local repository at `/srv/repo`. Create `/etc/yum.repos.d/local.repo` with these four lines:\n\n`[local]`\n`name=Local lab repository`\n`baseurl=file:///srv/repo`\n`enabled=1`\n\nand a fifth line `gpgcheck=0`.",
      hint: "Write the first line with > and append each following line with >>. Quote each line.",
      explain: "A .repo file needs a section id in brackets, a baseurl pointing at the repository, and enabled and gpgcheck settings. file:/// URLs reference a local path. On the exam you might instead run dnf config-manager --add-repo, then check with dnf repolist. Signed repositories should keep gpgcheck=1 with a gpgkey line; gpgcheck=0 is only for trusted local test repositories.",
      setup: { cwd: "/root", user: "root", dirs: ["/etc/yum.repos.d", "/srv/repo"] },
      checks: [
        { label: "The file has the [local] section", type: "content", path: "/etc/yum.repos.d/local.repo", includes: "[local]" },
        { label: "baseurl points at /srv/repo", type: "content", path: "/etc/yum.repos.d/local.repo", includes: "baseurl=file:///srv/repo" },
        { label: "The repository is enabled", type: "content", path: "/etc/yum.repos.d/local.repo", includes: "enabled=1" },
        { label: "gpgcheck is set", type: "content", path: "/etc/yum.repos.d/local.repo", includes: "gpgcheck=0" }
      ],
      solution: ["echo \"[local]\" > /etc/yum.repos.d/local.repo", "echo \"name=Local lab repository\" >> /etc/yum.repos.d/local.repo", "echo \"baseurl=file:///srv/repo\" >> /etc/yum.repos.d/local.repo", "echo \"enabled=1\" >> /etc/yum.repos.d/local.repo", "echo \"gpgcheck=0\" >> /etc/yum.repos.d/local.repo", "cat /etc/yum.repos.d/local.repo"]
    },
    {
      id: "rh-chrony-service", kind: "shell", d: 7,
      title: "Point chronyd at a time server and enable it",
      prompt: "Configure this host as an NTP client of `classroom.example.com`.\n\n1. Append the line `server classroom.example.com iburst` to `/etc/chrony.conf`.\n2. Restart `chronyd` so it reads the change, and make sure it is enabled at boot.",
      hint: "Append to the config with >>. systemctl can restart a unit, and a separate subcommand makes it start at boot.",
      explain: "chronyd reads its time sources from /etc/chrony.conf, and iburst speeds up the first synchronisation. A config change needs a restart, and enable makes the service survive a reboot, which the exam grader checks after rebooting your system. chronyc sources then confirms which servers are in use.",
      setup: { cwd: "/root", user: "root", files: { "/etc/chrony.conf": "driftfile /var/lib/chrony/drift\nmakestep 1.0 3\nrtcsync\n" }, services: { chronyd: "inactive" } },
      checks: [
        { label: "chrony.conf names classroom.example.com", type: "content", path: "/etc/chrony.conf", includes: "server classroom.example.com iburst" },
        { label: "chronyd is running", type: "service", service: "chronyd", active: true },
        { label: "chronyd is enabled at boot", type: "service", service: "chronyd", enabled: true }
      ],
      solution: ["echo \"server classroom.example.com iburst\" >> /etc/chrony.conf", "systemctl restart chronyd", "systemctl enable chronyd", "systemctl is-enabled chronyd"]
    },
    {
      id: "rh-web-perms", kind: "shell", d: 6,
      title: "Fix permissions on a web content directory",
      prompt: "The web server runs as user `apache` and cannot read its content in `/srv/web`. Diagnose with `ls -ld` and `ls -l`, then:\n\n1. Make `apache` the owner and group of `/srv/web` and everything inside it.\n2. Set `/srv/web` to `755` and `/srv/web/index.html` to `644`.",
      hint: "chown takes user:group and has a recursive option. Directories need execute permission to be entered; files only need read.",
      explain: "chown -R apache:apache applies ownership to the whole tree. Directories need x to be traversed and r to be listed, so 755 is typical, while content files need only read, so 644. Diagnosing permission problems with ls -l (and namei -l for every component of a path) is a listed RHCSA objective. On a real system SELinux context is the next thing to check.",
      setup: { cwd: "/root", user: "root", users: { apache: {} }, files: { "/srv/web/index.html": "<h1>Lab site</h1>\n" }, modes: { "/srv/web": "700", "/srv/web/index.html": "600" }, owners: { "/srv/web": "root:root", "/srv/web/index.html": "root:root" } },
      checks: [
        { label: "/srv/web is owned by apache", type: "owner", path: "/srv/web", owner: "apache" },
        { label: "index.html is owned by apache", type: "owner", path: "/srv/web/index.html", owner: "apache" },
        { label: "/srv/web has mode 755", type: "mode", path: "/srv/web", mode: "755" },
        { label: "index.html has mode 644", type: "mode", path: "/srv/web/index.html", mode: "644" }
      ],
      solution: ["ls -ld /srv/web", "chown -R apache:apache /srv/web", "chmod 755 /srv/web", "chmod 644 /srv/web/index.html", "ls -l /srv/web"]
    },
    {
      id: "rh-sudo-dropin", kind: "shell", d: 9,
      title: "Grant sudo to a group with a drop-in file",
      prompt: "Members of `sysadmins` should be able to run any command with sudo. Instead of editing `/etc/sudoers` directly, create the drop-in file `/etc/sudoers.d/sysadmins` containing:\n\n`%sysadmins ALL=(ALL) ALL`\n\nThen set its mode to `440`, the mode sudo expects.",
      hint: "The % sign marks a group in sudoers rules. Write the line with echo, then use chmod.",
      explain: "Files in /etc/sudoers.d are included by the main sudoers file, which keeps custom rules separate and easy to audit. %group applies the rule to every member, and ALL=(ALL) ALL allows any command as any user on any host. Mode 440 keeps the file read-only. On a real system visudo -cf /etc/sudoers.d/sysadmins checks the syntax, because a broken sudoers file can lock everyone out of sudo.",
      setup: { cwd: "/root", user: "root", users: { natasha: { groups: ["sysadmins"] } }, groups: ["sysadmins"], dirs: ["/etc/sudoers.d"] },
      checks: [
        { label: "The drop-in grants sysadmins full sudo", type: "content", path: "/etc/sudoers.d/sysadmins", includes: "%sysadmins ALL=(ALL) ALL" },
        { label: "The drop-in has mode 440", type: "mode", path: "/etc/sudoers.d/sysadmins", mode: "440" }
      ],
      solution: ["echo \"%sysadmins ALL=(ALL) ALL\" > /etc/sudoers.d/sysadmins", "chmod 440 /etc/sudoers.d/sysadmins", "ls -l /etc/sudoers.d"]
    },
    {
      id: "rh-backup-script", kind: "shell", d: 3,
      title: "Create an executable script that runs from PATH",
      prompt: "Create `/usr/local/bin/sysinfo` (no extension) so any user can run `sysinfo` as a command. It should contain three lines:\n\n1. `#!/bin/bash`\n2. `hostname`\n3. `uname -r`\n\nThen give it mode `755`.",
      hint: "/usr/local/bin is already in PATH. Build the file line by line with echo, using > once and >> afterwards.",
      explain: "A script runs as a command when it has a shebang line, the execute bit, and lives in a directory listed in PATH such as /usr/local/bin. Without the execute bit you would get a permission error, and without the PATH location you would need ./ or a full path. The RHCSA script objectives build on exactly this before adding if, for and $1 handling.",
      setup: { cwd: "/root", user: "root", dirs: ["/usr/local/bin"] },
      checks: [
        { label: "The script has the expected three lines", type: "content", path: "/usr/local/bin/sysinfo", equals: "#!/bin/bash\nhostname\nuname -r" },
        { label: "The script has mode 755", type: "mode", path: "/usr/local/bin/sysinfo", mode: "755" }
      ],
      solution: ["echo \"#!/bin/bash\" > /usr/local/bin/sysinfo", "echo hostname >> /usr/local/bin/sysinfo", "echo \"uname -r\" >> /usr/local/bin/sysinfo", "chmod 755 /usr/local/bin/sysinfo", "cat /usr/local/bin/sysinfo"]
    },
    {
      id: "rh-fstab-mount", kind: "shell", d: 5,
      title: "Prepare a persistent mount in /etc/fstab",
      prompt: "A new XFS file system has the UUID `7c1a2d3e-4b5f-4a6b-9c8d-0e1f2a3b4c5d`. It must mount at `/data` on every boot.\n\n1. Create the mount point `/data`.\n2. Append this line to `/etc/fstab` without touching the existing lines:\n\n`UUID=7c1a2d3e-4b5f-4a6b-9c8d-0e1f2a3b4c5d /data xfs defaults 0 0`",
      hint: "The mount point must exist before mounting. Append with >>, never > , when editing fstab from the shell.",
      explain: "The six fstab fields are device, mount point, type, options, dump and fsck order. Using the UUID (from blkid) keeps the mount stable if device names change. On a real system mount -a and findmnt --verify test the file before reboot, because a bad fstab line can drop the machine into emergency mode, a failure the RHCSA grader will not forgive.",
      setup: { cwd: "/root", user: "root", files: { "/etc/fstab": "UUID=0a1b2c3d-1111-2222-3333-444455556666 /     xfs  defaults 0 0\nUUID=0a1b2c3d-7777-8888-9999-aaaabbbbcccc /boot xfs  defaults 0 0\n" } },
      checks: [
        { label: "/data exists as a directory", type: "dir", path: "/data" },
        { label: "fstab mounts the UUID at /data", type: "content", path: "/etc/fstab", includes: "UUID=7c1a2d3e-4b5f-4a6b-9c8d-0e1f2a3b4c5d /data xfs defaults 0 0" },
        { label: "The root file system entry is still there", type: "content", path: "/etc/fstab", includes: "/     xfs  defaults 0 0" }
      ],
      solution: ["mkdir /data", "echo \"UUID=7c1a2d3e-4b5f-4a6b-9c8d-0e1f2a3b4c5d /data xfs defaults 0 0\" >> /etc/fstab", "cat /etc/fstab"]
    },
    {
      id: "rh-ssh-dir", kind: "shell", d: 10,
      title: "Secure a user's SSH directory for key login",
      prompt: "User `harry` will log in with SSH keys. His `.ssh` directory and `authorized_keys` file exist but are owned by root with loose permissions, so sshd will reject the key.\n\nMake `harry` the owner (user and group) of `/home/harry/.ssh` and its contents, then set the directory to `700` and `authorized_keys` to `600`.",
      hint: "Fix ownership recursively first, then set the two modes separately: one for the directory and one for the file.",
      explain: "sshd's StrictModes check rejects keys when ~/.ssh or authorized_keys is writable by others or owned by someone other than the user. chown -R harry:harry, chmod 700 on the directory and chmod 600 on the file satisfy it. ssh-copy-id normally sets these for you, but the exam may hand you a broken setup to repair, and SELinux may also need restorecon -Rv ~/.ssh on a real host.",
      setup: { cwd: "/root", user: "root", users: { harry: {} }, dirs: ["/home/harry/.ssh"], files: { "/home/harry/.ssh/authorized_keys": "ssh-ed25519 AAAAC3NzaExampleKeyOnly harry@workstation\n" }, modes: { "/home/harry/.ssh": "775", "/home/harry/.ssh/authorized_keys": "664" }, owners: { "/home/harry": "harry:harry", "/home/harry/.ssh": "root:root", "/home/harry/.ssh/authorized_keys": "root:root" } },
      checks: [
        { label: ".ssh is owned by harry", type: "owner", path: "/home/harry/.ssh", owner: "harry" },
        { label: "authorized_keys is in group harry", type: "group", path: "/home/harry/.ssh/authorized_keys", group: "harry" },
        { label: ".ssh has mode 700", type: "mode", path: "/home/harry/.ssh", mode: "700" },
        { label: "authorized_keys has mode 600", type: "mode", path: "/home/harry/.ssh/authorized_keys", mode: "600" }
      ],
      solution: ["chown -R harry:harry /home/harry/.ssh", "chmod 700 /home/harry/.ssh", "chmod 600 /home/harry/.ssh/authorized_keys", "ls -la /home/harry/.ssh"]
    }
  ]
});
