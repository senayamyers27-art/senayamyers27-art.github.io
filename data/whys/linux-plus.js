/* "Why this option is wrong" explanations for CompTIA Linux+ (XK0-006) multiple-choice questions. */
CertHub.addWhys("linux-plus", {
  "lx1": [
    "modinfo describes a module file on disk (its parameters, dependencies and path) whether or not it is loaded; it does not report the running kernel's loaded modules.",
    "depmod rebuilds the modules.dep dependency database; it does not list which modules are currently loaded.",
    null,
    "insmod inserts a single module file into the kernel; it loads a module rather than reporting what is already loaded."
  ],
  "lx2": [
    "systemd runs as PID 1 only after the kernel is already running, so it cannot be what loads the kernel and initramfs.",
    "dracut builds initramfs images on disk ahead of time; it does not load them into memory during boot.",
    "/etc/fstab lists filesystems to mount once the system is running; it plays no part in loading the kernel.",
    null
  ],
  "lx3": [
    "grub2-mkconfig rebuilds the GRUB boot menu, not the initramfs, so the new storage driver would still be absent early in boot.",
    "depmod -a rebuilds the module dependency map; it does not regenerate the initramfs image.",
    null,
    "mkfs.ext4 /boot formats the boot partition, erasing it, and has nothing to do with rebuilding the initramfs."
  ],
  "lx4": [
    "/usr is meant to be read-only shared program data and has no standard directory for variable logs.",
    null,
    "/etc holds configuration files, not variable log data, and there is no standard /etc/log.",
    "/opt is for self-contained add-on software packages, not for system log files."
  ],
  "lx5": [
    "df -h reports usage of mounted filesystems and does not print device UUIDs.",
    "mount -a mounts all fstab entries; it is not a UUID query and this syntax is invalid.",
    null,
    "fdisk has no -n action; it edits partition tables and does not print UUIDs."
  ],
  "lx6": [
    "Creating a new volume group gives a separate volume rather than growing the existing /data logical volume.",
    "fdisk cannot merge a disk into a logical volume, and resize2fs needs a larger LV to grow into first.",
    null,
    "mdadm --create builds a RAID array, and mounting it over /data hides the existing data instead of extending it."
  ],
  "lx7": [
    "xfs_growfs only grows an XFS filesystem; there is no supported way to shrink XFS with it.",
    "resize2fs works on ext2/3/4 filesystems, not XFS.",
    null,
    "XFS cannot shrink, and running lvreduce on a mounted volume with a filesystem that can't shrink would corrupt data."
  ],
  "lx8": [
    "A symbolic link has its own separate inode and an 'l' file type with an arrow to its target, not a shared inode number.",
    null,
    "Copies made with cp -p would each have a different inode number; here both names share inode 1311.",
    "A shared inode number means the files are on the same filesystem; hard links cannot span filesystems."
  ],
  "lx9": [
    null,
    "-x extracts an archive rather than creating one, so it would not build etc.tar.gz.",
    "-t only lists the contents of an archive; it does not create one.",
    "-j compresses with bzip2, not gzip, which is inconsistent with the .gz name."
  ],
  "lx10": [
    "scp -r copies recursively but never removes files deleted from the source, so it does not produce a true mirror.",
    "cp cannot write to a remote host:path like that, and it has no delete-extraneous behavior.",
    null,
    "--remove-source-files deletes the source files after copying, destroying the original web root."
  ],
  "lx11": [
    "This has if= and of= reversed, so it would overwrite /dev/sdb with the image file rather than back the disk up.",
    "tar archives files from a filesystem; it cannot image a raw block device like /dev/sdb.",
    "cp --sparse copies only one partition (sdb1) and is not a raw block-level imaging tool for the whole disk.",
    null
  ],
  "lx12": [
    "ip addr add changes only the running kernel state and is lost at reboot or when the connection restarts.",
    null,
    "ifconfig is deprecated on NetworkManager systems and its changes are also non-persistent.",
    "/etc/hosts maps names to IP addresses; it does not assign an address to an interface."
  ],
  "lx13": [
    "The hostname command sets only the running name, which reverts at the next reboot.",
    null,
    "Writing to /proc/sys/kernel/hostname changes the runtime value only and does not persist.",
    "Appending to /etc/hosts adds a name-to-IP mapping; it does not set the system hostname."
  ],
  "lx14": [
    "/etc/resolv.conf lists DNS servers and search domains but does not control whether /etc/hosts is consulted first.",
    null,
    "/etc/hosts.allow is part of TCP wrappers access control and has nothing to do with name resolution order.",
    "/etc/sysconfig/network holds settings like the hostname and gateway, not the lookup source order."
  ],
  "lx15": [
    null,
    "With 2>&1 placed first, stderr is pointed at the terminal (the current stdout) before stdout is redirected, so errors do not land in the file.",
    "tee writes stdout to the file and the screen but does not capture stderr at all.",
    "2> log.txt redirects only standard error, leaving standard output going to the terminal."
  ],
  "lx16": [
    "cut joins the selected fields with the delimiter (a colon here), not a space.",
    "root:x:0:0 is fields 1 through 4, not fields 1 and 7.",
    "/root:/bin/bash is fields 6 and 7; field 1 is root, not /root.",
    null
  ],
  "lx17": [
    "Using set with an assignment does not export the variable; set manages shell options and positional parameters.",
    null,
    "local only works inside a function and still does not export a variable to child processes.",
    "alias defines a command shortcut, not an environment variable."
  ],
  "lx18": [
    "qemu-img info reports on a disk image file, not on defined virtual machines, and has no --all VM listing.",
    null,
    "virt-install creates new VMs; it has no --list option for existing domains.",
    "lsmod | grep kvm only confirms that the KVM kernel modules are loaded."
  ],
  "lx19": [
    "A raw image is full-size with no thin provisioning and no built-in snapshot support.",
    "ISO 9660 is a read-only optical disc filesystem format, not a growable writable VM disk.",
    "tar.gz is a compressed archive format, not a bootable VM disk image.",
    null
  ],
  "lx20": [
    "-size -100M finds files smaller than 100 MiB and -mtime +7 finds files modified more than 7 days ago, both the reverse of what is wanted.",
    null,
    "-size 100M matches files of exactly 100 MiB and -atime uses access time, not the size-over-100M / recently-modified criteria.",
    "locate searches a filename database and has no -size or -mtime tests."
  ],
  "lx21": [
    "noexec only blocks executing programs from the filesystem; it does not affect boot behavior when the device is missing.",
    "defaults enables the standard options (rw, suid, dev, exec, auto, nouser, async) and still fails the boot if the device is absent.",
    null,
    "sync forces synchronous I/O to the filesystem and does nothing about a missing device at boot."
  ],
  "lx22": [
    "usermod modifies an account that already exists; it will not create the new dev1 user.",
    "useradd -M explicitly skips creating the home directory, which the developer needs.",
    null,
    "groupadd creates a group, not a user, and -m/-s are not valid groupadd options."
  ],
  "lx23": [
    "usermod -G without -a replaces alice's entire supplementary group list with just docker, dropping her other groups.",
    null,
    "groupadd creates a group; it does not add an existing user to one.",
    "chgrp changes the group ownership of a file, not a user's group membership."
  ],
  "lx24": [
    "chage -E sets an account expiry date (here day 90 after the epoch), which disables the account rather than forcing a password change.",
    null,
    "passwd -l locks the account's password; it does not set a maximum password age.",
    "usermod -e sets the account expiration date, not the password's maximum age."
  ],
  "lx25": [
    "An expired password is indicated by the aging fields in /etc/shadow, not by a ! placed before the hash.",
    null,
    "A password that is not set shows as an empty field (::), not a ! in front of an existing hash.",
    "Forcing a change at next login is done with a 0 in the last-change field (chage -d 0), not with a ! prefix."
  ],
  "lx26": [
    "systemctl start runs the unit now but does not create the boot-time links, so it will not return after a reboot.",
    "systemctl unmask only removes a mask; it neither starts nor enables the unit.",
    null,
    "reload-or-restart reloads or restarts a running unit and does not set it to start at boot."
  ],
  "lx27": [
    "This reverses the fields: disabled describes boot behavior (won't start at boot) and active (running) describes the current state (running now).",
    null,
    "The unit is disabled, not masked; a masked unit would show 'masked' and could not be active.",
    "The Active line shows active (running), not a failed or auto-restarting state."
  ],
  "lx28": [
    null,
    "Editing the file under /usr/lib/systemd/system works until the next package update replaces it, losing the change.",
    "/etc/rc.local is a legacy boot script and is not the mechanism for overriding a systemd unit's settings.",
    "Files in /run/systemd are cleared at every reboot, so the change would not persist."
  ],
  "lx29": [
    "OnBootSec takes a time span measured after boot, not a calendar keyword like daily.",
    null,
    "ExecStart belongs in the service unit and specifies the command to run, not a schedule.",
    "WantedBy sets install-time dependencies (which target pulls the unit in), not a run schedule."
  ],
  "lx30": [
    "This misreads the fields: 30 2 is 02:30 and the trailing 1 is a weekday, not an every-other-day schedule.",
    "The day-of-month field is *, and the trailing 1 is day-of-week (Monday), not the 1st of the month.",
    "30 is minute 30 only, not an interval that runs every 30 minutes.",
    null
  ],
  "lx31": [
    "SIGKILL cannot be caught, so the process gets no chance to flush its buffers; it should be used only if SIGTERM fails.",
    "SIGSTOP only suspends the process; it does not tell it to shut down and clean up.",
    "SIGCONT resumes a stopped process; it does not stop or terminate one.",
    null
  ],
  "lx32": [
    "renice to a negative value raises the process's priority, making it use more CPU rather than less.",
    "nice launches a new command with a priority; it cannot renice an existing PID, and 4321 is not a command.",
    "kill -STOP freezes the process entirely instead of just lowering its CPU priority.",
    null
  ],
  "lx33": [
    "Ctrl+C sends SIGINT and usually terminates the foreground job, leaving nothing to move to the background.",
    null,
    "Ctrl+D signals end-of-input, not job suspension, so there is no stopped job to bring to the foreground.",
    "nohup launches a new command immune to SIGHUP; it does not background an already-running job by job number."
  ],
  "lx34": [
    "rpm -qa lists installed packages matching a name, but there is no installed package literally named dig.",
    "dnf info dig looks up a package named dig, which does not exist (the file ships in bind-utils).",
    "rpm -ql lists the files of an installed package named dig, which is not installed.",
    null
  ],
  "lx35": [
    "apt upgrade installs newer versions of already-known packages; it does not fetch the new repository's package list.",
    "apt autoremove removes unused dependencies and has nothing to do with refreshing package lists.",
    null,
    "dpkg --configure -a finishes configuring half-installed packages; it does not download package lists."
  ],
  "lx36": [
    "rpm -ql lists the files contained in a package and expects a package name, not a file path.",
    "rpm -qi shows package information and expects a package name, not a file path.",
    "dnf search matches keywords in package names and summaries; it does not report which package owns a file.",
    null
  ],
  "lx37": [
    "-p 80:8080 maps host port 80 to container port 8080, where nothing is listening.",
    "--expose only documents that a port is used; it does not publish or map it to the host.",
    "--network host:8080 is invalid syntax; host networking shares the host stack and takes no port mapping.",
    null
  ],
  "lx38": [
    "Committing the container to an image nightly captures the image layers but does not reliably persist live data changes.",
    "The container's writable layer is deleted whenever the container is removed, so the data is lost.",
    "Raising CPU and memory limits does nothing to make the data survive a container replacement.",
    null
  ],
  "lx39": [
    null,
    "-k restricts output to kernel messages, which would hide sshd's own service log entries.",
    "dmesg shows the kernel ring buffer and has no --unit filter for systemd units.",
    "systemctl list-units shows unit states, not the log messages a unit has produced."
  ],
  "lx40": [
    "-rwxr-xr-x is 755, giving others r-x, but the final 0 means others get no permissions.",
    null,
    "-rw-r-x--- would make the owner 6 (rw-), but 7 means the owner has rwx.",
    "-rwx-w---- would make the group 2 (-w-), but 5 means the group has r-x."
  ],
  "lx41": [
    "-rw-r--r-- is 644, the result of umask 022; a umask of 027 also removes read from others.",
    "Regular files do not get execute bits by default, since the 666 base has no execute bits for the umask to remove.",
    "-rw-rw---- is 660 (umask 007), but 027 also removes the write bit from the group.",
    null
  ],
  "lx42": [
    "Restricting deletion or rename to the owner is the sticky bit on a directory, not the SUID bit.",
    null,
    "SUID has nothing to do with group sharing; group inheritance on directories is the SGID bit.",
    "On modern Linux the sticky bit no longer keeps executables cached in memory."
  ],
  "lx43": [
    null,
    "A leading 2 is setgid, which controls group inheritance on new files, not who may delete them.",
    "A leading 4 is setuid, which is meaningless for this deletion-protection purpose on a directory.",
    "0777 sets no special bit, so any user could delete any other user's files."
  ],
  "lx44": [
    null,
    "getfacl only displays existing ACLs, and -m is not one of its options.",
    "chmod o+r grants read to every other user, not just to bob.",
    "chown bob changes the file's owner, which alters more than just granting bob read access."
  ],
  "lx45": [
    "setenforce 0 disables SELinux enforcement, which hides the problem rather than fixing the incorrect file context.",
    null,
    "chmod -R 777 changes standard permissions, but the denial comes from the SELinux context, not permissions.",
    "semanage port adds a port type label; it has nothing to do with the files' context under /var/www/html."
  ],
  "lx46": [
    "aa-status reports AppArmor's status, not the SELinux mode.",
    "setsebool toggles SELinux booleans; it does not report the current mode.",
    "ausearch searches the audit log for events; it does not print the current SELinux mode.",
    null
  ],
  "lx47": [
    "aa-enforce puts the profile in enforce mode, which blocks violations instead of only logging them.",
    "aa-disable unloads the profile entirely, so violations are neither logged nor enforced.",
    "setenforce 0 is an SELinux command, not AppArmor, and it disables enforcement system-wide.",
    null
  ],
  "lx48": [
    "firewalld does support the https service; it is a predefined service definition.",
    null,
    "A trusted zone would allow the traffic; it would not cause the rule to vanish after a reboot.",
    "SELinux does not manage firewalld rules, so it did not remove the rule."
  ],
  "lx49": [
    null,
    "Setting the default incoming policy to allow opens the host to all inbound traffic, defeating the firewall.",
    "Resetting and disabling ufw turns the firewall off, leaving the host unprotected.",
    "Denying 22/tcp blocks SSH, which would immediately lock out the remote admin."
  ],
  "lx50": [
    "PasswordAuthentication yes allows password logins in general but does not specifically stop the root account from logging in.",
    null,
    "PermitEmptyPasswords no blocks blank-password logins but still permits root to log in with a password or key.",
    "UsePAM no disables PAM integration, which can break authentication features and does not block root logins."
  ],
  "lx51": [
    "ssh-keygen -R removes a host's entry from known_hosts; it has nothing to do with installing your key on the server.",
    "ssh-add loads a private key into the local agent; it does not place anything on the remote server.",
    "Copying id_ed25519 sends the private key, which must never leave the client; only the .pub file belongs on the server.",
    null
  ],
  "lx52": [
    "Appending with echo bypasses syntax checking, so a typo can break sudo for everyone.",
    "Adding users to wheel grants full root privileges, far more than restarting nginx.",
    null,
    "Editing /etc/sudoers directly in nano skips validation, risking a syntax error that locks out sudo."
  ],
  "lx53": [
    null,
    "pam_limits enforces resource limits (ulimits) such as open files and processes, not lockout after failed logins.",
    "pam_pwquality enforces password complexity rules, not account lockout on failed attempts.",
    "pam_env sets environment variables at login and has nothing to do with lockout."
  ],
  "lx54": [
    "gpg --symmetric encrypts a file with a passphrase; it does not verify a checksum.",
    "openssl rand generates random bytes and has nothing to do with verifying a download.",
    null,
    "md5sum does not encrypt (there is no --encrypt), and it uses MD5 rather than SHA-256."
  ],
  "lx55": [
    null,
    "gpg --encrypt encrypts files, not a whole block device that must be unlocked at boot.",
    "chattr +i makes a file immutable; it does not encrypt anything.",
    "mdadm manages software RAID and has no --encrypt option."
  ],
  "lx56": [
    "Running tasks on every host in parallel describes execution strategy (forks), not idempotence.",
    "Playbooks are not consumed after running; they can be rerun at any time, so this is not idempotence.",
    "Rebuilding a host from a clean image is reprovisioning, not the idempotent convergence of desired state.",
    null
  ],
  "lx57": [
    null,
    "ansible-playbook requires a playbook file to run and does not accept an ad hoc -m module argument.",
    "ansible-galaxy manages roles and collections; it has no ping capability.",
    "ansible-vault encrypts and decrypts secrets; it does not test host connectivity."
  ],
  "lx58": [
    null,
    "ansible-doc displays module documentation; it does not encrypt secrets.",
    "ansible-inventory displays and manages inventory; it does not protect secret values.",
    "ansible-config views and manages Ansible settings; it does not encrypt secrets."
  ],
  "lx59": [
    "apply -auto-approve makes the changes immediately without pausing for review.",
    "destroy tears down the managed resources rather than previewing proposed changes.",
    null,
    "fmt only reformats configuration files; it does not show what would change."
  ],
  "lx60": [
    null,
    "Ansible is agentless and pushes changes over SSH; it does not use a per-node agent pulling a catalog.",
    "OpenTofu provisions infrastructure through state and providers; it is not a node agent applying a catalog.",
    "Git is a version control system, not a configuration management agent."
  ],
  "lx61": [
    null,
    "chown root changes the file's owner; it does not add the missing execute permission.",
    "export PATH=backup.sh corrupts the PATH variable and does nothing to make the script executable.",
    "source ~/.bashrc reloads shell configuration and is unrelated to the file's execute bit."
  ],
  "lx62": [
    null,
    "An exit status of 1 is returned only when grep finds no match, but root does appear in /etc/passwd.",
    "An exit status of 2 indicates an error such as a missing file, which is not the case here.",
    "$? prints the numeric exit status, not the matched text, and -q suppresses grep's output entirely."
  ],
  "lx63": [
    "The variable name itself is never printed; parameter expansion substitutes a value.",
    "The :- operator is not part of the output; only the default value is printed, without a leading dash.",
    "With :- and an unset variable, the default is substituted, so the line is not empty.",
    null
  ],
  "lx64": [
    "-f is true only for regular files, so it would not confirm that /opt/app is a directory.",
    "-x tests the executable bit, which does not confirm the path is a directory.",
    "-z tests whether a string is empty and has nothing to do with file type.",
    null
  ],
  "lx65": [
    "printf \"%s\" prints values with no separators, so no spaces appear between the numbers.",
    "Brace expansion does occur, producing 1 2 3, so {1..3} is not printed literally.",
    null,
    "The loop iterates over every value and prints all of them, not just the last."
  ],
  "lx66": [
    "set -x only traces commands as they run; it does not change a pipeline's exit status.",
    "set -u makes unset variables an error and has no effect on the pipeline's exit status.",
    null,
    "set +e disables exit-on-error, which would ignore the failure rather than let it be caught."
  ],
  "lx67": [
    "A length of 4 would be correct for a list [1, 2, 2, 3], but braces create a set that drops the duplicate.",
    "The set retains 1, 2 and 3, which is three elements, not two.",
    null,
    "This is valid syntax and len() works on a set, so no TypeError is raised."
  ],
  "lx68": [
    "AI output is not pre-tested, and running unreviewed code as root can cause serious, irreversible damage.",
    "Real credentials should never be pasted into prompts or into untested scripts.",
    null,
    "Scheduling unreviewed deletion code in cron automates a potentially destructive mistake."
  ],
  "lx69": [
    "reset --hard followed by a force-push rewrites shared history and breaks other developers' clones.",
    "git checkout -- . discards uncommitted local changes; it does not undo a commit that was already pushed.",
    "git stash temporarily shelves local changes; it does not revert a committed change.",
    null
  ],
  "lx70": [
    "git branch -d deletes an existing branch rather than creating and switching to a new one.",
    "git merge integrates another branch into the current one; it does not create or switch branches.",
    "git clone copies an entire remote repository; it is not used to create a local branch.",
    null
  ],
  "lx71": [
    "A read-only remount produces 'Read-only file system' errors, not 'No space left on device'.",
    "A user memory limit does not cause disk write failures like this.",
    null,
    "A corrupted partition table would cause mount or read failures, not IUse% reaching 100%."
  ],
  "lx72": [
    null,
    "du does count files in hidden directories, so hidden files do not explain the gap.",
    "The filesystem journal is small and would not account for a missing 20 GB.",
    "Swap holds memory pages, not deleted disk files, so the log was not moved there."
  ],
  "lx73": [
    null,
    "Load average is a count of tasks in the run queue, not a CPU-busy percentage.",
    "Load average does not count logged-in users.",
    "The length of time the server has been up is uptime, which is separate from the load numbers."
  ],
  "lx74": [
    "/etc/security/limits.conf sets resource limits (ulimits); it does not record that a process was killed.",
    null,
    "free -h shows current memory use, not a past OOM-kill event.",
    "The OOM killer does not leave a core dump by default, so its absence proves nothing."
  ],
  "lx75": [
    null,
    "lscpu describes CPU hardware and topology, not disk I/O activity.",
    "nproc only prints the number of processing units available.",
    "uname -r shows the running kernel version and is unrelated to I/O saturation."
  ],
  "lx76": [
    null,
    "Reaching 8.8.8.8 already proves the default gateway is working, so it is not the first thing to check.",
    "The interface clearly works because IP traffic to 8.8.8.8 succeeds, so the NIC driver is not the issue.",
    "ICMP to 8.8.8.8 succeeds, so the firewall is not blocking outbound ICMP."
  ],
  "lx77": [
    "ip route show displays the routing table, not which process is listening on a socket.",
    null,
    "ping localhost tests reachability of the loopback, not which process owns a port.",
    "traceroute localhost traces a network path; it does not list listening sockets."
  ],
  "lx78": [
    null,
    "An IPv6 link-local address does not provide the missing IPv4 route to other networks.",
    "Traffic sent to raw IP addresses does not need DNS, so a missing /etc/hosts entry would not block it.",
    "A second address on eth0 would not create a path off the local subnet."
  ],
  "lx79": [
    "A masked unit refuses to start and never reaches the point of executing ExecStart, so it would not show 203/EXEC.",
    "A port already in use produces a runtime bind error inside the program, not the 203/EXEC exec failure.",
    null,
    "Running out of memory at startup shows a different status or a kill signal, not 203/EXEC."
  ],
  "lx80": [
    "The kernel has already booted, so the GRUB2 boot loader is fine and does not need reinstalling.",
    "Running mkfs on the root filesystem would erase the entire system.",
    null,
    "Booting to graphical.target does not fix the fstab typo, which will still fail the mount."
  ],
  "lx81": [
    null,
    "systemctl isolate switches to the target now but does not change what happens at the next boot.",
    "set-default rescue.target boots into single-user rescue mode, not a normal multi-user text console.",
    "Enabling graphical.target keeps the system booting into the GUI, the opposite of the goal."
  ],
  "lx82": [
    "Running fsck on a mounted filesystem can cause further corruption; it must be unmounted first.",
    "xfs_repair is the tool for XFS filesystems, but this partition is ext4.",
    "mkfs.ext4 reformats the partition, erasing all of its data.",
    null
  ],
  "lx83": [
    null,
    "ls -l shows standard permissions, which are already wide open at 777, so it cannot explain the denial.",
    "The web server's access_log records HTTP requests, not SELinux access denials.",
    "/etc/sudoers.d concerns sudo privilege rules and is unrelated to SELinux file access."
  ],
  "lx84": [
    "Changing permissions on the .pub file misses the point; the private key, not the public one, is too open.",
    "chmod 777 ~/.ssh makes the directory world-writable, which weakens security and does not fix the key.",
    "chown root on the key would make the user unable to read their own private key.",
    null
  ],
  "lx85": [
    "hwclock --systohc writes the system time to the hardware clock; it does not show sync status or offset.",
    "Setting the timezone to UTC does not change the underlying clock skew that these protocols care about.",
    null,
    "date +%s prints the current epoch time but reveals nothing about synchronization or offset."
  ],
  "lx86": [
    null,
    "dpkg --purge --force-all forcibly removes packages and can leave the system in an inconsistent state.",
    "apt-mark hold pins a package to its current version; it does not resolve missing dependencies.",
    "apt autoremove removes unused packages; it does not install the missing dependencies."
  ],
  "lx87": [
    null,
    "--sort=-%mem sorts by memory use rather than CPU, so it does not match the reported symptom.",
    "free -m shows overall memory totals, not per-process CPU usage.",
    "lsof lists open files, not CPU consumption by process."
  ],
  "lx88": [
    "fdisk -l shows only the partition layout, not the drive's SMART health counters.",
    null,
    "blkid reports the UUID and filesystem type, not SMART attributes.",
    "hdparm -z re-reads the partition table; it does not report drive health."
  ],
  "lx89": [
    "arp -a shows local Layer 2 neighbors on the same segment, not the remote path to headquarters.",
    "hostname -I prints the host's own IP addresses and reveals nothing about the path.",
    null,
    "ethtool eth0 shows the local NIC's link settings, not where along the path packets stop."
  ],
  "lx90": [
    "Port publishing works regardless of whether the image's metadata exposes port 80.",
    "Rootless podman can publish ports at 1024 and above, so this is not the cause.",
    null,
    "Each container has its own network namespace, so port 80 inside the container is free; the conflict is on the host side."
  ],
  "lx91": [
    "Reinstalling the OS is unnecessary because the previous kernel still boots the system fine.",
    null,
    "The firmware setup screen cannot run dracut; rebuilding the initramfs requires a booted system.",
    "Deleting /boot removes the kernels and boot files, making the system harder to recover, not easier."
  ]
});
