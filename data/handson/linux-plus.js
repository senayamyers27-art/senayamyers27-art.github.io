/* Hands-on exercises for CompTIA Linux+ (XK0-006). Checked by tools/check-data.js (and tools/check-python.js for Python). */
CertHub.addHandson("linux-plus", {
  tables: {},
  items: [
    {
      id: "lp-config-backup", kind: "shell", d: 1,
      title: "Back up a config file before editing it",
      prompt: "You are about to change the SSH daemon settings and want a safe copy first.\n\nCreate the directory `/root/backup`, then copy `/etc/ssh/sshd_config` into it as `sshd_config.bak`. The original file must stay where it is.",
      hint: "Make the directory first, then use cp with a full destination path that includes the new file name.",
      explain: "cp leaves the source in place while mv would remove it, so cp is the right tool for a pre-change backup. Keeping backups outside /etc (here under /root) follows the Filesystem Hierarchy Standard: /etc holds live configuration, and a stray .bak file there can even be read by some services that load every file in a directory.",
      setup: { cwd: "/root", user: "root", files: { "/etc/ssh/sshd_config": "Port 22\nPermitRootLogin yes\nPasswordAuthentication yes\n" } },
      checks: [
        { label: "/root/backup exists as a directory", type: "dir", path: "/root/backup" },
        { label: "The backup copy contains the original settings", type: "content", path: "/root/backup/sshd_config.bak", includes: "PermitRootLogin yes" },
        { label: "The original config is still in /etc/ssh", type: "exists", path: "/etc/ssh/sshd_config" }
      ],
      solution: ["mkdir /root/backup", "cp /etc/ssh/sshd_config /root/backup/sshd_config.bak"]
    },
    {
      id: "lp-symlink-release", kind: "shell", d: 1,
      title: "Point a stable path at a release with a symbolic link",
      prompt: "Your app is deployed under `/opt/app/releases/v2`. Operators should always be able to reach the running release through `/opt/app/current`.\n\nCreate a symbolic link at `/opt/app/current` that points to `/opt/app/releases/v2`. Then use `ls -l /opt/app` to confirm the arrow in the listing.",
      hint: "The link command needs the -s option; the target comes first and the new link name second.",
      explain: "ln -s TARGET LINKNAME creates a symbolic link, a small file that stores a path. Unlike a hard link it can point to a directory and across file systems, and it breaks if the target is removed. Swapping the link to a new release directory is a common zero-downtime deployment pattern, and the exam expects you to know which link type fits which job.",
      setup: { cwd: "/opt/app", user: "root", dirs: ["/opt/app/releases/v1", "/opt/app/releases/v2"], files: { "/opt/app/releases/v2/VERSION": "2.0.0\n" } },
      checks: [
        { label: "/opt/app/current exists", type: "exists", path: "/opt/app/current" },
        { label: "A symbolic link was created with ln", type: "ran", cmd: "ln" }
      ],
      solution: ["ln -s /opt/app/releases/v2 /opt/app/current", "ls -l /opt/app"]
    },
    {
      id: "lp-count-errors", kind: "shell", d: 1,
      title: "Count errors in a log with grep and redirection",
      prompt: "The application log `/var/log/app.log` mixes INFO, WARN and ERROR lines.\n\n1. Save every ERROR line to `/root/errors.txt`.\n2. Save just the number of ERROR lines to `/root/error-count.txt`.",
      hint: "grep can print matching lines or, with one option, only a count. Use > to send each result to its file.",
      explain: "grep PATTERN FILE prints matching lines and grep -c prints how many lines matched. The > operator redirects standard output into a file, replacing what was there, while >> appends. Combining a filter with redirection is the core of Linux+ shell operations and of quick log triage during troubleshooting.",
      setup: { cwd: "/root", user: "root", files: { "/var/log/app.log": "2026-09-25 09:00:01 INFO service started\n2026-09-25 09:05:12 WARN cache is 80 percent full\n2026-09-25 09:07:40 ERROR database connection timed out\n2026-09-25 09:08:02 INFO retrying connection\n2026-09-25 09:08:05 ERROR database connection timed out\n2026-09-25 09:15:30 INFO request served in 120 ms\n2026-09-25 09:20:11 ERROR disk quota exceeded for /srv/uploads\n2026-09-25 09:21:00 WARN slow response from auth service\n" } },
      checks: [
        { label: "/root/errors.txt holds the ERROR lines", type: "content", path: "/root/errors.txt", includes: "ERROR disk quota exceeded" },
        { label: "/root/errors.txt has no INFO lines", type: "content", path: "/root/errors.txt", equals: "2026-09-25 09:07:40 ERROR database connection timed out\n2026-09-25 09:08:05 ERROR database connection timed out\n2026-09-25 09:20:11 ERROR disk quota exceeded for /srv/uploads" },
        { label: "/root/error-count.txt contains 3", type: "content", path: "/root/error-count.txt", equals: "3" }
      ],
      solution: ["grep ERROR /var/log/app.log > /root/errors.txt", "grep -c ERROR /var/log/app.log > /root/error-count.txt"]
    },
    {
      id: "lp-top-talkers", kind: "shell", d: 1,
      title: "Find the busiest client IPs with a pipeline",
      prompt: "`/var/log/web/access.log` has one request per line, and the first space-separated field is the client IP address.\n\nBuild a pipeline that extracts the IPs, counts how many requests each one made, sorts the busiest first, and saves the top 3 lines to `/root/top-ips.txt`.",
      hint: "cut with a space delimiter pulls the first field. uniq only merges neighbouring duplicates, so sort before you count, then sort the counts numerically in reverse.",
      explain: "cut -d \" \" -f 1 extracts the IP, sort groups identical lines together, uniq -c counts each group, sort -rn orders by the count from largest to smallest and head -n 3 keeps the top three. This cut | sort | uniq -c | sort -rn chain is a classic for spotting noisy or abusive clients and appears throughout Linux+ text-processing questions.",
      setup: { cwd: "/root", user: "root", files: { "/var/log/web/access.log": "203.0.113.7 GET /index.html 200\n198.51.100.23 GET /about.html 200\n203.0.113.7 GET /login 200\n192.0.2.50 GET /index.html 200\n203.0.113.7 POST /login 401\n198.51.100.23 GET /pricing 200\n203.0.113.7 POST /login 401\n192.0.2.14 GET /index.html 304\n203.0.113.7 POST /login 401\n198.51.100.23 GET /contact 200\n192.0.2.50 GET /blog 200\n" } },
      checks: [
        { label: "203.0.113.7 is listed with 5 requests", type: "content", path: "/root/top-ips.txt", includes: "5 203.0.113.7" },
        { label: "198.51.100.23 is listed with 3 requests", type: "content", path: "/root/top-ips.txt", includes: "3 198.51.100.23" },
        { label: "192.0.2.50 is listed with 2 requests", type: "content", path: "/root/top-ips.txt", includes: "2 192.0.2.50" }
      ],
      solution: ["cut -d \" \" -f 1 /var/log/web/access.log | sort | uniq -c | sort -rn | head -n 3 > /root/top-ips.txt"]
    },
    {
      id: "lp-user-group", kind: "shell", d: 2,
      title: "Create a team group and its members",
      prompt: "A new DevOps team is starting.\n\n1. Create the group `devops`.\n2. Create the user `maria` with a home directory, the login shell `/bin/bash`, and `devops` as a supplementary group.\n3. Add the existing user `sam` to `devops` without removing him from his other groups (he is already in `docker`).",
      hint: "useradd has options for creating the home directory, choosing supplementary groups and setting the shell. For an existing account, remember the append option with usermod.",
      explain: "useradd -m creates /home/maria, -G sets supplementary groups and -s sets the login shell. For existing users, usermod -aG appends a group; usermod -G without -a replaces the whole supplementary list, which is a classic mistake that silently strips access. The exam tests exactly this difference.",
      setup: { cwd: "/root", user: "root", users: { sam: { groups: ["docker"] } }, groups: ["docker"] },
      checks: [
        { label: "maria exists", type: "user", user: "maria" },
        { label: "maria is in devops", type: "ingroup", user: "maria", group: "devops" },
        { label: "maria has a home directory", type: "dir", path: "/home/maria" },
        { label: "sam is in devops", type: "ingroup", user: "sam", group: "devops" },
        { label: "sam is still in docker", type: "ingroup", user: "sam", group: "docker" }
      ],
      solution: ["groupadd devops", "useradd -m -G devops -s /bin/bash maria", "usermod -aG devops sam", "id sam"]
    },
    {
      id: "lp-enable-service", kind: "shell", d: 2,
      title: "Start a service now and at every boot",
      prompt: "The web server `nginx` is installed but stopped and will not start after a reboot.\n\nStart it immediately and enable it at boot, then check its state with `systemctl status nginx`.",
      hint: "systemctl can enable a unit and start it in one command with an extra option.",
      explain: "systemctl start changes the current state only, and systemctl enable only creates the boot-time links. systemctl enable --now does both at once. Linux+ questions often describe a service that works until the next reboot, which points to a unit that was started but never enabled.",
      setup: { cwd: "/root", user: "root", services: { nginx: "inactive", sshd: "enabled" } },
      checks: [
        { label: "nginx is running", type: "service", service: "nginx", active: true },
        { label: "nginx is enabled at boot", type: "service", service: "nginx", enabled: true }
      ],
      solution: ["systemctl enable --now nginx", "systemctl status nginx"]
    },
    {
      id: "lp-cron-job", kind: "shell", d: 2,
      title: "Schedule a nightly backup with cron",
      prompt: "The script `/usr/local/bin/backup.sh` must run every night at 02:30 as root.\n\nCreate the system cron file `/etc/cron.d/nightly-backup` containing one line in the /etc/cron.d format: the five time fields, the user, then the command.",
      hint: "The five fields are minute, hour, day of month, month and day of week. Files in /etc/cron.d also need a user name before the command. echo with quotes and > will write the line.",
      explain: "The line 30 2 * * * root /usr/local/bin/backup.sh runs at minute 30 of hour 2 every day. Files in /etc/cron.d and /etc/crontab include a user field, while a personal crontab edited with crontab -e does not. Reading and writing crontab syntax is a core Linux+ scheduling objective, alongside at and systemd timers.",
      setup: { cwd: "/root", user: "root", dirs: ["/etc/cron.d"], files: { "/usr/local/bin/backup.sh": "#!/bin/bash\ntar -czf /srv/backup/etc.tar.gz /etc\n" }, modes: { "/usr/local/bin/backup.sh": "755" } },
      checks: [
        { label: "/etc/cron.d/nightly-backup exists", type: "exists", path: "/etc/cron.d/nightly-backup" },
        { label: "It runs at 02:30 every day as root", type: "content", path: "/etc/cron.d/nightly-backup", includes: "30 2 * * * root" },
        { label: "It calls the backup script", type: "content", path: "/etc/cron.d/nightly-backup", includes: "/usr/local/bin/backup.sh" }
      ],
      solution: ["echo \"30 2 * * * root /usr/local/bin/backup.sh\" > /etc/cron.d/nightly-backup", "cat /etc/cron.d/nightly-backup"]
    },
    {
      id: "lp-sgid-share", kind: "shell", d: 3,
      title: "Set up a shared directory with SGID",
      prompt: "Members of the `finance` group need a shared folder at `/srv/finance`. New files created there should automatically belong to the `finance` group, and other users must have no access at all.\n\nSet the group owner of `/srv/finance` to `finance` and give it mode `2770`.",
      hint: "chgrp (or chown with :group) changes the group. The leading digit in a four-digit octal mode sets the special bits: 4 is SUID, 2 is SGID, 1 is sticky.",
      explain: "Mode 2770 is SGID (2) plus rwx for owner and group and nothing for others. SGID on a directory makes new files inherit the directory's group, so teammates can edit each other's files. The sticky bit (1, as on /tmp) instead stops users deleting files they do not own. Recognising the special bits in ls -l output (s in the group execute slot) is a Linux+ security objective.",
      setup: { cwd: "/root", user: "root", users: { priya: { groups: ["finance"] } }, groups: ["finance"], dirs: ["/srv/finance"], owners: { "/srv/finance": "root:root" } },
      checks: [
        { label: "/srv/finance belongs to group finance", type: "group", path: "/srv/finance", group: "finance" },
        { label: "/srv/finance has mode 2770", type: "mode", path: "/srv/finance", mode: "2770" }
      ],
      solution: ["chgrp finance /srv/finance", "chmod 2770 /srv/finance", "ls -ld /srv/finance"]
    },
    {
      id: "lp-disable-legacy", kind: "shell", d: 3,
      title: "Harden a host by disabling legacy services",
      prompt: "A security scan flagged cleartext services on this server. `telnet` and `vsftpd` are running and enabled at boot. SSH is the approved remote access method and must keep working.\n\nStop and disable `telnet` and `vsftpd`, and leave `sshd` running and enabled. Use `systemctl list-units` to review the result.",
      hint: "One systemctl option both disables a unit and stops it right away.",
      explain: "systemctl disable --now removes the boot-time links and stops the unit immediately. Disabling unused services shrinks the attack surface, and Telnet and plain FTP send credentials in cleartext, so SSH and SFTP replace them. OS hardening questions on Linux+ expect you to remove what is not needed rather than just firewall it.",
      setup: { cwd: "/root", user: "root", services: { telnet: "enabled", vsftpd: "enabled", sshd: "enabled" } },
      checks: [
        { label: "telnet is stopped and disabled", type: "service", service: "telnet", active: false, enabled: false },
        { label: "vsftpd is stopped and disabled", type: "service", service: "vsftpd", active: false, enabled: false },
        { label: "sshd is still running and enabled", type: "service", service: "sshd", active: true, enabled: true }
      ],
      solution: ["systemctl disable --now telnet", "systemctl disable --now vsftpd", "systemctl list-units"]
    },
    {
      id: "lp-first-script", kind: "shell", d: 4,
      title: "Write and enable a small Bash script",
      prompt: "Create the script `/usr/local/bin/disk-report.sh` with exactly two lines:\n\n1. The shebang `#!/bin/bash`\n2. The command `df -h`\n\nThen make it executable with mode `755` so any user can run it.",
      hint: "Write the first line with echo and >, add the second line with >>, then set the mode with chmod.",
      explain: "The shebang line tells the kernel which interpreter runs the file, and the execute bit lets it be run as a command. Mode 755 gives the owner rwx and everyone else r-x, the usual mode for shared scripts in /usr/local/bin. Using > for the first line and >> for the rest avoids overwriting what you already wrote, a common scripting slip.",
      setup: { cwd: "/root", user: "root", dirs: ["/usr/local/bin"] },
      checks: [
        { label: "The script starts with the Bash shebang", type: "content", path: "/usr/local/bin/disk-report.sh", includes: "#!/bin/bash" },
        { label: "The script runs df -h", type: "content", path: "/usr/local/bin/disk-report.sh", equals: "#!/bin/bash\ndf -h" },
        { label: "The script has mode 755", type: "mode", path: "/usr/local/bin/disk-report.sh", mode: "755" }
      ],
      solution: ["echo \"#!/bin/bash\" > /usr/local/bin/disk-report.sh", "echo \"df -h\" >> /usr/local/bin/disk-report.sh", "chmod 755 /usr/local/bin/disk-report.sh", "cat /usr/local/bin/disk-report.sh"]
    },
    {
      id: "lp-ssh-key-perms", kind: "shell", d: 5,
      title: "Fix SSH key login refused by permissions",
      prompt: "User `dev` copied a public key into `~/.ssh/authorized_keys`, but key login still falls back to a password. The SSH server ignores keys when the files are too open.\n\nInspect the permissions, then set `/home/dev/.ssh` to `700` and `/home/dev/.ssh/authorized_keys` to `600`. Make sure both belong to `dev`.",
      hint: "Start with ls -la on the home directory and on .ssh. The directory needs owner-only access and the key file owner read/write only.",
      explain: "With StrictModes on (the default), sshd refuses authorized_keys if the file or the .ssh directory is writable by group or others, or owned by another user, because someone else could plant a key. The fix is chmod 700 ~/.ssh, chmod 600 ~/.ssh/authorized_keys and correct ownership. Linux+ troubleshooting lists SSH key permissions as a typical security issue.",
      setup: { cwd: "/home/dev", user: "root", users: { dev: {} }, dirs: ["/home/dev/.ssh"], files: { "/home/dev/.ssh/authorized_keys": "ssh-ed25519 AAAAC3NzaExampleKeyOnly dev@laptop\n" }, modes: { "/home/dev/.ssh": "777", "/home/dev/.ssh/authorized_keys": "666" }, owners: { "/home/dev": "dev:dev", "/home/dev/.ssh": "root:root", "/home/dev/.ssh/authorized_keys": "dev:dev" } },
      checks: [
        { label: ".ssh has mode 700", type: "mode", path: "/home/dev/.ssh", mode: "700" },
        { label: "authorized_keys has mode 600", type: "mode", path: "/home/dev/.ssh/authorized_keys", mode: "600" },
        { label: ".ssh is owned by dev", type: "owner", path: "/home/dev/.ssh", owner: "dev" },
        { label: "authorized_keys is owned by dev", type: "owner", path: "/home/dev/.ssh/authorized_keys", owner: "dev" }
      ],
      solution: ["ls -la /home/dev/.ssh", "chown -R dev:dev /home/dev/.ssh", "chmod 700 /home/dev/.ssh", "chmod 600 /home/dev/.ssh/authorized_keys", "ls -la /home/dev/.ssh"]
    },
    {
      id: "lp-full-disk", kind: "shell", d: 5,
      title: "Free space on a full /var by clearing old rotated logs",
      prompt: "`df -h` shows the root file system almost full, and most of the growth is under `/var/log/app`. Rotated, compressed logs end in `.gz` and have already been shipped to the log server.\n\nUse `find` to list the `.gz` files under `/var/log/app`, then delete them. Keep the live log `current.log`.",
      hint: "find with -name and a quoted wildcard pattern shows what matches before you delete anything. Then remove each file it listed.",
      explain: "Checking df -h and then du or find narrows a full disk to a directory, and find -name \"*.gz\" lists the candidates before anything is removed, which is safer than a blind rm. Deleting the live log that a process still holds open would not free space until the process restarts (lsof +L1 shows such files), so only rotated copies are removed. This is a standard Linux+ storage troubleshooting scenario.",
      setup: { cwd: "/var/log/app", user: "root", files: { "/var/log/app/current.log": "2026-09-25 10:00:00 INFO running\n", "/var/log/app/app-20260922.log.gz": "compressed data\n", "/var/log/app/app-20260923.log.gz": "compressed data\n", "/var/log/app/app-20260924.log.gz": "compressed data\n" } },
      checks: [
        { label: "app-20260922.log.gz is gone", type: "missing", path: "/var/log/app/app-20260922.log.gz" },
        { label: "app-20260923.log.gz is gone", type: "missing", path: "/var/log/app/app-20260923.log.gz" },
        { label: "app-20260924.log.gz is gone", type: "missing", path: "/var/log/app/app-20260924.log.gz" },
        { label: "current.log is kept", type: "exists", path: "/var/log/app/current.log" }
      ],
      solution: ["df -h", "find /var/log/app -name \"*.gz\"", "rm /var/log/app/app-20260922.log.gz /var/log/app/app-20260923.log.gz /var/log/app/app-20260924.log.gz", "ls /var/log/app"]
    }
  ]
});
