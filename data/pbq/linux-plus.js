/* Performance-based simulations for CompTIA Linux+ (XK0-006). */
CertHub.addPbqs("linux-plus", [
  { id: "fhs-match", d: 1, type: "match", title: "Match FHS directories to their purpose",
    prompt: "Match each top-level directory to what the Filesystem Hierarchy Standard says it holds.",
    pairs: [
      ["User home directories", "/home"],
      ["System-wide configuration files", "/etc"],
      ["Variable data such as logs, spools and caches", "/var"],
      ["Kernel images and the initramfs", "/boot"],
      ["Virtual filesystem exposing process and kernel info", "/proc"],
      ["Self-contained add-on / third-party software", "/opt"]
    ],
    extra: ["/usr", "/dev"],
    explain: "The FHS gives each kind of data a fixed home so admins can find things on any distribution. Configuration lives in /etc, changing data such as logs and mail spools in /var, and boot artifacts (vmlinuz, initramfs) in /boot. /proc is a virtual (in-memory) filesystem for process and kernel state, while /opt is for optional bundled software. The distractors /usr (read-only shared program data) and /dev (device nodes) serve different roles." },

  { id: "subnet-26-fill", d: 1, type: "fill", title: "Read a /26 host address",
    prompt: "A Linux host's eth0 is configured with 192.0.2.77/26. Fill in the network details.",
    fields: [
      { label: "Subnet mask (dotted decimal)", answers: ["255.255.255.192"] },
      { label: "Network address", answers: ["192.0.2.64"] },
      { label: "Broadcast address", answers: ["192.0.2.127"] },
      { label: "Usable hosts on this subnet", answers: ["62"] }
    ],
    explain: "A /26 borrows 2 bits in the last octet, giving mask 255.255.255.192 and a block size of 256 - 192 = 64. Blocks start at .0, .64, .128 and .192, so .77 falls in the .64 block: network .64, broadcast one below the next block at .127. Usable addresses are 2^6 - 2 = 62 after removing the network and broadcast addresses." },

  { id: "lvm-extend-order", d: 1, type: "order", title: "Grow a logical volume onto a new disk",
    prompt: "The lv_data logical volume in volume group vg_data is nearly full and a new disk /dev/sdc has been attached. Put the steps to grow it in order.",
    steps: [
      "pvcreate /dev/sdc to initialize the new disk as an LVM physical volume",
      "vgextend vg_data /dev/sdc to add the physical volume to the volume group",
      "lvextend -L +50G /dev/vg_data/lv_data to enlarge the logical volume",
      "resize2fs /dev/vg_data/lv_data to grow the ext4 filesystem into the new space"
    ],
    explain: "LVM stacks physical volumes into a volume group, which is then carved into logical volumes. You must initialize the disk as a PV, add it to the VG to create free extents, then extend the LV before finally growing the filesystem on top. lvextend -r would run the filesystem resize automatically; here it is shown as a separate resize2fs step (xfs_growfs for XFS)." },

  { id: "fstab-recovery-order", d: 5, type: "order", title: "Recover from a bad /etc/fstab entry",
    prompt: "A typo in /etc/fstab dropped the server into emergency mode with / mounted read-only. Put the recovery steps in the correct order.",
    steps: [
      "Enter the root password at the emergency-mode prompt",
      "Run mount -o remount,rw / to make the root filesystem writable",
      "Edit /etc/fstab and correct the faulty line (compare UUIDs with blkid)",
      "Run systemctl daemon-reload so systemd re-reads the mount units",
      "Run mount -a to test that every entry mounts without error",
      "Reboot to confirm the system boots normally"
    ],
    explain: "Emergency mode gives a root shell with / read-only, so you must authenticate and remount read-write before you can edit fstab. After fixing the line you reload systemd's generated mount units and test with mount -a, which surfaces any remaining error before you risk another failed boot. The boot loader and kernel are fine, so no reinstall is needed." },

  { id: "perms-octal-fill", d: 5, type: "fill", title: "Translate ls -l output",
    prompt: "Using the listing below, fill in the requested values.",
    context: "$ ls -l /srv/app\n-rwxr-x---. 1 deploy ops 2048 Sep 25 report.sh\n-rw-rw-r--. 1 deploy ops  512 Sep 25 config.yml",
    fields: [
      { label: "Octal permissions of report.sh", answers: ["750"] },
      { label: "Octal permissions of config.yml", answers: ["664"] },
      { label: "umask that produces 664 for a new file (default base 666)", answers: ["002", "0002"] }
    ],
    explain: "Each rwx triad is a 3-bit value: rwx=7, r-x=5, ---=0, so report.sh is 750, and rw-rw-r-- is 664 for config.yml. New regular files start from a base of 666, and the umask subtracts bits; 666 with the write bit cleared for group and other is 664, which comes from a umask of 002. Directories start from 777 instead." },

  { id: "net-triage-select", d: 5, type: "select", title: "Diagnose 'cannot reach the internet'",
    prompt: "Based on the command output below, select every statement that is TRUE.",
    context: "$ ping -c1 192.0.2.1        # default gateway\n64 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=0.4 ms\n$ ping -c1 198.51.100.10    # external host by IP\n64 bytes from 198.51.100.10: icmp_seq=1 ttl=117 time=12 ms\n$ ping -c1 example.com\nping: example.com: Temporary failure in name resolution\n$ cat /etc/resolv.conf\n# (file is empty)",
    options: [
      "Layer 3 connectivity to the internet is working",
      "The default gateway is unreachable",
      "Name resolution is failing because no DNS server is configured",
      "Adding a nameserver (via nmcli or resolv.conf) is an appropriate fix",
      "The interface has no physical link",
      "The firewall is dropping all outbound ICMP"
    ],
    answers: [0, 2, 3],
    explain: "Pings to the gateway and to an external IP both succeed, which proves the link, address, route and ICMP path all work, so the gateway is reachable and there is no ICMP block. The only failure is 'Temporary failure in name resolution' with an empty /etc/resolv.conf, isolating the fault to DNS. The fix is to configure a resolver, ideally persistently through NetworkManager or netplan." },

  { id: "signals-match", d: 2, type: "match", title: "Match signals to their behavior",
    prompt: "Match each process signal to what it does.",
    pairs: [
      ["SIGTERM (15)", "Polite request to terminate; can be caught for cleanup; the default for kill"],
      ["SIGKILL (9)", "Immediate termination that cannot be caught or ignored"],
      ["SIGHUP (1)", "Commonly tells a daemon to reload its configuration"],
      ["SIGINT (2)", "Sent by Ctrl+C to interrupt a foreground job"],
      ["SIGSTOP (19)", "Suspends a process; cannot be caught or ignored"]
    ],
    extra: ["Resumes a stopped job in the background"],
    explain: "SIGTERM is the graceful default, letting a program flush buffers before exiting, while SIGKILL forces an uncatchable exit used only when SIGTERM fails. SIGHUP is reused by many daemons as a reload trigger, SIGINT is the Ctrl+C interrupt, and SIGSTOP suspends a job without ending it. The leftover description matches SIGCONT, which resumes a suspended process." },

  { id: "cron-read-fill", d: 2, type: "fill", title: "Interpret cron schedules",
    prompt: "Read the cron entries below (fields: minute hour day-of-month month day-of-week) and fill in the answers.",
    context: "# /etc/cron.d/jobs\n30 2 * * 1 root /usr/local/bin/backup.sh\n0 */6 * * * root /usr/local/bin/sync.sh\n*/15 * * * * root /usr/local/bin/check.sh",
    fields: [
      { label: "How often does check.sh run, in minutes?", answers: ["15", "every 15", "every 15 minutes"] },
      { label: "On which weekday does backup.sh run (name)?", answers: ["Monday", "Mon"] },
      { label: "First hour of the day sync.sh runs (24-hour number)", answers: ["0", "00", "midnight"] }
    ],
    explain: "*/15 in the minute field runs check.sh every 15 minutes. backup.sh uses day-of-week 1, which is Monday (0 or 7 is Sunday), at 02:30. sync.sh uses */6 in the hour field, so it runs at hours 0, 6, 12 and 18, the first being 00:00 (midnight). The asterisks mean 'every value' for the unspecified fields." },

  { id: "sshd-harden-select", d: 3, type: "select", title: "Spot weak sshd_config directives",
    prompt: "Key-based login is already working. Select every directive below that WEAKENS security and should be changed as part of SSH hardening.",
    context: "# /etc/ssh/sshd_config\nPort 22\nPermitRootLogin yes\nPasswordAuthentication yes\nPermitEmptyPasswords yes\nPubkeyAuthentication yes\nMaxAuthTries 3\nX11Forwarding no",
    options: [
      "PermitRootLogin yes",
      "PasswordAuthentication yes",
      "PermitEmptyPasswords yes",
      "PubkeyAuthentication yes",
      "MaxAuthTries 3",
      "X11Forwarding no"
    ],
    answers: [0, 1, 2],
    explain: "PermitRootLogin yes lets attackers target the all-powerful root account directly and should be no, with admins using sudo. With keys already working, PasswordAuthentication yes leaves a brute-forceable path open and should be no. PermitEmptyPasswords yes is dangerous under any circumstance. The other three already harden the server: pubkey auth on, a low retry limit, and X11 forwarding off." },

  { id: "git-branch-order", d: 4, type: "order", title: "Merge a feature branch into shared main",
    prompt: "You are contributing a change to a shared main branch through a feature branch. Put the Git commands in the order you would run them.",
    steps: [
      "git switch -c feature/login to create and switch to a feature branch",
      "git add and git commit to record the change on the branch",
      "git switch main to return to the main branch",
      "git pull to update main with teammates' latest commits",
      "git merge feature/login to integrate the feature",
      "git push to publish the updated main"
    ],
    explain: "You isolate work on a feature branch so main stays stable, then commit there. Before merging you switch back to main and pull so you integrate on top of the newest shared history, reducing conflicts. Only then do you merge the feature and push. Doing shared-history changes this way avoids the rewritten history that git reset --hard and force-push would cause." }
]);
