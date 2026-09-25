/* Lessons for CompTIA Linux+ (XK0-006): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("linux-plus", [
 {
  "t": "Boot process: UEFI/BIOS, GRUB2, kernel, initramfs (dracut, mkinitramfs), systemd targets",
  "body": [
   "Every time a Linux machine powers on, it walks through a predictable chain of hand-offs: firmware, boot loader, kernel, initial RAM filesystem, and finally the init system. Knowing each stage lets you work out where a broken boot stopped and which tool fixes it, which is exactly how Linux+ questions are framed.",
   "The firmware comes first. Older machines use BIOS (Basic Input/Output System), which reads the first sector of the boot disk, the MBR (Master Boot Record), and runs the small piece of boot code stored there. Modern machines use UEFI (Unified Extensible Firmware Interface), which instead reads an ESP (EFI System Partition), a small FAT-formatted partition usually mounted at `/boot/efi`, and runs an EFI executable such as `grubx64.efi` or `shimx64.efi`. UEFI also supports Secure Boot, where the firmware only runs boot loaders signed with trusted keys. You can check which mode you booted in by looking for the `/sys/firmware/efi` directory: if it exists, you booted with UEFI.",
   "Next is the boot loader, almost always GRUB2 (GRand Unified Bootloader version 2). GRUB shows the menu of kernels, loads the chosen kernel image (for example `/boot/vmlinuz-...`) and the matching initramfs into memory, and passes the kernel its command line, such as `root=UUID=...` and `quiet`. You never edit the generated `grub.cfg` directly. Instead, you change `/etc/default/grub` (for example `GRUB_TIMEOUT` or `GRUB_CMDLINE_LINUX`) and regenerate it with `grub2-mkconfig -o /boot/grub2/grub.cfg` on Red Hat-family systems or `update-grub` (a wrapper for `grub-mkconfig`) on Debian-family systems. The `grubby` tool on RHEL-like systems edits kernel arguments per entry.",
   "The kernel then initializes hardware it has built-in drivers for, but it often cannot yet read the real root filesystem, because the driver for the disk controller, LVM, RAID or encryption lives in a module on that very filesystem. The initramfs (initial RAM filesystem) solves this chicken-and-egg problem: it is a compressed archive unpacked into memory that contains just enough modules and scripts to find, unlock and mount the real root. It is rebuilt with `dracut` on Red Hat, Fedora and SUSE (`dracut -f` regenerates the image for the running kernel) and with `mkinitramfs` or `update-initramfs -u` on Debian and Ubuntu. Rebuild it after adding a storage driver or changing root-device settings.",
   "Once root is mounted, the kernel starts PID 1, which on current distributions is systemd. systemd brings the system to a target, a named group of units that replaces the old SysV runlevels. Common ones are `multi-user.target` (text-mode server, like runlevel 3), `graphical.target` (desktop, like runlevel 5), `rescue.target` (single-user with basic services) and `emergency.target` (almost nothing, root filesystem read-only). See the default with `systemctl get-default`, change it with `systemctl set-default multi-user.target`, and switch the running system with `systemctl isolate rescue.target`.",
   "For a one-time change at boot, press `e` at the GRUB menu and add `systemd.unit=rescue.target` (or `emergency.target`) to the line starting with `linux`, then press Ctrl+X to boot. That edit is not saved, which makes it a safe way to recover a system without permanently changing anything."
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
    "systemctl set-default multi-user.target."
   ]
  ]
 },
 {
  "t": "Filesystem Hierarchy Standard: /etc, /var, /usr, /opt, /home, /boot, /proc, /sys, /dev",
  "body": [
   "Linux has one directory tree that starts at `/` (root), and every disk, partition and virtual filesystem is attached somewhere in it. The FHS (Filesystem Hierarchy Standard) describes what belongs where. Because nearly every distribution follows it, knowing the layout tells you where to look for a config file, a log or a device on any system you log into.",
   "`/etc` holds host-specific configuration, almost all of it plain text: `/etc/fstab`, `/etc/passwd`, `/etc/ssh/sshd_config`, `/etc/hosts`. If you want to change how something behaves on this machine, the file is probably under `/etc`. Back it up before large changes. `/var` holds variable data that grows while the system runs: logs in `/var/log`, mail and print spools in `/var/spool`, package caches in `/var/cache`, and application state such as databases in `/var/lib`. A full `/var` is a classic cause of failing services, which is why servers often give it a separate partition.",
   "`/usr` contains the bulk of installed, read-only software and data shared by users: programs in `/usr/bin`, libraries in `/usr/lib`, documentation in `/usr/share`. Software you compile yourself traditionally goes under `/usr/local` so the package manager never overwrites it. On most modern distributions `/bin`, `/sbin` and `/lib` are symbolic links into `/usr` (the 'usr merge'). `/opt` is for add-on software packages that install as a self-contained bundle, such as a vendor application in `/opt/vendorapp`.",
   "`/home` holds users' personal directories, such as `/home/alice`, while the root user's home is `/root`. `/boot` holds what the boot loader needs: kernel images (`vmlinuz-*`), initramfs images, and the GRUB configuration. If `/boot` fills up with old kernels, updates can fail. Other directories worth knowing are `/tmp` for temporary files (often cleared at boot), `/mnt` and `/media` for mount points, `/srv` for data served by the system, and `/run` for runtime data like PID files, which lives in RAM.",
   "Three directories are virtual: they are not on disk at all but are generated by the kernel. `/proc` is the process filesystem: each running process has a numbered directory such as `/proc/1234`, and files like `/proc/cpuinfo`, `/proc/meminfo` and `/proc/sys/...` expose kernel information and tunable parameters. `/sys` (sysfs) presents a structured view of devices, drivers and kernel objects, and it is where udev and tools like `lsblk` get their data. `/dev` contains device files, managed by udev, that represent hardware and pseudo-devices: `/dev/sda` and `/dev/nvme0n1` for disks, `/dev/null` to discard output, `/dev/zero` for a stream of zero bytes, and `/dev/urandom` for random bytes.",
   "A handy habit is `man hier` or `man file-hierarchy`, which describe the layout on your own system. On the exam, expect questions that give you a file type and ask where it lives, or that describe a symptom such as a full disk from log growth and ask which directory to check."
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
  "example": "A web server stops accepting uploads. You run df -h and see that the filesystem mounted at /var is 100 percent full. du -sh /var/* points to /var/log, where an application's debug log has grown to many gigabytes. Rotating and compressing that log frees space and uploads work again.",
  "tip": "Remember that /proc and /sys take no disk space and are rebuilt every boot; exam questions about viewing CPU, memory or kernel parameters usually point to /proc, while device and driver details point to /sys.",
  "check": [
   [
    "Where would you expect to find a program you compiled from source yourself, and why?",
    "Under /usr/local (for example /usr/local/bin), because that area is reserved for locally installed software the package manager will not overwrite."
   ],
   [
    "Which directory holds kernel images and initramfs files?",
    "/boot."
   ],
   [
    "What is /dev/null used for?",
    "It is a device file that discards anything written to it, commonly used to throw away unwanted command output."
   ]
  ]
 },
 {
  "t": "Kernel modules and parameters: lsmod, modprobe, modinfo, /etc/modprobe.d, sysctl",
  "body": [
   "The Linux kernel is modular. Instead of building every driver into one huge image, most drivers and features ship as loadable kernel modules, files ending in `.ko` (sometimes compressed, such as `.ko.xz`) stored under `/lib/modules/$(uname -r)/`. The kernel loads a module when hardware needs it, and an administrator can load, unload, inspect and configure modules without rebooting.",
   "`lsmod` lists the modules currently loaded, with their size and a 'Used by' column showing which other modules depend on them. It simply formats the contents of `/proc/modules`. `modinfo name` shows details about a module file: its path, description, license, author, dependencies and, importantly, the parameters it accepts. That parameter list is how you learn which options you can set.",
   "`modprobe` is the smart tool for loading and removing modules. `modprobe name` loads the module and any modules it depends on, using the dependency map built by `depmod`. `modprobe -r name` removes it along with unused dependencies. You can pass parameters on the command line, as in `modprobe name option=value`. The older `insmod` and `rmmod` commands load or remove a single module file and do not resolve dependencies, which is why modprobe is preferred.",
   "Persistent module configuration lives in files under `/etc/modprobe.d/` ending in `.conf`. An `options` line sets parameters every time the module loads (`options mymodule debug=1`), and a `blacklist` line stops automatic loading by alias (`blacklist nouveau`). Blacklisting does not stop an explicit modprobe; to block that too, admins add an `install name /bin/false` line. To load a module at every boot, list it in a file under `/etc/modules-load.d/`. If the module is needed early in boot, rebuild the initramfs afterwards so the change is included.",
   "Kernel parameters are a separate idea: tunable runtime settings of the kernel itself, exposed as files under `/proc/sys`. The `sysctl` command reads and writes them using dotted names that mirror the path, so `net.ipv4.ip_forward` is `/proc/sys/net/ipv4/ip_forward`. `sysctl -a` lists all of them, `sysctl net.ipv4.ip_forward` shows one, and `sysctl -w net.ipv4.ip_forward=1` changes it immediately, but only until reboot.",
   "To make a sysctl change persistent, put `net.ipv4.ip_forward = 1` in a file such as `/etc/sysctl.d/90-forward.conf` (or in `/etc/sysctl.conf`), then apply it with `sysctl --system` or `sysctl -p file`. Common exam examples are enabling IP forwarding for a router or container host, adjusting `vm.swappiness`, and security hardening settings such as ignoring ICMP redirects. Kernel boot-time arguments, by contrast, are set on the GRUB command line, not with sysctl."
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
    "Blacklist",
    "A modprobe.d directive that prevents a module from being loaded automatically by its alias."
   ],
   [
    "sysctl",
    "A tool to view and set kernel runtime parameters under /proc/sys; persistent values go in /etc/sysctl.d/*.conf."
   ]
  ],
  "example": "You are turning a Linux VM into a router between two subnets. sysctl net.ipv4.ip_forward returns 0, so you run sysctl -w net.ipv4.ip_forward=1 to test, confirm traffic flows, then create /etc/sysctl.d/90-router.conf containing net.ipv4.ip_forward = 1 so the setting survives reboots.",
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
    "/proc/sys/vm/swappiness."
   ]
  ]
 },
 {
  "t": "Files and directories: ls, find, cp, mv, hard vs symbolic links, file, stat",
  "body": [
   "Most day-to-day administration comes down to finding, inspecting, copying and moving files. These commands appear everywhere on the exam, often inside a larger scenario, so it pays to know their most useful options by heart.",
   "`ls` lists directory contents. `ls -l` gives the long format: type and permissions, link count, owner, group, size, modification time and name. `-a` shows hidden 'dot' files, `-h` prints human-readable sizes, `-t` sorts by modification time, `-R` recurses, `-d` lists a directory itself rather than its contents, `-i` shows inode numbers and `-Z` shows SELinux contexts. The first character of the long listing tells you the type: `-` regular file, `d` directory, `l` symbolic link, `b` block device, `c` character device, `p` named pipe, `s` socket.",
   "`find` searches a tree by almost any attribute and can act on the results. Examples: `find /etc -name '*.conf'` (quote wildcards so the shell does not expand them), `find / -type f -size +100M` for big files, `find /home -user alice`, `find /var/log -mtime +30` for files modified more than 30 days ago, and `find / -perm -4000` for SUID files. Add `-exec cmd {} \\;` to run a command on each match or `-delete` to remove matches, carefully. `locate` is faster but searches a prebuilt database updated by `updatedb`, so it can miss new files.",
   "`cp src dest` copies; `-r` copies directories recursively, `-p` preserves mode, ownership and timestamps, `-a` (archive) does recursive copying while preserving everything including links, and `-i` prompts before overwriting. `mv` moves or renames; within the same filesystem it only rewrites the directory entry, so it is instant even for huge files. `rm -r` removes directories, and `mkdir -p` creates parent directories as needed.",
   "Links are a favorite exam topic. Every file's data and metadata are described by an inode, and a directory entry is just a name pointing to an inode. A hard link (`ln target linkname`) is a second name for the same inode: both names are equal, the link count in `ls -l` goes up, and the data survives until the last name is removed. Hard links cannot cross filesystems and normally cannot point to directories. A symbolic (soft) link (`ln -s target linkname`) is a small separate file containing a path. It can cross filesystems and point to directories, but if the target is deleted or moved, the symlink breaks ('dangling').",
   "`file name` identifies content by examining it rather than trusting the extension, for example reporting that `report.pdf` is really an ASCII text file or that a binary is an ELF executable. `stat name` shows full inode metadata: size, blocks, inode number, link count, permissions in octal and symbolic form, owner, and the timestamps: access (atime), modify (mtime, contents changed) and change (ctime, metadata changed). Many systems also report a birth time."
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
   ]
  ],
  "example": "A disk alert fires on a file server. You run find /srv -type f -size +1G -mtime +180 -exec ls -lh {} \\; to list large files untouched for six months, confirm with the owners, then archive them. Along the way, stat on one file shows a link count of 2, telling you a hard link elsewhere still references the same data, so deleting one name alone would not free the space.",
  "tip": "If a question says the link must work across partitions or to a directory, the answer is a symbolic link; if it says the data must remain accessible after the original name is deleted, the answer is a hard link.",
  "check": [
   [
    "What happens to a symbolic link when its target file is deleted?",
    "It becomes a dangling link that points to a path that no longer exists; accessing it fails."
   ],
   [
    "Which find command lists regular files in /var larger than 500 MB?",
    "find /var -type f -size +500M."
   ],
   [
    "Why is mv of a 50 GB file within one filesystem almost instant?",
    "Because it only changes the directory entry pointing to the inode; the data blocks do not move."
   ]
  ]
 },
 {
  "t": "Storage: partitions (fdisk, gdisk, parted), lsblk, blkid, UUIDs, /etc/fstab options (nofail, noexec)",
  "body": [
   "Before a disk can hold files, it is normally divided into partitions, each of which gets a filesystem and a mount point. Linux+ expects you to identify disks, create partitions with the right tool for the partition table type, and mount them reliably at boot.",
   "There are two partition table formats. MBR (Master Boot Record) is the legacy format: it supports up to four primary partitions (or three plus an extended partition containing logical ones) and disks up to about 2 TiB with common 512-byte sectors. GPT (GUID Partition Table) is the modern format used with UEFI: it supports far larger disks, many partitions (128 by default), and keeps a backup copy of the table at the end of the disk. `fdisk` is an interactive tool that today handles both MBR and GPT; `gdisk` is a GPT-focused tool with a similar interface; `parted` handles both and can also be scripted, as in `parted /dev/sdb mklabel gpt` and `parted /dev/sdb mkpart primary ext4 1MiB 100%`. Inside fdisk, `n` creates, `p` prints, `t` changes type, `d` deletes and `w` writes; nothing changes on disk until you write. Afterwards, `partprobe` asks the kernel to reread the table.",
   "`lsblk` shows block devices as a tree: disks, their partitions, LVM volumes and RAID arrays, with size, type and mount point. `lsblk -f` adds filesystem type, label and UUID. `blkid` prints the attributes of each block device, especially its UUID (Universally Unique Identifier) and filesystem TYPE. Device names such as `/dev/sdb1` can change when disks are added or controllers reorder, but a filesystem's UUID stays the same, which is why you should mount by UUID (or LABEL) rather than by device name.",
   "`/etc/fstab` lists filesystems to mount at boot. Each line has six fields: device (`UUID=...`), mount point, filesystem type, options, dump flag (usually 0) and fsck pass order (1 for root, 2 for others, 0 to skip). For example: `UUID=3f2a... /data xfs defaults,nofail 0 2`.",
   "Options matter for both reliability and security. `defaults` means rw, suid, dev, exec, auto, nouser and async. `nofail` tells the boot process not to fail if the device is missing, which keeps a server booting when an external or network disk is absent; without it, a missing device can drop the system to emergency mode. `noexec` prevents running binaries from that filesystem, a common hardening step for `/tmp` or upload directories. `nosuid` ignores SUID/SGID bits, `nodev` ignores device files, `ro` mounts read-only, and `_netdev` marks network filesystems so they wait for the network.",
   "Always test fstab edits before rebooting: `mount -a` tries to mount everything listed, and `findmnt --verify` checks the file for errors. On systemd systems, run `systemctl daemon-reload` after editing fstab so the generated mount units are refreshed."
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
    "Run blkid /dev/sdc1 or lsblk -f."
   ]
  ]
 },
 {
  "t": "LVM (pvcreate, vgextend, lvextend -r) and software RAID with mdadm",
  "body": [
   "Plain partitions are rigid: growing one usually means repartitioning. LVM (Logical Volume Manager) adds a flexible layer between disks and filesystems so you can pool space, grow volumes online and take snapshots. Software RAID (Redundant Array of Independent Disks) with `mdadm` combines disks for redundancy or speed. Both are core Linux+ storage skills.",
   "LVM has three layers. A PV (physical volume) is a disk or partition initialized for LVM with `pvcreate /dev/sdb`. A VG (volume group) pools one or more PVs into a single store of space: `vgcreate vgdata /dev/sdb`. An LV (logical volume) is carved from a VG and behaves like a partition: `lvcreate -n lvweb -L 20G vgdata` creates `/dev/vgdata/lvweb` (also reachable as `/dev/mapper/vgdata-lvweb`). You then put a filesystem on the LV and mount it. The display commands `pvs`, `vgs`, `lvs` give one-line summaries, while `pvdisplay`, `vgdisplay` and `lvdisplay` give detail.",
   "Growing storage is where LVM shines. If the VG has free space, `lvextend -L +10G /dev/vgdata/lvweb` adds 10 GiB to the LV, and `lvextend -l +100%FREE` uses all remaining space. The `-r` (`--resizefs`) option also grows the filesystem in the same step, calling the right tool for ext4 or XFS. Without `-r`, you must grow the filesystem yourself with `resize2fs` or `xfs_growfs`, or the extra space stays unused. If the VG is out of space, add a disk: `pvcreate /dev/sdc` then `vgextend vgdata /dev/sdc`, then extend the LV. Shrinking is riskier: ext4 can be shrunk while unmounted, XFS cannot be shrunk at all. LVM snapshots (`lvcreate -s`) capture a point-in-time view, useful for consistent backups.",
   "Software RAID is built with `mdadm`, which creates `/dev/md` devices. Know the levels: RAID 0 stripes data across disks for speed with no redundancy; RAID 1 mirrors data, surviving one disk failure; RAID 5 stripes with distributed parity, needs at least three disks and survives one failure; RAID 6 uses double parity, needs at least four disks and survives two failures; RAID 10 stripes across mirrored pairs for speed plus redundancy.",
   "Creating a mirror looks like `mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1`. Check status with `cat /proc/mdstat` or `mdadm --detail /dev/md0`. To make the array assemble consistently at boot, save its definition with `mdadm --detail --scan >> /etc/mdadm.conf` (the path is `/etc/mdadm/mdadm.conf` on Debian-family systems). To replace a disk: mark it failed with `--fail`, remove it with `--remove`, then `--add` the new disk and watch the rebuild in `/proc/mdstat`.",
   "RAID and LVM are often stacked: RAID provides redundancy underneath, and LVM provides flexible volumes on top. Remember that neither is a backup; RAID protects against disk failure, not against deletion, corruption or ransomware."
  ],
  "terms": [
   [
    "PV / VG / LV",
    "Physical volume (a disk prepared for LVM), volume group (a pool of PVs) and logical volume (a usable volume carved from the pool)."
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
   ]
  ],
  "example": "The /var/lib/pgsql volume on a database server is at 95 percent. vgs shows no free space in the volume group, so you attach a new virtual disk, run pvcreate /dev/sdd and vgextend vgdb /dev/sdd, then lvextend -r -L +50G /dev/vgdb/lvpg. The XFS filesystem grows online and the database never stops.",
  "tip": "If an LV was extended but df still shows the old size, the filesystem was not resized; the fix is resize2fs (ext4) or xfs_growfs (XFS), or using lvextend -r next time.",
  "check": [
   [
    "Put these in order to add a new disk's space to an existing LV: lvextend, pvcreate, vgextend.",
    "pvcreate the disk, vgextend the volume group with it, then lvextend the logical volume (with -r to grow the filesystem)."
   ],
   [
    "Which RAID level needs at least three disks and survives one disk failure using parity?",
    "RAID 5."
   ],
   [
    "How do you check whether a software RAID array is rebuilding?",
    "cat /proc/mdstat or mdadm --detail /dev/mdN."
   ]
  ]
 },
 {
  "t": "Filesystems: ext4, XFS, Btrfs; mkfs, mount, resize2fs, xfs_growfs; df and du",
  "body": [
   "A filesystem is the on-disk structure that organizes data into files and directories. Linux supports many, but Linux+ focuses on three: ext4, XFS and Btrfs. You need to know how to create each, mount it, grow it, and measure how full it is.",
   "ext4 (fourth extended filesystem) is the long-standing default on Debian and Ubuntu. It is a journaling filesystem, meaning it records pending metadata changes in a journal so it can recover quickly after a crash. It can be grown while mounted and shrunk while unmounted, and it is tuned with `tune2fs` and checked with `e2fsck` (via `fsck`). XFS is the default on RHEL and its relatives. It is also journaling, performs very well with large files and parallel I/O, and can be grown online, but it cannot be shrunk. It is repaired with `xfs_repair`. Btrfs (B-tree filesystem) is a copy-on-write filesystem with built-in features: subvolumes, snapshots, checksums on data and metadata, compression, and its own multi-device RAID modes. It is the default on some distributions, such as openSUSE and Fedora desktop editions, and is managed with the `btrfs` command, for example `btrfs subvolume snapshot`.",
   "You create a filesystem with `mkfs`, which is a front end for type-specific tools: `mkfs.ext4 /dev/vgdata/lvweb`, `mkfs.xfs /dev/sdb1`, `mkfs.btrfs /dev/sdc`, or `mkfs -t ext4 ...`. Adding `-L name` sets a label. Formatting destroys what was on the device, so double-check the target with `lsblk` first.",
   "`mount /dev/sdb1 /data` attaches a filesystem to a directory, and `umount /data` detaches it (note the spelling). `mount -o remount,ro /data` changes options on the fly, and `mount` or `findmnt` with no arguments shows what is mounted. A mount point must exist, and anything already in that directory is hidden while the mount is active. If umount says 'target is busy', a process is using files there; `lsof +D /data` or `fuser -vm /data` shows which one.",
   "Growing is two steps when the underlying device grows: enlarge the partition or LV, then grow the filesystem. For ext4 use `resize2fs /dev/vgdata/lvweb`, which takes the device name. For XFS use `xfs_growfs /data`, which takes the mount point, because XFS must be mounted to grow. `lvextend -r` runs the right one for you.",
   "`df` reports space per mounted filesystem: `df -h` for human-readable sizes, `df -T` to add the type, and `df -i` for inode usage. `du` reports how much space files and directories consume: `du -sh /var/log` for a total, `du -h --max-depth=1 /var | sort -h` to find the largest subdirectory. When the two disagree, for example df says full but du cannot find the files, the usual causes are deleted files still held open by a process, or data hidden underneath a mount point."
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
   ]
  ],
  "example": "A developer asks for more room in /srv/app, an XFS filesystem on LVM. You run lvextend -L +20G /dev/vgapp/lvsrv, then xfs_growfs /srv/app, and df -h /srv/app now shows the extra 20 GiB, all without unmounting or restarting the application.",
  "tip": "Exam items love the XFS shrink trap: XFS cannot be reduced in size, so shrinking requires backing up, recreating the filesystem smaller and restoring.",
  "check": [
   [
    "Which command grows an XFS filesystem mounted at /data after its LV was extended?",
    "xfs_growfs /data."
   ],
   [
    "df shows /home at 100 percent, but du -sh /home reports far less. Name one likely cause.",
    "A deleted file is still held open by a running process, so its space is not released until the process closes it or is restarted."
   ],
   [
    "Which filesystem among ext4, XFS and Btrfs provides built-in snapshots and data checksums?",
    "Btrfs."
   ]
  ]
 },
 {
  "t": "Network configuration: ip, nmcli, netplan, hostnamectl, /etc/hosts, /etc/resolv.conf, nsswitch.conf",
  "body": [
   "A Linux server is only useful if it can talk on the network, so Linux+ expects you to view and change addresses, routes, hostnames and name resolution with the tools found on current distributions. The key idea is that some commands change the running state only, while others write persistent configuration.",
   "The `ip` command from the iproute2 package replaced older tools such as `ifconfig`, `route` and `arp`. `ip addr show` (or `ip a`) lists interfaces and addresses, `ip link set eth0 up` enables an interface, `ip addr add 192.168.10.5/24 dev eth0` adds an address, `ip route show` displays the routing table, `ip route add default via 192.168.10.1` sets a default gateway, and `ip neigh` shows the ARP (Address Resolution Protocol) neighbor cache. Changes made with `ip` take effect immediately but are lost at reboot.",
   "For persistent settings, most RHEL-family and many desktop systems use NetworkManager, controlled with `nmcli`. NetworkManager stores connection profiles, separate from device names. Useful commands: `nmcli device status`, `nmcli connection show`, and a static address change such as `nmcli con mod eth0 ipv4.addresses 192.168.10.5/24 ipv4.gateway 192.168.10.1 ipv4.dns 192.168.10.53 ipv4.method manual`, followed by `nmcli con up eth0` to apply. `nmtui` offers a text menu for the same tasks.",
   "Ubuntu uses netplan: you describe interfaces in YAML (YAML Ain't Markup Language) files under `/etc/netplan/`, and netplan renders them for a backend, either systemd-networkd or NetworkManager. After editing, `netplan try` applies the change and rolls it back automatically unless you confirm, which protects you from locking yourself out of a remote server; `netplan apply` applies it directly. YAML is indentation-sensitive, so a stray tab or misaligned key is a common error.",
   "`hostnamectl` shows and sets the hostname, writing `/etc/hostname`: `hostnamectl set-hostname web01.example.com`. `/etc/hosts` maps names to IP addresses locally, which is useful for small labs or overrides, for example `192.168.10.20 db01`. `/etc/resolv.conf` lists DNS (Domain Name System) servers as `nameserver` lines and a `search` domain list. On many systems this file is generated by NetworkManager or systemd-resolved, so edit the connection profile rather than the file, or your change will be overwritten.",
   "`/etc/nsswitch.conf` (Name Service Switch) decides the order in which sources are consulted. The line `hosts: files dns` means check `/etc/hosts` first, then DNS; a line may also include `myhostname` or `resolve`. The same file controls lookups for users (`passwd:`) and groups, which is how SSSD or LDAP accounts are wired in. If a name resolves differently than you expect, check nsswitch order and /etc/hosts before blaming DNS. Tools such as `getent hosts name` follow nsswitch, while `dig` queries DNS directly."
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
    "hostnamectl set-hostname app02."
   ]
  ]
 },
 {
  "t": "Shell operations: redirection, pipes, environment variables, grep, sed, awk, cut, sort, uniq, tr",
  "body": [
   "The Linux shell's real power comes from combining small tools. Each program reads text, transforms it and writes text, and redirection and pipes connect them. Linux+ performance-based questions often ask you to build or interpret one of these one-liners.",
   "Every process has three standard streams: stdin (file descriptor 0), stdout (1) and stderr (2). `>` redirects stdout to a file, overwriting it; `>>` appends; `<` feeds a file to stdin. `2>` redirects errors, `2>/dev/null` discards them, and `&>` or `> file 2>&1` sends both output and errors to the same file. Order matters: `cmd > out 2>&1` works, while `cmd 2>&1 > out` sends errors to the terminal. A pipe `|` connects one command's stdout to the next command's stdin, and `tee file` copies the stream to a file while passing it on. A here-document (`<<EOF`) feeds inline text as input.",
   "Environment variables carry settings to programs. `NAME=value` sets a shell variable; `export NAME` makes it an environment variable inherited by child processes. `echo $PATH` shows the directory search list for commands, `env` or `printenv` lists the environment, and `unset NAME` removes a variable. Persistent settings go in startup files: `~/.bashrc` for interactive shells, `~/.bash_profile` or `~/.profile` for login shells, and `/etc/profile` or `/etc/profile.d/*.sh` for everyone.",
   "`grep` searches for patterns: `-i` ignores case, `-v` inverts the match, `-r` recurses, `-n` shows line numbers, `-c` counts matches, `-E` enables extended regular expressions, and `-w` matches whole words. `cut` extracts fields or columns: `cut -d: -f1 /etc/passwd` prints usernames. `sort` orders lines (`-n` numeric, `-r` reverse, `-k2` by field 2, `-h` human sizes), and `uniq` collapses adjacent duplicates, which is why it almost always follows `sort`; `uniq -c` counts them. `tr` translates or deletes characters: `tr 'a-z' 'A-Z'` uppercases, `tr -d '\\r'` strips Windows carriage returns, `tr -s ' '` squeezes repeated spaces.",
   "`sed` is a stream editor. The most common use is substitution: `sed 's/old/new/g' file` prints the file with every match replaced, and `sed -i 's/old/new/g' file` edits it in place. `sed -n '5,10p'` prints lines 5 to 10, and `sed '/^#/d'` deletes comment lines. `awk` processes records field by field, splitting on whitespace by default: `awk '{print $1}'` prints the first field, `awk -F: '$3 >= 1000 {print $1}' /etc/passwd` lists regular users, and `awk '{sum += $5} END {print sum}'` totals a column.",
   "Here is a classic combined pipeline, counting the most frequent client IPs in a web log:",
   "```bash\nawk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -5\n```"
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
    "sed",
    "A stream editor used mainly for search-and-replace and line filtering; -i edits files in place."
   ],
   [
    "awk",
    "A pattern-scanning language that splits lines into fields ($1, $2 ...) for filtering and reporting."
   ]
  ],
  "example": "You need a list of every account that uses bash as its shell. Running grep '/bin/bash$' /etc/passwd | cut -d: -f1 | sort prints the usernames alphabetically, and adding > bash-users.txt 2>/dev/null saves the list while discarding any errors.",
  "tip": "uniq only removes adjacent duplicates, so answers that pipe unsorted data into uniq -c are usually wrong; look for sort before uniq.",
  "check": [
   [
    "How do you send both stdout and stderr of a backup script to backup.log, appending?",
    "backup.sh >> backup.log 2>&1 (or backup.sh &>> backup.log in bash)."
   ],
   [
    "What does sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config do?",
    "It edits the file in place, replacing the first occurrence on each line of 'PermitRootLogin yes' with 'PermitRootLogin no'."
   ],
   [
    "Which command prints only the first field of /etc/group using a colon delimiter?",
    "cut -d: -f1 /etc/group (or awk -F: '{print $1}' /etc/group)."
   ]
  ]
 },
 {
  "t": "Backup and restore: tar, gzip/xz/bzip2, rsync, dd, cpio",
  "body": [
   "Backups are only useful if you can restore from them, so it helps to understand what each tool captures and how to get the data back. Linux+ tests the classic command-line tools and their key options, and expects you to pick the right one for a scenario.",
   "`tar` (tape archive) bundles files and directories into a single archive while preserving paths, permissions and ownership. The core modes are `-c` create, `-x` extract and `-t` list contents, with `-f` naming the archive file and `-v` for verbose output. Compression is added with a flag: `-z` for gzip (`.tar.gz` or `.tgz`), `-j` for bzip2 (`.tar.bz2`) and `-J` for xz (`.tar.xz`). So `tar -czvf etc-backup.tar.gz /etc` creates a compressed backup, `tar -tzf etc-backup.tar.gz` lists it, and `tar -xzvf etc-backup.tar.gz -C /restore` extracts into a chosen directory. When you extract as root, tar restores the stored permissions and ownership by default; an ordinary user can add `-p` to keep the stored permissions instead of applying their umask.",
   "The compressors also work alone on single files. `gzip file` produces `file.gz` and removes the original; `gunzip` or `gzip -d` reverses it. `bzip2` usually compresses smaller but slower, and `xz` usually gives the smallest output at the cost of more CPU time and memory. Each has a matching tool to read compressed text without extracting: `zcat`, `bzcat`, `xzcat`. The general trade-off to remember is gzip fastest, xz smallest.",
   "`rsync` synchronizes files between directories or hosts, copying only what changed, which makes it ideal for repeated backups. `rsync -av /srv/ backup01:/backups/srv/` copies in archive mode (recursive, preserving permissions, times, links and ownership) over SSH. `--delete` removes files at the destination that no longer exist at the source, making an exact mirror, and `-n` (`--dry-run`) shows what would happen. A trailing slash on the source means 'copy the contents of this directory' rather than the directory itself, a detail that often appears on exams.",
   "`dd` copies raw blocks, ignoring filesystems entirely. `dd if=/dev/sda of=/backup/sda.img bs=4M status=progress` images a whole disk, and swapping `if` and `of` restores it. It is also used to write installation images to USB drives. Because it overwrites the output device without asking, confirm device names with `lsblk` first. Images of mounted, changing filesystems may be inconsistent, so image unmounted or snapshotted devices.",
   "`cpio` (copy in, copy out) is an older archiver that reads the list of files to archive from stdin, so it pairs naturally with `find`: `find /etc | cpio -ov > etc.cpio` creates an archive and `cpio -idv < etc.cpio` extracts it. You still meet it because initramfs images and RPM package payloads use cpio format.",
   "Whatever the tool, follow basic backup practice: keep more than one copy, store at least one away from the original system, and test restores regularly."
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
   ]
  ],
  "example": "Each night a cron job runs rsync -a --delete /var/www/ backup01:/backups/www/ so the backup server holds an exact mirror, and once a week tar -cJf /archive/www-$(date +%F).tar.xz /var/www creates a compressed point-in-time archive. When a developer deletes a directory by mistake, you restore it from last night's rsync copy within minutes.",
  "tip": "Match the tar letters carefully: z is gzip, j is bzip2, J is xz; and c, x and t are create, extract and list.",
  "check": [
   [
    "Which command lists the contents of backup.tar.bz2 without extracting it?",
    "tar -tjf backup.tar.bz2."
   ],
   [
    "What is the difference between rsync -a /data/ dest/ and rsync -a /data dest/?",
    "With the trailing slash the contents of /data are copied into dest; without it the directory data itself is created inside dest."
   ],
   [
    "Why is dd risky, and how do you reduce the risk?",
    "It overwrites the output device without confirmation; verify device names with lsblk and double-check if= and of= before running it."
   ]
  ]
 },
 {
  "t": "Virtualization: KVM/QEMU, libvirt and virsh, virt-install, qcow2 vs raw images",
  "body": [
   "Virtualization lets one physical host run several isolated operating systems, called guests or VMs (virtual machines). On Linux the standard open-source stack is KVM, QEMU and libvirt. Linux+ expects you to know what each layer does, manage guests from the command line and choose a disk image format.",
   "KVM (Kernel-based Virtual Machine) is a set of kernel modules (`kvm` plus `kvm_intel` or `kvm_amd`) that turns Linux into a type 1 hypervisor by using the CPU's hardware virtualization extensions, Intel VT-x or AMD-V. You can check for support with `grep -E 'vmx|svm' /proc/cpuinfo` and confirm the modules with `lsmod | grep kvm`; if the extensions are disabled in firmware, KVM cannot run. QEMU (Quick Emulator) provides the rest of the virtual machine: emulated or paravirtualized devices such as disks, network cards and graphics. With KVM underneath, QEMU runs guest code directly on the CPU at near-native speed. Paravirtualized virtio drivers for disk and network give the best guest performance.",
   "libvirt is a management layer with a daemon and API that controls QEMU/KVM (and other hypervisors) consistently. It stores each guest's configuration as XML, manages virtual networks such as the default NAT (Network Address Translation) network `virbr0`, and manages storage pools. Tools on top include `virsh` (command line), `virt-manager` (graphical) and `virt-install` (guest creation).",
   "Useful `virsh` commands: `virsh list --all` shows running and stopped guests, `virsh start web01`, `virsh shutdown web01` (a graceful ACPI shutdown request), `virsh destroy web01` (an immediate power-off that does not delete anything, despite the name), `virsh reboot`, `virsh autostart web01` to start with the host, `virsh dumpxml web01` to view the configuration, `virsh edit web01` to change it safely, and `virsh console web01` for a serial console. `virsh undefine` removes the guest's definition. `virsh snapshot-create-as` creates snapshots.",
   "`virt-install` creates a guest in one command, for example: `virt-install --name web01 --memory 2048 --vcpus 2 --disk size=20 --cdrom /isos/installer.iso --os-variant <variant> --network network=default`. `osinfo-query os` lists valid variant names.",
   "Disk images come in two main formats. Raw is a plain byte-for-byte image: simple, fast and portable, but without features; it may be allocated fully or as a sparse file. qcow2 (QEMU copy-on-write version 2) is thin-provisioned so it grows as data is written, and supports internal snapshots, backing files (a thin overlay on a shared base image) and compression, with a small performance cost. `qemu-img create -f qcow2 disk.qcow2 20G` creates one, `qemu-img info` shows format and actual size, and `qemu-img convert -f raw -O qcow2 in.img out.qcow2` converts between formats. Choose qcow2 for flexibility and snapshots; choose raw when maximum simplicity or performance matters."
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
    "virtio",
    "Paravirtualized device drivers that give guests fast disk and network I/O."
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
    "qcow2."
   ],
   [
    "Which virsh command makes a guest start automatically when the host boots?",
    "virsh autostart <guest>."
   ]
  ]
 },
 {
  "t": "Local accounts and groups: useradd, usermod -aG, userdel, groupadd, passwd, chage",
  "body": [
   "Every process on Linux runs as some user, and access to files and commands follows from that user and its groups. Creating and maintaining local accounts is basic admin work and a steady source of Linux+ questions, especially around options that are easy to mix up.",
   "`useradd` creates an account. Useful options: `-m` creates the home directory (copying files from `/etc/skel`), `-d` sets a custom home path, `-s /bin/bash` sets the login shell, `-c 'Full Name'` sets the comment (GECOS) field, `-u` sets a specific UID (user ID), `-g` sets the primary group and `-G` sets supplementary groups. Whether the home directory is created by default depends on `/etc/login.defs` (`CREATE_HOME`), which differs between distributions, so passing `-m` is the safe habit. Debian-family systems also have `adduser`, a friendlier interactive wrapper. System accounts for services are created with `useradd -r`, which gives them a low UID and typically no home or login shell.",
   "`passwd alice` sets or changes a user's password; run by a normal user, `passwd` changes their own. `passwd -l` locks an account by prefixing the stored hash with `!`, `passwd -u` unlocks it, and `passwd -S` shows status. Note that locking the password does not block SSH key logins; to fully disable an account, also expire it or set its shell to `/sbin/nologin`.",
   "`usermod` changes an existing account. The most tested detail is group membership: `usermod -aG wheel alice` appends alice to the wheel group. Without `-a`, `-G` replaces the full list of supplementary groups, silently removing her from any group not listed. Other options: `-s` changes the shell, `-L`/`-U` lock and unlock, `-l` renames the login, `-d -m` moves the home directory, and `-e YYYY-MM-DD` sets an account expiry date. Group changes take effect at the user's next login; `id alice` or `groups alice` confirms membership.",
   "`userdel alice` removes the account but leaves her files; `userdel -r alice` also removes the home directory and mail spool. Before deleting, consider finding files she owns elsewhere with `find / -user alice`, since leftover files will show a bare UID and could be inherited by a future user who receives that UID.",
   "Groups are managed with `groupadd devs`, `groupmod -n` to rename, `groupdel` to delete and `gpasswd -a user group` or `gpasswd -d user group` to add or remove members. Each user has one primary group (used for new files) and any number of supplementary groups (used for access).",
   "`chage` manages password aging. `chage -l alice` lists the policy, `-M 90` sets maximum days between changes, `-m 1` minimum days, `-W 7` warning days, `-E 2026-12-31` an account expiration date, and `-d 0` forces a password change at next login, which is common when handing a new user a temporary password."
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
    "userdel -r carol."
   ],
   [
    "After usermod -aG sudo dave, dave still cannot use sudo in his current session. Why?",
    "Group membership is read at login, so he must log out and back in (or start a new login session) for the new group to apply."
   ]
  ]
 },
 {
  "t": "Account files: /etc/passwd, /etc/shadow, /etc/group, /etc/skel, /etc/login.defs",
  "body": [
   "The account commands you learned all read and write a handful of plain-text files. Knowing their formats lets you audit accounts quickly, spot misconfigurations and answer exam questions that show you a raw line and ask what it means.",
   "`/etc/passwd` holds one line per account with seven colon-separated fields: username, password placeholder, UID, GID (primary group), GECOS comment, home directory and login shell. For example, `alice:x:1001:1001:Alice Ng:/home/alice:/bin/bash`. The `x` means the real password hash is stored in `/etc/shadow`. The file must be world-readable, because many programs map UIDs to names, which is exactly why hashes were moved out of it. UID 0 is root; system accounts use low UIDs, and regular users start at a threshold set in `/etc/login.defs` (commonly 1000). A shell of `/sbin/nologin` or `/usr/sbin/nologin` prevents interactive logins for service accounts.",
   "`/etc/shadow` stores password hashes and aging data, readable only by root. Its nine fields are: username, hashed password, date of last change (in days since January 1, 1970), minimum days, maximum days, warning days, inactive days, account expiration date and a reserved field. The hash field begins with an identifier of the algorithm, such as `$6$` for SHA-512 crypt or `$y$` for yescrypt, followed by the salt and hash. A leading `!` or `*` means the password is locked or no password login is possible, and an empty field means no password at all, which is a serious security finding. The aging fields are what `chage` edits.",
   "`/etc/group` has four fields: group name, password placeholder, GID and a comma-separated list of supplementary members, for example `devs:x:1050:alice,priya`. A user's primary group is not listed here; it comes from the GID field in /etc/passwd. `/etc/gshadow` holds group passwords and administrators and is rarely used directly.",
   "Edit these files through commands (`useradd`, `usermod`, `chage`) whenever possible. If you must edit by hand, use `vipw` for passwd and `vigr` for group (with `-s` for the shadow versions), which lock the files and check syntax; `pwck` and `grpck` verify consistency. `getent passwd alice` queries accounts through nsswitch, so it also shows users from LDAP or SSSD that are not in the local files.",
   "`/etc/skel` is the skeleton directory: its contents, typically `.bashrc`, `.bash_profile` and similar dot files, are copied into each new home directory created with `useradd -m`. Put default settings for new users there, knowing that existing users will not receive later changes.",
   "`/etc/login.defs` sets site-wide defaults for account tools: UID and GID ranges (`UID_MIN`, `UID_MAX`), default password aging (`PASS_MAX_DAYS`, `PASS_MIN_DAYS`, `PASS_WARN_AGE`), whether to create home directories, the default umask and the hashing method (`ENCRYPT_METHOD`). These defaults apply when accounts are created, so changing `PASS_MAX_DAYS` does not alter existing users; use chage for those. `useradd -D` shows other creation defaults stored in `/etc/default/useradd`."
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
   ]
  ]
 },
 {
  "t": "systemd units: systemctl start/stop/enable/mask, status output, drop-in overrides with systemctl edit",
  "body": [
   "systemd manages almost everything that runs on a modern Linux system through units. A unit is a configuration object of a certain type, named by suffix: `.service` for daemons, `.socket` for socket activation, `.timer` for scheduled jobs, `.mount` for mounts, `.target` for groups of units, and more. `systemctl` is the tool you use to control them.",
   "The basic lifecycle commands act on the running system: `systemctl start httpd`, `stop`, `restart` (stop then start), and `reload` (ask the service to reread its config without stopping, if it supports that). Boot-time behavior is separate: `systemctl enable httpd` creates symlinks so the unit starts at boot in its target, and `disable` removes them. The two are independent, which is why `systemctl enable --now httpd` exists to do both at once. `systemctl is-active` and `is-enabled` answer each question in scripts.",
   "`mask` goes further than disable. `systemctl mask httpd` links the unit file to `/dev/null`, so it cannot be started at all, whether manually or as a dependency of another unit, until you `unmask` it. Use it when a service must never run, for example to stop a conflicting service being pulled in.",
   "`systemctl status httpd` is your first diagnostic. It shows the Loaded line (unit file path, and whether it is enabled or disabled), the Active line (active (running), inactive (dead), failed, with a timestamp), the main PID, the cgroup (control group) of processes, and the last few journal lines. A failed unit also shows the exit code or signal, such as `status=203/EXEC` meaning the executable could not be run. `systemctl --failed` lists all failed units, and `systemctl list-units --type=service` lists active services.",
   "Unit files live in three places, in order of precedence: `/etc/systemd/system/` (administrator), `/run/systemd/system/` (runtime), and `/usr/lib/systemd/system/` or `/lib/systemd/system/` (installed by packages). Never edit package-supplied files directly, because updates overwrite them. Instead create a drop-in override with `systemctl edit httpd`, which opens an editor and saves your changes to `/etc/systemd/system/httpd.service.d/override.conf`. Only the settings you list are overridden. For example:",
   "```ini\n[Service]\nRestart=on-failure\nRestartSec=5\nLimitNOFILE=65536\n```",
   "`systemctl edit --full httpd` copies the whole unit to /etc for complete replacement, and `systemctl cat httpd` shows the unit plus all drop-ins. One subtlety: list-type settings like `ExecStart=` must first be cleared with an empty `ExecStart=` line before a new value is set in a drop-in. After editing unit files by hand, run `systemctl daemon-reload` so systemd rereads them; `systemctl edit` does this for you. A typical service section contains `ExecStart=`, `User=`, `Restart=`, and an `[Install]` section with `WantedBy=multi-user.target`, which is what enable uses."
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
   ]
  ],
  "example": "An internal API service crashes occasionally and stays down. Instead of editing the vendor's unit in /usr/lib/systemd/system, you run systemctl edit api.service, add Restart=on-failure and RestartSec=5 under [Service], save, and restart the service. systemctl cat api.service now shows the override, and the next crash triggers an automatic restart.",
  "tip": "Know the difference in strength: stop affects now, disable affects boot, and mask blocks the unit entirely until unmasked.",
  "check": [
   [
    "A service runs now but is not running after reboot. Which command fixes that?",
    "systemctl enable <service> (or enable --now to also start it)."
   ],
   [
    "Where does systemctl edit nginx save its changes?",
    "In /etc/systemd/system/nginx.service.d/override.conf."
   ],
   [
    "What must you run after manually editing a unit file in /etc/systemd/system?",
    "systemctl daemon-reload, then restart the unit if needed."
   ]
  ]
 },
 {
  "t": "Scheduling: cron and crontab syntax, at, systemd timers (OnCalendar)",
  "body": [
   "Administrators automate recurring and one-off jobs so that backups, cleanups and reports happen without anyone logged in. Linux offers three mechanisms: cron for recurring jobs, at for single future jobs, and systemd timers as the modern alternative to cron. The exam checks that you can read and write their time expressions.",
   "A crontab line has five time fields followed by the command: minute (0-59), hour (0-23), day of month (1-31), month (1-12) and day of week (0-7, where 0 and 7 are both Sunday). An asterisk means every value, a comma separates a list (`1,15`), a hyphen gives a range (`1-5`), and a slash gives a step (`*/10` means every tenth value). So `30 2 * * 1-5 /usr/local/bin/backup.sh` runs at 02:30 Monday through Friday, and `*/15 * * * *` runs every 15 minutes. Shortcuts such as `@reboot`, `@daily` and `@hourly` also exist.",
   "Users manage their own table with `crontab -e` (edit), `crontab -l` (list) and `crontab -r` (remove all, so be careful); root can use `crontab -u alice -e`. System-wide jobs go in `/etc/crontab` or files in `/etc/cron.d/`, which have an extra sixth field naming the user to run as. Scripts dropped into `/etc/cron.hourly`, `cron.daily`, `cron.weekly` and `cron.monthly` run on those schedules. Access can be restricted with `/etc/cron.allow` and `/etc/cron.deny`. Cron runs jobs with a minimal environment, so use full paths to commands and redirect output to a log, or the job may fail silently.",
   "`at` runs a command once at a set time. `at 22:00` or `at now + 30 minutes` opens a prompt where you type commands and finish with Ctrl+D. `atq` lists pending jobs, `atrm` removes one by number, and the `atd` service must be running. `batch` is similar but waits until system load is low. Access is controlled with `/etc/at.allow` and `/etc/at.deny`.",
   "systemd timers pair a `.timer` unit with a `.service` unit of the same name. The timer decides when; the service defines what runs. `OnCalendar=` sets wall-clock schedules using the form `DayOfWeek Year-Month-Day Hour:Minute:Second`, for example `OnCalendar=Mon..Fri *-*-* 02:30:00`, or shortcuts like `daily` and `weekly`. Monotonic timers use relative times such as `OnBootSec=10min` or `OnUnitActiveSec=1h`. `Persistent=true` runs a missed job at the next boot if the machine was off when it was due. Test an expression with `systemd-analyze calendar 'Mon..Fri 02:30'`.",
   "```ini\n# /etc/systemd/system/backup.timer\n[Timer]\nOnCalendar=*-*-* 02:30:00\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n```",
   "Enable it with `systemctl enable --now backup.timer` (the timer, not the service), and list timers with `systemctl list-timers`. Advantages over cron include logging in the journal, dependency handling and resource controls."
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
    "systemctl list-timers."
   ],
   [
    "How do you schedule a one-time reboot at 23:00 tonight?",
    "echo 'systemctl reboot' | at 23:00 (or use at 23:00 and type the command), with atd running."
   ]
  ]
 },
 {
  "t": "Processes and jobs: ps, top, kill signals, nice/renice, bg/fg/jobs, nohup",
  "body": [
   "A process is a running instance of a program, identified by a PID (process ID) and owned by a user. Monitoring and controlling processes is how you deal with runaway programs, prioritize work and keep long tasks running. Linux+ questions often give you ps or top output and ask what to do next.",
   "`ps` takes a snapshot. `ps aux` (BSD style) shows every process with user, PID, %CPU, %MEM, VSZ and RSS memory, TTY, state, start time and command; `ps -ef` (System V style) shows UID, PID, PPID (parent PID) and command. `ps -ef --forest` or `pstree` shows parent-child relationships. The STAT column shows state: R running, S sleeping, D uninterruptible sleep (usually waiting on I/O), T stopped and Z zombie, a finished process whose parent has not collected its exit status. `pgrep nginx` finds PIDs by name.",
   "`top` gives a live view sorted by CPU. Its header shows uptime, load average, task counts, CPU breakdown (including `wa` for I/O wait) and memory. Inside top, press `M` to sort by memory, `P` for CPU, `k` to kill a PID and `r` to renice, and `q` to quit. `htop` is a friendlier alternative when installed.",
   "Signals are messages sent to processes. `kill PID` sends SIGTERM (15), a polite request to exit that lets the program clean up. `kill -9 PID` sends SIGKILL (9), which the process cannot catch; use it only when SIGTERM fails, because data may be lost. `kill -HUP PID` sends SIGHUP (1), which many daemons interpret as 'reload your configuration'. SIGINT (2) is what Ctrl+C sends, and SIGSTOP/SIGTSTP pause a process (Ctrl+Z sends SIGTSTP) while SIGCONT resumes it. `killall name` and `pkill pattern` signal by name. `kill -l` lists all signals.",
   "Scheduling priority is set by the nice value, from -20 (highest priority) to 19 (lowest), default 0. `nice -n 10 command` starts a program with lower priority; `renice -n 5 -p PID` changes a running one. Ordinary users can only make their processes nicer (raise the number); only root can lower it to raise priority. The PR and NI columns in top show the effect.",
   "Job control manages processes started from your shell. Append `&` to run a command in the background. Ctrl+Z suspends the foreground job, `bg` resumes it in the background, `fg` brings it back to the foreground, and `jobs` lists jobs with numbers you can reference as `%1`. Background jobs still belong to your terminal, so logging out sends them SIGHUP and they usually die. `nohup command &` makes the process ignore SIGHUP and writes output to `nohup.out`, so it survives logout. `disown` removes a job from the shell's table, and tools like `tmux` or `screen`, or running the task as a systemd unit, are more robust alternatives for long jobs."
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
    "SIGHUP (signal 1)."
   ],
   [
    "You pressed Ctrl+Z on a long copy. How do you let it continue in the background?",
    "Run bg (or bg %1) to resume the stopped job in the background."
   ],
   [
    "Can a regular user run renice -n -5 on their own process?",
    "No; only root can decrease a nice value (raise priority). Users can only increase it."
   ]
  ]
 },
 {
  "t": "Package management: dnf/rpm, apt/dpkg, repositories, provides and file ownership queries",
  "body": [
   "Linux software is installed as packages: archives that contain files plus metadata such as version, dependencies and install scripts. Two families dominate. Red Hat, Fedora, Rocky, Alma and SUSE use RPM (RPM Package Manager) packages, and Debian and Ubuntu use .deb packages. Each family has a low-level tool that works on individual package files and a high-level tool that talks to repositories and resolves dependencies.",
   "On RPM systems, `rpm` is the low-level tool. `rpm -ivh file.rpm` installs, `rpm -Uvh` upgrades, `rpm -e name` erases, `rpm -qa` lists all installed packages, `rpm -qi name` shows info, `rpm -ql name` lists a package's files, `rpm -qf /path/file` tells you which package owns a file, and `rpm -V name` verifies installed files against the package database, reporting changed sizes, permissions or checksums. rpm does not fetch dependencies, which is why `dnf` (the successor to yum) is used day to day: `dnf install`, `dnf remove`, `dnf update` (or `upgrade`), `dnf search`, `dnf info`, `dnf list installed` and `dnf history` (with `dnf history undo` to reverse a transaction).",
   "On Debian systems, `dpkg` is the low-level tool: `dpkg -i file.deb` installs, `dpkg -r` removes (`-P` purges including config files), `dpkg -l` lists packages, `dpkg -L name` lists a package's files, and `dpkg -S /path/file` finds the owning package. `apt` is the high-level tool: `apt update` refreshes the package lists (it does not upgrade anything), `apt upgrade` installs newer versions, `apt full-upgrade` also allows removals to resolve dependency changes, `apt install`, `apt remove`, `apt purge`, `apt autoremove`, `apt search` and `apt show`. The older `apt-get` and `apt-cache` commands still work and are common in scripts.",
   "Repositories are the servers that hold packages and their metadata. On RPM systems they are defined in `.repo` files under `/etc/yum.repos.d/`, with lines such as `baseurl=`, `enabled=1` and `gpgcheck=1`; `dnf repolist` shows them and `dnf config-manager` can add or enable them. On Debian systems they are listed in `/etc/apt/sources.list` and files under `/etc/apt/sources.list.d/` (newer releases use a deb822 `.sources` format). Packages are signed with GPG (GNU Privacy Guard) keys, and leaving signature checking enabled is an important security control against tampered software.",
   "Two query types are heavily tested. A file ownership query asks which installed package a file came from: `rpm -qf /etc/ssh/sshd_config` or `dpkg -S /usr/bin/ssh`. A provides query asks which package, installed or not, would supply a file or command: `dnf provides '*/bin/dig'` (or `dnf whatprovides`) on RPM systems, and `apt-file search bin/dig` on Debian systems after installing and updating `apt-file`. Use the first to investigate an existing file and the second to find what to install."
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
   ]
  ],
  "example": "A minimal Rocky Linux server lacks the dig command. dnf provides '*/bin/dig' shows it comes from the bind-utils package, so you run dnf install bind-utils. Later, while auditing a changed config file, rpm -qf /etc/named.conf shows it belongs to the bind package and rpm -V bind reports that its checksum differs from the original.",
  "tip": "apt update only refreshes package lists; apt upgrade actually installs newer versions. Many wrong answers confuse the two.",
  "check": [
   [
    "Which command shows which package installed /usr/bin/curl on Ubuntu?",
    "dpkg -S /usr/bin/curl."
   ],
   [
    "Why would you use dnf install ./pkg.rpm rather than rpm -ivh pkg.rpm?",
    "dnf resolves and installs any dependencies from the configured repositories, while rpm fails if dependencies are missing."
   ],
   [
    "What does gpgcheck=1 in a .repo file do?",
    "It requires packages from that repository to have valid GPG signatures before they are installed."
   ]
  ]
 },
 {
  "t": "Source and language packages: make, pip, sandboxed packages (Flatpak, Snap)",
  "body": [
   "Not all software arrives through your distribution's repositories. Sometimes you build from source, install a library with a language package manager, or use a sandboxed universal package. Each approach has trade-offs in updates, security and tidiness, and Linux+ expects you to know how each works and when to prefer it.",
   "Building from source typically follows three steps. First, `./configure` (generated by GNU Autotools) checks for compilers and libraries and writes a Makefile; options such as `--prefix=/usr/local` choose the install location. Second, `make` reads the Makefile and compiles the code. Third, `make install`, usually run with sudo, copies the results into place. You need build tools first, installed as a group: `dnf groupinstall 'Development Tools'` on RHEL-family systems or `apt install build-essential` on Debian-family systems, plus the `-devel` or `-dev` header packages for any libraries the software uses. Projects may use other build systems such as CMake or Meson, but the idea is the same.",
   "The drawback is that the package manager knows nothing about software installed this way: no automatic security updates, no clean uninstall (some projects offer `make uninstall`), and possible conflicts with packaged files. Installing under `/usr/local` or `/opt` limits the damage, and verifying the source's checksum or signature before building protects against tampered downloads.",
   "Language ecosystems have their own managers: `pip` for Python, `npm` for JavaScript, `gem` for Ruby, `cargo` for Rust. With pip, `pip install requests` installs a package, `pip install -r requirements.txt` installs a pinned list, `pip list` and `pip show` inspect, and `pip uninstall` removes. Installing into the system Python with sudo can break tools the operating system depends on, and many current distributions now refuse this by marking the system environment as externally managed. The safe practice is a virtual environment: `python3 -m venv venv`, `source venv/bin/activate`, then pip installs only into that project. `pip install --user` is an alternative for per-user tools.",
   "Sandboxed universal packages bundle an application with its dependencies so one package runs on many distributions, isolated from the rest of the system. Flatpak is aimed mainly at desktop applications. It installs from remotes such as Flathub: `flatpak remote-add`, `flatpak install flathub <app-id>`, `flatpak run <app-id>`, `flatpak update`, and permissions can be adjusted with `flatpak override`. Snap, developed by Canonical and standard on Ubuntu, runs as the `snapd` service and handles both desktop and server software: `snap install name`, `snap list`, `snap refresh` (snaps also refresh automatically), `snap remove`. Snaps run under confinement modes, with `strict` confining the app and `classic` giving it normal system access.",
   "The trade-off with sandboxed packages is larger disk use and a separate update channel, in exchange for newer versions and isolation. For servers, prefer distribution packages where possible because they receive coordinated security updates."
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
    "snapd."
   ]
  ]
 },
 {
  "t": "Containers: podman/docker run, images, port publishing, volumes, logs, inspect",
  "body": [
   "A container is a process, or group of processes, that runs isolated from the rest of the system while sharing the host's kernel. Isolation comes from kernel namespaces (separate views of processes, network, mounts and hostnames) and cgroups (control groups, which limit CPU and memory). Because there is no guest operating system to boot, containers start in seconds and use far fewer resources than virtual machines. Linux+ expects you to run and manage them with Docker or Podman.",
   "Docker uses a background daemon, `dockerd`, that runs containers on your behalf, and membership in the `docker` group is effectively root-equivalent. Podman, the default on RHEL-family systems, is daemonless and can run rootless containers as an ordinary user, reducing risk. Their command-line syntax is almost identical, so `podman run` and `docker run` accept the same common options.",
   "An image is a read-only template built in layers, identified by a name and tag such as `registry.example.com/team/web:1.4`; if no tag is given, `latest` is assumed. `podman pull nginx` downloads an image from a registry, `podman images` lists local images, `podman rmi` removes one, and `podman build -t myapp:1.0 .` builds one from a Containerfile or Dockerfile. A container is a running (or stopped) instance of an image with a thin writable layer on top; `podman ps` lists running containers and `podman ps -a` includes stopped ones.",
   "`podman run` creates and starts a container. Key options: `-d` runs it detached in the background, `--name web` names it, `-it` gives an interactive terminal, `--rm` deletes it on exit, and `-e KEY=value` sets environment variables. Port publishing uses `-p hostport:containerport`, so `-p 8080:80` makes the container's port 80 reachable on the host's port 8080. Without `-p`, services inside the container are not reachable from outside the host. Rootless containers cannot bind host ports below 1024 by default.",
   "Anything written inside a container's writable layer disappears when the container is removed. For persistent data use volumes: `-v webdata:/usr/share/nginx/html` uses a named volume managed by the engine (`podman volume ls`), while `-v /srv/site:/usr/share/nginx/html:Z` bind-mounts a host directory. On SELinux systems the `:Z` or `:z` suffix relabels the directory so the container may access it; without it you get permission denied errors.",
   "For troubleshooting, `podman logs web` shows what the container wrote to stdout and stderr (`-f` follows), `podman exec -it web /bin/sh` opens a shell inside a running container, `podman inspect web` prints detailed JSON (JavaScript Object Notation) about configuration, mounts, network settings and state, and `podman port web` shows published ports. `podman stop`, `start`, `restart` and `rm` manage the lifecycle, and `podman stats` shows live resource use.",
   "```bash\npodman run -d --name web -p 8080:80 -v webdata:/usr/share/nginx/html nginx:stable\npodman logs -f web\n```"
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
  "example": "A team needs a quick internal wiki. You run podman run -d --name wiki -p 8081:3000 -v wikidata:/data docker.io/<image>:<tag> as a regular user. Colleagues reach it on port 8081; when the image is updated, you remove the container and recreate it from the new image, and the pages survive because they live in the wikidata volume.",
  "tip": "Read -p mappings as host:container. A question showing -p 8443:443 means clients connect to the host on 8443 to reach the container's 443.",
  "check": [
   [
    "What happens to data written inside a container without a volume when the container is removed?",
    "It is lost, because it lives only in the container's writable layer."
   ],
   [
    "Which command shows a container's IP address, mounts and environment in detail?",
    "podman inspect <container> (or docker inspect)."
   ],
   [
    "Name one security advantage Podman has over a default Docker setup.",
    "It is daemonless and can run containers rootless as an ordinary user, whereas Docker group membership effectively grants root."
   ]
  ]
 },
 {
  "t": "Container orchestration concepts: Kubernetes pods, deployments, services",
  "body": [
   "Running a few containers by hand works for one host, but production applications need many containers across many machines, restarted when they fail, scaled with demand and updated without downtime. Container orchestration automates this, and Kubernetes (often written K8s) is the dominant orchestrator. Linux+ tests the core concepts rather than deep cluster administration.",
   "A Kubernetes cluster has a control plane and worker nodes. The control plane includes the API server (everything talks to it), etcd (a key-value store holding cluster state), the scheduler (chooses which node runs each workload) and controller managers (keep reality matching the desired state). Each worker node runs a kubelet agent, a container runtime such as containerd or CRI-O, and kube-proxy for service networking. You interact with the cluster through `kubectl`.",
   "Kubernetes is declarative: you describe the desired state in YAML manifests and apply them with `kubectl apply -f file.yaml`, and controllers continually work to make the cluster match. This is different from imperatively running commands one at a time, and it is why Kubernetes pairs well with Git-based workflows.",
   "The pod is the smallest deployable unit: one or more containers that share a network namespace (one IP address, so they talk over localhost) and can share volumes. Most pods hold a single application container, sometimes with a helper 'sidecar'. Pods are disposable; when one dies, it is replaced by a new pod with a new IP, not repaired.",
   "You rarely create pods directly. A deployment declares which image to run and how many replicas you want. It manages a ReplicaSet that keeps that number of pods running, replacing failed ones automatically. Changing the image triggers a rolling update that replaces pods gradually, and `kubectl rollout undo` rolls back. `kubectl scale deployment web --replicas=5` changes the count.",
   "Because pod IPs change, clients need a stable address. A service provides one: a fixed virtual IP and DNS name that load-balances across all pods matching a label selector, such as `app: web`. Service types include ClusterIP (reachable only inside the cluster, the default), NodePort (opens a port on every node) and LoadBalancer (asks the cloud provider for an external load balancer). An Ingress can route HTTP traffic by hostname or path to services.",
   "Other objects you should recognize: namespaces divide a cluster into logical areas, ConfigMaps hold configuration and Secrets hold sensitive values (base64-encoded by default, which is not encryption), and PersistentVolumeClaims request storage. Everyday commands include `kubectl get pods`, `kubectl describe pod name`, `kubectl logs name` and `kubectl exec -it name -- sh`, which mirror the container commands you already know."
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
   ]
  ]
 },
 {
  "t": "Logging: journalctl filters, rsyslog, logrotate",
  "body": [
   "Logs are your record of what happened on a system, and they are the first place to look when something breaks or looks suspicious. Modern Linux distributions use two logging systems side by side: the systemd journal and rsyslog, with logrotate keeping file-based logs under control.",
   "systemd-journald collects messages from the kernel, early boot, services' stdout and stderr, and the syslog interface, storing them in a structured binary journal. On many distributions the journal is kept only in memory under `/run/log/journal` unless `/var/log/journal` exists or `Storage=persistent` is set in `/etc/systemd/journald.conf`. Without persistence, logs from before the last reboot are gone. `journalctl --disk-usage` shows its size and `journalctl --vacuum-size=500M` trims it.",
   "`journalctl` reads the journal, and its filters are heavily tested. `-u sshd` shows one unit, `-b` the current boot (`-b -1` the previous boot, `--list-boots` lists them), `-p err` messages of priority err and more severe, `-k` kernel messages only, `-f` follows new entries like `tail -f`, `-e` jumps to the end, `-n 50` shows the last 50 lines, and `--since '2026-09-24 10:00' --until '1 hour ago'` selects a time window. `_PID=1234` or `_UID=1001` filter by field, `-o json-pretty` shows all fields, and `-x` adds explanatory text. Filters combine, so `journalctl -u nginx -p warning --since today` is typical.",
   "rsyslog is the traditional syslog daemon, writing plain text files under `/var/log`, such as `/var/log/messages` or `/var/log/syslog` for general messages and `/var/log/secure` or `/var/log/auth.log` for authentication, depending on the distribution. Its rules in `/etc/rsyslog.conf` and `/etc/rsyslog.d/*.conf` use a selector of facility.priority followed by an action. Facilities include `auth`, `authpriv`, `cron`, `daemon`, `kern`, `mail` and `local0` to `local7`; priorities from lowest to highest severity are debug, info, notice, warning, err, crit, alert and emerg. `authpriv.* /var/log/secure` logs all authpriv messages, and `*.err` means err and above. To forward logs to a central server, use `*.* @server:514` for UDP (User Datagram Protocol) or `@@server:514` for TCP (Transmission Control Protocol). Central logging is an important security control because attackers who compromise a host often try to erase local logs. Test with the `logger` command, for example `logger -p local0.warning 'test message'`.",
   "logrotate prevents text logs from filling the disk. It runs daily from cron or a systemd timer and reads `/etc/logrotate.conf` plus per-application files in `/etc/logrotate.d/`. Common directives: `daily` or `weekly`, `rotate 7` (keep seven old copies), `compress` and `delaycompress`, `missingok`, `notifempty`, `size 100M`, `create 0640 root adm` for the new file's mode, and a `postrotate` script that signals the service to reopen its log. `copytruncate` copies then truncates the original for programs that cannot reopen files. Test a config with `logrotate -d` (debug, no changes) or force a rotation with `logrotate -f`."
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
   ]
  ],
  "example": "A service crashed overnight and the server rebooted. journalctl -u payments -b -1 -p err shows errors from the previous boot, but only because you earlier created /var/log/journal to make the journal persistent. You also confirm that rsyslog forwarded the same messages to the central log server with @@logs.example.com:514.",
  "tip": "In rsyslog forwarding, one @ means UDP and two @@ mean TCP; and in journalctl, -b -1 means the previous boot.",
  "check": [
   [
    "Which journalctl command follows new messages from the sshd unit in real time?",
    "journalctl -u sshd -f."
   ],
   [
    "Why might journalctl -b -1 return nothing on a fresh install?",
    "The journal may be stored only in memory (/run/log/journal); without persistent storage, logs from previous boots are lost."
   ],
   [
    "What does rotate 4 combined with weekly do in a logrotate stanza?",
    "Rotates the log once a week and keeps four old copies, deleting older ones."
   ]
  ]
 },
 {
  "t": "Permissions: chmod symbolic and octal, chown, umask",
  "body": [
   "Linux file permissions decide who can read, change or run each file. Every file has an owner (user), a group owner, and three sets of permission bits for user (u), group (g) and others (o). Getting these right is the foundation of Linux security, and the exam expects you to convert between notations quickly.",
   "In `ls -l` output such as `-rwxr-x---`, the first character is the file type and the next nine characters are three triplets: user `rwx`, group `r-x`, others `---`. For files, r allows reading contents, w allows modifying contents and x allows executing. For directories the meanings differ: r allows listing names, w allows creating, deleting and renaming entries (together with x), and x allows entering the directory and accessing files inside it. That means deleting a file depends on write permission on the directory, not on the file itself.",
   "Octal notation assigns r=4, w=2 and x=1 and adds them per triplet: rwx=7, rw-=6, r-x=5, r--=4. So `chmod 755 script.sh` gives rwxr-xr-x, `chmod 640 app.conf` gives rw-r-----, and `chmod 600 ~/.ssh/id_ed25519` gives rw-------. Octal always sets all bits at once.",
   "Symbolic notation changes specific bits and leaves the rest alone: `chmod u+x script.sh` adds execute for the owner, `chmod g-w file` removes group write, `chmod o=r file` sets others to exactly read, `chmod a+r file` adds read for all, and `chmod ug=rw,o= file` sets several at once. `-R` applies changes recursively; with it, capital `X` adds execute only to directories and files that already have it, which avoids making every data file executable: `chmod -R u=rwX,g=rX,o= /srv/data`.",
   "`chown` changes ownership, and only root can give files away. `chown alice file` changes the owner, `chown alice:devs file` changes owner and group, `chown :devs file` changes only the group (as does `chgrp devs file`), and `chown -R` recurses.",
   "umask sets default permissions for newly created files by masking bits off. Files start from 666 (no execute) and directories from 777, and the umask bits are removed. A umask of 022 gives files 644 and directories 755; a umask of 027 gives 640 and 750; 077 gives 600 and 700. Run `umask` to see the current value and `umask 027` to change it for the session. System-wide defaults come from `/etc/login.defs`, `/etc/profile` or shell startup files, and systemd services can set `UMask=` in their unit. A stricter umask is a simple hardening step for servers that hold sensitive data.",
   "When a user is denied access, check permissions along the whole path: every parent directory needs x for the user to reach the file. `namei -l /path/to/file` shows the permissions of each component in one view."
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
    "chown",
    "Changes a file's owner and/or group owner, for example chown alice:devs file."
   ],
   [
    "umask",
    "A mask of permission bits removed from the defaults (666 files, 777 directories) when new files are created."
   ]
  ],
  "example": "A shared project directory must be readable and writable by the devs group but invisible to everyone else. You run chown -R root:devs /srv/project and chmod -R u=rwX,g=rwX,o= /srv/project, then set umask 007 in the team's shell profile so new files are created as 660 and directories as 770.",
  "tip": "Compute umask results by subtraction from 666 for files and 777 for directories; a umask of 027 yields 640 files and 750 directories.",
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
    "600 (rw-------)."
   ]
  ]
 },
 {
  "t": "Special permissions: SUID, SGID, sticky bit; ACLs with setfacl and getfacl",
  "body": [
   "Beyond the basic rwx bits, Linux has three special permission bits and optional ACLs (access control lists). They solve real problems, such as letting users change their own password or share a directory safely, but they also create risk if misused, so the exam covers both their use and their security implications.",
   "SUID (set user ID), octal 4000, applies to executables: the program runs with the privileges of the file's owner rather than the user who launched it. The classic example is `/usr/bin/passwd`, owned by root, which must update `/etc/shadow` on behalf of ordinary users. In `ls -l` it appears as an `s` in the user execute position: `-rwsr-xr-x`. A capital `S` means the bit is set but execute is not, which is usually a mistake. Because a flawed SUID-root program can let an attacker gain root, admins audit them with `find / -perm -4000 -type f 2>/dev/null` and remove the bit from anything that does not need it. Many systems also mount user-writable filesystems with `nosuid`.",
   "SGID (set group ID), octal 2000, has two uses. On an executable it runs the program with the file's group. On a directory, which is the more common use, new files created inside inherit the directory's group instead of the creator's primary group, so a team directory stays consistently group-owned. It shows as `s` in the group execute position: `drwxrws---`.",
   "The sticky bit, octal 1000, applies to directories: users may only delete or rename files they own (or the directory owner or root can), even if the directory is world-writable. `/tmp` is the standard example, shown as `t` in the others execute position: `drwxrwxrwt`.",
   "Set these with a leading octal digit or symbolically: `chmod 4755 /usr/local/bin/tool` or `chmod u+s`, `chmod 2770 /srv/team` or `chmod g+s`, `chmod 1777 /shared/drop` or `chmod +t`. A team share that also needs delete protection can combine `chmod 2770` with the sticky bit, giving 3770.",
   "ACLs extend the owner/group/others model when you need to grant access to specific additional users or groups. `setfacl -m u:bob:rw report.txt` gives bob read and write; `setfacl -m g:auditors:r report.txt` adds a group; `setfacl -x u:bob report.txt` removes an entry and `setfacl -b` removes all ACLs. Default ACLs on a directory, set with `setfacl -d -m g:devs:rwx /srv/project` (or `d:` in the entry), are inherited by new files created inside. `getfacl file` displays all entries, including the mask, which caps the effective permissions of named users and groups. A `+` at the end of the permission string in `ls -l`, such as `-rw-rw-r--+`, tells you an ACL is present. ACLs are supported by ext4, XFS and Btrfs on modern systems, and copying tools need options such as `cp -a` or `rsync -A` to preserve them."
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
    "ACL mask",
    "The ACL entry that limits the maximum effective permissions for named users, named groups and the owning group."
   ]
  ],
  "example": "The finance team shares /srv/finance. You set chown root:finance and chmod 3770 so files inherit the finance group (SGID) and members cannot delete each other's files (sticky). An external auditor needs read-only access to one subfolder, so you run setfacl -R -m u:auditor:rX /srv/finance/reports and setfacl -d -m u:auditor:rX on it for future files, verifying with getfacl.",
  "tip": "Map the letters to positions: s in the user slot is SUID, s in the group slot is SGID, t in the others slot is the sticky bit; a + after the permissions means ACLs exist.",
  "check": [
   [
    "Which command finds all SUID files on the system?",
    "find / -perm -4000 -type f 2>/dev/null."
   ],
   [
    "What octal mode gives a directory rwx for owner and group, nothing for others, and SGID?",
    "2770."
   ],
   [
    "How do you give user maria read access to plan.txt without changing its owner or group?",
    "setfacl -m u:maria:r plan.txt."
   ]
  ]
 },
 {
  "t": "SELinux: modes, contexts, restorecon, semanage, booleans, ausearch; AppArmor profiles and modes",
  "body": [
   "Standard permissions are DAC (discretionary access control): the owner decides who gets access. SELinux (Security-Enhanced Linux) and AppArmor add MAC (mandatory access control): a system-wide policy limits what each program may do regardless of file ownership, so a compromised web server cannot read files outside what its policy allows. RHEL-family systems use SELinux; Ubuntu and Debian use AppArmor, which SUSE also used for years, although newer SUSE releases default to SELinux.",
   "SELinux has three modes. Enforcing applies the policy and blocks violations. Permissive allows everything but logs what would have been denied, which is useful for troubleshooting. Disabled turns SELinux off entirely. `getenforce` shows the mode, `sestatus` gives detail, and `setenforce 0` or `setenforce 1` switches between permissive and enforcing until reboot. The persistent setting is `SELINUX=` in `/etc/selinux/config`. Switching from disabled back to enabled requires a full filesystem relabel, and disabling SELinux to make a problem go away is the wrong answer on the exam and in practice.",
   "Every process and file has a context, in the form user:role:type:level, for example `system_u:object_r:httpd_sys_content_t:s0`. In the default targeted policy the type is what matters: the Apache process runs as `httpd_t` and may read files labeled `httpd_sys_content_t`. View contexts with `ls -Z` for files and `ps -eZ` for processes.",
   "Labels are the most common problem. A file created in a home directory and then moved with `mv` keeps its old label, so the web server is denied access. `restorecon -Rv /var/www/html` resets files to the default labels defined by policy. `chcon -t type file` changes a label temporarily, but a relabel or restorecon will undo it. To define a new default for a custom path, use `semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?'` and then run `restorecon -Rv /srv/web`. `semanage port -a -t http_port_t -p tcp 8081` allows a service to use a non-standard port, and `semanage port -l` lists port labels.",
   "Booleans are on/off switches for optional policy behavior. `getsebool -a` lists them, and `setsebool -P httpd_can_network_connect on` lets Apache make outbound network connections; `-P` makes it persistent.",
   "Denials are logged as AVC (access vector cache) messages in `/var/log/audit/audit.log`. `ausearch -m avc -ts recent` finds recent denials, `sealert` (from setroubleshoot) explains them in plain language, and `audit2why` interprets them. `audit2allow` can generate a custom policy module, but prefer fixing labels, ports or booleans first.",
   "AppArmor instead confines programs with path-based profiles stored in `/etc/apparmor.d/`. Each profile runs in enforce mode (violations blocked and logged) or complain mode (violations only logged). `aa-status` lists loaded profiles and their modes, `aa-enforce` and `aa-complain` switch a profile, `aa-disable` turns one off, and `apparmor_parser -r` reloads a profile after editing. Denials appear in the kernel log or audit log with `apparmor=\"DENIED\"`."
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
    "SELinux boolean",
    "A policy switch toggled with setsebool (-P for persistent) to allow optional behaviors."
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
    "Permissive."
   ],
   [
    "You serve web content from /srv/web. How do you make its correct label permanent?",
    "semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?' followed by restorecon -Rv /srv/web."
   ],
   [
    "What is the AppArmor equivalent of SELinux permissive mode for a single profile?",
    "Complain mode, set with aa-complain."
   ]
  ]
 },
 {
  "t": "Firewalls: firewalld zones and --permanent, ufw, nftables/iptables basics",
  "body": [
   "A host firewall filters network traffic entering and leaving a Linux system, so only the services you intend are reachable. In the kernel, packet filtering is done by netfilter; the tools you use are front ends that write netfilter rules. Linux+ covers firewalld (RHEL-family), ufw (Ubuntu) and the lower-level nftables and iptables.",
   "firewalld organizes rules into zones, each representing a trust level: `drop`, `block`, `public`, `external`, `internal`, `dmz`, `work`, `home` and `trusted`. Each network interface or source address is assigned to one zone, and the zone's allowed services and ports apply to its traffic. `public` is a common default. Key commands use `firewall-cmd`: `--get-default-zone`, `--get-active-zones`, `--list-all` (shows the current zone's services, ports and interfaces), `--add-service=https`, `--add-port=8080/tcp`, `--remove-service`, `--zone=internal --change-interface=eth1`, and rich rules for finer control such as allowing a service only from one subnet.",
   "The crucial distinction is runtime versus permanent configuration. By default, `firewall-cmd --add-service=http` changes only the running firewall, lost at reload or reboot. Adding `--permanent` writes the change to configuration but does not apply it to the running firewall until `firewall-cmd --reload`. The usual pattern is either to run the command twice (with and without `--permanent`) or to make it permanent and reload; `--runtime-to-permanent` saves tested runtime changes. Services are predefined names that map to ports, like `ssh` for 22/tcp.",
   "ufw (Uncomplicated Firewall) is Ubuntu's simpler front end. `ufw status verbose` shows state and rules, `ufw default deny incoming` and `ufw default allow outgoing` set policies, `ufw allow 22/tcp` or `ufw allow OpenSSH` opens SSH, `ufw allow from 10.0.0.0/24 to any port 5432` restricts by source, `ufw deny`, `ufw delete allow 80/tcp`, and finally `ufw enable`. Always allow SSH before enabling ufw on a remote machine, or you will lock yourself out. ufw rules are persistent automatically.",
   "iptables is the traditional rule tool, organized as tables (filter, nat, mangle) containing chains (INPUT, OUTPUT, FORWARD, PREROUTING, POSTROUTING). Rules are evaluated in order and the first match decides the target (ACCEPT, DROP, REJECT); unmatched packets follow the chain policy. `iptables -L -n -v` lists rules and `iptables -A INPUT -p tcp --dport 22 -j ACCEPT` appends one. Rules are not persistent without saving, via `iptables-save` or a persistence package.",
   "nftables is the modern replacement for iptables, with one tool, `nft`, a cleaner syntax and support for IPv4 and IPv6 in a single table family, `inet`. `nft list ruleset` shows everything. On current distributions, firewalld uses nftables as its backend and the `iptables` command often translates to nftables underneath. Pick one management tool per host; mixing firewalld, ufw and hand-written rules leads to confusing conflicts."
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
    "ufw",
    "Uncomplicated Firewall, Ubuntu's simplified front end with persistent rules."
   ],
   [
    "nftables",
    "The modern netfilter rule framework managed with nft, replacing iptables."
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
    "nft list ruleset."
   ]
  ]
 },
 {
  "t": "SSH hardening: key-based auth, ssh-copy-id, sshd_config (PermitRootLogin, PasswordAuthentication)",
  "body": [
   "SSH (Secure Shell) is how you administer almost every Linux server, which makes it one of the most attacked services on the internet. Automated bots constantly try common usernames and passwords. Hardening SSH means replacing passwords with keys, restricting who can log in, and keeping the configuration tight.",
   "Key-based authentication uses a key pair. The private key stays on your workstation, ideally protected by a passphrase; the public key is placed on the server in `~/.ssh/authorized_keys` of the account you log into. During login, the server challenges the client to prove it holds the private key, which is never sent over the network. Keys are far harder to guess than passwords and cannot be phished in the same way. Generate a pair with `ssh-keygen -t ed25519` (Ed25519 is the modern default; RSA with a large key size is also common), which creates `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`.",
   "`ssh-copy-id user@server` appends your public key to the server's authorized_keys and sets sensible permissions, using your password one last time. Permissions matter: sshd refuses keys if `~/.ssh` is writable by others; use 700 for `~/.ssh` and 600 for `authorized_keys` and private keys. `ssh-agent` with `ssh-add` holds a decrypted key in memory so you type the passphrase once per session. Client-side settings such as host aliases, users and key files go in `~/.ssh/config`.",
   "The server daemon is configured in `/etc/ssh/sshd_config`, and many distributions also read drop-in files from `/etc/ssh/sshd_config.d/`. Key hardening settings: `PermitRootLogin no` stops direct root logins so admins log in as themselves and use sudo, which also improves accountability; `prohibit-password` allows root only with keys. `PasswordAuthentication no` disables passwords entirely once keys work, stopping brute-force attacks; related keyboard-interactive settings may also need disabling. `PubkeyAuthentication yes` keeps keys enabled. `AllowUsers` or `AllowGroups` restrict logins to named accounts, `MaxAuthTries` limits attempts per connection, `LoginGraceTime` shortens the login window, and `X11Forwarding no` disables unneeded features. Changing `Port` reduces log noise but is not real security; on SELinux systems a new port also needs `semanage port -a -t ssh_port_t -p tcp <port>`, plus a firewall rule.",
   "Apply changes safely. First run `sshd -t` to test the syntax, then `systemctl reload sshd` (the unit is `ssh` on Debian-family systems). Keep your current session open and test a new login in a second terminal before logging out; if something is wrong, you can still fix it.",
   "Add complementary controls: fail2ban can ban IPs that repeatedly fail authentication by watching logs, firewall rules can restrict SSH to management networks, and MFA can be added through PAM. Review `/var/log/secure` or `/var/log/auth.log`, or `journalctl -u sshd`, for failed logins. Finally, verify server host keys when you first connect; the fingerprint prompt protects you against man-in-the-middle attacks, and `~/.ssh/known_hosts` records trusted keys."
  ],
  "terms": [
   [
    "Key-based authentication",
    "Login using a private/public key pair, where the server holds the public key in authorized_keys."
   ],
   [
    "ssh-copy-id",
    "Copies a public key into a remote account's authorized_keys with correct permissions."
   ],
   [
    "PermitRootLogin",
    "sshd_config setting controlling whether root may log in directly (no, prohibit-password, yes)."
   ],
   [
    "PasswordAuthentication",
    "sshd_config setting that enables or disables password logins."
   ],
   [
    "sshd -t",
    "Tests the SSH daemon configuration for errors before reloading."
   ]
  ],
  "example": "A new cloud VM shows thousands of failed root password attempts in its auth log. You create a key with ssh-keygen -t ed25519, run ssh-copy-id admin@vm, confirm key login works in a second terminal, then set PermitRootLogin no and PasswordAuthentication no in a file under /etc/ssh/sshd_config.d/, run sshd -t and reload sshd. The brute-force attempts now fail immediately.",
  "tip": "Order matters in hardening: confirm key-based login works before disabling PasswordAuthentication, and keep an existing session open while testing.",
  "check": [
   [
    "Key login fails and the server log mentions bad ownership or modes. What should you check?",
    "That ~/.ssh is 700, authorized_keys is 600, and the home directory is not writable by group or others, all owned by the user."
   ],
   [
    "Why is PermitRootLogin no considered good practice?",
    "It removes root as a direct target for attackers and forces admins to log in as individuals and elevate with sudo, which is logged and accountable."
   ],
   [
    "Which command checks sshd_config syntax before reloading?",
    "sshd -t."
   ]
  ]
 },
 {
  "t": "Privilege escalation: sudo, visudo, /etc/sudoers.d, su, polkit",
  "body": [
   "Logging in as root for daily work is risky: every typo runs with full power, and actions are not tied to a person. Instead, administrators use normal accounts and elevate privileges only when needed. Linux+ tests the tools for this, and also calls it privilege escalation, a term that in security reports also means an attacker gaining more rights than intended.",
   "`su` (substitute user) switches to another account, root by default, and asks for the target account's password. `su -` (or `su -l`) starts a full login shell with the target's environment, which is usually what you want; plain `su` keeps much of your current environment. `su - alice` becomes alice, and `su -c 'command'` runs one command. The drawback is that everyone who needs root must know the root password, and actions are logged as root.",
   "`sudo` lets permitted users run commands as root (or another user) using their own password, and logs each command. `sudo command` runs one command, `sudo -i` opens a root login shell, `sudo -u postgres psql` runs as another user, `sudo -l` lists what you are allowed to run, and `sudo -k` forgets cached credentials. Credentials are cached for a short time after a successful prompt. Commands are logged to the authentication log or journal.",
   "Rules live in `/etc/sudoers`, and you should edit it only with `visudo`, which locks the file and checks syntax before saving; a broken sudoers file can lock every admin out. The rule format is `who where=(as_whom) what`: `alice ALL=(ALL) ALL` lets alice run anything as anyone. A `%` means a group: `%wheel ALL=(ALL) ALL` on RHEL-family systems and `%sudo ALL=(ALL:ALL) ALL` on Debian-family systems give members full sudo rights, which is why adding a user to wheel or sudo makes them an admin. `NOPASSWD:` skips the password prompt, which is convenient for automation but weakens security. Least privilege means granting only specific commands, using full paths: `%webops ALL=(root) /usr/bin/systemctl restart nginx`. Aliases (`User_Alias`, `Cmnd_Alias`) keep large policies readable.",
   "Rather than editing the main file, drop separate files into `/etc/sudoers.d/`, edited with `visudo -f /etc/sudoers.d/webops`. This keeps changes modular and friendly to configuration management. Files there must not contain a dot or end with `~`, or they are ignored, and they should be mode 0440.",
   "Be careful which commands you grant: allowing an editor, a pager, a shell or tools like `find` or `tar` with sudo can let a user break out to a full root shell. Security reviewers check sudo rules for exactly these escapes, as well as for writable scripts called via sudo.",
   "polkit (formerly PolicyKit) is a separate framework that authorizes unprivileged processes to perform specific privileged actions through system services, such as a desktop user managing network connections or `systemctl` and `timedatectl` asking for admin authentication. Rules are written in JavaScript files in `/etc/polkit-1/rules.d/`, and `pkexec` runs a program as another user under polkit control. Keep polkit updated; serious vulnerabilities have been found in it in the past."
  ],
  "terms": [
   [
    "sudo",
    "Runs a command as another user (root by default) based on sudoers rules, with per-user authentication and logging."
   ],
   [
    "visudo",
    "Safely edits sudoers files with locking and syntax checking."
   ],
   [
    "/etc/sudoers.d",
    "Directory of drop-in sudoers files for modular rules."
   ],
   [
    "su -",
    "Switches to another user with a full login environment, requiring that user's password."
   ],
   [
    "polkit",
    "An authorization framework letting unprivileged processes request specific privileged actions from system services."
   ]
  ],
  "example": "The web operations team needs to restart nginx but should not have full root. You run visudo -f /etc/sudoers.d/webops and add %webops ALL=(root) /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx. A team member runs sudo -l to confirm the allowed commands, and each use appears in the logs under their own name.",
  "tip": "Always choose visudo (or visudo -f for a drop-in) over editing sudoers with a normal editor, and remember that a % in sudoers means a group.",
  "check": [
   [
    "What is the difference between su - and sudo -i?",
    "su - requires the target (root) password; sudo -i uses the caller's own password and is permitted by sudoers rules, with logging."
   ],
   [
    "What does %wheel ALL=(ALL) ALL mean?",
    "Members of the wheel group may run any command as any user on any host."
   ],
   [
    "Why is granting sudo access to vim risky?",
    "An editor can spawn a shell, so a user could escape to a full root shell rather than just editing files."
   ]
  ]
 },
 {
  "t": "Authentication: PAM modules (pam_faillock, pam_pwquality), LDAP/SSSD, Kerberos, MFA",
  "body": [
   "Authentication proves who a user is. On Linux, programs such as login, sshd and sudo do not implement password checks themselves; they delegate to PAM (Pluggable Authentication Modules), which lets administrators change how authentication works, add password rules or plug in a directory service without modifying each program.",
   "Each PAM-aware service has a file in `/etc/pam.d/`, such as `sshd` or `sudo`, often including shared files like `system-auth` and `password-auth` (RHEL-family) or `common-auth` and `common-password` (Debian-family). Each line has a type, a control flag and a module. Types: `auth` verifies identity, `account` checks whether the account may log in now (expired, time restrictions), `password` handles password changes and `session` sets up or tears down the session. Control flags decide how results combine: `required` must succeed but the stack keeps running, `requisite` must succeed and fails immediately if not, `sufficient` ends the stack with success if it passes and nothing required failed earlier, and `optional` rarely matters. On RHEL-family systems, use `authselect` rather than editing the shared files by hand, because it regenerates them.",
   "`pam_pwquality` enforces password strength when passwords change. Settings in `/etc/security/pwquality.conf` include `minlen`, `minclass` (number of character classes), credit settings such as `dcredit` and `ucredit`, and `dictcheck`. `pam_faillock` locks an account after repeated failed logins, a defense against brute force. It is configured in `/etc/security/faillock.conf` with `deny` (failures allowed), `unlock_time` (seconds until automatic unlock) and `fail_interval`. `faillock --user alice` shows her failures and `faillock --user alice --reset` unlocks her. Older systems used `pam_tally2` for the same purpose. Other modules include `pam_limits` (resource limits from `/etc/security/limits.conf`) and `pam_access`.",
   "In organizations, accounts usually live centrally. LDAP (Lightweight Directory Access Protocol) is a protocol for directory services that store users and groups, such as OpenLDAP, 389 Directory Server, FreeIPA and Microsoft Active Directory. Use LDAPS or StartTLS so credentials are encrypted. SSSD (System Security Services Daemon) connects Linux to these directories: it retrieves identities and authenticates users, caches credentials so logins work offline, and integrates with PAM and nsswitch (`passwd: files sss`). Configuration lives in `/etc/sssd/sssd.conf`, which must be mode 600. `realm join` can join a domain and configure SSSD, and `getent passwd user` or `id user` confirms directory users resolve.",
   "Kerberos provides single sign-on with tickets instead of sending passwords to every service. A user authenticates to the KDC (Key Distribution Center) and receives a TGT (ticket-granting ticket), then uses it to get service tickets. `kinit` obtains a ticket, `klist` lists tickets, `kdestroy` removes them, and `/etc/krb5.conf` defines realms. Kerberos is very sensitive to clock differences, so time synchronization is essential.",
   "MFA (multi-factor authentication) requires two or more factor types: something you know, something you have and something you are. On Linux, MFA is typically added through a PAM module that checks TOTP (time-based one-time password) codes or hardware security keys, or through SSH settings that require both a key and a code."
  ],
  "terms": [
   [
    "PAM",
    "Pluggable Authentication Modules: the framework that stacks modules to perform authentication for Linux services."
   ],
   [
    "pam_faillock",
    "PAM module that locks accounts after repeated failed authentication attempts."
   ],
   [
    "pam_pwquality",
    "PAM module that enforces password complexity and length rules."
   ],
   [
    "SSSD",
    "Daemon that provides identities and authentication from LDAP, Kerberos or Active Directory, with caching."
   ],
   [
    "Kerberos TGT",
    "Ticket-granting ticket issued by the KDC after login and used to request service tickets."
   ]
  ],
  "example": "A user reports that she cannot log in after a weekend. faillock --user jlee shows ten failures from an unknown IP address overnight, which pam_faillock correctly blocked. You confirm her identity, reset with faillock --user jlee --reset, have her change her password, and pass the source IP to the security team.",
  "tip": "Remember the PAM control flags: requisite fails immediately, required fails at the end of the stack, and sufficient can end the stack early with success.",
  "check": [
   [
    "Which PAM module type checks whether an account is expired or allowed to log in right now?",
    "account."
   ],
   [
    "How do you unlock a user locked by pam_faillock?",
    "faillock --user <name> --reset."
   ],
   [
    "What does SSSD add beyond basic LDAP lookups?",
    "It integrates identity and authentication with PAM and nsswitch, supports Kerberos and Active Directory, and caches credentials for offline logins."
   ]
  ]
 },
 {
  "t": "Cryptography: hashing (sha256sum), GPG signatures, TLS certificates, LUKS disk encryption",
  "body": [
   "Cryptography gives Linux administrators three practical guarantees: integrity (the data was not changed), authenticity (it came from who you think), and confidentiality (only authorized parties can read it). Linux+ focuses on the everyday tools that provide them.",
   "A hash function turns any input into a fixed-length digest. The same input always gives the same digest, and any change, even one bit, gives a completely different one. Hashes are one-way: you cannot recover the input. `sha256sum file.iso` prints the SHA-256 digest; compare it with the value the publisher lists. `sha256sum -c SHA256SUMS` checks every file listed in a checksum file. MD5 and SHA-1 are considered broken for security because collisions can be produced, though you may still see them used as simple corruption checks. Remember that a hash alone only proves integrity if you got the expected value from a trusted source.",
   "GPG (GNU Privacy Guard) adds authenticity with public-key signatures. A publisher signs a file or checksum list with their private key; anyone with the matching public key can verify it. `gpg --import key.asc` imports a key, `gpg --verify file.sig file` checks a detached signature, `gpg --detach-sign file` creates one, and `gpg --encrypt -r recipient` and `--decrypt` handle file encryption. Package managers use the same idea: dnf and apt verify repository signatures with imported keys, so a tampered package is rejected. Always verify a key's fingerprint through a trusted channel before trusting it.",
   "TLS (Transport Layer Security) encrypts network connections such as HTTPS. The server presents an X.509 certificate that binds its public key to its name and is signed by a CA (certificate authority). Clients trust it if it chains up to a root CA in their trust store, the name matches (via the Subject Alternative Name), and it has not expired or been revoked. `openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr` creates a key and a CSR (certificate signing request) to send to a CA; `openssl x509 -in cert.pem -noout -text` shows details such as validity dates; `openssl s_client -connect host:443` tests a live server. Self-signed certificates are fine for labs but trigger warnings elsewhere. System trust stores are updated with `update-ca-trust` (RHEL-family) or `update-ca-certificates` (Debian-family). Keep private keys readable only by the service.",
   "LUKS (Linux Unified Key Setup) encrypts entire block devices, protecting data at rest if a disk or laptop is stolen. `cryptsetup luksFormat /dev/sdb1` initializes encryption (destroying existing data), `cryptsetup open /dev/sdb1 securedata` unlocks it as `/dev/mapper/securedata`, you then create a filesystem and mount it, and `cryptsetup close securedata` locks it. LUKS supports multiple key slots, so you can add a recovery passphrase with `luksAddKey`. `/etc/crypttab` lists devices to unlock at boot, and the initramfs handles an encrypted root. Back up the LUKS header with `cryptsetup luksHeaderBackup`, since a damaged header makes the data unrecoverable. LUKS does not protect data on a running, unlocked system."
  ],
  "terms": [
   [
    "Hash",
    "A one-way fixed-length digest of data used to detect changes; SHA-256 is a common choice."
   ],
   [
    "GPG signature",
    "A signature created with a private key that anyone with the public key can verify, proving origin and integrity."
   ],
   [
    "X.509 certificate",
    "A CA-signed document binding a public key to an identity, used by TLS."
   ],
   [
    "CSR",
    "Certificate signing request: contains a public key and identity details sent to a CA for signing."
   ],
   [
    "LUKS",
    "Linux Unified Key Setup: the standard format for full block device encryption, managed with cryptsetup."
   ]
  ],
  "example": "Before installing a downloaded ISO, you import the distribution's signing key, verify its fingerprint against the one published through a separate trusted channel, run gpg --verify SHA256SUMS.sig SHA256SUMS, and then sha256sum -c SHA256SUMS --ignore-missing. Both checks pass, so you know the image is authentic and uncorrupted.",
  "tip": "A checksum proves integrity only; a signature proves integrity and authenticity. Encryption (LUKS, TLS) is what provides confidentiality.",
  "check": [
   [
    "Why is verifying a GPG signature stronger than just comparing a SHA-256 checksum from the same website?",
    "If the site is compromised, an attacker can change both file and checksum, but cannot forge a valid signature without the publisher's private key."
   ],
   [
    "Which openssl command shows a certificate's expiration date and SAN entries?",
    "openssl x509 -in cert.pem -noout -text (or -noout -dates for just the dates)."
   ],
   [
    "Which command unlocks a LUKS device so it can be mounted?",
    "cryptsetup open <device> <name>, which creates /dev/mapper/<name>."
   ]
  ]
 },
 {
  "t": "OS hardening: disabling unused services, secure boot, patching, file integrity (AIDE)",
  "body": [
   "Hardening means reducing a system's attack surface: removing what is not needed, locking down what remains, keeping software current, and watching for unauthorized change. No single control stops every attack, so hardening layers several defenses, an approach called defense in depth.",
   "Start with services. Every listening network service is a possible entry point, so run only what the server's role requires. `ss -tulpn` lists listening TCP and UDP ports with the owning process, and `systemctl list-unit-files --state=enabled` shows what starts at boot. For anything unnecessary, `systemctl disable --now name` stops it and prevents startup, and `systemctl mask` blocks it entirely. Better still, remove unneeded packages with dnf or apt so there is nothing to patch. Legacy cleartext protocols such as Telnet, rsh and plain FTP should be replaced with SSH and SFTP. Minimal installation images make this easier from the start.",
   "Secure Boot is a UEFI feature that verifies digital signatures on boot components so only trusted code runs before the operating system. Most distributions use a small signed shim loader that then verifies GRUB and the kernel, and the kernel can require signed modules. This defends against bootkits and rootkits that tamper with early boot. `mokutil --sb-state` shows whether Secure Boot is enabled. Third-party kernel modules, such as some drivers, must be signed with a key enrolled as a MOK (Machine Owner Key) or they will not load. Also protect firmware and GRUB with passwords so an attacker with console access cannot easily change boot parameters.",
   "Patching fixes known vulnerabilities, and unpatched software is one of the most common ways systems are compromised. Apply updates regularly with `dnf upgrade` or `apt update && apt upgrade`, prioritizing security updates (`dnf updateinfo list --security`, or `dnf upgrade --security`). Automate where appropriate with dnf-automatic or unattended-upgrades. Kernel updates need a reboot to take effect, unless you use a live patching service. Test updates on non-production systems first, schedule maintenance windows, and keep a rollback plan, such as snapshots or `dnf history undo`.",
   "File integrity monitoring detects unauthorized changes to important files, a common sign of intrusion. AIDE (Advanced Intrusion Detection Environment) builds a database of file attributes and hashes, then compares later scans against it. Configuration is in `/etc/aide.conf` (or `/etc/aide/aide.conf`). Typical use: `aide --init` creates the database, you move the new file into place as the reference database (for example renaming `aide.db.new.gz` to `aide.db.gz`), then `aide --check` reports added, removed and changed files, usually from a daily cron job or timer. After legitimate changes such as patching, run `aide --update` and replace the database. Store a copy of the database offline or read-only, since an attacker with root could otherwise alter it.",
   "Other common hardening steps include strict SSH settings, a host firewall, SELinux or AppArmor enforcing, restrictive mount options (`noexec`, `nosuid`, `nodev` on /tmp), sensible sysctl network settings, disabling unused kernel modules, strong password policies and centralized logging. Hardening benchmarks bring these together into checklists."
  ],
  "terms": [
   [
    "Attack surface",
    "The total set of services, software and interfaces an attacker could try to exploit."
   ],
   [
    "Secure Boot",
    "A UEFI feature that only runs signed boot loaders and kernels, blocking tampered boot code."
   ],
   [
    "MOK",
    "Machine Owner Key: a user-enrolled key used with shim to trust additional signed modules or kernels."
   ],
   [
    "AIDE",
    "Advanced Intrusion Detection Environment: a file integrity checker comparing files to a baseline database."
   ],
   [
    "Patch management",
    "The process of regularly testing and applying software updates to fix vulnerabilities."
   ]
  ],
  "example": "Hardening a new mail relay, you run ss -tulpn and find cups and an old rpcbind listener. You disable and remove both packages, apply all security updates with dnf upgrade --security and reboot into the new kernel, confirm mokutil --sb-state reports Secure Boot enabled, and initialize AIDE so a nightly check will flag unexpected changes under /etc and /usr/bin.",
  "tip": "After legitimate updates, the AIDE baseline must be updated, or every patched binary will show up as a change and real intrusions will hide in the noise.",
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
   ]
  ]
 },
 {
  "t": "Compliance and auditing: auditd, log review, vulnerability scanning, CIS benchmarks",
  "body": [
   "Compliance means proving that systems meet a defined standard, whether an internal policy, an industry framework or a regulation. Auditing supplies the evidence: records of who did what, when, and whether the configuration matches the standard. As a Linux administrator you will configure these tools and respond to what they find.",
   "The Linux audit system records security-relevant events at the kernel level. The `auditd` daemon writes events to `/var/log/audit/audit.log`. Rules can be added at runtime with `auditctl` and made persistent in files under `/etc/audit/rules.d/`, which `augenrules` compiles. File watches record access to important files: `-w /etc/passwd -p wa -k identity` logs writes and attribute changes to /etc/passwd, tagged with the key 'identity'. Syscall rules record system calls, such as every use of a privileged command. `auditctl -l` lists loaded rules. Each event includes the audit UID (auid), the original login identity preserved even after sudo or su, which makes actions traceable to a person.",
   "Searching and summarizing audit data uses `ausearch` and `aureport`. `ausearch -k identity` finds events with that key, `ausearch -m USER_LOGIN --success no` finds failed logins, `ausearch -ua 1001` finds events by a user, and `-ts today` limits time. `aureport --summary`, `aureport --auth` and `aureport --failed` produce overviews. SELinux denials also appear here as AVC records.",
   "Log review is only effective if it is regular and focused. Watch for repeated failed logins, logins at odd hours or from unusual sources, new accounts or sudoers changes, services started or stopped unexpectedly, and gaps in logs, which may indicate tampering. Tools such as `journalctl`, `lastlog`, `last` (successful logins from wtmp), `lastb` (failed logins from btmp) and `who` help. Forwarding logs to a central server or SIEM (security information and event management) system protects them from local tampering and allows correlation across hosts.",
   "Vulnerability scanning finds known weaknesses before attackers do. Network scanners such as OpenVAS/Greenbone probe hosts for vulnerable services and misconfigurations; authenticated scans that log in to the host give more accurate results about installed packages. Findings reference CVE (Common Vulnerabilities and Exposures) identifiers and are rated by CVSS (Common Vulnerability Scoring System) severity. Package tools can also report pending security fixes. Remediate by priority, patching or mitigating, then rescan to confirm. Only scan systems you are authorized to test.",
   "CIS (Center for Internet Security) Benchmarks are consensus-based configuration guides for specific operating systems and applications, with scored recommendations grouped into levels, where Level 1 is a practical baseline and Level 2 is stricter defense in depth. DISA STIGs (Security Technical Implementation Guides) serve a similar role for US defense systems. OpenSCAP automates checking: `oscap xccdf eval --profile <profile> --report report.html <datastream>` evaluates a system against a SCAP (Security Content Automation Protocol) profile and produces an HTML report, and many findings can be remediated automatically. Tools like Lynis perform broader hardening audits. Scan, fix, document exceptions, and rescan: compliance is a continuous process, not a one-time task."
  ],
  "terms": [
   [
    "auditd",
    "The Linux audit daemon that records kernel-level security events to /var/log/audit/audit.log."
   ],
   [
    "Audit rule key (-k)",
    "A label attached to audit rules so matching events can be searched with ausearch -k."
   ],
   [
    "auid",
    "Audit user ID: the original login identity recorded in audit events even after sudo or su."
   ],
   [
    "CIS Benchmark",
    "A consensus configuration guide with scored hardening recommendations for a specific platform."
   ],
   [
    "OpenSCAP",
    "An open-source toolset that evaluates systems against SCAP security profiles and generates reports."
   ]
  ],
  "example": "An auditor asks for proof that changes to sudo rules are tracked. You add -w /etc/sudoers -p wa -k sudoers and -w /etc/sudoers.d/ -p wa -k sudoers to /etc/audit/rules.d/sudo.rules, load them with augenrules --load, make a test change with visudo, and show the resulting event, including your auid, from ausearch -k sudoers.",
  "tip": "Know the audit tool trio: auditctl manages rules, ausearch finds specific events, and aureport produces summaries.",
  "check": [
   [
    "What does the audit rule -w /etc/shadow -p wa -k shadow do?",
    "Watches /etc/shadow and logs any write or attribute change, tagging events with the key 'shadow'."
   ],
   [
    "Why is the auid field valuable in investigations?",
    "It records the original login user, so actions performed after sudo or su can still be traced to a person."
   ],
   [
    "What is the purpose of a CIS Benchmark?",
    "To provide a consensus, prioritized set of secure configuration recommendations to harden and audit a specific system."
   ]
  ]
 },
 {
  "t": "Bash scripting: shebang, variables, parameter expansion, quoting, exit codes and $?",
  "body": [
   "A Bash script is a text file of shell commands run in sequence, letting you automate anything you can type. Linux+ performance-based questions often show a short script and ask what it prints or why it fails, so the core syntax needs to be solid.",
   "The first line is the shebang, which tells the kernel which interpreter should run the file: `#!/bin/bash`, or `#!/usr/bin/env bash` to find bash in the PATH. Make the script executable with `chmod +x script.sh` and run it as `./script.sh`; alternatively, `bash script.sh` runs it without execute permission. Running it with `source script.sh` (or `. script.sh`) executes it in the current shell, so variables it sets remain afterwards. Lines beginning with `#` are comments.",
   "Variables are assigned with no spaces around the equals sign: `name=web01`. Spaces break it, because `name = web01` runs a command called name. Read a value with `$name` or `${name}`; braces are needed when text follows, as in `${name}_backup`. Command substitution captures output: `today=$(date +%F)`. Arithmetic uses `$(( ))`: `count=$((count + 1))`. Special parameters include `$0` (script name), `$1`, `$2`... (positional arguments), `$#` (number of arguments), `$@` (all arguments as separate words), `$$` (the script's PID) and `$?` (exit status of the last command). `read -p 'Name: ' user` reads input from the user.",
   "Parameter expansion transforms variables without calling external tools. `${var:-default}` uses a default if var is unset or empty, `${var:=default}` also assigns it, `${var:?message}` exits with an error if it is unset, `${#var}` gives the length, `${file%.txt}` removes a suffix pattern (useful to change extensions), `${path##*/}` removes the longest prefix up to the last slash (like basename), and `${var/old/new}` replaces the first match.",
   "Quoting controls how the shell treats special characters. Double quotes allow variable and command expansion but prevent word splitting and globbing: `\"$file\"` stays one argument even if it contains spaces. Single quotes make everything literal: `'$HOME'` prints the four characters. Backslash escapes a single character. The rule of thumb is to double-quote every variable expansion, `\"$var\"` and `\"$@\"`, unless you specifically want splitting; many script bugs come from unquoted variables containing spaces or wildcards.",
   "Every command returns an exit status from 0 to 255: 0 means success, anything else means failure, with the meaning defined by the program. `$?` holds the status of the most recent command, so check it immediately, because the next command overwrites it. A script sets its own status with `exit 0` or `exit 1`. The operators `&&` and `||` use exit codes: `mkdir /backup && cp file /backup` copies only if mkdir succeeded, and `ping -c1 host || echo 'down'` prints only on failure.",
   "```bash\n#!/bin/bash\ntarget=\"${1:-/var/log}\"\nsize=$(du -sh \"$target\" 2>/dev/null)\nstatus=$?\nif [ \"$status\" -ne 0 ]; then\n  echo \"cannot read $target (exit $status)\" >&2\n  exit 1\nfi\necho \"$target uses ${size%%[[:space:]]*}\"\n```"
  ],
  "terms": [
   [
    "Shebang",
    "The #! first line of a script naming the interpreter, such as #!/bin/bash."
   ],
   [
    "Positional parameters",
    "$1, $2 and so on, holding the arguments passed to a script; $# counts them and $@ lists them."
   ],
   [
    "Parameter expansion",
    "${...} syntax that supplies defaults, trims patterns or substitutes text in variables."
   ],
   [
    "Command substitution",
    "$(command) syntax that replaces itself with the command's output."
   ],
   [
    "Exit status ($?)",
    "The 0-255 result of the last command, where 0 means success."
   ]
  ],
  "example": "A backup script fails on a file named 'Q3 report.xlsx'. The line cp $file /backup split the name into two arguments. Changing it to cp \"$file\" /backup fixes it, and adding if [ $? -ne 0 ]; then echo 'copy failed' >&2; exit 1; fi makes the failure visible to the cron job's logs.",
  "tip": "Look for spaces around = in assignments and unquoted variables; both are common deliberate errors in exam script questions.",
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
   ]
  ]
 },
 {
  "t": "Bash control flow: if/test, case, for and while loops, functions, arrays",
  "body": [
   "Control flow lets a script make decisions and repeat work. With conditions, loops and functions you can turn a list of commands into a tool that handles many hosts, files or users. The exam expects you to read these constructs and spot errors in them.",
   "`if` runs a command and branches on its exit status: zero means true. Most often the command is a test. `[ ... ]` (the `test` command) and Bash's `[[ ... ]]` evaluate expressions; the spaces inside the brackets are required. File tests: `-e` exists, `-f` regular file, `-d` directory, `-r`/`-w`/`-x` readable, writable, executable, `-s` non-empty. String tests: `-z` empty, `-n` non-empty, `=` or `==` equal, `!=` not equal. Integer comparisons use `-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge`, not `<` or `>`, which in single brackets are redirections. `[[ ]]` adds pattern matching (`[[ $host == web* ]]`), regular expressions with `=~`, `&&` and `||` inside, and safer handling of unquoted variables. `(( ))` evaluates arithmetic: `(( count > 5 ))`. The structure is `if ...; then ...; elif ...; then ...; else ...; fi`.",
   "`case` matches one value against patterns, which is cleaner than a long if/elif chain, especially for command-line options:",
   "```bash\ncase \"$1\" in\n  start|up)   systemctl start app ;;\n  stop)       systemctl stop app ;;\n  *)          echo \"usage: $0 {start|stop}\" >&2; exit 2 ;;\nesac\n```",
   "Each pattern ends with `)`, each block with `;;`, `|` separates alternatives, `*` is the catch-all default, and the whole statement ends with `esac`.",
   "`for` loops iterate over a list: `for host in web01 web02 db01; do ssh \"$host\" uptime; done`, over files with a glob (`for f in /var/log/*.log; do ...; done`), over arguments with `for arg in \"$@\"`, or C-style with `for ((i=1; i<=5; i++))`. Brace expansion `{1..10}` generates sequences. `while` repeats as long as a command succeeds, and `until` repeats until it succeeds. The safest way to process a file line by line is `while IFS= read -r line; do ...; done < file`, which preserves spaces and backslashes; looping with `for line in $(cat file)` splits on every space. `break` exits a loop and `continue` skips to the next iteration.",
   "Functions group reusable code: `backup() { local src=\"$1\"; tar -czf \"/backup/$(basename \"$src\").tgz\" \"$src\"; }`, called like a command: `backup /etc`. Inside a function, `$1`, `$2` and so on are the function's own arguments. Declare variables with `local` so they do not leak into the rest of the script. `return n` sets the function's exit status (0 to 255); to return data, echo it and capture it with `$(...)`. Functions must be defined before they are called.",
   "Arrays hold lists. Indexed arrays: `servers=(web01 web02 db01)`, `${servers[0]}` is the first element, `${servers[@]}` expands to all elements (quote it: `\"${servers[@]}\"`), `${#servers[@]}` gives the count, and `servers+=(cache01)` appends. Associative arrays need `declare -A`: `declare -A port=([ssh]=22 [https]=443)`, then `${port[ssh]}`, and `${!port[@]}` lists the keys. Arrays are Bash features and are not available in plain POSIX sh."
  ],
  "terms": [
   [
    "test / [ ]",
    "Evaluates file, string and integer conditions and returns an exit status used by if and while."
   ],
   [
    "[[ ]]",
    "Bash's extended test with pattern matching, regex (=~) and safer variable handling."
   ],
   [
    "case",
    "A multi-branch statement matching a value against glob patterns, ending with esac."
   ],
   [
    "local",
    "Declares a variable scoped to the current function."
   ],
   [
    "Associative array",
    "A Bash array indexed by strings, declared with declare -A."
   ]
  ],
  "example": "You need to check disk usage on every server in a list. A script reads hosts into an array with mapfile -t hosts < hosts.txt, loops with for h in \"${hosts[@]}\", runs a function check_disk \"$h\" that uses ssh and df, and uses if (( usage > 90 )) to print a warning only for hosts above 90 percent.",
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
   ]
  ]
 },
 {
  "t": "Safer scripts: set -euo pipefail, trap, input validation, shellcheck",
  "body": [
   "By default Bash is forgiving: if a command fails, the script carries on, an unset variable quietly becomes an empty string, and a failure early in a pipeline is ignored. That tolerance turns small mistakes into big damage, such as a script that runs `rm -rf \"$dir/\"*` when `dir` was never set. Defensive scripting habits prevent this, and Linux+ expects you to recognize them.",
   "`set -e` (errexit) makes the script exit when a command fails, unless the failure is part of a condition such as an `if` test or a command followed by `||`. `set -u` (nounset) treats references to unset variables as errors, catching typos and missing arguments. `set -o pipefail` makes a pipeline return the status of the last command that failed rather than only the final command, so `grep pattern missing.txt | sort` reports failure. Combined, `set -euo pipefail` near the top of a script is a common strict-mode starting point. It is not magic: some commands legitimately return non-zero (grep with no matches returns 1), so handle those with `|| true` or an explicit check. `set -x` prints each command before running it, which is useful for debugging, and `bash -n script.sh` checks syntax without running anything.",
   "`trap` runs a command when the script receives a signal or exits. `trap cleanup EXIT` calls a cleanup function however the script ends, which is ideal for removing temporary files or releasing lock files. `trap 'echo interrupted; exit 130' INT TERM` handles Ctrl+C and termination, and `trap '...' ERR` can log the failing line. Create temporary files safely with `mktemp` rather than fixed names like `/tmp/data`, which another user could pre-create or turn into a symlink.",
   "```bash\n#!/usr/bin/env bash\nset -euo pipefail\ntmp=$(mktemp)\ntrap 'rm -f \"$tmp\"' EXIT\n[[ $# -eq 1 ]] || { echo \"usage: $0 <username>\" >&2; exit 2; }\nuser=$1\n[[ $user =~ ^[a-z_][a-z0-9_-]{0,31}$ ]] || { echo \"invalid username\" >&2; exit 2; }\ngetent passwd \"$user\" > \"$tmp\"\n```",
   "Input validation treats every argument, environment variable and file line as untrusted. Check the argument count (`$#`), match values against an allow-list or strict regular expression, confirm files exist and directories are what you expect, and refuse dangerous values such as an empty path or `/`. Quote every expansion so input cannot split into extra arguments or expand wildcards, and use `--` before user-supplied file names so a name beginning with a dash is not treated as an option (`rm -- \"$file\"`). Never pass input to `eval` or build commands as strings, because that invites command injection. Scripts that run with sudo or from cron as root deserve extra care, and they should use absolute paths or set PATH explicitly.",
   "ShellCheck is a static analysis tool that reads a script and warns about common bugs: unquoted variables, useless use of cat, `[ $a == $b ]` errors, unreachable code, and many portability problems. Run `shellcheck script.sh` and fix or consciously suppress each finding; its warnings have codes such as SC2086 (double quote to prevent globbing and word splitting). Many teams run ShellCheck automatically in CI (continuous integration) pipelines so problems are caught before scripts reach servers."
  ],
  "terms": [
   [
    "set -e",
    "Exits the script when a command fails outside a conditional context."
   ],
   [
    "set -u",
    "Treats use of an unset variable as an error."
   ],
   [
    "pipefail",
    "Makes a pipeline's exit status reflect the rightmost failing command, not just the last command."
   ],
   [
    "trap",
    "Registers a command to run on signals or on script EXIT, often for cleanup."
   ],
   [
    "ShellCheck",
    "A static analyzer that flags bugs and risky patterns in shell scripts."
   ]
  ],
  "example": "A cleanup script contained rm -rf \"$BASE_DIR\"/cache/*. When run from cron, BASE_DIR was not set, so it targeted /cache. After a near miss, the team adds set -euo pipefail so the unset variable aborts the script, validates that BASE_DIR is a non-empty existing directory, adds a trap to remove temp files, and runs shellcheck in CI on every change.",
  "tip": "Know what each strict-mode flag catches: -e failed commands, -u unset variables, and pipefail failures hidden inside pipelines.",
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
   ]
  ]
 },
 {
  "t": "Python basics for admins: data types, sets and dicts, venv, pip, running scripts",
  "body": [
   "Bash is ideal for gluing commands together, but once a task involves structured data, APIs or more complex logic, Python is usually easier to write and maintain. Linux+ expects admin-level Python: reading basic code, choosing data types, managing packages and running scripts.",
   "Python's basic types are `int` (whole numbers), `float` (decimals), `str` (text, in single or double quotes), `bool` (`True` or `False`) and `None` (no value). Variables are created by assignment and are dynamically typed, so `port = 22` makes an int. Convert with `int('22')`, `str(22)` and `float()`. f-strings format text: `f'{host} uses port {port}'`. Indentation, conventionally four spaces, defines code blocks, so inconsistent indentation is a syntax error rather than a style issue.",
   "Collections are where Python shines. A list is an ordered, changeable sequence: `hosts = ['web01', 'web02']`, with `hosts.append('db01')`, `hosts[0]` and slicing like `hosts[1:]`. A tuple is an ordered but unchangeable sequence: `('10.0.0.1', 22)`. A set is an unordered collection of unique items, ideal for removing duplicates and comparing groups: `set(ips)` deduplicates, and `a - b` (difference), `a & b` (intersection) and `a | b` (union) answer questions like 'which users exist on server A but not B'. Membership tests with `in` are fast on sets. A dictionary (dict) maps keys to values: `ports = {'ssh': 22, 'https': 443}`, read with `ports['ssh']` or `ports.get('ftp', 0)` to avoid an error when a key is missing, and loop with `for name, num in ports.items():`. JSON data from APIs maps naturally onto dicts and lists via the `json` module.",
   "Control flow reads like Bash with colons and indentation: `if`/`elif`/`else`, `for item in collection:`, `while condition:`, and functions with `def name(args):` and `return`. Handle errors with `try:`/`except FileNotFoundError:` rather than letting a script crash. Useful standard library modules for admins include `os` and `pathlib` (files and paths), `subprocess` (run commands, preferably with an argument list rather than `shell=True` to avoid injection), `sys` (arguments in `sys.argv`, exit codes with `sys.exit(1)`), `json`, `re` (regular expressions), `logging` and `argparse` (command-line options).",
   "A virtual environment isolates a project's packages from the system Python and from other projects. `python3 -m venv .venv` creates one, `source .venv/bin/activate` activates it (your prompt changes), and `deactivate` leaves it. While active, `pip install requests` installs into the venv only. `pip freeze > requirements.txt` records exact versions and `pip install -r requirements.txt` recreates them elsewhere. Installing packages into the system Python with sudo can break distribution tools that depend on it, which is why many distributions now block it.",
   "Run a script with `python3 script.py`, or add a shebang `#!/usr/bin/env python3`, make it executable and run `./script.py`. For a venv-specific script, point the shebang or command at `.venv/bin/python`. The common guard `if __name__ == '__main__':` runs main code only when the file is executed directly, not when imported. `python3 -m module` runs a module as a script, and `python3` alone opens an interactive prompt for quick experiments."
  ],
  "terms": [
   [
    "list vs tuple",
    "A list is an ordered, mutable sequence; a tuple is ordered but immutable."
   ],
   [
    "set",
    "An unordered collection of unique items supporting union, intersection and difference."
   ],
   [
    "dict",
    "A mapping of unique keys to values, such as {'ssh': 22}."
   ],
   [
    "venv",
    "Python's built-in tool for creating isolated virtual environments with their own packages."
   ],
   [
    "requirements.txt",
    "A file listing package versions so pip can reproduce an environment."
   ]
  ],
  "example": "You must find accounts present on the old file server but missing on the new one. A short Python script reads usernames from each server's getent passwd output into two sets and prints sorted(old - new). Running it from a venv with the paramiko package installed lets it gather both lists over SSH in one step.",
  "tip": "Pick the data type by need: a set for uniqueness and comparisons, a dict for key-value lookups, a list when order and duplicates matter.",
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
   ]
  ]
 },
 {
  "t": "Git: clone, branch/switch, add, commit, merge, rebase, revert, pull requests",
  "body": [
   "Git is a distributed version control system: every copy of a repository contains the full history, and you record changes as commits. Admins use Git for scripts, configuration management code, infrastructure definitions and documentation, and it underpins GitOps and CI/CD. Linux+ expects everyday Git fluency.",
   "Git has three areas: the working tree (your files), the staging area or index (changes prepared for the next commit) and the repository history. `git clone <url>` copies a remote repository, including history, and sets up a remote named `origin`. `git init` starts a new repository. `git status` shows what changed and what is staged, and `git diff` shows unstaged changes (`git diff --staged` for staged ones). Set your identity once with `git config --global user.name` and `user.email`.",
   "`git add file` stages changes, `git add -p` lets you stage parts of files, and `git commit -m 'message'` records the staged snapshot with a message. Write messages that explain why the change was made. `git log --oneline --graph` shows history. `git push` sends commits to the remote and `git pull` fetches and integrates remote changes; `git fetch` only downloads without changing your branch. A `.gitignore` file lists files Git should not track, such as build output or local secrets.",
   "Branches are lightweight pointers that let you work on changes in isolation. `git branch` lists branches, `git branch feature-x` creates one, and `git switch feature-x` moves to it (`git switch -c feature-x` does both). The older `git checkout` does the same and more. Keep the main branch stable and do work in short-lived feature branches.",
   "There are two ways to combine branches. `git merge feature-x`, run from main, joins the histories; if main has not moved, it is a fast-forward, otherwise Git creates a merge commit with two parents. `git rebase main`, run from the feature branch, replays your commits on top of the latest main, producing a linear history but new commit IDs. Because rebasing rewrites history, never rebase commits others have already pulled. Either can produce conflicts when both sides changed the same lines; Git marks them with `<<<<<<<`, `=======` and `>>>>>>>` in the file, you edit to the correct result, `git add` it, and continue with `git commit` or `git rebase --continue`.",
   "Undoing changes also comes in two styles. `git revert <commit>` creates a new commit that reverses an earlier one, safe for shared branches because history is preserved. `git reset` moves the branch pointer backward (`--soft` keeps changes staged, `--hard` discards them), which rewrites history and is for local, unpushed work. `git restore file` discards uncommitted edits to a file, and `git stash` temporarily shelves work in progress.",
   "A pull request (called a merge request on some platforms) is not a Git command but a hosting-platform workflow: you push a branch and ask for it to be merged. Teammates review the diff, automated CI checks run, and once approved the branch is merged. Branch protection rules can require reviews and passing checks, bringing change control to infrastructure code."
  ],
  "terms": [
   [
    "Commit",
    "A recorded snapshot of staged changes with an author, timestamp, message and parent reference."
   ],
   [
    "Staging area",
    "The index where changes are prepared with git add before committing."
   ],
   [
    "merge vs rebase",
    "merge joins histories, possibly with a merge commit; rebase replays commits onto a new base for linear history."
   ],
   [
    "git revert",
    "Creates a new commit undoing an earlier one without rewriting history."
   ],
   [
    "Pull request",
    "A platform workflow requesting review and merge of a branch, typically gated by CI checks."
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
   ]
  ]
 },
 {
  "t": "Ansible: inventory, ad hoc commands, playbooks, idempotence, roles, ansible-vault",
  "body": [
   "Ansible is an agentless configuration management and automation tool. A control node connects to managed hosts over SSH (or WinRM for Windows), pushes small modules, runs them and removes them. Nothing needs to be installed on managed Linux hosts except SSH and Python, which makes Ansible easy to adopt. Linux+ uses it as the main example of automated configuration.",
   "The inventory lists the hosts Ansible manages and groups them. It can be INI or YAML, for example `/etc/ansible/hosts` or a project `inventory` file:",
   "```ini\n[web]\nweb01.example.com\nweb02.example.com\n\n[db]\ndb01.example.com ansible_user=admin\n```",
   "Groups let you target many hosts at once, and the special group `all` includes every host. Variables can be set per host, per group or in `group_vars/` and `host_vars/` directories. Dynamic inventories query clouds or CMDBs (configuration management databases) for current hosts. `ansible-inventory --graph` shows the structure, and `ansible.cfg` sets defaults like the inventory path and remote user.",
   "Ad hoc commands run a single module for quick tasks: `ansible all -m ping` tests connectivity (an Ansible module check, not ICMP), `ansible web -m ansible.builtin.dnf -a 'name=nginx state=present' -b` installs a package with privilege escalation (`-b` means become, usually sudo), and `ansible db -a 'uptime'` uses the command module by default.",
   "Playbooks are YAML files describing desired state as plays and tasks. Each play targets hosts, and each task calls a module with parameters. Handlers are tasks that run only when notified by a change, such as restarting a service after its configuration file changes. Run a playbook with `ansible-playbook site.yml`; `--check` does a dry run, `--diff` shows file changes, `--syntax-check` validates, and `--limit web01` restricts targets. Output reports each task as ok (already correct), changed or failed. Idempotence is the key idea: running the same playbook again should change nothing if the system is already in the desired state. Modules like `dnf`, `apt`, `copy`, `template`, `user`, `service` and `lineinfile` check the current state first and act only if needed. The `command` and `shell` modules are not idempotent by themselves, so prefer purpose-built modules or add guards such as `creates:`.",
   "Roles package reusable automation into a standard directory structure: `tasks/`, `handlers/`, `templates/` (Jinja2 templates), `files/`, `vars/`, `defaults/` and `meta/`. `ansible-galaxy init myrole` creates the skeleton, and collections from Ansible Galaxy bundle roles and modules for reuse. A playbook applies roles with a `roles:` list.",
   "Secrets such as passwords and API keys should never sit in plain text in a repository. `ansible-vault create secrets.yml`, `edit`, `encrypt`, `decrypt` and `view` manage AES-encrypted files, and `ansible-playbook site.yml --ask-vault-pass` or `--vault-password-file` supplies the key at run time. `ansible-vault encrypt_string` encrypts a single value inside an otherwise plain file."
  ],
  "terms": [
   [
    "Inventory",
    "The list of managed hosts and groups, with optional variables, that Ansible targets."
   ],
   [
    "Ad hoc command",
    "A one-off ansible command running a single module against hosts, such as ansible all -m ping."
   ],
   [
    "Playbook",
    "A YAML file of plays and tasks describing the desired state of hosts."
   ],
   [
    "Idempotence",
    "The property that repeated runs produce the same result and make no changes once the state is correct."
   ],
   [
    "ansible-vault",
    "A tool that encrypts files or strings containing secrets used by Ansible."
   ]
  ],
  "example": "To roll out a hardened sshd_config to 60 servers, you write a role with a template task that notifies a 'reload sshd' handler. The first ansible-playbook run reports changed on every host; a second run reports only ok, proving idempotence. The shared admin password used by one task is stored in a vault-encrypted group_vars file.",
  "tip": "Ansible is agentless and push-based over SSH; when a question contrasts it with Puppet or Chef, that difference is usually the point.",
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
   ]
  ]
 },
 {
  "t": "Puppet and other agent-based tools; OpenTofu/Terraform plan and apply",
  "body": [
   "Configuration management and infrastructure provisioning are related but different jobs. Configuration management tools keep the software and settings inside existing servers correct. Infrastructure as code (IaC) provisioning tools create the servers, networks and cloud resources themselves. Linux+ expects you to know examples of each and how they operate.",
   "Puppet is a classic agent-based configuration management tool. A Puppet agent runs on each managed node and periodically, by default every 30 minutes, contacts a Puppet server (historically called the master). The agent sends facts about the node, gathered by a tool called Facter, and receives a compiled catalog describing its desired state. It then enforces that state and reports back. This pull model means nodes correct drift automatically on each run, even if nobody launches a job. Puppet code is written in a declarative DSL (domain-specific language) in manifests (`.pp` files), grouped into modules, with resources such as `package`, `file`, `service` and `user`. Agents and server authenticate with certificates. `puppet agent -t` triggers a run immediately and shows what changed.",
   "Chef is another agent-based tool, using Ruby-based recipes and cookbooks, and SaltStack (Salt) uses minions that connect to a master, though it can also run agentless. Compared with Ansible, agent-based tools need software installed and maintained on every node and a central server, but they scale well and enforce state continuously. Ansible is agentless and push-based: nothing runs until you execute a playbook.",
   "Terraform, from HashiCorp, and OpenTofu, an open-source fork maintained under the Linux Foundation, are declarative IaC provisioning tools that share the same language and workflow. You describe resources such as virtual machines, networks, DNS records and load balancers in HCL (HashiCorp Configuration Language) files ending in `.tf`. Providers are plug-ins that talk to specific platforms, such as a cloud provider or a hypervisor.",
   "The workflow uses a few commands (`tofu` for OpenTofu, `terraform` for Terraform). `init` downloads providers and prepares the working directory. `fmt` and `validate` tidy and check the code. `plan` compares the configuration with the recorded state and the real infrastructure, and shows exactly what will be created (+), changed (~) or destroyed (-), without changing anything. Review the plan carefully, especially any destroy. `apply` performs the changes, prompting for confirmation unless auto-approved, and `destroy` removes everything the configuration manages.",
   "Both tools keep a state file that maps configuration to real resource IDs. State can contain sensitive values, so teams store it in a secured remote backend with locking to prevent two people applying at once, rather than committing it to Git. Changes made outside the tool create drift, which the next plan will reveal and try to reverse.",
   "In practice the tools combine: OpenTofu or Terraform provisions the VMs and network, then Ansible or Puppet configures the operating system and applications inside them, all stored in Git and run through a pipeline."
  ],
  "terms": [
   [
    "Agent-based configuration management",
    "Tools like Puppet or Chef where an agent on each node pulls and enforces desired state from a server."
   ],
   [
    "Puppet catalog",
    "The compiled desired-state description a Puppet server sends an agent, based on manifests and node facts."
   ],
   [
    "Infrastructure as code",
    "Defining infrastructure in version-controlled files that tools use to create and change resources."
   ],
   [
    "plan",
    "OpenTofu/Terraform command that previews the changes needed to reach the declared configuration."
   ],
   [
    "State file",
    "OpenTofu/Terraform's record of managed resources, stored securely, often in a locked remote backend."
   ]
  ],
  "example": "Before a change to the load balancer configuration, a pipeline runs tofu plan, which shows one resource to change and, unexpectedly, one to destroy. A reviewer catches that a renamed resource would delete the production database's DNS record, fixes the code to move the resource in state instead, and only then approves tofu apply.",
  "tip": "Distinguish the models: Puppet is agent-based and pull; Ansible is agentless and push; OpenTofu/Terraform provision infrastructure, and plan previews while apply makes changes.",
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
   ]
  ]
 },
 {
  "t": "CI/CD pipelines and GitOps concepts",
  "body": [
   "Once scripts, configuration and infrastructure live in Git, you can automate how changes are tested and delivered. CI/CD (continuous integration and continuous delivery or deployment) pipelines do this, and GitOps extends the idea so that Git becomes the single source of truth for what should be running. Linux+ covers the concepts and vocabulary.",
   "Continuous integration means developers merge small changes into a shared branch frequently, and every change triggers an automated build and test run. For admin code that might include linting shell scripts with ShellCheck, running `ansible-lint` or `yamllint`, `tofu validate` and `plan`, building container images, running unit tests and scanning for vulnerabilities or accidentally committed secrets. Problems are caught within minutes of being introduced, when they are cheapest to fix.",
   "Continuous delivery means every change that passes the pipeline is packaged and ready to release, with a human approval gate before production. Continuous deployment goes one step further and releases automatically when all checks pass. Deployments usually progress through environments, such as development, staging and production, and use strategies that limit risk: rolling updates replace instances gradually, blue-green deployments switch traffic between two identical environments, and canary releases send a small share of traffic to the new version first. Every pipeline should also make rollback easy.",
   "A pipeline is defined as code, usually a YAML file stored in the repository, such as a GitLab CI file, a GitHub Actions workflow or a Jenkinsfile. It is made of stages (build, test, deploy) containing jobs that run on runners or agents, often inside containers. Jobs are triggered by events such as a push, a pull request or a schedule, and they produce artifacts, such as a built package or container image, passed to later stages. Secrets like deployment keys are stored in the CI system's protected variables or a secrets manager, never in the repository, and runners should have only the permissions they need.",
   "GitOps applies these ideas to operations. The desired state of the system, for example Kubernetes manifests or infrastructure definitions, is declared in a Git repository. Changes are made only by pull requests, which gives review, approval and a complete audit trail. An automated agent, such as Argo CD or Flux in Kubernetes, continuously compares the live system with the repository and reconciles any difference. In this pull-based model, the cluster fetches its configuration rather than a pipeline pushing credentials into it.",
   "The benefits are consistency, traceability and fast recovery. Rolling back is as simple as reverting a commit, and manual changes made directly on the system (drift) are detected and undone automatically. The discipline is that nobody edits production by hand: if it is not in Git, it does not exist."
  ],
  "terms": [
   [
    "Continuous integration",
    "Automatically building and testing every change merged to a shared repository."
   ],
   [
    "Continuous delivery vs deployment",
    "Delivery keeps every passing change release-ready with a manual gate; deployment releases it automatically."
   ],
   [
    "Pipeline",
    "A version-controlled definition of stages and jobs that build, test and deploy code."
   ],
   [
    "GitOps",
    "An operating model where Git holds declared desired state and automated agents reconcile systems to match it."
   ],
   [
    "Drift",
    "Differences between the live system and the declared configuration, usually from manual changes."
   ]
  ],
  "example": "A team manages its Kubernetes applications with GitOps. An engineer opens a pull request raising a deployment's replica count; the CI pipeline validates the YAML and runs policy checks, a colleague approves, and after the merge Argo CD notices the new commit and scales the deployment. When someone later edits the replica count by hand in the cluster, Argo CD flags the drift and restores the Git version.",
  "tip": "In GitOps the rollback answer is almost always 'revert the commit in Git', not 'fix it directly on the server or cluster'.",
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
   ]
  ]
 },
 {
  "t": "Responsible use of AI tools for scripting: review, testing, keeping secrets out of prompts",
  "body": [
   "AI assistants can draft a Bash script, explain an unfamiliar awk one-liner or suggest an Ansible task in seconds. Used well, they save time and help you learn. Used carelessly, they can introduce subtle bugs, security holes or data leaks into systems you are responsible for. The current Linux+ objectives recognize this, so expect questions about using these tools responsibly.",
   "Start from the right mindset: you remain accountable for every command you run, whoever or whatever wrote it. AI-generated code can look confident and still be wrong. Common problems include options that do not exist or behave differently on your distribution, outdated syntax, missing error handling, unquoted variables, commands that assume a different package manager, and references to packages or modules that do not exist at all. A plausible but invented package name is a particular risk, because an attacker could publish a malicious package under that name.",
   "Review generated code line by line before running it. Make sure you understand what each command does, check unfamiliar options in the man page or `--help`, and look closely at anything destructive or privileged: `rm -rf`, `dd`, `mkfs`, `chmod -R 777`, disabling SELinux or the firewall, `curl ... | bash`, or broad sudo rules. Ask whether the approach follows your organization's standards. If the explanation and the code disagree, trust neither until you have checked.",
   "Test before production. Run scripts through `bash -n` and ShellCheck, Ansible through `ansible-lint` and `--check --diff`, and OpenTofu or Terraform through `validate` and `plan`. Execute in a disposable VM, container or lab environment first, with sample data, and test failure cases as well as the happy path. Commit the code to Git and send it through the same pull request review and CI pipeline as human-written code, so another person and automated checks see it too. Note in the commit or review that an AI tool assisted, if your organization's policy asks for that.",
   "Keep secrets and sensitive data out of prompts. Anything you paste into an external AI service may be stored, logged or reviewed outside your control, depending on the provider and its terms. Never include passwords, private keys, API tokens, session cookies, `/etc/shadow` contents, customer data or personal information. Also be careful with less obvious sensitive details: internal hostnames and IP addresses, full configuration files, and logs that contain usernames or tokens. Replace them with placeholders such as `<API_TOKEN>` or `example.internal` before asking, and strip real values from error messages. Check whether your organization provides an approved AI tool with suitable data-handling agreements, and follow its acceptable use policy.",
   "Finally, protect generated code the same way as any other code: read secrets at run time from environment variables, vault-encrypted files or a secrets manager rather than hard-coding them, and grant scripts only the privileges they need. The goal is to use AI as a knowledgeable assistant whose work you verify, not as an authority whose output you run unread."
  ],
  "terms": [
   [
    "Human in the loop",
    "The practice of having a person review and approve AI-generated output before it is used."
   ],
   [
    "Hallucination",
    "AI output that sounds plausible but is factually wrong, such as a nonexistent command option or package."
   ],
   [
    "Prompt data leakage",
    "Exposure of sensitive information by including it in prompts sent to an external AI service."
   ],
   [
    "Sanitization",
    "Replacing secrets and identifying details with placeholders before sharing text or code."
   ],
   [
    "Acceptable use policy",
    "An organization's rules for which tools may be used and what data may be shared with them."
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
   ]
  ]
 },
 {
  "t": "Storage issues: full disks, inode exhaustion (df -i), deleted-but-open files (lsof +L1), fsck/xfs_repair",
  "body": [
   "Storage problems are among the most common Linux incidents: services fail to start, logs stop being written, databases crash and users cannot save work. The symptoms often look alike, usually 'No space left on device', so you need a systematic way to find the real cause.",
   "Start with `df -h` to see which filesystem is full. Then drill down with `du`: `du -xh --max-depth=1 /var | sort -h` lists the largest directories on that filesystem only (`-x` stays on one filesystem). `find /var -xdev -type f -size +500M` finds large files. Common culprits are runaway logs, core dumps, old kernels in `/boot`, package caches (`dnf clean all`, `apt clean`), container images and volumes, and forgotten backups. Remember that ext4 reserves a percentage of blocks for root by default (adjustable with `tune2fs -m`), so a filesystem can be full for users while root can still write.",
   "Inode exhaustion is the classic trick question. Each file uses one inode, and on ext4 the number of inodes is fixed when the filesystem is created. If millions of tiny files, such as session files or mail queue entries, use up every inode, you get 'No space left on device' even though `df -h` shows plenty of free space. `df -i` shows inode usage; at 100 percent `IUse%` you have found the cause. Find the directories with the most files, for example with `find /var -xdev -type f | cut -d/ -f2-4 | sort | uniq -c | sort -rn | head`, then delete or archive the unneeded files and fix whatever creates them. XFS allocates inodes dynamically, so it is less prone to this.",
   "Deleted-but-open files explain why `df` and `du` disagree. When you delete a file that a process still has open, the name disappears, so `du` no longer counts it, but the kernel keeps the data blocks until the last process closes the file, so `df` still shows the space used. This often happens when someone deletes a huge log instead of rotating it. `lsof +L1` lists open files whose link count is below one, meaning deleted; `lsof | grep deleted` works too. The fix is to restart or reload the process holding it (or have it reopen its logs). In an emergency, truncating the file through `/proc/<PID>/fd/<N>` frees space, but restarting the service is the clean solution. Use `logrotate` or truncate with `> file` instead of `rm` for active logs.",
   "Filesystem corruption, after a crash, power loss or failing disk, is repaired with check tools, and they must run on unmounted filesystems (or the root filesystem at boot or from rescue media) to avoid causing more damage. For ext2/3/4, `fsck /dev/sdb1` calls `e2fsck`; `-y` answers yes to fixes and `-f` forces a check. Setting the sixth fstab field makes boot-time checks happen automatically. For XFS, `fsck` does nothing useful; use `xfs_repair /dev/sdb1` on the unmounted device. If it complains about a dirty log, mounting and cleanly unmounting the filesystem replays the log; `xfs_repair -L` zeroes the log but can lose recent changes, so it is a last resort. Btrfs uses `btrfs scrub` and `btrfs check`. Always check the disk's health (SMART data, kernel messages) too, because corruption may be a symptom of failing hardware."
  ],
  "terms": [
   [
    "Inode exhaustion",
    "A filesystem running out of inodes, blocking new files even though free space remains; seen with df -i."
   ],
   [
    "Deleted-but-open file",
    "A file whose name was removed while a process still holds it open, so its space is not freed."
   ],
   [
    "lsof +L1",
    "Lists open files with a link count below one, revealing deleted files still consuming space."
   ],
   [
    "fsck / e2fsck",
    "Filesystem check and repair tools for ext-family filesystems, run on unmounted devices."
   ],
   [
    "xfs_repair",
    "The repair tool for XFS filesystems; fsck is not used for XFS."
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
   ]
  ]
 },
 {
  "t": "Performance: load average, top/htop, vmstat, iostat, sar, free, OOM killer",
  "body": [
   "When users say a server is slow, you need to find which resource is the bottleneck: CPU, memory, disk I/O or something else. The approach is to observe first, identify the constrained resource, then find the process responsible. Each tool below answers part of that question.",
   "Load average appears in `uptime`, `top` and `/proc/loadavg` as three numbers: the average over 1, 5 and 15 minutes. On Linux it counts processes that are running or waiting for a CPU, plus those in uninterruptible sleep (usually waiting on disk or network storage). Interpret it relative to the number of CPU cores, shown by `nproc`: a load of 4 on a 4-core machine means roughly fully busy, while 12 on the same machine means work is queuing. Comparing the three values tells you whether load is rising or falling. A high load with low CPU use usually points to I/O waits.",
   "`top` shows a live summary and per-process usage. In the CPU line, `us` is user time, `sy` system (kernel) time, `id` idle, `wa` time waiting on I/O and `st` time stolen by the hypervisor on virtual machines. Sort by memory with `M` and CPU with `P`, and press `1` to show each CPU separately. `htop` presents the same data with colored per-core bars, easier scrolling and tree views.",
   "`free -h` shows memory use. Linux uses spare RAM for page cache to speed up disk access, so low 'free' memory is normal; the important column is 'available', an estimate of memory that can be given to applications without swapping. Heavy swap use, visible in `free` and in `vmstat`, means real memory pressure. `vmstat 2` prints a line every two seconds: `r` is the run queue (processes waiting for CPU), `b` processes blocked on I/O, `si` and `so` swap in and out, `bi` and `bo` blocks read and written, and CPU percentages including `wa`. Sustained non-zero si/so indicates memory pressure; high `wa` with many `b` suggests a storage bottleneck.",
   "`iostat -xz 2`, from the sysstat package, shows per-device statistics: read and write operations and throughput, average wait time (`await`) and `%util`, how busy the device is. A disk near 100 percent utilization with rising await is saturated. `iotop` shows which processes are doing the I/O. `sar`, also from sysstat, collects performance data periodically in the background, so you can look at history: `sar -u` for CPU, `sar -r` for memory, `sar -b` or `sar -d` for I/O, `sar -n DEV` for network, and `sar -f` to read a specific day's file. That is invaluable when the problem happened overnight.",
   "When memory and swap are exhausted, the kernel's OOM (out-of-memory) killer chooses a process to kill to keep the system alive, based on a badness score that favors large memory users. You will see messages such as 'Out of memory: Killed process 1234 (java)' in `dmesg` or `journalctl -k`. Each process's score is in `/proc/<PID>/oom_score`, and `oom_score_adj` (from -1000 to 1000) biases the choice, so critical services can be protected (systemd units use `OOMScoreAdjust=`). The real fixes are adding memory, fixing leaks, limiting services with cgroup settings such as `MemoryMax=`, or tuning the application."
  ],
  "terms": [
   [
    "Load average",
    "Average number of runnable plus uninterruptible processes over 1, 5 and 15 minutes; compare it to the core count."
   ],
   [
    "I/O wait (wa)",
    "CPU time spent idle while waiting for storage I/O to complete."
   ],
   [
    "Available memory",
    "free's estimate of memory usable by new workloads without swapping, including reclaimable cache."
   ],
   [
    "sar",
    "sysstat tool that records and reports historical CPU, memory, disk and network statistics."
   ],
   [
    "OOM killer",
    "Kernel mechanism that kills a process when the system runs out of memory, logged in the kernel log."
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
   ]
  ]
 },
 {
  "t": "Networking: ping, ip route, ss, dig/resolvectl, traceroute/tracepath/mtr, tcpdump, nmap",
  "body": [
   "Network troubleshooting goes fastest when you work through the layers in order: is the interface up with the right address, can you reach the gateway, does routing work, does name resolution work, and is the service actually listening and allowed through? Each tool below answers one of those questions.",
   "Start locally with `ip a` (address and link state) and `ip route` (routing table). The line beginning `default via` is the default gateway; without it, only directly connected networks are reachable. `ip route get 8.8.8.8` shows exactly which route and interface a packet to that address would use. Then `ping` tests reachability with ICMP (Internet Control Message Protocol) echo: `ping -c 4 192.168.1.1` for the gateway, then a remote IP, then a hostname. If an IP works but a name fails, the problem is DNS. Remember that many firewalls block ICMP, so a failed ping does not prove a host is down.",
   "Name resolution is tested with `dig`: `dig example.com` shows the answer, the TTL and which server replied, `dig @8.8.8.8 example.com` asks a specific server, `dig -x 203.0.113.10` performs a reverse lookup, `dig MX example.com` asks for mail records and `+short` trims output. `nslookup` and `host` are simpler alternatives. On systems using systemd-resolved, `resolvectl status` shows the DNS servers per interface and `resolvectl query name` resolves through the system resolver, while `resolvectl flush-caches` clears its cache. `getent hosts name` follows nsswitch.conf, so it includes /etc/hosts.",
   "Path tools show where packets stop. `traceroute host` lists each router hop using increasing TTL (time to live) values; `traceroute -T -p 443` uses TCP to get through firewalls that block the defaults. `tracepath` does a similar job without root privileges and reports path MTU (maximum transmission unit). `mtr host` combines ping and traceroute in a continuously updating view with loss and latency per hop, which is excellent for intermittent problems. Asterisks for a hop can simply mean that router does not reply, so look at where loss continues to the end.",
   "`ss` shows sockets and replaced the older `netstat`. `ss -tulpn` lists listening TCP and UDP ports with numeric addresses and the owning process; `ss -tan` shows all TCP connections with their states, such as ESTABLISHED or TIME-WAIT. A service listening on `127.0.0.1:8080` accepts only local connections, whereas `0.0.0.0:8080` or `*:8080` listens on all interfaces, which is a very common reason a service is unreachable from other hosts.",
   "`tcpdump` captures packets for deep inspection: `tcpdump -i eth0 -nn port 53` shows DNS traffic without resolving names, `host 10.0.0.5` filters by address, and `-w capture.pcap` saves to a file for analysis in Wireshark. Seeing requests leave but no replies arrive, or TCP resets, quickly separates local from remote problems. `nmap` scans hosts to find which ports are open, closed or filtered: `nmap -p 22,80,443 server` checks specific ports, and `nmap -sV` identifies service versions. Scanning from another host shows what the network really allows through firewalls. Only scan systems you own or are authorized to test, since unauthorized scanning can violate policy and law."
  ],
  "terms": [
   [
    "Default route",
    "The routing table entry (default via ...) used for destinations not matched by any more specific route."
   ],
   [
    "ss",
    "Socket statistics tool that lists listening ports and connections; ss -tulpn is the common form."
   ],
   [
    "dig",
    "DNS query tool showing records, TTLs and which server answered."
   ],
   [
    "mtr",
    "Combines traceroute and ping to show per-hop loss and latency continuously."
   ],
   [
    "tcpdump",
    "Command-line packet capture tool using filters such as host, port and protocol."
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
   ]
  ]
 },
 {
  "t": "Boot problems: GRUB menu, previous kernels, emergency and rescue targets, fstab errors",
  "body": [
   "A system that will not boot is stressful, but most failures fall into a few categories. Match what you see on the console to the boot stage, then use the right recovery path. Linux+ scenarios usually describe the message and ask for the next step.",
   "If you get no boot loader at all, or a message such as 'no bootable device', the problem is before Linux starts: wrong firmware boot order, a missing or damaged EFI System Partition or MBR boot code, or a failed disk. Boot from installation or rescue media, mount the installed system, use `chroot` into it, and reinstall the boot loader with `grub2-install` or `grub-install` for BIOS systems (on UEFI systems, reinstalling the shim and GRUB packages or fixing entries with `efibootmgr` is common), then regenerate the configuration. If GRUB loads but drops to a `grub>` or `grub rescue>` prompt, it cannot find its configuration or modules, often after a partition change.",
   "The GRUB menu is your main recovery tool. If it is hidden, hold Shift (BIOS) or press Esc (UEFI) during boot to show it. A kernel update that causes a panic or missing driver can usually be bypassed by choosing a previous kernel entry, since distributions keep several installed kernels for exactly this reason. Once booted, you can make the working kernel the default (for example with `grubby --set-default` on RHEL-family systems), remove the bad kernel, or rebuild its initramfs with `dracut -f --kver <version>` if the image was incomplete. A 'kernel panic - not syncing: VFS: unable to mount root fs' message points to a wrong `root=` argument or an initramfs missing storage drivers.",
   "To change boot behavior once, press `e` on a menu entry, edit the line beginning with `linux`, and press Ctrl+X. Adding `systemd.unit=rescue.target` gives a single-user root shell with local filesystems mounted and minimal services; it asks for the root password. `systemd.unit=emergency.target` is more minimal: the root filesystem is mounted read-only and almost nothing else starts, which is useful when rescue mode itself fails. To regain access when the root password is lost, you can add `rd.break` (RHEL-family, stopping in the initramfs) or `init=/bin/bash`, remount the root filesystem read-write, reset the password, and on SELinux systems create `/.autorelabel` so labels are fixed on the next boot. Protect GRUB with a password so others cannot do the same.",
   "Errors in `/etc/fstab` are one of the most common boot failures. A typo in a UUID, a device that no longer exists, or a wrong filesystem type causes systemd to wait for the device, time out, and drop you into emergency mode with a message such as 'Give root password for maintenance'. Log in, run `journalctl -xb` to see which mount failed, then `mount -o remount,rw /` so you can edit, fix or comment out the bad line, and confirm with `mount -a` and `findmnt --verify` before rebooting. Adding `nofail` to non-essential mounts prevents a missing disk from stopping the boot.",
   "After recovery, review `journalctl -b -1` for the failed boot to confirm the cause, and use `systemd-analyze blame` to see which units slow the boot."
  ],
  "terms": [
   [
    "GRUB rescue prompt",
    "A minimal GRUB shell shown when GRUB cannot find its configuration or modules."
   ],
   [
    "Previous kernel",
    "An older installed kernel selectable in GRUB to recover from a faulty kernel update."
   ],
   [
    "rescue.target",
    "A single-user systemd target with local filesystems mounted and minimal services."
   ],
   [
    "emergency.target",
    "The most minimal systemd target, with a read-only root filesystem and almost no services."
   ],
   [
    "chroot",
    "Changes the apparent root directory so you can repair an installed system from rescue media."
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
   ]
  ]
 },
 {
  "t": "Service failures: systemctl status exit codes, journalctl, dependencies, port conflicts",
  "body": [
   "When a service will not start or keeps dying, the answer is almost always in its status and logs. A consistent routine, status then logs then configuration then dependencies and environment, resolves most failures quickly.",
   "`systemctl status name` is step one. The Active line shows states such as `active (running)`, `inactive (dead)`, `activating (auto-restart)` or `failed`, with a `Result:` such as `exit-code`, `signal`, `timeout` or `start-limit-hit`. The process line shows how the main process ended, for example `code=exited, status=1/FAILURE`. Exit statuses from 200 upward are set by systemd itself and point to setup problems before the program even ran: `203/EXEC` means the executable in `ExecStart=` was missing, not executable or had a bad interpreter; `217/USER` means the `User=` account does not exist; `200/CHDIR` a bad working directory; `226/NAMESPACE` a problem setting up sandboxing paths. A status of 1 or 2 is usually the application reporting its own error, and `signal=SEGV` or `KILL` means the process was killed by a signal, possibly the OOM killer. `start-limit-hit` means systemd stopped retrying after too many restarts in a short time; fix the cause, then `systemctl reset-failed name`.",
   "Next, read the logs. `journalctl -u name -b` shows the unit's messages from this boot, `-e` jumps to the end, `-x` adds explanations and `-f` follows while you restart it in another terminal. Many applications also write their own logs under `/var/log/<app>/`. Configuration syntax errors are the most frequent cause, so use the application's own checker before restarting: `nginx -t`, `apachectl configtest`, `sshd -t`, `named-checkconf`, `postfix check` and similar.",
   "Dependencies matter because units start in an order defined by `Requires=`, `Wants=`, `After=` and `Before=`. If a required unit fails, the dependent unit fails too, with a message like 'Dependency failed'. `systemctl list-dependencies name` shows the tree and `systemctl list-dependencies --reverse name` shows what depends on it. A common case is a service that needs the network or a mount: it should declare `After=network-online.target` and `Wants=network-online.target`, or `RequiresMountsFor=/data`. A masked unit reports that it is masked and cannot start until unmasked.",
   "Port conflicts cause errors such as 'Address already in use' or 'bind() failed'. Only one process can listen on a given address and port. `ss -tlpn 'sport = :80'` or `ss -tlpn | grep :80` identifies which process holds the port; `lsof -i :80` also works. Resolve it by stopping or disabling the other service, or moving one to a different port. On SELinux systems a non-standard port also needs a label with `semanage port`, or the bind is denied even when nothing else is listening; check `ausearch -m avc` if the error is 'Permission denied'.",
   "Also check permissions and resources: the service user must be able to read its config and write its data, log and PID directories; the disk must not be full; and required environment files must exist. After fixing unit files, remember `systemctl daemon-reload`."
  ],
  "terms": [
   [
    "203/EXEC",
    "systemd exit status meaning the ExecStart program could not be executed (missing, not executable or bad interpreter)."
   ],
   [
    "start-limit-hit",
    "A failure result meaning the unit restarted too often in a short interval; cleared with systemctl reset-failed."
   ],
   [
    "Requires= / After=",
    "Unit dependency settings: Requires sets a hard dependency; After sets start ordering only."
   ],
   [
    "Address already in use",
    "A bind error indicating another process is already listening on that port."
   ],
   [
    "Config test",
    "An application's own syntax check, such as nginx -t or sshd -t, run before restarting a service."
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
   ]
  ]
 },
 {
  "t": "Security issues: SELinux denials, file permissions, SSH key permissions, locked accounts",
  "body": [
   "Many 'it just stopped working' tickets are really security controls doing their job: SELinux blocking an unexpected access, permissions that are too tight or too loose, SSH refusing a key, or an account locked after failed logins. The skill is to identify which control is responsible and fix the configuration without weakening security.",
   "SELinux denials often surface as 'Permission denied' or HTTP 403 errors even though normal permissions look correct. First confirm SELinux is involved: `getenforce` shows the mode, and `ausearch -m avc -ts recent` (or `journalctl -t setroubleshoot`, or `sealert -a /var/log/audit/audit.log`) shows AVC denials naming the source process type, the target file type and the operation. The usual causes and fixes are: wrong file labels after `mv` or restoring files (fix with `restorecon -Rv path`), content in a non-standard location (add a rule with `semanage fcontext -a -t type 'path(/.*)?'`, then restorecon), a service on a non-standard port (`semanage port -a -t http_port_t -p tcp 8081`), or an optional behavior that needs a boolean (`setsebool -P httpd_can_network_connect on`). Setting permissive mode briefly with `setenforce 0` can confirm SELinux is the cause, but switch back to enforcing and fix the policy issue rather than leaving it off.",
   "File permission problems follow the rules from earlier lessons. The process's user needs read on files, and execute on every directory in the path; check with `namei -l /full/path` and `ls -l`, and see which user a service runs as with `ps -o user= -p PID` or the unit's `User=` setting. Check group membership with `id user`, ACLs with `getfacl`, and mount options like `noexec` with `findmnt`. The fix is the minimal change needed, such as adjusting group ownership or adding an ACL, never `chmod 777`, which creates a new security problem. Also watch for the reverse: files that are too permissive, such as world-writable scripts run by root, private keys readable by others, or configuration files containing passwords.",
   "SSH key authentication fails silently when permissions are loose, because sshd's StrictModes check refuses keys that other users could have tampered with. On the server, the user's home directory must not be group- or world-writable, `~/.ssh` should be 700, and `~/.ssh/authorized_keys` 600, all owned by the user. On the client, the private key must be 600, or ssh refuses to use it with 'UNPROTECTED PRIVATE KEY FILE'. On SELinux systems, an authorized_keys file created in an unusual way may need `restorecon -Rv ~/.ssh`. For diagnosis, run `ssh -v user@host` on the client and read `journalctl -u sshd` (or `/var/log/secure` or `auth.log`) on the server, where messages such as 'Authentication refused: bad ownership or modes' point straight to the cause. Also confirm the key is in the right account's file and that `AllowUsers` or `AllowGroups` permit the user.",
   "Locked or expired accounts produce login failures that look like wrong passwords. Check each possible cause: `faillock --user name` shows lockouts from failed attempts (reset with `--reset` after confirming the attempts were not an attack); `passwd -S name` shows whether the password is locked (`LK` or `L`); `chage -l name` shows password and account expiry dates; the shell in `/etc/passwd` might be `nologin`; and for directory accounts, check SSSD and `id name`. Investigate why an account was locked before unlocking it, because a burst of failures from an unknown IP address may be a brute-force attempt that needs a firewall block or incident report."
  ],
  "terms": [
   [
    "AVC denial",
    "An SELinux access vector cache message recording an operation blocked by policy, logged in the audit log."
   ],
   [
    "StrictModes",
    "An sshd setting (on by default) that rejects keys when home, .ssh or authorized_keys permissions are too open."
   ],
   [
    "namei -l",
    "Shows ownership and permissions of every component in a path, revealing where access is blocked."
   ],
   [
    "faillock",
    "Command that shows and resets failed-login lockouts recorded by pam_faillock."
   ],
   [
    "passwd -S",
    "Displays a user's password status, including whether it is locked."
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
   ]
  ]
 },
 {
  "t": "Hardware: dmesg, lspci, lsusb, smartctl, failing disks and RAID degradation",
  "body": [
   "Hardware problems often masquerade as software bugs: random crashes, filesystem errors, slow I/O or devices that disappear. Linux gives you good visibility into hardware through kernel messages and inventory tools, and the Linux+ exam expects you to use them to confirm or rule out a hardware fault.",
   "The kernel ring buffer records hardware detection, driver messages and errors. `dmesg` prints it, `dmesg -T` shows human-readable timestamps, `dmesg -w` follows new messages, and `dmesg --level=err,warn` filters by severity; `journalctl -k` shows the same kernel messages from the journal, including previous boots with `-b -1`. Look for I/O errors (`blk_update_request: I/O error`, `Buffer I/O error`), ATA or NVMe resets and timeouts, 'Medium Error' messages, filesystem errors from ext4 or XFS, machine check exceptions reporting CPU or memory faults, and USB devices repeatedly connecting and disconnecting. Reading dmesg right after plugging in a device also shows the name it received, such as `sdb`.",
   "Inventory tools identify hardware and drivers. `lspci` lists PCI (Peripheral Component Interconnect) devices such as network cards, storage controllers and GPUs; `lspci -k` shows the kernel driver in use for each, which is the quickest way to spot a device with no driver, and `-nn` adds vendor and device IDs. `lsusb` lists USB devices, with `-t` for a tree and `-v` for detail. Related tools include `lscpu` for CPU details, `lsblk` for block devices, `lshw` or `dmidecode` for a full inventory, including memory module and firmware details, `lsmem` for memory, and `sensors` for temperatures if lm-sensors is installed.",
   "Disks report their own health through SMART (Self-Monitoring, Analysis and Reporting Technology). The `smartctl` tool from smartmontools reads it: `smartctl -H /dev/sda` gives an overall PASSED or FAILED verdict, `smartctl -a /dev/sda` shows all attributes and the error log, and `smartctl -t short /dev/sda` or `-t long` runs a self-test whose results appear later in `-a` output. Warning signs include growing reallocated, pending or offline-uncorrectable sector counts on hard drives, and media errors or low available spare on NVMe drives. A PASSED verdict does not guarantee health, so trends in these counters matter more. The `smartd` service can monitor drives continuously and send alerts.",
   "In software RAID, a failing disk leads to a degraded array: it keeps working using the remaining disks and redundancy, but it has lost protection, so another failure could lose data. `cat /proc/mdstat` shows member status, where `[UU]` means both mirror members are up and `[U_]` means one is missing, and `mdadm --detail /dev/md0` reports the state as clean, degraded or recovering and lists faulty devices. Configure `mdadm --monitor` or the mdmonitor service to email alerts. To replace a disk: `mdadm /dev/md0 --fail /dev/sdb1 --remove /dev/sdb1`, physically swap the drive, copy the partition layout (for example with `sfdisk -d /dev/sda | sfdisk /dev/sdb` or `sgdisk`), then `mdadm /dev/md0 --add /dev/sdb1` and watch the rebuild in /proc/mdstat. For hardware RAID controllers, use the vendor's management utility instead. During a rebuild, the remaining disks are under heavy load, which is another reason to keep current backups."
  ],
  "terms": [
   [
    "dmesg",
    "Displays the kernel ring buffer containing hardware detection, driver and error messages."
   ],
   [
    "lspci -k",
    "Lists PCI devices along with the kernel driver bound to each."
   ],
   [
    "SMART",
    "Self-Monitoring, Analysis and Reporting Technology: drive-reported health data read with smartctl."
   ],
   [
    "Degraded array",
    "A RAID array still serving data after losing a member but without its normal redundancy."
   ],
   [
    "Reallocated sectors",
    "Bad disk sectors remapped to spares; a rising count signals a failing drive."
   ]
  ],
  "example": "A file server logs occasional XFS errors. dmesg -T shows repeated ATA errors on sdc, smartctl -a /dev/sdc reports a rising pending sector count, and /proc/mdstat shows md1 as [U_]. You fail and remove sdc1 from the array, replace the drive, copy the partition table, add the new partition, and monitor the rebuild until the array shows [UU].",
  "tip": "An array showing [U_] in /proc/mdstat is degraded: it still works, but the failed member must be replaced before another disk fails.",
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
   ]
  ]
 },
 {
  "t": "Time sync: chrony, timedatectl, clock skew effects on TLS and Kerberos",
  "body": [
   "Accurate time sounds like a nicety, but many systems depend on it. Log correlation across servers, scheduled jobs, certificate validation, authentication protocols, distributed databases and backups all break in confusing ways when clocks disagree. Linux+ expects you to configure time synchronization and recognize the symptoms of clock skew.",
   "Linux has two clocks: the system clock maintained by the kernel while running, and the hardware clock, also called the RTC (real-time clock), which keeps time while the machine is off. `timedatectl` shows both, along with the time zone and whether synchronization is active ('System clock synchronized: yes' and 'NTP service: active'). Use `timedatectl set-timezone America/Chicago` to change the zone (`timedatectl list-timezones` lists them), `timedatectl set-ntp true` to enable automatic synchronization, and `timedatectl set-time` only when NTP is off. Servers commonly keep the RTC in UTC (Coordinated Universal Time). `hwclock --systohc` copies the system time to the hardware clock.",
   "NTP (Network Time Protocol) keeps the system clock accurate by querying time servers, over UDP port 123. On most current distributions the NTP implementation is chrony, whose daemon is `chronyd` and whose configuration is `/etc/chrony.conf` (or `/etc/chrony/chrony.conf`). `server ntp1.example.com iburst` adds a server, and `iburst` speeds up initial synchronization; `pool` lines use a set of servers from a pool; `makestep 1.0 3` allows the clock to jump instead of slewing gradually when it is far off during the first few updates; and `allow 10.0.0.0/8` lets chrony serve time to other hosts. Some systems use the simpler `systemd-timesyncd` client instead; only one time service should run at a time.",
   "Verify with `chronyc`: `chronyc sources -v` lists servers, where `^*` marks the currently selected source and `^?` an unreachable one; `chronyc tracking` shows the current offset from true time, stratum and frequency error; `chronyc makestep` forces an immediate correction. If no source is reachable, check the firewall for outbound UDP 123, DNS resolution of the server names, and whether the servers themselves are healthy. Virtual machines can drift noticeably after being paused or migrated, so they need synchronization too.",
   "Clock skew effects are exam favorites. TLS (Transport Layer Security) certificates have 'not before' and 'not after' validity dates, so a client whose clock is wrong may reject a valid certificate as expired or not yet valid, causing HTTPS, package repository and API failures with errors mentioning certificate validity. Kerberos tickets carry timestamps to prevent replay attacks, and by default the KDC rejects requests if the client and server clocks differ by more than about five minutes, producing 'Clock skew too great' errors and failed domain logins through SSSD. Time-based one-time passwords used for MFA also fail when the clock is off. Beyond outright failures, skewed clocks make logs from different hosts impossible to line up during an incident investigation, and can make cron jobs and timers run at unexpected times.",
   "So when you see certificate errors on only one machine, Kerberos or Active Directory authentication failures, or MFA codes being rejected, check the time first with `timedatectl` and `chronyc tracking`."
  ],
  "terms": [
   [
    "NTP",
    "Network Time Protocol, which synchronizes clocks with time servers over UDP port 123."
   ],
   [
    "chrony",
    "The common Linux NTP implementation (chronyd daemon, chronyc client, /etc/chrony.conf)."
   ],
   [
    "timedatectl",
    "systemd tool to view and set time, time zone and whether NTP synchronization is enabled."
   ],
   [
    "RTC",
    "Real-time clock: the hardware clock that keeps time while the system is powered off."
   ],
   [
    "Clock skew",
    "The difference between clocks on different systems; Kerberos by default tolerates only about five minutes."
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
   ]
  ]
 },
 {
  "t": "Package problems: broken dependencies, repository errors, held packages",
  "body": [
   "Package managers are reliable, but updates and installs can still fail. The most common problems are unresolvable dependencies, repository errors and packages deliberately held back. Reading the error carefully usually tells you which of these you are dealing with.",
   "Broken dependencies happen when a package needs a version of a library or another package that is not available or conflicts with something installed. Causes include mixing repositories for different distribution releases, installing individual packages manually with `rpm -i` or `dpkg -i`, third-party repositories that replace base packages, and interrupted installs. On Debian-family systems, `apt --fix-broken install` (or `apt-get -f install`) tries to complete or repair a half-finished installation, and `dpkg --configure -a` finishes configuring packages left unconfigured by an interruption. `apt-cache policy name` shows available versions and which repository each comes from. On RPM systems, dnf reports conflicts clearly; `dnf check` finds dependency problems in the installed set, `dnf repoquery --requires name` or `rpm -qR name` shows what a package needs, and options such as `--allowerasing` (letting dnf remove conflicting packages) or `--best` change the solver's behavior. Read carefully before accepting removals. Avoid forcing installs with `rpm --nodeps` or `dpkg --force-depends`, which leave the system inconsistent.",
   "Interrupted package operations leave locks behind or leave the database mid-change. apt reports 'Could not get lock /var/lib/dpkg/lock-frontend', which usually means another apt process, often an automatic update, is still running; wait for it or find it with `ps`, rather than deleting lock files while it runs. If the RPM database is damaged, `rpm --rebuilddb` can rebuild it.",
   "Repository errors appear as failures to download metadata or packages. Typical messages include 404 errors (the repository URL or release name is wrong, or the release reached end of life and moved to an archive), 'Failed to download metadata for repo' or 'Temporary failure resolving' (DNS, proxy or network problems, including a missing proxy setting), GPG errors such as 'NO_PUBKEY' or 'public key not installed' (the repository's signing key has not been imported or has rotated), and TLS certificate errors, which can be caused by a wrong system clock. Check the repository files in `/etc/yum.repos.d/` or `/etc/apt/sources.list.d/`, test the URL with `curl -I`, confirm DNS and proxy settings, and import the correct key through the vendor's documented method, verifying its fingerprint. Stale metadata can be cleared with `dnf clean all` and `dnf makecache`, or refreshed with `apt update`. Disabling GPG checking to make an error go away is a security risk and the wrong fix.",
   "Held packages are those deliberately prevented from upgrading, often to protect a kernel or application version that others depend on. On Debian-family systems, `apt-mark hold name` holds a package, `apt-mark showhold` lists holds, and `apt-mark unhold name` releases one; apt reports 'The following packages have been kept back' for holds and for upgrades that would need new dependencies, which `apt full-upgrade` or an explicit `apt install name` can resolve. On RPM systems, the versionlock plug-in (`dnf versionlock add name`, `dnf versionlock list`, `dnf versionlock delete name`) does the same, and `exclude=` lines in `/etc/dnf/dnf.conf` or a `.repo` file hide packages from updates entirely. When a package mysteriously will not update, check for holds, versionlocks and excludes, and ask why they were set before removing them."
  ],
  "terms": [
   [
    "Dependency conflict",
    "A situation where required package versions cannot be satisfied together with what is installed."
   ],
   [
    "apt --fix-broken install",
    "Repairs incomplete or broken installations by installing missing dependencies."
   ],
   [
    "NO_PUBKEY",
    "An apt error meaning the repository's signing key is not trusted on the system."
   ],
   [
    "apt-mark hold",
    "Prevents a Debian-family package from being upgraded until unheld."
   ],
   [
    "dnf versionlock",
    "A dnf plug-in that pins packages to specific versions on RPM-based systems."
   ]
  ],
  "example": "An Ubuntu server's nightly update reports that several packages were kept back. apt-mark showhold lists the kernel packages, held months ago during a driver issue that has since been fixed. After confirming with the team, you run apt-mark unhold on them, apply the updates and schedule a reboot into the new kernel.",
  "tip": "Repository GPG errors are fixed by importing the correct, verified key, not by setting gpgcheck=0 or trusting unsigned repositories.",
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
   ]
  ]
 },
 {
  "t": "Container problems: logs, port conflicts, image pulls, storage",
  "body": [
   "Containers fail in characteristic ways: the application inside crashes, the port cannot be published, the image cannot be pulled, or storage is missing, full or inaccessible. The commands from the containers lesson become your troubleshooting toolkit, and the process mirrors ordinary service troubleshooting.",
   "Start by finding the container's state. `podman ps -a` (or `docker ps -a`) includes stopped containers and shows their status, such as `Exited (1) 2 minutes ago` or a restart loop. `podman logs name` shows what the application printed before it stopped, which is usually the answer: a missing environment variable, a configuration error, a failed database connection. `podman inspect name` shows the exit code, the OOMKilled flag, the command, environment, mounts and restart policy; an exit code of 137 means the process was killed with SIGKILL (128 + 9), often by the OOM killer or a memory limit, while 139 indicates a segmentation fault. `podman events` shows lifecycle events, and `podman exec -it name sh` lets you look inside a running container. If the container exits immediately, try running the image interactively with a shell to inspect it, or check that the main command does not simply finish and exit.",
   "Port conflicts show up as errors like 'address already in use' when you publish with `-p`. Only one process can bind a host port, so check with `ss -tlpn | grep :8080` for host services and `podman ps` for other containers already publishing it, then choose another host port or stop the conflicting service. If the container runs but is unreachable, check `podman port name` to confirm the mapping, confirm the application inside listens on 0.0.0.0 rather than 127.0.0.1 within the container, and check the host firewall. Rootless Podman cannot bind host ports below 1024 by default, which produces a permission error rather than a conflict.",
   "Image pull failures come from several causes. 'manifest unknown' or 'not found' means a wrong image name or tag; 'unauthorized' or 'denied' means you need to log in with `podman login registry` or lack access to a private repository; 'toomanyrequests' indicates a registry rate limit; and timeouts, DNS failures or TLS certificate errors point to network, proxy or clock problems. Short names without a registry may be resolved against a list in `/etc/containers/registries.conf`, so use fully qualified names like `registry.example.com/team/app:1.4` to be explicit and avoid pulling a lookalike image. Pinning a specific tag or digest instead of `latest` also prevents surprises.",
   "Storage problems come in two forms. Space: images, stopped containers, volumes and build cache consume disk under `/var/lib/containers` (Podman as root), `~/.local/share/containers` (rootless Podman) or `/var/lib/docker`. `podman system df` summarizes usage, and `podman image prune`, `podman container prune`, `podman volume prune` and `podman system prune` reclaim it; be careful, because pruning volumes deletes data. Access: a bind mount that gives 'Permission denied' inside the container usually means SELinux labels (add `:Z` or `:z` to the `-v` option) or UID mismatches, especially in rootless mode where container UIDs are mapped to subordinate UIDs on the host; `podman unshare` helps adjust ownership. Remember too that data written inside a container without a volume vanishes when the container is removed, which is a common cause of lost data after an image update."
  ],
  "terms": [
   [
    "Exit code 137",
    "A container process killed by SIGKILL (128 + 9), frequently due to memory limits or the OOM killer."
   ],
   [
    "podman ps -a",
    "Lists all containers including stopped ones, with status and exit information."
   ],
   [
    "registries.conf",
    "Configuration that controls registries, including how short image names are resolved."
   ],
   [
    "podman system df",
    "Summarizes disk use by images, containers and volumes."
   ],
   [
    ":Z volume option",
    "Relabels a bind-mounted host directory with a private SELinux label so the container can access it."
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
   ]
  ]
 }
], { reviewed: "2026-09-25" });
