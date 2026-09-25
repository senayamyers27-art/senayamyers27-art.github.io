/* Performance-based simulations for CompTIA Server+ (SK0-005). */
CertHub.addPbqs("server-plus", [

  { id: "raid-levels-match", d: 1, type: "match", title: "Match RAID levels to their behavior",
    prompt: "Match each RAID level (or layout) to the description that best fits it.",
    pairs: [
      ["RAID 0", "Striping only, no fault tolerance, fastest with full usable capacity"],
      ["RAID 1", "Mirroring, survives one disk loss, only 50% of raw capacity is usable"],
      ["RAID 5", "Single distributed parity, survives one disk, loses one drive of capacity"],
      ["RAID 6", "Dual distributed parity, survives two disks, loses two drives of capacity"],
      ["RAID 10", "Striped set of mirrors, good write speed and very fast rebuilds"]
    ],
    extra: ["Independent disks presented separately with no redundancy or striping (JBOD)"],
    explain: "RAID 0 stripes for speed and capacity but any single failure loses everything. RAID 1 mirrors two disks so half the raw space is usable. RAID 5 uses one drive's worth of parity and tolerates one failure; RAID 6 uses two and tolerates two. RAID 10 mirrors then stripes, giving parity-free writes and quick rebuilds since a failed disk is simply re-copied from its mirror. JBOD just exposes disks individually with no protection." },

  { id: "raid-capacity-fill", d: 1, type: "fill", title: "Calculate usable RAID capacity",
    prompt: "A server has eight 4 TB drives. Enter the usable capacity in TB for each RAID level, and how many drives may fail.",
    fields: [
      { label: "Usable capacity as RAID 5 (TB)", answers: ["28", "28 TB"] },
      { label: "Usable capacity as RAID 6 (TB)", answers: ["24", "24 TB"] },
      { label: "Usable capacity as RAID 10 (TB)", answers: ["16", "16 TB"] },
      { label: "Maximum drives that can fail in RAID 6", answers: ["2", "two"] }
    ],
    explain: "RAID 5 loses one drive to parity: (8 - 1) x 4 = 28 TB. RAID 6 loses two: (8 - 2) x 4 = 24 TB. RAID 10 mirrors every drive, so half the raw space remains: (8 / 2) x 4 = 16 TB. RAID 6's dual parity lets any two drives fail at once without data loss, which is why it is favored on large, slow-rebuilding arrays." },

  { id: "cloud-responsibility-match", d: 2, type: "match", title: "Match cloud models to who manages what",
    prompt: "Match each deployment or service model to the description of who is responsible for the stack.",
    pairs: [
      ["On-premises", "Customer owns and manages everything, including the physical hardware"],
      ["IaaS", "Provider runs hardware and virtualization; customer manages the OS and everything above it"],
      ["PaaS", "Provider manages up to the runtime and OS; customer manages only the app code and data"],
      ["SaaS", "Provider manages the entire stack; customer only configures and uses the application"]
    ],
    extra: ["Provider manages only network cabling while the customer supplies all servers and software"],
    explain: "The shared-responsibility line moves up the stack as you go on-prem to IaaS to PaaS to SaaS. With IaaS you patch and secure the guest OS; with PaaS the platform is maintained for you and you own only your code and data; with SaaS you consume a finished application and manage just its settings and users. On-premises leaves every layer, hardware included, to the customer." },

  { id: "dhcp-scope-fill", d: 2, type: "fill", title: "Plan a DHCP scope on a /26",
    prompt: "A subnet is 192.168.30.0/26. The gateway takes the first usable address and static devices use .2 through .10. A DHCP pool should cover the remaining usable addresses.",
    fields: [
      { label: "Subnet mask (dotted decimal)", answers: ["255.255.255.192"] },
      { label: "Broadcast address", answers: ["192.168.30.63"] },
      { label: "Gateway address (first usable)", answers: ["192.168.30.1"] },
      { label: "First address in the DHCP pool", answers: ["192.168.30.11"] },
      { label: "Last address in the DHCP pool", answers: ["192.168.30.62"] }
    ],
    explain: "A /26 uses a 255.255.255.192 mask and a block size of 64, so this subnet spans .0 to .63. The network address is .0 and the broadcast is .63, leaving usable hosts .1 to .62. The gateway takes .1 and statics take .2 to .10, so the DHCP pool runs from .11 to .62. Overlapping the pool with the static range would cause duplicate-address conflicts." },

  { id: "overcommit-select", d: 2, type: "select", title: "Spot the virtualization capacity risks",
    prompt: "Review the hypervisor host below and select every statement that is TRUE.",
    context: "Host HV1: 32 physical CPU cores, 128 GB RAM, one 2 TB thin-provisioned datastore.\n\nVM         vCPU   RAM assigned   Disk assigned\nVM-DB      16     64 GB          800 GB\nVM-WEB      8     32 GB          200 GB\nVM-APP      8     32 GB          300 GB\nVM-TEST     8     16 GB          1.5 TB\n---------------------------------------------\nTotal      40     144 GB         2.8 TB",
    options: [
      "RAM is overcommitted: 144 GB assigned exceeds the 128 GB installed.",
      "vCPU is overcommitted: 40 vCPU assigned exceeds the 32 physical cores.",
      "Thin provisioning caps each disk at its current size, so the datastore can never fill.",
      "Assigned virtual disk (2.8 TB) exceeds the 2 TB datastore, so it can fill if the thin disks grow.",
      "Overcommitment always crashes VMs immediately, regardless of actual usage.",
      "Adding physical RAM or migrating a VM off HV1 would relieve the memory overcommitment."
    ],
    answers: [0, 1, 3, 5],
    explain: "Assigned RAM (144 GB) and vCPU (40) both exceed the host's physical 128 GB and 32 cores, so both are overcommitted. Overcommitment is safe only while VMs do not all demand their full allocation at once; it does not crash guests immediately, but it risks contention, ballooning and swapping. Thin disks grow as data is written, and 2.8 TB of assigned disk on a 2 TB datastore can overfill it. Adding RAM or live-migrating a VM reduces the memory pressure." },

  { id: "decommission-order", d: 3, type: "order", title: "Order the secure decommissioning steps",
    prompt: "Put these steps for securely decommissioning a physical server in the correct order.",
    steps: [
      "Review data classification and retention requirements for the server",
      "Notify stakeholders and confirm no service still depends on the server",
      "Perform a final backup and verify it can be restored",
      "Power down the server and remove it from the network",
      "Sanitize the storage media by wiping, degaussing or shredding as appropriate",
      "Obtain a certificate of destruction and update the asset and inventory records"
    ],
    explain: "Decommissioning starts with knowing what data the server holds and how long it must be kept, then confirming nothing still depends on it. A verified final backup protects anything that must be retained before you take the box offline. Only after it is powered down and disconnected do you sanitize the media using a method matched to the media type, and you close out with a certificate of destruction and updated asset records for the audit trail." },

  { id: "spray-log-select", d: 3, type: "select", title: "Identify the password-spraying attempts",
    prompt: "Select every log line that is part of a password-spraying attempt.",
    context: "Mar 03 08:01:10 web01 sshd[1201]: Failed password for admin from 203.0.113.55 port 40122 ssh2\nMar 03 08:01:12 web01 sshd[1203]: Failed password for jsmith from 203.0.113.55 port 40130 ssh2\nMar 03 08:01:14 web01 sshd[1205]: Failed password for kpatel from 203.0.113.55 port 40144 ssh2\nMar 03 08:01:16 web01 sshd[1207]: Failed password for mchen from 203.0.113.55 port 40151 ssh2\nMar 03 09:22:41 web01 sshd[2044]: Accepted password for jsmith from 198.51.100.10 port 51002 ssh2\nMar 03 10:15:03 web01 sshd[3120]: Failed password for root from 198.51.100.200 port 33110 ssh2",
    options: [
      "08:01:10 Failed password for admin from 203.0.113.55",
      "08:01:12 Failed password for jsmith from 203.0.113.55",
      "08:01:14 Failed password for kpatel from 203.0.113.55",
      "08:01:16 Failed password for mchen from 203.0.113.55",
      "09:22:41 Accepted password for jsmith from 198.51.100.10",
      "10:15:03 Failed password for root from 198.51.100.200"
    ],
    answers: [0, 1, 2, 3],
    explain: "Password spraying tries one or a few passwords against many different accounts to stay under per-account lockout thresholds. The four rapid failures against admin, jsmith, kpatel and mchen, all from the same source 203.0.113.55 within six seconds, fit that pattern. The Accepted line is a normal login from a different address, and a single failure for root from another IP is not a spray on its own." },

  { id: "ts-methodology-order", d: 4, type: "order", title: "Order the CompTIA troubleshooting steps",
    prompt: "Put the CompTIA troubleshooting methodology steps in the correct order.",
    steps: [
      "Identify the problem (gather information, question users, note recent changes)",
      "Establish a theory of probable cause (question the obvious)",
      "Test the theory to determine the cause",
      "Establish a plan of action to resolve the problem and identify potential effects",
      "Implement the solution or escalate as necessary",
      "Verify full system functionality and, if applicable, apply preventive measures",
      "Document findings, actions and outcomes"
    ],
    explain: "The methodology moves from understanding to action to closure: identify the problem, form and then test a theory, and only once the cause is confirmed do you plan the fix and weigh its side effects. You then implement (or escalate), verify the system fully works and add prevention, and finish by documenting everything so the next technician benefits. Jumping to a fix before testing a theory is the most common exam trap." },

  { id: "gateway-diag-select", d: 4, type: "select", title: "Diagnose the connectivity fault",
    prompt: "A server reaches hosts on its own subnet but nothing beyond it. Review the config and symptoms, then select every TRUE statement.",
    context: "C:\\> ipconfig /all\n   IPv4 Address . . . . . . . : 192.168.10.50\n   Subnet Mask  . . . . . . . : 255.255.255.0\n   Default Gateway  . . . . . : 192.168.1.1\n   DNS Servers  . . . . . . . : 192.168.10.5\n\nSymptoms: name resolution works and hosts on 192.168.10.0/24 are reachable, but no other subnet responds.",
    options: [
      "The default gateway 192.168.1.1 is not on the 192.168.10.0/24 subnet, so off-subnet traffic has no valid next hop.",
      "The subnet mask is wrong and must be changed to /16.",
      "DNS is misconfigured, which is why remote subnets are unreachable.",
      "Setting the gateway to an on-subnet address such as 192.168.10.1 would likely restore remote connectivity.",
      "Local subnet traffic works because it does not need the default gateway.",
      "The cause is a duplex mismatch on the server's NIC."
    ],
    answers: [0, 3, 4],
    explain: "With a /24 mask the host's subnet is 192.168.10.0-255, but the gateway 192.168.1.1 falls outside it, so the host cannot ARP for it and off-subnet packets have nowhere to go. Local hosts still work because same-subnet traffic is delivered directly without a gateway. Fixing the gateway to an address inside 192.168.10.0/24 resolves it. DNS is fine (names resolve), the mask is not required to be /16, and a duplex mismatch would degrade all traffic, not just remote subnets." },

  { id: "linux-ts-tools-fill", d: 4, type: "fill", title: "Pick the right diagnostic command",
    prompt: "For each troubleshooting task, enter the single command-line tool you would use.",
    fields: [
      { label: "Linux: show why the systemd unit 'nginx' failed to start", answers: ["journalctl", "journalctl -u nginx"] },
      { label: "Linux: check whether a volume has run out of inodes", answers: ["df -i"] },
      { label: "Linux: check and repair an unmounted ext4 file system", answers: ["fsck", "e2fsck", "fsck.ext4"] },
      { label: "Linux: view a disk's SMART health attributes", answers: ["smartctl", "smartctl -a"] },
      { label: "Windows: test whether TCP port 443 is open on a remote host", answers: ["Test-NetConnection", "tnc"] }
    ],
    explain: "journalctl -u <unit> pulls a service's own log entries so you can see the startup error. df -i reports inode usage, which can be exhausted by many small files even when df -h shows free space. fsck (e2fsck for ext4) repairs a file system but only when the volume is unmounted. smartctl reads a drive's SMART attributes such as reallocated sectors, and Test-NetConnection (alias tnc) makes a TCP probe to confirm whether a port is reachable or blocked." }

]);
