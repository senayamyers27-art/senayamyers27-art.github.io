/* Lessons for CompTIA Server+ (SK0-005): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("server-plus", [
 {
  "t": "Rack planning: rack units, rail kits, weight distribution (heaviest at the bottom), airflow, hot and cold aisles, cable management arms",
  "body": [
   "Most servers in a data center live in a standard 19-inch equipment rack. Planning that rack before you bolt anything in saves you from overheating equipment, a tipping cabinet, and a tangle of cables nobody can trace. Server+ expects you to know the unit of measure, how equipment is mounted, where heavy gear goes and how air should move.",
   "Height inside a rack is measured in rack units (U). One U is 1.75 inches (44.45 mm). A server described as 1U is 1.75 inches tall, a 2U server is 3.5 inches, and so on. Full-height racks are commonly 42U, though other heights exist. When you plan, you add up the U of every device plus room for patch panels, blanking panels and future growth, and you write the plan down as a rack elevation diagram showing what sits in each U position.",
   "Servers mount on rail kits. Sliding rails let you pull a server out like a drawer to swap a part without unracking it; fixed or static rails simply hold the device. Rails come in tool-less versions that snap into square-hole racks and threaded versions that need screws or cage nuts. Always use the rails designed for the chassis and rack type, and check the rack's rated load. A cable management arm (CMA) attaches to the back of a sliding server and folds its power and network cables so the server can slide out without unplugging anything.",
   "Weight distribution is a safety rule: put the heaviest equipment, such as uninterruptible power supply (UPS) units, battery packs and large storage arrays, at the bottom. A top-heavy rack can tip over when someone extends a server on its rails. Install stabilizer feet or bolt the rack to the floor, and extend only one device at a time.",
   "Servers pull cool air in the front and exhaust hot air out the back. In a hot aisle/cold aisle layout, rows of racks face each other so fronts share a cold aisle fed by cool air and backs share a hot aisle where exhaust is collected and returned to the cooling units. Mixing the two, for example by facing one row's exhaust into another row's intake, wastes cooling and raises inlet temperatures. Blanking panels in empty U spaces stop hot exhaust from recirculating through gaps to the front, and some sites add aisle containment (doors or roofs) to keep the streams separate.",
   "Good cable management supports airflow too. Route cables along the sides using vertical managers, keep power and data runs tidy, label both ends, and never block fan intakes or exhaust with cable bundles. Leave enough slack for sliding rails, but not so much that loops hang behind the fans."
  ],
  "terms": [
   [
    "Rack unit (U)",
    "The standard vertical measure for rack equipment: 1.75 inches (44.45 mm)."
   ],
   [
    "Hot aisle/cold aisle",
    "A layout where rack fronts face a shared cool-air aisle and backs face a shared exhaust aisle, keeping intake and exhaust air separate."
   ],
   [
    "Blanking panel",
    "A plate that covers an empty rack space so hot exhaust air cannot loop back to the equipment intakes."
   ],
   [
    "Cable management arm (CMA)",
    "A hinged arm on the back of a sliding server that carries its cables so the server can be extended without disconnecting them."
   ]
  ],
  "example": "A team adds six 2U servers to a 42U rack that already holds a 3U UPS at the top. During planning they move the UPS and its battery pack to the bottom, place the servers above it, fill the unused spaces with blanking panels, and orient the rack so the servers draw air from the cold aisle.",
  "tip": "If a question asks where to put the UPS or the heaviest device, the answer is the bottom of the rack. If it asks how to stop hot air recirculating through empty rack spaces, the answer is blanking panels.",
  "check": [
   [
    "How tall is a 4U server?",
    "Seven inches, because each rack unit is 1.75 inches."
   ],
   [
    "Why should server intakes face the cold aisle?",
    "Servers draw air in the front and exhaust it out the back, so facing the cold aisle gives them cool intake air while exhaust goes to the hot aisle for removal."
   ],
   [
    "What does a cable management arm let you do?",
    "Slide a server out on its rails for service without unplugging its power and network cables."
   ]
  ]
 },
 {
  "t": "Server form factors: tower, rack mount, blade enclosures",
  "body": [
   "A server's form factor is its physical shape and how it is housed. The same processor and memory can come in very different packages, and the right choice depends on how many servers you need, how much floor or rack space you have, and how you want power, cooling and networking to be shared. Server+ tests three form factors: tower, rack mount and blade.",
   "A tower server looks like a large desktop computer and stands on the floor or a shelf. It needs no rack, is usually quiet, and often has plenty of internal drive bays and expansion slots. Towers suit small offices or branch sites that need one or two servers and have no server room. Their weaknesses are density and management at scale: ten towers take up a lot of floor space, each has its own power cords and cables, and they are awkward to secure. Some towers can be converted to rack mount with a conversion kit.",
   "A rack mount server is a flat chassis that bolts into a standard 19-inch rack on rails. Sizes are given in rack units: 1U servers are dense but have room for only a few drives and low-profile expansion cards, while 2U and 4U servers trade density for more drive bays, full-height cards, larger fans and sometimes more processors. Each rack server is still a complete, independent machine with its own power supplies, fans and network ports, so a rack full of them needs many power and network cables.",
   "A blade system has two parts. The blade enclosure (also called a chassis) mounts in the rack and provides shared power supplies, cooling fans, a management module and network or storage interconnect modules. Blade servers slide into slots in the front of the enclosure; each blade holds processors, memory and usually a small amount of local storage, but relies on the enclosure for power, cooling and connectivity. Blades give the highest density and far fewer cables, and a single management interface can control every blade. The trade-offs are higher up-front cost for the enclosure, vendor lock-in because blades only fit that vendor's chassis, and a shared component (such as the enclosure's backplane or midplane) that must be designed with redundancy so it is not a single point of failure.",
   "When choosing, match the form factor to the situation. A single file server at a small office points to a tower. A growing data center that needs flexible, independent servers points to rack mount. A site that needs many identical compute nodes in minimal space with centralized management points to blades. Also consider power density: a fully loaded blade enclosure draws a lot of power and produces a lot of heat in a small area, so the rack's circuits and cooling must be sized for it."
  ],
  "terms": [
   [
    "Tower server",
    "A free-standing server in an upright case, suited to small sites without a rack."
   ],
   [
    "Rack mount server",
    "A server built to bolt into a 19-inch rack, sized in rack units (1U, 2U, 4U)."
   ],
   [
    "Blade enclosure",
    "A rack-mounted chassis that supplies shared power, cooling, networking and management to the blade servers inserted into it."
   ],
   [
    "Blade server",
    "A thin server module containing CPU and memory that depends on its enclosure for power, cooling and connectivity."
   ]
  ],
  "example": "A clinic with one small closet and no rack buys a tower server for file sharing. The hospital's data center, which runs hundreds of virtual machines, uses blade enclosures so that sixteen compute nodes share redundant power supplies and a single management module in a fraction of the rack space.",
  "tip": "Blades win on density and cabling but depend on a shared enclosure and one vendor. If a question stresses fewer cables, shared power and cooling and centralized management, think blade.",
  "check": [
   [
    "Which form factor shares power supplies and fans among many servers?",
    "Blade servers, which draw power, cooling and connectivity from the blade enclosure."
   ],
   [
    "Why might you choose a 2U rack server over a 1U server?",
    "A 2U chassis has room for more drives, full-height expansion cards and larger, quieter fans, at the cost of rack density."
   ]
  ]
 },
 {
  "t": "Power: voltage, redundant power supplies, PDUs, UPS sizing and runtime, generators, separate circuits, power connector types",
  "body": [
   "Servers are only as reliable as the power feeding them. Server+ expects you to plan power from the wall outlet to the power supply: which voltage, how many supplies, how power is distributed in the rack, how long a UPS will hold the load, and what takes over during a long outage.",
   "Servers accept a range of input voltages. In North America, general outlets supply about 120 V, while data centers commonly use 208 V or 240 V circuits because higher voltage delivers the same power with less current, which means more equipment per circuit. Many regions use 230 V. Most server power supplies are auto-ranging and work across these voltages, but always check the label. Power in watts equals volts times amps, and UPS capacity is often given in volt-amperes (VA), which is apparent power; the watt rating is lower and depends on the power factor.",
   "Most servers take redundant power supplies (PSUs), typically two hot-swappable units. With both working they share the load; if one fails, the other carries the whole server. Redundancy only helps if the supplies are fed from separate sources, so plug PSU 1 into the A-side power distribution unit (PDU) and PSU 2 into the B-side PDU, each on its own circuit and ideally its own UPS. A rack PDU is a strip of outlets built for racks; basic PDUs just distribute power, metered PDUs show current draw, and switched PDUs let you turn individual outlets on or off remotely.",
   "A UPS (uninterruptible power supply) uses batteries to keep equipment running through short outages and to condition power. To size a UPS, add the wattage of every connected device, add headroom for growth (a common rule is to avoid loading a UPS near its maximum), and make sure both the watt and VA ratings cover the load. Runtime depends on load: the same UPS lasts much longer at 30 percent load than at 90 percent, so check the vendor's runtime chart. The UPS should run long enough either to let a generator start or to trigger an orderly shutdown through its management software.",
   "A standby generator handles long outages. An automatic transfer switch (ATS) detects the loss of utility power and switches the building to the generator once it is running. The UPS bridges the gap of seconds to minutes while the generator starts. Generators need fuel and regular testing under load.",
   "Know common connectors. Servers usually use an IEC C14 inlet on the PSU with a C13 cord for standard supplies, and C20/C19 for higher-current equipment. Rack PDUs and UPS units may connect to the building with locking NEMA plugs, such as the L5 (120 V) or L6 (208/240 V) series in North America. Keep circuits separate and do not overload one branch; a tripped breaker should never take down both supplies of a server."
  ],
  "terms": [
   [
    "Redundant power supply",
    "A second PSU that can carry the full load if the first fails, usually hot-swappable."
   ],
   [
    "PDU (power distribution unit)",
    "A rack-mounted outlet strip; metered models report load and switched models allow remote outlet control."
   ],
   [
    "UPS (uninterruptible power supply)",
    "A battery-backed device that keeps equipment powered through short outages and conditions incoming power."
   ],
   [
    "Automatic transfer switch (ATS)",
    "A device that moves the load from utility power to a generator when utility power fails."
   ]
  ],
  "example": "An administrator connects each server's two power supplies to PDU A and PDU B, which are fed by separate UPS units on separate circuits. When a breaker trips on circuit A, every server keeps running on its B-side supply, and nobody notices until the monitoring alert arrives.",
  "tip": "Redundant PSUs plugged into the same PDU or circuit are not really redundant. Exam answers favor A and B feeds on separate circuits, and UPS runtime is determined by load, not just the UPS size.",
  "check": [
   [
    "Why does a UPS last longer with fewer servers attached?",
    "Runtime depends on load; a lighter load drains the batteries more slowly."
   ],
   [
    "What is the role of the UPS when a site has a generator?",
    "It carries the load during the seconds or minutes before the generator starts and the transfer switch moves the load to it."
   ],
   [
    "What does a switched PDU add over a basic PDU?",
    "Remote control of individual outlets, so you can power-cycle a device without visiting the rack."
   ]
  ]
 },
 {
  "t": "Network cabling and connectors: Cat5e/Cat6/Cat6a, single-mode vs multimode fiber, SFP/SFP+/QSFP transceivers, twinax/DAC, labeling",
  "body": [
   "Servers connect to switches and storage with copper or fiber cables. Choosing the right cable depends on the speed you need, the distance, the ports on each end and the budget. Server+ tests the common categories and the pluggable modules used in server rooms.",
   "Twisted-pair copper cable uses RJ45 connectors and is rated by category. Cat5e supports 1 Gbps Ethernet up to 100 meters. Cat6 also supports 1 Gbps to 100 meters and can carry 10 Gbps over shorter runs (about 55 meters). Cat6a (augmented) supports 10 Gbps over the full 100 meters and has better protection against crosstalk. For new server room copper, Cat6a is a common choice because it handles 10GBASE-T at full length. Shielded versions help in electrically noisy areas.",
   "Fiber optic cable carries light instead of electricity, so it is immune to electromagnetic interference and reaches much farther. Multimode fiber (MMF) has a larger core, uses cheaper light sources, and is used for shorter runs inside a building or data center, typically up to a few hundred meters depending on speed and grade (OM3, OM4 and so on). Single-mode fiber (SMF) has a very narrow core and uses lasers to carry a single light path over kilometers, so it is used between buildings and for long campus or metro links. Common fiber connectors include LC (small, the usual choice on transceivers) and SC (larger, square). Fiber on the two ends must match: single-mode optics need single-mode cable.",
   "Many switches and server network cards use empty cages that accept pluggable transceivers. An SFP (small form-factor pluggable) module typically carries 1 Gbps; SFP+ carries 10 Gbps in the same size cage; SFP28 carries 25 Gbps; QSFP (quad SFP) modules combine four lanes for 40 Gbps (QSFP+) or 100 Gbps (QSFP28). The transceiver decides the medium: you can insert a multimode short-range optic, a single-mode long-range optic, or a copper module. Both ends must use compatible optics, and some vendors restrict which third-party modules their hardware accepts.",
   "For short connections inside a rack, a direct attach copper (DAC) cable is cheaper and uses less power than two optics plus fiber. A DAC is a twinax (twin-axial copper) cable with SFP+ or QSFP ends permanently attached, usually a few meters long. Active optical cables (AOCs) are the fiber equivalent for somewhat longer runs.",
   "Label every cable at both ends with a consistent scheme, for example the rack, device and port on each end, and record it in your documentation. Good labels make troubleshooting fast and prevent someone unplugging the wrong link during maintenance. Use color coding if your organization has a standard, and respect the bend radius of fiber so you do not damage it."
  ],
  "terms": [
   [
    "Cat6a",
    "Augmented Category 6 twisted-pair cable that supports 10 Gbps Ethernet up to 100 meters."
   ],
   [
    "Single-mode fiber",
    "Fiber with a very small core that carries one light path over long distances, used for building-to-building and long-haul links."
   ],
   [
    "Multimode fiber",
    "Fiber with a larger core that carries multiple light paths over shorter distances, common inside data centers."
   ],
   [
    "DAC (direct attach copper)",
    "A twinax cable with transceiver-style ends attached, used for short, low-cost high-speed links within or between adjacent racks."
   ]
  ],
  "example": "A server needs two 10 Gbps links to a top-of-rack switch one meter away. Instead of buying four SFP+ optics and fiber patch cords, the administrator uses two SFP+ DAC cables, labels both ends with the server name and port, and updates the cabling spreadsheet.",
  "tip": "Distance decides most cabling questions: DAC for a few meters, multimode for runs within the data center, single-mode for kilometers. Cat6a is the copper answer for 10 Gbps at 100 meters.",
  "check": [
   [
    "Which cable would you use to link two buildings several kilometers apart?",
    "Single-mode fiber, because its narrow core and laser optics carry signals over long distances."
   ],
   [
    "What is the difference between SFP and SFP+?",
    "They share the same size, but SFP is typically 1 Gbps and SFP+ is 10 Gbps."
   ]
  ]
 },
 {
  "t": "Drive types: HDD speeds (7.2K/10K/15K), SSD, NVMe, SAS vs SATA, hot-swap and hot-plug",
  "body": [
   "Storage is often the slowest part of a server, so choosing drives well matters. Server+ tests how drive types compare in speed, capacity, reliability and cost, the interfaces they use, and whether you can replace them while the server runs.",
   "A hard disk drive (HDD) stores data on spinning magnetic platters read by a moving head. Its speed is rated in revolutions per minute (RPM). 7,200 RPM (7.2K) drives offer the most capacity for the money and suit bulk storage, backups and archives. 10,000 RPM (10K) and 15,000 RPM (15K) drives spin faster, so rotational latency is lower and they deliver more input/output operations per second (IOPS), but they cost more per gigabyte and hold less. Faster spindle speeds have largely been replaced by SSDs for performance workloads, yet the distinctions still appear on the exam.",
   "A solid-state drive (SSD) uses flash memory with no moving parts. It has far lower latency and much higher IOPS than any HDD, uses less power and handles random access well. SSDs cost more per gigabyte and each flash cell tolerates a limited number of writes, so enterprise SSDs are rated for endurance, often as drive writes per day (DWPD). Choose write-intensive SSDs for databases and logs, and read-intensive SSDs for content that changes rarely.",
   "The interface matters as much as the media. SATA (Serial ATA) is inexpensive and common in desktops and low-cost servers. SAS (Serial Attached SCSI) is the enterprise interface: it supports higher speeds in current versions, dual ports so two controllers can reach the same drive for redundancy, deeper command queues and better error handling. A SAS controller can usually run SATA drives, but a SATA controller cannot run SAS drives. NVMe (Non-Volatile Memory Express) is a protocol designed for flash that connects SSDs directly to the PCIe (Peripheral Component Interconnect Express) bus, avoiding the older disk-oriented controller path. NVMe drives appear as add-in cards, M.2 modules or U.2/U.3 drives in front bays and offer the lowest latency.",
   "Hot-swap means you can remove and replace a component while the system is running, without shutting down or telling the operating system first; the hardware and RAID controller handle it. Hot-plug means you can add or remove a component while the system is running, but the operating system may need to be told, for example by preparing the device for removal. In practice, server drive bays with caddies are hot-swappable when the controller and backplane support it. Always check the drive's status LED and identify the correct bay before pulling a drive, especially in a degraded array."
  ],
  "terms": [
   [
    "IOPS",
    "Input/output operations per second, a measure of how many reads and writes storage can handle."
   ],
   [
    "SAS (Serial Attached SCSI)",
    "An enterprise drive interface with dual-port support and robust error handling; SAS controllers can also run SATA drives."
   ],
   [
    "NVMe",
    "A storage protocol that connects flash drives directly to the PCIe bus for very low latency and high throughput."
   ],
   [
    "Hot-swap",
    "Replacing a component while the system runs, with no shutdown or special OS action required."
   ]
  ],
  "example": "A database server with slow queries is moved from six 7.2K SATA drives to NVMe SSDs, cutting storage latency sharply. The old high-capacity 7.2K drives are reused in a backup server, where capacity per dollar matters more than speed.",
  "tip": "Faster RPM means more IOPS but less capacity and more cost per GB. SAS controllers accept SATA drives but not the other way round, and hot-swap requires no OS preparation while hot-plug may.",
  "check": [
   [
    "Which HDD speed gives the best capacity per dollar?",
    "7.2K RPM drives, which trade speed for high capacity at low cost."
   ],
   [
    "Can you install SAS drives on a SATA-only controller?",
    "No. A SAS controller can run SATA drives, but a SATA controller cannot run SAS drives."
   ],
   [
    "Why is NVMe faster than a SATA SSD?",
    "NVMe connects over PCIe with a protocol built for flash, avoiding the SATA interface and its disk-era command overhead."
   ]
  ]
 },
 {
  "t": "RAID levels 0, 1, 5, 6, 10: fault tolerance, usable capacity, write penalty; hardware vs software RAID; JBOD",
  "body": [
   "RAID (redundant array of independent disks) combines several drives into one logical volume to improve performance, fault tolerance or both. Server+ expects you to calculate usable capacity, know how many failures each level survives, and understand why some levels write more slowly. Remember that RAID is not a backup: it protects against drive failure, not deletion, corruption or ransomware.",
   "RAID 0 (striping) splits data across two or more drives. It is fast and uses 100 percent of capacity, but has no redundancy: one failed drive loses the whole array. RAID 1 (mirroring) writes identical copies to two drives. It survives one drive failure and usable capacity is 50 percent. Reads can be fast; each write goes to both drives, a write penalty of 2.",
   "RAID 5 stripes data with distributed parity across at least three drives. Parity is calculated data that lets the controller rebuild a missing drive. Usable capacity is (N minus 1) drives, so four 4 TB drives give 12 TB. It survives one drive failure. Each small write requires reading old data and old parity, then writing new data and new parity, a write penalty of 4. Rebuilds of large drives take a long time and stress the remaining disks.",
   "RAID 6 uses two independent parity blocks across at least four drives. Usable capacity is (N minus 2), it survives any two drive failures, and its write penalty is 6. It is favored for large arrays of high-capacity drives because a second failure during a long rebuild would destroy a RAID 5 array. RAID 10 (1+0) mirrors pairs of drives and then stripes across the mirrors. It needs at least four drives (an even number), gives 50 percent capacity, has a write penalty of 2, and survives one failure per mirror pair; it can survive more than one failure only if they hit different pairs. RAID 10 is the usual choice for write-heavy databases.",
   "Hardware RAID uses a dedicated controller card or chip with its own processor and often a battery- or flash-backed write cache. It offloads parity work from the CPU, can boot from the array and is managed through the controller's firmware utility. Software RAID is handled by the operating system, such as `mdadm` on Linux or Storage Spaces on Windows. It costs nothing extra and the array can be moved to another server running the same OS software, without needing a matching controller, but uses host CPU and may be harder to boot from. Firmware or fake RAID sits in between, relying on drivers.",
   "JBOD (just a bunch of disks) presents drives individually, or concatenated into one large volume without striping or parity. It uses all capacity but offers no redundancy. JBOD is also the mode used when software such as ZFS or a storage cluster manages redundancy itself. A hot spare is an idle drive the controller automatically uses to rebuild a failed member."
  ],
  "terms": [
   [
    "Parity",
    "Calculated data stored in RAID 5 or 6 that lets the array reconstruct the contents of a failed drive."
   ],
   [
    "Write penalty",
    "The number of physical I/O operations one logical write requires: 1 for RAID 0, 2 for RAID 1 and 10, 4 for RAID 5, 6 for RAID 6."
   ],
   [
    "Hot spare",
    "A standby drive that the controller automatically uses to rebuild an array after a member fails."
   ],
   [
    "JBOD",
    "Just a bunch of disks: drives presented individually or concatenated, with no redundancy."
   ]
  ],
  "example": "Six 2 TB drives give 12 TB in RAID 0, 10 TB in RAID 5, 8 TB in RAID 6 and 6 TB in RAID 10. The administrator picks RAID 10 for the transaction database because of its low write penalty, and RAID 6 for the file archive because it survives two failures during a long rebuild.",
  "tip": "Memorize the formulas: RAID 5 = N-1, RAID 6 = N-2, RAID 1 and 10 = N/2. Write penalties are 2, 4 and 6 for mirroring, RAID 5 and RAID 6. RAID never replaces backups.",
  "check": [
   [
    "How much usable space do five 8 TB drives provide in RAID 5?",
    "32 TB, because RAID 5 gives N minus 1 drives of capacity: 4 x 8 TB."
   ],
   [
    "Which RAID level offers no fault tolerance?",
    "RAID 0, which stripes data without any mirroring or parity."
   ],
   [
    "Why is RAID 6 preferred over RAID 5 for large drives?",
    "Long rebuilds raise the chance of a second failure, and RAID 6 survives two drive failures while RAID 5 survives only one."
   ]
  ]
 },
 {
  "t": "Storage architectures: DAS, NAS, SAN, iSCSI, Fibre Channel, FCoE; capacity planning and base-2 vs base-10 sizing",
  "body": [
   "Servers reach their storage in three broad ways: attached directly, over the network as shared files, or over a dedicated network as raw blocks. Knowing which is which, and which protocol each uses, is a core Server+ skill.",
   "Direct-attached storage (DAS) is connected straight to one server, either internal drives or an external enclosure cabled with SAS. It is simple, fast and inexpensive, but other servers cannot share it easily, and capacity is stranded on that one host. Network-attached storage (NAS) is a device that shares files over the network using file protocols such as SMB (Server Message Block, used by Windows) and NFS (Network File System, common on Linux and UNIX). Clients see folders and files; the NAS owns the file system. NAS is easy to deploy and good for home directories and shared documents.",
   "A storage area network (SAN) presents block storage: chunks of raw disk called LUNs (logical unit numbers) that a server formats with its own file system as if they were local disks. Because many servers can reach a central array, SANs support clustering, virtualization hosts sharing datastores, and centralized snapshots and replication. Access is controlled with zoning on the fabric switches and LUN masking on the array, so each server sees only its own LUNs.",
   "SANs use block protocols. Fibre Channel (FC) is a dedicated, lossless storage network with its own switches and host bus adapters (HBAs), identified by World Wide Names (WWNs). It is fast and predictable but needs specialized equipment and skills. iSCSI (Internet Small Computer Systems Interface) carries SCSI commands over ordinary TCP/IP Ethernet; the server runs an initiator (software or a hardware offload card) that connects to a target on the array, usually over a separate VLAN or physical network with jumbo frames. iSCSI is cheaper and familiar to network staff. FCoE (Fibre Channel over Ethernet) wraps Fibre Channel frames directly in Ethernet frames, without IP, over lossless data center Ethernet using converged network adapters, letting one set of cables carry both data and storage traffic.",
   "Capacity planning means estimating how much storage you need now and later: current data, growth rate, RAID overhead, snapshots, free space for performance and file system overhead. A common trap is units. Drive makers use base-10 (decimal) units, where 1 TB is 1,000,000,000,000 bytes. Many operating systems report in base-2 (binary) units, where 1 TiB (tebibyte) is 1,099,511,627,776 bytes, though some still label it TB. So a 4 TB drive shows up as roughly 3.64 TiB. That gap grows with each prefix: about 2.4 percent at kilo, 7 percent at giga and about 10 percent at tera.",
   "When you size an array, start with raw drive capacity, convert to the units your OS reports, subtract RAID overhead and then leave headroom, since file systems and arrays slow down as they fill."
  ],
  "terms": [
   [
    "NAS",
    "Network-attached storage: a device that shares files over the network with protocols such as SMB and NFS."
   ],
   [
    "SAN",
    "Storage area network: a dedicated network that presents block-level storage (LUNs) to servers."
   ],
   [
    "iSCSI",
    "A protocol that carries SCSI block commands over TCP/IP, using initiators on servers and targets on storage."
   ],
   [
    "LUN",
    "Logical unit number: a block storage volume presented by a SAN to a server."
   ]
  ],
  "example": "An administrator buys eight 2 TB drives for a RAID 6 array, expecting 12 TB. The OS shows about 10.9 TiB, because the vendor's 12 TB is decimal and the OS reports binary units. She updates the capacity plan to use binary figures and adds 20 percent headroom.",
  "tip": "File-level sharing (SMB, NFS) means NAS; block-level (LUNs over FC or iSCSI) means SAN. iSCSI rides on IP; FCoE rides directly on Ethernet without IP. Drives are sold in base-10 but reported in base-2.",
  "check": [
   [
    "Why does a new 1 TB drive show less than 1 TB in the operating system?",
    "The drive is sized in decimal units (10^12 bytes) while the OS reports binary units, so about 931 GiB appears."
   ],
   [
    "Which storage type would a server format with its own file system: NAS share or SAN LUN?",
    "A SAN LUN, because it is presented as raw block storage; a NAS already owns the file system."
   ],
   [
    "What does iSCSI need that Fibre Channel does not?",
    "An IP network; iSCSI runs over TCP/IP Ethernet while Fibre Channel uses its own dedicated fabric."
   ]
  ]
 },
 {
  "t": "Out-of-band management: iLO, iDRAC, IPMI/BMC, remote KVM, IP KVM, crash cart",
  "body": [
   "In-band management uses the server's own operating system and network: you connect with Remote Desktop or SSH. That works until the OS hangs, fails to boot, or the network settings are wrong. Out-of-band management gives you a separate path that works regardless of the operating system's state, so you can power-cycle a server, watch it boot and fix it without walking into the data center.",
   "Most servers include a baseboard management controller (BMC), a small independent computer on the motherboard with its own processor, firmware and usually a dedicated management network port. It runs whenever the server has standby power, even when the server is switched off. The BMC monitors temperatures, fans, voltages and power supplies, keeps a hardware event log, and lets you turn the server on and off, open a remote console, and mount virtual media such as an ISO image to install an operating system.",
   "IPMI (Intelligent Platform Management Interface) is an industry standard for talking to BMCs; tools such as `ipmitool` can query sensors or power-cycle a server. Vendors build richer interfaces on top: HPE calls its BMC iLO (Integrated Lights-Out), Dell calls its version iDRAC (integrated Dell Remote Access Controller), and other vendors have their own names. Many also support the newer Redfish REST API for scripted management. The concepts are the same across vendors.",
   "A KVM (keyboard, video, mouse) switch lets one keyboard, monitor and mouse control several servers. An IP KVM adds a network interface so an administrator can see and control those consoles remotely through a browser, including the BIOS screens. Remote KVM is also a feature of BMCs: the iLO or iDRAC console shows the server's screen from power-on. A crash cart is the low-tech fallback: a cart with a monitor, keyboard, mouse and cables that you wheel to a server to plug in locally when nothing else works.",
   "Because out-of-band interfaces can power off servers and reinstall operating systems, they are high-value targets. Put management ports on a separate, restricted management network or VLAN, never on the internet. Change default credentials immediately, use role-based accounts tied to directory authentication where possible, keep BMC firmware updated, disable unused protocols, and use encrypted access such as HTTPS and SSH rather than older unencrypted options. Log and review who accesses these consoles.",
   "In a lab, you will typically assign the BMC an IP address in the server's setup utility, browse to it, log in and explore the health dashboard, event log and virtual console."
  ],
  "terms": [
   [
    "BMC (baseboard management controller)",
    "An independent controller on the motherboard that provides monitoring and remote control even when the OS is down."
   ],
   [
    "IPMI",
    "Intelligent Platform Management Interface, a standard protocol for communicating with BMCs."
   ],
   [
    "IP KVM",
    "A keyboard-video-mouse switch reachable over the network, giving remote console access including BIOS screens."
   ],
   [
    "Crash cart",
    "A mobile cart with monitor, keyboard and mouse used to connect locally to a server."
   ]
  ],
  "example": "At 2 a.m. a remote server stops responding after an update. The on-call administrator logs in to its iDRAC over the management VLAN, opens the virtual console, sees the OS stuck at a boot error, mounts a recovery ISO as virtual media and repairs the bootloader without driving to the data center.",
  "tip": "If the OS is down or the server is powered off and you must reach it remotely, the answer is out-of-band management (BMC, iLO, iDRAC, IPMI). Securing it means a separate management network and changed default credentials.",
  "check": [
   [
    "Why can a BMC be reached while the server is powered off?",
    "It runs on standby power with its own processor and network port, independent of the main system and OS."
   ],
   [
    "What is a crash cart used for?",
    "Connecting a monitor, keyboard and mouse locally to a server when remote access is unavailable."
   ]
  ]
 },
 {
  "t": "Firmware, BIOS and UEFI settings, Secure Boot, TPM, boot order, driver and firmware update planning",
  "body": [
   "Firmware is the low-level software stored on hardware chips that runs before, and underneath, the operating system. The system firmware starts the server, tests hardware, and hands control to a bootloader. Drives, RAID controllers, network cards and BMCs have firmware too. Server+ tests how to configure system firmware, secure the boot process and update everything safely.",
   "BIOS (Basic Input/Output System) is the legacy firmware interface. UEFI (Unified Extensible Firmware Interface) is its modern replacement. UEFI supports GPT (GUID Partition Table) disks, which allow boot volumes larger than the roughly 2 TB limit of MBR (master boot record) disks, faster startup, network boot options, a graphical setup screen and Secure Boot. Many servers still offer a legacy or compatibility mode, but UEFI mode is the default for current operating systems. The firmware setup utility, opened with a key during POST (power-on self-test), is where you set the boot order, enable virtualization extensions, configure memory and power profiles, and set firmware passwords.",
   "Boot order lists the devices the firmware tries in sequence: local disk, USB, optical, PXE network boot. For installs you might temporarily boot from virtual media or the network; in production, set the local boot device first and restrict other options so nobody can boot a USB stick to bypass the OS. Many servers offer a one-time boot menu so you can change the order for a single boot.",
   "Secure Boot is a UEFI feature that checks the digital signature of each bootloader and driver loaded during startup against trusted keys stored in firmware. Unsigned or tampered code is refused, which blocks boot-level malware such as rootkits. Some Linux distributions and custom drivers need signed shims or enrolled keys to boot with Secure Boot on. A TPM (Trusted Platform Module) is a hardware chip, or firmware equivalent, that securely stores keys and measures the boot process. It enables features like BitLocker drive encryption that unlocks only if the boot chain is unchanged, and attestation that proves a server booted cleanly. You may need to enable the TPM in firmware and clear or take ownership of it when repurposing a server.",
   "Updates fix bugs and security flaws but can also break things, so plan them. Check the vendor's compatibility matrix, because firmware, drivers and OS versions are often tested as a set. Read release notes for prerequisites and required order, such as updating the BMC before the BIOS. Back up configurations, schedule a maintenance window through change management, test on one server first, keep the previous version available for rollback, and never cut power during a flash. Vendors provide bundled update tools or bootable service packs that update many components in one pass, and BMCs can often apply firmware remotely."
  ],
  "terms": [
   [
    "UEFI",
    "Unified Extensible Firmware Interface, the modern firmware replacing BIOS, with GPT support and Secure Boot."
   ],
   [
    "Secure Boot",
    "A UEFI feature that allows only digitally signed, trusted bootloaders and drivers to run at startup."
   ],
   [
    "TPM (Trusted Platform Module)",
    "A hardware security chip that stores cryptographic keys and records measurements of the boot process."
   ],
   [
    "Boot order",
    "The sequence of devices the firmware tries when looking for an operating system to start."
   ]
  ],
  "example": "Before updating twenty servers, an administrator checks the vendor's support matrix, applies the matching BMC, BIOS, RAID controller and NIC firmware to one test server with the vendor's update bundle, confirms it boots cleanly with Secure Boot on, then schedules the rest in an approved maintenance window.",
  "tip": "Secure Boot verifies signatures of boot code; the TPM stores keys and measures boot integrity. Exam answers on updates favor testing first, following the vendor's order and compatibility matrix, and having a rollback plan.",
  "check": [
   [
    "Which firmware type is required for Secure Boot and large GPT boot disks?",
    "UEFI; legacy BIOS lacks Secure Boot and relies on MBR for booting."
   ],
   [
    "Why should you consult a compatibility matrix before updating drivers?",
    "Vendors test firmware, drivers and OS versions together, and mismatched versions can cause instability or failures."
   ]
  ]
 },
 {
  "t": "Hardware components: CPUs and cores, memory types (ECC, registered), expansion cards, fans and hot-swappable parts",
  "body": [
   "A server is built from the same kinds of parts as a desktop, but chosen for reliability, capacity and serviceability. Server+ expects you to recognize those parts, know how they differ from consumer versions and know which can be replaced while the server runs.",
   "The CPU (central processing unit) does the computing. Servers often have multiple sockets, each holding a physical processor, and each processor contains multiple cores that can run work in parallel. Simultaneous multithreading (Intel calls it Hyper-Threading) presents two logical processors per core, which helps some workloads but is not the same as doubling cores. When adding a second processor, match the model, stepping and speed to the first, and remember that memory slots are usually tied to a specific socket, so a second CPU is needed to use its memory banks. Licensing for many products counts sockets or cores, so the CPU choice has cost effects too.",
   "Server memory is RAM (random access memory) with extra protection. ECC (error-correcting code) memory stores extra bits so the memory controller can detect and correct single-bit errors and detect multi-bit errors, preventing silent data corruption and crashes. Registered (buffered) memory, called RDIMM, places a register between the memory controller and the chips, reducing electrical load so a server can hold many more modules. Load-reduced LRDIMMs go further for very large capacities. Unbuffered UDIMMs are common in desktops. Do not mix registered and unbuffered modules, follow the vendor's population rules for which slots to fill first, and install modules in matched sets across channels for best performance.",
   "Expansion cards plug into PCIe (Peripheral Component Interconnect Express) slots and add capabilities: RAID controllers, host bus adapters for Fibre Channel or SAS, extra network interface cards (NICs), and GPUs (graphics processing units) for compute workloads. PCIe slots come in lane widths such as x4, x8 and x16, and in full-height or low-profile sizes, so check that the card fits both the slot's electrical lanes and the chassis. Some slots are connected to a particular CPU and work only when that CPU is installed. Riser cards turn slots sideways in thin 1U and 2U chassis.",
   "Servers use several fans for front-to-back airflow, and in most enterprise servers they are redundant and hot-swappable: if one fails the others spin faster and you replace it without shutting down. Keep the chassis cover on while running, since servers are designed to channel air with it closed, and fill empty drive or PSU bays with blanks.",
   "Commonly hot-swappable parts include drives in caddies, power supplies and fans. CPUs, memory and most expansion cards are not hot-swappable on typical servers and require shutting down, so always check the vendor documentation and use electrostatic discharge (ESD) protection such as a wrist strap when working inside."
  ],
  "terms": [
   [
    "ECC memory",
    "RAM that uses extra bits to detect and correct single-bit errors, preventing silent corruption."
   ],
   [
    "Registered memory (RDIMM)",
    "Memory with a register that buffers signals, allowing more modules and larger capacity per server."
   ],
   [
    "Core",
    "An independent processing unit within a CPU; one socket can contain many cores."
   ],
   [
    "Hot-swappable",
    "Able to be replaced while the system stays powered on and running."
   ]
  ],
  "example": "A virtualization host logs repeated corrected memory errors on one DIMM. Because it uses ECC RDIMMs, the host keeps running without corruption. The administrator migrates the virtual machines off, shuts it down, replaces the module in the same slot following the population guide, and returns it to service.",
  "tip": "ECC corrects errors; registered buffers signals for capacity. Do not mix RDIMMs and UDIMMs. Drives, PSUs and fans are the usual hot-swap parts; CPUs and RAM normally require downtime.",
  "check": [
   [
    "What problem does ECC memory solve?",
    "It detects and corrects single-bit memory errors, preventing silent data corruption and crashes."
   ],
   [
    "Why might memory in some slots not be detected on a two-socket server with one CPU?",
    "Those slots are wired to the second socket, so they only work when the second CPU is installed."
   ]
  ]
 },
 {
  "t": "OS installation: minimum requirements, HCL, bare metal vs virtual, GUI vs core/headless installs, partitioning and file systems (NTFS, ReFS, ext4, XFS, VMFS)",
  "body": [
   "Installing a server operating system well starts before you insert the media. You confirm the hardware is supported and big enough, decide whether the OS will run on physical hardware or a virtual machine, choose how much interface to install, and plan the disk layout and file system.",
   "Every OS publishes minimum requirements for CPU, memory, disk and firmware. Minimums let the OS install, not run your workload, so size for the roles and applications you will add. The HCL (hardware compatibility list) is the vendor's list of hardware certified to work with the OS or hypervisor; using listed hardware and drivers avoids unexplained crashes and keeps you eligible for vendor support. Check it for storage controllers and NICs in particular, since missing drivers are a common reason an installer cannot see the disks.",
   "A bare metal install puts the OS, or a hypervisor, directly on the physical server. A virtual install puts the OS in a virtual machine running on a hypervisor. Virtual installs are faster to provision and easier to snapshot and move, while bare metal suits hypervisor hosts themselves and workloads that need direct hardware access.",
   "Many server operating systems can be installed with or without a graphical interface. Windows Server offers Desktop Experience (full GUI) and Server Core, which has no desktop and is managed with PowerShell, the command line or remote tools. Linux servers are usually installed headless, with no GUI, and managed over SSH. A core or headless install has a smaller attack surface, needs fewer patches and uses fewer resources; the trade-off is that administrators must be comfortable with command-line and remote management.",
   "Partitioning divides a disk into sections. Use GPT with UEFI. Common practice separates the OS from data, so a full data volume cannot crash the OS and you can reinstall without touching data. Linux installs often separate `/boot`, `/`, `/var` (where logs grow) and swap, sometimes using LVM (Logical Volume Manager) so volumes can be resized later.",
   "Choose the file system for the job. NTFS is the standard Windows file system, with permissions (ACLs), encryption, compression and quotas. ReFS (Resilient File System) is a Windows file system built for large volumes and data integrity, with checksums and automatic repair when used with Storage Spaces; it is common for virtualization and backup storage but cannot be used everywhere NTFS can, for example as a typical boot volume. On Linux, ext4 is a mature, general-purpose default, and XFS is a high-performance journaling file system suited to large files and volumes (it can grow but not shrink). VMFS (Virtual Machine File System) is VMware's clustered file system that lets multiple ESXi hosts share the same datastore of virtual machine files."
  ],
  "terms": [
   [
    "HCL (hardware compatibility list)",
    "A vendor's list of hardware tested and supported with a given OS or hypervisor."
   ],
   [
    "Server Core",
    "A Windows Server installation option without the desktop GUI, managed from the command line or remotely."
   ],
   [
    "ReFS",
    "Resilient File System, a Windows file system focused on integrity and large volumes, often used for virtualization and backup storage."
   ],
   [
    "VMFS",
    "VMware's clustered file system that lets several ESXi hosts share a datastore."
   ]
  ],
  "example": "An administrator deploys a new domain controller as a virtual machine using Windows Server Core to reduce patching and attack surface. She checks that the host's RAID controller is on the hypervisor's HCL, gives the VM separate virtual disks for the OS and the directory database, and formats both with NTFS.",
  "tip": "Core or headless installs are the answer when a question stresses smaller attack surface and fewer updates. Know which file system fits which platform: NTFS/ReFS for Windows, ext4/XFS for Linux, VMFS for VMware datastores.",
  "check": [
   [
    "Why check the HCL before installing?",
    "To confirm the hardware and drivers are tested and supported with that OS, avoiding instability and keeping vendor support."
   ],
   [
    "Name one benefit and one drawback of a headless install.",
    "Benefit: smaller attack surface and fewer resources and patches. Drawback: administration requires command-line or remote tools."
   ]
  ]
 },
 {
  "t": "Installation methods: media, PXE/network boot, imaging and cloning, templates, answer files, P2V",
  "body": [
   "Installing one server by hand from a DVD is fine. Installing fifty the same way is slow and error-prone. Server+ tests the range of installation methods, from simple media to fully automated deployment, and when each fits.",
   "Media-based installs boot from an ISO image on a USB drive, optical disc or virtual media mounted through the BMC. You walk through the installer and answer each prompt. This is the most direct method and a good fallback, but every server ends up slightly different unless you are careful.",
   "PXE (Preboot Execution Environment) boot lets a server start from the network. The NIC firmware requests an address from DHCP (Dynamic Host Configuration Protocol); the DHCP response includes the address of a boot server and a boot file name, which the server downloads with TFTP (Trivial File Transfer Protocol) and runs to start the installer. Tools such as Windows Deployment Services or Linux network install servers use PXE to deploy many machines without touching media. PXE needs DHCP on the same network or a DHCP relay, and the boot order must include network boot. Because anyone on that network could boot from it, restrict PXE to a provisioning VLAN.",
   "Answer files automate the installer's questions: time zone, partitioning, packages, administrator password and network settings. Windows uses an unattend file (often `unattend.xml`), Red Hat-based Linux uses Kickstart, and Debian-based Linux uses preseed files. Combined with PXE, answer files give you hands-off, repeatable builds.",
   "Imaging and cloning copy a fully configured system. You build a reference machine, install updates and applications, generalize it to remove unique identifiers (on Windows with Sysprep, so each copy gets its own security identifier and computer name), capture it as an image and deploy that image to other servers. Cloning copies one disk to another directly. Images are fast to deploy but go stale, so update them regularly.",
   "Templates are the virtualization version of images. A VM template is a master virtual machine, usually generalized, that the hypervisor clones to create new VMs with consistent settings. Cloud platforms offer similar machine images.",
   "P2V (physical to virtual) converts an existing physical server into a virtual machine, typically with a conversion tool that copies the disks and injects virtual hardware drivers. It is used when consolidating old hardware onto a hypervisor. The related terms V2V (virtual to virtual, between hypervisors) and V2P (virtual to physical) also appear. After a P2V, remove physical-hardware software like vendor agents, check the virtual NIC settings, and keep the physical machine powered off so both do not appear on the network with the same identity."
  ],
  "terms": [
   [
    "PXE",
    "Preboot Execution Environment: booting a computer over the network using DHCP and TFTP to load an installer or image."
   ],
   [
    "Answer file",
    "A file that supplies installer responses automatically, such as unattend.xml or Kickstart."
   ],
   [
    "Sysprep",
    "A Windows tool that generalizes an installation, removing unique identifiers before it is captured as an image."
   ],
   [
    "P2V",
    "Physical-to-virtual conversion of an existing physical server into a virtual machine."
   ]
  ],
  "example": "A company needs thirty identical Linux web servers. The team creates a Kickstart file defining partitions and packages, puts the servers on a provisioning VLAN with PXE, and powers them on. Each boots from the network and installs itself; afterwards configuration management applies the web role.",
  "tip": "PXE depends on DHCP and TFTP plus network boot in the boot order. Always generalize a Windows image (Sysprep) before cloning so machines do not share identifiers.",
  "check": [
   [
    "Which two network services does PXE boot rely on?",
    "DHCP to provide an address and boot server information, and TFTP to download the boot file."
   ],
   [
    "What is the purpose of an answer file?",
    "It supplies installer settings automatically so installs are unattended and consistent."
   ]
  ]
 },
 {
  "t": "Network services: static vs DHCP addressing, DNS, NTP, NIC teaming/bonding, VLAN tagging, firewall ports, IPv4 and IPv6",
  "body": [
   "A server that cannot be found or reached on the network is not doing its job. This topic covers how a server gets its address, how clients find it by name, how it keeps time, how its network links are made redundant and segmented, and which ports it listens on.",
   "Servers usually get static IP addresses, configured by hand, so their addresses never change and DNS records, firewall rules and client settings stay valid. DHCP (Dynamic Host Configuration Protocol) hands out addresses automatically and suits client devices. A middle path is a DHCP reservation, which always gives the same address to a specific MAC address. Either way, each server needs a correct IP address, subnet mask (or prefix length), default gateway and DNS server addresses. IPv4 uses 32-bit addresses written as four decimal numbers; IPv6 uses 128-bit addresses written in hexadecimal groups, can configure itself with SLAAC (stateless address autoconfiguration) or DHCPv6, and always has a link-local address starting with `fe80::`. Many servers run both (dual stack).",
   "DNS (Domain Name System) translates names to addresses. Important record types include A (name to IPv4), AAAA (name to IPv6), CNAME (alias), MX (mail server), PTR (reverse lookup, address to name) and SRV (service locations, used by Active Directory). Servers need accurate records and should point at reliable internal DNS servers.",
   "NTP (Network Time Protocol) synchronizes clocks. Accurate time matters for authentication (Kerberos rejects tickets when clocks differ by more than a few minutes by default), log correlation, certificates and scheduled jobs. Point servers at internal time sources that sync with trusted upstream servers.",
   "NIC teaming, called bonding on Linux, combines two or more network adapters into one logical interface for fault tolerance, extra bandwidth or both. Modes include active-passive (failover) and active-active load balancing; some active-active modes, such as LACP (Link Aggregation Control Protocol), require matching configuration on the switch. Connect team members to different switches when possible so a switch failure does not isolate the server.",
   "A VLAN (virtual local area network) separates traffic on shared switches. Using 802.1Q tagging, a server or hypervisor port configured as a trunk can carry several VLANs, adding a tag to each frame; the switch port must allow the same VLANs. This lets one physical link carry management, storage and production traffic separately.",
   "Know common ports so you can open only what a role needs: SSH 22, SMTP 25, DNS 53, DHCP 67 and 68, HTTP 80, NTP 123, LDAP 389, HTTPS 443, SMB 445, LDAPS 636, SQL Server 1433, RDP 3389. Host firewalls should allow these only from the networks that need them."
  ],
  "terms": [
   [
    "DHCP reservation",
    "A DHCP setting that always assigns the same IP address to a specific device's MAC address."
   ],
   [
    "NIC teaming/bonding",
    "Combining multiple network adapters into one logical interface for redundancy and possibly more bandwidth."
   ],
   [
    "802.1Q",
    "The standard for VLAN tagging, which marks Ethernet frames with a VLAN ID so one link can carry multiple VLANs."
   ],
   [
    "NTP",
    "Network Time Protocol, used to keep system clocks synchronized; it uses UDP port 123."
   ]
  ],
  "example": "Users cannot log on to a new application server. The administrator finds its clock is ten minutes fast because NTP was never configured, so Kerberos authentication fails. Pointing it at the domain's time source fixes logons immediately.",
  "tip": "Servers get static addresses or reservations, not dynamic leases. Time drift breaks Kerberos authentication. LACP teaming needs switch configuration; simple failover teaming does not.",
  "check": [
   [
    "Which DNS record maps a name to an IPv6 address?",
    "An AAAA record."
   ],
   [
    "Why must a switch port be configured as a trunk for a hypervisor carrying several VLANs?",
    "The host sends 802.1Q-tagged frames for multiple VLANs, and only a trunk port accepts and forwards tagged traffic for those VLANs."
   ],
   [
    "What port does RDP use?",
    "TCP 3389."
   ]
  ]
 },
 {
  "t": "Server roles: web, application, database, file and print, directory services, DNS/DHCP, mail, messaging, NTP, and how roles relate to hardware sizing",
  "body": [
   "A server role is the job a server performs for its clients. Knowing what each role does tells you which ports it opens, which resources it stresses and how much hardware it needs. Server+ asks you to match roles to their purpose and to their sizing priorities.",
   "A web server delivers web pages and APIs over HTTP and HTTPS; examples include IIS on Windows and Apache or Nginx on Linux. Simple web servers need moderate CPU and memory and fast networking, and they scale well by adding more servers behind a load balancer. An application server runs business logic, often the middle tier between a web front end and a database; its needs depend on the application but usually center on CPU and memory.",
   "A database server stores and queries structured data. It is usually the most demanding role: it needs plenty of memory to cache data, fast storage with high IOPS and low latency (often SSD or NVMe in RAID 10), and enough CPU cores for concurrent queries. Database licensing is often per core, which also affects hardware choices.",
   "A file server shares folders over SMB or NFS; its priorities are storage capacity, reliable disks and network throughput. A print server manages print queues and drivers for shared printers and needs few resources. Directory services, such as Active Directory Domain Services on a domain controller, store users, groups and computers and handle authentication. Domain controllers need reliability more than raw power, and you should run at least two for redundancy.",
   "Infrastructure roles keep the network working. DNS servers resolve names and DHCP servers assign addresses; both are light on resources but critical, so run them redundantly. An NTP server provides time to the rest of the network. A mail server, such as Exchange or Postfix, sends and receives email and stores mailboxes, so it needs substantial storage and memory. Messaging servers include chat and collaboration platforms and message queues that pass data between applications; they need low latency and reliable storage for queued messages.",
   "To size hardware for a role, first identify the bottleneck resource: CPU for compute-heavy applications, memory for databases and virtualization hosts, disk IOPS for transactional systems, capacity for file and backup servers, and network bandwidth for file and web traffic. Collect a baseline from existing systems or the vendor's sizing guide, add expected growth, and leave headroom. Consider also whether roles can share a server. Combining lightweight roles like DNS and DHCP is common, but mixing a busy database with a public web server increases risk, because a compromise or resource spike in one affects the other. Virtualization makes it easy to give each role its own VM while sharing hardware.",
   "Finally, remember that each role adds services and open ports, so install only the roles a server actually needs."
  ],
  "terms": [
   [
    "Server role",
    "The primary function a server provides to clients, such as web, database or file services."
   ],
   [
    "Domain controller",
    "A server running directory services that stores accounts and authenticates users and computers in a domain."
   ],
   [
    "Application server",
    "A server that runs business logic, often sitting between web front ends and databases."
   ],
   [
    "Sizing",
    "Choosing CPU, memory, storage and network capacity to meet a workload's needs plus growth and headroom."
   ]
  ],
  "example": "A company plans a new inventory system. The web tier runs on two modest VMs behind a load balancer, the application tier gets more CPU, and the database server receives the most memory and a RAID 10 SSD array because baseline data from the old system showed storage latency was the bottleneck.",
  "tip": "When a question asks which resource matters most: databases and virtualization hosts want memory and fast storage, file servers want capacity and network throughput, and DNS/DHCP want redundancy more than power.",
  "check": [
   [
    "Which server role typically benefits most from high-IOPS storage?",
    "The database server, because it performs many small random reads and writes."
   ],
   [
    "Why run at least two domain controllers?",
    "Authentication depends on them; a second one keeps logons working if the first fails."
   ]
  ]
 },
 {
  "t": "High availability: clustering (active-active vs active-passive), heartbeat, quorum, load balancing methods (round robin, least connections), failover and failback",
  "body": [
   "High availability (HA) is designing a service so it keeps running, or recovers within seconds or minutes, when a component fails. Availability is often expressed as a percentage of uptime, such as 99.9 or 99.99 percent. The main tools are clusters and load balancers, and both rely on having no single point of failure.",
   "A cluster is a group of servers, called nodes, that work together to provide a service. In an active-passive cluster, one node runs the service while the other stands by; if the active node fails, the passive node takes over. It is simpler and gives predictable performance after failover, but the standby's capacity sits idle. In an active-active cluster, all nodes serve traffic at once, which uses hardware fully and spreads load. The catch is that if one node fails, the survivors must absorb its load, so each must have spare capacity; running two active nodes at 80 percent each means one node cannot carry 160 percent.",
   "Nodes monitor each other through a heartbeat, a regular signal sent over the network, often on a dedicated link. If a node stops sending heartbeats, the others assume it has failed and start failover. A dangerous situation is split brain: the heartbeat link breaks but both nodes are still running, each thinks the other is dead, and both try to own the same data, which can corrupt it. Quorum prevents this. Each node, and often a witness such as a shared disk or a file share, gets a vote, and the cluster runs only on the side that holds a majority of votes. That is why clusters prefer odd numbers of votes and add a witness when there is an even number of nodes.",
   "Failover is moving a service from a failed or unhealthy node to a healthy one, automatically or manually. Failback is moving it back to the original node once that node is repaired. Failback can be automatic or manual; many administrators prefer manual or scheduled failback so the service does not move twice during business hours or bounce back to a node that is still unstable.",
   "A load balancer distributes client requests across a pool of servers and removes unhealthy servers using health checks. Round robin sends each new request to the next server in turn, which is simple and works when servers and requests are similar. Weighted round robin sends more to stronger servers. Least connections sends each new request to the server with the fewest active connections, which handles long-lived or uneven sessions better. Some applications need session persistence (sticky sessions) so a user keeps reaching the same server. Load balancers themselves are usually deployed in pairs to avoid becoming a single point of failure."
  ],
  "terms": [
   [
    "Active-passive cluster",
    "A cluster in which one node serves while another waits to take over on failure."
   ],
   [
    "Heartbeat",
    "A periodic signal nodes exchange to confirm each other is alive."
   ],
   [
    "Quorum",
    "The majority vote a cluster requires to keep running, preventing split brain."
   ],
   [
    "Least connections",
    "A load-balancing method that sends new requests to the server with the fewest active connections."
   ]
  ],
  "example": "A two-node SQL cluster loses its heartbeat network. Because a file share witness gives the cluster three votes, the node that can still reach the witness keeps quorum and runs the database, while the isolated node stops its services, avoiding split brain.",
  "tip": "Quorum and witnesses exist to prevent split brain. Round robin assumes equal servers and requests; least connections suits uneven or long sessions. Active-active nodes need spare capacity to absorb a failed partner's load.",
  "check": [
   [
    "What is failback?",
    "Returning a service to its original node after that node has been repaired."
   ],
   [
    "Why add a witness to a two-node cluster?",
    "It provides a tie-breaking vote so one side can hold a majority and keep quorum if the nodes lose contact."
   ],
   [
    "Which load-balancing method works best when sessions vary widely in length?",
    "Least connections, because it accounts for how busy each server currently is."
   ]
  ]
 },
 {
  "t": "Redundancy: NIC teaming, multipathing (MPIO), redundant power and storage, fault tolerance vs high availability",
  "body": [
   "Redundancy means having more than one of a component so that a failure does not stop the service. The goal is to eliminate single points of failure (SPOFs): any one part whose failure takes the whole system down. Server+ asks you to spot SPOFs and to know the specific technologies that remove them.",
   "Start with the network. NIC teaming combines two or more network adapters into one logical interface, so if a cable, port or card fails, traffic continues on the remaining members. For full protection, connect the team members to two different switches and use different physical cards rather than two ports on the same card, since a failed card would take both ports down.",
   "Storage paths need the same treatment. Multipathing, or MPIO (multipath I/O), gives a server more than one path to its SAN storage: two host bus adapters or iSCSI NICs, two fabric switches and two storage controllers. The multipath driver presents the LUN as a single disk and either fails over between paths or balances traffic across them (for example round robin). Without MPIO, the OS may see the same LUN twice and treat it as two disks, which can cause corruption. Enable the MPIO feature or the Linux `multipath` service and configure the vendor's recommended policy.",
   "Power redundancy comes from dual power supplies fed from separate PDUs, circuits and UPS units, plus a generator for long outages. Storage redundancy comes from RAID, hot spares, dual-controller arrays and replication to another array. Cooling redundancy comes from extra fans and extra air-conditioning units. At a higher level, you add redundant servers in clusters, redundant switches and routers, and even redundant sites.",
   "Fault tolerance and high availability are related but not identical. A fault-tolerant system continues operating with no interruption at all when a component fails; users never notice. RAID 1 losing a drive, or a server running on its second power supply, are examples. High availability accepts a brief interruption while the service recovers, such as the seconds or minutes a cluster takes to fail over and restart a service on another node. True fault tolerance usually costs more because it duplicates everything in lockstep. Choosing between them depends on how much downtime the business can accept and what it is willing to pay.",
   "Remember that redundant components must be monitored. A failed power supply or a dead team member leaves you running without protection, so alerts from the BMC, RAID controller and OS must reach someone who will replace the part."
  ],
  "terms": [
   [
    "Single point of failure (SPOF)",
    "Any component whose failure alone stops the whole system."
   ],
   [
    "MPIO (multipath I/O)",
    "Software that uses multiple physical paths to the same storage for failover and load balancing, presenting them as one disk."
   ],
   [
    "Fault tolerance",
    "The ability to keep operating with no interruption when a component fails."
   ],
   [
    "High availability",
    "Design that minimizes downtime, allowing a short interruption while failover occurs."
   ]
  ],
  "example": "An audit finds that a virtualization host has two iSCSI NICs, but both connect to the same switch. When that switch is rebooted for an update, every VM loses its storage. The fix is to move one NIC to a second switch and confirm MPIO shows two active paths.",
  "tip": "Fault tolerant means zero interruption; highly available means a brief interruption during failover. MPIO is the answer for redundant storage paths, NIC teaming for redundant network links.",
  "check": [
   [
    "What can happen if a server sees a SAN LUN through two paths without MPIO?",
    "The OS may treat the LUN as two separate disks, risking data corruption."
   ],
   [
    "Is a two-node failover cluster fault tolerant or highly available?",
    "Highly available, because the service is briefly interrupted while it fails over."
   ]
  ]
 },
 {
  "t": "Virtualization: Type 1 vs Type 2 hypervisors, host vs guest, resource allocation and overcommitment, virtual switches and NICs, snapshots, templates, VM migration",
  "body": [
   "Virtualization runs many independent virtual machines (VMs) on one physical server. It raises hardware utilization, speeds up provisioning and makes it easy to move or recover workloads. The software that makes this possible is the hypervisor.",
   "A Type 1 hypervisor, also called bare metal, installs directly on the hardware and runs VMs with minimal overhead. Examples include VMware ESXi, Microsoft Hyper-V and KVM on Linux. It is what production data centers use. A Type 2 hypervisor, also called hosted, runs as an application on top of a normal operating system, such as VirtualBox or VMware Workstation on a laptop. It is convenient for labs and testing but adds overhead and depends on the host OS. The physical machine is the host; each VM is a guest running its own guest operating system. Hypervisors need CPU virtualization extensions (Intel VT-x or AMD-V) enabled in firmware.",
   "Resource allocation assigns each VM virtual CPUs (vCPUs), memory, disk and network adapters. Overcommitment means allocating more virtual resources than physically exist, relying on VMs not all using their full share at once. CPU overcommitment is common and generally safe in moderation; too much causes CPU ready time, where VMs wait for a physical core. Memory overcommitment is riskier: when the host runs out, it uses techniques such as ballooning and swapping to disk, which slow VMs dramatically. Storage can be thin provisioned, where a virtual disk only consumes the space actually written; this saves space but you must monitor datastores so they do not fill and pause every VM on them. Thick provisioning reserves the full size up front.",
   "Networking is also virtual. Each VM has one or more virtual NICs connected to a virtual switch inside the host. The virtual switch connects to the physical NICs (uplinks) for external traffic, and can be external (reaches the physical network), internal (host and VMs only) or private (VMs only). Port groups or VLAN settings on the virtual switch tag traffic onto the right VLANs.",
   "A snapshot captures a VM's disk state, and optionally memory, at a point in time so you can roll back, for example before a risky update. Snapshots work by writing changes to delta files, so they grow over time and degrade performance; delete them once no longer needed, and never treat a snapshot as a backup, since it depends on the original disk. A template is a master VM image used to deploy new, consistent VMs quickly.",
   "VM migration moves a VM between hosts. Live migration (called vMotion in VMware and Live Migration in Hyper-V) moves a running VM with no noticeable downtime, usually requiring shared storage or a storage migration, compatible CPUs and a fast migration network. Cold migration moves a powered-off VM. Migration makes host maintenance possible without outages."
  ],
  "terms": [
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor installed directly on hardware, used in production."
   ],
   [
    "Overcommitment",
    "Allocating more virtual CPU or memory to VMs than the host physically has."
   ],
   [
    "Snapshot",
    "A point-in-time capture of a VM's state used for short-term rollback, not a backup."
   ],
   [
    "Live migration",
    "Moving a running VM from one host to another without shutting it down."
   ]
  ],
  "example": "Before patching a host, the administrator live-migrates its twelve VMs to another cluster node, patches and reboots the empty host, then moves them back. She also finds a three-month-old snapshot slowing a file server VM and consolidates it.",
  "tip": "Type 1 runs on bare metal and is used in data centers; Type 2 runs on a host OS. Snapshots are for short-term rollback and hurt performance if kept; they are never a substitute for backups.",
  "check": [
   [
    "Which hypervisor type runs as an application on a desktop OS?",
    "Type 2 (hosted), such as VirtualBox."
   ],
   [
    "What risk comes with thin provisioning?",
    "Datastores can fill up unexpectedly as disks grow, which can pause or crash VMs."
   ],
   [
    "Why is memory overcommitment riskier than CPU overcommitment?",
    "When physical memory runs out, the host must balloon or swap to disk, which severely slows VMs."
   ]
  ]
 },
 {
  "t": "Cloud models: IaaS, PaaS, SaaS; public, private, hybrid; on-premises vs cloud-hosted servers",
  "body": [
   "Cloud computing delivers computing resources on demand over a network, with self-service provisioning, elastic scaling and pay-as-you-go billing. Server+ administrators need to know which service model shifts which responsibilities to a provider, and which deployment model suits a given organization.",
   "The service models describe how much the provider manages. In IaaS (Infrastructure as a Service), the provider supplies virtual machines, storage and networks; you install and manage the operating system, patches, middleware and applications. It is the closest to running your own servers and gives the most control. In PaaS (Platform as a Service), the provider also manages the OS and runtime, and you deploy your code or databases onto a managed platform, so you no longer patch servers. In SaaS (Software as a Service), the provider runs the entire application and you simply use it through a browser or client, such as hosted email or a CRM system; you manage only your data, users and settings.",
   "This split is the shared responsibility model. The provider always secures the physical data centers and hardware. As you move from IaaS to PaaS to SaaS, more layers shift to the provider. You, the customer, always remain responsible for your data, user accounts and access control. Many cloud security incidents come from customers misconfiguring the parts they own, such as leaving storage publicly readable.",
   "The deployment models describe who uses the infrastructure. A public cloud is owned by a provider and shared by many customers (tenants), isolated from each other logically. It offers huge scale and no hardware to buy. A private cloud is dedicated to one organization, either in its own data center or hosted by a provider, giving more control and easier compliance at higher cost. A hybrid cloud connects private or on-premises resources with public cloud services so workloads and data can move between them, for example keeping a sensitive database on-premises while bursting web servers into the public cloud during peaks. A community cloud is shared by organizations with common requirements.",
   "On-premises servers run in your own facility. You buy the hardware (capital expense), control everything, and are responsible for power, cooling, physical security and hardware replacement. Cloud-hosted servers are rented (operational expense), scale quickly and shift hardware care to the provider, but costs can grow if unmanaged, performance depends on network connectivity, and data location may matter for regulations. Many organizations choose based on workload: steady, predictable or regulated workloads often stay on-premises, while variable or new workloads go to the cloud.",
   "As a server administrator in the cloud, your IaaS skills carry over: you still size instances, harden operating systems, patch, back up and monitor."
  ],
  "terms": [
   [
    "IaaS",
    "Infrastructure as a Service: rented VMs, storage and networks where the customer manages the OS and above."
   ],
   [
    "PaaS",
    "Platform as a Service: a managed runtime where the customer deploys code without managing servers."
   ],
   [
    "SaaS",
    "Software as a Service: a complete application run by the provider and used by the customer."
   ],
   [
    "Hybrid cloud",
    "A combination of on-premises or private resources and public cloud services that work together."
   ]
  ],
  "example": "A retailer moves email to a SaaS provider, runs its custom web app on a PaaS platform so developers no longer patch servers, and keeps its payment database on-premises. Connecting the on-premises database with the cloud-hosted app makes the environment a hybrid cloud.",
  "tip": "Ask who patches the OS: you do in IaaS, the provider does in PaaS and SaaS. The customer is always responsible for data and user access regardless of model.",
  "check": [
   [
    "In which service model do you still patch the guest operating system?",
    "IaaS, because the provider supplies only infrastructure."
   ],
   [
    "What makes a cloud deployment hybrid?",
    "It combines on-premises or private cloud resources with public cloud services that are connected and used together."
   ]
  ]
 },
 {
  "t": "Scripting basics: Bash, PowerShell, batch, Python; variables, loops, conditionals, comparators; common uses (user setup, log checks, scheduled tasks)",
  "body": [
   "Scripting turns repetitive administrative work into a file of commands you can run again and again, the same way each time. Server+ does not expect you to be a programmer, but you should read a short script, recognize its language and say what it does.",
   "Bash is the standard shell on Linux; scripts usually end in `.sh` and start with a shebang line like `#!/bin/bash`. PowerShell is Microsoft's object-based shell for Windows (and also available on Linux), with scripts ending in `.ps1` and commands in verb-noun form such as `Get-Service`. Batch files (`.bat` or `.cmd`) are the older Windows command prompt scripts. Python is a general-purpose language (`.py`) used on every platform for automation. Each has the same basic building blocks.",
   "A variable stores a value for later. In Bash you write `name=value` and read it with `$name`; in PowerShell both use a dollar sign, `$name = 'value'`; in batch, `set name=value` and `%name%`; in Python, `name = 'value'`. Conditionals choose what to do: `if`, `else` and `elif` or `elseif`. Loops repeat work: a `for` loop runs once per item in a list, and a `while` loop runs as long as a condition holds.",
   "Comparators test values. Bash uses `-eq`, `-ne`, `-gt` and `-lt` for numbers and `==` or `!=` for strings inside test brackets. PowerShell uses `-eq`, `-ne`, `-gt`, `-lt`, `-like` and `-match`, because `>` means redirection in shells. Python uses `==`, `!=`, `>` and `<`. Mixing these up is a classic exam trap: `-gt` is shell and PowerShell style, while `>` is Python style.",
   "```bash\n#!/bin/bash\n# Warn if root file system usage is above 90 percent\nusage=$(df / --output=pcent | tail -1 | tr -dc '0-9')\nif [ \"$usage\" -gt 90 ]; then\n  echo \"Disk usage is ${usage}%\"\nfi\n```",
   "```powershell\n# Create users from a CSV file\n$users = Import-Csv users.csv\nforeach ($u in $users) {\n  New-LocalUser -Name $u.Name -NoPassword\n}\n```",
   "Common uses include creating user accounts in bulk from a list, checking logs for errors and emailing a summary, monitoring disk space, rotating or archiving files, collecting inventory, and restarting a service that has stopped. Scripts are often run on a schedule: `cron` on Linux (a crontab line gives minute, hour, day of month, month and day of week) and Task Scheduler on Windows.",
   "Write scripts safely. Test in a lab first, add comments, avoid hard-coding passwords (use a secure credential store), run with the least privilege needed, and keep scripts in version control so changes are tracked. PowerShell's execution policy controls whether scripts can run, and signed scripts give extra assurance."
  ],
  "terms": [
   [
    "Variable",
    "A named storage location for a value that a script can read and change."
   ],
   [
    "Loop",
    "A structure that repeats commands, such as for (per item) or while (until a condition changes)."
   ],
   [
    "Comparator",
    "An operator that compares values, such as -eq or -gt in shells and == or > in Python."
   ],
   [
    "cron",
    "The Linux scheduler that runs commands at set times defined in a crontab."
   ]
  ],
  "example": "Every morning at 6:00, a cron job runs a Bash script that searches the previous day's web server log for HTTP 500 errors, counts them, and sends the count to the operations channel so the team sees problems before users call.",
  "tip": "Identify the language from clues: $ variables with -eq and cmdlets like Get-Item mean PowerShell; shebang and [ ] tests mean Bash; %var% means batch; indentation with == means Python.",
  "check": [
   [
    "Which comparator would a Bash script use to test whether a number is greater than 90?",
    "-gt, as in [ \"$usage\" -gt 90 ]."
   ],
   [
    "What Windows tool schedules a PowerShell script to run nightly?",
    "Task Scheduler."
   ]
  ]
 },
 {
  "t": "Asset management and documentation: labeling, inventory, warranty, life-cycle, baselines, diagrams, change management, SLAs, secure storage of documents",
  "body": [
   "Good documentation is what lets someone else, or you at 3 a.m., understand, fix and change a server environment safely. Asset management keeps track of what you own and where it is in its life. Server+ treats both as core administrative duties.",
   "Labeling comes first. Label every server, drive bay, cable end, PDU and port with a consistent naming scheme, and physically tag assets with an asset number or barcode. The label connects the physical device to its record. An inventory, often in an asset management system or CMDB (configuration management database), records each asset's make, model, serial number, location (rack and U position), owner, purchase date, configuration and relationships to other systems.",
   "Track warranty and support contracts: start and end dates, the response level (next business day or four-hour on-site, for example) and how to open a case. Knowing a server is out of warranty before it fails changes whether you buy a part or replace the machine. The asset life-cycle runs from procurement, through deployment, operation, maintenance and upgrades, to decommissioning and disposal. Planning refresh cycles avoids running critical services on unsupported hardware or software past its end of life.",
   "A baseline is a recorded snapshot of normal: a standard configuration (the approved settings for a server type) and performance measurements (typical CPU, memory, disk and network use). Configuration baselines help you detect drift and unauthorized changes; performance baselines help you recognize when something is abnormal.",
   "Diagrams show how things fit together. Physical diagrams include rack elevations and cabling maps. Logical diagrams show networks, IP addressing, VLANs and how applications depend on each other. Keep them current, or they mislead during outages.",
   "Change management is the formal process for making changes with control. A request describes what will change, why, the risk, the implementation steps, the test plan and a rollback plan. A change advisory board (CAB) or approver reviews it, it is scheduled in a maintenance window, implemented, verified and documented. Emergency changes follow a faster path but are still recorded. This process prevents surprise outages and gives an audit trail.",
   "An SLA (service level agreement) is a documented commitment between a provider and customer, such as 99.9 percent uptime or a four-hour response time, often with penalties if missed. Internal teams may use operational level agreements (OLAs) with each other.",
   "Documentation often contains sensitive details: IP plans, passwords, firewall rules. Store it securely with access controls, encrypt it, keep passwords in a password vault rather than documents, keep version history, and ensure an offline copy exists so it is available during a major outage."
  ],
  "terms": [
   [
    "CMDB",
    "Configuration management database: a record of IT assets, their configuration and relationships."
   ],
   [
    "Baseline",
    "A documented standard configuration or normal performance level used for comparison."
   ],
   [
    "Change management",
    "A controlled process to request, approve, schedule, implement and document changes with rollback plans."
   ],
   [
    "SLA",
    "Service level agreement: a formal commitment on service performance such as uptime or response time."
   ]
  ],
  "example": "A drive fails in a storage array. Because the asset record lists the serial number, rack position and a four-hour on-site warranty, the technician opens a case in minutes, and the replacement is logged in the CMDB against the same asset tag.",
  "tip": "Changes need a documented request, approval, a maintenance window and a rollback plan. A baseline is what you compare against to tell whether current behavior is abnormal.",
  "check": [
   [
    "What must a change request include besides the change itself?",
    "Reason, risk assessment, implementation and test steps, a schedule, and a rollback plan."
   ],
   [
    "Why keep an offline copy of documentation?",
    "So it is available when the systems that store it are down, for example during a disaster."
   ]
  ]
 },
 {
  "t": "Licensing models: per socket, per core, per user, per device/CAL, site, subscription, open source; license compliance and version compatibility",
  "body": [
   "Software licenses define how you may use a product and how you pay for it. Getting licensing wrong can cost more than the hardware, either through overbuying or through penalties after an audit. Server+ expects you to recognize the common models and know how hardware choices affect them.",
   "Per-socket licensing charges for each physical processor socket in the server, regardless of how many cores each processor has. Per-core licensing charges for each physical core, often with a minimum number of cores per processor or per server. Many modern server operating systems and databases use per-core licensing, so adding a CPU with more cores can raise license costs, and in virtualized environments you may need to license all cores of every host a VM could run on. When sizing hardware, fewer, faster cores can be cheaper overall for core-licensed software.",
   "Per-user and per-device licenses cover who or what accesses the server. A client access license (CAL) is the classic example in the Microsoft world: in addition to licensing the server itself, each user (user CAL) or each device (device CAL) that connects needs a CAL. User CALs suit people who use several devices; device CALs suit shared devices, such as a kiosk or a shift-work PC used by many people. Some products also offer per-concurrent-user licensing, counting how many people use it at the same moment.",
   "A site license covers unlimited use at a location or across an organization for a fixed price, which simplifies tracking. Subscription licensing charges a recurring fee, monthly or yearly, and usually includes updates and support; stop paying and the right to use the software ends. Perpetual licenses, by contrast, let you use a specific version indefinitely, with optional paid maintenance for updates and support.",
   "Open source software makes its source code available under licenses such as the GPL (GNU General Public License), MIT or Apache licenses. It is often free to use, but not free of obligations: some licenses require you to share modifications if you distribute them, and enterprise distributions sell paid support subscriptions. Read the license terms before building products on it.",
   "License compliance means using only what you have paid for and following the terms. Keep records of purchases, keys and assignments in your asset system, track installations with inventory tools, and reconcile regularly. Vendors may audit you, and unlicensed use can lead to fines. Also check version compatibility: a license may cover a specific version, downgrade rights may let you run an older version, and some applications support only certain OS versions. Upgrading an OS may require new licenses or break an application that is not certified for it."
  ],
  "terms": [
   [
    "Per-core licensing",
    "A model that charges for each physical processor core, often with per-processor or per-server minimums."
   ],
   [
    "CAL (client access license)",
    "A license that permits a user or device to access server software."
   ],
   [
    "Subscription license",
    "A recurring-fee license that includes updates and ends when payments stop."
   ],
   [
    "Site license",
    "A license allowing unlimited use within a defined location or organization for a set fee."
   ]
  ],
  "example": "A company plans to replace two 8-core CPUs with two 32-core CPUs in its database server. Before ordering, the administrator checks the database's per-core licensing and finds the new CPUs would quadruple the license cost, so they choose a smaller core count with higher clock speed.",
  "tip": "User CALs fit people with many devices; device CALs fit devices shared by many people. More cores can mean higher costs under per-core licensing, even if the hardware is cheap.",
  "check": [
   [
    "A call center has 100 workers sharing 30 PCs across shifts. User or device CALs?",
    "Device CALs, because 30 device licenses cover all the shared PCs, fewer than 100 user licenses."
   ],
   [
    "Does open source mean there are no license obligations?",
    "No. Open source licenses have terms, such as sharing modifications on distribution, and support may be sold separately."
   ]
  ]
 },
 {
  "t": "Data security: encryption at rest and in transit, data retention, data storage location, UEFI/BIOS passwords, bootloader password",
  "body": [
   "Servers hold the data an organization cares about most. Data security protects that data wherever it is: sitting on disk, moving across a network, and during the boot process when an attacker with physical access might try to bypass the operating system.",
   "Encryption at rest protects stored data so that a stolen drive, backup tape or disk image is unreadable without the key. Options include full-disk or volume encryption (BitLocker on Windows, LUKS on Linux), self-encrypting drives that encrypt in hardware, file-level encryption, and database encryption such as transparent data encryption. Encryption is only as strong as key management: keep keys in a TPM, hardware security module or managed key service, back up recovery keys securely and separately from the data, and control who can access them.",
   "Encryption in transit protects data crossing the network from eavesdropping and tampering. Use TLS (Transport Layer Security) for web traffic (HTTPS), SSH instead of Telnet, SFTP or FTPS instead of plain FTP, LDAPS for directory queries, SMB encryption for file shares, and VPNs or IPsec for site-to-site links. Disable old protocol versions and weak ciphers, and manage certificates so they do not expire.",
   "Data retention defines how long data must be kept and when it must be destroyed. Retention periods come from laws, regulations, contracts and business needs, for example keeping financial records for several years or deleting personal data when no longer needed. Keeping data too briefly can break laws; keeping it too long increases the amount exposed in a breach and the cost of legal discovery. Retention policies should apply to backups and archives too, and a legal hold can suspend deletion for data involved in litigation.",
   "Data storage location matters because data is subject to the laws of the country where it is stored, an idea called data sovereignty. Some regulations require that certain data stay within a region. When using cloud or off-site backups, choose regions deliberately and document where copies live.",
   "Physical access can bypass operating system security, so protect the boot process. A UEFI/BIOS password (an administrator or setup password) stops someone from changing firmware settings, such as disabling Secure Boot or changing the boot order to boot from a USB stick. A power-on password can require a password before the system starts at all, though it is rarely used on servers because it blocks unattended reboots. A bootloader password, such as a GRUB password on Linux, prevents someone from editing boot entries at startup to gain a root shell. Combine these with disabled unused boot devices, full-disk encryption and a locked rack."
  ],
  "terms": [
   [
    "Encryption at rest",
    "Encrypting stored data so it is unreadable without the key if media is stolen or copied."
   ],
   [
    "Encryption in transit",
    "Encrypting data as it travels across networks, for example with TLS or SSH."
   ],
   [
    "Data retention policy",
    "Rules specifying how long data is kept and when it must be destroyed."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country where it is physically stored."
   ]
  ],
  "example": "A backup drive is lost in transit to an off-site vault. Because the backups were encrypted with keys held in the backup system's key store, the company documents the incident but does not need to treat it as a data breach.",
  "tip": "At rest means stored (BitLocker, LUKS, self-encrypting drives); in transit means moving (TLS, SSH, IPsec). A firmware setup password stops boot-order changes; a GRUB password stops boot-entry edits.",
  "check": [
   [
    "What does a BIOS/UEFI administrator password protect against?",
    "Unauthorized changes to firmware settings, such as the boot order or Secure Boot, by someone with physical access."
   ],
   [
    "Why can keeping data too long be a risk?",
    "More data is exposed if there is a breach, and it may violate privacy laws or increase legal discovery costs."
   ]
  ]
 },
 {
  "t": "Physical security: locked racks and cages, mantraps/access vestibules, badge readers, biometrics, cameras, security guards, fire suppression",
  "body": [
   "Anyone who can touch a server can steal a drive, plug in a device or simply turn it off. Physical security protects hardware and data with layers, an approach called defense in depth: the building perimeter, the data center entrance, the room, the cage and finally the rack.",
   "At the rack level, lockable doors on the front and back stop casual access to drives and ports. In shared or colocation facilities, customers rent locked cages or private suites around their racks. Keys should be tracked, or replaced with electronic locks that log each opening. Lock unused ports and consider intrusion alerts on rack doors for sensitive systems.",
   "Entry to the data center is controlled with access control systems. Badge readers (proximity cards or smart cards) grant entry based on the person's authorization and log every use. A mantrap, now often called an access control vestibule, is a small space with two doors where the second door opens only after the first has closed; it stops tailgating (following an authorized person through a door) and piggybacking (being let in by an authorized person), and can hold someone until identity is confirmed. Biometric readers use fingerprints, hand geometry, iris or face recognition; because they verify something you are, they are often combined with a badge (something you have) or PIN (something you know) for multifactor physical access.",
   "Detection and deterrence come next. Cameras (CCTV) record activity, deter wrongdoing and provide evidence; place them at entrances, aisles and loading docks, and retain footage according to policy. Security guards can check identities, escort visitors, respond to alarms and apply judgment that automated systems cannot. Visitor logs, badges that are visibly different for guests, and escort requirements complete the picture. Motion sensors and door alarms alert staff to entry outside normal hours.",
   "Fire is a major physical risk. Detection uses smoke and heat detectors, sometimes very early warning aspirating systems that sample air. Suppression options differ in how they affect equipment. Water sprinklers are effective and cheap but damage electronics; pre-action systems keep pipes dry until a detector triggers, reducing accidental discharge. Clean agent systems, such as certain inert gases or chemical agents, put out fires without leaving residue or harming electronics, and are common in server rooms. Some gas systems reduce oxygen, so staff must evacuate when alarms sound. Keep the correct class of handheld extinguisher, suitable for electrical fires, near exits.",
   "Also think about environmental controls: temperature and humidity monitoring, water leak sensors under raised floors, and emergency power-off switches that are protected from accidental use."
  ],
  "terms": [
   [
    "Access control vestibule (mantrap)",
    "A two-door entry space where only one door can open at a time, preventing tailgating."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secure door without authenticating."
   ],
   [
    "Biometrics",
    "Authentication based on physical characteristics such as fingerprints or iris patterns."
   ],
   [
    "Clean agent suppression",
    "Fire suppression using gases that extinguish fire without water damage or residue on equipment."
   ]
  ],
  "example": "A visitor tries to follow an engineer into the data center. The access control vestibule will not open the inner door while two people stand inside, the camera records the attempt, and the guard escorts the visitor back to reception to sign in.",
  "tip": "Mantraps/vestibules stop tailgating. Pre-action and clean agent systems are preferred where electronics must be protected; standard wet-pipe sprinklers risk water damage.",
  "check": [
   [
    "Which control specifically defeats tailgating?",
    "An access control vestibule (mantrap), because only one door opens at a time."
   ],
   [
    "Why are clean agent systems common in server rooms?",
    "They extinguish fires without water or residue, so equipment is not damaged by the suppression itself."
   ]
  ]
 },
 {
  "t": "Identity and access management: least privilege, role-based access, groups, MFA, SSO, account lockout, password policies, service accounts, auditing",
  "body": [
   "Identity and access management (IAM) decides who can log in to a server and what they can do once there. Most breaches involve misused or stolen credentials, so IAM is one of the most important security controls an administrator manages.",
   "Least privilege means giving each user, service and process only the permissions needed to do its job, and no more. Administrators should use a normal account for email and browsing and a separate privileged account for admin tasks, ideally only elevating when needed. Review permissions regularly, because people change jobs and keep old access, a problem called privilege creep.",
   "Assigning permissions to individuals does not scale. Role-based access control (RBAC) defines roles such as help desk, database administrator or backup operator, grants permissions to those roles, and places people into roles. Groups implement this: you grant a folder permission to a group, then add or remove users from the group. When someone moves departments, you change their group memberships instead of hunting through hundreds of individual permissions.",
   "Authentication proves identity. MFA (multifactor authentication) requires two or more different factor types: something you know (password or PIN), something you have (token, smart card or phone app) and something you are (biometric). Two passwords are not MFA because they are the same factor type. Require MFA for remote access and all administrative accounts. SSO (single sign-on) lets a user authenticate once and access many systems, often using Kerberos inside a domain or federation protocols like SAML and OpenID Connect for web applications. SSO improves usability and centralizes control, but makes that one identity very valuable, so pair it with MFA.",
   "Password policies set rules such as minimum length, complexity, history (preventing reuse) and, in some organizations, expiration; current guidance favors long passphrases and checking against known-breached passwords over frequent forced changes. Account lockout disables an account for a period after a number of failed logons, which slows password-guessing attacks. Set the threshold carefully, because a very low value lets an attacker lock out real users on purpose.",
   "Service accounts are accounts that applications and services use to run, such as a database engine or backup agent. Give each service its own account with minimal rights, deny interactive logon, use long random passwords or managed service accounts that rotate passwords automatically, and document their owners. Never run services as a domain administrator.",
   "Auditing records who did what. Enable logging of logons, failed logons, privilege use and changes to accounts and groups, send logs to a central system, and review them. Audits also include periodic access reviews in which managers confirm that each person still needs their access."
  ],
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum permissions needed to perform a task."
   ],
   [
    "RBAC (role-based access control)",
    "Assigning permissions to roles and placing users in roles rather than granting rights individually."
   ],
   [
    "MFA",
    "Multifactor authentication: requiring two or more different types of authentication factors."
   ],
   [
    "Service account",
    "A non-human account used by an application or service to run and access resources."
   ]
  ],
  "example": "A backup application was installed using a domain admin account. During a review, the administrator creates a dedicated managed service account with only backup operator rights, denies it interactive logon, and changes the backup service to use it.",
  "tip": "MFA must combine different factor types; a password plus a PIN is still single-factor. Grant permissions to groups, not individuals, and give service accounts their own least-privilege identities.",
  "check": [
   [
    "Is a password plus a security question multifactor?",
    "No. Both are something you know, so it is single-factor."
   ],
   [
    "What risk comes from setting the account lockout threshold very low?",
    "Attackers or mistakes can easily lock out legitimate users, causing denial of service."
   ],
   [
    "Why assign permissions to groups rather than users?",
    "It scales, is easier to audit and lets you change access by changing group membership."
   ]
  ]
 },
 {
  "t": "Data security risks: data loss, unencrypted media, insider threats, malware and ransomware; mitigation with DLP, patching and segmentation",
  "body": [
   "To protect server data you first have to recognize how it gets lost, stolen or destroyed. Server+ groups the common risks and asks you to match each with sensible mitigations.",
   "Data loss can be accidental: a failed array with no backup, an administrator deleting the wrong folder, a corrupted database, or a disaster that destroys the building. It can also be leakage, where data ends up somewhere it should not be, such as a spreadsheet of customer records emailed to a personal account. Unencrypted media is a special case: laptops, USB drives, backup tapes and decommissioned disks that leave the building with readable data. A single lost unencrypted backup can expose everything on it.",
   "Insider threats come from people with legitimate access: employees, contractors or partners. Some are malicious, stealing data or sabotaging systems, often around the time they resign or are fired. Others are careless, falling for phishing or misconfiguring a share. Insiders are hard to detect because their access looks normal, so controls focus on least privilege, separation of duties, monitoring for unusual activity, and prompt removal of access when people leave.",
   "Malware is malicious software: viruses, worms, trojans, spyware and rootkits. Ransomware is malware that encrypts files and demands payment for the key; many groups also steal data first and threaten to publish it. Ransomware often enters through phishing, exposed remote desktop services with weak passwords, or unpatched internet-facing systems, then spreads laterally across the network using stolen credentials. Signs include mass file renames with new extensions, ransom notes appearing in folders, spikes in disk activity, and backups being deleted.",
   "Mitigations work in layers. DLP (data loss prevention) tools identify sensitive data, such as card numbers or health records, and block or alert when it is copied to USB drives, uploaded, or emailed outside policy. Encryption at rest protects media that goes missing. Patching closes the vulnerabilities malware uses, so keep the OS, applications and firmware current. Network segmentation divides the network into zones with firewalls or VLANs between them, so that a compromised workstation cannot directly reach database servers and management interfaces; this limits how far ransomware can spread. Endpoint protection or EDR detects malicious behavior, and application allow-listing blocks unknown programs.",
   "Backups are the last line of defense against ransomware and data loss. Keep at least one copy offline or immutable (unchangeable for a set period) so attackers cannot encrypt or delete it, protect backup credentials separately, and regularly test restores. Combine these technical controls with user training and a practiced incident response plan."
  ],
  "terms": [
   [
    "DLP (data loss prevention)",
    "Tools and policies that detect and block sensitive data from leaving authorized locations."
   ],
   [
    "Ransomware",
    "Malware that encrypts data and demands payment, often also stealing data for extortion."
   ],
   [
    "Insider threat",
    "Risk posed by people with legitimate access who misuse it maliciously or carelessly."
   ],
   [
    "Network segmentation",
    "Dividing a network into isolated zones to limit access and the spread of attacks."
   ]
  ],
  "example": "Ransomware encrypts shares on a file server after a user opens a phishing attachment. Because servers sit in a separate segment that blocks workstation access to management ports, the database servers are untouched, and the file server is restored from immutable backups taken the night before.",
  "tip": "Match risk to control: leakage of sensitive data points to DLP, lost media to encryption, known vulnerabilities to patching, lateral spread to segmentation, and ransomware recovery to offline or immutable backups.",
  "check": [
   [
    "Which control would stop an employee copying customer card numbers to a USB drive?",
    "DLP, which detects sensitive data and blocks transfers that violate policy."
   ],
   [
    "How does segmentation reduce ransomware damage?",
    "It restricts which systems a compromised machine can reach, limiting lateral spread."
   ]
  ]
 },
 {
  "t": "Server hardening: disable unused services and ports, remove unneeded software, OS and firmware patching, host firewall, antivirus/EDR, secure admin protocols",
  "body": [
   "Hardening means reducing a server's attack surface, the total set of ways an attacker could interact with it. Every running service, open port, installed package and default account is a possible entry point. A hardened server runs only what its role requires, is kept up to date, and is administered securely.",
   "Start with services and ports. List what is running and listening, using `ss -tulpn` or `systemctl list-units --type=service` on Linux and `Get-Service` or `netstat -ano` on Windows, then disable anything the role does not need, such as print spooling on a database server or a web server installed by default. Closing a port without stopping the service is not enough; stop and disable the service so it does not return after a reboot.",
   "Remove unneeded software. Every extra application, sample file, development tool or management agent adds code that must be patched. Minimal installs such as Server Core or a headless Linux build help from the start. Also remove or disable default and guest accounts, rename or protect built-in administrator accounts, and change every default password, including on BMCs and appliances.",
   "Patching keeps known vulnerabilities closed. Apply operating system updates, application updates and firmware updates for the BIOS/UEFI, BMC, RAID controllers and NICs. Use a patch management process: track vendor releases, test patches on non-production systems, deploy in scheduled windows through change management, verify, and report compliance. Prioritize critical and actively exploited vulnerabilities. Unpatched internet-facing services are one of the most common ways servers are breached.",
   "Turn on the host-based firewall, such as Windows Defender Firewall or `firewalld`, `ufw` or `nftables` on Linux, even if a network firewall exists. Use a default-deny inbound policy, allow only the ports the role needs, and restrict management ports to administrative networks. This limits lateral movement if another machine on the same network is compromised.",
   "Install antivirus or, increasingly, EDR (endpoint detection and response). Traditional antivirus matches files against known signatures; EDR also watches behavior such as unusual process launches, credential dumping or mass file encryption, can isolate a host, and records activity for investigation. Configure exclusions carefully for databases and backup software so scanning does not harm performance, without leaving blind spots.",
   "Finally, administer securely. Use SSH instead of Telnet, HTTPS instead of HTTP for web consoles, SFTP instead of FTP, and RDP with Network Level Authentication over a VPN or gateway rather than exposed to the internet. Prefer key-based SSH logons, disable direct root login, and use jump hosts. Security baselines such as CIS Benchmarks or vendor guides give checklists, and configuration management tools can enforce and audit them."
  ],
  "terms": [
   [
    "Attack surface",
    "All the points where an attacker could interact with or enter a system."
   ],
   [
    "Host-based firewall",
    "A firewall running on the server itself that filters its inbound and outbound traffic."
   ],
   [
    "EDR",
    "Endpoint detection and response: security software that monitors host behavior, detects threats and supports response."
   ],
   [
    "Security baseline",
    "A documented set of hardening settings that systems must meet."
   ]
  ],
  "example": "Hardening a new Linux web server, the administrator removes the installed FTP server and compilers, disables password SSH logins in favor of keys, sets `firewalld` to allow only 443 from anywhere and 22 from the admin subnet, updates BIOS and BMC firmware, and installs the organization's EDR agent.",
  "tip": "Hardening answers usually involve removing or disabling something: unused services, software, accounts and ports. Replace plaintext admin protocols (Telnet, FTP, HTTP) with encrypted ones (SSH, SFTP, HTTPS).",
  "check": [
   [
    "Why stop and disable an unused service rather than only blocking its port?",
    "The service remains a vulnerable, patchable component, and a firewall change could re-expose it; removing it shrinks the attack surface."
   ],
   [
    "What does EDR add beyond signature-based antivirus?",
    "Behavior monitoring, detection of unknown threats, host isolation and forensic recording."
   ]
  ]
 },
 {
  "t": "Decommissioning and media destruction: wiping, degaussing, shredding, crushing, certificates of destruction, asset records",
  "body": [
   "Every server eventually reaches the end of its life. Decommissioning safely means shutting down its services cleanly, making sure no data leaves the building readable, and closing out its records. Old drives sold or recycled without proper sanitization are a well-known source of data breaches.",
   "Decommissioning starts with planning through change management. Confirm the server's services have been migrated or retired, notify stakeholders, remove it from monitoring, backups, DNS, load balancers and the directory, archive any data that retention policies require, and revoke its certificates and service accounts. Only then power it off and remove it from the rack, updating diagrams and cable records.",
   "Media sanitization makes data unrecoverable. The right method depends on the media type and whether you want to reuse it. Simply deleting files or formatting a drive does not remove the data; it only removes pointers, and recovery tools can often restore it.",
   "Wiping (overwriting) writes patterns over every sector of a hard drive so old data cannot be read, and the drive can be reused. Use tools that verify the overwrite. SSDs are different: because of wear leveling and spare blocks, overwriting may miss data, so use the drive's built-in secure erase or sanitize command, or crypto-erase on self-encrypting drives, which destroys the encryption key and leaves the data unreadable. Degaussing exposes magnetic media, such as hard drives and tapes, to a strong magnetic field that scrambles the data; it destroys the drive's factory servo information too, so the drive cannot be reused, and it has no effect on SSDs or optical media.",
   "Physical destruction is the most certain method. Shredding cuts drives into small pieces with an industrial shredder; crushing or drilling deforms platters and circuit boards so they cannot spin or be read. Incineration and pulverizing are also used. Many organizations use a certified third-party destruction service, either on-site (you watch the shredding) or off-site with a documented chain of custody.",
   "Documentation proves you did it right. A certificate of destruction from the vendor lists the serial numbers of destroyed media, the method, date and responsible party. Update the asset records to show each device as disposed, including the method and certificate reference, so audits can trace every drive from purchase to destruction. Also handle licenses (reassign or retire them) and environmentally responsible recycling of the remaining hardware, following local regulations for electronic waste.",
   "Choose the method by data sensitivity and policy: wiping or crypto-erase for reuse within the organization, degaussing or destruction for highly sensitive data or drives leaving your control."
  ],
  "terms": [
   [
    "Wiping",
    "Overwriting all sectors of storage media so previous data cannot be recovered, allowing reuse."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field, rendering hard drives unusable; ineffective on SSDs."
   ],
   [
    "Crypto-erase",
    "Sanitizing a self-encrypting drive by destroying its encryption key."
   ],
   [
    "Certificate of destruction",
    "A document confirming which media were destroyed, how, when and by whom."
   ]
  ],
  "example": "A hospital retires forty servers. The drives are removed and logged by serial number, destroyed by a shredding vendor on-site while staff watch, and the vendor issues a certificate of destruction that is attached to each asset record in the CMDB.",
  "tip": "Degaussing works only on magnetic media, never SSDs. Formatting is not sanitization. For SSDs use secure erase, crypto-erase or physical destruction, and always keep a certificate of destruction.",
  "check": [
   [
    "Why is degaussing useless for an SSD?",
    "SSDs store data in flash memory cells, not magnetic domains, so a magnetic field does not erase them."
   ],
   [
    "What proves to an auditor that drives were destroyed properly?",
    "A certificate of destruction listing serial numbers, method and date, matched to updated asset records."
   ]
  ]
 },
 {
  "t": "Backup types: full, incremental, differential, synthetic full, snapshot; backup media and rotation (grandfather-father-son), 3-2-1 rule",
  "body": [
   "Backups are copies of data that let you recover from deletion, corruption, hardware failure, ransomware and disasters. Server+ tests the backup types, how they affect backup time and restore time, the media used and the rotation schemes that decide how long copies are kept.",
   "A full backup copies all selected data every time. It is the simplest to restore, because you need only one set, but it takes the longest to run and uses the most space. Backup software tracks which files have changed, traditionally with the archive bit on Windows files or with change tracking in the file system or hypervisor.",
   "An incremental backup copies only data changed since the last backup of any kind, full or incremental, and then marks those files as backed up. Incrementals are fast and small. The trade-off is at restore time: you need the last full backup plus every incremental since then, in order. If one incremental in the chain is missing or damaged, later data may be lost.",
   "A differential backup copies everything changed since the last full backup, and does not reset the change markers. Each differential grows larger through the week, but restoring needs only two sets: the last full plus the latest differential. So incrementals are faster to back up and slower to restore; differentials are slower to back up and faster to restore.",
   "A synthetic full backup is built by the backup server from an earlier full backup plus the incrementals since, without reading all the data from the production server again. You get the fast restore of a full backup without the load of taking one. A snapshot captures the state of a volume, VM or storage array at an instant, usually in seconds, using copy-on-write or redirect-on-write techniques. Snapshots are great for quick rollback and as a consistent source for backup jobs, but they usually live on the same storage as the original, so they do not protect against losing that storage.",
   "Backup media include disk (fast, often the first target), tape (inexpensive per terabyte, portable and naturally offline, still used for long-term and off-site copies), and cloud or object storage (off-site by design). Rotation schemes reuse media on a schedule. Grandfather-father-son (GFS) keeps daily backups (sons) for about a week, weekly backups (fathers) for about a month, and monthly backups (grandfathers) for a year or longer, giving many restore points with a limited number of tapes or disks.",
   "The 3-2-1 rule is a widely used guideline: keep at least three copies of your data (production plus two backups), on two different types of media or storage, with one copy off-site. Many organizations extend it with one copy offline or immutable and zero errors after verified test restores, to defend against ransomware."
  ],
  "terms": [
   [
    "Incremental backup",
    "Copies data changed since the last backup of any type; restores need the full plus every incremental since."
   ],
   [
    "Differential backup",
    "Copies data changed since the last full backup; restores need the full plus the latest differential."
   ],
   [
    "Synthetic full",
    "A full backup assembled on the backup server from a prior full and later incrementals."
   ],
   [
    "Grandfather-father-son (GFS)",
    "A rotation scheme keeping daily, weekly and monthly backup sets for different retention periods."
   ]
  ],
  "example": "A server gets a full backup on Sunday and incrementals Monday through Saturday. When it fails on Thursday afternoon, the administrator restores Sunday's full, then Monday's, Tuesday's and Wednesday's incrementals in order. With differentials, only Sunday's full and Wednesday's differential would be needed.",
  "tip": "Incremental: fastest backup, slowest restore (full + all incrementals). Differential: slower backup, faster restore (full + last differential). 3-2-1 means three copies, two media types, one off-site.",
  "check": [
   [
    "Full backup on Sunday, differentials daily; failure on Friday morning. Which sets do you restore?",
    "Sunday's full backup and Thursday's differential."
   ],
   [
    "Why is a storage snapshot not a complete backup?",
    "It usually depends on the same underlying storage, so if that storage fails the snapshot is lost too."
   ],
   [
    "What does the 3-2-1 rule require?",
    "Three copies of data, on two different media types, with one copy stored off-site."
   ]
  ]
 },
 {
  "t": "Backup operations: frequency, retention, on-site vs off-site storage, integrity checks, test restores",
  "body": [
   "Choosing backup types is only the start. Backup operations are the day-to-day decisions and routines that make backups actually usable when needed: how often they run, how long they are kept, where they are stored and how you prove they work.",
   "Backup frequency is driven by how much data the business can afford to lose, called the RPO (recovery point objective). If the RPO for an order database is 15 minutes, a nightly backup is not enough; you need frequent transaction log backups, snapshots or replication. A file share that changes slowly may need only a nightly job. Schedule backups in windows that avoid heavy production load, and watch that jobs finish before the next one starts. Application-aware backups, which use services such as the Windows Volume Shadow Copy Service or database backup APIs, make sure databases are captured in a consistent state.",
   "Retention is how long each backup is kept. It is set by legal and regulatory requirements, business needs and storage cost, and is often tiered: daily backups kept for weeks, monthly for a year, yearly for several years. Retention policies should match the organization's data retention policy, and expired backups should be deleted securely. Too short a retention period can leave you with no clean copy if corruption or ransomware went unnoticed for weeks.",
   "On-site backups, stored in the same building, restore quickly and are convenient for everyday mistakes like a deleted file. Off-site backups protect against site-wide disasters such as fire, flood or theft. Off-site can mean tapes carried to a secure vault, replication to another data center, or copies in cloud storage. Off-site copies take longer to retrieve, so most organizations keep both. Protect off-site media with encryption and track it with a chain of custody.",
   "A backup that has not been verified is a hope, not a plan. Integrity checks confirm the backup was written correctly: job logs and alerts reporting success or failure, checksums or hashes comparing stored data with the source, and verification passes that read the backup back after writing. Review failed and partially successful jobs every day.",
   "Test restores are the only real proof. Regularly restore individual files, whole servers and application data, ideally into an isolated test environment, and confirm the application actually works and data is complete. Time the restore to see whether it meets the RTO (recovery time objective). Document the procedure so anyone on the team can follow it during a crisis, and include restores in disaster recovery exercises. Many organizations only discover missing databases, expired encryption keys or broken tapes during a real emergency because they never tested."
  ],
  "terms": [
   [
    "Retention period",
    "How long a backup copy is kept before it is expired and deleted."
   ],
   [
    "Off-site backup",
    "A backup copy stored at a different location to survive site-wide disasters."
   ],
   [
    "Test restore",
    "Restoring data from backup to verify the backup is complete and usable."
   ],
   [
    "Application-aware backup",
    "A backup that coordinates with an application so its data is captured in a consistent state."
   ]
  ],
  "example": "During a quarterly test restore, an administrator discovers the backup job had been skipping a new database for two months because it was added to a different volume. The team fixes the job selection and adds an alert for unprotected volumes, well before a real failure exposed the gap.",
  "tip": "The only way to know backups work is a test restore. Off-site protects against site disasters; on-site speeds everyday recovery. Frequency follows the RPO, restore speed must meet the RTO.",
  "check": [
   [
    "What determines how often backups must run?",
    "The recovery point objective: how much data loss, measured in time, the business can tolerate."
   ],
   [
    "Why are successful backup job logs not enough?",
    "A job can report success while missing data or producing unreadable media; only test restores prove recoverability."
   ]
  ]
 },
 {
  "t": "Disaster recovery: hot, warm and cold sites, cloud DR, replication (synchronous vs asynchronous), RPO and RTO, DR plan testing (tabletop, live failover)",
  "body": [
   "Disaster recovery (DR) is the set of plans and technology used to restore IT services after a major event such as a fire, flood, extended power loss, cyberattack or regional outage. Where backups restore data, DR restores whole services, often in a different location.",
   "Two measurements drive every DR decision. The RPO (recovery point objective) is the maximum acceptable data loss, measured backward in time from the disaster: an RPO of one hour means you must be able to recover data as it was no more than an hour before. The RTO (recovery time objective) is the maximum acceptable time to restore the service after the disaster. Lower RPO and RTO values cost more, so they are set per service based on business impact.",
   "Recovery sites differ in readiness and cost. A hot site is a fully equipped facility with hardware, network connections and current data, often continuously replicated, ready to take over in minutes to hours. It is the most expensive. A warm site has power, network and some or all hardware, but data and systems must be restored or brought up to date before use, so recovery takes hours to days. A cold site is space with power and cooling but little or no equipment; you must ship in hardware, install and restore, which takes days to weeks. It is the cheapest.",
   "Cloud DR uses a cloud provider as the recovery site. Data and VM images are replicated to the cloud, and servers are started there only when needed, so you pay mainly for storage until a disaster. This can give hot-site-like recovery at lower cost, but you must plan networking, DNS changes, licensing and the bandwidth to return (fail back) afterward.",
   "Replication keeps a copy of data at another site. Synchronous replication writes data to both sites before confirming the write to the application, so the copy is always current and RPO is effectively zero. The cost is latency: every write waits for the remote site, so it is only practical over short distances with fast links. Asynchronous replication confirms writes locally and sends them to the remote site shortly afterward. It works over long distances and slower links, but recent writes may be lost in a disaster, so RPO is small but not zero.",
   "A DR plan documents who declares a disaster, contact lists, priorities, step-by-step recovery procedures and how to return to normal. Plans must be tested. A tabletop exercise is a discussion-based walk-through where the team talks through a scenario to find gaps without touching systems. A walkthrough or simulation goes further, and a parallel test brings up systems at the DR site without stopping production. A live (full) failover actually moves production to the DR site; it is the most realistic and the most disruptive. Update the plan after every test and every significant change."
  ],
  "terms": [
   [
    "RPO",
    "Recovery point objective: the maximum acceptable amount of data loss, measured in time."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum acceptable time to restore a service."
   ],
   [
    "Hot site",
    "A fully equipped recovery site with current data, ready to take over quickly."
   ],
   [
    "Synchronous replication",
    "Replication that confirms a write only after both sites have it, giving near-zero data loss at the cost of latency."
   ]
  ],
  "example": "A bank replicates its core database synchronously to a second data center across town (RPO near zero) and asynchronously to a cloud region hundreds of miles away. A yearly live failover to the nearby site confirms it can resume transactions within its 30-minute RTO.",
  "tip": "RPO is about data loss (how far back), RTO is about downtime (how long). Hot is fastest and costliest, cold is slowest and cheapest. Synchronous means zero data loss but short distances; asynchronous allows distance with some loss.",
  "check": [
   [
    "A company can lose at most 4 hours of data and must be running within 8 hours. Which is the RPO?",
    "4 hours; the RPO measures acceptable data loss, while 8 hours is the RTO."
   ],
   [
    "Which DR test involves no system changes at all?",
    "A tabletop exercise, where the team discusses the scenario and procedures."
   ],
   [
    "Why is synchronous replication limited by distance?",
    "Each write waits for acknowledgment from the remote site, so long distances add latency to every transaction."
   ]
  ]
 },
 {
  "t": "Business continuity: BIA, MTBF and MTTR, prioritizing critical services, communication plans",
  "body": [
   "Business continuity planning (BCP) is broader than disaster recovery. DR focuses on restoring IT systems; business continuity asks how the whole organization keeps delivering its essential functions during and after a disruption, including people, facilities, suppliers and manual workarounds. IT is a major part of that plan, and server administrators contribute the technical pieces.",
   "The foundation is the BIA (business impact analysis). A BIA identifies the organization's business processes, the systems and people each depends on, and the impact over time if each process stops: lost revenue, legal or regulatory penalties, safety risks and reputational damage. From that analysis come the recovery objectives for each process, such as the RTO and RPO, and the maximum tolerable downtime, the point beyond which the organization suffers unacceptable harm. The BIA also reveals dependencies, for example that the ordering system is useless without DNS, the directory service and the payment gateway.",
   "Reliability metrics help predict and plan for failures. MTBF (mean time between failures) is the average operating time between failures of a repairable component or system; a higher MTBF means more reliable equipment. Vendors publish MTBF figures for drives and power supplies, and you can calculate it from your own records. MTTR (mean time to repair or recover) is the average time it takes to restore a failed component or service to operation, including diagnosis, parts delivery and repair. A lower MTTR is better. You can improve MTTR with spare parts on site, good documentation, monitoring that alerts quickly and faster support contracts. Some frameworks also use MTTF (mean time to failure) for items that are replaced rather than repaired.",
   "Not everything can be restored at once, so prioritize critical services. Using the BIA, rank services into tiers: tier one restored first (for example, authentication, core networking and the revenue-generating application), then supporting services, then everything else. Recovery order must respect dependencies: there is no point starting the application servers before directory services, DNS and databases are running. Document this order in the plan.",
   "A communication plan decides who is told what, when and how during an incident. It includes an up-to-date call tree or contact list for staff, management, vendors and service providers; designated spokespeople for customers, media and regulators; message templates; and alternative channels in case email and phones are down. Clear communication prevents duplicated work, conflicting messages and panic, and some regulations require notification within set time frames.",
   "Business continuity plans also cover succession (who can make decisions if leaders are unavailable), alternate work locations and remote access, and regular review and testing so the plan stays current as systems change."
  ],
  "terms": [
   [
    "BIA (business impact analysis)",
    "An analysis of business processes, their dependencies and the impact of their disruption over time."
   ],
   [
    "MTBF",
    "Mean time between failures: the average operating time between failures of a repairable item."
   ],
   [
    "MTTR",
    "Mean time to repair: the average time needed to restore a failed item or service."
   ],
   [
    "Communication plan",
    "The documented process and contacts for sharing information during an incident."
   ]
  ],
  "example": "A BIA shows that the online store loses significant revenue each hour it is down, while the internal wiki can wait two days. The IT team places the store, its database and its dependencies (DNS, directory and payment gateway links) in recovery tier one and keeps spare drives and power supplies on site to lower its MTTR.",
  "tip": "Higher MTBF is good (fails less often); lower MTTR is good (fixed faster). The BIA comes first and produces the priorities and objectives that DR plans implement.",
  "check": [
   [
    "What does a BIA produce that DR planning uses?",
    "The criticality of each process, its dependencies and recovery objectives such as RTO, RPO and maximum tolerable downtime."
   ],
   [
    "How can keeping spare parts on site improve availability?",
    "It lowers MTTR by removing the wait for parts delivery."
   ]
  ]
 },
 {
  "t": "The CompTIA troubleshooting methodology: identify, theory, test, plan, implement, verify, document",
  "body": [
   "Troubleshooting is a skill you can make systematic. CompTIA uses a standard methodology across its certifications, and Server+ questions often ask which step comes next or which step was skipped. Following the steps in order stops you from guessing, making changes that hide the real cause, or fixing one problem while creating another.",
   "Step 1 is to identify the problem. Gather information from logs, error messages and monitoring; question users about what they see and when it started; identify symptoms; determine whether anything changed recently (updates, new hardware, configuration changes); try to reproduce the problem; and approach multiple problems individually. Before making changes, back up data and configurations where appropriate, because some fixes are destructive. Clarify the scope: one user, one server, or the whole site.",
   "Step 2 is to establish a theory of probable cause. Question the obvious first, such as a loose cable, a full disk or an expired password, before assuming something exotic. Consider multiple approaches, for example working through the OSI model layer by layer, or dividing the problem to isolate which component is at fault. Research using vendor documentation and knowledge bases.",
   "Step 3 is to test the theory to determine the cause. If testing confirms it, move on to plan the fix. If not, establish a new theory or escalate to a more experienced colleague or the vendor. Testing should not itself make permanent changes where possible, for example checking a counter or swapping in a known-good cable.",
   "Step 4 is to establish a plan of action to resolve the problem and notify impacted users. In a server environment this usually means following change management: scheduling a window, documenting the steps and preparing a rollback plan, because restarting a production server affects many people.",
   "Step 5 is to implement the solution or escalate as necessary. Make one change at a time where you can, so you know which change fixed it. Step 6 is to verify full system functionality and, if applicable, implement preventive measures. Confirm with users that the service works end to end, not just that a service started, and consider what would stop the problem recurring: monitoring, a patch, a capacity increase.",
   "Step 7 is to document findings, actions and outcomes throughout the process, not only at the end. Record the symptoms, cause, fix and time taken in the ticketing system or knowledge base. Documentation helps the next person who sees the same problem and supports root cause analysis and trend reporting.",
   "A useful memory aid is the first letter of each step's key word: identify, theory, test, plan, implement, verify, document."
  ],
  "terms": [
   [
    "Theory of probable cause",
    "The best current explanation for a problem, formed after gathering information and tested before acting."
   ],
   [
    "Escalation",
    "Passing a problem to someone with more expertise or authority when you cannot resolve it."
   ],
   [
    "Preventive measures",
    "Actions taken after a fix to stop the same problem from happening again."
   ],
   [
    "Scope",
    "How widespread a problem is, such as one user, one server or an entire site."
   ]
  ],
  "example": "Users report a slow file server. The technician checks monitoring and learns a backup job was moved to business hours yesterday (identify), theorizes backup I/O is saturating the disks (theory), confirms disk queue length spikes when the job runs (test), gets approval to move it back (plan), reschedules it (implement), confirms performance with users (verify) and records the fix (document).",
  "tip": "Know the order and look for the step that was skipped. Question the obvious and ask what changed during step 1; back up before making changes; verify full functionality before documenting.",
  "check": [
   [
    "What should you do if testing disproves your theory?",
    "Establish a new theory, or escalate if you cannot."
   ],
   [
    "Which step includes implementing preventive measures?",
    "Verify full system functionality and, if applicable, implement preventive measures."
   ],
   [
    "Why make one change at a time?",
    "So you know which change fixed the problem and can roll back cleanly if a change makes things worse."
   ]
  ]
 },
 {
  "t": "Hardware problems: POST errors and beep codes, overheating, failed fans and power supplies, memory errors, predictive failure alerts, LED indicators",
  "body": [
   "Server hardware usually warns you before, or while, it fails. Recognizing those warnings, from startup messages to blinking lights, lets you find the failed part quickly and often replace it before users notice.",
   "When a server starts, the firmware runs POST (power-on self-test), checking the processor, memory, storage controllers and other components. If POST finds a problem it reports it with an on-screen message, an error code on a diagnostic display, an entry in the BMC's system event log, or beep codes if video is not yet working. Beep patterns vary by manufacturer and firmware, so look the pattern up in the vendor's documentation rather than guessing. A server that powers on but shows nothing and beeps repeatedly often has a memory or seating problem; one that shows no signs of life at all points to power.",
   "Overheating causes throttled performance, unexpected shutdowns and shortened component life. Common causes include blocked or dirty air filters, failed fans, missing blanking panels, a chassis cover left off, cables blocking airflow, or a failed data center cooling unit. Check temperature sensors in the BMC, compare inlet temperature against the vendor's range, and verify hot and cold aisle orientation. Servers protect themselves by raising fan speed and, at critical temperatures, shutting down.",
   "Failed fans and power supplies are usually reported by the BMC and shown by amber LEDs on the part. Because both are typically redundant and hot-swappable, the server keeps running, but it has lost its protection. Replace the part promptly. For a failed PSU, first check the simple causes: the power cord, the PDU outlet, and whether the circuit feeding that PDU has tripped. If both PSUs report input power faults at the same time, suspect the shared power source rather than two failed units.",
   "Memory errors range from correctable to fatal. ECC memory corrects single-bit errors and logs them; a growing count of correctable errors on one module is an early warning that it is failing. Uncorrectable errors cause crashes or blue screens, purple screens on some hypervisors, or kernel panics. Check the BMC event log for the slot identifier, reseat or replace the module, and follow the vendor's population rules. Mismatched or unsupported modules can also prevent POST.",
   "Many components report predictive failure alerts before they fail. Drives use SMART (Self-Monitoring, Analysis and Reporting Technology) to track reallocated sectors and other indicators, and RAID controllers flag a drive as predictive failure. Memory and power supplies may also raise predictive alerts. Treat these as scheduled replacements, not emergencies, but do not ignore them.",
   "LED indicators give quick, local diagnosis: green usually means normal, amber or blinking amber means a fault or warning, and many servers have a blue unit identification (UID) LED you can turn on remotely so the technician pulls the right server. Drive bay LEDs show activity, faults and locate status. Always confirm the exact meaning in the vendor's guide."
  ],
  "terms": [
   [
    "POST",
    "Power-on self-test: firmware checks run at startup that report hardware faults."
   ],
   [
    "Beep code",
    "A pattern of beeps at startup indicating a hardware error; meanings vary by vendor."
   ],
   [
    "Predictive failure",
    "An alert that a component, such as a drive, shows signs it is likely to fail soon."
   ],
   [
    "UID LED",
    "A unit identification light used to locate a specific server or component in a rack."
   ]
  ],
  "example": "The BMC reports rising inlet temperatures on every server in one rack. Rather than replacing fans, the technician inspects the rack and finds a new switch installed backwards, blowing hot exhaust into the cold aisle, plus two missing blanking panels. Fixing airflow brings temperatures back to normal.",
  "tip": "Redundant parts failing do not stop the server, so the exam often asks for the next step: check the simple causes (cord, PDU, circuit), then hot-swap the part. Many servers overheating together suggests an environmental cause, not a single fan.",
  "check": [
   [
    "A drive reports a SMART predictive failure but is still working. What should you do?",
    "Schedule a replacement promptly, since the drive is likely to fail and the array would lose redundancy."
   ],
   [
    "Both power supplies in a server report input power faults at once. What is the likely cause?",
    "A problem with the shared power source, such as a PDU or circuit, rather than two simultaneous PSU failures."
   ]
  ]
 },
 {
  "t": "Storage problems: degraded or failed RAID arrays, controller battery/cache issues, disk full, slow I/O, mount failures, boot device not found, corrupted file systems",
  "body": [
   "Storage problems are among the most serious a server administrator faces because they can mean lost data, not just downtime. Server+ expects you to recognize the symptoms of each common storage problem and choose a safe next step, which very often means protecting data before trying a fix.",
   "A degraded RAID array has lost a member drive but is still serving data using mirroring or parity. It is running without protection, and performance usually drops because the controller reconstructs missing data on the fly. Identify the failed drive using the controller utility and bay LEDs, verify you have a current backup, and replace the drive so it rebuilds; if a hot spare exists, the rebuild may already have started. Do not pull the wrong drive, because removing a healthy member from a degraded RAID 5 array fails it completely. A failed array has lost more drives than its RAID level tolerates, such as two drives in RAID 5. At that point, data usually has to come from backups. Avoid initializing or recreating the array, which destroys any chance of recovery, and consult the vendor.",
   "Hardware RAID controllers use a write cache to speed up writes, protected by a battery or a flash module with a capacitor so cached data survives a power loss. If the battery fails or is charging, the controller typically switches from write-back to write-through mode for safety, and write performance drops sharply. Controller logs and the management utility show cache and battery status. The fix is to replace the battery or cache module; forcing write-back without protection risks data loss.",
   "A full disk causes applications to fail, databases to stop, logs to stop recording and sometimes the OS to become unstable. Common culprits are growing log files, temporary files, forgotten backups or dumps, and thin-provisioned volumes filling up. Find what is using space with `du` and `df -h` on Linux or storage tools on Windows, clear or archive safely, then fix the cause with log rotation, quotas, monitoring alerts or more capacity. On Linux, also check inode exhaustion with `df -i`, where a disk has space but no free file entries.",
   "Slow I/O shows up as high disk latency and long queue lengths. Causes include a degraded or rebuilding array, a failed cache battery, a disk nearing failure, misaligned partitions, too many VMs on one datastore, a storage path problem, or simply a workload that has outgrown its disks. Compare with baselines to see what changed.",
   "Mount failures occur when a file system cannot be attached: a wrong entry in `/etc/fstab` (for example a device name that changed, which is why UUIDs are preferred), a missing iSCSI or SAN connection, a missing driver or a corrupted file system. A bad fstab entry can even stop a Linux server from booting normally. \"Boot device not found\" or \"no bootable device\" means the firmware cannot find a bootable disk: check the boot order, whether the boot drive or array is present and healthy, UEFI versus legacy mode, and whether the bootloader is damaged.",
   "Corrupted file systems follow power loss, hardware faults or failing disks. Symptoms include unreadable files, errors in logs and volumes mounting read-only. Back up what you can, then run the appropriate repair tool with the volume unmounted, and investigate the underlying hardware cause."
  ],
  "terms": [
   [
    "Degraded array",
    "A RAID array that has lost a member but still serves data without redundancy."
   ],
   [
    "Write-back cache",
    "Controller caching that confirms writes before they reach disk; requires battery or flash protection."
   ],
   [
    "Write-through",
    "Caching mode that confirms writes only after they reach disk, safer but slower."
   ],
   [
    "fstab",
    "The Linux file that lists which file systems to mount at boot and where."
   ]
  ],
  "example": "Write performance on a database server suddenly halves. The RAID controller log shows the cache battery failed its learn cycle, so the controller switched to write-through. The administrator orders a replacement battery module, schedules the swap, and write-back caching resumes afterward.",
  "tip": "With a degraded array, back up first and replace the correct drive. A sudden write slowdown on hardware RAID often means the cache battery failed and the controller dropped to write-through.",
  "check": [
   [
    "What is the danger of pulling the wrong drive from a degraded RAID 5 array?",
    "Removing a second drive exceeds RAID 5's single-drive tolerance, failing the array and losing data."
   ],
   [
    "A Linux server shows free space but cannot create files. What should you check?",
    "Inode usage with df -i; the file system may have run out of inodes."
   ]
  ]
 },
 {
  "t": "Storage tools: disk management, fsck/chkdsk, RAID controller utilities, SMART data, partitioning tools",
  "body": [
   "Knowing which tool to reach for is half of solving a storage problem. Server+ expects you to match common tools to their jobs on both Windows and Linux, and to know the precautions that keep them from making things worse.",
   "Disk Management is the Windows graphical console (`diskmgmt.msc`) for viewing disks and volumes. You use it to bring new disks online, initialize them as GPT or MBR, create, extend, shrink and format volumes, assign drive letters and see whether a disk is offline or has errors. PowerShell provides the same functions with cmdlets such as `Get-Disk`, `Get-Volume`, `Initialize-Disk` and `New-Partition`, and `diskpart` is the older command-line tool. A disk that shows as offline after being added from a SAN is common; bring it online deliberately, making sure it is not already in use by another server.",
   "File system checkers repair logical damage. On Windows, `chkdsk` scans a volume for file system errors; `chkdsk /f` fixes errors and `chkdsk /r` also locates bad sectors and recovers readable data, which takes much longer. If the volume is in use, such as the system drive, the check is scheduled for the next restart. On Linux, `fsck` (with file system specific versions like `e2fsck` for ext4) checks and repairs file systems, while XFS uses `xfs_repair`. Always run these on an unmounted file system, or at least one mounted read-only, because repairing a mounted, active file system can corrupt it. Back up first when you can, since repairs may remove damaged files.",
   "RAID controller utilities manage hardware arrays. They come as a firmware configuration utility entered during POST, a command-line tool from the vendor, a web interface, or integration with the BMC. Use them to view array and drive status, identify failed or predictive-failure drives, blink bay LEDs to locate drives, assign hot spares, start rebuilds, check cache and battery status, and review the controller event log. On Linux software RAID, `mdadm` and `cat /proc/mdstat` fill this role; on Windows, Storage Spaces is managed in Server Manager or PowerShell.",
   "SMART data comes from the drive itself. Tools such as `smartctl` from the smartmontools package on Linux, vendor utilities, or the RAID controller's pass-through view show attributes like reallocated sector count, pending sectors, power-on hours, temperature and, for SSDs, wear or percentage used. Rising reallocated or pending sector counts are warning signs to replace a drive. Behind hardware RAID, you may need controller-specific options to read SMART from individual drives.",
   "Partitioning tools create and change partitions: `fdisk` (MBR and GPT in modern versions), `gdisk` and `parted` on Linux, `lsblk` and `blkid` to view block devices and UUIDs, and LVM commands such as `pvcreate`, `vgextend` and `lvextend` to manage logical volumes. After extending a partition or logical volume, you must also grow the file system, for example with `resize2fs` for ext4 or `xfs_growfs` for XFS. Double-check the target device before writing, since partitioning the wrong disk destroys data."
  ],
  "terms": [
   [
    "chkdsk",
    "Windows tool that checks and repairs file system errors; /f fixes errors and /r also scans for bad sectors."
   ],
   [
    "fsck",
    "Linux file system consistency checker, run on unmounted file systems."
   ],
   [
    "smartctl",
    "A command-line tool that reads SMART health data from drives."
   ],
   [
    "parted",
    "A Linux partitioning tool that supports GPT disks and resizing."
   ]
  ],
  "example": "An ext4 data volume on Linux is extended on the SAN. The administrator runs `lsblk` to confirm the new size, uses `parted` to grow the partition, runs `resize2fs` to grow the file system online, and checks with `df -h` that users see the extra space.",
  "tip": "Run fsck or chkdsk only on unmounted (or read-only) volumes and back up first. Extending a partition is not enough; the file system must be grown too.",
  "check": [
   [
    "Which chkdsk switch also scans for bad sectors?",
    "/r, which locates bad sectors and recovers readable information (it includes /f)."
   ],
   [
    "Which tool would you use to read a drive's reallocated sector count on Linux?",
    "smartctl from the smartmontools package."
   ]
  ]
 },
 {
  "t": "OS and software problems: failed updates, services not starting, memory leaks, runaway processes, driver issues, boot loops, misconfigured applications",
  "body": [
   "Many server outages are caused not by hardware but by software: an update that did not apply cleanly, a service that will not start, a program slowly eating memory. Server+ tests how to recognize these problems and choose the right first step.",
   "Failed updates show up as error codes in the update history, repeated attempts to install the same patch, or a server that reboots and rolls back changes. Causes include insufficient disk space, interrupted downloads, corrupted update caches, incompatible drivers or software, and pending reboots from earlier updates. Check logs for the error, free disk space, retry, and if an update breaks functionality, roll it back and report it. Testing updates on non-production systems first and deploying in waves reduces the damage.",
   "A service that fails to start usually leaves a clue in the logs. Common causes are a dependency that is not running (for example, a web application that needs its database service), a service account whose password changed or expired, missing permissions on a folder, a port already in use by another program, a missing file, or a bad configuration file. On Windows check the Services console and the System event log; on Linux use `systemctl status servicename` and `journalctl -u servicename`.",
   "A memory leak happens when a program allocates memory and never releases it, so its usage grows steadily until the server runs out and starts paging heavily or killing processes. Symptoms are gradual slowdowns over days that go away after a reboot. Confirm by watching a process's memory over time in Task Manager, Performance Monitor or `top`. Restarting the service is a short-term workaround; the fix is a patch from the vendor or developer. A runaway process is one stuck consuming very high CPU, often in a loop. Identify it with Task Manager or `top`, determine whether it is legitimate, and end it if necessary; then investigate why, including the possibility of malware such as a cryptominer.",
   "Driver issues follow new hardware, driver updates or OS upgrades: devices missing in Device Manager, network or storage adapters failing, blue screens or kernel panics naming a driver. Use vendor-supplied, HCL-listed drivers that match the firmware version, and roll back a driver if a new one causes problems.",
   "A boot loop is when a server repeatedly restarts before finishing startup. Causes include a bad update or driver, corrupted system files, a failing boot disk, or automatic restart on system failure hiding a crash message. Boot into safe mode or recovery mode, or on Linux choose an older kernel from the boot menu, then roll back the recent change. Disabling automatic restart on system failure lets you read the stop error.",
   "Misconfigured applications behave unexpectedly: wrong connection strings, wrong ports, incorrect permissions, typos in configuration files. Compare the configuration with a known-good baseline or backup, check what changed recently through change records, and validate configuration files with the application's test options, such as a syntax check, before restarting."
  ],
  "terms": [
   [
    "Memory leak",
    "A defect where a program keeps allocating memory without releasing it, gradually exhausting RAM."
   ],
   [
    "Runaway process",
    "A process consuming excessive CPU or resources, often stuck in a loop."
   ],
   [
    "Boot loop",
    "A condition where a system restarts repeatedly without completing startup."
   ],
   [
    "Service dependency",
    "Another service that must be running before a given service can start."
   ]
  ],
  "example": "An application server needs a reboot every week because it slows to a crawl. Performance Monitor shows one service's private memory growing steadily from the moment it starts. The administrator schedules a nightly service restart as a workaround and opens a ticket with the vendor, who later ships a patch fixing the leak.",
  "tip": "Gradual slowdown fixed by a reboot suggests a memory leak. A service that fails right after a password change points to its service account credentials. A crash after a new driver means roll back the driver.",
  "check": [
   [
    "A service will not start after the domain password policy forced a change. What is a likely cause?",
    "The service runs under an account whose stored password no longer matches, so it cannot log on."
   ],
   [
    "What should you do first when a server enters a boot loop after an update?",
    "Boot into safe or recovery mode (or an older kernel) and roll back the recent update or driver."
   ]
  ]
 },
 {
  "t": "OS tools: Event Viewer, system logs and journalctl, Task Manager/top, Performance Monitor, rollback of updates, safe mode",
  "body": [
   "Operating systems include the tools you need to find and fix most software problems. Server+ expects you to know which tool shows what on Windows and Linux, and when to use recovery options like update rollback and safe mode.",
   "Event Viewer (`eventvwr.msc`) is the Windows log viewer. The main Windows Logs are Application (events from programs), System (drivers, services and OS components) and Security (logons, privilege use and audit events, if auditing is enabled), plus Setup and many detailed Applications and Services logs. Each event has a level (Critical, Error, Warning, Information), a source and an event ID you can search in vendor documentation. Use filters and custom views to narrow down by time, level or source, and forward events to a central collector for many servers.",
   "Linux logs traditionally live in `/var/log`: files such as `syslog` or `messages` for general system messages, `auth.log` or `secure` for authentication, and application-specific logs. Systemd-based distributions also keep a binary journal read with `journalctl`. Useful options include `journalctl -u nginx` for one service, `-b` for the current boot (and `-b -1` for the previous boot, handy after a crash), `-p err` for errors and worse, `--since` for a time range and `-f` to follow new entries live. `dmesg` shows kernel messages, including hardware and driver errors.",
   "Task Manager on Windows shows running processes and their CPU, memory, disk and network use, lets you end processes, and includes Services and Performance tabs; Resource Monitor goes deeper into which processes use which files and ports. On Linux, `top` and the friendlier `htop` show live processes sorted by CPU or memory, load averages and memory use; `ps aux` lists processes, and `kill` sends signals to stop them. Use `free -h` for memory and `iostat` or `vmstat` for I/O and system activity where installed.",
   "Performance Monitor (`perfmon`) on Windows records performance counters over time, such as processor time, available memory, pages per second, disk queue length and network bytes. You can build data collector sets that log counters for days, which is how you create performance baselines and catch intermittent problems. Linux equivalents include `sar` from the sysstat package and monitoring agents.",
   "When an update causes trouble, roll it back. On Windows, uninstall the update from installed updates or with the command line, and consider pausing updates until a fix is released. On Linux, package managers can downgrade or undo transactions, for example `dnf history undo`, and you can boot a previous kernel from the GRUB menu. VM snapshots taken before patching provide another quick rollback path.",
   "Safe mode starts Windows with a minimal set of drivers and services, so you can remove a bad driver, application or update that prevents normal startup; Safe Mode with Networking adds network support. The Windows Recovery Environment offers startup repair, system restore and a command prompt. Linux offers rescue or emergency targets and single-user mode, reached from the boot menu, for similar repairs. Use these when the system cannot boot or stay up long enough to fix normally."
  ],
  "terms": [
   [
    "Event Viewer",
    "The Windows tool for reading Application, System, Security and other event logs."
   ],
   [
    "journalctl",
    "The command for querying the systemd journal on Linux, filterable by unit, boot, priority and time."
   ],
   [
    "Performance Monitor",
    "The Windows tool that displays and logs performance counters over time."
   ],
   [
    "Safe mode",
    "A Windows startup mode that loads only essential drivers and services for troubleshooting."
   ]
  ],
  "example": "A Linux server rebooted unexpectedly overnight. The administrator runs `journalctl -b -1 -p err` to see errors from the previous boot and finds repeated memory error messages from the kernel just before the reboot, which leads her to the BMC event log and a failing DIMM.",
  "tip": "Application vs System vs Security logs is a common exam distinction: service and driver failures go to System, program errors to Application, logon events to Security. journalctl -u filters by service, -b by boot.",
  "check": [
   [
    "Which Windows log records a service that failed to start?",
    "The System log, where the Service Control Manager records service start failures."
   ],
   [
    "What tool would you use to record disk queue length over several days on Windows?",
    "Performance Monitor with a data collector set."
   ]
  ]
 },
 {
  "t": "Network problems: no connectivity, wrong IP/mask/gateway, DNS resolution failures, duplex mismatch, firewall rules, NIC teaming misconfiguration",
  "body": [
   "When users say the server is down, the server is often running fine and the problem is on the network path to it. Server+ expects you to recognize common network faults from their symptoms and work through them in a logical order, usually from the physical layer upward.",
   "No connectivity at all starts with the physical layer. Check link lights on the NIC and switch port, the cable and transceiver, whether the adapter is enabled in the OS, and whether the switch port is shut down or in the wrong VLAN. A virtual machine may have its virtual NIC disconnected or attached to the wrong virtual switch or port group. If the link is up, check that the interface actually has an IP address. On Windows, an address starting with 169.254 is an APIPA (Automatic Private IP Addressing) address, meaning the machine expected DHCP and got no answer.",
   "Wrong IP settings cause confusing partial failures. A wrong IP address may conflict with another device (duplicate address warnings) or place the server in the wrong subnet. A wrong subnet mask makes the server think local hosts are remote or remote hosts are local, so some destinations work and others do not. A wrong or missing default gateway lets the server talk to its own subnet but nothing beyond it: it can reach neighbors but not other networks or the internet. Compare the settings with documentation.",
   "DNS resolution failures look like the network is down, but only by name. If `ping 10.0.0.25` works and `ping app01` fails, the network is fine and name resolution is the problem. Causes include wrong DNS server addresses, a missing or incorrect DNS record, stale cached entries, an incorrect DNS suffix, or an entry in the local hosts file overriding DNS. Clear caches, query the DNS server directly and check the record.",
   "A duplex mismatch happens when one side of a link runs full duplex and the other half duplex, usually because one end was hard-coded and the other left on auto-negotiation. The link works but performance is poor, and interface counters show errors such as late collisions, CRC errors or runts. The fix is to set both sides the same way, normally both to auto-negotiate. Speed mismatches usually prevent the link from coming up at all.",
   "Firewall rules produce a distinctive pattern: the server responds to ping and other services work, but one application port is unreachable. The block may be in the host firewall, a network firewall, a cloud security group or a load balancer. Check that the service is listening locally first, then test the port from the client side and review rule logs. Remember that some networks block ICMP, so a failed ping does not always mean the host is down.",
   "NIC teaming misconfiguration causes intermittent loss, flapping links, duplicate packets or only half the expected bandwidth. The most common cause is a mismatch between the server's team mode and the switch: for example, an LACP team on the server connected to switch ports that are not configured as a port channel, or a static team connected to different switches that do not support it. Also check that all members are in the same VLAN with the same speed and settings."
  ],
  "terms": [
   [
    "APIPA",
    "Automatic Private IP Addressing: a 169.254.x.x address a Windows host assigns itself when DHCP fails."
   ],
   [
    "Default gateway",
    "The router address a host uses to reach networks outside its own subnet."
   ],
   [
    "Duplex mismatch",
    "A link where one side runs full duplex and the other half duplex, causing errors and poor performance."
   ],
   [
    "Hosts file",
    "A local file that maps names to IP addresses and is checked before DNS on most systems."
   ]
  ],
  "example": "After a server is moved to a new rack, it can reach other servers in its subnet but not the database in another building. The administrator finds the default gateway still points to the old subnet's router. Correcting the gateway restores access immediately.",
  "tip": "Reach local hosts but nothing remote: check the gateway. Works by IP but not by name: check DNS. Slow with interface errors: suspect duplex mismatch. Ping works but one port fails: suspect a firewall rule.",
  "check": [
   [
    "A Windows server has the address 169.254.12.7. What does this indicate?",
    "It is an APIPA address, meaning the server tried to use DHCP and no DHCP server responded."
   ],
   [
    "What symptoms suggest a duplex mismatch?",
    "The link is up but slow, with late collisions and CRC errors on the interface counters."
   ]
  ]
 },
 {
  "t": "Network tools: ping, tracert/traceroute, nslookup/dig, ipconfig/ip, netstat/ss, arp, telnet or Test-NetConnection for port tests",
  "body": [
   "Each network tool answers a specific question. Using the right one, in the right order, lets you narrow a network problem down quickly. Server+ often gives you command output and asks what it shows, so learn what each tool does and what its output means.",
   "Start with the local configuration. `ipconfig` on Windows shows IP address, mask, gateway and, with `ipconfig /all`, DNS servers, MAC address and DHCP details. `ipconfig /release` and `/renew` request a new DHCP lease, and `ipconfig /flushdns` clears the DNS cache. On Linux, `ip addr` (short `ip a`) shows addresses, `ip route` shows the routing table and default gateway, and `ip link` shows interface state. The older `ifconfig` may still appear on some systems.",
   "`ping` sends ICMP echo requests and reports replies and round-trip time. A logical sequence is to ping the loopback address 127.0.0.1 (the TCP/IP stack works), your own address, the default gateway, a remote host by IP and finally a remote host by name. Where it first fails tells you which layer or segment is broken. Remember that firewalls often block ICMP.",
   "`tracert` on Windows and `traceroute` on Linux show each router hop along the path to a destination and the delay to each. They reveal where traffic stops or where latency jumps. Asterisks can mean a hop does not answer probes rather than a failure, so look at where replies stop entirely. `pathping` on Windows combines tracing with loss statistics.",
   "`nslookup` (Windows and Linux) and `dig` (Linux) query DNS directly. `nslookup app01` shows which DNS server answered and the address returned; you can query a specific server, as in `nslookup app01 10.0.0.53`, to compare answers. `dig app01 A` or `dig -x 10.0.0.25` for reverse lookups give detailed output including the record's TTL. If these tools return the right address but the application still uses the wrong one, check local caches and the hosts file.",
   "`netstat` and its Linux replacement `ss` show network connections and listening ports. `netstat -ano` on Windows lists all connections and listening ports with the owning process ID; `ss -tulpn` on Linux lists TCP and UDP listening sockets with process names. Use them to confirm a service is actually listening, and on which address and port, before blaming a firewall. `arp -a` shows the ARP cache, mapping IP addresses to MAC addresses on the local subnet; it helps detect duplicate IP addresses or confirm which device answers for an address. On Linux, `ip neigh` gives the same view.",
   "Ping does not test application ports. To check whether a specific TCP port is reachable, use `Test-NetConnection server -Port 443` in PowerShell, which reports whether the TCP connection succeeded, or `telnet server 443` on systems where the Telnet client is installed; a blank screen means it connected, and an error means it was refused or timed out. On Linux, `nc -zv server 443` does the same. Use Telnet only as a port test client, never for administration."
  ],
  "terms": [
   [
    "traceroute/tracert",
    "A tool that lists each router hop to a destination and the delay to each."
   ],
   [
    "nslookup/dig",
    "Tools that query DNS servers directly to check name resolution."
   ],
   [
    "ss/netstat",
    "Tools that list network connections and listening ports, optionally with the owning process."
   ],
   [
    "Test-NetConnection",
    "A PowerShell cmdlet that tests connectivity, including whether a TCP port is reachable."
   ]
  ],
  "example": "Users cannot reach a new web app on port 8443. On the server, `ss -tulpn` shows the app listening only on 127.0.0.1:8443. The administrator changes its bind address to the server's interface, and `Test-NetConnection web01 -Port 8443` from a client now reports success.",
  "tip": "ping tests reachability, not ports; use Test-NetConnection, telnet or nc for ports. nslookup/dig for DNS, tracert/traceroute for the path, netstat/ss for what is listening, arp for IP-to-MAC mapping.",
  "check": [
   [
    "Which command shows listening ports with process IDs on Windows?",
    "netstat -ano."
   ],
   [
    "A host pings its gateway but not a remote server by IP. Which tool helps find where traffic stops?",
    "tracert or traceroute, which shows each hop along the path."
   ],
   [
    "What does ipconfig /flushdns do?",
    "It clears the local DNS resolver cache so fresh lookups are made."
   ]
  ]
 },
 {
  "t": "Security problems: permissions and access denied errors, expired certificates, antivirus quarantining files, firewall blocking services, compromised accounts",
  "body": [
   "Security controls are designed to block things, so when they are misconfigured or triggered they cause outages that look like other problems. Server+ asks you to recognize security-related failures and fix them without weakening security, and to spot signs that an account has been compromised.",
   "Access denied errors usually come from permissions. On Windows file shares, two sets of permissions apply: share permissions and NTFS permissions. The effective access for a user connecting over the network is the more restrictive of the two. Within NTFS, permissions from multiple groups combine, but an explicit Deny overrides an Allow. Permissions inherit from parent folders unless inheritance is disabled, and moving or copying files can change what they inherit. On Linux, check owner, group and mode with `ls -l`, and remember that SELinux or AppArmor can deny access even when file permissions look correct. Also check that group membership changes have taken effect, since users often need to log off and back on. Fix the problem by adjusting group membership or rights to the minimum needed, not by granting Everyone full control.",
   "Certificates enable TLS for websites, APIs, LDAPS and many internal services. When a certificate expires, clients show warnings or refuse to connect, and service-to-service connections may fail silently. Other certificate problems include a name mismatch (the certificate does not list the host name clients use), an untrusted issuer or missing intermediate certificate, and a revoked certificate. Clock errors can also make valid certificates appear expired or not yet valid. Fix by renewing and installing the certificate with the complete chain, then restarting or rebinding the service. Prevent recurrence with an inventory of certificates, expiry monitoring and automated renewal where possible.",
   "Antivirus and EDR tools sometimes quarantine legitimate files, such as a new application update, a script or a database file, causing a service to fail. The clue is a quarantine or detection event in the security tool's log around the time the failure started. Verify the file is genuinely safe, for example by checking its source and digital signature, restore it from quarantine and create a narrow, documented exclusion or submit it to the vendor as a false positive. Do not disable protection entirely.",
   "Firewalls blocking services show up after new installs, port changes or rule updates: the server is reachable but one service is not. Confirm the service is listening, then check the host firewall and any network firewalls for a rule allowing that port from the right sources, and review firewall logs for dropped connections. Add a specific rule rather than turning the firewall off.",
   "Compromised accounts show warning signs: logons at unusual times or from unusual locations, many failed logons followed by a success, new accounts or group memberships nobody requested, disabled security tools, unexpected scheduled tasks or services, and unusual outbound traffic. Respond according to the incident response plan: contain by disabling the account or resetting credentials and revoking sessions, preserve logs as evidence, investigate what the account accessed, remove any persistence the attacker added, and require MFA going forward."
  ],
  "terms": [
   [
    "Effective permissions",
    "The actual access a user has after combining all group permissions, deny entries and share and NTFS permissions."
   ],
   [
    "Certificate chain",
    "The server certificate plus the intermediate certificates linking it to a trusted root."
   ],
   [
    "False positive",
    "A security tool flagging legitimate activity or files as malicious."
   ],
   [
    "Indicator of compromise",
    "Evidence, such as unusual logons or unknown services, suggesting a system or account has been breached."
   ]
  ],
  "example": "An internal API suddenly rejects connections from every client with TLS errors. The administrator inspects the certificate and finds it expired at midnight. She renews it, installs the full chain, restarts the service, and adds the certificate to the monitoring system's expiry checks so it alerts 30 days before the next expiry.",
  "tip": "For shares, effective access is the most restrictive of share and NTFS permissions, and explicit Deny wins. Fix security problems narrowly (a specific rule or exclusion) rather than disabling the control.",
  "check": [
   [
    "Share permission is Read, NTFS permission is Modify. What can a network user do?",
    "Only read, because effective access over the share is the more restrictive of the two."
   ],
   [
    "A service stops after an antivirus update, and the log shows its DLL was quarantined. What is the right fix?",
    "Verify the file is legitimate, restore it, and add a narrow documented exclusion or report the false positive, rather than disabling antivirus."
   ]
  ]
 },
 {
  "t": "Using logs, baselines and performance counters to find root cause",
  "body": [
   "Fixing a symptom gets a service back, but finding the root cause stops the problem returning. Root cause analysis relies on evidence: logs show what happened and when, performance counters show how resources behaved, and baselines tell you what normal looks like so you can see what changed.",
   "A baseline is a record of normal behavior, captured when the system is healthy. Collect performance data over enough time to include daily and weekly cycles, such as month-end processing or nightly backups. Record typical CPU usage, memory use, disk latency and queue length, network throughput and error counts, and application measures like response time and requests per second. Keep configuration baselines too, so you can compare current settings with the approved state. Without a baseline, 70 percent CPU is just a number; with one, you know whether it is normal for 10 a.m. on a Monday or a sign of trouble.",
   "Key performance counters point to specific bottlenecks. For the processor, look at utilization and, on virtual machines, CPU ready or steal time, which show the VM waiting for physical CPU. For memory, look at available memory and paging activity (pages per second on Windows, swap in and out on Linux); heavy paging means memory pressure even if CPU looks fine. For disk, look at latency (average seconds per read or write) and queue length; sustained high queues and latency indicate the storage cannot keep up. For network, look at utilization compared with link speed, errors and discards. Remember that one bottleneck can look like another: memory shortage causes paging, which appears as disk load.",
   "Logs give the timeline. Gather logs from every layer involved: OS event logs or journal, application logs, hardware logs from the BMC and RAID controller, hypervisor logs, and network device and firewall logs. Correlate by time, which is why synchronized clocks through NTP are essential; a few minutes of drift between servers makes it hard to tell which event came first. Centralized logging or a SIEM (security information and event management) system collects logs in one place and makes searching across many servers practical.",
   "A practical approach: define the symptom precisely, including when it started. Compare current counters with the baseline to find which resource deviates. Search logs around the start time for errors, warnings and changes, and check the change management records for anything deployed. Form a theory and test it, for example by reproducing the load or reverting the change. Keep asking why: a service crashed because memory ran out; memory ran out because a leak grew; the leak was introduced by last week's update. The last answer that you can act on is the root cause.",
   "Finally, document the analysis, fix the root cause, update baselines if the workload has legitimately changed, and add monitoring thresholds or alerts so the same pattern is caught earlier next time."
  ],
  "terms": [
   [
    "Root cause",
    "The underlying reason a problem occurred, which, when fixed, prevents recurrence."
   ],
   [
    "Performance counter",
    "A measured value, such as disk queue length or available memory, tracked by the OS or monitoring tools."
   ],
   [
    "Bottleneck",
    "The resource that limits overall performance because it is saturated."
   ],
   [
    "SIEM",
    "Security information and event management: a system that collects and correlates logs from many sources."
   ]
  ],
  "example": "Every Tuesday afternoon a reporting server slows down. Compared with the baseline, disk latency triples at 2 p.m. while CPU stays normal. Logs show a new antivirus full scan scheduled for Tuesdays at 2 p.m. after a recent policy change. Moving the scan to overnight and excluding the report database files fixes it.",
  "tip": "Compare against a baseline to see what changed, and correlate logs by time. Watch for disguised bottlenecks: heavy paging from low memory often looks like a disk problem.",
  "check": [
   [
    "Why is a baseline needed to interpret performance data?",
    "It shows what normal looks like for that system and time, so you can tell whether current values are abnormal."
   ],
   [
    "Why does NTP matter for root cause analysis?",
    "Synchronized clocks let you correlate log entries across servers in the correct order."
   ],
   [
    "High disk activity and low available memory appear together. What might the real bottleneck be?",
    "Memory, because low memory forces paging to disk, which shows up as disk load."
   ]
  ]
 }
]);
