/* "Why this answer is wrong" explanations for CompTIA Server+ (SK0-005). */
CertHub.addWhys("server-plus", {
  "sv1": [
    "Mounting a heavy UPS high makes the rack top-heavy and prone to tipping; cooling is not improved by height.",
    "Eye-level placement is a convenience, not a safety rule, and it still raises the rack's center of gravity.",
    "A UPS belongs at the bottom of the same rack; putting it in a separate rack wastes space and is unnecessary.",
    null
  ],
  "sv2": [
    "Facing fronts into the hot aisle makes intakes pull in warm exhaust air, causing the servers to overheat.",
    null,
    "Alternating rack directions mixes hot exhaust with cold intake, defeating the hot/cold aisle separation.",
    "Mounting servers sideways breaks the aisle airflow design and lets exhaust recirculate into intakes."
  ],
  "sv3": [
    null,
    "One PDU on a single UPS is itself a single point of failure, so a fault there still drops the server.",
    "A wall outlet is unconditioned and unprotected, and mixing it with a PDU leaves an unbalanced power path.",
    "A power strip and a single UPS are both single points of failure feeding both supplies at once."
  ],
  "sv4": [
    "24 TB is the raw total (or RAID 0) and ignores the capacity that dual parity consumes.",
    "20 TB is the RAID 5 result, which reserves only one drive of parity, not the two RAID 6 uses.",
    null,
    "12 TB subtracts three drives' worth of capacity; RAID 6 only reserves two for its dual parity."
  ],
  "sv5": [
    null,
    "RAID 5 adds a parity write penalty and rebuilds slowly by recalculating parity across all drives.",
    "RAID 0 has no redundancy at all, so a single drive failure destroys the entire array.",
    "RAID 6's dual parity slows writes further and its rebuilds are long, even with a hot spare on hand."
  ],
  "sv6": [
    "NAS with SMB shares data at the file level over the network, not as raw block-level LUNs.",
    null,
    "DAS over SAS is block storage but is attached directly to one server, not delivered over Ethernet.",
    "NFS is a file-level network share, so servers see mounted folders rather than block LUNs."
  ],
  "sv7": [
    "Write-back cache boosts write performance but does nothing to allow replacing a drive while powered on.",
    "Secure Boot verifies signed boot components and is unrelated to live drive replacement.",
    null,
    "Wake-on-LAN powers a system on remotely and has nothing to do with hot-swapping a drive."
  ],
  "sv8": [
    "No RAID is mentioned, and controllers do not reserve enough space to explain the shortfall.",
    "The reduced figure is normal reporting math, not a symptom of a failing drive with bad sectors.",
    "A file system journal is tiny and cannot account for hundreds of gigabytes of apparent difference.",
    null
  ],
  "sv9": [
    "RDP relies on a running OS and network stack, so it cannot help when the OS is unreachable.",
    null,
    "SSH also needs a working OS and service, which is exactly what has failed here.",
    "SNMP traps only push alert messages; they cannot power-cycle hardware or display the POST screen."
  ],
  "sv10": [
    null,
    "Legacy (CSM) boot disables signature checking, which is the opposite of what is wanted.",
    "PXE boot loads an OS or installer over the network and does not enforce signed bootloaders.",
    "Fast boot skips parts of startup for speed and does not validate boot component signatures."
  ],
  "sv11": [
    "Single-mode fiber with LR optics works but costs far more than needed for a few-meter link.",
    "Cat5e is not rated for reliable 10 Gbps and is a poor fit for a short, high-speed switch interconnect.",
    null,
    "RG-6 coax is for video/CATV signaling and cannot carry a 10 Gbps SFP+ switch link."
  ],
  "sv12": [
    "Disabling the host firewall has no bearing on flashing firmware and only weakens security.",
    "Resetting the BIOS to defaults would wipe needed settings rather than prepare for the update.",
    "Removing power supplies risks losing power mid-flash, which can brick the firmware.",
    null
  ],
  "sv13": [
    "Non-parity desktop DIMMs cannot detect or correct any memory errors.",
    null,
    "Faster unbuffered non-ECC memory offers speed but no error correction, which servers need.",
    "Adding SSD swap is disk paging and does nothing to correct in-memory bit errors."
  ],
  "sv14": [
    "A blade server requires an enclosure and a rack, which this office does not have.",
    "A 2U rack-mount server still needs a rack and rail kit to install.",
    null,
    "A 1U rack server needs a rack and its small high-speed fans are loud for an office."
  ],
  "sv15": [
    null,
    "Rack height and server count describe physical size, not how long the batteries can sustain the load.",
    "Voltage and outlet type matter for connection, and physical height is irrelevant to runtime energy math.",
    "CPU speed and RAM do not directly give the wattage draw needed to calculate runtime."
  ],
  "sv16": [
    "SATA is an older AHCI interface with higher latency than a direct PCIe flash connection.",
    "SAS is enterprise-grade but still routes through a controller layer, making it slower than NVMe.",
    "USB 3 is an external peripheral bus, not a low-latency internal storage path.",
    null
  ],
  "sv17": [
    "Installing from USB on each of 40 servers is manual and does not scale.",
    null,
    "A Type 2 hypervisor runs on a desktop OS and is not a tool for mass bare-metal deployment.",
    "P2V converts an existing physical server to a VM; it does not deploy an OS to 40 new machines."
  ],
  "sv18": [
    "An SLA defines service commitments and says nothing about which hardware the OS supports.",
    "The EULA covers usage rights, not whether the hardware has been tested by the OS vendor.",
    null,
    "The asset inventory lists owned equipment, not vendor-tested compatibility for a new OS."
  ],
  "sv19": [
    null,
    "Desktop Experience adds the full GUI, increasing both resource use and attack surface.",
    "A Type 2 hypervisor is a virtualization product, not a Windows Server installation option.",
    "A 32-bit edition limits memory and is not how you reduce attack surface; Server is 64-bit anyway."
  ],
  "sv20": [
    "V2P is the reverse process, converting a virtual machine back to physical hardware.",
    "A PXE install builds a fresh OS over the network, which would mean rebuilding, not migrating.",
    "A bare-metal restore recovers a backup onto hardware; it does not convert the server into a VM.",
    null
  ],
  "sv21": [
    "FAT32 limits single files to 4 GB and is unsuitable for large server volumes.",
    "exFAT targets removable flash media, not large enterprise Linux file servers.",
    null,
    "NTFS is the Windows file system and is not the default on RHEL."
  ],
  "sv22": [
    "VLAN tagging segments traffic into virtual LANs; it does not provide link failover.",
    null,
    "Port mirroring copies traffic to a monitoring port and offers no redundancy.",
    "Jumbo frames raise the MTU for throughput and do nothing for link failover."
  ],
  "sv23": [
    "DHCP assigns IP addresses and has no role in synchronizing the server's clock.",
    "SNMP is for monitoring devices, not for keeping time in sync for Kerberos.",
    "SMTP transports email and is unrelated to clock skew or authentication.",
    null
  ],
  "sv24": [
    null,
    "An exclusion removes addresses from the pool but does not assign a fixed address to a device.",
    "A new scope defines a range of addresses, not a guaranteed fixed lease for one device.",
    "A CNAME is a DNS alias and does not control which IP address the printer receives."
  ],
  "sv25": [
    null,
    "A separate physical switch per VM is unnecessary because a trunked uplink already carries all VLANs.",
    "NIC teaming on the guest aggregates links for redundancy, not VLAN separation.",
    "A DHCP relay forwards DHCP requests across subnets; it does not place VMs into VLANs."
  ],
  "sv26": [
    "Source IP hash pins each client to a server by address and does not even out uneven session lengths.",
    null,
    "Weighting by server age is arbitrary and ignores how busy each server actually is.",
    "DNS round robin just rotates returned records with no awareness of current server load."
  ],
  "sv27": [
    "Round-robin DNS distributes name lookups and does nothing to prevent split-brain.",
    "A heartbeat alone can detect a node failure but cannot break the tie over shared-disk ownership.",
    null,
    "NIC teaming on the storage network adds link redundancy but does not arbitrate cluster ownership."
  ],
  "sv28": [
    "In active-active clustering all nodes serve traffic at once, not one sitting idle.",
    "Scale-out clustering adds nodes to grow capacity, not a passive standby waiting to take over.",
    "Load balancing spreads work across active nodes rather than keeping one on standby.",
    null
  ],
  "sv29": [
    "RAID provides disk redundancy within an array, not failover across SAN fabric paths.",
    "NIC teaming aggregates Ethernet adapters and does not manage storage HBA paths.",
    null,
    "iSCSI CHAP only authenticates iSCSI sessions and provides no path failover or load sharing."
  ],
  "sv30": [
    "An emulator simulates hardware and is slow, not a bare-metal production hypervisor.",
    "A Type 2 hypervisor runs on top of a host desktop OS, not directly on the hardware.",
    "A container runtime shares the host kernel and is not a hardware-level hypervisor.",
    null
  ],
  "sv31": [
    "Ballooning is a technique to reclaim guest memory, not the term for assigning more than exists.",
    null,
    "Thin provisioning refers to allocating storage on demand, not to RAM allocation.",
    "NUMA pinning binds a VM to specific CPU/memory nodes and is unrelated to overallocation."
  ],
  "sv32": [
    null,
    "Cloning makes a full copy to another host, which is slower than a snapshot for a quick rollback.",
    "A full backup to tape is slow and meant for disaster recovery, not a fast pre-patch revert.",
    "A template is a master image for deploying new VMs, not a rollback point for this one."
  ],
  "sv33": [
    "Thick provisioning allocates all the disk's space up front, the opposite of growing on demand.",
    null,
    "Deduplication removes duplicate data blocks and is a different storage-efficiency feature.",
    "A pass-through disk maps a physical disk directly to the VM and is not about on-demand growth."
  ],
  "sv34": [
    "In SaaS the provider manages the entire application, so the customer would not patch the OS.",
    "In PaaS the provider manages the OS and runtime, leaving the customer only apps and data.",
    "FaaS is serverless functions where the customer never manages an OS at all.",
    null
  ],
  "sv35": [
    "-less is not a valid PowerShell comparison operator.",
    "In PowerShell the < symbol is a redirection operator, not a less-than comparison.",
    null,
    "-le is less-than-or-equal, and this option compares to 1 rather than to 10."
  ],
  "sv36": [
    null,
    "A systemd mount unit mounts filesystems and is not a job scheduler.",
    "An .bashrc entry runs at interactive shell login, not on a nightly schedule.",
    "The at command schedules a job to run only once, not every night."
  ],
  "sv37": [
    "A comparator only tests values and cannot repeat the account-creation task for each row.",
    null,
    "A single variable holds one value and cannot iterate over 200 CSV rows.",
    "An exit code reports whether the script succeeded, not a way to repeat an action."
  ],
  "sv38": [
    "Storing a password in plain text does not affect how fast the script runs.",
    "A plain-text credential does not stop the script from being scheduled.",
    null,
    "Passing a variable to a function still works; plain-text storage does not prevent that."
  ],
  "sv39": [
    null,
    "Per-core licensing is not per-server, so quadrupling the cores raises the license count.",
    "Faster completion does not reduce the number of cores that must be licensed.",
    "Per-core cost depends on cores, not on the number of users."
  ],
  "sv40": [
    "Per-device CALs cost more when each user connects from several devices.",
    "A site license is broad and usually far more expensive than needed for 300 users.",
    "Per-socket licensing is based on server hardware and is unrelated to user counts.",
    null
  ],
  "sv41": [
    null,
    "A network diagram shows how devices connect, not hardware warranty expiration dates.",
    "A change log records modifications made to systems, not warranty information.",
    "A runbook documents operating procedures, not asset warranty details."
  ],
  "sv42": [
    "An SLA defines service commitments and targets, not the measured normal resource usage.",
    null,
    "A service catalog lists the services offered to users, not performance measurements.",
    "A root cause analysis explains an incident afterward, not routine baseline behavior."
  ],
  "sv43": [
    "A decommissioning ticket is for retiring assets, not for modifying a running array's config.",
    "A new SLA sets service commitments and is not the approval needed for one config change.",
    "A license renewal covers software entitlements and is unrelated to a RAID change.",
    null
  ],
  "sv44": [
    "Sunday plus only Wednesday's incremental skips Thursday's changes and the other incrementals.",
    "Thursday's incremental alone lacks the base full and all the intervening changes.",
    null,
    "The full alone would lose every change made during the week."
  ],
  "sv45": [
    null,
    "Incrementals require restoring the full plus every set in the chain, more than two backup sets.",
    "A monthly full alone leaves a huge data-loss window and no fast recent restore.",
    "Daily snapshots on the same volume are not independent and are lost if that volume fails."
  ],
  "sv46": [
    "This describes backup frequency and testing, not the copies/media/off-site structure of 3-2-1.",
    null,
    "Counting servers and sites conflates infrastructure with the required data copies and media types.",
    "Snapshots on one array all fail together and meet neither the two-media nor the off-site rule."
  ],
  "sv47": [
    "Long backup times are a performance concern, not the core danger of never testing restores.",
    "Full media is a capacity issue and does not address whether the data can actually be recovered.",
    null,
    "Rising licensing costs are a budget matter, unrelated to whether the backups can restore."
  ],
  "sv48": [
    "RTO measures how quickly service must be restored, not how much data can be lost.",
    "MTTR is the mean time to repair a failure, a reliability metric, not a data-loss target.",
    "MTBF is the mean time between failures and does not describe tolerable data loss.",
    null
  ],
  "sv49": [
    "RPO is the acceptable amount of lost data in time, not how fast service must return.",
    "MTBF describes expected time between failures, not a recovery deadline.",
    null,
    "An SLA credit is compensation for a missed service level, not a recovery-time metric."
  ],
  "sv50": [
    "A cold site has only space and power, taking days to weeks to bring online.",
    "A warm site has hardware but needs data restored first, so it cannot fail over in minutes.",
    "A reciprocal agreement relies on another organization's site with uncertain readiness.",
    null
  ],
  "sv51": [
    "Synchronous replication waits for the remote site to confirm each write, adding heavy latency over 800 km.",
    null,
    "Snapshot-only replication captures periodic points in time rather than continuously sending writes.",
    "Mirrored RAID 1 duplicates disks locally and does not replicate to a distant DR site."
  ],
  "sv52": [
    null,
    "A live failover test actually shifts production to the DR site, which this exercise avoids.",
    "A parallel test runs DR systems alongside production using real infrastructure, not just discussion.",
    "A full interruption test shuts down production to prove DR, the most disruptive kind."
  ],
  "sv53": [
    "Degaussing erases magnetic media and has no effect on an SSD's flash memory.",
    "A quick format only clears the file table and leaves the underlying data recoverable.",
    "Deleting partitions removes the partition table but leaves the actual data intact.",
    null
  ],
  "sv54": [
    null,
    "Warranty cards concern support entitlements, not proof that the drives were destroyed.",
    "A new baseline records performance behavior and is unrelated to media disposal.",
    "Purchase orders and shipping receipts document acquisition, not secure destruction."
  ],
  "sv55": [
    "Adding a second NIC provides network redundancy, not a reduction in attack surface.",
    null,
    "Raising the RAID level improves storage resilience but does not harden the OS.",
    "Enabling jumbo frames tunes network throughput and is not a security hardening step."
  ],
  "sv56": [
    "Telnet is unencrypted and far less secure than SSH, so moving to it worsens security.",
    "Allowing direct root login increases the risk that a compromise gains full control.",
    null,
    "Turning off the host firewall exposes more services and weakens security."
  ],
  "sv57": [
    "Separation of duties splits critical tasks among people; it is related but not about minimal rights.",
    "Defense in depth layers multiple controls and is not specifically about limiting account rights.",
    null,
    "Implicit trust is the opposite of secure design and grants access without verification."
  ],
  "sv58": [
    "Discretionary access control lets object owners set permissions individually, not via role groups.",
    null,
    "Mandatory access control uses security labels and clearances enforced by the system.",
    "Rule-based access control applies conditions like time or ACLs, not role membership."
  ],
  "sv59": [
    null,
    "A badge reader alone does not stop a second person from slipping through behind an authorized one.",
    "A CCTV camera records tailgating after the fact but does not physically prevent it.",
    "Locked rack doors protect the equipment racks, not the data center entrance."
  ],
  "sv60": [
    "NIC teaming provides network redundancy and does nothing to protect stored data.",
    "A cable lock secures the server, but here it was the laptop that was stolen.",
    "A longer DHCP lease only affects addressing and offers no data protection.",
    null
  ],
  "sv61": [
    "A screen saver timeout is an OS-level lock and does not stop firmware or boot-order changes.",
    null,
    "A DNS PTR record maps an IP to a name and is unrelated to firmware security.",
    "Switch port security controls MAC addresses on the network, not the server's boot settings."
  ],
  "sv62": [
    "MPIO manages redundant storage paths and has nothing to do with blocking data exfiltration.",
    "An IDS detects network intrusions but does not enforce policy on files copied to USB or email.",
    "NTP synchronizes clocks and provides no data-loss protection.",
    null
  ],
  "sv63": [
    null,
    "Backing up more often to the same reachable share still leaves those copies open to encryption.",
    "Choosing differential backups changes the backup type but not the ransomware's ability to reach them.",
    "A larger RAID 6 array protects against disk failure, not against ransomware encrypting the files."
  ],
  "sv64": [
    "Tower of Hanoi is a different rotation based on recursive reuse intervals, not daily/weekly/monthly sets.",
    "3-2-1 is a copy-placement rule about media and off-site copies, not a retention rotation.",
    null,
    "FIFO simply overwrites the oldest media and lacks the tiered daily/weekly/monthly retention."
  ],
  "sv65": [
    "Data classification labels how sensitive data is, not how long it must be kept.",
    "Data masking obscures values to protect them and is unrelated to retention periods.",
    "Data sovereignty concerns which country's laws govern where data is stored.",
    null
  ],
  "sv66": [
    null,
    "Implementing the solution comes only after a plan of action, much later in the process.",
    "Documenting findings is the final step, not what follows problem identification.",
    "Verifying functionality happens near the end, after the solution is implemented."
  ],
  "sv67": [
    "Replacing the motherboard is a fix action, not part of identifying the problem.",
    null,
    "Documenting lessons learned is the last step of the methodology, not an early one.",
    "Escalating immediately skips the investigation that identification requires."
  ],
  "sv68": [
    "Questioning users is part of identifying the problem, not the closing step.",
    "Establishing a theory happens early, well before the fix is verified.",
    null,
    "Rebooting is a possible action, not the final documentation step."
  ],
  "sv69": [
    "A DNS misconfiguration only matters once the OS has loaded, not at power-on beeps.",
    "An expired certificate is an OS- or application-level issue, not a POST hardware fault.",
    null,
    "A full data volume is an OS-level problem and would not produce power-on beep codes."
  ],
  "sv70": [
    null,
    "A failing NIC affects networking and would not trigger a thermal shutdown.",
    "A memory leak causes gradual slowdown or crashes, not high inlet-temperature events.",
    "A bad DNS record affects name resolution, not the server's temperature."
  ],
  "sv71": [
    "Ignoring rising correctable errors is risky because they often precede uncorrectable failures.",
    null,
    "Increasing swap space is disk paging and does nothing to fix a degrading DIMM.",
    "Disabling ECC removes the very protection that is catching these errors."
  ],
  "sv72": [
    "Shutting down immediately is unnecessary because the redundant supply keeps the server running.",
    "Updating the OS is irrelevant to a failed power supply.",
    "Moving load to a Type 2 hypervisor makes no sense as a response to a PSU fault.",
    null
  ],
  "sv73": [
    "Slower DNS lookups are unrelated to the state of a degraded RAID array.",
    "An OS license does not expire because an array is degraded.",
    "A degraded RAID 5 array does not automatically convert itself to RAID 0.",
    null
  ],
  "sv74": [
    null,
    "DNS plays no part in whether the firmware can locate a boot device.",
    "A license key affects OS activation, not the hardware's ability to find the disk at boot.",
    "NIC teaming is a network setting and has nothing to do with locating the boot drive."
  ],
  "sv75": [
    "Reallocated sectors signal degradation, not a healthy drive optimizing itself.",
    null,
    "Defragmenting rearranges files and cannot repair physically bad sectors.",
    "A full controller cache is unrelated to a drive's SMART reallocated-sector count."
  ],
  "sv76": [
    "A DHCP lease concerns IP addressing and has nothing to do with a disk-space error.",
    "The default gateway is a routing setting, unrelated to running out of space.",
    null,
    "An SSH key is for authentication and does not affect storage capacity."
  ],
  "sv77": [
    "chmod changes permissions on the mount point and does not repair a corrupted file system.",
    null,
    "ping only tests network reachability to the storage array, not file system integrity.",
    "top displays running processes and cannot repair a file system."
  ],
  "sv78": [
    "A failed cache battery does not change the array's RAID level.",
    "The NIC speed is a network matter and is unrelated to disk write latency.",
    "A dead cache battery does not set the drives to read-only.",
    null
  ],
  "sv79": [
    null,
    "A failed power supply causes an outage, not a slow, steady decline in available memory.",
    "A duplex mismatch degrades network performance, not memory availability.",
    "An incorrect subnet mask affects connectivity, not the server's memory usage."
  ],
  "sv80": [
    "Reinstalling the OS is far more work than needed to fix a changed service-account password.",
    "Setting the service to manual changes its startup type but does not fix the wrong stored password.",
    null,
    "Adding RAM is unrelated to a service failing due to a credential change."
  ],
  "sv81": [
    "Changing the server's IP address is unrelated to a failure caused by a patch.",
    "Disabling the host firewall adds risk and does not address the offending patch.",
    "Replacing the server is drastic when the recent patch is the obvious suspect.",
    null
  ],
  "sv82": [
    null,
    "ip route displays the routing table, not a service's log messages.",
    "df -h shows disk space usage, not why a service failed.",
    "lsblk lists block devices and reveals nothing about a service's logs."
  ],
  "sv83": [
    "A wrong DNS server breaks name resolution but not reachability to remote networks by IP.",
    null,
    "A failed RAID array is a storage issue and does not affect network reachability.",
    "An expired certificate is an application-security problem, not a routing failure."
  ],
  "sv84": [
    "arp -a shows the local IP-to-MAC cache and does not test DNS name resolution.",
    "tracert maps the network path by hops, not whether a name resolves.",
    null,
    "netstat -r prints the routing table, which is unrelated to name resolution."
  ],
  "sv85": [
    "arp -d clears the ARP cache and does not test whether a TCP port is open.",
    "ipconfig /flushdns clears the DNS cache and does not probe a port.",
    null,
    "chkdsk /f checks a disk for errors and has nothing to do with testing a port."
  ],
  "sv86": [
    null,
    "A DNS misconfiguration would break name resolution, not cause late collisions on a link.",
    "A wrong VLAN would isolate traffic rather than produce late collisions.",
    "A bad gateway is a routing problem and does not generate collisions."
  ],
  "sv87": [
    "A wrong clock is a time-sync issue and does not create a duplicate IP address.",
    "A failing NIC would cause link problems, not a duplicate-address warning.",
    "A corrupt DNS zone affects name resolution, not IP address conflicts.",
    null
  ],
  "sv88": [
    "Disabling TLS removes encryption entirely and leaves clients unprotected.",
    null,
    "Changing the server's IP address has no bearing on an expired certificate.",
    "Restarting the DNS service does not renew or replace an expired certificate."
  ],
  "sv89": [
    "A wrong DNS record would prevent reaching the share at all, not just block saving files.",
    null,
    "A missing gateway would block access entirely, yet the user can already open the share.",
    "RAID 1 is disk redundancy and is not a permission control that would block writes."
  ],
  "sv90": [
    "A split NIC team is a network issue and would not stop an application from launching.",
    "A failed RAID battery slows disk writes but would not block an app right after an AV install.",
    null,
    "An exhausted DHCP scope affects addressing, not an app blocked following an EDR install."
  ]
});
