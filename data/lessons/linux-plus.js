/* Lessons for CompTIA Linux+ (XK0-006): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("linux-plus", [
 {
  "t": "Boot process: UEFI/BIOS, GRUB2, kernel, initramfs (dracut, mkinitramfs), systemd targets",
  "body": [
   "Every time a Linux machine powers on, it walks through a predictable chain of hand-offs: firmware, boot loader, kernel, initial RAM filesystem, and finally the init system. Each stage has one job and then passes control to the next. Knowing the order lets you work out where a broken boot stopped and which tool fixes it, which is exactly how Linux+ questions are framed: they describe what you see on the screen and ask what to change.",
   "The firmware comes first. Older machines use BIOS (Basic Input/Output System), which reads the first sector of the boot disk, the MBR (Master Boot Record), and runs the small piece of boot code stored there. Modern machines use UEFI (Unified Extensible Firmware Interface), which instead reads an ESP (EFI System Partition), a small FAT-formatted partition usually mounted at `/boot/efi`, and runs an EFI executable such as `grubx64.efi` or `shimx64.efi`. UEFI keeps its list of boot entries in firmware variables, which you can view with `efibootmgr -v`. UEFI also supports Secure Boot, where the firmware only runs boot loaders signed with trusted keys; the signed shim is what lets distributions boot under Secure Boot. You can check which mode you booted in by looking for the `/sys/firmware/efi` directory: if it exists, you booted with UEFI.",
   "Next is the boot loader, almost always GRUB2 (GRand Unified Bootloader version 2). GRUB shows the menu of kernels, loads the chosen kernel image (for example `/boot/vmlinuz-...`) and the matching initramfs into memory, and passes the kernel its command line, such as `root=UUID=...` and `quiet`. You never edit the generated `grub.cfg` directly, because the next kernel update regenerates it. Instead, you change `/etc/default/grub` (for example `GRUB_TIMEOUT` or `GRUB_CMDLINE_LINUX`) and regenerate the file with `grub2-mkconfig -o /boot/grub2/grub.cfg` on Red Hat-family systems or `update-grub` (a wrapper for `grub-mkconfig`) on Debian-family systems. The `grubby` tool on RHEL-like systems edits kernel arguments per entry, for example `grubby --update-kernel=ALL --args=\"console=ttyS0\"`. If the boot loader itself is damaged, `grub2-install` (or `grub-install`) writes it back to the disk.",
   "The kernel then initializes hardware it has built-in drivers for, but it often cannot yet read the real root filesystem, because the driver for the disk controller, LVM (Logical Volume Manager), RAID or LUKS encryption lives in a module on that very filesystem. The initramfs (initial RAM filesystem) solves this chicken-and-egg problem: it is a compressed archive unpacked into memory that contains just enough modules and scripts to find, unlock and mount the real root, then switch to it. It is rebuilt with `dracut` on Red Hat, Fedora and SUSE (`dracut -f` regenerates the image for the running kernel) and with `mkinitramfs` or, more commonly, `update-initramfs -u` on Debian and Ubuntu. Rebuild it after adding a storage driver, changing encryption or changing root-device settings. `lsinitrd` (dracut) and `lsinitramfs` (Debian) list what an image contains.",
   "Once root is mounted, the kernel starts PID 1 (process ID 1), which on current distributions is systemd. systemd brings the system to a target, a named group of units that replaces the old SysV runlevels. Common ones are `multi-user.target` (text-mode server, like runlevel 3), `graphical.target` (desktop, like runlevel 5), `rescue.target` (single-user with basic services and local filesystems mounted) and `emergency.target` (almost nothing, root mounted read-only). See the default with `systemctl get-default`, change it with `systemctl set-default multi-user.target`, and switch the running system with `systemctl isolate rescue.target`. For a one-time change at boot, press `e` at the GRUB menu, add `systemd.unit=rescue.target` (or `emergency.target`) to the line starting with `linux`, then press Ctrl+X. That edit is not saved, which makes it a safe way to recover a system. After booting, `systemd-analyze blame` shows which units slowed startup.",
   "Consider a worked example. A server fails to boot after its root filesystem is moved onto a new RAID controller, and it drops to a dracut emergency shell saying it cannot find the root device. The firmware and GRUB clearly worked, because the kernel ran, so the problem is at the initramfs stage. You reboot, pick an older kernel entry from the GRUB menu, confirm the controller's module with `lsmod`, and run `dracut -f` to rebuild the initramfs with the new driver. You check with `lsinitrd | grep` and the module name, reboot, and the root filesystem is found normally.",
   "Common mistakes: editing `grub.cfg` by hand and losing the change at the next kernel update; changing `/etc/default/grub` and forgetting to regenerate; confusing `rescue.target` with `emergency.target` (rescue mounts local filesystems and starts a few services, emergency gives you only a shell on a read-only root); rebuilding the initramfs for the wrong kernel version; and assuming a UEFI system has an MBR boot sector to repair when its boot loader actually lives on the ESP.",
   "Exam questions usually give a symptom and ask for the stage or the command. 'No boot menu, firmware cannot find a boot device' points to firmware settings, the ESP or reinstalling GRUB. 'Kernel panic: unable to mount root' or 'dracut emergency shell' points to the initramfs or the `root=` argument. 'Change kernel arguments permanently' points to `/etc/default/grub` plus `grub2-mkconfig`, or `grubby`. 'Boot to text mode from now on' is `systemctl set-default multi-user.target`, while 'once, to reset a password or fix fstab' points to editing the kernel line at the GRUB menu."
  ],
  "terms": [
   [
    "UEFI",
    "Unified Extensible Firmware Interface: modern firmware that boots EFI executables from an EFI System Partition and supports Secure Boot."
   ],
   [
    "ESP",
    "EFI System Partition: a small FAT partition, usually mounted at /boot/efi, that holds UEFI boot loaders."
   ],
   [
    "GRUB2",
    "The standard Linux boot loader; configured through /etc/default/grub and a generated grub.cfg."
   ],
   [
    "initramfs",
    "A compressed temporary root filesystem loaded into RAM that contains the drivers and scripts needed to mount the real root filesystem."
   ],
   [
    "dracut / mkinitramfs",
    "Tools that build the initramfs image: dracut on Red Hat-family and SUSE, mkinitramfs/update-initramfs on Debian-family."
   ],
   [
    "systemd target",
    "A unit that groups other units into a system state, such as multi-user.target or graphical.target, replacing SysV runlevels."
   ],
   [
    "Secure Boot",
    "A UEFI feature that only runs boot loaders and kernels signed with trusted keys."
   ]
  ],
  "example": "After moving a server's root filesystem onto a new RAID controller, it fails to boot and drops to a dracut emergency shell saying it cannot find the root device. You boot an older kernel entry from the GRUB menu, confirm the controller's module name with lsmod, then run dracut -f to rebuild the initramfs so it includes the new driver. The next boot finds the root filesystem normally.",
  "tip": "Map the symptom to the stage: no GRUB menu points to firmware or the boot loader, a 'cannot find root' error points to the initramfs or root= argument, and a boot that stops at an emergency shell after the kernel loads usually points to systemd units or /etc/fstab.",
  "check": [
   [
    "You edited GRUB_CMDLINE_LINUX in /etc/default/grub on a RHEL system, but the change has no effect after reboot. What step was missed?",
    "Regenerating the GRUB configuration with grub2-mkconfig -o /boot/grub2/grub.cfg (or using grubby); /etc/default/grub is only read when the config is rebuilt."
   ],
   [
    "Why does Linux need an initramfs at all?",
    "Because the drivers needed to reach the root filesystem (storage controller, LVM, RAID, LUKS) may be modules stored on that filesystem; the initramfs carries them in RAM so the real root can be mounted."
   ],
   [
    "Which command makes a server boot to a text console by default from now on?",
    "systemctl set-default multi-user.target, which changes the default target persistently."
   ],
   [
    "How can you tell whether a running system booted in UEFI or legacy BIOS mode?",
    "Check whether /sys/firmware/efi exists; it is present only when the system booted through UEFI."
   ]
  ]
 },
 {
  "t": "Filesystem Hierarchy Standard: /etc, /var, /usr, /opt, /home, /boot, /proc, /sys, /dev",
  "body": [
   "Linux has one directory tree that starts at `/` (root), and every disk, partition and virtual filesystem is attached somewhere in it. There are no drive letters. The FHS (Filesystem Hierarchy Standard) describes what belongs where. Because nearly every distribution follows it, knowing the layout tells you where to look for a config file, a log or a device on any system you log into, and it helps you plan which directories deserve their own partitions.",
   "`/etc` holds host-specific configuration, almost all of it plain text: `/etc/fstab`, `/etc/passwd`, `/etc/ssh/sshd_config`, `/etc/hosts`. If you want to change how something behaves on this machine, the file is probably under `/etc`, and it is the most important directory to back up. Many services also read drop-in directories such as `/etc/sysctl.d/` or `/etc/sudoers.d/`, so local changes live in their own small files. `/var` holds variable data that grows while the system runs: logs in `/var/log`, mail and print spools in `/var/spool`, package caches in `/var/cache`, and application state such as databases and container storage in `/var/lib`. A full `/var` is a classic cause of failing services, which is why servers often give it a separate partition.",
   "`/usr` contains the bulk of installed, read-only software and data shared by users: programs in `/usr/bin`, system administration programs in `/usr/sbin`, libraries in `/usr/lib` and `/usr/lib64`, and documentation and man pages in `/usr/share`. Software you compile yourself traditionally goes under `/usr/local` so the package manager never overwrites it. On most modern distributions `/bin`, `/sbin` and `/lib` are symbolic links into `/usr` (the 'usr merge'). `/opt` is for add-on software packages that install as a self-contained bundle, such as a vendor application in `/opt/vendorapp` with its own `bin` and `lib` inside.",
   "`/home` holds users' personal directories, such as `/home/alice`, while the root user's home is `/root`, kept on the root filesystem so it is available even when `/home` fails to mount. `/boot` holds what the boot loader needs: kernel images (`vmlinuz-*`), initramfs images, and the GRUB configuration; on UEFI systems the ESP is mounted beneath it at `/boot/efi`. If `/boot` fills up with old kernels, updates can fail. Other directories worth knowing are `/tmp` for temporary files (often cleared at boot, and sometimes a RAM-backed tmpfs), `/var/tmp` for temporary files that must survive a reboot, `/mnt` for temporary manual mounts, `/media` for removable media, `/srv` for data served by the system, and `/run` for runtime data like PID files and sockets, which lives in RAM.",
   "Three directories are virtual: they are not on disk at all but are generated by the kernel each boot. `/proc` is the process filesystem: each running process has a numbered directory such as `/proc/1234` containing its command line, environment and open files, and files like `/proc/cpuinfo`, `/proc/meminfo` and `/proc/sys/...` expose kernel information and tunable parameters. `/sys` (sysfs) presents a structured view of devices, drivers and kernel objects, and it is where udev and tools like `lsblk` get their data. `/dev` contains device files, managed by udev, that represent hardware and pseudo-devices: `/dev/sda` and `/dev/nvme0n1` for disks, `/dev/null` to discard output, `/dev/zero` for a stream of zero bytes, and `/dev/urandom` for random bytes.",
   "Consider a worked example. A web server stops accepting uploads. You run `df -h` and see the filesystem mounted at `/var` is 100 percent full. `du -sh /var/* | sort -h` points to `/var/log`, and a second `du` shows one application's debug log has grown to many gigabytes. You rotate and compress the log, fix its logging level in the application's config under `/etc`, and uploads work again. Knowing the hierarchy took you straight to the right place instead of searching the whole disk.",
   "Common mistakes: putting locally compiled programs in `/usr/bin`, where a package update can overwrite them, instead of `/usr/local/bin`; trying to free disk space by deleting files in `/proc` (they take no space and cannot be removed); storing data that must survive reboot in `/tmp` or `/run`; and confusing `/root` (root's home) with `/` (the root of the tree). Use `man hier` or `man file-hierarchy` to see the layout documented for your own system.",
   "Exam questions usually give a file type and ask where it lives, or describe a symptom and ask which directory to check. 'Configuration for this host' means `/etc`. 'Logs, spools, growing data' means `/var`. 'Third-party self-contained application' means `/opt`. 'Kernel images and initramfs' means `/boot`. 'View CPU, memory or process details' or 'kernel tunables' point to `/proc`, 'device and driver attributes' point to `/sys`, and 'device files such as disks or /dev/null' point to `/dev`."
  ],
  "terms": [
   [
    "FHS",
    "Filesystem Hierarchy Standard: the convention that defines the purpose of top-level Linux directories."
   ],
   [
    "/etc",
    "The directory for host-specific configuration files."
   ],
   [
    "/var",
    "The directory for variable data such as logs, spools, caches and application state."
   ],
   [
    "/usr/local",
    "The area reserved for locally installed software that the package manager will not touch."
   ],
   [
    "/proc",
    "A virtual filesystem exposing process and kernel information, including tunables under /proc/sys."
   ],
   [
    "/sys",
    "Sysfs, a virtual filesystem exposing devices, drivers and kernel objects."
   ],
   [
    "/dev",
    "The directory of device files, such as /dev/sda and /dev/null, maintained by udev."
   ]
  ],
  "example": "A web server stops accepting uploads. You run df -h and see that the filesystem mounted at /var is 100 percent full. du -sh /var/* points to /var/log, where an application's debug log has grown to many gigabytes. Rotating and compressing that log frees space, you lower the application's log level in its file under /etc, and uploads work again.",
  "tip": "Remember that /proc and /sys take no disk space and are rebuilt every boot; exam questions about viewing CPU, memory or kernel parameters usually point to /proc, while device and driver details point to /sys.",
  "check": [
   [
    "Where would you expect to find a program you compiled from source yourself, and why?",
    "Under /usr/local (for example /usr/local/bin), because that area is reserved for locally installed software the package manager will not overwrite."
   ],
   [
    "Which directory holds kernel images and initramfs files?",
    "/boot, which the boot loader reads before the rest of the system is available."
   ],
   [
    "What is /dev/null used for?",
    "It is a device file that discards anything written to it, commonly used to throw away unwanted command output."
   ],
   [
    "A vendor ships an application as a self-contained bundle with its own bin and lib folders. Where does the FHS say it belongs?",
    "/opt, for example /opt/vendorapp, which is intended for add-on software packages."
   ]
  ]
 },
 {
  "t": "Kernel modules and parameters: lsmod, modprobe, modinfo, /etc/modprobe.d, sysctl",
  "body": [
   "The Linux kernel is modular. Instead of building every driver into one huge image, most drivers and features ship as loadable kernel modules, files ending in `.ko` (sometimes compressed, such as `.ko.xz`) stored under `/lib/modules/$(uname -r)/`. The kernel, helped by udev, loads a module automatically when matching hardware appears, and an administrator can load, unload, inspect and configure modules without rebooting. This keeps the kernel small and lets one kernel image run on very different hardware. `lsmod` lists the modules currently loaded, with their size and a 'Used by' column showing how many users each has and which other modules depend on it. It simply formats the contents of `/proc/modules`. `modinfo name` shows details about a module file: its path, description, license, author, dependencies and, importantly, the parameters it accepts. That parameter list is how you learn which options you can set. Once a module is loaded, its current parameter values usually appear under `/sys/module/name/parameters/`.",
   "`modprobe` is the smart tool for loading and removing modules. `modprobe name` loads the module and any modules it depends on, using the dependency map `modules.dep` built by `depmod`. `modprobe -r name` removes it along with unused dependencies, and it refuses if the module is in use. You can pass parameters on the command line, as in `modprobe name option=value`. The older `insmod` and `rmmod` commands load or remove a single module file by path and do not resolve dependencies, which is why modprobe is preferred. Run `depmod -a` after manually adding a module file so modprobe can find it.",
   "Persistent module configuration lives in files under `/etc/modprobe.d/` ending in `.conf`. An `options` line sets parameters every time the module loads (`options mymodule debug=1`), and a `blacklist` line stops automatic loading by alias (`blacklist nouveau`). Blacklisting does not stop an explicit modprobe or loading as a dependency; to block that too, admins add `install name /bin/false`. To load a module at every boot, list its name in a file under `/etc/modules-load.d/`. If the module is loaded early in boot from the initramfs, rebuild the initramfs afterwards so the change is included.",
   "Kernel parameters are a separate idea: tunable runtime settings of the kernel itself, exposed as files under `/proc/sys`. The `sysctl` command reads and writes them using dotted names that mirror the path, so `net.ipv4.ip_forward` is `/proc/sys/net/ipv4/ip_forward`. `sysctl -a` lists all of them, `sysctl net.ipv4.ip_forward` shows one, and `sysctl -w net.ipv4.ip_forward=1` changes it immediately, but only until reboot. To make it persistent, put the setting in a file under `/etc/sysctl.d/` (or in `/etc/sysctl.conf`) and apply it with `sysctl --system` or `sysctl -p file`. Boot-time kernel arguments, by contrast, go on the GRUB command line.",
   "```\n# /etc/modprobe.d/local.conf\noptions e1000e InterruptThrottleRate=3000\nblacklist nouveau\n\n# /etc/sysctl.d/90-router.conf\nnet.ipv4.ip_forward = 1\nvm.swappiness = 10\n```",
   "Consider a worked example. You are turning a Linux virtual machine into a router between two subnets. `sysctl net.ipv4.ip_forward` returns 0, so you run `sysctl -w net.ipv4.ip_forward=1` to test and confirm traffic flows between the subnets. Then you create `/etc/sysctl.d/90-router.conf` containing `net.ipv4.ip_forward = 1` and run `sysctl --system` so the setting survives reboots. Later the same host gets a new network card whose driver needs a lower interrupt rate. You read the accepted options with `modinfo e1000e`, test with `modprobe -r e1000e && modprobe e1000e InterruptThrottleRate=3000` from the console (not over that interface), check `/sys/module/e1000e/parameters/`, and then add an `options` line in `/etc/modprobe.d/` so it applies at every load.",
   "Common mistakes: expecting `modprobe` or `sysctl -w` changes to persist; thinking `blacklist` blocks every way of loading a module; using `insmod` and then wondering why a dependency is missing; and editing `/proc/sys` files directly and forgetting that those edits, too, vanish at reboot. Another trap is removing a module that a running device depends on: `modprobe -r` will refuse while the 'Used by' count is above zero, which is a safety feature, not a bug. Finally, remember to rebuild the initramfs when the module in question is loaded before the root filesystem is mounted.",
   "Exam questions tend to be worded around the need. 'Show loaded drivers' is `lsmod`. 'What parameters does this driver accept' is `modinfo`. 'Load a driver and its dependencies' is `modprobe`. 'Prevent a driver loading automatically' is a blacklist in `/etc/modprobe.d`. 'Load at boot' is `/etc/modules-load.d`. 'Change a kernel tunable such as IP forwarding or swappiness, persistently' is a file in `/etc/sysctl.d` applied with `sysctl --system`."
  ],
  "terms": [
   [
    "Kernel module",
    "A loadable piece of kernel code (.ko file), such as a driver, that can be inserted or removed while the system runs."
   ],
   [
    "modprobe",
    "Loads or removes (-r) a module together with its dependencies, reading options from /etc/modprobe.d."
   ],
   [
    "modinfo",
    "Displays a module's file path, description, dependencies and supported parameters."
   ],
   [
    "depmod",
    "Builds the modules.dep dependency map that modprobe uses to load dependencies."
   ],
   [
    "Blacklist",
    "A modprobe.d directive that prevents a module from being loaded automatically by its alias."
   ],
   [
    "sysctl",
    "A tool to view and set kernel runtime parameters under /proc/sys; persistent values go in /etc/sysctl.d/*.conf."
   ]
  ],
  "example": "You are turning a Linux VM into a router between two subnets. sysctl net.ipv4.ip_forward returns 0, so you run sysctl -w net.ipv4.ip_forward=1 to test, confirm traffic flows, then create /etc/sysctl.d/90-router.conf containing net.ipv4.ip_forward = 1 and run sysctl --system so the setting survives reboots.",
  "tip": "Watch for the persistence trap: modprobe and sysctl -w changes vanish at reboot; persistence comes from /etc/modprobe.d or /etc/modules-load.d for modules and /etc/sysctl.d for kernel parameters.",
  "check": [
   [
    "What is the difference between insmod and modprobe?",
    "insmod loads a single module file and does not handle dependencies; modprobe loads by name and automatically loads required dependencies."
   ],
   [
    "How do you permanently stop the nouveau driver from loading automatically?",
    "Add 'blacklist nouveau' to a .conf file in /etc/modprobe.d/ and rebuild the initramfs if the module is loaded early in boot."
   ],
   [
    "Which file path corresponds to the sysctl key vm.swappiness?",
    "/proc/sys/vm/swappiness, because sysctl names replace the slashes after /proc/sys with dots."
   ],
   [
    "You added a line to /etc/sysctl.d/99-local.conf. How do you apply it without rebooting?",
    "Run sysctl --system (or sysctl -p /etc/sysctl.d/99-local.conf), which reads the configuration files and applies their values."
   ]
  ]
 },
 {
  "t": "Files and directories: ls, find, cp, mv, hard vs symbolic links, file, stat",
  "body": [
   "Most day-to-day administration comes down to finding, inspecting, copying and moving files. These commands appear everywhere on the exam, often inside a larger scenario about disk space, permissions or troubleshooting, so it pays to know their most useful options by heart and to understand the inode model underneath them. `ls` lists directory contents. `ls -l` gives the long format: type and permissions, link count, owner, group, size, modification time and name. `-a` shows hidden 'dot' files, `-h` prints human-readable sizes, `-t` sorts by modification time, `-r` reverses the order, `-R` recurses, `-d` lists a directory itself rather than its contents, `-i` shows inode numbers and `-Z` shows SELinux contexts. The first character of the long listing tells you the type: `-` regular file, `d` directory, `l` symbolic link, `b` block device, `c` character device, `p` named pipe, `s` socket.",
   "`find` searches a tree by almost any attribute and can act on the results. Examples: `find /etc -name '*.conf'` (quote wildcards so the shell does not expand them; `-iname` ignores case), `find / -type f -size +100M` for big files, `find /home -user alice`, `find /var/log -mtime +30` for files modified more than 30 days ago, and `find / -perm -4000` for SUID files. Add `-exec cmd {} \\;` to run a command on each match (or `{} +` to pass many at once) and `-delete` to remove matches, carefully. `locate` is faster but searches a prebuilt database updated by `updatedb`, so it can miss files created since the last update.",
   "`cp src dest` copies; `-r` copies directories recursively, `-p` preserves mode, ownership and timestamps, `-a` (archive) copies recursively while preserving everything including links, and `-i` prompts before overwriting. `mv` moves or renames; within the same filesystem it only rewrites the directory entry, so it is instant even for huge files, while across filesystems it must copy and then delete. `rm -r` removes directories, `rmdir` removes only empty ones, `mkdir -p` creates parent directories as needed, and `touch` creates an empty file or updates timestamps.",
   "Links are a favorite exam topic. Every file's data and metadata are described by an inode, and a directory entry is just a name pointing to an inode. A hard link (`ln target linkname`) is a second name for the same inode: both names are equal, the link count in `ls -l` goes up, and the data survives until the last name is removed. Hard links cannot cross filesystems and normally cannot point to directories. A symbolic (soft) link (`ln -s target linkname`) is a small separate file with its own inode containing a path. It can cross filesystems and point to directories, but if the target is deleted or moved, the symlink breaks ('dangling'). `readlink -f` shows where a symlink finally resolves.",
   "`file name` identifies content by examining it rather than trusting the extension, for example reporting that `report.pdf` is really ASCII text or that a binary is an ELF executable. `stat name` shows full inode metadata: size, blocks, inode number, link count, permissions in octal and symbolic form, owner, and the timestamps: access (atime), modify (mtime, contents changed) and change (ctime, metadata such as permissions changed). Many systems also report a birth time. Because `ls -l` shows only mtime by default, `stat` is the tool to reach for when you need to know when permissions or ownership last changed.",
   "Consider a worked example. A disk alert fires on a file server. You run `find /srv -type f -size +1G -mtime +180 -exec ls -lh {} +` to list large files untouched for six months and confirm with their owners. You delete one, but `df` shows no space freed; `stat` on another name reveals the link count was 2, so a hard link elsewhere still references the same data. Finding it with `find /srv -samefile` and removing it frees the space.",
   "Common mistakes: forgetting to quote wildcards in `find -name`, so the shell expands them first; using `cp -r` when ownership and timestamps must be kept (use `-a`); creating a relative symlink from the wrong directory so it points nowhere; assuming deleting a file frees space when another hard link or an open process still holds it; and thinking ctime means creation time, when it is the metadata change time.",
   "Exam questions are usually worded as a requirement. 'Must work across partitions or point to a directory' means a symbolic link. 'Data must stay accessible after the original name is deleted' means a hard link. 'Determine the real type of a file regardless of extension' is `file`. 'Show inode number, link count and all timestamps' is `stat`. 'Search by size, owner, age or permission' is `find`, and 'fast name lookup that missed a new file' hints that the `locate` database needs `updatedb`."
  ],
  "terms": [
   [
    "Inode",
    "The on-disk structure holding a file's metadata and pointers to its data; directory entries map names to inode numbers."
   ],
   [
    "Hard link",
    "An additional directory entry for the same inode; cannot cross filesystems and survives deletion of the other names."
   ],
   [
    "Symbolic link",
    "A separate file that stores a path to a target; can cross filesystems but breaks if the target is removed."
   ],
   [
    "mtime vs ctime",
    "mtime changes when file contents change; ctime changes when metadata such as permissions or ownership changes."
   ],
   [
    "find -exec",
    "A find action that runs a command on each matched file, with {} replaced by the file name."
   ],
   [
    "locate",
    "A fast file-name search that uses a database built by updatedb, so it can miss recently created files."
   ]
  ],
  "example": "A disk alert fires on a file server. You run find /srv -type f -size +1G -mtime +180 -exec ls -lh {} \\; to list large files untouched for six months, confirm with the owners, then archive them. Along the way, stat on one file shows a link count of 2, telling you a hard link elsewhere still references the same data, so deleting one name alone would not free the space.",
  "tip": "If a question says the link must work across partitions or to a directory, the answer is a symbolic link; if it says the data must remain accessible after the original name is deleted, the answer is a hard link.",
  "check": [
   [
    "What happens to a symbolic link when its target file is deleted?",
    "It becomes a dangling link that points to a path that no longer exists, so accessing it fails."
   ],
   [
    "Which find command lists regular files in /var larger than 500 MB?",
    "find /var -type f -size +500M, where -type f limits results to regular files and +500M means larger than 500 MiB."
   ],
   [
    "Why is mv of a 50 GB file within one filesystem almost instant?",
    "Because it only changes the directory entry pointing to the inode; the data blocks do not move."
   ],
   [
    "Which cp option copies a directory tree while preserving ownership, permissions, timestamps and symlinks?",
    "cp -a (archive), which is recursive and preserves all attributes and links."
   ]
  ]
 },
 {
  "t": "Storage: partitions (fdisk, gdisk, parted), lsblk, blkid, UUIDs, /etc/fstab options (nofail, noexec)",
  "body": [
   "Before a disk can hold files, it is normally divided into partitions, each of which gets a filesystem and a mount point. Linux+ expects you to identify disks, create partitions with the right tool for the partition table type, and mount them reliably at boot. The workflow is always the same: identify the disk, partition it, create a filesystem, find its identifier, add it to `/etc/fstab`, and test.",
   "There are two partition table formats. MBR (Master Boot Record) is the legacy format: it supports up to four primary partitions (or three plus an extended partition containing logical ones) and disks up to about 2 TiB with common 512-byte sectors. GPT (GUID Partition Table, where GUID means Globally Unique Identifier) is the modern format used with UEFI: it supports far larger disks, many partitions (128 by default), and keeps a backup copy of the table at the end of the disk. `fdisk` is an interactive tool that today handles both MBR and GPT; `gdisk` is a GPT-focused tool with a similar interface; `parted` handles both and can also be scripted, as in `parted /dev/sdb mklabel gpt` and `parted /dev/sdb mkpart data xfs 1MiB 100%`. Inside fdisk, `n` creates, `p` prints, `t` changes type, `d` deletes and `w` writes; nothing changes on disk until you write, and `q` quits without saving. Note that parted applies changes immediately, with no final write step. Afterwards, `partprobe` asks the kernel to reread the table so the new partition appears without a reboot.",
   "`lsblk` shows block devices as a tree: disks, their partitions, LVM volumes and RAID arrays, with size, type and mount point. `lsblk -f` adds filesystem type, label and UUID. `blkid` prints the attributes of each block device, especially its UUID (Universally Unique Identifier) and filesystem TYPE. Device names such as `/dev/sdb1` can change when disks are added or controllers reorder, but a filesystem's UUID stays the same, which is why you should mount by UUID (or LABEL) rather than by device name. The links under `/dev/disk/by-uuid/` show the same mapping.",
   "`/etc/fstab` lists filesystems to mount at boot. Each line has six fields: device, mount point, filesystem type, options, dump flag (usually 0) and fsck pass order (1 for root, 2 for others, 0 to skip). Options matter for reliability and security. `defaults` means rw, suid, dev, exec, auto, nouser and async. `nofail` lets boot continue if the device is missing; without it, a missing device can drop the system to emergency mode. `noexec` prevents running binaries from that filesystem, a common hardening step for `/tmp` or upload directories. `nosuid` ignores SUID/SGID bits, `nodev` ignores device files, `ro` mounts read-only, and `_netdev` marks network filesystems so they wait for the network.",
   "```\n# device                                   mount    type  options                  dump pass\nUUID=3f2a9c1e-7b4d-4e7a-9d2c-1a2b3c4d5e6f  /backup  xfs   defaults,nofail,noexec   0    2\ntmpfs                                      /tmp     tmpfs defaults,nosuid,nodev    0    0\n```",
   "Consider a worked example. You add a 4 TB disk to a server for backups. `lsblk` shows it as `/dev/sdc` with no partitions. Because it is larger than 2 TiB you create a GPT label and one partition with parted, format it with `mkfs.xfs /dev/sdc1`, get its UUID from `blkid`, and add the `/backup` line shown above. You run `systemctl daemon-reload`, then `mount -a` and `findmnt --verify`, which report no errors, and `df -h /backup` shows the space. Because of `nofail`, the server still boots if the disk is ever removed, and because of `noexec`, nothing copied into the backup area can be run directly from it. Months later a colleague adds a second disk, the device names shift so the backup disk becomes `/dev/sdd`, and the mount still works because fstab refers to the UUID, not the name.",
   "Common mistakes: using `/dev/sdX` names in fstab; forgetting `nofail` on removable or network disks; choosing MBR for a disk over 2 TiB; rebooting to test an fstab edit instead of running `mount -a` first; and forgetting `partprobe` so the kernel does not see the new partition.",
   "Exam questions are usually symptom-based. 'Server hung in emergency mode after a disk was removed or renamed' points to an fstab entry by device name without `nofail`; the fix is `UUID=` plus `nofail`. 'Prevent users running programs from /tmp' is `noexec`. 'Disk larger than 2 TiB' or 'more than four partitions' means GPT. 'Identify the UUID or filesystem type' is `blkid` or `lsblk -f`, and 'verify fstab safely' is `mount -a` or `findmnt --verify`."
  ],
  "terms": [
   [
    "GPT",
    "GUID Partition Table: modern partition scheme supporting very large disks, many partitions and a backup table."
   ],
   [
    "MBR",
    "Master Boot Record: legacy partition scheme limited to four primary partitions and roughly 2 TiB disks."
   ],
   [
    "UUID",
    "A unique identifier stored in a filesystem, used in /etc/fstab so mounts do not depend on device names."
   ],
   [
    "partprobe",
    "Asks the kernel to reread a disk's partition table so changes take effect without a reboot."
   ],
   [
    "nofail",
    "An fstab option that lets boot continue if the device is not present."
   ],
   [
    "noexec",
    "An fstab option that prevents executing binaries stored on that filesystem."
   ]
  ],
  "example": "You add a 4 TB disk to a server for backups. You create a GPT label and one partition with parted, format it with mkfs.xfs, get its UUID from blkid, and add UUID=... /backup xfs defaults,nofail,noexec 0 2 to /etc/fstab. Running mount -a mounts it without errors, and nofail ensures that if the disk is ever removed the server still boots.",
  "tip": "If a scenario asks why a server hung in emergency mode after a disk was removed or renamed, suspect an fstab entry by device name without nofail; the fix is to use UUID= and add nofail where appropriate.",
  "check": [
   [
    "Which partitioning scheme should you use for a 6 TB disk, and why?",
    "GPT, because MBR cannot address disks beyond about 2 TiB with 512-byte sectors."
   ],
   [
    "What does the last field in an /etc/fstab line control?",
    "The fsck pass order at boot: 1 for the root filesystem, 2 for other filesystems, 0 to skip checking."
   ],
   [
    "How do you find the UUID of /dev/sdc1?",
    "Run blkid /dev/sdc1 or lsblk -f, both of which read the identifier stored in the filesystem."
   ],
   [
    "You created a partition with fdisk but it does not appear in lsblk. What should you run?",
    "partprobe (or partprobe /dev/sdX), so the kernel rereads the partition table without a reboot."
   ]
  ]
 },
 {
  "t": "LVM (pvcreate, vgextend, lvextend -r) and software RAID with mdadm",
  "body": [
   "Plain partitions are rigid: growing one usually means repartitioning and moving data. LVM (Logical Volume Manager) adds a flexible layer between disks and filesystems so you can pool space from several disks, grow volumes online and take snapshots. Software RAID (Redundant Array of Independent Disks) with `mdadm` combines disks for redundancy or speed without a hardware controller. Both are core Linux+ storage skills, and they are often used together.",
   "LVM has three layers. A PV (physical volume) is a disk or partition initialized for LVM with `pvcreate /dev/sdb`. A VG (volume group) pools one or more PVs into a single store of space: `vgcreate vgdata /dev/sdb`. An LV (logical volume) is carved from a VG and behaves like a partition: `lvcreate -n lvweb -L 20G vgdata` creates `/dev/vgdata/lvweb` (also reachable as `/dev/mapper/vgdata-lvweb`). You then put a filesystem on the LV and mount it. The display commands `pvs`, `vgs` and `lvs` give one-line summaries, while `pvdisplay`, `vgdisplay` and `lvdisplay` give detail. Internally, space is handed out in fixed-size chunks called extents, which is why `-l` takes a count of extents or a percentage and `-L` takes a size.",
   "Growing storage is where LVM shines. If the VG has free space, `lvextend -L +10G /dev/vgdata/lvweb` adds 10 GiB to the LV, and `lvextend -l +100%FREE` uses all remaining space. The `-r` (`--resizefs`) option also grows the filesystem in the same step, calling the right tool for ext4 or XFS. Without `-r`, you must grow the filesystem yourself with `resize2fs` or `xfs_growfs`, or the extra space stays unused. If the VG is out of space, add a disk: `pvcreate /dev/sdc`, then `vgextend vgdata /dev/sdc`, then extend the LV. Shrinking is riskier: ext4 can be shrunk only while unmounted, and XFS cannot be shrunk at all. LVM snapshots (`lvcreate -s -n snap -L 5G /dev/vgdata/lvweb`) capture a point-in-time view, useful for consistent backups, but they are not backups themselves because they live on the same disks.",
   "Software RAID is built with `mdadm`, which creates `/dev/md` devices. Know the levels: RAID 0 stripes data across disks for speed with no redundancy, so losing any disk loses the array; RAID 1 mirrors data and survives one disk failure; RAID 5 stripes with distributed parity, needs at least three disks and survives one failure; RAID 6 uses double parity, needs at least four disks and survives two failures; RAID 10 stripes across mirrored pairs, needs at least four disks, and gives speed plus redundancy. The block below creates a mirror, checks its status, saves the array definition so it assembles consistently at boot, and replaces a disk: mark it failed, remove it, then add the new one and watch the rebuild in `/proc/mdstat` or with `mdadm --detail /dev/md0`. RAID and LVM are often stacked: RAID provides redundancy underneath, and LVM provides flexible volumes on top, so a PV might be `/dev/md0`.",
   "```\nmdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1\ncat /proc/mdstat\nmdadm --detail --scan >> /etc/mdadm.conf    # /etc/mdadm/mdadm.conf on Debian\nmdadm /dev/md0 --fail /dev/sdc1 --remove /dev/sdc1\nmdadm /dev/md0 --add /dev/sdd1\n```",
   "Consider a worked example. The `/var/lib/pgsql` volume on a database server is at 95 percent. `vgs` shows no free space in the volume group, so you attach a new virtual disk and confirm with `lsblk` that it is `/dev/sdd`. You run `pvcreate /dev/sdd` and `vgextend vgdb /dev/sdd`, and `vgs` now shows free space. Then `lvextend -r -L +50G /dev/vgdb/lvpg` extends the LV and grows its XFS filesystem online. `df -h` confirms the new size, and the database never stops.",
   "Common mistakes: running `lvextend` without `-r` and then wondering why `df` shows the old size; trying to extend an LV before adding the new PV to the VG; attempting to shrink XFS; forgetting to save the array to `mdadm.conf`, so it comes up under a different name after reboot; and treating RAID or snapshots as backups. RAID protects against disk failure, not against deletion, corruption or ransomware, because a mistake is mirrored to every disk instantly.",
   "Exam questions tend to test order and levels. 'Add a new disk's space to an existing volume' means pvcreate, then vgextend, then lvextend. 'LV extended but df unchanged' means the filesystem was not resized. 'Mirror', 'survive one failure with two disks' means RAID 1; 'parity, at least three disks' means RAID 5; 'survive two failures' means RAID 6; 'fastest, no redundancy' means RAID 0. 'Check rebuild progress' is `cat /proc/mdstat`."
  ],
  "terms": [
   [
    "PV / VG / LV",
    "Physical volume (a disk prepared for LVM), volume group (a pool of PVs) and logical volume (a usable volume carved from the pool)."
   ],
   [
    "Extent",
    "The fixed-size unit of space LVM allocates from a volume group to logical volumes."
   ],
   [
    "lvextend -r",
    "Extends a logical volume and resizes its filesystem in the same command."
   ],
   [
    "vgextend",
    "Adds a new physical volume to an existing volume group to increase its free space."
   ],
   [
    "mdadm",
    "The Linux tool for creating, monitoring and managing software RAID arrays (/dev/mdN)."
   ],
   [
    "/proc/mdstat",
    "A kernel status file showing each software RAID array, its members and any rebuild progress."
   ],
   [
    "RAID 5",
    "Striping with distributed parity across at least three disks, surviving the loss of one disk."
   ]
  ],
  "example": "The /var/lib/pgsql volume on a database server is at 95 percent. vgs shows no free space in the volume group, so you attach a new virtual disk, run pvcreate /dev/sdd and vgextend vgdb /dev/sdd, then lvextend -r -L +50G /dev/vgdb/lvpg. The XFS filesystem grows online, df -h confirms the new size, and the database never stops.",
  "tip": "If an LV was extended but df still shows the old size, the filesystem was not resized; the fix is resize2fs (ext4) or xfs_growfs (XFS), or using lvextend -r next time.",
  "check": [
   [
    "Put these in order to add a new disk's space to an existing LV: lvextend, pvcreate, vgextend.",
    "pvcreate the disk, vgextend the volume group with it, then lvextend the logical volume (with -r to grow the filesystem)."
   ],
   [
    "Which RAID level needs at least three disks and survives one disk failure using parity?",
    "RAID 5, which spreads parity across all members so any single disk can be rebuilt."
   ],
   [
    "How do you check whether a software RAID array is rebuilding?",
    "cat /proc/mdstat or mdadm --detail /dev/mdN, both of which show state and recovery progress."
   ],
   [
    "Why is a RAID 1 mirror not a substitute for backups?",
    "Because deletions, corruption and ransomware are written to both disks at once; RAID only protects against hardware failure."
   ]
  ]
 },
 {
  "t": "Filesystems: ext4, XFS, Btrfs; mkfs, mount, resize2fs, xfs_growfs; df and du",
  "body": [
   "A filesystem is the on-disk structure that organizes data into files and directories, tracks free space and stores metadata such as permissions. Linux supports many, but Linux+ focuses on three: ext4, XFS and Btrfs. You need to know how to create each, mount it, grow it, check it, and measure how full it is, and you need to know which operations each one does not support.",
   "ext4 (fourth extended filesystem) is the long-standing default on Debian and Ubuntu. It is a journaling filesystem, meaning it records pending metadata changes in a journal so it can recover quickly after a crash. It can be grown while mounted and shrunk while unmounted, and it is tuned with `tune2fs` and checked with `e2fsck` (via `fsck`) while unmounted. XFS is the default on RHEL and its relatives. It is also journaling, performs very well with large files and parallel I/O (input/output), and can be grown online, but it cannot be shrunk. It is repaired with `xfs_repair`. Btrfs (B-tree filesystem) is a copy-on-write filesystem with built-in features: subvolumes, snapshots, checksums on data and metadata, compression, and its own multi-device RAID modes. It is the default on some distributions, such as openSUSE and Fedora desktop editions, and is managed with the `btrfs` command, for example `btrfs subvolume snapshot` or `btrfs filesystem usage`.",
   "You create a filesystem with `mkfs`, which is a front end for type-specific tools: `mkfs.ext4 /dev/vgdata/lvweb`, `mkfs.xfs /dev/sdb1`, `mkfs.btrfs /dev/sdc`, or `mkfs -t ext4 ...`. Adding `-L name` sets a label. Formatting destroys what was on the device, so double-check the target with `lsblk` first. `mount /dev/sdb1 /data` attaches a filesystem to a directory, and `umount /data` detaches it (note the spelling). `mount -o remount,ro /data` changes options on the fly, and `mount` or `findmnt` with no arguments shows what is mounted. A mount point must exist, and anything already in that directory is hidden while the mount is active. If umount says 'target is busy', a process is using files there; `lsof +D /data` or `fuser -vm /data` shows which one.",
   "Growing is two steps when the underlying device grows: enlarge the partition or LV, then grow the filesystem. For ext4 use `resize2fs /dev/vgdata/lvweb`, which takes the device name. For XFS use `xfs_growfs /data`, which takes the mount point, because XFS must be mounted to grow. For Btrfs use `btrfs filesystem resize max /data`. `lvextend -r` runs the right tool for you.",
   "`df` reports space per mounted filesystem: `df -h` for human-readable sizes, `df -T` to add the type, and `df -i` for inode usage. A filesystem can be 'full' with free blocks left if it runs out of inodes, which happens with millions of tiny files. `du` reports how much space files and directories consume: `du -sh /var/log` for a total, `du -h --max-depth=1 /var | sort -h` to find the largest subdirectory. When the two disagree, for example df says full but du cannot find the files, the usual causes are deleted files still held open by a process, or data hidden underneath a mount point.",
   "Consider a worked example. A developer asks for more room in `/srv/app`, an XFS filesystem on LVM. `df -hT /srv/app` confirms the type and usage. You run `lvextend -L +20G /dev/vgapp/lvsrv`, then `xfs_growfs /srv/app`, and `df -h` shows the extra 20 GiB, all without unmounting or restarting the application. A week later `/var` reports 100 percent but `du` finds far less. `lsof +L1` lists a deleted 15 GB log file still held open by a service, and restarting that service releases the space.",
   "Common mistakes: passing a mount point to `resize2fs` or a device to `xfs_growfs` in a question that tests the difference; trying to shrink XFS (you must back up, recreate smaller and restore); running `fsck` on a mounted filesystem, which can corrupt it; formatting the wrong device because you skipped `lsblk`; mounting over a directory that already holds data and thinking the data vanished; and ignoring inode exhaustion when `df -h` shows free space but writes fail with 'No space left on device'.",
   "Exam questions tend to be phrased as needs. 'Default on RHEL, grow online, cannot shrink' is XFS. 'Copy-on-write, subvolumes, snapshots, checksums' is Btrfs. 'Can be shrunk offline' is ext4. 'Grow after lvextend' points to `resize2fs` (ext4) or `xfs_growfs` (XFS). 'Which filesystem is full' is `df`; 'which directory is using the space' is `du`. 'Target is busy' points to `lsof` or `fuser`."
  ],
  "terms": [
   [
    "Journaling",
    "A technique where a filesystem logs pending metadata changes so it can recover consistently after a crash."
   ],
   [
    "XFS",
    "A high-performance journaling filesystem, default on RHEL, that can grow online but cannot shrink."
   ],
   [
    "Btrfs",
    "A copy-on-write filesystem with subvolumes, snapshots, checksums and integrated multi-device support."
   ],
   [
    "resize2fs",
    "Grows or shrinks an ext2/3/4 filesystem to fit its device."
   ],
   [
    "xfs_growfs",
    "Grows a mounted XFS filesystem, specified by its mount point."
   ],
   [
    "df vs du",
    "df reports free and used space per filesystem; du totals the space used by files and directories."
   ],
   [
    "Inode exhaustion",
    "A filesystem running out of inodes, so no new files can be created even though free blocks remain; seen with df -i."
   ]
  ],
  "example": "A developer asks for more room in /srv/app, an XFS filesystem on LVM. You run lvextend -L +20G /dev/vgapp/lvsrv, then xfs_growfs /srv/app, and df -h /srv/app now shows the extra 20 GiB, all without unmounting or restarting the application. The developer never notices a pause.",
  "tip": "Exam items love the XFS shrink trap: XFS cannot be reduced in size, so shrinking requires backing up, recreating the filesystem smaller and restoring.",
  "check": [
   [
    "Which command grows an XFS filesystem mounted at /data after its LV was extended?",
    "xfs_growfs /data, which takes the mount point because XFS must be mounted to grow."
   ],
   [
    "df shows /home at 100 percent, but du -sh /home reports far less. Name one likely cause.",
    "A deleted file is still held open by a running process, so its space is not released until the process closes it or is restarted."
   ],
   [
    "Which filesystem among ext4, XFS and Btrfs provides built-in snapshots and data checksums?",
    "Btrfs, whose copy-on-write design makes snapshots and checksums part of the filesystem."
   ],
   [
    "Writes fail with 'No space left on device' but df -h shows free space. What should you check?",
    "df -i, because the filesystem may have run out of inodes from a very large number of small files."
   ]
  ]
 },
 {
  "t": "Network configuration: ip, nmcli, netplan, hostnamectl, /etc/hosts, /etc/resolv.conf, nsswitch.conf",
  "body": [
   "A Linux server is only useful if it can talk on the network, so Linux+ expects you to view and change addresses, routes, hostnames and name resolution with the tools found on current distributions. The key idea is that some commands change the running state only, while others write persistent configuration. Mixing them up is the most common cause of a server that works until its next reboot. The `ip` command from the iproute2 package replaced older tools such as `ifconfig`, `route` and `arp`. `ip addr show` (or `ip a`) lists interfaces and addresses, `ip link set eth0 up` enables an interface, `ip addr add 192.168.10.5/24 dev eth0` adds an address, `ip route show` displays the routing table, `ip route add default via 192.168.10.1` sets a default gateway, and `ip neigh` shows the ARP (Address Resolution Protocol) neighbor cache. Changes made with `ip` take effect immediately but are lost at reboot. `ss -tulpn` complements it by listing listening sockets.",
   "For persistent settings, most RHEL-family and many desktop systems use NetworkManager, controlled with `nmcli`. NetworkManager stores connection profiles, separate from device names, and one device can have several profiles. Useful commands: `nmcli device status`, `nmcli connection show`, and a static address change such as `nmcli con mod eth0 ipv4.addresses 192.168.10.5/24 ipv4.gateway 192.168.10.1 ipv4.dns 192.168.10.53 ipv4.method manual`, followed by `nmcli con up eth0` to apply. `nmtui` offers a text menu for the same tasks.",
   "Ubuntu uses netplan: you describe interfaces in YAML (YAML Ain't Markup Language) files under `/etc/netplan/`, and netplan renders them for a backend, either systemd-networkd or NetworkManager. After editing, `netplan try` applies the change and rolls it back automatically unless you confirm, which protects you from locking yourself out of a remote server; `netplan apply` applies it directly. YAML is indentation-sensitive, so a stray tab or misaligned key is a common error.",
   "```\nnetwork:\n  version: 2\n  ethernets:\n    ens3:\n      addresses: [10.0.5.20/24]\n      routes:\n        - to: default\n          via: 10.0.5.1\n      nameservers:\n        addresses: [10.0.5.53]\n```",
   "`hostnamectl` shows and sets the hostname, writing `/etc/hostname`: `hostnamectl set-hostname web01.example.com`. `/etc/hosts` maps names to IP addresses locally, useful for small labs or overrides, for example `192.168.10.20 db01`. `/etc/resolv.conf` lists DNS (Domain Name System) servers as `nameserver` lines and a `search` domain list. On many systems this file is generated by NetworkManager or systemd-resolved, so edit the connection profile rather than the file, or your change will be overwritten. `/etc/nsswitch.conf` (Name Service Switch) decides the order in which sources are consulted: `hosts: files dns` means check `/etc/hosts` first, then DNS. The same file controls user (`passwd:`) and group lookups, which is how SSSD (System Security Services Daemon) or LDAP accounts are wired in. `getent hosts name` follows nsswitch, while `dig` queries DNS directly.",
   "Consider a worked example. A RHEL server must move to a static address. Working over its console, not SSH, you run `nmcli con mod ens192 ipv4.method manual ipv4.addresses 10.0.5.20/24 ipv4.gateway 10.0.5.1 ipv4.dns 10.0.5.53`, then `nmcli con up ens192`. `ip a` confirms the address, `ip route` shows the default route, and `getent hosts intranet.example.com` resolves. One internal name still points to an old address; `dig` returns the right answer, so you check `/etc/hosts`, find a stale entry, and remove it. A final reboot during the maintenance window proves the settings persist.",
   "Common mistakes: using `ip addr add` and expecting it to survive reboot; editing a generated `/etc/resolv.conf` by hand; testing name resolution only with `dig` and missing a hosts-file override; tabs in netplan YAML; and changing the address of the interface you are connected through without a rollback plan such as `netplan try`. Another frequent slip is forgetting the prefix length, for example giving `10.0.5.20` with no `/24`, which can produce an unexpected netmask. Also remember that `nmcli con mod` only edits the saved profile; nothing changes on the wire until you bring the connection up again or reapply it.",
   "Exam questions usually ask which change persists or which file controls a behavior. 'Survives reboot' rules out `ip`; the answer is an `nmcli` profile, netplan YAML or the distribution's config files. 'Name resolves differently from DNS' points to `/etc/hosts` and `nsswitch.conf` order. 'Set the hostname permanently' is `hostnamectl set-hostname`. 'Safely apply network changes remotely on Ubuntu' is `netplan try`. 'Show routing table' is `ip route`, and 'which service is listening on a port' is `ss -tulpn`."
  ],
  "terms": [
   [
    "iproute2 (ip)",
    "The modern suite for viewing and changing interfaces, addresses, routes and neighbors; changes are not persistent."
   ],
   [
    "nmcli",
    "Command-line client for NetworkManager that manages persistent connection profiles."
   ],
   [
    "netplan",
    "Ubuntu's YAML-based network configuration system that renders settings for systemd-networkd or NetworkManager."
   ],
   [
    "hostnamectl",
    "systemd tool that shows and permanently sets the system hostname."
   ],
   [
    "/etc/resolv.conf",
    "Lists DNS nameservers and search domains used by the system resolver."
   ],
   [
    "nsswitch.conf",
    "Defines the order of lookup sources (files, dns, sss, etc.) for hosts, users, groups and more."
   ]
  ],
  "example": "A RHEL server must move to a static address. Working over its console, you run nmcli con mod ens192 ipv4.method manual ipv4.addresses 10.0.5.20/24 ipv4.gateway 10.0.5.1 ipv4.dns 10.0.5.53, then nmcli con up ens192. ip a confirms the address, ip route shows the default route, and getent hosts intranet.example.com resolves correctly.",
  "tip": "If a question asks which change survives a reboot, ip addr add is the wrong answer; persistent changes come from nmcli connection profiles, netplan YAML or the distribution's config files.",
  "check": [
   [
    "A name resolves to an unexpected IP even though DNS is correct. What two files should you check?",
    "/etc/hosts, which may contain an override, and /etc/nsswitch.conf, which controls whether files are checked before DNS."
   ],
   [
    "Why is netplan try safer than netplan apply on a remote server?",
    "netplan try reverts the configuration automatically if you do not confirm within the timeout, so a mistake cannot permanently lock you out."
   ],
   [
    "Which command permanently sets the hostname to app02?",
    "hostnamectl set-hostname app02, which updates /etc/hostname and the running hostname."
   ],
   [
    "Which command shows the routing table, including the default gateway?",
    "ip route show (or ip r), which lists routes such as 'default via 10.0.5.1 dev ens192'."
   ]
  ]
 },
 {
  "t": "Shell operations: redirection, pipes, environment variables, grep, sed, awk, cut, sort, uniq, tr",
  "body": [
   "The Linux shell's real power comes from combining small tools. Each program reads text, transforms it and writes text, and redirection and pipes connect them into a pipeline. Linux+ performance-based questions often ask you to build or interpret one of these one-liners, so read them left to right and ask what each stage receives and passes on. Every process has three standard streams: stdin (standard input, file descriptor 0), stdout (standard output, 1) and stderr (standard error, 2). `>` redirects stdout to a file, overwriting it; `>>` appends; `<` feeds a file to stdin. `2>` redirects errors, `2>/dev/null` discards them, and `&>` or `> file 2>&1` sends both output and errors to the same file. Order matters: `cmd > out 2>&1` works, while `cmd 2>&1 > out` sends errors to the terminal. A pipe `|` connects one command's stdout to the next command's stdin, and `tee file` copies the stream to a file while passing it on. A here-document (`<<EOF`) feeds inline text as input.",
   "Environment variables carry settings to programs. `NAME=value` sets a shell variable; `export NAME` makes it an environment variable inherited by child processes. `echo $PATH` shows the directory search list for commands, `env` or `printenv` lists the environment, and `unset NAME` removes a variable. Persistent settings go in startup files: `~/.bashrc` for interactive shells, `~/.bash_profile` or `~/.profile` for login shells, and `/etc/profile` or `/etc/profile.d/*.sh` for everyone. After editing, `source ~/.bashrc` loads the change into the current shell.",
   "`grep` searches for patterns: `-i` ignores case, `-v` inverts the match, `-r` recurses, `-n` shows line numbers, `-c` counts matching lines, `-E` enables extended regular expressions, and `-w` matches whole words. `cut` extracts fields or columns: `cut -d: -f1 /etc/passwd` prints usernames. `sort` orders lines (`-n` numeric, `-r` reverse, `-k2` by field 2, `-h` human sizes, `-u` unique), and `uniq` collapses adjacent duplicates, which is why it almost always follows `sort`; `uniq -c` counts them. `tr` translates or deletes characters from stdin only: `tr 'a-z' 'A-Z'` uppercases, `tr -d '\\r'` strips Windows carriage returns, `tr -s ' '` squeezes repeated spaces.",
   "`sed` is a stream editor. The most common use is substitution: `sed 's/old/new/g' file` prints the file with every match replaced, and `sed -i 's/old/new/g' file` edits it in place (add a suffix, as in `-i.bak`, to keep a backup). Without `g`, only the first match on each line changes. `sed -n '5,10p'` prints lines 5 to 10, and `sed '/^#/d'` deletes comment lines. `awk` processes records field by field, splitting on whitespace by default: `awk '{print $1}'` prints the first field, `awk -F: '$3 >= 1000 {print $1}' /etc/passwd` lists regular users, and `awk '{sum += $5} END {print sum}'` totals a column.",
   "```bash\n# top five client IPs in a web log\nawk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -5\n```",
   "Consider a worked example. You need a list of every account that uses bash as its shell. `grep '/bin/bash$' /etc/passwd` finds the lines (the `$` anchors the match to the end of the line), `| cut -d: -f1` keeps only the usernames, and `| sort` orders them. Adding `> bash-users.txt 2>/dev/null` saves the list while discarding any errors. The same result comes from `awk -F: '$7 == \"/bin/bash\" {print $1}' /etc/passwd | sort`, which shows how awk can replace a grep and cut pair, since it both filters and prints a field.",
   "Common mistakes: piping unsorted data into `uniq`; writing `2>&1` before the file redirection; using `>` when you meant `>>` and wiping a log; forgetting `export`, so a child script cannot see a variable; passing a file name to `tr` (it reads only stdin, so use `tr ... < file`); and running `sed -i` on a config file without a backup. Also watch quoting: single quotes stop the shell expanding `$1` inside an awk program, while double quotes let the shell substitute its own variables first, which silently breaks the script.",
   "Exam questions often show a pipeline and ask for its output, or describe a goal and ask which tool fits. 'Replace text in a file' is `sed`. 'Print a column or do arithmetic on fields' is `awk`. 'Extract a delimited field' is `cut -d -f`. 'Count occurrences' is `sort | uniq -c`. 'Change case or delete characters' is `tr`. 'Save output and still see it' is `tee`. 'Discard errors' is `2>/dev/null`, and 'make a variable visible to child processes' is `export`."
  ],
  "terms": [
   [
    "File descriptor",
    "A number identifying an open stream: 0 is stdin, 1 is stdout and 2 is stderr."
   ],
   [
    "Pipe",
    "The | operator that sends one command's standard output to another command's standard input."
   ],
   [
    "export",
    "Marks a shell variable so it is passed to child processes as an environment variable."
   ],
   [
    "tee",
    "Copies its standard input to a file and to standard output at the same time."
   ],
   [
    "sed",
    "A stream editor used mainly for search-and-replace and line filtering; -i edits files in place."
   ],
   [
    "awk",
    "A pattern-scanning language that splits lines into fields ($1, $2 ...) for filtering and reporting."
   ]
  ],
  "example": "You need a list of every account that uses bash as its shell. Running grep '/bin/bash$' /etc/passwd | cut -d: -f1 | sort prints the usernames alphabetically, and adding > bash-users.txt 2>/dev/null saves the list while discarding any errors. You attach the file to an access review ticket.",
  "tip": "uniq only removes adjacent duplicates, so answers that pipe unsorted data into uniq -c are usually wrong; look for sort before uniq.",
  "check": [
   [
    "How do you send both stdout and stderr of a backup script to backup.log, appending?",
    "backup.sh >> backup.log 2>&1 (or backup.sh &>> backup.log in bash); the 2>&1 must come after the file redirection."
   ],
   [
    "What does sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config do?",
    "It edits the file in place, replacing the first occurrence on each line of 'PermitRootLogin yes' with 'PermitRootLogin no'."
   ],
   [
    "Which command prints only the first field of /etc/group using a colon delimiter?",
    "cut -d: -f1 /etc/group (or awk -F: '{print $1}' /etc/group)."
   ],
   [
    "A variable set in your shell is empty inside a script you run. What was missing?",
    "export; without it the variable is a shell variable only and is not passed to child processes."
   ]
  ]
 },
 {
  "t": "Backup and restore: tar, gzip/xz/bzip2, rsync, dd, cpio",
  "body": [
   "Backups are only useful if you can restore from them, so it helps to understand what each tool captures and how to get the data back. Linux+ tests the classic command-line tools and their key options, and expects you to pick the right one for a scenario: an archive of files, an efficient mirror, a raw disk image, or a file list piped from `find`.",
   "`tar` (tape archive) bundles files and directories into a single archive while preserving paths, permissions and ownership. The core modes are `-c` create, `-x` extract and `-t` list contents, with `-f` naming the archive file and `-v` for verbose output. Compression is added with a flag: `-z` for gzip (`.tar.gz` or `.tgz`), `-j` for bzip2 (`.tar.bz2`) and `-J` for xz (`.tar.xz`). So `tar -czvf etc-backup.tar.gz /etc` creates a compressed backup, `tar -tzf etc-backup.tar.gz` lists it, and `tar -xzvf etc-backup.tar.gz -C /restore` extracts into a chosen directory. When you extract as root, tar restores stored permissions and ownership by default; an ordinary user can add `-p` to keep stored permissions instead of applying their umask. tar strips the leading `/` from paths, so extraction lands relative to the current directory or `-C` target.",
   "The compressors also work alone on single files. `gzip file` produces `file.gz` and removes the original; `gunzip` or `gzip -d` reverses it. `bzip2` usually compresses smaller but slower, and `xz` usually gives the smallest output at the cost of more CPU time and memory. Each has a matching tool to read compressed text without extracting: `zcat`, `bzcat`, `xzcat`. The general trade-off to remember is gzip fastest, xz smallest. None of them bundles multiple files, which is why they pair with tar.",
   "`rsync` synchronizes files between directories or hosts, copying only what changed, which makes it ideal for repeated backups. `rsync -av /srv/ backup01:/backups/srv/` copies in archive mode (recursive, preserving permissions, times, links, owner and group) over SSH (Secure Shell). `--delete` removes files at the destination that no longer exist at the source, making an exact mirror, and `-n` (`--dry-run`) shows what would happen. A trailing slash on the source means 'copy the contents of this directory' rather than the directory itself, a detail that often appears on exams.",
   "`dd` copies raw blocks, ignoring filesystems entirely. `dd if=/dev/sda of=/backup/sda.img bs=4M status=progress` images a whole disk, and swapping `if` and `of` restores it. It is also used to write installation images to USB drives and to back up a boot sector with `bs=512 count=1`. Because it overwrites the output device without asking, confirm device names with `lsblk` first. Images of mounted, changing filesystems may be inconsistent, so image unmounted or snapshotted devices. `cpio` (copy in, copy out) is an older archiver that reads the list of files to archive from stdin, so it pairs naturally with `find`: `find /etc | cpio -ov > etc.cpio` creates an archive and `cpio -idv < etc.cpio` extracts it. You still meet it because initramfs images and RPM package payloads use cpio format.",
   "Consider a worked example. Each night a cron job runs `rsync -a --delete /var/www/ backup01:/backups/www/` so the backup server holds an exact mirror, and once a week `tar -cJf /archive/www-$(date +%F).tar.xz /var/www` creates a compressed point-in-time archive. When a developer deletes a directory by mistake, you restore it from last night's rsync copy within minutes. When corruption is discovered that started four days ago, the mirror has already copied the damage, so you extract the older weekly archive with `tar -xJf ... -C /restore` and copy back only the affected files.",
   "Common mistakes: mixing up the tar letters, such as using `-z` on an xz file; forgetting `-f`, so tar tries a tape device; omitting or adding the rsync trailing slash and nesting a directory one level too deep; running `rsync --delete` in the wrong direction and mirroring an empty source over a good backup (a dry run with `-n` prevents this); swapping `if` and `of` in `dd`; and never testing restores. Keep more than one copy, store at least one away from the original system, and remember that a mirror alone is not history.",
   "Exam questions pair a need with a tool. 'Bundle a directory into one compressed file' is `tar` with `-z`, `-j` or `-J`. 'Smallest file' points to xz; 'fastest' points to gzip. 'Copy only changes', 'mirror to a remote host' is `rsync`. 'Bit-for-bit disk image' or 'write an ISO to USB' is `dd`. 'Archive the file list produced by find' or 'initramfs format' is `cpio`. 'List contents without extracting' is `tar -t`."
  ],
  "terms": [
   [
    "tar",
    "Archiving tool that bundles files while preserving metadata; -c create, -x extract, -t list, -f file, with -z/-j/-J for gzip/bzip2/xz."
   ],
   [
    "rsync",
    "Incremental file synchronization tool that transfers only differences, locally or over SSH."
   ],
   [
    "dd",
    "Block-level copy tool used for disk images and writing raw devices; if= input, of= output."
   ],
   [
    "cpio",
    "Archiver that takes file lists on stdin, commonly paired with find; used in initramfs and RPM payloads."
   ],
   [
    "xz",
    "A compressor that usually achieves higher compression than gzip or bzip2 at the cost of speed."
   ],
   [
    "rsync --delete",
    "Removes files from the destination that no longer exist at the source, producing an exact mirror."
   ]
  ],
  "example": "Each night a cron job runs rsync -a --delete /var/www/ backup01:/backups/www/ so the backup server holds an exact mirror, and once a week tar -cJf /archive/www-$(date +%F).tar.xz /var/www creates a compressed point-in-time archive. When a developer deletes a directory by mistake, you restore it from last night's rsync copy within minutes.",
  "tip": "Match the tar letters carefully: z is gzip, j is bzip2, J is xz; and c, x and t are create, extract and list.",
  "check": [
   [
    "Which command lists the contents of backup.tar.bz2 without extracting it?",
    "tar -tjf backup.tar.bz2, where t lists, j handles bzip2 and f names the file."
   ],
   [
    "What is the difference between rsync -a /data/ dest/ and rsync -a /data dest/?",
    "With the trailing slash the contents of /data are copied into dest; without it the directory data itself is created inside dest."
   ],
   [
    "Why is dd risky, and how do you reduce the risk?",
    "It overwrites the output device without confirmation; verify device names with lsblk and double-check if= and of= before running it."
   ],
   [
    "Why keep dated tar archives when you already have a nightly rsync mirror?",
    "Because a mirror copies deletions and corruption on the next run; dated archives let you restore from a point before the problem began."
   ]
  ]
 },
 {
  "t": "Virtualization: KVM/QEMU, libvirt and virsh, virt-install, qcow2 vs raw images",
  "body": [
   "Virtualization lets one physical host run several isolated operating systems, called guests or VMs (virtual machines). On Linux the standard open-source stack is KVM, QEMU and libvirt. Linux+ expects you to know what each layer does, manage guests from the command line and choose a disk image format. It also helps to keep the difference from containers clear: a VM runs its own kernel on virtual hardware, while a container shares the host kernel.",
   "KVM (Kernel-based Virtual Machine) is a set of kernel modules (`kvm` plus `kvm_intel` or `kvm_amd`) that turns Linux into a type 1 hypervisor by using the CPU's hardware virtualization extensions, Intel VT-x or AMD-V. You can check for support with `grep -E 'vmx|svm' /proc/cpuinfo` and confirm the modules with `lsmod | grep kvm`; if the extensions are disabled in firmware, KVM cannot run and `/dev/kvm` will be missing. QEMU (Quick Emulator) provides the rest of the virtual machine: emulated or paravirtualized devices such as disks, network cards and graphics. With KVM underneath, QEMU runs guest code directly on the CPU at near-native speed. Paravirtualized virtio drivers for disk and network give the best guest performance because the guest knows it is virtualized and skips slow hardware emulation.",
   "libvirt is a management layer with a daemon (`libvirtd`, or modular daemons such as `virtqemud` on newer systems) and API that controls QEMU/KVM and other hypervisors consistently. It stores each guest's configuration as XML, manages virtual networks such as the default NAT (Network Address Translation) network on bridge `virbr0`, and manages storage pools, commonly `/var/lib/libvirt/images`. Tools on top include `virsh` (command line), `virt-manager` (graphical) and `virt-install` (guest creation). A bridged network, by contrast with NAT, puts guests directly on the physical LAN (local area network) with their own addresses. Useful `virsh` commands: `virsh list --all` shows running and stopped guests, `virsh start web01`, `virsh shutdown web01` (a graceful ACPI shutdown request the guest must honor), `virsh destroy web01` (an immediate power-off that does not delete anything, despite the name), `virsh reboot`, `virsh autostart web01` to start with the host, `virsh dumpxml web01` to view the configuration, `virsh edit web01` to change it safely, and `virsh console web01` for a serial console. `virsh undefine` removes the guest's definition, and `virsh snapshot-create-as` creates snapshots. `virt-install` creates a guest in one command, for example `virt-install --name web01 --memory 2048 --vcpus 2 --disk size=20 --cdrom /isos/installer.iso --os-variant <variant> --network network=default`; `osinfo-query os` lists valid variant names, and `--import` boots an existing disk instead of installing.",
   "Disk images come in two main formats. Raw is a plain byte-for-byte image: simple, fast and portable, but without features; it may be allocated fully or as a sparse file. qcow2 (QEMU copy-on-write version 2) is thin-provisioned so it grows as data is written, and supports internal snapshots, backing files (a thin overlay on a shared base image) and compression, with a small performance cost. Choose qcow2 for flexibility and snapshots; choose raw when maximum simplicity or performance matters.",
   "```\nqemu-img create -f qcow2 disk.qcow2 20G\nqemu-img info disk.qcow2          # format, virtual size, actual size\nqemu-img convert -f raw -O qcow2 in.img out.qcow2\nqemu-img create -f qcow2 -b golden.qcow2 -F qcow2 test01.qcow2\n```",
   "Consider a worked example. You need a throwaway test VM based on a golden image. The last command above creates `test01.qcow2`, a small overlay that stores only changes while `golden.qcow2` stays untouched. `virt-install --name test01 --memory 2048 --vcpus 2 --disk test01.qcow2 --import --os-variant <variant>` defines and boots it, and `virsh list --all` shows it running. When testing ends, `virsh destroy test01` forces it off and `virsh undefine test01` removes the definition; deleting the overlay file reclaims the space.",
   "Common mistakes: reading `virsh destroy` as 'delete'; expecting `virsh shutdown` to work on a guest with no ACPI support or a hung OS; forgetting to enable VT-x or AMD-V in firmware; modifying a backing image that overlays depend on, which corrupts them; and assuming a thin qcow2 image's virtual size is the space it currently uses (check `qemu-img info`).",
   "Exam questions tend to map words to layers and commands. 'Kernel module that uses CPU extensions' is KVM. 'Emulates devices' is QEMU. 'Manage guests from the command line' is `virsh`; 'create a guest in one command' is `virt-install`. 'Force off' is `destroy`, 'remove definition' is `undefine`, 'start with host' is `autostart`. 'Thin provisioning, snapshots, backing file' points to qcow2; 'simplest, best raw performance' points to raw. 'Fastest guest disk and network' points to virtio."
  ],
  "terms": [
   [
    "KVM",
    "Kernel-based Virtual Machine: kernel modules that use CPU virtualization extensions to make Linux a hypervisor."
   ],
   [
    "QEMU",
    "The emulator that supplies virtual hardware and, with KVM, runs guests at near-native speed."
   ],
   [
    "libvirt / virsh",
    "A management API and daemon for hypervisors, and its command-line client for controlling guests."
   ],
   [
    "qcow2",
    "A thin-provisioned QEMU disk format supporting snapshots, backing files and compression."
   ],
   [
    "Raw image",
    "A plain byte-for-byte disk image with no metadata features, valued for simplicity and performance."
   ],
   [
    "virtio",
    "Paravirtualized device drivers that give guests fast disk and network I/O."
   ],
   [
    "Backing file",
    "A read-only base image that a qcow2 overlay refers to, storing only the overlay's changes."
   ]
  ],
  "example": "You need a throwaway test VM based on a golden image. qemu-img create -f qcow2 -b golden.qcow2 -F qcow2 test01.qcow2 creates a small overlay that only stores changes, virt-install --import boots it, and when testing ends virsh destroy and virsh undefine remove it while the golden image stays untouched.",
  "tip": "virsh destroy only forces a guest off, like pulling the power cord; it does not delete the VM. Removing the definition is virsh undefine.",
  "check": [
   [
    "How can you verify that a host CPU supports hardware virtualization?",
    "Look for the vmx (Intel) or svm (AMD) flag in /proc/cpuinfo, for example with grep -E 'vmx|svm' /proc/cpuinfo."
   ],
   [
    "Which disk format supports snapshots and thin provisioning: raw or qcow2?",
    "qcow2, whose copy-on-write design allocates space as data is written and supports snapshots and backing files."
   ],
   [
    "Which virsh command makes a guest start automatically when the host boots?",
    "virsh autostart <guest>, which marks the guest to be started by libvirt at host boot."
   ],
   [
    "What is the difference between virsh shutdown and virsh destroy?",
    "shutdown asks the guest OS to power off gracefully; destroy immediately cuts power to the guest without deleting it."
   ]
  ]
 },
 {
  "t": "Local accounts and groups: useradd, usermod -aG, userdel, groupadd, passwd, chage",
  "body": [
   "Every process on Linux runs as some user, and access to files and commands follows from that user and its groups. Creating and maintaining local accounts is basic administration work and a steady source of Linux+ questions, especially around options that are easy to mix up. These commands all edit the account files for you, which is safer than editing them by hand.",
   "`useradd` creates an account. Useful options: `-m` creates the home directory (copying files from `/etc/skel`), `-d` sets a custom home path, `-s /bin/bash` sets the login shell, `-c 'Full Name'` sets the comment (GECOS) field, `-u` sets a specific UID (user ID), `-g` sets the primary group and `-G` sets supplementary groups. Whether the home directory is created by default depends on `/etc/login.defs` (`CREATE_HOME`), which differs between distributions, so passing `-m` is the safe habit. Debian-family systems also have `adduser`, a friendlier interactive wrapper. System accounts for services are created with `useradd -r`, which gives them a UID from the system range and, typically, no home directory; pair it with `-s /sbin/nologin` so nobody can log in as the service.",
   "`passwd alice` sets or changes a user's password; run by a normal user, `passwd` changes their own. `passwd -l` locks an account by prefixing the stored hash with `!`, `passwd -u` unlocks it, and `passwd -S` shows status. Locking the password does not block SSH key logins; to fully disable an account, also expire it (`usermod -e 1` or `chage -E 0`) or set its shell to `/sbin/nologin`. `usermod` changes an existing account. The most tested detail is group membership: `usermod -aG wheel alice` appends alice to the wheel group. Without `-a`, `-G` replaces the full list of supplementary groups, silently removing her from any group not listed. Other options: `-s` changes the shell, `-L`/`-U` lock and unlock, `-l` renames the login, `-d /new/home -m` moves the home directory, and `-e YYYY-MM-DD` sets an account expiry date.",
   "`userdel alice` removes the account but leaves her files; `userdel -r alice` also removes the home directory and mail spool. Before deleting, consider finding files she owns elsewhere with `find / -user alice`, since leftover files will show a bare UID and could be inherited by a future user who receives that UID. Groups are managed with `groupadd devs`, `groupmod -n` to rename, `groupdel` to delete, and `gpasswd -a user group` or `gpasswd -d user group` to add or remove members. Each user has one primary group (given to new files) and any number of supplementary groups (used for access). Group changes take effect at the user's next login; `id alice` or `groups alice` confirms membership, and `newgrp` can switch the primary group in the current shell. `chage` manages password aging. `chage -l alice` lists the policy, `-M 90` sets maximum days between changes, `-m 1` minimum days, `-W 7` warning days, `-I` inactive days after expiry before the account is disabled, `-E 2026-12-31` an account expiration date, and `-d 0` forces a password change at next login, which is common when handing a new user a temporary password.",
   "```\nuseradd -m -s /bin/bash -c 'Priya Shah' -G devs priya\npasswd priya\nchage -d 0 priya\nusermod -aG docker priya\nid priya\n```",
   "Consider a worked example. A new developer, Priya, starts today. You run the commands above: create the account with a home directory, bash shell, comment and the devs group; set a temporary password; and force her to change it at first login with `chage -d 0`. A month later she needs container access, so `usermod -aG docker priya` appends the group, `id priya` confirms it, and you remind her to log out and back in. When a contractor leaves, you lock the account with `usermod -L -e 1 contractor` right away and delete it with `userdel -r` after their files are archived.",
   "Common mistakes: using `usermod -G` without `-a` and wiping existing memberships; expecting a group change to apply in an already open session; assuming `passwd -l` stops SSH key logins; running `userdel -r` before archiving needed files; and forgetting `-m`, so the user logs in to no home directory.",
   "On the exam, 'add to a group without affecting existing memberships' means `-aG`; 'force a password change at next login' means `chage -d 0`; 'remove the user and home directory' means `userdel -r`; 'set account to expire on a date' means `chage -E` or `usermod -e`; and 'user still cannot use the new group' means they must log in again."
  ],
  "terms": [
   [
    "UID / GID",
    "Numeric user and group identifiers the kernel actually uses for ownership and permission checks."
   ],
   [
    "Primary group",
    "The group assigned to a user in /etc/passwd and given to files the user creates."
   ],
   [
    "Supplementary group",
    "Additional groups a user belongs to, listed in /etc/group, that grant extra access."
   ],
   [
    "usermod -aG",
    "Appends a user to supplementary groups without removing existing memberships."
   ],
   [
    "chage",
    "Command that views and sets password aging and account expiry for a user."
   ],
   [
    "System account",
    "A low-privilege account created with useradd -r for running a service, usually with no login shell."
   ]
  ],
  "example": "A new developer, Priya, starts today. You run useradd -m -s /bin/bash -c 'Priya Shah' -G devs priya, set a temporary password with passwd priya, and force her to change it at first login with chage -d 0 priya. A month later she needs container access, so you run usermod -aG docker priya and remind her to log out and back in.",
  "tip": "The classic trap is usermod -G without -a: it replaces all supplementary groups. When a question says 'add to a group without affecting existing memberships', the answer includes -aG.",
  "check": [
   [
    "What does chage -d 0 bob do?",
    "It sets bob's last password change date to 0, forcing him to change his password at the next login."
   ],
   [
    "Which command removes user carol and her home directory?",
    "userdel -r carol, since plain userdel leaves the home directory and mail spool behind."
   ],
   [
    "After usermod -aG sudo dave, dave still cannot use sudo in his current session. Why?",
    "Group membership is read at login, so he must log out and back in (or start a new login session) for the new group to apply."
   ],
   [
    "Why does passwd -l alone not fully disable an account?",
    "It only locks password authentication; SSH key logins still work unless the account is also expired or given a nologin shell."
   ]
  ]
 },
 {
  "t": "Account files: /etc/passwd, /etc/shadow, /etc/group, /etc/skel, /etc/login.defs",
  "body": [
   "The account commands you learned all read and write a handful of plain-text files. Knowing their formats lets you audit accounts quickly, spot misconfigurations and answer exam questions that show you a raw line and ask what it means. Each file is colon-separated, one record per line, which makes them easy to query with `cut`, `awk` and `grep`. `/etc/passwd` holds one line per account with seven fields: username, password placeholder, UID, GID (primary group), GECOS comment, home directory and login shell. For example, `alice:x:1001:1001:Alice Ng:/home/alice:/bin/bash`. The `x` means the real password hash is stored in `/etc/shadow`. The file must be world-readable, because many programs map UIDs to names, which is exactly why hashes were moved out of it. UID 0 is root; system accounts use low UIDs, and regular users start at a threshold set in `/etc/login.defs` (commonly 1000). A shell of `/sbin/nologin` or `/usr/sbin/nologin` prevents interactive logins for service accounts.",
   "`/etc/shadow` stores password hashes and aging data, readable only by root. Its nine fields are: username, hashed password, date of last change (in days since January 1, 1970), minimum days, maximum days, warning days, inactive days, account expiration date and a reserved field. The hash field begins with an identifier of the algorithm, such as `$6$` for SHA-512 crypt or `$y$` for yescrypt, followed by the salt and hash. A leading `!` or `*` means the password is locked or no password login is possible, and an empty field means no password at all, which is a serious security finding. The aging fields are what `chage` edits.",
   "`/etc/group` has four fields: group name, password placeholder, GID and a comma-separated list of supplementary members, for example `devs:x:1050:alice,priya`. A user's primary group is not usually listed here; it comes from the GID field in `/etc/passwd`. `/etc/gshadow` holds group passwords and administrators and is rarely used directly. Edit these files through commands whenever possible. If you must edit by hand, use `vipw` for passwd and `vigr` for group (with `-s` for the shadow versions), which lock the files and check syntax; `pwck` and `grpck` verify consistency. `getent passwd alice` queries accounts through nsswitch, so it also shows users from LDAP (Lightweight Directory Access Protocol) or SSSD that are not in the local files.",
   "`/etc/skel` is the skeleton directory: its contents, typically `.bashrc`, `.bash_profile` and similar dot files, are copied into each new home directory created with `useradd -m`. Put default settings for new users there, knowing that existing users will not receive later changes. `/etc/login.defs` sets site-wide defaults for account tools: UID and GID ranges (`UID_MIN`, `UID_MAX`), default password aging (`PASS_MAX_DAYS`, `PASS_MIN_DAYS`, `PASS_WARN_AGE`), whether to create home directories, the default umask for new homes and the hashing method (`ENCRYPT_METHOD`). These defaults apply when accounts are created, so changing `PASS_MAX_DAYS` does not alter existing users; use `chage` for those. `useradd -D` shows other creation defaults stored in `/etc/default/useradd`.",
   "```\nawk -F: '$3 == 0 {print $1}' /etc/passwd        # accounts with UID 0\nawk -F: '$2 == \"\" {print $1}' /etc/shadow        # empty passwords (run as root)\nawk -F: '$3 >= 1000 {print $1, $7}' /etc/passwd  # regular users and shells\n```",
   "Consider a worked example. During an audit you run the first command above and find a second account, 'backup', with UID 0, which gives it full root privileges regardless of its name. The second command, run as root, reveals a test account with an empty password field. You lock the test account, change the backup account to its own unprivileged UID after checking what depends on it, and confirm with `pwck` that the files are consistent.",
   "Common mistakes: assuming only the account named root has root power (UID 0 is what counts); expecting changes to `/etc/login.defs` or `/etc/skel` to reach existing users; looking for supplementary members in `/etc/passwd`, or for a primary group in `/etc/group`; editing the files with a plain editor while a user tool is also writing them; and misreading `x` as a locked password when it only means 'see shadow'.",
   "Exam questions often show a raw line and ask about one field, or ask which file holds a setting. Count the colons carefully: field 3 of passwd is UID, field 4 is primary GID, field 7 is the shell. 'Hash', 'last change', 'expiry' point to `/etc/shadow`. 'Supplementary members' point to `/etc/group`. 'Default files for new users' is `/etc/skel`. 'Default UID range or password aging for new accounts' is `/etc/login.defs`. 'Safely edit passwd by hand' is `vipw`."
  ],
  "terms": [
   [
    "/etc/passwd",
    "World-readable account database with seven fields: name, x, UID, GID, GECOS, home and shell."
   ],
   [
    "/etc/shadow",
    "Root-only file holding password hashes and password aging and expiry fields."
   ],
   [
    "/etc/group",
    "Group database listing group name, GID and supplementary members."
   ],
   [
    "/etc/skel",
    "Template directory whose files are copied into new users' home directories."
   ],
   [
    "/etc/login.defs",
    "Configuration of defaults for account tools, such as UID ranges and password aging."
   ],
   [
    "vipw / vigr",
    "Tools that lock and safely edit the passwd and group files (and their shadow versions with -s)."
   ]
  ],
  "example": "During an audit you run awk -F: '$3 == 0 {print $1}' /etc/passwd and find a second account, 'backup', with UID 0, which gives it full root privileges. You also run awk -F: '$2 == \"\" {print $1}' /etc/shadow as root to catch accounts with empty passwords. Both findings go into the remediation report.",
  "tip": "Remember which file holds what: hashes and aging live in /etc/shadow, supplementary group members live in /etc/group, and defaults for new accounts come from /etc/login.defs and /etc/skel.",
  "check": [
   [
    "In the line bob:x:1002:100::/home/bob:/sbin/nologin, what does the last field mean?",
    "bob's login shell is nologin, so he cannot log in interactively; this is typical of service accounts."
   ],
   [
    "You changed PASS_MAX_DAYS in /etc/login.defs. Why do existing users still have the old maximum?",
    "login.defs only supplies defaults when accounts are created; existing users must be updated with chage -M."
   ],
   [
    "Why are password hashes in /etc/shadow instead of /etc/passwd?",
    "/etc/passwd must be world-readable, so hashes were moved to root-only /etc/shadow to prevent offline cracking by ordinary users."
   ],
   [
    "What does a hash field beginning with ! in /etc/shadow indicate?",
    "The password is locked, so password logins are refused until the account is unlocked."
   ]
  ]
 },
 {
  "t": "Systemd units: systemctl start/stop/enable/mask, status output, drop-in overrides with systemctl edit",
  "body": [
   "systemd manages almost everything that runs on a modern Linux system through units. A unit is a configuration object of a certain type, named by suffix: `.service` for daemons, `.socket` for socket activation, `.timer` for scheduled jobs, `.mount` for mounts, `.target` for groups of units, and more. `systemctl` is the tool you use to control them, and learning to separate 'now' from 'at boot' is the key to most exam questions.",
   "The basic lifecycle commands act on the running system: `systemctl start httpd`, `stop`, `restart` (stop then start), and `reload` (ask the service to reread its config without stopping, if it supports that). Boot-time behavior is separate: `systemctl enable httpd` creates symlinks, based on the `WantedBy=` line in the unit's `[Install]` section, so the unit starts at boot, and `disable` removes them. The two are independent, which is why `systemctl enable --now httpd` exists to do both at once. `systemctl is-active` and `is-enabled` answer each question in scripts. `mask` goes further than disable: `systemctl mask httpd` links the unit file to `/dev/null`, so it cannot be started at all, manually or as a dependency of another unit, until you `unmask` it. Use it when a service must never run, for example to stop a conflicting service being pulled in.",
   "`systemctl status httpd` is your first diagnostic. It shows the Loaded line (unit file path, and whether it is enabled, disabled or masked), the Active line (active (running), inactive (dead) or failed, with a timestamp), the main PID, the cgroup (control group) of processes, and the last few journal lines. A failed unit also shows the exit code or signal, such as `status=203/EXEC` meaning the executable could not be run. `systemctl --failed` lists all failed units, `systemctl list-units --type=service` lists active services, and `journalctl -u httpd` shows the full log for the unit. Unit files live in three places, in order of precedence: `/etc/systemd/system/` (administrator), `/run/systemd/system/` (runtime), and `/usr/lib/systemd/system/` or `/lib/systemd/system/` (installed by packages). Never edit package-supplied files directly, because updates overwrite them. Instead create a drop-in override with `systemctl edit httpd`, which opens an editor and saves your changes to `/etc/systemd/system/httpd.service.d/override.conf`. Only the settings you list are overridden.",
   "```ini\n[Service]\nRestart=on-failure\nRestartSec=5\nLimitNOFILE=65536\n```",
   "`systemctl edit --full httpd` copies the whole unit to `/etc` for complete replacement, and `systemctl cat httpd` shows the unit plus all drop-ins. One subtlety: list-type settings like `ExecStart=` must first be cleared with an empty `ExecStart=` line before a new value is set in a drop-in, or systemd complains about multiple values. After editing unit files by hand, run `systemctl daemon-reload` so systemd rereads them; `systemctl edit` does this for you. A typical service section contains `ExecStart=`, `User=` and `Restart=`, and the `[Install]` section with `WantedBy=multi-user.target` is what `enable` uses.",
   "Consider a worked example. An internal API service crashes occasionally and stays down. `systemctl status api` shows 'failed' with `status=1/FAILURE`, and `journalctl -u api` shows the crash. Instead of editing the vendor's unit in `/usr/lib/systemd/system`, you run `systemctl edit api.service`, add the `Restart=on-failure` and `RestartSec=5` lines shown above, save, and run `systemctl restart api`. `systemctl cat api.service` now shows the override, and the next crash triggers an automatic restart. Because the override lives in `/etc`, the next package update of the API leaves your fix in place.",
   "Common mistakes: running `start` and assuming the service will return after reboot (you also need `enable`); using `disable` when a dependency keeps pulling the unit in (use `mask`); editing files under `/usr/lib/systemd/system`, which updates overwrite; forgetting `daemon-reload` after manual edits; and overriding `ExecStart=` without clearing it first. A quieter trap is `reload` versus `restart`: reload keeps the process running and only rereads configuration, so it will not pick up a new binary after an upgrade, and not every service supports it. When unsure, `systemctl reload-or-restart` tries a reload first and falls back to a restart.",
   "Exam questions are usually phrased as outcomes. 'Running now but not after reboot' means `enable`. 'Start now and at boot' means `enable --now`. 'Must never start, even as a dependency' means `mask`. 'Change a setting without touching the vendor file' means `systemctl edit` and a drop-in in `/etc/systemd/system/<unit>.d/`. 'Edited a unit file but nothing changed' means `daemon-reload`. 'status=203/EXEC' points to a wrong path or missing execute permission on the program."
  ],
  "terms": [
   [
    "Unit",
    "A systemd configuration object such as a .service, .socket, .timer, .mount or .target."
   ],
   [
    "enable vs start",
    "enable configures a unit to start at boot; start runs it now. Neither implies the other."
   ],
   [
    "mask",
    "Links a unit to /dev/null so it cannot be started manually or as a dependency."
   ],
   [
    "Drop-in override",
    "A .conf file in /etc/systemd/system/<unit>.d/ that overrides selected settings of a unit."
   ],
   [
    "daemon-reload",
    "Tells systemd to reread unit files after they change on disk."
   ],
   [
    "WantedBy=",
    "An [Install] setting naming the target that should pull the unit in when it is enabled."
   ]
  ],
  "example": "An internal API service crashes occasionally and stays down. Instead of editing the vendor's unit in /usr/lib/systemd/system, you run systemctl edit api.service, add Restart=on-failure and RestartSec=5 under [Service], save, and restart the service. systemctl cat api.service now shows the override, and the next crash triggers an automatic restart.",
  "tip": "Know the difference in strength: stop affects now, disable affects boot, and mask blocks the unit entirely until unmasked.",
  "check": [
   [
    "A service runs now but is not running after reboot. Which command fixes that?",
    "systemctl enable <service> (or enable --now to also start it), because start alone does not affect boot."
   ],
   [
    "Where does systemctl edit nginx save its changes?",
    "In /etc/systemd/system/nginx.service.d/override.conf, a drop-in that overrides only the settings you list."
   ],
   [
    "What must you run after manually editing a unit file in /etc/systemd/system?",
    "systemctl daemon-reload, then restart the unit if needed, so systemd rereads the changed file."
   ],
   [
    "Which is stronger, disable or mask, and why?",
    "mask, because it links the unit to /dev/null so it cannot start at all, even manually or as a dependency; disable only removes boot-time links."
   ]
  ]
 },
 {
  "t": "Scheduling: cron and crontab syntax, at, systemd timers (OnCalendar)",
  "body": [
   "Administrators automate recurring and one-off jobs so that backups, cleanups and reports happen without anyone logged in. Linux offers three mechanisms: cron for recurring jobs, at for single future jobs, and systemd timers as the modern alternative to cron. The exam checks that you can read and write their time expressions and that you know where each kind of job is defined. A crontab line has five time fields followed by the command: minute (0-59), hour (0-23), day of month (1-31), month (1-12) and day of week (0-7, where 0 and 7 are both Sunday). An asterisk means every value, a comma separates a list (`1,15`), a hyphen gives a range (`1-5`), and a slash gives a step (`*/10` means every tenth value). So `30 2 * * 1-5 /usr/local/bin/backup.sh` runs at 02:30 Monday through Friday, and `*/15 * * * *` runs every 15 minutes. Shortcuts such as `@reboot`, `@daily` and `@hourly` also exist.",
   "Users manage their own table with `crontab -e` (edit), `crontab -l` (list) and `crontab -r` (remove all, so be careful); root can use `crontab -u alice -e`. System-wide jobs go in `/etc/crontab` or files in `/etc/cron.d/`, which have an extra sixth field naming the user to run as. Scripts dropped into `/etc/cron.hourly`, `cron.daily`, `cron.weekly` and `cron.monthly` run on those schedules. Access can be restricted with `/etc/cron.allow` and `/etc/cron.deny`: if the allow file exists, only users listed in it may use crontab. Cron runs jobs with a minimal environment and a short `PATH`, so use full paths to commands and redirect output to a log, or the job may fail silently.",
   "`at` runs a command once at a set time. `at 22:00` or `at now + 30 minutes` opens a prompt where you type commands and finish with Ctrl+D. `atq` lists pending jobs, `atrm` removes one by number, and the `atd` service must be running. `batch` is similar but waits until system load is low. Access is controlled with `/etc/at.allow` and `/etc/at.deny`.",
   "systemd timers pair a `.timer` unit with a `.service` unit of the same name. The timer decides when; the service defines what runs. `OnCalendar=` sets wall-clock schedules using the form `DayOfWeek Year-Month-Day Hour:Minute:Second`, for example `OnCalendar=Mon..Fri *-*-* 02:30:00`, or shortcuts like `daily` and `weekly`. Monotonic timers use relative times such as `OnBootSec=10min` or `OnUnitActiveSec=1h`. `Persistent=true` runs a missed job at the next boot if the machine was off when it was due. Test an expression with `systemd-analyze calendar 'Mon..Fri 02:30'`. Enable the timer, not the service, with `systemctl enable --now backup.timer`, and list timers with `systemctl list-timers`. Advantages over cron include logging in the journal, dependency handling and resource controls.",
   "```ini\n# /etc/systemd/system/backup.timer\n[Timer]\nOnCalendar=*-*-* 02:30:00\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n```",
   "Consider a worked example. Your log cleanup needs to run at 03:15 on the first day of every month. In a user crontab that is `15 3 1 * * /usr/local/bin/cleanup.sh >> /var/log/cleanup.log 2>&1`; in `/etc/cron.d/cleanup` the same line needs `root` between the time fields and the command. As a systemd timer you create `cleanup.service` with `ExecStart=/usr/local/bin/cleanup.sh` and `cleanup.timer` with `OnCalendar=*-*-01 03:15:00` and `Persistent=true`, so if the server is down on the first the job runs as soon as it boots. `systemctl list-timers` shows the next run, and `journalctl -u cleanup` shows the output.",
   "Common mistakes: forgetting the user field in `/etc/cron.d` files, or adding one in a user crontab; relying on `PATH` inside cron; enabling the `.service` instead of the `.timer`; misreading `*/5` in the hour field as 'every five minutes'; running `crontab -r` when you meant `-e` (they sit next to each other on the keyboard); and expecting an `at` job to run when `atd` is stopped. Finally, remember that when both day-of-month and day-of-week are restricted, cron runs the job when either one matches, not only when both do.",
   "Exam questions usually show a schedule and ask when it runs, or give a need and ask for the tool. Read the fields left to right: minute, hour, day of month, month, day of week. 'Recurring' points to cron or a timer; 'once, at a set time' points to `at`; 'when load is low' points to `batch`. 'Catch up after downtime' points to `Persistent=true` (or anacron). 'Which timers will fire next' is `systemctl list-timers`, and 'restrict who may schedule jobs' is `cron.allow` or `cron.deny`."
  ],
  "terms": [
   [
    "crontab",
    "A per-user table of scheduled jobs, edited with crontab -e, using five time fields plus a command."
   ],
   [
    "at",
    "Schedules a command to run once at a future time; managed with atq and atrm and run by atd."
   ],
   [
    "systemd timer",
    "A .timer unit that activates a matching .service unit on a schedule."
   ],
   [
    "OnCalendar",
    "A timer setting that defines wall-clock schedules, such as Mon..Fri *-*-* 02:30:00."
   ],
   [
    "Persistent=true",
    "A timer option that runs a missed job at the next opportunity after downtime."
   ],
   [
    "cron.allow / cron.deny",
    "Files that control which users may create crontabs; if cron.allow exists, only listed users may."
   ]
  ],
  "example": "Your log cleanup needs to run at 03:15 on the first day of every month. In cron that is 15 3 1 * * /usr/local/bin/cleanup.sh. The same job as a systemd timer uses OnCalendar=*-*-01 03:15:00 with Persistent=true, so if the server is down on the first, the job runs as soon as it boots.",
  "tip": "Count the fields: a user crontab has five time fields before the command, but /etc/crontab and /etc/cron.d files add a username as the sixth field.",
  "check": [
   [
    "What schedule does 0 */4 * * * describe?",
    "At minute 0 of every fourth hour: 00:00, 04:00, 08:00, 12:00, 16:00 and 20:00 every day."
   ],
   [
    "Which command shows all active systemd timers and when they will next run?",
    "systemctl list-timers, which lists each timer with its last and next trigger times."
   ],
   [
    "How do you schedule a one-time reboot at 23:00 tonight?",
    "echo 'systemctl reboot' | at 23:00 (or use at 23:00 and type the command), with atd running."
   ],
   [
    "A cron job works when you run it by hand but fails from cron. What is a likely cause?",
    "Cron's minimal environment and short PATH; use full paths to commands and redirect output to a log to see the error."
   ]
  ]
 },
 {
  "t": "Processes and jobs: ps, top, kill signals, nice/renice, bg/fg/jobs, nohup",
  "body": [
   "A process is a running instance of a program, identified by a PID (process ID) and owned by a user. Every process except PID 1 has a parent, recorded as its PPID (parent process ID). Monitoring and controlling processes is how you deal with runaway programs, prioritize work and keep long tasks running. Linux+ questions often give you `ps` or `top` output and ask what to do next.",
   "`ps` takes a snapshot. `ps aux` (BSD style) shows every process with user, PID, %CPU, %MEM, VSZ and RSS memory, TTY, state, start time and command; `ps -ef` (System V style) shows UID, PID, PPID and command. `ps -ef --forest` or `pstree` shows parent-child relationships. The STAT column shows state: R running, S sleeping, D uninterruptible sleep (usually waiting on I/O), T stopped and Z zombie, a finished process whose parent has not collected its exit status. `pgrep nginx` finds PIDs by name, and `pgrep -f` matches the full command line. `top` gives a live view sorted by CPU. Its header shows uptime, load average, task counts, CPU breakdown (including `wa` for I/O wait) and memory. Inside top, press `M` to sort by memory, `P` for CPU, `k` to kill a PID, `r` to renice and `q` to quit. `htop` is a friendlier alternative when installed.",
   "Signals are messages sent to processes. `kill PID` sends SIGTERM (15), a polite request to exit that lets the program clean up. `kill -9 PID` sends SIGKILL (9), which the process cannot catch or ignore; use it only when SIGTERM fails, because data may be lost. `kill -HUP PID` sends SIGHUP (1), which many daemons interpret as 'reload your configuration'. SIGINT (2) is what Ctrl+C sends, SIGTSTP is what Ctrl+Z sends to pause a job, SIGSTOP pauses unconditionally, and SIGCONT resumes. `killall name` and `pkill pattern` signal by name, and `kill -l` lists all signals.",
   "Scheduling priority is set by the nice value, from -20 (highest priority) to 19 (lowest), default 0. `nice -n 10 command` starts a program with lower priority; `renice -n 5 -p PID` changes a running one. Ordinary users can only make their processes nicer (raise the number); only root can lower it to raise priority. The PR and NI columns in top show the effect. Nice affects CPU scheduling only, so it will not help a process that is slow because it waits on disk.",
   "Job control manages processes started from your shell. Append `&` to run a command in the background. Ctrl+Z suspends the foreground job, `bg` resumes it in the background, `fg` brings it back to the foreground, and `jobs` lists jobs with numbers you can reference as `%1`. Background jobs still belong to your terminal, so logging out sends them SIGHUP and they usually die. `nohup command &` makes the process ignore SIGHUP and writes output to `nohup.out`, so it survives logout. `disown` removes a job from the shell's table, and tools like `tmux` or `screen`, or running the task as a systemd unit, are more robust alternatives for long jobs.",
   "Consider a worked example. A report script started over SSH is hogging CPU and will take hours. `top` shows it at the top of the list with NI 0, so you find its PID with `pgrep -f report.py` and lower its priority with `renice -n 15 -p 4821`, and interactive users stop noticing it. Next time you start it as `nohup nice -n 15 ./report.py &` so it runs politely and survives your logout. Later, a stuck backup process ignores `kill 5120`; after checking it is not in state D, you send `kill -9 5120` and it ends. A zombie listed under an application server cannot be killed at all, so you restart the parent, which reaps it.",
   "Common mistakes: reaching for `kill -9` first instead of SIGTERM, which skips cleanup and can corrupt files; trying to kill a zombie instead of dealing with its parent; expecting a user to be able to set a negative nice value; confusing a stopped job (T, after Ctrl+Z) with a background job that is running; and starting a long task with `&` alone over SSH, then losing it at logout. Also note that a process in state D usually cannot be killed even with SIGKILL until its I/O completes, which points to a storage or network filesystem problem.",
   "Exam questions usually give a need and ask for the signal or command. 'Graceful stop' is SIGTERM (15); 'cannot be ignored' is SIGKILL (9); 'reload configuration' is SIGHUP (1). 'Lower priority of a running process' is `renice`; 'start with lower priority' is `nice`. 'Suspended job should continue in the background' is `bg`. 'Keep running after logout' is `nohup` (or tmux, screen, a systemd unit). 'Show parent-child tree' is `pstree` or `ps -ef --forest`, and 'high wa in top' points to I/O wait rather than CPU."
  ],
  "terms": [
   [
    "PID / PPID",
    "Process ID and parent process ID, used to identify processes and their relationships."
   ],
   [
    "SIGTERM vs SIGKILL",
    "SIGTERM (15) asks a process to exit cleanly; SIGKILL (9) forces termination and cannot be caught."
   ],
   [
    "SIGHUP",
    "Signal 1, sent on terminal hangup and used by many daemons as a request to reload configuration."
   ],
   [
    "Nice value",
    "A priority adjustment from -20 (most favored) to 19 (least favored); only root can lower it."
   ],
   [
    "Zombie process",
    "A terminated process whose exit status has not yet been collected by its parent, shown with state Z."
   ],
   [
    "nohup",
    "Runs a command immune to hangup signals so it keeps running after the user logs out."
   ]
  ],
  "example": "A report script started over SSH is hogging CPU and will take hours. You find its PID with pgrep -f report.py, lower its priority with renice -n 15 -p 4821 so interactive users are not affected, and next time you start it as nohup nice -n 15 ./report.py & so it survives your logout.",
  "tip": "The correct escalation is SIGTERM first, SIGKILL only if the process ignores it; and a zombie cannot be killed at all, since it is already dead, so you deal with its parent.",
  "check": [
   [
    "Which signal do many daemons treat as a request to reload their configuration?",
    "SIGHUP (signal 1), sent with kill -HUP <PID> or kill -1 <PID>."
   ],
   [
    "You pressed Ctrl+Z on a long copy. How do you let it continue in the background?",
    "Run bg (or bg %1) to resume the stopped job in the background."
   ],
   [
    "Can a regular user run renice -n -5 on their own process?",
    "No; only root can decrease a nice value (raise priority). Users can only increase it."
   ],
   [
    "What does state Z in ps output mean, and how do you clear it?",
    "It is a zombie, a finished process whose parent has not collected its exit status; you fix or restart the parent so it reaps the child."
   ]
  ]
 },
 {
  "t": "Package management: dnf/rpm, apt/dpkg, repositories, provides and file ownership queries",
  "body": [
   "Linux software is installed as packages: archives that contain files plus metadata such as version, dependencies and install scripts. Two families dominate. Red Hat, Fedora, Rocky, Alma and SUSE use RPM (RPM Package Manager) packages, and Debian and Ubuntu use .deb packages. Each family has a low-level tool that works on individual package files and a high-level tool that talks to repositories and resolves dependencies. (SUSE's high-level tool is `zypper`, but the RPM queries are the same.)",
   "On RPM systems, `rpm` is the low-level tool. `rpm -ivh file.rpm` installs, `rpm -Uvh` upgrades, `rpm -e name` erases, `rpm -qa` lists all installed packages, `rpm -qi name` shows info, `rpm -ql name` lists a package's files, `rpm -qf /path/file` tells you which package owns a file, and `rpm -V name` verifies installed files against the package database, reporting changed sizes, permissions or checksums. rpm does not fetch dependencies, which is why `dnf` (the successor to yum) is used day to day: `dnf install`, `dnf remove`, `dnf update` (or `upgrade`), `dnf search`, `dnf info`, `dnf list installed` and `dnf history` (with `dnf history undo` to reverse a transaction). `dnf install ./pkg.rpm` installs a local file while still resolving its dependencies.",
   "On Debian systems, `dpkg` is the low-level tool: `dpkg -i file.deb` installs, `dpkg -r` removes (`-P` purges including config files), `dpkg -l` lists packages, `dpkg -L name` lists a package's files, and `dpkg -S /path/file` finds the owning package. `apt` is the high-level tool: `apt update` refreshes the package lists (it does not upgrade anything), `apt upgrade` installs newer versions, `apt full-upgrade` also allows removals to resolve dependency changes, and `apt install`, `apt remove`, `apt purge`, `apt autoremove`, `apt search` and `apt show` do what their names say. The older `apt-get` and `apt-cache` commands still work and are common in scripts because their output is stable. If a `dpkg -i` leaves dependencies missing, `apt install -f` fixes them.",
   "Repositories are the servers that hold packages and their metadata. On RPM systems they are defined in `.repo` files under `/etc/yum.repos.d/`, with lines such as `baseurl=`, `enabled=1` and `gpgcheck=1`; `dnf repolist` shows them and `dnf config-manager` can add or enable them. On Debian systems they are listed in `/etc/apt/sources.list` and files under `/etc/apt/sources.list.d/` (newer releases use a deb822 `.sources` format). Packages are signed with GPG (GNU Privacy Guard) keys, and leaving signature checking enabled is an important security control against tampered software.",
   "Two query types are heavily tested. A file ownership query asks which installed package a file came from: `rpm -qf /etc/ssh/sshd_config` or `dpkg -S /usr/bin/ssh`. A provides query asks which package, installed or not, would supply a file or command: `dnf provides '*/bin/dig'` (or `dnf whatprovides`) on RPM systems, and `apt-file search bin/dig` on Debian systems after installing `apt-file` and running `apt-file update`. Use the first to investigate an existing file and the second to find what to install.",
   "Consider a worked example. A minimal Rocky Linux server lacks the `dig` command. `dnf provides '*/bin/dig'` shows it comes from the bind-utils package, so you run `dnf install bind-utils`. Later, while auditing a changed configuration file, `rpm -qf /etc/named.conf` shows it belongs to the bind package, and `rpm -V bind` reports that its checksum and modification time differ from the original, flagged with `5` and `T` and marked `c` as a config file. That tells you someone edited it, so you compare it with the backup before the next change window.",
   "Common mistakes: thinking `apt update` installs updates (it only refreshes lists); using `rpm -ivh` or `dpkg -i` and then fighting missing dependencies by hand; confusing `rpm -qf` (which package owns this installed file) with `dnf provides` (which package would supply it); disabling `gpgcheck` to get past a key error instead of importing the correct key; mixing repositories from different distribution releases; and forgetting that `dpkg -r` keeps configuration files while `dpkg -P` or `apt purge` removes them.",
   "Exam questions often hinge on the family and the query type. 'Which package owns this file' is `rpm -qf` or `dpkg -S`. 'Which package do I install to get this command' is `dnf provides` or `apt-file search`. 'List files in an installed package' is `rpm -ql` or `dpkg -L`. 'Verify files have not changed' is `rpm -V`. 'Refresh package lists' is `apt update`; 'reverse the last transaction' is `dnf history undo`. 'Where are repositories defined' is `/etc/yum.repos.d/` or `/etc/apt/sources.list.d/`."
  ],
  "terms": [
   [
    "rpm / dpkg",
    "Low-level package tools that install and query individual package files without resolving dependencies."
   ],
   [
    "dnf / apt",
    "High-level package managers that download from repositories and resolve dependencies."
   ],
   [
    "Repository",
    "A server or location holding packages and signed metadata, configured in /etc/yum.repos.d or /etc/apt/sources.list(.d)."
   ],
   [
    "rpm -qf / dpkg -S",
    "Queries that report which installed package owns a given file."
   ],
   [
    "dnf provides",
    "Searches repositories for the package that supplies a given file or command."
   ],
   [
    "rpm -V",
    "Verifies installed package files against the package database and reports changes."
   ],
   [
    "gpgcheck",
    "A repository setting that requires valid GPG signatures on packages before installation."
   ]
  ],
  "example": "A minimal Rocky Linux server lacks the dig command. dnf provides '*/bin/dig' shows it comes from the bind-utils package, so you run dnf install bind-utils. Later, while auditing a changed config file, rpm -qf /etc/named.conf shows it belongs to the bind package and rpm -V bind reports that its checksum differs from the original.",
  "tip": "apt update only refreshes package lists; apt upgrade actually installs newer versions. Many wrong answers confuse the two.",
  "check": [
   [
    "Which command shows which package installed /usr/bin/curl on Ubuntu?",
    "dpkg -S /usr/bin/curl, which searches the installed package database for the file."
   ],
   [
    "Why would you use dnf install ./pkg.rpm rather than rpm -ivh pkg.rpm?",
    "dnf resolves and installs any dependencies from the configured repositories, while rpm fails if dependencies are missing."
   ],
   [
    "What does gpgcheck=1 in a .repo file do?",
    "It requires packages from that repository to have valid GPG signatures before they are installed."
   ],
   [
    "On a RHEL system, how do you find which package would provide the semanage command?",
    "dnf provides '*/semanage' (or dnf whatprovides), which searches repository metadata even for packages not installed."
   ]
  ]
 },
 {
  "t": "Source and language packages: make, pip, sandboxed packages (Flatpak, Snap)",
  "body": [
   "Not all software arrives through your distribution's repositories. Sometimes you build from source, install a library with a language package manager, or use a sandboxed universal package. Each approach has trade-offs in updates, security and tidiness, and Linux+ expects you to know how each works and when to prefer it. The general rule is to use distribution packages first and reach for the others only when you need something the repositories do not offer.",
   "Building from source typically follows three steps. First, `./configure` (generated by GNU Autotools) checks for compilers and libraries and writes a Makefile; options such as `--prefix=/usr/local` choose the install location. Second, `make` reads the Makefile and compiles the code. Third, `make install`, usually run with sudo, copies the results into place. You need build tools first, installed as a group: `dnf groupinstall 'Development Tools'` on RHEL-family systems or `apt install build-essential` on Debian-family systems, plus the `-devel` or `-dev` header packages for any libraries the software uses. Projects may use other build systems such as CMake or Meson, but the idea is the same.",
   "The drawback is that the package manager knows nothing about software installed this way: no automatic security updates, no clean uninstall (some projects offer `make uninstall`), and possible conflicts with packaged files. Installing under `/usr/local` or `/opt` limits the damage, and verifying the source's checksum (for example with `sha256sum`) or signature before building protects against tampered downloads. Run `./configure` and `make` as a normal user; only `make install` needs root.",
   "Language ecosystems have their own managers: `pip` for Python, `npm` for JavaScript, `gem` for Ruby, `cargo` for Rust. With pip, `pip install requests` installs a package, `pip install -r requirements.txt` installs a pinned list, `pip list` and `pip show` inspect, `pip freeze` prints installed versions in requirements format, and `pip uninstall` removes. Installing into the system Python with sudo can break tools the operating system depends on, and many current distributions now refuse this by marking the system environment as externally managed. The safe practice is a virtual environment: `python3 -m venv venv`, `source venv/bin/activate`, then pip installs only into that project. `pip install --user` is an alternative for per-user tools.",
   "Sandboxed universal packages bundle an application with its dependencies so one package runs on many distributions, isolated from the rest of the system. Flatpak is aimed mainly at desktop applications. It installs from remotes such as Flathub: `flatpak remote-add`, `flatpak install flathub <app-id>`, `flatpak run <app-id>`, `flatpak update`, and permissions can be adjusted with `flatpak override`. Snap, developed by Canonical and standard on Ubuntu, runs as the `snapd` service and handles both desktop and server software: `snap install name`, `snap list`, `snap refresh` (snaps also refresh automatically), `snap remove`. Snaps run under confinement modes, with `strict` confining the app and `classic` giving it normal system access. The trade-off is larger disk use and a separate update channel, in exchange for newer versions and isolation.",
   "Consider a worked example. A monitoring agent is only available as source. You install build-essential and the needed `-dev` headers, check the tarball's published checksum with `sha256sum`, then run `./configure --prefix=/opt/agent` and `make` as your own user, and `sudo make install`. You record the version and install path in the team's documentation, because dnf and apt will not track it or patch it. For the agent's Python helper scripts, you create a virtual environment with `python3 -m venv /opt/agent/venv` and `pip install -r requirements.txt` inside it, leaving the system Python untouched. A colleague's desktop needs a newer image editor than the repositories offer, so you install it with Flatpak from Flathub.",
   "Common mistakes: running `make install` before `./configure` has succeeded; forgetting the `-dev` or `-devel` headers, so configure fails with a missing library; running `sudo pip install` into the system Python; assuming source-installed software gets security updates; and assuming snaps and flatpaks share the system's libraries, when in fact each bundles its own and updates separately. Another trap is thinking `classic` confinement is more secure; it is the least confined mode.",
   "Exam questions tend to name the order or the manager. 'Build order' is `./configure`, `make`, `make install`. 'Choose install location' is `--prefix`. 'Compiler and build tools missing' points to Development Tools or build-essential. 'Isolate Python dependencies per project' is a venv. 'Error: externally managed environment' means use a venv or the distribution package. 'Desktop app from Flathub' is Flatpak; 'snapd', 'channels', 'confinement', 'automatic refresh' point to Snap."
  ],
  "terms": [
   [
    "make",
    "A build tool that reads a Makefile and runs the steps to compile software; make install copies it into place."
   ],
   [
    "./configure",
    "A script that checks build dependencies and generates a Makefile, often with --prefix to set the install path."
   ],
   [
    "pip",
    "Python's package installer, best used inside a virtual environment."
   ],
   [
    "Virtual environment",
    "An isolated Python environment created with python3 -m venv so project packages do not affect the system."
   ],
   [
    "Flatpak",
    "A sandboxed universal packaging format mainly for desktop apps, commonly installed from Flathub."
   ],
   [
    "Snap",
    "Canonical's sandboxed package format managed by snapd, with automatic refreshes and confinement modes."
   ]
  ],
  "example": "A monitoring agent is only available as source. You install build-essential and the needed -dev headers, run ./configure --prefix=/opt/agent, make and sudo make install, then document the install because dnf and apt will not track it. For its Python helper scripts, you create a venv under /opt/agent and pip install the requirements there instead of into the system Python.",
  "tip": "The standard source build order is ./configure, make, make install; only the last step normally needs root.",
  "check": [
   [
    "Why is software installed with make install harder to maintain than a repository package?",
    "The package manager does not track it, so it receives no automatic updates and has no clean, recorded uninstall."
   ],
   [
    "What is the safest way to install Python libraries for one project without affecting the system?",
    "Create a virtual environment with python3 -m venv, activate it, and pip install inside it."
   ],
   [
    "Which service must be running for Snap packages to work?",
    "snapd, the daemon that installs, mounts, confines and refreshes snaps."
   ],
   [
    "What does ./configure --prefix=/opt/tool change?",
    "It sets the install location, so make install places the files under /opt/tool instead of the default /usr/local."
   ]
  ]
 },
 {
  "t": "Containers: podman/docker run, images, port publishing, volumes, logs, inspect",
  "body": [
   "A container is a process, or group of processes, that runs isolated from the rest of the system while sharing the host's kernel. Isolation comes from kernel namespaces (separate views of processes, network, mounts and hostnames) and cgroups (control groups, which limit CPU and memory). Because there is no guest operating system to boot, containers start in seconds and use far fewer resources than virtual machines. Linux+ expects you to run and manage them with Docker or Podman.",
   "Docker uses a background daemon, `dockerd`, that runs containers on your behalf, and membership in the `docker` group is effectively root-equivalent. Podman, the default on RHEL-family systems, is daemonless and can run rootless containers as an ordinary user, reducing risk. Their command-line syntax is almost identical, so `podman run` and `docker run` accept the same common options. An image is a read-only template built in layers, identified by a name and tag such as `registry.example.com/team/web:1.4`; if no tag is given, `latest` is assumed. `podman pull nginx` downloads an image from a registry, `podman images` lists local images, `podman rmi` removes one, and `podman build -t myapp:1.0 .` builds one from a Containerfile or Dockerfile. A container is a running (or stopped) instance of an image with a thin writable layer on top; `podman ps` lists running containers and `podman ps -a` includes stopped ones.",
   "`podman run` creates and starts a container. Key options: `-d` runs it detached in the background, `--name web` names it, `-it` gives an interactive terminal, `--rm` deletes it on exit, and `-e KEY=value` sets environment variables. Port publishing uses `-p hostport:containerport`, so `-p 8080:80` makes the container's port 80 reachable on the host's port 8080. Without `-p`, services inside the container are not reachable from outside the host. Rootless containers cannot bind host ports below 1024 by default.",
   "Anything written inside a container's writable layer disappears when the container is removed. For persistent data use volumes: `-v webdata:/usr/share/nginx/html` uses a named volume managed by the engine (`podman volume ls`), while `-v /srv/site:/usr/share/nginx/html:Z` bind-mounts a host directory. On SELinux systems the `:Z` (private) or `:z` (shared) suffix relabels the directory so the container may access it; without it you get permission denied errors. For troubleshooting, `podman logs web` shows what the container wrote to stdout and stderr (`-f` follows), `podman exec -it web /bin/sh` opens a shell inside a running container, `podman inspect web` prints detailed JSON (JavaScript Object Notation) about configuration, mounts, network settings and state, and `podman port web` shows published ports. `podman stop`, `start`, `restart` and `rm` manage the lifecycle, and `podman stats` shows live resource use.",
   "```bash\npodman run -d --name web -p 8080:80 -v webdata:/usr/share/nginx/html nginx:stable\npodman ps\npodman logs -f web\npodman inspect web\n```",
   "Consider a worked example. A team needs a quick internal wiki. As a regular user you run `podman run -d --name wiki -p 8081:3000 -v wikidata:/data <image>:<tag>`, so colleagues reach it on host port 8081 while the application listens on 3000 inside. When a colleague reports errors, `podman logs wiki` shows a missing setting, which you pass with `-e` when recreating the container. When the image is updated, you pull the new tag, remove the container and recreate it, and the pages survive because they live in the `wikidata` volume. `podman inspect wiki` confirms the mount and the published port.",
   "Common mistakes: reading `-p` backwards (it is always host first, container second); storing data only in the writable layer and losing it on `podman rm`; forgetting `:Z` on a bind mount under SELinux; relying on the `latest` tag in production, which can change without notice; adding users to the `docker` group without realizing it grants root-equivalent access; and confusing `podman exec` (run a command in an existing container) with `podman run` (create a new one).",
   "Exam questions often show a run command and ask how to reach the service or where data goes. 'Clients connect to host port X' means the left side of `-p`. 'Data lost after container removed' means a volume was missing. 'Permission denied on a bind mount on RHEL' points to the `:Z` label. 'See what the app printed' is `logs`; 'detailed JSON configuration' is `inspect`; 'open a shell inside' is `exec -it`. 'Daemonless and rootless' describes Podman; 'central daemon, docker group is root-equivalent' describes Docker."
  ],
  "terms": [
   [
    "Image",
    "A read-only, layered template (name:tag) from which containers are created."
   ],
   [
    "Container",
    "An isolated process running from an image with its own writable layer, sharing the host kernel."
   ],
   [
    "Namespaces and cgroups",
    "Kernel features that give containers isolated views of the system and limit their resource use."
   ],
   [
    "Port publishing",
    "The -p host:container option that maps a host port to a port inside the container."
   ],
   [
    "Volume",
    "Persistent storage managed by the container engine or bind-mounted from the host, surviving container removal."
   ],
   [
    "Rootless container",
    "A container run by an unprivileged user, as Podman supports, limiting the impact of a compromise."
   ]
  ],
  "example": "A team needs a quick internal wiki. You run podman run -d --name wiki -p 8081:3000 -v wikidata:/data <image>:<tag> as a regular user. Colleagues reach it on port 8081; when the image is updated, you remove the container and recreate it from the new image, and the pages survive because they live in the wikidata volume.",
  "tip": "Read -p mappings as host:container. A question showing -p 8443:443 means clients connect to the host on 8443 to reach the container's 443.",
  "check": [
   [
    "What happens to data written inside a container without a volume when the container is removed?",
    "It is lost, because it lives only in the container's writable layer."
   ],
   [
    "Which command shows a container's IP address, mounts and environment in detail?",
    "podman inspect <container> (or docker inspect), which prints the full configuration and state as JSON."
   ],
   [
    "Name one security advantage Podman has over a default Docker setup.",
    "It is daemonless and can run containers rootless as an ordinary user, whereas Docker group membership effectively grants root."
   ],
   [
    "A bind-mounted directory gives permission denied inside a container on a RHEL host. What is the likely fix?",
    "Add :Z (or :z) to the -v option so the directory is relabeled with an SELinux context the container may use."
   ]
  ]
 },
 {
  "t": "Container orchestration concepts: Kubernetes pods, deployments, services",
  "body": [
   "Running a few containers by hand works for one host, but production applications need many containers across many machines, restarted when they fail, scaled with demand and updated without downtime. Container orchestration automates this, and Kubernetes (often written K8s) is the dominant orchestrator. Linux+ tests the core concepts rather than deep cluster administration: what each object does, how they relate, and which one you change to get a result.",
   "A Kubernetes cluster has a control plane and worker nodes. The control plane includes the API server (everything talks to it), etcd (a key-value store holding cluster state), the scheduler (chooses which node runs each workload) and controller managers (keep reality matching the desired state). Each worker node runs a kubelet agent, a container runtime such as containerd or CRI-O, and kube-proxy for service networking. You interact with the cluster through `kubectl`. Kubernetes is declarative: you describe the desired state in YAML manifests and apply them with `kubectl apply -f file.yaml`, and controllers continually work to make the cluster match. This differs from imperatively running commands one at a time, and it is why Kubernetes pairs well with Git-based workflows where manifests are reviewed and versioned.",
   "The pod is the smallest deployable unit: one or more containers that share a network namespace (one IP address, so they talk over localhost) and can share volumes. Most pods hold a single application container, sometimes with a helper 'sidecar' such as a log shipper. Pods are disposable; when one dies, it is replaced by a new pod with a new IP, not repaired. You rarely create pods directly. A deployment declares which image to run and how many replicas you want. It manages a ReplicaSet that keeps that number of pods running, replacing failed ones automatically. Changing the image triggers a rolling update that replaces pods gradually, `kubectl rollout status` watches it, and `kubectl rollout undo` rolls back. `kubectl scale deployment web --replicas=5` changes the count.",
   "Because pod IPs change, clients need a stable address. A service provides one: a fixed virtual IP and DNS name that load-balances across all pods matching a label selector, such as `app: web`. Service types include ClusterIP (reachable only inside the cluster, the default), NodePort (opens a port on every node) and LoadBalancer (asks the cloud provider for an external load balancer). An Ingress can route HTTP traffic by hostname or path to services. Other objects you should recognize: namespaces divide a cluster into logical areas, ConfigMaps hold configuration and Secrets hold sensitive values (base64-encoded by default, which is not encryption), and PersistentVolumeClaims request storage that outlives pods. Everyday commands include `kubectl get pods`, `kubectl describe pod name`, `kubectl logs name` and `kubectl exec -it name -- sh`, which mirror the container commands you already know.",
   "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels: {app: web}\n  template:\n    metadata:\n      labels: {app: web}\n    spec:\n      containers:\n        - name: web\n          image: registry.example.com/shop/web:2.1\n          ports: [{containerPort: 8080}]\n```",
   "Consider a worked example. An online store runs its web tier as the deployment above, with three replicas behind a ClusterIP service named `web` whose selector is `app: web`, fronted by an Ingress for the store's hostname. When a node fails, the ReplicaSet schedules replacement pods on healthy nodes, and because clients use the service name rather than pod IPs, customers notice nothing. For a sale, you scale to six replicas; when a new image misbehaves, `kubectl rollout undo deployment/web` restores the previous version.",
   "Common mistakes: creating bare pods for an application and wondering why they are not replaced after a failure; pointing clients at pod IPs; a service whose selector does not match the pods' labels, so it has no endpoints; exposing an internal service as NodePort or LoadBalancer when ClusterIP is enough; treating base64-encoded Secrets as encrypted; and editing live objects by hand so the cluster drifts from the manifests in version control.",
   "Exam questions usually ask which object provides a behavior. 'Smallest unit, containers share an IP' is a pod. 'Keep N copies running', 'rolling update', 'rollback' is a deployment. 'Stable IP or DNS name, load balancing across pods' is a service; 'reachable only inside the cluster' is ClusterIP. 'Route by hostname or path' is an Ingress. 'Non-secret settings' is a ConfigMap; 'passwords or tokens' is a Secret. 'Command-line client' is `kubectl`, and 'desired state in YAML' describes declarative configuration."
  ],
  "terms": [
   [
    "Pod",
    "The smallest Kubernetes unit: one or more containers sharing an IP address and volumes."
   ],
   [
    "Deployment",
    "An object that declares an image and replica count, maintains that many pods and performs rolling updates."
   ],
   [
    "Service",
    "A stable virtual IP and DNS name that load-balances traffic to pods selected by labels."
   ],
   [
    "kubectl",
    "The command-line client that talks to the Kubernetes API server."
   ],
   [
    "Declarative configuration",
    "Describing desired state in manifests and letting controllers reconcile the cluster to match it."
   ],
   [
    "Secret",
    "A Kubernetes object for sensitive values, base64-encoded by default rather than encrypted."
   ]
  ],
  "example": "An online store runs its web tier as a deployment with three replicas behind a ClusterIP service named web, fronted by an Ingress. When a node fails, the deployment's ReplicaSet schedules replacement pods on healthy nodes, and because clients use the service name rather than pod IPs, customers notice nothing.",
  "tip": "Keep the three roles straight: a pod runs containers, a deployment keeps the right number of pods running and updates them, and a service gives them a stable network address.",
  "check": [
   [
    "Why should clients connect to a service instead of directly to a pod's IP?",
    "Pods are replaced frequently and get new IPs; a service provides a stable IP and DNS name that tracks the current pods."
   ],
   [
    "Which object would you change to run more copies of an application?",
    "The deployment's replica count, for example with kubectl scale deployment <name> --replicas=N."
   ],
   [
    "Are Kubernetes Secrets encrypted by default?",
    "No; by default their values are only base64-encoded, so access control and encryption at rest must be configured separately."
   ],
   [
    "A new image version causes errors after a rolling update. How do you return to the previous version?",
    "kubectl rollout undo deployment/<name>, which rolls the deployment back to its previous ReplicaSet."
   ]
  ]
 },
 {
  "t": "Logging: journalctl filters, rsyslog, logrotate",
  "body": [
   "Logs are your record of what happened on a system, and they are the first place to look when something breaks or looks suspicious. Modern Linux distributions use two logging systems side by side: the systemd journal and rsyslog, with logrotate keeping file-based logs under control. Knowing which one holds what, and how to filter quickly, turns a long search into a one-line command. systemd-journald collects messages from the kernel, early boot, services' stdout and stderr, and the syslog interface, storing them in a structured binary journal with fields such as the unit, PID and priority. On many distributions the journal is kept only in memory under `/run/log/journal` unless `/var/log/journal` exists or `Storage=persistent` is set in `/etc/systemd/journald.conf`. Without persistence, logs from before the last reboot are gone. `journalctl --disk-usage` shows its size, `journalctl --vacuum-size=500M` or `--vacuum-time=2weeks` trims it, and `SystemMaxUse=` in journald.conf caps it.",
   "`journalctl` reads the journal, and its filters are heavily tested. `-u sshd` shows one unit, `-b` the current boot (`-b -1` the previous boot, `--list-boots` lists them), `-p err` messages of priority err and more severe, `-k` kernel messages only, `-f` follows new entries like `tail -f`, `-e` jumps to the end, `-n 50` shows the last 50 lines, and `--since '2026-09-24 10:00' --until '1 hour ago'` selects a time window. `_PID=1234` or `_UID=1001` filter by field, `-o json-pretty` shows all fields, and `-x` adds explanatory text. Filters combine, so `journalctl -u nginx -p warning --since today` is typical.",
   "rsyslog is the traditional syslog daemon, writing plain text files under `/var/log`, such as `/var/log/messages` or `/var/log/syslog` for general messages and `/var/log/secure` or `/var/log/auth.log` for authentication, depending on the distribution. Its rules in `/etc/rsyslog.conf` and `/etc/rsyslog.d/*.conf` use a selector of facility.priority followed by an action. Facilities include `auth`, `authpriv`, `cron`, `daemon`, `kern`, `mail` and `local0` to `local7`; priorities from lowest to highest severity are debug, info, notice, warning, err, crit, alert and emerg. `authpriv.* /var/log/secure` logs all authpriv messages, and `*.err` means err and above. To forward logs to a central server, use `*.* @server:514` for UDP (User Datagram Protocol) or `*.* @@server:514` for TCP (Transmission Control Protocol). Central logging is an important security control because attackers who compromise a host often try to erase local logs. Test with `logger -p local0.warning 'test message'`.",
   "logrotate prevents text logs from filling the disk. It runs daily from cron or a systemd timer and reads `/etc/logrotate.conf` plus per-application files in `/etc/logrotate.d/`. Common directives: `daily` or `weekly`, `rotate 7` (keep seven old copies), `compress` and `delaycompress`, `missingok`, `notifempty`, `size 100M`, `create 0640 root adm` for the new file's mode, and a `postrotate` script that signals the service to reopen its log. `copytruncate` copies then truncates the original for programs that cannot reopen files. Test a config with `logrotate -d` (debug, no changes) or force a rotation with `logrotate -f`.",
   "```\n/var/log/payments/*.log {\n    daily\n    rotate 14\n    compress\n    delaycompress\n    missingok\n    notifempty\n    create 0640 payments adm\n    postrotate\n        systemctl kill -s HUP payments.service\n    endscript\n}\n```",
   "Consider a worked example. A payments service crashed overnight and the server rebooted. `journalctl -u payments -b -1 -p err` shows the errors from the previous boot, but only because you earlier created `/var/log/journal` to make the journal persistent. You confirm that rsyslog forwarded the same messages to the central server with `*.* @@logs.example.com:514`, which matters because the local disk was nearly full: the service's text log had grown for weeks. You add the logrotate stanza above, check it with `logrotate -d /etc/logrotate.d/payments`, and the next morning see compressed, dated copies with only fourteen kept.",
   "Common mistakes: expecting `journalctl -b -1` to work when the journal is volatile; writing `@` when TCP forwarding was required; reading `*.err` as 'only err' when it means err and everything more severe; forgetting the `postrotate` signal, so a service keeps writing to the rotated file; and editing logrotate files without a dry run.",
   "On the exam, 'previous boot' is `-b -1`, 'follow live' is `-f`, 'one service' is `-u`, 'errors and worse' is `-p err`, 'kernel only' is `-k`, 'two @' is TCP, 'keep N copies' is `rotate N`, 'program cannot reopen its log' is `copytruncate`, and 'logs lost after reboot' points to persistent journal storage. 'Structured, binary, per-unit queries' describes the journal, while 'plain text files under /var/log' describes rsyslog."
  ],
  "terms": [
   [
    "systemd-journald",
    "The systemd logging service that stores structured log data queried with journalctl."
   ],
   [
    "rsyslog",
    "A syslog daemon that routes messages by facility and priority to files or remote servers."
   ],
   [
    "Facility and priority",
    "Syslog categories for the message source (auth, cron, kern, local0...) and severity (debug through emerg)."
   ],
   [
    "logrotate",
    "A utility that rotates, compresses and prunes log files according to rules in /etc/logrotate.d."
   ],
   [
    "Persistent journal",
    "Journal storage under /var/log/journal that survives reboots."
   ],
   [
    "logger",
    "A command that writes a test message into the system log with a chosen facility and priority."
   ]
  ],
  "example": "A service crashed overnight and the server rebooted. journalctl -u payments -b -1 -p err shows errors from the previous boot, but only because you earlier created /var/log/journal to make the journal persistent. You also confirm that rsyslog forwarded the same messages to the central log server with @@logs.example.com:514.",
  "tip": "In rsyslog forwarding, one @ means UDP and two @@ mean TCP; and in journalctl, -b -1 means the previous boot.",
  "check": [
   [
    "Which journalctl command follows new messages from the sshd unit in real time?",
    "journalctl -u sshd -f, where -u selects the unit and -f follows new entries."
   ],
   [
    "Why might journalctl -b -1 return nothing on a fresh install?",
    "The journal may be stored only in memory (/run/log/journal); without persistent storage, logs from previous boots are lost."
   ],
   [
    "What does rotate 4 combined with weekly do in a logrotate stanza?",
    "Rotates the log once a week and keeps four old copies, deleting older ones."
   ],
   [
    "Which rsyslog selector matches error messages and anything more severe from all facilities?",
    "*.err, because a priority in a selector means that level and every higher severity."
   ]
  ]
 },
 {
  "t": "Permissions: chmod symbolic and octal, chown, umask",
  "body": [
   "Linux file permissions decide who can read, change or run each file. Every file has an owner (user), a group owner, and three sets of permission bits for user (u), group (g) and others (o). The kernel checks them in order: if you are the owner, only the user bits apply; otherwise, if you are in the group, only the group bits apply; otherwise the others bits apply. Getting these right is the foundation of Linux security, and the exam expects you to convert between notations quickly.",
   "In `ls -l` output such as `-rwxr-x---`, the first character is the file type and the next nine characters are three triplets: user `rwx`, group `r-x`, others `---`. For files, r allows reading contents, w allows modifying contents and x allows executing. For directories the meanings differ: r allows listing names, w allows creating, deleting and renaming entries (together with x), and x allows entering the directory and accessing files inside it. That means deleting a file depends on write permission on the directory, not on the file itself.",
   "Octal notation assigns r=4, w=2 and x=1 and adds them per triplet: rwx=7, rw-=6, r-x=5, r--=4. So `chmod 755 script.sh` gives rwxr-xr-x, `chmod 640 app.conf` gives rw-r-----, and `chmod 600 ~/.ssh/id_ed25519` gives rw-------. Octal always sets all bits at once. Symbolic notation changes specific bits and leaves the rest alone: `chmod u+x script.sh` adds execute for the owner, `chmod g-w file` removes group write, `chmod o=r file` sets others to exactly read, `chmod a+r file` adds read for all, and `chmod ug=rw,o= file` sets several at once. `-R` applies changes recursively; with it, capital `X` adds execute only to directories and files that already have execute for someone, which avoids making every data file executable: `chmod -R u=rwX,g=rX,o= /srv/data`.",
   "`chown` changes ownership, and only root can give files away to another user. `chown alice file` changes the owner, `chown alice:devs file` changes owner and group, `chown :devs file` changes only the group (as does `chgrp devs file`), and `chown -R` recurses. An ordinary owner may change a file's group only to a group they belong to.",
   "umask sets default permissions for newly created files by masking bits off. Files start from 666 (no execute) and directories from 777, and the umask bits are removed. A umask of 022 gives files 644 and directories 755; a umask of 027 gives 640 and 750; 077 gives 600 and 700. Run `umask` to see the current value (`umask -S` shows it symbolically) and `umask 027` to change it for the session. System-wide defaults come from `/etc/login.defs`, `/etc/profile` or shell startup files, and systemd services can set `UMask=` in their unit. A stricter umask is a simple hardening step for servers that hold sensitive data. When a user is denied access, check permissions along the whole path: every parent directory needs x for the user to reach the file. `namei -l /path/to/file` shows the permissions of each component in one view.",
   "Consider a worked example. A shared project directory must be readable and writable by the devs group but invisible to everyone else. You run `chown -R root:devs /srv/project` and `chmod -R u=rwX,g=rwX,o= /srv/project`, so directories become 770 and files 660 without data files gaining execute. You set `umask 007` in the team's shell profile so new files are created as 660 and directories as 770. When a developer outside the group reports 'permission denied', `namei -l /srv/project/notes.txt` shows that is exactly what should happen. A new team member in devs can read the files after logging in again.",
   "Common mistakes: using `chmod -R 777` to 'fix' access, which lets anyone change or replace files; running `chmod -R 755` on data and making every file executable (use `X`); forgetting that deleting a file needs write on the directory; checking only the file and ignoring the x bit on a parent directory; and computing umask by 'subtracting' when bits overlap in odd ways. The safe method is to think of it as removing bits: 666 with 033 removed gives 644, not 633.",
   "Exam questions usually give one notation and ask for the other, or give a umask and ask for the result. Convert each triplet separately: 750 is rwxr-x---, 644 is rw-r--r--. 'Add execute for owner only, change nothing else' is symbolic `u+x`. 'Set exact permissions' fits octal. 'Change owner and group together' is `chown user:group`. 'New files should be 640' means umask 027. 'Cannot open a 644 file' points to a parent directory missing x."
  ],
  "terms": [
   [
    "Octal permissions",
    "Numeric notation where r=4, w=2, x=1 are summed for user, group and others, such as 750."
   ],
   [
    "Symbolic permissions",
    "Notation using u, g, o, a with +, - or = and r, w, x to change specific bits."
   ],
   [
    "Execute on a directory",
    "Permission to enter a directory and access its contents by name."
   ],
   [
    "Capital X",
    "A symbolic chmod bit that adds execute only to directories and files already executable by someone."
   ],
   [
    "chown",
    "Changes a file's owner and/or group owner, for example chown alice:devs file."
   ],
   [
    "umask",
    "A mask of permission bits removed from the defaults (666 files, 777 directories) when new files are created."
   ]
  ],
  "example": "A shared project directory must be readable and writable by the devs group but invisible to everyone else. You run chown -R root:devs /srv/project and chmod -R u=rwX,g=rwX,o= /srv/project, then set umask 007 in the team's shell profile so new files are created as 660 and directories as 770.",
  "tip": "Compute umask results by removing the umask bits from 666 for files and 777 for directories; a umask of 027 yields 640 files and 750 directories.",
  "check": [
   [
    "What permissions does chmod 750 give in symbolic form?",
    "rwxr-x---: owner read/write/execute, group read/execute, others nothing."
   ],
   [
    "A user can read a file's permissions but gets permission denied opening it, even though the file is 644. What might be wrong?",
    "A parent directory lacks execute (x) permission for that user, so the path cannot be traversed."
   ],
   [
    "With a umask of 077, what permissions does a new file get?",
    "600 (rw-------), because all group and others bits are removed from the 666 default."
   ],
   [
    "A user without write permission on a file can still delete it. Why?",
    "Deleting is controlled by write and execute permission on the containing directory, not by the file's own permissions."
   ]
  ]
 },
 {
  "t": "Special permissions: SUID, SGID, sticky bit; ACLs with setfacl and getfacl",
  "body": [
   "Beyond the basic rwx bits, Linux has three special permission bits and optional ACLs (access control lists). They solve real problems, such as letting users change their own password or share a directory safely, but they also create risk if misused, so the exam covers both their use and their security implications. Each special bit appears as a letter in one of the three execute positions of `ls -l`.",
   "SUID (set user ID), octal 4000, applies to executables: the program runs with the privileges of the file's owner rather than the user who launched it. The classic example is `/usr/bin/passwd`, owned by root, which must update `/etc/shadow` on behalf of ordinary users. In `ls -l` it appears as an `s` in the user execute position: `-rwsr-xr-x`. A capital `S` means the bit is set but execute is not, which is usually a mistake. Because a flawed SUID-root program can let an attacker gain root, admins audit them with `find / -perm -4000 -type f 2>/dev/null` and remove the bit from anything that does not need it. Many systems also mount user-writable filesystems with `nosuid`. SUID is ignored on shell scripts by Linux, so it is only meaningful on compiled programs.",
   "SGID (set group ID), octal 2000, has two uses. On an executable it runs the program with the file's group. On a directory, which is the more common use, new files created inside inherit the directory's group instead of the creator's primary group, so a team directory stays consistently group-owned. It shows as `s` in the group execute position: `drwxrws---`. The sticky bit, octal 1000, applies to directories: users may only delete or rename files they own (or the directory owner or root can), even if the directory is world-writable. `/tmp` is the standard example, shown as `t` in the others execute position: `drwxrwxrwt`. Set these with a leading octal digit or symbolically: `chmod 4755 /usr/local/bin/tool` or `chmod u+s`, `chmod 2770 /srv/team` or `chmod g+s`, `chmod 1777 /shared/drop` or `chmod +t`. The leading digit adds up like the others, so a team share that also needs delete protection combines SGID (2) and sticky (1) as 3770.",
   "ACLs extend the owner/group/others model when you need to grant access to specific additional users or groups. `setfacl -m u:bob:rw report.txt` gives bob read and write; `setfacl -m g:auditors:r report.txt` adds a group; `setfacl -x u:bob report.txt` removes an entry and `setfacl -b` removes all ACLs. Default ACLs on a directory, set with `setfacl -d -m g:devs:rwx /srv/project` (or `d:` in the entry), are inherited by new files created inside. `getfacl file` displays all entries, including the mask, which caps the effective permissions of named users and groups and the owning group. A `+` at the end of the permission string in `ls -l`, such as `-rw-rw-r--+`, tells you an ACL is present. ACLs are supported by ext4, XFS and Btrfs on modern systems, and copying tools need options such as `cp -a` or `rsync -A` to preserve them.",
   "```\n$ getfacl /srv/finance/reports\n# owner: root\n# group: finance\n# flags: -st\nuser::rwx\nuser:auditor:r-x\ngroup::rwx\nmask::rwx\nother::---\ndefault:user:auditor:r-x\n```",
   "Consider a worked example. The finance team shares `/srv/finance`. You set `chown root:finance` and `chmod 3770`, so files inherit the finance group (SGID) and members cannot delete each other's files (sticky). An external auditor needs read-only access to one subfolder, so you run `setfacl -R -m u:auditor:rX /srv/finance/reports` for existing files and `setfacl -d -m u:auditor:rX /srv/finance/reports` for future ones, then verify with `getfacl`, whose output looks like the block above; the `flags: -st` line shows SGID and sticky are set.",
   "Common mistakes: seeing capital `S` or `T` and assuming the bit works normally (execute is missing); leaving unneeded SUID-root programs in place; setting SGID on a directory and expecting existing files to change group (only new files inherit); forgetting that a restrictive ACL mask can silently reduce a named user's rights, which `getfacl` reports as `#effective:`; and copying files with plain `cp`, losing their ACLs.",
   "Exam questions usually show a permission string or octal mode and ask what it does. 's' in the user slot is SUID; 's' in the group slot is SGID; 't' at the end is sticky; a trailing `+` means ACLs. 'Users must not delete each other's files in a shared directory' is the sticky bit. 'New files should belong to the team group' is SGID on the directory. 'Program must run with its owner's rights' is SUID. 'Give one extra user access without changing owner or group' is `setfacl -m`, and 'new files should inherit that access' is a default ACL."
  ],
  "terms": [
   [
    "SUID",
    "Special bit (4000) that makes an executable run with its owner's privileges; shown as s in the user execute slot."
   ],
   [
    "SGID",
    "Special bit (2000) that runs a program with the file's group or makes new files in a directory inherit its group."
   ],
   [
    "Sticky bit",
    "Directory bit (1000) that allows only a file's owner, the directory owner or root to delete or rename it."
   ],
   [
    "ACL",
    "Access control list: extra per-user or per-group permission entries managed with setfacl and getfacl."
   ],
   [
    "Default ACL",
    "An ACL on a directory that new files and subdirectories inherit when they are created."
   ],
   [
    "ACL mask",
    "The ACL entry that limits the maximum effective permissions for named users, named groups and the owning group."
   ]
  ],
  "example": "The finance team shares /srv/finance. You set chown root:finance and chmod 3770 so files inherit the finance group (SGID) and members cannot delete each other's files (sticky). An external auditor needs read-only access to one subfolder, so you run setfacl -R -m u:auditor:rX /srv/finance/reports and setfacl -d -m u:auditor:rX on it for future files, verifying with getfacl.",
  "tip": "Map the letters to positions: s in the user slot is SUID, s in the group slot is SGID, t in the others slot is the sticky bit; a + after the permissions means ACLs exist.",
  "check": [
   [
    "Which command finds all SUID files on the system?",
    "find / -perm -4000 -type f 2>/dev/null, where -4000 matches any file with the SUID bit set."
   ],
   [
    "What octal mode gives a directory rwx for owner and group, nothing for others, and SGID?",
    "2770, where the leading 2 is SGID and 770 gives rwx to owner and group."
   ],
   [
    "How do you give user maria read access to plan.txt without changing its owner or group?",
    "setfacl -m u:maria:r plan.txt, which adds a named-user ACL entry."
   ],
   [
    "What does a capital S in the user execute position of ls -l mean?",
    "The SUID bit is set but the owner's execute bit is not, so the setting has no useful effect and is usually a mistake."
   ]
  ]
 },
 {
  "t": "SELinux: modes, contexts, restorecon, semanage, booleans, ausearch; AppArmor profiles and modes",
  "body": [
   "Standard permissions are DAC (discretionary access control): the owner decides who gets access. SELinux (Security-Enhanced Linux) and AppArmor add MAC (mandatory access control): a system-wide policy limits what each program may do regardless of file ownership, so a compromised web server cannot read files outside what its policy allows. Both checks must pass, so a file can have perfect permissions and still be denied. RHEL-family systems use SELinux; Ubuntu and Debian use AppArmor, which SUSE also used for years, although newer SUSE releases default to SELinux.",
   "SELinux has three modes. Enforcing applies the policy and blocks violations. Permissive allows everything but logs what would have been denied, which is useful for troubleshooting. Disabled turns SELinux off entirely. `getenforce` shows the mode, `sestatus` gives detail, and `setenforce 0` or `setenforce 1` switches between permissive and enforcing until reboot. The persistent setting is `SELINUX=` in `/etc/selinux/config`. Switching from disabled back to enabled requires a full filesystem relabel (for example by creating `/.autorelabel` and rebooting), and disabling SELinux to make a problem go away is the wrong answer on the exam and in practice.",
   "Every process and file has a context, in the form user:role:type:level, for example `system_u:object_r:httpd_sys_content_t:s0`. In the default targeted policy the type is what matters: the Apache process runs as `httpd_t` and may read files labeled `httpd_sys_content_t`. View contexts with `ls -Z` for files and `ps -eZ` for processes. Labels are the most common problem. A file created in a home directory and then moved with `mv` keeps its old label, so the web server is denied access, whereas `cp` creates a new file that takes the destination's label. `restorecon -Rv /var/www/html` resets files to the default labels defined by policy. `chcon -t type file` changes a label temporarily, but a relabel or restorecon will undo it.",
   "To define a new default for a custom path, use `semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?'` and then run `restorecon -Rv /srv/web`. `semanage port -a -t http_port_t -p tcp 8081` allows a service to use a non-standard port, and `semanage port -l` lists port labels. Booleans are on/off switches for optional policy behavior. `getsebool -a` lists them, and `setsebool -P httpd_can_network_connect on` lets Apache make outbound network connections; `-P` makes it persistent. Denials are logged as AVC (access vector cache) messages in `/var/log/audit/audit.log`. `ausearch -m avc -ts recent` finds recent denials, `sealert` (from setroubleshoot) explains them in plain language, and `audit2why` interprets them. `audit2allow` can generate a custom policy module, but prefer fixing labels, ports or booleans first.",
   "AppArmor instead confines programs with path-based profiles stored in `/etc/apparmor.d/`. Each profile runs in enforce mode (violations blocked and logged) or complain mode (violations only logged). `aa-status` lists loaded profiles and their modes, `aa-enforce` and `aa-complain` switch a profile, `aa-disable` turns one off, and `apparmor_parser -r` reloads a profile after editing. Denials appear in the kernel log or audit log with `apparmor=\"DENIED\"`. The key design difference is that SELinux labels objects and decides by type, while AppArmor decides by file path, so moving a file changes how AppArmor sees it but not its SELinux label.",
   "Consider a worked example. After moving a new site into `/var/www/html` with `mv`, visitors get 403 Forbidden. Permissions look fine, so you suspect MAC. `ls -Z` shows the files labeled `user_home_t`, and `ausearch -m avc -ts recent` shows `httpd_t` denied read access to them. Running `restorecon -Rv /var/www/html` relabels them `httpd_sys_content_t` and the site loads, with SELinux still enforcing. Next week the application must call an external API; the AVC log shows a denied network connection, and `setsebool -P httpd_can_network_connect on` fixes it without writing any custom policy.",
   "Common mistakes: disabling SELinux or setting it permissive permanently instead of fixing the cause; using `chcon` for a permanent fix, which a relabel later undoes; forgetting `-P` on `setsebool`, so the boolean resets at reboot; running `semanage fcontext` but not `restorecon`, so existing files keep their old labels; editing `/etc/selinux/config` and expecting the mode to change without a reboot; and editing an AppArmor profile without reloading it.",
   "Exam questions usually describe a denial with correct Unix permissions. 'Files moved into the web root, 403 errors' points to `restorecon`. 'Custom content path, make the label permanent' is `semanage fcontext` plus `restorecon`. 'Service on a non-standard port' is `semanage port -a`. 'Allow optional behavior persistently' is `setsebool -P`. 'Find denials' is `ausearch -m avc`. 'Log but do not block' is permissive (SELinux) or complain (AppArmor). 'List AppArmor profiles and modes' is `aa-status`."
  ],
  "terms": [
   [
    "MAC",
    "Mandatory access control: a system-enforced policy that restricts programs regardless of file ownership."
   ],
   [
    "SELinux context",
    "The user:role:type:level label on files and processes; the type drives most targeted-policy decisions."
   ],
   [
    "restorecon",
    "Resets file SELinux labels to the defaults defined in policy."
   ],
   [
    "semanage fcontext",
    "Defines a persistent default SELinux label for a path pattern, applied by restorecon."
   ],
   [
    "SELinux boolean",
    "A policy switch toggled with setsebool (-P for persistent) to allow optional behaviors."
   ],
   [
    "AVC denial",
    "An access vector cache message in the audit log recording an action SELinux blocked or would block."
   ],
   [
    "AppArmor profile",
    "A path-based policy for one program, running in enforce or complain mode."
   ]
  ],
  "example": "After moving a new site into /var/www/html with mv, visitors get 403 Forbidden. ls -Z shows the files labeled user_home_t, and ausearch -m avc -ts recent shows httpd_t denied read access. Running restorecon -Rv /var/www/html relabels them httpd_sys_content_t and the site loads, with SELinux still enforcing.",
  "tip": "The best-practice answer is almost never 'disable SELinux'; look for restorecon, semanage fcontext, semanage port or setsebool -P instead, and use permissive mode only temporarily to confirm SELinux is the cause.",
  "check": [
   [
    "Which SELinux mode logs denials without blocking them?",
    "Permissive, which records AVC messages but allows the actions, making it useful for troubleshooting."
   ],
   [
    "You serve web content from /srv/web. How do you make its correct label permanent?",
    "semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?' followed by restorecon -Rv /srv/web."
   ],
   [
    "What is the AppArmor equivalent of SELinux permissive mode for a single profile?",
    "Complain mode, set with aa-complain, which logs violations without blocking them."
   ],
   [
    "Why does a file moved with mv cause SELinux denials while a copied file does not?",
    "mv keeps the file's original label, while cp creates a new file that inherits the destination directory's default label."
   ]
  ]
 },
 {
  "t": "Firewalls: firewalld zones and --permanent, ufw, nftables/iptables basics",
  "body": [
   "A host firewall filters network traffic entering and leaving a Linux system, so only the services you intend are reachable. In the kernel, packet filtering is done by netfilter; the tools you use are front ends that write netfilter rules. Linux+ covers firewalld (RHEL-family), ufw (Ubuntu) and the lower-level nftables and iptables. A host firewall complements, rather than replaces, network firewalls, and it is part of the defense-in-depth approach the exam expects. firewalld organizes rules into zones, each representing a trust level: `drop`, `block`, `public`, `external`, `internal`, `dmz`, `work`, `home` and `trusted`. Each network interface or source address is assigned to one zone, and the zone's allowed services and ports apply to its traffic. `public` is a common default. Key commands use `firewall-cmd`: `--get-default-zone`, `--get-active-zones`, `--list-all` (shows the current zone's services, ports and interfaces), `--add-service=https`, `--add-port=8080/tcp`, `--remove-service`, `--zone=internal --change-interface=eth1`, and rich rules for finer control such as allowing a service only from one subnet. Services are predefined names that map to ports, like `ssh` for 22/tcp; `firewall-cmd --get-services` lists them.",
   "The crucial distinction is runtime versus permanent configuration. By default, `firewall-cmd --add-service=http` changes only the running firewall, lost at reload or reboot. Adding `--permanent` writes the change to configuration but does not apply it to the running firewall until `firewall-cmd --reload`. The usual pattern is either to run the command twice (with and without `--permanent`) or to make it permanent and reload; `--runtime-to-permanent` saves tested runtime changes. Note that `--reload` also discards any runtime-only changes you have not saved.",
   "ufw (Uncomplicated Firewall) is Ubuntu's simpler front end. `ufw status verbose` shows state and rules, `ufw default deny incoming` and `ufw default allow outgoing` set policies, `ufw allow 22/tcp` or `ufw allow OpenSSH` opens SSH, `ufw allow from 10.0.0.0/24 to any port 5432` restricts by source, and `ufw deny` and `ufw delete allow 80/tcp` block or remove rules. Finally `ufw enable` turns it on. Always allow SSH before enabling ufw on a remote machine, or you will lock yourself out. ufw rules are persistent automatically.",
   "iptables is the traditional rule tool, organized as tables (filter, nat, mangle) containing chains (INPUT, OUTPUT, FORWARD, PREROUTING, POSTROUTING). Rules are evaluated in order and the first match decides the target (ACCEPT, DROP, REJECT); unmatched packets follow the chain policy. DROP silently discards a packet, while REJECT sends back an error, so the client fails fast. `iptables -L -n -v` lists rules, `iptables -A INPUT -p tcp --dport 22 -j ACCEPT` appends one and `-I` inserts at the top. Rules are not persistent without saving, via `iptables-save` or a persistence package. nftables is the modern replacement, with one tool, `nft`, a cleaner syntax and IPv4 and IPv6 handled together in the `inet` family. `nft list ruleset` shows everything. On current distributions, firewalld uses nftables as its backend and the `iptables` command often translates to nftables underneath. Pick one management tool per host; mixing firewalld, ufw and hand-written rules leads to confusing conflicts.",
   "```\nfirewall-cmd --permanent --add-service=https\nfirewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=10.0.20.0/24 service name=postgresql accept'\nfirewall-cmd --reload\nfirewall-cmd --list-all\n```",
   "Consider a worked example. A new RHEL web server must accept HTTPS from anywhere and PostgreSQL only from the application subnet. You run the commands above: open HTTPS permanently, add a rich rule allowing PostgreSQL only from 10.0.20.0/24, reload, and confirm with `--list-all`. From an application server the database connects; from a laptop on another subnet it times out, which is what you want. On an Ubuntu utility host you do the equivalent with `ufw allow OpenSSH`, `ufw allow 443/tcp` and `ufw enable`, and check with `ufw status verbose`.",
   "Common mistakes: adding a firewalld rule without `--permanent` and losing it at reboot; adding it with `--permanent` and forgetting `--reload`; enabling ufw before allowing SSH on a remote host; appending an iptables ACCEPT rule after a rule that already drops the traffic (order matters); and running two firewall managers at once.",
   "On the exam, 'works now but gone after reboot' means `--permanent` was missing; 'permanent rule has no effect yet' means reload; 'trust level bound to an interface' is a zone; 'one tool for IPv4 and IPv6 together' is nftables with `nft list ruleset`; and 'simple Ubuntu front end' is ufw. 'Silently discard' is DROP, while 'send an error back' is REJECT."
  ],
  "terms": [
   [
    "netfilter",
    "The Linux kernel framework that performs packet filtering and NAT, configured by firewall tools."
   ],
   [
    "firewalld zone",
    "A named trust level with its own allowed services and ports, bound to interfaces or source addresses."
   ],
   [
    "--permanent",
    "firewall-cmd option that saves a change to configuration; it takes effect after --reload."
   ],
   [
    "Rich rule",
    "A firewalld rule with finer conditions, such as allowing a service only from a specific source subnet."
   ],
   [
    "ufw",
    "Uncomplicated Firewall, Ubuntu's simplified front end with persistent rules."
   ],
   [
    "nftables",
    "The modern netfilter rule framework managed with nft, replacing iptables."
   ],
   [
    "DROP vs REJECT",
    "DROP silently discards a packet; REJECT discards it and returns an error to the sender."
   ]
  ],
  "example": "A new RHEL web server must accept HTTPS from anywhere and PostgreSQL only from the app subnet. You run firewall-cmd --permanent --add-service=https and firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=10.0.20.0/24 service name=postgresql accept', then firewall-cmd --reload, and confirm with firewall-cmd --list-all.",
  "tip": "If a firewalld rule works now but disappears after reboot, it was added without --permanent; if a --permanent rule has no effect yet, the firewall was not reloaded.",
  "check": [
   [
    "How do you permanently open port 8443/tcp in firewalld's default zone and apply it immediately?",
    "firewall-cmd --permanent --add-port=8443/tcp followed by firewall-cmd --reload."
   ],
   [
    "What should you do before running ufw enable on a remote server?",
    "Allow SSH (for example ufw allow OpenSSH or ufw allow 22/tcp) so the connection is not blocked."
   ],
   [
    "Which command shows the full nftables configuration?",
    "nft list ruleset, which prints every table, chain and rule."
   ],
   [
    "Why might an iptables ACCEPT rule appended with -A have no effect?",
    "Rules are evaluated in order, so an earlier rule that drops or rejects the traffic matches first; insert the rule with -I or reorder."
   ]
  ]
 },
 {
  "t": "SSH hardening: key-based auth, ssh-copy-id, sshd_config (PermitRootLogin, PasswordAuthentication)",
  "body": [
   "SSH (Secure Shell) is how you administer almost every Linux server, which makes it one of the most attacked services on the internet. Automated bots constantly try common usernames and passwords against any address with port 22 open. Hardening SSH means replacing passwords with keys, restricting who can log in and how, and keeping the daemon configuration tight. Because a mistake here can lock you out of a remote machine, the order in which you make changes matters as much as the changes themselves.",
   "Key-based authentication uses a key pair. The private key stays on your workstation, ideally protected by a passphrase; the public key is placed on the server in `~/.ssh/authorized_keys` of the account you log into. During login, the server challenges the client to prove it holds the private key, and the private key itself is never sent over the network. Keys are far harder to guess than passwords and cannot be phished or reused in the same way. Generate a pair with `ssh-keygen -t ed25519` (Ed25519 is the modern default; RSA with a large key size is also common), which creates `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`. Only the `.pub` file ever leaves your machine.",
   "`ssh-copy-id user@server` appends your public key to the server's authorized_keys and sets sensible permissions, using your password one last time. Permissions matter: sshd's StrictModes check refuses keys if `~/.ssh` or the home directory is writable by others. Use 700 for `~/.ssh` and 600 for `authorized_keys` and for private keys on the client. `ssh-agent` with `ssh-add` holds a decrypted key in memory so you type the passphrase once per session. Client-side settings such as host aliases, usernames, ports and key files go in `~/.ssh/config`, so `ssh web01` can expand to a full command.",
   "The server daemon is configured in `/etc/ssh/sshd_config`, and many distributions also read drop-in files from `/etc/ssh/sshd_config.d/`. `PermitRootLogin no` stops direct root logins so admins log in as themselves and use sudo, which improves accountability; `prohibit-password` allows root only with keys and is a common default. `PasswordAuthentication no` disables passwords entirely once keys work, which defeats password brute-force attacks; `KbdInteractiveAuthentication no` closes the related keyboard-interactive path. `PubkeyAuthentication yes` keeps keys enabled. `AllowUsers` or `AllowGroups` restrict logins to named accounts, `MaxAuthTries` limits attempts per connection, `LoginGraceTime` shortens the unauthenticated window, and `X11Forwarding no` disables an unneeded feature. Changing `Port` reduces log noise but is not real security; on SELinux systems a new port also needs `semanage port -a -t ssh_port_t -p tcp <port>`, plus a firewall rule.",
   "Apply changes safely. Run `sshd -t` to test the syntax (`sshd -T` prints the effective settings), then `systemctl reload sshd` (the unit is `ssh` on Debian-family systems). Keep your current session open and test a new login in a second terminal before logging out; if something is wrong, you can still fix it. Add complementary controls: fail2ban bans addresses that repeatedly fail authentication by watching logs, firewall rules can restrict SSH to management networks, and MFA (multi-factor authentication) can be added through PAM. Review `/var/log/secure`, `/var/log/auth.log` or `journalctl -u sshd` for failed logins. Finally, verify server host keys when you first connect; the fingerprint prompt protects you against man-in-the-middle attacks, and `~/.ssh/known_hosts` records keys you have accepted.",
   "Consider a worked example. A new cloud VM shows thousands of failed root password attempts in its authentication log. On your laptop you run `ssh-keygen -t ed25519` and set a passphrase, then `ssh-copy-id admin@vm`. In a second terminal you confirm `ssh admin@vm` logs in without a password prompt and that `sudo -v` works. Only then do you create `/etc/ssh/sshd_config.d/50-hardening.conf` containing `PermitRootLogin no`, `PasswordAuthentication no` and `AllowGroups sshadmins`, run `sshd -t`, and reload the service. A fresh login still works, and the bots now fail immediately because the server no longer offers password authentication at all.",
   "Common mistakes: disabling PasswordAuthentication before confirming key login works, which locks you out; loosening permissions with `chmod 777` on a home directory, which silently breaks key login; editing the file but forgetting to reload sshd; forgetting that a drop-in file or a `Match` block can override the main file, so check with `sshd -T`; copying the private key to the server instead of the public key; and treating a changed port as a security control rather than noise reduction.",
   "Exam questions usually describe a goal or a symptom. 'Prevent brute-force password guessing' points to key-based authentication plus `PasswordAuthentication no`. 'Administrators must be individually accountable' or 'stop direct root login' points to `PermitRootLogin no` with sudo. 'Copy a public key to a server' is `ssh-copy-id`. 'Key login falls back to a password prompt' or 'bad ownership or modes' points to permissions on the home directory, `~/.ssh` or authorized_keys. 'Check configuration before restarting' is `sshd -t`, and 'limit which users can connect' is `AllowUsers` or `AllowGroups`."
  ],
  "terms": [
   [
    "Key-based authentication",
    "Logging in by proving possession of a private key whose public half is listed in the server's authorized_keys file."
   ],
   [
    "ssh-copy-id",
    "A helper that appends your public key to a remote account's authorized_keys and sets correct permissions."
   ],
   [
    "PermitRootLogin",
    "The sshd_config setting that controls whether root may log in directly over SSH (no, prohibit-password or yes)."
   ],
   [
    "PasswordAuthentication",
    "The sshd_config setting that enables or disables password logins; set to no once keys work."
   ],
   [
    "StrictModes",
    "An sshd check that refuses keys when the home directory, ~/.ssh or authorized_keys are writable by other users."
   ],
   [
    "sshd -t",
    "Tests sshd configuration syntax without restarting the daemon."
   ],
   [
    "known_hosts",
    "The client file recording server host keys you have accepted, used to detect man-in-the-middle attacks."
   ]
  ],
  "example": "A new cloud VM shows thousands of failed root password attempts in its auth log. You create a key with ssh-keygen -t ed25519, run ssh-copy-id admin@vm, confirm key login and sudo work in a second terminal, then set PermitRootLogin no and PasswordAuthentication no in a file under /etc/ssh/sshd_config.d/, run sshd -t and reload sshd. The brute-force attempts now fail immediately, and every admin action is logged under a named account.",
  "tip": "Order matters in hardening: confirm key-based login works before disabling PasswordAuthentication, and keep an existing session open while testing. 'Stop root logging in directly' is PermitRootLogin no, not removing root's password.",
  "check": [
   [
    "Key login fails and the server log mentions bad ownership or modes. What should you check?",
    "That ~/.ssh is 700, authorized_keys is 600, and the home directory is not writable by group or others, all owned by the user, because StrictModes refuses keys otherwise."
   ],
   [
    "Why is PermitRootLogin no considered good practice?",
    "It removes root as a direct target and forces admins to log in as individuals and elevate with sudo, which is logged and accountable."
   ],
   [
    "Which command checks sshd_config syntax before reloading?",
    "sshd -t, which reports errors without touching the running daemon (sshd -T shows the effective settings)."
   ],
   [
    "What should you verify before setting PasswordAuthentication no on a remote server?",
    "That key-based login works in a separate session, so disabling passwords does not lock you out."
   ]
  ]
 },
 {
  "t": "Privilege escalation: sudo, visudo, /etc/sudoers.d, su, polkit",
  "body": [
   "Logging in as root for daily work is risky: every typo runs with full power, and actions are not tied to a person. Instead, administrators use normal accounts and elevate privileges only when needed, following the principle of least privilege. Linux+ tests the tools for this and calls it privilege escalation; in security reports the same phrase also describes an attacker gaining more rights than intended, often by abusing a badly written sudo rule, so the two meanings are closely linked.",
   "`su` (substitute user) switches to another account, root by default, and asks for the target account's password. `su -` (or `su -l`) starts a full login shell with the target's environment, which is usually what you want; plain `su` keeps much of your current environment, including PATH. `su - alice` becomes alice, and `su -c 'command'` runs one command. The drawbacks are that everyone who needs root must know the root password, and actions are logged as root rather than as the person.",
   "`sudo` lets permitted users run commands as root, or as another user, using their own password, and it logs each command. `sudo command` runs one command, `sudo -i` opens a root login shell, `sudo -u postgres psql` runs as another user, `sudo -l` lists what you are allowed to run, and `sudo -k` forgets cached credentials, which are otherwise remembered for a short time after a successful prompt. Commands appear in the authentication log or journal under the caller's name.",
   "Rules live in `/etc/sudoers`, and you should edit it only with `visudo`, which locks the file and checks syntax before saving; a broken sudoers file can lock every admin out. The rule format is `who where=(as_whom) what`: `alice ALL=(ALL) ALL` lets alice run anything as anyone. A `%` means a group: `%wheel ALL=(ALL) ALL` on RHEL-family systems and `%sudo ALL=(ALL:ALL) ALL` on Debian-family systems give members full rights, which is why adding a user to wheel or sudo makes them an admin. `NOPASSWD:` skips the prompt, which is convenient for automation but weakens security. Least privilege means granting specific commands with full paths: `%webops ALL=(root) /usr/bin/systemctl restart nginx`. Aliases such as `User_Alias` and `Cmnd_Alias` keep large policies readable.",
   "Rather than editing the main file, drop separate files into `/etc/sudoers.d/`, edited with `visudo -f /etc/sudoers.d/webops`, and check everything with `visudo -c`. This keeps changes modular and friendly to configuration management. Files there are ignored if their names contain a dot or end with `~`, and they should be mode 0440. Be careful which commands you grant: allowing an editor, a pager, a shell, or tools like `find`, `tar` or `less` can let a user break out to a full root shell, and a writable script called via sudo lets its owner run anything. polkit (formerly PolicyKit) is a separate framework that authorizes unprivileged processes to perform specific privileged actions through system services, such as a desktop user managing network connections, or `systemctl` and `timedatectl` asking for admin authentication. Rules are JavaScript files in `/etc/polkit-1/rules.d/`, and `pkexec` runs a program as another user under polkit control. Keep polkit patched, since serious vulnerabilities have been found in it.",
   "Consider a worked example. The web operations team needs to restart nginx but must not have full root. You run `visudo -f /etc/sudoers.d/webops` and add `%webops ALL=(root) /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx`. `visudo` accepts the syntax, and you confirm the file is mode 0440. A team member runs `sudo -l` and sees exactly those two commands. When she tries `sudo systemctl stop sshd`, sudo refuses and logs the attempt, while her permitted restarts appear in the journal under her own name.",
   "Common mistakes: editing `/etc/sudoers` with a normal editor and saving a syntax error; naming a drop-in file `webops.conf`, which sudo silently ignores because of the dot; granting `ALL` when a short command list would do; granting editors or shells that allow escape to root; using relative command paths; confusing `su -` (target password) with `sudo -i` (your password); and adding users to wheel or sudo casually without realizing it makes them full administrators.",
   "Exam questions often give a requirement and ask for the tool. 'Safely edit sudoers' is `visudo`, and 'add a rule without touching the main file' is `/etc/sudoers.d/` with `visudo -f`. 'See which commands you may run' is `sudo -l`. 'Switch to root with a full login environment' is `su -` or `sudo -i`. 'Users must not know the root password' and 'actions must be logged per user' point to sudo over su. 'A desktop application asks for admin authentication to change a system setting' points to polkit."
  ],
  "terms": [
   [
    "sudo",
    "Runs a command as root or another user after checking sudoers rules, using the caller's own password and logging the command."
   ],
   [
    "visudo",
    "Edits sudoers files with locking and syntax checking so a mistake cannot break sudo."
   ],
   [
    "/etc/sudoers.d",
    "A directory of drop-in sudoers files, each edited with visudo -f and ignored if the name contains a dot or ends in ~."
   ],
   [
    "su -",
    "Switches to another user, root by default, with a full login environment, using the target account's password."
   ],
   [
    "wheel / sudo group",
    "Groups granted full sudo rights on RHEL-family and Debian-family systems respectively."
   ],
   [
    "NOPASSWD",
    "A sudoers tag that lets a rule run without a password prompt, useful for automation but weaker."
   ],
   [
    "polkit",
    "A framework that authorizes unprivileged processes to perform specific privileged actions through system services, using rules in /etc/polkit-1/rules.d/."
   ]
  ],
  "example": "The web operations team needs to restart nginx but should not have full root. You run visudo -f /etc/sudoers.d/webops and add %webops ALL=(root) /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx. A team member runs sudo -l to confirm the allowed commands, a blocked attempt to stop sshd is refused and logged, and each permitted restart appears in the logs under her own name.",
  "tip": "Always choose visudo (or visudo -f for a drop-in) over editing sudoers with a normal editor, and remember that % in sudoers means a group. su needs the target's password; sudo needs your own.",
  "check": [
   [
    "What is the difference between su - and sudo -i?",
    "su - requires the target (root) password; sudo -i uses the caller's own password, is permitted by sudoers rules and is logged under the caller's name."
   ],
   [
    "What does %wheel ALL=(ALL) ALL mean?",
    "Members of the wheel group may run any command as any user on any host."
   ],
   [
    "Why is granting sudo access to vim risky?",
    "An editor can spawn a shell, so a user could escape to a full root shell rather than just editing files."
   ],
   [
    "A new file /etc/sudoers.d/ops.conf has no effect. Why?",
    "sudo ignores files in sudoers.d whose names contain a dot; rename it to ops and check it with visudo -c."
   ]
  ]
 },
 {
  "t": "Authentication: PAM modules (pam_faillock, pam_pwquality), LDAP/SSSD, Kerberos, MFA",
  "body": [
   "Authentication proves who a user is. On Linux, programs such as login, sshd and sudo do not implement password checks themselves; they delegate to PAM (Pluggable Authentication Modules). PAM lets administrators change how authentication works, add password rules or plug in a directory service without modifying each program. Understanding PAM stacks, the common modules and how central directories fit in explains most login behavior you will troubleshoot.",
   "Each PAM-aware service has a file in `/etc/pam.d/`, such as `sshd` or `sudo`, often including shared files like `system-auth` and `password-auth` (RHEL-family) or `common-auth` and `common-password` (Debian-family). Each line has a type, a control flag and a module. Types: `auth` verifies identity, `account` checks whether the account may log in now (expired, time restrictions), `password` handles password changes and `session` sets up or tears down the session. Control flags decide how results combine: `required` must succeed but the stack keeps running, `requisite` must succeed and fails immediately if not, `sufficient` ends the stack with success if it passes and nothing required failed earlier, and `optional` rarely matters. On RHEL-family systems, use `authselect` rather than editing the shared files by hand, because it regenerates them.",
   "`pam_pwquality` enforces password strength when passwords change. Settings in `/etc/security/pwquality.conf` include `minlen`, `minclass` (number of character classes), credits such as `dcredit` and `ucredit`, and `dictcheck`. `pam_faillock` locks an account after repeated failed logins, a defense against brute force. It is configured in `/etc/security/faillock.conf` with `deny` (failures allowed), `unlock_time` (seconds until automatic unlock) and `fail_interval`. `faillock --user alice` shows her failures and `faillock --user alice --reset` unlocks her. Older systems used `pam_tally2`. Other modules include `pam_limits` (resource limits from `/etc/security/limits.conf`) and `pam_access`.",
   "In organizations, accounts usually live centrally. LDAP (Lightweight Directory Access Protocol) is the protocol for directory services that store users and groups, such as OpenLDAP, 389 Directory Server, FreeIPA and Microsoft Active Directory. Use LDAPS or StartTLS so credentials are encrypted. SSSD (System Security Services Daemon) connects Linux to these directories: it retrieves identities, authenticates users, caches credentials so logins work offline, and integrates with PAM and nsswitch (`passwd: files sss` in `/etc/nsswitch.conf`). Configuration lives in `/etc/sssd/sssd.conf`, which must be mode 600. `realm join` can join a domain and configure SSSD, and `getent passwd user` or `id user` confirms directory users resolve.",
   "Kerberos provides single sign-on with tickets instead of sending passwords to every service. A user authenticates to the KDC (Key Distribution Center) and receives a TGT (ticket-granting ticket), then uses it to request service tickets. `kinit` obtains a ticket, `klist` lists tickets, `kdestroy` removes them, and `/etc/krb5.conf` defines realms. Kerberos is sensitive to clock differences, so time synchronization is essential. MFA (multi-factor authentication) requires two or more factor types: something you know, something you have and something you are. On Linux, MFA is usually added through a PAM module that checks TOTP (time-based one-time password) codes or hardware security keys, or through SSH `AuthenticationMethods publickey,keyboard-interactive` requiring both a key and a code.",
   "Consider a worked example. A user reports she cannot log in after a weekend. `faillock --user jlee` shows ten failures from an unknown IP address overnight, which pam_faillock correctly blocked. You confirm her identity through the help desk process, run `faillock --user jlee --reset`, have her change her password (which pam_pwquality checks against the policy), and pass the source address to the security team. Separately, a directory user on another host shows `id: no such user`; `systemctl status sssd` reveals the daemon failed because someone made `sssd.conf` world-readable, and fixing the mode to 600 restores lookups.",
   "Common mistakes: hand-editing files that authselect manages, so changes vanish; confusing `required` and `requisite`; unlocking an account without asking why it locked; leaving `sssd.conf` with loose permissions, which stops SSSD from starting; using plain LDAP without TLS; forgetting that Kerberos and TOTP both fail when clocks drift; and assuming pam_pwquality affects existing passwords, when it only checks new ones.",
   "Exam wording gives strong clues. 'Lock accounts after failed attempts' is pam_faillock, and 'enforce password length or complexity' is pam_pwquality. 'Is the account expired or allowed now' is the `account` type. 'Linux clients authenticate against Active Directory and cache credentials' points to SSSD. 'Tickets', 'KDC', 'TGT' or 'single sign-on' point to Kerberos, and 'clock skew too great' points to time sync. 'Something you have plus something you know' is MFA."
  ],
  "terms": [
   [
    "PAM",
    "Pluggable Authentication Modules, the framework through which Linux programs delegate authentication, account checks, password changes and session setup."
   ],
   [
    "Control flag",
    "The PAM keyword (required, requisite, sufficient, optional) that decides how a module's result affects the stack."
   ],
   [
    "pam_faillock",
    "A PAM module that locks an account after a set number of failed logins; managed with the faillock command."
   ],
   [
    "pam_pwquality",
    "A PAM module that enforces password strength rules from /etc/security/pwquality.conf when passwords change."
   ],
   [
    "SSSD",
    "The System Security Services Daemon, which connects Linux to LDAP, FreeIPA or Active Directory and caches identities and credentials."
   ],
   [
    "Kerberos TGT",
    "A ticket-granting ticket issued by the KDC after login, used to obtain service tickets without re-entering a password."
   ],
   [
    "MFA",
    "Multi-factor authentication, requiring two or more different factor types such as a password and a TOTP code."
   ]
  ],
  "example": "A user reports that she cannot log in after a weekend. faillock --user jlee shows ten failures from an unknown IP address overnight, which pam_faillock correctly blocked. You confirm her identity, reset with faillock --user jlee --reset, have her change her password, and pass the source IP to the security team so it can be blocked and investigated.",
  "tip": "Remember the PAM control flags: requisite fails immediately, required fails at the end of the stack, and sufficient can end the stack early with success. Lockouts are pam_faillock; complexity is pam_pwquality.",
  "check": [
   [
    "Which PAM module type checks whether an account is expired or allowed to log in right now?",
    "account, which runs after identity is verified by the auth type."
   ],
   [
    "How do you unlock a user locked by pam_faillock?",
    "faillock --user <name> --reset, ideally after checking why the failures happened."
   ],
   [
    "What does SSSD add beyond basic LDAP lookups?",
    "It integrates identity and authentication with PAM and nsswitch, supports Kerberos and Active Directory, and caches credentials for offline logins."
   ],
   [
    "Why can Kerberos logins fail on a host whose clock is ten minutes off?",
    "Kerberos tickets carry timestamps, and the KDC rejects requests when clocks differ by more than the allowed skew, typically about five minutes."
   ]
  ]
 },
 {
  "t": "Cryptography: hashing (sha256sum), GPG signatures, TLS certificates, LUKS disk encryption",
  "body": [
   "Cryptography gives Linux administrators three practical guarantees: integrity (the data was not changed), authenticity (it came from who you think) and confidentiality (only authorized parties can read it). Linux+ focuses on everyday tools that provide them: hashes for integrity, signatures for authenticity, TLS for data in transit and LUKS for data at rest. Knowing which tool gives which guarantee answers many exam questions on its own.",
   "A hash function turns any input into a fixed-length digest. The same input always gives the same digest, and any change, even one bit, gives a completely different one. Hashes are one-way: you cannot recover the input. `sha256sum file.iso` prints the SHA-256 digest; compare it with the value the publisher lists. `sha256sum -c SHA256SUMS` checks every file listed in a checksum file. MD5 and SHA-1 are considered broken for security because collisions can be produced, though you may still see them used as simple corruption checks. A hash only proves integrity if you got the expected value from a trusted source.",
   "GPG (GNU Privacy Guard) adds authenticity with public-key signatures. A publisher signs a file or checksum list with their private key; anyone with the matching public key can verify it. `gpg --import key.asc` imports a key, `gpg --verify file.sig file` checks a detached signature, `gpg --detach-sign file` creates one, and `gpg --encrypt -r recipient` and `gpg --decrypt` handle file encryption. Package managers use the same idea: dnf and apt verify repository signatures with imported keys, so a tampered package is rejected. Always verify a key's fingerprint through a trusted channel before trusting it.",
   "TLS (Transport Layer Security) encrypts network connections such as HTTPS. The server presents an X.509 certificate that binds its public key to its name and is signed by a CA (certificate authority). Clients trust it if it chains to a root CA in their trust store, the name matches an entry in the SAN (Subject Alternative Name), and it is within its validity dates and not revoked. `openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr` creates a key and a CSR (certificate signing request) to send to a CA; `openssl x509 -in cert.pem -noout -text` shows details such as validity dates; `openssl s_client -connect host:443` tests a live server. Self-signed certificates are fine for labs but trigger warnings elsewhere. Trust stores are updated with `update-ca-trust` (RHEL-family) or `update-ca-certificates` (Debian-family). Keep private keys readable only by the service.",
   "LUKS (Linux Unified Key Setup) encrypts entire block devices, protecting data at rest if a disk or laptop is stolen. `cryptsetup luksFormat /dev/sdb1` initializes encryption and destroys existing data, `cryptsetup open /dev/sdb1 securedata` unlocks it as `/dev/mapper/securedata`, you then create a filesystem and mount it, and `cryptsetup close securedata` locks it again. LUKS supports multiple key slots, so you can add a recovery passphrase with `cryptsetup luksAddKey`. `/etc/crypttab` lists devices to unlock at boot, and the initramfs handles an encrypted root. Back up the header with `cryptsetup luksHeaderBackup`, since a damaged header makes the data unrecoverable. LUKS does not protect data on a running, unlocked system.",
   "Consider a worked example. Before installing a downloaded ISO, you import the distribution's signing key and compare its fingerprint with one published through a separate trusted channel. You run `gpg --verify SHA256SUMS.sig SHA256SUMS`, which reports a good signature, then `sha256sum -c SHA256SUMS --ignore-missing`, which reports the ISO as OK. Both checks passing means the image is authentic and uncorrupted. Later, a laptop that will hold customer data gets a LUKS-encrypted data partition with a second key slot holding a recovery passphrase stored in the company vault, and you save a header backup offline.",
   "Common mistakes: treating a checksum from the same website as proof of authenticity; confusing hashing (one-way) with encryption (reversible with a key); sending the private key to a CA instead of a CSR; forgetting the SAN when a certificate's name does not match; running `luksFormat` on a device that holds data; assuming LUKS protects a mounted, running server from a network attacker; and making private key files world-readable.",
   "Exam wording maps to guarantees. 'Verify a download was not corrupted' is a hash such as `sha256sum`. 'Verify who published it' is a GPG signature. 'Encrypt data in transit' or 'HTTPS certificate' is TLS, and 'request a certificate from a CA' is a CSR. 'Protect data if a laptop is stolen' or 'encrypt a whole partition' is LUKS with `cryptsetup`. 'Certificate not trusted' points to the chain or trust store, while 'certificate expired' may be a real expiry or a wrong clock."
  ],
  "terms": [
   [
    "Hash",
    "A fixed-length, one-way digest of data that changes completely if the data changes; used to check integrity."
   ],
   [
    "GPG signature",
    "A value made with a private key that anyone with the matching public key can verify, proving integrity and authenticity."
   ],
   [
    "X.509 certificate",
    "A CA-signed document binding a public key to a name, used by TLS servers."
   ],
   [
    "CSR",
    "A certificate signing request containing a public key and identity details, sent to a CA to be signed."
   ],
   [
    "SAN",
    "Subject Alternative Name, the certificate field listing the host names the certificate is valid for."
   ],
   [
    "LUKS",
    "Linux Unified Key Setup, the standard format for full block-device encryption managed with cryptsetup."
   ],
   [
    "Key slot",
    "One of several LUKS entries that can each unlock the same volume with a different passphrase or key file."
   ]
  ],
  "example": "Before installing a downloaded ISO, you import the distribution's signing key, verify its fingerprint against the one published through a separate trusted channel, run gpg --verify SHA256SUMS.sig SHA256SUMS, and then sha256sum -c SHA256SUMS --ignore-missing. Both checks pass, so you know the image is authentic and uncorrupted before it goes anywhere near your servers.",
  "tip": "A checksum proves integrity only; a signature proves integrity and authenticity. Encryption (LUKS for data at rest, TLS for data in transit) is what provides confidentiality.",
  "check": [
   [
    "Why is verifying a GPG signature stronger than comparing a SHA-256 checksum from the same website?",
    "If the site is compromised, an attacker can change both file and checksum, but cannot forge a valid signature without the publisher's private key."
   ],
   [
    "Which openssl command shows a certificate's expiration date and SAN entries?",
    "openssl x509 -in cert.pem -noout -text (or -noout -dates for just the dates)."
   ],
   [
    "Which command unlocks a LUKS device so it can be mounted?",
    "cryptsetup open <device> <name>, which creates /dev/mapper/<name>."
   ],
   [
    "What do you send to a certificate authority to obtain a certificate?",
    "A CSR created with openssl req, never the private key, which stays on the server."
   ]
  ]
 },
 {
  "t": "OS hardening: disabling unused services, secure boot, patching, file integrity (AIDE)",
  "body": [
   "Hardening means reducing a system's attack surface: removing what is not needed, locking down what remains, keeping software current and watching for unauthorized change. No single control stops every attack, so hardening layers several defenses, an approach called defense in depth. The four areas in this lesson, services, boot integrity, patching and file integrity monitoring, are the core of most hardening checklists.",
   "Start with services. Every listening network service is a possible entry point, so run only what the server's role requires. `ss -tulpn` lists listening TCP and UDP ports with the owning process, and `systemctl list-unit-files --state=enabled` shows what starts at boot. For anything unnecessary, `systemctl disable --now name` stops it and prevents startup, and `systemctl mask name` blocks it from being started even manually or as a dependency. Better still, remove unneeded packages with dnf or apt so there is nothing to patch. Replace legacy cleartext protocols such as Telnet, rsh and plain FTP with SSH and SFTP. Minimal installation images make this easier from the start.",
   "Secure Boot is a UEFI (Unified Extensible Firmware Interface) feature that verifies digital signatures on boot components so only trusted code runs before the operating system. Most distributions use a small signed shim loader that then verifies GRUB and the kernel, and the kernel can require signed modules. This defends against bootkits and rootkits that tamper with early boot. `mokutil --sb-state` shows whether Secure Boot is enabled. Third-party kernel modules, such as some drivers, must be signed with a key enrolled as a MOK (Machine Owner Key) or they will not load. Protect firmware settings and GRUB with passwords so someone at the console cannot easily change boot parameters.",
   "Patching fixes known vulnerabilities, and unpatched software is one of the most common ways systems are compromised. Apply updates regularly with `dnf upgrade` or `apt update && apt upgrade`, prioritizing security updates (`dnf updateinfo list --security`, `dnf upgrade --security`). Automate where appropriate with dnf-automatic or unattended-upgrades. Kernel updates need a reboot to take effect unless you use a live patching service, and `needs-restarting -r` (RHEL-family) or the file `/var/run/reboot-required` (Debian-family) tells you when one is due. Test updates on non-production systems first, schedule maintenance windows and keep a rollback plan, such as snapshots or `dnf history undo`.",
   "File integrity monitoring detects unauthorized changes to important files, a common sign of intrusion. AIDE (Advanced Intrusion Detection Environment) builds a database of file attributes and hashes, then compares later scans against it. Configuration is in `/etc/aide.conf` or `/etc/aide/aide.conf`. Typical use: `aide --init` creates a new database, you move it into place as the reference (for example renaming `aide.db.new.gz` to `aide.db.gz`), then `aide --check` reports added, removed and changed files, usually from a daily timer or cron job. After legitimate changes such as patching, run `aide --update` and replace the database. Keep a copy offline or read-only, since an attacker with root could otherwise alter it. Other common steps include strict SSH settings, a host firewall, SELinux or AppArmor enforcing, `noexec`, `nosuid` and `nodev` on /tmp, safe sysctl network settings, and centralized logging.",
   "Consider a worked example. Hardening a new mail relay, you run `ss -tulpn` and find cups and an old rpcbind listener. You disable and remove both packages, apply security updates with `dnf upgrade --security`, and reboot into the new kernel after `needs-restarting -r` says a reboot is required. `mokutil --sb-state` reports Secure Boot enabled. You then initialize AIDE, install the database, copy it to read-only storage and schedule a nightly `aide --check`. A week later the report flags a changed binary in `/usr/bin` with no matching package update, and you open an incident.",
   "Common mistakes: stopping a service with `systemctl stop` but leaving it enabled, so it returns at the next boot; disabling Secure Boot permanently to load one unsigned driver instead of enrolling a MOK; installing patches without rebooting for a kernel fix; never updating the AIDE baseline after patching, so real changes hide among hundreds of expected ones; and storing the AIDE database only on the host it protects.",
   "Exam questions use recognizable clues. 'Reduce attack surface' points to removing or disabling unused services and packages. 'Prevent a service from being started, even as a dependency' is `mask`. 'Only signed boot loaders and kernels' is Secure Boot, and 'a third-party driver will not load with Secure Boot on' points to MOK signing. 'Detect unauthorized changes to system files' is AIDE or file integrity monitoring. 'Apply only security fixes' is `dnf upgrade --security`."
  ],
  "terms": [
   [
    "Attack surface",
    "The total set of services, software and interfaces an attacker could try to exploit."
   ],
   [
    "systemctl mask",
    "Links a unit to /dev/null so it cannot be started manually or as a dependency until unmasked."
   ],
   [
    "Secure Boot",
    "A UEFI feature that allows only signed boot loaders, kernels and modules to run."
   ],
   [
    "MOK",
    "Machine Owner Key, a locally enrolled key used to sign kernels or modules so they load under Secure Boot."
   ],
   [
    "AIDE",
    "Advanced Intrusion Detection Environment, a file integrity tool that compares files against a stored baseline of hashes and attributes."
   ],
   [
    "Patch management",
    "The process of finding, testing, applying and verifying software updates, prioritizing security fixes."
   ],
   [
    "Defense in depth",
    "Layering several independent controls so the failure of one does not expose the system."
   ]
  ],
  "example": "Hardening a new mail relay, you run ss -tulpn and find cups and an old rpcbind listener. You disable and remove both packages, apply all security updates with dnf upgrade --security and reboot into the new kernel, confirm mokutil --sb-state reports Secure Boot enabled, and initialize AIDE so a nightly check will flag unexpected changes under /etc and /usr/bin.",
  "tip": "After legitimate updates, the AIDE baseline must be updated, or every patched binary shows up as a change and real intrusions hide in the noise. disable stops startup at boot; mask blocks the unit entirely.",
  "check": [
   [
    "Which command lists listening ports and the processes that own them?",
    "ss -tulpn."
   ],
   [
    "What threat does Secure Boot mainly defend against?",
    "Tampered or malicious boot loaders, kernels and early boot code such as bootkits and rootkits."
   ],
   [
    "What does aide --check compare?",
    "The current state of monitored files (hashes, permissions, ownership, sizes) against the stored baseline database."
   ],
   [
    "What is the difference between systemctl disable and systemctl mask?",
    "disable stops a unit starting at boot but it can still be started manually or by a dependency; mask prevents it from being started at all."
   ]
  ]
 },
 {
  "t": "Compliance and auditing: auditd, log review, vulnerability scanning, CIS benchmarks",
  "body": [
   "Compliance means proving that systems meet a defined standard, whether an internal policy, an industry framework or a regulation. Auditing supplies the evidence: records of who did what and when, and proof that the configuration matches the standard. As a Linux administrator you configure these tools, respond to what they find and produce reports for auditors. The four pieces here work together: auditd records events, log review turns records into findings, vulnerability scanning finds known weaknesses, and benchmarks define what a good configuration looks like.",
   "The Linux audit system records security-relevant events at the kernel level. The `auditd` daemon writes events to `/var/log/audit/audit.log`. Rules can be added at runtime with `auditctl` and made persistent in files under `/etc/audit/rules.d/`, which `augenrules --load` compiles and loads. File watches record access to important files: `-w /etc/passwd -p wa -k identity` logs writes and attribute changes to /etc/passwd, tagged with the key identity. Syscall rules record system calls, such as every use of a privileged command. `auditctl -l` lists loaded rules and `auditctl -s` shows status. Each event includes the auid (audit user ID), the original login identity preserved even after sudo or su, which makes actions traceable to a person.",
   "Searching and summarizing audit data uses `ausearch` and `aureport`. `ausearch -k identity` finds events with that key, `ausearch -m USER_LOGIN --success no` finds failed logins, `ausearch -ua 1001` finds events by a user, `-ts today` limits the time range and `-i` interprets numeric values into names. `aureport --summary`, `aureport --auth` and `aureport --failed` produce overviews. SELinux denials also appear in the audit log as AVC (access vector cache) records.",
   "Log review is only effective if it is regular and focused. Watch for repeated failed logins, logins at odd hours or from unusual sources, new accounts or sudoers changes, services started or stopped unexpectedly, and gaps in logs, which may indicate tampering. `journalctl`, `last` (successful logins from wtmp), `lastb` (failed logins from btmp), `lastlog` and `who` help. Forwarding logs to a central server or SIEM (security information and event management) system with rsyslog or the journal's remote tools protects them from local tampering and allows correlation across hosts.",
   "Vulnerability scanning finds known weaknesses before attackers do. Network scanners such as OpenVAS/Greenbone probe hosts for vulnerable services and misconfigurations; authenticated (credentialed) scans log in to the host and give more accurate results about installed packages. Findings reference CVE (Common Vulnerabilities and Exposures) identifiers and are rated with CVSS (Common Vulnerability Scoring System) scores. Remediate by priority, patching or mitigating, then rescan to confirm. Only scan systems you are authorized to test. CIS (Center for Internet Security) Benchmarks are consensus configuration guides for specific operating systems and applications, grouped into Level 1 (a practical baseline) and Level 2 (stricter defense in depth). DISA STIGs (Security Technical Implementation Guides) serve a similar role for US defense systems. OpenSCAP automates checking: `oscap xccdf eval --profile <profile> --report report.html <datastream>` evaluates a system against a SCAP (Security Content Automation Protocol) profile and produces an HTML report, and many findings can be remediated automatically. Lynis performs broader hardening audits.",
   "Consider a worked example. An auditor asks for proof that changes to sudo rules are tracked. You create `/etc/audit/rules.d/sudo.rules` containing `-w /etc/sudoers -p wa -k sudoers` and `-w /etc/sudoers.d/ -p wa -k sudoers`, then run `augenrules --load` and confirm with `auditctl -l`. You make a harmless test change with `visudo` and show the auditor the event from `ausearch -k sudoers -i`, which names your auid even though the edit ran as root. You also attach an OpenSCAP report against the CIS profile, listing two failed checks with a remediation date and one documented exception approved by the security team.",
   "Common mistakes: adding rules with `auditctl` only, so they vanish at reboot; watching files without a key, which makes events hard to find; reviewing logs only after an incident; running a single scan and calling the system compliant, when compliance is continuous; applying every Level 2 recommendation without testing, which can break applications; and scanning networks without authorization. Remember that audit logs only help if they are protected and retained.",
   "Exam questions tie clue words to tools. 'Track who modified a file' is an auditd watch with `-w` and `-p wa`. 'Find audit events by key' is `ausearch -k`, and 'summary report of authentication events' is `aureport --auth`. 'Actions after sudo still traced to the person' is the auid. 'Known vulnerabilities with CVE numbers' is a vulnerability scanner. 'Consensus secure configuration guide' is a CIS Benchmark, and 'automated compliance evaluation with an HTML report' is OpenSCAP."
  ],
  "terms": [
   [
    "auditd",
    "The Linux audit daemon that records kernel-level security events to /var/log/audit/audit.log."
   ],
   [
    "Audit rule key (-k)",
    "A label attached to audit rules so related events can be found with ausearch -k."
   ],
   [
    "auid",
    "The audit user ID, the original login identity kept even after sudo or su."
   ],
   [
    "ausearch / aureport",
    "Tools that search audit logs for specific events and produce summary reports."
   ],
   [
    "CVE / CVSS",
    "Standard identifiers for known vulnerabilities and the scoring system used to rate their severity."
   ],
   [
    "CIS Benchmark",
    "A consensus-based, prioritized secure configuration guide for a specific operating system or application."
   ],
   [
    "OpenSCAP",
    "A tool that evaluates and can remediate systems against SCAP compliance profiles and produces reports."
   ]
  ],
  "example": "An auditor asks for proof that changes to sudo rules are tracked. You add -w /etc/sudoers -p wa -k sudoers and -w /etc/sudoers.d/ -p wa -k sudoers to /etc/audit/rules.d/sudo.rules, load them with augenrules --load, make a test change with visudo, and show the resulting event, including your auid, from ausearch -k sudoers -i.",
  "tip": "Know the audit tool trio: auditctl manages rules, ausearch finds specific events, and aureport produces summaries. Persistent rules belong in /etc/audit/rules.d/, not only in auditctl.",
  "check": [
   [
    "What does the audit rule -w /etc/shadow -p wa -k shadow do?",
    "Watches /etc/shadow and logs any write or attribute change, tagging events with the key shadow."
   ],
   [
    "Why is the auid field valuable in investigations?",
    "It records the original login user, so actions performed after sudo or su can still be traced to a person."
   ],
   [
    "What is the purpose of a CIS Benchmark?",
    "To provide a consensus, prioritized set of secure configuration recommendations to harden and audit a specific system."
   ],
   [
    "Why does an authenticated vulnerability scan give better results than an unauthenticated one?",
    "It logs in and inspects installed packages and settings directly, instead of guessing from network responses."
   ]
  ]
 },
 {
  "t": "Bash scripting: shebang, variables, parameter expansion, quoting, exit codes and $?",
  "body": [
   "A Bash script is a text file of shell commands run in sequence, letting you automate anything you can type. Linux+ performance-based questions often show a short script and ask what it prints or why it fails, so the core syntax needs to be solid. Most script bugs come from a handful of details: how the script is started, how variables are assigned and expanded, how quoting works, and how success and failure are reported.",
   "The first line is the shebang, which tells the kernel which interpreter should run the file: `#!/bin/bash`, or `#!/usr/bin/env bash` to find bash in the PATH. Make the script executable with `chmod +x script.sh` and run it as `./script.sh`; alternatively, `bash script.sh` runs it without execute permission. Running it with `source script.sh` (or `. script.sh`) executes it in the current shell, so variables and directory changes it makes remain afterwards. A script started normally runs in a child process and cannot change its parent's environment. Lines beginning with `#` are comments.",
   "Variables are assigned with no spaces around the equals sign: `name=web01`. `name = web01` runs a command called name instead. Read a value with `$name` or `${name}`; braces are needed when text follows, as in `${name}_backup`. Command substitution captures output: `today=$(date +%F)`. Arithmetic uses `$(( ))`: `count=$((count + 1))`. Special parameters include `$0` (script name), `$1`, `$2` and so on (positional arguments), `$#` (number of arguments), `$@` (all arguments as separate words), `$$` (the script's PID) and `$?` (exit status of the last command). `read -p 'Name: ' user` reads input, and `export VAR` makes a variable visible to child processes. Parameter expansion transforms variables without external tools: `${var:-default}` substitutes a default if var is unset or empty, `${var:=default}` also assigns it, `${var:?message}` exits with an error if unset, `${#var}` gives the length, `${file%.txt}` removes the shortest matching suffix, `${path##*/}` removes the longest prefix up to the last slash (like basename), and `${var/old/new}` replaces the first match.",
   "Quoting controls how the shell treats special characters. Double quotes allow variable and command expansion but prevent word splitting and globbing: `\"$file\"` stays one argument even if it contains spaces. Single quotes make everything literal: `'$HOME'` prints the five characters. A backslash escapes a single character. The rule of thumb is to double-quote every expansion, `\"$var\"` and `\"$@\"`, unless you specifically want splitting. Every command returns an exit status from 0 to 255: 0 means success and anything else failure, with meanings defined by the program. `$?` holds the status of the most recent command, so check it immediately, because the next command overwrites it. A script sets its own status with `exit 0` or `exit 1`. `&&` and `||` use exit codes: `mkdir /backup && cp file /backup` copies only if mkdir succeeded, and `ping -c1 host || echo down` prints only on failure.",
   "```bash\n#!/bin/bash\ntarget=\"${1:-/var/log}\"\nsize=$(du -sh \"$target\" 2>/dev/null)\nstatus=$?\nif [ \"$status\" -ne 0 ]; then\n  echo \"cannot read $target (exit $status)\" >&2\n  exit 1\nfi\necho \"$target uses ${size%%[[:space:]]*}\"\n```",
   "Consider a worked example. The script above takes a directory as its first argument and falls back to `/var/log` through `${1:-/var/log}`. It captures `du` output with command substitution, saves `$?` straight away into `status` so the value is not lost, and exits with 1 and a message on standard error if `du` failed. Finally `${size%%[[:space:]]*}` strips everything from the first whitespace onward, leaving just the size figure. Run as `./dusize.sh /srv/My Files`, it would fail, because the unquoted argument splits into two; `./dusize.sh \"/srv/My Files\"` works, and inside the script the quoted `\"$target\"` keeps the name intact.",
   "Common mistakes: spaces around `=` in assignments; unquoted variables that split on spaces or expand wildcards; checking `$?` after an `echo` rather than after the command you care about; using `source` when you meant to run a separate process, or vice versa; confusing `%` (suffix) with `#` (prefix) in parameter expansion; single-quoting a string that needs a variable expanded; and forgetting to make the script executable or giving it a Windows line ending that breaks the shebang.",
   "Exam questions often show code and ask for output or the bug. 'Variable keeps its value after the script ends' points to `source`. 'Command not found' on an assignment line means spaces around `=`. 'File names with spaces break the script' means missing double quotes. 'Default value if no argument given' is `${1:-default}`. 'Strip an extension' is `%`, and 'strip a leading path' is `##*/`. 'Status of the previous command' is `$?`, and 'number of arguments' is `$#`."
  ],
  "terms": [
   [
    "Shebang",
    "The #! first line that names the interpreter the kernel should use to run a script."
   ],
   [
    "Positional parameters",
    "The script's arguments, available as $1, $2 and so on, with $# as the count and $@ as the full list."
   ],
   [
    "Parameter expansion",
    "Shell syntax such as ${var:-default} or ${file%.txt} that substitutes or transforms variable values."
   ],
   [
    "Command substitution",
    "$(command), which replaces itself with the command's output."
   ],
   [
    "Exit status ($?)",
    "The 0 to 255 code a command returns, where 0 means success; $? holds the most recent one."
   ],
   [
    "source",
    "Runs a script in the current shell so its variables and directory changes persist."
   ]
  ],
  "example": "A backup script fails on a file named 'Q3 report.xlsx'. The line cp $file /backup split the name into two arguments. Changing it to cp \"$file\" /backup fixes it, and adding if [ $? -ne 0 ]; then echo 'copy failed' >&2; exit 1; fi right after the copy makes the failure visible in the cron job's logs instead of silently continuing.",
  "tip": "Look for spaces around = in assignments and unquoted variables; both are common deliberate errors in exam script questions. % trims from the end, # trims from the start.",
  "check": [
   [
    "What does ${filename%.log} produce if filename is app.log?",
    "app, because % removes the shortest matching suffix pattern .log."
   ],
   [
    "What is the difference between echo '$HOME' and echo \"$HOME\"?",
    "Single quotes print the literal text $HOME; double quotes expand it to the home directory path."
   ],
   [
    "Why must you check $? immediately after the command you care about?",
    "Because every command, including echo or test, overwrites $? with its own exit status."
   ],
   [
    "A script sets a variable, but it is empty in your shell after ./script.sh finishes. Why?",
    "The script ran in a child process; run it with source script.sh (or . script.sh) to keep its variables in the current shell."
   ]
  ]
 },
 {
  "t": "Bash control flow: if/test, case, for and while loops, functions, arrays",
  "body": [
   "Control flow lets a script make decisions and repeat work. With conditions, loops and functions you can turn a list of commands into a tool that handles many hosts, files or users. The exam expects you to read these constructs, predict what they do and spot errors in them, so pay attention to exact syntax, especially spaces and keywords.",
   "`if` runs a command and branches on its exit status: zero means true. Most often the command is a test. `[ ... ]` (the `test` command) and Bash's `[[ ... ]]` evaluate expressions, and the spaces inside the brackets are required. File tests: `-e` exists, `-f` regular file, `-d` directory, `-r`, `-w` and `-x` readable, writable, executable, `-s` non-empty. String tests: `-z` empty, `-n` non-empty, `=` or `==` equal, `!=` not equal. Integer comparisons use `-eq`, `-ne`, `-lt`, `-le`, `-gt` and `-ge`, not `<` or `>`, which in single brackets are redirections. `[[ ]]` adds pattern matching (`[[ $host == web* ]]`), regular expressions with `=~`, `&&` and `||` inside, and safer handling of unquoted variables. `(( ))` evaluates arithmetic: `(( count > 5 ))`. The structure is `if ...; then ...; elif ...; then ...; else ...; fi`. `case` matches one value against patterns, which is cleaner than a long if/elif chain, especially for command-line options. Each pattern ends with `)`, each block with `;;`, `|` separates alternatives, `*` is the catch-all default, and the statement ends with `esac`:",
   "```bash\ncase \"$1\" in\n  start|up)   systemctl start app ;;\n  stop)       systemctl stop app ;;\n  *)          echo \"usage: $0 {start|stop}\" >&2; exit 2 ;;\nesac\n```",
   "`for` loops iterate over a list: `for host in web01 web02 db01; do ssh \"$host\" uptime; done`, over files with a glob (`for f in /var/log/*.log; do ...; done`), over arguments with `for arg in \"$@\"`, or C-style with `for ((i=1; i<=5; i++))`. Brace expansion `{1..10}` generates sequences. `while` repeats as long as a command succeeds, and `until` repeats until it succeeds. The safest way to process a file line by line is `while IFS= read -r line; do ...; done < file`, which preserves spaces and backslashes; `for line in $(cat file)` splits on every space. `break` exits a loop and `continue` skips to the next iteration. Functions group reusable code: `backup() { local src=\"$1\"; tar -czf \"/backup/$(basename \"$src\").tgz\" \"$src\"; }`, called like a command: `backup /etc`. Inside a function, `$1` and friends are the function's own arguments; declare variables with `local` so they do not leak; `return n` sets the function's status, and to return data you echo it and capture it with `$(...)`. Functions must be defined before they are called.",
   "Arrays hold lists. Indexed arrays: `servers=(web01 web02 db01)`, `${servers[0]}` is the first element, `\"${servers[@]}\"` expands to all elements as separate words, `${#servers[@]}` gives the count, and `servers+=(cache01)` appends. `mapfile -t hosts < hosts.txt` reads a file into an array, one line per element. Associative arrays need `declare -A`: `declare -A port=([ssh]=22 [https]=443)`, then `${port[ssh]}`, and `${!port[@]}` lists the keys. Arrays are Bash features and are not available in plain POSIX sh, so a script using them needs a bash shebang.",
   "Consider a worked example. You need to check disk usage on every server in a list. The script reads hosts with `mapfile -t hosts < hosts.txt` and loops with `for h in \"${hosts[@]}\"`. A function `check_disk()` declares `local host=\"$1\"`, runs `ssh \"$host\" df --output=pcent /` and strips the percent sign, then uses `if (( usage > 90 ))` to print a warning. A `case` on `$1` lets the same script accept `report` or `quiet`, and a `while` loop with `sleep` could rerun the check until every host responds.",
   "Common mistakes: `[$x -eq 1]` without spaces, which fails; `[ $a > $b ]`, which creates a file named after `$b`; forgetting `fi`, `done` or `esac`; using `=` for numbers where `-eq` is needed; forgetting `;;` in case; leaving `\"${arr[@]}\"` unquoted; and omitting `local`, so function variables overwrite globals.",
   "Exam questions test exact syntax. 'Check that a file exists and is a regular file' is `[ -f file ]`, and 'is a directory' is `-d`. 'Compare numbers' means `-eq`, `-lt` or `-gt`, or `(( ))`. 'Many possible values of one variable' suggests `case`. 'Read a file line by line safely' is `while IFS= read -r line`. 'Number of elements' is `${#array[@]}`, 'key-value pairs' needs `declare -A`, and 'keep a function variable private' is `local`."
  ],
  "terms": [
   [
    "test / [ ]",
    "The command that evaluates file, string and integer expressions and returns 0 for true."
   ],
   [
    "[[ ]]",
    "Bash's extended test with pattern matching, =~ regular expressions and safer handling of unquoted variables."
   ],
   [
    "case",
    "A statement that matches one value against patterns, with ;; ending each branch and esac ending the block."
   ],
   [
    "while read loop",
    "while IFS= read -r line; do ...; done < file, the safe way to process a file line by line."
   ],
   [
    "local",
    "Declares a variable visible only inside the current function."
   ],
   [
    "Associative array",
    "A Bash array indexed by strings, created with declare -A."
   ]
  ],
  "example": "You need to check disk usage on every server in a list. A script reads hosts into an array with mapfile -t hosts < hosts.txt, loops with for h in \"${hosts[@]}\", runs a function check_disk \"$h\" that uses ssh and df, and uses if (( usage > 90 )) to print a warning only for hosts above 90 percent, so the morning report shows just the servers that need attention.",
  "tip": "Numbers compare with -eq, -lt and -gt inside [ ], while = and != compare strings; using > in single brackets silently creates a file instead of comparing.",
  "check": [
   [
    "Which test checks that /etc/app.conf exists and is a regular file?",
    "[ -f /etc/app.conf ]."
   ],
   [
    "Why is while IFS= read -r line; do ... done < file preferred to for line in $(cat file)?",
    "It reads whole lines intact, while the for loop splits on whitespace and expands globs."
   ],
   [
    "How do you print the number of elements in the array users?",
    "echo \"${#users[@]}\"."
   ],
   [
    "What ends each branch of a case statement, and what ends the whole statement?",
    "Each branch ends with ;; and the statement ends with esac."
   ]
  ]
 },
 {
  "t": "Safer scripts: set -euo pipefail, trap, input validation, shellcheck",
  "body": [
   "By default Bash is forgiving: if a command fails, the script carries on, an unset variable quietly becomes an empty string, and a failure early in a pipeline is ignored. That tolerance turns small mistakes into big damage, such as a script that runs `rm -rf \"$dir/\"*` when `dir` was never set. Defensive scripting habits prevent this, and Linux+ expects you to recognize them in code and choose the right one for a described problem.",
   "`set -e` (errexit) makes the script exit when a command fails, unless the failure is part of a condition such as an `if` test or a command followed by `||`. `set -u` (nounset) treats references to unset variables as errors, catching typos and missing arguments. `set -o pipefail` makes a pipeline return the status of the last command that failed rather than only the final command, so `grep pattern missing.txt | sort` reports failure. Combined, `set -euo pipefail` near the top is a common strict-mode starting point. It is not magic: some commands legitimately return non-zero (grep with no matches returns 1), so handle those with `|| true` or an explicit check. `set -x` prints each command before running it, which helps debugging, and `bash -n script.sh` checks syntax without running anything.",
   "`trap` runs a command when the script receives a signal or exits. `trap cleanup EXIT` calls a cleanup function however the script ends, which is ideal for removing temporary files or releasing lock files. `trap 'echo interrupted; exit 130' INT TERM` handles Ctrl+C and termination, and `trap '...' ERR` can log the failing line. Create temporary files safely with `mktemp` rather than fixed names like `/tmp/data`, which another user could pre-create or turn into a symlink pointing at a file you would then overwrite.",
   "```bash\n#!/usr/bin/env bash\nset -euo pipefail\ntmp=$(mktemp)\ntrap 'rm -f \"$tmp\"' EXIT\n[[ $# -eq 1 ]] || { echo \"usage: $0 <username>\" >&2; exit 2; }\nuser=$1\n[[ $user =~ ^[a-z_][a-z0-9_-]{0,31}$ ]] || { echo \"invalid username\" >&2; exit 2; }\ngetent passwd \"$user\" > \"$tmp\"\n```",
   "Input validation treats every argument, environment variable and file line as untrusted. Check the argument count (`$#`), match values against an allow-list or strict regular expression, confirm files exist and directories are what you expect, and refuse dangerous values such as an empty path or `/`. Quote every expansion so input cannot split into extra arguments or expand wildcards, and use `--` before user-supplied names so one beginning with a dash is not treated as an option (`rm -- \"$file\"`). Never pass input to `eval` or build commands as strings, because that invites command injection. Scripts run with sudo or from cron as root deserve extra care and should use absolute paths or set PATH explicitly. ShellCheck is a static analysis tool that warns about common bugs: unquoted variables, `[ $a == $b ]` errors, unreachable code and portability problems. Run `shellcheck script.sh` and fix or consciously suppress each finding; warnings have codes such as SC2086 (double quote to prevent globbing and word splitting). Many teams run ShellCheck in CI (continuous integration) pipelines so problems are caught before scripts reach servers.",
   "Consider a worked example. The script above requires exactly one argument and prints usage with exit code 2 otherwise. It checks the username against a strict pattern, so input such as `alice; rm -rf /` is rejected before it is used anywhere. `mktemp` creates a unique temporary file and the EXIT trap removes it whether the script succeeds, fails under `set -e`, or is interrupted. If `getent` finds no such user it returns 2, and strict mode stops the script there rather than continuing with an empty file. Running `shellcheck` on it reports no warnings.",
   "Common mistakes: assuming `set -e` catches failures inside `if` conditions or before `||`, which it deliberately ignores; forgetting that `grep` returning 1 for no match will abort a strict script; using fixed temp file names in /tmp; validating input but then using it unquoted; relying on the caller's PATH in a root cron job; and silencing every ShellCheck warning instead of understanding it.",
   "Exam questions describe a risk and ask for the control. 'Script continued after a command failed' is `set -e`. 'Typo in a variable name went unnoticed' or 'unset variable' is `set -u`. 'Failure in the middle of a pipeline was ignored' is `pipefail`. 'Always remove temporary files, even on error or Ctrl+C' is `trap ... EXIT` with `mktemp`. 'Find quoting and common bugs before running' is ShellCheck, and 'check syntax only' is `bash -n`."
  ],
  "terms": [
   [
    "set -e",
    "Exits the script when a command fails outside a condition or || list."
   ],
   [
    "set -u",
    "Treats use of an unset variable as an error that stops the script."
   ],
   [
    "pipefail",
    "Makes a pipeline's exit status reflect the last failing command rather than only the final one."
   ],
   [
    "trap",
    "Registers a command to run on a signal or on EXIT, commonly used for cleanup."
   ],
   [
    "mktemp",
    "Creates a uniquely named temporary file or directory safely."
   ],
   [
    "Input validation",
    "Checking arguments and data against expected formats or allow-lists before using them."
   ],
   [
    "ShellCheck",
    "A static analysis tool that reports common shell script bugs with codes such as SC2086."
   ]
  ],
  "example": "A cleanup script contained rm -rf \"$BASE_DIR\"/cache/*. When run from cron, BASE_DIR was not set, so it targeted /cache. After a near miss, the team adds set -euo pipefail so the unset variable aborts the script, validates that BASE_DIR is a non-empty existing directory, adds a trap to remove temp files, and runs shellcheck in CI on every change.",
  "tip": "Know what each strict-mode flag catches: -e failed commands, -u unset variables, and pipefail failures hidden inside pipelines. set -e does not fire inside if conditions or before ||.",
  "check": [
   [
    "Without pipefail, what exit status does false | true return?",
    "0, because only the last command's status (true) counts."
   ],
   [
    "How do you guarantee a temporary file is deleted when a script exits, even on error?",
    "Create it with mktemp and register trap 'rm -f \"$tmp\"' EXIT (or a cleanup function)."
   ],
   [
    "What does ShellCheck warning SC2086 usually ask you to do?",
    "Double-quote a variable expansion to prevent word splitting and globbing."
   ],
   [
    "Why should you write rm -- \"$file\" rather than rm $file for user-supplied names?",
    "Quoting keeps the name as one argument, and -- stops a name beginning with a dash from being read as an option."
   ]
  ]
 },
 {
  "t": "Python basics for admins: data types, sets and dicts, venv, pip, running scripts",
  "body": [
   "Bash is ideal for gluing commands together, but once a task involves structured data, APIs or more complex logic, Python is usually easier to write and maintain. Linux+ expects admin-level Python: reading basic code, choosing the right data type, managing packages in isolated environments and running scripts correctly. You do not need to be a developer, but you should be able to predict what a short script does.",
   "Python's basic types are `int` (whole numbers), `float` (decimals), `str` (text, in single or double quotes), `bool` (`True` or `False`) and `None` (no value). Variables are created by assignment and are dynamically typed, so `port = 22` makes an int. Convert with `int('22')`, `str(22)` and `float()`; `'22' + 1` raises a TypeError because Python will not mix strings and numbers silently. f-strings format text: `f'{host} uses port {port}'`. Indentation, conventionally four spaces, defines code blocks, so inconsistent indentation is a syntax error rather than a style issue.",
   "Collections are where Python shines. A list is an ordered, changeable sequence: `hosts = ['web01', 'web02']`, with `hosts.append('db01')`, `hosts[0]` and slicing like `hosts[1:]`. A tuple is ordered but unchangeable: `('10.0.0.1', 22)`. A set is an unordered collection of unique items, ideal for removing duplicates and comparing groups: `set(ips)` deduplicates, and `a - b` (difference), `a & b` (intersection) and `a | b` (union) answer questions like which users exist on server A but not B. Membership tests with `in` are fast on sets. A dictionary (dict) maps keys to values: `ports = {'ssh': 22, 'https': 443}`, read with `ports['ssh']`, or `ports.get('ftp', 0)` to avoid a KeyError when a key is missing, and loop with `for name, num in ports.items():`. JSON data from APIs maps naturally onto dicts and lists through the `json` module.",
   "Control flow reads like Bash with colons and indentation: `if`, `elif` and `else`, `for item in collection:`, `while condition:`, and functions with `def name(args):` and `return`. Handle errors with `try:` and `except FileNotFoundError:` rather than letting a script crash. Useful standard library modules include `os` and `pathlib` (files and paths), `subprocess` (run commands, preferably with an argument list rather than `shell=True` to avoid injection), `sys` (arguments in `sys.argv`, exit codes with `sys.exit(1)`), `json`, `re` (regular expressions), `logging` and `argparse` (command-line options).",
   "A virtual environment isolates a project's packages from the system Python and from other projects. `python3 -m venv .venv` creates one, `source .venv/bin/activate` activates it (your prompt changes), and `deactivate` leaves it. While active, `pip install requests` installs into the venv only. `pip freeze > requirements.txt` records exact versions and `pip install -r requirements.txt` recreates them elsewhere. Installing packages into the system Python with sudo pip can break distribution tools that depend on it, which is why many distributions now refuse it and point you to a venv or the distribution's own packages. Run a script with `python3 script.py`, or add a shebang `#!/usr/bin/env python3`, make it executable and run `./script.py`. For a venv-specific script, point the shebang or command at `.venv/bin/python`. The guard `if __name__ == '__main__':` runs main code only when the file is executed directly, not when imported, and `python3 -m module` runs a module as a script.",
   "Consider a worked example. You must find accounts present on the old file server but missing on the new one. You save `getent passwd` output from each server, then write a script that reads each file, splits each line on `:`, and builds two sets of usernames. `print(sorted(old - new))` lists the missing accounts in order. You build a dict mapping each missing user to their shell for the migration report, and use `json.dump` to write it for the ticket. The script lives in a venv with its one dependency recorded in `requirements.txt`, so a colleague can recreate the same environment.",
   "Common mistakes: mixing tabs and spaces; using a list when you need uniqueness, then deduplicating by hand; indexing a dict with a missing key instead of using `.get()`; installing packages globally with sudo pip; forgetting to activate the venv, so the script cannot find a module (`ModuleNotFoundError`); building shell commands as strings with `shell=True` from untrusted input; and comparing a string read from a file with an int without converting it.",
   "Exam questions map needs to types and tools. 'Remove duplicates' or 'which items are in A but not B' is a set. 'Look up a value by name' is a dict. 'Ordered collection that must not change' is a tuple. 'Isolate project dependencies' is `python3 -m venv`, and 'reproduce installed versions' is `pip freeze` with `requirements.txt`. 'Run a system command safely' is `subprocess.run` with a list. 'Code runs only when executed directly' is the `__name__ == '__main__'` guard."
  ],
  "terms": [
   [
    "list vs tuple",
    "Both are ordered sequences; lists can be changed, tuples cannot."
   ],
   [
    "set",
    "An unordered collection of unique items supporting union, intersection and difference."
   ],
   [
    "dict",
    "A mapping of keys to values, read with d[key] or d.get(key, default)."
   ],
   [
    "venv",
    "A Python virtual environment that isolates a project's installed packages from the system Python."
   ],
   [
    "pip",
    "The Python package installer, used inside a venv to install libraries."
   ],
   [
    "requirements.txt",
    "A file listing exact package versions so an environment can be recreated with pip install -r."
   ]
  ],
  "example": "You must find accounts present on the old file server but missing on the new one. A short Python script reads usernames from each server's getent passwd output into two sets and prints sorted(old - new). Running it from a venv with its dependencies pinned in requirements.txt lets a colleague rerun the same check next month without touching the system Python.",
  "tip": "Pick the data type by need: a set for uniqueness and comparisons, a dict for key-value lookups, a list when order and duplicates matter, and a tuple for fixed records. Use a venv, not sudo pip.",
  "check": [
   [
    "Which Python type automatically removes duplicate IP addresses from a list?",
    "A set, for example set(ip_list)."
   ],
   [
    "How do you create and activate a virtual environment named .venv?",
    "python3 -m venv .venv then source .venv/bin/activate."
   ],
   [
    "Why use subprocess.run(['ls', path]) instead of subprocess.run('ls ' + path, shell=True)?",
    "Passing an argument list avoids the shell, so special characters in path cannot inject extra commands."
   ],
   [
    "ports['ftp'] raises an error but ports.get('ftp', 0) does not. Why?",
    "Indexing a missing key raises KeyError, while get returns the supplied default when the key is absent."
   ]
  ]
 },
 {
  "t": "Git: clone, branch/switch, add, commit, merge, rebase, revert, pull requests",
  "body": [
   "Git is a distributed version control system: every copy of a repository contains the full history, and you record changes as commits. Admins use Git for scripts, configuration management code, infrastructure definitions and documentation, and it underpins GitOps and CI/CD (continuous integration and continuous delivery). Linux+ expects everyday Git fluency: getting a repository, recording changes, working on branches, combining work and undoing mistakes safely.",
   "Git has three areas: the working tree (your files), the staging area or index (changes prepared for the next commit) and the repository history. `git clone <url>` copies a remote repository, including history, and sets up a remote named `origin`. `git init` starts a new repository in the current directory. `git status` shows what changed and what is staged, and `git diff` shows unstaged changes (`git diff --staged` for staged ones). Set your identity once with `git config --global user.name 'Your Name'` and `git config --global user.email`.",
   "`git add file` stages changes, `git add -p` lets you stage parts of files, and `git commit -m 'message'` records the staged snapshot. Write messages that explain why the change was made. `git log --oneline --graph` shows history. `git push` sends commits to the remote and `git pull` fetches and integrates remote changes; `git fetch` only downloads without changing your branch. A `.gitignore` file lists files Git should not track, such as build output or local secrets. Branches are lightweight pointers that let you work in isolation: `git branch` lists them, `git branch feature-x` creates one, and `git switch feature-x` moves to it (`git switch -c feature-x` does both). The older `git checkout` does the same and more, so `git checkout -b feature-x` is equivalent. Keep the main branch stable and work in short-lived feature branches.",
   "There are two ways to combine branches. `git merge feature-x`, run from main, joins the histories; if main has not moved, it is a fast-forward, otherwise Git creates a merge commit with two parents. `git rebase main`, run from the feature branch, replays your commits on top of the latest main, producing a linear history but new commit IDs. Because rebasing rewrites history, never rebase commits others have already pulled. Either can produce conflicts when both sides changed the same lines; Git marks them with `<<<<<<<`, `=======` and `>>>>>>>` in the file, you edit to the correct result, `git add` it, and continue with `git commit` or `git rebase --continue`. `git merge --abort` or `git rebase --abort` returns to where you started.",
   "Undoing changes also comes in two styles. `git revert <commit>` creates a new commit that reverses an earlier one, safe for shared branches because history is preserved. `git reset` moves the branch pointer backward (`--soft` keeps changes staged, `--mixed` keeps them unstaged, `--hard` discards them), which rewrites history and belongs to local, unpushed work. `git restore file` discards uncommitted edits to a file, `git restore --staged file` unstages it, and `git stash` temporarily shelves work in progress. A pull request (called a merge request on some platforms) is not a Git command but a hosting-platform workflow: you push a branch and ask for it to be merged. Teammates review the diff, automated checks run, and once approved the branch is merged. Branch protection rules can require reviews and passing checks, bringing change control to infrastructure code.",
   "Consider a worked example. You clone the team's Ansible repository, run `git switch -c fix-ntp`, edit the chrony template and run `git add -p` to stage only the relevant lines. `git commit -m 'Use internal NTP pool for chrony'` records it, and `git push -u origin fix-ntp` publishes the branch. You open a pull request; the pipeline lints the playbook and a colleague approves, so the branch is merged. The next day a different commit on main turns out to break DNS settings on every server. Rather than rewriting shared history with reset, you run `git revert <commit-id>` and push, and the pipeline reapplies the corrected configuration. Both the mistake and its reversal remain visible in `git log` for the review.",
   "Common mistakes: committing secrets, which stay in history even after a later commit deletes them; forgetting to stage a file, so it is missing from the commit; running `git reset --hard` or rebasing on a shared branch and forcing the push, which breaks everyone else's copy; confusing `fetch` (download only) with `pull` (download and integrate); leaving conflict markers in a file; and working directly on main instead of a branch.",
   "Exam wording is usually direct. 'Copy a remote repository' is `git clone`. 'Prepare changes for the next commit' is `git add` and the staging area. 'Create and move to a branch' is `git switch -c` or `git checkout -b`. 'Linear history' points to rebase, and 'preserve both histories with a merge commit' to merge. 'Undo a pushed commit safely' is `git revert`, while 'discard local commits' is `git reset`. 'Download without changing the working branch' is `git fetch`. 'Peer review before merging' is a pull request."
  ],
  "terms": [
   [
    "Commit",
    "A recorded snapshot of staged changes with an author, message and unique ID."
   ],
   [
    "Staging area",
    "The index where changes are prepared with git add before being committed."
   ],
   [
    "Branch",
    "A movable pointer to a line of commits, used to work on changes in isolation."
   ],
   [
    "merge vs rebase",
    "merge joins histories, possibly with a merge commit; rebase replays commits onto a new base for a linear history with new IDs."
   ],
   [
    "git revert",
    "Creates a new commit that undoes an earlier one without rewriting history."
   ],
   [
    "git reset",
    "Moves the branch pointer to an earlier commit, rewriting local history; --hard also discards changes."
   ],
   [
    "Pull request",
    "A hosting-platform request to review and merge a pushed branch, often gated by checks and approvals."
   ]
  ],
  "example": "A colleague's commit to the shared Ansible repository broke DNS settings on all servers. Rather than rewriting shared history with reset, you run git revert <commit-id>, push the fix, and the pipeline reapplies the corrected configuration. The mistake and its reversal both stay visible in git log for the post-incident review.",
  "tip": "For shared branches, choose revert over reset and merge over rebase; history-rewriting commands belong only on local, unpublished work.",
  "check": [
   [
    "Which command creates and switches to a new branch named fix-dns?",
    "git switch -c fix-dns (or git checkout -b fix-dns)."
   ],
   [
    "What is the difference between git fetch and git pull?",
    "fetch downloads remote changes without altering your branch; pull fetches and then merges or rebases them into your current branch."
   ],
   [
    "How do you record only the staged changes with a message?",
    "git commit -m 'message'."
   ],
   [
    "Why is git revert preferred to git reset for a commit already pushed to main?",
    "revert adds a new commit and keeps shared history intact, while reset rewrites history that others have already pulled."
   ]
  ]
 },
 {
  "t": "Ansible: inventory, ad hoc commands, playbooks, idempotence, roles, ansible-vault",
  "body": [
   "Ansible is an agentless configuration management and automation tool. A control node connects to managed hosts over SSH (or WinRM for Windows), pushes small programs called modules, runs them and removes them. Nothing needs to be installed on managed Linux hosts except SSH and Python, which makes Ansible easy to adopt. Linux+ uses it as the main example of automated configuration, so learn its vocabulary: inventory, module, task, play, playbook, handler, role and vault.",
   "The inventory lists the hosts Ansible manages and groups them. It can be INI or YAML, for example `/etc/ansible/hosts` or a project `inventory` file. Groups let you target many hosts at once, and the special group `all` includes every host. Host patterns select targets precisely: `web:db` means either group, `web:&prod` means hosts in both, and `all:!db` means everything except db. Variables can be set per host, per group, or in `group_vars/` and `host_vars/` directories. Dynamic inventories query clouds or CMDBs (configuration management databases) for current hosts. `ansible-inventory --graph` shows the structure, and `ansible.cfg` sets defaults such as the inventory path and remote user.",
   "```ini\n[web]\nweb01.example.com\nweb02.example.com\n\n[db]\ndb01.example.com ansible_user=admin\n```",
   "Ad hoc commands run a single module for quick tasks: `ansible all -m ping` tests connectivity (an Ansible module check over SSH, not ICMP), `ansible web -m ansible.builtin.dnf -a 'name=nginx state=present' -b` installs a package with privilege escalation (`-b` means become, usually sudo), and `ansible db -a 'uptime'` uses the command module by default. `ansible-doc dnf` shows any module's options and examples. Playbooks are YAML files describing desired state as plays and tasks. Each play targets hosts, and each task calls a module with parameters. Handlers are tasks that run only when notified by a change, such as reloading a service after its configuration file changes. Run a playbook with `ansible-playbook site.yml`; `--check` does a dry run, `--diff` shows file changes, `--syntax-check` validates, and `--limit web01` restricts targets. Output reports each task as ok (already correct), changed or failed, with a recap per host.",
   "Idempotence is the key idea: running the same playbook again should change nothing if the system is already in the desired state. Modules like `dnf`, `apt`, `copy`, `template`, `user`, `service` and `lineinfile` check the current state first and act only if needed. The `command` and `shell` modules are not idempotent by themselves, so prefer purpose-built modules or add guards such as `creates:`. Roles package reusable automation into a standard directory structure: `tasks/`, `handlers/`, `templates/` (Jinja2 templates), `files/`, `vars/`, `defaults/` and `meta/`. `ansible-galaxy init myrole` creates the skeleton, and collections bundle roles and modules for reuse. A playbook applies roles with a `roles:` list. Secrets such as passwords and API keys should never sit in plain text in a repository. `ansible-vault create`, `edit`, `encrypt`, `decrypt` and `view` manage AES-encrypted files, `--ask-vault-pass` or `--vault-password-file` supplies the key at run time, and `ansible-vault encrypt_string` encrypts a single value.",
   "Consider a worked example. To roll out a hardened sshd_config to 60 servers, you create a role with `ansible-galaxy init sshd_hardening`. Its task uses the `template` module to render `sshd_config.j2` with `validate: sshd -t -f %s`, so a bad file is never installed, and notifies a handler named `reload sshd`. You run `ansible-playbook site.yml --check --diff --limit web01` first, review the diff, then run it for all hosts. The first run reports changed on every host and the handler fires; a second run reports only ok, proving idempotence. The shared admin password used by another task lives in a vault-encrypted `group_vars/all/vault.yml`.",
   "Common mistakes: using `shell` for everything, which makes playbooks non-idempotent; YAML indentation errors, caught by `--syntax-check` or `ansible-lint`; restarting services in every run instead of using handlers; forgetting `-b` when a task needs root; committing unencrypted secrets or the vault password file; and expecting `ansible -m ping` to test ICMP when a firewall blocks ping but SSH works; and targeting `all` when you meant one group, which `--limit` or a careful host pattern prevents.",
   "Exam questions use clear signals. 'Agentless, uses SSH' is Ansible. 'List of managed hosts and groups' is the inventory. 'One-off task across many servers' is an ad hoc command. 'Running twice makes no further changes' is idempotence. 'Run only when a configuration file changes' is a handler. 'Reusable structure of tasks, templates and defaults' is a role. 'Encrypt a password used by a playbook' is `ansible-vault`. 'Preview changes without applying' is `--check`."
  ],
  "terms": [
   [
    "Inventory",
    "The list of managed hosts and groups, in INI or YAML, optionally with host and group variables."
   ],
   [
    "Module",
    "A small unit of work, such as dnf or copy, that Ansible pushes to a host and runs."
   ],
   [
    "Ad hoc command",
    "A single module run from the command line against a host pattern, such as ansible all -m ping."
   ],
   [
    "Playbook",
    "A YAML file of plays and tasks describing the desired state of target hosts."
   ],
   [
    "Handler",
    "A task that runs only when notified by a change, typically to restart or reload a service."
   ],
   [
    "Idempotence",
    "The property that repeating an operation leaves an already-correct system unchanged."
   ],
   [
    "ansible-vault",
    "The tool that encrypts files or strings containing secrets for use in playbooks."
   ]
  ],
  "example": "To roll out a hardened sshd_config to 60 servers, you write a role with a template task that notifies a 'reload sshd' handler. The first ansible-playbook run reports changed on every host; a second run reports only ok, proving idempotence. The shared admin password used by one task is stored in a vault-encrypted group_vars file and supplied with --ask-vault-pass.",
  "tip": "Ansible is agentless and push-based over SSH; when a question contrasts it with Puppet or Chef, that difference is usually the point. command and shell are not idempotent unless guarded.",
  "check": [
   [
    "What does ansible web -m ping actually test?",
    "That Ansible can connect to hosts in the web group over SSH and run a module with Python; it is not an ICMP ping."
   ],
   [
    "Why are the command and shell modules considered non-idempotent?",
    "They run every time regardless of current state, unless guarded with options such as creates or removes."
   ],
   [
    "How should a database password used in a playbook be stored?",
    "Encrypted with ansible-vault, and decrypted at run time with a vault password."
   ],
   [
    "How do you preview what a playbook would change without changing anything?",
    "Run ansible-playbook with --check, adding --diff to see file content changes."
   ]
  ]
 },
 {
  "t": "Puppet and other agent-based tools; OpenTofu/Terraform plan and apply",
  "body": [
   "Configuration management and infrastructure provisioning are related but different jobs. Configuration management tools keep the software and settings inside existing servers correct. IaC (infrastructure as code) provisioning tools create the servers, networks and cloud resources themselves. Linux+ expects you to know examples of each, how they operate, and which model a scenario describes, so focus on agent versus agentless, push versus pull, and preview versus apply.",
   "Puppet is a classic agent-based configuration management tool. A Puppet agent runs on each managed node and periodically, by default every 30 minutes, contacts a Puppet server (historically called the master). The agent sends facts about the node, gathered by a tool called Facter, and receives a compiled catalog describing its desired state. It then enforces that state and reports back. This pull model means nodes correct drift automatically on each run, even if nobody launches a job. Puppet code is written in a declarative DSL (domain-specific language) in manifests (`.pp` files) grouped into modules, with resources such as `package`, `file`, `service` and `user`. Agents and server authenticate each other with certificates. `puppet agent -t` triggers a run immediately and shows what changed, and `--noop` shows what would change without enforcing it.",
   "Chef is another agent-based tool, using Ruby-based recipes and cookbooks, and SaltStack (Salt) uses minions that connect to a master, though it can also run agentless over SSH. Compared with Ansible, agent-based tools need software installed and maintained on every node and a central server, but they scale well and enforce state continuously. Ansible is agentless and push-based: nothing runs until you execute a playbook.",
   "Terraform, from HashiCorp, and OpenTofu, an open-source fork maintained under the Linux Foundation, are declarative IaC provisioning tools that share the same language and workflow. You describe resources such as virtual machines, networks, DNS records and load balancers in HCL (HashiCorp Configuration Language) files ending in `.tf`. Providers are plug-ins that talk to specific platforms, such as a cloud provider or a hypervisor, and variables and outputs make configurations reusable. The workflow uses a few commands (`tofu` for OpenTofu, `terraform` for Terraform). `init` downloads providers and prepares the directory. `fmt` and `validate` tidy and check the code. `plan` compares the configuration with the recorded state and real infrastructure and shows what will be created (+), changed (~) or destroyed (-), without changing anything. `apply` performs the changes, prompting for confirmation unless auto-approved, and `destroy` removes everything the configuration manages.",
   "Both tools keep a state file that maps configuration to real resource IDs. State can contain sensitive values, so teams store it in a secured remote backend with locking to prevent two people applying at once, rather than committing it to Git. Changes made outside the tool create drift, which the next plan will reveal and try to reverse. In practice the tools combine: OpenTofu or Terraform provisions the VMs and network, then Ansible or Puppet configures the operating system and applications inside them, all stored in Git and run through a pipeline.",
   "Consider a worked example. Before a change to the load balancer configuration, a pipeline runs `tofu plan -out=tfplan`, which shows one resource to change and, unexpectedly, one to destroy. A reviewer notices that a renamed resource block would delete and recreate the production DNS record. She fixes the code with a `moved` block so the existing resource is kept under its new name, the new plan shows only the intended change, and `tofu apply tfplan` applies exactly what was reviewed. Meanwhile, Puppet agents on the new web servers pull their catalogs every half hour, and when someone edits `/etc/motd` by hand, the next run quietly restores it.",
   "Common mistakes: running apply without reading the plan, especially destroy lines; committing state files that contain secrets; editing cloud resources by hand and being surprised when the next apply reverts them; confusing Puppet's server-compiled catalog with Ansible's pushed modules; assuming an agent-based tool needs someone to launch each run; and thinking provisioning tools replace configuration management, when they usually work together.",
   "Exam wording separates the models. 'Agent checks in periodically and corrects drift' is Puppet or another agent-based pull tool. 'Facts' and 'catalog' are Puppet terms. 'Agentless over SSH' is Ansible. 'Provision cloud infrastructure declaratively' is OpenTofu or Terraform. 'Preview changes' is `plan`, 'make the changes' is `apply`, and 'download providers' is `init`. 'Maps code to real resources and needs locking' is the state file."
  ],
  "terms": [
   [
    "Agent-based configuration management",
    "A model where software on each node pulls and enforces its configuration from a central server."
   ],
   [
    "Puppet catalog",
    "The compiled description of a node's desired state that the Puppet server sends to the agent."
   ],
   [
    "Facter",
    "The Puppet tool that gathers facts about a node, such as OS and IP addresses."
   ],
   [
    "Infrastructure as code",
    "Defining servers, networks and other resources in version-controlled declarative files."
   ],
   [
    "plan",
    "The OpenTofu/Terraform command that previews creations, changes and destructions without applying them."
   ],
   [
    "State file",
    "The record mapping configuration to real resource IDs, kept in a secured, locked backend."
   ],
   [
    "Drift",
    "Differences between the declared configuration and the real system, often caused by manual changes."
   ]
  ],
  "example": "Before a change to the load balancer configuration, a pipeline runs tofu plan, which shows one resource to change and, unexpectedly, one to destroy. A reviewer catches that a renamed resource would delete the production database's DNS record, fixes the code to move the resource in state instead, and only then approves tofu apply.",
  "tip": "Distinguish the models: Puppet is agent-based and pull; Ansible is agentless and push; OpenTofu/Terraform provision infrastructure, where plan previews and apply makes changes.",
  "check": [
   [
    "What does a Puppet agent send to the server at the start of a run?",
    "Facts about the node collected by Facter, which the server uses to compile the node's catalog."
   ],
   [
    "Which OpenTofu/Terraform command shows proposed changes without making them?",
    "plan."
   ],
   [
    "Why should the state file not be committed to a public Git repository?",
    "It may contain sensitive data such as passwords or keys and needs locking for safe team use; it belongs in a secured remote backend."
   ],
   [
    "What happens on the next Puppet run after someone edits a managed file by hand?",
    "The agent detects the drift from the catalog and restores the declared content automatically."
   ]
  ]
 },
 {
  "t": "CI/CD pipelines and GitOps concepts",
  "body": [
   "Once scripts, configuration and infrastructure live in Git, you can automate how changes are tested and delivered. CI/CD (continuous integration and continuous delivery or deployment) pipelines do this, and GitOps extends the idea so that Git becomes the single source of truth for what should be running. Linux+ covers the concepts and vocabulary rather than any one product, so learn what each stage is for and how the pieces fit together.",
   "Continuous integration means people merge small changes into a shared branch frequently, and every change triggers an automated build and test run. For admin code that might include linting shell scripts with ShellCheck, running `ansible-lint` or `yamllint`, `tofu validate` and `plan`, building container images, running unit tests, and scanning for vulnerabilities or accidentally committed secrets. Problems are caught within minutes of being introduced, when they are cheapest to fix, and a failing check blocks the merge.",
   "Continuous delivery means every change that passes the pipeline is packaged and ready to release, with a human approval gate before production. Continuous deployment goes one step further and releases automatically when all checks pass. Deployments usually progress through environments such as development, staging and production, and use strategies that limit risk: rolling updates replace instances gradually, blue-green deployments switch traffic between two identical environments, and canary releases send a small share of traffic to the new version first. Every pipeline should also make rollback easy.",
   "A pipeline is defined as code, usually a YAML file in the repository, such as a GitLab CI file, a GitHub Actions workflow or a Jenkinsfile. It is made of stages (build, test, deploy) containing jobs that run on runners or agents, often inside containers. Jobs are triggered by events such as a push, a pull request or a schedule, and they produce artifacts, such as a package or container image, passed to later stages. Secrets like deployment keys are stored in the CI system's protected variables or a secrets manager, never in the repository, and runners should have only the permissions they need.",
   "GitOps applies these ideas to operations. The desired state, for example Kubernetes manifests or infrastructure definitions, is declared in a Git repository. Changes are made only by pull requests, which gives review, approval and a complete audit trail. An automated agent, such as Argo CD or Flux in Kubernetes, continuously compares the live system with the repository and reconciles any difference. In this pull-based model, the cluster fetches its configuration rather than a pipeline pushing credentials into it. The benefits are consistency, traceability and fast recovery: rolling back is as simple as reverting a commit, and drift from manual changes is detected and undone. The discipline is that nobody edits production by hand; if it is not in Git, it does not exist.",
   "Consider a worked example. A team manages its Kubernetes applications with GitOps. An engineer opens a pull request raising a deployment's replica count from three to five. The CI pipeline validates the YAML, runs policy checks and posts the results on the pull request; a colleague approves and it is merged. Argo CD notices the new commit and scales the deployment. Later, someone edits the replica count by hand in the cluster during a busy afternoon; Argo CD flags the application as out of sync and restores the Git version. When a later release misbehaves, the team reverts its commit, and the cluster returns to the previous state within minutes.",
   "Common mistakes: confusing continuous delivery (manual gate) with continuous deployment (automatic); storing credentials in pipeline YAML; giving runners broad administrative rights; making emergency fixes directly on servers in a GitOps setup, which the reconciler will undo; skipping tests to make a pipeline faster; and treating CI as a build server only, rather than a quality gate that runs on every change.",
   "Exam wording maps cleanly. 'Automatically test every commit' is continuous integration. 'Ready to release, but a person approves production' is continuous delivery, and 'released automatically after tests pass' is continuous deployment. 'Git is the source of truth and an agent reconciles the cluster' is GitOps. 'Roll back' in GitOps means reverting the commit. 'Small percentage of users get the new version first' is canary, and 'switch between two identical environments' is blue-green."
  ],
  "terms": [
   [
    "Continuous integration",
    "Merging small changes frequently, with each change automatically built and tested."
   ],
   [
    "Continuous delivery vs deployment",
    "Delivery keeps every passing change releasable behind a manual approval; deployment releases automatically."
   ],
   [
    "Pipeline",
    "A version-controlled definition of stages and jobs that build, test and deploy changes."
   ],
   [
    "Artifact",
    "An output of a pipeline job, such as a package or container image, passed to later stages."
   ],
   [
    "GitOps",
    "Operating systems by declaring desired state in Git and having an agent reconcile the live environment to it."
   ],
   [
    "Canary release",
    "Sending a small share of traffic to a new version before rolling it out fully."
   ],
   [
    "Drift",
    "A difference between the live system and the declared state, usually from manual changes."
   ]
  ],
  "example": "A team manages its Kubernetes applications with GitOps. An engineer opens a pull request raising a deployment's replica count; the CI pipeline validates the YAML and runs policy checks, a colleague approves, and after the merge Argo CD notices the new commit and scales the deployment. When someone later edits the replica count by hand in the cluster, Argo CD flags the drift and restores the Git version.",
  "tip": "In GitOps the rollback answer is almost always 'revert the commit in Git', not 'fix it directly on the server or cluster'. Delivery has a human gate; deployment does not.",
  "check": [
   [
    "What is the difference between continuous delivery and continuous deployment?",
    "Continuous delivery requires a manual approval before production releases; continuous deployment releases automatically once checks pass."
   ],
   [
    "In GitOps, what is the source of truth for the desired state?",
    "The Git repository; changes are made through pull requests and reconciled by an automated agent."
   ],
   [
    "Where should a pipeline's deployment credentials be kept?",
    "In the CI system's protected secret variables or a secrets manager, never committed to the repository."
   ],
   [
    "Which deployment strategy sends a small portion of traffic to a new version first?",
    "A canary release, which limits impact if the new version misbehaves."
   ]
  ]
 },
 {
  "t": "Responsible use of AI tools for scripting: review, testing, keeping secrets out of prompts",
  "body": [
   "AI assistants can draft a Bash script, explain an unfamiliar awk one-liner or suggest an Ansible task in seconds. Used well, they save time and help you learn. Used carelessly, they can introduce subtle bugs, security holes or data leaks into systems you are responsible for. The current Linux+ objectives recognize this, so expect questions about using these tools responsibly: reviewing output, testing it safely and protecting sensitive data.",
   "Start from the right mindset: you remain accountable for every command you run, whoever or whatever wrote it. AI-generated code can look confident and still be wrong, a problem often called hallucination. Common issues include options that do not exist or behave differently on your distribution, outdated syntax, missing error handling, unquoted variables, commands that assume a different package manager, and references to packages or modules that do not exist at all. A plausible but invented package name is a particular risk, because an attacker could publish a malicious package under that name.",
   "Review generated code line by line before running it. Make sure you understand what each command does, check unfamiliar options in the man page or with `--help`, and look closely at anything destructive or privileged: `rm -rf`, `dd`, `mkfs`, `chmod -R 777`, disabling SELinux or the firewall, piping a download straight into a shell, or broad sudo rules. Ask whether the approach follows your organization's standards. If the explanation and the code disagree, trust neither until you have checked.",
   "Test before production. Run scripts through `bash -n` and ShellCheck, Ansible through `ansible-lint` and `--check --diff`, and OpenTofu or Terraform through `validate` and `plan`. Execute in a disposable VM, container or lab environment first, with sample data, and test failure cases as well as the happy path. Commit the code to Git and send it through the same pull request review and CI pipeline as human-written code, so another person and automated checks see it too. Note in the commit or review that an AI tool assisted if your organization's policy asks for that.",
   "Keep secrets and sensitive data out of prompts. Anything you paste into an external AI service may be stored, logged or reviewed outside your control, depending on the provider and its terms. Never include passwords, private keys, API tokens, session cookies, `/etc/shadow` contents, customer data or personal information. Be careful with less obvious details too: internal hostnames and IP addresses, full configuration files, and logs that contain usernames or tokens. Replace them with placeholders such as `<API_TOKEN>` or `example.internal`, a step called sanitization, and strip real values from error messages. Use your organization's approved AI tool if one exists, and follow its AUP (acceptable use policy). Protect generated code like any other: read secrets at run time from environment variables, vault-encrypted files or a secrets manager rather than hard-coding them, and grant scripts only the privileges they need.",
   "Consider a worked example. An admin asks an AI assistant for a script to purge home directories of users who left more than 90 days ago. Before asking, she replaces real usernames, hostnames and the directory server address with placeholders. The draft loops over a list and runs `rm -rf /home/$user` with an unquoted variable and no check that the variable is set, so an empty value would target `/home/` itself. She adds `set -euo pipefail`, quoting, validation that each name matches the username pattern, and a `--dry-run` mode that only prints what would be removed. ShellCheck is clean, a test on a lab VM with dummy accounts behaves correctly, and she submits it through a pull request where a colleague reviews it.",
   "Common mistakes: pasting a full config file with credentials to ask why it fails; running output directly as root because it looks right; installing a suggested package without confirming it exists in trusted repositories; skipping tests because the assistant explained the code confidently; hard-coding a token the assistant placed in an example; and assuming the tool knows your distribution, versions or internal standards.",
   "Exam questions on this topic reward caution. 'Best practice before running AI-generated code' is review, lint and test in a non-production environment, then normal code review. 'What should not be included in a prompt' is credentials, keys, personal data and sensitive internal details. 'Suggested package cannot be found in official repositories' points to verifying rather than installing from an unknown source. 'Who is responsible for the result' is the administrator who runs it."
  ],
  "terms": [
   [
    "Human in the loop",
    "A person reviews and approves AI output before it is used or run."
   ],
   [
    "Hallucination",
    "Confident but incorrect AI output, such as a nonexistent option or package."
   ],
   [
    "Prompt data leakage",
    "Sensitive information exposed by pasting it into an external AI service."
   ],
   [
    "Sanitization",
    "Replacing secrets and identifying details with placeholders before sharing text."
   ],
   [
    "Acceptable use policy",
    "An organization's rules for how tools such as AI assistants may be used and with what data."
   ],
   [
    "Dry run",
    "A mode that shows what a script or tool would do without making changes."
   ]
  ],
  "example": "An admin asks an AI assistant for a script to purge old user home directories. Before asking, she replaces real usernames and hostnames with placeholders. The draft uses rm -rf with an unquoted variable and no check that the variable is set. She adds set -euo pipefail, quoting and a dry-run mode, runs ShellCheck and tests on a lab VM, then submits it through a pull request for review.",
  "tip": "When a question asks for the best practice with AI-generated scripts, pick the answer that combines review, testing in a non-production environment and keeping credentials out of prompts, not the one that runs the output directly.",
  "check": [
   [
    "Name three kinds of data you should never paste into an external AI prompt.",
    "Any of: passwords, private keys, API tokens, /etc/shadow contents, customer or personal data, or sensitive internal hostnames and IPs."
   ],
   [
    "What should you do before running an AI-generated script on production servers?",
    "Review it line by line, lint it (for example with ShellCheck), test it in a lab or staging environment and send it through normal code review."
   ],
   [
    "Why can a suggested but nonexistent package name be dangerous?",
    "An attacker could register a malicious package under that name, so installing it without verification could compromise the system."
   ],
   [
    "Who is accountable for a command generated by an AI assistant and run on a server?",
    "The administrator who runs it; the tool's output must be verified like any untrusted code."
   ]
  ]
 },
 {
  "t": "Storage issues: full disks, inode exhaustion (df -i), deleted-but-open files (lsof +L1), fsck/xfs_repair",
  "body": [
   "Storage problems are among the most common Linux incidents: services fail to start, logs stop being written, databases crash and users cannot save work. The symptoms often look alike, usually the error 'No space left on device', so you need a systematic way to find the real cause. Four situations cover most cases: a filesystem that is genuinely full, one that has run out of inodes, space held by deleted files that are still open, and a corrupted filesystem that needs repair.",
   "Start with `df -h` to see which filesystem is full. Then drill down with `du`: `du -xh --max-depth=1 /var | sort -h` lists the largest directories on that filesystem only (`-x` stays on one filesystem). `find /var -xdev -type f -size +500M` finds large files. Common culprits are runaway logs, core dumps, old kernels in `/boot`, package caches (`dnf clean all`, `apt clean`), container images and volumes, and forgotten backups. `journalctl --disk-usage` and `journalctl --vacuum-size=500M` manage the journal. Remember that ext4 reserves a percentage of blocks for root by default (adjustable with `tune2fs -m`), so a filesystem can be full for users while root can still write.",
   "Inode exhaustion is the classic trick question. Each file uses one inode, the structure that stores its metadata, and on ext4 the number of inodes is fixed when the filesystem is created. If millions of tiny files, such as session files or mail queue entries, use up every inode, you get 'No space left on device' even though `df -h` shows plenty of free space. `df -i` shows inode usage; at 100 percent `IUse%` you have found the cause. Find the directories with the most files, for example with `du --inodes -x /var | sort -n | tail` or a `find ... | uniq -c` count, then delete or archive the unneeded files and fix whatever creates them. XFS allocates inodes dynamically, so it is less prone to this.",
   "Deleted-but-open files explain why `df` and `du` disagree. When you delete a file that a process still has open, the name disappears, so `du` no longer counts it, but the kernel keeps the data blocks until the last process closes the file, so `df` still shows the space used. This often happens when someone deletes a huge log instead of rotating it. `lsof +L1` lists open files whose link count is below one, meaning deleted; `lsof | grep deleted` works too. The fix is to restart or reload the process holding it, or have it reopen its logs. In an emergency, truncating the file through `/proc/<PID>/fd/<N>` frees space, but restarting the service is the clean solution. Use `logrotate` or truncate with `> file` or `truncate -s 0 file` instead of `rm` for active logs.",
   "Filesystem corruption, after a crash, power loss or failing disk, is repaired with check tools that must run on unmounted filesystems (or the root filesystem at boot or from rescue media) to avoid causing more damage. For ext2/3/4, `fsck /dev/sdb1` calls `e2fsck`; `-y` answers yes to fixes, `-n` checks without changing anything, and `-f` forces a check. The sixth fstab field controls boot-time checks. For XFS, `fsck.xfs` does nothing useful; use `xfs_repair /dev/sdb1` on the unmounted device, with `-n` for a read-only check. If it complains about a dirty log, mounting and cleanly unmounting replays the log; `xfs_repair -L` zeroes the log but can lose recent changes, so it is a last resort. Btrfs uses `btrfs scrub` and `btrfs check`. Check disk health too (SMART data, kernel messages), because corruption may be a symptom of failing hardware.",
   "Consider a worked example. A mail server reports 'No space left on device', but `df -h` shows `/var` only 40 percent used. `df -i` shows `/var` at 100 percent inode use, and `du --inodes -x /var | sort -n | tail` points to a spool directory holding millions of tiny stale files left by a stuck job. You fix the job and remove the stale entries, and inode use drops to 12 percent. A week later a different server shows `/` at 100 percent while `du -xsh /` adds up to far less; `lsof +L1` reveals a 20 GB application log that someone deleted while the application kept writing to it. Restarting the service releases the space immediately, and you add a logrotate rule.",
   "Common mistakes: trusting `df -h` alone and missing inode exhaustion; deleting an active log with `rm` and expecting space back; running `fsck` on a mounted filesystem; running `fsck` against XFS, or reaching for `xfs_repair -L` before trying to mount and replay the log; forgetting the `-x` option so `du` wanders into other mounts; and clearing space without finding and fixing whatever filled it.",
   "Exam questions pair symptoms with tools. 'No space left, but df shows free space' means inodes and `df -i`. 'df says full but du cannot find the data' or 'deleted a file but space not freed' means `lsof +L1` and restarting the process. 'Repair ext4' is `fsck` or `e2fsck` on an unmounted device, and 'repair XFS' is `xfs_repair`. 'Find the biggest directories' is `du` piped to `sort -h`."
  ],
  "terms": [
   [
    "Inode",
    "The on-disk structure holding a file's metadata; each file needs one."
   ],
   [
    "Inode exhaustion",
    "Running out of inodes so no new files can be created even though free blocks remain."
   ],
   [
    "Deleted-but-open file",
    "A deleted file whose data stays allocated because a process still holds it open."
   ],
   [
    "lsof +L1",
    "Lists open files with a link count below one, meaning they have been deleted."
   ],
   [
    "fsck / e2fsck",
    "Checks and repairs ext2/3/4 filesystems; run on unmounted devices."
   ],
   [
    "xfs_repair",
    "Checks and repairs XFS filesystems on an unmounted device; -L zeroes the log as a last resort."
   ],
   [
    "Reserved blocks",
    "The share of an ext4 filesystem kept for root, adjustable with tune2fs -m."
   ]
  ],
  "example": "A mail server reports 'No space left on device' but df -h shows 40 percent used. df -i shows /var at 100 percent inode use, and counting files reveals millions of stale entries in a spool directory from a stuck job. After fixing the job and clearing the old entries, inode use drops and mail flows again.",
  "tip": "If df -h shows free space but writes fail, think inodes (df -i). If df shows full but du cannot find the data, think deleted-but-open files (lsof +L1).",
  "check": [
   [
    "Which command confirms inode exhaustion?",
    "df -i, which shows inode usage (IUse%) for each filesystem."
   ],
   [
    "You deleted a 20 GB log but df still shows the space used. Why, and what fixes it?",
    "The logging process still holds the deleted file open; restart or signal that process so it closes the file, which frees the space."
   ],
   [
    "Which tool repairs a corrupted XFS filesystem, and in what state must it be?",
    "xfs_repair, run on the unmounted device."
   ],
   [
    "Why should you not run fsck on a mounted filesystem?",
    "The kernel is still changing the filesystem, so repairs can conflict with live writes and cause more corruption."
   ]
  ]
 },
 {
  "t": "Performance: load average, top/htop, vmstat, iostat, sar, free, OOM killer",
  "body": [
   "When users say a server is slow, you need to find which resource is the bottleneck: CPU, memory, disk I/O (input/output) or something else. The approach is to observe first, identify the constrained resource, then find the process responsible. Each tool below answers part of that question, and exam scenarios usually give you tool output and ask what it means.",
   "Load average appears in `uptime`, `top` and `/proc/loadavg` as three numbers: the averages over 1, 5 and 15 minutes. On Linux it counts processes that are running or waiting for a CPU, plus those in uninterruptible sleep (usually waiting on disk or network storage). Interpret it relative to the number of CPU cores, shown by `nproc`: a load of 4 on a 4-core machine means roughly fully busy, while 12 on the same machine means work is queuing. Comparing the three values tells you whether load is rising or falling. A high load with low CPU use usually points to I/O waits.",
   "`top` shows a live summary and per-process usage. In the CPU line, `us` is user time, `sy` system (kernel) time, `ni` time for niced processes, `id` idle, `wa` time waiting on I/O and `st` time stolen by the hypervisor on virtual machines. Sort by memory with `M` and CPU with `P`, and press `1` to show each CPU separately. `htop` presents the same data with colored per-core bars, easier scrolling and tree views. `free -h` shows memory. Linux uses spare RAM for page cache to speed up disk access, so low free memory is normal; the important column is available, an estimate of memory that can be given to applications without swapping. Heavy swap use means real memory pressure.",
   "`vmstat 2` prints a line every two seconds: `r` is the run queue (processes waiting for CPU), `b` processes blocked on I/O, `si` and `so` swap in and out, `bi` and `bo` blocks read and written, and CPU percentages including `wa`. Sustained non-zero si and so indicate memory pressure; high `wa` with many `b` suggests a storage bottleneck. `iostat -xz 2`, from the sysstat package, shows per-device statistics: operations and throughput, average wait time (`await`) and `%util`, how busy the device is. A disk near 100 percent utilization with rising await is saturated, and `iotop` shows which processes are doing the I/O. `sar`, also from sysstat, collects data periodically in the background so you can look at history: `sar -u` for CPU, `sar -r` for memory, `sar -b` or `sar -d` for I/O, `sar -n DEV` for network, and `sar -f` to read a specific day's file. That is invaluable when the problem happened overnight.",
   "When memory and swap are exhausted, the kernel's OOM (out-of-memory) killer chooses a process to kill to keep the system alive, based on a badness score that favors large memory users. You will see messages such as 'Out of memory: Killed process 1234 (java)' in `dmesg` or `journalctl -k`. Each process's score is in `/proc/<PID>/oom_score`, and `oom_score_adj` (from -1000 to 1000) biases the choice, so critical services can be protected (systemd units use `OOMScoreAdjust=`). The real fixes are adding memory, fixing leaks, limiting services with cgroup settings such as `MemoryMax=`, or tuning the application. For CPU-heavy jobs, `nice` and `renice` lower priority so interactive work stays responsive.",
   "Consider a worked example. A 4-core database server shows a load average of 9, but `top` reports only 20 percent user CPU and 60 percent `wa`. `vmstat 2` shows several processes in the `b` column and no swapping, so memory is not the problem. `iostat -xz 2` shows the data disk at 99 percent util with high await, and `iotop` points to a nightly backup reading the same disk during business hours after a schedule change. Rescheduling the backup and taking it from a snapshot brings load back under 3. Checking `sar -d` for the previous week confirms the pattern started on the day the schedule changed.",
   "Common mistakes: reading load average without knowing the core count; assuming high load always means high CPU; panicking at low free memory when available is healthy; ignoring `st` on virtual machines, where the host is overcommitted; killing the process the OOM killer chose without asking why memory ran out; and forgetting that sar only has history if the sysstat collection was enabled beforehand.",
   "Exam questions pair output with meaning. 'High load, low CPU, high wa' means I/O bottleneck, so reach for `iostat` or `iotop`. 'Non-zero si/so' means memory pressure. 'Low free, high available' is normal caching. 'What happened last night' is `sar`. 'Process killed, kernel log mentions out of memory' is the OOM killer, found with `dmesg` or `journalctl -k`. 'High st' means CPU stolen by the hypervisor."
  ],
  "terms": [
   [
    "Load average",
    "The 1, 5 and 15 minute averages of runnable plus uninterruptible processes, read relative to core count."
   ],
   [
    "I/O wait (wa)",
    "CPU time spent idle while waiting for disk or network I/O to complete."
   ],
   [
    "Available memory",
    "The estimate in free of memory that can be given to applications without swapping."
   ],
   [
    "vmstat",
    "Reports run queue, blocked processes, swap activity, I/O and CPU in periodic samples."
   ],
   [
    "iostat",
    "Reports per-device I/O rates, await and %util; part of sysstat."
   ],
   [
    "sar",
    "The sysstat tool that records and reports historical CPU, memory, I/O and network data."
   ],
   [
    "OOM killer",
    "The kernel mechanism that kills a process to free memory when RAM and swap are exhausted."
   ]
  ],
  "example": "A 4-core database server shows a load average of 9 but top reports only 20 percent user CPU and 60 percent wa. iostat -xz 2 shows the data disk at 99 percent util with high await, and iotop points to a nightly backup reading the same disk. Rescheduling the backup and moving it to a snapshot brings load back under 3.",
  "tip": "A high load average does not automatically mean high CPU; check wa and iostat, because processes stuck waiting on I/O also count toward load on Linux.",
  "check": [
   [
    "Load average is 8.0 on a 2-core server. What does that suggest?",
    "Demand far exceeds capacity: on average about four times as many tasks want to run (or are waiting on I/O) as there are cores."
   ],
   [
    "free -h shows little free memory but a large available value. Is this a problem?",
    "Usually not; Linux uses spare memory for cache, and available shows memory that can still be handed to applications."
   ],
   [
    "Where do you find evidence that the OOM killer ended a process?",
    "In the kernel log, via dmesg or journalctl -k, with an 'Out of memory: Killed process' message."
   ],
   [
    "Which tool lets you see CPU and disk usage from yesterday afternoon?",
    "sar from sysstat, reading the stored data file with sar -f, provided collection was enabled."
   ]
  ]
 },
 {
  "t": "Networking: ping, ip route, ss, dig/resolvectl, traceroute/tracepath/mtr, tcpdump, nmap",
  "body": [
   "Network troubleshooting goes fastest when you work through the layers in order: is the interface up with the right address, can you reach the gateway, does routing work, does name resolution work, and is the service actually listening and allowed through? Each tool below answers one of those questions, and knowing which tool answers which question is what the exam tests.",
   "Start locally with `ip a` (addresses and link state) and `ip route` (routing table). The line beginning `default via` is the default gateway; without it, only directly connected networks are reachable. `ip route get 8.8.8.8` shows exactly which route and interface a packet to that address would use. Then `ping` tests reachability with ICMP (Internet Control Message Protocol) echo: `ping -c 4 192.168.1.1` for the gateway, then a remote IP, then a hostname. If an IP works but a name fails, the problem is DNS (Domain Name System). Many firewalls block ICMP, so a failed ping does not prove a host is down.",
   "Name resolution is tested with `dig`: `dig example.com` shows the answer, the TTL and which server replied, `dig @8.8.8.8 example.com` asks a specific server, `dig -x 203.0.113.10` performs a reverse lookup, `dig MX example.com` asks for mail records and `+short` trims output. `nslookup` and `host` are simpler alternatives. On systems using systemd-resolved, `resolvectl status` shows the DNS servers per interface, `resolvectl query name` resolves through the system resolver, and `resolvectl flush-caches` clears its cache. `getent hosts name` follows `/etc/nsswitch.conf`, so it includes `/etc/hosts`, which `dig` ignores.",
   "Path tools show where packets stop. `traceroute host` lists each router hop using increasing TTL (time to live) values; `traceroute -T -p 443` uses TCP to get through firewalls that block the defaults. `tracepath` does a similar job without root privileges and reports path MTU (maximum transmission unit). `mtr host` combines ping and traceroute in a continuously updating view with loss and latency per hop, which is excellent for intermittent problems. Asterisks for a hop can simply mean that router does not reply, so look at whether loss continues to the end.",
   "`ss` shows sockets and replaced the older `netstat`. `ss -tulpn` lists listening TCP and UDP ports with numeric addresses and the owning process; `ss -tan` shows all TCP connections with their states, such as ESTABLISHED or TIME-WAIT. A service listening on `127.0.0.1:8080` accepts only local connections, whereas `0.0.0.0:8080` or `*:8080` listens on all interfaces, a very common reason a service is unreachable from other hosts. `tcpdump` captures packets: `tcpdump -i eth0 -nn port 53` shows DNS traffic without resolving names, `host 10.0.0.5` filters by address, and `-w capture.pcap` saves to a file for Wireshark. Requests leaving with no replies, or TCP resets, quickly separate local from remote problems. `nmap` scans for open, closed or filtered ports: `nmap -p 22,80,443 server` checks specific ports and `nmap -sV` identifies service versions. Scanning from another host shows what the network really allows through. Only scan systems you own or are authorized to test.",
   "Consider a worked example. Users cannot reach a new API on port 8080. From a client, `ping api01` and `dig api01.example.com` both work, so addressing, routing and DNS are fine. `nmap -p 8080 api01` reports the port closed rather than filtered, which suggests nothing is listening on the network side rather than a firewall drop. On the server, `ss -tlpn` shows the process listening on `127.0.0.1:8080` only. Changing the application's bind address to `0.0.0.0` and adding a firewalld rule with `firewall-cmd --add-port=8080/tcp --permanent` and `firewall-cmd --reload` solves it, and `tcpdump -nn port 8080` confirms completed handshakes.",
   "Common mistakes: concluding a host is down because ping fails; testing DNS with `dig` and forgetting that the application may use `/etc/hosts` through nsswitch; reading one asterisk hop in traceroute as the fault; overlooking a loopback bind address; using `netstat` habits on systems where only `ss` is installed; and running nmap against networks you are not authorized to scan.",
   "Exam wording maps to tools. 'Show the default gateway' is `ip route`. 'IP works but name fails' means DNS, so `dig`, `resolvectl` or `/etc/resolv.conf`. 'Which process is listening on a port' is `ss -tulpn`. 'Where along the path do packets stop' is `traceroute`, `tracepath` or `mtr`, with mtr for intermittent loss. 'Capture packets for analysis' is `tcpdump`. 'Which ports are open from outside' is `nmap`. 'Closed' means reachable but nothing listening; 'filtered' usually means a firewall."
  ],
  "terms": [
   [
    "Default route",
    "The route used for destinations with no more specific entry, shown as default via in ip route."
   ],
   [
    "ss",
    "The socket statistics tool that lists listening ports, connections and owning processes."
   ],
   [
    "dig",
    "A DNS query tool that shows answers, TTLs and the responding server."
   ],
   [
    "resolvectl",
    "The client for systemd-resolved, showing per-link DNS servers and resolving names through the system resolver."
   ],
   [
    "mtr",
    "A tool combining ping and traceroute to show per-hop loss and latency continuously."
   ],
   [
    "tcpdump",
    "A command-line packet capture tool with filters, able to save pcap files."
   ],
   [
    "nmap",
    "A port scanner that reports open, closed and filtered ports and can identify services."
   ]
  ],
  "example": "Users cannot reach a new API on port 8080. ping and dig both work, and nmap -p 8080 from a client shows the port closed. On the server, ss -tlpn shows the process listening on 127.0.0.1:8080 only. Changing the application's bind address to 0.0.0.0 and adding a firewalld rule for 8080/tcp solves it.",
  "tip": "Work bottom-up: link and IP, gateway, remote IP, DNS name, then the service port. If IPs work but names fail, focus on DNS and nsswitch rather than routing.",
  "check": [
   [
    "ping 8.8.8.8 succeeds but ping example.com fails. Where is the problem likely to be?",
    "In name resolution: DNS server settings, /etc/resolv.conf, systemd-resolved or nsswitch.conf."
   ],
   [
    "Which command lists listening TCP and UDP ports with process names?",
    "ss -tulpn."
   ],
   [
    "What does a service bound to 127.0.0.1 mean for remote clients?",
    "It only accepts connections from the local host, so remote clients cannot connect."
   ],
   [
    "Which tool best shows intermittent packet loss at a particular hop?",
    "mtr, which repeatedly probes every hop and shows loss and latency per hop over time."
   ]
  ]
 },
 {
  "t": "Boot problems: GRUB menu, previous kernels, emergency and rescue targets, fstab errors",
  "body": [
   "A system that will not boot is stressful, but most failures fall into a few categories. Match what you see on the console to the boot stage (firmware, boot loader, kernel and initramfs, then systemd and mounts), and use the recovery path for that stage. Linux+ scenarios usually describe the message on screen and ask for the next step, so learn the messages as well as the fixes.",
   "If you get no boot loader at all, or a message such as 'no bootable device', the problem is before Linux starts: wrong firmware boot order, a missing or damaged EFI System Partition or MBR (master boot record) boot code, or a failed disk. Boot from installation or rescue media, mount the installed system, `chroot` into it, and reinstall the boot loader with `grub2-install` or `grub-install` on BIOS systems (on UEFI systems, reinstalling the shim and GRUB packages or fixing entries with `efibootmgr` is common), then regenerate the configuration with `grub2-mkconfig -o` or `update-grub`. If GRUB loads but drops to a `grub>` or `grub rescue>` prompt, it cannot find its configuration or modules, often after a partition change.",
   "The GRUB menu is your main recovery tool. If it is hidden, hold Shift (BIOS) or press Esc (UEFI) during boot to show it. A kernel update that causes a panic or missing driver can usually be bypassed by choosing a previous kernel entry, since distributions keep several installed kernels for exactly this reason. Once booted, you can make the working kernel the default (for example with `grubby --set-default` on RHEL-family systems), remove the bad kernel, or rebuild its initramfs with `dracut -f --kver <version>` (or `update-initramfs -u` on Debian-family systems) if the image was incomplete. 'Kernel panic - not syncing: VFS: Unable to mount root fs' points to a wrong `root=` argument or an initramfs missing storage drivers.",
   "To change boot behavior once, press `e` on a menu entry, edit the line beginning with `linux`, and press Ctrl+X. Adding `systemd.unit=rescue.target` gives a single-user root shell with local filesystems mounted and minimal services; it asks for the root password. `systemd.unit=emergency.target` is more minimal: the root filesystem is mounted read-only and almost nothing else starts, useful when rescue mode itself fails. To regain access when the root password is lost, you can add `rd.break` (RHEL-family, stopping in the initramfs) or `init=/bin/bash`, remount the root filesystem read-write, reset the password, and on SELinux systems create `/.autorelabel` so labels are fixed on the next boot. Protect GRUB with a password so others cannot do the same.",
   "Errors in `/etc/fstab` are one of the most common boot failures. A typo in a UUID, a device that no longer exists or a wrong filesystem type makes systemd wait for the device, time out, and drop you into emergency mode with a message such as 'Give root password for maintenance'. Log in, run `journalctl -xb` to see which mount failed, then `mount -o remount,rw /` so you can edit, fix or comment out the bad line, and confirm with `findmnt --verify` and `mount -a` before rebooting. Adding `nofail` to non-essential mounts prevents a missing disk from stopping the boot. After recovery, review `journalctl -b -1` for the failed boot and use `systemd-analyze blame` to see which units slow the boot.",
   "Consider a worked example. After a storage migration, a server boots to 'You are in emergency mode'. You enter the root password, and `journalctl -xb` shows a timeout waiting for `dev-disk-by\\x2duuid-...device`, a UUID that no longer exists. You run `mount -o remount,rw /`, find the new UUID with `blkid /dev/sdc1`, replace the old value in `/etc/fstab`, and add `nofail` because the volume holds only archives. `findmnt --verify` reports no errors and `mount -a` mounts it, so you reboot, and the server comes up normally.",
   "Common mistakes: reinstalling the operating system when choosing the previous kernel would have worked; editing fstab in emergency mode without remounting root read-write; rebooting without testing with `mount -a`, only to land back in emergency mode; forgetting `/.autorelabel` after a password reset on an SELinux system, which can block logins; confusing rescue (more services, local filesystems mounted) with emergency (read-only root, almost nothing); and editing `grub.cfg` directly instead of `/etc/default/grub` plus regeneration.",
   "Exam clues are specific. 'No bootable device' or 'grub rescue>' is a boot loader problem, fixed from rescue media with chroot and grub-install. 'Kernel panic after an update' means boot the previous kernel. 'Unable to mount root fs' points to `root=` or the initramfs. 'Emergency mode after adding a disk' means `/etc/fstab`. 'Boot once into single-user mode' is `systemd.unit=rescue.target` at the GRUB prompt. 'Read-only root, minimal environment' is emergency.target."
  ],
  "terms": [
   [
    "GRUB rescue prompt",
    "A minimal GRUB shell shown when the boot loader cannot find its configuration or modules."
   ],
   [
    "Previous kernel",
    "An older installed kernel selectable from the GRUB menu, used when a new one fails."
   ],
   [
    "initramfs",
    "The initial RAM filesystem with drivers and tools needed to mount the real root filesystem."
   ],
   [
    "rescue.target",
    "A single-user systemd target with local filesystems mounted and minimal services."
   ],
   [
    "emergency.target",
    "The most minimal systemd target, with root mounted read-only and almost nothing else started."
   ],
   [
    "chroot",
    "Runs commands with a different directory as root, used to repair an installed system from rescue media."
   ],
   [
    "nofail",
    "An fstab option that lets boot continue if that filesystem cannot be mounted."
   ]
  ],
  "example": "After a storage migration, a server boots to 'You are in emergency mode'. journalctl -xb shows a timeout waiting for a device with a UUID that no longer exists. You run mount -o remount,rw /, replace the old UUID in /etc/fstab with the new one from blkid, test with mount -a, and reboot successfully.",
  "tip": "Emergency mode right after a storage change almost always means /etc/fstab; a kernel panic right after an update usually means booting the previous kernel from GRUB.",
  "check": [
   [
    "How do you boot once into rescue mode without changing any files?",
    "Press e at the GRUB menu, add systemd.unit=rescue.target to the linux line, and boot with Ctrl+X."
   ],
   [
    "In emergency mode the root filesystem is read-only. How do you make it writable to fix /etc/fstab?",
    "mount -o remount,rw /."
   ],
   [
    "A new kernel panics at boot but the old one worked. What is the quickest recovery?",
    "Select the previous kernel from the GRUB menu, then set it as default or fix the new kernel's initramfs."
   ],
   [
    "What should you run before rebooting after editing /etc/fstab?",
    "findmnt --verify and mount -a, to confirm every entry is valid and mounts without errors."
   ]
  ]
 },
 {
  "t": "Service failures: systemctl status exit codes, journalctl, dependencies, port conflicts",
  "body": [
   "When a service will not start or keeps dying, the answer is almost always in its status and logs. A consistent routine resolves most failures quickly: read the status, then the logs, then test the configuration, then check dependencies, ports, permissions and resources. Linux+ questions often show a fragment of `systemctl status` output and ask what it means, so learn to read it precisely.",
   "`systemctl status name` is step one. The Active line shows states such as `active (running)`, `inactive (dead)`, `activating (auto-restart)` or `failed`, with a `Result:` such as `exit-code`, `signal`, `timeout` or `start-limit-hit`. The process line shows how the main process ended, for example `code=exited, status=1/FAILURE`. Exit statuses from 200 upward are set by systemd itself and point to setup problems before the program even ran: `203/EXEC` means the executable in `ExecStart=` was missing, not executable or had a bad interpreter; `217/USER` means the `User=` account does not exist; `200/CHDIR` a bad working directory; `226/NAMESPACE` a problem setting up sandboxing paths. A status of 1 or 2 is usually the application reporting its own error, and `signal=SEGV` or `signal=KILL` means a signal ended it, possibly the OOM killer. `start-limit-hit` means systemd stopped retrying after too many restarts in a short time; fix the cause, then `systemctl reset-failed name`.",
   "Next, read the logs. `journalctl -u name -b` shows the unit's messages from this boot, `-e` jumps to the end, `-x` adds explanations and `-f` follows while you restart it in another terminal. Many applications also write their own logs under `/var/log/<app>/`. Configuration syntax errors are the most frequent cause, so use the application's own checker before restarting: `nginx -t`, `apachectl configtest`, `sshd -t`, `named-checkconf`, `postfix check` and similar.",
   "Dependencies matter because units start in an order defined by `Requires=`, `Wants=`, `After=` and `Before=`. `Requires=` and `Wants=` pull other units in (hard and soft), while `After=` and `Before=` only set ordering. If a required unit fails, the dependent unit fails too with 'Dependency failed'. `systemctl list-dependencies name` shows the tree and `--reverse` shows what depends on it. A service that needs the network or a mount should declare `After=network-online.target` and `Wants=network-online.target`, or `RequiresMountsFor=/data`. A masked unit reports that it is masked and cannot start until unmasked. After editing unit files, or adding a drop-in with `systemctl edit name`, run `systemctl daemon-reload`.",
   "Port conflicts cause errors such as 'Address already in use' or 'bind() failed'. Only one process can listen on a given address and port. `ss -tlpn 'sport = :80'` or `ss -tlpn | grep :80` identifies which process holds the port; `lsof -i :80` also works. Resolve it by stopping or disabling the other service, or moving one to a different port. On SELinux systems a non-standard port also needs a label with `semanage port`, or the bind is denied even when nothing else is listening; if the error says 'Permission denied', check `ausearch -m avc`. Also check permissions and resources: the service user must be able to read its config and write its data, log and PID directories, the disk must not be full, and required environment files must exist.",
   "Consider a worked example. After an upgrade, httpd fails. `systemctl status httpd` shows `failed` with `status=1/FAILURE`, so the program itself ran and reported an error. `journalctl -u httpd -b -e` shows 'Address already in use: AH00072: make_sock: could not bind to address [::]:80'. `ss -tlpn | grep :80` shows nginx, installed as a dependency of a monitoring tool, listening on port 80. You run `systemctl disable --now nginx`, confirm `apachectl configtest` reports Syntax OK, and start httpd successfully. A second service on the same host fails with `203/EXEC`; its unit points to `/opt/app/bin/start`, which the upgrade renamed, so you fix `ExecStart=` in a drop-in and run `daemon-reload`.",
   "Common mistakes: restarting a service repeatedly without reading the logs; editing a unit file and forgetting `daemon-reload`; confusing `After=` with `Requires=`; treating a 200-range code as an application bug instead of a unit file problem; disabling SELinux to fix a port bind instead of labeling the port; and forgetting `reset-failed` after start-limit-hit, so the service still refuses to start.",
   "Exam wording is consistent. 'status=203/EXEC' means check the ExecStart path and permissions. '217/USER' means the User= account is missing. 'Address already in use' means another process has the port, found with `ss -tlpn` or `lsof -i`. 'Changes to the unit file are ignored' means `daemon-reload`. 'Start only after the network is up' is `After=` with `Wants=network-online.target`. 'Show logs for one service since boot' is `journalctl -u name -b`."
  ],
  "terms": [
   [
    "203/EXEC",
    "A systemd exit status meaning the ExecStart program could not be executed."
   ],
   [
    "start-limit-hit",
    "A result meaning systemd stopped restarting a unit after too many failures in a short period."
   ],
   [
    "Requires= / After=",
    "Requires pulls in a hard dependency; After only orders startup and pulls nothing in."
   ],
   [
    "daemon-reload",
    "systemctl daemon-reload, which makes systemd reread changed unit files."
   ],
   [
    "Address already in use",
    "The bind error when another process already listens on the requested address and port."
   ],
   [
    "Config test",
    "An application's own syntax checker, such as nginx -t or apachectl configtest, run before restarting."
   ]
  ],
  "example": "After an upgrade, httpd fails with 'Address already in use: AH00072: make_sock: could not bind to address [::]:80'. ss -tlpn | grep :80 shows nginx, installed as a dependency of a monitoring tool, listening on port 80. You disable and stop nginx with systemctl disable --now nginx, then start httpd successfully.",
  "tip": "Exit codes in the 200s come from systemd before the program runs, so check the unit file (paths, User=, directories); small codes like 1 usually mean the application itself reported an error in its logs.",
  "check": [
   [
    "A unit fails with status=203/EXEC. What should you check first?",
    "The ExecStart path: that the file exists, is executable, and has a valid shebang or interpreter."
   ],
   [
    "How do you find which process is already using TCP port 443?",
    "ss -tlpn | grep :443 (or lsof -i :443)."
   ],
   [
    "What is the difference between Requires= and After=?",
    "Requires= pulls in another unit as a hard dependency (combined with After=, the unit will not start if that one fails); After= only orders startup and does not pull anything in by itself."
   ],
   [
    "You edited a unit file but systemctl still uses the old settings. What did you forget?",
    "systemctl daemon-reload, which makes systemd reread unit files."
   ]
  ]
 },
 {
  "t": "Security issues: SELinux denials, file permissions, SSH key permissions, locked accounts",
  "body": [
   "Many 'it just stopped working' tickets are really security controls doing their job: SELinux (Security-Enhanced Linux) blocking an unexpected access, permissions that are too tight or too loose, SSH refusing a key, or an account locked after failed logins. The skill is to identify which control is responsible and fix the configuration without weakening security. Exam answers that switch a control off are almost always wrong; answers that make the smallest correct change are right.",
   "SELinux denials often surface as 'Permission denied' or HTTP 403 errors even though normal permissions look correct. First confirm SELinux is involved: `getenforce` shows the mode, and `ausearch -m avc -ts recent` (or `journalctl -t setroubleshoot`, or `sealert -a /var/log/audit/audit.log`) shows AVC (access vector cache) denials naming the source process type, the target file type and the operation. `ls -Z` shows file labels and `ps -eZ` shows process labels.",
   "The usual SELinux causes and fixes are: wrong file labels after `mv` or restoring files (fix with `restorecon -Rv path`); content in a non-standard location (add a rule with `semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?'`, then restorecon); a service on a non-standard port (`semanage port -a -t http_port_t -p tcp 8081`); or an optional behavior that needs a boolean (`setsebool -P httpd_can_network_connect on`). Setting permissive mode briefly with `setenforce 0` can confirm SELinux is the cause, but switch back with `setenforce 1` and fix the policy issue rather than leaving it off. `chcon` changes a label temporarily, but a relabel undoes it, so semanage plus restorecon is the durable fix.",
   "File permission problems follow the rules from earlier lessons. The process's user needs read on files, and execute on every directory in the path; check with `namei -l /full/path` and `ls -l`, and see which user a service runs as with `ps -o user= -p PID` or the unit's `User=` setting. Check group membership with `id user`, ACLs (access control lists) with `getfacl`, and mount options like `noexec` with `findmnt`. The fix is the minimal change needed, such as adjusting group ownership or adding an ACL, never `chmod 777`. Also watch for the reverse: world-writable scripts run by root, private keys readable by others, or configuration files containing passwords.",
   "SSH key authentication fails quietly when permissions are loose, because sshd's StrictModes check refuses keys that other users could have tampered with. On the server, the home directory must not be group- or world-writable, `~/.ssh` should be 700, and `~/.ssh/authorized_keys` 600, all owned by the user. On the client, the private key must be 600, or ssh refuses it with 'UNPROTECTED PRIVATE KEY FILE'. An authorized_keys file created in an unusual way may need `restorecon -Rv ~/.ssh`. Diagnose with `ssh -v user@host` on the client and `journalctl -u sshd` (or `/var/log/secure` or `auth.log`) on the server, where 'Authentication refused: bad ownership or modes' points straight to the cause. Locked or expired accounts produce failures that look like wrong passwords: `faillock --user name` shows lockouts (reset with `--reset`), `passwd -S name` shows a locked password (`LK` or `L`), `chage -l name` shows expiry dates, the shell in `/etc/passwd` might be `nologin`, and for directory accounts check SSSD and `id name`.",
   "Consider a worked example. After a home directory restore, a developer's SSH key login fails and falls back to a password prompt. `ssh -v` shows the key offered and rejected. On the server, `journalctl -u sshd` shows 'Authentication refused: bad ownership or modes for directory /home/dev'. The restore left the home directory group-writable, and `ls -Z` shows `~/.ssh` carrying a generic label. You run `chmod 755 /home/dev`, `chmod 700 /home/dev/.ssh`, `chmod 600 /home/dev/.ssh/authorized_keys` and `restorecon -Rv /home/dev/.ssh`, and key login works. The same week, a web server returns 403 for content moved from a home directory to `/srv/web`; `ausearch -m avc` shows `user_home_t` labels, and a semanage fcontext rule plus restorecon fixes it without touching enforcing mode.",
   "Common mistakes: disabling SELinux or leaving it permissive; using `chcon` as a permanent fix; running `chmod 777` to make an error disappear; fixing file permissions but forgetting execute on a parent directory; loosening `~/.ssh` permissions in an attempt to help; unlocking an account without checking whether the failures were an attack; and checking only the password when the account has expired or has a `nologin` shell.",
   "Exam questions reward identifying the control. 'Permission denied but permissions look fine on RHEL' means SELinux, so check `ausearch -m avc` and fix with restorecon, semanage or a boolean. 'Files moved into the web root now return 403' is a labeling issue fixed by restorecon. 'Key rejected, bad ownership or modes' is StrictModes. 'UNPROTECTED PRIVATE KEY FILE' is the client key needing 600. 'Account locked after failed attempts' is faillock, and 'password expired' is chage."
  ],
  "terms": [
   [
    "AVC denial",
    "An SELinux access vector cache message recording a blocked access, found with ausearch -m avc."
   ],
   [
    "restorecon",
    "Resets SELinux file labels to the values defined by policy."
   ],
   [
    "semanage fcontext",
    "Adds a persistent SELinux labeling rule for a path, applied with restorecon."
   ],
   [
    "SELinux boolean",
    "An on/off policy switch such as httpd_can_network_connect, set persistently with setsebool -P."
   ],
   [
    "StrictModes",
    "The sshd check that refuses keys when home, ~/.ssh or authorized_keys permissions are too open."
   ],
   [
    "namei -l",
    "Shows permissions for every component of a path, revealing a missing execute bit on a parent directory."
   ],
   [
    "passwd -S",
    "Shows an account's password status, including whether it is locked."
   ]
  ],
  "example": "After a home directory restore, a developer's SSH key login fails and falls back to a password prompt. journalctl -u sshd shows 'Authentication refused: bad ownership or modes for directory /home/dev'. The restore left the home directory group-writable. chmod 755 /home/dev, chmod 700 ~/.ssh, chmod 600 ~/.ssh/authorized_keys and restorecon -Rv /home/dev/.ssh restore key login.",
  "tip": "When access fails but permissions look fine on an SELinux system, check ausearch -m avc before touching chmod; the fix is usually restorecon, semanage or a boolean, never disabling SELinux.",
  "check": [
   [
    "What permissions should ~/.ssh and ~/.ssh/authorized_keys have for key login to work reliably?",
    "~/.ssh 700 and authorized_keys 600, owned by the user, with a home directory not writable by group or others."
   ],
   [
    "A user says their password suddenly stopped working. Name three commands to check account status.",
    "faillock --user <name>, passwd -S <name> and chage -l <name> (also check the shell in /etc/passwd)."
   ],
   [
    "Why is chmod 777 a poor fix for a permission denied error?",
    "It grants everyone full access, creating a security hole instead of granting only the minimum access the process needs."
   ],
   [
    "Web content moved with mv returns 403, and ausearch shows an AVC denial. What is the likely fix?",
    "restorecon -Rv on the content (adding a semanage fcontext rule first if it is a non-standard location), because mv kept the old SELinux label."
   ]
  ]
 },
 {
  "t": "Hardware: dmesg, lspci, lsusb, smartctl, failing disks and RAID degradation",
  "body": [
   "Hardware problems often masquerade as software bugs: random crashes, filesystem errors, slow I/O or devices that disappear. Linux gives you good visibility into hardware through kernel messages and inventory tools, and Linux+ expects you to use them to confirm or rule out a hardware fault before spending hours on configuration. The workflow is to read the kernel's view, identify the device and driver, check the device's own health data, and then protect data if a disk is failing.",
   "The kernel ring buffer records hardware detection, driver messages and errors. `dmesg` prints it, `dmesg -T` shows human-readable timestamps, `dmesg -w` follows new messages, and `dmesg --level=err,warn` filters by severity; `journalctl -k` shows the same messages from the journal, including previous boots with `-b -1`. Look for I/O errors (`blk_update_request: I/O error`, `Buffer I/O error`), ATA or NVMe resets and timeouts, 'Medium Error' messages, filesystem errors from ext4 or XFS, machine check exceptions reporting CPU or memory faults, and USB devices repeatedly connecting and disconnecting. Reading dmesg right after plugging in a device shows the name it received, such as `sdb`.",
   "Inventory tools identify hardware and drivers. `lspci` lists PCI (Peripheral Component Interconnect) devices such as network cards, storage controllers and GPUs; `lspci -k` shows the kernel driver in use for each, which is the quickest way to spot a device with no driver, and `-nn` adds vendor and device IDs. `lsusb` lists USB devices, with `-t` for a tree and `-v` for detail. Related tools include `lscpu` for CPU details, `lsblk` for block devices, `lshw` or `dmidecode` for a full inventory including memory modules and firmware, `lsmem` for memory, `lsmod` and `modprobe` for loaded and loadable drivers, and `sensors` for temperatures if lm-sensors is installed.",
   "Disks report their own health through SMART (Self-Monitoring, Analysis and Reporting Technology). The `smartctl` tool from smartmontools reads it: `smartctl -H /dev/sda` gives an overall PASSED or FAILED verdict, `smartctl -a /dev/sda` shows all attributes and the error log, and `smartctl -t short /dev/sda` or `-t long` runs a self-test whose results appear later in `-a` output. Warning signs include growing reallocated, pending or offline-uncorrectable sector counts on hard drives, and media errors or low available spare on NVMe drives. A PASSED verdict does not guarantee health, so trends in these counters matter more. The `smartd` service monitors drives continuously and sends alerts.",
   "In software RAID (redundant array of independent disks), a failing disk leads to a degraded array: it keeps working using the remaining disks, but it has lost redundancy, so another failure could lose data. `cat /proc/mdstat` shows member status, where `[UU]` means both mirror members are up and `[U_]` means one is missing, and `mdadm --detail /dev/md0` reports the state as clean, degraded or recovering and lists faulty devices. Configure `mdadm --monitor` or the mdmonitor service to send alerts. To replace a disk: `mdadm /dev/md0 --fail /dev/sdb1 --remove /dev/sdb1`, physically swap the drive, copy the partition layout (for example `sfdisk -d /dev/sda | sfdisk /dev/sdb`, or `sgdisk` for GPT), then `mdadm /dev/md0 --add /dev/sdb1` and watch the rebuild in /proc/mdstat. Hardware RAID controllers use the vendor's utility instead. During a rebuild the remaining disks are heavily loaded, another reason to keep current backups.",
   "Consider a worked example. A file server logs occasional XFS errors, and users report slow saves. `dmesg -T --level=err` shows repeated ATA errors and resets on `sdc`. `smartctl -a /dev/sdc` reports a pending sector count that has risen since last week's check, and `cat /proc/mdstat` shows `md1` as `[U_]`, meaning the kernel already kicked the failing partition out of the mirror. You confirm the latest backup, run `mdadm /dev/md1 --remove /dev/sdc1` (it is already marked faulty), replace the drive, copy the partition table from the healthy disk, add the new partition, and watch the rebuild until the array shows `[UU]`. Then you run `xfs_repair -n` during a maintenance window to confirm the filesystem is clean.",
   "Common mistakes: chasing filesystem errors with repair tools while ignoring the disk that causes them; trusting a PASSED SMART verdict while sector counts climb; not noticing a degraded array because no alerts were configured; removing the healthy member instead of the failed one; forgetting to copy the partition layout before adding the new disk; and treating RAID as a backup, which it is not, since deletions and corruption are mirrored too.",
   "Exam questions pair clues with commands. 'Which driver is a network card using' is `lspci -k`. 'Is a USB device detected' is `lsusb` plus `dmesg`. 'Kernel messages with readable timestamps' is `dmesg -T`. 'Disk health verdict' is `smartctl -H`, and 'full attributes and error log' is `smartctl -a`. '[U_] in /proc/mdstat' means degraded. 'Replace a failed member' is `mdadm --fail`, `--remove`, then `--add`."
  ],
  "terms": [
   [
    "dmesg",
    "Prints the kernel ring buffer of hardware detection, driver and error messages."
   ],
   [
    "lspci -k",
    "Lists PCI devices together with the kernel driver in use for each."
   ],
   [
    "lsusb",
    "Lists USB devices, with -t for a tree view."
   ],
   [
    "SMART",
    "Self-Monitoring, Analysis and Reporting Technology, the health data disks keep about themselves, read with smartctl."
   ],
   [
    "Reallocated sectors",
    "Bad sectors a disk has remapped to spares; a rising count signals a failing drive."
   ],
   [
    "Degraded array",
    "A RAID array still serving data after losing a member, but without redundancy."
   ],
   [
    "mdadm",
    "The tool for creating, monitoring and repairing Linux software RAID arrays."
   ]
  ],
  "example": "A file server logs occasional XFS errors. dmesg -T shows repeated ATA errors on sdc, smartctl -a /dev/sdc reports a rising pending sector count, and /proc/mdstat shows md1 as [U_]. You fail and remove sdc1 from the array, replace the drive, copy the partition table, add the new partition, and monitor the rebuild until the array shows [UU].",
  "tip": "An array showing [U_] in /proc/mdstat is degraded: it still works, but the failed member must be replaced before another disk fails. RAID is not a backup.",
  "check": [
   [
    "Which command shows which kernel driver a network card is using?",
    "lspci -k."
   ],
   [
    "How do you get a quick overall health verdict for /dev/nvme0n1?",
    "smartctl -H /dev/nvme0n1."
   ],
   [
    "What does [U_] mean in /proc/mdstat?",
    "The array is degraded: one member is up and one is missing or failed."
   ],
   [
    "Why is a PASSED SMART verdict not enough on its own?",
    "The overall verdict only fails at thresholds; rising reallocated or pending sector counts can show a disk is deteriorating well before then."
   ]
  ]
 },
 {
  "t": "Time sync: chrony, timedatectl, clock skew effects on TLS and Kerberos",
  "body": [
   "Accurate time sounds like a nicety, but many systems depend on it. Log correlation across servers, scheduled jobs, certificate validation, authentication protocols, distributed databases and backups all break in confusing ways when clocks disagree. Linux+ expects you to configure time synchronization, verify that it is working, and recognize the symptoms of clock skew, which often show up as security or authentication errors rather than obvious time problems.",
   "Linux has two clocks: the system clock maintained by the kernel while running, and the hardware clock, also called the RTC (real-time clock), which keeps time while the machine is off. `timedatectl` shows both, along with the time zone and whether synchronization is active ('System clock synchronized: yes' and 'NTP service: active'). Use `timedatectl set-timezone America/Chicago` to change the zone (`timedatectl list-timezones` lists them), `timedatectl set-ntp true` to enable automatic synchronization, and `timedatectl set-time` only when NTP is off. Servers commonly keep the RTC in UTC (Coordinated Universal Time). `hwclock --systohc` copies the system time to the hardware clock and `hwclock --show` reads it.",
   "NTP (Network Time Protocol) keeps the system clock accurate by querying time servers over UDP port 123. On most current distributions the NTP implementation is chrony, whose daemon is `chronyd` and whose configuration is `/etc/chrony.conf` or `/etc/chrony/chrony.conf`. `server ntp1.example.com iburst` adds a server, and `iburst` speeds up initial synchronization; `pool` lines use a set of servers from a pool; `makestep 1.0 3` allows the clock to jump instead of slewing gradually when it is more than one second off during the first three updates; and `allow 10.0.0.0/8` lets chrony serve time to other hosts. Some systems use the simpler `systemd-timesyncd` client instead; only one time service should run at a time.",
   "Verify with `chronyc`: `chronyc sources -v` lists servers, where `^*` marks the currently selected source, `^+` an acceptable alternative and `^?` an unreachable one; `chronyc tracking` shows the current offset from true time, stratum and frequency error; `chronyc makestep` forces an immediate correction. If no source is reachable, check the firewall for outbound UDP 123, DNS resolution of the server names, and whether the servers are healthy. Virtual machines can drift noticeably after being paused or migrated, so they need synchronization too.",
   "Clock skew effects are exam favorites. TLS (Transport Layer Security) certificates have 'not before' and 'not after' validity dates, so a client whose clock is wrong may reject a valid certificate as expired or not yet valid, causing HTTPS, package repository and API failures. Kerberos tickets carry timestamps to prevent replay attacks, and by default the KDC (Key Distribution Center) rejects requests if client and server clocks differ by more than about five minutes, producing 'Clock skew too great' errors and failed domain logins through SSSD. TOTP (time-based one-time password) codes used for MFA also fail when the clock is off. Skewed clocks also make logs from different hosts impossible to line up during an investigation, and can make cron jobs and timers run at unexpected times. So when you see certificate errors on only one machine, Kerberos or Active Directory failures, or rejected MFA codes, check the time first.",
   "Consider a worked example. Users on one Linux workstation cannot log in with their Active Directory accounts, and the SSSD logs mention clock skew. `timedatectl` shows 'System clock synchronized: no' and the clock is eight minutes behind. `chronyc sources -v` shows every server as `^?`, unreachable. You find that a new firewall rule blocks outbound UDP 123. After allowing it, `chronyc sources` shows `^*` next to a server within a minute, `chronyc makestep` corrects the clock at once, and `chronyc tracking` reports an offset of a few milliseconds. Domain logins work again, and the same fix clears an earlier 'certificate not yet valid' error from the package manager.",
   "Common mistakes: setting the time by hand with `date` while NTP is broken, which drifts again; running chronyd and systemd-timesyncd together; confusing the time zone with the clock being wrong, since a wrong zone changes display, not UTC; forgetting the firewall rule for UDP 123; troubleshooting Kerberos or certificates for hours before checking the clock; and assuming virtual machines inherit perfect time from the host.",
   "Exam wording gives clear clues. 'Is the clock synchronized' is `timedatectl` or `chronyc tracking`. 'Which server is selected' is `chronyc sources`, looking for `^*`. 'Change the time zone' is `timedatectl set-timezone`. 'Clock skew too great' is Kerberos needing time sync. 'Certificate not yet valid on one host only' points to that host's clock. 'NTP port' is UDP 123, and 'speed up initial sync' is `iburst`."
  ],
  "terms": [
   [
    "NTP",
    "Network Time Protocol, which synchronizes clocks with time servers over UDP port 123."
   ],
   [
    "chrony",
    "The common Linux NTP implementation, with chronyd as the daemon and chronyc as the client."
   ],
   [
    "timedatectl",
    "Shows and sets system time, time zone and whether NTP synchronization is enabled."
   ],
   [
    "RTC",
    "The real-time (hardware) clock that keeps time while the system is powered off."
   ],
   [
    "Stratum",
    "An NTP server's distance from a reference clock; lower numbers are closer."
   ],
   [
    "Clock skew",
    "The difference between clocks on different systems, which breaks time-sensitive protocols."
   ]
  ],
  "example": "Users on one Linux workstation cannot log in with their Active Directory accounts, and the SSSD logs mention clock skew. timedatectl shows 'System clock synchronized: no', and chronyc sources shows every server as unreachable because a new firewall rule blocks outbound UDP 123. After allowing it, chronyc makestep corrects the clock and domain logins work again.",
  "tip": "Certificate 'not yet valid' errors on a single host, Kerberos 'clock skew too great' messages and rejected MFA codes are all classic signs of a wrong system clock.",
  "check": [
   [
    "Which command shows whether the system clock is currently synchronized?",
    "timedatectl (look for 'System clock synchronized: yes'), or chronyc tracking for details."
   ],
   [
    "What does ^* mean in chronyc sources output?",
    "It marks the time source chrony has currently selected for synchronization."
   ],
   [
    "Why can a wrong clock break HTTPS connections?",
    "Certificate validity dates are checked against the local clock, so a valid certificate may appear expired or not yet valid."
   ],
   [
    "Which port and protocol must a firewall allow for NTP?",
    "UDP port 123."
   ]
  ]
 },
 {
  "t": "Package problems: broken dependencies, repository errors, held packages",
  "body": [
   "Package managers are reliable, but updates and installs can still fail. The most common problems are unresolvable dependencies, interrupted operations, repository errors and packages deliberately held back. Reading the error carefully usually tells you which of these you are dealing with, and each has a safe fix and a tempting unsafe one. Linux+ expects you to know both families: dnf and rpm on RHEL-family systems, apt and dpkg on Debian-family systems.",
   "Broken dependencies happen when a package needs a version of a library or another package that is not available or conflicts with something installed. Causes include mixing repositories for different distribution releases, installing individual packages manually with `rpm -i` or `dpkg -i`, third-party repositories that replace base packages, and interrupted installs. On Debian-family systems, `apt --fix-broken install` (or `apt-get -f install`) tries to complete or repair a half-finished installation, and `apt-cache policy name` shows available versions and which repository each comes from. On RPM systems, dnf reports conflicts clearly; `dnf check` finds problems in the installed set, `dnf repoquery --requires name` or `rpm -qR name` shows what a package needs, and `--allowerasing` (letting dnf remove conflicting packages) or `--best` change the solver's behavior. Read carefully before accepting removals. Avoid forcing installs with `rpm --nodeps` or `dpkg --force-depends`, which leave the system inconsistent.",
   "Interrupted package operations leave locks behind or leave the database mid-change. `dpkg --configure -a` finishes configuring packages left unconfigured by an interruption. apt reports 'Could not get lock /var/lib/dpkg/lock-frontend' when another apt process, often an automatic update, is still running; wait for it or find it with `ps`, rather than deleting lock files while it runs. If the RPM database is damaged, `rpm --rebuilddb` can rebuild it, and `dnf history` shows recent transactions with `dnf history undo <id>` to roll one back.",
   "Repository errors appear as failures to download metadata or packages. A 404 means the repository URL or release name is wrong, or the release reached end of life and moved to an archive. 'Failed to download metadata for repo' or 'Temporary failure resolving' points to DNS, proxy or network problems, including a missing proxy setting. GPG errors such as 'NO_PUBKEY' or 'public key not installed' mean the repository's signing key has not been imported or has rotated. TLS certificate errors can be caused by a wrong system clock. Check the repository files in `/etc/yum.repos.d/` or `/etc/apt/sources.list.d/`, test the URL with `curl -I`, confirm DNS and proxy settings, and import the correct key through the vendor's documented method, verifying its fingerprint. Clear stale metadata with `dnf clean all` and `dnf makecache`, or refresh with `apt update`. Disabling GPG checking to make an error go away is a security risk and the wrong fix.",
   "Held packages are deliberately prevented from upgrading, often to protect a kernel or application version others depend on. On Debian-family systems, `apt-mark hold name` holds a package, `apt-mark showhold` lists holds and `apt-mark unhold name` releases one; apt reports 'The following packages have been kept back' for holds and for upgrades that would need new dependencies, which `apt full-upgrade` or an explicit `apt install name` can resolve. On RPM systems, the versionlock plug-in (`dnf versionlock add name`, `dnf versionlock list`, `dnf versionlock delete name`) does the same, and `exclude=` lines in `/etc/dnf/dnf.conf` or a `.repo` file hide packages from updates entirely. When a package will not update, check for holds, versionlocks and excludes, and ask why they were set before removing them.",
   "Consider a worked example. An Ubuntu server's nightly update reports that several packages were kept back. `apt-mark showhold` lists the kernel packages, held months ago during a driver issue that the change log shows has since been fixed. After confirming with the team, you run `apt-mark unhold` on them, apply the updates and schedule a reboot. On a RHEL-family server the same night, `dnf upgrade` fails with 'Failed to download metadata for repo'. `curl -I` against the baseurl shows a proxy error, and you find the new proxy address was never added to `/etc/dnf/dnf.conf`. Adding `proxy=` there, then `dnf clean all` and `dnf makecache`, fixes it without touching gpgcheck.",
   "Common mistakes: forcing an install with `--nodeps` or `--force-depends`; deleting apt lock files while another process is running; setting `gpgcheck=0` or trusting unsigned repositories to silence key errors; mixing repositories from different releases; accepting a dnf transaction that removes important packages without reading it; removing someone else's hold without asking why; and forgetting that a wrong clock can cause repository TLS errors.",
   "Exam wording maps to fixes. 'Interrupted install on Debian or Ubuntu' is `dpkg --configure -a` then `apt --fix-broken install`. 'Could not get lock' means another package process is running. 'NO_PUBKEY' means import the correct, verified key. '404 for an old release' means the repository moved or reached end of life. 'Kept back' points to holds or new dependencies. 'Prevent a package from updating' is `apt-mark hold` or `dnf versionlock`."
  ],
  "terms": [
   [
    "Dependency conflict",
    "A situation where required package versions cannot all be satisfied together."
   ],
   [
    "apt --fix-broken install",
    "Attempts to complete or repair broken dependencies on Debian-family systems."
   ],
   [
    "dpkg --configure -a",
    "Finishes configuring packages left half-installed by an interruption."
   ],
   [
    "NO_PUBKEY",
    "An apt error meaning the repository's signing key is not installed."
   ],
   [
    "apt-mark hold",
    "Prevents a package from being upgraded on Debian-family systems."
   ],
   [
    "dnf versionlock",
    "A dnf plug-in that locks packages at their current version."
   ],
   [
    "dnf history undo",
    "Rolls back a recorded dnf transaction."
   ]
  ],
  "example": "An Ubuntu server's nightly update reports that several packages were kept back. apt-mark showhold lists the kernel packages, held months ago during a driver issue that has since been fixed. After confirming with the team, you run apt-mark unhold on them, apply the updates and schedule a reboot into the new kernel.",
  "tip": "Repository GPG errors are fixed by importing the correct, verified key, not by setting gpgcheck=0 or trusting unsigned repositories. 'Kept back' means look for holds or new dependencies.",
  "check": [
   [
    "An install was interrupted by a power loss on Ubuntu. Which two commands help repair the package state?",
    "dpkg --configure -a and apt --fix-broken install."
   ],
   [
    "How do you list held packages on a Debian-family system?",
    "apt-mark showhold."
   ],
   [
    "dnf fails with 'Failed to download metadata for repo'. Name two things to check.",
    "Any two of: the baseurl or mirror URL in the .repo file, DNS and network or proxy access, the system clock for TLS errors, and whether the release has moved to an archive."
   ],
   [
    "Why is rpm -i --nodeps a poor fix for a dependency error?",
    "It installs the package without what it needs, leaving the system inconsistent and likely to fail later."
   ]
  ]
 },
 {
  "t": "Container problems: logs, port conflicts, image pulls, storage",
  "body": [
   "Containers fail in characteristic ways: the application inside crashes, the port cannot be published, the image cannot be pulled, or storage is missing, full or inaccessible. The commands from the containers lesson become your troubleshooting toolkit, and the process mirrors ordinary service troubleshooting: check state, read logs, inspect configuration, then look at the network and storage around the container. Examples here use Podman, but the same subcommands work with Docker.",
   "Start by finding the container's state. `podman ps -a` (or `docker ps -a`) includes stopped containers and shows their status, such as `Exited (1) 2 minutes ago` or a restart loop. `podman logs name` shows what the application printed before it stopped, which is usually the answer: a missing environment variable, a configuration error or a failed database connection. `podman inspect name` shows the exit code, the OOMKilled flag, the command, environment, mounts and restart policy. An exit code of 137 means the process was killed with SIGKILL (128 + 9), often by the OOM killer or a memory limit, while 139 indicates a segmentation fault. `podman events` shows lifecycle events, and `podman exec -it name sh` lets you look inside a running container. If a container exits immediately, check that its main command does not simply finish, or run the image interactively with a shell to inspect it.",
   "Port conflicts show up as errors like 'address already in use' when you publish with `-p`. Only one process can bind a host port, so check with `ss -tlpn | grep :8080` for host services and `podman ps` for other containers already publishing it, then choose another host port or stop the conflicting service. If the container runs but is unreachable, check `podman port name` to confirm the mapping, confirm the application inside listens on 0.0.0.0 rather than 127.0.0.1 within the container, and check the host firewall. Rootless Podman cannot bind host ports below 1024 by default, which produces a permission error rather than a conflict.",
   "Image pull failures come from several causes. 'manifest unknown' or 'not found' means a wrong image name or tag; 'unauthorized' or 'denied' means you need to log in with `podman login registry` or lack access to a private repository; 'toomanyrequests' indicates a registry rate limit; and timeouts, DNS failures or TLS certificate errors point to network, proxy or clock problems. Short names without a registry may be resolved against a list in `/etc/containers/registries.conf`, so use fully qualified names like `registry.example.com/team/app:1.4` to be explicit and avoid pulling a lookalike image. Pinning a specific tag or digest instead of `latest` also prevents surprises.",
   "Storage problems come in two forms. Space: images, stopped containers, volumes and build cache consume disk under `/var/lib/containers` (Podman as root), `~/.local/share/containers` (rootless Podman) or `/var/lib/docker`. `podman system df` summarizes usage, and `podman image prune`, `podman container prune`, `podman volume prune` and `podman system prune` reclaim it; be careful, because pruning volumes deletes data. Access: a bind mount that gives 'Permission denied' inside the container usually means SELinux labels (add `:Z` for a private label or `:z` for a shared one to the `-v` option) or UID mismatches, especially in rootless mode where container UIDs map to subordinate UIDs on the host; `podman unshare` helps adjust ownership. Data written inside a container without a volume vanishes when the container is removed, a common cause of lost data after an image update.",
   "Consider a worked example. A containerized API keeps restarting. `podman ps -a` shows `Exited (137)`, and `podman inspect api --format '{{.State.OOMKilled}}'` prints true. `podman logs api` shows normal startup messages that simply stop, consistent with a hard kill rather than an application error. The container was started with `--memory 256m`, but the new release needs more. You recreate it with `--memory 512m`, and it stays up. The next day a teammate's new container fails with 'address already in use' on port 8080; `podman ps` shows the old API version still publishing 8080, so they stop it and the new container starts.",
   "Common mistakes: restarting a crashing container repeatedly without reading `podman logs`; treating exit 137 as an application bug rather than a kill; binding the app to 127.0.0.1 inside the container; using unqualified image names; running `system prune --volumes` and losing data; disabling SELinux instead of using `:Z`; and storing data in the container's writable layer instead of a volume.",
   "Exam questions follow patterns. 'Container exits immediately' means check `podman logs`. 'Exit code 137' or 'OOMKilled true' means memory. 'address already in use' means a host port conflict, found with `ss` or `podman ps`. 'manifest unknown' means a wrong name or tag, and 'unauthorized' means `podman login`. 'Disk filling with images' is `podman system df` and prune. 'Permission denied on a bind mount on RHEL' is `:Z`. 'Rootless cannot use port 80' is the privileged port limit."
  ],
  "terms": [
   [
    "Exit code 137",
    "A container exit caused by SIGKILL (128 + 9), often from the OOM killer or a memory limit."
   ],
   [
    "podman ps -a",
    "Lists all containers, including stopped ones, with their status."
   ],
   [
    "podman inspect",
    "Shows detailed container configuration and state, including exit code, OOMKilled, mounts and ports."
   ],
   [
    "registries.conf",
    "The file that defines registries and how short image names are resolved."
   ],
   [
    "podman system df",
    "Summarizes disk space used by images, containers and volumes."
   ],
   [
    "Z volume option",
    "The :Z or :z suffix on -v that relabels a bind mount for SELinux container access."
   ],
   [
    "Rootless container",
    "A container run by an unprivileged user, with UIDs mapped to subordinate IDs on the host."
   ]
  ],
  "example": "A containerized API keeps restarting. podman ps -a shows Exited (137), and podman inspect shows OOMKilled true. The container had --memory 256m but the new release needs more. Raising the limit to 512m and redeploying stops the restarts, and podman logs now shows the service starting normally.",
  "tip": "Check logs first, then inspect: podman logs explains most application crashes, and podman inspect reveals exit codes, OOM kills, mounts and port mappings.",
  "check": [
   [
    "A container exits with code 137. What is the most likely cause?",
    "It was killed with SIGKILL, often because it exceeded its memory limit or was chosen by the OOM killer."
   ],
   [
    "podman run -p 80:8080 fails as a regular user with a permission error. Why?",
    "Rootless containers cannot bind host ports below 1024 by default; use a higher host port or adjust the system setting."
   ],
   [
    "A bind-mounted directory gives Permission denied inside a container on a RHEL host. What is a common fix?",
    "Add :Z (or :z) to the volume option so the directory is relabeled for container access under SELinux."
   ],
   [
    "A pull fails with 'manifest unknown'. What should you check?",
    "The image name and tag, since the registry has no image matching that reference; a fully qualified name avoids ambiguity."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
